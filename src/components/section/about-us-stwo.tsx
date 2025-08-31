import React from 'react'

export const AboutUsStwo = () => {
  return (
    <section className="about-two">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-flex about-two__content-wrapper">
            <div className="my-auto">
              <div className="about-two__content">
                <div className="block-title text-left">
                  <img src="assets/images/shapes/sec-line-1.png" alt="" />
                  <p className="text-uppercase">nuestros beneficios</p>
                  <h3 className="text-uppercase">ADÉNTRATE EN UN <br /> mundo increÍble</h3>
                </div>
                <p>Explora las profundidades del Caribe colombiano con inmersiones guiadas, vida marina única y experiencias que cambiarán tu forma de ver el océano.</p>
                <ul className="list-unstyled about-two__list">
                  <li>
                    <span className="about-two__list-count"></span>
                    Cursos PADI para todos los niveles, desde principiantes hasta expertos
                  </li>
                  <li>
                    <span className="about-two__list-count"></span>
                    Acompañamiento personalizado, equipos certificados y seguridad garantizada
                  </li>
                  <li>
                    <span className="about-two__list-count"></span>
                    Aventuras únicas como snorkel, careteo y expediciones al naufragio del Robert
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-two__image wow fadeInRight" data-wow-duration="1500ms">
              <img src="/assets/images/background/banner9.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
