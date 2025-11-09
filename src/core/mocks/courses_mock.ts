import { ReceiveCourseDto } from '../dto/receive/course/receive_course_dto';

// Interface compatible con Product de monolite-saas
export interface MockProduct {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  category_name: string;
  subcategory_name: string;
  cuantos_dives_only: number | string;
  cuantos_days_course: number | string;
  descripcion_larga: string;
  descripcion_corta: string;
  product_id: number;
  product_sku: string;
  product_name: string;
  stock: number;
  has_stock: boolean;
  active: boolean;
  public: boolean;
  available: boolean;
  quantity: number;
  total_price: number;
  features?: any;
}

// Función para convertir precio string a number
const parsePrice = (priceString: string): number => {
  if (!priceString || priceString.trim() === '') return 0;
  const cleaned = priceString.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
};

// Función para convertir ReceiveCourseDto a MockProduct
export const mapCourseToProduct = (course: ReceiveCourseDto, index: number): MockProduct => {
  const price = parsePrice(course.precio);
  return {
    id: index + 1,
    name: course.nombre,
    description: course.descripcion_corta || course.descripcion_larga.substring(0, 200),
    image_url: course.foto,
    price: price,
    category_name: course.categoria,
    subcategory_name: course.subcategoria,
    cuantos_dives_only: course.cuantos_dives_only,
    cuantos_days_course: course.cuantos_days_course,
    descripcion_larga: course.descripcion_larga,
    descripcion_corta: course.descripcion_corta,
    product_id: index + 1,
    product_sku: `SKU-${index + 1}`,
    product_name: course.nombre,
    stock: 999,
    has_stock: true,
    active: true,
    public: true,
    available: true,
    quantity: 0,
    total_price: price,
    features: {}
  };
};

export const coursesMock: ReceiveCourseDto[] = [
  {
    nombre: 'Fun Dive',
    descripcion_larga: `Si ya estas certificad@ y deseas conocer el Parque Nacional Tayrona, el Fun dive es perfecto para ti! \n\nEs un día de buceo, que incluye dos inmersiones en diferentes puntos del parque Tayrona.\n\nEl servicio incluye:\n\n-2 Inmersiones/ 2 tanques \n\n-Alquiler de todo el equipo necesario\n\n-Guía y acompañamiento de profesional PADI\n\n-Refrigerio entre cada inmersión\n\n*Recordar que se debe descansar mínimo 18 horas después de la última inmersión para tomar un vuelo*`,
    descripcion_corta: 'Bucea el Parque Tayrona',
    foto: '/assets/images/courses/Fun-Dive.jpg',
    precio: '$95',
    categoria: 'Aventuras',
    subcategoria: 'Fun dive',
    cuantos_dives_only: 2,
    cuantos_days_course: 1
  },
  {
    nombre: 'Discover Scuba Diving - Minicurso',
    descripcion_larga: `🤿Si quieres vivir la experiencia de bucear por un día, el curso Discover Scuba Diving de PADI es perfecto para ti. Es una sesión de un día de buceo, que incluye dos inmersiones en diferentes puntos del parque Tayrona. 
La primera desde un sitio tranquilo y de baja profundidad, y la segunda en un sitio tipico de buceo para que sientas lo que es ser buz@ por un día.

*Recuerden que deben descansar mínimo 18 horas después de su última inmersión para tomar un vuelo*`,
    descripcion_corta: 'Vas a probar el buceo por primera vez y explorar el mar en un entorno controlado.',
    foto: 'https://s3.makerstech.co/public/space_20250512055823/file_20250515140017.png',
    precio: '$99',
    categoria: 'Aventuras',
    subcategoria: '¿Aún no eres buzo?',
    cuantos_dives_only: 2,
    cuantos_days_course: 1
  },
  {
    nombre: 'PADI Advanced Open Water Diver',
    descripcion_larga: `🐡El curso PADI Advanced Open Water Diver se lleva a cabo en dos días, en los cuales haces 5 inmersiones de aventura:
•        El Buceo Profundo y la Navegación Subacuática son obligatorios.
Se puede elegir otros tres entre varias opciones, pero siempre recomendamos tomar:
•        Buceo con corrientes: para obtener habilidades para hacer frente a este tipo de ambiente.
•        Flotabilidad: controlar tu cuerpo bajo del Agua,  es el distintivo de un buzo de élite.
•        Buceo nocturno: todo el mundo quiere sumergirse en la noche, es una gran experiencia y te dará confianza bajo el agua.
Nuestra tarifa incluye:
•        Todos los materiales.WS
•        El alquiler de todo el equipo necesario.
•        Instrucción por un profesional PADI.
•        5 inmersiones / 5 tanques en el parque Tayrona.
•        Grupos pequeños.
•        Refrigerio entre inmersiones.
•        Certificado como PADI Advanced Open Water Diver.

*Recuerda que debes descansar mínimo 18 horas después de su última inmersión para tomar un vuelo*`,
    descripcion_corta: 'Mejora tus habilidades de buceo y gana experiencia',
    foto: 'https://s3.makerstech.co/public/space_20250512055823/file_20250723203621.jpeg',
    precio: '$375',
    categoria: 'Otros servicios',
    subcategoria: '¡Formación PADI a otro nivel!',
    cuantos_dives_only: 5,
    cuantos_days_course: 2
  },
  {
    nombre: 'Emergency First Response (EFR)',
    descripcion_larga: `El curso Emergency First Response (EFR) te enseña las habilidades necesarias para responder de forma efectiva ante emergencias médicas, tanto dentro como fuera del agua. Es un entrenamiento esencial para buceadores que desean avanzar hacia niveles superiores, como el PADI Rescue Diver, y también para cualquier persona interesada en aprender primeros auxilios de forma práctica y accesible.
`,
    descripcion_corta: 'Auxilios primarios y secundarios',
    foto: 'https://s3.makerstech.co/public/space_20250512055823/file_20250715160515.jpg',
    precio: '$99',
    categoria: 'Otros servicios',
    subcategoria: '¡Formación PADI a otro nivel!',
    cuantos_dives_only: 0,
    cuantos_days_course: 1
  },
  {
    nombre: 'Control de Especie Invasora: Pez León',
    descripcion_larga: `Control de Especie Invasora: Pez León
Como especie invasora originaria del Pacífico sur, sin depredadores y con una gran adaptabilidad, el pez león representa una amenaza para los arrecifes locales. Por esto, en Oceano Scuba hemos decidido que si vamos a comer pez ¡que sea pez león!

En este curso de un día, de la mano de un profesional PADI y con la ayuda de un arpón hawaiano, aprenderás a identificar y cazar pez león, sin poner en riesgo el entorno o tu integridad y la de tus compañeros.

¡Atrévete y caza tu ceviche!

-¿Qué incluye?

Transporte marítimo a los sitios de buceo.
Alquiler de todo el equipo necesario.
Instrucción semi-personalizada por un profesional PADI en grupos pequeños.
2 inmersiones / 2 tanques en el Parque Tayrona.
Refrigerio entre inmersiones.

-Requisitos mínimos
Certificado PADI Peak Performance Buoyancy Specialty.
Gozar de un buen estado de salud: se requiere la firma de un cuestionario médico y una declaración de buen estado de salud.

Tienes la opción de elegir salir desde la Marina Internacional de Santa Marta o desde la bahía de Taganga
¡Contamos con El Robert, un yate de 42 pies con ducha de agua dulce, música, sombra y en la proa un espacio para tomar sol!🛥️
El valor del curso es de: $ 175  usd

*Recuerden que deben descansar mínimo 18 horas después de su última inmersión para tomar un vuelo*`,
    descripcion_corta: 'Ayudanos a controlar la especie invasora en el Caribe',
    foto: 'https://s3.makerstech.co/public/space_20250512055823/file_20250523160406.jpeg',
    precio: '$95',
    categoria: 'Otros servicios',
    subcategoria: 'Solo en Oceano Scuba',
    cuantos_dives_only: 2,
    cuantos_days_course: 1
  },
  {
    nombre: 'Dive Like a GIRL- Especialidad Distintiva',
    descripcion_larga: `¿Qué es DIVE LIKE A GIRL?
La primera especialidad diseñada por mujeres, para mujeres avalada y certificada por PADI donde pondrás en práctica técnicas específicas de buceo según tu anatomía, fisiología y necesidades como mujer buza.

¿POR QUÉ DIVE LIKE A GIRL?
Porque el buceo tradicional fue diseñado con parámetros masculinos. Es hora de adaptar esta increíble actividad a TUS necesidades específicas como mujer.

APRENDERÁS A:
•        Ajustar equipo según tu anatomía femenina específica 
•        Manejar flotabilidad para tu tipo de cuerpo y distribución de grasa/músculo
•        Técnicas efectivas para el manejo del pelo bajo el agua 
•        Adaptar tus necesidades en el buceo a tu ciclo menstrual sin limitaciones para bucear
•        Formar parte de una comunidad global de mujeres buceadoras

CURSO INCLUYE:
1.        Kit Dive Like a Girl
2.        Desarrollo de conocimiento personalizado presencial y los materiales necesarios para este módulo.
3.        Dos (2) inmersiones en aguas abiertas en el PNN Tayrona, alquiler de todo el equipo de buceo, transporte a los puntos de buceo y refrigerio entre inmersiones.
4.        Instructora femenina certificada PADI y creadora de la especialidad.
5.        Sesión final de diagnóstico: Tu cuerpo bajo el agua
6.        Certificado PADI "Dive Like a Girl"- Especialidad Distintiva
7.        Ingreso a la comunidad de mujeres buceadoras

REQUISITOS:
• PADI Open Water Diver o equivalente 
• Edad mínima: 15 años 
• Solo para mujeres
`,
    descripcion_corta: 'Una invitación a adaptar todos los conocimientos de los cursos de buceo PADI a las necesidades propias de cada mujer',
    foto: '/assets/images/courses/girll.jpeg',
    precio: '$159',
    categoria: 'Otros servicios',
    subcategoria: 'Solo en Oceano Scuba',
    cuantos_dives_only: 2,
    cuantos_days_course: 1
  },
  {
    nombre: 'PADI Rescue Diver + EFR',
    descripcion_larga: `🤿Ya tienes tu certificado PADI Advanced Open Water Dive, y deseas continuar con el siguiente nivel. El curso PADI Rescue Diver es un gran paso en la expansión de tus conocimientos de buceo y experiencia.🌊
Este curso es muy divertido. No sólo es divertido para los estudiantes, sino también es uno de los favoritos de nuestros instructores. Si realmente deseas mejorar tus habilidades de buceo, y al tiempo divertirte, aprender algunas habilidades que pueden salvar valiosas vidas muy y aumentar considerablemente tu confianza al bucear, entonces este curso es el ideal para ti.
Un requisito previo para el curso PADI Rescue Diver es que los estudiantes deben tener un certificado válido de Reanimación Cardio-Pulmonar (RCP) y que esté vigente durante un año después de finalizado el curso. Si no tienes un certificado de RCP, puedes obtener uno con nosotros, completando el curso de Primeros Auxilios - Emergency First Response (EFR).
Se trata de un programa de tres días y medio que incluye:
•        6 inmersiones / 6 tanques en el Parque Nacional Tayrona.
•        Instrucción por un profesional PADI.
•        Todos los materiales (curso Rescue Diver y del curso EFR).
•        Alquiler de todo el equipo necesario.
•        Refrigerios entre inmersiones.
•        Certificado PADI Rescue Diver y certificado de Primeros Auxilios - Emergency First Response (EFR).

*Recuerda que debes descansar mínimo 18 horas después de su última inmersión para tomar un vuelo*`,
    descripcion_corta: 'Aprende a prevenir y manejar emergencias de buceo mientras te conoces a ti mismo',
    foto: 'https://s3.makerstech.co/public/space_20250512055823/file_20250523152956.jpeg',
    precio: '$475',
    categoria: 'Otros servicios',
    subcategoria: '¡Formación PADI a otro nivel!',
    cuantos_dives_only: 6,
    cuantos_days_course: 3
  },
  {
    nombre: 'Curso Reactivate / Refresh',
    descripcion_larga: `Si ya estas certificado como buzo, pero llevas mas de un año sin bucear te ofrecemos el curso Refresh!
El servicio incluye:
-Alquiler de todo el equipo de buceo
-2 Inmersiones/ 2 tanques 
-Guía y acompañamiento de profesional PADI
-Clase de recorderis "Refresh"
-Refrigerio entre cada inmersión


La actividad inicia a las 8:00 AM y finaliza alrededor de 2:00 PM.

*Recuerden que deben descansar mínimo 18 horas después de su última inmersión para tomar un vuelo*`,
    descripcion_corta: 'Actualiza tus habilidades y conocimientos de buceo',
    foto: 'https://s3.makerstech.co/public/space_20250512055823/file_20250715161453.jpg',
    precio: '$79',
    categoria: 'Aventuras',
    subcategoria: '¡Formación PADI a otro nivel!',
    cuantos_dives_only: 2,
    cuantos_days_course: 1
  },
  {
    nombre: 'PADI Open Water Diver',
    descripcion_larga: `PADI Open Water Diver
El curso PADI Open Water Diver es la mejor opción para empezar, es un programa de tres días y al final se te certifica para bucear donde quieras hasta 18 metros sin un instructor 🤿💙 Nuestra tarifa incluye:

* Todos los materiales.
* El alquiler de todo el equipo necesario.
* Instrucción por un profesional PADI.
* 1 sesión de aguas confinadas en piscina.
* 4 inmersiones / 4 tanques   en aguas abiertas en el Parque Nacional Tayrona.
* Grupos pequeños.
* Refrigerio entre inmersiones.
* Certificado como PADI Open Water Diver.


El primer día del curso la cita es a las 2:30 pm en nuestra sede ubicada en la carrera 2 #17-46, esquina, Taganga. 

Los otros dos días nos vemos a las 8:00 am.

*Recuerden que deben descansar mínimo 18 horas después de su última inmersión para tomar un vuelo`,
    descripcion_corta: 'Primer nivel de certificación de buceo recreativo',
    foto: 'https://s3.makerstech.co/public/space_20250512055823/file_20250723175158.jpg',
    precio: '$379',
    categoria: 'Otros servicios',
    subcategoria: '¿Aún no eres buzo?',
    cuantos_dives_only: 4,
    cuantos_days_course: 3
  },
  {
    nombre: 'PADI Divemaster',
    descripcion_larga: `Toma el mejor camino para convertirte en un profesional del buceo

Conviértete en Divemaster certificado PADI con un programa intensivo, diseñado para llevarte al siguiente nivel de formación subacuática. Ofrecemos tres opciones según tu disponibilidad y objetivos, con alojamiento, prácticas reales y formación especializada.

🔹 Opción 1 – 2 semanas
Ideal para quienes buscan una formación sólida en tiempo reducido.
Incluye:
25 a 35 inmersiones
Hospedaje hasta 15 días
Materiales y gorra oficial
Asesoría personalizada


🔹 Opción 2 – 3 semanas
Más tiempo en el agua y formación complementaria.
Incluye:
30 a 50 inmersiones
Hospedaje hasta 20 días
Curso de instructor en fotografía submarina
Seminario de funcionamiento de compresores y equipos
Gorra + DSMB con carrete


🔹 Opción 3 – 4 semanas
Formación completa con especialidades adicionales.
Incluye:
30 a 50 inmersiones
Hospedaje hasta 20 días
Curso de fotografía submarina
Seminario de compresores y equipos
Especialidades: Enriched Air Diver y Sidemount Diver
Gorra + DSMB con carrete


Requisitos previos:
• Ser mayor de 18 años.
• Certificación de Rescue Diver o equivalente.
• Certificado EFR válido para los próximos doce meses.
• Contar con al menos 40 inmersiones para comenzar el curso.

*Recuerda que debes descansar mínimo 18 horas después de su última inmersión para tomar un vuelo*`,
    descripcion_corta: 'El máximo nivel de buceo recreativo',
    foto: 'https://s3.makerstech.co/public/space_20250512055823/file_20250723172254.jpeg',
    precio: '',
    categoria: 'Otros servicios',
    subcategoria: 'Solo para profesionales',
    cuantos_dives_only: 'mas 20',
    cuantos_days_course: 'mas 15'
  },
  {
    nombre: 'Paquetes IDC PADI',
    descripcion_larga: `Paquetes IDC PADI
Curso  Instructor IDC PADI
¿Quiéres saber cómo vivir de hacer lo que más te apasiona?
¿Te gustan las nuevas aventuras y sueñas con una vida frente al mar?

¡Certifícate como PADI Instructor y convierte tu pasión por el Océano en tu estilo de vida 👩🏻‍🏫🐠! Contamos con fechas de certificación durante todo el año.

 Conoce nuestros paquetes y elige el mejor camino para convertirte en un profesional del Buceo ⭐

Océano Basic, Océano Plus, Océano Pro 🤩

*Océano Basic*
IDC
EFRI 
Instructor especialidad 
EANx 

*Océano plus*
IDC 
EFRI 
Instructor especialidad 
EANx
E. Oxygen provider 
Profundo
+ 2 especialidades
*MSDT Prep*

Charlas:
Mantenimiento de equipos
La economía del buceo 

*Océano pro*
IDC 
EFRI 
Instructor especialidad 
EANx
E. Oxygen provider 
Profundo
+ 2 especialidades
*MSDT Prep*

Charlas:
Mantenimiento de equipos
La economía del buceo

Intro adaptative techniques 
Intro Boat capitán 
Intro freediving 



🗓️ Pregunta por nuestras fechas!!


Si tienes dudas, nuestro PADI Course Director Hernando Bonilla estará siempre dispuesto para resolverlas, guiarte en el proceso, conocer tus expectativas y necesidades, para asegurarnos de alinear todos nuestros recursos con tus objetivos personales 💪🏼🧑🏻‍🏫👩🏻‍🏫. 

📧 oceano@oceanoscuba.com.co
📱+57 313 888 5958

⬇️ Reserva tu cupo y vive la experiencia #SomosOceano`,
    descripcion_corta: 'Primer nivel de instructor profesional',
    foto: 'https://s3.makerstech.co/public/space_20250512055823/file_20250723173042.png',
    precio: '',
    categoria: 'Otros servicios',
    subcategoria: 'Solo para profesionales',
    cuantos_dives_only: 'mas 10',
    cuantos_days_course: 14
  },
  {
    nombre: 'Snorkeling - Careteo',
    descripcion_larga: `🤿El Tour Snorkeling es un tour guiado donde vamos a los mismos sitios donde buceamos en el Parque Tayrona puede ser bahia concha , isla aguja, punta de granate, entre otros lugares,  también incluye refrigerio, y el alquiler de  todo el equipo de careteo! ¡
 
`,
    descripcion_corta: 'Caretea el Tayrona',
    foto: 'https://s3.makerstech.co/public/space_20250512055823/file_20250523161520.jpeg',
    precio: '$55',
    categoria: 'Aventuras',
    subcategoria: 'Snorkeling / Acompañante',
    cuantos_dives_only: 0,
    cuantos_days_course: 1
  },
  {
    nombre: 'Acompañante de Buzo',
    descripcion_larga: `Si deseas acompañar a alguien en su día de buceo, puedes hacerlo al mejor estilo Oceano Scuba.

A bordo de nuestras embarcaciones podrás relajarte y apreciar el magnífico paisaje que ofrece el Parque Nacional Natural Tayrona. Entre el verde de las montañas y el azul de las aguas, tu cuerpo y mente recibirán el descanso y desconexión que tanto necesitan.

Mientras los buzos hacen sus inmersiones, tendrás la embarcación a tu disposición para relajarte o caretear cerca.

Somos la única escuela de buceo PADI 5 Estrellas en Santa Marta con más de 30 años de experiencia explorando el Parque Tayrona.`,
    descripcion_corta: '',
    foto: 'https://s3.makerstech.co/public/space_20250512055823/file_20250523161332.jpeg',
    precio: '$45',
    categoria: 'Aventuras',
    subcategoria: 'Snorkeling / Acompañante',
    cuantos_dives_only: 0,
    cuantos_days_course: 1
  }
];

export const getCoursesMock = (): ReceiveCourseDto[] => {
  return coursesMock;
};

export const getCourseByIdMock = (index: number): ReceiveCourseDto | undefined => {
  return coursesMock[index];
};

export const getCoursesByCategoryMock = (category: string): ReceiveCourseDto[] => {
  return coursesMock.filter(course => course.categoria === category || course.subcategoria === category);
};

// Funciones para obtener productos en formato compatible con monolite-saas
export const getProductsMock = (): MockProduct[] => {
  return coursesMock.map((course, index) => mapCourseToProduct(course, index));
};

export const getProductByIdMock = (id: number): MockProduct | undefined => {
  const index = id - 1; // Los IDs empiezan en 1
  if (index >= 0 && index < coursesMock.length) {
    return mapCourseToProduct(coursesMock[index], index);
  }
  return undefined;
};

export const getProductsByCategoryMock = (category: string): MockProduct[] => {
  const filtered = coursesMock
    .map((course, index) => ({ course, index }))
    .filter(({ course }) => course.categoria === category || course.subcategoria === category);
  
  return filtered.map(({ course, index }) => mapCourseToProduct(course, index));
};

