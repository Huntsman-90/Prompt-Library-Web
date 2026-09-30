import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const MISCELLANEOUS_SKILLS: Record<string, SkillDefinition> = {
  'eisenhower-matrix-priority': {
    id: 'eisenhower-matrix-priority',
    name: 'EisenhowerMatrixPrioritySkill',
    displayName: 'Eisenhower Priority Matrix (Urgent vs. Important)',
    categoryId: 'miscellaneous',
    description: 'Categorizes tasks across the 4 Eisenhower quadrants: Q1 (Do First), Q2 (Schedule), Q3 (Delegate), Q4 (Eliminate).',
    tags: ['miscellaneous', 'productivity', 'eisenhower-matrix', 'prioritization', 'time-management'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Матрица Приоритетов Эйзенхауэра (4 Квадранта)',
        'Eisenhower 4-Quadrant Priority Matrix Specification',
        [
          '- **Квадрант 1: Срочно и Важно (Сделать немедленно)**: Критические дедлайны и аварийные задачи.',
          '- **Квадрант 2: Не срочно, но Важно (Стратегический фокус)**: Долгосрочное планирование, обучение, рефакторинг.',
          '- **Квадрант 3: Срочно, но Не важно (Делегировать)**: Рутинные запросы, чужие срочные задачи.',
          '- **Квадрант 4: Не срочно и Не важно (Устранить)**: Отвлекающие факторы и пожиратели времени.',
        ],
        [
          '- **Quadrant 1 (Urgent & Important - Do STAT)**: Crises, production blockers, and hard deadline obligations.',
          '- **Quadrant 2 (Not Urgent & Important - Schedule & Protect)**: Deep strategic engineering, architecture reviews, and self-care.',
          '- **Quadrant 3 (Urgent & Not Important - Delegate)**: Interruptions, transactional meeting requests, and standard admin tasks.',
          '- **Quadrant 4 (Not Urgent & Not Important - Eliminate)**: Time-wasting non-productive activities to purge ruthlessly.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'pomodoro-time-blocking': {
    id: 'pomodoro-time-blocking',
    name: 'PomodoroTimeBlockingSkill',
    displayName: 'Pomodoro Time-Blocking & Focus Schedule',
    categoryId: 'miscellaneous',
    description: 'Constructs daily deep-work schedules using 25-minute focus sprints (Pomodoros) and structured restorative breaks.',
    tags: ['miscellaneous', 'pomodoro', 'time-blocking', 'focus', 'productivity', 'deep-work'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Расписание Фокус-Сессий (Pomodoro Time-Blocking)',
        'Pomodoro Deep-Work & Time-Blocking Schedule',
        [
          '- **Блоки фокуса (25 мин)**: Четко сформулированная единичная микро-задача на каждый спринт без переключения контекста.',
          '- **Короткие перерывы (5 мин)**: Полный отказ от экранов (разминка, вода, дыхательные практики).',
          '- **Длинный перерыв (20–30 мин)**: Восстановительная пауза после каждых 4 циклов работы.',
        ],
        [
          '- **25-Minute Deep Focus Sprints**: Single-task focus block eliminating context switching and notification distractions.',
          '- **5-Minute Physical Rest Cycles**: Screen-free restorative micro-breaks (hydration, physical stretching, breathing).',
          '- **Long Rest Interval (20-30 min)**: Extended restorative break scheduled after every 4 completed Pomodoro cycles.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'smart-goals-formulator': {
    id: 'smart-goals-formulator',
    name: 'SmartGoalsFormulatorSkill',
    displayName: 'SMART Goal Formulation Engine',
    categoryId: 'miscellaneous',
    description: 'Refines vague aspirations into rigorous SMART goals: Specific, Measurable, Achievable, Relevant, and Time-bound.',
    tags: ['miscellaneous', 'smart-goals', 'goals', 'planning', 'execution', 'productivity'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Формулирование Целей по Методологии SMART',
        'SMART Goal Formulation Specification',
        [
          '- **[S] Specific (Конкретная)**: Что именно должно быть сделано, кто участвует и где.',
          '- **[M] Measurable (Измеримая)**: Точный числовой критерий проверки успеха (метрика, сумма, процент).',
          '- **[A] Achievable (Достижимая)**: Реалистичность выполнения с учетом имеющихся ресурсов и компетенций.',
          '- **[R] Relevant (Актуальная)**: Соответствие глобальным стратегическим приоритетам.',
          '- **[T] Time-bound (Ограниченная во времени)**: Точная календарная дата дедлайна.',
        ],
        [
          '- **[S] Specific**: Unambiguous, crystal-clear operational objective detailing exact scope and stakeholders.',
          '- **[M] Measurable**: Quantifiable success benchmark (exact numeric threshold, percentage lift, or financial metric).',
          '- **[A] Achievable**: Grounded feasibility assessment validated against available headcount and bandwidth.',
          '- **[R] Relevant**: Direct alignment with overarching strategic business priorities.',
          '- **[T] Time-Bound**: Explicit calendar deadline date and milestone checkpoints.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'meeting-agenda-action-items': {
    id: 'meeting-agenda-action-items',
    name: 'MeetingAgendaActionItemsSkill',
    displayName: 'High-Efficiency Meeting Agenda & Action Items',
    categoryId: 'miscellaneous',
    description: 'Formats high-efficiency meeting agendas with pre-read materials, timed topic blocks, and an Action Items ledger.',
    tags: ['miscellaneous', 'meeting', 'agenda', 'action-items', 'collaboration', 'productivity'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Повестка Совещания и Протокол Решений (Meeting Agenda)',
        'High-Efficiency Meeting Agenda & Action Items Spec',
        [
          '- **Обязательные материалы (Pre-read)**: Документы, которые участники обязаны прочитать до начала встречи.',
          '- **Тайминг тем**: Блоки обсуждения с жестким лимитом времени (например: 10 мин — разбор проблемы, 15 мин — выбор решения).',
          '- **Таблица решений (Action Items)**: `| Действие | Ответственный | Дедлайн | Зависимости |`.',
        ],
        [
          '- **Mandatory Pre-Read Materials**: Essential background memos and schemas participants must digest prior to call start.',
          '- **Time-Boxed Discussion Blocks**: Tight time allocations per agenda topic (e.g. 10m Problem Context -> 15m Architecture Options -> 5m Decision).',
          '- **Action Items Table**: Deliverable table formatted as: `| Action Item | Single Owner | Due Date | Verification Check |`.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'personal-productivity-gtd': {
    id: 'personal-productivity-gtd',
    name: 'PersonalProductivityGtdSkill',
    displayName: 'Getting Things Done (GTD) Workflow',
    categoryId: 'miscellaneous',
    description: 'Implements David Allen\'s GTD: Capture (Inbox), Clarify (2-min rule), Organize (Contexts), Reflect (Weekly Review), Engage.',
    tags: ['miscellaneous', 'gtd', 'productivity', 'david-allen', 'task-management', 'workflow'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Система Продуктивности GTD (Getting Things Done)',
        'David Allen Getting Things Done (GTD) Protocol',
        [
          '- **1. Сбор (Capture)**: Фиксация всех входящих задач в единый входящий ящик (Inbox).',
          '- **2. Обработка (Clarify)**: Применение правила 2 минут (если задача занимает < 2 мин — сделать немедленно, иначе отложить/делегировать).',
          '- **3. Организация (Organize)**: Сортировка по контекстам (`@computer`, `@calls`, `@waiting_for`, `Someday/Maybe`).',
          '- **4. Еженедельный обзор (Weekly Review)**: Очистка входящих и перекалибровка приоритетов раз в неделю.',
        ],
        [
          '- **1. Capture Phase**: Ingest all incoming commitments into a centralized trusted Inbox buffer.',
          '- **2. Clarify Phase**: Enforce 2-minute rule (execute immediately if < 2 mins; otherwise defer, delegate, or calendar).',
          '- **3. Organize Phase**: Categorize tasks into contextual action lists (`@code`, `@calls`, `@waiting_for`, `Someday/Maybe`).',
          '- **4. Weekly Review Phase**: Conduct systematic weekly audit of all open loops and archive resolved initiatives.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'executive-travel-itinerary': {
    id: 'executive-travel-itinerary',
    name: 'ExecutiveTravelItinerarySkill',
    displayName: 'Executive Travel Itinerary & Logistics Matrix',
    categoryId: 'miscellaneous',
    description: 'Formats detailed international business travel itineraries: flights, hotel confirmation, meeting buffer times, and contingency contacts.',
    tags: ['miscellaneous', 'travel', 'itinerary', 'executive', 'logistics', 'planning'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Маршрут Командировки (Executive Travel Itinerary)',
        'Executive Travel Itinerary & Logistics Schedule',
        [
          '- **Хронологический график**: Почасовой тайминг с учетом перелетов, трансферов, разницы часовых поясов и буферов на пробки.',
          '- **Сводка бронирований**: Номера рейсов, терминалы, адреса отелей, контакты координаторов и номера броней.',
          '- **План встреч**: Список адресов встреч, имена участников, дресс-код и ссылки на материалы к переговорам.',
        ],
        [
          '- **Chronological Logistics Schedule**: Hour-by-hour timeline accounting for timezone transitions, transit buffers, and airport security.',
          '- **Consolidated Booking Ledger**: Confirmation codes, flight numbers, terminals, hotel addresses, and emergency logistics contacts.',
          '- **Meeting Schedule Dossier**: Meeting locations, attendee profiles, dress codes, and linked executive briefing documents.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'unit-converter-dimensional': {
    id: 'unit-converter-dimensional',
    name: 'UnitConverterDimensionalSkill',
    displayName: 'Dimensional Multi-Unit Converter & Physics Math',
    categoryId: 'miscellaneous',
    description: 'Executes high-precision unit conversions across Metric/Imperial, currency exchange rates, bandwidth (Gbps to TB/month), and coordinates.',
    tags: ['miscellaneous', 'converter', 'units', 'math', 'metric', 'imperial', 'physics'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Конвертация Единиц Измерения и Размерностей',
        'Dimensional Multi-Unit Conversion Protocol',
        [
          '- **Точные формулы пересчета**: Приводить промежуточные математические преобразования и коэффициенты перевода.',
          '- **Проверка размерности**: Контролировать соответствие физических единиц (байты, биты/сек, джоули, ватты).',
          '- **Округление и значащие цифры**: Сохранять корректное количество значащих цифр без потери точности.',
        ],
        [
          '- **Explicit Conversion Formulas**: Show dimensional conversion multipliers and step-by-step mathematical cancellation.',
          '- **Dimensional Validation**: Rigorously verify physical units (bytes vs bits, MB/s vs Mbps, Joules vs Watts).',
          '- **Significant Figure Precision**: Preserve proper significant figures and state rounded approximations explicitly.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'decision-journal-record': {
    id: 'decision-journal-record',
    name: 'DecisionJournalRecordSkill',
    displayName: 'Farnam Street Decision Journal Record',
    categoryId: 'miscellaneous',
    description: 'Documents major decisions: mental state, context, alternatives considered, expected outcome distribution, and 6-month review date.',
    tags: ['miscellaneous', 'decision-journal', 'mental-models', 'farnam-street', 'rationality', 'judgment'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Журнал Принятия Решений (Decision Journal Entry)',
        'Farnam Street Decision Journal Specification',
        [
          '- **Контекст и эмоциональное состояние**: Зафиксировать текущую обстановку, уровень стресса и доступную информацию на момент решения.',
          '- **Рассмотренные альтернативы**: Описать минимум 2 отвергнутых варианта и причины отказа от них.',
          '- **Прогнозируемые результаты (6 месяцев)**: Записать конкретные проверяемые ожидания и дату ретроспективного анализа.',
        ],
        [
          '- **Context & Emotional State**: Document environmental context, stress levels, and information state at decision time.',
          '- **Evaluated & Rejected Alternatives**: Document at least 2 alternative options that were seriously considered and rejected.',
          '- **Predicted Outcome Distribution (6-Month Review)**: State falsifiable predictions and calendar a 6-month retrospective audit date.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'checklist-manifesto-aviation': {
    id: 'checklist-manifesto-aviation',
    name: 'ChecklistManifestoAviationSkill',
    displayName: 'Aviation-Standard "Do-Confirm" Checklist',
    categoryId: 'miscellaneous',
    description: 'Designs aviation-grade "DO-CONFIRM" and "READ-DO" checklists to prevent human cognitive oversight during complex operations.',
    tags: ['miscellaneous', 'checklist', 'aviation', 'gawande', 'safety', 'operations'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Авиационный Контрольный Чеклист (Do-Confirm Format)',
        'Aviation-Grade "Do-Confirm" Checklist Specification',
        [
          '- **Формат «Действие — Проверка»**: `[Элемент / Система] .................... [Статус / Проверено]`.',
          '- **Краткость и однозначность**: Каждый пункт должен состоять из 3–5 слов и проверяться за 2 секунды.',
          '- **Критические точки останова (Pause Points)**: Четкие фазы, переход к которым запрещен без полного прохождения чеклиста.',
        ],
        [
          '- **"Do-Confirm" Item Syntax**: Format: `[Target Subsystem / Control] .................... [VERIFIED / ACTIVE / SECURED]`.',
          '- **Brevity Standard**: Items must contain 3-5 words and be verifiable within 2 seconds without cognitive ambiguity.',
          '- **Explicit Pause Points**: Hard procedural gates prohibiting phase advancement until 100% of checklist gates are confirmed.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'kanban-wip-limits': {
    id: 'kanban-wip-limits',
    name: 'KanbanWipLimitsSkill',
    displayName: 'Kanban Board & Strict WIP Limit Flow',
    categoryId: 'miscellaneous',
    description: 'Designs Kanban flow boards with explicit Work-In-Progress (WIP) column limits, pull triggers, and blocker escalation policies.',
    tags: ['miscellaneous', 'kanban', 'wip-limits', 'agile', 'flow', 'project-management'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Спецификация Доски Kanban с Лимитами WIP',
        'Kanban Flow Board & Strict WIP Limit Specification',
        [
          '- **Колонки и лимиты WIP**: `Backlog -> Ready -> In Progress [WIP: 3] -> Review [WIP: 2] -> Done`.',
          '- **Политика вытягивания (Pull System)**: Новая задача берется в работу только при освобождении слота в колонке.',
          '- **Регламент блокировок**: При возникновении блокера вся команда фокусируется на его устранении до взятия новых задач.',
        ],
        [
          '- **Columns & Hard WIP Caps**: Define stages: `Backlog -> Ready -> Development [WIP: 3] -> Code Review [WIP: 2] -> Done`.',
          '- **Pull Mechanism**: Workers pull new tasks only when downstream column capacity drops below declared WIP ceiling.',
          '- **Blocker Swarm Policy**: When an item is flagged as blocked, team prioritizes swarm resolution before starting new work.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'cognitive-bias-codex-audit': {
    id: 'cognitive-bias-codex-audit',
    name: 'CognitiveBiasCodexAuditSkill',
    displayName: 'Cognitive Bias Codex Audit & De-Biasing',
    categoryId: 'miscellaneous',
    description: 'Audits strategic decisions against top cognitive biases: Confirmation Bias, Anchoring, Sunk Cost Fallacy, Availability Heuristic.',
    tags: ['miscellaneous', 'cognitive-bias', 'de-biasing', 'psychology', 'critical-thinking', 'rationality'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Аудит Когнитивных Искажений (Cognitive Bias Audit)',
        'Cognitive Bias Codex Audit & De-Biasing Protocol',
        [
          '- **Проверка на предвзятость подтверждения (Confirmation Bias)**: Активно искать данные, опровергающие любимую гипотезу команды.',
          '- **Аудит невозвратных затрат (Sunk Cost Fallacy)**: Оценивать продолжение проекта исключительно по будущей отдаче, игнорируя уже потраченные деньги.',
          '- **Защита от якорения (Anchoring)**: Проверить, не привязана ли оценка сроков или стоимости к первой случайно названной цифре.',
        ],
        [
          '- **Confirmation Bias Disruption**: Actively harvest empirical evidence disproving the team\'s favored hypothesis.',
          '- **Sunk Cost Neutralization**: Evaluate project continuation strictly based on forward-looking ROI, disregarding sunk capital.',
          '- **Anchoring Effect De-Biasing**: Verify that cost/schedule estimates are not artificially anchored to early arbitrary figures.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'habit-loop-cue-routine-reward': {
    id: 'habit-loop-cue-routine-reward',
    name: 'HabitLoopCueRoutineRewardSkill',
    displayName: 'Atomic Habit Loop Architecture (Cue-Craving-Routine-Reward)',
    categoryId: 'miscellaneous',
    description: 'Designs sustainable behavioral habit loops using James Clear & Charles Duhigg\'s 4 laws: Make it Obvious, Attractive, Easy, Satisfying.',
    tags: ['miscellaneous', 'habits', 'behavioral-design', 'atomic-habits', 'psychology', 'routines'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Архитектура Привычек (Atomic Habits Loop)',
        'Atomic Habit Loop Specification (Cue — Craving — Routine — Reward)',
        [
          '- **1. Триггер (Cue / Сделай очевидным)**: Привязать привычку к существующему действию: «После того, как я [Текущая привычка], я сделаю [Новая привычка]».',
          '- **2. Желание (Craving / Сделай привлекательным)**: Объединить полезное действие с приятным (Temptation Bundling).',
          '- **3. Действие (Routine / Сделай простым)**: Правило 2 минут — новое действие должно занимать менее 2 минут на старте.',
          '- **4. Награда (Reward / Сделай приносящим удовлетворение)**: Немедленное положительное подкрепление и трекинг в календаре.',
        ],
        [
          '- **1. Cue (Make it Obvious)**: Habit stacking anchor: "After I [Established Habit], I will immediately [Target New Habit]".',
          '- **2. Craving (Make it Attractive)**: Pair habit execution with an immediate dopamine-releasing activity (Temptation Bundling).',
          '- **3. Response (Make it Easy)**: Enforce the 2-minute rule ensuring entry friction is near-zero.',
          '- **4. Reward (Make it Satisfying)**: Instant sensory feedback and persistent visual streak tracking.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'event-planning-logistics-matrix': {
    id: 'event-planning-logistics-matrix',
    name: 'EventPlanningLogisticsMatrixSkill',
    displayName: 'Master Event Logistics & Vendor Matrix',
    categoryId: 'miscellaneous',
    description: 'Coordinates physical and hybrid events: venue capacity, AV technical riders, catering headcount, signage, and emergency protocols.',
    tags: ['miscellaneous', 'event-planning', 'logistics', 'catering', 'av-tech', 'coordination'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Матрица Логистики Мероприятия (Event Master Matrix)',
        'Master Event Logistics & Vendor Coordination Matrix',
        [
          '- **Технический райдер (AV & Streaming)**: Микрофоны, проекторы, резервный интернет-канал и оборудование для трансляции.',
          '- **Кейтеринг и логистика**: Расчет питания, учет пищевых аллергий (веган/безглютен), навигация и бейджи участников.',
          '- **План безопасности и экстренной эвакуации**: Медицинский персонал, пожарные выходы и связь с охраной площадки.',
        ],
        [
          '- **AV & Technical Production Rider**: Audio mics, redundant 1Gbps uplink lines, stage lighting, and recording encoders.',
          '- **Catering & Hospitality Matrix**: Headcount scaling, dietary accommodations (vegan/GF), registration flow, and signage placement.',
          '- **Safety & Emergency Protocol**: First aid station location, evacuation routes, and dedicated security coordinator radio channels.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'quarterly-personal-review': {
    id: 'quarterly-personal-review',
    name: 'QuarterlyPersonalReviewSkill',
    displayName: 'Quarterly Personal Life & Career Audit',
    categoryId: 'miscellaneous',
    description: 'Facilitates structured quarterly personal audits: energy audit, high-leverage wins, friction points, and calibrated goal setting.',
    tags: ['miscellaneous', 'personal-review', 'reflection', 'career', 'goals', 'self-improvement'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Квартальный Личный Аудит (Quarterly Review)',
        'Quarterly Personal Life & Career Audit Protocol',
        [
          '- **1. Аудит энергии**: Какие активности давали максимум энергии и драйва, а какие вызывали истощение?',
          '- **2. Главные победы квартала**: 3 ключевых достижения, изменивших траекторию развития карьеры или жизни.',
          '- **3. Уроки из неудач**: Главные ошибки и выработанные правила для их ненаступления в будущем.',
          '- **4. Фокус на следующий квартал**: Выбор 1 главной цели и 3 поддерживающих привычек.',
        ],
        [
          '- **1. Energy Audit**: Catalog high-vitality flow activities vs. soul-draining energy drains over the preceding 90 days.',
          '- **2. Top 3 Trajectory-Altering Wins**: Celebrate the 3 highest-leverage milestones achieved.',
          '- **3. Crucible Learnings**: Extract actionable mental rules from failures and friction points.',
          '- **4. Next-Quarter Keystone Focus**: Select 1 keystone objective and 3 supporting daily ritual habits.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

'negotiation-batna-preparation': {
    id: 'negotiation-batna-preparation',
    name: 'NegotiationBatnaPreparationSkill',
    displayName: 'Strategic Negotiation Preparation (BATNA & ZOPA)',
    categoryId: 'miscellaneous',
    description: 'Prepares for high-stakes negotiations: defines BATNA, establishes reservation price, and maps Zone of Possible Agreement (ZOPA).',
    tags: ['miscellaneous', 'negotiation', 'batna', 'zopa', 'strategy', 'dealmaking'],
    transform: createStandardSkillTransform({
sectionName: 'Strategic Negotiation Preparation (BATNA & ZOPA)',
      ruSectionName: 'Стратегическая подготовка к переговорам (BATNA и ZOPA)',
      instructions: [
        'Determine your Best Alternative To a Negotiated Agreement (BATNA): clarify the concrete walk-away alternative if negotiations collapse.',
        'Establish an unambiguous Reservation Price (walk-away floor/ceiling) below which you will definitively decline the deal.',
        'Map the counterparty\'s probable interests, pressure points, timelines, and Zone of Possible Agreement (ZOPA).',
        'Identify multiple non-monetary tradeable currency chips (payment terms, exclusivity, publicity, delivery dates) to expand total deal value.',
      ],
      ruInstructions: [
        'Определите вашу наилучшую альтернативу несогласию (BATNA): четкий план действий на случай провала переговоров.',
        'Установите жесткую точку выхода (Reservation Price) — предельную планку условий, за рамками которой сделка теряет смысл.',
        'Смоделируйте интересы и болевые точки оппонента, его временные ограничения и диапазон возможного соглашения (ZOPA).',
        'Сформируйте пул немонетарных разменных монет (сроки оплаты, эксклюзивность, гарантии), расширяющих суммарную ценность сделки.',
      ],
      semanticType: 'process_directive',
      tags: ['miscellaneous', 'negotiation', 'batna', 'zopa', 'strategy', 'dealmaking'],
    }),
  },

  'okr-cascading-framework': {
    id: 'okr-cascading-framework',
    name: 'OkrCascadingFrameworkSkill',
    displayName: 'Objectives & Key Results (OKR) Cascading Architecture',
    categoryId: 'miscellaneous',
    description: 'Formulates ambitious qualitative Objectives paired with 3-5 quantitatively measurable Key Results graded on a 0.0-1.0 scale.',
    tags: ['miscellaneous', 'okr', 'management', 'goal-setting', 'alignment'],
    transform: createStandardSkillTransform({
sectionName: 'OKR Architecture & Cascading Protocol',
      ruSectionName: 'Архитектура целей и ключевых результатов (OKR Framework)',
      instructions: [
        'Formulate qualitative, inspirational Objectives (O) that set a clear directional destination for the quarter.',
        'Pair each Objective with 3-5 quantitative Key Results (KRs) measuring business outcomes, never mundane to-do activities or task outputs.',
        'Set target difficulty so that achieving a 0.7 (70%) score represents ambitious success; a 1.0 indicates sandbagging.',
        'Cascade organizational OKRs downward into team-level and individual OKRs ensuring vertical alignment and mutual transparency.',
      ],
      ruInstructions: [
        'Формулируйте амбициозные вдохновляющие качественные Цели (Objectives), задающие вектор развития на квартал.',
        'Привязывайте к каждой цели от 3 до 5 количественных Ключевых Результатов (Key Results), измеряющих бизнес-эффект, а не список задач.',
        'Калибруйте сложность так, чтобы выполнение на 70% (0.7) считалось отличным результатом, а 100% означало заниженную планку.',
        'Каскадируйте OKR компании на уровень команд и отделов, обеспечивая сквозную прозрачность и согласованность усилий.',
      ],
      semanticType: 'structural_directive',
      tags: ['miscellaneous', 'okr', 'management', 'goal-setting', 'alignment'],
    }),
  },

  'cross-cultural-communication-hofstede': {
    id: 'cross-cultural-communication-hofstede',
    name: 'CrossCulturalCommunicationHofstedeSkill',
    displayName: 'Hofstede Cultural Dimensions Communication Adapter',
    categoryId: 'miscellaneous',
    description: 'Calibrates communication across Power Distance, Individualism, Uncertainty Avoidance, and High/Low Context cultural norms.',
    tags: ['miscellaneous', 'cross-cultural', 'hofstede', 'communication', 'global-business'],
    transform: createStandardSkillTransform({
sectionName: 'Cross-Cultural Communication Calibration',
      ruSectionName: 'Межкультурная коммуникация по измерениям Хофстеде',
      instructions: [
        'Analyze counterpart culture across Hofstede\'s dimensions: Power Distance Index (PDI), Individualism vs Collectivism, and Uncertainty Avoidance.',
        'Adapt context levels: Low-Context (explicit, direct, literal agreements) vs High-Context (implicit relationships, non-verbal nuance, reading between the lines).',
        'Calibrate feedback delivery style: direct constructive critique vs indirect saving-face diplomacy.',
        'Respect local business rituals regarding punctuality, hierarchy protocols, gift giving, and relationship-building dining customs.',
      ],
      ruInstructions: [
        'Анализируйте культуру собеседника по измерениям Хофстеде: дистанция власти, индивидуализм/коллективизм и избегание неопределенности.',
        'Адаптируйте уровень контекста: низкоконтекстные культуры (прямолинейность, опора на текст) против высококонтекстных (подтекст, личные отношения).',
        'Подбирайте стиль обратной связи: прямая конструктивная критика против мягких намеков и сохранения лица собеседника.',
        'Учитывайте деловой этикет в отношении субординации, отношения ко времени (монохронность/полихронность) и неформального общения.',
      ],
      semanticType: 'behavior_directive',
      tags: ['miscellaneous', 'cross-cultural', 'hofstede', 'communication', 'global-business'],
    }),
  },

  'meeting-cost-ticker-reduction': {
    id: 'meeting-cost-ticker-reduction',
    name: 'MeetingCostTickerReductionSkill',
    displayName: 'Meeting Elimination & Asynchronous Decision Memo',
    categoryId: 'miscellaneous',
    description: 'Eliminates low-value status meetings, calculates attendee hourly dollar costs, and transitions teams to async 1-page decision memos.',
    tags: ['miscellaneous', 'meetings', 'productivity', 'async-work', 'time-management'],
    transform: createStandardSkillTransform({
sectionName: 'Meeting Elimination & Async Memo Protocol',
      ruSectionName: 'Сокращение совещаний и асинхронные меморандумы решений',
      instructions: [
        'Default to asynchronous written communication: if the purpose is informational status updates, strictly cancel the meeting.',
        'Calculate meeting cost: multiply number of attendees by average fully loaded hourly rate; require executive justification if cost exceeds $500.',
        'When decisions are required, circulate a 1-page Silent Reading Memo 24 hours in advance with a 10-minute silent reading block.',
        'Enforce strict meeting discipline: mandatory objective agenda, 25/50 minute durations (preserving transition buffers), and instant written action logs.',
      ],
      ruInstructions: [
        'Делайте выбор в пользу асинхронного текста: если цель встречи — информирование о статусе, совещание должно быть отменено.',
        'Считайте себестоимость собрания: умножайте количество участников на среднюю почасовую ставку (если встреча стоит дороже $500, обоснуйте ее необходимость).',
        'Для принятия решений рассылайте одностраничное мемо за 24 часа с выделением первых 10 минут встречи на тихое вдумчивое чтение.',
        'Соблюдайте тайм-менеджмент: четкая повестка, длительность 25 или 50 минут (с буфером на отдых) и фиксация договоренностей в протокол.',
      ],
      semanticType: 'process_directive',
      tags: ['miscellaneous', 'meetings', 'productivity', 'async-work', 'time-management'],
    }),
  },

  'inbox-zero-email-triaging': {
    id: 'inbox-zero-email-triaging',
    name: 'InboxZeroEmailTriagingSkill',
    displayName: 'Inbox Zero & 4D Triage Architecture',
    categoryId: 'miscellaneous',
    description: 'Clears email overload using Merlin Mann\'s 4D methodology: Delete, Delegate, Do (under 2 minutes), or Defer (task calendar).',
    tags: ['miscellaneous', 'inbox-zero', 'email', 'productivity', 'time-management'],
    transform: createStandardSkillTransform({
      sectionName: 'Inbox Zero 4D Triaging Protocol',
      ruSectionName: 'Методика Inbox Zero и триаж почты по системе 4D',
      instructions: [
        'Process incoming messages in dedicated batch sessions (2-3 times daily); disable intrusive real-time desktop notifications.',
        'Apply the 4D decision rule immediately to every email: 1) Delete/Archive, 2) Delegate to colleague, 3) Do immediately if under 2 minutes, 4) Defer to task queue.',
        'Never use your inbox as a to-do list; extract action items into an authoritative task tracker and archive the parent message.',
        'Adopt radical email brevity: write concise messages under 5 sentences with clear bold action items and explicit deadlines.',
      ],
      ruInstructions: [
        'Разбирайте входящую почту 2–3 раза в день фиксированными интервалами; отключите всплывающие уведомления.',
        'Применяйте правило 4D к каждому письму: 1) Удалить/Архивировать, 2) Делегировать, 3) Сделать сразу (если занимает до 2 минут), 4) Отложить в таск-менеджер.',
        'Никогда не используйте почтовый ящик как список задач: выносите задачи в трекер, а само письмо отправляйте в архив.',
        'Пишите лаконично: формулируйте ответы не длиннее 5 предложений с четко выделенными жирным действиями и дедлайнами.',
      ],
      semanticType: 'process_directive',
      tags: ['miscellaneous', 'inbox-zero', 'email', 'productivity', 'time-management'],
    }),
  },

  'sleep-circadian-rhythm-optimization': {
    id: 'sleep-circadian-rhythm-optimization',
    name: 'SleepCircadianRhythmOptimizationSkill',
    displayName: 'Circadian Rhythm & Sleep Architecture Protocol',
    categoryId: 'miscellaneous',
    description: 'Applies sleep science: 90-minute sleep cycles, light exposure timing, adenosine clearance, and temperature regulation.',
    tags: ['miscellaneous', 'sleep-science', 'circadian-rhythm', 'health', 'wellness', 'energy'],
    transform: createStandardSkillTransform({
      sectionName: 'Circadian Rhythm & Sleep Optimization Architecture',
      ruSectionName: 'Оптимизация циркадных ритмов и архитектуры сна',
      instructions: [
        'Anchor the circadian master clock (SCN) with 10-15 minutes of direct morning sunlight exposure within 30 minutes of waking.',
        'Calculate sleep duration in 90-minute ultradian sleep cycle increments (typically 5 cycles = 7.5 hours) to avoid waking in deep slow-wave sleep.',
        'Enforce caffeine curfews: restrict adenosine-blocking caffeine intake after 12:00 PM (10-hour cutoff prior to bedtime).',
        'Optimize sleep hygiene environment: cool bedroom temperature (65-68°F / 18-20°C), complete blackout darkness, and zero blue light screens 60 minutes pre-bed.',
      ],
      ruInstructions: [
        'Синхронизируйте главные биологические часы организма (SCN) с помощью 10–15 минут яркого утреннего солнечного света сразу после пробуждения.',
        'Планируйте продолжительность сна циклами по 90 минут (обычно 5 циклов = 7.5 часов), чтобы просыпаться в быстрой фазе сна без ощущения разбитости.',
        'Соблюдайте кофеиновый комендантский час: прекращайте употребление стимуляторов за 10 часов до сна для полноценного накопления аденозина.',
        'Создавайте идеальную гигиену спальни: прохладная температура (18–20°C), абсолютная темнота (блэкаут) и отказ от экранов за час до сна.',
      ],
      semanticType: 'behavior_directive',
      tags: ['miscellaneous', 'sleep-science', 'circadian-rhythm', 'health', 'wellness', 'energy'],
    }),
  },

  'speechwriting-rhetorical-persuasion': {
    id: 'speechwriting-rhetorical-persuasion',
    name: 'SpeechwritingRhetoricalPersuasionSkill',
    displayName: 'Classical Rhetoric & Speechwriting Architecture',
    categoryId: 'miscellaneous',
    description: 'Crafts persuasive keynote speeches using Aristotle\'s triad (Ethos, Pathos, Logos), anaphora, tricolon, and memorable cadence.',
    tags: ['miscellaneous', 'speechwriting', 'rhetoric', 'persuasion', 'keynote', 'public-speaking'],
    transform: createStandardSkillTransform({
      sectionName: 'Classical Rhetoric & Speechwriting Architecture',
      ruSectionName: 'Классическая риторика и ораторское мастерство (Speechwriting)',
      instructions: [
        'Balance Aristotle\'s rhetorical triad: establish credible character (Ethos), evoke emotional resonance (Pathos), and anchor in logical proof (Logos).',
        'Employ classical rhetorical devices: Tricolon (rule of three), Anaphora (repetition of opening phrases), and Antithesis (contrast of opposites).',
        'Format the manuscript for oral delivery: short breathing phrases, phonetically clear vocabulary, and bold delivery cues ([Pause], [Lower voice]).',
        'Build towards a crescendo ending: a memorable call to purpose that leaves the audience inspired to take immediate collective action.',
      ],
      ruInstructions: [
        'Соблюдайте баланс риторической триады Аристотеля: авторитет спикера (Ethos), эмоциональный отклик аудитории (Pathos) и логическая строгость фактов (Logos).',
        'Используйте проверенные фигуры речи: триколон (правило трех), анафору (повторение начальных фраз) и антитезу (яркое противопоставление).',
        'Форматируйте текст под устную речь: короткие дыхательные фразы, благозвучная фонетика и режиссерские пометки в тексте ([Пауза], [Шепотом]).',
        'Подводите речь к мощной кульминации: емкий вдохновляющий призыв к действию, остающийся в памяти надолго.',
      ],
      semanticType: 'structural_directive',
      tags: ['miscellaneous', 'speechwriting', 'rhetoric', 'persuasion', 'keynote', 'public-speaking'],
    }),
  },

  'second-brain-para-organization': {
    id: 'second-brain-para-organization',
    name: 'SecondBrainParaOrganizationSkill',
    displayName: 'Building a Second Brain: PARA Method Architecture',
    categoryId: 'miscellaneous',
    description: 'Organizes digital information actionable for creation using Tiago Forte\'s 4-tier hierarchy: Projects, Areas, Resources, and Archives.',
    tags: ['miscellaneous', 'second-brain', 'para-method', 'knowledge-management', 'productivity'],
    transform: createStandardSkillTransform({
      sectionName: 'Second Brain PARA Method Organization',
      ruSectionName: 'Организация знаний по методу PARA (Второй мозг)',
      instructions: [
        'Organize all digital notes, files, and bookmarks strictly across 4 top-level containers based on actionability, never abstract topic names.',
        '1. Projects: Short-term efforts with a specific deadline and outcome (e.g., "Q4 Product Launch").',
        '2. Areas: Ongoing spheres of activity with a standard to be maintained indefinitely without an end date (e.g., "Health", "Finances").',
        '3. Resources: Topics or themes of ongoing interest for future reference (e.g., "Typography", "Python Snippets").',
        '4. Archives: Inactive items from the other three categories preserved for historical reference.',
      ],
      ruInstructions: [
        'Структурируйте заметки, файлы и документы по степени практической применимости, а не по абстрактным темам.',
        '1. Проекты (Projects): Краткосрочные задачи с конкретным дедлайном и измеримым результатом («Запуск сайта Q4»).',
        '2. Сферы (Areas): Долгосрочные области ответственности со стандартами поддержания качества без дедлайна («Здоровье», «Финансы»).',
        '3. Ресурсы (Resources): Материалы и темы для вдохновения и использования в будущем («Шрифты», «Шаблоны договоров»).',
        '4. Архивы (Archives): Завершенные проекты и неактивные материалы, сохраненные для истории.',
      ],
      semanticType: 'structural_directive',
      tags: ['miscellaneous', 'second-brain', 'para-method', 'knowledge-management', 'productivity'],
    }),
  },

  'emergency-preparedness-72hr-kit': {
    id: 'emergency-preparedness-72hr-kit',
    name: 'EmergencyPreparedness72hrKitSkill',
    displayName: 'Emergency Preparedness & 72-Hour Survival Protocol',
    categoryId: 'miscellaneous',
    description: 'Plans urban resilience: 72-hour bug-out bag specifications, communication redundancy, water purification, and escape routes.',
    tags: ['miscellaneous', 'emergency-preparedness', 'survival', 'safety', 'resilience', 'disaster'],
    transform: createStandardSkillTransform({
sectionName: '72-Hour Emergency Preparedness Architecture',
      ruSectionName: 'Протокол готовности к чрезвычайным ситуациям (72-Hour Kit)',
      instructions: [
        'Structure potable water requirements strictly: 1 gallon (3.8L) per person per day for drinking and sanitation, plus emergency purification tablets.',
        'Specify non-perishable high-caloric survival nutrition (2,000+ kcal/day) requiring zero cooking or refrigeration.',
        'Establish off-grid communication plans: battery/crank emergency NOAA radio, redundant family meeting rally points, and out-of-area emergency contacts.',
        'Pack essential documents, first-aid trauma supplies (tourniquets, hemostatic gauze), multi-tools, cash in small denominations, and flashlights.',
      ],
      ruInstructions: [
        'Рассчитывайте запасы питьевой воды: минимум 3.8 литра на человека в сутки для питья и гигиены, а также фильтры и таблетки обеззараживания.',
        'Формируйте рацион из высококалорийных продуктов длительного хранения (от 2000 ккал/день), не требующих варки и холодильника.',
        'Составляйте план автономной связи: радиоприемник с динамо-машиной, две точки сбора семьи при эвакуации и междугородний контакт для связи.',
        'Комплектуйте тревожный чемоданчик: аптечка с турникетом и гемостатиком, копии документов на защищенной флешке, наличные мелкими купюрами и фонари.',
      ],
      semanticType: 'structural_directive',
      tags: ['miscellaneous', 'emergency-preparedness', 'survival', 'safety', 'resilience', 'disaster'],
    }),
  },

  'speed-reading-subvocalization-suppression': {
    id: 'speed-reading-subvocalization-suppression',
    name: 'SpeedReadingSubvocalizationSuppressionSkill',
    displayName: 'Speed Reading & Visual Fixation Expansion',
    categoryId: 'miscellaneous',
    description: 'Expands reading speeds from 250 WPM to 600+ WPM by suppressing inner subvocalization and widening peripheral eye fixations.',
    tags: ['miscellaneous', 'speed-reading', 'learning', 'cognitive-enhancement', 'focus'],
    transform: createStandardSkillTransform({
sectionName: 'Speed Reading & Cognitive Absorption Protocol',
      ruSectionName: 'Скорочтение: подавление субвокализации и расширение поля зрения',
      instructions: [
        'Suppress subvocalization (inner voice articulation) by using rhythmic finger pacing or a visual pointer down the center of the page.',
        'Expand peripheral vision span to absorb blocks of 3-5 words per ocular fixation rather than decoding individual syllables.',
        'Eliminate eye regression: strictly prevent the unconscious back-tracking habit of re-reading previous lines.',
        'Maintain high conceptual comprehension: practice Rapid Serial Visual Presentation (RSVP) and 60-second summary mind-mapping after each chapter.',
      ],
      ruInstructions: [
        'Подавляйте внутреннее проговаривание (субвокализацию), используя визуальную указку или палец для поддержания высокого темпа чтения.',
        'Расширяйте пятно зрительной фиксации, чтобы за одну остановку взгляда охватывать смысловой блок из 3–5 слов.',
        'Искореняйте регрессии взгляда: сознательно запрещайте глазам возвращаться назад по строке для перечитывания.',
        'Контролируйте уровень понимания: составляйте 60-секундную ментальную карту основных тезисов сразу после прочтения каждой главы.',
      ],
      semanticType: 'process_directive',
      tags: ['miscellaneous', 'speed-reading', 'learning', 'cognitive-enhancement', 'focus'],
    }),
  },

  'digital-minimalism-declutter-audit': {
    id: 'digital-minimalism-declutter-audit',
    name: 'DigitalMinimalismDeclutterAuditSkill',
    displayName: 'Digital Minimalism & Notification Detox Audit',
    categoryId: 'miscellaneous',
    description: 'Reclaims deep focus using Cal Newport\'s Digital Minimalism: notification blackouts, home screen triage, and intentional technology use.',
    tags: ['miscellaneous', 'digital-minimalism', 'deep-work', 'screen-time', 'focus', 'mental-health'],
    transform: createStandardSkillTransform({
      sectionName: 'Digital Minimalism & Screen Time Protocol',
      ruSectionName: 'Цифровой минимализм и информационный детокс (Digital Minimalism)',
      instructions: [
        'Execute a ruthless notification purge: disable all non-human badge counters, banners, and lock-screen sound alerts.',
        'Apply the Grayscale screen test and remove infinite-scroll social media apps from mobile phones; restrict access to desktop browsers.',
        'Establish scheduled communication batching windows rather than continuous partial attention and reflexive instant messaging checks.',
        'Reclaim leisure hours: substitute passive algorithmic scrolling with high-quality physical, social, or creative offline craftsmanship.',
      ],
      ruInstructions: [
        'Проводите тотальную зачистку уведомлений: отключите все системные бейджи, баннеры и звуки, кроме звонков от реальных людей.',
        'Включайте черно-белый режим экрана (Grayscale) и удаляйте приложения с бесконечной лентой со смартфона, перенося их на рабочий компьютер.',
        'Выделяйте фиксированные слоты для проверки почты и мессенджеров, исключая режим постоянного рассеянного внимания.',
        'Заполняйте освободившееся время качественным досугом: спорт, чтение бумажных книг, живое общение и физическое творчество.',
      ],
      semanticType: 'behavior_directive',
      tags: ['miscellaneous', 'digital-minimalism', 'deep-work', 'screen-time', 'focus', 'mental-health'],
    }),
  },

  'active-listening-nonviolent-comms': {
    id: 'active-listening-nonviolent-comms',
    name: 'ActiveListeningNonviolentCommsSkill',
    displayName: 'Nonviolent Communication (NVC) & Empathetic Dialogue',
    categoryId: 'miscellaneous',
    description: 'De-escalates interpersonal friction using Marshall Rosenberg\'s 4-step NVC model: Observation, Feeling, Need, and Request.',
    tags: ['miscellaneous', 'nvc', 'nonviolent-communication', 'active-listening', 'empathy', 'conflict-resolution'],
    transform: createStandardSkillTransform({
      sectionName: 'Nonviolent Communication (NVC) Framework',
      ruSectionName: 'Ненасильственное общение по Маршаллу Розенбергу (NVC)',
      instructions: [
        'Step 1 (Observation): State concrete factual observations free from subjective judgments, diagnoses, or moralistic criticism.',
        'Step 2 (Feeling): Name specific emotional sensations (e.g., anxious, frustrated, hopeful) rather than disguised thoughts or accusations.',
        'Step 3 (Need): Connect feelings to universal human needs (e.g., safety, autonomy, respect, clarity, connection).',
        'Step 4 (Request): Articulate clear, concrete, actionable, and positive requests (what to do, not what to stop doing) free of demands.',
      ],
      ruInstructions: [
        'Шаг 1 (Наблюдение): Описывайте конкретные объективные факты без оценочных суждений, ярлыков и обвинений.',
        'Шаг 2 (Чувство): Называйте точные эмоции (тревога, растерянность, воодушевление), избегая замаскированных упреков.',
        'Шаг 3 (Потребность): Связывайте переживаемые чувства с глубинными базовыми потребностями (безопасность, уважение, ясность, автономия).',
        'Шаг 4 (Просьба): Формулируйте конкретную, выполнимую просьбу на понятном языке действий, исключая ультиматумы и манипуляции.',
      ],
      semanticType: 'behavior_directive',
      tags: ['miscellaneous', 'nvc', 'nonviolent-communication', 'active-listening', 'empathy', 'conflict-resolution'],
    }),
  },

  'first-principles-reasoning-musk': {
    id: 'first-principles-reasoning-musk',
    name: 'FirstPrinciplesReasoningMuskSkill',
    displayName: 'First-Principles Physics Deconstruction',
    categoryId: 'miscellaneous',
    description: 'Boils complex problems down to the most fundamental foundational truths and reasons up from physical/mathematical reality.',
    tags: ['miscellaneous', 'first-principles', 'innovation', 'physics-thinking', 'problem-solving'],
    transform: createStandardSkillTransform({
sectionName: 'First-Principles Reasoning Framework',
      ruSectionName: 'Мышление из первых принципов (First-Principles Thinking)',
      instructions: [
        'Strip away reasoning by analogy, industry conventional wisdom, and "because it has always been done that way" traditions.',
        'Deconstruct the problem into foundational physical, mathematical, and economic axiomatic truths that cannot be deduced any further.',
        'Calculate theoretical minimum physical costs (e.g., raw material spot prices for lithium, nickel, steel) to expose bloated supply chain markups.',
        'Reconstruct revolutionary solutions from the ground up based strictly on those fundamental irreducible truths.',
      ],
      ruInstructions: [
        'Отбросьте рассуждения по аналогии, устоявшиеся шаблоны индустрии и аргументы «так принято испокон веков».',
        'Разложите проблему на базовые физические, математические и экономические аксиомы, которые невозможно опровергнуть.',
        'Рассчитайте теоретическую предельную себестоимость по ценам базового сырья на бирже, выявляя накрутки посредников.',
        'Соберите принципиально новое инженерное или бизнес-решение снизу вверх, опираясь исключительно на фундаментальные законы природы.',
      ],
      semanticType: 'process_directive',
      tags: ['miscellaneous', 'first-principles', 'innovation', 'physics-thinking', 'problem-solving'],
    }),
  },

  'personal-finance-50-30-20-budget': {
    id: 'personal-finance-50-30-20-budget',
    name: 'PersonalFinance503020BudgetSkill',
    displayName: 'Personal Wealth Architecture & 50/30/20 Budgeting',
    categoryId: 'miscellaneous',
    description: 'Structures personal finances: 50% Needs, 30% Wants, 20% Wealth/Debt, emergency funds, and low-cost index investing.',
    tags: ['miscellaneous', 'personal-finance', 'budgeting', 'investing', 'wealth-building'],
    transform: createStandardSkillTransform({
sectionName: 'Personal Finance & Wealth Architecture',
      ruSectionName: 'Личные финансы и бюджетное распределение 50/30/20',
      instructions: [
        'Allocate net after-tax income strictly: 50% Essential Needs (housing, utilities, groceries), 30% Discretionary Wants, 20% Savings & Debt Repayment.',
        'Build a liquid 3-to-6 month emergency cash reserve in a High-Yield Savings Account (HYSA) before taking speculative investment risks.',
        'Eliminate high-interest revolving consumer debt using the Debt Avalanche (highest interest rate first) or Debt Snowball method.',
        'Automate long-term wealth compounding into diversified, low-cost broad-market index funds (e.g., Total World Stock ETF) minimizing fees.',
      ],
      ruInstructions: [
        'Распределяйте чистый доход строго по системе: 50% — базовые нужды (жилье, еда, коммунальные услуги), 30% — желания, 20% — инвестиции и накопления.',
        'Формируйте подушку безопасности на 3–6 месяцев обязательных расходов на накопительном счете до перехода к рискованным инвестициям.',
        'Ликвидируйте дорогие кредитные долги методом «лавины» (сначала максимальный процент) или «снежного кома».',
        'Автоматизируйте регулярные инвестиции в диверсифицированные индексные фонды с минимальными комиссиями управления.',
      ],
      semanticType: 'process_directive',
      tags: ['miscellaneous', 'personal-finance', 'budgeting', 'investing', 'wealth-building'],
    }),
  },

  'public-speaking-stage-presence-ted': {
    id: 'public-speaking-stage-presence-ted',
    name: 'PublicSpeakingStagePresenceTedSkill',
    displayName: 'TED-Style Stage Presence & Nonverbal Delivery',
    categoryId: 'miscellaneous',
    description: 'Coaches physical stage blocking, vocal variety (pitch, pace, pause), eye contact lock, and open posture for public speaking.',
    tags: ['miscellaneous', 'public-speaking', 'stage-presence', 'body-language', 'ted-talk'],
    transform: createStandardSkillTransform({
sectionName: 'TED-Style Stage Presence & Nonverbal Delivery',
      ruSectionName: 'Сценическое мастерство и ораторская подача (TED-Style Delivery)',
      instructions: [
        'Master stage blocking: move purposefully to deliver key points from 3 distinct stage anchors; never pace nervously like a caged tiger.',
        'Maintain open body language: keep arms uncrossed, hands visible in the "sphere of comfort", and avoid clutching podiums or clicking pens.',
        'Deploy the 3-second eye contact lock: connect with one individual audience member per complete sentence before shifting gaze.',
        'Harness vocal variety: modulate pitch and volume dynamically, and embrace comfortable silence through dramatic 2-second pauses.',
      ],
      ruInstructions: [
        'Управляйте сценическим пространством: перемещайтесь осознанно между тремя опорными точками сцены; избегайте нервного метания из стороны в сторону.',
        'Используйте открытую позу: руки видны, открытые жесты от груди, отсутствие закрытых поз и судорожного сжимания кликера.',
        'Применяйте правило фиксации взгляда на 3 секунды: удерживайте контакт с одним человеком в зале на протяжении законченной мысли.',
        'Владейте голосом: меняйте интонацию, громкость и не бойтесь выразительных драматических пауз в 2 секунды перед кульминацией.',
      ],
      semanticType: 'behavior_directive',
      tags: ['miscellaneous', 'public-speaking', 'stage-presence', 'body-language', 'ted-talk'],
    }),
  },

  'mentorship-reverse-pairing-protocol': {
    id: 'mentorship-reverse-pairing-protocol',
    name: 'MentorshipReversePairingProtocolSkill',
    displayName: 'Reverse Mentorship & Apprenticeship Pairing Protocol',
    categoryId: 'miscellaneous',
    description: 'Bridges generational and technical gaps: pairs junior technologists with senior executives for bidirectional knowledge exchange.',
    tags: ['miscellaneous', 'mentorship', 'reverse-mentorship', 'leadership', 'learning-culture'],
    transform: createStandardSkillTransform({
sectionName: 'Reverse Mentorship & Apprenticeship Protocol',
      ruSectionName: 'Реверсивное наставничество и взаимное обучение (Reverse Mentorship)',
      instructions: [
        'Structure bidirectional knowledge exchange: junior employee shares emerging tech trends, Gen-Z culture, and modern toolchains; senior shares executive wisdom and political navigation.',
        'Establish psychological safety and equality: eliminate formal hierarchical superiority during mentorship dialogue sessions.',
        'Define explicit monthly topic contracts (e.g., AI coding assistants, remote workplace norms, career progression frameworks).',
        'Document shared reciprocal takeaways and schedule quarterly check-ins to evaluate reciprocal learning outcomes.',
      ],
      ruInstructions: [
        'Организуйте двусторонний обмен знаниями: младший специалист делится новыми технологиями, AI-инструментами и трендами; старший — управленческим опытом.',
        'Создавайте атмосферу психологической безопасности: на время менторских сессий отменяется субординация и статус руководителя.',
        'Фиксируйте конкретные темы для каждой ежемесячной встречи (новые инструменты разработки, культура распределенных команд).',
        'Ведите журнал совместных инсайтов и подводите квартальные итоги взаимного профессионального обогащения.',
      ],
      semanticType: 'process_directive',
      tags: ['miscellaneous', 'mentorship', 'reverse-mentorship', 'leadership', 'learning-culture'],
    }),
  },
  "gtd-getting-things-done-inbox-zero": {
    id: "gtd-getting-things-done-inbox-zero",
    name: "GtdGettingThingsDoneInboxZeroSkill",
    displayName: "Getting Things Done (GTD) & Inbox Zero Processing",
    categoryId: "miscellaneous",
    description: "Implements David Allen’s 5-step workflow: Capture, Clarify (2-minute rule), Organize, Reflect, and Engage.",
    tags: ["miscellaneous","productivity","gtd","inbox-zero","workflow"],
    transform: createStandardSkillTransform({
      sectionName: "GTD Workflow & Triage Protocol",
      ruSectionName: "Протокол обработки задач по системе GTD и Inbox Zero",
      instructions: [
        "Capture: Route every inbound task or thought into an unfiltered Inbox.",
        "Clarify: If it takes < 2 minutes, do it immediately; otherwise Delegate, Defer (Next Action), or Delete.",
        "Organize: Categorize into Projects, Next Actions by Context, Waiting For, and Someday/Maybe."
],
      ruInstructions: [
        "Capture: Зафиксируйте входящие мысли и задачи в единый буфер Inbox.",
        "Clarify: Если действие занимает < 2 минут — сделайте сразу; иначе делегируйте или запланируйте.",
        "Organize: Разнесите по спискам Проекты, Следующие действия, Ожидание и Когда-нибудь."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","productivity","gtd","inbox-zero","workflow"],
    }),
  },

  "negotiation-getting-to-yes-batna": {
    id: "negotiation-getting-to-yes-batna",
    name: "NegotiationGettingToYesBatnaSkill",
    displayName: "Principled Negotiation (BATNA, ZOPA & Harvard Method)",
    categoryId: "miscellaneous",
    description: "Prepares for high-stakes negotiation by identifying Best Alternative to a Negotiated Agreement (BATNA) and Zone of Possible Agreement (ZOPA).",
    tags: ["miscellaneous","negotiation","batna","zopa","harvard-negotiation"],
    transform: createStandardSkillTransform({
      sectionName: "Principled Negotiation Architecture",
      ruSectionName: "Гарвардская методология переговоров (BATNA и ZOPA)",
      instructions: [
        "Identify and strengthen your walk-away alternative (BATNA) prior to discussions.",
        "Separate the people from the problem; focus on underlying interests rather than fixed positions.",
        "Map the ZOPA and invent creative multi-issue trade-offs for mutual gain."
],
      ruInstructions: [
        "Определите и укрепите наилучшую альтернативу переговорам (BATNA) до встречи.",
        "Отделите человека от проблемы; исследуйте глубинные интересы вместо жестких позиций.",
        "Определите зону возможного соглашения (ZOPA) и предложите варианты взаимного выигрыша."
],
      semanticType: 'protocol',
      tags: ["miscellaneous","negotiation","batna","zopa","harvard-negotiation"],
    }),
  },

  "feynman-mental-model-interdisciplinary-latticework": {
    id: "feynman-mental-model-interdisciplinary-latticework",
    name: "FeynmanMentalModelInterdisciplinaryLatticeworkSkill",
    displayName: "Munger Latticework of Mental Models",
    categoryId: "miscellaneous",
    description: "Synthesizes decision making across core models from Physics (Entropy), Biology (Evolution), Psychology (Incentives), and Math (Compounding).",
    tags: ["miscellaneous","mental-models","charlie-munger","multidisciplinary","thinking"],
    transform: createStandardSkillTransform({
      sectionName: "Latticework of Mental Models Protocol",
      ruSectionName: "Решетка ментальных моделей Чарли Мангера",
      instructions: [
        "Examine the dilemma through 4 fundamental disciplinary lenses (Physics, Biology, Microeconomics, Psychology).",
        "Check for Lollapalooza effects where multiple behavioral tendencies act in the same direction.",
        "Synthesize holistic conclusions rather than relying on narrow single-domain tools."
],
      ruInstructions: [
        "Рассмотрите ситуацию через призму 4 дисциплин (физика, биология, микроэкономика, психология).",
        "Проверьте наличие кумулятивного эффекта (Lollapalooza), когда несколько факторов усиливают друг друга.",
        "Сформулируйте взвешенное решение без уклона в узкоспециализированные догмы."
],
      semanticType: 'protocol',
      tags: ["miscellaneous","mental-models","charlie-munger","multidisciplinary","thinking"],
    }),
  },

  "stoic-dichotomy-of-control-reframing": {
    id: "stoic-dichotomy-of-control-reframing",
    name: "StoicDichotomyOfControlReframingSkill",
    displayName: "Stoic Dichotomy of Control & Cognitive Reframing",
    categoryId: "miscellaneous",
    description: "Separates variables into things strictly within internal control vs external uncontrollables to eliminate reactive anxiety.",
    tags: ["miscellaneous","stoicism","mindset","reframing","resilience"],
    transform: createStandardSkillTransform({
      sectionName: "Stoic Dichotomy of Control Protocol",
      ruSectionName: "Стоическая дихотомия контроля и когнитивный рефрейминг",
      instructions: [
        "Categorize all situational inputs: Internal (Effort, Values, Reactions) vs External (Outcomes, Others’ Opinions, Market Conditions).",
        "Detain attachment from external outcomes; focus 100% of cognitive energy on internal execution.",
        "Formulate positive reframings embracing obstacles as the path forward (Amor Fati)."
],
      ruInstructions: [
        "Разделите факторы на внутренние (усилия, реакции) и внешние (рынок, поведение других людей).",
        "Снимите эмоциональную фиксацию с внешних результатов; направьте всю энергию на качество действий.",
        "Преобразуйте возникшие препятствия в точку роста и новый опыт."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","stoicism","mindset","reframing","resilience"],
    }),
  },

  "kanban-personal-wip-limit-system": {
    id: "kanban-personal-wip-limit-system",
    name: "KanbanPersonalWipLimitSystemSkill",
    displayName: "Personal Kanban & Work-in-Progress (WIP) Caps",
    categoryId: "miscellaneous",
    description: "Limits active concurrent tasks to a strict maximum of 3 (WIP = 3) to eliminate multitasking switching costs and maximize flow throughput.",
    tags: ["miscellaneous","kanban","wip-limits","focus","productivity"],
    transform: createStandardSkillTransform({
      sectionName: "Personal Kanban Protocol",
      ruSectionName: "Персональный канбан и ограничение незавершенной работы (WIP Caps)",
      instructions: [
        "Maintain visual columns: Backlog, Ready, Doing (Max 3), Done.",
        "Enforce strict rule: No new card moves into \"Doing\" until an existing card moves to \"Done\".",
        "Track cycle time and identify recurrent blockage patterns."
],
      ruInstructions: [
        "Ведите наглядную доску: Бэклог, Готово к работе, В работе (макс. 3), Сделано.",
        "Соблюдайте жесткое правило: новая задача не берется в работу, пока не завершена текущая.",
        "Измеряйте время выполнения задач и устраняйте регулярные задержки."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","kanban","wip-limits","focus","productivity"],
    }),
  },

  "habit-loop-atomic-cue-craving-response-reward": {
    id: "habit-loop-atomic-cue-craving-response-reward",
    name: "HabitLoopAtomicCueCravingResponseRewardSkill",
    displayName: "James Clear Atomic Habit Loop Architecture",
    categoryId: "miscellaneous",
    description: "Architects sustainable behavior change using the 4 Laws: Make it Obvious (Cue), Attractive (Craving), Easy (Response), Satisfying (Reward).",
    tags: ["miscellaneous","habits","atomic-habits","james-clear","behavior-design"],
    transform: createStandardSkillTransform({
      sectionName: "Atomic Habit Loop Architecture",
      ruSectionName: "Архитектура привычек по Джеймсу Клиру (4 закона изменения поведения)",
      instructions: [
        "Make it Obvious: Habit stack onto existing routines (\"After [Current Habit], I will [New Habit]\").",
        "Make it Easy: Reduce the initial friction to under 2 minutes (Two-Minute Rule).",
        "Make it Satisfying: Implement immediate visual tracking and streak reinforcement."
],
      ruInstructions: [
        "Сделайте очевидным: привяжите новую привычку к существующей цепочке действий.",
        "Сделайте простым: уменьшите стартовое усилие до правила двух минут.",
        "Сделайте приятным: внедрите мгновенное визуальное подкрепление и трекинг серий."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","habits","atomic-habits","james-clear","behavior-design"],
    }),
  },

  "sleep-hygiene-circadian-rhythm-optimization": {
    id: "sleep-hygiene-circadian-rhythm-optimization",
    name: "SleepHygieneCircadianRhythmOptimizationSkill",
    displayName: "Circadian Rhythm & Sleep Architecture Optimization",
    categoryId: "miscellaneous",
    description: "Applies Huberman/Walker neurobiology protocols (morning sunlight, temperature drops, caffeine half-life cutoffs) to maximize slow-wave and REM sleep.",
    tags: ["miscellaneous","health","sleep","circadian-rhythm","biohacking"],
    transform: createStandardSkillTransform({
      sectionName: "Circadian Rhythm Protocol",
      ruSectionName: "Оптимизация циркадных ритмов и архитектуры сна",
      instructions: [
        "View natural outdoor sunlight within 30-60 minutes of waking.",
        "Establish a strict 10-hour caffeine cutoff before target bedtime (metabolic clearance).",
        "Optimize sleep environment: pitch dark, cool room temperature (18°C / 65°F), zero screens 60m prior."
],
      ruInstructions: [
        "Получите естественный дневной свет в первые 30-60 минут после пробуждения.",
        "Прекратите употребление кофеина за 10 часов до планируемого отхода ко сну.",
        "Обеспечьте прохладную температуру в спальне (~18°C) и полный блэкаут."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","health","sleep","circadian-rhythm","biohacking"],
    }),
  },

  "cold-email-sales-outreach-four-sentence": {
    id: "cold-email-sales-outreach-four-sentence",
    name: "ColdEmailSalesOutreachFourSentenceSkill",
    displayName: "High-Response 4-Sentence Cold Email Framework",
    categoryId: "miscellaneous",
    description: "Drafts punchy, hyper-relevant B2B cold emails under 75 words with an interest-based Call-to-Action.",
    tags: ["miscellaneous","cold-email","sales","outreach","copywriting"],
    transform: createStandardSkillTransform({
      sectionName: "4-Sentence Cold Outreach Protocol",
      ruSectionName: "4-строчный фреймворк холодных B2B email-рассылок",
      instructions: [
        "Sentence 1: Hyper-personalized observation showing real homework on their company.",
        "Sentence 2-3: State the acute problem you solve and one quantifiable result achieved for a peer.",
        "Sentence 4: Low-friction interest CTA (e.g. \"Open to exploring how this would work for your team?\")."
],
      ruInstructions: [
        "Предложение 1: Персонализированное наблюдение о бизнесе получателя.",
        "Предложения 2-3: Острая проблема и измеримый результат решения для похожих компаний.",
        "Предложение 4: Мягкий вопрос об интересе без агрессивного требования созвона."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","cold-email","sales","outreach","copywriting"],
    }),
  },

  "decision-matrix-weighted-pugh-scoring": {
    id: "decision-matrix-weighted-pugh-scoring",
    name: "DecisionMatrixWeightedPughScoringSkill",
    displayName: "Pugh Decision Matrix & Weighted Scoring Model",
    categoryId: "miscellaneous",
    description: "Evaluates multi-option strategic decisions across weighted evaluation criteria to eliminate emotional confirmation bias.",
    tags: ["miscellaneous","decision-making","pugh-matrix","weighted-scoring","strategy"],
    transform: createStandardSkillTransform({
      sectionName: "Weighted Decision Matrix Protocol",
      ruSectionName: "Взвешенная матрица принятия решений (матрица Пью)",
      instructions: [
        "List 5-8 non-overlapping criteria and assign relative weights summing to 100%.",
        "Score each candidate option on a 1-5 or 1-10 scale per criterion.",
        "Calculate weighted composite scores and run sensitivity tests on top criteria weights."
],
      ruInstructions: [
        "Сформулируйте 5-8 критериев и распределите веса с суммой 100%.",
        "Оцените каждый вариант по каждому критерию по шкале от 1 до 10.",
        "Рассчитайте итоговые баллы и проверьте устойчивость результата при изменении весов."
],
      semanticType: 'protocol',
      tags: ["miscellaneous","decision-making","pugh-matrix","weighted-scoring","strategy"],
    }),
  },

  "pre-mortem-gary-klein-failure-simulation": {
    id: "pre-mortem-gary-klein-failure-simulation",
    name: "PreMortemGaryKleinFailureSimulationSkill",
    displayName: "Gary Klein Pre-Mortem Prospective Hindsight",
    categoryId: "miscellaneous",
    description: "Simulates a total project disaster 1 year into the future, uncovering hidden team concerns, blind spots, and proactive mitigations.",
    tags: ["miscellaneous","pre-mortem","risk-management","gary-klein","project-management"],
    transform: createStandardSkillTransform({
      sectionName: "Prospective Hindsight Pre-Mortem Protocol",
      ruSectionName: "Протокол пре-мортем анализа рисков (метод ретроспективы неудач)",
      instructions: [
        "Set the premise: \"It is 12 months from today, and this initiative has suffered a total, embarrassing catastrophe.\"",
        "Independently generate all possible underlying causes that contributed to the collapse.",
        "Consolidate failure vectors and assign proactive preventative owners to each item."
],
      ruInstructions: [
        "Сформулируйте вводную: \"Прошел 1 год, и наш проект с треском и катастрофой провалился\".",
        "Соберите все скрытые опасения и возможные причины гибели инициативы.",
        "Сгруппируйте риски и назначьте превентивные меры до старта проекта."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","pre-mortem","risk-management","gary-klein","project-management"],
    }),
  },

  "conflict-resolution-nonviolent-communication-nvc": {
    id: "conflict-resolution-nonviolent-communication-nvc",
    name: "ConflictResolutionNonviolentCommunicationNvcSkill",
    displayName: "Nonviolent Communication (NVC) by Marshall Rosenberg",
    categoryId: "miscellaneous",
    description: "Navigates interpersonal conflicts using 4 components: Observation (without judgment), Feelings, Universal Needs, and Concrete Requests.",
    tags: ["miscellaneous","communication","nvc","conflict-resolution","empathy"],
    transform: createStandardSkillTransform({
      sectionName: "Nonviolent Communication (NVC) Protocol",
      ruSectionName: "Протокол ненасильственного общения (ННО Розенберга)",
      instructions: [
        "Observation: State factual, objective actions without interpretive evaluation or blame.",
        "Feelings: Express vulnerable internal emotions rather than disguised accusations (\"I feel ignored\").",
        "Needs & Requests: Connect feelings to unmet universal human needs and issue clear, actionable requests."
],
      ruInstructions: [
        "Наблюдение: Опишите факты без оценочных суждений и обвинений.",
        "Чувства: Назовите свои истинные эмоции вместо скрытых претензий.",
        "Потребности и Просьба: Свяжите эмоцию с потребностью и озвучьте конкретную выполнимую просьбу."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","communication","nvc","conflict-resolution","empathy"],
    }),
  },

  "public-speaking-ted-talk-story-arc": {
    id: "public-speaking-ted-talk-story-arc",
    name: "PublicSpeakingTedTalkStoryArcSkill",
    displayName: "TED Talk 18-Minute Narrative Arc Architecture",
    categoryId: "miscellaneous",
    description: "Structures keynote presentations: The Common Ground, The Destabilizing Idea, The Valley of Obstacles, The Revelation, and The Call to Action.",
    tags: ["miscellaneous","public-speaking","ted-talk","storytelling","presentations"],
    transform: createStandardSkillTransform({
      sectionName: "TED Keynote Narrative Arc",
      ruSectionName: "Сюжетная структура 18-минутного выступления в стиле TED",
      instructions: [
        "Minutes 0-3: Establish relatable baseline and plant one bold, provocative central premise (\"Throughline\").",
        "Minutes 3-12: Share vulnerability, experiments, failures, and evidentiary proof points.",
        "Minutes 12-18: Deliver the inspiring synthesis, leaving the audience with an actionable vision for change."
],
      ruInstructions: [
        "0-3 мин: Найдите общую точку соприкосновения с залом и озвучьте главную провокационную идею.",
        "3-12 мин: Расскажите историю преодоления, ошибки, эксперименты и факты.",
        "12-18 мин: Сделайте воодушевляющий вывод и завершите речь призывом к действию."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","public-speaking","ted-talk","storytelling","presentations"],
    }),
  },

  "speed-reading-comprehension-retention-inspection": {
    id: "speed-reading-comprehension-retention-inspection",
    name: "SpeedReadingComprehensionRetentionInspectionSkill",
    displayName: "Adler Syntopical & Inspectional Reading Protocol",
    categoryId: "miscellaneous",
    description: "Applies Mortimer Adler’s \"How to Read a Book\" framework across Elementary, Inspectional, Analytical, and Syntopical reading tiers.",
    tags: ["miscellaneous","reading","syntopical","learning","comprehension"],
    transform: createStandardSkillTransform({
      sectionName: "Inspectional & Syntopical Reading Protocol",
      ruSectionName: "Протокол инспекционного и синтопического чтения (Мортимер Адлер)",
      instructions: [
        "Inspectional: Skim title, preface, table of contents, and conclusion chapters in 15 minutes to build the mental scaffolding.",
        "Analytical: State the book’s central argument in 2 sentences; identify the author’s primary propositions.",
        "Syntopical: Cross-reference 3+ books on the same topic to construct a neutral dialectical landscape."
],
      ruInstructions: [
        "Инспекционное чтение: Изучите оглавление, введение и выводы глав за 15 минут для понимания скелета.",
        "Аналитическое чтение: Сформулируйте тезис книги в 2 предложениях и выделите аргументы автора.",
        "Синтопическое чтение: Сопоставьте позиции 3+ авторов по одной теме для объективной картины."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","reading","syntopical","learning","comprehension"],
    }),
  },

  "deep-work-cal-newport-distraction-blocker": {
    id: "deep-work-cal-newport-distraction-blocker",
    name: "DeepWorkCalNewportDistractionBlockerSkill",
    displayName: "Cal Newport Deep Work & Attention Residue Elimination",
    categoryId: "miscellaneous",
    description: "Structures 90-120 minute uninterrupted deep work blocks while eliminating cognitive switching costs and attention residue.",
    tags: ["miscellaneous","deep-work","focus","cal-newport","productivity"],
    transform: createStandardSkillTransform({
      sectionName: "Deep Work Block Protocol",
      ruSectionName: "Протокол глубокой работы (Deep Work) и устранения остаточного внимания",
      instructions: [
        "Schedule discrete 90-minute blocks with strict zero-connectivity modes (no notifications or messaging apps).",
        "Define a single unambiguous objective before entering the block.",
        "Perform a formal shutdown ritual at the end of the workday to disconnect cognitive loops."
],
      ruInstructions: [
        "Выделите 90-минутные блоки с полным отключением мессенджеров и уведомлений.",
        "Сформулируйте одну измеримую цель до входа в блок глубокой концентрации.",
        "Выполните ритуал завершения рабочего дня для разгрузки рабочей памяти."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","deep-work","focus","cal-newport","productivity"],
    }),
  },

  "crisis-first-aid-cpr-aed-resuscitation": {
    id: "crisis-first-aid-cpr-aed-resuscitation",
    name: "CrisisFirstAidCprAedResuscitationSkill",
    displayName: "Bystander CPR, AED & Choking Emergency Protocol",
    categoryId: "miscellaneous",
    description: "Provides standardized emergency guidelines for bystander Hands-Only CPR (100-120 bpm), AED pad placement, and Heimlich maneuver.",
    tags: ["miscellaneous","first-aid","cpr","aed","emergency-response"],
    transform: createStandardSkillTransform({
      sectionName: "Bystander Emergency Resuscitation Protocol",
      ruSectionName: "Протокол первой помощи (СЛР, дефибриллятор АНД, прием Геймлиха)",
      instructions: [
        "Check scene safety, assess responsiveness, and explicitly direct a specific person to call emergency services and retrieve an AED.",
        "Begin Hands-Only CPR: Push hard and fast in the center of the chest at 100-120 compressions per minute (depth: 2 inches / 5 cm).",
        "Attach AED immediately upon arrival; follow spoken voice prompts and ensure everyone is clear before shock."
],
      ruInstructions: [
        "Убедитесь в безопасности, проверьте реакцию и назначьте конкретного человека вызвать скорую и принести дефибриллятор.",
        "Начните компрессии грудной клетки: 100-120 нажатий в минуту на глубину 5 см.",
        "Подключите АНД при доставке; следуйте голосовым инструкциям и следите, чтобы никто не касался пострадавшего при разряде."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","first-aid","cpr","aed","emergency-response"],
    }),
  },

  "travel-itinerary-frictionless-logistics-planner": {
    id: "travel-itinerary-frictionless-logistics-planner",
    name: "TravelItineraryFrictionlessLogisticsPlannerSkill",
    displayName: "Frictionless Travel Logistics & Geographic Batching",
    categoryId: "miscellaneous",
    description: "Plans multi-day travel itineraries optimized by geographic neighborhood clustering, transit buffer times, and reservation booking windows.",
    tags: ["miscellaneous","travel","logistics","itinerary-planning","organization"],
    transform: createStandardSkillTransform({
      sectionName: "Travel Itinerary Logistics Architecture",
      ruSectionName: "Планирование путешествий и логистическая кластеризация маршрутов",
      instructions: [
        "Cluster activities and dining strictly by geographic neighborhood to eliminate zig-zag transit waste.",
        "Insert realistic 45-60 minute transit and rest buffers between major excursions.",
        "Generate a consolidated single-pane-of-glass timeline with confirmation numbers and offline maps."
],
      ruInstructions: [
        "Группируйте достопримечательности и рестораны строго по районам во избежание лишних переездов.",
        "Закладывайте буфер 45-60 минут на дорогу и отдых между ключевыми точками.",
        "Сформируйте единый таймлайн со всеми номерами броней и ссылками на оффлайн-карты."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","travel","logistics","itinerary-planning","organization"],
    }),
  },

  "gardening-companion-planting-permaculture": {
    id: "gardening-companion-planting-permaculture",
    name: "GardeningCompanionPlantingPermacultureSkill",
    displayName: "Companion Planting & Permaculture Guild Design",
    categoryId: "miscellaneous",
    description: "Designs synergistic organic garden guilds (Three Sisters, aromatic pest repellents, dynamic nutrient accumulators) and soil health regimes.",
    tags: ["miscellaneous","gardening","permaculture","companion-planting","agriculture"],
    transform: createStandardSkillTransform({
      sectionName: "Permaculture Guild & Planting Protocol",
      ruSectionName: "Пермакультурный дизайн и синергия совместных посадок (Companion Planting)",
      instructions: [
        "Pair symbiotic plant species (e.g. Corn for structure, Beans for nitrogen fixation, Squash for living mulch).",
        "Integrate aromatic pest repellents (marigolds, basil, mint) around vulnerable crops.",
        "Design soil composting and organic mulch coverage routines to retain moisture."
],
      ruInstructions: [
        "Сочетайте симбиотические культуры (кукуруза как опора, фасоль для фиксации азота, тыква для защиты почвы).",
        "Высаживайте пряные травы и цветы (бархатцы, базилик) для естественного отпугивания вредителей.",
        "Организуйте мульчирование и компостирование для сохранения влаги и плодородия почвы."
],
      semanticType: 'protocol',
      tags: ["miscellaneous","gardening","permaculture","companion-planting","agriculture"],
    }),
  },

  "personal-finance-bogleheads-three-fund-portfolio": {
    id: "personal-finance-bogleheads-three-fund-portfolio",
    name: "PersonalFinanceBogleheadsThreeFundPortfolioSkill",
    displayName: "Bogleheads 3-Fund Index Portfolio & Asset Allocation",
    categoryId: "miscellaneous",
    description: "Implements Jack Bogle’s low-cost passive index investing philosophy: Total US Market, Total International Market, and Total Bond Market.",
    tags: ["miscellaneous","finance","investing","bogleheads","index-funds"],
    transform: createStandardSkillTransform({
      sectionName: "Bogleheads 3-Fund Portfolio Protocol",
      ruSectionName: "Портфельные инвестиции по системе Джона Богла (3-Fund Portfolio)",
      instructions: [
        "Define target asset allocation based on risk tolerance and investment horizon (e.g. 70% Equities / 30% Bonds).",
        "Select low-expense-ratio broad market index funds (Total US, Total Ex-US, Total Bond).",
        "Establish annual rebalancing thresholds (e.g. 5/25 rule) to maintain target weights without market timing."
],
      ruInstructions: [
        "Определите пропорцию активов исходя из горизонта и терпимости к риску (например, 70% акции / 30% облигации).",
        "Выберите биржевые фонды широкого рынка с минимальной комиссией.",
        "Настройте ежегодную ребалансировку портфеля по правилу отклонения весов без попыток угадать рынок."
],
      semanticType: 'protocol',
      tags: ["miscellaneous","finance","investing","bogleheads","index-funds"],
    }),
  },

  "diy-home-maintenance-seasonal-checklist": {
    id: "diy-home-maintenance-seasonal-checklist",
    name: "DiyHomeMaintenanceSeasonalChecklistSkill",
    displayName: "Quarterly Preventative Home Maintenance Checklist",
    categoryId: "miscellaneous",
    description: "Schedules essential preventative home infrastructure checks: HVAC filter swaps, gutter clearing, water heater flushes, and foundation inspections.",
    tags: ["miscellaneous","home-maintenance","diy","preventative","checklists"],
    transform: createStandardSkillTransform({
      sectionName: "Quarterly Home Maintenance Protocol",
      ruSectionName: "Сезонный чек-лист профилактического обслуживания дома",
      instructions: [
        "Spring: Inspect roof shingles, clean gutters, test sump pump, and service AC condensers.",
        "Fall: Flush sediment from water heater, insulate exposed pipes, replace furnace filters, inspect chimney.",
        "Document warranty dates and local service technician contact numbers."
],
      ruInstructions: [
        "Весна: Осмотр кровли, прочистка водостоков, проверка кондиционеров и дренажных насосов.",
        "Осень: Промывка водонагревателя от накипи, утепление уличных труб, замена фильтров отопления.",
        "Ведите журнал обслуживания с датами гарантий и контактами проверенных мастеров."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","home-maintenance","diy","preventative","checklists"],
    }),
  },

  "culinary-flavor-pairing-flavor-bible-matrix": {
    id: "culinary-flavor-pairing-flavor-bible-matrix",
    name: "CulinaryFlavorPairingFlavorBibleMatrixSkill",
    displayName: "Culinary Flavor Balancing & Taste Balancing Matrix",
    categoryId: "miscellaneous",
    description: "Diagnoses and rectifies flat dishes by balancing the 5 fundamental tastes (Sweet, Salty, Sour, Bitter, Umami) plus heat and fat textures.",
    tags: ["miscellaneous","culinary","cooking","flavor-pairing","taste-balancing"],
    transform: createStandardSkillTransform({
      sectionName: "Culinary Flavor Balancing Matrix",
      ruSectionName: "Матрица балансировки вкусов и сочетаемости ингредиентов (The Flavor Bible)",
      instructions: [
        "Diagnose imbalance: Too salty? Add acid (lemon/vinegar) or starch. Too sweet? Add acid or bitter notes. Too heavy/fatty? Add acidity or herbs.",
        "Incorporate Umami depth (aged cheese, mushrooms, fermented paste, anchovy) to round out savory foundations.",
        "Pair primary ingredients using complementary aromatic affinities."
],
      ruInstructions: [
        "Исправьте баланс: Слишком солено? Добавьте кислоту (лимон/уксус) или крахмал. Слишком жирно? Добавьте кислоту и свежие травы.",
        "Усильте глубину умами (выдержанный сыр, грибы, ферментированные соусы).",
        "Подберите гармоничные вкусовые пары на основе ароматических соединений продуктов."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","culinary","cooking","flavor-pairing","taste-balancing"],
    }),
  },
  "misc-universal-metric-to-imperial-precise-conversion": {
    id: "misc-universal-metric-to-imperial-precise-conversion",
    name: "UniversalMetrictoImperialPreciseConversionSkill",
    displayName: "Universal Metric-to-Imperial Precise Conversion",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Universal Metric-to-Imperial Precise Conversion.",
    tags: ["miscellaneous","universal","metric","to"],
    transform: createStandardSkillTransform({
      sectionName: "Metric-Imperial Conversion Protocol",
      ruSectionName: "Стандарты и практические требования: Universal Metric-to-Imperial Precise Conversion",
      instructions: [
        "Apply core domain tenets and industry best practices for Universal Metric-to-Imperial Precise Conversion.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Universal Metric-to-Imperial Precise Conversion.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","universal","metric","to"],
    }),
  },

  "misc-aviation-phonetic-alphabet-radio-callout": {
    id: "misc-aviation-phonetic-alphabet-radio-callout",
    name: "AviationPhoneticAlphabetRadioCalloutSkill",
    displayName: "Aviation Phonetic Alphabet & Radio Callout",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Aviation Phonetic Alphabet & Radio Callout.",
    tags: ["miscellaneous","aviation","phonetic","alphabet"],
    transform: createStandardSkillTransform({
      sectionName: "Aviation Radio Telephony Standards",
      ruSectionName: "Стандарты и практические требования: Aviation Phonetic Alphabet & Radio Callout",
      instructions: [
        "Apply core domain tenets and industry best practices for Aviation Phonetic Alphabet & Radio Callout.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Aviation Phonetic Alphabet & Radio Callout.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","aviation","phonetic","alphabet"],
    }),
  },

  "misc-barbecue-low-and-slow-texas-brisket-smoke-science": {
    id: "misc-barbecue-low-and-slow-texas-brisket-smoke-science",
    name: "BarbecueLowandSlowTexasBrisketSmokeScienceSkill",
    displayName: "Barbecue Low-and-Slow Texas Brisket Smoke Science",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Barbecue Low-and-Slow Texas Brisket Smoke Science.",
    tags: ["miscellaneous","barbecue","low","and"],
    transform: createStandardSkillTransform({
      sectionName: "Texas Brisket Smoke Science Standards",
      ruSectionName: "Стандарты и практические требования: Barbecue Low-and-Slow Texas Brisket Smoke Science",
      instructions: [
        "Apply core domain tenets and industry best practices for Barbecue Low-and-Slow Texas Brisket Smoke Science.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Barbecue Low-and-Slow Texas Brisket Smoke Science.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","barbecue","low","and"],
    }),
  },

  "misc-specialty-coffee-extraction-brix-tds-pour-over": {
    id: "misc-specialty-coffee-extraction-brix-tds-pour-over",
    name: "SpecialtyCoffeeExtractionBrixTDSPourOverSkill",
    displayName: "Specialty Coffee Extraction (Brix/TDS & Pour-Over)",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Specialty Coffee Extraction (Brix/TDS & Pour-Over).",
    tags: ["miscellaneous","specialty","coffee","extraction"],
    transform: createStandardSkillTransform({
      sectionName: "Specialty Coffee Extraction Standards",
      ruSectionName: "Стандарты и практические требования: Specialty Coffee Extraction (Brix/TDS & Pour-Over)",
      instructions: [
        "Apply core domain tenets and industry best practices for Specialty Coffee Extraction (Brix/TDS & Pour-Over).",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Specialty Coffee Extraction (Brix/TDS & Pour-Over).",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","specialty","coffee","extraction"],
    }),
  },

  "misc-origami-geometric-crease-pattern-folding": {
    id: "misc-origami-geometric-crease-pattern-folding",
    name: "OrigamiGeometricCreasePatternFoldingSkill",
    displayName: "Origami Geometric Crease Pattern Folding",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Origami Geometric Crease Pattern Folding.",
    tags: ["miscellaneous","origami","geometric","crease"],
    transform: createStandardSkillTransform({
      sectionName: "Origami Crease Pattern Rules",
      ruSectionName: "Стандарты и практические требования: Origami Geometric Crease Pattern Folding",
      instructions: [
        "Apply core domain tenets and industry best practices for Origami Geometric Crease Pattern Folding.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Origami Geometric Crease Pattern Folding.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","origami","geometric","crease"],
    }),
  },

  "misc-master-home-composting-c-n-ratio-balancer": {
    id: "misc-master-home-composting-c-n-ratio-balancer",
    name: "MasterHomeCompostingCNRatioBalancerSkill",
    displayName: "Master Home Composting C:N Ratio Balancer",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Master Home Composting C:N Ratio Balancer.",
    tags: ["miscellaneous","master","home","composting"],
    transform: createStandardSkillTransform({
      sectionName: "Composting Nitrogen Balancer Protocol",
      ruSectionName: "Стандарты и практические требования: Master Home Composting C:N Ratio Balancer",
      instructions: [
        "Apply core domain tenets and industry best practices for Master Home Composting C:N Ratio Balancer.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Master Home Composting C:N Ratio Balancer.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","master","home","composting"],
    }),
  },

  "misc-bonsai-tree-pruning-root-wiring-technique": {
    id: "misc-bonsai-tree-pruning-root-wiring-technique",
    name: "BonsaiTreePruningRootWiringTechniqueSkill",
    displayName: "Bonsai Tree Pruning & Root Wiring Technique",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Bonsai Tree Pruning & Root Wiring Technique.",
    tags: ["miscellaneous","bonsai","tree","pruning"],
    transform: createStandardSkillTransform({
      sectionName: "Bonsai Pruning Technique Standards",
      ruSectionName: "Стандарты и практические требования: Bonsai Tree Pruning & Root Wiring Technique",
      instructions: [
        "Apply core domain tenets and industry best practices for Bonsai Tree Pruning & Root Wiring Technique.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Bonsai Tree Pruning & Root Wiring Technique.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","bonsai","tree","pruning"],
    }),
  },

  "misc-kintsugi-japanese-gold-lacquer-ceramic-repair": {
    id: "misc-kintsugi-japanese-gold-lacquer-ceramic-repair",
    name: "KintsugiJapaneseGoldLacquerCeramicRepairSkill",
    displayName: "Kintsugi Japanese Gold Lacquer Ceramic Repair",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Kintsugi Japanese Gold Lacquer Ceramic Repair.",
    tags: ["miscellaneous","kintsugi","japanese","gold"],
    transform: createStandardSkillTransform({
      sectionName: "Kintsugi Ceramic Repair Standards",
      ruSectionName: "Стандарты и практические требования: Kintsugi Japanese Gold Lacquer Ceramic Repair",
      instructions: [
        "Apply core domain tenets and industry best practices for Kintsugi Japanese Gold Lacquer Ceramic Repair.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Kintsugi Japanese Gold Lacquer Ceramic Repair.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","kintsugi","japanese","gold"],
    }),
  },

  "misc-fermentation-sourdough-hydration-microflora": {
    id: "misc-fermentation-sourdough-hydration-microflora",
    name: "FermentationSourdoughHydrationMicrofloraSkill",
    displayName: "Fermentation Sourdough Hydration & Microflora",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Fermentation Sourdough Hydration & Microflora.",
    tags: ["miscellaneous","fermentation","sourdough","hydration"],
    transform: createStandardSkillTransform({
      sectionName: "Sourdough Fermentation Architecture",
      ruSectionName: "Стандарты и практические требования: Fermentation Sourdough Hydration & Microflora",
      instructions: [
        "Apply core domain tenets and industry best practices for Fermentation Sourdough Hydration & Microflora.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Fermentation Sourdough Hydration & Microflora.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","fermentation","sourdough","hydration"],
    }),
  },

  "misc-minimalist-edc-everyday-carry-gear-optimization": {
    id: "misc-minimalist-edc-everyday-carry-gear-optimization",
    name: "MinimalistEDCEverydayCarryGearOptimizationSkill",
    displayName: "Minimalist EDC (Everyday Carry) Gear Optimization",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Minimalist EDC (Everyday Carry) Gear Optimization.",
    tags: ["miscellaneous","minimalist","edc","everyday"],
    transform: createStandardSkillTransform({
      sectionName: "Everyday Carry Gear Standards",
      ruSectionName: "Стандарты и практические требования: Minimalist EDC (Everyday Carry) Gear Optimization",
      instructions: [
        "Apply core domain tenets and industry best practices for Minimalist EDC (Everyday Carry) Gear Optimization.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Minimalist EDC (Everyday Carry) Gear Optimization.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","minimalist","edc","everyday"],
    }),
  },

  "misc-horology-mechanical-watch-movement-escapement": {
    id: "misc-horology-mechanical-watch-movement-escapement",
    name: "HorologyMechanicalWatchMovementEscapementSkill",
    displayName: "Horology Mechanical Watch Movement Escapement",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Horology Mechanical Watch Movement Escapement.",
    tags: ["miscellaneous","horology","mechanical","watch"],
    transform: createStandardSkillTransform({
      sectionName: "Mechanical Watch Escapement Standards",
      ruSectionName: "Стандарты и практические требования: Horology Mechanical Watch Movement Escapement",
      instructions: [
        "Apply core domain tenets and industry best practices for Horology Mechanical Watch Movement Escapement.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Horology Mechanical Watch Movement Escapement.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","horology","mechanical","watch"],
    }),
  },

  "misc-scuba-diving-padi-decompression-table-planning": {
    id: "misc-scuba-diving-padi-decompression-table-planning",
    name: "ScubaDivingPADIDecompressionTablePlanningSkill",
    displayName: "Scuba Diving PADI Decompression Table Planning",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Scuba Diving PADI Decompression Table Planning.",
    tags: ["miscellaneous","scuba","diving","padi"],
    transform: createStandardSkillTransform({
      sectionName: "Scuba Decompression Planning Protocol",
      ruSectionName: "Стандарты и практические требования: Scuba Diving PADI Decompression Table Planning",
      instructions: [
        "Apply core domain tenets and industry best practices for Scuba Diving PADI Decompression Table Planning.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Scuba Diving PADI Decompression Table Planning.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","scuba","diving","padi"],
    }),
  },

  "misc-artisan-cheese-aging-affinage-rind-microbiology": {
    id: "misc-artisan-cheese-aging-affinage-rind-microbiology",
    name: "ArtisanCheeseAgingAffinageRindMicrobiologySkill",
    displayName: "Artisan Cheese Aging Affinage & Rind Microbiology",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Artisan Cheese Aging Affinage & Rind Microbiology.",
    tags: ["miscellaneous","artisan","cheese","aging"],
    transform: createStandardSkillTransform({
      sectionName: "Artisan Cheese Affinage Standards",
      ruSectionName: "Стандарты и практические требования: Artisan Cheese Aging Affinage & Rind Microbiology",
      instructions: [
        "Apply core domain tenets and industry best practices for Artisan Cheese Aging Affinage & Rind Microbiology.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Artisan Cheese Aging Affinage & Rind Microbiology.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","artisan","cheese","aging"],
    }),
  },

  "misc-wilderness-bushcraft-fire-craft-tinder-selection": {
    id: "misc-wilderness-bushcraft-fire-craft-tinder-selection",
    name: "WildernessBushcraftFireCraftTinderSelectionSkill",
    displayName: "Wilderness Bushcraft Fire Craft & Tinder Selection",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Wilderness Bushcraft Fire Craft & Tinder Selection.",
    tags: ["miscellaneous","wilderness","bushcraft","fire"],
    transform: createStandardSkillTransform({
      sectionName: "Bushcraft Wilderness Fire Protocol",
      ruSectionName: "Стандарты и практические требования: Wilderness Bushcraft Fire Craft & Tinder Selection",
      instructions: [
        "Apply core domain tenets and industry best practices for Wilderness Bushcraft Fire Craft & Tinder Selection.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Wilderness Bushcraft Fire Craft & Tinder Selection.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","wilderness","bushcraft","fire"],
    }),
  },

  "misc-bicycle-derailleur-indexing-cable-tensioning": {
    id: "misc-bicycle-derailleur-indexing-cable-tensioning",
    name: "BicycleDerailleurIndexingCableTensioningSkill",
    displayName: "Bicycle Derailleur Indexing & Cable Tensioning",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Bicycle Derailleur Indexing & Cable Tensioning.",
    tags: ["miscellaneous","bicycle","derailleur","indexing"],
    transform: createStandardSkillTransform({
      sectionName: "Bicycle Derailleur Tuning Standards",
      ruSectionName: "Стандарты и практические требования: Bicycle Derailleur Indexing & Cable Tensioning",
      instructions: [
        "Apply core domain tenets and industry best practices for Bicycle Derailleur Indexing & Cable Tensioning.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Bicycle Derailleur Indexing & Cable Tensioning.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","bicycle","derailleur","indexing"],
    }),
  },

  "misc-leathercraft-saddle-stitching-edge-burnishing": {
    id: "misc-leathercraft-saddle-stitching-edge-burnishing",
    name: "LeathercraftSaddleStitchingEdgeBurnishingSkill",
    displayName: "Leathercraft Saddle Stitching & Edge Burnishing",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Leathercraft Saddle Stitching & Edge Burnishing.",
    tags: ["miscellaneous","leathercraft","saddle","stitching"],
    transform: createStandardSkillTransform({
      sectionName: "Leathercraft Saddle Stitching Blueprint",
      ruSectionName: "Стандарты и практические требования: Leathercraft Saddle Stitching & Edge Burnishing",
      instructions: [
        "Apply core domain tenets and industry best practices for Leathercraft Saddle Stitching & Edge Burnishing.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Leathercraft Saddle Stitching & Edge Burnishing.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","leathercraft","saddle","stitching"],
    }),
  },

  "misc-aquaponics-closed-loop-nitrogen-cycle-system": {
    id: "misc-aquaponics-closed-loop-nitrogen-cycle-system",
    name: "AquaponicsClosedLoopNitrogenCycleSystemSkill",
    displayName: "Aquaponics Closed-Loop Nitrogen Cycle System",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Aquaponics Closed-Loop Nitrogen Cycle System.",
    tags: ["miscellaneous","aquaponics","closed","loop"],
    transform: createStandardSkillTransform({
      sectionName: "Aquaponics Nitrogen Cycle Standards",
      ruSectionName: "Стандарты и практические требования: Aquaponics Closed-Loop Nitrogen Cycle System",
      instructions: [
        "Apply core domain tenets and industry best practices for Aquaponics Closed-Loop Nitrogen Cycle System.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Aquaponics Closed-Loop Nitrogen Cycle System.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","aquaponics","closed","loop"],
    }),
  },

  "misc-lockpicking-pin-tumbler-spp-mechanics": {
    id: "misc-lockpicking-pin-tumbler-spp-mechanics",
    name: "LockpickingPinTumblerSPPMechanicsSkill",
    displayName: "Lockpicking Pin-Tumbler SPP Mechanics",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Lockpicking Pin-Tumbler SPP Mechanics.",
    tags: ["miscellaneous","lockpicking","pin","tumbler"],
    transform: createStandardSkillTransform({
      sectionName: "Pin-Tumbler Lockpicking Mechanics",
      ruSectionName: "Стандарты и практические требования: Lockpicking Pin-Tumbler SPP Mechanics",
      instructions: [
        "Apply core domain tenets and industry best practices for Lockpicking Pin-Tumbler SPP Mechanics.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Lockpicking Pin-Tumbler SPP Mechanics.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","lockpicking","pin","tumbler"],
    }),
  },

  "misc-knots-cordage-bowline-clove-hitch-rigging": {
    id: "misc-knots-cordage-bowline-clove-hitch-rigging",
    name: "KnotsCordageBowlineCloveHitchRiggingSkill",
    displayName: "Knots & Cordage Bowline Clove Hitch Rigging",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Knots & Cordage Bowline Clove Hitch Rigging.",
    tags: ["miscellaneous","knots","cordage","bowline"],
    transform: createStandardSkillTransform({
      sectionName: "Rigging Knots Standards",
      ruSectionName: "Стандарты и практические требования: Knots & Cordage Bowline Clove Hitch Rigging",
      instructions: [
        "Apply core domain tenets and industry best practices for Knots & Cordage Bowline Clove Hitch Rigging.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Knots & Cordage Bowline Clove Hitch Rigging.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","knots","cordage","bowline"],
    }),
  },

  "misc-traditional-archery-form-instinctive-aiming": {
    id: "misc-traditional-archery-form-instinctive-aiming",
    name: "TraditionalArcheryFormInstinctiveAimingSkill",
    displayName: "Traditional Archery Form & Instinctive Aiming",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Traditional Archery Form & Instinctive Aiming.",
    tags: ["miscellaneous","traditional","archery","form"],
    transform: createStandardSkillTransform({
      sectionName: "Traditional Archery Form Protocol",
      ruSectionName: "Стандарты и практические требования: Traditional Archery Form & Instinctive Aiming",
      instructions: [
        "Apply core domain tenets and industry best practices for Traditional Archery Form & Instinctive Aiming.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Traditional Archery Form & Instinctive Aiming.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","traditional","archery","form"],
    }),
  },

  "misc-amateur-ham-radio-repeater-protocols-callsigns": {
    id: "misc-amateur-ham-radio-repeater-protocols-callsigns",
    name: "AmateurHamRadioRepeaterProtocolsCallsignsSkill",
    displayName: "Amateur Ham Radio Repeater Protocols & Callsigns",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Amateur Ham Radio Repeater Protocols & Callsigns.",
    tags: ["miscellaneous","amateur","ham","radio"],
    transform: createStandardSkillTransform({
      sectionName: "Ham Radio Operator Standards",
      ruSectionName: "Стандарты и практические требования: Amateur Ham Radio Repeater Protocols & Callsigns",
      instructions: [
        "Apply core domain tenets and industry best practices for Amateur Ham Radio Repeater Protocols & Callsigns.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Amateur Ham Radio Repeater Protocols & Callsigns.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","amateur","ham","radio"],
    }),
  },

  "misc-beekeeping-langstroth-hive-inspection-brood-health": {
    id: "misc-beekeeping-langstroth-hive-inspection-brood-health",
    name: "BeekeepingLangstrothHiveInspectionBroodHealthSkill",
    displayName: "Beekeeping Langstroth Hive Inspection & Brood Health",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Beekeeping Langstroth Hive Inspection & Brood Health.",
    tags: ["miscellaneous","beekeeping","langstroth","hive"],
    transform: createStandardSkillTransform({
      sectionName: "Beekeeping Hive Inspection Standards",
      ruSectionName: "Стандарты и практические требования: Beekeeping Langstroth Hive Inspection & Brood Health",
      instructions: [
        "Apply core domain tenets and industry best practices for Beekeeping Langstroth Hive Inspection & Brood Health.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Beekeeping Langstroth Hive Inspection & Brood Health.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","beekeeping","langstroth","hive"],
    }),
  },

  "misc-darkroom-black-and-white-film-developing-chemistries": {
    id: "misc-darkroom-black-and-white-film-developing-chemistries",
    name: "DarkroomBlackandWhiteFilmDevelopingChemistriesSkill",
    displayName: "Darkroom Black-and-White Film Developing Chemistries",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Darkroom Black-and-White Film Developing Chemistries.",
    tags: ["miscellaneous","darkroom","black","and"],
    transform: createStandardSkillTransform({
      sectionName: "Film Developing Chemistry Protocol",
      ruSectionName: "Стандарты и практические требования: Darkroom Black-and-White Film Developing Chemistries",
      instructions: [
        "Apply core domain tenets and industry best practices for Darkroom Black-and-White Film Developing Chemistries.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Darkroom Black-and-White Film Developing Chemistries.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","darkroom","black","and"],
    }),
  },

  "misc-blacksmithing-hammer-forging-steel-heat-treatment": {
    id: "misc-blacksmithing-hammer-forging-steel-heat-treatment",
    name: "BlacksmithingHammerForgingSteelHeatTreatmentSkill",
    displayName: "Blacksmithing Hammer Forging & Steel Heat Treatment",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Blacksmithing Hammer Forging & Steel Heat Treatment.",
    tags: ["miscellaneous","blacksmithing","hammer","forging"],
    transform: createStandardSkillTransform({
      sectionName: "Blacksmithing Forging Standards",
      ruSectionName: "Стандарты и практические требования: Blacksmithing Hammer Forging & Steel Heat Treatment",
      instructions: [
        "Apply core domain tenets and industry best practices for Blacksmithing Hammer Forging & Steel Heat Treatment.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Blacksmithing Hammer Forging & Steel Heat Treatment.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","blacksmithing","hammer","forging"],
    }),
  },

  "misc-indoor-houseplant-soil-aeration-photosynthetic-lighting": {
    id: "misc-indoor-houseplant-soil-aeration-photosynthetic-lighting",
    name: "IndoorHouseplantSoilAerationPhotosyntheticLightingSkill",
    displayName: "Indoor Houseplant Soil Aeration & Photosynthetic Lighting",
    categoryId: "miscellaneous",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Indoor Houseplant Soil Aeration & Photosynthetic Lighting.",
    tags: ["miscellaneous","indoor","houseplant","soil"],
    transform: createStandardSkillTransform({
      sectionName: "Indoor Botanical Lighting Standards",
      ruSectionName: "Стандарты и практические требования: Indoor Houseplant Soil Aeration & Photosynthetic Lighting",
      instructions: [
        "Apply core domain tenets and industry best practices for Indoor Houseplant Soil Aeration & Photosynthetic Lighting.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Indoor Houseplant Soil Aeration & Photosynthetic Lighting.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["miscellaneous","indoor","houseplant","soil"],
    }),
  },
};
