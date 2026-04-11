'use client';

import { useState, useEffect } from 'react';
import JSZip from 'jszip';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp, fadeIn, scaleIn } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { HiFilm, HiDownload, HiX, HiChevronLeft, HiChevronRight, HiLockClosed } from 'react-icons/hi';
import toast from 'react-hot-toast';

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

export default function GalleryPage() {
  const { t } = useLanguage();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [galleryData, setGalleryData] = useState<any>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [downloadingZip, setDownloadingZip] = useState(false);

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
          badge="🎞️"
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
          as="h1"
        />

        {!authenticated ? (
          <AccessSection>
            <AccessCard>
              <AccessIcon><HiLockClosed /></AccessIcon>
              <AccessTitle>{t.gallery.title}</AccessTitle>
              <AccessSubtitle>{t.gallery.subtitle}</AccessSubtitle>

              <Form onSubmit={handleAccess}>
                <InputGroup>
                  <InputIcon>📱</InputIcon>
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
              <Button $variant="primary" $size="md" onClick={handleDownloadAll} disabled={downloadingZip || photos.length === 0}>
                <HiDownload /> {downloadingZip ? 'Hazırlanıyor...' : t.gallery.downloadAll}
              </Button>
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
