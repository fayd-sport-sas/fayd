/**
 * Contenido editorial: looks, noticias de deportistas, beneficios y testimonios.
 * Extraído de App.jsx sin cambios (refactor lote 2).
 */
import { U } from '../lib/utils';
import { FOTOS_NINO, FOTOS_VARIADAS } from './catalogo';

// Looks / outfits completos listos para comprar
export const LOOKS_FAYD = [
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
// NOTICIAS DE DEPORTISTAS — marketing sutil de moda:
// el internauta lee la entrevista/noticia y, sin darse cuenta,
// registra CÓMO VISTE el deportista → caja "El look" → WhatsApp.
// ⚠️ COMPLETAR: publica aquí entrevistas reales de tu canal de YouTube
// (campo youtubeId) y noticias con foto propia de cada deportista.
// ════════════════════════════════════════════
export const NOTICIAS_DEPORTISTAS = [
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

export const BENEFICIOS = [
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

export const TESTIMONIOS = [
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
