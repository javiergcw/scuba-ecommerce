"use client";

import { Facebook, Instagram, Twitter, Share2 } from "lucide-react";
import { CONTACT_INFO, ROUTES } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === ROUTES.HOME) {
      return pathname === path ? "text-blue-500 font-bold" : "";
    }
    return pathname.startsWith(path) ? "text-blue-500 font-bold" : "";
  };

  return (
    <nav>
      <div className="topbar-one">
        <div className="container">
          <div className="topbar-one__left">
            <Link href={ROUTES.LOGIN}>Inició de sesión</Link>
            <Link href={ROUTES.LOCATION}>Ubicación</Link>
          </div>
          <div className="topbar-one__social">
            <a
              href={CONTACT_INFO.SOCIAL_MEDIA.FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href={CONTACT_INFO.SOCIAL_MEDIA.TRIPADVISOR}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href={CONTACT_INFO.SOCIAL_MEDIA.FLICKR}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Share2 className="w-5 h-5" />
            </a>
            <a
              href={CONTACT_INFO.SOCIAL_MEDIA.INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <nav className="main-nav-one stricky">
        <div className="container">
          <div className="main-nav-one__infos">
            <a
              className="main-nav-one__infos-phone"
              href={`tel:${CONTACT_INFO.PHONE}`}
            >
              <i className="fa fa-phone-alt"></i>
              {CONTACT_INFO.PHONE}
            </a>
            <a
              className="main-nav-one__infos-email"
              href={`mailto:${CONTACT_INFO.EMAIL}`}
            >
              <i className="fa fa-envelope"></i>
              {CONTACT_INFO.EMAIL}
            </a>
          </div>
          <div className="inner-container">
            <div className="logo-box flex justify-center items-center">
              <Link href={ROUTES.HOME} className="flex justify-center">
                <img src="/assets/images/logo.png" alt="" width="143" />
              </Link>
              <a href="/" className="side-menu__toggler">
                <i className="fa fa-bars"></i>
              </a>
            </div>

            <div className="main-nav__main-navigation">
              <ul className="main-nav__navigation-box">
                <li className="dropdown">
                  <Link
                    href={ROUTES.HOME}
                    className={`transition-colors duration-200 hover:text-blue-500 ${isActive(
                      ROUTES.HOME
                    )}`}
                  >
                    Inicio
                  </Link>
                </li>
                <li className="dropdown">
                  <Link
                    href={ROUTES.ABOUT}
                    className={`transition-colors duration-200 hover:text-blue-500 ${isActive(
                      ROUTES.ABOUT
                    )}`}
                  >
                    Nosotros
                  </Link>
                </li>
                <li></li>
                <li className="dropdown">
                  <Link
                    href={ROUTES.COURSES}
                    className={`transition-colors duration-200 hover:text-blue-500 ${isActive(
                      ROUTES.COURSES
                    )}`}
                  >
                    Cursos
                  </Link>
                </li>

                <li className="dropdown">
                  <Link
                    href={ROUTES.CONTACT}
                    className={`transition-colors duration-200 hover:text-blue-500 ${isActive(
                      ROUTES.CONTACT
                    )}`}
                  >
                    Contactos
                  </Link>
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
