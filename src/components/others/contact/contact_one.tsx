'use client'
import React from 'react'
import { CONTACT_INFO } from '@/utils/constants'

export const ContactOne = () => {
    return (
        <>
            <section className="contact-one">
                <img src="assets/images/shapes/fish-contact-1.png" className="contact-one__fish" alt="" />
                <img src="assets/images/shapes/tree-contact-1.png" className="contact-one__tree" alt="" />
                <img src="assets/images/shapes/swimmer-contact-1.png" className="contact-one__swimmer" alt="" />
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="contact-one__content">
                                <h3>Ponte en Contacto <br /> Con Nosotros</h3>
                                <p style={{ marginBottom: '40px' }}>Estamos aquí para ayudarte con cualquier consulta sobre nuestros cursos de buceo, precios, reservas o información general. No dudes en contactarnos a través de WhatsApp o Gmail.</p>
                                <div className="footer-widget__social contact-one__social">
                                    <a href={CONTACT_INFO.SOCIAL_MEDIA.TRIPADVISOR} target="_blank" rel="noopener noreferrer"><i className="fab fa-tripadvisor"></i></a>
                                    <a href={CONTACT_INFO.SOCIAL_MEDIA.FACEBOOK} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-square"></i></a>
                                    <a href={CONTACT_INFO.SOCIAL_MEDIA.FLICKR} target="_blank" rel="noopener noreferrer"><i className="fab fa-flickr"></i></a>
                                    <a href={CONTACT_INFO.SOCIAL_MEDIA.INSTAGRAM} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="contact-one__info">
                                <div className="row" style={{ marginTop: '20px' }}>
                                    <div className="col-md-6">
                                        <div className="contact-one__info-item" style={{
                                            padding: '50px 30px',
                                            textAlign: 'center',
                                            marginBottom: '40px',
                                            height: '320px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            transition: 'all 0.3s ease'
                                        }} onMouseOver={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-5px)';
                                        }} onMouseOut={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}>
                                            <div style={{
                                                fontSize: '60px',
                                                color: '#25D366',
                                                marginBottom: '25px'
                                            }}>
                                                <i className="fab fa-whatsapp"></i>
                                            </div>
                                            <div>
                                                <h4 style={{
                                                    fontSize: '28px',
                                                    fontWeight: 'bold',
                                                    marginBottom: '20px',
                                                    color: 'var(--thm-black)',
                                                    fontFamily: 'var(--thm-font-two)'
                                                }}>WhatsApp</h4>
                                                <p style={{
                                                    fontSize: '20px',
                                                    color: '#838a93',
                                                    marginBottom: '35px',
                                                    fontWeight: '500'
                                                }}>{CONTACT_INFO.PHONE}</p>
                                            </div>
                                            <a 
                                                href={CONTACT_INFO.SOCIAL_MEDIA.WHATSAPP} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="thm-btn"
                                                style={{
                                                    backgroundColor: '#25D366',
                                                    color: 'white',
                                                    padding: '18px 35px',
                                                    fontSize: '16px',
                                                    fontWeight: 'bold',
                                                    textTransform: 'uppercase',
                                                    marginTop: 'auto'
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#128C7E';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#25D366';
                                                }}
                                            >
                                                Chatear Ahora
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="contact-one__info-item" style={{
                                            padding: '50px 30px',
                                            textAlign: 'center',
                                            marginBottom: '40px',
                                            height: '320px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            transition: 'all 0.3s ease'
                                        }} onMouseOver={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-5px)';
                                        }} onMouseOut={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}>
                                            <div style={{
                                                fontSize: '60px',
                                                color: '#EA4335',
                                                marginBottom: '25px'
                                            }}>
                                                <i className="fas fa-envelope"></i>
                                            </div>
                                            <div>
                                                <h4 style={{
                                                    fontSize: '28px',
                                                    fontWeight: 'bold',
                                                    marginBottom: '20px',
                                                    color: 'var(--thm-black)',
                                                    fontFamily: 'var(--thm-font-two)'
                                                }}>Gmail</h4>
                                                <p style={{
                                                    fontSize: '18px',
                                                    color: '#838a93',
                                                    marginBottom: '35px',
                                                    wordBreak: 'break-word',
                                                    fontWeight: '500',
                                                    lineHeight: '1.4'
                                                }}>{CONTACT_INFO.EMAIL}</p>
                                            </div>
                                            <a 
                                                href={`mailto:${CONTACT_INFO.EMAIL}`}
                                                className="thm-btn"
                                                style={{
                                                    backgroundColor: '#EA4335',
                                                    color: 'white',
                                                    padding: '18px 35px',
                                                    fontSize: '16px',
                                                    fontWeight: 'bold',
                                                    textTransform: 'uppercase',
                                                    marginTop: 'auto'
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#D32F2F';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#EA4335';
                                                }}
                                            >
                                                Enviar Email
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
