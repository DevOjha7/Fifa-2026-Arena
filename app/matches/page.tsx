"use client";
import { useState, useEffect } from "react";

const stages = ["All", "Group Stage", "Quarter-Finals", "Semi-Finals", "Final"];
const flag = (code: string) => `https://flagcdn.com/w80/${code}.png`;

export default function Matches() {
  const [activeStage, setActiveStage] = useState("All");
  const [matches, setMatches] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<Record<string, string>>({});
  const [activeUser, setActiveUser] = useState<string>("u1");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/db');
      const data = await res.json();
      setMatches(data.matches || []);
      
      const savedUser = localStorage.getItem('activeUserId') || 'u1';
      setActiveUser(savedUser);
      
      const userObj = (data.users || []).find((u: any) => u.id === savedUser);
      if (userObj) {
        setPredictions(userObj.votes || {});
      }
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

  const predict = async (matchId: string, pick: string) => {
    setPredictions((prev) => ({ ...prev, [matchId]: pick })); // Optimistic update
    
    try {
      const res = await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: activeUser, matchId, pick })
      });
      const data = await res.json();
      setMatches(data.matches || []);
      const userObj = (data.users || []).find((u: any) => u.id === activeUser);
      if (userObj) {
        setPredictions(userObj.votes || {});
      }
    } catch (e) {
      console.error(e);
    }
  };

  const [teamFilter, setTeamFilter] = useState<string | null>(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setTeamFilter(urlParams.get('team'));
  }, []);

  let filtered = activeStage === "All" ? matches : matches.filter((m) => m.stage === activeStage);
  if (teamFilter) {
    filtered = filtered.filter((m) => m.homeCode === teamFilter || m.awayCode === teamFilter);
  }

  return (
    <div className="relative min-h-screen">
      {/* Mascot Image */}
      <div className="fixed top-20 right-4 md:top-24 md:right-10 z-[100] w-32 md:w-48 pointer-events-none drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)]">
        <img src="/mascot1.jpg" alt="Mascot" className="w-full h-auto rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-white/20" style={{ transform: "rotate(-4deg)" }} />
      </div>
      <div className="fixed inset-0 z-[-2] bg-cover bg-center" style={{ backgroundImage: "url('/bg-schedule.jpg')" }}></div>
      <div className="fixed inset-0 z-[-1] bg-[#0D1042]/80 backdrop-blur-[2px]"></div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="badge badge-live inline-flex mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 pulse-live" />
            Live · {filtered.length} Matches Shown
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-[52px] tracking-tight mb-4" style={{ color: "#f8fafc" }}>
            Match <span className="gradient-text-primary">Schedule</span>
          </h1>
          <p className="font-body-lg" style={{ color: "#B8BDD9", maxWidth: "520px" }}>
            All 104 FIFA World Cup 2026 matches across USA, Canada &amp; Mexico. Predict every game and climb the global leaderboard.
          </p>
        </div>

        {/* Stage Filter Tabs */}
        <div className="flex gap-2 mb-10 overflow-x-auto scroll-hide pb-1">
          {stages.map((s) => {
            const isActive = s === activeStage;
            return (
              <button key={s} onClick={() => setActiveStage(s)}
                className="px-5 py-2.5 rounded-full whitespace-nowrap font-medium text-[13px] transition-all duration-200 flex-shrink-0"
                style={{ fontFamily: "Outfit, sans-serif", background: isActive ? "#C8102E" : "#ffffff", color: isActive ? "#ffffff" : "#B8BDD9", border: isActive ? "none" : "1px solid #e2e8f0", boxShadow: isActive ? "0 4px 12px rgba(200, 16, 46,0.3)" : "0 1px 2px rgba(0,0,0,0.04)" }}>
                {s}
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && <div className="text-center py-10 text-gray-500 font-medium">Loading match data...</div>}

        {/* Match Cards */}
        {!loading && (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5 mb-16">
          {filtered.map((m) => {
            const picked = predictions[m.id];
            const isFinal = m.stage === "Final";
            const homePct = m.totalVotes > 0 ? Math.round((m.homeWinVotes / m.totalVotes) * 100) : 0;
            const drawPct = m.totalVotes > 0 ? Math.round((m.drawVotes / m.totalVotes) * 100) : 0;
            const awayPct = m.totalVotes > 0 ? Math.round((m.awayVotes / m.totalVotes) * 100) : 0;

            return (
              <article key={m.id} className="glass-card rounded-2xl p-6 flex flex-col gap-5"
                style={{ borderTop: isFinal ? "3px solid #f59e0b" : "3px solid transparent" }}>

                {/* Top Row */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="badge" style={{ background: isFinal ? "#fef3c7" : "rgba(201,168,76,0.1)", border: isFinal ? "1px solid #fde68a" : "1px solid rgba(201,168,76,0.3)", color: isFinal ? "#92400e" : "#0369a1" }}>
                      {m.group} · Match {m.match}
                    </span>
                    <div className="flex items-center gap-2 mt-2" style={{ color: "#B8BDD9" }}>
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      <span style={{ fontFamily: "JetBrains Mono", fontSize: "12px" }}>{m.date} · {m.time}</span>
                    </div>
                  </div>
                  <div className="badge badge-primary flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 pulse-live" />
                    Pre-Match
                  </div>
                </div>

                {/* Teams */}
                <div className="flex items-center justify-between py-2">
                  {/* Home Team */}
                  <div className="flex flex-col items-center gap-2 w-[38%]">
                    <div
                      className="relative flex items-center justify-center"
                      style={{ width: "80px", height: "64px" }}
                    >
                      {/* Glow halo */}
                      <div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{
                          background: "radial-gradient(ellipse at center, rgba(201,168,76,0.3) 0%, transparent 70%)",
                          filter: "blur(8px)",
                          transform: "scale(1.3)",
                        }}
                      />
                      <img
                        src={`https://flagcdn.com/w160/${m.homeCode}.png`}
                        alt={m.home}
                        className="relative z-10 w-full h-full rounded-xl"
                        style={{
                          objectFit: "cover",
                          imageRendering: "crisp-edges",
                          filter: "contrast(1.1) saturate(1.25) drop-shadow(0 4px 14px rgba(0,0,0,0.6))",
                          border: "1.5px solid rgba(255,255,255,0.18)",
                          boxShadow: "0 0 16px rgba(201,168,76,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
                        }}
                      />
                    </div>
                    <span className="font-bold text-[14px] text-center" style={{ color: "#F8F9FF", fontFamily: "Outfit, sans-serif" }}>
                      {m.home}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-black text-[20px] italic" style={{ color: "#C9A84C", fontFamily: "Outfit, sans-serif", textShadow: "0 0 20px rgba(201,168,76,0.5)" }}>VS</span>
                    <p style={{ fontFamily: "JetBrains Mono", fontSize: "10px", letterSpacing: "0.08em", color: "#7A80A8", textTransform: "uppercase", textAlign: "center" }}>{m.stage}</p>
                  </div>
                  {/* Away Team */}
                  <div className="flex flex-col items-center gap-2 w-[38%]">
                    <div
                      className="relative flex items-center justify-center"
                      style={{ width: "80px", height: "64px" }}
                    >
                      {/* Glow halo */}
                      <div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{
                          background: "radial-gradient(ellipse at center, rgba(200,16,46,0.3) 0%, transparent 70%)",
                          filter: "blur(8px)",
                          transform: "scale(1.3)",
                        }}
                      />
                      <img
                        src={`https://flagcdn.com/w160/${m.awayCode}.png`}
                        alt={m.away}
                        className="relative z-10 w-full h-full rounded-xl"
                        style={{
                          objectFit: "cover",
                          imageRendering: "crisp-edges",
                          filter: "contrast(1.1) saturate(1.25) drop-shadow(0 4px 14px rgba(0,0,0,0.6))",
                          border: "1.5px solid rgba(255,255,255,0.18)",
                          boxShadow: "0 0 16px rgba(200,16,46,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
                        }}
                      />
                    </div>
                    <span className="font-bold text-[14px] text-center" style={{ color: "#F8F9FF", fontFamily: "Outfit, sans-serif" }}>
                      {m.away}
                    </span>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-center justify-center gap-2 py-2" style={{ borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9" }}>
                  <span className="material-symbols-outlined text-[14px]" style={{ color: "#B8BDD9" }}>location_on</span>
                  <span style={{ fontSize: "13px", color: "#cbd5e1", fontFamily: "Inter, sans-serif" }}>{m.venue}</span>
                </div>

                {/* Prediction Buttons */}
                <div className="flex gap-2">
                  {[{ label: `${m.home} Win`, key: "home" }, { label: "Draw", key: "draw" }, { label: `${m.away} Win`, key: "away" }].map((btn) => {
                    const isSelected = picked === btn.key;
                    return (
                      <button key={btn.key} onClick={() => predict(m.id, btn.key)}
                        className="flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:brightness-110"
                        style={{ fontFamily: "JetBrains Mono, monospace", background: isSelected ? "#C8102E" : "#131650", border: isSelected ? "1px solid #C9A84C" : "1px solid #B8BDD9", color: isSelected ? "#ffffff" : "#f8fafc", boxShadow: isSelected ? "0 4px 12px rgba(200, 16, 46,0.4)" : "none" }}>
                        {isSelected ? "✓ " : ""}{btn.label}
                      </button>
                    );
                  })}
                </div>

                {/* Sentiment Bar */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#B8BDD9" }}>Community Sentiment</span>
                    <span style={{ fontFamily: "Outfit", fontSize: "12px", fontWeight: 700, color: "#C8102E" }}>{m.totalVotes} votes</span>
                  </div>
                  <div className="h-2 w-full rounded-full overflow-hidden flex" style={{ background: "#f1f5f9" }}>
                    <div style={{ width: `${homePct}%`, background: "#C8102E", height: "100%" }} />
                    <div style={{ width: `${drawPct}%`, background: "#e2e8f0", height: "100%" }} />
                    <div style={{ width: `${awayPct}%`, background: "#f59e0b", height: "100%" }} />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: "10px", color: "#C8102E" }}>{m.home} {homePct}%</span>
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: "10px", color: "#B8BDD9" }}>{drawPct}%</span>
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: "10px", color: "#f59e0b" }}>{awayPct}% {m.away}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        )}

        {/* Promo Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="glass-card rounded-2xl p-8 md:col-span-2 relative overflow-hidden">
            <div className="badge badge-primary mb-4">Premium</div>
            <h3 className="font-headline-xl text-headline-xl mb-3" style={{ color: "#f8fafc" }}>Prime Predictor Perks</h3>
            <p className="font-body-lg mb-6" style={{ color: "#B8BDD9", maxWidth: "400px" }}>Join the elite circle. Earn exclusive rewards, stadium access, and digital currency for accurate predictions.</p>
            <button className="btn-primary">Unlock Premium Access</button>
          </div>
          <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "#fef3c7", border: "1px solid #fde68a" }}>
              <span className="material-symbols-outlined text-3xl" style={{ color: "#f59e0b", fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
            </div>
            <h4 className="font-headline-lg text-headline-lg" style={{ color: "#f8fafc" }}>Arena Jackpots</h4>
            <p style={{ color: "#B8BDD9", fontSize: "14px" }}>Group Stage Mega Pool. Total Prize: $2.5M USD.</p>
            <a href="/dashboard" className="font-bold text-sm" style={{ color: "#C8102E" }}>View Rules →</a>
          </div>
        </div>

      </div>
    </div>
  );
}
