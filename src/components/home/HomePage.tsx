'use client';

import HeroSection from './HeroSection';
import BestSellers from './BestSellers';
import ServicesPreview from './ServicesPreview';
import FilmBanyoCTA from './FilmBanyoCTA';
import WhyUsSection from './WhyUs';
import MapSection from './MapSection';
import UsedCameraCTA from './UsedCameraCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BestSellers />
      <ServicesPreview />
      <FilmBanyoCTA />
      <WhyUsSection />
      <MapSection />
      <UsedCameraCTA />
    </>
  );
}
