const CAROUSEL_KEY = 'clinica_carousel_slides';
const NOTICIAS_KEY = 'clinica_noticias';

export const defaultCarouselSlides = [
  {
    id: 1,
    imagen: '/Banners/opt/Banner1.jpg',
    titulo: 'Amor desde el',
    titulo_highlight: 'primer latido.',
    subtitulo: 'Cuidamos de tu salud y la de tu familia con los mejores especialistas.'
  },
  {
    id: 2,
    imagen: '/Banners/opt/Banner2.jpg',
    titulo: 'Salud y bienestar',
    titulo_highlight: 'para toda la familia.',
    subtitulo: 'Contamos con especialistas en múltiples áreas médicas para ti y los tuyos.'
  },
  {
    id: 3,
    imagen: '/Banners/opt/Banner3.jpg',
    titulo: 'Atención médica',
    titulo_highlight: 'de calidad.',
    subtitulo: 'Instalaciones modernas y tecnología de última generación a tu servicio.'
  }
];

export const defaultNoticias = [
  {
    id: 1,
    autor: 'Admin',
    fecha: '01 / 03 / 2026',
    titulo: 'Prevención y bienestar familiar',
    resumen: 'Recomendaciones para fortalecer hábitos de salud y prevención en toda la familia.',
    imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/1.jpg'
  },
  {
    id: 2,
    autor: 'Admin',
    fecha: '05 / 03 / 2026',
    titulo: 'Nuevas áreas de atención',
    resumen: 'Conoce los espacios renovados para consultas y procedimientos con mayor comodidad.',
    imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Ginecologia.jpg'
  },
  {
    id: 3,
    autor: 'Admin',
    fecha: '10 / 03 / 2026',
    titulo: 'Avances en tecnología médica',
    resumen: 'Equipamiento y tecnología de apoyo para diagnósticos más precisos y oportunos.',
    imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Equipos.jpg'
  },
  {
    id: 4,
    autor: 'Admin',
    fecha: '12 / 03 / 2026',
    titulo: 'Quirófanos con nueva tecnología',
    resumen: 'Nuestros quirófanos cuentan con equipamiento de última generación para procedimientos más seguros.',
    imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Quirofano1.jpg'
  },
  {
    id: 5,
    autor: 'Admin',
    fecha: '14 / 03 / 2026',
    titulo: 'Habitaciones con mayor confort',
    resumen: 'Remodelación de habitaciones para una estancia más cómoda y tranquila para los pacientes.',
    imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Habitacion1.jpg'
  },
  {
    id: 6,
    autor: 'Admin',
    fecha: '16 / 03 / 2026',
    titulo: 'Atención pediátrica de calidad',
    resumen: 'Nuestro equipo pediátrico brinda atención especializada y humana a los más pequeños.',
    imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Pediatrico2.jpg'
  },
  {
    id: 7,
    autor: 'Admin',
    fecha: '18 / 03 / 2026',
    titulo: 'Sala de espera remodelada',
    resumen: 'Espacios de espera más amplios y confortables para nuestros pacientes y sus familias.',
    imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/SalaEspera.jpg'
  },
  {
    id: 8,
    autor: 'Admin',
    fecha: '20 / 03 / 2026',
    titulo: 'Expansión del área de hospitalización',
    resumen: 'Nuevas camas y áreas equipadas para brindar atención integral a pacientes internados.',
    imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Hospitalizacion.jpg'
  },
  {
    id: 9,
    autor: 'Admin',
    fecha: '22 / 03 / 2026',
    titulo: 'Protocolo de higiene reforzado',
    resumen: 'Nuevos protocolos de aseo y desinfección para garantizar mayor seguridad en las instalaciones.',
    imagen: '/wetransfer_fotos-clinica-arboleda_2026-02-26_1420/Aseo.jpg'
  }
];

function parseJson(raw) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function cloneDefaults(source) {
  return source.map((item) => ({ ...item }));
}

export function loadCarouselSlides() {
  const parsed = parseJson(localStorage.getItem(CAROUSEL_KEY));
  if (Array.isArray(parsed)) return parsed;
  return cloneDefaults(defaultCarouselSlides);
}

export function saveCarouselSlides(slides) {
  localStorage.setItem(CAROUSEL_KEY, JSON.stringify(slides));
}

export function loadNoticias() {
  const parsed = parseJson(localStorage.getItem(NOTICIAS_KEY));
  if (Array.isArray(parsed)) return parsed;
  return cloneDefaults(defaultNoticias);
}

export function saveNoticias(noticias) {
  localStorage.setItem(NOTICIAS_KEY, JSON.stringify(noticias));
}

export function clearCarouselSlides() {
  localStorage.removeItem(CAROUSEL_KEY);
}

export function clearNoticias() {
  localStorage.removeItem(NOTICIAS_KEY);
}
