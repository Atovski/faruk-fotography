import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim — Adres, Telefon & Çalışma Saatleri',
  description:
    'Faruk Fotoğrafçılık iletişim bilgileri: Hobyar, Ankara Cd. No:55/A, 34112 Fatih/İstanbul. Telefon: +90 532 440 29 57. Pazartesi-Cumartesi 09:00-19:00. WhatsApp ile ulaşın veya mesaj bırakın.',
  keywords: [
    'faruk fotoğrafçılık adres',
    'faruk fotoğrafçılık telefon',
    'sirkeci fotoğrafçı iletişim',
    'istanbul fotoğrafçı',
    'film banyo iletişim',
    'vesikalık fotoğraf randevu',
  ],
  openGraph: {
    title: 'İletişim — Faruk Fotoğrafçılık',
    description: 'Sirkeci, İstanbul. Ankara Cd. No:55/A. Tel: +90 532 440 29 57. Pzt-Cmt 09:00-19:00.',
    type: 'website',
    locale: 'tr_TR',
  },
  alternates: {
    canonical: '/iletisim',
  },
};

export default function IletisimLayout({ children }: { children: React.ReactNode }) {
  return children;
}
