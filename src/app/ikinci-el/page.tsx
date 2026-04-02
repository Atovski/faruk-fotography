'use client';

import { useState, useRef } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp, fadeIn } from '@/styles/animations';
import { Button } from '@/components/ui/Button';
import { HiCamera, HiPhotograph, HiPhone, HiPaperAirplane, HiX, HiCheckCircle } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { analogCameras, getAllBrands, getModelsByBrand } from '@/data/analogCameras';

/* ───── Styled Components ───── */
const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  background: ${theme.colors.gradientPrimary};
  padding: ${theme.spacing['3xl']} 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(to top, ${theme.colors.background}, transparent);
  }
`;

const HeroContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  animation: ${fadeInUp} 0.6s ease;
  position: relative;
  z-index: 1;

  h1 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes['4xl']};
    color: ${theme.colors.white};
    margin-bottom: ${theme.spacing.md};

    span { color: ${theme.colors.secondary}; }
  }

  p {
    font-size: ${theme.fontSizes.lg};
    color: rgba(255,255,255,0.7);
    line-height: 1.7;
  }
`;

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: ${theme.spacing['3xl']} ${theme.spacing.lg} ${theme.spacing['4xl']};
`;

const FormCard = styled.form`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing['2xl']};
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);
  animation: ${fadeInUp} 0.5s ease 0.1s both;
`;

const FormTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: 10px;

  svg { color: ${theme.colors.secondary}; }
`;

const FormSubtitle = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing['2xl']};
  line-height: 1.6;
`;

const FieldGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: 6px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: ${theme.fontSizes.md};
  font-family: ${theme.fonts.body};
  border: 1.5px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.surfaceLight};
  color: ${theme.colors.text};
  transition: all 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231B2A4A' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;

  &:focus {
    outline: none;
    border-color: ${theme.colors.secondary};
    box-shadow: 0 0 0 3px ${theme.colors.secondary}20;
  }

  optgroup {
    font-weight: 700;
    color: ${theme.colors.primary};
  }

  option {
    font-weight: 400;
    color: ${theme.colors.text};
    padding: 4px 0;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: ${theme.fontSizes.md};
  font-family: ${theme.fonts.body};
  border: 1.5px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.surfaceLight};
  color: ${theme.colors.text};
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${theme.colors.secondary};
    box-shadow: 0 0 0 3px ${theme.colors.secondary}20;
  }

  &::placeholder { color: ${theme.colors.textMuted}; }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  font-size: ${theme.fontSizes.md};
  font-family: ${theme.fonts.body};
  border: 1.5px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.surfaceLight};
  color: ${theme.colors.text};
  min-height: 100px;
  resize: vertical;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${theme.colors.secondary};
    box-shadow: 0 0 0 3px ${theme.colors.secondary}20;
  }

  &::placeholder { color: ${theme.colors.textMuted}; }
`;

const DropZone = styled.div<{ $active: boolean }>`
  border: 2px dashed ${({ $active }) => $active ? theme.colors.secondary : theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  text-align: center;
  cursor: pointer;
  transition: all 0.25s;
  background: ${({ $active }) => $active ? `${theme.colors.secondary}08` : theme.colors.surfaceLight};

  &:hover {
    border-color: ${theme.colors.secondary};
    background: ${theme.colors.secondary}08;
  }

  svg {
    font-size: 36px;
    color: ${theme.colors.secondary};
    margin-bottom: 8px;
  }

  p {
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSizes.sm};
  }

  span {
    color: ${theme.colors.secondary};
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const PreviewGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: ${theme.spacing.md};
`;

const PreviewItem = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  border: 2px solid ${theme.colors.glassBorder};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: none;
    background: ${theme.colors.error};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;

    &:hover { background: #c0392b; }
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const SuccessBox = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']};
  animation: ${fadeIn} 0.4s ease;

  svg {
    font-size: 64px;
    color: ${theme.colors.success};
    margin-bottom: ${theme.spacing.md};
  }

  h2 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes['2xl']};
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSizes.md};
    line-height: 1.6;
    margin-bottom: ${theme.spacing.xl};
  }
`;

const InfoBar = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing['2xl']};
  animation: ${fadeInUp} 0.5s ease 0.2s both;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const InfoCard = styled.div`
  flex: 1;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  text-align: center;

  .icon {
    font-size: 28px;
    margin-bottom: 8px;
  }

  h4 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.md};
    color: ${theme.colors.text};
    margin-bottom: 4px;
  }

  p {
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.textSecondary};
    line-height: 1.5;
  }
`;

/* ───── Component ───── */
export default function SecondHandPage() {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [condition, setCondition] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const models = brand ? getModelsByBrand(brand) : [];

  const handleBrandChange = (val: string) => {
    setBrand(val);
    setModel('');
  };

  const addFiles = (files: FileList | File[]) => {
    const newFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    const combined = [...photos, ...newFiles].slice(0, 10); // max 10
    setPhotos(combined);

    const newPreviews = combined.map(f => URL.createObjectURL(f));
    setPreviews(prev => {
      prev.forEach(u => URL.revokeObjectURL(u));
      return newPreviews;
    });
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    URL.revokeObjectURL(previews[index]);
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand || !model || !condition || !phone) {
      toast.error(isEn ? 'Please fill in all required fields.' : 'Lütfen zorunlu alanları doldurun.');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('brand', brand);
      formData.append('model', model);
      formData.append('condition', condition);
      formData.append('phone', phone);
      formData.append('notes', notes);
      formData.append('language', language);
      photos.forEach(p => formData.append('photos', p));

      const res = await fetch('/api/ikinci-el', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error(data.error || (isEn ? 'An error occurred.' : 'Bir hata oluştu.'));
      }
    } catch {
      toast.error(isEn ? 'Connection error.' : 'Bağlantı hatası.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <HeroSection>
        <HeroContent>
          <h1>
            {isEn ? (
              <>Sell Your <span>Analog Camera</span></>
            ) : (
              <><span>Analog Kameranızı</span> Satın</>
            )}
          </h1>
          <p>
            {isEn
              ? 'Looking to sell your analog camera? Fill out the form and we\'ll make you an offer via WhatsApp. We buy all brands and models.'
              : 'Kullanmadığınız analog kameranızı değerlendirmek mi istiyorsunuz? Formu doldurun, WhatsApp üzerinden size teklif yapalım. Tüm marka ve modelleri satın alıyoruz.'
            }
          </p>
        </HeroContent>
      </HeroSection>

      <Container>
        {submitted ? (
          <FormCard as="div">
            <SuccessBox>
              <HiCheckCircle />
              <h2>{isEn ? 'Your Request Has Been Sent!' : 'Talebiniz Gönderildi!'}</h2>
              <p>
                {isEn
                  ? 'We have received your camera information. Our team will review the details and contact you via WhatsApp to make an offer.'
                  : 'Kamera bilgilerinizi aldık. Ekibimiz detayları inceleyip WhatsApp üzerinden sizinle iletişime geçerek teklif yapacaktır.'
                }
              </p>
              <Button
                $variant="primary"
                $size="lg"
                onClick={() => {
                  setSubmitted(false);
                  setBrand('');
                  setModel('');
                  setCondition('');
                  setPhone('');
                  setNotes('');
                  setPhotos([]);
                  setPreviews([]);
                }}
              >
                {isEn ? 'Submit Another Camera' : 'Başka Kamera Gönder'}
              </Button>
            </SuccessBox>
          </FormCard>
        ) : (
          <FormCard onSubmit={handleSubmit}>
            <FormTitle>
              <HiCamera /> {isEn ? 'Camera Details' : 'Kamera Bilgileri'}
            </FormTitle>
            <FormSubtitle>
              {isEn
                ? 'Select your camera from our database with 250+ models. Fields marked with * are required.'
                : '250+ model içeren veritabanımızdan kameranızı seçin. * ile işaretli alanlar zorunludur.'
              }
            </FormSubtitle>

            {/* Brand & Model */}
            <FormRow>
              <FieldGroup>
                <Label>{isEn ? 'Camera Brand' : 'Kamera Markası'} *</Label>
                <Select value={brand} onChange={e => handleBrandChange(e.target.value)} required>
                  <option value="">{isEn ? '— Select Brand —' : '— Marka Seçin —'}</option>
                  {getAllBrands().map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </Select>
              </FieldGroup>

              <FieldGroup>
                <Label>{isEn ? 'Camera Model' : 'Kamera Modeli'} *</Label>
                <Select value={model} onChange={e => setModel(e.target.value)} required disabled={!brand}>
                  <option value="">
                    {!brand
                      ? (isEn ? '— Select brand first —' : '— Önce marka seçin —')
                      : (isEn ? '— Select Model —' : '— Model Seçin —')
                    }
                  </option>
                  {models.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </Select>
              </FieldGroup>
            </FormRow>

            {/* Condition & Phone */}
            <FormRow>
              <FieldGroup>
                <Label>{isEn ? 'Condition' : 'Durum'} *</Label>
                <Select value={condition} onChange={e => setCondition(e.target.value)} required>
                  <option value="">{isEn ? '— Select —' : '— Seçin —'}</option>
                  <option value={isEn ? 'Working' : 'Çalışıyor'}>
                    {isEn ? '✅ Working' : '✅ Çalışıyor'}
                  </option>
                  <option value={isEn ? 'Not Working' : 'Çalışmıyor'}>
                    {isEn ? '❌ Not Working' : '❌ Çalışmıyor'}
                  </option>
                  <option value={isEn ? 'Partially Working' : 'Kısmen Çalışıyor'}>
                    {isEn ? '⚠️ Partially Working' : '⚠️ Kısmen Çalışıyor'}
                  </option>
                </Select>
              </FieldGroup>

              <FieldGroup>
                <Label><HiPhone style={{ verticalAlign: 'middle', marginRight: '4px' }} />{isEn ? 'Phone Number' : 'Telefon Numarası'} *</Label>
                <Input
                  type="tel"
                  placeholder="05XX XXX XX XX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </FieldGroup>
            </FormRow>

            {/* Photos */}
            <FieldGroup>
              <Label><HiPhotograph style={{ verticalAlign: 'middle', marginRight: '4px' }} />{isEn ? 'Photos' : 'Fotoğraflar'}</Label>
              <DropZone
                $active={dragActive}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <HiPhotograph />
                <p>
                  {isEn
                    ? <>Drag & drop photos or <span>browse</span></>
                    : <>Fotoğrafları sürükleyin veya <span>seçin</span></>
                  }
                </p>
                <p style={{ fontSize: '12px', color: theme.colors.textMuted, marginTop: '4px' }}>
                  {isEn ? 'Max 10 images (JPG, PNG)' : 'Maks 10 görsel (JPG, PNG)'}
                </p>
              </DropZone>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => e.target.files && addFiles(e.target.files)}
              />
              {previews.length > 0 && (
                <PreviewGrid>
                  {previews.map((src, i) => (
                    <PreviewItem key={i}>
                      <img src={src} alt={`preview-${i}`} />
                      <button type="button" onClick={() => removePhoto(i)}>
                        <HiX />
                      </button>
                    </PreviewItem>
                  ))}
                </PreviewGrid>
              )}
            </FieldGroup>

            {/* Notes */}
            <FieldGroup>
              <Label>{isEn ? 'Additional Information' : 'Ek Bilgi'}</Label>
              <TextArea
                placeholder={isEn
                  ? 'Any details about the camera (accessories, defects, etc.)'
                  : 'Kamera hakkında detaylar (aksesuarlar, arızalar vb.)'
                }
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </FieldGroup>

            {/* Submit */}
            <Button
              $variant="primary"
              $size="lg"
              $fullWidth
              type="submit"
              disabled={submitting}
              style={{ marginTop: theme.spacing.md }}
            >
              <HiPaperAirplane style={{ transform: 'rotate(90deg)' }} />
              {submitting
                ? (isEn ? 'Sending...' : 'Gönderiliyor...')
                : (isEn ? 'Send Quote Request' : 'Teklif Talebi Gönder')
              }
            </Button>
          </FormCard>
        )}

        {/* Info Cards */}
        <InfoBar>
          <InfoCard>
            <div className="icon">📸</div>
            <h4>{isEn ? 'All Brands' : 'Tüm Markalar'}</h4>
            <p>{isEn ? 'Canon, Nikon, Leica, Contax, Hasselblad, Mamiya and more...' : 'Canon, Nikon, Leica, Contax, Hasselblad, Mamiya ve daha fazlası...'}</p>
          </InfoCard>
          <InfoCard>
            <div className="icon">💬</div>
            <h4>{isEn ? 'Quick Response' : 'Hızlı Dönüş'}</h4>
            <p>{isEn ? 'We will contact you via WhatsApp within 24 hours.' : '24 saat içinde WhatsApp üzerinden sizinle iletişime geçeceğiz.'}</p>
          </InfoCard>
          <InfoCard>
            <div className="icon">💰</div>
            <h4>{isEn ? 'Fair Prices' : 'Adil Fiyatlar'}</h4>
            <p>{isEn ? 'We offer competitive prices based on current market value.' : 'Güncel piyasa değerine göre rekabetçi fiyatlar sunuyoruz.'}</p>
          </InfoCard>
        </InfoBar>
      </Container>
    </PageWrapper>
  );
}
