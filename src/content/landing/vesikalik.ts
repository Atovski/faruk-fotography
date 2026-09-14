import type { LandingGroup } from './types';
import { FAQ_HOURS_EN, FAQ_HOURS_TR, FAQ_PRICE_EN, FAQ_PRICE_TR, STEPS_PHOTO_EN, STEPS_PHOTO_TR, VISIT_EN, VISIT_TR } from './visit';

/** Hub page for every ID/passport/permit/visa photo — the shop's top earner. */
export const vesikalikGroup: LandingGroup = {
  tr: {
    path: '/tr/vesikalik-fotograf',
    content: {
      locale: 'tr',
      dir: 'ltr',
      metaTitle: 'Vesikalık & Biyometrik Fotoğraf Sirkeci | 5 Dakikada Hazır',
      metaDescription:
        'Pasaport, kimlik, ehliyet, ikamet, çalışma izni ve tüm ülke vizeleri için biyometrik vesikalık fotoğraf. 5 dakikada hazır, dijital dosya ücretsiz. Sirkeci, Fatih.',
      keywords: [
        'vesikalık fotoğraf',
        'biyometrik fotoğraf',
        'vesikalık fotoğraf sirkeci',
        'biyometrik fotoğraf eminönü',
        'vesikalık fotoğraf fatih',
        'pasaport fotoğrafı',
        'kimlik fotoğrafı',
        'ehliyet fotoğrafı',
      ],
      badge: "SİRKECİ • 1969'DAN BERİ",
      h1: 'Vesikalık ve Biyometrik Fotoğraf',
      intro:
        "Pasaport, kimlik, ehliyet, ikamet izni, çalışma izni ve tüm ülke vizeleri için biyometrik vesikalık fotoğrafınızı Sirkeci'deki stüdyomuzda 5 dakikada hazırlıyoruz. Her çekimde fotoğrafınızın dijital dosyasını da ücretsiz veriyoruz.",
      whatsappLabel: "WhatsApp'tan Yazın",
      whatsappMessage: 'Merhaba, vesikalık / biyometrik fotoğraf için yazıyorum.',
      callLabel: 'Hemen Arayın',
      directionsLabel: 'Yol Tarifi Al',
      highlights: [
        { title: '5 dakikada hazır', text: 'Çekim ve baskı birkaç dakikada tamamlanır, fotoğrafınızı hemen teslim alırsınız.' },
        { title: 'Dijital dosya ücretsiz', text: 'Online başvuru formlarına yüklemeniz için dosyayı WhatsApp veya e-posta ile gönderiyoruz.' },
        { title: 'Tüm belge ve ülke ölçüleri', text: "Türkiye'deki resmi belgelerden yabancı konsolosluk vizelerine kadar doğru ölçüde çekim." },
        { title: 'Profesyonel ışık ve baskı', text: 'Stüdyo ışığı ve kaliteli fotoğraf baskısıyla net, doğal sonuç.' },
      ],
      table: {
        h2: 'Hangi Belge İçin Hangi Ölçü?',
        columns: ['Belge', 'Fotoğraf ölçüsü'],
        rows: [
          ['Pasaport', '50 x 60 mm biyometrik'],
          ['Kimlik kartı', '50 x 60 mm biyometrik'],
          ['Sürücü belgesi (ehliyet)', '50 x 60 mm biyometrik'],
          ['İkamet izni (Göç İdaresi)', '50 x 60 mm biyometrik'],
          ['Schengen vizesi', '35 x 45 mm'],
          ['ABD vizesi', '5 x 5 cm (2 x 2 inç)'],
          ['Çin vizesi', '33 x 48 mm'],
          ['Diğer ülke vizeleri', 'Konsolosluk şartına göre'],
        ],
        note: "Ölçüler kurumlara göre değişebilir; başvuru yaptığınız kurumun güncel şartlarını kontrol edin. Hangi ölçüye ihtiyacınız olduğundan emin değilseniz WhatsApp'tan sorun, birlikte netleştirelim.",
      },
      sections: [
        {
          h2: 'Biyometrik Fotoğraf Nedir?',
          paragraphs: [
            'Biyometrik fotoğraf, yüz tanıma sistemlerinin okuyabilmesi için uluslararası ICAO standartlarına göre çekilen vesikalık fotoğraftır. Beyaz fon, karşıdan bakış, belirli yüz oranı ve gölgesiz ışık gerektirir. Pasaport, kimlik kartı ve ikamet izni gibi belgelerde zorunludur.',
            'Evde ya da fotoğraf kabinlerinde çekilen fotoğraflar ölçü, ışık veya fon nedeniyle başvuruda geri çevrilebilir. Stüdyomuzda her fotoğrafı baskıdan önce kontrol ediyoruz.',
          ],
        },
        {
          h2: 'Hangi İşlemler İçin Çekiyoruz?',
          bullets: [
            'Pasaport, kimlik kartı ve ehliyet başvuruları',
            'Yabancılar için ikamet izni ve çalışma izni',
            'Schengen, ABD, Çin, İngiltere ve tüm ülke vizeleri',
            'CV, iş ve okul başvuruları için vesikalık',
          ],
        },
      ],
      steps: STEPS_PHOTO_TR,
      faq: {
        h2: 'Sık Sorulan Sorular',
        items: [
          { q: 'Vesikalık fotoğraf ne kadar sürede hazır olur?', a: 'Çekim ve baskı genellikle 5 dakika içinde tamamlanır.' },
          { q: 'Dijital dosya veriyor musunuz?', a: 'Evet, her çekimde fotoğrafınızın dijital dosyasını ücretsiz olarak WhatsApp veya e-posta ile gönderiyoruz.' },
          { q: 'Kaç adet fotoğraf veriliyor?', a: "Vesikalık fotoğraflar 4'lü set halinde basılır; daha fazlası gerekirse ek baskı yapabiliriz." },
          {
            q: 'Pasaport ve kimlik için aynı fotoğraf kullanılabilir mi?',
            a: 'Evet, ikisi de 50 x 60 mm biyometrik fotoğraf ister. Fotoğrafın son 6 ay içinde çekilmiş olması gerekir.',
          },
          FAQ_PRICE_TR,
          FAQ_HOURS_TR,
        ],
      },
      visit: VISIT_TR,
      related: {
        h2: 'İlgili Sayfalar',
        links: [
          { label: 'İkamet İzni Fotoğrafı', href: '/tr/ikamet-fotografi' },
          { label: 'Vize Fotoğrafı', href: '/tr/vize-fotografi' },
          { label: 'Fotoğraf Baskı', href: '/tr/fotograf-baski' },
        ],
      },
      breadcrumbHome: 'Ana Sayfa',
      languageName: 'Türkçe',
    },
  },

  en: {
    path: '/en/passport-photo',
    content: {
      locale: 'en',
      dir: 'ltr',
      metaTitle: 'Passport Photos Istanbul | Biometric Photos in Sirkeci – Ready in 5 Minutes',
      metaDescription:
        'Biometric photos for passports, Turkish ID, residence and work permits, and visas for every country. Ready in 5 minutes with a free digital file. Sirkeci, Istanbul.',
      keywords: [
        'passport photo istanbul',
        'biometric photo istanbul',
        'passport photo sirkeci',
        'passport photos near me istanbul',
        'visa photo istanbul',
        'id photo istanbul',
        'photo studio sirkeci',
      ],
      badge: 'SIRKECI • SINCE 1969',
      h1: 'Passport & Biometric Photos in Istanbul',
      intro:
        'We take biometric photos for passports, Turkish ID cards and driving licences, residence and work permits, and visas for every country – ready in 5 minutes at our studio in Sirkeci. Every shoot includes a free digital copy of your photo.',
      whatsappLabel: 'Message us on WhatsApp',
      whatsappMessage: 'Hello, I need passport / biometric photos. / Merhaba, vesikalık fotoğraf için yazıyorum.',
      callLabel: 'Call Now',
      directionsLabel: 'Get Directions',
      highlights: [
        { title: 'Ready in 5 minutes', text: 'Shooting and printing take just a few minutes – you leave with your photos.' },
        { title: 'Free digital file', text: 'We send your photo via WhatsApp or email for online application forms.' },
        { title: 'Every document and country', text: 'From Turkish official documents to foreign consulate visas, shot at the right size.' },
        { title: 'Professional light & prints', text: 'Studio lighting and quality photo prints for a sharp, natural result.' },
      ],
      table: {
        h2: 'Which Photo Size Do I Need?',
        columns: ['Document', 'Photo size'],
        rows: [
          ['Turkish passport', '50 x 60 mm biometric'],
          ['Turkish ID card', '50 x 60 mm biometric'],
          ['Turkish driving licence', '50 x 60 mm biometric'],
          ['Turkish residence permit (ikamet)', '50 x 60 mm biometric'],
          ['Schengen visa', '35 x 45 mm'],
          ['US passport & visa', '2 x 2 in (5 x 5 cm)'],
          ['China visa', '33 x 48 mm'],
          ['Other countries', 'As required by the consulate'],
        ],
        note: "Sizes can differ between authorities – check the current rules of the office you're applying to. Not sure which size you need? Ask us on WhatsApp.",
      },
      sections: [
        {
          h2: 'What Is a Biometric Photo?',
          paragraphs: [
            'A biometric photo is an ID photo taken to the international ICAO standard so facial recognition systems can read it. It needs a white background, a straight-on pose, a set face size and even, shadow-free lighting. It is mandatory for passports, ID cards and residence permits.',
            'Photos taken at home or in photo booths are often rejected because of size, lighting or background. We check every photo before printing.',
          ],
        },
        {
          h2: 'What We Photograph For',
          bullets: [
            'Passports and ID cards',
            'Turkish residence permits and work permits',
            'Schengen, US, China, UK and all other visas',
            'CV, job and school applications',
          ],
        },
      ],
      steps: STEPS_PHOTO_EN,
      faq: {
        h2: 'Frequently Asked Questions',
        items: [
          { q: 'How long does it take?', a: 'Shooting and printing usually take about 5 minutes.' },
          { q: 'Do I get a digital file?', a: 'Yes – every shoot includes a free digital copy sent via WhatsApp or email.' },
          { q: 'How many photos do I get?', a: 'Photos are printed as a set of 4, and we can print extra copies if you need more.' },
          {
            q: 'Can I get photos for my home country passport?',
            a: 'Yes. Tell us which country and document it is for, and we will shoot to that consulate\'s size and rules.',
          },
          FAQ_PRICE_EN,
          FAQ_HOURS_EN,
        ],
      },
      visit: VISIT_EN,
      related: {
        h2: 'Related Pages',
        links: [
          { label: 'Residence Permit Photos', href: '/en/residence-permit-photo' },
          { label: 'Visa Photos', href: '/en/visa-photo' },
          { label: 'Photo Printing', href: '/en/photo-printing' },
        ],
      },
      breadcrumbHome: 'Home',
      languageName: 'English',
    },
  },
};
