import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { slugify, extractIdFromSlug } from '@/lib/utils';
import ProductDetailClient from './ProductDetailClient';
import type { Locale } from '@/i18n/config';

const BASE_URL = 'https://farukfotografcilik.com';

interface ProductRow {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  images: string[];
  stock: number;
  is_customizable: boolean;
  is_active: boolean;
  category: { name: string; slug: string } | null;
}

/* ───── Fetch product helper (server-side) ───── */
async function getProduct(slugOrId: string): Promise<ProductRow | null> {
  const actualId = extractIdFromSlug(slugOrId);
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, category:category_id(name, slug)')
    .eq('id', actualId)
    .single();

  if (error || !data) return null;
  return data as ProductRow;
}

/* ───── Dynamic Metadata (SEO) ───── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; lang: string }>;
}): Promise<Metadata> {
  const { id, lang } = await params;
  const locale = (lang === 'en' ? 'en' : 'tr') as Locale;
  const isEn = locale === 'en';
  const product = await getProduct(id);

  if (!product) {
    return {
      title: isEn ? 'Product Not Found' : 'Ürün Bulunamadı',
    };
  }

  const title = isEn
    ? `Buy ${product.name}`
    : `${product.name} Satın Al`;

  const description = product.description
    ? product.description.slice(0, 160)
    : isEn
      ? `${product.name} — Buy from Faruk Photography online store at affordable prices. Shipping from or pickup in Sirkeci, Istanbul.`
      : `${product.name} — Faruk Fotoğrafçılık online mağazasından uygun fiyata satın alın. Sirkeci, İstanbul'dan kargo veya mağazadan teslim.`;

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : product.image_url || `${BASE_URL}/logo.png`;

  const currentSlug = `${slugify(product.name)}-${product.id}`;

  return {
    title,
    description,
    keywords: [
      product.name,
      isEn ? `buy ${product.name}` : `${product.name} satın al`,
      isEn ? `${product.name} price` : `${product.name} fiyat`,
      product.category?.name || '',
      isEn ? 'faruk photography' : 'faruk fotoğrafçılık',
      isEn ? 'analog film' : 'analog film',
      isEn ? 'istanbul camera equipment' : 'istanbul fotoğraf malzemeleri',
    ].filter(Boolean),
    openGraph: {
      title: `${product.name} | ${isEn ? 'Faruk Photography' : 'Faruk Fotoğrafçılık'}`,
      description,
      type: 'website',
      locale: isEn ? 'en_US' : 'tr_TR',
      url: `${BASE_URL}/${locale === 'en' ? 'en/products' : 'tr/urunler'}/${currentSlug}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      siteName: isEn ? 'Faruk Photography' : 'Faruk Fotoğrafçılık',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${isEn ? 'Faruk Photography' : 'Faruk Fotoğrafçılık'}`,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `/${locale === 'en' ? 'en/products' : 'tr/urunler'}/${currentSlug}`,
      languages: {
        'tr': `${BASE_URL}/tr/urunler/${currentSlug}`,
        'en': `${BASE_URL}/en/products/${currentSlug}`,
        'x-default': `${BASE_URL}/tr/urunler/${currentSlug}`,
      },
    },
  };
}

/* ───── JSON-LD Product Schema ───── */
function getProductJsonLd(product: ProductRow) {
  const allImages =
    product.images && product.images.length > 0
      ? product.images
      : product.image_url
        ? [product.image_url]
        : [`${BASE_URL}/logo.png`];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description:
      product.description ||
      `${product.name} — Faruk Fotoğrafçılık online mağazası`,
    image: allImages,
    url: `${BASE_URL}/tr/urunler/${slugify(product.name)}-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'Faruk Fotoğrafçılık',
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/tr/urunler/${slugify(product.name)}-${product.id}`,
      price: product.price.toFixed(2),
      priceCurrency: 'TRY',
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Faruk Fotoğrafçılık',
        url: BASE_URL,
      },
      itemCondition: 'https://schema.org/NewCondition',
      priceValidUntil: new Date(
        new Date().getFullYear(),
        11,
        31
      ).toISOString().split('T')[0],
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'TR',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'TRY'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'TR'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'd'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'd'
          }
        }
      }
    },
    category: product.category?.name || undefined,
    sku: product.id,
  };
}

/* ───── Page Component (Server) ───── */
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string; lang: string }>;
}) {
  const { id, lang } = await params;
  const product = await getProduct(id);

  if (!product || !product.is_active) {
    notFound();
  }

  const jsonLd = getProductJsonLd(product);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': lang === 'en' ? 'Home' : 'Anasayfa',
        'item': BASE_URL + (lang === 'en' ? '/en' : '/tr')
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': lang === 'en' ? 'Products' : 'Ürünler',
        'item': BASE_URL + (lang === 'en' ? '/en/products' : '/tr/urunler')
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': product.name,
        'item': BASE_URL + (lang === 'en' ? '/en/products/' : '/tr/urunler/') + `${slugify(product.name)}-${product.id}`
      }
    ]
  };

  return (
    <>
      {/* JSON-LD for Google Rich Results & Shopping */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Interactive Client Component */}
      <ProductDetailClient
        product={{
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image_url: product.image_url,
          images: product.images || [],
          stock: product.stock,
          is_customizable: product.is_customizable,
          category_name: product.category?.name || '',
        }}
      />
    </>
  );
}
