const { appendSkills } = require('../appendSkills.cjs');

const REASONING_NEW = [
  {
    id: "bayesian-posterior-updating-formal",
    name: "BayesianPosteriorUpdatingFormalSkill",
    displayName: "Formal Bayesian Posterior Belief Updating",
    categoryId: "reasoning",
    description: "Updates hypothesis probabilities mathematically using Bayes' Theorem: P(H|E) = (P(E|H) * P(H)) / P(E).",
    tags: ["reasoning", "bayesian", "probability", "epistemics", "evidence"],
    sectionName: "Bayesian Belief Updating & Evidence Weight Protocol",
    ruSectionName: "Байесовское обновление априорных вероятностей P(H|E)",
    instructions: [
      "State the explicit Prior Probability P(H) before presenting new empirical evidence.",
      "Calculate the Likelihood P(E|H) and Marginal Likelihood P(E) for each new observation.",
      "Derive the Posterior Probability P(H|E) and adjust epistemic certainty accordingly."
    ],
    ruInstructions: [
      "Зафиксируйте априорную вероятность гипотезы P(H) до введения новых фактов.",
      "Оцените правдоподобие свидетельства P(E|H) и маргинальную вероятность P(E).",
      "Рассчитайте апостериорную вероятность P(H|E) и скорректируйте степень уверенности."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "reductio-ad-absurdum-proof",
    name: "ReductioAdAbsurdumProofSkill",
    displayName: "Reductio Ad Absurdum Proof by Contradiction",
    categoryId: "reasoning",
    description: "Assumes the negation of the target thesis and derives an impossible formal contradiction.",
    tags: ["reasoning", "logic", "proof", "contradiction", "formal-methods"],
    sectionName: "Reductio Ad Absurdum Contradiction Proof",
    ruSectionName: "Доказательство от противного (Reductio ad Absurdum)",
    instructions: [
      "Assume the exact opposite of the recommended hypothesis is true (Hypothesis ¬A).",
      "Trace the logical consequences of ¬A step-by-step until an unavoidable logical or physical contradiction emerges.",
      "Conclude definitively that original Hypothesis A is mathematically/logically necessary."
    ],
    ruInstructions: [
      "Примите за истину утверждение, строго противоположное доказываемому (¬A).",
      "Пошагово выведите логические следствия из ¬A до получения неизбежного противоречия.",
      "Сделайте однозначный вывод о необходимой истинности исходного тезиса A."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "contrapositive-inference-law",
    name: "ContrapositiveInferenceLawSkill",
    displayName: "Contrapositive Modus Tollens Deductive Proof",
    categoryId: "reasoning",
    description: "Applies the strict equivalence (P -> Q) <=> (¬Q -> ¬P) to verify conditional logical statements.",
    tags: ["reasoning", "deduction", "contrapositive", "modus-tollens", "formal-logic"],
    sectionName: "Contrapositive & Modus Tollens Deductive Matrix",
    ruSectionName: "Дедуктивное доказательство через контрапозицию (P -> Q <=> ¬Q -> ¬P)",
    instructions: [
      "Formulate conditional propositions into explicit formal logic: If Premise P, Then Consequence Q.",
      "Test the contrapositive: If Consequence ¬Q occurs, verify that Premise ¬P must necessarily follow.",
      "Eliminate affirming the consequent and denying the antecedent fallacies."
    ],
    ruInstructions: [
      "Сформулируйте тезисы в виде формальных импликаций: «Если P, то Q».",
      "Проверьте контрапозитив: «Если наблюдается ¬Q, то с необходимостью следует ¬P».",
      "Исключите логические ошибки подтверждения консеквента и отрицания антецедента."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "counterfactual-clio-historical-branching",
    name: "CounterfactualClioHistoricalBranchingSkill",
    displayName: "Counterfactual Causal Branching Analysis",
    categoryId: "reasoning",
    description: "Evaluates causal necessity by modeling hypothetical worlds where a specific key condition was altered.",
    tags: ["reasoning", "counterfactual", "causality", "judea-pearl", "branching"],
    sectionName: "Counterfactual Causal Branching Matrix",
    ruSectionName: "Контрфактуальный причинно-следственный анализ (Judea Pearl)",
    instructions: [
      "Construct a counterfactual model: 'If Condition X had NOT occurred, would Outcome Y still manifest?'",
      "Isolate spurious correlations from true causal levers using Pearl's Structural Causal Models.",
      "Quantify the Necessary and Sufficient causal weight of each independent variable."
    ],
    ruInstructions: [
      "Смоделируйте контрфактуальную ситуацию: «Если бы событие X не произошло, наступил бы результат Y?».",
      "Отделите ложные корреляции от истинных причинных связей по методологии Джуды Перла.",
      "Оцените необходимый и достаточный причинный вклад каждого фактора в отдельности."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "game-theoretic-nash-equilibrium",
    name: "GameTheoreticNashEquilibriumSkill",
    displayName: "Nash Equilibrium & Strategic Minimax Matrix",
    categoryId: "reasoning",
    description: "Models strategic multi-agent interactions where no participant has an incentive to unilaterally deviate.",
    tags: ["reasoning", "game-theory", "nash-equilibrium", "minimax", "strategy"],
    sectionName: "Game-Theoretic Nash Equilibrium Matrix",
    ruSectionName: "Теоретико-игровой анализ и поиск равновесия Нэша",
    instructions: [
      "Model all interacting stakeholders, their private payoff matrices, and available strategy spaces.",
      "Calculate strictly dominant and weakly dominated strategies across all players.",
      "Identify stable Nash Equilibria and evaluate Pareto-optimality of the resulting outcome."
    ],
    ruInstructions: [
      "Опишите всех стейкхолдеров, матрицы их выигрышей и доступные пространства стратегий.",
      "Рассчитайте доминирующие и доминируемые стратегии для каждой из сторон.",
      "Найдите точки устойчивого равновесия по Нэшу и проверьте Парето-оптимальность исходов."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "sorites-paradox-boundary-resolver",
    name: "SoritesParadoxBoundaryResolverSkill",
    displayName: "Sorites Paradox & Fuzzy Boundary Disambiguation",
    categoryId: "reasoning",
    description: "Resolves vague continuum boundaries (heap paradox) by introducing strict quantitative demarcation thresholds.",
    tags: ["reasoning", "sorites", "fuzzy-logic", "boundaries", "epistemics"],
    sectionName: "Vagueness & Sorites Boundary Resolution Protocol",
    ruSectionName: "Устранение парадокса кучи (Сорит) и строгая дискретизация границ",
    instructions: [
      "Detect where continuous incremental changes create semantic ambiguity ('How many grains make a heap?').",
      "Replace vague subjective continuum predicates with precise discrete boundary thresholds.",
      "Provide hysteresis margins to prevent flapping around borderline edge cases."
    ],
    ruInstructions: [
      "Выявите участки, где плавное изменение параметра создает смысловую неоднозначность (парадокс кучи).",
      "Замените размытые качественные градации четкими дискретными числовыми интервалами.",
      "Внедрите гистерезис для предотвращения дребезга на границах перехода состояний."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "abductive-inference-best-explanation",
    name: "AbductiveInferenceBestExplanationSkill",
    displayName: "Pierce Abductive Inference to the Best Explanation (IBE)",
    categoryId: "reasoning",
    description: "Generates the most plausible, elegant, and parsimonious explanatory hypothesis for observed anomalies.",
    tags: ["reasoning", "abduction", "peirce", "hypothesis-generation", "diagnostics"],
    sectionName: "Abductive Inference to Best Explanation (IBE)",
    ruSectionName: "Абдуктивный вывод к наилучшему объяснению (IBE по Пирсу)",
    instructions: [
      "Collate all surprising or anomalous empirical observations in {{task}}.",
      "Generate candidate hypotheses that would make the anomalies a matter of course if true.",
      "Rank hypotheses by explanatory power, consilience across diverse facts, and parsimony (Ockham's Razor)."
    ],
    ruInstructions: [
      "Соберите все аномальные и неожиданные факты, выявленные при анализе {{task}}.",
      "Сформулируйте гипотезы, делающие эти аномалии закономерным следствием при их истинности.",
      "Ранжируйте гипотезы по объяснительной силе, широте охвата фактов и простоте (бритва Оккама)."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "adversarial-turing-devil-advocate",
    name: "AdversarialTuringDevilAdvocateSkill",
    displayName: "Formal Adversarial Devil's Advocate & Steelmanning",
    categoryId: "reasoning",
    description: "Constructs the strongest possible, mathematically robust counter-argument against the proposed thesis.",
    tags: ["reasoning", "devils-advocate", "steelman", "adversarial", "critical-thinking"],
    sectionName: "Adversarial Steelman & Counter-Argument Engine",
    ruSectionName: "Адверсарный адвокат дьявола (Стилменнинг позиции оппонента)",
    instructions: [
      "Formulate the most brilliant, unassailable steelman version of the opposing counter-argument.",
      "Identify the single most vulnerable structural dependency in your own proposal that the adversary will target.",
      "Incorporate pre-emptive architectural hardening against the steelmanned critique."
    ],
    ruInstructions: [
      "Сформулируйте максимально сильную, неуязвимую версию позиции оппонента (Стилмен).",
      "Найдите самое уязвимое звено собственного решения, по которому нанесет удар оппонент.",
      "Интегрируйте превентивные контрмеры, нейтрализующие сильнейшую критику до ее высказывания."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "analogical-deep-structural-mapping",
    name: "AnalogicalDeepStructuralMappingSkill",
    displayName: "Gentner Structure-Mapping & Cross-Domain Analogy",
    categoryId: "reasoning",
    description: "Transfers relational systems from a well-understood base domain to solve an isomorphic target problem.",
    tags: ["reasoning", "analogy", "structure-mapping", "gentner", "lateral-thinking"],
    sectionName: "Gentner Deep Structural Analogy Mapping",
    ruSectionName: "Глубокое структурное сопоставление аналогий (Gentner Structure Mapping)",
    instructions: [
      "Identify an isomorphic base domain with proven, battle-tested solutions (e.g. fluid dynamics, urban planning, immune systems).",
      "Map higher-order relational predicates 1-to-1 between base domain and target domain {{task}}.",
      "Explicitly discard surface-level cosmetic similarities that do not preserve relational invariants."
    ],
    ruInstructions: [
      "Выберите изоморфную базовую область с доказанными решениями (гидродинамика, иммунология, урбанистика).",
      "Отобразите системные отношения и законы 1-в-1 между базовой областью и задачей {{task}}.",
      "Отбросьте поверхностные внешние аналогии, не сохраняющие структурных инвариантов."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "toulmin-argument-structure-model",
    name: "ToulminArgumentStructureModelSkill",
    displayName: "Toulmin Argumentation Scheme (Claim/Data/Warrant)",
    categoryId: "reasoning",
    description: "Structures rational argumentation into Claim, Grounds, Warrant, Backing, Qualifier, and Rebuttal.",
    tags: ["reasoning", "toulmin", "argumentation", "logic", "rhetoric"],
    sectionName: "Toulmin Formal Argumentation Architecture",
    ruSectionName: "Схема аргументации Тулмина (Тезис, Данные, Основание, Оговорка)",
    instructions: [
      "State the primary Claim unequivocally.",
      "Provide empirical Grounds/Data supporting the claim.",
      "State the Warrant that connects the Grounds to the Claim, supported by authoritative Backing.",
      "Include explicit Modal Qualifiers and identify specific conditions for Rebuttal."
    ],
    ruInstructions: [
      "Четко сформулируйте главный тезис (Claim).",
      "Приведите эмпирические данные и факты (Grounds/Data).",
      "Опишите логическое основание (Warrant) и его авторитетное обоснование (Backing).",
      "Укажите модальные ограничения (Qualifier) и условия опровержения (Rebuttal)."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "monte-carlo-probabilistic-simulation",
    name: "MonteCarloProbabilisticSimulationSkill",
    displayName: "Monte Carlo Probabilistic Range Simulation",
    categoryId: "reasoning",
    description: "Replaces single-point deterministic estimates with probabilistic probability distributions (p10/p50/p90).",
    tags: ["reasoning", "monte-carlo", "simulation", "probability", "forecasting"],
    sectionName: "Monte Carlo Probabilistic Simulation Envelope",
    ruSectionName: "Стохастическое моделирование методом Монте-Карло (P10 / P50 / P90)",
    instructions: [
      "Assign probability density distributions (Normal, Lognormal, Beta) to all volatile input variables.",
      "Simulate 10,000 parameter permutations across correlated risk factors.",
      "Report outputs strictly as quantile percentiles: P10 (optimistic), P50 (median), P90 (conservative), and P99 (tail risk)."
    ],
    ruInstructions: [
      "Задайте распределения вероятностей для всех переменных с высокой неопределенностью.",
      "Смоделируйте множество сценариев с учетом корреляции факторов риска.",
      "Предоставьте результаты в виде квантилей: P10 (оптимистичный), P50 (медиана), P90 (консервативный), P99 (хвостовой риск)."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "dialetheism-paraconsistent-logic",
    name: "DialetheismParaconsistentLogicSkill",
    displayName: "Paraconsistent Logic & Contradiction Containment",
    categoryId: "reasoning",
    description: "Reasons soundly in the presence of contradictory premises without triggering principle of explosion (ex falso).",
    tags: ["reasoning", "paraconsistent", "dialetheism", "logic", "contradictions"],
    sectionName: "Paraconsistent Contradiction Containment Protocol",
    ruSectionName: "Паранепротиворечивая логика и изоляция противоречий",
    instructions: [
      "Isolate local contradictions without allowing the explosion principle to render the entire system trivial.",
      "Evaluate valid inferences within bounded sub-theories while maintaining dialectical tension.",
      "Synthesize higher-order resolution models that explain the emergence of the apparent antinomy."
    ],
    ruInstructions: [
      "Локализуйте внутренние противоречия в изолированных подсистемах, предотвращая взрыв логики (Ex Falso).",
      "Проводите корректные умозаключения в рамках локально непротиворечивых сегментов.",
      "Сформируйте синтетическую модель высшего порядка, объясняющую источник мнимой антиномии."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "system-dynamics-stock-and-flow",
    name: "SystemDynamicsStockAndFlowSkill",
    displayName: "Forrester System Dynamics & Stock-and-Flow Modeling",
    categoryId: "reasoning",
    description: "Models complex systems through Stocks (accumulations), Flows (rates), and non-linear Feedback Loops.",
    tags: ["reasoning", "system-dynamics", "forrester", "stocks-flows", "feedback-loops"],
    sectionName: "Forrester System Dynamics Stock-and-Flow Model",
    ruSectionName: "Системная динамика Форрестера: Накопители, Потоки и Петли обратной связи",
    instructions: [
      "Identify primary Stocks (accumulated state) and connecting Flows (inflow/outflow rates).",
      "Map Reinforcing (positive exponential) and Balancing (negative stabilizing) feedback loops with explicit time delays.",
      "Locate systemic leverage points where small policy interventions produce massive structural stabilization."
    ],
    ruInstructions: [
      "Выделите ключевые накопители (Stocks) и регулирующие их потоки (Inflows/Outflows).",
      "Опишите усиливающие (+) и балансирующие (-) петли обратной связи с учетом временных задержек (Delays).",
      "Найдите точки системного рычага (Leverage Points) для максимального управляющего воздействия."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "epistemic-circularity-detection",
    name: "EpistemicCircularityDetectionSkill",
    displayName: "Epistemic Circularity & Petitio Principii Trap Detector",
    categoryId: "reasoning",
    description: "Exposes begging-the-question fallacies where the conclusion is covertly assumed in the supporting premises.",
    tags: ["reasoning", "fallacy", "circularity", "petitio-principii", "epistemics"],
    sectionName: "Circular Reasoning & Begging-the-Question Audit",
    ruSectionName: "Детектор порочного круга в доказательстве (Petitio Principii)",
    instructions: [
      "Trace the dependency graph of all supporting premises back to independent empirical axioms.",
      "Detect subtle semantic paraphrases where the conclusion is assumed as a foundational truth.",
      "Reject self-referential justifications and demand external grounding."
    ],
    ruInstructions: [
      "Постройте граф зависимостей аргументов до независимых эмпирических аксиом.",
      "Выявите скрытое перефразирование, при котором доказываемый вывод заложен в саму посылку.",
      "Исключите самореферентные доказательства и потребуйте независимой внешней верификации."
    ],
    semanticType: "guardrail_directive"
  },
  {
    id: "goodhart-campbell-metric-distortion",
    name: "GoodhartCampbellMetricDistortionSkill",
    displayName: "Goodhart & Campbell Law Metric Distortion Defense",
    categoryId: "reasoning",
    description: "Anticipates how metrics cease to be good metrics when targeted, leading to perverse optimization.",
    tags: ["reasoning", "goodhart", "campbell-law", "metrics", "perverse-incentives"],
    sectionName: "Goodhart's Law Gaming & Distortion Defense",
    ruSectionName: "Защита от закона Гудхарта и деформации метрик (Campbell's Law)",
    instructions: [
      "Analyze how rational actors will game, manipulate, or distort the proposed performance KPIs.",
      "Pair every primary optimization metric with a counter-balancing quality/safety invariant metric.",
      "Implement audit mechanisms that detect metric decoupling from real underlying business value."
    ],
    ruInstructions: [
      "Смоделируйте, как стейкхолдеры будут манипулировать выбранными KPI в ущерб качеству системы.",
      "Сбалансируйте каждую метрику производительности контр-метрикой качества и надежности.",
      "Внедрите аудиторские проверки для выявления фиктивного выполнения целевых показателей."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "fermi-order-of-magnitude-estimation",
    name: "FermiOrderOfMagnitudeEstimationSkill",
    displayName: "Enrico Fermi Dimensional Order-of-Magnitude Estimation",
    categoryId: "reasoning",
    description: "Estimates complex unknown quantities within factor-of-10 bounds via dimensional decomposition.",
    tags: ["reasoning", "fermi", "estimation", "order-of-magnitude", "dimensional-analysis"],
    sectionName: "Enrico Fermi Dimensional Estimation Protocol",
    ruSectionName: "Оценка порядка величины по методу Энрико Ферми",
    instructions: [
      "Decompose the unknown macro quantity into a product of 4-6 estimable micro-parameters.",
      "Assign reasonable lower and upper bound orders of magnitude to each parameter.",
      "Calculate the geometric mean and evaluate the sensitivity of the final estimate to parameter variance."
    ],
    ruInstructions: [
      "Разложите неизвестную макро-величину на произведение 4–6 базовых параметров, поддающихся оценке.",
      "Задайте верхние и нижние границы для каждого множителя на основе физических/экономических ограничений.",
      "Рассчитайте среднее геометрическое и оцените чувствительность итоговой оценки к погрешностям."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "occams-razor-parsimony-pruning",
    name: "OccamsRazorParsimonyPruningSkill",
    displayName: "William of Ockham Ontological Parsimony Pruning",
    categoryId: "reasoning",
    description: "Shaves away unnecessary entities, multiplying factors, and complex assumptions without loss of power.",
    tags: ["reasoning", "occams-razor", "parsimony", "simplification", "ontology"],
    sectionName: "Ockham Ontological Parsimony Pruning",
    ruSectionName: "Бритва Оккама: онтологическое отсечение лишних сущностей",
    instructions: [
      "Identify and prune every auxiliary hypothesis or theoretical entity that does not increase predictive accuracy.",
      "Select the simplest sufficient explanation among competing hypotheses with equal explanatory yield.",
      "Document the minimal sufficient causal graph required to explain observed phenomena."
    ],
    ruInstructions: [
      "Отсеките все дополнительные допущения и сущности, не повышающие точность прогноза.",
      "Из конкурирующих гипотез одинаковой силы выберите ту, которая требует наименьшего числа допущений.",
      "Зафиксируйте минимально достаточный причинно-следственный граф для решения {{task}}."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "hypothetico-deductive-cycle",
    name: "HypotheticoDeductiveCycleSkill",
    displayName: "Hypothetico-Deductive Scientific Cycle",
    categoryId: "reasoning",
    description: "Executes the strict scientific loop: Observe -> Hypothesize -> Deduce Consequence -> Experiment.",
    tags: ["reasoning", "scientific-method", "hypothetico-deductive", "falsification", "empiricism"],
    sectionName: "Hypothetico-Deductive Scientific Execution Cycle",
    ruSectionName: "Гипотетико-дедуктивный цикл научного исследования",
    instructions: [
      "Formulate an explicit, testable, non-trivial hypothesis based on empirical observations.",
      "Deduce specific observable predictions that must hold true if the hypothesis is valid.",
      "Design a controlled test protocol capable of definitively proving or disproving the deduction."
    ],
    ruInstructions: [
      "Сформулируйте проверяемую нетривиальную гипотезу на основе имеющихся данных.",
      "Дедуктивно выведите конкретные наблюдаемые предсказания, обязанные проявиться при истинности гипотезы.",
      "Спроектируйте контрольный эксперимент, способный однозначно подтвердить или опровергнуть следствие."
    ],
    semanticType: "process_directive"
  },
  {
    id: "simpson-paradox-subgroup-disaggregation",
    name: "SimpsonParadoxSubgroupDisaggregationSkill",
    displayName: "Simpson's Paradox & Confounding Subgroup Disaggregator",
    categoryId: "reasoning",
    description: "Disaggregates aggregate data across lurking confounders to expose reversed underlying trends.",
    tags: ["reasoning", "simpsons-paradox", "statistics", "confounding", "disaggregation"],
    sectionName: "Simpson's Paradox & Subgroup Confounder Audit",
    ruSectionName: "Выявление парадокса Симпсона и дезагрегация по скрытым факторам",
    instructions: [
      "Identify potential hidden confounding variables that influence both group allocation and outcome.",
      "Disaggregate aggregate macro-metrics into homogeneous sub-populations.",
      "Verify whether the observed aggregate trend reverses or disappears under granular subgroup stratification."
    ],
    ruInstructions: [
      "Выявите скрытые вмешивающиеся факторы (Confounders), искажающие общую статистическую картину.",
      "Разбейте агрегированные макро-показатели на однородные сегменты и подгруппы.",
      "Проверьте, не меняется ли знак корреляции на противоположный при переходе к детальным срезам."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "heuristic-cognitive-bias-debiasing",
    name: "HeuristicCognitiveBiasDebiasingSkill",
    displayName: "Kahneman & Tversky Cognitive Debiasing Protocol",
    categoryId: "reasoning",
    description: "Identifies and neutralizes Availability, Anchoring, Representativeness, and Confirmation biases.",
    tags: ["reasoning", "kahneman", "tversky", "biases", "heuristics", "debiasing"],
    sectionName: "Cognitive Debiasing & Heuristic Neutralization",
    ruSectionName: "Протокол устранения когнитивных искажений (Канеман и Тверски)",
    instructions: [
      "Audit reasoning against System 1 biases: Anchoring, Availability Cascade, and Sunk Cost Fallacy.",
      "Force consideration of the reference class and base rates before evaluating specific case details.",
      "Apply structured decision frameworks to insulate conclusions from emotional cognitive traps."
    ],
    ruInstructions: [
      "Проверьте аргументацию на искажения Системы 1: эффект привязки (Anchoring), ошибку доступности и невозвратные затраты.",
      "Сопоставьте выводы с базовыми частотами эталонного класса (Base Rates) до анализа частных деталей.",
      "Используйте структурированные матрицы решений для защиты выводов от когнитивных ловушек."
    ],
    semanticType: "guardrail_directive"
  },
  {
    id: "relevance-logic-entailment-check",
    name: "RelevanceLogicEntailmentCheckSkill",
    displayName: "Anderson-Belnap Relevance Logic & Non-Sequitur Purge",
    categoryId: "reasoning",
    description: "Enforces that premises must share genuine topical and semantic relevance with their conclusions.",
    tags: ["reasoning", "relevance-logic", "entailment", "non-sequitur", "formal-logic"],
    sectionName: "Relevance Logic & Semantic Entailment Verification",
    ruSectionName: "Релевантная логика и исключение мнимого следования (Non-Sequitur)",
    instructions: [
      "Verify that every supporting premise shares a verifiable causal or semantic link to the conclusion.",
      "Eliminate non-sequitur leaps where true statements are cited that do not actually bear on the target claim.",
      "Validate strict deductive entailment: premise information must directly constrain the conclusion."
    ],
    ruInstructions: [
      "Убедитесь, что каждая посылка имеет прямую причинную или семантическую связь с доказываемым выводом.",
      "Исключите логические скачки (Non-Sequitur), где истинные сами по себе факты не доказывают тезис.",
      "Проверьте строгое следование: информация в посылках должна непосредственно определять истинность вывода."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "pareto-frontier-multi-objective-optimization",
    name: "ParetoFrontierMultiObjectiveOptimizationSkill",
    displayName: "Multi-Objective Pareto Frontier Trade-Off Optimization",
    categoryId: "reasoning",
    description: "Identifies non-dominated Pareto-optimal solutions across conflicting multi-variable trade-offs.",
    tags: ["reasoning", "pareto-frontier", "multi-objective", "optimization", "trade-offs"],
    sectionName: "Multi-Objective Pareto Frontier Optimization",
    ruSectionName: "Оптимизация по Парето-фронтиру для многокритериальных задач",
    instructions: [
      "Map conflicting optimization vectors (e.g. Latency vs Cost, Security vs Usability, Speed vs Precision).",
      "Plot candidate architectures along the multi-dimensional Pareto Frontier.",
      "Eliminate strictly dominated solutions (where an alternative is superior across all dimensions without compromise)."
    ],
    ruInstructions: [
      "Зафиксируйте конфликтующие векторы оптимизации (Задержка vs Стоимость, Безопасность vs Удобство).",
      "Постройте Парето-фронтир допустимых решений в многомерном пространстве параметров.",
      "Отсеките строго доминируемые варианты, уступающие альтернативам по всем критериям сразу."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "epistemic-triangulation-independent-sources",
    name: "EpistemicTriangulationIndependentSourcesSkill",
    displayName: "Multi-Method Epistemic Triangulation",
    categoryId: "reasoning",
    description: "Validates hypotheses by demonstrating convergence across multiple independent methodological angles.",
    tags: ["reasoning", "triangulation", "epistemics", "validation", "convergence"],
    sectionName: "Multi-Method Epistemic Triangulation Matrix",
    ruSectionName: "Эпистемическая триангуляция по независимым источникам",
    instructions: [
      "Require convergence across at least 3 independent methodological approaches (e.g. analytical, empirical, simulation).",
      "Verify that error vectors of the independent methodologies are uncorrelated.",
      "Elevate epistemic confidence only when disparate evidence vectors point to the identical invariant conclusion."
    ],
    ruInstructions: [
      "Потребуйте сходимости выводов как минимум по трем независимым методам (аналитический, эмпирический, симуляционный).",
      "Убедитесь, что источники погрешностей в разных методах не коррелируют между собой.",
      "Повышайте уровень достоверности только при совпадении результатов независимых векторов анализа."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "counter-inductive-feyerabend-challenge",
    name: "CounterInductiveFeyerabendChallengeSkill",
    displayName: "Feyerabend Counter-Inductive Epistemic Challenge",
    categoryId: "reasoning",
    description: "Introduces hypotheses that contradict established theories to expose hidden dogmatic paradigm traps.",
    tags: ["reasoning", "feyerabend", "counter-induction", "epistemics", "paradigm-shift"],
    sectionName: "Feyerabend Counter-Inductive Paradigm Challenge",
    ruSectionName: "Контриндуктивный вызов устоявшимся парадигмам (Фейерабенд)",
    instructions: [
      "Formulate a coherent alternative hypothesis that directly contradicts orthodox industry consensus.",
      "Identify which empirical facts the orthodox theory explains away as anomalies or ignores.",
      "Evaluate whether the counter-inductive model offers superior simplicity or explanatory power."
    ],
    ruInstructions: [
      "Сформулируйте непротиворечивую гипотезу, прямо отрицающую общепринятые шаблоны мышления.",
      "Выявите факты, которые официальная парадигма замалчивает или списывает на случайные аномалии.",
      "Оцените, дает ли контриндуктивная модель более глубокое понимание архитектуры {{task}}."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "deductive-syllogism-validator",
    name: "DeductiveSyllogismValidatorSkill",
    displayName: "Aristotelian Categorical Syllogism Validator",
    categoryId: "reasoning",
    description: "Validates formal syllogistic structures (All A are B, All B are C => All A are C) with Venn verification.",
    tags: ["reasoning", "syllogism", "aristotle", "formal-logic", "deduction"],
    sectionName: "Aristotelian Categorical Syllogism Validation",
    ruSectionName: "Валидация категорических силлогизмов Аристотеля",
    instructions: [
      "Structure logical arguments into standard categorical syllogisms: Major Premise, Minor Premise, Conclusion.",
      "Verify validity against the 6 rules of valid syllogisms (e.g. undistributed middle, illicit major/minor).",
      "Confirm soundness: verify that all premises are true in the real-world domain."
    ],
    ruInstructions: [
      "Оформите аргументацию в виде классического силлогизма: Большая посылка, Меньшая посылка, Заключение.",
      "Проверьте корректность формы силлогизма (исключите ошибку нераспределенного среднего термина).",
      "Убедитесь в истинности посылок в реальном физическом/программном контексте задачи."
    ],
    semanticType: "reasoning_directive"
  }
];

console.log('Appending new Reasoning skills...');
appendSkills('reasoning', REASONING_NEW);
console.log('Reasoning skills updated successfully.');
