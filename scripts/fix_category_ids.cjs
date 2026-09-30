const fs = require('fs');

const mappings = {
  'controlFlow.ts': { from: /categoryId:\s*['"]controlFlow['"]/g, to: "categoryId: 'control_flow'" },
  'uxDesign.ts': { from: /categoryId:\s*['"]uxDesign['"]/g, to: "categoryId: 'ux_design'" },
  'dataKnowledge.ts': { from: /categoryId:\s*['"]dataKnowledge['"]/g, to: "categoryId: 'data_knowledge'" },
};

for (const [file, map] of Object.entries(mappings)) {
  const path = 'src/skills/categories/' + file;
  if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    const matches = content.match(map.from);
    if (matches) {
      content = content.replace(map.from, map.to);
      fs.writeFileSync(path, content, 'utf8');
      console.log(`Updated ${matches.length} categoryIds in ${file} to match data/categories.ts`);
    } else {
      console.log(`No mismatched categoryIds found in ${file}`);
    }
  }
}
