import assert from 'node:assert/strict';
import { generatePromptPipeline } from '../src/utils/promptGenerationPipeline.ts';
import { saveUserSkill } from '../src/skills/customSkillsManager.ts';

const task = 'Audit the billing webhook retries and propose a safe idempotency strategy.';
const baseParams = {
  domain: 'Coding & Systems Architecture',
  task,
  technique: 'First-Principles',
  tone: 'Socratic',
  detailLevel: 'balanced' as const,
  targetModel: 'Universal',
};

const withoutSkills = generatePromptPipeline(baseParams, []);
assert.ok(withoutSkills.prompt.includes(task), 'the original task must remain verbatim without Skills');
assert.ok(withoutSkills.prompt.includes('Reduce the task to facts'), 'the selected reasoning method must be represented');
assert.ok(withoutSkills.prompt.includes('Use focused questions to test critical assumptions'), 'the selected tone must be represented');
assert.equal(withoutSkills.appliedSkills.length, 0);

const copywriting = generatePromptPipeline({
  ...baseParams,
  domain: 'Copywriting & Conversion',
  task: 'Write a landing page headline for an analytics product.',
  detailLevel: 'exhaustive',
}, []);
assert.ok(copywriting.prompt.includes('Creative Scope'), 'the selected domain must influence the base template');
assert.ok(copywriting.prompt.includes('Hooks & Headlines'), 'exhaustive detail must select the deeper domain template');
assert.ok(copywriting.prompt.includes('Write a landing page headline for an analytics product.'));

const withSkills = generatePromptPipeline(baseParams, ['code-audit-smells', 'type-safety-contracts']);
assert.ok(withSkills.prompt.includes(task), 'the original task must survive Skill transforms');
assert.ok(withSkills.prompt.includes('Cyclomatic Complexity Profiling'), 'code-audit Skill transform must execute');
assert.ok(withSkills.prompt.includes('Zero `any` Standard'), 'type-safety Skill transform must execute');
assert.ok(withSkills.prompt.includes('### Code Smell & Architectural Anti-Pattern Audit'));
assert.ok(withSkills.prompt.includes('### Strict TypeScript Type Safety & Contract Architecture'));
assert.deepEqual(withSkills.appliedSkills.map((skill) => skill.id), [
  'code-audit-smells',
  'type-safety-contracts',
]);

const composite = generatePromptPipeline(baseParams, ['code-refactoring-suite']);
assert.ok(composite.appliedSkills.some((skill) => skill.id === 'code-refactoring-suite'));
assert.ok(composite.appliedSkills.some((skill) => skill.id === 'code-audit-smells'));
assert.ok(composite.appliedSkills.some((skill) => skill.id === 'type-safety-contracts'));
assert.ok(composite.appliedSkills.some((skill) => skill.id === 'regression-test-specs'));
assert.ok(composite.prompt.includes('AAA Test Structure'), 'composite sub-skill transforms must execute');

const claude = generatePromptPipeline({ ...baseParams, targetModel: 'Anthropic Claude (XML)' }, ['code-audit-smells']);
assert.ok(claude.prompt.startsWith('<system_instructions>'));
assert.ok(claude.prompt.includes(task), 'model wrapping must preserve the original task');
assert.ok(claude.prompt.includes('Cyclomatic Complexity Profiling'), 'model wrapping must preserve applied Skills');

// Custom skills are stored locally by the product; emulate localStorage in this Node test.
(globalThis as any).localStorage = {
  getItem: () => null,
  setItem: () => undefined,
};
const originalWarn = console.warn;
console.warn = () => undefined;
try {
  await saveUserSkill({
    id: 'custom-test-skill',
    name: 'BillingWebhookSkill',
    displayName: 'Billing Webhook Contract',
    categoryId: 'my_skills',
    description: 'Test skill for idempotent billing webhooks.',
    tags: ['test', 'billing'],
    transformationMode: 'section',
    customSectionTitle: 'Billing Webhook Checks',
    targetSection: 'protocol',
    transformationDirectives: '- Reject duplicate event IDs and verify the replay window.',
  });
} finally {
  console.warn = originalWarn;
}
const withCustomSkill = generatePromptPipeline(baseParams, ['custom-test-skill']);
assert.ok(withCustomSkill.prompt.includes('Billing Webhook Checks'));
assert.ok(withCustomSkill.prompt.includes('Reject duplicate event IDs and verify the replay window.'));
assert.ok(withCustomSkill.appliedSkills.some((skill) => skill.id === 'custom-test-skill'));

console.log('Prompt pipeline tests passed (base, multi-skill, composite, model adapter, custom skill).');
