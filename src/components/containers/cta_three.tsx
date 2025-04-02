import React from 'react'

const CtaThree = () => {
  return (
    <>
      <section className="cta-three">
        <img src="assets/images/resources/cta-1-1.png" className="cta-three__moc wow fadeInRight" data-wow-duration="1500ms" alt="" />
        <div className="container">
          <div className="cta-three__title">Ready to learn diving?</div>
          <div className="cta-three__content">
            <div className="cta-three__content-inner">
              <div className="block-title">
                <p className="text-uppercase">Learn diving with us</p>
                <h3 className="text-uppercase">Discover new world</h3>
              </div>
              <p>There are many variatin of passages of lorem ipsum simply free available, but the <br /> majority have
                if alteration in some formd bisc humour.</p>
              <a href="contact.html" className="thm-btn cta-three__btn">Join us now</a>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-three__feature">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="cta-three__feature-box">
                <div className="cta-three__feature-box-icon">

                  <i className="scubo-icon-checked"></i>
                </div>
                <h3>endless opportunities <br /> for underwater discovery</h3>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cta-three__feature-box">
                <div className="cta-three__feature-box-icon">

                  <i className="scubo-icon-checked"></i>
                </div>
                <h3>Uniting the World's <br /> largest tribe of divers</h3>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cta-three__feature-box">
                <div className="cta-three__feature-box-icon">

                  <i className="scubo-icon-checked"></i>
                </div>
                <h3>Improving the health of <br /> our ocean planet</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CtaThree