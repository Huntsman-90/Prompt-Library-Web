import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const ANALYSIS_SKILLS: Record<string, SkillDefinition> = {
  'root-cause-analysis': {
    id: 'root-cause-analysis',
    name: 'RootCauseAnalysisSkill',
    displayName: '5 Whys Root Cause Analysis (RCA)',
    categoryId: 'analysis',
    description: 'Drills down through 5 levels of causality to isolate the systemic defect behind the visible failure.',
    tags: ['analysis', 'rca', '5-whys', 'incident', 'root-cause', 'sre'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Системный Анализ Первопричин (5 Whys RCA)',
        'Systemic Root Cause Analysis (5 Whys RCA)',
        [
          '1. **Видимый симптом**: Зафиксировать внешнее проявление сбоя и затронутые метрики.',
          '2. **Цепочка «Почему 1 -> Почему 5»**: Последовательно спуститься от симптома к архитектурному изъяну.',
          '3. **Разграничение триггера и первопричины**: Не путать непосредственный повод (триггер) с глубинной уязвимостью системы.',
          '4. **Системные слепые зоны**: Выявить пробелы в тестах, мониторинге или лимитах ресурсов.',
        ],
        [
          '1. **Surface Symptom**: Capture the visible failure mode and breached SLO metrics.',
          '2. **5-Whys Causal Derivation**: Progress sequentially from symptom to systemic vulnerability.',
          '3. **Trigger vs Root Cause**: Differentiate the immediate catalyst from the underlying defect.',
          '4. **Systemic Blindspots**: Audit gaps in telemetry, unit testing, or automated circuit breakers.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'gap-analysis': {
    id: 'gap-analysis',
    name: 'GapAnalysisSkill',
    displayName: 'Gap Analysis Framework (As-Is vs To-Be)',
    categoryId: 'analysis',
    description: 'Structures delta evaluation between Current State and Desired Target with bridge initiatives.',
    tags: ['analysis', 'gap', 'as-is', 'to-be', 'strategy', 'roadmap'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Анализ Разрывов (Gap Analysis: As-Is vs To-Be)',
        'Gap Analysis Framework (As-Is vs To-Be)',
        [
          '| Измерение / Область | Текущее Состояние (As-Is) | Целевое Состояние (To-Be) | Выявленный Разрыв (Gap) | Меры Устранения |',
          '|---|---|---|---|---|',
          '| Архитектура & Процессы | [[текущее_состояние]] | [[целевое_состояние]] | [[дельта_разрыва]] | [[инициатива_моста]] |',
        ],
        [
          '| Dimension | Current State (As-Is) | Target State (To-Be) | Identified Gap | Bridge Initiative |',
          '|---|---|---|---|---|',
          '| Architecture & Capability | [[current_state]] | [[target_state]] | [[gap_delta]] | [[bridge_action]] |',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'swot-to-tows': {
    id: 'swot-to-tows',
    name: 'SWOTToTOWSSkill',
    displayName: 'SWOT to TOWS Action Matrix',
    categoryId: 'analysis',
    description: 'Converts descriptive SWOT factors into actionable strategic initiatives (SO, ST, WO, WT).',
    tags: ['analysis', 'swot', 'tows', 'action-matrix', 'strategy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Стратегическая Матрица TOWS',
        'TOWS Strategic Action Matrix',
        [
          '- **SO (Maxi-Maxi)**: Как использовать внутренние силы для максимизации внешних возможностей?',
          '- **ST (Maxi-Mini)**: Как использовать сильные стороны для нейтрализации рыночных угроз?',
          '- **WO (Mini-Maxi)**: Как минимизировать слабые стороны за счет открывающихся возможностей?',
          '- **WT (Mini-Mini)**: План защиты: как минимизировать уязвимости и отразить экзистенциальные риски?',
        ],
        [
          '- **SO Strategies (Maxi-Maxi)**: Deploy internal strengths to aggressively capitalize on external opportunities.',
          '- **ST Strategies (Maxi-Mini)**: Leverage core competencies to neutralize external competitive threats.',
          '- **WO Strategies (Mini-Maxi)**: Mitigate internal weaknesses by taking advantage of favorable tailwinds.',
          '- **WT Strategies (Mini-Mini)**: Defensive posture: Minimize internal structural deficits and avoid existential threats.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'cost-of-inaction': {
    id: 'cost-of-inaction',
    name: 'CostOfInactionSkill',
    displayName: 'Cost of Inaction (COI) & Blast Radius',
    categoryId: 'analysis',
    description: 'Quantifies financial burn, technical debt compounding, and status-quo inertia.',
    tags: ['analysis', 'coi', 'risk', 'financial', 'blast-radius'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Оценка Цены Бездействия (Cost of Inaction)',
        'Cost of Inaction (COI) & Blast Radius Analysis',
        [
          '- **Прямой финансовый ущерб**: Оценить потери выручки, рост затрат на поддержку и штрафы за нарушение SLA.',
          '- **Куммулятивный технический долг**: Рассчитать мультипликативный эффект от откладывания рефакторинга/исправления.',
          '- **Стратегические и репутационные риски**: Оценить отток пользователей и потерю конкурентного преимущества.',
        ],
        [
          '- **Direct Financial Impact**: Quantify immediate revenue burn, inflated compute costs, and SLA breach liabilities.',
          '- **Compound Technical Debt**: Measure compounding friction on velocity and refactoring costs caused by status-quo inertia.',
          '- **Strategic & Reputational Blast Radius**: Assess customer churn velocity and defensibility erosion.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'timeline-reconstruction': {
    id: 'timeline-reconstruction',
    name: 'TimelineReconstructionSkill',
    displayName: 'Incident Timeline Reconstruction (T0-T3)',
    categoryId: 'analysis',
    description: 'Reconstructs a deterministic incident chronology from T0 (Trigger) through T1 (Detection), T2 (Mitigation), and T3 (Steady-State Resolution).',
    tags: ['analysis', 'timeline', 'incident', 'sre', 'retrospective', 'chronology'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Хронология Инцидента (Timeline Reconstruction)',
        'Incident Timeline Reconstruction (T0-T3)',
        [
          '- **T0 (Триггер / Начало сбоя)**: Точный момент деградации, деплоя или аппаратного сбоя.',
          '- **T1 (Обнаружение / Alert)**: Срабатывание мониторинга, канал эскалации и зафиксированные метрики SLO/SLA.',
          '- **T2 (Локализация и Купирование)**: Временные меры (workaround) для остановки разрастания радиуса поражения.',
          '- **T3 (Полное Восстановление)**: Время возвращения всех систем в штатный режим работы и верификация телеметрии.',
        ],
        [
          '- **T0 (Trigger / Point of Origin)**: Initial defect injection, deployment, or hardware degradation timestamp.',
          '- **T1 (Detection / Alert)**: Monitoring trigger, escalation vector, and breached SLI thresholds.',
          '- **T2 (Mitigation / Triage)**: Containment actions and workarounds applied to stop blast radius expansion.',
          '- **T3 (Full Resolution)**: Permanent fix deployment and steady-state telemetry verification.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'failure-modes-effects-analysis': {
    id: 'failure-modes-effects-analysis',
    name: 'FailureModesEffectsAnalysisSkill',
    displayName: 'Failure Mode & Effects Analysis (FMEA)',
    categoryId: 'analysis',
    description: 'Calculates Risk Priority Numbers (RPN = Severity * Occurrence * Detection) to rank system hazards.',
    tags: ['analysis', 'fmea', 'rpn', 'risk', 'reliability', 'safety'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Матрица FMEA (Failure Mode and Effects Analysis)',
        'Failure Mode & Effects Analysis (FMEA) Matrix',
        [
          '| Режим Отказа | Тяжесть (S: 1-10) | Вероятность (O: 1-10) | Обнаруживаемость (D: 1-10) | RPN (S*O*D) | Меры Купирования |',
          '|---|:---:|:---:|:---:|:---:|---|',
          '| Сбой кэша Redis | 9 | 4 | 2 | 72 | Circuit breaker + fallback на реплику |',
        ],
        [
          '| Failure Mode | Severity (S: 1-10) | Occurrence (O: 1-10) | Detection (D: 1-10) | RPN (S*O*D) | Mitigation Directive |',
          '|---|:---:|:---:|:---:|:---:|---|',
          '| Redis Cache Stampede | 9 | 4 | 2 | 72 | Distributed locking + probabilistic early refresh |',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'pestel-macro-environment': {
    id: 'pestel-macro-environment',
    name: 'PESTELMacroEnvironmentSkill',
    displayName: 'PESTEL Macro-Environmental Audit',
    categoryId: 'analysis',
    description: 'Evaluates macro environmental factors: Political, Economic, Social, Technological, Environmental, Legal.',
    tags: ['analysis', 'pestel', 'macro', 'strategy', 'environment'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Анализ Макроокружения PESTEL',
        'PESTEL Macro-Environmental Analysis',
        [
          '- **Political / Economic**: Регуляторная стабильность, инфляция, динамика инвестиций.',
          '- **Social / Technological**: Поведение пользователей, тренды генеративного AI, облачные стандарты.',
          '- **Environmental / Legal**: Углеродный след вычислений, соответствие GDPR/AI Act.',
        ],
        [
          '- **Political & Economic**: Regulatory sovereignty, interest rates, infrastructure funding.',
          '- **Social & Technological**: Behavioral shifts, generative AI velocity, compute standards.',
          '- **Environmental & Legal**: Data residency statutes, EU AI Act compliance, ESG benchmarks.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'five-forces-competitive': {
    id: 'five-forces-competitive',
    name: 'FiveForcesCompetitiveSkill',
    displayName: 'Porter\'s Five Forces Competitive Engine',
    categoryId: 'analysis',
    description: 'Assesses competitive intensity: Rivalry, Supplier Power, Buyer Power, Threat of Substitutes, and New Entrants.',
    tags: ['analysis', 'porter', 'five-forces', 'competition', 'strategy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Анализ 5 Сил Портера (Porter\'s Five Forces)',
        'Porter\'s Five Forces Industry Assessment',
        [
          '1. **Угроза новых игроков**: Барьеры входа и стартовые капвложения.',
          '2. **Власть поставщиков**: Зависимость от ключевых облачных/LLM провайдеров.',
          '3. **Власть покупателей**: Стоимость переключения на конкурентов.',
          '4. **Угроза товаров-субститутов**: Альтернативные способы решения проблемы.',
          '5. **Внутриотраслевая конкуренция**: Ценовое и продуктовое давление соперников.',
        ],
        [
          '1. **Threat of New Entrants**: Capital moats and API network effects.',
          '2. **Bargaining Power of Suppliers**: Upstream cloud compute & foundation model concentration.',
          '3. **Bargaining Power of Buyers**: Customer switching friction and alternative substitutes.',
          '4. **Threat of Substitutes**: Open-source vs managed proprietary alternatives.',
          '5. **Industry Rivalry**: Price elasticity and feature parity compression.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'pareto-principle-8020': {
    id: 'pareto-principle-8020',
    name: 'ParetoPrinciple8020Skill',
    displayName: '80/20 Pareto Leverage Analysis',
    categoryId: 'analysis',
    description: 'Identifies the 20% of high-leverage drivers that generate 80% of systemic impact and ROI.',
    tags: ['analysis', 'pareto', '80-20', 'leverage', 'roi', 'focus'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Анализ Высокорычажных Факторов (Принцип Парето 80/20)',
        'Pareto 80/20 High-Leverage Analysis',
        [
          '- Выделить 20% ключевых дефектов/функций, создающих 80% проблем или бизнес-выручки.',
          '- Сфокусировать инженерные ресурсы исключительно на этих критических рычагах.',
        ],
        [
          '- Identify the 20% vital root causes or architectural features driving 80% of business/systemic impact.',
          '- Concentrate operational bandwidth exclusively on high-leverage intervention points.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'tradeoff-sensitivity-matrix': {
    id: 'tradeoff-sensitivity-matrix',
    name: 'TradeoffSensitivityMatrixSkill',
    displayName: 'Trade-off & Sensitivity Analysis Matrix',
    categoryId: 'analysis',
    description: 'Tests how critical system parameters fluctuate when underlying operational variables are stretched.',
    tags: ['analysis', 'sensitivity', 'trade-offs', 'modeling', 'parameters'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Анализ Чувствительности к Изменениям (Sensitivity Matrix)',
        'Sensitivity & Parameter Fluctuation Matrix',
        [
          '- Смоделировать поведение системы при изменении ключевых переменных на +/- 50% и +/- 200%.',
          '- Определить критическую точку перегиба (tipping point), при которой наступает отказ.',
        ],
        [
          '- Model architectural performance when core workload parameters fluctuate by +/-50% and +/-200%.',
          '- Pinpoint the mathematical tipping point where system degradation shifts from linear to catastrophic.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'blast-radius-assessment': {
    id: 'blast-radius-assessment',
    name: 'BlastRadiusAssessmentSkill',
    displayName: 'Blast Radius & Failure Containment Audit',
    categoryId: 'analysis',
    description: 'Maps the cascading failure propagation path across interconnected services, databases, and users.',
    tags: ['analysis', 'blast-radius', 'cascade', 'containment', 'sre'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Оценка Радиуса Поражения (Blast Radius Mapping)',
        'Blast Radius & Failure Domain Mapping',
        [
          '- **Прямое поражение (Tier 1)**: Непосредственно упавшие микросервисы и таблицы.',
          '- **Каскадное поражение (Tier 2)**: Заблокированные зависимые очереди, шлюзы и пулы соединений.',
          '- **Изолирующие барьеры**: Проверить наличие bulkhead-изоляции между арендаторами.',
        ],
        [
          '- **Primary Blast Radius (Tier 1)**: Directly degraded service instances and database connections.',
          '- **Cascading Blast Radius (Tier 2)**: Blocked downstream worker queues and starved connection pools.',
          '- **Bulkhead Verification**: Validate tenant isolation boundaries to guarantee containment.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'bottleneck-identification': {
    id: 'bottleneck-identification',
    name: 'BottleneckIdentificationSkill',
    displayName: 'Theory of Constraints Bottleneck Audit',
    categoryId: 'analysis',
    description: 'Applies Goldratt\'s Theory of Constraints to locate and exploit the single throughput-limiting bottleneck.',
    tags: ['analysis', 'bottleneck', 'toc', 'throughput', 'goldratt'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Поиск Узких Мест (Теория Ограничений Голдратта)',
        'Theory of Constraints Bottleneck Discovery',
        [
          '1. **Идентификация ограничения**: Найти компонент с наименьшей пропускной способностью (CPU, I/O, DB locks).',
          '2. **Максимизация использования (Exploit)**: Устранить нецелевые нагрузки на узкое место.',
          '3. **Подчинение системы (Subordinate)**: Замедлить генерацию входящих задач до темпа узкого места.',
        ],
        [
          '1. **Locate Constraint**: Identify the single subsystem with minimum throughput capacity.',
          '2. **Exploit Constraint**: Ensure zero idle time and purge non-critical load from the bottleneck.',
          '3. **Subordinate Workflow**: Throttle upstream producers to match bottleneck processing velocity.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'cohort-behavior-delta': {
    id: 'cohort-behavior-delta',
    name: 'CohortBehaviorDeltaSkill',
    displayName: 'Cohort Behavior & Retention Delta',
    categoryId: 'analysis',
    description: 'Compares engagement, conversion, and retention curves across distinct user cohorts.',
    tags: ['analysis', 'cohorts', 'retention', 'metrics', 'analytics'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Когортный Анализ Поведения (Cohort Delta)',
        'Cohort Behavioral & Retention Analysis',
        [
          '- Разбить пользователей на когорты по дате регистрации или источнику трафика.',
          '- Сравнить ключевые метрики (Day 1 / Day 7 / Day 30 Retention, LTV, Churn) между когортами.',
        ],
        [
          '- Segment user base into discrete cohorts based on acquisition channel and signup vintage.',
          '- Contrast D1/D7/D30 retention curves and churn velocity across cohort segments.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'value-chain-analysis': {
    id: 'value-chain-analysis',
    name: 'ValueChainAnalysisSkill',
    displayName: 'Value Chain Optimization Audit',
    categoryId: 'analysis',
    description: 'Breaks down Primary and Support activities to locate margin leakage and competitive advantage.',
    tags: ['analysis', 'value-chain', 'porter', 'margin', 'operations'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Анализ Цепочки Создания Стоимости (Value Chain)',
        'Porter\'s Value Chain Activity Mapping',
        [
          '- **Основные активности**: Входящая логистика, разработка, доставка, маркетинг, поддержка.',
          '- **Вспомогательные активности**: Инфраструктура, закупки, управление знаниями.',
          '- Выявить точки наибольшей утечки маржинальности.',
        ],
        [
          '- **Primary Activities**: Inbound data pipelines, compute operations, deployment, and customer support.',
          '- **Support Activities**: Cloud infrastructure provisioning, procurement, and talent allocation.',
          '- Pinpoint friction zones where operational margin leaks.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'red-team-attack-surface': {
    id: 'red-team-attack-surface',
    name: 'RedTeamAttackSurfaceSkill',
    displayName: 'Red Team Attack Surface Mapping',
    categoryId: 'analysis',
    description: 'Adopts an adversarial mindset to map every attack vector, unauthorized escalation path, and data leak.',
    tags: ['analysis', 'red-team', 'security', 'attack-surface', 'penetration'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Анализ Поверхности Атаки (Red Team Surface)',
        'Adversarial Attack Surface Mapping',
        [
          '- Смоделировать 3 вектора атаки: 1. Повышение привилегий, 2. Обход проверки схемы, 3. Небезопасные дефолты.',
          '- Для каждого вектора указать способ эксплуатации и метод превентивной блокировки.',
        ],
        [
          '- Model 3 adversarial exploit vectors: 1. Privilege escalation, 2. Unsanitized boundary injection, 3. Insecure default tokens.',
          '- Provide concrete exploit scenarios and corresponding automated defensive hardening rules.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
