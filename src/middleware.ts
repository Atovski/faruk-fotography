import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect both /admin and /api/admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const hasAdminToken = request.cookies.has('admin_token');

    // Exception for the API login/logout routes so they don't block themselves
    if (pathname === '/api/admin/login' || pathname === '/api/admin/logout') {
      return NextResponse.next();
    }

    // Redirect or block based on auth
    if (pathname === '/admin/login') {
      if (hasAdminToken) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    if (!hasAdminToken) {
      if (pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
