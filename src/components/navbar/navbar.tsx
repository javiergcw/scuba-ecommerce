'use client';

import {
  Facebook,
  Instagram,
  Share2,
  Menu as MenuIcon,
  ChevronDown,
} from 'lucide-react';
import { CONTACT_INFO, ROUTES } from '@/utils/constants';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
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
import { services } from 'monolite-saas';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showTopbar, setShowTopbar] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [anchorElEntrenamiento, setAnchorElEntrenamiento] = useState<null | HTMLElement>(null);
  const [anchorElYaSoyBuzo, setAnchorElYaSoyBuzo] = useState<null | HTMLElement>(null);
  const [dropdownOpenYaSoyBuzo, setDropdownOpenYaSoyBuzo] = useState(false);
  const [dropdownOpenEntrenamiento, setDropdownOpenEntrenamiento] = useState(false);
  
  // Refs para los dropdowns
  const entrenamientoRef = useRef<HTMLLIElement>(null);
  const yaSoyBuzoRef = useRef<HTMLLIElement>(null);

  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width:1200px)');

  // Definir categorías y subcategorías para "Ya soy buzo"
  const yaSoyBuzoCategorias = [
    "¡Formación PADI a otro nivel!",
    "Solo para profesionales"
  ];

  // Definir categorías y subcategorías para "Entrenamiento"
  const entrenamientoCategorias = [
    "¿Aún no eres buzo?",
    "Solo en Oceano Scuba",
    "Snorkeling / Acompañante"
  ];

  // Obtener categorías únicas de los productos
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const products = await services.products.getProducts();
        
        // Combinar todas las subcategorías definidas
        const allSubcategories: string[] = [
          ...yaSoyBuzoCategorias,
          ...entrenamientoCategorias
        ];

        // Verificar qué subcategorías tienen productos
        const productsWithSubcats = products.map(product => 
          product.subcategory_name || product.category_name
        ).filter(Boolean);
        
        // Mantener solo las subcategorías que tienen productos Y están en la estructura definida
        const validCategories = allSubcategories.filter(subcat => 
          productsWithSubcats.includes(subcat as string)
        );
        
        const uniqueCategories = [...new Set(validCategories)];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };
    fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleCategoryClick = (category: string, menuType: 'entrenamiento' | 'yaSoyBuzo') => {
    if (menuType === 'entrenamiento') {
      setAnchorElEntrenamiento(null);
      setDropdownOpenEntrenamiento(false);
      router.push(`${ROUTES.HOME}?category=${encodeURIComponent(category)}`);
    } else {
      setAnchorElYaSoyBuzo(null);
      setDropdownOpenYaSoyBuzo(false);
      router.push(`${ROUTES.COURSES}?category=${encodeURIComponent(category)}`);
    }
  };

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Verificar si el click está fuera del dropdown de Entrenamiento
      if (dropdownOpenEntrenamiento && 
          entrenamientoRef.current && 
          !entrenamientoRef.current.contains(target)) {
        setDropdownOpenEntrenamiento(false);
      }
      
      // Verificar si el click está fuera del dropdown de Ya soy buzo
      if (dropdownOpenYaSoyBuzo && 
          yaSoyBuzoRef.current && 
          !yaSoyBuzoRef.current.contains(target)) {
        setDropdownOpenYaSoyBuzo(false);
      }
    };

    // Solo agregar el listener si algún dropdown está abierto
    if (dropdownOpenEntrenamiento || dropdownOpenYaSoyBuzo) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpenEntrenamiento, dropdownOpenYaSoyBuzo]);

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
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Link
                  href={ROUTES.ABOUT}
                  style={{
                    textDecoration: 'none',
                    ...getLinkStyle(ROUTES.ABOUT),
                  }}
                >
                  ¿Por qué nosotros?
                </Link>
              </Box>
              <Button
                onClick={(e) => setAnchorElEntrenamiento(e.currentTarget)}
                endIcon={<ChevronDown />}
                className="nav-link-entrenamiento-mobile"
                size="small"
                sx={{
                  textTransform: 'none',
                  color: '#444',
                  fontSize: { xs: '11px', sm: '14px' },
                  '&:hover': { color: '#87CEEB' },
                }}
              >
                Entrenamiento
              </Button>
              <Button
                onClick={(e) => setAnchorElYaSoyBuzo(e.currentTarget)}
                endIcon={<ChevronDown />}
                className="nav-link-ya-soy-buzo-mobile"
                size="small"
                sx={{
                  textTransform: 'none',
                  color: '#444',
                  fontSize: { xs: '11px', sm: '14px' },
                  '&:hover': { color: '#87CEEB' },
                }}
              >
                Ya soy buzo
              </Button>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Link
                  href={ROUTES.CONTACT}
                  style={{
                    textDecoration: 'none',
                    ...getLinkStyle(ROUTES.CONTACT),
                  }}
                >
                  Contactanos
                </Link>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Menu de Entrenamiento */}
        <Menu
          anchorEl={anchorElEntrenamiento}
          open={Boolean(anchorElEntrenamiento)}
          onClose={() => setAnchorElEntrenamiento(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          slotProps={{
            paper: {
              sx: {
                zIndex: 1500,
                mt: 1,
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              }
            }
          }}
        >
          <MenuItem onClick={() => handleCategoryClick('', 'entrenamiento')}>
            Todos los cursos
          </MenuItem>
          {entrenamientoCategorias.map((subcat) => (
            <MenuItem 
              key={subcat}
              onClick={() => handleCategoryClick(subcat, 'entrenamiento')}
              sx={{ pl: 2 }}
            >
              {subcat}
            </MenuItem>
          ))}
        </Menu>

        {/* Menu de Ya soy buzo */}
        <Menu
          anchorEl={anchorElYaSoyBuzo}
          open={Boolean(anchorElYaSoyBuzo)}
          onClose={() => setAnchorElYaSoyBuzo(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          slotProps={{
            paper: {
              sx: {
                zIndex: 1500,
                mt: 1,
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              }
            }
          }}
        >
          <MenuItem onClick={() => handleCategoryClick('', 'yaSoyBuzo')}>
            Todos los cursos
          </MenuItem>
          {yaSoyBuzoCategorias.map((subcat) => (
            <MenuItem 
              key={subcat}
              onClick={() => handleCategoryClick(subcat, 'yaSoyBuzo')}
              sx={{ pl: 2 }}
            >
              {subcat}
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
              <ListItem>
                <Link
                  onClick={() => setDrawerOpen(false)}
                  href={ROUTES.ABOUT}
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    width: '100%',
                    padding: '0.5rem 1rem',
                    ...getLinkStyle(ROUTES.ABOUT),
                  }}
                >
                  ¿Por qué nosotros?
                </Link>
              </ListItem>
              
              {/* Sección Entrenamiento */}
              <ListItem>
                <div style={{ width: '100%', padding: '0.5rem 1rem' }}>
                  <div style={{ 
                    fontWeight: 'bold', 
                    marginBottom: '0.5rem',
                    color: '#87CEEB'
                  }}>
                    Entrenamiento
                  </div>
                  <Link
                    onClick={() => setDrawerOpen(false)}
                    href={ROUTES.HOME}
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      padding: '0.25rem 0',
                      color: '#444',
                    }}
                  >
                    Todos los cursos
                  </Link>
                  {entrenamientoCategorias.map((subcat) => (
                    <Link
                      key={subcat}
                      onClick={() => setDrawerOpen(false)}
                      href={`${ROUTES.HOME}?category=${encodeURIComponent(subcat)}`}
                      style={{
                        textDecoration: 'none',
                        display: 'block',
                        padding: '0.25rem 0',
                        paddingLeft: '1rem',
                        color: '#444',
                      }}
                    >
                      {subcat}
                    </Link>
                  ))}
                </div>
              </ListItem>

              {/* Sección Ya soy buzo */}
              <ListItem>
                <div style={{ width: '100%', padding: '0.5rem 1rem' }}>
                  <div style={{ 
                    fontWeight: 'bold', 
                    marginBottom: '0.5rem',
                    color: '#87CEEB'
                  }}>
                    Ya soy buzo
                  </div>
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
                  {yaSoyBuzoCategorias.map((subcat) => (
                    <Link
                      key={subcat}
                      onClick={() => setDrawerOpen(false)}
                      href={`${ROUTES.COURSES}?category=${encodeURIComponent(subcat)}`}
                      style={{
                        textDecoration: 'none',
                        display: 'block',
                        padding: '0.25rem 0',
                        paddingLeft: '1rem',
                        color: '#444',
                      }}
                    >
                      {subcat}
                    </Link>
                  ))}
                </div>
              </ListItem>

              <ListItem>
                <Link
                  onClick={() => setDrawerOpen(false)}
                  href={ROUTES.CONTACT}
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    width: '100%',
                    padding: '0.5rem 1rem',
                    ...getLinkStyle(ROUTES.CONTACT),
                  }}
                >
                  Contactanos
                </Link>
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
          <div className="topbar-one__social" style={{ gap: '10px' }}>
            <a
              href={CONTACT_INFO.SOCIAL_MEDIA.FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5" />
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

            <div className="main-nav__main-navigation" style={{ width: '100%', maxWidth: 'none' }}>
              <ul className="main-nav__navigation-box">
                <li className="dropdown">
                  <Link
                    href={ROUTES.ABOUT}
                    style={{
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      ...getLinkStyle(ROUTES.ABOUT),
                    }}
                  >
                    ¿Por qué nosotros?
                  </Link>
                </li>
                <li 
                    ref={entrenamientoRef}
                    className="dropdown" 
                    style={{ position: 'relative', zIndex: 9999 }}
                    onMouseEnter={() => {
                      setDropdownOpenEntrenamiento(true);
                      setDropdownOpenYaSoyBuzo(false);
                    }}>
                  <a
                    style={{
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      cursor: 'pointer',
                      color: '#444',
                    }}
                    className="nav-link-entrenamiento"
                  >
                    Entrenamiento
                  </a>
                  <ul style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      backgroundColor: '#fff',
                      minWidth: '250px',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      borderRadius: '4px',
                      zIndex: 9999,
                      padding: '8px 0',
                      marginTop: '5px',
                      listStyle: 'none',
                      display: dropdownOpenEntrenamiento ? 'block' : 'none',
                    }}>
                      <li>
                        <a 
                          href={ROUTES.HOME}
                          onClick={(e) => {
                            e.preventDefault();
                            setDropdownOpenEntrenamiento(false);
                            router.push(ROUTES.HOME);
                          }}
                          style={{
                            display: 'block',
                            padding: '8px 16px',
                            textDecoration: 'none',
                            color: '#444',
                            transition: 'background-color 0.3s ease',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          Todos los cursos
                        </a>
                      </li>
                      {entrenamientoCategorias.map((subcat) => (
                        <li key={subcat}>
                          <a 
                            href={`${ROUTES.HOME}?category=${encodeURIComponent(subcat)}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setDropdownOpenEntrenamiento(false);
                              router.push(`${ROUTES.HOME}?category=${encodeURIComponent(subcat)}`);
                            }}
                            style={{
                              display: 'block',
                              padding: '8px 32px',
                              textDecoration: 'none',
                              color: '#444',
                              transition: 'background-color 0.3s ease',
                              cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            {subcat}
                          </a>
                        </li>
                      ))}
                    </ul>
                </li>
                <li></li>
                <li 
                    ref={yaSoyBuzoRef}
                    className="dropdown" 
                    style={{ position: 'relative', zIndex: 9999 }}
                    onMouseEnter={() => {
                      setDropdownOpenYaSoyBuzo(true);
                      setDropdownOpenEntrenamiento(false);
                    }}>
                  <a
                    style={{
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      cursor: 'pointer',
                      color: '#444',
                    }}
                    className="nav-link-ya-soy-buzo"
                  >
                    Ya soy buzo
                  </a>
                  <ul style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      backgroundColor: '#fff',
                      minWidth: '250px',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      borderRadius: '4px',
                      zIndex: 9999,
                      padding: '8px 0',
                      marginTop: '5px',
                      listStyle: 'none',
                      display: dropdownOpenYaSoyBuzo ? 'block' : 'none',
                    }}>
                      <li>
                        <a 
                          href={ROUTES.COURSES}
                          onClick={(e) => {
                            e.preventDefault();
                            setDropdownOpenYaSoyBuzo(false);
                            router.push(ROUTES.COURSES);
                          }}
                          style={{
                            display: 'block',
                            padding: '8px 16px',
                            textDecoration: 'none',
                            color: '#444',
                            transition: 'background-color 0.3s ease',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          Todos los cursos
                        </a>
                      </li>
                      {yaSoyBuzoCategorias.map((subcat) => (
                        <li key={subcat}>
                          <a 
                            href={`${ROUTES.COURSES}?category=${encodeURIComponent(subcat)}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setDropdownOpenYaSoyBuzo(false);
                              router.push(`${ROUTES.COURSES}?category=${encodeURIComponent(subcat)}`);
                            }}
                            style={{
                              display: 'block',
                              padding: '8px 32px',
                              textDecoration: 'none',
                              color: '#444',
                              transition: 'background-color 0.3s ease',
                              cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            {subcat}
                          </a>
                        </li>
                      ))}
                    </ul>
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
                    Contactanos
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
