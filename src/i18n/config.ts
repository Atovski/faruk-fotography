export const i18n = {
  defaultLocale: 'tr' as const,
  locales: ['tr', 'en'] as const,
};

export type Locale = (typeof i18n)['locales'][number];

/**
 * URL slug mapping: Turkish slug → English slug
 * File system uses Turkish slugs as folder names.
 * English URLs use English slugs and are rewritten by middleware.
 */
export const slugMap = {
  trToEn: {
    'hizmetler': 'services',
    'urunler': 'products',
    'film-banyo': 'film-developing',
    'galeri': 'gallery',
    'hakkimizda': 'about',
    'iletisim': 'contact',
    'ikinci-el': 'used-cameras',
    'siparis': 'order',
    'basarili': 'success',
  } as Record<string, string>,

  enToTr: {
    'services': 'hizmetler',
    'products': 'urunler',
    'film-developing': 'film-banyo',
    'gallery': 'galeri',
    'about': 'hakkimizda',
    'contact': 'iletisim',
    'used-cameras': 'ikinci-el',
    'order': 'siparis',
    'success': 'basarili',
  } as Record<string, string>,
};

/**
 * Convert a path from one locale to another.
 * e.g. localizePathname('/tr/hizmetler', 'en') → '/en/services'
 * e.g. localizePathname('/en/services', 'tr') → '/tr/hizmetler'
 */
export function localizePathname(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split('/');
  // segments[0] = '', segments[1] = locale, segments[2+] = slugs
  const currentLocale = segments[1];

  if (currentLocale === targetLocale) return pathname;

  // Replace locale
  segments[1] = targetLocale;

  // Convert slugs
  if (currentLocale === 'tr' && targetLocale === 'en') {
    for (let i = 2; i < segments.length; i++) {
      if (slugMap.trToEn[segments[i]]) {
        segments[i] = slugMap.trToEn[segments[i]];
      }
    }
  } else if (currentLocale === 'en' && targetLocale === 'tr') {
    for (let i = 2; i < segments.length; i++) {
      if (slugMap.enToTr[segments[i]]) {
        segments[i] = slugMap.enToTr[segments[i]];
      }
    }
  }

  return segments.join('/');
}

/**
 * Get the localized href for a navigation item.
 * Takes a Turkish base path (e.g. '/hizmetler') and returns the full localized path.
 */
export function getLocalizedHref(baseTrPath: string, locale: Locale): string {
  if (locale === 'tr') return `/tr${baseTrPath}`;

  // Convert Turkish slug to English
  const segments = baseTrPath.split('/').filter(Boolean);
  const localizedSegments = segments.map(seg => slugMap.trToEn[seg] || seg);
  return `/en/${localizedSegments.join('/')}`;
}
