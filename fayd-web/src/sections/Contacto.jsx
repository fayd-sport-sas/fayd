/**
 * Contacto — WhatsApp, envíos y medios de pago (con copiar al portapapeles).
 * Extraída de App.jsx sin cambios (refactor lote 2).
 */
import { useState } from 'react';
import { cls, buildWaLink } from '../lib/utils';
import { Button, SectionHeader } from '../components/ui';
import { CONFIG } from '../data/config';

function PagoCard({ metodo }) {
  const [copiado, setCopiado] = useState(false);
  const datos = CONFIG.pagos[metodo.id];
  const numeroFmt = datos.numero.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(datos.numero);
    } catch {
      // fallback para navegadores viejos
      const ta = document.createElement('textarea');
      ta.value = datos.numero;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="border-2 border-neutral-100 rounded-xl p-4 flex flex-col gap-1 hover:border-red-600/40 transition-colors">
      <p className="font-black text-black text-sm">
        <span aria-hidden="true">{metodo.emoji}</span> {metodo.nombre}
      </p>
      <p className="text-neutral-500 text-xs">{numeroFmt}</p>
      <p className="text-neutral-400 text-[10px]">a nombre de {datos.titular}</p>
      <button
        type="button"
        onClick={copiar}
        className={cls(
          'mt-1 text-[11px] font-bold rounded-full py-1.5 transition-colors',
          copiado ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-neutral-800'
        )}
      >
        {copiado ? '✓ Copiado' : 'Copiar número'}
      </button>
    </div>
  );
}

export default function Contacto() {
  return (
    <section id="contacto" className="py-20 sm:py-24 px-4 sm:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeader
          eyebrow="Contacto"
          title="HAZ TU"
          highlight="PEDIDO"
          description="Escríbenos por WhatsApp y te respondemos al instante. Enviamos a todo el país."
        />
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="border-2 border-neutral-100 rounded-2xl p-6">
            <p className="text-3xl mb-3">💬</p>
            <h3 className="font-black text-black">WhatsApp</h3>
            <a
              href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 font-bold text-sm hover:underline"
            >
              Escríbenos ahora
            </a>
          </div>
          <div className="border-2 border-neutral-100 rounded-2xl p-6">
            <p className="text-3xl mb-3">🚚</p>
            <h3 className="font-black text-black">Envíos</h3>
            <p className="text-neutral-500 text-sm mt-1">
              {CONFIG.shipping.cities}
              <br />
              {CONFIG.shipping.time}
            </p>
          </div>
          <div className="border-2 border-neutral-100 rounded-2xl p-6 col-span-1 sm:col-span-3">
            <p className="text-3xl mb-3">💳</p>
            <h3 className="font-black text-black mb-1">Medios de pago</h3>
            <p className="text-neutral-500 text-sm mb-4">Paga como te sea más cómodo. Envíanos el comprobante por WhatsApp y despachamos el mismo día.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { id: 'nequi', nombre: 'Nequi', emoji: '💜' },
                { id: 'daviplata', nombre: 'Daviplata', emoji: '❤️' },
                { id: 'breb', nombre: 'BRE-B', emoji: '💙' },
              ].map((metodo) => (
                <PagoCard key={metodo.id} metodo={metodo} />
              ))}
              <div className="border-2 border-neutral-100 rounded-xl p-4 flex flex-col justify-center bg-neutral-50">
                <p className="text-xs text-neutral-400 text-center leading-relaxed">
                  🚚 <strong className="text-black">Contra entrega</strong>
                  <br />
                  {CONFIG.pagos.contraEntrega}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Button
          href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)}
          className="px-10 py-4 text-base"
        >
          🛍️ Quiero comprar
        </Button>
      </div>
    </section>
  );
}
