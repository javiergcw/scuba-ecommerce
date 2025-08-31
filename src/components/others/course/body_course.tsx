import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';

interface Course {
    id: number
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
                            href="/courses" 
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
                            href="/courses" 
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
                                <div key={course.id} className="col-lg-4 col-md-6">
                                    <div className="course-one__single" style={{ width: '100%' }}>
                                        <div className="course-one__image" style={{ width: '100%' }}>
                                            <Link href={course.link} className="course-one__cat">{course.level}</Link>
                                            <div className="course-one__image-inner" style={{ width: '100%' }}>
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                    style={{
                                                        width: '100%',
                                                        height: '333px',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                                <Link href={course.link}><i className="scubo-icon-plus-symbol"></i></Link>
                                            </div>
                                        </div>
                                        <div className="course-one__content hvr-sweep-to-bottom" style={{ width: '100%' }}>
                                            <h3><Link href={course.link}>{course.title}</Link></h3>
                                            <p>{course.description}</p>
                                        </div>
                                        <Link href={course.link} className="course-one__book-link" style={{ width: '100%', display: 'block' }}>
                                            Book this course
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
