'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import '@/styles/components/brand-one.css'

export const BrandOne = () => {
    const brands = [
        { image: '/assets/images/brand/brand-1-1.png' },
        { image: '/assets/images/brand/brand-1-2.png' },
        { image: '/assets/images/brand/brand-1-3.png' },
        // { image: '/assets/images/brand/brand-1-4.png' },
        // { image: '/assets/images/brand/brand-1-5.png' },
        // { image: '/assets/images/brand/brand-1-6.png' }
    ]

    return (
        <section className="brand-one brand-one__home-one">
            <div className="brand-one__wave" style={{ 
                backgroundImage: 'url(/assets/images/shapes/wave-1.png)',
                backgroundPosition: 'center center',
                filter: 'brightness(0) saturate(100%) invert(45%) sepia(98%) saturate(1234%) hue-rotate(199deg) brightness(97%) contrast(101%)',
                animation: 'bgSlide 20s linear infinite'
            }} />
            <div className="container">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={100}
                    slidesPerView={brands.length < 5 ? brands.length : 5}
                    loop={true}
                    centeredSlides={brands.length < 5}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: brands.length < 2 ? brands.length : 2,
                            spaceBetween: 30,
                            centeredSlides: brands.length < 2
                        },
                        480: {
                            slidesPerView: brands.length < 3 ? brands.length : 3,
                            spaceBetween: 30,
                            centeredSlides: brands.length < 3
                        },
                        991: {
                            slidesPerView: brands.length < 4 ? brands.length : 4,
                            spaceBetween: 50,
                            centeredSlides: brands.length < 4
                        },
                        1199: {
                            slidesPerView: brands.length < 5 ? brands.length : 5,
                            spaceBetween: 100,
                            centeredSlides: brands.length < 5
                        }
                    }}
                    className="brand-one__carousel"
                >
                    {brands.map((brand, index) => (
                        <SwiperSlide key={index} className="item">
                            <img src={brand.image} alt={`Brand ${index + 1}`} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}
