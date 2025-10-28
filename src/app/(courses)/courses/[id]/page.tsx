'use client'
import BodyDetailCourse from '@/components/others/course/body_detail_course';
import { HeaderDetailCourse } from '@/components/others/course/header_detail_course';
import React, { useEffect, useState } from 'react';
import { Product } from 'monolite-saas';
import { useParams } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import { getProductByIdMock, MockProduct } from '@/core/mocks/courses_mock';

const CourseDetailPage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                // Simulamos una pequeña demora para mantener la experiencia de carga
                await new Promise(resolve => setTimeout(resolve, 300));
                const courseData = getProductByIdMock(Number(id));
                if (courseData) {
                    setCourse(courseData as Product);
                    setError(null);
                } else {
                    setError('Curso no encontrado');
                }
            } catch (err) {
                setError('Error al cargar el curso');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCourse();
        }
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ 
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error || !course) {
        return <div>Error: {error || 'Curso no encontrado'}</div>;
    }

    const mockCourse = course as MockProduct;
    const numberOfDives = typeof mockCourse.cuantos_dives_only === 'number' 
        ? mockCourse.cuantos_dives_only 
        : typeof mockCourse.cuantos_dives_only === 'string' && mockCourse.cuantos_dives_only.startsWith('mas')
        ? 20 
        : 0;
    const courseDuration = typeof mockCourse.cuantos_days_course === 'number' 
        ? mockCourse.cuantos_days_course 
        : typeof mockCourse.cuantos_days_course === 'string' && mockCourse.cuantos_days_course.startsWith('mas')
        ? 15 
        : 1;

    const courseDetailData = {
        image: course.image_url,
        price: course.price,
        numberOfDives: numberOfDives,
        courseDuration: courseDuration,
        title: course.name,
        description: mockCourse.descripcion_larga || course.description || 'Descripción no disponible',
        tips: mockCourse.descripcion_corta || 'Información adicional no disponible',
        additionalInfo: mockCourse.descripcion_larga || 'Información adicional no disponible',
        features: course.features || {},
        courseId: course.id.toString(),
        subcategory_name: course.subcategory_name
    };

    return (
        <>
            <HeaderDetailCourse 
                category={course.category_name} 
                courseName={course.name} 
            />
            <BodyDetailCourse {...courseDetailData} />
        </>
    )
}

export default CourseDetailPage;