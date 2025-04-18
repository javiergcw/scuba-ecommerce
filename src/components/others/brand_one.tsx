"use client";
import React from "react";
import "@/styles/components/brand-one.css";

export const BrandOne = () => {
  const brands = [
    { 
      image: "/assets/images/brand/brand-1-1.png",
      link: "https://www.padi.com/es"
    },
    { 
      image: "/assets/images/brand/brand-1-2.png",
      link: "https://www.padi.com/es/centro-buceo/colombia/oceano-scuba/"
    },
    { 
      image: "/assets/images/brand/brand-1-3.png",
      link: "https://www.mincit.gov.co/minturismo/calidad-turistica"
    }
  ];

  return (
    <section className="brand-one brand-one__home-one">
      <div
        className="brand-one__wave"
        style={{
          backgroundImage: "url(/assets/images/shapes/wave-1.png)",
          backgroundPosition: "center center",
          filter:
            "brightness(0) saturate(100%) invert(45%) sepia(98%) saturate(1234%) hue-rotate(199deg) brightness(97%) contrast(101%)",
          animation: "bgSlide 20s linear infinite",
        }}
      />
      <div className="container">
        <div className="brand-one__grid">
          {brands.map((brand, index) => (
            <div key={index} className="">
              <a href={brand.link} target="_blank" rel="noopener noreferrer">
                <img src={brand.image} alt={`Brand ${index + 1}`} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
