'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { theme } from '@/styles/theme';
import { useLanguage } from '@/hooks/useLanguage';
import { FaInstagram, FaWhatsapp, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import toast from 'react-hot-toast';

const FooterWrapper = styled.footer`
  background: ${theme.colors.primaryDark};
  border-top: 1px solid ${theme.colors.glassBorder};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 1px;
    background: ${theme.colors.gradientSecondary};
  }
`;

const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${theme.spacing['3xl']} ${theme.spacing.lg} ${theme.spacing.xl};
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
  gap: ${theme.spacing['2xl']};

  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacing.xl};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div``;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: ${theme.spacing.md};
`;

const FooterLogoText = styled.div`
  h3 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.xl};
    color: #FFFFFF;
    line-height: 1;
  }
  span {
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.secondary};
    letter-spacing: 2px;
  }
`;

const FooterText = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin-bottom: ${theme.spacing.md};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  transition: all ${theme.transitions.normal};

  &:hover {
    color: ${theme.colors.secondary};
    border-color: ${theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const FooterTitle = styled.h4`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.lg};
  color: #FFFFFF;
  margin-bottom: ${theme.spacing.lg};
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 2px;
    background: ${theme.colors.secondary};
    border-radius: ${theme.borderRadius.full};
  }
`;

const FooterLink = styled(Link)`
  display: block;
  font-size: ${theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.7);
  padding: 6px 0;
  transition: all ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.secondary};
    padding-left: 4px;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: ${theme.spacing.md};
  font-size: ${theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.7);

  svg {
    color: ${theme.colors.secondary};
    margin-top: 3px;
    flex-shrink: 0;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 8px;
  margin-top: ${theme.spacing.md};
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 10px 16px;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: #FFFFFF;
  font-size: ${theme.fontSizes.sm};
  transition: border ${theme.transitions.fast};

  &:focus {
    border-color: ${theme.colors.secondary};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const NewsletterBtn = styled.button`
  padding: 10px 20px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.gradientSecondary};
  color: ${theme.colors.primaryDark};
  font-weight: 600;
  font-size: ${theme.fontSizes.sm};
  border: none;
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  white-space: nowrap;

  &:hover {
    filter: brightness(1.1);
    box-shadow: ${theme.shadows.glow};
  }
`;

const BottomBar = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${theme.spacing.lg} ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.glassBorder};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const Copyright = styled.p`
  font-size: ${theme.fontSizes.xs};
  color: rgba(255, 255, 255, 0.5);
`;

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success(t.footer.newsletter.success);
    setEmail('');
  };

  return (
    <FooterWrapper id="footer">
      <FooterContent>
        <FooterSection>
          <FooterLogo>
            <Image src="/logo.png" alt="Faruk" width={36} height={36} style={{ objectFit: 'contain' }} />
            <FooterLogoText>
              <h3>FARUK</h3>
              <span>SINCE 1969</span>
            </FooterLogoText>
          </FooterLogo>
          <FooterText>{t.footer.description}</FooterText>
          <SocialLinks>
            <SocialLink href="https://www.instagram.com/farukfotografcilik/" target="_blank" aria-label="Instagram">
              <FaInstagram />
            </SocialLink>
            <SocialLink href="https://wa.me/905324402957" target="_blank" aria-label="WhatsApp">
              <FaWhatsapp />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>{t.footer.quickLinks}</FooterTitle>
          <FooterLink href="/">{t.nav.home}</FooterLink>
          <FooterLink href="/hizmetler">{t.nav.services}</FooterLink>
          <FooterLink href="/galeri">{t.nav.gallery}</FooterLink>
          <FooterLink href="/urunler">{t.nav.products}</FooterLink>
          <FooterLink href="/hakkimizda">{t.nav.about}</FooterLink>
          <FooterLink href="/iletisim">{t.nav.contact}</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>{t.footer.contact}</FooterTitle>
          <ContactItem>
            <FaMapMarkerAlt />
            <span>{t.contact.info.addressValue}</span>
          </ContactItem>
          <ContactItem>
            <FaPhone />
            <span>{t.contact.info.phoneValue}</span>
          </ContactItem>
          <ContactItem>
            <HiMail />
            <span>info@farukphotography.com</span>
          </ContactItem>
        </FooterSection>

        <FooterSection>
          <FooterTitle>{t.footer.newsletter.title}</FooterTitle>
          <FooterText>{t.footer.newsletter.subtitle}</FooterText>
          <NewsletterForm onSubmit={handleNewsletter}>
            <NewsletterInput
              type="email"
              placeholder={t.footer.newsletter.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <NewsletterBtn type="submit">{t.footer.newsletter.subscribe}</NewsletterBtn>
          </NewsletterForm>
        </FooterSection>
      </FooterContent>

      <BottomBar>
        <Copyright>{t.footer.copyright}</Copyright>
        <Copyright>
          ❤️ Crafted in Sirkeci, Istanbul
        </Copyright>
      </BottomBar>
    </FooterWrapper>
  );
}
