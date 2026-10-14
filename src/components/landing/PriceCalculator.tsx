'use client';

import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';
import { theme } from '@/styles/theme';
import { Button } from '@/components/ui/Button';
import { getWhatsAppUrl } from '@/lib/utils';
import type { LandingContent } from '@/content/landing/types';

type Calc = NonNullable<LandingContent['priceCalculator']>;

const Panel = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 28px;
  align-items: end;
  padding: 28px;
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  background: ${theme.colors.surface};
  box-shadow: ${theme.shadows.sm};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 22px;
    padding: 22px 18px;
  }
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.textSecondary};
`;

const Select = styled.select`
  min-width: 170px;
  padding: 11px 13px;
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.md};
  font-weight: 500;

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 1px;
  }
`;

const Stepper = styled.div`
  display: flex;
  align-items: stretch;
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  background: ${theme.colors.background};

  button {
    width: 42px;
    border: none;
    background: transparent;
    color: ${theme.colors.text};
    font-size: 1.15rem;
    line-height: 1;

    &:hover:not(:disabled) {
      background: ${theme.colors.surfaceHover};
    }
    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }

  input {
    width: 76px;
    border: none;
    border-left: 1px solid ${theme.colors.glassBorder};
    border-right: 1px solid ${theme.colors.glassBorder};
    background: transparent;
    color: ${theme.colors.text};
    text-align: center;
    font-size: ${theme.fontSizes.md};
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    appearance: textfield;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      appearance: none;
      margin: 0;
    }
  }
`;

const Readout = styled.div`
  text-align: right;

  @media (max-width: ${theme.breakpoints.tablet}) {
    text-align: left;
  }
`;

const Total = styled.div`
  font-family: ${theme.fonts.heading};
  font-weight: 700;
  font-size: 2.1rem;
  line-height: 1.1;
  color: ${theme.colors.primary};
  font-variant-numeric: tabular-nums;
`;

const Unit = styled.div`
  margin-top: 4px;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  font-variant-numeric: tabular-nums;
`;

const NextTier = styled.p`
  grid-column: 1 / -1;
  margin: 0;
  padding-top: 18px;
  border-top: 1px solid ${theme.colors.surfaceHover};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
`;

const Order = styled.div`
  grid-column: 1 / -1;
`;

/** The first tier whose range contains qty; falls back to the last one. */
function priceFor(tiers: Calc['sizes'][number]['tiers'], qty: number) {
  return tiers.find((t) => qty >= t.min && (t.max === null || qty <= t.max)) ?? tiers[tiers.length - 1];
}

export default function PriceCalculator({ calc }: { calc: Calc }) {
  const [sizeId, setSizeId] = useState(calc.sizes[0].id);
  const [qty, setQty] = useState(1);

  const size = calc.sizes.find((s) => s.id === sizeId) ?? calc.sizes[0];

  const { unit, total, next } = useMemo(() => {
    const tier = priceFor(size.tiers, qty);
    const cheaper = size.tiers.find((t) => t.price < tier.price && t.min > qty);
    return { unit: tier.price, total: tier.price * qty, next: cheaper ?? null };
  }, [size, qty]);

  const money = (n: number) =>
    `${n.toLocaleString('tr-TR', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })} ${calc.currency}`;

  const orderUrl = getWhatsAppUrl(
    calc.ctaTemplate.replace('{size}', size.label).replace('{qty}', String(qty)),
  );

  return (
    <Panel>
      <Controls>
        <Field>
          {calc.sizeLabel}
          <Select
            id="print-size"
            value={sizeId}
            onChange={(e) => setSizeId(e.target.value)}
          >
            {calc.sizes.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </Select>
        </Field>

        <Field as="div">
          <span>{calc.quantityLabel}</span>
          <Stepper>
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
              aria-label={`${calc.quantityLabel} −1`}
            >
              −
            </button>
            <input
              id="print-qty"
              type="number"
              min={1}
              max={9999}
              value={qty}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10);
                setQty(Number.isNaN(n) ? 1 : Math.min(9999, Math.max(1, n)));
              }}
              aria-label={calc.quantityLabel}
            />
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(9999, q + 1))}
              disabled={qty >= 9999}
              aria-label={`${calc.quantityLabel} +1`}
            >
              +
            </button>
          </Stepper>
        </Field>
      </Controls>

      <Readout>
        <Total aria-live="polite">{money(total)}</Total>
        <Unit>{calc.unitLabel}: {money(unit)}</Unit>
      </Readout>

      {next && (
        <NextTier>
          {calc.nextTierTemplate.replace('{qty}', String(next.min)).replace('{price}', money(next.price))}
        </NextTier>
      )}

      <Order>
        <Button as="a" href={orderUrl} target="_blank" rel="noopener noreferrer" $variant="whatsapp" $size="lg">
          <FaWhatsapp /> {calc.ctaLabel}
        </Button>
      </Order>
    </Panel>
  );
}
