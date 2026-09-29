import { extractVariables } from '../hooks/useVariables';

export interface GeneratePromptParams {
  domain: string;
  task: string;
  technique: string;
  tone: string;
  detailLevel: 'minimalist' | 'balanced' | 'exhaustive';
  targetModel: string;
}

/**
 * Strips meta-prompting noise, generator preambles, and conversational meta-instructions
 * in both English and Russian, returning the clean, operational core task.
 */
export function extractCoreGoalAndCleanMeta(input: string): string {
  if (!input) return '';

  let clean = input.trim();

  // Multi-line and line-level meta-prompt patterns (English & Russian)
  const metaRegexes = [
    // English meta-prompting prefixes
    /^(I need|I want|Please write|Write|Create|Draft|Generate|Build|Make|Construct|Design)\s+(a|an)?\s*(system|expert|custom|detailed)?\s*prompt\s+(for|that|which|to|where|allowing|capable of|about|helping to|to help)\s+/gi,
    /^(Can you|Could you|Would you)\s+(please\s+)?(write|create|generate|draft|build|make)\s+(a|an)?\s*(system|custom)?\s*prompt\s+(for|that|which|to|about)\s+/gi,
    /^(Act as a|You are a)\s+prompt\s+(engineer|generator|creator|architect)\s+(and|to|that)\s+/gi,
    /^(Here is a prompt|This is a prompt|Optimize this prompt|Improve this prompt):\s*/gi,
    /^(I am looking for a prompt that|I need help writing a prompt to|Help me write a prompt for)\s+/gi,

    // Russian meta-prompting prefixes
    /^(мне нужен|нужен|напиши|создай|сделай|составь|разработай|сгенерируй|оптимизируй)\s+(системный|кастомный|детальный|хороший)?\s*промпт\s+(для|который|чтобы|по|помогающий)\s+/gi,
    /^(можешь|могла бы|помоги|напиши|создай)\s+(составить|написать|сделать|сгенерировать)?\s*(системный|кастомный)?\s*промпт\s+(для|который|чтобы|по|помогающий)\s+/gi,
    /^(ты\s*[-—]?\s*промпт[- ](инженер|инженерка|архитектор|эксперт)|действуй как промпт[- ]инженер)\s*(напиши|создай|составь)?\s*/gi,
    /^(вот промпт|улучши этот промпт|оптимизируй промпт):\s*/gi,
    /^(напиши системный промпт|создай системный промпт|нужен системный промпт)\s+(для|по|который|помогающий)?\s*/gi,

    // Synthetic generator wrappers (Russian & English)
    /^(?:Execute\s+.+?\s+with\s+(?:production\s+rigor|high\s+domain\s+rigor|complete\s+production\s+deliverables)[^\n]*\n*)/gi,
    /^(?:Execute domain directive with high technical fidelity\.?)/gi,
    /^(?:Разработать комплексное профессиональное решение с глубоким анализом предмета|Сформировать глубокий разбор инцидента, проанализировать хронологию и выработать план предотвращения рецидивов|Провести аудит представленного фрагмента кода, устранить архитектурные дефекты и обеспечить типобезопасность|Разработать комплексную стратегию развития, определить ключевые KPI и подготовить дорожную карту реализации|Подготовить емкий, убедительный материал с четкой структурой и ориентацией на целевую аудиторию)\s*:?\s*/gi,
    /^(?:Deliver an expert, structured solution focusing on the following domain|Conduct a thorough post-mortem analysis, reconstruct event timelines, and establish preventative measures|Audit and refactor the codebase to eliminate technical debt, enhance type safety, and optimize performance|Formulate a comprehensive growth strategy, map unit economics, and define execution milestones|Craft high-impact, persuasive copy tailored for maximum audience engagement and clarity)\s*:?\s*/gi,
  ];

  for (const rx of metaRegexes) {
    clean = clean.replace(rx, '');
  }

  // Remove meta instructions embedded at the end
  clean = clean.replace(/\s*(Please make sure the prompt|The prompt should include|Ensure the prompt has|Format the prompt as|Make it professional|Include variables like|Убедись, что промпт содержит|Промпт должен включать|Сделай промпт профессиональным).*$/gi, '');

  // Remove polite conversational preambles
  clean = clean
    .replace(/^(Hello|Hi|Hey|Dear AI|Привет|Здравствуйте),\s*/gi, '')
    .replace(/\b(please|kindly)\b|пожалуйста/gi, '')
    .replace(/[ \t]+/g, ' ')
    .trim();

  // Strip trailing periods if any
  clean = clean.replace(/\.+$/, '');

  // Capitalize first letter
  if (clean.length > 0) {
    clean = clean.charAt(0).toUpperCase() + clean.slice(1);
  }

  return clean || input.trim();
}

/**
 * Detects whether the input text is primarily Russian.
 */
export function isRussianText(text: string): boolean {
  const cyrillicMatches = text.match(/[а-яА-ЯёЁ]/g);
  return (cyrillicMatches?.length || 0) > 3;
}

/**
 * Rephrases raw user intent into a professional domain mandate without verbatim phrase copying.
 */
function rephraseGoalToMandate(cleanGoal: string, isRu: boolean): string {
  if (!cleanGoal) return isRu ? 'Сформировать экспертное решение по предметной области.' : 'Synthesize a structured domain deliverable.';

  let core = cleanGoal
    .replace(/^([А-Яа-яA-Za-z]+)\s+мне\s+/i, '')
    .replace(/^(мне\s+нужен|нужен|напиши|создай|сделай|разработай|проверить|написать|составить)\s+/i, '')
    .replace(/^(?:Разработать комплексное профессиональное решение с глубоким анализом предмета|Сформировать глубокий разбор инцидента|Провести аудит представленного фрагмента кода|Разработать комплексную стратегию развития|Подготовить емкий, убедительный материал)\s*:?\s*/i, '')
    .replace(/^(?:Deliver an expert, structured solution focusing on the following domain|Conduct a thorough post-mortem analysis|Audit and refactor the codebase|Formulate a comprehensive growth strategy|Craft high-impact, persuasive copy)\s*:?\s*/i, '')
    .replace(/[.\s]+$/, '')
    .trim();

  if (isRu) {
    if (/ретроспектив|постмортем|инцидент|сбой|авари/i.test(core)) {
      return 'Сформировать глубокий разбор инцидента, проанализировать хронологию и выработать план предотвращения рецидивов.';
    }
    if (/код|рефакторинг|исправ|ошибк|баг|скрипт/i.test(core)) {
      return 'Провести аудит представленного фрагмента кода, устранить архитектурные дефекты и обеспечить типобезопасность.';
    }
    if (/стратеги|бизнес|маркетинг|продаж|цена/i.test(core)) {
      return 'Разработать комплексную стратегию развития, определить ключевые KPI и подготовить дорожную карту реализации.';
    }
    if (/текст|стать|пост|письмо|копирайтинг/i.test(core)) {
      return 'Подготовить емкий, убедительный материал с четкой структурой и ориентацией на целевую аудиторию.';
    }
    core = core.charAt(0).toUpperCase() + core.slice(1);
    return `Сформировать экспертное, структурированное решение и практические рекомендации по направлению: ${core}.`;
  } else {
    if (/retrospect|postmortem|incident|outage/i.test(core)) {
      return 'Conduct a thorough post-mortem analysis, reconstruct event timelines, and establish preventative measures.';
    }
    if (/code|refactor|bug|fix|typescript|python/i.test(core)) {
      return 'Audit and refactor the codebase to eliminate technical debt, enhance type safety, and optimize performance.';
    }
    if (/strategy|business|gtm|marketing|sales/i.test(core)) {
      return 'Formulate a comprehensive growth strategy, map unit economics, and define execution milestones.';
    }
    if (/copy|write|article|post|newsletter/i.test(core)) {
      return 'Craft high-impact, persuasive copy tailored for maximum audience engagement and clarity.';
    }
    core = core.charAt(0).toUpperCase() + core.slice(1);
    return `Synthesize an authoritative, structured deliverable and strategic recommendations for: ${core}.`;
  }
}

export interface ParsedSection {
  rawHeader: string;
  level: number;
  title: string;
  cleanTitle: string;
  lines: string[];
  semanticType:
    | 'role'
    | 'context'
    | 'protocol'
    | 'constraints'
    | 'output_format'
    | 'variables'
    | 'examples'
    | 'domain_specific';
}

function classifySection(title: string, bodyText: string): ParsedSection['semanticType'] {
  const t = title.toLowerCase().replace(/^\d+[\.\)]\s*/, '').trim();
  const b = bodyText.toLowerCase();

  // Forbidden headers check
  if (/primary directive|core directive|main directive|operational directive|user goal|original request|основная директива|главная директива/i.test(t)) {
    return 'context';
  }

  // Variables
  if (/переменн|variable|parameters|параметр/i.test(t)) {
    return 'variables';
  }

  // Role
  if (/(?:роль|role|identity|persona|authority|полномочия|экспертиз|who you are|\bactor\b)/i.test(t) ||
      /^(?:вы выступаете в роли|you are acting as|you are an expert|act as a)/i.test(b.trim())) {
    return 'role';
  }

  // Constraints & Rules
  if (/ограничени|constraint|правил|rule|guardrail|negative|запрет|требован|governance/i.test(t)) {
    return 'constraints';
  }

  // Output Format / Deliverable
  if (/формат вывод|output format|output spec|deliverable|спецификаци|структура ответ|matrix|матриц|action items|action item/i.test(t)) {
    return 'output_format';
  }

  // Examples
  if (/пример|example|few-shot|образец/i.test(t)) {
    return 'examples';
  }

  // Context & Scope
  if (/контекст|context|scope|область примен|постановка задач|брифинг|briefing|background/i.test(t)) {
    return 'context';
  }

  // Protocol / Process / Reasoning / Domain Steps
  if (/протокол|protocol|thinking|рассужден|мышлени|алгоритм|workflow|пошагов|step|хронологи|timeline|root cause|первопричин|5 почему|whys|аудит|audit|рефакторинг|refactor|директив|directive|позиционирован|юнит-эконом|road map|дорожная карт|hook|aida|pas arc|ущерб|масштаб инцидент|screening|execution|directives|safeguard|regression|тестирован|проверк/i.test(t)) {
    return 'protocol';
  }

  return 'domain_specific';
}

function classifyXmlTag(tag: string): ParsedSection['semanticType'] {
  const t = tag.toLowerCase();
  if (/role/i.test(t)) return 'role';
  if (/instruction|context|operational_prompt/i.test(t)) return 'context';
  if (/thinking|process|protocol/i.test(t)) return 'protocol';
  if (/constraint|rule/i.test(t)) return 'constraints';
  if (/deliverable|output|format/i.test(t)) return 'output_format';
  return 'domain_specific';
}

export function parsePromptSections(text: string): { preamble: string; sections: ParsedSection[] } {
  const lines = text.split('\n');
  const sections: ParsedSection[] = [];
  const preambleLines: string[] = [];
  let currentSection: ParsedSection | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const headerMatch = line.match(/^(#{1,4})\s+(.+)$/);
    const xmlMatch = line.match(/^<([a-zA-Z0-9_-]+)>$/);

    if (headerMatch) {
      if (currentSection) {
        sections.push(currentSection);
      }
      const rawHeader = line.trim();
      const level = headerMatch[1].length;
      const title = headerMatch[2].trim();
      const cleanTitle = title.toLowerCase().replace(/^\d+[\.\)]\s*/, '').trim();

      currentSection = {
        rawHeader,
        level,
        title,
        cleanTitle,
        lines: [],
        semanticType: classifySection(cleanTitle, ''),
      };
    } else if (xmlMatch) {
      if (currentSection) {
        sections.push(currentSection);
      }
      const rawHeader = line.trim();
      const tagName = xmlMatch[1];
      currentSection = {
        rawHeader,
        level: 3,
        title: tagName,
        cleanTitle: tagName.toLowerCase(),
        lines: [],
        semanticType: classifyXmlTag(tagName),
      };
    } else {
      if (currentSection) {
        currentSection.lines.push(line);
      } else {
        preambleLines.push(line);
      }
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  for (const sec of sections) {
    if (sec.semanticType === 'domain_specific') {
      const bodyText = sec.lines.join('\n');
      sec.semanticType = classifySection(sec.cleanTitle, bodyText);
    }
  }

  return {
    preamble: preambleLines.join('\n').trim(),
    sections,
  };
}

export function extractTaskFromGeneratedPrompt(input: string): string {
  if (!input || !input.trim()) return '';

  const trimmed = input.trim();

  // 1. XML <context_and_scope> (from AI Build expert)
  const xmlContextMatch = trimmed.match(/<context_and_scope>([\s\S]*?)<\/context_and_scope>/i);
  if (xmlContextMatch && xmlContextMatch[1].trim()) {
    return extractCoreGoalAndCleanMeta(xmlContextMatch[1].trim());
  }

  // 2. XML <operational_prompt> (from model adapters)
  const xmlOperationalMatch = trimmed.match(/<operational_prompt>([\s\S]*?)<\/operational_prompt>/i);
  if (xmlOperationalMatch && xmlOperationalMatch[1].trim()) {
    return extractTaskFromGeneratedPrompt(xmlOperationalMatch[1].trim());
  }

  // 3. Markdown ### Context & Scope or Refactoring Scope, Creative Scope, Task, etc.
  const contextHeaderMatch = trimmed.match(
    /###\s+(?:Context & Scope|Контекст и Область Применения|Контекст и Постановка Задачи|Context|Scope|Стратегический Контекст|Творческий Брифинг|Refactoring Scope|Creative Scope|Strategic Scope|Task|Задача|Цель|Область Рефакторинга)\s*\n([\s\S]*?)(?=\n###|\n<|$)/i
  );
  if (contextHeaderMatch && contextHeaderMatch[1].trim()) {
    return extractCoreGoalAndCleanMeta(contextHeaderMatch[1].trim());
  }

  // 4. Check if there is a section containing task/scope via parsePromptSections
  const { sections } = parsePromptSections(trimmed);
  const contextSec = sections.find(s => s.semanticType === 'context' || /задач|task|цель|goal|scope|контекст/i.test(s.cleanTitle));
  if (contextSec && contextSec.lines.length > 0) {
    const rawLines = contextSec.lines.join('\n').trim();
    if (rawLines) {
      return extractCoreGoalAndCleanMeta(rawLines);
    }
  }

  // 5. Default: clean meta-prompting from input
  return extractCoreGoalAndCleanMeta(trimmed);
}

export function isGeneratedOrDraftPrompt(text: string): boolean {
  if (!text || text.trim().length === 0) return true;

  const trimmed = text.trim();

  // 1. AI Build signature XML tags
  if (/<system_role>|<context_and_scope>|<operational_constraints>|<deliverable_specification>/i.test(trimmed)) {
    return true;
  }

  // 2. Model adapter XML or marker tags around prompts
  if (/<operational_prompt>|\[SYSTEM DIRECTIVE\]|\[OPERATIONAL PROMPT\]|<\|start_header_id\|>/i.test(trimmed)) {
    return true;
  }

  // 3. AI Build signature generic boilerplate phrasing (across all complexity levels)
  if (
    /You are a domain specialist/i.test(trimmed) ||
    /experienced domain authority with comprehensive expertise in this subject matter/i.test(trimmed) ||
    /elite principal engineer and strategist with deep specialized mastery/i.test(trimmed) ||
    /Deliver a clear, direct answer addressing the request/i.test(trimmed) ||
    /Step 1:\s*Clarify core mechanism or problem statement/i.test(trimmed) ||
    /Step 2:\s*Provide complete, actionable deliverable/i.test(trimmed) ||
    /Step 3:\s*Highlight caveats, edge cases, or trade-offs/i.test(trimmed) ||
    /Deconstruct objective into core functional requirements/i.test(trimmed) ||
    /Structure final response with:\s*\n-\s*Executive Summary/i.test(trimmed) ||
    /Avoid buzzwords, fluff, and unnecessary preambles/i.test(trimmed)
  ) {
    return true;
  }

  // 4. Meta-prompting noise present in text
  if (
    /^(?:мне нужен|нужен|напиши|создай|сделай|разработай)\s+(?:системный|кастомный|детальный)?\s*промпт/i.test(trimmed) ||
    /^(?:i need|i want|please write|write|create|generate)\s+(?:a|an)?\s*(?:system|custom)?\s*prompt/i.test(trimmed)
  ) {
    return true;
  }

  // 5. Minimal length or minimal headers (drafts)
  // Fully optimized production prompts are comprehensive (at least 3 sections, length >= 420 chars)
  const headers = trimmed.match(/^(?:###|##|#)\s+[^\n]+/gm) || [];
  if (headers.length < 3 || trimmed.length < 420) {
    return true;
  }

  // 7. Check if it lacks deep domain protocol (e.g. only has generic placeholders or empty body)
  const { sections } = parsePromptSections(trimmed);
  const protocolSecs = sections.filter(s => s.semanticType === 'protocol' || s.semanticType === 'domain_specific');
  const hasConstraints = sections.some(s => s.semanticType === 'constraints');
  const hasRole = sections.some(s => s.semanticType === 'role');

  // If missing role, constraints, or substantive protocol sections -> it is still a draft!
  if (!hasRole || !hasConstraints || protocolSecs.length === 0) {
    return true;
  }

  // Total lines of protocol content
  const protocolLines = protocolSecs.flatMap(s => s.lines).filter(l => l.trim().length > 0);
  if (protocolLines.length < 3) {
    return true;
  }

  // Passed all draft checks: It is an established, already structured & optimized prompt
  return false;
}

export function isPromptAlreadyOptimized(text: string): boolean {
  return !isGeneratedOrDraftPrompt(text);
}

function sanitizeSectionHeader(sec: ParsedSection, isRu: boolean): void {
  const forbidden = /primary directive|core directive|main directive|operational directive|user goal|original request|основная директива|главная директива|исходный запрос/i;
  if (forbidden.test(sec.title)) {
    sec.title = isRu ? 'Контекст и Область Применения' : 'Context & Scope';
    sec.rawHeader = `### ${sec.title}`;
    sec.cleanTitle = sec.title.toLowerCase();
    sec.semanticType = 'context';
  }
}

export function deduplicateBullets(lines: string[]): string[] {
  const result: string[] = [];
  const seen = new Set<string>();

  for (const line of lines) {
    const trimmed = line.trim();
    const isItem = /^[-*•]\s+/.test(trimmed) || /^\d+[\.\)]\s+/.test(trimmed);
    if (isItem) {
      const normalized = trimmed
        .replace(/^[-*•]\s+/, '')
        .replace(/^\d+[\.\)]\s+/, '')
        .toLowerCase()
        .replace(/[.,:;!?]+$/, '')
        .trim();

      if (seen.has(normalized)) {
        continue;
      }
      seen.add(normalized);
      result.push(line);
    } else {
      result.push(line);
    }
  }

  return result;
}

export function deduplicatePromptSections(sections: ParsedSection[], isRu: boolean): ParsedSection[] {
  const result: ParsedSection[] = [];
  const seenCategories = new Set<string>();
  const seenTitles = new Set<string>();
  let mergedVariables: ParsedSection | null = null;
  let mergedConstraints: ParsedSection | null = null;

  for (const sec of sections) {
    sanitizeSectionHeader(sec, isRu);

    const normTitle = sec.cleanTitle;

    // Check exact title duplicate
    if (seenTitles.has(normTitle) && sec.semanticType !== 'variables' && sec.semanticType !== 'constraints') {
      continue;
    }

    if (sec.semanticType === 'role') {
      if (seenCategories.has('role')) {
        continue;
      }
      seenCategories.add('role');
      seenTitles.add(normTitle);
      result.push(sec);
    } else if (sec.semanticType === 'variables') {
      if (!mergedVariables) {
        mergedVariables = {
          ...sec,
          lines: [...sec.lines],
        };
        seenCategories.add('variables');
        seenTitles.add(normTitle);
        result.push(mergedVariables);
      } else {
        mergedVariables.lines.push(...sec.lines);
      }
    } else if (sec.semanticType === 'constraints') {
      if (!mergedConstraints) {
        mergedConstraints = {
          ...sec,
          lines: [...sec.lines],
        };
        seenCategories.add('constraints');
        seenTitles.add(normTitle);
        result.push(mergedConstraints);
      } else {
        mergedConstraints.lines.push(...sec.lines);
      }
    } else if (sec.semanticType === 'output_format') {
      if (seenCategories.has('output_format')) {
        continue;
      }
      seenCategories.add('output_format');
      seenTitles.add(normTitle);
      result.push(sec);
    } else {
      seenTitles.add(normTitle);
      result.push(sec);
    }
  }

  // Deduplicate variables inside mergedVariables
  if (mergedVariables) {
    const varSeen = new Set<string>();
    const uniqueVarLines: string[] = [];
    for (const l of mergedVariables.lines) {
      const vMatch = l.match(/\[\[(.*?)\]\]/);
      if (vMatch) {
        const vName = vMatch[1].trim();
        if (varSeen.has(vName)) continue;
        varSeen.add(vName);
      }
      uniqueVarLines.push(l);
    }
    mergedVariables.lines = uniqueVarLines;
  }

  // Deduplicate bullets inside all sections
  for (const s of result) {
    s.lines = deduplicateBullets(s.lines);
  }

  return result;
}

export function reconstructPrompt(preamble: string, sections: ParsedSection[]): string {
  const parts: string[] = [];
  if (preamble.trim()) {
    parts.push(preamble.trim());
  }

  for (const sec of sections) {
    const header = sec.rawHeader.trim();
    const cleanLines = deduplicateBullets(sec.lines)
      .map(l => l.trimEnd())
      .filter((l, idx, arr) => !(l === '' && arr[idx - 1] === ''));

    const body = cleanLines.join('\n').trim();
    if (body.length > 0) {
      parts.push(`${header}\n${body}`);
    } else {
      parts.push(header);
    }
  }

  return parts.join('\n\n').trim();
}

export function detectPromptDomain(text: string): 'retro' | 'coding' | 'business' | 'copywriting' | 'general' {
  const lower = text.toLowerCase();

  // 1. Role or title indicators (strongest signal for structured/semi-structured prompts)
  if (/site reliability|blameless|постмортем|ретроспектив|хронологи|5 почему|timeline reconstruction|incident retrospective/i.test(lower)) {
    return 'retro';
  }
  if (/software architect|архитектор по|code_snippet|фрагмент_кода|директивы по рефакторингу|refactoring directive|типобезопасност|vitest|jest|refactoring scope|область рефакторинга|чистой архитектуре/i.test(lower)) {
    return 'coding';
  }
  if (/chief strategy|директор по стратеги|юнит-экономик|unit economic|gtm roadmap|дорожная карта выхода на рынок|позиционирование и целевой сегмент/i.test(lower)) {
    return 'business';
  }
  if (/direct-response copywriter|элитный копирайтер|hooks & headlines|крючки и заголовки|арка убеждения|persuasion arc|creative scope/i.test(lower)) {
    return 'copywriting';
  }

  // 2. Goal / scope keywords (strictly isolated words)
  const taskGoal = extractTaskFromGeneratedPrompt(text).toLowerCase();
  const searchScope = taskGoal.length > 5 ? taskGoal : lower;

  if (/(?:^|[^а-яa-z0-9_])(?:retrospect|postmortem|incident|outage|ретроспектив|постмортем|инцидент|авари|сбой|скрам|спринт)(?:[^а-яa-z0-9_]|$)/i.test(searchScope)) {
    return 'retro';
  }
  if (/(?:^|[^а-яa-z0-9_])(?:code|refactor|typescript|react|python|sql|debug|api|bug|github|docker|код|рефакторинг|исправь|ошибк|скрипт)(?:[^а-яa-z0-9_]|$)/i.test(searchScope)) {
    return 'coding';
  }
  if (/(?:^|[^а-яa-z0-9_])(?:strategy|gtm|pricing|investor|saas|pitch|бизнес|стратеги|питч|продаж|маркетинг|ценообразовани)(?:[^а-яa-z0-9_]|$)/i.test(searchScope)) {
    return 'business';
  }
  if (/(?:^|[^а-яa-z0-9_])(?:copywriting|copywriter|article|newsletter|копирайтинг|копирайтер|рассылк)(?:[^а-яa-z0-9_]|$)/i.test(searchScope)) {
    return 'copywriting';
  }

  return 'general';
}

export function refineOptimizedPrompt(
  inputPrompt: string,
  aggressiveness: 'low' | 'medium' | 'high' = 'high',
  options?: {
    chainOfThought?: boolean;
    riskAudit?: boolean;
    constraints?: boolean;
    examples?: boolean;
  }
): string {
  const isRu = isRussianText(inputPrompt);
  const { preamble, sections } = parsePromptSections(inputPrompt);

  const cleanedSections = deduplicatePromptSections(sections, isRu);

  // 1. LIGHT MODE (Idempotent cleanup & normalization)
  if (aggressiveness === 'low') {
    return reconstructPrompt(preamble, cleanedSections);
  }

  // Detect domain
  const domain = detectPromptDomain(inputPrompt);
  const isRetro = domain === 'retro';
  const isCoding = domain === 'coding';
  const isBusiness = domain === 'business';
  const isCopywriting = domain === 'copywriting';

  const hasCategory = (cat: ParsedSection['semanticType']) => cleanedSections.some(s => s.semanticType === cat);
  const findCategory = (cat: ParsedSection['semanticType']) => cleanedSections.find(s => s.semanticType === cat);

  // 2. MEDIUM MODE
  if (aggressiveness === 'medium') {
    if (!hasCategory('constraints') && options?.constraints !== false) {
      const header = isRu ? '### Ограничения и Правила' : '### Constraints & Rules';
      const lines = isRu
        ? [
            '- Исключить вводные фразы, вежливые клише и пространные рассуждения.',
            '- Строго придерживаться проверенных фактов и технической точности.',
          ]
        : [
            '- Zero conversational filler or introductory chatter.',
            '- Ground all statements in verified facts and technical precision.',
          ];
      cleanedSections.push({
        rawHeader: header,
        level: 3,
        title: isRu ? 'Ограничения и Правила' : 'Constraints & Rules',
        cleanTitle: isRu ? 'ограничения и правила' : 'constraints & rules',
        lines,
        semanticType: 'constraints',
      });
    }

    if (!hasCategory('output_format')) {
      const header = isRu ? '### Формат Вывода' : '### Output Format';
      const lines = isRu
        ? ['Четкая структурированная форма вывода в формате Markdown.']
        : ['Structured Markdown deliverable with clear section headers.'];
      cleanedSections.push({
        rawHeader: header,
        level: 3,
        title: isRu ? 'Формат Вывода' : 'Output Format',
        cleanTitle: isRu ? 'формат вывода' : 'output format',
        lines,
        semanticType: 'output_format',
      });
    }

    return reconstructPrompt(preamble, deduplicatePromptSections(cleanedSections, isRu));
  }

  // 3. DEEP MODE (High Aggressiveness)
  const roleSec = findCategory('role');
  if (roleSec) {
    const isSenior = /principal|senior|lead|ведущ|главн|архитектор|директор|элитн/i.test(roleSec.lines.join(' '));
    if (!isSenior) {
      if (isRetro) {
        roleSec.lines = [
          isRu
            ? 'Вы выступаете в роли опытного Site Reliability Lead и Фасилитатора, специализирующегося на проведении системных ретроспектив инцидентов и разборе сбоев в культуре без поиска виновных (Blameless Culture).'
            : 'You are acting as a Senior Site Reliability Engineer and Systems Auditor specializing in blameless post-mortems and incident retrospectives.',
        ];
        roleSec.rawHeader = isRu ? '### Роль и Принципы (Blameless Culture)' : '### Role & Blameless Principles';
        roleSec.title = isRu ? 'Роль и Принципы (Blameless Culture)' : 'Role & Blameless Principles';
        roleSec.cleanTitle = roleSec.title.toLowerCase();
      } else if (isCoding) {
        roleSec.lines = [
          isRu
            ? 'Вы выступаете в роли Главного Архитектора ПО (Principal Software Architect), специализирующегося на чистой архитектуре, типобезопасности, оптимизации производительности и надёжности сложных распределённых систем.'
            : 'You are acting as a Principal Software Architect specializing in clean code, type safety, low-latency performance, and resilient systems design.',
        ];
        roleSec.rawHeader = isRu ? '### Роль и Полномочия' : '### Role & Authority';
        roleSec.title = isRu ? 'Роль и Полномочия' : 'Role & Authority';
        roleSec.cleanTitle = roleSec.title.toLowerCase();
      } else if (isBusiness) {
        roleSec.lines = [
          isRu
            ? 'Вы выступаете в роли Директора по Стратегии (CSO) и бизнес-консультанта, специализирующегося на юнит-экономике, выходе на рынок (GTM), монетизации и конкурентных преимуществах.'
            : 'You are acting as a Chief Strategy Officer and Enterprise Advisor specializing in unit economics, go-to-market execution, and defensible moats.',
        ];
        roleSec.rawHeader = isRu ? '### Роль и Экспертиза' : '### Role & Authority';
        roleSec.title = isRu ? 'Роль и Экспертиза' : 'Role & Authority';
        roleSec.cleanTitle = roleSec.title.toLowerCase();
      } else if (isCopywriting) {
        roleSec.lines = [
          isRu
            ? 'Вы выступаете в роли Элитного Копирайтера и Главного Редактора, специализирующегося на высокой конверсии, ясности изложения и убедительном сторителлинге.'
            : 'You are acting as an Elite Direct-Response Copywriter and Marketing Communications Director.',
        ];
        roleSec.rawHeader = isRu ? '### Роль и Стиль' : '### Role & Authority';
        roleSec.title = isRu ? 'Роль и Стиль' : 'Role & Authority';
        roleSec.cleanTitle = roleSec.title.toLowerCase();
      } else {
        roleSec.lines = [
          isRu
            ? 'Вы выступаете в роли Ведущего Эксперта и Стратега в соответствующей предметной области.'
            : 'You are acting as a Principal Domain Specialist and Enterprise Advisor.',
        ];
      }
    }
  }

  // Elevate Domain Sections for Retro
  if (isRetro) {
    const hasTimeline = cleanedSections.some(s => /хронологи|timeline/i.test(s.cleanTitle));
    const hasRootCause = cleanedSections.some(s => /root cause|первопричин|5 почему|5 whys/i.test(s.cleanTitle));
    const hasActionItems = cleanedSections.some(s => /action items|матрица действий|матрица предотвращения/i.test(s.cleanTitle));

    if (!hasTimeline) {
      cleanedSections.push({
        rawHeader: isRu ? '### 2. Реконструкция Хронологии (Timeline)' : '### 2. Timeline Reconstruction',
        level: 3,
        title: isRu ? 'Реконструкция Хронологии (Timeline)' : 'Timeline Reconstruction',
        cleanTitle: 'timeline',
        lines: isRu
          ? [
              '- **Обнаружение (Detection)**: Время и канал первого сигнала.',
              '- **Локализация (Triage)**: Определение эпицентра сбоя.',
              '- **Стабилизация (Mitigation)**: Временные меры восстановления.',
              '- **Полное Решение (Resolution)**: Окончательное устранение дефекта.',
            ]
          : [
              '- **Detection Phase**: Initial trigger, monitoring alert, or user escalation.',
              '- **Triage Phase**: Failure isolation and diagnosis.',
              '- **Mitigation Phase**: Workaround applied to restore service.',
              '- **Resolution Phase**: Permanent fix deployment.',
            ],
        semanticType: 'protocol',
      });
    }

    if (!hasRootCause) {
      cleanedSections.push({
        rawHeader: isRu ? '### 3. Анализ Первопричин (Протокол 5 Почему / Root Cause)' : '### 3. Root Cause Analysis (5 Whys Protocol)',
        level: 3,
        title: isRu ? 'Анализ Первопричин (Root Cause)' : 'Root Cause Analysis (5 Whys Protocol)',
        cleanTitle: 'root cause',
        lines: isRu
          ? ['Примените цепочку «5 Почему» для перехода от поверхностных симптомов к глубиновым архитектурным и процессным уязвимостям.']
          : ['Execute a 5-Whys diagnostic chain to transition from surface symptoms to deep architectural, policy, or testing deficits.'],
        semanticType: 'protocol',
      });
    }

    if (!hasActionItems) {
      cleanedSections.push({
        rawHeader: isRu ? '### 5. Матрица Предотвращения и Action Items' : '### 5. Preventative Action Items Matrix',
        level: 3,
        title: isRu ? 'Матрица Предотвращения и Action Items' : 'Preventative Action Items Matrix',
        cleanTitle: 'action items',
        lines: isRu
          ? [
              '| Действие / Таск | Ответственный | Приоритет (P0/P1/P2) | Срок |',
              '|---|---|---|---|',
              '| [[action_item_1]] | [[owner_1]] | P0 | [[deadline_1]] |',
            ]
          : [
              '| Action Item | Owner | Priority (P0/P1/P2) | Target Date |',
              '|---|---|---|---|',
              '| [[action_item_1]] | [[owner_1]] | P0 | [[target_date_1]] |',
            ],
        semanticType: 'output_format',
      });
    }
  }

  // Elevate Domain Sections for Coding
  if (isCoding) {
    const hasAudit = cleanedSections.some(s => /аудит|audit|screening|vulnerability|дефект|типобезопасност/i.test(s.cleanTitle));
    const hasDirectives = cleanedSections.some(s => /директив|directive|contract|контракт|оптимизаци|правила рефакторинга/i.test(s.cleanTitle));
    const hasRegression = cleanedSections.some(s => /регресс|regression|test|тест|safeguard/i.test(s.cleanTitle));

    if (!hasAudit) {
      cleanedSections.push({
        rawHeader: isRu ? '### 1. Аудит Кода и Выявление Проблем' : '### 1. Code Audit & Architecture Review',
        level: 3,
        title: isRu ? 'Аудит Кода и Выявление Проблем' : 'Code Audit & Architecture Review',
        cleanTitle: 'code audit',
        lines: isRu
          ? [
              '- **Типобезопасность**: Поиск неявных `any`, небезопасных приведений типов и отсутствующих интерфейсов.',
              '- **Производительность**: Выявление лишних аллокаций памяти, неоптимальных циклов и утечек памяти.',
              '- **Архитектурная Связность**: Извлечение сложной монолитной логики в чистые, тестируемые вспомогательные функции.',
            ]
          : [
              '- **Type Safety**: Locate implicit `any` types, unsafe assertions, or missing contracts.',
              '- **Performance**: Identify redundant re-renders, unindexed queries, or memory leaks.',
              '- **Modularity**: Decouple monolithic structures into pure, easily testable functions.',
            ],
        semanticType: 'protocol',
      });
    }

    if (!hasDirectives) {
      cleanedSections.push({
        rawHeader: isRu ? '### 2. Директивы по Рефакторингу' : '### 2. Refactoring Directives & Contracts',
        level: 3,
        title: isRu ? 'Директивы по Рефакторингу' : 'Refactoring Directives & Contracts',
        cleanTitle: 'refactoring directives',
        lines: isRu
          ? [
              '- Внедрить строгие интерфейсы и дискриминантные объединения (Discriminated Unions).',
              '- Оптимизировать асинхронные вызовы и обработку ошибок через явную иерархию исключений.',
              '- Ограничить вычислительную сложность алгоритмов верхним пределом O(N).',
            ]
          : [
              '- Enforce strict TypeScript interfaces and discriminated unions.',
              '- Optimize asynchronous operations and error boundaries.',
              '- Adhere strictly to SOLID principles and DRY patterns.',
            ],
        semanticType: 'protocol',
      });
    }

    if (!hasRegression) {
      cleanedSections.push({
        rawHeader: isRu ? '### 3. Гарантия Регрессионной Безопасности' : '### 3. Regression Safety & Test Specifications',
        level: 3,
        title: isRu ? 'Гарантия Регрессионной Безопасности' : 'Regression Safety & Test Specifications',
        cleanTitle: 'regression safety',
        lines: isRu
          ? ['Предоставить модуль юнит-тестов (Vitest/Jest), покрывающий базовый сценарий (Happy Path), граничные условия (Edge Cases) и обработку ошибок.']
          : ['Provide a Vitest/Jest unit test suite covering happy path execution, boundary values, and error states.'],
        semanticType: 'protocol',
      });
    }
  }

  // Elevate Domain Sections for Business
  if (isBusiness) {
    const hasPositioning = cleanedSections.some(s => /позиционирован|positioning|icp|клиент/i.test(s.cleanTitle));
    const hasEconomics = cleanedSections.some(s => /экономик|economic|монетизаци|pricing|цен/i.test(s.cleanTitle));
    const hasRoadmap = cleanedSections.some(s => /дорожная карт|roadmap|gtm|план выход/i.test(s.cleanTitle));

    if (!hasPositioning) {
      cleanedSections.push({
        rawHeader: isRu ? '### 1. Позиционирование и Целевой Сегмент' : '### 1. Positioning & ICP Mapping',
        level: 3,
        title: isRu ? 'Позиционирование и Целевой Сегмент' : 'Positioning & ICP Mapping',
        cleanTitle: 'positioning',
        lines: isRu
          ? [
              '- Профиль идеального клиента (ICP) и ключевые точки боли (Pain Points).',
              '- Несимметричные конкурентные преимущества перед существующими игроками.',
            ]
          : [
              '- Ideal Customer Profile (ICP) and visceral pain points.',
              '- Asymmetric competitive advantages over incumbents.',
            ],
        semanticType: 'protocol',
      });
    }

    if (!hasEconomics) {
      cleanedSections.push({
        rawHeader: isRu ? '### 2. Юнит-Экономика и Монетизация' : '### 2. Unit Economics & Monetization',
        level: 3,
        title: isRu ? 'Юнит-Экономика и Монетизация' : 'Unit Economics & Monetization',
        cleanTitle: 'unit economics',
        lines: isRu
          ? [
              '- Модель ценообразования (Packaging & Pricing Tiers).',
              '- Расчет окупаемости CAC Payback Period и LTV:CAC целевых показателей.',
            ]
          : [
              '- Pricing and packaging tier architecture.',
              '- CAC Payback Period and LTV:CAC target models.',
            ],
        semanticType: 'protocol',
      });
    }

    if (!hasRoadmap) {
      cleanedSections.push({
        rawHeader: isRu ? '### 3. План Выхода на Рынок (GTM Roadmap)' : '### 3. Execution & GTM Roadmap',
        level: 3,
        title: isRu ? 'План Выхода на Рынок (GTM Roadmap)' : 'Execution & GTM Roadmap',
        cleanTitle: 'gtm roadmap',
        lines: isRu
          ? [
              '- Фаза 1 (Beachhead): Захват первичного сегмента аудитории.',
              '- Фаза 2 (Expansion): Масштабирование каналов привлечения.',
              '- Фаза 3 (Defensibility): Построение долгосрочных сетевых эффектов.',
            ]
          : [
              '- Phase 1 (Beachhead): Rapid validation in wedge segment.',
              '- Phase 2 (Expansion): Scaling organic and paid acquisition flywheels.',
              '- Phase 3 (Defensibility): Institutional moats and data network effects.',
            ],
        semanticType: 'protocol',
      });
    }
  }

  // Elevate Domain Sections for Copywriting
  if (isCopywriting) {
    const hasHooks = cleanedSections.some(s => /крюч|hook|заголов|headline/i.test(s.cleanTitle));
    const hasArc = cleanedSections.some(s => /арка|arc|pas|aida|убежден/i.test(s.cleanTitle));
    const hasCTA = cleanedSections.some(s => /cta|призыв|call to action/i.test(s.cleanTitle));

    if (!hasHooks) {
      cleanedSections.push({
        rawHeader: isRu ? '### 1. Крючки и Заголовки (Hooks & Headlines)' : '### 1. Hooks & Headlines',
        level: 3,
        title: isRu ? 'Крючки и Заголовки' : 'Hooks & Headlines',
        cleanTitle: 'hooks',
        lines: isRu
          ? ['Сгенерировать 3 варианта хуков (Контринтуитивный, Фактический/Data-Driven, Мост просветления) для максимального вовлечения.']
          : ['Generate 3 hook variations (Contrarian, Data-Driven, Epiphany-Bridge) designed to capture immediate attention.'],
        semanticType: 'protocol',
      });
    }

    if (!hasArc) {
      cleanedSections.push({
        rawHeader: isRu ? '### 2. Арка Убеждения (PAS / AIDA)' : '### 2. Narrative Persuasion Arc (PAS / AIDA)',
        level: 3,
        title: isRu ? 'Арка Убеждения (PAS / AIDA)' : 'Narrative Persuasion Arc (PAS / AIDA)',
        cleanTitle: 'persuasion arc',
        lines: isRu
          ? [
              '- **Боль (Problem)**: Точечная демонстрация боли целевой аудитории.',
              '- **Усиление (Agitation)**: Цена бездействия и сохранения статус-кво.',
              '- **Решение (Solution)**: Логичное представление продукта как единственного выхода.',
            ]
          : [
              '- **Pain Point**: Demonstrate visceral understanding of customer challenge.',
              '- **Agitation**: Quantify the cost of inaction and status quo inertia.',
              '- **Breakthrough**: Present the solution as the logical resolution.',
            ],
        semanticType: 'protocol',
      });
    }

    if (!hasCTA) {
      cleanedSections.push({
        rawHeader: isRu ? '### 3. Призыв к Действию (Call to Action)' : '### 3. Call to Action (CTA)',
        level: 3,
        title: isRu ? 'Призыв к Действию' : 'Call to Action (CTA)',
        cleanTitle: 'cta',
        lines: isRu
          ? ['Однозначный, сфокусированный CTA без размытия внимания.']
          : ['Unambiguous, high-velocity CTA engineered to maximize conversion.'],
        semanticType: 'output_format',
      });
    }
  }

  // Elevate General Domain Protocol
  if (!isRetro && !isCoding && !isBusiness && !isCopywriting) {
    const hasProtocol = cleanedSections.some(s => s.semanticType === 'protocol');
    if (!hasProtocol) {
      cleanedSections.push({
        rawHeader: isRu ? '### 1. Пошаговый Протокол Выполнения' : '### 1. Execution & Reasoning Protocol',
        level: 3,
        title: isRu ? 'Пошаговый Протокол Выполнения' : 'Execution & Reasoning Protocol',
        cleanTitle: 'execution protocol',
        lines: isRu
          ? [
              '1. Проанализировать ключевые вводные параметры и выявить скрытые допущения.',
              '2. Сформировать пошаговый план решения с приоритетом на наиболее результативные шаги.',
              '3. Проверить полученные выводы на соответствие критериям качества и отсутствие ошибок.',
            ]
          : [
              '1. Deconstruct request into functional sub-components.',
              '2. Identify implicit constraints, edge cases, and dependencies.',
              '3. Apply step-by-step reasoning to synthesize optimal deliverable.',
            ],
        semanticType: 'protocol',
      });
    }
  }

  // Elevate Constraints
  const constraintsSec = findCategory('constraints');
  const deepConstraints = isRu
    ? [
        '- Исключить вводную воду, вежливые клише («Конечно, вот ваш ответ») и мета-комментарии.',
        '- Излагать материал кратко, емко и с высокой плотностью смысла.',
        isRetro ? '- ФОКУС strictly на процессах, архитектуре и системных лазейках, а не на персоналиях.' : '',
        isRetro ? '- Каждое рекомендательное действие должно иметь четкий критерий проверки (Definition of Done).' : '',
      ].filter(Boolean)
    : [
        '- Zero conversational fluff or introductory chatter. Begin immediately with substantive content.',
        '- Maintain maximum information density and rigorous technical precision.',
        isRetro ? '- Maintain absolute focus on process, tooling, and architectural flaws rather than personal blame.' : '',
        isRetro ? '- Every corrective action item must feature a verifiable Definition of Done.' : '',
      ].filter(Boolean);

  if (constraintsSec) {
    constraintsSec.lines.push(...deepConstraints);
    constraintsSec.lines = deduplicateBullets(constraintsSec.lines);
  } else {
    cleanedSections.push({
      rawHeader: isRu ? '### Ограничения и Правила' : '### Governance & Negative Constraints',
      level: 3,
      title: isRu ? 'Ограничения и Правила' : 'Governance & Negative Constraints',
      cleanTitle: isRu ? 'ограничения и правила' : 'governance & negative constraints',
      lines: deepConstraints,
      semanticType: 'constraints',
    });
  }

  // Ensure Output Format exists
  if (!hasCategory('output_format')) {
    cleanedSections.push({
      rawHeader: isRu ? '### Формат Вывода' : '### Output Specification',
      level: 3,
      title: isRu ? 'Формат Вывода' : 'Output Specification',
      cleanTitle: isRu ? 'формат вывода' : 'output specification',
      lines: isRu
        ? ['Структурированный Markdown-отчет с резюме, ключевыми выводами и матрицей следующих шагов.']
        : ['Structured Markdown report featuring an Executive Summary, substantive deliverable, and actionable next steps.'],
      semanticType: 'output_format',
    });
  }

  return reconstructPrompt(preamble, deduplicatePromptSections(cleanedSections, isRu));
}

/**
 * Transforms raw user tasks into specialized, standalone domain prompts.
 * Generates domain-specific sections (e.g. Incident Timelines, 5 Whys, Code Audits, GTM Roadmaps, AIDA Copy Arc)
 * completely removing raw meta-text.
 */
export function buildDomainPrompt(
  input: string,
  aggressiveness: 'low' | 'medium' | 'high',
  options?: {
    chainOfThought?: boolean;
    riskAudit?: boolean;
    constraints?: boolean;
    examples?: boolean;
  }
): string {
  // If the input prompt is ALREADY a structured prompt, route to idempotent refinement!
  if (isPromptAlreadyOptimized(input)) {
    return refineOptimizedPrompt(input, aggressiveness, options);
  }
  const cleanGoal = extractTaskFromGeneratedPrompt(input);
  const isRu = isRussianText(cleanGoal.length > 3 ? cleanGoal : input);

  // Detect domain
  const domain = detectPromptDomain(input);
  const isRetro = domain === 'retro';
  const isCoding = domain === 'coding';
  const isBusiness = domain === 'business';
  const isCopywriting = domain === 'copywriting';

  // 1. RETROSPECTIVE & INCIDENT POST-MORTEM DOMAIN
  if (isRetro) {
    if (isRu) {
      if (aggressiveness === 'low') {
        return `### Роль и Задачи\nВы выступаете в роли опытного Agile Coach и Фасилитатора ретроспектив.\n\n### Контекст и Постановка Задачи\nПровести системный разбор и ретроспективу инцидента/спринта [[название_события]] для выявления узких мест и планирования улучшений.\n\n### Правила Проведения\n- Соблюдать принцип культуры без поиска виновных (Blameless).\n- Фиксировать ключевые выводы и согласованные Action Items.`;
      }
      if (aggressiveness === 'medium') {
        return `### Роль и Принципы (Blameless Culture)\nВы выступаете в роли Site Reliability Lead и Фасилитатора, специализирующегося на проведении безнаказанных (Blameless) ретроспектив и разборе сбоев.\n\n### Контекст и Область Применения\nПровести глубокую ретроспективу инцидента [[название_инцидента]], восстановить хронологию событий и сформировать план предотвращения повторных аварий.\n\n### 1. Восстановление Хронологии (Timeline)\n- Время обнаружения (Detection) и локализации сбоя.\n- Временные меры по стабилизации (Mitigation) и финальное решение (Resolution).\n\n### 2. Анализ Первопричин (Root Cause)\nПрименить метод «5 Почему» для поиска системных уязвимостей в процессах и архитектуре.\n\n### 3. Матрица Действий (Action Items)\n| Действие | Ответственный | Приоритет | Срок |\n|---|---|---|---|\n| [[action_item_1]] | [[owner_1]] | P0 | [[deadline_1]] |`;
      }
      // DEEP
      return `### Роль и Принципы (Blameless Culture)
Вы выступаете в роли опытного Site Reliability Lead и Фасилитатора, специализирующегося на проведении системных ретроспектив инцидентов и разборе сбоев в культуре без поиска виновных (Blameless Culture).

### Контекст и Область Применения
Провести комплексную ретроспективу инцидента [[название_инцидента]], полностью восстановить хронологию событий, установить инженерные и процессные первопричины (Root Causes), оценить объём ущерба и сформировать план предотвращения повторных аварий.

### 1. Контекст и Масштаб Инцидента
- Название / ID Инцидента: [[id_инцидента]]
- Затронутые сервисы / Системы: [[затронутые_сервисы]]
- Уровень критичности (Severity): [[уровень_severity]]
- Длительность простоя (Downtime): [[длительность_мин]] мин

### 2. Реконструкция Хронологии (Timeline)
- **Обнаружение (Detection)**: Время и канал первого сигнала (мониторинг, саппорт, пользователи).
- **Локализация и Триатлон (Triage)**: Определение эпицентра сбоя.
- **Стабилизация (Mitigation)**: Временные меры для восстановления работоспособности.
- **Полное Решение (Resolution)**: Окончательное устранение дефекта.

### 3. Анализ Первопричин (Протокол 5 Почему / Root Cause)
Примените цепочку «5 Почему» для перехода от поверхностных симптомов (человеческий фактор, ошибка конфигурации) к глубиновым архитектурным и процессным уязвимостям.

### 4. Оценка Ущерба и Влияния на Бизнес
- Потерянный доход / Финансовый ущерб
- Нарушение SLA / SLO договоренностей
- Репутационные риски и жалобы пользователей

### 5. Матрица Предотвращения и Action Items
| Действие / Таск | Ответственный | Приоритет (P0/P1/P2) | Срок |
|---|---|---|---|
| [[action_item_1]] | [[owner_1]] | P0 | [[deadline_1]] |

### 6. Ограничения и Правила
- ФОКУС strictly на процессах, архитектуре и системных лазейках, а не на персоналиях.
- Каждое рекомендательное действие должно иметь четкий критерий проверки (Definition of Done).
- Исключить вводную воду, вежливые клише («Конечно, вот ваш ответ») и мета-комментарии.
- Излагать материал кратко, емко и с высокой плотностью смысла.`;
    } else {
      // English
      if (aggressiveness === 'low') {
        return `### Role & Expertise\nYou are acting as an experienced Agile Facilitator leading an incident retrospective.\n\n### Context & Scope\nConduct a systematic retrospective for [[event_name]] to identify process bottlenecks and outline corrective actions.\n\n### Execution Rules\n- Maintain a blameless culture focusing on systems rather than individuals.\n- Deliver concise, actionable takeaways.`;
      }
      if (aggressiveness === 'medium') {
        return `### Role & Blameless Principles\nYou are acting as a Site Reliability Lead specializing in blameless incident retrospectives.\n\n### Context & Scope\nFacilitate a thorough retrospective for [[incident_title]] to reconstruct timeline events, analyze root causes, and establish preventive measures.\n\n### 1. Timeline Reconstruction\n- Detection time, triage, mitigation, and permanent resolution milestones.\n\n### 2. Root Cause Analysis (5 Whys Protocol)\nExecute 5 Whys chain to transition from symptoms to underlying process and architectural flaws.\n\n### 3. Action Items Matrix\n| Action Item | Owner | Priority (P0/P1/P2) | Deadline |\n|---|---|---|---|\n| [[action_item_1]] | [[owner_1]] | P0 | [[deadline_1]] |`;
      }
      // DEEP
      return `### Role & Blameless Principles
You are acting as a Senior Site Reliability Engineer and Systems Auditor specializing in blameless post-mortems and incident retrospectives.

### Context & Scope
Facilitate a comprehensive, blameless incident retrospective for [[incident_title]] to reconstruct timeline events, isolate root cause vulnerabilities, evaluate business impact, and establish preventative safeguards.

### 1. Incident Framing & Scope
- Incident Title / ID: [[incident_id]]
- Affected Systems & Services: [[affected_services]]
- Severity Rating: [[severity_rating]]
- Total Downtime: [[downtime_minutes]] minutes

### 2. Timeline Reconstruction
- **Detection Phase**: Initial trigger, monitoring alert, or user escalation.
- **Triage Phase**: Failure isolation and diagnosis.
- **Mitigation Phase**: Workaround applied to restore service.
- **Resolution Phase**: Permanent fix deployment.

### 3. Root Cause Analysis (5 Whys Protocol)
Execute a 5-Whys diagnostic chain to transition from surface symptoms (human mistake, config error) to deep architectural, policy, or testing deficits.

### 4. Impact & Loss Assessment
- Quantified financial loss & revenue impact.
- SLA/SLO breach thresholds.
- Customer trust and support ticket volume delta.

### 5. Preventative Action Items Matrix
| Action Item | Owner | Priority (P0/P1/P2) | Target Date |
|---|---|---|---|
| [[action_item_1]] | [[owner_1]] | P0 | [[target_date_1]] |

### 6. Governance & Negative Constraints
- Maintain absolute focus on process, tooling, and architectural flaws rather than personal blame.
- Every corrective action item must feature a verifiable Definition of Done.
- Zero conversational fluff or introductory chatter. Begin immediately with substantive content.
- Maintain maximum information density and rigorous technical precision.`;
    }
  }

  // 2. CODE REFACTORING & SOFTWARE AUDIT DOMAIN
  if (isCoding) {
    if (isRu) {
      if (aggressiveness === 'low') {
        return `### Роль и Задачи\nВы выступаете в роли Senior Software Engineer.\n\n### Область Рефакторинга\nПровести рефакторинг представленного кода <code_snippet>[[код]]</code_snippet> для повышения читаемости, устранения ошибок и улучшения архитектуры.\n\n### Правила\n- Предоставить чистый, рабочеспособный код.\n- Добавить краткие пояснения сделанных изменений.`;
      }
      if (aggressiveness === 'medium') {
        return `### Роль и Полномочия\nВы выступаете в роли Principal Software Architect, специализирующегося на чистом коде, типобезопасности и оптимизации производительности.\n\n### Область Рефакторинга\nПровести рефакторинг кода <code_snippet>[[код]]</code_snippet> для улучшения типобезопасности, разделения ответственности и оптимизации алгоритмической сложности.\n\n### 1. Направления Оптимизации\n- Устранить \`any\` типы и заменить их на строгие интерфейсы.\n- Извлечь сложные монолитные блоки в вспомогательные функции.\n- Оптимизировать время выполнения и аллокации памяти.\n\n### 2. Формат Вывода\nРефакторенный код и краткая справка по изменениям.`;
      }
      // DEEP
      return `### Роль и Полномочия
Вы выступаете в роли Главного Архитектора ПО (Principal Software Architect), специализирующегося на чистой архитектуре, типобезопасности, оптимизации производительности и надёжности сложных распределённых систем.

### Область Рефакторинга
Провести глубокий аудит и рефакторинг представленного фрагмента кода <code_snippet>[[фрагмент_кода]]</code_snippet> для устранения architectural smells, повышения читаемости, обеспечения 100% типобезопасности и оптимизации runtime-производительности.

### 1. Аудит Кода и Выявление Проблем
- **Типобезопасность**: Поиск неявных \`any\`, небезопасных приведений типов и отсутствующих интерфейсов.
- **Производительность**: Выявление лишних аллокаций памяти, неоптимальных циклов и утечек памяти.
- **Архитектурная Связность**: Извлечение сложной монолитной логики в чистые, тестируемые вспомогательные функции.

### 2. Директивы по Рефакторингу
- Внедрить строгие интерфейсы и дискриминантные объединения (Discriminated Unions).
- Оптимизировать асинхронные вызовы и обработку ошибок через явную иерархию исключений.
- Ограничить вычислительную сложность алгоритмов верхним пределом O(N).

### 3. Гарантия Регрессионной Безопасности
Предоставить модуль юнит-тестов (Vitest/Jest), покрывающий базовый сценарий (Happy Path), граничные условия (Edge Cases) и обработку ошибок.

### 4. Формат Вывода
- Четкий сфокусированный рефакторенный код в блоке кода.
- Краткие архитектурные комментарии с пояснением изменений и дельты сложности.

### 5. Ограничения и Правила
- Исключить вводную воду, вежливые клише («Конечно, вот ваш ответ») и мета-комментарии.
- Излагать материал кратко, емко и с высокой плотностью смысла.`;
    } else {
      if (aggressiveness === 'low') {
        return `### Role & Expertise\nYou are acting as a Senior Software Engineer.\n\n### Refactoring Scope\nRefactor the provided code snippet <code_snippet>[[code_snippet]]</code_snippet> to improve code readability, fix bugs, and enhance structure.\n\n### Execution Rules\n- Output clean, working code.\n- Provide a brief summary of refactored sections.`;
      }
      if (aggressiveness === 'medium') {
        return `### Role & Authority\nYou are acting as a Principal Software Architect specializing in clean code and type safety.\n\n### Refactoring Scope\nAudit and refactor the code block <code_snippet>[[code_snippet]]</code_snippet> to enforce strict typing, modularity, and algorithmic efficiency.\n\n### 1. Refactoring Directives\n- Replace untyped constructs with explicit interface contracts.\n- Extract monolithic logic into pure helper functions.\n- Reduce time and space complexity.\n\n### 2. Output Specification\nRefactored production-ready code accompanied by concise architectural notes.`;
      }
      // DEEP
      return `### Role & Authority
You are acting as a Principal Software Architect specializing in clean code, type safety, low-latency performance, and resilient systems design.

### Refactoring Scope
Audit and refactor the provided code block <code_snippet>[[code_snippet]]</code_snippet> to eliminate architectural design smells, ensure strict type safety, optimize runtime performance, and enhance long-term maintainability.

### 1. Code Audit & Vulnerability Screening
- **Type Safety**: Locate implicit \`any\` types, unsafe assertions, or missing contracts.
- **Performance**: Identify redundant re-renders, unindexed queries, or memory leaks.
- **Modularity**: Decouple monolithic structures into pure, easily testable functions.

### 2. Refactoring Directives
- Enforce strict TypeScript interfaces and discriminated unions.
- Optimize asynchronous operations and error boundaries.
- Adhere strictly to SOLID principles and DRY patterns.

### 3. Regression Safeguard & Testing
Provide a Vitest/Jest unit test suite covering happy path execution, boundary values, and error states.

### 4. Output Format
- Refactored production-ready code block.
- Concise architectural commentary detailing key trade-offs and complexity improvements.

### 5. Governance & Negative Constraints
- Zero conversational fluff or introductory chatter. Begin immediately with substantive content.
- Maintain maximum information density and rigorous technical precision.`;
    }
  }

  // 3. BUSINESS STRATEGY & GTM DOMAIN
  if (isBusiness) {
    if (isRu) {
      if (aggressiveness === 'low') {
        return `### Роль и Задачи\nВы выступаете в роли Бизнес-Консультанта.\n\n### Стратегический Контекст\nРазработать стратегический план по теме [[тема_бизнеса]] с акцентом на рост продаж и оптимизацию ресурсов.\n\n### Правила Выполнения\n- Фокус на росте продаж и практической отдаче.\n- Излагать тезисно и без абстрактных рассуждений.`;
      }
      if (aggressiveness === 'medium') {
        return `### Роль и Экспертиза\nВы выступаете в роли Директора по Стратегии (CSO) и бизнес-консультанта.\n\n### Стратегический Контекст\nСформировать стратегию вывода на рынок [[название_продукта]] и оптимизации ценообразования.\n\n### 1. Конкурентный Анализ\nОпределить ICP и асимметричные преимущества перед конкурентами.\n\n### 2. Юнит-Экономика\nРассчитать показатели LTV, CAC Payback и структуру ценообразования.\n\n### 3. Дорожная Карта\nПошаговый план выхода на рынок по фазам.`;
      }
      // DEEP
      return `### Роль и Экспертиза
Вы выступаете в роли Директора по Стратегии (CSO) и бизнес-консультанта, специализирующегося на юнит-экономике, выходе на рынок (GTM), монетизации и конкурентных преимуществах.

### Стратегический Контекст
Разработать исчерпывающую стратегию выхода на рынок и роста для продукта [[название_продукта]] в целевом сегменте [[целевой_рынок]].

### 1. Позиционирование и Целевой Сегмент
- Профиль идеального клиента (ICP) и ключевые точки боли (Pain Points).
- Несимметричные конкурентные преимущества перед существующими игроками.

### 2. Юнит-Экономика и Монетизация
- Модель ценообразования (Packaging & Pricing Tiers).
- Расчет окупаемости CAC Payback Period и LTV:CAC целевых показателей.

### 3. План Выхода на Рынок (GTM Roadmap)
- Фаза 1 (Beachhead): Захват первичного сегмента аудитории.
- Фаза 2 (Expansion): Масштабирование каналов привлечения.
- Фаза 3 (Defensibility): Построение долгосрочных сетевых эффектов.

### 4. Формат Вывода
Структурированный Markdown-документ с резюме (Executive Summary) и таблицей ключевых KPI.`;
    } else {
      if (aggressiveness === 'low') {
        return `### Role & Expertise\nYou are acting as a Business Strategy Consultant.\n\n### Strategic Scope\nFormulate a strategic initiative regarding [[business_topic]] focused on ROI and operational efficiency.\n\n### Execution Rules\n- Deliver clear ROI-focused strategic initiatives.\n- Maintain operational pragmatism without excessive buzzwords.`;
      }
      if (aggressiveness === 'medium') {
        return `### Role & Authority\nYou are acting as a Chief Strategy Officer specializing in go-to-market execution.\n\n### Strategic Scope\nDevelop a GTM strategy and pricing model for [[product_name]].\n\n### 1. Target Positioning\nIdentify ICP pain points and competitive advantages.\n\n### 2. Unit Economics\nDetail CAC payback, LTV targets, and pricing tiers.\n\n### 3. Execution Roadmap\nPhased rollout from beachhead launch to expansion.`;
      }
      // DEEP
      return `### Role & Authority
You are acting as a Chief Strategy Officer and Enterprise Advisor specializing in unit economics, go-to-market execution, and defensible moats.

### Strategic Scope
Develop a comprehensive go-to-market and growth strategy for [[product_name]] in target market [[target_market]].

### 1. Positioning & ICP Mapping
- Ideal Customer Profile (ICP) and visceral pain points.
- Asymmetric competitive advantages over incumbents.

### 2. Unit Economics & Monetization
- Pricing and packaging tier architecture.
- CAC payback period and LTV:CAC benchmarking targets.

### 3. Go-To-Market Execution Roadmap
- Phase 1 (Beachhead): Capturing initial high-intent segment.
- Phase 2 (Expansion): Scaling customer acquisition channels.
- Phase 3 (Defensibility): Building long-term network effects.

### 4. Output Specification
Structured executive report containing an Executive Summary and quantitative KPI matrix.`;
    }
  }

  // 4. COPYWRITING DOMAIN
  if (isCopywriting) {
    if (isRu) {
      if (aggressiveness === 'low') {
        return `### Роль и Задачи\nВы выступаете в роли профессионального Копирайтера.\n\n### Творческий Брифинг\nНаписать высококонверсионный текст [[тип_текста]] для аудитории [[целевая_аудитория]].\n\n### Правила\n- Без воды и клише.\n- Четкий призыв к действию.`;
      }
      if (aggressiveness === 'medium') {
        return `### Роль и Стиль\nВы выступаете в роли Элитного Копирайтера, специализирующегося на высокой конверсии и сжатом стиле.\n\n### Творческий Брифинг\nСоздать продающий текст [[тип_текста]] для [[целевая_аудитория]].\n\n### 1. Структура Паттерна (PAS)\n- Боль (Pain) -> Усиление (Agitation) -> Решение (Solution).\n\n### 2. Призыв к Действию\nЧеткий, понятный CTA с минимальным трением.`;
      }
      // DEEP
      return `### Роль и Стиль
Вы выступаете в роли Элитного Копирайтера и Главного Редактора, специализирующегося на высокой конверсии, ясности изложения и убедительном сторителлинге.

### Творческий Брифинг
Создать высококонверсионный текст [[тип_материала]] для целевой аудитории [[целевая_аудитория]] с фокусировкой на решении проблемы [[проблема_клиента]].

### 1. Заголовок и Hook
Сформировать 3 варианта цепляющих заголовков (Contrarian, Data-Driven, Story-Based), привлекающих внимание за первые 3 секунды.

### 2. Продающая Структура (AIDA / PAS)
- **Проблема (Pain)**: Четкая демонстрация понимания боли клиента.
- **Усиление (Agitation)**: Показ стоимости бездействия и сохранения статуса-кво.
- **Решение (Solution)**: Представление продукта [[название_продукта]] как единственного логичного шага.

### 3. Призыв к Действию (Call-to-Action)
Четкий, понятный и безусловный CTA с устранением трения.

### 4. Ограничения по Стилю
Без корпоративных клише, без канцелярита и без вводной воды. Максимальная плотность смысла.`;
    } else {
      if (aggressiveness === 'low') {
        return `### Role & Expertise\nYou are acting as a Professional Copywriter.\n\n### Creative Scope\nDraft persuasive copy for [[content_type]] targeting [[target_audience]].\n\n### Rules\n- Zero fluff or buzzwords.\n- Clear, single-focus Call to Action.`;
      }
      if (aggressiveness === 'medium') {
        return `### Role & Authority\nYou are acting as an Elite Direct-Response Copywriter.\n\n### Creative Scope\nWrite high-converting copy for [[content_type]] targeting [[target_audience]].\n\n### 1. Copy Structure (PAS Arc)\n- Pain -> Agitate -> Solution.\n\n### 2. Call to Action\nUnambiguous, friction-free CTA.`;
      }
      // DEEP
      return `### Role & Authority
You are acting as an Elite Direct-Response Copywriter and Marketing Communications Director.

### Creative Scope
Craft high-converting, persuasive narrative copy for [[content_type]] targeting [[target_audience]] that solves [[customer_pain]].

### 1. Hooks & Headlines
Generate 3 hook variations (Contrarian, Data-Driven, Epiphany-Bridge) designed to capture immediate attention.

### 2. Narrative Persuasion Arc (PAS / AIDA)
- **Pain Point**: Demonstrate visceral understanding of customer challenge.
- **Agitation**: Quantify the cost of inaction and status quo inertia.
- **Breakthrough**: Present [[product_name]] as the logical resolution.

### 3. Call to Action (CTA)
Unambiguous, singleless CTA engineered to maximize conversion velocity.

### 4. Editing Constraints
No corporate jargon, zero filler, maximum information density.`;
    }
  }

  // 5. GENERAL FALLBACK DOMAIN
  const mandate = rephraseGoalToMandate(cleanGoal, isRu);

  if (isRu) {
    if (aggressiveness === 'low') {
      return `### Роль и Полномочия\nВы выступаете в роли профильного специалиста.\n\n### Контекст и Постановка Задачи\n${mandate}\n\n### Правила Выполнения\n- Излагать суть без вводных фраз и клише.\n- Структурировать вывод в виде четкого списка.`;
    }
    if (aggressiveness === 'medium') {
      return `### Роль и Полномочия\nВы выступаете в роли эксперта и аналитика в соответствующей предметной области.\n\n### Контекст и Постановка Задачи\n${mandate}\n\n### 1. Протокол Выполнения\n1. Проанализировать вводные данные и выделить ключевые факторы.\n2. Сформировать пошаговое решение с практическими примерами.\n3. Проверить результат на полноту и точность.\n\n### 2. Требования к Формату\nЛаконичный Markdown-формат с четкими заголовками.`;
    }
    // DEEP
    return `### Роль и Полномочия
Вы выступаете в роли Ведущего Эксперта и Стратега в соответствующей предметной области.

### Контекст и Постановка Задачи
${mandate}

### 1. Пошаговый Протокол Выполнения
1. Проанализировать ключевые вводные параметры и выявить скрытые допущения.
2. Сформировать пошаговый план решения с приоритетом на наиболее результативные шаги.
3. Проверить полученные выводы на соответствие критериям качества и отсутствие ошибок.

### 2. Качественные Ограничения
- Исключить вводную воду, вежливые клише («Конечно, вот ваш ответ») и мета-комментарии.
- Излагать материал кратко, емко и с высокой плотностью смысла.

### 3. Формат Вывода
Структурированный Markdown-отчет с резюме, ключевыми выводами и матрицей следующих шагов.`;
  } else {
    // English General
    if (aggressiveness === 'low') {
      return `### Role & Expertise\nYou are acting as a domain specialist.\n\n### Context & Scope\n${mandate}\n\n### Rules\n- Provide direct output without conversational preambles.\n- Use concise Markdown formatting.`;
    }
    if (aggressiveness === 'medium') {
      return `### Role & Authority\nYou are acting as an expert analyst and strategist.\n\n### Context & Scope\n${mandate}\n\n### 1. Execution Protocol\n1. Deconstruct requirements and analyze core parameters.\n2. Apply step-by-step domain logic to deliver solution.\n3. Verify output against quality standards.\n\n### 2. Output Format\nClean Markdown layout with clear section headers.`;
    }
    // DEEP
    return `### Role & Authority
You are acting as a Principal Domain Specialist and Enterprise Advisor.

### Context & Scope
${mandate}

### 1. Execution & Reasoning Protocol
1. Deconstruct request into functional sub-components.
2. Identify implicit constraints, edge cases, and dependencies.
3. Apply step-by-step reasoning to synthesize optimal deliverable.

### 2. Quality Constraints & Rules
- Zero conversational fluff or introductory chatter.
- Support statements with concrete rationale or metrics.

### 3. Output Specification
Structured Markdown report featuring an Executive Summary, substantive deliverable, and actionable next steps.`;
  }
}

/**
 * Deep Prompt Optimizer:
 * 1. Completely purges meta-request noise (English/Russian).
 * 2. Replaces raw meta-request with a complete standalone domain prompt architecture.
 * 3. Applies user options (clarity, constraints, chainOfThought, etc.) and aggressiveness levels (Low / Medium / High).
 * 4. Idempotent: Never duplicates sections, repeated strings, or variables on multiple executions.
 */
export function optimizePrompt(
  inputPrompt: string,
  options: {
    clarity: boolean;
    specificity: boolean;
    structure: boolean;
    constraints: boolean;
    examples: boolean;
    chainOfThought: boolean;
    riskAudit: boolean;
    aggressiveness: 'low' | 'medium' | 'high';
  }
): string {
  if (!inputPrompt.trim()) return '';

  // If already structured/optimized, use idempotent refinement without blind appending
  if (isPromptAlreadyOptimized(inputPrompt)) {
    return refineOptimizedPrompt(inputPrompt, options.aggressiveness, options);
  }

  // Transform raw prompt into clean standalone domain architecture
  const basePrompt = buildDomainPrompt(inputPrompt, options.aggressiveness, options);

  // Extract variables if present in input and not yet in basePrompt
  const detectedVars = extractVariables(inputPrompt);
  const hasVarSection = /###\s+(?:Input Variables|Входные переменные|Variables)/i.test(basePrompt);
  if (detectedVars.length > 0 && !hasVarSection) {
    const isRu = isRussianText(inputPrompt);
    const uniqueVars = Array.from(new Set(detectedVars));
    const header = isRu ? '### Входные Переменные' : '### Input Variables';
    const varSection = `\n\n${header}\n${uniqueVars.map(v => `- [[${v}]]: Parameter value for ${v}`).join('\n')}`;
    return basePrompt + varSection;
  }

  return basePrompt;
}

export function simplifyPrompt(input: string, mode: 'light' | 'balanced' | 'aggressive'): string {
  if (!input.trim()) return '';

  const clean = extractCoreGoalAndCleanMeta(input);

  const fillerRegexes = [
    /\b(please|kindly|could you please|would you please|can you please|пожалуйста)\b/gi,
    /\b(I would like you to|I want you to|Your job is to|Your task is to)\b/gi,
    /\b(It is important to remember that|Make sure to|Be sure to)\b/gi,
    /\b(In conclusion|To summarize|As an AI|In summary)\b/gi,
  ];

  if (mode === 'light') {
    let text = clean;
    fillerRegexes.slice(0, 2).forEach((rx) => { text = text.replace(rx, ''); });
    return text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n\s*\n/g, '\n\n').trim();
  }

  if (mode === 'balanced') {
    let text = clean;
    fillerRegexes.forEach((rx) => { text = text.replace(rx, ''); });
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');
  }

  // Aggressive
  const lines = clean
    .replace(/[.?!]\s+/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 4);

  const keyDirectives = lines.map((l) => {
    let textLine = l;
    fillerRegexes.forEach((rx) => { textLine = textLine.replace(rx, ''); });
    textLine = textLine.replace(/^[-*•\d.]+\s*/, '').trim();
    if (textLine.length > 0) {
      return `- ${textLine.charAt(0).toUpperCase() + textLine.slice(1)}`;
    }
    return '';
  }).filter(Boolean);

  return `### Operational Directives:\n${keyDirectives.join('\n')}\n\nFormat: Bulleted, high-density, zero filler.`;
}

export function translatePrompt(input: string, targetLanguage: string): string {
  if (!input.trim()) return '';

  const varMap = new Map<string, string>();
  let tokenCounter = 0;

  const sanitized = input.replace(/(\[\[.*?\]\]|\{\{.*?\}\})/g, (match) => {
    const token = `__VAR_TOKEN_${tokenCounter++}__`;
    varMap.set(token, match);
    return token;
  });

  const translations: Record<string, Record<string, string>> = {
    spanish: {
      '### Role & Context': '### Rol y Contexto',
      '### Role & Authority': '### Rol y Autoridad',
      '### Primary Directive': '### Directiva Principal',
      '### Core Operational Directive': '### Directiva Operativa Principal',
      '### Constraints': '### Restricciones y Reglas',
      '### Output Format': '### Formato de Salida',
      'You are': 'Actúa como',
    },
    french: {
      '### Role & Context': '### Rôle et Contexte',
      '### Role & Authority': '### Rôle et Autorité',
      '### Primary Directive': '### Directive Principale',
      '### Core Operational Directive': '### Directive Opérationnelle Principale',
      '### Constraints': '### Contraintes et Règles',
      '### Output Format': '### Format de Sortie',
      'You are': 'Vous agissez en tant que',
    },
    german: {
      '### Role & Context': '### Rolle & Kontext',
      '### Role & Authority': '### Rolle & Autorität',
      '### Primary Directive': '### Hauptanweisung',
      '### Core Operational Directive': '### Hauptanweisung',
      '### Constraints': '### Einschränkungen & Regeln',
      '### Output Format': '### Ausgabeformat',
    },
    russian: {
      '### Role & Context': '### Роль и контекст',
      '### Role & Authority': '### Роль и полномочия',
      '### Primary Directive': '### Основная задача',
      '### Core Operational Directive': '### Операционная цель',
      '### Constraints': '### Ограничения и правила',
      '### Output Format': '### Формат вывода',
      'You are': 'Вы выступаете в роли',
    },
    chinese: {
      '### Role & Context': '### 角色与背景',
      '### Primary Directive': '### 核心指令',
      '### Core Operational Directive': '### 核心指令',
      '### Output Format': '### 输出格式',
    },
    japanese: {
      '### Role & Context': '### 役割とコンテキスト',
      '### Primary Directive': '### 主な指示',
      '### Core Operational Directive': '### 主な指示',
      '### Output Format': '### 出力形式',
    },
  };

  const langKey = targetLanguage.toLowerCase();
  const dict = translations[langKey] || translations['spanish'];

  let translated = sanitized;
  Object.entries(dict).forEach(([source, target]) => {
    translated = translated.split(source).join(target);
  });

  varMap.forEach((origVal, token) => {
    translated = translated.split(token).join(origVal);
  });

  return translated;
}

/**
 * Model Adapter: Purges meta-request noise and restructures the operational domain core
 * according to the thinking & execution style of each major LLM family.
 * Idempotent: Does not double-wrap or duplicate sections on multiple executions.
 */
export function adaptPromptForModel(input: string, model: 'claude' | 'openai' | 'gemini' | 'grok' | 'llama'): string {
  if (!input.trim()) return '';

  // 1. Check if already adapted for this exact model (idempotent!)
  if (model === 'claude' && input.includes('<system_instructions>') && input.includes('<operational_prompt>')) {
    return input;
  }
  if (model === 'openai' && input.includes('[SYSTEM DIRECTIVE]') && input.includes('[OPERATIONAL PROMPT]')) {
    return input;
  }
  if (model === 'gemini' && input.includes('### System Instructions:') && input.includes('### Operational Prompt:')) {
    return input;
  }
  if (model === 'grok' && input.includes('### Mode: Direct & High-Velocity Execution') && input.includes('### Operational Prompt:')) {
    return input;
  }
  if (model === 'llama' && input.includes('<|start_header_id|>system<|end_header_id|>')) {
    return input;
  }

  // 2. If input was adapted for a different model, extract the core operational prompt cleanly
  let operationalCore = input;
  const claudeMatch = input.match(/<operational_prompt>([\s\S]*?)<\/operational_prompt>/i);
  if (claudeMatch) {
    operationalCore = claudeMatch[1].trim();
  }
  const openaiMatch = input.match(/\[OPERATIONAL PROMPT\]([\s\S]*?)(?:\[EXECUTION PROTOCOL\]|\[NEGATIVE CONSTRAINTS\]|$)/i);
  if (openaiMatch) {
    operationalCore = openaiMatch[1].trim();
  }
  const geminiMatch = input.match(/### Operational Prompt:([\s\S]*?)(?:### Step-by-Step Reasoning Protocol:|$)/i);
  if (geminiMatch) {
    operationalCore = geminiMatch[1].trim();
  }
  const grokMatch = input.match(/### Operational Prompt:([\s\S]*?)(?:### Execution Rules:|$)/i);
  if (grokMatch) {
    operationalCore = grokMatch[1].trim();
  }
  const llamaMatch = input.match(/<\|start_header_id\|>user<\|end_header_id\|>\s*([\s\S]*?)\s*<\|eot_id\|>/i);
  if (llamaMatch) {
    operationalCore = llamaMatch[1].trim();
  }

  // 3. Obtain domain prompt (refine idempotently if already structured, or build new domain prompt if raw)
  let domainPrompt = operationalCore;
  if (!isPromptAlreadyOptimized(operationalCore)) {
    domainPrompt = buildDomainPrompt(operationalCore, 'medium');
  } else {
    domainPrompt = refineOptimizedPrompt(operationalCore, 'medium');
  }

  switch (model) {
    case 'claude':
      return `<system_instructions>\nAdhere strictly to XML tag hierarchies, high technical precision, and zero conversational fluff.\n</system_instructions>\n\n<operational_prompt>\n${domainPrompt}\n</operational_prompt>\n\n<thinking_process>\nBefore producing final output:\n1. Deconstruct the directive into atomic functional requirements.\n2. Analyze potential edge cases and negative constraints.\n3. Formulate a structured draft and verify against rules.\n</thinking_process>\n\n<negative_constraints>\n- Do NOT include conversational filler ("Certainly", "Here is your response").\n- Do NOT extrapolate beyond verified context or make uncited claims.\n- Maintain strict compliance with requested output schemas.\n</negative_constraints>`;

    case 'openai':
      return `[SYSTEM DIRECTIVE]\nYou are a precise, compliant reasoning engine. Follow all operational directives with 100% adherence.\n\n[OPERATIONAL PROMPT]\n${domainPrompt}\n\n[EXECUTION PROTOCOL]\n1. Analyze input parameters and core directives.\n2. Apply step-by-step domain logic.\n3. Validate output against negative constraints before finalizing.\n\n[NEGATIVE CONSTRAINTS]\n- Zero fluff or preamble. Begin immediately with substantive content.\n- Strictly enforce accuracy and requested schema structure.`;

    case 'gemini':
      return `### System Instructions:\nAdhere strictly to factual grounding, verify calculations, and maintain absolute internal consistency.\n\n### Operational Prompt:\n${domainPrompt}\n\n### Step-by-Step Reasoning Protocol:\n1. Verify inputs against domain knowledge before drawing conclusions.\n2. Execute step-by-step logical calculation or derivation.\n3. State underlying assumptions explicitly if context is missing.`;

    case 'grok':
      return `### Mode: Direct & High-Velocity Execution\nStrip away all PR hedging, bureaucratic sugarcoating, and robotic corporate filler.\n\n### Operational Prompt:\n${domainPrompt}\n\n### Execution Rules:\n- Be relentlessly direct, intellectually honest, and sharp.\n- Deliver maximum information density in minimal tokens.`;

    case 'llama':
      return `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\nExecute directives with high precision and zero conversational preamble.<|eot_id|>\n<|start_header_id|>user<|end_header_id|>\n${domainPrompt}<|eot_id|>\n<|start_header_id|>assistant<|end_header_id|>`;

    default:
      return domainPrompt;
  }
}

export function generatePromptFromParams(params: GeneratePromptParams): string {
  const { domain, task, technique, tone, detailLevel, targetModel } = params;

  let aggressiveness: 'low' | 'medium' | 'high' = 'medium';
  if (detailLevel === 'minimalist') aggressiveness = 'low';
  if (detailLevel === 'exhaustive') aggressiveness = 'high';

  const basePrompt = buildDomainPrompt(task, aggressiveness);

  if (targetModel.includes('Claude')) {
    return adaptPromptForModel(basePrompt, 'claude');
  } else if (targetModel.includes('GPT')) {
    return adaptPromptForModel(basePrompt, 'openai');
  } else if (targetModel.includes('Grok')) {
    return adaptPromptForModel(basePrompt, 'grok');
  } else if (targetModel.includes('Gemini')) {
    return adaptPromptForModel(basePrompt, 'gemini');
  }

  return basePrompt;
}

export function buildPromptFromDescription(description: string, complexity: 'basic' | 'intermediate' | 'expert'): string {
  if (!description.trim()) return '';

  const cleanDesc = extractCoreGoalAndCleanMeta(description);
  const isRu = isRussianText(description);
  const mandate = rephraseGoalToMandate(cleanDesc, isRu);

  if (complexity === 'basic') {
    return `### Role & Expertise\nYou are a domain specialist.\n\n### Context & Scope\n${mandate}\n\n### Key Instructions:\n1. Deliver a clear, direct answer addressing the request.\n2. Present solution in bullet points or easy-to-read sections.\n3. Keep tone helpful, concise, and professional.`;
  }

  if (complexity === 'intermediate') {
    return `### Role & Authority\nYou are an experienced domain authority with comprehensive expertise in this subject matter.\n\n### Context & Scope\n${mandate}\n\n### Execution Guidelines:\n- Step 1: Clarify core mechanism or problem statement.\n- Step 2: Provide complete, actionable deliverable.\n- Step 3: Highlight caveats, edge cases, or trade-offs.\n\n### Constraints:\n- Avoid buzzwords, fluff, and unnecessary preambles.\n- Structure with clear Markdown headers and bullet lists.`;
  }

  // Expert
  return `<system_role>\nYou are an elite principal engineer and strategist with deep specialized mastery in executing complex deliverables.\n</system_role>\n\n<context_and_scope>\n${mandate}\n</context_and_scope>\n\n<thinking_process>\n1. Deconstruct objective into core functional requirements.\n2. Identify latent assumptions and high-risk edge cases.\n3. Apply domain best practices and industry-standard patterns.\n4. Review draft against strict clarity and precision benchmarks.\n</thinking_process>\n\n<operational_constraints>\n1. Zero boilerplate fluff: Begin immediately with substantive content.\n2. Quantify results, timelines, or benchmarks wherever applicable.\n3. Adhere to crisp typographical hierarchy (Markdown headers, tables, code blocks).\n</operational_constraints>\n\n<deliverable_specification>\nStructure final response with:\n- Executive Summary (Max 2 sentences)\n- Core Solution / Deliverable\n- Implementation Matrix & Next Steps\n</deliverable_specification>`;
}
