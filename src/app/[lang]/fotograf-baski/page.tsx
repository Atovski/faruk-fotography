import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceLanding from '@/components/landing/ServiceLanding';
import { baskiGroup } from '@/content/landing/baski';
import { landingJsonLd, landingLanguages, landingMetadata, landingStaticParams, resolveLanding } from '@/lib/landing-page';

export const dynamicParams = false;

export function generateStaticParams() {
  return landingStaticParams(baskiGroup);
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return landingMetadata(baskiGroup, lang);
}

export default async function FotografBaskiPage({ params }: Props) {
  const { lang } = await params;
  const entry = resolveLanding(baskiGroup, lang);
  if (!entry) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd(baskiGroup, lang)) }}
      />
      <ServiceLanding content={entry.content} languages={landingLanguages(baskiGroup, lang)} />
    </>
  );
}
