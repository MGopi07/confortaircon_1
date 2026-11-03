'use client';

import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import ProductsSection from '@/components/ProductsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import OurBrands from '@/components/OurBrands';
import ServiceAreasSection from '@/components/ServiceAreasSection';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

  return (
    <>
      <Hero />
      <ServicesSection />
      <ProductsSection />
      <WhyChooseUs />

      <ServiceAreasSection />
      <OurBrands />
      <TestimonialsSection />
    </>
  );
}
