"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "@/styles/carousel.css";
import Link from "next/link";
import { services, Product } from "monolite-saas";
import SwiperNavigationButtons from "@/components/containers/SwiperNavigationButtons";

interface RelatedCoursesSliderProps {
  title?: string;
  showAddToCartButton?: boolean;
}

export default function RelatedCoursesSlider({ 
  title = "Cursos Relacionados",
  showAddToCartButton = true 
}: RelatedCoursesSliderProps) {
  const { cartItems, addToCart } = useCart();
  const router = useRouter();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  // Referencias para el Swiper
  const swiperRef = useRef<any>(null);
  const [isSwiperReady, setIsSwiperReady] = useState(false);

  // Obtener productos relacionados basados en la subcategoría de los productos en el carrito
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoadingRelated(true);
        // Obtener todos los productos del backend
        const allProducts = await services.products.getProducts();

        // PASO 1: Extraer las subcategorías de los productos en el carrito
        const cartSubcategories: string[] = [];
        
        cartItems.forEach(item => {
          if (item.subcategory_name) {
            cartSubcategories.push(item.subcategory_name);
          }
        });

        // Obtener subcategorías únicas
        const uniqueCartSubcategories = [...new Set(cartSubcategories)];

        if (uniqueCartSubcategories.length === 0) {
          setRelatedProducts([]);
          return;
        }

        // PASO 2: Filtrar productos del backend que tengan las mismas subcategorías
        const related = allProducts.filter(product => {
          const productSubcategory = product.subcategory_name || 'General';
          const isInCart = cartItems.some(cartItem => cartItem.id === product.id.toString());
          const hasMatchingSubcategory = uniqueCartSubcategories.includes(productSubcategory);
          
          // Solo incluir si tiene la misma subcategoría Y no está en el carrito
          const isRelated = hasMatchingSubcategory && !isInCart;

          return isRelated;
        });



        // PASO 4: Establecer los productos relacionados
        setRelatedProducts(related);
        
      } catch (error) {
        console.error('❌ Error al cargar productos relacionados:', error);
        setRelatedProducts([]);
      } finally {
        setLoadingRelated(false);
      }
    };

    if (cartItems.length > 0) {
      fetchRelatedProducts();
    } else {
      setRelatedProducts([]);
    }
  }, [cartItems]);

  // Limpiar el Swiper cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
      }
    };
  }, []);

  const handleAddToCart = (product: Product) => {
    const courseItem = {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image_url,
      courseDuration: 4, // Valor por defecto
      numberOfDives: 2,   // Valor por defecto
      subcategory_name: product.subcategory_name // Incluir la subcategoría
    };

    addToCart(courseItem);
    setShowSuccess(true);

    // Redirigir a checkout después de un breve delay
    setTimeout(() => {
      router.push('/checkout');
    }, 1000);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 8, position: 'relative', zIndex: 3 }}>
      <Typography variant="h4" textAlign="center" sx={{
        mb: 4,
        color: '#fff',
        fontWeight: 700,
        fontSize: { xs: '1.5rem', md: '2rem' },
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        {title}
      </Typography>
      
      {/* Mostrar información sobre las subcategorías que se están usando */}
      {(() => {
        const cartSubcategories = [...new Set(cartItems.map(item => item.subcategory_name).filter(Boolean))];
        return cartSubcategories.length > 0 ? (
          <Typography variant="body1" textAlign="center" sx={{
            mb: 6,
            color: 'rgba(255,255,255,0.9)',
            fontSize: '1.1rem',
            maxWidth: 600,
            mx: 'auto'
          }}>
            Basado en tus cursos seleccionados de: <strong>{cartSubcategories.join(', ')}</strong>
          </Typography>
        ) : (
          <Typography variant="body1" textAlign="center" sx={{
            mb: 6,
            color: 'rgba(255,255,255,0.9)',
            fontSize: '1.1rem',
            maxWidth: 600,
            mx: 'auto'
          }}>
            Descubre otros cursos que podrían interesarte
          </Typography>
        );
      })()}

      {loadingRelated ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <img
            src="/assets/images/Animation - 1746715748714.gif"
            alt="Cargando cursos relacionados..."
            style={{ width: 100, height: 100 }}
          />
          <Typography variant="body1" sx={{ mt: 2, color: 'rgba(255,255,255,0.8)' }}>
            Buscando cursos relacionados...
          </Typography>
        </Box>
      ) : relatedProducts.length > 0 ? (
        <Box sx={{ position: 'relative' }}>
          {/* Información adicional sobre los productos encontrados */}
          <Typography variant="body2" textAlign="center" sx={{
            mb: 3,
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.9rem'
          }}>
            Se encontraron {relatedProducts.length} cursos relacionados
          </Typography>
          
          <div className="course-group">
            <Swiper
              modules={[Navigation]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setIsSwiperReady(true);
              }}
              spaceBetween={30}
              slidesPerView={3}
              loop={true}
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
              {relatedProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <div
                    className="course-one__single w-full flex flex-col justify-between"
                    style={{ height: "100%", minHeight: 520, background: "#fff" }}
                  >
                    <div className="course-one__image w-full">
                      <Link href={`/courses/${product.id}`} className="course-one__cat">
                        {product.subcategory_name || 'General'}
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

                    <div className="flex flex-col gap-2 p-4" style={{ borderTop: "1px solid #f0f0f0" }}>
                      <Link
                        href={`/courses/${product.id}`}
                        className="course-one__book-link block w-full text-center py-2 transition-colors duration-200 hover:text-blue-500"
                      >
                        Ver detalles
                      </Link>
                      
                      {showAddToCartButton && (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleAddToCart(product)}
                          sx={{
                            backgroundColor: '#ffd701',
                            color: '#051b35',
                            fontWeight: 'bold',
                            borderRadius: 0,
                            '&:hover': {
                              backgroundColor: '#3b91e1',
                              color: '#fff'
                            }
                          }}
                        >
                          Añadir al carrito
                        </Button>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Botones de navegación del Swiper */}
            <SwiperNavigationButtons 
              swiperRef={swiperRef} 
              isSwiperReady={isSwiperReady} 
            />
          </div>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
            No se encontraron cursos relacionados en este momento.
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>
            Esto puede deberse a que todos los cursos de esta categoría ya están en tu carrito.
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push('/courses')}
            sx={{
              backgroundColor: '#ffd701',
              color: '#051b35',
              fontWeight: 'bold',
              borderRadius: 0,
              '&:hover': {
                backgroundColor: '#3b91e1',
                color: '#fff'
              }
            }}
          >
            Explorar Todos los Cursos
          </Button>
        </Box>
      )}

      {/* Snackbar de confirmación */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: '100%' }}
        >
          ¡Producto agregado al carrito! Redirigiendo al checkout...
        </Alert>
      </Snackbar>
    </Box>
  );
} 