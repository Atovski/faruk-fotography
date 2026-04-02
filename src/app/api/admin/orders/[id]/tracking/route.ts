import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_to_prevent_crash');

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { trackingNumber } = await request.json();

    if (!trackingNumber) {
      return NextResponse.json({ error: 'Takip numarası gerekli.' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    // 1. Update order with tracking number
    const { data: order, error } = await supabase
      .from('orders')
      .update({
        tracking_number: trackingNumber,
        tracking_sent_at: new Date().toISOString(),
        status: 'shipped',
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !order) {
      return NextResponse.json({ error: 'Sipariş güncellenemedi.' }, { status: 500 });
    }

    // 2. Send tracking email
    try {
      await resend.emails.send({
        from: 'Faruk Fotoğrafçılık <info@farukfotografcilik.com>',
        to: order.email,
        subject: `Kargonuz Yola Çıktı — #${order.order_number}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0F1923;color:#E8E6E1;padding:32px;border-radius:16px;">
            <div style="text-align:center;margin-bottom:24px;">
              <h1 style="color:#C8A45C;font-size:24px;margin:0;">Faruk Fotoğrafçılık</h1>
              <p style="color:#888;font-size:14px;">Kargo Bildirimi</p>
            </div>

            <div style="background:#1B2A4A;padding:24px;border-radius:12px;margin-bottom:20px;text-align:center;">
              <div style="font-size:48px;margin-bottom:12px;">📦</div>
              <h2 style="color:#C8A45C;font-size:20px;margin:0 0 8px;">Kargonuz Yola Çıktı!</h2>
              <p style="color:#aaa;font-size:14px;margin:0;">Sipariş #${order.order_number}</p>
            </div>

            <div style="background:#1B2A4A;padding:20px;border-radius:12px;margin-bottom:20px;text-align:center;">
              <p style="color:#aaa;font-size:13px;margin:0 0 8px;">Kargo Takip Numaranız</p>
              <p style="color:#C8A45C;font-size:24px;font-weight:bold;margin:0;letter-spacing:2px;">${trackingNumber}</p>
            </div>

            <div style="background:#1B2A4A;padding:16px;border-radius:12px;margin-bottom:20px;">
              <h3 style="color:#C8A45C;font-size:14px;margin:0 0 8px;">Teslimat Adresi</h3>
              <p style="color:#E8E6E1;margin:0;font-size:14px;line-height:1.6;">
                ${order.full_name}<br/>
                ${order.address}<br/>
                ${order.district} / ${order.city}
              </p>
            </div>

            <div style="text-align:center;margin-bottom:20px;">
              <a href="https://www.araskargo.com.tr/tts.aspx" 
                 style="display:inline-block;padding:12px 32px;background:#C8A45C;color:#0F1923;text-decoration:none;border-radius:8px;font-weight:bold;font-size:14px;">
                Kargonu Takip Et
              </a>
            </div>

            <p style="color:#888;font-size:12px;text-align:center;margin-top:24px;">
              Sorularınız için: 0532 440 29 57 (WhatsApp)<br/>
              Faruk Fotoğrafçılık — Hobyar, Ankara Cd. No:55/A, Fatih/İstanbul
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Tracking email error:', emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Tracking API error:', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
