import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ürünler — Analog Film, Kamera Ekipmanları & Hatıra Ürünleri',
  description:
    'Faruk Fotoğrafçılık ürün mağazası: Kodak, Fujifilm, Ilford analog filmler, tek kullanımlık fotoğraf makineleri, kişiye özel kupa, magnet, puzzle ve İstanbul hatıra ürünleri. Online sipariş ve mağazadan teslim.',
  keywords: [
    'analog film satın al',
    'kodak film istanbul',
    'fujifilm satış',
    'tek kullanımlık fotoğraf makinesi',
    'istanbul hatıra ürünleri',
    'kişiye özel kupa',
    'fotoğraf malzemeleri',
    'magnet istanbul',
  ],
  openGraph: {
    title: 'Ürünler — Faruk Fotoğrafçılık Mağazası',
    description: 'Analog filmler, kamera ekipmanları ve kişiselleştirilebilir hatıra ürünleri. Online sipariş verin.',
    type: 'website',
    locale: 'tr_TR',
  },
  alternates: {
    canonical: '/urunler',
  },
};

export default function UrunlerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
