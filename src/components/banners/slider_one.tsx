"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/components/slider-one.css";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/utils/constants";
import Link from "next/link";
import { Banner } from 'monolite-saas';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface SliderOneProps {
  banners: Banner[];
}

const SliderOne: React.FC<SliderOneProps> = ({ banners }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (banners.length > 0) {
      setIsLoading(false);
    }
  }, [banners]);

  const isActive = (path: string) => {
    if (path === ROUTES.HOME) {
      return pathname === path ? "text-blue-500 font-bold" : "";
    }
    return pathname.startsWith(path) ? "text-blue-500 font-bold" : "";
  };



 

  if (isLoading) {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      Animation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };

    return (
      <div className="slider-one__wrapper">
        <div className="slider-one__loading">
          <div className="flex items-center justify-center h-[85vh]">
          <DotLottieReact
            src="/Animation - 1746715748714.json" // Ruta al archivo .lottie dentro de /public
            autoplay
            loop
            style={{
              width: 150,
              height: 150,
              display: 'block',
              backgroundColor: 'transparent',
            }}
          />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="slider-one__wrapper">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: ".slider-one__nav-next",
            prevEl: ".slider-one__nav-prev",
          }}
          pagination={{
            el: ".slider-one__pagination",
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="slider-one"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id} className="slider-one__slide">
              <div
                className="slider-one__bg"
                style={{
                  backgroundImage: `url(${banner.web_banner_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="container">
                <div className="slider-one__content text-center">
                  <p className="anim-elm">{banner.subtitle}</p>
                  <h3 className="anim-elm">{banner.title}</h3>

                  <Link
                    href={banner.redirect_url}
                    legacyBehavior
                    className={`transition-colors duration-200 hover:text-blue-500 ${isActive(
                      banner.redirect_url
                    )}`}
                  >
                    <a href={banner.redirect_url} className="thm-btn anim-elm">
                      Ver todos los cursos
                    </a>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="slider-one__nav"
          style={{ right: "20px", left: "auto" }}
        >
          <a href="#" className="slider-one__nav-prev">
            <i className="fa fa-angle-up"></i>
          </a>
          <a href="#" className="slider-one__nav-next">
            <i className="fa fa-angle-down"></i>
          </a>
        </div>
        <div
          className="slider-one__pagination swiper-pagination-vertical"
          style={{ left: "20px", right: "auto" }}
        ></div>
      </div>
      <section className="cta-two">
        <div
          className="cta-two__bg"
          style={{
            backgroundImage: "url(/assets/images/background/footer-bg-1-1.jpg)",
          }}
        />
        <div
          className="cta-two__wave"
          style={{
            backgroundImage: "url(/assets/images/shapes/wave-1.png)",
            backgroundPosition: "center center",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "32px",
            zIndex: 11,
            animation: "bgSlide 20s linear infinite",
          }}
        />
        <div className="container">
          <img
            src="/assets/images/shapes/slide-ribbon-1-1.png"
            alt="Ribbon decoration"
            className="cta-two__moc"
          />
          <h3>
            PROPORCIONAMOS UN SERVICIO EXCELENTE CON SEGURIDAD Y <br />
            UNA <span>EDUCACIÓN DE BUCEO</span> EXCEPCIONAL
          </h3>
          <div className="cta-two__btn-block">
            <Link
              href={ROUTES.CONTACT}
              legacyBehavior
              className={`transition-colors duration-200 hover:text-blue-500 ${isActive(
                ROUTES.CONTACT
              )}`}
            >
              <a href="contact.html" className="thm-btn cta-two__btn">
                Comienza con nosotros ahora
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default SliderOne;
