"use client";
import { BodyCourse } from '@/components/others/course/body_course'
import { HeaderCourse } from '@/components/others/course/header_course'
import React, { useEffect, useState, Suspense } from 'react'
import { services, Product } from 'monolite-saas';
import { Box, CircularProgress } from '@mui/material';
import { useSearchParams } from 'next/navigation';

const CoursesContent = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get('category');

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const productsData = await services.products.getProducts();
            setProducts(productsData);
            setError(null);
        } catch (err) {
            setError('Error al cargar los productos');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Filtrar productos por categoría cuando cambie la categoría seleccionada
    useEffect(() => {
        if (selectedCategory) {
            const filtered = products.filter(product => 
                product.category_name === selectedCategory
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [selectedCategory, products]);

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="slider-one__wrapper">
                <div className="slider-one__loading">
                    <div className="flex flex-col items-center justify-center h-[85vh] space-y-4">
                        <img
                            src="/assets/images/Animation - 1746715748714.gif"
                            alt="Cargando..."
                            style={{
                                width: 200,
                                height: 200,
                                display: 'block',
                            }}
                        />
                        <p className="text-gray-600 text-lg font-medium">Cargando...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const coursesData = filteredProducts.map(product => ({
        id: product.id,
        level: product.category_name || "N/A",
        image: product.image_url,
        title: product.name,
        description: product.description || 'Descripción no disponible',
        link: `/courses/${product.id}`
    }));

    return (
        <>
            <HeaderCourse />
            <BodyCourse courses={coursesData} />
        </>
    )
}

const CoursesPage = () => {
    return (
        <Suspense fallback={
            <div className="slider-one__wrapper">
                <div className="slider-one__loading">
                    <div className="flex flex-col items-center justify-center h-[85vh] space-y-4">
                        <img
                            src="/assets/images/Animation - 1746715748714.gif"
                            alt="Cargando..."
                            style={{
                                width: 200,
                                height: 200,
                                display: 'block',
                            }}
                        />
                        <p className="text-gray-600 text-lg font-medium">Cargando...</p>
                    </div>
                </div>
            </div>
        }>
            <CoursesContent />
        </Suspense>
    );
}

export default CoursesPage 