import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda — 1969\'dan Beri İstanbul\'un Fotoğraf Merkezi',
  description:
    'Faruk Fotoğrafçılık hikayesi: 1969 yılında Sirkeci, İstanbul\'da kurulan aile işletmemiz, 55 yılı aşkın deneyimiyle vesikalık fotoğraf, film banyo, baskı ve dijital hizmetler sunmaktadır. 100.000+ mutlu müşteri.',
  keywords: [
    'faruk fotoğrafçılık tarihçe',
    'sirkeci fotoğrafçı',
    'istanbul en eski fotoğrafçı',
    '1969 fotoğraf stüdyosu',
    'aile işletmesi fotoğrafçılık',
  ],
  openGraph: {
    title: 'Hakkımızda — Faruk Fotoğrafçılık',
    description: '1969\'dan beri İstanbul Sirkeci\'de fotoğrafçılık. 55 yıllık deneyim, 100.000+ mutlu müşteri.',
    type: 'website',
    locale: 'tr_TR',
  },
  alternates: {
    canonical: '/hakkimizda',
  },
};

export default function HakkimizdaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
