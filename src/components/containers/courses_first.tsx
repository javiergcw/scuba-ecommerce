import React from 'react'

const CoursesFirst = () => {
    return (
        <>
            <section className="course-one__title">
                <div className="course-one__bg" style={{ backgroundImage: "url(//assets/images/shapes/water-wave-bg.png)" }}></div>
                <div className="container ">
                    <div className="block-title text-left">
                        <img src="/assets/images/shapes/sec-line-1.png" alt="" />
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
                <img src="/assets/images/shapes/fish-1-1.png" alt="" className="site-footer__fish-1" />

                {/* footer trees */}
                <img src="/assets/images/shapes/tree-1-1.png" className="site-footer__tree-1" alt="" />
                <div className="container">
                    <div className="course-one__carousel thm__owl-carousel owl-carousel owl-theme" data-options='{"loop": true,"items": 3, "margin":30, "smartSpeed": 700, "autoplay": true, "autoplayTimeout": 5000, "autoplayHoverPause": true, "nav": false, "dots": false, "responsive": { "0": {"items": 1}, "767": {"items": 2}, "991": {"items": 2}, "1199": { "items": 3} }}' data-carousel-prev-btn=".course-one__carousel-btn-left" data-carousel-next-btn=".course-one__carousel-btn-right">
                        <div className="item">
                            <div className="course-one__single">
                                <div className="course-one__image">
                                    <a href="course-details.html" className="course-one__cat">advanced</a>
                                    <div className="course-one__image-inner">
                                        <img src="/assets/images/courses/course-1-1.jpg" alt="" />
                                        <a href="course-details.html"><i className="scubo-icon-plus-symbol"></i></a>
                                    </div>
                                </div>
                                <div className="course-one__content hvr-sweep-to-bottom">
                                    <h3><a href="course-details.html">Scuba diving</a></h3>
                                    <p>There are many variatin of passages of lorem ipsum available, but the majority have.</p>
                                </div>
                                <a href="contact.html" className="course-one__book-link">Book this course</a>
                            </div>
                        </div>
                        <div className="item">
                            <div className="course-one__single">
                                <div className="course-one__image">
                                    <a href="course-details.html" className="course-one__cat">beginner</a>
                                    <div className="course-one__image-inner">
                                        <img src="/assets/images/courses/course-1-2.jpg" alt="" />
                                        <a href="course-details.html"><i className="scubo-icon-plus-symbol"></i></a>
                                    </div>
                                </div>
                                <div className="course-one__content hvr-sweep-to-bottom">
                                    <h3><a href="course-details.html">Extended range</a></h3>
                                    <p>There are many variatin of passages of lorem ipsum available, but the majority have.</p>
                                </div>
                                <a href="contact.html" className="course-one__book-link">Book this course</a>
                            </div>
                        </div>
                        <div className="item">
                            <div className="course-one__single">
                                <div className="course-one__image">
                                    <a href="course-details.html" className="course-one__cat">Professional</a>
                                    <div className="course-one__image-inner">
                                        <img src="/assets/images/courses/course-1-3.jpg" alt="" />
                                        <a href="course-details.html"><i className="scubo-icon-plus-symbol"></i></a>
                                    </div>
                                </div>
                                <div className="course-one__content hvr-sweep-to-bottom">
                                    <h3><a href="course-details.html">free diving</a></h3>
                                    <p>There are many variatin of passages of lorem ipsum available, but the majority have.</p>
                                </div>
                                <a href="contact.html" className="course-one__book-link">Book this course</a>
                            </div>
                        </div>
                        <div className="item">
                            <div className="course-one__single">
                                <div className="course-one__image">
                                    <a href="course-details.html" className="course-one__cat">advanced</a>
                                    <div className="course-one__image-inner">
                                        <img src="assets/images/courses/course-1-4.jpg" alt="" />
                                        <a href="course-details.html"><i className="scubo-icon-plus-symbol"></i></a>
                                    </div>
                                </div>
                                <div className="course-one__content hvr-sweep-to-bottom">
                                    <h3><a href="course-details.html">Rebreather</a></h3>
                                    <p>There are many variatin of passages of lorem ipsum available, but the majority have.</p>
                                </div>
                                <a href="contact.html" className="course-one__book-link">Book this course</a>
                            </div>
                        </div>
                        <div className="item">
                            <div className="course-one__single">
                                <div className="course-one__image">
                                    <a href="course-details.html" className="course-one__cat">advanced</a>
                                    <div className="course-one__image-inner">
                                        <img src="/assets/images/courses/course-1-5.jpg" alt="" />
                                        <a href="course-details.html"><i className="scubo-icon-plus-symbol"></i></a>
                                    </div>
                                </div>
                                <div className="course-one__content hvr-sweep-to-bottom">
                                    <h3><a href="course-details.html">Swimming</a></h3>
                                    <p>There are many variatin of passages of lorem ipsum available, but the majority have.</p>
                                </div>
                                <a href="contact.html" className="course-one__book-link">Book this course</a>
                            </div>
                        </div>
                        <div className="item">
                            <div className="course-one__single">
                                <div className="course-one__image">
                                    <a href="course-details.html" className="course-one__cat">Professional</a>
                                    <div className="course-one__image-inner">
                                        <img src="/assets/images/courses/course-1-6.jpg" alt="" />
                                        <a href="course-details.html"><i className="scubo-icon-plus-symbol"></i></a>
                                    </div>
                                </div>
                                <div className="course-one__content hvr-sweep-to-bottom">
                                    <h3><a href="course-details.html">Snorkeling</a></h3>
                                    <p>There are many variatin of passages of lorem ipsum available, but the majority have.</p>
                                </div>
                                <a href="contact.html" className="course-one__book-link">Book this course</a>
                            </div>
                        </div>
                    </div>

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