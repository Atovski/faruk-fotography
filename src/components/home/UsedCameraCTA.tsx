'use client';

import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeIn } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedHref } from '@/i18n/config';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { FaCameraRetro } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

const Section = styled.section`
  padding: ${theme.spacing['3xl']} 0 ${theme.spacing['4xl']};
  position: relative;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

const Banner = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.xl};
  background: linear-gradient(135deg, ${theme.colors.primaryDark} 0%, ${theme.colors.primary} 100%);
  border: 1px solid ${theme.colors.secondary}25;
  animation: ${fadeIn} 0.6s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -30%;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: ${theme.colors.secondary}08;
    pointer-events: none;
  }
`;

const IconCircle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.secondary}15;
  color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin: 0 auto ${theme.spacing.lg};
`;

const Title = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['2xl']};
  color: #FFFFFF;
  margin-bottom: ${theme.spacing.sm};
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.75);
  font-size: ${theme.fontSizes.md};
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto ${theme.spacing.xl};
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  text-align: center;
  .num {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes['2xl']};
    font-weight: 700;
    color: ${theme.colors.secondary};
  }
  .label {
    font-size: ${theme.fontSizes.xs};
    color: rgba(255, 255, 255, 0.6);
    margin-top: 2px;
  }
`;

export default function UsedCameraCTA() {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  return (
    <Section id="used-camera-cta">
      <Container>
        <Banner>
          <IconCircle>
            <FaCameraRetro />
          </IconCircle>
          <Title>
            {isTr ? 'İkinci El Fotoğraf Makinesi Alan Yerler' : 'Used Camera Buying & Selling'}
          </Title>
          <Description>
            {isTr
              ? 'Eski dijital kameralarınızı ve kullanılmayan analog fotoğraf makinelerinizi değerinde nakit ödeme ile satın alıyoruz. 23 marka, 250+ modele anında online teklif alın veya Sirkeci mağazamıza gelin.'
              : "We buy your old digital and unused analog cameras for cash at their true value. Get an instant online offer for 23 brands, 250+ models, or visit our Sirkeci store."}
          </Description>
          <Stats>
            <StatItem>
              <div className="num">23</div>
              <div className="label">{isTr ? 'Marka' : 'Brands'}</div>
            </StatItem>
            <StatItem>
              <div className="num">250+</div>
              <div className="label">{isTr ? 'Model' : 'Models'}</div>
            </StatItem>
            <StatItem>
              <div className="num">24h</div>
              <div className="label">{isTr ? 'İçinde Teklif' : 'Offer Time'}</div>
            </StatItem>
          </Stats>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button as={Link} href={getLocalizedHref('/ikinci-el', language)} $variant="primary" $size="lg" style={{ width: 'auto' }}>
              {isTr ? 'Kameranı Değerlendir' : 'Evaluate Your Camera'} <HiArrowRight style={{ marginLeft: 6 }} />
            </Button>
          </div>
        </Banner>
      </Container>
    </Section>
  );
}
