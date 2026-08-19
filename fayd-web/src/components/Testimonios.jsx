function Testimonios() {
  return (
    <section className="py-16 px-4 bg-[#0A1931] border-y border-white/5">
      <h2 className="text-3xl font-black text-center mb-10">LO QUE DICEN <span className="text-[#2E6BFF]">LAS FAMILIAS</span></h2>
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-sm text-white/70 mb-4">"Mi hijo llegó sin confianza y en 2 meses ya es titular."</p>
          <p className="font-bold text-sm">Mamá de Santiago, 10 años</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <p className="text-sm text-white/70 mb-4">Aquí irá tu video de entrevista. Pega link de YouTube.</p>
          <p className="font-bold text-sm">Papá de Mateo, 12 años</p>
        </div>
      </div>
    </section>
  )
}
export default Testimonios;