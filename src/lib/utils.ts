export function generateAccessCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('90')) return '+' + cleaned;
  if (cleaned.startsWith('0')) return '+9' + cleaned;
  if (cleaned.length === 10) return '+90' + cleaned;
  return '+' + cleaned;
}

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '').replace(/^0/, '').replace(/^90/, '');
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(dateStr: string, locale: string = 'tr-TR'): string {
  return new Date(dateStr).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getWhatsAppUrl(message: string = ''): string {
  const phone = '905324402957';
  const encoded = encodeURIComponent(message || 'Merhaba, web sitenizden ulaşıyorum.');
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
