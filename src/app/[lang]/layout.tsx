import type { Metadata } from 'next';
import { i18n, type Locale, getLocalizedHref } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import ClientLayout from '@/components/layout/ClientLayout';

const BASE_URL = 'https://farukfotografcilik.com';

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = (lang === 'en' ? 'en' : 'tr') as Locale;
  const t = await getDictionary(locale);

  const isEn = locale === 'en';

  const title = isEn
    ? "Faruk Photography | Istanbul's Photography Hub Since 1969"
    : "Faruk Fotoğrafçılık | 1969'dan Beri İstanbul'un Fotoğraf Merkezi";

  const description = isEn
    ? 'Professional photography studio in Sirkeci, Istanbul since 1969. Passport photos, film developing, photo printing, sublimation products & Istanbul souvenirs.'
    : "Sirkeci, İstanbul'da 1969'dan beri hizmet veren Faruk Fotoğrafçılık. Vesikalık fotoğraf, film banyo, fotoğraf baskı, sublimasyon ürünler ve İstanbul hatıra ürünleri.";

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: title,
      template: isEn ? '%s | Faruk Photography' : '%s | Faruk Fotoğrafçılık',
    },
    description,
    keywords: isEn
      ? [
          'passport photo istanbul',
          'film developing istanbul',
          'photo printing istanbul',
          'photography studio sirkeci',
          'analog film istanbul',
          'faruk photography',
          'istanbul souvenir',
          'custom mug istanbul',
          'studio photoshoot istanbul',
          'camera equipment',
          'personalizable products',
        ]
      : [
          'vesikalık fotoğraf sirkeci',
          'film banyo istanbul',
          'fotoğraf baskı istanbul',
          'analog film istanbul',
          'sirkeci fotoğrafçı',
          'faruk fotoğrafçılık',
          'istanbul hatıra',
          'kişiye özel kupa',
          'stüdyo çekim istanbul',
          'fotoğraf malzemeleri',
          'kişiselleştirilebilir ürünler',
        ],
    authors: [{ name: isEn ? 'Faruk Photography' : 'Faruk Fotoğrafçılık' }],
    creator: isEn ? 'Faruk Photography' : 'Faruk Fotoğrafçılık',
    openGraph: {
      type: 'website',
      locale: isEn ? 'en_US' : 'tr_TR',
      alternateLocale: isEn ? 'tr_TR' : 'en_US',
      siteName: isEn ? 'Faruk Photography' : 'Faruk Fotoğrafçılık',
      title: isEn
        ? "Faruk Photography | Istanbul's Photography Hub Since 1969"
        : "Faruk Fotoğrafçılık | 1969'dan Beri İstanbul'un Fotoğraf Merkezi",
      description: isEn
        ? 'Professional photography services in Sirkeci, Istanbul since 1969. Passport photos, film development, printing & souvenirs.'
        : "1969'dan beri Sirkeci, İstanbul'da profesyonel fotoğrafçılık hizmetleri.",
      images: [
        {
          url: `${BASE_URL}/logo.png`,
          width: 1200,
          height: 630,
          alt: isEn ? 'Faruk Photography — Since 1969' : 'Faruk Fotoğrafçılık — 1969',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEn ? 'Faruk Photography' : 'Faruk Fotoğrafçılık',
      description: isEn
        ? "Istanbul's Photography Hub Since 1969"
        : "1969'dan Beri İstanbul'un Fotoğraf Merkezi",
      images: [`${BASE_URL}/logo.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'tr': `${BASE_URL}/tr`,
        'en': `${BASE_URL}/en`,
        'x-default': `${BASE_URL}/tr`,
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang === 'en' ? 'en' : 'tr') as Locale;
  const isEn = locale === 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': BASE_URL,
    name: isEn ? 'Faruk Photography' : 'Faruk Fotoğrafçılık',
    alternateName: isEn ? 'Faruk Fotoğrafçılık' : 'Faruk Photography',
    description: isEn
      ? "Professional photography studio in Sirkeci, Istanbul since 1969. Passport photos, film developing, photo printing, studio shooting and personalizable products."
      : "Sirkeci, İstanbul'da 1969'dan beri hizmet veren profesyonel fotoğrafçılık stüdyosu. Vesikalık fotoğraf, film banyo, fotoğraf baskı, stüdyo çekim ve kişiselleştirilebilir ürünler.",
    url: `${BASE_URL}/${locale}`,
    telephone: '+905324402957',
    email: 'info@farukfotografcilik.com',
    foundingDate: '1969',
    image: `${BASE_URL}/logo.png`,
    logo: `${BASE_URL}/logo.png`,
    priceRange: '₺₺',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hobyar, Ankara Cd. No:55/A',
      addressLocality: 'Fatih',
      addressRegion: 'İstanbul',
      postalCode: '34112',
      addressCountry: 'TR',
    },
    geo: {
      // Matches the verified Google Business Profile pin; the previous pair
      // sat roughly 300 m away from the shop.
      '@type': 'GeoCoordinates',
      latitude: 41.0142935,
      longitude: 28.9751434,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    // aggregateRating intentionally omitted: the figures were hardcoded (4.5 / 62
    // while Google shows 66) and Google treats self-serving rating markup with no
    // reviews rendered on the page as a rich-result violation. Reinstate it only
    // once real reviews are displayed on the site and the numbers come from a feed.
    sameAs: [
      'https://maps.app.goo.gl/chVzqcUKCrLfxT9Q9',
      'https://www.instagram.com/farukfotografcilik1969/',
      'https://yandex.com.tr/maps/org/faruk_fotografcilik_sirkeci/1007296226/',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isEn ? 'Photography Services' : 'Fotoğrafçılık Hizmetleri',
      itemListElement: isEn
        ? [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Passport Photos' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Film Developing & Scanning' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Photo Printing' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Studio Photography' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Camera & Photo Equipment' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Personalizable Products' } },
          ]
        : [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vesikalık Fotoğraf' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Film Banyo & Tarama' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fotoğraf Baskı' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stüdyo Çekim' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fotoğraf & Kamera Malzemeleri' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kişiselleştirilebilir Ürünler' } },
          ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientLayout lang={locale}>{children}</ClientLayout>
    </>
  );
}
