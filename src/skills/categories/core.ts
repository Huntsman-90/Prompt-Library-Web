import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  extractTaskFromGeneratedPrompt,
  createStandardSkillTransform,
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

  'first-principles-framing': {
    id: 'first-principles-framing',
    name: 'FirstPrinciplesFramingSkill',
    displayName: 'First-Principles Problem Framing',
    categoryId: 'core',
    description: 'Deconstructs problems down to bedrock physical, mathematical, and algorithmic axioms before building up.',
    tags: ['core', 'first-principles', 'axioms', 'foundations', 'decomposition'],
    transform: createStandardSkillTransform(
      'protocol',
      'Декомпозиция до Первых Принципов (First Principles)',
      'First-Principles Problem Framing Protocol',
      [
        '- **Редукция к аксиомам**: Очистить проблему от поверхностных аналогий и исторического контекста; выделить нерушимые физические и логические константы.',
        '- **Проверка базовых истин**: Проанализировать каждую предпосылку вопросом «Что из этого абсолютно непреложно, а что является всего лишь привычкой?».',
        '- **Синтез снизу вверх**: Собрать архитектурное решение строго на основе доказанных фактов без оглядки на устаревшие шаблоны.',
      ],
      [
        '- **Axiomatic Reduction**: Strip away historical precedents and superficial analogies; isolate bedrock physical and logical invariables.',
        '- **Baseline Truth Audit**: Interrogate every premise: "What is physically/mathematically unalterable vs. merely industry convention?".',
        '- **Bottom-Up Synthesis**: Construct solutions upward strictly from validated core truths without legacy conformity.',
      ]
    ),
  },

  'falsifiability-criterion': {
    id: 'falsifiability-criterion',
    name: 'FalsifiabilityCriterionSkill',
    displayName: 'Falsifiability & Refutation Criteria',
    categoryId: 'core',
    description: 'Formulates explicit testable criteria under which the proposed solution or hypothesis is considered disproven.',
    tags: ['core', 'falsifiability', 'testing', 'refutation', 'empiricism'],
    transform: createStandardSkillTransform(
      'protocol',
      'Критерий Фальсифицируемости и Условия Опровержения',
      'Falsifiability & Hypothesis Refutation Protocol',
      [
        '- **Условия опровержения**: Сформулировать четкие эмпирические условия, при наступлении которых текущая гипотеза считается ложной.',
        '- **Контрольный эксперимент**: Описать минимальный тест, способный однозначно подтвердить или опровергнуть работоспособность подхода.',
        '- **Запрет неуязвимых формулировок**: Исключить размытые тезисы, которые невозможно опровергнуть результатами замеров или метриками.',
      ],
      [
        '- **Explicit Refutation Triggers**: Articulate concrete empirical outcomes that would conclusively disprove the proposed hypothesis.',
        '- **Discriminative Experimentation**: Define minimal litmus tests capable of unambiguously validating or invalidating the architectural claim.',
        '- **No Unfalsifiable Claims**: Eliminate vague assertions immune to telemetry verification or metric-based disproof.',
      ]
    ),
  },

  'constraints-first-design': {
    id: 'constraints-first-design',
    name: 'ConstraintsFirstDesignSkill',
    displayName: 'Constraints-First Architecture',
    categoryId: 'core',
    description: 'Enforces rigorous upfront mapping of non-negotiable compute, network, memory, cost, and legal boundaries.',
    tags: ['core', 'constraints', 'limits', 'boundaries', 'resource-allocation'],
    transform: createStandardSkillTransform(
      'constraints',
      'Ограничения Системы и Граничные Ресурсы',
      'Hard Constraints & Environmental Boundaries',
      [
        '- **Картирование жестких лимитов**: До генерации вариантов зафиксировать пределы по ресурсам: бюджет, CPU/память, задержка сети, compliance.',
        '- **Дизайн в границах**: Отбрасывать любые идеи, нарушающие хотя бы одно жесткое ограничение, независимо от их теоретической привлекательности.',
        '- **Запас прочности (Headroom)**: Проектировать с обязательным резервом 25-30% от предельно допустимых лимитов нагрузки.',
      ],
      [
        '- **Hard Boundary Mapping**: Map non-negotiable ceilings upfront: budget caps, memory/compute envelope, network latency SLAs, and compliance mandates.',
        '- **Constraint-Bounded Ideation**: Instantly discard solutions violating any hard boundary, regardless of theoretical novelty.',
        '- **Safety Headroom**: Engineer all operational models with a mandatory 25-30% headroom buffer below peak stress thresholds.',
      ]
    ),
  },

  'signal-to-noise-optimization': {
    id: 'signal-to-noise-optimization',
    name: 'SignalToNoiseOptimizationSkill',
    displayName: 'Signal-to-Noise Ratio Maximization',
    categoryId: 'core',
    description: 'Maximizes information density by eradicating rhetorical padding, ceremonial preambles, and conversational fillers.',
    tags: ['core', 'conciseness', 'density', 'signal-to-noise', 'precision'],
    transform: createStandardSkillTransform(
      'constraints',
      'Максимизация Плотности Смысла (Signal-to-Noise)',
      'Signal-to-Noise Ratio Optimization',
      [
        '- **Нулевая вода**: Полностью исключить вежливые вступления («Конечно, вот решение...»), банальные трюизмы и очевидные определения.',
        '- **Высокая плотность понятий**: Каждое предложение обязано содержать конкретные параметры, механизмы, структуры данных или аргументы.',
        '- **Компактная нотация**: Использовать списки, формулы, матрицы решений и таблицы вместо многословных описательных абзацев.',
      ],
      [
        '- **Zero Conversational Padding**: Ban courteous preambles ("Certainly, here is...", "As we know..."), truisms, and textbook definitions.',
        '- **High Semantic Density**: Every sentence must convey concrete technical parameters, data structures, failure modes, or architectural choices.',
        '- **Compact Structured Notation**: Default to bulleted specs, decision matrices, and code/schema blocks over narrative prose.',
      ]
    ),
  },

  'explicit-uncertainty-quantification': {
    id: 'explicit-uncertainty-quantification',
    name: 'ExplicitUncertaintyQuantificationSkill',
    displayName: 'Uncertainty & Risk Quantification',
    categoryId: 'core',
    description: 'Replaces hand-wavy adjectives with calibrated probabilities, confidence bounds, and variance distributions.',
    tags: ['core', 'uncertainty', 'probability', 'risk', 'quantification'],
    transform: createStandardSkillTransform(
      'protocol',
      'Количественная Оценка Неопределенности и Рисков',
      'Explicit Uncertainty & Risk Quantification Protocol',
      [
        '- **Замена качественных оценок**: Запретить слова «вероятно», «быстро», «редко»; указывать численные диапазоны (напр. «вероятность 75–85%», «задержка 120–150 мс»).',
        '- **Доверительные интервалы**: Сопровождать прогнозы интервалами P50/P90/P99 и перечнем факторов, способных сдвинуть распределение.',
        '- **Градация риска**: Классифицировать угрозы по матрице «Вероятность возникновения × Тяжесть последствий» с выделением критического пути.',
      ],
      [
        '- **Quantitative Precision**: Ban subjective adjectives ("likely", "fast", "rarely"); enforce explicit confidence percentages and numerical bounds (e.g. "p=0.80", "120-150ms").',
        '- **Variance & Confidence Intervals**: Frame projections with P50/P90/P99 latency or cost distributions, identifying high-volatility levers.',
        '- **Severity-Probability Matrix**: Map systemic hazards across a formal Probability × Impact matrix, highlighting single-point failure vectors.',
      ]
    ),
  },

  'failure-mode-anticipation': {
    id: 'failure-mode-anticipation',
    name: 'FailureModeAnticipationSkill',
    displayName: 'Failure Mode Anticipation & Triad',
    categoryId: 'core',
    description: 'Proactively identifies systemic degradation paths, cascade failure triggers, and recovery fallbacks.',
    tags: ['core', 'resilience', 'failure-modes', 'cascade', 'fallback'],
    transform: createStandardSkillTransform(
      'protocol',
      'Проектирование Режимов Отказа и Устойчивости (Failure Modes)',
      'Failure Mode Anticipation & Degradation Protocol',
      [
        '- **Анализ точек отказа**: Для каждого узла системы определить: как он ломается (timeout, corrupted state, split-brain, OOM) и к чему это ведет.',
        '- **Каскадная изоляция (Bulkheading)**: Обеспечить изоляцию сбоя одного компонента от критического ядра системы.',
        '- **Плавная деградация (Graceful Degradation)**: Предусмотреть аварийный режим пониженной функциональности вместо полного падения.',
      ],
      [
        '- **Failure Mode Catalog**: For every component, specify failure signatures: timeout, memory exhaustion, partial partitions, data corruption.',
        '- **Bulkheading & Blast Radius**: Enforce strict architectural isolation to prevent local faults from triggering cascading systemic outages.',
        '- **Graceful Degradation Contract**: Detail fallbacks and degraded operational modes that preserve essential availability during downstream failure.',
      ]
    ),
  },

  'semantic-disambiguation': {
    id: 'semantic-disambiguation',
    name: 'SemanticDisambiguationSkill',
    displayName: 'Domain Semantic Disambiguation',
    categoryId: 'core',
    description: 'Unambiguously defines polysemous and overloaded terminology before architectural reasoning commences.',
    tags: ['core', 'semantics', 'glossary', 'definitions', 'taxonomy'],
    transform: createStandardSkillTransform(
      'context',
      'Устранение Семантической Неоднозначности (Disambiguation)',
      'Domain Semantic Disambiguation Protocol',
      [
        '- **Фиксация глоссария**: В самом начале четко зафиксировать значения многозначных понятий (напр., Session, State, Event, Model, Cluster).',
        '- **Разрешение терминологических конфликтов**: Указать, в каком именно отраслевом стандарте (DDD, RFC, UML) употребляется термин.',
        '- **Единообразие в тексте**: Запретить использование синонимов для обозначения одного и того же концептуального объекта.',
      ],
      [
        '- **Upfront Glossary Locking**: Explicitly define polysemous domain terms (e.g. "Session", "Event", "Entity", "Transaction") before elaboration.',
        '- **Framework Alignment**: Anchor terminology to explicit industry standards (e.g., Domain-Driven Design, POSIX, W3C specs).',
        '- **Consistent Synonym Ban**: Prohibit switching terms mid-document; maintain strict 1:1 mapping between words and conceptual entities.',
      ]
    ),
  },

  'decision-memo-architecture': {
    id: 'decision-memo-architecture',
    name: 'DecisionMemoArchitectureSkill',
    displayName: 'Executive Decision Memo Architecture',
    categoryId: 'core',
    description: 'Structures complex engineering decisions into Context, Options, Invariants, Recommendation, and Actionable Next Steps.',
    tags: ['core', 'memo', 'rfc', 'decision', 'architecture'],
    transform: createStandardSkillTransform(
      'output_format',
      'Формат Инженерного Мемо (Decision Memo)',
      'Executive Decision Memo Structure',
      [
        '- **Спецификация разделов**: Ответ должен следовать канону: 1) Executive Summary, 2) Проблема и контекст, 3) Рассмотренные альтернативы, 4) Рекомендация с доказательствами, 5) План действий.',
        '- **Таблица сравнения опций**: Оформить сравнительную матрицу альтернатив по единой шкале критериев.',
        '- **Ответственные лица и сроки**: Каждый шаг должен иметь владельца (Owner) и критерий готовности.',
      ],
      [
        '- **Standardized Memo Structure**: Format deliverable into: 1) Executive Summary, 2) Problem Context & Drivers, 3) Options Evaluated, 4) Justified Recommendation, 5) Actionable Roadmap.',
        '- **Trade-off Comparison Matrix**: Present evaluated options in a comparative table scored against uniform technical and cost criteria.',
        '- **Accountability & Execution**: Conclude with an unambiguous next-steps checklist with defined owners and completion gates.',
      ]
    ),
  },

  'invariant-preservation': {
    id: 'invariant-preservation',
    name: 'InvariantPreservationSkill',
    displayName: 'Systemic Invariant Preservation',
    categoryId: 'core',
    description: 'Identifies and rigorously preserves immutable business rules, data schemas, and mathematical consistency invariants.',
    tags: ['core', 'invariants', 'data-integrity', 'consistency', 'contracts'],
    transform: createStandardSkillTransform(
      'constraints',
      'Сохранение Системных Инвариантов и Целостности',
      'Systemic Invariant Preservation Directives',
      [
        '- **Выделение инвариантов**: Четко перечислить свойства системы, которые ни при каких условиях не должны нарушаться (ACID, idempotency, zero data loss).',
        '- **Проверка переходных состояний**: Доказать, что при любых переключениях или миграциях инварианты сохраняются непрерывно.',
        '- **Защитные проверки (Assertions)**: Снабдить спецификации проверками предусловий (preconditions) и постусловий (postconditions).',
      ],
      [
        '- **Explicit Invariant Definition**: Enumerate immutable system truths that must hold true before, during, and after every transaction.',
        '- **State Transition Safety**: Prove that concurrent updates, failovers, and schema migrations cannot violate core invariants.',
        '- **Contract Assertions**: Specify machine-verifiable preconditions, postconditions, and runtime assertions protecting data integrity.',
      ]
    ),
  },

  'reversibility-analysis': {
    id: 'reversibility-analysis',
    name: 'ReversibilityAnalysisSkill',
    displayName: 'Two-Way Door & Reversibility Analysis',
    categoryId: 'core',
    description: 'Categorizes architectural decisions into reversible (Type 2) vs irreversible (Type 1) with explicit exit strategies.',
    tags: ['core', 'reversibility', 'decisions', 'risk-management', 'migration'],
    transform: createStandardSkillTransform(
      'protocol',
      'Анализ Обратимости Решений (One-Way vs Two-Way Doors)',
      'Decision Reversibility & Exit Strategy Protocol',
      [
        '- **Классификация решений**: Разделить решения на «двусторонние двери» (легко отменить) и «односторонние» (необратимые или крайне дорогие в отмене).',
        '- **План отката (Rollback / Exit Strategy)**: Для каждого ключевого выбора подготовить четкий план вывода из эксплуатации или миграции на альтернативу.',
        '- **Оценка стоимости отката**: Зафиксировать трудозатраты и риски в случае необходимости отмены принятого архитектурного решения.',
      ],
      [
        '- **Door Classification**: Classify every major architectural choice as Type 1 (irreversible one-way door) or Type 2 (rapidly reversible two-way door).',
        '- **Concrete Exit Strategy**: Require an explicit rollback plan, data migration path, and vendor decoupling strategy for all Type 1 decisions.',
        '- **Reversal Cost Assessment**: Quantify the blast radius and engineering hours required to unwind the proposed architecture if assumptions fail.',
      ]
    ),
  },

  'minimal-viable-intervention': {
    id: 'minimal-viable-intervention',
    name: 'MinimalViableInterventionSkill',
    displayName: 'Minimal Viable Intervention (MVI)',
    categoryId: 'core',
    description: 'Enforces the principle of least complexity: solve the problem with the smallest, least invasive architectural footprint.',
    tags: ['core', 'simplicity', 'mvi', 'minimalism', 'occams-razor'],
    transform: createStandardSkillTransform(
      'constraints',
      'Принцип Минимального Необходимого Вмешательства (MVI)',
      'Minimal Viable Intervention (MVI) Principle',
      [
        '- **Бритва Оккама**: Отсекать любые избыточные сервисы, сторонние библиотеки и сложные слои абстракции, если задачу можно решить базовыми инструментами.',
        '- **Минимизация диффа**: Предпочитать точечные, безопасные изменения глобальным переписываниям систем.',
        '- **Контроль накладных расходов**: Любое усложнение архитектуры должно оправдываться критическим выигрышем в метриках.',
      ],
      [
        '- **Occams Razor in Engineering**: Reject superfluous microservices, heavy external dependencies, and premature meta-frameworks.',
        '- **Minimal Surface Mutation**: Favor minimal atomic mutations and surgical refactoring over high-risk wholesale rewrites.',
        '- **Complexity Tax Justification**: Every added layer of abstraction must justify its maintenance and debugging overhead with hard metrics.',
      ]
    ),
  },

  'downstream-impact-mapping': {
    id: 'downstream-impact-mapping',
    name: 'DownstreamImpactMappingSkill',
    displayName: 'Downstream & Second-Order Impact Mapping',
    categoryId: 'core',
    description: 'Traces second- and third-order ripple effects across downstream consumer services, databases, and operational teams.',
    tags: ['core', 'second-order', 'downstream', 'impact-analysis', 'systems-thinking'],
    transform: createStandardSkillTransform(
      'protocol',
      'Картирование Второпорядковых Последствий (Second-Order Effects)',
      'Downstream & Second-Order Impact Mapping Protocol',
      [
        '- **Анализ эффекта домино**: Исследовать, как предлагаемое изменение повлияет на смежные системы, очереди сообщений, аналитику и партнерские API.',
        '- **Обратная совместимость (Backwards Compatibility)**: Гарантировать сохранение контрактов для всех существующих потребителей данных.',
        '- **Оповещение стейкхолдеров**: Составить матрицу систем и команд, требующих уведомления или согласования перед релизом.',
      ],
      [
        '- **Ripple Effect Tracing**: Model secondary and tertiary ramifications across message brokers, downstream replica lag, and analytics pipelines.',
        '- **Strict Backward Compatibility**: Enforce schema evolution rules (e.g. Protobuf/JSON schema backward compatibility) for all active consumers.',
        '- **Stakeholder Notification Matrix**: Catalog all impacted platform consumers, client SDKs, and operations teams requiring coordinated rollouts.',
      ]
    ),
  },

  'evidence-hierarchy-enforcement': {
    id: 'evidence-hierarchy-enforcement',
    name: 'EvidenceHierarchyEnforcementSkill',
    displayName: 'Evidence Hierarchy & Grounding',
    categoryId: 'core',
    description: 'Prioritizes empirical benchmarks and telemetry over theoretical models and subjective opinions.',
    tags: ['core', 'evidence', 'empirical', 'benchmarks', 'grounding'],
    transform: createStandardSkillTransform(
      'protocol',
      'Иерархия Доказательств и Эмпирическая База',
      'Evidence Hierarchy & Empirical Grounding Protocol',
      [
        '- **Строгая субординация источников**: Опираться на факты в порядке: 1) Замеры продакшн-телеметрии, 2) Воспроизводимые бенчмарки, 3) Официальная документация, 4) Экспертная эвристика.',
        '- **Исключение голословных утверждений**: Каждое утверждение о производительности или безопасности должно сопровождаться ссылкой на замер или стандарт.',
        '- **Маркировка личного мнения**: Явно разграничивать доказанные факты и субъективные предпочтения.',
      ],
      [
        '- **Hierarchical Source Priority**: Weight arguments strictly: 1) Production telemetry & profiler traces > 2) Reproducible benchmarks > 3) Official specifications > 4) Expert heuristics.',
        '- **Substantiated Claims Only**: Every claim regarding performance, memory footprint, or security posture must cite concrete measurements.',
        '- **Opinion Demarcation**: Explicitly label architectural taste or subjective stylistic preference as distinct from empirical imperatives.',
      ]
    ),
  },

  'operational-readiness-gate': {
    id: 'operational-readiness-gate',
    name: 'OperationalReadinessGateSkill',
    displayName: 'Operational Readiness Gate (ORR)',
    categoryId: 'core',
    description: 'Validates observability, alerting thresholds, runbooks, and disaster recovery procedures before deployment.',
    tags: ['core', 'orr', 'observability', 'runbooks', 'deployment'],
    transform: createStandardSkillTransform(
      'protocol',
      'Шлюз Операционной Готовности (Operational Readiness Review)',
      'Operational Readiness Review (ORR) Gate',
      [
        '- **Метрики и логирование**: Специфицировать структурированные метрики (RED / USE), трейсинг (OpenTelemetry) и формат логов для нового функционала.',
        '- **Алерты и пороги срабатывания**: Задать точные триггеры для дежурного инженера с минимальным уровнем ложных срабатываний.',
        '- **Эксплуатационный регламент (Runbook)**: Подготовить пошаговую инструкцию по устранению типовых сбоев и процедуре экстренного отката.',
      ],
      [
        '- **Observability Instrumentation**: Mandate structured telemetry (RED/USE metrics, OpenTelemetry spans, audit logs) for all new pathways.',
        '- **Actionable Alerting Thresholds**: Specify high-signal alert rules with unambiguous triggers, runbook links, and zero alert fatigue.',
        '- **Disaster Runbook Protocol**: Provide an actionable runbook detailing emergency triage, kill-switches, and automated rollback workflows.',
      ]
    ),
  },

  'problem-statement-reframing': {
    id: 'problem-statement-reframing',
    name: 'ProblemStatementReframingSkill',
    displayName: 'Problem Statement Root Reframing',
    categoryId: 'core',
    description: 'Validates that the provided directive solves the actual fundamental business or engineering root cause rather than a symptom.',
    tags: ['core', 'reframing', 'root-cause', 'problem-definition', 'clarity'],
    transform: createStandardSkillTransform(
      'protocol',
      'Переформулирование и Поиск Первопричины Проблемы',
      'Problem Statement Reframing & Root Cause Validation',
      [
        '- **Анализ симптома против причины**: Проверить, не является ли поставленная задача попыткой замаскировать более глубокую системную проблему.',
        '- **Пять Почему (5 Whys)**: Углубиться в контекст запроса, чтобы убедиться в целесообразности выбранного вектора решения.',
        '- **Уточненная формулировка**: Предложить уточненную постановку проблемы, если изначальная ведет к неэффективным тратам ресурсов.',
      ],
      [
        '- **Symptom vs Root Cause Audit**: Verify whether the requested task addresses a fundamental disease or merely a superficial symptom.',
        '- **5-Whys Diagnostic**: Trace the operational origin of the friction to confirm that engineering investment is directed at the true bottleneck.',
        '- **Reframed Problem Proposition**: Formulate an upgraded problem statement if the original query leads to fragile or misdirected solutions.',
      ]
    ),
  },

  'context-budget-optimization': {
    id: 'context-budget-optimization',
    name: 'ContextBudgetOptimizationSkill',
    displayName: 'Context Window & Attention Budgeting',
    categoryId: 'core',
    description: 'Compresses context, removes redundant tokens, and focuses model attention on critical decision surfaces.',
    tags: ['core', 'context-window', 'compression', 'tokens', 'attention'],
    transform: createStandardSkillTransform(
      'constraints',
      'Оптимизация Контекста и Бюджета Внимания',
      'Context Window & Attention Optimization',
      [
        '- **Информационная компрессия**: Сжать избыточные описания до компактных спецификаций без потери ключевых ограничений.',
        '- **Фокусировка внимания**: Разместить критические инструкции и инварианты в зонах наивысшего внимания (начало и конец промпта).',
        '- **Исключение дублирования**: Удалить повторяющиеся формулировки и перекрестные дубли между разделами.',
      ],
      [
        '- **Token Compression**: Condense descriptive text into terse, schema-driven declarations without discarding technical invariants.',
        '- **Attention Primacy & Recency**: Position non-negotiable constraints at the structural poles (beginning and conclusion) to maximize adherence.',
        '- **Redundancy Elimination**: Purge duplicated directives and overlapping rules across sections to conserve cognitive budget.',
      ]
    ),
  },

  'system-boundary-demarcation': {
    id: 'system-boundary-demarcation',
    name: 'SystemBoundaryDemarcationSkill',
    displayName: 'System & Trust Boundary Demarcation',
    categoryId: 'core',
    description: 'Maps security zones, trust perimeters, process isolation, and data classification boundaries.',
    tags: ['core', 'boundaries', 'trust-zones', 'security', 'isolation'],
    transform: createStandardSkillTransform(
      'context',
      'Демаркация Границ Системы и Зон Доверия',
      'System & Trust Boundary Demarcation Protocol',
      [
        '- **Карта зон доверия**: Четко разграничить недоверенную внешнюю среду (публичный интернет, пользовательский ввод) и доверенный внутренний периметр.',
        '- **Точки валидации (Sanitization Gates)**: Определить обязательные барьеры валидации данных на каждом пересечении границы.',
        '- **Модель изоляции**: Указать механизмы изоляции процессов, сетевых сегментов и криптографических ключей.',
      ],
      [
        '- **Trust Perimeter Mapping**: Demarcate untrusted ingress boundaries (public web, client payloads) from hardened internal processing zones.',
        '- **Ingress Validation Gateways**: Establish strict schema validation, sanitization, and authorization barriers at every boundary crossover.',
        '- **Isolation Primitives**: Explicitly define network sandboxing, process privilege levels, and compartmentalization boundaries.',
      ]
    ),
  },

  "falsifiability-criterion-enforcer": {
    id: "falsifiability-criterion-enforcer",
    name: "FalsifiabilityCriterionEnforcerSkill",
    displayName: "Popperian Falsifiability Criterion",
    categoryId: "core",
    description: "Requires all claims, hypotheses, and assertions to declare concrete conditions under which they would be proven false.",
    tags: ["core","epistemology","falsifiability","scientific-method","logic"],
    transform: createStandardSkillTransform({
      sectionName: "Falsifiability & Refutation Protocol",
      ruSectionName: "Протокол фальсифицируемости по Попперу",
      instructions: [
        "Demand that every substantive factual or causal assertion be accompanied by at least one observable condition that would refute it.",
        "Explicitly reject unfalsifiable tautologies, vague truisms, and self-sealing arguments.",
        "Delineate what empirical data or systemic state would constitute decisive disproof of the proposed thesis.",
      ],
      ruInstructions: [
        "Требуйте, чтобы каждое утверждение о фактах или причинности сопровождалось критерием его опровержения.",
        "Категорически отсекайте тавтологии, размытые общие фразы и нефальсифицируемые формулировки.",
        "Четко формулируйте, какие наблюдаемые данные или сбои станут однозначным опровержением гипотезы.",
      ],
      semanticType: "constraints",
      tags: ["core","epistemology","falsifiability","scientific-method","logic"],
    }),
  },

  "pareto-principle-8020-isolation": {
    id: "pareto-principle-8020-isolation",
    name: "ParetoPrinciple8020IsolationSkill",
    displayName: "Pareto Principle (80/20) Root Lever Isolation",
    categoryId: "core",
    description: "Identifies the critical 20% of inputs, variables, or bottlenecks generating 80% of systemic outcomes or friction.",
    tags: ["core","pareto","prioritization","efficiency","leverage"],
    transform: createStandardSkillTransform({
      sectionName: "Pareto 80/20 Leverage Architecture",
      ruSectionName: "Выделение ключевого рычага по принципу Парето (80/20)",
      instructions: [
        "Rank all variables by impact magnitude and isolate the top quintile (20%) yielding the vast majority of business/technical value.",
        "Deprioritize marginal optimizations that consume excessive engineering or cognitive overhead with sub-5% upside.",
        "Provide an explicit sensitivity table demonstrating outcome elasticity relative to the isolated high-leverage factors.",
      ],
      ruInstructions: [
        "Ранжируйте переменные по силе влияния и выделите верхние 20%, дающие подавляющий результат.",
        "Отсекайте вторичные оптимизации, требующие несоразмерных затрат при потенциале прироста менее 5%.",
        "Формируйте матрицу чувствительности системы к ключевым факторам максимального рычага.",
      ],
      semanticType: "process_directive",
      tags: ["core","pareto","prioritization","efficiency","leverage"],
    }),
  },

  "first-order-vs-second-order-effects": {
    id: "first-order-vs-second-order-effects",
    name: "FirstOrderVsSecondOrderEffectsSkill",
    displayName: "Second-Order & Higher-Order Consequences Mapping",
    categoryId: "core",
    description: "Maps second-, third-, and nth-order systemic ramifications, perverse incentives, and unintended ripple effects of any decision.",
    tags: ["core","systems-thinking","second-order-effects","unintended-consequences"],
    transform: createStandardSkillTransform({
      sectionName: "Higher-Order Effects & Feedback Loops",
      ruSectionName: "Картирование последствий второго и высших порядков",
      instructions: [
        "Differentiate between immediate first-order gains and downstream secondary/tertiary systemic distortions.",
        "Map feedback loops: identify whether corrective actions introduce reinforcing cycles, compensatory dampening, or perverse incentives (Cobra effect).",
        "Quantify the temporal delay between initial execution and the manifestation of second-order debt or benefits.",
      ],
      ruInstructions: [
        "Четко разделяйте сиюминутный выигрыш первого порядка и отложенные системные искажения второго и третьего порядков.",
        "Анализируйте петли обратной связи и эффект кобры: не стимулирует ли решение нежелательное поведение участников системы.",
        "Оценивайте временной лаг между внедрением изменения и проявлением побочных эффектов.",
      ],
      semanticType: "process_directive",
      tags: ["core","systems-thinking","second-order-effects","unintended-consequences"],
    }),
  },

  "inversion-thinking-jacobi": {
    id: "inversion-thinking-jacobi",
    name: "InversionThinkingJacobiSkill",
    displayName: "Inversion Principle (Jacobi: \"Invert, Always Invert\")",
    categoryId: "core",
    description: "Solves complex problems by determining how to achieve guaranteed failure and systematically eradicating those failure paths.",
    tags: ["core","inversion","mental-models","risk-eradication","problem-solving"],
    transform: createStandardSkillTransform({
      sectionName: "Inversion & Failure Eradication Protocol",
      ruSectionName: "Принцип инверсии мышления (Инвертируй, всегда инвертируй)",
      instructions: [
        "Begin by formulating the exact inverted objective: \"How could we reliably guarantee complete, catastrophic project failure?\"",
        "Catalog every discrete vulnerability, friction point, and complacency trap identified through this inverted perspective.",
        "Convert each fatal vulnerability into an uncompromising preventive safeguard in the primary execution plan.",
      ],
      ruInstructions: [
        "Сформулируйте инвертированную задачу: «Какими действиями мы гарантированно приведем проект к полному краху?».",
        "Составьте исчерпывающий перечень точек фатального отказа, выявленных этим обратным анализом.",
        "Преобразуйте каждую точку отказа в обязательный защитный барьер основного плана реализации.",
      ],
      semanticType: "process_directive",
      tags: ["core","inversion","mental-models","risk-eradication","problem-solving"],
    }),
  },

  "chesterton-fence-precondition-check": {
    id: "chesterton-fence-precondition-check",
    name: "ChestertonFencePreconditionCheckSkill",
    displayName: "Chesterton's Fence Precondition Protocol",
    categoryId: "core",
    description: "Forbids removing, refactoring, or deprecating any existing rule, code block, or process until the original rationale is fully reconstructed.",
    tags: ["core","chesterton-fence","refactoring","legacy-systems","due-diligence"],
    transform: createStandardSkillTransform({
      sectionName: "Chesterton's Fence Historical Rationale Audit",
      ruSectionName: "Протокол забора Честертона (исторический аудит)",
      instructions: [
        "Prohibit deleting or altering legacy architectures, configurations, or organizational rules without documenting why they were originally created.",
        "Reconstruct the historical context, constraints, and past failures that motivated the current seemingly suboptimal mechanism.",
        "Demonstrate conclusively that the original motivating hazard no longer exists or is superseded by a strictly superior mitigation.",
      ],
      ruInstructions: [
        "Запрещайте удаление или переписывание legacy-кода и правил до тех пор, пока не выяснена истинная причина их появления.",
        "Восстановите исторический контекст, внешние ограничения и инциденты, приведшие к созданию текущей конструкции.",
        "Докажите документально, что первоначальная угроза устранена или надежно нейтрализована новым механизмом.",
      ],
      semanticType: "constraints",
      tags: ["core","chesterton-fence","refactoring","legacy-systems","due-diligence"],
    }),
  },

  "steelmanning-strongest-opposing-case": {
    id: "steelmanning-strongest-opposing-case",
    name: "SteelmanningStrongestOpposingCaseSkill",
    displayName: "Steelmanning Opposing Perspectives",
    categoryId: "core",
    description: "Reconstructs rival perspectives in their strongest, most compelling, and charity-calibrated form before offering counter-arguments.",
    tags: ["core","steelmanning","intellectual-honesty","argumentation","debate"],
    transform: createStandardSkillTransform({
      sectionName: "Steelmanning & Intellectual Charity Architecture",
      ruSectionName: "Стилменнинг: усиление противоположной позиции",
      instructions: [
        "Articulate the opposing argument so convincingly that its proponents would agree: \"Yes, that captures our view better than we did.\"",
        "Grant all valid empirical points and shared premises before identifying precise divergences in axioms, trade-off values, or data.",
        "Eliminate strawman arguments, rhetorical mockery, and caricatured oversimplifications.",
      ],
      ruInstructions: [
        "Сформулируйте аргументы оппонента в предельно сильной форме, вызывающей согласие авторов позиции.",
        "Признайте справедливые факты и общие предпосылки до перехода к обоснованию расхождений.",
        "Полностью исключите подмену тезиса (strawman), сарказм и примитивизацию конкурирующей точки зрения.",
      ],
      semanticType: "process_directive",
      tags: ["core","steelmanning","intellectual-honesty","argumentation","debate"],
    }),
  },

  "occams-razor-parsimony-pruning": {
    id: "occams-razor-parsimony-pruning",
    name: "OccamsRazorParsimonyPruningSkill",
    displayName: "Occam's Razor Parsimonious Pruning",
    categoryId: "core",
    description: "Systematically prunes unnecessary entities, auxiliary assumptions, and speculative mechanisms, favoring the simplest sufficient explanation.",
    tags: ["core","occams-razor","simplicity","parsimony","epistemology"],
    transform: createStandardSkillTransform({
      sectionName: "Occam's Razor Parsimony Audit",
      ruSectionName: "Бритва Оккама: сокращение избыточных сущностей",
      instructions: [
        "Strip away redundant intermediate layers, speculative dependencies, and auxiliary assumptions that do not increase predictive accuracy.",
        "Select the simplest architectural or explanatory model that fully accounts for all verified observations.",
        "Demand extraordinary justification before introducing novel abstractions, unproven libraries, or convoluted protocols.",
      ],
      ruInstructions: [
        "Устраняйте лишние промежуточные слои, избыточные допущения и абстракции, не влияющие на результат.",
        "Выбирайте простейшую архитектурную модель из всех, полностью объясняющих факты и требования.",
        "Требуйте веских доказательств перед внедрением новых сущностей, концепций и непроверенных зависимостей.",
      ],
      semanticType: "constraints",
      tags: ["core","occams-razor","simplicity","parsimony","epistemology"],
    }),
  },

  "hanlon-razor-benevolent-attribution": {
    id: "hanlon-razor-benevolent-attribution",
    name: "HanlonRazorBenevolentAttributionSkill",
    displayName: "Hanlon's Razor Attribution Filter",
    categoryId: "core",
    description: "Never attributes to malice or conspiracy that which is adequately explained by operational friction, cognitive bias, or misalignment.",
    tags: ["core","hanlon-razor","root-cause","attribution","blameless"],
    transform: createStandardSkillTransform({
      sectionName: "Hanlon's Razor Attribution Filter",
      ruSectionName: "Бритва Хэнлона: фильтр атрибуции сбоев",
      instructions: [
        "Analyze systemic breakdown assuming informational asymmetries, confusing UX, or misaligned incentives rather than bad faith or incompetence.",
        "Examine whether ambiguous requirements or fragmented documentation naturally created the failure pathway.",
        "Focus root-cause remedies on architectural guardrails, clearer contracts, and deterministic constraints rather than punitive admonitions.",
      ],
      ruInstructions: [
        "Анализируйте сбои через призму информационных пробелов, запутанного UX и несогласованных стимулов, а не злого умысла.",
        "Выявляйте, как размытые требования или противоречивые регламенты закономерно привели к ошибке исполнителя.",
        "Направляйте решения на системные ограничения и архитектурные барьеры вместо поиска и наказания виновных.",
      ],
      semanticType: "behavior_directive",
      tags: ["core","hanlon-razor","root-cause","attribution","blameless"],
    }),
  },

  "circle-of-competence-boundary-lock": {
    id: "circle-of-competence-boundary-lock",
    name: "CircleOfCompetenceBoundaryLockSkill",
    displayName: "Circle of Competence Explicit Perimeter",
    categoryId: "core",
    description: "Strictly distinguishes areas of proven mastery from adjacent speculative domains, refusing to overconfidently guess beyond boundaries.",
    tags: ["core","competence","epistemic-humility","boundaries","expertise"],
    transform: createStandardSkillTransform({
      sectionName: "Circle of Competence Boundary Enforcement",
      ruSectionName: "Очерчивание границ круга компетентности",
      instructions: [
        "Explicitly demarcate what is known with high deterministic confidence versus what represents heuristic estimation or speculation.",
        "State \"I do not know\" or flag high variance when queried on domains outside verified baseline competencies.",
        "Prescribe empirical validation steps and expert consultation pathways rather than hallucinating plausible answers.",
      ],
      ruInstructions: [
        "Четко разделяйте доказанные факты высокой уверенности и предположительные эвристические оценки.",
        "Прямо заявляйте о границах знаний и высокой неопределенности при выходе за пределы подтвержденной базы.",
        "Предлагайте конкретный протокол верификации и привлечения профильных экспертов вместо генерации догадок.",
      ],
      semanticType: "constraints",
      tags: ["core","competence","epistemic-humility","boundaries","expertise"],
    }),
  },

  "asymmetric-risk-convexity-maximizer": {
    id: "asymmetric-risk-convexity-maximizer",
    name: "AsymmetricRiskConvexityMaximizerSkill",
    displayName: "Convexity & Asymmetric Risk/Reward Positioning",
    categoryId: "core",
    description: "Maximizes upside convexity (unbounded gain with bounded loss) while aggressively eliminating fatal ruin exposure (concavity).",
    tags: ["core","asymmetry","risk-management","convexity","antifragility"],
    transform: createStandardSkillTransform({
      sectionName: "Convex Risk Positioning Architecture",
      ruSectionName: "Позиционирование с положительной асимметрией (Convexity)",
      instructions: [
        "Structure solutions so downside risk is strictly capped (bounded financial/temporal loss) while potential upside remains open-ended.",
        "Strictly avoid concavity: reject options offering small steady gains that carry hidden tail risks of total ruin or catastrophic outage.",
        "Apply Taleb's barbell strategy: combine hyper-conservative core resilience with small exploratory high-convexity experiments.",
      ],
      ruInstructions: [
        "Формируйте решения с жестко ограниченным риском убытков и неограниченным потенциалом выигрыша.",
        "Исключайте вогнутые риски: отвергайте варианты с малой выгодой, несущие скрытую угрозу полного краха системы.",
        "Применяйте стратегию штанги: сверхнадежное консервативное ядро плюс серия дешевых экспериментов с высоким потенциалом.",
      ],
      semanticType: "process_directive",
      tags: ["core","asymmetry","risk-management","convexity","antifragility"],
    }),
  },

  "opportunity-cost-counterfactual-auditor": {
    id: "opportunity-cost-counterfactual-auditor",
    name: "OpportunityCostCounterfactualAuditorSkill",
    displayName: "Opportunity Cost & Counterfactual Capital Allocation",
    categoryId: "core",
    description: "Evaluates decisions against the best forgone alternative, quantifying trade-offs in engineering bandwidth, latency, and capital.",
    tags: ["core","opportunity-cost","counterfactual","economics","resource-allocation"],
    transform: createStandardSkillTransform({
      sectionName: "Opportunity Cost & Counterfactual Evaluation",
      ruSectionName: "Оценка альтернативных издержек (Opportunity Cost)",
      instructions: [
        "Never evaluate an action in isolation; evaluate it against the single best alternative use of the identical resources.",
        "Quantify what critical projects, features, or architectural debts are delayed by choosing this path.",
        "Calculate the counterfactual baseline: what would naturally happen if zero intervention or code were deployed?",
      ],
      ruInstructions: [
        "Никогда не оценивайте инициативу изолированно: сравнивайте ее с лучшим альтернативным использованием тех же ресурсов.",
        "Количественно фиксируйте, какие задачи и устранение какого техдолга откладываются при выборе этого решения.",
        "Оценивайте контрфактический сценарий: что произойдет естественным образом при полном отсутствии вмешательства.",
      ],
      semanticType: "process_directive",
      tags: ["core","opportunity-cost","counterfactual","economics","resource-allocation"],
    }),
  },

  "skin-in-the-game-incentive-alignment": {
    id: "skin-in-the-game-incentive-alignment",
    name: "SkinInTheGameIncentiveAlignmentSkill",
    displayName: "Skin-in-the-Game & Moral Hazard Elimination",
    categoryId: "core",
    description: "Ensures decision-makers bear personal or operational exposure to the consequences of their architectural and strategic choices.",
    tags: ["core","skin-in-the-game","incentives","moral-hazard","accountability"],
    transform: createStandardSkillTransform({
      sectionName: "Skin-in-the-Game & Incentive Integrity",
      ruSectionName: "Принцип ответственности (Skin in the Game) и исключение moral hazard",
      instructions: [
        "Eliminate moral hazards where architects or planners reap rewards while externalizing operational failures to on-call engineers or users.",
        "Mandate that authors of complex system proposals participate directly in production support, telemetry triage, and incident remediation.",
        "Align organizational incentives so that systemic simplicity and resilience are rewarded more than resume-driven complexity.",
      ],
      ruInstructions: [
        "Устраняйте ситуации moral hazard, когда инициатор получает выгоду, а риски и сбои перекладываются на дежурных инженеров.",
        "Обязывайте авторов сложных архитектурных изменений лично участвовать в поддержке, дежурствах и разборах аварий.",
        "Выстраивайте стимулы так, чтобы надежность и простота поощрялись выше, чем внедрение модных и неоправданно сложных инструментов.",
      ],
      semanticType: "constraints",
      tags: ["core","skin-in-the-game","incentives","moral-hazard","accountability"],
    }),
  },

  "reversibility-one-way-vs-two-way-doors": {
    id: "reversibility-one-way-vs-two-way-doors",
    name: "ReversibilityOneWayVsTwoWayDoorsSkill",
    displayName: "Reversibility Architecture (Type 1 vs Type 2 Decisions)",
    categoryId: "core",
    description: "Classifies choices into irreversible \"one-way doors\" requiring deep deliberation vs reversible \"two-way doors\" demanding rapid execution.",
    tags: ["core","reversibility","bezos-doors","decision-velocity","speed"],
    transform: createStandardSkillTransform({
      sectionName: "Reversibility & Decision Velocity Matrix",
      ruSectionName: "Матрица обратимости решений (One-Way vs Two-Way Doors)",
      instructions: [
        "Classify decisions as Type 1 (irreversible, high blast radius) or Type 2 (easily reversible, low blast radius).",
        "Accelerate Type 2 decisions with high velocity, minimal consensus meetings, and automated rollbacks.",
        "Subject Type 1 decisions (database migrations, major protocol changes, public API commitments) to exhaustive multi-party review.",
      ],
      ruInstructions: [
        "Классифицируйте решения: Type 1 (необратимые, высокий радиус поражения) или Type 2 (легко обратимые, безопасные для экспериментов).",
        "Принимайте решения Type 2 на максимальной скорости с минимальными согласованиями и механизмом быстрого отката.",
        "Решения Type 1 (миграция баз данных, изменение публичных API, выбор лицензий) подвергайте глубокому всестороннему аудиту.",
      ],
      semanticType: "process_directive",
      tags: ["core","reversibility","bezos-doors","decision-velocity","speed"],
    }),
  },

  "antifragility-stress-gain-architecture": {
    id: "antifragility-stress-gain-architecture",
    name: "AntifragilityStressGainArchitectureSkill",
    displayName: "Antifragility (Systemic Gain from Volatility & Stress)",
    categoryId: "core",
    description: "Designs systems that actively grow stronger, more resilient, and more optimized when subjected to randomness and volatility.",
    tags: ["core","antifragility","taleb","resilience","evolutionary-design"],
    transform: createStandardSkillTransform({
      sectionName: "Antifragile Systemic Architecture",
      ruSectionName: "Антихрупкость: извлечение выгоды из стресса и сбоев",
      instructions: [
        "Design architectures with distributed modularity so individual component failures strengthen the overarching system via automated self-tuning.",
        "Incorporate controlled stochastic stressors (chaos testing, fuzzing, rate surges) to continuously trigger adaptive hardening.",
        "Avoid over-optimization to a single static operating point; preserve functional redundancy and dynamic reconfiguration capacity.",
      ],
      ruInstructions: [
        "Проектируйте модульную архитектуру, где локальные сбои компонентов приводят к адаптивному самообучению всей системы.",
        "Внедряйте контролируемые стресс-нагрузки (chaos engineering, фаззинг, пиковые всплески) для постоянной закалки сервисов.",
        "Избегайте чрезмерной подгонки под одну статическую точку: сохраняйте функциональный запас и гибкость переконфигурации.",
      ],
      semanticType: "structural_directive",
      tags: ["core","antifragility","taleb","resilience","evolutionary-design"],
    }),
  },

  "goodharts-law-metric-corruption-guard": {
    id: "goodharts-law-metric-corruption-guard",
    name: "GoodhartsLawMetricCorruptionGuardSkill",
    displayName: "Goodhart's Law & Proxy Metric Gaming Defense",
    categoryId: "core",
    description: "Guards against metric corruption (\"When a measure becomes a target, it ceases to be a good measure\") via paired counter-metrics.",
    tags: ["core","goodharts-law","metrics","gaming-prevention","kpi"],
    transform: createStandardSkillTransform({
      sectionName: "Goodhart's Law & Metric Integrity Protocol",
      ruSectionName: "Защита от закона Гудхарта: спаренные балансирующие метрики",
      instructions: [
        "Whenever an optimization metric is declared (e.g. speed, ticket throughput, code coverage), identify how it will naturally be gamed.",
        "Pair every primary metric with a counter-balancing quality metric (e.g. throughput paired with defect escape rate, velocity paired with technical debt ratio).",
        "Prohibit single-metric evaluation gates; enforce composite multidimensional health scorecards.",
      ],
      ruInstructions: [
        "При введении любой целевой метрики (скорость, число закрытых тикетов) заранее опишите пути манипуляции ею.",
        "Связывайте каждую количественную метрику с парной качественной (скорость разработки с процентом регрессий, покрытие тестами с надежностью).",
        "Запрещайте принятие решений по единственному показателю; используйте многомерные балансирующие карты здоровья системы.",
      ],
      semanticType: "guardrail_directive",
      tags: ["core","goodharts-law","metrics","gaming-prevention","kpi"],
    }),
  },

  "diminishing-returns-marginal-cutoff": {
    id: "diminishing-returns-marginal-cutoff",
    name: "DiminishingReturnsMarginalCutoffSkill",
    displayName: "Law of Diminishing Marginal Returns Cutoff",
    categoryId: "core",
    description: "Establishes clear mathematical stopping thresholds where incremental effort yields negligible or negative marginal benefit.",
    tags: ["core","diminishing-returns","stopping-rules","efficiency","pragmatism"],
    transform: createStandardSkillTransform({
      sectionName: "Diminishing Marginal Returns Stopping Boundary",
      ruSectionName: "Граница убывающей отдачи и правило остановки",
      instructions: [
        "Graph the marginal utility curve of additional iterations, refactorings, or precision expansions.",
        "Establish an explicit stopping condition when marginal cost exceeds marginal gain (e.g. moving from 99.9% to 99.99% reliability for an internal tool).",
        "Declare \"good enough for production\" criteria that release engineering bandwidth for unaddressed bottlenecks.",
      ],
      ruInstructions: [
        "Оценивайте кривую предельной полезности от дополнительных доработок, микро-оптимизаций и правок.",
        "Вводите жесткое правило остановки, когда затраты на следующий шаг превышают практическую пользу.",
        "Фиксируйте четкие критерии достаточности для релиза, высвобождая ресурсы для решения ключевых нерешенных задач.",
      ],
      semanticType: "process_directive",
      tags: ["core","diminishing-returns","stopping-rules","efficiency","pragmatism"],
    }),
  },

  "survivorship-bias-complete-corpus-audit": {
    id: "survivorship-bias-complete-corpus-audit",
    name: "SurvivorshipBiasCompleteCorpusAuditSkill",
    displayName: "Survivorship Bias Counter-Analysis",
    categoryId: "core",
    description: "Audits case studies and best-practice retrospectives by actively unearthing the invisible cemetery of failed and vanished counterparts.",
    tags: ["core","survivorship-bias","cognitive-biases","benchmarking","evidence"],
    transform: createStandardSkillTransform({
      sectionName: "Survivorship Bias Correction Protocol",
      ruSectionName: "Аудит систематической ошибки выжившего (Survivorship Bias)",
      instructions: [
        "Do not analyze success stories in isolation; actively investigate failed companies, deprecated frameworks, and abandoned initiatives that used the exact same tactics.",
        "Identify attributes common to both survivors and casualties to eliminate false causal correlations.",
        "Reconstruct the invisible denominator (total initial population) to compute true base-rate success probabilities.",
      ],
      ruInstructions: [
        "Не анализируйте кейсы победителей в отрыве от контекста: исследуйте закрывшиеся проекты, использовавшие те же самые практики.",
        "Выявляйте общие признаки у выживших и погибших систем, исключая ложные причинно-следственные связи.",
        "Восстанавливайте полный объем начальной выборки для расчета реальной базовой вероятности успеха.",
      ],
      semanticType: "process_directive",
      tags: ["core","survivorship-bias","cognitive-biases","benchmarking","evidence"],
    }),
  },

  "base-rate-neglect-prior-calibration": {
    id: "base-rate-neglect-prior-calibration",
    name: "BaseRateNeglectPriorCalibrationSkill",
    displayName: "Base Rate Integration & Prior Probability Calibration",
    categoryId: "core",
    description: "Anchors risk assessments and projections in empirical historical base rates before evaluating individual case specifics.",
    tags: ["core","base-rate","bayesian","probability","calibration"],
    transform: createStandardSkillTransform({
      sectionName: "Base Rate & Prior Probability Calibration",
      ruSectionName: "Учет базовой частоты (Base Rate) и априорная калибровка",
      instructions: [
        "Establish the industry or historical base rate for the class of problem before evaluating unique features of the current project.",
        "Heavily discount optimistic narrative claims that deviate radically from documented reference class outcomes.",
        "Apply formal Bayesian updating: require overwhelming empirical proof before shifting posterior confidence far from base rate reality.",
      ],
      ruInstructions: [
        "Определяйте историческую базовую вероятность для данного класса задач до рассмотрения уникальных деталей проекта.",
        "Критически снижайте оптимистичные прогнозы, кардинально расходящиеся со статистикой эталонного класса (reference class).",
        "Используйте байесовское обновление: требуйте веских доказательств для смещения оценки далеко от объективной базовой частоты.",
      ],
      semanticType: "process_directive",
      tags: ["core","base-rate","bayesian","probability","calibration"],
    }),
  },

  "parkinsons-law-compression-timeboxing": {
    id: "parkinsons-law-compression-timeboxing",
    name: "ParkinsonsLawCompressionTimeboxingSkill",
    displayName: "Parkinson's Law Scope Compression & Aggressive Timeboxing",
    categoryId: "core",
    description: "Combats work expansion by enforcing aggressive temporal constraints and strictly timeboxed execution windows.",
    tags: ["core","parkinsons-law","timeboxing","velocity","scope-management"],
    transform: createStandardSkillTransform({
      sectionName: "Scope Compression & Timeboxing Architecture",
      ruSectionName: "Закон Паркинсона: агрессивный таймбоксинг и сжатие скоупа",
      instructions: [
        "Compress allotted timeframes by 30-50% to force ruthless prioritization and eliminate non-essential bikeshedding.",
        "Establish hard timeboxes with non-negotiable end times; scope is variable, but delivery deadline is fixed.",
        "Mandate working increment demonstration at each timebox boundary regardless of feature completeness.",
      ],
      ruInstructions: [
        "Сжимайте сроки выполнения на 30–50% для запуска вынужденного отсечения второстепенного и устранения затягивания.",
        "Вводите жесткие таймбоксы: дедлайн неизменен, варьироваться может только объем включаемых опций.",
        "Требуйте демонстрации работающего прототипа по завершении каждого таймбокса вне зависимости от полноты функционала.",
      ],
      semanticType: "process_directive",
      tags: ["core","parkinsons-law","timeboxing","velocity","scope-management"],
    }),
  },

  "confirmation-bias-falsifying-search": {
    id: "confirmation-bias-falsifying-search",
    name: "ConfirmationBiasFalsifyingSearchSkill",
    displayName: "Confirmation Bias Red-Teaming & Disconfirming Search",
    categoryId: "core",
    description: "Actively searches for facts, data points, and edge cases that refute preferred beliefs rather than accumulating confirming evidence.",
    tags: ["core","confirmation-bias","red-teaming","disconfirmation","objectivity"],
    transform: createStandardSkillTransform({
      sectionName: "Active Disconfirming Evidence Search",
      ruSectionName: "Поиск опровергающих свидетельств (борьба с confirmation bias)",
      instructions: [
        "Formulate explicit search queries specifically engineered to discover counter-arguments, failure reports, and security disclosures.",
        "Log disconfirming data points with equal or greater visibility than confirming evidence in technical trade-off documents.",
        "Assign an active devil's advocate role to stress-test the favored proposal before architectural consensus is declared.",
      ],
      ruInstructions: [
        "Формулируйте поисковые запросы, нацеленные на поиск отчетов об авариях, недостатков и уязвимостей выбранного подхода.",
        "Фиксируйте опровергающие факты с тем же приоритетом, что и подтверждающие, в сводных таблицах решений.",
        "Назначайте рецензента с явной ролью поиска слабых мест перед утверждением любого ключевого архитектурного выбора.",
      ],
      semanticType: "process_directive",
      tags: ["core","confirmation-bias","red-teaming","disconfirmation","objectivity"],
    }),
  },

  "sunk-cost-fallacy-zero-base-reset": {
    id: "sunk-cost-fallacy-zero-base-reset",
    name: "SunkCostFallacyZeroBaseResetSkill",
    displayName: "Sunk Cost Eradication & Zero-Based Evaluation",
    categoryId: "core",
    description: "Ignores historical investments, lines of code, and emotional attachment, evaluating ongoing projects strictly from current state forward.",
    tags: ["core","sunk-cost","zero-based","rationality","pivot"],
    transform: createStandardSkillTransform({
      sectionName: "Zero-Based Decision Reset Protocol",
      ruSectionName: "Ликвидация ловушки невозвратных затрат (Sunk Cost Fallacy)",
      instructions: [
        "Eradicate past time, money, and emotional capital already spent from all future continuation calculations.",
        "Ask the zero-based question: \"If we arrived today with zero prior code and clean cash, would we choose to invest in building this exact roadmap?\"",
        "Recommend project termination or pivot without hesitation when future ROI falls below competitive benchmarks.",
      ],
      ruInstructions: [
        "Полностью исключайте прошлые затраты труда, времени и средств из расчетов целесообразности продолжения проекта.",
        "Задавайте вопрос с чистого листа: «Если бы у нас не было этого кода и мы начинали сегодня, стали бы мы инвестировать в эту идею?».",
        "Без колебаний рекомендуйте закрытие проекта или смену курса, если будущая отдача уступает альтернативам.",
      ],
      semanticType: "process_directive",
      tags: ["core","sunk-cost","zero-based","rationality","pivot"],
    }),
  },

  "anchoring-heuristic-debiasing-protocol": {
    id: "anchoring-heuristic-debiasing-protocol",
    name: "AnchoringHeuristicDebiasingProtocolSkill",
    displayName: "Anchoring Heuristic Debiasing Protocol",
    categoryId: "core",
    description: "Identifies arbitrary initial figures, vendor estimates, or early benchmarks and computes objective ground-up independent valuations.",
    tags: ["core","anchoring","debiasing","estimation","negotiation"],
    transform: createStandardSkillTransform({
      sectionName: "Anchoring Debiasing & Ground-Up Estimation",
      ruSectionName: "Дебиасинг эффекта привязки (Anchoring Heuristic)",
      instructions: [
        "Identify initial numbers, estimates, or deadlines proposed early in conversations and isolate their potential biasing distortion.",
        "Derive completely independent bottom-up estimates using first principles, component breakdowns, and empirical benchmarks.",
        "Present estimates as probabilistic ranges with explicit confidence intervals rather than single anchored points.",
      ],
      ruInstructions: [
        "Выявляйте первоначально названные цифры, сроки или оценки бюджета и изолируйте их искажающее влияние.",
        "Рассчитывайте независимую оценку снизу вверх на основе калькуляции трудозатрат, компонентов и рыночных бенчмарков.",
        "Представляйте результаты в виде вероятностного диапазона с указанием доверительного интервала вместо точечной цифры.",
      ],
      semanticType: "process_directive",
      tags: ["core","anchoring","debiasing","estimation","negotiation"],
    }),
  },

  "hyperbolic-discounting-long-term-anchor": {
    id: "hyperbolic-discounting-long-term-anchor",
    name: "HyperbolicDiscountingLongTermAnchorSkill",
    displayName: "Hyperbolic Discounting Correction & Long-Term Anchoring",
    categoryId: "core",
    description: "Counteracts human bias toward immediate gratification by systematically protecting high-ROI multi-year strategic architectures.",
    tags: ["core","hyperbolic-discounting","long-term-strategy","technical-debt"],
    transform: createStandardSkillTransform({
      sectionName: "Long-Term Value Preservation Protocol",
      ruSectionName: "Коррекция гиперболического дисконтирования и долгосрочный якорь",
      instructions: [
        "Expose short-term tactical shortcuts that borrow against future engineering velocity and create compounding technical debt.",
        "Quantify the true multi-year cost of ownership of tactical hacks vs clean, extensible foundational architectures.",
        "Establish non-negotiable allocations (e.g. 20% engineering bandwidth) permanently dedicated to platform longevity and tech debt remediation.",
      ],
      ruInstructions: [
        "Вскрывайте сиюминутные костыли, дающие быстрый результат за счет накопления критического технического долга в будущем.",
        "Рассчитывайте реальную многолетнюю стоимость владения временным решением в сравнении с чистой расширяемой архитектурой.",
        "Закрепляйте фиксированную долю ресурсов команды (минимум 20%) на устранение техдолга и поддержание устойчивости платформы.",
      ],
      semanticType: "process_directive",
      tags: ["core","hyperbolic-discounting","long-term-strategy","technical-debt"],
    }),
  },

  "availability-heuristic-cross-check": {
    id: "availability-heuristic-cross-check",
    name: "AvailabilityHeuristicCrossCheckSkill",
    displayName: "Availability Heuristic Empirical Cross-Check",
    categoryId: "core",
    description: "Prevents over-indexing on recent memorable outages or vivid edge-cases by demanding rigorous statistical frequency distributions.",
    tags: ["core","availability-heuristic","incident-management","statistics"],
    transform: createStandardSkillTransform({
      sectionName: "Empirical Frequency vs Vividness Audit",
      ruSectionName: "Проверка эвристики доступности по статистическим данным",
      instructions: [
        "Detect when architectural decisions are disproportionately driven by a recent dramatic outage rather than objective probability distributions.",
        "Extract longitudinal frequency logs to verify whether the feared failure mode is genuinely common or an ultra-rare outlier.",
        "Calibrate defensive engineering investments proportionally to calculated Expected Annual Loss (EAL).",
      ],
      ruInstructions: [
        "Отслеживайте ситуации, когда архитектура перегружается защитой от недавнего яркого сбоя вопреки общей статистике.",
        "Поднимайте исторические логи инцидентов для проверки реальной частоты пугающего сценария отказа.",
        "Калибруйте инженерные затраты на защиту пропорционально расчетному математическому ожиданию потерь.",
      ],
      semanticType: "process_directive",
      tags: ["core","availability-heuristic","incident-management","statistics"],
    }),
  },

  "fundamental-attribution-error-shield": {
    id: "fundamental-attribution-error-shield",
    name: "FundamentalAttributionErrorShieldSkill",
    displayName: "Fundamental Attribution Error Blameless Shield",
    categoryId: "core",
    description: "Enforces blameless systemic analysis: treats human error as a symptom of flawed tooling and processes, never as the root cause.",
    tags: ["core","blameless","fundamental-attribution-error","incident-review","safety"],
    transform: createStandardSkillTransform({
      sectionName: "Blameless Systemic Causation Protocol",
      ruSectionName: "Исключение фундаментальной ошибки атрибуции (Blameless Systems)",
      instructions: [
        "Strictly prohibit concluding an incident review with \"human error\" or \"operator mistake\" as the root cause.",
        "Investigate environmental affordances: why did the tooling allow a destructive action without confirmation or guardrail safeguards?",
        "Engineer systemic mechanisms (e.g. read-only production defaults, dual-control approvals) that render human mistakes structurally impossible.",
      ],
      ruInstructions: [
        "Категорически запрещайте завершать разбор инцидента выводом о «человеческом факторе» или ошибке оператора.",
        "Исследуйте окружение: почему интерфейс и CLI позволили совершить разрушительное действие без защиты от ошибки?",
        "Внедряйте системные барьеры (двойное подтверждение, защищенные права, автоматический откат), делающие ошибку невозможной.",
      ],
      semanticType: "behavior_directive",
      tags: ["core","blameless","fundamental-attribution-error","incident-review","safety"],
    }),
  },

  "status-quo-bias-disruption-challenge": {
    id: "status-quo-bias-disruption-challenge",
    name: "StatusQuoBiasDisruptionChallengeSkill",
    displayName: "Status Quo Bias Active Disruption Challenge",
    categoryId: "core",
    description: "Constructively challenges legacy defaults and inertia by treating the status quo with the same rigorous skepticism as new proposals.",
    tags: ["core","status-quo-bias","innovation","questioning-defaults","architecture"],
    transform: createStandardSkillTransform({
      sectionName: "Status Quo Justification & Disruption Protocol",
      ruSectionName: "Преодоление предвзятости статус-кво (Status Quo Bias)",
      instructions: [
        "Do not give existing processes or architectures automatic benefit of the doubt; subject incumbent designs to active justification hurdles.",
        "Examine what historical assumptions have quietly expired due to advances in cloud infrastructure, compilers, or market dynamics.",
        "Formulate a greenfield challenge: \"How would we design this subsystem today if we had zero legacy baggage?\"",
      ],
      ruInstructions: [
        "Не давайте существующим процессам автоматического карт-бланша: требуйте регулярного обоснования их эффективности.",
        "Выявляйте устаревшие предпосылки, утратившие силу благодаря развитию инструментов, языков и инфраструктуры.",
        "Формулируйте задачу с чистого листа: «Как бы мы спроектировали эту подсистему сегодня без оглядки на старый стек?».",
      ],
      semanticType: "process_directive",
      tags: ["core","status-quo-bias","innovation","questioning-defaults","architecture"],
    }),
  },

  "dunning-kruger-calibration-gate": {
    id: "dunning-kruger-calibration-gate",
    name: "DunningKrugerCalibrationGateSkill",
    displayName: "Dunning-Kruger Competency Calibration Gate",
    categoryId: "core",
    description: "Calibrates architectural confidence: flags unearned certainty in novice domains and surfaces nuanced complexity.",
    tags: ["core","dunning-kruger","calibration","nuance","depth"],
    transform: createStandardSkillTransform({
      sectionName: "Dunning-Kruger Calibration & Nuance Injection",
      ruSectionName: "Калибровка уверенности по кривой Даннинга-Крюгера",
      instructions: [
        "Detect early signs of overconfidence where simple solutions are proposed for deeply wicked, nuanced distributed problems.",
        "Surface hidden edge cases, failure domains, and historical war stories showing why the problem is harder than it appears.",
        "Encourage calibrated humility: replace sweeping dogmatic declarations with nuanced trade-off matrices.",
      ],
      ruInstructions: [
        "Выявляйте необоснованную сверхуверенность, когда для сложных распределенных систем предлагаются тривиальные рецепты.",
        "Вскрывайте скрытые граничные случаи, отказы сети и исторический опыт, объясняющий реальную глубину проблемы.",
        "Заменяйте категоричный догматизм взвешенными матрицами компромиссов с оценкой рисков.",
      ],
      semanticType: "process_directive",
      tags: ["core","dunning-kruger","calibration","nuance","depth"],
    }),
  },

  "framing-effect-reframing-lens": {
    id: "framing-effect-reframing-lens",
    name: "FramingEffectReframingLensSkill",
    displayName: "Multi-Perspective Cognitive Reframing Lens",
    categoryId: "core",
    description: "Exposes how semantic framing distorts perception and analyzes challenges through gain, loss, risk, and operational lenses.",
    tags: ["core","framing","cognitive-bias","perspective","communication"],
    transform: createStandardSkillTransform({
      sectionName: "Cognitive Reframing & Perspective Flipping",
      ruSectionName: "Мультиперспективный рефрейминг проблемы",
      instructions: [
        "Identify whether a challenge is currently framed in terms of gains, losses, fears, or technical jargon.",
        "Reframe the identical proposition through 3 alternative lenses: 1) Risk mitigation, 2) Business revenue enablement, 3) Customer friction reduction.",
        "Evaluate whether stakeholder consensus shifts dramatically when the semantic framing is neutralized.",
      ],
      ruInstructions: [
        "Определяйте, в какой модальности подана проблема: через призму потерь, страха рисков или технического жаргона.",
        "Переформулируйте тезис через 3 альтернативные оптики: снижение рисков, рост выручки и устранение барьеров пользователя.",
        "Проверяйте, сохраняется ли привлекательность решения при смене эмоциональной рамки на нейтральные факты.",
      ],
      semanticType: "process_directive",
      tags: ["core","framing","cognitive-bias","perspective","communication"],
    }),
  },

  "survivability-ruin-barrier-enforcer": {
    id: "survivability-ruin-barrier-enforcer",
    name: "SurvivabilityRuinBarrierEnforcerSkill",
    displayName: "Zero-Ruin Probability Operational Barrier",
    categoryId: "core",
    description: "Enforces that any strategy or deployment carrying even a non-zero probability of existential ruin is strictly disqualified.",
    tags: ["core","ruin-barrier","existential-risk","safety-first","invariants"],
    transform: createStandardSkillTransform({
      sectionName: "Zero-Ruin Probability Enforcement",
      ruSectionName: "Абсолютный барьер риска необратимого краха (Ruin Barrier)",
      instructions: [
        "Disqualify any technical or business proposal that carries a non-zero tail risk of total data loss, insolvency, or regulatory shutdown.",
        "Reject expected value calculations when survival is at stake: infinite upside cannot compensate for a 1% chance of terminal ruin.",
        "Mandate fail-safe airgapped backups, isolated quorum gates, and non-negotiable blast radius limiters.",
      ],
      ruInstructions: [
        "Отклоняйте любые решения, несущие даже малую вероятность полной потери данных, банкротства или отзыва лицензии.",
        "Отвергайте расчеты матожидания при угрозе гибели системы: никакой выигрыш не оправдывает риск катастрофы.",
        "Требуйте изолированных резервных копий, строгих кворумов подтверждения и ограничения радиуса поражения сбоя.",
      ],
      semanticType: "constraints",
      tags: ["core","ruin-barrier","existential-risk","safety-first","invariants"],
    }),
  },

  "conjunction-fallacy-probability-pruning": {
    id: "conjunction-fallacy-probability-pruning",
    name: "ConjunctionFallacyProbabilityPruningSkill",
    displayName: "Conjunction Fallacy Narrative Pruning",
    categoryId: "core",
    description: "Prunes convoluted multi-step narratives that sound intuitively plausible but are mathematically far less probable than simple baselines.",
    tags: ["core","conjunction-fallacy","probability","narrative-trap","logic"],
    transform: createStandardSkillTransform({
      sectionName: "Conjunction Fallacy Probability Pruning",
      ruSectionName: "Предотвращение ошибки конъюнкции (эффект Линды)",
      instructions: [
        "Remember that P(A and B) is strictly less than or equal to P(A); eliminate overly detailed speculative failure storylines.",
        "Flag when team members convince themselves of a failure scenario simply because the vivid narrative sounds cinematic.",
        "Ground system models in base probability components rather than interconnected chain stories.",
      ],
      ruInstructions: [
        "Помните, что вероятность пересечения событий P(A и B) всегда меньше вероятности P(A): отсекайте многосоставные фантазии.",
        "Предостерегайте от веры в сценарий только из-за его кинематографичности и подробной сюжетной детализации.",
        "Опирайтесь на математические вероятности независимых компонентов вместо многозвенных гипотетических цепочек.",
      ],
      semanticType: "process_directive",
      tags: ["core","conjunction-fallacy","probability","narrative-trap","logic"],
    }),
  },

  "survivable-experimentation-sandbox": {
    id: "survivable-experimentation-sandbox",
    name: "SurvivableExperimentationSandboxSkill",
    displayName: "Safe-to-Fail Controlled Experimentation Sandbox",
    categoryId: "core",
    description: "Enables rapid innovation by designing experiments whose failure is cheap, local, silent, and educational.",
    tags: ["core","safe-to-fail","experimentation","innovation","sandboxing"],
    transform: createStandardSkillTransform({
      sectionName: "Safe-to-Fail Experimentation Architecture",
      ruSectionName: "Архитектура безопасных экспериментов (Safe-to-Fail)",
      instructions: [
        "Ensure every exploratory test has an automated blast radius containment boundary (feature flag, ephemeral environment, canary cohort).",
        "Set clear metrics for experimental falsification: define upfront what performance signals will trigger automatic rollback.",
        "Treat negative experimental findings as high-value knowledge discoveries, conducting rapid blameless retrospectives.",
      ],
      ruInstructions: [
        "Ограничивайте любой эксперимент защитным периметром: фиче-флаги, изолированное окружение, канареечный трафик.",
        "Задавайте четкие критерии автоматического отката эксперимента при ухудшении целевых сигналов здоровья системы.",
        "Воспринимайте отрицательный результат как ценное устранение неопределенности, поощряя быструю фиксацию инсайтов.",
      ],
      semanticType: "process_directive",
      tags: ["core","safe-to-fail","experimentation","innovation","sandboxing"],
    }),
  },

  "ergodicity-time-vs-ensemble-audit": {
    id: "ergodicity-time-vs-ensemble-audit",
    name: "ErgodicityTimeVsEnsembleAuditSkill",
    displayName: "Ergodicity Audit (Time-Average vs Ensemble-Average)",
    categoryId: "core",
    description: "Distinguishes between ensemble averages across parallel runs and the time-average experience of a single persistent system.",
    tags: ["core","ergodicity","probability","systems-thinking","risk"],
    transform: createStandardSkillTransform({
      sectionName: "Ergodicity & Time-Average Sustainability",
      ruSectionName: "Аудит эргодичности: среднее по времени vs среднее по ансамблю",
      instructions: [
        "Distinguish between parallel ensemble averages (1,000 systems running once) and time-series averages (1 system running for 1,000 days).",
        "Eliminate paths where an ensemble statistic looks positive but a single absorbing failure state terminates the persistent entity.",
        "Optimize strictly for long-term survival of the continuous entity over cross-sectional benchmark snapshots.",
      ],
      ruInstructions: [
        "Различайте параллельное среднее по ансамблю (1000 систем по 1 дню) и временной ряд одной непрерывно живущей системы.",
        "Исключайте сценарии, где усредненная статистика привлекательна, но для конкретного инстанса есть риск фатального выбывания.",
        "Оптимизируйте архитектуру на долгосрочное непрерывное выживание конкретной системы во времени.",
      ],
      semanticType: "process_directive",
      tags: ["core","ergodicity","probability","systems-thinking","risk"],
    }),
  },

  "cognitive-load-split-attention-guard": {
    id: "cognitive-load-split-attention-guard",
    name: "CognitiveLoadSplitAttentionGuardSkill",
    displayName: "Cognitive Load & Split-Attention Elimination",
    categoryId: "core",
    description: "Optimizes developer ergonomics and prompt readability by eliminating extraneous cognitive friction and split-attention layouts.",
    tags: ["core","cognitive-load","dx","clarity","ergonomics"],
    transform: createStandardSkillTransform({
      sectionName: "Cognitive Load Reduction Architecture",
      ruSectionName: "Снижение когнитивной нагрузки и устранение split-attention",
      instructions: [
        "Place related technical instructions, constraints, and data formats in close physical and conceptual proximity.",
        "Eliminate extraneous cognitive load: replace confusing abbreviations and fragmented cross-references with self-contained directives.",
        "Structure prompts and code with clear visual hierarchies, intuitive signposts, and progressive disclosure.",
      ],
      ruInstructions: [
        "Размещайте связанные инструкции, требования к типам и форматы вывода в непосредственной логической близости.",
        "Устраняйте посторонний шум: заменяйте неочевидные сокращения и перекрестные отсылки самодостаточными формулировками.",
        "Форматируйте материал с четкой визуальной иерархией, выделяя ключевые мысли и структурируя детали.",
      ],
      semanticType: "structural_directive",
      tags: ["core","cognitive-load","dx","clarity","ergonomics"],
    }),
  },

  "metacognitive-calibration-scoring": {
    id: "metacognitive-calibration-scoring",
    name: "MetacognitiveCalibrationScoringSkill",
    displayName: "Metacognitive Confidence Calibration Scoring",
    categoryId: "core",
    description: "Requires the system to append calibrated subjective probability estimates to its assertions and track predictive Brier scores.",
    tags: ["core","metacognition","confidence-calibration","brier-score","probabilities"],
    transform: createStandardSkillTransform({
      sectionName: "Metacognitive Confidence Scoring Specification",
      ruSectionName: "Метакогнитивная калибровка уверенности (Brier Score)",
      instructions: [
        "Append explicit percentage confidence ratings (e.g. [Confidence: 85%]) to high-impact technical recommendations and estimates.",
        "Ensure confidence calibration: when asserting 80% confidence, the underlying statement should be correct approximately 8 out of 10 times.",
        "Provide clear epistemic justifications explaining what evidence bounds confidence below 100%.",
      ],
      ruInstructions: [
        "Сопровождайте ключевые выводы и рекомендации явными процентами уверенности (например, [Уверенность: 85%]).",
        "Соблюдайте калибровку: высказывания с заявленной уверенностью 80% должны оказываться верными в 8 случаях из 10.",
        "Обосновывайте оценку: приводите аргументы, почему уверенность не является абсолютной (что остается неизвестным).",
      ],
      semanticType: "output_format",
      tags: ["core","metacognition","confidence-calibration","brier-score","probabilities"],
    }),
  },

  "triangulation-independent-sources": {
    id: "triangulation-independent-sources",
    name: "TriangulationIndependentSourcesSkill",
    displayName: "Multi-Source Independent Triangulation",
    categoryId: "core",
    description: "Requires factual verification through at least three orthogonal, structurally independent evidence streams.",
    tags: ["core","triangulation","verification","epistemology","evidence"],
    transform: createStandardSkillTransform({
      sectionName: "Orthogonal Evidence Triangulation Protocol",
      ruSectionName: "Триангуляция данных по независимым источникам",
      instructions: [
        "Never accept a single source as definitive proof; require verification across at least 3 structurally independent data streams.",
        "Verify that cited sources are genuinely orthogonal rather than echo-chamber citations tracing back to a single root press release.",
        "Highlight discrepancies between source methodologies and synthesize a consensus reality bounded by explicit error bars.",
      ],
      ruInstructions: [
        "Никогда не считайте единственный источник доказательством: требуйте подтверждения минимум из трех независимых каналов.",
        "Проверяйте независимость источников: убедитесь, что они не цитируют один и тот же исходный пресс-релиз.",
        "Анализируйте нестыковки в методологиях источников и формируйте взвешенную оценку с указанием погрешности.",
      ],
      semanticType: "process_directive",
      tags: ["core","triangulation","verification","epistemology","evidence"],
    }),
  },

  "regret-minimization-framework-bezos": {
    id: "regret-minimization-framework-bezos",
    name: "RegretMinimizationFrameworkBezosSkill",
    displayName: "Bezos Regret Minimization Strategic Horizon",
    categoryId: "core",
    description: "Projects decision consequences to an 80-year-old perspective to eliminate trivial social friction and pursue foundational missions.",
    tags: ["core","regret-minimization","strategy","vision","decision-making"],
    transform: createStandardSkillTransform({
      sectionName: "Regret Minimization Horizon Analysis",
      ruSectionName: "Фреймворк минимизации сожалений (Regret Minimization)",
      instructions: [
        "Frame pivotal strategic dilemmas by projecting forward to the end of career or life: \"Will I regret not attempting this bold leap?\"",
        "Filter out transient embarrassment, temporary social friction, and short-term quarterly turbulence.",
        "Prioritize decisions that foster long-term mastery, enduring platform ownership, and foundational contributions.",
      ],
      ruInstructions: [
        "Оценивайте ключевые развилки с перспективы долгосрочного горизонта: «Буду ли я сожалеть, что не попробовал сделать этот шаг?».",
        "Отсеивайте сиюминутный страх критики, временный дискомфорт и квартальную турбулентность.",
        "Отдавайте приоритет выборам, ведущим к фундаментальному развитию компетенций и созданию непреходящей ценности.",
      ],
      semanticType: "process_directive",
      tags: ["core","regret-minimization","strategy","vision","decision-making"],
    }),
  },

  "subsidiarity-principle-delegation": {
    id: "subsidiarity-principle-delegation",
    name: "SubsidiarityPrincipleDelegationSkill",
    displayName: "Principle of Subsidiarity & Edge Delegation",
    categoryId: "core",
    description: "Enforces resolving matters at the lowest, most decentralized competent level, escalating to central authority only when strictly necessary.",
    tags: ["core","subsidiarity","decentralization","autonomy","governance"],
    transform: createStandardSkillTransform({
      sectionName: "Principle of Subsidiarity & Edge Autonomy",
      ruSectionName: "Принцип субсидиарности и децентрализованного контроля",
      instructions: [
        "Resolve technical decisions at the localized edge (microservice, pod, individual team) closest to the problem domain.",
        "Require central architectural governance only for cross-cutting protocols, network security boundaries, and shared contract interfaces.",
        "Empower edge components with autonomous failure recovery capabilities rather than routing all triage through centralized orchestrators.",
      ],
      ruInstructions: [
        "Принимайте решения на самом низком и близком к проблеме уровне (микросервис, команда компонента).",
        "Ограничивайте централизованное регулирование только общими протоколами, безопасностью периметра и межсервисными контрактами.",
        "Наделяйте краевые сервисы автономными механизмами самовосстановления без ожидания команд от центрального оркестратора.",
      ],
      semanticType: "process_directive",
      tags: ["core","subsidiarity","decentralization","autonomy","governance"],
    }),
  },

  "signal-to-noise-maximizer-pruner": {
    id: "signal-to-noise-maximizer-pruner",
    name: "SignalToNoiseMaximizerPrunerSkill",
    displayName: "Signal-to-Noise Ratio (SNR) Radical Maximizer",
    categoryId: "core",
    description: "Ruthlessly eliminates conversational fluff, corporate pleasantries, and redundant filler to deliver concentrated operational value.",
    tags: ["core","signal-to-noise","brevity","high-density","editorial"],
    transform: createStandardSkillTransform({
      sectionName: "Signal-to-Noise Ratio Maximization Protocol",
      ruSectionName: "Радикальная максимизация соотношения сигнал/шум (SNR)",
      instructions: [
        "Eliminate all conversational throat-clearing: \"Sure, I would be happy to help\", \"As an AI language model\", and repetitive boilerplate.",
        "Maximize information density per token: every single sentence must communicate an actionable directive, constraint, or datum.",
        "Format output with scannable headers, precise markdown tables, and unambiguous bulleted invariants.",
      ],
      ruInstructions: [
        "Удаляйте все вежливые вводные слова, клише («конечно, я помогу») и водянистые предисловия.",
        "Максимизируйте плотность пользы на единицу текста: каждое предложение обязано нести действие, факт или ограничение.",
        "Оформляйте материал емкими списками, таблицами и четкими инвариантами для мгновенного сканирования взглядом.",
      ],
      semanticType: "constraints",
      tags: ["core","signal-to-noise","brevity","high-density","editorial"],
    }),
  },

  "pre-mortem-fatal-flaw-extraction": {
    id: "pre-mortem-fatal-flaw-extraction",
    name: "PreMortemFatalFlawExtractionSkill",
    displayName: "Gary Klein Prospective Hindsight Pre-Mortem",
    categoryId: "core",
    description: "Assumes the project has already failed catastrophically 12 months in the future, tasking the team with reconstructing why.",
    tags: ["core","pre-mortem","risk-management","gary-klein","resilience"],
    transform: createStandardSkillTransform({
      sectionName: "Prospective Hindsight Pre-Mortem Protocol",
      ruSectionName: "Пре-мортем: ретроспектива из будущего провала (Gary Klein)",
      instructions: [
        "Adopt the prospective hindsight mindset: \"Imagine today is 1 year from now, and our rollout has suffered an unmitigated, public disaster.\"",
        "Generate a realistic chronological postmortem detailing the exact sequence of ignored warnings, subtle oversights, and systemic bottlenecks.",
        "Translate every identified historical failure mode into active preventive mitigations in the current rollout specification.",
      ],
      ruInstructions: [
        "Встаньте в позицию будущего: «Представьте, что прошел год, и наш проект потерпел громкую сокрушительную неудачу».",
        "Опишите реалистичную хронологию катастрофы: какие ранние сигналы были проигнорированы и где прорвало оборону.",
        "Преобразуйте каждый выявленный сценарий в действующий превентивный фильтр в текущем плане реализации.",
      ],
      semanticType: "process_directive",
      tags: ["core","pre-mortem","risk-management","gary-klein","resilience"],
    }),
  },
  "context-boundary-demarcation": {
    id: "context-boundary-demarcation",
    name: "ContextBoundaryDemarcationSkill",
    displayName: "Context Boundary Demarcation & Isolation",
    categoryId: "core",
    description: "Explicitly delineates strict epistemic and operational boundaries to prevent context contamination.",
    tags: ["core","boundary","isolation","epistemic","context"],
    transform: createStandardSkillTransform({
      sectionName: "Context Boundary & Operational Scope",
      ruSectionName: "Демаркация границ контекста и области ответственности",
      instructions: [
        "Establish strict operational boundaries: classify all statements into In-Scope, Out-of-Scope, and Unknown Context.",
        "Explicitly reject assumption leakage from external or ungrounded domains without certified evidence.",
        "Isolate sub-problems within independent evaluation sandboxes before synthesis."
],
      ruInstructions: [
        "Установите строгие границы задачи: четко разделите данные на «В границах (In-Scope)», «Вне границ (Out-of-Scope)» и «Непроверенный контекст».",
        "Запретите неявные допущения и утечку внешнего непроверенного контекста.",
        "Изолируйте подзадачи в независимые изолированные блоки перед финальным синтезом."
],
      semanticType: "constraints",
      tags: ["core","boundary","isolation","epistemic","context"],
    }),
  },

  "zero-assumption-auditing": {
    id: "zero-assumption-auditing",
    name: "ZeroAssumptionAuditingSkill",
    displayName: "Zero-Assumption Epistemic Audit",
    categoryId: "core",
    description: "Systematically surfaces hidden premises and refuses tacit unverified assumptions in {{task}}.",
    tags: ["core","assumptions","epistemics","audit","rigor"],
    transform: createStandardSkillTransform({
      sectionName: "Zero-Assumption Epistemic Audit Protocol",
      ruSectionName: "Протокол аудита нулевых допущений",
      instructions: [
        "Identify every unstated hypothesis or premise underlying {{task}} and expose it explicitly.",
        "Assign an epistemic confidence rating (High/Medium/Low/Speculative) to each underlying premise.",
        "Provide concrete fallback paths if any core assumption fails."
],
      ruInstructions: [
        "Выявите все скрытые и неявные предпосылки, лежащие в основе {{task}}.",
        "Присвойте каждой предпосылке статус эпистемической уверенности (Высокая / Средняя / Низкая / Спекулятивная).",
        "Сформируйте сценарии реагирования на случай ошибочности ключевых допущений."
],
      semanticType: "guardrail_directive",
      tags: ["core","assumptions","epistemics","audit","rigor"],
    }),
  },

  "falsification-criteria-specification": {
    id: "falsification-criteria-specification",
    name: "FalsificationCriteriaSpecificationSkill",
    displayName: "Popperian Falsification & Disproof Metric",
    categoryId: "core",
    description: "Defines concrete, empirical failure conditions that would prove the proposed approach incorrect.",
    tags: ["core","falsification","popper","scientific-method","validation"],
    transform: createStandardSkillTransform({
      sectionName: "Popperian Falsification Invariants",
      ruSectionName: "Инварианты фальсифицируемости по Попперу",
      instructions: [
        "State at least 3 concrete empirical observations that would unequivocally disprove this proposal.",
        "Define observable telemetry thresholds and quantitative triggers that indicate fundamental hypothesis failure.",
        "Include negative unit tests and counter-examples that test the boundaries of validity."
],
      ruInstructions: [
        "Сформулируйте не менее 3 эмпирически проверяемых условий, которые однозначно опровергнут предложенное решение.",
        "Определите метрики и критические пороги телеметрии, сигнализирующие о несостоятельности гипотезы.",
        "Приведите контрпримеры и негативные тестовые сценарии, проверяющие границы применимости."
],
      semanticType: "compliance_directive",
      tags: ["core","falsification","popper","scientific-method","validation"],
    }),
  },

  "invariant-conservation-law": {
    id: "invariant-conservation-law",
    name: "InvariantConservationLawSkill",
    displayName: "System Invariant Conservation Law",
    categoryId: "core",
    description: "Defines mathematical and state invariants that must remain strictly conserved during transformation.",
    tags: ["core","invariants","conservation","formal-methods","integrity"],
    transform: createStandardSkillTransform({
      sectionName: "Invariant Conservation & Integrity Invariants",
      ruSectionName: "Сохранение системных инвариантов и целостности",
      instructions: [
        "Enumerate non-negotiable state invariants (e.g. data conservation, idempotency, monotonic progress).",
        "Verify that every state mutation preserves system balance and relational integrity.",
        "Emit an explicit integrity certificate before finalizing output."
],
      ruInstructions: [
        "Зафиксируйте незыблемые инварианты состояния (сохранение баланса данных, идемпотентность, монотонность).",
        "Докажите, что каждая мутация сохраняет целостность реляционных и транзакционных связей.",
        "Выдайте явный сертификат инвариантной целостности перед финализацией ответа."
],
      semanticType: "protocol",
      tags: ["core","invariants","conservation","formal-methods","integrity"],
    }),
  },

  "cognitive-load-budgeting": {
    id: "cognitive-load-budgeting",
    name: "CognitiveLoadBudgetingSkill",
    displayName: "Cognitive Load Budgeting & Ergonomics",
    categoryId: "core",
    description: "Restricts mental friction by enforcing Miller's Law (7±2 chunks), scannability, and high ergonomics.",
    tags: ["core","ergonomics","cognitive-load","clarity","ux"],
    transform: createStandardSkillTransform({
      sectionName: "Cognitive Ergonomics & Information Hierarchy",
      ruSectionName: "Когнитивная эргономика и бюджет внимания",
      instructions: [
        "Structure content into maximum 5-7 thematic clusters to respect human short-term memory constraints.",
        "Use strong typographical hierarchy: bold lead terms, structured bullet lists, and summary takeaways.",
        "Eliminate nested parentheticals and cognitive tangents that dilute focus from {{task}}."
],
      ruInstructions: [
        "Ограничьте количество ключевых смысловых блоков до 5–7 для снижения когнитивной нагрузки.",
        "Используйте строгую визуальную иерархию: акцентные заголовки, списки и резюмирующие выводы.",
        "Исключите многоуровневые вложенные конструкции и отвлекающие отступления от {{task}}."
],
      semanticType: "process_directive",
      tags: ["core","ergonomics","cognitive-load","clarity","ux"],
    }),
  },

  "operational-definition-grounding": {
    id: "operational-definition-grounding",
    name: "OperationalDefinitionGroundingSkill",
    displayName: "Bridgman Operational Definition Grounding",
    categoryId: "core",
    description: "Replaces vague subjective jargon with concrete, measurable physical and procedural definitions.",
    tags: ["core","operational-definition","clarity","precision","semantics"],
    transform: createStandardSkillTransform({
      sectionName: "Bridgman Operational Grounding Protocol",
      ruSectionName: "Операционализация терминов и определений (Бриджмен)",
      instructions: [
        "Replace abstract adjectives ('fast', 'scalable', 'secure', 'optimal') with concrete procedural definitions.",
        "Define each key concept through the exact measurement method or verification algorithm used to test it.",
        "Provide unambiguous acceptable threshold ranges for every operational requirement."
],
      ruInstructions: [
        "Замените абстрактные эпитеты («быстрый», «масштабируемый», «безопасный») измеримыми процедурными протоколами.",
        "Определите каждый ключевой термин через точный метод его измерения или тестирования.",
        "Укажите точные числовые диапазоны и допуски для каждого операционного требования."
],
      semanticType: "protocol",
      tags: ["core","operational-definition","clarity","precision","semantics"],
    }),
  },

  "orthogonal-decomposition-matrix": {
    id: "orthogonal-decomposition-matrix",
    name: "OrthogonalDecompositionMatrixSkill",
    displayName: "Orthogonal MECE Decomposition Matrix",
    categoryId: "core",
    description: "Deconstructs problem domains into Mutually Exclusive, Collectively Exhaustive orthogonal dimensions.",
    tags: ["core","mece","decomposition","orthogonality","matrix"],
    transform: createStandardSkillTransform({
      sectionName: "Orthogonal MECE Decomposition Matrix",
      ruSectionName: "Ортогональная декомпозиция (принцип MECE)",
      instructions: [
        "Partition {{task}} into strictly non-overlapping (Mutually Exclusive) operational sub-domains.",
        "Ensure zero gaps in domain coverage (Collectively Exhaustive).",
        "Map cross-cutting dependencies across the resulting orthogonal matrix."
],
      ruInstructions: [
        "Разделите задачу {{task}} на строго непересекающиеся функциональные измерения.",
        "Гарантируйте 100% покрытие предметной области без слепых зон и пробелов.",
        "Составьте матрицу сквозных взаимосвязей между выделенными ортогональными блоками."
],
      semanticType: "process_directive",
      tags: ["core","mece","decomposition","orthogonality","matrix"],
    }),
  },

  "anti-fragile-stress-profiling": {
    id: "anti-fragile-stress-profiling",
    name: "AntiFragileStressProfilingSkill",
    displayName: "Taleb Anti-Fragile Stress Profiling",
    categoryId: "core",
    description: "Designs systems and prompts that gain strength, resilience, and clarity under extreme volatility.",
    tags: ["core","taleb","antifragile","resilience","volatility"],
    transform: createStandardSkillTransform({
      sectionName: "Anti-Fragile Stress & Volatility Profiling",
      ruSectionName: "Профилирование антихрупкости (Н. Талеб)",
      instructions: [
        "Subject {{task}} to maximum entropy perturbations: extreme scale, network partition, and adversarial inputs.",
        "Identify mechanisms where stressors generate diagnostic telemetry and automatic self-healing.",
        "Eliminate hidden convex vulnerabilities where small errors cascade into exponential systemic damage."
],
      ruInstructions: [
        "Подвергните решение стресс-тестированию в условиях экстремальной волатильности и хаотических сбоев.",
        "Спроектируйте механизмы, извлекающие пользу и обучаемость из возникающих ошибок.",
        "Устраните скрытые уязвимости, в которых единичный сбой приводит к лавинообразному отказу."
],
      semanticType: "protocol",
      tags: ["core","taleb","antifragile","resilience","volatility"],
    }),
  },

  "parsimony-lexical-economy": {
    id: "parsimony-lexical-economy",
    name: "ParsimonyLexicalEconomySkill",
    displayName: "Radical Parsimony & Lexical Compression",
    categoryId: "core",
    description: "Maximizes semantic bandwidth while compressing token length and eliminating redundant synonyms.",
    tags: ["core","parsimony","compression","conciseness","token-economy"],
    transform: createStandardSkillTransform({
      sectionName: "Lexical Economy & Parsimony Protocol",
      ruSectionName: "Протокол лексической экономии и семантической плотности",
      instructions: [
        "Express complex architectural directives in minimal, high-impact semantic terms.",
        "Eliminate duplicate modifiers, passive voice constructions, and decorative rhetorical devices.",
        "Ensure every retained token carries non-zero information entropy."
],
      ruInstructions: [
        "Формулируйте сложные концепты минимальным количеством емких, точных терминов.",
        "Устраните повторные синонимы, страдательный залог и риторические украшательства.",
        "Убедитесь, что каждое слово несет уникальную смысловую нагрузку."
],
      semanticType: "constraints",
      tags: ["core","parsimony","compression","conciseness","token-economy"],
    }),
  },

  "declarative-end-state-contract": {
    id: "declarative-end-state-contract",
    name: "DeclarativeEndStateContractSkill",
    displayName: "Declarative End-State Specification Contract",
    categoryId: "core",
    description: "Specifies what the target world state must be rather than only how to reach it imperatively.",
    tags: ["core","declarative","contract","state-machine","invariants"],
    transform: createStandardSkillTransform({
      sectionName: "Declarative End-State Contract",
      ruSectionName: "Декларативный контракт конечного состояния",
      instructions: [
        "Define the exact post-condition schema and invariants that certify total completion.",
        "Provide boolean truth assertions that validate that the output satisfies all functional requirements.",
        "Decouple end-state invariants from procedural implementation details."
],
      ruInstructions: [
        "Опишите точную схему постусловий и инвариантов, подтверждающих 100% решение задачи.",
        "Сформулируйте набор логических предикатов (Assertions), подтверждающих корректность результата.",
        "Разделите целевое конечное состояние и процедурные шаги его достижения."
],
      semanticType: "protocol",
      tags: ["core","declarative","contract","state-machine","invariants"],
    }),
  },

  "epistemic-humility-uncertainty-bounds": {
    id: "epistemic-humility-uncertainty-bounds",
    name: "EpistemicHumilityUncertaintyBoundsSkill",
    displayName: "Epistemic Humility & Uncertainty Confidence Bounds",
    categoryId: "core",
    description: "Calibrates uncertainty boundaries, preventing overconfident hallucinations on ambiguous inputs.",
    tags: ["core","uncertainty","epistemics","calibration","anti-hallucination"],
    transform: createStandardSkillTransform({
      sectionName: "Epistemic Uncertainty & Confidence Calibration",
      ruSectionName: "Калибровка неопределенности и эпистемических границ",
      instructions: [
        "Explicitly flag all areas where empirical ground-truth data is incomplete or ambiguous.",
        "Provide numeric or categorical confidence intervals (e.g. 95% CI, Speculative Estimate).",
        "Distinguish rigorously between mathematically proven facts, empirical consensus, and speculative heuristics."
],
      ruInstructions: [
        "Явно укажите аспекты, где исходные данные неполны, противоречивы или неоднозначны.",
        "Приведите границы доверительных интервалов для расчетных величин и оценок.",
        "Строго разграничивайте математически доказанные факты, индустриальный консенсус и эвристические гипотезы."
],
      semanticType: "guardrail_directive",
      tags: ["core","uncertainty","epistemics","calibration","anti-hallucination"],
    }),
  },

  "symmetric-reversibility-check": {
    id: "symmetric-reversibility-check",
    name: "SymmetricReversibilityCheckSkill",
    displayName: "Symmetric Reversibility & Rollback Protocol",
    categoryId: "core",
    description: "Ensures every recommended architecture or action has an explicit, low-cost undo/rollback mechanism.",
    tags: ["core","reversibility","rollback","two-way-door","bezos"],
    transform: createStandardSkillTransform({
      sectionName: "Symmetric Reversibility & Rollback Protocol",
      ruSectionName: "Протокол симметричной обратимости и отката",
      instructions: [
        "Classify decisions according to Bezos Type 1 (Irreversible) vs Type 2 (Two-way Door Reversible) taxonomy.",
        "Provide step-by-step zero-downtime rollback blueprints for every proposed system change.",
        "Estimate the blast radius and cost of reversal before executing transformations."
],
      ruInstructions: [
        "Классифицируйте решения по типологии Безоса: Тип 1 (Необратимые) vs Тип 2 (Легко обратимые).",
        "Опишите пошаговый сценарий безопасного отката (Rollback) для каждого внедряемого изменения.",
        "Оцените радиус поражения (Blast Radius) и стоимость отмены при возникновении сбоя."
],
      semanticType: "process_directive",
      tags: ["core","reversibility","rollback","two-way-door","bezos"],
    }),
  },

  "root-cause-ishikawa-fishbone": {
    id: "root-cause-ishikawa-fishbone",
    name: "RootCauseIshikawaFishboneSkill",
    displayName: "Ishikawa Fishbone Root-Cause Diagramming",
    categoryId: "core",
    description: "Categorizes causal vectors across People, Methods, Machines, Materials, Measurement, and Environment.",
    tags: ["core","ishikawa","fishbone","root-cause","quality-engineering"],
    transform: createStandardSkillTransform({
      sectionName: "Ishikawa 6M Cause-and-Effect Matrix",
      ruSectionName: "Причинно-следственный анализ Исикавы (Матрица 6M)",
      instructions: [
        "Analyze failure vectors across all 6M categories: Methods, Machines, Materials, Measurement, People, Environment.",
        "Drill down through secondary and tertiary causal branches to isolate primary systemic defects.",
        "Formulate corrective and preventive actions (CAPA) mapped to each verified root cause."
],
      ruInstructions: [
        "Классифицируйте причины проблемы по 6 ключевым ветвям: Методы, Оборудование, Материалы, Измерения, Персонал, Среда.",
        "Декомпозируйте вторичные и третичные ветви причин до выявления коренного системного дефекта.",
        "Сформулируйте комплекс корректирующих и превентивных мер (CAPA) для каждого подтвержденного фактора."
],
      semanticType: "domain_specific",
      tags: ["core","ishikawa","fishbone","root-cause","quality-engineering"],
    }),
  },

  "context-agnostic-modularity": {
    id: "context-agnostic-modularity",
    name: "ContextAgnosticModularitySkill",
    displayName: "Context-Agnostic Component Modularity",
    categoryId: "core",
    description: "Structures outputs into plug-and-play decoupled components with minimal external surface area.",
    tags: ["core","modularity","coupling","cohesion","architecture"],
    transform: createStandardSkillTransform({
      sectionName: "Context-Agnostic Modularity Standards",
      ruSectionName: "Стандарты контекстно-независимой модульности",
      instructions: [
        "Enforce high internal cohesion and loose external coupling across all modules.",
        "Expose strict, minimal public interfaces while encapsulating internal state and algorithmic complexity.",
        "Eliminate hidden temporal or global state dependencies."
],
      ruInstructions: [
        "Обеспечьте высокую связность внутри компонентов и слабую внешнюю связность между ними (High Cohesion / Loose Coupling).",
        "Спроектируйте лаконичные публичные интерфейсы, инкапсулируя внутреннее состояние и детали реализации.",
        "Исключите неявные зависимости от глобального состояния или порядка выполнения."
],
      semanticType: "protocol",
      tags: ["core","modularity","coupling","cohesion","architecture"],
    }),
  },

  "idempotency-key-enforcement": {
    id: "idempotency-key-enforcement",
    name: "IdempotencyKeyEnforcementSkill",
    displayName: "Idempotent Execution & Deduplication Guarantee",
    categoryId: "core",
    description: "Guarantees that repeating an execution N times yields the identical deterministic state as executing once.",
    tags: ["core","idempotency","determinism","distributed-systems","reliability"],
    transform: createStandardSkillTransform({
      sectionName: "Idempotent State & Deduplication Invariants",
      ruSectionName: "Инварианты идемпотентности и дедупликации",
      instructions: [
        "Ensure all transformation steps and mutations are mathematically idempotent (f(f(x)) = f(x)).",
        "Attach unique operational idempotency keys to track execution progress and prevent duplicate side-effects.",
        "Provide safe retry semantics with exponential backoff and jitter."
],
      ruInstructions: [
        "Гарантируйте математическую идемпотентность всех шагов трансформации (f(f(x)) = f(x)).",
        "Используйте уникальные ключи идемпотентности для предотвращения дублирования побочных эффектов.",
        "Сформулируйте правила безопасных повторных попыток (Retry Policy) с экспоненциальной задержкой."
],
      semanticType: "protocol",
      tags: ["core","idempotency","determinism","distributed-systems","reliability"],
    }),
  },

  "backwards-compatibility-contract": {
    id: "backwards-compatibility-contract",
    name: "BackwardsCompatibilityContractSkill",
    displayName: "Backwards Compatibility & Non-Breaking Evolution",
    categoryId: "core",
    description: "Preserves existing API contracts, schemas, and consumer expectations during continuous evolution.",
    tags: ["core","backwards-compatibility","api-evolution","semver","migration"],
    transform: createStandardSkillTransform({
      sectionName: "Backwards Compatibility & Migration Invariants",
      ruSectionName: "Обратная совместимость и эволюция контрактов",
      instructions: [
        "Adhere strictly to additive, non-breaking schema modifications.",
        "Maintain explicit deprecation notices and dual-running migration bridges for obsolete interfaces.",
        "Verify client resilience across all legacy payload permutations."
],
      ruInstructions: [
        "Применяйте исключительно аддитивные, не ломающие существующие контракты изменения схем.",
        "Предусмотрите период плавной миграции (Deprecation Window) и поддержку устаревших интерфейсов.",
        "Проверьте стабильность работы всех существующих клиентов при передаче новых структур данных."
],
      semanticType: "compliance_directive",
      tags: ["core","backwards-compatibility","api-evolution","semver","migration"],
    }),
  },

  "telemetry-observability-instrumentation": {
    id: "telemetry-observability-instrumentation",
    name: "TelemetryObservabilityInstrumentationSkill",
    displayName: "Deep Observability & Telemetry Instrumentation",
    categoryId: "core",
    description: "Embeds structured logs, RED metrics, and distributed tracing spans into architectural solutions.",
    tags: ["core","observability","telemetry","opentelemetry","metrics","tracing"],
    transform: createStandardSkillTransform({
      sectionName: "Observability & Telemetry Instrumentation",
      ruSectionName: "Инструментация наблюдаемости (Logs, Metrics, Traces)",
      instructions: [
        "Instrument all critical execution paths with structured JSON logging and correlation IDs.",
        "Define standard RED metrics: Rate (req/s), Errors (err/s), Duration (p50/p95/p99 latency).",
        "Include contextual distributed trace spans around high-cost I/O and external dependency boundaries."
],
      ruInstructions: [
        "Инструментируйте ключевые участки кода структурированными JSON-логами со сквозным Correlation ID.",
        "Определите метрики по стандарту RED: Rate (частота), Errors (ошибки), Duration (перцентили p95/p99).",
        "Добавьте спаны распределенной трассировки на границах сетевых вызовов и обращений к базам данных."
],
      semanticType: "protocol",
      tags: ["core","observability","telemetry","opentelemetry","metrics","tracing"],
    }),
  },

  "goldilocks-granularity-tuner": {
    id: "goldilocks-granularity-tuner",
    name: "GoldilocksGranularityTunerSkill",
    displayName: "Goldilocks Architectural Granularity Tuner",
    categoryId: "core",
    description: "Calibrates abstraction depth so output is neither excessively high-level nor drowned in minutiae.",
    tags: ["core","granularity","abstraction","goldilocks","precision"],
    transform: createStandardSkillTransform({
      sectionName: "Abstraction Depth & Granularity Calibration",
      ruSectionName: "Калибровка глубины абстракции (принцип Златовласки)",
      instructions: [
        "Find the optimal abstraction sweet-spot: actionable without drowning in trivial line-by-line micro-details.",
        "Pair every high-level architectural principle with exactly one concrete, working implementation snippet.",
        "Eliminate empty generic placeholders (e.g. `// implement logic here`); provide actual runnable logic."
],
      ruInstructions: [
        "Найдите оптимальный баланс: практическая детализация без перегрузки тривиальными микро-подробностями.",
        "Сопроводите каждый высокоуровневый архитектурный принцип конкретным рабочим примером кода.",
        "Исключите абстрактные заглушки (вроде `// написать код тут`) — предоставьте рабочий каркас логики."
],
      semanticType: "process_directive",
      tags: ["core","granularity","abstraction","goldilocks","precision"],
    }),
  },

  "computational-complexity-budget": {
    id: "computational-complexity-budget",
    name: "ComputationalComplexityBudgetSkill",
    displayName: "Big-O Time & Space Complexity Budget",
    categoryId: "core",
    description: "Enforces strict asymptotic runtime (O(1), O(N), O(N log N)) and memory footprint constraints.",
    tags: ["core","big-o","complexity","algorithms","performance"],
    transform: createStandardSkillTransform({
      sectionName: "Asymptotic Complexity & Memory Budget",
      ruSectionName: "Бюджет асимптотической сложности (Big-O Time & Space)",
      instructions: [
        "Formally state the Big-O Time and Space complexity for all data processing algorithms.",
        "Flag and refactor quadratic O(N²) or exponential O(2^N) patterns into linear or logarithmic equivalents.",
        "Document worst-case memory allocation envelopes under peak dataset scale."
],
      ruInstructions: [
        "Укажите точную асимптотическую сложность по времени и памяти (Big-O) для всех ключевых алгоритмов.",
        "Выявите и оптимизируйте квадратичные O(N²) и экспоненциальные O(2^N) узкие места.",
        "Зафиксируйте максимальный объем выделяемой оперативной памяти при пиковых нагрузках."
],
      semanticType: "constraints",
      tags: ["core","big-o","complexity","algorithms","performance"],
    }),
  },

  "fault-domain-isolation-bulkhead": {
    id: "fault-domain-isolation-bulkhead",
    name: "FaultDomainIsolationBulkheadSkill",
    displayName: "Bulkhead Pattern & Fault-Domain Isolation",
    categoryId: "core",
    description: "Isolates failing subsystems into blast-proof compartments, preventing whole-system collapse.",
    tags: ["core","bulkhead","fault-tolerance","isolation","resilience"],
    transform: createStandardSkillTransform({
      sectionName: "Fault-Domain Isolation & Bulkhead Protocol",
      ruSectionName: "Изоляция доменов сбоя и паттерн Bulkhead (Переборки)",
      instructions: [
        "Partition resources (thread pools, connection pools, memory buffers) into segregated execution compartments.",
        "Ensure a catastrophic failure or latency spike in one partition cannot exhaust resources in adjacent partitions.",
        "Implement circuit breakers that trip immediately upon dependency degradation."
],
      ruInstructions: [
        "Разделите системные ресурсы (пулы потоков, соединения с БД, буферы памяти) на изолированные отсеки.",
        "Гарантируйте, что падение или зависание одного модуля не приведет к исчерпанию ресурсов всей системы.",
        "Внедрите предохранители (Circuit Breakers), мгновенно размыкающие цепь при деградации внешнего сервиса."
],
      semanticType: "protocol",
      tags: ["core","bulkhead","fault-tolerance","isolation","resilience"],
    }),
  },

  "declarative-pre-and-post-conditions": {
    id: "declarative-pre-and-post-conditions",
    name: "DeclarativePreAndPostConditionsSkill",
    displayName: "Meyer Design-by-Contract (Pre/Post/Invariants)",
    categoryId: "core",
    description: "Enforces Bertrand Meyer's Design by Contract with strict preconditions, postconditions, and class invariants.",
    tags: ["core","design-by-contract","eiffel","meyer","formal-spec"],
    transform: createStandardSkillTransform({
      sectionName: "Bertrand Meyer Design-by-Contract Specification",
      ruSectionName: "Проектирование по контракту (Бертран Мейер: Pre/Post/Invariants)",
      instructions: [
        "Formulate explicit `require` preconditions that callers must guarantee before invocation.",
        "Formulate unambiguous `ensure` postconditions that the callee guarantees upon return.",
        "Maintain invariant assertions that remain true throughout the entire object lifecycle."
],
      ruInstructions: [
        "Сформулируйте строгие предусловия (`require`), которые вызывающая сторона обязана соблюсти.",
        "Определите постусловия (`ensure`), которые компонент гарантирует по завершении работы.",
        "Зафиксируйте постоянные инварианты, сохраняющие истинность на всем протяжении жизненного цикла."
],
      semanticType: "compliance_directive",
      tags: ["core","design-by-contract","eiffel","meyer","formal-spec"],
    }),
  },

  "zero-trust-boundary-validation": {
    id: "zero-trust-boundary-validation",
    name: "ZeroTrustBoundaryValidationSkill",
    displayName: "Zero-Trust Perimeter & Input Boundary Sanitizer",
    categoryId: "core",
    description: "Treats all inputs originating beyond the immediate local scope as potentially hostile and untrusted.",
    tags: ["core","zero-trust","sanitization","security","validation"],
    transform: createStandardSkillTransform({
      sectionName: "Zero-Trust Boundary Validation Protocol",
      ruSectionName: "Протокол валидации периметра в концепции Zero-Trust",
      instructions: [
        "Never trust upstream data validation: validate every input at the exact boundary of consumption.",
        "Enforce strict positive whitelist schemas (reject anything not explicitly permitted).",
        "Sanitize against command injection, memory overflow, cross-site scripting, and type confusion."
],
      ruInstructions: [
        "Никогда не доверяйте валидации на предыдущих этапах: проверяйте данные непосредственно в точке обработки.",
        "Применяйте строгие белые списки (разрешено только то, что явно описано в схеме).",
        "Очищайте входные потоки от инъекций, переполнения буфера и атак на подмену типов."
],
      semanticType: "guardrail_directive",
      tags: ["core","zero-trust","sanitization","security","validation"],
    }),
  },

  "anti-bikeshedding-prioritizer": {
    id: "anti-bikeshedding-prioritizer",
    name: "AntiBikesheddingPrioritizerSkill",
    displayName: "Sayre & Parkinson Anti-Bikeshedding Filter",
    categoryId: "core",
    description: "Focuses discussion and architectural effort on high-impact structural decisions rather than cosmetic minutiae.",
    tags: ["core","prioritization","parkinson","bikeshedding","strategy"],
    transform: createStandardSkillTransform({
      sectionName: "High-Leverage Strategic Prioritization (Anti-Bikeshedding)",
      ruSectionName: "Приоритизация ключевых решений (Закон Паркинсона и анти-байкшединг)",
      instructions: [
        "Allocate effort strictly proportional to systemic risk and business leverage, not ease of debate.",
        "Declare cosmetic and stylistic debates as solved by standard automated linters and conventions.",
        "Center the entire analysis on irreversible, high-cost architectural trade-offs."
],
      ruInstructions: [
        "Распределяйте ресурсы строго пропорционально уровню риска и стратегической ценности, а не простоте обсуждения.",
        "Зафиксируйте косметические и стилистические вопросы через стандартные соглашения и линтеры.",
        "Сфокусируйте внимание на необратимых, фундаментальных архитектурных компромиссах."
],
      semanticType: "process_directive",
      tags: ["core","prioritization","parkinson","bikeshedding","strategy"],
    }),
  },

  "graceful-degradation-fallback": {
    id: "graceful-degradation-fallback",
    name: "GracefulDegradationFallbackSkill",
    displayName: "Graceful Degradation & Degraded Mode Strategy",
    categoryId: "core",
    description: "Defines tiered degradation modes ensuring core functionality remains available when auxiliaries fail.",
    tags: ["core","graceful-degradation","fallback","resilience","availability"],
    transform: createStandardSkillTransform({
      sectionName: "Graceful Degradation & Fallback Strategy",
      ruSectionName: "Стратегия плавной деградации и резервных режимов",
      instructions: [
        "Define 3 operational tiers: Optimal (100% features), Degraded (core features + cached data), Critical (read-only triage).",
        "Ensure failures in non-critical components (analytics, recommendations, search) never block primary transactions.",
        "Provide clear UX and API status signals indicating when operating in degraded mode."
],
      ruInstructions: [
        "Определите 3 уровня работы: Оптимальный (100%), Деградированный (ядро + кэш), Критический (read-only).",
        "Гарантируйте, что сбои во вторичных сервисах (аналитика, рекомендации) не блокируют основные операции.",
        "Сформируйте понятные статусы и уведомления для пользователей при переходе в режим деградации."
],
      semanticType: "protocol",
      tags: ["core","graceful-degradation","fallback","resilience","availability"],
    }),
  },

  "pareto-eighty-twenty-leverager": {
    id: "pareto-eighty-twenty-leverager",
    name: "ParetoEightyTwentyLeveragerSkill",
    displayName: "Pareto 80/20 Leverage & Core Vital Extraction",
    categoryId: "core",
    description: "Identifies the 20% of high-leverage architectural primitives that generate 80% of system value.",
    tags: ["core","pareto","leverage","vital-few","efficiency"],
    transform: createStandardSkillTransform({
      sectionName: "Pareto Vital Few Leverage Matrix",
      ruSectionName: "Матрица максимального рычага по принципу Парето (80/20)",
      instructions: [
        "Isolate the vital 20% of inputs, code paths, or architecture that drive 80% of stability and outcomes.",
        "Deprioritize the trivial many until the critical foundational backbone is hardened.",
        "Provide high-impact, immediate wins before detailing long-tail marginal optimizations."
],
      ruInstructions: [
        "Выделите 20% ключевых компонентов, приносящих 80% совокупного результата и надежности.",
        "Отложите второстепенные детали до тех пор, пока ключевой фундамент не будет полностью стабилизирован.",
        "Сформулируйте быстрые и максимально эффективные решения в первую очередь."
],
      semanticType: "process_directive",
      tags: ["core","pareto","leverage","vital-few","efficiency"],
    }),
  },

  "dependency-inversion-principle": {
    id: "dependency-inversion-principle",
    name: "DependencyInversionPrincipleSkill",
    displayName: "SOLID Dependency Inversion & Port/Adapter Decoupling",
    categoryId: "core",
    description: "Ensures high-level business policy depends upon abstractions, not volatile low-level details.",
    tags: ["core","solid","dip","hexagonal","ports-adapters"],
    transform: createStandardSkillTransform({
      sectionName: "Dependency Inversion & Port-Adapter Decoupling",
      ruSectionName: "Принцип инверсии зависимостей (DIP) и порты/адаптеры",
      instructions: [
        "High-level domain models must never import from low-level database, HTTP, or infrastructure drivers.",
        "Define abstract interfaces (Ports) in domain core; implement concrete bindings (Adapters) at the infrastructure edge.",
        "Enable seamless swapping of external dependencies during automated testing via mock implementations."
],
      ruInstructions: [
        "Высокоуровневая бизнес-логика никогда не должна зависеть от деталей БД, сети или внешних фреймворков.",
        "Определите абстрактные интерфейсы (Порты) в ядре; реализуйте драйверы (Адаптеры) на внешнем периметре.",
        "Обеспечьте возможность легкой подмены внешних зависимостей тестовыми дублерами (Mocks/Stubs)."
],
      semanticType: "protocol",
      tags: ["core","solid","dip","hexagonal","ports-adapters"],
    }),
  },

  "single-source-of-truth-integrity": {
    id: "single-source-of-truth-integrity",
    name: "SingleSourceOfTruthIntegritySkill",
    displayName: "Single Source of Truth (SSOT) Authority Law",
    categoryId: "core",
    description: "Eliminates redundant duplicated state, establishing one canonical authority for every domain fact.",
    tags: ["core","ssot","data-integrity","normalization","architecture"],
    transform: createStandardSkillTransform({
      sectionName: "Single Source of Truth (SSOT) & Authority Law",
      ruSectionName: "Единый источник истины (SSOT) и авторитарность данных",
      instructions: [
        "Identify the single canonical owner and storage location for every data element in the domain model.",
        "Derive all secondary and cached views deterministically from the canonical master record.",
        "Establish strict sync/event mechanisms to prevent state split-brain and reconciliation divergence."
],
      ruInstructions: [
        "Определите единого авторитарного владельца для каждой сущности и факта в системе.",
        "Формируйте все производные представления и кэши строго на основе канонического мастер-источника.",
        "Исключите рассинхронизацию данных (Split-Brain) за счет детерминированных событийных механизмов."
],
      semanticType: "protocol",
      tags: ["core","ssot","data-integrity","normalization","architecture"],
    }),
  },

  "anti-conway-alignment-engine": {
    id: "anti-conway-alignment-engine",
    name: "AntiConwayAlignmentEngineSkill",
    displayName: "Conway's Law & Inverse Conway Maneuver",
    categoryId: "core",
    description: "Aligns system architecture with desired team communication topologies to prevent structural friction.",
    tags: ["core","conways-law","team-topologies","organization","architecture"],
    transform: createStandardSkillTransform({
      sectionName: "Conway Alignment & Team Topology Mapping",
      ruSectionName: "Выравнивание архитектуры по закону Конвея (Inverse Conway)",
      instructions: [
        "Analyze whether proposed software component boundaries mirror cross-team organizational boundaries.",
        "Apply the Inverse Conway Maneuver: design desired software architecture to incentivize streamlined team collaboration.",
        "Minimize cross-team synchronous blockers by establishing clear, contract-tested API boundaries."
],
      ruInstructions: [
        "Убедитесь, что границы программных модулей соответствуют организационной структуре команд.",
        "Примените «инверсивный маневр Конвея»: проектируйте архитектуру для упрощения коммуникаций между людьми.",
        "Снизьте число межкомандных блокировок за счет четких контрактов и автоматического контрактного тестирования."
],
      semanticType: "domain_specific",
      tags: ["core","conways-law","team-topologies","organization","architecture"],
    }),
  },

  "defensive-programming-fail-fast": {
    id: "defensive-programming-fail-fast",
    name: "DefensiveProgrammingFailFastSkill",
    displayName: "Fail-Fast & Defensive Assertion Architecture",
    categoryId: "core",
    description: "Halts execution immediately upon detecting unexpected state to prevent corrupted silent mutations.",
    tags: ["core","fail-fast","defensive","assertions","stability"],
    transform: createStandardSkillTransform({
      sectionName: "Fail-Fast & Defensive Assertion Standards",
      ruSectionName: "Архитектура раннего падения (Fail-Fast) и защитные проверки",
      instructions: [
        "Verify input arguments and internal assumptions immediately upon entering every function or module.",
        "Throw descriptive, actionable exceptions immediately rather than allowing invalid state to propagate downstream.",
        "Include debugging context (variable states, execution stage) within every diagnostic error payload."
],
      ruInstructions: [
        "Проверяйте входные аргументы и инварианты сразу на входе в каждую функцию или сервис.",
        "Выбрасывайте понятные структурированные исключения мгновенно при обнаружении аномалий.",
        "Включайте полный контекст отладки (значения переменных, стадию выполнения) в тело сообщения об ошибке."
],
      semanticType: "protocol",
      tags: ["core","fail-fast","defensive","assertions","stability"],
    }),
  },

  "strict-monolithic-vs-microservices-evaluator": {
    id: "strict-monolithic-vs-microservices-evaluator",
    name: "StrictMonolithicVsMicroservicesEvaluatorSkill",
    displayName: "Modular Monolith vs Distributed Services Matrix",
    categoryId: "core",
    description: "Evaluates architectural trade-offs between clean modular monoliths and microservice fabrics.",
    tags: ["core","monolith","microservices","tradeoffs","distributed-systems"],
    transform: createStandardSkillTransform({
      sectionName: "Monolith vs Distributed Architecture Trade-Off Matrix",
      ruSectionName: "Матрица выбора: модульный монолит vs микросервисы",
      instructions: [
        "Evaluate transaction boundaries, operational complexity overhead, and developer velocity under both paradigms.",
        "Prioritize Modular Monoliths unless team scale or distinct scaling characteristics strictly demand network boundaries.",
        "Quantify the network latency, partial failure, and data consistency costs inherent to distributed architectures."
],
      ruInstructions: [
        "Оцените границы транзакций, операционную сложность и скорость разработки для обоих подходов.",
        "Отдавайте предпочтение модульному монолиту, пока размер команд или независимое масштабирование не потребуют разделения.",
        "Количественно оцените издержки сетевых задержек, частичных отказов и распределенной согласованности данных."
],
      semanticType: "domain_specific",
      tags: ["core","monolith","microservices","tradeoffs","distributed-systems"],
    }),
  },

  "schema-evolution-contract-lock": {
    id: "schema-evolution-contract-lock",
    name: "SchemaEvolutionContractLockSkill",
    displayName: "Protobuf/Avro Schema Evolution & Compatibility Lock",
    categoryId: "core",
    description: "Enforces strict backward and forward schema compatibility rules across data serialization formats.",
    tags: ["core","schema","protobuf","avro","compatibility","serialization"],
    transform: createStandardSkillTransform({
      sectionName: "Schema Evolution & Compatibility Lock",
      ruSectionName: "Защита эволюции схем данных (Protobuf/Avro Compatibility)",
      instructions: [
        "Never remove or renumber existing field tags in serialization contracts.",
        "Ensure all newly added fields are marked optional or have deterministic default fallbacks.",
        "Validate full forward compatibility (old systems can read new payloads without crashes)."
],
      ruInstructions: [
        "Запретите удаление или изменение номеров существующих полей в контрактах сериализации.",
        "Сделайте все новые поля опциональными со значениями по умолчанию для гарантии совместимости.",
        "Проверьте прямую совместимость (старые версии сервисов корректно читают новые форматы данных)."
],
      semanticType: "compliance_directive",
      tags: ["core","schema","protobuf","avro","compatibility","serialization"],
    }),
  },

  "deadlock-prevention-total-ordering": {
    id: "deadlock-prevention-total-ordering",
    name: "DeadlockPreventionTotalOrderingSkill",
    displayName: "Dijkstra Total Resource Ordering & Deadlock Prevention",
    categoryId: "core",
    description: "Prevents deadlocks by enforcing globally consistent strict acquisition ordering across all shared locks.",
    tags: ["core","deadlock","concurrency","dijkstra","locking"],
    transform: createStandardSkillTransform({
      sectionName: "Total Resource Ordering & Deadlock Prevention Protocol",
      ruSectionName: "Глобальный порядок блокировок и предотвращение Deadlock (Дейкстра)",
      instructions: [
        "Establish a strict global ordering hierarchy for acquiring all multi-resource locks or transactions.",
        "Acquire shared locks strictly in ascending numerical/lexicographical order; release in reverse order.",
        "Enforce deterministic lock acquisition timeouts with automated transaction abort and retry policies."
],
      ruInstructions: [
        "Установите строгий глобальный порядок захвата блокировок при одновременной работе с несколькими ресурсами.",
        "Захватывайте блокировки строго в порядке возрастания их идентификаторов; освобождайте в обратном порядке.",
        "Внедрите обязательные таймауты ожидания блокировок с автоматической отменой и перезапуском транзакций."
],
      semanticType: "protocol",
      tags: ["core","deadlock","concurrency","dijkstra","locking"],
    }),
  },

  "domain-driven-ubiquitous-language": {
    id: "domain-driven-ubiquitous-language",
    name: "DomainDrivenUbiquitousLanguageSkill",
    displayName: "DDD Ubiquitous Language & Bounded Context Map",
    categoryId: "core",
    description: "Aligns software terminology precisely with business domain experts within strict bounded contexts.",
    tags: ["core","ddd","ubiquitous-language","bounded-context","domain-modeling"],
    transform: createStandardSkillTransform({
      sectionName: "DDD Ubiquitous Language & Context Boundaries",
      ruSectionName: "Единый язык домена (Ubiquitous Language) и Bounded Context",
      instructions: [
        "Establish an unambiguous glossary of business domain terms shared identically by code and domain experts.",
        "Explicitly map Bounded Contexts and define Translation Anti-Corruption Layers at their intersection.",
        "Ban ambiguous generic terms (e.g. 'Data', 'Manager', 'Processor') in favor of precise domain entities."
],
      ruInstructions: [
        "Сформируйте глоссарий терминов, используемый одинаково в бизнес-требованиях и программном коде.",
        "Очертите границы ограниченных контекстов (Bounded Contexts) и опишите антикоррупционные слои между ними.",
        "Запретите абстрактные названия сущностей ('Data', 'Manager', 'Processor') в пользу точных бизнес-моделей."
],
      semanticType: "protocol",
      tags: ["core","ddd","ubiquitous-language","bounded-context","domain-modeling"],
    }),
  },

  "load-shedding-backpressure": {
    id: "load-shedding-backpressure",
    name: "LoadSheddingBackpressureSkill",
    displayName: "Reactive Load-Shedding & Backpressure Defense",
    categoryId: "core",
    description: "Prevents catastrophic server meltdown by shedding low-priority traffic under queue saturation.",
    tags: ["core","load-shedding","backpressure","queues","resilience"],
    transform: createStandardSkillTransform({
      sectionName: "Reactive Load-Shedding & Backpressure Protocol",
      ruSectionName: "Сброс нагрузки (Load-Shedding) и противодавление (Backpressure)",
      instructions: [
        "Monitor internal queue depths and thread pool saturation thresholds continuously.",
        "Reject excess incoming requests with HTTP 429 / 503 early in the pipeline before queue starvation occurs.",
        "Prioritize critical transactional traffic over background jobs, metrics, and batch ingestion."
],
      ruInstructions: [
        "Непрерывно отслеживайте заполненность очередей и утилизацию пулов потоков.",
        "Отклоняйте избыточные запросы на самом раннем этапе конвейера (HTTP 429/503), предотвращая зависание системы.",
        "Обеспечьте абсолютный приоритет критических транзакций над фоновыми задачами и синхронизацией."
],
      semanticType: "protocol",
      tags: ["core","load-shedding","backpressure","queues","resilience"],
    }),
  },

  "hermetic-reproducibility-harness": {
    id: "hermetic-reproducibility-harness",
    name: "HermeticReproducibilityHarnessSkill",
    displayName: "Hermetic Build & Deterministic Reproducibility",
    categoryId: "core",
    description: "Ensures all outputs, builds, and calculations are 100% reproducible with zero hidden ambient dependencies.",
    tags: ["core","hermetic","reproducibility","determinism","isolation"],
    transform: createStandardSkillTransform({
      sectionName: "Hermetic Environment & Reproducibility Harness",
      ruSectionName: "Герметичная среда и детерминированная воспроизводимость",
      instructions: [
        "Lock all external dependencies, compiler flags, seeds, and clock references to explicit immutable versions.",
        "Eliminate reliance on ambient environment state, local timezones, or non-deterministic OS scheduling.",
        "Guarantee bit-for-bit identical outputs when given identical inputs across disparate execution environments."
],
      ruInstructions: [
        "Зафиксируйте версии всех зависимостей, флаги компилятора, seed генераторов случайных чисел и таймзоны.",
        "Исключите неявную зависимость от локального окружения и недетерминированного системного времени.",
        "Гарантируйте побитово идентичный результат при повторном запуске на любых совместимых платформах."
],
      semanticType: "compliance_directive",
      tags: ["core","hermetic","reproducibility","determinism","isolation"],
    }),
  },

  "anti-pattern-code-smell-scanner": {
    id: "anti-pattern-code-smell-scanner",
    name: "AntiPatternCodeSmellScannerSkill",
    displayName: "Refactoring Code Smell & Architectural Anti-Pattern Scanner",
    categoryId: "core",
    description: "Scans designs for God Objects, Feature Envy, Long Parameter Lists, and Shotgun Surgery.",
    tags: ["core","code-smells","anti-patterns","refactoring","clean-code"],
    transform: createStandardSkillTransform({
      sectionName: "Code Smell & Architectural Anti-Pattern Audit",
      ruSectionName: "Аудит запахов кода (Code Smells) и архитектурных антипаттернов",
      instructions: [
        "Audit the proposed architecture for classic Fowler code smells (God Class, Feature Envy, Shotgun Surgery).",
        "Highlight structural friction points where future changes will require touching multiple unrelated files.",
        "Provide concrete refactoring prescriptions (Extract Method, Replace Primitive with Object, Move Field)."
],
      ruInstructions: [
        "Проверьте архитектуру на наличие классических запахов кода (God Object, Feature Envy, Shotgun Surgery).",
        "Укажите точки структурного трения, где любое изменение потребует правок в десятке не связанных модулей.",
        "Предоставьте рецепты рефакторинга (Extract Class, Parameter Object, Strategy Pattern)."
],
      semanticType: "domain_specific",
      tags: ["core","code-smells","anti-patterns","refactoring","clean-code"],
    }),
  },

  "cap-theorem-consistency-tradeoff": {
    id: "cap-theorem-consistency-tradeoff",
    name: "CapTheoremConsistencyTradeoffSkill",
    displayName: "Brewer CAP & PACELC Distributed Trade-Off Analyzer",
    categoryId: "core",
    description: "Navigates distributed consistency vs availability trade-offs under network partition and normal operation.",
    tags: ["core","cap-theorem","pacelc","distributed-systems","consistency"],
    transform: createStandardSkillTransform({
      sectionName: "Brewer CAP & PACELC Trade-Off Analysis",
      ruSectionName: "Анализ компромиссов по теореме CAP и теореме PACELC",
      instructions: [
        "Explicitly categorize data stores under CAP (CP vs AP) and PACELC (PC/EC vs PA/EL) frameworks.",
        "Define conflict resolution semantics (CRDTs, Last-Write-Wins, Vector Clocks) for partitions.",
        "Document the acceptable staleness window and recovery time objective (RTO) for eventual consistency."
],
      ruInstructions: [
        "Классифицируйте систему по теоремам CAP (CP vs AP) и PACELC (PC/EC vs PA/EL).",
        "Определите алгоритмы разрешения конфликтов (CRDT, Vector Clocks, Last-Write-Wins) при разделении сети.",
        "Зафиксируйте допустимое окно устаревания данных (Staleness Window) для слабосогласованных узлов."
],
      semanticType: "domain_specific",
      tags: ["core","cap-theorem","pacelc","distributed-systems","consistency"],
    }),
  },

  "security-least-privilege-rbac": {
    id: "security-least-privilege-rbac",
    name: "SecurityLeastPrivilegeRbacSkill",
    displayName: "Principle of Least Privilege (PoLP) & RBAC Matrix",
    categoryId: "core",
    description: "Restricts actors, services, and roles to the absolute minimum necessary permissions to perform duties.",
    tags: ["core","security","least-privilege","rbac","access-control"],
    transform: createStandardSkillTransform({
      sectionName: "Principle of Least Privilege & RBAC Protocol",
      ruSectionName: "Принцип наименьших привилегий (PoLP) и ролевая модель (RBAC)",
      instructions: [
        "Assign permissions granularly per operation (Read, Write, Delete, Admin) rather than coarse superuser access.",
        "Enforce short-lived ephemeral credentials and tokens rather than static long-lived API keys.",
        "Log and audit every authorization elevation and sensitive resource access."
],
      ruInstructions: [
        "Назначайте гранулярные права доступа под каждую операцию, исключая избыточные права администратора.",
        "Используйте временные токены с коротким сроком жизни вместо статичных мастер-ключей.",
        "Логируйте и отправляйте в аудит каждое повышение привилегий и обращение к конфиденциальным ресурсам."
],
      semanticType: "guardrail_directive",
      tags: ["core","security","least-privilege","rbac","access-control"],
    }),
  },

  "semantic-versioning-breaking-lock": {
    id: "semantic-versioning-breaking-lock",
    name: "SemanticVersioningBreakingLockSkill",
    displayName: "Semantic Versioning (SemVer 2.0.0) Protocol",
    categoryId: "core",
    description: "Enforces deterministic SemVer rules: MAJOR for breaking changes, MINOR for features, PATCH for fixes.",
    tags: ["core","semver","versioning","release-engineering","governance"],
    transform: createStandardSkillTransform({
      sectionName: "Semantic Versioning (SemVer 2.0.0) Invariants",
      ruSectionName: "Правила семантического версионирования (SemVer 2.0.0)",
      instructions: [
        "Classify every modification strictly according to SemVer 2.0.0 specification rules.",
        "Increment MAJOR version when making breaking API or schema changes.",
        "Generate automated changelogs with explicit migration instructions for all breaking changes."
],
      ruInstructions: [
        "Классифицируйте каждое изменение строго по стандарту SemVer 2.0.0 (MAJOR.MINOR.PATCH).",
        "Обязательно повышайте мажорную версию (MAJOR) при любых ломающих изменениях публичного интерфейса.",
        "Формируйте понятный список изменений (Changelog) с инструкциями по миграции."
],
      semanticType: "compliance_directive",
      tags: ["core","semver","versioning","release-engineering","governance"],
    }),
  },

  "circuit-breaker-hystrix-pattern": {
    id: "circuit-breaker-hystrix-pattern",
    name: "CircuitBreakerHystrixPatternSkill",
    displayName: "Michael Nygard Circuit Breaker & State Machine",
    categoryId: "core",
    description: "Implements Closed -> Open -> Half-Open circuit breaker states with sliding-window error monitoring.",
    tags: ["core","circuit-breaker","resilience","nygard","distributed-systems"],
    transform: createStandardSkillTransform({
      sectionName: "Circuit Breaker State Machine Protocol",
      ruSectionName: "Автомат состояний Circuit Breaker (Closed, Open, Half-Open)",
      instructions: [
        "Implement a 3-state circuit breaker: CLOSED (normal), OPEN (fast-fail without network call), HALF-OPEN (probe canary).",
        "Trip the breaker when error rate exceeds threshold within sliding time window (e.g. 50% errors over 10s).",
        "Provide fallback cache or default response immediately while circuit is OPEN."
],
      ruInstructions: [
        "Реализуйте 3 состояния автомата: CLOSED (нормальный), OPEN (мгновенный отказ), HALF-OPEN (пробные запросы).",
        "Размыкайте цепь при превышении порога ошибок в скользящем окне времени (например, >50% ошибок за 10 сек).",
        "Возвращайте мгновенный фолбэк-ответ из кэша при нахождении цепи в состоянии OPEN."
],
      semanticType: "protocol",
      tags: ["core","circuit-breaker","resilience","nygard","distributed-systems"],
    }),
  },

  "anti-corruption-layer-domain-bridge": {
    id: "anti-corruption-layer-domain-bridge",
    name: "AntiCorruptionLayerDomainBridgeSkill",
    displayName: "DDD Anti-Corruption Layer (ACL) Domain Bridge",
    categoryId: "core",
    description: "Isolates clean modern domain models from legacy, vendor, or third-party schema pollutants.",
    tags: ["core","acl","anti-corruption","ddd","legacy-migration"],
    transform: createStandardSkillTransform({
      sectionName: "Anti-Corruption Layer (ACL) Bridge Specification",
      ruSectionName: "Спецификация антикоррупционного слоя (Anti-Corruption Layer)",
      instructions: [
        "Create a dedicated translation layer that maps legacy or third-party data structures into clean domain entities.",
        "Prevent third-party terminology or design idioms from leaking into internal business logic.",
        "Implement bidirectional adapters with strict validation schemas."
],
      ruInstructions: [
        "Создайте выделенный слой трансляции, преобразующий внешние или устаревшие структуры данных в чистые доменные сущности.",
        "Не допускайте проникновения сторонней терминологии и плохих абстракций во внутреннее ядро логики.",
        "Реализуйте двунаправленные адаптеры со строгой валидацией на входе и выходе."
],
      semanticType: "protocol",
      tags: ["core","acl","anti-corruption","ddd","legacy-migration"],
    }),
  },

  "declarative-resource-cleanup-raii": {
    id: "declarative-resource-cleanup-raii",
    name: "DeclarativeResourceCleanupRaiiSkill",
    displayName: "RAII Resource Acquisition Is Initialization & Cleanup",
    categoryId: "core",
    description: "Guarantees leak-free acquisition and deterministic cleanup of file handles, sockets, and memory.",
    tags: ["core","raii","memory-management","resource-cleanup","stability"],
    transform: createStandardSkillTransform({
      sectionName: "RAII Deterministic Resource Management Protocol",
      ruSectionName: "Протокол гарантированного освобождения ресурсов (RAII / Try-Finally)",
      instructions: [
        "Bind the lifecycle of resources (connections, sockets, memory blocks) to explicit lexical or scope blocks.",
        "Enforce deterministic release via language idioms (try-with-resources, using, defer, RAII destructors).",
        "Prevent resource leakages across all exception, error, and early-return execution paths."
],
      ruInstructions: [
        "Привязывайте жизненный цикл ресурсов (сокеты, соединения, файлы) к явным блокам видимости.",
        "Обеспечьте гарантированное закрытие ресурсов через конструкции языка (using, try-finally, defer, RAII).",
        "Исключите утечки памяти и дескрипторов при любых исключениях и аварийных выходах из функций."
],
      semanticType: "protocol",
      tags: ["core","raii","memory-management","resource-cleanup","stability"],
    }),
  },

  "finite-state-machine-safety-invariants": {
    id: "finite-state-machine-safety-invariants",
    name: "FiniteStateMachineSafetyInvariantsSkill",
    displayName: "Deterministic Finite State Machine (FSM) Invariants",
    categoryId: "core",
    description: "Models complex domain lifecycles into mathematically verifiable finite state machines.",
    tags: ["core","fsm","state-machine","determinism","formal-verification"],
    transform: createStandardSkillTransform({
      sectionName: "Finite State Machine (FSM) Safety Invariants",
      ruSectionName: "Инварианты детерминированного конечного автомата (FSM)",
      instructions: [
        "Enumerate all valid states, inputs, and state transition transitions explicitly in a tabular matrix.",
        "Strictly forbid undeclared transitions; throw fatal invalid state transition exceptions upon illegal events.",
        "Verify that the state graph has zero unreachable states or unexpected terminal deadlock sinks."
],
      ruInstructions: [
        "Опишите все допустимые состояния, события и переходы в виде строгой матрицы переходов.",
        "Запретите неявные переходы; выбрасывайте исключение при попытке выполнить недопустимую смену состояния.",
        "Убедитесь в отсутствии недостижимых состояний и нежелательных тупиковых ловушек в графе автомата."
],
      semanticType: "protocol",
      tags: ["core","fsm","state-machine","determinism","formal-verification"],
    }),
  },

  "data-locality-cache-friendliness": {
    id: "data-locality-cache-friendliness",
    name: "DataLocalityCacheFriendlinessSkill",
    displayName: "Data Locality & CPU Cache-Line Optimization",
    categoryId: "core",
    description: "Arranges data structures sequentially in memory to maximize L1/L2/L3 cache hit rates.",
    tags: ["core","cache","data-locality","cpu","performance","systems"],
    transform: createStandardSkillTransform({
      sectionName: "Data Locality & Cache Optimization Architecture",
      ruSectionName: "Локальность данных и оптимизация кэша процессора (L1/L2/L3)",
      instructions: [
        "Prefer contiguous Array-of-Structures (AoS) or Structure-of-Arrays (SoA) layout over pointer-chasing linked nodes.",
        "Align data access patterns with sequential memory strides to trigger CPU hardware prefetchers.",
        "Eliminate unnecessary heap allocations and pointer indirections in hot execution loops."
],
      ruInstructions: [
        "Отдавайте предпочтение последовательным массивам в памяти вместо разрозненных связанных списков с указателями.",
        "Организуйте обход данных в памяти последовательно для эффективной работы аппаратного предвыборщика CPU.",
        "Минимизируйте лишние аллокации в куче (Heap) и разыменование указателей в горячих циклах обработки."
],
      semanticType: "process_directive",
      tags: ["core","cache","data-locality","cpu","performance","systems"],
    }),
  },
  "core-universal-task-scoping-boundary-contract": {
    id: "core-universal-task-scoping-boundary-contract",
    name: "UniversalTaskScopingBoundaryContractSkill",
    displayName: "Universal Task Scoping & Boundary Contract",
    categoryId: "core",
    description: "Establishes non-overlapping operational scope, explicit inputs, outputs, and non-goals.",
    tags: ["core","core","universal","task"],
    transform: createStandardSkillTransform({
      sectionName: "Universal Task Scoping & Boundary Contract Standards",
      ruSectionName: "Стандарты и регламенты: Universal Task Scoping & Boundary Contract",
      instructions: [
        "Apply core domain tenets for Universal Task Scoping & Boundary Contract.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Universal Task Scoping & Boundary Contract.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","universal","task"],
    }),
  },

  "core-constraint-hierarchy-hard-soft-preference-weighting": {
    id: "core-constraint-hierarchy-hard-soft-preference-weighting",
    name: "ConstraintHierarchyHardSoftPreferenceWeightingSkill",
    displayName: "Constraint Hierarchy & Hard/Soft Preference Weighting",
    categoryId: "core",
    description: "Prioritizes non-negotiable compliance rules over flexible stylistic formatting preferences.",
    tags: ["core","core","constraint","hierarchy"],
    transform: createStandardSkillTransform({
      sectionName: "Constraint Hierarchy & Hard/Soft Preference Weighting Standards",
      ruSectionName: "Стандарты и регламенты: Constraint Hierarchy & Hard/Soft Preference Weighting",
      instructions: [
        "Apply core domain tenets for Constraint Hierarchy & Hard/Soft Preference Weighting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Constraint Hierarchy & Hard/Soft Preference Weighting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","constraint","hierarchy"],
    }),
  },

  "core-context-window-preservation-token-pruning": {
    id: "core-context-window-preservation-token-pruning",
    name: "ContextWindowPreservationTokenPruningSkill",
    displayName: "Context Window Preservation & Token Pruning",
    categoryId: "core",
    description: "Eliminates conversational fluff and boilerplate to maximize semantic context density.",
    tags: ["core","core","context","window"],
    transform: createStandardSkillTransform({
      sectionName: "Context Window Preservation & Token Pruning Standards",
      ruSectionName: "Стандарты и регламенты: Context Window Preservation & Token Pruning",
      instructions: [
        "Apply core domain tenets for Context Window Preservation & Token Pruning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Context Window Preservation & Token Pruning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","context","window"],
    }),
  },

  "core-zero-shot-task-instruction-framing": {
    id: "core-zero-shot-task-instruction-framing",
    name: "ZeroShotTaskInstructionFramingSkill",
    displayName: "Zero-Shot Task Instruction Framing",
    categoryId: "core",
    description: "Formulates unambiguous task instructions without requiring prior few-shot examples.",
    tags: ["core","core","zero","shot"],
    transform: createStandardSkillTransform({
      sectionName: "Zero-Shot Task Instruction Framing Standards",
      ruSectionName: "Стандарты и регламенты: Zero-Shot Task Instruction Framing",
      instructions: [
        "Apply core domain tenets for Zero-Shot Task Instruction Framing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Zero-Shot Task Instruction Framing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","zero","shot"],
    }),
  },

  "core-multi-role-composite-system-directive": {
    id: "core-multi-role-composite-system-directive",
    name: "MultiRoleCompositeSystemDirectiveSkill",
    displayName: "Multi-Role Composite System Directive",
    categoryId: "core",
    description: "Synthesizes dual perspectives (e.g. auditor + architect) into a single cohesive persona.",
    tags: ["core","core","multi","role"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Role Composite System Directive Standards",
      ruSectionName: "Стандарты и регламенты: Multi-Role Composite System Directive",
      instructions: [
        "Apply core domain tenets for Multi-Role Composite System Directive.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Multi-Role Composite System Directive.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","multi","role"],
    }),
  },

  "core-explicit-output-format-pre-commitment": {
    id: "core-explicit-output-format-pre-commitment",
    name: "ExplicitOutputFormatPreCommitmentSkill",
    displayName: "Explicit Output Format Pre-Commitment",
    categoryId: "core",
    description: "Locks the response schema before generating any narrative analysis or reasoning.",
    tags: ["core","core","explicit","output"],
    transform: createStandardSkillTransform({
      sectionName: "Explicit Output Format Pre-Commitment Standards",
      ruSectionName: "Стандарты и регламенты: Explicit Output Format Pre-Commitment",
      instructions: [
        "Apply core domain tenets for Explicit Output Format Pre-Commitment.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Explicit Output Format Pre-Commitment.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","explicit","output"],
    }),
  },

  "core-negative-space-non-goal-exclusion": {
    id: "core-negative-space-non-goal-exclusion",
    name: "NegativeSpaceNonGoalExclusionSkill",
    displayName: "Negative Space Non-Goal Exclusion",
    categoryId: "core",
    description: "Defines explicit exclusions ('Do NOT do X, Y, or Z') to prevent unwanted agent drift.",
    tags: ["core","core","negative","space"],
    transform: createStandardSkillTransform({
      sectionName: "Negative Space Non-Goal Exclusion Standards",
      ruSectionName: "Стандарты и регламенты: Negative Space Non-Goal Exclusion",
      instructions: [
        "Apply core domain tenets for Negative Space Non-Goal Exclusion.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Negative Space Non-Goal Exclusion.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","negative","space"],
    }),
  },

  "core-hierarchical-instruction-decomposition": {
    id: "core-hierarchical-instruction-decomposition",
    name: "HierarchicalInstructionDecompositionSkill",
    displayName: "Hierarchical Instruction Decomposition",
    categoryId: "core",
    description: "Breaks complex multi-part prompts into nested, numbered sub-directives.",
    tags: ["core","core","hierarchical","instruction"],
    transform: createStandardSkillTransform({
      sectionName: "Hierarchical Instruction Decomposition Standards",
      ruSectionName: "Стандарты и регламенты: Hierarchical Instruction Decomposition",
      instructions: [
        "Apply core domain tenets for Hierarchical Instruction Decomposition.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hierarchical Instruction Decomposition.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","hierarchical","instruction"],
    }),
  },

  "core-anchor-context-injection-grounding": {
    id: "core-anchor-context-injection-grounding",
    name: "AnchorContextInjectionGroundingSkill",
    displayName: "Anchor Context Injection & Grounding",
    categoryId: "core",
    description: "Anchors reasoning strictly to provided source documents without external memory leak.",
    tags: ["core","core","anchor","context"],
    transform: createStandardSkillTransform({
      sectionName: "Anchor Context Injection & Grounding Standards",
      ruSectionName: "Стандарты и регламенты: Anchor Context Injection & Grounding",
      instructions: [
        "Apply core domain tenets for Anchor Context Injection & Grounding.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Anchor Context Injection & Grounding.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","anchor","context"],
    }),
  },

  "core-iterative-refinement-self-correction-loop": {
    id: "core-iterative-refinement-self-correction-loop",
    name: "IterativeRefinementSelfCorrectionLoopSkill",
    displayName: "Iterative Refinement Self-Correction Loop",
    categoryId: "core",
    description: "Executes an internal verification pass before outputting final response payloads.",
    tags: ["core","core","iterative","refinement"],
    transform: createStandardSkillTransform({
      sectionName: "Iterative Refinement Self-Correction Loop Standards",
      ruSectionName: "Стандарты и регламенты: Iterative Refinement Self-Correction Loop",
      instructions: [
        "Apply core domain tenets for Iterative Refinement Self-Correction Loop.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Iterative Refinement Self-Correction Loop.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","iterative","refinement"],
    }),
  },

  "core-deterministic-variables-interpolation-template": {
    id: "core-deterministic-variables-interpolation-template",
    name: "DeterministicVariablesInterpolationTemplateSkill",
    displayName: "Deterministic Variables Interpolation Template",
    categoryId: "core",
    description: "Uses strict `{{variable_name}}` placeholders for dynamic runtime data binding.",
    tags: ["core","core","deterministic","variables"],
    transform: createStandardSkillTransform({
      sectionName: "Deterministic Variables Interpolation Template Standards",
      ruSectionName: "Стандарты и регламенты: Deterministic Variables Interpolation Template",
      instructions: [
        "Apply core domain tenets for Deterministic Variables Interpolation Template.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Deterministic Variables Interpolation Template.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","deterministic","variables"],
    }),
  },

  "core-preamble-metadata-header-protocol": {
    id: "core-preamble-metadata-header-protocol",
    name: "PreambleMetadataHeaderProtocolSkill",
    displayName: "Preamble & Metadata Header Protocol",
    categoryId: "core",
    description: "Standardizes document meta-tags, timestamps, and execution context blocks.",
    tags: ["core","core","preamble","metadata"],
    transform: createStandardSkillTransform({
      sectionName: "Preamble & Metadata Header Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Preamble & Metadata Header Protocol",
      instructions: [
        "Apply core domain tenets for Preamble & Metadata Header Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Preamble & Metadata Header Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","preamble","metadata"],
    }),
  },

  "core-sovereign-task-authority-tone-elevation": {
    id: "core-sovereign-task-authority-tone-elevation",
    name: "SovereignTaskAuthorityToneElevationSkill",
    displayName: "Sovereign Task Authority & Tone Elevation",
    categoryId: "core",
    description: "Establishes authoritative domain expertise and decisive professional judgment.",
    tags: ["core","core","sovereign","task"],
    transform: createStandardSkillTransform({
      sectionName: "Sovereign Task Authority & Tone Elevation Standards",
      ruSectionName: "Стандарты и регламенты: Sovereign Task Authority & Tone Elevation",
      instructions: [
        "Apply core domain tenets for Sovereign Task Authority & Tone Elevation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sovereign Task Authority & Tone Elevation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","sovereign","task"],
    }),
  },

  "core-edge-case-exception-handling-matrix": {
    id: "core-edge-case-exception-handling-matrix",
    name: "EdgeCaseExceptionHandlingMatrixSkill",
    displayName: "Edge Case & Exception Handling Matrix",
    categoryId: "core",
    description: "Pre-defines handling behavior for missing data, null values, and edge anomalies.",
    tags: ["core","core","edge","case"],
    transform: createStandardSkillTransform({
      sectionName: "Edge Case & Exception Handling Matrix Standards",
      ruSectionName: "Стандарты и регламенты: Edge Case & Exception Handling Matrix",
      instructions: [
        "Apply core domain tenets for Edge Case & Exception Handling Matrix.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Edge Case & Exception Handling Matrix.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","edge","case"],
    }),
  },

  "core-multi-document-source-disambiguation": {
    id: "core-multi-document-source-disambiguation",
    name: "MultiDocumentSourceDisambiguationSkill",
    displayName: "Multi-Document Source Disambiguation",
    categoryId: "core",
    description: "Resolves conflicting facts across multiple input sources via explicit provenance weighting.",
    tags: ["core","core","multi","document"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Document Source Disambiguation Standards",
      ruSectionName: "Стандарты и регламенты: Multi-Document Source Disambiguation",
      instructions: [
        "Apply core domain tenets for Multi-Document Source Disambiguation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Multi-Document Source Disambiguation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","multi","document"],
    }),
  },

  "core-strict-input-payload-schema-validation": {
    id: "core-strict-input-payload-schema-validation",
    name: "StrictInputPayloadSchemaValidationSkill",
    displayName: "Strict Input Payload Schema Validation",
    categoryId: "core",
    description: "Validates incoming JSON/YAML payloads against structural type definitions before processing.",
    tags: ["core","core","strict","input"],
    transform: createStandardSkillTransform({
      sectionName: "Strict Input Payload Schema Validation Standards",
      ruSectionName: "Стандарты и регламенты: Strict Input Payload Schema Validation",
      instructions: [
        "Apply core domain tenets for Strict Input Payload Schema Validation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Strict Input Payload Schema Validation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","strict","input"],
    }),
  },

  "core-prompt-versioning-migration-tagging": {
    id: "core-prompt-versioning-migration-tagging",
    name: "PromptVersioningMigrationTaggingSkill",
    displayName: "Prompt Versioning & Migration Tagging",
    categoryId: "core",
    description: "Embeds semantic version identifiers (`v2.4.0`) to track instruction updates.",
    tags: ["core","core","prompt","versioning"],
    transform: createStandardSkillTransform({
      sectionName: "Prompt Versioning & Migration Tagging Standards",
      ruSectionName: "Стандарты и регламенты: Prompt Versioning & Migration Tagging",
      instructions: [
        "Apply core domain tenets for Prompt Versioning & Migration Tagging.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Prompt Versioning & Migration Tagging.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","prompt","versioning"],
    }),
  },

  "core-conversational-history-window-pruning": {
    id: "core-conversational-history-window-pruning",
    name: "ConversationalHistoryWindowPruningSkill",
    displayName: "Conversational History Window Pruning",
    categoryId: "core",
    description: "Summarizes and truncates old chat turns to maintain fast response generation.",
    tags: ["core","core","conversational","history"],
    transform: createStandardSkillTransform({
      sectionName: "Conversational History Window Pruning Standards",
      ruSectionName: "Стандарты и регламенты: Conversational History Window Pruning",
      instructions: [
        "Apply core domain tenets for Conversational History Window Pruning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Conversational History Window Pruning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","conversational","history"],
    }),
  },

  "core-tone-modulation-audience-adaptation": {
    id: "core-tone-modulation-audience-adaptation",
    name: "ToneModulationAudienceAdaptationSkill",
    displayName: "Tone Modulation & Audience Adaptation",
    categoryId: "core",
    description: "Adjusts technical complexity dynamically based on target audience persona.",
    tags: ["core","core","tone","modulation"],
    transform: createStandardSkillTransform({
      sectionName: "Tone Modulation & Audience Adaptation Standards",
      ruSectionName: "Стандарты и регламенты: Tone Modulation & Audience Adaptation",
      instructions: [
        "Apply core domain tenets for Tone Modulation & Audience Adaptation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Tone Modulation & Audience Adaptation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","tone","modulation"],
    }),
  },

  "core-task-success-criteria-verification-rubric": {
    id: "core-task-success-criteria-verification-rubric",
    name: "TaskSuccessCriteriaVerificationRubricSkill",
    displayName: "Task Success Criteria & Verification Rubric",
    categoryId: "core",
    description: "Lists explicit test conditions that must pass for the output to be considered valid.",
    tags: ["core","core","task","success"],
    transform: createStandardSkillTransform({
      sectionName: "Task Success Criteria & Verification Rubric Standards",
      ruSectionName: "Стандарты и регламенты: Task Success Criteria & Verification Rubric",
      instructions: [
        "Apply core domain tenets for Task Success Criteria & Verification Rubric.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Task Success Criteria & Verification Rubric.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","task","success"],
    }),
  },

  "core-language-localization-cultural-adaptation": {
    id: "core-language-localization-cultural-adaptation",
    name: "LanguageLocalizationCulturalAdaptationSkill",
    displayName: "Language Localization & Cultural Adaptation",
    categoryId: "core",
    description: "Adapts idioms, date formats, and currencies to target locale expectations.",
    tags: ["core","core","language","localization"],
    transform: createStandardSkillTransform({
      sectionName: "Language Localization & Cultural Adaptation Standards",
      ruSectionName: "Стандарты и регламенты: Language Localization & Cultural Adaptation",
      instructions: [
        "Apply core domain tenets for Language Localization & Cultural Adaptation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Language Localization & Cultural Adaptation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","language","localization"],
    }),
  },

  "core-system-prompt-override-guard": {
    id: "core-system-prompt-override-guard",
    name: "SystemPromptOverrideGuardSkill",
    displayName: "System Prompt Override Guard",
    categoryId: "core",
    description: "Protects core system instructions from user-prompt injection and tampering.",
    tags: ["core","core","system","prompt"],
    transform: createStandardSkillTransform({
      sectionName: "System Prompt Override Guard Standards",
      ruSectionName: "Стандарты и регламенты: System Prompt Override Guard",
      instructions: [
        "Apply core domain tenets for System Prompt Override Guard.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для System Prompt Override Guard.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","system","prompt"],
    }),
  },

  "core-multi-step-workflow-sequence-anchor": {
    id: "core-multi-step-workflow-sequence-anchor",
    name: "MultiStepWorkflowSequenceAnchorSkill",
    displayName: "Multi-Step Workflow Sequence Anchor",
    categoryId: "core",
    description: "Enforces strict step-by-step progress tracking across multi-turn interactions.",
    tags: ["core","core","multi","step"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Step Workflow Sequence Anchor Standards",
      ruSectionName: "Стандарты и регламенты: Multi-Step Workflow Sequence Anchor",
      instructions: [
        "Apply core domain tenets for Multi-Step Workflow Sequence Anchor.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Multi-Step Workflow Sequence Anchor.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","multi","step"],
    }),
  },

  "core-fallback-response-template-specification": {
    id: "core-fallback-response-template-specification",
    name: "FallbackResponseTemplateSpecificationSkill",
    displayName: "Fallback Response Template Specification",
    categoryId: "core",
    description: "Defines safe, informative fallback responses when primary generation fails.",
    tags: ["core","core","fallback","response"],
    transform: createStandardSkillTransform({
      sectionName: "Fallback Response Template Specification Standards",
      ruSectionName: "Стандарты и регламенты: Fallback Response Template Specification",
      instructions: [
        "Apply core domain tenets for Fallback Response Template Specification.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Fallback Response Template Specification.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","fallback","response"],
    }),
  },

  "core-semantic-entity-disambiguation-rule": {
    id: "core-semantic-entity-disambiguation-rule",
    name: "SemanticEntityDisambiguationRuleSkill",
    displayName: "Semantic Entity Disambiguation Rule",
    categoryId: "core",
    description: "Clarifies ambiguous terms (e.g. Apple company vs fruit) before generating response.",
    tags: ["core","core","semantic","entity"],
    transform: createStandardSkillTransform({
      sectionName: "Semantic Entity Disambiguation Rule Standards",
      ruSectionName: "Стандарты и регламенты: Semantic Entity Disambiguation Rule",
      instructions: [
        "Apply core domain tenets for Semantic Entity Disambiguation Rule.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Semantic Entity Disambiguation Rule.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","semantic","entity"],
    }),
  },

  "core-interactive-clarification-prompt-trigger": {
    id: "core-interactive-clarification-prompt-trigger",
    name: "InteractiveClarificationPromptTriggerSkill",
    displayName: "Interactive Clarification Prompt Trigger",
    categoryId: "core",
    description: "Asks targeted follow-up questions when user input is insufficient or ambiguous.",
    tags: ["core","core","interactive","clarification"],
    transform: createStandardSkillTransform({
      sectionName: "Interactive Clarification Prompt Trigger Standards",
      ruSectionName: "Стандарты и регламенты: Interactive Clarification Prompt Trigger",
      instructions: [
        "Apply core domain tenets for Interactive Clarification Prompt Trigger.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Interactive Clarification Prompt Trigger.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","interactive","clarification"],
    }),
  },

  "core-multi-perspective-balanced-synthesis": {
    id: "core-multi-perspective-balanced-synthesis",
    name: "MultiPerspectiveBalancedSynthesisSkill",
    displayName: "Multi-Perspective Balanced Synthesis",
    categoryId: "core",
    description: "Presents opposing viewpoints fairly before articulating a grounded recommendation.",
    tags: ["core","core","multi","perspective"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Perspective Balanced Synthesis Standards",
      ruSectionName: "Стандарты и регламенты: Multi-Perspective Balanced Synthesis",
      instructions: [
        "Apply core domain tenets for Multi-Perspective Balanced Synthesis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Multi-Perspective Balanced Synthesis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","multi","perspective"],
    }),
  },

  "core-uncertainty-confidence-level-quantification": {
    id: "core-uncertainty-confidence-level-quantification",
    name: "UncertaintyConfidenceLevelQuantificationSkill",
    displayName: "Uncertainty & Confidence Level Quantification",
    categoryId: "core",
    description: "Annotates statements with explicit confidence ratings (High / Medium / Low).",
    tags: ["core","core","uncertainty","confidence"],
    transform: createStandardSkillTransform({
      sectionName: "Uncertainty & Confidence Level Quantification Standards",
      ruSectionName: "Стандарты и регламенты: Uncertainty & Confidence Level Quantification",
      instructions: [
        "Apply core domain tenets for Uncertainty & Confidence Level Quantification.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Uncertainty & Confidence Level Quantification.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","uncertainty","confidence"],
    }),
  },

  "core-summary-first-executive-structure-bluf": {
    id: "core-summary-first-executive-structure-bluf",
    name: "SummaryFirstExecutiveStructureBLUFSkill",
    displayName: "Summary-First Executive Structure (BLUF)",
    categoryId: "core",
    description: "Leads with Bottom Line Up Front before detailing supporting evidence.",
    tags: ["core","core","summary","first"],
    transform: createStandardSkillTransform({
      sectionName: "Summary-First Executive Structure (BLUF) Standards",
      ruSectionName: "Стандарты и регламенты: Summary-First Executive Structure (BLUF)",
      instructions: [
        "Apply core domain tenets for Summary-First Executive Structure (BLUF).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Summary-First Executive Structure (BLUF).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","summary","first"],
    }),
  },

  "core-explicit-assumptions-listing": {
    id: "core-explicit-assumptions-listing",
    name: "ExplicitAssumptionsListingSkill",
    displayName: "Explicit Assumptions Listing",
    categoryId: "core",
    description: "States all underlying assumptions made when working with incomplete user prompts.",
    tags: ["core","core","explicit","assumptions"],
    transform: createStandardSkillTransform({
      sectionName: "Explicit Assumptions Listing Standards",
      ruSectionName: "Стандарты и регламенты: Explicit Assumptions Listing",
      instructions: [
        "Apply core domain tenets for Explicit Assumptions Listing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Explicit Assumptions Listing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","explicit","assumptions"],
    }),
  },

  "core-token-budget-allocation-chunking": {
    id: "core-token-budget-allocation-chunking",
    name: "TokenBudgetAllocationChunkingSkill",
    displayName: "Token Budget Allocation & Chunking",
    categoryId: "core",
    description: "Distributes available token length strategically across analysis, reasoning, and output.",
    tags: ["core","core","token","budget"],
    transform: createStandardSkillTransform({
      sectionName: "Token Budget Allocation & Chunking Standards",
      ruSectionName: "Стандарты и регламенты: Token Budget Allocation & Chunking",
      instructions: [
        "Apply core domain tenets for Token Budget Allocation & Chunking.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Token Budget Allocation & Chunking.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","token","budget"],
    }),
  },

  "core-strict-fact-checking-citation-constraint": {
    id: "core-strict-fact-checking-citation-constraint",
    name: "StrictFactCheckingCitationConstraintSkill",
    displayName: "Strict Fact-Checking Citation Constraint",
    categoryId: "core",
    description: "Mandates inline citations for all factual assertions back to source text.",
    tags: ["core","core","strict","fact"],
    transform: createStandardSkillTransform({
      sectionName: "Strict Fact-Checking Citation Constraint Standards",
      ruSectionName: "Стандарты и регламенты: Strict Fact-Checking Citation Constraint",
      instructions: [
        "Apply core domain tenets for Strict Fact-Checking Citation Constraint.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Strict Fact-Checking Citation Constraint.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","strict","fact"],
    }),
  },

  "core-jargon-to-plain-language-translation": {
    id: "core-jargon-to-plain-language-translation",
    name: "JargontoPlainLanguageTranslationSkill",
    displayName: "Jargon-to-Plain-Language Translation",
    categoryId: "core",
    description: "Translates complex domain terminology into accessible everyday explanations.",
    tags: ["core","core","jargon","to"],
    transform: createStandardSkillTransform({
      sectionName: "Jargon-to-Plain-Language Translation Standards",
      ruSectionName: "Стандарты и регламенты: Jargon-to-Plain-Language Translation",
      instructions: [
        "Apply core domain tenets for Jargon-to-Plain-Language Translation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Jargon-to-Plain-Language Translation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","jargon","to"],
    }),
  },

  "core-structured-markdown-document-architecture": {
    id: "core-structured-markdown-document-architecture",
    name: "StructuredMarkdownDocumentArchitectureSkill",
    displayName: "Structured Markdown Document Architecture",
    categoryId: "core",
    description: "Applies consistent heading levels (# H1, ## H2, ### H3) and visual callouts.",
    tags: ["core","core","structured","markdown"],
    transform: createStandardSkillTransform({
      sectionName: "Structured Markdown Document Architecture Standards",
      ruSectionName: "Стандарты и регламенты: Structured Markdown Document Architecture",
      instructions: [
        "Apply core domain tenets for Structured Markdown Document Architecture.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Structured Markdown Document Architecture.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","structured","markdown"],
    }),
  },

  "core-anti-repetition-prose-conciseness": {
    id: "core-anti-repetition-prose-conciseness",
    name: "AntiRepetitionProseConcisenessSkill",
    displayName: "Anti-Repetition & Prose Conciseness",
    categoryId: "core",
    description: "Eliminates redundant phrasing and filler words for maximum density.",
    tags: ["core","core","anti","repetition"],
    transform: createStandardSkillTransform({
      sectionName: "Anti-Repetition & Prose Conciseness Standards",
      ruSectionName: "Стандарты и регламенты: Anti-Repetition & Prose Conciseness",
      instructions: [
        "Apply core domain tenets for Anti-Repetition & Prose Conciseness.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Anti-Repetition & Prose Conciseness.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","anti","repetition"],
    }),
  },

  "core-socratic-guided-discovery-prompt": {
    id: "core-socratic-guided-discovery-prompt",
    name: "SocraticGuidedDiscoveryPromptSkill",
    displayName: "Socratic Guided Discovery Prompt",
    categoryId: "core",
    description: "Guides the user to discover solutions through targeted probing questions.",
    tags: ["core","core","socratic","guided"],
    transform: createStandardSkillTransform({
      sectionName: "Socratic Guided Discovery Prompt Standards",
      ruSectionName: "Стандарты и регламенты: Socratic Guided Discovery Prompt",
      instructions: [
        "Apply core domain tenets for Socratic Guided Discovery Prompt.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Socratic Guided Discovery Prompt.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","socratic","guided"],
    }),
  },

  "core-parallel-options-comparison-table": {
    id: "core-parallel-options-comparison-table",
    name: "ParallelOptionsComparisonTableSkill",
    displayName: "Parallel Options Comparison Table",
    categoryId: "core",
    description: "Presents trade-offs across multiple choices in a side-by-side structured matrix.",
    tags: ["core","core","parallel","options"],
    transform: createStandardSkillTransform({
      sectionName: "Parallel Options Comparison Table Standards",
      ruSectionName: "Стандарты и регламенты: Parallel Options Comparison Table",
      instructions: [
        "Apply core domain tenets for Parallel Options Comparison Table.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Parallel Options Comparison Table.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","parallel","options"],
    }),
  },

  "core-contextual-memory-tagging-recall": {
    id: "core-contextual-memory-tagging-recall",
    name: "ContextualMemoryTaggingRecallSkill",
    displayName: "Contextual Memory Tagging & Recall",
    categoryId: "core",
    description: "Tags key user preferences to recall consistently across extended sessions.",
    tags: ["core","core","contextual","memory"],
    transform: createStandardSkillTransform({
      sectionName: "Contextual Memory Tagging & Recall Standards",
      ruSectionName: "Стандарты и регламенты: Contextual Memory Tagging & Recall",
      instructions: [
        "Apply core domain tenets for Contextual Memory Tagging & Recall.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Contextual Memory Tagging & Recall.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","contextual","memory"],
    }),
  },

  "core-role-based-access-information-gating": {
    id: "core-role-based-access-information-gating",
    name: "RoleBasedAccessInformationGatingSkill",
    displayName: "Role-Based Access & Information Gating",
    categoryId: "core",
    description: "Restricts sensitive data disclosures according to user authorization level.",
    tags: ["core","core","role","based"],
    transform: createStandardSkillTransform({
      sectionName: "Role-Based Access & Information Gating Standards",
      ruSectionName: "Стандарты и регламенты: Role-Based Access & Information Gating",
      instructions: [
        "Apply core domain tenets for Role-Based Access & Information Gating.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Role-Based Access & Information Gating.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","role","based"],
    }),
  },

  "core-action-oriented-verbs-directives": {
    id: "core-action-oriented-verbs-directives",
    name: "ActionOrientedVerbsDirectivesSkill",
    displayName: "Action-Oriented Verbs & Directives",
    categoryId: "core",
    description: "Replaces passive commentary with active, imperative step-by-step guidance.",
    tags: ["core","core","action","oriented"],
    transform: createStandardSkillTransform({
      sectionName: "Action-Oriented Verbs & Directives Standards",
      ruSectionName: "Стандарты и регламенты: Action-Oriented Verbs & Directives",
      instructions: [
        "Apply core domain tenets for Action-Oriented Verbs & Directives.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Action-Oriented Verbs & Directives.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","action","oriented"],
    }),
  },

  "core-data-anonymization-pii-redaction": {
    id: "core-data-anonymization-pii-redaction",
    name: "DataAnonymizationPIIRedactionSkill",
    displayName: "Data Anonymization & PII Redaction",
    categoryId: "core",
    description: "Replaces sensitive names, emails, and numbers with generic placeholders.",
    tags: ["core","core","data","anonymization"],
    transform: createStandardSkillTransform({
      sectionName: "Data Anonymization & PII Redaction Standards",
      ruSectionName: "Стандарты и регламенты: Data Anonymization & PII Redaction",
      instructions: [
        "Apply core domain tenets for Data Anonymization & PII Redaction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Data Anonymization & PII Redaction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","data","anonymization"],
    }),
  },

  "core-comparative-benchmark-evaluation": {
    id: "core-comparative-benchmark-evaluation",
    name: "ComparativeBenchmarkEvaluationSkill",
    displayName: "Comparative Benchmark Evaluation",
    categoryId: "core",
    description: "Evaluates proposed solutions against industry gold-standard benchmarks.",
    tags: ["core","core","comparative","benchmark"],
    transform: createStandardSkillTransform({
      sectionName: "Comparative Benchmark Evaluation Standards",
      ruSectionName: "Стандарты и регламенты: Comparative Benchmark Evaluation",
      instructions: [
        "Apply core domain tenets for Comparative Benchmark Evaluation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Comparative Benchmark Evaluation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","comparative","benchmark"],
    }),
  },

  "core-dynamic-depth-scaling-brief-vs-exhaustive": {
    id: "core-dynamic-depth-scaling-brief-vs-exhaustive",
    name: "DynamicDepthScalingBriefvsExhaustiveSkill",
    displayName: "Dynamic Depth Scaling (Brief vs Exhaustive)",
    categoryId: "core",
    description: "Adjusts detail level based on user-requested verbosity flags.",
    tags: ["core","core","dynamic","depth"],
    transform: createStandardSkillTransform({
      sectionName: "Dynamic Depth Scaling (Brief vs Exhaustive) Standards",
      ruSectionName: "Стандарты и регламенты: Dynamic Depth Scaling (Brief vs Exhaustive)",
      instructions: [
        "Apply core domain tenets for Dynamic Depth Scaling (Brief vs Exhaustive).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Dynamic Depth Scaling (Brief vs Exhaustive).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","dynamic","depth"],
    }),
  },

  "core-modular-section-re-assembly": {
    id: "core-modular-section-re-assembly",
    name: "ModularSectionReAssemblySkill",
    displayName: "Modular Section Re-Assembly",
    categoryId: "core",
    description: "Organizes output into independent, reusable modules for easy copy-pasting.",
    tags: ["core","core","modular","section"],
    transform: createStandardSkillTransform({
      sectionName: "Modular Section Re-Assembly Standards",
      ruSectionName: "Стандарты и регламенты: Modular Section Re-Assembly",
      instructions: [
        "Apply core domain tenets for Modular Section Re-Assembly.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Modular Section Re-Assembly.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","modular","section"],
    }),
  },

  "core-task-pre-flight-sanity-check": {
    id: "core-task-pre-flight-sanity-check",
    name: "TaskPreFlightSanityCheckSkill",
    displayName: "Task Pre-Flight Sanity Check",
    categoryId: "core",
    description: "Scans input data for glaring errors or contradictions before starting execution.",
    tags: ["core","core","task","pre"],
    transform: createStandardSkillTransform({
      sectionName: "Task Pre-Flight Sanity Check Standards",
      ruSectionName: "Стандарты и регламенты: Task Pre-Flight Sanity Check",
      instructions: [
        "Apply core domain tenets for Task Pre-Flight Sanity Check.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Task Pre-Flight Sanity Check.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","task","pre"],
    }),
  },

  "core-root-cause-problem-reframing": {
    id: "core-root-cause-problem-reframing",
    name: "RootCauseProblemReframingSkill",
    displayName: "Root Cause Problem Reframing",
    categoryId: "core",
    description: "Reframes surface-level user requests to address underlying systemic issues.",
    tags: ["core","core","root","cause"],
    transform: createStandardSkillTransform({
      sectionName: "Root Cause Problem Reframing Standards",
      ruSectionName: "Стандарты и регламенты: Root Cause Problem Reframing",
      instructions: [
        "Apply core domain tenets for Root Cause Problem Reframing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Root Cause Problem Reframing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","root","cause"],
    }),
  },

  "core-time-horizon-categorization-immediate-vs-long-term": {
    id: "core-time-horizon-categorization-immediate-vs-long-term",
    name: "TimeHorizonCategorizationImmediatevsLongTermSkill",
    displayName: "Time Horizon Categorization (Immediate vs Long-Term)",
    categoryId: "core",
    description: "Categorizes action items by implementation timeframe and urgency.",
    tags: ["core","core","time","horizon"],
    transform: createStandardSkillTransform({
      sectionName: "Time Horizon Categorization (Immediate vs Long-Term) Standards",
      ruSectionName: "Стандарты и регламенты: Time Horizon Categorization (Immediate vs Long-Term)",
      instructions: [
        "Apply core domain tenets for Time Horizon Categorization (Immediate vs Long-Term).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Time Horizon Categorization (Immediate vs Long-Term).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","time","horizon"],
    }),
  },

  "core-cross-functional-domain-bridging": {
    id: "core-cross-functional-domain-bridging",
    name: "CrossFunctionalDomainBridgingSkill",
    displayName: "Cross-Functional Domain Bridging",
    categoryId: "core",
    description: "Translates technical engineering requirements into business value terms.",
    tags: ["core","core","cross","functional"],
    transform: createStandardSkillTransform({
      sectionName: "Cross-Functional Domain Bridging Standards",
      ruSectionName: "Стандарты и регламенты: Cross-Functional Domain Bridging",
      instructions: [
        "Apply core domain tenets for Cross-Functional Domain Bridging.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cross-Functional Domain Bridging.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","cross","functional"],
    }),
  },

  "core-hypothetical-scenario-simulation": {
    id: "core-hypothetical-scenario-simulation",
    name: "HypotheticalScenarioSimulationSkill",
    displayName: "Hypothetical Scenario Simulation",
    categoryId: "core",
    description: "Explores 'What-If' scenarios to stress-test proposed strategic decisions.",
    tags: ["core","core","hypothetical","scenario"],
    transform: createStandardSkillTransform({
      sectionName: "Hypothetical Scenario Simulation Standards",
      ruSectionName: "Стандарты и регламенты: Hypothetical Scenario Simulation",
      instructions: [
        "Apply core domain tenets for Hypothetical Scenario Simulation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hypothetical Scenario Simulation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","hypothetical","scenario"],
    }),
  },

  "core-standard-operating-procedure-sop-drafting": {
    id: "core-standard-operating-procedure-sop-drafting",
    name: "StandardOperatingProcedureSOPDraftingSkill",
    displayName: "Standard Operating Procedure (SOP) Drafting",
    categoryId: "core",
    description: "Converts informal workflows into formalized, repeatable SOP documents.",
    tags: ["core","core","standard","operating"],
    transform: createStandardSkillTransform({
      sectionName: "Standard Operating Procedure (SOP) Drafting Standards",
      ruSectionName: "Стандарты и регламенты: Standard Operating Procedure (SOP) Drafting",
      instructions: [
        "Apply core domain tenets for Standard Operating Procedure (SOP) Drafting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Standard Operating Procedure (SOP) Drafting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","standard","operating"],
    }),
  },

  "core-visual-flowchart-text-representation": {
    id: "core-visual-flowchart-text-representation",
    name: "VisualFlowchartTextRepresentationSkill",
    displayName: "Visual Flowchart Text Representation",
    categoryId: "core",
    description: "Renders complex logic flows in ASCII or Mermaid diagram syntax.",
    tags: ["core","core","visual","flowchart"],
    transform: createStandardSkillTransform({
      sectionName: "Visual Flowchart Text Representation Standards",
      ruSectionName: "Стандарты и регламенты: Visual Flowchart Text Representation",
      instructions: [
        "Apply core domain tenets for Visual Flowchart Text Representation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Visual Flowchart Text Representation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","visual","flowchart"],
    }),
  },

  "core-executive-elevator-pitch-synthesis": {
    id: "core-executive-elevator-pitch-synthesis",
    name: "ExecutiveElevatorPitchSynthesisSkill",
    displayName: "Executive Elevator Pitch Synthesis",
    categoryId: "core",
    description: "Distills complex proposals into a 30-second compelling verbal pitch.",
    tags: ["core","core","executive","elevator"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Elevator Pitch Synthesis Standards",
      ruSectionName: "Стандарты и регламенты: Executive Elevator Pitch Synthesis",
      instructions: [
        "Apply core domain tenets for Executive Elevator Pitch Synthesis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Executive Elevator Pitch Synthesis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","executive","elevator"],
    }),
  },

  "core-risk-assessment-mitigation-matrix": {
    id: "core-risk-assessment-mitigation-matrix",
    name: "RiskAssessmentMitigationMatrixSkill",
    displayName: "Risk Assessment & Mitigation Matrix",
    categoryId: "core",
    description: "Identifies potential failure modes and pairs each with an action plan.",
    tags: ["core","core","risk","assessment"],
    transform: createStandardSkillTransform({
      sectionName: "Risk Assessment & Mitigation Matrix Standards",
      ruSectionName: "Стандарты и регламенты: Risk Assessment & Mitigation Matrix",
      instructions: [
        "Apply core domain tenets for Risk Assessment & Mitigation Matrix.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Risk Assessment & Mitigation Matrix.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","risk","assessment"],
    }),
  },

  "core-continuous-alignment-checkpoint": {
    id: "core-continuous-alignment-checkpoint",
    name: "ContinuousAlignmentCheckpointSkill",
    displayName: "Continuous Alignment Checkpoint",
    categoryId: "core",
    description: "Inserts periodic confirmation prompts during long multi-step generations.",
    tags: ["core","core","continuous","alignment"],
    transform: createStandardSkillTransform({
      sectionName: "Continuous Alignment Checkpoint Standards",
      ruSectionName: "Стандарты и регламенты: Continuous Alignment Checkpoint",
      instructions: [
        "Apply core domain tenets for Continuous Alignment Checkpoint.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Continuous Alignment Checkpoint.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","continuous","alignment"],
    }),
  },

  "core-final-deliverable-polish-quality-pass": {
    id: "core-final-deliverable-polish-quality-pass",
    name: "FinalDeliverablePolishQualityPassSkill",
    displayName: "Final Deliverable Polish & Quality Pass",
    categoryId: "core",
    description: "Performs final proofreading, formatting verification, and link checks.",
    tags: ["core","core","final","deliverable"],
    transform: createStandardSkillTransform({
      sectionName: "Final Deliverable Polish & Quality Pass Standards",
      ruSectionName: "Стандарты и регламенты: Final Deliverable Polish & Quality Pass",
      instructions: [
        "Apply core domain tenets for Final Deliverable Polish & Quality Pass.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Final Deliverable Polish & Quality Pass.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["core","core","final","deliverable"],
    }),
  },
};
