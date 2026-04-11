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
    title: isEn ? 'Film Gallery — View & Download Your Photos' : 'Film Galerisi — Müşteri Fotoğraflarını Görüntüle & İndir',
    description: isEn
      ? 'Faruk Photography film gallery. View your developed film photos online, download individually or in bulk. Secure and fast digital delivery.'
      : 'Faruk Fotoğrafçılık film galerisi. Film banyo sonrası fotoğraflarınızı online olarak görüntüleyin, tek tek veya toplu olarak indirin. Güvenli ve hızlı dijital teslim.',
    openGraph: {
      title: isEn ? 'Film Gallery — Faruk Photography' : 'Film Galerisi — Faruk Fotoğrafçılık',
      type: 'website',
      locale: isEn ? 'en_US' : 'tr_TR',
    },
    alternates: {
      canonical: isEn ? '/en/gallery' : '/tr/galeri',
      languages: {
        'tr': `${BASE_URL}/tr/galeri`,
        'en': `${BASE_URL}/en/gallery`,
        'x-default': `${BASE_URL}/tr/galeri`,
      },
    },
  };
}

export default function GaleriLayout({ children }: { children: React.ReactNode }) {
  return children;
}
