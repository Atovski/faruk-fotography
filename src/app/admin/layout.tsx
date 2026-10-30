import { Playfair_Display, Inter } from 'next/font/google';
import AdminShell from './AdminShell';
import '../globals.css';

/**
 * The admin panel is its own root layout: the public site owns <html> under
 * app/[lang] so that the locale comes from the URL and every page prerenders,
 * which leaves nothing above this branch to render the document.
 */
// Variable fonts + Turkish subset: see the note in app/[lang]/layout.tsx.
const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
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
