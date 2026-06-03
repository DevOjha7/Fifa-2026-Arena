const fs = require('fs');

let content = fs.readFileSync('app/page.tsx', 'utf8');

// 1. Fix the featured match property names (home -> homeTeam, wait, db has home, so code should use home)
content = content.replace(/featuredMatch\.homeTeam/g, 'featuredMatch.home');
content = content.replace(/featuredMatch\.awayTeam/g, 'featuredMatch.away');

// 2. Add dynamic flags to the top predictors based on their global vote or a default flag
const mapBlockRegex = /\{topUsers\.map\(\(u, i\) => \{[\s\S]*?return \([\s\S]*?<div key=\{u\.id \|\| u\.name\}[\s\S]*?<span className="text-base">\{tier\}<\/span>[\s\S]*?<span style=\{\{ fontSize: "13px", fontWeight: 600, color: "#ffffff" \}\}>\{u\.name\}<\/span>/;

const newMapBlock = `{topUsers.map((u, i) => {
                      const tier = i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉";
                      const userVoteCode = globalVotes[u.id] || "mx"; // default flag if no vote
                      const flagUrl = \`https://flagcdn.com/w20/\${userVoteCode}.png\`;
                      
                      return (
                        <div key={u.id || u.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{tier}</span>
                            <span style={{ fontSize: "13px", fontWeight: 600, color: "#ffffff" }} className="flex items-center gap-1.5">
                              {u.name}
                              <img src={flagUrl} alt="flag" className="h-3 w-4 rounded-sm object-cover opacity-80" />
                            </span>`;

content = content.replace(mapBlockRegex, newMapBlock);

fs.writeFileSync('app/page.tsx', content);
