import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceLanding from '@/components/landing/ServiceLanding';
import { dugunGroup } from '@/content/landing/dugun';
import { landingJsonLd, landingLanguages, landingMetadata, landingStaticParams, resolveLanding } from '@/lib/landing-page';

export const dynamicParams = false;

export function generateStaticParams() {
  return landingStaticParams(dugunGroup);
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return landingMetadata(dugunGroup, lang);
}

export default async function DugunCekAtKameraPage({ params }: Props) {
  const { lang } = await params;
  const entry = resolveLanding(dugunGroup, lang);
  if (!entry) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd(dugunGroup, lang)) }}
      />
      <ServiceLanding content={entry.content} languages={landingLanguages(dugunGroup, lang)} />
    </>
  );
}
