'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { HiLocationMarker, HiClock, HiPhone, HiMail } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { trackEvent } from '@/lib/analytics';

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg} ${theme.spacing['4xl']};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['3xl']};

  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  animation: ${fadeInLeft} 0.8s ease;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  font-weight: 500;
`;

const Input = styled.input`
  padding: 14px 18px;
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.surfaceLight};
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.md};
  transition: all ${theme.transitions.fast};

  &:focus {
    border-color: ${theme.colors.secondary};
    box-shadow: 0 0 0 3px ${theme.colors.secondary}15;
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const TextArea = styled.textarea`
  padding: 14px 18px;
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.surfaceLight};
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.md};
  min-height: 150px;
  resize: vertical;
  transition: all ${theme.transitions.fast};

  &:focus {
    border-color: ${theme.colors.secondary};
    box-shadow: 0 0 0 3px ${theme.colors.secondary}15;
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const InfoSection = styled.div`
  animation: ${fadeInRight} 0.8s ease;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const InfoCard = styled.div`
  background: ${theme.colors.glassBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  display: flex;
  gap: ${theme.spacing.md};
  transition: all ${theme.transitions.normal};

  &:hover {
    border-color: ${theme.colors.secondary}40;
    transform: translateX(4px);
  }
`;

const InfoIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.secondary}15;
  color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  h4 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.md};
    color: ${theme.colors.text};
    margin-bottom: 4px;
  }

  p {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.textSecondary};
    line-height: 1.6;
  }

  a {
    color: ${theme.colors.secondary};
    &:hover {
      text-decoration: underline;
    }
  }
`;

const MapSection = styled.div`
  margin-top: ${theme.spacing['3xl']};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  border: 1px solid ${theme.colors.glassBorder};
  height: 400px;
  animation: ${fadeInUp} 0.8s ease;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const CTARow = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  margin-top: ${theme.spacing.md};
`;

export default function ContactPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Without an email or phone there is no way to answer the message.
    if (!formData.email.trim() && !formData.phone.trim()) {
      toast.error(`${t.contact.form.email} / ${t.contact.form.phone}?`);
      return;
    }
    setLoading(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`Contact form failed: ${res.status}`);
      trackEvent('generate_lead', { lead_type: 'contact_form' });
      toast.success(t.contact.form.success);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch {
      toast.error(t.contact.form.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Container>
        <SectionTitle
          badge={t.contact.subtitle}
          title={t.contact.title}
          as="h1"
        />

        <Grid>
          <FormSection>
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Label>{t.contact.form.name}</Label>
                <Input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.contact.form.name}
                  id="contact-name"
                />
              </InputGroup>
              <InputGroup>
                <Label>{t.contact.form.email}</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.contact.form.email}
                  id="contact-email"
                />
              </InputGroup>
              <InputGroup>
                <Label>{t.contact.form.phone}</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="05XX XXX XX XX"
                  id="contact-phone"
                />
              </InputGroup>
              <InputGroup>
                <Label>{t.contact.form.message}</Label>
                <TextArea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contact.form.message}
                  id="contact-message"
                />
              </InputGroup>
              <Button type="submit" $variant="primary" $size="lg" $fullWidth disabled={loading}>
                {loading ? t.contact.form.sending : t.contact.form.send}
              </Button>
            </Form>
          </FormSection>

          <InfoSection>
            <InfoCard>
              <InfoIcon><HiLocationMarker /></InfoIcon>
              <InfoContent>
                <h4>{t.contact.info.address}</h4>
                <p>{t.contact.info.addressValue}</p>
              </InfoContent>
            </InfoCard>
            <InfoCard>
              <InfoIcon><HiPhone /></InfoIcon>
              <InfoContent>
                <h4>{t.contact.info.phone}</h4>
                <p><a href="tel:+905324402957">{t.contact.info.phoneValue}</a></p>
              </InfoContent>
            </InfoCard>
            <InfoCard>
              <InfoIcon><HiClock /></InfoIcon>
              <InfoContent>
                <h4>{t.contact.info.hours}</h4>
                <p>{t.contact.info.hoursValue}</p>
                <p>{t.contact.info.hoursClosed}</p>
              </InfoContent>
            </InfoCard>
            <InfoCard>
              <InfoIcon><HiMail /></InfoIcon>
              <InfoContent>
                <h4>E-posta</h4>
                <p><a href="mailto:info@farukfotografcilik.com">info@farukfotografcilik.com</a></p>
              </InfoContent>
            </InfoCard>

            <CTARow>
              <Button as="a" href="https://wa.me/905324402957" target="_blank" $variant="whatsapp" $size="md">
                <FaWhatsapp /> WhatsApp
              </Button>
              <Button as="a" href="tel:+905324402957" $variant="outline" $size="md">
                <HiPhone /> {t.contact.info.phone}
              </Button>
            </CTARow>
          </InfoSection>
        </Grid>

        <MapSection>
          <iframe
            src="https://maps.google.com/maps?q=Faruk%20Foto%C4%9Fraf%C3%A7%C4%B1l%C4%B1k,%20Hobyar,%20Ankara%20Cd.%20No:55,%2034112%20Fatih%2F%C4%B0stanbul&t=&z=16&ie=UTF8&iwloc=&output=embed"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Faruk Fotoğrafçılık"
          />
        </MapSection>
      </Container>
    </PageWrapper>
  );
}
