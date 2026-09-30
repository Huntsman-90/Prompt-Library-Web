const { appendSkills } = require('../appendSkills.cjs');

const REASONING_PART2 = [
  {
    id: "polymathic-first-principles-synthesis",
    name: "PolymathicFirstPrinciplesSynthesisSkill",
    displayName: "Polymathic Multi-Domain First-Principles Synthesis",
    categoryId: "reasoning",
    description: "Deconstructs problems down to thermodynamic, computational, and economic ground-truth laws.",
    tags: ["reasoning", "first-principles", "physics", "synthesis", "musk"],
    sectionName: "Multi-Domain First-Principles Synthesis Protocol",
    ruSectionName: "Многодоменный синтез на основе фундаментальных первопринципов",
    instructions: [
      "Strip away all conventional analogies, historical precedents, and industry standard cargo-cult habits.",
      "Deconstruct {{task}} into core invariant physical, algorithmic, and financial axioms.",
      "Rebuild the optimal solution bottom-up strictly from the fundamental ground-truth axioms."
    ],
    ruInstructions: [
      "Откажитесь от слепого следования традициям, устоявшимся шаблонам и поверхностным аналогиям.",
      "Разложите задачу {{task}} на базовые физические, вычислительные и экономические аксиомы.",
      "Соберите идеальное решение снизу вверх, опираясь исключительно на фундаментальные законы."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "epistemic-status-meta-tagger",
    name: "EpistemicStatusMetaTaggerSkill",
    displayName: "Formal Epistemic Status & Confidence Tagging",
    categoryId: "reasoning",
    description: "Tags every major claim with formal epistemic metadata: Certainty, Empirical Weight, Source Authority.",
    tags: ["reasoning", "epistemic-status", "metadata", "calibration", "transparency"],
    sectionName: "Epistemic Status & Confidence Metadata Matrix",
    ruSectionName: "Эпистемический статус и метаданные достоверности утверждений",
    instructions: [
      "Prepend every core claim with an explicit Epistemic Tag: [Proven Fact | High Confidence | Working Hypothesis | Speculative | Unknown].",
      "List the primary evidentiary basis and potential vulnerability for each tagged assertion.",
      "Never present speculative heuristics with the same linguistic certainty as formal mathematical proofs."
    ],
    ruInstructions: [
      "Снабдите каждый тезис эпистемическим тегом: [Доказано | Высокая уверенность | Рабочая гипотеза | Спекулятивно].",
      "Укажите доказательную базу и потенциальные точки уязвимости для каждого утверждения.",
      "Категорически разграничивайте эвристические предположения и строгие аналитические факты."
    ],
    semanticType: "guardrail_directive"
  },
  {
    id: "chain-of-verification-cove-protocol",
    name: "ChainOfVerificationCoveProtocolSkill",
    displayName: "CoVe Chain-of-Verification Factuality Protocol",
    categoryId: "reasoning",
    description: "Generates baseline reasoning, plans independent verification questions, answers them, and revises output.",
    tags: ["reasoning", "cove", "verification", "factuality", "anti-hallucination"],
    sectionName: "Chain-of-Verification (CoVe) Execution Cycle",
    ruSectionName: "Протокол цепочки верификации (Chain-of-Verification CoVe)",
    instructions: [
      "Step 1: Draft initial baseline response to {{task}}.",
      "Step 2: Generate 3-5 sharp, independent verification questions probing specific factual claims.",
      "Step 3: Answer each verification question objectively without bias from the baseline draft.",
      "Step 4: Synthesize the final corrected output incorporating all verified corrections."
    ],
    ruInstructions: [
      "Шаг 1: Сформируйте черновой базовый ответ на задачу {{task}}.",
      "Шаг 2: Сгенерируйте 3–5 независимых проверочных вопросов к ключевым утверждениям.",
      "Шаг 3: Объективно ответьте на каждый вопрос, изолировав проверку от влияния черновика.",
      "Шаг 4: Сформируйте финальный ответ с учетом всех внесенных исправлений."
    ],
    semanticType: "process_directive"
  },
  {
    id: "synthetic-trilemma-triangulator",
    name: "SyntheticTrilemmaTriangulatorSkill",
    displayName: "Impossible Trilemma Dynamic Tension Balancer",
    categoryId: "reasoning",
    description: "Analyzes trilemmas (e.g. Scalability/Security/Decentralization) where you can optimize at most 2 of 3.",
    tags: ["reasoning", "trilemma", "trade-offs", "systems", "architecture"],
    sectionName: "Trilemma Dynamic Tension & Trade-Off Matrix",
    ruSectionName: "Балансировка системных трилемм (Выбор 2 из 3)",
    instructions: [
      "Identify the fundamental 3-way tradeoff governing {{task}} (e.g. Fast / Cheap / High-Quality).",
      "Explicitly declare which 2 vertices of the trilemma are maximized, and quantify the compromise on the 3rd.",
      "Design mitigation mechanisms that minimize systemic friction at the compromised vertex."
    ],
    ruInstructions: [
      "Определите ключевую трилемму, управляющую задачей (например, Скорость / Стоимость / Качество).",
      "Явно укажите, какие 2 стороны трилеммы оптимизируются и чем приходится пожертвовать на 3-й стороне.",
      "Спроектируйте меры, компенсирующие неизбежные издержки на уступленной стороне."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "inversion-principle-munger",
    name: "InversionPrincipleMungerSkill",
    displayName: "Charlie Munger Inversion Principle ('Invert, Always Invert')",
    categoryId: "reasoning",
    description: "Solves problems by systematically cataloging all ways to guarantee catastrophic failure, then inverting them.",
    tags: ["reasoning", "inversion", "munger", "algebraic-inversion", "risk"],
    sectionName: "Munger Inversion & Catastrophic Antipattern Elimination",
    ruSectionName: "Принцип инверсии Чарли Мангера («Инвертируй, всегда инвертируй»)",
    instructions: [
      "Invert the core question: 'How can we guarantee total, catastrophic failure of {{task}}?'",
      "List the top 5 most direct, lethal ways to sabotage or destroy the project.",
      "Systematically construct ironclad procedural defenses to make each failure vector impossible."
    ],
    ruInstructions: [
      "Инвертируйте задачу: «Как гарантированно провалить {{task}} с максимальным ущербом?».",
      "Составьте список из 5 самых фатальных и разрушительных сценариев саботажа или ошибок.",
      "Сформируйте надежные системные барьеры, делающие невозможным каждый из этих сценариев."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "causal-loop-diagramming-archetypes",
    name: "CausalLoopDiagrammingArchetypesSkill",
    displayName: "Senge System Archetypes (Tragedy of the Commons, Shifting Burden)",
    categoryId: "reasoning",
    description: "Diagnoses classic systemic traps: Tragedy of the Commons, Shifting the Burden, and Limits to Growth.",
    tags: ["reasoning", "system-archetypes", "senge", "causal-loops", "systems-thinking"],
    sectionName: "Peter Senge System Archetype Diagnostic Matrix",
    ruSectionName: "Системные архетипы Питера Сенге (Пределы роста, Смещение бремени)",
    instructions: [
      "Identify which classic Senge Archetype governs the problem (e.g. Fixes that Fail, Shifting the Burden).",
      "Map out the short-term symptomatic fix vs the long-term fundamental systemic solution.",
      "Propose interventions that address the structural root cause rather than treating superficial symptoms."
    ],
    ruInstructions: [
      "Определите архетип системного поведения (Эрозия целей, Трагедия общин, Быстрые решения с откатом).",
      "Разделите краткосрочные паллиативные меры и фундаментальное долгосрочное решение.",
      "Предложите структурные изменения, устраняющие саму причину системного сбоя."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "counter-intuitive-complex-system-logic",
    name: "CounterIntuitiveComplexSystemLogicSkill",
    displayName: "Forrester Counter-Intuitive Complex System Dynamics",
    categoryId: "reasoning",
    description: "Exposes how intuitive, common-sense policy interventions often worsen outcomes in non-linear systems.",
    tags: ["reasoning", "complex-systems", "counter-intuitive", "forrester", "non-linear"],
    sectionName: "Non-Linear & Counter-Intuitive System Dynamics",
    ruSectionName: "Нелинейная динамика сложных систем (Контринтуитивные эффекты)",
    instructions: [
      "Identify well-intentioned, intuitive policy decisions that produce counter-productive results over time.",
      "Demonstrate why linear cause-and-effect reasoning fails in systems with high feedback density and delays.",
      "Formulate counter-intuitive, high-leverage policies that leverage system dynamics."
    ],
    ruInstructions: [
      "Покажите, почему интуитивные и очевидные решения приводят к ухудшению ситуации в долгосрочной перспективе.",
      "Объясните сбой линейного мышления при наличии петель обратной связи и временных задержек.",
      "Сформулируйте нетривиальные управляющие решения, использующие внутреннюю динамику системы."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "epistemic-calibration-brier-score",
    name: "EpistemicCalibrationBrierScoreSkill",
    displayName: "Tetlock Superforecasting & Brier Score Calibration",
    categoryId: "reasoning",
    description: "Calibrates subjective probability estimates against historical frequency to minimize Brier error scores.",
    tags: ["reasoning", "superforecasting", "tetlock", "brier-score", "calibration"],
    sectionName: "Tetlock Probabilistic Forecasting Calibration",
    ruSectionName: "Калибровка прогнозов по Тетлоку (Минимизация Brier Score)",
    instructions: [
      "Assign precise numerical probabilities (e.g. 65%, not 'likely') to verifiable future states.",
      "Adjust estimates by synthesizing the Outside View (historical base rates) and Inside View (specific nuances).",
      "Continuously log forecasts with clear resolution criteria and tracking metrics."
    ],
    ruInstructions: [
      "Указывайте точные числовые вероятности (например, 70%, а не «скорее всего») для проверяемых исходов.",
      "Сбалансируйте оценку «извне» (историческая статистика класса) и оценку «изнутри» (детали кейса).",
      "Определите четкие критерии наступления событий для последующего аудита качества прогноза."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "abductive-diagnostic-differential-tree",
    name: "AbductiveDiagnosticDifferentialTreeSkill",
    displayName: "Differential Diagnostic Decision Tree",
    categoryId: "reasoning",
    description: "Eliminates competing failure hypotheses via systematic binary discriminant testing.",
    tags: ["reasoning", "differential-diagnosis", "decision-tree", "troubleshooting", "diagnostics"],
    sectionName: "Differential Diagnostic Elimination Tree",
    ruSectionName: "Дерево дифференциальной диагностики и последовательного исключения",
    instructions: [
      "Enumerate an exhaustive differential list of all plausible root causes for the observed symptom.",
      "Design a sequence of binary tests with maximum information entropy (each test cuts the hypothesis space in half).",
      "Rule out impossible causes sequentially until the single true causative agent remains."
    ],
    ruInstructions: [
      "Составьте исчерпывающий дифференциальный список потенциальных причин проблемы.",
      "Сформируйте последовательность бинарных тестов, делящих пространство гипотез пополам на каждом шаге.",
      "Последовательно исключайте неподтвержденные гипотезы до выделения единственного истинного фактора."
    ],
    semanticType: "process_directive"
  },
  {
    id: "morphological-box-zwicky-synthesis",
    name: "MorphologicalBoxZwickySynthesisSkill",
    displayName: "Fritz Zwicky General Morphological Analysis (GMA)",
    categoryId: "reasoning",
    description: "Explores all possible combinatorial permutations of multi-dimensional non-quantifiable problem spaces.",
    tags: ["reasoning", "zwicky", "morphological-analysis", "combinatorics", "synthesis"],
    sectionName: "Fritz Zwicky Morphological Space Synthesis",
    ruSectionName: "Морфологический анализ Фрица Цвикки (Комбинаторная матрица)",
    instructions: [
      "Decompose {{task}} into 4-6 essential independent functional parameters.",
      "List all possible technical or strategic values for each parameter in a morphological matrix.",
      "Systematically evaluate novel, non-obvious cross-row combinatorial configurations."
    ],
    ruInstructions: [
      "Разделите задачу {{task}} на 4–6 независимых функциональных параметров.",
      "Перечислите все возможные технологические или стратегические варианты реализации каждого параметра.",
      "Исследуйте неочевидные комбинации на стыке разных строк морфологической матрицы."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "delphi-method-expert-consensus",
    name: "DelphiMethodExpertConsensusSkill",
    displayName: "Iterative Delphi Method & Anonymous Consensus Synthesis",
    categoryId: "reasoning",
    description: "Synthesizes multi-expert perspectives through structured, iterative, anonymized feedback rounds.",
    tags: ["reasoning", "delphi-method", "consensus", "expert-synthesis", "forecasting"],
    sectionName: "Iterative Delphi Expert Consensus Protocol",
    ruSectionName: "Метод Дельфи: итеративный синтез экспертного консенсуса",
    instructions: [
      "Simulate independent panel responses from diverse domain experts without peer anchor bias.",
      "Aggregate arguments, highlight areas of sharp disagreement, and feed summaries back in round 2.",
      "Synthesize a robust, highly calibrated consensus with explicit documentation of minority dissents."
    ],
    ruInstructions: [
      "Смоделируйте независимые экспертные оценки от специалистов разных профилей без взаимного влияния.",
      "Сведите аргументы воедино, выделите зоны расхождений и проведите второй раунд калибровки.",
      "Сформируйте взвешенный консенсус с обязательной фиксацией аргументированных особых мнений."
    ],
    semanticType: "process_directive"
  },
  {
    id: "hypothetical-syllogism-transitivity",
    name: "HypotheticalSyllogismTransitivitySkill",
    displayName: "Hypothetical Syllogism & Transitive Implication Chain",
    categoryId: "reasoning",
    description: "Proves multi-step transitive reasoning: (A -> B) ∧ (B -> C) ∧ (C -> D) => (A -> D).",
    tags: ["reasoning", "formal-logic", "transitivity", "implication", "proof"],
    sectionName: "Transitive Implication Chain & Hypothetical Syllogism",
    ruSectionName: "Цепочка транзитивных импликаций (A -> B -> C => A -> C)",
    instructions: [
      "Verify that every link in the causal chain (A -> B, B -> C, C -> D) is mathematically or empirically sound.",
      "Ensure there are no hidden leaky assumptions or probability degradations between consecutive steps.",
      "Conclude with the direct macro-implication A -> D with verified validity."
    ],
    ruInstructions: [
      "Проверьте строгость и истинность каждого звена в логической цепочке (A -> B, B -> C, C -> D).",
      "Убедитесь в отсутствии скрытых допущений и деградации вероятности на промежуточных переходах.",
      "Сформулируйте итоговую сквозную импликацию A -> D с подтвержденным обоснованием."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "pareto-zipf-power-law-distribution",
    name: "ParetoZipfPowerLawDistributionSkill",
    displayName: "Power Law & Heavy-Tailed Fat-Tail Distribution Analysis",
    categoryId: "reasoning",
    description: "Evaluates systems governed by fat-tailed Power Law / Zipf distributions rather than thin-tailed Gaussian bells.",
    tags: ["reasoning", "power-law", "fat-tails", "zipf", "extremistan", "taleb"],
    sectionName: "Fat-Tailed Power-Law & Extremistan Risk Analysis",
    ruSectionName: "Анализ тяжелохвостых распределений и степенных законов (Extremistan)",
    instructions: [
      "Determine whether the domain belongs to Mediocristan (Gaussian thin-tails) or Extremistan (Power Law fat-tails).",
      "Do NOT rely on standard deviation or average metrics when analyzing fat-tailed systems.",
      "Design systems with capped maximum downside and unlimited convex upside under extreme tail events."
    ],
    ruInstructions: [
      "Определите тип среды: Тонкохвостая (гауссова) или Тяжелохвостая (степенной закон / Extremistan).",
      "Не используйте стандартное отклонение и среднее арифметическое для систем со степенным распределением.",
      "Ограничьте максимальный ущерб от редких катастрофических событий (Black Swans) и максимизируйте потенциал роста."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "epistemic-peer-disagreement-reconciliation",
    name: "EpistemicPeerDisagreementReconciliationSkill",
    displayName: "Elga-Christensen Epistemic Peer Disagreement Reconciliation",
    categoryId: "reasoning",
    description: "Rationally resolves conflicts between equally qualified, equally informed expert opinions (Equal Weight View).",
    tags: ["reasoning", "epistemic-peers", "disagreement", "epistemics", "reconciliation"],
    sectionName: "Epistemic Peer Disagreement & Resolution Protocol",
    ruSectionName: "Примирение разногласий между равноправными экспертами (Equal Weight View)",
    instructions: [
      "Acknowledge when two opposing viewpoints possess equal intellectual capability and evidence access.",
      "Apply the Equal Weight View: split the difference or identify hidden unshared background priors.",
      "Isolate the exact empirical test that will decisively resolve the dispute."
    ],
    ruInstructions: [
      "Зафиксируйте, когда спорящие стороны обладают равной квалификацией и доступом к данным.",
      "Примените принцип равного веса (Equal Weight View): найдите скрытые различия в базовых аксиомах сторон.",
      "Сформулируйте решающий эмпирический эксперимент (Crucial Experiment), который рассудит экспертов."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "kuhn-paradigm-anomaly-accumulation",
    name: "KuhnParadigmAnomalyAccumulationSkill",
    displayName: "Thomas Kuhn Paradigm Shift & Scientific Revolution",
    categoryId: "reasoning",
    description: "Tracks the accumulation of anomalies within the dominant paradigm that necessitate a structural revolution.",
    tags: ["reasoning", "kuhn", "paradigm-shift", "epistemics", "scientific-revolution"],
    sectionName: "Kuhn Paradigm Shift & Anomaly Accumulation Matrix",
    ruSectionName: "Смена парадигм по Томасу Куну и накопление аномалий",
    instructions: [
      "Catalog all empirical anomalies that current standard architecture attempts to explain away with ad-hoc patches.",
      "Demonstrate that accumulated anomalies signal the exhaustion of the incumbent paradigm.",
      "Propose a clean, unified paradigm that resolves all anomalies natively from first principles."
    ],
    ruInstructions: [
      "Соберите все аномалии, которые текущая архитектура пытается скрыть «костылями» и заплатками.",
      "Покажите, что критическая масса аномалий указывает на исчерпание возможностей старой парадигмы.",
      "Предложите принципиально новую модель, элегантно и естественно объясняющую все накопившиеся факты."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "synthetic-triangulation-consilience",
    name: "SyntheticTriangulationConsilienceSkill",
    displayName: "Whewell & Wilson Consilience of Inductions",
    categoryId: "reasoning",
    description: "Validates a grand unified theory when conclusions drawn from disparate fields unexpectedly converge.",
    tags: ["reasoning", "consilience", "wilson", "whewell", "unified-theory"],
    sectionName: "Consilience of Inductions & Unified Synthesis",
    ruSectionName: "Консилиенс: совпадение индуктивных выводов из разных наук",
    instructions: [
      "Demonstrate how findings from completely independent fields (e.g. biology, cryptography, economics) align.",
      "Show that the proposed solution is independently reinforced by disparate domain principles.",
      "Construct an unassailable synthesis backed by interdisciplinary consilience."
    ],
    ruInstructions: [
      "Продемонстрируйте, как выводы из абсолютно независимых дисциплин (биология, криптография, теория игр) сходятся в одной точке.",
      "Докажите, что решение получает независимое подтверждение на стыке смежных областей знания.",
      "Сформируйте междисциплинарный синтез высшей степени надежности."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "modal-logic-possible-worlds-semantics",
    name: "ModalLogicPossibleWorldsSemanticsSkill",
    displayName: "Kripke Modal Logic & Possible Worlds Semantics (□ and ◊)",
    categoryId: "reasoning",
    description: "Evaluates propositions across all accessible possible worlds using Necessity (□) and Possibility (◊) operators.",
    tags: ["reasoning", "modal-logic", "kripke", "possible-worlds", "formal-methods"],
    sectionName: "Kripke Modal Logic & Possible Worlds Framework",
    ruSectionName: "Модальная логика Крипке: Семантика возможных миров (□ Необходимость, ◊ Возможность)",
    instructions: [
      "Distinguish rigorously between contingent truths (true in this world) and necessary truths (true in all accessible worlds).",
      "Verify that safety invariants hold as Necessary (□P) across all stress conditions and failure states.",
      "Map out the accessibility relation between operational states and candidate failure worlds."
    ],
    ruInstructions: [
      "Разграничивайте случайные факты (истинные в текущем контексте) и необходимые истины (истинные во всех мирах).",
      "Докажите, что инварианты безопасности выполняются с необходимостью (□P) при любых возможных сценариях.",
      "Опишите отношения достижимости между нормальным состоянием и пространствами аварийных миров."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "epistemic-coherence-web-of-belief",
    name: "EpistemicCoherenceWebOfBeliefSkill",
    displayName: "Quine-Duhem Web of Belief & Holistic Coherence",
    categoryId: "reasoning",
    description: "Evaluates propositions holistically against the entire web of established beliefs rather than in isolation.",
    tags: ["reasoning", "quine", "web-of-belief", "holism", "coherence"],
    sectionName: "Quine-Duhem Web of Belief Coherence Audit",
    ruSectionName: "Паутина убеждений Куайна: Холистическая когерентность системы",
    instructions: [
      "Evaluate how adopting the new proposal impacts adjacent beliefs, libraries, and core architectural assumptions.",
      "Minimize disruption to foundational core axioms while absorbing new edge observations.",
      "Ensure holistic global coherence across the entire conceptual system."
    ],
    ruInstructions: [
      "Оцените, как внедрение новой гипотезы повлияет на смежные архитектурные слои и базовые допущения.",
      "Минимизируйте дестабилизацию центральных аксиом при адаптации к новым пограничным данным.",
      "Обеспечьте целостную глобальную согласованность (Holistic Coherence) всей системы представлений."
    ],
    semanticType: "analysis_directive"
  },
  {
    id: "fuzzy-logic-truth-degree-evaluator",
    name: "FuzzyLogicTruthDegreeEvaluatorSkill",
    displayName: "Lotfi Zadeh Fuzzy Logic & Degree of Membership [0, 1]",
    categoryId: "reasoning",
    description: "Models partial truth and graded membership on continuous interval [0, 1] for real-world continuous variables.",
    tags: ["reasoning", "fuzzy-logic", "zadeh", "membership-function", "continuous"],
    sectionName: "Lotfi Zadeh Fuzzy Logic & Continuous Membership Matrix",
    ruSectionName: "Нечеткая логика Лотфи Заде (Функции принадлежности на отрезке [0, 1])",
    instructions: [
      "Define membership functions μ(x) ∈ [0, 1] for qualitative concepts ('overloaded', 'fast', 'secure').",
      "Apply fuzzy logical operators (T-norm min for AND, S-norm max for OR) to evaluate rules.",
      "Defuzzify resulting output distributions into crisp, actionable operational control signals."
    ],
    ruInstructions: [
      "Задайте функции принадлежности μ(x) ∈ [0, 1] для качественных понятий («высокая нагрузка», «быстрый отклик»).",
      "Примените нечеткие логические операции (минимум для И, максимум для ИЛИ) для оценки правил.",
      "Выполните дефаззификацию итогового распределения в четкий управляющий сигнал (Crisp Value)."
    ],
    semanticType: "reasoning_directive"
  },
  {
    id: "defeasible-reasoning-prima-facie-warrants",
    name: "DefeasibleReasoningPrimaFacieWarrantsSkill",
    displayName: "John Pollock Defeasible Reasoning & Defeaters (Rebutting/Undercutting)",
    categoryId: "reasoning",
    description: "Evaluates prima facie justified arguments and tests them against potential Rebutting and Undercutting defeaters.",
    tags: ["reasoning", "defeasible", "pollock", "defeaters", "non-monotonic"],
    sectionName: "Defeasible Reasoning & Defeater Neutralization",
    ruSectionName: "Опровержимые рассуждения по Джону Поллоку (Rebutting vs Undercutting Defeaters)",
    instructions: [
      "Establish prima facie justified inferences for {{task}}.",
      "Classify potential challenges into Rebutting Defeaters (attacking the conclusion) and Undercutting Defeaters (attacking the link).",
      "Demonstrate that all identified defeaters are decisively defeated by higher-order evidence."
    ],
    ruInstructions: [
      "Сформулируйте предварительно обоснованные выводы (Prima Facie) для задачи {{task}}.",
      "Разделите контраргументы на прямые опровергатели вывода (Rebutting) и подрыватели связи (Undercutting).",
      "Докажите, что все выявленные дефитеры успешно нейтрализованы фактами более высокого порядка."
    ],
    semanticType: "reasoning_directive"
  }
];

console.log('Appending Reasoning Part 2...');
appendSkills('reasoning', REASONING_PART2);
console.log('Reasoning Part 2 updated successfully.');
