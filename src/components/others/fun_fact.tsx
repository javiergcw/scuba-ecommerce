'use client'

import React from 'react'
import { Box, Typography, useTheme, useMediaQuery, Divider } from '@mui/material'
import CountUp from 'react-countup'

const funFacts = [
    { value: 3070, label: 'NADADORES ENTRENADOS' },
    { value: 8620, label: 'CLIENTES SATISFECHOS' },
    { value: 7700, label: 'INSTRUCTORES CERTIFICADOS' },
    { value: 3610, label: 'BUZOS FORMADOS' },
]

export const AboutUsFunFacts = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                px: { xs: 6, sm: 7, md: 0 },
                mt: { xs: -10, md: 10 },
                mb: { xs: -25, md: -14 },
                position: 'relative',
                zIndex: 999,
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#ffd701',
                    width: '100%',
                    maxWidth: { xs: '100%', md: 1000, lg: 1200 },
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'stretch',
                }}
            >
                {/* Encabezado lateral */}
                <Box
                    sx={{
                        backgroundColor: '#0d1b4c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        writingMode: { xs: 'horizontal-tb', md: 'vertical-rl' },
                        transform: { xs: 'none', md: 'rotate(180deg)' },
                        width: { xs: '100%', md: 80 },
                        height: { xs: 50, md: 'auto' },
                        py: { xs: 1.5, md: 0 },
                        px: 1,
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: '#fff',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            letterSpacing: 3,
                            fontSize: { xs: 14, sm: 16 },
                            textAlign: 'center',
                        }}
                    >
                        Datos {isMobile ? 'interesantes' : <><br />interesantes</>}
                    </Typography>
                </Box>

                {/* Contenedor de cifras */}
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        flexWrap: isTablet ? 'wrap' : 'nowrap',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        py: { xs: 3, md: 6 },
                        px: 2,
                        gap: { xs: 3, sm: 2, md: 0 },
                    }}
                >
                    {funFacts.map((fact, index) => (
                        <React.Fragment key={index}>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    px: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: isTablet ? '50%' : 'auto', // nuevo: divide en 2 columnas en tablet
                                    mb: isTablet ? 3 : 0,
                                }}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 800,
                                        color: '#0d1b4c',
                                        fontSize: { xs: 28, sm: 42, md: 64 }, // nuevo: ajuste en tablet
                                    }}
                                >
                                    <CountUp end={fact.value} duration={2} separator="," />
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        textTransform: 'uppercase',
                                        color: '#0d1b4c',
                                        fontSize: { xs: 12, sm: 14, md: 18 }, // nuevo: ajuste en tablet
                                        mt: 0.5,
                                        fontWeight: 500,
                                    }}
                                >
                                    {fact.label}
                                </Typography>
                            </Box>
                            {index !== funFacts.length - 1 && !isMobile && !isTablet && (
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{ height: 100, borderColor: '#0d1b4c', mx: 1 }}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default AboutUsFunFacts
