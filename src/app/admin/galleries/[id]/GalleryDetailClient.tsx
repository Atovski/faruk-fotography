'use client';

import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { Button } from '@/components/ui/Button';
import { HiCloudUpload, HiArrowLeft, HiTrash, HiPlus, HiPencil, HiFolder } from 'react-icons/hi';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createRoll, deletePhoto, deleteRoll, renameRoll } from '../actions';

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
    flex-wrap: wrap;
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

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};

  h2 {
    font-size: ${theme.fontSizes.lg};
    color: ${theme.colors.text};
    margin: 0;
  }
`;

const RollCard = styled.section`
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  background: ${theme.colors.surface};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
`;

const RollHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};

  .title {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;

    svg {
      color: ${theme.colors.secondary};
      font-size: 22px;
      flex-shrink: 0;
    }

    h3 {
      margin: 0;
      font-size: ${theme.fontSizes.lg};
      color: ${theme.colors.text};
      overflow-wrap: anywhere;
    }
  }

  .sub {
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSizes.sm};
  }

  .buttons {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
`;

const RollForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  align-items: center;
  margin-bottom: ${theme.spacing.lg};

  input {
    flex: 1 1 180px;
    min-width: 0;
    padding: 10px 14px;
    border-radius: ${theme.borderRadius.md};
    border: 1px solid ${theme.colors.glassBorder};
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    font-size: ${theme.fontSizes.sm};

    &:focus {
      outline: none;
      border-color: ${theme.colors.secondary};
    }
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
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

  &:hover .actions,
  &:focus-within .actions {
    opacity: 1;
  }
`;

const Empty = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.sm};
  margin: 0;
`;

type Roll = { id: string; name: string; film_type: string | null };
type Photo = { id: string; roll_id: string | null; public_url: string; file_name: string; storage_path: string };

export default function GalleryDetailClient({
  gallery,
  initialRolls,
  initialPhotos,
}: {
  gallery: any;
  initialRolls: Roll[];
  initialPhotos: Photo[];
}) {
  const [rolls, setRolls] = useState<Roll[]>(initialRolls);
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  // Uploads are tracked per roll so two films can be uploaded one after the
  // other without the whole page looking busy.
  const [busyRoll, setBusyRoll] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState('');
  const router = useRouter();

  const photosByRoll = useMemo(() => {
    const map = new Map<string, Photo[]>();
    for (const p of photos) {
      const key = p.roll_id ?? '__none__';
      const list = map.get(key);
      if (list) list.push(p);
      else map.set(key, [p]);
    }
    return map;
  }, [photos]);

  const ungrouped = photosByRoll.get('__none__') || [];

  const startAdd = () => {
    setNewName(`${rolls.length + 1}. Film`);
    setNewType('');
    setAdding(true);
  };

  const handleCreateRoll = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) {
      toast.error('Filme bir isim verin.');
      return;
    }

    const res = await createRoll(gallery.id, name, newType);
    if (res.error || !res.data) {
      toast.error(res.error || 'Film eklenemedi.');
      return;
    }

    setRolls((prev) => [...prev, res.data as Roll]);
    setAdding(false);
    toast.success(`"${name}" eklendi. Şimdi fotoğraflarını yükleyebilirsiniz.`);
  };

  const handleRename = async (e: React.FormEvent, rollId: string) => {
    e.preventDefault();
    const name = editName.trim();
    if (!name) {
      toast.error('Filme bir isim verin.');
      return;
    }

    const res = await renameRoll(rollId, name, editType);
    if (res.error || !res.data) {
      toast.error(res.error || 'Kaydedilemedi.');
      return;
    }

    setRolls((prev) => prev.map((r) => (r.id === rollId ? (res.data as Roll) : r)));
    setEditing(null);
    toast.success('Kaydedildi.');
  };

  const handleDeleteRoll = async (roll: Roll) => {
    const count = (photosByRoll.get(roll.id) || []).length;
    const warning = count
      ? `"${roll.name}" ve içindeki ${count} fotoğraf silinecek. Emin misiniz?`
      : `"${roll.name}" silinecek. Emin misiniz?`;
    if (!confirm(warning)) return;

    const res = await deleteRoll(roll.id);
    if (res.error) {
      toast.error(res.error);
      return;
    }

    setRolls((prev) => prev.filter((r) => r.id !== roll.id));
    setPhotos((prev) => prev.filter((p) => p.roll_id !== roll.id));
    toast.success(`"${roll.name}" silindi.`);
    router.refresh();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, rollId: string | null) => {
    if (!e.target.files?.length) return;

    const files = Array.from(e.target.files);
    // Let the same files be picked again later if an upload goes wrong.
    e.target.value = '';
    setBusyRoll(rollId ?? '__none__');
    setProgress(0);

    let successes = 0;
    const total = files.length;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      if (rollId) formData.append('roll_id', rollId);

      try {
        const res = await fetch(`/api/admin/galleries/${gallery.id}/upload`, {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const { photo } = await res.json();
          setPhotos((prev) => [...prev, photo]);
          successes++;
        } else {
          toast.error(`${file.name} yüklenemedi`);
        }
      } catch {
        toast.error(`${file.name} yüklenirken ağ hatası oluştu`);
      }

      setProgress(Math.round(((i + 1) / total) * 100));
    }

    setBusyRoll(null);
    toast.success(`${successes}/${total} fotoğraf yüklendi.`);
    router.refresh();
  };

  const handleDeletePhoto = async (photoId: string, storagePath: string) => {
    if (!confirm('Fotoğrafı silmek istediğinize emin misiniz?')) return;

    const res = await deletePhoto(photoId, storagePath);
    if (res.error) {
      toast.error(res.error);
    } else {
      setPhotos((prev) => prev.filter((p) => p.id !== photoId));
      toast.success('Fotoğraf silindi');
    }
  };

  const renderGrid = (list: Photo[]) =>
    list.length === 0 ? (
      <Empty>Bu filme henüz fotoğraf yüklenmemiş.</Empty>
    ) : (
      <PhotoGrid>
        {list.map((p) => (
          <PhotoCard key={p.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.public_url} alt={p.file_name} />
            <div className="actions">
              <Button
                $variant="primary"
                $size="sm"
                onClick={() => handleDeletePhoto(p.id, p.storage_path)}
                style={{ padding: '8px', background: theme.colors.error, borderColor: theme.colors.error }}
                aria-label={`${p.file_name} sil`}
              >
                <HiTrash />
              </Button>
            </div>
          </PhotoCard>
        ))}
      </PhotoGrid>
    );

  const uploadButton = (rollId: string | null, label: string) => {
    const key = rollId ?? '__none__';
    const busy = busyRoll === key;
    return (
      <label>
        <HiddenInput
          type="file"
          multiple
          accept="image/jpeg, image/png"
          onChange={(e) => handleFileChange(e, rollId)}
          disabled={busyRoll !== null}
        />
        <Button
          as="span"
          $variant="primary"
          $size="sm"
          style={busyRoll !== null ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
        >
          <HiCloudUpload /> {busy ? `Yükleniyor... %${progress}` : label}
        </Button>
      </label>
    );
  };

  return (
    <div>
      <Header>
        <Link href="/admin/galleries"><HiArrowLeft /> Galerilere Dön</Link>
        <h1>Galeri: {gallery.phone_number}</h1>
        <div className="meta">
          <span>Müşteri: {gallery.customer_name || 'Bilinmiyor'}</span>
          <span>Film sayısı: {rolls.length}</span>
          <span>Toplam fotoğraf: {photos.length}</span>
          <span>PIN: <strong>{gallery.access_code}</strong></span>
        </div>
      </Header>

      <Toolbar>
        <h2>Filmler</h2>
        {!adding && (
          <Button $variant="primary" $size="md" onClick={startAdd}>
            <HiPlus /> Film Ekle
          </Button>
        )}
      </Toolbar>

      {adding && (
        <RollCard>
          <RollForm onSubmit={handleCreateRoll}>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Film adı (ör. 1. Film)"
              aria-label="Film adı"
              id="new-roll-name"
              autoFocus
            />
            <input
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              placeholder="Film türü (isteğe bağlı)"
              aria-label="Film türü"
              id="new-roll-type"
            />
            <Button type="submit" $variant="primary" $size="sm">Ekle</Button>
            <Button type="button" $variant="outline" $size="sm" onClick={() => setAdding(false)}>
              Vazgeç
            </Button>
          </RollForm>
        </RollCard>
      )}

      {rolls.length === 0 && !adding && ungrouped.length === 0 && (
        <RollCard>
          <Empty>
            Bu galeride henüz film yok. <strong>Film Ekle</strong> ile başlayın — müşteri 3-4 film
            gönderdiyse her biri için ayrı bir film açın, hepsi tek linkte ayrı klasörler halinde görünür.
          </Empty>
        </RollCard>
      )}

      {rolls.map((roll) => {
        const list = photosByRoll.get(roll.id) || [];
        return (
          <RollCard key={roll.id}>
            {editing === roll.id ? (
              <RollForm onSubmit={(e) => handleRename(e, roll.id)}>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Film adı"
                  aria-label="Film adı"
                  id={`edit-name-${roll.id}`}
                  autoFocus
                />
                <input
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                  placeholder="Film türü (isteğe bağlı)"
                  aria-label="Film türü"
                  id={`edit-type-${roll.id}`}
                />
                <Button type="submit" $variant="primary" $size="sm">Kaydet</Button>
                <Button type="button" $variant="outline" $size="sm" onClick={() => setEditing(null)}>
                  Vazgeç
                </Button>
              </RollForm>
            ) : (
              <RollHead>
                <div className="title">
                  <HiFolder />
                  <div>
                    <h3>{roll.name}</h3>
                    <span className="sub">
                      {roll.film_type ? `${roll.film_type} · ` : ''}{list.length} fotoğraf
                    </span>
                  </div>
                </div>
                <div className="buttons">
                  {uploadButton(roll.id, 'Fotoğraf Yükle')}
                  <Button
                    $variant="outline"
                    $size="sm"
                    onClick={() => {
                      setEditing(roll.id);
                      setEditName(roll.name);
                      setEditType(roll.film_type || '');
                    }}
                  >
                    <HiPencil /> Düzenle
                  </Button>
                  <Button
                    $variant="outline"
                    $size="sm"
                    onClick={() => handleDeleteRoll(roll)}
                    style={{ color: theme.colors.error, borderColor: theme.colors.error }}
                  >
                    <HiTrash /> Sil
                  </Button>
                </div>
              </RollHead>
            )}

            {renderGrid(list)}
          </RollCard>
        );
      })}

      {ungrouped.length > 0 && (
        <RollCard>
          <RollHead>
            <div className="title">
              <HiFolder />
              <div>
                <h3>Gruplandırılmamış</h3>
                <span className="sub">
                  {ungrouped.length} fotoğraf · bu özellikten önce yüklenenler
                </span>
              </div>
            </div>
            <div className="buttons">{uploadButton(null, 'Buraya Yükle')}</div>
          </RollHead>
          {renderGrid(ungrouped)}
        </RollCard>
      )}
    </div>
  );
}
