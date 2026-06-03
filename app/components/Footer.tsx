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
      style={{ background: "#f1f5f9", borderTop: "1px solid #e2e8f0" }}
      className="mt-20 py-14 px-6 md:px-10"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="FIFA 2026 Arena Logo" className="w-10 h-10 object-contain" />
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "17px", color: "#0f172a" }}>
                FIFA <span style={{ color: "#0ea5e9" }}>2026</span> Arena
              </span>
            </a>
            <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.7, maxWidth: "280px" }}>
              The ultimate platform for football fans to predict, compete, and climb the global leaderboard.
            </p>
            <div className="flex gap-3 mt-5">
              {["public", "share", "mail"].map((icon) => (
                <a
                  key={icon}
                  href="/"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ border: "1px solid #e2e8f0", color: "#94a3b8", background: "#ffffff" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#0ea5e9"; (e.currentTarget as HTMLElement).style.borderColor = "#bae6fd"; (e.currentTarget as HTMLElement).style.background = "#e0f2fe"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#94a3b8"; (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0"; (e.currentTarget as HTMLElement).style.background = "#ffffff"; }}
                >
                  <span className="material-symbols-outlined text-[18px]">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#0ea5e9", fontWeight: 600, marginBottom: "16px" }}>
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{ fontSize: "14px", color: "#64748b", transition: "color 0.2s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#0ea5e9"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#64748b"; }}
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
        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "20px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
          <p style={{ color: "#94a3b8", fontSize: "13px" }}>© 2026 FIFA World Cup Prediction Arena. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-live" />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "#94a3b8", letterSpacing: "0.06em" }}>LIVE · 42.8k ACTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
