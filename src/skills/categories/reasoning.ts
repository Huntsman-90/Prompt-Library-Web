import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const REASONING_SKILLS: Record<string, SkillDefinition> = {
  'chain-of-thought': {
    id: 'chain-of-thought',
    name: 'ChainOfThoughtSkill',
    displayName: 'Step-by-Step Chain of Thought (CoT)',
    categoryId: 'reasoning',
    description: 'Enforces explicit, sequential logical deductions with intermediate verification steps.',
    tags: ['reasoning', 'cot', 'logic', 'step-by-step', 'deduction'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Методология Пошагового Рассуждения (Chain-of-Thought)',
        'Step-by-Step Reasoning Methodology (Chain-of-Thought)',
        [
          '- **Последовательная дедукция**: Разбить сложную логику на дискретные, верифицируемые шаги, где каждый последующий шаг опирается на доказанные выводы предыдущего.',
          '- **Проверка промежуточных гипотез**: Явно фиксировать промежуточные расчеты и проверять их на непротиворечивость перед переходом к следующей фазе.',
          '- **Исключение скачков в логике**: Запрещено переходить к готовому ответу без демонстрации цепочки доказательств.',
        ],
        [
          '- **Sequential Deduction**: Decompose analytical reasoning into discrete, verifiable steps where each stage builds on validated premises.',
          '- **Intermediate Validation**: Explicitly evaluate interim conclusions and calculations for consistency before proceeding.',
          '- **No Logical Leaps**: Strictly ban premature conclusions without step-by-step deductive derivation.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'tree-of-thoughts': {
    id: 'tree-of-thoughts',
    name: 'TreeOfThoughtsSkill',
    displayName: 'Tree of Thoughts (ToT) Exploration',
    categoryId: 'reasoning',
    description: 'Generates and evaluates multiple parallel reasoning paths, pruning weak branches before deciding.',
    tags: ['reasoning', 'tot', 'tree', 'branches', 'exploration', 'alternatives'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Дерево Рассуждений и Оценка Альтернатив (Tree-of-Thoughts)',
        'Tree-of-Thoughts (ToT) Exploration & Branch Evaluation',
        [
          '- **Генерация ветвей решений**: Сформировать минимум 3 принципиально различных траектории решения (Ветка A, Ветка B, Ветка C).',
          '- **Эвристическая оценка**: Оценить каждую ветку по шкале 1–10 по критериям: осуществимость, масштабируемость, риски и накладные расходы.',
          '- **Отсечение тупиковых ветвей (Pruning)**: Явно аргументировать, почему отбрасываются неоптимальные ветви, и развивать только наиболее надежный путь.',
        ],
        [
          '- **Branch Exploration**: Formulate at least 3 distinct architectural trajectories (Branch A, Branch B, Branch C).',
          '- **Heuristic Scoring**: Quantitatively score each branch (1-10) across feasibility, scalability, failure risk, and operational overhead.',
          '- **Branch Pruning**: Explicitly discard non-viable branches with technical rationale and expand solely the highest-scoring path.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'first-principles': {
    id: 'first-principles',
    name: 'FirstPrinciplesSkill',
    displayName: 'First Principles Deconstruction',
    categoryId: 'reasoning',
    description: 'Strips away conventions and analogies, decomposing problems down to fundamental physical/system truths.',
    tags: ['reasoning', 'first-principles', 'axioms', 'physics', 'fundamentals'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Деконструкция до Первых Принципов (First Principles)',
        'First Principles Deconstruction Protocol',
        [
          '- **Отказ от рассуждений по аналогии**: Игнорировать «так принято в индустрии» и исследовать задачу на уровне фундаментальных системных законов (время, память, сеть, физика, математика).',
          '- **Выделение элементарных атомов**: Сформулировать неразложимые базовые факты и ограничения, которые невозможно оспорить.',
          '- **Восходящий синтез (Bottom-Up)**: Построить решение заново от элементарных истин, исключая накопленный легаси-шум.',
        ],
        [
          '- **Reject Analogy Fallacy**: Disregard "industry conventions" and audit constraints against foundational physics, computational complexity, and information theory.',
          '- **Atomic Fact Isolation**: Identify irreducible system truths, invariant bounds, and core physical limitations.',
          '- **Bottom-Up Synthesis**: Rebuild the target solution from elemental axioms, eliminating inherited legacy overhead.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'inversion-thinking': {
    id: 'inversion-thinking',
    name: 'InversionThinkingSkill',
    displayName: 'Inversion & Failure Mode Analysis',
    categoryId: 'reasoning',
    description: 'Inverts the problem (Jacobi/Munger): analyzes how to guarantee catastrophe in order to prevent it.',
    tags: ['reasoning', 'inversion', 'failure', 'antifragile', 'risk'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Инверсивное Мышление и Анализ Катастрофических Сценариев',
        'Inversion Thinking & Catastrophic Failure Pre-Mortem',
        [
          '- **Инверсия задачи**: Сформулировать вопрос: «Что гарантированно приведет систему к полному провалу, потере данных или простою?».',
          '- **Каталог векторов отказа**: Составить перечень критических уязвимостей, каскадных сбоев и ошибок конфигурации, ведущих к катастрофе.',
          '- **Превентивная нейтрализация**: Для каждого вектора отказа разработать жесткий инженерный барьер, делающий возникновение сценария невозможным.',
        ],
        [
          '- **Problem Inversion**: Formulate the catastrophic converse: "What exact mechanisms would guarantee total system outage, state corruption, or failure?".',
          '- **Failure Vector Catalog**: Map critical cascade vectors, race conditions, memory leaks, and misconfigurations leading to collapse.',
          '- **Proactive Elimination**: Engineer hardened systemic interlocks that render each identified failure mode structurally impossible.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'analogical-reasoning': {
    id: 'analogical-reasoning',
    name: 'AnalogicalReasoningSkill',
    displayName: 'Cross-Domain Analogical Transfer',
    categoryId: 'reasoning',
    description: 'Maps isomorphic architectural mechanisms from distant domains (aerospace, biology, distributed physics).',
    tags: ['reasoning', 'analogy', 'cross-domain', 'isomorphism', 'patterns'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Междоменный Аналогический Перенос',
        'Cross-Domain Analogical Pattern Transfer',
        [
          '- **Поиск изоморфных структур**: Найти аналогичные задачи в смежных высоконадежных областях (авионика, иммунология, квантовая физика, гидродинамика).',
          '- **Перенос архитектурных паттернов**: Адаптировать проверенные механизмы саморегуляции, изоляции сбоев и обратной связи из эталонной области.',
          '- **Границы аналогии**: Четко зафиксировать, где аналогия перестает работать, чтобы избежать ложных экстраполяций.',
        ],
        [
          '- **Isomorphic Domain Mapping**: Identify structural parallels in mission-critical disciplines (avionics, immunology, fluid dynamics, control theory).',
          '- **Pattern Adaptation**: Translate proven resilience, feedback loops, and self-healing protocols into the target architecture.',
          '- **Boundary Demarcation**: Explicitly delineate where the analogy breaks to prevent false mechanical extrapolation.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'counterfactual-analysis': {
    id: 'counterfactual-analysis',
    name: 'CounterfactualAnalysisSkill',
    displayName: 'Counterfactual & What-If Divergence',
    categoryId: 'reasoning',
    description: 'Systematically evaluates counter-hypotheses, alternate history branches, and sensitivity to altered variables.',
    tags: ['reasoning', 'counterfactual', 'what-if', 'divergence', 'sensitivity'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Контрфактический Анализ и Моделирование «Что если»',
        'Counterfactual Analysis & "What-If" Sensitivity Protocol',
        [
          '- **Моделирование развилок**: Проанализировать 2–3 ключевых контрфактических сценария: «Что если входящая нагрузка вырастет в 100 раз?», «Что если внешний сервис будет недоступен 4 часа?».',
          '- **Оценка устойчивости**: Определить точку перелома (breaking point), при которой текущая архитектура теряет работоспособность.',
          '- **План деградации**: Предусмотреть режим плавной функциональной деградации (graceful degradation) для каждого экстремального сценария.',
        ],
        [
          '- **Divergence Modeling**: Stress-test 2-3 counterfactual branches: "What if throughput surges 100x?", "What if upstream dependencies drop for 4 hours?".',
          '- **Breaking Point Discovery**: Identify the exact tipping point where the baseline architecture experiences cascading collapse.',
          '- **Graceful Degradation Design**: Architect fallback degradation modes for each severe counterfactual condition.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'deductive-falsification': {
    id: 'deductive-falsification',
    name: 'DeductiveFalsificationSkill',
    displayName: 'Popperian Deductive Falsification',
    categoryId: 'reasoning',
    description: 'Subjects working hypotheses to rigorous stress tests designed to actively disprove and falsify them.',
    tags: ['reasoning', 'falsification', 'popper', 'stress-test', 'verification'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Дедуктивная Фальсификация Гипотез (Popperian Audit)',
        'Deductive Falsification Protocol (Popperian Stress Test)',
        [
          '- **Критерий фальсифицируемости**: Для каждого ключевого утверждения сформулировать наблюдаемый факт или эксперимент, который опровергнет его.',
          '- **Поиск контрпримеров**: Активно искать сценарии, где предлагаемое решение ломается или приводит к неконсистентному состоянию.',
          '- **Выживаемость теории**: Считать гипотезу подтвержденной только в том случае, если она выдержала целенаправленные попытки опровержения.',
        ],
        [
          '- **Falsifiability Criterion**: Formulate a concrete empirical test or edge metric that would decisively disprove each core recommendation.',
          '- **Counter-Example Hunting**: Proactively discover boundary test cases and race conditions where the proposed logic collapses.',
          '- **Survival Validation**: Accept architectural hypotheses only after rigorous, targeted refutation attempts fail.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'probabilistic-bayesian': {
    id: 'probabilistic-bayesian',
    name: 'ProbabilisticBayesianSkill',
    displayName: 'Bayesian Belief Updating',
    categoryId: 'reasoning',
    description: 'Maintains explicit prior probabilities and updates confidence rationally as new telemetry arrives.',
    tags: ['reasoning', 'bayesian', 'probability', 'priors', 'evidence', 'statistics'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Байесовское Обновление Вероятностей и Оценка Доказательств',
        'Bayesian Belief Updating & Evidential Weighting',
        [
          '- **Фиксация априорных вероятностей (Priors)**: Оценить базовую вероятность различных причин или исходов до получения новых данных.',
          '- **Оценка силы свидетельств (Likelihood)**: Взвешивать поступающие логи, метрики и сигналы с учетом их диагностической ценности.',
          '- **Апостериорный пересчет (Posteriors)**: Корректировать уверенность в выводах строго пропорционально весу полученных фактов.',
        ],
        [
          '- **Prior Probability Baseline**: Formulate base-rate priors for candidate causes and outcomes before telemetry inspection.',
          '- **Likelihood Ratio Evaluation**: Weight incoming metrics, log signals, and traces by their diagnostic power and signal-to-noise ratio.',
          '- **Posterior Calibration**: Update confidence intervals strictly in proportion to empirical evidential weight.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'dialectical-synthesis': {
    id: 'dialectical-synthesis',
    name: 'DialecticalSynthesisSkill',
    displayName: 'Dialectical Synthesis (Thesis-Antithesis)',
    categoryId: 'reasoning',
    description: 'Clashes opposing architectural theses to forge a higher-order synthesized compromise.',
    tags: ['reasoning', 'dialectics', 'thesis', 'antithesis', 'synthesis', 'compromise'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Диалектический Синтез (Тезис — Антитезис — Синтез)',
        'Dialectical Synthesis (Thesis — Antithesis — Synthesis)',
        [
          '- **Тезис (Позиция 1)**: Сформулировать сильные аргументы в пользу первого подхода (например, максимальная производительность ценой сложности).',
          '- **Антитезис (Позиция 2)**: Сформулировать сильные аргументы в пользу противоположного подхода (например, максимальная простота ценой накладных расходов).',
          '- **Синтез (Высший порядок)**: Сконструировать гибридное решение, объединяющее преимущества обеих позиций и нивелирующее их фундаментальные недостатки.',
        ],
        [
          '- **Thesis (Position 1)**: Articulate the strongest architectural case for approach A (e.g. raw performance at the expense of complexity).',
          '- **Antithesis (Position 2)**: Articulate the strongest counter-case for approach B (e.g. absolute operational simplicity).',
          '- **Higher-Order Synthesis**: Construct a hybrid architecture that captures the primary upsides of both while eliminating their crippling vulnerabilities.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'causal-dag-mapping': {
    id: 'causal-dag-mapping',
    name: 'CausalDagMappingSkill',
    displayName: 'Causal Directed Acyclic Graph (DAG) Mapping',
    categoryId: 'reasoning',
    description: 'Maps causal networks as directed acyclic graphs to isolate root causes from confounding variables.',
    tags: ['reasoning', 'causality', 'dag', 'graph', 'confounders', 'correlation'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Причинно-Следственное DAG-Моделирование',
        'Causal DAG Mapping & Confounder Isolation',
        [
          '- **Построение ориентированного графа**: Представить цепочку событий в виде DAG (Узел А → Узел Б → Узел В) без циклических зависимостей.',
          '- **Разделение корреляции и причинности**: Изолировать сопутствующие симптомы (конфаундеры) от истинных триггеров сбоя.',
          '- **Ключевой рычаг воздействия**: Найти узловой элемент графа, исправление которого разрывает всю цепочку распространения проблемы.',
        ],
        [
          '- **Directed Graph Construction**: Model event progressions as a strict DAG (Node A -> Node B -> Node C) with acyclic validation.',
          '- **Confounder vs. Driver Demarcation**: Disentangle superficial symptoms and correlated artifacts from true causal roots.',
          '- **High-Leverage Chokepoint**: Isolate the singular structural nexus where intervention permanently disrupts the failure cascade.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'second-order-effects': {
    id: 'second-order-effects',
    name: 'SecondOrderEffectsSkill',
    displayName: 'Second- & Third-Order Systems Thinking',
    categoryId: 'reasoning',
    description: 'Traces delayed ripple effects, unintended incentives, feedback loops, and downstream externalities.',
    tags: ['reasoning', 'second-order', 'systems-thinking', 'externalities', 'feedback-loops'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Анализ Эффектов Второго и Третьего Порядка',
        'Second- & Third-Order Systemic Ripple Analysis',
        [
          '- **Первый порядок (Непосредственный эффект)**: Описать прямой результат внедрения решения («Мы увеличили кэш в 10 раз»).',
          '- **Второй порядок (Системная реакция)**: Описать реакцию смежных подсистем («Потребление RAM выросло, задержки сборщика мусора GC увеличились»).',
          '- **Третий порядок (Долгосрочные последствия)**: Оценить влияние на бизнес, затраты и паттерны поведения пользователей через 3–6 месяцев.',
        ],
        [
          '- **First-Order (Immediate Delta)**: Detail the direct immediate consequence ("We increased cache buffer 10x").',
          '- **Second-Order (Component Reaction)**: Detail adjacent subsystem feedback ("RAM consumption spikes, triggering prolonged GC pauses").',
          '- **Third-Order (Macro System Shift)**: Evaluate multi-month downstream impacts on infrastructure billing, reliability, and engineering velocity.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'reduction-to-absurdity': {
    id: 'reduction-to-absurdity',
    name: 'ReductionToAbsurditySkill',
    displayName: 'Reductio Ad Absurdum Stress Test',
    categoryId: 'reasoning',
    description: 'Pushes assumptions to extreme mathematical limits to expose hidden logical flaws and asymptotic breakdowns.',
    tags: ['reasoning', 'reductio', 'extremes', 'limits', 'fallacies'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Стресс-Тест Доведением до Абсурда (Reductio ad Absurdum)',
        'Reductio ad Absurdum Limit Testing',
        [
          '- **Экстраполяция к пределам**: Проверить логику на предельных значениях (N = 0, N = 1, N = 10^9, latency = ∞, concurrency = 1M).',
          '- **Выявление скрытых противоречий**: Показать, где масштабирование текущей логики приводит к математически невозможному или абсурдному состоянию.',
          '- **Коррекция границ**: Задать строгие асимптотические границы применимости для предлагаемого алгоритма или архитектуры.',
        ],
        [
          '- **Asymptotic Extremes**: Stress-test reasoning at operational extremes (N=0, N=1, N=10^9, latency=∞, concurrency=1M).',
          '- **Contradiction Exposure**: Demonstrate where extrapolating current assumptions yields mathematically invalid or catastrophic states.',
          '- **Boundary Correction**: Formulate rigorous upper/lower bounds of algorithmic applicability.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'pareto-frontier-analysis': {
    id: 'pareto-frontier-analysis',
    name: 'ParetoFrontierAnalysisSkill',
    displayName: 'Pareto Frontier Multi-Objective Optimization',
    categoryId: 'reasoning',
    description: 'Identifies non-dominated Pareto-optimal solutions across conflicting dimensions (e.g. Latency vs. Cost).',
    tags: ['reasoning', 'pareto', 'optimization', 'multi-objective', 'tradeoffs'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Анализ Границы Парето (Multi-Objective Optimization)',
        'Pareto Frontier Multi-Objective Evaluation',
        [
          '- **Оси оптимизации**: Определить 2–3 конкурирующих критерия (например, Стоимость инфраструктуры vs. Доступность 99.999% vs. Задержка).',
          '- **Выделение недоминируемых вариантов**: Отбросить субоптимальные решения и выделить только те, где улучшение одного параметра невозможно без ухудшения другого.',
          '- **Рекомендация рабочей точки**: Выбрать оптимальную точку на границе Парето с учетом бюджета и бизнес-требований.',
        ],
        [
          '- **Optimization Axes**: Calibrate 2-3 conflicting dimensions (e.g. Cloud Cost vs. Five-Nines Availability vs. P99 Latency).',
          '- **Non-Dominated Set Extraction**: Discard inferior designs and isolate solely Pareto-efficient configurations where no metric improves without degrading another.',
          '- **Operating Point Selection**: Pinpoint the precise sweet spot on the frontier matching explicit organizational ROI constraints.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'backpropagation-reasoning': {
    id: 'backpropagation-reasoning',
    name: 'BackpropagationReasoningSkill',
    displayName: 'Backward Reasoning & Prerequisite Chaining',
    categoryId: 'reasoning',
    description: 'Starts from the guaranteed target end state and works strictly backwards to deduce required precursors.',
    tags: ['reasoning', 'backward', 'prerequisites', 'chaining', 'reverse-engineering'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Обратное Рассуждение от Целевого Состояния (Backward Chaining)',
        'Backward Reasoning & Prerequisite Chaining Protocol',
        [
          '- **Фиксация идеального финала**: Описать финальное успешное состояние системы с полной детализацией всех параметров.',
          '- **Обратная декомпозиция (T-1, T-2...)**: Задать вопрос: «Какое условие должно быть выполнено за шаг до этого?», двигаясь назад к текущему моменту.',
          '- **Выявление критического пути (Critical Path)**: Сформировать линейную цепочку обязательных предпосылок без тупиковых ответвлений.',
        ],
        [
          '- **Target State Anchoring**: Define the precise end-state victory condition with exhaustive parametric detail.',
          '- **Reverse Induction (T-1, T-2...)**: Iteratively deduce: "What prerequisite state must strictly hold immediately prior?", stepping back to T0.',
          '- **Critical Path Mapping**: Synthesize an unassailable dependency chain devoid of non-essential branches.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'fermi-estimation': {
    id: 'fermi-estimation',
    name: 'FermiEstimationSkill',
    displayName: 'Fermi Order-of-Magnitude Estimation',
    categoryId: 'reasoning',
    description: 'Performs dimensional analysis and order-of-magnitude calculations under high data sparsity.',
    tags: ['reasoning', 'fermi', 'estimation', 'order-of-magnitude', 'quantitative', 'math'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Оценка Порядков Величин по Ферми (Fermi Estimation)',
        'Fermi Order-of-Magnitude Estimation Protocol',
        [
          '- **Разбиение на базовые множители**: Разложить неизвестную величину на произведение 3–5 параметров, поддающихся обоснованной оценке.',
          '- **Размерностный анализ**: Проверять единицы измерения на каждом этапе (QPS, байты/сек, CPU core-hours, $/month).',
          '- **Оценка доверительного интервала**: Предоставить нижнюю и верхнюю границы (Worst case / Expected / Best case) с логарифмической погрешностью.',
        ],
        [
          '- **Factor Decomposition**: Decompose the target unknown into a product of 3-5 bounded sub-estimates.',
          '- **Dimensional Validation**: Rigorously verify physical and computational dimensions (QPS, IOPS, throughput MB/s, memory footprint).',
          '- **Confidence Bounds**: Provide explicit bounds (P10 / P50 / P90) with logarithmic scale error accounting.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'graph-of-thoughts': {
    id: 'graph-of-thoughts',
    name: 'GraphOfThoughtsSkill',
    displayName: 'Graph of Thoughts (GoT) Synthesis',
    categoryId: 'reasoning',
    description: 'Models reasoning as an arbitrary directed network, allowing thought combinations, feedback loops, and multi-path aggregation.',
    tags: ['reasoning', 'got', 'graph', 'aggregation', 'network-reasoning'],
    transform: createStandardSkillTransform(
      'protocol',
      'Граф Рассуждений и Сетевой Синтез (Graph-of-Thoughts)',
      'Graph-of-Thoughts (GoT) Network Reasoning Protocol',
      [
        '- **Сетевая топология мыслей**: Моделировать рассуждения не просто цепочкой или деревом, а ориентированным графом с возможностью объединения параллельных ветвей.',
        '- **Агрегация мыслей (Thought Aggregation)**: Скрещивать сильные элементы из независимых ветвей рассуждения для получения превосходящего синтетического решения.',
        '- **Обратные связи и уточнение (Refinement Loops)**: Направлять выходные оценки обратно в исходные узлы для итеративной калибровки параметров.',
      ],
      [
        '- **Non-Linear Graph Modeling**: Structure analytical thoughts as an arbitrary Directed Acyclic Graph (DAG) permitting cross-branch merges and cycles.',
        '- **Thought Combination & Synergy**: Synthesize hybrid breakthroughs by cross-breeding optimal nodes from mutually disjoint reasoning paths.',
        '- **Iterative Feedback Loops**: Route downstream evaluation metrics back to ancestor nodes for continuous parametric refinement.',
      ]
    ),
  },

  'abductive-reasoning': {
    id: 'abductive-reasoning',
    name: 'AbductiveReasoningSkill',
    displayName: 'Abductive Inference to Best Explanation',
    categoryId: 'reasoning',
    description: 'Infers the most parsimonious, physically consistent explanatory hypothesis given an incomplete set of anomalous observations.',
    tags: ['reasoning', 'abduction', 'inference', 'diagnostics', 'hypotheses'],
    transform: createStandardSkillTransform(
      'protocol',
      'Абдуктивный Вывод и Поиск Наилучшего Объяснения',
      'Abductive Inference to Best Explanation Protocol',
      [
        '- **Фиксация аномалий и симптомов**: Четко перечислить все наблюдаемые факты, ошибки в логах и отклонения от нормального поведения.',
        '- **Генерация конкурирующих гипотез**: Сформировать минимум 3 объяснения, способных вызвать данную совокупность симптомов.',
        '- **Оценка правдоподобия (Parsimony / Likelihood)**: Ранжировать гипотезы по принципу минимального числа допущений и соответствию известным системным законам.',
      ],
      [
        '- **Anomaly Observation Matrix**: Catalog all empirical telemetry anomalies, stack traces, and atypical operational symptoms.',
        '- **Competing Hypothesis Generation**: Formulate at least 3 distinct root causes capable of generating the observed symptom profile.',
        '- **Likelihood & Parsimony Ranking**: Rank explanatory models by minimal necessary assumptions and congruence with established physics/system topology.',
      ]
    ),
  },

  'reductio-ad-absurdum': {
    id: 'reductio-ad-absurdum',
    name: 'ReductioAdAbsurdumSkill',
    displayName: 'Reductio ad Absurdum Proof by Contradiction',
    categoryId: 'reasoning',
    description: 'Assumes the opposite of the desired thesis and strictly traces logical deductions until an unavoidable contradiction emerges.',
    tags: ['reasoning', 'proof', 'contradiction', 'formal-logic', 'refutation'],
    transform: createStandardSkillTransform(
      'protocol',
      'Доказательство от Противного (Reductio ad Absurdum)',
      'Proof by Contradiction (Reductio ad Absurdum) Protocol',
      [
        '- **Антитезис-допущение**: Принять противоположное утверждение как истинное (напр. «Предположим, что кэширование без инвалидации допустимо»).',
        '- **Строгое развертывание следствий**: Вывести математические и логические последствия принятого допущения шаг за шагом.',
        '- **Фиксация противоречия**: Показать неизбежное столкновение с базовыми ограничениями (нарушение целостности данных, deadlock, бесконечный цикл) и отбросить антитезис.',
      ],
      [
        '- **Antithesis Assumption**: Formally assume the truth of the opposing premise (e.g., "Assume lock-free state mutation without consensus").',
        '- **Rigorous Consequence Unfolding**: Derive exact computational and business consequences step-by-step from the premise.',
        '- **Contradiction Pinpointing**: Reveal the unavoidable physical, mathematical, or invariant violation, conclusively disproving the antithesis.',
      ]
    ),
  },

  'analogical-mapping-rigor': {
    id: 'analogical-mapping-rigor',
    name: 'AnalogicalMappingRigorSkill',
    displayName: 'Structural Analogical Mapping Rigor',
    categoryId: 'reasoning',
    description: 'Maps complex problems onto well-understood domain metaphors while strictly documenting where the isomorphism breaks down.',
    tags: ['reasoning', 'analogies', 'isomorphism', 'mapping', 'metaphors'],
    transform: createStandardSkillTransform(
      'protocol',
      'Строгий Изоморфный Анализ по Аналогии',
      'Structural Analogical Mapping Rigor Protocol',
      [
        '- **Точечное проецирование сущностей**: Сопоставить сущности целевой задачи с проверенной предметной областью (напр., гидравлика, биология, логистика).',
        '- **Сохранение структурных отношений**: Переносить только логические связи и законы сохранения, а не внешние поверхностные черты.',
        '- **Границы применимости аналогии**: Обязательно указать, где аналогия перестает работать, чтобы избежать ложных выводов.',
      ],
      [
        '- **Isomorphic Entity Mapping**: Map target architecture components to a deeply understood external domain (e.g. fluid dynamics, distributed logistics).',
        '- **Relational Preservation**: Transfer solely structural relationships and conservation laws rather than superficial aesthetic traits.',
        '- **Analogy Breakdown Boundary**: Explicitly document where the metaphorical mapping fails to prevent erroneous conceptual extrapolation.',
      ]
    ),
  },

  'system-dynamics-feedback': {
    id: 'system-dynamics-feedback',
    name: 'SystemDynamicsFeedbackSkill',
    displayName: 'System Dynamics & Feedback Loop Analysis',
    categoryId: 'reasoning',
    description: 'Models reinforcing and balancing feedback loops, stock-and-flow dynamics, and non-linear tipping thresholds.',
    tags: ['reasoning', 'system-dynamics', 'feedback-loops', 'tipping-points', 'delays'],
    transform: createStandardSkillTransform(
      'protocol',
      'Системная Динамика и Петли Обратной Связи',
      'System Dynamics & Feedback Loop Modeling Protocol',
      [
        '- **Петли обратной связи**: Выявить усиливающие (reinforcing / positive) и стабилизирующие (balancing / negative) петли в системе.',
        '- **Временные задержки (Time Delays)**: Оценить лаги между воздействием и эффектом, вызывающие паразитные автоколебания и перерегулирование.',
        '- **Точки перегиба (Tipping Points)**: Найти критические пороги, превышение которых переводит систему в качественно иное неустойчивое состояние.',
      ],
      [
        '- **Loop Identification**: Categorize reinforcing (positive runaway) loops vs. balancing (negative homeostatic) feedback circuits.',
        '- **Time Delay Latency**: Model information and execution delays between action and systemic reaction that trigger oscillation and overshoot.',
        '- **Tipping Point Thresholds**: Quantify non-linear phase-transition boundaries where self-correcting systems collapse into unrecoverable failure.',
      ]
    ),
  },

  'game-theoretic-equilibria': {
    id: 'game-theoretic-equilibria',
    name: 'GameTheoreticEquilibriaSkill',
    displayName: 'Game-Theoretic Equilibrium & Incentives',
    categoryId: 'reasoning',
    description: 'Evaluates multi-agent strategic dynamics, Nash equilibria, dominant strategies, and mechanism incentive compatibility.',
    tags: ['reasoning', 'game-theory', 'nash-equilibrium', 'incentives', 'strategy'],
    transform: createStandardSkillTransform(
      'protocol',
      'Теория Игр и Анализ Равновесий Стимулов',
      'Game-Theoretic Equilibria & Mechanism Design Protocol',
      [
        '- **Матрица участников и выигрышей**: Определить игроков (пользователи, атакующие, конкуренты, алгоритмы), их стратегии и функции полезности.',
        '- **Поиск равновесия Нэша**: Найти состояние, при котором ни одному участнику не выгодно менять стратегию в одностороннем порядке.',
        '- **Incentive Compatibility**: Спроектировать правила так, чтобы честное и конструктивное поведение было доминирующей стратегией для всех акторов.',
      ],
      [
        '- **Payoff Matrix Formalization**: Model participating agents (users, adversaries, microservices, third-party APIs), their strategy spaces, and utility functions.',
        '- **Nash Equilibrium Determination**: Calculate stable equilibrium states where no self-interested actor has unilateral incentive to deviate.',
        '- **Incentive Compatibility Engineering**: Design mechanism rules ensuring honest, cooperative participation is the strictly dominant strategy.',
      ]
    ),
  },

  'occams-computational-razor': {
    id: 'occams-computational-razor',
    name: 'OccamsComputationalRazorSkill',
    displayName: 'Occams Razor & Description Length Rigor',
    categoryId: 'reasoning',
    description: 'Pitches algorithmic fit against Kolmogorov description complexity to aggressively penalize over-engineered solutions.',
    tags: ['reasoning', 'occams-razor', 'parsimony', 'complexity', 'simplicity'],
    transform: createStandardSkillTransform(
      'protocol',
      'Вычислительная Бритва Оккама (Минимальная Длина Описания)',
      'Occams Computational Razor Protocol',
      [
        '- **Штраф за сложность**: Оценивать решения по критерию: Качество результата минус штраф за число сущностей, зависимостей и строк кода.',
        '- **Устранение лишних сущностей**: Руководствоваться принципом: «Не умножай сущности без строгой математической или инженерной необходимости».',
        '- **Выбор простейшего объяснения**: При равной точности двух подходов безоговорочно выбирать тот, который требует меньше слоев абстракции.',
      ],
      [
        '- **Complexity Penalty Metric**: Score candidate architectures by: [Empirical Fitness] minus [Information Description Length / Dependency Overhead].',
        '- **Entity Elimination Audit**: Actively challenge every added table, proxy, queue, or microservice against the null hypothesis.',
        '- **Parsimonious Dominance**: When two designs exhibit identical capability, unconditionally select the one with lower cognitive and maintenance footprint.',
      ]
    ),
  },

  'contrastive-explanation': {
    id: 'contrastive-explanation',
    name: 'ContrastiveExplanationSkill',
    displayName: 'Contrastive Explanation & Foil Analysis',
    categoryId: 'reasoning',
    description: 'Answers "Why Option P rather than Option Q?", specifically detailing the exact decisive differentiator against the closest rival.',
    tags: ['reasoning', 'contrastive', 'explanation', 'foil', 'comparative'],
    transform: createStandardSkillTransform(
      'protocol',
      'Контрастивное Объяснение и Анализ Альтернативы (Foil)',
      'Contrastive Explanation & Foil Analysis Protocol',
      [
        '- **Выбор сильнейшего соперника (Foil)**: Назвать не абстрактные альтернативы, а главного сильного конкурента выбранного решения.',
        '- **Фокус на ключевом дифференциаторе**: Ответить на вопрос: «Почему выбран вариант P, а не Q? В чем их главное разделяющее свойство?».',
        '- **Граничные условия победы**: Указать, при каких изменениях контекста вариант Q оказался бы предпочтительнее варианта P.',
      ],
      [
        '- **Foil Identification**: Directly confront the single most compelling alternative (the "Foil") rather than straw-man options.',
        '- **Decisive Differentiator**: Articulate the exact divergence point: "Why P over Q?" grounded in verifiable trade-offs.',
        '- **Phase Shift Conditions**: Explicitly document under what contextual thresholds the Foil (Q) would surpass the recommendation (P).',
      ]
    ),
  },

  'metacognitive-self-correction': {
    id: 'metacognitive-self-correction',
    name: 'MetacognitiveSelfCorrectionSkill',
    displayName: 'Metacognitive Self-Correction Loop',
    categoryId: 'reasoning',
    description: 'Executes an internal secondary audit of the reasoning chain to catch logical fallacies, cognitive biases, and leaps of faith.',
    tags: ['reasoning', 'metacognition', 'self-correction', 'biases', 'audit'],
    transform: createStandardSkillTransform(
      'protocol',
      'Метакогнитивный Аудит и Самокоррекция Рассуждений',
      'Metacognitive Self-Correction Audit Protocol',
      [
        '- **Внутренний ревизор (Auditor Stance)**: После вывода шагов перечитать аргументацию с позиции скептически настроенного независимого эксперта.',
        '- **Поиск логических разрывов (Non-Sequitur)**: Проверить, действительно ли выводы строго следуют из приведенных посылок.',
        '- **Коррекция подтверждающего искажения (Confirmation Bias)**: Намеренно поискать факты, противоречащие первоначальному мнению, и скорректировать вердикт.',
      ],
      [
        '- **Secondary Cognitive Audit**: Subject interim deductive reasoning to an adversarial internal audit before finalizing conclusions.',
        '- **Non-Sequitur Detection**: Verify that every transition between step N and step N+1 is mathematically and logically sound with no hidden leaps.',
        '- **Confirmation Bias Inversion**: Actively search for disconfirming empirical evidence that contradicts the favored outcome and adjust accordingly.',
      ]
    ),
  },

  'boundary-value-extremization': {
    id: 'boundary-value-extremization',
    name: 'BoundaryValueExtremizationSkill',
    displayName: 'Asymptotic & Extreme Value Stress-Testing',
    categoryId: 'reasoning',
    description: 'Stresses hypotheses by pushing input variables to mathematical extremes (N=0, N=1, N->infinity, latency->infinity, zero memory).',
    tags: ['reasoning', 'extremes', 'asymptotics', 'boundary-values', 'stress-testing'],
    transform: createStandardSkillTransform(
      'protocol',
      'Асимптотический Анализ и Экстремальные Значения',
      'Asymptotic Limits & Boundary Value Stress-Testing Protocol',
      [
        '- **Тестирование крайних точек**: Проверить поведение системы при N = 0 (пустой ввод), N = 1 (минимальный случай), N → ∞ (предельная нагрузка).',
        '- **Экстремальные сбои окружения**: Смоделировать задержку сети = 60 сек, доступную память = 0 байт, 100% потерю пакетов.',
        '- **Асимптотическая сложность**: Определить O(1), O(N), O(N log N) поведение по времени и памяти при неограниченном росте данных.',
      ],
      [
        '- **Boundary Testing Matrix**: Evaluate architecture under degenerate states: N=0 (empty payload), N=1 (atomic), and N→∞ (unbounded scale).',
        '- **Environmental Extremization**: Stress-test against absolute boundary conditions: 0-byte memory headrooms, infinite latency partitions, 100% packet drop.',
        '- **Asymptotic Scaling Profiling**: Prove Big-O runtime and memory complexity scaling curves under continuous load amplification.',
      ]
    ),
  },

  'hypothetico-deductive-spiral': {
    id: 'hypothetico-deductive-spiral',
    name: 'HypotheticoDeductiveSpiralSkill',
    displayName: 'Hypothetico-Deductive Scientific Method',
    categoryId: 'reasoning',
    description: 'Executes the classic scientific method: Observation -> Hypothesis Formulation -> Prediction Deduction -> Empirical Verification.',
    tags: ['reasoning', 'scientific-method', 'hypotheses', 'deduction', 'experimentation'],
    transform: createStandardSkillTransform(
      'protocol',
      'Гипотетико-Дедуктивный Научный Метод',
      'Hypothetico-Deductive Scientific Protocol',
      [
        '- **Формулирование фальсифицируемой гипотезы**: «Если мы применим X, то метрика Y изменится на Z в условиях W».',
        '- **Дедукция прогнозов**: Вывести точные следствия, которые обязаны проявиться, если гипотеза верна.',
        '- **План эмпирической валидации**: Описать эксперимент (A/B тест, бенчмарк, канареечный релиз), доказывающий или опровергающий гипотезу.',
      ],
      [
        '- **Formal Hypothesis Formulation**: Structure as: "If architecture X is deployed, metric Y will shift by delta Z under environment W".',
        '- **Predictive Deduction**: Deduce specific, observable consequences that MUST manifest if and only if the hypothesis is true.',
        '- **Empirical Verification Suite**: Design a deterministic experiment (synthetic benchmark, canary telemetry) to validate predictions.',
      ]
    ),
  },

  'bayesian-prior-updating': {
    id: 'bayesian-prior-updating',
    name: 'BayesianPriorUpdatingSkill',
    displayName: 'Bayesian Prior & Posterior Calibration',
    categoryId: 'reasoning',
    description: 'Explicitly establishes baseline base-rate priors and updates them mathematically via Bayes rule upon receiving new signals.',
    tags: ['reasoning', 'bayesian', 'probability', 'priors', 'evidence-updating'],
    transform: createStandardSkillTransform(
      'protocol',
      'Байесовское Обновление Априорных Вероятностей',
      'Bayesian Prior Updating & Likelihood Protocol',
      [
        '- **Базовая априорная вероятность (Prior / Base Rate)**: Назвать историческую частоту возникновения аналогичного события или сбоя в индустрии.',
        '- **Правдоподобие новых свидетельств (Likelihood Ratio)**: Оценить надежность полученных логов, тестов или симптомов (сигнал против ложной тревоги).',
        '- **Апостериорная калибровка (Posterior)**: Рассчитать обновленную уверенность после учета новых данных, избегая пренебрежения базовой частотой.',
      ],
      [
        '- **Base-Rate Prior Anchoring**: Establish empirical baseline historical incident or failure frequencies before evaluating context signals.',
        '- **Likelihood Ratio Assessment**: Evaluate the diagnostic fidelity and false-positive probability of incoming telemetry alerts.',
        '- **Posterior Probability Synthesis**: Formulate updated belief degrees, actively counteracting base-rate neglect fallacy.',
      ]
    ),
  },

  'first-order-predicate-logic': {
    id: 'first-order-predicate-logic',
    name: 'FirstOrderPredicateLogicSkill',
    displayName: 'Formal Propositional & Predicate Verification',
    categoryId: 'reasoning',
    description: 'Translates ambiguous natural language propositions into formal first-order logic predicates to verify consistency and validity.',
    tags: ['reasoning', 'formal-logic', 'predicates', 'boolean', 'verification'],
    transform: createStandardSkillTransform(
      'protocol',
      'Формальная Предикатная Логика и Верификация Истинности',
      'Formal Propositional & Predicate Logic Protocol',
      [
        '- **Формализация утверждений**: Перевести сложные текстовые бизнес-правила в булевы предикаты и кванторы (∀x, ∃y, P(x) → Q(x)).',
        '- **Проверка на тавтологии и противоречия**: Построить таблицу истинности или провести резолютивный вывод для выявления логических конфликтов.',
        '- **Устранение логических дыр**: Выявить пограничные комбинации предикатов, для которых поведение системы не определено.',
      ],
      [
        '- **Predicate Formalization**: Translate ambiguous natural-language business specifications into formal symbolic expressions (∀x, ∃y, P(x) ⇒ Q(x)).',
        '- **Truth Table & Contradiction Check**: Execute resolution proofs to guarantee logical non-contradiction across intersecting rulesets.',
        '- **Exhaustiveness Audit**: Isolate undefined predicate combinations to ensure total function coverage across state spaces.',
      ]
    ),
  },

  'morphological-analysis': {
    id: 'morphological-analysis',
    name: 'MorphologicalAnalysisSkill',
    displayName: 'Zwicky Morphological Space Exploration',
    categoryId: 'reasoning',
    description: 'Deconstructs multidimensional architectural spaces into a morphological matrix to systematically explore novel valid configurations.',
    tags: ['reasoning', 'zwicky', 'morphology', 'combinatorics', 'design-space'],
    transform: createStandardSkillTransform(
      'protocol',
      'Морфологический Анализ Пространства Решений (Метод Цвикки)',
      'Zwicky Morphological Space Exploration Protocol',
      [
        '- **Параметризация пространства**: Разбить проблему на 4–6 независимых функциональных измерений (хранилище, транспорт, протокол, консенсус, репликация).',
        '- **Матрица значений**: Для каждого измерения выписать все допустимые варианты реализации.',
        '- **Комбинаторный синтез**: Исследовать комбинации по всей матрице, отсекая несовместимые пары и находя нетривиальные синергетические решения.',
      ],
      [
        '- **Dimensional Factorization**: Decompose problem space into 4-6 orthogonal functional axes (e.g. Storage, Ingestion, Consensus, Caching, Telemetry).',
        '- **Morphological Matrix Construction**: Enumerate discrete production options for each dimension in a structured grid.',
        '- **Cross-Consistency Evaluation**: Eliminate internally incompatible cross-combinations and isolate high-synergy novel architectural vectors.',
      ]
    ),
  },

  'triage-heuristic-elimination': {
    id: 'triage-heuristic-elimination',
    name: 'TriageHeuristicEliminationSkill',
    displayName: 'Fast-and-Frugal Triage & Elimination Trees',
    categoryId: 'reasoning',
    description: 'Applies lexical and fast-and-frugal decision trees to rapidly eliminate inferior options without expensive full-scale evaluation.',
    tags: ['reasoning', 'triage', 'heuristics', 'decision-trees', 'efficiency'],
    transform: createStandardSkillTransform(
      'protocol',
      'Быстрый Эвристический Скрининг и Деревья Исключения (Triage)',
      'Fast-and-Frugal Heuristic Triage Protocol',
      [
        '- **Одношаговые стоп-факторы (Knockout Criteria)**: Сформулировать 2–3 жестких фильтра (бюджет, задержка > 200 мс, отсутствие лицензии), мгновенно отсекающих варианты.',
        '- **Иерархический скрининг**: Пропускать кандидатов через дерево проверок, останавливаясь на первом невыполненном условии.',
        '- **Экономия аналитических ресурсов**: Проводить глубокий аудит только для вариантов, прошедших экспресс-триаж.',
      ],
      [
        '- **Knockout Criteria Mapping**: Establish 2-3 binary gating questions (e.g., license incompatibility, cold-start > 500ms) that instantly disqualify contenders.',
        '- **Fast-and-Frugal Tree Execution**: Evaluate candidates through sequential lexicographic checks, halting evaluation upon the first failed threshold.',
        '- **Resource Conservation**: Allocate in-depth architectural and benchmark scrutiny exclusively to candidates surviving rapid triage.',
      ]
    ),
  },

  'causal-intervention-do-calculus': {
    id: 'causal-intervention-do-calculus',
    name: 'CausalInterventionDoCalculusSkill',
    displayName: 'Judea Pearl Causal Intervention (do-calculus)',
    categoryId: 'reasoning',
    description: 'Distinguishes purely observational correlation P(Y|X) from interventional causation P(Y|do(X)) using Judea Pearls structural causal models.',
    tags: ['reasoning', 'causal-inference', 'do-calculus', 'judea-pearl', 'confounders'],
    transform: createStandardSkillTransform(
      'protocol',
      'Причинно-Следственный Анализ и do-Исчисление Перла',
      'Causal Inference & Pearl do-Calculus Protocol',
      [
        '- **Разделение наблюдения и интервенции**: Четко различать «Что происходит, когда мы наблюдаем X» (корреляция) и «Что произойдет, если мы принудительно выставим X» (интервенция).',
        '- **Выявление скрытых конфаундеров (Confounders)**: Найти третьи переменные (напр., тип трафика, сезонность), создающие иллюзию прямой связи.',
        '- **Анализ контрфактических сценариев**: Оценить, изменился бы результат Y, если бы вмешательство X не произошло.',
      ],
      [
        '- **Observational vs Interventional Demarcation**: Rigorously separate observational correlations P(Y|X) from interventional causal effects P(Y|do(X)).',
        '- **Confounder Confounding Adjustment**: Identify common unobserved causes and back-door paths generating spurious architectural correlations.',
        '- **Counterfactual Verification**: Formally evaluate counterfactual claims: "Would system degradation Y have occurred had intervention X been withheld?".',
      ]
    ),
  },

  'second-order-unintended-consequences': {
    id: 'second-order-unintended-consequences',
    name: 'SecondOrderUnintendedConsequencesSkill',
    displayName: 'Second-Order Gameability & Cobra Effects',
    categoryId: 'reasoning',
    description: 'Analyzes how human and algorithmic actors will alter behavior to game or circumvent newly introduced metrics and constraints.',
    tags: ['reasoning', 'unintended-consequences', 'goodharts-law', 'cobra-effect', 'perverse-incentives'],
    transform: createStandardSkillTransform(
      'protocol',
      'Анализ Непреднамеренных Последствий и Закон Гудхарта',
      'Second-Order Gameability & Perverse Incentives Protocol',
      [
        '- **Закон Гудхарта**: Проанализировать, как целевая метрика потеряет смысл, когда станет объектом оптимизации («Когда метрика становится целью, она перестает быть хорошей метрикой»).',
        '- **Эффект кобры (Cobra Effect)**: Смоделировать, как участники попытаются эксплуатировать правила или создавать искусственную активность ради бонусов.',
        '- **Защитные контрбалансы**: Снабдить каждую метрику контр-метрикой (напр., Скорость разработки сбалансирована Плотностью дефектов в продакшне).',
      ],
      [
        '- **Goodharts Law Vulnerability Audit**: Identify how newly proposed engineering KPIs or SLAs will degrade in diagnostic value once actively targeted.',
        '- **Perverse Incentive Simulation**: Model gaming strategies where developers or clients optimize localized rewards at the expense of systemic health.',
        '- **Paired Countervailing Metrics**: Pair every primary KPI with a countervailing constraint metric (e.g. Velocity paired with Defect Escape Rate).',
      ]
    ),
  },

  'triangulated-multi-model-consensus': {
    id: 'triangulated-multi-model-consensus',
    name: 'TriangulatedMultiModelConsensusSkill',
    displayName: 'Triangulated Multi-Model Consensus',
    categoryId: 'reasoning',
    description: 'Solves complex dilemmas using 3 completely independent mental models (e.g. Queuing Theory, Financial Options, Reliability SRE) and checks convergence.',
    tags: ['reasoning', 'mental-models', 'triangulation', 'consensus', 'convergence'],
    transform: createStandardSkillTransform(
      'protocol',
      'Триангуляция через Независимые Ментальные Модели',
      'Triangulated Multi-Model Consensus Protocol',
      [
        '- **Выбор 3 ортогональных моделей**: Применить три принципиально разные дисциплины (напр. 1: Теория очередей/Литтл, 2: Финансовые реальные опционы, 3: Термодинамическая энтропия/SRE).',
        '- **Независимый расчет**: Провести анализ проблемы через каждую модель изолированно без взаимного влияния.',
        '- **Точка пересечения (Consensus Core)**: Найти фундаментальные выводы, подтвержденные всеми тремя моделями одновременно, отбросив модельно-специфичные артефакты.',
      ],
      [
        '- **Tri-Model Selection**: Apply three orthogonal analytical frameworks (e.g. 1: Queuing Theory / Littles Law, 2: Financial Real Options, 3: Site Reliability Invariants).',
        '- **Isolated Model Deduction**: Run independent deductions through each mental model without allowing cross-contamination of assumptions.',
        '- **Convergence Core Extraction**: Synthesize conclusions corroborated unanimously across all three paradigms, discarding paradigm-specific artifacts.',
      ]
    ),
  },

  "chain-of-verification-cove": {
    id: "chain-of-verification-cove",
    name: "ChainOfVerificationCoveSkill",
    displayName: "Chain-of-Verification (CoVe) Self-Fact-Checking",
    categoryId: "reasoning",
    description: "Generates initial baseline answers, derives targeted verification questions, answers them independently, and synthesizes a verified final output.",
    tags: ["reasoning","cove","fact-checking","hallucination-prevention","verification"],
    transform: createStandardSkillTransform({
      sectionName: "Chain-of-Verification (CoVe) Protocol",
      ruSectionName: "Протокол цепочки верификации (Chain-of-Verification / CoVe)",
      instructions: [
        "Step 1: Draft initial response to the prompt.",
        "Step 2: Generate 3-5 factual verification questions explicitly checking potential inaccuracies, dates, and logical leaps.",
        "Step 3: Answer each verification question independently, deliberately ignoring initial draft assumptions.",
        "Step 4: Synthesize final output by reconciling discrepancies and correcting all detected contradictions.",
      ],
      ruInstructions: [
        "Шаг 1: Сформируйте первичный черновой ответ на задачу.",
        "Шаг 2: Сгенерируйте 3–5 проверочных вопросов, тестирующих потенциально шаткие даты, факты и формулы черновика.",
        "Шаг 3: Дайте независимые ответы на проверочные вопросы без оглядки на первичный черновик.",
        "Шаг 4: Соберите итоговый проверенный текст, устранив все обнаруженные нестыковки.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","cove","fact-checking","hallucination-prevention","verification"],
    }),
  },

  "tree-of-thought-bfs-exploration": {
    id: "tree-of-thought-bfs-exploration",
    name: "TreeOfThoughtBfsExplorationSkill",
    displayName: "Tree-of-Thought (ToT) Breadth-First Exploration",
    categoryId: "reasoning",
    description: "Branches thought trajectories across multiple candidates, evaluates states with heuristic scores, and prunes unpromising paths via BFS.",
    tags: ["reasoning","tree-of-thought","bfs","search","heuristics"],
    transform: createStandardSkillTransform({
      sectionName: "Tree-of-Thought BFS Architecture",
      ruSectionName: "Поиск по дереву мыслей в ширину (Tree-of-Thought BFS)",
      instructions: [
        "Generate 3 distinct next-step thought branches for each active search horizon.",
        "Assign explicit heuristic scores (1-10) to each candidate state based on feasibility, soundness, and distance to goal.",
        "Retain only the top 2 highest-scoring branches (Beam/BFS width 2) and prune all sub-threshold branches immediately.",
        "Iterate until reaching the terminal goal condition, recording the complete winning reasoning trace.",
      ],
      ruInstructions: [
        "Генерируйте 3 принципиально разных направления мысли на каждом шаге рассуждения.",
        "Присваивайте каждому направлению эвристический балл от 1 до 10 по критериям реалистичности и надежности.",
        "Оставляйте только 2 наиболее перспективные ветки, безжалостно отсекая остальные.",
        "Продолжайте итерации до достижения цели, фиксируя выигрышную цепочку умозаключений.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","tree-of-thought","bfs","search","heuristics"],
    }),
  },

  "self-consistency-majority-voting": {
    id: "self-consistency-majority-voting",
    name: "SelfConsistencyMajorityVotingSkill",
    displayName: "Self-Consistency Majority Sampling & Ensemble Voting",
    categoryId: "reasoning",
    description: "Samples multiple diverse reasoning chains and aggregates the final conclusion via consensus clustering and majority voting.",
    tags: ["reasoning","self-consistency","majority-voting","ensemble","consensus"],
    transform: createStandardSkillTransform({
      sectionName: "Self-Consistency Consensus Protocol",
      ruSectionName: "Самосогласованность и голосование большинством (Self-Consistency)",
      instructions: [
        "Execute 3 independent parallel reasoning paths using varied starting angles and heuristic perspectives.",
        "Extract the terminal answer/verdict from each independent path.",
        "Cluster identical or functionally equivalent conclusions; adopt the verdict supported by the strict mathematical majority.",
        "Document minority dissenting rationale to expose edge-case risks.",
      ],
      ruInstructions: [
        "Проведите 3 независимых цепочки рассуждений под разными углами зрения.",
        "Извлеките финальный вывод и ключевой ответ из каждой отдельной ветки.",
        "Сгруппируйте результаты и примите решение, поддержанное абсолютным большинством путей.",
        "Кратко зафиксируйте аргументы меньшинства для понимания рисков граничных сценариев.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","self-consistency","majority-voting","ensemble","consensus"],
    }),
  },

  "dialectic-thesis-antithesis-synthesis": {
    id: "dialectic-thesis-antithesis-synthesis",
    name: "DialecticThesisAntithesisSynthesisSkill",
    displayName: "Hegelian Dialectical Synthesis (Thesis, Antithesis, Synthesis)",
    categoryId: "reasoning",
    description: "Resolves systemic paradoxes by formulating a strong Thesis, an uncompromising Antithesis, and an overarching higher-order Synthesis.",
    tags: ["reasoning","dialectics","hegel","synthesis","paradox-resolution"],
    transform: createStandardSkillTransform({
      sectionName: "Hegelian Dialectical Synthesis Protocol",
      ruSectionName: "Гегелевская диалектическая триада (Тезис, Антитезис, Синтез)",
      instructions: [
        "Thesis: Formulate the primary proposition with its strongest empirical justifications and structural advantages.",
        "Antithesis: Formulate the direct counter-proposition, exposing fundamental flaws and conflicting real-world constraints.",
        "Synthesis: Create a higher-order paradigm that transcends the apparent contradiction, preserving the core virtues of both while eliminating their mutual conflicts.",
      ],
      ruInstructions: [
        "Тезис: Изложите исходное утверждение с максимальной аргументацией и обоснованием сильных сторон.",
        "Антитезис: Сформулируйте встречное отрицание, вскрывающее фатальные изъяны и противоречия тезиса.",
        "Синтез: Поднимитесь на уровень надсистемы, объединив достоинства обеих сторон и сняв противоречие.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","dialectics","hegel","synthesis","paradox-resolution"],
    }),
  },

  "reductio-ad-absurdum-proof": {
    id: "reductio-ad-absurdum-proof",
    name: "ReductioAdAbsurdumProofSkill",
    displayName: "Reductio ad Absurdum Logical Refutation",
    categoryId: "reasoning",
    description: "Disproves flawed assertions by assuming them to be true and rigorously demonstrating that they inevitably lead to a glaring contradiction.",
    tags: ["reasoning","reductio-ad-absurdum","logic","refutation","proof"],
    transform: createStandardSkillTransform({
      sectionName: "Reductio ad Absurdum Refutation Architecture",
      ruSectionName: "Доказательство от противного (Reductio ad Absurdum)",
      instructions: [
        "Assume the challenged assertion or architecture is 100% correct, valid, and universally applied.",
        "Trace the logical, mathematical, and systemic consequences of that assumption across boundary conditions.",
        "Demonstrate that this trajectory produces an impossible contradiction, physical violation, or catastrophic systemic absurdity.",
        "Conclude that the original assumption is definitively disproven.",
      ],
      ruInstructions: [
        "Допустите, что оспариваемое утверждение или архитектурный выбор на 100% верны.",
        "Логически и математически разверните последствия этого допущения на граничных условиях системы.",
        "Продемонстрируйте, как цепочка выводов приводит к вопиющему противоречию или системному абсурду.",
        "Сделайте математически строгий вывод о ложности исходной предпосылки.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","reductio-ad-absurdum","logic","refutation","proof"],
    }),
  },

  "abductive-inference-best-explanation": {
    id: "abductive-inference-best-explanation",
    name: "AbductiveInferenceBestExplanationSkill",
    displayName: "Abductive Inference (Inference to Best Explanation)",
    categoryId: "reasoning",
    description: "Diagnoses anomalies by generating plausible explanatory hypotheses, scoring explanatory scope, and selecting the most parsimonious cause.",
    tags: ["reasoning","abduction","inference","diagnostics","root-cause"],
    transform: createStandardSkillTransform({
      sectionName: "Abductive Inference to Best Explanation",
      ruSectionName: "Абдуктивный вывод к наилучшему объяснению (Abduction)",
      instructions: [
        "Document all surprising anomalous facts and system symptoms with high empirical precision.",
        "Generate an exhaustive candidate set of explanatory hypotheses that could account for the observed anomalies.",
        "Score each candidate on Explanatory Scope (how many anomalies it explains) and Parsimony (absence of convoluted auxiliary assumptions).",
        "Select the candidate providing the cleanest, most comprehensive causal explanation.",
      ],
      ruInstructions: [
        "Зафиксируйте все наблюдаемые аномалии и симптомы с высокой фактологической точностью.",
        "Сформируйте пул гипотез-кандидатов, способных объяснить наблюдаемые отклонения.",
        "Оцените каждую гипотезу по широте охвата фактов и простоте (отсутствию надуманных допущений).",
        "Выберите гипотезу, дающую наиболее стройное и всеобъемлющее причинное объяснение.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","abduction","inference","diagnostics","root-cause"],
    }),
  },

  "counterfactual-simulation-what-if": {
    id: "counterfactual-simulation-what-if",
    name: "CounterfactualSimulationWhatIfSkill",
    displayName: "Counterfactual Causality & \"What If\" Simulation",
    categoryId: "reasoning",
    description: "Tests causal mechanisms by altering a single historical variable and simulating the divergent alternate timeline.",
    tags: ["reasoning","counterfactual","simulation","causality","what-if"],
    transform: createStandardSkillTransform({
      sectionName: "Counterfactual Causal Simulation Protocol",
      ruSectionName: "Контрфактическое моделирование причинности (What-If)",
      instructions: [
        "Isolate the target variable or event under investigation.",
        "Construct a counterfactual state where that variable was inverted or held at baseline while holding all other initial conditions fixed.",
        "Step through the causal graph to observe whether the terminal outcome changes.",
        "Verify whether the target variable was a necessary cause, sufficient cause, or merely a correlated bystander.",
      ],
      ruInstructions: [
        "Изолируйте ключевую исследуемую переменную или решение в истории инцидента.",
        "Смоделируйте альтернативную ветку реальности, где это событие не произошло, зафиксировав остальные условия.",
        "Проследите причинный граф: изменился ли итоговый исход системы в альтернативном сценарии.",
        "Установите статус переменной: являлась ли она необходимой причиной, достаточной или лишь сопутствующим фоном.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","counterfactual","simulation","causality","what-if"],
    }),
  },

  "analogical-structural-mapping": {
    id: "analogical-structural-mapping",
    name: "AnalogicalStructuralMappingSkill",
    displayName: "Structure-Mapping Analogical Reasoning",
    categoryId: "reasoning",
    description: "Transfers battle-tested solutions from distant mature domains by aligning relational structures rather than surface features.",
    tags: ["reasoning","analogies","structure-mapping","cross-domain","innovation"],
    transform: createStandardSkillTransform({
      sectionName: "Relational Structure-Mapping Architecture",
      ruSectionName: "Структурное картирование аналогий (Structure-Mapping)",
      instructions: [
        "Extract the deep relational network of the current problem (e.g. producer-consumer imbalance, thermal throttling) ignoring domain terminology.",
        "Identify a distant, mature discipline (e.g. aerospace avionics, biological immune systems, traffic flow) with an isomorphic relational structure.",
        "Map the mature domain's proven solution mechanisms back to the target technical problem.",
        "Stress-test the boundary limits of the analogy to prevent false mapping breakdowns.",
      ],
      ruInstructions: [
        "Извлеките глубинную реляционную структуру проблемы (переполнение буфера, перегрев), отбросив термины текущей предметной области.",
        "Найдите зрелую внешнюю дисциплину (авиация, иммунология, гидродинамика) с изоморфной структурой взаимодействий.",
        "Перенесите отработанные инженерные решения из внешней области на текущую задачу.",
        "Проверьте пределы применимости аналогии, выделив зоны, где сходство перестает работать.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","analogies","structure-mapping","cross-domain","innovation"],
    }),
  },

  "bayesian-belief-updating-loop": {
    id: "bayesian-belief-updating-loop",
    name: "BayesianBeliefUpdatingLoopSkill",
    displayName: "Bayesian Evidence Likelihood Updating Loop",
    categoryId: "reasoning",
    description: "Updates probability estimates dynamically: establishes prior odds, calculates likelihood ratios, and derives posterior probabilities.",
    tags: ["reasoning","bayesian","probability","likelihood-ratio","updating"],
    transform: createStandardSkillTransform({
      sectionName: "Bayesian Likelihood Updating Protocol",
      ruSectionName: "Байесовский цикл обновления вероятностей",
      instructions: [
        "Establish explicit Prior Probability P(H) based on historical base rates.",
        "Evaluate incoming evidence: compute Likelihood Ratio P(E|H) / P(E|not-H).",
        "Calculate Posterior Probability P(H|E) using Bayes' rule: Posterior Odds = Prior Odds x Likelihood Ratio.",
        "Adjust behavioral thresholds only when posterior shifts across predetermined decision gates.",
      ],
      ruInstructions: [
        "Задайте априорную вероятность P(H) на основе объективных базовых частот.",
        "Оцените поступившее свидетельство: вычислите отношение правдоподобия P(E|H) / P(E|не-H).",
        "Рассчитайте апостериорную вероятность P(H|E) по формуле Байеса.",
        "Принимайте решение о действии только при преодолении апостериорной вероятностью целевого порога.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","bayesian","probability","likelihood-ratio","updating"],
    }),
  },

  "deductive-syllogism-validator": {
    id: "deductive-syllogism-validator",
    name: "DeductiveSyllogismValidatorSkill",
    displayName: "Formal Deductive Syllogism Validation",
    categoryId: "reasoning",
    description: "Audits deductive arguments for formal validity: Major Premise, Minor Premise, and Non-Sequitur elimination.",
    tags: ["reasoning","deduction","syllogism","formal-logic","soundness"],
    transform: createStandardSkillTransform({
      sectionName: "Formal Deductive Syllogism Audit",
      ruSectionName: "Валидация дедуктивных силлогизмов и проверка логической строгости",
      instructions: [
        "Deconstruct the argument into Major Premise (universal rule), Minor Premise (specific instance), and Conclusion.",
        "Verify Logical Validity: does the conclusion follow inevitably from the premises as a matter of pure logical form?",
        "Verify Soundness: are both the major and minor premises empirically true in the real world?",
        "Flag and eliminate formal fallacies (affirming the consequent, denying the antecedent, undistributed middle).",
      ],
      ruInstructions: [
        "Декомпозируйте аргумент на большую посылку (общее правило), малую посылку (частный факт) и вывод.",
        "Проверьте логическую валидность: следует ли вывод неизбежно из структуры посылок.",
        "Проверьте истинность посылок (Soundness): соответствуют ли обе посылки объективной реальности.",
        "Отсекайте формальные логические ошибки (подтверждение консеквента, отрицание антецедента).",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","deduction","syllogism","formal-logic","soundness"],
    }),
  },

  "inductive-generalization-guard": {
    id: "inductive-generalization-guard",
    name: "InductiveGeneralizationGuardSkill",
    displayName: "Inductive Sample Bias & Generalization Guard",
    categoryId: "reasoning",
    description: "Guards against hasty inductive generalizations from small, skewed, or unrepresentative sample sizes.",
    tags: ["reasoning","induction","sample-bias","generalization","statistics"],
    transform: createStandardSkillTransform({
      sectionName: "Inductive Generalization Safeguards",
      ruSectionName: "Защита от поспешных индуктивных обобщений",
      instructions: [
        "Evaluate whether observed patterns reflect statistically adequate sample sizes or anecdotal noise.",
        "Check for sampling bias: did the observed data originate from a self-selected, survivorship-filtered, or non-representative subgroup?",
        "Prohibit universalizing claims (\"All users prefer X\", \"PostgreSQL always outperforms Y\") without randomized representative testing.",
      ],
      ruInstructions: [
        "Оценивайте, отражает ли наблюдаемый паттерн статистически достаточную выборку или является шумом.",
        "Проверяйте смещение выборки: не получены ли данные от специфической, самоотобранной группы пользователей.",
        "Запрещайте абсолютные обобщения («все клиенты хотят X», «PostgreSQL всегда быстрее Y») без рандомизированных тестов.",
      ],
      semanticType: "constraints",
      tags: ["reasoning","induction","sample-bias","generalization","statistics"],
    }),
  },

  "fermi-estimation-dimensional-breakdown": {
    id: "fermi-estimation-dimensional-breakdown",
    name: "FermiEstimationDimensionalBreakdownSkill",
    displayName: "Fermi Estimation & Order-of-Magnitude Bounds",
    categoryId: "reasoning",
    description: "Estimates unknown quantities within 1 order of magnitude by dimensional decomposition and geometric mean bounds.",
    tags: ["reasoning","fermi-estimation","order-of-magnitude","dimensional-analysis","heuristics"],
    transform: createStandardSkillTransform({
      sectionName: "Fermi Order-of-Magnitude Estimation Protocol",
      ruSectionName: "Оценка порядка величины по методу Ферми (Fermi Estimation)",
      instructions: [
        "Deconstruct an unknown target metric into a chain of 4-6 estimable dimensionally consistent sub-factors.",
        "Assign lower-bound (10th percentile) and upper-bound (90th percentile) estimates to each factor.",
        "Compute the geometric mean of the combined sub-factors to produce an order-of-magnitude projection.",
        "Cross-check the estimated result against physical and economic upper ceilings to ensure sanity.",
      ],
      ruInstructions: [
        "Разложите неизвестную величину на цепочку из 4–6 оцениваемых подфакторов с согласованными размерностями.",
        "Задайте консервативную нижнюю (10%) и верхнюю (90%) границы для каждого подфактора.",
        "Рассчитайте среднее геометрическое произведения факторов для получения оценки порядка величины.",
        "Сопоставьте результат с физическими и макроэкономическими потолками здравого смысла.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","fermi-estimation","order-of-magnitude","dimensional-analysis","heuristics"],
    }),
  },

  "toulmin-argumentation-model": {
    id: "toulmin-argumentation-model",
    name: "ToulminArgumentationModelSkill",
    displayName: "Toulmin Argumentation Model (Claim, Data, Warrant, Rebuttal)",
    categoryId: "reasoning",
    description: "Structures bulletproof arguments across 6 Toulmin components: Claim, Data, Warrant, Backing, Qualifier, and Rebuttal.",
    tags: ["reasoning","toulmin","argumentation","logic","persuasion"],
    transform: createStandardSkillTransform({
      sectionName: "Toulmin Argumentation Architecture",
      ruSectionName: "Модель аргументации Тулмина (Claim, Data, Warrant, Rebuttal)",
      instructions: [
        "Claim: Explicitly state the thesis or recommendation.",
        "Data / Grounds: Provide verified empirical evidence supporting the claim.",
        "Warrant & Backing: Explain the underlying logical rule connecting the data to the claim, backed by authoritative principles.",
        "Qualifier & Rebuttal: State degree of certainty (e.g. \"presumably\", \"under condition X\") and address explicit conditions that invalidate the claim.",
      ],
      ruInstructions: [
        "Тезис (Claim): Сформулируйте четкое и недвусмысленное предложение или вывод.",
        "Данные (Data): Приведите проверенные фактические доказательства в поддержку тезиса.",
        "Основание и поддержка (Warrant & Backing): Изложите логический закон, связывающий данные с тезисом, и его авторитетное обоснование.",
        "Квалификатор и оговорка (Qualifier & Rebuttal): Задайте степень уверенности и явно укажите условия, при которых аргумент теряет силу.",
      ],
      semanticType: "structural_directive",
      tags: ["reasoning","toulmin","argumentation","logic","persuasion"],
    }),
  },

  "root-cause-ishikawa-fishbone": {
    id: "root-cause-ishikawa-fishbone",
    name: "RootCauseIshikawaFishboneSkill",
    displayName: "Ishikawa Fishbone Root-Cause Diagramming",
    categoryId: "reasoning",
    description: "Categorizes systemic failure modes across 6 standard branches: Machine, Method, Material, Manpower, Measurement, Environment.",
    tags: ["reasoning","ishikawa","fishbone","root-cause","quality-engineering"],
    transform: createStandardSkillTransform({
      sectionName: "Ishikawa Fishbone Diagnostic Architecture",
      ruSectionName: "Причинно-следственная диаграмма Исикавы (Fishbone Diagram)",
      instructions: [
        "Place the central failure symptom at the head of the diagram.",
        "Branch analysis across the 6 Ms: Machine (hardware/cloud), Method (processes/CI/CD), Material (data/dependencies), Manpower (training/fatigue), Measurement (metrics/alerts), and Milieu (environment/network).",
        "Drill down 2 levels deep into each branch to isolate contributing latent factors.",
        "Highlight intersectional vulnerabilities where multiple branches compound into catastrophic failure.",
      ],
      ruInstructions: [
        "Поместите главный сбой системы в «голову» диаграммы.",
        "Распределите причины по 6 веткам: Машины (серверы/облако), Методы (процессы/деплой), Материалы (данные/библиотеки), Люди (усталость/компетенции), Измерения (метрики/алерты), Окружение (сеть/нагрузка).",
        "Углубитесь минимум на 2 уровня детализации внутри каждой ветви.",
        "Выделите перекрестные уязвимости, где наложение факторов разных веток привело к сбою.",
      ],
      semanticType: "structural_directive",
      tags: ["reasoning","ishikawa","fishbone","root-cause","quality-engineering"],
    }),
  },

  "game-theory-nash-equilibrium-model": {
    id: "game-theory-nash-equilibrium-model",
    name: "GameTheoryNashEquilibriumModelSkill",
    displayName: "Game-Theoretic Nash Equilibrium Payoff Matrix",
    categoryId: "reasoning",
    description: "Models multi-agent strategic dynamics: builds payoff matrices, identifies dominant strategies, and finds stable Nash equilibria.",
    tags: ["reasoning","game-theory","nash-equilibrium","incentives","strategy"],
    transform: createStandardSkillTransform({
      sectionName: "Game-Theoretic Payoff & Equilibrium Protocol",
      ruSectionName: "Теоретико-игровая матрица выигрышей и равновесие Нэша",
      instructions: [
        "Construct a 2x2 or NxN payoff matrix explicitly defining all players, discrete action sets, and utility scores.",
        "Identify strictly dominant and weakly dominant strategies for each participant.",
        "Solve for Nash Equilibria: determine states where no player can unilaterally deviate to improve their individual payoff.",
        "Analyze whether the equilibrium represents a Pareto-optimal social outcome or a Prisoner's Dilemma trap.",
      ],
      ruInstructions: [
        "Постройте матрицу выигрышей с указанием игроков, доступных стратегий и числовых оценок полезности.",
        "Определите доминантные стратегии для каждого участника взаимодействия.",
        "Найдите равновесие по Нэшу — состояние, при котором ни один игрок не может в одностороннем порядке улучшить свое положение.",
        "Проверьте, является ли найденное равновесие Парето-оптимальным или ловушкой типа «дилеммы заключенного».",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","game-theory","nash-equilibrium","incentives","strategy"],
    }),
  },

  "first-principles-physics-breakdown": {
    id: "first-principles-physics-breakdown",
    name: "FirstPrinciplesPhysicsBreakdownSkill",
    displayName: "Axiomatic First-Principles Physics Decomposition",
    categoryId: "reasoning",
    description: "Deconstructs problems down to undeniable physical, thermodynamic, and mathematical constants, reconstructing novel solutions from scratch.",
    tags: ["reasoning","first-principles","physics","axioms","innovation"],
    transform: createStandardSkillTransform({
      sectionName: "Axiomatic First-Principles Protocol",
      ruSectionName: "Декомпозиция на фундаментальные физические принципы",
      instructions: [
        "Strip away all analogies, incumbent vendor architectures, and \"industry standard practice\" claims.",
        "Deconstruct the problem down to fundamental physical constants: conservation of energy, latency limits (speed of light in fiber), memory bandwidth, and raw component cost.",
        "Rebuild the architecture upward strictly from those irreducible physical truths.",
        "Highlight where conventional industry architectures introduce artificial 10x inefficiency markups.",
      ],
      ruInstructions: [
        "Отбросьте аналогии, устоявшиеся шаблоны вендоров и догмы «так принято в индустрии».",
        "Разложите проблему на базовые физические инварианты: предел скорости света в оптоволокне, пропускная способность шины памяти, сырьевая себестоимость.",
        "Соберите решение снизу вверх, опираясь строго на фундаментальные законы природы.",
        "Покажите, где стандартные решения индустрии создают многократные искусственные накладные расходы.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","first-principles","physics","axioms","innovation"],
    }),
  },

  "trilemma-cap-theorem-tradeoff-solver": {
    id: "trilemma-cap-theorem-tradeoff-solver",
    name: "TrilemmaCapTheoremTradeoffSolverSkill",
    displayName: "Trilemma & Impossible Trinity Trade-Off Resolution",
    categoryId: "reasoning",
    description: "Navigates fundamental trilemmas (CAP theorem, Blockchain trilemma, Project Management iron triangle) by explicitly sacrificing one dimension.",
    tags: ["reasoning","trilemma","cap-theorem","trade-offs","architecture"],
    transform: createStandardSkillTransform({
      sectionName: "Trilemma Structural Trade-Off Protocol",
      ruSectionName: "Разрешение трилемм и несовместимых троек (CAP / Iron Triangle)",
      instructions: [
        "Identify the fundamental trilemma: Consistency vs Availability vs Partition Tolerance (CAP), or Fast vs Cheap vs Good.",
        "Explicitly reject naive claims that all three dimensions can be simultaneously maximized.",
        "Make a conscious, mathematically justified sacrifice of one dimension based on core operational SLA priorities.",
        "Document fallback degraded states during partition or resource-starvation events.",
      ],
      ruInstructions: [
        "Зафиксируйте базовую трилемму системы: CAP (согласованность, доступность, устойчивость к разделению) или Быстро/Дешево/Качественно.",
        "Отклоняйте наивные попытки заявить одновременную максимизацию всех трех взаимоисключающих полюсов.",
        "Сделайте осознанный инженерный выбор, каким из параметров система жертвует ради приоритетных SLA.",
        "Опишите работу системы в режиме деградации при сетевом разделении или дефиците ресурсов.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","trilemma","cap-theorem","trade-offs","architecture"],
    }),
  },

  "inductive-risk-hempel-rudner": {
    id: "inductive-risk-hempel-rudner",
    name: "InductiveRiskHempelRudnerSkill",
    displayName: "Inductive Risk & Non-Epistemic Value Calibration",
    categoryId: "reasoning",
    description: "Calibrates evidential thresholds based on the ethical and financial consequences of Type I (false positive) vs Type II (false negative) errors.",
    tags: ["reasoning","inductive-risk","values","error-calibration","ethics"],
    transform: createStandardSkillTransform({
      sectionName: "Inductive Risk & Error Asymmetry Calibration",
      ruSectionName: "Калибровка индуктивного риска (ошибки I vs II рода)",
      instructions: [
        "Compare the real-world blast radius of False Positives (Type I: false alarm, unnecessary shutdown) vs False Negatives (Type II: missed intrusion, undetected defect).",
        "Calibrate evidential threshold: demand higher statistical confidence (alpha = 0.001) when False Positives carry catastrophic cost.",
        "Explicitly articulate the non-epistemic business and safety values governing the selected decision threshold.",
      ],
      ruInstructions: [
        "Сопоставьте цену ошибки I рода (ложная тревога, ненужная остановка) и ошибки II рода (пропущенный взлом, нераспознанный дефект).",
        "Отрегулируйте порог принятия решения: требуйте сверхвысокой строгости данных, если ложное срабатывание несет катастрофический ущерб.",
        "Открыто декларируйте бизнес-приоритеты и ценности безопасности, обусловившие выбранный уровень строгости.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","inductive-risk","values","error-calibration","ethics"],
    }),
  },

  "morphological-analysis-zwicky-box": {
    id: "morphological-analysis-zwicky-box",
    name: "MorphologicalAnalysisZwickyBoxSkill",
    displayName: "Fritz Zwicky Morphological Box Combinatorics",
    categoryId: "reasoning",
    description: "Explores multi-dimensional solution spaces by decomposing parameters into exhaustive matrices and evaluating novel combinatorial paths.",
    tags: ["reasoning","morphological-analysis","zwicky","combinatorics","design-space"],
    transform: createStandardSkillTransform({
      sectionName: "Zwicky Morphological Box Architecture",
      ruSectionName: "Морфологический анализ по ящику Цвикки (Morphological Box)",
      instructions: [
        "Identify 4-6 essential orthogonal dimensions of the problem (e.g. Storage, Ingestion Protocol, Consensus, Cache Invalidation).",
        "List 3-5 distinct technological options for each dimension in a multidimensional matrix.",
        "Systematically construct combinatorial configurations, specifically evaluating unconventional pairings rejected by standard convention.",
        "Filter out mutually incompatible combinations to reveal breakthrough viable configurations.",
      ],
      ruInstructions: [
        "Выделите 4–6 ортогональных параметров задачи (хранилище, протокол ingestion, алгоритм консенсуса, инвалидация кэша).",
        "Заполните матрицу 3–5 альтернативными технологическими вариантами по каждому параметру.",
        "Системно синтезируйте комбинации вариантов, особое внимание уделяя нестандартным сочетаниям.",
        "Отсейте физически несовместимые связки, выявив прорывные жизнеспособные конфигурации.",
      ],
      semanticType: "structural_directive",
      tags: ["reasoning","morphological-analysis","zwicky","combinatorics","design-space"],
    }),
  },

  "causal-loop-diagramming-feedback-delays": {
    id: "causal-loop-diagramming-feedback-delays",
    name: "CausalLoopDiagrammingFeedbackDelaysSkill",
    displayName: "Causal Loop Diagramming (CLD) & System Dynamics",
    categoryId: "reasoning",
    description: "Maps reinforcing (R) and balancing (B) feedback loops with explicit delay markers to expose systemic oscillation traps.",
    tags: ["reasoning","cld","system-dynamics","feedback-loops","oscillation"],
    transform: createStandardSkillTransform({
      sectionName: "Causal Loop Diagramming & System Dynamics",
      ruSectionName: "Диаграммы причинных циклов и системная динамика (CLD)",
      instructions: [
        "Map system variables with directed causal arrows labeled with polarity (+ for same direction, - for opposite direction).",
        "Identify Reinforcing loops (R, exponential growth/collapse) and Balancing loops (B, goal-seeking stability).",
        "Mark explicit temporal delays (|| symbol); explain how unaddressed delays cause violent system oscillation and over-correction.",
        "Locate high-leverage policy intervention points that flip reinforcing doom loops into virtuous cycles.",
      ],
      ruInstructions: [
        "Соединяйте переменные системы направленными стрелками с указанием знака влияния (+ прямое, - обратное).",
        "Маркируйте усиливающие петли (R, экспоненциальный рост/спад) и балансирующие (B, стабилизация к цели).",
        "Обозначайте временные задержки (символ ||); показывайте, как неучтенные задержки вызывают разрушительные автоколебания системы.",
        "Находите точки максимального рычага, превращающие порочные круги деградации в циклы развития.",
      ],
      semanticType: "structural_directive",
      tags: ["reasoning","cld","system-dynamics","feedback-loops","oscillation"],
    }),
  },

  "pareto-frontier-multi-objective-optimization": {
    id: "pareto-frontier-multi-objective-optimization",
    name: "ParetoFrontierMultiObjectiveOptimizationSkill",
    displayName: "Pareto Frontier Multi-Objective Optimization",
    categoryId: "reasoning",
    description: "Solves conflicting multi-criteria tradeoffs by plotting non-dominated Pareto frontiers where no metric improves without degrading another.",
    tags: ["reasoning","pareto-frontier","multi-objective","trade-offs","optimization"],
    transform: createStandardSkillTransform({
      sectionName: "Pareto Frontier Multi-Objective Optimization",
      ruSectionName: "Оптимизация границы Парето для многокритериальных задач",
      instructions: [
        "Define the conflicting objective functions (e.g. latency vs consistency vs cost) explicitly.",
        "Plot candidate architectures along the multi-dimensional parameter space.",
        "Isolate the non-dominated Pareto frontier: discard all strictly dominated sub-optimal candidates.",
        "Guide stakeholder trade-off choices exclusively among verified points on the Pareto frontier.",
      ],
      ruInstructions: [
        "Явно определите конфликтующие целевые функции (задержка vs согласованность vs бюджет).",
        "Разместите альтернативные архитектурные варианты в многомерном пространстве критериев.",
        "Выделите множество Парето: отсейте все варианты, уступающие другим по всем показателям одновременно.",
        "Предлагайте выбор только между точками истинной границы Парето с понятной ценой каждого компромисса.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","pareto-frontier","multi-objective","trade-offs","optimization"],
    }),
  },

  "feynman-algorithm-breakdown": {
    id: "feynman-algorithm-breakdown",
    name: "FeynmanAlgorithmBreakdownSkill",
    displayName: "Feynman Problem-Solving Algorithm & Black-Box Dissection",
    categoryId: "reasoning",
    description: "Applies Feynman's approach: 1) Write down the problem, 2) Think very hard, 3) Write down the solution — grounded in total conceptual clarity.",
    tags: ["reasoning","feynman","clarity","problem-solving","first-principles"],
    transform: createStandardSkillTransform({
      sectionName: "Feynman Conceptual Dissection Protocol",
      ruSectionName: "Алгоритм решения задач Фейнмана (предельная ясность сути)",
      instructions: [
        "State the precise problem in simple, jargon-free language that a bright 12-year-old would comprehend.",
        "Decompose the black box into mechanical sub-steps, identifying the exact sub-step where understanding breaks down.",
        "Construct a clean, physical or visual analogy representing the core mechanism without obfuscating mathematics.",
      ],
      ruInstructions: [
        "Сформулируйте суть проблемы простыми словами без академического и корпоративного жаргона.",
        "Декомпозируйте «черный ящик» на шаги, точно локализовав точку, где теряется ясность механизма.",
        "Создайте наглядную механическую или физическую аналогию, объясняющую работу системы без заумных абстракций.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","feynman","clarity","problem-solving","first-principles"],
    }),
  },

  "sorites-paradox-boundary-hardening": {
    id: "sorites-paradox-boundary-hardening",
    name: "SoritesParadoxBoundaryHardeningSkill",
    displayName: "Sorites Paradox & Vagueness Boundary Hardening",
    categoryId: "reasoning",
    description: "Hardens fuzzy, continuous boundaries against Sorites paradoxes (heap of sand dilemma) via discrete mathematical thresholds.",
    tags: ["reasoning","sorites-paradox","boundaries","precision","thresholds"],
    transform: createStandardSkillTransform({
      sectionName: "Sorites Boundary Hardening Protocol",
      ruSectionName: "Устранение парадокса кучи (Sorites Paradox) и фиксация порогов",
      instructions: [
        "Detect vague continuum terms (e.g. \"large payload\", \"active user\", \"stale cache\") susceptible to boundary drift.",
        "Replace qualitative fuzziness with mathematically hard boundary predicates (e.g. `payload > 10_485_760 bytes`).",
        "Implement hysteresis bands around thresholds to prevent high-frequency state flapping.",
      ],
      ruInstructions: [
        "Выявляйте размытые качественные понятия («большой запрос», «активный юзер», «устаревший кэш»).",
        "Заменяйте нечеткие формулировки строгими числовыми предикатами (например, `payload > 10 МБ`).",
        "Внедряйте зоны гистерезиса вокруг порогов для предотвращения дребезга переключения состояний.",
      ],
      semanticType: "constraints",
      tags: ["reasoning","sorites-paradox","boundaries","precision","thresholds"],
    }),
  },

  "burden-of-proof-hitchens-razor": {
    id: "burden-of-proof-hitchens-razor",
    name: "BurdenOfProofHitchensRazorSkill",
    displayName: "Hitchens's Razor & Burden of Proof Protocol",
    categoryId: "reasoning",
    description: "Enforces: \"What can be asserted without evidence can also be dismissed without evidence\", placing proof burden on claimant.",
    tags: ["reasoning","hitchens-razor","burden-of-proof","epistemology","skepticism"],
    transform: createStandardSkillTransform({
      sectionName: "Burden of Proof & Hitchens's Razor Protocol",
      ruSectionName: "Бритва Хитченса и распределение бремени доказательства",
      instructions: [
        "Place the burden of proof strictly upon the entity asserting a claim, vulnerability, or feature necessity.",
        "Dismiss speculative claims lacking empirical traces or reproducible test benchmarks without wasting engineering cycles.",
        "Mandate that any security or performance assertion present executable reproduction scripts.",
      ],
      ruInstructions: [
        "Возлагайте бремя доказательства строго на сторону, заявляющую о наличии проблемы, угрозы или необходимости фичи.",
        "Безжалостно отклоняйте голословные гипотезы без воспроизводимых тестов или фактов, экономя время команды.",
        "Требуйте минимальный воспроизводимый скрипт (repro) для любого заявления о баге или деградации скорости.",
      ],
      semanticType: "constraints",
      tags: ["reasoning","hitchens-razor","burden-of-proof","epistemology","skepticism"],
    }),
  },

  "hume-guillotine-is-ought-separator": {
    id: "hume-guillotine-is-ought-separator",
    name: "HumeGuillotineIsOughtSeparatorSkill",
    displayName: "Hume's Guillotine (Is-Ought Gap Separation)",
    categoryId: "reasoning",
    description: "Strictly separates empirical factual description (\"what is\") from prescriptive normative policies (\"what ought to be\").",
    tags: ["reasoning","hume-guillotine","is-ought","ethics","policy"],
    transform: createStandardSkillTransform({
      sectionName: "Humean Fact/Normative Policy Separation",
      ruSectionName: "Гильотина Юма: строгое разделение фактов и предписаний",
      instructions: [
        "Strictly decouple factual empirical observations (\"CPU is at 95%\") from value judgments (\"we must scale up\").",
        "Explicitly surface the hidden normative business premise connecting observed facts to recommended actions.",
        "Verify that technical recommendations acknowledge underlying organizational value trade-offs.",
      ],
      ruInstructions: [
        "Четко разделяйте констатацию объективных фактов («CPU загружен на 95%») и ценностные предписания («надо масштабировать»).",
        "Вскрывайте скрытые нормативные предпосылки бизнеса, связывающие наблюдение с предлагаемым действием.",
        "Следите, чтобы технические предложения явно учитывали приоритеты и ограничения стоимости компании.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","hume-guillotine","is-ought","ethics","policy"],
    }),
  },

  "gricean-maxims-cooperative-principle": {
    id: "gricean-maxims-cooperative-principle",
    name: "GriceanMaximsCooperativePrincipleSkill",
    displayName: "Gricean Maxims of Conversational Cooperation",
    categoryId: "reasoning",
    description: "Governs communication via Paul Grice's 4 Maxims: Quantity (informative as required), Quality (truthful), Relation (relevant), Manner (clear).",
    tags: ["reasoning","gricean-maxims","linguistics","cooperation","communication"],
    transform: createStandardSkillTransform({
      sectionName: "Gricean Conversational Maxims Architecture",
      ruSectionName: "Максимы Грайса: правила кооперативного общения",
      instructions: [
        "Maxim of Quantity: Provide exactly as much information as required for task execution; neither less nor more.",
        "Maxim of Quality: State only what has empirical backing; never assert falsehoods or unsubstantiated speculation.",
        "Maxim of Relation: Ensure every sentence directly contributes to resolving the active objective.",
        "Maxim of Manner: Avoid obscurity, ambiguity, and wordiness; maintain orderly and concise discourse.",
      ],
      ruInstructions: [
        "Максима количества: Давайте ровно столько информации, сколько нужно для решения задачи; ни больше, ни меньше.",
        "Максима качества: Утверждайте только то, что проверено; исключайте ложные и недоказанные догадки.",
        "Максима релевантности: Каждая мысль должна прямо служить решению поставленной задачи.",
        "Максима манеры: Избегайте двусмысленности, путаницы и многословия; излагайте упорядоченно и ясно.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","gricean-maxims","linguistics","cooperation","communication"],
    }),
  },

  "moores-paradox-doxastic-coherence": {
    id: "moores-paradox-doxastic-coherence",
    name: "MooresParadoxDoxasticCoherenceSkill",
    displayName: "Moore's Paradox & Doxastic Coherence Guard",
    categoryId: "reasoning",
    description: "Eliminates absurd self-contradictory belief states of the form: \"It is raining, but I do not believe it is raining\".",
    tags: ["reasoning","moores-paradox","epistemic-logic","coherence","consistency"],
    transform: createStandardSkillTransform({
      sectionName: "Doxastic Consistency & Epistemic Coherence",
      ruSectionName: "Парадокс Мура и проверка доксатической согласованности",
      instructions: [
        "Scan generated outputs for cognitive dissonance where an assertion is made alongside an explicit denial of belief in it.",
        "Align recommendations with stated analytical conclusions: never output a diagnosis followed by an incompatible prescription.",
        "Enforce epistemic harmony across all emitted assertions and system state evaluations.",
      ],
      ruInstructions: [
        "Сканируйте текст на когнитивный диссонанс, когда факт утверждается, но одновременно ставится под сомнение вера в него.",
        "Синхронизируйте рекомендации с диагнозом: недопустимо выдать анализ сбоя и предложить несовместимое с ним лечение.",
        "Обеспечивайте логическую непротиворечивость между выводами и практическими шагами.",
      ],
      semanticType: "constraints",
      tags: ["reasoning","moores-paradox","epistemic-logic","coherence","consistency"],
    }),
  },

  "quine-web-of-belief-recalibration": {
    id: "quine-web-of-belief-recalibration",
    name: "QuineWebOfBeliefRecalibrationSkill",
    displayName: "Quinean Web of Belief Structural Recalibration",
    categoryId: "reasoning",
    description: "Models knowledge as an interconnected web: adjusts peripheral empirical beliefs before disturbing core mathematical/logical axioms.",
    tags: ["reasoning","quine","web-of-belief","epistemology","holism"],
    transform: createStandardSkillTransform({
      sectionName: "Quinean Web of Belief Adjustment Architecture",
      ruSectionName: "Паутина убеждений Куайна: иерархическая рекалибровка",
      instructions: [
        "When new recalcitrant evidence contradicts system models, first adjust peripheral observational nodes.",
        "Preserve the core logical and mathematical axioms of the system unless external evidence is overwhelmingly disruptive.",
        "Map the ripple effects across connected beliefs when a major architectural assumption is revised.",
      ],
      ruInstructions: [
        "При появлении противоречащих фактов в первую очередь корректируйте периферийные предположения.",
        "Оберегайте центральные аксиомы системы от хаотичных пересмотров, пока периферийные гипотезы жизнеспособны.",
        "Прослеживайте каскадные изменения в зависимых подсистемах при фундаментальном изменении архитектуры.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","quine","web-of-belief","epistemology","holism"],
    }),
  },

  "kahneman-system1-vs-system2-auditor": {
    id: "kahneman-system1-vs-system2-auditor",
    name: "KahnemanSystem1VsSystem2AuditorSkill",
    displayName: "System 1 Heuristic Override & System 2 Deliberation",
    categoryId: "reasoning",
    description: "Identifies impulsive System 1 associative pattern matching and triggers slow, deliberate System 2 logical recalculation.",
    tags: ["reasoning","kahneman","system1-system2","deliberation","cognitive-control"],
    transform: createStandardSkillTransform({
      sectionName: "System 2 Deliberative Override Architecture",
      ruSectionName: "Переопределение интуиции Системы 1 анализом Системы 2 (Канеман)",
      instructions: [
        "Detect when an initial intuitive answer is triggered by superficial pattern recognition or lexical similarity.",
        "Engage explicit System 2 deliberation: write down intermediate computational steps, variables, and edge-case exceptions.",
        "Verify calculations step-by-step to prevent seductive intuitive traps (e.g. bat-and-ball problem).",
      ],
      ruInstructions: [
        "Распознавайте моменты, когда ответ формируется поверхностной ассоциативной интуицией (Система 1).",
        "Принудительно включайте медленное аналитическое рассуждение (Система 2) с записью промежуточных вычислений.",
        "Пошагово пересчитывайте результат, нейтрализуя обманчиво очевидные ментальные ловушки.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","kahneman","system1-system2","deliberation","cognitive-control"],
    }),
  },

  "trilemma-munchhausen-epistemic-grounding": {
    id: "trilemma-munchhausen-epistemic-grounding",
    name: "TrilemmaMunchhausenEpistemicGroundingSkill",
    displayName: "Münchhausen Trilemma Epistemic Grounding",
    categoryId: "reasoning",
    description: "Navigates the foundational justification trilemma: circularity, infinite regress, or dogmatic axiomatic halting.",
    tags: ["reasoning","munchhausen-trilemma","foundationalism","epistemology","axioms"],
    transform: createStandardSkillTransform({
      sectionName: "Münchhausen Trilemma Foundational Grounding",
      ruSectionName: "Трилемма Мюнхгаузена: обоснование предельных оснований",
      instructions: [
        "Recognize that every chain of reasons threatens infinite regress, vicious circularity, or arbitrary dogmatism.",
        "Declare explicit axiomatic foundational stopping points (e.g. hardware specs, physics limits, legal compliance).",
        "Clearly justify why the chosen stopping axioms represent pragmatically stable engineering ground.",
      ],
      ruInstructions: [
        "Осознавайте, что любая цепочка обоснований рискует уйти в бесконечный регресс, порочный круг или догматизм.",
        "Явно фиксируйте предельные прагматические аксиомы остановки анализа (спецификации железа, законы физики, нормы закона).",
        "Обосновывайте, почему выбранный фундамент является надежной базой для инженерного компромисса.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","munchhausen-trilemma","foundationalism","epistemology","axioms"],
    }),
  },

  "newcomb-paradox-decision-theory": {
    id: "newcomb-paradox-decision-theory",
    name: "NewcombParadoxDecisionTheorySkill",
    displayName: "Causal vs Evidential Decision Theory Calibration",
    categoryId: "reasoning",
    description: "Distinguishes Causal Decision Theory (actions bring about states) from Evidential Decision Theory (actions provide news of states).",
    tags: ["reasoning","newcomb-paradox","decision-theory","cdt-edt","causality"],
    transform: createStandardSkillTransform({
      sectionName: "Decision-Theoretic Alignment Architecture",
      ruSectionName: "Каузальная vs эвиденциальная теория решений (Парадокс Ньюкома)",
      instructions: [
        "Distinguish whether taking an action causally produces an outcome or merely serves as statistical evidence of an underlying state.",
        "Apply Causal Decision Theory (CDT) in engineering environments where physics and causal networks govern outcomes.",
        "Avoid superstitious correlation traps where teams perform rituals that correlate with past success without causal impact.",
      ],
      ruInstructions: [
        "Разграничивайте случаи, когда действие напрямую вызывает результат, и ситуации, где оно лишь коррелирует со скрытым фактором.",
        "Применяйте каузальную теорию решений в инженерных задачах, опираясь на физику и граф зависимостей.",
        "Искореняйте ритуалы «карго-культа», которые коррелировали с успешными релизами, но не имели причинной связи.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","newcomb-paradox","decision-theory","cdt-edt","causality"],
    }),
  },

  "simpson-paradox-stratification-audit": {
    id: "simpson-paradox-stratification-audit",
    name: "SimpsonParadoxStratificationAuditSkill",
    displayName: "Simpson's Paradox Demographic Stratification",
    categoryId: "reasoning",
    description: "Diagnoses Simpson's Paradox where a statistical trend present in sub-populations reverses or disappears when aggregated.",
    tags: ["reasoning","simpsons-paradox","statistics","stratification","confounding"],
    transform: createStandardSkillTransform({
      sectionName: "Simpson's Paradox Stratification Protocol",
      ruSectionName: "Выявление парадокса Симпсона через стратификацию данных",
      instructions: [
        "Never rely exclusively on aggregated macro-metrics that pool disparate cohorts.",
        "Stratify data across confounding background variables (e.g. user tier, geography, hardware generation).",
        "Verify whether the observed causal effect holds consistently within every stratum before declaring global conclusions.",
      ],
      ruInstructions: [
        "Никогда не делайте выводов исключительно по агрегированным средним показателям.",
        "Стратифицируйте выборку по скрытым конфаундерам (тарифный план, география, тип устройства).",
        "Проверяйте, сохраняется ли направление эффекта внутри каждой отдельной подгруппы до подведения итогов.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","simpsons-paradox","statistics","stratification","confounding"],
    }),
  },

  "berkson-paradox-selection-collider-filter": {
    id: "berkson-paradox-selection-collider-filter",
    name: "BerksonParadoxSelectionColliderFilterSkill",
    displayName: "Berkson's Fallacy & Collider Selection Bias",
    categoryId: "reasoning",
    description: "Detects artificial negative correlations between independent traits caused by conditioning on a common collider/selection gate.",
    tags: ["reasoning","berksons-paradox","collider-bias","selection-bias","causality"],
    transform: createStandardSkillTransform({
      sectionName: "Collider Conditioning & Selection Bias Filter",
      ruSectionName: "Парадокс Берксона и фильтрация смещения отбора (Collider Bias)",
      instructions: [
        "Identify whether the sampled dataset was conditioned on a common effect or selection gate (e.g. only reviewing merged PRs or admitted patients).",
        "Explain how the selection filter creates artificial negative correlations between actually independent variables.",
        "Re-examine the broader unconditioned population to evaluate the true causal relationship.",
      ],
      ruInstructions: [
        "Определяйте, не подверглась ли выборка предварительной фильтрации по общему признаку (только принятые PR или успешные транзакции).",
        "Показывайте, как порог отбора порождает ложную отрицательную корреляцию между независимыми факторами.",
        "Анализируйте исходную генеральную совокупность до фильтрации для поиска истинной причинности.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","berksons-paradox","collider-bias","selection-bias","causality"],
    }),
  },

  "lotka-volterra-predator-prey-oscillation": {
    id: "lotka-volterra-predator-prey-oscillation",
    name: "LotkaVolterraPredatorPreyOscillationSkill",
    displayName: "Predator-Prey Population Dynamics (Lotka-Volterra)",
    categoryId: "reasoning",
    description: "Models cyclical oscillations between competing system populations: requests vs workers, spammers vs anti-fraud classifiers.",
    tags: ["reasoning","lotka-volterra","predator-prey","oscillations","systems-thinking"],
    transform: createStandardSkillTransform({
      sectionName: "Predator-Prey Systemic Dynamics Protocol",
      ruSectionName: "Моделирование динамики «хищник-жертва» (Лотка-Вольтерра)",
      instructions: [
        "Model coupled adversarial populations: identify the \"prey\" (e.g. system throughput, attacker accounts) and \"predator\" (e.g. security rules, autoscaling workers).",
        "Formulate non-linear phase-plane equations tracking lag times between prey growth and predator response.",
        "Introduce damping mechanisms (e.g. rate limits, exponential backoff) to stabilize violent cyclic oscillation collapses.",
      ],
      ruInstructions: [
        "Моделируйте противоборствующие популяции в системе: нагрузка («жертва») и воркеры («хищник»), спамеры и спам-фильтры.",
        "Оценивайте фазовые запаздывания между всплеском нагрузки и реакцией масштабирования инфраструктуры.",
        "Внедряйте демпфирующие контуры (рейтлимиты, экспоненциальные паузы) для гашения колебательных штормов.",
      ],
      semanticType: "structural_directive",
      tags: ["reasoning","lotka-volterra","predator-prey","oscillations","systems-thinking"],
    }),
  },

  "coase-theorem-transaction-cost-optima": {
    id: "coase-theorem-transaction-cost-optima",
    name: "CoaseTheoremTransactionCostOptimaSkill",
    displayName: "Coase Theorem & Transaction Cost Architecture",
    categoryId: "reasoning",
    description: "Determines optimal boundaries between internal monoliths and distributed microservices by quantifying friction and transaction costs.",
    tags: ["reasoning","coase-theorem","transaction-costs","microservices","monolith"],
    transform: createStandardSkillTransform({
      sectionName: "Coasean Transaction Cost System Boundary Protocol",
      ruSectionName: "Теорема Коуза: транзакционные издержки и границы систем",
      instructions: [
        "Calculate the total transaction costs of network boundaries: serialization, network latency, distributed tracing, and coordination overhead.",
        "Apply Coase's theorem: keep components within a single process/monolith when external interface coordination friction exceeds internal management costs.",
        "Carve out autonomous services only when interface boundaries are clean, stable, and exhibit near-zero coordination tax.",
      ],
      ruInstructions: [
        "Рассчитывайте суммарные транзакционные издержки межсервисных границ: сериализация, задержки сети, распределенные транзакции.",
        "Применяйте теорему Коуза: объединяйте компоненты в монолит, если издержки сетевого взаимодействия превышают выгоды разделения.",
        "Выносите микросервис наружу только при наличии четкого, стабильного API с околонулевыми издержками координации.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","coase-theorem","transaction-costs","microservices","monolith"],
    }),
  },

  "arrow-impossibility-voting-aggregation": {
    id: "arrow-impossibility-voting-aggregation",
    name: "ArrowImpossibilityVotingAggregationSkill",
    displayName: "Arrow's Impossibility Consensus Aggregator",
    categoryId: "reasoning",
    description: "Navigates Arrow's theorem in distributed consensus: proves that no ranked multi-criteria voting system satisfies all democratic criteria.",
    tags: ["reasoning","arrows-theorem","consensus","voting","social-choice"],
    transform: createStandardSkillTransform({
      sectionName: "Arrow Impossibility Consensus Architecture",
      ruSectionName: "Теорема невозможности Эрроу и агрегация предпочтений",
      instructions: [
        "Acknowledge that no ranked voting aggregation system can simultaneously satisfy Unrestricted Domain, Pareto Efficiency, Independence of Irrelevant Alternatives, and Non-Dictatorship.",
        "When aggregating stakeholder ratings across 3+ architectural options, explicitly declare which fairness axiom is pragmatically relaxed.",
        "Avoid cyclic preference deadlocks (Condorcet paradox) through cardinal weighted scoring rather than ordinal voting.",
      ],
      ruInstructions: [
        "Учитывайте, что никакая система рангового голосования не может одновременно удовлетворить всем идеальным критериям справедливости.",
        "При выборе из трех и более архитектурных вариантов открыто фиксируйте, каким критерием система осознанно поступается.",
        "Предотвращайте циклические тупики голосования (парадокс Кондорсе), используя взвешенные балльные оценки вместо простого ранжирования.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","arrows-theorem","consensus","voting","social-choice"],
    }),
  },

  "condorcet-jury-theorem-ensemble-reliability": {
    id: "condorcet-jury-theorem-ensemble-reliability",
    name: "CondorcetJuryTheoremEnsembleReliabilitySkill",
    displayName: "Condorcet Jury Theorem & Majority Ensemble Scaling",
    categoryId: "reasoning",
    description: "Proves mathematical conditions where aggregating independent weak classifiers or LLM evaluators approaches 100% precision.",
    tags: ["reasoning","condorcet-jury","ensembles","scaling-laws","consensus"],
    transform: createStandardSkillTransform({
      sectionName: "Condorcet Ensemble Precision Scaling",
      ruSectionName: "Теорема Кондорсе о жюри присяжных и ансамблирование",
      instructions: [
        "Verify the fundamental Condorcet precondition: each individual evaluator/classifier must have an independent probability p > 0.5 of being correct.",
        "Ensure genuine structural independence among ensemble evaluators (different models, prompts, or data shards) to prevent correlated failure modes.",
        "Calculate ensemble size N required to achieve target reliability (e.g. 99.99%) under majority voting.",
      ],
      ruInstructions: [
        "Проверяйте базовое условие теоремы Кондорсе: каждый отдельный валидатор обязан быть прав с вероятностью p > 0.5.",
        "Гарантируйте независимость оценщиков (разные архитектуры моделей, разные системные промпты), исключая коррелированные ошибки.",
        "Рассчитывайте минимально необходимый размер ансамбля N для достижения целевого уровня надежности через мажоритарное голосование.",
      ],
      semanticType: "process_directive",
      tags: ["reasoning","condorcet-jury","ensembles","scaling-laws","consensus"],
    }),
  },
};
