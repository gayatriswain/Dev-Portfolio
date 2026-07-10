const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'dist') continue;
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (file.endsWith('.html') || file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.jsx')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
}

const files = walkSync('./');
let modifiedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Accent color
  content = content.replace(/#00A3E0/gi, '#B0293F');
  content = content.replace(/#0093CC/gi, '#8a1f31'); 
  content = content.replace(/#003D5B/gi, '#ffffff'); 
  
  // 2. Text colors to white/gray
  content = content.replace(/text-gray-900/g, 'text-white');
  content = content.replace(/text-gray-800/g, 'text-white');
  content = content.replace(/text-gray-700/g, 'text-gray-200');
  content = content.replace(/text-gray-600/g, 'text-gray-300');
  content = content.replace(/text-gray-500/g, 'text-gray-400');
  content = content.replace(/text-black/g, 'text-white');
  
  // Text color hexes in styles
  content = content.replace(/color:\s*#333333/gi, 'color: #ffffff');
  content = content.replace(/color:\s*#111827/gi, 'color: #ffffff');
  content = content.replace(/color:\s*#1f2937/gi, 'color: #ffffff');
  content = content.replace(/color:\s*#374151/gi, 'color: #e5e7eb');
  content = content.replace(/color:\s*#4b5563/gi, 'color: #d1d5db');

  // 3. Background colors to black/dark
  content = content.replace(/bg-white/g, 'bg-black');
  content = content.replace(/bg-\[\#FAFAFA\]/gi, 'bg-black');
  content = content.replace(/bg-gray-50/g, 'bg-neutral-900');
  content = content.replace(/bg-gray-100/g, 'bg-neutral-900');
  content = content.replace(/bg-gray-200/g, 'bg-neutral-800');
  
  // Bg color hexes in styles
  content = content.replace(/background-color:\s*#ffffff/gi, 'background-color: #000000');
  content = content.replace(/background-color:\s*#f9fafb/gi, 'background-color: #171717');
  content = content.replace(/background-color:\s*#f3f4f6/gi, 'background-color: #171717');
  content = content.replace(/background:\s*#ffffff/gi, 'background: #000000');

  // Theme css handling
  if (file.endsWith('theme.css')) {
    content = content.replace(/--background: #ffffff;/g, '--background: #000000;');
    content = content.replace(/--foreground: oklch\(0.145 0 0\);/g, '--foreground: #ffffff;');
  }

  // 4. Buttons background white and text black
  // Replace standard button variants
  content = content.replace(/<button([^>]*)bg-\[\#B0293F\]([^>]*)text-white([^>]*)>/g, '<button$1bg-white$2text-black$3>');
  content = content.replace(/<button([^>]*)bg-black([^>]*)text-white([^>]*)>/g, '<button$1bg-white$2text-black$3>');
  
  content = content.replace(/<a([^>]*)bg-\[\#B0293F\]([^>]*)text-white([^>]*)>/g, '<a$1bg-white$2text-black$3>');
  content = content.replace(/<a([^>]*)bg-black([^>]*)text-white([^>]*)>/g, '<a$1bg-white$2text-black$3>');

  content = content.replace(/hover:bg-\[\#8a1f31\]/g, 'hover:bg-gray-200');

  // Update styles for explicit button classes
  const btnClasses = ['\\.cta-button', '\\.cta-btn', '\\.hero-btn', '\\.filter-btn', '\\.btn'];
  for (const btnClass of btnClasses) {
    const regexBg = new RegExp(`(${btnClass}[^\\{]*\\{[^\\}]*?)background-color:\\s*(?:#B0293F|#000000);`, 'gi');
    content = content.replace(regexBg, '$1background-color: #ffffff;');
    
    const regexColor = new RegExp(`(${btnClass}[^\\{]*\\{[^\\}]*?)color:\\s*(?:#ffffff|white);`, 'gi');
    content = content.replace(regexColor, '$1color: #000000;');
  }

  // Also replace hover states for buttons in styles
  const btnHoverClasses = ['\\.cta-button:hover', '\\.cta-btn:hover', '\\.hero-btn:hover', '\\.filter-btn:hover', '\\.btn:hover'];
  for (const btnHover of btnHoverClasses) {
      const regexHover = new RegExp(`(${btnHover}[^\\{]*\\{[^\\}]*?)background-color:\\s*(?:#8a1f31|#0093CC);`, 'gi');
      content = content.replace(regexHover, '$1background-color: #e5e7eb;');
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
}

console.log('Modified', modifiedCount, 'files.');
