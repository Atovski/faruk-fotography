'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { Button } from '@/components/ui/Button';
import { HiCloudUpload, HiArrowLeft, HiTrash } from 'react-icons/hi';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { deletePhoto } from '../actions';

const Header = styled.div`
  margin-bottom: ${theme.spacing['2xl']};

  a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: ${theme.colors.textSecondary};
    text-decoration: none;
    margin-bottom: ${theme.spacing.lg};
    transition: color ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.secondary};
    }
  }

  h1 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes['2xl']};
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing.sm};
  }

  .meta {
    display: flex;
    gap: ${theme.spacing.lg};
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSizes.sm};
    
    strong {
      color: ${theme.colors.secondary};
      font-family: monospace;
      font-size: 16px;
    }
  }
`;

const UploadBox = styled.div`
  border: 2px dashed ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['3xl']};
  text-align: center;
  background: ${theme.colors.surface};
  margin-bottom: ${theme.spacing['2xl']};
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.secondary};
    background: ${theme.colors.secondary}05;
  }

  svg {
    font-size: 48px;
    color: ${theme.colors.secondary};
    margin-bottom: ${theme.spacing.md};
  }

  h3 {
    font-size: ${theme.fontSizes.lg};
    margin-bottom: ${theme.spacing.xs};
  }

  p {
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSizes.sm};
    margin-bottom: ${theme.spacing.xl};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
`;

const PhotoCard = styled.div`
  position: relative;
  aspect-ratio: 3/2;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.glassBorder};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .actions {
    position: absolute;
    top: 8px;
    right: 8px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover .actions {
    opacity: 1;
  }
`;

export default function GalleryDetailClient({ gallery, initialPhotos }: { gallery: any, initialPhotos: any[] }) {
  const [photos, setPhotos] = useState<any[]>(initialPhotos);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const files = Array.from(e.target.files);
    setUploading(true);
    setProgress(0);

    let successes = 0;
    const total = files.length;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch(`/api/admin/galleries/${gallery.id}/upload`, {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const { photo } = await res.json();
          setPhotos(prev => [...prev, photo]);
          successes++;
        } else {
          toast.error(`${file.name} yüklenemedi`);
        }
      } catch {
        toast.error(`${file.name} yüklenirken ağ hatası oluştu`);
      }

      setProgress(Math.round(((i + 1) / total) * 100));
    }

    setUploading(false);
    toast.success(`${successes}/${total} fotoğraf başarıyla yüklendi!`);
    router.refresh();
  };

  const handleDelete = async (photoId: string, storagePath: string) => {
    if (!confirm('Fotoğrafı silmek istediğinize emin misiniz?')) return;
    
    const res = await deletePhoto(photoId, storagePath);
    if (res.error) {
      toast.error(res.error);
    } else {
      setPhotos(prev => prev.filter(p => p.id !== photoId));
      toast.success('Fotoğraf silindi');
    }
  };

  return (
    <div>
      <Header>
        <Link href="/admin/galleries"><HiArrowLeft /> Galerilere Dön</Link>
        <h1>Galeri: {gallery.phone_number}</h1>
        <div className="meta">
          <span>Müşteri: {gallery.customer_name || 'Bilinmiyor'}</span>
          <span>Film Türü: {gallery.film_type || 'Belirtilmedi'}</span>
          <span>PIN: <strong>{gallery.access_code}</strong></span>
        </div>
      </Header>

      <UploadBox>
        <HiCloudUpload />
        <h3>Fotoğrafları Yükle</h3>
        <p>Bilgisayarınızdan birden fazla dosya seçerek bu galeriye yükleyebilirsiniz.</p>
        
        <label>
          <HiddenInput type="file" multiple accept="image/jpeg, image/png" onChange={handleFileChange} disabled={uploading} />
          <Button as="span" $variant="primary" $size="md" style={uploading ? { opacity: 0.5, cursor: 'not-allowed' } : {}}>
            {uploading ? `Yükleniyor... %${progress}` : 'Dosyaları Seç'}
          </Button>
        </label>
      </UploadBox>

      <div>
        <h3 style={{ marginBottom: '16px', color: theme.colors.text }}>Mevcut Fotoğraflar ({photos.length})</h3>
        {photos.length === 0 ? (
          <p style={{ color: theme.colors.textSecondary }}>Bu galeriye henüz fotoğraf yüklenmemiş.</p>
        ) : (
          <PhotoGrid>
            {photos.map(p => (
              <PhotoCard key={p.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.public_url} alt={p.file_name} />
                <div className="actions">
                  <Button $variant="primary" $size="sm" onClick={() => handleDelete(p.id, p.storage_path)} style={{ padding: '8px', background: theme.colors.error, borderColor: theme.colors.error }}>
                    <HiTrash />
                  </Button>
                </div>
              </PhotoCard>
            ))}
          </PhotoGrid>
        )}
      </div>
    </div>
  );
}
