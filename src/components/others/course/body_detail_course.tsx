import React from 'react'
import { ProductFeatures } from 'monolite-saas';

interface CourseDetailProps {
    image: string;
    price: number;
    numberOfDives: number;
    courseDuration: number;
    title: string;
    description: string;
    tips: string;
    additionalInfo: string;
    features?: ProductFeatures;
}

const BodyDetailCourse = ({
    image,
    price,
    numberOfDives,
    courseDuration,
    title,
    description,
    tips,
    additionalInfo,
    features
}: CourseDetailProps) => {
    return (
        <div>
            <section className="course-details">
                <div className="container">
                    <div className="course-details__image" style={{ 
                        position: 'relative',
                        width: '100%',
                        height: '500px'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden'
                        }}>
                            <img 
                                src={image} 
                                alt={title} 
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }}
                            />
                        </div>

                        <div className="course-details__infos wow fadeInRight" data-wow-duration="1500ms" style={{
                            position: 'absolute',
                            zIndex: 1
                        }}>
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
                        <br/>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <h4>Características del Curso</h4>
                        <ul style={{ listStyleType: 'decimal', paddingLeft: '30px' }}>
                            {features && Object.entries(features).map(([key, value]) => (
                                <li key={key} style={{ marginBottom: '10px' }}>{value}</li>
                            ))}
                        </ul>

                        <a href="/contact" className="thm-btn course-details__btn">Contact for more details</a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default BodyDetailCourse