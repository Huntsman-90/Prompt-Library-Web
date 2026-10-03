import { isRussianText, isTabletopGameMasterPromptRequest, parsePromptSections, reconstructPrompt, type ParsedSection } from '../utils/promptEngine';
import { SKILLS_REGISTRY, type SkillDefinition } from './skillsRegistry';

export type SkillPreflightDiagnosticType =
  | 'skill-filtered'
  | 'directive-adjusted'
  | 'directive-removed'
  | 'unknown-skill';

export interface SkillPreflightDiagnostic {
  type: SkillPreflightDiagnosticType;
  skillId: string;
  skillName: string;
  message: string;
  directive?: string;
  replacement?: string;
}

export interface SkillPreflightResult {
  prompt: string;
  appliedSkills: SkillDefinition[];
  diagnostics: SkillPreflightDiagnostic[];
}

type DomainGroup = 'engineering' | 'writing' | 'business' | 'product' | 'research' | 'medical' | 'legal' | 'education' | 'travel' | 'finance';

const UNIVERSAL_SKILL_IDS = new Set([
  'role-calibration',
  'constraint-injection',
  'anti-hallucination-grounding',
  'scope-boundary',
  'epistemic-calibration',
  'operational-objective',
  'definition-of-done',
]);

const CATEGORY_GROUPS: Record<string, DomainGroup> = {
  coding: 'engineering',
  technical: 'engineering',
  writing: 'writing',
  social: 'writing',
  creative: 'writing',
  business: 'business',
  ux_design: 'product',
  research: 'research',
  medical: 'medical',
  legal: 'legal',
  education: 'education',
};

const DOMAIN_RULES: Array<{ group: DomainGroup; pattern: RegExp }> = [
  { group: 'engineering', pattern: /\b(?:software|coding|programming|code|typescript|javascript|python|api|webhook|database|postgres|sql|backend|frontend|bug|refactor|инженер|код|программ|вебхук|баз[аы] данных|разработк)\b/i },
  { group: 'writing', pattern: /\b(?:copywriting|copywriter|email|e-mail|subject line|preview text|headline|landing page|newsletter|press release|blog post|креатив|копирайт|письм|рассылк|заголов|лендинг|текст)\b/i },
  { group: 'business', pattern: /\b(?:business|pricing|revenue|gtm|go-to-market|sales|market|startup|strategy|монетизац|ценообраз|выручк|бизнес|стратег|рынок|продаж)\b/i },
  { group: 'product', pattern: /\b(?:product|ux|usability|user experience|interface|user journey|продукт|юзабилити|пользовательский опыт|интерфейс)\b/i },
  { group: 'research', pattern: /\b(?:research|scientific|academic|experiment|interview|evidence|hypothesis|study|исследован|науч|академ|эксперимент|интервью|гипотез)\b/i },
  { group: 'medical', pattern: /\b(?:medical|clinical|patient|diagnos|лечени|медицин|клиническ|пациент|диагноз)\b/i },
  { group: 'legal', pattern: /\b(?:legal|law|contract|compliance|юрид|правов|договор|комплаенс)\b/i },
  { group: 'education', pattern: /\b(?:education|teaching|lesson|tutor|student|обучени|учеб|урок|преподав|студент)\b/i },
  { group: 'travel', pattern: /\b(?:travel|flight|hotel|booking|trip|путешеств|перел[её]т|отель|бронирован|поездк)\b/i },
  { group: 'finance', pattern: /\b(?:investment|investing|portfolio|valuation|financial model|инвестиц|инвестирован|портфел|оценка компании|финансовая модель)\b/i },
];

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'from', 'into', 'that', 'this', 'these', 'those', 'your', 'our', 'their', 'about', 'through', 'using', 'only', 'when', 'where', 'what', 'which', 'while', 'have', 'has', 'will', 'would', 'could', 'should', 'need', 'make', 'help', 'task', 'prompt', 'user', 'system', 'please', 'write', 'create', 'provide', 'use', 'include', 'based', 'ensure', 'must', 'not', 'also', 'then', 'than', 'into', 'from',
  'это', 'для', 'или', 'как', 'что', 'чтобы', 'при', 'если', 'также', 'задача', 'промпт', 'пользователь', 'система', 'нужно', 'можно', 'должен', 'должна', 'должны', 'только', 'этот', 'эта', 'эти', 'его', 'её', 'они', 'быть', 'есть', 'без', 'через', 'после', 'перед', 'между', 'под', 'над', 'про', 'или', 'мне', 'нам', 'ваш', 'ваша', 'ваши',
]);

const TOKEN_ALIASES: Record<string, string> = {
  webhooks: 'webhook',
  retries: 'retry',
  retrying: 'retry',
  invoices: 'invoice',
  payments: 'payment',
  interviews: 'interview',
  quotations: 'quote',
  quotes: 'quote',
  headlines: 'headline',
  emails: 'email',
  databases: 'database',
  tests: 'test',
  cases: 'case',
  claims: 'claim',
};

function canonicalTokens(text: string): Set<string> {
  const words = (text.toLowerCase().match(/[\p{L}\p{N}]{3,}/gu) || []).map((word) => TOKEN_ALIASES[word] || word);
  return new Set(words.filter((word) => !STOP_WORDS.has(word)));
}

function classifyDomain(text: string): DomainGroup | null {
  const matches = DOMAIN_RULES.filter((rule) => rule.pattern.test(text)).map((rule) => rule.group);
  return matches.length === 1 ? matches[0] : null;
}

function groupForCategory(categoryId: string): DomainGroup | null {
  return CATEGORY_GROUPS[categoryId.toLowerCase().replace(/-/g, '_')] || null;
}

function groupForSkill(skill: SkillDefinition): DomainGroup | null {
  const text = `${skill.id} ${skill.name} ${skill.displayName} ${skill.description} ${(skill.tags || []).join(' ')}`;
  return groupForCategory(skill.categoryId) || classifyDomain(text);
}

function getTaskGroup(task: string, domain?: string): DomainGroup | null {
  if (isTabletopGameMasterPromptRequest(task)) return 'writing';
  return classifyDomain(task) || classifyDomain(domain || '');
}

function relevantTerms(task: string, skill: SkillDefinition): string[] {
  const taskTerms = canonicalTokens(task);
  const skillTerms = canonicalTokens(`${skill.id} ${skill.name} ${skill.displayName} ${skill.description} ${(skill.tags || []).join(' ')}`);
  return [...taskTerms].filter((term) => skillTerms.has(term)).sort();
}

function resolveSelectedSkills(skillIds: string[], diagnostics: SkillPreflightDiagnostic[]): SkillDefinition[] {
  const ordered: SkillDefinition[] = [];
  const resolved = new Set<string>();

  const visit = (id: string, activePath: Set<string> = new Set()): void => {
    if (activePath.has(id) || resolved.has(id)) return;
    const skill = SKILLS_REGISTRY[id];
    if (!skill) {
      diagnostics.push({
        type: 'unknown-skill',
        skillId: id,
        skillName: id,
        message: `Selected Skill "${id}" is not available in the current registry.`,
      });
      return;
    }
    resolved.add(id);
    ordered.push(skill);
    const nextPath = new Set(activePath);
    nextPath.add(id);
    for (const childId of skill.subSkills || []) visit(childId, nextPath);
  };

  for (const id of skillIds || []) visit(id);
  return ordered;
}

function filterReason(
  skill: SkillDefinition,
  task: string,
  taskGroup: DomainGroup | null
): string | null {
  if (skill.isUserCreated || UNIVERSAL_SKILL_IDS.has(skill.id)) return null;
  if (!taskGroup) return null;

  const matches = relevantTerms(task, skill);
  const skillGroup = groupForSkill(skill);
  if (matches.length > 0 || !skillGroup || skillGroup === taskGroup) return null;

  return `Task/domain is classified as ${taskGroup}, while this Skill is specialized for ${skillGroup}; no matching task terms were found.`;
}

interface TaskConstraints {
  noFabrication: boolean;
  noImplementation: boolean;
  noExternalSources: boolean;
  noQuotes: boolean;
  singleDeliverable: boolean;
  jsonOnly: boolean;
}

function detectTaskConstraints(task: string): TaskConstraints {
  const text = task.toLowerCase();
  const noFabrication =
    /\b(?:do not|don't|never|without)\b[^.!?\n]{0,100}\b(?:invent|fabricate|make up|unsupported|unsubstantiated)\b/i.test(task) ||
    /\buse only\s+(?:the\s+)?(?:supplied|provided|attached|following)\b/i.test(task) ||
    /не\s+(?:выдумывай|выдумывайте|придумывай|придумывайте|фабрикуй|фабрикуйте)[^.!?\n]{0,100}/i.test(task) ||
    /используй(?:те)?\s+только\s+(?:предоставлен|приложен|исходн|эти\s+замет)/i.test(task);
  const noImplementation =
    /\b(?:do not|don't|never|no)\b[^.!?\n]{0,100}\b(?:write|generate|produce|implement|output)\b[^.!?\n]{0,60}\b(?:code|implementation)\b/i.test(task) ||
    /\bno\s+(?:implementation\s+)?code\b/i.test(task) ||
    /не\s+(?:пиши|писать|реализуй|реализовывай|генерируй|генерировать)[^.!?\n]{0,100}(?:код|реализац)/i.test(task) ||
    /без\s+(?:написания\s+)?кода/i.test(task);
  const noExternalSources =
    /\b(?:do not|don't|never|no)\b[^.!?\n]{0,100}\b(?:use|cite|search|browse)\b[^.!?\n]{0,60}\b(?:external|outside|internet|web|sources?)\b/i.test(task) ||
    /\buse only\s+(?:the\s+)?(?:supplied|provided|attached|following)\b/i.test(task) ||
    /не\s+(?:используй|используйте|ищи|ищите|цитируй|цитируйте)[^.!?\n]{0,100}(?:внешн|интернет|веб|источник)/i.test(task) ||
    /только\s+(?:на\s+основе\s+)?(?:предоставлен|приложен|исходн).{0,40}(?:замет|материал|данн|источник)/i.test(task);
  const noQuotes =
    /\b(?:do not|don't|never|no)\b[^.!?\n]{0,80}\b(?:include|use|add|make up|fabricate)?\s*(?:verbatim\s+|customer\s+|direct\s+)?(?:quotes?|quotations?|testimonials?)\b/i.test(task) ||
    /не\s+(?:добавляй|добавляйте|используй|используйте|цитируй|цитируйте|выдумывай|выдумывайте|придумывай|придумывайте)[^.!?\n]{0,80}(?:цитат|отзыв)/i.test(task);
  const singleDeliverable =
    /\b(?:exactly\s+one|only\s+one|a\s+single|one\s+(?:onboarding\s+)?(?:email|headline|article|post|deliverable|version))\b/i.test(text) ||
    /\b(?:no|without)\s+(?:extra\s+)?variants\b/i.test(text) ||
    /\bодин\s+(?:единственный\s+)?(?:текст|пост|вариант|заголов|email|письм)\b/i.test(text) ||
    /\bтолько\s+один\b/i.test(text);
  const jsonOnly = /\b(?:only|strictly|raw)\s+(?:valid\s+)?json\b|\bjson\s+only\b|только\s+(?:валидный\s+)?json\b/i.test(task);

  return { noFabrication, noImplementation, noExternalSources, noQuotes, singleDeliverable, jsonOnly };
}

interface DirectiveAdjustment {
  type: 'directive-adjusted' | 'directive-removed';
  message: string;
  replacement: string | null;
}

function inspectDirective(line: string, task: string, constraints: TaskConstraints): DirectiveAdjustment | null {
  const lower = line.toLowerCase();
  const isRu = isRussianText(task);
  if (/\b(?:only when supported|if supported|if evidence exists|when evidence is available|только при подтверждении|если подтверждено|при наличии данных)\b/i.test(lower)) return null;

  if (constraints.noImplementation && /\b(?:write|generate|produce|implement|deliver)\b[^.!?]{0,100}\b(?:implementation\s+)?code\b/i.test(line)) {
    return {
      type: 'directive-adjusted',
      message: isRu ? 'Директива изменена: явный запрет на код из задачи имеет приоритет.' : 'Adjusted to honor the task\'s explicit prohibition on implementation code.',
      replacement: isRu ? 'Не выдавайте реализационный код до получения запрошенных исходных материалов; вместо этого дайте ограниченный план и укажите недостающие входные данные.' : 'Do not provide implementation code until the requested source materials are available; give a bounded plan and identify missing inputs instead.',
    };
  }

  if (constraints.jsonOnly && /\b(?:markdown|table|prose|bullet points|headings)\b/i.test(line)) {
    return {
      type: 'directive-adjusted',
      message: isRu ? 'Формат Skill приведён к требованию JSON-only.' : 'Adjusted the Skill format instruction to honor the JSON-only requirement.',
      replacement: isRu ? 'Выводите только валидный JSON в соответствии с исходной задачей; не добавляйте Markdown или прозу.' : 'Return only valid JSON as requested by the task; do not add Markdown or prose.',
    };
  }

  if (constraints.singleDeliverable && /\b(?:several|multiple|a few|various)\b[^.!?]{0,80}\b(?:variants?|versions?|options?|headlines?|angles?)\b/i.test(line)) {
    return {
      type: 'directive-adjusted',
      message: isRu ? 'Убрано требование нескольких вариантов: задача запрашивает один результат.' : 'Adjusted the request for multiple variants to honor the task\'s single-deliverable constraint.',
      replacement: isRu ? 'Подготовьте только один результат, прямо запрошенный в исходной задаче.' : 'Provide only the single deliverable requested in the original task.',
    };
  }

  if (constraints.noQuotes && /\b(?:include|use|provide|add|incorporate)\b[^.!?]{0,80}\b(?:quotes?|quotations?|testimonials?)\b/i.test(line)) {
    return {
      type: 'directive-removed',
      message: isRu ? 'Удалено требование цитат: исходная задача запрещает их добавлять.' : 'Removed a quotation requirement because the task prohibits adding quotes.',
      replacement: null,
    };
  }

  if (constraints.noExternalSources && /\b(?:search|browse|cite|consult|use)\b[^.!?]{0,80}\b(?:external|outside|internet|web|sources?|references?)\b/i.test(line)) {
    return {
      type: 'directive-adjusted',
      message: isRu ? 'Внешние источники исключены согласно ограничению задачи.' : 'Adjusted to honor the task\'s restriction on external sources.',
      replacement: isRu ? 'Используйте только источники, разрешённые исходной задачей; обозначьте пробелы в материалах.' : 'Use only sources allowed by the original task and state where supplied material is insufficient.',
    };
  }

  if (constraints.noFabrication && /\b(?:counterintuitive statistic|statistics?|social proof|case studies?|testimonials?|before\s*\/\s*after|risk[- ]reversal guarantees?|urgency|unsupported customer claims?|traditional methods fail|competitors? fail|standard approaches fail)\b/i.test(line)) {
    if (/\b(?:quotes?|quotations?|testimonials?)\b/i.test(line) && !constraints.noQuotes) {
      return {
        type: 'directive-adjusted',
        message: isRu ? 'Цитаты разрешены только при наличии точной формулировки в исходных материалах.' : 'Restricted quotations to exact wording present in the supplied material.',
        replacement: isRu ? 'Используйте дословные цитаты только если они действительно есть в предоставленных материалах; иначе опустите их.' : 'Use verbatim quotations only when they actually appear in supplied materials; otherwise omit them.',
      };
    }
    const phase = line.match(/^\s*(Attention|Interest|Desire|Action)\s*:/i)?.[1];
    let groundedInstruction: string;
    if (/\b(?:counterintuitive statistic|statistics?)\b/i.test(line)) {
      groundedInstruction = isRu
        ? 'Начните с ясного релевантного вступления; статистику используйте только при прямом подтверждении в предоставленных материалах.'
        : 'Open with a clear, relevant hook; use a statistic only when directly supported by supplied material.';
    } else if (/\b(?:traditional methods fail|competitors? fail|standard approaches fail)\b/i.test(line)) {
      groundedInstruction = isRu
        ? 'Объясняйте проблему только в пределах контекста и доказательств, предоставленных пользователем; не утверждайте без подтверждения, что альтернативные подходы не работают.'
        : 'Explain the problem using only user-provided context and evidence; do not claim that alternative approaches fail without support.';
    } else if (/\b(?:social proof|case studies?|before\s*\/\s*after)\b/i.test(line)) {
      groundedInstruction = isRu
        ? 'Используйте социальные доказательства, кейсы и утверждения «до/после» только при прямом подтверждении в предоставленных материалах; иначе опустите их.'
        : 'Use social proof, case studies, and before/after claims only when directly supported by supplied material; otherwise omit them.';
    } else if (/\b(?:guarantees?|urgency)\b/i.test(line)) {
      groundedInstruction = isRu
        ? 'Упоминайте гарантии и срочность только если условия предложения подтверждены пользователем; не придумывайте условия, дефицит или сроки.'
        : 'Mention guarantees and urgency only when offer terms are confirmed by the user; do not invent terms, scarcity, or deadlines.';
    } else {
      groundedInstruction = isRu
        ? 'Используйте статистику, социальные доказательства, кейсы, гарантии и срочность только при прямом подтверждении в предоставленных материалах; иначе опустите их.'
        : 'Use statistics, social proof, case studies, guarantees, and urgency only when directly supported by supplied material; otherwise omit them.';
    }
    return {
      type: 'directive-adjusted',
      message: isRu ? 'Требования к неподтверждённым фактам смягчены согласно исходной задаче.' : 'Grounded the persuasive-claim instruction in the task\'s no-fabrication constraint.',
      replacement: phase ? `${phase}: ${groundedInstruction}` : groundedInstruction,
    };
  }

  const specifiesHmac = /\bHMAC[-\s]?SHA-?256\b/i.test(line);
  if (specifiesHmac && !/\bHMAC[-\s]?SHA-?256\b/i.test(task)) {
    return {
      type: 'directive-adjusted',
      message: isRu ? 'Не заданный задачей алгоритм подписи заменён требованием следовать контракту провайдера.' : 'Replaced an unspecified signature algorithm with a provider-contract requirement.',
      replacement: isRu ? 'Используйте алгоритм подписи, указанный в документации провайдера; не предполагайте HMAC-SHA256 без подтверждения контракта.' : 'Use the signature algorithm documented by the provider; do not assume HMAC-SHA256 unless the contract confirms it.',
    };
  }

  const duration = line.match(/\b\d+\s*(?:seconds?|minutes?|hours?|days?|секунд\w*|минут\w*|час\w*|дн\w*)\b/i)?.[0];
  if (duration && !new RegExp(duration.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(task)) {
    return {
      type: 'directive-adjusted',
      message: isRu ? `Неподтверждённый порог «${duration}» заменён требованием свериться с контрактом.` : `Replaced the unprovided threshold "${duration}" with a requirement to verify the contract.`,
      replacement: isRu ? 'Используйте порог, документированный соответствующим провайдером или контрактом; не вводите неподтверждённое фиксированное значение.' : 'Use the threshold documented by the relevant provider or contract; do not introduce an unsupported fixed value.',
    };
  }

  return null;
}

function addedDirectiveLines(before: string, after: string): string[] {
  const counts = new Map<string, number>();
  for (const line of before.split(/\r?\n/)) {
    const value = line.trim();
    if (!value || /^#{1,6}\s/.test(value)) continue;
    counts.set(value, (counts.get(value) || 0) + 1);
  }

  const added: string[] = [];
  for (const line of after.split(/\r?\n/)) {
    const value = line.trim();
    if (!value || /^#{1,6}\s/.test(value)) continue;
    const count = counts.get(value) || 0;
    if (count > 0) counts.set(value, count - 1);
    else added.push(value);
  }
  return added;
}

function replaceLastDirective(prompt: string, directive: string, replacement: string | null): string {
  const lines = prompt.split(/\r?\n/);
  const index = lines.findLastIndex((line) => line.trim() === directive.trim());
  if (index < 0) return prompt;
  const prefix = lines[index].match(/^\s*(?:[-*]\s+|\d+[.)]\s+)/)?.[0] || '';
  lines[index] = replacement === null ? '' : `${prefix}${replacement}`;
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function appendInstructionPrecedence(prompt: string, task: string): string {
  const isRu = isRussianText(task);
  const { preamble, sections } = parsePromptSections(prompt);
  const title = isRu ? 'Приоритет инструкций' : 'Instruction Precedence';
  if (sections.some((section) => section.cleanTitle.toLowerCase() === title.toLowerCase())) {
    return reconstructPrompt(preamble, sections);
  }
  const section: ParsedSection = {
    rawHeader: `### ${title}`,
    level: 3,
    title,
    cleanTitle: title.toLowerCase(),
    lines: isRu
      ? [
          'Явные требования, ограничения и запреты исходной задачи важнее общих рекомендаций Skills и шаблонов.',
          'Если рекомендация Skill противоречит задаче или требует неподтверждённых фактов, адаптируйте или опустите её; не выдумывайте данные.',
        ]
      : [
          'Explicit requirements, constraints, and prohibitions in the original task take precedence over generic Skill guidance and templates.',
          'If a Skill instruction conflicts with the task or requires unsupported facts, adapt or omit it; never fabricate evidence.',
        ],
    semanticType: 'guardrail_directive',
  };
  sections.push(section);
  return reconstructPrompt(preamble, sections);
}

/**
 * Deterministically preflights explicitly selected Skills before composing them:
 * clear cross-domain mismatches are skipped and newly introduced directives are
 * checked against user constraints. No API/LLM is used.
 */
export function applySkillsWithPreflight(
  prompt: string,
  skillIds: string[],
  context: Record<string, any> = {},
  task = prompt,
  domain = ''
): SkillPreflightResult {
  const diagnostics: SkillPreflightDiagnostic[] = [];
  const candidateSkills = resolveSelectedSkills(skillIds || [], diagnostics);
  const taskGroup = getTaskGroup(task, domain);
  const constraints = detectTaskConstraints(task);
  let currentPrompt = prompt || '';
  const appliedSkills: SkillDefinition[] = [];

  for (const skill of candidateSkills) {
    const reason = filterReason(skill, task, taskGroup);
    if (reason) {
      diagnostics.push({
        type: 'skill-filtered',
        skillId: skill.id,
        skillName: skill.displayName,
        message: reason,
      });
      continue;
    }

    const transformed = skill.transform(currentPrompt, context);
    if (typeof transformed !== 'string') throw new TypeError(`Skill "${skill.id}" returned a non-string prompt.`);

    let candidatePrompt = transformed;
    const added = addedDirectiveLines(currentPrompt, transformed);
    for (const directive of added) {
      const adjustment = inspectDirective(directive, task, constraints);
      if (!adjustment) continue;
      candidatePrompt = replaceLastDirective(candidatePrompt, directive, adjustment.replacement);
      diagnostics.push({
        type: adjustment.type,
        skillId: skill.id,
        skillName: skill.displayName,
        message: adjustment.message,
        directive,
        replacement: adjustment.replacement || undefined,
      });
    }

    // A wrapper/rewrite Skill must not silently discard the supplied task or source prompt.
    const requiredInput = task.trim();
    if (requiredInput && currentPrompt.includes(requiredInput) && !candidatePrompt.includes(requiredInput)) {
      diagnostics.push({
        type: 'directive-removed',
        skillId: skill.id,
        skillName: skill.displayName,
        message: isRussianText(task)
          ? 'Skill пропущен: его трансформация теряла исходный текст задачи.'
          : 'Skill was skipped because its transform would discard the original task text.',
      });
      continue;
    }

    const remainingAdditions = addedDirectiveLines(currentPrompt, candidatePrompt);
    if (candidatePrompt === currentPrompt || (added.length > 0 && remainingAdditions.length === 0)) {
      continue;
    }

    currentPrompt = candidatePrompt;
    appliedSkills.push(skill);
  }

  return {
    prompt: appendInstructionPrecedence(currentPrompt, task),
    appliedSkills,
    diagnostics,
  };
}
