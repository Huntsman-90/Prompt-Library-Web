const fs = require('fs');

const validSemanticTypes = new Set([
  'role', 'role_directive', 'context', 'context_directive', 'protocol', 'process_directive',
  'constraints', 'compliance_directive', 'guardrail_directive', 'behavior_directive',
  'output_format', 'structural_directive', 'writing_style', 'dialogue_style',
  'variables', 'examples', 'domain_specific'
]);

const files = fs.readdirSync('src/skills/categories').filter(f => f.endsWith('.ts') && !f.includes('Skills.ts') && !f.includes('index.ts'));

files.forEach(f => {
  const path = 'src/skills/categories/' + f;
  let content = fs.readFileSync(path, 'utf8');
  let replaced = 0;

  content = content.replace(/semanticType:\s*['"]([^'"]+)['"]/g, (match, type) => {
    if (!validSemanticTypes.has(type)) {
      replaced++;
      if (type.includes('role')) return `semanticType: "role"`;
      if (type.includes('guardrail')) return `semanticType: "guardrail_directive"`;
      if (type.includes('meta')) return `semanticType: "process_directive"`;
      if (type.includes('structure') || type.includes('framework')) return `semanticType: "structural_directive"`;
      if (type.includes('dialogue')) return `semanticType: "dialogue_style"`;
      if (type.includes('writing') || type.includes('style')) return `semanticType: "writing_style"`;
      return `semanticType: "domain_specific"`;
    }
    return match;
  });

  if (replaced > 0) {
    fs.writeFileSync(path, content, 'utf8');
    console.log(`Normalized ${replaced} semanticTypes in ${f}`);
  }
});
console.log('Semantic types normalization complete!');
