'use client';

import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp } from '@/styles/animations';
import { useLanguage } from '@/hooks/useLanguage';
import SectionTitle from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { HiCamera, HiFilm, HiPhotograph, HiGift, HiCheck, HiUsers, HiShoppingBag, HiCube } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { getLocalizedHref } from '@/i18n/config';

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg} ${theme.spacing['4xl']};
`;

const ServiceBlock = styled.div<{ $reverse?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['3xl']};
  align-items: center;
  padding: ${theme.spacing['3xl']} 0;
  border-bottom: 1px solid ${theme.colors.glassBorder};
  animation: ${fadeInUp} 0.6s ease forwards;

  &:last-child {
    border-bottom: none;
  }

  ${({ $reverse }) => $reverse && `
    direction: rtl;
    & > * {
      direction: ltr;
    }
  `}

  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
    direction: ltr;
    & > * { direction: ltr; }
  }
`;

const ServiceInfo = styled.div``;

const ServiceIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.secondary}15;
  color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: ${theme.spacing.lg};
`;

const ServiceName = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`;

const ServiceDesc = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: ${theme.spacing.xl};
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};
`;

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.textSecondary};

  svg {
    color: ${theme.colors.secondary};
    flex-shrink: 0;
  }
`;

const ServiceVisual = styled.div`
  background: ${theme.colors.gradientCard};
  border-radius: ${theme.borderRadius.xl};
  border: 1px solid ${theme.colors.glassBorder};
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, ${theme.colors.secondary}10 0%, transparent 70%);
  }
`;

const BigIcon = styled.div`
  font-size: 80px;
  color: ${theme.colors.secondary}30;
  z-index: 1;
`;

const PriceTag = styled.div`
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  padding: 8px 20px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.secondary}15;
  border: 1px solid ${theme.colors.secondary}30;
  margin-bottom: ${theme.spacing.lg};

  span.label {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.textSecondary};
  }

  span.amount {
    font-size: ${theme.fontSizes['2xl']};
    font-weight: 700;
    color: ${theme.colors.secondary};
    font-family: ${theme.fonts.heading};
  }

  span.custom-price {
    font-size: ${theme.fontSizes.lg};
    font-weight: 600;
    color: ${theme.colors.secondary};
  }
`;

const services = [
  {
    key: 'passport' as const,
    icon: HiUsers,
    // The owner prefers not to publish passport photo prices.
    priceStr: { en: 'Ask on WhatsApp for prices', tr: "Fiyat için WhatsApp'tan yazın" },
    detailPath: '/vesikalik-fotograf',
    whatsappMsg: 'Merhaba, vesikalık/biyometrik fotoğraf veya kurumsal portre çekimi hakkında bilgi almak istiyorum.',
  },
  {
    key: 'studio' as const,
    icon: HiCube,
    priceStr: { en: 'Pricing based on quantity', tr: 'Ürün adedine göre fiyatlandırma' },
    image: '/urun-cekim.webp',
    whatsappMsg: 'Merhaba, e-ticaret (Etsy, Amazon vb.) mağazalarım için profesyonel ürün çekimi hizmetiniz hakkında bilgi almak istiyorum.',
  },
  {
    key: 'film' as const,
    icon: HiFilm,
    price: '600',
    detailPath: '/film-banyo',
    whatsappMsg: 'Merhaba, film banyo yaptırmak istiyorum.',
  },
  {
    key: 'print' as const,
    icon: HiPhotograph,
    price: '50',
    detailPath: '/fotograf-baski',
    whatsappMsg: 'Merhaba, fotoğraf baskı yaptırmak istiyorum.',
  },
  {
    key: 'equipment' as const,
    icon: HiShoppingBag,
    priceStr: { en: 'Offer within 24 hours', tr: '24 saat içerisinde teklif' },
    whatsappMsg: 'Merhaba, fotoğraf makinesi ve analog film ekipmanları/stokları hakkında bilgi almak istiyorum.',
  },
  {
    key: 'sublimation' as const,
    icon: HiGift,
    price: '400',
    whatsappMsg: 'Merhaba, kişiselleştirilebilir ürün (kupa/magnet) sipariş etmek istiyorum.',
  },
];

export default function ServicesPage() {
  const { t, language } = useLanguage();

  return (
    <PageWrapper>
      <Container>
        <SectionTitle
          badge={t.services.subtitle}
          title={t.services.title}
          as="h1"
        />

        {services.map((service, index) => {
          const Icon = service.icon;
          const data = t.services[service.key];
          return (
            <ServiceBlock key={service.key} $reverse={index % 2 === 1}>
              <ServiceInfo>
                <ServiceIcon><Icon /></ServiceIcon>
                <ServiceName>{data.title}</ServiceName>
                <PriceTag>
                  {'priceStr' in service && service.priceStr ? (
                    <span className="custom-price">
                      {language === 'en' ? service.priceStr.en : service.priceStr.tr}
                    </span>
                  ) : (
                    <>
                      <span className="label">{t.common.startingFrom}</span>
                      <span className="amount">₺{'price' in service ? service.price : ''}</span>
                    </>
                  )}
                </PriceTag>
                <ServiceDesc>{data.description}</ServiceDesc>
                <FeatureList>
                  {data.features.map((feature, i) => (
                    <Feature key={i}>
                      <HiCheck size={18} />
                      {feature}
                    </Feature>
                  ))}
                </FeatureList>
                <Button
                  as="a"
                  href={getWhatsAppUrl(service.whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  $variant="whatsapp"
                  $size="md"
                >
                  <FaWhatsapp /> {t.common.contactUs}
                </Button>
                {'detailPath' in service && service.detailPath && (
                  <Button as={Link} href={getLocalizedHref(service.detailPath, language)} $variant="outline" $size="md" style={{ marginInlineStart: '12px' }}>
                    {language === 'en' ? 'Learn More' : 'Detaylı Bilgi'}
                  </Button>
                )}
              </ServiceInfo>

              <ServiceVisual>
                {'image' in service && service.image ? (
                  <Image
                    src={service.image}
                    alt={data.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <BigIcon><Icon /></BigIcon>
                )}
              </ServiceVisual>
            </ServiceBlock>
          );
        })}
      </Container>
    </PageWrapper>
  );
}
