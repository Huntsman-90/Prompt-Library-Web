import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const REASONING_SKILLS: Record<string, SkillDefinition> = {
  'chain-of-thought': {
    id: 'chain-of-thought',
    name: 'ChainOfThoughtSkill',
    displayName: 'Step-by-Step Chain-of-Thought (CoT)',
    categoryId: 'reasoning',
    description: 'Enforces transparent, sequential logical derivation with explicit cause-and-effect transitions.',
    tags: ['reasoning', 'cot', 'logic', 'step-by-step', 'deduction'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Процесс Пошагового Рассуждения (Chain-of-Thought)',
        'Step-by-Step Reasoning Protocol (Chain-of-Thought)',
        [
          '1. **Декомпозиция вводных**: Разбить исходные данные на проверяемые факты и неизвестные переменные.',
          '2. **Промежуточные шаги дедукции**: Выполнять каждое логическое рассуждение последовательно, фиксируя промежуточный результат.',
          '3. **Проверка непротиворечивости**: Перед финальным выводом перепроверить цепь умозаключений на отсутствие логических пробелов.',
        ],
        [
          '1. **Deconstruct Inputs**: Partition given problem into established invariants and dynamic unknowns.',
          '2. **Sequential Derivation**: Execute logical deductions step-by-step, validating intermediate outputs.',
          '3. **Consistency Verification**: Audit causal chain against edge conditions before synthesizing conclusion.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'tree-of-thoughts': {
    id: 'tree-of-thoughts',
    name: 'TreeOfThoughtsSkill',
    displayName: 'Tree-of-Thoughts (ToT) Branching & Pruning',
    categoryId: 'reasoning',
    description: 'Explores multiple architectural hypotheses, scores trade-offs, and prunes suboptimal branches.',
    tags: ['reasoning', 'tot', 'tree', 'branching', 'pruning', 'hypotheses'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Исследование Ветвей Решений (Tree-of-Thoughts)',
        'Tree-of-Thoughts (ToT) Exploration & Pruning',
        [
          '- **Генерация 3 альтернативных путей (Ветви А, Б, В)**: Сформулировать три концептуально разных подхода к решению.',
          '- **Матрица оценки компромиссов**: Оценить каждую ветвь по критериям: сложность, масштабируемость, безопасность, сроки.',
          '- **Отсечение и финальный выбор (Pruning)**: Явно аргументировать, почему отвергнуты худшие ветви, и выбрать оптимальную.',
        ],
        [
          '- **Branch Exploration (Branches A, B, C)**: Formulate 3 fundamentally distinct architectural hypotheses.',
          '- **Trade-Off Scoring Matrix**: Score each branch across complexity, scalability, security, and delivery velocity.',
          '- **Pruning & Strategic Convergence**: Explicitly justify rejected branches and converge on optimal path.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'first-principles': {
    id: 'first-principles',
    name: 'FirstPrinciplesSkill',
    displayName: 'First-Principles Deconstruction',
    categoryId: 'reasoning',
    description: 'Strips away superficial analogies and conventional wisdom to derive optimal solutions from axiomatic truths.',
    tags: ['reasoning', 'first-principles', 'axioms', 'physics', 'fundamentals'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Анализ из Первооснов (First Principles Reasoning)',
        'First-Principles Deconstruction Protocol',
        [
          '- **Очистка от чужих аналогий**: Игнорировать «как принято делать в отрасли»; свести задачу к фундаментальным физическим/вычислительным ограничениям.',
          '- **Аксиоматический базис**: Зафиксировать 2-3 непреложных закона системы (пропускная способность сети, емкость памяти, транзакционные блокировки).',
          '- **Синтез с нуля**: Построить архитектуру снизу вверх, исходя только из аксиом.',
        ],
        [
          '- **Analogical Stripping**: Reject status-quo convention; reduce problem strictly to fundamental compute and physical bounds.',
          '- **Axiomatic Baseline**: Identify immutable invariants (network latency, memory hierarchy, serialized locking).',
          '- **Bottom-Up Synthesis**: Construct target architecture strictly derived from underlying axioms.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'inversion-thinking': {
    id: 'inversion-thinking',
    name: 'InversionThinkingSkill',
    displayName: 'Inversion Thinking & Pre-Mortem Audit',
    categoryId: 'reasoning',
    description: 'Simulates total catastrophic failure upfront to pre-emptively engineer bulletproof resilience.',
    tags: ['reasoning', 'inversion', 'pre-mortem', 'failure-modes', 'resilience'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Инверсивный Анализ и Pre-Mortem',
        'Inversion Thinking & Pre-Mortem Protocol',
        [
          '- **Сценарий гарантированного провала**: Сформулировать 3 условия, при которых создаваемое решение катастрофически сломается в проде.',
          '- **Превентивные инженерные меры**: Для каждого сценария провала внедрить контрмеру (таймаут, circuit breaker, лимит ресурсов, retry-политика).',
        ],
        [
          '- **Catastrophic Failure Modeling**: Formulate 3 distinct failure vectors that guarantee production outage.',
          '- **Pre-emptive Remediation**: Engineer explicit safeguards (timeouts, circuit breakers, backpressure, retries) for each vector.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'graph-of-thoughts': {
    id: 'graph-of-thoughts',
    name: 'GraphOfThoughtsSkill',
    displayName: 'Graph-of-Thoughts (GoT) Network Synthesis',
    categoryId: 'reasoning',
    description: 'Models complex reasoning as arbitrary graph networks with cyclical refinement and synthesis loops.',
    tags: ['reasoning', 'got', 'graph', 'network', 'synthesis'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Сетевой Граф Рассуждений (Graph-of-Thoughts)',
        'Graph-of-Thoughts (GoT) Network Reasoning',
        [
          '- Моделировать мысли как узлы направленного графа, объединяя идеи из независимых аналитических кластеров.',
          '- Выполнять слияние (merge) сильных сторон разных гипотез для получения синергетического решения.',
        ],
        [
          '- Model intermediate thoughts as vertices in an interconnected dependency graph.',
          '- Execute topological graph merges combining complementary strengths of disparate hypotheses.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'socratic-deconstruction': {
    id: 'socratic-deconstruction',
    name: 'SocraticDeconstructionSkill',
    displayName: 'Socratic Dialectic Questioning',
    categoryId: 'reasoning',
    description: 'Interrogates assumptions through probing dialectic inquiries to reveal latent contradictions.',
    tags: ['reasoning', 'socratic', 'dialectic', 'contradictions', 'inquiry'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Сократовский Анализ Противоречий',
        'Socratic Dialectic Deconstruction',
        [
          '- Задать 3 глубоких проверочных вопроса к исходным вводным, вскрывающих скрытые противоречия.',
          '- Разрешить выявленные противоречия до перехода к генерации конечного кода/текста.',
        ],
        [
          '- Formulate 3 probing dialectical questions challenging underlying premise validity.',
          '- Reconcile identified contradictions prior to emitting final architecture or text.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'probabilistic-bayesian': {
    id: 'probabilistic-bayesian',
    name: 'ProbabilisticBayesianSkill',
    displayName: 'Bayesian Probabilistic Updating',
    categoryId: 'reasoning',
    description: 'Weighs confidence levels with explicit prior probabilities and updates hypotheses based on evidence.',
    tags: ['reasoning', 'bayesian', 'probability', 'evidence', 'priors'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Байесовский Вероятностный Анализ',
        'Bayesian Probabilistic Reasoning',
        [
          '- Зафиксировать априорные вероятности (priors) успеха каждого сценария.',
          '- Обновить вероятность (posterior) с учетом поступающих технических и рыночных фактов.',
          '- Явно указывать доверительный интервал (confidence score: 0-100%) для каждого вывода.',
        ],
        [
          '- Quantify prior probabilities for competing operational outcomes.',
          '- Update posterior confidence dynamically as empirical evidence and constraints are integrated.',
          '- Provide explicit confidence scoring (0-100%) for critical deductions.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'occams-razor': {
    id: 'occams-razor',
    name: 'OccamsRazorSkill',
    displayName: 'Occam\'s Razor Simplicity Bias',
    categoryId: 'reasoning',
    description: 'Aggressively selects the solution with the fewest assumptions and lowest moving part count.',
    tags: ['reasoning', 'occams-razor', 'simplicity', 'minimalism'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Принцип Бритвы Оккама (Минимизация Сложности)',
        'Occam\'s Razor & Minimal Complexity Filter',
        [
          '- При равенстве результатов предпочесть архитектуру с наименьшим числом сервисов, таблиц и зависимостей.',
          '- Безжалостно отрезать оверинжиниринг: никаких абстракций «на будущее», если они не нужны сегодня.',
        ],
        [
          '- When evaluating equivalent solutions, mandate the path with minimal moving parts and zero premature abstractions.',
          '- Ruthlessly prune speculative complexity and ungrounded future-proofing.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'abductive-reasoning': {
    id: 'abductive-reasoning',
    name: 'AbductiveReasoningSkill',
    displayName: 'Abductive Inference to Best Explanation',
    categoryId: 'reasoning',
    description: 'Forms the most plausible and robust hypothesis from incomplete, noisy, or anomalous observation telemetry.',
    tags: ['reasoning', 'abduction', 'hypothesis', 'telemetry', 'inference'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Абдуктивный Вывод (Inference to Best Explanation)',
        'Abductive Inference & Plausibility Ranking',
        [
          '- Собрать разрозненные симптомы и аномалии в единую согласованную гипотезу.',
          '- Ранжировать конкурирующие объяснения по степени правдоподобия и соответствия логам.',
        ],
        [
          '- Synthesize disparate anomalies and symptoms into a cohesive, testable hypothesis.',
          '- Rank candidate explanations by plausibility and alignment with telemetry footprints.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'counterfactual-derivation': {
    id: 'counterfactual-derivation',
    name: 'CounterfactualDerivationSkill',
    displayName: 'Counterfactual & What-If Stress Testing',
    categoryId: 'reasoning',
    description: 'Simulates alternate reality branches («What if X had not occurred?») to isolate true causal dependencies.',
    tags: ['reasoning', 'counterfactual', 'what-if', 'causality'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Контрфактический Анализ (What-If Analysis)',
        'Counterfactual & Causal Dependency Derivation',
        [
          '- Смоделировать 2 сценария «Что, если»: при изменении одного ключевого входного параметра.',
          '- Изолировать истинную причинно-следственную связь от случайных корреляций.',
        ],
        [
          '- Model 2 counterfactual "What-If" scenarios by perturbing a single critical variable.',
          '- Isolate genuine causal mechanisms from spurious statistical correlations.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'deductive-formal-logic': {
    id: 'deductive-formal-logic',
    name: 'DeductiveFormalLogicSkill',
    displayName: 'Deductive Formal Logic & Syllogisms',
    categoryId: 'reasoning',
    description: 'Applies rigorous Boolean and predicate logic rules to prove theorem-level correctness.',
    tags: ['reasoning', 'deduction', 'formal-logic', 'syllogism', 'proof'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Дедуктивная Формальная Логика',
        'Deductive Formal Logic & Proof Invariants',
        [
          '- Сформулировать посылки (premises) и строго доказать итоговый вывод без логических скачков (non sequitur).',
          '- Проверить отсутствие логических ошибок: ложная дилемма, подмена понятий, круговая аргументация.',
        ],
        [
          '- Establish explicit premises and prove conclusions via formal deductive syllogisms.',
          '- Audit derivation against formal logical fallacies (circular reasoning, false dichotomy, non-sequitur).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'reductio-ad-absurdum': {
    id: 'reductio-ad-absurdum',
    name: 'ReductioAdAbsurdumSkill',
    displayName: 'Reductio Ad Absurdum Proof',
    categoryId: 'reasoning',
    description: 'Assumes the opposite of the premise to demonstrate an impossible contradiction, proving the core theorem.',
    tags: ['reasoning', 'reductio', 'proof-by-contradiction', 'logic'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Доказательство от Противного (Reductio Ad Absurdum)',
        'Proof by Contradiction (Reductio Ad Absurdum)',
        [
          '- Допустить истинность противоположного решения и продемонстрировать неизбежный математический или системный коллапс.',
        ],
        [
          '- Assume the converse of target theorem to demonstrate systemic or mathematical impossibility.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'dialectical-synthesis': {
    id: 'dialectical-synthesis',
    name: 'DialecticalSynthesisSkill',
    displayName: 'Hegelian Dialectical Synthesis (Thesis-Antithesis)',
    categoryId: 'reasoning',
    description: 'Pits Thesis against Antithesis to forge a higher-order Synthesis that transcends initial trade-offs.',
    tags: ['reasoning', 'dialectics', 'synthesis', 'hegel', 'trade-offs'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Диалектический Синтез (Тезис — Антитезис — Синтез)',
        'Dialectical Synthesis (Thesis -> Antithesis -> Synthesis)',
        [
          '- **Тезис**: Обосновать сильные стороны базового решения.',
          '- **Антитезис**: Представить сильные стороны прямо противоположного решения.',
          '- **Синтез**: Сконструировать гибридное решение высшего порядка, устраняющее фундаментальный компромисс.',
        ],
        [
          '- **Thesis**: Articulate core strengths of incumbent approach.',
          '- **Antithesis**: Articulate fundamental critique and opposing paradigm.',
          '- **Synthesis**: Construct higher-order hybrid architecture resolving the underlying dichotomy.',
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
    description: 'Deconstructs large-scale quantitative problems into fast order-of-magnitude back-of-the-envelope calculations.',
    tags: ['reasoning', 'fermi', 'estimation', 'capacity-planning', 'math'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Оценка Порядка Величин (Fermi Back-of-the-Envelope)',
        'Fermi Order-of-Magnitude Estimation Protocol',
        [
          '- Разбить расчет пропускной способности / емкости на базовые множители (RPS * payload_size * retention_days).',
          '- Привести расчеты для 3 сценариев: Base (норма), Peak (пик 5x), Black Swan (экстремальный всплеск 20x).',
        ],
        [
          '- Deconstruct capacity estimations into discrete arithmetic factors (RPS * payload * retention).',
          '- Provide order-of-magnitude calculations across 3 tiers: Baseline, Peak (5x), and Extreme Black Swan (20x).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'analogical-mapping': {
    id: 'analogical-mapping',
    name: 'AnalogicalMappingSkill',
    displayName: 'Deep Structural Cross-Domain Analogies',
    categoryId: 'reasoning',
    description: 'Transfers structural solution patterns from biology, physics, or aviation to complex software architectures.',
    tags: ['reasoning', 'analogy', 'cross-domain', 'isomorphism', 'architecture'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Междоменное Аналогическое Моделирование',
        'Cross-Domain Structural Isomorphism',
        [
          '- Использовать проверенную системную модель из другой дисциплины (авионика, биологический иммунитет, логистика).',
          '- Провести строгое поэлементное сопоставление (mapping) между сущностями аналогии и компонентами целевой системы.',
        ],
        [
          '- Leverage proven structural paradigms from adjacent disciplines (avionics fail-safes, cellular immunity, logistics).',
          '- Establish rigorous 1-to-1 isomorphic mapping between source domain mechanisms and target software components.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
