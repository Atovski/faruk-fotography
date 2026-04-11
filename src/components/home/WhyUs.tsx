'use client';

import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import SectionTitle from '@/components/ui/SectionTitle';
import { HiStar, HiLocationMarker, HiLightningBolt, HiCloud } from 'react-icons/hi';

const Section = styled.section`
  padding: ${theme.spacing['4xl']} 0;
  position: relative;
  background: linear-gradient(180deg, transparent 0%, ${theme.colors.primaryDark}40 50%, transparent 100%);
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const Item = styled.div`
  text-align: center;
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.xl};
  background: ${theme.colors.glassBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.glassBorder};
  transition: all ${theme.transitions.normal};
  animation: ${fadeInUp} 0.6s ease forwards;
  opacity: 0;

  &:hover {
    border-color: ${theme.colors.secondary}60;
    transform: translateY(-4px);
    
    .why-icon {
      background: ${theme.colors.secondary};
      color: ${theme.colors.primaryDark};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md} ${theme.spacing.md};
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 80px;
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
  font-size: 30px;
  margin: 0 auto ${theme.spacing.lg};
  transition: all ${theme.transitions.spring};

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

const ItemTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
`;

const ItemDesc = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
`;

const items = [
  { icon: HiStar, key: 'experience' as const, delay: '0s' },
  { icon: HiLocationMarker, key: 'location' as const, delay: '0.15s' },
  { icon: HiLightningBolt, key: 'express' as const, delay: '0.3s' },
  { icon: HiCloud, key: 'digital' as const, delay: '0.45s' },
];

export default function WhyUsSection() {
  const { t } = useLanguage();

  return (
    <Section id="why-us">
      <Container>
        <SectionTitle
          badge={t.whyUs.subtitle}
          title={t.whyUs.title}
        />
        <Grid>
          {items.map((item) => {
            const Icon = item.icon;
            const data = t.whyUs.items[item.key];
            return (
              <Item key={item.key} style={{ animationDelay: item.delay }}>
                <IconCircle className="why-icon">
                  <Icon />
                </IconCircle>
                <ItemTitle>{data.title}</ItemTitle>
                <ItemDesc>{data.description}</ItemDesc>
              </Item>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}
