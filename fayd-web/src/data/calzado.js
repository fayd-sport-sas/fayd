/**
 * Calzado — guayes y zapatillas deportivas.
 * Extraído de App.jsx sin cambios (refactor lote 2).
 */
import { U } from '../lib/utils';

// ════════════════════════════════════════════
// CALZADO — guayes y zapatillas deportivas
// ⚠️ COMPLETAR: las fotos son de REFERENCIA (Unsplash). Reemplázalas por
// fotos reales del calzado FAYD: 4 ángulos por modelo (frente, perfil,
// suela, detalle) y agrega el precio cuando esté definido.
// ════════════════════════════════════════════
export const CALZADO = [
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

export const CALZADO_FILTROS = [
  { id: 'all', label: 'Todo' },
  { id: 'guayes', label: '⚽ Guayes' },
  { id: 'zapatillas', label: '👟 Zapatillas' },
  { id: 'nino', label: '🧒 Niño' },
];
