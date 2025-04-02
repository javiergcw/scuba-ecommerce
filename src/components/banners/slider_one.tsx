'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '@/styles/components/slider-one.css'

const SliderOne = () => {
    const slides = [
        {
            image: '/assets/images/background/slide-bg-1-1.jpg',
            title: 'a new discovery awaits',
            subtitle: 'Discover Scuba Diving in New York'
        },
        {
            image: '/assets/images/background/slide-bg-1-2.jpg',
            title: 'TAKE YOUR DIVE TO THE NEXT LEVEL',
            subtitle: 'Discover Scuba Diving in New York'
        },
        {
            image: '/assets/images/background/slide-bg-1-1.jpg',
            title: 'a new discovery awaits',
            subtitle: 'Discover Scuba Diving in New York'
        }
    ]

    return (
        <>
            <div className="slider-one__wrapper">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={{
                        nextEl: '.slider-one__nav-next',
                        prevEl: '.slider-one__nav-prev'
                    }}
                    pagination={{
                        el: '.slider-one__pagination',
                        clickable: true,
                        bulletClass: 'swiper-pagination-bullet',
                        bulletActiveClass: 'swiper-pagination-bullet-active',
                       
                    }}
                    autoplay={{
                        delay: 7000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="slider-one"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index} className="slider-one__slide">
                            <div
                                className="slider-one__bg"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            />
                            <div className="container">
                                <div className="slider-one__content text-center">
                                    <p className="anim-elm">{slide.subtitle}</p>
                                    <h3 className="anim-elm">{slide.title}</h3>
                                    <a href="courses.html" className="thm-btn anim-elm">View all courses</a>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="slider-one__nav" style={{ right: '20px', left: 'auto' }}>
                    <a href="#" className="slider-one__nav-prev"><i className="fa fa-angle-up"></i></a>
                    <a href="#" className="slider-one__nav-next"><i className="fa fa-angle-down"></i></a>
                </div>
                <div className="slider-one__pagination swiper-pagination-vertical" style={{ left: '20px', right: 'auto' }}></div>
            </div>
            <section className="cta-two">
                <div className="cta-two__bg" style={{ backgroundImage: 'url(/assets/images/background/footer-bg-1-1.jpg)' }} />
                <div className="cta-two__wave" style={{ 
                    backgroundImage: 'url(/assets/images/shapes/wave-1.png)',
                    backgroundPosition: 'center center',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '32px',
                    zIndex: 11,
                    animation: 'bgSlide 20s linear infinite'
                }} />
                <div className="container">
                    <img
                        src="/assets/images/shapes/slide-ribbon-1-1.png"
                        alt="Ribbon decoration"
                        className="cta-two__moc"
                    />
                    <h3>WE PROVIDE AN EXCELLENT SERVICE WITH SAFETY AND <br />
                        AN OUTSTANDING <span>DIVING EDUCATION</span></h3>
                    <div className="cta-two__btn-block">
                        <a href="contact.html" className="thm-btn cta-two__btn">Start with us now</a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SliderOne