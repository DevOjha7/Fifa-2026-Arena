const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove emoji flag property
  content = content.replace(/flag:\s*".*?",\s*/g, '');
  // Remove {t.flag} usage
  content = content.replace(/\{t\.flag\}\s*/g, '');
  // Remove {s.flag} usage (for stadiums)
  content = content.replace(/\{s\.flag\}\s*/g, '');
  // Replace dark colors with light colors for dark theme readability
  content = content.replace(/"#0f172a"/g, '"#f8fafc"');
  content = content.replace(/"#64748b"/g, '"#cbd5e1"');
  // Remove the hardcoded background="#f8fafc" on outer wrappers
  content = content.replace(/style=\{\{ background:\s*"#f8fafc" \}\}/g, '');
  
  fs.writeFileSync(filePath, content);
}

processFile('app/teams/page.tsx');
processFile('app/stadiums/page.tsx');
processFile('app/matches/page.tsx');
