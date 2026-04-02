const fs = require('fs');
const path = require('path');
const { loadEnvConfig } = require('@next/env');
const { createClient } = require('@supabase/supabase-js');

loadEnvConfig('./');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const imageMap = {
  'kodak_35mm_1775139713343.png': 'kodak_35.png',
  'kodak_pro_120_1775139738720.png': 'kodak_120.png',
  'fuji_35mm_1775139754857.png': 'fuji_35.png',
  'ilford_bw_1775139774092.png': 'ilford_35.png',
  'custom_mug_1775139796676.png': 'custom_mug.png',
  'custom_tshirt_1775139811338.png': 'custom_tshirt.png',
  'custom_puzzle_1775139826015.png': 'custom_puzzle.png',
  'custom_rock_1775139840375.png': 'custom_rock.png',
};

const artifactDir = 'C:\\Users\\ataha\\.gemini\\antigravity\\brain\\28b6b276-ab26-49fb-a7e1-f9fcd07680b3';
const destDir = path.join(__dirname, '..', 'public', 'images', 'products');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy images
for (const [key, val] of Object.entries(imageMap)) {
  const src = path.join(artifactDir, key);
  const dest = path.join(destDir, val);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${key} to ${val}`);
  } else {
    console.error(`Source not found: ${src}`);
  }
}

async function run() {
  console.log('Fetching categories...');
  const { data: cat } = await supabase.from('categories').select('*');

  const getSub = (slug) => {
    const found = cat.find(s => s.slug === slug);
    return found ? found.id : null;
  };
  const getCat = (slug) => {
    const found = cat.find(c => c.slug === slug && c.parent_id === null);
    return found ? found.id : null;
  };

  const kisiselId = getCat('customizable-products');

  // Insert missing subcategories
  if (!getSub('tshirt')) {
    const { data: newSub } = await supabase.from('categories').insert({
      name: 'Baskılı Tişört',
      slug: 'tshirt',
      parent_id: kisiselId,
      sort_order: 10
    }).select().single();
    if (newSub) cat.push(newSub);
  }

  if (!getSub('tas-foto')) {
    const { data: newSub } = await supabase.from('categories').insert({
      name: 'Taş Fotoğraf',
      slug: 'tas-foto',
      parent_id: kisiselId,
      sort_order: 11
    }).select().single();
    if (newSub) cat.push(newSub);
  }

  console.log('Categories set up securely.');

  const productsToInsert = [
    // --- KODAK 35mm
    {
      name: 'Kodak ColorPlus 200 (35mm)',
      description: 'Günlük çekimleriniz için sıcak ve doğal tonlar sunan, ince grenli 35mm renkli negatif film. Vintage bir dokunuş.',
      price: 550,
      stock: 50,
      image_url: '/images/products/kodak_35.png',
      images: ['/images/products/kodak_35.png'],
      category_id: getCat('photo-supplies'),
      subcategory_id: getSub('35mm-color'),
      is_customizable: false,
    },
    {
      name: 'Kodak Gold 200 (35mm)',
      description: 'Altın sarısı karakteristik Kodak renk paleti. Portre ve genel amaçlı gün ışığı çekimlerinde mükemmel sonuç.',
      price: 550,
      stock: 45,
      image_url: '/images/products/kodak_35.png',
      images: ['/images/products/kodak_35.png'],
      category_id: getCat('photo-supplies'),
      subcategory_id: getSub('35mm-color'),
      is_customizable: false,
    },
    {
      name: 'Kodak Ultramax 400 (35mm)',
      description: 'Düşük ışık performansı ile esnek kullanım. Canlı renkler ve kontrast.',
      price: 550,
      stock: 40,
      image_url: '/images/products/kodak_35.png',
      images: ['/images/products/kodak_35.png'],
      category_id: getCat('photo-supplies'),
      subcategory_id: getSub('35mm-color'),
      is_customizable: false,
    },
    {
      name: 'Kodak Portra 400 (35mm)',
      description: 'Efsanevi cilt tonu başarısı ve ultra ince gren. Profesyonel renkli negatif portre filmi.',
      price: 550,
      stock: 20,
      image_url: '/images/products/kodak_35.png',
      images: ['/images/products/kodak_35.png'],
      category_id: getCat('photo-supplies'),
      subcategory_id: getSub('35mm-color'),
      is_customizable: false,
    },

    // --- KODAK 120mm
    {
      name: 'Kodak Portra 400 (120 Orta Format)',
      description: 'Orta formatın büyüleyici keskinliği ve Portra karakteristik renkleri. Paket fiyatı.',
      price: 550,
      stock: 15,
      image_url: '/images/products/kodak_120.png',
      images: ['/images/products/kodak_120.png'],
      category_id: getCat('photo-supplies'),
      subcategory_id: getSub('120mm-color'),
      is_customizable: false,
    },
    {
      name: 'Kodak Portra 160 (120 Orta Format)',
      description: 'Stüdyo ve dış mekan için ince grenli, keskin sonuçlar veren orta format portre filmi.',
      price: 550,
      stock: 12,
      image_url: '/images/products/kodak_120.png',
      images: ['/images/products/kodak_120.png'],
      category_id: getCat('photo-supplies'),
      subcategory_id: getSub('120mm-color'),
      is_customizable: false,
    },

    // --- KODAK B&W
    {
      name: 'Kodak Tri-X 400 (35mm)',
      description: 'Fotoğraf tarihinin en ikonik siyah beyaz filmi. Yüksek kontrast ve muazzam gren yapısı.',
      price: 550,
      stock: 30,
      image_url: '/images/products/kodak_35.png',
      images: ['/images/products/kodak_35.png'],
      category_id: getCat('photo-supplies'),
      subcategory_id: getSub('35mm-bw'),
      is_customizable: false,
    },
    {
      name: 'Kodak T-Max 400 (35mm)',
      description: 'Modern t-grain teknolojisiyle ultra ince yapılı profesyonel siyah beyaz film.',
      price: 550,
      stock: 25,
      image_url: '/images/products/kodak_35.png',
      images: ['/images/products/kodak_35.png'],
      category_id: getCat('photo-supplies'),
      subcategory_id: getSub('35mm-bw'),
      is_customizable: false,
    },

    // --- FUJIFILM 35mm & 120mm
    {
      name: 'Fujicolor C200 (35mm)',
      description: 'Klasik Fuji yeşil/mavi karakteristiğine sahip efsanevi giriş seviyesi film.',
      price: 550,
      stock: 25,
      image_url: '/images/products/fuji_35.png',
      images: ['/images/products/fuji_35.png'],
      category_id: getCat('photo-supplies'),
      subcategory_id: getSub('35mm-color'),
      is_customizable: false,
    },
    {
      name: 'Fujicolor Superia X-TRA 400 (35mm)',
      description: '4' + 'üncü renk katmanı teknolojisi ile harika sokak renkleri.',
      price: 550,
      stock: 35,
      image_url: '/images/products/fuji_35.png',
      images: ['/images/products/fuji_35.png'],
      category_id: getCat('photo-supplies'),
      subcategory_id: getSub('35mm-color'),
      is_customizable: false,
    },
    {
      name: 'Fujifilm Provia 100F (35mm Saydam)',
      description: 'Gerçekçi renk doğrulukları ve ince greni ile dia (pozitif) film klasiği.',
      price: 550,
      stock: 10,
      image_url: '/images/products/fuji_35.png',
      images: ['/images/products/fuji_35.png'],
      category_id: getCat('photo-supplies'),
      subcategory_id: getSub('35mm-color'),
      is_customizable: false,
    },
    {
      name: 'Fujifilm Velvia 50 (120 Orta Format)',
      description: 'Doğa ve peyzaj fotoğrafçılığı için aşırı doygun ve canlı renkler içeren saydam efsane.',
      price: 550,
      stock: 10,
      image_url: '/images/products/fuji_35.png',
      images: ['/images/products/fuji_35.png'],
      category_id: getCat('photo-supplies'),
      subcategory_id: getSub('120mm-color'),
      is_customizable: false,
    },

    // --- ILFORD 35mm
    {
      name: 'Ilford HP5 Plus 400 (35mm)',
      description: 'Olağanüstü gren yapısına sahip kusursuz esnekliğiyle İngiliz siyah beyaz klasiği.',
      price: 550,
      stock: 80,
      image_url: '/images/products/ilford_35.png',
      images: ['/images/products/ilford_35.png'],
      category_id: getCat('photo-supplies'),
      subcategory_id: getSub('35mm-bw'),
      is_customizable: false,
    },
    {
      name: 'Ilford FP4 Plus 125 (35mm)',
      description: 'Geniş tonal geçişlere sahip, ultra ince grenli orta hızlı efsane siyah beyaz film.',
      price: 550,
      stock: 45,
      image_url: '/images/products/ilford_35.png',
      images: ['/images/products/ilford_35.png'],
      category_id: getCat('photo-supplies'),
      subcategory_id: getSub('35mm-bw'),
      is_customizable: false,
    },
    {
      name: 'Ilford Delta 3200 (35mm)',
      description: 'Zorlu ışık koşullarında anı yakalamanızı sağlayan agresif kontrastlı film.',
      price: 550,
      stock: 30,
      image_url: '/images/products/ilford_35.png',
      images: ['/images/products/ilford_35.png'],
      category_id: getCat('photo-supplies'),
      subcategory_id: getSub('35mm-bw'),
      is_customizable: false,
    },
    {
      name: 'Ilford HP5 Plus 400 (120 Orta Format)',
      description: 'Dünyanın en popüler b&w emülsiyonunun muhteşem 120 format uyarlaması.',
      price: 550,
      stock: 35,
      image_url: '/images/products/ilford_35.png',
      images: ['/images/products/ilford_35.png'],
      category_id: getCat('photo-supplies'),
      subcategory_id: getSub('120mm-bw'),
      is_customizable: false,
    },

    // --- CUSTOMIZABLE PRODUCTS
    {
      name: 'Kişiye Özel Kupa Bardak',
      description: 'En sevdiğiniz anıyı sabah kahvenize taşıyın. Kaliteli seramik baskı malzemesi uzun yıllar silinmez renklere sahiptir.',
      price: 170,
      stock: 1000,
      image_url: '/images/products/custom_mug.png',
      images: ['/images/products/custom_mug.png'],
      category_id: kisiselId,
      subcategory_id: getSub('mug'),
      is_customizable: true,
    },
    {
      name: 'Fotoğraf Baskılı Puzzle',
      description: 'Parçaları birleştirdikçe anılarınızı yeniden yaşayın. Özel ahşap destekli yüksek çözünürlüklü parlak baskı.',
      price: 200,
      stock: 1000,
      image_url: '/images/products/custom_puzzle.png',
      images: ['/images/products/custom_puzzle.png'],
      category_id: kisiselId,
      subcategory_id: getSub('puzzle'),
      is_customizable: true,
    },
    {
      name: 'Özel Fotoğraf Baskılı Tişört',
      description: 'Kendi fotoğrafınızla veya tasarımınızla, %100 pamuklu kumaşa kaliteden ödün vermeden bastırdığımız tişörtler.',
      price: 400,
      stock: 1000,
      image_url: '/images/products/custom_tshirt.png',
      images: ['/images/products/custom_tshirt.png'],
      category_id: kisiselId,
      subcategory_id: getSub('tshirt'),
      is_customizable: true,
    },
    {
      name: 'Dekoratif Doğal Taş Fotoğraf',
      description: 'Vitrinlerinize, masaüstünüze otantik bir dokunuş. Yüksek parlaklıklı doğal kayrak taşı üzerine UV baskı tekniği.',
      price: 500,
      stock: 1000,
      image_url: '/images/products/custom_rock.png',
      images: ['/images/products/custom_rock.png'],
      category_id: kisiselId,
      subcategory_id: getSub('tas-foto'),
      is_customizable: true,
    },
  ];

  console.log(`Inserting ${productsToInsert.length} products...`);
  const { data, error } = await supabase.from('products').insert(productsToInsert);
  
  if (error) {
    console.error('Error inserting products:', error);
  } else {
    console.log('Successfully inserted all products!');
  }
}

run();
