import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceLanding from '@/components/landing/ServiceLanding';
import { vizeGroup } from '@/content/landing/vize';
import { landingJsonLd, landingLanguages, landingMetadata, landingStaticParams, resolveLanding } from '@/lib/landing-page';

export const dynamicParams = false;

export function generateStaticParams() {
  return landingStaticParams(vizeGroup);
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return landingMetadata(vizeGroup, lang);
}

export default async function VizeFotografiPage({ params }: Props) {
  const { lang } = await params;
  const entry = resolveLanding(vizeGroup, lang);
  if (!entry) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd(vizeGroup, lang)) }}
      />
      <ServiceLanding content={entry.content} languages={landingLanguages(vizeGroup, lang)} />
    </>
  );
}
