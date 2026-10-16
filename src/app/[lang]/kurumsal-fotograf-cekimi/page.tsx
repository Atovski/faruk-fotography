import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceLanding from '@/components/landing/ServiceLanding';
import { kurumsalGroup } from '@/content/landing/kurumsal';
import { landingJsonLd, landingLanguages, landingMetadata, landingStaticParams, resolveLanding } from '@/lib/landing-page';

export const dynamicParams = false;

export function generateStaticParams() {
  return landingStaticParams(kurumsalGroup);
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return landingMetadata(kurumsalGroup, lang);
}

export default async function CorporatePhotographyPage({ params }: Props) {
  const { lang } = await params;
  const entry = resolveLanding(kurumsalGroup, lang);
  if (!entry) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd(kurumsalGroup, lang)) }}
      />
      <ServiceLanding content={entry.content} languages={landingLanguages(kurumsalGroup, lang)} />
    </>
  );
}
