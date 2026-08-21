/**
 * Hero — titular de marca + collage de fotos.
 * Extraído de App.jsx sin cambios (refactor lote 2).
 */
import { buildWaLink } from '../lib/utils';
import { RevealOnScroll, Button } from '../components/ui';
import { CONFIG } from '../data/config';

const FOTOS_PORTADA = [
  { src: '/foto/portada/athletic_catalog_portrait.webp', alt: 'Catálogo deportivo FAYD' },
  { src: '/foto/portada/golden_hour_sunset.webp', alt: 'Estilo deportivo FAYD al atardecer' },
  { src: '/foto/portada/golden_hour_sunset_1.webp', alt: 'Prendas FAYD en hora dorada' },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-32 pb-20 px-4 sm:px-8 min-h-[85vh] flex items-center bg-white overflow-hidden"
    >
      {/* Acentos decorativos */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neutral-900/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center w-full">
        <div>
          <RevealOnScroll>
            <p className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              🔥 Nueva colección
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <h1 className="font-exan text-black text-5xl sm:text-6xl lg:text-7xl leading-[1] tracking-tight">
              VISTE TU
              <br />
              <span className="text-red-600">PASIÓN</span>
              <br />
              DEPORTIVA
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="text-neutral-500 text-lg mt-6 max-w-md">
              {CONFIG.brand.description}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={300}>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button
                href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)}
              >
                Ver catálogo →
              </Button>
              <Button variant="outline" href="#catalogo">
                Explorar
              </Button>
            </div>
          </RevealOnScroll>
        </div>

        {/* Collage de fotos del hero (portada real FAYD) */}
        <RevealOnScroll delay={200} className="hidden lg:block">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <img
                src={FOTOS_PORTADA[0].src}
                alt={FOTOS_PORTADA[0].alt}
                className="rounded-2xl w-full h-full min-h-[560px] object-cover shadow-xl"
                loading="eager"
              />
            </div>
            <div className="pt-10 space-y-4">
              <img
                src={FOTOS_PORTADA[1].src}
                alt={FOTOS_PORTADA[1].alt}
                className="rounded-2xl w-full aspect-[3/4] object-cover shadow-xl"
                loading="eager"
              />
              <img
                src={FOTOS_PORTADA[2].src}
                alt={FOTOS_PORTADA[2].alt}
                className="rounded-2xl w-full aspect-[3/4] object-cover shadow-xl"
                loading="eager"
              />
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
