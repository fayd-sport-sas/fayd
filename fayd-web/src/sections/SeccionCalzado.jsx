/**
 * Calzado — guayes y zapatillas con visor de ángulos (fondo negro).
 * Extraída de App.jsx sin cambios (refactor lote 2).
 */
import { useEffect, useMemo, useState } from 'react';
import { cls, buildWaLink, U } from '../lib/utils';
import { Button, RevealOnScroll, VisorAngulos } from '../components/ui';
import { CONFIG } from '../data/config';
import { CALZADO, CALZADO_FILTROS } from '../data/calzado';

export default function SeccionCalzado() {
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
