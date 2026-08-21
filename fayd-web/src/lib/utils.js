/**
 * Utilidades compartidas FAYD.
 * Extraídas de App.jsx sin cambios de comportamiento (refactor lote 2).
 */
export const cls = (...a) => a.filter(Boolean).join(' ');
export const formatNumber = (n) => new Intl.NumberFormat('es-CO').format(n);
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
export const buildWaLink = (phone, msg = '') =>
  `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

// Fotos de referencia de calzado/noticias (Unsplash). Ver nota en data/calzado.js.
export const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;
