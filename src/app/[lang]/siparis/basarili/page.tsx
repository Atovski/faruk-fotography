'use client';

import { Suspense } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppUrl } from '@/lib/utils';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp } from '@/styles/animations';
import { HiCheckCircle, HiHome, HiShoppingBag } from 'react-icons/hi';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedHref } from '@/i18n/config';

const PageWrapper = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, ${theme.colors.background} 0%, #080C14 100%);
`;

const SuccessCard = styled.div`
  max-width: 600px;
  width: 90%;
  margin: 0 auto;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing['3xl']} ${theme.spacing['2xl']};
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  animation: ${fadeInUp} 0.6s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${theme.colors.success}, ${theme.colors.secondary});
  }
`;

const IconWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${theme.colors.success}15;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.xl};
  color: ${theme.colors.success};
  
  svg {
    width: 64px;
    height: 64px;
    filter: drop-shadow(0 0 10px ${theme.colors.success}40);
  }
`;

const Title = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: 32px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`;

const Description = styled.p`
  font-size: 16px;
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.xl};
`;

const OrderNumberBox = styled.div`
  background: ${theme.colors.background};
  border: 1px dashed ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['2xl']};

  p {
    font-size: 14px;
    color: ${theme.colors.textMuted};
    margin-bottom: 8px;
  }

  strong {
    display: block;
    font-family: ${theme.fonts.heading};
    font-size: 28px;
    color: ${theme.colors.secondary};
    letter-spacing: 2px;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || '-';
  const { language } = useLanguage();

  const isEn = language === 'en';

  const fallbackWaUrl = getWhatsAppUrl(isEn ? `Hello, I placed order #${orderNumber} on your website.` : `Merhaba, web sitenizden #${orderNumber} numaralı siparişi oluşturdum.`);

  // The checkout stores the full order message; if the WhatsApp tab was
  // blocked or closed, the customer can still send it from here. Swapping the
  // href at click time keeps server and client renders identical.
  const applyStoredOrderMessage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      const stored = sessionStorage.getItem('faruk_last_order_wa');
      if (stored) e.currentTarget.href = stored;
    } catch {
      // Keep the generic message.
    }
  };

  return (
    <SuccessCard>
      <IconWrapper>
        <HiCheckCircle />
      </IconWrapper>
      
      <Title>{isEn ? 'Your order has been received!' : 'Siparişiniz Alındı!'}</Title>

      <Description>
        {isEn
          ? 'Last step: send the prepared message on WhatsApp. We will reply with payment details (bank transfer or cash on delivery) and prepare your order.'
          : 'Son adım: WhatsApp\'ta hazırlanan mesajı gönderin. Ödeme bilgilerini (Havale/EFT veya kapıda ödeme) size iletip siparişinizi hazırlayacağız.'}
      </Description>

      <OrderNumberBox>
        <p>{isEn ? 'Your Order Number' : 'Sipariş Numaranız'}</p>
        <strong>{orderNumber}</strong>
      </OrderNumberBox>

      <Button as="a" href={fallbackWaUrl} onClick={applyStoredOrderMessage} target="_blank" rel="noopener noreferrer" $variant="whatsapp" $size="lg" $fullWidth style={{ marginBottom: theme.spacing.lg }}>
        <FaWhatsapp /> {isEn ? 'Send Order on WhatsApp' : 'Siparişi WhatsApp\'tan Gönder'}
      </Button>

      <Actions>
        <Link href={getLocalizedHref('/urunler', language)} passHref>
          <Button $variant="outline" $size="lg">
            <HiShoppingBag /> {isEn ? 'Continue Shopping' : 'Alışverişe Devam Et'}
          </Button>
        </Link>
        <Link href={`/${language}`} passHref>
          <Button $variant="primary" $size="lg">
            <HiHome /> {isEn ? 'Back to Home' : 'Anasayfaya Dön'}
          </Button>
        </Link>
      </Actions>
    </SuccessCard>
  );
}

export default function OrderSuccessPage() {
  return (
    <PageWrapper>
      <Suspense fallback={<div style={{ color: theme.colors.textMuted }}>Yükleniyor...</div>}>
        <SuccessContent />
      </Suspense>
    </PageWrapper>
  );
}
