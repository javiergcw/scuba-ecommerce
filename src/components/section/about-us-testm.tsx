'use client'

import React from 'react'
import { Box, Container } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const testimonials = [
    {
        name: 'Edwin Walsh',
        role: 'Swimmer',
        image: '/assets/images/resources/testi-1-1.jpg',
        message: "I don't know what else to say, this is something you have never seen before.",
    },
    {
        name: 'Joel Moore',
        role: 'Swimmer',
        image: '/assets/images/resources/testi-1-2.jpg',
        message:
            "This is due to their excellent service, competitive pricing and customer support. It's throughly refresing to get new such a personal touch.",
    },
    {
        name: 'Pauline Cross',
        role: 'Swimmer',
        image: '/assets/images/resources/testi-1-3.jpg',
        message: "I don't know what else to say, this is something you have never seen before.",
    },
    {
        name: 'Alex Maldonado',
        role: 'Swimmer',
        image: '/assets/images/resources/testi-1-4.jpg',
        message:
            'I was very impresed by the Scubo diving service, lorem ipsum is simply free text used by copytyping.',
    },
    {
        name: 'Marion Price',
        role: 'Swimmer',
        image: '/assets/images/resources/testi-1-1.jpg',
        message:
            "This is due to their excellent service, competitive pricing and customer support. It's throughly refresing to get new such a personal touch.",
    },
    {
        name: 'Lou Morrison',
        role: 'Swimmer',
        image: '/assets/images/resources/testi-1-2.jpg',
        message:
            'I was very impresed by the Scubo diving service, lorem ipsum is simply free text used by copytyping.',
    },
    {
        name: 'Hunter Marsh',
        role: 'Swimmer',
        image: '/assets/images/resources/testi-1-3.jpg',
        message:
            "This is due to their excellent service, competitive pricing and customer support. It's throughly refresing to get new such a personal touch.",
    },
    {
        name: 'Jesse Buchanan',
        role: 'Swimmer',
        image: '/assets/images/resources/testi-1-4.jpg',
        message:
            'I was very impresed by the Scubo diving service, lorem ipsum is simply free text used by copytyping.',
    },
    {
        name: 'Helena Dawson',
        role: 'Swimmer',
        image: '/assets/images/resources/testi-1-1.jpg',
        message:
            "This is due to their excellent service, competitive pricing and customer support. It's throughly refresing to get new such a personal touch.",
    },
]

const AboutUsTestm = () => {
    return (
        <>
            <section
                className="testimonials-one__title"
                style={{ paddingTop: '220px' }} // nuevo: separa del componente anterior
            >
                <div
                    className="testimonials-one__bg"
                    style={{
                        backgroundImage: 'url(/assets/images/shapes/water-wave-bg.png)',
                     
                    }}
                ></div>

                <div className="container">
                    <div className="block-title text-center">
                        <img src="/assets/images/shapes/sec-line-1.png" alt="" />
                        <p className="text-uppercase">Testimonios</p>
                        <h3 className="text-uppercase">Nuestros clientes opinan</h3>
                    </div>
                </div>
            </section>

            <section
                className="testimonials-one__carousel-wrapper"
                style={{ marginBottom: '80px' }} // nuevo: agrega espacio antes del footer
            >
                <Container className="wow fadeIn" data-wow-duration="2000ms">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={30}
                        slidesPerView={3}
                        loop
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        navigation
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            480: { slidesPerView: 1 },
                            767: { slidesPerView: 1 },
                            991: { slidesPerView: 2 },
                            1199: { slidesPerView: 3 },
                        }}
                    >
                        {testimonials.map((t, i) => (
                            <SwiperSlide key={i}>
                                <div className="testimonials-one__single">
                                    <div className="testimonials-one__content">
                                        <div className="testimonials-one__content-inner">
                                            <div className="testimonials-one__qoute" />
                                            <p>{t.message}</p>
                                            <div className="testimonials-one__infos">
                                                <div className="testimonials-one__image">
                                                    <div className="testimonials-one__image-inner">
                                                        <img src={t.image} alt={t.name} />
                                                    </div>
                                                </div>
                                                <div className="testimonials-one__infos-content">
                                                    <h3>{t.name}</h3>
                                                    <span>{t.role}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Container>
            </section>
        </>
    )
}

export default AboutUsTestm
