'use client'

import { AboutUsSection } from "@/components/section/about-us-section"
import { AboutUsStwo } from "@/components/section/about-us-stwo"
import { AboutUsVideoOne } from "@/components/section/about-us-video-one"
import { TeamBrand } from "@/components/brand-wrapper/team-brand"
import AboutUsTestm from "@/components/section/about-us-testm"
import AboutUsFunfact from "@/components/section/about-us-funfact"
import { useEffect, useState } from 'react'
import { GetZonesUseCase } from '@/core/use-case/zone/get_zones_use_case'
import { ZONE_IDS } from '@/core/const/zone_const'
import { BannerDto } from '@/core/dto/receive/zone/receive_zones_dto'

export default function AboutUsPage() {
    const [porQueNosotrosBanners, setPorQueNosotrosBanners] = useState<BannerDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                setLoading(true);
                // Obtener banners de la zona "por qué nosotros"
                const banners = await GetZonesUseCase.getBannersByZoneId(ZONE_IDS.ZONA_POR_QUE_NOSOTROS);
                setPorQueNosotrosBanners(banners);
            } catch (error) {
                console.error('Error al cargar banners de por qué nosotros:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    return (
        <>
            <AboutUsSection banners={porQueNosotrosBanners} />
           {/*  <AboutUsStwo />*/}
            {/* <AboutUsVideoOne /> */}
            {/* <AboutUsFunfact /> */}
            {/* <AboutUsTestm /> */}
            {/* <TeamBrand/> */}
        </>
    );
}