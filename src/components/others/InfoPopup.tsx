'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@mui/material';
import { BannerDto } from '@/core/dto/receive/zone/receive_zones_dto';

interface InfoPopupProps {
  banner?: BannerDto | null;
}

export default function InfoPopup({ banner }: InfoPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    if (banner?.link_url) {
      window.open(banner.link_url, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback al WhatsApp si no hay link_url
      window.open('https://api.whatsapp.com/send/?phone=573165341834', '_blank', 'noopener,noreferrer');
    }
  };

  // Si no hay banner, no mostrar el popup
  if (!banner) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      scroll="body"
      sx={{
        zIndex: 99999,
        position: 'fixed',
        '& .MuiDialog-container': {
          alignItems: 'flex-start',
          paddingTop: '20px',
          zIndex: 99999,
        },
        '& .MuiDialog-paper': {
          zIndex: 99999,
          position: 'relative',
          maxWidth: '700px',
          width: '100%',
        }
      }}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          overflow: 'visible',
          margin: '20px auto 0',
          zIndex: 99999,
          position: 'relative',
        }
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'none',
          zIndex: 99998,
          position: 'fixed',
        }
      }}
    >
      <DialogContent sx={{ 
        p: 0, 
        position: 'relative',
        zIndex: 99999,
        overflow: 'visible',
        '& img': {
          imageRendering: 'crisp-edges',
        }
      }}>
        {/* Botón de cerrar mejorado */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-all duration-200 z-[100000] shadow-xl border-2 border-gray-300 hover:border-gray-400 hover:scale-110 group"
          aria-label="Cerrar"
          style={{
            backdropFilter: 'blur(10px)',
          } as React.CSSProperties}
        >
          <svg
            className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-all duration-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            style={{ 
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))',
            }}
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Contenido del popup */}
        <div className="p-4" style={{ position: 'relative', zIndex: 99999 }}>
          {/* Imagen */}
          <div className="mb-4">
            <Image
              src={banner.image_url || "/gemini1.0.png"}
              alt={banner.title || "Información"}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg"
              priority
              style={{ 
                imageRendering: 'crisp-edges',
              }}
            />
          </div>

          {/* Botón minimalista */}
          <button
            onClick={handleButtonClick}
            className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-2.5 px-4 rounded transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
          >
            {banner.link_url?.includes('whatsapp') || !banner.link_url ? (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            ) : null}
            {banner.title || "Más información"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
