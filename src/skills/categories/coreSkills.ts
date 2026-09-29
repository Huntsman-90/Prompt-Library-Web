import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
  derivePreciseRole,
  extractTaskFromGeneratedPrompt,
} from '../skillHelper';

export const CORE_SKILLS: Record<string, SkillDefinition> = {
  'role-calibration': {
    id: 'role-calibration',
    name: 'RoleCalibrationSkill',
    displayName: 'Role & Persona Calibration',
    categoryId: 'core',
    description: 'Calibrates a precise, authoritative, domain-specific professional role with explicit mandate and focus.',
    tags: ['core', 'role', 'persona', 'calibration', 'authority'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      const task = extractTaskFromGeneratedPrompt(prompt) || (isRu ? 'Инженерная задача' : 'Technical directive');
      const roleSpec = derivePreciseRole(task, isRu, ['role-calibration']);

      const existingRole = sections.find((s) => s.semanticType === 'role');
      const linesRu = [
        `Вы выступаете в роли: **${roleSpec.roleTitleRu}**.`,
        `- **Специализация и фокус**: ${roleSpec.focusRu}.`,
        `- **Главный мандат**: ${roleSpec.mandateRu}`,
        '- **Стандарт качества**: Никаких поверхностных рассуждений; каждое утверждение базируется на канонической практике индустрии.',
      ];
      const linesEn = [
        `You are acting as: **${roleSpec.roleTitleEn}**.`,
        `- **Domain Focus**: ${roleSpec.focusEn}.`,
        `- **Operational Mandate**: ${roleSpec.mandateEn}`,
        '- **Rigor Standard**: Zero superficial generalizations; ground all decisions in battle-tested production principles.',
      ];

      if (existingRole) {
        existingRole.lines = isRu ? linesRu : linesEn;
      } else {
        sections.unshift({
          rawHeader: isRu ? '### 1. Роль и Профессиональный Мандат' : '### 1. Role & Professional Mandate',
          level: 3,
          title: isRu ? 'Роль и Профессиональный Мандат' : 'Role & Professional Mandate',
          cleanTitle: 'role and mandate',
          lines: isRu ? linesRu : linesEn,
          semanticType: 'role',
        });
      }

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'domain-authority': {
    id: 'domain-authority',
    name: 'DomainAuthoritySkill',
    displayName: 'Domain Authority & Rigor Enforcement',
    categoryId: 'core',
    description: 'Enforces rigorous industry taxonomy, standard nomenclature, and strict production discipline.',
    tags: ['core', 'authority', 'rigor', 'taxonomy', 'standards'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'role',
        'Требования к Отраслевой Экспертизе',
        'Domain Authority & Canonical Rigor',
        [
          '- Использовать точную отраслевую терминологию без упрощений и бытовых аналогий.',
          '- Применять канонические паттерны проектирования и общепринятые отраслевые стандарты.',
          '- Каждое решение подкреплять измеримыми критериями эффективности, надежности или безопасности.',
        ],
        [
          '- Employ canonical domain-specific nomenclature with zero colloquial dilution.',
          '- Apply established industry design patterns and formal operational standards.',
          '- Ground every recommendation in empirical efficiency, reliability, or security metrics.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'clarity-and-density': {
    id: 'clarity-and-density',
    name: 'ClarityAndDensitySkill',
    displayName: 'Information Density & Zero Fluff',
    categoryId: 'core',
    description: 'Maximizes signal-to-noise ratio, eliminating conversational preambles and cognitive filler.',
    tags: ['core', 'clarity', 'density', 'brevity', 'precision'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Информационная Плотность и Запрет на Воду',
        'Information Density & Zero-Fluff Standard',
        [
          '- **Нулевой порог вежливости**: Запрещены любые вступительные фразы («Конечно, я с радостью помогу вам...»).',
          '- **Максимальная плотность смыслов**: Использовать списки, формулы и таблицы вместо многословных абзацев.',
          '- **Удаление тавтологий**: Каждое предложение обязано нести новую смысловую или техническую нагрузку.',
        ],
        [
          '- **Zero Conversational Preamble**: Strictly omit introductory pleasantries and filler.',
          '- **High Signal Density**: Structure complex logic with tables, code contracts, and concise bullet points.',
          '- **Tautology Elimination**: Every sentence must convey unique technical or operational value.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'context-anchoring': {
    id: 'context-anchoring',
    name: 'ContextAnchoringSkill',
    displayName: 'Context & Operational Scope Anchoring',
    categoryId: 'core',
    description: 'Explicitly demarcates environmental boundaries, runtime constraints, and assumptions.',
    tags: ['core', 'context', 'scope', 'boundaries', 'assumptions'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'context',
        'Границы Контекста и Допущения',
        'Context Envelope & Operational Boundaries',
        [
          '- **Системные рамки**: Решение применимо строго в границах заданной инфраструктуры и стека технологий.',
          '- **Явные допущения**: Перед реализацией зафиксировать критические параметры среды, если они не заданы явно.',
          '- **Изоляция скоупа**: Избегать расширения задачи за пределы целевого требования.',
        ],
        [
          '- **System Envelope**: The solution applies strictly within the designated architecture and technology stack.',
          '- **Explicit Assumptions**: Clarify underlying environmental baselines before proceeding.',
          '- **Scope Isolation**: Prevent unrequested scope creep beyond target boundaries.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'objective-scoping': {
    id: 'objective-scoping',
    name: 'ObjectiveScopingSkill',
    displayName: 'Objective Scoping & Definition of Done',
    categoryId: 'core',
    description: 'Defines unambiguous target deliverables, non-goals, and concrete completion criteria.',
    tags: ['core', 'scoping', 'dod', 'goals', 'non-goals'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'context',
        'Спецификация Целей и Критерии Готовности (DoD)',
        'Objective Scoping & Definition of Done (DoD)',
        [
          '- **Главная цель**: Четко сформулировать конечный артефакт, который должен быть создан.',
          '- **Non-Goals (Что НЕ входит в задачу)**: Явно перечислить смежные области, исключенные из скоупа.',
          '- **Критерий приемки (DoD)**: Сформулировать 3 измеримых условия, подтверждающих 100% выполнение задачи.',
        ],
        [
          '- **Target Goal**: State the exact primary artifact or solution to be produced.',
          '- **Non-Goals**: Explicitly list related topics and abstractions excluded from this pass.',
          '- **Definition of Done (DoD)**: Provide 3 verifiable conditions confirming full completion.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'precision-vocabulary': {
    id: 'precision-vocabulary',
    name: 'PrecisionVocabularySkill',
    displayName: 'Precision Vocabulary & Disambiguation',
    categoryId: 'core',
    description: 'Replaces vague adjectives and fuzzy language with exact mathematical and technical definitions.',
    tags: ['core', 'vocabulary', 'precision', 'unambiguous'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Требования к Лексической Точности',
        'Lexical Precision & Disambiguation Mandate',
        [
          '- Запрещены размытые понятия («быстро», «надежно», «много»); заменять их на точные метрики (p99 latency < 50ms, 99.99% uptime).',
          '- При наличии омонимов или терминов с разной трактовкой явно указывать выбранное определение.',
        ],
        [
          '- Ban subjective descriptors ("fast", "reliable", "scalable"); mandate quantifiable metrics (e.g. p99 < 50ms, 99.99% SLA).',
          '- Explicitly disambiguate overloaded technical terms upon first introduction.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'cognitive-load-reduction': {
    id: 'cognitive-load-reduction',
    name: 'CognitiveLoadReductionSkill',
    displayName: 'Cognitive Load Reduction & Framing',
    categoryId: 'core',
    description: 'Formats complex directives into bite-sized hierarchical chunks with high visual scanning efficiency.',
    tags: ['core', 'ux', 'cognitive-load', 'scannability'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Иерархия Подачи и Снижение Когнитивной Нагрузки',
        'Cognitive Load Optimization & Visual Hierarchy',
        [
          '- Использовать принцип «Главное вперед»: ключевой вывод в первой строке каждого подраздела.',
          '- Разбивать списки длиннее 5 пунктов на логические смысловые группы с подзаголовками.',
          '- Выделять ключевые сущности жирным шрифтом для быстрого сканирования глазами.',
        ],
        [
          '- Front-load key takeaways: deliver primary verdict in the first line of each section.',
          '- Partition lists exceeding 5 items into themed sub-groups with distinct subheaders.',
          '- Bold critical entities and invariants to ensure effortless visual scanning.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'assumption-demarcation': {
    id: 'assumption-demarcation',
    name: 'AssumptionDemarcationSkill',
    displayName: 'Assumption & Dependency Demarcation',
    categoryId: 'core',
    description: 'Surfaces all implicit architectural dependencies and hidden assumptions before solution design.',
    tags: ['core', 'assumptions', 'dependencies', 'risk'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'context',
        'Явная Фиксация Зависимостей и Допущений',
        'Explicit Dependencies & Baseline Assumptions',
        [
          '- **Внешние зависимости**: Перечислить сторонние API, базы данных, сервисы авторизации и версии сред.',
          '- **Допущения о нагрузке**: Указать ожидаемый профиль трафика (RPS, concurrency, read/write ratio).',
          '- **Условия отказа**: Зафиксировать поведение системы при недоступности внешних компонентов.',
        ],
        [
          '- **External Dependencies**: Itemize 3P APIs, storage engines, auth providers, and runtime versions.',
          '- **Workload Assumptions**: State traffic profiles (RPS, concurrency, read/write ratios).',
          '- **Failure Fallbacks**: Specify degraded behavior mode when upstream dependencies fault.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'executive-tone-calibration': {
    id: 'executive-tone-calibration',
    name: 'ExecutiveToneCalibrationSkill',
    displayName: 'Executive Decisive Tone Calibration',
    categoryId: 'core',
    description: 'Enforces a confident, objective, matter-of-fact tone suitable for senior leadership briefings.',
    tags: ['core', 'tone', 'executive', 'leadership', 'voice'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Тональность и Стиль Подачи',
        'Tone Calibration & Executive Posture',
        [
          '- Тон: уверенный, сдержанный, аналитический, ориентированный на принятие бизнес- и инженерных решений.',
          '- Избегать робких выражений («возможно», «мне кажется», «я попробую»); формулировать прямые утверждения.',
        ],
        [
          '- Posture: assertive, dispassionate, analytical, geared for decisive enterprise trade-offs.',
          '- Eliminate timid hedges ("perhaps", "it seems to me", "maybe"); deliver unambiguous assessments.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'audience-calibration': {
    id: 'audience-calibration',
    name: 'AudienceCalibrationSkill',
    displayName: 'Target Audience Profile Calibration',
    categoryId: 'core',
    description: 'Aligns the technical depth, terminology, and deliverables directly to the target stakeholder profile.',
    tags: ['core', 'audience', 'stakeholder', 'calibration'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'context',
        'Профиль Целевой Аудитории (Audience ICP)',
        'Target Audience & Stakeholder Profile',
        [
          '- Адаптировать глубину технического изложения под квалификацию читателя: Senior/Staff Engineer или C-Level Executive.',
          '- Приводить необходимые детали реализации без перегрузки тривиальными разъяснениями базовых концепций.',
        ],
        [
          '- Calibrate technical depth to reader archetype: Staff/Principal Engineer or Executive Sponsor.',
          '- Provide deep structural mechanics without patronizing explanations of entry-level fundamentals.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'task-isolation': {
    id: 'task-isolation',
    name: 'TaskIsolationSkill',
    displayName: 'Task Isolation & Atomic Execution',
    categoryId: 'core',
    description: 'Isolates the core directive into a pure, self-contained unit of work with no leaky side-effects.',
    tags: ['core', 'isolation', 'atomic', 'modularity'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Изоляция Задачи и Атомарное Исполнение',
        'Task Isolation & Atomic Execution Contract',
        [
          '- Сконцентрироваться строго на решении изолированного фрагмента задачи; не переписывать смежные модули без запроса.',
          '- Гарантировать обратную совместимость всех создаваемых интерфейсов с существующим окружением.',
        ],
        [
          '- Focus strictly on solving the atomic target problem; do not refactor adjacent modules unprompted.',
          '- Guarantee full backward compatibility with surrounding runtime interfaces.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'anti-ambiguity-anchor': {
    id: 'anti-ambiguity-anchor',
    name: 'AntiAmbiguityAnchorSkill',
    displayName: 'Anti-Ambiguity Spec Anchor',
    categoryId: 'core',
    description: 'Detects ambiguous requirement vectors and forces explicit disambiguation upfront.',
    tags: ['core', 'spec', 'disambiguation', 'clarity'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Устранение Неоднозначностей ТЗ',
        'Requirement Disambiguation Protocol',
        [
          '- При наличии взаимоисключающих требований явно указать на конфликт и обосновать выбранный приоритет.',
          '- Зафиксировать границы интерпретации пользовательского ввода в первом блоке ответа.',
        ],
        [
          '- In the event of competing requirement trade-offs, state conflict explicitly and justify priority choice.',
          '- Anchor the chosen interpretation baseline in the opening lines of deliverable.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'first-principles-foundation': {
    id: 'first-principles-foundation',
    name: 'FirstPrinciplesFoundationSkill',
    displayName: 'First-Principles Core Grounding',
    categoryId: 'core',
    description: 'Grounds every core design decision in foundational laws of computer science and economics.',
    tags: ['core', 'first-principles', 'foundations', 'grounding'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Фундаментальное Обоснование (First Principles)',
        'Foundational First-Principles Grounding',
        [
          '- Обосновывать выбранную архитектуру базовыми законами распределенных систем (CAP, PACELC, Little\'s Law, Amdahl\'s Law).',
          '- Не ссылаться на авторитеты или тренды; доказывать корректность решения через математические инварианты.',
        ],
        [
          '- Justify architecture against fundamental computing theorems (CAP, PACELC, Little\'s Law, Amdahl\'s Law).',
          '- Eschew trend-following; prove solution validity through structural invariants and resource limits.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'multi-persona-council': {
    id: 'multi-persona-council',
    name: 'MultiPersonaCouncilSkill',
    displayName: 'Multi-Persona Expert Council',
    categoryId: 'core',
    description: 'Evaluates the core task through the tri-perspective lens of Architect, Security Auditor, and SRE Lead.',
    tags: ['core', 'council', 'perspectives', 'triangulation'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Триангуляция Экспертного Совета (Council Perspective)',
        'Triangulated Expert Council Perspectives',
        [
          '- **Staff Software Architect**: Оценка модульности, типобезопасности и долгосрочной расширяемости.',
          '- **Principal Security Engineer**: Оценка векторов атак, утечек памяти и валидации границ.',
          '- **SRE & Reliability Lead**: Оценка отказоустойчивости, деградации под нагрузкой и наблюдаемости.',
        ],
        [
          '- **Staff Software Architect**: Modularity, static typing invariants, and extensibility.',
          '- **Principal Security Engineer**: Threat vectors, memory bounds, and boundary schema validation.',
          '- **SRE & Reliability Lead**: Failure domains, backpressure under load, and observability instrumentation.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
