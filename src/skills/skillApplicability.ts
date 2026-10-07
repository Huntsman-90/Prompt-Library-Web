import type { DeliverableKind } from '../utils/taskIntent';

/** Returns a concise reason when a Skill's known scope conflicts with the requested artifact. */
export function getDeliverableSkillMismatch(
  skillId: string,
  deliverable: DeliverableKind,
  task: string
): string | null {
  const id = skillId.toLowerCase();
  const explicitPersuasion = /\b(?:aida|pas|persuasive|persuasion|direct response|conversion|sales copy|sales email|marketing campaign)\b|убедительн|конверси|продающ|продажн/i.test(task);
  const requestsUiCopy = /\b(?:microcopy|button label|placeholder|error message|empty state|toast text|ui copy|interface text)\b|микрокопи|текст(?:ы|а)?\s+(?:кноп|ошиб|пуст|интерфейс)|надпись.{0,25}(?:кноп|элемент)/i.test(task);
  const requestsUsabilityAudit = /\b(?:heuristic evaluation|usability audit|usability review|nielsen heuristics|heuristic audit)\b|эвристическ(?:ий|ого) аудит|аудит юзабилити|оценк[аи] юзабилити/i.test(task);
  const requestsJourneyAnalysis = /\b(?:customer journey|user journey|journey map|journey mapping)\b|карт[аы] пользовательского пути|карта пути клиента/i.test(task);
  const requestsPersona = /\b(?:user persona|buyer persona|persona development|persona profile)\b|персон[аы]\s+(?:пользователя|клиента)|профиль\s+пользователя/i.test(task);
  const requestsMethodCritique = /\b(?:peer review|methodology critique|critique (?:the )?methods?|methodological quality|risk of bias|bias assessment|audit (?:the )?methodology)\b|рецензир|критик[ауе]\s+методолог|аудит\s+методолог|риск\s+смещени/i.test(task);
  const requestsMultiplePerspectives = /\b(?:multiple perspectives|multi-perspective|triangulate|debate|consensus synthesis|multi-agent analysis)\b|разные точки зрения|многоперспектив|дебат|мультиагент|несколько перспектив/i.test(task);
  const hasUnitEconomicsInputs = /\b(?:CAC|LTV|payback|NRR|gross margin|unit cost|acquisition cost|retention economics|cohort analysis|unit economics?)\b|валов(?:ая|ую) марж|стоимост[ьи] привлечен|удержан.{0,30}выручк/i.test(task);
  const asksRefactor = /\brefactor(?:ing)?\b|рефактор(?:инг|ить)/i.test(task) && !/\b(?:do not|don't|avoid|no)\b[^.!?\n]{0,45}\brefactor(?:ing)?\b|не\s+рефактор/i.test(task);
  const requestsCodebaseAudit = /\b(?:codebase audit|code smell|technical debt|architecture review|comprehensive code review)\b|\b(?:audit|review)\b[^.!?\n]{0,55}\b(?:code|implementation|webhook|retry|api|database|service|system)\b|аудит.{0,45}(?:код|вебхук|api|баз[аы] данных|сервис|систем)|технический долг|обзор архитектуры/i.test(task) || asksRefactor;

  if (/^copywriting-(?:aida|pas)/.test(id) && ['email', 'headline_set'].includes(deliverable) && !explicitPersuasion) {
    return 'Persuasion framework was not requested for this specific email/headline deliverable.';
  }
  if (/headline-subheadline-paragraph-harmony/.test(id) && deliverable !== 'copy') {
    return 'This Skill adds subhead/paragraph structure, while the task requests a headline set only.';
  }
  if (/(?:microcopy-ux-writing|writing-ux-microcopy)/.test(id) && !requestsUiCopy) {
    return 'The task does not request interface text, labels, or microcopy.';
  }
  if (/heuristic-evaluation-nielsen|usability-heuristic-audit/.test(id) && !requestsUsabilityAudit) {
    return 'A heuristic/usability audit was not requested for this deliverable.';
  }
  if (/customer-journey-empathy-friction-map/.test(id) && !requestsJourneyAnalysis) {
    return 'A full customer-journey map was not requested; keep analysis within the stated flow or observations.';
  }
  if (/user-persona-empathy/.test(id) && !requestsPersona) {
    return 'Persona development was not requested for this deliverable.';
  }
  if (/literature-review-synthesis|literature-synthesis/.test(id) && !/\b(?:literature review|review of literature|systematic review|external sources|additional sources)\b|обзор литературы|литературн(?:ый|ого) обзор/i.test(task)) {
    return 'A literature review/source search was not requested; the task is bounded to supplied material.';
  }
  if (/methodology-critique-peer-review|methodology-critique/.test(id) && !requestsMethodCritique) {
    return 'A peer-review/methodology audit was not requested; keep the response to the stated synthesis or comparison.';
  }
  if (/analysis-multi-multi-perspective-qualitative-research-analysis/.test(id) && !requestsMultiplePerspectives) {
    return 'A multi-perspective/debate workflow was not requested for this bounded qualitative synthesis.';
  }
  if (/unit-economics-modeling/.test(id) && deliverable !== 'pricing_analysis') {
    return 'Unit-economics modeling is outside the requested go-to-market deliverable and the task supplies no such model inputs.';
  }
  if (/unit-economics-modeling/.test(id) && deliverable === 'pricing_analysis' && !hasUnitEconomicsInputs) {
    return 'Unit-economics/payback/cohort analysis was not requested and the task supplies no cost, acquisition, margin, or retention inputs.';
  }
  if (/gtm-roadmap-phasing/.test(id) && deliverable !== 'gtm_plan') {
    return 'A go-to-market roadmap was not requested for this deliverable.';
  }
  if (/defensible-moats/.test(id) && !/\b(?:moat|competitive advantage|competitor|defensib|differentiation)\b|конкурентн|отличи(?:е|я)/i.test(task)) {
    return 'The task does not ask for competitive-moat or competitor analysis.';
  }
  if (/code-audit-smells/.test(id) && !requestsCodebaseAudit) {
    return 'A codebase audit/refactor was not requested; the task calls for a scoped change or design.';
  }
  if (/type-safety-contracts/.test(id) && !/\b(?:typescript|type safety|type contract|static typing|typed api)\b|типобезопас|контракт типов|typescript/i.test(task)) {
    return 'The task does not specify a type-system or typed-contract requirement.';
  }
  return null;
}
