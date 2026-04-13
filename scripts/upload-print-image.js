const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  'https://sfowiigzqllhgwkqbvpo.supabase.co',
  'sb_secret_hiMJK89tRWsMjF7ftezD2Q_QbBuCmCX'
);

async function main() {
  const uploads = [
    {
      name: 'Fotoğraf Baskı',
      path: 'C:\\Users\\ataha\\.gemini\\antigravity\\brain\\086c6445-beb4-4bd1-acb7-282fb06f4f7e\\photo_print_product_1776071211098.png',
      prefix: 'foto_baski'
    },
    {
      name: 'Kanvas Tablo',
      path: 'C:\\Users\\ataha\\.gemini\\antigravity\\brain\\086c6445-beb4-4bd1-acb7-282fb06f4f7e\\canvas_print_product_1776071331385.png',
      prefix: 'kanvas_tablo'
    }
  ];

  for (const item of uploads) {
    if (!fs.existsSync(item.path)) {
      console.log(`File not found: ${item.path}`);
      continue;
    }
    
    // Yükleme formatı upload-cameras.js ile uyumlu olsun (product-images/timestamp)
    const fileName = `product-images/${item.prefix}_${Date.now()}.png`;
    const fileBuffer = fs.readFileSync(item.path);
    
    console.log(`Uploading ${item.name} image...`);
    const { data: uploadData, error: uploadErr } = await supabase.storage
      .from('products')  // Sepette images ararken ürün resimleri products bucket'ında 
      .upload(fileName, fileBuffer, {
        contentType: 'image/png',
        upsert: false
      });
      
    if (uploadErr) {
      console.error(`Upload error for ${item.name}: ${uploadErr.message}`);
      continue;
    }
    
    const { data: publicUrlData } = supabase.storage
      .from('products')
      .getPublicUrl(fileName);
      
    const publicUrl = publicUrlData.publicUrl;
    console.log(`Uploaded image URL for ${item.name}: ${publicUrl}`);
    
    console.log(`Updating database for ${item.name}...`);
    const { data, error } = await supabase
      .from('products')
      .update({ 
        image_url: publicUrl,
        images: [publicUrl]
      })
      .eq('name', item.name)
      .select();
      
    if (error) {
      console.error(`Update DB error for ${item.name}:`, error);
    } else {
      console.log(`✅ Successfully updated ${item.name} with image.`);
    }
  }
}

main().catch(console.error);
