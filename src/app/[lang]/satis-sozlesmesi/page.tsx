import { Metadata } from 'next';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const metadata: Metadata = {
  title: 'Mesafeli Satış Sözleşmesi / Distance Selling Agreement',
};

export default async function SalesAgreementPage({
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
          {isEn ? 'Distance Selling Agreement' : 'Mesafeli Satış Sözleşmesi'}
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
              {isEn ? 'ARTICLE 1 - PARTIES' : 'MADDE 1 - TARAFLAR'}
            </h2>
            <p>
              <strong>{isEn ? 'SELLER:' : 'SATICI:'}</strong><br/>
              {isEn ? 'Company Name: ' : 'Ünvanı: '} Faruk Fotoğrafçılık Sanayi ve Ticaret Limited Şirketi<br/>
              {isEn ? 'Address: ' : 'Adresi: '} Hobyar Mahallesi, Ankara Caddesi, Atabay İş Hanı No:55/A Sirkeci Fatih/İstanbul<br/>
              {isEn ? 'Tax Office / Tax ID: ' : 'Vergi Dairesi / No: '} Hocapaşa Vergi Dairesi / 3850089780<br/>
              {isEn ? 'Email: ' : 'E-posta: '} info@farukfotografcilik.com
            </p>
            <p style={{ marginTop: '12px' }}>
              <strong>{isEn ? 'BUYER:' : 'ALICI:'}</strong><br/>
              {isEn ? 'Customer buying from the online store.' : 'İnternet mağazasından alışveriş yapan müşteri.'}
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', color: theme.colors.text, marginBottom: '12px' }}>
              {isEn ? 'ARTICLE 2 - SUBJECT OF THE CONTRACT' : 'MADDE 2 - SÖZLEŞMENİN KONUSU'}
            </h2>
            <p>
              {isEn 
                ? 'The subject of this contract is to determine the rights and obligations of the parties in accordance with the provisions of the Law No. 6502 on the Protection of Consumers regarding the sale and delivery of the product whose qualities and sales price are specified on the website, ordered electronically by the BUYER.'
                : 'İşbu sözleşmenin konusu, ALICI\'nın SATICI\'ya ait internet sitesinden elektronik ortamda siparişini yaptığı, sitede nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.'}
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', color: theme.colors.text, marginBottom: '12px' }}>
              {isEn ? 'ARTICLE 3 - GENERAL PROVISIONS' : 'MADDE 3 - GENEL HÜKÜMLER'}
            </h2>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                {isEn 
                  ? 'The BUYER declares that they have read and informed themselves about the basic qualities of the product, sales price, and payment terms, and have given the necessary confirmation in the electronic environment.'
                  : 'ALICI, sözleşme konusu ürünün temel nitelikleri, tüm vergiler dahil satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini beyan eder.'}
              </li>
              <li>
                {isEn 
                  ? 'Each product subject to the contract shall be delivered to the BUYER or the person/organization at the address indicated by them within the period specified in the preliminary information on the website depending on the distance of the BUYER\'s settlement.'
                  : 'Sözleşme konusu her bir ürün, yasal süreyi aşmamak kaydı ile ALICI\'nın yerleşim yerinin uzaklığına bağlı olarak internet sitesindeki ön bilgiler kısmında belirtilen süre zarfında ALICI veya gösterdiği adresteki kişi/kuruluşa teslim edilir.'}
              </li>
              <li>
                {isEn
                  ? 'If the product is to be delivered to a person/organization other than the BUYER, the SELLER cannot be held responsible if the person/organization does not accept delivery.'
                  : 'Sözleşme konusu ürün, ALICI\'dan başka bir kişi/kuruluşa teslim edilecek ise, teslim edilecek kişi/kuruluşun teslimatı kabul etmemesinden SATICI sorumlu tutulamaz.'}
              </li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', color: theme.colors.text, marginBottom: '12px' }}>
              {isEn ? 'ARTICLE 4 - FORCE MAJEURE' : 'MADDE 4 - MÜCBİR SEBEPLER'}
            </h2>
            <p>
              {isEn
                ? 'If the SELLER cannot deliver the product within the specified time due to force majeure, the SELLER is obliged to notify the BUYER. The BUYER has the right to cancel the order.'
                : 'Mücbir sebepler (hava muhalefeti, deprem, sel, ulaşımın kesilmesi vb.) nedeni ile sözleşme konusu ürün süresi içinde teslim edilemez ise, SATICI durumu ALICI\'ya bildirmekle yükümlüdür. Bu takdirde ALICI siparişin iptal edilmesini talep edebilir.'}
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '18px', color: theme.colors.text, marginBottom: '12px' }}>
              {isEn ? 'ARTICLE 5 - AUTHORIZED COURT' : 'MADDE 5 - YETKİLİ MAHKEME'}
            </h2>
            <p>
              {isEn
                ? 'In disputes arising from this contract, Consumer Arbitration Committees and Consumer Courts in the SELLER\'s settlement area are authorized.'
                : 'İşbu sözleşmenin uygulanmasında, Gümrük ve Ticaret Bakanlığınca ilan edilen değere kadar Tüketici Hakem Heyetleri ile ALICI\'nın veya SATICI\'nın yerleşim yerindeki Tüketici Mahkemeleri yetkilidir.'}
            </p>
          </section>

          <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: `1px solid ${theme.colors.glassBorder}`, fontSize: '14px' }}>
            <p>
              {isEn 
                ? 'By placing an order, the BUYER is deemed to have fundamentally accepted all the terms of this contract.'
                : 'Siparişin gerçekleşmesi durumunda ALICI işbu sözleşmenin tüm koşullarını kabul etmiş sayılır.'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
