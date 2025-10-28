import React from 'react'

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
                        <li><a href="index.html">Home</a></li>
                        <li><a href="courses.html">Ya soy buzo</a></li>
                        <li className="active"><a href="#">{category || 'Categoría'}</a></li>
                    </ul>
                    <h2 className="page-header__title">{courseName || 'Nombre del Curso'}</h2>
                </div>
            </section>
        </>
    )
}
