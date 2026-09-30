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
  "misc-universal-metric-to-imperial-conversion-mechanics": {
    id: "misc-universal-metric-to-imperial-conversion-mechanics",
    name: "UniversalMetrictoImperialConversionMechanicsSkill",
    displayName: "Universal Metric-to-Imperial Conversion Mechanics",
    categoryId: "miscellaneous",
    description: "Converts length, weight, volume, and temperature units with high precision.",
    tags: ["miscellaneous","misc","universal","metric"],
    transform: createStandardSkillTransform({
      sectionName: "Universal Metric-to-Imperial Conversion Mechanics Standards",
      ruSectionName: "Стандарты и регламенты: Universal Metric-to-Imperial Conversion Mechanics",
      instructions: [
        "Apply core domain tenets for Universal Metric-to-Imperial Conversion Mechanics.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Universal Metric-to-Imperial Conversion Mechanics.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","universal","metric"],
    }),
  },

  "misc-aviation-phonetic-alphabet-radio-telephony": {
    id: "misc-aviation-phonetic-alphabet-radio-telephony",
    name: "AviationPhoneticAlphabetRadioTelephonySkill",
    displayName: "Aviation Phonetic Alphabet & Radio Telephony",
    categoryId: "miscellaneous",
    description: "Uses standard NATO phonetic alphabet (Alpha, Bravo) and aviation radio callouts.",
    tags: ["miscellaneous","misc","aviation","phonetic"],
    transform: createStandardSkillTransform({
      sectionName: "Aviation Phonetic Alphabet & Radio Telephony Standards",
      ruSectionName: "Стандарты и регламенты: Aviation Phonetic Alphabet & Radio Telephony",
      instructions: [
        "Apply core domain tenets for Aviation Phonetic Alphabet & Radio Telephony.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Aviation Phonetic Alphabet & Radio Telephony.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","aviation","phonetic"],
    }),
  },

  "misc-texas-style-low-and-slow-barbecue-smoke-science": {
    id: "misc-texas-style-low-and-slow-barbecue-smoke-science",
    name: "TexasStyleLowandSlowBarbecueSmokeScienceSkill",
    displayName: "Texas Style Low-and-Slow Barbecue Smoke Science",
    categoryId: "miscellaneous",
    description: "Manages pit temperature, wood smoke chemistry, collagen breakdown, and bark.",
    tags: ["miscellaneous","misc","texas","style"],
    transform: createStandardSkillTransform({
      sectionName: "Texas Style Low-and-Slow Barbecue Smoke Science Standards",
      ruSectionName: "Стандарты и регламенты: Texas Style Low-and-Slow Barbecue Smoke Science",
      instructions: [
        "Apply core domain tenets for Texas Style Low-and-Slow Barbecue Smoke Science.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Texas Style Low-and-Slow Barbecue Smoke Science.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","texas","style"],
    }),
  },

  "misc-specialty-coffee-pour-over-extraction-science": {
    id: "misc-specialty-coffee-pour-over-extraction-science",
    name: "SpecialtyCoffeePourOverExtractionScienceSkill",
    displayName: "Specialty Coffee Pour-Over Extraction Science",
    categoryId: "miscellaneous",
    description: "Controls water temperature, grind size distribution, brew ratio, and TDS extraction.",
    tags: ["miscellaneous","misc","specialty","coffee"],
    transform: createStandardSkillTransform({
      sectionName: "Specialty Coffee Pour-Over Extraction Science Standards",
      ruSectionName: "Стандарты и регламенты: Specialty Coffee Pour-Over Extraction Science",
      instructions: [
        "Apply core domain tenets for Specialty Coffee Pour-Over Extraction Science.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Specialty Coffee Pour-Over Extraction Science.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","specialty","coffee"],
    }),
  },

  "misc-master-home-composting-carbon-to-nitrogen-ratio": {
    id: "misc-master-home-composting-carbon-to-nitrogen-ratio",
    name: "MasterHomeCompostingCarbontoNitrogenRatioSkill",
    displayName: "Master Home Composting Carbon-to-Nitrogen Ratio",
    categoryId: "miscellaneous",
    description: "Balances green/brown materials (30:1 C:N ratio) for fast aerobic composting.",
    tags: ["miscellaneous","misc","master","home"],
    transform: createStandardSkillTransform({
      sectionName: "Master Home Composting Carbon-to-Nitrogen Ratio Standards",
      ruSectionName: "Стандарты и регламенты: Master Home Composting Carbon-to-Nitrogen Ratio",
      instructions: [
        "Apply core domain tenets for Master Home Composting Carbon-to-Nitrogen Ratio.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Master Home Composting Carbon-to-Nitrogen Ratio.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","master","home"],
    }),
  },

  "misc-fermentation-sourdough-hydration-starter-health": {
    id: "misc-fermentation-sourdough-hydration-starter-health",
    name: "FermentationSourdoughHydrationStarterHealthSkill",
    displayName: "Fermentation Sourdough Hydration & Starter Health",
    categoryId: "miscellaneous",
    description: "Maintains wild yeast sourdough starters, controlling hydration and fermentation.",
    tags: ["miscellaneous","misc","fermentation","sourdough"],
    transform: createStandardSkillTransform({
      sectionName: "Fermentation Sourdough Hydration & Starter Health Standards",
      ruSectionName: "Стандарты и регламенты: Fermentation Sourdough Hydration & Starter Health",
      instructions: [
        "Apply core domain tenets for Fermentation Sourdough Hydration & Starter Health.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Fermentation Sourdough Hydration & Starter Health.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","fermentation","sourdough"],
    }),
  },

  "misc-minimalist-everyday-carry-edc-gear-optimization": {
    id: "misc-minimalist-everyday-carry-edc-gear-optimization",
    name: "MinimalistEverydayCarryEDCGearOptimizationSkill",
    displayName: "Minimalist Everyday Carry (EDC) Gear Optimization",
    categoryId: "miscellaneous",
    description: "Optimizes daily pocket tools and gear for utility, durability, and minimal weight.",
    tags: ["miscellaneous","misc","minimalist","everyday"],
    transform: createStandardSkillTransform({
      sectionName: "Minimalist Everyday Carry (EDC) Gear Optimization Standards",
      ruSectionName: "Стандарты и регламенты: Minimalist Everyday Carry (EDC) Gear Optimization",
      instructions: [
        "Apply core domain tenets for Minimalist Everyday Carry (EDC) Gear Optimization.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Minimalist Everyday Carry (EDC) Gear Optimization.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","minimalist","everyday"],
    }),
  },

  "misc-horology-mechanical-watch-escapement-tuning": {
    id: "misc-horology-mechanical-watch-escapement-tuning",
    name: "HorologyMechanicalWatchEscapementTuningSkill",
    displayName: "Horology Mechanical Watch Escapement Tuning",
    categoryId: "miscellaneous",
    description: "Adjusts mechanical watch balance wheels, hairsprings, and lever escapements.",
    tags: ["miscellaneous","misc","horology","mechanical"],
    transform: createStandardSkillTransform({
      sectionName: "Horology Mechanical Watch Escapement Tuning Standards",
      ruSectionName: "Стандарты и регламенты: Horology Mechanical Watch Escapement Tuning",
      instructions: [
        "Apply core domain tenets for Horology Mechanical Watch Escapement Tuning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Horology Mechanical Watch Escapement Tuning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","horology","mechanical"],
    }),
  },

  "misc-scuba-diving-decompression-table-planning": {
    id: "misc-scuba-diving-decompression-table-planning",
    name: "ScubaDivingDecompressionTablePlanningSkill",
    displayName: "Scuba Diving Decompression Table Planning",
    categoryId: "miscellaneous",
    description: "Calculates safe dive profiles, nitrogen absorption, and decompression stops.",
    tags: ["miscellaneous","misc","scuba","diving"],
    transform: createStandardSkillTransform({
      sectionName: "Scuba Diving Decompression Table Planning Standards",
      ruSectionName: "Стандарты и регламенты: Scuba Diving Decompression Table Planning",
      instructions: [
        "Apply core domain tenets for Scuba Diving Decompression Table Planning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Scuba Diving Decompression Table Planning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","scuba","diving"],
    }),
  },

  "misc-artisan-cheese-aging-affinage-microbiology": {
    id: "misc-artisan-cheese-aging-affinage-microbiology",
    name: "ArtisanCheeseAgingAffinageMicrobiologySkill",
    displayName: "Artisan Cheese Aging Affinage & Microbiology",
    categoryId: "miscellaneous",
    description: "Controls humidity, temperature, and rind flora during cheese maturation.",
    tags: ["miscellaneous","misc","artisan","cheese"],
    transform: createStandardSkillTransform({
      sectionName: "Artisan Cheese Aging Affinage & Microbiology Standards",
      ruSectionName: "Стандарты и регламенты: Artisan Cheese Aging Affinage & Microbiology",
      instructions: [
        "Apply core domain tenets for Artisan Cheese Aging Affinage & Microbiology.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Artisan Cheese Aging Affinage & Microbiology.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","artisan","cheese"],
    }),
  },

  "misc-bicycle-derailleur-indexing-cable-tuning": {
    id: "misc-bicycle-derailleur-indexing-cable-tuning",
    name: "BicycleDerailleurIndexingCableTuningSkill",
    displayName: "Bicycle Derailleur Indexing & Cable Tuning",
    categoryId: "miscellaneous",
    description: "Adjusts bike gear shifters, cable tension, and limit screws for crisp shifting.",
    tags: ["miscellaneous","misc","bicycle","derailleur"],
    transform: createStandardSkillTransform({
      sectionName: "Bicycle Derailleur Indexing & Cable Tuning Standards",
      ruSectionName: "Стандарты и регламенты: Bicycle Derailleur Indexing & Cable Tuning",
      instructions: [
        "Apply core domain tenets for Bicycle Derailleur Indexing & Cable Tuning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Bicycle Derailleur Indexing & Cable Tuning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","bicycle","derailleur"],
    }),
  },

  "misc-pin-tumbler-lockpicking-mechanics-binding-order": {
    id: "misc-pin-tumbler-lockpicking-mechanics-binding-order",
    name: "PinTumblerLockpickingMechanicsBindingOrderSkill",
    displayName: "Pin-Tumbler Lockpicking Mechanics & Binding Order",
    categoryId: "miscellaneous",
    description: "Explains pin-tumbler lock shear lines, binding order, and single-pin picking.",
    tags: ["miscellaneous","misc","pin","tumbler"],
    transform: createStandardSkillTransform({
      sectionName: "Pin-Tumbler Lockpicking Mechanics & Binding Order Standards",
      ruSectionName: "Стандарты и регламенты: Pin-Tumbler Lockpicking Mechanics & Binding Order",
      instructions: [
        "Apply core domain tenets for Pin-Tumbler Lockpicking Mechanics & Binding Order.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Pin-Tumbler Lockpicking Mechanics & Binding Order.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","pin","tumbler"],
    }),
  },

  "misc-rigging-knots-cordage-lashings-bowline-clove": {
    id: "misc-rigging-knots-cordage-lashings-bowline-clove",
    name: "RiggingKnotsCordageLashingsBowlineCloveSkill",
    displayName: "Rigging Knots & Cordage Lashings (Bowline, Clove)",
    categoryId: "miscellaneous",
    description: "Ties reliable knots: Bowline, Clove Hitch, Taut-line, and square lashings.",
    tags: ["miscellaneous","misc","rigging","knots"],
    transform: createStandardSkillTransform({
      sectionName: "Rigging Knots & Cordage Lashings (Bowline, Clove) Standards",
      ruSectionName: "Стандарты и регламенты: Rigging Knots & Cordage Lashings (Bowline, Clove)",
      instructions: [
        "Apply core domain tenets for Rigging Knots & Cordage Lashings (Bowline, Clove).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Rigging Knots & Cordage Lashings (Bowline, Clove).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","rigging","knots"],
    }),
  },

  "misc-beekeeping-langstroth-hive-inspection-health": {
    id: "misc-beekeeping-langstroth-hive-inspection-health",
    name: "BeekeepingLangstrothHiveInspectionHealthSkill",
    displayName: "Beekeeping Langstroth Hive Inspection & Health",
    categoryId: "miscellaneous",
    description: "Inspects bee hives for queen health, honey stores, and varroa mite prevention.",
    tags: ["miscellaneous","misc","beekeeping","langstroth"],
    transform: createStandardSkillTransform({
      sectionName: "Beekeeping Langstroth Hive Inspection & Health Standards",
      ruSectionName: "Стандарты и регламенты: Beekeeping Langstroth Hive Inspection & Health",
      instructions: [
        "Apply core domain tenets for Beekeeping Langstroth Hive Inspection & Health.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Beekeeping Langstroth Hive Inspection & Health.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","beekeeping","langstroth"],
    }),
  },

  "misc-darkroom-black-and-white-film-chemistry": {
    id: "misc-darkroom-black-and-white-film-chemistry",
    name: "DarkroomBlackandWhiteFilmChemistrySkill",
    displayName: "Darkroom Black-and-White Film Chemistry",
    categoryId: "miscellaneous",
    description: "Develops 35mm B&W film using developer, stop bath, fixer, and wash chemistry.",
    tags: ["miscellaneous","misc","darkroom","black"],
    transform: createStandardSkillTransform({
      sectionName: "Darkroom Black-and-White Film Chemistry Standards",
      ruSectionName: "Стандарты и регламенты: Darkroom Black-and-White Film Chemistry",
      instructions: [
        "Apply core domain tenets for Darkroom Black-and-White Film Chemistry.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Darkroom Black-and-White Film Chemistry.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","darkroom","black"],
    }),
  },

  "misc-blacksmithing-hammer-forging-heat-treatment": {
    id: "misc-blacksmithing-hammer-forging-heat-treatment",
    name: "BlacksmithingHammerForgingHeatTreatmentSkill",
    displayName: "Blacksmithing Hammer Forging & Heat Treatment",
    categoryId: "miscellaneous",
    description: "Forges steel tools using anvil techniques, quenching, and tempering cycles.",
    tags: ["miscellaneous","misc","blacksmithing","hammer"],
    transform: createStandardSkillTransform({
      sectionName: "Blacksmithing Hammer Forging & Heat Treatment Standards",
      ruSectionName: "Стандарты и регламенты: Blacksmithing Hammer Forging & Heat Treatment",
      instructions: [
        "Apply core domain tenets for Blacksmithing Hammer Forging & Heat Treatment.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Blacksmithing Hammer Forging & Heat Treatment.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","blacksmithing","hammer"],
    }),
  },

  "misc-indoor-houseplant-soil-aeration-lighting": {
    id: "misc-indoor-houseplant-soil-aeration-lighting",
    name: "IndoorHouseplantSoilAerationLightingSkill",
    displayName: "Indoor Houseplant Soil Aeration & Lighting",
    categoryId: "miscellaneous",
    description: "Selects soil mixes, watering schedules, and grow light spectra for tropical plants.",
    tags: ["miscellaneous","misc","indoor","houseplant"],
    transform: createStandardSkillTransform({
      sectionName: "Indoor Houseplant Soil Aeration & Lighting Standards",
      ruSectionName: "Стандарты и регламенты: Indoor Houseplant Soil Aeration & Lighting",
      instructions: [
        "Apply core domain tenets for Indoor Houseplant Soil Aeration & Lighting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Indoor Houseplant Soil Aeration & Lighting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","indoor","houseplant"],
    }),
  },

  "misc-classic-cocktail-mixology-balance-chemistry": {
    id: "misc-classic-cocktail-mixology-balance-chemistry",
    name: "ClassicCocktailMixologyBalanceChemistrySkill",
    displayName: "Classic Cocktail Mixology & Balance Chemistry",
    categoryId: "miscellaneous",
    description: "Balances spirit, acid, sugar, and dilution ratios in classic cocktails.",
    tags: ["miscellaneous","misc","classic","cocktail"],
    transform: createStandardSkillTransform({
      sectionName: "Classic Cocktail Mixology & Balance Chemistry Standards",
      ruSectionName: "Стандарты и регламенты: Classic Cocktail Mixology & Balance Chemistry",
      instructions: [
        "Apply core domain tenets for Classic Cocktail Mixology & Balance Chemistry.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Classic Cocktail Mixology & Balance Chemistry.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","classic","cocktail"],
    }),
  },

  "misc-woodworking-hand-plane-sharpening-jointing": {
    id: "misc-woodworking-hand-plane-sharpening-jointing",
    name: "WoodworkingHandPlaneSharpeningJointingSkill",
    displayName: "Woodworking Hand Plane Sharpening & Jointing",
    categoryId: "miscellaneous",
    description: "Tunes hand planes and cuts precise mortise-and-tenon or dovetail joints.",
    tags: ["miscellaneous","misc","woodworking","hand"],
    transform: createStandardSkillTransform({
      sectionName: "Woodworking Hand Plane Sharpening & Jointing Standards",
      ruSectionName: "Стандарты и регламенты: Woodworking Hand Plane Sharpening & Jointing",
      instructions: [
        "Apply core domain tenets for Woodworking Hand Plane Sharpening & Jointing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Woodworking Hand Plane Sharpening & Jointing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","woodworking","hand"],
    }),
  },

  "misc-sailboat-wind-tacking-sail-trim-ergonomics": {
    id: "misc-sailboat-wind-tacking-sail-trim-ergonomics",
    name: "SailboatWindTackingSailTrimErgonomicsSkill",
    displayName: "Sailboat Wind Tacking & Sail Trim Ergonomics",
    categoryId: "miscellaneous",
    description: "Trims mainsails and headsails to optimize speed on different points of sail.",
    tags: ["miscellaneous","misc","sailboat","wind"],
    transform: createStandardSkillTransform({
      sectionName: "Sailboat Wind Tacking & Sail Trim Ergonomics Standards",
      ruSectionName: "Стандарты и регламенты: Sailboat Wind Tacking & Sail Trim Ergonomics",
      instructions: [
        "Apply core domain tenets for Sailboat Wind Tacking & Sail Trim Ergonomics.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sailboat Wind Tacking & Sail Trim Ergonomics.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","sailboat","wind"],
    }),
  },

  "misc-vintage-audio-vacuum-tube-amplifier-restoration": {
    id: "misc-vintage-audio-vacuum-tube-amplifier-restoration",
    name: "VintageAudioVacuumTubeAmplifierRestorationSkill",
    displayName: "Vintage Audio Vacuum Tube Amplifier Restoration",
    categoryId: "miscellaneous",
    description: "Tests and replaces vacuum tubes, capacitors, and bias resistors in tube amps.",
    tags: ["miscellaneous","misc","vintage","audio"],
    transform: createStandardSkillTransform({
      sectionName: "Vintage Audio Vacuum Tube Amplifier Restoration Standards",
      ruSectionName: "Стандарты и регламенты: Vintage Audio Vacuum Tube Amplifier Restoration",
      instructions: [
        "Apply core domain tenets for Vintage Audio Vacuum Tube Amplifier Restoration.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Vintage Audio Vacuum Tube Amplifier Restoration.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","vintage","audio"],
    }),
  },

  "misc-astronomy-telescope-polar-alignment-collimation": {
    id: "misc-astronomy-telescope-polar-alignment-collimation",
    name: "AstronomyTelescopePolarAlignmentCollimationSkill",
    displayName: "Astronomy Telescope Polar Alignment & Collimation",
    categoryId: "miscellaneous",
    description: "Aligns equatorial telescope mounts with celestial poles for astrophotography.",
    tags: ["miscellaneous","misc","astronomy","telescope"],
    transform: createStandardSkillTransform({
      sectionName: "Astronomy Telescope Polar Alignment & Collimation Standards",
      ruSectionName: "Стандарты и регламенты: Astronomy Telescope Polar Alignment & Collimation",
      instructions: [
        "Apply core domain tenets for Astronomy Telescope Polar Alignment & Collimation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Astronomy Telescope Polar Alignment & Collimation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","astronomy","telescope"],
    }),
  },

  "misc-wild-edible-mushroom-foraging-identification": {
    id: "misc-wild-edible-mushroom-foraging-identification",
    name: "WildEdibleMushroomForagingIdentificationSkill",
    displayName: "Wild Edible Mushroom Foraging Identification",
    categoryId: "miscellaneous",
    description: "Identifies safe wild edible mushrooms while avoiding toxic lookalikes.",
    tags: ["miscellaneous","misc","wild","edible"],
    transform: createStandardSkillTransform({
      sectionName: "Wild Edible Mushroom Foraging Identification Standards",
      ruSectionName: "Стандарты и регламенты: Wild Edible Mushroom Foraging Identification",
      instructions: [
        "Apply core domain tenets for Wild Edible Mushroom Foraging Identification.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Wild Edible Mushroom Foraging Identification.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","wild","edible"],
    }),
  },

  "misc-acoustic-guitar-setup-action-intonation": {
    id: "misc-acoustic-guitar-setup-action-intonation",
    name: "AcousticGuitarSetupActionIntonationSkill",
    displayName: "Acoustic Guitar Setup Action & Intonation",
    categoryId: "miscellaneous",
    description: "Adjusts guitar truss rods, nut slots, and saddle height for perfect intonation.",
    tags: ["miscellaneous","misc","acoustic","guitar"],
    transform: createStandardSkillTransform({
      sectionName: "Acoustic Guitar Setup Action & Intonation Standards",
      ruSectionName: "Стандарты и регламенты: Acoustic Guitar Setup Action & Intonation",
      instructions: [
        "Apply core domain tenets for Acoustic Guitar Setup Action & Intonation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Acoustic Guitar Setup Action & Intonation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","acoustic","guitar"],
    }),
  },

  "misc-hydroponic-deep-water-culture-dwc-nutrient-ec": {
    id: "misc-hydroponic-deep-water-culture-dwc-nutrient-ec",
    name: "HydroponicDeepWaterCultureDWCNutrientECSkill",
    displayName: "Hydroponic Deep Water Culture (DWC) Nutrient EC",
    categoryId: "miscellaneous",
    description: "Monitors pH and electrical conductivity (EC) in hydroponic nutrient reservoirs.",
    tags: ["miscellaneous","misc","hydroponic","deep"],
    transform: createStandardSkillTransform({
      sectionName: "Hydroponic Deep Water Culture (DWC) Nutrient EC Standards",
      ruSectionName: "Стандарты и регламенты: Hydroponic Deep Water Culture (DWC) Nutrient EC",
      instructions: [
        "Apply core domain tenets for Hydroponic Deep Water Culture (DWC) Nutrient EC.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hydroponic Deep Water Culture (DWC) Nutrient EC.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","hydroponic","deep"],
    }),
  },

  "misc-traditional-meat-curing-charcuterie-salumi": {
    id: "misc-traditional-meat-curing-charcuterie-salumi",
    name: "TraditionalMeatCuringCharcuterieSalumiSkill",
    displayName: "Traditional Meat Curing & Charcuterie Salumi",
    categoryId: "miscellaneous",
    description: "Cures whole-muscle meats using equilibrium nitrites, fermentation, and drying.",
    tags: ["miscellaneous","misc","traditional","meat"],
    transform: createStandardSkillTransform({
      sectionName: "Traditional Meat Curing & Charcuterie Salumi Standards",
      ruSectionName: "Стандарты и регламенты: Traditional Meat Curing & Charcuterie Salumi",
      instructions: [
        "Apply core domain tenets for Traditional Meat Curing & Charcuterie Salumi.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traditional Meat Curing & Charcuterie Salumi.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","traditional","meat"],
    }),
  },

  "misc-stained-glass-copper-foil-tiffany-technique": {
    id: "misc-stained-glass-copper-foil-tiffany-technique",
    name: "StainedGlassCopperFoilTiffanyTechniqueSkill",
    displayName: "Stained Glass Copper Foil Tiffany Technique",
    categoryId: "miscellaneous",
    description: "Cuts glass, applies copper foil tape, and solders stained glass panels.",
    tags: ["miscellaneous","misc","stained","glass"],
    transform: createStandardSkillTransform({
      sectionName: "Stained Glass Copper Foil Tiffany Technique Standards",
      ruSectionName: "Стандарты и регламенты: Stained Glass Copper Foil Tiffany Technique",
      instructions: [
        "Apply core domain tenets for Stained Glass Copper Foil Tiffany Technique.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Stained Glass Copper Foil Tiffany Technique.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","stained","glass"],
    }),
  },

  "misc-hand-pottery-wheel-throwing-centering": {
    id: "misc-hand-pottery-wheel-throwing-centering",
    name: "HandPotteryWheelThrowingCenteringSkill",
    displayName: "Hand Pottery Wheel Throwing & Centering",
    categoryId: "miscellaneous",
    description: "Centers clay on the pottery wheel and pulls uniform cylinder walls.",
    tags: ["miscellaneous","misc","hand","pottery"],
    transform: createStandardSkillTransform({
      sectionName: "Hand Pottery Wheel Throwing & Centering Standards",
      ruSectionName: "Стандарты и регламенты: Hand Pottery Wheel Throwing & Centering",
      instructions: [
        "Apply core domain tenets for Hand Pottery Wheel Throwing & Centering.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hand Pottery Wheel Throwing & Centering.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","hand","pottery"],
    }),
  },

  "misc-urban-beekeeping-top-bar-hive-construction": {
    id: "misc-urban-beekeeping-top-bar-hive-construction",
    name: "UrbanBeekeepingTopBarHiveConstructionSkill",
    displayName: "Urban Beekeeping Top-Bar Hive Construction",
    categoryId: "miscellaneous",
    description: "Builds and manages horizontal top-bar beehives for natural comb building.",
    tags: ["miscellaneous","misc","urban","beekeeping"],
    transform: createStandardSkillTransform({
      sectionName: "Urban Beekeeping Top-Bar Hive Construction Standards",
      ruSectionName: "Стандарты и регламенты: Urban Beekeeping Top-Bar Hive Construction",
      instructions: [
        "Apply core domain tenets for Urban Beekeeping Top-Bar Hive Construction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Urban Beekeeping Top-Bar Hive Construction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","urban","beekeeping"],
    }),
  },

  "misc-high-altitude-baking-chemistry-adjustments": {
    id: "misc-high-altitude-baking-chemistry-adjustments",
    name: "HighAltitudeBakingChemistryAdjustmentsSkill",
    displayName: "High-Altitude Baking Chemistry Adjustments",
    categoryId: "miscellaneous",
    description: "Adjusts flour, liquid, leavening, and oven temps for baking above 5000 feet.",
    tags: ["miscellaneous","misc","high","altitude"],
    transform: createStandardSkillTransform({
      sectionName: "High-Altitude Baking Chemistry Adjustments Standards",
      ruSectionName: "Стандарты и регламенты: High-Altitude Baking Chemistry Adjustments",
      instructions: [
        "Apply core domain tenets for High-Altitude Baking Chemistry Adjustments.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для High-Altitude Baking Chemistry Adjustments.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","high","altitude"],
    }),
  },

  "misc-typewriter-restoration-mechanical-unsticking": {
    id: "misc-typewriter-restoration-mechanical-unsticking",
    name: "TypewriterRestorationMechanicalUnstickingSkill",
    displayName: "Typewriter Restoration Mechanical Unsticking",
    categoryId: "miscellaneous",
    description: "Cleans and aligns manual typewriter segment typebars and drawbands.",
    tags: ["miscellaneous","misc","typewriter","restoration"],
    transform: createStandardSkillTransform({
      sectionName: "Typewriter Restoration Mechanical Unsticking Standards",
      ruSectionName: "Стандарты и регламенты: Typewriter Restoration Mechanical Unsticking",
      instructions: [
        "Apply core domain tenets for Typewriter Restoration Mechanical Unsticking.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Typewriter Restoration Mechanical Unsticking.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","typewriter","restoration"],
    }),
  },

  "misc-fly-fishing-match-the-hatch-insect-selection": {
    id: "misc-fly-fishing-match-the-hatch-insect-selection",
    name: "FlyFishingMatchtheHatchInsectSelectionSkill",
    displayName: "Fly Fishing Match-the-Hatch Insect Selection",
    categoryId: "miscellaneous",
    description: "Selects artificial dry flies matching local aquatic insect hatches.",
    tags: ["miscellaneous","misc","fly","fishing"],
    transform: createStandardSkillTransform({
      sectionName: "Fly Fishing Match-the-Hatch Insect Selection Standards",
      ruSectionName: "Стандарты и регламенты: Fly Fishing Match-the-Hatch Insect Selection",
      instructions: [
        "Apply core domain tenets for Fly Fishing Match-the-Hatch Insect Selection.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Fly Fishing Match-the-Hatch Insect Selection.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","fly","fishing"],
    }),
  },

  "misc-traditional-screen-printing-emulsion-exposure": {
    id: "misc-traditional-screen-printing-emulsion-exposure",
    name: "TraditionalScreenPrintingEmulsionExposureSkill",
    displayName: "Traditional Screen Printing Emulsion Exposure",
    categoryId: "miscellaneous",
    description: "Exposes photo-emulsion screens and pulls even ink passes on apparel.",
    tags: ["miscellaneous","misc","traditional","screen"],
    transform: createStandardSkillTransform({
      sectionName: "Traditional Screen Printing Emulsion Exposure Standards",
      ruSectionName: "Стандарты и регламенты: Traditional Screen Printing Emulsion Exposure",
      instructions: [
        "Apply core domain tenets for Traditional Screen Printing Emulsion Exposure.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traditional Screen Printing Emulsion Exposure.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","traditional","screen"],
    }),
  },

  "misc-bookbinding-coptic-stitch-leather-binding": {
    id: "misc-bookbinding-coptic-stitch-leather-binding",
    name: "BookbindingCopticStitchLeatherBindingSkill",
    displayName: "Bookbinding Coptic Stitch & Leather Binding",
    categoryId: "miscellaneous",
    description: "Binds multi-signature hardcover books using traditional Coptic stitching.",
    tags: ["miscellaneous","misc","bookbinding","coptic"],
    transform: createStandardSkillTransform({
      sectionName: "Bookbinding Coptic Stitch & Leather Binding Standards",
      ruSectionName: "Стандарты и регламенты: Bookbinding Coptic Stitch & Leather Binding",
      instructions: [
        "Apply core domain tenets for Bookbinding Coptic Stitch & Leather Binding.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Bookbinding Coptic Stitch & Leather Binding.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","bookbinding","coptic"],
    }),
  },

  "misc-soap-making-cold-process-saponification-math": {
    id: "misc-soap-making-cold-process-saponification-math",
    name: "SoapMakingColdProcessSaponificationMathSkill",
    displayName: "Soap Making Cold Process Saponification Math",
    categoryId: "miscellaneous",
    description: "Calculates lye-to-oil ratios and superfat percentages for cold process soap.",
    tags: ["miscellaneous","misc","soap","making"],
    transform: createStandardSkillTransform({
      sectionName: "Soap Making Cold Process Saponification Math Standards",
      ruSectionName: "Стандарты и регламенты: Soap Making Cold Process Saponification Math",
      instructions: [
        "Apply core domain tenets for Soap Making Cold Process Saponification Math.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Soap Making Cold Process Saponification Math.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","soap","making"],
    }),
  },

  "misc-solar-power-off-grid-battery-bank-sizing": {
    id: "misc-solar-power-off-grid-battery-bank-sizing",
    name: "SolarPowerOffGridBatteryBankSizingSkill",
    displayName: "Solar Power Off-Grid Battery Bank Sizing",
    categoryId: "miscellaneous",
    description: "Sizes off-grid solar panels, MPPT charge controllers, and LiFePO4 battery banks.",
    tags: ["miscellaneous","misc","solar","power"],
    transform: createStandardSkillTransform({
      sectionName: "Solar Power Off-Grid Battery Bank Sizing Standards",
      ruSectionName: "Стандарты и регламенты: Solar Power Off-Grid Battery Bank Sizing",
      instructions: [
        "Apply core domain tenets for Solar Power Off-Grid Battery Bank Sizing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Solar Power Off-Grid Battery Bank Sizing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","solar","power"],
    }),
  },

  "misc-fermented-kombucha-scoby-tea-management": {
    id: "misc-fermented-kombucha-scoby-tea-management",
    name: "FermentedKombuchaSCOBYTeaManagementSkill",
    displayName: "Fermented Kombucha SCOBY Tea Management",
    categoryId: "miscellaneous",
    description: "Brew secondary fermented kombucha with fruit purees and carbonation.",
    tags: ["miscellaneous","misc","fermented","kombucha"],
    transform: createStandardSkillTransform({
      sectionName: "Fermented Kombucha SCOBY Tea Management Standards",
      ruSectionName: "Стандарты и регламенты: Fermented Kombucha SCOBY Tea Management",
      instructions: [
        "Apply core domain tenets for Fermented Kombucha SCOBY Tea Management.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Fermented Kombucha SCOBY Tea Management.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","fermented","kombucha"],
    }),
  },

  "misc-manual-espresso-machine-extraction-pressure": {
    id: "misc-manual-espresso-machine-extraction-pressure",
    name: "ManualEspressoMachineExtractionPressureSkill",
    displayName: "Manual Espresso Machine Extraction Pressure",
    categoryId: "miscellaneous",
    description: "Pulls manual espresso shots at 9 bars pressure, dialing in puck resistance.",
    tags: ["miscellaneous","misc","manual","espresso"],
    transform: createStandardSkillTransform({
      sectionName: "Manual Espresso Machine Extraction Pressure Standards",
      ruSectionName: "Стандарты и регламенты: Manual Espresso Machine Extraction Pressure",
      instructions: [
        "Apply core domain tenets for Manual Espresso Machine Extraction Pressure.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Manual Espresso Machine Extraction Pressure.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","manual","espresso"],
    }),
  },

  "misc-traditional-weaving-loom-warping-threading": {
    id: "misc-traditional-weaving-loom-warping-threading",
    name: "TraditionalWeavingLoomWarpingThreadingSkill",
    displayName: "Traditional Weaving Loom Warping & Threading",
    categoryId: "miscellaneous",
    description: "Drafts floor loom weaving patterns, warping threads through heddles.",
    tags: ["miscellaneous","misc","traditional","weaving"],
    transform: createStandardSkillTransform({
      sectionName: "Traditional Weaving Loom Warping & Threading Standards",
      ruSectionName: "Стандарты и регламенты: Traditional Weaving Loom Warping & Threading",
      instructions: [
        "Apply core domain tenets for Traditional Weaving Loom Warping & Threading.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traditional Weaving Loom Warping & Threading.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","traditional","weaving"],
    }),
  },

  "misc-custom-pc-building-component-compatibility": {
    id: "misc-custom-pc-building-component-compatibility",
    name: "CustomPCBuildingComponentCompatibilitySkill",
    displayName: "Custom PC Building Component Compatibility",
    categoryId: "miscellaneous",
    description: "Selects compatible CPU sockets, motherboard VRMs, RAM speeds, and PSU wattage.",
    tags: ["miscellaneous","misc","custom","pc"],
    transform: createStandardSkillTransform({
      sectionName: "Custom PC Building Component Compatibility Standards",
      ruSectionName: "Стандарты и регламенты: Custom PC Building Component Compatibility",
      instructions: [
        "Apply core domain tenets for Custom PC Building Component Compatibility.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Custom PC Building Component Compatibility.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","custom","pc"],
    }),
  },

  "misc-automotive-engine-oil-change-maintenance": {
    id: "misc-automotive-engine-oil-change-maintenance",
    name: "AutomotiveEngineOilChangeMaintenanceSkill",
    displayName: "Automotive Engine Oil Change & Maintenance",
    categoryId: "miscellaneous",
    description: "Performs DIY car oil changes, spark plug replacement, and brake pad service.",
    tags: ["miscellaneous","misc","automotive","engine"],
    transform: createStandardSkillTransform({
      sectionName: "Automotive Engine Oil Change & Maintenance Standards",
      ruSectionName: "Стандарты и регламенты: Automotive Engine Oil Change & Maintenance",
      instructions: [
        "Apply core domain tenets for Automotive Engine Oil Change & Maintenance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Automotive Engine Oil Change & Maintenance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","automotive","engine"],
    }),
  },

  "misc-home-hydroponic-microgreens-vertical-farming": {
    id: "misc-home-hydroponic-microgreens-vertical-farming",
    name: "HomeHydroponicMicrogreensVerticalFarmingSkill",
    displayName: "Home Hydroponic Microgreens Vertical Farming",
    categoryId: "miscellaneous",
    description: "Grows dense trays of nutrient-rich microgreens under LED grow lights.",
    tags: ["miscellaneous","misc","home","hydroponic"],
    transform: createStandardSkillTransform({
      sectionName: "Home Hydroponic Microgreens Vertical Farming Standards",
      ruSectionName: "Стандарты и регламенты: Home Hydroponic Microgreens Vertical Farming",
      instructions: [
        "Apply core domain tenets for Home Hydroponic Microgreens Vertical Farming.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Home Hydroponic Microgreens Vertical Farming.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","home","hydroponic"],
    }),
  },

  "misc-shoe-care-leather-conditioning-mirror-shine": {
    id: "misc-shoe-care-leather-conditioning-mirror-shine",
    name: "ShoeCareLeatherConditioningMirrorShineSkill",
    displayName: "Shoe Care Leather Conditioning & Mirror Shine",
    categoryId: "miscellaneous",
    description: "Cleans, conditions, and polishes dress shoes to a high-gloss mirror shine.",
    tags: ["miscellaneous","misc","shoe","care"],
    transform: createStandardSkillTransform({
      sectionName: "Shoe Care Leather Conditioning & Mirror Shine Standards",
      ruSectionName: "Стандарты и регламенты: Shoe Care Leather Conditioning & Mirror Shine",
      instructions: [
        "Apply core domain tenets for Shoe Care Leather Conditioning & Mirror Shine.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Shoe Care Leather Conditioning & Mirror Shine.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","shoe","care"],
    }),
  },

  "misc-loudspeaker-crossover-filter-circuit-design": {
    id: "misc-loudspeaker-crossover-filter-circuit-design",
    name: "LoudspeakerCrossoverFilterCircuitDesignSkill",
    displayName: "Loudspeaker Crossover Filter Circuit Design",
    categoryId: "miscellaneous",
    description: "Designs passive 2-way audio crossover circuits using inductors and capacitors.",
    tags: ["miscellaneous","misc","loudspeaker","crossover"],
    transform: createStandardSkillTransform({
      sectionName: "Loudspeaker Crossover Filter Circuit Design Standards",
      ruSectionName: "Стандарты и регламенты: Loudspeaker Crossover Filter Circuit Design",
      instructions: [
        "Apply core domain tenets for Loudspeaker Crossover Filter Circuit Design.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Loudspeaker Crossover Filter Circuit Design.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","loudspeaker","crossover"],
    }),
  },

  "misc-traditional-japanese-tea-ceremony-chado-etiquette": {
    id: "misc-traditional-japanese-tea-ceremony-chado-etiquette",
    name: "TraditionalJapaneseTeaCeremonyChadoEtiquetteSkill",
    displayName: "Traditional Japanese Tea Ceremony (Chado) Etiquette",
    categoryId: "miscellaneous",
    description: "Prepares matcha green tea using traditional bamboo whisks and tea bowls.",
    tags: ["miscellaneous","misc","traditional","japanese"],
    transform: createStandardSkillTransform({
      sectionName: "Traditional Japanese Tea Ceremony (Chado) Etiquette Standards",
      ruSectionName: "Стандарты и регламенты: Traditional Japanese Tea Ceremony (Chado) Etiquette",
      instructions: [
        "Apply core domain tenets for Traditional Japanese Tea Ceremony (Chado) Etiquette.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traditional Japanese Tea Ceremony (Chado) Etiquette.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","traditional","japanese"],
    }),
  },

  "misc-mushroom-cultivation-grain-spawn-sterilization": {
    id: "misc-mushroom-cultivation-grain-spawn-sterilization",
    name: "MushroomCultivationGrainSpawnSterilizationSkill",
    displayName: "Mushroom Cultivation Grain Spawn Sterilization",
    categoryId: "miscellaneous",
    description: "Sterilizes grain substrates in pressure cookers for gourmet mushroom spawn.",
    tags: ["miscellaneous","misc","mushroom","cultivation"],
    transform: createStandardSkillTransform({
      sectionName: "Mushroom Cultivation Grain Spawn Sterilization Standards",
      ruSectionName: "Стандарты и регламенты: Mushroom Cultivation Grain Spawn Sterilization",
      instructions: [
        "Apply core domain tenets for Mushroom Cultivation Grain Spawn Sterilization.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Mushroom Cultivation Grain Spawn Sterilization.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","mushroom","cultivation"],
    }),
  },

  "misc-ham-radio-antenna-dipole-wire-construction": {
    id: "misc-ham-radio-antenna-dipole-wire-construction",
    name: "HamRadioAntennaDipoleWireConstructionSkill",
    displayName: "Ham Radio Antenna Dipole Wire Construction",
    categoryId: "miscellaneous",
    description: "Calculates half-wave dipole wire antenna lengths for specific HF bands.",
    tags: ["miscellaneous","misc","ham","radio"],
    transform: createStandardSkillTransform({
      sectionName: "Ham Radio Antenna Dipole Wire Construction Standards",
      ruSectionName: "Стандарты и регламенты: Ham Radio Antenna Dipole Wire Construction",
      instructions: [
        "Apply core domain tenets for Ham Radio Antenna Dipole Wire Construction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Ham Radio Antenna Dipole Wire Construction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","ham","radio"],
    }),
  },

  "misc-automotive-detailing-paint-correction-ceramic": {
    id: "misc-automotive-detailing-paint-correction-ceramic",
    name: "AutomotiveDetailingPaintCorrectionCeramicSkill",
    displayName: "Automotive Detailing Paint Correction & Ceramic",
    categoryId: "miscellaneous",
    description: "Decontaminates car paint, machine polishes swirls, and applies ceramic coatings.",
    tags: ["miscellaneous","misc","automotive","detailing"],
    transform: createStandardSkillTransform({
      sectionName: "Automotive Detailing Paint Correction & Ceramic Standards",
      ruSectionName: "Стандарты и регламенты: Automotive Detailing Paint Correction & Ceramic",
      instructions: [
        "Apply core domain tenets for Automotive Detailing Paint Correction & Ceramic.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Automotive Detailing Paint Correction & Ceramic.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","automotive","detailing"],
    }),
  },

  "misc-fermented-kimchi-napa-cabbage-brining": {
    id: "misc-fermented-kimchi-napa-cabbage-brining",
    name: "FermentedKimchiNapaCabbageBriningSkill",
    displayName: "Fermented Kimchi Napa Cabbage Brining",
    categoryId: "miscellaneous",
    description: "Brines and seasons Korean kimchi with gochugaru, garlic, and ginger paste.",
    tags: ["miscellaneous","misc","fermented","kimchi"],
    transform: createStandardSkillTransform({
      sectionName: "Fermented Kimchi Napa Cabbage Brining Standards",
      ruSectionName: "Стандарты и регламенты: Fermented Kimchi Napa Cabbage Brining",
      instructions: [
        "Apply core domain tenets for Fermented Kimchi Napa Cabbage Brining.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Fermented Kimchi Napa Cabbage Brining.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","fermented","kimchi"],
    }),
  },

  "misc-traditional-calligraphy-chisel-nib-lettering": {
    id: "misc-traditional-calligraphy-chisel-nib-lettering",
    name: "TraditionalCalligraphyChiselNibLetteringSkill",
    displayName: "Traditional Calligraphy Chisel Nib Lettering",
    categoryId: "miscellaneous",
    description: "Drives broad-edge calligraphy pens at 45-degree angles for Italic script.",
    tags: ["miscellaneous","misc","traditional","calligraphy"],
    transform: createStandardSkillTransform({
      sectionName: "Traditional Calligraphy Chisel Nib Lettering Standards",
      ruSectionName: "Стандарты и регламенты: Traditional Calligraphy Chisel Nib Lettering",
      instructions: [
        "Apply core domain tenets for Traditional Calligraphy Chisel Nib Lettering.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traditional Calligraphy Chisel Nib Lettering.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","traditional","calligraphy"],
    }),
  },

  "misc-permaculture-guild-fruit-tree-swale-design": {
    id: "misc-permaculture-guild-fruit-tree-swale-design",
    name: "PermacultureGuildFruitTreeSwaleDesignSkill",
    displayName: "Permaculture Guild Fruit Tree Swale Design",
    categoryId: "miscellaneous",
    description: "Plants companion support species around fruit trees to build self-sustaining guilds.",
    tags: ["miscellaneous","misc","permaculture","guild"],
    transform: createStandardSkillTransform({
      sectionName: "Permaculture Guild Fruit Tree Swale Design Standards",
      ruSectionName: "Стандарты и регламенты: Permaculture Guild Fruit Tree Swale Design",
      instructions: [
        "Apply core domain tenets for Permaculture Guild Fruit Tree Swale Design.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Permaculture Guild Fruit Tree Swale Design.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","permaculture","guild"],
    }),
  },

  "misc-custom-mechanical-keyboard-switch-lubrication": {
    id: "misc-custom-mechanical-keyboard-switch-lubrication",
    name: "CustomMechanicalKeyboardSwitchLubricationSkill",
    displayName: "Custom Mechanical Keyboard Switch Lubrication",
    categoryId: "miscellaneous",
    description: "Disassembles, lubricates, and films mechanical keyboard switches for smooth travel.",
    tags: ["miscellaneous","misc","custom","mechanical"],
    transform: createStandardSkillTransform({
      sectionName: "Custom Mechanical Keyboard Switch Lubrication Standards",
      ruSectionName: "Стандарты и регламенты: Custom Mechanical Keyboard Switch Lubrication",
      instructions: [
        "Apply core domain tenets for Custom Mechanical Keyboard Switch Lubrication.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Custom Mechanical Keyboard Switch Lubrication.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","custom","mechanical"],
    }),
  },

  "misc-home-draft-beer-kegerator-co2-pressure-tuning": {
    id: "misc-home-draft-beer-kegerator-co2-pressure-tuning",
    name: "HomeDraftBeerKegeratorCO2PressureTuningSkill",
    displayName: "Home Draft Beer Kegerator CO2 Pressure Tuning",
    categoryId: "miscellaneous",
    description: "Balances draft beer line length and CO2 pressure to pour perfect foam heads.",
    tags: ["miscellaneous","misc","home","draft"],
    transform: createStandardSkillTransform({
      sectionName: "Home Draft Beer Kegerator CO2 Pressure Tuning Standards",
      ruSectionName: "Стандарты и регламенты: Home Draft Beer Kegerator CO2 Pressure Tuning",
      instructions: [
        "Apply core domain tenets for Home Draft Beer Kegerator CO2 Pressure Tuning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Home Draft Beer Kegerator CO2 Pressure Tuning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","home","draft"],
    }),
  },

  "misc-3d-printing-fdm-slicer-layer-height-tuning": {
    id: "misc-3d-printing-fdm-slicer-layer-height-tuning",
    name: "3DPrintingFDMSlicerLayerHeightTuningSkill",
    displayName: "3D Printing FDM Slicer Layer Height Tuning",
    categoryId: "miscellaneous",
    description: "Tunes 3D printer slicing settings: nozzle temp, retraction, and infill density.",
    tags: ["miscellaneous","misc","3d","printing"],
    transform: createStandardSkillTransform({
      sectionName: "3D Printing FDM Slicer Layer Height Tuning Standards",
      ruSectionName: "Стандарты и регламенты: 3D Printing FDM Slicer Layer Height Tuning",
      instructions: [
        "Apply core domain tenets for 3D Printing FDM Slicer Layer Height Tuning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для 3D Printing FDM Slicer Layer Height Tuning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","3d","printing"],
    }),
  },

  "misc-traditional-bread-scoring-lame-expansion": {
    id: "misc-traditional-bread-scoring-lame-expansion",
    name: "TraditionalBreadScoringLameExpansionSkill",
    displayName: "Traditional Bread Scoring Lame Expansion",
    categoryId: "miscellaneous",
    description: "Scores sourdough loaves with razor blades to control oven spring expansion.",
    tags: ["miscellaneous","misc","traditional","bread"],
    transform: createStandardSkillTransform({
      sectionName: "Traditional Bread Scoring Lame Expansion Standards",
      ruSectionName: "Стандарты и регламенты: Traditional Bread Scoring Lame Expansion",
      instructions: [
        "Apply core domain tenets for Traditional Bread Scoring Lame Expansion.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traditional Bread Scoring Lame Expansion.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","traditional","bread"],
    }),
  },

  "misc-aviation-pilot-pre-flight-walkaround-inspection": {
    id: "misc-aviation-pilot-pre-flight-walkaround-inspection",
    name: "AviationPilotPreFlightWalkaroundInspectionSkill",
    displayName: "Aviation Pilot Pre-Flight Walkaround Inspection",
    categoryId: "miscellaneous",
    description: "Inspects small aircraft control surfaces, fuel strainers, and engine oil levels.",
    tags: ["miscellaneous","misc","aviation","pilot"],
    transform: createStandardSkillTransform({
      sectionName: "Aviation Pilot Pre-Flight Walkaround Inspection Standards",
      ruSectionName: "Стандарты и регламенты: Aviation Pilot Pre-Flight Walkaround Inspection",
      instructions: [
        "Apply core domain tenets for Aviation Pilot Pre-Flight Walkaround Inspection.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Aviation Pilot Pre-Flight Walkaround Inspection.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","aviation","pilot"],
    }),
  },

  "misc-artisan-chocolate-tempering-crystal-beta-v": {
    id: "misc-artisan-chocolate-tempering-crystal-beta-v",
    name: "ArtisanChocolateTemperingCrystalBetaVSkill",
    displayName: "Artisan Chocolate Tempering Crystal Beta V",
    categoryId: "miscellaneous",
    description: "Tempers dark chocolate through precise heating and cooling to achieve Beta V crystals.",
    tags: ["miscellaneous","misc","artisan","chocolate"],
    transform: createStandardSkillTransform({
      sectionName: "Artisan Chocolate Tempering Crystal Beta V Standards",
      ruSectionName: "Стандарты и регламенты: Artisan Chocolate Tempering Crystal Beta V",
      instructions: [
        "Apply core domain tenets for Artisan Chocolate Tempering Crystal Beta V.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Artisan Chocolate Tempering Crystal Beta V.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","artisan","chocolate"],
    }),
  },

  "misc-traditional-wood-carving-whittling-knife-safety": {
    id: "misc-traditional-wood-carving-whittling-knife-safety",
    name: "TraditionalWoodCarvingWhittlingKnifeSafetySkill",
    displayName: "Traditional Wood Carving Whittling Knife Safety",
    categoryId: "miscellaneous",
    description: "Carves wooden figures using push cuts, stop cuts, and thumb-push technique.",
    tags: ["miscellaneous","misc","traditional","wood"],
    transform: createStandardSkillTransform({
      sectionName: "Traditional Wood Carving Whittling Knife Safety Standards",
      ruSectionName: "Стандарты и регламенты: Traditional Wood Carving Whittling Knife Safety",
      instructions: [
        "Apply core domain tenets for Traditional Wood Carving Whittling Knife Safety.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traditional Wood Carving Whittling Knife Safety.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","traditional","wood"],
    }),
  },

  "misc-home-rainwater-harvesting-cistern-calculation": {
    id: "misc-home-rainwater-harvesting-cistern-calculation",
    name: "HomeRainwaterHarvestingCisternCalculationSkill",
    displayName: "Home Rainwater Harvesting Cistern Calculation",
    categoryId: "miscellaneous",
    description: "Sizes rainwater storage tanks based on roof square footage and rainfall.",
    tags: ["miscellaneous","misc","home","rainwater"],
    transform: createStandardSkillTransform({
      sectionName: "Home Rainwater Harvesting Cistern Calculation Standards",
      ruSectionName: "Стандарты и регламенты: Home Rainwater Harvesting Cistern Calculation",
      instructions: [
        "Apply core domain tenets for Home Rainwater Harvesting Cistern Calculation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Home Rainwater Harvesting Cistern Calculation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","home","rainwater"],
    }),
  },

  "misc-bicycle-wheel-truing-spoke-tensioning": {
    id: "misc-bicycle-wheel-truing-spoke-tensioning",
    name: "BicycleWheelTruingSpokeTensioningSkill",
    displayName: "Bicycle Wheel Truing & Spoke Tensioning",
    categoryId: "miscellaneous",
    description: "Trues wobbly bike wheels using spoke wrenches and truing stands.",
    tags: ["miscellaneous","misc","bicycle","wheel"],
    transform: createStandardSkillTransform({
      sectionName: "Bicycle Wheel Truing & Spoke Tensioning Standards",
      ruSectionName: "Стандарты и регламенты: Bicycle Wheel Truing & Spoke Tensioning",
      instructions: [
        "Apply core domain tenets for Bicycle Wheel Truing & Spoke Tensioning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Bicycle Wheel Truing & Spoke Tensioning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","bicycle","wheel"],
    }),
  },

  "misc-traditional-soapstone-carving-polishing": {
    id: "misc-traditional-soapstone-carving-polishing",
    name: "TraditionalSoapstoneCarvingPolishingSkill",
    displayName: "Traditional Soapstone Carving & Polishing",
    categoryId: "miscellaneous",
    description: "Shapes soft soapstone with rasps and polishes with wet/dry sandpaper.",
    tags: ["miscellaneous","misc","traditional","soapstone"],
    transform: createStandardSkillTransform({
      sectionName: "Traditional Soapstone Carving & Polishing Standards",
      ruSectionName: "Стандарты и регламенты: Traditional Soapstone Carving & Polishing",
      instructions: [
        "Apply core domain tenets for Traditional Soapstone Carving & Polishing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traditional Soapstone Carving & Polishing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","traditional","soapstone"],
    }),
  },

  "misc-fermented-hot-sauce-pepper-mash-aging": {
    id: "misc-fermented-hot-sauce-pepper-mash-aging",
    name: "FermentedHotSaucePepperMashAgingSkill",
    displayName: "Fermented Hot Sauce Pepper Mash Aging",
    categoryId: "miscellaneous",
    description: "Ferments chili pepper mashes in 3% salt brine for complex hot sauce.",
    tags: ["miscellaneous","misc","fermented","hot"],
    transform: createStandardSkillTransform({
      sectionName: "Fermented Hot Sauce Pepper Mash Aging Standards",
      ruSectionName: "Стандарты и регламенты: Fermented Hot Sauce Pepper Mash Aging",
      instructions: [
        "Apply core domain tenets for Fermented Hot Sauce Pepper Mash Aging.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Fermented Hot Sauce Pepper Mash Aging.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","fermented","hot"],
    }),
  },

  "misc-acoustic-room-treatment-bass-trap-positioning": {
    id: "misc-acoustic-room-treatment-bass-trap-positioning",
    name: "AcousticRoomTreatmentBassTrapPositioningSkill",
    displayName: "Acoustic Room Treatment Bass Trap Positioning",
    categoryId: "miscellaneous",
    description: "Places broadband absorber panels and bass traps at acoustic reflection points.",
    tags: ["miscellaneous","misc","acoustic","room"],
    transform: createStandardSkillTransform({
      sectionName: "Acoustic Room Treatment Bass Trap Positioning Standards",
      ruSectionName: "Стандарты и регламенты: Acoustic Room Treatment Bass Trap Positioning",
      instructions: [
        "Apply core domain tenets for Acoustic Room Treatment Bass Trap Positioning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Acoustic Room Treatment Bass Trap Positioning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","acoustic","room"],
    }),
  },

  "misc-vintage-camera-rangefinder-focus-calibration": {
    id: "misc-vintage-camera-rangefinder-focus-calibration",
    name: "VintageCameraRangefinderFocusCalibrationSkill",
    displayName: "Vintage Camera Rangefinder Focus Calibration",
    categoryId: "miscellaneous",
    description: "Calibrates optical rangefinders on vintage film cameras for sharp focus.",
    tags: ["miscellaneous","misc","vintage","camera"],
    transform: createStandardSkillTransform({
      sectionName: "Vintage Camera Rangefinder Focus Calibration Standards",
      ruSectionName: "Стандарты и регламенты: Vintage Camera Rangefinder Focus Calibration",
      instructions: [
        "Apply core domain tenets for Vintage Camera Rangefinder Focus Calibration.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Vintage Camera Rangefinder Focus Calibration.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","vintage","camera"],
    }),
  },

  "misc-traditional-hand-drawn-animation-in-betweening": {
    id: "misc-traditional-hand-drawn-animation-in-betweening",
    name: "TraditionalHandDrawnAnimationInBetweeningSkill",
    displayName: "Traditional Hand-Drawn Animation In-Betweening",
    categoryId: "miscellaneous",
    description: "Draws intermediate animation frames between keyframes to create smooth motion.",
    tags: ["miscellaneous","misc","traditional","hand"],
    transform: createStandardSkillTransform({
      sectionName: "Traditional Hand-Drawn Animation In-Betweening Standards",
      ruSectionName: "Стандарты и регламенты: Traditional Hand-Drawn Animation In-Betweening",
      instructions: [
        "Apply core domain tenets for Traditional Hand-Drawn Animation In-Betweening.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traditional Hand-Drawn Animation In-Betweening.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","traditional","hand"],
    }),
  },

  "misc-home-jerky-dehydration-curing-salt-ratios": {
    id: "misc-home-jerky-dehydration-curing-salt-ratios",
    name: "HomeJerkyDehydrationCuringSaltRatiosSkill",
    displayName: "Home Jerky Dehydration & Curing Salt Ratios",
    categoryId: "miscellaneous",
    description: "Marinates and dehydrates lean beef jerky with safe curing salt proportions.",
    tags: ["miscellaneous","misc","home","jerky"],
    transform: createStandardSkillTransform({
      sectionName: "Home Jerky Dehydration & Curing Salt Ratios Standards",
      ruSectionName: "Стандарты и регламенты: Home Jerky Dehydration & Curing Salt Ratios",
      instructions: [
        "Apply core domain tenets for Home Jerky Dehydration & Curing Salt Ratios.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Home Jerky Dehydration & Curing Salt Ratios.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","home","jerky"],
    }),
  },

  "misc-hydroponic-nutrient-film-technique-nft-channels": {
    id: "misc-hydroponic-nutrient-film-technique-nft-channels",
    name: "HydroponicNutrientFilmTechniqueNFTChannelsSkill",
    displayName: "Hydroponic Nutrient Film Technique (NFT) Channels",
    categoryId: "miscellaneous",
    description: "Circulates thin nutrient streams through NFT gullies for leafy greens.",
    tags: ["miscellaneous","misc","hydroponic","nutrient"],
    transform: createStandardSkillTransform({
      sectionName: "Hydroponic Nutrient Film Technique (NFT) Channels Standards",
      ruSectionName: "Стандарты и регламенты: Hydroponic Nutrient Film Technique (NFT) Channels",
      instructions: [
        "Apply core domain tenets for Hydroponic Nutrient Film Technique (NFT) Channels.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hydroponic Nutrient Film Technique (NFT) Channels.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","hydroponic","nutrient"],
    }),
  },

  "misc-custom-leather-belt-edge-beveling-dyeing": {
    id: "misc-custom-leather-belt-edge-beveling-dyeing",
    name: "CustomLeatherBeltEdgeBevelingDyeingSkill",
    displayName: "Custom Leather Belt Edge Beveling & Dyeing",
    categoryId: "miscellaneous",
    description: "Bevels, dyes, and burnishes heavy veg-tan leather belt edges.",
    tags: ["miscellaneous","misc","custom","leather"],
    transform: createStandardSkillTransform({
      sectionName: "Custom Leather Belt Edge Beveling & Dyeing Standards",
      ruSectionName: "Стандарты и регламенты: Custom Leather Belt Edge Beveling & Dyeing",
      instructions: [
        "Apply core domain tenets for Custom Leather Belt Edge Beveling & Dyeing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Custom Leather Belt Edge Beveling & Dyeing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","custom","leather"],
    }),
  },

  "misc-traditional-frame-drum-head-skin-tuning": {
    id: "misc-traditional-frame-drum-head-skin-tuning",
    name: "TraditionalFrameDrumHeadSkinTuningSkill",
    displayName: "Traditional Frame Drum Head Skin Tuning",
    categoryId: "miscellaneous",
    description: "Tones natural goat skin drum heads using heat and moisture balancing.",
    tags: ["miscellaneous","misc","traditional","frame"],
    transform: createStandardSkillTransform({
      sectionName: "Traditional Frame Drum Head Skin Tuning Standards",
      ruSectionName: "Стандарты и регламенты: Traditional Frame Drum Head Skin Tuning",
      instructions: [
        "Apply core domain tenets for Traditional Frame Drum Head Skin Tuning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traditional Frame Drum Head Skin Tuning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","traditional","frame"],
    }),
  },

  "misc-high-altitude-hiking-acclimatization-strategy": {
    id: "misc-high-altitude-hiking-acclimatization-strategy",
    name: "HighAltitudeHikingAcclimatizationStrategySkill",
    displayName: "High-Altitude Hiking Acclimatization Strategy",
    categoryId: "miscellaneous",
    description: "Prevents acute mountain sickness through gradual elevation gain schedules.",
    tags: ["miscellaneous","misc","high","altitude"],
    transform: createStandardSkillTransform({
      sectionName: "High-Altitude Hiking Acclimatization Strategy Standards",
      ruSectionName: "Стандарты и регламенты: High-Altitude Hiking Acclimatization Strategy",
      instructions: [
        "Apply core domain tenets for High-Altitude Hiking Acclimatization Strategy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для High-Altitude Hiking Acclimatization Strategy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","high","altitude"],
    }),
  },

  "misc-home-micro-brewery-all-grain-mash-temperature": {
    id: "misc-home-micro-brewery-all-grain-mash-temperature",
    name: "HomeMicroBreweryAllGrainMashTemperatureSkill",
    displayName: "Home Micro-Brewery All-Grain Mash Temperature",
    categoryId: "miscellaneous",
    description: "Mashes malted barley at 152°F to convert starches into fermentable sugars.",
    tags: ["miscellaneous","misc","home","micro"],
    transform: createStandardSkillTransform({
      sectionName: "Home Micro-Brewery All-Grain Mash Temperature Standards",
      ruSectionName: "Стандарты и регламенты: Home Micro-Brewery All-Grain Mash Temperature",
      instructions: [
        "Apply core domain tenets for Home Micro-Brewery All-Grain Mash Temperature.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Home Micro-Brewery All-Grain Mash Temperature.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","home","micro"],
    }),
  },

  "misc-indoor-succulent-cactus-propagation": {
    id: "misc-indoor-succulent-cactus-propagation",
    name: "IndoorSucculentCactusPropagationSkill",
    displayName: "Indoor Succulent & Cactus Propagation",
    categoryId: "miscellaneous",
    description: "Propagates succulents from leaf cuttings in well-draining coarse soil.",
    tags: ["miscellaneous","misc","indoor","succulent"],
    transform: createStandardSkillTransform({
      sectionName: "Indoor Succulent & Cactus Propagation Standards",
      ruSectionName: "Стандарты и регламенты: Indoor Succulent & Cactus Propagation",
      instructions: [
        "Apply core domain tenets for Indoor Succulent & Cactus Propagation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Indoor Succulent & Cactus Propagation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","indoor","succulent"],
    }),
  },

  "misc-traditional-blacksmithing-anvil-horn-bending": {
    id: "misc-traditional-blacksmithing-anvil-horn-bending",
    name: "TraditionalBlacksmithingAnvilHornBendingSkill",
    displayName: "Traditional Blacksmithing Anvil Horn Bending",
    categoryId: "miscellaneous",
    description: "Bends hot iron bars into precise circles over the anvil horn.",
    tags: ["miscellaneous","misc","traditional","blacksmithing"],
    transform: createStandardSkillTransform({
      sectionName: "Traditional Blacksmithing Anvil Horn Bending Standards",
      ruSectionName: "Стандарты и регламенты: Traditional Blacksmithing Anvil Horn Bending",
      instructions: [
        "Apply core domain tenets for Traditional Blacksmithing Anvil Horn Bending.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traditional Blacksmithing Anvil Horn Bending.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","traditional","blacksmithing"],
    }),
  },

  "misc-automotive-manual-transmission-heel-and-toe-shift": {
    id: "misc-automotive-manual-transmission-heel-and-toe-shift",
    name: "AutomotiveManualTransmissionHeelandToeShiftSkill",
    displayName: "Automotive Manual Transmission Heel-and-Toe Shift",
    categoryId: "miscellaneous",
    description: "Executes smooth downshifts while braking using heel-and-toe throttle blips.",
    tags: ["miscellaneous","misc","automotive","manual"],
    transform: createStandardSkillTransform({
      sectionName: "Automotive Manual Transmission Heel-and-Toe Shift Standards",
      ruSectionName: "Стандарты и регламенты: Automotive Manual Transmission Heel-and-Toe Shift",
      instructions: [
        "Apply core domain tenets for Automotive Manual Transmission Heel-and-Toe Shift.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Automotive Manual Transmission Heel-and-Toe Shift.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","automotive","manual"],
    }),
  },

  "misc-bonsai-deadwood-jin-shari-lime-sulfur-treatment": {
    id: "misc-bonsai-deadwood-jin-shari-lime-sulfur-treatment",
    name: "BonsaiDeadwoodJinShariLimeSulfurTreatmentSkill",
    displayName: "Bonsai Deadwood Jin & Shari Lime Sulfur Treatment",
    categoryId: "miscellaneous",
    description: "Carves and preserves deadwood features on bonsai trees using lime sulfur.",
    tags: ["miscellaneous","misc","bonsai","deadwood"],
    transform: createStandardSkillTransform({
      sectionName: "Bonsai Deadwood Jin & Shari Lime Sulfur Treatment Standards",
      ruSectionName: "Стандарты и регламенты: Bonsai Deadwood Jin & Shari Lime Sulfur Treatment",
      instructions: [
        "Apply core domain tenets for Bonsai Deadwood Jin & Shari Lime Sulfur Treatment.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Bonsai Deadwood Jin & Shari Lime Sulfur Treatment.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","bonsai","deadwood"],
    }),
  },

  "misc-traditional-oil-painting-fat-over-lean-layering": {
    id: "misc-traditional-oil-painting-fat-over-lean-layering",
    name: "TraditionalOilPaintingFatOverLeanLayeringSkill",
    displayName: "Traditional Oil Painting Fat-Over-Lean Layering",
    categoryId: "miscellaneous",
    description: "Applies paint layers with increasing oil content to prevent cracking.",
    tags: ["miscellaneous","misc","traditional","oil"],
    transform: createStandardSkillTransform({
      sectionName: "Traditional Oil Painting Fat-Over-Lean Layering Standards",
      ruSectionName: "Стандарты и регламенты: Traditional Oil Painting Fat-Over-Lean Layering",
      instructions: [
        "Apply core domain tenets for Traditional Oil Painting Fat-Over-Lean Layering.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traditional Oil Painting Fat-Over-Lean Layering.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","traditional","oil"],
    }),
  },

  "misc-home-canning-water-bath-acidic-food-preservation": {
    id: "misc-home-canning-water-bath-acidic-food-preservation",
    name: "HomeCanningWaterBathAcidicFoodPreservationSkill",
    displayName: "Home Canning Water Bath Acidic Food Preservation",
    categoryId: "miscellaneous",
    description: "Preserves jams and pickles safely in boiling water bath canners.",
    tags: ["miscellaneous","misc","home","canning"],
    transform: createStandardSkillTransform({
      sectionName: "Home Canning Water Bath Acidic Food Preservation Standards",
      ruSectionName: "Стандарты и регламенты: Home Canning Water Bath Acidic Food Preservation",
      instructions: [
        "Apply core domain tenets for Home Canning Water Bath Acidic Food Preservation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Home Canning Water Bath Acidic Food Preservation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","home","canning"],
    }),
  },

  "misc-sailboat-anchor-setting-scope-ratio": {
    id: "misc-sailboat-anchor-setting-scope-ratio",
    name: "SailboatAnchorSettingScopeRatioSkill",
    displayName: "Sailboat Anchor Setting & Scope Ratio",
    categoryId: "miscellaneous",
    description: "Sets anchors securely in sand/mud using 5:1 to 7:1 scope line ratios.",
    tags: ["miscellaneous","misc","sailboat","anchor"],
    transform: createStandardSkillTransform({
      sectionName: "Sailboat Anchor Setting & Scope Ratio Standards",
      ruSectionName: "Стандарты и регламенты: Sailboat Anchor Setting & Scope Ratio",
      instructions: [
        "Apply core domain tenets for Sailboat Anchor Setting & Scope Ratio.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sailboat Anchor Setting & Scope Ratio.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","sailboat","anchor"],
    }),
  },

  "misc-traditional-wood-joinery-dovetail-fitting": {
    id: "misc-traditional-wood-joinery-dovetail-fitting",
    name: "TraditionalWoodJoineryDovetailFittingSkill",
    displayName: "Traditional Wood Joinery Dovetail Fitting",
    categoryId: "miscellaneous",
    description: "Cuts interlocking pins and tails for hand-crafted wooden dovetail joints.",
    tags: ["miscellaneous","misc","traditional","wood"],
    transform: createStandardSkillTransform({
      sectionName: "Traditional Wood Joinery Dovetail Fitting Standards",
      ruSectionName: "Стандарты и регламенты: Traditional Wood Joinery Dovetail Fitting",
      instructions: [
        "Apply core domain tenets for Traditional Wood Joinery Dovetail Fitting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traditional Wood Joinery Dovetail Fitting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","traditional","wood"],
    }),
  },

  "misc-fermented-sauerkraut-cabbage-salt-massage": {
    id: "misc-fermented-sauerkraut-cabbage-salt-massage",
    name: "FermentedSauerkrautCabbageSaltMassageSkill",
    displayName: "Fermented Sauerkraut Cabbage Salt Massage",
    categoryId: "miscellaneous",
    description: "Massages shredded cabbage with 2% sea salt to release natural brine.",
    tags: ["miscellaneous","misc","fermented","sauerkraut"],
    transform: createStandardSkillTransform({
      sectionName: "Fermented Sauerkraut Cabbage Salt Massage Standards",
      ruSectionName: "Стандарты и регламенты: Fermented Sauerkraut Cabbage Salt Massage",
      instructions: [
        "Apply core domain tenets for Fermented Sauerkraut Cabbage Salt Massage.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Fermented Sauerkraut Cabbage Salt Massage.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","fermented","sauerkraut"],
    }),
  },

  "misc-comprehensive-life-crafts-everyday-mastery-constitution": {
    id: "misc-comprehensive-life-crafts-everyday-mastery-constitution",
    name: "ComprehensiveLifeCraftsEverydayMasteryConstitutionSkill",
    displayName: "Comprehensive Life Crafts & Everyday Mastery Constitution",
    categoryId: "miscellaneous",
    description: "Enforces world-class craftsmanship, hands-on DIY skills, and practical mastery.",
    tags: ["miscellaneous","misc","comprehensive","life"],
    transform: createStandardSkillTransform({
      sectionName: "Comprehensive Life Crafts & Everyday Mastery Constitution Standards",
      ruSectionName: "Стандарты и регламенты: Comprehensive Life Crafts & Everyday Mastery Constitution",
      instructions: [
        "Apply core domain tenets for Comprehensive Life Crafts & Everyday Mastery Constitution.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Comprehensive Life Crafts & Everyday Mastery Constitution.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","comprehensive","life"],
    }),
  },

  "misc-misc-skill-90": {
    id: "misc-misc-skill-90",
    name: "miscSkill90Skill",
    displayName: "misc Skill 90",
    categoryId: "miscellaneous",
    description: "Applies advanced misc Skill 90 standards and execution patterns.",
    tags: ["miscellaneous","misc","misc","skill"],
    transform: createStandardSkillTransform({
      sectionName: "misc Skill 90 Standards",
      ruSectionName: "Стандарты и регламенты: misc Skill 90",
      instructions: [
        "Apply core domain tenets for misc Skill 90.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для misc Skill 90.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc","misc","skill"],
    }),
  },
  "misc-final-traditional-horology-mechanical-watch-regulation": {
    id: "misc-final-traditional-horology-mechanical-watch-regulation",
    name: "TraditionalHorologyMechanicalWatchRegulationSkill",
    displayName: "Traditional Horology Mechanical Watch Regulation",
    categoryId: "miscellaneous",
    description: "Regulates mechanical watch balance spring beat error and rate timing across positions.",
    tags: ["miscellaneous","misc-final","final","traditional"],
    transform: createStandardSkillTransform({
      sectionName: "Traditional Horology Mechanical Watch Regulation Standards",
      ruSectionName: "Стандарты и регламенты: Traditional Horology Mechanical Watch Regulation",
      instructions: [
        "Apply core domain tenets for Traditional Horology Mechanical Watch Regulation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traditional Horology Mechanical Watch Regulation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc-final","final","traditional"],
    }),
  },

  "misc-final-custom-stained-glass-lead-came-window-construction": {
    id: "misc-final-custom-stained-glass-lead-came-window-construction",
    name: "CustomStainedGlassLeadCameWindowConstructionSkill",
    displayName: "Custom Stained Glass Lead Came Window Construction",
    categoryId: "miscellaneous",
    description: "Builds lead came stained glass windows with waterproofing cement glazing.",
    tags: ["miscellaneous","misc-final","final","custom"],
    transform: createStandardSkillTransform({
      sectionName: "Custom Stained Glass Lead Came Window Construction Standards",
      ruSectionName: "Стандарты и регламенты: Custom Stained Glass Lead Came Window Construction",
      instructions: [
        "Apply core domain tenets for Custom Stained Glass Lead Came Window Construction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Custom Stained Glass Lead Came Window Construction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc-final","final","custom"],
    }),
  },

  "misc-final-artisan-leather-shoes-goodyear-welt-stitching": {
    id: "misc-final-artisan-leather-shoes-goodyear-welt-stitching",
    name: "ArtisanLeatherShoesGoodyearWeltStitchingSkill",
    displayName: "Artisan Leather Shoes Goodyear Welt Stitching",
    categoryId: "miscellaneous",
    description: "Constructs welted leather dress shoes with cork footbed fillers and hand stitching.",
    tags: ["miscellaneous","misc-final","final","artisan"],
    transform: createStandardSkillTransform({
      sectionName: "Artisan Leather Shoes Goodyear Welt Stitching Standards",
      ruSectionName: "Стандарты и регламенты: Artisan Leather Shoes Goodyear Welt Stitching",
      instructions: [
        "Apply core domain tenets for Artisan Leather Shoes Goodyear Welt Stitching.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Artisan Leather Shoes Goodyear Welt Stitching.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc-final","final","artisan"],
    }),
  },

  "misc-final-micro-distillery-whiskey-mash-fermentation-spirit-cut": {
    id: "misc-final-micro-distillery-whiskey-mash-fermentation-spirit-cut",
    name: "MicroDistilleryWhiskeyMashFermentationSpiritCutSkill",
    displayName: "Micro-Distillery Whiskey Mash Fermentation Spirit Cut",
    categoryId: "miscellaneous",
    description: "Monitors grain mashing, sour mash fermentation, and sensory spirit cuts on pot stills.",
    tags: ["miscellaneous","misc-final","final","micro"],
    transform: createStandardSkillTransform({
      sectionName: "Micro-Distillery Whiskey Mash Fermentation Spirit Cut Standards",
      ruSectionName: "Стандарты и регламенты: Micro-Distillery Whiskey Mash Fermentation Spirit Cut",
      instructions: [
        "Apply core domain tenets for Micro-Distillery Whiskey Mash Fermentation Spirit Cut.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Micro-Distillery Whiskey Mash Fermentation Spirit Cut.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc-final","final","micro"],
    }),
  },

  "misc-final-traditional-stucco-lime-plaster-wall-application": {
    id: "misc-final-traditional-stucco-lime-plaster-wall-application",
    name: "TraditionalStuccoLimePlasterWallApplicationSkill",
    displayName: "Traditional Stucco Lime Plaster Wall Application",
    categoryId: "miscellaneous",
    description: "Applies three-coat breathable lime plaster over wood lath on heritage buildings.",
    tags: ["miscellaneous","misc-final","final","traditional"],
    transform: createStandardSkillTransform({
      sectionName: "Traditional Stucco Lime Plaster Wall Application Standards",
      ruSectionName: "Стандарты и регламенты: Traditional Stucco Lime Plaster Wall Application",
      instructions: [
        "Apply core domain tenets for Traditional Stucco Lime Plaster Wall Application.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traditional Stucco Lime Plaster Wall Application.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc-final","final","traditional"],
    }),
  },

  "misc-final-antique-furniture-french-polish-shellac-refinishing": {
    id: "misc-final-antique-furniture-french-polish-shellac-refinishing",
    name: "AntiqueFurnitureFrenchPolishShellacRefinishingSkill",
    displayName: "Antique Furniture French Polish Shellac Refinishing",
    categoryId: "miscellaneous",
    description: "Builds high-gloss mirror finishes on antique timber using shellac and rubber pads.",
    tags: ["miscellaneous","misc-final","final","antique"],
    transform: createStandardSkillTransform({
      sectionName: "Antique Furniture French Polish Shellac Refinishing Standards",
      ruSectionName: "Стандарты и регламенты: Antique Furniture French Polish Shellac Refinishing",
      instructions: [
        "Apply core domain tenets for Antique Furniture French Polish Shellac Refinishing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Antique Furniture French Polish Shellac Refinishing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc-final","final","antique"],
    }),
  },

  "misc-final-urban-aquaponics-tilapia-leafy-green-nutrient-balance": {
    id: "misc-final-urban-aquaponics-tilapia-leafy-green-nutrient-balance",
    name: "UrbanAquaponicsTilapiaLeafyGreenNutrientBalanceSkill",
    displayName: "Urban Aquaponics Tilapia Leafy Green Nutrient Balance",
    categoryId: "miscellaneous",
    description: "Balances nitrifying bacteria, fish stocking density, and plant iron uptake in aquaponics.",
    tags: ["miscellaneous","misc-final","final","urban"],
    transform: createStandardSkillTransform({
      sectionName: "Urban Aquaponics Tilapia Leafy Green Nutrient Balance Standards",
      ruSectionName: "Стандарты и регламенты: Urban Aquaponics Tilapia Leafy Green Nutrient Balance",
      instructions: [
        "Apply core domain tenets for Urban Aquaponics Tilapia Leafy Green Nutrient Balance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Urban Aquaponics Tilapia Leafy Green Nutrient Balance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc-final","final","urban"],
    }),
  },

  "misc-final-traditional-bowyer-wooden-longbow-tillering": {
    id: "misc-final-traditional-bowyer-wooden-longbow-tillering",
    name: "TraditionalBowyerWoodenLongbowTilleringSkill",
    displayName: "Traditional Bowyer Wooden Longbow Tillering",
    categoryId: "miscellaneous",
    description: "Tiles wooden self-bow staves to even limb curvature and precise draw weight.",
    tags: ["miscellaneous","misc-final","final","traditional"],
    transform: createStandardSkillTransform({
      sectionName: "Traditional Bowyer Wooden Longbow Tillering Standards",
      ruSectionName: "Стандарты и регламенты: Traditional Bowyer Wooden Longbow Tillering",
      instructions: [
        "Apply core domain tenets for Traditional Bowyer Wooden Longbow Tillering.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traditional Bowyer Wooden Longbow Tillering.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc-final","final","traditional"],
    }),
  },

  "misc-final-artisan-glassblowing-furnace-gathering-pipe-shaping": {
    id: "misc-final-artisan-glassblowing-furnace-gathering-pipe-shaping",
    name: "ArtisanGlassblowingFurnaceGatheringPipeShapingSkill",
    displayName: "Artisan Glassblowing Furnace Gathering Pipe Shaping",
    categoryId: "miscellaneous",
    description: "Gathers molten glass at 2100°F, marvering and blowing vessel forms.",
    tags: ["miscellaneous","misc-final","final","artisan"],
    transform: createStandardSkillTransform({
      sectionName: "Artisan Glassblowing Furnace Gathering Pipe Shaping Standards",
      ruSectionName: "Стандарты и регламенты: Artisan Glassblowing Furnace Gathering Pipe Shaping",
      instructions: [
        "Apply core domain tenets for Artisan Glassblowing Furnace Gathering Pipe Shaping.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Artisan Glassblowing Furnace Gathering Pipe Shaping.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc-final","final","artisan"],
    }),
  },

  "misc-final-master-everyday-crafts-applied-life-skills": {
    id: "misc-final-master-everyday-crafts-applied-life-skills",
    name: "MasterEverydayCraftsAppliedLifeSkillsSkill",
    displayName: "Master Everyday Crafts Applied Life Skills",
    categoryId: "miscellaneous",
    description: "Enforces world-class practical craftsmanship, DIY engineering, and artisan mastery.",
    tags: ["miscellaneous","misc-final","final","master"],
    transform: createStandardSkillTransform({
      sectionName: "Master Everyday Crafts Applied Life Skills Standards",
      ruSectionName: "Стандарты и регламенты: Master Everyday Crafts Applied Life Skills",
      instructions: [
        "Apply core domain tenets for Master Everyday Crafts Applied Life Skills.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Master Everyday Crafts Applied Life Skills.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","misc-final","final","master"],
    }),
  },
  "misc-multi-multi-layer-precision-horology-mechanical-watch-restoration": {
    id: "misc-multi-multi-layer-precision-horology-mechanical-watch-restoration",
    name: "MultiLayerPrecisionHorologyMechanicalWatchRestorationSkill",
    displayName: "Multi Layer Precision Horology Mechanical Watch Restoration",
    categoryId: "miscellaneous",
    description: "Restores mechanical watch movements, cleaning balance springs, oiling jewels, and regulating timing.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Precision Horology Mechanical Watch Restoration",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Precision Horology Mechanical Watch Restoration",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Precision Horology Mechanical Watch Restoration.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Precision Horology Mechanical Watch Restoration.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-custom-stained-glass-crafting-lead-came": {
    id: "misc-multi-multi-stage-custom-stained-glass-crafting-lead-came",
    name: "MultiStageCustomStainedGlassCraftingLeadCameSkill",
    displayName: "Multi Stage Custom Stained Glass Crafting Lead Came",
    categoryId: "miscellaneous",
    description: "Builds lead came stained glass windows with pattern cutting, soldering, and cementing.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Custom Stained Glass Crafting Lead Came",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Custom Stained Glass Crafting Lead Came",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Custom Stained Glass Crafting Lead Came.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Custom Stained Glass Crafting Lead Came.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-bespoke-footwear-goodyear-welt-leather-shoemaking": {
    id: "misc-multi-multi-layer-bespoke-footwear-goodyear-welt-leather-shoemaking",
    name: "MultiLayerBespokeFootwearGoodyearWeltLeatherShoemakingSkill",
    displayName: "Multi Layer Bespoke Footwear Goodyear Welt Leather Shoemaking",
    categoryId: "miscellaneous",
    description: "Constructs welted leather shoes with cork footbed fillers, hand lasting, and outsole stitching.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Bespoke Footwear Goodyear Welt Leather Shoemaking",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Bespoke Footwear Goodyear Welt Leather Shoemaking",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Bespoke Footwear Goodyear Welt Leather Shoemaking.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Bespoke Footwear Goodyear Welt Leather Shoemaking.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-artisan-craft-micro-distilling-mash-fermentation": {
    id: "misc-multi-multi-stage-artisan-craft-micro-distilling-mash-fermentation",
    name: "MultiStageArtisanCraftMicroDistillingMashFermentationSkill",
    displayName: "Multi Stage Artisan Craft Micro Distilling Mash Fermentation",
    categoryId: "miscellaneous",
    description: "Monitors grain mashing, sour mash fermentation, hydrometer proofing, and sensory spirit cuts.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Artisan Craft Micro Distilling Mash Fermentation",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Artisan Craft Micro Distilling Mash Fermentation",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Artisan Craft Micro Distilling Mash Fermentation.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Artisan Craft Micro Distilling Mash Fermentation.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-traditional-lime-plaster-heritage-restoration": {
    id: "misc-multi-multi-layer-traditional-lime-plaster-heritage-restoration",
    name: "MultiLayerTraditionalLimePlasterHeritageRestorationSkill",
    displayName: "Multi Layer Traditional Lime Plaster Heritage Restoration",
    categoryId: "miscellaneous",
    description: "Applies three-coat breathable lime plaster over wood lath on heritage building restorations.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Traditional Lime Plaster Heritage Restoration",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Traditional Lime Plaster Heritage Restoration",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Traditional Lime Plaster Heritage Restoration.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Traditional Lime Plaster Heritage Restoration.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-fine-antique-furniture-french-polish-shellac": {
    id: "misc-multi-multi-stage-fine-antique-furniture-french-polish-shellac",
    name: "MultiStageFineAntiqueFurnitureFrenchPolishShellacSkill",
    displayName: "Multi Stage Fine Antique Furniture French Polish Shellac",
    categoryId: "miscellaneous",
    description: "Builds high-gloss mirror finishes on antique timber using shellac and friction rubber pads.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Fine Antique Furniture French Polish Shellac",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Fine Antique Furniture French Polish Shellac",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Fine Antique Furniture French Polish Shellac.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Fine Antique Furniture French Polish Shellac.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-urban-aquaponics-nitrogen-cycle-balancing": {
    id: "misc-multi-multi-layer-urban-aquaponics-nitrogen-cycle-balancing",
    name: "MultiLayerUrbanAquaponicsNitrogenCycleBalancingSkill",
    displayName: "Multi Layer Urban Aquaponics Nitrogen Cycle Balancing",
    categoryId: "miscellaneous",
    description: "Balances nitrifying bacteria, fish stocking density, and plant nutrient uptake in closed loops.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Urban Aquaponics Nitrogen Cycle Balancing",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Urban Aquaponics Nitrogen Cycle Balancing",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Urban Aquaponics Nitrogen Cycle Balancing.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Urban Aquaponics Nitrogen Cycle Balancing.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-traditional-bowyer-wooden-longbow-tillering": {
    id: "misc-multi-multi-stage-traditional-bowyer-wooden-longbow-tillering",
    name: "MultiStageTraditionalBowyerWoodenLongbowTilleringSkill",
    displayName: "Multi Stage Traditional Bowyer Wooden Longbow Tillering",
    categoryId: "miscellaneous",
    description: "Tillers wooden self-bow staves to even limb curvature and precise draw weight.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Traditional Bowyer Wooden Longbow Tillering",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Traditional Bowyer Wooden Longbow Tillering",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Traditional Bowyer Wooden Longbow Tillering.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Traditional Bowyer Wooden Longbow Tillering.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-hot-glassblowing-furnace-gathering-pipe-shaping": {
    id: "misc-multi-multi-layer-hot-glassblowing-furnace-gathering-pipe-shaping",
    name: "MultiLayerHotGlassblowingFurnaceGatheringPipeShapingSkill",
    displayName: "Multi Layer Hot Glassblowing Furnace Gathering Pipe Shaping",
    categoryId: "miscellaneous",
    description: "Gathers molten glass at 2100°F, marvering, blowing, and shaping vessel forms.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Hot Glassblowing Furnace Gathering Pipe Shaping",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Hot Glassblowing Furnace Gathering Pipe Shaping",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Hot Glassblowing Furnace Gathering Pipe Shaping.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Hot Glassblowing Furnace Gathering Pipe Shaping.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-leathercraft-saddle-stitching-edge-burnishing": {
    id: "misc-multi-multi-stage-leathercraft-saddle-stitching-edge-burnishing",
    name: "MultiStageLeathercraftSaddleStitchingEdgeBurnishingSkill",
    displayName: "Multi Stage Leathercraft Saddle Stitching Edge Burnishing",
    categoryId: "miscellaneous",
    description: "Hand stitches heavy leather goods using two needles, beeswaxed thread, and edge gum burnishing.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Leathercraft Saddle Stitching Edge Burnishing",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Leathercraft Saddle Stitching Edge Burnishing",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Leathercraft Saddle Stitching Edge Burnishing.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Leathercraft Saddle Stitching Edge Burnishing.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-bonsai-tree-branch-wiring-pruning-maintenance": {
    id: "misc-multi-multi-layer-bonsai-tree-branch-wiring-pruning-maintenance",
    name: "MultiLayerBonsaiTreeBranchWiringPruningMaintenanceSkill",
    displayName: "Multi Layer Bonsai Tree Branch Wiring Pruning Maintenance",
    categoryId: "miscellaneous",
    description: "Wires branch structures, prunes root balls, and manages soil drainage for specimen bonsai trees.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Bonsai Tree Branch Wiring Pruning Maintenance",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Bonsai Tree Branch Wiring Pruning Maintenance",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Bonsai Tree Branch Wiring Pruning Maintenance.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Bonsai Tree Branch Wiring Pruning Maintenance.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-kintsugi-japanese-gold-lacquer-ceramic-repair": {
    id: "misc-multi-multi-stage-kintsugi-japanese-gold-lacquer-ceramic-repair",
    name: "MultiStageKintsugiJapaneseGoldLacquerCeramicRepairSkill",
    displayName: "Multi Stage Kintsugi Japanese Gold Lacquer Ceramic Repair",
    categoryId: "miscellaneous",
    description: "Repairs broken ceramics using natural urushi lacquer and powdered 24k gold seams.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Kintsugi Japanese Gold Lacquer Ceramic Repair",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Kintsugi Japanese Gold Lacquer Ceramic Repair",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Kintsugi Japanese Gold Lacquer Ceramic Repair.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Kintsugi Japanese Gold Lacquer Ceramic Repair.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-wilderness-bushcraft-fire-making-tinder-selection": {
    id: "misc-multi-multi-layer-wilderness-bushcraft-fire-making-tinder-selection",
    name: "MultiLayerWildernessBushcraftFireMakingTinderSelectionSkill",
    displayName: "Multi Layer Wilderness Bushcraft Fire Making Tinder Selection",
    categoryId: "miscellaneous",
    description: "Prepares bow drill friction fire kits, char cloth tinder, and Dakota fire pit shelters.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Wilderness Bushcraft Fire Making Tinder Selection",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Wilderness Bushcraft Fire Making Tinder Selection",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Wilderness Bushcraft Fire Making Tinder Selection.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Wilderness Bushcraft Fire Making Tinder Selection.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-traditional-archery-form-instinctive-shooting": {
    id: "misc-multi-multi-stage-traditional-archery-form-instinctive-shooting",
    name: "MultiStageTraditionalArcheryFormInstinctiveShootingSkill",
    displayName: "Multi Stage Traditional Archery Form Instinctive Shooting",
    categoryId: "miscellaneous",
    description: "Teaches stance, anchor point consistency, back tension release, and instinctive aiming.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Traditional Archery Form Instinctive Shooting",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Traditional Archery Form Instinctive Shooting",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Traditional Archery Form Instinctive Shooting.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Traditional Archery Form Instinctive Shooting.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-amateur-ham-radio-antenna-swr-tuning": {
    id: "misc-multi-multi-layer-amateur-ham-radio-antenna-swr-tuning",
    name: "MultiLayerAmateurHamRadioAntennaSWRTuningSkill",
    displayName: "Multi Layer Amateur Ham Radio Antenna SWR Tuning",
    categoryId: "miscellaneous",
    description: "Tunes dipole/Yagi ham radio antennas, measures standing wave ratio (SWR), and operates HF bands.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Amateur Ham Radio Antenna SWR Tuning",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Amateur Ham Radio Antenna SWR Tuning",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Amateur Ham Radio Antenna SWR Tuning.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Amateur Ham Radio Antenna SWR Tuning.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-artisan-coffee-roasting-profile-cupping": {
    id: "misc-multi-multi-stage-artisan-coffee-roasting-profile-cupping",
    name: "MultiStageArtisanCoffeeRoastingProfileCuppingSkill",
    displayName: "Multi Stage Artisan Coffee Roasting Profile Cupping",
    categoryId: "miscellaneous",
    description: "Monitors charge temp, crack timings, airflow, and conducts sensory cupping evaluations.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Artisan Coffee Roasting Profile Cupping",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Artisan Coffee Roasting Profile Cupping",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Artisan Coffee Roasting Profile Cupping.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Artisan Coffee Roasting Profile Cupping.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-beekeeping-hive-inspection-honey-extraction": {
    id: "misc-multi-multi-layer-beekeeping-hive-inspection-honey-extraction",
    name: "MultiLayerBeekeepingHiveInspectionHoneyExtractionSkill",
    displayName: "Multi Layer Beekeeping Hive Inspection Honey Extraction",
    categoryId: "miscellaneous",
    description: "Inspects brood patterns, manages Varroa mites, supering hives, and uncapping honey frames.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Beekeeping Hive Inspection Honey Extraction",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Beekeeping Hive Inspection Honey Extraction",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Beekeeping Hive Inspection Honey Extraction.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Beekeeping Hive Inspection Honey Extraction.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-blacksmithing-hand-forging-anvil-technique": {
    id: "misc-multi-multi-stage-blacksmithing-hand-forging-anvil-technique",
    name: "MultiStageBlacksmithingHandForgingAnvilTechniqueSkill",
    displayName: "Multi Stage Blacksmithing Hand Forging Anvil Technique",
    categoryId: "miscellaneous",
    description: "Forges steel tool bits, heat treats carbon steel, and performs hammer draws on the anvil.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Blacksmithing Hand Forging Anvil Technique",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Blacksmithing Hand Forging Anvil Technique",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Blacksmithing Hand Forging Anvil Technique.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Blacksmithing Hand Forging Anvil Technique.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-organic-permaculture-swale-garden-design": {
    id: "misc-multi-multi-layer-organic-permaculture-swale-garden-design",
    name: "MultiLayerOrganicPermacultureSwaleGardenDesignSkill",
    displayName: "Multi Layer Organic Permaculture Swale Garden Design",
    categoryId: "miscellaneous",
    description: "Designs contour swales, nitrogen-fixing guilds, and food forest layers for water harvesting.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Organic Permaculture Swale Garden Design",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Organic Permaculture Swale Garden Design",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Organic Permaculture Swale Garden Design.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Organic Permaculture Swale Garden Design.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-fine-bookbinding-leather-spine-coptic-stitching": {
    id: "misc-multi-multi-stage-fine-bookbinding-leather-spine-coptic-stitching",
    name: "MultiStageFineBookbindingLeatherSpineCopticStitchingSkill",
    displayName: "Multi Stage Fine Bookbinding Leather Spine Coptic Stitching",
    categoryId: "miscellaneous",
    description: "Binds hardbound books using hand-sewn signatures, leather covers, and marbled endpapers.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Fine Bookbinding Leather Spine Coptic Stitching",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Fine Bookbinding Leather Spine Coptic Stitching",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Fine Bookbinding Leather Spine Coptic Stitching.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Fine Bookbinding Leather Spine Coptic Stitching.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-mushroom-cultivation-spore-syringe-inoculation": {
    id: "misc-multi-multi-layer-mushroom-cultivation-spore-syringe-inoculation",
    name: "MultiLayerMushroomCultivationSporeSyringeInoculationSkill",
    displayName: "Multi Layer Mushroom Cultivation Spore Syringe Inoculation",
    categoryId: "miscellaneous",
    description: "Sterilizes grain substrates, inoculates spore syringes, and manages fruiting humidity chambers.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Mushroom Cultivation Spore Syringe Inoculation",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Mushroom Cultivation Spore Syringe Inoculation",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Mushroom Cultivation Spore Syringe Inoculation.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Mushroom Cultivation Spore Syringe Inoculation.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-artisan-cheesemaking-rennet-curd-aging": {
    id: "misc-multi-multi-stage-artisan-cheesemaking-rennet-curd-aging",
    name: "MultiStageArtisanCheesemakingRennetCurdAgingSkill",
    displayName: "Multi Stage Artisan Cheesemaking Rennet Curd Aging",
    categoryId: "miscellaneous",
    description: "Coagulates milk with rennet, cuts curds, presses wheels, and ages artisan cheeses in caves.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Artisan Cheesemaking Rennet Curd Aging",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Artisan Cheesemaking Rennet Curd Aging",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Artisan Cheesemaking Rennet Curd Aging.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Artisan Cheesemaking Rennet Curd Aging.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-stone-masonry-dry-stack-wall-construction": {
    id: "misc-multi-multi-layer-stone-masonry-dry-stack-wall-construction",
    name: "MultiLayerStoneMasonryDryStackWallConstructionSkill",
    displayName: "Multi Layer Stone Masonry Dry Stack Wall Construction",
    categoryId: "miscellaneous",
    description: "Builds load-bearing dry stack stone retaining walls without mortar using batter frames.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Stone Masonry Dry Stack Wall Construction",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Stone Masonry Dry Stack Wall Construction",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Stone Masonry Dry Stack Wall Construction.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Stone Masonry Dry Stack Wall Construction.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-sailboat-navigation-rigging-seamanship": {
    id: "misc-multi-multi-stage-sailboat-navigation-rigging-seamanship",
    name: "MultiStageSailboatNavigationRiggingSeamanshipSkill",
    displayName: "Multi Stage Sailboat Navigation Rigging Seamanship",
    categoryId: "miscellaneous",
    description: "Trims mainsails, calculates dead reckoning GPS coordinates, and ties marlinspike knots.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Sailboat Navigation Rigging Seamanship",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Sailboat Navigation Rigging Seamanship",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Sailboat Navigation Rigging Seamanship.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Sailboat Navigation Rigging Seamanship.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-taxidermy-specimen-preservation-mounting": {
    id: "misc-multi-multi-layer-taxidermy-specimen-preservation-mounting",
    name: "MultiLayerTaxidermySpecimenPreservationMountingSkill",
    displayName: "Multi Layer Taxidermy Specimen Preservation Mounting",
    categoryId: "miscellaneous",
    description: "Preserves animal hides, casts anatomical foam forms, and sets glass eyes for mounts.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Taxidermy Specimen Preservation Mounting",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Taxidermy Specimen Preservation Mounting",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Taxidermy Specimen Preservation Mounting.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Taxidermy Specimen Preservation Mounting.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-traditional-sourdough-bread-fermentation-baking": {
    id: "misc-multi-multi-stage-traditional-sourdough-bread-fermentation-baking",
    name: "MultiStageTraditionalSourdoughBreadFermentationBakingSkill",
    displayName: "Multi Stage Traditional Sourdough Bread Fermentation Baking",
    categoryId: "miscellaneous",
    description: "Maintains wild yeast sourdough starter, manages autolyse, stretch-and-fold, and Dutch oven baking.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Traditional Sourdough Bread Fermentation Baking",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Traditional Sourdough Bread Fermentation Baking",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Traditional Sourdough Bread Fermentation Baking.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Traditional Sourdough Bread Fermentation Baking.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-vintage-automobile-carburetor-rebuild-tuning": {
    id: "misc-multi-multi-layer-vintage-automobile-carburetor-rebuild-tuning",
    name: "MultiLayerVintageAutomobileCarburetorRebuildTuningSkill",
    displayName: "Multi Layer Vintage Automobile Carburetor Rebuild Tuning",
    categoryId: "miscellaneous",
    description: "Disassembles, ultrasonic cleans, jet calibrates, and synchronizes multi-barrel carburetors.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Vintage Automobile Carburetor Rebuild Tuning",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Vintage Automobile Carburetor Rebuild Tuning",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Vintage Automobile Carburetor Rebuild Tuning.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Vintage Automobile Carburetor Rebuild Tuning.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-loom-hand-weaving-pattern-draft-creation": {
    id: "misc-multi-multi-stage-loom-hand-weaving-pattern-draft-creation",
    name: "MultiStageLoomHandWeavingPatternDraftCreationSkill",
    displayName: "Multi Stage Loom Hand Weaving Pattern Draft Creation",
    categoryId: "miscellaneous",
    description: "Sets up floor loom warp threads, drafts weaving patterns, and operates foot treadles.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Loom Hand Weaving Pattern Draft Creation",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Loom Hand Weaving Pattern Draft Creation",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Loom Hand Weaving Pattern Draft Creation.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Loom Hand Weaving Pattern Draft Creation.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-urban-beekeeping-swarm-trapping-management": {
    id: "misc-multi-multi-layer-urban-beekeeping-swarm-trapping-management",
    name: "MultiLayerUrbanBeekeepingSwarmTrappingManagementSkill",
    displayName: "Multi Layer Urban Beekeeping Swarm Trapping Management",
    categoryId: "miscellaneous",
    description: "Traps wild honeybee swarms, relocates hives safely, and prevents urban colony swarming.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Urban Beekeeping Swarm Trapping Management",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Urban Beekeeping Swarm Trapping Management",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Urban Beekeeping Swarm Trapping Management.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Urban Beekeeping Swarm Trapping Management.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-fine-woodworking-hand-dovetail-joint-cutting": {
    id: "misc-multi-multi-stage-fine-woodworking-hand-dovetail-joint-cutting",
    name: "MultiStageFineWoodworkingHandDovetailJointCuttingSkill",
    displayName: "Multi Stage Fine Woodworking Hand Dovetail Joint Cutting",
    categoryId: "miscellaneous",
    description: "Marks, saws, and chisels tight hand-cut dovetail joints for hardwood furniture drawers.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Fine Woodworking Hand Dovetail Joint Cutting",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Fine Woodworking Hand Dovetail Joint Cutting",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Fine Woodworking Hand Dovetail Joint Cutting.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Fine Woodworking Hand Dovetail Joint Cutting.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-bicycle-wheel-building-spoke-tensioning": {
    id: "misc-multi-multi-layer-bicycle-wheel-building-spoke-tensioning",
    name: "MultiLayerBicycleWheelBuildingSpokeTensioningSkill",
    displayName: "Multi Layer Bicycle Wheel Building Spoke Tensioning",
    categoryId: "miscellaneous",
    description: "Laces bicycle wheel rims, tensions spokes using tensiometer, and trues lateral/radial wobble.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Bicycle Wheel Building Spoke Tensioning",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Bicycle Wheel Building Spoke Tensioning",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Bicycle Wheel Building Spoke Tensioning.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Bicycle Wheel Building Spoke Tensioning.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-natural-plant-dyeing-mordant-fabric-extraction": {
    id: "misc-multi-multi-stage-natural-plant-dyeing-mordant-fabric-extraction",
    name: "MultiStageNaturalPlantDyeingMordantFabricExtractionSkill",
    displayName: "Multi Stage Natural Plant Dyeing Mordant Fabric Extraction",
    categoryId: "miscellaneous",
    description: "Extracts natural dyes from madder root/indigo, prepares alum mordants, and dyes natural fibers.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Natural Plant Dyeing Mordant Fabric Extraction",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Natural Plant Dyeing Mordant Fabric Extraction",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Natural Plant Dyeing Mordant Fabric Extraction.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Natural Plant Dyeing Mordant Fabric Extraction.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-falconry-raptor-training-mew-management": {
    id: "misc-multi-multi-layer-falconry-raptor-training-mew-management",
    name: "MultiLayerFalconryRaptorTrainingMewManagementSkill",
    displayName: "Multi Layer Falconry Raptor Training Mew Management",
    categoryId: "miscellaneous",
    description: "Manages raptor weight, jess equipment, lure training, and field hunting protocols.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Falconry Raptor Training Mew Management",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Falconry Raptor Training Mew Management",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Falconry Raptor Training Mew Management.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Falconry Raptor Training Mew Management.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-ceramic-pottery-wheel-throwing-glazing": {
    id: "misc-multi-multi-stage-ceramic-pottery-wheel-throwing-glazing",
    name: "MultiStageCeramicPotteryWheelThrowingGlazingSkill",
    displayName: "Multi Stage Ceramic Pottery Wheel Throwing Glazing",
    categoryId: "miscellaneous",
    description: "Centers clay on pottery wheel, pulls cylinder walls, trims foot rings, and applies cone 6 glazes.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Ceramic Pottery Wheel Throwing Glazing",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Ceramic Pottery Wheel Throwing Glazing",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Ceramic Pottery Wheel Throwing Glazing.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Ceramic Pottery Wheel Throwing Glazing.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-fly-fishing-stream-entomology-fly-tying": {
    id: "misc-multi-multi-layer-fly-fishing-stream-entomology-fly-tying",
    name: "MultiLayerFlyFishingStreamEntomologyFlyTyingSkill",
    displayName: "Multi Layer Fly Fishing Stream Entomology Fly Tying",
    categoryId: "miscellaneous",
    description: "Ties realistic Mayfly/Caddis artificial flies matching seasonal stream insect hatches.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Fly Fishing Stream Entomology Fly Tying",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Fly Fishing Stream Entomology Fly Tying",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Fly Fishing Stream Entomology Fly Tying.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Fly Fishing Stream Entomology Fly Tying.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-home-charcuterie-salumi-curing-chamber": {
    id: "misc-multi-multi-stage-home-charcuterie-salumi-curing-chamber",
    name: "MultiStageHomeCharcuterieSalumiCuringChamberSkill",
    displayName: "Multi Stage Home Charcuterie Salumi Curing Chamber",
    categoryId: "miscellaneous",
    description: "Cures salami, prosciutto, and pancetta with salt, culture, and temperature/humidity control.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Home Charcuterie Salumi Curing Chamber",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Home Charcuterie Salumi Curing Chamber",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Home Charcuterie Salumi Curing Chamber.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Home Charcuterie Salumi Curing Chamber.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-custom-audio-vacuum-tube-amplifier-wiring": {
    id: "misc-multi-multi-layer-custom-audio-vacuum-tube-amplifier-wiring",
    name: "MultiLayerCustomAudioVacuumTubeAmplifierWiringSkill",
    displayName: "Multi Layer Custom Audio Vacuum Tube Amplifier Wiring",
    categoryId: "miscellaneous",
    description: "Point-to-point hand wires audiophile vacuum tube amplifiers with high-voltage transformers.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Custom Audio Vacuum Tube Amplifier Wiring",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Custom Audio Vacuum Tube Amplifier Wiring",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Custom Audio Vacuum Tube Amplifier Wiring.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Custom Audio Vacuum Tube Amplifier Wiring.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-stained-glass-copper-foil-tiffany-method": {
    id: "misc-multi-multi-stage-stained-glass-copper-foil-tiffany-method",
    name: "MultiStageStainedGlassCopperFoilTiffanyMethodSkill",
    displayName: "Multi Stage Stained Glass Copper Foil Tiffany Method",
    categoryId: "miscellaneous",
    description: "Wraps cut glass pieces in copper foil, solders seams, and applies patina finishes.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Stained Glass Copper Foil Tiffany Method",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Stained Glass Copper Foil Tiffany Method",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Stained Glass Copper Foil Tiffany Method.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Stained Glass Copper Foil Tiffany Method.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-herbalism-tincture-extraction-formulation": {
    id: "misc-multi-multi-layer-herbalism-tincture-extraction-formulation",
    name: "MultiLayerHerbalismTinctureExtractionFormulationSkill",
    displayName: "Multi Layer Herbalism Tincture Extraction Formulation",
    categoryId: "miscellaneous",
    description: "Macerates medicinal herbs in alcohol menstruum, strains tinctures, and formulates blends.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Herbalism Tincture Extraction Formulation",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Herbalism Tincture Extraction Formulation",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Herbalism Tincture Extraction Formulation.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Herbalism Tincture Extraction Formulation.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-leather-shoe-resoling-stitching-repair": {
    id: "misc-multi-multi-stage-leather-shoe-resoling-stitching-repair",
    name: "MultiStageLeatherShoeResolingStitchingRepairSkill",
    displayName: "Multi Stage Leather Shoe Resoling Stitching Repair",
    categoryId: "miscellaneous",
    description: "Removes worn outsoles, replaces cork footbeds, and hand stitches new leather soles.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Leather Shoe Resoling Stitching Repair",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Leather Shoe Resoling Stitching Repair",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Leather Shoe Resoling Stitching Repair.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Leather Shoe Resoling Stitching Repair.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-soapmaking-cold-process-lye-oils-saponification": {
    id: "misc-multi-multi-layer-soapmaking-cold-process-lye-oils-saponification",
    name: "MultiLayerSoapmakingColdProcessLyeOilsSaponificationSkill",
    displayName: "Multi Layer Soapmaking Cold Process Lye Oils Saponification",
    categoryId: "miscellaneous",
    description: "Calculates lye calculator ratios, mixes plant oils, cures soap bars, and swirls natural clays.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Soapmaking Cold Process Lye Oils Saponification",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Soapmaking Cold Process Lye Oils Saponification",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Soapmaking Cold Process Lye Oils Saponification.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Soapmaking Cold Process Lye Oils Saponification.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-timber-frame-joinery-mortise-tenon-pegging": {
    id: "misc-multi-multi-stage-timber-frame-joinery-mortise-tenon-pegging",
    name: "MultiStageTimberFrameJoineryMortiseTenonPeggingSkill",
    displayName: "Multi Stage Timber Frame Joinery Mortise Tenon Pegging",
    categoryId: "miscellaneous",
    description: "Lays out heavy timber frame bents, chisels mortise-and-tenon joints, and drives wooden pegs.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Timber Frame Joinery Mortise Tenon Pegging",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Timber Frame Joinery Mortise Tenon Pegging",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Timber Frame Joinery Mortise Tenon Pegging.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Timber Frame Joinery Mortise Tenon Pegging.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-pipe-organ-reed-tuning-voicing-maintenance": {
    id: "misc-multi-multi-layer-pipe-organ-reed-tuning-voicing-maintenance",
    name: "MultiLayerPipeOrganReedTuningVoicingMaintenanceSkill",
    displayName: "Multi Layer Pipe Organ Reed Tuning Voicing Maintenance",
    categoryId: "miscellaneous",
    description: "Tunes pipe organ ranks, adjusts reed tongue curvatures, and regulates wind chest pressures.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Pipe Organ Reed Tuning Voicing Maintenance",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Pipe Organ Reed Tuning Voicing Maintenance",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Pipe Organ Reed Tuning Voicing Maintenance.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Pipe Organ Reed Tuning Voicing Maintenance.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-hydroponic-nutrient-solution-ph-balancing": {
    id: "misc-multi-multi-stage-hydroponic-nutrient-solution-ph-balancing",
    name: "MultiStageHydroponicNutrientSolutionpHBalancingSkill",
    displayName: "Multi Stage Hydroponic Nutrient Solution pH Balancing",
    categoryId: "miscellaneous",
    description: "Formulates NPK hydroponic fertilizer solutions, measures EC/PPM, and adjusts pH.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Hydroponic Nutrient Solution pH Balancing",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Hydroponic Nutrient Solution pH Balancing",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Hydroponic Nutrient Solution pH Balancing.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Hydroponic Nutrient Solution pH Balancing.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-lapidary-gemstone-cabochon-cutting-polishing": {
    id: "misc-multi-multi-layer-lapidary-gemstone-cabochon-cutting-polishing",
    name: "MultiLayerLapidaryGemstoneCabochonCuttingPolishingSkill",
    displayName: "Multi Layer Lapidary Gemstone Cabochon Cutting Polishing",
    categoryId: "miscellaneous",
    description: "Saws raw mineral slabs, grinds gemstone cabochons on diamond wheels, and polishes.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Lapidary Gemstone Cabochon Cutting Polishing",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Lapidary Gemstone Cabochon Cutting Polishing",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Lapidary Gemstone Cabochon Cutting Polishing.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Lapidary Gemstone Cabochon Cutting Polishing.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-acoustic-guitar-luthier-voicing-bracing": {
    id: "misc-multi-multi-stage-acoustic-guitar-luthier-voicing-bracing",
    name: "MultiStageAcousticGuitarLuthierVoicingBracingSkill",
    displayName: "Multi Stage Acoustic Guitar Luthier Voicing Bracing",
    categoryId: "miscellaneous",
    description: "Carves spruce soundboard bracing, voices acoustic guitar tops, and sets neck angles.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Acoustic Guitar Luthier Voicing Bracing",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Acoustic Guitar Luthier Voicing Bracing",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Acoustic Guitar Luthier Voicing Bracing.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Acoustic Guitar Luthier Voicing Bracing.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-metal-metalworking-lathe-turning-milling": {
    id: "misc-multi-multi-layer-metal-metalworking-lathe-turning-milling",
    name: "MultiLayerMetalMetalworkingLatheTurningMillingSkill",
    displayName: "Multi Layer Metal Metalworking Lathe Turning Milling",
    categoryId: "miscellaneous",
    description: "Operates manual metal lathe and milling machine to precision thousandths of an inch.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Metal Metalworking Lathe Turning Milling",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Metal Metalworking Lathe Turning Milling",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Metal Metalworking Lathe Turning Milling.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Metal Metalworking Lathe Turning Milling.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-pyrotechnics-fireworks-aerial-shell-composition": {
    id: "misc-multi-multi-stage-pyrotechnics-fireworks-aerial-shell-composition",
    name: "MultiStagePyrotechnicsFireworksAerialShellCompositionSkill",
    displayName: "Multi Stage Pyrotechnics Fireworks Aerial Shell Composition",
    categoryId: "miscellaneous",
    description: "Formulates pyrotechnic star compositions, rolls aerial firework display shells, and fuses.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Pyrotechnics Fireworks Aerial Shell Composition",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Pyrotechnics Fireworks Aerial Shell Composition",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Pyrotechnics Fireworks Aerial Shell Composition.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Pyrotechnics Fireworks Aerial Shell Composition.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-taxidermy-fish-mounting-airbrush-painting": {
    id: "misc-multi-multi-layer-taxidermy-fish-mounting-airbrush-painting",
    name: "MultiLayerTaxidermyFishMountingAirbrushPaintingSkill",
    displayName: "Multi Layer Taxidermy Fish Mounting Airbrush Painting",
    categoryId: "miscellaneous",
    description: "Casts fiberglass fish molds, sets fins, and airbrushes realistic iridescent scale colors.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Taxidermy Fish Mounting Airbrush Painting",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Taxidermy Fish Mounting Airbrush Painting",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Taxidermy Fish Mounting Airbrush Painting.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Taxidermy Fish Mounting Airbrush Painting.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-paper-making-hand-mold-deckle-recycling": {
    id: "misc-multi-multi-stage-paper-making-hand-mold-deckle-recycling",
    name: "MultiStagePaperMakingHandMoldDeckleRecyclingSkill",
    displayName: "Multi Stage Paper Making Hand Mold Deckle Recycling",
    categoryId: "miscellaneous",
    description: "Pulps cotton rags, pulls handmade paper sheets using molds and deckles, and presses.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Paper Making Hand Mold Deckle Recycling",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Paper Making Hand Mold Deckle Recycling",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Paper Making Hand Mold Deckle Recycling.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Paper Making Hand Mold Deckle Recycling.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-model-steam-engine-miniature-boiler-machining": {
    id: "misc-multi-multi-layer-model-steam-engine-miniature-boiler-machining",
    name: "MultiLayerModelSteamEngineMiniatureBoilerMachiningSkill",
    displayName: "Multi Layer Model Steam Engine Miniature Boiler Machining",
    categoryId: "miscellaneous",
    description: "Machines brass cylinders, silver solders miniature copper steam boilers, and tests pressure.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Model Steam Engine Miniature Boiler Machining",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Model Steam Engine Miniature Boiler Machining",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Model Steam Engine Miniature Boiler Machining.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Model Steam Engine Miniature Boiler Machining.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-candle-making-soy-wax-essential-oil-scenting": {
    id: "misc-multi-multi-stage-candle-making-soy-wax-essential-oil-scenting",
    name: "MultiStageCandleMakingSoyWaxEssentialOilScentingSkill",
    displayName: "Multi Stage Candle Making Soy Wax Essential Oil Scenting",
    categoryId: "miscellaneous",
    description: "Calculates fragrance load percentages, sets cotton wicks, and pours soy wax candles.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Candle Making Soy Wax Essential Oil Scenting",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Candle Making Soy Wax Essential Oil Scenting",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Candle Making Soy Wax Essential Oil Scenting.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Candle Making Soy Wax Essential Oil Scenting.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-traditional-stone-carving-relief-sculpting": {
    id: "misc-multi-multi-layer-traditional-stone-carving-relief-sculpting",
    name: "MultiLayerTraditionalStoneCarvingReliefSculptingSkill",
    displayName: "Multi Layer Traditional Stone Carving Relief Sculpting",
    categoryId: "miscellaneous",
    description: "Carves limestone or marble reliefs using pneumatic chisels, rasps, and rifflers.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Traditional Stone Carving Relief Sculpting",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Traditional Stone Carving Relief Sculpting",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Traditional Stone Carving Relief Sculpting.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Traditional Stone Carving Relief Sculpting.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-perfumery-essential-oil-note-pyramid-blending": {
    id: "misc-multi-multi-stage-perfumery-essential-oil-note-pyramid-blending",
    name: "MultiStagePerfumeryEssentialOilNotePyramidBlendingSkill",
    displayName: "Multi Stage Perfumery Essential Oil Note Pyramid Blending",
    categoryId: "miscellaneous",
    description: "Blends top, middle, and base essential oil fragrance notes into harmonious perfumes.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Perfumery Essential Oil Note Pyramid Blending",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Perfumery Essential Oil Note Pyramid Blending",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Perfumery Essential Oil Note Pyramid Blending.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Perfumery Essential Oil Note Pyramid Blending.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-vintage-sewing-machine-mechanical-overhaul": {
    id: "misc-multi-multi-layer-vintage-sewing-machine-mechanical-overhaul",
    name: "MultiLayerVintageSewingMachineMechanicalOverhaulSkill",
    displayName: "Multi Layer Vintage Sewing Machine Mechanical Overhaul",
    categoryId: "miscellaneous",
    description: "Cleans, times shuttle hooks, replaces motor belts, and tunes tension on vintage Singer machines.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Vintage Sewing Machine Mechanical Overhaul",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Vintage Sewing Machine Mechanical Overhaul",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Vintage Sewing Machine Mechanical Overhaul.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Vintage Sewing Machine Mechanical Overhaul.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-taxidermy-antler-velvet-preservation-mounting": {
    id: "misc-multi-multi-stage-taxidermy-antler-velvet-preservation-mounting",
    name: "MultiStageTaxidermyAntlerVelvetPreservationMountingSkill",
    displayName: "Multi Stage Taxidermy Antler Velvet Preservation Mounting",
    categoryId: "miscellaneous",
    description: "Preserves velvet deer antlers, freeze-dries tissues, and mounts skull caps.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Taxidermy Antler Velvet Preservation Mounting",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Taxidermy Antler Velvet Preservation Mounting",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Taxidermy Antler Velvet Preservation Mounting.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Taxidermy Antler Velvet Preservation Mounting.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-stained-glass-fusing-kiln-slumping-glass": {
    id: "misc-multi-multi-layer-stained-glass-fusing-kiln-slumping-glass",
    name: "MultiLayerStainedGlassFusingKilnSlumpingGlassSkill",
    displayName: "Multi Layer Stained Glass Fusing Kiln Slumping Glass",
    categoryId: "miscellaneous",
    description: "Programs glass kiln firing schedules for fusing, tacking, and slumping glass bowls.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Stained Glass Fusing Kiln Slumping Glass",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Stained Glass Fusing Kiln Slumping Glass",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Stained Glass Fusing Kiln Slumping Glass.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Stained Glass Fusing Kiln Slumping Glass.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-stage-traditional-basketry-willow-cane-weaving": {
    id: "misc-multi-multi-stage-traditional-basketry-willow-cane-weaving",
    name: "MultiStageTraditionalBasketryWillowCaneWeavingSkill",
    displayName: "Multi Stage Traditional Basketry Willow Cane Weaving",
    categoryId: "miscellaneous",
    description: "Soaks willow rods, weaves basket bases, side stakes, borders, and handles.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Traditional Basketry Willow Cane Weaving",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Traditional Basketry Willow Cane Weaving",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Traditional Basketry Willow Cane Weaving.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Traditional Basketry Willow Cane Weaving.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-layer-metal-etching-acid-resist-design-transfer": {
    id: "misc-multi-multi-layer-metal-etching-acid-resist-design-transfer",
    name: "MultiLayerMetalEtchingAcidResistDesignTransferSkill",
    displayName: "Multi Layer Metal Etching Acid Resist Design Transfer",
    categoryId: "miscellaneous",
    description: "Transfers designs to copper/brass plates, etches in ferric chloride, and polishes.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Metal Etching Acid Resist Design Transfer",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Metal Etching Acid Resist Design Transfer",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Metal Etching Acid Resist Design Transfer.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Metal Etching Acid Resist Design Transfer.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },

  "misc-multi-multi-horizon-master-everyday-craft-artisan-mastery-engine": {
    id: "misc-multi-multi-horizon-master-everyday-craft-artisan-mastery-engine",
    name: "MultiHorizonMasterEverydayCraftArtisanMasteryEngineSkill",
    displayName: "Multi Horizon Master Everyday Craft Artisan Mastery Engine",
    categoryId: "miscellaneous",
    description: "Enforces master physical craftsmanship, hand-tool precision, heritage restoration, and artisan skill.",
    tags: ["miscellaneous","multi-skill","misc-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Master Everyday Craft Artisan Mastery Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Master Everyday Craft Artisan Mastery Engine",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Horizon Master Everyday Craft Artisan Mastery Engine.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Horizon Master Everyday Craft Artisan Mastery Engine.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["miscellaneous","multi-skill","misc-multi"],
    }),
  },
};
