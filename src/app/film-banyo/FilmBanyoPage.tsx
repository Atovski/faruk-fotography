'use client';

import { useState, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp, fadeIn, fadeInLeft, fadeInRight } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/Button';
import { FaWhatsapp, FaShippingFast, FaBoxOpen, FaFilm, FaCheckCircle } from 'react-icons/fa';
import { HiCamera, HiMail, HiPhone, HiLocationMarker, HiClipboardList, HiPhotograph, HiDownload, HiClock, HiCheck, HiExclamation, HiInformationCircle } from 'react-icons/hi';
import { getWhatsAppUrl } from '@/lib/utils';

/* ───── Layout ───── */
const PageWrapper = styled.div`
  padding-top: 72px;
`;

/* ───── Hero ───── */
const Hero = styled.section`
  position: relative;
  padding: ${theme.spacing['4xl']} 0;
  text-align: center;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 30% 50%, rgba(200, 164, 92, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 30%, rgba(27, 42, 74, 0.2) 0%, transparent 50%);
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 20px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.secondary}15;
  border: 1px solid ${theme.colors.secondary}40;
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.lg};
  animation: ${fadeInUp} 0.6s ease 0.1s both;
`;

const HeroTitle = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['5xl']};
  color: ${theme.colors.text};
  line-height: 1.15;
  margin-bottom: ${theme.spacing.md};
  animation: ${fadeInUp} 0.6s ease 0.2s both;

  span { color: ${theme.colors.secondary}; }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

const HeroSub = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textSecondary};
  max-width: 700px;
  margin: 0 auto ${theme.spacing['2xl']};
  line-height: 1.7;
  animation: ${fadeInUp} 0.6s ease 0.35s both;
`;

const HeroCTAs = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  animation: ${fadeInUp} 0.6s ease 0.5s both;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing['3xl']};
  margin-top: ${theme.spacing['3xl']};
  flex-wrap: wrap;
  animation: ${fadeInUp} 0.6s ease 0.65s both;
`;

const Stat = styled.div`
  text-align: center;
  .num {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes['3xl']};
    color: ${theme.colors.secondary};
    font-weight: 700;
  }
  .label {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.textSecondary};
    margin-top: 2px;
  }
`;

/* ───── Sections ───── */
const Section = styled.section<{ $alt?: boolean; $tightBottom?: boolean; $tightTop?: boolean }>`
  padding: ${theme.spacing['4xl']} 0;
  ${({ $tightBottom }) => $tightBottom && css`padding-bottom: ${theme.spacing.xl};`}
  ${({ $tightTop }) => $tightTop && css`padding-top: ${theme.spacing.xl};`}
  ${({ $alt }) => $alt && css`
    background: linear-gradient(180deg, ${theme.colors.primaryDark}40 0%, transparent 100%);
  `}
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
  animation: ${fadeIn} 0.6s ease;

  h2 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes['3xl']};
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    font-size: ${theme.fontSizes.md};
    color: ${theme.colors.textSecondary};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const GoldLine = styled.div`
  width: 50px;
  height: 3px;
  background: ${theme.colors.secondary};
  border-radius: 2px;
  margin: ${theme.spacing.md} auto;
`;

/* ───── Steps ───── */
const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  text-align: center;
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.xl};
  background: ${theme.colors.glassBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.glassBorder};
  position: relative;
  transition: all ${theme.transitions.normal};
  animation: ${fadeInUp} 0.5s ease forwards;

  &:hover {
    border-color: ${theme.colors.secondary}50;
    transform: translateY(-4px);
  }
`;

const StepNumber = styled.div`
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${theme.colors.secondary};
  color: ${theme.colors.primaryDark};
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.secondary}15;
  color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin: 0 auto ${theme.spacing.md};
`;

const StepTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
`;

const StepDesc = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
`;

/* ───── Info You Must Send ───── */
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['2xl']};

  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: ${theme.colors.glassBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  animation: ${fadeInUp} 0.5s ease forwards;
`;

const InfoTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: 10px;

  svg { color: ${theme.colors.secondary}; }
`;

const CheckList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CheckItem = styled.li<{ $type?: 'check' | 'warn' | 'info' }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textSecondary};
  line-height: 1.5;

  svg {
    flex-shrink: 0;
    margin-top: 3px;
    color: ${({ $type }) =>
      $type === 'warn' ? theme.colors.warning :
      $type === 'info' ? '#5B9BD5' :
      theme.colors.success};
  }
`;

/* ───── Pricing ───── */
const PriceTable = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  border: 1px solid ${theme.colors.glassBorder};
  animation: ${fadeInUp} 0.5s ease;

  th, td {
    padding: 16px 20px;
    text-align: left;
    font-size: ${theme.fontSizes.sm};
  }

  th {
    background: ${theme.colors.surface};
    color: ${theme.colors.secondary};
    font-weight: 600;
    font-family: ${theme.fonts.heading};
    border-bottom: 1px solid ${theme.colors.glassBorder};
  }

  td {
    background: ${theme.colors.glassBg};
    color: ${theme.colors.textSecondary};
    border-bottom: 1px solid ${theme.colors.glassBorder};
  }

  tr:last-child td { border-bottom: none; }

  tr:hover td {
    background: ${theme.colors.surface};
  }

  .price {
    font-family: ${theme.fonts.heading};
    font-weight: 700;
    color: ${theme.colors.secondary};
    font-size: ${theme.fontSizes.lg};
  }
`;

/* ───── FAQ ───── */
const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
  }
`;

const FAQCard = styled.div`
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.xl};
  background: ${theme.colors.glassBg};
  border: 1px solid ${theme.colors.glassBorder};
  animation: ${fadeInUp} 0.4s ease forwards;

  h4 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.md};
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.textSecondary};
    line-height: 1.7;
  }
`;

/* ───── CTA Banner ───── */
const CTABanner = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.xl};
  background: linear-gradient(135deg, ${theme.colors.primaryDark} 0%, ${theme.colors.primary} 100%);
  border: 1px solid ${theme.colors.secondary}30;
  animation: ${fadeIn} 0.6s ease;

  h2 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes['2xl']};
    color: #FFFFFF;
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    color: rgba(255,255,255,0.8);
    margin-bottom: ${theme.spacing.xl};
    font-size: ${theme.fontSizes.md};
  }
`;

const CTAButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const AddressBox = styled.div`
  margin-top: ${theme.spacing['2xl']};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;

  .label {
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.secondary};
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
  }

  .addr {
    font-size: ${theme.fontSizes.md};
    color: ${theme.colors.text};
    font-weight: 500;
  }

  .note {
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.textMuted};
  }
`;

/* ───── Configurator ───── */
const ConfiguratorWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['2xl']};
  align-items: start;
  animation: ${fadeInUp} 0.6s ease;

  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
  }
`;

const ConfiguratorImage = styled.div`
  position: relative;
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  aspect-ratio: 4/3;
  background:
    radial-gradient(ellipse at 30% 40%, ${theme.colors.secondary}15 0%, transparent 60%),
    ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 120px;
  color: ${theme.colors.secondary}20;

  .overlay-text {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: ${theme.spacing.lg};
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
    color: ${theme.colors.text};
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.lg};
  }
`;

const ConfiguratorPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const ConfigTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs};
`;

const PriceRange = styled.div`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.secondary};
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};

  span {
    font-size: ${theme.fontSizes.lg};
    color: ${theme.colors.textSecondary};
    font-weight: 400;
  }
`;

const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SelectLabel = styled.label`
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.text};
  letter-spacing: 0.5px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 14px 18px;
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.glassBorder};
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.md};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23C8A45C' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;

  &:focus {
    outline: none;
    border-color: ${theme.colors.secondary};
    box-shadow: 0 0 0 3px ${theme.colors.secondary}20;
  }

  &:hover {
    border-color: ${theme.colors.secondary}80;
  }

  option {
    background: ${theme.colors.surface};
    color: ${theme.colors.text};
  }
`;

const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.sm};
`;

const QuantityBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.glassBorder};
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.secondary};
    color: ${theme.colors.secondary};
  }
`;

const QuantityDisplay = styled.span`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text};
  min-width: 32px;
  text-align: center;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.secondary}10;
  border: 1px solid ${theme.colors.secondary}30;
  margin-top: ${theme.spacing.sm};

  .label {
    font-size: ${theme.fontSizes.md};
    color: ${theme.colors.textSecondary};
  }

  .total {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes['2xl']};
    font-weight: 700;
    color: ${theme.colors.secondary};
  }
`;

/* ───── Component ───── */
export default function FilmBanyoPage() {
  const { t } = useLanguage();

  // Film configurator state
  const [filmType, setFilmType] = useState('');
  const [filmFormat, setFilmFormat] = useState('');
  const [scanRes, setScanRes] = useState('');
  const [quantity, setQuantity] = useState(1);

  const unitPrice = useMemo(() => {
    if (!filmType || !filmFormat || !scanRes) return 0;
    if (filmType === 'dia') {
      return scanRes === '4k' ? 900 : 700;
    }
    // Renkli or Siyah/Beyaz
    return scanRes === '4k' ? 700 : 500;
  }, [filmType, filmFormat, scanRes]);

  const totalPrice = unitPrice * quantity;
  const allSelected = filmType && filmFormat && scanRes;

  return (
    <PageWrapper>
      {/* ── HERO ── */}
      <Hero>
        <Container>
          <HeroBadge>🎞️ Türkiye Geneli Hizmet</HeroBadge>
          <HeroTitle>
            Profesyonel <span>Film Banyo</span> Hizmeti
          </HeroTitle>
          <HeroSub>
            1969&apos;dan beri İstanbul Sirkeci&apos;de analog film banyo yapıyoruz. 
            Artık Türkiye&apos;nin her yerinden <strong>kargo ile film gönderebilir</strong>, 
            fotoğraflarınızı dijital olarak teslim alabilirsiniz.
          </HeroSub>
          <HeroCTAs>
            <Button
              as="a"
              href={getWhatsAppUrl('Merhaba, kargo ile film banyo yaptırmak istiyorum.')}
              target="_blank"
              $variant="whatsapp"
              $size="lg"
            >
              <FaWhatsapp /> Film Banyo Siparişi Ver
            </Button>
            <Button
              as="a"
              href="#nasil-gonderirim"
              $variant="outline"
              $size="lg"
            >
              📦 Nasıl Gönderirim?
            </Button>
          </HeroCTAs>

          <StatsRow>
            <Stat><div className="num">55+</div><div className="label">Yıllık Tecrübe</div></Stat>
            <Stat><div className="num">50K+</div><div className="label">Banyo Edilen Film</div></Stat>
            <Stat><div className="num">24 Saat</div><div className="label">Ortalama Teslim</div></Stat>
            <Stat><div className="num">81 İl</div><div className="label">Kargo Hizmeti</div></Stat>
          </StatsRow>
        </Container>
      </Hero>

      {/* ── NASIL ÇALIŞIR ── */}
      <Section id="nasil-gonderirim" style={{ paddingBottom: '16px' }}>
        <Container>
          <SectionHeader>
            <h2>Nasıl Çalışır?</h2>
            <GoldLine />
            <p>4 basit adımda film banyo süreci</p>
          </SectionHeader>

          <StepsGrid>
            <StepCard style={{ animationDelay: '0s' }}>
              <StepNumber>1</StepNumber>
              <StepIcon><FaWhatsapp /></StepIcon>
              <StepTitle>Bize Ulaşın</StepTitle>
              <StepDesc>WhatsApp üzerinden film bilgilerinizi paylaşın. Size gönderi adresi ve detayları ileteceğiz.</StepDesc>
            </StepCard>

            <StepCard style={{ animationDelay: '0.1s' }}>
              <StepNumber>2</StepNumber>
              <StepIcon><FaBoxOpen /></StepIcon>
              <StepTitle>Filmi Kargolayın</StepTitle>
              <StepDesc>Filminizi güvenli bir şekilde paketleyin ve belirtilen adrese kargolayın. Bilgi notunu eklemeyi unutmayın.</StepDesc>
            </StepCard>

            <StepCard style={{ animationDelay: '0.2s' }}>
              <StepNumber>3</StepNumber>
              <StepIcon><FaFilm /></StepIcon>
              <StepTitle>Banyo & Tarama</StepTitle>
              <StepDesc>Filminiz aynı gün veya ertesi gün profesyonel olarak banyo edilir ve yüksek çözünürlükte taranır.</StepDesc>
            </StepCard>

            <StepCard style={{ animationDelay: '0.3s' }}>
              <StepNumber>4</StepNumber>
              <StepIcon><HiDownload /></StepIcon>
              <StepTitle>Dijital Teslim</StepTitle>
              <StepDesc>Taranmış fotoğraflarınız online galeri üzerinden size iletilir. İstediğiniz zaman indirin.</StepDesc>
            </StepCard>
          </StepsGrid>

          <AddressBox style={{ marginTop: '32px', display: 'flex', width: '100%', maxWidth: '100%', textAlign: 'center', alignItems: 'center' }}>
            <span className="label">📦 Kargo Gönderim Adresi</span>
            <span className="addr">Faruk Fotoğrafçılık — Hobyar, Ankara Cd. No:55/A, 34112 Fatih/İstanbul</span>
            <span className="note">* Lütfen gönderimden önce WhatsApp ile bize bilgi verin</span>
          </AddressBox>
        </Container>
      </Section>

      {/* ── FİLMLE BİRLİKTE GÖNDERMENİZ GEREKENLER ── */}
      <Section $alt style={{ paddingTop: '16px' }}>
        <Container>
          <SectionHeader>
            <h2>Filmle Birlikte Göndermeniz Gerekenler</h2>
            <GoldLine />
            <p>Doğru ve hızlı işlem için lütfen aşağıdaki bilgileri filminizle birlikte gönderin</p>
          </SectionHeader>

          <InfoGrid>
            <InfoCard style={{ animationDelay: '0s' }}>
              <InfoTitle><HiClipboardList size={24} /> Bilgi Notu (Gerekli)</InfoTitle>
              <CheckList>
                <CheckItem $type="check"><FaCheckCircle size={16} /> <strong>Ad Soyad</strong> ve <strong>Telefon Numarası</strong></CheckItem>
                <CheckItem $type="check"><FaCheckCircle size={16} /> Film türü: <strong>Renkli (C-41)</strong> veya <strong>Siyah-Beyaz</strong></CheckItem>
                <CheckItem $type="check"><FaCheckCircle size={16} /> Film formatı: <strong>35mm</strong> veya <strong>120mm (Roll Film)</strong></CheckItem>
                <CheckItem $type="check"><FaCheckCircle size={16} /> İstediğiniz tarama çözünürlüğü: <strong>Standart</strong> veya <strong>Yüksek</strong></CheckItem>
                <CheckItem $type="check"><FaCheckCircle size={16} /> Negatif iade istiyorsanız <strong>belirtin</strong> (iade kargo ücreti size aittir)</CheckItem>
                <CheckItem $type="check"><FaCheckCircle size={16} /> Film sayısı (birden fazla film gönderiyorsanız)</CheckItem>
              </CheckList>
            </InfoCard>

            <InfoCard style={{ animationDelay: '0.1s' }}>
              <InfoTitle><HiExclamation size={24} /> Paketleme & Gönderim İpuçları</InfoTitle>
              <CheckList>
                <CheckItem $type="warn"><HiExclamation size={16} /> Filmi <strong>balonlu zarfa</strong> veya darbe emici malzemeyle sarın</CheckItem>
                <CheckItem $type="warn"><HiExclamation size={16} /> <strong>&ldquo;Kırılacak / Dikkat&rdquo;</strong> etiketi yapıştırın</CheckItem>
                <CheckItem $type="warn"><HiExclamation size={16} /> Filmi <strong>X-ray geçişine karşı</strong> kurşun poşete koymaya gerek yok (kargo X-ray&apos;i zarar vermez)</CheckItem>
                <CheckItem $type="info"><HiInformationCircle size={16} /> Ödemeyi <strong>havale/EFT</strong> veya <strong>kapıda ödeme</strong> ile yapabilirsiniz</CheckItem>
                <CheckItem $type="info"><HiInformationCircle size={16} /> Bilgi notunu kağıda yazıp filmin yanına koyun veya WhatsApp&apos;tan gönderin</CheckItem>
                <CheckItem $type="info"><HiInformationCircle size={16} /> <strong>Aras Kargo</strong> veya <strong>Yurtiçi Kargo</strong> tercih edin (anlaşmalı firmalar)</CheckItem>
              </CheckList>
            </InfoCard>
          </InfoGrid>
        </Container>
      </Section>

      {/* ── FİYATLAR ── */}
      <Section>
        <Container>
          <SectionHeader>
            <h2>Film Banyo Fiyatları</h2>
            <GoldLine />
            <p>Seçeneklerinizi belirleyin, fiyatı anında görün ve online ödeme yapın</p>
          </SectionHeader>

          <ConfiguratorWrapper>
            <ConfiguratorImage>
              🎞️
              <div className="overlay-text">
                Film Yıkama (Banyo) ve Tarama
              </div>
            </ConfiguratorImage>

            <ConfiguratorPanel>
              <ConfigTitle>Film Yıkama (Banyo) ve Tarama</ConfigTitle>
              <PriceRange>
                {allSelected ? (
                  <>{`₺${unitPrice.toLocaleString('tr-TR')},00`}</>
                ) : (
                  <>₺500,00 <span> — </span> ₺900,00</>
                )}
              </PriceRange>

              <SelectGroup>
                <SelectLabel>Tür</SelectLabel>
                <StyledSelect value={filmType} onChange={(e) => setFilmType(e.target.value)} id="film-type-select">
                  <option value="">Bir seçim yapın</option>
                  <option value="dia">Dia (E-6 Slide)</option>
                  <option value="renkli">Renkli (C-41)</option>
                  <option value="siyahbeyaz">Siyah / Beyaz</option>
                </StyledSelect>
              </SelectGroup>

              <SelectGroup>
                <SelectLabel>Format</SelectLabel>
                <StyledSelect value={filmFormat} onChange={(e) => setFilmFormat(e.target.value)} id="film-format-select">
                  <option value="">Bir seçim yapın</option>
                  <option value="35mm">35mm</option>
                  <option value="120mm">120mm</option>
                </StyledSelect>
              </SelectGroup>

              <SelectGroup>
                <SelectLabel>Tarama</SelectLabel>
                <StyledSelect value={scanRes} onChange={(e) => setScanRes(e.target.value)} id="film-scan-select">
                  <option value="">Bir seçim yapın</option>
                  <option value="2k">2K (Standart Çözünürlük)</option>
                  <option value="4k">4K (Yüksek Çözünürlük)</option>
                </StyledSelect>
              </SelectGroup>

              <QuantityRow>
                <QuantityBtn onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</QuantityBtn>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityBtn onClick={() => setQuantity(q => q + 1)}>+</QuantityBtn>
                <span style={{ color: theme.colors.textSecondary, fontSize: theme.fontSizes.sm }}>Film Adedi</span>
              </QuantityRow>

              {allSelected && (
                <TotalPrice>
                  <span className="label">Toplam ({quantity} film):</span>
                  <span className="total">₺{totalPrice.toLocaleString('tr-TR')},00</span>
                </TotalPrice>
              )}

              <Button
                as="button"
                onClick={() => alert('Sanal POS entegrasyonu (iyzico / PayTR vs.) bu butona bağlanacaktır.')}
                $variant="primary"
                $size="lg"
                disabled={!allSelected}
                style={{
                  padding: '16px 32px',
                  fontSize: '18px',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  width: '100%',
                  opacity: allSelected ? 1 : 0.4,
                  cursor: allSelected ? 'pointer' : 'not-allowed',
                }}
              >
                💳 Ödeme Yap & Kargola
              </Button>

              <p style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textMuted, textAlign: 'center', lineHeight: 1.6 }}>
                Ödeme sonrası filminizi belirtilen adrese kargolayabilirsiniz.<br />
                Havale/EFT ile de ödeme yapabilirsiniz — WhatsApp ile iletişime geçin.
              </p>
            </ConfiguratorPanel>
          </ConfiguratorWrapper>
        </Container>
      </Section>

      {/* ── DESTEKLENEN FİLMLER ── */}
      <Section $alt>
        <Container>
          <SectionHeader>
            <h2>Desteklenen Film Türleri</h2>
            <GoldLine />
            <p>Her marka ve formattaki analog filminizi banyo ediyoruz</p>
          </SectionHeader>

          <FAQGrid>
            <InfoCard>
              <InfoTitle>🎨 Renkli Filmler (C-41)</InfoTitle>
              <CheckList>
                <CheckItem $type="check"><HiCheck size={16} /> Kodak Gold, ColorPlus, UltraMax</CheckItem>
                <CheckItem $type="check"><HiCheck size={16} /> Kodak Portra 160 / 400 / 800</CheckItem>
                <CheckItem $type="check"><HiCheck size={16} /> Kodak Ektar 100</CheckItem>
                <CheckItem $type="check"><HiCheck size={16} /> Fujifilm C200, Superia</CheckItem>
                <CheckItem $type="check"><HiCheck size={16} /> Fujifilm Pro 400H</CheckItem>
                <CheckItem $type="check"><HiCheck size={16} /> Lomography Color 100/400/800</CheckItem>
                <CheckItem $type="check"><HiCheck size={16} /> Tüm C-41 proses filmler</CheckItem>
              </CheckList>
            </InfoCard>

            <InfoCard>
              <InfoTitle>⬛ Siyah-Beyaz Filmler</InfoTitle>
              <CheckList>
                <CheckItem $type="check"><HiCheck size={16} /> Ilford HP5 Plus, Delta 100/400/3200</CheckItem>
                <CheckItem $type="check"><HiCheck size={16} /> Ilford FP4 Plus, Pan F Plus</CheckItem>
                <CheckItem $type="check"><HiCheck size={16} /> Kodak Tri-X 400, T-Max 100/400</CheckItem>
                <CheckItem $type="check"><HiCheck size={16} /> Fomapan 100/200/400</CheckItem>
                <CheckItem $type="check"><HiCheck size={16} /> Rollei RPX 25/100/400</CheckItem>
                <CheckItem $type="check"><HiCheck size={16} /> Tüm standart S/B filmler</CheckItem>
              </CheckList>
            </InfoCard>

            <InfoCard>
              <InfoTitle>🌈 Slide Filmler (E-6)</InfoTitle>
              <CheckList>
                <CheckItem $type="check"><HiCheck size={16} /> Fujifilm Provia 100F</CheckItem>
                <CheckItem $type="check"><HiCheck size={16} /> Fujifilm Velvia 50/100</CheckItem>
                <CheckItem $type="check"><HiCheck size={16} /> Kodak Ektachrome E100</CheckItem>
              </CheckList>
            </InfoCard>

            <InfoCard>
              <InfoTitle>📷 Tek Kullanımlık Kameralar</InfoTitle>
              <CheckList>
                <CheckItem $type="check"><HiCheck size={16} /> Kodak FunSaver</CheckItem>
                <CheckItem $type="check"><HiCheck size={16} /> Fujifilm Simple Ace / QuickSnap</CheckItem>
                <CheckItem $type="check"><HiCheck size={16} /> Ilford HP5 Disposable</CheckItem>
                <CheckItem $type="check"><HiCheck size={16} /> Tüm tek kullanımlık kameralar</CheckItem>
              </CheckList>
            </InfoCard>
          </FAQGrid>
        </Container>
      </Section>

      {/* ── SSS ── */}
      <Section>
        <Container>
          <SectionHeader>
            <h2>Sıkça Sorulan Sorular</h2>
            <GoldLine />
          </SectionHeader>

          <FAQGrid>
            <FAQCard style={{ animationDelay: '0s' }}>
              <h4>Film banyo ne kadar sürer?</h4>
              <p>Filminiz elimize ulaştığında genellikle aynı gün veya ertesi gün banyo edilir. Yoğun dönemlerde en fazla 2 iş günü sürebilir. Taranmış fotoğraflarınız dijital olarak size iletilir.</p>
            </FAQCard>
            <FAQCard style={{ animationDelay: '0.08s' }}>
              <h4>Kargo ücreti ne kadar?</h4>
              <p>Gönderim kargo ücretini siz karşılarsınız. Negatif iade isterseniz dönüş kargosu da size aittir. Fotoğraflar dijital teslim edildiği için genellikle iade gerekmez.</p>
            </FAQCard>
            <FAQCard style={{ animationDelay: '0.16s' }}>
              <h4>Fotoğrafları nasıl teslim alacağım?</h4>
              <p>Taranmış fotoğraflarınız yüksek çözünürlüklü JPEG veya TIFF formatında, güvenli online galeri linki üzerinden size WhatsApp veya e-posta ile iletilir.</p>
            </FAQCard>
            <FAQCard style={{ animationDelay: '0.24s' }}>
              <h4>Negatiflerimi geri alabilir miyim?</h4>
              <p>Evet! Sipariş esnasında negatif iade talebinde bulunursanız, negatifleri size kargo ile geri göndeririz. Dönüş kargo ücreti alıcıya aittir.</p>
            </FAQCard>
            <FAQCard style={{ animationDelay: '0.32s' }}>
              <h4>Hangi ödeme yöntemlerini kabul ediyorsunuz?</h4>
              <p>Havale/EFT, kapıda ödeme ve mağaza içi nakit ödeme kabul ediyoruz. Ödeme detayları WhatsApp üzerinden iletilir.</p>
            </FAQCard>
            <FAQCard style={{ animationDelay: '0.4s' }}>
              <h4>Kargo sırasında filmim zarar görür mü?</h4>
              <p>Filmi balonlu zarfa veya darbe emici malzemeyle sardığınız sürece sorun yaşanmaz. Kargo şirketlerinin X-ray cihazları filme zarar vermez.</p>
            </FAQCard>
          </FAQGrid>
        </Container>
      </Section>

      {/* ── CTA BANNER ── */}
      <Section $alt>
        <Container>
          <CTABanner>
            <h2>🎞️ Filminizi Bize Gönderin</h2>
            <p>Türkiye&apos;nin neresinde olursanız olun, filminizi kargolayın, biz banyo edelim.</p>

            <CTAButtons>
              <Button
                as="a"
                href={getWhatsAppUrl('Merhaba, kargo ile film banyo yaptırmak istiyorum. Film bilgilerimi paylaşmak istiyorum.')}
                target="_blank"
                $variant="whatsapp"
                $size="lg"
              >
                <FaWhatsapp /> WhatsApp ile Sipariş Ver
              </Button>
              <Button as="a" href="tel:+905324402957" $variant="outline" $size="lg">
                <HiPhone /> 0532 440 29 57
              </Button>
            </CTAButtons>

            <AddressBox>
              <span className="label">📦 Kargo Gönderim Adresi</span>
              <span className="addr">Faruk Fotoğrafçılık — Hobyar, Ankara Cd. No:55/A, 34112 Fatih/İstanbul</span>
              <span className="note">* Lütfen gönderimden önce WhatsApp ile bize bilgi verin</span>
            </AddressBox>
          </CTABanner>
        </Container>
      </Section>
    </PageWrapper>
  );
}
