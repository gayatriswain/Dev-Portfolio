const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, 'client/components'),
  path.join(__dirname, 'app')
];

const walkSync = (dir, filelist = []) => {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.jsx')) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

let allFiles = [];
directories.forEach(dir => {
  allFiles = allFiles.concat(walkSync(dir));
});

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace colors in Tailwind classes
  content = content.replace(/purple/g, 'red');
  content = content.replace(/blue-([0-9]+)/g, 'red-$1');
  content = content.replace(/violet-([0-9]+)/g, 'pink-$1');
  content = content.replace(/cyan-([0-9]+)/g, 'pink-$1');
  
  // Update rgba values for shadow colors (purple -> red)
  // 168,85,247 is purple. Red is 219,31,67
  content = content.replace(/168,85,247/g, '219,31,67');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});
console.log('Done.');
