const fs = require('fs');
const path = require('path');

const files = [
  'app/dashboard/page.tsx',
  'app/leaderboard/page.tsx',
  'app/matches/page.tsx',
  'app/page.tsx'
];

files.forEach(file => {
  const p = path.join(__dirname, file);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    
    // Simple regex replacements for known links
    content = content.replace(/href="#"(.*?)>Home<\/a>/g, 'href="/"$1>Home</a>');
    content = content.replace(/href="#"(.*?)>Schedule<\/a>/g, 'href="/matches"$1>Schedule</a>');
    content = content.replace(/href="#"(.*?)>Leaderboard<\/a>/g, 'href="/leaderboard"$1>Leaderboard</a>');
    content = content.replace(/href="#"(.*?)>Predictions<\/a>/g, 'href="/dashboard"$1>Predictions</a>');
    
    // Use Next.js Link component (Wait, we can just leave them as <a> for now as it works and it's simpler)
    
    fs.writeFileSync(p, content);
    console.log(`Fixed links in ${file}`);
  }
});
