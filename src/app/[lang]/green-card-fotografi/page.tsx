import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceLanding from '@/components/landing/ServiceLanding';
import { greenCardGroup } from '@/content/landing/greencard';
import { landingJsonLd, landingLanguages, landingMetadata, landingStaticParams, resolveLanding } from '@/lib/landing-page';

export const dynamicParams = false;

export function generateStaticParams() {
  return landingStaticParams(greenCardGroup);
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return landingMetadata(greenCardGroup, lang);
}

export default async function GreenCardPhotoPage({ params }: Props) {
  const { lang } = await params;
  const entry = resolveLanding(greenCardGroup, lang);
  if (!entry) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd(greenCardGroup, lang)) }}
      />
      <ServiceLanding content={entry.content} languages={landingLanguages(greenCardGroup, lang)} />
    </>
  );
}
