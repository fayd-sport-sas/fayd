/**
 * Newsletter — captura de email (pendiente integrar con servicio real).
 * Extraída de App.jsx sin cambios (refactor lote 2).
 */
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // TODO: integrar con WhatsApp Business API o servicio de email
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="py-16 px-4 sm:px-8 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-black text-2xl font-black">
          Recibe <span className="text-red-600">novedades</span> y descuentos
        </h3>
        <p className="text-neutral-400 text-sm mt-2">
          Sé el primero en conocer nuevos productos y ofertas exclusivas.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2 mt-6 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="flex-1 px-4 py-3 rounded-full border-2 border-neutral-200 text-sm text-black placeholder-neutral-300 focus:outline-none focus:border-red-600 transition-colors"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-neutral-800 transition-colors whitespace-nowrap"
          >
            {sent ? '✅ Enviado' : 'Suscribir'}
          </button>
        </form>
      </div>
    </section>
  );
}
