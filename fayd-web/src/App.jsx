/**
 * FAYD — Tienda de Ropa Deportiva
 * ─────────────────────────────────────────────
 * Página oficial de la marca FAYD.
 * Paleta: blanco (fondo) · negro (texto) · rojo (acentos).
 *
 * Estructura (refactor lote 2 — antes todo vivía en este archivo):
 *   src/lib/         utilidades y hooks
 *   src/data/        constantes y contenido editorial
 *   src/components/  primitivas UI (Button, SectionHeader, VisorAngulos…)
 *   src/sections/    una sección de la página por archivo
 *
 * Integraciones con fayd-content-system:
 *   /content/catalogo.json  → catálogo dinámico (sección Catálogo)
 *   /content/galeria.json   → muro "En tendencia" (sección Galería)
 *   /content/noticias.json  → carrusel de fútbol local (Noticias)
 */

import { useEffect } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import Catalogo from './sections/Catalogo';
import SeccionCalzado from './sections/SeccionCalzado';
import SeccionUniformes from './sections/SeccionUniformes';
import LooksFayd from './sections/LooksFayd';
import NoticiasDeportistas from './sections/NoticiasDeportistas';
import Galeria from './sections/Galeria';
import InfoSection from './sections/InfoSection';
import Testimonios from './sections/Testimonios';
import Newsletter from './sections/Newsletter';
import Contacto from './sections/Contacto';
import Footer from './sections/Footer';
import WhatsAppFloat from './sections/WhatsAppFloat';

// ════════════════════════════════════════════
// BARRA DE ANUNCIO SUPERIOR
// ════════════════════════════════════════════
function AnnouncementBar() {
  return (
    <div className="bg-black text-white text-center text-xs sm:text-sm py-2 px-4 font-semibold tracking-wide">
      🚚 Envíos a todo Colombia · 💳 Nequi · Daviplata · BRE-B · 🇨🇴 Hecho en Colombia
    </div>
  );
}

// ════════════════════════════════════════════
// APP
// ════════════════════════════════════════════
export default function App() {
  useEffect(() => {
    document.title = 'FAYD — Ropa Deportiva';
  }, []);

  return (
    <div className="bg-white text-black min-h-screen font-sans overflow-x-hidden antialiased">
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Catalogo />
        <SeccionCalzado />
        <SeccionUniformes />
        <LooksFayd />
        <NoticiasDeportistas />
        <Galeria />
        <InfoSection />
        <Testimonios />
        <Newsletter />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
