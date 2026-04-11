import { MetadataRoute } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://farukfotografcilik.com';
  const now = new Date();

  // Static pages with bilingual URLs
  const staticRoutes = [
    { tr: '', en: '', priority: 1.0, changeFreq: 'weekly' as const },
    { tr: '/hizmetler', en: '/services', priority: 0.9, changeFreq: 'monthly' as const },
    { tr: '/film-banyo', en: '/film-developing', priority: 0.95, changeFreq: 'weekly' as const },
    { tr: '/urunler', en: '/products', priority: 0.9, changeFreq: 'weekly' as const },
    { tr: '/galeri', en: '/gallery', priority: 0.7, changeFreq: 'weekly' as const },
    { tr: '/hakkimizda', en: '/about', priority: 0.6, changeFreq: 'monthly' as const },
    { tr: '/iletisim', en: '/contact', priority: 0.8, changeFreq: 'monthly' as const },
    { tr: '/ikinci-el', en: '/used-cameras', priority: 0.7, changeFreq: 'monthly' as const },
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.flatMap((route) => [
    {
      url: `${baseUrl}/tr${route.tr}`,
      lastModified: now,
      changeFrequency: route.changeFreq,
      priority: route.priority,
      alternates: {
        languages: {
          tr: `${baseUrl}/tr${route.tr}`,
          en: `${baseUrl}/en${route.en}`,
          'x-default': `${baseUrl}/tr${route.tr}`,
        },
      },
    },
    {
      url: `${baseUrl}/en${route.en}`,
      lastModified: now,
      changeFrequency: route.changeFreq,
      priority: route.priority - 0.05,
      alternates: {
        languages: {
          tr: `${baseUrl}/tr${route.tr}`,
          en: `${baseUrl}/en${route.en}`,
          'x-default': `${baseUrl}/tr${route.tr}`,
        },
      },
    },
  ]);

  // Dynamic product pages from Supabase (both languages)
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const supabase = createServerSupabaseClient();
    const { data: products } = await supabase
      .from('products')
      .select('id, created_at')
      .eq('is_active', true);

    if (products) {
      productPages = products.flatMap((product) => [
        {
          url: `${baseUrl}/tr/urunler/${product.id}`,
          lastModified: new Date(product.created_at),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
          alternates: {
            languages: {
              tr: `${baseUrl}/tr/urunler/${product.id}`,
              en: `${baseUrl}/en/products/${product.id}`,
              'x-default': `${baseUrl}/tr/urunler/${product.id}`,
            },
          },
        },
        {
          url: `${baseUrl}/en/products/${product.id}`,
          lastModified: new Date(product.created_at),
          changeFrequency: 'weekly' as const,
          priority: 0.75,
          alternates: {
            languages: {
              tr: `${baseUrl}/tr/urunler/${product.id}`,
              en: `${baseUrl}/en/products/${product.id}`,
              'x-default': `${baseUrl}/tr/urunler/${product.id}`,
            },
          },
        },
      ]);
    }
  } catch (err) {
    console.error('Error fetching products for sitemap:', err);
  }

  return [...staticPages, ...productPages];
}
