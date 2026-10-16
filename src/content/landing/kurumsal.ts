import type { LandingGroup } from './types';
import { VISIT_EN, VISIT_TR } from './visit';

/**
 * Corporate on-site photography page.
 *
 * Its first job is not search. A procurement officer who receives our quote
 * looks the business up before deciding whether to take it seriously, and
 * until now they found a shop that sells passport photos. This page is what
 * backs the quote up.
 *
 * Every claim here is one the owner has already made to a real client (the
 * October 2026 chamber-of-commerce tender): on-site at the institution, 150
 * people and 30 group shots planned into a single day, white background at
 * 4,5 x 6 cm, delivery digital or printed within five working days, the shop
 * staying open meanwhile. Capacity beyond 150, travel outside Istanbul,
 * corporate invoicing and any service other than staff and group photographs
 * are deliberately absent — they have not been confirmed. Do not add them
 * without asking.
 *
 * No prices: corporate work is quoted per job, and a figure here would both
 * anchor the negotiation and misprice jobs of a different size.
 */
export const kurumsalGroup: LandingGroup = {
  tr: {
    path: '/tr/kurumsal-fotograf-cekimi',
    content: {
      locale: 'tr',
      dir: 'ltr',
      metaTitle: 'Kurumsal Toplu Fotoğraf Çekimi | Kurum Binanızda – İstanbul',
      metaDescription:
        'Kurum binanıza gelip personel vesikalığı ve kurul fotoğraflarını çekiyoruz. Beyaz fon, standart ölçü, dijital veya baskılı teslim, 5 iş günü. Sirkeci’de 1969’dan beri.',
      keywords: [
        'kurumsal fotoğraf çekimi',
        'toplu vesikalık çekimi',
        'personel fotoğrafı çekimi',
        'kurumda toplu fotoğraf',
        'şirket personel vesikalık',
        'kurul fotoğrafı çekimi',
        'kurumsal fotoğrafçı istanbul',
      ],
      badge: 'KURUM BİNANIZDA • TOPLU ÇEKİM • 5 İŞ GÜNÜ',
      h1: 'Kurumsal Toplu Fotoğraf Çekimi',
      intro:
        'Personelinizin vesikalıklarını ve kurul fotoğraflarınızı kendi binanızda çekiyoruz. Ekibimiz belirlenen gün kurumunuza gelir, çekimi tek günde tamamlar; dosyaları dijital olarak, isterseniz baskılarıyla birlikte teslim ederiz. Kimsenin işinden ayrılıp fotoğrafçıya gitmesi gerekmez.',
      heroImage: {
        src: '/images/sirkeci-studyo.jpg',
        alt: 'Beyaz fon, softbox ışıklar ve çekim taburesinden oluşan vesikalık çekim düzeni',
        fit: 'cover',
      },
      whatsappLabel: 'WhatsApp’tan Teklif İsteyin',
      whatsappMessage: 'Merhaba, kurumsal toplu fotoğraf çekimi için teklif almak istiyorum.',
      callLabel: 'Hemen Arayın',
      directionsLabel: 'Yol Tarifi Al',

      highlights: [
        { title: 'Kurum binanızda', text: 'Ekibimiz size gelir; personelin iş başından ayrılması gerekmez.' },
        { title: 'Tek günde tamamlanır', text: '150 kişilik bir kurumu ve kurul fotoğraflarını bir güne planlıyoruz.' },
        { title: '5 iş günü teslim', text: 'Baskılı ya da baskısız, çekimden sonraki beş iş günü içinde.' },
        { title: '1969’dan beri Sirkeci’de', text: 'Aynı adreste çalışan bir işletmeyle muhatap olursunuz.' },
      ],

      table: {
        h2: 'Ne Çekiyoruz, Ne Teslim Ediyoruz',
        columns: ['Kapsam', 'Ayrıntı'],
        rows: [
          ['Personel vesikalığı', 'Beyaz fon, 4,5 x 6 cm standart ölçü'],
          ['Kurul ve grup fotoğrafı', 'Komite, yönetim kurulu, meclis gibi grupların toplu fotoğrafı'],
          ['Dijital teslim', 'Her personelin dosyası dijital olarak'],
          ['Baskılı teslim', 'İstenirse kişi başı baskı, aynı teslim süresinde'],
        ],
        note: 'Ölçü ve fon, kurumunuzun belge şartına göre ayarlanır. Farklı bir ölçü gerekiyorsa teklif aşamasında belirtmeniz yeterli.',
      },

      sections: [
        {
          h2: 'Çekim İçin Gereken',
          paragraphs: [
            'Kurum içinde çekim yapılabilecek bir oda ve elektrik bağlantısı yeterli. Düzeni biz kurar, çekim bitince toplarız.',
            'Çekim günü dükkânımız açık kalmaya devam eder; kurumunuzdaki işi ayrı bir ekiple yürütürüz.',
          ],
        },
        {
          h2: 'Teklif Nasıl Alınır?',
          paragraphs: [
            'Kişi sayısını, varsa grup çekimi sayısını ve düşündüğünüz tarihi iletin; teklifi aynı gün hazırlayıp gönderelim.',
            'Dijital teslim ile baskılı teslim için ayrı ayrı fiyat veriyoruz, böylece ikisini karşılaştırarak karar verebiliyorsunuz.',
          ],
        },
      ],

      steps: {
        h2: 'Nasıl İlerliyor?',
        items: [
          { title: 'Talebinizi iletin', text: 'Kişi sayısı, grup çekimi sayısı ve tarih.' },
          { title: 'Teklif', text: 'Dijital ve baskılı seçenekleriyle birlikte, aynı gün yazılı teklif.' },
          { title: 'Çekim günü', text: 'Ekibimiz kurumunuza gelir, düzeni kurar ve çekimi tamamlar.' },
          { title: 'Teslim', text: 'Beş iş günü içinde dijital dosyalar, istenirse baskılarla birlikte.' },
        ],
      },

      faq: {
        h2: 'Sık Sorulan Sorular',
        items: [
          {
            q: 'Çekim nerede yapılıyor?',
            a: 'Kurumunuzun kendi binasında. Çekim düzenini biz getirip kuruyoruz.',
          },
          {
            q: 'Kaç kişilik çekim yapabiliyorsunuz?',
            a: '150 kişilik bir kurumu kurul fotoğraflarıyla birlikte tek güne planlıyoruz. Daha kalabalık kurumlarda kişi sayısını iletin, planı birlikte çıkaralım.',
          },
          {
            q: 'Teslim ne kadar sürüyor?',
            a: 'Çekimden sonraki beş iş günü içinde teslim ediyoruz; baskılı ya da baskısız olması süreyi değiştirmiyor.',
          },
          {
            q: 'Hem dijital hem baskı alabilir miyiz?',
            a: 'Evet. Teklifte iki seçeneği ayrı ayrı fiyatlandırıyoruz; ikisini birden de alabilirsiniz.',
          },
          {
            q: 'Fiyat nasıl belirleniyor?',
            a: 'Kişi sayısına ve teslim biçimine göre. Sayıyı iletin, yazılı teklifi aynı gün gönderelim.',
          },
        ],
      },

      visit: VISIT_TR,

      related: {
        h2: 'İlgili Sayfalar',
        links: [
          { label: 'Vesikalık & Biyometrik Fotoğraf', href: '/tr/vesikalik-fotograf' },
          { label: 'Vize Fotoğrafı', href: '/tr/vize-fotografi' },
          { label: 'Fotoğraf Baskı', href: '/tr/fotograf-baski' },
        ],
      },

      breadcrumbHome: 'Ana Sayfa',
      languageName: 'Türkçe',
    },
  },

  en: {
    path: '/en/corporate-photography',
    content: {
      locale: 'en',
      dir: 'ltr',
      metaTitle: 'Corporate Group Photography | At Your Premises – Istanbul',
      metaDescription:
        'We photograph staff ID portraits and board group shots at your own premises in Istanbul. White background, standard sizes, digital or printed delivery within five working days.',
      keywords: [
        'corporate photography istanbul',
        'staff id photos company',
        'on site passport photos',
        'group photography company istanbul',
        'employee photo shoot istanbul',
      ],
      badge: 'AT YOUR PREMISES • GROUP SHOOTS • 5 WORKING DAYS',
      h1: 'Corporate Group Photography',
      intro:
        'We photograph your staff and your boards at your own premises. Our team comes on the agreed day, completes the shoot in a single day and delivers the files digitally, with prints if you want them. Nobody has to leave their desk to visit a studio.',
      heroImage: {
        src: '/images/sirkeci-studyo.jpg',
        alt: 'An ID photo setup: white backdrop, softbox lighting and a posing stool',
        fit: 'cover',
      },
      whatsappLabel: 'Request a Quote on WhatsApp',
      whatsappMessage: 'Hello, I would like a quote for corporate group photography. / Merhaba, kurumsal toplu fotoğraf çekimi için teklif almak istiyorum.',
      callLabel: 'Call Now',
      directionsLabel: 'Get Directions',

      highlights: [
        { title: 'At your premises', text: 'Our team comes to you; your staff stay at their desks.' },
        { title: 'Finished in one day', text: 'We plan a 150-person organisation, board shots included, into a single day.' },
        { title: 'Five working days', text: 'Delivery within five working days, with or without prints.' },
        { title: 'In Sirkeci since 1969', text: 'You deal with a business that has kept the same address.' },
      ],

      table: {
        h2: 'What We Shoot and Deliver',
        columns: ['Scope', 'Detail'],
        rows: [
          ['Staff ID portraits', 'White background, 4.5 x 6 cm standard size'],
          ['Board and group photographs', 'Committees, boards, councils and other groups'],
          ['Digital delivery', 'Each person’s file, delivered digitally'],
          ['Printed delivery', 'Prints per person if required, within the same timeframe'],
        ],
        note: 'Sizes and background are set to whatever your documents require. Tell us at the quote stage if you need something other than the standard.',
      },

      sections: [
        {
          h2: 'What We Need On Site',
          paragraphs: [
            'A room inside your building and a power socket are enough. We bring the setup, and pack it away when the shoot is finished.',
            'Our shop stays open on the day; the work at your premises is handled by a separate team.',
          ],
        },
        {
          h2: 'Getting a Quote',
          paragraphs: [
            'Send us the number of people, the number of group shots if any, and the date you have in mind, and we will send a written quote the same day.',
            'We price digital and printed delivery separately so you can compare the two before deciding.',
          ],
        },
      ],

      steps: {
        h2: 'How It Works',
        items: [
          { title: 'Send your request', text: 'Number of people, number of group shots, and the date.' },
          { title: 'Quote', text: 'A written quote the same day, digital and printed options priced separately.' },
          { title: 'Shoot day', text: 'Our team arrives, sets up and completes the shoot.' },
          { title: 'Delivery', text: 'Digital files within five working days, with prints if ordered.' },
        ],
      },

      faq: {
        h2: 'Frequently Asked Questions',
        items: [
          { q: 'Where does the shoot take place?', a: 'At your own premises. We bring and set up the equipment.' },
          { q: 'How many people can you photograph?', a: 'We plan a 150-person organisation, board shots included, into a single day. For larger organisations, send us the numbers and we will plan it with you.' },
          { q: 'How long does delivery take?', a: 'Within five working days of the shoot, whether or not prints are included.' },
          { q: 'Can we have both digital files and prints?', a: 'Yes. The quote prices them separately and you can take both.' },
          { q: 'How is the price set?', a: 'By the number of people and the delivery format. Send us the numbers and the written quote follows the same day.' },
        ],
      },

      visit: VISIT_EN,

      related: {
        h2: 'Related Pages',
        links: [
          { label: 'Passport & Biometric Photos', href: '/en/passport-photo' },
          { label: 'Visa Photos', href: '/en/visa-photo' },
          { label: 'Photo Printing', href: '/en/photo-printing' },
        ],
      },

      breadcrumbHome: 'Home',
      languageName: 'English',
    },
  },
};
