import { Playfair_Display, Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read locale from middleware header for dynamic <html lang>
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'tr';

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <GoogleTagManager gtmId="GT-KFH8RGWV" />
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>
        {children}
        <GoogleAnalytics gaId="G-S2WJGQFG97" />
      </body>
    </html>
  );
}
