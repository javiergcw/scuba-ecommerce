'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  useMediaQuery,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckIcon from '@mui/icons-material/Check';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/utils/constants';

const CtaThree = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width:900px)');

  const isActive = (path: string) => {
    if (path === ROUTES.CONTACT) {
      return pathname === path ? 'text-blue-500 font-bold' : '';
    }
    return pathname.startsWith(path) ? 'text-blue-500 font-bold' : '';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        width: '100%',
      }}
    >

      <Box
        sx={{
          flex: 1,
          bgcolor: '#3BA0F3',
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
        }}
      >
  
        <Box
          sx={{
            bgcolor: '#ffd701',
            color: '#000',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            fontWeight: 700,
            fontSize: '14px',
            letterSpacing: '4px',
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '60px',
            zIndex: 2,
          }}
        >
          ¿LISTO PARA APRENDER A BUCEAR?
        </Box>

        <Box
          sx={{
            flex: 1,
            p: { xs: 3, md: 6 },
            pl: { md: '80px' },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Stack spacing={2}>
            <Typography variant="caption" sx={{ color: 'white', letterSpacing: 2 }}>
              APRENDE A BUCEAR CON NOSOTROS
            </Typography>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 800 }}>
              DESCUBRE UN NUEVO MUNDO
            </Typography>
            <Typography sx={{ color: 'white', fontSize: 16 }}>
              Explora las maravillas del océano con nuestros cursos diseñados para todos los niveles. Sumérgete en una experiencia única que te conectará con la naturaleza como nunca antes.
            </Typography>

            <Link href={ROUTES.CONTACT} className={isActive(ROUTES.CONTACT)}>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: '#ffd701',
                  color: 'black',
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#ffd701',
                    color: '#000',
                  },
                }}
                endIcon={<ChevronRightIcon />}
              >
                ÚNETE AHORA
              </Button>
            </Link>
          </Stack>
        </Box>
      </Box>

    
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          p: { xs: 3, md: 6 },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          overflow: 'hidden',
          backgroundColor: '#f0f0f0',
          backgroundImage: 'url("assets/images/shapes/water-wave-bg.png")',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
        }}
      >
      
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: 220,
            height: 220,
            opacity: 0.15,
            zIndex: 1,
          }}
        >
          <Image
            src="/assets/images/resources/cta-1-1.png"
            alt="Scuba"
            layout="fill"
            objectFit="contain"
          />
        </Box>

        {[
          'Oportunidades infinitas para descubrir bajo el agua',
          'Uniendo la tribu más grande de buceadores del mundo',
          'Mejorando la salud de nuestro planeta oceánico',
        ].map((text, index) => (
          <Box
            key={index}
            sx={{
              bgcolor: 'white',
              border: '1px solid #e0e0e0',
              p: 2,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              borderRadius: 2,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                bgcolor: '#ffd701',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
              }}
            >
              <CheckIcon sx={{ fontSize: 20 }} />
            </Box>
            <Typography variant="body1" fontWeight={700}>
              {text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CtaThree;
