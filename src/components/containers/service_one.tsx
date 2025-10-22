import React from "react";

const ServiceOne = () => {
  return (
    <section className="service-one">
      <img
        src="assets/images/shapes/swimmer-contact-1.png"
        className="contact-one__swimmer"
        alt=""
      />
      <img
        src="assets/images/shapes/fish-service-1.png"
        alt=""
        className="site-footer__fish-1"
      />
      <img
        src="assets/images/shapes/fish-service-2.png"
        alt=""
        className="site-footer__fish-3"
      />
      <img
        src="assets/images/shapes/tree-service-1.png"
        className="site-footer__tree-2"
        alt=""
      />
      <div className="service-one__floated-text">Servicios</div>
      <div className="container">
        <div className="block-title text-center">
          <img src="assets/images/shapes/sec-line-1.png" alt="" />
          <p className="text-uppercase">nuestros servicios</p>
          <h3 className="text-uppercase">Lo que ofrecemos</h3>
        </div>
        <div className="row">
          <div className="col-xl-4 col-md-6 col-sm-12">
            <div className="service-one__single">
              <i className="scubo-icon-scuba-diving"></i>
              <h3>
                <a href="courses.html">
                  Bucear en el <br />
                  Parque Tayrona
                </a>
              </h3>
              <p>
                Explora las aguas cristalinas del Parque Nacional Natural Tayrona.
                Descubre arrecifes de coral, peces tropicales y formaciones rocosas
                únicas en uno de los destinos de buceo más hermosos de Colombia.
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12">
            <div className="service-one__single">
              <i className="scubo-icon-aqualung"></i>
              <h3>
                <a href="courses.html">
                  Entrenamiento <br /> Recreativo
                </a>
              </h3>
              <p>
                Aprende a bucear de forma segura y divertida con nuestros cursos
                recreativos certificados. Desde principiantes hasta niveles avanzados,
                te preparamos para disfrutar del mundo submarino.
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12">
            <div className="service-one__single">
              <i className="scubo-icon-swimming"></i>
              <h3>
                <a href="courses.html">
                  Entrenamiento <br /> Profesional
                </a>
              </h3>
              <p>
                Convierte tu pasión en profesión. Nuestros programas profesionales
                te certifican como instructor de buceo, guía y especialista,
                preparándote para una carrera en el mundo del buceo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceOne;
