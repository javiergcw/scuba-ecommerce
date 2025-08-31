// components/LeafletMap.tsx
"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { CONTACT_INFO } from '@/utils/constants';

const customIcon: Icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const FixMap = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 300);
  }, [map]);
  return null;
};

const LeafletMap = () => {
  const position: [number, number] = [11.266278, -74.190056];

  const handleMapClick = () => {
    // Abrir Google Maps con las coordenadas exactas
    const googleMapsUrl = `https://www.google.com/maps?q=${position[0]},${position[1]}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleMarkerClick = () => {
    // Abrir Google Maps con las coordenadas exactas
    const googleMapsUrl = `https://www.google.com/maps?q=${position[0]},${position[1]}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div 
      style={{ 
        height: "100%", 
        width: "100%", 
        cursor: "pointer",
        position: "relative"
      }}
      onClick={handleMapClick}
      title="Haz clic para abrir en Google Maps"
    >
      <MapContainer
        center={position}
        zoom={19}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        dragging={true}
        doubleClickZoom={false}
      >
        <FixMap />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker 
          position={position} 
          icon={customIcon}
          eventHandlers={{
            click: handleMarkerClick
          }}
        />
      </MapContainer>
      <div 
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#333',
          pointerEvents: 'none'
        }}
      >
        Haz clic para abrir en Google Maps
      </div>
    </div>
  );
};

export default LeafletMap;
