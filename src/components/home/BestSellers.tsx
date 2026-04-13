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

/* ── Statik ürün verisi ── */
const bestSellerProducts = [
  {
    id: 'cd12e3e5-c8b1-4f1f-a39c-1ba21d5a371c',
    name: 'Kodak ColorPlus 200',
    subtitle: '35mm Renkli Film',
    price: 550,
    image: '/images/products/kodak_35.png',
  },
  {
    id: 'a63b27b5-2244-4688-9bb3-5e20d0f50b4a',
    name: 'Kodak Ultramax 400',
    subtitle: '35mm Renkli Film',
    price: 550,
    image: '/images/products/kodak_35.png',
  },
  {
    id: '12437dd3-fd48-4b69-8dff-cbe1d5e2ffa1',
    name: 'Fujicolor Superia X-TRA 400',
    subtitle: '35mm Renkli Film',
    price: 550,
    image: '/images/products/fuji_35.png',
  },
  {
    id: '3c87a75a-3b36-4b60-a321-e2bff9a75d6c',
    name: 'Ilford HP5 Plus 400',
    subtitle: '35mm Siyah-Beyaz Film',
    price: 550,
    image: '/images/products/ilford_35.png',
  },
  {
    id: '20f562e5-3794-44d7-9011-9afaf9bffdfa',
    name: 'Fujifilm Instax Mini 12',
    subtitle: 'Çek-At Kamera',
    price: 550,
    image: '/images/products/disp_instax.png',
  },
  {
    id: '1fe284c4-d689-462a-99c0-6f97c0514519',
    name: 'Kişiye Özel Kupa',
    subtitle: 'Kişiselleştirilebilir',
    price: 170,
    image: '/images/products/custom_mug.png',
  },
  {
    id: '5cc198a3-4283-4690-b1e2-4cc833ea2259',
    name: 'Fotoğraf Baskılı Puzzle',
    subtitle: 'Kişiselleştirilebilir',
    price: 200,
    image: '/images/products/custom_puzzle.png',
  },
  {
    id: '96026665-5905-4018-b43b-7c923f18dba5',
    name: 'Doğal Taş Fotoğraf',
    subtitle: 'Kişiselleştirilebilir',
    price: 500,
    image: '/images/products/custom_rock.png',
  },
];

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
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="260px"
                    style={{ objectFit: 'contain', padding: '16px' }}
                  />
                </ImageBox>
                <CardBody>
                  <ProductName>{p.name}</ProductName>
                  <ProductSubtitle>{p.subtitle}</ProductSubtitle>
                  <PriceRow>
                    <Price>₺{p.price}</Price>
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
                          images: [],
                          stock: 99
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
