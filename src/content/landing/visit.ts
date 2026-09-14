import type { LandingContent } from './types';

/** Shop visit block and shared FAQ answers, reused across landing pages. */
export const VISIT_TR: LandingContent['visit'] = {
  h2: 'Bizi Ziyaret Edin',
  address: 'Hobyar Mah. Ankara Cad. No:55/A, Sirkeci – Fatih/İstanbul',
  hours: 'Pazartesi – Cumartesi: 09:00 – 19:00',
  closed: 'Pazar: Kapalı',
  transport: 'Sirkeci Marmaray ve tramvay durağına yürüme mesafesinde.',
};

export const VISIT_EN: LandingContent['visit'] = {
  h2: 'Visit Us',
  address: 'Hobyar, Ankara Cd. No:55/A, Sirkeci – Fatih, Istanbul',
  hours: 'Monday – Saturday: 09:00 – 19:00',
  closed: 'Sunday: Closed',
  transport: 'A short walk from the Sirkeci Marmaray and tram stops.',
};

export const FAQ_PRICE_TR = { q: 'Fiyat ne kadar?', a: "Güncel fiyat için WhatsApp'tan yazabilir veya dükkanımıza uğrayabilirsiniz." };
export const FAQ_HOURS_TR = { q: 'Çalışma saatleriniz nedir?', a: 'Pazartesi – Cumartesi 09:00 – 19:00 arası açığız, Pazar kapalıyız.' };
export const FAQ_PRICE_EN = { q: 'How much does it cost?', a: 'Message us on WhatsApp or visit the shop for current prices.' };
export const FAQ_HOURS_EN = { q: 'What are your opening hours?', a: 'Monday to Saturday, 09:00–19:00. Closed on Sundays.' };

export const STEPS_PHOTO_TR: NonNullable<LandingContent['steps']> = {
  h2: 'Nasıl Çalışıyoruz?',
  items: [
    { title: 'Dükkanımıza gelin', text: "Sirkeci'deki stüdyomuza çalışma saatlerinde uğrayın." },
    { title: 'Çekim ve kontrol', text: 'Fotoğrafınızı belgenin kurallarına uygun çekip baskıdan önce kontrol ediyoruz.' },
    { title: 'Baskı + dijital dosya', text: 'Baskılarınızı teslim ediyor, dijital dosyayı telefonunuza gönderiyoruz.' },
  ],
};

export const STEPS_PHOTO_EN: NonNullable<LandingContent['steps']> = {
  h2: 'How It Works',
  items: [
    { title: 'Visit our shop', text: 'Drop by our Sirkeci studio during opening hours.' },
    { title: 'Photo and check', text: "We take your photo to the document's rules and check it before printing." },
    { title: 'Prints + digital file', text: 'Take your prints and receive the digital file on your phone.' },
  ],
};
