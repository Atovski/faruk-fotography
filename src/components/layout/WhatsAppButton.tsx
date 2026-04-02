'use client';

import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { pulse } from '@/styles/animations';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppUrl } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

const FloatingButton = styled.a`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: ${theme.borderRadius.full};
  background: #25D366;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  z-index: ${theme.zIndex.whatsapp};
  transition: all ${theme.transitions.normal};
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 30px rgba(37, 211, 102, 0.6);
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #25D366;
    animation: ${pulse} 2s ease-in-out infinite;
    z-index: -1;
    opacity: 0.4;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 52px;
    height: 52px;
    font-size: 28px;
    bottom: 16px;
    right: 16px;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  right: 70px;
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  padding: 8px 16px;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  white-space: nowrap;
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${theme.colors.glassBorder};
  opacity: 0;
  pointer-events: none;
  transition: opacity ${theme.transitions.normal};

  ${FloatingButton}:hover & {
    opacity: 1;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

export default function WhatsAppButton() {
  const { t } = useLanguage();

  return (
    <FloatingButton
      href={getWhatsAppUrl(t.common.whatsappDefault)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      id="whatsapp-float-btn"
    >
      <FaWhatsapp />
      <Tooltip>WhatsApp</Tooltip>
    </FloatingButton>
  );
}
