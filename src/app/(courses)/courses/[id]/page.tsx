'use client'
import BodyDetailCourse from '@/components/others/course/body_detail_course';
import { HeaderDetailCourse } from '@/components/others/course/header_detail_course';
import React, { useEffect, useState } from 'react';
import { services, Product } from 'monolite-saas';
import { useParams } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';

const CourseDetailPage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const courseData = await services.products.getProductById(Number(id));
                setCourse(courseData);
                setError(null);
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

    const courseDetailData = {
        image: course.image_url,
        price: course.price,
        numberOfDives: 2, // Este valor debería venir del producto
        courseDuration: 4, // Este valor debería venir del producto
        title: course.name,
        description: course.description || 'Descripción no disponible',
        tips: course.description || 'Información adicional no disponible',
        additionalInfo: course.description || 'Información adicional no disponible',
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