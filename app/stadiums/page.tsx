"use client";

const stadiums = [
  /* Western Region */
  { name: "BC Place", city: "Vancouver", country: "Canada", capacity: "54,500", matches: 7, opened: 1983, surface: "Artificial Turf", highlight: "Group Stage", highlightColor: "#B8BDD9", highlightBg: "#f1f5f9", image: "/stadium_blue.jpg", imagePosition: "center", mapLink: "https://maps.google.com/?q=BC+Place+Vancouver" },
  { name: "Lumen Field", city: "Seattle", country: "USA", capacity: "69,000", matches: 6, opened: 2002, surface: "Artificial Turf", highlight: "Group Stage", highlightColor: "#B8BDD9", highlightBg: "#f1f5f9", image: "/stadium_fisheye.jpg", imagePosition: "center top", mapLink: "https://maps.google.com/?q=Lumen+Field+Seattle" },
  { name: "Levi's Stadium", city: "San Francisco Bay Area", country: "USA", capacity: "68,500", matches: 6, opened: 2014, surface: "Natural Grass", highlight: "Group Stage", highlightColor: "#B8BDD9", highlightBg: "#f1f5f9", image: "/stadium_modern.jpg", imagePosition: "center", mapLink: "https://maps.google.com/?q=Levi's+Stadium+Santa+Clara" },
  { name: "SoFi Stadium", city: "Los Angeles", country: "USA", capacity: "70,240", matches: 8, opened: 2020, surface: "Artificial Turf", highlight: "Quarter-Final", highlightColor: "#0369a1", highlightBg: "rgba(201,168,76,0.1)", image: "/stadium_red_sunset.jpg", imagePosition: "center", mapLink: "https://maps.google.com/?q=SoFi+Stadium+Los+Angeles" },
  /* Central Region */
  { name: "Estadio Akron", city: "Guadalajara", country: "Mexico", capacity: "49,850", matches: 4, opened: 2010, surface: "Natural Grass", highlight: "Group Stage", highlightColor: "#B8BDD9", highlightBg: "#f1f5f9", image: "/stadium_aerial.jpg", imagePosition: "center top", mapLink: "https://maps.google.com/?q=Estadio+Akron+Guadalajara" },
  { name: "Estadio Azteca", city: "Mexico City", country: "Mexico", capacity: "83,714", matches: 5, opened: 1966, surface: "Natural Grass", highlight: "Opening Match", highlightColor: "#92400e", highlightBg: "#fef3c7", image: "/stadium_fireworks.jpg", imagePosition: "center bottom", mapLink: "https://maps.google.com/?q=Estadio+Azteca+Mexico+City" },
  { name: "Estadio BBVA", city: "Monterrey", country: "Mexico", capacity: "53,500", matches: 4, opened: 2015, surface: "Natural Grass", highlight: "Group Stage", highlightColor: "#B8BDD9", highlightBg: "#f1f5f9", image: "/stadium_red.jpg", imagePosition: "center", mapLink: "https://maps.google.com/?q=Estadio+BBVA+Monterrey" },
  { name: "NRG Stadium", city: "Houston", country: "USA", capacity: "72,220", matches: 7, opened: 2002, surface: "Artificial Turf", highlight: "Round of 16", highlightColor: "#0369a1", highlightBg: "rgba(201,168,76,0.1)", image: "/football_stadium.png", imagePosition: "center", mapLink: "https://maps.google.com/?q=NRG+Stadium+Houston" },
  { name: "AT&T Stadium", city: "Dallas", country: "USA", capacity: "80,000", matches: 9, opened: 2009, surface: "Artificial Turf", highlight: "Semi-Final", highlightColor: "#0369a1", highlightBg: "rgba(201,168,76,0.1)", image: "/stadium_fisheye.jpg", imagePosition: "center", mapLink: "https://maps.google.com/?q=AT%26T+Stadium+Arlington+Texas" },
  { name: "Arrowhead Stadium", city: "Kansas City", country: "USA", capacity: "76,416", matches: 6, opened: 1972, surface: "Natural Grass", highlight: "Quarter-Final", highlightColor: "#0369a1", highlightBg: "rgba(201,168,76,0.1)", image: "/stadium_blue.jpg", imagePosition: "center 20%", mapLink: "https://maps.google.com/?q=Arrowhead+Stadium+Kansas+City" },
  /* Eastern Region */
  { name: "Mercedes-Benz Stadium", city: "Atlanta", country: "USA", capacity: "71,000", matches: 8, opened: 2017, surface: "Artificial Turf", highlight: "Semi-Final", highlightColor: "#0369a1", highlightBg: "rgba(201,168,76,0.1)", image: "/stadium_modern.jpg", imagePosition: "center bottom", mapLink: "https://maps.google.com/?q=Mercedes-Benz+Stadium+Atlanta" },
  { name: "Hard Rock Stadium", city: "Miami", country: "USA", capacity: "64,767", matches: 7, opened: 1987, surface: "Natural Grass", highlight: "Bronze Final", highlightColor: "#f59e0b", highlightBg: "#fef3c7", image: "/stadium_red_sunset.jpg", imagePosition: "center", mapLink: "https://maps.google.com/?q=Hard+Rock+Stadium+Miami" },
  { name: "BMO Field", city: "Toronto", country: "Canada", capacity: "45,736", matches: 6, opened: 2007, surface: "Natural Grass", highlight: "Group Stage", highlightColor: "#B8BDD9", highlightBg: "#f1f5f9", image: "/stadium_aerial.jpg", imagePosition: "center 30%", mapLink: "https://maps.google.com/?q=BMO+Field+Toronto" },
  { name: "Gillette Stadium", city: "Boston", country: "USA", capacity: "65,878", matches: 7, opened: 2002, surface: "Artificial Turf", highlight: "Quarter-Final", highlightColor: "#0369a1", highlightBg: "rgba(201,168,76,0.1)", image: "/stadium_fireworks.jpg", imagePosition: "center 20%", mapLink: "https://maps.google.com/?q=Gillette+Stadium+Boston" },
  { name: "Lincoln Financial Field", city: "Philadelphia", country: "USA", capacity: "69,796", matches: 6, opened: 2003, surface: "Natural Grass", highlight: "Round of 16", highlightColor: "#0369a1", highlightBg: "rgba(201,168,76,0.1)", image: "/stadium_red.jpg", imagePosition: "center 40%", mapLink: "https://maps.google.com/?q=Lincoln+Financial+Field+Philadelphia" },
  { name: "MetLife Stadium", city: "New York / New Jersey", country: "USA", capacity: "82,500", matches: 8, opened: 2010, surface: "Artificial Turf", highlight: "Grand Final", highlightColor: "#f59e0b", highlightBg: "#fef3c7", image: "/stadium_metlife.jpg", imagePosition: "center bottom", mapLink: "https://maps.google.com/?q=MetLife+Stadium+New+Jersey" }
];

export default function Stadiums() {
  return (
    <div className="relative min-h-screen">
      {/* Mascot Image */}
      <div className="fixed top-20 right-4 md:top-24 md:right-10 z-[100] w-32 md:w-48 pointer-events-none drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)]">
        <img src="/mascot4.jpg" alt="Mascot" className="w-full h-auto rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-white/20" style={{ transform: "rotate(-4deg)" }} />
      </div>
      <div className="fixed inset-0 z-[-2] bg-cover bg-center" style={{ backgroundImage: "url('/bg-new3.jpg')" }}></div>
      <div className="fixed inset-0 z-[-1] bg-[#0D1042]/80 backdrop-blur-[2px]"></div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-12">

        {/* Header */}
        <div className="mb-12">
          <div className="badge badge-accent inline-flex mb-4">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>stadium</span>
            16 Host Stadiums · USA · Canada · Mexico
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-[52px] tracking-tight mb-4" style={{ color: "#f8fafc" }}>
            World Cup <span className="gradient-text-accent">Stadiums</span>
          </h1>
          <p className="font-body-lg" style={{ color: "#B8BDD9", maxWidth: "520px" }}>
            16 iconic arenas across 3 nations. The greatest stadiums on earth, ready to host football history.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Total Stadiums", value: "16", icon: "stadium", color: "#d97706", bg: "#fef3c7" },
            { label: "Host Countries", value: "3", icon: "flag", color: "#C8102E", bg: "rgba(201,168,76,0.1)" },
            { label: "Largest Capacity", value: "83,714", icon: "people", color: "#d97706", bg: "#fef3c7" },
            { label: "Total Seats", value: "1.2M+", icon: "event_seat", color: "#C8102E", bg: "rgba(201,168,76,0.1)" },
          ].map((s) => (
            <div key={s.label} className="stat-card flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
                <span className="material-symbols-outlined text-xl" style={{ color: s.color, fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
              </div>
              <div>
                <p style={{ fontFamily: "Outfit", fontSize: "22px", fontWeight: 800, color: "#f8fafc", lineHeight: 1.1 }}>{s.value}</p>
                <p style={{ fontFamily: "JetBrains Mono", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8BDD9", marginTop: "3px" }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stadiums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-12">
          {stadiums.map((s) => (
            <div key={s.name} className="glass-card rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:translate-y-[-3px]">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1042]/60 via-transparent to-transparent z-10" />
                <img src={s.image} alt={s.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: s.imagePosition || "center" }} />
                <div className="absolute top-3 left-3 z-20">
                  <span className="badge" style={{ background: s.highlightBg, border: `1px solid ${s.highlightColor}30`, color: s.highlightColor }}>
                    {s.highlight}
                  </span>
                </div>
                <div className="absolute top-3 right-3 z-20 text-2xl"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="font-headline-lg mb-1 transition-colors group-hover:text-[#C8102E]"
                  style={{ fontFamily: "Outfit", fontSize: "20px", fontWeight: 800, color: "#f8fafc" }}>
                  {s.name}
                </h2>
                <div className="flex items-center gap-1.5 mb-5">
                  <span className="material-symbols-outlined text-[13px]" style={{ color: "#B8BDD9" }}>location_on</span>
                  <span style={{ fontSize: "13px", color: "#cbd5e1" }}>{s.city}, {s.country}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[
                    { label: "Capacity", value: s.capacity, color: "#C8102E", bg: "rgba(201,168,76,0.1)" },
                    { label: "Matches", value: String(s.matches), color: "#d97706", bg: "#fef3c7" },
                    { label: "Opened", value: String(s.opened), color: "#B8BDD9", bg: "#f8fafc" },
                  ].map((m) => (
                    <div key={m.label} className="text-center p-3 rounded-xl" style={{ background: m.bg, border: "1px solid #e2e8f0" }}>
                      <p style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, color: m.color }}>{m.value}</p>
                      <p style={{ fontFamily: "JetBrains Mono", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#B8BDD9", marginTop: "3px" }}>{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Surface */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="material-symbols-outlined text-[14px]" style={{ color: "#16a34a" }}>grass</span>
                  <span style={{ fontSize: "12px", color: "#cbd5e1" }}>{s.surface}</span>
                </div>

                <a href={s.mapLink} target="_blank" rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2"
                  style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#0369a1" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.3)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.1)"; }}>
                  <span className="material-symbols-outlined text-[15px]">map</span>
                  View on Map
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Map CTA */}
        <div className="rounded-3xl p-12 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #d97706, #f59e0b, #fbbf24)" }}>
          <div className="relative z-10">
            <span className="material-symbols-outlined text-5xl mb-4 block" style={{ color: "rgba(255,255,255,0.9)", fontVariationSettings: "'FILL' 1" }}>map</span>
            <h3 className="font-headline-xl text-headline-xl mb-3" style={{ color: "#ffffff" }}>Interactive Stadium Map</h3>
            <p className="font-body-lg max-w-xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.85)" }}>
              Explore all 16 stadiums on an interactive map. Get travel info, fan zones, local guides, and location-based prediction bonuses.
            </p>
            <a href="https://www.google.com/maps/search/FIFA+2026+stadiums" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-[16px] transition-all active:scale-95"
              style={{ background: "#ffffff", color: "#d97706", boxShadow: "0 4px 14px rgba(0,0,0,0.12)" }}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>open_in_new</span>
              Open Interactive Map
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

