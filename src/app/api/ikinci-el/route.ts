import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const brand = formData.get('brand') as string;
    const model = formData.get('model') as string;
    const condition = formData.get('condition') as string;
    const phone = formData.get('phone') as string;
    const notes = formData.get('notes') as string;
    const language = formData.get('language') as string;
    const isEn = language === 'en';

    if (!brand || !model || !condition || !phone) {
      return NextResponse.json(
        { error: isEn ? 'Missing required fields.' : 'Zorunlu alanlar eksik.' },
        { status: 400 }
      );
    }

    // Upload photos to Supabase Storage
    const supabase = createServerSupabaseClient();
    const photoUrls: string[] = [];
    const files = formData.getAll('photos') as File[];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file || file.size === 0) continue;

      const ext = file.name.split('.').pop() || 'jpg';
      const timestamp = Date.now();
      const filePath = `ikinci-el/${timestamp}_${i}.${ext}`;

      const buffer = Buffer.from(await file.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from('galleries')
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from('galleries')
          .getPublicUrl(filePath);
        if (urlData?.publicUrl) {
          photoUrls.push(urlData.publicUrl);
        }
      } else {
        console.error('Upload error:', uploadError);
      }
    }

    // Build photo HTML for email
    const photosHtml = photoUrls.length > 0
      ? `<div style="margin-bottom:20px;">
          <h3 style="color:#C8A45C;font-size:14px;margin:0 0 12px;">${isEn ? 'Photos' : 'Fotoğraflar'} (${photoUrls.length})</h3>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            ${photoUrls.map(url => `<a href="${url}" target="_blank" style="display:inline-block;"><img src="${url}" width="120" height="120" style="border-radius:8px;object-fit:cover;border:2px solid #C8A45C30;" alt="camera" /></a>`).join('')}
          </div>
        </div>`
      : '';

    // Send email
    try {
      await resend.emails.send({
        from: 'Faruk Fotoğrafçılık <info@farukfotografcilik.com>',
        to: 'info@farukfotografcilik.com',
        subject: `🎞️ 2. El Kamera Teklif Talebi — ${brand} ${model}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0F1923;color:#E8E6E1;padding:32px;border-radius:16px;">
            <div style="text-align:center;margin-bottom:24px;">
              <h1 style="color:#C8A45C;font-size:24px;margin:0;">Faruk Fotoğrafçılık</h1>
              <p style="color:#888;font-size:14px;">2. El Kamera — Teklif Talebi</p>
            </div>

            <div style="background:#1B2A4A;padding:20px;border-radius:12px;margin-bottom:20px;">
              <h2 style="color:#C8A45C;font-size:20px;margin:0 0 4px;">${brand} ${model}</h2>
              <p style="color:#aaa;font-size:14px;margin:0;">Yeni bir 2. el kamera teklif talebi alındı.</p>
            </div>

            <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
              <tr>
                <td style="padding:10px 12px;border-bottom:1px solid #1B2A4A;color:#aaa;font-size:13px;width:120px;">Marka</td>
                <td style="padding:10px 12px;border-bottom:1px solid #1B2A4A;color:#E8E6E1;font-size:14px;font-weight:600;">${brand}</td>
              </tr>
              <tr>
                <td style="padding:10px 12px;border-bottom:1px solid #1B2A4A;color:#aaa;font-size:13px;">Model</td>
                <td style="padding:10px 12px;border-bottom:1px solid #1B2A4A;color:#E8E6E1;font-size:14px;font-weight:600;">${model}</td>
              </tr>
              <tr>
                <td style="padding:10px 12px;border-bottom:1px solid #1B2A4A;color:#aaa;font-size:13px;">Durum</td>
                <td style="padding:10px 12px;border-bottom:1px solid #1B2A4A;color:${condition === 'working' || condition === 'Çalışıyor' ? '#4CAF50' : '#FF6B6B'};font-size:14px;font-weight:600;">${condition}</td>
              </tr>
              <tr>
                <td style="padding:10px 12px;border-bottom:1px solid #1B2A4A;color:#aaa;font-size:13px;">Telefon</td>
                <td style="padding:10px 12px;border-bottom:1px solid #1B2A4A;color:#E8E6E1;font-size:14px;font-weight:600;">
                  <a href="https://wa.me/9${phone.replace(/\s/g, '').replace(/^0/, '')}" style="color:#25D366;text-decoration:none;">${phone} 📱</a>
                </td>
              </tr>
              ${notes ? `<tr>
                <td style="padding:10px 12px;border-bottom:1px solid #1B2A4A;color:#aaa;font-size:13px;">Ek Bilgi</td>
                <td style="padding:10px 12px;border-bottom:1px solid #1B2A4A;color:#E8E6E1;font-size:14px;">${notes}</td>
              </tr>` : ''}
            </table>

            ${photosHtml}

            <p style="color:#888;font-size:12px;text-align:center;margin-top:24px;">
              Bu talep farukfotografcilik.com üzerinden gönderilmiştir.
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Email error:', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: isEn
        ? 'Your request has been sent successfully. We will contact you via WhatsApp.'
        : 'Talebiniz başarıyla gönderildi. WhatsApp üzerinden sizinle iletişime geçeceğiz.',
    });
  } catch (error) {
    console.error('Second hand API error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası.' },
      { status: 500 }
    );
  }
}
