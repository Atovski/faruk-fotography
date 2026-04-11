import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import FilmBanyoPage from './FilmBanyoPage';

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
      ? 'Film Developing Service | Ship from Anywhere in Turkey — Faruk Photography'
      : 'Film Banyo Hizmeti (Film Tab) | Türkiye Geneli Kargo ile — Faruk Fotoğrafçılık',
    description: isEn
      ? 'Professional analog film developing service from anywhere in Turkey via mail. We carefully develop your 35mm and 120mm films and deliver high-resolution digital scans.'
      : "Türkiye'nin her yerinden kargo ile analog film banyo hizmeti. 35mm ve 120mm filmlerinizi özenle banyo ediyor ve aynı zamanda fotoğraf tab ettirme seçenekleriyle yüksek çözünürlüklü dijital teslimat sağlıyoruz.",
    keywords: isEn
      ? [
          'film developing istanbul',
          'film developing turkey',
          'analog film developing',
          '35mm film developing',
          '120mm film developing',
          'film developing by mail',
          'C41 developing',
          'black and white film developing',
          'film scanning',
          'negative scanning',
          'kodak film developing',
          'ilford film developing',
          'fujifilm developing',
        ]
      : [
          'film tab ettirme',
          'film tab ettirmek',
          'fotoğraf tab ettirme',
          'film banyo',
          'film banyo istanbul',
          'film banyo fiyat',
          'analog film banyo',
          '35mm film banyo',
          '120mm film banyo',
          'film banyo kargo',
          'film banyo türkiye',
          'renkli film banyo',
          'siyah beyaz film banyo',
          'film tarama',
          'negatif tarama',
          'C41 banyo',
          'kodak film banyo',
          'ilford film banyo',
          'fujifilm banyo',
          'kargo ile film banyo',
        ],
    openGraph: {
      title: isEn
        ? 'Film Developing Service — Ship from Anywhere in Turkey'
        : 'Film Banyo Hizmeti (Tab Ettirme) — Türkiye Geneli Kargo ile',
      description: isEn
        ? 'Professional film developing center since 1969. 35mm & 120mm color, black & white film developing and scanning. Ship your film, receive digital scans.'
        : "1969'dan beri profesyonel film banyo merkezi. 35mm & 120mm renkli, siyah-beyaz film yıkama ve tab işlemleri. Kargo ile gönderin, dijital olarak teslim alın.",
      type: 'website',
      locale: isEn ? 'en_US' : 'tr_TR',
    },
    alternates: {
      canonical: isEn ? '/en/film-developing' : '/tr/film-banyo',
      languages: {
        'tr': `${BASE_URL}/tr/film-banyo`,
        'en': `${BASE_URL}/en/film-developing`,
        'x-default': `${BASE_URL}/tr/film-banyo`,
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: isEn ? 'How long does film developing take?' : 'Film banyo ne kadar sürer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isEn
            ? "Once your film reaches us, it's usually developed the same day or the next day. During peak periods it may take up to 2 business days."
            : 'Filminiz elimize ulaştığında genellikle aynı gün veya ertesi gün banyo edilir. Yoğun dönemlerde en fazla 2 iş günü sürebilir.',
        },
      },
      {
        '@type': 'Question',
        name: isEn ? 'How much is shipping?' : 'Kargo ücreti ne kadar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isEn
            ? 'You cover the shipping cost. If you want negatives returned, the return shipping is also on you.'
            : 'Gönderim kargo ücretini siz karşılarsınız. Negatif iade isterseniz dönüş kargosu da size aittir.',
        },
      },
      {
        '@type': 'Question',
        name: isEn ? 'How will I receive my photos?' : 'Fotoğrafları nasıl teslim alacağım?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isEn
            ? 'Your scanned photos are delivered in high-resolution JPEG or TIFF format via a secure online gallery link sent through WhatsApp or email.'
            : 'Taranmış fotoğraflarınız yüksek çözünürlüklü JPEG veya TIFF formatında, güvenli online galeri linki üzerinden size WhatsApp veya e-posta ile iletilir.',
        },
      },
      {
        '@type': 'Question',
        name: isEn ? 'Can I get my negatives back?' : 'Negatiflerimi geri alabilir miyim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isEn
            ? "Yes! If you request negative return during ordering, we'll ship them back to you. Return shipping is on the buyer."
            : 'Evet! Sipariş esnasında negatif iade talebinde bulunursanız, negatifleri size kargo ile geri göndeririz.',
        },
      },
      {
        '@type': 'Question',
        name: isEn ? 'What payment methods do you accept?' : 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isEn
            ? 'We accept bank transfer, cash on delivery, and in-store cash payment.'
            : 'Havale/EFT, kapıda ödeme ve mağaza içi nakit ödeme kabul ediyoruz.',
        },
      },
      {
        '@type': 'Question',
        name: isEn ? 'Will my film get damaged during shipping?' : 'Kargo sırasında filmim zarar görür mü?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isEn
            ? 'As long as you wrap the film in bubble wrap or shock-absorbing material, no issues will occur. Cargo company X-ray machines do not damage film.'
            : 'Filmi balonlu zarfa veya darbe emici malzemeyle sardığınız sürece sorun yaşanmaz. Kargo şirketlerinin X-ray cihazları filme zarar vermez.',
        },
      },
    ],
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isEn ? 'Film Developing Service' : 'Film Banyo Hizmeti',
    description: isEn
      ? 'Professional analog film developing service from anywhere in Turkey via mail. 35mm and 120mm films developed same-day.'
      : "Türkiye'nin her yerinden kargo ile analog film banyo hizmeti. 35mm ve 120mm filmler aynı gün banyo edilir.",
    provider: {
      '@type': 'LocalBusiness',
      name: 'Faruk Fotoğrafçılık',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hobyar, Ankara Cd. No:55/A',
        addressLocality: 'Fatih',
        addressRegion: 'İstanbul',
        postalCode: '34112',
        addressCountry: 'TR',
      },
    },
    areaServed: { '@type': 'Country', name: isEn ? 'Turkey' : 'Türkiye' },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '500',
      highPrice: '900',
      priceCurrency: 'TRY',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <FilmBanyoPage />
    </>
  );
}
