-- 1. film_galleries TABLOSUNU OLUŞTURMA
CREATE TABLE IF NOT EXISTS public.film_galleries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number text NOT NULL,
  access_code varchar(6) NOT NULL,
  customer_name text,
  film_type text,
  status text DEFAULT 'ready',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. gallery_photos TABLOSUNU OLUŞTURMA
CREATE TABLE IF NOT EXISTS public.gallery_photos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  gallery_id uuid REFERENCES public.film_galleries(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  storage_path text NOT NULL,
  public_url text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. STORAGE BUCKET OLUŞTURMA
INSERT INTO storage.buckets (id, name, public) 
VALUES ('galleries', 'galleries', true)
ON CONFLICT (id) DO NOTHING;

-- 4. RLS (Row Level Security) AKTİFLEŞTİRME
ALTER TABLE public.film_galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

-- 5. STORAGE BUCKET POLİTİKALARI
-- (Herhangi biri fotoğrafları public URL ile okuyabilir ama SADECE yetkili servis yükleme silebilir)
CREATE POLICY "Public Access" 
  ON storage.objects FOR SELECT 
  USING ( bucket_id = 'galleries' );

CREATE POLICY "Service Role Upload" 
  ON storage.objects FOR INSERT 
  TO service_role
  WITH CHECK ( bucket_id = 'galleries' );

CREATE POLICY "Service Role Delete" 
  ON storage.objects FOR DELETE 
  TO service_role
  USING ( bucket_id = 'galleries' );

-- 6. TABLO POLİTİKALARI
-- Sunucu tarafımız Service_Role anahtarı kullanacağı için tüm RLS politikalarını baypas eder.
-- Sadece güvenlik için anon (public) key'in okuma/yazma yapmasını tam olarak iptal edelim. 
-- (Zaten API'miz üzerinden işlem yapacağız)

CREATE POLICY "Deny All Anon" ON public.film_galleries FOR ALL TO anon USING (false);
CREATE POLICY "Deny All Anon" ON public.gallery_photos FOR ALL TO anon USING (false);

-- ═══════════════════════════════════════════════════
-- SİPARİŞ SİSTEMİ TABLOLARI
-- ═══════════════════════════════════════════════════

-- 7. orders TABLOSU
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number text NOT NULL UNIQUE,
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
  tracking_sent_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. order_items TABLOSU
CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  product_name text NOT NULL,
  price integer NOT NULL,
  quantity integer NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Deny All Anon" ON public.orders FOR ALL TO anon USING (false);
CREATE POLICY "Deny All Anon" ON public.order_items FOR ALL TO anon USING (false);
