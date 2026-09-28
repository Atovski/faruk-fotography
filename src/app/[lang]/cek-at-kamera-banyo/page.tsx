import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceLanding from '@/components/landing/ServiceLanding';
import { cekAtGroup } from '@/content/landing/cekat';
import { landingJsonLd, landingLanguages, landingMetadata, landingStaticParams, resolveLanding } from '@/lib/landing-page';

export const dynamicParams = false;

export function generateStaticParams() {
  return landingStaticParams(cekAtGroup);
}

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return landingMetadata(cekAtGroup, lang);
}

export default async function CekAtKameraBanyoPage({ params }: Props) {
  const { lang } = await params;
  const entry = resolveLanding(cekAtGroup, lang);
  if (!entry) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd(cekAtGroup, lang)) }}
      />
      <ServiceLanding content={entry.content} languages={landingLanguages(cekAtGroup, lang)} />
    </>
  );
}
