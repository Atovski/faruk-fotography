import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hizmetlerimiz — Vesikalık, Film Banyo, Baskı, Stüdyo Çekim',
  description:
    'Faruk Fotoğrafçılık hizmetleri: Profesyonel vesikalık fotoğraf, 35mm & 120mm film banyo, yüksek kalite fotoğraf baskı, stüdyo çekim, kişiselleştirilebilir ürünler ve fotoğraf malzemeleri satışı. Sirkeci, İstanbul.',
  keywords: [
    'vesikalık fotoğraf istanbul',
    'film banyo hizmeti',
    'fotoğraf baskı',
    'stüdyo çekim istanbul',
    'fotoğraf malzemeleri',
    'kişiye özel baskı',
    'sirkeci fotoğrafçı',
  ],
  openGraph: {
    title: 'Hizmetlerimiz — Faruk Fotoğrafçılık',
    description: 'Vesikalık, film banyo, fotoğraf baskı, stüdyo çekim ve daha fazlası. 1969\'dan beri İstanbul Sirkeci\'de.',
    type: 'website',
    locale: 'tr_TR',
  },
  alternates: {
    canonical: '/hizmetler',
  },
};

export default function HizmetlerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
