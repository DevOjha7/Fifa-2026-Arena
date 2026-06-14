"use client";
/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect } from "react";

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
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [globalVotes, setGlobalVotes] = useState<Record<string, string>>({});
  const [matchesData, setMatchesData] = useState<any[]>([]);
  const [topUsers, setTopUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/db').then(r => r.json()).then(data => {
      setTotalUsers(data.users ? data.users.length : 0);
      setGlobalVotes(data.globalVotes || {});
      setMatchesData(data.matches || []);
      const sortedUsers = [...(data.users || [])].sort((a, b) => b.predictions - a.predictions);
      setTopUsers(sortedUsers.slice(0, 3));
    });
  }, []);

  const globalVoteCount = Object.keys(globalVotes).length;
  const totalPredictions = matchesData.reduce((acc, m) => acc + (m.totalVotes || 0), 0) + globalVoteCount;

  const featuredMatch = matchesData.length > 0 ? matchesData[0] : null;
  let matchVotes = 0;
  let sentimentPct = { home: 33.3, draw: 33.3, away: 33.3 };
  if (featuredMatch && featuredMatch.totalVotes > 0) {
    matchVotes = featuredMatch.totalVotes;
    sentimentPct = { home: (featuredMatch.homeWinVotes / featuredMatch.totalVotes) * 100, draw: (featuredMatch.drawVotes / featuredMatch.totalVotes) * 100, away: (featuredMatch.awayVotes / featuredMatch.totalVotes) * 100 };
  }

  const getFlag = (teamName: string) => {
    const team = allTeams.find(t => t.name === teamName);
    return team ? `https://flagcdn.com/w80/${team.code}.png` : '';
  };

  return (
    <div style={{ background: "#0D1042" }}>

      {/* ═══════════════════════════════════════════════════════════
          HERO — Cristiano Ronaldo Background, Left-side text layout
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ minHeight: "100vh" }}>

        {/* Background: Football Player (Ronaldo-style, full screen) */}
        <div className="absolute inset-0">
          <img
            src="/fifa_world_cup_bg_4k.jpg"
            alt="FIFA 2026 World Cup Teams"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center top" }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(13,16,66,0.94) 0%, rgba(13,16,66,0.65) 40%, rgba(13,16,66,0.0) 60%, transparent 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(13,16,66,1) 0%, rgba(13,16,66,0.2) 15%, transparent 30%)" }} />
        </div>

        {/* Decorative orbs */}
        <div className="absolute top-24 left-[38%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200, 16, 46,0.08) 0%, transparent 70%)" }} />
        <div className="absolute bottom-32 left-[20%] w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(201, 168, 76,0.06) 0%, transparent 70%)" }} />

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full py-24 md:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-24">

            {/* LEFT — Text */}
            <div>
              {/* Live Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: "rgba(239,68,68,0.18)", border: "1px solid rgba(239,68,68,0.35)" }}>
                  <span className="w-2 h-2 rounded-full bg-red-400 pulse-live" />
                  <span style={{ fontFamily: "JetBrains Mono", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fca5a5" }}>Live · Tournament Access 2026</span>
                </div>
              </div>

              {/* Eyebrow */}
              <p style={{ fontFamily: "JetBrains Mono", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "16px" }}>
                ⚡ The Ultimate Prediction Platform
              </p>

              {/* Main Headline */}
              <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "clamp(44px, 5.5vw, 78px)", lineHeight: 1.0, letterSpacing: "-0.03em", color: "#ffffff", marginBottom: "28px" }}>
                Predict<br />
                Every Match.<br />
                <span style={{ background: "linear-gradient(90deg, #C9A84C 0%, #C8102E 40%, #818cf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Shape the Cup.
                </span>
              </h1>

              {/* Subtext */}
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "18px", lineHeight: 1.65, color: "rgba(255,255,255,0.72)", maxWidth: "440px", marginBottom: "36px" }}>
                Join <strong style={{ color: "#C9A84C" }}>{totalUsers > 0 ? totalUsers : "the community of"}</strong> football fans predicting FIFA World Cup 2026 results in real time. Climb the global leaderboard and win legendary prizes.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a href="/dashboard"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-[16px] transition-all active:scale-95"
                  style={{ background: "linear-gradient(135deg, #C8102E, #a50d25)", color: "#ffffff", boxShadow: "0 8px 28px rgba(200, 16, 46,0.5)", fontFamily: "Outfit" }}>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  Start Predicting Free
                </a>
                <a href="/matches"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-[16px] transition-all active:scale-95"
                  style={{ background: "rgba(255,255,255,0.1)", color: "#ffffff", border: "1.5px solid rgba(255,255,255,0.3)", fontFamily: "Outfit", backdropFilter: "blur(10px)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; }}>
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                  View Full Schedule
                </a>
              </div>

              {/* Quick Stats Strip */}
              <div className="flex flex-wrap gap-3">
                {[
                  { value: totalUsers.toString(), label: "Predictors" },
                  { value: "104", label: "Matches" },
                  { value: "48", label: "Nations" },
                  { value: globalVoteCount.toString(), label: "Global Votes" },
                ].map((s) => (
                  <div key={s.label} className="px-4 py-2.5 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
                    <p style={{ fontFamily: "Outfit", fontSize: "22px", fontWeight: 800, color: "#ffffff", lineHeight: 1.1 }}>{s.value}</p>
                    <p style={{ fontFamily: "JetBrains Mono", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Floating Info Card */}
            <div className="hidden lg:flex flex-col gap-4 items-end">
              {/* Featured Match Card */}
              {featuredMatch ? (
                <div className="w-full max-w-sm rounded-2xl p-6 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(24px)" }}>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-2 h-2 rounded-full bg-red-400 pulse-live" />
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#fca5a5" }}>Next Match · {featuredMatch.date}</span>
                  </div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="text-center w-[30%]">
                      <img src={getFlag(featuredMatch.home)} alt={featuredMatch.home} className="h-10 w-14 object-cover rounded-lg mx-auto mb-2 shadow-lg" />
                      <span style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>{featuredMatch.home}</span>
                    </div>
                    <div className="text-center w-[40%]">
                      <div className="px-3 py-1 rounded-xl mb-2" style={{ background: "rgba(255,255,255,0.1)" }}>
                        <p style={{ fontFamily: "Outfit", fontSize: "24px", fontWeight: 900, color: "#C9A84C" }}>VS</p>
                      </div>
                      <span style={{ fontFamily: "JetBrains Mono", fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>{featuredMatch.time} ET</span>
                    </div>
                    <div className="text-center w-[30%]">
                      <img src={getFlag(featuredMatch.away)} alt={featuredMatch.away} className="h-10 w-14 object-cover rounded-lg mx-auto mb-2 shadow-lg" />
                      <span style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>{featuredMatch.away}</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between mb-1.5">
                      <span style={{ fontFamily: "JetBrains Mono", fontSize: "9px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Community Sentiment</span>
                      <span style={{ fontFamily: "JetBrains Mono", fontSize: "9px", color: "#C9A84C" }}>{matchVotes} votes</span>
                    </div>
                    <div className="h-2 w-full rounded-full overflow-hidden flex" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <div style={{ width: `${sentimentPct.home}%`, background: "#C9A84C" }} />
                      <div style={{ width: `${sentimentPct.draw}%`, background: "rgba(255,255,255,0.15)" }} />
                      <div style={{ width: `${sentimentPct.away}%`, background: "#f59e0b" }} />
                    </div>
                  </div>
                  <a href="/matches" className="w-full block text-center py-3 rounded-xl font-bold text-[14px] transition-all" style={{ background: "linear-gradient(135deg, #C8102E, #a50d25)", color: "#ffffff" }}>
                    Make Your Prediction →
                  </a>
                </div>
              ) : (
                <div className="w-full max-w-sm rounded-2xl p-6 relative overflow-hidden text-center" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(24px)" }}>
                   <p className="text-slate-300">Loading match data...</p>
                </div>
              )}

              {/* Leaderboard Mini */}
              <div className="w-full max-w-sm rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(24px)" }}>
                <div className="flex items-center justify-between mb-4">
                  <span style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>🏆 Top Predictors</span>
                  <a href="/leaderboard" style={{ fontFamily: "JetBrains Mono", fontSize: "10px", color: "#C9A84C" }}>View All →</a>
                </div>
                {topUsers.length === 0 ? (
                  <p className="text-sm text-slate-300">No predictors yet.</p>
                ) : (
                  <div className="space-y-3">
                    {topUsers.map((u, i) => {
                      const tier = i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉";
                      const userVoteCode = globalVotes[u.id] || "mx"; // default flag if no vote
                      const flagUrl = `https://flagcdn.com/w20/${userVoteCode}.png`;
                      
                      return (
                        <div key={u.id || u.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{tier}</span>
                            <span style={{ fontSize: "13px", fontWeight: 600, color: "#ffffff" }} className="flex items-center gap-1.5">
                              {u.name}
                              <img src={flagUrl} alt="flag" className="h-3 w-4 rounded-sm object-cover opacity-80" />
                            </span>
                          </div>
                          <span style={{ fontFamily: "Outfit", fontSize: "13px", fontWeight: 700, color: "#C9A84C" }}>{u.predictions * 50} pts</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 opacity-60">
          <span style={{ fontFamily: "JetBrains Mono", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>Scroll</span>
          <span className="material-symbols-outlined text-[20px] floating" style={{ color: "rgba(255,255,255,0.4)" }}>keyboard_arrow_down</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          LIVE TICKER
      ═══════════════════════════════════════════════════════════ */}
      <div className="overflow-hidden border-y" style={{ borderColor: "#e2e8f0", background: "#0D1042" }}>
        <div className="scrolling-ticker py-4">
          {[1, 2].map((k) => (
            <div key={k} className="flex gap-16 items-center px-10">
              {[
                { icon: "groups", label: "Live Predictions", value: "1,242,509", color: "#C9A84C" },
                { icon: "trending_up", label: "Top Pick", value: "Mexico 2–1 South Africa", color: "#f59e0b" },
                { icon: "person", label: "Active Players", value: "42.8k Online", color: "#C9A84C" },
                { icon: "emoji_events", label: "Prize Pool", value: "$500,000", color: "#fbbf24" },
                { icon: "sports_score", label: "Next Match In", value: "8 Days", color: "#C9A84C" },
                { icon: "star", label: "Top Predictor", value: "Tactical_Titan", color: "#f59e0b" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 flex-shrink-0">
                  <span className="material-symbols-outlined text-[15px]" style={{ color: item.color, fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                  <span style={{ fontFamily: "JetBrains Mono", fontSize: "10px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{item.label}:</span>
                  <span style={{ fontFamily: "Outfit", fontSize: "14px", fontWeight: 700, color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          STATS — Stadium Aerial Background
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src="/massive_lineup.jpg" alt="Stadium Lineup" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "rgba(13,16,66,0.92)" }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-10">
            <p style={{ fontFamily: "JetBrains Mono", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C8102E", marginBottom: "8px" }}>By The Numbers</p>
            <h2 className="font-headline-xl text-headline-xl" style={{ color: "#F8F9FF" }}>The World's Biggest Football Event</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { value: "1.2M+", label: "Active Predictors", icon: "groups", color: "#C8102E", bg: "rgba(201,168,76,0.1)", desc: "Fans worldwide" },
              { value: "104", label: "Total Matches", icon: "sports_soccer", color: "#f59e0b", bg: "#fef3c7", desc: "Group to Final" },
              { value: "48", label: "Nations", icon: "public", color: "#C8102E", bg: "rgba(201,168,76,0.1)", desc: "All Confederations" },
              { value: "$500K", label: "Prize Pool", icon: "emoji_events", color: "#f59e0b", bg: "#fef3c7", desc: "Total Rewards" },
            ].map((s) => (
              <div key={s.label} className="stat-card text-center relative overflow-hidden group">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(135deg, ${s.color}06, transparent)` }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: s.bg }}>
                  <span className="material-symbols-outlined text-3xl" style={{ color: s.color, fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                </div>
                 <p style={{ fontFamily: "Outfit", fontSize: "38px", fontWeight: 900, color: "#F8F9FF", lineHeight: 1 }}>{s.value}</p>
                 <p style={{ fontFamily: "Outfit", fontSize: "15px", fontWeight: 600, color: "#F8F9FF", marginTop: "6px" }}>{s.label}</p>
                 <p style={{ fontFamily: "JetBrains Mono", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A80A8", marginTop: "4px" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURED STARS — Crowd Background
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/football_fans.png" alt="Stadium Crowd" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "rgba(13,16,66,0.91)" }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="badge badge-primary mb-3">Featured</span>
              <h2 className="font-headline-xl text-headline-xl" style={{ color: "#F8F9FF" }}>World Cup Stars</h2>
              <p className="font-body-lg mt-2" style={{ color: "#B8BDD9", maxWidth: "420px" }}>Track elite athletes and make player-performance predictions for bonus points.</p>
            </div>
            <a href="/teams" className="hidden md:flex items-center gap-2 font-medium text-[14px]" style={{ color: "#C8102E" }}>
              Explore Teams <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                img: "/superstars_poster.jpg",
                badge: "Top Predictor", badgeIcon: "star", badgeColor: "#C8102E",
                title: "Tactical Titan", desc: "Top 0.1% worldwide. Follow their picks and strategies for the group stages.", cta: "View Profile", ctaBg: "#0D1042",
              },
              {
                img: "/haaland_26.jpg",
                badge: "Precision Tracking", badgeIcon: "bolt", badgeColor: "#C8102E",
                title: "Action-Based Rewards", desc: "Earn points for assists, saves, and key events during matches.", cta: "Boost Your Prediction", ctaBg: "#C8102E",
              },
            ].map((card) => (
              <a href="/dashboard" key={card.title} className="relative rounded-3xl overflow-hidden group cursor-pointer block" style={{ aspectRatio: "16/7" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1042]/90 via-[#0D1042]/30 to-transparent z-10" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity z-10" style={{ background: `${card.ctaBg}10` }} />
                <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[16px]" style={{ color: card.badgeColor }}>{card.badgeIcon}</span>
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: card.badgeColor }}>{card.badge}</span>
                  </div>
                  <h3 className="font-headline-xl text-headline-xl mb-2" style={{ color: "#ffffff" }}>{card.title}</h3>
                  <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", marginBottom: "20px" }}>{card.desc}</p>
                  <button className="px-7 py-3 rounded-full font-bold text-[15px] transition-all active:scale-95 flex items-center gap-2 hover:shadow-lg hover:scale-105"
                    style={{ background: card.ctaBg, color: "#ffffff", boxShadow: `0 6px 20px ${card.ctaBg}50` }}>
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                    {card.cta}
                  </button>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PLATFORM FEATURES — Clean with Images
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/neymar_brazil.jpg" alt="Neymar Brazil Collage" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "rgba(13,16,66,0.96)" }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="badge mb-4" style={{ background: "rgba(200, 16, 46,0.15)", border: "1px solid rgba(200, 16, 46,0.3)", color: "#C9A84C" }}>Platform Features</span>
            <h2 className="font-headline-xl text-headline-xl mb-4" style={{ color: "#ffffff" }}>Everything You Need to Win</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "17px", maxWidth: "480px", margin: "0 auto" }}>
              From AI-powered analytics to real-time leaderboards — the complete prediction ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {([
              { icon: "query_stats", title: "AI Predictions", desc: "Machine-learning models analyze form and odds to give you the winning edge.", color: "#C9A84C", img: "/football_action.png" },
              { icon: "leaderboard", title: "Global Rankings", desc: "Compete with 1.2M+ fans worldwide. Rise through legendary tiers.", color: "#f59e0b", img: "/global_rankings.jpg" },
              { icon: "stadium", title: "Stadium HUD", desc: "Real-time venue overlays, fan-zone maps, and location bonuses.", color: "#a78bfa", img: "/stadium_blue.jpg" },
              { icon: "emoji_events", title: "Prize Rewards", desc: "Win exclusive merchandise, tickets, and $500K in cash prizes.", color: "#f59e0b", img: "/prize_rewards_miami.jpg" },
              { icon: "groups", title: "Friend Leagues", desc: "Create private leagues. Settle the debate of who's the football expert.", color: "#C9A84C", img: "/spain_team.jpg", pos: "center 25%" },
              { icon: "notifications_active", title: "Match Alerts", desc: "Instant push notifications for line-ups, odds, and match reminders.", color: "#f43f5e", img: "/football_fans.png" },
            ] as { icon: string; title: string; desc: string; color: string; img: string; pos?: string; customScale?: number; fit?: string }[]).map((f) => (
              <a href="/dashboard" key={f.title} className="group rounded-2xl overflow-hidden relative cursor-pointer transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] block"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                {/* Feature card background image */}
                <div className="relative h-40 overflow-hidden flex items-center justify-center">
                   <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(13,16,66,0.95) 0%, rgba(13,16,66,0.4) 100%)", zIndex: 1 }} />
                  <img src={f.img} alt={f.title} 
                    className={"transition-transform duration-700 " + (f.customScale ? "group-hover:scale-[1.05] " : "w-full h-full group-hover:scale-110 ") + (f.fit || "object-cover")} 
                    style={{ 
                      objectPosition: f.pos || "center",
                      ...(f.customScale ? { width: `${f.customScale * 100}%`, height: `${f.customScale * 100}%`, maxWidth: 'none', objectFit: 'contain' } : {})
                    }} 
                  />
                  <div className="absolute bottom-4 left-5 z-10">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: `${f.color}25`, border: `1px solid ${f.color}40` }}>
                      <span className="material-symbols-outlined text-[22px]" style={{ color: f.color, fontVariationSettings: "'FILL' 1" }}>{f.icon}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 transition-colors group-hover:bg-[#131650]/50" style={{ background: "rgba(255,255,255,0.04)", borderTop: `2px solid ${f.color}30` }}>
                  <h3 style={{ fontFamily: "Outfit", fontSize: "18px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>{f.title}</h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{f.desc}</p>
                  <div className="mt-4 flex items-center gap-2" style={{ color: f.color }}>
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: "11px", fontWeight: 600, letterSpacing: "0.06em" }}>Explore</span>
                    <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-2">arrow_forward</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HOST CITIES — Map Section
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/players_pie.jpg" alt="Players Pie Chart" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "rgba(13,16,66,0.90)" }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="badge badge-accent mb-4">16 Host Venues</span>
              <h2 className="font-headline-xl text-headline-xl mb-5" style={{ color: "#F8F9FF" }}>Three Nations. <span className="gradient-text-accent">One Dream.</span></h2>
              <p style={{ color: "#B8BDD9", fontSize: "17px", lineHeight: 1.7, maxWidth: "440px", marginBottom: "28px" }}>
                From the iconic Estadio Azteca to the ultra-modern SoFi Stadium — experience football history across 16 world-class venues.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { city: "New York", flag: "🇺🇸" }, { city: "Mexico City", flag: "🇲🇽" }, { city: "Toronto", flag: "🇨🇦" },
                  { city: "Los Angeles", flag: "🇺🇸" }, { city: "Dallas", flag: "🇺🇸" }, { city: "Miami", flag: "🇺🇸" },
                ].map((c) => (
                  <span key={c.city} className="px-4 py-2 rounded-full text-[13px] font-medium"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(201,168,76,0.2)", color: "#B8BDD9" }}>
                    {c.flag} {c.city}
                  </span>
                ))}
              </div>
              <a href="/stadiums" className="btn-primary">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>stadium</span>
                Explore All Stadiums
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { img: "/stadium_metlife.jpg", name: "MetLife Stadium", city: "NJ", label: "Grand Final", pos: "center bottom" },
                { img: "/stadium_fisheye.jpg", name: "SoFi Stadium", city: "LA", label: "Semi-Final", pos: "center bottom" },
                { img: "/stadium_red_sunset.jpg", name: "Azteca", city: "MEX", label: "Opening Match", pos: "center" },
                { img: "/stadium_modern.jpg", name: "AT&T Stadium", city: "DAL", label: "Quarter-Final", pos: "center bottom" },
              ].map((v) => (
                <a href="/stadiums" key={v.name} className="relative rounded-2xl overflow-hidden group cursor-pointer block hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow" style={{ aspectRatio: "4/3" }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                  <img src={v.img} alt={v.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ objectPosition: v.pos || "center" }} />
                  <div className="absolute bottom-3 left-3 right-3 z-20">
                    <p style={{ fontFamily: "Outfit", fontSize: "13px", fontWeight: 700, color: "#ffffff", transition: "color 0.3s" }} className="group-hover:text-[#C9A84C]">{v.name}</p>
                    <div className="flex items-center justify-between">
                      <span style={{ fontFamily: "JetBrains Mono", fontSize: "9px", color: "rgba(255,255,255,0.6)" }}>{v.city}</span>
                      <span style={{ fontFamily: "JetBrains Mono", fontSize: "9px", color: "#f59e0b" }}>{v.label}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TOP PREDICTIONS — Dark section
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/wc_collage.jpg" alt="World Cup Action" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "rgba(2,8,40,0.92)" }} />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-1">
              <span className="badge mb-4" style={{ background: "rgba(201, 168, 76,0.15)", border: "1px solid rgba(201, 168, 76,0.3)", color: "#fbbf24" }}>Live Predictions</span>
              <h2 className="font-headline-xl text-headline-xl mb-4" style={{ color: "#ffffff" }}>Who Will Lift the Trophy?</h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "15px", lineHeight: 1.7 }}>Millions of fans have cast their predictions. The community verdict is in — will you agree?</p>
              <a href="/dashboard" className="mt-6 inline-flex items-center gap-2 font-bold text-[14px]" style={{ color: "#C9A84C" }}>
                View All Predictions <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>
            <div className="lg:col-span-2 space-y-3">
              {[
                { flag: "🇧🇷", code: "br", name: "Brazil", pct: 28.5, color: "#16a34a" },
                { flag: "🇫🇷", code: "fr", name: "France", pct: 21.2, color: "#2563eb" },
                { flag: "🇦🇷", code: "ar", name: "Argentina", pct: 18.4, color: "#C9A84C" },
                { flag: "🇪🇸", code: "es", name: "Spain", pct: 12.1, color: "#dc2626" },
                { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", code: "gb-eng", name: "England", pct: 9.8, color: "#a78bfa" },
              ].map((c, i) => (
                <div key={c.name} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="text-sm font-bold w-5" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono" }}>#{i + 1}</span>
                  <img src={`https://flagcdn.com/w40/${c.code}.png`} alt={c.name} className="h-7 w-10 object-cover rounded shadow" />
                  <span className="text-lg flex-shrink-0">{c.flag}</span>
                  <span style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 700, color: "#ffffff", flex: 1 }}>{c.name}</span>
                  <div className="flex-1 max-w-[160px]">
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <div style={{ width: `${(c.pct / 30) * 100}%`, height: "100%", background: c.color, borderRadius: "99px", boxShadow: `0 0 8px ${c.color}60` }} />
                    </div>
                  </div>
                  <span style={{ fontFamily: "Outfit", fontSize: "16px", fontWeight: 800, color: c.color, minWidth: "50px", textAlign: "right" }}>{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA BANNER — Night Stadium Background
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/stadium_red_sunset.jpg" alt="Night Stadium" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,16,66,0.95) 0%, rgba(27,31,94,0.9) 40%, rgba(200,16,46,0.85) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          {/* Floating logo */}
          <div className="flex justify-center mb-6">
            <img src="/fifa2026_logo.jpg" alt="FIFA World Cup 2026" className="h-20 w-20 object-cover rounded-2xl drop-shadow-2xl" style={{ border: "2px solid rgba(201,168,76,0.5)", boxShadow: "0 0 30px rgba(201,168,76,0.4)" }} />
          </div>

          <div className="badge inline-flex mb-6" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)", color: "#ffffff" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-white pulse-live" />
            Tournament Starts June 11, 2026
          </div>
          <h2 style={{ fontFamily: "Outfit", fontWeight: 900, fontSize: "clamp(36px, 5vw, 68px)", lineHeight: 1.0, letterSpacing: "-0.03em", color: "#ffffff", marginBottom: "20px" }}>
            Ready to Make<br />
            <span style={{ color: "#fef3c7" }}>Your Move?</span>
          </h2>
          <p style={{ fontFamily: "Inter", fontSize: "18px", color: "rgba(255,255,255,0.85)", maxWidth: "520px", margin: "0 auto 36px", lineHeight: 1.65 }}>
            The higher the risk, the greater the legend. Join millions of fans and start predicting today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/dashboard"
              className="inline-flex items-center justify-center px-10 py-4 text-[17px] font-bold rounded-full transition-all active:scale-95"
              style={{ background: "#ffffff", color: "#a50d25", boxShadow: "0 8px 28px rgba(0,0,0,0.2)", fontFamily: "Outfit" }}>
              <span className="material-symbols-outlined text-[18px] mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              Start Predicting Free
            </a>
            <a href="/leaderboard"
              className="inline-flex items-center justify-center px-10 py-4 text-[17px] font-bold rounded-full transition-all"
              style={{ background: "rgba(255,255,255,0.15)", color: "#ffffff", border: "1.5px solid rgba(255,255,255,0.4)", fontFamily: "Outfit" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.25)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)"; }}>
              <span className="material-symbols-outlined text-[18px] mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>leaderboard</span>
              View Rankings
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
