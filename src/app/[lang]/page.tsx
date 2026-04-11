import HomePage from '@/components/home/HomePage';
import type { Locale } from '@/i18n/config';

// SSR SEO text block — visible to Google crawlers even before JS hydration
function SeoTextBlock({ locale }: { locale: Locale }) {
  const isEn = locale === 'en';

  return (
    <section
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '48px 24px 64px',
      }}
    >
      <h2
        style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          marginBottom: '16px',
          color: '#E8E0D0',
          fontFamily: 'var(--font-playfair), serif',
        }}
      >
        {isEn
          ? "Faruk Photography — Istanbul's Photography Hub Since 1969"
          : "Faruk Fotoğrafçılık — 1969'dan Beri İstanbul'un Fotoğraf Merkezi"}
      </h2>
      <p
        style={{
          fontSize: '1rem',
          lineHeight: 1.8,
          color: '#A0A8B8',
          marginBottom: '20px',
        }}
      >
        {isEn
          ? "Located in the heart of Istanbul's historic Sirkeci district, Faruk Photography has been serving photography enthusiasts and professionals since 1969. Our studio offers a comprehensive range of services including professional passport and biometric photos, analog film developing (35mm & 120mm), high-quality photo printing, studio photography sessions, and personalized souvenir products. Whether you're a tourist visiting Istanbul or a local photographer, our experienced team provides fast, reliable service with over 55 years of expertise."
          : "İstanbul'un tarihi Sirkeci semtinin kalbinde yer alan Faruk Fotoğrafçılık, 1969 yılından bu yana fotoğraf tutkunlarına ve profesyonellere hizmet vermektedir. Stüdyomuz; profesyonel vesikalık ve biyometrik fotoğraf çekimi, analog film banyo (35mm ve 120mm), yüksek kaliteli fotoğraf baskı, stüdyo fotoğraf çekimleri, e-ticaret ürün çekimi ve kişiselleştirilebilir hatıra ürünleri dahil geniş bir hizmet yelpazesi sunmaktadır. İstanbul'u ziyaret eden bir turist ya da yerel bir fotoğrafçı olun, 55 yılı aşkın deneyimimizle hızlı ve güvenilir hizmet almanızı garanti ediyoruz."}
      </p>
      <p
        style={{
          fontSize: '1rem',
          lineHeight: 1.8,
          color: '#A0A8B8',
        }}
      >
        {isEn
          ? "Our film developing service accepts shipments from all 81 cities across Turkey, with same-day processing and digital delivery. Visit us at Ankara Caddesi No:55/A, Fatih, Istanbul or reach out via WhatsApp for instant service."
          : "Film banyo hizmetimiz Türkiye genelinde 81 ilden kargo kabul etmekte olup, aynı gün işlem ve dijital teslimat sunmaktadır. Ankara Caddesi No:55/A, Fatih, İstanbul adresimizi ziyaret edin veya anında hizmet için WhatsApp üzerinden bize ulaşın."}
      </p>
    </section>
  );
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (lang === 'en' ? 'en' : 'tr') as Locale;

  return (
    <>
      <HomePage />
      <SeoTextBlock locale={locale} />
    </>
  );
}
