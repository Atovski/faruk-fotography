import { MetadataRoute } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { baskiGroup } from '@/content/landing/baski';
import { ikametGroup } from '@/content/landing/ikamet';
import { vesikalikGroup } from '@/content/landing/vesikalik';
import { vizeGroup } from '@/content/landing/vize';

/**
 * sitemap.ts is a Route Handler that Next.js caches at build time by default,
 * so the product list was frozen at whatever was in Supabase on the last deploy.
 * Products removed since then kept being advertised to Google and returned 404.
 * Regenerate hourly instead.
 */
export const revalidate = 3600;

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
    { tr: '/ikinci-el', en: '/used-cameras', priority: 0.4, changeFreq: 'monthly' as const },
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

  // Service landing pages, including the ar/ru/fa residence permit pages
  const landingPages: MetadataRoute.Sitemap = [vesikalikGroup, ikametGroup, vizeGroup, baskiGroup].flatMap((group) => {
    const entries = Object.values(group).filter((e) => e !== undefined);
    const languages: Record<string, string> = Object.fromEntries(
      Object.entries(group).map(([locale, e]) => [locale, `${baseUrl}${e!.path}`])
    );
    languages['x-default'] = `${baseUrl}${(group.tr ?? group.en)!.path}`;
    return entries.map((e) => ({
      url: `${baseUrl}${e.path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: e.content.locale === 'tr' ? 0.95 : 0.9,
      alternates: { languages },
    }));
  });

  // Dynamic product pages from Supabase (both languages)
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const { slugify } = await import('@/lib/utils');
    const supabase = createServerSupabaseClient();
    const { data: products } = await supabase
      .from('products')
      .select('id, name, created_at')
      .eq('is_active', true);

    if (products) {
      productPages = products.flatMap((product) => {
        const slug = `${slugify(product.name)}-${product.id}`;
        return [
          {
            url: `${baseUrl}/tr/urunler/${slug}`,
            lastModified: new Date(product.created_at),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
            alternates: {
              languages: {
                tr: `${baseUrl}/tr/urunler/${slug}`,
                en: `${baseUrl}/en/products/${slug}`,
                'x-default': `${baseUrl}/tr/urunler/${slug}`,
              },
            },
          },
          {
            url: `${baseUrl}/en/products/${slug}`,
            lastModified: new Date(product.created_at),
            changeFrequency: 'weekly' as const,
            priority: 0.75,
            alternates: {
              languages: {
                tr: `${baseUrl}/tr/urunler/${slug}`,
                en: `${baseUrl}/en/products/${slug}`,
                'x-default': `${baseUrl}/tr/urunler/${slug}`,
              },
            },
          },
        ];
      });
    }
  } catch (err) {
    console.error('Error fetching products for sitemap:', err);
  }

  return [...staticPages, ...landingPages, ...productPages];
}
