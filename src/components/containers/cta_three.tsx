"use client"
import { ROUTES } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const CtaThree = () => {

  const pathname = usePathname();

const isActive = (path: string) => {
  if (path === ROUTES.CONTACT) {
    return pathname === path ? "text-blue-500 font-bold" : "";
  }
  return pathname.startsWith(path) ? "text-blue-500 font-bold" : "";
};
  return (
    <>
      <section className="cta-three">
        <img
          src="assets/images/resources/cta-1-1.png"
          className="cta-three__moc wow fadeInRight"
          data-wow-duration="1500ms"
          alt=""
        />
        <div className="container">
          <div className="cta-three__title">¿Listo para aprender a bucear?</div>
          <div className="cta-three__content">
            <div className="cta-three__content-inner">
              <div className="block-title">
                <p className="text-uppercase">Aprende a bucear con nosotros</p>
                <h3 className="text-uppercase">Descubre un nuevo mundo</h3>
              </div>
              <p>
                Explora las maravillas del océano con nuestros cursos diseñados
                para todos los niveles. Sumérgete en una experiencia <br />
                única que te conectará con la naturaleza como nunca antes.
              </p>

              <Link
                href={ROUTES.CONTACT}
                legacyBehavior
                className={`transition-colors duration-200 hover:text-blue-500 ${isActive(
                  ROUTES.CONTACT
                )}`}
              >
                <a href="contact.html" className="thm-btn cta-three__btn">
                  Únete ahora
                </a>
              </Link>
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
                <h3>
                  Oportunidades infinitas <br /> para descubrir bajo el agua
                </h3>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cta-three__feature-box">
                <div className="cta-three__feature-box-icon">
                  <i className="scubo-icon-checked"></i>
                </div>
                <h3>
                  Uniendo la tribu más grande <br /> de buceadores del mundo
                </h3>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cta-three__feature-box">
                <div className="cta-three__feature-box-icon">
                  <i className="scubo-icon-checked"></i>
                </div>
                <h3>
                  Mejorando la salud de <br /> nuestro planeta oceánico
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CtaThree;
