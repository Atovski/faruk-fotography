'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import styled, { css } from 'styled-components';
import { supabase } from '@/lib/supabase';
import { theme } from '@/styles/theme';
import { fadeInUp, fadeIn, fadeInLeft } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { FaWhatsapp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HiShoppingCart } from 'react-icons/hi';
import { formatPrice, getWhatsAppUrl, slugify } from '@/lib/utils';
import { Product, ProductSubCategory, ProductMainCategory } from '@/types';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

/* ───── DB Category type ───── */
interface DBCategory {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  image_url: string;
  sort_order: number;
}

/* ───── Layout ───── */
const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg} ${theme.spacing['4xl']};
`;

/* ───── Two-column layout ───── */
const ContentLayout = styled.div`
  display: flex;
  gap: ${theme.spacing.xl};
  align-items: flex-start;

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: block;
  }
`;

/* ───── Sidebar ───── */
const Sidebar = styled.aside`
  width: 250px;
  min-width: 250px;
  position: sticky;
  top: 120px;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  animation: ${fadeInLeft} 0.4s ease;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.glassBorder};
    border-radius: ${theme.borderRadius.full};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const SidebarSection = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.md};
  overflow: hidden;
`;

const SidebarHeader = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.sm};
  font-weight: 700;
  color: ${theme.colors.text};
  letter-spacing: 0.02em;
  text-transform: uppercase;
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.secondary};
  }

  &::after {
    content: '${({ $open }) => ($open ? '−' : '+')}';
    font-size: 18px;
    font-weight: 400;
    color: ${theme.colors.textMuted};
    line-height: 1;
  }
`;

const SidebarList = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? '600px' : '0')};
  overflow: hidden;
  transition: max-height 0.35s ease;
  padding: ${({ $open }) => ($open ? `0 0 8px 0` : '0')};
`;

const SidebarItem = styled.label<{ $active: boolean; $indent?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  ${({ $indent }) => $indent && 'padding-left: 32px;'}
  cursor: pointer;
  font-size: ${theme.fontSizes.sm};
  color: ${({ $active }) => $active ? theme.colors.secondary : theme.colors.textSecondary};
  font-weight: ${({ $active }) => $active ? '600' : '400'};
  transition: all ${theme.transitions.fast};
  user-select: none;

  &:hover {
    background: ${theme.colors.surfaceLight};
    color: ${theme.colors.secondary};
  }
`;

const SidebarCheckbox = styled.span<{ $checked: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 2px solid ${({ $checked }) => $checked ? theme.colors.secondary : theme.colors.textMuted};
  background: ${({ $checked }) => $checked ? theme.colors.secondary : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.fast};
  flex-shrink: 0;

  &::after {
    content: '${({ $checked }) => ($checked ? '✓' : '')}';
    font-size: 10px;
    color: #fff;
    font-weight: 700;
  }
`;

const SidebarCount = styled.span`
  margin-left: auto;
  font-size: 11px;
  color: ${theme.colors.textMuted};
  font-weight: 500;
  background: ${theme.colors.surfaceLight};
  padding: 1px 8px;
  border-radius: ${theme.borderRadius.full};
`;

const SidebarDivider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.glassBorder};
  margin: 4px 16px;
`;

const SidebarResetBtn = styled.button`
  width: 100%;
  padding: 10px 16px;
  background: none;
  border: none;
  border-top: 1px solid ${theme.colors.glassBorder};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textMuted};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  font-weight: 500;

  &:hover {
    color: ${theme.colors.error};
    background: rgba(231, 76, 60, 0.04);
  }
`;

/* ───── Main Content Area ───── */
const MainContent = styled.div`
  flex: 1;
  min-width: 0;
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
        color: #D35400;
        border: 1px solid #FFD93D40;
      `
    : css`
        background: rgba(160, 160, 160, 0.15);
        color: #7F8C8D;
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
  animation: ${fadeInUp} 0.4s ease forwards;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    border-color: ${theme.colors.secondary};
    box-shadow: ${theme.shadows.glow};
  }
`;

const ProductImage = styled.div<{ $hasImage?: boolean }>`
  height: 160px;
  background: ${({ $hasImage }) => $hasImage ? 'transparent' : `${theme.colors.gradientCard}`};
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

const MiniNavArrow = styled.button<{ $right?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.$right ? 'right: 8px;' : 'left: 8px;'}
  width: 24px; height: 24px;
  border-radius: 50%;
  background: rgba(0,0,0,0.4);
  color: white;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px;
  border: 1px solid rgba(255,255,255,0.4);
  cursor: pointer;
  z-index: 3;
  opacity: 0;
  transition: all 0.2s;

  ${ProductImage}:hover & {
    opacity: 1;
  }

  &:hover {
    background: rgba(0,0,0,0.8);
    transform: translateY(-50%) scale(1.1);
  }
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

/* Real anchor so crawlers can reach the product detail pages.
   The card's onClick alone is invisible to Googlebot. */
const ProductNameLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ProductDesc = styled.p`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textSecondary};
  line-height: 1.5;
  margin-bottom: ${theme.spacing.sm};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;

  a, button {
    flex-shrink: 0;
    white-space: nowrap;
    font-size: 12px;
    padding: 6px 12px;
  }
`;

const Price = styled.span`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.secondary};
  font-weight: 700;
`;

/* ───── Active filters indicator ───── */
const ActiveFiltersBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: ${theme.spacing.lg};
  padding: 10px 16px;
  background: ${theme.colors.secondary}08;
  border: 1px solid ${theme.colors.secondary}20;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  animation: ${fadeIn} 0.3s ease;
`;

const ActiveFilterTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  background: ${theme.colors.secondary}18;
  color: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
`;


/* ───── Data & Component ───── */
interface ProductExt extends Product {
  mainCategory: ProductMainCategory;
  images?: string[];
  stock: number;
}

const categoryEmojis: Record<string, string> = {
  'photo-supplies': '🎞️', 'disposable-cameras': '📷', 'customizable-products': '🎁',
  '35mm-color': '🎞️', '35mm-bw': '⬛', '120mm-color': '🎞️', '120mm-bw': '⬛',
  'disposable': '📷', 'mug': '☕', 'magnet': '🧲', 'puzzle': '🧩', 'keychain': '🔑',
};

type FilterKey = 'all' | 'popular-products' | ProductMainCategory;

/* ───── Mini Component for Interactive Card ───── */
function ProductCardItem({ p, index, language, t, categoryEmojis, router, addToCart }: any) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = (p.images && p.images.length > 0) ? p.images : (p.image_url ? [p.image_url] : []);

  const productSlug = `${slugify(language === 'en' && p.name_en ? p.name_en : p.name_tr)}-${p.id}`;
  const productHref = language === 'en'
    ? `/en/products/${productSlug}`
    : `/tr/urunler/${productSlug}`;

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  };
  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
  };

  return (
    <ProductCard style={{ animationDelay: `${index * 0.04}s` }} onClick={() => router.push(productHref)}>
      <ProductImage $hasImage={images.length > 0}>
        {images.length > 0 && images[imgIndex] && (
          <Image 
            src={images[imgIndex]} 
            alt={p.name_tr} 
            fill 
            sizes="(max-width: 768px) 100vw, 300px"
            style={{ objectFit: 'cover' }} 
            unoptimized={images[imgIndex].endsWith('.svg')}
          />
        )}
        {(!images.length) && <ProductEmoji>{categoryEmojis[p.category] || '📦'}</ProductEmoji>}
        {p.is_customizable && <CustomBadge>{t.products.customProduct}</CustomBadge>}
        
        {images.length > 1 && (
          <>
            <MiniNavArrow onClick={prevImg}><FaChevronLeft /></MiniNavArrow>
            <MiniNavArrow $right onClick={nextImg}><FaChevronRight /></MiniNavArrow>
          </>
        )}
      </ProductImage>
      <ProductInfo>
        <ProductName>
          <ProductNameLink href={productHref} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            {(language === 'en' && p.name_en) ? p.name_en : p.name_tr}
          </ProductNameLink>
        </ProductName>
        <ProductDesc>{(language === 'en' && p.description_en) ? p.description_en : p.description_tr}</ProductDesc>
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
}

/* ───── Component ───── */
function ProductsPageContent() {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Sync URL -> state on mount
  const urlKategori = searchParams.get('kategori');
  const urlAlt = searchParams.get('alt');

  const [activeFilter, setActiveFilter] = useState<FilterKey>(() =>
    (urlKategori as FilterKey) || 'all'
  );
  const [activeSub, setActiveSub] = useState<string>(() =>
    urlAlt || 'all'
  );
  const [allProducts, setAllProducts] = useState<ProductExt[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbCategories, setDbCategories] = useState<DBCategory[]>([]);
  const [sidebarSections, setSidebarSections] = useState<Record<string, boolean>>({ categories: true, subcategories: true });

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch products and categories in parallel
        const [productsRes, categoriesRes] = await Promise.all([
          supabase
            .from('products')
            .select('*, category:category_id(slug), subcategory:subcategory_id(slug)')
            .eq('is_active', true)
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: false }),
          supabase
            .from('categories')
            .select('*')
            .order('sort_order', { ascending: true }),
        ]);

        if (productsRes.data && !productsRes.error) {
          const mapped = productsRes.data.map((p: any) => ({
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

        if (categoriesRes.data && !categoriesRes.error) {
          setDbCategories(categoriesRes.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Derive main and sub categories from DB
  const mainCategories = dbCategories.filter(c => !c.parent_id);
  const getSubCategories = (parentId: string) =>
    dbCategories.filter(c => c.parent_id === parentId);

  // Push filter changes to URL
  const updateUrl = useCallback((main: FilterKey, sub: string) => {
    const params = new URLSearchParams();
    if (main !== 'all') params.set('kategori', main);
    if (sub !== 'all') params.set('alt', sub);
    const qs = params.toString();
    router.replace(`${pathname}${qs ? '?' + qs : ''}`, { scroll: false });
  }, [pathname, router]);

  const handleMainFilter = (key: FilterKey) => {
    setActiveFilter(key);
    setActiveSub('all');
    updateUrl(key, 'all');
  };

  const handleSidebarMainClick = (slug: string) => {
    const key = slug as FilterKey;
    if (activeFilter === key) {
      setActiveFilter('all');
      setActiveSub('all');
      updateUrl('all', 'all');
    } else {
      setActiveFilter(key);
      setActiveSub('all');
      updateUrl(key, 'all');
    }
  };

  const handleSidebarSubClick = (mainSlug: string, subSlug: string) => {
    if (activeFilter !== mainSlug) {
      setActiveFilter(mainSlug as FilterKey);
    }
    if (activeSub === subSlug) {
      setActiveSub('all');
      updateUrl(mainSlug as FilterKey, 'all');
    } else {
      setActiveSub(subSlug);
      updateUrl(mainSlug as FilterKey, subSlug);
    }
  };

  const filtered = activeFilter === 'all'
    ? allProducts
    : activeFilter === 'popular-products'
      ? allProducts.filter(p => (p as any).is_popular)
      : allProducts.filter(p => {
          if (p.mainCategory !== activeFilter) return false;
          if (activeSub !== 'all') return p.category === activeSub;
          return true;
        });

  // Sub-category options for the active main category (for the top filter bar)
  const activeMainCat = mainCategories.find(c => c.slug === activeFilter);
  const subOptions = activeMainCat ? getSubCategories(activeMainCat.id) : [];

  /* Group products by section for "all" view or photo-supplies */
  const shouldGroup = activeFilter === 'all' || (activeFilter === 'photo-supplies' && activeSub === 'all');

  const toggleSection = (key: string) => {
    setSidebarSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderCard = (p: ProductExt, i: number) => (
    <ProductCardItem 
      key={p.id} 
      p={p} 
      index={i} 
      language={language} 
      t={t} 
      categoryEmojis={categoryEmojis} 
      router={router} 
      addToCart={addToCart} 
    />
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

    // Dinamik kategori ekleme: Sabit olarak tanımlanmayan tüm yeni ana kategorileri gruba al
    mainCategories.forEach(mainCat => {
      // Eğer kategori daha önce özel olarak ele alındıysa atla
      if (['photo-supplies', 'disposable-cameras', 'customizable-products'].includes(mainCat.slug)) return;

      if (activeFilter === 'all' || activeFilter === mainCat.slug) {
        const items = filtered.filter(p => p.mainCategory === mainCat.slug);
        if (items.length > 0) {
          groups.push({ 
            key: mainCat.slug, 
            title: t.products.mainCategories[mainCat.slug as ProductMainCategory]?.title || mainCat.name, 
            emoji: '', 
            items 
          });
        }
      }
    });

    return groups.map(g => (
      <div key={g.key}>
        <SectionHeading>
          <h3>{g.title}</h3>
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

  /* ───── Sidebar renderer ───── */
  const renderSidebar = () => {
    const isCatOpen = sidebarSections.categories !== false;

    return (
      <Sidebar>
        {/* ── Kategoriler ── */}
        <SidebarSection>
          <SidebarHeader $open={isCatOpen} onClick={() => toggleSection('categories')}>
            {t.products.categoriesTitle || 'Kategoriler'}
          </SidebarHeader>
          <SidebarList $open={isCatOpen}>
            {/* Tümü */}
            <SidebarItem $active={activeFilter === 'all'} onClick={() => handleMainFilter('all')}>
              <SidebarCheckbox $checked={activeFilter === 'all'} />
              {t.products.allProducts || 'Tüm Ürünler'}
              <SidebarCount>{allProducts.length}</SidebarCount>
            </SidebarItem>
            <SidebarDivider />

            {mainCategories.map(main => {
              const mainCount = allProducts.filter(p => p.mainCategory === main.slug).length;
              const isMainActive = activeFilter === main.slug;
              const subs = getSubCategories(main.id);

              return (
                <div key={main.id}>
                  <SidebarItem $active={isMainActive} onClick={() => handleSidebarMainClick(main.slug)}>
                    <SidebarCheckbox $checked={isMainActive} />
                    {t.products.mainCategories[main.slug as ProductMainCategory]?.title || main.name}
                    <SidebarCount>{mainCount}</SidebarCount>
                  </SidebarItem>

                  {/* Show subcategories when main is active */}
                  {isMainActive && subs.length > 0 && subs.map(sub => {
                    const subCount = allProducts.filter(p => p.category === sub.slug).length;
                    const isSubActive = activeSub === sub.slug;

                    return (
                      <SidebarItem
                        key={sub.id}
                        $active={isSubActive}
                        $indent
                        onClick={() => handleSidebarSubClick(main.slug, sub.slug)}
                      >
                        <SidebarCheckbox $checked={isSubActive} />
                        {((t.products.subCategories as any)[sub.slug]) || sub.name}
                        <SidebarCount>{subCount}</SidebarCount>
                      </SidebarItem>
                    );
                  })}
                </div>
              );
            })}
          </SidebarList>

          {/* Reset button */}
          {(activeFilter !== 'all' || activeSub !== 'all') && (
            <SidebarResetBtn onClick={() => { setActiveFilter('all'); setActiveSub('all'); updateUrl('all', 'all'); }}>
              ✕ {t.products.clearFilters || 'Filtreleri Temizle'}
            </SidebarResetBtn>
          )}
        </SidebarSection>

        {/* ── Ürün Bilgisi ── */}
        <SidebarSection>
          <div style={{ padding: '14px 16px', fontSize: theme.fontSizes.xs, color: theme.colors.textMuted, lineHeight: 1.6 }}>
            <strong style={{ color: theme.colors.text }}>{filtered.length}</strong> {t.products.productsShowing || 'ürün gösteriliyor'}
            {activeFilter !== 'all' && (
              <>
                {' — '}
                <ActiveFilterTag>
                  {mainCategories.find(c => c.slug === activeFilter)?.name || activeFilter}
                </ActiveFilterTag>
              </>
            )}
          </div>
        </SidebarSection>
      </Sidebar>
    );
  };

  return (
    <PageWrapper>
      <Container>
        <SectionTitle badge={t.products.subtitle} title={t.products.title} as="h1" />

        {/* ── Visual Category Cards ── */}
        <CategoryCardsGrid style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {([
            { key: 'popular-products' as FilterKey, img: '/images/cat-popular.png', label: 'Popüler Ürünler' },
            { key: 'photo-supplies' as FilterKey, img: '/images/cat-photo-supplies.png', label: t.products.mainCategories['photo-supplies'].title },
            { key: 'customizable-products' as FilterKey, img: '/images/cat-custom-products.png', label: t.products.mainCategories['customizable-products'].title },
            { key: 'cameras' as FilterKey, img: '/images/cat-cameras.png', label: 'Kameralar' },
          ]).map(cat => {
            // "popular-products" gerçek bir DB categorisi olmadığı için özel logic gerektirir
            const isPopularCard = cat.key === 'popular-products';
            const catCount = isPopularCard 
               // Şimdilik popüler ürünleri mock gösteriyoruz, backend eklenince değişecek
               ? allProducts.filter(p => (p as any).is_popular).length
               : allProducts.filter(p => p.mainCategory === cat.key).length;
               
            return (
              <CategoryCard
                key={cat.key}
                $active={activeFilter === cat.key}
                $img={cat.img}
                onClick={() => handleMainFilter(activeFilter === cat.key ? 'all' : cat.key)}
              >
                <CategoryCardCount>{catCount} ürün</CategoryCardCount>
                <CategoryCardLabel>
                  {cat.label}
                </CategoryCardLabel>
              </CategoryCard>
            );
          })}
        </CategoryCardsGrid>

        {/* ── Sub-category filter (when a main category is selected) ── */}
        {subOptions.length > 0 && (
          <FilterBar>
            <FilterBtn $active={activeSub === 'all'} onClick={() => { setActiveSub('all'); updateUrl(activeFilter, 'all'); }}>Tümü</FilterBtn>
            {subOptions.map(sub => (
              <FilterBtn key={sub.id} $active={activeSub === sub.slug} onClick={() => { const next = activeSub === sub.slug ? 'all' : sub.slug; setActiveSub(next); updateUrl(activeFilter, next); }}>
                {sub.name}
              </FilterBtn>
            ))}
          </FilterBar>
        )}

        {/* ── Sidebar + Products ── */}
        <ContentLayout>
          {renderSidebar()}

          <MainContent>
            {/* Active filter indicator */}
            {(activeFilter !== 'all' || activeSub !== 'all') && (
              <ActiveFiltersBar>
                Filtre:
                {activeFilter !== 'all' && (
                  <ActiveFilterTag>
                    {t.products.mainCategories[activeFilter as ProductMainCategory]?.title || mainCategories.find(c => c.slug === activeFilter)?.name}
                  </ActiveFilterTag>
                )}
                {activeSub !== 'all' && (
                  <ActiveFilterTag>
                    {((t.products.subCategories as any)[activeSub]) || dbCategories.find(c => c.slug === activeSub)?.name}
                  </ActiveFilterTag>
                )}
                <button
                  style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.textMuted, fontSize: '12px' }}
                  onClick={() => { setActiveFilter('all'); setActiveSub('all'); updateUrl('all', 'all'); }}
                >
                  ✕ {t.products.clearFilters || 'Temizle'}
                </button>
              </ActiveFiltersBar>
            )}

            {/* ── Products ── */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px', color: theme.colors.textMuted }}>
                {t.products.loadingProducts || 'Ürünler yükleniyor...'}
              </div>
            ) : shouldGroup ? (
              renderGroupedAll()
            ) : (
              <ProductGrid>
                {filtered.map((p, i) => renderCard(p, i))}
              </ProductGrid>
            )}

            {/* ── International Warning ── */}
            <div style={{
              marginTop: '40px',
              padding: '16px 20px',
              background: language === 'tr' ? 'rgba(211,84,0,0.05)' : 'rgba(211,84,0,0.05)',
              border: `1px solid ${theme.colors.secondary}40`,
              borderRadius: theme.borderRadius.lg,
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '20px' }}>🌍</span>
              <p style={{ color: theme.colors.textSecondary, fontWeight: 500, margin: 0, fontSize: theme.fontSizes.sm }}>
                {t.products.internationalWarning}
              </p>
            </div>
          </MainContent>
        </ContentLayout>
      </Container>
    </PageWrapper>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsPageContent />
    </Suspense>
  );
}
