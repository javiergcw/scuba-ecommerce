"use client";

import React, { useState } from 'react'
import { ProductFeatures } from 'monolite-saas';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { Snackbar, Alert } from '@mui/material';

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
    courseId
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
            numberOfDives: numberOfDives
        };

        addToCart(courseItem);
        setShowSuccess(true);
        
        // Redirigir a checkout después de un breve delay para mostrar el mensaje
        setTimeout(() => {
            router.push('/checkout');
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

                        <div className="course-details__infos wow fadeInRight" data-wow-duration="1500ms" style={{
                            position: 'absolute',
                            zIndex: 1
                        }}>
                            <div className="course-details__infos-title">Detail</div>
                            <div className="course-details__infos-single">
                                <span>${price}</span>
                                <p>Dive <br />price</p>
                            </div>
                            <div className="course-details__infos-single">
                                <span>{numberOfDives}</span>
                                <p>Dives <br />
                                    only</p>
                            </div>
                            <div className="course-details__infos-single">
                                <span>{courseDuration}</span>
                                <p>day <br /> course</p>
                            </div>
                        </div>
                    </div>
                    <div className="course-details__content">
                        <br/>
                        <h3>{title}</h3>
                        <p>{description}</p>
                       {/*  <h4>Características del Curso</h4> */}
                        <ul style={{ listStyleType: 'decimal', paddingLeft: '30px' }}>
                            {features && Object.entries(features).map(([key, value]) => (
                                <li key={key} style={{ marginBottom: '10px' }}>{value}</li>
                            ))}
                        </ul>

                        <div style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
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
                            
                            <a href="/contact" className="thm-btn course-details__btn">
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