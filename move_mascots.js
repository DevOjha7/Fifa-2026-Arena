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
  // Change bottom right positioning to top right (below the nav bar)
  content = content.replace('bottom-4 right-4 md:bottom-10 md:right-10', 'top-20 right-4 md:top-24 md:right-10');
  fs.writeFileSync(page, content);
});
