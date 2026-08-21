/**
 * Stats — cifras de la marca (fondo negro).
 * Extraída de App.jsx sin cambios (refactor lote 2).
 */
import { formatNumber } from '../lib/utils';
import { RevealOnScroll } from '../components/ui';
import { CONFIG } from '../data/config';

export default function Stats() {
  const items = [
    { valor: CONFIG.stats.prendas, sufijo: '+', etiqueta: 'Prendas disponibles', icono: '👕' },
    { valor: CONFIG.stats.clientes, sufijo: '+', etiqueta: 'Clientes felices', icono: '😊' },
    { valor: CONFIG.stats.ciudades, sufijo: '', etiqueta: 'Ciudades con envíos', icono: '📍' },
    { valor: CONFIG.stats.years, sufijo: '', etiqueta: 'Años de la marca', icono: '🏆' },
  ];
  return (
    <section className="py-14 px-4 sm:px-8 bg-black" aria-label="Cifras de FAYD">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, i) => (
          <RevealOnScroll key={item.etiqueta} delay={i * 100}>
            <div className="text-center">
              <p className="text-3xl mb-2" aria-hidden="true">{item.icono}</p>
              <p className="text-white text-4xl font-black">
                {formatNumber(item.valor)}
                <span className="text-red-500">{item.sufijo}</span>
              </p>
              <p className="text-white/50 text-sm mt-1">{item.etiqueta}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
