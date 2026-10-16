import type { LandingGroup } from './types';
import { FAQ_HOURS_EN, FAQ_HOURS_TR, FAQ_PRICE_EN, FAQ_PRICE_TR, STEPS_PHOTO_EN, STEPS_PHOTO_TR, VISIT_EN, VISIT_TR } from './visit';

/**
 * Green Card (Diversity Visa) photo page.
 *
 * Every figure below is the U.S. Department of State's own, read off
 * travel.state.gov in October 2026: 2x2 in / 51x51 mm print, 600x600 px
 * digital, JPEG at 240 kB or under, head 22-35 mm (50-69% of frame).
 * These are the numbers an application is rejected against, so change them
 * only against the official page, never from memory.
 *
 * No prices here — same rule as the other document-photo pages.
 */
export const greenCardGroup: LandingGroup = {
  tr: {
    path: '/tr/green-card-fotografi',
    content: {
      locale: 'tr',
      dir: 'ltr',
      metaTitle: 'Green Card Fotoğrafı Sirkeci | 600x600 Piksel, 5x5 cm, Aynı Gün',
      metaDescription:
        'ABD Green Card (DV) başvurusu için 5x5 cm baskı ve 600x600 piksel dijital fotoğraf. Beyaz fon, gözlüksüz, 240 kB altı JPEG. Sirkeci’de aynı gün, dijital dosya ücretsiz.',
      keywords: [
        'green card fotoğrafı',
        'green card foto',
        'green card fotoğraf ölçüleri',
        'amerika green card fotoğrafı',
        'dv lottery fotoğraf',
        'green card başvuru fotoğrafı',
        '600x600 piksel fotoğraf',
        'green card fotoğrafı sirkeci',
      ],
      badge: '600 × 600 PİKSEL • 5 × 5 CM • BEYAZ FON',
      h1: 'Green Card Fotoğrafı',
      intro:
        'ABD Green Card başvurusunun fotoğraf kuralları diğer vize fotoğraflarından farklı: kare format, 600 x 600 piksel ve 240 kB’ı aşmayan bir JPEG isteniyor. Sirkeci’deki stüdyomuzda fotoğrafınızı bu ölçülere göre çekiyoruz; online formda yükleyeceğiniz dosyayı ve konsolosluğa götüreceğiniz baskıları aynı gün veriyoruz.',
      heroImage: {
        src: '/images/sirkeci-studyo.jpg',
        alt: 'Faruk Fotoğrafçılık’ın Sirkeci’deki çekim stüdyosu: beyaz fon, softbox ışıklar ve çekim taburesi',
        fit: 'cover',
      },
      whatsappLabel: 'WhatsApp’tan Yazın',
      whatsappMessage: 'Merhaba, green card fotoğrafı için yazıyorum.',
      callLabel: 'Hemen Arayın',
      directionsLabel: 'Yol Tarifi Al',

      highlights: [
        { title: 'Kare format, doğru ölçü', text: '5 x 5 cm baskı, 600 x 600 piksel dijital. İkisi de kare.' },
        { title: '240 kB sınırının altında', text: 'Online form bu boyutun üstündeki dosyayı kabul etmiyor; biz sınırın altında veriyoruz.' },
        { title: 'Dijital dosya ücretsiz', text: 'Formu doldururken yükleyeceğiniz JPEG’i ücretsiz gönderiyoruz.' },
        { title: 'Aynı gün', text: 'Çekim birkaç dakika sürüyor, baskılarınızı aynı gün alıyorsunuz.' },
      ],

      table: {
        h2: 'Resmî Şartlar',
        intro: 'Aşağıdaki değerler ABD Dışişleri Bakanlığı’nın yayınladığı kurallardır; başvurunuz bunlara göre değerlendirilir.',
        columns: ['Şart', 'Kural'],
        rows: [
          ['Baskı ölçüsü', '5 x 5 cm (2 x 2 inç), kare'],
          ['Dijital ölçü', '600 x 600 piksel, kare'],
          ['Dosya biçimi ve boyutu', 'JPEG, en fazla 240 kB'],
          ['Tarama çözünürlüğü', 'Basılı fotoğraf taranacaksa 300 dpi'],
          ['Baş büyüklüğü', 'Çeneden tepeye 22 – 35 mm, yani karenin %50 – %69’u'],
          ['Arka plan', 'Düz beyaz veya kırık beyaz'],
          ['Fotoğrafın yaşı', 'Son 6 ay içinde çekilmiş olmalı'],
          ['Gözlük', 'Takılamaz. Tıbbi zorunluluk varsa doktor raporu isteniyor'],
          ['Başlık / başörtüsü', 'Yalnızca her gün dinî sebeple takılıyorsa. Saç çizgisini kapatmamalı, yüze gölge düşürmemeli'],
          ['İfade ve duruş', 'Nötr ifade, iki göz açık, yüz doğrudan kameraya dönük'],
          ['Renk', 'Renkli olmalı'],
        ],
        note: 'Kaynak: ABD Dışişleri Bakanlığı (travel.state.gov), Ekim 2026. Konsolosluk görüşmesine iki adet aynı fotoğrafı basılı götürmeniz isteniyor.',
      },

      sections: [
        {
          h2: 'Size Ne Veriyoruz?',
          bullets: [
            'Online başvuruya yükleyeceğiniz 600 x 600 piksel, 240 kB altı JPEG dosya',
            'Konsolosluk görüşmesi için iki adet 5 x 5 cm baskı',
            'Dosyayı WhatsApp veya e-posta ile, baskıları elden',
          ],
        },
        {
          h2: 'Başvurudan Önce',
          paragraphs: [
            'Telefonla çekilmiş bir fotoğrafı kırpıp yüklemek çoğu zaman sonuç vermiyor: sistem kare oranı, baş büyüklüğü ve dosya boyutunu birlikte kontrol ediyor ve biri tutmazsa fotoğrafı geri çeviriyor.',
            'Elinizde başka bir başvuru için çektirdiğiniz fotoğraf varsa getirin, ölçülere uyup uymadığına birlikte bakalım. Uyuyorsa yeniden çekime gerek kalmaz.',
          ],
        },
      ],

      steps: STEPS_PHOTO_TR,

      faq: {
        h2: 'Sık Sorulan Sorular',
        items: [
          {
            q: 'Green Card fotoğrafı vize fotoğrafından farklı mı?',
            a: 'Ölçü olarak ABD vize fotoğrafıyla aynı: 5 x 5 cm. Farkı, başvuruyu internetten yaparken 600 x 600 piksel ve 240 kB altı bir dosya istenmesi.',
          },
          {
            q: 'Gözlüğümü çıkarmam gerekiyor mu?',
            a: 'Evet. 2016’dan beri gözlüklü fotoğraf kabul edilmiyor. Tıbbi bir zorunluluk varsa doktor raporu ile birlikte başvurulabiliyor.',
          },
          {
            q: 'Başörtüsü ile çekilebilir mi?',
            a: 'Her gün dinî sebeple takılıyorsa evet. Yüzünüzün tamamı görünmeli, saç çizgisi kapanmamalı ve yüze gölge düşmemeli.',
          },
          {
            q: 'Çocuğumun fotoğrafını da çekiyor musunuz?',
            a: 'Evet. Aynı kurallar bebekler ve çocuklar için de geçerli; çekimi onların temposuna göre yapıyoruz.',
          },
          {
            q: 'Dijital dosyayı ayrıca ücretlendiriyor musunuz?',
            a: 'Hayır, dijital dosya ücretsiz. Çekimden sonra WhatsApp veya e-posta ile gönderiyoruz.',
          },
          FAQ_PRICE_TR,
          FAQ_HOURS_TR,
        ],
      },

      visit: VISIT_TR,

      related: {
        h2: 'İlgili Sayfalar',
        links: [
          { label: 'Vize Fotoğrafı', href: '/tr/vize-fotografi' },
          { label: 'Vesikalık & Biyometrik Fotoğraf', href: '/tr/vesikalik-fotograf' },
          { label: 'İkamet İzni Fotoğrafı', href: '/tr/ikamet-fotografi' },
        ],
      },

      breadcrumbHome: 'Ana Sayfa',
      languageName: 'Türkçe',
    },
  },

  en: {
    path: '/en/green-card-photo',
    content: {
      locale: 'en',
      dir: 'ltr',
      metaTitle: 'Green Card Photo Istanbul | 600x600 px, 2x2 in – Sirkeci',
      metaDescription:
        'Green Card (Diversity Visa) photos in Sirkeci, Istanbul: 2x2 in prints and a 600x600 px JPEG under 240 kB. White background, no glasses, same day, digital file free.',
      keywords: [
        'green card photo istanbul',
        'diversity visa photo',
        'dv lottery photo',
        'green card photo requirements',
        '600x600 photo istanbul',
        '2x2 inch photo istanbul',
        'green card photo sirkeci',
      ],
      badge: '600 × 600 PX • 2 × 2 IN • WHITE BACKGROUND',
      h1: 'Green Card Photo',
      intro:
        'The Green Card application has its own photo rules: a square image, 600 x 600 pixels, saved as a JPEG no larger than 240 kB. We shoot to those numbers in our Sirkeci studio and give you both the file you upload to the form and the prints you take to the interview, the same day.',
      heroImage: {
        src: '/images/sirkeci-studyo.jpg',
        alt: 'The photo studio of Faruk Fotoğrafçılık in Sirkeci: white backdrop, softbox lighting and a posing stool',
        fit: 'cover',
      },
      whatsappLabel: 'Message Us on WhatsApp',
      whatsappMessage: 'Hello, I would like a Green Card photo. / Merhaba, green card fotoğrafı için yazıyorum.',
      callLabel: 'Call Now',
      directionsLabel: 'Get Directions',

      highlights: [
        { title: 'Square, to the exact size', text: '2 x 2 inch prints and a 600 x 600 pixel file. Both square.' },
        { title: 'Under the 240 kB limit', text: 'The online form rejects anything larger; we hand you a file below the limit.' },
        { title: 'Digital file included', text: 'The JPEG you upload to the form comes free with the shoot.' },
        { title: 'Same day', text: 'The shoot takes a few minutes and your prints are ready the same day.' },
      ],

      table: {
        h2: 'Official Requirements',
        intro: 'These are the U.S. Department of State’s own figures — your application is judged against them.',
        columns: ['Requirement', 'Rule'],
        rows: [
          ['Print size', '2 x 2 inches (51 x 51 mm), square'],
          ['Digital size', '600 x 600 pixels, square'],
          ['Format and file size', 'JPEG, 240 kB or smaller'],
          ['Scan resolution', '300 dpi if a printed photo is scanned'],
          ['Head size', '22 – 35 mm chin to crown, i.e. 50% – 69% of the frame'],
          ['Background', 'Plain white or off-white'],
          ['Age of photo', 'Taken within the last 6 months'],
          ['Glasses', 'Not allowed. A doctor’s statement is required for medical exceptions'],
          ['Head covering', 'Only if worn daily for religious reasons. It must not cover the hairline or cast shadows'],
          ['Expression and pose', 'Neutral expression, both eyes open, facing the camera directly'],
          ['Colour', 'Must be in colour'],
        ],
        note: 'Source: U.S. Department of State (travel.state.gov), October 2026. You are asked to bring two identical printed photos to the interview.',
      },

      sections: [
        {
          h2: 'What You Get',
          bullets: [
            'A 600 x 600 pixel JPEG under 240 kB for the online application',
            'Two 2 x 2 inch prints for the interview',
            'The file by WhatsApp or email, the prints in hand',
          ],
        },
        {
          h2: 'Before You Apply',
          paragraphs: [
            'Cropping a phone snapshot rarely passes: the system checks the square ratio, the head size and the file size together, and turns the photo down if any one of them is off.',
            'If you already have a photo from another application, bring it and we will check it against the rules with you. If it fits, there is no need to shoot again.',
          ],
        },
      ],

      steps: STEPS_PHOTO_EN,

      faq: {
        h2: 'Frequently Asked Questions',
        items: [
          {
            q: 'Is a Green Card photo different from a visa photo?',
            a: 'The size is the same as a US visa photo: 2 x 2 inches. The difference is the online application, which wants a 600 x 600 pixel file under 240 kB.',
          },
          {
            q: 'Do I have to take my glasses off?',
            a: 'Yes. Glasses have not been accepted since 2016. Medical exceptions require a statement from a health practitioner.',
          },
          {
            q: 'Can the photo be taken with a headscarf?',
            a: 'Yes, if it is worn daily for religious reasons. Your full face must be visible, the hairline uncovered and no shadow cast on the face.',
          },
          {
            q: 'Do you photograph children?',
            a: 'Yes. The same rules apply to babies and children; we work at their pace.',
          },
          {
            q: 'Is the digital file charged separately?',
            a: 'No, the digital file is free. We send it by WhatsApp or email after the shoot.',
          },
          FAQ_PRICE_EN,
          FAQ_HOURS_EN,
        ],
      },

      visit: VISIT_EN,

      related: {
        h2: 'Related Pages',
        links: [
          { label: 'Visa Photos', href: '/en/visa-photo' },
          { label: 'Passport & Biometric Photos', href: '/en/passport-photo' },
          { label: 'Residence Permit Photos', href: '/en/residence-permit-photo' },
        ],
      },

      breadcrumbHome: 'Home',
      languageName: 'English',
    },
  },
};
