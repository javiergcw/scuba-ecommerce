import React from 'react'

const TopbarContact = () => {
    return (
        <>
            <section className="page-header">
                <div className="page-header__bg" style={{ backgroundImage: 'url(assets/images/background/footer-bg-1-1.jpg)' }}></div>
                <div className="container">
                    <ul className="list-unstyled thm-breadcrumb">
                        <li><a href="index.html">Home</a></li>
                        <li className="active"><a href="#">Contact</a></li>
                    </ul>
                    <h2 className="page-header__title">contact us</h2>
                </div>
            </section>
        </>
    )
}

export default TopbarContact