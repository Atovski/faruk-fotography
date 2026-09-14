import type { ContentLocale } from '@/i18n/config';

export interface LandingContent {
  locale: ContentLocale;
  dir: 'ltr' | 'rtl';
  metaTitle: string;
  metaDescription: string;
  keywords: string[];

  badge: string;
  h1: string;
  intro: string;

  whatsappLabel: string;
  whatsappMessage: string;
  callLabel: string;
  directionsLabel: string;

  highlights: { title: string; text: string }[];
  table?: { h2: string; intro?: string; columns: [string, string]; rows: [string, string][]; note?: string };
  sections: { h2: string; paragraphs?: string[]; bullets?: string[] }[];
  steps?: { h2: string; items: { title: string; text: string }[] };
  faq: { h2: string; items: { q: string; a: string }[] };
  visit: { h2: string; address: string; hours: string; closed: string; transport: string };
  related?: { h2: string; links: { label: string; href: string }[] };

  breadcrumbHome: string;
  /** Label for the language switcher entry pointing at this page. */
  languageName: string;
}

/** One page available in several languages: locale → content and URL path. */
export type LandingGroup = Partial<Record<ContentLocale, { path: string; content: LandingContent }>>;

export const SHOP = {
  phone: '+905324402957',
  phoneDisplay: '+90 532 440 29 57',
  mapsUrl: 'https://maps.app.goo.gl/chVzqcUKCrLfxT9Q9',
  baseUrl: 'https://farukfotografcilik.com',
};
