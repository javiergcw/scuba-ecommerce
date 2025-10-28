import React from 'react'

interface FeatureCard {
    id: number;
    image: string;
    title: string;
    link: string;
    description: string;
    delay: string;
    isExternal?: boolean;
}

const featuresData: FeatureCard[] = [
    {
        id: 1,
        image: "/assets/images/background/banner6.jpeg",
        title: "Ya soy buzo",
        link: "/courses",
        description: "Contamos con experiencias únicas de buceo y cursos para todos los niveles, desde principiantes hasta profesionales.",
        delay: "000ms"
    },
    {
        id: 2,
        image: "/assets/images/background/banner5.jpeg",
        title: "Nuestros beneficios",
        link: "/payments",
        description: "Formación certificada, equipo de alta calidad y un equipo humano comprometido con tu seguridad y diversión.",
        delay: "100ms"
    },
    {
        id: 3,
        image: "/assets/images/background/banner7.jpg",
        title: "Soporte 24/7",
        link: "https://api.whatsapp.com/send/?phone=573165341834&text=Hola%2C+%C2%BFme+puedes+contar+m%C3%A1s+sobre+las+inmersiones+que+ofrece+Scuba%3F+%EF%BF%BD%EF%BF%BD&type=phone_number&app_absent=0",
        description: "Te acompañamos en cada paso del proceso, con atención personalizada antes, durante y después de tu experiencia.",
        delay: "200ms",
        isExternal: true
    },
    {
        id: 4,
        image: "/assets/images/background/slide-bg-1-1.jpg",
        title: "Experiencia y Confianza",
        link: "/about-us",
        description: "Experiencia en el Parque Tayrona, certificación PADI 5 Estrellas y miles de estudiantes satisfechos.",
        delay: "300ms"
    },
    {
        id: 5,
        image: "/assets/images/background/banner9.jpg",
        title: "Instalaciones y Equipo",
        link: "/contact",
        description: "Contamos con equipos de última generación, embarcaciones modernas y un centro de buceo totalmente equipado para tu seguridad.",
        delay: "400ms"
    },
    {
        id: 6,
        image: "/assets/images/background/banner10.jpg",
        title: "Ubicación Privilegiada",
        link: "/contact",
        description: "Estamos ubicados en Taganga, puerta de entrada al Parque Nacional Natural Tayrona, con acceso directo a los mejores sitios de buceo del Caribe.",
        delay: "500ms"
    }
];

export const AboutUsSection = () => {
    return <>
        <section className="page-header">
            <div className="page-header__bg" style={{ backgroundImage: 'url(/assets/images/background/footer-bg-1-1.jpg)' }}></div>

            <div className="container">
                <ul className="list-unstyled thm-breadcrumb">
                    <li><a href="index.html">Inicio</a></li>
                    <li className="active"><a href="#">Acerca de</a></li>
                </ul>
                <h2 className="page-header__title">¿Por qué nosotros?</h2>
            </div>
        </section>

        <section className="feature-two">
            <div className="container">
                <div className="row">
                    {featuresData.map((feature) => (
                        <div
                            key={feature.id}
                            className="col-lg-4 wow fadeInUp"
                            data-wow-duration="1500ms"
                            data-wow-delay={feature.delay}
                            style={{ marginBottom: '40px' }}
                        >
                            <div className="feature-two__single">
                                <div className="feature-two__image">
                                    <img src={feature.image} alt={feature.title} />
                                </div>
                                <div className="feature-two__content">
                                    <h3>
                                        {feature.isExternal ? (
                                            <a href={feature.link} target="_blank" rel="noopener noreferrer">
                                                {feature.title}
                                            </a>
                                        ) : (
                                            <a href={feature.link}>{feature.title}</a>
                                        )}
                                    </h3>
                                    <p>{feature.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </>;
}
