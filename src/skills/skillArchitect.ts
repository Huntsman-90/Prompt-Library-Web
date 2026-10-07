import { SKILLS_REGISTRY, type SkillDefinition } from './skillsRegistry';
import { classifyTask, type DeliverableKind, type PromptDomain } from '../utils/taskIntent';

/**
 * Purges obsolete XML tags, synthetic preambles, and generic prompt templates.
 */
export function purgeGenericBoilerplate(text: string): string {
  if (!text) return '';

  let cleaned = text;

  // Purge obsolete AI Build XML envelope tags and system instructions
  cleaned = cleaned
    .replace(/<system_role>[\s\S]*?<\/system_role>/gi, '')
    .replace(/<\/?(?:system_role|thinking_process|operational_constraints|deliverable_specification|operational_prompt|context_and_scope|user_task|prompt_architecture)>/gi, '')
    .replace(/\[SYSTEM DIRECTIVE\]|\[OPERATIONAL PROMPT\]|<\|start_header_id\|>|<\|end_header_id\|>|<\|eot_id\|>/gi, '');

  // Purge generic prompt preambles like "You are an elite principal engineer..."
  cleaned = cleaned.replace(/You are an elite principal engineer and strategist with deep specialized mastery[^\n]*\n*/gi, '');
  cleaned = cleaned.replace(/Вы являетесь ведущим экспертом и системным архитектором[^\n]*\n*/gi, '');

  // Clean empty XML remnants
  cleaned = cleaned.replace(/^\s*<[^>]+>\s*$/gm, '');

  // Clean double blank lines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();

  return cleaned;
}

export interface PreciseRoleSpec {
  roleTitleRu: string;
  roleTitleEn: string;
  focusRu: string;
  focusEn: string;
  mandateRu: string;
  mandateEn: string;
}

/**
 * Calibrates a narrow, precise, high-authority domain role based on task context and active skills.
 * Strictly BANS generic "elite principal engineer" placeholders.
 */
export function derivePreciseRole(
  task: string,
  isRu: boolean,
  activeSkillIds: string[] = [],
  domainHint = 'Auto'
): PreciseRoleSpec {
  // Kept in the signature for source compatibility; task intent, not the selected
  // Skill list, determines the role so an unrelated Skill cannot hijack it.
  void activeSkillIds;
  const classification = classifyTask(task, domainHint);

  if (classification.deliverable === 'ttrpg_gm_prompt') {
    return {
      roleTitleRu: 'Ведущий настольной нарративной ролевой игры (Game Master)',
      roleTitleEn: 'Tabletop Narrative Role-Playing Game Master',
      focusRu: 'интерактивное повествование, последовательность мира и NPC, правила, согласованные группой, и агентность игроков',
      focusEn: 'interactive storytelling, consistent world and NPCs, the rules agreed by the group, and player agency',
      mandateRu: 'Вести игру: описывать сцены и последствия, разрешать действия по согласованным правилам и оставлять решения игрокам.',
      mandateEn: 'Run the game: narrate scenes and consequences, adjudicate actions under the agreed rules, and leave decisions to the players.',
    };
  }

  const title: Record<PromptDomain, [string, string]> = {
    retro: ['Фасилитатор анализа инцидентов', 'Incident Review Facilitator'],
    coding: ['Инженер по программному обеспечению', 'Software Engineer'],
    business: ['Бизнес-аналитик', 'Business Analyst'],
    copywriting: ['Автор и редактор', 'Writer and Editor'],
    product: ['Специалист по продукту и пользовательскому опыту', 'Product and User-Experience Practitioner'],
    research: ['Исследователь-аналитик', 'Research Analyst'],
    executive: ['Советник по принятию решений', 'Decision Advisor'],
    creative: ['Специалист по творческой задаче', 'Creative Practitioner'],
    general: ['Специалист по поставленной задаче', 'Practitioner for the Stated Task'],
  };
  const titleByDeliverable: Partial<Record<DeliverableKind, [string, string]>> = {
    facilitation_guide: ['Фасилитатор межфункциональных встреч', 'Cross-functional Meeting Facilitator'],
    practical_plan: ['Практик по операционному планированию', 'Practical Operations Planner'],
  };
  const resolvedTitle = titleByDeliverable[classification.deliverable] || title[classification.domain];

  const focusByDeliverable: Partial<Record<DeliverableKind, [string, string]>> = {
    technical_design: ['проектирование решения, явные допущения и тестовые сценарии', 'solution design, explicit assumptions, and test scenarios'],
    code_change: ['минимальное целевое изменение и относящиеся к нему проверки', 'the smallest targeted change and checks relevant to it'],
    pricing_analysis: ['сравнение применимых моделей цены и проверка гипотез на доступных данных', 'comparison of relevant pricing models and validation of hypotheses with available data'],
    gtm_plan: ['этапный план выхода на рынок, соразмерный указанным сроку и ресурсам', 'a phased go-to-market plan sized to the stated horizon and resources'],
    email: ['ясное сообщение, подходящее указанной аудитории, тону и каналу', 'clear messaging matched to the stated audience, tone, and channel'],
    headline_set: ['точные, различимые и подтверждаемые формулировки заголовков', 'specific, distinct, and supportable headline options'],
    acceptance_criteria: ['проверяемое описание требуемого поведения и граничных случаев', 'testable behavior and edge cases for the requested feature'],
    interview_synthesis: ['темы и различия в пределах предоставленных наблюдений', 'themes and differences bounded by the supplied observations'],
    study_comparison: ['сопоставление только предоставленных материалов, методов и ограничений', 'comparison of only the supplied materials, methods, and limitations'],
    executive_memo: ['решение, компромиссы, допущения, риски и следующие шаги', 'the decision, trade-offs, assumptions, risks, and next steps'],
    incident_review: ['подтверждённые события, гипотезы, неизвестные и последующие действия', 'confirmed events, hypotheses, unknowns, and follow-up actions'],
    product_recommendations: ['приоритетные изменения, отделение наблюдений от гипотез и их проверка', 'prioritized changes, separation of observations from hypotheses, and validation'],
    facilitation_guide: ['практичный ход встречи и достижение заявленного результата', 'a practical meeting flow that reaches the stated outcome'],
    practical_plan: ['выполнимые шаги в рамках заданных времени и ресурсов', 'actionable steps within the stated time and resource constraints'],
  };
  const genericFocus: [string, string] = ['точное выполнение задачи и формат, который прямо запрошен пользователем', 'accurate completion of the task in the format explicitly requested'];
  const focus = focusByDeliverable[classification.deliverable] || genericFocus;
  const mandate: [string, string] = [
    'Следовать исходной задаче и предоставленным данным; отделять факты от допущений и не добавлять неподтверждённые требования.',
    'Follow the original task and supplied evidence; distinguish facts from assumptions and do not add unsupported requirements.',
  ];

  return {
    roleTitleRu: resolvedTitle[0],
    roleTitleEn: resolvedTitle[1],
    focusRu: focus[0],
    focusEn: focus[1],
    mandateRu: mandate[0],
    mandateEn: mandate[1],
  };
}
/**
 * The Master Skill Architect: synthesizes a cohesive, unified, production-grade prompt
 * out of active skills, understanding domain synergies and eliminating chaotic fragments.
 */
export function composeSkillsArchitecture(
  rawInput: string,
  skillIds: string[],
  context?: Record<string, any>
): {
  prompt: string;
  appliedSkills: SkillDefinition[];
} {
  const orderedSkills: SkillDefinition[] = [];
  const resolvedIds = new Set<string>();

  // Expand composite Skills depth-first, preserving the user's selection order.
  // The active path also prevents malformed custom composites from recursing forever.
  const addSkill = (id: string, activePath: Set<string> = new Set()): void => {
    if (activePath.has(id) || resolvedIds.has(id)) return;
    const skill = SKILLS_REGISTRY[id];
    if (!skill) return;

    resolvedIds.add(id);
    orderedSkills.push(skill);

    const nextPath = new Set(activePath);
    nextPath.add(id);
    for (const subSkillId of skill.subSkills || []) {
      addSkill(subSkillId, nextPath);
    }
  };

  for (const id of skillIds || []) addSkill(id);

  let prompt = rawInput || '';
  for (const skill of orderedSkills) {
    // Composite transforms contain unfiltered bundled directives; execute their
    // selected leaf Skills instead so task-level preflight can remain authoritative.
    if (skill.subSkills?.length) continue;
    const transformed = skill.transform(prompt, context);
    if (typeof transformed !== 'string') {
      throw new TypeError(`Skill "${skill.id}" returned a non-string prompt.`);
    }
    prompt = transformed;
  }

  return { prompt, appliedSkills: orderedSkills };
}
