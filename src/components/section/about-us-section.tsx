import React from 'react'

interface FeatureCard {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    linkText: string;
    delay: string;
}

export const AboutUsSection = () => {
    const features: FeatureCard[] = [
        {
            id: 1,
            title: "Entrenamiento",
            description: "Contamos con experiencias únicas de buceo y cursos para todos los niveles, desde principiantes hasta profesionales.",
            image: "/assets/images/background/banner6.jpeg",
            link: "/courses",
            linkText: "Ver cursos",
            delay: "000ms"
        },
        {
            id: 2,
            title: "Nuestros beneficios",
            description: "Formación certificada, equipo de alta calidad y un equipo humano comprometido con tu seguridad y diversión.",
            image: "/assets/images/background/banner5.jpeg",
            link: "/payments",
            linkText: "Ver beneficios",
            delay: "100ms"
        },
        {
            id: 3,
            title: "Soporte 24/7",
            description: "Te acompañamos en cada paso del proceso, con atención personalizada antes, durante y después de tu experiencia.",
            image: "/assets/images/background/banner7.jpg",
            link: "https://api.whatsapp.com/send/?phone=573165341834&text=Hola%2C+%C2%BFme+puedes+contar+m%C3%A1s+sobre+las+inmersiones+que+ofrece+Scuba%3F+%EF%BF%BD%EF%BF%BD&type=phone_number&app_absent=0",
            linkText: "Contáctanos",
            delay: "200ms"
        },
        {
            id: 4,
            title: "Entrenamiento",
            description: "Contamos con experiencias únicas de buceo y cursos para todos los niveles, desde principiantes hasta profesionales.",
            image: "/assets/images/background/banner6.jpeg",
            link: "/courses",
            linkText: "Ver cursos",
            delay: "000ms"
        },
        {
            id: 5,
            title: "Nuestros beneficios",
            description: "Formación certificada, equipo de alta calidad y un equipo humano comprometido con tu seguridad y diversión.",
            image: "/assets/images/background/banner5.jpeg",
            link: "/payments",
            linkText: "Ver beneficios",
            delay: "100ms"
        },
        {
            id: 6,
            title: "Soporte 24/7",
            description: "Te acompañamos en cada paso del proceso, con atención personalizada antes, durante y después de tu experiencia.",
            image: "/assets/images/background/banner7.jpg",
            link: "https://api.whatsapp.com/send/?phone=573165341834&text=Hola%2C+%C2%BFme+puedes+contar+m%C3%A1s+sobre+las+inmersiones+que+ofrece+Scuba%3F+%EF%BF%BD%EF%BF%BD&type=phone_number&app_absent=0",
            linkText: "Contáctanos",
            delay: "200ms"
        },

        
        
    ];

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
                    {features.map((feature) => (
                        <div
                        
                        
                             key={feature.id} 
                             className="col-lg-4 wow fadeInUp" 
                             data-wow-duration="1500ms" 
                             data-wow-delay={feature.delay}
                             style={{ marginBottom: '50px' }}
                            
                         >
                             <div className="feature-two__single" >
                                <div className="feature-two__image">
                                    <img src={feature.image} alt={feature.title}/>
                                </div>
                                <div className="feature-two__content">
                                    <h3>
                                        {feature.link.includes('whatsapp') || feature.link.includes('http') ? (
                                            <a href={feature.link} target="_blank" rel="noopener noreferrer">
                                                {feature.title}
                                            </a>
                                        ) : (
                                            <a href={feature.link}>
                                                {feature.title}
                                            </a>
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
