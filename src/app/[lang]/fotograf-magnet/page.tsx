import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceLanding from '@/components/landing/ServiceLanding';
import { magnetGroup } from '@/content/landing/magnet';
import { landingJsonLd, landingLanguages, landingMetadata, landingStaticParams, resolveLanding } from '@/lib/landing-page';

export const dynamicParams = false;

export function generateStaticParams() {
  return landingStaticParams(magnetGroup);
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return landingMetadata(magnetGroup, lang);
}

export default async function FotografMagnetPage({ params }: Props) {
  const { lang } = await params;
  const entry = resolveLanding(magnetGroup, lang);
  if (!entry) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd(magnetGroup, lang)) }}
      />
      <ServiceLanding content={entry.content} languages={landingLanguages(magnetGroup, lang)} />
    </>
  );
}
