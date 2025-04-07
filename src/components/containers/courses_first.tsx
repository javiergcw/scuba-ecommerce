'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import '../../styles/carousel.css'

// Datos de los cursos
const coursesData = [
    {
        id: 1,
        category: "avanzado",
        image: "assets/images/courses/course-1-1.jpg",
        title: "Buceo",
        description: "Hay muchas variaciones de pasajes disponibles, pero la mayoría han sufrido alteraciones."
    },
    {
        id: 2,
        category: "principiante",
        image: "assets/images/courses/course-1-2.jpg",
        title: "Rango extendido",
        description: "Hay muchas variaciones de pasajes disponibles, pero la mayoría han sufrido alteraciones."
    },
    {
        id: 3,
        category: "Profesional",
        image: "assets/images/courses/course-1-3.jpg",
        title: "Buceo libre",
        description: "Hay muchas variaciones de pasajes disponibles, pero la mayoría han sufrido alteraciones."
    },
    {
        id: 4,
        category: "avanzado",
        image: "assets/images/courses/course-1-4.jpg",
        title: "Rebreather",
        description: "Hay muchas variaciones de pasajes disponibles, pero la mayoría han sufrido alteraciones."
    },
    {
        id: 5,
        category: "avanzado",
        image: "assets/images/courses/course-1-5.jpg",
        title: "Natación",
        description: "Hay muchas variaciones de pasajes disponibles, pero la mayoría han sufrido alteraciones."
    },
    {
        id: 6,
        category: "Profesional",
        image: "assets/images/courses/course-1-6.jpg",
        title: "Snorkel",
        description: "Hay muchas variaciones de pasajes disponibles, pero la mayoría han sufrido alteraciones."
    }
]

const CoursesFirst = () => {
    return (
        <>
            <section className="course-one__title">
                <div className="course-one__bg" style={{ backgroundImage: "url(assets/images/shapes/water-wave-bg.png)" }}></div>
                <div className="container ">
                    <div className="block-title text-left">
                        <img src="assets/images/shapes/sec-line-1.png" alt="" />
                        <p className="text-uppercase">Lista de todos los cursos</p>
                        <h3 className="text-uppercase">Descubre nuestros <br /> cursos populares</h3>
                    </div>
                    <div className="text-block">
                        <p className="m-0">Hay muchas variaciones de pasajes disponibles, pero la mayoría han sufrido <br />
                            alteraciones de alguna forma, por palabras inyectadas o aleatorias que no parecen <br /> ni siquiera creíbles.
                        </p>
                    </div>
                </div>
            </section>

            <div className="course-one course-one__carousel-wrapper">
                {/* peces del pie de página */}
                <img src="assets/images/shapes/fish-1-1.png" alt="" className="site-footer__fish-1" />

                {/* árboles del pie de página */}
                <img src="assets/images/shapes/tree-1-1.png" className="site-footer__tree-1" alt="" />
                <div className="container">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={30}
                        slidesPerView={3}
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            prevEl: '.course-one__carousel-btn-left',
                            nextEl: '.course-one__carousel-btn-right',
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            767: {
                                slidesPerView: 2,
                            },
                            991: {
                                slidesPerView: 2,
                            },
                            1199: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {coursesData.map((course) => (
                            <SwiperSlide key={course.id}>
                                <div className="course-one__wrappers">
                                    <div className="course-one__single">
                                        <div className="course-one__image">
                                            <a href="course-details.html" className="course-one__cat">{course.category}</a>
                                            <div className="course-one__image-inner">
                                                <img src={course.image} alt={course.title} />
                                                <a href="course-details.html"><i className="fa fa-plus"></i></a>
                                            </div>
                                        </div>
                                        <div className="course-one__content hvr-sweep-to-bottom">
                                            <h3><a href="course-details.html">{course.title}</a></h3>
                                            <p>{course.description}</p>
                                        </div>
                                        <a href="contact.html" className="course-one__book-link">Reservar este curso</a>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="course-one__carousel-btn__wrapper">
                        <a className="course-one__carousel-btn-left" href="#"><i className="fa fa-chevron-left"></i></a>
                        <a className="course-one__carousel-btn-right" href="#"><i className="fa fa-chevron-right"></i></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CoursesFirst