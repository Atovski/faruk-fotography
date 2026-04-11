import type { Locale } from './config';
import type { Translations } from './tr';

const dictionaries: Record<Locale, () => Promise<Translations>> = {
  tr: () => import('./tr').then((m) => m.default),
  en: () => import('./en').then((m) => m.default),
};

/**
 * Server-side dictionary loader.
 * Use this in Server Components and generateMetadata functions.
 */
export async function getDictionary(locale: Locale): Promise<Translations> {
  return dictionaries[locale]();
}
