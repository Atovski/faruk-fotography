import { Playfair_Display, Inter } from 'next/font/google';
import AdminShell from './AdminShell';
import '../globals.css';

/**
 * The admin panel is its own root layout: the public site owns <html> under
 * app/[lang] so that the locale comes from the URL and every page prerenders,
 * which leaves nothing above this branch to render the document.
 */
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Faruk Admin',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
