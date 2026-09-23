'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { theme } from '@/styles/theme';
import { fadeInUp } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedHref } from '@/i18n/config';
import SectionTitle from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { HiIdentification, HiHome, HiGlobeAlt, HiPhotograph, HiArrowRight } from 'react-icons/hi';

/**
 * Passport/residence/visa photos are the shop's most profitable work and the
 * destination of the Google Ads traffic, but the four landing pages had no
 * link from the home page — a visitor who arrived for an ikamet photo could
 * not reach that page. This section is the internal link hub for them.
 */

const Section = styled.section`
  padding: ${theme.spacing['4xl']} 0;
  position: relative;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  display: block;
  height: 100%;
`;

const DocCard = styled(Card)`
  padding: ${theme.spacing.xl};
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${({ style }) => style?.animationDelay || '0s'};
  opacity: 0;

  &:hover .doc-icon {
    background: ${theme.colors.secondary};
    color: ${theme.colors.primaryDark};
  }

  &:hover .doc-more {
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
  font-size: 26px;
  margin-bottom: ${theme.spacing.sm};
  transition: all ${theme.transitions.spring};
`;

const DocTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text};
`;

const DocDesc = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  line-height: 1.7;
`;

const TagRow = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: auto;
  padding-top: ${theme.spacing.md};
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.li`
  padding: 3px 10px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  background: ${theme.colors.surface};
  color: ${theme.colors.textSecondary};
  border: 1px solid ${theme.colors.glassBorder};
`;

const MoreLink = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: ${theme.spacing.md};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.secondary};
  transition: gap ${theme.transitions.fast};
`;

const items = [
  {
    icon: HiIdentification,
    basePath: '/vesikalik-fotograf',
    tr: {
      title: 'Vesikalık Fotoğraf',
      desc: 'Pasaport, kimlik ve ehliyet başvuruları için biyometrik vesikalık. Dakikalar içinde hazır.',
      tags: ['Pasaport', 'Kimlik', 'Ehliyet'],
    },
    en: {
      title: 'Passport Photo',
      desc: 'Biometric photos for passport, ID card and driving licence applications. Ready in minutes.',
      tags: ['Passport', 'ID card', 'Licence'],
    },
  },
  {
    icon: HiHome,
    basePath: '/ikamet-fotografi',
    tr: {
      title: 'İkamet İzni Fotoğrafı',
      desc: 'Göç İdaresi ve e-İkamet başvuruları için ICAO standardında biyometrik fotoğraf.',
      tags: ['Göç İdaresi', 'e-İkamet', 'Çalışma izni'],
    },
    en: {
      title: 'Residence Permit Photo',
      desc: 'ICAO-standard biometric photos for Göç İdaresi and e-İkamet applications.',
      tags: ['Göç İdaresi', 'e-İkamet', 'Work permit'],
    },
  },
  {
    icon: HiGlobeAlt,
    basePath: '/vize-fotografi',
    tr: {
      title: 'Vize Fotoğrafı',
      desc: 'Schengen, ABD, Çin ve diğer tüm ülkelerin konsolosluk ölçülerine uygun çekim.',
      tags: ['Schengen', 'ABD', 'Çin'],
    },
    en: {
      title: 'Visa Photo',
      desc: 'Shot to the consulate size of Schengen, the USA, China and every other country.',
      tags: ['Schengen', 'USA', 'China'],
    },
  },
  {
    icon: HiPhotograph,
    basePath: '/fotograf-baski',
    tr: {
      title: 'Fotoğraf Baskı',
      desc: 'Telefonunuzdaki kareleri profesyonel kağıda basıyoruz. Tüm boyutlar, aynı gün teslim.',
      tags: ['10x15', 'Poster', 'Kanvas'],
    },
    en: {
      title: 'Photo Printing',
      desc: 'We print the photos on your phone on professional paper. All sizes, same-day pickup.',
      tags: ['10x15', 'Poster', 'Canvas'],
    },
  },
];

export default function DocumentPhotoSection() {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <Section id="document-photos">
      <Container>
        <SectionTitle
          badge={isEn ? 'IN SIRKECI SINCE 1969' : "SİRKECİ'DE 1969'DAN BERİ"}
          title={isEn ? 'Document Photos' : 'Belge Fotoğrafları'}
        />
        <Grid>
          {items.map((item, index) => {
            const Icon = item.icon;
            const copy = isEn ? item.en : item.tr;
            return (
              <CardLink key={item.basePath} href={getLocalizedHref(item.basePath, language)}>
                <DocCard style={{ animationDelay: `${index * 0.1}s` }}>
                  <IconWrapper className="doc-icon">
                    <Icon />
                  </IconWrapper>
                  <DocTitle>{copy.title}</DocTitle>
                  <DocDesc>{copy.desc}</DocDesc>
                  <TagRow>
                    {copy.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagRow>
                  <MoreLink className="doc-more">
                    {isEn ? 'Details' : 'Detaylı Bilgi'} <HiArrowRight />
                  </MoreLink>
                </DocCard>
              </CardLink>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
