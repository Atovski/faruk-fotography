import type { Metadata } from 'next';
import type { ContentLocale } from '@/i18n/config';
import { SHOP, type LandingGroup } from '@/content/landing/types';

const OG_LOCALE: Record<ContentLocale, string> = {
  tr: 'tr_TR',
  en: 'en_US',
  ar: 'ar_AR',
  ru: 'ru_RU',
  fa: 'fa_IR',
};

export function landingStaticParams(group: LandingGroup) {
  return Object.keys(group).map((lang) => ({ lang }));
}

export function resolveLanding(group: LandingGroup, lang: string) {
  return group[lang as ContentLocale];
}

export function landingMetadata(group: LandingGroup, lang: string): Metadata {
  const entry = resolveLanding(group, lang);
  if (!entry) return {};
  const { content: c, path } = entry;

  const languages: Record<string, string> = {};
  for (const [locale, e] of Object.entries(group)) {
    if (e) languages[locale] = `${SHOP.baseUrl}${e.path}`;
  }
  languages['x-default'] = `${SHOP.baseUrl}${(group.tr ?? group.en)!.path}`;

  return {
    // Absolute: the layout's title template is Turkish/English only.
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: { canonical: path, languages },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      type: 'website',
      locale: OG_LOCALE[c.locale],
      url: `${SHOP.baseUrl}${path}`,
    },
  };
}

export function landingLanguages(group: LandingGroup, lang: string) {
  return Object.entries(group).map(([locale, e]) => ({
    label: e!.content.languageName,
    href: e!.path,
    hrefLang: locale,
    active: locale === lang,
  }));
}

export function landingJsonLd(group: LandingGroup, lang: string) {
  const entry = resolveLanding(group, lang);
  if (!entry) return [];
  const { content: c, path } = entry;
  const url = `${SHOP.baseUrl}${path}`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: c.h1,
      description: c.metaDescription,
      url,
      areaServed: { '@type': 'City', name: 'Istanbul' },
      provider: { '@id': SHOP.baseUrl },
      inLanguage: c.locale,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: c.locale,
      mainEntity: c.faq.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: c.breadcrumbHome, item: `${SHOP.baseUrl}/${c.locale === 'tr' ? 'tr' : 'en'}` },
        { '@type': 'ListItem', position: 2, name: c.h1, item: url },
      ],
    },
  ];
}
