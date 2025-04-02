'use client'
import Image from 'next/image';
import React from 'react';


const Footer = () => {
  return (
    <footer className="site-footer-one">

<div className="site-footer-one__bg" style={{backgroundImage: "url(/assets/images/background/footer-bg-1-1.jpg)"}}></div>



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
                    <p>&copy; Copyright 2020 by <br/>
                        Scubo Template</p>
                </div>
            </div>
            <div className="footer-widget footer-widget__links__widget-1">
                <div className="footer-widget__inner">
                    <h3 className="footer-widget__title">Company</h3>
                    <ul className="footer-widget__links-list list-unstyled">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Our History</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-widget footer-widget__links__widget-2">
                <div className="footer-widget__inner">
                    <h3 className="footer-widget__title">Explore</h3>
                    <ul className="footer-widget__links-list list-unstyled">
                        <li><a href="#">Popular Courses</a></li>
                        <li><a href="#">How It Works</a></li>
                        <li><a href="#">Help Center</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-widget footer-widget__links__widget-3">
                <div className="footer-widget__inner">
                    <h3 className="footer-widget__title">Links</h3>
                    <ul className="footer-widget__links-list list-unstyled">
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-widget footer-widget__social__widget">
                <div className="footer-widget__inner">
                    <h3 className="footer-widget__title">Follow</h3>
                    <div className="footer-widget__social">
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-facebook-square"></i></a>
                        <a href="#"><i className="fab fa-pinterest-p"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div className="site-footer__bottom">
    <div className="container">
        <div className="row">
            <div className="col-lg-4">
                <a href="tel:666-888-0000"><i className="fa fa-phone-alt"></i>666 888 0000</a>
            </div>
            <div className="col-lg-4">
                <a href="mailto:needhelp@example.com"><i className="fa fa-envelope"></i>needhelp@example.com</a>
            </div>
            <div className="col-lg-4">
                <a href="contact.html"><i className="fa fa-map"></i>22 Broklyn Street, USA</a>
            </div>
        </div>
    </div>
</div>
</footer>

  );
};

export default Footer;
