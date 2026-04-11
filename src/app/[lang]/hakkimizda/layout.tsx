import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';

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
      ? "About Us — Istanbul's Photography Hub Since 1969"
      : "Hakkımızda — 1969'dan Beri İstanbul'un Fotoğraf Merkezi",
    description: isEn
      ? 'Faruk Photography story: Founded in 1969 in Sirkeci, Istanbul. Our family business offers passport photos, film developing, printing and digital services with over 55 years of experience. 100,000+ happy customers.'
      : "Faruk Fotoğrafçılık hikayesi: 1969 yılında Sirkeci, İstanbul'da kurulan aile işletmemiz, 55 yılı aşkın deneyimiyle vesikalık fotoğraf, film banyo, baskı ve dijital hizmetler sunmaktadır. 100.000+ mutlu müşteri.",
    openGraph: {
      title: isEn ? 'About Us — Faruk Photography' : 'Hakkımızda — Faruk Fotoğrafçılık',
      type: 'website',
      locale: isEn ? 'en_US' : 'tr_TR',
    },
    alternates: {
      canonical: isEn ? '/en/about' : '/tr/hakkimizda',
      languages: {
        'tr': `${BASE_URL}/tr/hakkimizda`,
        'en': `${BASE_URL}/en/about`,
        'x-default': `${BASE_URL}/tr/hakkimizda`,
      },
    },
  };
}

export default function HakkimizdaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
