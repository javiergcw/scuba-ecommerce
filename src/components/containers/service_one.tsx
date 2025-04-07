import React from 'react'

const ServiceOne = () => {
  return (
    <section className="service-one">
      <img src="assets/images/shapes/swimmer-contact-1.png" className="contact-one__swimmer" alt="" />
      <img src="assets/images/shapes/fish-service-1.png" alt="" className="site-footer__fish-1" />
      <img src="assets/images/shapes/fish-service-2.png" alt="" className="site-footer__fish-3" />
      <img src="assets/images/shapes/tree-service-1.png" className="site-footer__tree-2" alt="" />
      <div className="service-one__floated-text">Servicios</div>
      <div className="container">
        <div className="block-title text-center">
          <img src="assets/images/shapes/sec-line-1.png" alt="" />
          <p className="text-uppercase">nuestros servicios</p>
          <h3 className="text-uppercase">Lo que ofrecemos</h3>
        </div>
        <div className="row">
          <div className="col-xl-3 col-md-6 col-sm-12">
            <div className="service-one__single">
              <i className="scubo-icon-scuba-diving"></i>
              <h3><a href="courses.html">Scuba <br /> Diving</a></h3>
              <p>To scuba diving There are many variatin of passages of lorem ipsum available, but the majority
                have if alteration in some formd bisc humour.</p>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-sm-12">
            <div className="service-one__single">
              <i className="scubo-icon-aqualung"></i>
              <h3><a href="courses.html">Snorkeling <br />
                Dive</a></h3>
              <p>To scuba diving There are many variatin of passages of lorem ipsum available, but the majority
                have if alteration in some formd bisc humour.</p>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-sm-12">
            <div className="service-one__single">
              <i className="scubo-icon-swimming"></i>
              <h3><a href="courses.html">Learn <br /> Swimming</a></h3>
              <p>To scuba diving There are many variatin of passages of lorem ipsum available, but the majority
                have if alteration in some formd bisc humour.</p>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-sm-12">
            <div className="service-one__single">
              <i className="scubo-icon-snorkel"></i>
              <h3><a href="courses.html">Free <br /> Diving</a></h3>
              <p>To scuba diving There are many variatin of passages of lorem ipsum available, but the majority
                have if alteration in some formd bisc humour.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceOne