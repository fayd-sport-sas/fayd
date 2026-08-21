/**
 * InfoSection — beneficios de comprar en FAYD.
 * Extraída de App.jsx sin cambios (refactor lote 2).
 */
import { RevealOnScroll, SectionHeader } from '../components/ui';
import { BENEFICIOS } from '../data/contenido';

export default function InfoSection() {
  return (
    <section id="info" className="py-20 sm:py-24 px-4 sm:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Por qué elegirnos"
          title="COMPRAR EN"
          highlight="FAYD"
          description="Nos preocupamos por que tu experiencia sea tan buena como nuestras prendas."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFICIOS.map((b, i) => (
            <RevealOnScroll key={b.titulo} delay={i * 100}>
              <div className="h-full bg-white border-2 border-neutral-100 hover:border-red-600/40 rounded-2xl p-6 transition-colors shadow-sm hover:shadow-lg">
                <p className="text-4xl mb-4" aria-hidden="true">{b.icono}</p>
                <h3 className="text-black font-black text-lg mb-2">{b.titulo}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{b.texto}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
