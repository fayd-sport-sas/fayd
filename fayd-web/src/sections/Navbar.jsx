/**
 * Navbar fija con menú móvil.
 * Extraída de App.jsx sin cambios (refactor lote 2).
 */
import { useState } from 'react';
import { cls, buildWaLink } from '../lib/utils';
import { useScrollY } from '../lib/hooks';
import { CONFIG, NAV_LINKS } from '../data/config';

export default function Navbar() {
  const scrolled = useScrollY(20);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={cls(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b',
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-neutral-200 shadow-sm'
          : 'bg-white/80 backdrop-blur-md border-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-8 py-3">
        <a href="#top" className="flex items-center gap-2">
          <img
            src="/foto/logo/logo_circulo.png"
            alt="Logo FAYD"
            className="w-11 h-11 object-contain"
          />
          <div>
            <h1 className="font-exan text-2xl leading-none text-black">
              FA<span className="text-red-600">Y</span>D
            </h1>
            <p className="text-neutral-400 text-[10px] tracking-[0.3em] leading-none mt-0.5">
              SPORT · <span className="text-neutral-300">🇨🇴 CO</span>
            </p>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-neutral-600 hover:text-red-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={buildWaLink(CONFIG.whatsapp.number, CONFIG.whatsapp.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all hover:scale-105"
          >
            🛍️ Comprar
          </a>
          <button
            type="button"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-neutral-200 text-black"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 py-3 px-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-neutral-700 hover:text-red-600"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
