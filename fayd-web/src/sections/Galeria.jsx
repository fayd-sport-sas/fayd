/**
 * Galería — muro de fotos + tendencias publicadas por los agentes
 * (/content/galeria.json). Si el feed no existe o falla, el bloque
 * de tendencias simplemente no se muestra.
 * Extraída de App.jsx sin cambios (refactor lote 2).
 */
import { useEffect, useMemo, useState } from 'react';
import { SectionHeader } from '../components/ui';
import { FOTOS_NINO, FOTOS_VARIADAS } from '../data/catalogo';

export default function Galeria() {
  // Tendencias publicadas por los agentes (/content/galeria.json).
  // Si el feed no existe o falla, el bloque simplemente no se muestra.
  const [tendencias, setTendencias] = useState([]);

  useEffect(() => {
    fetch('/content/galeria.json')
      .then((res) => (res.ok ? res.json() : Promise.reject('sin galeria')))
      .then((json) => {
        if (Array.isArray(json) && json.length > 0) setTendencias(json);
      })
      .catch(() => {});
  }, []);

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

        {tendencias.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <SectionHeader
              eyebrow="Inspiración"
              title="EN"
              highlight="TENDENCIA"
              description="Looks deportivos que están marcando la temporada. Fotos ilustrativas de tendencia (Pixabay), curadas por nuestro sistema de contenido."
            />
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
              {tendencias.map((t) => (
                <img
                  key={t.id || t.imagen}
                  src={t.imagen}
                  alt={t.tendencia ? `Tendencia: ${t.tendencia}` : 'Tendencia deportiva'}
                  title={t.tendencia || undefined}
                  loading="lazy"
                  className="w-full mb-4 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
                />
              ))}
            </div>
            <p className="text-center text-neutral-400 text-xs mt-2">
              Fotos: Pixabay (licencia libre) — contenido de inspiración, no productos FAYD.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
