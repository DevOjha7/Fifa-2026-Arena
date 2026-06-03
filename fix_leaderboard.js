const fs = require('fs');

const path = 'app/leaderboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Adjust background position to top so faces are visible
content = content.replace('bg-cover bg-center', 'bg-cover bg-top');

// 2. Reduce blur by 50%
content = content.replace('backdrop-blur-sm', 'backdrop-blur-[2px]');

// 3. Fix white boxes and borders to match dark theme
content = content.replace(/bg:\s*"#fef3c7"/g, 'bg: "rgba(217, 119, 6, 0.2)"');
content = content.replace(/bg:\s*"#f1f5f9"/g, 'bg: "rgba(203, 213, 225, 0.1)"');
content = content.replace(/bg:\s*"#f8fafc"/g, 'bg: "rgba(30, 41, 59, 0.5)"');
content = content.replace(/background:\s*"#fafafa"/g, 'background: "rgba(30, 41, 59, 0.6)"');
content = content.replace(/background:\s*"#ffffff"/g, 'background: "rgba(30, 41, 59, 0.6)"');

// Borders
content = content.replace(/1px solid #f1f5f9/g, '1px solid #334155');
content = content.replace(/1px solid #e2e8f0/g, '1px solid #334155');
content = content.replace(/borderBottom:\s*"1px solid #f8fafc"/g, 'borderBottom: "1px solid #334155"');

// Table Row Hover/Selected States
content = content.replace(/background: isMe \? "#f0f9ff" : "transparent"/g, 'background: isMe ? "rgba(14, 165, 233, 0.1)" : "transparent"');
content = content.replace(/isMe \? "#f0f9ff" : "#f8fafc"/g, 'isMe ? "rgba(14, 165, 233, 0.1)" : "rgba(255,255,255,0.05)"');
content = content.replace(/isMe \? "#f0f9ff" : ""/g, 'isMe ? "rgba(14, 165, 233, 0.1)" : ""');

// Search Input and Pagination text colors that were dark on light bg
content = content.replace(/color: page === 1 \? "#e2e8f0" : "#475569"/g, 'color: page === 1 ? "#334155" : "#cbd5e1"');
content = content.replace(/color: page === totalPages \? "#e2e8f0" : "#475569"/g, 'color: page === totalPages ? "#334155" : "#cbd5e1"');
content = content.replace(/color: p === page \? "#ffffff" : "#475569"/g, 'color: p === page ? "#ffffff" : "#cbd5e1"');

fs.writeFileSync(path, content);
