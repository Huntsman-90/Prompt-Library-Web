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
  "bayesian-posterior-updating-formal": {
    id: "bayesian-posterior-updating-formal",
    name: "BayesianPosteriorUpdatingFormalSkill",
    displayName: "Formal Bayesian Posterior Belief Updating",
    categoryId: "reasoning",
    description: "Updates hypothesis probabilities mathematically using Bayes' Theorem: P(H|E) = (P(E|H) * P(H)) / P(E).",
    tags: ["reasoning","bayesian","probability","epistemics","evidence"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","bayesian","probability","epistemics","evidence"],
    }),
  },

  "contrapositive-inference-law": {
    id: "contrapositive-inference-law",
    name: "ContrapositiveInferenceLawSkill",
    displayName: "Contrapositive Modus Tollens Deductive Proof",
    categoryId: "reasoning",
    description: "Applies the strict equivalence (P -> Q) <=> (¬Q -> ¬P) to verify conditional logical statements.",
    tags: ["reasoning","deduction","contrapositive","modus-tollens","formal-logic"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","deduction","contrapositive","modus-tollens","formal-logic"],
    }),
  },

  "counterfactual-clio-historical-branching": {
    id: "counterfactual-clio-historical-branching",
    name: "CounterfactualClioHistoricalBranchingSkill",
    displayName: "Counterfactual Causal Branching Analysis",
    categoryId: "reasoning",
    description: "Evaluates causal necessity by modeling hypothetical worlds where a specific key condition was altered.",
    tags: ["reasoning","counterfactual","causality","judea-pearl","branching"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","counterfactual","causality","judea-pearl","branching"],
    }),
  },

  "game-theoretic-nash-equilibrium": {
    id: "game-theoretic-nash-equilibrium",
    name: "GameTheoreticNashEquilibriumSkill",
    displayName: "Nash Equilibrium & Strategic Minimax Matrix",
    categoryId: "reasoning",
    description: "Models strategic multi-agent interactions where no participant has an incentive to unilaterally deviate.",
    tags: ["reasoning","game-theory","nash-equilibrium","minimax","strategy"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","game-theory","nash-equilibrium","minimax","strategy"],
    }),
  },

  "sorites-paradox-boundary-resolver": {
    id: "sorites-paradox-boundary-resolver",
    name: "SoritesParadoxBoundaryResolverSkill",
    displayName: "Sorites Paradox & Fuzzy Boundary Disambiguation",
    categoryId: "reasoning",
    description: "Resolves vague continuum boundaries (heap paradox) by introducing strict quantitative demarcation thresholds.",
    tags: ["reasoning","sorites","fuzzy-logic","boundaries","epistemics"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","sorites","fuzzy-logic","boundaries","epistemics"],
    }),
  },

  "adversarial-turing-devil-advocate": {
    id: "adversarial-turing-devil-advocate",
    name: "AdversarialTuringDevilAdvocateSkill",
    displayName: "Formal Adversarial Devil's Advocate & Steelmanning",
    categoryId: "reasoning",
    description: "Constructs the strongest possible, mathematically robust counter-argument against the proposed thesis.",
    tags: ["reasoning","devils-advocate","steelman","adversarial","critical-thinking"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","devils-advocate","steelman","adversarial","critical-thinking"],
    }),
  },

  "analogical-deep-structural-mapping": {
    id: "analogical-deep-structural-mapping",
    name: "AnalogicalDeepStructuralMappingSkill",
    displayName: "Gentner Structure-Mapping & Cross-Domain Analogy",
    categoryId: "reasoning",
    description: "Transfers relational systems from a well-understood base domain to solve an isomorphic target problem.",
    tags: ["reasoning","analogy","structure-mapping","gentner","lateral-thinking"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","analogy","structure-mapping","gentner","lateral-thinking"],
    }),
  },

  "toulmin-argument-structure-model": {
    id: "toulmin-argument-structure-model",
    name: "ToulminArgumentStructureModelSkill",
    displayName: "Toulmin Argumentation Scheme (Claim/Data/Warrant)",
    categoryId: "reasoning",
    description: "Structures rational argumentation into Claim, Grounds, Warrant, Backing, Qualifier, and Rebuttal.",
    tags: ["reasoning","toulmin","argumentation","logic","rhetoric"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","toulmin","argumentation","logic","rhetoric"],
    }),
  },

  "monte-carlo-probabilistic-simulation": {
    id: "monte-carlo-probabilistic-simulation",
    name: "MonteCarloProbabilisticSimulationSkill",
    displayName: "Monte Carlo Probabilistic Range Simulation",
    categoryId: "reasoning",
    description: "Replaces single-point deterministic estimates with probabilistic probability distributions (p10/p50/p90).",
    tags: ["reasoning","monte-carlo","simulation","probability","forecasting"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","monte-carlo","simulation","probability","forecasting"],
    }),
  },

  "dialetheism-paraconsistent-logic": {
    id: "dialetheism-paraconsistent-logic",
    name: "DialetheismParaconsistentLogicSkill",
    displayName: "Paraconsistent Logic & Contradiction Containment",
    categoryId: "reasoning",
    description: "Reasons soundly in the presence of contradictory premises without triggering principle of explosion (ex falso).",
    tags: ["reasoning","paraconsistent","dialetheism","logic","contradictions"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","paraconsistent","dialetheism","logic","contradictions"],
    }),
  },

  "system-dynamics-stock-and-flow": {
    id: "system-dynamics-stock-and-flow",
    name: "SystemDynamicsStockAndFlowSkill",
    displayName: "Forrester System Dynamics & Stock-and-Flow Modeling",
    categoryId: "reasoning",
    description: "Models complex systems through Stocks (accumulations), Flows (rates), and non-linear Feedback Loops.",
    tags: ["reasoning","system-dynamics","forrester","stocks-flows","feedback-loops"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","system-dynamics","forrester","stocks-flows","feedback-loops"],
    }),
  },

  "epistemic-circularity-detection": {
    id: "epistemic-circularity-detection",
    name: "EpistemicCircularityDetectionSkill",
    displayName: "Epistemic Circularity & Petitio Principii Trap Detector",
    categoryId: "reasoning",
    description: "Exposes begging-the-question fallacies where the conclusion is covertly assumed in the supporting premises.",
    tags: ["reasoning","fallacy","circularity","petitio-principii","epistemics"],
    transform: createStandardSkillTransform({
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
      semanticType: "guardrail_directive",
      tags: ["reasoning","fallacy","circularity","petitio-principii","epistemics"],
    }),
  },

  "goodhart-campbell-metric-distortion": {
    id: "goodhart-campbell-metric-distortion",
    name: "GoodhartCampbellMetricDistortionSkill",
    displayName: "Goodhart & Campbell Law Metric Distortion Defense",
    categoryId: "reasoning",
    description: "Anticipates how metrics cease to be good metrics when targeted, leading to perverse optimization.",
    tags: ["reasoning","goodhart","campbell-law","metrics","perverse-incentives"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","goodhart","campbell-law","metrics","perverse-incentives"],
    }),
  },

  "fermi-order-of-magnitude-estimation": {
    id: "fermi-order-of-magnitude-estimation",
    name: "FermiOrderOfMagnitudeEstimationSkill",
    displayName: "Enrico Fermi Dimensional Order-of-Magnitude Estimation",
    categoryId: "reasoning",
    description: "Estimates complex unknown quantities within factor-of-10 bounds via dimensional decomposition.",
    tags: ["reasoning","fermi","estimation","order-of-magnitude","dimensional-analysis"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","fermi","estimation","order-of-magnitude","dimensional-analysis"],
    }),
  },

  "occams-razor-parsimony-pruning": {
    id: "occams-razor-parsimony-pruning",
    name: "OccamsRazorParsimonyPruningSkill",
    displayName: "William of Ockham Ontological Parsimony Pruning",
    categoryId: "reasoning",
    description: "Shaves away unnecessary entities, multiplying factors, and complex assumptions without loss of power.",
    tags: ["reasoning","occams-razor","parsimony","simplification","ontology"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","occams-razor","parsimony","simplification","ontology"],
    }),
  },

  "hypothetico-deductive-cycle": {
    id: "hypothetico-deductive-cycle",
    name: "HypotheticoDeductiveCycleSkill",
    displayName: "Hypothetico-Deductive Scientific Cycle",
    categoryId: "reasoning",
    description: "Executes the strict scientific loop: Observe -> Hypothesize -> Deduce Consequence -> Experiment.",
    tags: ["reasoning","scientific-method","hypothetico-deductive","falsification","empiricism"],
    transform: createStandardSkillTransform({
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
      semanticType: "process_directive",
      tags: ["reasoning","scientific-method","hypothetico-deductive","falsification","empiricism"],
    }),
  },

  "simpson-paradox-subgroup-disaggregation": {
    id: "simpson-paradox-subgroup-disaggregation",
    name: "SimpsonParadoxSubgroupDisaggregationSkill",
    displayName: "Simpson's Paradox & Confounding Subgroup Disaggregator",
    categoryId: "reasoning",
    description: "Disaggregates aggregate data across lurking confounders to expose reversed underlying trends.",
    tags: ["reasoning","simpsons-paradox","statistics","confounding","disaggregation"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","simpsons-paradox","statistics","confounding","disaggregation"],
    }),
  },

  "heuristic-cognitive-bias-debiasing": {
    id: "heuristic-cognitive-bias-debiasing",
    name: "HeuristicCognitiveBiasDebiasingSkill",
    displayName: "Kahneman & Tversky Cognitive Debiasing Protocol",
    categoryId: "reasoning",
    description: "Identifies and neutralizes Availability, Anchoring, Representativeness, and Confirmation biases.",
    tags: ["reasoning","kahneman","tversky","biases","heuristics","debiasing"],
    transform: createStandardSkillTransform({
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
      semanticType: "guardrail_directive",
      tags: ["reasoning","kahneman","tversky","biases","heuristics","debiasing"],
    }),
  },

  "relevance-logic-entailment-check": {
    id: "relevance-logic-entailment-check",
    name: "RelevanceLogicEntailmentCheckSkill",
    displayName: "Anderson-Belnap Relevance Logic & Non-Sequitur Purge",
    categoryId: "reasoning",
    description: "Enforces that premises must share genuine topical and semantic relevance with their conclusions.",
    tags: ["reasoning","relevance-logic","entailment","non-sequitur","formal-logic"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","relevance-logic","entailment","non-sequitur","formal-logic"],
    }),
  },

  "epistemic-triangulation-independent-sources": {
    id: "epistemic-triangulation-independent-sources",
    name: "EpistemicTriangulationIndependentSourcesSkill",
    displayName: "Multi-Method Epistemic Triangulation",
    categoryId: "reasoning",
    description: "Validates hypotheses by demonstrating convergence across multiple independent methodological angles.",
    tags: ["reasoning","triangulation","epistemics","validation","convergence"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","triangulation","epistemics","validation","convergence"],
    }),
  },

  "counter-inductive-feyerabend-challenge": {
    id: "counter-inductive-feyerabend-challenge",
    name: "CounterInductiveFeyerabendChallengeSkill",
    displayName: "Feyerabend Counter-Inductive Epistemic Challenge",
    categoryId: "reasoning",
    description: "Introduces hypotheses that contradict established theories to expose hidden dogmatic paradigm traps.",
    tags: ["reasoning","feyerabend","counter-induction","epistemics","paradigm-shift"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","feyerabend","counter-induction","epistemics","paradigm-shift"],
    }),
  },
  "polymathic-first-principles-synthesis": {
    id: "polymathic-first-principles-synthesis",
    name: "PolymathicFirstPrinciplesSynthesisSkill",
    displayName: "Polymathic Multi-Domain First-Principles Synthesis",
    categoryId: "reasoning",
    description: "Deconstructs problems down to thermodynamic, computational, and economic ground-truth laws.",
    tags: ["reasoning","first-principles","physics","synthesis","musk"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","first-principles","physics","synthesis","musk"],
    }),
  },

  "epistemic-status-meta-tagger": {
    id: "epistemic-status-meta-tagger",
    name: "EpistemicStatusMetaTaggerSkill",
    displayName: "Formal Epistemic Status & Confidence Tagging",
    categoryId: "reasoning",
    description: "Tags every major claim with formal epistemic metadata: Certainty, Empirical Weight, Source Authority.",
    tags: ["reasoning","epistemic-status","metadata","calibration","transparency"],
    transform: createStandardSkillTransform({
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
      semanticType: "guardrail_directive",
      tags: ["reasoning","epistemic-status","metadata","calibration","transparency"],
    }),
  },

  "chain-of-verification-cove-protocol": {
    id: "chain-of-verification-cove-protocol",
    name: "ChainOfVerificationCoveProtocolSkill",
    displayName: "CoVe Chain-of-Verification Factuality Protocol",
    categoryId: "reasoning",
    description: "Generates baseline reasoning, plans independent verification questions, answers them, and revises output.",
    tags: ["reasoning","cove","verification","factuality","anti-hallucination"],
    transform: createStandardSkillTransform({
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
      semanticType: "process_directive",
      tags: ["reasoning","cove","verification","factuality","anti-hallucination"],
    }),
  },

  "synthetic-trilemma-triangulator": {
    id: "synthetic-trilemma-triangulator",
    name: "SyntheticTrilemmaTriangulatorSkill",
    displayName: "Impossible Trilemma Dynamic Tension Balancer",
    categoryId: "reasoning",
    description: "Analyzes trilemmas (e.g. Scalability/Security/Decentralization) where you can optimize at most 2 of 3.",
    tags: ["reasoning","trilemma","trade-offs","systems","architecture"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","trilemma","trade-offs","systems","architecture"],
    }),
  },

  "inversion-principle-munger": {
    id: "inversion-principle-munger",
    name: "InversionPrincipleMungerSkill",
    displayName: "Charlie Munger Inversion Principle ('Invert, Always Invert')",
    categoryId: "reasoning",
    description: "Solves problems by systematically cataloging all ways to guarantee catastrophic failure, then inverting them.",
    tags: ["reasoning","inversion","munger","algebraic-inversion","risk"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","inversion","munger","algebraic-inversion","risk"],
    }),
  },

  "causal-loop-diagramming-archetypes": {
    id: "causal-loop-diagramming-archetypes",
    name: "CausalLoopDiagrammingArchetypesSkill",
    displayName: "Senge System Archetypes (Tragedy of the Commons, Shifting Burden)",
    categoryId: "reasoning",
    description: "Diagnoses classic systemic traps: Tragedy of the Commons, Shifting the Burden, and Limits to Growth.",
    tags: ["reasoning","system-archetypes","senge","causal-loops","systems-thinking"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","system-archetypes","senge","causal-loops","systems-thinking"],
    }),
  },

  "counter-intuitive-complex-system-logic": {
    id: "counter-intuitive-complex-system-logic",
    name: "CounterIntuitiveComplexSystemLogicSkill",
    displayName: "Forrester Counter-Intuitive Complex System Dynamics",
    categoryId: "reasoning",
    description: "Exposes how intuitive, common-sense policy interventions often worsen outcomes in non-linear systems.",
    tags: ["reasoning","complex-systems","counter-intuitive","forrester","non-linear"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","complex-systems","counter-intuitive","forrester","non-linear"],
    }),
  },

  "epistemic-calibration-brier-score": {
    id: "epistemic-calibration-brier-score",
    name: "EpistemicCalibrationBrierScoreSkill",
    displayName: "Tetlock Superforecasting & Brier Score Calibration",
    categoryId: "reasoning",
    description: "Calibrates subjective probability estimates against historical frequency to minimize Brier error scores.",
    tags: ["reasoning","superforecasting","tetlock","brier-score","calibration"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","superforecasting","tetlock","brier-score","calibration"],
    }),
  },

  "abductive-diagnostic-differential-tree": {
    id: "abductive-diagnostic-differential-tree",
    name: "AbductiveDiagnosticDifferentialTreeSkill",
    displayName: "Differential Diagnostic Decision Tree",
    categoryId: "reasoning",
    description: "Eliminates competing failure hypotheses via systematic binary discriminant testing.",
    tags: ["reasoning","differential-diagnosis","decision-tree","troubleshooting","diagnostics"],
    transform: createStandardSkillTransform({
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
      semanticType: "process_directive",
      tags: ["reasoning","differential-diagnosis","decision-tree","troubleshooting","diagnostics"],
    }),
  },

  "morphological-box-zwicky-synthesis": {
    id: "morphological-box-zwicky-synthesis",
    name: "MorphologicalBoxZwickySynthesisSkill",
    displayName: "Fritz Zwicky General Morphological Analysis (GMA)",
    categoryId: "reasoning",
    description: "Explores all possible combinatorial permutations of multi-dimensional non-quantifiable problem spaces.",
    tags: ["reasoning","zwicky","morphological-analysis","combinatorics","synthesis"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","zwicky","morphological-analysis","combinatorics","synthesis"],
    }),
  },

  "delphi-method-expert-consensus": {
    id: "delphi-method-expert-consensus",
    name: "DelphiMethodExpertConsensusSkill",
    displayName: "Iterative Delphi Method & Anonymous Consensus Synthesis",
    categoryId: "reasoning",
    description: "Synthesizes multi-expert perspectives through structured, iterative, anonymized feedback rounds.",
    tags: ["reasoning","delphi-method","consensus","expert-synthesis","forecasting"],
    transform: createStandardSkillTransform({
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
      semanticType: "process_directive",
      tags: ["reasoning","delphi-method","consensus","expert-synthesis","forecasting"],
    }),
  },

  "hypothetical-syllogism-transitivity": {
    id: "hypothetical-syllogism-transitivity",
    name: "HypotheticalSyllogismTransitivitySkill",
    displayName: "Hypothetical Syllogism & Transitive Implication Chain",
    categoryId: "reasoning",
    description: "Proves multi-step transitive reasoning: (A -> B) ∧ (B -> C) ∧ (C -> D) => (A -> D).",
    tags: ["reasoning","formal-logic","transitivity","implication","proof"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","formal-logic","transitivity","implication","proof"],
    }),
  },

  "pareto-zipf-power-law-distribution": {
    id: "pareto-zipf-power-law-distribution",
    name: "ParetoZipfPowerLawDistributionSkill",
    displayName: "Power Law & Heavy-Tailed Fat-Tail Distribution Analysis",
    categoryId: "reasoning",
    description: "Evaluates systems governed by fat-tailed Power Law / Zipf distributions rather than thin-tailed Gaussian bells.",
    tags: ["reasoning","power-law","fat-tails","zipf","extremistan","taleb"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","power-law","fat-tails","zipf","extremistan","taleb"],
    }),
  },

  "epistemic-peer-disagreement-reconciliation": {
    id: "epistemic-peer-disagreement-reconciliation",
    name: "EpistemicPeerDisagreementReconciliationSkill",
    displayName: "Elga-Christensen Epistemic Peer Disagreement Reconciliation",
    categoryId: "reasoning",
    description: "Rationally resolves conflicts between equally qualified, equally informed expert opinions (Equal Weight View).",
    tags: ["reasoning","epistemic-peers","disagreement","epistemics","reconciliation"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","epistemic-peers","disagreement","epistemics","reconciliation"],
    }),
  },

  "kuhn-paradigm-anomaly-accumulation": {
    id: "kuhn-paradigm-anomaly-accumulation",
    name: "KuhnParadigmAnomalyAccumulationSkill",
    displayName: "Thomas Kuhn Paradigm Shift & Scientific Revolution",
    categoryId: "reasoning",
    description: "Tracks the accumulation of anomalies within the dominant paradigm that necessitate a structural revolution.",
    tags: ["reasoning","kuhn","paradigm-shift","epistemics","scientific-revolution"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","kuhn","paradigm-shift","epistemics","scientific-revolution"],
    }),
  },

  "synthetic-triangulation-consilience": {
    id: "synthetic-triangulation-consilience",
    name: "SyntheticTriangulationConsilienceSkill",
    displayName: "Whewell & Wilson Consilience of Inductions",
    categoryId: "reasoning",
    description: "Validates a grand unified theory when conclusions drawn from disparate fields unexpectedly converge.",
    tags: ["reasoning","consilience","wilson","whewell","unified-theory"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","consilience","wilson","whewell","unified-theory"],
    }),
  },

  "modal-logic-possible-worlds-semantics": {
    id: "modal-logic-possible-worlds-semantics",
    name: "ModalLogicPossibleWorldsSemanticsSkill",
    displayName: "Kripke Modal Logic & Possible Worlds Semantics (□ and ◊)",
    categoryId: "reasoning",
    description: "Evaluates propositions across all accessible possible worlds using Necessity (□) and Possibility (◊) operators.",
    tags: ["reasoning","modal-logic","kripke","possible-worlds","formal-methods"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","modal-logic","kripke","possible-worlds","formal-methods"],
    }),
  },

  "epistemic-coherence-web-of-belief": {
    id: "epistemic-coherence-web-of-belief",
    name: "EpistemicCoherenceWebOfBeliefSkill",
    displayName: "Quine-Duhem Web of Belief & Holistic Coherence",
    categoryId: "reasoning",
    description: "Evaluates propositions holistically against the entire web of established beliefs rather than in isolation.",
    tags: ["reasoning","quine","web-of-belief","holism","coherence"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","quine","web-of-belief","holism","coherence"],
    }),
  },

  "fuzzy-logic-truth-degree-evaluator": {
    id: "fuzzy-logic-truth-degree-evaluator",
    name: "FuzzyLogicTruthDegreeEvaluatorSkill",
    displayName: "Lotfi Zadeh Fuzzy Logic & Degree of Membership [0, 1]",
    categoryId: "reasoning",
    description: "Models partial truth and graded membership on continuous interval [0, 1] for real-world continuous variables.",
    tags: ["reasoning","fuzzy-logic","zadeh","membership-function","continuous"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","fuzzy-logic","zadeh","membership-function","continuous"],
    }),
  },

  "defeasible-reasoning-prima-facie-warrants": {
    id: "defeasible-reasoning-prima-facie-warrants",
    name: "DefeasibleReasoningPrimaFacieWarrantsSkill",
    displayName: "John Pollock Defeasible Reasoning & Defeaters (Rebutting/Undercutting)",
    categoryId: "reasoning",
    description: "Evaluates prima facie justified arguments and tests them against potential Rebutting and Undercutting defeaters.",
    tags: ["reasoning","defeasible","pollock","defeaters","non-monotonic"],
    transform: createStandardSkillTransform({
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
      semanticType: "domain_specific",
      tags: ["reasoning","defeasible","pollock","defeaters","non-monotonic"],
    }),
  },
  "reasoning-counterfactual-causal-inference-reasoning": {
    id: "reasoning-counterfactual-causal-inference-reasoning",
    name: "CounterfactualCausalInferenceReasoningSkill",
    displayName: "Counterfactual Causal Inference Reasoning",
    categoryId: "reasoning",
    description: "Evaluates what would have occurred had key historical variables been altered.",
    tags: ["reasoning","reasoning","counterfactual","causal"],
    transform: createStandardSkillTransform({
      sectionName: "Counterfactual Causal Inference Reasoning Standards",
      ruSectionName: "Стандарты и регламенты: Counterfactual Causal Inference Reasoning",
      instructions: [
        "Apply core domain tenets for Counterfactual Causal Inference Reasoning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Counterfactual Causal Inference Reasoning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","counterfactual","causal"],
    }),
  },

  "reasoning-abductive-reasoning-to-best-explanation": {
    id: "reasoning-abductive-reasoning-to-best-explanation",
    name: "AbductiveReasoningtoBestExplanationSkill",
    displayName: "Abductive Reasoning to Best Explanation",
    categoryId: "reasoning",
    description: "Infers the most plausible hypothesis given incomplete or noisy observations.",
    tags: ["reasoning","reasoning","abductive","reasoning"],
    transform: createStandardSkillTransform({
      sectionName: "Abductive Reasoning to Best Explanation Standards",
      ruSectionName: "Стандарты и регламенты: Abductive Reasoning to Best Explanation",
      instructions: [
        "Apply core domain tenets for Abductive Reasoning to Best Explanation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Abductive Reasoning to Best Explanation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","abductive","reasoning"],
    }),
  },

  "reasoning-reductio-ad-absurdum-logical-refutation": {
    id: "reasoning-reductio-ad-absurdum-logical-refutation",
    name: "ReductioadAbsurdumLogicalRefutationSkill",
    displayName: "Reductio ad Absurdum Logical Refutation",
    categoryId: "reasoning",
    description: "Disproves a premise by demonstrating that its logical conclusion leads to an absurdity.",
    tags: ["reasoning","reasoning","reductio","ad"],
    transform: createStandardSkillTransform({
      sectionName: "Reductio ad Absurdum Logical Refutation Standards",
      ruSectionName: "Стандарты и регламенты: Reductio ad Absurdum Logical Refutation",
      instructions: [
        "Apply core domain tenets for Reductio ad Absurdum Logical Refutation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Reductio ad Absurdum Logical Refutation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","reductio","ad"],
    }),
  },

  "reasoning-dialectical-thesis-antithesis-synthesis": {
    id: "reasoning-dialectical-thesis-antithesis-synthesis",
    name: "DialecticalThesisAntithesisSynthesisSkill",
    displayName: "Dialectical Thesis Antithesis Synthesis",
    categoryId: "reasoning",
    description: "Resolves conflicting viewpoints by discovering a higher-level unifying synthesis.",
    tags: ["reasoning","reasoning","dialectical","thesis"],
    transform: createStandardSkillTransform({
      sectionName: "Dialectical Thesis Antithesis Synthesis Standards",
      ruSectionName: "Стандарты и регламенты: Dialectical Thesis Antithesis Synthesis",
      instructions: [
        "Apply core domain tenets for Dialectical Thesis Antithesis Synthesis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Dialectical Thesis Antithesis Synthesis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","dialectical","thesis"],
    }),
  },

  "reasoning-probabilistic-fermi-estimation-order-of-magnitude": {
    id: "reasoning-probabilistic-fermi-estimation-order-of-magnitude",
    name: "ProbabilisticFermiEstimationOrderofMagnitudeSkill",
    displayName: "Probabilistic Fermi Estimation & Order of Magnitude",
    categoryId: "reasoning",
    description: "Calculates rapid order-of-magnitude estimates using dimensional decomposition.",
    tags: ["reasoning","reasoning","probabilistic","fermi"],
    transform: createStandardSkillTransform({
      sectionName: "Probabilistic Fermi Estimation & Order of Magnitude Standards",
      ruSectionName: "Стандарты и регламенты: Probabilistic Fermi Estimation & Order of Magnitude",
      instructions: [
        "Apply core domain tenets for Probabilistic Fermi Estimation & Order of Magnitude.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Probabilistic Fermi Estimation & Order of Magnitude.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","probabilistic","fermi"],
    }),
  },

  "reasoning-inversion-thinking-munger-backward-reasoning": {
    id: "reasoning-inversion-thinking-munger-backward-reasoning",
    name: "InversionThinkingMungerBackwardReasoningSkill",
    displayName: "Inversion Thinking (Munger Backward Reasoning)",
    categoryId: "reasoning",
    description: "Solves difficult problems by analyzing how to fail and avoiding those pitfalls.",
    tags: ["reasoning","reasoning","inversion","thinking"],
    transform: createStandardSkillTransform({
      sectionName: "Inversion Thinking (Munger Backward Reasoning) Standards",
      ruSectionName: "Стандарты и регламенты: Inversion Thinking (Munger Backward Reasoning)",
      instructions: [
        "Apply core domain tenets for Inversion Thinking (Munger Backward Reasoning).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Inversion Thinking (Munger Backward Reasoning).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","inversion","thinking"],
    }),
  },

  "reasoning-first-principles-chemical-physical-reduction": {
    id: "reasoning-first-principles-chemical-physical-reduction",
    name: "FirstPrinciplesChemicalPhysicalReductionSkill",
    displayName: "First Principles Chemical/Physical Reduction",
    categoryId: "reasoning",
    description: "Deconstructs complex systems to fundamental physical/chemical laws.",
    tags: ["reasoning","reasoning","first","principles"],
    transform: createStandardSkillTransform({
      sectionName: "First Principles Chemical/Physical Reduction Standards",
      ruSectionName: "Стандарты и регламенты: First Principles Chemical/Physical Reduction",
      instructions: [
        "Apply core domain tenets for First Principles Chemical/Physical Reduction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для First Principles Chemical/Physical Reduction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","first","principles"],
    }),
  },

  "reasoning-second-order-nth-order-consequence-analysis": {
    id: "reasoning-second-order-nth-order-consequence-analysis",
    name: "SecondOrderNthOrderConsequenceAnalysisSkill",
    displayName: "Second-Order & Nth-Order Consequence Analysis",
    categoryId: "reasoning",
    description: "Evaluates delayed downstream ripple effects of immediate policy decisions.",
    tags: ["reasoning","reasoning","second","order"],
    transform: createStandardSkillTransform({
      sectionName: "Second-Order & Nth-Order Consequence Analysis Standards",
      ruSectionName: "Стандарты и регламенты: Second-Order & Nth-Order Consequence Analysis",
      instructions: [
        "Apply core domain tenets for Second-Order & Nth-Order Consequence Analysis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Second-Order & Nth-Order Consequence Analysis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","second","order"],
    }),
  },

  "reasoning-bayesian-prior-vs-likelihood-belief-update": {
    id: "reasoning-bayesian-prior-vs-likelihood-belief-update",
    name: "BayesianPriorvsLikelihoodBeliefUpdateSkill",
    displayName: "Bayesian Prior vs Likelihood Belief Update",
    categoryId: "reasoning",
    description: "Updates confidence probability systematically upon receiving fresh evidence.",
    tags: ["reasoning","reasoning","bayesian","prior"],
    transform: createStandardSkillTransform({
      sectionName: "Bayesian Prior vs Likelihood Belief Update Standards",
      ruSectionName: "Стандарты и регламенты: Bayesian Prior vs Likelihood Belief Update",
      instructions: [
        "Apply core domain tenets for Bayesian Prior vs Likelihood Belief Update.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Bayesian Prior vs Likelihood Belief Update.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","bayesian","prior"],
    }),
  },

  "reasoning-ockham-razor-parsimony-optimization": {
    id: "reasoning-ockham-razor-parsimony-optimization",
    name: "OckhamRazorParsimonyOptimizationSkill",
    displayName: "Ockham Razor Parsimony Optimization",
    categoryId: "reasoning",
    description: "Selects the simplest hypothesis with the fewest unproven assumptions.",
    tags: ["reasoning","reasoning","ockham","razor"],
    transform: createStandardSkillTransform({
      sectionName: "Ockham Razor Parsimony Optimization Standards",
      ruSectionName: "Стандарты и регламенты: Ockham Razor Parsimony Optimization",
      instructions: [
        "Apply core domain tenets for Ockham Razor Parsimony Optimization.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Ockham Razor Parsimony Optimization.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","ockham","razor"],
    }),
  },

  "reasoning-inductive-pattern-generalization-boundary-testing": {
    id: "reasoning-inductive-pattern-generalization-boundary-testing",
    name: "InductivePatternGeneralizationBoundaryTestingSkill",
    displayName: "Inductive Pattern Generalization & Boundary Testing",
    categoryId: "reasoning",
    description: "Derives general rules from specific observations while testing edge limits.",
    tags: ["reasoning","reasoning","inductive","pattern"],
    transform: createStandardSkillTransform({
      sectionName: "Inductive Pattern Generalization & Boundary Testing Standards",
      ruSectionName: "Стандарты и регламенты: Inductive Pattern Generalization & Boundary Testing",
      instructions: [
        "Apply core domain tenets for Inductive Pattern Generalization & Boundary Testing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Inductive Pattern Generalization & Boundary Testing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","inductive","pattern"],
    }),
  },

  "reasoning-formal-deductive-syllogism-validation": {
    id: "reasoning-formal-deductive-syllogism-validation",
    name: "FormalDeductiveSyllogismValidationSkill",
    displayName: "Formal Deductive Syllogism Validation",
    categoryId: "reasoning",
    description: "Constructs valid major/minor premise structures to prove sound conclusions.",
    tags: ["reasoning","reasoning","formal","deductive"],
    transform: createStandardSkillTransform({
      sectionName: "Formal Deductive Syllogism Validation Standards",
      ruSectionName: "Стандарты и регламенты: Formal Deductive Syllogism Validation",
      instructions: [
        "Apply core domain tenets for Formal Deductive Syllogism Validation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Formal Deductive Syllogism Validation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","formal","deductive"],
    }),
  },

  "reasoning-game-theoretic-nash-equilibrium-analysis": {
    id: "reasoning-game-theoretic-nash-equilibrium-analysis",
    name: "GameTheoreticNashEquilibriumAnalysisSkill",
    displayName: "Game-Theoretic Nash Equilibrium Analysis",
    categoryId: "reasoning",
    description: "Models strategic interaction where no player benefits by unilaterally changing strategy.",
    tags: ["reasoning","reasoning","game","theoretic"],
    transform: createStandardSkillTransform({
      sectionName: "Game-Theoretic Nash Equilibrium Analysis Standards",
      ruSectionName: "Стандарты и регламенты: Game-Theoretic Nash Equilibrium Analysis",
      instructions: [
        "Apply core domain tenets for Game-Theoretic Nash Equilibrium Analysis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Game-Theoretic Nash Equilibrium Analysis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","game","theoretic"],
    }),
  },

  "reasoning-cognitive-bias-audit-debiasing-protocol": {
    id: "reasoning-cognitive-bias-audit-debiasing-protocol",
    name: "CognitiveBiasAuditDebiasingProtocolSkill",
    displayName: "Cognitive Bias Audit & Debiasing Protocol",
    categoryId: "reasoning",
    description: "Identifies anchoring, confirmation, or availability bias in analytical models.",
    tags: ["reasoning","reasoning","cognitive","bias"],
    transform: createStandardSkillTransform({
      sectionName: "Cognitive Bias Audit & Debiasing Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Cognitive Bias Audit & Debiasing Protocol",
      instructions: [
        "Apply core domain tenets for Cognitive Bias Audit & Debiasing Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cognitive Bias Audit & Debiasing Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","cognitive","bias"],
    }),
  },

  "reasoning-root-cause-5-whys-iterative-analysis": {
    id: "reasoning-root-cause-5-whys-iterative-analysis",
    name: "RootCause5WhysIterativeAnalysisSkill",
    displayName: "Root Cause 5 Whys Iterative Analysis",
    categoryId: "reasoning",
    description: "Traces surface symptoms back to fundamental systemic failures.",
    tags: ["reasoning","reasoning","root","cause"],
    transform: createStandardSkillTransform({
      sectionName: "Root Cause 5 Whys Iterative Analysis Standards",
      ruSectionName: "Стандарты и регламенты: Root Cause 5 Whys Iterative Analysis",
      instructions: [
        "Apply core domain tenets for Root Cause 5 Whys Iterative Analysis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Root Cause 5 Whys Iterative Analysis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","root","cause"],
    }),
  },

  "reasoning-analogical-reasoning-cross-domain-mapping": {
    id: "reasoning-analogical-reasoning-cross-domain-mapping",
    name: "AnalogicalReasoningCrossDomainMappingSkill",
    displayName: "Analogical Reasoning Cross-Domain Mapping",
    categoryId: "reasoning",
    description: "Maps structural solutions from biology or history to solve novel tech problems.",
    tags: ["reasoning","reasoning","analogical","reasoning"],
    transform: createStandardSkillTransform({
      sectionName: "Analogical Reasoning Cross-Domain Mapping Standards",
      ruSectionName: "Стандарты и регламенты: Analogical Reasoning Cross-Domain Mapping",
      instructions: [
        "Apply core domain tenets for Analogical Reasoning Cross-Domain Mapping.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Analogical Reasoning Cross-Domain Mapping.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","analogical","reasoning"],
    }),
  },

  "reasoning-trolley-problem-ethical-utility-calculation": {
    id: "reasoning-trolley-problem-ethical-utility-calculation",
    name: "TrolleyProblemEthicalUtilityCalculationSkill",
    displayName: "Trolley Problem Ethical Utility Calculation",
    categoryId: "reasoning",
    description: "Evaluates moral trade-offs using utilitarian vs deontological frameworks.",
    tags: ["reasoning","reasoning","trolley","problem"],
    transform: createStandardSkillTransform({
      sectionName: "Trolley Problem Ethical Utility Calculation Standards",
      ruSectionName: "Стандарты и регламенты: Trolley Problem Ethical Utility Calculation",
      instructions: [
        "Apply core domain tenets for Trolley Problem Ethical Utility Calculation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Trolley Problem Ethical Utility Calculation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","trolley","problem"],
    }),
  },

  "reasoning-chesterton-fence-tradition-preservation-logic": {
    id: "reasoning-chesterton-fence-tradition-preservation-logic",
    name: "ChestertonFenceTraditionPreservationLogicSkill",
    displayName: "Chesterton Fence Tradition Preservation Logic",
    categoryId: "reasoning",
    description: "Understands why a rule was created before attempting to remove or alter it.",
    tags: ["reasoning","reasoning","chesterton","fence"],
    transform: createStandardSkillTransform({
      sectionName: "Chesterton Fence Tradition Preservation Logic Standards",
      ruSectionName: "Стандарты и регламенты: Chesterton Fence Tradition Preservation Logic",
      instructions: [
        "Apply core domain tenets for Chesterton Fence Tradition Preservation Logic.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Chesterton Fence Tradition Preservation Logic.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","chesterton","fence"],
    }),
  },

  "reasoning-decision-tree-expected-value-branching": {
    id: "reasoning-decision-tree-expected-value-branching",
    name: "DecisionTreeExpectedValueBranchingSkill",
    displayName: "Decision Tree Expected Value Branching",
    categoryId: "reasoning",
    description: "Calculates EV across weighted probabilistic decision branches.",
    tags: ["reasoning","reasoning","decision","tree"],
    transform: createStandardSkillTransform({
      sectionName: "Decision Tree Expected Value Branching Standards",
      ruSectionName: "Стандарты и регламенты: Decision Tree Expected Value Branching",
      instructions: [
        "Apply core domain tenets for Decision Tree Expected Value Branching.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Decision Tree Expected Value Branching.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","decision","tree"],
    }),
  },

  "reasoning-pareto-80-20-leverage-point-identification": {
    id: "reasoning-pareto-80-20-leverage-point-identification",
    name: "Pareto8020LeveragePointIdentificationSkill",
    displayName: "Pareto 80/20 Leverage Point Identification",
    categoryId: "reasoning",
    description: "Isolates the 20% of critical inputs driving 80% of desired system outcomes.",
    tags: ["reasoning","reasoning","pareto","80"],
    transform: createStandardSkillTransform({
      sectionName: "Pareto 80/20 Leverage Point Identification Standards",
      ruSectionName: "Стандарты и регламенты: Pareto 80/20 Leverage Point Identification",
      instructions: [
        "Apply core domain tenets for Pareto 80/20 Leverage Point Identification.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Pareto 80/20 Leverage Point Identification.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","pareto","80"],
    }),
  },

  "reasoning-hanlon-razor-misconception-disambiguation": {
    id: "reasoning-hanlon-razor-misconception-disambiguation",
    name: "HanlonRazorMisconceptionDisambiguationSkill",
    displayName: "Hanlon Razor Misconception Disambiguation",
    categoryId: "reasoning",
    description: "Attributes mistakes to incompetence or systemic noise rather than malice.",
    tags: ["reasoning","reasoning","hanlon","razor"],
    transform: createStandardSkillTransform({
      sectionName: "Hanlon Razor Misconception Disambiguation Standards",
      ruSectionName: "Стандарты и регламенты: Hanlon Razor Misconception Disambiguation",
      instructions: [
        "Apply core domain tenets for Hanlon Razor Misconception Disambiguation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hanlon Razor Misconception Disambiguation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","hanlon","razor"],
    }),
  },

  "reasoning-lindy-effect-longevity-forecasting": {
    id: "reasoning-lindy-effect-longevity-forecasting",
    name: "LindyEffectLongevityForecastingSkill",
    displayName: "Lindy Effect Longevity Forecasting",
    categoryId: "reasoning",
    description: "Predicts future technology lifespan based on past historical endurance.",
    tags: ["reasoning","reasoning","lindy","effect"],
    transform: createStandardSkillTransform({
      sectionName: "Lindy Effect Longevity Forecasting Standards",
      ruSectionName: "Стандарты и регламенты: Lindy Effect Longevity Forecasting",
      instructions: [
        "Apply core domain tenets for Lindy Effect Longevity Forecasting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Lindy Effect Longevity Forecasting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","lindy","effect"],
    }),
  },

  "reasoning-survivorship-bias-aircraft-armor-auditing": {
    id: "reasoning-survivorship-bias-aircraft-armor-auditing",
    name: "SurvivorshipBiasAircraftArmorAuditingSkill",
    displayName: "Survivorship Bias Aircraft Armor Auditing",
    categoryId: "reasoning",
    description: "Analyzes missing data from failed entities rather than only surviving successes.",
    tags: ["reasoning","reasoning","survivorship","bias"],
    transform: createStandardSkillTransform({
      sectionName: "Survivorship Bias Aircraft Armor Auditing Standards",
      ruSectionName: "Стандарты и регламенты: Survivorship Bias Aircraft Armor Auditing",
      instructions: [
        "Apply core domain tenets for Survivorship Bias Aircraft Armor Auditing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Survivorship Bias Aircraft Armor Auditing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","survivorship","bias"],
    }),
  },

  "reasoning-goodhart-law-metric-game-distortions": {
    id: "reasoning-goodhart-law-metric-game-distortions",
    name: "GoodhartLawMetricGameDistortionsSkill",
    displayName: "Goodhart Law Metric Game Distortions",
    categoryId: "reasoning",
    description: "Guards against metrics becoming bad targets when optimized explicitly.",
    tags: ["reasoning","reasoning","goodhart","law"],
    transform: createStandardSkillTransform({
      sectionName: "Goodhart Law Metric Game Distortions Standards",
      ruSectionName: "Стандарты и регламенты: Goodhart Law Metric Game Distortions",
      instructions: [
        "Apply core domain tenets for Goodhart Law Metric Game Distortions.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Goodhart Law Metric Game Distortions.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","goodhart","law"],
    }),
  },

  "reasoning-sorites-paradox-boundary-vagueness": {
    id: "reasoning-sorites-paradox-boundary-vagueness",
    name: "SoritesParadoxBoundaryVaguenessSkill",
    displayName: "Sorites Paradox Boundary Vagueness",
    categoryId: "reasoning",
    description: "Handles gradual incremental state transitions with vague threshold boundaries.",
    tags: ["reasoning","reasoning","sorites","paradox"],
    transform: createStandardSkillTransform({
      sectionName: "Sorites Paradox Boundary Vagueness Standards",
      ruSectionName: "Стандарты и регламенты: Sorites Paradox Boundary Vagueness",
      instructions: [
        "Apply core domain tenets for Sorites Paradox Boundary Vagueness.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sorites Paradox Boundary Vagueness.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","sorites","paradox"],
    }),
  },

  "reasoning-black-swan-high-impact-uncertainty": {
    id: "reasoning-black-swan-high-impact-uncertainty",
    name: "BlackSwanHighImpactUncertaintySkill",
    displayName: "Black Swan High-Impact Uncertainty",
    categoryId: "reasoning",
    description: "Prepares systems for extreme, low-probability, high-consequence events.",
    tags: ["reasoning","reasoning","black","swan"],
    transform: createStandardSkillTransform({
      sectionName: "Black Swan High-Impact Uncertainty Standards",
      ruSectionName: "Стандарты и регламенты: Black Swan High-Impact Uncertainty",
      instructions: [
        "Apply core domain tenets for Black Swan High-Impact Uncertainty.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Black Swan High-Impact Uncertainty.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","black","swan"],
    }),
  },

  "reasoning-popper-falsifiability-test-criteria": {
    id: "reasoning-popper-falsifiability-test-criteria",
    name: "PopperFalsifiabilityTestCriteriaSkill",
    displayName: "Popper Falsifiability Test Criteria",
    categoryId: "reasoning",
    description: "Ensures hypotheses propose concrete tests that could prove them wrong.",
    tags: ["reasoning","reasoning","popper","falsifiability"],
    transform: createStandardSkillTransform({
      sectionName: "Popper Falsifiability Test Criteria Standards",
      ruSectionName: "Стандарты и регламенты: Popper Falsifiability Test Criteria",
      instructions: [
        "Apply core domain tenets for Popper Falsifiability Test Criteria.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Popper Falsifiability Test Criteria.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","popper","falsifiability"],
    }),
  },

  "reasoning-sunk-cost-fallacy-decision-reset": {
    id: "reasoning-sunk-cost-fallacy-decision-reset",
    name: "SunkCostFallacyDecisionResetSkill",
    displayName: "Sunk Cost Fallacy Decision Reset",
    categoryId: "reasoning",
    description: "Ignores non-recoverable past investments when evaluating future choices.",
    tags: ["reasoning","reasoning","sunk","cost"],
    transform: createStandardSkillTransform({
      sectionName: "Sunk Cost Fallacy Decision Reset Standards",
      ruSectionName: "Стандарты и регламенты: Sunk Cost Fallacy Decision Reset",
      instructions: [
        "Apply core domain tenets for Sunk Cost Fallacy Decision Reset.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sunk Cost Fallacy Decision Reset.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","sunk","cost"],
    }),
  },

  "reasoning-tragedy-of-the-commons-shared-resource-logic": {
    id: "reasoning-tragedy-of-the-commons-shared-resource-logic",
    name: "TragedyoftheCommonsSharedResourceLogicSkill",
    displayName: "Tragedy of the Commons Shared Resource Logic",
    categoryId: "reasoning",
    description: "Models individual rational incentives leading to collective resource depletion.",
    tags: ["reasoning","reasoning","tragedy","of"],
    transform: createStandardSkillTransform({
      sectionName: "Tragedy of the Commons Shared Resource Logic Standards",
      ruSectionName: "Стандарты и регламенты: Tragedy of the Commons Shared Resource Logic",
      instructions: [
        "Apply core domain tenets for Tragedy of the Commons Shared Resource Logic.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Tragedy of the Commons Shared Resource Logic.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","tragedy","of"],
    }),
  },

  "reasoning-cobweb-model-market-price-oscillation": {
    id: "reasoning-cobweb-model-market-price-oscillation",
    name: "CobwebModelMarketPriceOscillationSkill",
    displayName: "Cobweb Model Market Price Oscillation",
    categoryId: "reasoning",
    description: "Analyzes supply-demand lag cycles causing price volatility over time.",
    tags: ["reasoning","reasoning","cobweb","model"],
    transform: createStandardSkillTransform({
      sectionName: "Cobweb Model Market Price Oscillation Standards",
      ruSectionName: "Стандарты и регламенты: Cobweb Model Market Price Oscillation",
      instructions: [
        "Apply core domain tenets for Cobweb Model Market Price Oscillation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cobweb Model Market Price Oscillation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","cobweb","model"],
    }),
  },

  "reasoning-campbell-law-metric-inflation-safeguard": {
    id: "reasoning-campbell-law-metric-inflation-safeguard",
    name: "CampbellLawMetricInflationSafeguardSkill",
    displayName: "Campbell Law Metric Inflation Safeguard",
    categoryId: "reasoning",
    description: "Protects quantitative indicators from corruption under high-stakes pressure.",
    tags: ["reasoning","reasoning","campbell","law"],
    transform: createStandardSkillTransform({
      sectionName: "Campbell Law Metric Inflation Safeguard Standards",
      ruSectionName: "Стандарты и регламенты: Campbell Law Metric Inflation Safeguard",
      instructions: [
        "Apply core domain tenets for Campbell Law Metric Inflation Safeguard.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Campbell Law Metric Inflation Safeguard.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","campbell","law"],
    }),
  },

  "reasoning-broken-window-theory-escalation-logic": {
    id: "reasoning-broken-window-theory-escalation-logic",
    name: "BrokenWindowTheoryEscalationLogicSkill",
    displayName: "Broken Window Theory Escalation Logic",
    categoryId: "reasoning",
    description: "Prevents minor unchecked flaws from encouraging widespread system decay.",
    tags: ["reasoning","reasoning","broken","window"],
    transform: createStandardSkillTransform({
      sectionName: "Broken Window Theory Escalation Logic Standards",
      ruSectionName: "Стандарты и регламенты: Broken Window Theory Escalation Logic",
      instructions: [
        "Apply core domain tenets for Broken Window Theory Escalation Logic.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Broken Window Theory Escalation Logic.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","broken","window"],
    }),
  },

  "reasoning-streisand-effect-suppression-rebound": {
    id: "reasoning-streisand-effect-suppression-rebound",
    name: "StreisandEffectSuppressionReboundSkill",
    displayName: "Streisand Effect Suppression Rebound",
    categoryId: "reasoning",
    description: "Anticipates how attempting to hide information amplifies public attention.",
    tags: ["reasoning","reasoning","streisand","effect"],
    transform: createStandardSkillTransform({
      sectionName: "Streisand Effect Suppression Rebound Standards",
      ruSectionName: "Стандарты и регламенты: Streisand Effect Suppression Rebound",
      instructions: [
        "Apply core domain tenets for Streisand Effect Suppression Rebound.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Streisand Effect Suppression Rebound.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","streisand","effect"],
    }),
  },

  "reasoning-overton-window-public-policy-shifting": {
    id: "reasoning-overton-window-public-policy-shifting",
    name: "OvertonWindowPublicPolicyShiftingSkill",
    displayName: "Overton Window Public Policy Shifting",
    categoryId: "reasoning",
    description: "Tracks acceptable range of ideas in political or corporate discourse.",
    tags: ["reasoning","reasoning","overton","window"],
    transform: createStandardSkillTransform({
      sectionName: "Overton Window Public Policy Shifting Standards",
      ruSectionName: "Стандарты и регламенты: Overton Window Public Policy Shifting",
      instructions: [
        "Apply core domain tenets for Overton Window Public Policy Shifting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Overton Window Public Policy Shifting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","overton","window"],
    }),
  },

  "reasoning-eichmann-banality-of-evil-structural-drift": {
    id: "reasoning-eichmann-banality-of-evil-structural-drift",
    name: "EichmannBanalityofEvilStructuralDriftSkill",
    displayName: "Eichmann Banality of Evil Structural Drift",
    categoryId: "reasoning",
    description: "Exposes how bureaucratic routine enables harmful systemic outcomes.",
    tags: ["reasoning","reasoning","eichmann","banality"],
    transform: createStandardSkillTransform({
      sectionName: "Eichmann Banality of Evil Structural Drift Standards",
      ruSectionName: "Стандарты и регламенты: Eichmann Banality of Evil Structural Drift",
      instructions: [
        "Apply core domain tenets for Eichmann Banality of Evil Structural Drift.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Eichmann Banality of Evil Structural Drift.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","eichmann","banality"],
    }),
  },

  "reasoning-jevons-paradox-efficiency-demand-spike": {
    id: "reasoning-jevons-paradox-efficiency-demand-spike",
    name: "JevonsParadoxEfficiencyDemandSpikeSkill",
    displayName: "Jevons Paradox Efficiency Demand Spike",
    categoryId: "reasoning",
    description: "Anticipates increased overall consumption as technology makes resource use cheaper.",
    tags: ["reasoning","reasoning","jevons","paradox"],
    transform: createStandardSkillTransform({
      sectionName: "Jevons Paradox Efficiency Demand Spike Standards",
      ruSectionName: "Стандарты и регламенты: Jevons Paradox Efficiency Demand Spike",
      instructions: [
        "Apply core domain tenets for Jevons Paradox Efficiency Demand Spike.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Jevons Paradox Efficiency Demand Spike.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","jevons","paradox"],
    }),
  },

  "reasoning-pascal-wager-infinite-expected-value": {
    id: "reasoning-pascal-wager-infinite-expected-value",
    name: "PascalWagerInfiniteExpectedValueSkill",
    displayName: "Pascal Wager Infinite Expected Value",
    categoryId: "reasoning",
    description: "Evaluates asymmetrical risk where potential loss is infinite.",
    tags: ["reasoning","reasoning","pascal","wager"],
    transform: createStandardSkillTransform({
      sectionName: "Pascal Wager Infinite Expected Value Standards",
      ruSectionName: "Стандарты и регламенты: Pascal Wager Infinite Expected Value",
      instructions: [
        "Apply core domain tenets for Pascal Wager Infinite Expected Value.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Pascal Wager Infinite Expected Value.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","pascal","wager"],
    }),
  },

  "reasoning-ship-of-theseus-identity-persistence": {
    id: "reasoning-ship-of-theseus-identity-persistence",
    name: "ShipofTheseusIdentityPersistenceSkill",
    displayName: "Ship of Theseus Identity Persistence",
    categoryId: "reasoning",
    description: "Maintains core architectural identity through complete component replacements.",
    tags: ["reasoning","reasoning","ship","of"],
    transform: createStandardSkillTransform({
      sectionName: "Ship of Theseus Identity Persistence Standards",
      ruSectionName: "Стандарты и регламенты: Ship of Theseus Identity Persistence",
      instructions: [
        "Apply core domain tenets for Ship of Theseus Identity Persistence.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Ship of Theseus Identity Persistence.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","ship","of"],
    }),
  },

  "reasoning-prisoner-dilemma-iterated-cooperation": {
    id: "reasoning-prisoner-dilemma-iterated-cooperation",
    name: "PrisonerDilemmaIteratedCooperationSkill",
    displayName: "Prisoner Dilemma Iterated Cooperation",
    categoryId: "reasoning",
    description: "Builds tit-for-tat strategies to foster long-term mutual trust in games.",
    tags: ["reasoning","reasoning","prisoner","dilemma"],
    transform: createStandardSkillTransform({
      sectionName: "Prisoner Dilemma Iterated Cooperation Standards",
      ruSectionName: "Стандарты и регламенты: Prisoner Dilemma Iterated Cooperation",
      instructions: [
        "Apply core domain tenets for Prisoner Dilemma Iterated Cooperation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Prisoner Dilemma Iterated Cooperation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","prisoner","dilemma"],
    }),
  },

  "reasoning-principle-of-explosion-false-premise-containment": {
    id: "reasoning-principle-of-explosion-false-premise-containment",
    name: "PrincipleofExplosionFalsePremiseContainmentSkill",
    displayName: "Principle of Explosion False Premise Containment",
    categoryId: "reasoning",
    description: "Prevents a single contradiction from destroying logical consistency.",
    tags: ["reasoning","reasoning","principle","of"],
    transform: createStandardSkillTransform({
      sectionName: "Principle of Explosion False Premise Containment Standards",
      ruSectionName: "Стандарты и регламенты: Principle of Explosion False Premise Containment",
      instructions: [
        "Apply core domain tenets for Principle of Explosion False Premise Containment.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Principle of Explosion False Premise Containment.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","principle","of"],
    }),
  },

  "reasoning-g-del-incompleteness-boundary-recognition": {
    id: "reasoning-g-del-incompleteness-boundary-recognition",
    name: "GdelIncompletenessBoundaryRecognitionSkill",
    displayName: "Gödel Incompleteness Boundary Recognition",
    categoryId: "reasoning",
    description: "Acknowledges inherent limitations in formal axiomatic systems.",
    tags: ["reasoning","reasoning","g","del"],
    transform: createStandardSkillTransform({
      sectionName: "Gödel Incompleteness Boundary Recognition Standards",
      ruSectionName: "Стандарты и регламенты: Gödel Incompleteness Boundary Recognition",
      instructions: [
        "Apply core domain tenets for Gödel Incompleteness Boundary Recognition.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Gödel Incompleteness Boundary Recognition.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","g","del"],
    }),
  },

  "reasoning-heisenberg-observer-effect-measurement-drift": {
    id: "reasoning-heisenberg-observer-effect-measurement-drift",
    name: "HeisenbergObserverEffectMeasurementDriftSkill",
    displayName: "Heisenberg Observer Effect Measurement Drift",
    categoryId: "reasoning",
    description: "Account for how measuring a process alters the behavior of the system.",
    tags: ["reasoning","reasoning","heisenberg","observer"],
    transform: createStandardSkillTransform({
      sectionName: "Heisenberg Observer Effect Measurement Drift Standards",
      ruSectionName: "Стандарты и регламенты: Heisenberg Observer Effect Measurement Drift",
      instructions: [
        "Apply core domain tenets for Heisenberg Observer Effect Measurement Drift.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Heisenberg Observer Effect Measurement Drift.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","heisenberg","observer"],
    }),
  },

  "reasoning-buridan-ass-indecision-disruption": {
    id: "reasoning-buridan-ass-indecision-disruption",
    name: "BuridanAssIndecisionDisruptionSkill",
    displayName: "Buridan Ass Indecision Disruption",
    categoryId: "reasoning",
    description: "Forces a choice between equally attractive options to avoid paralysis.",
    tags: ["reasoning","reasoning","buridan","ass"],
    transform: createStandardSkillTransform({
      sectionName: "Buridan Ass Indecision Disruption Standards",
      ruSectionName: "Стандарты и регламенты: Buridan Ass Indecision Disruption",
      instructions: [
        "Apply core domain tenets for Buridan Ass Indecision Disruption.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Buridan Ass Indecision Disruption.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","buridan","ass"],
    }),
  },

  "reasoning-dunning-kruger-competence-calibration": {
    id: "reasoning-dunning-kruger-competence-calibration",
    name: "DunningKrugerCompetenceCalibrationSkill",
    displayName: "Dunning-Kruger Competence Calibration",
    categoryId: "reasoning",
    description: "Adjusts self-assessment based on actual domain expertise metrics.",
    tags: ["reasoning","reasoning","dunning","kruger"],
    transform: createStandardSkillTransform({
      sectionName: "Dunning-Kruger Competence Calibration Standards",
      ruSectionName: "Стандарты и регламенты: Dunning-Kruger Competence Calibration",
      instructions: [
        "Apply core domain tenets for Dunning-Kruger Competence Calibration.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Dunning-Kruger Competence Calibration.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","dunning","kruger"],
    }),
  },

  "reasoning-zero-sum-vs-positive-sum-game-selection": {
    id: "reasoning-zero-sum-vs-positive-sum-game-selection",
    name: "ZeroSumvsPositiveSumGameSelectionSkill",
    displayName: "Zero-Sum vs Positive-Sum Game Selection",
    categoryId: "reasoning",
    description: "Reframes competitive conflicts into mutually beneficial win-win deals.",
    tags: ["reasoning","reasoning","zero","sum"],
    transform: createStandardSkillTransform({
      sectionName: "Zero-Sum vs Positive-Sum Game Selection Standards",
      ruSectionName: "Стандарты и регламенты: Zero-Sum vs Positive-Sum Game Selection",
      instructions: [
        "Apply core domain tenets for Zero-Sum vs Positive-Sum Game Selection.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Zero-Sum vs Positive-Sum Game Selection.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","zero","sum"],
    }),
  },

  "reasoning-conjunction-fallacy-probability-correction": {
    id: "reasoning-conjunction-fallacy-probability-correction",
    name: "ConjunctionFallacyProbabilityCorrectionSkill",
    displayName: "Conjunction Fallacy Probability Correction",
    categoryId: "reasoning",
    description: "Remembers that specific conditions are less probable than general ones.",
    tags: ["reasoning","reasoning","conjunction","fallacy"],
    transform: createStandardSkillTransform({
      sectionName: "Conjunction Fallacy Probability Correction Standards",
      ruSectionName: "Стандарты и регламенты: Conjunction Fallacy Probability Correction",
      instructions: [
        "Apply core domain tenets for Conjunction Fallacy Probability Correction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Conjunction Fallacy Probability Correction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","conjunction","fallacy"],
    }),
  },

  "reasoning-base-rate-neglect-prior-probability-anchor": {
    id: "reasoning-base-rate-neglect-prior-probability-anchor",
    name: "BaseRateNeglectPriorProbabilityAnchorSkill",
    displayName: "Base Rate Neglect Prior Probability Anchor",
    categoryId: "reasoning",
    description: "Incorporates background statistical frequencies before evaluating specific test data.",
    tags: ["reasoning","reasoning","base","rate"],
    transform: createStandardSkillTransform({
      sectionName: "Base Rate Neglect Prior Probability Anchor Standards",
      ruSectionName: "Стандарты и регламенты: Base Rate Neglect Prior Probability Anchor",
      instructions: [
        "Apply core domain tenets for Base Rate Neglect Prior Probability Anchor.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Base Rate Neglect Prior Probability Anchor.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","base","rate"],
    }),
  },

  "reasoning-regression-to-the-mean-statistical-normalization": {
    id: "reasoning-regression-to-the-mean-statistical-normalization",
    name: "RegressiontotheMeanStatisticalNormalizationSkill",
    displayName: "Regression to the Mean Statistical Normalization",
    categoryId: "reasoning",
    description: "Anticipates extreme outlier performances will naturally return toward average.",
    tags: ["reasoning","reasoning","regression","to"],
    transform: createStandardSkillTransform({
      sectionName: "Regression to the Mean Statistical Normalization Standards",
      ruSectionName: "Стандарты и регламенты: Regression to the Mean Statistical Normalization",
      instructions: [
        "Apply core domain tenets for Regression to the Mean Statistical Normalization.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Regression to the Mean Statistical Normalization.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","regression","to"],
    }),
  },

  "reasoning-survivorship-bias-historical-analysis": {
    id: "reasoning-survivorship-bias-historical-analysis",
    name: "SurvivorshipBiasHistoricalAnalysisSkill",
    displayName: "Survivorship Bias Historical Analysis",
    categoryId: "reasoning",
    description: "Examines failures alongside successes to avoid skewed historical conclusions.",
    tags: ["reasoning","reasoning","survivorship","bias"],
    transform: createStandardSkillTransform({
      sectionName: "Survivorship Bias Historical Analysis Standards",
      ruSectionName: "Стандарты и регламенты: Survivorship Bias Historical Analysis",
      instructions: [
        "Apply core domain tenets for Survivorship Bias Historical Analysis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Survivorship Bias Historical Analysis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","survivorship","bias"],
    }),
  },

  "reasoning-gambler-fallacy-independent-probability-check": {
    id: "reasoning-gambler-fallacy-independent-probability-check",
    name: "GamblerFallacyIndependentProbabilityCheckSkill",
    displayName: "Gambler Fallacy Independent Probability Check",
    categoryId: "reasoning",
    description: "Treats past random outcomes as independent from future coin flips.",
    tags: ["reasoning","reasoning","gambler","fallacy"],
    transform: createStandardSkillTransform({
      sectionName: "Gambler Fallacy Independent Probability Check Standards",
      ruSectionName: "Стандарты и регламенты: Gambler Fallacy Independent Probability Check",
      instructions: [
        "Apply core domain tenets for Gambler Fallacy Independent Probability Check.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Gambler Fallacy Independent Probability Check.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","gambler","fallacy"],
    }),
  },

  "reasoning-availability-heuristic-vividness-neutralization": {
    id: "reasoning-availability-heuristic-vividness-neutralization",
    name: "AvailabilityHeuristicVividnessNeutralizationSkill",
    displayName: "Availability Heuristic Vividness Neutralization",
    categoryId: "reasoning",
    description: "Weights statistical frequency higher than recent emotional memories.",
    tags: ["reasoning","reasoning","availability","heuristic"],
    transform: createStandardSkillTransform({
      sectionName: "Availability Heuristic Vividness Neutralization Standards",
      ruSectionName: "Стандарты и регламенты: Availability Heuristic Vividness Neutralization",
      instructions: [
        "Apply core domain tenets for Availability Heuristic Vividness Neutralization.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Availability Heuristic Vividness Neutralization.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","availability","heuristic"],
    }),
  },

  "reasoning-framing-effect-semantic-neutrality-reset": {
    id: "reasoning-framing-effect-semantic-neutrality-reset",
    name: "FramingEffectSemanticNeutralityResetSkill",
    displayName: "Framing Effect Semantic Neutrality Reset",
    categoryId: "reasoning",
    description: "Evaluates information independently of whether it is presented positively or negatively.",
    tags: ["reasoning","reasoning","framing","effect"],
    transform: createStandardSkillTransform({
      sectionName: "Framing Effect Semantic Neutrality Reset Standards",
      ruSectionName: "Стандарты и регламенты: Framing Effect Semantic Neutrality Reset",
      instructions: [
        "Apply core domain tenets for Framing Effect Semantic Neutrality Reset.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Framing Effect Semantic Neutrality Reset.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","framing","effect"],
    }),
  },

  "reasoning-false-dilemma-binary-choice-expansion": {
    id: "reasoning-false-dilemma-binary-choice-expansion",
    name: "FalseDilemmaBinaryChoiceExpansionSkill",
    displayName: "False Dilemma Binary Choice Expansion",
    categoryId: "reasoning",
    description: "Identifies third and fourth hidden alternatives beyond rigid black-and-white options.",
    tags: ["reasoning","reasoning","false","dilemma"],
    transform: createStandardSkillTransform({
      sectionName: "False Dilemma Binary Choice Expansion Standards",
      ruSectionName: "Стандарты и регламенты: False Dilemma Binary Choice Expansion",
      instructions: [
        "Apply core domain tenets for False Dilemma Binary Choice Expansion.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для False Dilemma Binary Choice Expansion.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","false","dilemma"],
    }),
  },

  "reasoning-straw-man-argument-steelmanning-elevation": {
    id: "reasoning-straw-man-argument-steelmanning-elevation",
    name: "StrawManArgumentSteelmanningElevationSkill",
    displayName: "Straw Man Argument Steelmanning Elevation",
    categoryId: "reasoning",
    description: "Reframes opponent arguments in their strongest possible form before critique.",
    tags: ["reasoning","reasoning","straw","man"],
    transform: createStandardSkillTransform({
      sectionName: "Straw Man Argument Steelmanning Elevation Standards",
      ruSectionName: "Стандарты и регламенты: Straw Man Argument Steelmanning Elevation",
      instructions: [
        "Apply core domain tenets for Straw Man Argument Steelmanning Elevation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Straw Man Argument Steelmanning Elevation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["reasoning","reasoning","straw","man"],
    }),
  },
};
