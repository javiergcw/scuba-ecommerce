import React from 'react'
import { CONTACT_INFO } from '@/utils/constants'

export const CtoOneContact = () => {
    return (
        <>
            <section className="cta-one">
                <div className="container wow fadeInRight" data-wow-duration="1500ms">
                    <div className="cta-one__title">soporte</div>
                    <div className="inner-container">
                        <div className="row">
                            <div className="col-lg-5 d-flex">
                                <div className="my-auto">
                                    <div className="cta-one__phone">
                                        <i className="fa fa-phone-alt"></i>
                                        <a href={`tel:${CONTACT_INFO.PHONE.replace(/\s/g, '')}`}>{CONTACT_INFO.PHONE}</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="cta-one__content">
                                    <h3>PARA MÁS INFORMACIÓN Y PLANES <br />
                                        PERSONALIZADOS POR FAVOR LLAMA</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
