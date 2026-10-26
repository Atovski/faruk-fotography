-- Film Galerisi: tek link içinde çoklu film (klasör) desteği
--
-- Müşteri bir seferde 3-4 film gönderdiğinde hepsi aynı galeride, ama ayrı
-- klasörler halinde görünmeli. Bugüne kadar bir galeri = düz bir fotoğraf
-- listesiydi ve film türü galerinin tamamı için tek bir metin alanıydı.
--
-- gallery_photos.gallery_id KALDIRILMADI: her fotoğraf hem galeriye hem
-- filmine bağlı. Böylece "tümünü indir" ve galeri silme mantığı değişmeden
-- çalışmaya devam ediyor, roll_id NULL olan eski fotoğraflar da kaybolmuyor.

CREATE TABLE IF NOT EXISTS public.gallery_rolls (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  gallery_id uuid NOT NULL REFERENCES public.film_galleries(id) ON DELETE CASCADE,
  name text NOT NULL,
  film_type text,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_gallery_rolls_gallery
  ON public.gallery_rolls (gallery_id, sort_order, created_at);

-- Fotoğraf hangi filme ait. NULL = bu özellikten önce yüklenmiş fotoğraflar;
-- arayüzde "Gruplandırılmamış" başlığı altında görünürler.
ALTER TABLE public.gallery_photos
  ADD COLUMN IF NOT EXISTS roll_id uuid REFERENCES public.gallery_rolls(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_gallery_photos_roll
  ON public.gallery_photos (roll_id);

-- Diğer iki galeri tablosuyla aynı kural: anon anahtar hiçbir şey göremez,
-- sunucu service_role ile bağlanıp RLS'i baypas ediyor.
ALTER TABLE public.gallery_rolls ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Deny All Anon" ON public.gallery_rolls;
CREATE POLICY "Deny All Anon" ON public.gallery_rolls FOR ALL TO anon USING (false);
