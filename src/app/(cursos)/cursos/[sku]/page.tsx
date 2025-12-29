'use client'
import BodyDetailCourse from '@/components/others/course/body_detail_course';
import { HeaderDetailCourse } from '@/components/others/course/header_detail_course';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { ProductService } from '@/core/service/product/product_service';
import { ProductDto } from '@/core/dto/receive/product/receive_products_dto';

const CourseDetailPage = () => {
    const params = useParams();
    const skuParam = params?.sku;
    const [course, setCourse] = useState<ProductDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Obtener el SKU del parámetro
        let skuValue: string = '';
        if (Array.isArray(skuParam)) {
            skuValue = skuParam[0] || '';
        } else if (typeof skuParam === 'string') {
            skuValue = skuParam;
        } else {
            skuValue = String(skuParam || '');
        }

        if (!skuValue) {
            setError('SKU no proporcionado');
            setLoading(false);
            return;
        }

        const fetchCourse = async () => {
            try {
                setLoading(true);
                setError(null);

                // El SKU ya viene sin codificar de Next.js, usarlo directamente
                // Solo decodificar si es necesario (evitar errores si ya está decodificado)
                let decodedSku = skuValue;
                try {
                    // Intentar decodificar solo si parece estar codificado
                    if (skuValue.includes('%')) {
                        decodedSku = decodeURIComponent(skuValue);
                    }
                } catch (e) {
                    // Si falla la decodificación, usar el valor original
                    decodedSku = skuValue;
                }

                console.log('🔍 Buscando curso con SKU:', decodedSku);
                console.log('📋 SKU original (params):', skuParam);
                console.log('📋 SKU procesado:', skuValue);

                const courseData = await ProductService.getProductBySku(decodedSku);

                if (courseData) {
                    console.log('✅ Curso encontrado:', courseData.name);
                    console.log('📦 Datos del curso:', {
                        id: courseData.id,
                        sku: courseData.sku,
                        name: courseData.name,
                        price: courseData.price
                    });
                    setCourse(courseData);
                    setError(null);
                } else {
                    console.error('❌ Curso no encontrado con SKU:', decodedSku);
                    setError(`Curso no encontrado con SKU: ${decodedSku}`);
                    // No hacer recarga automática, solo mostrar error
                }
            } catch (err) {
                console.error('❌ Error al cargar el curso:', err);
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
                setError(`Error al cargar el curso: ${errorMessage}`);
                // No hacer recarga automática
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [skuParam]);

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

    if (error || (!course && !loading)) {
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
                    {error ? 'Error al cargar el curso' : 'Curso no encontrado'}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: '#666', textAlign: 'center', maxWidth: '600px' }}>
                    {error || 'El curso que buscas no existe o ha sido eliminado.'}
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => {
                        // Usar router en lugar de window.location para evitar recargas completas
                        window.location.href = '/cursos';
                    }}
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

    // Type guard: asegurar que course no es null
    if (!course) {
        return null;
    }

    const courseDetailData = {
        image: course.photo,
        price: course.price,
        numberOfDives: course.dives_only,
        courseDuration: course.days_course,
        title: course.name,
        description: course.long_description || 'Descripción no disponible',
        tips: '',
        additionalInfo: '',
        features: {},
        courseId: course.id, // UUID del producto
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

