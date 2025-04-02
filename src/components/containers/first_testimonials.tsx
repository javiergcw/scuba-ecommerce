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
        text: "I don't know what else to say, this is something you have never seen before.",
        name: "Edwin Walsh",
        role: "Swimmer",
        image: "assets/images/resources/testi-1-1.jpg"
    },
    {
        id: 2,
        text: "This is due to their excellent service, competitive pricing and customer support. It's throughly refresing to get new such a personal touch.",
        name: "Joel Moore",
        role: "Swimmer",
        image: "assets/images/resources/testi-1-2.jpg"
    },
    {
        id: 3,
        text: "I don't know what else to say, this is something you have never seen before.",
        name: "Pauline Cross",
        role: "Swimmer",
        image: "assets/images/resources/testi-1-3.jpg"
    },
    {
        id: 4,
        text: "I was very impresed by the Scubo diving service, lorem ipsum is simply free text used by copytyping.",
        name: "Alex Maldonado",
        role: "Swimmer",
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
                        <p className="text-uppercase">Testimonials</p>
                        <h3 className="text-uppercase">What they say</h3>
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