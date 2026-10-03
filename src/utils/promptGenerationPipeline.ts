import {
  adaptPromptForModel,
  generatePromptFromParams,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  type GeneratePromptParams,
  type ParsedSection,
} from './promptEngine';
import type { SkillDefinition } from '../skills/skillsRegistry';
import { applySkillsWithPreflight, type SkillPreflightDiagnostic } from '../skills/skillPreflight';

export interface PromptGenerationResult {
  prompt: string;
  appliedSkills: SkillDefinition[];
  diagnostics: SkillPreflightDiagnostic[];
}

function addTaskAndPreferences(
  prompt: string,
  params: GeneratePromptParams
): string {
  const isRu = isRussianText(params.task);
  const { preamble, sections } = parsePromptSections(prompt);
  const task = params.task.trim();

  if (task) {
    sections.unshift({
      rawHeader: isRu ? '### Исходная задача (без изменений)' : '### Task Input (Verbatim)',
      level: 3,
      title: isRu ? 'Исходная задача (без изменений)' : 'Task Input (Verbatim)',
      cleanTitle: isRu ? 'исходная задача без изменений' : 'task input verbatim',
      lines: task.split('\n'),
      semanticType: 'context',
    });
  }

  const techniqueText: Record<string, [string, string]> = {
    'Chain-of-Thought': [
      'Разбейте работу на короткие проверяемые этапы; покажите только ключевые основания и выводы, а не скрытые внутренние рассуждения.',
      'Break the work into concise, verifiable stages; show key rationale and conclusions, not hidden internal reasoning.',
    ],
    'Six-Hats': [
      'Рассмотрите задачу с шести перспектив: факты, риски, выгоды, альтернативы, эмоции и управление процессом; сведите их в практический вывод.',
      'Assess the task from six perspectives: facts, risks, benefits, alternatives, human impact, and process; synthesize them into a practical conclusion.',
    ],
    'First-Principles': [
      'Разложите задачу на базовые факты, ограничения и причинно-следственные связи; отделяйте подтверждённое от предположений и выводите решение из оснований.',
      'Reduce the task to facts, constraints, and causal relationships; separate evidence from assumptions and derive the solution from those fundamentals.',
    ],
    'Tree-of-Thoughts': [
      'Если задача допускает разные решения, сравните до трёх жизнеспособных вариантов по заданным критериям, рискам и стоимости; обоснуйте выбор без раскрытия скрытых рассуждений.',
      'When multiple solutions are viable, compare up to three options against explicit criteria, risks, and costs; justify the recommendation without exposing hidden reasoning.',
    ],
    Inversion: [
      'Проверьте задачу через инверсию: определите правдоподобные причины провала, признаки их раннего обнаружения и меры, снижающие эти риски.',
      'Use inversion: identify plausible failure modes, early warning signals, and mitigations that reduce those risks.',
    ],
  };

  const toneText: Record<string, [string, string]> = {
    'Matter-of-Fact': [
      'Пишите нейтрально, точно и по существу; избегайте драматизации и неподтверждённых утверждений.',
      'Use a neutral, precise, matter-of-fact voice; avoid dramatization and unsupported claims.',
    ],
    'Radical-Candor': [
      'Будьте прямыми и откровенными, но уважительными; называйте проблемы и компромиссы без грубости.',
      'Be candid and direct while remaining respectful; state problems and trade-offs without being abrasive.',
    ],
    Executive: [
      'Начните с главного вывода и решения (BLUF); детали, риски и обоснование расположите после него.',
      'Lead with the bottom line and recommendation (BLUF); place supporting detail, risks, and rationale afterward.',
    ],
    Socratic: [
      'Используйте точные вопросы для проверки критических предпосылок; задавайте их только если ответ действительно блокирует решение, иначе явно обозначьте допущение и продолжайте.',
      'Use focused questions to test critical assumptions; ask only when an answer blocks progress, otherwise state a reasonable assumption and proceed.',
    ],
  };

  const technique = techniqueText[params.technique];
  const tone = toneText[params.tone];
  const preferenceLines = [
    ...(params.domain
      ? [isRu ? `- **Выбранная область**: ${params.domain}.` : `- **Selected domain**: ${params.domain}.`]
      : []),
    ...(technique
      ? [isRu ? `- **Метод работы**: ${technique[0]}` : `- **Reasoning method**: ${technique[1]}`]
      : []),
    ...(tone
      ? [isRu ? `- **Тон и подача**: ${tone[0]}` : `- **Tone and voice**: ${tone[1]}`]
      : []),
  ];

  if (preferenceLines.length > 0) {
    const preferenceSection: ParsedSection = {
      rawHeader: isRu ? '### Параметры генерации' : '### Generation Preferences',
      level: 3,
      title: isRu ? 'Параметры генерации' : 'Generation Preferences',
      cleanTitle: isRu ? 'параметры генерации' : 'generation preferences',
      lines: preferenceLines,
      semanticType: 'context',
    };
    const insertionIndex = task ? 1 : 0;
    sections.splice(insertionIndex, 0, preferenceSection);
  }

  return reconstructPrompt(preamble, sections);
}

function adaptToSelectedModel(prompt: string, targetModel: string): string {
  const model = targetModel.toLowerCase();
  if (model.includes('claude')) return adaptPromptForModel(prompt, 'claude', false);
  if (model.includes('gpt') || model.includes('openai')) return adaptPromptForModel(prompt, 'openai', false);
  if (model.includes('gemini')) return adaptPromptForModel(prompt, 'gemini', false);
  if (model.includes('grok')) return adaptPromptForModel(prompt, 'grok', false);
  if (model.includes('llama')) return adaptPromptForModel(prompt, 'llama', false);
  return prompt;
}

/**
 * The one generation path used by the UI: domain template, verbatim task and
 * preferences, ordered Skill transforms (including composite sub-skills), then
 * the optional target-model wrapper.
 */
export function generatePromptPipeline(
  params: GeneratePromptParams,
  skillIds: string[] = []
): PromptGenerationResult {
  const basePrompt = generatePromptFromParams({
    ...params,
    targetModel: 'Universal',
    includeTaskInScope: false,
  });
  const enrichedPrompt = addTaskAndPreferences(basePrompt, params);
  const { prompt: prioritizedPrompt, appliedSkills, diagnostics } = applySkillsWithPreflight(enrichedPrompt, skillIds, {
    domain: params.domain,
    task: params.task,
    technique: params.technique,
    tone: params.tone,
    detailLevel: params.detailLevel,
    targetModel: params.targetModel,
  }, params.task, params.domain);

  return {
    prompt: adaptToSelectedModel(prioritizedPrompt, params.targetModel),
    appliedSkills,
    diagnostics,
  };
}
