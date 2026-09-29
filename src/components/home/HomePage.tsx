'use client';

import HeroSection from './HeroSection';
import DocumentPhotoSection from './DocumentPhotoSection';
import FilmServicesSection from './FilmServicesSection';
import BestSellers from './BestSellers';
import ServicesPreview from './ServicesPreview';
import FilmBanyoCTA from './FilmBanyoCTA';
import WhyUsSection from './WhyUs';
import MapSection from './MapSection';

/**
 * The two halves of the business lead the page: document photos you walk in
 * for, then film and disposable cameras posted to us from anywhere in Turkey.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DocumentPhotoSection />
      <FilmServicesSection />
      <BestSellers />
      <ServicesPreview />
      <FilmBanyoCTA />
      <WhyUsSection />
      <MapSection />
    </>
  );
}
