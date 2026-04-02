import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import ClientLayout from '@/components/layout/ClientLayout';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://farukfotografcilik.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Faruk Fotoğrafçılık | 1969\'dan Beri İstanbul\'un Fotoğraf Merkezi',
    template: '%s | Faruk Fotoğrafçılık',
  },
  description:
    'Sirkeci, İstanbul\'da 1969\'dan beri hizmet veren Faruk Fotoğrafçılık. Vesikalık fotoğraf, film banyo, fotoğraf baskı, sublimasyon ürünler ve İstanbul hatıra ürünleri. Passport photos, film development, photo printing in Istanbul.',
  keywords: [
    'vesikalık fotoğraf sirkeci',
    'film banyo istanbul',
    'fotoğraf baskı istanbul',
    'passport photo istanbul',
    'film development istanbul',
    'analog film istanbul',
    'sirkeci fotoğrafçı',
    'faruk fotoğrafçılık',
    'istanbul souvenir',
    'kişiye özel kupa',
    'stüdyo çekim istanbul',
    'fotoğraf malzemeleri',
    'kişiselleştirilebilir ürünler',
  ],
  authors: [{ name: 'Faruk Fotoğrafçılık' }],
  creator: 'Faruk Fotoğrafçılık',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: 'en_US',
    siteName: 'Faruk Fotoğrafçılık',
    title: 'Faruk Fotoğrafçılık | Istanbul\'s Photography Hub Since 1969',
    description: 'Professional photography services in Sirkeci, Istanbul since 1969. Passport photos, film development, printing & souvenirs.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Faruk Fotoğrafçılık',
    description: 'Istanbul\'s Photography Hub Since 1969',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://farukfotografcilik.com',
              name: 'Faruk Fotoğrafçılık',
              alternateName: 'Faruk Photography',
              description: 'Sirkeci, İstanbul\'da 1969\'dan beri hizmet veren profesyonel fotoğrafçılık stüdyosu. Vesikalık fotoğraf, film banyo, fotoğraf baskı, stüdyo çekim ve kişiselleştirilebilir ürünler.',
              url: 'https://farukfotografcilik.com',
              telephone: '+905324402957',
              email: 'info@farukphotography.com',
              foundingDate: '1969',
              image: 'https://farukfotografcilik.com/logo.png',
              logo: 'https://farukfotografcilik.com/logo.png',
              priceRange: '₺₺',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Hobyar, Ankara Cd. No:55/A',
                addressLocality: 'Fatih',
                addressRegion: 'İstanbul',
                postalCode: '34112',
                addressCountry: 'TR',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 41.0119,
                longitude: 28.9725,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                  opens: '09:00',
                  closes: '19:00',
                },
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.5',
                reviewCount: '62',
                bestRating: '5',
              },
              sameAs: [
                'https://maps.app.goo.gl/chVzqcUKCrLfxT9Q9',
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Fotoğrafçılık Hizmetleri',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vesikalık Fotoğraf' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Film Banyo & Tarama' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fotoğraf Baskı' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stüdyo Çekim' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fotoğraf & Kamera Malzemeleri' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kişiselleştirilebilir Ürünler' } },
                ],
              },
            }),
          }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
