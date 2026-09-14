import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const field = (key: string, max: number) =>
    typeof body[key] === 'string' ? (body[key] as string).trim().slice(0, max) : '';

  const name = field('name', 100);
  const email = field('email', 200);
  const phone = field('phone', 40);
  const message = field('message', 5000);

  if (!name || !message || (!email && !phone)) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const digits = phone.replace(/\D/g, '');
  const waNumber = digits.startsWith('90') ? digits : digits.startsWith('0') ? `9${digits}` : `90${digits}`;

  const rows = [
    ['Ad', escapeHtml(name)],
    ['E-posta', email ? `<a href="mailto:${escapeHtml(email)}" style="color:#C8A45C;">${escapeHtml(email)}</a>` : '—'],
    ['Telefon', phone ? `<a href="https://wa.me/${waNumber}" style="color:#25D366;">${escapeHtml(phone)} 📱</a>` : '—'],
  ];

  const { error } = await resend.emails.send({
    from: 'Faruk Fotoğrafçılık <info@farukfotografcilik.com>',
    to: 'info@farukfotografcilik.com',
    ...(email ? { replyTo: email } : {}),
    subject: `✉️ Web Sitesi Mesajı — ${name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0F1923;color:#E8E6E1;padding:32px;border-radius:16px;">
        <h1 style="color:#C8A45C;font-size:22px;margin:0 0 20px;">Yeni İletişim Formu Mesajı</h1>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          ${rows
            .map(
              ([label, value]) => `<tr>
            <td style="padding:10px 12px;border-bottom:1px solid #1B2A4A;color:#aaa;font-size:13px;width:100px;">${label}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #1B2A4A;font-size:14px;">${value}</td>
          </tr>`
            )
            .join('')}
        </table>
        <div style="background:#1B2A4A;padding:20px;border-radius:12px;white-space:pre-wrap;font-size:14px;line-height:1.6;">${escapeHtml(message)}</div>
        <p style="color:#888;font-size:12px;text-align:center;margin-top:24px;">Bu mesaj farukfotografcilik.com iletişim formundan gönderilmiştir.</p>
      </div>
    `,
  });

  if (error) {
    console.error('Contact form email error:', error);
    return NextResponse.json({ error: 'Email could not be sent.' }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
