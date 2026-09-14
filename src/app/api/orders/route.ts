import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_to_prevent_crash');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer, subtotal, shippingCost, grandTotal, language } = body;
    const isEn = language === 'en';

    if (!items?.length || !customer?.fullName || !customer?.email || !customer?.phone) {
      return NextResponse.json({ error: 'Eksik bilgi.' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    // 1. Create order with a temporary order number
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: 'TEMP',
        full_name: customer.fullName,
        phone: customer.phone,
        email: customer.email,
        city: customer.city,
        district: customer.district,
        address: customer.address,
        postal_code: customer.postalCode || null,
        note: customer.note || null,
        subtotal,
        shipping_cost: shippingCost,
        grand_total: grandTotal,
        status: 'pending',
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error('Order creation error:', orderError);
      return NextResponse.json({ error: 'Sipariş oluşturulamadı.' }, { status: 500 });
    }

    // 2. Build the real order number using total order count
    //    Count includes the row we just inserted, so first ever order → count=1 → 1001
    const { count } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });

    const date = new Date();
    const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const seq = (count || 1) + 1000;
    const orderNumber = `FF-${datePart}-${seq}`;

    // 3. Update the order with the real order number
    await supabase
      .from('orders')
      .update({ order_number: orderNumber })
      .eq('id', order.id);

    // 4. Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Order items error:', itemsError);
    }

    // 3. Send confirmation email
    try {
      const appUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://farukfotografcilik.com';
      const itemsHtml = items.map((item: any) => {
        const imgSrc = item.image ? (item.image.startsWith('/') ? appUrl + item.image : item.image) : '';
        return `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #1B2A4A;width:60px;">
            ${imgSrc ? `<img src="${imgSrc}" width="50" height="50" style="border-radius:8px; object-fit:cover; display:block; background:#1B2A4A;" alt="${item.product_name}" />` : ''}
          </td>
          <td style="padding:8px 12px;border-bottom:1px solid #1B2A4A;">${item.product_name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #1B2A4A;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #1B2A4A;text-align:right;">₺${(item.price * item.quantity).toLocaleString('tr-TR')}</td>
        </tr>`;
      }).join('');

      await resend.emails.send({
        from: 'Faruk Fotoğrafçılık <info@farukfotografcilik.com>',
        to: customer.email,
        bcc: 'info@farukfotografcilik.com',
        subject: isEn ? `Order Received — #${orderNumber}` : `Siparişiniz Alındı — #${orderNumber}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0F1923;color:#E8E6E1;padding:32px;border-radius:16px;">
            <div style="text-align:center;margin-bottom:24px;">
              <h1 style="color:#C8A45C;font-size:24px;margin:0;">Faruk Fotoğrafçılık</h1>
              <p style="color:#888;font-size:14px;">${isEn ? 'Order Confirmation' : 'Sipariş Onayı'}</p>
            </div>

            <div style="background:#1B2A4A;padding:20px;border-radius:12px;margin-bottom:20px;">
              <h2 style="color:#C8A45C;font-size:18px;margin:0 0 8px;">${isEn ? 'Order' : 'Sipariş'} #${orderNumber}</h2>
              <p style="color:#aaa;font-size:14px;margin:0;">${isEn ? 'Your order has been received. We will send payment details (bank transfer or cash on delivery) via WhatsApp. Thank you!' : 'Siparişiniz alınmıştır. Ödeme bilgilerini (Havale/EFT veya kapıda ödeme) WhatsApp üzerinden ileteceğiz. Teşekkür ederiz!'}</p>
            </div>

            <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
              <thead>
                <tr style="background:#1B2A4A;">
                  <th style="padding:10px 12px;width:60px;"></th>
                  <th style="padding:10px 12px;text-align:left;color:#C8A45C;font-size:13px;">${isEn ? 'Product' : 'Ürün'}</th>
                  <th style="padding:10px 12px;text-align:center;color:#C8A45C;font-size:13px;">${isEn ? 'Qty' : 'Adet'}</th>
                  <th style="padding:10px 12px;text-align:right;color:#C8A45C;font-size:13px;">${isEn ? 'Total' : 'Tutar'}</th>
                </tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
            </table>

            <div style="background:#1B2A4A;padding:16px;border-radius:12px;margin-bottom:20px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                <span style="color:#aaa;">${isEn ? 'Subtotal' : 'Ara Toplam'}:</span>
                <span style="color:#E8E6E1;">₺${subtotal.toLocaleString('tr-TR')}</span>
              </div>
              <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                <span style="color:#aaa;">${isEn ? 'Shipping' : 'Kargo'}:</span>
                <span style="color:${shippingCost === 0 ? '#4CAF50' : '#E8E6E1'};">${shippingCost === 0 ? (isEn ? 'Free' : 'Ücretsiz') : '₺' + shippingCost}</span>
              </div>
              <hr style="border:none;border-top:1px solid #C8A45C40;margin:12px 0;" />
              <div style="display:flex;justify-content:space-between;">
                <span style="color:#E8E6E1;font-weight:bold;font-size:18px;">${isEn ? 'Grand Total' : 'Toplam'}:</span>
                <span style="color:#C8A45C;font-weight:bold;font-size:18px;">₺${grandTotal.toLocaleString('tr-TR')}</span>
              </div>
            </div>

            <div style="background:#1B2A4A;padding:16px;border-radius:12px;margin-bottom:20px;">
              <h3 style="color:#C8A45C;font-size:14px;margin:0 0 8px;">${isEn ? 'Delivery Address' : 'Teslimat Adresi'}</h3>
              <p style="color:#E8E6E1;margin:0;font-size:14px;line-height:1.6;">
                ${customer.fullName}<br/>
                ${customer.address}<br/>
                ${customer.district} / ${customer.city}${customer.postalCode ? ' — ' + customer.postalCode : ''}<br/>
                📱 ${customer.phone}
              </p>
            </div>

            <p style="color:#888;font-size:12px;text-align:center;margin-top:24px;">
              ${isEn ? 'For inquiries' : 'Sorularınız için'}: 0532 440 29 57 (WhatsApp)<br/>
              Faruk Fotoğrafçılık — Hobyar, Ankara Cd. No:55/A, Fatih/İstanbul
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Email send error:', emailError);
      // Don't fail the order if email fails
    }

    return NextResponse.json({ success: true, orderNumber, orderId: order.id });
  } catch (error) {
    console.error('Order API error:', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
