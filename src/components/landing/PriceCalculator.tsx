'use client';

import { useId, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';
import { theme } from '@/styles/theme';
import { Button } from '@/components/ui/Button';
import { getWhatsAppUrl } from '@/lib/utils';
import type { LandingContent } from '@/content/landing/types';

type Calc = NonNullable<LandingContent['priceCalculator']>;
type Size = Calc['sizes'][number];

/**
 * Sizes are identified the way the shop names them — "13x18" is centimetres,
 * so the id doubles as the paper's dimensions and the swatches can be drawn
 * to scale from it. A size whose id is not a pair of numbers simply gets no
 * swatch shape rather than a wrong one.
 */
function cmOf(id: string): [number, number] | null {
  const m = id.match(/^(\d+)\s*[x×]\s*(\d+)$/i);
  return m ? [Number(m[1]), Number(m[2])] : null;
}

/** 30 x 40 cm, the largest paper, stands 144px tall; the rest follow in proportion. */
const PX_PER_CM = 3.6;

const Panel = styled.div`
  max-width: 820px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  border-top: 3px solid ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.sm};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.md};
  }
`;

const Label = styled.span`
  display: block;
  font-size: ${theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${theme.colors.textSecondary};
`;

/* ── The sizes, drawn as the paper they are ───────────────────────────── */

const Counter = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;

  legend {
    padding: 0;
  }
`;

const Papers = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 18px;
  margin-top: 18px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${theme.colors.surfaceHover};
  overflow-x: auto;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 12px;
  }
`;

const Paper = styled.label<{ $w: number; $h: number }>`
  flex: 0 0 auto;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  .sheet {
    display: block;
    width: ${({ $w }) => $w}px;
    height: ${({ $h }) => $h}px;
    background: ${theme.colors.white};
    border: 1px solid #d9d5cc;
    box-shadow: ${theme.shadows.sm};
    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  }

  .cm {
    display: block;
    margin-top: 10px;
    font-size: ${theme.fontSizes.xs};
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: ${theme.colors.textSecondary};
    text-align: center;
    white-space: nowrap;
    transition: color 0.18s ease;
  }

  &:hover .sheet {
    transform: translateY(-3px);
    box-shadow: ${theme.shadows.md};
  }

  input:checked + .sheet {
    border-color: ${theme.colors.secondary};
    box-shadow: 0 0 0 2px ${theme.colors.secondary}, ${theme.shadows.md};
    transform: translateY(-3px);
  }

  input:checked ~ .cm {
    color: ${theme.colors.text};
    font-weight: 700;
  }

  input:focus-visible + .sheet {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 4px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .sheet {
      width: ${({ $w }) => Math.round($w * 0.72)}px;
      height: ${({ $h }) => Math.round($h * 0.72)}px;
    }
  }
`;

/* ── Quantity and the figure ──────────────────────────────────────────── */

const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  padding-top: 20px;
`;

const Stepper = styled.div`
  display: inline-flex;
  align-items: stretch;
  margin-top: 10px;
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.sm};
  overflow: hidden;

  button {
    width: 44px;
    border: none;
    background: ${theme.colors.background};
    color: ${theme.colors.primary};
    font-size: 1.25rem;
    line-height: 1;

    &:hover:not(:disabled) {
      background: ${theme.colors.surfaceHover};
    }
    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    &:focus-visible {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: -2px;
    }
  }

  input {
    width: 80px;
    border: none;
    border-inline: 1px solid ${theme.colors.glassBorder};
    background: ${theme.colors.surface};
    color: ${theme.colors.text};
    text-align: center;
    font-size: ${theme.fontSizes.lg};
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    appearance: textfield;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      appearance: none;
      margin: 0;
    }
    &:focus-visible {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: -2px;
    }
  }
`;

const Figure = styled.div`
  text-align: end;
  margin-inline-start: auto;
`;

const Total = styled.strong`
  display: block;
  font-family: ${theme.fonts.heading};
  font-weight: 700;
  font-size: clamp(2rem, 6vw, 2.75rem);
  line-height: 1;
  color: ${theme.colors.primary};
  font-variant-numeric: tabular-nums;
`;

const Unit = styled.span`
  display: block;
  margin-top: 8px;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  font-variant-numeric: tabular-nums;
`;

/* ── The next volume break, and the full ladder ───────────────────────── */

const NextTier = styled.p`
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 18px 0 0;
  padding: 12px 14px;
  border-inline-start: 3px solid ${theme.colors.secondary};
  background: ${theme.colors.background};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text};
`;

const Order = styled.div`
  margin-top: ${theme.spacing.lg};
`;

const Ladder = styled.details`
  margin-top: ${theme.spacing.md};

  summary {
    cursor: pointer;
    font-size: ${theme.fontSizes.sm};
    font-weight: 600;
    color: ${theme.colors.textSecondary};

    &:hover {
      color: ${theme.colors.text};
    }
    &:focus-visible {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 3px;
    }
  }

  table {
    width: 100%;
    max-width: 420px;
    margin-top: 14px;
    border-collapse: collapse;
    font-size: ${theme.fontSizes.sm};
    font-variant-numeric: tabular-nums;
  }

  td {
    padding: 7px 0;
    border-bottom: 1px solid ${theme.colors.surfaceHover};
    color: ${theme.colors.textSecondary};
  }

  td:last-child {
    text-align: end;
    font-weight: 700;
    color: ${theme.colors.text};
  }

  tr[data-current='true'] td {
    background: rgba(200, 164, 92, 0.14);
    color: ${theme.colors.text};
    font-weight: 700;
  }

  tr[data-current='true'] td:first-child {
    box-shadow: inset 3px 0 0 ${theme.colors.secondary};
    padding-inline-start: 10px;
  }

  tr[data-current='true'] td:last-child {
    padding-inline-end: 10px;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

/** The first band whose range contains qty; the last band carries the rest. */
function tierFor(tiers: Size['tiers'], qty: number) {
  return tiers.find((t) => qty >= t.min && (t.max === null || qty <= t.max)) ?? tiers[tiers.length - 1];
}

export default function PriceCalculator({ calc }: { calc: Calc }) {
  const groupName = useId();
  const [sizeId, setSizeId] = useState(calc.sizes[0].id);
  const [qty, setQty] = useState(1);

  const size = calc.sizes.find((s) => s.id === sizeId) ?? calc.sizes[0];

  const { tier, total, next } = useMemo(() => {
    const t = tierFor(size.tiers, qty);
    return {
      tier: t,
      total: t.price * qty,
      next: size.tiers.find((x) => x.price < t.price && x.min > qty) ?? null,
    };
  }, [size, qty]);

  const money = (n: number) =>
    `${n.toLocaleString('tr-TR', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })} ${calc.currency}`;

  const orderUrl = getWhatsAppUrl(
    calc.ctaTemplate.replace('{size}', size.label).replace('{qty}', String(qty)),
  );

  return (
    <Panel>
      <Counter>
        <legend><Label as="span">{calc.sizeLabel}</Label></legend>
        <Papers>
          {calc.sizes.map((s) => {
            const cm = cmOf(s.id);
            return (
              <Paper
                key={s.id}
                $w={cm ? cm[0] * PX_PER_CM : 48}
                $h={cm ? cm[1] * PX_PER_CM : 64}
              >
                <input
                  type="radio"
                  name={groupName}
                  value={s.id}
                  checked={s.id === sizeId}
                  onChange={() => setSizeId(s.id)}
                />
                <span className="sheet" aria-hidden="true" />
                <span className="cm">{s.label}</span>
              </Paper>
            );
          })}
        </Papers>
      </Counter>

      <Bottom>
        <div>
          <Label as="label" htmlFor={`${groupName}-qty`}>{calc.quantityLabel}</Label>
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
              id={`${groupName}-qty`}
              type="number"
              min={1}
              max={9999}
              value={qty}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10);
                setQty(Number.isNaN(n) ? 1 : Math.min(9999, Math.max(1, n)));
              }}
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
        </div>

        <Figure>
          <Total aria-live="polite">{money(total)}</Total>
          <Unit>{calc.unitLabel}: {money(tier.price)}</Unit>
        </Figure>
      </Bottom>

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

      <Ladder>
        <summary>{calc.allTiersLabel}</summary>
        <table>
          <tbody>
            {size.tiers.map((t) => (
              <tr key={t.min} data-current={t === tier}>
                <td>{t.max === null ? `${t.min}+` : t.max === t.min ? `${t.min}` : `${t.min}–${t.max}`}</td>
                <td>{money(t.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Ladder>
    </Panel>
  );
}
