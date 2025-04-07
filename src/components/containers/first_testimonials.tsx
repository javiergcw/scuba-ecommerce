'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonialsData = [
    {
        id: 1,
        text: "No sé qué más decir, esto es algo que nunca antes habías visto.",
        name: "Edwin Walsh",
        role: "Nadador",
        image: "assets/images/resources/testi-1-1.jpg"
    },
    {
        id: 2,
        text: "Esto se debe a su excelente servicio, precios competitivos y atención al cliente. Es realmente refrescante recibir un trato tan personal.",
        name: "Joel Moore",
        role: "Nadador",
        image: "assets/images/resources/testi-1-2.jpg"
    },
    {
        id: 3,
        text: "No sé qué más decir, esto es algo que nunca antes habías visto.",
        name: "Pauline Cross",
        role: "Nadadora",
        image: "assets/images/resources/testi-1-3.jpg"
    },
    {
        id: 4,
        text: "Quedé muy impresionado por el servicio de buceo Scubo, lorem ipsum es simplemente texto libre usado para copiar.",
        name: "Alex Maldonado",
        role: "Nadador",
        image: "assets/images/resources/testi-1-4.jpg"
    }
];

const FirstTestimonials = () => {
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

            <section className="testimonials-one__carousel-wrapper testimonials-one__carousel-wrapper__home-one">
                <div className="container wow fadeIn" data-wow-duration="2000ms">
                    <div className="testimonials-one__carousel-btn__wrapper">
                        <a className="testimonials-one__carousel-btn-left" href="#"><i className="fa fa-angle-left"></i></a>
                        <a className="testimonials-one__carousel-btn-right" href="#"><i className="fa fa-angle-right"></i></a>
                    </div>
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination]}
                        spaceBetween={30}
                        slidesPerView={3}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            prevEl: '.testimonials-one__carousel-btn-left',
                            nextEl: '.testimonials-one__carousel-btn-right',
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                navigation: true,
                                pagination: false,
                            },
                            480: {
                                slidesPerView: 1,
                                navigation: true,
                                pagination: false,
                            },
                            767: {
                                slidesPerView: 1,
                                navigation: true,
                                pagination: false,
                            },
                            991: {
                                slidesPerView: 2,
                            },
                            1199: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {testimonialsData.map((testimonial) => (
                            <SwiperSlide key={testimonial.id}>
                                <div className="testimonials-one__single">
                                    <div className="testimonials-one__content">
                                        <div className="testimonials-one__content-inner">
                                            <div className="testimonials-one__qoute"></div>
                                            <p>{testimonial.text}</p>
                                            <div className="testimonials-one__infos">
                                                <div className="testimonials-one__image">
                                                    <div className="testimonials-one__image-inner">
                                                        <img src={testimonial.image} alt={testimonial.name} />
                                                    </div>
                                                </div>
                                                <div className="testimonials-one__infos-content">
                                                    <h3>{testimonial.name}</h3>
                                                    <span>{testimonial.role}</span>
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