'use client';

import HeroSection from './HeroSection';
import DocumentPhotoSection from './DocumentPhotoSection';
import BestSellers from './BestSellers';
import ServicesPreview from './ServicesPreview';
import FilmBanyoCTA from './FilmBanyoCTA';
import WhyUsSection from './WhyUs';
import MapSection from './MapSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DocumentPhotoSection />
      <BestSellers />
      <ServicesPreview />
      <FilmBanyoCTA />
      <WhyUsSection />
      <MapSection />
    </>
  );
}
