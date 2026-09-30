const { appendSkills } = require('../appendSkills.cjs');

const ANALYSIS_NEW = [
  {
    id: "structural-decomposition-spectral-matrix",
    name: "StructuralDecompositionSpectralMatrixSkill",
    displayName: "Spectral Graph & Structural Matrix Decomposition",
    categoryId: "analysis",
    description: "Analyzes system architecture as an adjacency matrix and evaluates eigen-centrality and spectral bottlenecks.",
    tags: ["analysis", "spectral", "graph-theory", "matrices", "topology"],
    sectionName: "Spectral Topology & Structural Dependency Matrix",
    ruSectionName: "Спектральная топология и матрица структурных зависимостей",
    instructions: [
      "Represent all subsystems and their coupling interactions as a weighted adjacency matrix.",
      "Calculate node centrality to pinpoint hidden structural single points of failure (chokepoints).",
      "Identify decoupled sub-graphs suitable for independent asynchronous scaling."
    ],
    ruInstructions: [
      "Представьте компоненты системы и связи между ними в виде взвешенной матрицы смежности.",
      "Рассчитайте центральность узлов для выявления скрытых критических узких мест архитектуры.",
      "Выделите слабосвязанные подграфы, пригодные для полностью автономного масштабирования."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "failure-mode-effects-criticality-analysis-fmeca",
    name: "FailureModeEffectsCriticalityAnalysisFmecaSkill",
    displayName: "Formal FMECA Risk Priority Number (RPN) Matrix",
    categoryId: "analysis",
    description: "Calculates Risk Priority Number (RPN = Severity × Occurrence × Detection) for all potential component failures.",
    tags: ["analysis", "fmeca", "rpn", "reliability", "risk-assessment"],
    sectionName: "FMECA Failure Mode Criticality & RPN Matrix",
    ruSectionName: "Анализ видов, последствий и критичности отказов (FMECA / RPN)",
    instructions: [
      "Score Severity (S 1-10), Probability of Occurrence (O 1-10), and Undetectability (D 1-10) for every failure mode.",
      "Compute the composite Risk Priority Number (RPN = S × O × D) and sort failure vectors in descending order.",
      "Mandate immediate architectural mitigations for all failure modes with RPN > 100 or Severity ≥ 9."
    ],
    ruInstructions: [
      "Оцените тяжесть последствий (S), вероятность возникновения (O) и необнаруживаемость (D) по 10-балльной шкале.",
      "Рассчитайте совокупный индекс риска (RPN = S × O × D) и отсортируйте угрозы по убыванию.",
      "Внедрите первоочередные меры для всех сценариев с RPN > 100 или критичностью Severity ≥ 9."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "sensitivity-elasticity-variance-analysis",
    name: "SensitivityElasticityVarianceAnalysisSkill",
    displayName: "Parameter Sensitivity & Elasticity Gradient Analysis",
    categoryId: "analysis",
    description: "Computes partial derivatives (∂Output/∂Input) to measure elasticity and output volatility relative to input changes.",
    tags: ["analysis", "sensitivity", "elasticity", "derivatives", "modeling"],
    sectionName: "Parameter Sensitivity & Elasticity Gradient Matrix",
    ruSectionName: "Анализ чувствительности параметров и градиентов эластичности",
    instructions: [
      "Compute the elasticity coefficient (% change in output / % change in input parameter) for all key variables.",
      "Highlight hyper-sensitive parameters where a 1% input perturbation triggers >5% output variance.",
      "Introduce dampening controls or circuit breakers to bound hyper-sensitive gradient spikes."
    ],
    ruInstructions: [
      "Рассчитайте коэффициенты эластичности (% изменения результата к % изменения входного параметра).",
      "Выделите гиперчувствительные параметры, где отклонение в 1% вызывает более 5% колебаний системы.",
      "Внедрите стабилизирующие демпферы для сглаживания резких всплесков чувствительности."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "gap-analysis-delta-roadmap",
    name: "GapAnalysisDeltaRoadmapSkill",
    displayName: "Current State vs Target State Gap & Delta Roadmap",
    categoryId: "analysis",
    description: "Maps Current (As-Is) vs Future (To-Be) state, isolating technical and capability gaps into actionable workstreams.",
    tags: ["analysis", "gap-analysis", "as-is-to-be", "roadmap", "architecture"],
    sectionName: "As-Is vs To-Be Gap Analysis & Transition Roadmap",
    ruSectionName: "GAP-анализ (As-Is vs To-Be) и дорожная карта ликвидации разрывов",
    instructions: [
      "Document the baseline Current State (As-Is) across Architecture, Data, Process, and Team.",
      "Define the target Future State (To-Be) with concrete, measurable KPIs and SLA benchmarks.",
      "Formulate a sequenced phased migration bridge to close every identified capability gap."
    ],
    ruInstructions: [
      "Зафиксируйте текущее состояние (As-Is) в разрезе архитектуры, данных, процессов и компетенций.",
      "Опишите целевое состояние (To-Be) с четкими метриками эффективности и целевыми SLA.",
      "Сформируйте поэтапную дорожную карту ликвидации выявленных технологических разрывов."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "comparative-benchmark-radar-chart",
    name: "ComparativeBenchmarkRadarChartSkill",
    displayName: "Multi-Dimensional Competitive Benchmark Radar",
    categoryId: "analysis",
    description: "Ranks competing architectural or commercial alternatives across 6-8 normalized quantitative dimensions.",
    tags: ["analysis", "benchmarking", "radar-chart", "evaluation", "tradeoffs"],
    sectionName: "Multi-Dimensional Benchmark & Radar Matrix",
    ruSectionName: "Многомерный сравнительный бенчмарк и лепестковая диаграмма",
    instructions: [
      "Define 6-8 standardized evaluation criteria (e.g. Throughput, Cost, Security, DX, Extensibility, Community).",
      "Score each competing architecture on a normalized 1-10 scale with clear empirical evidence justifications.",
      "Highlight competitive moats and fatal structural deficits for each evaluated candidate."
    ],
    ruInstructions: [
      "Определите 6–8 стандартизированных критериев оценки (пропускная способность, стоимость, безопасность, DX).",
      "Оцените каждого кандидата по 10-балльной шкале с приведением проверяемых фактов.",
      "Выделите ключевые конкурентные преимущества и критические недостатки каждого варианта."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "cost-benefit-npv-roi-modeling",
    name: "CostBenefitNpvRoiModelingSkill",
    displayName: "Capital Cost-Benefit (NPV / IRR / ROI / TCO) Modeling",
    categoryId: "analysis",
    description: "Calculates Net Present Value, Internal Rate of Return, Payback Period, and 3-Year Total Cost of Ownership.",
    tags: ["analysis", "finance", "roi", "npv", "tco", "business-case"],
    sectionName: "Financial Cost-Benefit (NPV/IRR/TCO) Model",
    ruSectionName: "Финансовый анализ затрат и выгод (NPV, IRR, ROI, TCO на 3 года)",
    instructions: [
      "Model Capital Expenditures (CapEx) vs Operational Expenditures (OpEx) across a 36-month horizon.",
      "Calculate Discounted Cash Flows (DCF) using standard corporate Weighted Average Cost of Capital (WACC).",
      "State the Breakeven Payback Month and projected Return on Investment (ROI %) with sensitivity bounds."
    ],
    ruInstructions: [
      "Смоделируйте капитальные (CapEx) и операционные (OpEx) затраты на горизонте 36 месяцев.",
      "Рассчитайте дисконтированные денежные потоки (DCF) с учетом средневзвешенной стоимости капитала (WACC).",
      "Укажите точный срок окупаемости (Payback Period) и прогнозный ROI с границами чувствительности."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "swot-tows-strategic-cross-matrix",
    name: "SwotTowsStrategicCrossMatrixSkill",
    displayName: "TOWS Strategic Action Matrix (SO / ST / WO / WT)",
    categoryId: "analysis",
    description: "Transforms standard SWOT into actionable TOWS strategies (Strengths-Opportunities, Weaknesses-Threats).",
    tags: ["analysis", "swot", "tows", "strategy", "planning"],
    sectionName: "TOWS Actionable Cross-Strategy Matrix",
    ruSectionName: "Матрица стратегических действий TOWS (SO, ST, WO, WT)",
    instructions: [
      "SO Strategies: Leverage internal Strengths to capitalize on external Opportunities.",
      "ST Strategies: Deploy internal Strengths to neutralize external Threats.",
      "WO Strategies: Overcome internal Weaknesses by taking advantage of external Opportunities.",
      "WT Strategies: Minimize internal Weaknesses and avoid catastrophic external Threats."
    ],
    ruInstructions: [
      "Стратегии SO: Используйте сильные стороны для максимального захвата открывающихся возможностей.",
      "Стратегии ST: Примените сильные стороны для нейтрализации внешних угроз и рисков.",
      "Стратегии WO: Компенсируйте внутренние слабости за счет использования рыночных возможностей.",
      "Стратегии WT: Минимизируйте слабые места для предотвращения катастрофических внешних ударов."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "bottleneck-theory-of-constraints-goldratt",
    name: "BottleneckTheoryOfConstraintsGoldrattSkill",
    displayName: "Goldratt Theory of Constraints (TOC) & Drum-Buffer-Rope",
    categoryId: "analysis",
    description: "Identifies the single binding constraint that limits total system throughput and builds a Drum-Buffer-Rope plan.",
    tags: ["analysis", "toc", "goldratt", "bottleneck", "throughput", "capacity"],
    sectionName: "Goldratt Theory of Constraints & Throughput Optimization",
    ruSectionName: "Теория ограничений Голдратта (TOC): Поиск и расшивка ключевого узкого места",
    instructions: [
      "Step 1: Identify the system's single binding bottleneck/constraint.",
      "Step 2: Exploit the constraint (maximize throughput at the bottleneck without adding cost).",
      "Step 3: Subordinate all non-bottleneck components to pace of the constraint (Drum-Buffer-Rope).",
      "Step 4: Elevate the constraint (invest in capacity expansion).",
      "Step 5: Repeat cycle before inertia becomes the constraint."
    ],
    ruInstructions: [
      "Шаг 1: Определите единственное лимитирующее узкое место системы (ограничение).",
      "Шаг 2: Максимально используйте ограничение (выжмите 100% полезного действия без простоев).",
      "Шаг 3: Подчините ритм всех остальных узлов скорости работы узкого места (Барабан-Буфер-Канат).",
      "Шаг 4: Расшейте ограничение (инвестируйте в увеличение пропускной способности узла).",
      "Шаг 5: Перейдите к следующему ограничению, не допуская застоя."
    ],
    semanticType: "process_directive"
  },
  {
    id: "data-lineage-provenance-audit",
    name: "DataLineageProvenanceAuditSkill",
    displayName: "End-to-End Data Lineage & Cryptographic Provenance",
    categoryId: "analysis",
    description: "Traces data origins, transformations, schema mutations, and custody chains from ingestion to consumption.",
    tags: ["analysis", "data-lineage", "provenance", "compliance", "governance"],
    sectionName: "Data Lineage & Cryptographic Provenance Audit",
    ruSectionName: "Аудит происхождения и цепочки движения данных (Data Lineage)",
    instructions: [
      "Map data flows from upstream ingestion sources through ETL transformations down to destination marts.",
      "Record every transformation stage, schema cast, aggregation, and pseudonymization filter.",
      "Ensure immutable cryptographic provenance hashes to satisfy GDPR and HIPAA regulatory audits."
    ],
    ruInstructions: [
      "Постройте карту движения данных от точек сбора через ETL-конвейеры до витрин и отчетов.",
      "Зафиксируйте каждое преобразование, изменение схемы, агрегацию и фильтрацию данных.",
      "Обеспечьте неизменяемые криптографические контрольные суммы для соответствия стандартам регуляторов."
    ],
    semanticType: "compliance_directive"
  },
  {
    id: "pestle-macro-environmental-scan",
    name: "PestleMacroEnvironmentalScanSkill",
    displayName: "PESTLE Macro-Environmental Risk Scan",
    categoryId: "analysis",
    description: "Evaluates Political, Economic, Social, Technological, Legal, and Environmental headwinds and tailwinds.",
    tags: ["analysis", "pestle", "macro-environment", "strategy", "geopolitics"],
    sectionName: "PESTLE Macro-Environmental Risk Scan",
    ruSectionName: "Макроэкономический анализ внешней среды (PESTLE)",
    instructions: [
      "Analyze systemic vectors across all 6 PESTLE pillars: Political, Economic, Social, Tech, Legal, Environmental.",
      "Identify high-impact regulatory or macroeconomic shifts with probability >30% in a 24-month horizon.",
      "Formulate proactive operational hedging strategies against identified macroeconomic headwinds."
    ],
    ruInstructions: [
      "Проанализируйте макро-факторы по 6 направлениям: Политические, Экономические, Социальные, Технологические, Правовые, Экологические.",
      "Выделите критические регуляторные и рыночные сдвиги с вероятностью >30% на горизонте 2 лет.",
      "Разработайте стратегические меры хеджирования рисков внешней среды."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "cohort-retention-churn-decay-model",
    name: "CohortRetentionChurnDecayModelSkill",
    displayName: "Cohort Retention & Non-Linear Churn Decay Curve",
    categoryId: "analysis",
    description: "Models user or system retention cohorts over time using Weibull / Pareto survival decay functions.",
    tags: ["analysis", "retention", "churn", "cohorts", "survival-analysis"],
    sectionName: "Cohort Retention & Survival Analysis Model",
    ruSectionName: "Когортный анализ удержания и кривые оттока (Survival Analysis)",
    instructions: [
      "Stratify users or telemetry events into distinct time-based and behavior-based acquisition cohorts.",
      "Fit observed retention data against asymptotic power-law decay functions to isolate baseline floor retention.",
      "Pinpoint the critical drop-off threshold day (e.g. Day 1 vs Day 7 vs Day 30) and prescribe targeted interventions."
    ],
    ruInstructions: [
      "Разделите пользователей или системные события на временные и поведенческие когорты.",
      "Постройте кривые удержания (Retention) и определите асимптотический уровень стабилизации оттока.",
      "Выявите критические дни максимального оттока (D1, D7, D30) и сформируйте целевые меры удержания."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "threat-model-stride-matrix",
    name: "ThreatModelStrideMatrixSkill",
    displayName: "Microsoft STRIDE Threat Modeling & DREAD Scoring",
    categoryId: "analysis",
    description: "Identifies threats across Spoofing, Tampering, Repudiation, Info Disclosure, Denial of Service, Elevation of Privilege.",
    tags: ["analysis", "stride", "dread", "threat-modeling", "cybersecurity"],
    sectionName: "Microsoft STRIDE Threat Model & DREAD Risk Score",
    ruSectionName: "Моделирование угроз по методологии STRIDE и скоринг DREAD",
    instructions: [
      "Evaluate threats across all 6 STRIDE vectors: Spoofing, Tampering, Repudiation, Info Leak, DoS, Privilege Escalation.",
      "Score each identified vulnerability via DREAD (Damage, Reproducibility, Exploitability, Affected Users, Discoverability).",
      "Prescribe mandatory cryptographic and architectural mitigations for all high-DREAD vectors."
    ],
    ruInstructions: [
      "Проведите аудит системы по 6 векторам STRIDE: Подмена, Искажение данных, Отказ от авторства, Утечка, DoS, Повышение привилегий.",
      "Оцените уязвимости по шкале DREAD (Ущерб, Воспроизводимость, Простота эксплуатации, Масштаб, Обнаруживаемость).",
      "Определите обязательные криптографические и архитектурные контрмеры для всех критических векторов."
    ],
    semanticType: "guardrail_directive"
  },
  {
    id: "value-stream-waste-muda-mapping",
    name: "ValueStreamWasteMudaMappingSkill",
    displayName: "Lean Value Stream Mapping & 7 Wastes (Muda) Audit",
    categoryId: "analysis",
    description: "Maps end-to-end Value Stream and eliminates the 7 Lean wastes (Transport, Inventory, Motion, Waiting, Overproduction, Overprocessing, Defects).",
    tags: ["analysis", "lean", "value-stream", "muda", "toyota", "efficiency"],
    sectionName: "Lean Value Stream & 7 Wastes (Muda) Elimination",
    ruSectionName: "Картирование потока создания ценности (VSM) и устранение 7 потерь (Muda)",
    instructions: [
      "Calculate Process Cycle Efficiency (PCE = Value-Add Time / Total Lead Time).",
      "Audit the workflow for the 7 classic Toyota wastes: Overproduction, Waiting, Transport, Overprocessing, Inventory, Motion, Defects.",
      "Eliminate non-value-add handoffs and queue wait-times to compress cycle time."
    ],
    ruInstructions: [
      "Рассчитайте эффективность цикла процесса (PCE = Время создания ценности / Общее время выполнения Lead Time).",
      "Проведите аудит на наличие 7 классических потерь Toyota: Перепроизводство, Ожидание, Транспортировка, Избыточная обработка, Запасы, Лишние движения, Дефекты.",
      "Устраните ненужные согласования и задержки в очередях для кратного ускорения процесса."
    ],
    semanticType: "process_directive"
  },
  {
    id: "unit-economics-cac-ltv-cohort",
    name: "UnitEconomicsCacLtvCohortSkill",
    displayName: "SaaS Unit Economics (LTV:CAC / Payback / Net Retention)",
    categoryId: "analysis",
    description: "Analyzes Customer Lifetime Value, Customer Acquisition Cost, Payback Period, and Net Revenue Retention (NRR).",
    tags: ["analysis", "unit-economics", "cac", "ltv", "nrr", "saas-metrics"],
    sectionName: "SaaS Unit Economics & Cohort Contribution Margin",
    ruSectionName: "Юнит-экономика: LTV/CAC, Payback, Net Revenue Retention (NRR)",
    instructions: [
      "Compute fully loaded Customer Acquisition Cost (CAC) including sales, marketing, and onboarding overhead.",
      "Calculate Customer Lifetime Value (LTV = ARPU × Gross Margin / Churn Rate) and LTV:CAC ratio (target ≥ 3:1).",
      "Track Net Revenue Retention (NRR target > 115%) to measure organic account expansion."
    ],
    ruInstructions: [
      "Рассчитайте полную стоимость привлечения клиента (CAC) с учетом затрат на продажи и маркетинг.",
      "Рассчитайте пожизненную ценность клиента (LTV = ARPU × Margin / Churn) и соотношение LTV:CAC (цель ≥ 3:1).",
      "Оцените чистый коэффициент удержания выручки (NRR, цель > 115%) для подтверждения органического роста."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "anomaly-statistical-outlier-iqr",
    name: "AnomalyStatisticalOutlierIqrSkill",
    displayName: "Robust Statistical Outlier Detection (Tukey IQR / Z-Score)",
    categoryId: "analysis",
    description: "Detects anomalous telemetry and fraudulent transactions using Tukey Interquartile Range and Median Absolute Deviation (MAD).",
    tags: ["analysis", "anomaly-detection", "outliers", "iqr", "statistics", "mad"],
    sectionName: "Robust Outlier Detection & Anomaly Screening",
    ruSectionName: "Статистическое выявление аномалий и выбросов (Tukey IQR, MAD, Z-Score)",
    instructions: [
      "Compute Tukey Fences: Outliers < Q1 - 1.5×IQR or > Q3 + 1.5×IQR; Extreme Outliers > Q3 + 3.0×IQR.",
      "Use Median Absolute Deviation (MAD) for heavy-tailed distributions where standard deviation is distorted by outliers.",
      "Generate automated incident alerts when anomaly frequency crosses statistical threshold limits."
    ],
    ruInstructions: [
      "Рассчитайте интерквартильный размах Тьюки (IQR): выбросы за пределами Q1 - 1.5×IQR и Q3 + 1.5×IQR.",
      "Используйте медианное абсолютное отклонение (MAD) для устойчивого анализа в распределениях с тяжелыми хвостами.",
      "Сформируйте правила автоматического оповещения при статистически значимом росте числа аномалий."
    ],
    semanticType: "analysis_directive"
  }
];

const AGENTIC_NEW = [
  {
    id: "hierarchical-multi-agent-orchestration",
    name: "HierarchicalMultiAgentOrchestrationSkill",
    displayName: "Hierarchical Multi-Agent Supervisor-Worker Architecture",
    categoryId: "agentic",
    description: "Implements Supervisor/Worker agent topologies with explicit delegation, state merging, and escalation protocols.",
    tags: ["agentic", "multi-agent", "supervisor", "orchestration", "delegation"],
    sectionName: "Hierarchical Multi-Agent Orchestration Protocol",
    ruSectionName: "Иерархическая оркестрация мультиагентных систем (Supervisor-Workers)",
    instructions: [
      "Designate a single Supervisor Agent responsible for high-level goal decomposition and task delegation.",
      "Instantiate specialized Worker Agents with isolated sandboxes and constrained tool privileges.",
      "Enforce deterministic JSON message-passing protocols for worker state reporting and error escalation."
    ],
    ruInstructions: [
      "Назначьте агента-супервайзера, отвечающего за глобальную декомпозицию и распределение задач.",
      "Создайте специализированных агентов-воркеров с изолированными правами и наборами инструментов.",
      "Используйте структурированный JSON-протокол обмена сообщениями и эскалации ошибок."
    ],
    semanticType: "protocol"
  },
  {
    id: "tool-calling-json-schema-contract",
    name: "ToolCallingJsonSchemaContractSkill",
    displayName: "Strict Tool-Calling JSON Schema & Parameter Validation",
    categoryId: "agentic",
    description: "Defines deterministic JSON Schema definitions for LLM tool invocations with strict type-checking.",
    tags: ["agentic", "tool-calling", "json-schema", "function-calling", "type-safety"],
    sectionName: "Tool-Calling JSON Schema & Invocation Invariants",
    ruSectionName: "Строгий контракт вызова инструментов (Tool-Calling JSON Schema)",
    instructions: [
      "Define JSON Schema parameter contracts with `additionalProperties: false` and strict required fields.",
      "Validate LLM tool call payloads against the JSON schema before dispatching to backend runtime.",
      "Emit actionable error schema diagnostics back to the agent on validation failure to enable self-correction."
    ],
    ruInstructions: [
      "Опишите JSON-схемы аргументов функций с `additionalProperties: false` и обязательными полями.",
      "Валидируйте сгенерированные агентом вызовы перед их реальной отправкой в исполняемую среду.",
      "Возвращайте агенту детальные ошибки валидации схемы для автоматического исправления параметров."
    ],
    semanticType: "protocol"
  },
  {
    id: "dynamic-replanning-self-correction",
    name: "DynamicReplanningSelfCorrectionSkill",
    displayName: "Dynamic Execution Replanning & Reflection Loop",
    categoryId: "agentic",
    description: "Evaluates tool execution output and dynamically alters downstream plan DAGs upon encountering unexpected obstacles.",
    tags: ["agentic", "replanning", "self-correction", "reflection", "adaptive"],
    sectionName: "Dynamic Replanning & Self-Correction Engine",
    ruSectionName: "Динамическое перепланирование и петля самокоррекции агента",
    instructions: [
      "Inspect execution observation: verify whether current step output matches expected postconditions.",
      "If execution fails or returns unexpected data, trigger a Replanning Phase: prune invalid downstream nodes.",
      "Synthesize an alternate execution trajectory while conserving uncorrupted intermediate state."
    ],
    ruInstructions: [
      "Анализируйте результат вызова инструмента: проверяйте соответствие ожидаемым постусловиям.",
      "При сбое или непредвиденных данных запускайте фазу перепланирования (Replanning) с удалением тупиковых веток.",
      "Сформируйте альтернативную траекторию действий с сохранением уже полученных валидных данных."
    ],
    semanticType: "process_directive"
  },
  {
    id: "stateful-episodic-memory-vector-store",
    name: "StatefulEpisodicMemoryVectorStoreSkill",
    displayName: "Episodic Memory Retrieval & Semantic Vector Store",
    categoryId: "agentic",
    description: "Maintains long-term episodic memory via semantic vector similarity retrieval and relevance pruning.",
    tags: ["agentic", "memory", "vector-store", "rag", "embeddings", "episodic"],
    sectionName: "Episodic Vector Memory & Context Retrieval Protocol",
    ruSectionName: "Эпизодическая векторная память и семантический поиск контекста",
    instructions: [
      "Embed agent interaction episodes into a dense vector index with metadata (timestamp, outcome, task_type).",
      "Query memory for the Top-K most semantically relevant historical precedents before initiating execution.",
      "Inject extracted lessons-learned and historical failure modes into the agent's working context window."
    ],
    ruInstructions: [
      "Сохраняйте опыт взаимодействия агента в векторный индекс с метаданными (время, результат, тип задачи).",
      "Извлекайте Top-K наиболее близких исторических прецедентов перед началом выполнения новой задачи.",
      "Добавляйте извлеченные уроки и ранее совершенные ошибки в рабочий контекст агента."
    ],
    semanticType: "protocol"
  },
  {
    id: "human-in-the-loop-hitl-checkpoint",
    name: "HumanInTheLoopHitlCheckpointSkill",
    displayName: "Human-in-the-Loop (HITL) Approval Gate & Escalation",
    categoryId: "agentic",
    description: "Pauses autonomous execution and requests verified human approval before executing destructive or financial actions.",
    tags: ["agentic", "hitl", "human-in-the-loop", "safety", "approval-gates"],
    sectionName: "Human-in-the-Loop (HITL) Gate & Escalation Invariants",
    ruSectionName: "Шлюз подтверждения человеком (Human-in-the-Loop HITL)",
    instructions: [
      "Classify tool actions into Autonomous (read-only, local compute) vs Gated (mutations, payments, emails, deletions).",
      "Suspend execution state immediately and emit an actionable Human Approval Ticket for Gated operations.",
      "Resume execution strictly upon receiving verified cryptographic human authorization tokens."
    ],
    ruInstructions: [
      "Разделите действия на автономные (чтение данных, вычисления) и требующие одобрения (запись, платежи, удаление).",
      "Приостанавливайте выполнение и формируйте понятную заявку на подтверждение человеком (Approval Ticket).",
      "Возобновляйте выполнение только после получения проверенного токена авторизации от оператора."
    ],
    semanticType: "guardrail_directive"
  },
  {
    id: "plan-and-solve-zeroshot-dag",
    name: "PlanAndSolveZeroshotDagSkill",
    displayName: "Plan-and-Solve (PS) Zero-Shot DAG Execution",
    categoryId: "agentic",
    description: "Decouples plan generation from step-by-step execution to prevent premature greedy local optimizations.",
    tags: ["agentic", "plan-and-solve", "planning", "zero-shot", "dag"],
    sectionName: "Plan-and-Solve (PS) Decoupled Execution Protocol",
    ruSectionName: "Двухфазный протокол Plan-and-Solve (Планирование и Исполнение)",
    instructions: [
      "Phase 1 (Planner): Devise a complete, detailed step-by-step plan DAG addressing all sub-problems.",
      "Phase 2 (Solver): Execute the formulated plan sequentially, carrying forward intermediate variables.",
      "Do not begin executing Phase 2 until Phase 1 plan passes completeness and feasibility validation."
    ],
    ruInstructions: [
      "Фаза 1 (Планировщик): Сформируйте полный детальный пошаговый план решения всех подзадач.",
      "Фаза 2 (Исполнитель): Последовательно выполните шаги плана с передачей промежуточных переменных.",
      "Не начинайте исполнение, пока план первой фазы не пройдет валидацию на полноту и реализуемость."
    ],
    semanticType: "process_directive"
  },
  {
    id: "agentic-rate-limit-token-budgeter",
    name: "AgenticRateLimitTokenBudgeterSkill",
    displayName: "Agentic Token Budget & Recursion Depth Limiter",
    categoryId: "agentic",
    description: "Enforces strict caps on maximum LLM iterations, total token consumption, and call recursion depth.",
    tags: ["agentic", "rate-limiting", "token-budget", "recursion", "cost-control"],
    sectionName: "Agentic Execution Budget & Recursion Limits",
    ruSectionName: "Бюджет токенов агента и защита от бесконечной рекурсии",
    instructions: [
      "Set hard upper bounds on maximum execution steps (e.g. max_steps = 15) and recursion depth (max_depth = 3).",
      "Monitor cumulative token and dollar expenditure; halt execution when 90% of allocated budget is consumed.",
      "Provide a clean graceful exit with best-effort intermediate summary if budget is exhausted."
    ],
    ruInstructions: [
      "Установите жесткие лимиты на число итераций (например, max_steps = 15) и глубину вызовов (max_depth = 3).",
      "Контролируйте суммарный расход токенов и бюджета; останавливайте цикл при исчерпании 90% лимита.",
      "Сформируйте понятный промежуточный отчет о проделанной работе при достижении лимита бюджета."
    ],
    semanticType: "constraints"
  },
  {
    id: "tool-idempotency-replay-harness",
    name: "ToolIdempotencyReplayHarnessSkill",
    displayName: "Tool Execution Caching & Deterministic Replay Harness",
    categoryId: "agentic",
    description: "Caches deterministic tool responses by input hash, preventing redundant external API billing and latency.",
    tags: ["agentic", "caching", "idempotency", "replay", "optimization"],
    sectionName: "Deterministic Tool Output Caching & Replay Protocol",
    ruSectionName: "Кэширование вызовов инструментов и детерминированное воспроизведение",
    instructions: [
      "Hash tool name and JSON parameters into a deterministic cache key: `SHA256(tool_name + sorted_params)`.",
      "Check cache for identical prior executions; return cached result instantly for deterministic read tools.",
      "Enable instant test replay and debugging runs without invoking live third-party APIs."
    ],
    ruInstructions: [
      "Хешируйте имя инструмента и отсортированные параметры в ключ кэша: `SHA256(tool + params)`.",
      "Возвращайте сохраненный ответ из кэша для детерминированных операций чтения без повторных обращений к API.",
      "Обеспечьте возможность мгновенного воспроизведения и отладки сценариев на сохраненных данных."
    ],
    semanticType: "protocol"
  }
];

console.log('Appending new Analysis & Agentic skills...');
appendSkills('analysis', ANALYSIS_NEW);
appendSkills('agentic', AGENTIC_NEW);
console.log('Analysis & Agentic updated successfully.');
