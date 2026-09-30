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
};
