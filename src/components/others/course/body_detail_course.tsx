"use client";

import React, { useState } from 'react'
import { ProductFeatures } from 'monolite-saas';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { Snackbar, Alert } from '@mui/material';
import { Box, Typography } from "@mui/material";
import { ENABLE_SHOPPING } from '@/app/finalizar-compra/page';
interface CourseDetailProps {
    image: string;
    price: number;
    numberOfDives: number;
    courseDuration: number;
    title: string;
    description: string;
    tips: string;
    additionalInfo: string;
    features?: ProductFeatures;
    courseId?: string; // ID único del curso
    subcategory_name?: string; // Subcategoría del curso
}

const BodyDetailCourse = ({
    image,
    price,
    numberOfDives,
    courseDuration,
    title,
    description,
    tips,
    additionalInfo,
    features,
    courseId,
    subcategory_name
}: CourseDetailProps) => {
    const { addToCart } = useCart();
    const router = useRouter();
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAddToCart = () => {
        const courseItem = {
            id: courseId || `course-${Date.now()}`, // Generar ID si no se proporciona
            name: title,
            price: price,
            quantity: 1,
            image: image,
            courseDuration: courseDuration,
            numberOfDives: numberOfDives,
            subcategory_name: subcategory_name
        };

        addToCart(courseItem);
        setShowSuccess(true);

        // Redirigir a checkout después de un breve delay para mostrar el mensaje
        setTimeout(() => {
            router.push('/finalizar-compra');
        }, 1000);
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
    };

    return (
        <div>
            <section className="course-details">
                <div className="container">
                    <div className="course-details__image" style={{
                        position: 'relative',
                        width: '100%',
                        height: '500px'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={image}
                                alt={title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }}
                            />
                        </div>
                        <Box
                            sx={{
                                position: "absolute",
                                zIndex: 10,
                                maxWidth: { xs: "100%", md: 700 },
                                width: "100%",
                                display: "flex",
                                height: { xs: 110, sm: 130, md: 150 },
                                top: { xs: 500, md: 400 },
                                right: 0,
                            }}
                        >
                            {/* BARRA VERTICAL (DETAIL) */}
                            <Box
                                sx={{
                                    width: { xs: 55, sm: 70, md: 90 },
                                    backgroundColor: "#05142A",
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    writingMode: "vertical-rl",
                                    textOrientation: "upright",
                                    letterSpacing: { xs: 3, sm: 5, md: 6 },
                                    fontWeight: 700,
                                    fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.9rem" },
                                    textTransform: "uppercase",
                                }}
                            >
                                Detail
                            </Box>

                            {/* CONTENEDOR AMARILLO */}
                            <Box
                                sx={{
                                    flex: 1,
                                    backgroundColor: "rgb(255, 215, 1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    px: { xs: 1.5, sm: 2.5, md: 4 },
                                }}
                            >
                                {/* PRECIO */}
                                <Box sx={{ textAlign: "center" }}>
                                    <Box sx={{ display: "flex", alignItems: "baseline", gap: { xs: 0.5, sm: 1 } }}>
                                        {price && price > 0 ? (
                                            <>
                                                <Typography
                                                    sx={{
                                                        fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
                                                        fontWeight: 300,
                                                        lineHeight: 1,
                                                        color: "#0D1B2A",
                                                    }}
                                                >
                                                    ${Math.round(price)}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.4rem" },
                                                        fontWeight: 700,
                                                        color: "#0D1B2A",
                                                    }}
                                                >
                                                    USD
                                                </Typography>
                                            </>
                                        ) : (
                                            <Typography
                                                sx={{
                                                    fontSize: { xs: "1.6rem", sm: "1.8rem", md: "2.2rem" },
                                                    fontWeight: 700,
                                                    color: "#0D1B2A",
                                                }}
                                            >
                                                Consultar
                                            </Typography>
                                        )}
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontSize: { xs: "0.6rem", sm: "0.75rem", md: "0.8rem" },
                                            color: "#0D1B2A",
                                            opacity: 0.85,
                                            mt: 0.5,
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Course price
                                    </Typography>
                                </Box>

                                {/* DIVES */}
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography
                                        sx={{
                                            fontSize: { xs: "1.5rem", sm: "1.7rem", md: "2rem" },
                                            fontWeight: 700,
                                            color: "#0D1B2A",
                                        }}
                                    >
                                        {numberOfDives ?? "—"}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: { xs: "0.6rem", sm: "0.75rem", md: "0.8rem" },
                                            color: "#0D1B2A",
                                            opacity: 0.85,
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Dives only
                                    </Typography>
                                </Box>

                                {/* COURSE DURATION */}
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography
                                        sx={{
                                            fontSize: { xs: "1.5rem", sm: "1.7rem", md: "2rem" },
                                            fontWeight: 700,
                                            color: "#0D1B2A",
                                        }}
                                    >
                                        {courseDuration ?? "—"}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: { xs: "0.6rem", sm: "0.75rem", md: "0.8rem" },
                                            color: "#0D1B2A",
                                            opacity: 0.85,
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Day course
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                    </div>
                    <div className="course-details__content">
                        <br />
                        <div
                            dangerouslySetInnerHTML={{
                                __html: description.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            }}
                            style={{
                                lineHeight: '1.8',
                                fontSize: '16px',
                                color: '#333',
                                whiteSpace: 'pre-wrap'
                            }}
                        />
                        {tips && tips !== additionalInfo && tips !== description && (
                            <div style={{ marginTop: '30px' }}>
                                <h4 style={{ marginBottom: '15px', color: '#051b35' }}>Información Adicional</h4>
                                <p style={{
                                    lineHeight: '1.8',
                                    fontSize: '16px',
                                    color: '#666',
                                    whiteSpace: 'pre-wrap'
                                }}>{tips}</p>
                            </div>
                        )}
                        {additionalInfo && additionalInfo !== description && additionalInfo !== tips && (
                            <div style={{ marginTop: '30px' }}>
                                <h4 style={{ marginBottom: '15px', color: '#051b35' }}>Detalles del Curso</h4>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: additionalInfo.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    }}
                                    style={{
                                        lineHeight: '1.8',
                                        fontSize: '16px',
                                        color: '#666',
                                        whiteSpace: 'pre-wrap'
                                    }}
                                />
                            </div>
                        )}
                        {features && Object.keys(features).length > 0 && (
                            <>
                                <h4 style={{ marginTop: '30px', marginBottom: '15px', color: '#051b35' }}>Características del Curso</h4>
                                <ul style={{ listStyleType: 'decimal', paddingLeft: '30px' }}>
                                    {Object.entries(features).map(([key, value]) => (
                                        <li key={key} style={{ marginBottom: '10px' }}>{value}</li>
                                    ))}
                                </ul>
                            </>
                        )}

                        <div style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
                            {ENABLE_SHOPPING && (
                                <button
                                    className="thm-btn course-details__btn"
                                    onClick={handleAddToCart}
                                    style={{
                                        backgroundColor: '#1976d2',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Comprar Curso
                                </button>
                            )}

                            <a href="/contacto" className="thm-btn course-details__btn">
                                Contactar para más detalles
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Snackbar de confirmación */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={3000}
                onClose={handleCloseSuccess}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSuccess}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    ¡Curso agregado al carrito! Redirigiendo al checkout...
                </Alert>
            </Snackbar>
        </div>
    )
}

export default BodyDetailCourse