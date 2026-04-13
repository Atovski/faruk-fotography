-- 1. products tablosuna is_popular kolonunu ekle (varsayılan: false)
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_popular BOOLEAN DEFAULT false;

-- 2. İstenilen ürünlerin is_popular değerini true olarak güncelle
UPDATE products
SET is_popular = true
WHERE name IN (
  'Fotoğraf Baskı',
  'Kodak Gold 200 (35mm)',
  'Kodak ColorPlus 200 (35mm)',
  'Fujicolor C200 (35mm)',
  'Kanvas Tablo',
  'Kişiye Özel Kupa Bardak'
);
