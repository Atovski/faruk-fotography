'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { useLanguage } from '@/hooks/useLanguage';
import { useCart } from '@/hooks/useCart';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { FaWhatsapp, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HiShoppingCart, HiArrowLeft } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { fadeInUp, fadeIn } from '@/styles/animations';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Image from 'next/image';

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  images: string[];
  stock: number;
  is_customizable: boolean;
  category_name: string;
}

const PageWrapper = styled.div`
  padding: 140px 20px 80px;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.5s ease;
`;

const BackBtn = styled.button`
  background: none; border: none; cursor: pointer;
  display: flex; align-items: center; gap: 8px;
  color: ${theme.colors.textSecondary}; font-weight: 500;
  margin-bottom: ${theme.spacing['2xl']};
  transition: color ${theme.transitions.fast};
  &:hover { color: ${theme.colors.text}; }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing['3xl']};
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageGallery = styled.div`
  display: flex; flex-direction: column; gap: 16px;
`;

const MainImage = styled.div`
  width: 100%; aspect-ratio: 1; border-radius: ${theme.borderRadius['2xl']};
  background: ${theme.colors.surface};
  cursor: pointer;
  transition: transform ${theme.transitions.fast};
  position: relative;
`;

const MainImageWrapper = styled.div`
  position: relative;
  width: 100%; aspect-ratio: 1; border-radius: ${theme.borderRadius['2xl']};
  border: 1px solid ${theme.colors.glassBorder};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;

  &::after {
    content: '🔍 Büyütmek için tıkla';
    position: absolute;
    bottom: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    opacity: 0;
    transition: opacity ${theme.transitions.fast};
    pointer-events: none;
    z-index: 2;
  }

  &:hover::after { opacity: 1; }
`;

const NavArrow = styled.button<{ $right?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.$right ? 'right: 16px;' : 'left: 16px;'}
  width: 40px; height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  cursor: pointer;
  z-index: 3;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    border-color: white;
    transform: translateY(-50%) scale(1.1);
  }
`;
const ThumbnailList = styled.div`
  display: flex; gap: 12px; overflow-x: auto; padding-bottom: 8px;
  &::-webkit-scrollbar { height: 6px; }
  &::-webkit-scrollbar-track { background: ${theme.colors.surface}; border-radius: 4px; }
  &::-webkit-scrollbar-thumb { background: ${theme.colors.glassBorder}; border-radius: 4px; }
`;

const Thumbnail = styled.button<{ $active: boolean }>`
  flex: 0 0 80px; height: 80px; border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.surface};
  border: 2px solid ${({ $active }) => ($active ? theme.colors.secondary : 'transparent')};
  cursor: pointer; opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  transition: all ${theme.transitions.fast};
  position: relative;
  overflow: hidden;
  &:hover { opacity: 1; }
`;

const ProductInfo = styled.div`
  display: flex; flex-direction: column;
`;

const CategoryLabel = styled.span`
  color: ${theme.colors.secondary}; font-weight: 600; font-size: 14px;
  text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;
`;

const Title = styled.h1`
  font-family: ${theme.fonts.heading}; font-size: 36px; line-height: 1.2;
  margin-bottom: 16px; color: ${theme.colors.text};
`;

const Price = styled.div`
  font-family: ${theme.fonts.heading}; font-size: 32px; font-weight: 700;
  color: ${theme.colors.secondary}; margin-bottom: 32px;
`;

const Description = styled.p`
  font-size: 16px; line-height: 1.6; color: ${theme.colors.textSecondary};
  margin-bottom: 40px; white-space: pre-line;
`;

const ActionSection = styled.div`
  background: ${theme.colors.surface}; padding: 24px; border-radius: ${theme.borderRadius.xl};
  border: 1px solid ${theme.colors.glassBorder};
`;

const QtyLabel = styled.label`
  display: block; font-size: 14px; color: ${theme.colors.textSecondary};
  margin-bottom: 8px; font-weight: 600;
`;

const QtySelector = styled.div`
  display: flex; align-items: center; gap: 16px; margin-bottom: 24px;
`;

const QtyBtn = styled.button`
  width: 44px; height: 44px; border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.background}; border: 1px solid ${theme.colors.glassBorder};
  color: ${theme.colors.text}; font-size: 20px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  &:hover:not(:disabled) { border-color: ${theme.colors.secondary}; color: ${theme.colors.secondary}; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const QtyInput = styled.input`
  width: 60px; height: 44px; text-align: center; font-size: 18px; font-weight: 600;
  background: transparent; border: none; color: ${theme.colors.text};
  outline: none; -moz-appearance: textfield;
  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
`;

const StockWarning = styled.div`
  color: ${theme.colors.error}; font-size: 14px; margin-top: 8px;
`;

const LightboxOverlay = styled.div`
  position: fixed; inset: 0; background: rgba(11, 20, 38, 0.95);
  z-index: 9999; display: flex; align-items: center; justify-content: center;
  animation: ${fadeIn} 0.3s ease;
  backdrop-filter: blur(5px);
`;

const LightboxImgContainer = styled.div`
  position: relative;
  width: 90vw;
  height: 90vh;
  display: flex; align-items: center; justify-content: center;
`;

const LightboxCloseBtn = styled.button`
  position: absolute; top: -40px; right: 0;
  background: none; border: none; color: white; font-size: 30px; cursor: pointer;
  transition: color 0.2s; opacity: 0.8;
  &:hover { color: ${theme.colors.secondary}; opacity: 1; }
  
  @media (min-width: 768px) {
    top: -40px; right: -40px;
  }
`;

const LightboxNavBtn = styled.button<{ $right?: boolean }>`
  position: absolute; top: 50%; transform: translateY(-50%);
  ${props => props.$right ? 'right: 20px;' : 'left: 20px;'}
  background: rgba(0, 0, 0, 0.7); border: 2px solid rgba(255, 255, 255, 0.5);
  color: white; width: 50px; height: 50px; border-radius: 50%; font-size: 20px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s; backdrop-filter: blur(4px);
  
  &:hover { background: rgba(0, 0, 0, 0.9); border-color: white; transform: translateY(-50%) scale(1.1); }
  
  @media (min-width: 768px) {
    width: 64px; height: 64px; font-size: 24px;
    ${props => props.$right ? 'right: 40px;' : 'left: 40px;'}
  }
`;

export default function ProductDetailClient({ product }: { product: ProductData }) {
  const router = useRouter();
  const { language, t } = useLanguage();
  const { addToCart, cart } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [qty, setQty] = useState<number>(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const images = (product.images && product.images.length > 0)
    ? product.images
    : (product.image_url ? [product.image_url] : []);

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (isNaN(val)) return;
    if (val < 1) setQty(1);
    else if (val > product.stock) setQty(product.stock);
    else setQty(val);
  };

  const cartItem = cart.find(i => i.product.id === product.id);
  const currentCartQty = cartItem ? cartItem.quantity : 0;
  const remainingStock = product.stock - currentCartQty;
  const canAddMore = remainingStock > 0;

  const handleAdd = () => {
    if (qty > remainingStock) {
      addToCart({
        id: product.id,
        name_en: product.name,
        name_tr: product.name,
        price: product.price,
        image_url: product.image_url,
        images: product.images,
        stock: product.stock
      }, remainingStock);
      setQty(1);
    } else {
      addToCart({
        id: product.id,
        name_en: product.name,
        name_tr: product.name,
        price: product.price,
        image_url: product.image_url,
        images: product.images,
        stock: product.stock
      }, qty);
      setQty(1);
    }
  };

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <PageWrapper>
      <Breadcrumb 
        items={[
          { label: t.nav?.products || 'Ürünler', href: `/${language}/urunler` },
          { label: product.category_name || 'Kategori' },
          { label: product.name }
        ]} 
      />

      <DetailGrid>
        {/* Images */}
        <ImageGallery>
          <MainImageWrapper>
            <MainImage onClick={() => setIsLightboxOpen(true)}>
              {images[activeImageIndex] && (
                <Image
                  src={images[activeImageIndex]}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  unoptimized={images[activeImageIndex].endsWith('.svg')}
                />
              )}
            </MainImage>
            {images.length > 1 && (
              <>
                <NavArrow onClick={prevImage}><FaChevronLeft /></NavArrow>
                <NavArrow $right onClick={nextImage}><FaChevronRight /></NavArrow>
              </>
            )}
          </MainImageWrapper>
          {images.length > 1 && (
            <ThumbnailList>
              {images.map((img, i) => (
                <Thumbnail
                  key={i}
                  $active={activeImageIndex === i}
                  onClick={() => setActiveImageIndex(i)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="80px"
                    unoptimized={img.endsWith('.svg')}
                  />
                </Thumbnail>
              ))}
            </ThumbnailList>
          )}
        </ImageGallery>

        {/* Info */}
        <ProductInfo>
          <CategoryLabel>{product.category_name || 'Kategori Yok'}</CategoryLabel>
          <Title>{product.name}</Title>
          <Price>₺{formatPrice(product.price)}</Price>
          <Description>{product.description || 'Bu ürün için henüz bir açıklama bulunmamaktadır.'}</Description>

          <ActionSection>
            {product.is_customizable ? (
              <>
                <p style={{ color: theme.colors.textSecondary, marginBottom: '20px', lineHeight: '1.5' }}>
                  Bu kişiselleştirilebilir bir üründür. Lütfen tasarım detaylarını netleştirmek için bizimle WhatsApp üzerinden iletişime geçin.
                </p>
                <Button
                  as="a"
                  href={getWhatsAppUrl(`Merhaba, "${product.name}" isimli siparişim için tasarım detayı konuşmak istiyorum.`)}
                  target="_blank"
                  $variant="whatsapp"
                  $size="lg"
                  $fullWidth
                >
                  <FaWhatsapp size={24} /> WhatsApp ile Sipariş Ver
                </Button>
              </>
            ) : (
              <>
                <QtyLabel>Adet (Maksimum: {product.stock})</QtyLabel>
                <QtySelector>
                  <QtyBtn onClick={() => setQty(q => Math.max(1, q - 1))} disabled={qty <= 1 || !canAddMore}>−</QtyBtn>
                  <QtyInput type="number" value={qty} onChange={handleQtyChange} disabled={!canAddMore} />
                  <QtyBtn onClick={() => setQty(q => Math.min(product.stock, q + 1))} disabled={qty >= remainingStock || !canAddMore}>+</QtyBtn>
                </QtySelector>

                {product.stock === 0 ? (
                  <StockWarning>Ürün şu an stokta yok.</StockWarning>
                ) : !canAddMore ? (
                  <StockWarning>Bu üründen sepete eklenecek mevcut stok sınırına ulaştınız.</StockWarning>
                ) : (qty > remainingStock) ? (
                  <StockWarning>Stokta sepete eklenebilecek yalnızca {remainingStock} adet kaldı.</StockWarning>
                ) : null}

                <Button
                  $variant="primary"
                  $size="lg"
                  $fullWidth
                  onClick={handleAdd}
                  disabled={!canAddMore || product.stock === 0}
                  style={{ marginTop: '8px' }}
                >
                  <HiShoppingCart size={24} /> {t.products.addToCart || 'Sepete Ekle'}
                </Button>
              </>
            )}
          </ActionSection>
        </ProductInfo>
      </DetailGrid>

      {/* Lightbox */}
      {isLightboxOpen && (
        <LightboxOverlay onClick={() => setIsLightboxOpen(false)}>
          <LightboxImgContainer onClick={(e) => e.stopPropagation()}>
            <LightboxCloseBtn onClick={() => setIsLightboxOpen(false)}>
              <FaTimes />
            </LightboxCloseBtn>
            
            <Image 
              src={images[activeImageIndex] || ''} 
              alt={product.name} 
              fill 
              style={{ objectFit: 'contain', borderRadius: 8 }}
              unoptimized={(images[activeImageIndex] || '').endsWith('.svg')}
            />

            {images.length > 1 && (
              <>
                <LightboxNavBtn onClick={prevImage}>
                  <FaChevronLeft />
                </LightboxNavBtn>
                <LightboxNavBtn $right onClick={nextImage}>
                  <FaChevronRight />
                </LightboxNavBtn>
              </>
            )}
          </LightboxImgContainer>
        </LightboxOverlay>
      )}
    </PageWrapper>
  );
}
