/**
 * FAYD — Tienda de Ropa Deportiva
 * ─────────────────────────────────────────────
 * Página oficial de la marca FAYD.
 * Paleta: blanco (fondo) · negro (texto) · rojo (acentos).
 * Galería de catálogo desde /foto/fotos_fayd (Niño + bariada).
 *
 * Novedades:
 * - Visor de ángulos: click en una foto → la prenda se expande
 *   y se muestra desde varios ángulos (VisorAngulos).
 * - Sección Calzado: guayes y zapatillas (#calzado).
 * - Noticias de deportistas: carrusel estilo Acrux con CTA
 *   "Consigue el look" (#noticias) — marketing sutil de moda.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// ════════════════════════════════════════════
// CONFIGURACIÓN
// ════════════════════════════════════════════
const CONFIG = {
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
    payment: 'Pago contra entrega y transferencia',
  },
  stats: {
    prendas: 150,
    clientes: 800,
    ciudades: 25,
    years: 3,
  },
  colombia: true, // badge "Hecho en Colombia"
};

const NAV_LINKS = [
  { href: '#top', label: 'Inicio' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#calzado', label: 'Calzado' },
  { href: '#looks', label: 'Looks' },
  { href: '#noticias', label: 'Noticias' },
  { href: '#info', label: 'Info' },
  { href: '#contacto', label: 'Contacto' },
];

// ════════════════════════════════════════════
// CATÁLOGO — fotos reales de /foto/fotos_fayd
// ════════════════════════════════════════════
const FOTOS_NINO = [
  '1645a66f4e5cf57b691f2d82959841b4.jpg',
  '1a95d0399332236bce2a44e5bb608d96.jpg',
  '1f898335acc25e9cb876f7219446bf51.jpg',
  '254fee1dcf40f729567f2f73b1630c21.jpg',
  '33e0eee4a0d0bd6aaf6bb71e87e4e6a9.jpg',
  '35e740062fcdf789f935994c114a7c0d.jpg',
];

const FOTOS_VARIADAS = [
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
const vistasProducto = (p) =>
  Array.isArray(p?.vistas) && p.vistas.length > 0
    ? p.vistas
    : Array.isArray(p?.views) && p.views.length > 0
      ? p.views
      : [{ src: p?.src, label: 'Frente' }];

const CATALOGO_FALLBACK = [
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

const GALERIA_FILTROS = [
  { id: 'all', label: 'Todo' },
  { id: 'nino', label: 'Niño' },
  { id: 'adulto', label: 'Adulto' },
];

// Looks / outfits completos listos para comprar
const LOOKS_FAYD = [
  {
    id: 'look-1',
    nombre: 'Training Full',
    descripcion: 'Conjunto adulto para gym — top + licra + tenis',
    whatsapp: 'Hola FAYD, me interesa el look Training Full',
    imagenes: [
      `/foto/fotos_fayd/bariada/${FOTOS_VARIADAS[0]}`,
      `/foto/fotos_fayd/bariada/${FOTOS_VARIADAS[1]}`,
    ],
    badge: 'Más vendido',
  },
  {
    id: 'look-2',
    nombre: 'Mini Champion',
    descripcion: 'Outfit infantil completo — camiseta + short',
    whatsapp: 'Hola FAYD, me interesa el look Mini Champion',
    imagenes: [
      `/foto/fotos_fayd/Niño/${FOTOS_NINO[0]}`,
      `/foto/fotos_fayd/Niño/${FOTOS_NINO[2]}`,
    ],
    badge: 'Línea niño',
  },
  {
    id: 'look-3',
    nombre: 'Street Sport',
    descripcion: 'Buzo + gorra + tenis — de la cancha a la calle',
    whatsapp: 'Hola FAYD, me interesa el look Street Sport',
    imagenes: [
      `/foto/fotos_fayd/bariada/${FOTOS_VARIADAS[3]}`,
      `/foto/fotos_fayd/bariada/${FOTOS_VARIADAS[4]}`,
    ],
    badge: 'Nuevo',
  },
  {
    id: 'look-4',
    nombre: 'Familia FAYD',
    descripcion: 'Padre e hijo con el mismo estilo deportivo',
    whatsapp: 'Hola FAYD, me interesa el look Familia FAYD',
    imagenes: [
      `/foto/fotos_fayd/bariada/${FOTOS_VARIADAS[5]}`,
      `/foto/fotos_fayd/Niño/${FOTOS_NINO[3]}`,
    ],
    badge: 'Edición limitada',
  },
];

// ════════════════════════════════════════════
// CALZADO — guayes y zapatillas deportivas
// ⚠️ COMPLETAR: las fotos son de REFERENCIA (Unsplash). Reemplázalas por
// fotos reales del calzado FAYD: 4 ángulos por modelo (frente, perfil,
// suela, detalle) y agrega el precio cuando esté definido.
// ════════════════════════════════════════════
const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

const CALZADO = [
  {
    id: 'cal-1',
    titulo: 'Guayes FAYD Pro',
    publico: 'adulto',
    categoria: 'guayes',
    descripcion: 'Guayes para césped natural y sintético, con plantilla amortiguada y cierre ajustado.',
    precio: null,
    badge: 'Nuevo',
    whatsapp: 'Hola FAYD, me interesan los Guayes FAYD Pro. ¿Qué tallas tienen disponibles?',
    vistas: [
      { src: U('1542291026-7eec264c27ff'), label: 'Frente' },
      { src: U('1600185365483-26d7a4cc7519'), label: 'Perfil' },
      { src: U('1595950653106-6c9ebd614d3a'), label: 'Suela' },
      { src: U('1606107557195-0e29a4b5b4aa'), label: 'Detalle' },
    ],
  },
  {
    id: 'cal-2',
    titulo: 'Guayes Niño Gol',
    publico: 'nino',
    categoria: 'guayes',
    descripcion: 'Ligeros para categorías menores. Refuerzo en talón y suela multitacos.',
    precio: null,
    badge: 'Línea niño',
    whatsapp: 'Hola FAYD, busco los Guayes Niño Gol. ¿Tienen tallas 28 a 34?',
    vistas: [
      { src: U('1600185365483-26d7a4cc7519'), label: 'Frente' },
      { src: U('1606107557195-0e29a4b5b4aa'), label: 'Perfil' },
      { src: U('1520334404617-af91c435b6e8'), label: 'Suela' },
      { src: U('1542291026-7eec264c27ff'), label: 'Detalle' },
    ],
  },
  {
    id: 'cal-3',
    titulo: 'Zapatillas Training Flex',
    publico: 'adulto',
    categoria: 'zapatillas',
    descripcion: 'Para gym y entrenamiento funcional: estables, transpirables y livianas.',
    precio: null,
    badge: 'Más vendido',
    whatsapp: 'Hola FAYD, me interesan las Zapatillas Training Flex. ¿Qué tallas manejan?',
    vistas: [
      { src: U('1595950653106-6c9ebd614d3a'), label: 'Frente' },
      { src: U('1542291026-7eec264c27ff'), label: 'Perfil' },
      { src: U('1600185365483-26d7a4cc7519'), label: 'Suela' },
      { src: U('1520334404617-af91c435b6e8'), label: 'Detalle' },
    ],
  },
  {
    id: 'cal-4',
    titulo: 'Zapatillas Urban Street',
    publico: 'adulto',
    categoria: 'zapatillas',
    descripcion: 'El complemento del look street: de la cancha a la calle sin cambiarse.',
    precio: null,
    badge: null,
    whatsapp: 'Hola FAYD, me interesan las Zapatillas Urban Street. ¿Qué tallas manejan?',
    vistas: [
      { src: U('1606107557195-0e29a4b5b4aa'), label: 'Frente' },
      { src: U('1520334404617-af91c435b6e8'), label: 'Perfil' },
      { src: U('1542291026-7eec264c27ff'), label: 'Suela' },
      { src: U('1595950653106-6c9ebd614d3a'), label: 'Detalle' },
    ],
  },
  {
    id: 'cal-5',
    titulo: 'Zapatillas Niño Speed',
    publico: 'nino',
    categoria: 'zapatillas',
    descripcion: 'Cómodas para colegio y deporte. Cierre fácil y suela antideslizante.',
    precio: null,
    badge: 'Nuevo',
    whatsapp: 'Hola FAYD, busco las Zapatillas Niño Speed. ¿Qué tallas infantiles tienen?',
    vistas: [
      { src: U('1520334404617-af91c435b6e8'), label: 'Frente' },
      { src: U('1595950653106-6c9ebd614d3a'), label: 'Perfil' },
      { src: U('1606107557195-0e29a4b5b4aa'), label: 'Suela' },
      { src: U('1600185365483-26d7a4cc7519'), label: 'Detalle' },
    ],
  },
  {
    id: 'cal-6',
    titulo: 'Guayes Sala Indoor',
    publico: 'adulto',
    categoria: 'guayes',
    descripcion: 'Para fútbol sala y superficies duras. Suela de goma con agarre total.',
    precio: null,
    badge: 'Edición limitada',
    whatsapp: 'Hola FAYD, me interesan los Guayes Sala Indoor. ¿Tallas disponibles?',
    vistas: [
      { src: U('1542291026-7eec264c27ff'), label: 'Frente' },
      { src: U('1595950653106-6c9ebd614d3a'), label: 'Perfil' },
      { src: U('1606107557195-0e29a4b5b4aa'), label: 'Suela' },
      { src: U('1520334404617-af91c435b6e8'), label: 'Detalle' },
    ],
  },
];

const CALZADO_FILTROS = [
  { id: 'all', label: 'Todo' },
  { id: 'guayes', label: '⚽ Guayes' },
  { id: 'zapatillas', label: '👟 Zapatillas' },
  { id: 'nino', label: '🧒 Niño' },
];

// ════════════════════════════════════════════
// NOTICIAS DE DEPORTISTAS — marketing sutil de moda:
// el internauta lee la entrevista/noticia y, sin darse cuenta,
// registra CÓMO VISTE el deportista → caja "El look" → WhatsApp.
// ⚠️ COMPLETAR: publica aquí entrevistas reales de tu canal de YouTube
// (campo youtubeId) y noticias con foto propia de cada deportista.
// ════════════════════════════════════════════
const NOTICIAS_DEPORTISTAS = [
  {
    id: 'nd1',
    titulo: 'Rivaldo firma su primer contrato profesional con Patriotas Boyacá',
    descripcion: 'El delantero formado en Acrux FC da el salto al profesionalismo. Mira el video de su presentación.',
    fecha: '2026-07-10',
    badge: '🎙️ ENTREVISTA',
    badgeColor: 'red',
    image: '/foto/Rivaldo.png',
    video: '/videos/presentacion%20de%20rivaldo.mp4',
    fullContent: `Gracias a Acrux FC estoy jugando en Patriotas Boyacá.

Quiero agradecer al Club Deportivo Patriotas de Tunja por abrirme las puertas y darme la oportunidad de formar parte de sus divisiones inferiores.

Gracias a mi familia, a mi club Acrux FC que me formó desde el inicio, y a cada entrenador que creyó en mí. Llevar estos colores es un orgullo que asumo con trabajo, humildad y compromiso.`,
    outfit: {
      tip: 'Para el día de su firma eligió conjunto deportivo ajustado en tono oscuro: sobrio para la cámara, cómodo para el viaje y con presencia de profesional.',
      whatsapp: 'Hola FAYD, quiero vestirme como Rivaldo en su presentación: ¿me muestran los conjuntos deportivos fitted?',
    },
  },
  {
    id: 'nd2',
    titulo: 'Phil Jackson Ibargüen: del Toulon 2004 al banquillo, siempre con estilo de DT',
    descripcion: 'Ex seleccionado Colombia Sub-20 y hoy manager: la elegancia del que vivió el fútbol profesional.',
    fecha: '2026-07-05',
    badge: '⭐ NOTICIA',
    badgeColor: 'blue',
    image: '/foto/phil.png',
    fullContent: `Phil Jackson Ibargüen Sánchez nació en Acandí, Chocó. Delantero profesional (debut en 2004 con Cortuluá) y seleccionado Colombia Sub-20 que disputó el Torneo Esperanzas de Toulon 2004 junto a Falcao García y Freddy Guarín, marcando gol ante China.

Con experiencia en clubes de Colombia, Ecuador, Portugal y Bosnia, hoy pone su experiencia y liderazgo al servicio de los jóvenes talentos.`,
    outfit: {
      tip: 'El clásico "coach look": buzo sobrio + jogger + gorra. Autoridad en la cancha sin perder comodidad.',
      whatsapp: 'Hola FAYD, busco el look de DT: ¿qué buzos y joggers tienen disponibles?',
    },
  },
  {
    id: 'nd3',
    titulo: 'El uniforme del gol: cómo visten los «9» colombianos',
    descripcion: 'Falcao, Borré, Córdoba: los goleadores nacionales comparten un código sobrio y elegante.',
    fecha: '2026-07-28',
    badge: '👔 ESTILO',
    badgeColor: 'dark',
    image: U('1431324155629-1a6deb1dec8d'),
    fullContent: `Los delanteros colombianos convirtieron la rueda de prensa en pasarela: camisera ajustada, chaqueta sobria y tenis limpios.

La fórmula del «9» de área: colores neutros, cortes ajustados y cero estridencia. Elegancia que se nota sin gritar.`,
    outfit: {
      tip: 'Para copiar el código: top neutro ajustado + jogger clásico. Simple, elegante, ganador.',
      whatsapp: 'Hola FAYD, quiero un outfit elegante tipo goleador para salir',
    },
  },
  {
    id: 'nd4',
    titulo: 'Streetwear criollo: el look de los extremos veloces',
    descripcion: 'Los que desbordan por la banda visten oversize, capas y un toque de color que rompe el gris.',
    fecha: '2026-08-02',
    badge: '👔 ESTILO',
    badgeColor: 'dark',
    image: U('1574629810360-7efbbe195018'),
    fullContent: `El extremo moderno juega rápido y viste igual de atrevido: buzos oversize, capuchas, capas y un acento de color.

El streetwear futbolero ya no vive solo en Europa: las canchas colombianas marcan tendencia propia.`,
    outfit: {
      tip: 'Clave del look: buzo amplio + gorra + tenis llamativos. De la cancha a la esquina sin cambiarse.',
      whatsapp: 'Hola FAYD, me gusta el estilo street de los extremos: ¿qué buzos oversize tienen?',
    },
  },
  {
    id: 'nd5',
    titulo: 'Athleisure: el gym-to-street que domina Colombia',
    descripcion: 'Entrenar, almorzar y trabajar con el mismo outfit: la tendencia que llegó para quedarse.',
    fecha: '2026-08-08',
    badge: '🧠 GUÍA',
    badgeColor: 'yellow',
    image: U('1571019613454-1cb2f99b2d8b'),
    fullContent: `El athleisure ya no es tendencia: es el uniforme diario. Conjuntos de tela técnica que respiran, se ven bien en cámara y aguantan el día completo.

Regla de oro: una prenda deportiva + una neutra. El resto lo hace la actitud.`,
    outfit: {
      tip: 'Empieza con un conjunto dry-fit completo y combínalo con una chaqueta neutra. Listo para todo el día.',
      whatsapp: 'Hola FAYD, quiero un conjunto athleisure para todo el día',
    },
  },
  {
    id: 'nd6',
    titulo: 'Kit del campeón junior: cómo equipar a tu hijo como un pro',
    descripcion: 'Conjunto técnico + guayes correctos: la ropa adecuada mejora el juego y la seguridad.',
    fecha: '2026-08-12',
    badge: '👦 LÍNEA NIÑO',
    badgeColor: 'blue',
    image: `/foto/fotos_fayd/Niño/${FOTOS_NINO[4]}`,
    fullContent: `Un jugador bien equipado rinde más: ropa transpirable que no pega, guayes adecuados a la superficie y capas fáciles de quitar al calentar.

La línea infantil FAYD está pensada para entrenar en serio y crecer cómodo.`,
    outfit: {
      tip: 'El kit completo: conjunto técnico infantil + guayes de niño + medias altas. Todo se pide por WhatsApp.',
      whatsapp: 'Hola FAYD, quiero el kit completo para mi hijo: conjunto + guayes de niño',
    },
  },
];

const BENEFICIOS = [
  {
    icono: '🚚',
    titulo: 'Envíos nacionales',
    texto: 'Llevamos tu pedido a cualquier ciudad de Colombia en 2 a 5 días hábiles.',
  },
  {
    icono: '💳',
    titulo: 'Pago flexible',
    texto: 'Contra entrega, transferencia o tarjeta. Tú eliges cómo pagar.',
  },
  {
    icono: '🏆',
    titulo: 'Calidad premium',
    texto: 'Telas frescas, resistentes y con diseños exclusivos de la marca.',
  },
  {
    icono: '💬',
    titulo: 'Atención directa',
    texto: 'Escríbenos por WhatsApp y te asesoramos con tallas y diseños.',
  },
];

const TESTIMONIOS = [
  {
    id: 1,
    nombre: 'Laura G.',
    texto: 'Las prendas son de muy buena calidad, la tela es fresca y los diseños son únicos. Mi pedido llegó súper rápido.',
    compra: 'Conjunto deportivo',
  },
  {
    id: 2,
    nombre: 'Andrés M.',
    texto: 'Compré para toda la familia. La línea de niño es espectacular, mi hijo ama su conjunto.',
    compra: 'Línea infantil',
  },
  {
    id: 3,
    nombre: 'Camila R.',
    texto: 'Excelente atención por WhatsApp. Me ayudaron con las tallas y todo llegó perfecto.',
    compra: 'Envío a Medellín',
  },
];

// ════════════════════════════════════════════
// UTILIDADES
// ════════════════════════════════════════════
const cls = (...a) => a.filter(Boolean).join(' ');
const formatNumber = (n) => new Intl.NumberFormat('es-CO').format(n);
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
const buildWaLink = (phone, msg = '') =>
  `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

function useScrollY(threshold = 0) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

function useReveal(threshold = 0.15, delay = 0) {
  const [ref, setRef] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setVisible(true), delay);
          return () => clearTimeout(t);
        }
      },
      { threshold }
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref, threshold, delay]);
  return {
    ref: setRef,
    className: visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
    style: { transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms` },
  };
}

function RevealOnScroll({ children, delay = 0, className = '' }) {
  const r = useReveal(0.1, delay);
  return (
    <div ref={r.ref} className={cls('transition-all', r.className, className)} style={r.style}>
      {children}
    </div>
  );
}

// ════════════════════════════════════════════
// COMPONENTES BASE
// ════════════════════════════════════════════
function Button({ children, variant = 'primary', href, onClick, className = '' }) {
  const base =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2';
  const styles = {
    primary: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/25',
    dark: 'bg-black text-white hover:bg-neutral-800 shadow-lg shadow-black/20',
    outline: 'border-2 border-black text-black hover:bg-black hover:text-white',
    white: 'bg-white text-black hover:bg-neutral-100 shadow-lg',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#1FB957] shadow-lg shadow-[#25D366]/25',
  };
  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={cls(base, styles[variant], className)} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls(base, styles[variant], className)} onClick={onClick}>
      {children}
    </button>
  );
}

function SectionHeader({ eyebrow, title, highlight, description }) {
  return (
    <div className="text-center mb-12">
      {eyebrow && (
        <p className="text-red-600 font-black tracking-widest text-xs uppercase mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-black text-3xl sm:text-4xl font-black">
        {title} {highlight && <span className="text-red-600">{highlight}</span>}
      </h2>
      {description && (
        <p className="text-neutral-500 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

// ════════════════════════════════════════════
// BARRA DE ANUNCIO SUPERIOR
// ════════════════════════════════════════════
function AnnouncementBar() {
  return (
    <div className="bg-black text-white text-center text-xs sm:text-sm py-2 px-4 font-semibold tracking-wide">
      🚚 Envíos a todo Colombia · 💬 Pide por WhatsApp · 🇨🇴 Hecho en Colombia
    </div>
  );
}

// ════════════════════════════════════════════
// NAVBAR
// ════════════════════════════════════════════
function Navbar() {
  const scrolled = useScrollY(20);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={cls(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b',
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-neutral-200 shadow-sm'
          : 'bg-white/80 backdrop-blur-md border-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-8 py-3">
        <a href="#top" className="flex items-center gap-2">
          <img
            src="/foto/logo/logo_circulo.png"
            alt="Logo FAYD"
            className="w-11 h-11 object-contain"
          />
          <div>
            <h1 className="font-exan text-2xl leading-none text-black">
              FA<span className="text-red-600">Y</span>D
            </h1>
            <p className="text-neutral-400 text-[10px] tracking-[0.3em] leading-none mt-0.5">
              SPORT · <span className="text-neutral-300">🇨🇴 CO</span>
            </p>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-neutral-600 hover:text-red-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all hover:scale-105"
          >
            🛍️ Comprar
          </a>
          <button
            type="button"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-black"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 py-3 px-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-neutral-700 hover:text-red-600"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════
function Hero() {
  return (
    <section
      id="top"
      className="relative pt-32 pb-20 px-4 sm:px-8 min-h-[85vh] flex items-center bg-white overflow-hidden"
    >
      {/* Acentos decorativos */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neutral-900/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center w-full">
        <div>
          <RevealOnScroll>
            <p className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              🔥 Nueva colección
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h1 className="font-exan text-black text-5xl sm:text-6xl lg:text-7xl leading-[1] tracking-tight">
              VISTE TU
              <br />
              <span className="text-red-600">PASIÓN</span>
              <br />
              DEPORTIVA
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="text-neutral-500 text-lg mt-6 max-w-md">
              {CONFIG.brand.description}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={300}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button
                href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)}
              >
                Ver catálogo →
              </Button>
              <Button variant="outline" href="#catalogo">
                Explorar
              </Button>
            </div>
          </RevealOnScroll>
        </div>

        {/* Collage de fotos del hero */}
        <RevealOnScroll delay={200} className="hidden lg:block">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src={`/foto/fotos_fayd/bariada/${FOTOS_VARIADAS[0]}`}
                alt="Prenda deportiva FAYD"
                className="rounded-2xl w-full aspect-[3/4] object-cover shadow-xl"
                loading="eager"
              />
              <img
                src={`/foto/fotos_fayd/Niño/${FOTOS_NINO[1]}`}
                alt="Línea infantil FAYD"
                className="rounded-2xl w-full aspect-[3/4] object-cover shadow-xl"
                loading="eager"
              />
            </div>
            <div className="pt-10 space-y-4">
              <img
                src={`/foto/fotos_fayd/Niño/${FOTOS_NINO[0]}`}
                alt="Ropa deportiva para niño"
                className="rounded-2xl w-full aspect-[3/4] object-cover shadow-xl"
                loading="eager"
              />
              <img
                src={`/foto/fotos_fayd/bariada/${FOTOS_VARIADAS[2]}`}
                alt="Diseño exclusivo FAYD"
                className="rounded-2xl w-full aspect-[3/4] object-cover shadow-xl"
                loading="eager"
              />
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// STATS
// ════════════════════════════════════════════
function Stats() {
  const items = [
    { valor: CONFIG.stats.prendas, sufijo: '+', etiqueta: 'Prendas disponibles', icono: '👕' },
    { valor: CONFIG.stats.clientes, sufijo: '+', etiqueta: 'Clientes felices', icono: '😊' },
    { valor: CONFIG.stats.ciudades, sufijo: '', etiqueta: 'Ciudades con envíos', icono: '📍' },
    { valor: CONFIG.stats.years, sufijo: '', etiqueta: 'Años de la marca', icono: '🏆' },
  ];
  return (
    <section className="py-14 px-4 sm:px-8 bg-black" aria-label="Cifras de FAYD">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, i) => (
          <RevealOnScroll key={item.etiqueta} delay={i * 100}>
            <div className="text-center">
              <p className="text-3xl mb-2" aria-hidden="true">{item.icono}</p>
              <p className="text-white text-4xl font-black">
                {formatNumber(item.valor)}
                <span className="text-red-500">{item.sufijo}</span>
              </p>
              <p className="text-white/50 text-sm mt-1">{item.etiqueta}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// VISOR DE ÁNGULOS — imagen grande + miniaturas
// Al hacer click en una foto del catálogo, se expande
// y muestra la misma prenda desde varios ángulos.
// ════════════════════════════════════════════
function VisorAngulos({ vistas, alt = 'Prenda FAYD', rounded = 'rounded-2xl' }) {
  const [idx, setIdx] = useState(0);
  const total = vistas.length;

  useEffect(() => {
    if (total <= 1) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % total);
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + total) % total);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [total]);

  if (total <= 1) {
    return (
      <div className={cls('relative overflow-hidden bg-neutral-100', rounded)}>
        <img src={vistas[0].src} alt={alt} className="w-full aspect-[3/4] object-cover" />
      </div>
    );
  }

  return (
    <div>
      <div className={cls('relative overflow-hidden bg-neutral-100 aspect-[3/4]', rounded)}>
        <img
          src={vistas[idx].src}
          alt={`${alt} — vista ${vistas[idx].label.toLowerCase()}`}
          className="w-full h-full object-cover"
        />
        {/* Etiqueta del ángulo actual */}
        <span className="absolute bottom-3 left-3 bg-black/80 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
          {vistas[idx].label}
        </span>
        <span className="absolute top-3 right-3 bg-white/90 text-black text-[10px] font-black px-2.5 py-1 rounded-full">
          {idx + 1}/{total}
        </span>
        {/* Flechas */}
        <button
          type="button"
          onClick={() => setIdx((i) => (i - 1 + total) % total)}
          aria-label="Ángulo anterior"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow transition-colors"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => setIdx((i) => (i + 1) % total)}
          aria-label="Ángulo siguiente"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow transition-colors"
        >
          →
        </button>
      </div>
      {/* Miniaturas de ángulos */}
      <div
        className="grid gap-2 mt-2"
        style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
      >
        {vistas.map((v, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`Ver ángulo: ${v.label}`}
            className={cls(
              'overflow-hidden rounded-lg border-2 transition-all',
              i === idx
                ? 'border-red-600'
                : 'border-transparent opacity-60 hover:opacity-100'
            )}
          >
            <img src={v.src} alt="" loading="lazy" className="w-full aspect-square object-cover" />
            <span className="block text-[9px] font-bold text-center py-0.5 bg-black/80 text-white">
              {v.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// CATÁLOGO
// ════════════════════════════════════════════
function Catalogo() {
  const [filtro, setFiltro] = useState('all');
  const [activa, setActiva] = useState(null);
  // Catálogo dinámico: lo publica fayd-content-system en /content/catalogo.json.
  // Si aún no existe, se muestran las fotos fijas de respaldo.
  const [catalogo, setCatalogo] = useState(CATALOGO_FALLBACK);

  useEffect(() => {
    fetch('/content/catalogo.json')
      .then((res) => (res.ok ? res.json() : Promise.reject('sin catalogo')))
      .then((json) => {
        if (Array.isArray(json) && json.length > 0) setCatalogo(json);
      })
      .catch(() => {/* usa fallback */});
  }, []);

  const items = useMemo(
    () => (filtro === 'all' ? catalogo : catalogo.filter((p) => p.categoria === filtro)),
    [filtro, catalogo]
  );

  useEffect(() => {
    if (!activa) return;
    const onKey = (e) => { if (e.key === 'Escape') setActiva(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activa]);

  return (
    <section id="catalogo" className="py-20 sm:py-24 px-4 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Catálogo FAYD"
          title="NUESTRA"
          highlight="COLECCIÓN"
          description="Prendas deportivas con diseños exclusivos. Toca una foto para ver la prenda desde varios ángulos y pedirla por WhatsApp."
        />

        {/* Filtros */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {GALERIA_FILTROS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFiltro(f.id)}
              className={cls(
                'px-5 py-2 rounded-full text-sm font-bold transition-all border-2',
                filtro === f.id
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-black'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grilla */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((p, i) => (
            <RevealOnScroll key={p.id} delay={(i % 4) * 80}>
              <button
                type="button"
                onClick={() => setActiva(p)}
                className="group w-full text-left"
                aria-label={`Ver ${p.titulo}`}
              >
                <div className="relative overflow-hidden rounded-2xl bg-neutral-100 aspect-[3/4]">
                  <img
                    src={p.src}
                    alt={p.titulo}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-black uppercase tracking-wider">
                    {p.categoria === 'nino' ? 'Niño' : 'Adulto'}
                  </span>
                  {/* Badges de escasez / novedad */}
                  {p.badge && (
                    <span className={cls(
                      'absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur',
                      p.badge === 'Nuevo' && 'bg-red-600/90 text-white',
                      p.badge === 'Últimas unidades' && 'bg-orange-500/90 text-white',
                      p.badge === 'Edición limitada' && 'bg-yellow-500/90 text-black',
                      !['Nuevo', 'Últimas unidades', 'Edición limitada'].includes(p.badge) && 'bg-red-600/90 text-white',
                    )}>
                      {p.badge === 'Últimas unidades' ? '🔥 ' : p.badge === 'Nuevo' ? '⚡ ' : p.badge === 'Edición limitada' ? '🏷️ ' : ''}{p.badge}
                    </span>
                  )}
                  {/* Hint: la foto es interactiva */}
                  {vistasProducto(p).length > 1 && (
                    <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent text-white text-[10px] font-bold text-center py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      🔍 Ver ángulos
                    </span>
                  )}
                </div>
                <h3 className="text-black font-bold text-sm mt-3 group-hover:text-red-600 transition-colors">
                  {p.titulo || p.nombre}
                </h3>
                {p.precio_formateado ? (
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-red-600 font-black text-sm">{p.precio_formateado}</p>
                    {p.precio_original && (
                      <p className="text-neutral-300 line-through text-xs">{p.precio_original}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-neutral-400 text-xs mt-0.5">Consultar precio 💬</p>
                )}
              </button>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Modal producto */}
      {activa && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activa.titulo}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setActiva(null)}
        >
          <button
            type="button"
            onClick={() => setActiva(null)}
            aria-label="Cerrar"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center z-10"
          >
            ✕
          </button>
          <div
            className="bg-white rounded-3xl max-w-3xl w-full grid sm:grid-cols-2 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-neutral-100">
              <VisorAngulos
                key={activa.id || activa.src}
                vistas={vistasProducto(activa)}
                alt={activa.titulo || activa.nombre}
                rounded="rounded-none"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <p className="text-red-600 font-black text-xs tracking-widest uppercase mb-2">
                {activa.categoria === 'nino' ? 'Línea Niño' : 'Línea Adulto'}
              </p>
              <h3 className="text-black text-2xl font-black">{activa.titulo || activa.nombre}</h3>
              {activa.precio_formateado && (
                <p className="text-red-600 font-black text-lg mt-2">{activa.precio_formateado}</p>
              )}
              <p className="text-neutral-500 text-sm mt-2">
                Prenda deportiva FAYD. Consulta tallas, colores y disponibilidad por
                WhatsApp.
              </p>
              <div className="mt-6">
                <Button
                  href={buildWaLink(
                    CONFIG.whatsapp.number,
                    `Hola FAYD, me interesa esta prenda: ${activa.titulo} (${activa.src})`
                  )}
                >
                  💬 Pedir por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ════════════════════════════════════════════
// CALZADO — guayes y zapatillas deportivas
// ════════════════════════════════════════════
function SeccionCalzado() {
  const [filtro, setFiltro] = useState('all');
  const [activo, setActivo] = useState(null);

  const items = useMemo(
    () =>
      filtro === 'all'
        ? CALZADO
        : filtro === 'nino'
          ? CALZADO.filter((z) => z.publico === 'nino')
          : CALZADO.filter((z) => z.categoria === filtro),
    [filtro]
  );

  useEffect(() => {
    if (!activo) return;
    const onKey = (e) => { if (e.key === 'Escape') setActivo(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activo]);

  return (
    <section id="calzado" className="py-20 sm:py-24 px-4 sm:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-red-500 font-black tracking-widest text-xs uppercase mb-2">
            Calzado deportivo
          </p>
          <h2 className="text-white text-3xl sm:text-4xl font-black">
            GUAYES Y <span className="text-red-500">ZAPATILLAS</span>
          </h2>
          <p className="text-white/50 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
            El complemento del look FAYD. Toca un modelo para verlo desde todos
            sus ángulos y pide tu talla por WhatsApp.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {CALZADO_FILTROS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFiltro(f.id)}
              className={cls(
                'px-5 py-2 rounded-full text-sm font-bold transition-all border-2',
                filtro === f.id
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-transparent text-white/60 border-white/15 hover:border-red-500/60 hover:text-white'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grilla */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((z, i) => (
            <RevealOnScroll key={`${filtro}-${z.id}`} delay={(i % 3) * 80}>
              <button
                type="button"
                onClick={() => setActivo(z)}
                className="group w-full text-left"
                aria-label={`Ver ${z.titulo}`}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 aspect-square">
                  <img
                    src={z.vistas[0].src}
                    alt={z.titulo}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = U('1542291026-7eec264c27ff');
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {z.badge && (
                    <span
                      className={cls(
                        'absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider',
                        z.badge === 'Edición limitada'
                          ? 'bg-yellow-400/90 text-black'
                          : z.badge === 'Línea niño'
                            ? 'bg-blue-500/90 text-white'
                            : 'bg-red-600/90 text-white'
                      )}
                    >
                      {z.badge === 'Edición limitada' ? '🏷️ ' : ''}{z.badge}
                    </span>
                  )}
                  <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent text-white text-[10px] font-bold text-center py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    🔍 Ver ángulos
                  </span>
                </div>
                <h3 className="text-white font-bold text-sm mt-3 group-hover:text-red-500 transition-colors">
                  {z.titulo}
                </h3>
                <p className="text-white/40 text-xs mt-0.5">
                  {z.precio_formateado || 'Consultar precio 💬'}
                </p>
              </button>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Modal calzado con visor de ángulos */}
      {activo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activo.titulo}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setActivo(null)}
        >
          <button
            type="button"
            onClick={() => setActivo(null)}
            aria-label="Cerrar"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center z-10"
          >
            ✕
          </button>
          <div
            className="bg-neutral-900 border border-white/10 rounded-3xl max-w-3xl w-full grid sm:grid-cols-2 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-neutral-800 p-4 sm:p-6">
              <VisorAngulos
                key={activo.id}
                vistas={activo.vistas}
                alt={activo.titulo}
                rounded="rounded-xl"
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <p className="text-red-500 font-black text-xs tracking-widest uppercase mb-2">
                {activo.categoria === 'guayes' ? '⚽ Guayes' : '👟 Zapatillas'} ·{' '}
                {activo.publico === 'nino' ? 'Niño' : 'Adulto'}
              </p>
              <h3 className="text-white text-2xl font-black">{activo.titulo}</h3>
              <p className="text-white/50 text-sm mt-2 leading-relaxed">{activo.descripcion}</p>
              <p className="text-white/40 text-xs mt-4">
                📏 Tallas y medidas exactas por WhatsApp · 🚚 Envío a todo Colombia
              </p>
              <div className="mt-6">
                <Button
                  variant="whatsapp"
                  href={buildWaLink(CONFIG.whatsapp.number, activo.whatsapp)}
                >
                  💬 Pedir por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ════════════════════════════════════════════
// GALERÍA (muro de fotos)
// ════════════════════════════════════════════
function Galeria() {
  const fotos = useMemo(
    () => [
      ...FOTOS_NINO.slice(2, 6).map((f) => `/foto/fotos_fayd/Niño/${f}`),
      ...FOTOS_VARIADAS.slice(3, 13).map((f) => `/foto/fotos_fayd/bariada/${f}`),
    ],
    []
  );

  return (
    <section
      id="galeria"
      className="py-20 sm:py-24 px-4 sm:px-8 bg-neutral-50 border-y border-neutral-100"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Galería"
          title="MÁS DE"
          highlight="FAYD"
          description="Un vistazo a nuestros diseños, telas y estilos."
        />
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {fotos.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Diseño FAYD ${i + 1}`}
              loading="lazy"
              className="w-full mb-4 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// BENEFICIOS / INFO
// ════════════════════════════════════════════
function InfoSection() {
  return (
    <section id="info" className="py-20 sm:py-24 px-4 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Por qué elegirnos"
          title="COMPRAR EN"
          highlight="FAYD"
          description="Nos preocupamos por que tu experiencia sea tan buena como nuestras prendas."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFICIOS.map((b, i) => (
            <RevealOnScroll key={b.titulo} delay={i * 100}>
              <div className="h-full bg-white border-2 border-neutral-100 hover:border-red-600/40 rounded-2xl p-6 transition-colors shadow-sm hover:shadow-lg">
                <p className="text-4xl mb-4" aria-hidden="true">{b.icono}</p>
                <h3 className="text-black font-black text-lg mb-2">{b.titulo}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{b.texto}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// TESTIMONIOS
// ════════════════════════════════════════════
function Testimonios() {
  return (
    <section
      className="py-20 sm:py-24 px-4 sm:px-8 bg-black"
      aria-labelledby="testimonios-title"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-red-500 font-black tracking-widest text-xs uppercase mb-2">
            Testimonios
          </p>
          <h2 id="testimonios-title" className="text-white text-3xl sm:text-4xl font-black">
            CLIENTES <span className="text-red-500">FELICES</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {TESTIMONIOS.map((t, i) => (
            <RevealOnScroll key={t.id} delay={i * 100}>
              <figure className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
                <div className="text-red-500 mb-3" aria-label="5 de 5 estrellas">
                  ★★★★★
                </div>
                <blockquote className="text-white/80 text-sm leading-relaxed">
                  “{t.texto}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-red-600 text-white font-black flex items-center justify-center text-sm">
                    {t.nombre.charAt(0)}
                  </span>
                  <div>
                    <p className="text-white font-bold text-sm">{t.nombre}</p>
                    <p className="text-white/40 text-xs">{t.compra}</p>
                  </div>
                </figcaption>
              </figure>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// LOOKS FAYD — outfits completos
// ════════════════════════════════════════════
function LooksFayd() {
  return (
    <section id="looks" className="py-20 sm:py-24 px-4 sm:px-8 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Shop the look"
          title="LOOKS"
          highlight="FAYD"
          description="Outfits completos listos para usar. Elige tu estilo y pídelo por WhatsApp."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LOOKS_FAYD.map((look, i) => (
            <RevealOnScroll key={look.id} delay={i * 100}>
              <div className="bg-white rounded-2xl overflow-hidden border-2 border-neutral-100 hover:border-red-600/40 transition-colors shadow-sm hover:shadow-lg group h-full flex flex-col">
                {/* Collage de imágenes del look */}
                <div className="grid grid-cols-2 gap-0.5 aspect-square">
                  {look.imagenes.map((src, j) => (
                    <img
                      key={j}
                      src={src}
                      alt={`${look.nombre} parte ${j + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ))}
                </div>
                {/* Badge */}
                <div className="px-4 pt-3">
                  <span className={cls(
                    'inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider',
                    look.badge === 'Nuevo' && 'bg-red-600/10 text-red-600',
                    look.badge === 'Edición limitada' && 'bg-yellow-500/10 text-yellow-700',
                    look.badge === 'Más vendido' && 'bg-black/5 text-black',
                    look.badge === 'Línea niño' && 'bg-blue-500/10 text-blue-600',
                  )}>
                    {look.badge}
                  </span>
                </div>
                <div className="px-4 pt-2 pb-4 flex flex-col flex-1">
                  <h3 className="text-black font-black text-base group-hover:text-red-600 transition-colors">
                    {look.nombre}
                  </h3>
                  <p className="text-neutral-400 text-xs mt-1 flex-1">{look.descripcion}</p>
                  <Button
                    href={buildWaLink(CONFIG.whatsapp.number, look.whatsapp)}
                    className="mt-3 w-full text-xs py-2.5"
                    variant="primary"
                  >
                    Pedir look 💬
                  </Button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// NOTICIAS DE DEPORTISTAS — carrusel estilo Acrux.
// El internauta lee la noticia, ve cómo viste el
// deportista y llega al CTA "Consigue el look".
// ════════════════════════════════════════════
function NoticiasDeportistas() {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [noticia, setNoticia] = useState(null);

  const scrollToIndex = useCallback((i) => {
    if (!scrollerRef.current) return;
    const card = scrollerRef.current.children[i];
    if (!card) return;
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, []);

  const onScroll = useCallback(() => {
    if (!scrollerRef.current) return;
    const el = scrollerRef.current;
    const center = el.scrollLeft + el.clientWidth / 2;
    const kids = Array.from(el.children);
    const idx = kids.findIndex((k) => {
      const kCenter = k.offsetLeft + k.offsetWidth / 2;
      return Math.abs(kCenter - center) < k.offsetWidth / 2;
    });
    if (idx >= 0 && idx !== activeIndex) setActiveIndex(idx);
  }, [activeIndex]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  // Escape + bloqueo de scroll con el modal abierto
  useEffect(() => {
    if (!noticia) return;
    const onKey = (e) => { if (e.key === 'Escape') setNoticia(null); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [noticia]);

  const badgeColors = {
    red: 'bg-red-600/95 text-white',
    blue: 'bg-blue-600/95 text-white',
    yellow: 'bg-yellow-400/95 text-black',
    dark: 'bg-black/90 text-white',
  };

  return (
    <section id="noticias" className="py-20 sm:py-24 px-4 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Deportistas y estilo"
          title="NOTICIAS Y"
          highlight="ENTREVISTAS"
          description="Lo que pasa en el deporte y cómo lo visten sus protagonistas. Toca una historia para leerla completa."
        />

        <div className="relative">
          {/* Flechas del carrusel */}
          <div className="hidden sm:flex absolute -top-16 right-0 gap-2">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Noticia anterior"
              className="w-10 h-10 rounded-full bg-white border-2 border-neutral-200 hover:border-red-600 hover:text-red-600 text-black flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(NOTICIAS_DEPORTISTAS.length - 1, activeIndex + 1))}
              disabled={activeIndex >= NOTICIAS_DEPORTISTAS.length - 1}
              aria-label="Noticia siguiente"
              className="w-10 h-10 rounded-full bg-white border-2 border-neutral-200 hover:border-red-600 hover:text-red-600 text-black flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>

          {/* Carrusel scroll-snap */}
          <ul
            ref={scrollerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 scroll-smooth"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#dc2626 transparent' }}
            aria-label="Noticias y entrevistas de deportistas"
          >
            {NOTICIAS_DEPORTISTAS.map((item) => (
              <li
                key={item.id}
                className="snap-center shrink-0 w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <article
                  onClick={() => setNoticia(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setNoticia(item);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Abrir noticia: ${item.titulo}`}
                  className="group h-full cursor-pointer bg-white border-2 border-neutral-100 hover:border-red-600/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="relative aspect-video overflow-hidden bg-neutral-100">
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = U('1431324155629-1a6deb1dec8d');
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {(item.video || item.youtubeId) && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-14 h-14 rounded-full bg-white/90 text-black flex items-center justify-center text-xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                          ▶
                        </span>
                      </span>
                    )}
                    <span
                      className={cls(
                        'absolute top-3 left-3 text-[10px] font-black px-3 py-1.5 rounded-full',
                        badgeColors[item.badgeColor] || badgeColors.dark
                      )}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <time
                      className="text-[10px] text-neutral-400 font-bold tracking-wider uppercase"
                      dateTime={item.fecha}
                    >
                      {formatDate(item.fecha)}
                    </time>
                    <h3 className="mt-2 text-base sm:text-lg font-black text-black leading-tight line-clamp-2">
                      {item.titulo}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-500 leading-relaxed line-clamp-3">
                      {item.descripcion}
                    </p>
                    <p className="mt-4 inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-bold text-sm">
                      Leer más <span aria-hidden="true">→</span>
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          {/* Puntos indicadores */}
          <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Selector de slide">
            {NOTICIAS_DEPORTISTAS.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Ir a la noticia ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={cls(
                  'h-2 rounded-full transition-all duration-300',
                  i === activeIndex ? 'w-8 bg-red-600' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal de noticia completa */}
      {noticia && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={noticia.titulo}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setNoticia(null)}
        >
          <button
            type="button"
            onClick={() => setNoticia(null)}
            aria-label="Cerrar"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center z-10"
          >
            ✕
          </button>
          <div className="w-full max-w-2xl my-8" onClick={(e) => e.stopPropagation()}>
            <article className="bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[85vh] overflow-y-auto">
              {/* Medio destacado: video local, YouTube o imagen */}
              <div className="relative aspect-video bg-neutral-100">
                {noticia.video ? (
                  <video
                    src={noticia.video}
                    poster={noticia.image}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                ) : noticia.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${noticia.youtubeId}?rel=0`}
                    title={noticia.titulo}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <img
                    src={noticia.image}
                    alt={noticia.titulo}
                    className="w-full h-full object-cover"
                  />
                )}
                <span
                  className={cls(
                    'absolute top-4 left-4 text-xs font-black px-3 py-1.5 rounded-full',
                    badgeColors[noticia.badgeColor] || badgeColors.dark
                  )}
                >
                  {noticia.badge}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <time
                  className="text-xs text-neutral-400 font-bold tracking-widest uppercase"
                  dateTime={noticia.fecha}
                >
                  {formatDate(noticia.fecha)}
                </time>
                <h3 className="mt-2 text-2xl sm:text-3xl font-black text-black leading-tight">
                  {noticia.titulo}
                </h3>
                <p className="mt-3 text-neutral-500 text-base leading-relaxed">
                  {noticia.descripcion}
                </p>
                {noticia.fullContent && (
                  <div className="mt-6 text-neutral-600 text-base leading-relaxed whitespace-pre-line border-t border-neutral-100 pt-6">
                    {noticia.fullContent}
                  </div>
                )}

                {/* El look — el puente inconsciente hacia el catálogo */}
                {noticia.outfit && (
                  <div className="mt-6 bg-neutral-50 border-2 border-neutral-100 rounded-2xl p-5">
                    <p className="text-red-600 font-black text-xs tracking-widest uppercase mb-2">
                      ⚡ El look de esta historia
                    </p>
                    <p className="text-neutral-600 text-sm leading-relaxed">{noticia.outfit.tip}</p>
                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="whatsapp"
                        href={buildWaLink(CONFIG.whatsapp.number, noticia.outfit.whatsapp)}
                        className="flex-1 text-xs"
                      >
                        Consigue el look 💬
                      </Button>
                      <Button
                        variant="outline"
                        href="#catalogo"
                        onClick={() => setNoticia(null)}
                        className="flex-1 text-xs"
                      >
                        Ver catálogo
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </article>
          </div>
        </div>
      )}
    </section>
  );
}

// ════════════════════════════════════════════
// NEWSLETTER
// ════════════════════════════════════════════
function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // TODO: integrar con WhatsApp Business API o servicio de email
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="py-16 px-4 sm:px-8 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-black text-2xl font-black">
          Recibe <span className="text-red-600">novedades</span> y descuentos
        </h3>
        <p className="text-neutral-400 text-sm mt-2">
          Sé el primero en conocer nuevos productos y ofertas exclusivas.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2 mt-6 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="flex-1 px-4 py-3 rounded-full border-2 border-neutral-200 text-sm text-black placeholder-neutral-300 focus:outline-none focus:border-red-600 transition-colors"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-neutral-800 transition-colors whitespace-nowrap"
          >
            {sent ? '✅ Enviado' : 'Suscribir'}
          </button>
        </form>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// CONTACTO
// ════════════════════════════════════════════
function Contacto() {
  return (
    <section id="contacto" className="py-20 sm:py-24 px-4 sm:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeader
          eyebrow="Contacto"
          title="HAZ TU"
          highlight="PEDIDO"
          description="Escríbenos por WhatsApp y te respondemos al instante. Enviamos a todo el país."
        />
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="border-2 border-neutral-100 rounded-2xl p-6">
            <p className="text-3xl mb-3">💬</p>
            <h3 className="font-black text-black">WhatsApp</h3>
            <a
              href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 font-bold text-sm hover:underline"
            >
              Escríbenos ahora
            </a>
          </div>
          <div className="border-2 border-neutral-100 rounded-2xl p-6">
            <p className="text-3xl mb-3">🚚</p>
            <h3 className="font-black text-black">Envíos</h3>
            <p className="text-neutral-500 text-sm mt-1">
              {CONFIG.shipping.cities}
              <br />
              {CONFIG.shipping.time}
            </p>
          </div>
          <div className="border-2 border-neutral-100 rounded-2xl p-6">
            <p className="text-3xl mb-3">💳</p>
            <h3 className="font-black text-black">Pagos</h3>
            <p className="text-neutral-500 text-sm mt-1">{CONFIG.shipping.payment}</p>
          </div>
        </div>
        <Button
          href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)}
          className="px-10 py-4 text-base"
        >
          🛍️ Quiero comprar
        </Button>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════
// FOOTER
// ════════════════════════════════════════════
function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <img
            src="/foto/logo/logo_circulo.png"
            alt="Logo FAYD"
            className="w-10 h-10 object-contain"
          />
          <div>
            <p className="font-exan text-xl leading-none">
              FA<span className="text-red-500">Y</span>D
            </p>
            <p className="text-white/40 text-[10px] tracking-[0.3em]">SPORT</p>
          </div>
        </div>
        <div className="flex gap-6">
          <a href={CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-red-500 transition-colors text-sm font-semibold">
            Instagram
          </a>
          <a href={CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-red-500 transition-colors text-sm font-semibold">
            Facebook
          </a>
          <a href={CONFIG.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-red-500 transition-colors text-sm font-semibold">
            TikTok
          </a>
        </div>
        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} FAYD · Tienda de ropa deportiva
        </p>
      </div>
    </footer>
  );
}

// ════════════════════════════════════════════
// FLOTANTES
// ════════════════════════════════════════════
function WhatsAppFloat() {
  return (
    <a
      href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 bg-[#25D366] hover:scale-110 transition-transform rounded-full shadow-xl flex items-center justify-center text-white text-2xl"
    >
      💬
    </a>
  );
}

// ════════════════════════════════════════════
// APP
// ════════════════════════════════════════════
export default function App() {
  useEffect(() => {
    document.title = 'FAYD — Ropa Deportiva';
  }, []);

  return (
    <div className="bg-white text-black min-h-screen font-sans overflow-x-hidden antialiased">
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Catalogo />
        <SeccionCalzado />
        <LooksFayd />
        <NoticiasDeportistas />
        <Galeria />
        <InfoSection />
        <Testimonios />
        <Newsletter />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
