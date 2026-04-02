'use client';

import { Suspense } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp } from '@/styles/animations';
import { HiCheckCircle, HiHome, HiShoppingBag } from 'react-icons/hi';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/hooks/useLanguage';

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

  return (
    <SuccessCard>
      <IconWrapper>
        <HiCheckCircle />
      </IconWrapper>
      
      <Title>{isEn ? 'Thank you for your order!' : 'Siparişiniz İçin Teşekkür Ederiz!'}</Title>
      
      <Description>
        {isEn 
          ? 'Your order has been successfully placed. Order details and status have been sent to your email address.'
          : 'Siparişiniz başarıyla alınmıştır. Sipariş detayları ve siparişinizin durumu e-posta adresinize gönderilmiştir.'}
      </Description>

      <OrderNumberBox>
        <p>{isEn ? 'Your Order Number' : 'Sipariş Numaranız'}</p>
        <strong>{orderNumber}</strong>
      </OrderNumberBox>

      <Actions>
        <Link href="/urunler" passHref>
          <Button $variant="outline" $size="lg">
            <HiShoppingBag /> {isEn ? 'Continue Shopping' : 'Alışverişe Devam Et'}
          </Button>
        </Link>
        <Link href="/" passHref>
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
