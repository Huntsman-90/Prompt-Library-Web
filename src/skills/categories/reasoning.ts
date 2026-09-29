import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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
};
