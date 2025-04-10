"use client"; // Nuevo: se agregó para indicar que este componente se ejecuta en el cliente

import React from "react";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/utils/constants";
import Link from "next/link";

const HowToDive = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === ROUTES.HOME) {
      return pathname === path ? "text-blue-500 font-bold" : "";
    }
    return pathname.startsWith(path) ? "text-blue-500 font-bold" : "";
  };

  return (
    <section
      className="video-two"
      style={{ backgroundImage: "url(assets/images/shapes/video-2-bg.png)" }}
    >
      <img
        src="/assets/images/shapes/swimmer-2-1.png"
        className="video-two__swimmer"
        alt=""
      />
      <div className="container">
        <div
          className="video-two__box wow fadeInRight"
          data-wow-duration="1500ms"
        >
          <img src="assets/images/resources/video-1-1.jpg" alt="" />
          <a
            href="https://www.youtube.com/watch?v=7rQe_Q4FkaY"
            className="video-popup"
          >
            <i className="bi bi-play-circle-fill"></i>
          </a>
        </div>
        <div className="row">
          <div className="col-xl-6">
            <div className="video-two__content">
              <div className="block-title">
                <img src="assets/images/shapes/sec-line-1.png" alt="" />
                <p className="text-uppercase">aprende con nosotros</p>
                <h3 className="text-uppercase">¿Cómo bucear?</h3>
              </div>
              <p>
                Hay muchas variaciones de pasajes de Lorem Ipsum disponibles,
                pero la mayoría han sufrido alteraciones de alguna forma, ya sea
                por humor inyectado o palabras aleatorias que no parecen ni
                siquiera creíbles.
              </p>
              <Link
                href={ROUTES.CONTACT}
                legacyBehavior
                className={`transition-colors duration-200 hover:text-blue-500 ${isActive(
                  ROUTES.CONTACT
                )}`}
              >
                <a href="contact.html" className="thm-btn video-two__btn">
                  Contáctanos
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToDive;
