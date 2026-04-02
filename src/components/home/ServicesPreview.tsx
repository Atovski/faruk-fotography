'use client';

import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import SectionTitle from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { HiCamera, HiFilm, HiPhotograph, HiGift, HiUsers, HiShoppingBag } from 'react-icons/hi';
import Link from 'next/link';

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
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(Card)`
  text-align: center;
  padding: ${theme.spacing['2xl']} ${theme.spacing.xl};
  cursor: pointer;
  animation: ${fadeInUp} 0.6s ease forwards;
  animation-delay: ${({ style }) => style?.animationDelay || '0s'};
  opacity: 0;

  &:hover {
    .icon-wrapper {
      background: ${theme.colors.secondary};
      color: ${theme.colors.primaryDark};
      transform: scale(1.1) rotate(5deg);
    }
  }
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.secondary}15;
  color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 auto ${theme.spacing.lg};
  transition: all ${theme.transitions.spring};
`;

const ServiceTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
`;

const ServiceDesc = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  line-height: 1.7;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: ${theme.spacing.md};
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
`;

const FeatureTag = styled.li`
  padding: 3px 10px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  background: ${theme.colors.surface};
  color: ${theme.colors.textSecondary};
  border: 1px solid ${theme.colors.glassBorder};
`;

const services = [
  { icon: HiCamera, key: 'passport' as const },
  { icon: HiUsers, key: 'studio' as const },
  { icon: HiFilm, key: 'film' as const },
  { icon: HiPhotograph, key: 'print' as const },
  { icon: HiShoppingBag, key: 'equipment' as const },
  { icon: HiGift, key: 'sublimation' as const },
];

export default function ServicesPreview() {
  const { t } = useLanguage();

  return (
    <Section id="services-preview">
      <Container>
        <SectionTitle
          badge={t.services.subtitle}
          title={t.services.title}
        />
        <Grid>
          {services.map((service, index) => {
            const Icon = service.icon;
            const data = t.services[service.key];
            return (
              <Link href="/hizmetler" key={service.key} style={{ textDecoration: 'none' }}>
                <ServiceCard style={{ animationDelay: `${index * 0.15}s` }}>
                  <IconWrapper className="icon-wrapper">
                    <Icon />
                  </IconWrapper>
                  <ServiceTitle>{data.title}</ServiceTitle>
                  <ServiceDesc>{data.description}</ServiceDesc>
                  <FeatureList>
                    {data.features.slice(0, 3).map((f, i) => (
                      <FeatureTag key={i}>{f}</FeatureTag>
                    ))}
                  </FeatureList>
                </ServiceCard>
              </Link>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
