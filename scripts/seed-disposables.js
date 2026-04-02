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
  'disp_kodak_1775140378018.png': 'disp_kodak.png',
  'disp_instax_1775140395847.png': 'disp_instax.png',
  'disp_ilford_1775140412378.png': 'disp_ilford.png'
};

const artifactDir = 'C:\\Users\\ataha\\.gemini\\antigravity\\brain\\28b6b276-ab26-49fb-a7e1-f9fcd07680b3';
const destDir = path.join(__dirname, '..', 'public', 'images', 'products');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

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

  const getCat = (slug) => {
    const found = cat.find(c => c.slug === slug);
    return found ? found.id : null;
  };

  const disposableId = getCat('disposable-cameras'); // Çek At Fotoğraf Makineleri

  const productsToInsert = [
    {
      name: 'Kodak FunSaver (Çek At Kamera)',
      description: 'Önceden 39 poz Kodak Gold 800 film takılı, dahili flaşlı, parti ve seyahatler için ideal tek kullanımlık fotoğraf makinesi.',
      price: 850,
      stock: 50,
      image_url: '/images/products/disp_kodak.png',
      images: ['/images/products/disp_kodak.png'],
      category_id: disposableId,
      subcategory_id: null,
      is_customizable: false,
    },
    {
      name: 'Ilford HP5+ Single Use Camera',
      description: 'İçerisinde 27 pozluk yüksek kaliteli Ilford HP5+ siyah beyaz film bulunan, dahili flaşlı klasik çek at makine.',
      price: 900,
      stock: 30,
      image_url: '/images/products/disp_ilford.png',
      images: ['/images/products/disp_ilford.png'],
      category_id: disposableId,
      subcategory_id: null,
      is_customizable: false,
    },
    {
      name: 'Fujifilm Instax Mini 12',
      description: 'Anında canlı renklerde ve kredi kartı boyutunda baskı veren şipşak Instax fotoğraf makinesi.',
      price: 3250,
      stock: 15,
      image_url: '/images/products/disp_instax.png',
      images: ['/images/products/disp_instax.png'],
      category_id: disposableId,
      subcategory_id: null,
      is_customizable: false,
    }
  ];

  console.log(`Inserting ${productsToInsert.length} disposable cameras...`);
  const { data, error } = await supabase.from('products').insert(productsToInsert);
  
  if (error) {
    console.error('Error inserting products:', error);
  } else {
    console.log('Successfully inserted all disposable cameras!');
  }
}

run();
