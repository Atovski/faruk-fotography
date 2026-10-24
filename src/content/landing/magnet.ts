import type { LandingGroup } from './types';
import { VISIT_TR } from './visit';

/**
 * Photo magnet page.
 *
 * Built on 24 October 2026. The magnet is the best-earning thing in the
 * catalogue — ₺600 a set against ₺50 of material — and it is the only gift
 * line whose market is growing: "magnet baskı" is up 50% year on year and
 * "kişiye özel magnet" up 52%, against a flat ~400 a month for the whole
 * film cluster. A click on these terms costs ₺3-4 where a vesikalık click
 * costs ₺10,60. Until today the magnet existed only as one row on the
 * product listing, so there was nowhere to send that traffic.
 *
 * Turkish only, like the wedding page. Every magnet term with measurable
 * volume is Turkish; an English version would be a page nobody searches for.
 *
 * Deliberately absent: a turnaround time, a bulk discount, and any promise
 * about mixing different photos in one set. The owner has given none of the
 * three, and the set is assembled in conversation anyway — so the page says
 * that instead of inventing a rule.
 *
 * No heroImage yet. The product shot currently in Supabase is a supplier's
 * listing photo with identifiable people in it; the owner is reshooting it.
 * Better no picture than someone else's.
 */
export const magnetGroup: LandingGroup = {
  tr: {
    path: '/tr/fotograf-magnet',
    content: {
      locale: 'tr',
      dir: 'ltr',
      metaTitle: 'Fotoğraf Baskılı Magnet | 10’lu Set 600 TL – Sirkeci',
      metaDescription:
        'Kendi fotoğraflarınızdan 6x9 cm buzdolabı magneti. 10’lu set 600 TL, Türkiye geneli kargo. Düğün, nişan ve mezuniyette misafire dağıtmak için. Sirkeci’de 1969’dan beri.',
      keywords: [
        'fotoğraf magnet',
        'magnet baskı',
        'kişiye özel magnet',
        'fotoğraf baskılı magnet',
        'buzdolabı magneti fotoğraf',
        'düğün magneti',
        'nikah şekeri magnet',
      ],

      badge: 'TÜRKİYE GENELİ KARGO • 1969’DAN BERİ SİRKECİ',
      h1: 'Fotoğraf Baskılı Magnet',
      intro:
        'Telefonda duran kareler kimsenin karşısına çıkmıyor. Buzdolabının kapağı ise evde en çok bakılan yer. Fotoğraflarınızı 6x9 cm magnete basıyoruz, 10’lu set halinde geliyor. Kareleri WhatsApp’tan gönderin, seti birlikte kuralım.',

      offer: { lowPrice: 600, highPrice: 600 },
      whatsappLabel: 'WhatsApp’tan Sipariş Verin',
      whatsappMessage: 'Merhaba, fotoğraf baskılı magnet yaptırmak istiyorum.',
      callLabel: 'Hemen Arayın',
      directionsLabel: 'Yol Tarifi Al',

      highlights: [
        {
          title: '10’lu set, tek fiyat',
          text: '6x9 cm on magnet 600 TL. Hangi karelerin basılacağını siparişte birlikte belirliyoruz.',
        },
        {
          title: 'Dağıtmak için isteniyor',
          text: 'En çok düğün, nişan, mezuniyet ve doğum gününde misafire verilecek hatıra olarak soruluyor.',
        },
        {
          title: 'Türkiye’nin her yerine',
          text: 'Fotoğrafları WhatsApp’tan gönderin, seti adresinize kargolayalım.',
        },
        {
          title: 'İstanbul’daysanız gelin',
          text: 'Sirkeci’deki dükkânda kareleri ekranda birlikte seçebiliriz.',
        },
      ],

      table: {
        h2: 'Hediye Ürün Fiyatları',
        intro:
          'Magnet tek başına da gidiyor, aynı kareden başka hatıralar da çıkarıyoruz. Hepsinin fiyatı burada.',
        columns: ['Ürün', 'Fiyat'],
        rows: [
          ['Magnet 6x9 cm — 10’lu set', '₺600'],
          ['Kişiye özel kupa', '₺500'],
          ['Fotoğraf baskılı puzzle 20x30', '₺450'],
          ['Fotoğraf baskılı puzzle 30x40', '₺550'],
          ['Kanvas tablo 20x30', '₺550'],
        ],
        note: 'Fiyatlara KDV dahildir. Kargo ücreti alıcıya aittir. Ödeme havale/EFT ile alınır, sipariş WhatsApp üzerinden ilerler.',
      },

      sections: [
        {
          h2: 'Magnet Nerede İşe Yarıyor?',
          paragraphs: [
            'Magnet, hatırası dağıtılan işlerde çalışıyor. Düğün ve nişanda masalara bırakılıyor, mezuniyette sınıf arkadaşlarına veriliyor, yeni doğan bebeğin ilk karesi aileye gönderiliyor.',
            'Bir de kendiniz için olanı var: tatilden dönen kareler, evcil hayvan fotoğrafları, çocuğun büyüdükçe değişen hâli. Çerçeve almaya gerek yok, buzdolabına yapışıyor ve her gün görülüyor.',
          ],
        },
        {
          h2: 'Fotoğrafınız Uygun mu?',
          paragraphs: [
            'Magnet 6x9 cm olduğu için çözünürlük burada nadiren sorun olur; telefonla çekilmiş kareler rahatlıkla basılır. Kanvas tabloda durum farklıdır, orada büyüttükçe detay azalır.',
            'Yine de emin değilseniz kareleri WhatsApp’tan gönderin, bakıp söyleyelim. Soru sormanın ücreti yok.',
          ],
        },
      ],

      steps: {
        h2: 'Nasıl Sipariş Veriyorsunuz?',
        items: [
          {
            title: 'Fotoğrafları gönderin',
            text: 'WhatsApp’tan kareleri yollayın. Kaç magnet istediğinizi ve kime gideceğini yazmanız yeterli.',
          },
          {
            title: 'Seti birlikte kuralım',
            text: 'Hangi karenin basılacağını ve nasıl kırpılacağını konuşuruz, sonra fiyatı ve kargo durumunu yazarız.',
          },
          {
            title: 'Teslim alın',
            text: 'Seti adresinize kargolarız; İstanbul’daysanız Sirkeci’deki dükkândan da alabilirsiniz.',
          },
        ],
      },

      faq: {
        h2: 'Sık Sorulan Sorular',
        items: [
          {
            q: 'Sette kaç magnet var?',
            a: '10 adet. 600 TL set fiyatıdır, tek tek satmıyoruz.',
          },
          {
            q: 'Magnetlerin hepsi aynı fotoğraftan mı oluyor?',
            a: 'Bunu siparişte birlikte belirliyoruz. Fotoğrafları gönderin, seti nasıl kuracağımızı yazalım.',
          },
          {
            q: 'Birden fazla set alabilir miyim?',
            a: 'Evet. Kaç set istediğinizi WhatsApp’tan yazın; toplu işlerde fiyatı birlikte konuşuyoruz.',
          },
          {
            q: 'Fiyata kargo dahil mi?',
            a: 'Hayır. 600 TL setin fiyatıdır, kargo ücreti alıcıya aittir.',
          },
          {
            q: 'Nasıl ödeme yapıyorum?',
            a: 'Havale veya EFT ile. Sipariş WhatsApp üzerinden ilerliyor, hesap bilgilerini orada paylaşıyoruz. Sitede online ödeme yok.',
          },
          {
            q: 'Düğünde misafire dağıtmak için yaptırabilir miyim?',
            a: 'En çok bu iş için isteniyor. Kaç kişilik olacağını yazın, kaç set gerektiğini birlikte hesaplayalım.',
          },
          {
            q: 'Magnet dışında ne yapıyorsunuz?',
            a: 'Kişiye özel kupa 500 TL, fotoğraf baskılı puzzle 20x30 450 TL ve 30x40 550 TL, kanvas tablo 20x30 550 TL’den başlıyor. Ayrıca 10x15’ten 30x40’a kadar normal fotoğraf baskısı yapıyoruz.',
          },
        ],
      },

      visit: VISIT_TR,

      related: {
        h2: 'Bunlar da İlginizi Çekebilir',
        links: [
          { label: 'Kanvas Tablo Baskı', href: '/tr/kanvas-tablo' },
          { label: 'Fotoğraf Baskı', href: '/tr/fotograf-baski' },
          { label: 'Kişiye Özel Hediyeler (Kupa, Puzzle)', href: '/tr/urunler?kategori=customizable-products' },
        ],
      },

      breadcrumbHome: 'Ana Sayfa',
      languageName: 'Türkçe',
    },
  },
};
