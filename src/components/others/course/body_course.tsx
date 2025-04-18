import React from 'react'
import Link from 'next/link'

interface Course {
    id: number;
    level: string;
    image: string;
    title: string;
    description: string;
    link: string;
}

interface BodyCourseProps {
    courses: Course[];
}

export const BodyCourse = ({ courses }: BodyCourseProps) => {
    return (
        <>
            <section className="course-one">
                <div className="container">
                    <div className="row">
                        {courses.map((course) => (
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
                                    <Link href={course.link} className="course-one__book-link" style={{ width: '100%', display: 'block' }}>Book this course</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className="post-pagination">
                        <a href="#" className="post-pagination__prev"><i className="fa fa-angle-left"></i></a>
                        <a href="#" className="active">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#" className="post-pagination__next"><i className="fa fa-angle-right"></i></a>
                    </div> */}
                </div>
            </section>
        </>
    )
}
