import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  extractTaskFromGeneratedPrompt,
} from '../skillHelpers';
import { derivePreciseRole } from '../skillArchitect';

export const CORE_SKILLS: Record<string, SkillDefinition> = {
  'role-calibration': {
    id: 'role-calibration',
    name: 'RoleCalibrationSkill',
    displayName: 'Role & Authority Calibration',
    categoryId: 'core',
    description: 'Calibrates authority, perspective, seniority, and mandate to match exact task demands.',
    tags: ['core', 'role', 'persona', 'authority'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      const task = extractTaskFromGeneratedPrompt(prompt) || (isRu ? 'Выполнить задачу' : 'Execute directive');
      const roleSpec = derivePreciseRole(task, isRu, ['role-calibration']);
      const roleTitle = isRu ? roleSpec.roleTitleRu : roleSpec.roleTitleEn;
      const roleFocus = isRu ? roleSpec.focusRu : roleSpec.focusEn;
      const roleMandate = isRu ? roleSpec.mandateRu : roleSpec.mandateEn;

      const roleSec = sections.find((s) => s.semanticType === 'role');
      const linesRu = [
        `Вы выступаете в роли: **${roleTitle}**.`,
        `- **Специализация и фокус**: ${roleFocus}.`,
        `- **Главный мандат**: ${roleMandate}`,
        '- **Инженерный стандарт**: Избегать общих фраз, предоставлять выверенные практические решения.',
      ];
      const linesEn = [
        `You are acting as: **${roleTitle}**.`,
        `- **Domain Focus**: ${roleFocus}.`,
        `- **Operational Mandate**: ${roleMandate}`,
        '- **Engineering Rigor**: Zero superficial hand-waving; synthesize precise production solutions.',
      ];

      if (roleSec) {
        roleSec.lines = isRu ? linesRu : linesEn;
      } else {
        sections.unshift({
          rawHeader: isRu ? '### 1. Роль и Профессиональный Мандат' : '### 1. Role & Professional Mandate',
          level: 3,
          title: isRu ? 'Роль и Профессиональный Мандат' : 'Role & Professional Mandate',
          cleanTitle: isRu ? 'роль и профессиональный мандат' : 'role & professional mandate',
          lines: isRu ? linesRu : linesEn,
          semanticType: 'role',
        });
      }

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'operational-objective': {
    id: 'operational-objective',
    name: 'OperationalObjectiveSkill',
    displayName: 'Operational Mission & Mandate',
    categoryId: 'core',
    description: 'Pins down the core mission, critical success factors, and unambiguous target deliverables.',
    tags: ['core', 'objective', 'mission', 'goal', 'mandate'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Целевой Мандат и Операционная Задача',
        'Operational Objective & Core Mandate',
        [
          '- **Главная миссия**: Сфокусироваться на непосредственном решении целевой проблемы без распыления на смежные темы.',
          '- **Критерий завершенности**: Решение должно быть полностью применимо на практике без необходимости повторного уточнения контекста.',
          '- **Фокус на ценности**: Каждое утверждение должно нести непосредственную практическую пользу для конечного результата.',
        ],
        [
          '- **Primary Mission**: Focus strictly on the core problem resolution without drifting into tangential topics.',
          '- **Completion Criterion**: Deliverable must be directly actionable without requiring supplementary context clarification.',
          '- **Value Density**: Every assertion and recommendation must contribute directly to actionable execution.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'audience-targeting': {
    id: 'audience-targeting',
    name: 'AudienceTargetingSkill',
    displayName: 'Audience & Cognitive Calibration',
    categoryId: 'core',
    description: 'Adapts technical depth, terminology, density, and mental models to the target audience.',
    tags: ['core', 'audience', 'depth', 'tone', 'stakeholder'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Калибровка Аудитории и Плотности Изложения',
        'Audience Calibration & Technical Depth',
        [
          '- **Целевой читатель**: Адаптировать терминологию, глубину объяснений и контекст под профильного эксперта предметной области.',
          '- **Информационная плотность**: Максимизировать соотношение сигнал/шум; исключить очевидные определения и учебные банальности.',
          '- **Уровень абстракции**: Предоставлять конкретные архитектурные и операционные спецификации вместо высокоуровневых абстракций.',
        ],
        [
          '- **Target Reader**: Calibrate domain terminology, technical rigor, and contextual depth for senior domain practitioners.',
          '- **Information Density**: Maximize signal-to-noise ratio; eliminate introductory truisms and standard textbook explanations.',
          '- **Abstraction Level**: Deliver concrete architectural and operational specifics rather than generic high-level concepts.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'context-framing': {
    id: 'context-framing',
    name: 'ContextFramingSkill',
    displayName: 'Context & Environmental Framing',
    categoryId: 'core',
    description: 'Anchors operational environment, tech stack, organizational realities, and background legacy.',
    tags: ['core', 'context', 'environment', 'stack', 'background'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'context',
        'Контекст и Архитектурное Окружение',
        'Context & System Environment',
        [
          '- **Операционное окружение**: Учитывать реальные производственные ограничения, существующий технологический стек и компромиссы.',
          '- **Интеграционный контекст**: Разрабатываемое решение должно бесшовно встраиваться в существующие процессы и инфраструктуру.',
          '- **Реалистичность исполнения**: Исключить гипотетические решения, требующие недостижимой идеальной среды.',
        ],
        [
          '- **Production Environment**: Account for real-world operational constraints, legacy systems, and engineering trade-offs.',
          '- **Integration Context**: Ensure synthesized solutions integrate seamlessly into existing workflows and infrastructure.',
          '- **Pragmatic Realism**: Reject ivory-tower designs that depend on non-existent ideal conditions.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'assumption-surfacing': {
    id: 'assumption-surfacing',
    name: 'AssumptionSurfacingSkill',
    displayName: 'Explicit Assumption Surfacing',
    categoryId: 'core',
    description: 'Forces explicit identification and validation of all implicit premises, defaults, and axioms.',
    tags: ['core', 'assumptions', 'axioms', 'premises', 'validation'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Аудит и Экспликация Допущений',
        'Explicit Assumption Audit',
        [
          '- **Явная фиксация допущений**: Перед предложением решения четко перечислить все принятые базовые предположения и аксиомы.',
          '- **Анализ чувствительности**: Указать, как изменение ключевых допущений повлияет на устойчивость предложенного решения.',
          '- **Маркировка неопределенности**: При недостатке входных данных выделить критические переменные, требующие подтверждения.',
        ],
        [
          '- **Explicit Premise Articulation**: Enumerate all underlying assumptions, defaults, and axiomatic premises prior to formulating solutions.',
          '- **Sensitivity Analysis**: Detail how variance in core assumptions alters the feasibility and robustness of recommendations.',
          '- **Uncertainty Demarcation**: Flag missing context and document critical variables that require stakeholder confirmation.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'definition-of-done': {
    id: 'definition-of-done',
    name: 'DefinitionOfDoneSkill',
    displayName: 'Definition of Done (DoD)',
    categoryId: 'core',
    description: 'Enforces strict binary acceptance criteria, testable verification gates, and sign-off checklists.',
    tags: ['core', 'dod', 'criteria', 'acceptance', 'verification'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Критерии Приемки и Definition of Done (DoD)',
        'Acceptance Gates & Definition of Done (DoD)',
        [
          '- **Бинарная проверка**: Сформировать чек-лист Definition of Done, где каждый пункт имеет однозначный статус (Пройден / Не пройден).',
          '- **Верифицируемость**: Каждый критерий должен проверяться автоматизированным тестом, метрикой или строгим сценарием ревью.',
          '- **Условия закрытия**: Решение считается готовым только при 100% выполнении всех обязательных инвариантов.',
        ],
        [
          '- **Binary Verification**: Formulate an unambiguous Definition of Done checklist where every gate has a binary Pass/Fail state.',
          '- **Verifiability**: Each completion criterion must be testable via automated suites, telemetry metrics, or strict review protocols.',
          '- **Sign-off Gate**: Deliverable is complete only when 100% of non-negotiable invariants are verified.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'scope-boundary': {
    id: 'scope-boundary',
    name: 'ScopeBoundarySkill',
    displayName: 'Scope Boundary & Non-Goals Matrix',
    categoryId: 'core',
    description: 'Explicitly demarcates in-scope deliverables from out-of-scope non-goals to prevent scope creep.',
    tags: ['core', 'scope', 'boundaries', 'non-goals', 'guardrails'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'constraints',
        'Границы Скоупа и Non-Goals',
        'Scope Boundaries & Non-Goals',
        [
          '- **In-Scope (Входит в задачу)**: Сфокусироваться строго на согласованном ядре функциональности и прямых требованиях.',
          '- **Non-Goals (Явно исключено)**: Зафиксировать смежные задачи, оптимизации и расширения, которые намеренно не реализуются в рамках текущего этапа.',
          '- **Предотвращение размытия**: При возникновении смежных тем кратко отметить их в бэклог без углубления в детализацию.',
        ],
        [
          '- **In-Scope Boundaries**: Concentrate strictly on core agreed deliverables and explicit requirements.',
          '- **Explicit Non-Goals**: Enumerate adjacent problems, premature optimizations, and deferred features explicitly out-of-scope.',
          '- **Scope Creep Prevention**: Catalog tangential topics into a concise deferred backlog without deep detailing.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'tradeoff-hierarchy': {
    id: 'tradeoff-hierarchy',
    name: 'TradeoffHierarchySkill',
    displayName: 'Trade-off Priority Hierarchy',
    categoryId: 'core',
    description: 'Defines an explicit conflict resolution order (e.g. Correctness > Latency > Cost > Velocity).',
    tags: ['core', 'tradeoffs', 'priorities', 'hierarchy', 'decision-making'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Иерархия Архитектурных Компромиссов',
        'Architectural Trade-off Hierarchy',
        [
          '- **Матрица приоритетов**: При конфликте требований следовать строгому порядку: Надежность и корректность > Производительность > Стоимость > Скорость реализации.',
          '- **Обоснование уступок**: Каждое компромиссное решение должно сопровождаться явным анализом плюсов, минусов и цены отказа.',
          '- **Недопустимые уступки**: Безопасность данных и консистентность состояния не могут приноситься в жертву удобству разработки.',
        ],
        [
          '- **Priority Hierarchy**: In design conflicts, enforce strict precedence: Correctness & Reliability > Latency/Throughput > Infrastructure Cost > Velocity.',
          '- **Explicit Trade-off Rationale**: Accompany every architectural compromise with clear upside vs. downside cost analysis.',
          '- **Non-Negotiable Invariants**: State consistency, data integrity, and security must never be sacrificed for temporary ergonomics.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'epistemic-calibration': {
    id: 'epistemic-calibration',
    name: 'EpistemicCalibrationSkill',
    displayName: 'Epistemic Confidence Calibration',
    categoryId: 'core',
    description: 'Requires explicit confidence tagging (High/Medium/Speculative) and marks knowledge limits.',
    tags: ['core', 'epistemic', 'confidence', 'uncertainty', 'calibration'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'constraints',
        'Эпистемическая Калибровка и Границы Знания',
        'Epistemic Calibration & Knowledge Boundaries',
        [
          '- **Градация уверенности**: Маркировать ключевые утверждения по шкале достоверности (Доказанный факт / Инженерная эвристика / Гипотеза).',
          '- **Границы компетенции**: При отсутствии исчерпывающих данных явно фиксировать границу знания, а не достраивать правдоподобные вымыслы.',
          '- **Условные рекомендации**: Снабжать рекомендации формулировками «При условии, что...» с указанием граничных факторов.',
        ],
        [
          '- **Confidence Tagging**: Tag critical assertions by epistemic certainty (Empirical Fact / Industry Heuristic / Speculative Hypothesis).',
          '- **Knowledge Boundary Demarcation**: Explicitly state data limits rather than interpolating plausible-sounding fabrications.',
          '- **Conditional Recommendations**: Frame prescriptive advice with explicit preconditions ("Valid provided that...").',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'input-normalization': {
    id: 'input-normalization',
    name: 'InputNormalizationSkill',
    displayName: 'Input Normalization & Sanitation',
    categoryId: 'core',
    description: 'Cleanses, canonicalizes, and parses messy or ambiguous user variables into structured schemas.',
    tags: ['core', 'normalization', 'sanitization', 'input', 'preprocessing'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Нормализация и Валидация Входных Данных',
        'Input Normalization & Schema Validation',
        [
          '- **Канонизация входных сущностей**: Перед обработкой привести все термины, идентификаторы и параметры к единому каноническому виду.',
          '- **Обработка пропусков**: Заполнить отсутствующие необязательные поля безопасными дефолтными значениями с явным уведомлением.',
          '- **Санитизация шума**: Отфильтровать нерелевантные мета-комментарии и противоречивые вводные перед выполнением логики.',
        ],
        [
          '- **Canonical Mapping**: Standardize entity names, parameter identifiers, and units into a unified canonical schema before processing.',
          '- **Missing Value Handling**: Populate omitted non-critical parameters with secure, battle-tested defaults while logging assumptions.',
          '- **Noise Filtration**: Strip contradictory meta-commentary and irrelevant user artifacts prior to execution.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'success-metrics': {
    id: 'success-metrics',
    name: 'SuccessMetricsSkill',
    displayName: 'Quantitative Success Metrics & KPIs',
    categoryId: 'core',
    description: 'Formulates measurable, benchmarkable performance metrics and SLA targets for verification.',
    tags: ['core', 'metrics', 'kpi', 'sla', 'benchmarks', 'quantitative'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Метрики Успеха и Количественные KPI',
        'Quantitative Success Metrics & Benchmark KPIs',
        [
          '- **Числовые целевые показатели**: Определить конкретные измеримые метрики (P99 задержка, % покрытие, error rate, конверсия, MTTR).',
          '- **Базовые и целевые уровни**: Задать baseline (текущее значение), target (целевой результат) и fail-threshold (порог отката).',
          '- **Инструменты телеметрии**: Указать способы сбора и мониторинга каждой метрики в реальном времени.',
        ],
        [
          '- **Quantitative Target KPIs**: Formulate concrete numeric benchmarks (P99 latency, test coverage %, error budgets, MTTR, conversion).',
          '- **Threshold Matrix**: Define baseline, target SLA, and fail-threshold rollback triggers.',
          '- **Telemetry Instrumentation**: Specify telemetry instrumentation and real-time observability mechanisms for each KPI.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'anti-drift-anchor': {
    id: 'anti-drift-anchor',
    name: 'AntiDriftAnchorSkill',
    displayName: 'Anti-Drift Context Anchoring',
    categoryId: 'core',
    description: 'Establishes continuous alignment checkpoints to prevent cognitive drift across long outputs.',
    tags: ['core', 'anti-drift', 'context', 'focus', 'consistency'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Контроль Непрерывности и Защита от Дрейфа Контекста',
        'Anti-Drift Context Continuity Protocol',
        [
          '- **Периодическая ре-синхронизация**: При формировании длинного ответа каждый подраздел должен явно соотноситься с изначальной задачей.',
          '- **Контроль инвариантов**: Ни на одном этапе генерации не отступать от заданных ограничений и форматов.',
          '- **Фиксация терминологии**: Использовать одни и те же термины для одних и тех же концептов на протяжении всего документа.',
        ],
        [
          '- **Periodic Re-synchronization**: Ensure every generated subsection directly anchors back to the root objective.',
          '- **Invariant Persistence**: Never relax initial constraints or format rules midway through deep generation.',
          '- **Terminology Uniformity**: Maintain consistent nomenclature and symbol definitions across the entire output.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'cognitive-stance': {
    id: 'cognitive-stance',
    name: 'CognitiveStanceSkill',
    displayName: 'Cognitive Stance & Mindset Stance',
    categoryId: 'core',
    description: 'Configures explicit analytical mindset: adversarial red-team, conservative engineer, or pragmatic optimizer.',
    tags: ['core', 'mindset', 'stance', 'attitude', 'perspective'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'role',
        'Когнитивная Позиция и Инженерный Подход',
        'Cognitive Stance & Analytical Stance',
        [
          '- **Критический прагматизм**: Оценивать решения с точки зрения эксплуатационной простоты, устойчивости к ошибкам и стоимости сопровождения.',
          '- **Скептицизм к усложнению**: Отдавать предпочтение проверенным, минималистичным решениям перед переусложненными модными абстракциями.',
          '- **Ориентация на худший сценарий**: Проектировать систему с расчетом на сетевые сбои, пиковые нагрузки и человеческий фактор.',
        ],
        [
          '- **Critical Pragmatism**: Evaluate solutions through operational simplicity, resilience under failure, and long-term maintenance cost.',
          '- **Simplicity Bias**: Prefer battle-tested, minimal mechanisms over convoluted architectural hype.',
          '- **Worst-Case Readiness**: Design under the assumption of network partitions, noisy neighbors, and operator error.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'multi-perspective-synthesis': {
    id: 'multi-perspective-synthesis',
    name: 'MultiPerspectiveSynthesisSkill',
    displayName: 'Multi-Stakeholder Perspective Synthesis',
    categoryId: 'core',
    description: 'Synthesizes recommendations balancing engineering, business, security, and product viewpoints.',
    tags: ['core', 'stakeholders', 'perspectives', 'synthesis', 'alignment'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Синтез Мнений Ключевых Стейкхолдеров',
        'Multi-Stakeholder Perspective Synthesis',
        [
          '- **Баланс интересов**: Проанализировать решение с точек зрения: 1) Engineering (надежность/масштабируемость), 2) Security (векторы атак/compliance), 3) Product/Business (time-to-market/ROI).',
          '- **Разрешение конфликтов**: При несовпадении целей предложить сбалансированный компромисс с фиксацией рисков для каждой стороны.',
          '- **Единый вывод**: Сформировать согласованный финальный вердикт, понятный всем вовлеченным ролям.',
        ],
        [
          '- **Stakeholder Triad**: Audit recommendations across: 1) Engineering (scalability/reliability), 2) Security (threat vectors/compliance), 3) Business/Product (ROI/velocity).',
          '- **Conflict Resolution**: Mediate misaligned incentives by proposing a weighted compromise with documented residual risk.',
          '- **Unified Consensus**: Synthesize a coherent executive verdict actionable across all leadership verticals.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
