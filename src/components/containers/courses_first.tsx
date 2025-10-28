"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../../styles/carousel.css";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/utils/constants";
import Link from "next/link";
import { Product } from "monolite-saas";
import SwiperNavigationButtons from "./SwiperNavigationButtons";
import { getProductsMock } from "@/core/mocks/courses_mock";

const CoursesFirst = () => {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSwiperReady, setIsSwiperReady] = useState(false);

  const swiperRef = useRef<any>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Simulamos una pequeña demora para mantener la experiencia de carga
      await new Promise(resolve => setTimeout(resolve, 300));
      const productsData = getProductsMock() as Product[];
      setProducts(productsData);
      setError(null);
    } catch (err) {
      setError("Error al cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const isActive = (path: string) => {
    if (path === ROUTES.HOME) {
      return pathname === path ? "text-blue-500 font-bold" : "";
    }
    return pathname.startsWith(path) ? "text-blue-500 font-bold" : "";
  };

  if (loading) {
    return (
      <div className="slider-one__wrapper">
        <div className="slider-one__loading">
          <div className="flex flex-col items-center justify-center h-[85vh] space-y-4">
            <img
              src="/assets/images/Animation - 1746715748714.gif"
              alt="Cargando..."
              style={{ width: 200, height: 200 }}
            />
            <p className="text-gray-600 text-lg font-medium">Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <section className="course-one__title">
        <div
          className="course-one__bg"
          style={{
            backgroundImage: "url(assets/images/shapes/water-wave-bg.png)",
          }}
        ></div>
        <div className="container">
          <div className="block-title text-left">
            <img src="assets/images/shapes/sec-line-1.png" alt="" />
            <p className="text-uppercase">Lista de todos los productos</p>
            <h3 className="text-uppercase">
              Nuestros <br /> productos populares
            </h3>
          </div>
          <div className="text-block">
            <p className="m-0">
              Descubre nuestra selección de productos de calidad. <br />
              Encuentra todo lo que necesitas para tus aventuras submarinas.{" "}
              <br />
              ¡Tu próxima experiencia comienza aquí!
            </p>
          </div>
        </div>
      </section>

      <div className="course-one course-one__carousel-wrapper relative">
        <img
          src="assets/images/shapes/fish-1-1.png"
          alt=""
          className="site-footer__fish-1"
        />
        <img
          src="assets/images/shapes/tree-1-1.png"
          className="site-footer__tree-1"
          alt=""
        />
        <div className="container relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsSwiperReady(true);
            }}
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              767: { slidesPerView: 2 },
              991: { slidesPerView: 2 },
              1199: { slidesPerView: 3 },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div
                  className="course-one__single w-full flex flex-col justify-between"
                  style={{ height: "100%", minHeight: 520, background: "#fff" }}
                >
                  <div className="course-one__image w-full">
                    <Link
                      href={`/courses/${product.id}`}
                      className="course-one__cat"
                    >
                      {product.category_name}
                    </Link>
                    <div className="course-one__image-inner w-full">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          style={{
                            width: "100%",
                            height: "333px",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "333px",
                            backgroundColor: "#f0f0f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span>Imagen no disponible</span>
                        </div>
                      )}
                      <Link href={`/courses/${product.id}`}>
                        <i className="scubo-icon-plus-symbol"></i>
                      </Link>
                    </div>
                  </div>

                  <div
                    className="course-one__content hvr-sweep-to-bottom w-full px-4 py-3 flex-grow flex flex-col justify-between"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <h3 className="text-base font-bold leading-tight text-center">
                      <Link href={`/courses/${product.id}`}>{product.name}</Link>
                    </h3>
                    <p className="text-sm text-gray-600 text-center mt-2">
                      {product.description || "Descripción no disponible"}
                    </p>
                  </div>

                  <Link
                    href={`/courses/${product.id}`}
                    className={`course-one__book-link block w-full text-center mt-auto py-2 transition-colors duration-200 hover:text-blue-500 ${isActive(
                      ROUTES.COURSES
                    )}`}
                    style={{ borderTop: "1px solid #f0f0f0" }}
                  >
                    Ver detalles
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Componente de botones de navegación */}
          <SwiperNavigationButtons 
            swiperRef={swiperRef}
            isSwiperReady={isSwiperReady}
          />
        </div>
      </div>
    </>
  );
};

export default CoursesFirst;
