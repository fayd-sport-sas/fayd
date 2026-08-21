/**
 * Catálogo — grilla con filtros, catálogo dinámico desde
 * /content/catalogo.json (publicado por fayd-content-system)
 * y modal con visor de ángulos.
 * Extraída de App.jsx sin cambios (refactor lote 2).
 */
import { useEffect, useMemo, useState } from 'react';
import { cls, buildWaLink } from '../lib/utils';
import { Button, SectionHeader, RevealOnScroll, VisorAngulos } from '../components/ui';
import Lightbox from '../components/Lightbox';
import { CONFIG, etiquetaCategoria } from '../data/config';
import { CATALOGO_FALLBACK, GALERIA_FILTROS, vistasProducto } from '../data/catalogo';

export default function Catalogo() {
  const [filtro, setFiltro] = useState('all');
  const [activa, setActiva] = useState(null);
  const [zoom, setZoom] = useState(null); // {index} del lightbox de vistas
  // Catálogo dinámico: lo publica fayd-content-system en /content/catalogo.json.
  // Si aún no existe, se muestran las fotos fijas de respaldo.
  const [catalogo, setCatalogo] = useState(CATALOGO_FALLBACK);

  useEffect(() => {
    fetch('/content/catalogo.json')
      .then((res) => (res.ok ? res.json() : Promise.reject('sin catalogo')))
      .then((json) => {
        if (!Array.isArray(json) || json.length === 0) return;
        // El pipeline publica `imagen`/`imagen_url`; la web consume `src`. Se
        // prefiere la ruta relativa (sobrevive a cambios de dominio). La
        // categoría se normaliza a id ASCII (niño→nino) para los filtros.
        const normalizados = json.map((p) => ({
          ...p,
          src: p.src || p.imagen || p.imagen_url,
          categoria:
            typeof p.categoria === 'string'
              ? p.categoria.replace(/ñ/g, 'n').replace(/Ñ/g, 'N')
              : p.categoria,
        }));
        // Dedup defensivo (B.4): si el JSON trajera un duplicado (mismo id o
        // misma imagen), la web muestra uno solo.
        const vistos = new Set();
        setCatalogo(
          normalizados.filter((p) => {
            const dup =
              (p.id && vistos.has(`id:${p.id}`)) ||
              (p.src && vistos.has(`img:${p.src}`));
            if (p.id) vistos.add(`id:${p.id}`);
            if (p.src) vistos.add(`img:${p.src}`);
            return !dup;
          })
        );
      })
      .catch(() => {/* usa fallback */});
  }, []);

  const items = useMemo(
    () => (filtro === 'all' ? catalogo : catalogo.filter((p) => p.categoria === filtro)),
    [filtro, catalogo]
  );

  // Las 4 líneas nuevas van siempre visibles (marcadores hasta que las llene
  // el pipeline); Adulto solo mientras existan prendas de esa línea.
  const filtros = useMemo(
    () =>
      GALERIA_FILTROS.filter(
        (f) => f.id !== 'adulto' || catalogo.some((p) => p.categoria === 'adulto')
      ),
    [catalogo]
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
          {filtros.map((f) => (
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
                  {etiquetaCategoria(p.categoria) && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-black uppercase tracking-wider">
                      {etiquetaCategoria(p.categoria)}
                    </span>
                  )}
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
          {items.length === 0 && (
            <div className="col-span-full text-center py-16">
              <p className="text-black font-black text-lg">Colección en camino 🔥</p>
              <p className="text-neutral-500 text-sm mt-1">
                Estamos preparando esta línea. Pregúntanos por WhatsApp qué hay disponible hoy.
              </p>
              <div className="mt-5">
                <Button
                  variant="whatsapp"
                  href={buildWaLink(CONFIG.whatsapp.number, 'Hola FAYD, ¿qué prendas tienen disponibles hoy?')}
                >
                  💬 Consultar disponibilidad
                </Button>
              </div>
            </div>
          )}
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
            <div className="bg-neutral-100 relative">
              <VisorAngulos
                key={activa.id || activa.src}
                vistas={vistasProducto(activa)}
                alt={activa.titulo || activa.nombre}
                rounded="rounded-none"
              />
              {/* Ampliar: abre las vistas a pantalla completa */}
              <button
                type="button"
                onClick={() => setZoom({ index: 0 })}
                aria-label="Ampliar fotos de la prenda"
                className="absolute top-3 right-3 bg-black/60 hover:bg-red-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full transition-colors"
              >
                🔍 Ampliar
              </button>
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <p className="text-red-600 font-black text-xs tracking-widest uppercase mb-2">
                {`Línea ${etiquetaCategoria(activa.categoria) || 'FAYD'}`}
              </p>
              <h3 className="text-black text-2xl font-black">{activa.titulo || activa.nombre}</h3>
              {activa.precio_formateado && (
                <p className="text-red-600 font-black text-lg mt-2">{activa.precio_formateado}</p>
              )}
              <p className="text-neutral-500 text-sm mt-2">
                Prenda deportiva FAYD. Consulta tallas, colores y disponibilidad por
                WhatsApp.
              </p>
              {/* Otros colores / variantes de la misma línea */}
              {(() => {
                const variantes = catalogo.filter(
                  (p) => p.categoria === activa.categoria && p.id !== activa.id
                );
                if (variantes.length === 0) return null;
                return (
                  <div className="mt-5">
                    <p className="text-neutral-400 text-[10px] font-black tracking-widest uppercase mb-2">
                      Otros colores · misma línea
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {variantes.map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setActiva(v)}
                          aria-label={`Ver variante: ${v.titulo || v.nombre}`}
                          title={v.titulo || v.nombre}
                          className="w-14 h-14 rounded-xl overflow-hidden border-2 border-neutral-200 hover:border-red-600 transition-colors"
                        >
                          <img
                            src={v.src}
                            alt=""
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
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

      {/* Lightbox: fotos de la prenda a pantalla completa */}
      {activa && zoom && (
        <Lightbox
          fotos={vistasProducto(activa).map((v) => ({
            src: v.src,
            alt: `${activa.titulo || activa.nombre} — ${v.label}`,
            label: v.label,
          }))}
          index={zoom.index}
          onClose={() => setZoom(null)}
          onChange={(i) => setZoom({ index: i })}
        />
      )}
    </section>
  );
}
