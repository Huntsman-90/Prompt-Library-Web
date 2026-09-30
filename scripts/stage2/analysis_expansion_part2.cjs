const { appendSkills } = require('../appendSkills.cjs');

const ANALYSIS_PART2 = [
  {
    id: "ansoff-matrix-growth-strategy",
    name: "AnsoffMatrixGrowthStrategySkill",
    displayName: "Igor Ansoff Product-Market Growth Matrix",
    categoryId: "analysis",
    description: "Evaluates growth vectors: Market Penetration, Market Development, Product Development, and Diversification.",
    tags: ["analysis", "ansoff", "growth-strategy", "product-market", "risk"],
    sectionName: "Igor Ansoff Product-Market Growth Matrix",
    ruSectionName: "Матрица Ансоффа: Проникновение, Развитие рынка, Развитие продукта, Диверсификация",
    instructions: [
      "Categorize growth initiatives into the 4 Ansoff quadrants with associated risk ratings.",
      "Quantify capital requirements and failure probabilities for high-risk Diversification moves.",
      "Align core competencies with targeted product-market expansion."
    ],
    ruInstructions: [
      "Разделите инициативы по 4 квадрантам Ансоффа с оценкой рисков.",
      "Оцените ресурсы и вероятность успеха стратегий развития продукта и рынка.",
      "Сопоставьте компетенции команды с выбранным вектором экспансии."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "service-blueprint-frontstage-backstage",
    name: "ServiceBlueprintFrontstageBackstageSkill",
    displayName: "Service Blueprinting (Frontstage, Backstage, Support Systems)",
    categoryId: "analysis",
    description: "Maps customer touchpoints across Line of Interaction, Line of Visibility, Line of Internal Interaction.",
    tags: ["analysis", "service-blueprint", "frontstage", "backstage", "cx", "operations"],
    sectionName: "Service Blueprint & Operational Interaction Matrix",
    ruSectionName: "Сервисный блюпринт: Frontstage, Backstage и процессы поддержки",
    instructions: [
      "Map customer journey actions along the Line of Interaction.",
      "Document visible employee/system actions above the Line of Visibility (Frontstage).",
      "Detail invisible processing, databases, and third-party APIs below the Line of Internal Interaction (Backstage)."
    ],
    ruInstructions: [
      "Опишите действия пользователя на линии взаимодействия (Line of Interaction).",
      "Зафиксируйте видимые фронт-системы на линии видимости (Frontstage).",
      "Опишите внутренние базы данных, брокеры сообщений и API на уровне Backstage."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "monte-carlo-project-schedule-risk",
    name: "MonteCarloProjectScheduleRiskSkill",
    displayName: "Monte Carlo Critical Schedule & Milestone Risk Envelope",
    categoryId: "analysis",
    description: "Simulates probabilistic task durations across dependency graphs to predict P50/P80/P95 ship dates.",
    tags: ["analysis", "monte-carlo", "schedule-risk", "project-management", "forecasting"],
    sectionName: "Monte Carlo Schedule Risk & Ship Date Distribution",
    ruSectionName: "Стохастическое моделирование сроков релиза по Монте-Карло (P50/P80/P95)",
    instructions: [
      "Assign triangular duration distributions (Min, Most Likely, Max) to all WBS work packages.",
      "Run 10,000 simulations over the task dependency network.",
      "Report commitment dates at the 80% and 95% confidence intervals."
    ],
    ruInstructions: [
      "Задайте трехточечные оценки длительности для всех задач в графе зависимостей.",
      "Проведите симуляцию методом Монте-Карло на 10 000 прогонов.",
      "Зафиксируйте дату релиза с вероятностью выполнения 80% и 95%."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "customer-journey-empathy-friction-map",
    name: "CustomerJourneyEmpathyFrictionMapSkill",
    displayName: "Customer Journey Empathy & Cognitive Friction Map",
    categoryId: "analysis",
    description: "Charts user emotional highs, lows, mental models, and drop-off risks across lifecycle stages.",
    tags: ["analysis", "customer-journey", "empathy-map", "cx", "ux-research"],
    sectionName: "Customer Journey & Emotional Friction Mapping",
    ruSectionName: "Карта пути клиента (CJM) и аудит эмоционального трения",
    instructions: [
      "Chart user touchpoints across Awareness, Consideration, Onboarding, Value Realization, and Retention.",
      "Plot the user emotional curve (Frustration vs Delight) at each touchpoint.",
      "Prescribe direct design and architectural interventions to eliminate friction valleys."
    ],
    ruInstructions: [
      "Постройте карту этапов: от первого знакомства до регулярного использования.",
      "Отобразите эмоциональную кривую пользователя и точки максимального раздражения.",
      "Сформируйте решения для сглаживания проблемных зон."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "contingency-table-chi-square-independence",
    name: "ContingencyTableChiSquareIndependenceSkill",
    displayName: "Pearson Chi-Square Contingency & Independence Test",
    categoryId: "analysis",
    description: "Tests statistical independence between categorical variables with expected vs observed cell frequencies.",
    tags: ["analysis", "chi-square", "statistics", "contingency-table", "hypothesis-testing"],
    sectionName: "Pearson Chi-Square Independence & Contingency Analysis",
    ruSectionName: "Критерий независимости Хи-квадрат Пирсона (Таблицы сопряженности)",
    instructions: [
      "Construct a contingency table cross-tabulating observed categorical frequencies.",
      "Calculate expected cell counts under the null hypothesis of statistical independence.",
      "Compute the χ² test statistic, degrees of freedom, and p-value against α = 0.01 threshold."
    ],
    ruInstructions: [
      "Постройте таблицу сопряженности для категориальных признаков.",
      "Рассчитайте ожидаемые частоты при условии независимости переменных.",
      "Вычислите статистику Хи-квадрат (χ²) и уровень значимости p-value."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "five-whys-deep-causal-chain",
    name: "FiveWhysDeepCausalChainSkill",
    displayName: "Taiichi Ohno 5-Whys Root Cause Chain",
    categoryId: "analysis",
    description: "Drills down through 5 consecutive levels of causality to bypass symptoms and isolate systemic policy failure.",
    tags: ["analysis", "5-whys", "root-cause", "toyota", "postmortem"],
    sectionName: "Taiichi Ohno 5-Whys Deep Causal Chain",
    ruSectionName: "Метод 5 «Почему» Тайити Оно: Глубокая цепочка первопричин",
    instructions: [
      "Ask 'Why did this failure occur?' five consecutive times, validating each link with empirical evidence.",
      "Transition from immediate technical symptom to process defect to systemic policy breakdown.",
      "Deploy permanent structural poka-yoke error-proofing at the root level."
    ],
    ruInstructions: [
      "Последовательно задайте вопрос «Почему это произошло?» 5 раз, проверяя каждый шаг фактами.",
      "Перейдите от поверхностного технического симптома к организационному дефекту процесса.",
      "Внедрите защиту от ошибок (Пока-ёкэ) на уровне коренной причины."
    ],
    semanticType: "process_directive"
  },
  {
    id: "system-resilience-redundancy-factor",
    name: "SystemResilienceRedundancyFactorSkill",
    displayName: "N+1 and Active-Active Redundancy Availability Model",
    categoryId: "analysis",
    description: "Calculates system MTBF, MTTR, and composite availability (99.9% vs 99.999%) under component failover.",
    tags: ["analysis", "availability", "redundancy", "sla", "mtbf", "resilience"],
    sectionName: "System Redundancy & High-Availability SLA Model",
    ruSectionName: "Моделирование отказоустойчивости (N+1, Active-Active, MTBF, MTTR)",
    instructions: [
      "Model component Mean Time Between Failures (MTBF) and Mean Time To Recovery (MTTR).",
      "Calculate composite serial vs parallel availability (e.g. 99.99% = 52.6 min annual downtime).",
      "Design active-active failover with sub-second health-check heartbeats."
    ],
    ruInstructions: [
      "Рассчитайте показатели MTBF (наработка на отказ) и MTTR (время восстановления).",
      "Вычислите совокупную доступность системы (SLA 99.99% = не более 52 минут простоя в год).",
      "Спроектируйте архитектуру Active-Active с автоматическим переключением нагрузки."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "value-proposition-canvas-osterwalder",
    name: "ValuePropositionCanvasOsterwalderSkill",
    displayName: "Strategyzer Value Proposition Canvas (Jobs, Pains, Gains)",
    categoryId: "analysis",
    description: "Aligns Product Pain Relievers and Gain Creators directly with Customer Jobs-to-be-Done, Pains, and Gains.",
    tags: ["analysis", "value-proposition", "osterwalder", "jtbd", "product-market-fit"],
    sectionName: "Strategyzer Value Proposition Fit Matrix",
    ruSectionName: "Value Proposition Canvas (Остервальдер): Профиль клиента и карта ценности",
    instructions: [
      "Customer Profile: Document functional, social, and emotional Jobs-to-be-Done, major Pains, and desired Gains.",
      "Value Map: Outline Products/Services, explicit Pain Relievers, and Gain Creators.",
      "Verify Problem-Solution Fit: ensure every major customer pain has an active pain reliever."
    ],
    ruInstructions: [
      "Профиль клиента: Опишите задачи (JTBD), боли (Pains) и выгоды (Gains).",
      "Карта ценности: Перечислите факторы снятия боли и создания пользы.",
      "Проверьте соответствие Problem-Solution Fit без пустых деклараций."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "feature-flags-canary-rollout-matrix",
    name: "FeatureFlagsCanaryRolloutMatrixSkill",
    displayName: "Progressive Canary Rollout & Feature Flag Guardrail Matrix",
    categoryId: "analysis",
    description: "Evaluates blast radius and automated rollback triggers across 1% -> 5% -> 25% -> 100% rollout stages.",
    tags: ["analysis", "canary", "feature-flags", "deployment", "blast-radius"],
    sectionName: "Progressive Canary Rollout & Health Gate Matrix",
    ruSectionName: "Прогрессивный канареечный релиз (Canary 1% -> 10% -> 100%) и гейты здоровья",
    instructions: [
      "Define canary rollout phases: 1% internal -> 5% probe -> 25% baseline -> 100% general availability.",
      "Set strict automated rollback metrics: p99 latency degradation >15% or error rate >0.1%.",
      "Ensure instantaneous feature-flag kill switches for zero-deployment emergency shutoff."
    ],
    ruInstructions: [
      "Определите этапы канареечного выката: 1% -> 5% -> 25% -> 100%.",
      "Задайте жесткие критерии авто-отката: рост p99 задержки >15% или ошибок >0.1%.",
      "Внедрите рубильники мгновенного отключения (Kill Switches) через фича-флаги."
    ],
    semanticType: "protocol"
  },
  {
    id: "decision-matrix-pugh-concept-selection",
    name: "DecisionMatrixPughConceptSelectionSkill",
    displayName: "Stuart Pugh Controlled Convergence Concept Selection Matrix",
    categoryId: "analysis",
    description: "Evaluates competing design concepts against an established Datum baseline using (+, -, S) scoring.",
    tags: ["analysis", "pugh-matrix", "concept-selection", "engineering", "evaluation"],
    sectionName: "Pugh Controlled Convergence Concept Selection Matrix",
    ruSectionName: "Матрица выбора концепций Стюарта Пью (Pugh Matrix: +, -, S)",
    instructions: [
      "Select a reference baseline concept as the Datum.",
      "Score competing alternatives across criteria as + (Better), - (Worse), or S (Same) relative to Datum.",
      "Synthesize hybrid concepts by combining high-scoring elements from disparate alternatives."
    ],
    ruInstructions: [
      "Выберите базовый эталонный вариант (Datum).",
      "Оцените альтернативы по критериям (+ лучше, - хуже, S так же относительно эталона).",
      "Создайте гибридную концепцию, объединив лучшие черты лидеров сравнения."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "risk-heat-map-probability-impact",
    name: "RiskHeatMapProbabilityImpactSkill",
    displayName: "5x5 Qualitative Risk Heat Map (Likelihood × Impact)",
    categoryId: "analysis",
    description: "Plots operational risks onto a color-coded 5x5 matrix with explicit mitigation ownership.",
    tags: ["analysis", "risk-heat-map", "risk-management", "probability-impact", "governance"],
    sectionName: "5x5 Risk Likelihood & Impact Matrix",
    ruSectionName: "Тепловая карта рисков 5х5 (Вероятность х Влияние)",
    instructions: [
      "Plot all identified project risks on the 5x5 grid (Likelihood 1-5 × Impact 1-5).",
      "Flag all Red Zone risks (Score 15-25) as requiring immediate executive escalation and active mitigation plans.",
      "Assign explicit single-threaded owners and review frequencies to all medium/high risks."
    ],
    ruInstructions: [
      "Разместите проектные риски на сетке 5х5 (Вероятность 1–5, Влияние 1–5).",
      "Выделите риски красной зоны (балл 15–25) для немедленной эскалации и защиты.",
      "Назначьте ответственных владельцев для каждого критического риска."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "benchmarking-competitive-gap-spider",
    name: "BenchmarkingCompetitiveGapSpiderSkill",
    displayName: "Competitive Parity vs Differentiation Spider Chart",
    categoryId: "analysis",
    description: "Identifies areas of table-stakes Parity vs proprietary Competitive Moats across key capabilities.",
    tags: ["analysis", "benchmarking", "differentiation", "competitive-moat", "spider-chart"],
    sectionName: "Competitive Parity & Moat Differentiation Spider Chart",
    ruSectionName: "Сравнительный анализ паритета и конкурентных преимуществ (Moats)",
    instructions: [
      "Differentiate Table-Stakes Parity capabilities (must match competitors) from True Differentiators (must beat competitors).",
      "Plot capability scores against the market-leading benchmark.",
      "Direct capital and innovation resources exclusively toward protecting and expanding the competitive moat."
    ],
    ruInstructions: [
      "Разделите функции на базовый рыночный паритет и ключевые дифференциаторы.",
      "Сопоставьте возможности продукта с лидерами индустрии.",
      "Сфокусируйте ресурсы на укреплении уникального конкурентного преимущества."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "critical-success-factors-csf-kpi",
    name: "CriticalSuccessFactorsCsfKpiSkill",
    displayName: "Rockart Critical Success Factors (CSF) & KPI Hierarchy",
    categoryId: "analysis",
    description: "Identifies the 3-5 vital areas where satisfactory results ensure successful competitive performance.",
    tags: ["analysis", "csf", "kpi", "strategy", "rockart", "performance"],
    sectionName: "Critical Success Factors (CSF) & KPI Alignment",
    ruSectionName: "Критические факторы успеха (CSF) и дерево ключевых показателей (KPI)",
    instructions: [
      "Isolate 3-5 non-negotiable Critical Success Factors for {{task}}.",
      "Map 2-3 leading and lagging operational KPIs directly to each CSF.",
      "Define clear green/yellow/red trigger thresholds for executive intervention."
    ],
    ruInstructions: [
      "Выделите 3–5 критических факторов успеха (CSF), определяющих результат.",
      "Привяжите к каждому фактору опережающие и запаздывающие метрики (KPI).",
      "Задайте пороги для оперативного реагирования руководства."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "system-capacity-headroom-forecasting",
    name: "SystemCapacityHeadroomForecastingSkill",
    displayName: "System Capacity Headroom & Saturation Run-Rate Forecasting",
    categoryId: "analysis",
    description: "Calculates time-to-exhaustion for compute, storage, and database IOPS based on historical growth rates.",
    tags: ["analysis", "capacity-planning", "headroom", "infrastructure", "scaling"],
    sectionName: "System Capacity Headroom & Saturation Forecasting",
    ruSectionName: "Прогнозирование запаса емкости (Capacity Headroom) и утилизации ресурсов",
    instructions: [
      "Measure current utilization rates across CPU, Memory, Disk IOPS, Network, and DB Connections.",
      "Calculate Time-to-Saturation (Days to 80% capacity) based on 30-day linear/exponential growth trends.",
      "Schedule proactive hardware or architectural scaling at least 60 days before reaching the 80% saturation threshold."
    ],
    ruInstructions: [
      "Зафиксируйте текущий процент утилизации CPU, RAM, IOPS диска и сети.",
      "Рассчитайте время до достижения 80% емкости (Time-to-Saturation) по тренду роста нагрузки.",
      "Запланируйте масштабирование минимум за 60 дней до критического порога."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "root-cause-timeline-retro-postmortem",
    name: "RootCauseTimelineRetroPostmortemSkill",
    displayName: "Blameless Incident Postmortem & Chronological Timeline",
    categoryId: "analysis",
    description: "Reconstructs exact minute-by-minute timeline of production incidents with blameless systemic action items.",
    tags: ["analysis", "postmortem", "incident-timeline", "blameless", "sre", "reliability"],
    sectionName: "Blameless Incident Postmortem & Timeline",
    ruSectionName: "Безобвинительный постмортем инцидента и поминутная хронология (SRE)",
    instructions: [
      "Reconstruct exact chronological timeline: Trigger -> Detection -> Escalation -> Mitigation -> Full Resolution.",
      "Identify contributing systemic factors (monitoring blindspots, deployment gaps, missing circuit breakers).",
      "Formulate actionable preventive engineering tickets with assigned owners and 30-day completion SLAs."
    ],
    ruInstructions: [
      "Восстановите хронологию: Триггер -> Обнаружение -> Эскалация -> Локализация -> Полное устранение.",
      "Выявите системные факторы (слепые зоны мониторинга, отсутствие защиты от сбоев).",
      "Сформируйте конкретные задачи на доработку с дедлайном до 30 дней."
    ],
    semanticType: "process_directive"
  }
];

console.log('Appending Analysis Part 2...');
appendSkills('analysis', ANALYSIS_PART2);
console.log('Analysis Part 2 appended.');
