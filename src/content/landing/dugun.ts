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
      metaTitle: 'Düğün Çek-At Kamera Paketi | 5, 10, 20’li Paketler – Kargoyla Türkiye',
      metaDescription:
        'Düğün, kına ve nişan masalarınıza çek-at kamera koyun, misafirleriniz çeksin. Fujifilm QuickSnap paketleri: 5’li ₺7.500, 10’lu ₺14.000, 20’li ₺27.000. Kargoyla tüm Türkiye; banyoyu düğünden sonra ödersiniz.',
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
      heroImage: { src: '/images/products/disp_kodak.png', alt: 'Flaşlı tek kullanımlık çek-at fotoğraf makinesi' },
      whatsappLabel: "WhatsApp'tan Bilgi Alın",
      whatsappMessage: 'Merhaba, düğün çek-at kamera paketi için bilgi almak istiyorum.',
      callLabel: 'Hemen Arayın',
      directionsLabel: 'Yol Tarifi Al',
      highlights: [
        {
          title: 'Şimdi sadece kamera parası',
          text: 'Pakette kamera ücretini ödersiniz. Banyo ve taramayı düğünden sonra, sadece kullandığınız kameralar için ödersiniz.',
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
        h2: 'Paketler ve Fiyatlar',
        intro: 'Fujifilm QuickSnap flaşlı tek kullanımlık kamera. Tek kamera fiyatı ₺1.600; pakette adet fiyatı düşer.',
        columns: ['Paket', 'Adet fiyatı / Toplam'],
        rows: [
          ['5 kamera — nişan, kına, aile yemeği', '₺1.500 → toplam ₺7.500'],
          ['10 kamera — orta ölçekli düğün', '₺1.400 → toplam ₺14.000'],
          ['20 kamera — büyük düğün, salon', '₺1.350 → toplam ₺27.000'],
          ['Özel adet', 'Masa sayınıza göre birlikte belirleyelim'],
        ],
        note: 'Fiyatlara kamera dahildir. Banyo ve tarama düğünden sonra, siz istediğinizde yapılır — paket müşterilerimize indirimli.',
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
          h2: 'Banyo Ücretini Şimdi Ödemiyorsunuz',
          paragraphs: [
            'Paket fiyatına yalnızca kameralar dahildir. Düğünden sonra kameraları bize gönderdiğinizde banyo ve taramayı o zaman ödersiniz — kaç kamera kullandıysanız onun ücretini.',
            'Paket müşterilerimize banyo indirimlidir: 5’li pakette film başı ₺600, 10’lu pakette ₺550, 20’li pakette ₺500. Kullanmadığınız kamera için ödeme yapmazsınız.',
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
            q: 'Banyo ücreti pakete dahil mi?',
            a: 'Hayır, paket fiyatına yalnızca kameralar dahildir. Banyoyu düğünden sonra, sadece kullandığınız kameralar için ödersiniz: 5’li pakette film başı ₺600, 10’luda ₺550, 20’lide ₺500.',
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
