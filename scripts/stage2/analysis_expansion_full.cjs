const { appendSkills } = require('../appendSkills.cjs');

const ANALYSIS_FULL = [
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
    description: "Computes partial derivatives to measure elasticity and output volatility relative to input changes.",
    tags: ["analysis", "sensitivity", "elasticity", "derivatives", "modeling"],
    sectionName: "Parameter Sensitivity & Elasticity Gradient Matrix",
    ruSectionName: "Анализ чувствительности параметров и градиентов эластичности",
    instructions: [
      "Compute the elasticity coefficient for all key variables.",
      "Highlight hyper-sensitive parameters where a 1% input perturbation triggers >5% output variance.",
      "Introduce dampening controls or circuit breakers to bound hyper-sensitive gradient spikes."
    ],
    ruInstructions: [
      "Рассчитайте коэффициенты эластичности параметров.",
      "Выделите гиперчувствительные параметры с резким откликом.",
      "Внедрите стабилизирующие демпферы для сглаживания всплесков."
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
      "Зафиксируйте текущее состояние (As-Is) в разрезе архитектуры и процессов.",
      "Опишите целевое состояние (To-Be) с четкими метриками.",
      "Сформируйте дорожную карту перехода."
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
      "Define 6-8 standardized evaluation criteria.",
      "Score each competing architecture on a normalized 1-10 scale with clear empirical evidence justifications.",
      "Highlight competitive moats and fatal structural deficits for each evaluated candidate."
    ],
    ruInstructions: [
      "Определите критерии оценки (производительность, масштабируемость, безопасность).",
      "Оцените варианты по 10-балльной шкале.",
      "Выделите преимущества и дефициты каждого решения."
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
      "State the Breakeven Payback Month and projected Return on Investment (ROI %)."
    ],
    ruInstructions: [
      "Смоделируйте CapEx и OpEx на 36 месяцев.",
      "Рассчитайте дисконтированные денежные потоки (DCF).",
      "Укажите срок окупаемости и ROI."
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
      "Formulate SO, ST, WO, and WT actionable strategic vectors.",
      "Pair internal capabilities with external market shifts.",
      "Eliminate vague qualitative statements in favor of concrete initiatives."
    ],
    ruInstructions: [
      "Сформулируйте векторы действий SO, ST, WO, WT.",
      "Сопоставьте внутренние силы с рыночными возможностями.",
      "Преобразуйте анализ в конкретный план инициатив."
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
      "Identify the single binding constraint limiting throughput.",
      "Exploit and subordinate all subsystems to the bottleneck pace.",
      "Elevate the constraint and prevent inertia."
    ],
    ruInstructions: [
      "Определите главное узкое место системы.",
      "Подчините ритм всех модулей скорости ограничения.",
      "Инвестируйте в расширение узкого места."
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
      "Record every transformation stage and schema mutation.",
      "Ensure immutable cryptographic provenance hashes."
    ],
    ruInstructions: [
      "Постройте карту движения данных от сбора до витрин.",
      "Зафиксируйте трансформации схем.",
      "Обеспечьте неизменяемый аудит."
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
      "Analyze systemic vectors across all 6 PESTLE pillars.",
      "Identify high-impact regulatory or macroeconomic shifts with probability >30%.",
      "Formulate operational hedging strategies."
    ],
    ruInstructions: [
      "Проанализируйте макро-факторы по 6 направлениям PESTLE.",
      "Выделите регуляторные и технологические сдвиги.",
      "Разработайте меры хеджирования."
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
      "Stratify data into distinct time-based and behavior-based acquisition cohorts.",
      "Fit observed retention against asymptotic power-law decay functions.",
      "Pinpoint critical drop-off thresholds."
    ],
    ruInstructions: [
      "Разделите данные на когорты.",
      "Постройте кривые удержания (Retention).",
      "Выявите критические точки оттока."
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
      "Evaluate threats across all 6 STRIDE vectors.",
      "Score vulnerabilities via DREAD framework.",
      "Prescribe mandatory cryptographic mitigations."
    ],
    ruInstructions: [
      "Проведите аудит по 6 векторам STRIDE.",
      "Оцените уязвимости по шкале DREAD.",
      "Сформируйте обязательные меры защиты."
    ],
    semanticType: "guardrail_directive"
  },
  {
    id: "value-stream-waste-muda-mapping",
    name: "ValueStreamWasteMudaMappingSkill",
    displayName: "Lean Value Stream Mapping & 7 Wastes (Muda) Audit",
    categoryId: "analysis",
    description: "Maps end-to-end Value Stream and eliminates the 7 Lean wastes.",
    tags: ["analysis", "lean", "value-stream", "muda", "toyota", "efficiency"],
    sectionName: "Lean Value Stream & 7 Wastes (Muda) Elimination",
    ruSectionName: "Картирование потока создания ценности (VSM) и устранение 7 потерь (Muda)",
    instructions: [
      "Calculate Process Cycle Efficiency (PCE).",
      "Audit workflow for the 7 classic Toyota wastes.",
      "Eliminate non-value-add handoffs."
    ],
    ruInstructions: [
      "Рассчитайте эффективность цикла (PCE).",
      "Устраните 7 классических потерь Toyota.",
      "Сократите время ожидания в очередях."
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
      "Compute fully loaded CAC.",
      "Calculate LTV and LTV:CAC ratio (target ≥ 3:1).",
      "Track Net Revenue Retention (NRR)."
    ],
    ruInstructions: [
      "Рассчитайте полную стоимость привлечения (CAC).",
      "Оцените LTV и коэффициент LTV:CAC.",
      "Проанализируйте NRR."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "anomaly-statistical-outlier-iqr",
    name: "AnomalyStatisticalOutlierIqrSkill",
    displayName: "Robust Statistical Outlier Detection (Tukey IQR / Z-Score)",
    categoryId: "analysis",
    description: "Detects anomalous telemetry and fraudulent transactions using Tukey Interquartile Range and MAD.",
    tags: ["analysis", "anomaly-detection", "outliers", "iqr", "statistics", "mad"],
    sectionName: "Robust Outlier Detection & Anomaly Screening",
    ruSectionName: "Статистическое выявление аномалий и выбросов (Tukey IQR, MAD, Z-Score)",
    instructions: [
      "Compute Tukey Fences and Median Absolute Deviation.",
      "Filter out transient noise without suppressing true outliers.",
      "Generate automated incident alerts."
    ],
    ruInstructions: [
      "Рассчитайте границы IQR и MAD.",
      "Отфильтруйте случайный шум от критических аномалий.",
      "Сформируйте правила алертинга."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "conjoint-choice-based-partworth",
    name: "ConjointChoiceBasedPartworthSkill",
    displayName: "Choice-Based Conjoint (CBC) Part-Worth Utility Analysis",
    categoryId: "analysis",
    description: "Measures customer willingness-to-pay and feature preference trade-offs via discrete choice modeling.",
    tags: ["analysis", "conjoint", "pricing", "willingness-to-pay", "preferences"],
    sectionName: "Choice-Based Conjoint Part-Worth Utility Model",
    ruSectionName: "Конджойнт-анализ потребительских предпочтений и полезности функций (CBC)",
    instructions: [
      "Decompose products into discrete feature attributes and price levels.",
      "Estimate multinomial logit part-worth utilities for each attribute level.",
      "Simulate market share sensitivity under varied packaging and pricing configurations."
    ],
    ruInstructions: [
      "Разложите продукт на атрибуты и ценовые уровни.",
      "Оцените полезность каждой функции методом логистической регрессии.",
      "Смоделируйте рыночную долю при разных конфигурациях тарифов."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "bostongrowthsharematrix-bcg",
    name: "BostonGrowthShareMatrixBcgSkill",
    displayName: "BCG Growth-Share Matrix (Stars, Cash Cows, Dogs, Question Marks)",
    categoryId: "analysis",
    description: "Allocates portfolio resources by plotting market growth rate against relative market share.",
    tags: ["analysis", "bcg-matrix", "portfolio", "growth-share", "strategy"],
    sectionName: "BCG Portfolio Growth-Share Matrix",
    ruSectionName: "Матрица БКГ: Звезды, Дойные коровы, Собаки, Трудные дети",
    instructions: [
      "Plot business units / features across Market Growth Rate vs Relative Market Share.",
      "Milking Cash Cows to fund high-growth Stars and selective Question Marks.",
      "Divest or sunset low-growth, low-share Dogs with zero strategic synergies."
    ],
    ruInstructions: [
      "Разместите продукты на матрице Темп роста / Доля рынка.",
      "Направляйте поток от «Дойных коров» на развитие «Звезд».",
      "Выводите из эксплуатации нерентабельные «Собаки»."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "heijunka-leveling-takt-time",
    name: "HeijunkaLevelingTaktTimeSkill",
    displayName: "Toyota Heijunka Production Leveling & Takt Time",
    categoryId: "analysis",
    description: "Levels workflow volume and mix to prevent bullwhip effect and match pace to exact Takt Time demand.",
    tags: ["analysis", "heijunka", "takt-time", "lean", "operations", "leveling"],
    sectionName: "Heijunka Production Leveling & Takt Time Alignment",
    ruSectionName: "Выравнивание потока Хейдзунка и синхронизация по времени такта (Takt Time)",
    instructions: [
      "Calculate Takt Time: Net Available Operating Time / Customer Demand Rate.",
      "Level production batches into mixed-model pacing to eliminate sudden demand spikes.",
      "Maintain minimal buffer inventory to absorb micro-stoppages."
    ],
    ruInstructions: [
      "Рассчитайте время такта (Takt Time).",
      "Выровняйте объемы и номенклатуру задач для сглаживания пиков.",
      "Используйте буферные запасы для компенсации микро-сбоев."
    ],
    semanticType: "process_directive"
  },
  {
    id: "monte-carlo-financial-var-cvar",
    name: "MonteCarloFinancialVarCvarSkill",
    displayName: "Value at Risk (VaR 99%) & Conditional Tail Risk (CVaR)",
    categoryId: "analysis",
    description: "Quantifies maximum potential financial or latency loss under extreme tail stress scenarios.",
    tags: ["analysis", "var", "cvar", "tail-risk", "financial-risk", "stress-test"],
    sectionName: "Value at Risk (VaR) & Expected Shortfall (CVaR) Matrix",
    ruSectionName: "Оценка хвостовых рисков VaR (99%) и ожидаемого дефицита CVaR",
    instructions: [
      "Calculate Parametric and Historical Value at Risk (VaR at 95% and 99% confidence).",
      "Compute Conditional VaR (Expected Shortfall) measuring average loss when the VaR threshold is breached.",
      "Design capital and compute headroom buffers exceeding the 99% CVaR boundary."
    ],
    ruInstructions: [
      "Рассчитайте Value at Risk (VaR) для доверительных уровней 95% и 99%.",
      "Оцените средний размер убытка при пробитии порога риска (CVaR / Expected Shortfall).",
      "Заложите резерв ресурсов, покрывающий наихудший 1% сценариев."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "semantic-sentiment-aspect-polarity",
    name: "SemanticSentimentAspectPolaritySkill",
    displayName: "Aspect-Based Sentiment & Granular Polarity Extraction",
    categoryId: "analysis",
    description: "Extracts fine-grained sentiment polarity (+1 to -1) mapped directly to specific product features and entities.",
    tags: ["analysis", "sentiment", "absa", "nlp", "aspect-based", "feedback"],
    sectionName: "Aspect-Based Sentiment & Entity Polarity Analysis",
    ruSectionName: "Аспектно-ориентированный анализ тональности (ABSA)",
    instructions: [
      "Extract discrete entities and features mentioned in unstructured feedback.",
      "Score sentiment polarity [-1.0, +1.0] and emotional intensity for each isolated aspect.",
      "Aggregate aspect scores into a prioritized satisfaction deficit radar."
    ],
    ruInstructions: [
      "Выделите отдельные сущности и функции продукта из текста отзывов.",
      "Оцените тональность каждого аспекта по шкале от -1.0 до +1.0.",
      "Сформируйте радар ключевых зон недовольства пользователей."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "rfm-customer-segmentation-matrix",
    name: "RfmCustomerSegmentationMatrixSkill",
    displayName: "RFM (Recency, Frequency, Monetary) Customer Segmentation",
    categoryId: "analysis",
    description: "Segments customer bases into Champions, Loyalists, Potential Churn, and Hibernating via quintile scoring.",
    tags: ["analysis", "rfm", "segmentation", "marketing", "customer-lifecycle"],
    sectionName: "RFM Quintile Customer Segmentation Matrix",
    ruSectionName: "RFM-сегментация клиентской базы (Recency, Frequency, Monetary)",
    instructions: [
      "Score users on Recency (1-5), Frequency (1-5), and Monetary value (1-5).",
      "Group scores into actionable behavioral segments (Champions, At-Risk, Hibernating, New Leads).",
      "Assign targeted lifecycle retention and reactivation playbooks to each cohort."
    ],
    ruInstructions: [
      "Оцените пользователей по шкале 1–5 по давности, частоте и чеку (RFM).",
      "Сгруппируйте клиентов в когорты: Чемпионы, Лояльные, Зона риска, Спящие.",
      "Назначьте индивидуальные сценарии удержания для каждого сегмента."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "kano-model-customer-delight",
    name: "KanoModelCustomerDelightSkill",
    displayName: "Noriaki Kano Feature Delight vs Necessity Model",
    categoryId: "analysis",
    description: "Classifies features into Must-Be, Performance, Attractive (Delighters), and Indifferent categories.",
    tags: ["analysis", "kano-model", "product-management", "customer-satisfaction", "features"],
    sectionName: "Noriaki Kano Feature Classification Matrix",
    ruSectionName: "Модель Кано: базовые требования, линейные функции и восторг (Delighters)",
    instructions: [
      "Administer functional vs dysfunctional paired question evaluation.",
      "Categorize features into: Must-Have (dissatisfiers if missing), Performance (linear satisfaction), Delighters (high satisfaction with no downside).",
      "Prioritize roadmap: 100% Must-Haves -> Competitive Performance -> Signature Delighters."
    ],
    ruInstructions: [
      "Классифицируйте функции по категориям: Обязательные, Линейные, Привлекательные (Delighters).",
      "Убедитесь в 100% реализации базовых требований, предотвращающих негатив.",
      "Сфокусируйте инновации на уникальных функциях восторга."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "critical-path-pert-cpm-schedule",
    name: "CriticalPathPertCpmScheduleSkill",
    displayName: "PERT / CPM Critical Path & Schedule Float Analysis",
    categoryId: "analysis",
    description: "Calculates the Critical Path, Total Float, Free Float, and probabilistic completion dates via PERT three-point estimates.",
    tags: ["analysis", "pert", "cpm", "critical-path", "project-management", "scheduling"],
    sectionName: "PERT / CPM Critical Path & Float Analysis",
    ruSectionName: "Анализ критического пути (CPM) и оценка сроков по методике PERT",
    instructions: [
      "Calculate PERT Expected Duration: Te = (Optimistic + 4×Realistic + Pessimistic) / 6.",
      "Perform Forward Pass (Early Start/Early Finish) and Backward Pass (Late Start/Late Finish).",
      "Identify the Critical Path (Zero Total Float) and focus all management variance control on critical tasks."
    ],
    ruInstructions: [
      "Рассчитайте средневзвешенную длительность по PERT: Te = (O + 4M + P) / 6.",
      "Выполните прямой и обратный проход для определения ранних и поздних сроков.",
      "Выделите задачи критического пути с нулевым резервом времени (Zero Float)."
    ],
    semanticType: "process_directive"
  },
  {
    id: "funnel-conversion-dropoff-leakage",
    name: "FunnelConversionDropoffLeakageSkill",
    displayName: "Micro-Funnel Conversion & Leakage Attribution",
    categoryId: "analysis",
    description: "Identifies exact micro-step conversion drop-offs, isolating friction points across user and telemetry pipelines.",
    tags: ["analysis", "funnel", "conversion", "drop-off", "analytics"],
    sectionName: "Micro-Funnel Conversion & Drop-off Attribution",
    ruSectionName: "Пошаговый анализ воронки конверсии и точек оттока",
    instructions: [
      "Instrument each discrete step in the user conversion journey with precise completion telemetry.",
      "Calculate step-over-step dropoff percentages and overall end-to-end completion rate.",
      "Diagnose technical, usability, and cognitive friction causing major step dropoffs."
    ],
    ruInstructions: [
      "Зафиксируйте процент прохождения каждого шага воронки.",
      "Рассчитайте сквозную конверсию и локальные коэффициенты оттока.",
      "Сформулируйте гипотезы по устранению трения на проблемных шагах."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "mckinsey-seven-s-alignment",
    name: "MckinseySevenSAlignmentSkill",
    displayName: "McKinsey 7-S Organizational & Architectural Alignment",
    categoryId: "analysis",
    description: "Audits alignment across Strategy, Structure, Systems, Shared Values, Style, Staff, and Skills.",
    tags: ["analysis", "mckinsey-7s", "alignment", "transformation", "strategy"],
    sectionName: "McKinsey 7-S Systemic Alignment Matrix",
    ruSectionName: "Модель 7-S McKinsey: системная согласованность архитектуры и организации",
    instructions: [
      "Evaluate Hard elements: Strategy, Structure, Systems.",
      "Evaluate Soft elements: Shared Values, Style, Staff, Skills.",
      "Identify misalignments where technology systems contradict strategy or team capabilities."
    ],
    ruInstructions: [
      "Оцените жесткие элементы: Стратегия, Структура, Системы.",
      "Оцените мягкие элементы: Общие ценности, Стиль, Персонал, Навыки.",
      "Устраните расхождения между целями стратегии и реальными возможностями систем."
    ],
    semanticType: "analysis_directive"
  }
];

console.log('Appending full Analysis expansion...');
appendSkills('analysis', ANALYSIS_FULL);
console.log('Analysis expanded.');
