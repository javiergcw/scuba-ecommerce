"use client";
import React, { useRef, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface SwiperNavigationButtonsProps {
  swiperRef: React.MutableRefObject<any>;
  isSwiperReady: boolean;
}

const SwiperNavigationButtons: React.FC<SwiperNavigationButtonsProps> = ({
  swiperRef,
  isSwiperReady,
}) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Lógica para configurar la navegación del Swiper
  useEffect(() => {
    if (
      isSwiperReady &&
      swiperRef.current &&
      prevRef.current &&
      nextRef.current
    ) {
      // Configurar los elementos de navegación
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      
      // Reinicializar la navegación
      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
      
      // Actualizar estado de los botones
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
      
      // Agregar event listeners para actualizar el estado
      const handleSlideChange = () => {
        setIsBeginning(swiperRef.current.isBeginning);
        setIsEnd(swiperRef.current.isEnd);
      };
      
      swiperRef.current.on('slideChange', handleSlideChange);
      
      // Agregar event listeners manuales como respaldo
      const handlePrevClick = () => {
        if (swiperRef.current && swiperRef.current.slidePrev) {
          swiperRef.current.slidePrev();
        }
      };
      
      const handleNextClick = () => {
        if (swiperRef.current && swiperRef.current.slideNext) {
          swiperRef.current.slideNext();
        }
      };
      
      prevRef.current.addEventListener('click', handlePrevClick);
      nextRef.current.addEventListener('click', handleNextClick);
      
      // Cleanup function
      return () => {
        if (swiperRef.current) {
          swiperRef.current.off('slideChange', handleSlideChange);
        }
        if (prevRef.current) {
          prevRef.current.removeEventListener('click', handlePrevClick);
        }
        if (nextRef.current) {
          nextRef.current.removeEventListener('click', handleNextClick);
        }
      };
    }
  }, [isSwiperReady, swiperRef]);

  // Estilos de los botones
  const buttonStyles = {
    zIndex: 99,
    width: 56,
    height: 56,
    bgcolor: "#3b91e1",
    color: "white",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    border: "2px solid rgba(255,255,255,0.2)",
    "&:hover": {
      bgcolor: "#ffd701",
      color: "#000",
      transform: "scale(1.1)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
    "&:disabled": {
      bgcolor: "rgba(59, 145, 225, 0.5)",
      color: "rgba(255,255,255,0.5)",
      cursor: "not-allowed",
    }
  };

  return (
    <div className="flex justify-between items-center absolute top-1/2 left-0 right-0 px-4 z-20 pointer-events-none">
      <IconButton
        ref={prevRef}
        sx={buttonStyles}
        disabled={isBeginning}
        className="pointer-events-auto"
      >
        <ChevronLeftIcon fontSize="large" />
      </IconButton>

      <IconButton
        ref={nextRef}
        sx={buttonStyles}
        disabled={isEnd}
        className="pointer-events-auto"
      >
        <ChevronRightIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default SwiperNavigationButtons; 