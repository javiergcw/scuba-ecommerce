"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../../styles/carousel.css";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/utils/constants";
import Link from "next/link";
import { services, Product } from 'monolite-saas';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



const CoursesFirst = () => {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsData = await services.products.getProducts();
      setProducts(productsData);
      setError(null);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error('Error:', err);
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
      <div>
        <DotLottieReact
          src="/path/to/animation.lottie" // asegúrate que el archivo exista en /public
          loop
          autoplay
        />
      </div>
    );
  }


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <section className="course-one__title">
        <div
          className="course-one__bg"
          style={{
            backgroundImage: "url(assets/images/shapes/water-wave-bg.png)",
          }}
        ></div>
        <div className="container ">
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
              Encuentra todo lo que necesitas para tus aventuras submarinas. <br />
              ¡Tu próxima experiencia comienza aquí!
            </p>
          </div>
        </div>
      </section>

      <div className="course-one course-one__carousel-wrapper">
        {/* peces del pie de página */}
        <img
          src="assets/images/shapes/fish-1-1.png"
          alt=""
          className="site-footer__fish-1"
        />

        {/* árboles del pie de página */}
        <img
          src="assets/images/shapes/tree-1-1.png"
          className="site-footer__tree-1"
          alt=""
        />
        <div className="container">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".course-one__carousel-btn-left",
              nextEl: ".course-one__carousel-btn-right",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              767: {
                slidesPerView: 2,
              },
              991: {
                slidesPerView: 2,
              },
              1199: {
                slidesPerView: 3,
              },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="course-one__wrappers">
                  <div className="course-one__single">
                    <div className="course-one__image">
                      <a href={`/courses/${product.id}`} className="course-one__cat">
                        {product.category_name}
                      </a>
                      <div className="course-one__image-inner">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            style={{
                              width: '370px',
                              height: '333px',
                              objectFit: 'cover'
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: '370px',
                              height: '333px',
                              backgroundColor: '#f0f0f0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <span>Imagen no disponible</span>
                          </div>
                        )}
                        <a href={`/courses/${product.id}`}>
                          <i className="fa fa-plus"></i>
                        </a>
                      </div>
                    </div>
                    <div className="course-one__content hvr-sweep-to-bottom">
                      <h3>
                        <Link href={`/courses/${product.id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      <p>{product.description || 'Descripción no disponible'}</p>
                    </div>

                    <Link
                      href={`/courses/${product.id}`}
                      className={`course-one__book-link transition-colors duration-200 hover:text-blue-500 ${isActive(
                        ROUTES.COURSES
                      )}`}
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="course-one__carousel-btn__wrapper">
            <a className="course-one__carousel-btn-left" href="#">
              <i className="fa fa-chevron-left"></i>
            </a>
            <a className="course-one__carousel-btn-right" href="#">
              <i className="fa fa-chevron-right"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesFirst;
