'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

export const AboutUsTestm = () => {
    return (
        <>
            <section className="testimonials-one__title">
                <div className="testimonials-one__bg" style={{ backgroundImage: "url(assets/images/shapes/water-wave-bg.png)" }}></div>

                <div className="container">
                    <div className="block-title text-center">
                        <img src="assets/images/shapes/sec-line-1.png" alt="" />
                        <p className="text-uppercase">Testimonios</p>
                        <h3 className="text-uppercase">Nuestros clientes opinan</h3>
                    </div>
                </div>
            </section>

            <section className="testimonials-one__carousel-wrapper">
                <div className="container wow fadeIn" data-wow-duration="2000ms">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={30}
                        slidesPerView={3}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        navigation={true}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                navigation: true
                            },
                            480: {
                                slidesPerView: 1,
                                navigation: true
                            },
                            767: {
                                slidesPerView: 1,
                                navigation: true
                            },
                            991: {
                                slidesPerView: 2
                            },
                            1199: {
                                slidesPerView: 3
                            }
                        }}
                    >
                        <SwiperSlide>
                            <div className="testimonials-one__single">
                                <div className="testimonials-one__content">
                                    <div className="testimonials-one__content-inner">
                                        <div className="testimonials-one__qoute"></div>
                                        <p>I don't know what else to say, this is something you have never seen before.</p>
                                        <div className="testimonials-one__infos">
                                            <div className="testimonials-one__image">
                                                <div className="testimonials-one__image-inner">
                                                    <img src="assets/images/resources/testi-1-1.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="testimonials-one__infos-content">
                                                <h3>Edwin Walsh</h3>
                                                <span>Swimmer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonials-one__single">
                                <div className="testimonials-one__content">
                                    <div className="testimonials-one__content-inner">
                                        <div className="testimonials-one__qoute"></div>
                                        <p>This is due to their excellent service, competitive pricing and customer support. It's
                                            throughly refresing to get new such a personal touch. </p>
                                        <div className="testimonials-one__infos">
                                            <div className="testimonials-one__image">
                                                <div className="testimonials-one__image-inner">
                                                    <img src="assets/images/resources/testi-1-2.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="testimonials-one__infos-content">
                                                <h3>Joel Moore</h3>
                                                <span>Swimmer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonials-one__single">
                                <div className="testimonials-one__content">
                                    <div className="testimonials-one__content-inner">
                                        <div className="testimonials-one__qoute"></div>
                                        <p>I don't know what else to say, this is something you have never seen before.</p>
                                        <div className="testimonials-one__infos">
                                            <div className="testimonials-one__image">
                                                <div className="testimonials-one__image-inner">
                                                    <img src="assets/images/resources/testi-1-3.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="testimonials-one__infos-content">
                                                <h3>Pauline Cross</h3>
                                                <span>Swimmer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonials-one__single">
                                <div className="testimonials-one__content">
                                    <div className="testimonials-one__content-inner">
                                        <div className="testimonials-one__qoute"></div>
                                        <p>I was very impresed by the Scubo diving service, lorem ipsum is simply free text used by
                                            copytyping.</p>
                                        <div className="testimonials-one__infos">
                                            <div className="testimonials-one__image">
                                                <div className="testimonials-one__image-inner">
                                                    <img src="assets/images/resources/testi-1-4.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="testimonials-one__infos-content">
                                                <h3>Alex Maldonado</h3>
                                                <span>Swimmer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonials-one__single">
                                <div className="testimonials-one__content">
                                    <div className="testimonials-one__content-inner">
                                        <div className="testimonials-one__qoute"></div>
                                        <p>This is due to their excellent service, competitive pricing and customer support. It's
                                            throughly refresing to get new such a personal touch.
                                        </p>
                                        <div className="testimonials-one__infos">
                                            <div className="testimonials-one__image">
                                                <div className="testimonials-one__image-inner">
                                                    <img src="assets/images/resources/testi-1-1.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="testimonials-one__infos-content">
                                                <h3>Marion Price</h3>
                                                <span>Swimmer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonials-one__single">
                                <div className="testimonials-one__content">
                                    <div className="testimonials-one__content-inner">
                                        <div className="testimonials-one__qoute"></div>
                                        <p>I was very impresed by the Scubo diving service, lorem ipsum is simply free text used by
                                            copytyping.</p>
                                        <div className="testimonials-one__infos">
                                            <div className="testimonials-one__image">
                                                <div className="testimonials-one__image-inner">
                                                    <img src="assets/images/resources/testi-1-2.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="testimonials-one__infos-content">
                                                <h3>Lou Morrison</h3>
                                                <span>Swimmer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonials-one__single">
                                <div className="testimonials-one__content">
                                    <div className="testimonials-one__content-inner">
                                        <div className="testimonials-one__qoute"></div>
                                        <p>This is due to their excellent service, competitive pricing and customer support. It's
                                            throughly refresing to get new such a personal touch.
                                        </p>
                                        <div className="testimonials-one__infos">
                                            <div className="testimonials-one__image">
                                                <div className="testimonials-one__image-inner">
                                                    <img src="assets/images/resources/testi-1-3.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="testimonials-one__infos-content">
                                                <h3>Hunter Marsh</h3>
                                                <span>Swimmer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonials-one__single">
                                <div className="testimonials-one__content">
                                    <div className="testimonials-one__content-inner">
                                        <div className="testimonials-one__qoute"></div>
                                        <p>I was very impresed by the Scubo diving service, lorem ipsum is simply free text used by
                                            copytyping.</p>
                                        <div className="testimonials-one__infos">
                                            <div className="testimonials-one__image">
                                                <div className="testimonials-one__image-inner">
                                                    <img src="assets/images/resources/testi-1-4.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="testimonials-one__infos-content">
                                                <h3>Jesse Buchanan</h3>
                                                <span>Swimmer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonials-one__single">
                                <div className="testimonials-one__content">
                                    <div className="testimonials-one__content-inner">
                                        <div className="testimonials-one__qoute"></div>
                                        <p>This is due to their excellent service, competitive pricing and customer support. It's
                                            throughly refresing to get new such a personal touch.
                                        </p>
                                        <div className="testimonials-one__infos">
                                            <div className="testimonials-one__image">
                                                <div className="testimonials-one__image-inner">
                                                    <img src="assets/images/resources/testi-1-1.jpg" alt="" />
                                                </div>
                                            </div>
                                            <div className="testimonials-one__infos-content">
                                                <h3>Helena Dawson</h3>
                                                <span>Swimmer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>

        </>
    )
}
