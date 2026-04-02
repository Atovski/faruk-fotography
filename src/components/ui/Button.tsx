'use client';

import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';

interface ButtonProps {
  $variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
}

const variants = {
  primary: css`
    background: ${theme.colors.gradientSecondary};
    color: ${theme.colors.primaryDark};
    font-weight: 600;
    &:hover {
      filter: brightness(1.1);
      box-shadow: ${theme.shadows.glow};
    }
  `,
  secondary: css`
    background: ${theme.colors.gradientPrimary};
    color: #FFFFFF;
    border: 1px solid ${theme.colors.glassBorder};
    &:hover {
      border-color: ${theme.colors.secondary};
    }
  `,
  outline: css`
    background: transparent;
    color: ${theme.colors.secondary};
    border: 2px solid ${theme.colors.secondary};
    &:hover {
      background: ${theme.colors.secondary};
      color: ${theme.colors.primaryDark};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${theme.colors.textSecondary};
    &:hover {
      color: ${theme.colors.secondary};
      background: rgba(200, 164, 92, 0.1);
    }
  `,
  whatsapp: css`
    background: #25D366;
    color: white;
    font-weight: 600;
    &:hover {
      background: #20BD5A;
      box-shadow: 0 0 20px rgba(37, 211, 102, 0.3);
    }
  `,
};

const sizes = {
  sm: css`
    padding: 8px 16px;
    font-size: ${theme.fontSizes.sm};
    border-radius: ${theme.borderRadius.md};
  `,
  md: css`
    padding: 12px 28px;
    font-size: ${theme.fontSizes.md};
    border-radius: ${theme.borderRadius.lg};
  `,
  lg: css`
    padding: 16px 36px;
    font-size: ${theme.fontSizes.lg};
    border-radius: ${theme.borderRadius.lg};
  `,
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: ${theme.fonts.body};
  cursor: pointer;
  border: none;
  transition: all ${theme.transitions.normal};
  white-space: nowrap;
  text-decoration: none;
  
  ${({ $variant = 'primary' }) => variants[$variant]}
  ${({ $size = 'md' }) => sizes[$size]}
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      filter: none;
      box-shadow: none;
    }
  }

  svg {
    font-size: 1.2em;
  }
`;

export const IconButton = styled.button<{ $size?: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size = 40 }) => $size}px;
  height: ${({ $size = 40 }) => $size}px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  transition: all ${theme.transitions.normal};

  &:hover {
    color: ${theme.colors.secondary};
    border-color: ${theme.colors.secondary};
    background: rgba(200, 164, 92, 0.1);
  }
`;
