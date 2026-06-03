const fs = require('fs');
const path = require('path');

function convertHtmlToReact(htmlStr) {
  // Extract body content
  let bodyMatch = htmlStr.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return '';
  let content = bodyMatch[1];
  
  // Remove script tags
  content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove HTML comments
  content = content.replace(/<!--[\s\S]*?-->/g, '');
  
  // Convert class to className
  content = content.replace(/class="/g, 'className="');
  
  // Convert style="font-variation-settings: 'wght' 200;" to style={{ fontVariationSettings: "'wght' 200" }}
  content = content.replace(/style="([^"]*)"/g, (match, styleStr) => {
    let styles = styleStr.split(';').filter(s => s.trim() !== '');
    let styleObj = {};
    styles.forEach(s => {
      let [key, val] = s.split(':');
      if (key && val) {
        let camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        styleObj[camelKey] = val.trim();
      }
    });
    return `style={${JSON.stringify(styleObj)}}`;
  });

  // Convert for to htmlFor
  content = content.replace(/for="/g, 'htmlFor="');
  
  // Convert SVG attributes
  content = content.replace(/stroke-width/g, 'strokeWidth');
  content = content.replace(/stroke-linecap/g, 'strokeLinecap');
  content = content.replace(/stroke-linejoin/g, 'strokeLinejoin');
  content = content.replace(/fill-rule/g, 'fillRule');
  content = content.replace(/clip-rule/g, 'clipRule');
  
  // Self close img, input, hr, br
  content = content.replace(/<(img|input|hr|br)([^>]*?)(?<!\/)>/g, '<$1$2 />');

  return content;
}

const files = [
  { in: 'landing.html', out: 'app/page.tsx', name: 'Home' },
  { in: 'dashboard.html', out: 'app/dashboard/page.tsx', name: 'Dashboard' },
  { in: 'matches.html', out: 'app/matches/page.tsx', name: 'Matches' },
  { in: 'leaderboard.html', out: 'app/leaderboard/page.tsx', name: 'Leaderboard' }
];

files.forEach(file => {
  const inPath = path.join(__dirname, 'raw_screens', file.in);
  const outPath = path.join(__dirname, file.out);
  
  if (fs.existsSync(inPath)) {
    const html = fs.readFileSync(inPath, 'utf8');
    const jsx = convertHtmlToReact(html);
    
    // Create directory if not exists
    const dir = path.dirname(outPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const componentStr = `export default function ${file.name}() {
  return (
    <>
      ${jsx}
    </>
  );
}`;
    
    fs.writeFileSync(outPath, componentStr);
    console.log(`Converted ${file.in} to ${file.out}`);
  }
});
