import React from 'react'
import { CONTACT_INFO } from '@/utils/constants'

export const CtoOneContact = () => {
    return (
        <>
            <section className="cta-one">
                <div className="container wow fadeInRight" data-wow-duration="1500ms">
                    <div className="cta-one__title">¡Aventura Submarina!</div>
                    <div className="inner-container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="cta-one__content text-center">
                                    <h3>¿LISTO PARA EXPLORAR EL OCÉANO? <br />
                                        CONTÁCTANOS HOY MISMO</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
