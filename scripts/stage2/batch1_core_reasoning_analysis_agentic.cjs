const { appendSkills } = require('../appendSkills.cjs');

const CORE_NEW = [
  {
    id: "context-boundary-demarcation",
    name: "ContextBoundaryDemarcationSkill",
    displayName: "Context Boundary Demarcation & Isolation",
    categoryId: "core",
    description: "Explicitly delineates strict epistemic and operational boundaries to prevent context contamination.",
    tags: ["core", "boundary", "isolation", "epistemic", "context"],
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
    semanticType: "constraints"
  },
  {
    id: "zero-assumption-auditing",
    name: "ZeroAssumptionAuditingSkill",
    displayName: "Zero-Assumption Epistemic Audit",
    categoryId: "core",
    description: "Systematically surfaces hidden premises and refuses tacit unverified assumptions in {{task}}.",
    tags: ["core", "assumptions", "epistemics", "audit", "rigor"],
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
    semanticType: "guardrail_directive"
  },
  {
    id: "falsification-criteria-specification",
    name: "FalsificationCriteriaSpecificationSkill",
    displayName: "Popperian Falsification & Disproof Metric",
    categoryId: "core",
    description: "Defines concrete, empirical failure conditions that would prove the proposed approach incorrect.",
    tags: ["core", "falsification", "popper", "scientific-method", "validation"],
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
    semanticType: "compliance_directive"
  },
  {
    id: "invariant-conservation-law",
    name: "InvariantConservationLawSkill",
    displayName: "System Invariant Conservation Law",
    categoryId: "core",
    description: "Defines mathematical and state invariants that must remain strictly conserved during transformation.",
    tags: ["core", "invariants", "conservation", "formal-methods", "integrity"],
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
    semanticType: "protocol"
  },
  {
    id: "cognitive-load-budgeting",
    name: "CognitiveLoadBudgetingSkill",
    displayName: "Cognitive Load Budgeting & Ergonomics",
    categoryId: "core",
    description: "Restricts mental friction by enforcing Miller's Law (7±2 chunks), scannability, and high ergonomics.",
    tags: ["core", "ergonomics", "cognitive-load", "clarity", "ux"],
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
    semanticType: "process_directive"
  },
  {
    id: "operational-definition-grounding",
    name: "OperationalDefinitionGroundingSkill",
    displayName: "Bridgman Operational Definition Grounding",
    categoryId: "core",
    description: "Replaces vague subjective jargon with concrete, measurable physical and procedural definitions.",
    tags: ["core", "operational-definition", "clarity", "precision", "semantics"],
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
    semanticType: "protocol"
  },
  {
    id: "orthogonal-decomposition-matrix",
    name: "OrthogonalDecompositionMatrixSkill",
    displayName: "Orthogonal MECE Decomposition Matrix",
    categoryId: "core",
    description: "Deconstructs problem domains into Mutually Exclusive, Collectively Exhaustive orthogonal dimensions.",
    tags: ["core", "mece", "decomposition", "orthogonality", "matrix"],
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
    semanticType: "process_directive"
  },
  {
    id: "anti-fragile-stress-profiling",
    name: "AntiFragileStressProfilingSkill",
    displayName: "Taleb Anti-Fragile Stress Profiling",
    categoryId: "core",
    description: "Designs systems and prompts that gain strength, resilience, and clarity under extreme volatility.",
    tags: ["core", "taleb", "antifragile", "resilience", "volatility"],
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
    semanticType: "protocol"
  },
  {
    id: "first-order-vs-second-order-effects",
    name: "FirstOrderVsSecondOrderEffectsSkill",
    displayName: "Howard Marks Second-Order Thinking",
    categoryId: "core",
    description: "Evaluates immediate direct consequences vs delayed, systemic, and feedback-loop second-order effects.",
    tags: ["core", "second-order", "howard-marks", "systems-thinking", "strategy"],
    sectionName: "Second-Order & Systemic Consequences Audit",
    ruSectionName: "Аудит последствий второго и третьего порядков",
    instructions: [
      "Trace direct 1st-order effects ('What happens immediately?').",
      "Model 2nd and 3rd-order downstream chain reactions ('And then what? What feedback loops are triggered?').",
      "Identify unintended perverse incentives, resource starvation, or downstream architectural debt."
    ],
    ruInstructions: [
      "Зафиксируйте прямые последствия 1-го порядка (непосредственный мгновенный результат).",
      "Проанализируйте эффекты 2-го и 3-го порядков: «Что произойдет дальше? Какие петли обратной связи запустятся?».",
      "Выявите непреднамеренные негативные стимулы и отдаленный технический долг."
    ],
    semanticType: "process_directive"
  },
  {
    id: "parsimony-lexical-economy",
    name: "ParsimonyLexicalEconomySkill",
    displayName: "Radical Parsimony & Lexical Compression",
    categoryId: "core",
    description: "Maximizes semantic bandwidth while compressing token length and eliminating redundant synonyms.",
    tags: ["core", "parsimony", "compression", "conciseness", "token-economy"],
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
    semanticType: "constraints"
  },
  {
    id: "declarative-end-state-contract",
    name: "DeclarativeEndStateContractSkill",
    displayName: "Declarative End-State Specification Contract",
    categoryId: "core",
    description: "Specifies what the target world state must be rather than only how to reach it imperatively.",
    tags: ["core", "declarative", "contract", "state-machine", "invariants"],
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
    semanticType: "protocol"
  },
  {
    id: "epistemic-humility-uncertainty-bounds",
    name: "EpistemicHumilityUncertaintyBoundsSkill",
    displayName: "Epistemic Humility & Uncertainty Confidence Bounds",
    categoryId: "core",
    description: "Calibrates uncertainty boundaries, preventing overconfident hallucinations on ambiguous inputs.",
    tags: ["core", "uncertainty", "epistemics", "calibration", "anti-hallucination"],
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
    semanticType: "guardrail_directive"
  },
  {
    id: "symmetric-reversibility-check",
    name: "SymmetricReversibilityCheckSkill",
    displayName: "Symmetric Reversibility & Rollback Protocol",
    categoryId: "core",
    description: "Ensures every recommended architecture or action has an explicit, low-cost undo/rollback mechanism.",
    tags: ["core", "reversibility", "rollback", "two-way-door", "bezos"],
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
    semanticType: "process_directive"
  },
  {
    id: "root-cause-ishikawa-fishbone",
    name: "RootCauseIshikawaFishboneSkill",
    displayName: "Ishikawa Fishbone Root-Cause Diagramming",
    categoryId: "core",
    description: "Categorizes causal vectors across People, Methods, Machines, Materials, Measurement, and Environment.",
    tags: ["core", "ishikawa", "fishbone", "root-cause", "quality-engineering"],
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
    semanticType: "analysis_directive"
  },
  {
    id: "context-agnostic-modularity",
    name: "ContextAgnosticModularitySkill",
    displayName: "Context-Agnostic Component Modularity",
    categoryId: "core",
    description: "Structures outputs into plug-and-play decoupled components with minimal external surface area.",
    tags: ["core", "modularity", "coupling", "cohesion", "architecture"],
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
    semanticType: "protocol"
  },
  {
    id: "idempotency-key-enforcement",
    name: "IdempotencyKeyEnforcementSkill",
    displayName: "Idempotent Execution & Deduplication Guarantee",
    categoryId: "core",
    description: "Guarantees that repeating an execution N times yields the identical deterministic state as executing once.",
    tags: ["core", "idempotency", "determinism", "distributed-systems", "reliability"],
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
    semanticType: "protocol"
  },
  {
    id: "backwards-compatibility-contract",
    name: "BackwardsCompatibilityContractSkill",
    displayName: "Backwards Compatibility & Non-Breaking Evolution",
    categoryId: "core",
    description: "Preserves existing API contracts, schemas, and consumer expectations during continuous evolution.",
    tags: ["core", "backwards-compatibility", "api-evolution", "semver", "migration"],
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
    semanticType: "compliance_directive"
  },
  {
    id: "telemetry-observability-instrumentation",
    name: "TelemetryObservabilityInstrumentationSkill",
    displayName: "Deep Observability & Telemetry Instrumentation",
    categoryId: "core",
    description: "Embeds structured logs, RED metrics, and distributed tracing spans into architectural solutions.",
    tags: ["core", "observability", "telemetry", "opentelemetry", "metrics", "tracing"],
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
    semanticType: "protocol"
  },
  {
    id: "goldilocks-granularity-tuner",
    name: "GoldilocksGranularityTunerSkill",
    displayName: "Goldilocks Architectural Granularity Tuner",
    categoryId: "core",
    description: "Calibrates abstraction depth so output is neither excessively high-level nor drowned in minutiae.",
    tags: ["core", "granularity", "abstraction", "goldilocks", "precision"],
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
    semanticType: "process_directive"
  },
  {
    id: "computational-complexity-budget",
    name: "ComputationalComplexityBudgetSkill",
    displayName: "Big-O Time & Space Complexity Budget",
    categoryId: "core",
    description: "Enforces strict asymptotic runtime (O(1), O(N), O(N log N)) and memory footprint constraints.",
    tags: ["core", "big-o", "complexity", "algorithms", "performance"],
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
    semanticType: "constraints"
  },
  {
    id: "fault-domain-isolation-bulkhead",
    name: "FaultDomainIsolationBulkheadSkill",
    displayName: "Bulkhead Pattern & Fault-Domain Isolation",
    categoryId: "core",
    description: "Isolates failing subsystems into blast-proof compartments, preventing whole-system collapse.",
    tags: ["core", "bulkhead", "fault-tolerance", "isolation", "resilience"],
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
    semanticType: "protocol"
  },
  {
    id: "declarative-pre-and-post-conditions",
    name: "DeclarativePreAndPostConditionsSkill",
    displayName: "Meyer Design-by-Contract (Pre/Post/Invariants)",
    categoryId: "core",
    description: "Enforces Bertrand Meyer's Design by Contract with strict preconditions, postconditions, and class invariants.",
    tags: ["core", "design-by-contract", "eiffel", "meyer", "formal-spec"],
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
    semanticType: "compliance_directive"
  },
  {
    id: "zero-trust-boundary-validation",
    name: "ZeroTrustBoundaryValidationSkill",
    displayName: "Zero-Trust Perimeter & Input Boundary Sanitizer",
    categoryId: "core",
    description: "Treats all inputs originating beyond the immediate local scope as potentially hostile and untrusted.",
    tags: ["core", "zero-trust", "sanitization", "security", "validation"],
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
    semanticType: "guardrail_directive"
  },
  {
    id: "anti-bikeshedding-prioritizer",
    name: "AntiBikesheddingPrioritizerSkill",
    displayName: "Sayre & Parkinson Anti-Bikeshedding Filter",
    categoryId: "core",
    description: "Focuses discussion and architectural effort on high-impact structural decisions rather than cosmetic minutiae.",
    tags: ["core", "prioritization", "parkinson", "bikeshedding", "strategy"],
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
    semanticType: "process_directive"
  },
  {
    id: "graceful-degradation-fallback",
    name: "GracefulDegradationFallbackSkill",
    displayName: "Graceful Degradation & Degraded Mode Strategy",
    categoryId: "core",
    description: "Defines tiered degradation modes ensuring core functionality remains available when auxiliaries fail.",
    tags: ["core", "graceful-degradation", "fallback", "resilience", "availability"],
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
    semanticType: "protocol"
  },
  {
    id: "pareto-eighty-twenty-leverager",
    name: "ParetoEightyTwentyLeveragerSkill",
    displayName: "Pareto 80/20 Leverage & Core Vital Extraction",
    categoryId: "core",
    description: "Identifies the 20% of high-leverage architectural primitives that generate 80% of system value.",
    tags: ["core", "pareto", "leverage", "vital-few", "efficiency"],
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
    semanticType: "process_directive"
  },
  {
    id: "dependency-inversion-principle",
    name: "DependencyInversionPrincipleSkill",
    displayName: "SOLID Dependency Inversion & Port/Adapter Decoupling",
    categoryId: "core",
    description: "Ensures high-level business policy depends upon abstractions, not volatile low-level details.",
    tags: ["core", "solid", "dip", "hexagonal", "ports-adapters"],
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
    semanticType: "protocol"
  },
  {
    id: "single-source-of-truth-integrity",
    name: "SingleSourceOfTruthIntegritySkill",
    displayName: "Single Source of Truth (SSOT) Authority Law",
    categoryId: "core",
    description: "Eliminates redundant duplicated state, establishing one canonical authority for every domain fact.",
    tags: ["core", "ssot", "data-integrity", "normalization", "architecture"],
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
    semanticType: "protocol"
  },
  {
    id: "anti-conway-alignment-engine",
    name: "AntiConwayAlignmentEngineSkill",
    displayName: "Conway's Law & Inverse Conway Maneuver",
    categoryId: "core",
    description: "Aligns system architecture with desired team communication topologies to prevent structural friction.",
    tags: ["core", "conways-law", "team-topologies", "organization", "architecture"],
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
    semanticType: "analysis_directive"
  },
  {
    id: "defensive-programming-fail-fast",
    name: "DefensiveProgrammingFailFastSkill",
    displayName: "Fail-Fast & Defensive Assertion Architecture",
    categoryId: "core",
    description: "Halts execution immediately upon detecting unexpected state to prevent corrupted silent mutations.",
    tags: ["core", "fail-fast", "defensive", "assertions", "stability"],
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
    semanticType: "protocol"
  },
  {
    id: "strict-monolithic-vs-microservices-evaluator",
    name: "StrictMonolithicVsMicroservicesEvaluatorSkill",
    displayName: "Modular Monolith vs Distributed Services Matrix",
    categoryId: "core",
    description: "Evaluates architectural trade-offs between clean modular monoliths and microservice fabrics.",
    tags: ["core", "monolith", "microservices", "tradeoffs", "distributed-systems"],
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
    semanticType: "analysis_directive"
  },
  {
    id: "schema-evolution-contract-lock",
    name: "SchemaEvolutionContractLockSkill",
    displayName: "Protobuf/Avro Schema Evolution & Compatibility Lock",
    categoryId: "core",
    description: "Enforces strict backward and forward schema compatibility rules across data serialization formats.",
    tags: ["core", "schema", "protobuf", "avro", "compatibility", "serialization"],
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
    semanticType: "compliance_directive"
  },
  {
    id: "deadlock-prevention-total-ordering",
    name: "DeadlockPreventionTotalOrderingSkill",
    displayName: "Dijkstra Total Resource Ordering & Deadlock Prevention",
    categoryId: "core",
    description: "Prevents deadlocks by enforcing globally consistent strict acquisition ordering across all shared locks.",
    tags: ["core", "deadlock", "concurrency", "dijkstra", "locking"],
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
    semanticType: "protocol"
  },
  {
    id: "domain-driven-ubiquitous-language",
    name: "DomainDrivenUbiquitousLanguageSkill",
    displayName: "DDD Ubiquitous Language & Bounded Context Map",
    categoryId: "core",
    description: "Aligns software terminology precisely with business domain experts within strict bounded contexts.",
    tags: ["core", "ddd", "ubiquitous-language", "bounded-context", "domain-modeling"],
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
    semanticType: "protocol"
  },
  {
    id: "load-shedding-backpressure",
    name: "LoadSheddingBackpressureSkill",
    displayName: "Reactive Load-Shedding & Backpressure Defense",
    categoryId: "core",
    description: "Prevents catastrophic server meltdown by shedding low-priority traffic under queue saturation.",
    tags: ["core", "load-shedding", "backpressure", "queues", "resilience"],
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
    semanticType: "protocol"
  },
  {
    id: "hermetic-reproducibility-harness",
    name: "HermeticReproducibilityHarnessSkill",
    displayName: "Hermetic Build & Deterministic Reproducibility",
    categoryId: "core",
    description: "Ensures all outputs, builds, and calculations are 100% reproducible with zero hidden ambient dependencies.",
    tags: ["core", "hermetic", "reproducibility", "determinism", "isolation"],
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
    semanticType: "compliance_directive"
  },
  {
    id: "anti-pattern-code-smell-scanner",
    name: "AntiPatternCodeSmellScannerSkill",
    displayName: "Refactoring Code Smell & Architectural Anti-Pattern Scanner",
    categoryId: "core",
    description: "Scans designs for God Objects, Feature Envy, Long Parameter Lists, and Shotgun Surgery.",
    tags: ["core", "code-smells", "anti-patterns", "refactoring", "clean-code"],
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
    semanticType: "analysis_directive"
  },
  {
    id: "cap-theorem-consistency-tradeoff",
    name: "CapTheoremConsistencyTradeoffSkill",
    displayName: "Brewer CAP & PACELC Distributed Trade-Off Analyzer",
    categoryId: "core",
    description: "Navigates distributed consistency vs availability trade-offs under network partition and normal operation.",
    tags: ["core", "cap-theorem", "pacelc", "distributed-systems", "consistency"],
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
    semanticType: "analysis_directive"
  },
  {
    id: "security-least-privilege-rbac",
    name: "SecurityLeastPrivilegeRbacSkill",
    displayName: "Principle of Least Privilege (PoLP) & RBAC Matrix",
    categoryId: "core",
    description: "Restricts actors, services, and roles to the absolute minimum necessary permissions to perform duties.",
    tags: ["core", "security", "least-privilege", "rbac", "access-control"],
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
    semanticType: "guardrail_directive"
  },
  {
    id: "semantic-versioning-breaking-lock",
    name: "SemanticVersioningBreakingLockSkill",
    displayName: "Semantic Versioning (SemVer 2.0.0) Protocol",
    categoryId: "core",
    description: "Enforces deterministic SemVer rules: MAJOR for breaking changes, MINOR for features, PATCH for fixes.",
    tags: ["core", "semver", "versioning", "release-engineering", "governance"],
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
    semanticType: "compliance_directive"
  },
  {
    id: "circuit-breaker-hystrix-pattern",
    name: "CircuitBreakerHystrixPatternSkill",
    displayName: "Michael Nygard Circuit Breaker & State Machine",
    categoryId: "core",
    description: "Implements Closed -> Open -> Half-Open circuit breaker states with sliding-window error monitoring.",
    tags: ["core", "circuit-breaker", "resilience", "nygard", "distributed-systems"],
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
    semanticType: "protocol"
  },
  {
    id: "anti-corruption-layer-domain-bridge",
    name: "AntiCorruptionLayerDomainBridgeSkill",
    displayName: "DDD Anti-Corruption Layer (ACL) Domain Bridge",
    categoryId: "core",
    description: "Isolates clean modern domain models from legacy, vendor, or third-party schema pollutants.",
    tags: ["core", "acl", "anti-corruption", "ddd", "legacy-migration"],
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
    semanticType: "protocol"
  },
  {
    id: "declarative-resource-cleanup-raii",
    name: "DeclarativeResourceCleanupRaiiSkill",
    displayName: "RAII Resource Acquisition Is Initialization & Cleanup",
    categoryId: "core",
    description: "Guarantees leak-free acquisition and deterministic cleanup of file handles, sockets, and memory.",
    tags: ["core", "raii", "memory-management", "resource-cleanup", "stability"],
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
    semanticType: "protocol"
  },
  {
    id: "finite-state-machine-safety-invariants",
    name: "FiniteStateMachineSafetyInvariantsSkill",
    displayName: "Deterministic Finite State Machine (FSM) Invariants",
    categoryId: "core",
    description: "Models complex domain lifecycles into mathematically verifiable finite state machines.",
    tags: ["core", "fsm", "state-machine", "determinism", "formal-verification"],
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
    semanticType: "protocol"
  },
  {
    id: "data-locality-cache-friendliness",
    name: "DataLocalityCacheFriendlinessSkill",
    displayName: "Data Locality & CPU Cache-Line Optimization",
    categoryId: "core",
    description: "Arranges data structures sequentially in memory to maximize L1/L2/L3 cache hit rates.",
    tags: ["core", "cache", "data-locality", "cpu", "performance", "systems"],
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
    semanticType: "process_directive"
  }
];

console.log('Appending new Core skills...');
appendSkills('core', CORE_NEW);
console.log('Core skills updated successfully.');
