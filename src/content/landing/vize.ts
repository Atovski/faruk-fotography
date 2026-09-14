import type { LandingGroup } from './types';
import { FAQ_HOURS_EN, FAQ_HOURS_TR, FAQ_PRICE_EN, FAQ_PRICE_TR, STEPS_PHOTO_EN, STEPS_PHOTO_TR, VISIT_EN, VISIT_TR } from './visit';

/**
 * Visa photo page. Only sizes that sources agree on are listed; countries with
 * conflicting or application-dependent sizes point to the consulate instead.
 */
export const vizeGroup: LandingGroup = {
  tr: {
    path: '/tr/vize-fotografi',
    content: {
      locale: 'tr',
      dir: 'ltr',
      metaTitle: 'Vize Fotoğrafı Sirkeci | Schengen, ABD, Çin ve Tüm Ülkeler',
      metaDescription:
        'Schengen (35x45 mm), ABD (5x5 cm), Çin (33x48 mm) ve tüm ülke vizeleri için konsolosluk şartlarına uygun vize fotoğrafı. 5 dakikada hazır, dijital dosya ücretsiz. Sirkeci.',
      keywords: [
        'vize fotoğrafı',
        'schengen vize fotoğrafı',
        'abd vize fotoğrafı',
        'amerika vize fotoğrafı 5x5',
        'çin vize fotoğrafı',
        'vize fotoğrafı ölçüleri',
        'ds-160 fotoğraf',
        'vize fotoğrafı sirkeci',
      ],
      badge: 'SCHENGEN • ABD • ÇİN • TÜM ÜLKELER',
      h1: 'Vize Fotoğrafı: Schengen, ABD, Çin ve Tüm Ülkeler',
      intro:
        "Her ülkenin konsolosluğu farklı ölçü ve kural ister. Sirkeci'deki stüdyomuzda vize fotoğrafınızı başvurduğunuz ülkenin şartlarına göre 5 dakikada hazırlıyor, online başvuru formları için dijital dosyasını ücretsiz veriyoruz.",
      whatsappLabel: "WhatsApp'tan Yazın",
      whatsappMessage: 'Merhaba, vize fotoğrafı için yazıyorum.',
      callLabel: 'Hemen Arayın',
      directionsLabel: 'Yol Tarifi Al',
      highlights: [
        { title: 'Ülkeye göre doğru ölçü', text: "Schengen'den ABD'ye, Çin'den Kanada'ya başvurunuza uygun ölçüde çekim." },
        { title: 'Dijital dosya ücretsiz', text: 'DS-160 gibi online formlara yüklemeniz için fotoğrafı telefonunuza gönderiyoruz.' },
        { title: '5 dakikada hazır', text: 'Çekim ve baskı birkaç dakikada tamamlanır.' },
        { title: "1969'dan beri Sirkeci'de", text: "Yarım asrı aşkın tecrübesiyle Fatih'in köklü fotoğraf stüdyosu." },
      ],
      table: {
        h2: 'Ülkelere Göre Vize Fotoğrafı Ölçüleri',
        columns: ['Ülke / Başvuru', 'Fotoğraf ölçüsü'],
        rows: [
          ['Schengen ülkeleri', '35 x 45 mm'],
          ['İngiltere', '35 x 45 mm'],
          ['Rusya', '35 x 45 mm'],
          ['ABD (vize ve DS-160)', '5 x 5 cm (2 x 2 inç)'],
          ['Çin', '33 x 48 mm'],
          ['Kanada', 'Başvuru türüne göre değişir'],
          ['Diğer ülkeler', 'Konsolosluk şartına göre'],
        ],
        note: 'Konsolosluklar şartlarını güncelleyebilir; başvuru öncesi ilgili konsolosluğun veya vize başvuru merkezinin sitesini kontrol edin.',
      },
      sections: [
        {
          h2: 'Schengen Vizesi Fotoğrafı',
          paragraphs: [
            'Schengen ülkeleri 35 x 45 mm ölçüsünde, açık renkli düz fonlu ve son 6 ay içinde çekilmiş fotoğraf ister. Yüz karşıdan ve net görünmeli, fotoğrafın büyük bölümünü kaplamalıdır.',
          ],
        },
        {
          h2: 'ABD Vizesi Fotoğrafı (DS-160)',
          paragraphs: [
            'ABD vizesi için kare formatta 5 x 5 cm (2 x 2 inç) fotoğraf gerekir. Fon beyaz veya kırık beyaz olmalı, fotoğrafta gözlük takılmamalıdır.',
            'DS-160 formuna fotoğrafın dijital hali yüklenir. Çekimden sonra size dijital dosyayı ücretsiz gönderiyoruz.',
          ],
        },
        {
          h2: 'Çin Vizesi Fotoğrafı',
          paragraphs: ['Çin vizesi 33 x 48 mm ölçüsünde, beyaz fonlu fotoğraf ister. Yüz karşıdan, net ve gölgesiz görünmelidir.'],
        },
      ],
      steps: STEPS_PHOTO_TR,
      faq: {
        h2: 'Sık Sorulan Sorular',
        items: [
          { q: 'Vize fotoğrafı kaç ay geçerlidir?', a: 'Konsolosluklar genellikle son 6 ay içinde çekilmiş fotoğraf ister.' },
          {
            q: 'Schengen vizesi için biyometrik (50x60) fotoğrafımı kullanabilir miyim?',
            a: 'Hayır. Pasaport ve kimlikte kullanılan 50 x 60 mm fotoğraf Schengen için uygun değildir; Schengen başvurularında 35 x 45 mm fotoğraf istenir.',
          },
          { q: 'ABD vizesi için gözlükle fotoğraf çekilebilir mi?', a: 'Hayır. ABD vize fotoğraflarında gözlük takılmaz; çekim sırasında gözlüğünüzü çıkarmanızı isteriz.' },
          { q: 'Dijital dosya veriyor musunuz?', a: 'Evet, her çekimde dijital dosyayı ücretsiz olarak WhatsApp veya e-posta ile gönderiyoruz.' },
          FAQ_PRICE_TR,
          FAQ_HOURS_TR,
        ],
      },
      visit: VISIT_TR,
      related: {
        h2: 'İlgili Sayfalar',
        links: [
          { label: 'Vesikalık & Biyometrik Fotoğraf', href: '/tr/vesikalik-fotograf' },
          { label: 'İkamet İzni Fotoğrafı', href: '/tr/ikamet-fotografi' },
          { label: 'Fotoğraf Baskı', href: '/tr/fotograf-baski' },
        ],
      },
      breadcrumbHome: 'Ana Sayfa',
      languageName: 'Türkçe',
    },
  },

  en: {
    path: '/en/visa-photo',
    content: {
      locale: 'en',
      dir: 'ltr',
      metaTitle: 'Visa Photos Istanbul | Schengen, US, China & All Countries – Sirkeci',
      metaDescription:
        'Visa photos to consulate rules: Schengen (35x45 mm), US (2x2 in), China (33x48 mm) and every other country. Ready in 5 minutes with a free digital file. Sirkeci, Istanbul.',
      keywords: [
        'visa photo istanbul',
        'schengen visa photo istanbul',
        'us visa photo istanbul',
        'ds-160 photo istanbul',
        'china visa photo istanbul',
        'visa photo size',
        'visa photo sirkeci',
      ],
      badge: 'SCHENGEN • US • CHINA • ALL COUNTRIES',
      h1: 'Visa Photos: Schengen, US, China & Every Country',
      intro:
        "Every consulate asks for a different size and set of rules. At our studio in Sirkeci we take your visa photo to the requirements of the country you're applying to in 5 minutes, and include a free digital file for online application forms.",
      whatsappLabel: 'Message us on WhatsApp',
      whatsappMessage: 'Hello, I need a visa photo. / Merhaba, vize fotoğrafı için yazıyorum.',
      callLabel: 'Call Now',
      directionsLabel: 'Get Directions',
      highlights: [
        { title: 'The right size per country', text: 'From Schengen to the US, China to Canada – shot to your application.' },
        { title: 'Free digital file', text: 'We send the photo to your phone for online forms such as the DS-160.' },
        { title: 'Ready in 5 minutes', text: 'Shooting and printing take just a few minutes.' },
        { title: 'In Sirkeci since 1969', text: "One of Fatih's longest-established photo studios." },
      ],
      table: {
        h2: 'Visa Photo Sizes by Country',
        columns: ['Country / application', 'Photo size'],
        rows: [
          ['Schengen countries', '35 x 45 mm'],
          ['United Kingdom', '35 x 45 mm'],
          ['Russia', '35 x 45 mm'],
          ['United States (visa & DS-160)', '2 x 2 in (5 x 5 cm)'],
          ['China', '33 x 48 mm'],
          ['Canada', 'Depends on the application type'],
          ['Other countries', 'As required by the consulate'],
        ],
        note: "Consulates update their rules – check the consulate's or visa application centre's website before you apply.",
      },
      sections: [
        {
          h2: 'Schengen Visa Photo',
          paragraphs: [
            'Schengen countries require a 35 x 45 mm photo with a plain light background, taken within the last 6 months. Your face should be straight on, sharp and fill most of the frame.',
          ],
        },
        {
          h2: 'US Visa Photo (DS-160)',
          paragraphs: [
            'A US visa needs a square 2 x 2 inch (5 x 5 cm) photo on a white or off-white background, without glasses.',
            'The DS-160 form requires a digital photo – we send you the digital file free of charge after the shoot.',
          ],
        },
        {
          h2: 'China Visa Photo',
          paragraphs: ['A Chinese visa requires a 33 x 48 mm photo on a white background, with the face straight on, sharp and free of shadows.'],
        },
      ],
      steps: STEPS_PHOTO_EN,
      faq: {
        h2: 'Frequently Asked Questions',
        items: [
          { q: 'How recent must a visa photo be?', a: 'Consulates usually ask for a photo taken within the last 6 months.' },
          {
            q: 'Can I use a 50x60 mm biometric photo for a Schengen visa?',
            a: 'No. The 50 x 60 mm photo used for Turkish passports and ID is not suitable for Schengen, which asks for 35 x 45 mm.',
          },
          { q: 'Can I wear glasses in a US visa photo?', a: "No. Glasses aren't allowed in US visa photos, so we'll ask you to take them off for the shoot." },
          { q: 'Do I get a digital file?', a: 'Yes – every shoot includes a free digital copy sent via WhatsApp or email.' },
          FAQ_PRICE_EN,
          FAQ_HOURS_EN,
        ],
      },
      visit: VISIT_EN,
      related: {
        h2: 'Related Pages',
        links: [
          { label: 'Passport & Biometric Photos', href: '/en/passport-photo' },
          { label: 'Residence Permit Photos', href: '/en/residence-permit-photo' },
          { label: 'Photo Printing', href: '/en/photo-printing' },
        ],
      },
      breadcrumbHome: 'Home',
      languageName: 'English',
    },
  },
};
