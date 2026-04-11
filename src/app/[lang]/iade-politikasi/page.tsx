import { Metadata } from 'next';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const metadata: Metadata = {
  title: 'İade Politikası ve Garanti / Return Policy & Warranty',
};

export default async function ReturnPolicyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isEn = lang === 'en';

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', maxWidth: '800px', margin: '0 auto', paddingBottom: '100px' }}>
      <div style={{ padding: '0 20px' }}>
        <h1 style={{ fontFamily: theme.fonts.heading, fontSize: '32px', marginBottom: '32px', color: theme.colors.text }}>
          {isEn ? 'Return Policy & Warranty Terms' : 'İade Politikası ve Garanti Şartları'}
        </h1>

        <div style={{ 
          fontSize: '15px', 
          lineHeight: '1.8', 
          color: theme.colors.textSecondary,
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          
          <section>
            <h2 style={{ fontSize: '18px', color: theme.colors.text, marginBottom: '12px' }}>
              {isEn ? 'CAYMA HAKKI / RIGHT OF WITHDRAWAL' : 'CAYMA HAKKI (İADE KAPSAMI)'}
            </h2>
            <p>
              {isEn 
                ? 'The BUYER has the right to withdraw from the contract and return the product without showing any reason and without paying any penalty within 14 (fourteen) days from the delivery of the product to themselves or the person/organization at the address indicated. However, there are exceptions to this right as detailed below.'
                : 'ALICI, sözleşme konusu ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa tesliminden itibaren 14 (ondört) gün içinde hiçbir gerekçe göstermeksizin ve cezai şart ödemeksizin cayma hakkına sahiptir. Ancak aşağıda belirtilen iade edilemeyecek ürünler istisnası bulunmaktadır.'}
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', color: theme.colors.error, marginBottom: '12px' }}>
              {isEn ? 'PRODUCTS EXEMPT FROM RIGHT OF WITHDRAWAL (CUSTOMIZED PRODUCTS)' : 'CAYMA HAKKI KULLANILAMAYACAK ÜRÜNLER (KİŞİSELLEŞTİRİLMİŞ ÜRÜNLER)'}
            </h2>
            <div style={{ 
              padding: '16px', 
              background: `${theme.colors.error}10`, 
              borderLeft: `4px solid ${theme.colors.error}`,
              borderRadius: '0 8px 8px 0',
              color: theme.colors.text
            }}>
              <p>
                <strong>ÖNEMLİ / IMPORTANT:</strong>{' '}
                {isEn 
                  ? 'Unless there is a distinct fault or defect originating from the SELLER (e.g. printing error, structural damage), returns and refunds are ABSOLUTELY NOT ACCEPTED for personalized and customizable products (custom mugs, custom prints, custom magnets, etc.) that have been prepared according to the specific requests or personal needs of the BUYER.'
                  : 'ALICI\'nın istekleri veya kişisel ihtiyaçları doğrultusunda özel olarak hazırlanan, kişiselleştirilebilir ürünlerde (özel baskılı kupa, özel tasarım magnet, fotoğraflı ürünler vb.) SATICI kusuru (baskı hatası, kırık teslimat, yanlış ürün üretimi vb.) bulunmadığı sürece KESİNLİKLE İADE KABUL EDİLMEMEKTEDİR.'}
              </p>
            </div>
            <p style={{ marginTop: '12px' }}>
              {isEn
                ? 'Once personalized product orders go into the printing/production phase, they cannot be cancelled.'
                : 'Kişiselleştirilmiş ürün siparişleri üretime (baskıya) girdikten sonra iptal edilemez.'}
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', color: theme.colors.success, marginBottom: '12px' }}>
              {isEn ? 'WARRANTY TERMS FOR SECOND-HAND CAMERAS' : 'İKİNCİ EL KAMERA GARANTİ ŞARTLARI'}
            </h2>
            <div style={{ 
              padding: '16px', 
              background: `${theme.colors.success}10`, 
              borderLeft: `4px solid ${theme.colors.success}`,
              borderRadius: '0 8px 8px 0',
              color: theme.colors.text
            }}>
              <p>
                <strong>FARUK FOTOĞRAFÇILIK GÜVENCESİ:</strong><br />
                {isEn 
                  ? 'All 2nd hand cameras purchased from our store are covered by a 2-month (60 days) Faruk Fotoğrafçılık internal warranty. During this period, technical malfunctions not caused by user error (dropping, water damage, improper use) will be repaired free of charge or the device will be eligible for a return/exchange.'
                  : 'Sitemizden veya mağazamızdan satın alınan tüm 2. El kameralar (fotoğraf makineleri), satın alma tarihinden itibaren 2 AY (60 gün) boyunca Faruk Fotoğrafçılık mekanik çalışma garantisi altındadır. Kullanıcı hatasından kaynaklanmayan (düşme, sıvı teması, hatalı kullanım hariç) teknik arızalarda cihazınız ücretsiz onarılır veya iade/değişim hakkı sunulur.'}
              </p>
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', color: theme.colors.text, marginBottom: '12px' }}>
              {isEn ? 'RETURN PROCESS' : 'İADE SÜRECİ'}
            </h2>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                {isEn 
                  ? 'To initiate a return, you must first contact us via info@farukfotografcilik.com or WhatsApp within 14 days.'
                  : 'İade sürecini başlatmak için 14 gün içinde info@farukfotografcilik.com veya WhatsApp hattımız üzerinden bize ulaşmalısınız.'}
              </li>
              <li>
                {isEn 
                  ? 'Returned products must be strictly unused, with tags intact, and in their original packaging without any damage.'
                  : 'İade edilecek ürünlerin kullanılmamış, etiketleri koparılmamış ve ambalajı zarar görmemiş, tekrar satılabilirliğinin bozulmamış olması gerekmektedir.'}
              </li>
              <li>
                {isEn 
                  ? 'For boxed products, if the box is damaged, opened, or the product is used, the return will be rejected.'
                  : 'Kutulu satın alınan ürünlerin kutusunun zarar görmesi, açılması veya ürünün kullanılması halinde iade kesinlikle kabul edilmez.'}
              </li>
              <li>
                {isEn
                  ? 'For defective/faulty items, the seller covers the return shipping costs. For standard returns based on right of withdrawal, the buyer covers the shipping costs.'
                  : 'Kusurlu/ayıplı ürün gönderimleri haricinde, standart cayma hakkı kullanılarak yapılan iadelerde kargo bedeli ALICI\'ya aittir.'}
              </li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
