import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Film Galerisi — Müşteri Fotoğraflarını Görüntüle & İndir',
  description:
    'Faruk Fotoğrafçılık film galerisi. Film banyo sonrası fotoğraflarınızı online olarak görüntüleyin, tek tek veya toplu olarak indirin. Güvenli ve hızlı dijital teslim.',
  keywords: [
    'film banyo sonuç',
    'film tarama galerisi',
    'fotoğraf indirme',
    'dijital film teslim',
    'film banyo istanbul galeri',
  ],
  openGraph: {
    title: 'Film Galerisi — Faruk Fotoğrafçılık',
    description: 'Film banyo sonuçlarınızı online olarak görüntüleyin ve indirin.',
    type: 'website',
    locale: 'tr_TR',
  },
  alternates: {
    canonical: '/galeri',
  },
};

export default function GaleriLayout({ children }: { children: React.ReactNode }) {
  return children;
}
