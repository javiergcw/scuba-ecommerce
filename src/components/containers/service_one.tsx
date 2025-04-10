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
          <div className="col-xl-3 col-md-6 col-sm-12">
            <div className="service-one__single">
              <i className="scubo-icon-scuba-diving"></i>
              <h3>
                <a href="courses.html">
                  {" "}
                  En <br />
                  Submarinismo
                </a>
              </h3>
              <p>
                Sumérgete en el corazón del océano y descubre un universo
                submarino lleno de vida y color. Te acompañamos en cada
                inmersión para que explores con total seguridad.
              </p>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-sm-12">
            <div className="service-one__single">
              <i className="scubo-icon-aqualung"></i>
              <h3>
                <a href="courses.html">
                  buceo <br /> con snorkel
                </a>
              </h3>
              <p>
                Disfruta de la belleza marina desde la superficie. Con snorkel
                observarás arrecifes y peces multicolores, de forma sencilla y
                al alcance de todos.
              </p>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-sm-12">
            <div className="service-one__single">
              <i className="scubo-icon-swimming"></i>
              <h3>
                <a href="courses.html">
                  Aprender <br /> a nadar
                </a>
              </h3>
              <p>
                Da tus primeras brazadas con la guía de nuestros instructores
                expertos. Desarrolla habilidades y confianza para sentirte libre
                y seguro en el agua.
              </p>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-sm-12">
            <div className="service-one__single">
              <i className="scubo-icon-snorkel"></i>
              <h3>
                <a href="courses.html">
                  Buceo <br /> libre
                </a>
              </h3>
              <p>
                Vive la emoción de sumergirte sin equipo pesado. Aprende
                técnicas de respiración y control para sumergirte a pulmón y
                alcanzar una conexión única con el entorno marino. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceOne;
