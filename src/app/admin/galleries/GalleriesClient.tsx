'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp } from '@/styles/animations';
import { Button } from '@/components/ui/Button';
import { FaPlus, FaTrash, FaFolderOpen } from 'react-icons/fa';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { createGallery, deleteGallery } from './actions';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${theme.spacing['2xl']};

  div h1 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes['3xl']};
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing.xs};
  }

  div p {
    color: ${theme.colors.textSecondary};
  }
`;

const TableWrapper = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  animation: ${fadeInUp} 0.5s ease;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: ${theme.spacing.lg};
    text-align: left;
    border-bottom: 1px solid ${theme.colors.glassBorder};
  }

  th {
    background: ${theme.colors.background};
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSizes.sm};
    font-weight: 500;
  }

  td {
    color: ${theme.colors.text};
    font-size: ${theme.fontSizes.sm};
  }

  tr:last-child td {
    border-bottom: none;
  }
  
  tr:hover td {
    background: ${theme.colors.glassBg};
  }
`;

const AccessCodeBadge = styled.span`
  background: ${theme.colors.secondary}20;
  color: ${theme.colors.secondary};
  padding: 4px 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 2px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.modal};
`;

const ModalContent = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  width: 100%;
  max-width: 500px;

  h2 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.xl};
    margin-bottom: ${theme.spacing.lg};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md};

  label {
    display: block;
    margin-bottom: 4px;
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.textSecondary};
  }

  input {
    width: 100%;
    padding: 12px;
    background: ${theme.colors.background};
    border: 1px solid ${theme.colors.glassBorder};
    border-radius: ${theme.borderRadius.md};
    color: ${theme.colors.text};

    &:focus {
      outline: none;
      border-color: ${theme.colors.secondary};
    }
  }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 10px;
`;

export default function GalleriesClient({ galleries }: { galleries: any[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await createGallery(formData);
    
    if (res.error) {
      toast.error(`Hata: ${res.error}`);
      console.error(res.error);
    } else {
      toast.success('Galeri başarıyla oluşturuldu');
      setModalOpen(false);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu galeriyi silmek istediğinize emin misiniz?')) return;
    const res = await deleteGallery(id);
    if (res.error) toast.error('Hata: Silinemedi');
    else toast.success('Galeri silindi');
  };

  return (
    <>
      <PageHeader>
        <div>
          <h1>Müşteri Galerileri</h1>
          <p>Film banyo işlemi biten müşteriler için galeri erişimleri oluşturun.</p>
        </div>
        <Button onClick={() => setModalOpen(true)} $variant="primary" $size="md">
          <FaPlus /> Yeni Galeri
        </Button>
      </PageHeader>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Müşteri Telefonu</th>
              <th>Erişim Kodu (PIN)</th>
              <th>Film Türü</th>
              <th>Durum</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {galleries.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888' }}>Henüz kayıtlı galeri yok.</td></tr>
            ) : null}
            {galleries.map(g => (
              <tr key={g.id}>
                <td>{new Date(g.created_at).toLocaleDateString('tr-TR')}</td>
                <td style={{ fontWeight: 600 }}>{g.phone_number}</td>
                <td><AccessCodeBadge>{g.access_code}</AccessCodeBadge></td>
                <td>{g.film_type || '-'}</td>
                <td>{g.status}</td>
                <td>
                  <ActionRow>
                    <Link href={`/admin/galleries/${g.id}`}>
                      <Button $variant="outline" $size="sm" title="Fotoğraf Yükle">
                        <FaFolderOpen />
                      </Button>
                    </Link>
                    <Button $variant="outline" $size="sm" onClick={() => handleDelete(g.id)} style={{ color: theme.colors.error, borderColor: theme.colors.error + '40' }} title="Sil">
                      <FaTrash />
                    </Button>
                  </ActionRow>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      {modalOpen && (
        <ModalOverlay onClick={() => setModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h2>Yeni Galeri Oluştur</h2>
            <form onSubmit={handleCreate}>
              <FormGroup>
                <label>Telefon Numarası (Giriş için gerekli)*</label>
                <input type="tel" name="phone_number" placeholder="Örn: 05551234567" required />
              </FormGroup>
              <FormGroup>
                <label>Müşteri Adı - Soyadı (Opsiyonel)</label>
                <input type="text" name="customer_name" placeholder="Örn: Ahmet Yılmaz" />
              </FormGroup>
              <FormGroup>
                <label>Film Türü (Opsiyonel)</label>
                <input type="text" name="film_type" placeholder="Örn: Kodak Gold 200 - 35mm" />
              </FormGroup>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <Button type="submit" $variant="primary" $size="md" $fullWidth disabled={loading}>
                  {loading ? 'Oluşturuluyor...' : 'Oluştur'}
                </Button>
                <Button type="button" $variant="outline" $size="md" onClick={() => setModalOpen(false)} $fullWidth>
                  İptal
                </Button>
              </div>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
