'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface TestimonialProps {
    title?: string;
    subtitle?: string;
    web_banner_url?: string;
}

interface FirstTestimonialsProps {
    testimonials?: TestimonialProps[];
}

const FirstTestimonials: React.FC<FirstTestimonialsProps> = ({ 
    testimonials = []
}) => {
    const swiperRef = useRef<any>(null);
    const [swiperInstance, setSwiperInstance] = useState<any>(null);

    useEffect(() => {
        if (swiperRef.current) {
            setSwiperInstance(swiperRef.current);
        }
    }, []);

    return (
        <>
            <section className="testimonials-one__title testimonials-one__title__home-one">
                <div className="testimonials-one__bg" style={{ backgroundImage: 'url(assets/images/shapes/water-wave-bg.png)' }}></div>
                <div className="container">
                    <div className="block-title text-center">
                        <img src="assets/images/shapes/sec-line-1.png" alt="" />
                        <p className="text-uppercase">Testimonios</p>
                        <h3 className="text-uppercase">Lo que dicen</h3>
                    </div>
                </div>
            </section>

            <section
                className="testimonials-one__carousel-wrapper testimonials-one__carousel-wrapper__home-one"
                style={{ position: 'relative' }}
            >
                <div className="container wow fadeIn" data-wow-duration="2000ms">
                    {/* Botón izquierdo */}
                    <button
                        onClick={() => swiperInstance?.slidePrev()}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '10px',
                            transform: 'translateY(-110%)',
                            backgroundColor: '#2196F3',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            zIndex: 999,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'auto',
                        }}
                        onTouchStart={(e) => e.stopPropagation()}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFEB3B')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2196F3')}
                    >
                        <i className="fa fa-angle-left" />
                    </button>

                    {/* Botón derecho */}
                    <button
                        onClick={() => swiperInstance?.slideNext()}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '10px',
                            transform: 'translateY(-110%)',
                            backgroundColor: '#2196F3',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            zIndex: 999,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                            transition: 'all 0.2s ease',
                            pointerEvents: 'auto',
                        }}
                        onTouchStart={(e) => e.stopPropagation()}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFEB3B')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2196F3')}
                    >
                        <i className="fa fa-angle-right" />
                    </button>

                    <Swiper
                        modules={[Autoplay, Pagination]}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            setSwiperInstance(swiper);
                        }}
                        spaceBetween={30}
                        slidesPerView={3}
                        loop
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            480: { slidesPerView: 1 },
                            767: { slidesPerView: 1 },
                            991: { slidesPerView: 2 },
                            1199: { slidesPerView: 3 },
                        }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="testimonials-one__single">
                                    <div className="testimonials-one__content">
                                        <div className="testimonials-one__content-inner">
                                            <div className="testimonials-one__qoute"></div>
                                            <p>{testimonial.subtitle}</p>
                                            <div className="testimonials-one__infos">
                                                <div className="testimonials-one__image">
                                                    <div className="testimonials-one__image-inner">
                                                        <img 
                                                            src={testimonial.web_banner_url} 
                                                            alt={testimonial.title}
                                                            style={{
                                                                width: '50px',
                                                                height: '50px',
                                                                objectFit: 'cover',
                                                                borderRadius: '50%',
                                                                border: '2px solid #2196F3'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="testimonials-one__infos-content">
                                                    <h3>{testimonial.title}</h3>
                                                    <span>Nadador</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </>
    );
};

export default FirstTestimonials;
