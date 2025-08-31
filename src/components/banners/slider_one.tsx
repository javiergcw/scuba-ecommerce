"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/styles/components/slider-one.css";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/utils/constants";
import Link from "next/link";
import { Banner } from 'monolite-saas';
import {
  Box,
  Typography,
  Container,
  Button,
  useTheme,
  useMediaQuery,
  Stack,
  IconButton,
} from "@mui/material";


interface SliderOneProps {
  banners: Banner[];
}

const SliderOne: React.FC<SliderOneProps> = ({ banners }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

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
    return (
      <div className="slider-one__wrapper">
        <div className="slider-one__loading">
          <div className="flex flex-col items-center justify-center h-[85vh] space-y-4">
            <img
              src="/assets/images/Animation-diving.gif"
              alt="Cargando..."
              style={{
                width: 150,
                height: 120,
                display: 'block',
              }}
            />
            <p className="text-gray-600 text-lg font-medium">Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Box position="relative" width="100%">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop
          onSwiper={setSwiperInstance}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          pagination={{
            el: ".custom-swiper-pagination",
            clickable: true,
            bulletClass: "custom-bullet",
            bulletActiveClass: "custom-bullet-active"
          }}
          navigation={{
            nextEl: ".custom-swiper-next",
            prevEl: ".custom-swiper-prev",
          }}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Box
                sx={{
                  backgroundImage: `url(${banner.web_banner_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: isMobile ? "60vh" : "90vh",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Container>
                  <Box
                    textAlign="center"
                    sx={{ width: { xs: "90%", md: "100%" }, mx: "auto" }}
                  >
                    <Typography
                      variant={isMobile ? "subtitle1" : "h6"}
                      color="white"
                      mb={2}
                      sx={{
                        fontFamily: '"Barlow Condensed", sans-serif',
                        fontWeight: 600,
                        textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
                        mt: { xs: 2, md: 0 }, // Margen superior extra solo en mobile
                      }}
                    >
                      {banner.subtitle}
                    </Typography>

                    <Typography
                      variant={isMobile ? "h4" : "h3"}
                      color="white"
                      fontWeight={800}
                      sx={{
                        fontFamily: '"Barlow Condensed", sans-serif',
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                        mb: { xs: 4, md: 3 } 
                      }}
                    >
                      {banner.title}
                    </Typography>

                    <Link href={banner.redirect_url} passHref>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#FFD700",
                          color: "black",
                          px: 6,
                          py: 2.5,
                          fontWeight: 700,
                          fontSize: "1rem",
                          textAlign: "center",
                          whiteSpace: "normal",
                          lineHeight: 1.2,
                          borderRadius: 0,
                          fontFamily: '"Barlow Condensed", sans-serif',
                        }}
                        className={isActive(banner.redirect_url)}
                      >
                        Ver todos los cursos
                      </Button>
                    </Link>
                  </Box>
                </Container>
              </Box>
            </SwiperSlide>

          ))}
        </Swiper>

        <Stack
          direction="column"
          spacing={1.5}
          position="absolute"
          top="50%"
          left={20}
          zIndex={10}
          sx={{
            transform: 'translateY(-50%)',
            '& .MuiIconButton-root': {
              width: 36,
              height: 36,
              borderRadius: 2,
              backgroundColor: '#2F74B4',
              opacity: 0.4,
              '&:hover': {
                backgroundColor: '#235a8d',
                opacity: 1,
              },
            }
          }}
        >
          <IconButton onClick={() => swiperInstance?.slidePrev()} />
          <IconButton onClick={() => swiperInstance?.slideToLoop(1)} />
          <IconButton onClick={() => swiperInstance?.slideNext()} />
        </Stack>

        <Box className="custom-swiper-pagination" sx={{ display: 'none' }}></Box>

        <Box
          component="img"
          src="/assets/images/brand/brand-1-3.png"
          alt="Ribbon decoration"
          sx={{
            position: "absolute",
            top: isMobile ? "60vh" : "90vh",
            left: isMobile ? 40 : 120,
            transform: "translateY(-50%) rotate(0deg)",
            maxWidth: isMobile ? 100 : 120,
            zIndex: 15,
            animation: "spin 10s linear infinite"
          }}
        />

        <style jsx global>{`
          @keyframes spin {
            0% { transform: translateY(-50%) rotate(0deg); }
            100% { transform: translateY(-50%) rotate(360deg); }
          }
        `}</style>
      </Box>

      <Box
        sx={{
          backgroundColor: "#063a7f",
          backgroundImage:
            "linear-gradient(rgba(6, 58, 127, 0.9), rgba(6, 58, 127, 0.9)), url(/assets/images/background/footer-bg-1-1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: 12,
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundImage: "url(/assets/images/shapes/wave-1.png)",
            backgroundPosition: "center center",
            width: "100%",
            height: 32,
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 1,
            animation: "bgSlide 20s linear infinite",
          }}
        />
        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              textAlign: { xs: "center", lg: "right" },
            }}
          >
            <Box sx={{ 
              display: "flex", 
              justifyContent: "center",
              width: { xs: "100%", lg: "66.666667%" }
            }}>
              <Typography
                variant="h5"
                color="white"
                fontWeight={800}
                sx={{
                  fontFamily: '"Barlow Condensed", sans-serif',
                  lineHeight: 1.3,
                }}
              >
                PROPORCIONAMOS UN SERVICIO EXCELENTE CON SEGURIDAD Y<br />
                UNA <Box component="span" sx={{ color: "#FFD700" }}>EDUCACIÓN DE BUCEO</Box> EXCEPCIONAL
              </Typography>
            </Box>
            <Box sx={{ 
              display: "flex", 
              justifyContent: "center",
              width: { xs: "100%", lg: "33.333333%" }
            }}>
              <Link href={ROUTES.CONTACT} legacyBehavior passHref>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFD700",
                    color: "black",
                    px: 6,
                    py: 2.5,
                    fontWeight: 700,
                    fontSize: "1rem",
                    textAlign: 'center',
                    whiteSpace: 'normal',
                    lineHeight: 1.2,
                    borderRadius: 0,
                    fontFamily: '"Barlow Condensed", sans-serif',
                  }}
                >
                  COMIENZA CON NOSOTROS AHORA
                </Button>
              </Link>
            </Box>
          </Box>

        </Container>
      </Box>
    </>
  );
};

export default SliderOne;
