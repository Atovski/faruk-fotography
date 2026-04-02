'use client';

import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { theme } from '@/styles/theme';
import { fadeInDown } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;

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
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

const LogoTitle = styled.span`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1;
`;

const LogoSubtitle = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.secondary};
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const NavLinks = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};

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

const NavLink = styled(Link)<{ $active?: boolean; $glow?: boolean }>`
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

  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/hizmetler', label: t.nav.services },
    { href: '/urunler', label: t.nav.products },
    { href: '/ikinci-el', label: language === 'tr' ? '2. El Kamera' : 'Used Cameras' },
    { href: '/film-banyo', label: language === 'tr' ? 'Film Banyo' : 'Film Dev.', glow: true },
    { href: '/galeri', label: t.nav.gallery },
    { href: '/hakkimizda', label: t.nav.about },
    { href: '/iletisim', label: t.nav.contact },
  ];

  return (
    <>
      <Nav $scrolled={scrolled} id="navbar">
        <NavContainer>
          <LogoLink href="/">
            <Image
              src="/logo.png"
              alt="Faruk Fotoğrafçılık"
              width={40}
              height={40}
              style={{ objectFit: 'contain' }}
              priority
            />
            <LogoText>
              <LogoTitle>FARUK</LogoTitle>
              <LogoSubtitle>Since 1969</LogoSubtitle>
            </LogoText>
          </LogoLink>

          <NavLinks $open={menuOpen}>
            {navItems.map(item => (
              <NavLink
                key={item.href}
                href={item.href}
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
