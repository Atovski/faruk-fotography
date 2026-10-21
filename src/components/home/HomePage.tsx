'use client';

import HeroSection from './HeroSection';
import DocumentPhotoSection from './DocumentPhotoSection';
import FilmServicesSection from './FilmServicesSection';
import BestSellers from './BestSellers';
import ServicesPreview from './ServicesPreview';
import FilmBanyoCTA from './FilmBanyoCTA';
import GiftProductsCTA from './GiftProductsCTA';
import WhyUsSection from './WhyUs';
import MapSection from './MapSection';

/**
 * The business in the order it earns: document photos you walk in for, film
 * and disposable cameras posted to us from anywhere in Turkey, then the gift
 * and print work that any of those photos can turn into.
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
      <GiftProductsCTA />
      <WhyUsSection />
      <MapSection />
    </>
  );
}
