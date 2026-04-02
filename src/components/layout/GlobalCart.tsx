'use client';

import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { HiShoppingCart, HiX, HiCreditCard } from 'react-icons/hi';
import { useCart } from '@/hooks/useCart';
import { useLanguage } from '@/hooks/useLanguage';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';

/* ───── Styled Components ───── */
const CartFloatingBtn = styled.button<{ $open: boolean }>`
  position: fixed;
  bottom: 90px;
  right: ${theme.spacing.lg};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${theme.colors.secondary};
  color: ${theme.colors.primaryDark};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border: none;
  cursor: pointer;
  box-shadow: ${theme.shadows.lg};
  z-index: 1000;
  opacity: ${({ $open }) => ($open ? 0 : 1)};
  pointer-events: ${({ $open }) => ($open ? 'none' : 'all')};
  transition: all ${theme.transitions.normal};
  &:hover { transform: scale(1.05); }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px; right: -5px;
  background: ${theme.colors.primaryDark};
  color: ${theme.colors.secondary};
  font-size: 12px; font-weight: bold;
  width: 24px; height: 24px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid ${theme.colors.secondary};
`;

const DarkOverlay = styled.div<{ $open: boolean }>`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  z-index: ${theme.zIndex.modal - 1};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'all' : 'none')};
  transition: opacity ${theme.transitions.normal};
`;

const CartPanel = styled.div<{ $open: boolean }>`
  position: fixed; top: 0; right: 0;
  width: 400px; max-width: 90vw; height: 100vh;
  background: ${theme.colors.background};
  border-left: 1px solid ${theme.colors.glassBorder};
  z-index: ${theme.zIndex.modal};
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform ${theme.transitions.normal};
  display: flex; flex-direction: column;
`;

const CartHeader = styled.div`
  padding: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.glassBorder};
  display: flex; justify-content: space-between; align-items: center;
  h2 { font-family: ${theme.fonts.heading}; font-size: ${theme.fontSizes.xl}; }
`;

const CartCloseBtn = styled.button`
  background: none; border: none; color: ${theme.colors.textSecondary};
  font-size: 24px; cursor: pointer; &:hover { color: ${theme.colors.text}; }
`;

const CartItems = styled.div`
  flex: 1; overflow-y: auto; padding: ${theme.spacing.lg};
`;

const CartItemCard = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: ${theme.spacing.md}; border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.surface}; margin-bottom: ${theme.spacing.md};
  .info h4 { font-size: ${theme.fontSizes.sm}; color: ${theme.colors.text}; margin-bottom: 2px; }
  .info p { font-size: ${theme.fontSizes.sm}; color: ${theme.colors.secondary}; }
`;

const QtyControls = styled.div`
  display: flex; align-items: center; gap: 8px;
  button {
    width: 28px; height: 28px; border-radius: ${theme.borderRadius.md};
    border: 1px solid ${theme.colors.surfaceLight}; background: transparent;
    color: ${theme.colors.text}; cursor: pointer; font-size: 16px;
    display: flex; align-items: center; justify-content: center;
    &:hover:not(:disabled) { border-color: ${theme.colors.secondary}; color: ${theme.colors.secondary}; }
    &:disabled { opacity: 0.3; cursor: not-allowed; }
  }
  span { font-weight: 600; min-width: 20px; text-align: center; }
`;

const CartFooter = styled.div`
  padding: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.glassBorder};
`;

const TotalRow = styled.div`
  display: flex; justify-content: space-between; margin-bottom: ${theme.spacing.lg};
  span:first-child { color: ${theme.colors.textSecondary}; font-size: ${theme.fontSizes.lg}; }
  span:last-child { font-family: ${theme.fonts.heading}; font-size: ${theme.fontSizes['2xl']}; color: ${theme.colors.secondary}; font-weight: 700; }
`;

const EmptyCart = styled.div`
  text-align: center; padding: ${theme.spacing['3xl']}; color: ${theme.colors.textMuted};
`;

const CheckoutBtn = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.secondary};
  color: ${theme.colors.primaryDark};
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.md};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
  }
`;

export default function GlobalCart() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, total, totalItems } = useCart();
  const { t, language } = useLanguage();
  const router = useRouter();

  const handleCheckout = () => {
    setCartOpen(false);
    router.push('/siparis');
  };

  return (
    <>
      <DarkOverlay $open={cartOpen} onClick={() => setCartOpen(false)} />
      
      {/* Floating Cart Button (only if there is something in cart) */}
      {totalItems > 0 && (
        <CartFloatingBtn $open={cartOpen} onClick={() => setCartOpen(true)} aria-label="Sepeti Aç">
          <HiShoppingCart />
          <CartBadge>{totalItems}</CartBadge>
        </CartFloatingBtn>
      )}

      {/* Cart Panel */}
      <CartPanel $open={cartOpen}>
        <CartHeader>
          <h2>Sepetim</h2>
          <CartCloseBtn onClick={() => setCartOpen(false)}><HiX /></CartCloseBtn>
        </CartHeader>
        
        <CartItems>
          {cart.length === 0 ? (
            <EmptyCart>Sepetiniz boş.</EmptyCart>
          ) : (
            cart.map(item => (
              <CartItemCard key={item.product.id}>
                <div className="info">
                  <h4>{language === 'tr' ? item.product.name_tr : item.product.name_en}</h4>
                  <p>₺{formatPrice(item.product.price)}</p>
                </div>
                <QtyControls>
                  <button onClick={() => updateQty(item.product.id, -1)} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQty(item.product.id, 1)} disabled={item.quantity >= item.product.stock}>+</button>
                  <button onClick={() => removeFromCart(item.product.id)} style={{ marginLeft: 8, borderColor: 'transparent', color: '#e74c3c' }}><HiX size={14}/></button>
                </QtyControls>
              </CartItemCard>
            ))
          )}
        </CartItems>
        
        {cart.length > 0 && (
          <CartFooter>
            <TotalRow>
              <span>Toplam</span>
              <span>₺{formatPrice(total)}</span>
            </TotalRow>
            <CheckoutBtn onClick={handleCheckout}>
              <HiCreditCard size={20} />
              Siparişi Tamamla
            </CheckoutBtn>
          </CartFooter>
        )}
      </CartPanel>
    </>
  );
}
