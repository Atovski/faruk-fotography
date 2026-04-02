'use client';

import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp } from '@/styles/animations';
import { HiPlus, HiPencil, HiTrash, HiPhotograph, HiX, HiCheck, HiChevronDown } from 'react-icons/hi';
import toast from 'react-hot-toast';

/* ─── Types ─── */
interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  parent_id: string | null;
  sort_order: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string | null;
  subcategory_id: string | null;
  stock: number;
  is_active: boolean;
  is_customizable: boolean;
  images: string[];
  category?: { id: string; name: string; slug: string } | null;
  subcategory?: { id: string; name: string; slug: string } | null;
}

/* ─── Styled Components ─── */
const Header = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: ${theme.spacing['2xl']};
  h1 { font-size: 28px; font-weight: bold; color: ${theme.colors.text}; }
`;

const AddBtn = styled.button`
  display: flex; align-items: center; gap: 8px;
  padding: 10px 20px; border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.secondary}; color: ${theme.colors.primaryDark};
  border: none; font-weight: 600; cursor: pointer; font-size: 14px;
  transition: all ${theme.transitions.fast};
  &:hover { opacity: 0.9; transform: translateY(-1px); }
`;

const ProductTable = styled.div`
  background: ${theme.colors.surface}; border-radius: ${theme.borderRadius.xl};
  border: 1px solid ${theme.colors.glassBorder}; overflow: hidden;
`;

const TableRow = styled.div<{ $header?: boolean }>`
  display: grid;
  grid-template-columns: 60px 1fr 140px 100px 80px 80px 100px;
  gap: 12px; align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid ${theme.colors.glassBorder};
  font-size: 13px;
  color: ${({ $header }) => ($header ? theme.colors.textMuted : theme.colors.text)};
  font-weight: ${({ $header }) => ($header ? '600' : '400')};
  background: ${({ $header }) => ($header ? theme.colors.background : 'transparent')};
  text-transform: ${({ $header }) => ($header ? 'uppercase' : 'none')};
  letter-spacing: ${({ $header }) => ($header ? '0.5px' : '0')};

  &:last-child { border-bottom: none; }
  &:hover { background: ${({ $header }) => ($header ? '' : theme.colors.background + '80')}; }
`;

const Thumb = styled.div<{ $src?: string }>`
  width: 44px; height: 44px; border-radius: ${theme.borderRadius.md};
  background: ${({ $src }) => ($src ? `url(${$src}) center/cover` : theme.colors.glassBorder)};
  display: flex; align-items: center; justify-content: center;
  color: ${theme.colors.textMuted}; font-size: 18px;
`;

const StatusDot = styled.span<{ $active: boolean }>`
  display: inline-block; width: 8px; height: 8px; border-radius: 50%;
  background: ${({ $active }) => ($active ? '#2ecc71' : '#e74c3c')};
`;

const ActionBtn = styled.button<{ $danger?: boolean }>`
  background: none; border: none; cursor: pointer; padding: 6px;
  color: ${({ $danger }) => ($danger ? '#e74c3c' : theme.colors.textSecondary)};
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.transitions.fast};
  &:hover {
    background: ${({ $danger }) => ($danger ? '#e74c3c15' : theme.colors.glassBorder)};
    color: ${({ $danger }) => ($danger ? '#c0392b' : theme.colors.text)};
  }
`;

const EmptyState = styled.div`
  text-align: center; padding: 60px 20px; color: ${theme.colors.textMuted};
  p { margin-top: 8px; font-size: 14px; }
`;

/* ─── Modal ─── */
const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  z-index: 1000; display: flex; align-items: center; justify-content: center;
  animation: ${fadeInUp} 0.2s ease;
`;

const Modal = styled.div`
  background: ${theme.colors.surface}; border-radius: ${theme.borderRadius.xl};
  width: 560px; max-width: 95vw; max-height: 90vh; overflow-y: auto;
  border: 1px solid ${theme.colors.glassBorder};
`;

const ModalHeader = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px 24px; border-bottom: 1px solid ${theme.colors.glassBorder};
  h2 { font-size: 18px; font-weight: 600; }
`;

const ModalBody = styled.div`
  padding: 24px; display: flex; flex-direction: column; gap: 16px;
`;

const ModalFooter = styled.div`
  display: flex; gap: 12px; justify-content: flex-end;
  padding: 16px 24px; border-top: 1px solid ${theme.colors.glassBorder};
`;

const Field = styled.div`
  display: flex; flex-direction: column; gap: 6px;
  label { font-size: 13px; font-weight: 600; color: ${theme.colors.textSecondary}; text-transform: uppercase; letter-spacing: 0.5px; }
`;

const Input = styled.input`
  padding: 10px 14px; border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.glassBorder}; background: ${theme.colors.background};
  color: ${theme.colors.text}; font-size: 14px; outline: none;
  transition: border-color ${theme.transitions.fast};
  &:focus { border-color: ${theme.colors.secondary}; }
`;

const Textarea = styled.textarea`
  padding: 10px 14px; border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.glassBorder}; background: ${theme.colors.background};
  color: ${theme.colors.text}; font-size: 14px; outline: none; resize: vertical; min-height: 80px;
  transition: border-color ${theme.transitions.fast};
  &:focus { border-color: ${theme.colors.secondary}; }
`;

const Row = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
`;

const ImageUploadArea = styled.label`
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 8px; padding: 24px; border: 2px dashed ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.lg}; cursor: pointer; text-align: center;
  color: ${theme.colors.textMuted}; font-size: 13px;
  transition: all ${theme.transitions.fast};
  min-height: 100px;
  &:hover { border-color: ${theme.colors.secondary}; color: ${theme.colors.secondary}; }
  input { display: none; }
`;

const ImagePreviews = styled.div`
  display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px;
`;

const ImagePreviewCard = styled.div<{ $src: string }>`
  width: 80px; height: 80px; border-radius: ${theme.borderRadius.md};
  background: url(${({ $src }) => $src}) center/cover no-repeat;
  position: relative; border: 1px solid ${theme.colors.glassBorder};
  
  .remove-btn {
    position: absolute; top: -6px; right: -6px; width: 20px; height: 20px;
    background: #e74c3c; color: white; border-radius: 50%; display: flex;
    align-items: center; justify-content: center; border: none; cursor: pointer;
    font-size: 10px; display: none;
  }
  &:hover .remove-btn { display: flex; }
`;

const SaveBtn = styled.button`
  padding: 10px 24px; border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.secondary}; color: ${theme.colors.primaryDark};
  border: none; font-weight: 600; cursor: pointer; font-size: 14px;
  display: flex; align-items: center; gap: 6px;
  &:hover { opacity: 0.9; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const CancelBtn = styled.button`
  padding: 10px 24px; border-radius: ${theme.borderRadius.md};
  background: transparent; color: ${theme.colors.textSecondary};
  border: 1px solid ${theme.colors.glassBorder}; cursor: pointer; font-size: 14px;
  &:hover { border-color: ${theme.colors.text}; color: ${theme.colors.text}; }
`;

/* ─── Custom Select with Add New ─── */
const SelectWrapper = styled.div`
  position: relative;
`;

const SelectTrigger = styled.button`
  width: 100%; padding: 10px 14px; border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.glassBorder}; background: ${theme.colors.background};
  color: ${theme.colors.text}; font-size: 14px; outline: none; text-align: left;
  cursor: pointer; display: flex; justify-content: space-between; align-items: center;
  &:focus { border-color: ${theme.colors.secondary}; }
`;

const Dropdown = styled.div`
  position: absolute; top: calc(100% + 4px); left: 0; right: 0;
  background: ${theme.colors.surface}; border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.md}; z-index: 50; max-height: 220px; overflow-y: auto;
  box-shadow: ${theme.shadows.lg};
`;

const DropdownItem = styled.div<{ $highlight?: boolean }>`
  padding: 10px 14px; cursor: pointer; font-size: 14px;
  color: ${({ $highlight }) => ($highlight ? theme.colors.secondary : theme.colors.text)};
  font-weight: ${({ $highlight }) => ($highlight ? '600' : '400')};
  display: flex; align-items: center; gap: 8px;
  &:hover { background: ${theme.colors.background}; }
`;

const InlineInput = styled.input`
  width: 100%; padding: 10px 14px; border: none; border-top: 1px solid ${theme.colors.glassBorder};
  background: ${theme.colors.background}; color: ${theme.colors.text};
  font-size: 14px; outline: none;
  &::placeholder { color: ${theme.colors.textMuted}; }
`;

/* ─── CategorySelect Component ─── */
function CategorySelect({
  label,
  items,
  value,
  onChange,
  onAddNew,
  placeholder = 'Seçiniz...',
}: {
  label: string;
  items: Category[];
  value: string | null;
  onChange: (id: string | null) => void;
  onAddNew: (name: string) => Promise<Category | null>;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = items.find(i => i.id === value);

  const handleAddNew = async () => {
    if (!newName.trim()) return;
    setAdding(true);
    const created = await onAddNew(newName.trim());
    if (created) {
      onChange(created.id);
      setNewName('');
      setOpen(false);
    }
    setAdding(false);
  };

  return (
    <Field>
      <label>{label}</label>
      <SelectWrapper ref={ref}>
        <SelectTrigger type="button" onClick={() => setOpen(!open)}>
          <span>{selected ? selected.name : placeholder}</span>
          <HiChevronDown />
        </SelectTrigger>
        {open && (
          <Dropdown>
            <DropdownItem onClick={() => { onChange(null); setOpen(false); }}>
              — Seçim yok —
            </DropdownItem>
            {items.map(item => (
              <DropdownItem key={item.id} onClick={() => { onChange(item.id); setOpen(false); }}>
                {item.name}
              </DropdownItem>
            ))}
            <DropdownItem $highlight onClick={() => {}}>
              <HiPlus /> Yeni Ekle
            </DropdownItem>
            <div style={{ display: 'flex' }}>
              <InlineInput
                placeholder="Kategori adı yazın..."
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddNew(); }}
              />
              {newName && (
                <button
                  style={{ padding: '8px 12px', border: 'none', background: theme.colors.secondary, color: '#fff', cursor: 'pointer' }}
                  onClick={handleAddNew}
                  disabled={adding}
                >
                  <HiCheck />
                </button>
              )}
            </div>
          </Dropdown>
        )}
      </SelectWrapper>
    </Field>
  );
}

/* ─── Main Component ─── */
export default function ProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    images: [] as string[],
    category_id: null as string | null,
    subcategory_id: null as string | null,
    stock: '',
    is_customizable: false,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
      ]);
      if (pRes.ok) setProducts(await pRes.json());
      if (cRes.ok) setCategories(await cRes.json());
    } catch (e) {
      toast.error('Veri yüklenirken hata oluştu');
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const mainCategories = categories.filter(c => !c.parent_id);
  const getSubCategories = (parentId: string | null) =>
    parentId ? categories.filter(c => c.parent_id === parentId) : [];

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', description: '', price: '', image_url: '', images: [], category_id: null, subcategory_id: null, stock: '', is_customizable: false });
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      description: p.description,
      price: String(p.price),
      image_url: p.image_url,
      images: p.images || (p.image_url ? [p.image_url] : []),
      category_id: p.category_id,
      subcategory_id: p.subcategory_id,
      stock: String(p.stock),
      is_customizable: p.is_customizable,
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', files[0]);
      const res = await fetch('/api/admin/products/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        setForm(prev => ({ ...prev, images: [...prev.images, data.url] }));
        toast.success('Görsel yüklendi');
      } else {
        toast.error(data.error || 'Yükleme hatası');
      }
    } catch {
      toast.error('Yükleme başarısız');
    }
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSave = async () => {
    if (!form.name || !form.price) {
      toast.error('Ürün adı ve fiyat zorunludur');
      return;
    }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/products/${editing.id}` : '/api/admin/products';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success(editing ? 'Ürün güncellendi' : 'Ürün eklendi');
        setModalOpen(false);
        fetchData();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Hata oluştu');
      }
    } catch {
      toast.error('İşlem başarısız');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Ürün silindi');
        fetchData();
      }
    } catch {
      toast.error('Silme başarısız');
    }
  };

  const addCategory = async (name: string): Promise<Category | null> => {
    const slug = name.toLowerCase().replace(/[^a-z0-9ğüşıöç]/g, '-').replace(/-+/g, '-');
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug }),
      });
      if (res.ok) {
        const cat = await res.json();
        setCategories(prev => [...prev, cat]);
        toast.success(`"${name}" kategorisi eklendi`);
        return cat;
      }
    } catch {}
    toast.error('Kategori eklenemedi');
    return null;
  };

  const addSubCategory = async (name: string): Promise<Category | null> => {
    if (!form.category_id) {
      toast.error('Önce bir ana kategori seçin');
      return null;
    }
    const slug = name.toLowerCase().replace(/[^a-z0-9ğüşıöç]/g, '-').replace(/-+/g, '-');
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug, parent_id: form.category_id }),
      });
      if (res.ok) {
        const cat = await res.json();
        setCategories(prev => [...prev, cat]);
        toast.success(`"${name}" alt kategorisi eklendi`);
        return cat;
      }
    } catch {}
    toast.error('Alt kategori eklenemedi');
    return null;
  };

  const formatPrice = (p: number) => new Intl.NumberFormat('tr-TR').format(p);

  return (
    <>
      <Header>
        <div>
          <h1>📦 Ürünler</h1>
          <p style={{ color: theme.colors.textMuted, fontSize: 14, marginTop: 4 }}>
            {products.length} ürün kayıtlı
          </p>
        </div>
        <AddBtn onClick={openAdd}><HiPlus /> Yeni Ürün Ekle</AddBtn>
      </Header>

      <ProductTable>
        <TableRow $header>
          <span>Görsel</span>
          <span>Ürün Adı</span>
          <span>Kategori</span>
          <span>Fiyat</span>
          <span>Stok</span>
          <span>Durum</span>
          <span>İşlem</span>
        </TableRow>

        {loading ? (
          <EmptyState><p>Yükleniyor...</p></EmptyState>
        ) : products.length === 0 ? (
          <EmptyState>
            <HiPhotograph size={40} />
            <p>Henüz ürün eklenmemiş.<br />Yukarıdaki butona tıklayarak ilk ürününüzü ekleyin.</p>
          </EmptyState>
        ) : (
          products.map(p => (
            <TableRow key={p.id}>
              <Thumb $src={(p.images && p.images.length > 0) ? p.images[0] : (p.image_url || undefined)}>
                {(!p.images?.length && !p.image_url) && <HiPhotograph />}
              </Thumb>
              <div>
                <div style={{ fontWeight: 500 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: theme.colors.textMuted, marginTop: 2 }}>
                  {p.description?.substring(0, 50)}{p.description?.length > 50 ? '...' : ''}
                </div>
              </div>
              <div style={{ fontSize: 12 }}>
                <div>{p.category?.name || '—'}</div>
                {p.subcategory && (
                  <div style={{ color: theme.colors.textMuted }}>{p.subcategory.name}</div>
                )}
              </div>
              <span style={{ fontWeight: 600, color: theme.colors.secondary }}>₺{formatPrice(p.price)}</span>
              <span>{p.stock}</span>
              <StatusDot $active={p.is_active} />
              <div style={{ display: 'flex', gap: 4 }}>
                <ActionBtn onClick={() => openEdit(p)}><HiPencil size={16} /></ActionBtn>
                <ActionBtn $danger onClick={() => handleDelete(p.id)}><HiTrash size={16} /></ActionBtn>
              </div>
            </TableRow>
          ))
        )}
      </ProductTable>

      {/* ─── Add / Edit Modal ─── */}
      {modalOpen && (
        <Overlay onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <Modal>
            <ModalHeader>
              <h2>{editing ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h2>
              <ActionBtn onClick={() => setModalOpen(false)}><HiX size={20} /></ActionBtn>
            </ModalHeader>

            <ModalBody>
              {/* Image Upload */}
              <Field>
                <label>Ürün Görselleri</label>
                {form.images.length > 0 && (
                  <ImagePreviews>
                    {form.images.map((img, i) => (
                      <ImagePreviewCard key={i} $src={img}>
                        <button className="remove-btn" onClick={() => removeImage(i)} type="button"><HiX /></button>
                      </ImagePreviewCard>
                    ))}
                  </ImagePreviews>
                )}
                <ImageUploadArea>
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                  {uploading ? 'Yükleniyor...' : (
                    <>
                      <HiPhotograph size={28} />
                      <span>{form.images.length > 0 ? 'Daha Fazla Görsel Ekle' : 'Görsel yüklemek için tıklayın'}</span>
                    </>
                  )}
                </ImageUploadArea>
              </Field>

              {/* Name */}
              <Field>
                <label>Ürün Başlığı *</label>
                <Input
                  value={form.name}
                  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="örn: Kodak Gold 200 — 35mm"
                />
              </Field>

              {/* Description */}
              <Field>
                <label>Açıklama</label>
                <Textarea
                  value={form.description}
                  onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Ürün açıklaması..."
                />
              </Field>

              {/* Category & Subcategory */}
              <Row>
                <CategorySelect
                  label="Kategori"
                  items={mainCategories}
                  value={form.category_id}
                  onChange={id => setForm(prev => ({ ...prev, category_id: id, subcategory_id: null }))}
                  onAddNew={addCategory}
                  placeholder="Kategori seçin..."
                />
                <CategorySelect
                  label="Alt Kategori"
                  items={getSubCategories(form.category_id)}
                  value={form.subcategory_id}
                  onChange={id => setForm(prev => ({ ...prev, subcategory_id: id }))}
                  onAddNew={addSubCategory}
                  placeholder="Alt kategori seçin..."
                />
              </Row>

              {/* Price & Stock */}
              <Row>
                <Field>
                  <label>Fiyat (₺) *</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="350"
                  />
                </Field>
                <Field>
                  <label>Stok Adedi</label>
                  <Input
                    type="number"
                    value={form.stock}
                    onChange={e => setForm(prev => ({ ...prev, stock: e.target.value }))}
                    placeholder="50"
                  />
                </Field>
              </Row>

              {/* Customizable toggle */}
              <Field>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.is_customizable}
                    onChange={e => setForm(prev => ({ ...prev, is_customizable: e.target.checked }))}
                    style={{ width: 16, height: 16 }}
                  />
                  Kişiselleştirilebilir ürün (WhatsApp ile sipariş)
                </label>
              </Field>
            </ModalBody>

            <ModalFooter>
              <CancelBtn onClick={() => setModalOpen(false)}>İptal</CancelBtn>
              <SaveBtn onClick={handleSave} disabled={saving}>
                <HiCheck /> {saving ? 'Kaydediliyor...' : (editing ? 'Güncelle' : 'Kaydet')}
              </SaveBtn>
            </ModalFooter>
          </Modal>
        </Overlay>
      )}
    </>
  );
}
