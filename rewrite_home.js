const fs = require('fs');

const pageContent = `"use client";
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useMemo } from "react";

const allTeams = [
  { name: "Mexico", code: "mx" }, { name: "South Africa", code: "za" }, { name: "South Korea", code: "kr" }, { name: "Czechia", code: "cz" },
  { name: "Canada", code: "ca" }, { name: "Bosnia", code: "ba" }, { name: "Qatar", code: "qa" }, { name: "Switzerland", code: "ch" },
  { name: "Brazil", code: "br" }, { name: "Morocco", code: "ma" }, { name: "Haiti", code: "ht" }, { name: "Scotland", code: "gb-sct" },
  { name: "United States", code: "us" }, { name: "Paraguay", code: "py" }, { name: "Australia", code: "au" }, { name: "Türkiye", code: "tr" },
  { name: "Germany", code: "de" }, { name: "Curaçao", code: "cw" }, { name: "Ivory Coast", code: "ci" }, { name: "Ecuador", code: "ec" },
  { name: "Netherlands", code: "nl" }, { name: "Japan", code: "jp" }, { name: "Sweden", code: "se" }, { name: "Tunisia", code: "tn" },
  { name: "Belgium", code: "be" }, { name: "Egypt", code: "eg" }, { name: "Iran", code: "ir" }, { name: "New Zealand", code: "nz" },
  { name: "Spain", code: "es" }, { name: "Cabo Verde", code: "cv" }, { name: "Saudi Arabia", code: "sa" }, { name: "Uruguay", code: "uy" },
  { name: "France", code: "fr" }, { name: "Senegal", code: "sn" }, { name: "Iraq", code: "iq" }, { name: "Norway", code: "no" },
  { name: "Argentina", code: "ar" }, { name: "Algeria", code: "dz" }, { name: "Austria", code: "at" }, { name: "Jordan", code: "jo" },
  { name: "Portugal", code: "pt" }, { name: "DR Congo", code: "cd" }, { name: "Uzbekistan", code: "uz" }, { name: "Colombia", code: "co" },
  { name: "England", code: "gb-eng" }, { name: "Croatia", code: "hr" }, { name: "Ghana", code: "gh" }, { name: "Panama", code: "pa" }
];

export default function Home() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [globalVotes, setGlobalVotes] = useState<Record<string, string>>({});
  const [matchesData, setMatchesData] = useState<any[]>([]);
  const [topUsers, setTopUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/db').then(r => r.json()).then(data => {
      setTotalUsers(data.users ? data.users.length : 0);
      setGlobalVotes(data.globalVotes || {});
      setMatchesData(data.matches || []);
      
      const sortedUsers = [...(data.users || [])].sort((a: any, b: any) => b.predictions - a.predictions);
      setTopUsers(sortedUsers.slice(0, 3));
    });
  }, []);

  const winnerStats = useMemo(() => {
    const counts: Record<string, number> = {};
    const total = Object.keys(globalVotes).length;
    if (total === 0) return [];
    Object.values(globalVotes).forEach(code => {
      counts[code] = (counts[code] || 0) + 1;
    });
    const stats = Object.keys(counts).map(code => {
      const team = allTeams.find(t => t.code === code);
      return {
        code,
        name: team ? team.name : code,
        votes: counts[code],
        pct: Number(((counts[code] / total) * 100).toFixed(1))
      };
    }).sort((a, b) => b.votes - a.votes);
    return stats;
  }, [globalVotes]);

  const globalVoteCount = Object.keys(globalVotes).length;
  const totalPredictions = matchesData.reduce((acc, m) => acc + (m.totalVotes || 0), 0) + globalVoteCount;
  
  const featuredMatch = matchesData.length > 0 ? matchesData[0] : null;
  let matchVotes = 0;
  let sentimentPct = { home: 33.3, draw: 33.3, away: 33.3 };
  if (featuredMatch && featuredMatch.totalVotes > 0) {
    matchVotes = featuredMatch.totalVotes;
    sentimentPct = {
      home: (featuredMatch.homeWinVotes / featuredMatch.totalVotes) * 100,
      draw: (featuredMatch.drawVotes / featuredMatch.totalVotes) * 100,
      away: (featuredMatch.awayVotes / featuredMatch.totalVotes) * 100,
    };
  }

  const topPredictorName = topUsers.length > 0 ? topUsers[0].name : "None yet";
  
  const getFlag = (teamName: string) => {
    const team = allTeams.find(t => t.name === teamName);
    return team ? \`https://flagcdn.com/w80/\${team.code}.png\` : '';
  };

  return (
    <div style={{ background: "#f8fafc" }}>
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ minHeight: "100vh" }}>
        <div className="absolute inset-0">
          <img src="/fifa_world_cup_bg_4k.jpg" alt="FIFA 2026" className="w-full h-full object-cover" style={{ objectPosition: "center top", imageRendering: "high-quality" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(2,8,40,0.92) 0%, rgba(2,8,40,0.6) 40%, rgba(2,8,40,0.0) 60%, transparent 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(248,250,252,1) 0%, rgba(248,250,252,0.2) 15%, transparent 30%)" }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full py-24 md:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-24">
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "rgba(239,68,68,0.18)", border: "1px solid rgba(239,68,68,0.35)" }}>
                  <span className="w-2 h-2 rounded-full bg-red-400 pulse-live" />
                  <span style={{ fontFamily: "JetBrains Mono", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fca5a5" }}>Live · Tournament Access 2026</span>
                </div>
              </div>
              <p style={{ fontFamily: "JetBrains Mono", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#38bdf8", marginBottom: "16px" }}>
                ⚡ The Ultimate Prediction Platform
              </p>
              <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(44px, 5.5vw, 78px)", lineHeight: 1.0, letterSpacing: "-0.03em", color: "#ffffff", marginBottom: "28px" }}>
                Predict<br />
                Every Match.<br />
                <span style={{ background: "linear-gradient(90deg, #38bdf8 0%, #0ea5e9 40%, #818cf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Shape the Cup.
                </span>
              </h1>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "18px", lineHeight: 1.65, color: "rgba(255,255,255,0.72)", maxWidth: "440px", marginBottom: "36px" }}>
                Join <strong style={{ color: "#38bdf8" }}>{totalUsers > 0 ? totalUsers : "the community of"}</strong> football fans predicting FIFA World Cup 2026 results in real time. Climb the global leaderboard and win legendary prizes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href="/dashboard" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-[16px] transition-all active:scale-95" style={{ background: "linear-gradient(135deg, #0ea5e9, #0284c7)", color: "#ffffff", boxShadow: "0 8px 28px rgba(14,165,233,0.5)", fontFamily: "Outfit" }}>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span> Start Predicting Free
                </a>
                <a href="/matches" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-[16px] transition-all active:scale-95" style={{ background: "rgba(255,255,255,0.1)", color: "#ffffff", border: "1.5px solid rgba(255,255,255,0.3)", fontFamily: "Outfit", backdropFilter: "blur(10px)" }}>
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span> View Full Schedule
                </a>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: totalUsers.toString(), label: "Predictors" },
                  { value: "104", label: "Matches" },
                  { value: "48", label: "Nations" },
                  { value: globalVoteCount.toString(), label: "Global Votes" },
                ].map((s) => (
                  <div key={s.label} className="px-4 py-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
                    <p style={{ fontFamily: "Outfit", fontSize: "22px", fontWeight: 800, color: "#ffffff", lineHeight: 1.1 }}>{s.value}</p>
                    <p style={{ fontFamily: "JetBrains Mono", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex flex-col gap-4 items-end">
              {featuredMatch && (
                <div className="w-full max-w-sm rounded-2xl p-6 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(24px)" }}>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-2 h-2 rounded-full bg-red-400 pulse-live" />
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#fca5a5" }}>Next Match · {featuredMatch.date}</span>
                  </div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="text-center w-[30%]">
                      <img src={getFlag(featuredMatch.homeTeam)} alt={featuredMatch.homeTeam} className="h-10 w-14 object-cover rounded-lg mx-auto mb-2 shadow-lg" />
                      <span style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>{featuredMatch.homeTeam}</span>
                    </div>
                    <div className="text-center w-[40%]">
                      <div className="px-3 py-1 rounded-xl mb-2" style={{ background: "rgba(255,255,255,0.1)" }}>
                        <p style={{ fontFamily: "Outfit", fontSize: "24px", fontWeight: 900, color: "#38bdf8" }}>VS</p>
                      </div>
                      <span style={{ fontFamily: "JetBrains Mono", fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>{featuredMatch.time} ET</span>
                    </div>
                    <div className="text-center w-[30%]">
                      <img src={getFlag(featuredMatch.awayTeam)} alt={featuredMatch.awayTeam} className="h-10 w-14 object-cover rounded-lg mx-auto mb-2 shadow-lg" />
                      <span style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>{featuredMatch.awayTeam}</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between mb-1.5">
                      <span style={{ fontFamily: "JetBrains Mono", fontSize: "9px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Community Sentiment</span>
                      <span style={{ fontFamily: "JetBrains Mono", fontSize: "9px", color: "#38bdf8" }}>{matchVotes} votes</span>
                    </div>
                    <div className="h-2 w-full rounded-full overflow-hidden flex" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <div style={{ width: \`\${sentimentPct.home}%\`, background: "#38bdf8" }} />
                      <div style={{ width: \`\${sentimentPct.draw}%\`, background: "rgba(255,255,255,0.15)" }} />
                      <div style={{ width: \`\${sentimentPct.away}%\`, background: "#f59e0b" }} />
                    </div>
                  </div>
                  <a href="/matches" className="w-full block text-center py-3 rounded-xl font-bold text-[14px] transition-all" style={{ background: "linear-gradient(135deg, #0ea5e9, #0284c7)", color: "#ffffff" }}>
                    Make Your Prediction →
                  </a>
                </div>
              )}

              <div className="w-full max-w-sm rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(24px)" }}>
                <div className="flex items-center justify-between mb-4">
                  <span style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>🏆 Top Predictors</span>
                  <a href="/leaderboard" style={{ fontFamily: "JetBrains Mono", fontSize: "10px", color: "#38bdf8" }}>View All →</a>
                </div>
                {topUsers.length === 0 ? (
                  <p className="text-sm text-slate-300">No predictors yet.</p>
                ) : (
                  <div className="space-y-3">
                    {topUsers.map((u, i) => {
                      const tier = i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉";
                      return (
                        <div key={u.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{tier}</span>
                            <span style={{ fontSize: "13px", fontWeight: 600, color: "#ffffff" }}>{u.name}</span>
                          </div>
                          <span style={{ fontFamily: "Outfit", fontSize: "13px", fontWeight: 700, color: "#38bdf8" }}>{u.predictions * 50} pts</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden border-y" style={{ borderColor: "#e2e8f0", background: "#0f172a" }}>
        <div className="scrolling-ticker py-4 flex gap-16 items-center px-10">
          {[
            { icon: "groups", label: "Live Predictions", value: totalPredictions.toString(), color: "#38bdf8" },
            { icon: "star", label: "Top Predictor", value: topPredictorName, color: "#f59e0b" },
            { icon: "emoji_events", label: "Community", value: "Real-time voting", color: "#fbbf24" },
            { icon: "sports_score", label: "Matches", value: "104", color: "#38bdf8" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 flex-shrink-0">
              <span className="material-symbols-outlined text-[15px]" style={{ color: item.color, fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
              <span style={{ fontFamily: "JetBrains Mono", fontSize: "10px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{item.label}:</span>
              <span style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, color: item.color }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Predictions Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/wc_collage.jpg" alt="World Cup Action" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "rgba(2,8,40,0.92)" }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-1">
              <span className="badge mb-4" style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", color: "#fbbf24" }}>Live Predictions</span>
              <h2 className="font-headline-xl text-headline-xl mb-4" style={{ color: "#ffffff" }}>Who Will Lift the Trophy?</h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px", lineHeight: 1.7 }}>The community verdict is in — will you agree?</p>
              <a href="/dashboard" className="mt-6 inline-flex items-center gap-2 font-bold text-[14px]" style={{ color: "#38bdf8" }}>
                View All Predictions <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>
            <div className="lg:col-span-2 space-y-3">
              {winnerStats.length === 0 ? (
                <p className="text-slate-400">No predictions made yet. Be the first!</p>
              ) : (
                winnerStats.slice(0, 5).map((c: any, i: number) => {
                  const colors = ["#fbbf24", "#38bdf8", "#16a34a", "#dc2626", "#a78bfa"];
                  const color = colors[i % colors.length];
                  return (
                    <div key={c.name} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <span className="text-sm font-bold w-5" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono" }}>#{i + 1}</span>
                      <img src={\`https://flagcdn.com/w40/\${c.code}.png\`} alt={c.name} className="h-7 w-10 object-cover rounded shadow" />
                      <span style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, color: "#ffffff", flex: 1 }}>{c.name}</span>
                      <div className="flex-1 max-w-[160px]">
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                          <div style={{ width: \`\${c.pct}%\`, height: "100%", background: color, borderRadius: "99px", boxShadow: \`0 0 8px \${color}60\` }} />
                        </div>
                      </div>
                      <span style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 800, color: color, minWidth: "50px", textAlign: "right" }}>{c.pct}%</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
`;

fs.writeFileSync('app/page.tsx', pageContent);
