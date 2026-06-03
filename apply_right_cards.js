const fs = require('fs');

let content = fs.readFileSync('app/page.tsx', 'utf8');

// 1. Hook injections
const hookImports = `import { useState, useEffect } from "react";

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
  const [globalVotes, setGlobalVotes] = useState({});
  const [matchesData, setMatchesData] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

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

  const getFlag = (teamName) => {
    const team = allTeams.find(t => t.name === teamName);
    return team ? \`https://flagcdn.com/w80/\${team.code}.png\` : '';
  };

  return (`;

content = content.replace('export default function Home() {\n  return (', hookImports);

// 2. Fix the 1.2M+ stat
content = content.replace('<strong style={{ color: "#38bdf8" }}>1.2 million</strong>', '<strong style={{ color: "#38bdf8" }}>{totalUsers > 0 ? totalUsers : "the community of"}</strong>');
content = content.replace('{ value: "1.2M+", label: "Predictors" }', '{ value: totalUsers.toString(), label: "Predictors" }');
content = content.replace('{ value: "$500K", label: "Prizes" }', '{ value: globalVoteCount.toString(), label: "Global Votes" }');

// 3. Featured Match Card (lines ~100-138)
const featuredMatchRegex = /\{\/\* Featured Match Card \*\/\}[\s\S]*?Make Your Prediction →\n                <\/a>\n              <\/div>/;
const newFeaturedMatch = `{/* Featured Match Card */}
              {featuredMatch ? (
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
              ) : (
                <div className="w-full max-w-sm rounded-2xl p-6 relative overflow-hidden text-center" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(24px)" }}>
                   <p className="text-slate-300">Loading match data...</p>
                </div>
              )}`;
content = content.replace(featuredMatchRegex, newFeaturedMatch);

// 4. Leaderboard Mini
const miniLeaderboardRegex = /\{\/\* Leaderboard Mini \*\/\}[\s\S]*?<\/div>\n              <\/div>/;
const newMiniLeaderboard = `{/* Leaderboard Mini */}
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
                        <div key={u.id || u.name} className="flex items-center justify-between">
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
              </div>`;
content = content.replace(miniLeaderboardRegex, newMiniLeaderboard);

fs.writeFileSync('app/page.tsx', content);
