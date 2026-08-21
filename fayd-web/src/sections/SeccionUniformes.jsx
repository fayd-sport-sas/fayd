/**
 * Uniformes B2B — cotizador interactivo + proceso.
 * Extraída de App.jsx sin cambios (refactor lote 2).
 */
import { useState } from 'react';
import { cls, buildWaLink } from '../lib/utils';
import { Button, SectionHeader } from '../components/ui';
import { CONFIG } from '../data/config';
import { UNIFORME_TIPOS, UNIFORME_COLORES, UNIFORME_PASOS } from '../data/uniformes';

export default function SeccionUniformes() {
  const [tipo, setTipo] = useState('futbol');
  const [colores, setColores] = useState(['negro', 'rojo']);
  const [cantidad, setCantidad] = useState(12);

  const toggleColor = (id) => {
    setColores((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const tipoObj = UNIFORME_TIPOS.find((t) => t.id === tipo) || UNIFORME_TIPOS[0];
  const nombresColores = colores.length
    ? colores.map((c) => UNIFORME_COLORES.find((x) => x.id === c)?.label).join(' y ')
    : 'por definir';
  const msg = `Hola FAYD, quiero cotizar ${tipoObj.whatsapp}. Colores: ${nombresColores}. Unidades aprox: ${cantidad}. Incluir escudo, nombres y números. ¿Me envían propuesta?`;

  return (
    <section id="uniformes" className="py-20 sm:py-24 px-4 sm:px-8 bg-neutral-50 border-y border-neutral-100">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Uniformes personalizados"
          title="TU EQUIPO, TUS"
          highlight="COLORES"
          description="Sublimación full print con tu escudo, nombres y números. Para equipos, colegios, empresas y gimnasios. Desde 6 unidades."
        />

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Cotizador interactivo */}
          <div className="bg-white border-2 border-neutral-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-black font-black text-lg mb-1">Arma tu uniforme en 30 segundos</h3>
            <p className="text-neutral-400 text-xs mb-6">Configura y te cotizamos por WhatsApp — gratis y sin compromiso.</p>

            {/* Tipo de cliente */}
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2">¿Para quién es?</p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {UNIFORME_TIPOS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTipo(t.id)}
                  className={cls(
                    'text-xs font-bold rounded-xl border-2 px-3 py-2.5 transition-all text-left',
                    tipo === t.id
                      ? 'border-red-600 bg-red-50 text-black'
                      : 'border-neutral-100 text-neutral-500 hover:border-neutral-300'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Colores */}
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2">Elige 2 colores</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {UNIFORME_COLORES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggleColor(c.id)}
                  title={c.label}
                  aria-label={`Color ${c.label}`}
                  className={cls(
                    'w-9 h-9 rounded-full border-2 transition-all',
                    colores.includes(c.id)
                      ? 'border-black scale-110 ring-2 ring-red-600 ring-offset-2'
                      : 'border-neutral-200 hover:scale-105'
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>

            {/* Cantidad */}
            <div className="flex justify-between items-baseline mb-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Unidades aprox.</p>
              <p className="text-black font-black text-lg tabular-nums">{cantidad}</p>
            </div>
            <input
              type="range"
              min={6}
              max={60}
              step={1}
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="w-full accent-red-600 mb-2"
              aria-label="Cantidad de unidades"
            />
            <p className="text-[10px] text-neutral-400 mb-6">
              Mínimo 6 unidades · {cantidad >= 20 ? '🔥 descuento por volumen aplica' : 'desde 20 unidades hay descuento'}
            </p>

            {/* Vista previa + CTA */}
            <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-4 mb-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Tu pedido</p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {tipoObj.label.replace(/^\S+\s/, '')} · {nombresColores} · {cantidad} unidades · escudo + nombres + números
              </p>
            </div>
            <Button variant="whatsapp" href={buildWaLink(CONFIG.whatsapp.number, msg)} className="w-full">
              💬 Cotizar gratis por WhatsApp
            </Button>
          </div>

          {/* Beneficios + proceso */}
          <div className="flex flex-col gap-4">
            <div className="bg-black rounded-3xl p-6 sm:p-8 text-white">
              <h3 className="font-black text-lg mb-4">
                Todo <span className="text-red-500">personalizado</span>, nada genérico
              </h3>
              <ul className="space-y-2.5 text-sm text-white/70">
                <li>🛡️ Tu escudo o logo en sublimación full print</li>
                <li>✏️ Nombres y números de cada jugador</li>
                <li>🎨 Colores institucionales exactos</li>
                <li>👕 Tela dry-fit: transpirable, secado rápido</li>
                <li>👥 Tallas mixtas para hombre, mujer y niño</li>
                <li>📈 Descuentos por volumen desde 20 unidades</li>
              </ul>
            </div>
            <div className="bg-white border-2 border-neutral-100 rounded-3xl p-6 sm:p-8">
              <h3 className="text-black font-black text-lg mb-4">Cómo funciona</h3>
              <ol className="space-y-3">
                {UNIFORME_PASOS.map((p) => (
                  <li key={p.n} className="flex gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center">
                      {p.n}
                    </span>
                    <div>
                      <p className="text-black font-bold text-sm">{p.titulo}</p>
                      <p className="text-neutral-400 text-xs leading-relaxed">{p.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
