'use client';

import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp, fadeIn } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedHref } from '@/i18n/config';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { FaWhatsapp, FaFilm, FaBoxOpen, FaCheckCircle } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';
import { getWhatsAppUrl } from '@/lib/utils';

const Section = styled.section`
  padding: ${theme.spacing['3xl']} 0;
  position: relative;
  background: linear-gradient(180deg, transparent 0%, ${theme.colors.primaryDark}30 50%, transparent 100%);
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['3xl']};
  align-items: center;
  animation: ${fadeIn} 0.6s ease;

  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing['2xl']};
  }
`;

const TextSide = styled.div``;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 18px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.secondary}15;
  border: 1px solid ${theme.colors.secondary}40;
  color: ${theme.colors.secondary};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: ${theme.spacing.md};
`;

const Title = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.text};
  line-height: 1.2;
  margin-bottom: ${theme.spacing.md};

  span { color: ${theme.colors.secondary}; }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes['2xl']};
  }
`;

const Description = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: ${theme.spacing.lg};
`;

const PriceInfo = styled.div`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.secondary};
  font-weight: 700;
  margin-bottom: ${theme.spacing.xl};

  span {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.textSecondary};
    font-weight: 400;
  }
`;

const CTAs = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const StepsSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const StepCard = styled.div<{ $delay: string }>`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.xl};
  background: ${theme.colors.glassBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.glassBorder};
  transition: all ${theme.transitions.normal};
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${({ $delay }) => $delay};
  opacity: 0;

  &:hover {
    border-color: ${theme.colors.secondary}40;
    transform: translateX(4px);
  }
`;

const StepIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.secondary}15;
  color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  h4 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.md};
    color: ${theme.colors.text};
    margin-bottom: 4px;
  }
  p {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.textSecondary};
    line-height: 1.5;
  }
`;

export default function FilmBanyoCTA() {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  const steps = isTr
    ? [
        { icon: <FaWhatsapp />, title: 'Bize Ulaşın', desc: 'WhatsApp üzerinden film bilgilerinizi paylaşın.' },
        { icon: <FaBoxOpen />, title: 'Filmi Kargolayın', desc: 'Güvenli paketleyip belirtilen adrese gönderin.' },
        { icon: <FaFilm />, title: 'Banyo & Tarama', desc: 'Aynı gün profesyonel banyo ve yüksek çözünürlük tarama.' },
        { icon: <HiDownload />, title: 'Dijital Teslim', desc: 'Fotoğraflarınız online galeriden teslim edilir.' },
      ]
    : [
        { icon: <FaWhatsapp />, title: 'Contact Us', desc: 'Share your film details via WhatsApp.' },
        { icon: <FaBoxOpen />, title: 'Ship Your Film', desc: 'Pack it safely and send to the given address.' },
        { icon: <FaFilm />, title: 'Develop & Scan', desc: 'Same-day professional developing and high-res scan.' },
        { icon: <HiDownload />, title: 'Digital Delivery', desc: 'Your photos delivered via online gallery.' },
      ];

  return (
    <Section id="film-banyo-cta">
      <Container>
        <Grid>
          <TextSide>
            <Badge>🎞️ {isTr ? 'Türkiye Geneli Hizmet' : 'Nationwide Service'}</Badge>
            <Title>
              {isTr ? (
                <>Analog Filmlerinizi Profesyonelce <span>Banyo Edecek</span> Bir Fotoğrafçı mı Arıyorsunuz?</>
              ) : (
                <>Looking for a Photographer to <span>Develop</span> Your Analog Films?</>
              )}
            </Title>
            <Description>
              {isTr
                ? "Renkli (C-41) veya siyah beyaz analog fotoğraflarınızı aynı gün içinde dikkatle banyo ediyor ve yüksek çözünürlüklü tarayıcılarımızla dijital formata çeviriyoruz. İstanbul Sirkeci mağazamıza uğrayabilir veya tüm Türkiye'den kargo ile film gönderebilirsiniz."
                : "We carefully develop your color (C-41) or black and white analog prints on the same day and convert them to digital format with our high-resolution scanners. Visit our Sirkeci store or ship from anywhere in Turkey."}
            </Description>
            <PriceInfo>
              ₺500 <span>{isTr ? "'den başlayan fiyatlarla" : 'starting from'}</span>
            </PriceInfo>
            <CTAs>
              <Button as={Link} href={getLocalizedHref('/film-banyo', language)} $variant="primary" $size="lg">
                {isTr ? 'Film Banyo Sayfası' : 'Film Dev. Page'}
              </Button>
              <Button
                as="a"
                href={getWhatsAppUrl(isTr ? 'Merhaba, film banyo yaptırmak istiyorum.' : 'Hi, I want to get my film developed.')}
                target="_blank"
                rel="noopener noreferrer"
                $variant="whatsapp"
                $size="lg"
              >
                <FaWhatsapp /> {isTr ? 'WhatsApp Sipariş' : 'WhatsApp Order'}
              </Button>
            </CTAs>
          </TextSide>

          <StepsSide>
            {steps.map((step, i) => (
              <StepCard key={i} $delay={`${i * 0.12}s`}>
                <StepIcon>{step.icon}</StepIcon>
                <StepContent>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </StepContent>
              </StepCard>
            ))}
          </StepsSide>
        </Grid>
      </Container>
    </Section>
  );
}
