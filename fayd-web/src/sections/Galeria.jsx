/**
 * Galería — muro de portadas publicadas por los agentes:
 *  · noticias.json        → portadas de fútbol local
 *  · tendencias-feed.json → posts de tendencia publicados a la web
 *  · galeria.json         → inspiración curada (Pixabay)
 * Ya NO repite fotos del catálogo: cada foto es contenido publicado.
 * Click en cualquier foto → lightbox a pantalla completa.
 */
import { useEffect, useMemo, useState } from 'react';
import { SectionHeader } from '../components/ui';
import Lightbox from '../components/Lightbox';

export default function Galeria() {
  const [items, setItems] = useState([]);
  const [lb, setLb] = useState(null);

  useEffect(() => {
    const j = (url) =>
      fetch(url)
        .then((res) => (res.ok ? res.json() : Promise.reject(url)))
        .catch(() => []);

    Promise.all([
      j('/content/noticias.json'),
      j('/content/tendencias-feed.json'),
      j('/content/galeria.json'),
    ]).then(([noticias, feed, galeria]) => {
      const portadas = [
        ...(Array.isArray(noticias) ? noticias : []).map((n) => ({
          src: n.imagen_url,
          alt: n.titulo,
          tag: '📰 NOTICIA',
          sub: n.fuente || undefined,
        })),
        ...(Array.isArray(feed) ? feed : []).map((t) => ({
          src: t.imagen,
          alt: t.titulo || t.tendencia,
          tag: '⚡ TENDENCIA',
          sub: t.tendencia || undefined,
        })),
        ...(Array.isArray(galeria) ? galeria : []).map((g) => ({
          src: g.imagen,
          alt: g.tendencia ? `Tendencia: ${g.tendencia}` : 'Inspiración deportiva',
          tag: '📸 INSPIRACIÓN',
          sub: g.tendencia || undefined,
        })),
      ].filter((p) => p.src);

      // Dedup por URL (una misma imagen puede aparecer en dos feeds)
      const vistas = new Set();
      setItems(portadas.filter((p) => !vistas.has(p.src) && vistas.add(p.src)));
    });
  }, []);

  const fotosLb = useMemo(
    () => items.map((p) => ({ src: p.src, alt: p.alt, label: p.tag })),
    [items]
  );

  return (
    <section
      id="galeria"
      className="py-20 sm:py-24 px-4 sm:px-8 bg-neutral-50 border-y border-neutral-100"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Galería"
          title="LO QUE"
          highlight="PUBLICAMOS"
          description="Portadas de nuestras noticias y tendencias del momento. Toca cualquier foto para verla en grande."
        />
        {items.length === 0 ? (
          <p className="text-center text-neutral-400 text-sm py-10">
            Publicando contenido nuevo… vuelve en unos minutos.
          </p>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
            {items.map((p, i) => (
              <button
                key={`${p.src}-${i}`}
                type="button"
                onClick={() => setLb({ index: i })}
                aria-label={`Ampliar: ${p.alt}`}
                className="group relative block w-full mb-4 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="w-full transition-transform duration-700 group-hover:scale-105"
                />
                {/* Velo con etiqueta al pasar el mouse */}
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent text-left pt-8 pb-3 px-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="block text-red-400 text-[9px] font-black tracking-widest">
                    {p.tag}
                  </span>
                  <span className="block text-white text-xs font-bold line-clamp-2 mt-0.5">
                    {p.alt}
                  </span>
                </span>
                <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white text-[11px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  🔍
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {lb && (
        <Lightbox
          fotos={fotosLb}
          index={lb.index}
          onClose={() => setLb(null)}
          onChange={(i) => setLb({ index: i })}
        />
      )}
    </section>
  );
}
