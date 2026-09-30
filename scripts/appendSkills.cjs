const fs = require('fs');
const path = require('path');

function appendSkills(categoryFileName, newSkills) {
  const filePath = path.join(__dirname, '..', 'src', 'skills', 'categories', `${categoryFileName}.ts`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Verify IDs do not already exist
  const existingMatches = [...content.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
  const existingSet = new Set(existingMatches);

  const entriesToAppend = [];

  for (const s of newSkills) {
    if (existingSet.has(s.id)) {
      console.warn(`Skill ID "${s.id}" already exists in ${categoryFileName}.ts, skipping.`);
      continue;
    }

    const tagsJson = JSON.stringify(s.tags || []);
    const instructionsJson = JSON.stringify(s.instructions, null, 8);
    const ruInstructionsJson = JSON.stringify(s.ruInstructions, null, 8);

    const entry = `  ${JSON.stringify(s.id)}: {
    id: ${JSON.stringify(s.id)},
    name: ${JSON.stringify(s.name)},
    displayName: ${JSON.stringify(s.displayName)},
    categoryId: ${JSON.stringify(s.categoryId)},
    description: ${JSON.stringify(s.description)},
    tags: ${tagsJson},
    transform: createStandardSkillTransform({
      sectionName: ${JSON.stringify(s.sectionName)},
      ruSectionName: ${JSON.stringify(s.ruSectionName)},
      instructions: ${instructionsJson},
      ruInstructions: ${ruInstructionsJson},
      semanticType: ${JSON.stringify(s.semanticType || 'process_directive')},
      tags: ${tagsJson},
    }),
  },
`;
    entriesToAppend.push(entry);
    existingSet.add(s.id);
  }

  if (entriesToAppend.length === 0) {
    console.log(`No new skills to append to ${categoryFileName}.ts`);
    return existingSet.size;
  }

  const lastBraceIndex = content.lastIndexOf('};');
  if (lastBraceIndex === -1) {
    throw new Error(`Could not find closing '};' in ${filePath}`);
  }

  const newContent = content.slice(0, lastBraceIndex) + entriesToAppend.join('\n') + content.slice(lastBraceIndex);
  fs.writeFileSync(filePath, newContent, 'utf8');

  console.log(`Successfully appended ${entriesToAppend.length} skills to ${categoryFileName}.ts. Total now: ${existingSet.size}`);
  return existingSet.size;
}

module.exports = { appendSkills };
