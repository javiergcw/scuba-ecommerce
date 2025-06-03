'use client';
import React from 'react';
import { Box, Container, Link, useTheme, useMediaQuery } from '@mui/material';
import { keyframes } from '@emotion/react';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

interface Brand {
    image: string;
    link: string;
}

const brands: Brand[] = [
    {
        image: '/assets/images/brand/brand-1-1.png',
        link: 'https://www.padi.com/es',
    },
    {
        image: '/assets/images/brand/brand-1-2.png',
        link: 'https://www.padi.com/es/centro-buceo/colombia/oceano-scuba/',
    },
    {
        image: '/assets/images/brand/brand-1-3.png',
        link: 'https://www.mincit.gov.co/minturismo/calidad-turistica',
    },
];

const BrandBubbleSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                backgroundColor: '#3b91e1',
                height: '200px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
            }}
        >
            <Container
                disableGutters={isMobile}
                sx={{
                    display: 'flex',
                    justifyContent: isMobile ? 'flex-start' : 'space-around',
                    alignItems: 'center',
                    flexWrap: isMobile ? 'nowrap' : 'wrap',
                    gap: 4,
                    px: isMobile ? 2 : 0,

                    scrollBehavior: 'smooth',
                    width: '100%',
                }}
            >
                {brands.map((brand, index) => (
                    <Box
                        key={index}
                        component={Link}
                        href={brand.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            display: 'inline-block',
                            animation: `${float} 5s ease-in-out infinite`,
                            animationDelay: `${index * 0.5}s`,
                            transition: 'transform 0.3s ease-in-out',
                            minWidth: isMobile ? 120 : 'auto',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src={brand.image}
                            alt={`Brand ${index + 1}`}
                            sx={{
                                height: 80,
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                ))}
            </Container>
        </Box>
    );
};

export default BrandBubbleSection;
