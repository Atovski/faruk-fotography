-- Film Galerisi: Güvenli Erişim Token'ı Ekleme
-- Bu migration, her galeriye benzersiz ve kırılamaz bir access_token ekler.
-- Token, müşteriye doğrudan galeri bağlantısı göndermek için kullanılır.

ALTER TABLE public.film_galleries
  ADD COLUMN IF NOT EXISTS access_token uuid DEFAULT gen_random_uuid() NOT NULL;

-- Mevcut kayıtlar için unique token üret (eğer varsa)
UPDATE public.film_galleries
SET access_token = gen_random_uuid()
WHERE access_token IS NULL;

-- Unique index ekle (aynı token iki galeriye atanmasın)
CREATE UNIQUE INDEX IF NOT EXISTS idx_film_galleries_access_token
  ON public.film_galleries (access_token);
