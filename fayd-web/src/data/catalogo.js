/**
 * Catálogo de respaldo y constantes de fotos (líneas Niño + variadas).
 * Extraído de App.jsx sin cambios (refactor lote 2).
 */

// ════════════════════════════════════════════
// CATÁLOGO — fotos reales de /foto/fotos_fayd
// ════════════════════════════════════════════
export const FOTOS_NINO = [
  '1645a66f4e5cf57b691f2d82959841b4.jpg',
  '1a95d0399332236bce2a44e5bb608d96.jpg',
  '1f898335acc25e9cb876f7219446bf51.jpg',
  '254fee1dcf40f729567f2f73b1630c21.jpg',
  '33e0eee4a0d0bd6aaf6bb71e87e4e6a9.jpg',
  '35e740062fcdf789f935994c114a7c0d.jpg',
];

export const FOTOS_VARIADAS = [
  '04316c3c32b885ef7230af27537a4e05.jpg',
  '06058d75df8fe6e9afea65d81b6578ee.jpg',
  '0895ec1e54c262c909463f011a403952.jpg',
  '0a89203696523478948f88c38e81bb78.jpg',
  '0d1074cab7bafdb13f8c8ba127205ca2.jpg',
  '0eadf653aeec4d0bcb0ece35028ccf20.jpg',
  '0f28240a5d326b926278865f4ccc7edf.jpg',
  '0f36d76ce387b5efd59b9d1b4a0f4da6.jpg',
  '1.jpg',
  '12433d5de70608ab5b1ee18d2c6fc908.jpg',
  '18b4869e68b75b3fcf3b4efde10137a1.jpg',
  '1db796b6c880b0182f58252714c9faca.jpg',
];

// Catálogo de respaldo (fotos fijas). Se usa mientras el sistema no ha
// publicado productos en /content/catalogo.json (lo actualiza fayd-content-system).
const BADGES_ROTACION = ['Nuevo', 'Más vendido', 'Edición limitada', null, null, null, 'Últimas unidades', null];

// "Vistas" de cada prenda para el visor de ángulos (click en la foto).
// ⚠️ COMPLETAR: por ahora las vistas usan fotos de prendas similares como
// demostración. Reemplázalas por fotos REALES de la misma prenda tomadas
// desde ángulos distintos: frente, espalda, lateral y detalle.
const vistasDemo = (principal, alternas) => [
  { src: principal, label: 'Frente' },
  ...alternas.slice(0, 3).map((src, i) => ({
    src,
    label: ['Espalda', 'Lateral', 'Detalle'][i] || 'Detalle',
  })),
];

// Normaliza las vistas de un producto (acepta vistas o views desde el JSON).
export const vistasProducto = (p) =>
  Array.isArray(p?.vistas) && p.vistas.length > 0
    ? p.vistas
    : Array.isArray(p?.views) && p.views.length > 0
      ? p.views
      : [{ src: p?.src, label: 'Frente' }];

export const CATALOGO_FALLBACK = [
  ...FOTOS_VARIADAS.slice(0, 8).map((f, i) => ({
    id: `v${i}`,
    src: `/foto/fotos_fayd/bariada/${f}`,
    categoria: 'adulto',
    titulo: i % 2 === 0 ? 'Conjunto deportivo' : 'Prenda FAYD',
    precio: null,
    badge: BADGES_ROTACION[i],
    vistas: vistasDemo(
      `/foto/fotos_fayd/bariada/${f}`,
      FOTOS_VARIADAS.slice(0, 8)
        .filter((_, j) => j !== i)
        .slice(0, 3)
        .map((f2) => `/foto/fotos_fayd/bariada/${f2}`)
    ),
  })),
  ...FOTOS_NINO.slice(0, 4).map((f, i) => ({
    id: `n${i}`,
    src: `/foto/fotos_fayd/Niño/${f}`,
    categoria: 'nino',
    titulo: 'Línea infantil',
    precio: null,
    badge: i === 0 ? 'Nuevo' : null,
    vistas: vistasDemo(
      `/foto/fotos_fayd/Niño/${f}`,
      FOTOS_NINO.slice(0, 6)
        .filter((x) => x !== f)
        .slice(0, 3)
        .map((f2) => `/foto/fotos_fayd/Niño/${f2}`)
    ),
  })),
];

export const GALERIA_FILTROS = [
  { id: 'all', label: 'Todo' },
  { id: 'nino', label: 'Niño' },
  { id: 'nina', label: 'Niña' },
  { id: 'mujer', label: 'Mujer' },
  { id: 'hombre', label: 'Hombre' },
  // Adulto se muestra solo mientras haya prendas de esa línea (las 2 reales).
  { id: 'adulto', label: 'Adulto' },
];
