import { useEffect, useState } from "react";

/**
 * Sección de Tendencias — lo que publica el agente (/publicar-web).
 * Modelo de diseño z.ai con paleta del club (#1A3A8A / #4A8BFF):
 * 4 botones tipo píldora; cada uno despliega su grupo en un panel
 * expandible de altura fija que se lee con scroll interno.
 * Las tarjetas se amplían al hacer clic (modal de lectura con scroll).
 */

const pad2 = (n) => String(n).padStart(2, "0");

export default function SeccionTendencias() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [activa, setActiva] = useState("producto");
  const [abierta, setAbierta] = useState(null);

  useEffect(() => {
    fetch("/content/tendencias-latest.json")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el contenido");
        return res.json();
      })
      .then((json) => setDatos(json))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  // Cerrar el modal con Escape y bloquear el scroll de fondo
  useEffect(() => {
    if (!abierta) return;
    const onKey = (e) => { if (e.key === "Escape") setAbierta(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [abierta]);

  if (cargando) return (
    <section id="tendencias" className="w-full py-16 px-4" aria-label="Tendencias">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-white/40 animate-pulse">Cargando tendencias…</p>
      </div>
    </section>
  );

  if (error || !datos) return (
    <section id="tendencias" className="w-full py-16 px-4" aria-label="Tendencias">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-white/30 text-sm">Las tendencias se están actualizando. Volvé en un rato.</p>
      </div>
    </section>
  );

  const fechaFormateada = datos.fecha_publicacion
    ? new Date(datos.fecha_publicacion).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })
    : "";

  const grupos = [
    { id: "producto", numero: "01", etiqueta: "Lo que está en tendencia", items: datos.tendencias_producto || [] },
    { id: "redes", numero: "02", etiqueta: "Tendencias en redes", items: datos.tendencias_contenido || [] },
    { id: "ideas", numero: "03", etiqueta: "Ideas listas para grabar", items: datos.ideas_contenido || [] },
    { id: "campana", numero: "04", etiqueta: "Sugerencias de campañas", items: datos.sugerencias_campana || [] },
  ].filter((g) => g.items.length > 0);

  return (
    <section id="tendencias" className="w-full py-16 sm:py-20 px-4 sm:px-8" aria-labelledby="tendencias-title">
      <div className="max-w-6xl mx-auto">

        {/* Encabezado centrado */}
        <header className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4A8BFF]/30 bg-[#1A3A8A]/20 text-[#4A8BFF] text-xs font-semibold tracking-[2px] uppercase mb-5">
            Tendencias del mercado
          </span>
          <h2 id="tendencias-title" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Tendencias y{" "}
            <span className="bg-gradient-to-r from-[#4A8BFF] to-[#6AABFF] bg-clip-text text-transparent">Novedades</span>
          </h2>
          {fechaFormateada && (
            <p className="text-white/40 text-sm">
              Actualizado: {fechaFormateada}
            </p>
          )}
        </header>

        {/* Botones: cada uno despliega su sección */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6" role="tablist" aria-label="Secciones de tendencias">
          {grupos.map((g) => {
            const esActiva = activa === g.id;
            return (
              <button
                key={g.id}
                type="button"
                role="tab"
                aria-selected={esActiva}
                aria-controls={`panel-${g.id}`}
                onClick={() => setActiva(g.id)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF] ${
                  esActiva
                    ? "bg-gradient-to-r from-[#1A3A8A] to-[#4A8BFF] text-white shadow-lg shadow-[#1A3A8A]/40 scale-105"
                    : "bg-white/5 text-white/70 border border-white/10 hover:border-[#4A8BFF]/50 hover:text-white"
                }`}
              >
                <span className={`tabular-nums text-xs ${esActiva ? "text-white/70" : "text-[#4A8BFF]"}`}>{g.numero}</span>
                {g.etiqueta}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full tabular-nums ${esActiva ? "bg-white/20 text-white" : "bg-white/10 text-white/50"}`}>
                  {g.items.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panel expandible de altura fija, se lee con scroll */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <div
            className="max-h-[26rem] overflow-y-auto p-5 sm:p-6"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#4A8BFF transparent" }}
          >
            {/* 01 — Tendencias de producto */}
            {activa === "producto" && (
              <ul id="panel-producto" role="tabpanel" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
                {datos.tendencias_producto.map((t, i) => (
                  <li key={i}>
                    <article
                      onClick={() => setAbierta({ tipo: "producto", item: t, indice: i })}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setAbierta({ tipo: "producto", item: t, indice: i }); } }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Ampliar: ${t.tendencia}`}
                      className="group h-full cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-[#4A8BFF]/40 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF]"
                    >
                      <div className="text-3xl font-extrabold text-white/10 tabular-nums mb-2 group-hover:text-[#4A8BFF]/25 transition-colors">{pad2(i + 1)}</div>
                      <h4 className="text-white font-bold text-sm mb-2 leading-snug">{t.tendencia}</h4>
                      <p className="text-white/50 text-xs leading-relaxed line-clamp-3">{t.descripcion}</p>
                      {t.fuente && (
                        <p className="mt-3 text-[11px] text-white/30 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#4A8BFF]" aria-hidden="true" />
                          {t.fuente}
                        </p>
                      )}
                    </article>
                  </li>
                ))}
              </ul>
            )}

            {/* 02 — Tendencias en redes */}
            {activa === "redes" && (
              <ul id="panel-redes" role="tabpanel" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
                {datos.tendencias_contenido.map((item, i) => (
                  <li key={i}>
                    <article
                      onClick={() => setAbierta({ tipo: "redes", item, indice: i })}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setAbierta({ tipo: "redes", item, indice: i }); } }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Ampliar: ${item.formato}`}
                      className="h-full cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-[#4A8BFF]/40 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF]"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="text-3xl font-extrabold text-white/10 tabular-nums">{pad2(i + 1)}</div>
                        {item.plataforma && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#4A8BFF]/30 bg-[#1A3A8A]/20 text-[#4A8BFF] text-[11px] font-semibold tracking-wide">
                            {item.plataforma}
                          </span>
                        )}
                      </div>
                      <h4 className="text-white font-bold text-sm mb-2 leading-snug">{item.formato}</h4>
                      <p className="text-white/50 text-xs leading-relaxed line-clamp-3">{item.descripcion}</p>
                    </article>
                  </li>
                ))}
              </ul>
            )}

            {/* 03 — Ideas de contenido */}
            {activa === "ideas" && (
              <ul id="panel-ideas" role="tabpanel" className="space-y-3 list-none">
                {datos.ideas_contenido.map((idea, i) => (
                  <li key={i}>
                    <article
                      onClick={() => setAbierta({ tipo: "ideas", item: idea, indice: i })}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setAbierta({ tipo: "ideas", item: idea, indice: i }); } }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Ampliar idea ${i + 1}`}
                      className="flex items-start gap-4 cursor-pointer rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-[#4A8BFF]/40 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF]"
                    >
                      <span className="text-sm font-bold text-[#4A8BFF] tabular-nums pt-0.5 shrink-0">{pad2(i + 1)}</span>
                      <p className="text-white/60 text-sm leading-relaxed line-clamp-2">{idea}</p>
                      <span className="text-[#4A8BFF]/50 text-lg leading-none pt-0.5 shrink-0" aria-hidden="true">⤢</span>
                    </article>
                  </li>
                ))}
              </ul>
            )}

            {/* 04 — Sugerencias de campaña */}
            {activa === "campana" && (
              <div id="panel-campana" role="tabpanel" className="bg-gradient-to-b from-[#1A3A8A]/20 via-[#1A3A8A]/5 to-transparent rounded-xl border border-[#4A8BFF]/25 p-5 sm:p-6">
                <ul className="space-y-3 list-none">
                  {datos.sugerencias_campana.map((s, i) => (
                    <li key={i}>
                      <article
                        onClick={() => setAbierta({ tipo: "campana", item: s, indice: i })}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setAbierta({ tipo: "campana", item: s, indice: i }); } }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Ampliar sugerencia ${i + 1}`}
                        className="flex items-start gap-3 cursor-pointer rounded-lg px-2 py-2 -mx-2 transition-colors duration-300 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF]"
                      >
                        <svg className="w-4 h-4 mt-1 shrink-0 text-[#4A8BFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-white/70 text-sm leading-relaxed line-clamp-2">{s}</p>
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Modal de lectura ampliada (con scroll si el texto es largo) */}
      {abierta && (() => {
        const esTexto = typeof abierta.item === "string";
        const titulos = { ideas: "Idea para grabar", campana: "Sugerencia de campaña", producto: "Tendencia", redes: "Tendencia en redes" };
        const titulo = esTexto ? `${titulos[abierta.tipo]} ${pad2(abierta.indice + 1)}` : (abierta.item.tendencia || abierta.item.formato);
        const contenido = esTexto ? abierta.item : abierta.item.descripcion;
        const plataforma = esTexto ? null : abierta.item.plataforma;
        const fuente = esTexto ? null : abierta.item.fuente;
        return (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={titulo}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setAbierta(null)}
          >
            <button
              type="button"
              onClick={() => setAbierta(null)}
              aria-label="Cerrar"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              ✕
            </button>
            <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <article
                className="bg-gradient-to-br from-[#1A3A8A]/20 to-[#4A8BFF]/20 backdrop-blur-xl border-2 border-[#4A8BFF]/40 rounded-3xl overflow-hidden shadow-2xl max-h-[80vh] overflow-y-auto"
                style={{ scrollbarWidth: "thin", scrollbarColor: "#4A8BFF transparent" }}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-5xl font-extrabold text-white/10 tabular-nums">{pad2(abierta.indice + 1)}</span>
                    {plataforma && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#4A8BFF]/30 bg-[#1A3A8A]/20 text-[#4A8BFF] text-[11px] font-semibold tracking-wide">
                        {plataforma}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-4">
                    {titulo}
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {contenido}
                  </p>
                  {fuente && (
                    <p className="mt-5 text-xs text-white/40 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#4A8BFF]" aria-hidden="true" />
                      Fuente: {fuente}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setAbierta(null)}
                    className="mt-6 w-full bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-3 rounded-xl font-bold text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8BFF]"
                  >
                    Cerrar
                  </button>
                </div>
              </article>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
