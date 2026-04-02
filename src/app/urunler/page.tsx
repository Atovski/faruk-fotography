'use client';

import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { supabase } from '@/lib/supabase';
import { theme } from '@/styles/theme';
import { fadeInUp, fadeIn } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { FaWhatsapp } from 'react-icons/fa';
import { HiShoppingCart } from 'react-icons/hi';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import { Product, ProductSubCategory, ProductMainCategory } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

/* ───── Layout ───── */
const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg} ${theme.spacing['4xl']};
`;

/* ───── Category Visual Cards (Kamerastore style) ───── */
const CategoryCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};
  animation: ${fadeIn} 0.4s ease;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const CategoryCard = styled.button<{ $active: boolean; $img: string }>`
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  cursor: pointer;
  border: 3px solid ${({ $active }) => ($active ? theme.colors.secondary : 'transparent')};
  background: url(${({ $img }) => $img}) center/cover no-repeat;
  transition: all ${theme.transitions.normal};
  box-shadow: ${({ $active }) => ($active ? theme.shadows.glow : '0 2px 12px rgba(0,0,0,0.08)')};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 60%);
    transition: background ${theme.transitions.normal};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    &::after { background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%); }
  }
`;

const CategoryCardLabel = styled.span`
  position: absolute;
  bottom: 16px;
  left: 20px;
  right: 20px;
  z-index: 2;
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  color: #fff;
  text-align: left;
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0,0,0,0.3);
`;

const CategoryCardCount = styled.span`
  position: absolute;
  top: 14px;
  right: 16px;
  z-index: 2;
  background: rgba(255,255,255,0.9);
  color: ${theme.colors.text};
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: ${theme.borderRadius.full};
`;

/* ───── Sub-category Filter Bar (kept simple) ───── */
const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: ${theme.spacing['2xl']};
  animation: ${fadeIn} 0.3s ease;
`;

const FilterBtn = styled.button<{ $active: boolean; $isMain?: boolean }>`
  padding: 6px 16px;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  white-space: nowrap;

  ${({ $active, $isMain }) => $active
    ? css`
        background: ${$isMain ? theme.colors.secondary : theme.colors.secondary + '20'};
        color: ${$isMain ? theme.colors.primaryDark : theme.colors.secondary};
        border: 1px solid ${theme.colors.secondary};
      `
    : css`
        background: transparent;
        color: ${theme.colors.textSecondary};
        border: 1px solid ${theme.colors.surfaceLight};
      `
  }

  &:hover {
    border-color: ${theme.colors.secondary};
    color: ${theme.colors.secondary};
  }
`;

/* ───── Section Heading (within product list) ───── */
const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 1px solid ${theme.colors.glassBorder};

  h3 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.xl};
    color: ${theme.colors.text};
  }

  span {
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.textMuted};
  }
`;

const FilmTypeBadge = styled.span<{ $type: 'color' | 'bw' }>`
  display: inline-block;
  padding: 3px 12px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  margin-bottom: 12px;
  
  ${({ $type }) => $type === 'color'
    ? css`
        background: linear-gradient(135deg, #FF6B6B20, #FFD93D20, #6BCB7720);
        color: #D35400; /* Darker orange for better legibility on white */
        border: 1px solid #FFD93D40;
      `
    : css`
        background: rgba(160, 160, 160, 0.15);
        color: #7F8C8D; /* Darker gray for better legibility on white */
        border: 1px solid rgba(160, 160, 160, 0.3);
      `
  }
`;

/* ───── Product Grid & Cards ───── */
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const ProductCard = styled.div`
  background: ${theme.colors.glassBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  transition: all ${theme.transitions.normal};
  transition: all ${theme.transitions.normal};
  animation: ${fadeInUp} 0.4s ease forwards;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    border-color: ${theme.colors.secondary};
    box-shadow: ${theme.shadows.glow};
  }
`;

const ProductImage = styled.div<{ $img?: string }>`
  height: 160px;
  background: ${({ $img }) => $img ? `url(${$img}) center/cover no-repeat` : `${theme.colors.gradientCard}`};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, ${theme.colors.secondary}08 0%, transparent 70%);
  }
`;

const ProductEmoji = styled.span`
  font-size: 48px;
  z-index: 1;
`;

const CustomBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px 10px;
  border-radius: ${theme.borderRadius.full};
  font-size: 11px;
  font-weight: 600;
  background: ${theme.colors.secondary};
  color: ${theme.colors.primaryDark};
  z-index: 2;
`;

const ProductInfo = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.lg} ${theme.spacing.lg};
`;

const ProductName = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.text};
  margin-bottom: 4px;
`;

const ProductDesc = styled.p`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textSecondary};
  line-height: 1.5;
  margin-bottom: ${theme.spacing.sm};
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
`;

const Price = styled.span`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.secondary};
  font-weight: 700;
`;


/* ───── Data & Component ───── */
interface ProductExt extends Product {
  mainCategory: ProductMainCategory;
  images?: string[];
  stock: number;
}

const categoryEmojis: Record<string, string> = {
  '35mm-color': '🎞️', '35mm-bw': '⬛', '120mm-color': '🎞️', '120mm-bw': '⬛',
  'disposable': '📷', 'mug': '☕', 'magnet': '🧲', 'puzzle': '🧩', 'keychain': '🔑',
};

type FilterKey = 'all' | ProductMainCategory;

/* ───── Component ───── */
export default function ProductsPage() {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [activeSub, setActiveSub] = useState<string>('all');
  const [allProducts, setAllProducts] = useState<ProductExt[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, category:category_id(slug), subcategory:subcategory_id(slug)')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (data && !error) {
          const mapped = data.map((p: any) => ({
            id: p.id,
            name_tr: p.name,
            name_en: p.name,
            description_tr: p.description,
            description_en: p.description,
            price: p.price,
            category: p.subcategory?.slug || p.category?.slug,
            mainCategory: p.category?.slug,
            image_url: p.image_url,
            images: p.images || [],
            stock: p.stock,
            is_active: p.is_active,
            sort_order: p.sort_order,
            is_customizable: p.is_customizable,
            created_at: p.created_at,
          })) as ProductExt[];
          setAllProducts(mapped);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleMainFilter = (key: FilterKey) => {
    setActiveFilter(key);
    setActiveSub('all');
  };

  const filtered = activeFilter === 'all'
    ? allProducts
    : allProducts.filter(p => {
        if (p.mainCategory !== activeFilter) return false;
        if (activeSub !== 'all') return p.category === activeSub;
        return true;
      });

  // Sub-category options for the active main category
  const subOptions: ProductSubCategory[] =
    activeFilter === 'photo-supplies' ? ['35mm-color', '35mm-bw', '120mm-color', '120mm-bw'] :
    activeFilter === 'disposable-cameras' ? [] :
    activeFilter === 'customizable-products' ? ['mug', 'magnet', 'puzzle', 'keychain'] :
    [];

  /* Group products by section for "all" view or photo-supplies */
  const shouldGroup = activeFilter === 'all' || (activeFilter === 'photo-supplies' && activeSub === 'all');

  const renderCard = (p: ProductExt, i: number) => (
    <ProductCard key={p.id} style={{ animationDelay: `${i * 0.04}s` }} onClick={() => router.push(`/urunler/${p.id}`)}>
      <ProductImage $img={(p.images && p.images.length > 0) ? p.images[0] : (p.image_url || undefined)}>
        {(!p.images?.length && !p.image_url) && <ProductEmoji>{categoryEmojis[p.category] || '📦'}</ProductEmoji>}
        {p.is_customizable && <CustomBadge>{t.products.customProduct}</CustomBadge>}
      </ProductImage>
      <ProductInfo>
        <ProductName>{language === 'tr' ? p.name_tr : p.name_en}</ProductName>
        <ProductDesc>{language === 'tr' ? p.description_tr : p.description_en}</ProductDesc>
        <PriceRow>
          <Price>₺{formatPrice(p.price)}</Price>
          {p.is_customizable ? (
            <Button 
              as="a" 
              href={getWhatsAppUrl(`Merhaba, ${p.name_tr} sipariş etmek istiyorum.`)} 
              target="_blank" 
              $variant="whatsapp" 
              $size="sm"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <FaWhatsapp /> {t.products.orderWhatsApp || 'Sipariş Ver'}
            </Button>
          ) : (
            <Button 
              $variant="primary" 
              $size="sm" 
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                if (p.stock > 0) {
                  addToCart({
                    id: p.id,
                    name_en: p.name_en,
                    name_tr: p.name_tr,
                    price: p.price,
                    image_url: p.image_url,
                    images: p.images,
                    stock: p.stock
                  }, 1);
                  toast.success(`${language === 'tr' ? p.name_tr : p.name_en} sepete eklendi!`);
                } else {
                  toast.error('Bu ürün şu an stokta yok!');
                }
              }}
            >
              <HiShoppingCart /> {t.products.addToCart || 'Sepete Ekle'}
            </Button>
          )}
        </PriceRow>
      </ProductInfo>
    </ProductCard>
  );

  const renderGroupedAll = () => {
    const groups: { key: string; title: string; emoji: string; items: ProductExt[]; filmFormat?: boolean }[] = [];

    if (activeFilter === 'all' || activeFilter === 'photo-supplies') {
      // 35mm
      const c35color = filtered.filter(p => p.category === '35mm-color');
      const c35bw = filtered.filter(p => p.category === '35mm-bw');
      if (c35color.length > 0 || c35bw.length > 0) {
        groups.push({ key: '35mm', title: t.products.filmFormats['35mm'], emoji: '🎞️', items: [...c35color, ...c35bw], filmFormat: true });
      }
      // 120mm
      const c120color = filtered.filter(p => p.category === '120mm-color');
      const c120bw = filtered.filter(p => p.category === '120mm-bw');
      if (c120color.length > 0 || c120bw.length > 0) {
        groups.push({ key: '120mm', title: t.products.filmFormats['120mm'], emoji: '🎞️', items: [...c120color, ...c120bw], filmFormat: true });
      }
    }

    if (activeFilter === 'all' || activeFilter === 'disposable-cameras') {
      const disposable = filtered.filter(p => p.category === 'disposable');
      if (disposable.length > 0) {
        groups.push({ key: 'disposable', title: t.products.mainCategories['disposable-cameras'].title, emoji: '📷', items: disposable });
      }
    }

    if (activeFilter === 'all' || activeFilter === 'customizable-products') {
      const custom = filtered.filter(p => p.mainCategory === 'customizable-products');
      if (custom.length > 0) {
        groups.push({ key: 'custom', title: t.products.mainCategories['customizable-products'].title, emoji: '🎁', items: custom });
      }
    }

    return groups.map(g => (
      <div key={g.key}>
        <SectionHeading>
          <h3>{g.emoji} {g.title}</h3>
          <span>{g.items.length} ürün</span>
        </SectionHeading>

        {g.filmFormat ? (
          <>
            {/* Renkli */}
            {g.items.filter(p => p.category.includes('color')).length > 0 && (
              <>
                <FilmTypeBadge $type="color">{t.products.filmTypes.color}</FilmTypeBadge>
                <ProductGrid>
                  {g.items.filter(p => p.category.includes('color')).map((p, i) => renderCard(p, i))}
                </ProductGrid>
              </>
            )}
            {/* S/B */}
            {g.items.filter(p => p.category.includes('bw')).length > 0 && (
              <>
                <FilmTypeBadge $type="bw">{t.products.filmTypes.bw}</FilmTypeBadge>
                <ProductGrid>
                  {g.items.filter(p => p.category.includes('bw')).map((p, i) => renderCard(p, i))}
                </ProductGrid>
              </>
            )}
          </>
        ) : (
          <ProductGrid>
            {g.items.map((p, i) => renderCard(p, i))}
          </ProductGrid>
        )}
      </div>
    ));
  };

  return (
    <PageWrapper>
      <Container>
        <SectionTitle badge={t.products.subtitle} title={t.products.title} as="h1" />

        {/* ── Visual Category Cards ── */}
        <CategoryCardsGrid>
          {([
            { key: 'photo-supplies' as FilterKey, img: '/images/cat-photo-supplies.png' },
            { key: 'disposable-cameras' as FilterKey, img: '/images/cat-disposable-cameras.png' },
            { key: 'customizable-products' as FilterKey, img: '/images/cat-custom-products.png' },
          ]).map(cat => {
            const catCount = allProducts.filter(p => p.mainCategory === cat.key).length;
            return (
              <CategoryCard
                key={cat.key}
                $active={activeFilter === cat.key}
                $img={cat.img}
                onClick={() => handleMainFilter(activeFilter === cat.key ? 'all' : cat.key)}
              >
                <CategoryCardCount>{catCount} ürün</CategoryCardCount>
                <CategoryCardLabel>
                  {t.products.mainCategories[cat.key as ProductMainCategory].title}
                </CategoryCardLabel>
              </CategoryCard>
            );
          })}
        </CategoryCardsGrid>

        {/* ── Sub-category filter (when a main category is selected) ── */}
        {subOptions.length > 0 && (
          <FilterBar>
            <FilterBtn $active={activeSub === 'all'} onClick={() => setActiveSub('all')}>Tümü</FilterBtn>
            {subOptions.map(sub => (
              <FilterBtn key={sub} $active={activeSub === sub} onClick={() => setActiveSub(sub)}>
                {categoryEmojis[sub]} {t.products.subCategories[sub]}
              </FilterBtn>
            ))}
          </FilterBar>
        )}

        {/* ── Products ── */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: theme.colors.textMuted }}>
            Ürünler yükleniyor...
          </div>
        ) : shouldGroup ? (
          renderGroupedAll()
        ) : (
          <ProductGrid>
            {filtered.map((p, i) => renderCard(p, i))}
          </ProductGrid>
        )}
      </Container>
    </PageWrapper>
  );
}
