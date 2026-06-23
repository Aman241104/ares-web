const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/clamp\(48px/g, 'clamp(36px')
    .replace(/clamp\(52px/g, 'clamp(38px')
    .replace(/clamp\(56px/g, 'clamp(40px')
    .replace(/clamp\(60px/g, 'clamp(42px')
    .replace(/clamp\(42px/g, 'clamp(32px');
    
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated ' + file);
  }
});
