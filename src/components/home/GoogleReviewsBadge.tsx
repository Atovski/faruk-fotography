'use client';

import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp } from '@/styles/animations';
import { FcGoogle } from 'react-icons/fc';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useLanguage } from '@/hooks/useLanguage';

const BadgeContainer = styled.a`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  animation: ${fadeInUp} 0.8s ease 1.2s both;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RatingText = styled.span`
  color: ${theme.colors.text};
  font-family: ${theme.fonts.heading};
  font-weight: 700;
  font-size: 24px;
`;

const Stars = styled.div`
  display: flex;
  gap: 4px;
  color: #FBBC05;
  font-size: 24px; /* Yıldızlar büyütüldü */
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  font-weight: 500;
`;

export default function GoogleReviewsBadge() {
  const { language } = useLanguage();
  const rating = 4.5;
  const count = 64;

  // Render static 4.5 stars layout directly
  return (
    <BadgeContainer href="https://maps.app.goo.gl/chVzqcUKCrLfxT9Q9" target="_blank" rel="noopener noreferrer">
      <TopRow>
        <RatingText>{rating.toFixed(1)}</RatingText>
        <Stars>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
        </Stars>
      </TopRow>
      <BottomRow>
        <FcGoogle size={18} />
        {count} {language === 'en' ? 'Google Reviews' : 'Google Yorumu'}
      </BottomRow>
    </BadgeContainer>
  );
}
