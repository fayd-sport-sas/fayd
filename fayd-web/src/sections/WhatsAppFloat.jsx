/**
 * Botón flotante de WhatsApp.
 * Extraído de App.jsx sin cambios (refactor lote 2).
 */
import { buildWaLink } from '../lib/utils';
import { CONFIG } from '../data/config';

export default function WhatsAppFloat() {
  return (
    <a
      href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 bg-[#25D366] hover:scale-110 transition-transform rounded-full shadow-xl flex items-center justify-center text-white text-2xl"
    >
      💬
    </a>
  );
}
