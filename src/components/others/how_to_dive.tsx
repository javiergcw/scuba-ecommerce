"use client"; // Nuevo: se agregó para indicar que este componente se ejecuta en el cliente

import React from "react";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/utils/constants";
import Link from "next/link";
import { getProxiedImageUrl } from "@/utils/imageProxy";

interface HowToDiveProps {
  title?: string;
  subtitle?: string;
  web_banner_url?: string;
  redirect_url?: string;
}

const HowToDive: React.FC<HowToDiveProps> = ({ 
  title,
  subtitle,
  web_banner_url,
  redirect_url 
}) => {
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
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Texto - Lado izquierdo */}
          <div className="w-full lg:w-1/2">
            <div className="video-two__content">
              <div className="block-title">
                <img src="assets/images/shapes/sec-line-1.png" alt="" />
                <p className="text-uppercase">aprende con nosotros</p>
                <h3 className="text-uppercase">{title}</h3>
              </div>
              <p>
                {subtitle}
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

          {/* Imagen - Lado derecho */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <img 
                src={getProxiedImageUrl(web_banner_url)} 
                alt="" 
                className="w-full h-auto object-cover"
              />
              <a
                href={redirect_url}
                className="video-popup"
                style={{
                  background: 'rgba(255, 255, 0, 0.8)',
                  borderRadius: '0px',
                  padding: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  width: '80px',
                  height: '80px',
                  border: 'none',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <i className="bi bi-play-circle-fill" style={{ color: 'black', fontSize: '32px' }}></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToDive;
