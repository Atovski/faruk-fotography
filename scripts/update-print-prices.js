const { createClient } = require('@supabase/supabase-js');
const { loadEnvConfig } = require('@next/env');

loadEnvConfig('./');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const newDescription = `En değerli anılarınızı yüksek kaliteli fotoğraf kağıtlarına basarak ölümsüzleştirin. Renkleri canlı, detayları keskin ve uzun ömürlü baskılarla anılarınızı duvarlarınızda veya albümlerinizde yaşatın.

👉 Baskı Ebatları ve Fiyatlar (Adet Fiyatı):

📦 10x15:
• 1 Adet: 50 TL | 5+: 40 TL | 10+: 35 TL | 25+: 22.50 TL | 50+: 17.50 TL | 100+: 12.50 TL | 250+: 11.50 TL

📦 13x18:
• 1 Adet: 60 TL | 5+: 50 TL | 10+: 45 TL | 25+: 25 TL | 50+: 20 TL | 100+: 15 TL | 250+: 14 TL

📦 15x21:
• 1 Adet: 75 TL | 5+: 60 TL | 10+: 55 TL | 25+: 40 TL | 50+: 30 TL | 100+: 25 TL | 250+: 20 TL

📦 20x30:
• 1 Adet: 200 TL | 3+: 180 TL | 5+: 170 TL | 10+: 160 TL | 25+: 150 TL | 100+: 125 TL | 250+: 120 TL

📦 30x40:
• 1 Adet: 300 TL | 3+: 270 TL | 5+: 260 TL | 10+: 250 TL | 25+: 230 TL | 100+: 200 TL | 250+: 180 TL

📦 Büyük Ebatlar:
• 40x60: 600 TL
• 50x60: 650 TL
• 50x70: 700 TL
• 75x100: 1300 TL

✅ Nasıl Sipariş Verilir? (WhatsApp'tan İletişime Geçin)
Çıkartmayı istediğiniz fotoğrafları ve hangi boyutta olduğunu WhatsApp üzerinden bize gönderebilirsiniz. Akabinde almak istediğiniz günü önceden belirtmeniz halinde siz mağazaya gelmeden baskıyı tamamlayabiliriz. Veya kargo istiyorsanız alıcı ödemeli olarak gönderim sağlayabiliriz.`;

async function main() {
  const { data, error } = await supabase
    .from('products')
    .update({ description: newDescription })
    .match({ name: 'Fotoğraf Baskı' })
    .select();

  if (error) {
    console.error('Update failed:', error);
  } else {
    console.log('Update success! Updated rows:', data.length);
  }
}

main().catch(console.error);
