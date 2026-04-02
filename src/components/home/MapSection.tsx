'use client';

import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/Button';
import { HiLocationMarker, HiClock, HiPhone } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

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
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['2xl']};
  animation: ${fadeInUp} 0.6s ease forwards;

  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
  }
`;

const MapWrapper = styled.div`
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  border: 1px solid ${theme.colors.glassBorder};
  height: 400px;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: ${theme.breakpoints.laptop}) {
    height: 300px;
  }
`;

const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const InfoCard = styled.div`
  background: ${theme.colors.glassBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  display: flex;
  gap: ${theme.spacing.md};
  transition: all ${theme.transitions.normal};

  &:hover {
    border-color: ${theme.colors.secondary}40;
  }
`;

const InfoIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.secondary}15;
  color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  h4 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.md};
    color: ${theme.colors.text};
    margin-bottom: 4px;
  }
  
  p {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.textSecondary};
    line-height: 1.6;
  }
`;

const CTARow = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

export default function MapSection() {
  const { t } = useLanguage();

  return (
    <Section id="location">
      <Container>
        <Grid>
          <MapWrapper>
            <iframe
              src="https://maps.google.com/maps?q=Faruk%20Foto%C4%9Fraf%C3%A7%C4%B1l%C4%B1k,%20Hobyar,%20Ankara%20Cd.%20No:55,%2034112%20Fatih%2F%C4%B0stanbul&t=&z=16&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Faruk Fotoğrafçılık Konum"
            />
          </MapWrapper>

          <InfoPanel>
            <InfoCard>
              <InfoIcon><HiLocationMarker /></InfoIcon>
              <InfoContent>
                <h4>{t.contact.info.address}</h4>
                <p>{t.contact.info.addressValue}</p>
              </InfoContent>
            </InfoCard>

            <InfoCard>
              <InfoIcon><HiClock /></InfoIcon>
              <InfoContent>
                <h4>{t.contact.info.hours}</h4>
                <p>{t.contact.info.hoursValue}</p>
                <p>{t.contact.info.hoursClosed}</p>
              </InfoContent>
            </InfoCard>

            <InfoCard>
              <InfoIcon><HiPhone /></InfoIcon>
              <InfoContent>
                <h4>{t.contact.info.phone}</h4>
                <p>{t.contact.info.phoneValue}</p>
              </InfoContent>
            </InfoCard>

            <CTARow>
              <Button
                as="a"
                href="https://wa.me/905324402957"
                target="_blank"
                $variant="whatsapp"
                $size="md"
              >
                <FaWhatsapp /> WhatsApp
              </Button>
              <Button
                as="a"
                href="tel:+905324402957"
                $variant="outline"
                $size="md"
              >
                <HiPhone /> {t.contact.info.phone}
              </Button>
              <Button
                as="a"
                href="https://maps.app.goo.gl/chVzqcUKCrLfxT9Q9"
                target="_blank"
                $variant="secondary"
                $size="md"
              >
                <HiLocationMarker /> {t.contact.map.directions}
              </Button>
            </CTARow>
          </InfoPanel>
        </Grid>
      </Container>
    </Section>
  );
}
