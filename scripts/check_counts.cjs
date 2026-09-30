const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/skills/categories');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && !f.includes('Skills.ts') && !f.includes('index.ts'));
const counts = {};
let total = 0;

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const matches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)];
  const name = f.replace('.ts', '');
  counts[name] = matches.length;
  total += matches.length;
});

console.log('Category Counts:');
console.dir(counts);
console.log('Total categories:', Object.keys(counts).length);
console.log('Grand Total skills:', total);
