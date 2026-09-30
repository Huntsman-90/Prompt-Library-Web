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
};
