import type { Metadata } from 'next';
import FilmBanyoPage from './FilmBanyoPage';

export const metadata: Metadata = {
  title: 'Film Banyo Hizmeti | Türkiye Geneli Kargo ile Film Banyo — Faruk Fotoğrafçılık',
  description:
    'Türkiye\'nin her yerinden kargo ile film banyo hizmeti. 35mm, 120mm renkli ve siyah-beyaz analog film banyo, tarama ve dijital teslim. 1969\'dan beri İstanbul Sirkeci\'de profesyonel film işleme. Aynı gün banyo, yüksek çözünürlük tarama.',
  keywords: [
    'film banyo',
    'film banyo istanbul',
    'film banyo fiyat',
    'film banyo hizmeti',
    'analog film banyo',
    '35mm film banyo',
    '120mm film banyo',
    'film banyo kargo',
    'film banyo türkiye',
    'renkli film banyo',
    'siyah beyaz film banyo',
    'film tarama',
    'negatif tarama',
    'film developman',
    'C41 banyo',
    'E6 banyo',
    'siyah beyaz banyo',
    'kodak film banyo',
    'ilford film banyo',
    'fujifilm banyo',
    'analog fotoğrafçılık',
    'film işleme',
    'film geliştirme',
    'kargo ile film banyo',
    'film banyo online sipariş',
  ],
  openGraph: {
    title: 'Film Banyo Hizmeti — Türkiye Geneli Kargo ile | Faruk Fotoğrafçılık',
    description:
      '1969\'dan beri profesyonel film banyo. 35mm & 120mm, renkli & siyah-beyaz. Türkiye\'nin her yerinden kargo ile gönderin, dijital olarak teslim alın.',
    type: 'website',
    locale: 'tr_TR',
  },
  alternates: {
    canonical: '/film-banyo',
  },
};

export default function Page() {
  return <FilmBanyoPage />;
}
