"use client"; // Nuevo: se agregó para indicar que este componente se ejecuta en el cliente

import React from "react";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/utils/constants";
import Link from "next/link";
import { Banner } from 'monolite-saas';

interface HowToDiveProps {
  banners: Banner[];
  videoUrl?: string;
}

const HowToDive: React.FC<HowToDiveProps> = ({ banners, }) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === ROUTES.HOME) {
      return pathname === path ? "text-blue-500 font-bold" : "";
    }
    return pathname.startsWith(path) ? "text-blue-500 font-bold" : "";
  };

  const secondaryZoneBanner = banners.find(
    (banner) => banner.zone_code === "secondary-zone" && banner.active
  );

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
          <img src={secondaryZoneBanner?.web_banner_url || ""} alt="" />
          <a
            href={secondaryZoneBanner?.redirect_url || ""}
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
                ¿Sueñas con explorar el fascinante mundo submarino? En nuestra escuela de buceo te ofrecemos la oportunidad de convertirte en un buceador certificado. Nuestros instructores profesionales te guiarán paso a paso, desde los conceptos básicos hasta las técnicas avanzadas. Descubre la belleza de los arrecifes de coral, la vida marina y las increíbles formaciones submarinas. ¡No esperes más para comenzar tu aventura bajo el agua!
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
