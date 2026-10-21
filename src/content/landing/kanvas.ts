import type { LandingGroup } from './types';
import { VISIT_EN, VISIT_TR } from './visit';

/**
 * Canvas print page.
 *
 * Built on 19 October 2026 after measuring the market: "kanvas tablo" is
 * 14.800 searches a month and "kanvas tablo baskı" is up 85% year on year,
 * against roughly 400 a month for the whole film-developing cluster. Canvas
 * also earns more than a film order — ₺417 on a 30x40 against ₺250 — so this
 * is not a side line.
 *
 * Every figure here comes from the owner: he gave the costs (₺2.083/m²) and
 * asked for the price ladder to be rebuilt on 19 October, which produced
 * 550 / 800 / 1.200 / 1.450. The material wording is the one already used on
 * the product listing. Payment by bank transfer after a WhatsApp conversation
 * is how he said these orders run.
 *
 * Deliberately absent: how long a canvas takes to make, and any resolution
 * threshold per size. Nobody has given me either number, and a print shop
 * that quotes a turnaround it then misses is worse off than one that says
 * "send it over and we will tell you".
 */
export const kanvasGroup: LandingGroup = {
  tr: {
    path: '/tr/kanvas-tablo',
    content: {
      locale: 'tr',
      dir: 'ltr',
      metaTitle: 'Kanvas Tablo Baskı | 20x30’dan 50x60’a Fiyatlar – Sirkeci',
      metaDescription:
        'Fotoğrafınızı dokulu pamuk kanvasa basıp ahşap şaseye geriyoruz, duvara asmaya hazır gelir. 20x30 550 TL’den başlar, Türkiye geneli kargo. Sirkeci’de 1969’dan beri.',
      keywords: [
        'kanvas tablo',
        'kanvas tablo baskı',
        'fotoğraftan kanvas tablo',
        'kişiye özel kanvas tablo',
        'kanvas baskı istanbul',
        'kanvas tablo fiyatları',
      ],

      badge: 'TÜRKİYE GENELİ KARGO • 1969’DAN BERİ SİRKECİ',
      h1: 'Kanvas Tablo Baskı',
      intro:
        'Telefonunuzda duran fotoğraf duvara asıldığında başka bir şey oluyor. Fotoğrafınızı dokulu pamuk kanvasa basıp ahşap şaseye geriyoruz; kutusundan çıktığı gibi asılır. WhatsApp’tan kareyi ve ebadı yollayın, gerisini biz halledelim.',

      offer: { lowPrice: 550, highPrice: 1450 },
      whatsappLabel: 'WhatsApp’tan Sipariş Verin',
      whatsappMessage: 'Merhaba, kanvas tablo bastırmak istiyorum.',
      callLabel: 'Hemen Arayın',
      directionsLabel: 'Yol Tarifi Al',

      highlights: [
        {
          title: 'Şaseye gerili gelir',
          text: 'Kanvas kumaş ahşap şaseye gerilerek hazırlanır; ayrıca çerçeve yaptırmanız gerekmez.',
        },
        {
          title: 'Dört ebat, açık fiyat',
          text: '20x30’dan 50x60’a dört ölçü. Fiyatlar aşağıda yazıyor, sipariş sırasında sürpriz çıkmaz.',
        },
        {
          title: 'Türkiye’nin her yerine',
          text: 'Fotoğrafı WhatsApp’tan gönderin, tabloyu adresinize kargolayalım.',
        },
        {
          title: 'İstanbul’daysanız gelin',
          text: 'Sirkeci’deki dükkânda ebadı ve kareyi birlikte konuşabiliriz.',
        },
      ],

      table: {
        h2: 'Kanvas Tablo Fiyatları',
        intro: 'Fiyat ebada göre değişir; baskı ve şase işçiliği dahildir.',
        columns: ['Ebat', 'Fiyat'],
        rows: [
          ['20x30 cm', '₺550'],
          ['30x40 cm', '₺800'],
          ['40x60 cm', '₺1.200'],
          ['50x60 cm', '₺1.450'],
        ],
        note: 'Fiyatlara KDV dahildir. Kargo ücreti alıcıya aittir. Ödeme havale/EFT ile alınır, sipariş WhatsApp üzerinden ilerler.',
      },

      sections: [
        {
          h2: 'Fotoğrafınız Uygun mu, Birlikte Bakalım',
          paragraphs: [
            'Her kare her ebada basılmaz; küçük bir fotoğrafı büyüttükçe detay azalır. Emin değilseniz kareyi WhatsApp’tan gönderin, bakıp hangi ebada kadar temiz çıkacağını söyleyelim.',
            'Bunu baskıdan önce konuşmak, baskıdan sonra beğenmemekten iyidir. Soru sormanın ücreti yok.',
          ],
        },
        {
          h2: 'Hediye Olarak Kanvas',
          paragraphs: [
            'Kanvas tablo hediye olarak da gidiyor: yıldönümü, yeni ev, doğum günü. Fotoğrafı siz gönderirsiniz, biz doğrudan hediye edeceğiniz adrese kargolayabiliriz.',
            'Aynı kareden daha küçük hatıralar da çıkarıyoruz: 10’lu magnet seti 600 TL, kişiye özel kupa 500 TL, fotoğraf baskılı puzzle 450 TL’den başlıyor. Düğün, nişan ve mezuniyette misafirlere dağıtmak için magnet setini soranlar çok.',
          ],
        },
      ],

      steps: {
        h2: 'Nasıl Sipariş Veriyorsunuz?',
        items: [
          {
            title: 'Fotoğrafı gönderin',
            text: 'WhatsApp’tan kareyi ve istediğiniz ebadı yazın. Kararsızsanız birkaç fotoğraf gönderin, birlikte seçelim.',
          },
          {
            title: 'Fiyatı onaylayın',
            text: 'Ebada göre fiyatı ve kargo durumunu yazarız. Onaylarsanız havale bilgilerini paylaşırız.',
          },
          {
            title: 'Teslim alın',
            text: 'Tabloyu adresinize kargolarız; İstanbul’daysanız Sirkeci’deki dükkândan da alabilirsiniz.',
          },
        ],
      },

      faq: {
        h2: 'Sık Sorulan Sorular',
        items: [
          {
            q: 'Fiyata kargo dahil mi?',
            a: 'Hayır. Fiyatlar baskı ve şase işçiliğini kapsar, kargo ücreti alıcıya aittir.',
          },
          {
            q: 'Nasıl ödeme yapıyorum?',
            a: 'Havale veya EFT ile. Sipariş WhatsApp üzerinden ilerliyor, hesap bilgilerini orada paylaşıyoruz. Sitede online ödeme yok.',
          },
          {
            q: 'Fotoğrafım yeterli çözünürlükte mi?',
            a: 'Göndermeniz yeterli, bakıp söylüyoruz. Küçük bir dosya büyük ebatta detay kaybeder; bunu baskıdan önce fark etmek daha iyi.',
          },
          {
            q: 'Tabloyu doğrudan hediye edeceğim adrese gönderebilir misiniz?',
            a: 'Evet. Sipariş sırasında teslim adresini yazmanız yeterli.',
          },
          {
            q: 'Kanvas dışında ne yapıyorsunuz?',
            a: '10’lu magnet seti 600 TL, kişiye özel kupa 500 TL, fotoğraf baskılı puzzle 20x30 450 TL ve 30x40 550 TL. Ayrıca 10x15’ten 30x40’a kadar normal fotoğraf baskısı yapıyoruz.',
          },
        ],
      },

      visit: VISIT_TR,

      related: {
        h2: 'Bunlar da İlginizi Çekebilir',
        links: [
          { label: 'Fotoğraf Baskı', href: '/tr/fotograf-baski' },
          { label: 'Kişiye Özel Hediyeler (Magnet, Kupa, Puzzle)', href: '/tr/urunler?kategori=customizable-products' },
          { label: 'Film Banyo', href: '/tr/film-banyo' },
        ],
      },

      breadcrumbHome: 'Ana Sayfa',
      languageName: 'Türkçe',
    },
  },

  en: {
    path: '/en/canvas-print',
    content: {
      locale: 'en',
      dir: 'ltr',
      metaTitle: 'Canvas Print Istanbul | Sizes and Prices – Sirkeci',
      metaDescription:
        'We print your photo on textured cotton canvas and stretch it over a wooden frame, ready to hang. From 550 TL for 20x30, shipped anywhere in Turkey. In Sirkeci since 1969.',
      keywords: [
        'canvas print istanbul',
        'photo on canvas turkey',
        'canvas printing sirkeci',
        'custom canvas print',
      ],

      badge: 'SHIPPED NATIONWIDE • IN SIRKECI SINCE 1969',
      h1: 'Canvas Prints',
      intro:
        'A photo on your phone becomes something else on a wall. We print yours on textured cotton canvas and stretch it over a wooden frame, so it hangs straight out of the box. Send us the frame and the size on WhatsApp and we will take it from there.',

      offer: { lowPrice: 550, highPrice: 1450 },
      whatsappLabel: 'Order on WhatsApp',
      whatsappMessage: 'Hello, I would like to order a canvas print.',
      callLabel: 'Call Now',
      directionsLabel: 'Get Directions',

      highlights: [
        { title: 'Stretched, ready to hang', text: 'The canvas is stretched over a wooden frame, so you do not need to have one made.' },
        { title: 'Four sizes, clear prices', text: 'From 20x30 to 50x60. The prices are listed below with nothing added later.' },
        { title: 'Anywhere in Turkey', text: 'Send the photo on WhatsApp and we will ship the finished canvas to your address.' },
        { title: 'Or come to the shop', text: 'If you are in Istanbul we can look at the frame and the size together in Sirkeci.' },
      ],

      table: {
        h2: 'Canvas Print Prices',
        intro: 'Price depends on size and includes both the print and the stretcher work.',
        columns: ['Size', 'Price'],
        rows: [
          ['20x30 cm', '₺550'],
          ['30x40 cm', '₺800'],
          ['40x60 cm', '₺1,200'],
          ['50x60 cm', '₺1,450'],
        ],
        note: 'VAT included. Shipping is paid by the buyer. Payment is by bank transfer; orders run through WhatsApp.',
      },

      sections: [
        {
          h2: 'Let Us Check Your Photo First',
          paragraphs: [
            'Not every frame suits every size — the bigger the print, the more the detail matters. If you are unsure, send it on WhatsApp and we will tell you how large it will still look clean.',
            'Settling that before printing beats being disappointed after. Asking costs nothing.',
          ],
        },
        {
          h2: 'Canvas as a Gift',
          paragraphs: [
            'Canvases often leave as presents — anniversaries, a new home, a birthday. Send us the photo and we can ship it straight to the person receiving it.',
            'Smaller keepsakes come off the same frame: a set of ten magnets is 600 TL, a personalised mug 500 TL, a photo puzzle from 450 TL.',
          ],
        },
      ],

      steps: {
        h2: 'How Ordering Works',
        items: [
          { title: 'Send the photo', text: 'Message us the frame and the size you want. If you cannot decide, send a few and we will choose together.' },
          { title: 'Approve the price', text: 'We confirm the price for that size and the shipping, then share the bank details.' },
          { title: 'Receive it', text: 'We ship it to your address, or you collect it from the shop in Sirkeci.' },
        ],
      },

      faq: {
        h2: 'Frequently Asked Questions',
        items: [
          { q: 'Does the price include shipping?', a: 'No. The price covers the print and the stretcher work; shipping is paid by the buyer.' },
          { q: 'How do I pay?', a: 'By bank transfer. Orders run through WhatsApp and we share the account details there. There is no online payment on the site.' },
          { q: 'Is my photo high enough resolution?', a: 'Just send it and we will tell you. A small file loses detail at a large size, and it is better to know beforehand.' },
          { q: 'Can you ship it straight to the person receiving it?', a: 'Yes. Give us the delivery address when you order.' },
          { q: 'What else do you make?', a: 'A set of ten magnets is 600 TL, a personalised mug 500 TL, a photo puzzle 450 TL for 20x30 and 550 TL for 30x40. We also print ordinary photos from 10x15 up to 30x40.' },
        ],
      },

      visit: VISIT_EN,

      related: {
        h2: 'You May Also Like',
        links: [
          { label: 'Photo Printing', href: '/en/photo-printing' },
          { label: 'Personalised Gifts (Magnets, Mugs, Puzzles)', href: '/en/products?kategori=customizable-products' },
          { label: 'Film Developing', href: '/en/film-developing' },
        ],
      },

      breadcrumbHome: 'Home',
      languageName: 'English',
    },
  },
};
