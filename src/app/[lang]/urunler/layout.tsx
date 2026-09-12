import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { slugify } from '@/lib/utils';

const BASE_URL = 'https://farukfotografcilik.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = (lang === 'en' ? 'en' : 'tr') as Locale;
  const isEn = locale === 'en';

  return {
    title: isEn
      ? 'Products — Analog Film, Camera Equipment & Souvenir Items'
      : 'Ürünler — Analog Film, Kamera Ekipmanları & Hatıra Ürünleri',
    description: isEn
      ? 'Faruk Photography store: Kodak, Fujifilm, Ilford analog films, disposable cameras, custom mugs, magnets, puzzles and Istanbul souvenir products. Order online and pick up in store.'
      : 'Faruk Fotoğrafçılık ürün mağazası: Kodak, Fujifilm, Ilford analog filmler, tek kullanımlık fotoğraf makineleri, kişiye özel kupa, magnet, puzzle ve İstanbul hatıra ürünleri. Online sipariş ve mağazadan teslim.',
    keywords: isEn
      ? [
          'buy analog film',
          'kodak film istanbul',
          'fujifilm for sale',
          'disposable camera',
          'istanbul souvenir products',
          'custom mug',
          'camera equipment',
          'magnet istanbul',
        ]
      : [
          'analog film satın al',
          'kodak film istanbul',
          'fujifilm satış',
          'tek kullanımlık fotoğraf makinesi',
          'istanbul hatıra ürünleri',
          'kişiye özel kupa',
          'fotoğraf malzemeleri',
          'magnet istanbul',
        ],
    openGraph: {
      title: isEn
        ? 'Products — Faruk Photography Store'
        : 'Ürünler — Faruk Fotoğrafçılık Mağazası',
      description: isEn
        ? 'Analog films, camera equipment and customizable souvenir products. Order online.'
        : 'Analog filmler, kamera ekipmanları ve kişiselleştirilebilir hatıra ürünleri. Online sipariş verin.',
      type: 'website',
      locale: isEn ? 'en_US' : 'tr_TR',
    },
    alternates: {
      canonical: isEn ? '/en/products' : '/tr/urunler',
      languages: {
        'tr': `${BASE_URL}/tr/urunler`,
        'en': `${BASE_URL}/en/products`,
        'x-default': `${BASE_URL}/tr/urunler`,
      },
    },
  };
}

export default async function UrunlerLayout({ children }: { children: React.ReactNode }) {
  // Fetch products server-side for ItemList Schema
  let itemListJsonLd = null;
  try {
    const supabase = createServerSupabaseClient();
    const { data: products } = await supabase
      .from('products')
      .select('id, name, price, image_url, images, description, stock')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .limit(50);

    if (products && products.length > 0) {
      itemListJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Faruk Fotoğrafçılık Ürün Kataloğu',
        url: `${BASE_URL}/tr/urunler`,
        numberOfItems: products.length,
        itemListElement: products.map((p, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: p.name,
            // Must match the canonical slug-plus-id form the detail page emits,
            // otherwise the schema advertises a second URL for the same product.
            url: `${BASE_URL}/tr/urunler/${slugify(p.name)}-${p.id}`,
            image: (p.images && p.images.length > 0) ? p.images[0] : (p.image_url || `${BASE_URL}/logo.png`),
            description: p.description ? p.description.slice(0, 160) : `${p.name} — Faruk Fotoğrafçılık`,
          },
        })),
      };
    }
  } catch (err) {
    console.error('Error fetching products for ItemList schema:', err);
  }

  return (
    <>
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}
      {children}
    </>
  );
}
