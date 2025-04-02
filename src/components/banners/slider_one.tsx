import React from 'react'

const SliderOne = () => {
    return (

        <>
            <div className="slider-one__wrapper">
                <div className="slider-one">
                    <div className="slider-one__carousel thm__owl-dot-1 owl-carousel owl-theme thm__owl-carousel" data-carousel-prev-btn=".slider-one__nav-right" data-carousel-next-btn=".slider-one__nav-left" data-options='{"loop": true, "items": 1, "margin": 0, "dots": true, "nav": false, "animateOut": &quot;slideOutDown&quot;, "animateIn": &quot;fadeIn&quot;, "active": true, "smartSpeed": 1000, "autoplay": true, "autoplayTimeout": 7000, "autoplayHoverPause": false}'>
                        <div className="item slider-one__slide-1" style={{ backgroundImage: 'url(/assets/images/background/slide-bg-1-1.jpg)' }}>
                            <div className="container">
                                <div className="slider-one__content text-center">
                                    <p className="anim-elm">Discover Scuba Diving in New York</p>
                                    <h3 className="anim-elm">a new discovery <br /> awaits</h3>
                                    <a href="courses.html" className="thm-btn anim-elm">View all courses</a>
                                </div>
                            </div>
                        </div>
                        <div className="item slider-one__slide-2" style={{ backgroundImage: 'url(/assets/images/background/slide-bg-1-2.jpg)' }}>
                            <div className="container">
                                <div className="slider-one__content text-center">
                                    <p className="anim-elm">Discover Scuba Diving in New York</p>
                                    <h3 className="anim-elm">TAKE YOUR DIVE <br /> TO THE NEXT LEVEL</h3>
                                    <a href="courses.html" className="thm-btn anim-elm">View all courses</a>
                                </div>
                            </div>
                        </div>
                        <div className="item slider-one__slide-1" style={{ backgroundImage: 'url(/assets/images/background/slide-bg-1-1.jpg)' }}>
                            <div className="container">
                                <div className="slider-one__content text-center">
                                    <p className="anim-elm">Discover Scuba Diving in New York</p>
                                    <h3 className="anim-elm">a new discovery <br /> awaits</h3>
                                    <a href="courses.html" className="thm-btn anim-elm">View all courses</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="slider-one__nav">
                        <a href="#" className="slider-one__nav-left"><i className="fa fa-angle-right"></i></a>

                        <a href="#" className="slider-one__nav-right"><i className="fa fa-angle-left"></i></a>

                    </div>
                </div>
            </div >
            <section className="cta-two">
                <div className="cta-two__bg" style={{backgroundImage: 'url(/assets/images/background/footer-bg-1-1.jpg)'}}></div>

                <div className="container">
                    <img src="assets/images/shapes/slide-ribbon-1-1.png" alt="" className="cta-two__moc" />
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