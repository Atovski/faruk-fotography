'use client';

import HeroSection from './HeroSection';
import ServicesPreview from './ServicesPreview';
import WhyUsSection from './WhyUs';
import MapSection from './MapSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <WhyUsSection />
      <MapSection />
    </>
  );
}
