'use client'

import SliderOne from "@/components/banners/slider_one";
import CoursesFirst from "@/components/containers/courses_first";
import CtaThree from "@/components/containers/cta_three";
import FirstTestimonials from "@/components/containers/first_testimonials";
import ServiceOne from "@/components/containers/service_one";
import FunFact from "@/components/others/fun_fact";
import HowToDive from "@/components/others/how_to_dive";
import { BrandOne } from "@/components/others/brand_one";
import { services } from 'monolite-saas';
import { useEffect, useState } from 'react';
import { Banner } from 'monolite-saas';
import BrandBubbleSection from "@/components/others/course/BrandBubbleSection";


export default function Home() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const bannersData = await services.banners.getBanners();
      setBanners(bannersData);
      setError(null);
    } catch (err) {
      setError('Error al cargar los banners');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const primaryZoneBanners = banners.filter(
    (banner) => banner.zone_code === "primary-zone" && banner.active
  );

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      <div className="w-full">
        <SliderOne banners={primaryZoneBanners} />
        <ServiceOne />
        <FunFact />
        <CoursesFirst />
        <BrandBubbleSection />
        {/* <BrandOne /> */}
        <HowToDive banners={banners} />
        <FirstTestimonials />
        <CtaThree />
      </div>
    </div>
  );
}
