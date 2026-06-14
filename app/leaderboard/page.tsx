"use client";
import { useState, useMemo, useEffect } from "react";

const tierStyle: Record<string, { icon: string; color: string; bg: string; border: string }> = {
  gold:   { icon: "workspace_premium", color: "#d97706", bg: "rgba(217, 119, 6, 0.2)", border: "#fde68a" },
  silver: { icon: "workspace_premium", color: "#cbd5e1", bg: "rgba(203, 213, 225, 0.1)", border: "#e2e8f0" },
  bronze: { icon: "workspace_premium", color: "#b45309", bg: "rgba(217, 119, 6, 0.2)", border: "#fde68a" },
  base:   { icon: "", color: "#B8BDD9", bg: "rgba(30, 41, 59, 0.5)", border: "#e2e8f0" },
};

const PAGE_SIZE = 6;

export default function Leaderboard() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rawUsers, setRawUsers] = useState<any[]>([]);
  const [activeUserId, setActiveUserId] = useState<string>("u1");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/db');
      const data = await res.json();
      setRawUsers(data.users || []);
      const savedUser = localStorage.getItem('activeUserId') || 'u1';
      setActiveUserId(savedUser);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const handleUserChange = () => { fetchData(); };
    window.addEventListener('userChanged', handleUserChange);
    return () => window.removeEventListener('userChanged', handleUserChange);
  }, []);

  const allPlayers = useMemo(() => {
    return rawUsers
      .map(u => ({ ...u, score: u.predictions }))
      .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
      .map((u, i) => {
        let tier = "base";
        if (u.predictions >= 20) tier = "gold";
        else if (u.predictions >= 10) tier = "silver";
        else if (u.predictions >= 5) tier = "bronze";
        
        return {
          ...u,
          rank: i + 1,
          tier,
          accuracy: 100, // mock since we don't have results
          points: u.predictions * 50 // mock points calculation
        };
      });
  }, [rawUsers]);

  const filtered = useMemo(() => allPlayers.filter((u) => u.name.toLowerCase().includes(search.toLowerCase())), [allPlayers, search]);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (val: string) => { setSearch(val); setPage(1); };

  const myProfile = allPlayers.find(u => u.id === activeUserId);

  return (
    <div className="relative min-h-screen">
      {/* Mascot Image */}
      <div className="fixed top-20 right-4 md:top-24 md:right-10 z-[100] w-32 md:w-48 pointer-events-none drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)]">
        <img src="/mascot5.jpg" alt="Mascot" className="w-full h-auto rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-white/20" style={{ transform: "rotate(-4deg)" }} />
      </div>
      <div className="fixed inset-0 z-[-2] bg-cover bg-top" style={{ backgroundImage: "url('/bg-leaderboard.jpg')" }}></div>
      <div className="fixed inset-0 z-[-1] bg-[#0D1042]/80 backdrop-blur-[1px]"></div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="badge badge-primary inline-flex mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 pulse-live" />
              Live · Updates Every 60s
            </div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-[52px] tracking-tight mb-4" style={{ color: "#f8fafc" }}>
              World <span className="gradient-text-primary">Rankings</span>
            </h1>
            <p className="font-body-lg" style={{ color: "#B8BDD9", maxWidth: "460px" }}>The global arena of elite tacticians. Every prediction brings you closer to legendary status.</p>
          </div>
          <div className="badge badge-primary text-sm px-4 py-2 flex-shrink-0">
            <span className="material-symbols-outlined text-[14px]">groups</span>
            {filtered.length.toLocaleString()} Predictors Found
          </div>
        </div>

        {/* My Profile Card */}
        {myProfile && (
        <div className="glass-card rounded-2xl p-7 mb-5 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-5 md:col-span-2">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden" style={{ border: "3px solid #C8102E", boxShadow: "0 0 20px rgba(200, 16, 46,0.2)" }}>
                <img src={myProfile.avatar} alt="Me" className="w-full h-full object-cover bg-sky-50" />
              </div>
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: "#C8102E", color: "#ffffff" }}>YOU</span>
            </div>
            <div>
              <h2 className="font-headline-lg text-headline-lg flex items-center gap-2" style={{ color: "#f8fafc" }}>
                {myProfile.name}
              </h2>
              <div className="flex flex-wrap gap-5 mt-3">
                {[
                  { label: "Current Rank", value: `#${myProfile.rank}`, color: "#C8102E" },
                  { label: "Predictions", value: myProfile.predictions, color: "#d97706" },
                  { label: "Total Points", value: myProfile.points.toLocaleString(), color: "#f8fafc" },
                ].map((s) => (
                  <div key={s.label}>
                    <p style={{ fontFamily: "JetBrains Mono", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#B8BDD9" }}>{s.label}</p>
                    <p style={{ fontFamily: "Outfit", fontSize: "22px", fontWeight: 800, color: s.color, lineHeight: 1.1 }}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="rounded-xl p-4 text-center" style={{ background: tierStyle[myProfile.tier].bg, border: `1px solid ${tierStyle[myProfile.tier].border}` }}>
              {tierStyle[myProfile.tier].icon && (
                <span className="material-symbols-outlined text-3xl mb-1 block" style={{ color: tierStyle[myProfile.tier].color, fontVariationSettings: "'FILL' 1" }}>
                  {tierStyle[myProfile.tier].icon}
                </span>
              )}
              <p style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, color: tierStyle[myProfile.tier].color }}>
                {myProfile.tier.toUpperCase()} TIER
              </p>
              <p style={{ fontSize: "12px", color: "#b45309", margin: "4px 0 8px" }}>Keep predicting to rank up!</p>
              <div className="progress-track"><div className="progress-fill" style={{ width: "80%" }} /></div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-all" style={{ background: "#C8102E", color: "#ffffff" }}>
                <span className="material-symbols-outlined text-[16px]">share</span> Share
              </button>
            </div>
          </div>
        </div>
        )}

        {/* Loading State */}
        {loading && <div className="text-center py-10 text-gray-500 font-medium">Loading leaderboard...</div>}

        {/* Table */}
        {!loading && (
        <div className="glass-card rounded-2xl overflow-hidden mb-16">
          {/* Header */}
          <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom: "1px solid #252A7A", background: "rgba(30, 41, 59, 0.6)" }}>
            <h3 className="font-headline-lg text-headline-lg" style={{ color: "#f8fafc" }}>Top Predictors</h3>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[16px]" style={{ color: "#B8BDD9" }}>search</span>
              <input type="text" placeholder="Search users..." value={search} onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg text-sm outline-none transition-all"
                style={{ background: "rgba(30, 41, 59, 0.6)", border: "1px solid #252A7A", color: "#f8fafc", width: "220px", fontFamily: "Inter" }} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr >
                  {["Rank", "Player", "Predictions", "Points"].map((h, i) => (
                    <th key={h} className="px-7 py-4" style={{ fontFamily: "JetBrains Mono", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#B8BDD9", textAlign: i === 0 || i === 1 ? "left" : "center" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageData.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-7 py-10 text-center" style={{ color: "#B8BDD9", fontFamily: "Inter" }}>
                      No predictors found for "{search}"
                    </td>
                  </tr>
                ) : pageData.map((u) => {
                  const tc = tierStyle[u.tier];
                  const isMe = u.id === activeUserId;
                  return (
                    <tr key={u.id} className="group transition-all duration-150 cursor-pointer"
                      style={{ borderBottom: "1px solid #252A7A", background: isMe ? "rgba(200, 16, 46, 0.1)" : "transparent" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = isMe ? "rgba(200, 16, 46, 0.1)" : "rgba(255,255,255,0.05)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = isMe ? "rgba(200, 16, 46, 0.1)" : ""; }}>
                      <td className="px-7 py-5">
                        {tc.icon ? (
                          <span className="material-symbols-outlined text-[22px]" style={{ color: tc.color, fontVariationSettings: "'FILL' 1" }}>{tc.icon}</span>
                        ) : (
                          <span style={{ fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, color: "#B8BDD9" }}>{String(u.rank).padStart(2, "0")}</span>
                        )}
                      </td>
                      <td className="px-7 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0" style={{ border: `2px solid ${tc.border}`, background: tc.bg }}>
                            <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span style={{ fontFamily: "Outfit", fontSize: "15px", fontWeight: 700, color: "#f8fafc" }} className="group-hover:text-[#C8102E] transition-colors">{u.name}</span>
                              <span></span>
                              {isMe && <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-bold bg-sky-500 text-white">YOU</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-7 py-5 text-center">
                        <span style={{ fontFamily: "JetBrains Mono", fontSize: "13px", color: "#cbd5e1" }}>{u.predictions.toLocaleString()}</span>
                      </td>
                      <td className="px-7 py-5 text-center">
                        <span style={{ fontFamily: "Outfit", fontSize: "15px", fontWeight: 800, color: "#f8fafc" }}>{u.points.toLocaleString()}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
          <div className="flex justify-between items-center px-7 py-4" style={{ borderTop: "1px solid #252A7A", background: "rgba(30, 41, 59, 0.6)" }}>
            <p style={{ fontSize: "13px", color: "#B8BDD9" }}>
              Showing <span style={{ color: "#f8fafc" }}>{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}</span> of <span style={{ color: "#f8fafc" }}>{filtered.length.toLocaleString()}</span> predictors
            </p>
            <div className="flex gap-1.5">
              <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                style={{ background: "rgba(30, 41, 59, 0.6)", color: page === 1 ? "#252A7A" : "#cbd5e1", border: "1px solid #252A7A", cursor: page === 1 ? "not-allowed" : "pointer" }}>
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all"
                  style={{ background: p === page ? "#C8102E" : "rgba(30, 41, 59, 0.6)", color: p === page ? "#ffffff" : "#cbd5e1", border: p === page ? "none" : "1px solid #252A7A", boxShadow: p === page ? "0 2px 8px rgba(200, 16, 46,0.3)" : "none" }}>
                  {p}
                </button>
              ))}
              <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                style={{ background: "rgba(30, 41, 59, 0.6)", color: page === totalPages ? "#252A7A" : "#cbd5e1", border: "1px solid #252A7A", cursor: page === totalPages ? "not-allowed" : "pointer" }}>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
          )}
        </div>
        )}

      </div>
    </div>
  );
}
