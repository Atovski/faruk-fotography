'use client';

import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';

interface CardProps {
  $glass?: boolean;
  $hoverable?: boolean;
  $padding?: string;
}

export const Card = styled.div<CardProps>`
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  transition: all ${theme.transitions.normal};

  ${({ $glass = true }) =>
    $glass
      ? css`
          background: ${theme.colors.glassBg};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid ${theme.colors.glassBorder};
        `
      : css`
          background: ${theme.colors.surface};
          border: 1px solid transparent;
        `}

  ${({ $hoverable = true }) =>
    $hoverable &&
    css`
      &:hover {
        transform: translateY(-4px);
        border-color: ${theme.colors.secondary};
        box-shadow: ${theme.shadows.glow};
      }
    `}

  ${({ $padding = '24px' }) => css`
    padding: ${$padding};
  `}
`;

export const CardImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  margin: -24px -24px 20px -24px;
  width: calc(100% + 48px);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${theme.transitions.slow};
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }
`;

export const CardTitle = styled.h3`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['xl']};
  color: ${theme.colors.text};
  margin-bottom: 8px;
`;

export const CardText = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
`;

export const CardBadge = styled.span<{ $color?: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  background: ${({ $color }) => $color || theme.colors.secondary}20;
  color: ${({ $color }) => $color || theme.colors.secondary};
  border: 1px solid ${({ $color }) => $color || theme.colors.secondary}40;
`;
