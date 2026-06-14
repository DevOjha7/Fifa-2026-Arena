"use client";

const footerLinks = [
  {
    heading: "Tournament",
    links: [
      { label: "Schedule", href: "/matches" },
      { label: "Teams", href: "/teams" },
      { label: "Stadiums", href: "/stadiums" },
      { label: "Leaderboard", href: "/leaderboard" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "Predictions", href: "/dashboard" },
      { label: "Tournament Rules", href: "/dashboard" },
      { label: "Privacy Policy", href: "/" },
      { label: "Terms of Service", href: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0D1042 0%, #070930 100%)",
        borderTop: "1px solid rgba(201,168,76,0.2)",
        position: "relative",
        overflow: "hidden",
      }}
      className="mt-20 py-14 px-6 md:px-10"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(200,16,46,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Gold-Red-Navy accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, #C8102E 0%, #C9A84C 50%, #1B1F5E 100%)" }}
      />

      <div className="max-w-[1400px] mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-3 mb-5 group">
              <img
                src="/fifa2026_logo.jpg"
                alt="FIFA World Cup 2026 Logo"
                className="w-12 h-12 object-cover rounded-xl transition-all duration-300 group-hover:scale-105"
                style={{
                  border: "1px solid rgba(201,168,76,0.4)",
                  boxShadow: "0 0 16px rgba(201,168,76,0.25)",
                }}
              />
              <div className="flex flex-col">
                <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "17px", color: "#F8F9FF", lineHeight: 1.1 }}>
                  FIFA <span style={{ color: "#C8102E" }}>2026</span>
                </span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "#C9A84C", letterSpacing: "0.18em", fontWeight: 600, textTransform: "uppercase" }}>
                  ARENA
                </span>
              </div>
            </a>
            <p style={{ color: "#7A80A8", fontSize: "14px", lineHeight: 1.7, maxWidth: "280px" }}>
              The ultimate platform for football fans to predict, compete, and climb the global leaderboard during FIFA World Cup 2026.
            </p>
            <div className="flex gap-3 mt-5">
              {["public", "share", "mail"].map((icon) => (
                <a
                  key={icon}
                  href="/"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ border: "1px solid rgba(201,168,76,0.2)", color: "#7A80A8", background: "rgba(255,255,255,0.04)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#C9A84C";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.5)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.1)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 12px rgba(201,168,76,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#7A80A8";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.2)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <span className="material-symbols-outlined text-[18px]">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", fontWeight: 600, marginBottom: "16px" }}>
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{ fontSize: "14px", color: "#7A80A8", transition: "color 0.2s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#C9A84C"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#7A80A8"; }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(201,168,76,0.15)", paddingTop: "20px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
          <p style={{ color: "#7A80A8", fontSize: "13px" }}>© 2026 FIFA World Cup Prediction Arena. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full pulse-live" style={{ background: "#C8102E" }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "#7A80A8", letterSpacing: "0.06em" }}>LIVE · 42.8k ACTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
