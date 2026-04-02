'use client';

import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import SectionTitle from '@/components/ui/SectionTitle';
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

const StorySection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['3xl']};
  align-items: center;
  margin-bottom: ${theme.spacing['4xl']};

  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
  }
`;

const StoryContent = styled.div`
  animation: ${fadeInLeft} 0.8s ease forwards;
`;

const StoryTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xl};
  line-height: 1.3;

  span {
    color: ${theme.colors.secondary};
  }
`;

const StoryParagraph = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textSecondary};
  line-height: 1.9;
  margin-bottom: ${theme.spacing.lg};
`;

const ImageWrapper = styled.div`
  animation: ${fadeInRight} 0.8s ease forwards;
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  border: 1px solid ${theme.colors.glassBorder};
  background: ${theme.colors.gradientCard};
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, ${theme.colors.secondary}08 0%, transparent 70%);
  }
`;

const LogoLarge = styled.div`
  text-align: center;
  z-index: 1;

  img {
    filter: drop-shadow(0 0 30px rgba(200, 164, 92, 0.2));
  }

  p {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes['2xl']};
    color: ${theme.colors.secondary};
    margin-top: ${theme.spacing.md};
    letter-spacing: 3px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['3xl']};

  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.xl};
  background: ${theme.colors.glassBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.glassBorder};
  transition: all ${theme.transitions.normal};
  animation: ${fadeInUp} 0.6s ease forwards;

  &:hover {
    border-color: ${theme.colors.secondary}40;
    transform: translateY(-4px);
  }
`;

const StatNumber = styled.div`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['4xl']};
  color: ${theme.colors.secondary};
  font-weight: 700;
  margin-bottom: ${theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
`;

const TimelineSection = styled.div`
  margin-top: ${theme.spacing['4xl']};
  position: relative;
  padding-left: 40px;

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${theme.colors.glassBorder};
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-bottom: ${theme.spacing['2xl']};
  animation: ${fadeInUp} 0.6s ease forwards;

  &::before {
    content: '';
    position: absolute;
    left: -33px;
    top: 6px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${theme.colors.secondary};
    border: 3px solid ${theme.colors.background};
    z-index: 1;
  }
`;

const TimelineYear = styled.span`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.secondary};
  font-weight: 600;
`;

const TimelineText = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing.xs};
  line-height: 1.6;
`;

export default function AboutPage() {
  const { t } = useLanguage();

  const stats = [
    { number: '55+', label: t.about.stats.years },
    { number: '100K+', label: t.about.stats.customers },
    { number: '50K+', label: t.about.stats.films },
    { number: '1M+', label: t.about.stats.photos },
  ];

  return (
    <PageWrapper>
      <Container>
        <SectionTitle
          badge={t.about.subtitle}
          title={t.about.title}
          as="h1"
        />

        <StorySection>
          <StoryContent>
            <StoryTitle>
              {t.about.story.title.split('1969').map((part, i) =>
                i === 0 ? <span key={i}>{part}<span>1969</span></span> : part
              )}
            </StoryTitle>
            <StoryParagraph>{t.about.story.p1}</StoryParagraph>
            <StoryParagraph>{t.about.story.p2}</StoryParagraph>
            <StoryParagraph>{t.about.story.p3}</StoryParagraph>
          </StoryContent>

          <ImageWrapper>
            <LogoLarge>
              <Image
                src="/logo.png"
                alt="Faruk Fotoğrafçılık"
                width={200}
                height={200}
                style={{ objectFit: 'contain' }}
              />
              <p>SINCE 1969</p>
            </LogoLarge>
          </ImageWrapper>
        </StorySection>

        <StatsGrid>
          {stats.map((stat, i) => (
            <StatCard key={i} style={{ animationDelay: `${i * 0.15}s` }}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>

        <TimelineSection>
          <TimelineItem>
            <TimelineYear>1969</TimelineYear>
            <TimelineText>Faruk Fotoğrafçılık, Sirkeci&apos;de küçük bir stüdyo olarak kuruldu.</TimelineText>
          </TimelineItem>
          <TimelineItem style={{ animationDelay: '0.15s' }}>
            <TimelineYear>1980</TimelineYear>
            <TimelineText>Film banyo hizmeti başlatıldı, İstanbul&apos;un en güvenilir film işleme merkezi haline geldi.</TimelineText>
          </TimelineItem>
          <TimelineItem style={{ animationDelay: '0.3s' }}>
            <TimelineYear>2000</TimelineYear>
            <TimelineText>Dijital fotoğraf baskı ekipmanları ile modern döneme geçiş yapıldı.</TimelineText>
          </TimelineItem>
          <TimelineItem style={{ animationDelay: '0.45s' }}>
            <TimelineYear>2020</TimelineYear>
            <TimelineText>Sublimasyon teknolojisi ile kişiye özel ürün üretimine başlandı.</TimelineText>
          </TimelineItem>
          <TimelineItem style={{ animationDelay: '0.6s' }}>
            <TimelineYear>2026</TimelineYear>
            <TimelineText>Dijital platform ile online hizmet dönemi başlatıldı. Film galerisi ve e-ticaret hizmetleri aktifleştirildi.</TimelineText>
          </TimelineItem>
        </TimelineSection>
      </Container>
    </PageWrapper>
  );
}
