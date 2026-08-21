/**
 * Noticias de deportistas — carrusel scroll-snap con noticias locales
 * (desde /content/noticias.json, publicado por fayd-content-system)
 * + historias estáticas. Modal con video/YouTube y caja "El look".
 * Extraída de App.jsx sin cambios (refactor lote 2).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cls, formatDate, buildWaLink, U } from '../lib/utils';
import { Button, SectionHeader } from '../components/ui';
import { CONFIG } from '../data/config';
import { NOTICIAS_DEPORTISTAS } from '../data/contenido';

export default function NoticiasDeportistas() {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [noticia, setNoticia] = useState(null);
  // Noticias reales de fútbol local (Sibaté/Soacha) publicadas por
  // fayd-content-system en /content/noticias.json (Google News + Pixabay)
  const [locales, setLocales] = useState([]);

  useEffect(() => {
    fetch('/content/noticias.json')
      .then((res) => (res.ok ? res.json() : Promise.reject('sin noticias')))
      .then((json) => {
        if (Array.isArray(json) && json.length > 0) {
          setLocales(
            json.map((n) => ({
              id: `loc-${n.id}`,
              tipo: 'local',
              titulo: n.titulo,
              descripcion: n.descripcion,
              fecha: n.fecha,
              badge: n.badge || '📰 FÚTBOL LOCAL',
              badgeColor: n.badgeColor || 'red',
              image: n.imagen_url || U('1431324155629-1a6deb1dec8d'),
              fuente: n.fuente,
              urlFuente: n.url_fuente,
            }))
          );
        }
      })
      .catch(() => {}); // fallback: historias estaticas
  }, []);

  const items = useMemo(() => [...locales, ...NOTICIAS_DEPORTISTAS], [locales]);

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
              onClick={() => scrollToIndex(Math.min(items.length - 1, activeIndex + 1))}
              disabled={activeIndex >= items.length - 1}
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
            {items.map((item) => (
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
                    {item.fuente && (
                      <p className="text-[10px] text-neutral-300 mt-0.5">Fuente: {item.fuente}</p>
                    )}
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
            {items.map((_, i) => (
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
                {noticia.urlFuente && (
                  <a
                    href={noticia.urlFuente}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-bold text-sm"
                  >
                    Leer noticia completa en {noticia.fuente} ↗
                  </a>
                )}
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
