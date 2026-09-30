const newResearchSkills = [
  {
    id: 'prisma-systematic-review-flowchart',
    name: 'PrismaSystematicReviewFlowchartSkill',
    displayName: 'PRISMA 2020 Systematic Review & Meta-Analysis Protocol',
    categoryId: 'research',
    description: 'Structures literature searching, deduplication, screening, eligibility, and inclusion following the PRISMA 2020 27-item checklist.',
    tags: ['research', 'prisma', 'systematic-review', 'meta-analysis', 'literature-search'],
    sectionName: 'PRISMA Systematic Review Protocol',
    ruSectionName: 'Протокол систематического обзора по стандарту PRISMA 2020',
    semanticType: 'process_directive',
    instructions: [
      'Document explicit database search strings, date boundaries, and language filters.',
      'Record study numbers across Identification, Screening, Eligibility, and Final Inclusion stages.',
      'Assess study risk of bias and heterogeneity across extracted cohorts.'
    ],
    ruInstructions: [
      'Зафиксируйте поисковые запросы по базам данных, временные рамки и фильтры.',
      'Отразите количество работ на этапах идентификации, скрининга, проверки критериев и включения.',
      'Оцените риск систематической ошибки (bias) и гетерогенность включенных исследований.'
    ]
  },
  {
    id: 'ab-test-sample-size-power-analysis',
    name: 'AbTestSampleSizePowerAnalysisSkill',
    displayName: 'Statistical Power Analysis & Sample Size Determination',
    categoryId: 'research',
    description: 'Calculates minimum required sample size based on statistical power (1 - beta = 0.80), significance (alpha = 0.05), and Minimum Detectable Effect (MDE).',
    tags: ['research', 'statistics', 'ab-testing', 'power-analysis', 'sample-size'],
    sectionName: 'Statistical Power & Sample Size Protocol',
    ruSectionName: 'Расчет статистической мощности и необходимого размера выборки',
    semanticType: 'analysis_protocol',
    instructions: [
      'Define baseline conversion rate and specify Minimum Detectable Effect (MDE) in relative %.',
      'Set alpha = 0.05 (two-tailed) and statistical power (1 - beta) = 0.80.',
      'Calculate required sample size per variant and estimate required runtime in days to avoid peeking bias.'
    ],
    ruInstructions: [
      'Определите базовую конверсию и минимальный обнаруживаемый эффект (MDE).',
      'Задайте уровень значимости alpha = 0.05 и мощность теста (1 - beta) = 0.80.',
      'Рассчитайте объем выборки на каждую группу и длительность теста для исключения ошибки подглядывания.'
    ]
  },
  {
    id: 'qualitative-thematic-analysis-braun-clarke',
    name: 'QualitativeThematicAnalysisBraunClarkeSkill',
    displayName: 'Braun & Clarke 6-Phase Thematic Analysis',
    categoryId: 'research',
    description: 'Executes qualitative transcript coding: Familiarization, Generating Initial Codes, Searching for Themes, Reviewing Themes, Defining Themes, and Reporting.',
    tags: ['research', 'qualitative', 'thematic-analysis', 'coding', 'grounded-theory'],
    sectionName: 'Braun & Clarke Thematic Analysis',
    ruSectionName: 'Шестиэтапный тематический анализ по Браун и Кларк',
    semanticType: 'process_directive',
    instructions: [
      'Familiarize with interview transcripts and generate granular inductive line-by-line codes.',
      'Cluster open codes into candidate overarching themes and sub-themes.',
      'Produce a thematic map supported by verbatim interview excerpts.'
    ],
    ruInstructions: [
      'Изучите транскрипты интервью и проведите построчное индуктивное кодирование.',
      'Сгруппируйте первичные коды в смысловые темы и подтемы.',
      'Постройте тематическую карту с цитатами респондентов.'
    ]
  },
  {
    id: 'causal-inference-diff-in-diff-synthetic-control',
    name: 'CausalInferenceDiffInDiffSyntheticControlSkill',
    displayName: 'Causal Inference (Difference-in-Differences & Synthetic Controls)',
    categoryId: 'research',
    description: 'Evaluates policy interventions and product feature rollouts using Difference-in-Differences (DiD) and Synthetic Control econometric methods.',
    tags: ['research', 'econometrics', 'causal-inference', 'diff-in-diff', 'synthetic-control'],
    sectionName: 'Causal Inference & Econometric Protocol',
    ruSectionName: 'Причинно-следственный вывод (Diff-in-Diff и синтетический контроль)',
    semanticType: 'analysis_protocol',
    instructions: [
      'Test parallel trends assumption in pre-treatment baseline periods.',
      'Estimate DiD interaction coefficient: (Y_treatment_post - Y_treatment_pre) - (Y_control_post - Y_control_pre).',
      'Construct a synthetic control unit via weighted combination of untreated units when control groups are non-parallel.'
    ],
    ruInstructions: [
      'Проверьте гипотезу параллельных трендов в доинтервенционный период.',
      'Рассчитайте коэффициент разности разностей (Difference-in-Differences).',
      'Сформируйте синтетическую контрольную группу на основе взвешенной комбинации наблюдений.'
    ]
  },
  {
    id: 'double-blind-rct-protocol-generator',
    name: 'DoubleBlindRctProtocolGeneratorSkill',
    displayName: 'Randomized Controlled Trial (RCT) Clinical Protocol',
    categoryId: 'research',
    description: 'Drafts gold-standard double-blind RCT protocols covering block randomization, sham/placebo controls, and primary endpoint definitions.',
    tags: ['research', 'rct', 'clinical-trials', 'experimental-design', 'placebo-control'],
    sectionName: 'Double-Blind RCT Protocol Specification',
    ruSectionName: 'Спецификация протокола двойного слепого рандомизированного исследования',
    semanticType: 'strategy_framework',
    instructions: [
      'Define clear Primary and Secondary Endpoints with explicit clinical measurement timeframes.',
      'Specify computer-generated block stratification randomization to balance covariates.',
      'Describe unblinding safety emergency criteria and Independent Data Monitoring Committee (IDMC) charters.'
    ],
    ruInstructions: [
      'Определите первичные и вторичные конечные точки с точными сроками измерения.',
      'Опишите стратифицированную блочную рандомизацию для выравнивания ковариат.',
      'Зафиксируйте правила экстренного раскрытия слепоты и регламент работы комитета по мониторингу данных.'
    ]
  },
  {
    id: 'delphi-expert-consensus-panel-method',
    name: 'DelphiExpertConsensusPanelMethodSkill',
    displayName: 'Modified Delphi Expert Consensus Method',
    categoryId: 'research',
    description: 'Facilitates multi-round anonymous expert consensus polling with inter-round statistical feedback and predefined agreement thresholds.',
    tags: ['research', 'delphi-method', 'expert-consensus', 'panel-survey', 'forecasting'],
    sectionName: 'Delphi Consensus Protocol',
    ruSectionName: 'Протокол экспертного консенсуса по методу Дельфи',
    semanticType: 'process_directive',
    instructions: [
      'Round 1: Open-ended qualitative issue identification.',
      'Round 2-3: Quantitative Likert ratings with statistical summary feedback (median and IQR).',
      'Define consensus threshold (e.g. >=80% agreement in ratings 7-9 on a 9-point scale).'
    ],
    ruInstructions: [
      'Раунд 1: Качественный сбор экспертных мнений в свободной форме.',
      'Раунды 2-3: Количественная оценка по шкале Лайкерта с показом распределения (медиана и квартили).',
      'Установите порог консенсуса (например, >=80% согласия по ключевым утверждениям).'
    ]
  },
  {
    id: 'multivariate-regression-multicollinearity-diagnostics',
    name: 'MultivariateRegressionMulticollinearityDiagnosticsSkill',
    displayName: 'Multivariate Regression & Collinearity Diagnostics (VIF)',
    categoryId: 'research',
    description: 'Validates OLS/GLM regression assumptions: Variance Inflation Factor (VIF < 5), heteroscedasticity (Breusch-Pagan), and normality of residuals.',
    tags: ['research', 'statistics', 'regression', 'vif', 'multicollinearity', 'ols'],
    sectionName: 'Regression Diagnostics Protocol',
    ruSectionName: 'Диагностика мультиколлинеарности и предпосылок регрессии (VIF)',
    semanticType: 'analysis_protocol',
    instructions: [
      'Compute Variance Inflation Factors (VIF); flag variables with VIF > 5 for dimensionality reduction.',
      'Test for heteroscedasticity and apply Huber-White robust standard errors if detected.',
      'Inspect Cook’s distance to identify influential outlier observations.'
    ],
    ruInstructions: [
      'Рассчитайте фактор инфляции дисперсии (VIF); исключите переменные с VIF > 5.',
      'Проверьте гетероскедастичность и примените робастные стандартные ошибки Хубера-Уайта.',
      'Проанализируйте расстояние Кука для выявления искажающих выбросов.'
    ]
  },
  {
    id: 'factor-analysis-cronbach-alpha-validation',
    name: 'FactorAnalysisCronbachAlphaValidationSkill',
    displayName: 'Exploratory Factor Analysis & Cronbach’s Alpha',
    categoryId: 'research',
    description: 'Evaluates psychometric survey validity: Kaiser-Meyer-Olkin (KMO > 0.8), Bartlett’s sphericity, eigenvalue scree plots, and Cronbach’s alpha internal consistency.',
    tags: ['research', 'psychometrics', 'factor-analysis', 'cronbachs-alpha', 'survey-design'],
    sectionName: 'Psychometric & Factor Analysis Protocol',
    ruSectionName: 'Факторный анализ и оценка надежности (Альфа Кронбаха)',
    semanticType: 'analysis_protocol',
    instructions: [
      'Verify sampling adequacy with KMO test (> 0.70) and Bartlett’s test of sphericity (p < 0.05).',
      'Perform Exploratory Factor Analysis (EFA) with Promax or Varimax rotation.',
      'Calculate Cronbach’s alpha internal consistency for each extracted factor (target alpha >= 0.80).'
    ],
    ruInstructions: [
      'Проверьте применимость выборки по тесту KMO (> 0.70) и сферичности Бартлетта.',
      'Проведите эксплораторный факторный анализ с варимакс- или промакс-вращением.',
      'Рассчитайте коэффициент альфа Кронбаха для каждой шкалы (целевое значение >= 0.80).'
    ]
  },
  {
    id: 'propensity-score-matching-observational-studies',
    name: 'PropensityScoreMatchingObservationalStudiesSkill',
    displayName: 'Propensity Score Matching (PSM) for Observational Data',
    categoryId: 'research',
    description: 'Mitigates confounding selection bias in observational cohorts via logistic propensity modeling and nearest-neighbor caliper matching.',
    tags: ['research', 'statistics', 'propensity-score', 'matching', 'observational-data'],
    sectionName: 'Propensity Score Matching Protocol',
    ruSectionName: 'Протокол псевдорандомизации (Propensity Score Matching)',
    semanticType: 'analysis_protocol',
    instructions: [
      'Fit logistic regression estimating treatment probability given baseline covariates.',
      'Perform 1:1 nearest-neighbor matching within caliper width (e.g. 0.2 * SD of logit score).',
      'Check post-match covariate balance using standardized mean differences (SMD < 0.10).'
    ],
    ruInstructions: [
      'Постройте логистическую регрессию для расчета вероятности назначения лечения по ковариатам.',
      'Проведите сопоставление 1:1 ближайшего соседа в пределах заданного калипера.',
      'Проверьте баланс групп после сопоставления по стандартизованной разности средних (SMD < 0.10).'
    ]
  },
  {
    id: 'survival-analysis-kaplan-meier-cox-proportional',
    name: 'SurvivalAnalysisKaplanMeierCoxProportionalSkill',
    displayName: 'Survival Analysis (Kaplan-Meier & Cox Proportional Hazards)',
    categoryId: 'research',
    description: 'Models time-to-event outcomes, right-censored data, log-rank curve comparisons, and Cox proportional hazards regression ratios.',
    tags: ['research', 'survival-analysis', 'kaplan-meier', 'cox-hazards', 'time-to-event'],
    sectionName: 'Survival Analysis Protocol',
    ruSectionName: 'Анализ выживаемости (Каплан-Мейер и регрессия Кокса)',
    semanticType: 'analysis_protocol',
    instructions: [
      'Plot Kaplan-Meier survival curves and perform Log-Rank tests between cohorts.',
      'Fit Cox Proportional Hazards model and test proportional hazards assumption (Schoenfeld residuals).',
      'Report Hazard Ratios (HR) with 95% confidence intervals and p-values.'
    ],
    ruInstructions: [
      'Постройте кривые дожития Каплана-Мейера и сравните группы лог-ранговым тестом.',
      'Постройте модель Кокса и проверьте гипотезу пропорциональности рисков (остатки Шенфельда).',
      'Приведите отношения рисков (Hazard Ratios) с 95% доверительными интервалами.'
    ]
  },
  {
    id: 'academic-grant-proposal-aims-significance-nih',
    name: 'AcademicGrantProposalAimsSignificanceNihSkill',
    displayName: 'NIH R01 Grant Proposal Structure (Specific Aims & Significance)',
    categoryId: 'research',
    description: 'Drafts competitive scientific grant proposals matching NIH scoring criteria: Significance, Innovation, Approach, and Specific Aims.',
    tags: ['research', 'grant-writing', 'nih-r01', 'funding-proposals', 'academic'],
    sectionName: 'NIH Grant Specific Aims Architecture',
    ruSectionName: 'Структура грантовой заявки (NIH Specific Aims & Significance)',
    semanticType: 'strategy_framework',
    instructions: [
      'Draft a 1-page Specific Aims document with hook, critical barrier, overarching hypothesis, and 2-3 independent aims.',
      'Articulate scientific Significance and Paradigm-Shifting Innovation explicitly.',
      'Include preliminary data proof points and potential pitfalls with alternative contingency paths.'
    ],
    ruInstructions: [
      'Составьте 1-страничный документ Specific Aims с гипотезой и 2-3 независимыми задачами.',
      'Опишите научную новизну, значимость для отрасли и сдвиг парадигмы.',
      'Укажите предварительные данные и план действий при возникновении методологических рисков.'
    ]
  },
  {
    id: 'bayesian-ab-testing-posterior-loss-function',
    name: 'BayesianAbTestingPosteriorLossFunctionSkill',
    displayName: 'Bayesian A/B Testing & Expected Loss Modeling',
    categoryId: 'research',
    description: 'Calculates Beta-Binomial posterior distributions, probability of being best, and expected loss to enable continuous test decision-making.',
    tags: ['research', 'bayesian', 'ab-testing', 'expected-loss', 'statistics'],
    sectionName: 'Bayesian A/B Testing Protocol',
    ruSectionName: 'Байесовское A/B тестирование и моделирование ожидаемых потерь',
    semanticType: 'analysis_protocol',
    instructions: [
      'Set prior distributions (Beta conjugate prior for binomial conversion metrics).',
      'Update posterior distributions with observed successes and trials: Beta(alpha + wins, beta + losses).',
      'Compute Probability to be Best and Expected Loss; declare winner when Expected Loss is below threshold.'
    ],
    ruInstructions: [
      'Задайте априорные распределения (сопряженное бета-распределение).',
      'Обновите апостериорные распределения на основе фактических конверсий: Beta(alpha + k, beta + n - k).',
      'Рассчитайте вероятность превосходства и ожидаемые потери (Expected Loss) для принятия решения.'
    ]
  },
  {
    id: 'user-interview-open-ended-funneling-guide',
    name: 'UserInterviewOpenEndedFunnelingGuideSkill',
    displayName: 'User Research Interview Guide & TED Funneling',
    categoryId: 'research',
    description: 'Constructs unbiased qualitative interview scripts using TED questions (Tell me, Explain to me, Describe to me) without leading prompts.',
    tags: ['research', 'user-research', 'interviews', 'ux-research', 'funneling'],
    sectionName: 'Qualitative Interview Script Protocol',
    ruSectionName: 'Гайд глубинного интервью и методика вопросов TED',
    semanticType: 'process_directive',
    instructions: [
      'Eliminate leading, binary, or future-predictive questions ("Would you buy X?").',
      'Deploy TED format: "Tell me about the last time you...", "Describe what happened when...", "Explain why...".',
      'Follow the 5-Whys root cause probing sequence to uncover unarticulated emotional friction.'
    ],
    ruInstructions: [
      'Исключите наводящие и гипотетические вопросы ("Купили бы вы...?").',
      'Используйте формулу TED: "Расскажите о последнем случае...", "Опишите, как вы...", "Объясните, почему...".',
      'Примените технику 5 почему для выявления истинных скрытых мотивов.'
    ]
  },
  {
    id: 'mixed-methods-convergent-triangulation-design',
    name: 'MixedMethodsConvergentTriangulationDesignSkill',
    displayName: 'Mixed Methods Convergent Parallel Triangulation',
    categoryId: 'research',
    description: 'Integrates quantitative survey datasets and qualitative contextual interviews to cross-validate convergent findings.',
    tags: ['research', 'mixed-methods', 'triangulation', 'creswell', 'data-synthesis'],
    sectionName: 'Mixed Methods Triangulation Protocol',
    ruSectionName: 'Смешанные методы и параллельная триангуляция данных (Mixed Methods)',
    semanticType: 'strategy_framework',
    instructions: [
      'Collect quantitative and qualitative datasets concurrently.',
      'Map quantitative statistical distributions against qualitative user quotes in a joint display matrix.',
      'Investigate and resolve discordant or divergent findings with secondary probing.'
    ],
    ruInstructions: [
      'Соберите количественные метрики и качественные интервью параллельно.',
      'Сопоставьте статистические тренды с цитатами респондентов в сводной матрице.',
      'Детально разберите расхождения и парадоксы между цифрами и словами пользователей.'
    ]
  },
  {
    id: 'card-sorting-information-architecture-analysis',
    name: 'CardSortingInformationArchitectureAnalysisSkill',
    displayName: 'Open & Closed Card Sorting Information Architecture Analysis',
    categoryId: 'research',
    description: 'Analyzes similarity matrices, dendrogram clustering, and category naming from user card sorting studies to design navigation taxonomies.',
    tags: ['research', 'card-sorting', 'information-architecture', 'ux-research', 'navigation'],
    sectionName: 'Card Sorting & Taxonomy Protocol',
    ruSectionName: 'Анализ карточной сортировки и информационной архитектуры',
    semanticType: 'analysis_protocol',
    instructions: [
      'Calculate item co-occurrence similarity matrix from open/closed card sorting sessions.',
      'Generate hierarchical cluster dendrograms identifying natural conceptual clusters.',
      'Derive intuitive navigation menu labeling matching the mental models of >=80% of participants.'
    ],
    ruInstructions: [
      'Постройте матрицу парной совместной встречаемости элементов.',
      'Проанализируйте дендрограмму кластеризации для выделения естественных категорий.',
      'Сформируйте структуру меню и навигационные метки, понятные 80%+ участников.'
    ]
  },
  {
    id: 'synthetic-persona-validation-sampling',
    name: 'SyntheticPersonaValidationSamplingSkill',
    displayName: 'Synthetic Persona Validation & Grounded Micro-Surveys',
    categoryId: 'research',
    description: 'Constructs research-grounded synthetic persona cohorts conditioned on real demographic and behavioral distributions for rapid hypothesis testing.',
    tags: ['research', 'synthetic-personas', 'validation', 'sampling', 'ai-research'],
    sectionName: 'Synthetic Persona Sampling Protocol',
    ruSectionName: 'Валидация синтетических персон и микро-опросы',
    semanticType: 'process_directive',
    instructions: [
      'Ground synthetic persona attributes in verified demographic distributions.',
      'Run simulated micro-surveys probing cognitive friction and decision triggers.',
      'Audit synthetic findings against empirical baseline samples to prevent model bias.'
    ],
    ruInstructions: [
      'Опишите профили синтетических персон на основе проверенных рыночных данных.',
      'Проведите симуляцию опроса с оценкой барьеров и триггеров выбора.',
      'Сверьте результаты симуляции с контрольной эмпирической выборкой.'
    ]
  },
  {
    id: 'scientific-manuscript-peer-review-critique',
    name: 'ScientificManuscriptPeerReviewCritiqueSkill',
    displayName: 'Scientific Peer Review & Methodological Critique',
    categoryId: 'research',
    description: 'Conducts thorough peer review audits of scientific papers: methodology validity, statistical appropriateness, claim overreach, and reproducibility.',
    tags: ['research', 'peer-review', 'academic', 'methodology', 'reproducibility'],
    sectionName: 'Scientific Peer Review Protocol',
    ruSectionName: 'Научное рецензирование (Peer Review) и методологический аудит',
    semanticType: 'analysis_protocol',
    instructions: [
      'Evaluate clarity of hypothesis and appropriateness of experimental controls.',
      'Audit statistical tests for p-hacking, multiple testing corrections (Bonferroni/FDR), and small sample bias.',
      'Distinguish major revisions (threats to validity) from minor presentation improvements.'
    ],
    ruInstructions: [
      'Оцените четкость гипотезы и адекватность контрольных групп.',
      'Проверьте статистику на p-hacking, множественные сравнения и искажения малых выборок.',
      'Разделите замечания на критические (угрозы валидности) и косметические.'
    ]
  },
  {
    id: 'longitudinal-panel-attrition-weighting',
    name: 'LongitudinalPanelAttritionWeightingSkill',
    displayName: 'Longitudinal Study Panel Attrition & Inverse Probability Weighting',
    categoryId: 'research',
    description: 'Diagnoses non-random participant drop-out in longitudinal multi-wave studies and applies Inverse Probability Weighting (IPW).',
    tags: ['research', 'longitudinal', 'attrition-bias', 'ipw', 'panel-studies'],
    sectionName: 'Longitudinal Attrition & Weighting Protocol',
    ruSectionName: 'Анализ оттока в лонгитюдных исследованиях и взвешивание IPW',
    semanticType: 'analysis_protocol',
    instructions: [
      'Compare wave-1 characteristics between retained and dropped participants to detect attrition bias.',
      'Fit logistic regression predicting probability of response retention across waves.',
      'Apply Inverse Probability Weights to restore representative sample balance.'
    ],
    ruInstructions: [
      'Сравните характеристики оставшихся и выбывших участников для выявления смещения.',
      'Постройте модель вероятности удержания участника в последующих волнах.',
      'Примените веса обратной вероятности (IPW) для восстановления репрезентативности.'
    ]
  },
  {
    id: 'eye-tracking-gaze-fixation-heatmap-analytics',
    name: 'EyeTrackingGazeFixationHeatmapAnalyticsSkill',
    displayName: 'Eye-Tracking Gaze Fixation & Area of Interest (AOI) Analytics',
    categoryId: 'research',
    description: 'Analyzes visual attention: Time to First Fixation (TTFF), Total Fixation Duration, and scanpath transitions across UI Areas of Interest.',
    tags: ['research', 'eye-tracking', 'aoi', 'gaze-fixation', 'visual-attention'],
    sectionName: 'Eye-Tracking & AOI Analytics Protocol',
    ruSectionName: 'Анализ фиксации взгляда и зон внимания (Eye-Tracking AOI)',
    semanticType: 'analysis_protocol',
    instructions: [
      'Define visual Areas of Interest (AOIs) around primary value proposition, hero visuals, and CTA elements.',
      'Quantify Time to First Fixation (TTFF) and Total Dwell Time per AOI.',
      'Map gaze scanpaths to eliminate banner blindness and visual distraction traps.'
    ],
    ruInstructions: [
      'Выделите зоны интереса (AOI) вокруг ключевого оффера, графики и кнопки действия (CTA).',
      'Измерьте время до первой фиксации (TTFF) и суммарную длительность взгляда по зонам.',
      'Постройте путь взгляда (scanpath) для устранения баннерной слепоты и отвлекающих пятен.'
    ]
  },
  {
    id: 'open-science-osf-preregistration-specification',
    name: 'OpenScienceOsfPreregistrationSpecificationSkill',
    displayName: 'Open Science Framework (OSF) Preregistration Specification',
    categoryId: 'research',
    description: 'Drafts time-stamped study preregistrations locking hypotheses, sample sizes, exclusion criteria, and planned analyses prior to data collection.',
    tags: ['research', 'preregistration', 'open-science', 'osf', 'reproducibility'],
    sectionName: 'OSF Study Preregistration Protocol',
    ruSectionName: 'Спецификация пререгистрации исследования (Open Science Framework)',
    semanticType: 'process_directive',
    instructions: [
      'State directional hypotheses and operationalized dependent/independent variables explicitly.',
      'Specify exact data exclusion rules, outlier truncation criteria, and missing data imputation methods.',
      'Lock in primary statistical analysis scripts to eliminate post-hoc exploratory bias (HARKing).'
    ],
    ruInstructions: [
      'Зафиксируйте гипотезы и операционализированные переменные до сбора данных.',
      'Опишите правила отсева выбросов и методы заполнения пропусков.',
      'Зафиксируйте план статистического анализа для исключения подгонки гипотез под результаты (HARKing).'
    ]
  }
];

module.exports = { newResearchSkills };
