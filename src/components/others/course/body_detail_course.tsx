import React from 'react'

interface CourseDetailProps {
    image: string;
    price: number;
    numberOfDives: number;
    courseDuration: number;
    title: string;
    description: string;
    tips: string;
    additionalInfo: string;
}

const BodyDetailCourse = ({
    image,
    price,
    numberOfDives,
    courseDuration,
    title,
    description,
    tips,
    additionalInfo
}: CourseDetailProps) => {
    return (
        <div>
            <section className="course-details">
                <div className="container">
                    <div className="course-details__image">
                        <img src={image} alt={title} />

                        <div className="course-details__infos wow fadeInRight" data-wow-duration="1500ms">
                            <div className="course-details__infos-title">Detail</div>
                            <div className="course-details__infos-single">
                                <span>${price}</span>
                                <p>Dive <br />price</p>
                            </div>
                            <div className="course-details__infos-single">
                                <span>{numberOfDives}</span>
                                <p>Dives <br />
                                    only</p>
                            </div>
                            <div className="course-details__infos-single">
                                <span>{courseDuration}</span>
                                <p>day <br /> course</p>
                            </div>
                        </div>
                    </div>
                    <div className="course-details__content">
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <h4>Diving Tips</h4>
                        <p>{tips}</p>
                        <p>{additionalInfo}</p>

                        <a href="contact.html" className="thm-btn course-details__btn">Contact for more details</a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BodyDetailCourse