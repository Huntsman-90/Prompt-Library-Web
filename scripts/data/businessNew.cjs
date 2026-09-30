const newBusinessSkills = [
  {
    id: 'burn-multiple-capital-efficiency',
    name: 'BurnMultipleCapitalEfficiencySkill',
    displayName: 'Burn Multiple & Capital Efficiency Indexing',
    categoryId: 'business',
    description: 'Calculates Net Burn / Net New ARR to assess capital efficiency across venture stages.',
    tags: ['business', 'finance', 'burn-multiple', 'capital-efficiency', 'venture-capital'],
    sectionName: 'Capital Efficiency & Burn Multiple Analysis',
    ruSectionName: 'Анализ эффективности капитала и Burn Multiple',
    semanticType: 'analysis_protocol',
    instructions: [
      'Calculate Burn Multiple = Net Burn / Net New ARR for monthly and annual cohorts.',
      'Benchmark against SaaS industry tiers (Under 1.0x = Amazing, 1.0-1.5x = Good, 2.0x+ = Dangerous).',
      'Identify actionable headcount, marketing, or vendor levers to optimize the multiple.'
    ],
    ruInstructions: [
      'Рассчитайте Burn Multiple = Чистый Burn / Чистый прирост ARR за периоды.',
      'Сопоставьте с бенчмарками венчурного рынка (<1.0x отлично, >2.0x тревожно).',
      'Определите рычаги оптимизации расходов (ФОТ, маркетинг, вендоры).'
    ]
  },
  {
    id: 'magic-number-sales-efficiency',
    name: 'MagicNumberSalesEfficiencySkill',
    displayName: 'SaaS Magic Number & Go-To-Market Efficiency',
    categoryId: 'business',
    description: 'Evaluates Sales & Marketing return on investment to determine if go-to-market spending should be scaled or paused.',
    tags: ['business', 'saas', 'magic-number', 'gtm-efficiency', 'sales-velocity'],
    sectionName: 'SaaS Magic Number Evaluation',
    ruSectionName: 'Оценка эффективности продаж (SaaS Magic Number)',
    semanticType: 'analysis_protocol',
    instructions: [
      'Compute Magic Number = (Q_N Revenue - Q_N-1 Revenue) * 4 / (Q_N-1 S&M Expense).',
      'Interpret readiness to scale (Magic Number > 1.0 indicates green light to accelerate acquisition spend).',
      'Audit CAC payback periods by customer acquisition channel.'
    ],
    ruInstructions: [
      'Рассчитайте Magic Number = (Выручка Q_N - Выручка Q_N-1) * 4 / Расходы S&M Q_N-1.',
      'Сформулируйте вывод о готовности к масштабированию (>1.0x — сигнал к росту инвестиций в продажи).',
      'Проведите аудит окупаемости CAC по отдельным каналам привлечения.'
    ]
  },
  {
    id: 'net-revenue-retention-cohort-audit',
    name: 'NetRevenueRetentionCohortAuditSkill',
    displayName: 'Net Revenue Retention (NRR) & Expansion Modeling',
    categoryId: 'business',
    description: 'Models cohort expansion, gross churn, contraction, and upgrades to project compound organic ARR growth.',
    tags: ['business', 'nrr', 'retention', 'expansion-revenue', 'churn-modeling'],
    sectionName: 'NRR & Retention Cohort Modeling',
    ruSectionName: 'Моделирование когортного удержания выручки (NRR)',
    semanticType: 'analysis_protocol',
    instructions: [
      'Track cohort revenue: Starting ARR + Expansion - Contraction - Churn = Ending ARR.',
      'Derive Gross Revenue Retention (GRR) and Net Revenue Retention (NRR).',
      'Formulate specific account expansion playbooks (cross-sell, consumption tiers, enterprise add-ons).'
    ],
    ruInstructions: [
      'Постройте когортную матрицу: Начальный ARR + Расширение - Сжатие - Отток = Конечный ARR.',
      'Рассчитайте показатели GRR и NRR.',
      'Сформируйте план действий по допродажам и апгрейдам в ключевых сегментах.'
    ]
  },
  {
    id: 'customer-acquisition-cost-payback-matrix',
    name: 'CustomerAcquisitionCostPaybackMatrixSkill',
    displayName: 'Blended vs Paid CAC & Payback Period Matrix',
    categoryId: 'business',
    description: 'Disaggregates blended vs fully-loaded paid CAC, computing gross-margin adjusted payback periods.',
    tags: ['business', 'cac', 'cac-payback', 'unit-economics', 'gross-margin'],
    sectionName: 'CAC & Payback Period Disaggregation',
    ruSectionName: 'Детализация CAC и периода окупаемости с учетом маржинальности',
    semanticType: 'analysis_protocol',
    instructions: [
      'Calculate Fully Loaded Paid CAC (including sales salaries, software stack, and agency fees).',
      'Compute Gross Margin Adjusted Payback Period = CAC / (ARPU * Gross Margin %).',
      'Highlight payback risk thresholds across customer segments.'
    ],
    ruInstructions: [
      'Рассчитайте Fully-Loaded CAC (с учетом ФОТ сейлзов, комиссий и инструментов).',
      'Вычислите период окупаемости: CAC / (ARPU * % Валовой маржи).',
      'Выявите пороги риска окупаемости по типам клиентов.'
    ]
  },
  {
    id: 'b2b-enterprise-deal-meddpicc-scorecard',
    name: 'B2bEnterpriseDealMeddpiccScorecardSkill',
    displayName: 'MEDDPICC Enterprise Deal Qualification',
    categoryId: 'business',
    description: 'Audits complex enterprise pipeline deals across Metrics, Economic Buyer, Decision Criteria/Process, Paper Process, Pain, and Champion.',
    tags: ['business', 'sales', 'meddpicc', 'enterprise-deals', 'qualification'],
    sectionName: 'MEDDPICC Qualification Audit',
    ruSectionName: 'Квалификация enterprise-сделок по методологии MEDDPICC',
    semanticType: 'strategy_framework',
    instructions: [
      'Score each deal dimension: Metrics, Economic Buyer, Decision Criteria, Decision Process, Paper Process, Identified Pain, Champion, Competition.',
      'Flag deal-killing blind spots (e.g., lack of access to the economic buyer, unmapped procurement cycles).',
      'Define immediate closing actions to mitigate unvalidated criteria.'
    ],
    ruInstructions: [
      'Оцените сделку по каждому фактору MEDDPICC (метрики, ЛПР, критерии, процесс, боли, чемпион, конкуренты).',
      'Выделите критические риски (отсутствие доступа к бюджетодержателю, неясный цикл закупки).',
      'Составьте пошаговый план закрытия пробелов до дедлайна квартала.'
    ]
  },
  {
    id: 'rule-of-40-saas-valuation-optimizer',
    name: 'RuleOf40SaasValuationOptimizerSkill',
    displayName: 'Rule of 40 & SaaS Valuation Multiplier Tuning',
    categoryId: 'business',
    description: 'Balances YoY revenue growth rate against Free Cash Flow margin to maximize public/private market valuation multiples.',
    tags: ['business', 'rule-of-40', 'saas-metrics', 'valuation', 'fcf-margin'],
    sectionName: 'Rule of 40 Optimization Analysis',
    ruSectionName: 'Оптимизация Rule of 40 и мультипликаторов оценки',
    semanticType: 'strategy_framework',
    instructions: [
      'Calculate Score = YoY Revenue Growth % + Free Cash Flow Margin %.',
      'Assess corporate health against the 40% benchmark under current market conditions.',
      'Determine whether capital allocation should pivot toward accelerated growth or cash preservation.'
    ],
    ruInstructions: [
      'Рассчитайте показатель: Темп роста выручки % + Маржа FCF %.',
      'Оцените положение компании относительно целевой планки 40%.',
      'Сформируйте рекомендации по перебалансировке ресурсов между ростом и рентабельностью.'
    ]
  },
  {
    id: 'tam-sam-som-market-sizing-triangulation',
    name: 'TamSamSomMarketSizingTriangulationSkill',
    displayName: 'TAM / SAM / SOM Market Sizing Triangulation',
    categoryId: 'business',
    description: 'Triangulates addressable market sizing using top-down industry reports, bottom-up unit pricing, and value-theory models.',
    tags: ['business', 'market-sizing', 'tam', 'sam', 'som', 'investor-readiness'],
    sectionName: 'TAM / SAM / SOM Triangulation Protocol',
    ruSectionName: 'Триангуляция оценки объема рынка (TAM / SAM / SOM)',
    semanticType: 'analysis_protocol',
    instructions: [
      'Calculate Bottom-Up Market Size: Total Count of Target Accounts * Realistic Annual Contract Value (ACV).',
      'Compare against Top-Down industry analyst figures and highlight discrepancies.',
      'Define the Serviceable Obtainable Market (SOM) based on practical 3-year distribution capacity.'
    ],
    ruInstructions: [
      'Рассчитайте рынок снизу-вверх: Количество потенциальных клиентов * Реалистичный ACV.',
      'Сопоставьте с отраслевыми отчетами сверху-вниз и обоснуйте расхождения.',
      'Определите достижимый рынок SOM с учетом фактических каналов продаж за 3 года.'
    ]
  },
  {
    id: 'van-westendorp-pricing-sensitivity',
    name: 'VanWestendorpPricingSensitivitySkill',
    displayName: 'Van Westendorp Price Sensitivity Meter (PSM)',
    categoryId: 'business',
    description: 'Determines the Point of Marginal Cheapness, Optimal Price Point, and Indifference Price Point from customer survey data.',
    tags: ['business', 'pricing', 'van-westendorp', 'psm', 'willingness-to-pay'],
    sectionName: 'Van Westendorp Price Sensitivity Analysis',
    ruSectionName: 'Анализ ценовой чувствительности по Ван Вестендорпу',
    semanticType: 'analysis_protocol',
    instructions: [
      'Map the four survey curves: Too Cheap, Cheap (Bargain), Expensive, Too Expensive.',
      'Identify the Optimal Price Point (OPP) and Point of Marginal Expensiveness (PME).',
      'Provide package tiering recommendations based on price elasticity inflection points.'
    ],
    ruInstructions: [
      'Постройте 4 кривые восприятия: Слишком дешево, Выгодно, Дорого, Слишком дорого.',
      'Определите оптимальную цену (OPP) и предельную цену дороговизны (PME).',
      'Сформулируйте структуру тарифной сетки с учетом эластичности спроса.'
    ]
  },
  {
    id: 'cap-table-dilution-scenario-modeler',
    name: 'CapTableDilutionScenarioModelerSkill',
    displayName: 'Cap Table Dilution & Waterfall Modeling',
    categoryId: 'business',
    description: 'Models SAFE conversion, ESOP option pool creation, liquidation preferences, and multi-round founder dilution waterfalls.',
    tags: ['business', 'cap-table', 'dilution', 'safe-note', 'liquidation-preference'],
    sectionName: 'Cap Table & Dilution Waterfall Modeling',
    ruSectionName: 'Моделирование таблицы долей (Cap Table) и сценариев размытия',
    semanticType: 'analysis_protocol',
    instructions: [
      'Model pre-money vs post-money SAFE note conversions including valuation caps and discount rates.',
      'Simulate unallocated ESOP expansion impact on existing common stockholders.',
      'Calculate liquidation waterfall payouts across 1x Non-Participating vs Participating Preferred tiers.'
    ],
    ruInstructions: [
      'Смоделируйте конвертацию SAFE с учетом valuation cap и дисконта (pre vs post-money).',
      'Рассчитайте влияние расширения опционного пула ESOP на долю основателей.',
      'Постройте водопад выплат при различных сценариях экзита с учетом преференций.'
    ]
  },
  {
    id: 'rfp-enterprise-proposal-evaluator',
    name: 'RfpEnterpriseProposalEvaluatorSkill',
    displayName: 'RFP Response Architecture & Compliance Matrix',
    categoryId: 'business',
    description: 'Structures enterprise RFP responses with compliant traceability matrices, executive summaries, and technical proof points.',
    tags: ['business', 'rfp', 'procurement', 'proposals', 'enterprise-sales'],
    sectionName: 'Enterprise RFP Response Framework',
    ruSectionName: 'Структура ответов на RFP и комплаенс-матрица',
    semanticType: 'strategy_framework',
    instructions: [
      'Build a Requirements Traceability Matrix matching every RFP clause to solution features.',
      'Draft high-impact Executive Summaries spotlighting direct ROI and risk elimination.',
      'Validate SLA, security, and integration compliance commitments.'
    ],
    ruInstructions: [
      'Составьте матрицу соответствия требований RFP функционалу продукта.',
      'Напишите executive summary с фокусом на финансовый ROI и устранение операционных рисков.',
      'Проверьте соответствие заявленных SLA, протоколов безопасности и интеграций.'
    ]
  },
  {
    id: 'plg-self-serve-funnel-optimizer',
    name: 'PlgSelfServeFunnelOptimizerSkill',
    displayName: 'Product-Led Growth (PLG) Funnel & Time-to-Value',
    categoryId: 'business',
    description: 'Optimizes self-serve conversion funnels, onboarding aha-moments, product-qualified leads (PQL), and freemium upgrade triggers.',
    tags: ['business', 'plg', 'product-led-growth', 'pql', 'time-to-value', 'activation'],
    sectionName: 'PLG Funnel & Activation Optimization',
    ruSectionName: 'Оптимизация PLG-воронки и пути к Time-to-Value',
    semanticType: 'strategy_framework',
    instructions: [
      'Map Time-to-Value (TTV) and identify steps causing early drop-off.',
      'Define strict Product-Qualified Lead (PQL) behavioral criteria triggering sales outreach.',
      'Engineer contextual in-app paywalls and feature limits aligned with user value milestones.'
    ],
    ruInstructions: [
      'Измерьте Time-to-Value (TTV) и устраните барьеры в онбординге.',
      'Сформулируйте триггеры PQL (Product-Qualified Lead) для передачи пользователей в продажи.',
      'Спроектируйте нативные пейволлы и лимиты, активируемые в моменты максимальной ценности.'
    ]
  },
  {
    id: 'seven-powers-competitive-moat-audit',
    name: 'SevenPowersCompetitiveMoatAuditSkill',
    displayName: 'Helmer 7 Powers Moat & Defensibility Audit',
    categoryId: 'business',
    description: 'Applies Hamilton Helmer’s 7 Powers framework (Scale Economies, Network Effects, Counter-Positioning, Switching Costs, Branding, Cornered Resource, Process Power).',
    tags: ['business', '7-powers', 'competitive-advantage', 'strategy', 'moat'],
    sectionName: '7 Powers Defensibility Audit',
    ruSectionName: 'Аудит стратегических барьеров по модели 7 Powers',
    semanticType: 'analysis_protocol',
    instructions: [
      'Audit the business against all 7 Powers and score current vs durable defensibility.',
      'Identify structural counter-positioning opportunities against incumbents.',
      'Draft a strategy roadmap to build high-switching-cost flywheels.'
    ],
    ruInstructions: [
      'Оцените силу компании по 7 факторам Хелмера (сетевые эффекты, контр-позиционирование, издержки переключения и т.д.).',
      'Найдите точки структурного контр-позиционирования против лидеров рынка.',
      'Сформируйте план построения долгосрочных защитных рвов вокруг продукта.'
    ]
  },
  {
    id: 'b2b-customer-success-health-scorecard',
    name: 'B2bCustomerSuccessHealthScorecardSkill',
    displayName: 'B2B Customer Health Scoring & Churn Early Warning',
    categoryId: 'business',
    description: 'Combines telemetry, support ticket velocity, NPS, license utilization, and champion departures into an automated account health score.',
    tags: ['business', 'customer-success', 'health-score', 'churn-prevention', 'retention'],
    sectionName: 'Customer Health Scoring Protocol',
    ruSectionName: 'Скоринг здоровья B2B-клиентов и ранее предупреждение оттока',
    semanticType: 'process_directive',
    instructions: [
      'Aggregate 5 health pillars: Feature Adoption %, Active Users / Total Seats, Ticket Escalation Count, Executive Engagement, Invoice Payment Timeliness.',
      'Classify accounts into Red, Yellow, Green status with automated alert triggers.',
      'Specify immediate intervention playbooks for at-risk enterprise accounts.'
    ],
    ruInstructions: [
      'Объедините метрики здоровья: % использования фичей, утилизация лицензий, эскалации тикетов, контакт с ЛПР.',
      'Классифицируйте аккаунты (Red / Yellow / Green) с автоматическими алертами.',
      'Назначьте регламенты спасения и удержания для клиентов в красной зоне.'
    ]
  },
  {
    id: 'm-and-a-commercial-due-diligence',
    name: 'MAndACommercialDueDiligenceSkill',
    displayName: 'M&A Commercial Due Diligence & Synergy Analysis',
    categoryId: 'business',
    description: 'Evaluates acquisition targets for customer concentration risks, tech stack debt, recurring revenue quality, and cost/revenue synergies.',
    tags: ['business', 'm-and-a', 'due-diligence', 'synergies', 'private-equity'],
    sectionName: 'Commercial Due Diligence Matrix',
    ruSectionName: 'Коммерческий Due Diligence и анализ синергий при слияниях',
    semanticType: 'analysis_protocol',
    instructions: [
      'Analyze customer concentration (e.g. top 5 accounts > 30% revenue risk).',
      'Audit churn cohorts and cohort lifetime value (LTV/CAC durability).',
      'Quantify realistic Year 1-3 cost synergies and cross-sell revenue synergies.'
    ],
    ruInstructions: [
      'Проанализируйте концентрацию выручки на ключевых клиентах (риск ухода топ-5).',
      'Проверьте устойчивость когорт LTV/CAC и исторический отток.',
      'Количественно оцените синергии расходов и перекрестных продаж на горизонте 1-3 лет.'
    ]
  },
  {
    id: 'working-capital-cash-conversion-cycle',
    name: 'WorkingCapitalCashConversionCycleSkill',
    displayName: 'Cash Conversion Cycle (CCC) & Working Capital',
    categoryId: 'business',
    description: 'Optimizes Days Sales Outstanding (DSO), Days Inventory Outstanding (DIO), and Days Payable Outstanding (DPO) to unlock liquidity.',
    tags: ['business', 'finance', 'cash-flow', 'working-capital', 'cash-conversion-cycle'],
    sectionName: 'Cash Conversion Cycle Optimization',
    ruSectionName: 'Оптимизация цикла конверсии денежных средств (CCC)',
    semanticType: 'analysis_protocol',
    instructions: [
      'Calculate CCC = DIO + DSO - DPO.',
      'Identify bottlenecks in invoicing, accounts receivable collections, and vendor payment terms.',
      'Formulate working capital improvements to reduce dependency on external debt.'
    ],
    ruInstructions: [
      'Рассчитайте CCC = Оборачиваемость запасов + Оборачиваемость дебиторки - Отсрочка кредиторки.',
      'Выявите задержки в выставлении счетов, сборе дебиторской задолженности и согласовании условий с поставщиками.',
      'Предложите шаги по высвобождению оборотного капитала без привлечения кредитов.'
    ]
  },
  {
    id: 'partner-ecosystem-co-sell-framework',
    name: 'PartnerEcosystemCoSellFrameworkSkill',
    displayName: 'Channel Partner & Co-Selling Ecosystem Framework',
    categoryId: 'business',
    description: 'Designs reseller tiering, margin sharing, marketplace listings (AWS, Azure, GCP), and joint co-selling incentive structures.',
    tags: ['business', 'partnerships', 'co-sell', 'channel-sales', 'alliances'],
    sectionName: 'Co-Sell & Partner Channel Architecture',
    ruSectionName: 'Архитектура партнерских продаж и совместного со-селлинга',
    semanticType: 'strategy_framework',
    instructions: [
      'Establish partner tiers (Referral, Certified Reseller, Strategic Global Integrator).',
      'Define margin splits, lead-registration rules, and conflict resolution protocols.',
      'Structure cloud marketplace listings with private offers and committed spend drawdown.'
    ],
    ruInstructions: [
      'Определите партнерские уровни (реферальные партнеры, интеграторы, глобальные альянсы).',
      'Сформулируйте маржинальные схемы, правила защиты сделок и урегулирования конфликтов.',
      'Настройте каналы через облачные маркетплейсы с списанием с коммитментов клиентов.'
    ]
  },
  {
    id: 'dynamic-surge-pricing-algorithm-design',
    name: 'DynamicSurgePricingAlgorithmDesignSkill',
    displayName: 'Dynamic Surge & Demand-Based Pricing Logic',
    categoryId: 'business',
    description: 'Formulates algorithmic pricing rules adapting to real-time supply scarcity, demand spikes, inventory perishability, and competitor movements.',
    tags: ['business', 'pricing', 'dynamic-pricing', 'yield-management', 'algorithms'],
    sectionName: 'Dynamic Pricing & Yield Management',
    ruSectionName: 'Динамическое ценообразование и управление доходностью',
    semanticType: 'process_directive',
    instructions: [
      'Specify input variables: Current Demand Velocity, Available Capacity %, Competitor Floor/Ceiling, Historical Elasticity.',
      'Define floor/ceiling safety boundaries preventing customer backlash or price gouging.',
      'Set automated throttling and smoothing functions across time intervals.'
    ],
    ruInstructions: [
      'Определите входные переменные (скорость спроса, загрузка мощностей, цены конкурентов).',
      'Задайте жесткие защитные коридоры (min/max), предотвращающие негатив клиентов.',
      'Опишите алгоритм сглаживания цен во избежание резких скачков.'
    ]
  },
  {
    id: 'sales-compensation-quota-commission-model',
    name: 'SalesCompensationQuotaCommissionModelSkill',
    displayName: 'Sales Compensation, OTE & Commission Accelerator Modeling',
    categoryId: 'business',
    description: 'Designs rep compensation plans with base/variable splits, On-Target Earnings (OTE), quota-to-OTE ratios, and multi-tier accelerators.',
    tags: ['business', 'sales-ops', 'compensation', 'commissions', 'quota-planning'],
    sectionName: 'Sales Compensation Plan Architecture',
    ruSectionName: 'Архитектура планов мотивации и комиссионных сейлзов',
    semanticType: 'strategy_framework',
    instructions: [
      'Set target Base/Variable split (e.g. 50/50 for AEs, 70/30 for AMs) and Quota:OTE multiple (4x-6x).',
      'Design graduated commission accelerators (e.g. 1.5x at 100-120% quota, 2.0x above 120%).',
      'Incorporate clawback terms for cancellations occurring within initial contract windows.'
    ],
    ruInstructions: [
      'Установите пропорцию фикс/бонус (50/50 для AE, 70/30 для AM) и коэффициент Quota:OTE (4x-6x).',
      'Спроектируйте ступени акселераторов за перевыполнение плана (1.5x при 100-120%, 2x свыше 120%).',
      'Внедрите условия возврата комиссионных (clawback) при досрочном расторжении контрактов.'
    ]
  },
  {
    id: 'esg-sustainability-roi-reporting-framework',
    name: 'EsgSustainabilityRoiReportingFrameworkSkill',
    displayName: 'ESG Sustainability & Carbon Accounting ROI',
    categoryId: 'business',
    description: 'Quantifies Scope 1-3 emissions reduction ROI, sustainable procurement impact, and compliance readiness for ESG capital mandates.',
    tags: ['business', 'esg', 'sustainability', 'carbon-accounting', 'corporate-governance'],
    sectionName: 'ESG ROI & Carbon Accounting Framework',
    ruSectionName: 'Оценка ROI устойчивого развития (ESG) и углеродного учета',
    semanticType: 'analysis_protocol',
    instructions: [
      'Establish Scope 1, 2, and 3 baseline reporting workflows.',
      'Link ESG investments directly to cost savings (energy reduction, material efficiency) and lower debt financing costs.',
      'Prepare auditable compliance disclosures aligned with CSRD and SEC climate rules.'
    ],
    ruInstructions: [
      'Сформируйте контур учета выбросов Scope 1, 2 и 3.',
      'Свяжите экологические инициативы с сокращением издержек и снижением ставки по кредитам.',
      'Подготовьте прозрачную отчетность по стандартам CSRD и климатическим директивам.'
    ]
  },
  {
    id: 'crisis-business-continuity-disaster-recovery',
    name: 'CrisisBusinessContinuityDisasterRecoverySkill',
    displayName: 'Business Continuity Plan (BCP) & Financial Contingency',
    categoryId: 'business',
    description: 'Drafts operational and financial disaster recovery playbooks for severe macroeconomic shocks, runway shortfalls, and supply cutoffs.',
    tags: ['business', 'bcp', 'disaster-recovery', 'crisis-management', 'contingency-planning'],
    sectionName: 'Business Continuity & Crisis Contingency',
    ruSectionName: 'План непрерывности бизнеса и кризисное финансовое планирование',
    semanticType: 'strategy_framework',
    instructions: [
      'Map critical business functions, Recovery Time Objectives (RTO), and minimum viable operations.',
      'Model 3 severe downside cash scenarios (e.g. 50% revenue drop) with immediate cost reduction triggers.',
      'Establish clear crisis decision-making command hierarchies and external stakeholder communication sequences.'
    ],
    ruInstructions: [
      'Определите критические функции, целевое время восстановления (RTO) и минимальный рабочий режим.',
      'Смоделируйте стресс-сценарии движения денег (падение выручки на 50%) с автоматическими триггерами сокращения расходов.',
      'Установите цепочку принятия решений в кризисе и протокол коммуникации с инвесторами и клиентами.'
    ]
  }
];

module.exports = { newBusinessSkills };
