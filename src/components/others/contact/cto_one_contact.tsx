import React from 'react'

export const CtoOneContact = () => {
    return (
        <>
            <section className="cta-one">
                <div className="container wow fadeInRight" data-wow-duration="1500ms">
                    <div className="cta-one__title">support</div>
                    <div className="inner-container">
                        <div className="row">
                            <div className="col-lg-5 d-flex">
                                <div className="my-auto">
                                    <div className="cta-one__phone">
                                        <i className="fa fa-phone-alt"></i>
                                        <a href="tel:666-888-0000">666 888 0000</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="cta-one__content">
                                    <h3>FOR MORE INFORMATION & CUSTOM <br />
                                        PLANS PLEASE CALL</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
