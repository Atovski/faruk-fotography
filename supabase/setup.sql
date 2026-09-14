-- ═══════════════════════════════════════════════════════════════
-- Faruk Fotoğrafçılık — Yeni Supabase projesi için tam kurulum
-- Supabase panelinde: SQL Editor → New query → bu dosyanın tamamını
-- yapıştırıp "Run". Birden fazla kez çalıştırmak güvenlidir.
--
-- Eski dağınık dosyaların (supabase_schema.sql,
-- supabase-products-migration.sql, migration_*.sql) birleşimidir.
-- ═══════════════════════════════════════════════════════════════


-- ───────────────────────────────────────────────
-- 1. KATEGORİLER VE ÜRÜNLER
-- ───────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  image_url text DEFAULT '',
  parent_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text DEFAULT '',
  price numeric(10, 2) NOT NULL DEFAULT 0,
  image_url text DEFAULT '',
  images text[] DEFAULT '{}',
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  subcategory_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  stock integer DEFAULT 0,
  is_active boolean DEFAULT true,
  is_customizable boolean DEFAULT false,
  is_popular boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON public.categories (parent_id);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products (category_id);
CREATE INDEX IF NOT EXISTS idx_products_subcategory_id ON public.products (subcategory_id);


-- ───────────────────────────────────────────────
-- 2. FİLM GALERİLERİ
-- ───────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.film_galleries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number text NOT NULL,
  access_code varchar(6) NOT NULL,
  access_token uuid DEFAULT gen_random_uuid() NOT NULL UNIQUE,
  customer_name text,
  film_type text,
  status text DEFAULT 'ready',
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.gallery_photos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  gallery_id uuid REFERENCES public.film_galleries(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  storage_path text NOT NULL,
  public_url text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_film_galleries_phone_code ON public.film_galleries (phone_number, access_code);
CREATE INDEX IF NOT EXISTS idx_gallery_photos_gallery_id ON public.gallery_photos (gallery_id);


-- ───────────────────────────────────────────────
-- 3. SİPARİŞLER
-- ───────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number text NOT NULL,
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  city text NOT NULL,
  district text NOT NULL,
  address text NOT NULL,
  postal_code text,
  note text,
  subtotal integer NOT NULL,
  shipping_cost integer NOT NULL DEFAULT 0,
  grand_total integer NOT NULL,
  status text DEFAULT 'pending',
  tracking_number text,
  tracking_sent_at timestamptz,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- Not: order_number üzerinde UNIQUE yok. Sipariş API'si önce 'TEMP' ile
-- ekleyip sonra gerçek numarayı yazıyor; UNIQUE olsaydı aynı anda gelen iki
-- sipariş çakışıp hata verirdi.

CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  product_name text NOT NULL,
  price integer NOT NULL,
  quantity integer NOT NULL,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items (order_id);


-- ───────────────────────────────────────────────
-- 4. GÜVENLİK (RLS)
-- Sunucu tarafı service_role anahtarını kullanır ve RLS'e takılmaz.
-- Tarayıcıdaki anon anahtar yalnızca ürün ve kategorileri OKUYABİLİR.
-- Diğer tablolarda politika yok = anon erişimi tamamen kapalı.
-- ───────────────────────────────────────────────

ALTER TABLE public.categories     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.film_galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read categories" ON public.categories;
CREATE POLICY "Public read categories" ON public.categories
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read products" ON public.products;
CREATE POLICY "Public read products" ON public.products
  FOR SELECT TO anon, authenticated USING (true);


-- ───────────────────────────────────────────────
-- 5. STORAGE BUCKET'LARI
-- Public bucket'lardaki dosyalar getPublicUrl() linkiyle herkese açılır.
-- storage.objects üzerinde anon SELECT politikası bilerek YOK: olsaydı
-- anon anahtarla tüm müşteri galerilerindeki dosyalar listelenebilirdi.
-- ───────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('galleries', 'galleries', true, 52428800, ARRAY['image/*']),
  ('products',  'products',  true, 52428800, ARRAY['image/*'])
ON CONFLICT (id) DO UPDATE
  SET public = EXCLUDED.public,
      file_size_limit = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;


-- ───────────────────────────────────────────────
-- 6. TEMEL KATEGORİLER
-- (Tişört, taş foto, kameralar, baskı/kanvas gibi diğer alt kategorileri
-- scripts/ altındaki seed script'leri kendisi oluşturur.)
-- ───────────────────────────────────────────────

INSERT INTO public.categories (name, slug, image_url, sort_order) VALUES
  ('Fotoğraf Malzemeleri', 'photo-supplies', '', 1),
  ('Çek At Fotoğraf Makineleri', 'disposable-cameras', '', 2),
  ('Kişiselleştirilebilir Ürünler', 'customizable-products', '', 3)
ON CONFLICT (slug) DO NOTHING;

DO $$
DECLARE
  photo_id uuid;
  custom_id uuid;
BEGIN
  SELECT id INTO photo_id FROM public.categories WHERE slug = 'photo-supplies';
  SELECT id INTO custom_id FROM public.categories WHERE slug = 'customizable-products';

  INSERT INTO public.categories (name, slug, parent_id, sort_order) VALUES
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
