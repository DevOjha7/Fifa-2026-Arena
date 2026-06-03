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
        className="fixed top-0 left-0 right-0 z-50 h-16"
        style={{ background: "rgba(15,23,42,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
      >
        <div className="flex items-center justify-between h-full px-6 md:px-10 max-w-[1400px] mx-auto">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <img src="/logo.png" alt="FIFA 2026 Arena" className="h-10 w-10 object-contain drop-shadow-md" />
            <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "17px", color: "#f8fafc" }}>
              FIFA <span style={{ color: "#0ea5e9" }}>2026</span> ARENA
            </span>
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
                    color: isActive ? "#0ea5e9" : "#94a3b8",
                    background: isActive ? "rgba(14,165,233,0.15)" : "transparent",
                    fontWeight: isActive ? 600 : 500,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "#f8fafc";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ background: "#0ea5e9", boxShadow: "0 0 8px #0ea5e9" }}
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
                  <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>{activeUser.name}</span>
                  <span style={{ fontSize: "10px", color: "#0ea5e9", fontFamily: "JetBrains Mono" }}>{activeUser.predictions} Picks</span>
                </div>
                <div className="w-8 h-8 rounded-full overflow-hidden border border-sky-400">
                  <img src={activeUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <button onClick={handleLogout} className="text-sm font-medium text-slate-400 hover:text-white transition-colors" title="Logout">
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                </button>
              </div>
            ) : (
              <button onClick={() => setShowModal(true)} className="btn-primary py-1.5 px-4 text-sm rounded-lg" style={{ background: "#0ea5e9", color: "#fff", fontWeight: 700 }}>
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Mobile Bottom Nav ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-16 px-2"
        style={{ background: "rgba(15,23,42,0.9)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        {navLinks.slice(0, 5).map((link) => {
          const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <a
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200"
              style={{ color: isActive ? "#0ea5e9" : "#64748b" }}
            >
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{link.icon}</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", letterSpacing: "0.06em", fontWeight: 600, textTransform: "uppercase" }}>{link.label}</span>
            </a>
          );
        })}
      </nav>

      {/* ── Auth Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="text-center mb-6">
              <h2 className="font-headline-xl text-3xl mb-2 text-white">Join the Arena</h2>
              <p className="text-slate-400 text-sm">Enter your email to login or create a new account.</p>
            </div>
            <form onSubmit={handleAuth} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#1e293b] border border-slate-600 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-500 transition-colors"
                  placeholder="predictor@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Display Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-[#1e293b] border border-slate-600 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-500 transition-colors"
                  placeholder="e.g. Tactical_Titan"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl mt-2 transition-colors disabled:opacity-50"
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
