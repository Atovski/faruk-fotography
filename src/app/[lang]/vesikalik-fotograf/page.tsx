import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceLanding from '@/components/landing/ServiceLanding';
import { vesikalikGroup } from '@/content/landing/vesikalik';
import { landingJsonLd, landingLanguages, landingMetadata, landingStaticParams, resolveLanding } from '@/lib/landing-page';

export const dynamicParams = false;

export function generateStaticParams() {
  return landingStaticParams(vesikalikGroup);
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return landingMetadata(vesikalikGroup, lang);
}

export default async function VesikalikFotografPage({ params }: Props) {
  const { lang } = await params;
  const entry = resolveLanding(vesikalikGroup, lang);
  if (!entry) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd(vesikalikGroup, lang)) }}
      />
      <ServiceLanding content={entry.content} languages={landingLanguages(vesikalikGroup, lang)} />
    </>
  );
}
