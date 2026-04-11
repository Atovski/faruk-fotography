'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { useLanguage } from '@/hooks/useLanguage';
import { HiChevronRight, HiHome } from 'react-icons/hi';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
`;

const BreadcrumbLink = styled(Link)`
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  transition: color ${theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: ${theme.colors.secondary};
  }
`;

const BreadcrumbCurrent = styled.span`
  color: ${theme.colors.text};
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
`;

const Separator = styled.span`
  color: ${theme.colors.textMuted};
  display: flex;
  align-items: center;
`;

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const { language } = useLanguage();

  return (
    <BreadcrumbContainer aria-label="breadcrumb">
      <BreadcrumbLink href={`/${language}`}>
        <HiHome size={16} />
      </BreadcrumbLink>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Separator>
              <HiChevronRight size={14} />
            </Separator>
            {isLast || !item.href ? (
              <BreadcrumbCurrent>{item.label}</BreadcrumbCurrent>
            ) : (
              <BreadcrumbLink href={item.href}>
                {item.label}
              </BreadcrumbLink>
            )}
          </div>
        );
      })}
    </BreadcrumbContainer>
  );
}
