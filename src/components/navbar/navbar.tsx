'use client';

import {
  Facebook,
  Instagram,
  Twitter,
  Share2,
  Menu as MenuIcon,
  ChevronDown,
} from 'lucide-react';
import { CONTACT_INFO, ROUTES } from '@/utils/constants';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import { services, Product } from 'monolite-saas';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showTopbar, setShowTopbar] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width:1200px)');

  // Obtener categorías únicas de los productos
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const products = await services.products.getProducts();
        const uniqueCategories = [...new Set(products.map(product => product.category_name).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };
    fetchCategories();
  }, []);

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

  const handleCategoryClick = (category: string) => {
    setAnchorEl(null);
    router.push(`${ROUTES.COURSES}?category=${encodeURIComponent(category)}`);
  };

  const navLinks = [
    { label: 'Inicio', href: ROUTES.HOME },
    { label: 'Nosotros', href: ROUTES.ABOUT },
    { label: 'Contactos', href: ROUTES.CONTACT },
  ];

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              <Button
                onClick={(e) => setAnchorEl(e.currentTarget)}
                endIcon={<ChevronDown />}
                sx={{
                  textTransform: 'none',
                  color: '#444',
                  '&:hover': { color: '#87CEEB' },
                }}
              >
                Mundo del Buceo
              </Button>
            </Box>
            <Box display={{ xs: 'flex', sm: 'none' }}>
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          sx={{ zIndex: 1300 }}
        >
          <MenuItem onClick={() => handleCategoryClick('')}>
            Todos los cursos
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} onClick={() => handleCategoryClick(category)}>
              {category}
            </MenuItem>
          ))}
        </Menu>

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
              <ListItem>
                <div style={{ width: '100%', padding: '0.5rem 1rem' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Mundo del Buceo</div>
                  <Link
                    onClick={() => setDrawerOpen(false)}
                    href={ROUTES.COURSES}
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      padding: '0.25rem 0',
                      color: '#444',
                    }}
                  >
                    Todos los cursos
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      onClick={() => setDrawerOpen(false)}
                      href={`${ROUTES.COURSES}?category=${encodeURIComponent(category)}`}
                      style={{
                        textDecoration: 'none',
                        display: 'block',
                        padding: '0.25rem 0',
                        color: '#444',
                      }}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </ListItem>
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
                <li className="dropdown" 
                    style={{ position: 'relative' }}>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(!dropdownOpen);
                    }}
                    style={{
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      ...getLinkStyle(ROUTES.COURSES),
                      cursor: 'pointer',
                    }}
                  >
                    Mundo del Buceo
                  </Link>
                  {dropdownOpen && (
                    <ul style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      backgroundColor: '#fff',
                      minWidth: '200px',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      borderRadius: '4px',
                      zIndex: 1000,
                      padding: '8px 0',
                      marginTop: '5px',
                      listStyle: 'none',
                    }}>
                      <li>
                        <Link 
                          href={ROUTES.COURSES}
                          onClick={() => setDropdownOpen(false)}
                          style={{
                            display: 'block',
                            padding: '8px 16px',
                            textDecoration: 'none',
                            color: '#444',
                            transition: 'background-color 0.3s ease',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          Todos los cursos
                        </Link>
                      </li>
                      {categories.map((category) => (
                        <li key={category}>
                          <Link 
                            href={`${ROUTES.COURSES}?category=${encodeURIComponent(category)}`}
                            onClick={() => setDropdownOpen(false)}
                            style={{
                              display: 'block',
                              padding: '8px 16px',
                              textDecoration: 'none',
                              color: '#444',
                              transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            {category}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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
