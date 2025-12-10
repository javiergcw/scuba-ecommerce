import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import { getProxiedImageUrl } from '@/utils/imageProxy';

interface Course {
    id: string
    level: string
    image: string
    title: string
    description: string
    link: string
}

interface BodyCourseProps {
    courses: Course[]
}

export const BodyCourse = ({ courses }: BodyCourseProps) => {
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get('category');

    const groupedCourses = courses.reduce((acc: Record<string, Course[]>, course) => {
        acc[course.level] = acc[course.level] || []
        acc[course.level].push(course)
        return acc
    }, {})

    // Si no hay cursos y hay una categoría seleccionada, mostrar mensaje
    if (courses.length === 0 && selectedCategory) {
        return (
            <section className="course-one">
                <div className="container">
                    <div className="text-center py-8">
                        <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '20px' }}>
                            No se encontraron cursos en la categoría "{selectedCategory}"
                        </h2>
                        <p style={{ color: '#666', marginBottom: '30px' }}>
                            Por favor, selecciona otra categoría o revisa todos nuestros cursos disponibles.
                        </p>
                        <Link 
                            href="/cursos" 
                            style={{
                                display: 'inline-block',
                                padding: '12px 24px',
                                backgroundColor: '#87CEEB',
                                color: '#fff',
                                textDecoration: 'none',
                                borderRadius: '4px',
                                transition: 'background-color 0.3s ease'
                            }}
                        >
                            Ver todos los cursos
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    // Si no hay cursos en general
    if (courses.length === 0) {
        return (
            <section className="course-one">
                <div className="container">
                    <div className="text-center py-8">
                        <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '20px' }}>
                            No hay cursos disponibles en este momento
                        </h2>
                        <p style={{ color: '#666' }}>
                            Estamos trabajando para agregar nuevos cursos. ¡Vuelve pronto!
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="course-one">
            <div className="container">
                {selectedCategory && (
                    <div className="mb-4">
                        <h2 style={{ color: '#000', fontWeight: 'bold', marginBottom: '10px' }}>
                            Cursos de: {selectedCategory}
                        </h2>
                        <Link 
                            href="/cursos" 
                            style={{
                                color: '#87CEEB',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}
                        >
                            ← Ver todos los cursos
                        </Link>
                    </div>
                )}
                {Object.entries(groupedCourses).map(([level, group]) => (
                    <div key={level} className="course-group" style={{ marginBottom: '40px' }}>
                        {!selectedCategory && (
                            <h2 style={{ marginBottom: '20px', color: '#000', fontWeight: 'bold' }}>{level}</h2>
                        )}
                        <div className="row">

                            {group.map((course) => (
                                <div key={course.id} className="col-lg-4 col-md-6" style={{ marginBottom: '30px' }}>
                                    <div
                                        className="course-one__single w-full flex flex-col justify-between"
                                        style={{ height: "100%", minHeight: 520, background: "#fff" }}
                                    >
                                        <div className="course-one__image w-full">
                                            <Link
                                                href={course.link}
                                                className="course-one__cat"
                                            >
                                                {course.level}
                                            </Link>
                                            <div className="course-one__image-inner w-full">
                                                {course.image ? (
                                                    <img
                                                        src={getProxiedImageUrl(course.image)}
                                                        alt={course.title}
                                                        style={{
                                                            width: "100%",
                                                            height: "333px",
                                                            objectFit: "cover",
                                                            display: "block",
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        style={{
                                                            width: "100%",
                                                            height: "333px",
                                                            backgroundColor: "#f0f0f0",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <span>Imagen no disponible</span>
                                                    </div>
                                                )}
                                                <Link href={course.link}>
                                                    <i className="scubo-icon-plus-symbol"></i>
                                                </Link>
                                            </div>
                                        </div>

                                        <div
                                            className="course-one__content hvr-sweep-to-bottom w-full px-4 py-3 flex-grow flex flex-col justify-between"
                                            style={{ backgroundColor: "#fff" }}
                                        >
                                            <h3 className="text-base font-bold leading-tight text-center">
                                                <Link href={course.link}>{course.title}</Link>
                                            </h3>
                                            <p className="text-sm text-gray-600 text-center mt-2">
                                                {course.description || "Descripción no disponible"}
                                            </p>
                                        </div>

                                        <Link
                                            href={course.link}
                                            className="course-one__book-link block w-full text-center mt-auto py-2 transition-colors duration-200 hover:text-blue-500"
                                            style={{ borderTop: "1px solid #f0f0f0" }}
                                        >
                                            Ver detalles
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
