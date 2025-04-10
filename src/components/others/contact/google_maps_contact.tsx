"use client";
import dynamic from "next/dynamic";
import React from "react";

// importar el componente solo en cliente (sin SSR)
const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

const GoogleMapsContact = () => {
  return (
    <div className="google-map__contact">
      <LeafletMap />
    </div>
  );
};

export default GoogleMapsContact;
