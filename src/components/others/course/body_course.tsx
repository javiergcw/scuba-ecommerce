import React from 'react'

interface Course {
    id: number;
    level: string;
    image: string;
    title: string;
    description: string;
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
                                <div className="course-one__single">
                                    <div className="course-one__image">
                                        <a href="course-details.html" className="course-one__cat">{course.level}</a>
                                        <div className="course-one__image-inner">
                                            <img src={course.image} alt={course.title} />
                                            <a href="course-details.html"><i className="scubo-icon-plus-symbol"></i></a>
                                        </div>
                                    </div>
                                    <div className="course-one__content hvr-sweep-to-bottom">
                                        <h3><a href="course-details.html">{course.title}</a></h3>
                                        <p>{course.description}</p>
                                    </div>
                                    <a href="contact.html" className="course-one__book-link">Book this course</a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="post-pagination">
                        <a href="#" className="post-pagination__prev"><i className="fa fa-angle-left"></i></a>
                        <a href="#" className="active">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#" className="post-pagination__next"><i className="fa fa-angle-right"></i></a>
                    </div>
                </div>
            </section>
        </>
    )
}
