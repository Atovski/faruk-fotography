'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeIn, fadeInUp, grain } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedHref } from '@/i18n/config';
import { Button } from '@/components/ui/Button';
import { FaWhatsapp } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';
import { getWhatsAppUrl } from '@/lib/utils';
import Link from 'next/link';
import GoogleReviewsBadge from './GoogleReviewsBadge';

const HeroWrapper = styled.section`
  position: relative;
  min-height: 105vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${theme.colors.background};
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 0;
  opacity: 0.8; /* VİDEO NET VE GÖRÜNÜR */
  pointer-events: none;
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      linear-gradient(180deg, rgba(10, 22, 40, 0.4) 0%, rgba(10, 22, 40, 0.2) 50%, rgba(10, 22, 40, 0.6) 100%),
      radial-gradient(ellipse at 20% 50%, rgba(200, 164, 92, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(27, 42, 74, 0.2) 0%, transparent 50%);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 60%, ${theme.colors.background} 100%);
  }
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



const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  text-align: center;
  max-width: 800px;
  padding: 0 ${theme.spacing.lg};
  margin-top: 80px;
  animation: ${fadeIn} 1s ease;
`;



const HeroTitle = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['6xl']};
  color: #FFFFFF;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.9);
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
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  letter-spacing: 3px;
  margin-bottom: ${theme.spacing.lg};
  animation: ${fadeInUp} 0.8s ease 0.6s both;
  font-weight: 500;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSizes.md};
    letter-spacing: 1px;
  }
`;

const HeroDescription = styled.p`
  font-size: ${theme.fontSizes.md};
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9);
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto ${theme.spacing['2xl']};
  line-height: 1.8;
  animation: ${fadeInUp} 0.8s ease 0.8s both;
`;

const HeroCTAs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.lg};
  animation: ${fadeInUp} 0.8s ease 1s both;
`;

const CTAButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 15px;
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
  const { t, language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <HeroWrapper id="hero">
      <BackgroundVideo
        key={isMobile ? 'mobile' : 'desktop'}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={isMobile ? '/hero-bg-mobile.mp4' : '/hero-bg.mp4'} type="video/mp4" />
      </BackgroundVideo>
      <HeroBg />


      <HeroContent>
        <HeroTitle>
          {t.hero.title.includes(':') ? (
            <>
              <span>{t.hero.title.split(':')[0]}:</span>
              {t.hero.title.split(':')[1]}
            </>
          ) : (
            t.hero.title
          )}
        </HeroTitle>
        <HeroSubtitle>{t.hero.subtitle}</HeroSubtitle>
        <HeroDescription>{t.hero.description}</HeroDescription>

        <HeroCTAs>
          <CTAButtons>
            <Button
              as={Link}
              href={getLocalizedHref('/vesikalik-fotograf', language)}
              $variant="primary"
              $size="lg"
            >
              {t.hero.cta}
            </Button>
            <Button
              as="a"
              href={getWhatsAppUrl(t.common.whatsappDefault)}
              target="_blank"
              rel="noopener noreferrer"
              $variant="whatsapp"
              $size="lg"
              style={{ backgroundColor: '#25D366', color: '#FFF', border: 'none' }}
            >
              <FaWhatsapp /> {t.hero.ctaSecondary}
            </Button>
          </CTAButtons>
          <GoogleReviewsBadge />
        </HeroCTAs>
      </HeroContent>

      <ScrollIndicator onClick={() => document.getElementById('document-photos')?.scrollIntoView({ behavior: 'smooth' })}>
        <span>{language === 'en' ? 'Explore' : 'Keşfet'}</span>
        <HiArrowDown />
      </ScrollIndicator>
    </HeroWrapper>
  );
}
