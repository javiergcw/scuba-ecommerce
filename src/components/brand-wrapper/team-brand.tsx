import React from 'react'

export const TeamBrand = () => {
  return (
    <>
    <div className="team-brand__wrapper" style={{ backgroundImage: 'url(assets/images/shapes/about-brand-team-bg.png)' }}>
            <section className="team-one">
                <div className="container">
                    <div className="block-title text-center">
                        <img src="assets/images/shapes/sec-line-1.png" alt="" />
                        <p className="text-uppercase">expertos en buceo listos para guiarte bajo el mar </p>
                        <h3 className="text-uppercase">nuestros instructores</h3>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="team-one__single">
                                <img src="assets/images/team/team-1-1.jpg" alt="" />
                                <div className="team-one__content">
                                    <div className="team-one__content-inner">
                                        <h3>Maggie Goodman</h3>
                                        <span>Co Founder</span>
                                        <div className="team-one__social">
                                            <a href="#"><i className="fab fa-facebook-square"></i></a>
                                            <a href="#"><i className="fab fa-instagram"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="team-one__single">
                                <img src="assets/images/team/team-1-2.jpg" alt=""/>
                                <div className="team-one__content">
                                    <div className="team-one__content-inner">
                                        <h3>Craig Hawkins</h3>
                                        <span>Co Founder</span>
                                        <div className="team-one__social">
                                            <a href="#"><i className="fab fa-facebook-square"></i></a>
                                            <a href="#"><i className="fab fa-instagram"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="team-one__single">
                                <img src="assets/images/team/team-1-3.jpg" alt=""/>
                                <div className="team-one__content">
                                    <div className="team-one__content-inner">
                                        <h3>Katharine Alvarez</h3>
                                        <span>Co Founder</span>
                                        <div className="team-one__social">
                                            <a href="#"><i className="fab fa-facebook-square"></i></a>
                                            <a href="#"><i className="fab fa-instagram"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="team-one__single">
                                <img src="assets/images/team/team-1-4.jpg" alt=""/>
                                <div className="team-one__content">
                                    <div className="team-one__content-inner">
                                        <h3>Mabel Underwood</h3>
                                        <span>Co Founder</span>
                                        <div className="team-one__social">
                                            <a href="#"><i className="fab fa-facebook-square"></i></a>
                                            <a href="#"><i className="fab fa-instagram"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="brand-one">
                <div className="container">
                    <div className="brand-one__carousel owl-carousel thm__owl-carousel owl-theme" data-options='{"loop": true, "autoplay": true, "autoplayHoverPause": true, "autoplayTimeout": 5000, "items": 5, "dots": false, "nav": false, "margin": 100, "smartSpeed": 700, "responsive": { "0": {"items": 2, "margin": 30}, "480": {"items": 3, "margin": 30}, "991": {"items": 4, "margin": 50}, "1199": {"items": 5, "margin": 100}}}'>
                        <div className="item">
                            <img src="assets/images/brand/brand-2-1.png" alt=""/>
                        </div>
                        <div className="item">
                            <img src="assets/images/brand/brand-2-2.png" alt=""/>
                        </div>
                        <div className="item">
                            <img src="assets/images/brand/brand-2-3.png" alt=""/>
                        </div>
                        <div className="item">
                            <img src="assets/images/brand/brand-2-4.png" alt=""/>
                        </div>
                        <div className="item">
                            <img src="assets/images/brand/brand-2-5.png" alt=""/>
                        </div>
                        <div className="item">
                            <img src="assets/images/brand/brand-2-6.png" alt=""/>
                        </div>
                        <div className="item">
                            <img src="assets/images/brand/brand-2-1.png" alt=""/>
                        </div>
                        <div className="item">
                            <img src="assets/images/brand/brand-2-2.png" alt=""/>
                        </div>
                        <div className="item">
                            <img src="assets/images/brand/brand-2-3.png" alt=""/>
                        </div>
                        <div className="item">
                            <img src="assets/images/brand/brand-2-4.png" alt=""/>
                        </div>
                        <div className="item">
                            <img src="assets/images/brand/brand-2-5.png" alt=""/>
                        </div>
                        <div className="item">
                            <img src="assets/images/brand/brand-2-6.png" alt=""/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
  )
}
