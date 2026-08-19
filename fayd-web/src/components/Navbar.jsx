import { useState, useEffect } from 'react';
function Navbar({ plazas }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 flex justify-between items-center px-4 sm:px-8 py-3 border-b transition-all duration-300 ${scrolled? 'bg-black/90 backdrop-blur-md border-white/10' : 'bg-black/80 backdrop-blur-md border-white/10'}`}>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-[#FF6B00] rounded-xl flex items-center justify-center font-black text-black text-xl">
          A
        </div>
        <div>
          <h1 className="font-black text-lg leading-none">AC<span className="text-[#FF6B00]">RUX</span></h1>
          <p className="text- text-white/40 tracking- leading-none">FÚTBOL CLUB</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 bg-[#FF6B00]/10 border border-[#FF6B00]/30 px-3 py-1 rounded-full text-xs font-bold text-[#FF6B00]">
          <span className="w-2 h-2 bg-[#FF6B00] rounded-full animate-pulse"></span>
          {plazas} plazas libres
        </div>
        <a href="#contacto" className="bg-[#FF6B00] hover:bg-[#E05A00] transition-all px-4 sm:px-6 py-2 rounded-full font-bold text-sm text-black hover:scale-105">
          <span className="hidden sm:inline">¡Quiero probar!</span>
          <span className="sm:hidden">🔥</span>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;