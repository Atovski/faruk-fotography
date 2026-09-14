import type { LandingGroup } from './types';

/**
 * Residence permit (ikamet) photo page. Requirements follow Göç İdaresi's
 * notice that ikamet documents need ICAO-standard biometric photos:
 * https://www.goc.gov.tr/ikamet-basvurusunda-fotograf-kullanimi-hakkinda
 * Photo count is deliberately not stated — it differs per application type.
 */
export const ikametGroup: LandingGroup = {
  tr: {
    path: '/tr/ikamet-fotografi',
    content: {
      locale: 'tr',
      dir: 'ltr',
      metaTitle: 'İkamet İzni Fotoğrafı | Göç İdaresi Biyometrik Fotoğraf – Sirkeci',
      metaDescription:
        'Göç İdaresi ikamet izni başvurusu için ICAO uyumlu 50x60 mm biyometrik fotoğraf. 5 dakikada hazır, e-İkamet için dijital dosya ücretsiz. Sirkeci, Fatih.',
      keywords: [
        'ikamet fotoğrafı',
        'ikamet izni fotoğrafı',
        'göç idaresi fotoğraf',
        'e-ikamet fotoğraf',
        'oturma izni fotoğrafı',
        'çalışma izni fotoğrafı',
        'biyometrik fotoğraf fatih',
        'ikamet fotoğrafı sirkeci',
      ],
      badge: 'GÖÇ İDARESİ • E-İKAMET',
      h1: 'İkamet İzni İçin Biyometrik Fotoğraf',
      intro:
        "İkamet izni ilk başvuru, uzatma ve geçiş işlemleriniz için Göç İdaresi'nin istediği ICAO standardında biyometrik fotoğrafınızı Sirkeci'deki stüdyomuzda 5 dakikada hazırlıyoruz. e-İkamet sistemine yüklemeniz için fotoğrafın dijital dosyasını da ücretsiz veriyoruz.",
      whatsappLabel: "WhatsApp'tan Yazın",
      whatsappMessage: 'Merhaba, ikamet izni fotoğrafı için yazıyorum.',
      callLabel: 'Hemen Arayın',
      directionsLabel: 'Yol Tarifi Al',
      highlights: [
        { title: 'ICAO uyumlu biyometrik', text: 'Beyaz fon, doğru yüz oranı ve profesyonel ışıkla çekilir; başvurunuz fotoğraf yüzünden aksamaz.' },
        { title: '5 dakikada hazır', text: 'Çekim ve baskı birkaç dakikada tamamlanır, fotoğrafınızı hemen teslim alırsınız.' },
        { title: 'Dijital dosya ücretsiz', text: "e-İkamet'e yüklemeniz gereken fotoğrafı WhatsApp veya e-posta ile hemen gönderiyoruz." },
        { title: "1969'dan beri Sirkeci'de", text: "Yarım asrı aşkın tecrübesiyle Fatih'in köklü fotoğraf stüdyosu." },
      ],
      sections: [
        {
          h2: 'Göç İdaresi İkamet Fotoğrafı Şartları',
          paragraphs: [
            'Göç İdaresi, ikamet izni belgelerinde biyometrik (ICAO standartlarında) fotoğraf kullanımını zorunlu tutar. Fotoğrafınız şu kurallara uygun olmalıdır:',
          ],
          bullets: [
            'Ölçü: 50 x 60 mm biyometrik fotoğraf',
            'Fon: düz beyaz',
            'Son 6 ay içinde çekilmiş olmalı',
            'Yüz karşıdan, net ve tamamen görünür; gözler açık, ağız kapalı',
            'e-İkamet başvurusu için fotoğrafın dijital hali',
          ],
        },
        {
          h2: 'En Sık Yapılan Hata: Yanlış Ölçü',
          paragraphs: [
            'Vize başvurularında kullanılan 35 x 45 mm fotoğraflar ikamet izni için uygun değildir. Elinizdeki eski vesikalıkları kullanmak yerine başvuruya uygun ölçüde yeni fotoğraf çektirmek, işleminizin gecikmemesi için en güvenli yoldur.',
            'Kurallar değişebilir; başvurudan önce goc.gov.tr üzerindeki güncel duyuruları kontrol etmenizi öneririz.',
          ],
        },
        {
          h2: 'Hangi Başvurular İçin Çekiyoruz?',
          bullets: [
            'İkamet izni ilk başvurusu ve uzatma',
            'Kısa dönem, aile, öğrenci ve uzun dönem ikamet izinleri',
            'Çalışma izni başvuruları',
            'Pasaport, kimlik ve tüm ülke vizeleri',
          ],
        },
      ],
      steps: {
        h2: 'Nasıl Çalışıyoruz?',
        items: [
          { title: 'Dükkanımıza gelin', text: "Sirkeci'deki stüdyomuza çalışma saatlerinde uğrayın." },
          { title: 'Biyometrik çekim', text: 'Fotoğrafınızı ICAO kurallarına uygun çekip baskıdan önce kontrol ediyoruz.' },
          { title: 'Baskı + dijital dosya', text: 'Baskılarınızı teslim ediyor, dijital dosyayı telefonunuza gönderiyoruz.' },
        ],
      },
      faq: {
        h2: 'Sık Sorulan Sorular',
        items: [
          {
            q: 'İkamet izni için kaç adet fotoğraf gerekiyor?',
            a: "İstenen adet başvuru türüne göre değişebilir; e-İkamet başvurusunun sonunda verilen belge listesini kontrol edin. Vesikalık fotoğraflarımız 4'lü set halinde basılır, daha fazlası gerekirse ek baskı yaparız.",
          },
          {
            q: 'Dijital fotoğrafı e-İkamet sistemine yükleyebilir miyim?',
            a: 'Evet. Çekimden sonra fotoğrafın dijital dosyasını ücretsiz olarak WhatsApp veya e-posta ile gönderiyoruz.',
          },
          { q: 'Fotoğraf ne kadar sürede hazır olur?', a: 'Çekim ve baskı genellikle 5 dakika içinde tamamlanır.' },
          {
            q: 'Vize için çektirdiğim fotoğrafı kullanabilir miyim?',
            a: "Genellikle hayır. Vize fotoğrafları çoğunlukla 35 x 45 mm'dir; ikamet izni için 50 x 60 mm biyometrik fotoğraf gerekir.",
          },
          { q: 'Fiyat ne kadar?', a: "Güncel fiyat için WhatsApp'tan yazabilir veya dükkanımıza uğrayabilirsiniz." },
          { q: 'Çalışma saatleriniz nedir?', a: 'Pazartesi – Cumartesi 09:00 – 19:00 arası açığız, Pazar kapalıyız.' },
        ],
      },
      visit: {
        h2: 'Bizi Ziyaret Edin',
        address: 'Hobyar Mah. Ankara Cad. No:55/A, Sirkeci – Fatih/İstanbul',
        hours: 'Pazartesi – Cumartesi: 09:00 – 19:00',
        closed: 'Pazar: Kapalı',
        transport: 'Sirkeci Marmaray ve tramvay durağına yürüme mesafesinde.',
      },
      related: {
        h2: 'Diğer Fotoğraf Hizmetlerimiz',
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
    path: '/en/residence-permit-photo',
    content: {
      locale: 'en',
      dir: 'ltr',
      metaTitle: 'Residence Permit Photo Istanbul | Biometric Photo for Göç İdaresi – Sirkeci',
      metaDescription:
        'ICAO-compliant 50x60 mm biometric photos for Turkish residence permit (ikamet) applications. Ready in 5 minutes, free digital file for e-İkamet. Sirkeci, Fatih, Istanbul.',
      keywords: [
        'residence permit photo istanbul',
        'ikamet photo',
        'turkish residence permit photo',
        'e-ikamet photo',
        'goc idaresi photo',
        'biometric photo istanbul',
        'work permit photo turkey',
        'passport photo sirkeci',
      ],
      badge: 'TURKISH RESIDENCE PERMIT • E-İKAMET',
      h1: 'Biometric Photos for Turkish Residence Permits',
      intro:
        'Applying for or renewing your Turkish residence permit (ikamet)? We take ICAO-standard biometric photos that meet the requirements of the Presidency of Migration Management (Göç İdaresi) in 5 minutes at our studio in Sirkeci. The digital file for your e-İkamet application is included free.',
      whatsappLabel: 'Message us on WhatsApp',
      whatsappMessage: 'Hello, I need a residence permit (ikamet) photo. / Merhaba, ikamet fotoğrafı için yazıyorum.',
      callLabel: 'Call Now',
      directionsLabel: 'Get Directions',
      highlights: [
        { title: 'ICAO-compliant biometric', text: "White background, correct face size and professional lighting, so your application isn't held up by the photo." },
        { title: 'Ready in 5 minutes', text: 'Shooting and printing take just a few minutes – you leave with your photos.' },
        { title: 'Free digital file', text: 'We send the photo for your e-İkamet upload straight to your WhatsApp or email.' },
        { title: 'In Sirkeci since 1969', text: "One of Fatih's longest-established photo studios, right on the historic peninsula." },
      ],
      sections: [
        {
          h2: 'Residence Permit Photo Requirements',
          paragraphs: ['Göç İdaresi requires biometric (ICAO-standard) photos for residence permit documents. Your photo should meet these rules:'],
          bullets: [
            'Size: 50 x 60 mm biometric photo',
            'Background: plain white',
            'Taken within the last 6 months',
            'Face straight to the camera, clearly and fully visible; eyes open, mouth closed',
            'A digital copy for the e-İkamet online application',
          ],
        },
        {
          h2: 'The Most Common Mistake: Wrong Size',
          paragraphs: [
            'The 35 x 45 mm photos used for many visas are not suitable for a Turkish residence permit. Reusing an old photo in the wrong size is one of the easiest ways to delay your application.',
            'Rules can change – please check the latest announcements on goc.gov.tr before applying.',
          ],
        },
        {
          h2: 'Which Applications We Photograph For',
          bullets: [
            'First residence permit applications and renewals',
            'Short-term, family, student and long-term residence permits',
            'Work permit applications',
            'Passport, ID and visa photos for all countries',
          ],
        },
      ],
      steps: {
        h2: 'How It Works',
        items: [
          { title: 'Visit our shop', text: 'Drop by our Sirkeci studio during opening hours.' },
          { title: 'Biometric photo', text: 'We take your photo to ICAO rules and check it before printing.' },
          { title: 'Prints + digital file', text: 'Take your prints and receive the digital file on your phone.' },
        ],
      },
      faq: {
        h2: 'Frequently Asked Questions',
        items: [
          {
            q: 'How many photos do I need for a residence permit?',
            a: 'It can vary by application type – check the document list shown at the end of your e-İkamet application. Our photos are printed as a set of 4, and we can print extra copies if you need more.',
          },
          { q: 'Can I upload the digital photo to e-İkamet?', a: 'Yes. After the shoot we send the digital file free of charge via WhatsApp or email.' },
          { q: 'How long does it take?', a: 'Shooting and printing usually take about 5 minutes.' },
          {
            q: 'Can I use my visa photo?',
            a: 'Usually not. Visa photos are often 35 x 45 mm, while residence permits require a 50 x 60 mm biometric photo.',
          },
          { q: 'How much does it cost?', a: 'Message us on WhatsApp or visit the shop for current prices.' },
          { q: 'What are your opening hours?', a: 'Monday to Saturday, 09:00–19:00. Closed on Sundays.' },
        ],
      },
      visit: {
        h2: 'Visit Us',
        address: 'Hobyar, Ankara Cd. No:55/A, Sirkeci – Fatih, Istanbul',
        hours: 'Monday – Saturday: 09:00 – 19:00',
        closed: 'Sunday: Closed',
        transport: 'A short walk from the Sirkeci Marmaray and tram stops.',
      },
      related: {
        h2: 'Other Photo Services',
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

  ar: {
    path: '/ar/residence-permit-photo',
    content: {
      locale: 'ar',
      dir: 'rtl',
      metaTitle: 'صور الإقامة في إسطنبول | صورة بيومترية لإدارة الهجرة – سيركجي',
      metaDescription:
        'صور بيومترية مقاس 50×60 ملم متوافقة مع معايير ICAO لطلبات الإقامة في تركيا. جاهزة خلال 5 دقائق مع ملف رقمي مجاني لنظام e-İkamet. سيركجي، الفاتح، إسطنبول.',
      keywords: [
        'صور الإقامة اسطنبول',
        'صورة بيومترية للاقامة في تركيا',
        'صور اقامة تركيا',
        'صورة e-ikamet',
        'صور إدارة الهجرة التركية',
        'صور شخصية اسطنبول',
        'residence permit photo istanbul',
      ],
      badge: 'الإقامة في تركيا • e-İkamet',
      h1: 'صور بيومترية لتصريح الإقامة في تركيا',
      intro:
        'هل تتقدم بطلب إقامة في تركيا أو تجددها؟ نلتقط لك صورة بيومترية وفق معايير ICAO التي تطلبها إدارة الهجرة التركية (Göç İdaresi) خلال 5 دقائق في الاستوديو الخاص بنا في سيركجي، ونرسل لك الملف الرقمي للصورة مجاناً لرفعه في طلب e-İkamet.',
      whatsappLabel: 'راسلنا على واتساب',
      whatsappMessage: 'مرحباً، أحتاج صورة لتصريح الإقامة. / Merhaba, ikamet fotoğrafı için yazıyorum.',
      callLabel: 'اتصل بنا',
      directionsLabel: 'احصل على الاتجاهات',
      highlights: [
        { title: 'صورة بيومترية وفق ICAO', text: 'خلفية بيضاء ونسبة وجه صحيحة وإضاءة احترافية حتى لا يتأخر طلبك بسبب الصورة.' },
        { title: 'جاهزة خلال 5 دقائق', text: 'التصوير والطباعة يستغرقان دقائق قليلة وتستلم صورك فوراً.' },
        { title: 'ملف رقمي مجاني', text: 'نرسل صورتك الرقمية لرفعها في نظام e-İkamet عبر واتساب أو البريد الإلكتروني.' },
        { title: 'في سيركجي منذ 1969', text: 'من أعرق استوديوهات التصوير في منطقة الفاتح.' },
      ],
      sections: [
        {
          h2: 'شروط صورة الإقامة',
          paragraphs: ['تشترط إدارة الهجرة استخدام صور بيومترية وفق معايير ICAO في وثائق الإقامة. يجب أن تستوفي صورتك ما يلي:'],
          bullets: [
            'المقاس: صورة بيومترية 50 × 60 ملم',
            'الخلفية: بيضاء سادة',
            'ملتقطة خلال آخر 6 أشهر',
            'الوجه مواجه للكاميرا وواضح بالكامل، العينان مفتوحتان والفم مغلق',
            'نسخة رقمية لطلب e-İkamet الإلكتروني',
          ],
        },
        {
          h2: 'الخطأ الأكثر شيوعاً: المقاس الخاطئ',
          paragraphs: [
            'صور 35 × 45 ملم المستخدمة في كثير من التأشيرات غير مناسبة لتصريح الإقامة التركي، واستخدام صورة قديمة بمقاس خاطئ قد يؤخر طلبك.',
            'قد تتغير الشروط، لذا ننصحك بمراجعة آخر الإعلانات على موقع goc.gov.tr قبل التقديم.',
          ],
        },
        {
          h2: 'لأي طلبات نلتقط الصور؟',
          bullets: [
            'طلبات الإقامة الأولى والتجديد',
            'الإقامة القصيرة والعائلية والطلابية وطويلة الأمد',
            'طلبات إذن العمل',
            'صور جواز السفر والهوية والتأشيرات لجميع الدول',
          ],
        },
      ],
      steps: {
        h2: 'كيف نعمل؟',
        items: [
          { title: 'زر محلنا', text: 'تفضل بزيارة الاستوديو في سيركجي خلال ساعات العمل.' },
          { title: 'التصوير البيومتري', text: 'نلتقط صورتك وفق قواعد ICAO ونراجعها قبل الطباعة.' },
          { title: 'الطباعة والملف الرقمي', text: 'استلم صورك المطبوعة واحصل على الملف الرقمي على هاتفك.' },
        ],
      },
      faq: {
        h2: 'الأسئلة الشائعة',
        items: [
          {
            q: 'كم صورة أحتاج لتصريح الإقامة؟',
            a: 'قد يختلف العدد حسب نوع الطلب، لذا راجع قائمة الوثائق التي تظهر في نهاية طلب e-İkamet. نطبع الصور كمجموعة من 4 صور، ويمكننا طباعة نسخ إضافية عند الحاجة.',
          },
          { q: 'هل يمكنني رفع الصورة الرقمية في نظام e-İkamet؟', a: 'نعم. بعد التصوير نرسل لك الملف الرقمي مجاناً عبر واتساب أو البريد الإلكتروني.' },
          { q: 'كم يستغرق الأمر؟', a: 'يستغرق التصوير والطباعة عادةً حوالي 5 دقائق.' },
          {
            q: 'هل يمكنني استخدام صورة التأشيرة؟',
            a: 'غالباً لا. صور التأشيرات تكون عادةً 35 × 45 ملم، بينما تتطلب الإقامة صورة بيومترية 50 × 60 ملم.',
          },
          { q: 'كم السعر؟', a: 'راسلنا على واتساب أو تفضل بزيارة المحل لمعرفة الأسعار الحالية.' },
          { q: 'ما هي ساعات العمل؟', a: 'من الاثنين إلى السبت من 09:00 حتى 19:00، ويوم الأحد مغلق.' },
        ],
      },
      visit: {
        h2: 'زورونا',
        address: 'Hobyar, Ankara Cd. No:55/A, Sirkeci – Fatih, İstanbul',
        hours: 'من الاثنين إلى السبت: 09:00 – 19:00',
        closed: 'الأحد: مغلق',
        transport: 'على بُعد خطوات من محطتي مرمراي والترام في سيركجي.',
      },
      related: {
        h2: 'خدمات أخرى',
        links: [
          { label: 'صور جواز السفر (English)', href: '/en/passport-photo' },
          { label: 'صور التأشيرة (English)', href: '/en/visa-photo' },
        ],
      },
      breadcrumbHome: 'الرئيسية',
      languageName: 'العربية',
    },
  },

  ru: {
    path: '/ru/residence-permit-photo',
    content: {
      locale: 'ru',
      dir: 'ltr',
      metaTitle: 'Фото на ВНЖ в Стамбуле | Биометрическое фото для Göç İdaresi – Сиркеджи',
      metaDescription:
        'Биометрическое фото 50×60 мм по стандарту ICAO для вида на жительство (ikamet) в Турции. Готово за 5 минут, цифровой файл для e-İkamet бесплатно. Сиркеджи, Фатих, Стамбул.',
      keywords: [
        'фото на внж стамбул',
        'фото для икамета',
        'фото на вид на жительство турция',
        'биометрическое фото стамбул',
        'фото e-ikamet',
        'фото на документы стамбул',
        'residence permit photo istanbul',
      ],
      badge: 'ВНЖ В ТУРЦИИ • E-İKAMET',
      h1: 'Биометрическое фото на ВНЖ в Турции',
      intro:
        'Подаёте документы на вид на жительство (ikamet) или продлеваете его? В нашей студии в Сиркеджи за 5 минут сделаем биометрическое фото по стандарту ICAO, которое требует Миграционная служба Турции (Göç İdaresi). Цифровой файл для заявки e-İkamet — бесплатно.',
      whatsappLabel: 'Написать в WhatsApp',
      whatsappMessage: 'Здравствуйте, мне нужно фото на ВНЖ (ikamet). / Merhaba, ikamet fotoğrafı için yazıyorum.',
      callLabel: 'Позвонить',
      directionsLabel: 'Как добраться',
      highlights: [
        { title: 'Биометрия по ICAO', text: 'Белый фон, правильный размер лица и профессиональный свет — заявка не задержится из-за фото.' },
        { title: 'Готово за 5 минут', text: 'Съёмка и печать занимают несколько минут, фото вы забираете сразу.' },
        { title: 'Цифровой файл бесплатно', text: 'Отправим фото для загрузки в e-İkamet в WhatsApp или на e-mail.' },
        { title: 'В Сиркеджи с 1969 года', text: 'Одна из старейших фотостудий района Фатих.' },
      ],
      sections: [
        {
          h2: 'Требования к фото на ВНЖ',
          paragraphs: ['Göç İdaresi требует биометрические фотографии стандарта ICAO для документов на вид на жительство. Фото должно соответствовать требованиям:'],
          bullets: [
            'Размер: биометрическое фото 50 × 60 мм',
            'Фон: однотонный белый',
            'Сделано не ранее чем 6 месяцев назад',
            'Лицо анфас, чётко и полностью видно; глаза открыты, рот закрыт',
            'Цифровая копия для онлайн-заявки e-İkamet',
          ],
        },
        {
          h2: 'Самая частая ошибка — неверный размер',
          paragraphs: [
            'Фото 35 × 45 мм, которые используют для многих виз, не подходят для турецкого ВНЖ. Старое фото неправильного размера может задержать рассмотрение заявки.',
            'Требования могут меняться — перед подачей проверьте актуальные объявления на сайте goc.gov.tr.',
          ],
        },
        {
          h2: 'Для каких заявок мы снимаем',
          bullets: [
            'Первичное оформление и продление ВНЖ',
            'Краткосрочный, семейный, студенческий и долгосрочный ВНЖ',
            'Разрешение на работу',
            'Фото на паспорт, ID и визы любых стран',
          ],
        },
      ],
      steps: {
        h2: 'Как это работает',
        items: [
          { title: 'Приходите к нам', text: 'Загляните в нашу студию в Сиркеджи в рабочее время.' },
          { title: 'Биометрическая съёмка', text: 'Снимаем по правилам ICAO и проверяем фото перед печатью.' },
          { title: 'Печать + цифровой файл', text: 'Забирайте отпечатки и получите цифровой файл на телефон.' },
        ],
      },
      faq: {
        h2: 'Частые вопросы',
        items: [
          {
            q: 'Сколько фото нужно для ВНЖ?',
            a: 'Количество зависит от типа заявки — проверьте список документов в конце анкеты e-İkamet. Мы печатаем фото комплектом из 4 штук, при необходимости сделаем дополнительные копии.',
          },
          { q: 'Можно ли загрузить цифровое фото в e-İkamet?', a: 'Да. После съёмки бесплатно отправим цифровой файл в WhatsApp или на e-mail.' },
          { q: 'Сколько времени это занимает?', a: 'Съёмка и печать обычно занимают около 5 минут.' },
          {
            q: 'Подойдёт ли фото на визу?',
            a: 'Как правило, нет. Визовые фото обычно 35 × 45 мм, а для ВНЖ нужно биометрическое фото 50 × 60 мм.',
          },
          { q: 'Сколько это стоит?', a: 'Актуальные цены уточняйте в WhatsApp или в студии.' },
          { q: 'Какой у вас график работы?', a: 'С понедельника по субботу с 09:00 до 19:00, воскресенье — выходной.' },
        ],
      },
      visit: {
        h2: 'Как нас найти',
        address: 'Hobyar, Ankara Cd. No:55/A, Sirkeci – Fatih, İstanbul',
        hours: 'Понедельник – суббота: 09:00 – 19:00',
        closed: 'Воскресенье: выходной',
        transport: 'В нескольких минутах ходьбы от остановок Marmaray и трамвая Sirkeci.',
      },
      related: {
        h2: 'Другие услуги',
        links: [
          { label: 'Фото на паспорт (English)', href: '/en/passport-photo' },
          { label: 'Фото на визу (English)', href: '/en/visa-photo' },
        ],
      },
      breadcrumbHome: 'Главная',
      languageName: 'Русский',
    },
  },

  fa: {
    path: '/fa/residence-permit-photo',
    content: {
      locale: 'fa',
      dir: 'rtl',
      metaTitle: 'عکس اقامت ترکیه در استانبول | عکس بیومتریک اداره مهاجرت – سیرکجی',
      metaDescription:
        'عکس بیومتریک ۵۰×۶۰ میلی‌متر مطابق استاندارد ICAO برای درخواست اقامت ترکیه. آماده در ۵ دقیقه، فایل دیجیتال رایگان برای e-İkamet. سیرکجی، فاتح، استانبول.',
      keywords: [
        'عکس اقامت ترکیه',
        'عکس اقامت استانبول',
        'عکس بیومتریک استانبول',
        'عکس e-ikamet',
        'عکس اداره مهاجرت ترکیه',
        'عکس پرسنلی استانبول',
        'residence permit photo istanbul',
      ],
      badge: 'اقامت ترکیه • e-İkamet',
      h1: 'عکس بیومتریک برای اقامت ترکیه',
      intro:
        'برای درخواست یا تمدید اقامت ترکیه (ikamet) اقدام می‌کنید؟ عکس بیومتریک مطابق استاندارد ICAO که اداره مهاجرت ترکیه (Göç İdaresi) درخواست می‌کند را در ۵ دقیقه در استودیوی ما در سیرکجی آماده می‌کنیم. فایل دیجیتال عکس برای درخواست e-İkamet رایگان است.',
      whatsappLabel: 'پیام در واتس‌اپ',
      whatsappMessage: 'سلام، برای اقامت عکس بیومتریک لازم دارم. / Merhaba, ikamet fotoğrafı için yazıyorum.',
      callLabel: 'تماس بگیرید',
      directionsLabel: 'مسیریابی',
      highlights: [
        { title: 'بیومتریک مطابق ICAO', text: 'پس‌زمینه سفید، اندازه صحیح صورت و نور حرفه‌ای تا درخواست شما به خاطر عکس معطل نشود.' },
        { title: 'آماده در ۵ دقیقه', text: 'عکاسی و چاپ فقط چند دقیقه طول می‌کشد و عکس‌ها را همان لحظه تحویل می‌گیرید.' },
        { title: 'فایل دیجیتال رایگان', text: 'عکس دیجیتال برای بارگذاری در e-İkamet را از طریق واتس‌اپ یا ایمیل برایتان می‌فرستیم.' },
        { title: 'از سال ۱۹۶۹ در سیرکجی', text: 'یکی از قدیمی‌ترین استودیوهای عکاسی منطقه فاتح.' },
      ],
      sections: [
        {
          h2: 'شرایط عکس اقامت',
          paragraphs: ['اداره مهاجرت ترکیه برای مدارک اقامت استفاده از عکس بیومتریک مطابق استاندارد ICAO را الزامی می‌داند. عکس شما باید این شرایط را داشته باشد:'],
          bullets: [
            'اندازه: عکس بیومتریک ۵۰ × ۶۰ میلی‌متر',
            'پس‌زمینه: سفید ساده',
            'گرفته‌شده در ۶ ماه اخیر',
            'صورت رو به دوربین، واضح و کامل؛ چشم‌ها باز و دهان بسته',
            'نسخه دیجیتال برای درخواست آنلاین e-İkamet',
          ],
        },
        {
          h2: 'رایج‌ترین اشتباه: اندازه نادرست',
          paragraphs: [
            'عکس‌های ۳۵ × ۴۵ میلی‌متری که برای بسیاری از ویزاها استفاده می‌شوند برای اقامت ترکیه مناسب نیستند. استفاده از عکس قدیمی با اندازه اشتباه می‌تواند درخواست شما را به تأخیر بیندازد.',
            'شرایط ممکن است تغییر کند؛ پیش از درخواست، آخرین اطلاعیه‌ها را در سایت goc.gov.tr بررسی کنید.',
          ],
        },
        {
          h2: 'برای چه درخواست‌هایی عکس می‌گیریم؟',
          bullets: [
            'درخواست اولیه و تمدید اقامت',
            'اقامت کوتاه‌مدت، خانوادگی، تحصیلی و بلندمدت',
            'درخواست مجوز کار',
            'عکس پاسپورت، کارت شناسایی و ویزای همه کشورها',
          ],
        },
      ],
      steps: {
        h2: 'چگونه کار می‌کنیم؟',
        items: [
          { title: 'به مغازه ما بیایید', text: 'در ساعات کاری به استودیوی ما در سیرکجی سر بزنید.' },
          { title: 'عکاسی بیومتریک', text: 'عکس شما را طبق قوانین ICAO می‌گیریم و پیش از چاپ بررسی می‌کنیم.' },
          { title: 'چاپ + فایل دیجیتال', text: 'عکس‌های چاپی را تحویل بگیرید و فایل دیجیتال را روی گوشی خود دریافت کنید.' },
        ],
      },
      faq: {
        h2: 'پرسش‌های متداول',
        items: [
          {
            q: 'برای اقامت چند قطعه عکس لازم است؟',
            a: 'تعداد بسته به نوع درخواست متفاوت است؛ فهرست مدارکی را که در پایان درخواست e-İkamet نمایش داده می‌شود بررسی کنید. عکس‌های ما در بسته ۴ عددی چاپ می‌شوند و در صورت نیاز نسخه اضافه هم چاپ می‌کنیم.',
          },
          { q: 'آیا می‌توانم عکس دیجیتال را در e-İkamet بارگذاری کنم؟', a: 'بله. پس از عکاسی فایل دیجیتال را رایگان از طریق واتس‌اپ یا ایمیل برایتان می‌فرستیم.' },
          { q: 'چقدر طول می‌کشد؟', a: 'عکاسی و چاپ معمولاً حدود ۵ دقیقه طول می‌کشد.' },
          {
            q: 'آیا می‌توانم از عکس ویزا استفاده کنم؟',
            a: 'معمولاً نه. عکس ویزا اغلب ۳۵ × ۴۵ میلی‌متر است، اما برای اقامت عکس بیومتریک ۵۰ × ۶۰ میلی‌متر لازم است.',
          },
          { q: 'قیمت چقدر است؟', a: 'برای اطلاع از قیمت به‌روز در واتس‌اپ پیام دهید یا به مغازه سر بزنید.' },
          { q: 'ساعات کاری شما چیست؟', a: 'همه روزه به‌جز یکشنبه، از ساعت ۰۹:۰۰ تا ۱۹:۰۰.' },
        ],
      },
      visit: {
        h2: 'به ما سر بزنید',
        address: 'Hobyar, Ankara Cd. No:55/A, Sirkeci – Fatih, İstanbul',
        hours: 'همه روزه به‌جز یکشنبه: ۰۹:۰۰ تا ۱۹:۰۰',
        closed: 'یکشنبه: تعطیل',
        transport: 'چند قدم تا ایستگاه‌های مرمرای و تراموای سیرکجی.',
      },
      related: {
        h2: 'خدمات دیگر',
        links: [
          { label: 'عکس پاسپورت (English)', href: '/en/passport-photo' },
          { label: 'عکس ویزا (English)', href: '/en/visa-photo' },
        ],
      },
      breadcrumbHome: 'صفحه اصلی',
      languageName: 'فارسی',
    },
  },
};
