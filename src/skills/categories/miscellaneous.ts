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
};
