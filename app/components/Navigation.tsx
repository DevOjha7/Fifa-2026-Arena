"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/matches", label: "Schedule", icon: "calendar_month" },
  { href: "/dashboard", label: "Predictions", icon: "query_stats" },
  { href: "/teams", label: "Teams", icon: "groups" },
  { href: "/stadiums", label: "Stadiums", icon: "stadium" },
  { href: "/leaderboard", label: "Leaderboard", icon: "leaderboard" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [activeUser, setActiveUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedId = localStorage.getItem('activeUserId');
    if (savedId) {
      fetch('/api/db').then(res => res.json()).then(data => {
        const u = (data.users || []).find((user: any) => user.id === savedId);
        if (u) setActiveUser(u);
      });
    }
    
    const handleUserChange = () => {
      const currentId = localStorage.getItem('activeUserId');
      if (!currentId) {
        setActiveUser(null);
      } else {
        fetch('/api/db').then(res => res.json()).then(data => {
          const u = (data.users || []).find((user: any) => user.id === currentId);
          if (u) setActiveUser(u);
        });
      }
    };
    window.addEventListener('userChanged', handleUserChange);
    return () => window.removeEventListener('userChanged', handleUserChange);
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });
      const data = await res.json();
      if (data.user) {
        localStorage.setItem('activeUserId', data.user.id);
        setActiveUser(data.user);
        setShowModal(false);
        window.dispatchEvent(new Event('userChanged'));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('activeUserId');
    setActiveUser(null);
    window.dispatchEvent(new Event('userChanged'));
  };

  return (
    <>
      {/* ── Top Bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(13,16,66,0.95)"
            : "rgba(13,16,66,0.8)",
          backdropFilter: "blur(24px)",
          borderBottom: scrolled
            ? "1px solid rgba(201,168,76,0.3)"
            : "1px solid rgba(201,168,76,0.15)",
          boxShadow: scrolled
            ? "0 4px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(201,168,76,0.15)"
            : "0 4px 30px rgba(0,0,0,0.3)",
        }}
      >
        {/* Gold top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, #C8102E 0%, #C9A84C 50%, #1B1F5E 100%)" }}
        />

        <div className="flex items-center justify-between h-full px-6 md:px-10 max-w-[1400px] mx-auto">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/fifa2026_logo.jpg"
                alt="FIFA World Cup 2026"
                className="h-10 w-10 object-cover rounded-lg transition-all duration-300 group-hover:scale-105"
                style={{
                  boxShadow: "0 0 16px rgba(201,168,76,0.4)",
                  border: "1px solid rgba(201,168,76,0.4)",
                }}
              />
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: "0 0 24px rgba(201,168,76,0.6)" }}
              />
            </div>
            <div className="flex flex-col">
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "16px", color: "#F8F9FF", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                FIFA <span style={{ color: "#C8102E" }}>2026</span>
              </span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "#C9A84C", letterSpacing: "0.18em", fontWeight: 600, textTransform: "uppercase" }}>
                ARENA
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 rounded-lg text-[14px] font-medium transition-all duration-200"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: isActive ? "#C9A84C" : "#B8BDD9",
                    background: isActive ? "rgba(201,168,76,0.12)" : "transparent",
                    fontWeight: isActive ? 600 : 500,
                    border: isActive ? "1px solid rgba(201,168,76,0.25)" : "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "#F8F9FF";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "#B8BDD9";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ background: "linear-gradient(90deg, #C8102E, #C9A84C)", boxShadow: "0 0 8px rgba(201,168,76,0.6)" }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {activeUser ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end">
                  <span style={{ fontSize: "12px", color: "#F8F9FF", fontWeight: 600 }}>{activeUser.name}</span>
                  <span style={{ fontSize: "10px", color: "#C9A84C", fontFamily: "JetBrains Mono" }}>{activeUser.predictions} Picks</span>
                </div>
                <div
                  className="w-8 h-8 rounded-full overflow-hidden"
                  style={{ border: "2px solid rgba(201,168,76,0.6)", boxShadow: "0 0 12px rgba(201,168,76,0.3)" }}
                >
                  <img src={activeUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <button onClick={handleLogout} className="text-sm font-medium transition-colors" style={{ color: "#7A80A8" }} title="Logout"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F8F9FF"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#7A80A8"; }}
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="btn-primary py-1.5 px-4 text-sm rounded-lg"
                style={{ background: "linear-gradient(135deg, #C8102E, #e01535)", color: "#fff", fontWeight: 700, fontSize: "13px", padding: "8px 18px", borderRadius: "8px", border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(200,16,46,0.4)", transition: "all 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(200,16,46,0.6)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(200,16,46,0.4)"; }}
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Mobile Bottom Nav ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-16 px-2"
        style={{
          background: "rgba(13,16,66,0.97)",
          backdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(201,168,76,0.2)",
          boxShadow: "0 -4px 30px rgba(0,0,0,0.4)",
        }}
      >
        {/* Gold top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
        />
        {navLinks.slice(0, 5).map((link) => {
          const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <a
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200"
              style={{ color: isActive ? "#C9A84C" : "#7A80A8" }}
            >
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{link.icon}</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", letterSpacing: "0.06em", fontWeight: 600, textTransform: "uppercase" }}>{link.label}</span>
            </a>
          );
        })}
      </nav>

      {/* ── Auth Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div
            className="rounded-2xl p-8 max-w-md w-full relative"
            style={{
              background: "linear-gradient(135deg, #0D1042 0%, #131650 100%)",
              border: "1px solid rgba(201,168,76,0.3)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.1)",
            }}
          >
            {/* Gold top strip */}
            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: "linear-gradient(90deg, #C8102E, #C9A84C)" }} />

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 transition-colors"
              style={{ color: "#7A80A8" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F8F9FF"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#7A80A8"; }}
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="text-center mb-6">
              <img src="/fifa2026_logo.jpg" alt="FIFA 2026" className="w-16 h-16 object-cover rounded-xl mx-auto mb-4" style={{ border: "1px solid rgba(201,168,76,0.4)", boxShadow: "0 0 20px rgba(201,168,76,0.3)" }} />
              <h2 className="font-headline-xl text-3xl mb-2" style={{ color: "#F8F9FF" }}>Join the Arena</h2>
              <p style={{ color: "#B8BDD9", fontSize: "14px" }}>Enter your email to login or create a new account.</p>
            </div>

            <form onSubmit={handleAuth} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#C9A84C" }}>Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)", color: "#F8F9FF" }}
                  placeholder="predictor@example.com"
                  onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.6)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(201,168,76,0.15)"; }}
                  onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.2)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#C9A84C" }}>Display Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full rounded-xl px-4 py-3 outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)", color: "#F8F9FF" }}
                  placeholder="e.g. Tactical_Titan"
                  onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.6)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(201,168,76,0.15)"; }}
                  onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.2)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full font-bold py-3 rounded-xl mt-2 transition-all disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #C8102E, #e01535)", color: "#fff", fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "15px", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(200,16,46,0.4)" }}
                onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 28px rgba(200,16,46,0.6)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(200,16,46,0.4)"; }}
              >
                {loading ? 'Authenticating...' : 'Continue'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
