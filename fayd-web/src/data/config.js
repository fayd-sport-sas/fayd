/**
 * Configuración global y constantes de marca FAYD.
 * Extraído de App.jsx sin cambios (refactor lote 2).
 */

export const CONFIG = {
  brand: {
    name: 'FAYD',
    slogan: 'Ropa deportiva con actitud',
    description: 'Tu estilo deportivo empieza aquí. Calidad, comodidad y diseño en cada prenda.',
  },
  whatsapp: {
    number: '573222676860', // ⚠️ CAMBIAR por el número de la tienda
    defaultMessage: 'Hola FAYD, quiero información de sus prendas',
  },
  social: {
    // ⚠️ COMPLETAR con los perfiles reales cuando se creen
    instagram: 'https://www.instagram.com/fayd.sport',
    facebook: 'https://www.facebook.com/FAYDSport',
    tiktok: 'https://www.tiktok.com/@fayd.sport',
  },
  shipping: {
    cities: 'Envíos a todo Colombia',
    time: '2 a 5 días hábiles',
    payment: 'Nequi · Daviplata · BRE-B · Contra entrega',
  },
  // ⚠️ COMPLETAR: números reales de cada billetera (sin espacios).
  pagos: {
    nequi: { numero: '3222676860', titular: 'FAYD SPORT' },
    daviplata: { numero: '3222676860', titular: 'FAYD SPORT' },
    breb: { numero: '3222676860', titular: 'FAYD SPORT' },
    contraEntrega: 'Bogotá, Soacha y alrededores',
  },
  stats: {
    prendas: 150,
    clientes: 800,
    ciudades: 25,
    years: 3,
  },
  colombia: true, // badge "Hecho en Colombia"
};

export const NAV_LINKS = [
  { href: '#top', label: 'Inicio' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#calzado', label: 'Calzado' },
  { href: '#uniformes', label: 'Uniformes' },
  { href: '#looks', label: 'Looks' },
  { href: '#noticias', label: 'Noticias' },
  { href: '#galeria', label: 'Galería' },
  { href: '#info', label: 'Info' },
  { href: '#contacto', label: 'Contacto' },
];

// Etiquetas visibles de las líneas del catálogo. Los ids son ASCII (Enmienda
// 2: así los escribe el pipeline en catalogo.json); las ñ viven solo en la UI.
export const ETIQUETAS_CATEGORIA = {
  nino: 'Niño',
  nina: 'Niña',
  mujer: 'Mujer',
  hombre: 'Hombre',
  adulto: 'Adulto',
};
export const etiquetaCategoria = (cat) =>
  ETIQUETAS_CATEGORIA[cat] ||
  (typeof cat === 'string' && cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : '');
