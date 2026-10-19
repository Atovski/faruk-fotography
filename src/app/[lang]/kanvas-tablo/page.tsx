import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceLanding from '@/components/landing/ServiceLanding';
import { kanvasGroup } from '@/content/landing/kanvas';
import { landingJsonLd, landingLanguages, landingMetadata, landingStaticParams, resolveLanding } from '@/lib/landing-page';

export const dynamicParams = false;

export function generateStaticParams() {
  return landingStaticParams(kanvasGroup);
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return landingMetadata(kanvasGroup, lang);
}

export default async function KanvasTabloPage({ params }: Props) {
  const { lang } = await params;
  const entry = resolveLanding(kanvasGroup, lang);
  if (!entry) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd(kanvasGroup, lang)) }}
      />
      <ServiceLanding content={entry.content} languages={landingLanguages(kanvasGroup, lang)} />
    </>
  );
}
