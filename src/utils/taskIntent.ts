export type PromptDomain =
  | 'retro'
  | 'coding'
  | 'business'
  | 'copywriting'
  | 'product'
  | 'research'
  | 'executive'
  | 'creative'
  | 'general';

export type DeliverableKind =
  | 'ttrpg_gm_prompt'
  | 'incident_review'
  | 'headline_set'
  | 'email'
  | 'acceptance_criteria'
  | 'pricing_analysis'
  | 'gtm_plan'
  | 'executive_memo'
  | 'interview_synthesis'
  | 'study_comparison'
  | 'research_synthesis'
  | 'code_change'
  | 'technical_design'
  | 'product_recommendations'
  | 'facilitation_guide'
  | 'practical_plan'
  | 'copy'
  | 'generic';

export type TaskIntent =
  | 'run_game'
  | 'review_incident'
  | 'write_copy'
  | 'specify_product_behavior'
  | 'analyze_pricing'
  | 'plan_market_entry'
  | 'make_executive_decision'
  | 'synthesize_evidence'
  | 'change_software'
  | 'design_technical_solution'
  | 'improve_product_experience'
  | 'facilitate'
  | 'plan'
  | 'complete_task';

export interface TaskClassification {
  domain: PromptDomain;
  intent: TaskIntent;
  deliverable: DeliverableKind;
  /** True when a concrete task/output pattern, rather than a UI hint, determined the result. */
  taskSignal: boolean;
}

function normalize(text: string): string {
  return (text || '')
    .toLowerCase()
    .replace(/[‐‑‒–—−_/]+/g, ' ')
    .replace(/[^\p{L}\p{N}$%]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isTabletopGameMasterPromptRequest(text: string): boolean {
  const asksForPrompt = /(?:промпт|prompt|system\s+instruction)/i.test(text);
  const mentionsTabletopRpg = /(?:настольн\w*.{0,80}(?:нарративн\w*.{0,30})?ролев\w*.{0,20}игр|(?:нарративн\w*.{0,30})?ролев\w*.{0,30}игр.{0,80}настольн\w*|table\s*top|tabletop|ttrpg|role[-\s]?playing\s+games?)/i.test(text);
  const mentionsGameMaster = /(?:мастер\w*.{0,30}(?:игр|настольн|ролев)|ведущ\w*.{0,30}(?:игр|настольн|ролев)|game\s*master|dungeon\s*master|\bGM\b|\bDM\b)/i.test(text);
  return asksForPrompt && mentionsTabletopRpg && mentionsGameMaster;
}

function domainFromHint(domainHint?: string): PromptDomain | null {
  const hint = normalize(domainHint || '');
  if (!hint || hint === 'auto' || hint === 'general' || hint === 'general fallback') return null;
  if (/retro|incident|postmortem|retrospective|инцидент|ретроспектив/.test(hint)) return 'retro';
  if (/coding|code|software|engineering|technical|разработ|код|техническ/.test(hint)) return 'coding';
  if (/business|gtm|strategy|pricing|бизнес|стратег|ценообраз/.test(hint)) return 'business';
  if (/copywriting|writing|conversion|creative|копирайт|текст|креатив/.test(hint)) return 'copywriting';
  if (/product|ux|user experience|продукт|пользовательск|дизайн/.test(hint)) return 'product';
  if (/research|academic|scientific|исслед|науч|академ/.test(hint)) return 'research';
  if (/executive|leadership|memo|руковод|директор|записк/.test(hint)) return 'executive';
  return null;
}

export function classifyTask(task: string, domainHint?: string): TaskClassification {
  const t = normalize(task);
  const hint = domainFromHint(domainHint);
  const result = (domain: PromptDomain, intent: TaskIntent, deliverable: DeliverableKind, taskSignal = true): TaskClassification => ({
    domain,
    intent,
    deliverable,
    taskSignal,
  });

  // Strong task/output signals come before a UI domain selector. This prevents a stale default
  // (historically Coding) from overriding an explicit request for a different artifact.
  if (isTabletopGameMasterPromptRequest(task)) return result('creative', 'run_game', 'ttrpg_gm_prompt');
  if (/\b(?:blameless|postmortem|post mortem|retrospective|outage|production incident|incident review)\b|разбор сбоя|разбор инцидента|постмортем|ретроспектив/.test(t)) {
    return result('retro', 'review_incident', 'incident_review');
  }
  if (/\b(?:acceptance criteria|user stories|definition of done)\b|критери[ия] приемки|услови[яй] приемки|критерии готовности/.test(t)) {
    return result('product', 'specify_product_behavior', 'acceptance_criteria');
  }
  if (/\b(?:audit|review|debug|fix|implement|refactor|change|modify)\b.{0,100}\b(?:api|webhook|handler|database|code|retry|retries|idempotency|integration|service)\b|(?:аудит|проверь|исправь|реализуй|рефактор).{0,100}(?:api|вебхук|обработчик|баз[аы] данных|код|повтор|идемпотент)/.test(t)) {
    return result('coding', 'design_technical_solution', 'technical_design');
  }
  if (/\b(?:\d+\s+)?(?:distinct |different |landing page )?headlines?\b|набор заголов|\d+\s+(?:вариант\w*\s+)?заголов/.test(t)) {
    return result('copywriting', 'write_copy', 'headline_set');
  }
  if (/\b(?:onboarding )?emails?\b|\bsubject line\b|\bpreview text\b|welcome email|onboarding письмо|письмо для новых пользователей|тему письма|прехедер/.test(t)) {
    return result('copywriting', 'write_copy', 'email');
  }
  if (/\b(?:pricing|price|pricing model|willingness to pay|willingness to pay|unit price)\b|ценообраз|варианты цены|модел[ьи] цены|готовност[ьи] платить/.test(t)) {
    return result('business', 'analyze_pricing', 'pricing_analysis');
  }
  if (/\b(?:go to market|go-to-market|gtm|market entry|launch plan|90 day)\b|выход на рынок|план запуска|90 дневн|90-дневн/.test(t)) {
    return result('business', 'plan_market_entry', 'gtm_plan');
  }
  if (/\b(?:executive|board|leadership) (?:decision )?memo\b|\bdecision memo\b|записк[ауе]\s+(?:для\s+)?руковод|записк[ауе].{0,50}бюджет|распределить бюджет|решение для руковод/.test(t)) {
    return result('executive', 'make_executive_decision', 'executive_memo');
  }
  if (/\b(?:compare|comparison|synthesize|summari[sz]e)\b.{0,100}\b(?:study|studies|abstracts|interview findings|interview notes)\b|\b(?:study|studies|abstracts)\b.{0,100}\b(?:compare|findings|limitations)\b|синтезируй.{0,80}(?:интервью|результат)|сравни.{0,80}(?:исследован|стать|вывод)|сопоставь.{0,80}(?:исследован|результат)/.test(t)) {
    return result('research', 'synthesize_evidence', /\b(?:compare|comparison)\b|сравни|сопоставь/.test(t) ? 'study_comparison' : 'interview_synthesis');
  }
  if (/\b(?:interview synthesis|qualitative research|research findings|research study|literature review)\b|синтез.{0,40}(?:интервью|исследован)|исследовани[ея].{0,50}(?:синтез|анализ)/.test(t)) {
    return result('research', 'synthesize_evidence', 'research_synthesis');
  }
  if (/\b(?:acceptance criteria|onboarding drop off|onboarding drop-off|user journey|product improvements|usability|multi select filters)\b|улучшени[яй].{0,50}onboarding|onboarding.{0,50}(?:drop|отказ|прекращ)|пользовательск\w*.{0,40}(?:сценар|опыт)|улучшени[яй].{0,40}приложен/.test(t)) {
    return result('product', 'improve_product_experience', 'product_recommendations');
  }
  if (/\b(?:write|draft|create|craft)\b.{0,60}\b(?:copy|landing page|newsletter|blog post|social post)\b|\bcopywriting\b|\bmarketing copy\b|написать.{0,50}(?:текст|пост|стать)|копирайт/.test(t)) {
    return result('copywriting', 'write_copy', 'copy');
  }
  if (/\b(?:facilitation guide|facilitate|meeting agenda|meeting guide)\b|руководство.{0,40}встреч|проведи встреч/.test(t)) {
    return result('general', 'facilitate', 'facilitation_guide');
  }
  if (/план.{0,50}(?:оцифров|фотоархив|архив)|\b(?:practical plan|digitize|digital archive)\b/.test(t)) {
    return result('general', 'plan', 'practical_plan');
  }
  if (/\b(?:design|propose|architect|review|specify)\b.{0,80}\b(?:fix|solution|system|webhook|api|cache|topology|contract|handler)\b|\b(?:minimal patch|review a react|fix the bug|refactor|webhook handler|sql query)\b|\bnode js\b|\breact modal\b|спроектируй.{0,80}(?:исправлен|решени|вебхук)|исправь.{0,80}(?:код|ошибк|запрос)|аудит.{0,80}кода/.test(t)) {
    const isCodeChange = /\b(?:minimal patch|fix the bug|refactor|sql query|review a react)\b|исправь.{0,80}(?:код|ошибк|запрос)/.test(t);
    return result('coding', isCodeChange ? 'change_software' : 'design_technical_solution', isCodeChange ? 'code_change' : 'technical_design');
  }

  // Fallback classification for unambiguous subject areas.
  if (/\b(?:research|scientific|academic|experiment|hypothesis|study)\b|исследован|научн|гипотез/.test(t)) return result('research', 'synthesize_evidence', 'research_synthesis');
  if (/\b(?:product|ux|user experience|interface|feature|onboarding|filter)\b|продукт|ux|интерфейс|онбординг/.test(t)) return result('product', 'improve_product_experience', 'product_recommendations');
  if (/\b(?:pricing|business|strategy|revenue|market|gtm|sales)\b|цена|бизнес|стратег|выручк|рынок/.test(t)) return result('business', 'analyze_pricing', 'generic');
  if (/\b(?:software|code|coding|programming|typescript|javascript|python|api|webhook|database|postgres|sql|bug|refactor)\b|код|программ|вебхук|баз[аы] данных|разработк/.test(t)) return result('coding', 'change_software', 'generic');
  if (/\b(?:email|headline|copywriting|newsletter|marketing)\b|письм|заголов|копирайт|рассылк/.test(t)) return result('copywriting', 'write_copy', 'generic');

  if (hint) return result(hint, 'complete_task', 'generic', false);
  if (/\b(?:decision|memo|executive|leadership|budget)\b|руковод|бюджет|записк/.test(t)) return result('executive', 'make_executive_decision', 'executive_memo');
  return result('general', 'complete_task', 'generic', false);
}
