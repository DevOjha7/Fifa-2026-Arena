const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\{u\.flag\}\s*/g, '');
  content = content.replace(/\{myProfile\.flag\}\s*/g, '');
  content = content.replace(/"#0f172a"/g, '"#f8fafc"');
  content = content.replace(/"#64748b"/g, '"#cbd5e1"');
  content = content.replace(/style=\{\{ background:\s*"#f8fafc"[^}]*\}\}/g, '');
  fs.writeFileSync(filePath, content);
}

processFile('app/leaderboard/page.tsx');
processFile('app/dashboard/page.tsx');
