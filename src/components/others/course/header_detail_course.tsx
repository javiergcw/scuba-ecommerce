import React from 'react'
import Link from 'next/link'

interface HeaderDetailCourseProps {
    category?: string;
    courseName?: string;
}

export const HeaderDetailCourse = ({ category, courseName }: HeaderDetailCourseProps) => {
    return (
        <>
            <section className="page-header">
                <div className="page-header__bg" style={{ backgroundImage: "url(/assets/images/background/footer-bg-1-1.jpg)" }}></div>
                <div className="container">
                    <ul className="list-unstyled thm-breadcrumb">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href={category ? `/courses?category=${encodeURIComponent(category)}` : '/courses'}>Cursos</Link></li>
                        {category && (
                            <li className="active"><a href="#">{category}</a></li>
                        )}
                    </ul>
                    <h2 className="page-header__title">{courseName || 'Nombre del Curso'}</h2>
                </div>
            </section>
        </>
    )
}
