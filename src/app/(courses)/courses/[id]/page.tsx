'use client'
import BodyDetailCourse from '@/components/others/course/body_detail_course';
import { HeaderDetailCourse } from '@/components/others/course/header_detail_course';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { ProductService } from '@/core/service/product/product_service';
import { ProductDto } from '@/core/dto/receive/product/receive_products_dto';

const CourseDetailPage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState<ProductDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                console.log('🔍 Buscando curso con ID:', id);
                const courseData = await ProductService.getProductById(id as string);
                if (courseData) {
                    console.log('✅ Curso encontrado:', courseData.name);
                    setCourse(courseData);
                    setError(null);
                } else {
                    console.error('❌ Curso no encontrado con ID:', id);
                    setError('Curso no encontrado');
                }
            } catch (err) {
                console.error('❌ Error al cargar el curso:', err);
                setError('Error al cargar el curso');
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
        return (
            <Box sx={{ 
                width: '100%',
                minHeight: '50vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 4
            }}>
                <Typography variant="h4" sx={{ mb: 2, color: '#051b35', fontWeight: 'bold' }}>
                    Curso no encontrado
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: '#666', textAlign: 'center' }}>
                    {error || 'El curso que buscas no existe o ha sido eliminado.'}
                </Typography>
                <Button 
                    variant="contained" 
                    onClick={() => window.location.href = '/courses'}
                    sx={{
                        backgroundColor: '#87CEEB',
                        '&:hover': { backgroundColor: '#6ab5d8' }
                    }}
                >
                    Ver todos los cursos
                </Button>
            </Box>
        );
    }

    const courseDetailData = {
        image: course.photo,
        price: course.price,
        numberOfDives: course.dives_only,
        courseDuration: course.days_course,
        title: course.name,
        description: course.long_description || 'Descripción no disponible',
        tips: course.short_description || 'Información adicional no disponible',
        additionalInfo: course.long_description || 'Información adicional no disponible',
        features: {},
        courseId: course.id,
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