const fs = require('fs');

const pages = [
  'app/matches/page.tsx',
  'app/dashboard/page.tsx',
  'app/teams/page.tsx',
  'app/stadiums/page.tsx',
  'app/leaderboard/page.tsx'
];

pages.forEach((page, index) => {
  let content = fs.readFileSync(page, 'utf8');
  const mascotId = index + 1;
  
  // The snippet adds the mascot to the bottom right corner, fixed position so it follows the user
  const snippet = `<div className="relative min-h-screen">\n      {/* Mascot Image */}\n      <div className="fixed bottom-4 right-4 md:bottom-10 md:right-10 z-[100] w-40 md:w-64 pointer-events-none drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)]">\n        <img src="/mascot${mascotId}.jpg" alt="Mascot" className="w-full h-auto rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-white/20" style={{ transform: "rotate(-4deg)" }} />\n      </div>`;
  
  content = content.replace('<div className="relative min-h-screen">', snippet);
  fs.writeFileSync(page, content);
});
