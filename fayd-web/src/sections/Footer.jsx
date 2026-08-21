/**
 * Footer — marca + redes sociales.
 * Extraído de App.jsx sin cambios (refactor lote 2).
 */
import { CONFIG } from '../data/config';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <img
            src="/foto/logo/logo_circulo.png"
            alt="Logo FAYD"
            className="w-10 h-10 object-contain"
          />
          <div>
            <p className="font-exan text-xl leading-none">
              FA<span className="text-red-500">Y</span>D
            </p>
            <p className="text-white/40 text-[10px] tracking-[0.3em]">SPORT</p>
          </div>
        </div>
        <div className="flex gap-6">
          <a href={CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-red-500 transition-colors text-sm font-semibold">
            Instagram
          </a>
          <a href={CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-red-500 transition-colors text-sm font-semibold">
            Facebook
          </a>
          <a href={CONFIG.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-red-500 transition-colors text-sm font-semibold">
            TikTok
          </a>
        </div>
        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} FAYD · Tienda de ropa deportiva
        </p>
      </div>
    </footer>
  );
}
