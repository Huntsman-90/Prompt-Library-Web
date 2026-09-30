import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const ANALYSIS_SKILLS: Record<string, SkillDefinition> = {
  'root-cause-analysis': {
    id: 'root-cause-analysis',
    name: 'RootCauseAnalysisSkill',
    displayName: '5-Whys Root Cause Analysis (RCA)',
    categoryId: 'analysis',
    description: 'Drills past superficial symptoms using iterative 5-Whys and Ishikawa causality modeling.',
    tags: ['analysis', 'rca', 'root-cause', '5-whys', 'troubleshooting'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Анализ Первопричин (5 Whys / Ishikawa RCA)',
        'Root Cause Analysis (5-Whys / Ishikawa Protocol)',
        [
          '- **Итеративный спуск (5 Whys)**: Провести цепочку вопросов «Почему?» от внешнего симптома до глубинного системного сбоя.',
          '- **Диаграмма причинно-следственных связей**: Разделить причины по категориям (Код / Инфраструктура / Процессы / Мониторинг / Архитектура).',
          '- **Устранение повторения**: Сформулировать меры, которые устраняют саму возможность повторения проблемы на системном уровне.',
        ],
        [
          '- **Iterative 5-Whys**: Trace causal lineage from superficial symptom down to root systemic and organizational flaws.',
          '- **Ishikawa Categorization**: Segment failure contributors across Code, Infrastructure, Process, Observability, and Architecture.',
          '- **Systemic Prevention**: Engineer structural solutions that eradicate the root condition rather than masking telemetry alarms.',
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
    description: 'Reconstructs high-fidelity chronological event sequences with precise UTC timestamps and milestones.',
    tags: ['analysis', 'timeline', 'incident', 'chronology', 'postmortem'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Хронология Инцидента и Контрольные Точки (T0-T3)',
        'Incident Timeline Reconstruction (T0-T3)',
        [
          '- **Контрольные точки**: Разметить ключевые фазы (T0 — возникновение триггера, T1 — детекция алертом, T2 — начало митигации, T3 — полное восстановление сервиса).',
          '- **Табличный формат событий**: Оформить хронологию в виде таблицы: `[Время UTC | Событие / Сигнал телеметрии | Предпринятые действия | Задействованные роли]`.',
          '- **Анализ задержек**: Рассчитать MTTA (время до подтверждения) и MTTR (время до восстановления), выделив точки наибольшего простоя.',
        ],
        [
          '- **Milestone Phases**: Mark pivotal phase gates (T0 Trigger Injection, T1 Alert Detection, T2 Mitigation Commencement, T3 Full Recovery).',
          '- **Event Timeline Matrix**: Format chronological sequence as: `[Timestamp UTC | Telemetry Event / Trigger | Operator Actions | Impact Scope]`.',
          '- **Latency Diagnostics**: Calculate MTTA (Mean Time to Acknowledge) and MTTR (Mean Time to Recover), pinpointing communication friction points.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'gap-analysis': {
    id: 'gap-analysis',
    name: 'GapAnalysisSkill',
    displayName: 'AS-IS vs TO-BE Gap Analysis',
    categoryId: 'analysis',
    description: 'Audits current state against desired future state, mapping concrete remediation bridges.',
    tags: ['analysis', 'gap', 'as-is', 'to-be', 'transformation', 'delta'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Анализ Разрывов (AS-IS vs TO-BE Gap Analysis)',
        'Gap Analysis (AS-IS vs TO-BE State Delta)',
        [
          '- **Фиксация текущего состояния (AS-IS)**: Описать текущую архитектуру, метрики и узкие места без прикрас.',
          '- **Спецификация целевого состояния (TO-BE)**: Четко сформулировать идеальные параметры целевой системы.',
          '- **Матрица разрывов и дорожная карта (Gap Bridge)**: Для каждого выявленного разрыва указать конкретный инженерный шаг, сложность и требуемые ресурсы.',
        ],
        [
          '- **Current State Baseline (AS-IS)**: Document current architectural topology, operational metrics, and legacy bottlenecks accurately.',
          '- **Target State Specification (TO-BE)**: Define target performance thresholds, SLA guarantees, and design standards.',
          '- **Gap Remediation Roadmap**: Formulate discrete technical bridges for each discovered delta, detailing engineering effort and sequencing.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'swot-to-tows': {
    id: 'swot-to-tows',
    name: 'SwotToTowsSkill',
    displayName: 'Actionable TOWS Strategic Matrix',
    categoryId: 'analysis',
    description: 'Upgrades classic SWOT into an actionable TOWS matrix pairing strengths/weaknesses with opportunities/threats.',
    tags: ['analysis', 'swot', 'tows', 'strategy', 'actionable'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Матрица Стратегических Действий TOWS',
        'Actionable TOWS Strategic Matrix',
        [
          '- **SO Стратегии**: Использование сильных сторон для захвата внешних возможностей.',
          '- **ST Стратегии**: Использование сильных сторон для нейтрализации внешних угроз.',
          '- **WO Стратегии**: Преодоление слабых сторон за счет открывающихся возможностей.',
          '- **WT Стратегии**: Минимизация слабых сторон и предотвращение критических угроз (план выживания).',
        ],
        [
          '- **SO Strategies (Maxi-Maxi)**: Deploy core strengths to aggressively capture market opportunities.',
          '- **ST Strategies (Maxi-Mini)**: Leverage internal strengths to insulate the system against external threat vectors.',
          '- **WO Strategies (Mini-Maxi)**: Mitigate internal vulnerabilities by exploiting emerging environmental shifts.',
          '- **WT Strategies (Mini-Mini)**: Minimize internal structural weaknesses and erect defensive moats against existential threats.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'cost-of-inaction': {
    id: 'cost-of-inaction',
    name: 'CostOfInactionSkill',
    displayName: 'Cost of Inaction (COI) Quantification',
    categoryId: 'analysis',
    description: 'Calculates financial, reputational, and operational compound costs of delaying strategic remediation.',
    tags: ['analysis', 'coi', 'cost-of-inaction', 'economics', 'risk', 'financial'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Оценка Цены Бездействия (Cost of Inaction / COI)',
        'Cost of Inaction (COI) Economic Modeling',
        [
          '- **Прямые финансовые потери**: Рассчитать ежедневные/ежемесячные потери от простоя, утечек конверсии или неэффективности инфраструктуры.',
          '- **Накопление технического долга**: Оценить экспоненциальное удорожание будущих изменений при сохранении статус-кво.',
          '- **Репутационные и рыночные риски**: Смоделировать сценарий оттока ключевых клиентов и утраты конкурентного преимущества.',
        ],
        [
          '- **Direct Financial Bleed**: Quantify monthly compounding losses from operational friction, latency churn, and infrastructure inefficiencies.',
          '- **Technical Debt Accrual**: Model the exponential escalation of future refactoring costs if the status quo is preserved for 6-12 months.',
          '- **Market & Reputational Exposure**: Quantify customer churn probability, SLA penalty exposure, and market position erosion.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'fmea-risk-matrix': {
    id: 'fmea-risk-matrix',
    name: 'FmeaRiskMatrixSkill',
    displayName: 'Failure Mode and Effects Analysis (FMEA)',
    categoryId: 'analysis',
    description: 'Calculates Risk Priority Numbers (RPN = Severity × Occurrence × Detection) across all failure vectors.',
    tags: ['analysis', 'fmea', 'rpn', 'risk', 'reliability', 'matrix'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Анализ Видов и Последствий Отказов (FMEA Matrix)',
        'Failure Mode and Effects Analysis (FMEA Matrix)',
        [
          '- **Оценка RPN**: Для каждого компонента оценить: Тяжесть сбоя (S: 1-10), Частота возникновения (O: 1-10), Обнаруживаемость (D: 1-10).',
          '- **Расчет приоритета риска**: Вычислить $RPN = S \\times O \\times D$ и отсортировать угрозы по убыванию RPN.',
          '- **Корректирующие действия**: Для всех элементов с RPN > 100 разработать конкретные инженерные контрмеры с указанием нового прогнозируемого RPN.',
        ],
        [
          '- **RPN Scoring**: For every system component, quantify Severity (S: 1-10), Occurrence (O: 1-10), and Detection (D: 1-10).',
          '- **Risk Prioritization**: Compute $RPN = S \\times O \\times D$ and rank critical vulnerabilities by descending RPN.',
          '- **Remediation Target**: Formulate mandatory engineering mitigations for all vectors with RPN > 100, projecting post-mitigation target scores.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'bottleneck-theory-constraints': {
    id: 'bottleneck-theory-constraints',
    name: 'BottleneckTheoryConstraintsSkill',
    displayName: 'Theory of Constraints (ToC) Bottleneck Audit',
    categoryId: 'analysis',
    description: 'Applies Goldratt\'s 5 focusing steps to identify and exploit the singular rate-limiting system bottleneck.',
    tags: ['analysis', 'toc', 'goldratt', 'bottleneck', 'throughput', 'optimization'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Аудит Узких Мест по Теории Ограничений (ToC)',
        'Theory of Constraints (ToC) Bottleneck Analysis',
        [
          '- **1. Идентификация ограничения**: Найти единственный компонент системы, определяющий ее максимальную пропускную способность.',
          '- **2. Максимизация отдачи (Exploit)**: Использовать ограничение на 100% без дополнительных затрат (устранить холостой ход и потери).',
          '- **3. Подчинение системы (Subordinate)**: Подчинить все остальные подсистемы ритму работы ведущего ограничения.',
          '- **4. Расширение ограничения (Elevate)**: Инвестировать ресурсы в масштабирование узкого места до его устранения.',
        ],
        [
          '- **1. Identify the Constraint**: Isolate the singular chokepoint bounding overall system throughput.',
          '- **2. Exploit the Constraint**: Maximize bottleneck utilization by stripping away non-essential tasks and eliminating idle latency.',
          '- **3. Subordinate System Rhythm**: Align all upstream and downstream stages strictly to the throughput pace of the constraint.',
          '- **4. Elevate the Constraint**: Invest engineering and infrastructure resources to expand capacity until the limitation breaks.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'comparative-tradeoff-matrix': {
    id: 'comparative-tradeoff-matrix',
    name: 'ComparativeTradeoffMatrixSkill',
    displayName: 'Weighted Multi-Criteria Decision Matrix',
    categoryId: 'analysis',
    description: 'Constructs weighted scoring matrices comparing architectural alternatives with sensitivity thresholds.',
    tags: ['analysis', 'matrix', 'decision', 'tradeoff', 'scoring', 'evaluation'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Взвешенная Матрица Сравнения Альтернатив',
        'Weighted Multi-Criteria Decision Matrix',
        [
          '- **Критерии и веса**: Задать взвешенные критерии (Сумма весов = 100%, например: Производительность 30%, Сложность 25%, Стоимость 25%, Безопасность 20%).',
          '- **Табличный скоринг**: Оценить каждый вариант от 1 до 5 по каждому критерию с расчетом взвешенного балла.',
          '- **Анализ чувствительности**: Проверить, изменится ли выбор лидера при колебании весов критериев на ±15%.',
        ],
        [
          '- **Weighted Criteria**: Define normalized evaluation dimensions (Total weight = 100%, e.g., Throughput 30%, Complexity 25%, TCO 25%, Security 20%).',
          '- **Scoring Matrix**: Grade candidate architectures from 1 to 5 per criterion, computing normalized composite scores.',
          '- **Sensitivity Testing**: Audit recommendation stability against a ±15% variance in criterion weighting.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'sentiment-thematic-mining': {
    id: 'sentiment-thematic-mining',
    name: 'SentimentThematicMiningSkill',
    displayName: 'Thematic & Sentiment Signal Mining',
    categoryId: 'analysis',
    description: 'Extracts qualitative themes, recurring user pain points, emotional intensity, and hidden intent from raw text.',
    tags: ['analysis', 'sentiment', 'thematic', 'clustering', 'qualitative', 'ux'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Тематический и Тональный Анализ Обратной Связи',
        'Thematic & Sentiment Signal Extraction',
        [
          '- **Кластеризация тем**: Сгруппировать неструктурированные отзывы по 4–6 ключевым семантическим кластерам с указанием частотности.',
          '- **Тональность и накал (Valence & Arousal)**: Оценить эмоциональную интенсивность и критичность для каждого кластера жалоб.',
          '- **Глубинные инсайты (Root Drivers)**: Выявить скрытые первопричины неудовлетворенности пользователей за фасадом поверхностных формулировок.',
        ],
        [
          '- **Thematic Clustering**: Group unstructured feedback into 4-6 distinct semantic buckets with frequency distribution.',
          '- **Valence & Intensity Grading**: Quantify emotional tone and churn risk severity across each complaint cluster.',
          '- **Underlying Driver Discovery**: Uncover core psychological and usability triggers driving user frustration.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'cohort-funnel-attribution': {
    id: 'cohort-funnel-attribution',
    name: 'CohortFunnelAttributionSkill',
    displayName: 'Cohort Funnel & Conversion Attribution',
    categoryId: 'analysis',
    description: 'Segments conversion drop-offs, retention cohorts, and behavioral attribution paths.',
    tags: ['analysis', 'funnel', 'cohorts', 'conversion', 'attribution', 'analytics'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Когортный Анализ Воронки и Атрибуция Оттока',
        'Cohort Funnel Breakdown & Churn Attribution',
        [
          '- **Поэтапный расчет воронки**: Зафиксировать конверсию между каждым шагом с указанием абсолютных и относительных потерь (Drop-off Rate).',
          '- **Когортная сегментация**: Сравнить поведение различных когорт пользователей (по каналам привлечения, устройствам, регионам или времени).',
          '- **Атрибуция узких мест**: Локализовать экран или технический сбой, вызывающий максимальный отток аудитории.',
        ],
        [
          '- **Step-by-Step Funnel Audit**: Quantify conversion percentages between funnel stages, highlighting absolute and relative drop-off rates.',
          '- **Cohort Segmentation**: Contrast retention and conversion across distinct user cohorts (acquisition channels, devices, geographies).',
          '- **Drop-Off Root Attribution**: Isolate the exact UX friction point or API latency cliff responsible for peak user abandonment.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'structural-dependency-audit': {
    id: 'structural-dependency-audit',
    name: 'StructuralDependencyAuditSkill',
    displayName: 'Structural Dependency & Coupling Audit',
    categoryId: 'analysis',
    description: 'Analyzes software coupling (Afferent/Efferent), circular dependencies, and single points of failure (SPOF).',
    tags: ['analysis', 'coupling', 'dependencies', 'spof', 'architecture', 'graph'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Аудит Зависимостей и Связности (Coupling & SPOF)',
        'Structural Dependency & Coupling Audit',
        [
          '- **Анализ зацепления (Coupling)**: Оценить Afferent (Ca) и Efferent (Ce) зацепление модулей и коэффициент нестабильности $I = Ce / (Ca + Ce)$.',
          '- **Детекция циклических связей**: Выявить скрытые циклические зависимости и взаимные блокировки между сервисами.',
          '- **Поиск единых точек отказа (SPOF)**: Локализовать узлы, выход из строя которых парализует всю распределенную систему.',
        ],
        [
          '- **Coupling Metrics**: Calculate Afferent (Ca) and Efferent (Ce) coupling and instability index $I = Ce / (Ca + Ce)$ across modules.',
          '- **Circular Dependency Detection**: Detect cyclic references and distributed deadlocks across service boundaries.',
          '- **SPOF Isolation**: Pinpoint single points of failure whose outage cascades into total system paralysis.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'heuristic-evaluation-nielsen': {
    id: 'heuristic-evaluation-nielsen',
    name: 'HeuristicEvaluationNielsenSkill',
    displayName: 'Nielsen-Norman 10 Heuristics Audit',
    categoryId: 'analysis',
    description: 'Audits digital interfaces against Jakob Nielsen\'s 10 usability heuristics with severity ratings (0-4).',
    tags: ['analysis', 'heuristics', 'nielsen', 'usability', 'ux', 'audit'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Эвристический UX-Аудит по Якобу Нильсену (10 Heuristics)',
        'Nielsen Norman 10 Usability Heuristics Audit',
        [
          '- **Проверка по 10 эвристикам**: Оценить интерфейс (видимость статуса, соответствие реальному миру, контроль пользователя, консистентность, предотвращение ошибок и др.).',
          '- **Шкала критичности (0-4)**: Присвоить каждому нарушению оценку: 0 (не проблема) до 4 (катастрофический дефект юзабилити).',
          '- **План устранения**: Предоставить конкретную рекомендацию по исправлению для каждой обнаруженной проблемы.',
        ],
        [
          '- **10 Heuristics Checklist**: Audit interface against Nielsen\'s principles (system status visibility, real-world match, user control, consistency, error prevention, etc.).',
          '- **Severity Grading (0-4)**: Assign standard severity ratings from 0 (cosmetic) to 4 (catastrophic usability blocker).',
          '- **Concrete Remediation**: Deliver precise UI/UX design specifications to eliminate each flagged violation.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'competitive-feature-differentiation': {
    id: 'competitive-feature-differentiation',
    name: 'CompetitiveFeatureDifferentiationSkill',
    displayName: 'Competitive Feature Matrix & Moats',
    categoryId: 'analysis',
    description: 'Benchmarks capabilities against market rivals, isolating table stakes from defensible technological moats.',
    tags: ['analysis', 'competitive', 'benchmark', 'moats', 'differentiation', 'strategy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Сравнительный Анализ Конкурентов и Защитных Рвов',
        'Competitive Feature Differentiation & Strategic Moats',
        [
          '- **Table Stakes (Базовые гигиенические факторы)**: Выделить функционал, обязательный для присутствия на рынке, не создающий преимущества.',
          '- **Differentiators (Факторы дифференциации)**: Определить уникальные фичи, склоняющие выбор пользователей в пользу продукта.',
          '- **Defensible Moats (Защитные рвы)**: Зафиксировать фундаментальные преимущества (сетевые эффекты, запатентованные алгоритмы, проприетарные данные).',
        ],
        [
          '- **Table Stakes Demarcation**: Catalog baseline hygienic capabilities required for parity without competitive leverage.',
          '- **Key Differentiators**: Identify high-impact features driving user preference and conversion.',
          '- **Defensible Moats**: Formulate long-term protective moats (network effects, proprietary datasets, low-latency infrastructure).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'telemetry-anomaly-forensics': {
    id: 'telemetry-anomaly-forensics',
    name: 'TelemetryAnomalyForensicsSkill',
    displayName: 'Telemetry & Anomaly Log Forensics',
    categoryId: 'analysis',
    description: 'Analyzes distributed traces, error stack traces, and statistical telemetry anomalies.',
    tags: ['analysis', 'telemetry', 'logs', 'traces', 'metrics', 'forensics'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Форензика Телеметрии и Анализ Аномалий в Логах',
        'Telemetry & Distributed Trace Forensics',
        [
          '- **Корреляция метрик и логов**: Сопоставить всплески задержек (P99 spikes) и ошибок 5xx с записями в распределенных трейсах.',
          '- **Статистический анализ выбросов**: Использовать Z-score и IQR для выявления аномальных паттернов нагрузки и утечек ресурсов.',
          '- **Локализация сбойного фрейма**: По стеку вызовов изолировать конкретный модуль, вызвавший deadlock, memory leak или race condition.',
        ],
        [
          '- **Trace-Log Metric Correlation**: Correlate latency spikes (P99/P99.9) and 5xx error bursts with distributed trace spans.',
          '- **Statistical Outlier Detection**: Apply Z-score and IQR thresholds to isolate anomalous throughput regressions and memory spikes.',
          '- **Stack Frame Isolation**: Pinpoint the precise code frame triggering deadlocks, memory leaks, or unhandled exceptions.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'value-stream-mapping': {
    id: 'value-stream-mapping',
    name: 'ValueStreamMappingSkill',
    displayName: 'Lean Value Stream Mapping (VSM)',
    categoryId: 'analysis',
    description: 'Maps engineering value stream to calculate Lead Time, Cycle Time, and Process Time Efficiency (PCE).',
    tags: ['analysis', 'vsm', 'lean', 'lead-time', 'cycle-time', 'waste', 'efficiency'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Картирование Потока Создания Ценности (Value Stream Mapping)',
        'Lean Value Stream Mapping (VSM Protocol)',
        [
          '- **Расчет временных метрик**: Рассчитать Lead Time (полное время от идеи до продакшена) и Process Time (время непосредственной работы).',
          '- **Эффективность потока (PCE)**: Вычислить $PCE = (Process Time / Lead Time) \\times 100\\%$ и выявить скрытые задержки в очередях.',
          '- **Устранение потерь (Muda)**: Разработать план ликвидации потерь ожидания, избыточной обработки и ручной передачи контекста.',
        ],
        [
          '- **Time Metric Decomposition**: Measure total Lead Time vs. Active Process Time across development phases.',
          '- **Process Cycle Efficiency**: Calculate $PCE = (Process Time / Lead Time) \\times 100\\%$, pinpointing queueing delays.',
          '- **Muda Elimination**: Formulate concrete automation steps to remove hand-off friction, manual approvals, and context-switching waste.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'fmea-failure-modes-effects': {
    id: 'fmea-failure-modes-effects',
    name: 'FmeaFailureModesEffectsSkill',
    displayName: 'FMEA Risk Priority Number (RPN) Analysis',
    categoryId: 'analysis',
    description: 'Executes Failure Modes & Effects Analysis scoring Severity, Occurrence, and Detection to prioritize mitigation.',
    tags: ['analysis', 'fmea', 'rpn', 'severity', 'risk-analysis'],
    transform: createStandardSkillTransform(
      'protocol',
      'Анализ Видов и Последствий Отказов (FMEA / RPN)',
      'Failure Modes and Effects Analysis (FMEA) Protocol',
      [
        '- **Таблица FMEA**: Для каждого потенциального дефекта оценить 3 параметра по шкале 1–10: Т (Тяжесть / Severity), В (Вероятность возникновения / Occurrence), О (Вероятность обнаружения / Detection).',
        '- **Расчет RPN**: Вычислить $RPN = Т \\times В \\times О$ (Risk Priority Number от 1 до 1000).',
        '- **Приоритет митигации**: Сосредоточить инженерные усилия строго на элементах с наивысшим RPN (> 200) и тяжестью Severity ≥ 8.',
      ],
      [
        '- **FMEA Structured Scoring**: For every failure mode evaluate 1-10: S (Severity of impact), O (Occurrence frequency), and D (Detection difficulty prior to user impact).',
        '- **RPN Calculation**: Calculate $RPN = S \\times O \\times D$ (Risk Priority Number ranging from 1 to 1000).',
        '- **Prioritized Action Gates**: Mandate immediate preventative engineering mitigations for any mode with RPN > 200 or Severity ≥ 8.',
      ]
    ),
  },

  'bottleneck-theory-of-constraints': {
    id: 'bottleneck-theory-of-constraints',
    name: 'BottleneckTheoryOfConstraintsSkill',
    displayName: 'Theory of Constraints (TOC) Bottleneck Audit',
    categoryId: 'analysis',
    description: 'Applies Goldratts 5 Focusing Steps to identify, exploit, and elevate the single limiting constraint of the system.',
    tags: ['analysis', 'toc', 'constraints', 'throughput', 'bottleneck', 'goldratt'],
    transform: createStandardSkillTransform(
      'protocol',
      'Теория Ограничений и Поиск Узких Мест (Theory of Constraints)',
      'Theory of Constraints (TOC) Bottleneck Audit Protocol',
      [
        '- **Идентификация главного бутылочного горлышка**: Найти единственный компонент или ресурс, который диктует максимальную пропускную способность всей системы.',
        '- **Максимальное использование (Exploit)**: Исключить любые простои и неэффективность на самом узком месте (буферы, приоритеты).',
        '- **Подчинение системы (Subordinate)**: Замедлить или перенастроить смежные узлы так, чтобы они не перегружали бутылочное горлышко (Drum-Buffer-Rope).',
      ],
      [
        '- **Singular Bottleneck Identification**: Pinpoint the precise limiting constraint or resource determining total systemic throughput.',
        '- **Exploit the Constraint**: Maximize the productive efficiency of the bottleneck, eliminating any idle time or non-critical workload.',
        '- **Subordinate Upstream Systems**: Synchronize all auxiliary components to the rhythm of the constraint (Drum-Buffer-Rope mechanism) to eliminate buffer overflow.',
      ]
    ),
  },

  'cohort-retention-decay-analysis': {
    id: 'cohort-retention-decay-analysis',
    name: 'CohortRetentionDecayAnalysisSkill',
    displayName: 'Cohort Retention & Churn Curve Diagnostics',
    categoryId: 'analysis',
    description: 'Models user and API token retention curves, contrasting power-law flattening against exponential churn collapse.',
    tags: ['analysis', 'cohorts', 'retention', 'churn', 'decay-curves', 'product-analytics'],
    transform: createStandardSkillTransform(
      'protocol',
      'Когортный Анализ и Моделирование Кривых Удержания (Retention)',
      'Cohort Retention & Churn Curve Diagnostics Protocol',
      [
        '- **Когортная матрица (D1/D7/D30/D90)**: Разбить пользователей или клиентов по временным когортам и составить матрицу удержания.',
        '- **Форма кривой затухания**: Определить характер кривой: выходит ли она на горизонтальное плато (Product-Market Fit) или падает по экспоненте к нулю.',
        '- **Точки оттока (Churn Inflection Points)**: Найти точные этапы пути пользователя (Onboarding, 3-я сессия, интеграция API), где происходит максимальный сброс.',
      ],
      [
        '- **Cohort Retention Matrix**: Segment user/API client populations by acquisition vintage across D1, D7, D30, and D90 milestones.',
        '- **Decay Asymptote Classification**: Diagnose whether the curve flattens asymptotically (indicating true retention / PMF) or degrades exponentially toward zero.',
        '- **Churn Inflection Pinpointing**: Isolate friction events along the user lifecycle where catastrophic drop-offs occur.',
      ]
    ),
  },

  'cost-of-delay-cd3': {
    id: 'cost-of-delay-cd3',
    name: 'CostOfDelayCd3Skill',
    displayName: 'Cost of Delay & CD3 / WSJF Prioritization',
    categoryId: 'analysis',
    description: 'Calculates Cost of Delay divided by Duration (CD3) to determine economically optimal backlog sequencing.',
    tags: ['analysis', 'cost-of-delay', 'cd3', 'wsjf', 'prioritization', 'economics'],
    transform: createStandardSkillTransform(
      'protocol',
      'Стоимость Задержки (Cost of Delay) и Метод CD3 / WSJF',
      'Cost of Delay & CD3 Economic Prioritization Protocol',
      [
        '- **Оценка стоимости задержки (CoD)**: Рассчитать финансовые потери от каждого дня задержки релиза (упущенная выгода + штрафы + стоимость риска).',
        '- **Расчет коэффициента CD3**: Вычислить $CD3 = Cost\\ of\\ Delay / Duration$ для каждой задачи в бэклоге.',
        '- **Экономическая приоритизация**: Выстроить задачи строго по убыванию CD3: в первую очередь брать задачи с наивысшей ценностью на единицу времени.',
      ],
      [
        '- **Cost of Delay (CoD) Valuation**: Quantify the daily economic penalty of release postponement (lost revenue + risk exposure + compliance penalties).',
        '- **CD3 / WSJF Metric Derivation**: Compute $CD3 = \\text{Cost of Delay} / \\text{Duration}$ for every competing initiative.',
        '- **Strict Economic Sequencing**: Order backlog items in descending order of CD3 to maximize realized value per unit of engineering duration.',
      ]
    ),
  },

  'threat-modeling-stride': {
    id: 'threat-modeling-stride',
    name: 'ThreatModelingStrideSkill',
    displayName: 'STRIDE Security Threat Surface Modeling',
    categoryId: 'analysis',
    description: 'Audits attack surfaces across Spoofing, Tampering, Repudiation, Info Disclosure, DoS, and Elevation of Privilege.',
    tags: ['analysis', 'stride', 'security', 'threat-modeling', 'vulnerabilities'],
    transform: createStandardSkillTransform(
      'protocol',
      'Моделирование Угроз Безопасности по Модели STRIDE',
      'STRIDE Security Threat Surface Modeling Protocol',
      [
        '- **Аудит 6 категорий STRIDE**: Проанализировать векторы атак: 1) Spoofing (подделка личности), 2) Tampering (модификация данных), 3) Repudiation (отказ от авторства), 4) Information Disclosure (утечка), 5) Denial of Service (DoS), 6) Elevation of Privilege (эскалация прав).',
        '- **Спецификация контрмер**: Для каждой обнаруженной угрозы предложить конкретный криптографический или архитектурный механизм защиты.',
        '- **Модель нарушителя**: Зафиксировать предполагаемые возможности атакующего (внешний хакер, вредоносный инсайдер, скомпрометированный партнерский сервис).',
      ],
      [
        '- **STRIDE Threat Matrix**: Systematically audit architecture across: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege.',
        '- **Compensating Controls**: Specify concrete cryptographic mitigations, audit trails, mutual TLS, and role-based policies for each identified exposure.',
        '- **Attacker Capability Profile**: Calibrate threats against explicit adversary models (unauthenticated external attacker vs. compromised internal tenant).',
      ]
    ),
  },

  'sensitivity-tornado-diagram': {
    id: 'sensitivity-tornado-diagram',
    name: 'SensitivityTornadoDiagramSkill',
    displayName: 'Sensitivity Analysis & Tornado Diagramming',
    categoryId: 'analysis',
    description: 'Varies critical independent parameters across realistic ranges to determine which drivers dominate system volatility.',
    tags: ['analysis', 'sensitivity', 'tornado-diagram', 'variance', 'volatility'],
    transform: createStandardSkillTransform(
      'protocol',
      'Анализ Чувствительности и Диаграмма Торнадо',
      'Sensitivity Analysis & Parameter Volatility Protocol',
      [
        '- **Варьирование параметров**: Проверить ключевые переменные (размер полезной нагрузки, RPS, задержка БД, стоимость инфраструктуры) в диапазоне ±50%.',
        '- **Ранжирование по влиянию**: Построить иерархию факторов по степени их влияния на целевую метрику (диаграмма торнадо).',
        '- **Фокус на критических рычагах**: Сконцентрировать инженерные усилия на 2-3 параметрах, генерирующих 80% системной вариативности.',
      ],
      [
        '- **Parametric Perturbation**: Vary key operational parameters (payload size, concurrency, disk IOPS, pricing tiers) across ±50% sensitivity bands.',
        '- **Tornado Swing Ranking**: Rank parameters by their net swing effect on systemic stability and financial budget, visualizing impact spread.',
        '- **Dominant Levers Focus**: Channel optimization resources exclusively toward the top 2-3 parameters governing 80% of systemic variance.',
      ]
    ),
  },

  'critical-path-pert-cpm': {
    id: 'critical-path-pert-cpm',
    name: 'CriticalPathPertCpmSkill',
    displayName: 'Critical Path Method (CPM) & PERT Analysis',
    categoryId: 'analysis',
    description: 'Calculates early/late start dates, total float/slack, and critical path dependencies across complex project task DAGs.',
    tags: ['analysis', 'cpm', 'pert', 'critical-path', 'scheduling', 'project-management'],
    transform: createStandardSkillTransform(
      'protocol',
      'Метод Критического Пути (CPM) и Анализ PERT',
      'Critical Path Method (CPM) & PERT Network Protocol',
      [
        '- **Оценка длительностей PERT**: Для каждой задачи рассчитать ожидаемое время: $E = (O + 4M + P) / 6$, где O — оптимистичная, M — вероятная, P — пессимистичная оценка.',
        '- **Выявление критического пути (Critical Path)**: Найти непрерывную цепочку задач с нулевым резервом времени (Zero Float).',
        '- **Оптимизация расписания (Crashing / Fast-Tracking)**: Предложить сокращение длительности критических задач за счет параллелизации или добавления ресурсов.',
      ],
      [
        '- **PERT Tri-Point Estimation**: Compute expected task durations via $E = (O + 4M + P) / 6$, incorporating optimistic (O), realistic (M), and pessimistic (P) variances.',
        '- **Zero-Float Critical Path**: Trace the bottleneck sequence of interdependent milestones with zero slack time where any delay shifts the final delivery.',
        '- **Schedule Compression (Fast-Tracking / Crashing)**: Formulate selective concurrency and resource allocation strategies specifically applied to critical path nodes.',
      ]
    ),
  },

  'comparative-benchmarking-radar': {
    id: 'comparative-benchmarking-radar',
    name: 'ComparativeBenchmarkingRadarSkill',
    displayName: 'Multi-Attribute Comparative Radar Scoring',
    categoryId: 'analysis',
    description: 'Constructs standardized multi-attribute radar evaluations benchmarking architectures across 6-8 uniform metrics.',
    tags: ['analysis', 'benchmarking', 'radar', 'evaluation', 'comparison', 'matrix'],
    transform: createStandardSkillTransform(
      'protocol',
      'Многокритериальный Сравнительный Анализ (Radar Scoring)',
      'Multi-Attribute Comparative Radar Scoring Protocol',
      [
        '- **Шкала из 6–8 измерений**: Оценить кандидатов по единой шкале 1–10 по осям: Пропускная способность, Задержка P99, Стоимость владения (TCO), Сложность поддержки (DX), Отказоустойчивость, Безопасность.',
        '- **Сводная матрица с весами**: Назначить веса критериям в зависимости от бизнес-приоритетов и рассчитать средневзвешенный балл.',
        '- **Качественное обоснование оценок**: Снабдить каждую оценку кратким аргументом с фактами и техническими доказательствами.',
      ],
      [
        '- **Standardized 6-8 Axis Schema**: Score contenders across uniform 1-10 dimensions: Throughput, P99 Latency, TCO, Developer Experience (DX), Fault Tolerance, and Security Posture.',
        '- **Weighted Composite Matrix**: Multiply raw scores by stakeholder priority weights, rendering a deterministic multi-attribute ranking.',
        '- **Concrete Score Justification**: Back every numerical score with concrete benchmark data, operational telemetry, or architectural proofs.',
      ]
    ),
  },

  'capacity-headroom-exhaustion': {
    id: 'capacity-headroom-exhaustion',
    name: 'CapacityHeadroomExhaustionSkill',
    displayName: 'Capacity Headroom & Runway Exhaustion Runway',
    categoryId: 'analysis',
    description: 'Projects time-to-exhaustion curves for disk IOPS, DB connections, memory heaps, and bandwidth under expected growth.',
    tags: ['analysis', 'capacity-planning', 'headroom', 'runway', 'scalability'],
    transform: createStandardSkillTransform(
      'protocol',
      'Прогнозирование Исчерпания Емкости и Резерва Ресурсов',
      'Capacity Headroom & Runway Exhaustion Analysis Protocol',
      [
        '- **Анализ лимитирующих ресурсов**: Оценить текущий уровень потребления CPU, памяти, IOPS хранилища, пула соединений БД и сетевой пропускной способности.',
        '- **Расчет времени до исчерпания (Runway)**: Смоделировать рост нагрузки и вычислить дату исчерпания безопасного порога (80% емкости).',
        '- **Упреждающее масштабирование**: Сформулировать триггеры заблаговременного масштабирования до наступления кризиса ресурсов.',
      ],
      [
        '- **Limiting Resource Inventory**: Audit baseline utilization rates across CPU, memory heaps, storage IOPS, database connection pools, and egress network bandwidth.',
        '- **Runway Exhaustion Curves**: Project timeline curves modeling when organic growth will breach the 80% saturation threshold under P90 traffic spikes.',
        '- **Proactive Scaling Triggers**: Define clear automated or lead-time scaling thresholds triggered well before capacity cliffs.',
      ]
    ),
  },

  'heuristics-usability-nielsen': {
    id: 'heuristics-usability-nielsen',
    name: 'HeuristicsUsabilityNielsenSkill',
    displayName: 'Nielsen-Norman 10 Usability Heuristics Audit',
    categoryId: 'analysis',
    description: 'Audits interfaces and interactive workflows against Jakob Nielsens 10 canonical usability heuristics.',
    tags: ['analysis', 'usability', 'nielsen', 'ux-audit', 'heuristics', 'interface'],
    transform: createStandardSkillTransform(
      'protocol',
      'Аудит Юзабилити по 10 Эвристикам Нильсена',
      'Nielsen-Norman 10 Usability Heuristics Audit Protocol',
      [
        '- **Аудит по 10 эвристикам**: Проверить интерфейс: 1) Видимость состояния системы, 2) Соответствие реальному миру, 3) Свобода пользователя (Undo/Redo), 4) Единообразие стандартов, 5) Предотвращение ошибок, 6) Узнавание вместо вспоминания, 7) Гибкость и скорость, 8) Минималистичный дизайн, 9) Помощь при ошибках, 10) Справка и документация.',
        '- **Шкала критичности дефектов (Severity 0–4)**: Классифицировать найденные проблемы от косметических до блокирующих.',
        '- **Конкретные рекомендации по исправлению**: Для каждой проблемы предложить переработанный UI-паттерн или текст сообщения.',
      ],
      [
        '- **10 Heuristics Checklist**: Audit user journeys against System Status Visibility, Real-World Match, User Control & Freedom, Consistency, Error Prevention, Recognition over Recall, Flexibility, Aesthetic Minimalism, Error Recovery, and Documentation.',
        '- **Severity Classification (0-4)**: Tag usability defects from cosmetic (1) to catastrophic blocking barrier (4).',
        '- **Actionable Remediation Patterns**: Provide explicit microcopy corrections, layout patterns, and feedback states resolving each issue.',
      ]
    ),
  },

  'blast-radius-topology-analysis': {
    id: 'blast-radius-topology-analysis',
    name: 'BlastRadiusTopologyAnalysisSkill',
    displayName: 'Blast Radius & Failure Domain Topology',
    categoryId: 'analysis',
    description: 'Maps the systemic containment boundaries and cascades across availability zones, regions, and tenant partitions.',
    tags: ['analysis', 'blast-radius', 'failure-domains', 'isolation', 'resilience'],
    transform: createStandardSkillTransform(
      'protocol',
      'Анализ Радиуса Поражения и Доменов Отказа (Blast Radius)',
      'Blast Radius & Failure Domain Topology Protocol',
      [
        '- **Карта доменов отказа (Failure Domains)**: Разметить границы изоляции: процесс, контейнер, хост, стойка, Availability Zone, Cloud Region.',
        '- **Оценка радиуса поражения (Blast Radius)**: Оценить максимальный % затронутых пользователей или транзакций при катастрофическом сбое одного узла.',
        '- **Барьеры сдерживания (Bulkheads & Cell-based Architecture)**: Спроектировать сотовую архитектуру (Cell-based), гарантирующую локализацию аварии в рамках одной соты.',
      ],
      [
        '- **Failure Domain Mapping**: Partition architectural topology across explicit boundaries: thread, container, host, rack, Availability Zone, Region.',
        '- **Blast Radius Metric**: Quantify the maximum percentage of tenant traffic or data exposed to downtime during total failure of any single component.',
        '- **Cell-Based Containment**: Formulate cell-based architectural designs and circuit breakers ensuring catastrophic failures remain strictly localized.',
      ]
    ),
  },

  'supply-chain-dependency-audit': {
    id: 'supply-chain-dependency-audit',
    name: 'SupplyChainDependencyAuditSkill',
    displayName: 'Software Supply Chain & Dependency Risk Audit',
    categoryId: 'analysis',
    description: 'Audits open-source transitive dependencies for CVEs, copyleft viral licenses, maintainer abandonment, and bloat.',
    tags: ['analysis', 'supply-chain', 'dependencies', 'cve', 'security', 'licensing'],
    transform: createStandardSkillTransform(
      'protocol',
      'Аудит Цепочки Поставок ПО и Зависимостей (Supply Chain)',
      'Software Supply Chain & Dependency Risk Audit Protocol',
      [
        '- **Инвентаризация транзитивных пакетов**: Оценить дерево зависимостей, выявляя заброшенные библиотеки без обновлений более 12 месяцев.',
        '- **Анализ уязвимостей и лицензий**: Проверить пакеты на известные CVE и несовместимые лицензии (GPL/AGPL против коммерческого закрытого кода).',
        '- **Стратегия импортозамещения и вендоринга**: Разработать рекомендации по замене сомнительных зависимостей нативные API или микробиблиотеки.',
      ],
      [
        '- **Transitive Dependency Tree Audit**: Catalog transitive dependency trees, isolating unmaintained single-maintainer packages with zero commits in >12 months.',
        '- **CVE & License Incompatibility Screening**: Screen against known CVSS vulnerability databases and viral copyleft licenses (GPL/AGPL) incompatible with commercial proprietary distribution.',
        '- **Decoupling & In-Housing Strategy**: Provide specific remediation roadmaps to replace bloated third-party dependencies with native web/platform standards.',
      ]
    ),
  },

  'pareto-defect-distribution': {
    id: 'pareto-defect-distribution',
    name: 'ParetoDefectDistributionSkill',
    displayName: 'Pareto 80/20 Defect & Outage Clustering',
    categoryId: 'analysis',
    description: 'Applies Pareto analysis to production bug trackers to identify the 20% of code modules causing 80% of outages.',
    tags: ['analysis', 'pareto', 'defects', 'bugs', 'quality', '80-20'],
    transform: createStandardSkillTransform(
      'protocol',
      'Анализ Распределения Дефектов по Парето (80/20)',
      'Pareto 80/20 Defect Clustering Protocol',
      [
        '- **Кластеризация инцидентов**: Сгруппировать баги и сбои по подсистемам, авторам, типам (race condition, null pointer, timeout) и частоте.',
        '- **Кумулятивная кривая Парето**: Построить кумулятивную кривую и выявить те 20% модулей («hotspots»), которые генерируют 80% проблем.',
        '- **Сфокусированный рефакторинг**: Направить ресурсы рефакторинга и тестирования строго в выявленные проблемные зоны.',
      ],
      [
        '- **Defect Cluster Categorization**: Aggregate production incident tickets across subsystems, error signatures, and root causes.',
        '- **Cumulative Pareto Curve**: Construct cumulative distribution plots isolating the 20% of code hotspots responsible for 80% of customer downtime.',
        '- **Surgical Refactoring Target**: Direct quality assurance automation and structural refactoring precisely at high-yield hotspot modules.',
      ]
    ),
  },

  'conformance-compliance-gap': {
    id: 'conformance-compliance-gap',
    name: 'ConformanceComplianceGapSkill',
    displayName: 'Regulatory Compliance & SOC2/GDPR Gap Audit',
    categoryId: 'analysis',
    description: 'Audits system data flows and architectural controls against regulatory standards (SOC2, GDPR, HIPAA, PCI-DSS).',
    tags: ['analysis', 'compliance', 'soc2', 'gdpr', 'hipaa', 'audit', 'regulatory'],
    transform: createStandardSkillTransform(
      'protocol',
      'Аудит Соответствия Регуляторным Требованиям (SOC2 / GDPR)',
      'Regulatory Compliance & Governance Gap Audit Protocol',
      [
        '- **Картирование потоков данных (PII/PHI)**: Отследить жизненный цикл персональных и конфиденциальных данных: сбор, передача (TLS 1.3), хранение (AES-256), удаление.',
        '- **Сверка с требованиями стандарта**: Сопоставить архитектуру с контролями SOC2 Type II, статьями GDPR (право на забвение, согласие) или PCI-DSS.',
        '- **План устранения несоответствий (Remediation)**: Составить перечень критических доработок для прохождения внешнего аудита безопасности.',
      ],
      [
        '- **Sensitive Data Flow Mapping**: Trace lifecycle of PII, PHI, and financial secrets across ingress, transit encryption (TLS 1.3), storage (AES-GCM), and cryptographic erasure.',
        '- **Standard Control Verification**: Audit system controls against SOC2 Trust Criteria, GDPR Articles (e.g. Right to Erasure, Data Portability), and PCI-DSS requirements.',
        '- **Remediation Action Matrix**: Generate an actionable roadmap detailing non-compliant gaps, compensating technical controls, and audit evidence requirements.',
      ]
    ),
  },

  'monte-carlo-risk-simulation': {
    id: 'monte-carlo-risk-simulation',
    name: 'MonteCarloRiskSimulationSkill',
    displayName: 'Monte Carlo Stochastic Risk Simulation',
    categoryId: 'analysis',
    description: 'Simulates thousands of stochastic trials over project schedules and infrastructure costs to output probabilistic outcome curves.',
    tags: ['analysis', 'monte-carlo', 'stochastic', 'simulation', 'probability', 'financial-modeling'],
    transform: createStandardSkillTransform(
      'protocol',
      'Стохастическое Моделирование Рисков (Метод Монте-Карло)',
      'Monte Carlo Stochastic Risk Simulation Protocol',
      [
        '- **Задание распределений вероятностей**: Определить вероятностные распределения (нормальное, логнормальное, треугольное) для ключевых неизвестных параметров.',
        '- **Моделирование сценариев (10 000 итераций)**: Описать результаты стохастического прогона и получить кумулятивную функцию распределения вероятностей (CDF).',
        '- **Интерпретация квантилей**: Предоставить оценки с вероятностями P50 (медиана), P80 (уверенный прогноз) и P99 (пессимистичный сценарий для резервирования бюджета).',
      ],
      [
        '- **Probabilistic Parameter Definition**: Assign realistic continuous distributions (triangular, lognormal) to input variables (task durations, traffic multipliers, pricing changes).',
        '- **Stochastic Scenario Synthesis**: Model outcomes across 10,000 synthetic trials, deriving cumulative distribution functions (CDF) for project timelines or infrastructure expenditure.',
        '- **Percentile Decision Thresholds**: Frame management forecasts around explicit confidence levels: P50 (expected median), P80 (conservative delivery commitment), and P99 (tail-risk contingency budget).',
      ]
    ),
  },

  'service-level-objective-burn': {
    id: 'service-level-objective-burn',
    name: 'ServiceLevelObjectiveBurnSkill',
    displayName: 'SLO Error Budget & Multi-Window Burn Rate',
    categoryId: 'analysis',
    description: 'Evaluates Service Level Objectives (SLOs), SLIs, error budgets, and Google SRE multi-window multi-burn-rate alerting rules.',
    tags: ['analysis', 'slo', 'sli', 'error-budget', 'burn-rate', 'sre'],
    transform: createStandardSkillTransform(
      'protocol',
      'Анализ Бюджета Ошибок (SLO) и Скорости Сгорания (Burn Rate)',
      'SLO Error Budget & Multi-Window Burn Rate Protocol',
      [
        '- **Определение SLI/SLO**: Сформулировать четкий Service Level Indicator (напр. «% успешных запросов < 200 мс») и цель SLO (напр. 99.9% за 30 дней).',
        '- **Расчет бюджета ошибок (Error Budget)**: Определить допустимое число сбойных событий (0.1% от общего трафика за скользящее окно).',
        '- **Многооконные правила сгорания (Multi-Window Multi-Burn-Rate)**: Задать алерты: 14.4x за 1 час (сгорание 2% бюджета) и 6x за 6 часов (сгорание 5% бюджета) по стандартам Google SRE.',
      ],
      [
        '- **SLI / SLO Formalization**: Define unambiguous Service Level Indicators (e.g. valid requests with latency < 150ms) and rolling target SLOs (e.g. 99.9% over rolling 30 days).',
        '- **Error Budget Calculation**: Quantify allowable failure units (e.g. 0.1% downtime allowance equals 43.2 minutes / month).',
        '- **Multi-Window Multi-Burn Alerting**: Implement Google SRE burn rate thresholds (14.4x burn rate over 1h/5m windows consuming 2% budget; 6x burn rate over 6h/30m windows).',
      ]
    ),
  },

  'energy-carbon-efficiency-audit': {
    id: 'energy-carbon-efficiency-audit',
    name: 'EnergyCarbonEfficiencyAuditSkill',
    displayName: 'Green Computing & Energy/Carbon Efficiency Audit',
    categoryId: 'analysis',
    description: 'Audits software systems for computational energy efficiency, carbon intensity of cloud regions, and wasteful idle compute.',
    tags: ['analysis', 'green-computing', 'carbon', 'efficiency', 'energy', 'sustainability'],
    transform: createStandardSkillTransform(
      'protocol',
      'Аудит Энергоэффективности и Углеродного Следа (Green Computing)',
      'Green Computing & Energy Efficiency Audit Protocol',
      [
        '- **Анализ вычислительных потерь**: Выявить неэффективные алгоритмические циклы, активный опрос (polling) вместо event-driven, и неиспользуемые инстансы в режиме ожидания.',
        '- **Оптимизация передачи данных**: Сократить сетевой трафик за счет эффективных сжатий (Zstandard/Brotli) и компактных бинарных форматов (Protobuf/CBOR).',
        '- **Калибровка углеродной интенсивности регионов**: Рекомендовать перенос фоновых пакетных задач в облачные дата-центры с высокой долей возобновляемой энергии.',
      ],
      [
        '- **Compute Waste Identification**: Pinpoint CPU spin-locks, aggressive client-side polling loops, and idle over-provisioned virtual machine footprints.',
        '- **Data Transit Compression**: Mandate binary serialization (Protobuf/Arrow) and modern compression algorithms (Zstandard/Brotli) to slash network watt expenditures.',
        '- **Carbon-Aware Scheduling**: Schedule non-urgent batch processing and model training workloads to cloud regions and temporal windows with minimal marginal grid carbon intensity.',
      ]
    ),
  },

  'chaos-engineering-game-day': {
    id: 'chaos-engineering-game-day',
    name: 'ChaosEngineeringGameDaySkill',
    displayName: 'Chaos Engineering & Steady-State Hypothesis',
    categoryId: 'analysis',
    description: 'Formulates structured Chaos Engineering game day scenarios injecting targeted faults to verify steady-state invariants.',
    tags: ['analysis', 'chaos-engineering', 'game-day', 'steady-state', 'fault-injection', 'resilience'],
    transform: createStandardSkillTransform(
      'protocol',
      'Протокол Хаос-Инжиниринга и Проверка Устойчивости (Game Day)',
      'Chaos Engineering & Steady-State Verification Protocol',
      [
        '- **Определение нормального состояния (Steady State)**: Зафиксировать измеримые показатели нормальной работы системы (бизнес-транзакции в секунду, стабильная задержка).',
        '- **Формулирование гипотезы устойчивости**: «При отключении master-ноды БД или потере 30% пакетов в сети система продолжит обслуживать 100% клиентских запросов без деградации данных».',
        '- **План контролируемой инъекции сбоя**: Описать точный сценарий внесения сбоя, кнопку экстренной остановки эксперимента (Rollback Abort) и анализ результатов.',
      ],
      [
        '- **Steady-State Invariant Definition**: Define quantitative baseline telemetry characterizing normal operational health (steady-state transaction throughput, P99 latency stability).',
        '- **Resilience Hypothesis**: State explicit hypothesis: "Injecting 50% packet drop or terminating primary database instances will trigger automated failover with zero data loss and < 2s user impact".',
        '- **Controlled Fault Injection & Abort Protocol**: Specify blast-radius-limited failure injection steps alongside instantaneous automated kill-switches.',
      ]
    ),
  },

  "fmea-rpn-severity-occurrence-detection": {
    id: "fmea-rpn-severity-occurrence-detection",
    name: "FmeaRpnSeverityOccurrenceDetectionSkill",
    displayName: "Failure Mode and Effects Analysis (FMEA & RPN Scoring)",
    categoryId: "analysis",
    description: "Calculates Risk Priority Numbers (RPN = Severity x Occurrence x Detection) to objectively rank system vulnerabilities.",
    tags: ["analysis","fmea","rpn","risk-assessment","reliability"],
    transform: createStandardSkillTransform({
      sectionName: "FMEA Failure Mode & RPN Scoring Protocol",
      ruSectionName: "Анализ видов и последствий отказов (FMEA / RPN)",
      instructions: [
        "Catalog all discrete failure modes and score each on a 1-10 scale across three factors: Severity (S), Occurrence frequency (O), and Detectability (D).",
        "Compute the Risk Priority Number: RPN = S x O x D (range 1-1,000).",
        "Establish a hard remediation threshold: mandate corrective engineering actions for any failure mode with RPN > 100 or Severity ≥ 9.",
        "Document post-mitigation RPN target scores verifying residual risk reduction.",
      ],
      ruInstructions: [
        "Составьте перечень сценариев отказов и оцените каждый по шкале 1–10: Тяжесть (S), Частота возникновения (O), Обнаруживаемость (D).",
        "Рассчитайте индекс приоритета риска: RPN = S x O x D (диапазон от 1 до 1000).",
        "Внедрите жесткий порог: обязательное инженерное устранение любого риска с RPN > 100 или тяжестью S ≥ 9.",
        "Зафиксируйте целевые остаточные баллы RPN после внедрения защитных мер.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","fmea","rpn","risk-assessment","reliability"],
    }),
  },

  "static-program-slicing-defect-isolation": {
    id: "static-program-slicing-defect-isolation",
    name: "StaticProgramSlicingDefectIsolationSkill",
    displayName: "Static Program Slicing & Defect Isolation",
    categoryId: "analysis",
    description: "Isolates the minimal subset of source code instructions that directly or indirectly influence a failing variable or assertion.",
    tags: ["analysis","program-slicing","debugging","data-flow","code-analysis"],
    transform: createStandardSkillTransform({
      sectionName: "Static Backward/Forward Program Slicing Protocol",
      ruSectionName: "Статический слайсинг программ для локализации дефектов",
      instructions: [
        "Define the slicing criterion: a tuple of (instruction_line, variable_name) corresponding to the observed defect.",
        "Execute backward static slicing: trace control-flow and data-dependence graphs to extract all statements that affect that criterion.",
        "Prune all orthogonal, non-interfering code paths to create a minimal, standalone reproduction slice.",
        "Analyze the slice for null-pointer dereferences, uninitialized state, and variable shadowing.",
      ],
      ruInstructions: [
        "Задайте критерий среза: пару (номер_строки, имя_переменной) в точке проявления ошибки.",
        "Выполните обратный статический слайсинг: проследите граф зависимостей по данным и управлению для выделения влияющих инструкций.",
        "Отсеките независимые участки кода, сформировав минимальный изолированный срез для локализации бага.",
        "Проверьте срез на разыменование null, неинициализированные переменные и конфликты областей видимости.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","program-slicing","debugging","data-flow","code-analysis"],
    }),
  },

  "dynamic-taint-source-to-sink-tracking": {
    id: "dynamic-taint-source-to-sink-tracking",
    name: "DynamicTaintSourceToSinkTrackingSkill",
    displayName: "Dynamic Taint Analysis & Source-to-Sink Tracking",
    categoryId: "analysis",
    description: "Tracks untrusted external inputs from ingestion sources across transformations to sensitive execution sinks.",
    tags: ["analysis","taint-analysis","security","data-flow","vulnerabilities"],
    transform: createStandardSkillTransform({
      sectionName: "Source-to-Sink Dynamic Taint Tracking",
      ruSectionName: "Анализ распространения заражения (Taint Analysis: Source-to-Sink)",
      instructions: [
        "Tag all untrusted external input boundaries as Taint Sources (HTTP headers, query params, webhook payloads, file uploads).",
        "Trace taint propagation through internal variables, object mutations, string concatenations, and intermediate buffers.",
        "Identify critical Taint Sinks: SQL execution engines, OS shell commands, DOM innerHTML sinks, and eval primitives.",
        "Verify that a validated, cryptographically sound Sanitizer or Escaping primitive intervenes between source and sink.",
      ],
      ruInstructions: [
        "Пометьте все внешние точки ввода как источники заражения (HTTP-заголовки, параметры URL, вебхуки, загружаемые файлы).",
        "Отслеживайте путь распространения данных через трансформации, конкатенации строк и буферы памяти.",
        "Выделите критические точки назначения (Sinks): SQL-движки, вызовы shell-команд, вставки в DOM, парсеры.",
        "Убедитесь, что между источником и приемником обязательно стоит проверенная функция валидации и санитизации.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","taint-analysis","security","data-flow","vulnerabilities"],
    }),
  },

  "littles-law-queueing-bottleneck-audit": {
    id: "littles-law-queueing-bottleneck-audit",
    name: "LittlesLawQueueingBottleneckAuditSkill",
    displayName: "Little's Law Queueing & Capacity Saturation Audit",
    categoryId: "analysis",
    description: "Applies Little's Law (L = lambda x W) to diagnose concurrency bottlenecks, queue buildup, and thread pool starvation.",
    tags: ["analysis","littles-law","queueing-theory","capacity-planning","performance"],
    transform: createStandardSkillTransform({
      sectionName: "Little's Law Queueing & Concurrency Audit",
      ruSectionName: "Закон Литтла и аудит насыщения очередей (L = lambda * W)",
      instructions: [
        "Apply Little's Law: Average concurrent requests in system (L) equals Arrival rate (lambda) multiplied by Average response time (W).",
        "Calculate theoretical queue buildup when arrival rate exceeds processing service rate (rho = lambda / mu >= 1.0).",
        "Audit thread pool and connection pool dimensions to prevent cascading saturation deadlocks.",
        "Determine optimal concurrency limits that prevent tail latency degradation under burst traffic.",
      ],
      ruInstructions: [
        "Применяйте закон Литтла: число одновременных запросов в системе (L) = скорость поступления (lambda) * время обработки (W).",
        "Рассчитывайте лавинообразный рост очереди при приближении коэффициента загрузки к единице (rho >= 1.0).",
        "Аудируйте размеры пулов потоков и коннектов к БД, предотвращая каскадные блокировки.",
        "Определяйте оптимальные лимиты конкурентности (concurrency limits) для удержания хвостовой задержки p99.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","littles-law","queueing-theory","capacity-planning","performance"],
    }),
  },

  "differential-flamegraph-profiling": {
    id: "differential-flamegraph-profiling",
    name: "DifferentialFlamegraphProfilingSkill",
    displayName: "Differential Flamegraph CPU/Memory Profiling",
    categoryId: "analysis",
    description: "Compares baseline vs regressed production profiles using differential flamegraphs (red for regression, blue for improvement).",
    tags: ["analysis","flamegraph","profiling","performance","regression-testing"],
    transform: createStandardSkillTransform({
      sectionName: "Differential Flamegraph Profiling Architecture",
      ruSectionName: "Дифференциальное профилирование флеймграфов (CPU / Memory)",
      instructions: [
        "Capture stack traces across identical traffic conditions for both baseline version and candidate release.",
        "Generate differential flamegraphs highlighting regressed frames in red and optimized frames in blue.",
        "Isolate specific callstack frames exhibiting disproportionate self-time or memory allocation expansions.",
        "Correlate regressions directly with recent git commit diffs to pinpoint problematic algorithmic changes.",
      ],
      ruInstructions: [
        "Соберите профили стеков вызовов под одинаковой нагрузкой для базовой версии и кандидатного релиза.",
        "Постройте дифференциальный флеймграф с подсветкой регрессий красным цветом, а оптимизаций — синим.",
        "Локализуйте конкретные функции в стеке вызовов с максимальным ростом собственного времени выполнения (self-time).",
        "Сопоставьте найденные горячие точки с недавними коммитами для точечного рефакторинга.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","flamegraph","profiling","performance","regression-testing"],
    }),
  },

  "sobol-sensitivity-variance-decomposition": {
    id: "sobol-sensitivity-variance-decomposition",
    name: "SobolSensitivityVarianceDecompositionSkill",
    displayName: "Sobol Sensitivity & Variance Decomposition",
    categoryId: "analysis",
    description: "Decomposes total system variance into main effects and higher-order interaction effects using variance-based Sobol indices.",
    tags: ["analysis","sobol-indices","sensitivity-analysis","variance","modeling"],
    transform: createStandardSkillTransform({
      sectionName: "Sobol Global Sensitivity Analysis Protocol",
      ruSectionName: "Глобальный анализ чувствительности Соболя (декомпозиция дисперсии)",
      instructions: [
        "Decompose the variance of the model outcome into contributions from individual input parameters and parameter interactions.",
        "Compute first-order Sobol indices (S_i) measuring main effect of each parameter alone.",
        "Compute total-order Sobol indices (S_Ti) measuring main effect plus all higher-order cross-parameter interactions.",
        "Rank input parameters to identify which variables dictate 90%+ of outcome volatility.",
      ],
      ruInstructions: [
        "Разложите общую дисперсию исхода модели на доли, приходящиеся на отдельные входные параметры и их взаимодействия.",
        "Рассчитайте индексы Соболя первого порядка (S_i) для оценки изолированного влияния каждого фактора.",
        "Рассчитайте полные индексы Соболя (S_Ti), учитывающие кросс-факторные нелинейные связки.",
        "Ранжируйте переменные, выделив критические факторы, определяющие свыше 90% волатильности системы.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","sobol-indices","sensitivity-analysis","variance","modeling"],
    }),
  },

  "boundary-value-equivalence-partitioning": {
    id: "boundary-value-equivalence-partitioning",
    name: "BoundaryValueEquivalencePartitioningSkill",
    displayName: "Boundary Value & Equivalence Class Partitioning",
    categoryId: "analysis",
    description: "Partitions input domains into valid/invalid equivalence classes and tests exact mathematical boundary edges (min-1, min, max, max+1).",
    tags: ["analysis","boundary-value","qa","testing","equivalence-partitioning"],
    transform: createStandardSkillTransform({
      sectionName: "Boundary Value & Equivalence Partitioning Protocol",
      ruSectionName: "Граничные значения и классы эквивалентности (Boundary Value Analysis)",
      instructions: [
        "Divide the input domain into distinct equivalence classes where the system should behave identically.",
        "Test exact boundary edges: Minimum - 1, Minimum, Nominal value, Maximum, Maximum + 1.",
        "Test data type boundaries: 0, -1, 1, INT_MAX, INT_MIN, empty string, single-char, max-length string, and null/undefined.",
        "Verify that invalid classes trigger clean, structured error responses without unhandled 500 exceptions.",
      ],
      ruInstructions: [
        "Разбейте область входных данных на классы эквивалентности, в рамках которых система ведет себя одинаково.",
        "Протестируйте точные границы диапазонов: Мин - 1, Мин, Номинал, Макс, Макс + 1.",
        "Проверьте экстремумы типов данных: 0, -1, INT_MAX, пустая строка, спецсимволы, максимальная длина, null/undefined.",
        "Убедитесь, что недопустимые классы вызывают контролируемые ошибки 4xx без падений сервера с кодом 500.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","boundary-value","qa","testing","equivalence-partitioning"],
    }),
  },

  "code-churn-vs-defect-density-correlation": {
    id: "code-churn-vs-defect-density-correlation",
    name: "CodeChurnVsDefectDensityCorrelationSkill",
    displayName: "Code Churn vs Defect Density Correlation Audit",
    categoryId: "analysis",
    description: "Correlates git commit churn (lines added/modified/deleted) with bug incident clusters to pinpoint fragile code modules.",
    tags: ["analysis","code-churn","defect-density","git-metrics","technical-debt"],
    transform: createStandardSkillTransform({
      sectionName: "Code Churn & Hotspot Defect Correlation Protocol",
      ruSectionName: "Корреляция частоты изменений кода (Churn) и плотности дефектов",
      instructions: [
        "Extract git history metrics: calculate churn rate (lines modified per week) and revision count per file.",
        "Overlay historical defect tickets and bug regressions onto the file topology.",
        "Isolate high-churn, high-defect \"hotspots\" exhibiting fragile technical debt and lack of test coverage.",
        "Prioritize these fragile hotspot files for targeted refactoring and automated contract testing.",
      ],
      ruInstructions: [
        "Соберите метрики git-репозитория: частота правок строк в неделю и число ревизий по каждому файлу.",
        "Наложите историю инцидентов и баг-репортов на топологию исходного кода проекта.",
        "Выделите горячие точки (hotspots) с высокой частотой правок и высокой концентрацией ошибок.",
        "Назначьте эти нестабильные модули первоочередными кандидатами на декомпозицию и покрытие тестами.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","code-churn","defect-density","git-metrics","technical-debt"],
    }),
  },

  "telemetry-cardinality-explosion-audit": {
    id: "telemetry-cardinality-explosion-audit",
    name: "TelemetryCardinalityExplosionAuditSkill",
    displayName: "Metrics High-Cardinality Explosion Audit",
    categoryId: "analysis",
    description: "Audits Prometheus/OpenTelemetry metric labels to prevent cardinality explosions and memory exhaustion in TSDBs.",
    tags: ["analysis","cardinality","telemetry","prometheus","observability"],
    transform: createStandardSkillTransform({
      sectionName: "Telemetry High-Cardinality Prevention Protocol",
      ruSectionName: "Аудит взрыва кардинальности метрик (Prometheus / TSDB)",
      instructions: [
        "Audit all metric label keys: strictly forbid unbounded dynamic identifiers (UUIDs, user IDs, raw timestamps, full URLs with query params).",
        "Calculate theoretical label permutation count: multiply unique values across all label keys per metric.",
        "Enforce label whitelists: restrict labels to low-cardinality enumerations (status_code, method, region, service_name).",
        "Transition high-cardinality debugging attributes into OpenTelemetry trace spans or structured logs rather than metric dimensions.",
      ],
      ruInstructions: [
        "Проверьте ключи меток метрик: запретите использование UUID, ID пользователей, полных URL и таймстемпов в лейблах.",
        "Рассчитайте число перестановок: произведение уникальных значений всех лейблов не должно превышать допустимый лимит TSDB.",
        "Ограничивайте метки перечислимыми константами: код ответа (200, 500), HTTP-метод, регион, имя микросервиса.",
        "Переносите высококардинальные атрибуты в распределенные спаны трейсинга или логи, разгружая базу метрик.",
      ],
      semanticType: "constraints",
      tags: ["analysis","cardinality","telemetry","prometheus","observability"],
    }),
  },

  "heap-dump-memory-leak-retainer-tree": {
    id: "heap-dump-memory-leak-retainer-tree",
    name: "HeapDumpMemoryLeakRetainerTreeSkill",
    displayName: "Heap Dump Memory Leak & Retainer Tree Analysis",
    categoryId: "analysis",
    description: "Analyzes V8/JVM heap dumps, identifies shallow vs retained heap size anomalies, and traces dominator trees to roots.",
    tags: ["analysis","memory-leak","heap-dump","profiling","garbage-collection"],
    transform: createStandardSkillTransform({
      sectionName: "Heap Dump Retainer Tree Analysis Architecture",
      ruSectionName: "Анализ утечек памяти и дерева удержания объектов (Heap Dump)",
      instructions: [
        "Differentiate Shallow Size (memory allocated to object itself) from Retained Size (memory freed if object were garbage collected).",
        "Trace Dominator Tree upwards to identify which GC Root (closure, global event listener, uncleaned cache) retains the leaking instances.",
        "Detect common leak patterns: forgotten RxJS/EventEmitter subscriptions, detached DOM nodes, and unbounded Map caches.",
        "Recommend precise teardown lifecycle hooks (`dispose()`, `unsubscribe()`, WeakMap references) to resolve retention.",
      ],
      ruInstructions: [
        "Различайте собственный размер объекта (Shallow Size) и удерживаемый объем памяти (Retained Size).",
        "Проследите дерево доминаторов вверх до корня сборщика мусора (GC Root), удерживающего неиспользуемые объекты.",
        "Выявляйте типичные утечки: забытые подписки на события, отсоединенные узлы DOM, неочищаемые глобальные Map.",
        "Предлагайте точные хуки очистки жизненного цикла (`onDestroy`, `unsubscribe`, использование WeakMap/WeakRef).",
      ],
      semanticType: "process_directive",
      tags: ["analysis","memory-leak","heap-dump","profiling","garbage-collection"],
    }),
  },

  "sql-execution-plan-cost-buffer-audit": {
    id: "sql-execution-plan-cost-buffer-audit",
    name: "SqlExecutionPlanCostBufferAuditSkill",
    displayName: "SQL Execution Plan & Buffer Cache Hit Ratio Audit",
    categoryId: "analysis",
    description: "Deeply analyzes `EXPLAIN (ANALYZE, BUFFERS)` plans: sequential scans, nested loop spills, and buffer cache misses.",
    tags: ["analysis","sql","explain-analyze","database","query-optimization"],
    transform: createStandardSkillTransform({
      sectionName: "SQL EXPLAIN ANALYZE Buffer Audit Architecture",
      ruSectionName: "Аудит планов выполнения SQL (EXPLAIN ANALYZE BUFFERS)",
      instructions: [
        "Examine execution plans for catastrophic Sequential Scans on tables exceeding 10,000 rows.",
        "Compare Estimated Rows vs Actual Rows: discrepancy >10x indicates stale table statistics requiring `ANALYZE`.",
        "Analyze Shared Hit vs Read buffers: identify queries performing excessive disk reads instead of in-memory buffer hits.",
        "Diagnose suboptimal joins: suggest covering indexes (INCLUDE clause) to convert Seq Scans into Index Only Scans.",
      ],
      ruInstructions: [
        "Ищите последовательные сканирования (Seq Scan) на таблицах размером более 10 000 строк.",
        "Сравнивайте расчетное и реальное число строк (Estimated vs Actual): расхождение >10 раз говорит об устаревшей статистике таблицы.",
        "Анализируйте буферы (Shared Hit vs Read): выявляйте запросы, считывающие данные с диска вместо буферного кэша RAM.",
        "Оптимизируйте соединения: проектируйте покрывающие индексы (INCLUDE) для перехода к Index Only Scan.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","sql","explain-analyze","database","query-optimization"],
    }),
  },

  "distributed-deadlock-wait-for-graph": {
    id: "distributed-deadlock-wait-for-graph",
    name: "DistributedDeadlockWaitForGraphSkill",
    displayName: "Distributed Deadlock & Wait-For Graph Cycle Detection",
    categoryId: "analysis",
    description: "Models lock contention across distributed services as a directed Wait-For Graph (WFG) and detects cyclic deadlock dependencies.",
    tags: ["analysis","deadlock","concurrency","distributed-systems","locks"],
    transform: createStandardSkillTransform({
      sectionName: "Wait-For Graph Deadlock Detection Protocol",
      ruSectionName: "Обнаружение распределенных взаимных блокировок (Wait-For Graph)",
      instructions: [
        "Construct a directed Wait-For Graph (WFG) where nodes represent active transactions/threads and directed edges represent lock requests.",
        "Execute Tarjan's or Johnson's cycle detection algorithm to identify circular lock dependencies: T1 -> T2 -> ... -> T1.",
        "Enforce global resource ordering conventions: mandate acquiring distributed locks in strictly deterministic alphanumeric order.",
        "Implement lock lease timeouts and abort-and-retry policies for the transaction contributing the least work.",
      ],
      ruInstructions: [
        "Постройте граф ожидания (WFG): узлы — активные транзакции/потоки, ребра — ожидаемые блокировки ресурсов.",
        "Примените алгоритм поиска циклов для обнаружения кольцевых блокировок (T1 ждет T2, T2 ждет T1).",
        "Внедрите строгое глобальное упорядочивание захвата блокировок в алфавитном порядке их ключей.",
        "Настройте тайм-ауты удержания блокировок и алгоритм прерывания транзакции с наименьшим выполненным объемом работ.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","deadlock","concurrency","distributed-systems","locks"],
    }),
  },

  "tcp-network-mtu-window-loss-audit": {
    id: "tcp-network-mtu-window-loss-audit",
    name: "TcpNetworkMtuWindowLossAuditSkill",
    displayName: "TCP Window, MTU & Packet Loss Degradation Audit",
    categoryId: "analysis",
    description: "Diagnoses network transport throughput bottlenecks: TCP congestion window collapse, MTU black holes, and packet loss.",
    tags: ["analysis","networking","tcp","mtu","throughput","latency"],
    transform: createStandardSkillTransform({
      sectionName: "TCP Transport & Network Degradation Protocol",
      ruSectionName: "Аудит пропускной способности TCP, MTU и потери пакетов",
      instructions: [
        "Calculate Bandwidth-Delay Product (BDP = Bandwidth x RTT) to determine minimum required TCP window buffer size.",
        "Diagnose Path MTU Discovery (PMTUD) black holes caused by intermediate firewalls dropping ICMP \"Fragmentation Needed\" packets.",
        "Audit TCP retransmission rates: packet loss >1% triggers severe cubic/reno congestion window collapse.",
        "Recommend BBR congestion control algorithm and TCP window scaling flags for high-BDP cross-region pipes.",
      ],
      ruInstructions: [
        "Рассчитайте произведение пропускной способности на задержку (BDP) для настройки буферов окна TCP.",
        "Диагностируйте «черные дыры» MTU при блокировке сетевыми экранами пакетов ICMP «Fragmentation Needed».",
        "Анализируйте долю повторных передач (retransmits): потеря пакетов >1% обрушивает окно перегрузки TCP.",
        "Рекомендуйте алгоритм контроля перегрузки BBR для высокоскоростных межрегиональных каналов связи.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","networking","tcp","mtu","throughput","latency"],
    }),
  },

  "cache-hit-ratio-eviction-curve-analysis": {
    id: "cache-hit-ratio-eviction-curve-analysis",
    name: "CacheHitRatioEvictionCurveAnalysisSkill",
    displayName: "Cache Hit Ratio & Eviction Curve Analysis",
    categoryId: "analysis",
    description: "Models cache capacity vs hit ratio curves (LRU/LFU/ARC), identifying working set knee points and optimal TTL horizons.",
    tags: ["analysis","caching","lru","hit-ratio","performance"],
    transform: createStandardSkillTransform({
      sectionName: "Cache Working Set & Eviction Curve Protocol",
      ruSectionName: "Анализ кривой попаданий кэша (Hit Ratio) и вытеснения ключей",
      instructions: [
        "Plot cache size against hit ratio percentage to isolate the working set \"knee point\" of diminishing returns.",
        "Compare eviction algorithm suitability: LRU (recency) vs LFU (frequency) vs Adaptive Replacement Cache (ARC).",
        "Analyze TTL distributions: eliminate premature evictions of hot data caused by under-provisioned memory bounds.",
        "Detect cache churn where high-frequency writes evict stable read-heavy items.",
      ],
      ruInstructions: [
        "Постройте график зависимости процента попаданий (Hit Ratio) от объема памяти кэша для нахождения точки перегиба.",
        "Сравните алгоритмы вытеснения: LRU (свежесть) против LFU (частота) и адаптивного ARC.",
        "Проверьте распределение TTL: исключите преждевременное вытеснение горячих ключей из-за дефицита RAM.",
        "Выявляйте паразитный шум кэша (cache churn), когда частые однократные записи вымывают стабильные данные.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","caching","lru","hit-ratio","performance"],
    }),
  },

  "thread-contention-lock-profiling": {
    id: "thread-contention-lock-profiling",
    name: "ThreadContentionLockProfilingSkill",
    displayName: "Thread Contention & Lock Profiling Analysis",
    categoryId: "analysis",
    description: "Profiles mutex/spinlock wait times, monitor inflation, and CPU core under-utilization caused by coarse-grained synchronized locks.",
    tags: ["analysis","thread-contention","concurrency","multithreading","locks"],
    transform: createStandardSkillTransform({
      sectionName: "Thread Contention & Lock Profiling Architecture",
      ruSectionName: "Профилирование конкуренции потоков и блокировок (Lock Contention)",
      instructions: [
        "Measure percentage of thread time spent in BLOCKED or WAITING state versus active RUNNABLE state.",
        "Identify coarse-grained critical sections where multiple threads serialize on a single shared mutex.",
        "Recommend lock-striping, read-write locks (`SharedMutex`), or lock-free atomic primitives (`AtomicLong`, CAS).",
        "Verify that thread pool sizing matches hardware parallelism: CPU-bound (N_threads = N_cores + 1) vs I/O-bound.",
      ],
      ruInstructions: [
        "Измерьте долю времени потоков в состоянии ожидания (BLOCKED / WAITING) по сравнению с активным выполнением (RUNNABLE).",
        "Выявите слишком крупные критические секции, где потоки выстраиваются в очередь на одном мьютексе.",
        "Предложите разделение блокировок (lock striping), чтение-запись (ReadWriteLock) или lock-free атомики (CAS).",
        "Проверьте соответствие пула потоков типу нагрузки: CPU-bound (число ядер + 1) против I/O-bound.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","thread-contention","concurrency","multithreading","locks"],
    }),
  },

  "blast-radius-topological-graph-traversal": {
    id: "blast-radius-topological-graph-traversal",
    name: "BlastRadiusTopologicalGraphTraversalSkill",
    displayName: "Topological Blast Radius & Failure Propagation Traversal",
    categoryId: "analysis",
    description: "Traverses directed service dependency graphs to compute maximum blast radius, downstream cascading risks, and critical failure nodes.",
    tags: ["analysis","blast-radius","dependency-graph","cascading-failure","topology"],
    transform: createStandardSkillTransform({
      sectionName: "Topological Blast Radius Traversal Protocol",
      ruSectionName: "Топологический расчет радиуса поражения (Blast Radius Analysis)",
      instructions: [
        "Construct a directed acyclic graph (DAG) of all synchronous RPC, database, and message queue dependencies.",
        "Simulate failure of a single upstream node: traverse the dependency graph to compute all reachable downstream impacted services.",
        "Quantify the Total Blast Radius: number of affected end-user endpoints, degraded SLAs, and transactional revenue at risk.",
        "Locate missing bulkheads, circuit breakers, and fallback caches that fail to arrest propagation.",
      ],
      ruInstructions: [
        "Постройте направленный граф синхронных RPC-вызовов, баз данных и очередей сообщений.",
        "Смоделируйте отказ отдельного узла: обойдите граф зависимостей для выявления всех каскадно затронутых сервисов.",
        "Количественно оцените радиус поражения: число недоступных эндпоинтов, падение SLA и финансовые потери.",
        "Укажите места отсутствия изоляционных переборок (bulkheads) и предохранителей (circuit breakers).",
      ],
      semanticType: "process_directive",
      tags: ["analysis","blast-radius","dependency-graph","cascading-failure","topology"],
    }),
  },

  "cognitive-walkthrough-usability-inspection": {
    id: "cognitive-walkthrough-usability-inspection",
    name: "CognitiveWalkthroughUsabilityInspectionSkill",
    displayName: "Wharton Cognitive Walkthrough Usability Inspection",
    categoryId: "analysis",
    description: "Evaluates task workflows step-by-step through 4 cognitive questions: user intent, action visibility, action association, and feedback.",
    tags: ["analysis","cognitive-walkthrough","ux","usability","hci"],
    transform: createStandardSkillTransform({
      sectionName: "Cognitive Walkthrough Usability Inspection Protocol",
      ruSectionName: "Когнитивное пошаговое прохождение сценариев (Cognitive Walkthrough)",
      instructions: [
        "Deconstruct the user journey into discrete mechanical micro-actions required to achieve the goal.",
        "Answer 4 questions for every action: 1) Will the user try to achieve the right effect? 2) Is the action visible? 3) Will the user recognize the action achieves the desired effect? 4) Does the user get clear feedback?",
        "Document every friction point where user mental model diverges from system designer assumptions.",
        "Redesign problematic steps to provide immediate visual signifiers and feedback confirmations.",
      ],
      ruInstructions: [
        "Разложите пользовательский сценарий на последовательность конкретных действий для достижения цели.",
        "Ответьте на 4 вопроса для каждого шага: 1) Понятно ли пользователю, что нужно делать? 2) Виден ли нужный элемент? 3) Свяжет ли он этот элемент со своей целью? 4) Получит ли понятную обратную связь?",
        "Зафиксируйте точки трения, где ментальная модель пользователя расходится с логикой интерфейса.",
        "Скорректируйте интерфейс, добавив явные визуальные подсказки и подтверждения статуса операции.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","cognitive-walkthrough","ux","usability","hci"],
    }),
  },

  "cyclomatic-complexity-mccabe-audit": {
    id: "cyclomatic-complexity-mccabe-audit",
    name: "CyclomaticComplexityMccabeAuditSkill",
    displayName: "McCabe Cyclomatic Complexity Metric Audit",
    categoryId: "analysis",
    description: "Calculates McCabe cyclomatic complexity M = E - N + 2P across control-flow graphs, flagging functions with M > 10 for refactoring.",
    tags: ["analysis","cyclomatic-complexity","mccabe","code-metrics","refactoring"],
    transform: createStandardSkillTransform({
      sectionName: "McCabe Cyclomatic Complexity Audit Protocol",
      ruSectionName: "Аудит цикломатической сложности Маккейба (M = E - N + 2P)",
      instructions: [
        "Construct control-flow graphs for critical procedures and count decision points (if, while, for, case, catch, &&, ||).",
        "Compute cyclomatic complexity M; enforce hard ceiling of M <= 10 for standard modules and M <= 15 for complex state machines.",
        "Refactor high-complexity functions using extract-method, strategy patterns, or lookup tables.",
        "Require 100% branch test coverage matching the calculated linearly independent path count.",
      ],
      ruInstructions: [
        "Постройте граф потока управления и подсчитайте число точек ветвления (if, while, for, case, catch, &&, ||).",
        "Рассчитайте цикломатическую сложность M; требуйте удержания M <= 10 для стандартных функций.",
        "Декомпозируйте функции с M > 10 через выделение методов, паттерн Strategy или таблицы переходов.",
        "Обеспечьте 100% покрытие тестами всех линейно независимых путей выполнения.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","cyclomatic-complexity","mccabe","code-metrics","refactoring"],
    }),
  },

  "halstead-software-science-metrics": {
    id: "halstead-software-science-metrics",
    name: "HalsteadSoftwareScienceMetricsSkill",
    displayName: "Halstead Complexity & Cognitive Volume Metrics",
    categoryId: "analysis",
    description: "Measures distinct operators and operands to calculate Halstead Program Length, Volume, Difficulty, and Estimated Bugs.",
    tags: ["analysis","halstead","software-metrics","cognitive-volume","effort"],
    transform: createStandardSkillTransform({
      sectionName: "Halstead Software Science Measurement Protocol",
      ruSectionName: "Метрики программной сложности Холстеда (Halstead Metrics)",
      instructions: [
        "Count distinct operators (n1), distinct operands (n2), total operators (N1), and total operands (N2).",
        "Calculate Program Vocabulary n = n1 + n2, Length N = N1 + N2, and Program Volume V = N * log2(n).",
        "Compute Difficulty D = (n1 / 2) * (N2 / n2) and Effort E = D * V to evaluate maintenance burden.",
        "Estimate latent defect count B = V / 3000 to allocate targeted code-review focus.",
      ],
      ruInstructions: [
        "Подсчитайте число уникальных операторов (n1), операндов (n2) и их суммарные вхождения (N1, N2).",
        "Рассчитайте словарь программы n = n1 + n2, длину N = N1 + N2 и когнитивный объем V = N * log2(n).",
        "Оцените сложность понимания D и трудоемкость поддержки E = D * V.",
        "Рассчитайте ожидаемое число дефектов B = V / 3000 для приоритезации ревью.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","halstead","software-metrics","cognitive-volume","effort"],
    }),
  },

  "chappatte-defect-latency-window": {
    id: "chappatte-defect-latency-window",
    name: "ChappatteDefectLatencyWindowSkill",
    displayName: "Defect Latency Window & Escaped Bug Audit",
    categoryId: "analysis",
    description: "Tracks time lag between bug introduction and production detection, pinpointing QA and CI feedback loop failures.",
    tags: ["analysis","defect-latency","qa","escaped-defects","ci-cd"],
    transform: createStandardSkillTransform({
      sectionName: "Defect Latency & Escaped Bug Analysis Protocol",
      ruSectionName: "Анализ задержки обнаружения дефектов (Defect Latency Window)",
      instructions: [
        "Calculate Defect Latency: timestamp difference between original committing git sha and production bug report.",
        "Categorize escape points: Unit test gap, Integration gap, Staging discrepancy, or Observability blind spot.",
        "Mandate that every escaped bug postmortem produce at least one automated test reproducing the defect in pre-merge CI.",
        "Track trend lines of Mean Time to Detect (MTTD) across engineering squads.",
      ],
      ruInstructions: [
        "Измеряйте задержку обнаружения: разницу во времени между коммитом бага и сообщением об аварии в проде.",
        "Классифицируйте точку пропуска: пробел unit-тестов, интеграционный стык или расхождение сред.",
        "Обязывайте по каждому пропущенному багу добавлять регрессионный тест в pre-merge пайплайн.",
        "Отслеживайте динамику среднего времени обнаружения (MTTD) по подсистемам.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","defect-latency","qa","escaped-defects","ci-cd"],
    }),
  },

  "chaos-mesh-blast-radius-partition": {
    id: "chaos-mesh-blast-radius-partition",
    name: "ChaosMeshBlastRadiusPartitionSkill",
    displayName: "Chaos Mesh Network Partition Failure Matrix",
    categoryId: "analysis",
    description: "Simulates Kubernetes pod-to-pod network drops, asymmetric packet delays, and split-brain DNS blackholes.",
    tags: ["analysis","chaos-mesh","fault-injection","network-partition","resilience"],
    transform: createStandardSkillTransform({
      sectionName: "Chaos Mesh Fault Injection & Partition Matrix",
      ruSectionName: "Матрица сетевых разделений и сбоев (Chaos Mesh)",
      instructions: [
        "Inject synthetic network partition scenarios: isolate leader nodes from followers in distributed state stores.",
        "Verify that consensus systems (Raft/Paxos) gracefully halt writes rather than accepting split-brain mutations.",
        "Introduce asymmetric latency (e.g. 500ms delay in one direction) to test timeout and circuit breaker coordination.",
        "Confirm automated self-healing and data reconciliation upon partition healing.",
      ],
      ruInstructions: [
        "Имитируйте сетевое разделение (network partition) между лидером и репликами в распределенных базах.",
        "Проверяйте, что система консенсуса останавливает запись при потере кворума, исключая рассинхронизацию (split-brain).",
        "Внедряйте асимметричные задержки трафика (500 мс в одну сторону) для стресс-теста таймаутов.",
        "Контролируйте автоматическое восстановление связности и синхронизацию данных после снятия сбоя.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","chaos-mesh","fault-injection","network-partition","resilience"],
    }),
  },

  "flaky-test-quarantine-entropy-audit": {
    id: "flaky-test-quarantine-entropy-audit",
    name: "FlakyTestQuarantineEntropyAuditSkill",
    displayName: "Flaky Test Quarantine & Non-Determinism Entropy Audit",
    categoryId: "analysis",
    description: "Detects non-deterministic test failures caused by async race conditions, wall-clock coupling, or shared test state.",
    tags: ["analysis","flaky-tests","ci-cd","testing","determinism"],
    transform: createStandardSkillTransform({
      sectionName: "Flaky Test Quarantine & Root-Cause Protocol",
      ruSectionName: "Карантин и аудит недетерминированных тестов (Flaky Tests)",
      instructions: [
        "Run suspect test suites 50 times in randomized order to compute empirical failure variance.",
        "Isolate top flakiness triggers: non-mocked `Date.now()`, unawaited asynchronous promises, and shared database state.",
        "Automatically quarantine flaky tests into an isolated non-blocking CI pipeline while alerting owners.",
        "Require deterministic mocking of clocks, virtual timers, and isolated database schemas before de-quarantining.",
      ],
      ruInstructions: [
        "Запускайте подозрительный набор тестов 50 раз со случайным порядком выполнения для выявления нестабильности.",
        "Локализуйте причины: немокированное системное время (`Date.now()`), гонки промисов, общая база данных.",
        "Изолируйте флакающие тесты в отдельный неблокирующий пайплайн с оповещением авторов.",
        "Требуйте использования виртуального времени, явных ожиданий и очистки тестовых баз перед возвратом из карантина.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","flaky-tests","ci-cd","testing","determinism"],
    }),
  },

  "strangler-fig-migration-progress-audit": {
    id: "strangler-fig-migration-progress-audit",
    name: "StranglerFigMigrationProgressAuditSkill",
    displayName: "Strangler Fig Migration & Cutover Progress Audit",
    categoryId: "analysis",
    description: "Tracks incremental monolith-to-microservice migration: proxy route cutovers, data sync lag, and legacy surface retirement.",
    tags: ["analysis","strangler-fig","migration","architecture","legacy-modernization"],
    transform: createStandardSkillTransform({
      sectionName: "Strangler Fig Migration Verification Protocol",
      ruSectionName: "Аудит миграции методом удушения монолита (Strangler Fig)",
      instructions: [
        "Map monolith endpoints to target modern microservice replacements via an API Gateway / Ingress router.",
        "Track percentage of production traffic shifted: 1% canary -> 10% dark traffic -> 50% dual-run -> 100% cutover.",
        "Execute shadow verification: mirror live requests to both legacy and new services, comparing responses for diff discrepancies.",
        "Formally deprecate and physically delete retired monolith code paths to prevent ghost maintenance overhead.",
      ],
      ruInstructions: [
        "Свяжите эндпоинты монолита с новыми микросервисами через проксирующий шлюз (API Gateway).",
        "Отслеживайте прогресс переключения трафика: 1% канарейка -> 10% теневой трафик -> 50% дублирующий прогон -> 100% релиз.",
        "Проводите теневую сверку (shadow traffic): дублируйте боевые запросы в обе системы и сравнивайте ответы.",
        "Физически удаляйте старый код монолита после переключения трафика, исключая фантомный техдолг.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","strangler-fig","migration","architecture","legacy-modernization"],
    }),
  },

  "cache-stampede-probabilistic-xfetch-audit": {
    id: "cache-stampede-probabilistic-xfetch-audit",
    name: "CacheStampedeProbabilisticXfetchAuditSkill",
    displayName: "Cache Stampede XFetch Probabilistic Early Refresh",
    categoryId: "analysis",
    description: "Audits hot key caching under high concurrent read loads, applying the XFetch algorithm to eliminate thundering herd stampedes.",
    tags: ["analysis","cache-stampede","xfetch","redis","concurrency"],
    transform: createStandardSkillTransform({
      sectionName: "Cache Stampede & XFetch Probabilistic Audit",
      ruSectionName: "Защита от лавины кэша (Cache Stampede / XFetch Algorithm)",
      instructions: [
        "Identify critical cache keys experiencing read concurrency >1,000 QPS with computation duration >100ms.",
        "Implement the probabilistic XFetch algorithm: refresh cache asynchronously before hard expiry when `delta * beta * log(random()) > (expiry - now)`.",
        "Complement with distributed mutex locking on cache misses ensuring only a single worker recomputes backend data.",
        "Verify that database read spikes during key expiry remain strictly zero.",
      ],
      ruInstructions: [
        "Выявляйте горячие ключи кэша с нагрузкой >1000 RPS и длительностью генерации ответа >100 мс.",
        "Внедряйте алгоритм вероятностного обновления XFetch для асинхронного фонового пересчета до наступления TTL.",
        "Дополняйте распределенной мьютекс-блокировкой на случай холодного старта, допуская к БД ровно один поток.",
        "Контролируйте отсутствие всплесков нагрузки на базу данных в моменты планового сброса кэша.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","cache-stampede","xfetch","redis","concurrency"],
    }),
  },

  "db-connection-pool-sizing-amdahls-law": {
    id: "db-connection-pool-sizing-amdahls-law",
    name: "DbConnectionPoolSizingAmdahlsLawSkill",
    displayName: "HikariCP Database Connection Pool Sizing & Wait Ratio",
    categoryId: "analysis",
    description: "Calculates optimal DB pool sizing using `connections = (cores * 2) + disk_spindle_count` to eliminate queue saturation.",
    tags: ["analysis","connection-pool","hikaricp","database","performance"],
    transform: createStandardSkillTransform({
      sectionName: "Database Connection Pool Optimization Protocol",
      ruSectionName: "Расчет пула соединений БД (HikariCP / Amdahl's Law)",
      instructions: [
        "Eliminate oversized pools: prove why 1,000 connections cause CPU thrashing and context-switch degradation on a 16-core database.",
        "Apply standard hardware sizing formula: `connections = (cpu_cores * 2) + effective_spindle_count`.",
        "Monitor pool acquisition latency metrics: alert when pool wait time exceeds 10ms.",
        "Configure aggressive leak detection thresholds and connection timeout limits.",
      ],
      ruInstructions: [
        "Устраняйте завышенные размеры пулов: покажите, почему 1000 коннектов убивают 16-ядерную БД переключением контекстов.",
        "Применяйте стандартную формулу калибровки: `число_коннектов = (ядра_CPU * 2) + дисковые_шпиндели`.",
        "Мониторьте задержку захвата коннекта из пула: поднимайте алерт при ожидании более 10 мс.",
        "Настраивайте детекцию утечек коннектов (leak detection) и жесткий таймаут ожидания соединения.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","connection-pool","hikaricp","database","performance"],
    }),
  },

  "api-rate-limit-token-bucket-capacity": {
    id: "api-rate-limit-token-bucket-capacity",
    name: "ApiRateLimitTokenBucketCapacitySkill",
    displayName: "Token Bucket & Leaky Bucket API Rate Limit Calibration",
    categoryId: "analysis",
    description: "Calculates token refill rates, burst capacity buffers, and sliding window counters to protect backend APIs from overload.",
    tags: ["analysis","rate-limiting","token-bucket","api-gateway","dos-protection"],
    transform: createStandardSkillTransform({
      sectionName: "API Rate Limiting & Token Bucket Calibration",
      ruSectionName: "Калибровка лимитов запросов API (Token Bucket / Sliding Window)",
      instructions: [
        "Select rate limiting algorithm: Token Bucket (supports bursts), Leaky Bucket (smooth pacing), or Sliding Window Counter.",
        "Define burst capacity and continuous refill rate per tenant tier (free vs enterprise).",
        "Emit standard HTTP headers on every response: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `Retry-After`.",
        "Verify graceful HTTP 429 response handling without backend connection exhaustion.",
      ],
      ruInstructions: [
        "Подбирайте алгоритм ограничения: Token Bucket (допускает пиковые всплески), Leaky Bucket (сглаживание) или Sliding Window.",
        "Задавайте емкость ведра и скорость пополнения токенов по тарифным планам (бесплатный vs Enterprise).",
        "Возвращайте стандартные заголовки: `X-RateLimit-Limit`, `X-RateLimit-Remaining` и `Retry-After` при превышении.",
        "Контролируйте выдачу статуса 429 Too Many Requests без расходования ресурсов внутренних сервисов.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","rate-limiting","token-bucket","api-gateway","dos-protection"],
    }),
  },

  "sla-sli-slo-error-budget-burn-rate": {
    id: "sla-sli-slo-error-budget-burn-rate",
    name: "SlaSliSloErrorBudgetBurnRateSkill",
    displayName: "Multi-Window Multi-Burn-Rate SLO Alerting",
    categoryId: "analysis",
    description: "Implements Google SRE multi-window burn rate alerts (14.4x for 1h, 6x for 6h) to eliminate alert fatigue while catching outages.",
    tags: ["analysis","sre","slo","sli","error-budget","burn-rate"],
    transform: createStandardSkillTransform({
      sectionName: "Error Budget Multi-Burn-Rate Alerting Architecture",
      ruSectionName: "Алертинг по скорости расхода бюджета ошибок (Error Budget Burn Rate)",
      instructions: [
        "Define quantitative SLI: ratio of successful fast requests to total valid requests over a rolling 30-day window.",
        "Set target SLO (e.g. 99.9%) and determine Error Budget (0.1% = 43 minutes of total downtime per month).",
        "Implement multi-window alerts: Page on-call only when 1-hour burn rate > 14.4x (2% budget consumed in 1 hour).",
        "Create ticket alerts for slow 3-day burn rates (>1x) without paging engineers at night.",
      ],
      ruInstructions: [
        "Определите SLI: долю быстрых успешных запросов к общему числу за 30-дневное скользящее окно.",
        "Задайте целевой SLO (99.9%) и рассчитайте бюджет ошибок (0.1% = 43 минуты простоя в месяц).",
        "Настройте пейджерный алерт только при скорости сгорания бюджета > 14.4x за 1 час (тратится 2% бюджета за час).",
        "Медленные утечки бюджета (1x за 3 дня) направляйте в тикеты в рабочее время без ночных звонков.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","sre","slo","sli","error-budget","burn-rate"],
    }),
  },

  "canary-statistical-mann-whitney-u-test": {
    id: "canary-statistical-mann-whitney-u-test",
    name: "CanaryStatisticalMannWhitneyUTestSkill",
    displayName: "Canary Analysis via Mann-Whitney U-Test",
    categoryId: "analysis",
    description: "Applies non-parametric statistical Mann-Whitney U testing to compare canary vs baseline latency and error distributions.",
    tags: ["analysis","canary","mann-whitney","ab-testing","statistics"],
    transform: createStandardSkillTransform({
      sectionName: "Canary Non-Parametric Hypothesis Testing Protocol",
      ruSectionName: "Статистический анализ канареечного релиза (Критерий Манна-Уитни)",
      instructions: [
        "Collect raw latency and error distributions from twin baseline and canary deployment cohorts.",
        "Reject naive mean comparison: apply non-parametric Mann-Whitney U-test to handle skewed, multi-modal latency curves.",
        "Compute p-value against null hypothesis that canary performance is identical to baseline; set alpha = 0.01.",
        "Trigger automatic canary rollback if p-value demonstrates statistically significant performance regression.",
      ],
      ruInstructions: [
        "Соберите замеры задержки и ошибок с контрольной (baseline) и канареечной (canary) групп подов.",
        "Откажитесь от сравнения средних: примените непараметрический U-критерий Манна-Уитни для мультимодальных распределений.",
        "Рассчитайте p-значение против нулевой гипотезы об идентичности выборок с порогом альфа = 0.01.",
        "Запускайте автоматический откат релиза при обнаружении статистически значимой деградации метрик.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","canary","mann-whitney","ab-testing","statistics"],
    }),
  },

  "circuit-breaker-hysteresis-state-machine": {
    id: "circuit-breaker-hysteresis-state-machine",
    name: "CircuitBreakerHysteresisStateMachineSkill",
    displayName: "Circuit Breaker State Machine & Exponential Recovery",
    categoryId: "analysis",
    description: "Designs Closed, Open, and Half-Open circuit breaker state machines with failure rate thresholds and gradual traffic probing.",
    tags: ["analysis","circuit-breaker","resilience","state-machine","distributed-systems"],
    transform: createStandardSkillTransform({
      sectionName: "Circuit Breaker Hysteresis State Machine Protocol",
      ruSectionName: "Конечный автомат предохранителя с гистерезисом (Circuit Breaker)",
      instructions: [
        "Model the 3 canonical states: Closed (normal traffic), Open (fast-fail without calling downstream), and Half-Open (trial probing).",
        "Trip from Closed to Open when error rate exceeds threshold (e.g. >50% failures over 10-second rolling window).",
        "Transition to Half-Open after sleep window (e.g. 30 seconds), permitting exactly 5% trial requests.",
        "Return to Closed if all trial requests succeed; reset sleep window with exponential backoff if any trial request fails.",
      ],
      ruInstructions: [
        "Моделируйте 3 состояния: Closed (норма), Open (мгновенный сброс без вызова), Half-Open (пробный зонд).",
        "Переходите в Open при превышении порога ошибок (более 50% сбоев за 10-секундное окно).",
        "Переходите в Half-Open по истечении тайм-аута (30 сек), допуская ровно 5% пробных запросов.",
        "Возвращайтесь в Closed при успехе всех пробных запросов; удваивайте паузу при повторном сбое.",
      ],
      semanticType: "structural_directive",
      tags: ["analysis","circuit-breaker","resilience","state-machine","distributed-systems"],
    }),
  },

  "distributed-tracing-critical-path-analysis": {
    id: "distributed-tracing-critical-path-analysis",
    name: "DistributedTracingCriticalPathAnalysisSkill",
    displayName: "Distributed Trace Critical Path & Longest Sub-Span Analysis",
    categoryId: "analysis",
    description: "Extracts the true critical latency path across asynchronous microservice trace trees, identifying serial blocker spans.",
    tags: ["analysis","distributed-tracing","critical-path","opentelemetry","latency"],
    transform: createStandardSkillTransform({
      sectionName: "Distributed Trace Critical Path Extraction Protocol",
      ruSectionName: "Анализ критического пути в распределенном трейсинге (Critical Path)",
      instructions: [
        "Ingest complete trace span DAGs representing a single end-to-end user transaction.",
        "Differentiate concurrent asynchronous branches from serial blocking dependencies.",
        "Compute the mathematical Critical Path: the contiguous sequence of dependent spans that dictates total duration.",
        "Focus optimization exclusively on spans lying on the critical path; ignore non-critical parallel spans.",
      ],
      ruInstructions: [
        "Загрузите полный граф спанов трейса пользовательской транзакции из OpenTelemetry/Jaeger.",
        "Разделите параллельные асинхронные вызовы и блокирующие синхронные зависимости.",
        "Вычислите критический путь: непрерывную цепочку зависимых спанов, определяющую итоговое время ответа.",
        "Фокусируйте оптимизацию строго на спанах критического пути, игнорируя фоновые параллельные ветки.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","distributed-tracing","critical-path","opentelemetry","latency"],
    }),
  },

  "dns-propagation-ttl-resolution-audit": {
    id: "dns-propagation-ttl-resolution-audit",
    name: "DnsPropagationTtlResolutionAuditSkill",
    displayName: "DNS Propagation, Resolver Caching & Negative TTL Audit",
    categoryId: "analysis",
    description: "Diagnoses domain migration and failover failures caused by lingering recursive DNS resolver caches and negative SOA TTLs.",
    tags: ["analysis","dns","ttl","networking","failover"],
    transform: createStandardSkillTransform({
      sectionName: "DNS Resolution & Propagation Verification Protocol",
      ruSectionName: "Аудит DNS-резолвинга, TTL и кэширования отрицательных ответов",
      instructions: [
        "Pre-migration planning: lower DNS Record TTL to 60 seconds at least 48 hours prior to planned IP cutover.",
        "Audit SOA negative caching TTL: verify that failed NXDOMAIN queries do not get cached for hours across global ISPs.",
        "Detect internal application JVM DNS caching defaults (`networkaddress.cache.ttl = -1` forever) and override to 30 seconds.",
        "Verify dual-stack IPv4 (A) and IPv6 (AAAA) record alignment across all authoritative nameservers.",
      ],
      ruInstructions: [
        "Планирование миграции: снижайте TTL DNS-записей до 60 секунд минимум за 48 часов до переключения IP.",
        "Проверяйте параметр отрицательного кэширования SOA: исключите кэширование ошибок NXDOMAIN на часы у провайдеров.",
        "Устраняйте вечный кэш DNS в JVM (`networkaddress.cache.ttl = -1`), выставляя принудительный таймаут 30 секунд.",
        "Контролируйте синхронность записей IPv4 (A) и IPv6 (AAAA) на всех авторитетных DNS-серверах.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","dns","ttl","networking","failover"],
    }),
  },

  "log-entropy-anomaly-detection": {
    id: "log-entropy-anomaly-detection",
    name: "LogEntropyAnomalyDetectionSkill",
    displayName: "Log Information Entropy & Shannon Anomaly Detection",
    categoryId: "analysis",
    description: "Computes Shannon information entropy over log streams to detect silent zero-day failures and novel unclassified error spikes.",
    tags: ["analysis","log-entropy","shannon-entropy","anomaly-detection","observability"],
    transform: createStandardSkillTransform({
      sectionName: "Log Shannon Entropy Anomaly Detection Protocol",
      ruSectionName: "Детекция аномалий по информационной энтропии логов (Шеннон)",
      instructions: [
        "Tokenize incoming structured log messages into template clusters, stripping dynamic IDs and timestamps.",
        "Compute Shannon Entropy H(X) = -sum(p(x) * log2(p(x))) across log template frequency distributions in 5-minute windows.",
        "Trigger security and operational anomaly alerts on sudden entropy drops (repetitive failure storms) or entropy surges (chaotic crashes).",
        "Isolate the specific new log templates driving the divergence from baseline entropy.",
      ],
      ruInstructions: [
        "Токенизируйте структурированные логи на шаблоны, отделяя переменные ID и таймстемпы.",
        "Рассчитывайте энтропию Шеннона по распределению частот шаблонов за 5-минутные окна.",
        "Поднимайте алерты при резком падении энтропии (шторм однотипных ошибок) или ее всплеске (хаотичный сбой).",
        "Выделяйте новые шаблоны сообщений, вызвавшие отклонение от эталонного профиля энтропии.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","log-entropy","shannon-entropy","anomaly-detection","observability"],
    }),
  },

  "container-cgroup-cpu-throttling-audit": {
    id: "container-cgroup-cpu-throttling-audit",
    name: "ContainerCgroupCpuThrottlingAuditSkill",
    displayName: "Kubernetes CFS CPU Throttling & Quota Audit",
    categoryId: "analysis",
    description: "Diagnoses microservice tail latency spikes caused by Linux Completely Fair Scheduler (CFS) container CPU quota throttling.",
    tags: ["analysis","kubernetes","cfs-throttling","cgroups","performance"],
    transform: createStandardSkillTransform({
      sectionName: "CFS CPU Quota Throttling Diagnostic Protocol",
      ruSectionName: "Диагностика троттлинга CPU в контейнерах Kubernetes (CFS Quota)",
      instructions: [
        "Monitor container metric `container_cpu_cfs_throttled_periods_total` against `container_cpu_cfs_periods_total`.",
        "Alert when throttling ratio exceeds 5% even if overall Pod CPU utilization appears low (e.g. 30%).",
        "Explain multi-threaded burst dynamics: how 8 threads simultaneously bursting exhaust a 100ms CFS quota in 12ms.",
        "Recommend removing hard CPU limits while keeping CPU requests, or tuning CFS quota period to 20ms.",
      ],
      ruInstructions: [
        "Отслеживайте метрику троттлинга `container_cpu_cfs_throttled_periods_total` относительно общего числа периодов.",
        "Поднимайте тревогу, если доля троттлинга >5%, даже при низкой средней утилизации CPU (например, 30%).",
        "Объясните эффект залповой нагрузки: 8 потоков исчерпывают 100-мс квоту CFS за 12 мс, вызывая простой в 88 мс.",
        "Рекомендуйте снятие жестких CPU limits при сохранении CPU requests или уменьшение периода квоты до 20 мс.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","kubernetes","cfs-throttling","cgroups","performance"],
    }),
  },

  "oauth2-jwt-token-lifecycle-audit": {
    id: "oauth2-jwt-token-lifecycle-audit",
    name: "Oauth2JwtTokenLifecycleAuditSkill",
    displayName: "OAuth 2.0 & JWT Token Lifecycle Security Audit",
    categoryId: "analysis",
    description: "Audits JWT issuance, signature verification (RS256 vs HS256 algorithm confusion), clock skew, and JWKS key rotation.",
    tags: ["analysis","oauth2","jwt","security","auth","jwks"],
    transform: createStandardSkillTransform({
      sectionName: "OAuth 2.0 & JWT Security Audit Protocol",
      ruSectionName: "Аудит безопасности жизненного цикла токенов OAuth 2.0 и JWT",
      instructions: [
        "Verify strict algorithm enforcement: reject `alg: none` and prevent asymmetric/symmetric confusion attacks.",
        "Validate standard claims: `exp` (expiration), `nbf` (not before), `iss` (issuer whitelist), and `aud` (audience verification).",
        "Calibrate allowed clock skew tolerance to maximum 60 seconds.",
        "Audit JWKS endpoint caching: ensure public keys are cached with TTL while handling key rotation gracefully.",
      ],
      ruInstructions: [
        "Проверяйте явную фиксацию алгоритма подписи: блокируйте `alg: none` и путаницу между RSA и HMAC.",
        "Валидируйте стандартные клеймы: срок жизни `exp`, период `nbf`, белый список издателей `iss` и аудиторию `aud`.",
        "Ограничивайте допустимый дрейф системных часов (clock skew) не более чем 60 секундами.",
        "Контролируйте кэширование эндпоинта JWKS: публичные ключи должны кэшироваться с понятным TTL при плановой ротации.",
      ],
      semanticType: "constraints",
      tags: ["analysis","oauth2","jwt","security","auth","jwks"],
    }),
  },

  "web-vitals-inp-lcp-cls-performance": {
    id: "web-vitals-inp-lcp-cls-performance",
    name: "WebVitalsInpLcpClsPerformanceSkill",
    displayName: "Core Web Vitals (LCP, INP, CLS) Frontend Diagnostics",
    categoryId: "analysis",
    description: "Diagnoses frontend bottlenecks: Largest Contentful Paint (LCP < 2.5s), Interaction to Next Paint (INP < 200ms), Cumulative Layout Shift (CLS < 0.1).",
    tags: ["analysis","web-vitals","performance","frontend","inp","lcp"],
    transform: createStandardSkillTransform({
      sectionName: "Core Web Vitals Diagnostic Protocol",
      ruSectionName: "Диагностика Core Web Vitals (LCP, INP, CLS)",
      instructions: [
        "LCP (< 2.5s): Prioritize hero image preload, eliminate render-blocking CSS/fonts, and configure CDN edge caching.",
        "INP (< 200ms): Break long JavaScript tasks (>50ms) using `scheduler.yield()` or Web Workers to ensure rapid main-thread response.",
        "CLS (< 0.1): Mandate explicit `width` and `height` aspect-ratio dimensions on all images, video embeds, and dynamic ads.",
        "Track 75th percentile (p75) field data from Chrome User Experience Report (CrUX) rather than synthetic lab scores.",
      ],
      ruInstructions: [
        "LCP (< 2.5с): Предзагружайте главное изображение первого экрана, устраняйте блокирующий CSS и шрифты, настраивайте CDN.",
        "INP (< 200мс): Дробите тяжелые JavaScript-задачи (>50мс) с помощью `scheduler.yield()` для мгновенного отклика интерфейса.",
        "CLS (< 0.1): Обязательно задавайте размеры `width` и `height` для картинок, видео и баннеров, исключая сдвиг макета.",
        "Ориентируйтесь на 75-й перцентиль (p75) реальных пользователей (RUM / CrUX), а не на синтетические замеры в лаборатории.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","web-vitals","performance","frontend","inp","lcp"],
    }),
  },

  "rest-vs-graphql-payload-overfetching-audit": {
    id: "rest-vs-graphql-payload-overfetching-audit",
    name: "RestVsGraphqlPayloadOverfetchingAuditSkill",
    displayName: "API Payload Over-Fetching & Under-Fetching Audit",
    categoryId: "analysis",
    description: "Quantifies mobile network payload waste caused by REST over-fetching and audits GraphQL nested N+1 request waterfalls.",
    tags: ["analysis","api","graphql","rest","payload-optimization"],
    transform: createStandardSkillTransform({
      sectionName: "API Payload Efficiency & Over-Fetching Protocol",
      ruSectionName: "Аудит избыточной выборки данных API (Over-Fetching & Under-Fetching)",
      instructions: [
        "Measure Payload Efficiency Ratio: percentage of bytes transmitted in response that are actually rendered by client UI.",
        "Detect REST Over-Fetching where multi-megabyte JSON arrays are sent to display 3 table columns; implement sparse fieldsets.",
        "Detect GraphQL Under-Fetching and N+1 resolver waterfalls: mandate DataLoader batching for nested relationship fields.",
        "Benchmark JSON gzip/brotli transfer sizes against binary Protocol Buffer representations.",
      ],
      ruInstructions: [
        "Измеряйте коэффициент полезности пейлоада: процент переданных байт, реально отображаемых в интерфейсе клиента.",
        "Выявляйте избыточную выборку (Over-Fetching) в REST, когда клиенту отдаются гигабайты ненужных полей вместо выборки колонок.",
        "Пресекайте проблему N+1 в GraphQL: обязывайте применять DataLoader для пакетного объединения запросов к БД.",
        "Сравнивайте вес сжатого JSON (brotli) с бинарными Protocol Buffers на мобильных сетях с высокой задержкой.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","api","graphql","rest","payload-optimization"],
    }),
  },

  "git-merge-conflict-ast-semantic-diff": {
    id: "git-merge-conflict-ast-semantic-diff",
    name: "GitMergeConflictAstSemanticDiffSkill",
    displayName: "Semantic AST-Based Merge Conflict Resolution",
    categoryId: "analysis",
    description: "Resolves git merge conflicts at the Abstract Syntax Tree (AST) level, eliminating false line-based text collisions.",
    tags: ["analysis","git","merge-conflicts","ast","version-control"],
    transform: createStandardSkillTransform({
      sectionName: "AST Semantic Merge Conflict Resolution Protocol",
      ruSectionName: "Семантическое разрешение конфликтов слияния Git (AST Diff)",
      instructions: [
        "Parse conflicting file versions into Abstract Syntax Trees (base, ours, theirs).",
        "Distinguish trivial non-interfering AST transformations (e.g. independent imports, reordered independent functions) from semantic logic clashes.",
        "Automatically resolve structural non-conflicts that appear as textual line collisions in standard three-way diffs.",
        "Flag true semantic conflicts (conflicting mutations of identical state or function signatures) for human developer review.",
      ],
      ruInstructions: [
        "Парсите конфликтующие версии файлов в абстрактные синтаксические деревья (Base, Ours, Theirs).",
        "Отличайте неконфликтующие изменения на уровне AST (добавление независимых импортов) от реальных логических коллизий.",
        "Автоматически разрешайте ложные конфликты, возникающие из-за совпадения соседних строк в текстовом diff.",
        "Выделяйте истинные семантические противоречия (изменение сигнатуры одной функции обеими ветками) для ревью программистом.",
      ],
      semanticType: "process_directive",
      tags: ["analysis","git","merge-conflicts","ast","version-control"],
    }),
  },
};
