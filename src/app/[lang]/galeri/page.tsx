'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import JSZip from 'jszip';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp, fadeIn, scaleIn } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { HiFilm, HiDownload, HiX, HiChevronLeft, HiChevronRight, HiLockClosed, HiShoppingCart, HiPhone, HiShare } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useCart } from '@/hooks/useCart';
import { supabase } from '@/lib/supabase';
import { getLocalizedHref } from '@/i18n/config';
import Link from 'next/link';
import Image from 'next/image';

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg} ${theme.spacing['4xl']};
`;

const AccessSection = styled.div`
  max-width: 480px;
  margin: 0 auto;
  animation: ${fadeInUp} 0.6s ease;
`;

const AccessCard = styled.div`
  background: ${theme.colors.glassBg};
  backdrop-filter: blur(20px);
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
`;

const AccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.secondary}15;
  color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  margin: 0 auto ${theme.spacing.xl};
`;

const AccessTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['2xl']};
  text-align: center;
  margin-bottom: ${theme.spacing.sm};
`;

const AccessSubtitle = styled.p`
  text-align: center;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.xl};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 18px;
  padding-left: 46px;
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.surfaceLight};
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.md};
  transition: all ${theme.transitions.fast};

  &:focus {
    border-color: ${theme.colors.secondary};
    box-shadow: 0 0 0 3px ${theme.colors.secondary}15;
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.textMuted};
  font-size: 18px;
`;

/* Gallery view after successful access */
const GalleryWrapper = styled.div`
  animation: ${fadeIn} 0.6s ease;
`;

const OrderInfoBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  background: ${theme.colors.glassBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  margin-bottom: ${theme.spacing['2xl']};
`;

const OrderInfoItem = styled.div`
  span:first-child {
    display: block;
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 2px;
  }
  span:last-child {
    font-size: ${theme.fontSizes.md};
    color: ${theme.colors.text};
    font-weight: 500;
  }
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 4px 14px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  background: ${({ $status }) =>
    $status === 'ready' ? theme.colors.success + '20' :
    $status === 'delivered' ? theme.colors.secondary + '20' :
    theme.colors.warning + '20'};
  color: ${({ $status }) =>
    $status === 'ready' ? theme.colors.success :
    $status === 'delivered' ? theme.colors.secondary :
    theme.colors.warning};
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${theme.spacing.md};
`;

const PhotoCard = styled.div`
  position: relative;
  aspect-ratio: 3/2;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  transition: all ${theme.transitions.normal};
  animation: ${fadeInUp} 0.4s ease forwards;

  &:hover {
    border-color: ${theme.colors.secondary};
    transform: scale(1.02);
    
    .overlay {
      opacity: 1;
    }
  }
`;

const PhotoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.gradientCard};
  font-size: 40px;
  color: ${theme.colors.secondary}30;
`;

const PhotoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(15, 25, 35, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity ${theme.transitions.normal};
`;

const PhotoNumber = styled.span`
  position: absolute;
  bottom: 8px;
  left: 8px;
  padding: 2px 10px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.surface}CC;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.xs};
`;

/* Lightbox */
const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: ${theme.zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease;
`;

const LightboxImage = styled.div`
  max-width: 90vw;
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${scaleIn} 0.3s ease;

  .photo-placeholder {
    width: 600px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.surface};
    border-radius: ${theme.borderRadius.lg};
    font-size: 80px;
    color: ${theme.colors.secondary}30;
  }
`;

const LightboxClose = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  color: ${theme.colors.text};
  width: 44px;
  height: 44px;
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  z-index: 2;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.secondary};
    color: ${theme.colors.primaryDark};
  }
`;

const LightboxNav = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  ${({ $side }) => $side}: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  color: ${theme.colors.text};
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.secondary};
    color: ${theme.colors.primaryDark};
  }
`;

const LightboxInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
`;

const LightboxCounter = styled.span`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.sm};
`;

// No more demo photos. State will handle real data.

const SliderSection = styled.div`
  margin-top: ${theme.spacing['4xl']};
  padding-top: ${theme.spacing['2xl']};
  border-top: 1px solid ${theme.colors.glassBorder};
  animation: ${fadeInUp} 0.6s ease;
`;

const SliderTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
`;

const SliderTrack = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: ${theme.spacing.md} 0 ${theme.spacing.xl};

  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }
`;

const ProductCard = styled(Link)`
  flex: 0 0 240px;
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
  padding: ${theme.spacing.md} ${theme.spacing.lg};
`;

const ProductName = styled.h4`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.text};
  margin-bottom: 4px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${theme.spacing.md};
`;

const Price = styled.span`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  font-weight: 700;
  color: ${theme.colors.secondary};
`;

const CartIconBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.secondary}15;
  color: ${theme.colors.secondary};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  ${ProductCard}:hover & {
    background: ${theme.colors.secondary};
    color: ${theme.colors.primaryDark};
  }
`;

function GalleryPageContent() {
  const { t } = useLanguage();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [galleryData, setGalleryData] = useState<any>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(false);

  // Cart & Upsell logic
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [filmProducts, setFilmProducts] = useState<any[]>([]);

  // Magic Link: auto-login via ?token= parameter
  const searchParams = useSearchParams();
  useEffect(() => {
    const token = searchParams.get('token');
    if (!token || authenticated) return;

    setTokenLoading(true);
    fetch(`/api/gallery/magic-link?token=${encodeURIComponent(token)}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGalleryData(data.gallery);
          setPhotos(data.photos);
          setAuthenticated(true);
        } else {
          toast.error(data.error || 'Bağlantı geçersiz veya süresi dolmuş.');
        }
      })
      .catch(() => {
        toast.error('Bağlantı doğrulanamadı.');
      })
      .finally(() => setTokenLoading(false));
  }, [searchParams]);

  useEffect(() => {
    async function fetchFilmProducts() {
      if (!authenticated) return;
      try {
        // Fetch specific subcategories
        const { data: categories } = await supabase
          .from('categories')
          .select('id')
          .in('slug', ['35mm-color', '35mm-bw', '120mm-color', '120mm-bw']);

        const tempIds = categories?.map((c) => c.id) || [];
        
        if (tempIds.length > 0) {
          const { data: products } = await supabase
            .from('products')
            .select('*')
            .in('subcategory_id', tempIds)
            .eq('is_active', true)
            .order('sort_order', { ascending: true });
            
          setFilmProducts(products || []);
        }
      } catch (err) {
        console.error('Failed to fetch film products:', err);
      }
    }
    fetchFilmProducts();
  }, [authenticated]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => prev !== null && prev > 0 ? prev - 1 : photos.length - 1);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => prev !== null && prev < photos.length - 1 ? prev + 1 : 0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, photos.length]);

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !code) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/gallery/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setGalleryData(data.gallery);
        setPhotos(data.photos);
        setAuthenticated(true);
        toast.success(t.gallery.messages?.success || 'Fotoğraflar yüklendi!');
      } else {
        toast.error(data.error || t.gallery.error);
      }
    } catch {
      toast.error(t.gallery.error);
    } finally {
      setLoading(false);
    }
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxIndex === null) return;
    if (direction === 'prev') {
      setLightboxIndex(prev => prev !== null && prev > 0 ? prev - 1 : photos.length - 1);
    } else {
      setLightboxIndex(prev => prev !== null && prev < photos.length - 1 ? prev + 1 : 0);
    }
  };

  const handleDownloadAll = async () => {
    if (photos.length === 0) return;
    setDownloadingZip(true);
    const toastId = toast.loading('Fotoğraflar arşivleniyor, lütfen bekleyin...');
    
    try {
      const zip = new JSZip();
      
      const promises = photos.map(async (photo) => {
        const response = await fetch(photo.public_url);
        const blob = await response.blob();
        zip.file(photo.file_name, blob);
      });
      
      await Promise.all(promises);
      const content = await zip.generateAsync({ type: 'blob' });
      
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `FotoFaruk_${galleryData?.phone_number || 'Fotograflar'}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('İndirme başladı!', { id: toastId });
    } catch {
      toast.error('İndirme başarısız oldu.', { id: toastId });
    } finally {
      setDownloadingZip(false);
    }
  };

  const handleDownloadSingle = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      toast.error('Fotoğraf indirilemedi.');
    }
  };

  return (
    <PageWrapper>
      <Container>
        <SectionTitle
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
          as="h1"
        />

        {tokenLoading ? (
          <AccessSection>
            <AccessCard>
              <AccessIcon><HiLockClosed /></AccessIcon>
              <AccessTitle>{language === 'en' ? 'Verifying access...' : 'Erişim doğrulanıyor...'}</AccessTitle>
              <AccessSubtitle>{language === 'en' ? 'Please wait while we load your gallery.' : 'Galeriniz yüklenirken lütfen bekleyin.'}</AccessSubtitle>
            </AccessCard>
          </AccessSection>
        ) : !authenticated ? (
          <AccessSection>
            <AccessCard>
              <AccessIcon><HiLockClosed /></AccessIcon>
              <AccessTitle>{t.gallery.title}</AccessTitle>
              <AccessSubtitle>{t.gallery.subtitle}</AccessSubtitle>

              <Form onSubmit={handleAccess}>
                <InputGroup>
                  <InputIcon><HiPhone /></InputIcon>
                  <Input
                    type="tel"
                    placeholder={t.gallery.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    id="gallery-phone"
                  />
                </InputGroup>
                <InputGroup>
                  <InputIcon><HiLockClosed /></InputIcon>
                  <Input
                    type="text"
                    placeholder={t.gallery.codePlaceholder}
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    required
                    maxLength={6}
                    style={{ letterSpacing: '4px', fontWeight: 600, textTransform: 'uppercase' }}
                    id="gallery-code"
                  />
                </InputGroup>
                <Button type="submit" $variant="primary" $size="lg" $fullWidth disabled={loading}>
                  {loading ? '...' : t.gallery.submit}
                </Button>
              </Form>
            </AccessCard>
          </AccessSection>
        ) : (
          <GalleryWrapper>
            <OrderInfoBar>
              <OrderInfoItem>
                <span>{t.gallery.filmType}</span>
                <span>{galleryData?.film_type || 'Belirtilmedi'}</span>
              </OrderInfoItem>
              <OrderInfoItem>
                <span>{t.gallery.status}</span>
                <StatusBadge $status={galleryData?.status || 'ready'}>
                  {galleryData?.status === 'delivered' ? t.gallery.statuses.delivered : t.gallery.statuses.ready}
                </StatusBadge>
              </OrderInfoItem>
              <OrderInfoItem>
                <span>{t.gallery.date}</span>
                <span>{galleryData ? new Date(galleryData.created_at).toLocaleDateString('tr-TR') : '-'}</span>
              </OrderInfoItem>
              <OrderInfoItem>
                <span>{t.gallery.photos}</span>
                <span>{photos.length}</span>
              </OrderInfoItem>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Button
                  $variant="outline"
                  $size="md"
                  onClick={() => {
                    const token = searchParams.get('token') || galleryData?.access_token;
                    const shareUrl = token
                      ? `${window.location.origin}/${language}/galeri?token=${token}`
                      : window.location.href;

                    navigator.clipboard.writeText(shareUrl).then(() => {
                      toast.success(language === 'en' ? 'Link copied!' : 'Bağlantı kopyalandı!');
                    }).catch(() => {
                      const textarea = document.createElement('textarea');
                      textarea.value = shareUrl;
                      document.body.appendChild(textarea);
                      textarea.select();
                      document.execCommand('copy');
                      document.body.removeChild(textarea);
                      toast.success(language === 'en' ? 'Link copied!' : 'Bağlantı kopyalandı!');
                    });
                  }}
                >
                  <HiShare /> {language === 'en' ? 'Share' : 'Paylaş'}
                </Button>
                <Button $variant="primary" $size="md" onClick={handleDownloadAll} disabled={downloadingZip || photos.length === 0}>
                  <HiDownload /> {downloadingZip ? 'Hazırlanıyor...' : t.gallery.downloadAll}
                </Button>
              </div>
            </OrderInfoBar>

            <PhotoGrid>
              {photos.length === 0 ? (
                <div style={{ color: theme.colors.textSecondary, gridColumn: '1 / -1', padding: '40px 0', textAlign: 'center' }}>
                  Bu galeriye henüz fotoğraf yüklenmemiş.
                </div>
              ) : null}
              {photos.map((photo, i) => (
                <PhotoCard
                  key={photo.id}
                  onClick={() => setLightboxIndex(i)}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <img src={photo.public_url} alt={photo.file_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <PhotoNumber>{String(i + 1).padStart(2, '0')}</PhotoNumber>
                </PhotoCard>
              ))}
            </PhotoGrid>

            {/* Upsell Slider for Film Products */}
            {filmProducts.length > 0 && (
              <SliderSection>
                <SliderTitle>
                  {language === 'tr' ? 'Yeni Filmler Satın Alın' : 'Buy New Films'}
                </SliderTitle>
                <SliderTrack>
                  {filmProducts.map((p) => {
                    const primaryImage = (p.images && p.images.length > 0) ? p.images[0] : (p.image_url || '/placeholder-image.png');
                    return (
                      <ProductCard key={p.id} href={getLocalizedHref(`/urunler/${p.id}`, language)}>
                        <ImageBox>
                          <Image
                            src={primaryImage.startsWith('/') ? primaryImage : `/${primaryImage}`}
                            alt={p.name}
                            fill
                            sizes="240px"
                            style={{ objectFit: 'contain', padding: '16px' }}
                          />
                        </ImageBox>
                        <CardBody>
                          <ProductName>{p.name}</ProductName>
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
                                  image_url: primaryImage,
                                  images: p.images || [],
                                  stock: p.stock || 99
                                }, 1);
                                toast.success(language === 'tr' ? `${p.name} sepete eklendi!` : `${p.name} added to cart!`);
                              }}
                              aria-label="Sepete Ekle"
                            >
                              <HiShoppingCart />
                            </CartIconBtn>
                          </PriceRow>
                        </CardBody>
                      </ProductCard>
                    );
                  })}
                </SliderTrack>
              </SliderSection>
            )}

          </GalleryWrapper>
        )}

        {lightboxIndex !== null && (
          <Lightbox onClick={() => setLightboxIndex(null)}>
            <LightboxClose onClick={() => setLightboxIndex(null)}>
              <HiX />
            </LightboxClose>
            <LightboxNav $side="left" onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}>
              <HiChevronLeft />
            </LightboxNav>
            <LightboxImage onClick={(e) => e.stopPropagation()}>
              <img 
                src={photos[lightboxIndex].public_url} 
                alt={photos[lightboxIndex].file_name} 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: theme.borderRadius.lg }} 
              />
            </LightboxImage>
            <LightboxNav $side="right" onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}>
              <HiChevronRight />
            </LightboxNav>
            <LightboxInfo>
              <LightboxCounter>
                {(lightboxIndex + 1)} / {photos.length}
              </LightboxCounter>
              <Button $variant="primary" $size="sm" onClick={(e) => { e.stopPropagation(); handleDownloadSingle(photos[lightboxIndex].public_url, photos[lightboxIndex].file_name); }}>
                <HiDownload /> {t.gallery.download}
              </Button>
            </LightboxInfo>
          </Lightbox>
        )}
      </Container>
    </PageWrapper>
  );
}

export default function GalleryPage() {
  return (
    <Suspense>
      <GalleryPageContent />
    </Suspense>
  );
}
