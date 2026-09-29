'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { theme } from '@/styles/theme';
import { fadeInUp } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedHref } from '@/i18n/config';
import SectionTitle from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { HiArrowRight } from 'react-icons/hi';
import { FaFilm, FaCameraRetro, FaRing } from 'react-icons/fa';

/**
 * The film side of the business: unlike the document photos, these are posted
 * to us from anywhere in Turkey, so they are grouped separately and lead with
 * the two-hour turnaround rather than the Sirkeci address.
 */

const Section = styled.section`
  padding: ${theme.spacing['4xl']} 0;
  position: relative;
  background: ${theme.colors.surface};
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
    max-width: 560px;
    margin: 0 auto;
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  display: block;
  height: 100%;
`;

const FilmCard = styled(Card)`
  padding: ${theme.spacing.xl};
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${({ style }) => style?.animationDelay || '0s'};
  opacity: 0;

  &:hover .film-icon {
    background: ${theme.colors.secondary};
    color: ${theme.colors.primaryDark};
  }

  &:hover .film-more {
    gap: 10px;
  }
`;

const IconWrapper = styled.div`
  width: 52px;
  height: 52px;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.secondary}15;
  color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: ${theme.spacing.sm};
  transition: all ${theme.transitions.spring};
`;

const CardTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text};
`;

const CardDesc = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  line-height: 1.7;
`;

const PriceTag = styled.span`
  display: inline-block;
  margin-top: auto;
  padding-top: ${theme.spacing.md};
  font-size: ${theme.fontSizes.sm};
  font-weight: 700;
  color: ${theme.colors.text};
`;

const MoreLink = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.secondary};
  transition: gap ${theme.transitions.fast};
`;

const Note = styled.p`
  margin-top: ${theme.spacing.xl};
  text-align: center;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};

  strong {
    color: ${theme.colors.secondary};
  }
`;

const items = [
  {
    icon: FaFilm,
    basePath: '/film-banyo',
    tr: {
      title: 'Film Banyo & Tarama',
      desc: '35mm renkli, siyah-beyaz ve 120 orta format film banyosu. Kargoyla gönderin, taramalarınız galeri bağlantısıyla gelsin.',
      price: '₺600’den başlayan fiyatlarla',
    },
    en: {
      title: 'Film Developing & Scanning',
      desc: '35mm colour, black & white and 120 medium format. Post it to us and download your scans from a private gallery.',
      price: 'From ₺600',
    },
  },
  {
    icon: FaCameraRetro,
    basePath: '/cek-at-kamera-banyo',
    tr: {
      title: 'Çek-At Kamera Banyosu',
      desc: 'Düğünde, mezuniyette ya da tatilde çektiğiniz tek kullanımlık kamera. Şehrinizde laboratuvar olmasına gerek yok.',
      price: '₺600’den başlayan fiyatlarla',
    },
    en: {
      title: 'Disposable Camera Developing',
      desc: 'The single-use camera from a wedding, a graduation or your trip. No lab in your city? It does not matter.',
      price: 'From ₺600',
    },
  },
  {
    icon: FaRing,
    basePath: '/dugun-cek-at-kamera',
    trOnly: true,
    tr: {
      title: 'Düğün Çek-At Paketi',
      desc: 'Masalara kamera bırakın, misafirleriniz çeksin. 5, 10 ve 20 kameralı paketler kargoyla adresinize gelir.',
      price: '5’li ₺7.500 · 10’lu ₺14.000 · 20’li ₺27.000',
    },
    en: {
      title: 'Wedding Camera Package',
      desc: 'Leave a camera on each table and let your guests shoot. Packages of 5, 10 and 20 posted to your address.',
      price: '',
    },
  },
];

export default function FilmServicesSection() {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const visible = items.filter((item) => !(item.trOnly && isEn));

  return (
    <Section id="film-services">
      <Container>
        <SectionTitle
          badge={isEn ? 'POSTED TO US FROM ANYWHERE IN TURKEY' : 'TÜRKİYE’NİN HER YERİNDEN KARGOYLA'}
          title={isEn ? 'Film & Disposable Cameras' : 'Film ve Çek-At Kamera'}
        />
        <Grid>
          {visible.map((item, index) => {
            const Icon = item.icon;
            const copy = isEn ? item.en : item.tr;
            return (
              <CardLink key={item.basePath} href={getLocalizedHref(item.basePath, language)}>
                <FilmCard style={{ animationDelay: `${index * 0.1}s` }}>
                  <IconWrapper className="film-icon">
                    <Icon />
                  </IconWrapper>
                  <CardTitle>{copy.title}</CardTitle>
                  <CardDesc>{copy.desc}</CardDesc>
                  {copy.price && <PriceTag>{copy.price}</PriceTag>}
                  <MoreLink className="film-more">
                    {isEn ? 'Details' : 'Detaylı Bilgi'} <HiArrowRight />
                  </MoreLink>
                </FilmCard>
              </CardLink>
            );
          })}
        </Grid>
        <Note>
          {isEn ? (
            <>Your film is developed and scanned <strong>within two hours</strong> of reaching us.</>
          ) : (
            <>Filminiz elimize ulaştıktan <strong>2 saat sonra</strong> banyo edilip taranır.</>
          )}
        </Note>
      </Container>
    </Section>
  );
}
