'use client';

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedHref } from '@/i18n/config';
import { Button } from '@/components/ui/Button';
import SectionTitle from '@/components/ui/SectionTitle';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, getWhatsAppUrl, slugify } from '@/lib/utils';
import { HiChevronLeft, HiChevronRight, HiShoppingCart } from 'react-icons/hi';
import { useCart } from '@/hooks/useCart';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';

/**
 * This list used to be hardcoded: stale ₺550 prices, sold-out items, and
 * product ids from the Supabase project we migrated away from — so every card
 * linked to a 404. Read the real catalogue instead, same as /urunler does.
 */
interface BestSeller {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  stock: number;
}

/* ── Styled Components ── */
const Section = styled.section`
  padding: ${theme.spacing['3xl']} 0 ${theme.spacing['2xl']};
  position: relative;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

const SliderWrapper = styled.div`
  position: relative;
  animation: ${fadeInUp} 0.6s ease;
`;

const SliderTrack = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: ${theme.spacing.md} 0;

  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }
`;

const ProductCard = styled(Link)`
  flex: 0 0 260px;
  scroll-snap-align: start;
  background: ${theme.colors.glassBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  text-decoration: none;
  transition: all ${theme.transitions.normal};

  &:hover {
    border-color: ${theme.colors.secondary}60;
    transform: translateY(-6px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex: 0 0 220px;
  }
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: ${theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    object-fit: contain;
    transition: transform ${theme.transitions.normal};
  }

  ${ProductCard}:hover & img {
    transform: scale(1.08);
  }
`;

const CardBody = styled.div`
  padding: ${theme.spacing.md} ${theme.spacing.lg} ${theme.spacing.lg};
`;

const ProductName = styled.h4`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.text};
  margin-bottom: 2px;
  line-height: 1.3;
`;

const ProductSubtitle = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.textSecondary};
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${theme.spacing.md};
`;

const Price = styled.span`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  color: ${theme.colors.secondary};
`;

const CartIconBtn = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.secondary}15;
  color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all ${theme.transitions.fast};

  ${ProductCard}:hover & {
    background: ${theme.colors.secondary};
    color: ${theme.colors.primaryDark};
  }
`;

const NavButton = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $side }) => ($side === 'left' ? 'left: -16px;' : 'right: -16px;')}
  width: 42px;
  height: 42px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.primaryDark};
  border: 1px solid ${theme.colors.secondary}50;
  color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
  z-index: 2;
  transition: all ${theme.transitions.fast};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  &:hover {
    background: ${theme.colors.secondary};
    color: ${theme.colors.primaryDark};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const ViewAllRow = styled.div`
  text-align: center;
  margin-top: ${theme.spacing['2xl']};
  animation: ${fadeInUp} 0.6s ease 0.3s both;
`;

/* ── Component ── */
export default function BestSellers() {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const trackRef = useRef<HTMLDivElement>(null);
  const [bestSellerProducts, setBestSellerProducts] = useState<BestSeller[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, image_url, images, stock, category:category_id(name), subcategory:subcategory_id(name)')
        .eq('is_active', true)
        .eq('is_popular', true)
        .gt('stock', 0)
        .order('sort_order', { ascending: true })
        .limit(12);

      if (cancelled || error || !data) return;

      setBestSellerProducts(
        data.map((p: any) => ({
          id: p.id,
          name: p.name,
          subtitle: p.subcategory?.name || p.category?.name || '',
          price: p.price,
          image: (p.images && p.images.length > 0) ? p.images[0] : p.image_url,
          stock: p.stock,
        }))
      );
    }

    load();
    return () => { cancelled = true; };
  }, []);

  // Nothing to show until the catalogue loads; the section would just be an empty rail.
  if (bestSellerProducts.length === 0) return null;

  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    const amount = 280;
    trackRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <Section id="best-sellers">
      <Container>
        <SectionTitle
          badge={language === 'tr' ? 'Popüler Ürünler' : 'Popular Products'}
          title={language === 'tr' ? 'En Çok Satan Ürünler' : 'Best Sellers'}
        />

        <SliderWrapper>
          <NavButton $side="left" onClick={() => scroll('left')} aria-label="Önceki">
            <HiChevronLeft />
          </NavButton>

          <SliderTrack ref={trackRef}>
            {bestSellerProducts.map((p) => (
              <ProductCard key={p.id} href={getLocalizedHref(`/urunler/${slugify(p.name)}-${p.id}`, language)}>
                <ImageBox>
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="260px"
                      style={{ objectFit: 'contain', padding: '16px' }}
                    />
                  )}
                </ImageBox>
                <CardBody>
                  <ProductName>{p.name}</ProductName>
                  <ProductSubtitle>{p.subtitle}</ProductSubtitle>
                  <PriceRow>
                    <Price>₺{formatPrice(p.price)}</Price>
                    <CartIconBtn
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart({
                          id: p.id,
                          name_tr: p.name,
                          name_en: p.name,
                          price: p.price,
                          image_url: p.image,
                          images: p.image ? [p.image] : [],
                          stock: p.stock
                        }, 1);
                        toast.success(`${p.name} sepete eklendi!`);
                      }}
                    >
                      <HiShoppingCart />
                    </CartIconBtn>
                  </PriceRow>
                </CardBody>
              </ProductCard>
            ))}
          </SliderTrack>

          <NavButton $side="right" onClick={() => scroll('right')} aria-label="Sonraki">
            <HiChevronRight />
          </NavButton>
        </SliderWrapper>

        <ViewAllRow>
          <Button as={Link} href={getLocalizedHref('/urunler', language)} $variant="outline" $size="lg">
            {language === 'tr' ? 'Tüm Ürünleri Gör →' : 'View All Products →'}
          </Button>
        </ViewAllRow>
      </Container>
    </Section>
  );
}
