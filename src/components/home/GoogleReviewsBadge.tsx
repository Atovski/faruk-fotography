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

// Read off the Google Business Profile by hand. Last checked 2026-10-06.
// There is no API key on this project, so when the profile moves, change these
// two numbers — the stars below follow the rating on their own.
const RATING = 4.6;
const REVIEW_COUNT = 70;

export default function GoogleReviewsBadge() {
  const { language } = useLanguage();

  const fullStars = Math.floor(RATING);
  const hasHalfStar = RATING - fullStars >= 0.25;

  return (
    <BadgeContainer href="https://maps.app.goo.gl/chVzqcUKCrLfxT9Q9" target="_blank" rel="noopener noreferrer">
      <TopRow>
        <RatingText>{RATING.toFixed(1)}</RatingText>
        <Stars>
          {Array.from({ length: fullStars }, (_, i) => (
            <FaStar key={i} />
          ))}
          {hasHalfStar && <FaStarHalfAlt />}
        </Stars>
      </TopRow>
      <BottomRow>
        <FcGoogle size={18} />
        {REVIEW_COUNT} {language === 'en' ? 'Google Reviews' : 'Google Yorumu'}
      </BottomRow>
    </BadgeContainer>
  );
}
