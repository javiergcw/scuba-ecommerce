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
        { image: '/assets/images/brand/brand-1-4.png' },
        { image: '/assets/images/brand/brand-1-5.png' },
        { image: '/assets/images/brand/brand-1-6.png' }
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
                    slidesPerView={5}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 30
                        },
                        480: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        991: {
                            slidesPerView: 4,
                            spaceBetween: 50
                        },
                        1199: {
                            slidesPerView: 5,
                            spaceBetween: 100
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
