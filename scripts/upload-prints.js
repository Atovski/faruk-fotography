/**
 * Fotoğraf Baskı ve Kanvas Tablo Ekleme Scripti
 */

const { createClient } = require('@supabase/supabase-js');
const { loadEnvConfig } = require('@next/env');

loadEnvConfig('./');

// Supabase bağlantısı
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const products = [
  {
    name: 'Fotoğraf Baskı',
    price: 50,
    description: `En değerli anılarınızı yüksek kaliteli fotoğraf kağıtlarına basarak ölümsüzleştirin. Renkleri canlı, detayları keskin ve uzun ömürlü baskılarla anılarınızı duvarlarınızda veya albümlerinizde yaşatın.

👉 Baskı Ebatları ve Fiyatlar (Adet Fiyatı):
• 10x15: 50 TL
• 13x18: 60 TL
• 15x21: 75 TL
• 20x30: 200 TL
• 30x40: 300 TL
• 40x60: 600 TL
• 50x60: 650 TL
• 50x70: 700 TL
• 75x100: 1300 TL

📸 *Not:* Toplu fotoğraf baskılarında adet artışına göre özel indirimli fiyat tablomuz uygulanmaktadır. Daha fazla bilgi ve çoklu sipariş için lütfen WhatsApp'tan iletişime geçin.`,
    is_customizable: true,
    subSlug: 'print',
    subName: 'Fotoğraf Baskıları'
  },
  {
    name: 'Kanvas Tablo',
    price: 500,
    description: `Fotoğraflarınızı evinizin ve ofisinizin en güzel köşesi için sanatsal bir dekorasyona dönüştürün. 1. sınıf dokulu pamuk kanvas kumaş üzerine yüksek çözünürlüklü baskı ve birinci sınıf şase işçiliğiyle hazırlanır.

👉 Kanvas Tablo Ebatları ve Fiyatlar:
• 20x30: 500 TL
• 30x40: 700 TL
• 40x60: 900 TL
• 50x60: 1100 TL
• 50x70: 1300 TL
• 50x75: 1450 TL
• 75x100: 2250 TL

🎨 *Sipariş:* Özel ölçüler ve detaylar için WhatsApp'tan bizimle iletişime geçerek hızlıca sipariş oluşturabilirsiniz.`,
    is_customizable: true,
    subSlug: 'canvas',
    subName: 'Kanvas Tablolar'
  }
];

async function main() {
  console.log('🚀 Baskı ve Tablo ürünleri ekleniyor...\n');

  // "Kişiselleştirilebilir Ürünler" ana kategorisini bul
  const { data: mainCat, error: mainErr } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'customizable-products')
    .single();

  if (mainErr || !mainCat) {
    throw new Error('Ana kategori bulunamadı (Kişiselleştirilebilir Ürünler)');
  }
  
  const mainCatId = mainCat.id;

  for (const prod of products) {
    // Alt kategoriyi kontrol et veya oluştur
    let subCatId;
    const { data: existingSub } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', prod.subSlug)
      .single();

    if (existingSub) {
      subCatId = existingSub.id;
    } else {
      const { data: subCat, error: subErr } = await supabase
        .from('categories')
        .insert({
          name: prod.subName,
          slug: prod.subSlug,
          parent_id: mainCatId,
          image_url: '',
          sort_order: 10,
        })
        .select()
        .single();
        
      if (subErr) throw new Error(`Alt kategori oluşturulamadı: ${subErr.message}`);
      subCatId = subCat.id;
    }

    // Ürünü kaydet
    const { data: product, error: prodErr } = await supabase
      .from('products')
      .insert({
        name: prod.name,
        description: prod.description,
        price: prod.price,
        image_url: '', 
        images: [],
        category_id: mainCatId,
        subcategory_id: subCatId,
        stock: 999, // Baskı vs stok sınırsız olabilir veya yüksek
        is_active: true,
        is_customizable: prod.is_customizable, 
        sort_order: 1,
      })
      .select()
      .single();

    if (prodErr) {
      console.log(`❌ ${prod.name} kaydedilemedi: ${prodErr.message}`);
    } else {
      console.log(`✅ ${prod.name} başarıyla eklendi! (ID: ${product.id})`);
    }
  }

  console.log('\n🎉 İşlem tamamlandı!');
}

main().catch(console.error);
