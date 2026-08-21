/**
 * Lightbox — visor a pantalla completa para agrandar fotos.
 * Flechas laterales, miniaturas, teclado (Esc/←/→), swipe táctil,
 * contador y caption. Reutilizable desde cualquier sección.
 */
import { useCallback, useEffect, useRef } from 'react';
import { cls } from '../lib/utils';

export default function Lightbox({ fotos, index, onClose, onChange }) {
  const total = fotos.length;
  const touchX = useRef(null);

  const go = useCallback(
    (i) => {
      const next = ((i % total) + total) % total;
      onChange(next);
    },
    [total, onChange]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(index + 1);
      if (e.key === 'ArrowLeft') go(index - 1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, go, onClose]);

  if (total === 0) return null;
  const foto = fotos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visor de fotos"
      className="fixed inset-0 z-[120] flex flex-col bg-black/95 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null || total <= 1) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {/* Barra superior: contador + cerrar */}
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <span className="text-xs font-black tracking-widest">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar visor"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-xl flex items-center justify-center transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Foto grande */}
      <div className="relative flex-1 flex items-center justify-center px-4 min-h-0" onClick={(e) => e.stopPropagation()}>
        <img
          src={foto.src}
          alt={foto.alt || 'Foto FAYD'}
          className="max-h-full max-w-full object-contain rounded-lg shadow-2xl select-none"
          draggable="false"
        />
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/30 text-white text-lg flex items-center justify-center transition-colors"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/30 text-white text-lg flex items-center justify-center transition-colors"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      {(foto.alt || foto.label) && (
        <p className="text-center text-white/70 text-xs sm:text-sm px-6 pt-3" onClick={(e) => e.stopPropagation()}>
          {foto.label && (
            <span className="inline-block bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mr-2 align-middle">
              {foto.label}
            </span>
          )}
          {foto.alt}
        </p>
      )}

      {/* Miniaturas */}
      {total > 1 && (
        <div className="flex gap-2 overflow-x-auto px-4 py-4 justify-start sm:justify-center" onClick={(e) => e.stopPropagation()}>
          {fotos.map((f, i) => (
            <button
              key={`${f.src}-${i}`}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ver foto ${i + 1}`}
              className={cls(
                'shrink-0 w-14 h-14 sm:w-16 sm:h-16 overflow-hidden rounded-lg border-2 transition-all',
                i === index ? 'border-red-600 scale-105' : 'border-transparent opacity-50 hover:opacity-90'
              )}
            >
              <img src={f.src} alt="" loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
