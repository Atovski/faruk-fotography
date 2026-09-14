import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceLanding from '@/components/landing/ServiceLanding';
import { ikametGroup } from '@/content/landing/ikamet';
import { landingJsonLd, landingLanguages, landingMetadata, landingStaticParams, resolveLanding } from '@/lib/landing-page';

export const dynamicParams = false;

export function generateStaticParams() {
  return landingStaticParams(ikametGroup);
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return landingMetadata(ikametGroup, lang);
}

export default async function IkametFotografiPage({ params }: Props) {
  const { lang } = await params;
  const entry = resolveLanding(ikametGroup, lang);
  if (!entry) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd(ikametGroup, lang)) }}
      />
      <ServiceLanding content={entry.content} languages={landingLanguages(ikametGroup, lang)} />
    </>
  );
}
