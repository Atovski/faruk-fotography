'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';
import { HiCheck, HiLocationMarker, HiPhone, HiClock } from 'react-icons/hi';
import { theme } from '@/styles/theme';
import { fadeIn, fadeInUp } from '@/styles/animations';
import { Button } from '@/components/ui/Button';
import { getWhatsAppUrl } from '@/lib/utils';
import { SHOP, type LandingContent } from '@/content/landing/types';

/**
 * With a photo hero the picture runs under the fixed navbar, so the page
 * keeps no top padding of its own; without one the copy still needs clearing.
 */
const Page = styled.div<{ $photoHero?: boolean }>`
  padding-top: ${({ $photoHero }) => ($photoHero ? '0' : '100px')};
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg} ${theme.spacing['4xl']};
`;

const LanguageBar = styled.nav<{ $onDark?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  justify-content: center;
  padding-top: ${({ $onDark }) => ($onDark ? '0' : theme.spacing.lg)};
  margin-bottom: ${({ $onDark }) => ($onDark ? theme.spacing.lg : '0')};

  a {
    padding: 4px 14px;
    border-radius: ${theme.borderRadius.full};
    font-size: ${theme.fontSizes.sm};
    border: 1px solid
      ${({ $onDark }) => ($onDark ? 'rgba(255, 255, 255, 0.28)' : theme.colors.glassBorder)};
    color: ${({ $onDark }) =>
      $onDark ? 'rgba(255, 255, 255, 0.88)' : theme.colors.textSecondary};
    background: ${({ $onDark }) => ($onDark ? 'rgba(10, 22, 40, 0.42)' : 'transparent')};
  }

  a[aria-current='page'] {
    background: ${theme.colors.secondary};
    border-color: ${theme.colors.secondary};
    color: ${theme.colors.white};
  }
`;

const Hero = styled.header`
  text-align: center;
  padding: ${theme.spacing['2xl']} 0 ${theme.spacing.xl};
  animation: ${fadeInUp} 0.6s ease forwards;
`;

const Badge = styled.span<{ $onDark?: boolean }>`
  display: inline-block;
  padding: 6px 20px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
  letter-spacing: 1px;
  background: ${({ $onDark }) =>
    $onDark ? 'rgba(27, 42, 74, 0.5)' : `${theme.colors.secondary}15`};
  color: ${({ $onDark }) =>
    $onDark ? theme.colors.secondaryLight : theme.colors.secondaryDark};
  border: 1px solid
    ${({ $onDark }) => ($onDark ? 'rgba(200, 164, 92, 0.55)' : `${theme.colors.secondary}30`)};
`;

/** Cut-out product shot under the hero copy; kept small so the text still leads. */
const HeroProduct = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 4 / 3;
  margin: ${theme.spacing.xl} auto 0;
`;

/**
 * The shop photo is scenery, not a figure in the copy: it runs the full width
 * behind the heading the way the home page runs its video, with the same
 * navy wash, grain and fade into the cream page below.
 */
const PhotoHero = styled.header`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-height: 78vh;
  padding: 150px ${theme.spacing.lg} ${theme.spacing['3xl']};
  overflow: hidden;
  background: ${theme.colors.primaryDark};

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-height: 0;
    padding: 120px ${theme.spacing.md} ${theme.spacing['2xl']};
  }
`;

const PhotoHeroImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    object-fit: cover;
    object-position: center 58%;
  }
`;

/** Same three washes the home page lays over its video. */
const PhotoHeroScrim = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      /* Deeper than the home page's: the studio's white backdrop is bright,
         and the gold outline buttons have to stay legible over it. */
      linear-gradient(180deg, rgba(10, 22, 40, 0.74) 0%, rgba(10, 22, 40, 0.6) 38%, rgba(10, 22, 40, 0.9) 100%),
      radial-gradient(ellipse at 20% 50%, rgba(200, 164, 92, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(27, 42, 74, 0.28) 0%, transparent 50%);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 62%, ${theme.colors.background} 100%);
  }
`;

/**
 * Static, unlike the home page's: animating a full-bleed noise layer repaints
 * the whole hero ten times every eight seconds, and the texture is the same
 * either way.
 */
const PhotoHeroGrain = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.4;
  background: transparent url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E") repeat;
`;

const PhotoHeroContent = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 820px;
  text-align: center;
  animation: ${fadeIn} 1s ease;
`;

const H1 = styled.h1<{ $onDark?: boolean }>`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['5xl']};
  line-height: 1.15;
  text-wrap: balance;
  margin-bottom: ${theme.spacing.md};
  color: ${({ $onDark }) => ($onDark ? theme.colors.white : theme.colors.text)};
  text-shadow: ${({ $onDark }) => ($onDark ? '0 4px 14px rgba(0, 0, 0, 0.75)' : 'none')};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

const Intro = styled.p<{ $onDark?: boolean }>`
  font-size: ${theme.fontSizes.lg};
  line-height: 1.7;
  max-width: 760px;
  margin: 0 auto ${theme.spacing.xl};
  color: ${({ $onDark }) => ($onDark ? 'rgba(255, 255, 255, 0.93)' : theme.colors.textSecondary)};
  text-shadow: ${({ $onDark }) => ($onDark ? '0 2px 10px rgba(0, 0, 0, 0.8)' : 'none')};
`;

const CtaRow = styled.div<{ $onDark?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  justify-content: center;

  /* The studio's white backdrop falls right behind this row, so the gold
     outline buttons get a dark backing to stay readable. A solid wash, not
     backdrop-filter: several blurred layers over the hero froze the tab. */
  ${({ $onDark }) =>
    $onDark &&
    css`
      a:not([href*='wa.me']) {
        background: rgba(10, 22, 40, 0.58);
        color: ${theme.colors.secondaryLight};
        border-color: ${theme.colors.secondaryLight};
      }

      a:not([href*='wa.me']):hover {
        background: ${theme.colors.secondary};
        color: ${theme.colors.primaryDark};
      }
    `}
`;

const Highlights = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${theme.spacing.lg};
  margin: ${theme.spacing.xl} 0 ${theme.spacing['2xl']};
`;

const Card = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};

  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: ${theme.fontSizes.lg};
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing.sm};

    svg {
      color: ${theme.colors.secondary};
      flex-shrink: 0;
    }
  }

  p {
    color: ${theme.colors.textSecondary};
    line-height: 1.6;
  }
`;

const Section = styled.section`
  margin-bottom: ${theme.spacing['2xl']};

  h2 {
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes['3xl']};
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing.md};
  }

  p {
    color: ${theme.colors.textSecondary};
    line-height: 1.8;
    margin-bottom: ${theme.spacing.md};
  }

  ul {
    list-style: none;
    padding: 0;
    display: grid;
    gap: ${theme.spacing.sm};
  }

  li {
    display: flex;
    gap: 10px;
    color: ${theme.colors.text};
    line-height: 1.6;

    svg {
      color: ${theme.colors.success};
      margin-top: 4px;
      flex-shrink: 0;
    }
  }
`;

const TableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.surface};

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 12px 16px;
    text-align: start;
    border-bottom: 1px solid ${theme.colors.surfaceHover};
  }

  th {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    font-weight: 600;
  }

  tr:last-child td {
    border-bottom: none;
  }

  td:last-child {
    font-weight: 600;
    color: ${theme.colors.text};
  }
`;

const Note = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing.sm};
`;

const Steps = styled.ol`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${theme.spacing.lg};
  counter-reset: step;

  li {
    counter-increment: step;
  }

  h3::before {
    content: counter(step);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: ${theme.colors.secondary};
    color: ${theme.colors.white};
    font-size: ${theme.fontSizes.sm};
  }
`;

const Faq = styled.div`
  display: grid;
  gap: ${theme.spacing.md};

  details {
    background: ${theme.colors.surface};
    border: 1px solid ${theme.colors.glassBorder};
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.spacing.md} ${theme.spacing.lg};
  }

  summary {
    cursor: pointer;
    font-weight: 600;
    color: ${theme.colors.text};
  }

  details p {
    margin: ${theme.spacing.sm} 0 0;
  }
`;

const Visit = styled(Card)`
  display: grid;
  gap: ${theme.spacing.md};
  background: ${theme.colors.primary};
  border-color: ${theme.colors.primary};

  h2 {
    color: ${theme.colors.white};
    margin-bottom: 0;
  }

  p {
    display: flex;
    gap: 10px;
    margin: 0;
    color: rgba(255, 255, 255, 0.85);

    svg {
      color: ${theme.colors.secondary};
      margin-top: 5px;
      flex-shrink: 0;
    }
  }

  a {
    color: ${theme.colors.white};
  }
`;

const Related = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};

  a {
    padding: 10px 18px;
    border-radius: ${theme.borderRadius.full};
    border: 1px solid ${theme.colors.secondary};
    color: ${theme.colors.secondaryDark};
    font-weight: 600;
  }
`;

interface ServiceLandingProps {
  content: LandingContent;
  languages: { label: string; href: string; active: boolean; hrefLang: string }[];
}

export default function ServiceLanding({ content: c, languages }: ServiceLandingProps) {
  const whatsappUrl = getWhatsAppUrl(c.whatsappMessage);

  const photoHero = c.heroImage?.fit === 'cover' ? c.heroImage : null;

  const ctas = (
    <CtaRow $onDark={!!photoHero}>
      <Button as="a" href={whatsappUrl} target="_blank" rel="noopener noreferrer" $variant="whatsapp" $size="lg">
        <FaWhatsapp /> {c.whatsappLabel}
      </Button>
      <Button as="a" href={`tel:${SHOP.phone}`} $variant="outline" $size="lg">
        <HiPhone /> {c.callLabel}
      </Button>
      <Button as="a" href={SHOP.mapsUrl} target="_blank" rel="noopener noreferrer" $variant="outline" $size="lg">
        <HiLocationMarker /> {c.directionsLabel}
      </Button>
    </CtaRow>
  );

  const languageBar = languages.length > 1 && (
    <LanguageBar aria-label="Language" $onDark={!!photoHero}>
      {languages.map((l) => (
        <Link key={l.href} href={l.href} hrefLang={l.hrefLang} aria-current={l.active ? 'page' : undefined}>
          {l.label}
        </Link>
      ))}
    </LanguageBar>
  );

  return (
    <Page lang={c.locale} dir={c.dir} $photoHero={!!photoHero}>
      {photoHero ? (
        <PhotoHero>
          <PhotoHeroImage>
            <Image src={photoHero.src} alt={photoHero.alt} fill sizes="100vw" priority />
          </PhotoHeroImage>
          <PhotoHeroScrim />
          <PhotoHeroGrain />
          <PhotoHeroContent>
            {languageBar}
            <Badge $onDark>{c.badge}</Badge>
            <H1 $onDark>{c.h1}</H1>
            <Intro $onDark>{c.intro}</Intro>
            {ctas}
          </PhotoHeroContent>
        </PhotoHero>
      ) : null}

      <Container>
        {!photoHero && languageBar}

        {!photoHero && (
          <Hero>
            <Badge>{c.badge}</Badge>
            <H1>{c.h1}</H1>
            <Intro>{c.intro}</Intro>
            {c.heroImage && (
              <HeroProduct>
                <Image src={c.heroImage.src} alt={c.heroImage.alt} fill sizes="(max-width: 640px) 90vw, 420px" style={{ objectFit: 'contain' }} priority />
              </HeroProduct>
            )}
            {ctas}
          </Hero>
        )}

        <Highlights>
          {c.highlights.map((h) => (
            <Card key={h.title}>
              <h3><HiCheck /> {h.title}</h3>
              <p>{h.text}</p>
            </Card>
          ))}
        </Highlights>

        {c.table && (
          <Section>
            <h2>{c.table.h2}</h2>
            {c.table.intro && <p>{c.table.intro}</p>}
            <TableWrap>
              <table>
                <thead>
                  <tr>
                    <th>{c.table.columns[0]}</th>
                    <th>{c.table.columns[1]}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.table.rows.map(([doc, size]) => (
                    <tr key={doc}>
                      <td>{doc}</td>
                      <td>{size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrap>
            {c.table.note && <Note>{c.table.note}</Note>}
          </Section>
        )}

        {c.sections.map((s) => (
          <Section key={s.h2}>
            <h2>{s.h2}</h2>
            {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
            {s.bullets && (
              <ul>
                {s.bullets.map((b) => (
                  <li key={b}><HiCheck /> {b}</li>
                ))}
              </ul>
            )}
          </Section>
        ))}

        {c.steps && (
          <Section>
            <h2>{c.steps.h2}</h2>
            <Steps>
              {c.steps.items.map((step) => (
                <li key={step.title}>
                  <Card as="div">
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </Card>
                </li>
              ))}
            </Steps>
          </Section>
        )}

        <Section>
          <h2>{c.faq.h2}</h2>
          <Faq>
            {c.faq.items.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </Faq>
        </Section>

        <Section>
          <Visit>
            <h2>{c.visit.h2}</h2>
            <p><HiLocationMarker /> <span>{c.visit.address}<br />{c.visit.transport}</span></p>
            <p><HiClock /> <span>{c.visit.hours}<br />{c.visit.closed}</span></p>
            <p><HiPhone /> <a href={`tel:${SHOP.phone}`} dir="ltr">{SHOP.phoneDisplay}</a></p>
          </Visit>
        </Section>

        <Section>{ctas}</Section>

        {c.related && (
          <Section>
            <h2>{c.related.h2}</h2>
            <Related>
              {c.related.links.map((l) => (
                <Link key={l.href} href={l.href}>{l.label}</Link>
              ))}
            </Related>
          </Section>
        )}
      </Container>
    </Page>
  );
}
