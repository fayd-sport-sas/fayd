/**
 * Componentes UI base compartidos por las secciones.
 * Extraídos de App.jsx sin cambios de comportamiento (refactor lote 2).
 */
import { useEffect, useState } from 'react';
import { cls } from '../lib/utils';
import { useReveal } from '../lib/hooks';

export function Button({ children, variant = 'primary', href, onClick, className = '' }) {
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

export function SectionHeader({ eyebrow, title, highlight, description }) {
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

export function RevealOnScroll({ children, delay = 0, className = '' }) {
  const r = useReveal(0.1, delay);
  return (
    <div ref={r.ref} className={cls('transition-all', r.className, className)} style={r.style}>
      {children}
    </div>
  );
}

// ════════════════════════════════════════════
// VISOR DE ÁNGULOS — imagen grande + miniaturas
// Al hacer click en una foto del catálogo, se expande
// y muestra la misma prenda desde varios ángulos.
// ════════════════════════════════════════════
export function VisorAngulos({ vistas, alt = 'Prenda FAYD', rounded = 'rounded-2xl' }) {
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
