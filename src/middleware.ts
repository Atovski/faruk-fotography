import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['tr', 'en'];
const defaultLocale = 'tr';

/**
 * English slug → Turkish slug (file system uses Turkish folder names)
 */
const enToTrSlug: Record<string, string> = {
  'services': 'hizmetler',
  'products': 'urunler',
  'film-developing': 'film-banyo',
  'gallery': 'galeri',
  'about': 'hakkimizda',
  'contact': 'iletisim',
  'used-cameras': 'ikinci-el',
  'order': 'siparis',
  'success': 'basarili',
};

const trToEnSlug: Record<string, string> = Object.fromEntries(
  Object.entries(enToTrSlug).map(([en, tr]) => [tr, en])
);

/**
 * Detect preferred locale from Accept-Language header
 */
function getPreferredLocale(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language') || '';
  const langs = acceptLang.split(',').map((l) => l.split(';')[0].trim().toLowerCase());

  for (const lang of langs) {
    if (lang.startsWith('en')) return 'en';
    if (lang.startsWith('tr')) return 'tr';
  }

  return defaultLocale;
}

/**
 * Handle admin route protection (unchanged logic)
 */
function handleAdmin(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return null;
  }

  const hasAdminToken = request.cookies.has('admin_token');

  // Allow login/logout API routes
  if (pathname === '/api/admin/login' || pathname === '/api/admin/logout') {
    return null;
  }

  // Redirect logged-in users from login page to dashboard
  if (pathname === '/admin/login') {
    if (hasAdminToken) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return null;
  }

  // Block unauthorized access
  if (!hasAdminToken) {
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── Skip: static files, API, admin ───
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname === '/favicon.ico' ||
    pathname === '/favicon.png' ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname.startsWith('/navbar-logo') ||
    pathname.startsWith('/logo') ||
    /\.\w+$/.test(pathname) // any static file with extension
  ) {
    // Handle admin auth
    const adminResponse = handleAdmin(request);
    if (adminResponse) return adminResponse;

    return NextResponse.next();
  }

  // ─── Check if pathname already has a locale prefix ───
  const pathnameSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathnameSegments[0];
  const hasLocale = locales.includes(firstSegment);

  if (!hasLocale) {
    // No locale prefix → detect language and redirect
    const locale = getPreferredLocale(request);
    const newUrl = request.nextUrl.clone();

    if (pathnameSegments.length === 0) {
      // Root "/" → redirect to /tr or /en
      newUrl.pathname = `/${locale}`;
    } else {
      // Old URL like "/hizmetler" or "/services" → redirect with locale
      const slug = pathnameSegments[0];

      if (locale === 'en') {
        // Check if it's a Turkish slug → convert to English for the redirect URL
        const enSlug = trToEnSlug[slug];
        if (enSlug) {
          const rest = pathnameSegments.slice(1).map(s => trToEnSlug[s] || s).join('/');
          newUrl.pathname = `/en/${enSlug}${rest ? '/' + rest : ''}`;
        } else {
          // Maybe it's already an English slug or unknown
          newUrl.pathname = `/en${pathname}`;
        }
      } else {
        // Turkish locale: check if it's an English slug → convert to Turkish
        const trSlug = enToTrSlug[slug];
        if (trSlug) {
          const rest = pathnameSegments.slice(1).map(s => enToTrSlug[s] || s).join('/');
          newUrl.pathname = `/tr/${trSlug}${rest ? '/' + rest : ''}`;
        } else {
          newUrl.pathname = `/tr${pathname}`;
        }
      }
    }

    return NextResponse.redirect(newUrl, 308);
  }

  // ─── Has locale prefix ───
  const locale = firstSegment;
  const restSegments = pathnameSegments.slice(1);

  // For English locale: rewrite English slugs to Turkish slugs (internal routing)
  // The file system uses Turkish folder names, so /en/services → /en/hizmetler internally
  if (locale === 'en' && restSegments.length > 0) {
    const hasEnglishSlug = restSegments.some((seg) => enToTrSlug[seg]);

    if (hasEnglishSlug) {
      const rewrittenSegments = restSegments.map((seg) => enToTrSlug[seg] || seg);
      const rewrittenPath = `/${locale}/${rewrittenSegments.join('/')}`;

      const response = NextResponse.rewrite(new URL(rewrittenPath, request.url));
      response.headers.set('x-locale', locale);
      response.headers.set('x-pathname', pathname);
      return response;
    }
  }

  // Pass through with locale header
  const response = NextResponse.next();
  response.headers.set('x-locale', locale);
  response.headers.set('x-pathname', pathname);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image).*)',
  ],
};
