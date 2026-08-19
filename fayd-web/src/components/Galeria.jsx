function Galeria() {
  return (
    <section className="py-16 px-4 bg-[#08152F]">
      <h2 className="text-3xl font-black text-center mb-8">VIVE <span className="text-[#2E6BFF]">ACRUX</span> POR DENTRO</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="h-48 bg-white/10 rounded-xl flex items-center justify-center text-white/20">FOTO 1</div>
        <div className="h-48 bg-white/10 rounded-xl flex items-center justify-center text-white/20">FOTO 2</div>
        <div className="h-48 bg-white/10 rounded-xl flex items-center justify-center text-white/20">FOTO 3</div>
        <div className="h-48 bg-white/10 rounded-xl flex items-center justify-center text-white/20">FOTO 4</div>
        <div className="h-48 bg-white/10 rounded-xl flex items-center justify-center text-white/20">FOTO 5</div>
        <div className="h-48 bg-white/10 rounded-xl flex items-center justify-center text-white/20">FOTO 6</div>
      </div>
      <p className="text-center text-white/30 text-xs mt-4">Pon tus fotos en public/fotos/ y cambia los divs por img</p>
    </section>
  )
}
export default Galeria;