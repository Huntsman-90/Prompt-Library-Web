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
  ];

  for (const rx of metaRegexes) {
    clean = clean.replace(rx, '');
  }

  // Remove meta instructions embedded at the end
  clean = clean.replace(/\s*(Please make sure the prompt|The prompt should include|Ensure the prompt has|Format the prompt as|Make it professional|Include variables like|Убедись, что промпт содержит|Промпт должен включать|Сделай промпт профессиональным).*$/gi, '');

  // Remove polite conversational preambles
  clean = clean
    .replace(/^(Hello|Hi|Hey|Dear AI|Привет|Здравствуйте),\s*/gi, '')
    .replace(/\b(please|kindly|пожалуйста)\b/gi, '')
    .replace(/[ \t]+/g, ' ')
    .trim();

  // Capitalize first letter
  if (clean.length > 0) {
    clean = clean.charAt(0).toUpperCase() + clean.slice(1);
  }

  return clean || input.trim();
}

/**
 * Detects whether the input text is primarily Russian.
 */
function isRussianText(text: string): boolean {
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
    return `Разработать комплексное профессиональное решение с глубоким анализом предмета: ${core}.`;
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
    return `Deliver an expert, structured solution focusing on the following domain: ${core}.`;
  }
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
  const cleanGoal = extractCoreGoalAndCleanMeta(input);
  const lower = cleanGoal.toLowerCase();
  const isRu = isRussianText(input);

  // Detect domain
  const isRetro = /retrospect|postmortem|incident|outage|ретроспектив|постмортем|инцидент|авари|сбой|скрам|спринт/.test(lower);
  const isCoding = /code|refactor|typescript|react|python|sql|debug|api|bug|github|test|docker|код|рефакторинг|исправь|ошибк|скрипт/.test(lower);
  const isBusiness = /strategy|gtm|pricing|investor|saas|pitch|бизнес|стратеги|питч|продаж|маркетинг|цена/.test(lower);
  const isCopywriting = /copywriting|write|article|copy|email|post|newsletter|копирайтинг|текст|стать|письмо|пост|рассылк/.test(lower);

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
- Каждое рекомендательное действие должно иметь четкий критерий проверки (Definition of Done).`;
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
- Every corrective action item must feature a verifiable Definition of Done.`;
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
- Краткие архитектурные комментарии с пояснением изменений и дельты сложности.`;
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
- Concise architectural commentary detailing key trade-offs and complexity improvements.`;
    }
  }

  // 3. BUSINESS STRATEGY & GTM DOMAIN
  if (isBusiness) {
    if (isRu) {
      if (aggressiveness === 'low') {
        return `### Роль и Задачи\nВы выступаете в роли Бизнес-Консультанта.\n\n### Стратегический Контекст\nРазработать стратегический план по теме [[тема_бизнеса]] с акцентом на рост продаж и оптимизацию ресурсов.`;
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
        return `### Role & Expertise\nYou are acting as a Business Strategy Consultant.\n\n### Strategic Scope\nFormulate a strategic initiative regarding [[business_topic]] focused on ROI and operational efficiency.`;
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

  // Transform raw prompt into clean standalone domain architecture
  const basePrompt = buildDomainPrompt(inputPrompt, options.aggressiveness, options);

  // Extract variables if present in input
  const detectedVars = extractVariables(inputPrompt);
  const varSection = detectedVars.length > 0
    ? `\n\n### Input Variables\n${detectedVars.map(v => `- [[${v}]]: Parameter value for ${v}`).join('\n')}`
    : '';

  return basePrompt + varSection;
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
 */
export function adaptPromptForModel(input: string, model: 'claude' | 'openai' | 'gemini' | 'grok' | 'llama'): string {
  if (!input.trim()) return '';

  // 1. Transform raw prompt into clean domain prompt first (eradicates meta-text)
  const domainPrompt = buildDomainPrompt(input, 'medium');

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
