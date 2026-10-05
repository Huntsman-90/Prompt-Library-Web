import { isRussianText, isTabletopGameMasterPromptRequest, parsePromptSections, reconstructPrompt, type ParsedSection } from '../utils/promptEngine';
import { SKILLS_REGISTRY, type SkillDefinition } from './skillsRegistry';
import { getDeliverableSkillMismatch } from './skillApplicability';
import { classifyTask, type TaskClassification } from '../utils/taskIntent';

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
  if (/^(?:core-summary-first-executive-structure-bluf|bulleted-executive-memo|comparative-tradeoff-matrix|executive-markdown-table)$/.test(skill.id.toLowerCase())) return 'business';
  return groupForCategory(skill.categoryId) || classifyDomain(text);
}

function getTaskGroup(task: string, domain?: string): DomainGroup | null {
  const inferred = classifyTask(task, domain).domain;
  const groups: Partial<Record<TaskClassification['domain'], DomainGroup>> = {
    coding: 'engineering',
    business: 'business',
    copywriting: 'writing',
    product: 'product',
    research: 'research',
    executive: 'business',
    creative: 'writing',
  };
  return groups[inferred] || (inferred === 'retro' || inferred === 'general' ? null : classifyDomain(domain || ''));
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
  taskGroup: DomainGroup | null,
  classification: TaskClassification
): string | null {
  if (skill.isUserCreated || UNIVERSAL_SKILL_IDS.has(skill.id)) return null;
  const deliverableMismatch = getDeliverableSkillMismatch(skill.id, classification.deliverable, task);
  if (deliverableMismatch) return deliverableMismatch;
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
  noUnrequestedStack: boolean;
  narrowScope: boolean;
}

function detectTaskConstraints(task: string): TaskConstraints {
  const text = task.toLowerCase();
  const noFabrication =
    /\b(?:do not|don't|never|without)\b[^.!?\n]{0,100}\b(?:invent|fabricate|make up|unsupported|unsubstantiated)\b/i.test(task) ||
    /\buse only\s+(?:the\s+)?(?:supplied|provided|attached|following)\b/i.test(task) ||
    /\b(?:only|solely)\s+confirmed facts\b|\bdo not infer\b[^.!?\n]{0,80}\b(?:as fact|as established)\b|\bunknowns?\b[^.!?\n]{0,80}\b(?:as facts?|established)\b/i.test(task) ||
    /не\s+(?:выдумывай|выдумывайте|придумывай|придумывайте|фабрикуй|фабрикуйте)[^.!?\n]{0,100}/i.test(task) ||
    /(?:только|лишь)\s+подтвержд[её]нн\w*\s+факт|не\s+выводи\w*[^.!?\n]{0,80}(?:как\s+)?установленн\w*\s+причин|не\s+(?:выдавай|представляй|подавай)\w*[^.!?\n]{0,80}установленн\w*\s+причин/i.test(task) ||
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
  const noUnrequestedStack = /without prescribing an? unrequested technical stack|do not assume (?:access to |a )?(?:special )?(?:software|tool|framework)|не\s+(?:задавай|предписывай|навязывай)\s+(?:не)?запрошенн\w*\s+(?:техническ\w+\s+)?стек|без предположений о (?:специальном )?(?:ПО|инструментах|стеке)/i.test(task);
  const narrowScope = /minimal patch|focused tests|do not refactor unrelated|do not change unrelated|stay within (?:the )?(?:requested|stated) scope|не рефактор(?:и|ируй) несвязанн|не меняй несвязанн|только целевое изменение/i.test(task);

  return { noFabrication, noImplementation, noExternalSources, noQuotes, singleDeliverable, jsonOnly, noUnrequestedStack, narrowScope };
}

interface DirectiveAdjustment {
  type: 'directive-adjusted' | 'directive-removed';
  message: string;
  replacement: string | null;
}

function inspectDirective(
  line: string,
  task: string,
  constraints: TaskConstraints,
  classification: TaskClassification
): DirectiveAdjustment | null {
  const lower = line.toLowerCase();
  const isRu = isRussianText(task);
  if (/\b(?:only when supported|if supported|if evidence exists|when evidence is available|только при подтверждении|если подтверждено|при наличии данных)\b/i.test(lower)) return null;

  if (classification.domain !== 'coding' && /\b(?:code completeness|incomplete stubs|generated code|implementation code completeness)\b|полнот[аы]\s+кода|незавершённ(?:ый|ые)\s+заглушк/i.test(line)) {
    return {
      type: 'directive-removed',
      message: isRu ? 'Удалено нерелевантное для этой задачи требование полноты кода.' : 'Removed code-completeness boilerplate from a non-coding deliverable.',
      replacement: null,
    };
  }

  if (/\b(?:multi[- ]agent|agent debate|consensus synthesis|consensus-building workflow)\b|мультиагент\w*|дебат\w*|синтез консенсуса/i.test(line) && !/\b(?:multi[- ]agent|multiple perspectives|debate|consensus synthesis)\b|мультиагент|разные точки зрения|дебат|консенсус/i.test(task)) {
    return {
      type: 'directive-removed',
      message: isRu ? 'Удалён не запрошенный многоагентный/дискуссионный процесс.' : 'Removed an unrequested multi-agent or debate workflow.',
      replacement: null,
    };
  }

  if (constraints.narrowScope && /\b(?:entire codebase|all components|all modules|comprehensive architectural audit|refactor broadly|rewrite the whole|full platform redesign)\b|всю кодовую базу|все компоненты|полный архитектурный аудит|масштабный рефакторинг/i.test(line)) {
    return {
      type: 'directive-adjusted',
      message: isRu ? 'Объём Skill ограничен явным запросом на минимальное целевое изменение.' : 'Narrowed the Skill to honor the requested minimal, focused scope.',
      replacement: isRu ? 'Работайте только в рамках указанной задачи и связанных компонентов; не расширяйте объём изменения.' : 'Stay within the stated task and directly related components; do not broaden the change scope.',
    };
  }

  const tools = ['TypeScript', 'JavaScript', 'React', 'Vue', 'Angular', 'Vitest', 'Jest', 'Playwright', 'Cypress', 'Pytest', 'Python', 'Java', 'PostgreSQL', 'Redis'];
  const introducedTools = tools.filter((tool) => {
    const escaped = tool.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`, 'i').test(line) && !new RegExp(`\\b${escaped}\\b`, 'i').test(task);
  });
  if (introducedTools.length > 0) {
    return {
      type: 'directive-adjusted',
      message: isRu ? 'Неуказанный стек или test runner заменён требованием следовать контексту проекта.' : 'Replaced an unrequested stack or test runner with a repository-convention requirement.',
      replacement: isRu ? 'Следуйте стеку и тестовым соглашениям, уже установленным в проекте; если они недоступны, укажите это, не предписывая новый инструмент.' : 'Follow the stack and test conventions established by the project; if they are unavailable, state the gap rather than prescribing a new tool.',
    };
  }

  const forcedScoring = /(?:weighted criteria|normalized evaluation dimensions|total weight\s*=|sum of weights|sensitivity (?:testing|analysis)|\bscore each (?:option|alternative)|оцен(?:ите|ивать) каждый вариант|сумма весов|взвешенн\w* критери|анализ чувствительност)/i.test(line);
  if (forcedScoring && /\d|%|±|\b(?:1\s*(?:-|to)\s*5)\b/i.test(line)) {
    const values = line.match(/\d+(?:[.,]\d+)?\s*%?/g) || [];
    if (values.some((value) => !task.includes(value.trim())) || !/weight|score|sensitivity|вес|шкал|чувствительност/i.test(task)) {
      return {
        type: 'directive-adjusted',
        message: isRu ? 'Удалены неподтверждённые веса и балльная шкала; сохранено сравнение по обоснованным данным.' : 'Removed unsupported weights and scoring scales while retaining evidence-based comparison.',
        replacement: isRu ? 'Сравнивайте варианты по критериям, относящимся к решению, только если они подтверждены вводными; при нехватке данных покажите качественные компромиссы и обозначьте допущения, не выдумывая веса, баллы или диапазоны чувствительности.' : 'Compare options using decision-relevant criteria supported by the supplied context; when evidence is insufficient, present qualitative trade-offs and label assumptions without inventing weights, scores, or sensitivity ranges.',
      };
    }
  }

  const unsupportedCount = line.match(/\b\d+\s+(?:design partners?|customers?|users?|participants?|interviews?|accounts?|founders?|stores?|locations?|teams?|контрагент\w*|партн[её]р\w*|клиент\w*|пользовател\w*|участник\w*|интервью|команд\w*)/i);
  if (unsupportedCount && !task.includes(unsupportedCount[0].match(/\d+/)?.[0] || '')) {
    return {
      type: 'directive-adjusted',
      message: isRu ? 'Убран не заданный задачей размер выборки или target count.' : 'Removed an unprovided sample size or target count.',
      replacement: isRu ? 'Определяйте объём набора или эксперимента по доступным ресурсам и обосновывайте его; при отсутствии данных обозначьте количество как гипотезу, а не обязательную цель.' : 'Size recruitment or experiments to the stated resources and justify the choice; when evidence is absent, label counts as hypotheses rather than fixed targets.',
    };
  }

  if (/\b(?:private alpha|public beta|commercial ga|scale-up phase)\b|частн\w* альф\w*|публичн\w* бет\w*|коммерческ\w* ga/i.test(line) && !/\b(?:private alpha|public beta|commercial ga)\b|частн\w* альф\w*|публичн\w* бет\w*/i.test(task)) {
    return {
      type: 'directive-adjusted',
      message: isRu ? 'Заменена предписанная последовательность запуска; этапы должны соответствовать контексту продукта.' : 'Replaced a prescribed launch sequence with context-dependent phasing.',
      replacement: isRu ? 'Выберите число, названия и порядок этапов по готовности продукта, аудитории и заданным ресурсам; не предполагайте обязательный путь alpha → beta → GA → scale.' : 'Choose the number, labels, and order of phases based on product readiness, audience, and stated resources; do not assume an alpha → beta → GA → scale sequence.',
    };
  }

  if (/\b(?:jira ids?|hard deadlines|named accountable people|exact (?:figures|dates|names)|specific personal names|assigned owners and hard deadlines)\b|дедлайн(?:ом)? до\s+\d+|конкретн\w* ответственн\w* лиц\w* и срок/i.test(line) && !/\b(?:jira|ticket id|hard deadline|exact dates|specific personal names)\b|точн\w* дат|именно\s+конкретн\w* имен/i.test(task)) {
    return {
      type: 'directive-adjusted',
      message: isRu ? 'Неподтверждённые личные имена, ticket IDs и сроки заменены на явно помечаемые предложения.' : 'Replaced unsupported names, ticket IDs, and deadlines with clearly labeled proposals.',
      replacement: isRu ? 'Не выдумывайте имена, номера задач или сроки; если задача требует владельца, предложите роль как вариант и пометьте её как предлагаемую, а неизвестные даты оставьте открытыми.' : 'Do not invent names, ticket IDs, or dates; when ownership is required, suggest a role and label it as proposed, leaving unknown dates open.',
    };
  }

  if (classification.deliverable === 'executive_memo' && /candidate architectures?|throughput|\bTCO\b|architecture criteria/i.test(line) && !/candidate architecture|throughput|\bTCO\b|architecture/i.test(task)) {
    return {
      type: 'directive-adjusted',
      message: isRu ? 'Удалены архитектурные критерии, не относящиеся к запрошенному управленческому решению.' : 'Removed architecture-scoring criteria unrelated to the requested executive decision.',
      replacement: isRu ? 'Оценивайте только последствия и компромиссы, относящиеся к решению из исходной задачи.' : 'Assess only the consequences and trade-offs relevant to the decision in the original task.',
    };
  }

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

  if (classification.deliverable === 'incident_review' && /\b(?:minute-by-minute|exact chronological timeline|T0|trigger\s*[-–>]\s*detection\s*[-–>]\s*escalation|full resolution)\b/i.test(line) && !/\b(?:minute-by-minute|T0|exact chronological timeline)\b/i.test(task)) {
    return {
      type: 'directive-adjusted',
      message: isRu ? 'Убрано требование неподтверждённых точных временных отметок или промежуточных событий.' : 'Removed an exact-timeline requirement that exceeds the supplied incident facts.',
      replacement: isRu ? 'Сохраняйте только переданные события и временные отметки; не заполняйте промежуточные шаги, время обнаружения или полного восстановления без данных.' : 'Preserve only supplied events and timestamps; do not fill intermediate steps, detection times, or full-resolution timing without evidence.',
    };
  }

  if (constraints.noFabrication && /\b(?:monitoring blindspots?|deployment gaps?|missing circuit breakers?|contributing systemic factors?)\b|слеп\w* зон\w* мониторинг|пробел\w* депло|отсутств\w* circuit breaker/i.test(line)) {
    return {
      type: 'directive-adjusted',
      message: isRu ? 'Примеры причин переведены в гипотезы для проверки, а не в выводы.' : 'Reframed speculative cause examples as hypotheses to test, not findings.',
      replacement: isRu ? 'Рассматривайте системные факторы только как гипотезы, если они следуют из подтверждённых фактов; неизвестные причины оставьте открытыми и предложите способы проверки.' : 'Treat systemic factors only as hypotheses when they follow from confirmed facts; keep unknown causes open and specify how to test them.',
    };
  }

  const metricTarget = line.match(/(?:\b(?:NPS|LTV|CAC|retention|conversion|churn|payback|ROI|KPI|metric|target|threshold|benchmark|complexity|coverage|success rate)\b|удержан|конверси|порог|метрик|сложност|покрыти)[^.!?\n]{0,80}(?:>=|<=|>|<|≥|≤|at least|at most|above|below|over|under|не менее|не выше|более|менее)\s*\$?\d+(?:[.,]\d+)?\s*%?/i);
  if (metricTarget) {
    const numericValues = metricTarget[0].match(/\d+(?:[.,]\d+)?/g) || [];
    if (numericValues.some((value) => !task.includes(value))) {
      return {
        type: 'directive-adjusted',
        message: isRu ? 'Неподтверждённый числовой порог удалён; метрику следует обосновать контекстом.' : 'Removed an unsupported numeric target; ground any metric in the supplied context.',
        replacement: isRu ? 'Используйте релевантную метрику только при наличии подходящих данных и обоснованного ориентира; иначе предложите способ измерения и обозначьте целевые значения как гипотезы.' : 'Use a relevant metric only when suitable data and a justified benchmark exist; otherwise propose how to measure it and label any target as a hypothesis.',
      };
    }
  }

  const specifiesHmac = /\bHMAC[-\s]?SHA-?256\b/i.test(line);
  if (specifiesHmac && !/\bHMAC[-\s]?SHA-?256\b/i.test(task)) {
    return {
      type: 'directive-adjusted',
      message: isRu ? 'Не заданный задачей алгоритм подписи заменён требованием следовать контракту провайдера.' : 'Replaced an unspecified signature algorithm with a provider-contract requirement.',
      replacement: isRu ? 'Используйте алгоритм подписи, указанный в документации провайдера; не предполагайте HMAC-SHA256 без подтверждения контракта.' : 'Use the signature algorithm documented by the provider; do not assume HMAC-SHA256 unless the contract confirms it.',
    };
  }

  const duration = line.match(/\b\d+\s*(?:seconds?|minutes?|hours?|days?)\b|\d+\s*(?:секунд|минут|час|дн)\w*/i)?.[0];
  if (duration && !new RegExp(duration.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(task)) {
    const isDeadline = /\b(?:deadline|due date|hard deadline)\b|дедлайн|срок/i.test(line);
    return {
      type: 'directive-adjusted',
      message: isRu ? `Неподтверждённый порог «${duration}» заменён требованием свериться с контрактом.` : `Replaced the unprovided threshold "${duration}" with a requirement to verify the contract.`,
      replacement: isDeadline
        ? (isRu ? 'Не назначайте неподтверждённый срок; если срок нужен, предложите его как допущение, связанное с приоритетом и доступными ресурсами.' : 'Do not impose an unsupported due date; if timing is needed, label it as a proposal tied to priority and available resources.')
        : (isRu ? 'Используйте порог, документированный соответствующим провайдером или контрактом; не вводите неподтверждённое фиксированное значение.' : 'Use the threshold documented by the relevant provider or contract; do not introduce an unsupported fixed value.'),
    };
  }

  return null;
}

function addedDirectiveLines(before: string, after: string): string[] {
  const counts = new Map<string, number>();
  for (const line of before.split(/\r?\n/)) {
    const value = line.trim();
    if (!value || (/^#{1,6}\s/.test(value) && !/\b(?:vitest|jest|playwright|cypress|pytest|code completeness|weighted criteria|jira|tco)\b/i.test(value))) continue;
    counts.set(value, (counts.get(value) || 0) + 1);
  }

  const added: string[] = [];
  for (const line of after.split(/\r?\n/)) {
    const value = line.trim();
    if (!value || (/^#{1,6}\s/.test(value) && !/\b(?:vitest|jest|playwright|cypress|pytest|code completeness|weighted criteria|jira|tco)\b/i.test(value))) continue;
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
  const classification = classifyTask(task, domain);
  const taskGroup = getTaskGroup(task, domain);
  const constraints = detectTaskConstraints(task);
  if (classification.domain === 'coding') constraints.noUnrequestedStack = true;
  let currentPrompt = prompt || '';
  const appliedSkills: SkillDefinition[] = [];

  for (const skill of candidateSkills) {
    const reason = filterReason(skill, task, taskGroup, classification);
    if (reason) {
      diagnostics.push({
        type: 'skill-filtered',
        skillId: skill.id,
        skillName: skill.displayName,
        message: reason,
      });
      continue;
    }

    // A composite is a selection container. Its own hard-coded bundle would bypass
    // the relevance and conflict checks applied to its individual sub-skills.
    if (skill.subSkills?.length) {
      appliedSkills.push(skill);
      continue;
    }

    const transformed = skill.transform(currentPrompt, context);
    if (typeof transformed !== 'string') throw new TypeError(`Skill "${skill.id}" returned a non-string prompt.`);

    let candidatePrompt = transformed;
    const added = addedDirectiveLines(currentPrompt, transformed);
    for (const directive of added) {
      const adjustment = inspectDirective(directive, task, constraints, classification);
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
