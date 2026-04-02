-- ====================================
-- Faruk Photography - Products System
-- ====================================

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT DEFAULT '',
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table (Görseller için images TEXT[] eklendi)
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  image_url TEXT DEFAULT '', -- Geriye dönük uyumluluk veya ana görsel için tutuabiliriz
  images TEXT[] DEFAULT '{}', -- Birden fazla görsel için dizi
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  subcategory_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_customizable BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- (Bucket yetkilerini yukarıdaki script ile çözdük)

-- Seed main categories
INSERT INTO categories (name, slug, image_url, sort_order) VALUES
  ('Fotoğraf Malzemeleri', 'photo-supplies', '', 1),
  ('Çek At Fotoğraf Makineleri', 'disposable-cameras', '', 2),
  ('Kişiselleştirilebilir Ürünler', 'customizable-products', '', 3)
ON CONFLICT (slug) DO NOTHING;

-- Seed subcategories (linked to parents)
DO $$
DECLARE
  photo_id UUID;
  custom_id UUID;
BEGIN
  SELECT id INTO photo_id FROM categories WHERE slug = 'photo-supplies';
  SELECT id INTO custom_id FROM categories WHERE slug = 'customizable-products';

  INSERT INTO categories (name, slug, parent_id, sort_order) VALUES
    ('35mm Renkli Film', '35mm-color', photo_id, 1),
    ('35mm Siyah-Beyaz Film', '35mm-bw', photo_id, 2),
    ('120mm Renkli Film', '120mm-color', photo_id, 3),
    ('120mm Siyah-Beyaz Film', '120mm-bw', photo_id, 4),
    ('Tek Kullanımlık Kamera', 'disposable', NULL, 5),
    ('Kupa', 'mug', custom_id, 6),
    ('Magnet', 'magnet', custom_id, 7),
    ('Puzzle', 'puzzle', custom_id, 8),
    ('Anahtarlık', 'keychain', custom_id, 9)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- RLS policies for products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Service role manage products" ON products FOR ALL USING (true);
CREATE POLICY "Service role manage categories" ON categories FOR ALL USING (true);
