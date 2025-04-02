'use client'
import React, { useState } from 'react'

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
                                <h3>Get in Touch <br /> With Us</h3>
                                <p>Aliq is notm hendr erit a augue insu image pellen tes que id erat quis sollicitud. Lorem
                                    ipsum is
                                    simply free text dolor sit amet, consectetur adipiscing ullam blandit hendrerit faucibus
                                    suspendisse.</p>
                                <div className="footer-widget__social contact-one__social">
                                    <a href="#"><i className="fab fa-twitter"></i></a>
                                    <a href="#"><i className="fab fa-facebook-square"></i></a>
                                    <a href="#"><i className="fab fa-pinterest-p"></i></a>
                                    <a href="#"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <form action="assets/inc/sendemail.php" className="contact-one__form contact-form-validated">
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Full Name" name="name"/>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Email Address" name="email"/>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Phone number" name="phone"/>
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
                                            <option value="">Discussion For</option>
                                            <option value="About Course">Query For Courses</option>
                                            <option value="About Pricing">Query For Pricing</option>
                                        </select>
                                    </div>
                                    <div className="col-md-12">
                                        <input type="text" placeholder="Subject" name="subject"/>
                                    </div>
                                    <div className="col-md-12">
                                        <textarea name="message" placeholder="Messages"/>
                                    </div>
                                    <div className="col-md-12">
                                        <button type="submit" className="thm-btn contact-one__btn">Send message</button>
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
