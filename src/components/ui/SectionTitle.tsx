'use client';

import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp } from '@/styles/animations';

const Wrapper = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['2xl']};
  animation: ${fadeInUp} 0.6s ease forwards;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 6px 20px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  background: ${theme.colors.secondary}15;
  color: ${theme.colors.secondary};
  border: 1px solid ${theme.colors.secondary}30;
  margin-bottom: ${theme.spacing.md};
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['4xl']};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const Divider = styled.div`
  width: 60px;
  height: 3px;
  background: ${theme.colors.gradientSecondary};
  margin: ${theme.spacing.md} auto;
  border-radius: ${theme.borderRadius.full};
`;

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  showDivider?: boolean;
  as?: 'h1' | 'h2';
}

export default function SectionTitle({ badge, title, subtitle, showDivider = true, as = 'h2' }: SectionTitleProps) {
  return (
    <Wrapper>
      {badge && <Badge>{badge}</Badge>}
      <Title as={as}>{title}</Title>
      {showDivider && <Divider />}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Wrapper>
  );
}
