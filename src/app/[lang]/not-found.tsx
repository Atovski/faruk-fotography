import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sayfa Bulunamadı | Faruk Fotoğrafçılık',
  robots: { index: false, follow: true },
};

/**
 * Most arrivals here are people who clicked a search result for a product we
 * have since removed — second-hand cameras and film stock, 116 such addresses
 * at the last count. They came looking for film, so the page sends them to
 * what we actually do rather than leaving them on a bare error.
 *
 * It stays bilingual on one page: `not-found.tsx` receives no params, so the
 * locale is not reliably knowable here, and guessing it wrong is worse than
 * showing both lines.
 */
const links = [
  { href: '/tr/film-banyo', tr: 'Film Banyo ve Tarama', en: 'Film developing & scanning' },
  { href: '/tr/urunler', tr: 'Ürünler', en: 'Products' },
  { href: '/tr/vesikalik-fotograf', tr: 'Vesikalık & Biyometrik Fotoğraf', en: 'Passport & biometric photos' },
  { href: '/tr/fotograf-baski', tr: 'Fotoğraf Baskı', en: 'Photo printing' },
  { href: '/tr', tr: 'Ana Sayfa', en: 'Home' },
];

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 64px',
        background: '#FAF9F6',
        color: '#1B2A4A',
      }}
    >
      <div style={{ maxWidth: 560, width: '100%' }}>
        <p
          style={{
            margin: 0,
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#4A5568',
          }}
        >
          404
        </p>

        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            lineHeight: 1.15,
            margin: '10px 0 0',
          }}
        >
          Aradığınız sayfa burada değil
        </h1>

        <p style={{ margin: '14px 0 4px', color: '#4A5568', lineHeight: 1.6 }}>
          Sayfa kaldırılmış ya da adresi değişmiş olabilir. Aradığınız bir ürünse, stoğumuz
          değiştikçe sayfaları da değişiyor — aşağıdan devam edebilirsiniz.
        </p>
        <p style={{ margin: '0 0 28px', color: '#4A5568', fontSize: '0.9rem', lineHeight: 1.6 }}>
          This page has moved or been removed. The links below should get you where you were going.
        </p>

        <nav style={{ borderTop: '1px solid #E9ECEF' }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                display: 'block',
                padding: '14px 0',
                borderBottom: '1px solid #E9ECEF',
                color: '#1B2A4A',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              {l.tr}
              <span style={{ display: 'block', fontWeight: 400, fontSize: '0.85rem', color: '#4A5568' }}>
                {l.en}
              </span>
            </Link>
          ))}
        </nav>

        <p style={{ margin: '28px 0 0', fontSize: '0.9rem', color: '#4A5568', lineHeight: 1.6 }}>
          Aradığınızı bulamadıysanız{' '}
          <a href="https://wa.me/905324402957" style={{ color: '#1B2A4A', fontWeight: 600 }}>
            WhatsApp&apos;tan yazın
          </a>
          , bakalım elimizde var mı.
        </p>
      </div>
    </main>
  );
}
