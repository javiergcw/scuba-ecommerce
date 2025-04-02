import React from 'react'

const HowToDive = () => {
    return (
        <section className="video-two" style={{ backgroundImage: 'url(assets/images/shapes/video-2-bg.png)' }}>
            <img src="assets/images/shapes/swimmer-1-1.png" className="video-two__swimmer" alt="" />
            <div className="container">
                <div className="video-two__box wow fadeInRight" data-wow-duration="1500ms">
                    <img src="assets/images/resources/video-1-1.jpg" alt="" />
                    <a href="https://www.youtube.com/watch?v=7rQe_Q4FkaY" className="video-popup"><i className="fa fa-play"></i></a>

                </div>
                <div className="row">
                    <div className="col-xl-6">
                        <div className="video-two__content">
                            <div className="block-title">
                                <img src="assets/images/shapes/sec-line-1.png" alt="" />
                                <p className="text-uppercase">learn with us</p>
                                <h3 className="text-uppercase">How to dive?</h3>
                            </div>
                            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                                alteration in some form, by injected humour, or randomised words which don't look even slightly
                                believable.</p>
                            <a href="contact.html" className="thm-btn video-two__btn">Contact us</a>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowToDive