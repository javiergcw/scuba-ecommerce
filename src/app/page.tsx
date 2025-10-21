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
  const [howToDiveBanner, setHowToDiveBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const bannersData = await services.banners.getBanners();
      setBanners(bannersData);
      setHowToDiveBanner(bannersData.find(banner => banner.zone_code === "como_bucear") || null);
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

  const secondaryZoneBanners = banners.filter(
    (banner) => banner.zone_code === "como_bucear" && banner.active
  );

  const testimonialsBanners = banners.filter(
    (banner) => banner.zone_code === "testimonio" && banner.active
  );

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      <div className="w-full">
        <SliderOne banners={primaryZoneBanners} />
        <ServiceOne />
        {/* <FunFact /> */}
        <CoursesFirst />
        <BrandBubbleSection />
        {/* <BrandOne /> */}
        <HowToDive 
          title={howToDiveBanner?.title || "¿Cómo bucear?"}
          subtitle={howToDiveBanner?.subtitle || "¿Sueñas con explorar el fascinante mundo submarino? En nuestra escuela de buceo te ofrecemos la oportunidad de convertirte en un buceador certificado. Nuestros instructores profesionales te guiarán paso a paso, desde los conceptos básicos hasta las técnicas avanzadas. Descubre la belleza de los arrecifes de coral, la vida marina y las increíbles formaciones submarinas. ¡No esperes más para comenzar tu aventura bajo el agua!"}
          web_banner_url={howToDiveBanner?.web_banner_url || "/assets/images/video-2-1.jpg"}
          redirect_url={howToDiveBanner?.redirect_url || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
        />
       <FirstTestimonials testimonials={testimonialsBanners} />
        {/* ß<CtaThree /> */}
      </div>
    </div>
  );
}
