import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';

const BASE_URL = 'https://farukfotografcilik.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = (lang === 'en' ? 'en' : 'tr') as Locale;
  const isEn = locale === 'en';

  return {
    title: isEn
      ? 'Photography Services Istanbul — Passport Photos, Film Developing, Printing, Studio'
      : 'İstanbul Fotoğraf Hizmetleri — Vesikalık, Film Banyo, Baskı, Stüdyo Çekim',
    description: isEn
      ? 'Faruk Photography services: Professional passport photos, 35mm & 120mm film developing, high quality photo printing, studio photography, personalizable products and camera equipment sales. Sirkeci, Istanbul.'
      : 'Faruk Fotoğrafçılık hizmetleri: Profesyonel vesikalık fotoğraf, 35mm & 120mm film banyo, yüksek kalite fotoğraf baskı, stüdyo çekim, kişiselleştirilebilir ürünler ve fotoğraf malzemeleri satışı. Sirkeci, İstanbul.',
    keywords: isEn
      ? [
          'passport photo istanbul',
          'biometric photo sirkeci',
          'film developing service',
          'photo printing',
          'studio photography istanbul',
          'product photography istanbul',
          'camera equipment',
          'custom printing',
          'sirkeci photographer',
          'photo studio istanbul',
          'e-commerce product shoot',
        ]
      : [
          'vesikalık fotoğraf istanbul',
          'biyometrik fotoğraf sirkeci',
          'film banyo hizmeti',
          'fotoğraf baskı',
          'stüdyo çekim istanbul',
          'e-ticaret ürün çekimi',
          'fotoğraf malzemeleri',
          'kişiye özel baskı',
          'sirkeci fotoğrafçı',
          'fotoğraf stüdyosu istanbul',
          'kurumsal portre çekim',
        ],
    openGraph: {
      title: isEn
        ? 'Our Services — Faruk Photography'
        : 'Hizmetlerimiz — Faruk Fotoğrafçılık',
      description: isEn
        ? "Passport photos, film developing, photo printing, studio photography and more. In Istanbul Sirkeci since 1969."
        : "Vesikalık, film banyo, fotoğraf baskı, stüdyo çekim ve daha fazlası. 1969'dan beri İstanbul Sirkeci'de.",
      type: 'website',
      locale: isEn ? 'en_US' : 'tr_TR',
    },
    alternates: {
      canonical: isEn ? '/en/services' : '/tr/hizmetler',
      languages: {
        'tr': `${BASE_URL}/tr/hizmetler`,
        'en': `${BASE_URL}/en/services`,
        'x-default': `${BASE_URL}/tr/hizmetler`,
      },
    },
  };
}

export default async function HizmetlerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isEn = lang === 'en';

  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Service',
          name: isEn ? 'Passport & Biometric Photos' : 'Vesikalık & Biyometrik Fotoğraf',
          description: isEn ? 'Professional passport and biometric photos for all document types' : 'Tüm belge türleri için profesyonel vesikalık ve biyometrik fotoğraf',
          offers: { '@type': 'Offer', price: '450', priceCurrency: 'TRY' },
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Service',
          name: isEn ? 'Product Photography' : 'Ürün Çekimi',
          description: isEn ? 'E-commerce product photography for Etsy, Amazon and more' : 'Etsy, Amazon ve diğer platformlar için profesyonel ürün çekimi',
          offers: { '@type': 'Offer', price: '1500', priceCurrency: 'TRY' },
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Service',
          name: isEn ? 'Film Developing & Scanning' : 'Film Banyo & Tarama',
          description: isEn ? '35mm and 120mm analog film developing with digital scanning' : '35mm ve 120mm analog film banyo ve dijital tarama',
          offers: { '@type': 'Offer', price: '350', priceCurrency: 'TRY' },
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'Service',
          name: isEn ? 'Photo Printing' : 'Fotoğraf Baskı',
          description: isEn ? 'High quality photo printing in various sizes' : 'Çeşitli boyutlarda yüksek kalite fotoğraf baskı',
          offers: { '@type': 'Offer', price: '50', priceCurrency: 'TRY' },
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      {children}
    </>
  );
}
