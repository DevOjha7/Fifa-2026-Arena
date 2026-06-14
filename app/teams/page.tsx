"use client";
import { useState } from "react";

/* ISO country codes for flagcdn.com */
const flagUrl = (code: string) => `https://flagcdn.com/w80/${code}.png`;

const allTeams = [
  /* ── GROUP A ── */
  { name: "Mexico",       code: "mx", group: "A", rank: 15, manager: "Jaime Lozano",      conf: "CONCACAF", stars: 0, accent: "#16a34a", titles: "Host Nation 🏟" },
  { name: "South Africa", code: "za", group: "A", rank: 58, manager: "Hugo Broos",        conf: "CAF",      stars: 0, accent: "#16a34a", titles: "1998 WC Debut" },
  { name: "South Korea",  code: "kr", group: "A", rank: 22, manager: "Hwang Sun-hong",    conf: "AFC",      stars: 0, accent: "#dc2626", titles: "2002 SF (WC)" },
  { name: "Czechia",      code: "cz", group: "A", rank: 36, manager: "Ivan Hašek",        conf: "UEFA",     stars: 0, accent: "#dc2626", titles: "1996 Euro RU" },
  /* ── GROUP B ── */
  { name: "Canada",       code: "ca", group: "B", rank: 49, manager: "Jesse Marsch",      conf: "CONCACAF", stars: 0, accent: "#dc2626", titles: "Host Nation 🏟" },
  { name: "Bosnia",       code: "ba", group: "B", rank: 71, manager: "Savo Milošević",    conf: "UEFA",     stars: 0, accent: "#1d4ed8", titles: "2014 WC Debut" },
  { name: "Qatar",        code: "qa", group: "B", rank: 34, manager: "Tintín Márquez",    conf: "AFC",      stars: 0, accent: "#7c3aed", titles: "2022 Hosts" },
  { name: "Switzerland",  code: "ch", group: "B", rank: 19, manager: "Murat Yakin",       conf: "UEFA",     stars: 0, accent: "#dc2626", titles: "3× QF (WC)" },
  /* ── GROUP C ── */
  { name: "Brazil",       code: "br", group: "C", rank: 5,  manager: "Dorival Júnior",    conf: "CONMEBOL", stars: 5, accent: "#16a34a", titles: "5× World Champion" },
  { name: "Morocco",      code: "ma", group: "C", rank: 13, manager: "Walid Regragui",    conf: "CAF",      stars: 0, accent: "#dc2626", titles: "2022 SF (WC)" },
  { name: "Haiti",        code: "ht", group: "C", rank: 90, manager: "Gabriel Calderón",  conf: "CONCACAF", stars: 0, accent: "#1d4ed8", titles: "1974 WC App." },
  { name: "Scotland",     code: "gb-sct", group: "C", rank: 39, manager: "Steve Clarke", conf: "UEFA",     stars: 0, accent: "#1d4ed8", titles: "Historic Qualifier" },
  /* ── GROUP D ── */
  { name: "United States",code: "us", group: "D", rank: 11, manager: "Gregg Berhalter",   conf: "CONCACAF", stars: 0, accent: "#1d4ed8", titles: "Host Nation 🏟" },
  { name: "Paraguay",     code: "py", group: "D", rank: 56, manager: "Daniel Garnero",    conf: "CONMEBOL", stars: 0, accent: "#dc2626", titles: "2010 QF (WC)" },
  { name: "Australia",    code: "au", group: "D", rank: 24, manager: "Graham Arnold",     conf: "AFC",      stars: 0, accent: "#ca8a04", titles: "2022 R16 (WC)" },
  { name: "Türkiye",      code: "tr", group: "D", rank: 40, manager: "Vincenzo Montella", conf: "UEFA",     stars: 0, accent: "#dc2626", titles: "2002 3rd Place" },
  /* ── GROUP E ── */
  { name: "Germany",      code: "de", group: "E", rank: 16, manager: "Julian Nagelsmann", conf: "UEFA",     stars: 4, accent: "#ca8a04", titles: "4× World Champion" },
  { name: "Curaçao",      code: "cw", group: "E", rank: 91, manager: "Dick Advocaat",     conf: "CONCACAF", stars: 0, accent: "#1d4ed8", titles: "Historic Debut" },
  { name: "Ivory Coast",  code: "ci", group: "E", rank: 38, manager: "Emerse Faé",        conf: "CAF",      stars: 0, accent: "#f59e0b", titles: "AFCON 2023 Champ." },
  { name: "Ecuador",      code: "ec", group: "E", rank: 31, manager: "Félix Sánchez",     conf: "CONMEBOL", stars: 0, accent: "#ca8a04", titles: "Back-to-Back WC" },
  /* ── GROUP F ── */
  { name: "Netherlands",  code: "nl", group: "F", rank: 7,  manager: "Ronald Koeman",     conf: "UEFA",     stars: 0, accent: "#ea580c", titles: "3× Runner-Up" },
  { name: "Japan",        code: "jp", group: "F", rank: 18, manager: "Hajime Moriyasu",   conf: "AFC",      stars: 0, accent: "#dc2626", titles: "Asia's Best" },
  { name: "Sweden",       code: "se", group: "F", rank: 27, manager: "Jon Dahl Tomasson", conf: "UEFA",     stars: 0, accent: "#ca8a04", titles: "1958 Runner-Up" },
  { name: "Tunisia",      code: "tn", group: "F", rank: 41, manager: "Montasser Louhichi",conf: "CAF",      stars: 0, accent: "#dc2626", titles: "6× WC App." },
  /* ── GROUP G ── */
  { name: "Belgium",      code: "be", group: "G", rank: 3,  manager: "Domenico Tedesco",  conf: "UEFA",     stars: 0, accent: "#dc2626", titles: "2018 3rd Place" },
  { name: "Egypt",        code: "eg", group: "G", rank: 36, manager: "Hossam Hassan",     conf: "CAF",      stars: 0, accent: "#dc2626", titles: "7× AFCON Champ." },
  { name: "Iran",         code: "ir", group: "G", rank: 20, manager: "Amir Ghalenoei",    conf: "AFC",      stars: 0, accent: "#16a34a", titles: "AFC Cup Record" },
  { name: "New Zealand",  code: "nz", group: "G", rank: 104,manager: "Darren Bazeley",    conf: "OFC",      stars: 0, accent: "#000000", titles: "OFC Nations Cup" },
  /* ── GROUP H ── */
  { name: "Spain",        code: "es", group: "H", rank: 8,  manager: "Luis de la Fuente", conf: "UEFA",     stars: 1, accent: "#dc2626", titles: "1× World Champion" },
  { name: "Cabo Verde",   code: "cv", group: "H", rank: 65, manager: "Bubista",           conf: "CAF",      stars: 0, accent: "#C8102E", titles: "Historic Debut" },
  { name: "Saudi Arabia", code: "sa", group: "H", rank: 53, manager: "Roberto Mancini",   conf: "AFC",      stars: 0, accent: "#16a34a", titles: "2022 Upset Kings" },
  { name: "Uruguay",      code: "uy", group: "H", rank: 15, manager: "Marcelo Bielsa",    conf: "CONMEBOL", stars: 2, accent: "#C8102E", titles: "2× World Champion" },
  /* ── GROUP I ── */
  { name: "France",       code: "fr", group: "I", rank: 2,  manager: "Didier Deschamps",  conf: "UEFA",     stars: 2, accent: "#2563eb", titles: "2× World Champion" },
  { name: "Senegal",      code: "sn", group: "I", rank: 17, manager: "Aliou Cissé",       conf: "CAF",      stars: 0, accent: "#16a34a", titles: "AFCON 2022 Champ." },
  { name: "Iraq",         code: "iq", group: "I", rank: 58, manager: "Jesús Casas",       conf: "AFC",      stars: 0, accent: "#16a34a", titles: "1986 WC App." },
  { name: "Norway",       code: "no", group: "I", rank: 47, manager: "Ståle Solbakken",   conf: "UEFA",     stars: 0, accent: "#dc2626", titles: "1998 R16 (WC)" },
  /* ── GROUP J ── */
  { name: "Argentina",    code: "ar", group: "J", rank: 1,  manager: "Lionel Scaloni",    conf: "CONMEBOL", stars: 3, accent: "#C9A84C", titles: "3× World Champion" },
  { name: "Algeria",      code: "dz", group: "J", rank: 43, manager: "Vladimir Petković", conf: "CAF",      stars: 0, accent: "#16a34a", titles: "2014 R16 (WC)" },
  { name: "Austria",      code: "at", group: "J", rank: 25, manager: "Ralf Rangnick",     conf: "UEFA",     stars: 0, accent: "#dc2626", titles: "1954 3rd Place" },
  { name: "Jordan",       code: "jo", group: "J", rank: 71, manager: "Hussein Ammouta",   conf: "AFC",      stars: 0, accent: "#dc2626", titles: "1st WC Appearance" },
  /* ── GROUP K ── */
  { name: "Portugal",     code: "pt", group: "K", rank: 6,  manager: "Roberto Martínez",  conf: "UEFA",     stars: 0, accent: "#b91c1c", titles: "Euro 2016 Champ." },
  { name: "DR Congo",     code: "cd", group: "K", rank: 63, manager: "Sébastien Desabre", conf: "CAF",      stars: 0, accent: "#C8102E", titles: "1974 WC App." },
  { name: "Uzbekistan",   code: "uz", group: "K", rank: 64, manager: "Srečko Katanec",    conf: "AFC",      stars: 0, accent: "#C8102E", titles: "Historic Debut" },
  { name: "Colombia",     code: "co", group: "K", rank: 12, manager: "Néstor Lorenzo",    conf: "CONMEBOL", stars: 0, accent: "#ca8a04", titles: "2014 QF (WC)" },
  /* ── GROUP L ── */
  { name: "England",      code: "gb-eng", group: "L", rank: 4,  manager: "Gareth Southgate",conf: "UEFA",     stars: 1, accent: "#dc2626", titles: "1× World Champion" },
  { name: "Croatia",      code: "hr", group: "L", rank: 10, manager: "Zlatko Dalić",      conf: "UEFA",     stars: 0, accent: "#dc2626", titles: "Runner-Up 2018" },
  { name: "Ghana",        code: "gh", group: "L", rank: 68, manager: "Otto Addo",         conf: "CAF",      stars: 0, accent: "#eab308", titles: "2010 QF (WC)" },
  { name: "Panama",       code: "pa", group: "L", rank: 45, manager: "Thomas Christiansen",conf: "CONCACAF", stars: 0, accent: "#dc2626", titles: "2nd WC App." }
];

const confs = ["All", "UEFA", "CONMEBOL", "CONCACAF", "AFC", "CAF", "OFC"];
const INITIAL_SHOW = 16;

export default function Teams() {
  const [activeConf, setActiveConf] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = activeConf === "All" ? allTeams : allTeams.filter((t) => t.conf === activeConf);
  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_SHOW);
  const hasMore = filtered.length > INITIAL_SHOW && !showAll;

  return (
    <div className="relative min-h-screen">
      {/* Mascot Image */}
      <div className="fixed top-20 right-4 md:top-24 md:right-10 z-[100] w-32 md:w-48 pointer-events-none drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)]">
        <img src="/mascot3.jpg" alt="Mascot" className="w-full h-auto rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-white/20" style={{ transform: "rotate(-4deg)" }} />
      </div>
      <div className="fixed inset-0 z-[-2] bg-cover" style={{ backgroundImage: "url('/bg-teams.jpg')", backgroundPosition: "center 20%" }}></div>
      <div className="fixed inset-0 z-[-1] bg-[#0D1042]/80 backdrop-blur-[2px]"></div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-12">

        {/* Header */}
        <div className="mb-12">
          <div className="badge badge-primary inline-flex mb-4">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
            48 Nations · FIFA World Cup 2026
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-[52px] tracking-tight mb-4" style={{ color: "#f8fafc" }}>
            World Cup <span className="gradient-text-primary">Teams</span>
          </h1>
          <p className="font-body-lg" style={{ color: "#B8BDD9", maxWidth: "520px" }}>
            All 48 qualified nations competing for glory across USA, Canada &amp; Mexico.
            {activeConf !== "All" && <span style={{ color: "#C8102E", fontWeight: 600 }}> Showing {filtered.length} {activeConf} teams.</span>}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Teams", value: "48", icon: "groups", color: "#C8102E" },
            { label: "Confederations", value: "6", icon: "public", color: "#f59e0b" },
            { label: "Host Countries", value: "3", icon: "location_on", color: "#C8102E" },
            { label: "Total Matches", value: "104", icon: "sports_soccer", color: "#f59e0b" },
          ].map((s) => (
            <div key={s.label} className="stat-card flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.color === "#C8102E" ? "rgba(201,168,76,0.1)" : "#fef3c7" }}>
                <span className="material-symbols-outlined text-xl" style={{ color: s.color, fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
              </div>
              <div>
                <p style={{ fontFamily: "Outfit", fontSize: "26px", fontWeight: 800, color: "#f8fafc", lineHeight: 1.1 }}>{s.value}</p>
                <p style={{ fontFamily: "JetBrains Mono", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8BDD9", marginTop: "3px" }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Confederation Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {confs.map((c) => {
            const isActive = c === activeConf;
            return (
              <button
                key={c}
                onClick={() => { setActiveConf(c); setShowAll(false); }}
                className="px-5 py-2 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-200"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  background: isActive ? "#C8102E" : "#ffffff",
                  color: isActive ? "#ffffff" : "#B8BDD9",
                  border: isActive ? "none" : "1px solid #e2e8f0",
                  boxShadow: isActive ? "0 4px 12px rgba(200, 16, 46,0.3)" : "0 1px 2px rgba(0,0,0,0.04)",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
          {displayed.map((t) => (
            <div
              key={t.name}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:translate-y-[-3px]"
            >
              {/* Flag Image Banner */}
              <div
                className="relative h-36 overflow-hidden flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${t.accent}18 0%, #0D1042 60%, ${t.accent}08 100%)` }}
              >
                {/* Deep radial glow behind flag */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 80% 70% at 50% 55%, ${t.accent}35 0%, ${t.accent}10 45%, transparent 75%)`,
                  }}
                />
                {/* Outer soft halo ring */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: "130px",
                    height: "90px",
                    background: `radial-gradient(ellipse at center, ${t.accent}22 0%, transparent 70%)`,
                    filter: "blur(10px)",
                  }}
                />
                {/* Crystal-clear flag */}
                <img
                  src={`https://flagcdn.com/w160/${t.code}.png`}
                  alt={`${t.name} flag`}
                  className="relative z-10 object-contain transition-transform duration-500 group-hover:scale-110"
                  style={{
                    width: "152px",
                    height: "auto",
                    maxWidth: "160px",
                    imageRendering: "crisp-edges",
                    filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.55)) drop-shadow(0 0 12px rgba(255,255,255,0.08)) contrast(1.08) saturate(1.2)",
                    borderRadius: "4px",
                  }}
                />
                {/* Glass shine overlay on flag */}
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 50%)" }}
                />
                {/* Group badge */}
                <div className="absolute top-3 left-3 z-30">
                  <span style={{ fontFamily: "JetBrains Mono", fontSize: "10px", fontWeight: 700, color: "#F8F9FF", background: "rgba(13,16,66,0.75)", padding: "3px 8px", borderRadius: "6px", border: `1px solid ${t.accent}40`, backdropFilter: "blur(8px)", boxShadow: `0 0 8px ${t.accent}30` }}>
                    Group {t.group}
                  </span>
                </div>
                {/* Rank */}
                <div className="absolute top-3 right-3 z-30">
                  <span style={{ fontFamily: "JetBrains Mono", fontSize: "9px", fontWeight: 700, color: "#C9A84C", background: "rgba(13,16,66,0.75)", padding: "3px 7px", borderRadius: "6px", border: "1px solid rgba(201,168,76,0.4)", backdropFilter: "blur(8px)" }}>
                    #{t.rank}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5" style={{ borderLeft: `3px solid ${t.accent}` }}>
                <div className="flex items-start justify-between mb-1">
                  <h2
                    style={{ fontFamily: "Outfit", fontSize: "18px", fontWeight: 800, color: "#f8fafc", lineHeight: 1.2 }}
                    className="group-hover:text-[#C8102E] transition-colors"
                  >
                    {t.name}
                  </h2>
                </div>
                <p style={{ fontFamily: "JetBrains Mono", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#B8BDD9", marginBottom: "8px" }}>{t.conf}</p>
                <p style={{ fontSize: "12px", color: "#cbd5e1", marginBottom: "6px" }}>
                  <span className="material-symbols-outlined text-[12px] mr-1" style={{ verticalAlign: "middle" }}>person</span>
                  {t.manager}
                </p>
                <p style={{ fontSize: "11px", fontWeight: 600, color: t.accent, marginBottom: t.stars > 0 ? "8px" : "14px" }}>{t.titles}</p>

                {t.stars > 0 && (
                  <div className="flex items-center gap-0.5 mb-3">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[13px]" style={{ color: "#f59e0b", fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                )}

                <a
                  href={`/matches?team=${t.code}`}
                  className="w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-200 block text-center hover:scale-[1.02]"
                  style={{ background: `${t.accent}12`, border: `1px solid ${t.accent}30`, color: t.accent }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${t.accent}22`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = `${t.accent}12`; }}
                >
                  View Matches
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Show All / Show Less */}
        <div className="glass-card rounded-2xl p-10 text-center relative overflow-hidden mb-2">
          <div className="absolute inset-0 glow-bg-primary opacity-50 pointer-events-none" />
          <div className="relative z-10">
            <span className="material-symbols-outlined text-4xl mb-3 block" style={{ color: "#C8102E", fontVariationSettings: "'FILL' 1" }}>sports_soccer</span>
            <p className="font-headline-lg mb-2" style={{ color: "#f8fafc" }}>
              Showing <strong style={{ color: "#C8102E" }}>{displayed.length}</strong> of <strong>{filtered.length}</strong> Qualified Nations
            </p>
            <p style={{ color: "#cbd5e1", fontSize: "14px", marginBottom: "20px" }}>
              {hasMore
                ? `${filtered.length - INITIAL_SHOW} more teams from ${activeConf === "All" ? "all confederations" : activeConf} are ready to view.`
                : "You're viewing all qualified nations for FIFA World Cup 2026."}
            </p>
            {hasMore ? (
              <button className="btn-primary" onClick={() => setShowAll(true)}>
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
                View All {filtered.length} Teams
              </button>
            ) : filtered.length > INITIAL_SHOW ? (
              <button className="btn-outline" onClick={() => setShowAll(false)}>
                <span className="material-symbols-outlined text-[18px]">expand_less</span>
                Show Less
              </button>
            ) : null}
          </div>
        </div>

      </div>
    </div>
  );
}

