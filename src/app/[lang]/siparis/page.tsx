'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { fadeInUp, fadeIn } from '@/styles/animations';
import { Button } from '@/components/ui/Button';
import { HiArrowLeft, HiShoppingCart, HiLocationMarker, HiCreditCard, HiCheck, HiShieldCheck } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { useLanguage } from '@/hooks/useLanguage';
import { getLocalizedHref } from '@/i18n/config';

/* ───── Types ───── */
interface CartProduct {
  id: string;
  name_tr: string;
  name_en: string;
  price: number;
  image_url: string;
  images?: string[];
  stock: number;
}

interface CartItem {
  product: CartProduct;
  quantity: number;
}

/* ───── Layout ───── */
const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg} ${theme.spacing['4xl']};
`;

const PageTitle = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
  animation: ${fadeInUp} 0.5s ease;

  h1 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes['3xl']};
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    color: ${theme.colors.textSecondary};
    font-size: ${theme.fontSizes.md};
  }
`;

const BackLink = styled.div`
  margin-bottom: ${theme.spacing.xl};
  animation: ${fadeIn} 0.3s ease;

  a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: ${theme.colors.textSecondary};
    text-decoration: none;
    font-size: ${theme.fontSizes.sm};
    transition: color ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.secondary};
    }
  }
`;

/* ───── Steps Indicator ───── */
const StepsBar = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['3xl']};
  animation: ${fadeIn} 0.4s ease;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: ${theme.spacing.md};
  }
`;

const Step = styled.div<{ $active: boolean; $done: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ $active, $done }) =>
    $active ? theme.colors.secondary :
    $done ? theme.colors.success :
    theme.colors.textMuted};
  transition: color ${theme.transitions.fast};

  .num {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border: 2px solid ${({ $active, $done }) =>
      $active ? theme.colors.secondary :
      $done ? theme.colors.success :
      theme.colors.surfaceLight};
    background: ${({ $active, $done }) =>
      $active ? theme.colors.secondary + '20' :
      $done ? theme.colors.success + '20' :
      'transparent'};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .label { display: none; }
  }
`;

const StepConnector = styled.div<{ $done: boolean }>`
  width: 40px;
  height: 2px;
  background: ${({ $done }) => $done ? theme.colors.success : theme.colors.surfaceLight};
  align-self: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 20px;
  }
`;

/* ───── Main Layout ───── */
const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: ${theme.spacing['2xl']};
  animation: ${fadeInUp} 0.5s ease;

  @media (max-width: ${theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
  }
`;

/* ───── Form Card ───── */
const FormCard = styled.div`
  background: ${theme.colors.glassBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
`;

const FormTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: 10px;

  svg { color: ${theme.colors.secondary}; }
`;

const FormRow = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: ${({ $cols }) => $cols === 2 ? '1fr 1fr' : '1fr'};
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 18px;
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.glassBorder};
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.md};
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${theme.colors.secondary};
    box-shadow: 0 0 0 3px ${theme.colors.secondary}20;
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px 18px;
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.glassBorder};
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.md};
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${theme.colors.secondary};
    box-shadow: 0 0 0 3px ${theme.colors.secondary}20;
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

/* ───── Order Summary Sidebar ───── */
const SummaryCard = styled.div`
  background: ${theme.colors.glassBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  position: sticky;
  top: 100px;
`;

const SummaryTitle = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: 10px;

  svg { color: ${theme.colors.secondary}; }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.sm} 0;
  border-bottom: 1px solid ${theme.colors.glassBorder};

  &:last-of-type {
    border-bottom: none;
  }

  .name {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.text};
    flex: 1;
  }

  .qty {
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.textMuted};
    margin: 0 ${theme.spacing.md};
  }

  .price {
    font-family: ${theme.fonts.heading};
    font-weight: 600;
    color: ${theme.colors.secondary};
    font-size: ${theme.fontSizes.sm};
    white-space: nowrap;
  }
`;

const SummaryDivider = styled.div`
  height: 1px;
  background: ${theme.colors.secondary}30;
  margin: ${theme.spacing.md} 0;
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md} 0;

  .label {
    font-size: ${theme.fontSizes.lg};
    color: ${theme.colors.text};
    font-weight: 600;
  }

  .total {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes['2xl']};
    font-weight: 700;
    color: ${theme.colors.secondary};
  }
`;

const SecureBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.success}10;
  border: 1px solid ${theme.colors.success}30;
  color: ${theme.colors.success};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  margin-top: ${theme.spacing.md};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing['4xl']};
  animation: ${fadeIn} 0.4s ease;

  h2 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes['2xl']};
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${theme.colors.textSecondary};
    margin-bottom: ${theme.spacing.xl};
  }
`;

const TermsCheckboxContainer = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.lg};
  cursor: pointer;
  text-align: left;
  user-select: none;

  input {
    marginTop: 4px;
    width: 18px;
    height: 18px;
    accent-color: ${theme.colors.secondary};
    cursor: pointer;
    flex-shrink: 0;
  }

  span {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.textSecondary};
    line-height: 1.5;

    a {
      color: ${theme.colors.secondary};
      text-decoration: underline;
      text-underline-offset: 3px;
      &:hover { color: ${theme.colors.text}; }
    }
  }
`;

/* ───── Component ───── */
export default function CheckoutPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isEn = language === 'en';
  const { cart: globalCart, clearCart } = useCart();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [note, setNote] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Load saved delivery info from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('faruk_delivery');
      if (saved) {
        const d = JSON.parse(saved);
        if (d.fullName) setFullName(d.fullName);
        if (d.phone) setPhone(d.phone);
        if (d.email) setEmail(d.email);
        if (d.city) setCity(d.city);
        if (d.district) setDistrict(d.district);
        if (d.address) setAddress(d.address);
        if (d.postalCode) setPostalCode(d.postalCode);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  useEffect(() => {
    // If the Context cart is filled, prefer that. Otherwise try reading local storage fallback.
    if (globalCart.length > 0) {
      setCart(globalCart);
    } else {
      try {
        const stored = localStorage.getItem('faruk_cart');
        if (stored) {
          setCart(JSON.parse(stored));
        }
      } catch {
        // Ignore parse errors
      }
    }
  }, [globalCart]);

  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const shippingCost = total >= 1000 ? 0 : 99;
  const grandTotal = total + shippingCost;

  const isFormValid = fullName && phone && email && city && district && address;

  const handleContinueToPayment = () => {
    if (!isFormValid) {
      toast.error(isEn ? 'Please fill in all required fields.' : 'Lütfen zorunlu alanları doldurun.');
      return;
    }
    // Save delivery info to localStorage
    localStorage.setItem('faruk_delivery', JSON.stringify({ fullName, phone, email, city, district, address, postalCode }));
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [submitting, setSubmitting] = useState(false);

  const handlePayment = async () => {
    if (!acceptedTerms) {
      toast.error(isEn ? 'You must accept the Distance Selling Agreement and Return Policy.' : 'Lütfen Mesafeli Satış Sözleşmesi ve İade Politikasını onaylayınız.');
      return;
    }
    
    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(i => ({
            product_id: i.product.id,
            product_name: language === 'en' ? i.product.name_en : i.product.name_tr,
            price: i.product.price,
            quantity: i.quantity,
            image: i.product.image_url || (i.product.images?.[0]) || '',
          })),
          customer: { fullName, phone, email, city, district, address, postalCode, note },
          subtotal: total,
          shippingCost,
          grandTotal,
          language,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        clearCart(); // Empties the cart using global context mapping.
        router.push(`/siparis/basarili?orderNumber=${data.orderNumber}`);
      } else {
        toast.error(data.error || (isEn ? 'Order could not be created.' : 'Sipariş oluşturulamadı.'));
      }
    } catch {
      toast.error(isEn ? 'Connection error.' : 'Bağlantı hatası.');
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <PageWrapper>
        <Container>
          <EmptyState>
            <h2>🛒 {isEn ? 'Your Cart is Empty' : 'Sepetiniz Boş'}</h2>
            <p>{isEn ? 'Visit the products page to start shopping.' : 'Alışverişe başlamak için ürünler sayfasını ziyaret edin.'}</p>
            <Link href={getLocalizedHref('/urunler', language)}>
              <Button $variant="primary" $size="lg">
                <HiArrowLeft /> {isEn ? 'Back to Products' : 'Ürünlere Dön'}
              </Button>
            </Link>
          </EmptyState>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container>
        <BackLink>
          <Link href={getLocalizedHref('/urunler', language)}><HiArrowLeft /> {isEn ? 'Continue Shopping' : 'Alışverişe Devam Et'}</Link>
        </BackLink>

        <PageTitle>
          <h1>{isEn ? 'Complete Checkout' : 'Sipariş Tamamla'}</h1>
          <p>{isEn ? 'Enter your address details and pay securely' : 'Adres bilgilerinizi girin ve güvenli ödeme yapın'}</p>
        </PageTitle>

        {/* Steps */}
        <StepsBar>
          <Step $active={currentStep === 1} $done={currentStep > 1}>
            <span className="num">{currentStep > 1 ? <HiCheck /> : '1'}</span>
            <span className="label">{isEn ? 'Delivery Info' : 'Teslimat Bilgileri'}</span>
          </Step>
          <StepConnector $done={currentStep > 1} />
          <Step $active={currentStep === 2} $done={false}>
            <span className="num">2</span>
            <span className="label">{isEn ? 'Payment' : 'Ödeme'}</span>
          </Step>
        </StepsBar>

        <CheckoutGrid>
          {/* Left: Form */}
          <div>
            {currentStep === 1 && (
              <FormCard>
                <FormTitle><HiLocationMarker /> {isEn ? 'Delivery Address' : 'Teslimat Adresi'}</FormTitle>

                <FormRow $cols={2}>
                  <InputGroup>
                    <Label>{isEn ? 'Full Name' : 'Ad Soyad'} *</Label>
                    <Input
                      type="text"
                      placeholder={isEn ? "John Doe" : "Adınız Soyadınız"}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label>{isEn ? 'Phone' : 'Telefon'} *</Label>
                    <Input
                      type="tel"
                      placeholder="05XX XXX XX XX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormRow>

                <FormRow>
                  <InputGroup>
                    <Label>{isEn ? 'Email' : 'E-posta'} *</Label>
                    <Input
                      type="email"
                      placeholder="ornek@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormRow>

                <FormRow $cols={2}>
                  <InputGroup>
                    <Label>{isEn ? 'City' : 'İl'} *</Label>
                    <Input
                      type="text"
                      placeholder="İstanbul"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label>{isEn ? 'District' : 'İlçe'} *</Label>
                    <Input
                      type="text"
                      placeholder="Fatih"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormRow>

                <FormRow>
                  <InputGroup>
                    <Label>{isEn ? 'Full Address' : 'Açık Adres'} *</Label>
                    <TextArea
                      placeholder={isEn ? "Street, building number, apartment, etc." : "Mahalle, sokak, bina no, daire no"}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormRow>

                <FormRow $cols={2}>
                  <InputGroup>
                    <Label>{isEn ? 'Postal Code' : 'Posta Kodu'}</Label>
                    <Input
                      type="text"
                      placeholder={isEn ? "Zip code (optional)" : "34XXX (opsiyonel)"}
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </InputGroup>
                  <div /> {/* spacer */}
                </FormRow>

                <FormRow>
                  <InputGroup>
                    <Label>{isEn ? 'Order Note' : 'Sipariş Notu'}</Label>
                    <TextArea
                      placeholder={isEn ? "Any note you'd like to add (optional)" : "Varsa eklemek istediğiniz not (opsiyonel)"}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </InputGroup>
                </FormRow>

                <Button
                  $variant="primary"
                  $size="lg"
                  $fullWidth
                  onClick={handleContinueToPayment}
                  style={{ marginTop: theme.spacing.md }}
                >
                  {isEn ? 'Proceed to Payment →' : 'Ödemeye Geç →'}
                </Button>
              </FormCard>
            )}

            {currentStep === 2 && (
              <FormCard>
                <FormTitle><HiCreditCard /> {isEn ? 'Payment' : 'Ödeme'}</FormTitle>

                {cart.some(item => item.product.id.startsWith('film-banyo-')) && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 18px',
                    background: '#e74c3c15',
                    borderRadius: theme.borderRadius.lg,
                    border: '1px solid #e74c3c40',
                    marginBottom: theme.spacing.lg,
                  }}>
                    <span style={{ fontSize: '22px', flexShrink: 0 }}>⚠️</span>
                    <p style={{
                      fontSize: theme.fontSizes.sm,
                      color: '#e74c3c',
                      fontWeight: 700,
                      lineHeight: 1.5,
                      margin: 0,
                    }}>
                      {isEn
                        ? 'Film developing order: Don\'t forget to note your order number inside the package when shipping your films. (Your order number will be displayed on the next page after payment and sent to your e-mail.)'
                        : 'Banyo işlemi: Filmlerinizi paketlerken içine sipariş numaranızı not etmeyi unutmayınız. (Sipariş numaranız ödeme sonrası ekranda görüntülenecek ve e-posta adresinize iletilecektir.)'}
                    </p>
                  </div>
                )}

                <div style={{ marginBottom: theme.spacing.xl }}>
                  <div style={{
                    padding: theme.spacing.lg,
                    borderRadius: theme.borderRadius.lg,
                    background: theme.colors.surface,
                    border: `1px solid ${theme.colors.glassBorder}`,
                    marginBottom: theme.spacing.md,
                  }}>
                    <p style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary, marginBottom: '8px' }}>
                      <strong style={{ color: theme.colors.text }}>{isEn ? 'Delivery Address:' : 'Teslimat Adresi:'}</strong>
                    </p>
                    <p style={{ fontSize: theme.fontSizes.md, color: theme.colors.text, marginBottom: '4px' }}>
                      {fullName}
                    </p>
                    <p style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textSecondary, lineHeight: 1.6 }}>
                      {address}<br />
                      {district} / {city} {postalCode && `— ${postalCode}`}<br />
                      📱 {phone} {email && `• ✉️ ${email}`}
                    </p>
                    <button
                      onClick={() => setCurrentStep(1)}
                      style={{
                        marginTop: '12px',
                        background: 'none',
                        border: 'none',
                        color: theme.colors.secondary,
                        cursor: 'pointer',
                        fontSize: theme.fontSizes.sm,
                        fontWeight: 600,
                        padding: 0,
                      }}
                    >
                      ✏️ {isEn ? 'Edit Address' : 'Adresi Düzenle'}
                    </button>
                  </div>
                </div>

                <div style={{
                  padding: theme.spacing.xl,
                  borderRadius: theme.borderRadius.xl,
                  background: `linear-gradient(135deg, ${theme.colors.primaryDark} 0%, ${theme.colors.primary} 100%)`,
                  border: `1px solid ${theme.colors.secondary}30`,
                  textAlign: 'center',
                }}>
                  <HiCreditCard style={{ fontSize: '48px', color: theme.colors.secondary, marginBottom: '12px' }} />
                  <h3 style={{
                    fontFamily: theme.fonts.heading,
                    fontSize: theme.fontSizes.xl,
                    color: theme.colors.text,
                    marginBottom: '8px',
                  }}>
                    {isEn ? 'Secure Payment' : 'Güvenli Ödeme'}
                  </h3>
                  <p style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.fontSizes.sm,
                    marginBottom: theme.spacing.xl,
                    lineHeight: 1.6,
                  }}>
                    {isEn ? 'Pay securely with your credit card, debit card, or virtual card.' : 'Kredi kartı, banka kartı veya sanal kart ile güvenle ödeme yapın.'}<br />
                    {isEn ? 'All your details are encrypted with 256-bit SSL.' : 'Tüm bilgileriniz 256-bit SSL ile şifrelenir.'}
                  </p>

                  <TermsCheckboxContainer>
                    <input 
                      type="checkbox" 
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                    />
                    <span>
                      {isEn ? (
                        <>I have read and accept the <Link href={getLocalizedHref('/satis-sozlesmesi', language)} target="_blank">Distance Selling Agreement</Link> and <Link href={getLocalizedHref('/iade-politikasi', language)} target="_blank">Return Policy</Link>.</>
                      ) : (
                        <><Link href={getLocalizedHref('/satis-sozlesmesi', language)} target="_blank">Mesafeli Satış Sözleşmesini</Link> ve <Link href={getLocalizedHref('/iade-politikasi', language)} target="_blank">İade Politikasını</Link> okudum, anladım ve kabul ediyorum.</>
                      )}
                    </span>
                  </TermsCheckboxContainer>

                  <Button
                    $variant="primary"
                    $size="lg"
                    $fullWidth
                    onClick={handlePayment}
                    style={{
                      padding: '18px 32px',
                      fontSize: '18px',
                      fontWeight: 700,
                      letterSpacing: '0.5px',
                    }}
                  >
                    💳 {submitting ? (isEn ? 'Processing...' : 'İşleniyor...') : `${isEn ? 'Pay ₺' : '₺'}${formatPrice(grandTotal)}${isEn ? '' : ' Öde'}`}
                  </Button>

                  <SecureBadge style={{ marginTop: '16px' }}>
                    <HiShieldCheck size={16} /> {isEn ? 'Secure Payment with 256-bit SSL' : '256-bit SSL ile Güvenli Ödeme'}
                  </SecureBadge>
                </div>
              </FormCard>
            )}
          </div>

          {/* Right: Order Summary */}
          <SummaryCard>
            <SummaryTitle><HiShoppingCart /> {isEn ? 'Order Summary' : 'Sipariş Özeti'}</SummaryTitle>

            {cart.map(item => (
              <SummaryItem key={item.product.id}>
                <span className="name">{isEn ? item.product.name_en : item.product.name_tr}</span>
                <span className="qty">x{item.quantity}</span>
                <span className="price">₺{formatPrice(item.product.price * item.quantity)}</span>
              </SummaryItem>
            ))}

            <SummaryDivider />

            <SummaryItem>
              <span className="name">{isEn ? 'Subtotal' : 'Ara Toplam'}</span>
              <span className="price">₺{formatPrice(total)}</span>
            </SummaryItem>
            <SummaryItem>
              <span className="name">{isEn ? 'Shipping' : 'Kargo'}</span>
              <span className="price" style={{ color: shippingCost === 0 ? theme.colors.success : undefined }}>
                {shippingCost === 0 ? (isEn ? 'Free' : 'Ücretsiz') : `₺${shippingCost}`}
              </span>
            </SummaryItem>
            {shippingCost > 0 && (
              <p style={{ fontSize: theme.fontSizes.xs, color: theme.colors.textMuted, marginTop: '4px' }}>
                {isEn ? 'Free shipping on orders over ₺1,000!' : '₺1.000 ve üzeri siparişlerde kargo ücretsiz!'}
              </p>
            )}

            <SummaryDivider />

            <SummaryTotal>
              <span className="label">{isEn ? 'Grand Total' : 'Toplam'}</span>
              <span className="total">₺{formatPrice(grandTotal)}</span>
            </SummaryTotal>
          </SummaryCard>
        </CheckoutGrid>
      </Container>
    </PageWrapper>
  );
}
