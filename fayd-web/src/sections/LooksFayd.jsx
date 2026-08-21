/**
 * Looks FAYD — outfits completos listos para pedir.
 * Extraída de App.jsx sin cambios (refactor lote 2).
 */
import { useState } from 'react';
import { cls, buildWaLink } from '../lib/utils';
import { Button, SectionHeader, RevealOnScroll } from '../components/ui';
import Lightbox from '../components/Lightbox';
import { CONFIG } from '../data/config';
import { LOOKS_FAYD } from '../data/contenido';

export default function LooksFayd() {
  // Lightbox del collage: fotos del look a pantalla completa
  const [lb, setLb] = useState(null); // {look, index}

  return (
    <section id="looks" className="py-20 sm:py-24 px-4 sm:px-8 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Shop the look"
          title="LOOKS"
          highlight="FAYD"
          description="Outfits completos listos para usar. Elige tu estilo y pídelo por WhatsApp."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LOOKS_FAYD.map((look, i) => (
            <RevealOnScroll key={look.id} delay={i * 100}>
              <div className="bg-white rounded-2xl overflow-hidden border-2 border-neutral-100 hover:border-red-600/40 transition-colors shadow-sm hover:shadow-lg group h-full flex flex-col">
                {/* Collage de imágenes del look — click agranda */}
                <div className="grid grid-cols-2 gap-0.5 aspect-square">
                  {look.imagenes.map((src, j) => (
                    <button
                      key={j}
                      type="button"
                      onClick={() => setLb({
                        look,
                        index: j,
                      })}
                      aria-label={`Ampliar foto ${j + 1} de ${look.nombre}`}
                      className="overflow-hidden group/img"
                    >
                      <img
                        src={src}
                        alt={`${look.nombre} parte ${j + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                      />
                    </button>
                  ))}
                </div>
                {/* Badge */}
                <div className="px-4 pt-3">
                  <span className={cls(
                    'inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider',
                    look.badge === 'Nuevo' && 'bg-red-600/10 text-red-600',
                    look.badge === 'Edición limitada' && 'bg-yellow-500/10 text-yellow-700',
                    look.badge === 'Más vendido' && 'bg-black/5 text-black',
                    look.badge === 'Línea niño' && 'bg-blue-500/10 text-blue-600',
                  )}>
                    {look.badge}
                  </span>
                </div>
                <div className="px-4 pt-2 pb-4 flex flex-col flex-1">
                  <h3 className="text-black font-black text-base group-hover:text-red-600 transition-colors">
                    {look.nombre}
                  </h3>
                  <p className="text-neutral-400 text-xs mt-1 flex-1">{look.descripcion}</p>
                  <Button
                    href={buildWaLink(CONFIG.whatsapp.number, look.whatsapp)}
                    className="mt-3 w-full text-xs py-2.5"
                    variant="primary"
                  >
                    Pedir look 💬
                  </Button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Lightbox del look */}
      {lb && (
        <Lightbox
          fotos={lb.look.imagenes.map((src, i) => ({
            src,
            alt: `${lb.look.nombre} — foto ${i + 1}`,
            label: lb.look.nombre,
          }))}
          index={lb.index}
          onClose={() => setLb(null)}
          onChange={(i) => setLb((prev) => ({ ...prev, index: i }))}
        />
      )}
    </section>
  );
}
