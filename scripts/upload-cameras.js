/**
 * 2. El Analog Kamera Toplu Yükleme Scripti
 * ------------------------------------------
 * Bu script:
 * 1. "Kameralar" ana kategorisini oluşturur
 * 2. "2. El Analog Kameralar" alt kategorisini oluşturur
 * 3. Her kameranın görsellerini Supabase Storage'a yükler
 * 4. Her kamerayı ürün olarak kaydeder
 */

const { createClient } = require('@supabase/supabase-js');
const { loadEnvConfig } = require('@next/env');

loadEnvConfig('./');
const fs = require('fs');
const path = require('path');

// Supabase bağlantısı
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Kamera fotoğrafları dizini
const PHOTO_BASE = path.join('C:', 'Users', 'ataha', 'OneDrive', 'Masaüstü', 'kamera foto');

// Ürün verileri
const cameras = [
  {
    name: 'Canon AE-1',
    folder: 'Canon AE 1',
    price: 15700,
    description: `Canon AE-1 — 35mm SLR Analog Fotoğraf Makinesi

Canon'un efsanevi AE-1 modeli, 1976 yılında piyasaya sürülmüş ve fotoğraf tarihine damga vurmuş bir SLR kameradır. Mikroişlemci kontrollü obtüratör öncelikli otomatik pozlama özelliğiyle dönemin en yenilikçi kameralarından biri olmuştur.

• Tip: 35mm SLR
• Lens Yuva: Canon FD mount
• Obtüratör: 2s – 1/1000s + Bulb
• Ölçüm: TTL merkez ağırlıklı
• Pozlama: Manuel + Obtüratör Öncelikli (Shutter Priority AE)
• Film Hızı: ISO 25–3200
• Vizör: Sabit göz seviyesi pentaprizma, split-image odaklama
• Flaş Senkron: 1/60s
• Ağırlık: ~590g (gövde)

Başlangıç seviyesinden profesyonele kadar her fotoğrafçıya hitap eden bu kamera, geniş Canon FD lens ekosistemine erişim sunar.

✅ 2 ay garanti dahildir.
📦 Stokta 1 adet mevcuttur.`
  },
  {
    name: 'Canon EOS 50',
    folder: 'Canon EOS50',
    price: 8250,
    description: `Canon EOS 50 — 35mm Otofokus SLR Analog Fotoğraf Makinesi

1995 yılında tanıtılan Canon EOS 50, ileri düzey amatör fotoğrafçılar için tasarlanmış otofokuslu bir 35mm SLR kameradır. Dahili motor sürücü ve Canon EF lens mount ile modern ergonomik bir deneyim sunar.

• Tip: 35mm AF SLR
• Lens Yuva: Canon EF mount (tüm EF lenslerle uyumlu)
• Obtüratör: 30s – 1/4000s + Bulb
• Pozlama Modları: Program (P), Diyafram Öncelikli (Av), Obtüratör Öncelikli (Tv), Manuel (M)
• Ölçüm: 6 bölgeli değerlendirmeli (evaluative), kısmi ve merkez ağırlıklı
• Odaklama: 3 noktalı TTL faz algılama AF
• Dahili Flaş: E-TTL uyumlu açılır flaş
• Film Çekimi: Motorlu, saniyede 2.5 kare
• Ağırlık: ~595g (gövde)

Canon'un geniş EF lens ailesinin tamamıyla uyumlu olan bu kamera, hız ve otomasyonu bir arada sunar.

✅ 2 ay garanti dahildir.
📦 Stokta 1 adet mevcuttur.`
  },
  {
    name: 'Nikon L35AD (Nikon AD)',
    folder: 'Nikon AD',
    price: 11700,
    description: `Nikon L35AD (Nikon AD) — 35mm Kompakt Analog Fotoğraf Makinesi

Japonya'da "Pikaichi" (birinci sınıf) lakabıyla tanınan Nikon L35AD, otomatik odaklama ve pozlama sistemine sahip kompakt bir 35mm film kamerasıdır. Keskin 35mm f/2.8 Nikkor lensiyle point-and-shoot kategorisinin en iyileri arasında yer alır.

• Tip: 35mm Kompakt (Point & Shoot)
• Lens: 35mm f/2.8 Nikkor (5 eleman, 4 grup)
• Odaklama: Otomatik, minimum 0.8m
• Pozlama: Tam otomatik (Programlı)
• Obtüratör: 1/8s – 1/430s
• Film Hızı: ISO 50–1000
• Flaş: Dahili açılır otomatik flaş
• Film Taşıma: Otomatik sarma ve geri sarma
• Güç: 2x AA pil
• Ağırlık: ~345g

Kompakt boyutu ve üstün lens kalitesiyle cebinizde taşıyabileceğiniz en iyi analog kameralardan biri.

✅ 2 ay garanti dahildir.
📦 Stokta 1 adet mevcuttur.`
  },
  {
    name: 'Nikon FE2',
    folder: 'Nikon FE2',
    price: 17750,
    description: `Nikon FE2 — 35mm SLR Analog Fotoğraf Makinesi

1983–1987 yılları arasında üretilen Nikon FE2, kompakt ve dayanıklı tasarımıyla dönemin en gelişmiş mekanik SLR kameralarından biridir. Titanyum obtüratör kanatları, 1/4000s maksimum hız ve TTL flaş ölçümü sunar.

• Tip: 35mm SLR
• Lens Yuva: Nikon F-mount (AI / AI-S lensler)
• Obtüratör: 8s – 1/4000s + Bulb, Mekanik 1/250s (M250)
• Pozlama: Manuel + Diyafram Öncelikli (Aperture Priority AE)
• Ölçüm: TTL merkez ağırlıklı, iğne göstergeli vizör
• Flaş Senkron: 1/250s (dönemin en hızlısı)
• TTL Flaş: OTF (off-the-film) elektronik flaş otomasyonu
• Vizör: %93 kapsama, 0.86x büyütme
• Ağırlık: ~550g (gövde)

Titanyum obtüratör kanatları ve 1/250s flaş senkron hızıyla profesyonel performans sunan bu kamera, Nikon'un efsanevi F-mount lens ekosistemine erişim sağlar.

✅ 2 ay garanti dahildir.
📦 Stokta 1 adet mevcuttur.`
  },
  {
    name: 'Nikon FM2',
    folder: 'Nikon FM2',
    price: 15700,
    description: `Nikon FM2 — 35mm Mekanik SLR Analog Fotoğraf Makinesi

1982–2001 yılları arasında üretilen Nikon FM2, tam mekanik yapısıyla analog fotoğrafçılığın efsaneleri arasında yer alır. Pil olmadan tüm obtüratör hızlarında çalışabilmesi, onu dünyanın en güvenilir kameralarından biri yapar.

• Tip: 35mm Tam Mekanik SLR
• Lens Yuva: Nikon F-mount (AI / AI-S lensler)
• Obtüratör: 1s – 1/4000s + Bulb (tamamen mekanik)
• Pozlama: Tam Manuel
• Ölçüm: TTL merkez ağırlıklı, LED gösterge (+/O/-)
• Flaş Senkron: 1/200s (FM2n: 1/250s)
• Dayanıklılık: -40°C ile +50°C arası çalışma sıcaklığı
• Gövde: Bakır-alüminyum-silikon alaşım
• Ağırlık: ~540g (gövde)

Tam mekanik yapısı sayesinde pil olmadan çalışabilen bu kamera, her koşulda güvenilir performans sunar. Çoklu pozlama ve değiştirilebilir odaklama ekranı gibi profesyonel özelliklerle donatılmıştır.

✅ 2 ay garanti dahildir.
📦 Stokta 1 adet mevcuttur.`
  },
  {
    name: 'Nikon FM10',
    folder: 'Nikon FM100',
    price: 10250,
    description: `Nikon FM10 — 35mm Mekanik SLR Analog Fotoğraf Makinesi

1995–2022 yılları arasında üretilen Nikon FM10, ekonomik fiyatıyla analog fotoğrafçılığa başlamak isteyenler için ideal bir kameradır. Tam mekanik obtüratörü sayesinde pil olmadan çalışabilir.

• Tip: 35mm Manuel SLR
• Lens Yuva: Nikon F-mount (AI / AI-S lensler)
• Obtüratör: 1s – 1/2000s + Bulb (mekanik)
• Pozlama: Tam Manuel
• Ölçüm: TTL merkez ağırlıklı, LED gösterge
• Film Hızı: ISO 25–3200
• Flaş Senkron: 1/125s
• Vizör: Pentaprizma, %92 kapsama
• Odaklama Ekranı: Split-image mikroprizma
• Ağırlık: ~420g (gövde)

Hafif yapısı, mekanik güvenilirliği ve Nikon F-mount uyumluluğuyla fotoğrafçılığın temellerini öğrenmek için mükemmel bir tercih.

✅ 2 ay garanti dahildir.
📦 Stokta 1 adet mevcuttur.`
  },
  {
    name: 'Nikon N60',
    folder: 'Nikon N60',
    price: 6250,
    description: `Nikon N60 (F60) — 35mm Otofokus SLR Analog Fotoğraf Makinesi

1998–2001 yılları arasında üretilen Nikon N60 (Avrupa'da F60 adıyla bilinir), giriş seviyesi kullanıcılar için tasarlanmış otofokuslu bir 35mm SLR kameradır. Çoklu pozlama modları ve dahili flaşıyla kolay kullanım sunar.

• Tip: 35mm AF SLR
• Lens Yuva: Nikon F-mount (AF Nikkor lenslerle uyumlu)
• Obtüratör: 30s – 1/2000s + Bulb
• Pozlama Modları: Program (P), Obtüratör Öncelikli (S), Diyafram Öncelikli (A), Manuel (M), 5 sahne modu
• Ölçüm: Matris, merkez ağırlıklı
• Odaklama: Tek noktalı otofokus
• Dahili Flaş: TTL, matris dengeli dolgu flaşı, kırmızı göz azaltma
• Film Taşıma: Otomatik yükleme, sarma ve geri sarma
• Güç: 2x CR123A lityum pil
• Ağırlık: ~575g (gövde)

Otomatik modları ve kullanıcı dostu arayüzüyle analog fotoğrafçılığa geçiş yapmak isteyenler için ideal bir başlangıç kamerası.

✅ 2 ay garanti dahildir.
📦 okta 1 adet mevcuttur.`
  },
  {
    name: 'Pentax K1000',
    folder: 'Pentax K1000',
    price: 23000,
    description: `Pentax K1000 — 35mm Mekanik SLR Analog Fotoğraf Makinesi

1976–1997 yılları arasında üretilen Pentax K1000, sadeliği ve mekanik güvenilirliğiyle analog fotoğrafçılığın simgelerinden biridir. Dünya genelinde fotoğraf eğitiminde en çok kullanılan kamera olma özelliğini taşır.

• Tip: 35mm Tam Mekanik SLR
• Lens Yuva: Pentax K-mount (geniş lens uyumluluğu)
• Obtüratör: 1s – 1/1000s + Bulb (tamamen mekanik)
• Pozlama: Tam Manuel
• Ölçüm: TTL merkez ağırlıklı, galvanometre iğneli gösterge
• Film Hızı: ISO 20–3200
• Flaş Senkron: 1/60s
• Güç: 1x LR44/SR44 pil (sadece ışık ölçer için)
• Ağırlık: ~620g

"Tank gibi" dayanıklılığıyla bilinen bu kamera, pil olmadan tüm obtüratör hızlarında çalışabilir. Sade ve anlaşılır kontrolleriyle pozlama üçgenini öğrenmek için en iyi kamera olarak kabul edilir.

✅ 2 ay garanti dahildir.
📦 Stokta 1 adet mevcuttur.`
  },
  {
    name: 'Yashica FX-D SE Quartz',
    folder: 'Yashica FX Dse',
    price: 11250,
    description: `Yashica FX-D SE Quartz — 35mm SLR Analog Fotoğraf Makinesi

1980 yılında piyasaya sürülen Yashica FX-D SE, Contax 139 Quartz ile ortak tasarım öğeleri taşıyan, diyafram öncelikli otomatik pozlama sunan bir 35mm SLR kameradır. Contax/Yashica mount sayesinde Carl Zeiss lenslerle uyumludur.

• Tip: 35mm SLR
• Lens Yuva: Contax/Yashica (C/Y) bayonet mount
• Obtüratör: 1s – 1/1000s + Bulb (elektronik kontrollü)
• Pozlama: Diyafram Öncelikli AE + Manuel
• Ölçüm: TTL merkez ağırlıklı, SPD sensör
• Vizör: 16 LED gösterge (obtüratör hızı, flaş, pil durumu)
• Pozlama Kompanzasyonu: ±2 EV
• Film Hızı: ISO 25–1600
• Film Kontrol Penceresi: Film ilerleme göstergeli (kırmızı/beyaz dönen çark)
• Ağırlık: ~469g

Carl Zeiss ve Yashica ML lenslerinin muhteşem optik kalitesiyle buluşan bu kamera, kompakt yapısı ve otomatik pozlama özelliğiyle öne çıkar.

✅ 2 ay garanti dahildir.
📦 Stokta 1 adet mevcuttur.`
  },
  {
    name: 'Yashica FX-3',
    folder: 'Yashica FX3',
    price: 8500,
    description: `Yashica FX-3 — 35mm Mekanik SLR Analog Fotoğraf Makinesi

1979 yılında tanıtılan Yashica FX-3, sade ve tamamen mekanik tasarımıyla öne çıkan bir 35mm SLR kameradır. Contax/Yashica mount sayesinde efsanevi Carl Zeiss lenslerle kullanılabilir.

• Tip: 35mm Manuel Mekanik SLR
• Lens Yuva: Contax/Yashica (C/Y) mount
• Obtüratör: 1s – 1/1000s + Bulb (tamamen mekanik)
• Pozlama: Tam Manuel
• Ölçüm: TTL merkez ağırlıklı, 3 LED gösterge (+/0/-)
• Flaş: Hot shoe, mekanik senkronizasyon
• Güç: 2x SR44/LR44 pil (sadece ışık ölçer için)
• Gövde: Metal
• Ağırlık: ~450g

Carl Zeiss ve Yashica ML lens uyumluluğuyla üstün optik kalite sunan bu kamera, mekanik güvenilirliği ve kompakt yapısıyla sokak fotoğrafçılığı için ideal bir tercihtir.

✅ 2 ay garanti dahildir.
📦 Stokta 1 adet mevcuttur.`
  },
  {
    name: 'Zenit',
    folder: 'Zenit',
    price: 4500,
    description: `Zenit — 35mm Mekanik SLR Analog Fotoğraf Makinesi (Sovyet)

Sovyetler Birliği'nin efsanevi Krasnogorsk Mekanik Fabrikası (KMZ) tarafından üretilen Zenit serisi, dayanıklılığı ve mekanik sadeliğiyle dünya çapında tanınan analog SLR kameralardır. M42 vida mount sayesinde geniş bir lens ekosistemine erişim sunar.

• Tip: 35mm Tam Mekanik SLR
• Lens Yuva: M42 vida mount (evrensel, geniş lens uyumluluğu)
• Obtüratör: Tamamen mekanik, pil gerektirmez
• Pozlama: Tam Manuel
• Gövde: Tam metal, son derece dayanıklı
• Standart Lens: Helios-44 58mm f/2 (ünlü "dönen bokeh" efekti)

"Tank gibi" sağlamlığıyla bilinen Zenit kameralar, uygun fiyatıyla film fotoğrafçılığına başlamak için harika bir seçenektir. Efsanevi Helios-44 lensinin benzersiz bokeh karakteri, portre ve sanatsal çekimler için eşsiz sonuçlar sunar.

✅ 2 ay garanti dahildir.
📦 Stokta 1 adet mevcuttur.`
  },
  {
    name: 'Yashica FX-7',
    folder: 'Yashica FX7',
    price: 8250,
    description: `Yashica FX-7 — 35mm Mekanik SLR Analog Fotoğraf Makinesi

1979–1984 yılları arasında üretilen Yashica FX-7, FX-3'ün gümüş/krom kaplamalı versiyonu olarak bilinir. Tamamen mekanik obtüratörü ve Contax/Yashica mount ile Carl Zeiss lens uyumluluğu sunar.

• Tip: 35mm Manuel Mekanik SLR
• Lens Yuva: Contax/Yashica (C/Y) bayonet mount
• Obtüratör: 1s – 1/1000s + Bulb (mekanik)
• Pozlama: Tam Manuel
• Ölçüm: TTL merkez ağırlıklı, SPD sensör
• Ölçüm Aralığı: EV 2–18 (ISO 100, 50mm f/1.4)
• Film Hızı: ISO 12–1600
• Vizör: Pentaprizma, %92 görüş alanı, 0.91x büyütme
• Odaklama: Diyagonal split-image / mikroprizma
• Güç: 2x LR44/SR44 pil (sadece ışık ölçer için)
• Ağırlık: ~445g

Şık gümüş tasarımı, mekanik güvenilirliği ve Carl Zeiss lens uyumluluğuyla hem koleksiyon hem de günlük kullanım için ideal bir analog SLR.

✅ 2 ay garanti dahildir.
📦 Stokta 1 adet mevcuttur.`
  },
  {
    name: 'Nikon F2',
    folder: 'Nikon F2',
    price: 20750,
    description: `Nikon F2 — 35mm Profesyonel Mekanik SLR Analog Fotoğraf Makinesi

1971–1980 yılları arasında üretilen Nikon F2, Nikon'un son tamamen mekanik profesyonel SLR kamerasıdır. Titanyum obtüratör perdeleri, modüler tasarımı ve efsanevi dayanıklılığıyla foto muhabirlerinin vazgeçilmezi olmuştur.

• Tip: 35mm Profesyonel Mekanik SLR
• Lens Yuva: Nikon F-mount (geniş Nikkor lens uyumluluğu)
• Obtüratör: 1s – 1/2000s + Bulb + Time (titanyum perdeler)
• Pozlama: Tam Manuel
• Ölçüm: TTL merkez ağırlıklı (Photomic kafalar ile)
• Flaş Senkron: 1/80s
• Vizör: Değiştirilebilir pentaprizma kafalar, ~%100 kapsama
• Odaklama Ekranı: Değiştirilebilir (çoklu tip)
• Ayna Kilidi: Titreşimi azaltmak için ayna kilitleme mekanizması
• Gövde: Tam metal, profesyonel yapı
• Ağırlık: ~840g (gövde)

Nikon'un profesyonel miras serisi olan F ailesinin en rafine modeli. Modüler yapısı sayesinde farklı vizör kafaları, odaklama ekranları ve motor sürücülerle kişiselleştirilebilir. Film fotoğrafçılığının zirvesi.

✅ 2 ay garanti dahildir.
📦 Stokta 1 adet mevcuttur.`
  },
];

async function main() {
  console.log('🚀 2. El Analog Kamera yükleme işlemi başlıyor...\n');

  // 1. "Kameralar" ana kategorisini oluştur
  console.log('📂 Kategoriler oluşturuluyor...');

  let mainCatId;
  const { data: existingMain } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'cameras')
    .single();

  if (existingMain) {
    mainCatId = existingMain.id;
    console.log('   ✅ "Kameralar" kategorisi zaten mevcut:', mainCatId);
  } else {
    const { data: mainCat, error: mainErr } = await supabase
      .from('categories')
      .insert({ name: 'Kameralar', slug: 'cameras', image_url: '', sort_order: 4 })
      .select()
      .single();
    if (mainErr) throw new Error('Ana kategori oluşturulamadı: ' + mainErr.message);
    mainCatId = mainCat.id;
    console.log('   ✅ "Kameralar" kategorisi oluşturuldu:', mainCatId);
  }

  // 2. "2. El Analog Kameralar" alt kategorisini oluştur
  let subCatId;
  const { data: existingSub } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'second-hand-analog')
    .single();

  if (existingSub) {
    subCatId = existingSub.id;
    console.log('   ✅ "2. El Analog Kameralar" alt kategorisi zaten mevcut:', subCatId);
  } else {
    const { data: subCat, error: subErr } = await supabase
      .from('categories')
      .insert({
        name: '2. El Analog Kameralar',
        slug: 'second-hand-analog',
        parent_id: mainCatId,
        image_url: '',
        sort_order: 1,
      })
      .select()
      .single();
    if (subErr) throw new Error('Alt kategori oluşturulamadı: ' + subErr.message);
    subCatId = subCat.id;
    console.log('   ✅ "2. El Analog Kameralar" alt kategorisi oluşturuldu:', subCatId);
  }

  console.log('');

  // 3. Her kamerayı yükle
  let successCount = 0;
  for (let i = 0; i < cameras.length; i++) {
    const cam = cameras[i];
    const folderPath = path.join(PHOTO_BASE, cam.folder);
    console.log(`📷 [${i + 1}/${cameras.length}] ${cam.name} yükleniyor...`);

    // Fotoğrafları bul ve isim sırasına göre sırala
    if (!fs.existsSync(folderPath)) {
      console.log(`   ⚠️ Klasör bulunamadı: ${folderPath}`);
      continue;
    }

    const files = fs.readdirSync(folderPath)
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .sort(); // Ad sırasına göre sırala

    console.log(`   📁 ${files.length} görsel bulundu (ad sırasına göre sıralandı)`);

    // Her görseli Supabase Storage'a yükle
    const imageUrls = [];
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileBuffer = fs.readFileSync(filePath);
      const ext = path.extname(file).toLowerCase().replace('.', '');
      const storageName = `product-images/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

      const { error: uploadErr } = await supabase.storage
        .from('products')
        .upload(storageName, fileBuffer, {
          contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
          upsert: false,
        });

      if (uploadErr) {
        console.log(`   ❌ Görsel yüklenemedi (${file}): ${uploadErr.message}`);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('products')
        .getPublicUrl(storageName);

      imageUrls.push(urlData.publicUrl);
      process.stdout.write(`   ✅ ${file} yüklendi\n`);

      // Rate limiting: her yüklemeden sonra kısa bir bekleme
      await new Promise(r => setTimeout(r, 200));
    }

    if (imageUrls.length === 0) {
      console.log(`   ⚠️ Hiç görsel yüklenemedi, ürün atlanıyor.`);
      continue;
    }

    // Ürünü veritabanına kaydet
    const { data: product, error: prodErr } = await supabase
      .from('products')
      .insert({
        name: cam.name,
        description: cam.description,
        price: cam.price,
        image_url: imageUrls[0], // İlk görsel ana görsel
        images: imageUrls,
        category_id: mainCatId,
        subcategory_id: subCatId,
        stock: 1,
        is_active: true,
        is_customizable: true, // WhatsApp ile iletişim
        sort_order: i + 1,
      })
      .select()
      .single();

    if (prodErr) {
      console.log(`   ❌ Ürün kaydedilemedi: ${prodErr.message}`);
    } else {
      console.log(`   ✅ ${cam.name} başarıyla eklendi! (ID: ${product.id})`);
      successCount++;
    }

    console.log('');
  }

  console.log(`\n🎉 İşlem tamamlandı! ${successCount}/${cameras.length} kamera başarıyla yüklendi.`);
}

main().catch(err => {
  console.error('❌ Hata:', err.message);
  process.exit(1);
});
