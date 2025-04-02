'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import '../../styles/carousel.css'

// Mock data para los cursos
const coursesData = [
    {
        id: 1,
        category: "advanced",
        image: "assets/images/courses/course-1-1.jpg",
        title: "Scuba diving",
        description: "There are many variatin of passages of lorem ipsum available, but the majority have."
    },
    {
        id: 2,
        category: "beginner",
        image: "assets/images/courses/course-1-2.jpg",
        title: "Extended range",
        description: "There are many variatin of passages of lorem ipsum available, but the majority have."
    },
    {
        id: 3,
        category: "Professional",
        image: "assets/images/courses/course-1-3.jpg",
        title: "Free diving",
        description: "There are many variatin of passages of lorem ipsum available, but the majority have."
    },
    {
        id: 4,
        category: "advanced",
        image: "assets/images/courses/course-1-4.jpg",
        title: "Rebreather",
        description: "There are many variatin of passages of lorem ipsum available, but the majority have."
    },
    {
        id: 5,
        category: "advanced",
        image: "assets/images/courses/course-1-5.jpg",
        title: "Swimming",
        description: "There are many variatin of passages of lorem ipsum available, but the majority have."
    },
    {
        id: 6,
        category: "Professional",
        image: "assets/images/courses/course-1-6.jpg",
        title: "Snorkeling",
        description: "There are many variatin of passages of lorem ipsum available, but the majority have."
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
                        <p className="text-uppercase">All Courses list</p>
                        <h3 className="text-uppercase">Checkout our <br /> Popular courses</h3>
                    </div>
                    <div className="text-block">
                        <p className="m-0">There are many variations of passages of available but the majority have suffered <br />
                            alteration in some form, by injected or randomised words which don look even <br /> slightly believable.
                        </p>
                    </div>
                </div>
            </section>

            <div className="course-one course-one__carousel-wrapper">
                {/* footer fishes */}
                <img src="assets/images/shapes/fish-1-1.png" alt="" className="site-footer__fish-1" />

                {/* footer trees */}
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
                                                <a href="course-details.html"><i className="scubo-icon-plus-symbol"></i></a>
                                            </div>
                                        </div>
                                        <div className="course-one__content hvr-sweep-to-bottom">
                                            <h3><a href="course-details.html">{course.title}</a></h3>
                                            <p>{course.description}</p>
                                        </div>
                                        <a href="contact.html" className="course-one__book-link">Book this course</a>

                                    </div>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="course-one__carousel-btn__wrapper">
                        <a className="course-one__carousel-btn-left" href="#"><i className="fa fa-angle-left"></i></a>
                        <a className="course-one__carousel-btn-right" href="#"><i className="fa fa-angle-right"></i></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CoursesFirst