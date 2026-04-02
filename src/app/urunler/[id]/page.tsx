'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/hooks/useLanguage';
import { useCart } from '@/hooks/useCart';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { FaWhatsapp } from 'react-icons/fa';
import { HiShoppingCart, HiArrowLeft } from 'react-icons/hi';
import { useRouter, useParams } from 'next/navigation';
import { fadeInUp } from '@/styles/animations';

interface ProductDetail {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  images: string[];
  stock: number;
  is_customizable: boolean;
  category: { name: string; slug: string };
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

const MainImage = styled.div<{ $src: string }>`
  width: 100%; aspect-ratio: 1; border-radius: ${theme.borderRadius['2xl']};
  background: ${theme.colors.surface};
  background-image: url(${({ $src }) => $src});
  background-size: cover; background-position: center;
  border: 1px solid ${theme.colors.glassBorder};
  box-shadow: ${theme.shadows.md};
`;

const ThumbnailList = styled.div`
  display: flex; gap: 12px; overflow-x: auto; padding-bottom: 8px;
  &::-webkit-scrollbar { height: 6px; }
  &::-webkit-scrollbar-track { background: ${theme.colors.surface}; border-radius: 4px; }
  &::-webkit-scrollbar-thumb { background: ${theme.colors.glassBorder}; border-radius: 4px; }
`;

const Thumbnail = styled.button<{ $src: string; $active: boolean }>`
  flex: 0 0 80px; height: 80px; border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.surface} url(${({ $src }) => $src}) center/cover;
  border: 2px solid ${({ $active }) => ($active ? theme.colors.secondary : 'transparent')};
  cursor: pointer; opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  transition: all ${theme.transitions.fast};
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

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { language, t } = useLanguage();
  const { addToCart, cart, setCartOpen } = useCart();
  
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [qty, setQty] = useState<number>(1);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, category:category_id(name, slug)')
          .eq('id', id)
          .single();
          
        if (data && !error) {
          setProduct(data as ProductDetail);
        } else {
          router.replace('/urunler'); // go back if not found
        }
      } catch (err) {
        console.error("Error fetching product detail:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, router]);

  if (loading) {
    return (
      <PageWrapper style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: theme.colors.textMuted }}>Yükleniyor...</p>
      </PageWrapper>
    );
  }

  if (!product) return null;

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

  // Find how many currently in cart
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

  return (
    <PageWrapper>
      <BackBtn onClick={() => router.push('/urunler')}>
        <HiArrowLeft /> Tüm Ürünlere Dön
      </BackBtn>

      <DetailGrid>
        {/* Images */}
        <ImageGallery>
          <MainImage $src={images[activeImageIndex] || ''} />
          {images.length > 1 && (
            <ThumbnailList>
              {images.map((img, i) => (
                <Thumbnail 
                  key={i} 
                  $src={img} 
                  $active={activeImageIndex === i}
                  onClick={() => setActiveImageIndex(i)} 
                />
              ))}
            </ThumbnailList>
          )}
        </ImageGallery>

        {/* Info */}
        <ProductInfo>
          <CategoryLabel>{product.category?.name || 'Kategori Yok'}</CategoryLabel>
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
    </PageWrapper>
  );
}
