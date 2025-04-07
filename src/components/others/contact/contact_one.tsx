'use client'
import React, { useState } from 'react'
import { CONTACT_INFO } from '@/utils/constants'

export const ContactOne = () => {
    const [selectedService, setSelectedService] = useState('')

    const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedService(event.target.value)
    }

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
                                <p>Aliq no es simplemente un texto de relleno. Lorem ipsum es simplemente un texto libre que se utiliza para rellenar espacios en el diseño, permitiendo que el contenido real se destaque. Consectetur adipiscing elit, blandit hendrerit faucibus suspendisse.</p>
                                <div className="footer-widget__social contact-one__social">
                                    <a href={CONTACT_INFO.SOCIAL_MEDIA.TRIPADVISOR} target="_blank" rel="noopener noreferrer"><i className="fab fa-tripadvisor"></i></a>
                                    <a href={CONTACT_INFO.SOCIAL_MEDIA.FACEBOOK} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-square"></i></a>
                                    <a href={CONTACT_INFO.SOCIAL_MEDIA.FLICKR} target="_blank" rel="noopener noreferrer"><i className="fab fa-flickr"></i></a>
                                    <a href={CONTACT_INFO.SOCIAL_MEDIA.INSTAGRAM} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <form action="assets/inc/sendemail.php" className="contact-one__form contact-form-validated">
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Nombre Completo" name="name"/>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Correo Electrónico" name="email"/>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Número de Teléfono" name="phone"/>
                                    </div>
                                    <div className="col-md-6">
                                        <select 
                                            name="service"
                                            value={selectedService}
                                            onChange={handleServiceChange}
                                            style={{
                                                display: 'block',
                                                width: '100%',
                                                height: '85px',
                                                backgroundColor: '#EDF2F5',
                                                border: 'none',
                                                outline: 'none',
                                                padding: '0 30px',
                                                fontSize: '16px',
                                                fontWeight: 500,
                                                color: '#848484',
                                                position: 'relative',
                                                marginBottom: '20px'
                                            }}
                                        >
                                            <option value="">Motivo de la Consulta</option>
                                            <option value="About Course">Consulta sobre Cursos</option>
                                            <option value="About Pricing">Consulta sobre Precios</option>
                                        </select>
                                    </div>
                                    <div className="col-md-12">
                                        <input type="text" placeholder="Asunto" name="subject"/>
                                    </div>
                                    <div className="col-md-12">
                                        <textarea name="message" placeholder="Mensaje"/>
                                    </div>
                                    <div className="col-md-12">
                                        <button type="submit" className="thm-btn contact-one__btn">Enviar mensaje</button>
                                    </div>
                                </div>
                            </form>
                            <div className="result"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
