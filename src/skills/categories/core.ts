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
};
