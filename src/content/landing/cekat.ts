import type { LandingGroup } from './types';
import { FAQ_HOURS_EN, FAQ_HOURS_TR, FAQ_PRICE_EN, FAQ_PRICE_TR, VISIT_EN, VISIT_TR } from './visit';

/**
 * Disposable ("çek-at") camera developing. Most of the films posted to us from
 * Anatolia are disposables, so this gets its own page instead of a paragraph on
 * the film-developing page. The promise that no competitor makes is the two-hour
 * turnaround once the camera reaches us.
 */
export const cekAtGroup: LandingGroup = {
  tr: {
    path: '/tr/cek-at-kamera-banyo',
    content: {
      locale: 'tr',
      dir: 'ltr',
      metaTitle: 'Çek At Kamera Banyo | Tek Kullanımlık Fotoğraf Makinesi Banyosu – Kargoyla',
      metaDescription:
        'Çek-at kameranızı kargoyla gönderin, elimize ulaştıktan 2 saat sonra tüm kareleriniz dijital olarak telefonunuzda. Kodak FunSaver, Fujifilm QuickSnap ve tüm tek kullanımlık makineler. 1969’dan beri Sirkeci.',
      keywords: [
        'çek at kamera banyo',
        'tek kullanımlık fotoğraf makinesi banyo',
        'çek at kamera nerede yıkanır',
        'kodak funsaver banyo',
        'fujifilm quicksnap banyo',
        'disposable kamera banyo',
        'çek at kamera banyo kargo',
        'çek at kamera film banyo istanbul',
      ],
      badge: 'KARGOYLA TÜM TÜRKİYE • 2 SAATTE DİJİTAL',
      h1: 'Çek-At Kamera Banyosu',
      intro:
        'Düğünde, kınada, mezuniyette ya da tatilde çektiğiniz çek-at kamerayı yıkatacak yer mi arıyorsunuz? Kameranızı kargoyla bize gönderin: elimize ulaştıktan sadece 2 saat sonra bütün kareleriniz taranmış halde telefonunuza gelir. Şehrinizde laboratuvar olmasına gerek yok.',
      whatsappLabel: "WhatsApp'tan Yazın",
      whatsappMessage: 'Merhaba, çek-at kamera banyosu için yazıyorum.',
      callLabel: 'Hemen Arayın',
      directionsLabel: 'Yol Tarifi Al',
      highlights: [
        {
          title: 'Elimize ulaştıktan 2 saat sonra hazır',
          text: 'Kameranız bize ulaştığı gün banyo edilip taranır; günlerce beklemezsiniz.',
        },
        {
          title: 'Kargoyla tüm Türkiye',
          text: 'Şehrinizde film laboratuvarı yoksa sorun değil. Kargoya verin, gerisini biz halledelim.',
        },
        {
          title: 'Dijital kareler telefonunuzda',
          text: 'Taramalarınızı size özel bir galeri bağlantısıyla gönderiyoruz; indirir, paylaşırsınız.',
        },
        {
          title: "1969'dan beri Sirkeci'de",
          text: 'Yarım asrı aşkın tecrübeyle çalışan bir aile laboratuvarına emanet edersiniz.',
        },
      ],
      table: {
        h2: 'Fiyatlar',
        intro: 'Banyo ve tarama fiyatına dahildir. Tarama çözünürlüğünü siz seçersiniz.',
        columns: ['Tarama çözünürlüğü', 'Fiyat (kamera başı)'],
        rows: [
          ['1080p — standart', '₺600'],
          ['2K — yüksek', '₺700'],
          ['4K — en yüksek', '₺750'],
        ],
        note: 'Siyah-beyaz tek kullanımlık makinelerde +₺50. Kargo ücreti size aittir. Kodak FunSaver, Fujifilm QuickSnap ve diğer tüm tek kullanımlık makineleri banyo ediyoruz; emin değilseniz makinenin fotoğrafını WhatsApp’tan atın.',
      },
      sections: [
        {
          h2: 'Kameranızı Nasıl Gönderirsiniz?',
          paragraphs: [
            'Önce WhatsApp’tan bize yazın; adresi ve gönderim detaylarını paylaşalım. Kameranızı kutulayıp kargoya verin — kargo ücreti size aittir.',
            'Kamera elimize ulaştığı anda işleme alınır. İki saat içinde bütün kareler taranmış olur ve size özel galeri bağlantınız hazırlanır.',
          ],
        },
        {
          h2: 'Çek-At Kamerada Dikkat Edilecekler',
          bullets: [
            'Poz bitmeden makineyi açmayın; film ışık alır ve kareler kaybolur.',
            'Kameranın arkasındaki sayaç 0’a geldiyse film sarılmıştır, gönderebilirsiniz.',
            'Yıllardır çekmediğiniz eski bir çek-at kamera da çoğu zaman kurtarılabilir.',
            'Nemli veya ıslak kaldıysa yine de gönderin; sonuç alma ihtimalimiz var.',
          ],
        },
        {
          h2: 'Düğün ve Organizasyonlar İçin',
          paragraphs: [
            'Masalara çek-at kamera koyup misafirlerinize çektirdiniz mi? Bütün kameraları tek kutuda bize gönderin, hepsini birlikte banyo edip tek galeride toplayalım.',
            'Düğününüz için kamera + banyo paketimiz de var; 5, 10 ve 20 kameralı seçeneklerimizi inceleyebilirsiniz.',
          ],
        },
      ],
      steps: {
        h2: 'Nasıl Çalışıyor?',
        items: [
          { title: 'WhatsApp’tan yazın', text: 'Kaç kamera göndereceğinizi söyleyin, adresi paylaşalım.' },
          { title: 'Kargoya verin', text: 'Kameranızı kutulayıp gönderin; kargo ücreti size ait.' },
          { title: '2 saatte tarama', text: 'Kamera elimize ulaştıktan sonra iki saat içinde kareleriniz hazır.' },
          { title: 'Galeriden indirin', text: 'Size özel bağlantıyla bütün karelerinizi indirin ve paylaşın.' },
        ],
      },
      faq: {
        h2: 'Sık Sorulan Sorular',
        items: [
          {
            q: 'Ne kadar sürede sonuç alırım?',
            a: 'Kameranız elimize ulaştıktan 2 saat sonra taramalar hazır olur. Toplam süre büyük ölçüde kargonun hızına bağlıdır; çoğu şehirden 1-2 günde ulaşır.',
          },
          {
            q: 'Şehrimde film laboratuvarı yok, yine de olur mu?',
            a: 'Evet, zaten müşterilerimizin büyük kısmı laboratuvar olmayan şehirlerden kargoyla gönderiyor. Hizmet tamamen kargo üzerinden yürüyor.',
          },
          {
            q: 'Negatifleri geri gönderiyor musunuz?',
            a: 'İstenirse gönderebiliriz; bunu sipariş sırasında WhatsApp’tan belirtmeniz yeterli. Dönüş kargosu size ait olur.',
          },
          {
            q: 'Kareler nasıl teslim ediliyor?',
            a: 'Taramalarınızı size özel bir galeri bağlantısıyla dijital olarak gönderiyoruz. İsterseniz baskılarını da yapıp kargoyla yollayabiliriz.',
          },
          {
            q: 'Kaç kare çıkar?',
            a: 'Tek kullanımlık makineler genellikle 27 veya 39 pozludur. Işık alan veya çekilmemiş kareler çıkmayabilir.',
          },
          FAQ_PRICE_TR,
          FAQ_HOURS_TR,
        ],
      },
      visit: VISIT_TR,
      related: {
        h2: 'İlgili Sayfalar',
        links: [
          { label: 'Film Banyo', href: '/tr/film-banyo' },
          { label: 'Düğün Çek-At Kamera Paketi', href: '/tr/dugun-cek-at-kamera' },
          { label: 'Fotoğraf Baskı', href: '/tr/fotograf-baski' },
        ],
      },
      breadcrumbHome: 'Ana Sayfa',
      languageName: 'Türkçe',
    },
  },

  en: {
    path: '/en/disposable-camera-developing',
    content: {
      locale: 'en',
      dir: 'ltr',
      metaTitle: 'Disposable Camera Developing Istanbul | Ready 2 Hours After Arrival',
      metaDescription:
        'Send us your disposable camera and get every frame scanned to your phone two hours after it reaches us. Kodak FunSaver, Fujifilm QuickSnap and all single-use cameras. In Sirkeci since 1969.',
      keywords: [
        'disposable camera developing istanbul',
        'single use camera developing',
        'kodak funsaver developing',
        'fujifilm quicksnap developing',
        'film lab istanbul',
        'develop disposable camera turkey',
      ],
      badge: 'POST IT FROM ANYWHERE • SCANS IN 2 HOURS',
      h1: 'Disposable Camera Developing',
      intro:
        'Shot a disposable camera at a wedding, a festival or on your trip? Post it to us and two hours after it reaches our shop every frame is scanned and on your phone. No lab in your city? It does not matter.',
      whatsappLabel: 'Message Us on WhatsApp',
      whatsappMessage: 'Hello, I would like to develop a disposable camera.',
      callLabel: 'Call Now',
      directionsLabel: 'Get Directions',
      highlights: [
        { title: 'Scans 2 hours after arrival', text: 'We develop and scan the same day your camera reaches us.' },
        { title: 'Post it from anywhere', text: 'Most of our customers send their cameras by courier from cities with no lab.' },
        { title: 'Digital frames on your phone', text: 'We send your scans through a private online gallery you can download.' },
        { title: 'In Sirkeci since 1969', text: 'A family shop with more than half a century of darkroom experience.' },
      ],
      table: {
        h2: 'Prices',
        intro: 'Developing and scanning are both included. You choose the scan resolution.',
        columns: ['Scan resolution', 'Price per camera'],
        rows: [
          ['1080p — standard', '₺600'],
          ['2K — high', '₺700'],
          ['4K — maximum', '₺750'],
        ],
        note: 'Black & white single-use cameras +₺50. Shipping is paid by you. We develop Kodak FunSaver, Fujifilm QuickSnap and every other single-use camera — send us a photo on WhatsApp if you are unsure.',
      },
      sections: [
        {
          h2: 'How to Send Your Camera',
          paragraphs: [
            'Message us on WhatsApp first and we will share the address and the details. Box the camera and send it by courier — shipping is paid by you.',
            'We start work the moment it arrives. Within two hours every frame is scanned and your private gallery link is ready.',
          ],
        },
        {
          h2: 'Before You Send It',
          bullets: [
            'Do not open the camera before the roll is finished — light will destroy the frames.',
            'If the counter on the back reads 0, the film is wound and ready to post.',
            'Old disposable cameras from years ago can usually still be saved.',
            'Even if it got damp, send it anyway — there is often something to recover.',
          ],
        },
      ],
      steps: {
        h2: 'How It Works',
        items: [
          { title: 'Message us', text: 'Tell us how many cameras you have; we share the address.' },
          { title: 'Post it', text: 'Box the camera and send it by courier.' },
          { title: 'Scanned in 2 hours', text: 'We develop and scan within two hours of arrival.' },
          { title: 'Download your gallery', text: 'Get a private link with all your frames.' },
        ],
      },
      faq: {
        h2: 'Frequently Asked Questions',
        items: [
          {
            q: 'How long does it take?',
            a: 'Scans are ready two hours after your camera reaches us. The total time depends mostly on the courier — usually one or two days.',
          },
          {
            q: 'Do you return the negatives?',
            a: 'We can if you ask when you place the order. Return shipping is paid by you.',
          },
          {
            q: 'How do I get the photos?',
            a: 'Through a private online gallery you can download from. We can also print them and post them to you.',
          },
          FAQ_PRICE_EN,
          FAQ_HOURS_EN,
        ],
      },
      visit: VISIT_EN,
      related: {
        h2: 'Related Pages',
        links: [
          { label: 'Film Developing', href: '/en/film-developing' },
          { label: 'Photo Printing', href: '/en/photo-printing' },
        ],
      },
      breadcrumbHome: 'Home',
      languageName: 'English',
    },
  },
};
