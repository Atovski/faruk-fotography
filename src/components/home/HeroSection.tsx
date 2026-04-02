'use client';

import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeIn, fadeInUp, grain } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/Button';
import { FaWhatsapp } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';
import { getWhatsAppUrl } from '@/lib/utils';
import Link from 'next/link';
import GoogleReviewsBadge from './GoogleReviewsBadge';

const HeroWrapper = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${theme.colors.background};
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at 20% 50%, rgba(200, 164, 92, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(27, 42, 74, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(200, 164, 92, 0.05) 0%, transparent 50%);
  z-index: 0;
`;

const GrainOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    width: 200%;
    height: 200%;
    background: transparent url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E") repeat;
    animation: ${grain} 8s steps(10) infinite;
    opacity: 0.4;
  }
`;

const FilmBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: repeating-linear-gradient(
    90deg,
    ${theme.colors.primaryDark} 0px,
    ${theme.colors.primaryDark} 15px,
    transparent 15px,
    transparent 20px,
    ${theme.colors.primaryDark} 20px,
    ${theme.colors.primaryDark} 35px,
    transparent 35px,
    transparent 55px
  );
  opacity: 0.3;
  z-index: 2;

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 0;
    right: 0;
    height: 10px;
    background: repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 20px,
      rgba(200, 164, 92, 0.1) 20px,
      rgba(200, 164, 92, 0.1) 35px,
      transparent 35px,
      transparent 55px
    );
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  text-align: center;
  max-width: 800px;
  padding: 0 ${theme.spacing.lg};
  animation: ${fadeIn} 1s ease;
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.secondary}15;
  border: 1px solid ${theme.colors.secondary}40;
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.xl};
  animation: ${fadeInUp} 0.8s ease 0.2s both;

  &::before {
    content: '📷';
  }
`;

const HeroTitle = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['6xl']};
  color: ${theme.colors.text};
  line-height: 1.1;
  margin-bottom: ${theme.spacing.md};
  animation: ${fadeInUp} 0.8s ease 0.4s both;

  span {
    color: ${theme.colors.secondary};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes['4xl']};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.secondary};
  letter-spacing: 3px;
  margin-bottom: ${theme.spacing.lg};
  animation: ${fadeInUp} 0.8s ease 0.6s both;
  font-weight: 300;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSizes.md};
    letter-spacing: 1px;
  }
`;

const HeroDescription = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto ${theme.spacing['2xl']};
  line-height: 1.8;
  animation: ${fadeInUp} 0.8s ease 0.8s both;
`;

const HeroCTAs = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  animation: ${fadeInUp} 0.8s ease 1s both;
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.textMuted};
  font-size: ${theme.fontSizes.xs};
  animation: ${fadeInUp} 0.8s ease 1.2s both;
  cursor: pointer;

  svg {
    font-size: 20px;
    animation: float 2s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(8px); }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const GlowOrb = styled.div<{ $top: string; $left: string; $size: string; $delay: string }>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
  background: radial-gradient(circle, rgba(200, 164, 92, 0.1) 0%, transparent 70%);
  filter: blur(40px);
  animation: pulse 4s ease-in-out ${({ $delay }) => $delay} infinite;
  z-index: 0;

  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.1); }
  }
`;

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <HeroWrapper id="hero">
      <HeroBg />
      <GrainOverlay />
      <FilmBorder />

      <GlowOrb $top="20%" $left="10%" $size="300px" $delay="0s" />
      <GlowOrb $top="60%" $left="80%" $size="250px" $delay="2s" />
      <GlowOrb $top="80%" $left="30%" $size="200px" $delay="1s" />

      <HeroContent>
        <HeroBadge>{t.hero.badge}</HeroBadge>
        <HeroTitle>
          {t.hero.title.split(' ').map((word, i) => 
            i === 0 ? <span key={i}>{word} </span> : word + ' '
          )}
        </HeroTitle>
        <HeroSubtitle>{t.hero.subtitle}</HeroSubtitle>
        <HeroDescription>{t.hero.description}</HeroDescription>

        <HeroCTAs>
          <Button
            as="a"
            href={getWhatsAppUrl(t.common.whatsappDefault)}
            target="_blank"
            rel="noopener noreferrer"
            $variant="whatsapp"
            $size="lg"
          >
            <FaWhatsapp /> {t.hero.cta}
          </Button>
          <Button
            as={Link}
            href="/hizmetler"
            $variant="outline"
            $size="lg"
          >
            {t.hero.ctaSecondary}
          </Button>
          <GoogleReviewsBadge />
        </HeroCTAs>
      </HeroContent>

      <ScrollIndicator onClick={() => document.getElementById('services-preview')?.scrollIntoView({ behavior: 'smooth' })}>
        <span>Keşfet</span>
        <HiArrowDown />
      </ScrollIndicator>
    </HeroWrapper>
  );
}
