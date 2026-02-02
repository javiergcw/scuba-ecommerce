'use client';
import React from 'react';
import { Box, Container, Link, useTheme, useMediaQuery } from '@mui/material';
import { keyframes } from '@emotion/react';
import { BannerDto } from '@/core/dto/receive/zone/receive_zones_dto';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

interface BrandBubbleSectionProps {
    banners: BannerDto[];
}

const BrandBubbleSection: React.FC<BrandBubbleSectionProps> = ({ banners }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const brandCount = banners.length;

    // Determinar el tamaño de las imágenes según la cantidad
    const getImageHeight = () => {
        if (brandCount === 1) return 120;
        if (brandCount === 2) return 100;
        return 80; // 3 o más imágenes
    };

    // Determinar la justificación según la cantidad
    const getJustifyContent = () => {
        if (isMobile) return 'flex-start';
        if (brandCount <= 2) return 'center';
        return 'space-around'; // 3 o más imágenes
    };

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
                    justifyContent: getJustifyContent(),
                    alignItems: 'center',
                    flexWrap: isMobile ? 'nowrap' : 'wrap',
                    gap: 4,
                    px: isMobile ? 2 : 0,

                    scrollBehavior: 'smooth',
                    width: '100%',
                }}
            >
                {banners.map((banner, index) => {
                    const bannerId = banner.id || `banner-${index}`;
                    return (
                        <Box
                            key={bannerId}
                            component={Link}
                            href={banner.link_url || '#'}
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
                                src={banner.image_url}
                                alt={banner.title || `Brand ${index + 1}`}
                                sx={{
                                    height: getImageHeight(),
                                    objectFit: 'contain',
                                }}
                            />
                        </Box>
                    );
                })}
            </Container>
        </Box>
    );
};

export default BrandBubbleSection;
