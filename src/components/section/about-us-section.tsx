import React from 'react'

export const AboutUsSection = () => { 
    return <> <section className="page-header">
    <div className="page-header__bg" style={{ backgroundImage: 'url(/assets/images/background/footer-bg-1-1.jpg)' }}></div>
    
    <div className="container">
        <ul className="list-unstyled thm-breadcrumb">
            <li><a href="index.html">Inicio</a></li>
            <li className="active"><a href="#">Acerca de</a></li>
        </ul>
        <h2 className="page-header__title">Sobre nosotros</h2>
    </div>
</section>

<section className="feature-two">
    <div className="container">
        <div className="row">
            <div className="col-lg-4 wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="000ms">
                <div className="feature-two__single">
                    <div className="feature-two__image">
                        <img src="/assets/images/background/banner6.jpeg" alt=""/>
                    </div>
                    <div className="feature-two__content">
                        <h3><a href="/courses">Que ofrecemos</a></h3>
                        <p>Contamos con experiencias únicas de buceo y cursos para todos los niveles, desde principiantes hasta profesionales.</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="100ms">
                <div className="feature-two__single">
                    <div className="feature-two__image">
                        <img src="/assets/images/background/banner5.jpeg" alt=""/>
                    </div>
                    <div className="feature-two__content">
                        <h3><a href="/payments">Nuestros beneficios</a></h3>
                        <p>Formación certificada, equipo de alta calidad y un equipo humano comprometido con tu seguridad y diversión.</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="200ms">
                <div className="feature-two__single">
                    <div className="feature-two__image">
                        <img src="/assets/images/background/banner7.jpg" alt=""/>
                    </div>
                    <div className="feature-two__content">
                        <h3><a href="https://api.whatsapp.com/send/?phone=573165341834&text=Hola%2C+%C2%BFme+puedes+contar+m%C3%A1s+sobre+las+inmersiones+que+ofrece+Scuba%3F+%EF%BF%BD%EF%BF%BD&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">Soporte 24/7 </a></h3>
                        <p>Te acompañamos en cada paso del proceso, con atención personalizada antes, durante y después de tu experiencia.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

    </>;

}
