import type { LandingGroup } from './types';
import { FAQ_HOURS_EN, FAQ_HOURS_TR, FAQ_PRICE_EN, FAQ_PRICE_TR, VISIT_EN, VISIT_TR } from './visit';

/** Photo printing page; sizes and claims mirror the services copy in i18n/tr.ts. */
export const baskiGroup: LandingGroup = {
  tr: {
    path: '/tr/fotograf-baski',
    content: {
      locale: 'tr',
      dir: 'ltr',
      metaTitle: 'Fotoğraf Baskı Sirkeci | Telefondan Fotoğraf Bastırma – Aynı Gün',
      metaDescription:
        "Telefonunuzdaki fotoğrafları 10x15'ten 30x40'a kadar mat veya parlak kağıda profesyonel kalitede basıyoruz. WhatsApp'tan gönderin, aynı gün teslim alın. Sirkeci, Fatih.",
      keywords: [
        'fotoğraf baskı',
        'fotoğraf bastırma',
        'telefondan fotoğraf baskı',
        'fotoğraf baskı sirkeci',
        'fotoğraf baskı eminönü',
        '10x15 fotoğraf baskı',
        'poster baskı istanbul',
        'kanvas baskı istanbul',
      ],
      badge: 'MAT • PARLAK • KANVAS • POSTER',
      h1: 'Fotoğraf Baskı: Anılarınız Telefonda Kalmasın',
      intro:
        "Telefonunuzdaki veya bilgisayarınızdaki fotoğrafları profesyonel Epson kalitesinde, solmaya dayanıklı mat ya da parlak fotoğraf kağıdına basıyoruz. Fotoğraflarınızı WhatsApp'tan gönderin, Sirkeci'deki dükkanımızdan aynı gün teslim alın.",
      whatsappLabel: "WhatsApp'tan Gönderin",
      whatsappMessage: 'Merhaba, fotoğraf baskı için yazıyorum.',
      callLabel: 'Hemen Arayın',
      directionsLabel: 'Yol Tarifi Al',
      highlights: [
        { title: 'Aynı gün teslim', text: 'Baskı siparişlerinizi genellikle aynı gün içinde hazırlıyoruz.' },
        { title: 'Profesyonel Epson kalitesi', text: 'Canlı renkler, keskin detaylar ve uzun ömürlü baskı.' },
        { title: 'Her boyutta baskı', text: "10x15'ten 30x40'a, kanvas ve postere kadar." },
        { title: 'Mat veya parlak', text: 'Fotoğrafınıza ve kullanacağınız yere göre kağıt seçimi.' },
      ],
      priceCalculator: {
        h2: 'Baskı Fiyatları',
        intro: 'Boyutu ve adedi seçin, ödeyeceğiniz tutarı anında görün. Adet arttıkça birim fiyat düşer.',
        sizeLabel: 'Boyut',
        quantityLabel: 'Adet',
        unitLabel: 'Birim fiyat',
        totalLabel: 'Toplam',
        currency: 'TL',
        sizes: [
          { id: '10x15', label: '10 x 15 cm', tiers: [{ min: 1, max: 5, price: 55 }, { min: 6, max: 10, price: 45 }, { min: 11, max: 15, price: 40 }, { min: 16, max: 20, price: 27.5 }, { min: 21, max: 40, price: 25 }, { min: 41, max: 60, price: 22.5 }, { min: 61, max: 80, price: 20 }, { min: 81, max: 99, price: 17.5 }, { min: 100, max: 250, price: 15 }, { min: 251, max: null, price: 14 }] },
          { id: '13x18', label: '13 x 18 cm', tiers: [{ min: 1, max: 5, price: 65 }, { min: 6, max: 10, price: 55 }, { min: 11, max: 15, price: 45 }, { min: 16, max: 20, price: 30 }, { min: 21, max: 40, price: 27.5 }, { min: 41, max: 60, price: 25 }, { min: 61, max: 80, price: 22.5 }, { min: 81, max: 99, price: 20 }, { min: 100, max: 250, price: 17.5 }, { min: 251, max: null, price: 16.5 }] },
          { id: '15x21', label: '15 x 21 cm', tiers: [{ min: 1, max: 5, price: 75 }, { min: 6, max: 10, price: 65 }, { min: 11, max: 15, price: 60 }, { min: 16, max: 20, price: 50 }, { min: 21, max: 40, price: 45 }, { min: 41, max: 60, price: 40 }, { min: 61, max: 80, price: 35 }, { min: 81, max: 99, price: 32.5 }, { min: 100, max: 250, price: 30 }, { min: 251, max: null, price: 28 }] },
          { id: '20x30', label: '20 x 30 cm', tiers: [{ min: 1, max: 1, price: 250 }, { min: 2, max: 3, price: 230 }, { min: 4, max: 7, price: 200 }, { min: 8, max: 10, price: 180 }, { min: 11, max: null, price: 160 }] },
          { id: '30x40', label: '30 x 40 cm', tiers: [{ min: 1, max: 1, price: 350 }, { min: 2, max: 3, price: 330 }, { min: 4, max: 7, price: 300 }, { min: 8, max: 10, price: 280 }, { min: 11, max: null, price: 260 }] },
        ],
        nextTierTemplate: '{qty} adetten itibaren birim fiyat {price}.',
        ctaTemplate: 'Merhaba, {size} boyutunda {qty} adet fotoğraf baskısı istiyorum.',
        ctaLabel: "WhatsApp'tan sipariş ver",
        note: 'Fiyatlara KDV dahildir. Kanvas, poster ve özel boyutlar ile kurumsal toplu işler için WhatsApp\'tan teklif alabilirsiniz.',
      },
      table: {
        h2: 'Baskı Boyutları',
        columns: ['Boyut', 'En uygun kullanım'],
        rows: [
          ['10 x 15 cm', 'Albüm ve klasik fotoğraf'],
          ['13 x 18 cm', 'Çerçeve ve hediye'],
          ['15 x 21 cm', 'Çerçeve ve masa üstü'],
          ['20 x 30 cm', 'Duvar ve büyük çerçeve'],
          ['30 x 40 cm', 'Duvar dekorasyonu'],
          ['Kanvas & poster', 'Özel boyutlarda dekorasyon'],
        ],
        note: "Özel boyutlar için WhatsApp'tan bilgi alabilirsiniz.",
      },
      sections: [
        {
          h2: 'Fotoğraflarınızı Nasıl Gönderirsiniz?',
          paragraphs: [
            'En kolay yol WhatsApp: fotoğraflarınızı bize gönderin, boyut ve adet bilgisini yazın. Baskılarınız hazır olduğunda size haber verelim.',
            'Önemli ipucu: WhatsApp normal gönderimde fotoğrafları sıkıştırıp kalitesini düşürür. En iyi baskı için fotoğrafları “Belge” (dosya) olarak gönderin.',
          ],
        },
        {
          h2: 'Neler Basıyoruz?',
          bullets: [
            'Telefon ve dijital fotoğraf makinesi fotoğrafları',
            'Aile, düğün ve bebek fotoğrafları',
            'Analog film taramaları',
            'Kanvas ve poster baskılar',
          ],
        },
      ],
      steps: {
        h2: 'Nasıl Çalışıyoruz?',
        items: [
          { title: 'Fotoğrafları gönderin', text: "WhatsApp'tan belge olarak gönderin veya dükkana getirin." },
          { title: 'Boyut ve kağıdı seçin', text: 'Boyut, adet ve mat/parlak tercihinizi yazın.' },
          { title: 'Teslim alın', text: "Baskılarınızı Sirkeci'deki dükkanımızdan teslim alın." },
        ],
      },
      faq: {
        h2: 'Sık Sorulan Sorular',
        items: [
          {
            q: 'Fotoğraflarım ne zaman hazır olur?',
            a: "Siparişler genellikle aynı gün hazırlanır; çok sayıda baskıda süreyi WhatsApp'tan birlikte netleştiririz.",
          },
          {
            q: 'Mat mı parlak mı seçmeliyim?',
            a: 'Parlak kağıt renkleri daha canlı gösterir. Mat kağıt ise yansıma yapmaz ve parmak izi tutmaz; çerçeve için idealdir.',
          },
          {
            q: 'Telefonla çekilen fotoğraflar büyük basılabilir mi?',
            a: 'Günümüz telefonlarının fotoğrafları çoğu boyutta iyi sonuç verir. Gönderdiğiniz dosyanın çözünürlüğüne bakıp size en uygun boyutu söyleriz.',
          },
          FAQ_PRICE_TR,
          FAQ_HOURS_TR,
        ],
      },
      visit: VISIT_TR,
      related: {
        h2: 'İlgili Sayfalar',
        links: [
          { label: 'Vesikalık & Biyometrik Fotoğraf', href: '/tr/vesikalik-fotograf' },
          { label: 'Film Banyo', href: '/tr/film-banyo' },
        ],
      },
      breadcrumbHome: 'Ana Sayfa',
      languageName: 'Türkçe',
    },
  },

  en: {
    path: '/en/photo-printing',
    content: {
      locale: 'en',
      dir: 'ltr',
      metaTitle: 'Photo Printing Istanbul | Print Photos from Your Phone – Sirkeci',
      metaDescription:
        'Print the photos on your phone from 10x15 to 30x40 cm on matte or glossy paper in professional quality. Send them on WhatsApp and pick up the same day in Sirkeci, Istanbul.',
      keywords: [
        'photo printing istanbul',
        'print photos from phone istanbul',
        'photo print sirkeci',
        'photo lab istanbul',
        'poster printing istanbul',
        'canvas print istanbul',
      ],
      badge: 'MATTE • GLOSSY • CANVAS • POSTER',
      h1: "Photo Printing: Don't Leave Your Memories on Your Phone",
      intro:
        'We print the photos on your phone or computer in professional Epson quality on fade-resistant matte or glossy photo paper. Send your photos on WhatsApp and pick up your prints the same day at our shop in Sirkeci.',
      whatsappLabel: 'Send on WhatsApp',
      whatsappMessage: 'Hello, I would like to print some photos. / Merhaba, fotoğraf baskı için yazıyorum.',
      callLabel: 'Call Now',
      directionsLabel: 'Get Directions',
      highlights: [
        { title: 'Same-day pickup', text: 'Print orders are usually ready the same day.' },
        { title: 'Professional Epson quality', text: 'Vivid colours, sharp detail and long-lasting prints.' },
        { title: 'Every size', text: 'From 10x15 cm to 30x40 cm, canvas and posters.' },
        { title: 'Matte or glossy', text: "Paper chosen to suit your photo and where it's going." },
      ],
      priceCalculator: {
        h2: 'Printing Prices',
        intro: 'Pick a size and a quantity to see what you will pay. The unit price drops as the quantity goes up.',
        sizeLabel: 'Size',
        quantityLabel: 'Quantity',
        unitLabel: 'Unit price',
        totalLabel: 'Total',
        currency: 'TL',
        sizes: [
          { id: '10x15', label: '10 x 15 cm', tiers: [{ min: 1, max: 5, price: 55 }, { min: 6, max: 10, price: 45 }, { min: 11, max: 15, price: 40 }, { min: 16, max: 20, price: 27.5 }, { min: 21, max: 40, price: 25 }, { min: 41, max: 60, price: 22.5 }, { min: 61, max: 80, price: 20 }, { min: 81, max: 99, price: 17.5 }, { min: 100, max: 250, price: 15 }, { min: 251, max: null, price: 14 }] },
          { id: '13x18', label: '13 x 18 cm', tiers: [{ min: 1, max: 5, price: 65 }, { min: 6, max: 10, price: 55 }, { min: 11, max: 15, price: 45 }, { min: 16, max: 20, price: 30 }, { min: 21, max: 40, price: 27.5 }, { min: 41, max: 60, price: 25 }, { min: 61, max: 80, price: 22.5 }, { min: 81, max: 99, price: 20 }, { min: 100, max: 250, price: 17.5 }, { min: 251, max: null, price: 16.5 }] },
          { id: '15x21', label: '15 x 21 cm', tiers: [{ min: 1, max: 5, price: 75 }, { min: 6, max: 10, price: 65 }, { min: 11, max: 15, price: 60 }, { min: 16, max: 20, price: 50 }, { min: 21, max: 40, price: 45 }, { min: 41, max: 60, price: 40 }, { min: 61, max: 80, price: 35 }, { min: 81, max: 99, price: 32.5 }, { min: 100, max: 250, price: 30 }, { min: 251, max: null, price: 28 }] },
          { id: '20x30', label: '20 x 30 cm', tiers: [{ min: 1, max: 1, price: 250 }, { min: 2, max: 3, price: 230 }, { min: 4, max: 7, price: 200 }, { min: 8, max: 10, price: 180 }, { min: 11, max: null, price: 160 }] },
          { id: '30x40', label: '30 x 40 cm', tiers: [{ min: 1, max: 1, price: 350 }, { min: 2, max: 3, price: 330 }, { min: 4, max: 7, price: 300 }, { min: 8, max: 10, price: 280 }, { min: 11, max: null, price: 260 }] },
        ],
        nextTierTemplate: 'From {qty} prints the unit price drops to {price}.',
        ctaTemplate: 'Hello, I would like {qty} photo prints at {size}.',
        ctaLabel: 'Order on WhatsApp',
        note: 'Prices include VAT. For canvas, posters, custom sizes and bulk corporate orders, ask for a quote on WhatsApp.',
      },
      table: {
        h2: 'Print Sizes',
        columns: ['Size', 'Best for'],
        rows: [
          ['10 x 15 cm', 'Albums and classic prints'],
          ['13 x 18 cm', 'Frames and gifts'],
          ['15 x 21 cm', 'Frames and desks'],
          ['20 x 30 cm', 'Walls and large frames'],
          ['30 x 40 cm', 'Wall decoration'],
          ['Canvas & poster', 'Custom-size decoration'],
        ],
        note: 'Ask us on WhatsApp about custom sizes.',
      },
      sections: [
        {
          h2: 'How to Send Your Photos',
          paragraphs: [
            "The easiest way is WhatsApp: send us your photos with the size and number of prints, and we'll let you know when they're ready.",
            'Tip: WhatsApp compresses photos sent the normal way and lowers their quality. For the best prints, send them as a “Document” (file).',
          ],
        },
        {
          h2: 'What We Print',
          bullets: ['Phone and digital camera photos', 'Family, wedding and baby photos', 'Analog film scans', 'Canvas and poster prints'],
        },
      ],
      steps: {
        h2: 'How It Works',
        items: [
          { title: 'Send your photos', text: 'Send them on WhatsApp as documents or bring them to the shop.' },
          { title: 'Choose size and paper', text: 'Tell us the size, number of prints and matte or glossy.' },
          { title: 'Pick them up', text: 'Collect your prints at our shop in Sirkeci.' },
        ],
      },
      faq: {
        h2: 'Frequently Asked Questions',
        items: [
          { q: 'When will my prints be ready?', a: "Orders are usually ready the same day; for large orders we'll agree the timing on WhatsApp." },
          {
            q: 'Should I choose matte or glossy?',
            a: "Glossy paper makes colours look more vivid. Matte paper doesn't reflect light or show fingerprints, which makes it ideal for framing.",
          },
          {
            q: 'Can phone photos be printed large?',
            a: "Photos from modern phones print well at most sizes. We'll check your file's resolution and recommend the best size.",
          },
          FAQ_PRICE_EN,
          FAQ_HOURS_EN,
        ],
      },
      visit: VISIT_EN,
      related: {
        h2: 'Related Pages',
        links: [
          { label: 'Passport & Biometric Photos', href: '/en/passport-photo' },
          { label: 'Film Developing', href: '/en/film-developing' },
        ],
      },
      breadcrumbHome: 'Home',
      languageName: 'English',
    },
  },
};
