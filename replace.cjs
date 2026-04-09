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
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}
const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/text-white/g, 'text-ink');
  content = content.replace(/text-gray-300/g, 'text-gray-700');
  content = content.replace(/text-gray-400/g, 'text-gray-600');
  content = content.replace(/bg-\\[#1e1e1e\\]/g, 'bg-white');
  content = content.replace(/border-white\/10/g, 'border-ink/10');
  content = content.replace(/bg-white\/5/g, 'bg-ink/5');
  content = content.replace(/bg-white\/10/g, 'bg-ink/10');
  content = content.replace(/text-gray-800/g, 'text-gray-200');
  content = content.replace(/border-gray-800/g, 'border-gray-200');
  fs.writeFileSync(file, content);
});
console.log('Replaced colors in ' + files.length + ' files');
