const fs = require('fs');

const pages = [
  'app/matches/page.tsx',
  'app/dashboard/page.tsx',
  'app/teams/page.tsx',
  'app/stadiums/page.tsx',
  'app/leaderboard/page.tsx'
];

pages.forEach((page) => {
  let content = fs.readFileSync(page, 'utf8');
  // Change width from w-40 md:w-64 to w-32 md:w-48
  content = content.replace('w-40 md:w-64', 'w-32 md:w-48');
  fs.writeFileSync(page, content);
});
