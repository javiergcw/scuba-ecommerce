'use client'
import Image from 'next/image';
import React from 'react';
import { CONTACT_INFO } from '@/utils/constants';

const Footer = () => {
    return (
        <footer className="site-footer-one">
            <div className="site-footer-one__bg" style={{ backgroundImage: "url(/assets/images/background/footer-bg-1-1.jpg)" }}></div>

            <Image src="/assets/images/shapes/fish-f-1.png" alt="" className="site-footer__fish-1" width={100} height={100} />
            <Image src="/assets/images/shapes/fish-f-2.png" alt="" className="site-footer__fish-2" width={100} height={100} />
            <Image src="/assets/images/shapes/fish-f-3.png" alt="" className="site-footer__fish-3" width={100} height={100} />

            <Image src="/assets/images/shapes/tree-f-1.png" className="site-footer__tree-1" alt="" width={100} height={100} />
            <Image src="/assets/images/shapes/tree-f-2.png" className="site-footer__tree-2" alt="" width={100} height={100} />

            <div className="site-footer-one__upper">
                <div className="container">
                    <div className="footer-widget-row">
                        <div className="footer-widget footer-widget__about">
                            <div className="footer-widget__inner">
                                <a href="index.html">
                                    <Image src="/assets/images/logo-2-1.png" alt="" width={143} height={143} />
                                </a>
                                <p>&copy; Copyright 2024 por <br />Oceano Scuba</p>
                            </div>
                        </div>
                        <div className="footer-widget footer-widget__links__widget-1">
                            <div className="footer-widget__inner">
                                <h3 className="footer-widget__title">Compañía</h3>
                                <ul className="footer-widget__links-list list-unstyled">
                                    <li><a href="#">Sobre Nosotros</a></li>
                                    <li><a href="#">Nuestra Historia</a></li>
                                    <li><a href="#">Contacto</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-widget footer-widget__links__widget-2">
                            <div className="footer-widget__inner">
                                <h3 className="footer-widget__title">Explora</h3>
                                <ul className="footer-widget__links-list list-unstyled">
                                    <li><a href="#">Cursos Populares</a></li>
                                    <li><a href="#">Cómo Funciona</a></li>
                                    <li><a href="#">Centro de Ayuda</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-widget footer-widget__links__widget-3">
                            <div className="footer-widget__inner">
                                <h3 className="footer-widget__title">Enlaces</h3>
                                <ul className="footer-widget__links-list list-unstyled">
                                    <li><a href="#">Política de Privacidad</a></li>
                                    <li><a href="#">Términos y Condiciones</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-widget footer-widget__social__widget">
                            <div className="footer-widget__inner">
                                <h3 className="footer-widget__title">Síguenos</h3>
                                <div className="footer-widget__social">
                                    <a href={CONTACT_INFO.SOCIAL_MEDIA.FACEBOOK}><i className="fab fa-facebook-square"></i></a>
                                    <a href={CONTACT_INFO.SOCIAL_MEDIA.INSTAGRAM}><i className="fab fa-instagram"></i></a>
                                    <a href={CONTACT_INFO.SOCIAL_MEDIA.TRIPADVISOR}><i className="fab fa-tripadvisor"></i></a>
                                    <a href={CONTACT_INFO.SOCIAL_MEDIA.WHATSAPP}><i className="fab fa-whatsapp"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-footer__bottom">
                <div className="container">
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        <a href={`tel:${CONTACT_INFO.PHONE.replace(/\s+/g, '')}`}>
                            <i className="fa fa-phone-alt"></i>
                            {CONTACT_INFO.PHONE}
                        </a>
                        <a href={`mailto:${CONTACT_INFO.EMAIL}`}>
                            <i className="fa fa-envelope"></i>
                            {CONTACT_INFO.EMAIL}
                        </a>
                        <a href={CONTACT_INFO.GOOGLE_MAPS}>
                            <i className="fa fa-map"></i>
                            {CONTACT_INFO.LOCATION.ADDRESS}
                        </a>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
