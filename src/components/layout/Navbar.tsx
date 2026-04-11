'use client';

import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { theme } from '@/styles/theme';
import { fadeInDown } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedHref } from '@/i18n/config';
import { HiMenu, HiX } from 'react-icons/hi';

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${theme.zIndex.sticky};
  transition: all ${theme.transitions.normal};
  animation: ${fadeInDown} 0.5s ease;

  background: rgba(27, 42, 74, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.05);

  ${({ $scrolled }) =>
    $scrolled && css`
      box-shadow: ${theme.shadows.md};
    `}
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 72px;

  @media (max-width: ${theme.breakpoints.laptop}) {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.md};
    height: 64px;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10;
  justify-self: start;
`;



const NavLinks = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};
  justify-self: center;

  @media (max-width: ${theme.breakpoints.laptop}) {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    gap: ${theme.spacing.xl};
    background: ${theme.colors.primaryDark};
    border-left: 1px solid rgba(255,255,255,0.05);
    transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
    transition: transform ${theme.transitions.normal};
    z-index: 5;
  }
`;

const NavLink = styled(Link) <{ $active?: boolean; $glow?: boolean }>`
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ $active, $glow }) => ($active || $glow ? theme.colors.secondary : 'rgba(255, 255, 255, 0.8)')};
  transition: all ${theme.transitions.fast};
  position: relative;
  letter-spacing: 0.5px;
  
  ${({ $glow }) => $glow && css`
    text-shadow: 0 0 8px rgba(200, 164, 92, 0.4);
    font-weight: 600;
    
    &:hover {
      text-shadow: 0 0 15px rgba(200, 164, 92, 0.7);
      transform: translateY(-1px);
    }
  `}

  &:hover {
    color: ${theme.colors.secondary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${({ $active }) => ($active ? '100%' : '0')};
    height: 2px;
    background: ${theme.colors.secondary};
    transition: width ${theme.transitions.normal};
    border-radius: ${theme.borderRadius.full};
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: ${theme.breakpoints.laptop}) {
    font-size: ${theme.fontSizes.lg};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  justify-self: end;
`;

const LangSwitch = styled.button<{ $active: boolean }>`
  padding: 4px 10px;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  border: 1px solid ${({ $active }) => ($active ? theme.colors.secondary : 'rgba(255,255,255,0.2)')};
  background: ${({ $active }) => ($active ? theme.colors.secondary + '20' : 'transparent')};
  color: ${({ $active }) => ($active ? theme.colors.secondary : 'rgba(255,255,255,0.6)')};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    border-color: ${theme.colors.secondary};
    color: ${theme.colors.secondary};
  }
`;

const HamburgerBtn = styled.button`
  display: none;
  background: none;
  border: none;
  color: #FFFFFF;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  padding: 4px;

  @media (max-width: ${theme.breakpoints.laptop}) {
    display: flex;
    align-items: center;
  }
`;

const Overlay = styled.div<{ $show: boolean }>`
  display: none;

  @media (max-width: ${theme.breakpoints.laptop}) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 4;
    opacity: ${({ $show }) => ($show ? 1 : 0)};
    pointer-events: ${({ $show }) => ($show ? 'all' : 'none')};
    transition: opacity ${theme.transitions.normal};
  }
`;

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Navigation items with Turkish base paths (used for localization)
  const navItems = [
    { basePath: '/hizmetler', label: t.nav.services },
    { basePath: '/urunler', label: t.nav.products },
    { basePath: '/ikinci-el', label: language === 'tr' ? '2. El Kamera' : 'Used Cameras' },
    { basePath: '/film-banyo', label: language === 'tr' ? 'Film Banyo' : 'Film Dev.', glow: true },
    { basePath: '/galeri', label: t.nav.gallery },
    { basePath: '/hakkimizda', label: t.nav.about },
    { basePath: '/iletisim', label: t.nav.contact },
  ];

  return (
    <>
      <Nav $scrolled={scrolled} id="navbar">
        <NavContainer>
          <LogoLink href={`/${language}`}>
            <Image
              src="/navbar-logo-v2.png"
              alt="Faruk Fotoğrafçılık"
              width={180}
              height={45}
              style={{ objectFit: 'contain' }}
              priority
            />
          </LogoLink>

          <NavLinks $open={menuOpen}>
            {navItems.map(item => (
              <NavLink
                key={item.basePath}
                href={getLocalizedHref(item.basePath, language)}
                $glow={item.glow}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </NavLinks>

          <RightSection>
            <LangSwitch
              $active={language === 'tr'}
              onClick={() => setLanguage('tr')}
              aria-label="Türkçe"
            >
              TR
            </LangSwitch>
            <LangSwitch
              $active={language === 'en'}
              onClick={() => setLanguage('en')}
              aria-label="English"
            >
              EN
            </LangSwitch>
            <HamburgerBtn onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <HiX /> : <HiMenu />}
            </HamburgerBtn>
          </RightSection>
        </NavContainer>
      </Nav>
      <Overlay $show={menuOpen} onClick={() => setMenuOpen(false)} />
    </>
  );
}
