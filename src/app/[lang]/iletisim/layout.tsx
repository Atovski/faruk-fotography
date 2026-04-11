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
    title: isEn ? 'Contact — Get in Touch' : 'İletişim — Bize Ulaşın',
    description: isEn
      ? 'Contact Faruk Photography in Sirkeci, Istanbul. Address, phone, WhatsApp, working hours and directions. Hobyar, Ankara Cd. No:55/A, Fatih/Istanbul.'
      : 'Faruk Fotoğrafçılık iletişim bilgileri. Adres, telefon, WhatsApp, çalışma saatleri ve yol tarifi. Hobyar, Ankara Cd. No:55/A, Fatih/İstanbul.',
    openGraph: {
      title: isEn ? 'Contact — Faruk Photography' : 'İletişim — Faruk Fotoğrafçılık',
      type: 'website',
      locale: isEn ? 'en_US' : 'tr_TR',
    },
    alternates: {
      canonical: isEn ? '/en/contact' : '/tr/iletisim',
      languages: {
        'tr': `${BASE_URL}/tr/iletisim`,
        'en': `${BASE_URL}/en/contact`,
        'x-default': `${BASE_URL}/tr/iletisim`,
      },
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
