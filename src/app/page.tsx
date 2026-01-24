'use client'

import SliderOne from "@/components/banners/slider_one";
import CoursesFirst from "@/components/containers/courses_first";
import CtaThree from "@/components/containers/cta_three";
import FirstTestimonials from "@/components/containers/first_testimonials";
import ServiceOne from "@/components/containers/service_one";
import FunFact from "@/components/others/fun_fact";
import HowToDive from "@/components/others/how_to_dive";
import { BrandOne } from "@/components/others/brand_one";
import { useEffect, useState } from 'react';
import BrandBubbleSection from "@/components/others/course/BrandBubbleSection";
import { GetZonesUseCase } from '@/core/use-case/zone/get_zones_use_case';
import { ZONE_IDS } from '@/core/const/zone_const';
import { BannerDto } from '@/core/dto/receive/zone/receive_zones_dto';
import InfoPopup from "@/components/others/InfoPopup";


export default function Home() {
  const [primaryZoneBanners, setPrimaryZoneBanners] = useState<BannerDto[]>([]);
  const [howToDiveBanners, setHowToDiveBanners] = useState<BannerDto[]>([]);
  const [testimonialsBanners, setTestimonialsBanners] = useState<BannerDto[]>([]);
  const [popupBanners, setPopupBanners] = useState<BannerDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      
      // Obtener banners de la zona home desde el nuevo API
      const homeBanners = await GetZonesUseCase.getBannersByZoneId(ZONE_IDS.ZONA_BANNER_HOME);
      setPrimaryZoneBanners(homeBanners);
      
      // Obtener banners de la zona "cómo bucear" desde el nuevo API
      const comoBucearBanners = await GetZonesUseCase.getBannersByZoneId(ZONE_IDS.ZONA_COMO_BUCEAR);
      setHowToDiveBanners(comoBucearBanners);
      
      // Obtener banners de la zona "testimonios" desde el nuevo API
      const testimoniosBanners = await GetZonesUseCase.getBannersByZoneId(ZONE_IDS.ZONA_TESTIMONIOS);
      setTestimonialsBanners(testimoniosBanners);
      
      // Obtener banners de la zona popup desde el nuevo API
      const popupBannersData = await GetZonesUseCase.getBannersByZoneId(ZONE_IDS.ZONA_POPUP);
      setPopupBanners(popupBannersData);
      
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

  // Obtener el primer banner de "cómo bucear" para mostrarlo
  const howToDiveBanner = howToDiveBanners.length > 0 ? howToDiveBanners[0] : null;
  
  // Obtener el primer banner del popup para mostrarlo
  const popupBanner = popupBanners.length > 0 ? popupBanners[0] : null;
  
  // Mapear los banners del nuevo DTO al formato que espera FirstTestimonials
  const mappedTestimonials = testimonialsBanners.map(banner => ({
    title: banner.title,
    subtitle: banner.subtitles,
    web_banner_url: banner.image_url
  }));

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      <InfoPopup banner={popupBanner} />
      <div className="w-full">
        <SliderOne banners={primaryZoneBanners} />
        <ServiceOne />
        {/* <FunFact /> */}
        <CoursesFirst />
        <BrandBubbleSection />
        {/* <BrandOne /> */}
        <HowToDive 
          title={howToDiveBanner?.title || "¿Cómo bucear?"}
          subtitle="¿Sueñas con explorar el fascinante mundo submarino? En nuestra escuela de buceo te ofrecemos la oportunidad de convertirte en un buceador certificado. Nuestros instructores profesionales te guiarán paso a paso, desde los conceptos básicos hasta las técnicas avanzadas. Descubre la belleza de los arrecifes de coral, la vida marina y las increíbles formaciones submarinas. ¡No esperes más para comenzar tu aventura bajo el agua!"
          web_banner_url={howToDiveBanner?.image_url || "/assets/images/video-2-1.jpg"}
          redirect_url={howToDiveBanner?.link_url || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
        />
       <FirstTestimonials testimonials={mappedTestimonials} />
        {/* ß<CtaThree /> */}
      </div>
    </div>
  );
}
