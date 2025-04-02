'use client'

const Navbar = () => {


    return (
        <nav >
            <div className="topbar-one">
                <div className="container">
                    <div className="topbar-one__left">
                        <a href="#">Inició de sesión</a>
                        <a href="#">Ubicación</a>
                    </div>
                    <div className="topbar-one__social">
                        <a href="#"><i className="fab fa-facebook-square"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-pinterest-p"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>

            <nav className="main-nav-one stricky">
                <div className="container">
                    <div className="main-nav-one__infos">
                        <a className="main-nav-one__infos-phone" href="tel:666-888-0000"><i className="fa fa-phone-alt"></i>666 888 0000</a>
                        <a className="main-nav-one__infos-email" href="mailto:needhelp@example.com"><i className="fa fa-envelope"></i>needhelp@example.com</a>
                    </div>
                    <div className="inner-container">
                        <div className="logo-box">
                            <a href="index.html">

                            </a>
                            <a href="#" className="side-menu__toggler"><i className="fa fa-bars"></i></a>
                        </div>
                        <div className="main-nav__main-navigation">
                            <ul className="main-nav__navigation-box">

                                <li className="dropdown">
                                    <a href="index.html">Home</a>
                                </li>

                                <li className="dropdown">
                                    <a href="about.html">About</a>
                                </li>
                                <li></li>
                                <li className="dropdown">
                                    <a href="courses.html">Courses</a>
                                </li >
                                <li className="dropdown">
                                    <a href="contact.html">Contact</a>
                                </li>
                          
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

        </nav>
    );
};

export default Navbar;
