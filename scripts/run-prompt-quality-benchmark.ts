import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { generatePromptPipeline } from '../src/utils/promptGenerationPipeline.ts';
import { classifyTask } from '../src/utils/taskIntent.ts';
import { PROMPT_QUALITY_CASES } from './fixtures/promptQualityCases.ts';

const universalDefaults = ['role-calibration', 'constraint-injection'];
const variants = [
  { id: 'baseline', skillIds: [] as string[] },
  { id: 'former-default-skills', skillIds: universalDefaults },
  { id: 'task-selected-skills', skillIds: null as string[] | null },
];

type BenchmarkOutput = {
  caseId: string;
  variant: string;
  task: string;
  expected: {
    domain: (typeof PROMPT_QUALITY_CASES)[number]['expectedDomain'];
    intent: (typeof PROMPT_QUALITY_CASES)[number]['expectedIntent'];
    deliverable: (typeof PROMPT_QUALITY_CASES)[number]['expectedDeliverable'];
  };
  classified: ReturnType<typeof classifyTask>;
  selectedSkillIds: string[];
  appliedSkillIds: string[];
  diagnostics: ReturnType<typeof generatePromptPipeline>['diagnostics'];
  prompt: string;
  stats: { characters: number; lines: number; appliedSkillCount: number };
};

const outputs: BenchmarkOutput[] = [];
for (const testCase of PROMPT_QUALITY_CASES) {
  const classification = classifyTask(testCase.task, testCase.uiDomain);
  for (const variant of variants) {
    const selectedSkillIds = variant.skillIds ?? testCase.skills;
    const result = generatePromptPipeline({
      domain: testCase.uiDomain,
      task: testCase.task,
      technique: 'Auto',
      tone: 'Auto',
      detailLevel: 'balanced',
      targetModel: 'Universal',
    }, selectedSkillIds);

    assert.ok(result.prompt.trim(), `${testCase.id}/${variant.id}: prompt must not be empty`);
    assert.equal(
      result.prompt.split(testCase.task).length - 1,
      1,
      `${testCase.id}/${variant.id}: the verbatim task must appear exactly once`
    );
    if (testCase.expectedDeliverable !== 'ttrpg_gm_prompt') {
      assert.ok(
        !/gameplay interaction|игровое взаимодействие/i.test(result.prompt),
        `${testCase.id}/${variant.id}: TTRPG boilerplate must not leak into non-TTRPG prompts`
      );
    }

    outputs.push({
      caseId: testCase.id,
      variant: variant.id,
      task: testCase.task,
      expected: {
        domain: testCase.expectedDomain,
        intent: testCase.expectedIntent,
        deliverable: testCase.expectedDeliverable,
      },
      classified: classification,
      selectedSkillIds,
      appliedSkillIds: result.appliedSkills.map((skill) => skill.id),
      diagnostics: result.diagnostics,
      prompt: result.prompt,
      stats: {
        characters: result.prompt.length,
        lines: result.prompt.split(/\r?\n/).length,
        appliedSkillCount: result.appliedSkills.length,
      },
    });
  }
}

assert.equal(outputs.length, PROMPT_QUALITY_CASES.length * variants.length, 'benchmark must generate 48 outputs');
const outPath = resolve(process.argv[2] || '/tmp/prompt-quality-benchmark.json');
await writeFile(outPath, JSON.stringify({
  generatedAt: new Date().toISOString(),
  caseCount: PROMPT_QUALITY_CASES.length,
  variantCount: variants.length,
  outputCount: outputs.length,
  variants: variants.map(({ id }) => id),
  outputs,
}, null, 2) + '\n', 'utf8');

const summaries = variants.map(({ id }) => {
  const subset = outputs.filter((item) => item.variant === id);
  const lengths = subset.map((item) => item.stats.characters);
  const avgChars = Math.round(lengths.reduce((sum, value) => sum + value, 0) / lengths.length);
  const applied = subset.reduce((sum, item) => sum + item.stats.appliedSkillCount, 0);
  const filtered = subset.reduce((sum, item) => sum + item.diagnostics.filter((d) => d.type === 'skill-filtered').length, 0);
  const adjusted = subset.reduce((sum, item) => sum + item.diagnostics.filter((d) => d.type === 'directive-adjusted' || d.type === 'directive-removed').length, 0);
  return { variant: id, cases: subset.length, avgChars, appliedSkills: applied, filteredSkills: filtered, adjustedDirectives: adjusted };
});

console.log(JSON.stringify({ outputCount: outputs.length, outPath, summaries }, null, 2));
