import assert from 'node:assert/strict';
import { generatePromptPipeline, optimizePromptPipeline } from '../src/utils/promptGenerationPipeline.ts';
import { buildPromptFromDescription } from '../src/utils/promptEngine.ts';
import { saveUserSkill } from '../src/skills/customSkillsManager.ts';
import { applySkillsWithPreflight } from '../src/skills/skillPreflight.ts';
import { classifyTask } from '../src/utils/taskIntent.ts';
import { PROMPT_QUALITY_CASES } from './fixtures/promptQualityCases.ts';

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
assert.equal(withoutSkills.prompt.split(task).length - 1, 1, 'the original task should appear only once in the composed prompt');
assert.ok(withoutSkills.prompt.includes('Reduce the task to facts'), 'the selected reasoning method must be represented');
assert.ok(withoutSkills.prompt.includes('Use focused questions to test critical assumptions'), 'the selected tone must be represented');
assert.ok(withoutSkills.prompt.includes('Coverage & Quality Check'), 'balanced detail should include a completeness module');
assert.ok(!withoutSkills.prompt.includes('Instruction Precedence'), 'baseline prompts should not carry a generic Skill-priority section when no Skill is applied');
assert.equal(withoutSkills.appliedSkills.length, 0);

const genericGameMasterTask = 'Создай промпт который заменит опытного ведущего настольных нарративно ролевых игр';
const genericGameMaster = generatePromptPipeline({ ...baseParams, domain: 'Auto', task: genericGameMasterTask }, []);
assert.ok(genericGameMaster.prompt.includes('Ты — интерактивный ведущий настольных нарративных ролевых игр'));
assert.ok(!genericGameMaster.prompt.includes(genericGameMasterTask), 'a prompt-creation request must not be repeated as a conflicting runtime instruction');
assert.ok(!genericGameMaster.prompt.includes('Исходная задача (без изменений)'));
assert.ok(!genericGameMaster.prompt.includes('Приоритет инструкций'), 'the Skill-priority boilerplate should be absent when no Skill was applied');

const specificGameMasterTask = 'Создай промпт который заменит опытного ведущего настольных нарративно ролевых игр для D&D 5e в жанре тёмного фэнтези; исключи графическое насилие.';
const specificGameMaster = generatePromptPipeline({ ...baseParams, domain: 'Auto', task: specificGameMasterTask }, []);
assert.ok(!specificGameMaster.prompt.includes('Создай промпт'), 'do not carry the meta prompt-construction request into the runtime prompt');
assert.ok(specificGameMaster.prompt.includes('Дополнительные требования к игре'));
assert.ok(specificGameMaster.prompt.includes('D&D 5e в жанре тёмного фэнтези; исключи графическое насилие'), 'specific user requirements must survive TTRPG prompt cleanup');

const specificEnglishGameMasterTask = 'Create a prompt that replaces an experienced tabletop role-playing game master for D&D 5e in dark fantasy; avoid graphic violence.';
const specificEnglishGameMaster = generatePromptPipeline({ ...baseParams, domain: 'Auto', task: specificEnglishGameMasterTask }, []);
assert.ok(specificEnglishGameMaster.prompt.includes('You are the interactive Game Master'));
assert.ok(!specificEnglishGameMaster.prompt.includes('Create a prompt'));
assert.ok(specificEnglishGameMaster.prompt.includes('Additional Game Requirements'));
assert.ok(specificEnglishGameMaster.prompt.includes('D&D 5e in dark fantasy; avoid graphic violence'), 'English user constraints must survive TTRPG prompt cleanup');

const deferredImplementation = generatePromptPipeline({
  ...baseParams,
  task: 'Review the webhook contract. Do not write implementation code until I provide the current handler.',
}, []);
assert.ok(deferredImplementation.prompt.includes('defer implementation code until the current handler'), 'explicit implementation deferrals must shape the deliverable');
assert.ok(!deferredImplementation.prompt.includes('Prefer an actionable change or code'), 'generic output defaults must not override an explicit prohibition');
const deferredWithSkill = generatePromptPipeline({
  ...baseParams,
  task: 'Review the webhook contract. Do not write implementation code until I provide the current handler.',
}, ['code-audit-smells']);
assert.ok(deferredWithSkill.prompt.includes('defer implementation code until the current handler'));
assert.ok(deferredWithSkill.prompt.lastIndexOf('Instruction Precedence') > deferredWithSkill.prompt.indexOf('Code Smell & Architectural Anti-Pattern Audit'));

const minimalist = generatePromptPipeline({ ...baseParams, detailLevel: 'minimalist' }, []);
assert.ok(!minimalist.prompt.includes('Coverage & Quality Check'), 'minimal detail should omit optional validation modules');

const copywriting = generatePromptPipeline({
  ...baseParams,
  domain: 'Copywriting & Conversion',
  task: 'Write a landing page headline for an analytics product.',
  detailLevel: 'exhaustive',
}, []);
assert.ok(copywriting.prompt.includes('Editorial Brief'), 'the selected domain must contribute relevant modules');
assert.ok(copywriting.prompt.includes('Headline Variations'), 'task signals must select a matching section');
assert.ok(copywriting.prompt.includes('Internally check task fit, voice, and factual constraints'), 'output-only copy should receive an internal quality check');
assert.ok(!copywriting.prompt.includes('Risks & Alternatives'), 'output-only copy must not be diluted by a public risk-analysis section');
assert.ok(copywriting.prompt.includes('Write a landing page headline for an analytics product.'));
assert.ok(!copywriting.prompt.includes('[[content_type]]'), 'composed sections must not leave fixed-template placeholders');

const emailCopy = generatePromptPipeline({
  ...baseParams,
  domain: 'Copywriting & Conversion',
  task: 'Draft an onboarding email for new users with a subject line and preview text.',
}, []);
assert.ok(emailCopy.prompt.includes('Message Sequence'), 'a different task in the same domain should select a different module');
assert.ok(emailCopy.prompt.includes('subject line and preview text'), 'email metadata should be handled by the email module');
assert.ok(!emailCopy.prompt.includes('Headline Variations'));

const copyWithConflictingSkill = generatePromptPipeline({
  ...baseParams,
  domain: 'Copywriting',
  task: 'Write an onboarding email. Do not invent social proof or customer results.',
}, ['copywriting-aida-attention-interest-desire']);
assert.ok(copyWithConflictingSkill.prompt.includes('social proof'));
assert.ok(copyWithConflictingSkill.diagnostics.some((d) => d.type === 'skill-filtered' && d.skillId === 'copywriting-aida-attention-interest-desire'), 'an unrequested persuasion framework should be filtered instead of injected');
assert.ok(!copyWithConflictingSkill.prompt.includes('AIDA Marketing Copywriting Protocol'));

const pricing = generatePromptPipeline({
  ...baseParams,
  domain: 'Business',
  task: 'Evaluate pricing for a SaaS product with limited customer data.',
}, []);
assert.ok(pricing.prompt.includes('Pricing & Economics'));
assert.ok(pricing.prompt.includes('only when supported by the inputs'));

const research = generatePromptPipeline({
  ...baseParams,
  domain: 'Research',
  task: 'Compare the findings in these interview notes.',
}, []);
assert.ok(research.prompt.includes('Research Protocol'));
assert.ok(research.prompt.includes('Do not fabricate sources'));

const retro = generatePromptPipeline({
  ...baseParams,
  domain: 'General',
  task: 'Conduct a retrospective on the recent production incident and outage.',
}, []);
assert.ok(retro.prompt.includes('Incident Facts & Timeline'), 'incident tasks should compose retrospective modules automatically');

const withSkills = generatePromptPipeline(baseParams, ['code-audit-smells', 'type-safety-contracts']);
assert.ok(withSkills.prompt.includes(task), 'the original task must survive Skill transforms');
assert.ok(withSkills.prompt.includes('Defect Inventory'), 'explicitly requested code-audit Skill transform must execute');
assert.ok(!/complexity\s*>\s*10/i.test(withSkills.prompt), 'unsupported numeric code-quality thresholds must be softened');
assert.ok(withSkills.diagnostics.some((item) => item.type === 'directive-adjusted' && item.skillId === 'code-audit-smells'), 'the unsupported Skill threshold must be diagnosed');
assert.ok(withSkills.prompt.includes('### Code Smell & Architectural Anti-Pattern Audit'));
assert.ok(withSkills.diagnostics.some((item) => item.type === 'skill-filtered' && item.skillId === 'type-safety-contracts'), 'an unrequested type-system Skill must be filtered');
assert.deepEqual(withSkills.appliedSkills.map((skill) => skill.id), ['code-audit-smells']);

const explicitTypeSafety = generatePromptPipeline({
  ...baseParams,
  task: 'Review TypeScript type contracts for unsafe any and missing return types.',
}, ['type-safety-contracts']);
assert.ok(explicitTypeSafety.prompt.includes('Zero `any` Standard'), 'a type-safety Skill should execute when the task explicitly requests it');
assert.ok(explicitTypeSafety.appliedSkills.some((skill) => skill.id === 'type-safety-contracts'));

console.log('checkpoint: before composite Skill test');
const composite = generatePromptPipeline(baseParams, ['code-refactoring-suite']);
assert.ok(composite.appliedSkills.some((skill) => skill.id === 'code-refactoring-suite'));
assert.ok(composite.appliedSkills.some((skill) => skill.id === 'code-audit-smells'));
assert.ok(!composite.appliedSkills.some((skill) => skill.id === 'type-safety-contracts'), 'composite containers must not bypass the task-specific type-safety filter');
assert.ok(composite.diagnostics.some((item) => item.type === 'skill-filtered' && item.skillId === 'type-safety-contracts'));
assert.ok(composite.appliedSkills.some((skill) => skill.id === 'regression-test-specs'));
assert.ok(composite.prompt.includes('Focused Regression Test Specification'), 'composite sub-skill transforms must execute');

const claude = generatePromptPipeline({ ...baseParams, targetModel: 'Anthropic Claude (XML)' }, ['code-audit-smells']);
assert.ok(claude.prompt.startsWith('<system_instructions>'));
assert.ok(claude.prompt.includes(task), 'model wrapping must preserve the original task');
assert.ok(claude.prompt.includes('Code Smell & Architectural Anti-Pattern Audit'), 'model wrapping must preserve applied Skills');
assert.ok(!/complexity\s*>\s*10/i.test(claude.prompt), 'model wrapping must not restore a softened numeric threshold');

console.log('checkpoint: before custom Skill persistence test');
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
  await saveUserSkill({
    id: 'custom-code-directive-skill',
    name: 'CodeDirectiveSkill',
    displayName: 'Code Directive Skill',
    categoryId: 'my_skills',
    description: 'A test skill that asks for implementation code.',
    tags: ['test', 'coding'],
    transformationMode: 'section',
    customSectionTitle: 'Implementation Directive',
    targetSection: 'protocol',
    transformationDirectives: '- Generate complete implementation code and provide the full patch.',
  });
  await saveUserSkill({
    id: 'custom-unbounded-executive-skill',
    name: 'Unbounded Executive Scorecard',
    displayName: 'Unbounded Executive Scorecard',
    categoryId: 'my_skills',
    description: 'Regression fixture for unsupported executive precision.',
    tags: ['test', 'executive'],
    transformationMode: 'section',
    customSectionTitle: 'Executive Scorecard Directives',
    targetSection: 'protocol',
    transformationDirectives: [
      '- Grade every option from 1 to 5 on a weighted scale.',
      '- Replace qualitative generalities with exact dollar amounts, dates, and quantitative KPIs.',
      '- Conclude with a Decisions Required section detailing binary options (Option A vs Option B).',
      '- Formulate engineering tickets with assigned owners and 30-day completion SLAs.',
    ].join('\n'),
  });
  await saveUserSkill({
    id: 'custom-unbounded-gtm-skill',
    name: 'Unbounded GTM Channels',
    displayName: 'Unbounded GTM Channels',
    categoryId: 'my_skills',
    description: 'Regression fixture for preset channel assumptions.',
    tags: ['test', 'business'],
    transformationMode: 'section',
    customSectionTitle: 'Channel Mix',
    targetSection: 'protocol',
    transformationDirectives: '- Delineate primary acquisition channels (PLG viral loops vs. High-Touch Outbound Enterprise Sales).',
  });
  await saveUserSkill({
    id: 'custom-unbounded-incident-skill',
    name: 'Unbounded Incident Timeline',
    displayName: 'Unbounded Incident Timeline',
    categoryId: 'my_skills',
    description: 'Regression fixture for unsupported incident timelines and SLAs.',
    tags: ['test', 'incident'],
    transformationMode: 'section',
    customSectionTitle: 'Incident Timeline Directives',
    targetSection: 'protocol',
    transformationDirectives: [
      '- Фиксируйте поминутный таймлайн от триггера до полного восстановления.',
      '- Выявите системные факторы: слепые зоны мониторинга и отсутствие защиты от сбоев.',
      '- Формируйте задачи с дедлайном до 30-дневного срока.',
    ].join('\n'),
  });
} finally {
  console.warn = originalWarn;
}
const withCustomSkill = generatePromptPipeline(baseParams, ['custom-test-skill']);
assert.ok(withCustomSkill.prompt.includes('Billing Webhook Checks'));
assert.ok(withCustomSkill.prompt.includes('Reject duplicate event IDs and verify the replay window.'));
assert.ok(withCustomSkill.appliedSkills.some((skill) => skill.id === 'custom-test-skill'));

const executiveTask = PROMPT_QUALITY_CASES.find((item) => item.id === 'executive-01-budget')!.task;
const executiveUnbounded = generatePromptPipeline({ ...baseParams, domain: 'Executive', task: executiveTask }, ['custom-unbounded-executive-skill']);
assert.ok(executiveUnbounded.diagnostics.filter((d) => d.skillId === 'custom-unbounded-executive-skill' && d.type === 'directive-adjusted').length >= 4, 'preflight should diagnose scoring, precision, binary-format, and SLA directives');
assert.ok(!/from 1 to 5|exact dollar amounts|quantitative KPIs|Option A vs Option B|30-day completion SLAs/i.test(executiveUnbounded.prompt), 'unsupported executive directives must not survive preflight');

const gtmTask = PROMPT_QUALITY_CASES.find((item) => item.id === 'business-02-gtm')!.task;
const gtmUnbounded = generatePromptPipeline({ ...baseParams, domain: 'Business', task: gtmTask }, ['custom-unbounded-gtm-skill']);
assert.ok(gtmUnbounded.diagnostics.some((d) => d.skillId === 'custom-unbounded-gtm-skill' && d.type === 'directive-adjusted'));
assert.ok(!/PLG viral loops|High-Touch Outbound Enterprise Sales/i.test(gtmUnbounded.prompt));

const incidentTask = PROMPT_QUALITY_CASES.find((item) => item.id === 'retro-01-outage')!.task;
const incidentUnbounded = generatePromptPipeline({ ...baseParams, domain: 'Auto', task: incidentTask }, ['custom-unbounded-incident-skill']);
assert.ok(incidentUnbounded.diagnostics.filter((d) => d.skillId === 'custom-unbounded-incident-skill' && d.type === 'directive-adjusted').length >= 3, 'preflight should adjust the timeline, speculative cause, and fixed SLA');
assert.ok(!/поминутный таймлайн|слепые зоны мониторинга|30-дневного срока/i.test(incidentUnbounded.prompt), 'unsupported incident stages, causes, and dates must not survive preflight');

console.log('Prompt pipeline tests passed (base, multi-skill, composite, model adapter, custom skill).');

// --- Preflight Relevance & Conflict Tests ---

// 1. Cross-domain irrelevant Skill filtering
const codingWithClinicalSkill = generatePromptPipeline({
  ...baseParams,
  domain: 'Coding',
  task: 'Fix SQL query timeout on Postgres invoices table.',
}, ['clinical-trial-pico-extractor', 'regression-test-specs']);
assert.ok(codingWithClinicalSkill.appliedSkills.some((s) => s.id === 'regression-test-specs'), 'focused test specification is relevant to a requested SQL fix');
assert.ok(!codingWithClinicalSkill.appliedSkills.some((s) => s.id === 'clinical-trial-pico-extractor'), 'clinical skill must be filtered out for SQL task');
assert.ok(codingWithClinicalSkill.diagnostics.some((d) => d.type === 'skill-filtered' && d.skillId === 'clinical-trial-pico-extractor'));

// 2. AIDA marketing claim adjustment when task prohibits fabrication
const onboardingWithAida = generatePromptPipeline({
  ...baseParams,
  domain: 'Copywriting',
  task: 'Write one persuasive onboarding email using AIDA. Do not invent social proof or customer results.',
}, ['copywriting-aida-attention-interest-desire']);
assert.ok(onboardingWithAida.diagnostics.some((d) => d.type === 'directive-adjusted' && d.skillId === 'copywriting-aida-attention-interest-desire'));
assert.ok(!onboardingWithAida.prompt.includes('social proof, case studies, and concrete before/after transformations'), 'unsubstantiated directive must be adjusted');
assert.ok(!onboardingWithAida.prompt.includes('traditional methods fail'), 'unsupported claims that alternatives fail must be removed');
assert.ok(onboardingWithAida.prompt.includes('Use social proof, case studies, and before/after claims only when directly supported by supplied material'), 'adjusted claim guidance must appear');
assert.ok(onboardingWithAida.prompt.includes('do not invent terms, scarcity, or deadlines'), 'unsupported guarantee and urgency claims must be constrained');
assert.equal(onboardingWithAida.prompt.split('Use statistics, social proof, case studies, guarantees, and urgency only when directly supported by supplied material').length - 1, 0, 'generic conflict replacements should not be duplicated');

// 3. Signature & threshold specification adjustment for unverified webhooks
const webhookPreflight = generatePromptPipeline({
  ...baseParams,
  domain: 'Coding',
  task: 'Handle payment webhooks safely in Node.js.',
}, ['unverified-external-webhook-signature-audit']);
assert.ok(webhookPreflight.diagnostics.some((d) => d.skillId === 'unverified-external-webhook-signature-audit' && d.type === 'directive-adjusted'));
assert.ok(!webhookPreflight.prompt.includes('reject payloads older than 5 minutes'), 'unsupported 5 minute constant must be generalized');

// 4. Implementation code directive adjusted when user forbids code
const designOnlyWithCodingSkill = generatePromptPipeline({
  ...baseParams,
  domain: 'Coding',
  task: 'Design the cache topology. Do not write implementation code.',
}, ['custom-code-directive-skill']);
assert.ok(designOnlyWithCodingSkill.diagnostics.some((d) => d.type === 'directive-adjusted' && d.skillId === 'custom-code-directive-skill'));
assert.ok(!designOnlyWithCodingSkill.prompt.includes('Generate complete implementation code'), 'conflicting user-created directive must be replaced');
assert.ok(designOnlyWithCodingSkill.prompt.includes('Do not provide implementation code'), 'safe replacement must preserve the user prohibition');
const optimizedDesignOnly = optimizePromptPipeline(
  'Design the cache topology. Do not write implementation code until I provide the current handler.',
  { clarity: true, specificity: true, structure: true, constraints: true, examples: false, chainOfThought: false, riskAudit: false, aggressiveness: 'medium' },
  ['custom-code-directive-skill']
);
assert.ok(optimizedDesignOnly.prompt.includes('Do not write implementation code until I provide the current handler'));
assert.ok(!optimizedDesignOnly.prompt.includes('Generate complete implementation code'));
assert.ok(optimizedDesignOnly.diagnostics.some((d) => d.type === 'directive-adjusted' && d.skillId === 'custom-code-directive-skill'));

// 5. A request for a TTRPG Game Master prompt must yield an executable GM role, not a generic recommendation prompt.
const tabletopPromptRequest = 'Промпт который заменит мастера настольных нарративно ролевых игр';
const tabletopBasic = buildPromptFromDescription(tabletopPromptRequest, 'basic');
assert.ok(tabletopBasic.includes('Ты — интерактивный ведущий настольных нарративных ролевых игр'), 'AI Build Basic must directly define the requested GM role');
assert.ok(tabletopBasic.includes('### Игровой цикл'), 'the generated GM prompt must provide an actual turn loop');
assert.ok(tabletopBasic.includes('Не решай за персонажей игроков'), 'the GM prompt must preserve player agency');
assert.ok(!tabletopBasic.includes('Сформировать экспертное, структурированное решение'), 'must not turn the request into generic advice');

const tabletopWithDefaultSkills = generatePromptPipeline({
  ...baseParams,
  domain: 'Coding',
  task: tabletopPromptRequest,
}, ['role-calibration', 'constraint-injection']);
assert.ok(tabletopWithDefaultSkills.prompt.includes('Ведущий настольной нарративной ролевой игры (Game Master)'), 'role-calibration must retain a task-specific Game Master role');
assert.ok(tabletopWithDefaultSkills.prompt.includes('### Игровой цикл'));
assert.ok(tabletopWithDefaultSkills.prompt.includes('Не создавай новый промпт'), 'the prompt must instruct the model to run the game, not write another prompt');
assert.ok(!tabletopWithDefaultSkills.prompt.includes('Ведущий эксперт и системный специалист'), 'generic role calibration must not overwrite the specialized role');
assert.ok(!tabletopWithDefaultSkills.prompt.includes('Инженерный стандарт'), 'role calibration must not inject engineering mandate into a game-master prompt');
assert.ok(!tabletopWithDefaultSkills.prompt.includes('Выбранная область**: Coding'), 'the default Coding selector must not leak into the TTRPG prompt');
assert.ok(!tabletopWithDefaultSkills.prompt.includes('Запрет на недоделанный код'), 'generic guardrails must not inject coding-only rules');
assert.ok(!tabletopWithDefaultSkills.prompt.includes('SPOF'), 'generic guardrails must not inject irrelevant infrastructure constraints');
assert.ok(tabletopWithDefaultSkills.prompt.includes('Не выдумывать факты, результаты, источники, правила'), 'the default guardrail should remain relevant and task-safe');
const tabletopSkillFilter = generatePromptPipeline({ ...baseParams, domain: 'Coding', task: tabletopPromptRequest }, [
  'narrative-arc-storytelling',
  'clinical-trial-pico-extractor',
]);
assert.ok(tabletopSkillFilter.appliedSkills.some((skill) => skill.id === 'narrative-arc-storytelling'), 'narrative Skills should survive the inferred TTRPG task group');
assert.ok(!tabletopSkillFilter.appliedSkills.some((skill) => skill.id === 'clinical-trial-pico-extractor'), 'unrelated clinical Skills should not survive merely because Coding was the UI default');

const tabletopAiBuildWithSkills = applySkillsWithPreflight(tabletopBasic, ['role-calibration', 'constraint-injection'], {
  complexity: 'basic',
  task: tabletopPromptRequest,
}, tabletopPromptRequest, 'Coding');
assert.ok(tabletopAiBuildWithSkills.prompt.includes('Ведущий настольной нарративной ролевой игры (Game Master)'), 'default AI Build Skills must augment the specialized prompt, not replace it');
assert.ok(tabletopAiBuildWithSkills.prompt.includes('### Игровой цикл'));
assert.ok(!tabletopAiBuildWithSkills.prompt.includes('You are a domain specialist'));
assert.ok(!tabletopAiBuildWithSkills.prompt.includes('SPOF'));

console.log('Skill preflight relevance and conflict tests passed.');

// --- Fixed cross-domain quality benchmark ---
const expectedOutputMarkers: Record<string, string> = {
  'coding-01-webhook': 'отказные случаи и проверки',
  'coding-02-accessibility': 'When source code is available, return a minimal patch',
  'business-01-pricing': 'одним недорогим экспериментом',
  'business-02-gtm': 'For each phase specify its objective/segment',
  'copywriting-01-onboarding': 'Верните только запрошенное письмо',
  'copywriting-02-headlines': 'Return exactly 5 materially distinct headlines',
  'product-01-onboarding-dropoff': 'Для каждого изменения свяжите наблюдение',
  'product-02-filter-spec': 'triggering action or condition',
  'research-01-interviews': 'Сгруппируйте наблюдения по темам',
  'research-02-study-comparison': 'Compare each supplied study',
  'executive-01-budget': 'какие данные изменили бы рекомендацию',
  'executive-02-launch-delay': 'what evidence would change the recommendation',
  'retro-01-outage': 'Представьте в хронологии только подтверждённые события',
  'retro-02-queue': 'Put only confirmed events and supplied timestamps in the chronology',
  'general-01-archive': 'Разбейте план на выполнимые шаги',
  'general-02-meeting': 'agenda with time boxes',
};

for (const testCase of PROMPT_QUALITY_CASES) {
  console.log(`checkpoint: benchmark ${testCase.id}`);
  const classification = classifyTask(testCase.task, testCase.uiDomain);
  assert.equal(classification.domain, testCase.expectedDomain, `${testCase.id}: wrong inferred domain`);
  assert.equal(classification.intent, testCase.expectedIntent, `${testCase.id}: wrong inferred task intent`);
  assert.equal(classification.deliverable, testCase.expectedDeliverable, `${testCase.id}: wrong inferred deliverable`);

  const generated = generatePromptPipeline({
    ...baseParams,
    domain: testCase.uiDomain,
    task: testCase.task,
  }, []);
  assert.equal(generated.prompt.split(testCase.task).length - 1, 1, `${testCase.id}: task must remain verbatim exactly once`);
  assert.ok(
    generated.prompt.includes(expectedOutputMarkers[testCase.id]),
    `${testCase.id}: missing operational deliverable instruction: ${expectedOutputMarkers[testCase.id]}`
  );
  if (testCase.id === 'coding-01-webhook') {
    assert.ok(generated.prompt.includes('Соблюдайте явное требование идемпотентной обработки повторных доставок'));
    assert.ok(!generated.prompt.includes('не вводите идемпотентность'), 'an explicit idempotency requirement must not be weakened by a generic contract warning');
    assert.ok(generated.prompt.includes('Не приравнивайте защиту от повторного применения к гарантии exactly-once'));
  }
  if (testCase.id === 'business-01-pricing') {
    assert.ok(generated.prompt.includes('Ценообразование и экономика'));
    assert.ok(!generated.prompt.includes('Strategic Analysis') && !generated.prompt.includes('Стратегический анализ'), 'pricing prompts must not inherit the unrelated generic business strategy checklist');
    assert.ok(!generated.prompt.includes('Go-to-Market & Validation') && !generated.prompt.includes('Выход на рынок и проверка гипотез'));
  }
  if (testCase.id === 'general-01-archive') {
    assert.ok(generated.prompt.includes('Практик по операционному планированию'));
  }
  if (testCase.id === 'general-02-meeting') {
    assert.ok(generated.prompt.includes('Cross-functional Meeting Facilitator'));
  }

  const withDefaultSkills = generatePromptPipeline({
    ...baseParams,
    domain: testCase.uiDomain,
    task: testCase.task,
  }, ['role-calibration', 'constraint-injection']);
  assert.equal(withDefaultSkills.prompt.split(testCase.task).length - 1, 1, `${testCase.id}: Skill transforms must preserve one verbatim task`);
  assert.ok(!/gameplay interaction|игровое взаимодействие/i.test(withDefaultSkills.prompt), `${testCase.id}: non-TTRPG prompts must not contain game-specific boilerplate`);
  assert.ok(!/Staff Domain Authority & Technical Lead in\s+.{1,42}(?:\.|$)/i.test(withDefaultSkills.prompt), `${testCase.id}: role titles must not be truncated from the task`);
  if (testCase.expectedDomain !== 'coding') {
    assert.ok(!/code completeness|incomplete stubs|полнота кода/i.test(withDefaultSkills.prompt), `${testCase.id}: non-coding deliverables must not inherit code-only boilerplate`);
  }

  const taskSelected = generatePromptPipeline({
    ...baseParams,
    domain: testCase.uiDomain,
    task: testCase.task,
  }, testCase.skills);
  assert.equal(taskSelected.prompt.split(testCase.task).length - 1, 1, `${testCase.id}: task-selected Skills must preserve the verbatim task exactly once`);
  if (testCase.id === 'coding-01-webhook') {
    assert.ok(taskSelected.prompt.includes('стабильный ключ события'));
    assert.ok(taskSelected.prompt.includes('одновременные дубликаты'));
    assert.ok(!/\b(?:Vitest|Jest|Playwright|Cypress|Pytest)\b/i.test(taskSelected.prompt), 'a skill must not prescribe an unspecified test runner');
    assert.ok(!/Arrange\s*->\s*Act\s*->\s*Assert|integer overflow|network dropouts|100% of branch logic/i.test(taskSelected.prompt), 'testing Skill must not impose unrelated test format or exhaustive cases');
  }
  if (testCase.id === 'coding-02-accessibility') {
    assert.ok(taskSelected.diagnostics.some((d) => d.type === 'skill-filtered' && d.skillId === 'code-audit-smells'), 'a modal patch should not inherit a broad code-smell audit');
    assert.ok(taskSelected.prompt.includes('initial focus') && taskSelected.prompt.includes('focus restoration'));
    assert.ok(!/god-object|SOLID violations|\bVitest\b|\bJest\b/i.test(taskSelected.prompt), 'accessibility fixes must remain scoped and framework-neutral');
    assert.ok(!/BDD `describe\/it`|\bnull\b|\bundefined\b|integer overflow|network dropouts/i.test(taskSelected.prompt), 'accessibility test plan must not inherit unrelated exhaustive edge cases');
  }
  if (testCase.id === 'business-01-pricing') {
    assert.ok(taskSelected.diagnostics.some((d) => d.type === 'skill-filtered' && d.skillId === 'unit-economics-modeling'));
    assert.ok(!/12 months|12 месяцев|NRR|Payback Period/i.test(taskSelected.prompt), 'pricing analysis must not invent unit-economics targets or unrelated cohort metrics');
    assert.ok(taskSelected.prompt.includes('компактной таблице'));
  }
  if (testCase.id === 'business-02-gtm') {
    assert.ok(!/10 design partners|Private Alpha|Public Beta|Commercial GA/i.test(taskSelected.prompt), 'GTM phases and sample sizes must not be hard-coded by a Skill');
    assert.ok(!/PLG viral loops|High-Touch Outbound Enterprise Sales|NPS\s*>\s*50|Retention\s*>\s*40%/i.test(taskSelected.prompt), 'GTM channel and metric assumptions must be task-grounded');
    assert.ok(taskSelected.prompt.includes('time windows cover the full stated horizon'));
  }
  if (testCase.id === 'product-01-onboarding-dropoff') {
    assert.ok(taskSelected.diagnostics.some((d) => d.type === 'skill-filtered' && d.skillId === 'customer-journey-empathy-friction-map'));
    assert.ok(!/emotional curve|full customer-journey map|эмоциональн\w* крив/i.test(taskSelected.prompt));
  }
  if (testCase.id === 'research-01-interviews') {
    assert.ok(taskSelected.diagnostics.some((d) => d.type === 'skill-filtered' && d.skillId === 'analysis-multi-multi-perspective-qualitative-research-analysis'));
    assert.ok(!/multi-agent|consensus synthesis|мультиагент|синтез консенсуса/i.test(taskSelected.prompt));
    assert.ok(taskSelected.prompt.includes('не предполагайте пересечение или взаимоисключение'));
    assert.ok(taskSelected.prompt.includes('Сохраните числа и единицы так, как они заданы'));
  }
  if (testCase.id === 'research-02-study-comparison') {
    assert.ok(taskSelected.diagnostics.some((d) => d.type === 'skill-filtered' && d.skillId === 'methodology-critique-peer-review'));
    assert.ok(!/multiple hypothesis testing|Bonferroni|instrumentation drift/i.test(taskSelected.prompt));
    assert.ok(taskSelected.prompt.includes('label it “not reported.”'));
  }
  if (testCase.id === 'executive-01-budget' || testCase.id === 'executive-02-launch-delay') {
    assert.ok(!/100\s*%|±\s*15\s*%|\b1\s*(?:-|–|to)\s*5\b|\bTCO\b/i.test(taskSelected.prompt), `${testCase.id}: do not force arbitrary scoring or architecture metrics`);
    assert.ok(!/Extreme Metric Density|exact dollar amounts|quantitative KPIs|Option A vs Option B|binary options/i.test(taskSelected.prompt), `${testCase.id}: do not force fabricated precision or a binary memo template`);
  }
  if (testCase.id === 'executive-01-budget') {
    assert.ok(taskSelected.prompt.includes('какие наблюдаемые показатели нужны'));
    assert.ok(taskSelected.prompt.includes('сумма должна точно равняться заданному бюджету $500,000'));
  }
  if (testCase.id === 'executive-02-launch-delay') {
    assert.ok(taskSelected.prompt.includes('Assess each stated blocker separately'));
  }
  if (testCase.id === 'retro-01-outage') {
    assert.ok(!/дедлайном до 30 дней|30 days|30-днев|поминутн|слепые зоны мониторинга|Jira IDs\) with assigned owners/i.test(taskSelected.prompt));
  }
  if (testCase.id === 'retro-02-queue') {
    assert.ok(!/minute-by-minute|\bT0\b|30-day|Jira IDs\) with assigned owners|hard deadlines/i.test(taskSelected.prompt));
    assert.ok(/do not require an established root cause before proposing investigation/i.test(taskSelected.prompt));
  }
  if (testCase.id === 'copywriting-01-onboarding') {
    assert.ok(taskSelected.prompt.includes('Верните только запрошенное письмо'));
    assert.ok(taskSelected.prompt.includes('Внутренне проверьте соответствие задаче'));
    assert.ok(!/surface unresolved assumptions and validation needs|editorial notes when useful/i.test(taskSelected.prompt));
  }
  if (testCase.id === 'copywriting-02-headlines') {
    assert.ok(!/Infer audience, channel, desired action|mark a variable/i.test(taskSelected.prompt));
    assert.ok(taskSelected.prompt.includes('do not invent product claims, a desired action, or placeholders'));
  }
  if (testCase.id === 'business-01-pricing') {
    assert.ok(taskSelected.prompt.includes('направленную проверку со стандартизированным выбором вариантов цены/пакета'));
    assert.ok(taskSelected.prompt.includes('считайте результат сигналом, а не репрезентативной оценкой'));
  }
  if (testCase.id === 'product-01-onboarding-dropoff') {
    assert.ok(taskSelected.prompt.includes('пометьте приоритет как предварительный'));
  }
  if (testCase.id === 'research-02-study-comparison') {
    assert.ok(taskSelected.prompt.includes('If an abstract or required source material is missing'));
  }
  if (testCase.id === 'general-01-archive') {
    assert.ok(generated.prompt.includes('пример структуры папок') && generated.prompt.includes('шаблон имени файла'));
    assert.ok(generated.prompt.includes('Вечер 1, Вечер 2 и Вечер 3'));
    assert.ok(generated.prompt.includes('не предполагайте сканер, внешний диск, облако или другое оборудование'));
  }
  if (testCase.id === 'general-02-meeting') {
    assert.ok(generated.prompt.includes('have the group assign an owner'));
  }
}

const budgetRole = generatePromptPipeline({ ...baseParams, domain: 'Executive', task: PROMPT_QUALITY_CASES.find((item) => item.id === 'executive-01-budget')!.task }, ['role-calibration']);
assert.ok(!budgetRole.prompt.includes('Corporate Counsel'), 'budget decisions must not receive a legal-counsel role');
const meetingRole = generatePromptPipeline({ ...baseParams, domain: 'Auto', task: PROMPT_QUALITY_CASES.find((item) => item.id === 'general-02-meeting')!.task }, ['role-calibration']);
assert.ok(!meetingRole.prompt.includes('Frontend & UI Performance Architect'), 'general facilitation must not receive a frontend-engineering role');
assert.ok(meetingRole.prompt.includes('Cross-functional Meeting Facilitator'), 'role-calibration should derive a meeting-facilitation role from the deliverable');
console.log('Cross-domain prompt-quality regressions passed (16 intents, roles, verbatim tasks, no TTRPG leakage).');
