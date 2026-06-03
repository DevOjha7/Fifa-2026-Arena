"use client";
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

const flagUrl = (code: string) => `https://flagcdn.com/w80/${code}.png`;

export default function Dashboard() {
  const [totalVotes, setTotalVotes] = useState(0);
  const [globalVotes, setGlobalVotes] = useState<Record<string, string>>({});
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [selectedWinner, setSelectedWinner] = useState<string>("");
  const [loadingVote, setLoadingVote] = useState(false);

  const loadStats = () => {
    fetch('/api/db').then(r => r.json()).then(data => {
      const sum = (data.matches || []).reduce((acc: number, m: any) => acc + m.totalVotes, 0);
      setTotalVotes(sum);
      setGlobalVotes(data.globalVotes || {});
    });
    const savedId = localStorage.getItem('activeUserId');
    setActiveUserId(savedId);
  };

  useEffect(() => {
    loadStats();
    window.addEventListener('userChanged', loadStats);
    return () => window.removeEventListener('userChanged', loadStats);
  }, []);

  useEffect(() => {
    if (activeUserId && globalVotes[activeUserId]) {
      setSelectedWinner(globalVotes[activeUserId]);
    } else {
      setSelectedWinner("");
    }
  }, [activeUserId, globalVotes]);

  const handleVoteWinner = async (code: string) => {
    if (!activeUserId) {
      alert("Please login to make a prediction!");
      return;
    }
    setLoadingVote(true);
    try {
      const res = await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'global_vote', userId: activeUserId, countryCode: code })
      });
      const data = await res.json();
      setGlobalVotes(data.globalVotes || {});
      setSelectedWinner(code);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingVote(false);
    }
  };

  // Calculate percentages
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
        pct: ((counts[code] / total) * 100).toFixed(1)
      };
    });

    return stats.sort((a, b) => b.votes - a.votes);
  }, [globalVotes]);

  return (
    <div className="relative min-h-screen">
      {/* Mascot Image */}
      <div className="fixed top-20 right-4 md:top-24 md:right-10 z-[100] w-32 md:w-48 pointer-events-none drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)]">
        <img src="/mascot2.jpg" alt="Mascot" className="w-full h-auto rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-white/20" style={{ transform: "rotate(-4deg)" }} />
      </div>
      <div className="fixed inset-0 z-[-2] bg-cover" style={{ backgroundImage: "url('/bg-predictions.jpg')", backgroundPosition: "center bottom" }}></div>
      <div className="fixed inset-0 z-[-1] bg-[#0f172a]/70 backdrop-blur-[6px]"></div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-12">

        {/* Header */}
        <div className="mb-12">
          <div className="badge inline-flex mb-4 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(14,165,233,0.2)", color: "#0ea5e9", border: "1px solid rgba(14,165,233,0.3)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mr-2 pulse-live" />
            Live Global Consensus
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-[52px] tracking-tight mb-4" style={{ color: "#f8fafc" }}>
            World Cup <span className="gradient-text-primary" style={{ background: "linear-gradient(90deg, #38bdf8, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Predictions</span>
          </h1>
          <p className="font-body-lg" style={{ color: "#94a3b8", maxWidth: "520px" }}>
            Harness the wisdom of the crowd. Cast your vote for the ultimate tournament winner and see how the community feels.
          </p>
        </div>

        {/* Voting Section */}
        <div className="glass-card rounded-2xl p-8 mb-10 flex flex-col md:flex-row items-center gap-8 border border-slate-700/50 bg-slate-800/40 backdrop-blur-xl">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">Who will win the World Cup?</h2>
            <p className="text-slate-400 text-sm mb-6">Select your top pick. This helps calculate the global consensus.</p>
            <div className="flex gap-4 items-center">
              <select
                className="flex-1 bg-slate-900/60 border border-slate-600 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-500 transition-colors"
                value={selectedWinner}
                onChange={(e) => handleVoteWinner(e.target.value)}
                disabled={loadingVote || !activeUserId}
              >
                <option value="" disabled>-- Select a Nation --</option>
                {allTeams.map(t => (
                  <option key={t.code} value={t.code}>{t.name}</option>
                ))}
              </select>
              {selectedWinner && (
                <img src={flagUrl(selectedWinner)} alt="Selected Flag" className="h-10 rounded shadow-md" />
              )}
            </div>
            {!activeUserId && <p className="text-rose-400 text-xs mt-3 font-bold">Please login via the top right menu to vote.</p>}
          </div>

          {/* Stats Summary Panel */}
          <div className="flex-1 w-full bg-slate-900/40 border border-slate-700/50 rounded-xl p-6 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-4 border-b border-slate-700/50 pb-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Predictions</p>
                <p className="text-3xl font-black text-sky-400">{totalVotes.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Global Votes</p>
                <p className="text-3xl font-black text-amber-400">{Object.keys(globalVotes).length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <span className="material-symbols-outlined text-green-400 text-[18px]">verified</span>
              Live updates directly from community votes.
            </div>
          </div>
        </div>

        {/* Global Consensus Chart */}
        <h3 className="font-headline-lg text-2xl mb-6 text-white px-2">Community Consensus</h3>
        
        {winnerStats.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center border border-slate-700/50 bg-slate-800/40">
            <span className="material-symbols-outlined text-4xl text-slate-500 mb-3 block">how_to_vote</span>
            <p className="text-slate-300 text-lg">No votes have been cast yet.</p>
            <p className="text-slate-500 text-sm mt-1">Be the first to predict the World Cup winner!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {winnerStats.map((stat, i) => (
              <div key={stat.code} className="glass-card rounded-2xl p-6 flex items-center gap-5 border border-slate-700/50 bg-slate-800/40 hover:bg-slate-800/60 transition-colors">
                <div className="relative">
                  <img src={flagUrl(stat.code)} alt={`${stat.name} flag`} className="w-16 h-12 object-cover rounded shadow-md border border-slate-600" />
                  {i === 0 && (
                    <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg border border-amber-300">
                      #1
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-end mb-2">
                    <h4 className="text-lg font-bold text-white leading-none">{stat.name}</h4>
                    <span className="text-sky-400 font-black text-lg leading-none">{stat.pct}%</span>
                  </div>
                  <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden border border-slate-600/50">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-300"
                      style={{ width: `${stat.pct}%`, transition: 'width 1s ease-out' }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2 font-mono">{stat.votes} {stat.votes === 1 ? 'vote' : 'votes'}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}