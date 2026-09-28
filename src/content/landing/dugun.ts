import type { LandingGroup } from './types';
import { FAQ_HOURS_TR, FAQ_PRICE_TR, VISIT_TR } from './visit';

/**
 * Wedding disposable-camera package. New product: we already stock the cameras
 * and develop the film, so this sells both halves of the loop at once and is not
 * limited by who walks past the shop. Prices are deliberately left to WhatsApp
 * until the owner fixes them.
 */
export const dugunGroup: LandingGroup = {
  tr: {
    path: '/tr/dugun-cek-at-kamera',
    content: {
      locale: 'tr',
      dir: 'ltr',
      metaTitle: 'Düğün Çek-At Kamera Paketi | Kamera + Banyo + Dijital Tarama – Kargoyla',
      metaDescription:
        'Düğün, kına ve nişan masalarınıza çek-at kamera koyun, misafirleriniz çeksin. 5, 10 ve 20 kameralı paketler: kameralar kargoyla size gelir, düğünden sonra bize dönen kameralar 2 saatte taranır.',
      keywords: [
        'düğün çek at kamera',
        'düğün tek kullanımlık fotoğraf makinesi',
        'kına çek at kamera',
        'düğün masası fotoğraf makinesi',
        'çek at kamera paketi',
        'nişan çek at kamera',
        'düğün anı fotoğrafı',
      ],
      badge: '5 • 10 • 20 KAMERALI PAKETLER',
      h1: 'Düğün Çek-At Kamera Paketi',
      intro:
        'Fotoğrafçınızın göremediği kareler misafirlerinizin elindedir. Masalara birer çek-at kamera bırakın; herkes kendi açısından çeksin. Düğünden sonra kameraları tek kutuda bize gönderin, iki saat içinde bütün kareler tek bir galeride toplansın.',
      whatsappLabel: "WhatsApp'tan Bilgi Alın",
      whatsappMessage: 'Merhaba, düğün çek-at kamera paketi için bilgi almak istiyorum.',
      callLabel: 'Hemen Arayın',
      directionsLabel: 'Yol Tarifi Al',
      highlights: [
        {
          title: 'Kamera + banyo + tarama bir arada',
          text: 'Kameraları biz gönderiyoruz, dönüşte banyo ve taramayı da biz yapıyoruz. Tek muhatap, tek paket.',
        },
        {
          title: 'Misafirin gözünden düğün',
          text: 'Profesyonel fotoğrafçının yakalayamadığı samimi, doğal ve komik anlar.',
        },
        {
          title: 'Kargoyla tüm Türkiye',
          text: 'Düğününüz hangi şehirde olursa olsun kameralar adresinize ulaşır.',
        },
        {
          title: 'Kareler 2 saatte hazır',
          text: 'Kameralar bize ulaştıktan sonra iki saat içinde taranır, galeri bağlantınız gönderilir.',
        },
      ],
      table: {
        h2: 'Paketler',
        intro: 'Masa sayınıza göre seçin; emin değilseniz WhatsApp’tan yazın, birlikte belirleyelim.',
        columns: ['Paket', 'Kime uygun'],
        rows: [
          ['5 kamera', 'Küçük nişan, kına veya aile yemeği'],
          ['10 kamera', 'Orta ölçekli düğün (yaklaşık 15-20 masa)'],
          ['20 kamera', 'Büyük düğün ve salon organizasyonları'],
          ['Özel adet', 'Masa sayınıza göre birlikte belirleyelim'],
        ],
        note: 'Her pakete banyo ve dijital tarama dahildir. Güncel fiyat için WhatsApp’tan yazın.',
      },
      sections: [
        {
          h2: 'Nasıl Kullanılır?',
          paragraphs: [
            'Kameraları masalara dağıtın. Yanına küçük bir not bırakmanız yeterli: “Bu kamerayla bir kare çekin, gerisini biz hallederiz.”',
            'Gece bitince kameraları toplayın ve tek kutuda bize kargolayın. Poz bitmese de sorun değil; kalan kareler boş çıkar, çekilenler kurtarılır.',
          ],
        },
        {
          h2: 'Neden Çek-At Kamera?',
          bullets: [
            'Misafir telefonundan çekip unutmaz; kamera masada durur, herkes çeker.',
            'Flaşlı analog kareler o geceye özgü bir doku verir; telefon fotoğrafına benzemez.',
            'Çocuklar ve yaşlı misafirler için kullanımı çok kolay: bas, çek.',
            'Düğünden sonra elinizde hem dijital dosyalar hem bastırılabilir kareler olur.',
          ],
        },
        {
          h2: 'Baskı ve Albüm',
          paragraphs: [
            'Taramalardan beğendiklerinizi biz basabiliriz. 10x15’ten poster ve kanvasa kadar her boyutta baskı yapıyoruz; düğün albümü için ideal.',
          ],
        },
      ],
      steps: {
        h2: 'Süreç',
        items: [
          { title: 'WhatsApp’tan yazın', text: 'Düğün tarihinizi ve masa sayınızı söyleyin, paketi birlikte seçelim.' },
          { title: 'Kameralar size ulaşsın', text: 'Paketiniz düğünden önce kargoyla adresinize gönderilir.' },
          { title: 'Misafirleriniz çeksin', text: 'Kameraları masalara dağıtın, gece boyunca kullanılsın.' },
          { title: 'Kutuyu bize gönderin', text: 'Kameraları toplayıp tek kutuda kargoya verin.' },
          { title: 'Galeriniz hazır', text: 'Kameralar elimize ulaştıktan 2 saat sonra bütün kareler galerinizde.' },
        ],
      },
      faq: {
        h2: 'Sık Sorulan Sorular',
        items: [
          {
            q: 'Kaç kamera almalıyım?',
            a: 'Genel kural: her 2 masaya bir kamera. 15-20 masalık bir düğün için 10 kamera çoğu zaman yeterli oluyor. Emin değilseniz masa sayınızı yazın, birlikte hesaplayalım.',
          },
          {
            q: 'Bir kamerada kaç kare var?',
            a: 'Tek kullanımlık makineler genellikle 27 veya 39 pozludur. Flaşları vardır, kapalı salonda rahatça çekilir.',
          },
          {
            q: 'Düğünden ne kadar önce sipariş vermeliyim?',
            a: 'Kargo süresini de hesaba katarak en az bir hafta önce yazmanızı öneririz. Acil durumlarda WhatsApp’tan konuşalım, elimizden geleni yaparız.',
          },
          {
            q: 'Poz bitmezse ne olur?',
            a: 'Sorun değil. Çekilmemiş kareler boş çıkar, çekilenler normal şekilde banyo edilip taranır.',
          },
          {
            q: 'Fotoğrafları ne zaman görürüz?',
            a: 'Kameralar bize ulaştıktan iki saat sonra taramalar hazır olur ve size özel galeri bağlantısı gönderilir.',
          },
          {
            q: 'İstanbul dışındayım, olur mu?',
            a: 'Olur. Kameraları kargoyla gönderiyoruz, düğünden sonra siz geri gönderiyorsunuz. Türkiye’nin her yerine hizmet veriyoruz.',
          },
          FAQ_PRICE_TR,
          FAQ_HOURS_TR,
        ],
      },
      visit: VISIT_TR,
      related: {
        h2: 'İlgili Sayfalar',
        links: [
          { label: 'Çek-At Kamera Banyosu', href: '/tr/cek-at-kamera-banyo' },
          { label: 'Film Banyo', href: '/tr/film-banyo' },
          { label: 'Fotoğraf Baskı', href: '/tr/fotograf-baski' },
        ],
      },
      breadcrumbHome: 'Ana Sayfa',
      languageName: 'Türkçe',
    },
  },
};
