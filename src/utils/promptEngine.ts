import { extractVariables } from '../hooks/useVariables';
import { classifyTask, isTabletopGameMasterPromptRequest as isTTRPGPromptRequest, type DeliverableKind, type PromptDomain } from './taskIntent';

export interface GeneratePromptParams {
  domain: string;
  task: string;
  technique: string;
  tone: string;
  detailLevel: 'minimalist' | 'balanced' | 'exhaustive';
  targetModel: string;
  includeTaskInScope?: boolean;
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

export function isTabletopGameMasterPromptRequest(text: string): boolean {
  return isTTRPGPromptRequest(text);
}

function buildTabletopGameMasterPrompt(isRu: boolean, includeTaskInScope = false, task = ''): string {
  const taskSection = includeTaskInScope && task.trim()
    ? (isRu ? `\n\n### Исходный запрос\n${task.trim()}` : `\n\n### Original Request\n${task.trim()}`)
    : '';

  if (isRu) {
    return `### Роль и назначение
Ты — интерактивный ведущий настольных нарративных ролевых игр (НРИ). Выполняй функции мастера игры: веди мир, сцены и персонажей ведущего, применяй согласованные правила и поддерживай совместную историю.

### Режим взаимодействия
Исполняй роль игрового ведущего непосредственно. Не создавай новый промпт, не обсуждай prompt engineering и не перенаправляй игроков в библиотеку или к автору инструкции.

### Подготовка игры
Используй уже предоставленные сведения и не задавай вопросы повторно. Если для начала не хватает важных данных, одним коротким сообщением уточни не более трёх вещей: игровую систему и редакцию (или согласие на правила-light), жанр/сеттинг и тон, персонажей/состав группы и игровые границы. Не выдумывай предпочтения группы и не выдавай придуманные правила за официальные.

### Игровой цикл
На каждом ходе:
1. Учти заявленное действие игроков и текущее состояние сцены.
2. Опиши конкретные последствия, реакцию мира и значимые детали без затянутой экспозиции.
3. Играй NPC последовательно с их целями и доступными им знаниями.
4. Передай игрокам решение в значимой точке и спроси, что они делают дальше.

### Правила и агентность игроков
Следуй правилам той системы, которую выбрала группа. Объясняй, когда нужна проверка и что поставлено на карту; не заявляй точные правила, если не уверен. При пробеле предложи прозрачное временное решение и запроси согласие группы. Не решай за персонажей игроков их действия, мысли, чувства или исход важных проверок; не отнимай у них выбор и не форсируй единственный сюжетный путь. Не имитируй бросок кубиков как реальный: попроси игрока бросить или используй только заранее согласованный способ.

### Непрерывность и секреты
Отслеживай факты мира, время, местоположение, состояние персонажей, важные предметы, обещания, зацепки и последствия. Не меняй уже установленные факты без объяснения, не раскрывай тайны раньше подходящего момента и отделяй знания NPC от знаний ведущего. По запросу дай краткое резюме состояния кампании.

### Безопасность и совместная игра
Уважай обозначенные игроками темы-границы и допустимый уровень подробности; чувствительные сцены сокращай или уводи за кадр по просьбе группы. Распределяй внимание между участниками, не наказывай за творческие решения произвольно и уточняй неоднозначные правила до значимых последствий.

### Формат ответа
Пиши по-русски, если группа не попросила иначе. Разделяй короткое описание сцены, речь персонажей и внеигровые пояснения. Не перечисляй варианты действий без необходимости; оставляй пространство для свободного решения. Завершай игровой ход ясным вопросом к игрокам, например: «Что делает ваш персонаж?»

### Начало сессии
Если необходимые вводные уже есть — начни с первой сцены. Если нет — задай короткие стартовые вопросы из раздела «Подготовка игры» и дождись ответов.` + taskSection;
  }

  return `### Role & Purpose
You are the interactive Game Master (GM) for a tabletop narrative role-playing game. Run the world, scenes, and non-player characters; apply the group's agreed rules; and facilitate a collaborative story.

### Interaction Mode
Perform the Game Master role directly. Do not create another prompt, discuss prompt engineering, or redirect players to a prompt library or instruction author.

### Game Setup
Use details already provided and do not ask for them again. If essential setup is missing, ask no more than three concise questions in one message: game system and edition (or permission to use rules-light play), genre/setting and tone, and the characters/group plus play boundaries. Do not invent group preferences or present made-up rules as official.

### Turn Loop
For each turn:
1. Incorporate the players' stated actions and the current scene state.
2. Describe concrete consequences, the world's response, and relevant details without prolonged exposition.
3. Play NPCs consistently with their goals and what they could know.
4. Return the decision to the players at a meaningful point and ask what they do next.

### Rules & Player Agency
Follow the system chosen by the group. Explain when a check is needed and what is at stake; do not state exact rules when uncertain. For a rules gap, propose a transparent temporary ruling and ask the group to agree. Never decide player characters' actions, thoughts, feelings, or important check outcomes for them; preserve meaningful choice and avoid forcing a single plot path. Do not pretend to roll physical dice: ask a player to roll or use only a previously agreed resolution method.

### Continuity & Secrets
Track established world facts, time, locations, character conditions, important items, promises, clues, and consequences. Do not silently retcon established facts, reveal secrets prematurely, or confuse an NPC's knowledge with the GM's knowledge. Provide a concise campaign-state recap when requested.

### Safety & Collaboration
Respect the group's stated boundaries and preferred detail level; fade sensitive scenes to black on request. Share spotlight fairly, do not arbitrarily punish creative choices, and clarify ambiguous rules before consequential outcomes.

### Response Format
Use English unless the group requests another language. Distinguish concise scene narration, character dialogue, and out-of-character notes. Do not list action options unless useful; leave room for free-form choices. End each gameplay turn with a clear invitation such as, “What does your character do?”

### Session Start
If essential setup is available, open with the first scene. Otherwise, ask the brief setup questions above and wait for the group's answers.` + taskSection;
}

export interface ParsedSection {
  rawHeader: string;
  level: number;
  title: string;
  cleanTitle: string;
  lines: string[];
  semanticType:
    | 'role'
    | 'role_directive'
    | 'context'
    | 'context_directive'
    | 'protocol'
    | 'process_directive'
    | 'constraints'
    | 'compliance_directive'
    | 'guardrail_directive'
    | 'behavior_directive'
    | 'output_format'
    | 'structural_directive'
    | 'writing_style'
    | 'dialogue_style'
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

export function detectPromptDomain(text: string): PromptDomain {
  const task = extractTaskFromGeneratedPrompt(text);
  return classifyTask(task || text).domain;
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
 * Composes a standalone prompt from shared sections and task-relevant domain modules.
 * Domain and task signals select only the sections that apply; detail level controls depth.
 */
export function buildDomainPrompt(
  input: string,
  aggressiveness: 'low' | 'medium' | 'high',
  options?: {
    chainOfThought?: boolean;
    riskAudit?: boolean;
    constraints?: boolean;
    examples?: boolean;
  },
  domainHint?: string,
  includeTaskInScope = true
): string {
  if (isPromptAlreadyOptimized(input)) {
    return refineOptimizedPrompt(input, aggressiveness, options);
  }

  if (isTabletopGameMasterPromptRequest(input)) {
    return buildTabletopGameMasterPrompt(isRussianText(input), includeTaskInScope, input);
  }

  const cleanGoal = extractTaskFromGeneratedPrompt(input);
  const task = cleanGoal || input.trim() || 'Complete the requested task';
  const isRu = isRussianText(task.length > 3 ? task : input);
  const taskLower = task.toLowerCase();
  const hintedDomain = (domainHint || '').toLowerCase();

  type CompositionDomain = PromptDomain;
  const classification = classifyTask(task, hintedDomain);
  const domain: CompositionDomain = classification.domain;
  const outputOnlyCopy = classification.deliverable === 'email' || classification.deliverable === 'headline_set';

  const sections: ParsedSection[] = [];
  const addSection = (
    title: string,
    semanticType: ParsedSection['semanticType'],
    lines: string[]
  ) => {
    sections.push({
      rawHeader: `### ${title}`,
      level: 3,
      title,
      cleanTitle: title.toLowerCase(),
      lines,
      semanticType,
    });
  };
  const choose = (ru: string, en: string) => isRu ? ru : en;

  const roleByDomain: Record<CompositionDomain, [string, string]> = {
    retro: ['Фасилитатор разбора инцидентов и надёжности систем', 'Incident Review & Reliability Facilitator'],
    coding: ['Инженер-программист, ориентированный на решение конкретной технической задачи', 'Software Engineer focused on the stated technical task'],
    business: ['Практик по стратегии и операционным решениям', 'Strategy and Operations Practitioner'],
    copywriting: ['Редактор и автор, ориентированный на аудиторию и цель материала', 'Audience- and objective-focused Writer and Editor'],
    product: ['Специалист по продукту и пользовательским сценариям', 'Product and User-Experience Practitioner'],
    research: ['Исследователь, работающий с проверяемыми данными и методологией', 'Researcher focused on verifiable evidence and sound methodology'],
    executive: ['Советник руководителя, фокусирующийся на решениях и последствиях', 'Executive Advisor focused on decisions and consequences'],
    creative: ['Ведущий настольной ролевой игры', 'Tabletop Role-Playing Game Master'],
    general: ['Профильный специалист, выбранный по фактической задаче', 'A practitioner appropriate to the actual task'],
  };
  const roleByDeliverable: Partial<Record<DeliverableKind, [string, string]>> = {
    facilitation_guide: ['Фасилитатор межфункциональных встреч', 'Cross-functional Meeting Facilitator'],
    practical_plan: ['Практик по операционному планированию', 'Practical Operations Planner'],
  };
  const role = roleByDeliverable[classification.deliverable] || roleByDomain[domain];

  addSection(
    choose('Роль и рабочий стандарт', 'Role & Working Standard'),
    'role',
    [
      choose(`Выступайте как ${role[0]}.`, `Act as ${role[1]}.`),
      choose('Сначала следуйте фактической задаче и предоставленным материалам; не подменяйте их типовым сценарием.', 'Prioritize the stated task and supplied materials; do not substitute a familiar but different scenario.'),
    ]
  );

  addSection(
    choose('Задача и границы', 'Task & Scope'),
    'context',
    [
      includeTaskInScope
        ? choose(`**Задача:** ${task}`, `**Task:** ${task}`)
        : choose('Используйте дословный раздел «Исходная задача» как единственный источник формулировки; не пересказывайте и не сужайте его.', 'Use the verbatim Task Input section as the single source for the request; do not paraphrase or narrow it.'),
      choose('Используйте только релевантные к цели вводные. Отделяйте факты от допущений и отмечайте действительно блокирующие пробелы.', 'Use only context relevant to the objective. Separate facts from assumptions and flag only gaps that materially block progress.'),
    ]
  );

  if (domain === 'retro') {
    addSection(choose('Факты и хронология события', 'Incident Facts & Timeline'), 'protocol', [
      choose('Соберите подтверждённые данные о влиянии, затронутых системах, времени и действиях; неизвестные значения оставьте явно неизвестными.', 'Establish verified impact, affected systems, timestamps, and actions; keep unknown values explicitly unknown.'),
      choose('Расположите только переданные события; если время начала, обнаружения, смягчения или восстановления неизвестно, оставьте этот пробел явным.', 'Order only supplied events; if onset, detection, mitigation, or recovery timing is unknown, leave the gap explicit.'),
    ]);
    addSection(choose('Системные причины и вклад факторов', 'Systemic Causes & Contributing Factors'), 'protocol', [
      choose('Отделите подтверждённые факты от гипотез о триггерах и способствующих факторах; не утверждайте первопричину или отказ защиты, не подтверждённые материалами.', 'Separate confirmed facts from hypotheses about triggers and contributing factors; do not assert a root cause or failed safeguard unsupported by the material.'),
      choose('Не приписывайте вину людям; предлагайте вопросы для проверки обнаружения, предотвращения и ограничения последствий только если они относятся к подтверждённым фактам.', 'Avoid individual blame; propose questions about detection, prevention, and blast-radius controls only when relevant to confirmed facts.'),
    ]);
    if (aggressiveness !== 'low') {
      addSection(choose('Меры восстановления и предупреждения', 'Recovery & Prevention Actions'), 'protocol', [
        choose('Разделяйте действия по снижению подтверждённого риска и проверки, которые могут прояснить неизвестные причины; для каждого укажите наблюдаемый результат. Не требуйте установленной первопричины, чтобы предложить расследование.', 'Separate actions that reduce evidenced risk from investigations that could clarify unknown causes; give each an observable outcome. Do not require an established root cause before proposing investigation.'),
        choose('Предложите владельца по роли только если он нужен или запрошен; не выдумывайте имя, ticket ID или срок.', 'Suggest a role-level owner only when needed or requested; do not invent a name, ticket ID, or deadline.'),
      ]);
    }
  } else if (domain === 'coding') {
    addSection(choose('Технический протокол', 'Technical Work Protocol'), 'protocol', [
      choose('Изучите предоставленный код, спецификацию или симптомы. Если необходимого артефакта нет, не выдумывайте его: запросите его либо дайте ограниченный план диагностики.', 'Inspect supplied code, specifications, or symptoms. If a necessary artifact is missing, do not invent it: request it or provide a bounded diagnostic plan.'),
      choose('Сформулируйте причину или инженерный выбор, затем предложите минимальное достаточное изменение с учётом совместимости и существующих соглашений проекта.', 'Explain the cause or engineering choice, then propose the smallest sufficient change while respecting compatibility and project conventions.'),
      choose('Укажите проверки, тесты и возможные побочные эффекты, относящиеся именно к этому изменению.', 'Specify checks, tests, and possible side effects relevant to this particular change.'),
    ]);
    if (/api|webhook|http|интеграц|идемпотент|очеред|retry|повторн/i.test(taskLower)) {
      const explicitIdempotencyRequest =
        /(?:\b(?:need|must|require|implement|design|ensure|support|provide)\b|нужн|требу|реализ|обеспеч|поддерж)[^.!?\n]{0,80}(?:idempotenc\w*|идемпотент\w*)|(?:idempotenc\w*|идемпотент\w*)[^.!?\n]{0,60}(?:\b(?:required|necessary|needed|must|requirement)\b|нужн|требу|необходим)/i.test(task) &&
        !/(?:\b(?:do not|don't|never|avoid)\b[^.!?\n]{0,50}\b(?:implement|add|support|use|provide)\b[^.!?\n]{0,50}(?:idempotenc\w*|идемпотент\w*)|не\s+(?:реализ|добав|обеспеч|поддерж)[^.!?\n]{0,50}идемпотент)/i.test(task);
      addSection(choose('Контракты интеграций и повторных вызовов', 'Integration Contracts & Retries'), 'protocol', [
        explicitIdempotencyRequest
          ? choose(
              'Соблюдайте явное требование идемпотентной обработки повторных доставок: опирайтесь на идентификатор события и гарантии провайдера только если они заданы; если ключ или граница транзакции не описаны, обозначьте их как допущение либо необходимую зависимость. Не приравнивайте защиту от повторного применения к гарантии exactly-once.',
              'Honor the explicit idempotency requirement for repeated deliveries. Rely on an event identifier and provider guarantees only when specified; if the key or transaction boundary is missing, state it as an assumption or required dependency. Do not equate duplicate suppression with an exactly-once guarantee.'
            )
          : choose(
              'Проверьте границы доверия, тайм-ауты, повторы и дублирующие запросы; используйте только гарантии идемпотентности, подтверждённые контрактом, и не обещайте доставку «ровно один раз».',
              'Check trust boundaries, timeouts, retries, and duplicate requests; rely only on idempotency guarantees supported by the contract and do not promise exactly-once delivery.'
            ),
      ]);
    }
    if (/sql|database|postgres|баз[аы] данных|миграц|запрос/i.test(taskLower)) {
      addSection(choose('Данные и целостность', 'Data & Integrity'), 'protocol', [
        choose('Учитывайте схему, транзакционные границы, объём данных и план отката; не предлагайте миграции без оценки совместимости.', 'Account for schema, transaction boundaries, data volume, and rollback; do not suggest migrations without assessing compatibility.'),
      ]);
    }
    if (/security|auth|permission|credential|безопас|авторизац|аутентификац|доступ/i.test(taskLower)) {
      addSection(choose('Границы безопасности', 'Security Boundaries'), 'protocol', [
        choose('Проверьте аутентификацию, авторизацию, валидацию входа и раскрытие секретов только в той мере, в какой они относятся к задаче.', 'Review authentication, authorization, input validation, and secret exposure only to the extent relevant to the task.'),
      ]);
    }
  } else if (domain === 'business') {
    if (classification.deliverable !== 'pricing_analysis') {
      addSection(choose('Стратегический анализ', 'Strategic Analysis'), 'protocol', [
        choose('Определите целевой сегмент, проблему клиента, ценностное предложение и альтернативы; не объявляйте конкурентное преимущество без оснований.', 'Identify target segments, customer problem, value proposition, and alternatives; do not claim competitive advantage without evidence.'),
        choose('Свяжите рекомендации с доступными ресурсами, ограничениями и измеримыми результатами.', 'Tie recommendations to available resources, constraints, and measurable outcomes.'),
      ]);
    }
    if (/price|pricing|цен(?:а|ы|е|у|овой|ового|овую|ам|ами|ах)|ценообраз|тариф|монетизац/i.test(taskLower)) {
      addSection(choose('Ценообразование и экономика', 'Pricing & Economics'), 'protocol', [
        choose('Разделяйте известные исходные данные и оценки; используйте формулы, диапазоны и чувствительность только если они поддерживаются вводными, иначе укажите, какие данные нужны.', 'Separate known inputs from estimates; use formulas, ranges, and sensitivity only when supported by the inputs, otherwise state what data is needed.'),
        choose('Сопоставьте подходящие модели цены с ценностью для клиента и доступными данными; предложите недорогой эксперимент готовности платить без вымышленных результатов.', 'Compare relevant pricing models using customer value and available evidence; propose a low-cost willingness-to-pay experiment without fabricating results.'),
      ]);
    }
    if (/launch|market|gtm|growth|вывод на рынок|запуск|рост|масштаб/i.test(taskLower)) {
      addSection(choose('Выход на рынок и проверка гипотез', 'Go-to-Market & Validation'), 'protocol', [
        choose('Планируйте этапы внутри заданного горизонта и с учётом указанных ресурсов; для каждого теста назовите гипотезу, канал, наблюдаемую метрику и условие продолжения или остановки без произвольных порогов.', 'Plan stages within the stated horizon and resources; for each test name a hypothesis, channel, observable metric, and continue/stop condition without arbitrary thresholds.'),
      ]);
    }
  } else if (domain === 'copywriting') {
    addSection(choose('Редакторский бриф', 'Editorial Brief'), 'context', classification.deliverable === 'headline_set'
      ? [
          choose('Используйте только категорию продукта, аудиторию и функции, прямо названные в задаче. Если конкретные преимущества не заданы, создавайте точность через аудиторию и сценарий, не выдумывая свойства, желаемое действие или переменные-заполнители.', 'Use only the product category, audience, and features explicitly stated in the task. If specific benefits are absent, ground specificity in the audience and use case; do not invent product claims, a desired action, or placeholders.'),
        ]
      : [
          choose('Извлеките из задачи аудиторию, канал, желаемое действие и подтверждённые факты. Если часть брифа отсутствует, используйте нейтральное допущение, не добавляйте неподтверждённые свойства или обозначьте переменную только если без неё нельзя подготовить материал.', 'Infer audience, channel, desired action, and substantiated facts from the task. If details are missing, use a neutral assumption, avoid unsupported product claims, and mark a variable only if it is necessary to produce the asset.'),
          choose('Подберите структуру убеждения под материал; не навязывайте AIDA/PAS, если формат или цель этого не требуют.', 'Choose a persuasive structure suited to the asset; do not force AIDA/PAS when the format or objective does not call for it.'),
        ]);
    if (/headline|заголов/i.test(taskLower)) {
      addSection(choose('Варианты заголовка', 'Headline Variations'), 'protocol', [
        choose('Подготовьте запрошенное количество содержательно разных заголовков; не добавляйте пояснения, CTA, цифры или обещания, если этого нет в исходной задаче.', 'Provide the requested number of meaningfully distinct headlines; do not add rationale, CTAs, numbers, or promises unless requested.'),
      ]);
    } else if (/email|e-mail|subject line|preview text|письм|рассылк|тема письма|прехедер/i.test(taskLower)) {
      addSection(choose('Структура сообщения', 'Message Sequence'), 'protocol', [
        choose('Составьте только запрошенное письмо; добавляйте тему, прехедер и призыв к действию лишь в указанном объёме, сохраняя заданный тон.', 'Write only the requested email; include a subject, preview text, and call to action only to the extent requested, preserving the specified voice.'),
      ]);
    } else {
      addSection(choose('Композиция материала', 'Content Composition'), 'protocol', [
        choose('Начните с релевантного читателю тезиса, развейте его проверяемой аргументацией и завершите уместным следующим шагом.', 'Open with a reader-relevant point, support it with substantiated reasoning, and close with an appropriate next step.'),
      ]);
    }
  } else if (domain === 'product') {
    if (classification.deliverable === 'acceptance_criteria') {
      addSection(choose('Критерии приёмки', 'Acceptance Criteria'), 'protocol', [
        choose('Опишите проверяемое поведение только для перечисленных состояний и сценариев; включите граничные случаи из исходной задачи. Не предписывайте технологический стек и не расширяйте объём функции.', 'Specify testable behavior for the stated states and flows, including edge cases named in the task. Do not prescribe a technology stack or expand feature scope.'),
      ]);
    } else {
      addSection(choose('Пользовательский сценарий и ценность', 'User Journey & Product Value'), 'protocol', [
        choose('Опишите подтверждённые потребности и препятствия в указанном сценарии; не выводите пользовательские мотивы за пределами заметок.', 'Describe evidenced user needs and friction in the stated journey; do not infer motives beyond the supplied notes.'),
        choose('Предлагайте соразмерные изменения и для каждого укажите способ проверки; приоритизируйте только когда исходных данных достаточно.', 'Suggest proportionate changes and a way to validate each; prioritize only when the supplied evidence supports doing so.'),
      ]);
    }
  } else if (domain === 'research') {
    addSection(choose('Исследовательский протокол', 'Research Protocol'), 'protocol', [
      choose('Используйте предоставленный корпус как границу анализа; описывайте метод, выборку и ограничения только настолько, насколько это нужно для запрошенного синтеза или сравнения.', 'Treat the supplied material as the analysis boundary; describe methods, samples, and limitations only to the extent needed for the requested synthesis or comparison.'),
      choose('Не выдумывайте источники, цитаты, результаты или статистику. Отмечайте, какие выводы подтверждены предоставленными данными.', 'Do not fabricate sources, quotations, findings, or statistics. Mark which conclusions are supported by supplied evidence.'),
    ]);
  } else if (domain === 'executive') {
    addSection(choose('Решение и компромиссы', 'Decision & Trade-offs'), 'protocol', [
      choose('Сформулируйте решение или рекомендацию в начале; затем изложите варианты, ключевые компромиссы, последствия и уровень уверенности.', 'State the decision or recommendation first, followed by options, material trade-offs, consequences, and confidence.'),
      choose('Разделите решаемые сейчас вопросы, необходимые данные и отложенные риски.', 'Separate what can be decided now, required information, and deferred risks.'),
    ]);
  } else {
    addSection(choose('Рабочий протокол', 'Working Protocol'), 'protocol', [
      choose('Разложите цель на несколько проверяемых частей; выберите метод, соответствующий предмету и ожидаемому результату.', 'Break the objective into verifiable parts and choose a method appropriate to the subject and desired outcome.'),
      choose('Представьте выводы вместе с необходимыми основаниями, допущениями и следующим практическим шагом.', 'Present findings with the necessary rationale, assumptions, and a practical next step.'),
    ]);
  }

  if (domain === 'coding' && classification.deliverable === 'technical_design' && /webhook|идемпотент|повторн\w* доставк/i.test(taskLower)) {
    addSection(choose('Проектирование идемпотентности вебхуков', 'Webhook Idempotency Design'), 'domain_specific', [
      choose('Сохраните требование идемпотентной обработки. Опишите стабильный ключ события, если его предоставляет контракт; долговременную дедупликацию и атомарную/конкурентную обработку побочного эффекта; различение повторной и новой легитимной доставки; поведение при сбое до и после фиксации состояния. Отметьте неизвестные гарантии провайдера и хранилища как вопросы или допущения.', 'Honor the explicit idempotency requirement. Describe a stable event key when the provider contract supplies one; durable deduplication and atomic/concurrent handling of side effects; distinguishing redelivery from a new legitimate event; and failure behavior before and after state is recorded. Mark unknown provider or storage guarantees as questions or assumptions.'),
      choose('Предложите сфокусированные проверки: повтор того же события, одновременные дубликаты, разные события и сбои вокруг записи дедупликации/обработки. Не требуйте конкретный тестовый framework или базу данных без контекста и не обещайте exactly-once доставку.', 'Specify focused checks for same-event redelivery, concurrent duplicates, distinct events, and failures around deduplication/processing. Do not prescribe a test framework or database without context, and do not promise exactly-once delivery.'),
    ]);
  }

  if (domain === 'coding' && classification.deliverable === 'code_change' && /modal|dialog|keyboard|focus|accessib|a11y|фокус|клавиатур|доступност|диалог|модальн/i.test(taskLower)) {
    addSection(choose('Проверки поведения диалога', 'Dialog Accessibility Checks'), 'domain_specific', [
      choose('Ограничьте изменение затронутым диалогом и существующей реализацией. Проверьте клавиатурную навигацию, начальный фокус и его возврат после закрытия; добавляйте удержание фокуса или закрытие по Escape только если это следует из требуемого поведения/текущего контракта. Следуйте проектным соглашениям и добавьте сфокусированные проверки.', 'Keep the change within the affected dialog and existing implementation. Check keyboard navigation, initial focus, and focus restoration after closing; add focus containment or Escape-to-close only when required by the stated behavior or existing contract. Follow project conventions and add focused checks.'),
    ]);
  }

  if (domain === 'executive' && /\b(?:budget|allocation|allocate|retention|referral|marginal return|return on investment)\b|бюджет|распределен|удержан|реферал|рекомендац|маржинальн\w* доход/i.test(taskLower)) {
    addSection(choose('План получения недостающих данных', 'Plan to Resolve Decision Uncertainty'), 'domain_specific', [
      choose('Если сравнимых данных о результате или предельной отдаче нет, укажите, какие наблюдаемые показатели нужны, как получить сопоставимые данные (тест — только если он уместен и явно обозначен как предложение) и когда пересмотреть распределение. Не выдумывайте значения, владельцев или даты; отделяйте план измерения от уже известных фактов.', 'If comparable outcome or marginal-return data is missing, specify the observable measures needed, how to collect comparable evidence (propose a test only when suitable and label it as a proposal), and when to revisit the allocation. Do not invent values, owners, or dates; distinguish the measurement plan from established facts.'),
    ]);
  }

  if (domain === 'executive' && classification.deliverable === 'executive_memo' && /\$\s*[\d,]+|\b\d+(?:[.,]\d+)?\s*(?:million|thousand)\b/i.test(task) && /\b(?:allocate|allocation|split|distribute|budget)\b|распредел|разделить|бюджет/i.test(taskLower)) {
    const statedBudget = task.match(/\$\s*[\d,]+|\b\d+(?:[.,]\d+)?\s*(?:million|thousand)\b/i)?.[0] || '';
    addSection(choose('Ограничение заданного бюджета', 'Stated Budget Constraint'), 'domain_specific', [
      choose(`Если предлагаете распределение, его сумма должна точно равняться заданному бюджету ${statedBudget}; пометьте выбор как предварительный, если нет данных о предельной отдаче. Не изображайте вариант как оптимизированный без таких данных.`, `If proposing an allocation, make the total equal the stated budget ${statedBudget}; label the choice provisional when marginal-return data is unavailable. Do not present it as optimized without that evidence.`),
    ]);
  }

  if (domain === 'executive' && classification.deliverable === 'executive_memo' && /accessibility blocker|accessibility issue|critical accessibility|барьер.{0,20}доступност|критическ.{0,20}доступност/i.test(taskLower)) {
    addSection(choose('Проверка решения о доступности и запуске', 'Accessibility Launch Decision Checks'), 'domain_specific', [
      choose('Рассмотрите каждый названный блокер отдельно: какие предоставленные свидетельства подтверждают его критичность, как проверить устранение, какой пользовательский риск останется при запуске и как этот риск соотносится с указанной задержкой. Укажите ролевых владельцев только как предложения; не придумывайте суммы, KPI, дополнительные сроки или критерии.', 'Assess each stated blocker separately: what supplied evidence establishes its severity, how resolution would be verified, what user risk remains if launch proceeds, and how that risk compares with the stated delay. Label role owners as proposals; do not invent dollar amounts, KPIs, extra dates, or thresholds.'),
    ]);
  }

  if (domain === 'general' && classification.deliverable === 'practical_plan' && /\b(?:three|3)\s+(?:evenings|nights)\b|за\s+три\s+вечера/i.test(taskLower)) {
    addSection(choose('План по трём вечерам', 'Three-Evening Plan'), 'domain_specific', [
      choose('Разделите план на Вечер 1, Вечер 2 и Вечер 3; укажите последовательные действия и проверяемый результат каждого вечера. Используйте только названные телефон и локальный компьютер; не предполагайте сканер, внешний диск, облако или другое оборудование.', 'Divide the plan into Evening 1, Evening 2, and Evening 3, with sequential actions and a verifiable result for each. Use only the stated phone and local computer; do not assume a scanner, external drive, cloud service, or other equipment.'),
    ]);
  }

  if (aggressiveness !== 'low') {
    addSection(choose('Полнота и проверка качества', 'Coverage & Quality Check'), 'protocol', [
      outputOnlyCopy
        ? choose('Внутренне проверьте соответствие задаче, тону и ограничениям на факты; в ответе оставьте только запрошенный материал, без допущений, проверки качества или редакторских комментариев.', 'Internally check task fit, voice, and factual constraints; return only the requested copy, without assumptions, QA notes, or editorial commentary.')
        : choose('Сверьте итог с целью и существенными требованиями; сообщайте только те неизвестные, которые блокируют корректный результат.', 'Check the result against the objective and material requirements; surface only unknowns that block a correct deliverable.'),
    ]);
  }

  if (options?.chainOfThought && !outputOnlyCopy) {
    addSection(choose('Проверяемые этапы рассуждения', 'Verifiable Reasoning Steps'), 'protocol', [
      choose('Покажите краткие промежуточные выводы и их основания; не раскрывайте скрытую внутреннюю цепочку рассуждений.', 'Show concise intermediate conclusions and their grounds; do not expose hidden internal reasoning.'),
    ]);
  }

  if ((options?.riskAudit || aggressiveness === 'high') && !outputOnlyCopy) {
    addSection(choose('Риски и альтернативы', 'Risks & Alternatives'), 'protocol', [
      choose('Проверьте наиболее существенные сценарии отказа, побочные эффекты и альтернативы; ранжируйте только риски, обоснованные контекстом.', 'Check material failure modes, side effects, and alternatives; rank only risks supported by the context.'),
    ]);
  }

  if (options?.examples && !outputOnlyCopy) {
    addSection(choose('Пример или контрольный случай', 'Example or Check Case'), 'examples', [
      choose('Добавьте короткий пример только если он проясняет решение; явно маркируйте гипотетические значения.', 'Add a short example only when it clarifies the solution; label hypothetical values explicitly.'),
    ]);
  }

  if (options?.constraints !== false) {
    addSection(choose('Ограничения качества', 'Quality Constraints'), 'constraints', [
      choose('Не выдумывайте факты, результаты, метрики или возможности инструментов. Явно обозначайте неопределённость.', 'Do not invent facts, results, metrics, or tool capabilities. Make uncertainty explicit.'),
      choose('Избегайте вводных клише и повторов; сохраняйте детализацию соразмерной задаче.', 'Avoid boilerplate openings and repetition; keep detail proportional to the task.'),
    ]);
  }

  const deferImplementation =
    /\b(?:do not|don't|never)\b[^.!?]{0,160}\b(?:write|implement|produce|generate)\b[^.!?]{0,60}\b(?:code|implementation)\b/i.test(task) ||
    /не\s+(?:пиши|писать|реализуй|реализовывай|генерируй|генерировать)[^.!?]{0,120}(?:код|реализац)/i.test(task);
  const codingOutput: [string, string] = deferImplementation
      ? [
        'Опишите дизайн и контракты, план проверок и rollout; отложите реализацию кода до получения текущего обработчика и необходимых интерфейсов.',
        'Provide a design and contract plan, checks, and rollout; defer implementation code until the current handler and required interfaces are supplied.',
      ]
      : classification.deliverable === 'technical_design'
      ? [
        'Сначала предложите решение, обозначьте необходимые контрактные допущения и дайте сфокусированные тест-кейсы; не утверждайте гарантий, не подтверждённых контрактом.',
        'Describe the proposed solution, identify required contract assumptions, and give focused test cases; do not claim guarantees not established by the contract.',
      ]
    : [
        'Предпочтительный формат — применимое изменение или код, затем объяснение и релевантные тесты; если входных материалов не хватает, укажите это.',
        'Prefer an actionable change or code, followed by rationale and relevant tests; state when required input is missing.',
      ];
  const outputByDomain: Record<CompositionDomain, [string, string]> = {
    retro: ['Краткое резюме, подтверждённая хронология, гипотезы и неизвестные, а также действия по снижению риска или проверке; не утверждайте неподтверждённую причину.', 'Concise summary, confirmed timeline, hypotheses and unknowns, plus risk-reduction or investigative actions; do not assert an unverified cause.'],
    coding: codingOutput,
    business: ['Резюме решения, обоснование, допущения, метрики и план следующих шагов; не заполняйте пробелы вымышленными цифрами.', 'Decision summary, rationale, assumptions, metrics, and next steps; do not fill data gaps with invented numbers.'],
    copywriting: outputOnlyCopy
      ? ['Выведите только запрошенный готовый материал; не добавляйте анализ, варианты или редакторские пояснения.', 'Return only the requested finished copy; do not add analysis, variants, or editorial notes.']
      : ['Сначала готовый материал, затем при необходимости короткие варианты и редакторские пояснения.', 'Lead with the finished copy, then provide concise variants or editorial notes when useful.'],
    product: ['Структурируйте ответ как проблема пользователя, приоритетные изменения и способ проверить эффект.', 'Structure the response as user problem, prioritized changes, and a way to validate impact.'],
    research: ['Структурируйте выводы, метод, качество свидетельств и ограничения; отделяйте подтверждённое от гипотез.', 'Structure findings, method, evidence quality, and limitations; separate supported conclusions from hypotheses.'],
    executive: ['Начните с решения; затем кратко укажите последствия, риски, владельца следующего шага и срок, если они известны.', 'Lead with the decision; briefly state consequences, risks, and the owner and timing of the next step when known.'],
    creative: ['Ведите игровую сессию как мастер; не отвечайте общими рекомендациями о библиотеке или создании промптов.', 'Run the game session as the GM; do not answer with generic advice about prompt libraries or prompt creation.'],
    general: ['Используйте ясную структуру, соответствующую типу результата; включайте только полезные разделы.', 'Use a clear structure suited to the deliverable; include only useful sections.'],
  };
  const headlineCountMatch = taskLower.match(/\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten|один|одна|два|две|три|четыре|пять|шесть|семь|восемь|девять|десять)\s+(?:(?:distinct|different|различн\w*)\s+)?(?:landing[- ]page\s+)?headlines?\b|(?:\b(\d+)\s+(?:вариант\w*\s+)?заголов\w*)/i);
  const countToken = headlineCountMatch?.[1] || headlineCountMatch?.[2];
  const countWords: Record<string, string> = { one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9', ten: '10', один: '1', одна: '1', два: '2', две: '2', три: '3', четыре: '4', пять: '5', шесть: '6', семь: '7', восемь: '8', девять: '9', десять: '10' };
  const headlineCount = countToken ? (countWords[countToken] || countToken) : '';
  const deliverableOutput: Partial<Record<DeliverableKind, [string, string]>> = {
    email: [
      'Верните только запрошенное письмо; соблюдайте аудиторию, тон, краткость и число CTA. Используйте только факты о продукте, данные в задаче; не добавляйте функций, результатов или обещаний. Если адресат CTA не задан, не придумывайте конкретный экран или функцию; не вставляйте placeholders, если они не нужны для корректного письма.',
      'Return only the requested email; honor the stated audience, voice, brevity, and CTA count. Use only product facts supplied in the task; do not add features, outcomes, or promises. If the CTA destination is unspecified, do not invent a screen or feature; avoid placeholders unless they are necessary to make the draft usable.',
    ],
    headline_set: [
      headlineCount ? `Верните ровно ${headlineCount} содержательно различных заголовков; варьируйте подачу, а не факты. Используйте только указанные функции и преимущества; не добавляйте CTA или пояснения, если они не запрошены.` : 'Верните только запрошенный набор содержательно различных заголовков. Используйте только указанные факты, функции и преимущества; не добавляйте CTA или пояснения, если они не запрошены.',
      headlineCount ? `Return exactly ${headlineCount} materially distinct headlines; vary the framing, not the facts. Use only stated product facts and benefits; add no CTA or rationale unless requested.` : 'Return only the requested set of materially distinct headlines, grounded in the stated product facts and benefits; add no CTA or rationale unless requested.',
    ],
    acceptance_criteria: [
      'Выведите краткие нумерованные критерии приёмки: для каждого укажите действие или условие и наблюдаемый ожидаемый результат. Покройте только названные сценарии, состояния и граничные случаи; не расширяйте функциональность, не предписывайте стек и не добавляйте общий обзор продукта.',
      'Return concise, numbered acceptance criteria. For each, state the triggering action or condition and the observable expected result. Cover only the named flows, states, and edge cases; do not expand the feature, prescribe a stack, or add a general product review.',
    ],
    pricing_analysis: [
      'Сопоставьте только релевантные модели цены в компактной таблице: модель, соответствие ценности, необходимые данные, преимущества и риски. Отделите наблюдения от гипотез; завершите одним недорогим экспериментом с гипотезой, методом и наблюдаемым сигналом решения. Если вводные основаны только на качественных интервью и количественной оценки willingness-to-pay нет, предложите направленную проверку со стандартизированным выбором вариантов цены/пакета; считайте результат сигналом, а не репрезентативной оценкой. Не выдумывайте цену, выборку, CAC/LTV или пороги.',
      'Compare only relevant pricing models in a compact matrix: model, value fit, evidence needed, advantages, and risks. Separate observations from hypotheses; finish with one low-cost experiment specifying its hypothesis, method, and observable decision signal. When inputs are qualitative interviews without a quantitative willingness-to-pay estimate, propose a directional test using consistently presented price/package alternatives; treat results as a signal, not a representative estimate. Do not invent prices, sample sizes, CAC/LTV, or thresholds.',
    ],
    gtm_plan: [
      'Сформируйте этапный план, чьи временные интервалы покрывают весь указанный горизонт и соразмерны размеру команды и бюджету. Для каждого этапа укажите цель/сегмент, проверяемый канал или действие, владельца по роли, требуемый ресурс, наблюдаемый сигнал и условие продолжения, изменения или остановки. Выберите этапы по контексту, а не по шаблону; не распределяйте неуказанный бюджет и не придумывайте числовые пороги.',
      'Build a phased plan whose time windows cover the full stated horizon and fit the team size and budget. For each phase specify its objective/segment, testable channel or activity, role owner, required resource, observable signal, and continue/change/stop condition. Choose phases for the context rather than imposing a stock launch sequence; do not allocate unstated budget or invent numeric thresholds.',
    ],
    executive_memo: [
      'Подготовьте краткую записку: решение/рекомендация в начале; затем варианты и основания, компромиссы для затронутых сторон, ключевые неизвестные и риски. Для каждого следующего действия предложите владельца по роли, если он не задан, и явно пометьте его как предложение; не выдумывайте личные имена или даты. Укажите, какие данные изменили бы рекомендацию; не выдавайте допущения за факты.',
      'Write a concise memo: lead with the decision/recommendation, then options and rationale, stakeholder trade-offs, material unknowns, and risks. For each next action, suggest a role-level owner when none is supplied and label it as proposed; do not invent personal names or dates. State what evidence would change the recommendation; never present assumptions as facts.',
    ],
    interview_synthesis: [
      'Сгруппируйте наблюдения по темам и отделите подтверждения от разногласий. Сохраните числа и единицы так, как они заданы (например, число участников или упоминаний); не предполагайте пересечение или взаимоисключение категорий, если это не сообщено. Не выводите причинность или противоречие без прямых данных; если подтверждённого противоречия нет, скажите это. Не выдумывайте цитаты.',
      'Group the supplied observations into themes and distinguish supporting evidence from divergence. Preserve counts and their stated units (for example, participants or mentions); do not assume categories overlap or are mutually exclusive unless reported. Do not infer causality or contradiction without direct evidence; say explicitly when no direct contradiction is established. Invent no quotations.',
    ],
    study_comparison: [
      'Сопоставьте материалы по каждому исследованию: вопрос/контекст, дизайн и выборка (только если описаны), результаты, совпадения, расхождения и ограничения. Если абстракт или нужная часть материала отсутствует, отметьте это и сравнивайте только предоставленное; если деталь не сообщается внутри абстракта, так и укажите. Не превращайте пробел в доказанный недостаток метода. Разделяйте выводы авторов и сопоставление; не выводите причинность и не добавляйте источники.',
      'Compare each supplied study by question/context, design and sample (only as reported), outcomes, agreements, differences, and limitations. If an abstract or required source material is missing, say so and compare only what was supplied; if a detail is omitted within an abstract, label it “not reported.” Do not treat missing information as a demonstrated methodological flaw. Distinguish authors’ findings from the comparison; do not infer causality or add sources.',
    ],
    incident_review: [
      'Представьте в хронологии только подтверждённые события и переданные временные отметки; неизвестные время, влияние и причинные связи обозначьте как неизвестные, а объяснения — как гипотезы. Затем отдельно перечислите действия для проверки/снижения риска с проверяемым результатом. Если владелец не указан, предложите роль и пометьте её как гипотезу; не выдумывайте имена, Jira IDs или сроки. Соблюдайте blameless-подход.',
      'Put only confirmed events and supplied timestamps in the chronology; mark unknown timing, impact, and causal links as unknown, and frame explanations as hypotheses. Then list risk-reduction or investigation actions with verifiable outcomes. If no owner is supplied, suggest a role and label it as proposed; do not invent names, Jira IDs, or due dates. Remain blameless.',
    ],
    code_change: [
      'Если исходный код доступен, верните минимальный патч для затронутого поведения и сфокусированные регрессионные проверки, следуя существующим соглашениям проекта. Если кода или необходимого контракта нет, назовите конкретные недостающие файлы/интерфейсы и не выдумывайте патч или test runner; не меняйте несвязанные компоненты.',
      'When source code is available, return a minimal patch for the affected behavior and focused regression checks, following the project’s existing conventions. If code or a required contract is missing, name the specific files/interfaces needed and do not invent a patch or test runner; leave unrelated components untouched.',
    ],
    technical_design: deferImplementation
      ? ['Опишите целевой дизайн и контрактные допущения, укажите недостающие входные интерфейсы и сфокусированные проверки; отложите реализацию кода до получения текущего обработчика и необходимых интерфейсов.', 'Describe the target design and contract assumptions, identify missing interfaces, and specify focused checks; defer implementation code until the current handler and required interfaces are supplied.']
      : ['Опишите решение для явно названной проблемы: ключевые компоненты/границы, поток данных или управления, контрактные допущения, отказные случаи и проверки. Отделите подтверждённые гарантии от предположений; код добавляйте только если он запрошен и необходим.', 'Describe a solution to the stated problem: key components/boundaries, data or control flow, contract assumptions, failure cases, and checks. Separate established guarantees from assumptions; include code only if requested and necessary.'],
    product_recommendations: [
      'Для каждого изменения свяжите наблюдение с гипотезой и предложением, укажите ожидаемое поведение пользователя и соразмерную проверку. При скудных качественных данных пометьте приоритет как предварительный и укажите, какие новые наблюдения могли бы изменить порядок; не обобщайте единичные заметки на всех пользователей и не выдумывайте размер выборки.',
      'For each recommendation, link the observation to a hypothesis and proposed change, state the intended user behavior, and specify proportionate validation. With sparse qualitative evidence, label priorities preliminary and say what evidence could change the ordering; do not generalize isolated notes to all users or invent a sample size.',
    ],
    research_synthesis: [
      'Структурируйте синтез по вопросу, подтверждённым выводам, расхождениям между материалами и ограничениям доказательств. Не добавляйте источники, методы, результаты или статистику, которых нет во входных данных.',
      'Structure the synthesis around the question, supported findings, disagreements across materials, and evidence limitations. Add no sources, methods, findings, or statistics absent from the input.',
    ],
    facilitation_guide: [
      'Дайте повестку с этапами и тайм-боксами, сумма которых соответствует указанной длительности; для каждого этапа задайте цель, инструкцию/вопрос ведущего и фиксируемый результат, учитывая указанное число участников. Завершите решениями и зависимостями; попросите группу назначить владельца каждому действию. Если владелец не согласован, отметьте это как нерешённое и укажите шаг для назначения; не выдумывайте имена. Не предполагайте специальные инструменты или предварительную подготовку.',
      'Provide an agenda with time boxes that add up to the stated duration; for each phase give its goal, facilitator prompt/instruction, and captured output, scaled to the stated group size. Close with decisions and dependencies, and have the group assign an owner to each action. If no owner is agreed, record it as unresolved and specify a follow-up to assign one; do not invent names. Do not assume special tools or prior preparation.',
    ],
    practical_plan: [
      'Разбейте план на выполнимые шаги в указанном порядке и временных рамках; для каждого укажите нужные материалы/устройство и проверяемый результат. Если запрошена организация файлов, приведите пример структуры папок и простой шаблон имени файла. Соблюдайте запреты на сервисы и инструменты; для локальной резервной копии предложите проверку восстановимости на одном файле без предположения о дополнительном оборудовании.',
      'Break the plan into actionable steps within the stated order and time limits; name required materials/devices and a verifiable outcome for each. If file organization is requested, include an example folder tree and simple filename pattern. Respect service and tool prohibitions; for a local backup, propose a recoverability check on one file without assuming extra hardware.',
    ],
  };
  const output = deliverableOutput[classification.deliverable] || outputByDomain[domain];
  addSection(choose('Формат результата', 'Deliverable Format'), 'output_format', [output[isRu ? 0 : 1]]);

  return reconstructPrompt('', sections);
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
export function adaptPromptForModel(
  input: string,
  model: 'claude' | 'openai' | 'gemini' | 'grok' | 'llama',
  normalizeInput = true
): string {
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

  // 3. Obtain domain prompt (refine idempotently if already structured, or build new domain prompt if raw).
  // The unified generation pipeline passes normalizeInput=false so model adaptation
  // cannot discard or rebuild content already supplied by real Skill transforms.
  let domainPrompt = operationalCore;
  if (!normalizeInput) {
    domainPrompt = operationalCore;
  } else if (!isPromptAlreadyOptimized(operationalCore)) {
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

  const basePrompt = buildDomainPrompt(task, aggressiveness, undefined, domain, params.includeTaskInScope);

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

  if (isTabletopGameMasterPromptRequest(description)) {
    return buildTabletopGameMasterPrompt(isRussianText(description), true, description);
  }

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
