export const CONTACT_INFO = {
  // Ubicación
  LOCATION: {
    LATITUDE: 11.2662911, // Ejemplo: Ciudad de México
    LONGITUDE: -74.1901212,
    ADDRESS: "Carrera 2 # 17 - 46 Esquina, Taganga, Santa Marta, Magdalena",
  },

  // Información de contacto
  EMAIL: "oceano@oceanoscuba.com.co",
  PHONE: "+57 316 534 1834",

  GOOGLE_MAPS:
    "https://www.google.com/maps/place/Oceano+Scuba+Dive+Center/@11.2660754,-74.1901323,20z/data=!4m5!3m4!1s0x8ef4f530ed242ec1:0x70f7e43977bed39e!8m2!3d11.2662911!4d-74.1901212",

  // Iniciar sesión
  LOGIN: "https://panel.makerstech.co/",

  // Redes sociales
  SOCIAL_MEDIA: {
    TRIPADVISOR:
      "https://www.tripadvisor.co/Attraction_Review-g1149024-d3533901-Reviews-Oceano_Scuba_Dive_Center-Taganga_Santa_Marta_Municipality_Magdalena_Department.html",
    INSTAGRAM: "https://www.instagram.com/oceanoscuba/",
    FACEBOOK: "https://www.facebook.com/OceanoScuba/",
    FLICKR: "https://www.flickr.com/photos/148572699@N03/",
    WHATSAPP:
      "https://api.whatsapp.com/send/?phone=573165341834&text=Hello%2C+¿Podrías+ayudarme%3F+&type=phone_number&app_absent=0",
  },
};

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about-us",
  COURSES: "/courses",
  CONTACT: "/contact",
  LOGIN: "https://panelscuba.makerstech.co/",
  LOCATION: "https://maps.app.goo.gl/H894i4a2vrtyvnDZ6",
} as const;
