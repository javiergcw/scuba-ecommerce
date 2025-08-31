import React from 'react'

export const HeaderCourse = () => {
    return (
        <>
            <section className="page-header">
                <div className="page-header__bg" style={{ backgroundImage: "url(/assets/images/background/footer-bg-1-1.jpg)" }}></div>
                <div className="container">
                    <ul className="list-unstyled thm-breadcrumb">
                        <li><a href="index.html">Home</a></li>
                        <li className="active"><a href="#">Mundo del Buceo</a></li>
                    </ul>
                    <h2 className="page-header__title">Mundo del Buceo</h2>
                </div>
            </section>
        </>
    )
}
