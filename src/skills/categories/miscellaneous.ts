import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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
};
