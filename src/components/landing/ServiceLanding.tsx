'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';
import { HiCheck, HiLocationMarker, HiPhone, HiClock } from 'react-icons/hi';
import { theme } from '@/styles/theme';
import { fadeInUp } from '@/styles/animations';
import { Button } from '@/components/ui/Button';
import { getWhatsAppUrl } from '@/lib/utils';
import { SHOP, type LandingContent } from '@/content/landing/types';

const Page = styled.div`
  padding-top: 100px;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg} ${theme.spacing['4xl']};
`;

const LanguageBar = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  justify-content: center;
  padding-top: ${theme.spacing.lg};

  a {
    padding: 4px 14px;
    border-radius: ${theme.borderRadius.full};
    border: 1px solid ${theme.colors.glassBorder};
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.textSecondary};
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

const Badge = styled.span`
  display: inline-block;
  padding: 6px 20px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  background: ${theme.colors.secondary}15;
  color: ${theme.colors.secondaryDark};
  border: 1px solid ${theme.colors.secondary}30;
  margin-bottom: ${theme.spacing.md};
  letter-spacing: 1px;
`;

const H1 = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes['5xl']};
  line-height: 1.15;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

const Intro = styled.p`
  font-size: ${theme.fontSizes.lg};
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
  max-width: 760px;
  margin: 0 auto ${theme.spacing.xl};
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  justify-content: center;
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

  const ctas = (
    <CtaRow>
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

  return (
    <Page lang={c.locale} dir={c.dir}>
      <Container>
        {languages.length > 1 && (
          <LanguageBar aria-label="Language">
            {languages.map((l) => (
              <Link key={l.href} href={l.href} hrefLang={l.hrefLang} aria-current={l.active ? 'page' : undefined}>
                {l.label}
              </Link>
            ))}
          </LanguageBar>
        )}

        <Hero>
          <Badge>{c.badge}</Badge>
          <H1>{c.h1}</H1>
          <Intro>{c.intro}</Intro>
          {ctas}
        </Hero>

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
