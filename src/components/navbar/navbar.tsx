'use client';

import {
  Facebook,
  Instagram,
  Twitter,
  Share2,
  Menu as MenuIcon,
} from 'lucide-react';
import { CONTACT_INFO, ROUTES } from '@/utils/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const Navbar = () => {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showTopbar, setShowTopbar] = useState(true);

  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width:1200px)');

  // Comentario: Mostrar topbar solo si scrollY === 0, sin transiciones
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShowTopbar(currentScroll === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const getLinkStyle = (path: string) => {
    let current = pathname || '/';
    if (current !== '/' && current.endsWith('/')) {
      current = current.slice(0, -1);
    }

    const target = path === '/' ? '/' : path.replace(/\/+$/, '');
    const isActive = current === target;

    return {
      color: isActive ? '#87CEEB' : '#444',
    };
  };

  const navLinks = [
    { label: 'Inicio', href: ROUTES.HOME },
    { label: 'Nosotros', href: ROUTES.ABOUT },
    { label: 'Cursos', href: ROUTES.COURSES },
    { label: 'Seguimiento', href: ROUTES.TRACKING },
    { label: 'Contactos', href: ROUTES.CONTACT },
  ];

  const TOPBAR_HEIGHT = 43;
  const APPBAR_HEIGHT = 56;

  if (!isDesktop) {
    return (
      <>
        {showTopbar && (
          <Box
            sx={{
              backgroundColor: '#3b91e1',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              py: 0.5,
              position: 'fixed',
              top: 0,
              width: '100%',
              zIndex: 1300,
              transition: 'none', // Comentario: Transición eliminada
            }}
          >
            <Box display="flex" gap={2}>
              <Link href={ROUTES.LOGIN} style={{ textDecoration: 'none' }}>
                <span style={{ color: '#fff', fontSize: '14px' }}>
                  Inicio de sesión
                </span>
              </Link>
              <Link href={ROUTES.LOCATION} style={{ textDecoration: 'none' }}>
                <span style={{ color: '#fff', fontSize: '14px' }}>
                  Ubicación
                </span>
              </Link>
            </Box>
            <Box display="flex" gap={1}>
              <a href={CONTACT_INFO.SOCIAL_MEDIA.FACEBOOK} target="_blank">
                <Facebook style={{ color: 'white', width: 16, height: 16 }} />
              </a>
              <a href={CONTACT_INFO.SOCIAL_MEDIA.TRIPADVISOR} target="_blank">
                <Twitter style={{ color: 'white', width: 16, height: 16 }} />
              </a>
              <a href={CONTACT_INFO.SOCIAL_MEDIA.FLICKR} target="_blank">
                <Share2 style={{ color: 'white', width: 16, height: 16 }} />
              </a>
              <a href={CONTACT_INFO.SOCIAL_MEDIA.INSTAGRAM} target="_blank">
                <Instagram style={{ color: 'white', width: 16, height: 16 }} />
              </a>
            </Box>
          </Box>
        )}

        <AppBar
          position="fixed"
          color="transparent"
          elevation={0}
          sx={{
            top: showTopbar ? `${TOPBAR_HEIGHT}px` : 0,
            zIndex: 1200,
            backgroundColor: '#fff',
            width: '100%',
            transition: 'none', // Comentario: Transición eliminada
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box display="flex" alignItems="center">
              <Link href={ROUTES.HOME}>
                <img src="/assets/images/logo.png" alt="Logo" width="120" />
              </Link>
            </Box>
            <Box display={{ xs: 'none', sm: 'flex' }} gap={4}>
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  style={{
                    textDecoration: 'none',
                    ...getLinkStyle(href),
                  }}
                >
                  {label}
                </Link>
              ))}
            </Box>
            <Box display={{ xs: 'flex', sm: 'none' }}>
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{ zIndex: 1300 }}
        >
          <Box width={250} role="presentation">
            <List>
              {navLinks.map(({ label, href }) => (
                <ListItem key={label}>
                  <Link
                    onClick={() => setDrawerOpen(false)}
                    href={href}
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      width: '100%',
                      padding: '0.5rem 1rem',
                      ...getLinkStyle(href),
                    }}
                  >
                    {label}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Box
          sx={{
            height: showTopbar
              ? `${TOPBAR_HEIGHT + APPBAR_HEIGHT}px`
              : `${APPBAR_HEIGHT}px`,
          }}
        />
      </>
    );
  }

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
                    style={{
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      ...getLinkStyle(ROUTES.HOME),
                    }}
                  >
                    Inicio
                  </Link>
                </li>
                <li className="dropdown">
                  <Link
                    href={ROUTES.ABOUT}
                    style={{
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      ...getLinkStyle(ROUTES.ABOUT),
                    }}
                  >
                    Nosotros
                  </Link>
                </li>
                <li></li>
                <li className="dropdown">
                  <Link
                    href={ROUTES.COURSES}
                    style={{
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      ...getLinkStyle(ROUTES.COURSES),
                    }}
                  >
                    Cursos
                  </Link>
                </li>

                <li className="dropdown">
                  <Link
                    href={ROUTES.TRACKING}
                    style={{
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      ...getLinkStyle(ROUTES.TRACKING),
                    }}
                  >
                    Seguimiento
                  </Link>
                </li>

                <li className="dropdown">
                  <Link
                    href={ROUTES.CONTACT}
                    style={{
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      ...getLinkStyle(ROUTES.CONTACT),
                    }}
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
