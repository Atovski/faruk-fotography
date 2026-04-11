import type { Metadata } from 'next';

const BASE_URL = 'https://farukfotografcilik.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === 'en';

  return {
    title: isEn
      ? 'Sell Your Used Camera — Cash Payment for Analog Cameras'
      : 'İkinci El Fotoğraf Makinesi Alım Satım — Analog Kamera Nakit Alım',
    description: isEn
      ? 'Sell your used analog cameras for cash at fair market value. We buy Canon, Nikon, Minolta, Pentax, Olympus, Leica and 250+ models. Get an instant quote. Faruk Photography, Sirkeci Istanbul.'
      : 'İkinci el analog fotoğraf makinelerinizi değerinde nakit satın alıyoruz. Canon, Nikon, Minolta, Pentax, Olympus, Leica ve 250+ model alım yapıyoruz. Anında ön teklif alın. Faruk Fotoğrafçılık, Sirkeci İstanbul.',
    keywords: isEn
      ? [
          'sell used camera istanbul',
          'sell analog camera',
          'used camera buyer',
          'second hand camera trade',
          'vintage camera buyer istanbul',
          'sell old camera for cash',
          'analog camera value',
          'camera trade-in istanbul',
        ]
      : [
          'ikinci el fotoğraf makinesi',
          'eski kamera satın alan yerler',
          'analog kamera satmak',
          '2. el kamera fiyatları istanbul',
          'ikinci el kamera alım',
          'eski fotoğraf makinesi değeri',
          'analog kamera alım satım',
          'ikinci el kamera istanbul',
          'vintage kamera alım',
        ],
    openGraph: {
      title: isEn ? 'Used Camera Trading — Faruk Photography' : 'İkinci El Kamera — Faruk Fotoğrafçılık',
      type: 'website',
      locale: isEn ? 'en_US' : 'tr_TR',
    },
    alternates: {
      canonical: isEn ? '/en/used-cameras' : '/tr/ikinci-el',
      languages: {
        'tr': `${BASE_URL}/tr/ikinci-el`,
        'en': `${BASE_URL}/en/used-cameras`,
        'x-default': `${BASE_URL}/tr/ikinci-el`,
      },
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
