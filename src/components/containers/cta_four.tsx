"use client";
import { ROUTES } from "@/utils/constants";
import Link from "next/link";

import { usePathname } from "next/navigation";
import React from "react";

export const CtaFour = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === ROUTES.HOME) {
      return pathname === path ? "text-blue-500 font-bold" : "";
    }
    return pathname.startsWith(path) ? "text-blue-500 font-bold" : "";
  };
  return (
    <>
      <section className="cta-four">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div
                className="cta-four__image wow fadeInLeft"
                data-wow-duration="1500ms"
              >
                <img src="assets/images/resources/cta-2-1.jpg" alt="" />
                <div className="cta-four__image-content">
                  <i className="scubo-icon-scuba-diving"></i>
                  <p>36</p>
                  <h3>
                    años de <br /> experiencia
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="cta-four__content">
                <div className="block-title text-left">
                  <img src="assets/images/shapes/sec-line-1.png" alt="" />
                  <p className="text-uppercase">Sobre el centro Scubo</p>
                  <h3 className="text-uppercase">
                  EXPERTOS EN FORMACIÓN DE BUZOS
                  </h3>
                </div>
                <p>
                  Con más de tres décadas de experiencia, formamos buzos con
                  altos estándares de calidad, seguridad y respeto por el mar.
                  Nuestro equipo te acompaña en cada inmersión, desde nivel
                  principiante hasta avanzado.
                </p>

                <Link
                  href={ROUTES.ABOUT}
                  legacyBehavior
                  className={`transition-colors duration-200 hover:text-blue-500 ${isActive(
                    ROUTES.ABOUT
                  )}`}
                >
                  <a href="about.html" className="thm-btn cta-four__btn">
                    Descubre más
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*   <section className="cta-five">
                <div className="cta-five__bg" style={{ backgroundImage: 'url(assets/images/background/cta-5-1-bg.jpg)' }}></div>
                <div className="container">
                    <div className="cta-five__box-wrap wow fadeInUp" data-wow-duration="1500ms">
                        <div className="cta-five__box">
                            <i className="scubo-icon-aqualung"></i>
                            <h3><a href="#">Discover a <br /> whole new world</a></h3>
                        </div>
                        <div className="cta-five__box">
                            <i className="scubo-icon-scuba"></i>
                            <h3><a href="#">Begin underwater <br /> adventure</a></h3>
                        </div>
                        <div className="cta-five__box">
                            <i className="scubo-icon-snorkel"></i>
                            <h3><a href="#">TAKE YOUR DIVE TO <br /> THE NEXT LEVEL</a></h3>
                        </div>
                    </div>
                    <div className="cta-five__content">
                        <div className="block-title text-left">
                            <img src="assets/images/shapes/sec-line-1.png" alt="" />
                            <p className="text-uppercase">Join And get some benefits</p>
                            <h3 className="text-uppercase">We seek adventure where <br /> others only dream</h3>
                        </div>
                        <p>There are many variations of passages of Lorem Ipsum available, but the <br /> majority have suffered alteration in some form, by injected humour, or <br /> randomised words which don't look even slightly believable.</p>
                        <a href="pricing.html" className="thm-btn cta-five__btn">Start with us now</a>
                    </div>
                </div>
            </section > */}
    </>
  );
};
