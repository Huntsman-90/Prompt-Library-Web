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
  "structural-decomposition-spectral-matrix": {
    id: "structural-decomposition-spectral-matrix",
    name: "StructuralDecompositionSpectralMatrixSkill",
    displayName: "Spectral Graph & Structural Matrix Decomposition",
    categoryId: "analysis",
    description: "Analyzes system architecture as an adjacency matrix and evaluates eigen-centrality and spectral bottlenecks.",
    tags: ["analysis","spectral","graph-theory","matrices","topology"],
    transform: createStandardSkillTransform({
      sectionName: "Spectral Topology & Structural Dependency Matrix",
      ruSectionName: "Спектральная топология и матрица структурных зависимостей",
      instructions: [
        "Represent all subsystems and their coupling interactions as a weighted adjacency matrix.",
        "Calculate node centrality to pinpoint hidden structural single points of failure (chokepoints).",
        "Identify decoupled sub-graphs suitable for independent asynchronous scaling."
],
      ruInstructions: [
        "Представьте компоненты системы и связи между ними в виде взвешенной матрицы смежности.",
        "Рассчитайте центральность узлов для выявления скрытых критических узких мест архитектуры.",
        "Выделите слабосвязанные подграфы, пригодные для полностью автономного масштабирования."
],
      semanticType: "domain_specific",
      tags: ["analysis","spectral","graph-theory","matrices","topology"],
    }),
  },

  "failure-mode-effects-criticality-analysis-fmeca": {
    id: "failure-mode-effects-criticality-analysis-fmeca",
    name: "FailureModeEffectsCriticalityAnalysisFmecaSkill",
    displayName: "Formal FMECA Risk Priority Number (RPN) Matrix",
    categoryId: "analysis",
    description: "Calculates Risk Priority Number (RPN = Severity × Occurrence × Detection) for all potential component failures.",
    tags: ["analysis","fmeca","rpn","reliability","risk-assessment"],
    transform: createStandardSkillTransform({
      sectionName: "FMECA Failure Mode Criticality & RPN Matrix",
      ruSectionName: "Анализ видов, последствий и критичности отказов (FMECA / RPN)",
      instructions: [
        "Score Severity (S 1-10), Probability of Occurrence (O 1-10), and Undetectability (D 1-10) for every failure mode.",
        "Compute the composite Risk Priority Number (RPN = S × O × D) and sort failure vectors in descending order.",
        "Mandate immediate architectural mitigations for all failure modes with RPN > 100 or Severity ≥ 9."
],
      ruInstructions: [
        "Оцените тяжесть последствий (S), вероятность возникновения (O) и необнаруживаемость (D) по 10-балльной шкале.",
        "Рассчитайте совокупный индекс риска (RPN = S × O × D) и отсортируйте угрозы по убыванию.",
        "Внедрите первоочередные меры для всех сценариев с RPN > 100 или критичностью Severity ≥ 9."
],
      semanticType: "domain_specific",
      tags: ["analysis","fmeca","rpn","reliability","risk-assessment"],
    }),
  },

  "sensitivity-elasticity-variance-analysis": {
    id: "sensitivity-elasticity-variance-analysis",
    name: "SensitivityElasticityVarianceAnalysisSkill",
    displayName: "Parameter Sensitivity & Elasticity Gradient Analysis",
    categoryId: "analysis",
    description: "Computes partial derivatives to measure elasticity and output volatility relative to input changes.",
    tags: ["analysis","sensitivity","elasticity","derivatives","modeling"],
    transform: createStandardSkillTransform({
      sectionName: "Parameter Sensitivity & Elasticity Gradient Matrix",
      ruSectionName: "Анализ чувствительности параметров и градиентов эластичности",
      instructions: [
        "Compute the elasticity coefficient for all key variables.",
        "Highlight hyper-sensitive parameters where a 1% input perturbation triggers >5% output variance.",
        "Introduce dampening controls or circuit breakers to bound hyper-sensitive gradient spikes."
],
      ruInstructions: [
        "Рассчитайте коэффициенты эластичности параметров.",
        "Выделите гиперчувствительные параметры с резким откликом.",
        "Внедрите стабилизирующие демпферы для сглаживания всплесков."
],
      semanticType: "domain_specific",
      tags: ["analysis","sensitivity","elasticity","derivatives","modeling"],
    }),
  },

  "gap-analysis-delta-roadmap": {
    id: "gap-analysis-delta-roadmap",
    name: "GapAnalysisDeltaRoadmapSkill",
    displayName: "Current State vs Target State Gap & Delta Roadmap",
    categoryId: "analysis",
    description: "Maps Current (As-Is) vs Future (To-Be) state, isolating technical and capability gaps into actionable workstreams.",
    tags: ["analysis","gap-analysis","as-is-to-be","roadmap","architecture"],
    transform: createStandardSkillTransform({
      sectionName: "As-Is vs To-Be Gap Analysis & Transition Roadmap",
      ruSectionName: "GAP-анализ (As-Is vs To-Be) и дорожная карта ликвидации разрывов",
      instructions: [
        "Document the baseline Current State (As-Is) across Architecture, Data, Process, and Team.",
        "Define the target Future State (To-Be) with concrete, measurable KPIs and SLA benchmarks.",
        "Formulate a sequenced phased migration bridge to close every identified capability gap."
],
      ruInstructions: [
        "Зафиксируйте текущее состояние (As-Is) в разрезе архитектуры и процессов.",
        "Опишите целевое состояние (To-Be) с четкими метриками.",
        "Сформируйте дорожную карту перехода."
],
      semanticType: "domain_specific",
      tags: ["analysis","gap-analysis","as-is-to-be","roadmap","architecture"],
    }),
  },

  "comparative-benchmark-radar-chart": {
    id: "comparative-benchmark-radar-chart",
    name: "ComparativeBenchmarkRadarChartSkill",
    displayName: "Multi-Dimensional Competitive Benchmark Radar",
    categoryId: "analysis",
    description: "Ranks competing architectural or commercial alternatives across 6-8 normalized quantitative dimensions.",
    tags: ["analysis","benchmarking","radar-chart","evaluation","tradeoffs"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Dimensional Benchmark & Radar Matrix",
      ruSectionName: "Многомерный сравнительный бенчмарк и лепестковая диаграмма",
      instructions: [
        "Define 6-8 standardized evaluation criteria.",
        "Score each competing architecture on a normalized 1-10 scale with clear empirical evidence justifications.",
        "Highlight competitive moats and fatal structural deficits for each evaluated candidate."
],
      ruInstructions: [
        "Определите критерии оценки (производительность, масштабируемость, безопасность).",
        "Оцените варианты по 10-балльной шкале.",
        "Выделите преимущества и дефициты каждого решения."
],
      semanticType: "domain_specific",
      tags: ["analysis","benchmarking","radar-chart","evaluation","tradeoffs"],
    }),
  },

  "cost-benefit-npv-roi-modeling": {
    id: "cost-benefit-npv-roi-modeling",
    name: "CostBenefitNpvRoiModelingSkill",
    displayName: "Capital Cost-Benefit (NPV / IRR / ROI / TCO) Modeling",
    categoryId: "analysis",
    description: "Calculates Net Present Value, Internal Rate of Return, Payback Period, and 3-Year Total Cost of Ownership.",
    tags: ["analysis","finance","roi","npv","tco","business-case"],
    transform: createStandardSkillTransform({
      sectionName: "Financial Cost-Benefit (NPV/IRR/TCO) Model",
      ruSectionName: "Финансовый анализ затрат и выгод (NPV, IRR, ROI, TCO на 3 года)",
      instructions: [
        "Model Capital Expenditures (CapEx) vs Operational Expenditures (OpEx) across a 36-month horizon.",
        "Calculate Discounted Cash Flows (DCF) using standard corporate Weighted Average Cost of Capital (WACC).",
        "State the Breakeven Payback Month and projected Return on Investment (ROI %)."
],
      ruInstructions: [
        "Смоделируйте CapEx и OpEx на 36 месяцев.",
        "Рассчитайте дисконтированные денежные потоки (DCF).",
        "Укажите срок окупаемости и ROI."
],
      semanticType: "domain_specific",
      tags: ["analysis","finance","roi","npv","tco","business-case"],
    }),
  },

  "swot-tows-strategic-cross-matrix": {
    id: "swot-tows-strategic-cross-matrix",
    name: "SwotTowsStrategicCrossMatrixSkill",
    displayName: "TOWS Strategic Action Matrix (SO / ST / WO / WT)",
    categoryId: "analysis",
    description: "Transforms standard SWOT into actionable TOWS strategies (Strengths-Opportunities, Weaknesses-Threats).",
    tags: ["analysis","swot","tows","strategy","planning"],
    transform: createStandardSkillTransform({
      sectionName: "TOWS Actionable Cross-Strategy Matrix",
      ruSectionName: "Матрица стратегических действий TOWS (SO, ST, WO, WT)",
      instructions: [
        "Formulate SO, ST, WO, and WT actionable strategic vectors.",
        "Pair internal capabilities with external market shifts.",
        "Eliminate vague qualitative statements in favor of concrete initiatives."
],
      ruInstructions: [
        "Сформулируйте векторы действий SO, ST, WO, WT.",
        "Сопоставьте внутренние силы с рыночными возможностями.",
        "Преобразуйте анализ в конкретный план инициатив."
],
      semanticType: "domain_specific",
      tags: ["analysis","swot","tows","strategy","planning"],
    }),
  },

  "bottleneck-theory-of-constraints-goldratt": {
    id: "bottleneck-theory-of-constraints-goldratt",
    name: "BottleneckTheoryOfConstraintsGoldrattSkill",
    displayName: "Goldratt Theory of Constraints (TOC) & Drum-Buffer-Rope",
    categoryId: "analysis",
    description: "Identifies the single binding constraint that limits total system throughput and builds a Drum-Buffer-Rope plan.",
    tags: ["analysis","toc","goldratt","bottleneck","throughput","capacity"],
    transform: createStandardSkillTransform({
      sectionName: "Goldratt Theory of Constraints & Throughput Optimization",
      ruSectionName: "Теория ограничений Голдратта (TOC): Поиск и расшивка ключевого узкого места",
      instructions: [
        "Identify the single binding constraint limiting throughput.",
        "Exploit and subordinate all subsystems to the bottleneck pace.",
        "Elevate the constraint and prevent inertia."
],
      ruInstructions: [
        "Определите главное узкое место системы.",
        "Подчините ритм всех модулей скорости ограничения.",
        "Инвестируйте в расширение узкого места."
],
      semanticType: "process_directive",
      tags: ["analysis","toc","goldratt","bottleneck","throughput","capacity"],
    }),
  },

  "data-lineage-provenance-audit": {
    id: "data-lineage-provenance-audit",
    name: "DataLineageProvenanceAuditSkill",
    displayName: "End-to-End Data Lineage & Cryptographic Provenance",
    categoryId: "analysis",
    description: "Traces data origins, transformations, schema mutations, and custody chains from ingestion to consumption.",
    tags: ["analysis","data-lineage","provenance","compliance","governance"],
    transform: createStandardSkillTransform({
      sectionName: "Data Lineage & Cryptographic Provenance Audit",
      ruSectionName: "Аудит происхождения и цепочки движения данных (Data Lineage)",
      instructions: [
        "Map data flows from upstream ingestion sources through ETL transformations down to destination marts.",
        "Record every transformation stage and schema mutation.",
        "Ensure immutable cryptographic provenance hashes."
],
      ruInstructions: [
        "Постройте карту движения данных от сбора до витрин.",
        "Зафиксируйте трансформации схем.",
        "Обеспечьте неизменяемый аудит."
],
      semanticType: "compliance_directive",
      tags: ["analysis","data-lineage","provenance","compliance","governance"],
    }),
  },

  "pestle-macro-environmental-scan": {
    id: "pestle-macro-environmental-scan",
    name: "PestleMacroEnvironmentalScanSkill",
    displayName: "PESTLE Macro-Environmental Risk Scan",
    categoryId: "analysis",
    description: "Evaluates Political, Economic, Social, Technological, Legal, and Environmental headwinds and tailwinds.",
    tags: ["analysis","pestle","macro-environment","strategy","geopolitics"],
    transform: createStandardSkillTransform({
      sectionName: "PESTLE Macro-Environmental Risk Scan",
      ruSectionName: "Макроэкономический анализ внешней среды (PESTLE)",
      instructions: [
        "Analyze systemic vectors across all 6 PESTLE pillars.",
        "Identify high-impact regulatory or macroeconomic shifts with probability >30%.",
        "Formulate operational hedging strategies."
],
      ruInstructions: [
        "Проанализируйте макро-факторы по 6 направлениям PESTLE.",
        "Выделите регуляторные и технологические сдвиги.",
        "Разработайте меры хеджирования."
],
      semanticType: "domain_specific",
      tags: ["analysis","pestle","macro-environment","strategy","geopolitics"],
    }),
  },

  "cohort-retention-churn-decay-model": {
    id: "cohort-retention-churn-decay-model",
    name: "CohortRetentionChurnDecayModelSkill",
    displayName: "Cohort Retention & Non-Linear Churn Decay Curve",
    categoryId: "analysis",
    description: "Models user or system retention cohorts over time using Weibull / Pareto survival decay functions.",
    tags: ["analysis","retention","churn","cohorts","survival-analysis"],
    transform: createStandardSkillTransform({
      sectionName: "Cohort Retention & Survival Analysis Model",
      ruSectionName: "Когортный анализ удержания и кривые оттока (Survival Analysis)",
      instructions: [
        "Stratify data into distinct time-based and behavior-based acquisition cohorts.",
        "Fit observed retention against asymptotic power-law decay functions.",
        "Pinpoint critical drop-off thresholds."
],
      ruInstructions: [
        "Разделите данные на когорты.",
        "Постройте кривые удержания (Retention).",
        "Выявите критические точки оттока."
],
      semanticType: "domain_specific",
      tags: ["analysis","retention","churn","cohorts","survival-analysis"],
    }),
  },

  "threat-model-stride-matrix": {
    id: "threat-model-stride-matrix",
    name: "ThreatModelStrideMatrixSkill",
    displayName: "Microsoft STRIDE Threat Modeling & DREAD Scoring",
    categoryId: "analysis",
    description: "Identifies threats across Spoofing, Tampering, Repudiation, Info Disclosure, Denial of Service, Elevation of Privilege.",
    tags: ["analysis","stride","dread","threat-modeling","cybersecurity"],
    transform: createStandardSkillTransform({
      sectionName: "Microsoft STRIDE Threat Model & DREAD Risk Score",
      ruSectionName: "Моделирование угроз по методологии STRIDE и скоринг DREAD",
      instructions: [
        "Evaluate threats across all 6 STRIDE vectors.",
        "Score vulnerabilities via DREAD framework.",
        "Prescribe mandatory cryptographic mitigations."
],
      ruInstructions: [
        "Проведите аудит по 6 векторам STRIDE.",
        "Оцените уязвимости по шкале DREAD.",
        "Сформируйте обязательные меры защиты."
],
      semanticType: "guardrail_directive",
      tags: ["analysis","stride","dread","threat-modeling","cybersecurity"],
    }),
  },

  "value-stream-waste-muda-mapping": {
    id: "value-stream-waste-muda-mapping",
    name: "ValueStreamWasteMudaMappingSkill",
    displayName: "Lean Value Stream Mapping & 7 Wastes (Muda) Audit",
    categoryId: "analysis",
    description: "Maps end-to-end Value Stream and eliminates the 7 Lean wastes.",
    tags: ["analysis","lean","value-stream","muda","toyota","efficiency"],
    transform: createStandardSkillTransform({
      sectionName: "Lean Value Stream & 7 Wastes (Muda) Elimination",
      ruSectionName: "Картирование потока создания ценности (VSM) и устранение 7 потерь (Muda)",
      instructions: [
        "Calculate Process Cycle Efficiency (PCE).",
        "Audit workflow for the 7 classic Toyota wastes.",
        "Eliminate non-value-add handoffs."
],
      ruInstructions: [
        "Рассчитайте эффективность цикла (PCE).",
        "Устраните 7 классических потерь Toyota.",
        "Сократите время ожидания в очередях."
],
      semanticType: "process_directive",
      tags: ["analysis","lean","value-stream","muda","toyota","efficiency"],
    }),
  },

  "unit-economics-cac-ltv-cohort": {
    id: "unit-economics-cac-ltv-cohort",
    name: "UnitEconomicsCacLtvCohortSkill",
    displayName: "SaaS Unit Economics (LTV:CAC / Payback / Net Retention)",
    categoryId: "analysis",
    description: "Analyzes Customer Lifetime Value, Customer Acquisition Cost, Payback Period, and Net Revenue Retention (NRR).",
    tags: ["analysis","unit-economics","cac","ltv","nrr","saas-metrics"],
    transform: createStandardSkillTransform({
      sectionName: "SaaS Unit Economics & Cohort Contribution Margin",
      ruSectionName: "Юнит-экономика: LTV/CAC, Payback, Net Revenue Retention (NRR)",
      instructions: [
        "Compute fully loaded CAC.",
        "Calculate LTV and LTV:CAC ratio (target ≥ 3:1).",
        "Track Net Revenue Retention (NRR)."
],
      ruInstructions: [
        "Рассчитайте полную стоимость привлечения (CAC).",
        "Оцените LTV и коэффициент LTV:CAC.",
        "Проанализируйте NRR."
],
      semanticType: "domain_specific",
      tags: ["analysis","unit-economics","cac","ltv","nrr","saas-metrics"],
    }),
  },

  "anomaly-statistical-outlier-iqr": {
    id: "anomaly-statistical-outlier-iqr",
    name: "AnomalyStatisticalOutlierIqrSkill",
    displayName: "Robust Statistical Outlier Detection (Tukey IQR / Z-Score)",
    categoryId: "analysis",
    description: "Detects anomalous telemetry and fraudulent transactions using Tukey Interquartile Range and MAD.",
    tags: ["analysis","anomaly-detection","outliers","iqr","statistics","mad"],
    transform: createStandardSkillTransform({
      sectionName: "Robust Outlier Detection & Anomaly Screening",
      ruSectionName: "Статистическое выявление аномалий и выбросов (Tukey IQR, MAD, Z-Score)",
      instructions: [
        "Compute Tukey Fences and Median Absolute Deviation.",
        "Filter out transient noise without suppressing true outliers.",
        "Generate automated incident alerts."
],
      ruInstructions: [
        "Рассчитайте границы IQR и MAD.",
        "Отфильтруйте случайный шум от критических аномалий.",
        "Сформируйте правила алертинга."
],
      semanticType: "domain_specific",
      tags: ["analysis","anomaly-detection","outliers","iqr","statistics","mad"],
    }),
  },

  "conjoint-choice-based-partworth": {
    id: "conjoint-choice-based-partworth",
    name: "ConjointChoiceBasedPartworthSkill",
    displayName: "Choice-Based Conjoint (CBC) Part-Worth Utility Analysis",
    categoryId: "analysis",
    description: "Measures customer willingness-to-pay and feature preference trade-offs via discrete choice modeling.",
    tags: ["analysis","conjoint","pricing","willingness-to-pay","preferences"],
    transform: createStandardSkillTransform({
      sectionName: "Choice-Based Conjoint Part-Worth Utility Model",
      ruSectionName: "Конджойнт-анализ потребительских предпочтений и полезности функций (CBC)",
      instructions: [
        "Decompose products into discrete feature attributes and price levels.",
        "Estimate multinomial logit part-worth utilities for each attribute level.",
        "Simulate market share sensitivity under varied packaging and pricing configurations."
],
      ruInstructions: [
        "Разложите продукт на атрибуты и ценовые уровни.",
        "Оцените полезность каждой функции методом логистической регрессии.",
        "Смоделируйте рыночную долю при разных конфигурациях тарифов."
],
      semanticType: "domain_specific",
      tags: ["analysis","conjoint","pricing","willingness-to-pay","preferences"],
    }),
  },

  "bostongrowthsharematrix-bcg": {
    id: "bostongrowthsharematrix-bcg",
    name: "BostonGrowthShareMatrixBcgSkill",
    displayName: "BCG Growth-Share Matrix (Stars, Cash Cows, Dogs, Question Marks)",
    categoryId: "analysis",
    description: "Allocates portfolio resources by plotting market growth rate against relative market share.",
    tags: ["analysis","bcg-matrix","portfolio","growth-share","strategy"],
    transform: createStandardSkillTransform({
      sectionName: "BCG Portfolio Growth-Share Matrix",
      ruSectionName: "Матрица БКГ: Звезды, Дойные коровы, Собаки, Трудные дети",
      instructions: [
        "Plot business units / features across Market Growth Rate vs Relative Market Share.",
        "Milking Cash Cows to fund high-growth Stars and selective Question Marks.",
        "Divest or sunset low-growth, low-share Dogs with zero strategic synergies."
],
      ruInstructions: [
        "Разместите продукты на матрице Темп роста / Доля рынка.",
        "Направляйте поток от «Дойных коров» на развитие «Звезд».",
        "Выводите из эксплуатации нерентабельные «Собаки»."
],
      semanticType: "domain_specific",
      tags: ["analysis","bcg-matrix","portfolio","growth-share","strategy"],
    }),
  },

  "heijunka-leveling-takt-time": {
    id: "heijunka-leveling-takt-time",
    name: "HeijunkaLevelingTaktTimeSkill",
    displayName: "Toyota Heijunka Production Leveling & Takt Time",
    categoryId: "analysis",
    description: "Levels workflow volume and mix to prevent bullwhip effect and match pace to exact Takt Time demand.",
    tags: ["analysis","heijunka","takt-time","lean","operations","leveling"],
    transform: createStandardSkillTransform({
      sectionName: "Heijunka Production Leveling & Takt Time Alignment",
      ruSectionName: "Выравнивание потока Хейдзунка и синхронизация по времени такта (Takt Time)",
      instructions: [
        "Calculate Takt Time: Net Available Operating Time / Customer Demand Rate.",
        "Level production batches into mixed-model pacing to eliminate sudden demand spikes.",
        "Maintain minimal buffer inventory to absorb micro-stoppages."
],
      ruInstructions: [
        "Рассчитайте время такта (Takt Time).",
        "Выровняйте объемы и номенклатуру задач для сглаживания пиков.",
        "Используйте буферные запасы для компенсации микро-сбоев."
],
      semanticType: "process_directive",
      tags: ["analysis","heijunka","takt-time","lean","operations","leveling"],
    }),
  },

  "monte-carlo-financial-var-cvar": {
    id: "monte-carlo-financial-var-cvar",
    name: "MonteCarloFinancialVarCvarSkill",
    displayName: "Value at Risk (VaR 99%) & Conditional Tail Risk (CVaR)",
    categoryId: "analysis",
    description: "Quantifies maximum potential financial or latency loss under extreme tail stress scenarios.",
    tags: ["analysis","var","cvar","tail-risk","financial-risk","stress-test"],
    transform: createStandardSkillTransform({
      sectionName: "Value at Risk (VaR) & Expected Shortfall (CVaR) Matrix",
      ruSectionName: "Оценка хвостовых рисков VaR (99%) и ожидаемого дефицита CVaR",
      instructions: [
        "Calculate Parametric and Historical Value at Risk (VaR at 95% and 99% confidence).",
        "Compute Conditional VaR (Expected Shortfall) measuring average loss when the VaR threshold is breached.",
        "Design capital and compute headroom buffers exceeding the 99% CVaR boundary."
],
      ruInstructions: [
        "Рассчитайте Value at Risk (VaR) для доверительных уровней 95% и 99%.",
        "Оцените средний размер убытка при пробитии порога риска (CVaR / Expected Shortfall).",
        "Заложите резерв ресурсов, покрывающий наихудший 1% сценариев."
],
      semanticType: "domain_specific",
      tags: ["analysis","var","cvar","tail-risk","financial-risk","stress-test"],
    }),
  },

  "semantic-sentiment-aspect-polarity": {
    id: "semantic-sentiment-aspect-polarity",
    name: "SemanticSentimentAspectPolaritySkill",
    displayName: "Aspect-Based Sentiment & Granular Polarity Extraction",
    categoryId: "analysis",
    description: "Extracts fine-grained sentiment polarity (+1 to -1) mapped directly to specific product features and entities.",
    tags: ["analysis","sentiment","absa","nlp","aspect-based","feedback"],
    transform: createStandardSkillTransform({
      sectionName: "Aspect-Based Sentiment & Entity Polarity Analysis",
      ruSectionName: "Аспектно-ориентированный анализ тональности (ABSA)",
      instructions: [
        "Extract discrete entities and features mentioned in unstructured feedback.",
        "Score sentiment polarity [-1.0, +1.0] and emotional intensity for each isolated aspect.",
        "Aggregate aspect scores into a prioritized satisfaction deficit radar."
],
      ruInstructions: [
        "Выделите отдельные сущности и функции продукта из текста отзывов.",
        "Оцените тональность каждого аспекта по шкале от -1.0 до +1.0.",
        "Сформируйте радар ключевых зон недовольства пользователей."
],
      semanticType: "domain_specific",
      tags: ["analysis","sentiment","absa","nlp","aspect-based","feedback"],
    }),
  },

  "rfm-customer-segmentation-matrix": {
    id: "rfm-customer-segmentation-matrix",
    name: "RfmCustomerSegmentationMatrixSkill",
    displayName: "RFM (Recency, Frequency, Monetary) Customer Segmentation",
    categoryId: "analysis",
    description: "Segments customer bases into Champions, Loyalists, Potential Churn, and Hibernating via quintile scoring.",
    tags: ["analysis","rfm","segmentation","marketing","customer-lifecycle"],
    transform: createStandardSkillTransform({
      sectionName: "RFM Quintile Customer Segmentation Matrix",
      ruSectionName: "RFM-сегментация клиентской базы (Recency, Frequency, Monetary)",
      instructions: [
        "Score users on Recency (1-5), Frequency (1-5), and Monetary value (1-5).",
        "Group scores into actionable behavioral segments (Champions, At-Risk, Hibernating, New Leads).",
        "Assign targeted lifecycle retention and reactivation playbooks to each cohort."
],
      ruInstructions: [
        "Оцените пользователей по шкале 1–5 по давности, частоте и чеку (RFM).",
        "Сгруппируйте клиентов в когорты: Чемпионы, Лояльные, Зона риска, Спящие.",
        "Назначьте индивидуальные сценарии удержания для каждого сегмента."
],
      semanticType: "domain_specific",
      tags: ["analysis","rfm","segmentation","marketing","customer-lifecycle"],
    }),
  },

  "kano-model-customer-delight": {
    id: "kano-model-customer-delight",
    name: "KanoModelCustomerDelightSkill",
    displayName: "Noriaki Kano Feature Delight vs Necessity Model",
    categoryId: "analysis",
    description: "Classifies features into Must-Be, Performance, Attractive (Delighters), and Indifferent categories.",
    tags: ["analysis","kano-model","product-management","customer-satisfaction","features"],
    transform: createStandardSkillTransform({
      sectionName: "Noriaki Kano Feature Classification Matrix",
      ruSectionName: "Модель Кано: базовые требования, линейные функции и восторг (Delighters)",
      instructions: [
        "Administer functional vs dysfunctional paired question evaluation.",
        "Categorize features into: Must-Have (dissatisfiers if missing), Performance (linear satisfaction), Delighters (high satisfaction with no downside).",
        "Prioritize roadmap: 100% Must-Haves -> Competitive Performance -> Signature Delighters."
],
      ruInstructions: [
        "Классифицируйте функции по категориям: Обязательные, Линейные, Привлекательные (Delighters).",
        "Убедитесь в 100% реализации базовых требований, предотвращающих негатив.",
        "Сфокусируйте инновации на уникальных функциях восторга."
],
      semanticType: "domain_specific",
      tags: ["analysis","kano-model","product-management","customer-satisfaction","features"],
    }),
  },

  "critical-path-pert-cpm-schedule": {
    id: "critical-path-pert-cpm-schedule",
    name: "CriticalPathPertCpmScheduleSkill",
    displayName: "PERT / CPM Critical Path & Schedule Float Analysis",
    categoryId: "analysis",
    description: "Calculates the Critical Path, Total Float, Free Float, and probabilistic completion dates via PERT three-point estimates.",
    tags: ["analysis","pert","cpm","critical-path","project-management","scheduling"],
    transform: createStandardSkillTransform({
      sectionName: "PERT / CPM Critical Path & Float Analysis",
      ruSectionName: "Анализ критического пути (CPM) и оценка сроков по методике PERT",
      instructions: [
        "Calculate PERT Expected Duration: Te = (Optimistic + 4×Realistic + Pessimistic) / 6.",
        "Perform Forward Pass (Early Start/Early Finish) and Backward Pass (Late Start/Late Finish).",
        "Identify the Critical Path (Zero Total Float) and focus all management variance control on critical tasks."
],
      ruInstructions: [
        "Рассчитайте средневзвешенную длительность по PERT: Te = (O + 4M + P) / 6.",
        "Выполните прямой и обратный проход для определения ранних и поздних сроков.",
        "Выделите задачи критического пути с нулевым резервом времени (Zero Float)."
],
      semanticType: "process_directive",
      tags: ["analysis","pert","cpm","critical-path","project-management","scheduling"],
    }),
  },

  "funnel-conversion-dropoff-leakage": {
    id: "funnel-conversion-dropoff-leakage",
    name: "FunnelConversionDropoffLeakageSkill",
    displayName: "Micro-Funnel Conversion & Leakage Attribution",
    categoryId: "analysis",
    description: "Identifies exact micro-step conversion drop-offs, isolating friction points across user and telemetry pipelines.",
    tags: ["analysis","funnel","conversion","drop-off","analytics"],
    transform: createStandardSkillTransform({
      sectionName: "Micro-Funnel Conversion & Drop-off Attribution",
      ruSectionName: "Пошаговый анализ воронки конверсии и точек оттока",
      instructions: [
        "Instrument each discrete step in the user conversion journey with precise completion telemetry.",
        "Calculate step-over-step dropoff percentages and overall end-to-end completion rate.",
        "Diagnose technical, usability, and cognitive friction causing major step dropoffs."
],
      ruInstructions: [
        "Зафиксируйте процент прохождения каждого шага воронки.",
        "Рассчитайте сквозную конверсию и локальные коэффициенты оттока.",
        "Сформулируйте гипотезы по устранению трения на проблемных шагах."
],
      semanticType: "domain_specific",
      tags: ["analysis","funnel","conversion","drop-off","analytics"],
    }),
  },

  "mckinsey-seven-s-alignment": {
    id: "mckinsey-seven-s-alignment",
    name: "MckinseySevenSAlignmentSkill",
    displayName: "McKinsey 7-S Organizational & Architectural Alignment",
    categoryId: "analysis",
    description: "Audits alignment across Strategy, Structure, Systems, Shared Values, Style, Staff, and Skills.",
    tags: ["analysis","mckinsey-7s","alignment","transformation","strategy"],
    transform: createStandardSkillTransform({
      sectionName: "McKinsey 7-S Systemic Alignment Matrix",
      ruSectionName: "Модель 7-S McKinsey: системная согласованность архитектуры и организации",
      instructions: [
        "Evaluate Hard elements: Strategy, Structure, Systems.",
        "Evaluate Soft elements: Shared Values, Style, Staff, Skills.",
        "Identify misalignments where technology systems contradict strategy or team capabilities."
],
      ruInstructions: [
        "Оцените жесткие элементы: Стратегия, Структура, Системы.",
        "Оцените мягкие элементы: Общие ценности, Стиль, Персонал, Навыки.",
        "Устраните расхождения между целями стратегии и реальными возможностями систем."
],
      semanticType: "domain_specific",
      tags: ["analysis","mckinsey-7s","alignment","transformation","strategy"],
    }),
  },
  "ansoff-matrix-growth-strategy": {
    id: "ansoff-matrix-growth-strategy",
    name: "AnsoffMatrixGrowthStrategySkill",
    displayName: "Igor Ansoff Product-Market Growth Matrix",
    categoryId: "analysis",
    description: "Evaluates growth vectors: Market Penetration, Market Development, Product Development, and Diversification.",
    tags: ["analysis","ansoff","growth-strategy","product-market","risk"],
    transform: createStandardSkillTransform({
      sectionName: "Igor Ansoff Product-Market Growth Matrix",
      ruSectionName: "Матрица Ансоффа: Проникновение, Развитие рынка, Развитие продукта, Диверсификация",
      instructions: [
        "Categorize growth initiatives into the 4 Ansoff quadrants with associated risk ratings.",
        "Quantify capital requirements and failure probabilities for high-risk Diversification moves.",
        "Align core competencies with targeted product-market expansion."
],
      ruInstructions: [
        "Разделите инициативы по 4 квадрантам Ансоффа с оценкой рисков.",
        "Оцените ресурсы и вероятность успеха стратегий развития продукта и рынка.",
        "Сопоставьте компетенции команды с выбранным вектором экспансии."
],
      semanticType: "domain_specific",
      tags: ["analysis","ansoff","growth-strategy","product-market","risk"],
    }),
  },

  "service-blueprint-frontstage-backstage": {
    id: "service-blueprint-frontstage-backstage",
    name: "ServiceBlueprintFrontstageBackstageSkill",
    displayName: "Service Blueprinting (Frontstage, Backstage, Support Systems)",
    categoryId: "analysis",
    description: "Maps customer touchpoints across Line of Interaction, Line of Visibility, Line of Internal Interaction.",
    tags: ["analysis","service-blueprint","frontstage","backstage","cx","operations"],
    transform: createStandardSkillTransform({
      sectionName: "Service Blueprint & Operational Interaction Matrix",
      ruSectionName: "Сервисный блюпринт: Frontstage, Backstage и процессы поддержки",
      instructions: [
        "Map customer journey actions along the Line of Interaction.",
        "Document visible employee/system actions above the Line of Visibility (Frontstage).",
        "Detail invisible processing, databases, and third-party APIs below the Line of Internal Interaction (Backstage)."
],
      ruInstructions: [
        "Опишите действия пользователя на линии взаимодействия (Line of Interaction).",
        "Зафиксируйте видимые фронт-системы на линии видимости (Frontstage).",
        "Опишите внутренние базы данных, брокеры сообщений и API на уровне Backstage."
],
      semanticType: "domain_specific",
      tags: ["analysis","service-blueprint","frontstage","backstage","cx","operations"],
    }),
  },

  "monte-carlo-project-schedule-risk": {
    id: "monte-carlo-project-schedule-risk",
    name: "MonteCarloProjectScheduleRiskSkill",
    displayName: "Monte Carlo Critical Schedule & Milestone Risk Envelope",
    categoryId: "analysis",
    description: "Simulates probabilistic task durations across dependency graphs to predict P50/P80/P95 ship dates.",
    tags: ["analysis","monte-carlo","schedule-risk","project-management","forecasting"],
    transform: createStandardSkillTransform({
      sectionName: "Monte Carlo Schedule Risk & Ship Date Distribution",
      ruSectionName: "Стохастическое моделирование сроков релиза по Монте-Карло (P50/P80/P95)",
      instructions: [
        "Assign triangular duration distributions (Min, Most Likely, Max) to all WBS work packages.",
        "Run 10,000 simulations over the task dependency network.",
        "Report commitment dates at the 80% and 95% confidence intervals."
],
      ruInstructions: [
        "Задайте трехточечные оценки длительности для всех задач в графе зависимостей.",
        "Проведите симуляцию методом Монте-Карло на 10 000 прогонов.",
        "Зафиксируйте дату релиза с вероятностью выполнения 80% и 95%."
],
      semanticType: "domain_specific",
      tags: ["analysis","monte-carlo","schedule-risk","project-management","forecasting"],
    }),
  },

  "customer-journey-empathy-friction-map": {
    id: "customer-journey-empathy-friction-map",
    name: "CustomerJourneyEmpathyFrictionMapSkill",
    displayName: "Customer Journey Empathy & Cognitive Friction Map",
    categoryId: "analysis",
    description: "Charts user emotional highs, lows, mental models, and drop-off risks across lifecycle stages.",
    tags: ["analysis","customer-journey","empathy-map","cx","ux-research"],
    transform: createStandardSkillTransform({
      sectionName: "Customer Journey & Emotional Friction Mapping",
      ruSectionName: "Карта пути клиента (CJM) и аудит эмоционального трения",
      instructions: [
        "Chart user touchpoints across Awareness, Consideration, Onboarding, Value Realization, and Retention.",
        "Plot the user emotional curve (Frustration vs Delight) at each touchpoint.",
        "Prescribe direct design and architectural interventions to eliminate friction valleys."
],
      ruInstructions: [
        "Постройте карту этапов: от первого знакомства до регулярного использования.",
        "Отобразите эмоциональную кривую пользователя и точки максимального раздражения.",
        "Сформируйте решения для сглаживания проблемных зон."
],
      semanticType: "domain_specific",
      tags: ["analysis","customer-journey","empathy-map","cx","ux-research"],
    }),
  },

  "contingency-table-chi-square-independence": {
    id: "contingency-table-chi-square-independence",
    name: "ContingencyTableChiSquareIndependenceSkill",
    displayName: "Pearson Chi-Square Contingency & Independence Test",
    categoryId: "analysis",
    description: "Tests statistical independence between categorical variables with expected vs observed cell frequencies.",
    tags: ["analysis","chi-square","statistics","contingency-table","hypothesis-testing"],
    transform: createStandardSkillTransform({
      sectionName: "Pearson Chi-Square Independence & Contingency Analysis",
      ruSectionName: "Критерий независимости Хи-квадрат Пирсона (Таблицы сопряженности)",
      instructions: [
        "Construct a contingency table cross-tabulating observed categorical frequencies.",
        "Calculate expected cell counts under the null hypothesis of statistical independence.",
        "Compute the χ² test statistic, degrees of freedom, and p-value against α = 0.01 threshold."
],
      ruInstructions: [
        "Постройте таблицу сопряженности для категориальных признаков.",
        "Рассчитайте ожидаемые частоты при условии независимости переменных.",
        "Вычислите статистику Хи-квадрат (χ²) и уровень значимости p-value."
],
      semanticType: "domain_specific",
      tags: ["analysis","chi-square","statistics","contingency-table","hypothesis-testing"],
    }),
  },

  "five-whys-deep-causal-chain": {
    id: "five-whys-deep-causal-chain",
    name: "FiveWhysDeepCausalChainSkill",
    displayName: "Taiichi Ohno 5-Whys Root Cause Chain",
    categoryId: "analysis",
    description: "Drills down through 5 consecutive levels of causality to bypass symptoms and isolate systemic policy failure.",
    tags: ["analysis","5-whys","root-cause","toyota","postmortem"],
    transform: createStandardSkillTransform({
      sectionName: "Taiichi Ohno 5-Whys Deep Causal Chain",
      ruSectionName: "Метод 5 «Почему» Тайити Оно: Глубокая цепочка первопричин",
      instructions: [
        "Ask 'Why did this failure occur?' five consecutive times, validating each link with empirical evidence.",
        "Transition from immediate technical symptom to process defect to systemic policy breakdown.",
        "Deploy permanent structural poka-yoke error-proofing at the root level."
],
      ruInstructions: [
        "Последовательно задайте вопрос «Почему это произошло?» 5 раз, проверяя каждый шаг фактами.",
        "Перейдите от поверхностного технического симптома к организационному дефекту процесса.",
        "Внедрите защиту от ошибок (Пока-ёкэ) на уровне коренной причины."
],
      semanticType: "process_directive",
      tags: ["analysis","5-whys","root-cause","toyota","postmortem"],
    }),
  },

  "system-resilience-redundancy-factor": {
    id: "system-resilience-redundancy-factor",
    name: "SystemResilienceRedundancyFactorSkill",
    displayName: "N+1 and Active-Active Redundancy Availability Model",
    categoryId: "analysis",
    description: "Calculates system MTBF, MTTR, and composite availability (99.9% vs 99.999%) under component failover.",
    tags: ["analysis","availability","redundancy","sla","mtbf","resilience"],
    transform: createStandardSkillTransform({
      sectionName: "System Redundancy & High-Availability SLA Model",
      ruSectionName: "Моделирование отказоустойчивости (N+1, Active-Active, MTBF, MTTR)",
      instructions: [
        "Model component Mean Time Between Failures (MTBF) and Mean Time To Recovery (MTTR).",
        "Calculate composite serial vs parallel availability (e.g. 99.99% = 52.6 min annual downtime).",
        "Design active-active failover with sub-second health-check heartbeats."
],
      ruInstructions: [
        "Рассчитайте показатели MTBF (наработка на отказ) и MTTR (время восстановления).",
        "Вычислите совокупную доступность системы (SLA 99.99% = не более 52 минут простоя в год).",
        "Спроектируйте архитектуру Active-Active с автоматическим переключением нагрузки."
],
      semanticType: "domain_specific",
      tags: ["analysis","availability","redundancy","sla","mtbf","resilience"],
    }),
  },

  "value-proposition-canvas-osterwalder": {
    id: "value-proposition-canvas-osterwalder",
    name: "ValuePropositionCanvasOsterwalderSkill",
    displayName: "Strategyzer Value Proposition Canvas (Jobs, Pains, Gains)",
    categoryId: "analysis",
    description: "Aligns Product Pain Relievers and Gain Creators directly with Customer Jobs-to-be-Done, Pains, and Gains.",
    tags: ["analysis","value-proposition","osterwalder","jtbd","product-market-fit"],
    transform: createStandardSkillTransform({
      sectionName: "Strategyzer Value Proposition Fit Matrix",
      ruSectionName: "Value Proposition Canvas (Остервальдер): Профиль клиента и карта ценности",
      instructions: [
        "Customer Profile: Document functional, social, and emotional Jobs-to-be-Done, major Pains, and desired Gains.",
        "Value Map: Outline Products/Services, explicit Pain Relievers, and Gain Creators.",
        "Verify Problem-Solution Fit: ensure every major customer pain has an active pain reliever."
],
      ruInstructions: [
        "Профиль клиента: Опишите задачи (JTBD), боли (Pains) и выгоды (Gains).",
        "Карта ценности: Перечислите факторы снятия боли и создания пользы.",
        "Проверьте соответствие Problem-Solution Fit без пустых деклараций."
],
      semanticType: "domain_specific",
      tags: ["analysis","value-proposition","osterwalder","jtbd","product-market-fit"],
    }),
  },

  "feature-flags-canary-rollout-matrix": {
    id: "feature-flags-canary-rollout-matrix",
    name: "FeatureFlagsCanaryRolloutMatrixSkill",
    displayName: "Progressive Canary Rollout & Feature Flag Guardrail Matrix",
    categoryId: "analysis",
    description: "Evaluates blast radius and automated rollback triggers across 1% -> 5% -> 25% -> 100% rollout stages.",
    tags: ["analysis","canary","feature-flags","deployment","blast-radius"],
    transform: createStandardSkillTransform({
      sectionName: "Progressive Canary Rollout & Health Gate Matrix",
      ruSectionName: "Прогрессивный канареечный релиз (Canary 1% -> 10% -> 100%) и гейты здоровья",
      instructions: [
        "Define canary rollout phases: 1% internal -> 5% probe -> 25% baseline -> 100% general availability.",
        "Set strict automated rollback metrics: p99 latency degradation >15% or error rate >0.1%.",
        "Ensure instantaneous feature-flag kill switches for zero-deployment emergency shutoff."
],
      ruInstructions: [
        "Определите этапы канареечного выката: 1% -> 5% -> 25% -> 100%.",
        "Задайте жесткие критерии авто-отката: рост p99 задержки >15% или ошибок >0.1%.",
        "Внедрите рубильники мгновенного отключения (Kill Switches) через фича-флаги."
],
      semanticType: "protocol",
      tags: ["analysis","canary","feature-flags","deployment","blast-radius"],
    }),
  },

  "decision-matrix-pugh-concept-selection": {
    id: "decision-matrix-pugh-concept-selection",
    name: "DecisionMatrixPughConceptSelectionSkill",
    displayName: "Stuart Pugh Controlled Convergence Concept Selection Matrix",
    categoryId: "analysis",
    description: "Evaluates competing design concepts against an established Datum baseline using (+, -, S) scoring.",
    tags: ["analysis","pugh-matrix","concept-selection","engineering","evaluation"],
    transform: createStandardSkillTransform({
      sectionName: "Pugh Controlled Convergence Concept Selection Matrix",
      ruSectionName: "Матрица выбора концепций Стюарта Пью (Pugh Matrix: +, -, S)",
      instructions: [
        "Select a reference baseline concept as the Datum.",
        "Score competing alternatives across criteria as + (Better), - (Worse), or S (Same) relative to Datum.",
        "Synthesize hybrid concepts by combining high-scoring elements from disparate alternatives."
],
      ruInstructions: [
        "Выберите базовый эталонный вариант (Datum).",
        "Оцените альтернативы по критериям (+ лучше, - хуже, S так же относительно эталона).",
        "Создайте гибридную концепцию, объединив лучшие черты лидеров сравнения."
],
      semanticType: "domain_specific",
      tags: ["analysis","pugh-matrix","concept-selection","engineering","evaluation"],
    }),
  },

  "risk-heat-map-probability-impact": {
    id: "risk-heat-map-probability-impact",
    name: "RiskHeatMapProbabilityImpactSkill",
    displayName: "5x5 Qualitative Risk Heat Map (Likelihood × Impact)",
    categoryId: "analysis",
    description: "Plots operational risks onto a color-coded 5x5 matrix with explicit mitigation ownership.",
    tags: ["analysis","risk-heat-map","risk-management","probability-impact","governance"],
    transform: createStandardSkillTransform({
      sectionName: "5x5 Risk Likelihood & Impact Matrix",
      ruSectionName: "Тепловая карта рисков 5х5 (Вероятность х Влияние)",
      instructions: [
        "Plot all identified project risks on the 5x5 grid (Likelihood 1-5 × Impact 1-5).",
        "Flag all Red Zone risks (Score 15-25) as requiring immediate executive escalation and active mitigation plans.",
        "Assign explicit single-threaded owners and review frequencies to all medium/high risks."
],
      ruInstructions: [
        "Разместите проектные риски на сетке 5х5 (Вероятность 1–5, Влияние 1–5).",
        "Выделите риски красной зоны (балл 15–25) для немедленной эскалации и защиты.",
        "Назначьте ответственных владельцев для каждого критического риска."
],
      semanticType: "domain_specific",
      tags: ["analysis","risk-heat-map","risk-management","probability-impact","governance"],
    }),
  },

  "benchmarking-competitive-gap-spider": {
    id: "benchmarking-competitive-gap-spider",
    name: "BenchmarkingCompetitiveGapSpiderSkill",
    displayName: "Competitive Parity vs Differentiation Spider Chart",
    categoryId: "analysis",
    description: "Identifies areas of table-stakes Parity vs proprietary Competitive Moats across key capabilities.",
    tags: ["analysis","benchmarking","differentiation","competitive-moat","spider-chart"],
    transform: createStandardSkillTransform({
      sectionName: "Competitive Parity & Moat Differentiation Spider Chart",
      ruSectionName: "Сравнительный анализ паритета и конкурентных преимуществ (Moats)",
      instructions: [
        "Differentiate Table-Stakes Parity capabilities (must match competitors) from True Differentiators (must beat competitors).",
        "Plot capability scores against the market-leading benchmark.",
        "Direct capital and innovation resources exclusively toward protecting and expanding the competitive moat."
],
      ruInstructions: [
        "Разделите функции на базовый рыночный паритет и ключевые дифференциаторы.",
        "Сопоставьте возможности продукта с лидерами индустрии.",
        "Сфокусируйте ресурсы на укреплении уникального конкурентного преимущества."
],
      semanticType: "domain_specific",
      tags: ["analysis","benchmarking","differentiation","competitive-moat","spider-chart"],
    }),
  },

  "critical-success-factors-csf-kpi": {
    id: "critical-success-factors-csf-kpi",
    name: "CriticalSuccessFactorsCsfKpiSkill",
    displayName: "Rockart Critical Success Factors (CSF) & KPI Hierarchy",
    categoryId: "analysis",
    description: "Identifies the 3-5 vital areas where satisfactory results ensure successful competitive performance.",
    tags: ["analysis","csf","kpi","strategy","rockart","performance"],
    transform: createStandardSkillTransform({
      sectionName: "Critical Success Factors (CSF) & KPI Alignment",
      ruSectionName: "Критические факторы успеха (CSF) и дерево ключевых показателей (KPI)",
      instructions: [
        "Isolate 3-5 non-negotiable Critical Success Factors for {{task}}.",
        "Map 2-3 leading and lagging operational KPIs directly to each CSF.",
        "Define clear green/yellow/red trigger thresholds for executive intervention."
],
      ruInstructions: [
        "Выделите 3–5 критических факторов успеха (CSF), определяющих результат.",
        "Привяжите к каждому фактору опережающие и запаздывающие метрики (KPI).",
        "Задайте пороги для оперативного реагирования руководства."
],
      semanticType: "domain_specific",
      tags: ["analysis","csf","kpi","strategy","rockart","performance"],
    }),
  },

  "system-capacity-headroom-forecasting": {
    id: "system-capacity-headroom-forecasting",
    name: "SystemCapacityHeadroomForecastingSkill",
    displayName: "System Capacity Headroom & Saturation Run-Rate Forecasting",
    categoryId: "analysis",
    description: "Calculates time-to-exhaustion for compute, storage, and database IOPS based on historical growth rates.",
    tags: ["analysis","capacity-planning","headroom","infrastructure","scaling"],
    transform: createStandardSkillTransform({
      sectionName: "System Capacity Headroom & Saturation Forecasting",
      ruSectionName: "Прогнозирование запаса емкости (Capacity Headroom) и утилизации ресурсов",
      instructions: [
        "Measure current utilization rates across CPU, Memory, Disk IOPS, Network, and DB Connections.",
        "Calculate Time-to-Saturation (Days to 80% capacity) based on 30-day linear/exponential growth trends.",
        "Schedule proactive hardware or architectural scaling at least 60 days before reaching the 80% saturation threshold."
],
      ruInstructions: [
        "Зафиксируйте текущий процент утилизации CPU, RAM, IOPS диска и сети.",
        "Рассчитайте время до достижения 80% емкости (Time-to-Saturation) по тренду роста нагрузки.",
        "Запланируйте масштабирование минимум за 60 дней до критического порога."
],
      semanticType: "domain_specific",
      tags: ["analysis","capacity-planning","headroom","infrastructure","scaling"],
    }),
  },

  "root-cause-timeline-retro-postmortem": {
    id: "root-cause-timeline-retro-postmortem",
    name: "RootCauseTimelineRetroPostmortemSkill",
    displayName: "Blameless Incident Postmortem & Chronological Timeline",
    categoryId: "analysis",
    description: "Reconstructs exact minute-by-minute timeline of production incidents with blameless systemic action items.",
    tags: ["analysis","postmortem","incident-timeline","blameless","sre","reliability"],
    transform: createStandardSkillTransform({
      sectionName: "Blameless Incident Postmortem & Timeline",
      ruSectionName: "Безобвинительный постмортем инцидента и поминутная хронология (SRE)",
      instructions: [
        "Reconstruct exact chronological timeline: Trigger -> Detection -> Escalation -> Mitigation -> Full Resolution.",
        "Identify contributing systemic factors (monitoring blindspots, deployment gaps, missing circuit breakers).",
        "Formulate actionable preventive engineering tickets with assigned owners and 30-day completion SLAs."
],
      ruInstructions: [
        "Восстановите хронологию: Триггер -> Обнаружение -> Эскалация -> Локализация -> Полное устранение.",
        "Выявите системные факторы (слепые зоны мониторинга, отсутствие защиты от сбоев).",
        "Сформируйте конкретные задачи на доработку с дедлайном до 30 дней."
],
      semanticType: "process_directive",
      tags: ["analysis","postmortem","incident-timeline","blameless","sre","reliability"],
    }),
  },
  "cohort-matrix-cross-sectional-regression": {
    id: "cohort-matrix-cross-sectional-regression",
    name: "CohortMatrixCrossSectionalRegressionSkill",
    displayName: "Cross-Sectional Multivariate Cohort Regression",
    categoryId: "analysis",
    description: "Performs multi-variable regression analysis to isolate the true independent drivers of cohort performance.",
    tags: ["analysis","regression","statistics","multivariate","cohorts"],
    transform: createStandardSkillTransform({
      sectionName: "Multivariate Cohort Regression Analysis",
      ruSectionName: "Многофакторный регрессионный анализ когортных показателей",
      instructions: [
        "Fit ordinary least squares (OLS) or logistic regression models across cohort telemetry.",
        "Calculate R² goodness-of-fit, t-statistics, and p-values for every independent variable.",
        "Identify confounding collinearity using Variance Inflation Factor (VIF < 5.0)."
],
      ruInstructions: [
        "Постройте многофакторную регрессионную модель для ключевых метрик когорт.",
        "Рассчитайте коэффициент детерминации R², t-статистики и p-value для каждого фактора.",
        "Исключите мультиколлинеарность с помощью коэффициента инфляции дисперсии (VIF < 5.0)."
],
      semanticType: "domain_specific",
      tags: ["analysis","regression","statistics","multivariate","cohorts"],
    }),
  },

  "contingency-planning-black-swan-hedging": {
    id: "contingency-planning-black-swan-hedging",
    name: "ContingencyPlanningBlackSwanHedgingSkill",
    displayName: "Taleb Black Swan Contingency & Asymmetric Convex Hedging",
    categoryId: "analysis",
    description: "Designs asymmetric contingency protocols that provide massive protection against rare extreme tail events.",
    tags: ["analysis","black-swan","taleb","hedging","contingency","risk"],
    transform: createStandardSkillTransform({
      sectionName: "Black Swan Contingency & Convex Hedging Protocol",
      ruSectionName: "Протокол защиты от событий «Черного лебедя» (Асимметричное выпуклое хеджирование)",
      instructions: [
        "Identify low-probability, extreme-impact tail risk events (Black Swans) in the operational environment.",
        "Design cheap, continuous insurance mechanisms that cap maximum catastrophic downside.",
        "Create convex optionality that extracts massive upside if a market or technological rupture occurs."
],
      ruInstructions: [
        "Выявите маловероятные события с колоссальным разрушительным эффектом (Черные лебеди).",
        "Спроектируйте недорогие регулярные механизмы защиты, жестко ограничивающие максимальный убыток.",
        "Создайте выпуклую структуру опционов (Convexity), извлекающую пользу при резких сдвигах рынка."
],
      semanticType: "domain_specific",
      tags: ["analysis","black-swan","taleb","hedging","contingency","risk"],
    }),
  },

  "system-resilience-blast-radius-mitigation": {
    id: "system-resilience-blast-radius-mitigation",
    name: "SystemResilienceBlastRadiusMitigationSkill",
    displayName: "Blast Radius Containment & Compartmentalization",
    categoryId: "analysis",
    description: "Quantifies and minimizes the maximum blast radius of failures across tenants, regions, and data partitions.",
    tags: ["analysis","blast-radius","resilience","compartmentalization","cloud"],
    transform: createStandardSkillTransform({
      sectionName: "Blast Radius Containment & Partitioning Architecture",
      ruSectionName: "Локализация радиуса поражения сбоя (Blast Radius Containment)",
      instructions: [
        "Partition multi-tenant systems into independent cells/shards servicing maximum 5-10% of users each.",
        "Ensure a total cluster crash within one cell cannot propagate across cell boundaries.",
        "Automate instantaneous traffic rerouting away from unhealthy cells."
],
      ruInstructions: [
        "Разделите инфраструктуру на изолированные ячейки (Cells), обслуживающие не более 5–10% клиентов каждая.",
        "Гарантируйте, что падение одной ячейки не может вызвать каскадный сбой в соседних кластерах.",
        "Автоматизируйте мгновенный отвод трафика от деградировавших сегментов."
],
      semanticType: "protocol",
      tags: ["analysis","blast-radius","resilience","compartmentalization","cloud"],
    }),
  },

  "pricing-tier-van-westendorp-sensitivity": {
    id: "pricing-tier-van-westendorp-sensitivity",
    name: "PricingTierVanWestendorpSensitivitySkill",
    displayName: "Van Westendorp Price Sensitivity Meter (PSM)",
    categoryId: "analysis",
    description: "Determines optimal price points (Point of Marginal Cheapness, Optimum Price, Point of Marginal Expensiveness).",
    tags: ["analysis","pricing","van-westendorp","psm","market-research"],
    transform: createStandardSkillTransform({
      sectionName: "Van Westendorp Price Sensitivity Meter (PSM) Model",
      ruSectionName: "Ценовой анализ чувствительности Ван Вестендорпа (PSM: Оптимальная цена)",
      instructions: [
        "Analyze the 4 Van Westendorp pricing curves: Too Cheap, Cheap, Expensive, Too Expensive.",
        "Plot cumulative response intersections to find the Optimal Price Point (OPP) and Indifference Price Point (IPP).",
        "Define the Acceptable Price Range bounded by Point of Marginal Cheapness and Point of Marginal Expensiveness."
],
      ruInstructions: [
        "Постройте 4 кривые восприятия цены: Слишком дешево, Выгодно, Дорого, Слишком дорого.",
        "Найдите точку оптимальной цены (OPP) и точку безразличия (IPP) на пересечении кривых.",
        "Зафиксируйте диапазон приемлемых цен для тарифных планов продукта."
],
      semanticType: "domain_specific",
      tags: ["analysis","pricing","van-westendorp","psm","market-research"],
    }),
  },

  "system-bottleneck-little-law-queuing": {
    id: "system-bottleneck-little-law-queuing",
    name: "SystemBottleneckLittleLawQueuingSkill",
    displayName: "Little's Law & Queuing Theory (L = λW) Analyzer",
    categoryId: "analysis",
    description: "Calculates relationship between average concurrent items (L), arrival rate (λ), and average wait time (W).",
    tags: ["analysis","littles-law","queuing-theory","concurrency","performance"],
    transform: createStandardSkillTransform({
      sectionName: "Little's Law Queuing & Concurrency Capacity Analysis",
      ruSectionName: "Теория очередей и закон Литтла (L = λW): расчет пропускной способности",
      instructions: [
        "Apply Little's Law formula: `L = λ × W` (Concurrency = Arrival Rate × Residence Time).",
        "Model queue latency spikes when system utilization exceeds the critical 80% knee-of-the-curve.",
        "Size thread pools, database connection pools, and worker counts to bound maximum wait times."
],
      ruInstructions: [
        "Примените закон Литтла: `L = λ × W` (Число параллельных задач = Скорость поступления × Время обработки).",
        "Смоделируйте экспоненциальный рост очереди при загрузке системы свыше 80%.",
        "Рассчитайте оптимальный размер пулов потоков и соединений для гарантии заданного SLA по задержке."
],
      semanticType: "domain_specific",
      tags: ["analysis","littles-law","queuing-theory","concurrency","performance"],
    }),
  },
  "analysis-financial-statement-ratio-dupont-decomposition": {
    id: "analysis-financial-statement-ratio-dupont-decomposition",
    name: "FinancialStatementRatioDupontDecompositionSkill",
    displayName: "Financial Statement Ratio & Dupont Decomposition",
    categoryId: "analysis",
    description: "Analyzes ROE using DuPont 3-factor breakdown: profit margin, asset turnover, leverage.",
    tags: ["analysis","analysis","financial","statement"],
    transform: createStandardSkillTransform({
      sectionName: "Financial Statement Ratio & Dupont Decomposition Standards",
      ruSectionName: "Стандарты и регламенты: Financial Statement Ratio & Dupont Decomposition",
      instructions: [
        "Apply core domain tenets for Financial Statement Ratio & Dupont Decomposition.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Financial Statement Ratio & Dupont Decomposition.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","financial","statement"],
    }),
  },

  "analysis-competitive-intelligence-porter-five-forces": {
    id: "analysis-competitive-intelligence-porter-five-forces",
    name: "CompetitiveIntelligencePorterFiveForcesSkill",
    displayName: "Competitive Intelligence Porter Five Forces",
    categoryId: "analysis",
    description: "Evaluates industry attractiveness across threat of entry, buyer power, and substitutes.",
    tags: ["analysis","analysis","competitive","intelligence"],
    transform: createStandardSkillTransform({
      sectionName: "Competitive Intelligence Porter Five Forces Standards",
      ruSectionName: "Стандарты и регламенты: Competitive Intelligence Porter Five Forces",
      instructions: [
        "Apply core domain tenets for Competitive Intelligence Porter Five Forces.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Competitive Intelligence Porter Five Forces.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","competitive","intelligence"],
    }),
  },

  "analysis-macroeconomic-pestle-strategic-environmental-audit": {
    id: "analysis-macroeconomic-pestle-strategic-environmental-audit",
    name: "MacroeconomicPESTLEStrategicEnvironmentalAuditSkill",
    displayName: "Macroeconomic PESTLE Strategic Environmental Audit",
    categoryId: "analysis",
    description: "Assesses Political, Economic, Social, Tech, Legal, and Environmental trends.",
    tags: ["analysis","analysis","macroeconomic","pestle"],
    transform: createStandardSkillTransform({
      sectionName: "Macroeconomic PESTLE Strategic Environmental Audit Standards",
      ruSectionName: "Стандарты и регламенты: Macroeconomic PESTLE Strategic Environmental Audit",
      instructions: [
        "Apply core domain tenets for Macroeconomic PESTLE Strategic Environmental Audit.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Macroeconomic PESTLE Strategic Environmental Audit.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","macroeconomic","pestle"],
    }),
  },

  "analysis-root-cause-fishbone-ishikawa-diagram-analysis": {
    id: "analysis-root-cause-fishbone-ishikawa-diagram-analysis",
    name: "RootCauseFishboneIshikawaDiagramAnalysisSkill",
    displayName: "Root Cause Fishbone (Ishikawa) Diagram Analysis",
    categoryId: "analysis",
    description: "Categorizes causes of equipment/process defects across Man, Machine, Material, Method.",
    tags: ["analysis","analysis","root","cause"],
    transform: createStandardSkillTransform({
      sectionName: "Root Cause Fishbone (Ishikawa) Diagram Analysis Standards",
      ruSectionName: "Стандарты и регламенты: Root Cause Fishbone (Ishikawa) Diagram Analysis",
      instructions: [
        "Apply core domain tenets for Root Cause Fishbone (Ishikawa) Diagram Analysis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Root Cause Fishbone (Ishikawa) Diagram Analysis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","root","cause"],
    }),
  },

  "analysis-statistical-hypothesis-testing-p-value-interpretation": {
    id: "analysis-statistical-hypothesis-testing-p-value-interpretation",
    name: "StatisticalHypothesisTestingpValueInterpretationSkill",
    displayName: "Statistical Hypothesis Testing & p-Value Interpretation",
    categoryId: "analysis",
    description: "Evaluates null vs alternative hypotheses using t-tests, ANOVA, and z-scores.",
    tags: ["analysis","analysis","statistical","hypothesis"],
    transform: createStandardSkillTransform({
      sectionName: "Statistical Hypothesis Testing & p-Value Interpretation Standards",
      ruSectionName: "Стандарты и регламенты: Statistical Hypothesis Testing & p-Value Interpretation",
      instructions: [
        "Apply core domain tenets for Statistical Hypothesis Testing & p-Value Interpretation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Statistical Hypothesis Testing & p-Value Interpretation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","statistical","hypothesis"],
    }),
  },

  "analysis-cohort-survival-analysis-kaplan-meier-decay": {
    id: "analysis-cohort-survival-analysis-kaplan-meier-decay",
    name: "CohortSurvivalAnalysisKaplanMeierDecaySkill",
    displayName: "Cohort Survival Analysis & Kaplan-Meier Decay",
    categoryId: "analysis",
    description: "Models time-to-event attrition rates and survival probabilities over customer lifespans.",
    tags: ["analysis","analysis","cohort","survival"],
    transform: createStandardSkillTransform({
      sectionName: "Cohort Survival Analysis & Kaplan-Meier Decay Standards",
      ruSectionName: "Стандарты и регламенты: Cohort Survival Analysis & Kaplan-Meier Decay",
      instructions: [
        "Apply core domain tenets for Cohort Survival Analysis & Kaplan-Meier Decay.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cohort Survival Analysis & Kaplan-Meier Decay.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","cohort","survival"],
    }),
  },

  "analysis-supply-chain-value-stream-mapping-vsm": {
    id: "analysis-supply-chain-value-stream-mapping-vsm",
    name: "SupplyChainValueStreamMappingVSMSkill",
    displayName: "Supply Chain Value Stream Mapping (VSM)",
    categoryId: "analysis",
    description: "Identifies non-value-add delay waste and bottleneck cycle times in production.",
    tags: ["analysis","analysis","supply","chain"],
    transform: createStandardSkillTransform({
      sectionName: "Supply Chain Value Stream Mapping (VSM) Standards",
      ruSectionName: "Стандарты и регламенты: Supply Chain Value Stream Mapping (VSM)",
      instructions: [
        "Apply core domain tenets for Supply Chain Value Stream Mapping (VSM).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Supply Chain Value Stream Mapping (VSM).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","supply","chain"],
    }),
  },

  "analysis-brand-perception-sentiment-semantic-clustering": {
    id: "analysis-brand-perception-sentiment-semantic-clustering",
    name: "BrandPerceptionSentimentSemanticClusteringSkill",
    displayName: "Brand Perception Sentiment & Semantic Clustering",
    categoryId: "analysis",
    description: "Analyzes customer feedback sentiment across topic clusters using NLP.",
    tags: ["analysis","analysis","brand","perception"],
    transform: createStandardSkillTransform({
      sectionName: "Brand Perception Sentiment & Semantic Clustering Standards",
      ruSectionName: "Стандарты и регламенты: Brand Perception Sentiment & Semantic Clustering",
      instructions: [
        "Apply core domain tenets for Brand Perception Sentiment & Semantic Clustering.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Brand Perception Sentiment & Semantic Clustering.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","brand","perception"],
    }),
  },

  "analysis-m-a-due-diligence-synergy-red-flag-audit": {
    id: "analysis-m-a-due-diligence-synergy-red-flag-audit",
    name: "MADueDiligenceSynergyRedFlagAuditSkill",
    displayName: "M&A Due Diligence Synergy & Red Flag Audit",
    categoryId: "analysis",
    description: "Audits target company financial liabilities, churn, litigation, and tech debt.",
    tags: ["analysis","analysis","m","a"],
    transform: createStandardSkillTransform({
      sectionName: "M&A Due Diligence Synergy & Red Flag Audit Standards",
      ruSectionName: "Стандарты и регламенты: M&A Due Diligence Synergy & Red Flag Audit",
      instructions: [
        "Apply core domain tenets for M&A Due Diligence Synergy & Red Flag Audit.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для M&A Due Diligence Synergy & Red Flag Audit.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","m","a"],
    }),
  },

  "analysis-sensitivity-monte-carlo-risk-simulation": {
    id: "analysis-sensitivity-monte-carlo-risk-simulation",
    name: "SensitivityMonteCarloRiskSimulationSkill",
    displayName: "Sensitivity & Monte Carlo Risk Simulation",
    categoryId: "analysis",
    description: "Simulates thousands of probabilistic outcomes across variable distribution ranges.",
    tags: ["analysis","analysis","sensitivity","monte"],
    transform: createStandardSkillTransform({
      sectionName: "Sensitivity & Monte Carlo Risk Simulation Standards",
      ruSectionName: "Стандарты и регламенты: Sensitivity & Monte Carlo Risk Simulation",
      instructions: [
        "Apply core domain tenets for Sensitivity & Monte Carlo Risk Simulation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sensitivity & Monte Carlo Risk Simulation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","sensitivity","monte"],
    }),
  },

  "analysis-rfm-customer-lifetime-value-segmentation": {
    id: "analysis-rfm-customer-lifetime-value-segmentation",
    name: "RFMCustomerLifetimeValueSegmentationSkill",
    displayName: "RFM Customer Lifetime Value Segmentation",
    categoryId: "analysis",
    description: "Segments user bases by Recency, Frequency, and Monetary transaction values.",
    tags: ["analysis","analysis","rfm","customer"],
    transform: createStandardSkillTransform({
      sectionName: "RFM Customer Lifetime Value Segmentation Standards",
      ruSectionName: "Стандарты и регламенты: RFM Customer Lifetime Value Segmentation",
      instructions: [
        "Apply core domain tenets for RFM Customer Lifetime Value Segmentation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для RFM Customer Lifetime Value Segmentation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","rfm","customer"],
    }),
  },

  "analysis-ansoff-matrix-growth-vector-strategy": {
    id: "analysis-ansoff-matrix-growth-vector-strategy",
    name: "AnsoffMatrixGrowthVectorStrategySkill",
    displayName: "Ansoff Matrix Growth Vector Strategy",
    categoryId: "analysis",
    description: "Evaluates Market Penetration, Product Development, Market Dev, and Diversification.",
    tags: ["analysis","analysis","ansoff","matrix"],
    transform: createStandardSkillTransform({
      sectionName: "Ansoff Matrix Growth Vector Strategy Standards",
      ruSectionName: "Стандарты и регламенты: Ansoff Matrix Growth Vector Strategy",
      instructions: [
        "Apply core domain tenets for Ansoff Matrix Growth Vector Strategy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Ansoff Matrix Growth Vector Strategy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","ansoff","matrix"],
    }),
  },

  "analysis-vrio-resource-competitability-evaluation": {
    id: "analysis-vrio-resource-competitability-evaluation",
    name: "VRIOResourceCompetitabilityEvaluationSkill",
    displayName: "VRIO Resource Competitability Evaluation",
    categoryId: "analysis",
    description: "Tests corporate assets for Value, Rarity, Inimitability, and Organizational alignment.",
    tags: ["analysis","analysis","vrio","resource"],
    transform: createStandardSkillTransform({
      sectionName: "VRIO Resource Competitability Evaluation Standards",
      ruSectionName: "Стандарты и регламенты: VRIO Resource Competitability Evaluation",
      instructions: [
        "Apply core domain tenets for VRIO Resource Competitability Evaluation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для VRIO Resource Competitability Evaluation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","vrio","resource"],
    }),
  },

  "analysis-bcg-growth-share-matrix-portfolio-analysis": {
    id: "analysis-bcg-growth-share-matrix-portfolio-analysis",
    name: "BCGGrowthShareMatrixPortfolioAnalysisSkill",
    displayName: "BCG Growth-Share Matrix Portfolio Analysis",
    categoryId: "analysis",
    description: "Categorizes business units into Stars, Cash Cows, Question Marks, and Dogs.",
    tags: ["analysis","analysis","bcg","growth"],
    transform: createStandardSkillTransform({
      sectionName: "BCG Growth-Share Matrix Portfolio Analysis Standards",
      ruSectionName: "Стандарты и регламенты: BCG Growth-Share Matrix Portfolio Analysis",
      instructions: [
        "Apply core domain tenets for BCG Growth-Share Matrix Portfolio Analysis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для BCG Growth-Share Matrix Portfolio Analysis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","bcg","growth"],
    }),
  },

  "analysis-customer-churn-hazard-rate-modeling": {
    id: "analysis-customer-churn-hazard-rate-modeling",
    name: "CustomerChurnHazardRateModelingSkill",
    displayName: "Customer Churn Hazard Rate Modeling",
    categoryId: "analysis",
    description: "Identifies early warning indicators correlated with customer subscription cancellation.",
    tags: ["analysis","analysis","customer","churn"],
    transform: createStandardSkillTransform({
      sectionName: "Customer Churn Hazard Rate Modeling Standards",
      ruSectionName: "Стандарты и регламенты: Customer Churn Hazard Rate Modeling",
      instructions: [
        "Apply core domain tenets for Customer Churn Hazard Rate Modeling.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Customer Churn Hazard Rate Modeling.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","customer","churn"],
    }),
  },

  "analysis-regulatory-compliance-gap-audit-trail": {
    id: "analysis-regulatory-compliance-gap-audit-trail",
    name: "RegulatoryComplianceGapAuditTrailSkill",
    displayName: "Regulatory Compliance Gap & Audit Trail",
    categoryId: "analysis",
    description: "Identifies non-compliance gaps between current operations and new legal frameworks.",
    tags: ["analysis","analysis","regulatory","compliance"],
    transform: createStandardSkillTransform({
      sectionName: "Regulatory Compliance Gap & Audit Trail Standards",
      ruSectionName: "Стандарты и регламенты: Regulatory Compliance Gap & Audit Trail",
      instructions: [
        "Apply core domain tenets for Regulatory Compliance Gap & Audit Trail.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Regulatory Compliance Gap & Audit Trail.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","regulatory","compliance"],
    }),
  },

  "analysis-pricing-elasticity-of-demand-optimization": {
    id: "analysis-pricing-elasticity-of-demand-optimization",
    name: "PricingElasticityofDemandOptimizationSkill",
    displayName: "Pricing Elasticity of Demand Optimization",
    categoryId: "analysis",
    description: "Calculates price elasticity coefficients to optimize profit margins without churn.",
    tags: ["analysis","analysis","pricing","elasticity"],
    transform: createStandardSkillTransform({
      sectionName: "Pricing Elasticity of Demand Optimization Standards",
      ruSectionName: "Стандарты и регламенты: Pricing Elasticity of Demand Optimization",
      instructions: [
        "Apply core domain tenets for Pricing Elasticity of Demand Optimization.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Pricing Elasticity of Demand Optimization.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","pricing","elasticity"],
    }),
  },

  "analysis-capex-vs-opex-capital-allocation-analysis": {
    id: "analysis-capex-vs-opex-capital-allocation-analysis",
    name: "CapExvsOpExCapitalAllocationAnalysisSkill",
    displayName: "CapEx vs OpEx Capital Allocation Analysis",
    categoryId: "analysis",
    description: "Evaluates long-term ROI trade-offs between upfront CapEx and recurring OpEx.",
    tags: ["analysis","analysis","capex","vs"],
    transform: createStandardSkillTransform({
      sectionName: "CapEx vs OpEx Capital Allocation Analysis Standards",
      ruSectionName: "Стандарты и регламенты: CapEx vs OpEx Capital Allocation Analysis",
      instructions: [
        "Apply core domain tenets for CapEx vs OpEx Capital Allocation Analysis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для CapEx vs OpEx Capital Allocation Analysis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","capex","vs"],
    }),
  },

  "analysis-unit-economics-ltv-cac-payback-period": {
    id: "analysis-unit-economics-ltv-cac-payback-period",
    name: "UnitEconomicsLTVCACPaybackPeriodSkill",
    displayName: "Unit Economics LTV/CAC Payback Period",
    categoryId: "analysis",
    description: "Calculates Net LTV, Customer Acquisition Cost, and months to CAC payback.",
    tags: ["analysis","analysis","unit","economics"],
    transform: createStandardSkillTransform({
      sectionName: "Unit Economics LTV/CAC Payback Period Standards",
      ruSectionName: "Стандарты и регламенты: Unit Economics LTV/CAC Payback Period",
      instructions: [
        "Apply core domain tenets for Unit Economics LTV/CAC Payback Period.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Unit Economics LTV/CAC Payback Period.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","unit","economics"],
    }),
  },

  "analysis-cybersecurity-threat-surface-attack-vector": {
    id: "analysis-cybersecurity-threat-surface-attack-vector",
    name: "CybersecurityThreatSurfaceAttackVectorSkill",
    displayName: "Cybersecurity Threat Surface & Attack Vector",
    categoryId: "analysis",
    description: "Maps attack surfaces, entry points, and vulnerability exploitation paths.",
    tags: ["analysis","analysis","cybersecurity","threat"],
    transform: createStandardSkillTransform({
      sectionName: "Cybersecurity Threat Surface & Attack Vector Standards",
      ruSectionName: "Стандарты и регламенты: Cybersecurity Threat Surface & Attack Vector",
      instructions: [
        "Apply core domain tenets for Cybersecurity Threat Surface & Attack Vector.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cybersecurity Threat Surface & Attack Vector.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","cybersecurity","threat"],
    }),
  },

  "analysis-market-sizing-tam-sam-som-bottom-up-model": {
    id: "analysis-market-sizing-tam-sam-som-bottom-up-model",
    name: "MarketSizingTAMSAMSOMBottomUpModelSkill",
    displayName: "Market Sizing TAM SAM SOM Bottom-Up Model",
    categoryId: "analysis",
    description: "Builds realistic market sizing estimations using bottom-up unit calculations.",
    tags: ["analysis","analysis","market","sizing"],
    transform: createStandardSkillTransform({
      sectionName: "Market Sizing TAM SAM SOM Bottom-Up Model Standards",
      ruSectionName: "Стандарты и регламенты: Market Sizing TAM SAM SOM Bottom-Up Model",
      instructions: [
        "Apply core domain tenets for Market Sizing TAM SAM SOM Bottom-Up Model.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Market Sizing TAM SAM SOM Bottom-Up Model.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","market","sizing"],
    }),
  },

  "analysis-product-quality-defect-pareto-distribution": {
    id: "analysis-product-quality-defect-pareto-distribution",
    name: "ProductQualityDefectParetoDistributionSkill",
    displayName: "Product Quality Defect Pareto Distribution",
    categoryId: "analysis",
    description: "Isolates the 20% of root defect causes responsible for 80% of product returns.",
    tags: ["analysis","analysis","product","quality"],
    transform: createStandardSkillTransform({
      sectionName: "Product Quality Defect Pareto Distribution Standards",
      ruSectionName: "Стандарты и регламенты: Product Quality Defect Pareto Distribution",
      instructions: [
        "Apply core domain tenets for Product Quality Defect Pareto Distribution.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Product Quality Defect Pareto Distribution.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","product","quality"],
    }),
  },

  "analysis-organizational-network-analysis-ona-communication": {
    id: "analysis-organizational-network-analysis-ona-communication",
    name: "OrganizationalNetworkAnalysisONACommunicationSkill",
    displayName: "Organizational Network Analysis (ONA) Communication",
    categoryId: "analysis",
    description: "Maps informal communication channels and key influence hubs inside companies.",
    tags: ["analysis","analysis","organizational","network"],
    transform: createStandardSkillTransform({
      sectionName: "Organizational Network Analysis (ONA) Communication Standards",
      ruSectionName: "Стандарты и регламенты: Organizational Network Analysis (ONA) Communication",
      instructions: [
        "Apply core domain tenets for Organizational Network Analysis (ONA) Communication.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Organizational Network Analysis (ONA) Communication.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","organizational","network"],
    }),
  },

  "analysis-vendor-sla-performance-penalty-credit-audit": {
    id: "analysis-vendor-sla-performance-penalty-credit-audit",
    name: "VendorSLAPerformancePenaltyCreditAuditSkill",
    displayName: "Vendor SLA Performance & Penalty Credit Audit",
    categoryId: "analysis",
    description: "Audits vendor uptime and performance logs against contractual SLA penalties.",
    tags: ["analysis","analysis","vendor","sla"],
    transform: createStandardSkillTransform({
      sectionName: "Vendor SLA Performance & Penalty Credit Audit Standards",
      ruSectionName: "Стандарты и регламенты: Vendor SLA Performance & Penalty Credit Audit",
      instructions: [
        "Apply core domain tenets for Vendor SLA Performance & Penalty Credit Audit.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Vendor SLA Performance & Penalty Credit Audit.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","vendor","sla"],
    }),
  },

  "analysis-technology-debt-index-refactoring-impact": {
    id: "analysis-technology-debt-index-refactoring-impact",
    name: "TechnologyDebtIndexRefactoringImpactSkill",
    displayName: "Technology Debt Index & Refactoring Impact",
    categoryId: "analysis",
    description: "Quantifies technical debt interest costs in terms of developer velocity loss.",
    tags: ["analysis","analysis","technology","debt"],
    transform: createStandardSkillTransform({
      sectionName: "Technology Debt Index & Refactoring Impact Standards",
      ruSectionName: "Стандарты и регламенты: Technology Debt Index & Refactoring Impact",
      instructions: [
        "Apply core domain tenets for Technology Debt Index & Refactoring Impact.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Technology Debt Index & Refactoring Impact.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","technology","debt"],
    }),
  },

  "analysis-operational-bottleneck-theory-of-constraints-toc": {
    id: "analysis-operational-bottleneck-theory-of-constraints-toc",
    name: "OperationalBottleneckTheoryofConstraintsTOCSkill",
    displayName: "Operational Bottleneck Theory of Constraints (TOC)",
    categoryId: "analysis",
    description: "Identifies and elevates the single constraint limiting throughput capacity.",
    tags: ["analysis","analysis","operational","bottleneck"],
    transform: createStandardSkillTransform({
      sectionName: "Operational Bottleneck Theory of Constraints (TOC) Standards",
      ruSectionName: "Стандарты и регламенты: Operational Bottleneck Theory of Constraints (TOC)",
      instructions: [
        "Apply core domain tenets for Operational Bottleneck Theory of Constraints (TOC).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Operational Bottleneck Theory of Constraints (TOC).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","operational","bottleneck"],
    }),
  },

  "analysis-customer-journey-touchpoint-attribution": {
    id: "analysis-customer-journey-touchpoint-attribution",
    name: "CustomerJourneyTouchpointAttributionSkill",
    displayName: "Customer Journey Touchpoint Attribution",
    categoryId: "analysis",
    description: "Allocates conversion credit across first-click, last-click, and multi-touch channels.",
    tags: ["analysis","analysis","customer","journey"],
    transform: createStandardSkillTransform({
      sectionName: "Customer Journey Touchpoint Attribution Standards",
      ruSectionName: "Стандарты и регламенты: Customer Journey Touchpoint Attribution",
      instructions: [
        "Apply core domain tenets for Customer Journey Touchpoint Attribution.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Customer Journey Touchpoint Attribution.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","customer","journey"],
    }),
  },

  "analysis-b2b-sales-pipeline-velocity-stage-conversion": {
    id: "analysis-b2b-sales-pipeline-velocity-stage-conversion",
    name: "B2BSalesPipelineVelocityStageConversionSkill",
    displayName: "B2B Sales Pipeline Velocity & Stage Conversion",
    categoryId: "analysis",
    description: "Calculates sales velocity: `(Deals * Win Rate * Deal Size) / Cycle Length`.",
    tags: ["analysis","analysis","b2b","sales"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Sales Pipeline Velocity & Stage Conversion Standards",
      ruSectionName: "Стандарты и регламенты: B2B Sales Pipeline Velocity & Stage Conversion",
      instructions: [
        "Apply core domain tenets for B2B Sales Pipeline Velocity & Stage Conversion.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Sales Pipeline Velocity & Stage Conversion.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","b2b","sales"],
    }),
  },

  "analysis-esg-carbon-footprint-scope-1-3-inventory": {
    id: "analysis-esg-carbon-footprint-scope-1-3-inventory",
    name: "ESGCarbonFootprintScope13InventorySkill",
    displayName: "ESG Carbon Footprint Scope 1-3 Inventory",
    categoryId: "analysis",
    description: "Audits direct and indirect corporate greenhouse gas emissions across value chains.",
    tags: ["analysis","analysis","esg","carbon"],
    transform: createStandardSkillTransform({
      sectionName: "ESG Carbon Footprint Scope 1-3 Inventory Standards",
      ruSectionName: "Стандарты и регламенты: ESG Carbon Footprint Scope 1-3 Inventory",
      instructions: [
        "Apply core domain tenets for ESG Carbon Footprint Scope 1-3 Inventory.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для ESG Carbon Footprint Scope 1-3 Inventory.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","esg","carbon"],
    }),
  },

  "analysis-commercial-real-estate-yield-cap-rate-audit": {
    id: "analysis-commercial-real-estate-yield-cap-rate-audit",
    name: "CommercialRealEstateYieldCapRateAuditSkill",
    displayName: "Commercial Real Estate Yield & Cap Rate Audit",
    categoryId: "analysis",
    description: "Evaluates net operating income (NOI) and capitalization rates for properties.",
    tags: ["analysis","analysis","commercial","real"],
    transform: createStandardSkillTransform({
      sectionName: "Commercial Real Estate Yield & Cap Rate Audit Standards",
      ruSectionName: "Стандарты и регламенты: Commercial Real Estate Yield & Cap Rate Audit",
      instructions: [
        "Apply core domain tenets for Commercial Real Estate Yield & Cap Rate Audit.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Commercial Real Estate Yield & Cap Rate Audit.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","commercial","real"],
    }),
  },

  "analysis-product-feature-usage-engagement-dropoff": {
    id: "analysis-product-feature-usage-engagement-dropoff",
    name: "ProductFeatureUsageEngagementDropoffSkill",
    displayName: "Product Feature Usage & Engagement Dropoff",
    categoryId: "analysis",
    description: "Analyzes telemetry logs to find friction points where users abandon features.",
    tags: ["analysis","analysis","product","feature"],
    transform: createStandardSkillTransform({
      sectionName: "Product Feature Usage & Engagement Dropoff Standards",
      ruSectionName: "Стандарты и регламенты: Product Feature Usage & Engagement Dropoff",
      instructions: [
        "Apply core domain tenets for Product Feature Usage & Engagement Dropoff.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Product Feature Usage & Engagement Dropoff.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","product","feature"],
    }),
  },

  "analysis-geopolitical-country-risk-currency-hedging": {
    id: "analysis-geopolitical-country-risk-currency-hedging",
    name: "GeopoliticalCountryRiskCurrencyHedgingSkill",
    displayName: "Geopolitical Country Risk & Currency Hedging",
    categoryId: "analysis",
    description: "Assesses sovereign risk, expropriation threat, and foreign exchange exposure.",
    tags: ["analysis","analysis","geopolitical","country"],
    transform: createStandardSkillTransform({
      sectionName: "Geopolitical Country Risk & Currency Hedging Standards",
      ruSectionName: "Стандарты и регламенты: Geopolitical Country Risk & Currency Hedging",
      instructions: [
        "Apply core domain tenets for Geopolitical Country Risk & Currency Hedging.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Geopolitical Country Risk & Currency Hedging.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","geopolitical","country"],
    }),
  },

  "analysis-patent-landscape-prior-art-freedom-to-operate": {
    id: "analysis-patent-landscape-prior-art-freedom-to-operate",
    name: "PatentLandscapePriorArtFreedomtoOperateSkill",
    displayName: "Patent Landscape Prior Art & Freedom to Operate",
    categoryId: "analysis",
    description: "Maps competitor patent filings to identify white space and infringement risks.",
    tags: ["analysis","analysis","patent","landscape"],
    transform: createStandardSkillTransform({
      sectionName: "Patent Landscape Prior Art & Freedom to Operate Standards",
      ruSectionName: "Стандарты и регламенты: Patent Landscape Prior Art & Freedom to Operate",
      instructions: [
        "Apply core domain tenets for Patent Landscape Prior Art & Freedom to Operate.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Patent Landscape Prior Art & Freedom to Operate.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","patent","landscape"],
    }),
  },

  "analysis-inventory-turnover-days-sales-of-inventory-dsi": {
    id: "analysis-inventory-turnover-days-sales-of-inventory-dsi",
    name: "InventoryTurnoverDaysSalesofInventoryDSISkill",
    displayName: "Inventory Turnover & Days Sales of Inventory (DSI)",
    categoryId: "analysis",
    description: "Evaluates inventory holding costs and stockout risk management.",
    tags: ["analysis","analysis","inventory","turnover"],
    transform: createStandardSkillTransform({
      sectionName: "Inventory Turnover & Days Sales of Inventory (DSI) Standards",
      ruSectionName: "Стандарты и регламенты: Inventory Turnover & Days Sales of Inventory (DSI)",
      instructions: [
        "Apply core domain tenets for Inventory Turnover & Days Sales of Inventory (DSI).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Inventory Turnover & Days Sales of Inventory (DSI).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","inventory","turnover"],
    }),
  },

  "analysis-employee-turnover-retention-cohort-analysis": {
    id: "analysis-employee-turnover-retention-cohort-analysis",
    name: "EmployeeTurnoverRetentionCohortAnalysisSkill",
    displayName: "Employee Turnover Retention Cohort Analysis",
    categoryId: "analysis",
    description: "Tracks employee tenure retention curves by department and manager cohort.",
    tags: ["analysis","analysis","employee","turnover"],
    transform: createStandardSkillTransform({
      sectionName: "Employee Turnover Retention Cohort Analysis Standards",
      ruSectionName: "Стандарты и регламенты: Employee Turnover Retention Cohort Analysis",
      instructions: [
        "Apply core domain tenets for Employee Turnover Retention Cohort Analysis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Employee Turnover Retention Cohort Analysis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","employee","turnover"],
    }),
  },

  "analysis-software-infrastructure-cloud-cost-allocation-finops": {
    id: "analysis-software-infrastructure-cloud-cost-allocation-finops",
    name: "SoftwareInfrastructureCloudCostAllocationFinOpsSkill",
    displayName: "Software Infrastructure Cloud Cost Allocation (FinOps)",
    categoryId: "analysis",
    description: "Attributes AWS/GCP cloud hosting spend down to individual product features.",
    tags: ["analysis","analysis","software","infrastructure"],
    transform: createStandardSkillTransform({
      sectionName: "Software Infrastructure Cloud Cost Allocation (FinOps) Standards",
      ruSectionName: "Стандарты и регламенты: Software Infrastructure Cloud Cost Allocation (FinOps)",
      instructions: [
        "Apply core domain tenets for Software Infrastructure Cloud Cost Allocation (FinOps).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Software Infrastructure Cloud Cost Allocation (FinOps).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","software","infrastructure"],
    }),
  },

  "analysis-data-governance-lineage-metadata-provenance": {
    id: "analysis-data-governance-lineage-metadata-provenance",
    name: "DataGovernanceLineageMetadataProvenanceSkill",
    displayName: "Data Governance Lineage & Metadata Provenance",
    categoryId: "analysis",
    description: "Traces raw data transformation lineage from source systems to dashboards.",
    tags: ["analysis","analysis","data","governance"],
    transform: createStandardSkillTransform({
      sectionName: "Data Governance Lineage & Metadata Provenance Standards",
      ruSectionName: "Стандарты и регламенты: Data Governance Lineage & Metadata Provenance",
      instructions: [
        "Apply core domain tenets for Data Governance Lineage & Metadata Provenance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Data Governance Lineage & Metadata Provenance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","data","governance"],
    }),
  },

  "analysis-franchise-unit-ebitda-payback-benchmarking": {
    id: "analysis-franchise-unit-ebitda-payback-benchmarking",
    name: "FranchiseUnitEBITDAPaybackBenchmarkingSkill",
    displayName: "Franchise Unit EBITDA & Payback Benchmarking",
    categoryId: "analysis",
    description: "Audits franchisee location profitability and 4-wall margin consistency.",
    tags: ["analysis","analysis","franchise","unit"],
    transform: createStandardSkillTransform({
      sectionName: "Franchise Unit EBITDA & Payback Benchmarking Standards",
      ruSectionName: "Стандарты и регламенты: Franchise Unit EBITDA & Payback Benchmarking",
      instructions: [
        "Apply core domain tenets for Franchise Unit EBITDA & Payback Benchmarking.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Franchise Unit EBITDA & Payback Benchmarking.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","franchise","unit"],
    }),
  },

  "analysis-public-relations-share-of-voice-sov-analysis": {
    id: "analysis-public-relations-share-of-voice-sov-analysis",
    name: "PublicRelationsShareofVoiceSOVAnalysisSkill",
    displayName: "Public Relations Share of Voice (SOV) Analysis",
    categoryId: "analysis",
    description: "Measures brand media mention volume against key competitors.",
    tags: ["analysis","analysis","public","relations"],
    transform: createStandardSkillTransform({
      sectionName: "Public Relations Share of Voice (SOV) Analysis Standards",
      ruSectionName: "Стандарты и регламенты: Public Relations Share of Voice (SOV) Analysis",
      instructions: [
        "Apply core domain tenets for Public Relations Share of Voice (SOV) Analysis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Public Relations Share of Voice (SOV) Analysis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","public","relations"],
    }),
  },

  "analysis-disaster-recovery-rpo-rto-gap-assessment": {
    id: "analysis-disaster-recovery-rpo-rto-gap-assessment",
    name: "DisasterRecoveryRPORTOGapAssessmentSkill",
    displayName: "Disaster Recovery RPO/RTO Gap Assessment",
    categoryId: "analysis",
    description: "Audits actual backup restoration times against business continuity goals.",
    tags: ["analysis","analysis","disaster","recovery"],
    transform: createStandardSkillTransform({
      sectionName: "Disaster Recovery RPO/RTO Gap Assessment Standards",
      ruSectionName: "Стандарты и регламенты: Disaster Recovery RPO/RTO Gap Assessment",
      instructions: [
        "Apply core domain tenets for Disaster Recovery RPO/RTO Gap Assessment.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Disaster Recovery RPO/RTO Gap Assessment.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","disaster","recovery"],
    }),
  },

  "analysis-customer-support-first-contact-resolution-fcr": {
    id: "analysis-customer-support-first-contact-resolution-fcr",
    name: "CustomerSupportFirstContactResolutionFCRSkill",
    displayName: "Customer Support First Contact Resolution (FCR)",
    categoryId: "analysis",
    description: "Evaluates support ticket resolution efficiency and repeat contact rates.",
    tags: ["analysis","analysis","customer","support"],
    transform: createStandardSkillTransform({
      sectionName: "Customer Support First Contact Resolution (FCR) Standards",
      ruSectionName: "Стандарты и регламенты: Customer Support First Contact Resolution (FCR)",
      instructions: [
        "Apply core domain tenets for Customer Support First Contact Resolution (FCR).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Customer Support First Contact Resolution (FCR).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","customer","support"],
    }),
  },

  "analysis-e-commerce-cart-abandonment-cause-segmentation": {
    id: "analysis-e-commerce-cart-abandonment-cause-segmentation",
    name: "ECommerceCartAbandonmentCauseSegmentationSkill",
    displayName: "E-Commerce Cart Abandonment Cause Segmentation",
    categoryId: "analysis",
    description: "Analyzes cart checkout dropoff causes: shipping costs, payment options, friction.",
    tags: ["analysis","analysis","e","commerce"],
    transform: createStandardSkillTransform({
      sectionName: "E-Commerce Cart Abandonment Cause Segmentation Standards",
      ruSectionName: "Стандарты и регламенты: E-Commerce Cart Abandonment Cause Segmentation",
      instructions: [
        "Apply core domain tenets for E-Commerce Cart Abandonment Cause Segmentation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для E-Commerce Cart Abandonment Cause Segmentation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","e","commerce"],
    }),
  },

  "analysis-syndicated-retail-scanner-data-market-share": {
    id: "analysis-syndicated-retail-scanner-data-market-share",
    name: "SyndicatedRetailScannerDataMarketShareSkill",
    displayName: "Syndicated Retail Scanner Data Market Share",
    categoryId: "analysis",
    description: "Analyzes POS retail sales data to track market share shifts by region.",
    tags: ["analysis","analysis","syndicated","retail"],
    transform: createStandardSkillTransform({
      sectionName: "Syndicated Retail Scanner Data Market Share Standards",
      ruSectionName: "Стандарты и регламенты: Syndicated Retail Scanner Data Market Share",
      instructions: [
        "Apply core domain tenets for Syndicated Retail Scanner Data Market Share.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Syndicated Retail Scanner Data Market Share.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","syndicated","retail"],
    }),
  },

  "analysis-clinical-trial-primary-endpoint-statistical-power": {
    id: "analysis-clinical-trial-primary-endpoint-statistical-power",
    name: "ClinicalTrialPrimaryEndpointStatisticalPowerSkill",
    displayName: "Clinical Trial Primary Endpoint Statistical Power",
    categoryId: "analysis",
    description: "Evaluates sample size power calculations for medical drug trial endpoints.",
    tags: ["analysis","analysis","clinical","trial"],
    transform: createStandardSkillTransform({
      sectionName: "Clinical Trial Primary Endpoint Statistical Power Standards",
      ruSectionName: "Стандарты и регламенты: Clinical Trial Primary Endpoint Statistical Power",
      instructions: [
        "Apply core domain tenets for Clinical Trial Primary Endpoint Statistical Power.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Clinical Trial Primary Endpoint Statistical Power.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","clinical","trial"],
    }),
  },

  "analysis-saas-rule-of-40-efficiency-index": {
    id: "analysis-saas-rule-of-40-efficiency-index",
    name: "SaaSRuleof40EfficiencyIndexSkill",
    displayName: "SaaS Rule of 40 Efficiency Index",
    categoryId: "analysis",
    description: "Calculates combined ARR growth rate + FCF margin score for SaaS health.",
    tags: ["analysis","analysis","saas","rule"],
    transform: createStandardSkillTransform({
      sectionName: "SaaS Rule of 40 Efficiency Index Standards",
      ruSectionName: "Стандарты и регламенты: SaaS Rule of 40 Efficiency Index",
      instructions: [
        "Apply core domain tenets for SaaS Rule of 40 Efficiency Index.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SaaS Rule of 40 Efficiency Index.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","saas","rule"],
    }),
  },

  "analysis-algorithmic-trading-backtest-sharpe-ratio": {
    id: "analysis-algorithmic-trading-backtest-sharpe-ratio",
    name: "AlgorithmicTradingBacktestSharpeRatioSkill",
    displayName: "Algorithmic Trading Backtest Sharpe Ratio",
    categoryId: "analysis",
    description: "Evaluates trading strategy risk-adjusted returns and maximum drawdown depth.",
    tags: ["analysis","analysis","algorithmic","trading"],
    transform: createStandardSkillTransform({
      sectionName: "Algorithmic Trading Backtest Sharpe Ratio Standards",
      ruSectionName: "Стандарты и регламенты: Algorithmic Trading Backtest Sharpe Ratio",
      instructions: [
        "Apply core domain tenets for Algorithmic Trading Backtest Sharpe Ratio.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Algorithmic Trading Backtest Sharpe Ratio.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","algorithmic","trading"],
    }),
  },

  "analysis-energy-grid-peak-load-demand-response": {
    id: "analysis-energy-grid-peak-load-demand-response",
    name: "EnergyGridPeakLoadDemandResponseSkill",
    displayName: "Energy Grid Peak Load & Demand Response",
    categoryId: "analysis",
    description: "Analyzes peak electricity demand patterns and load-shedding opportunities.",
    tags: ["analysis","analysis","energy","grid"],
    transform: createStandardSkillTransform({
      sectionName: "Energy Grid Peak Load & Demand Response Standards",
      ruSectionName: "Стандарты и регламенты: Energy Grid Peak Load & Demand Response",
      instructions: [
        "Apply core domain tenets for Energy Grid Peak Load & Demand Response.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Energy Grid Peak Load & Demand Response.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","energy","grid"],
    }),
  },

  "analysis-supply-chain-bullwhip-demand-distortion": {
    id: "analysis-supply-chain-bullwhip-demand-distortion",
    name: "SupplyChainBullwhipDemandDistortionSkill",
    displayName: "Supply Chain Bullwhip Demand Distortion",
    categoryId: "analysis",
    description: "Identifies demand forecast amplification across multi-tier distribution channels.",
    tags: ["analysis","analysis","supply","chain"],
    transform: createStandardSkillTransform({
      sectionName: "Supply Chain Bullwhip Demand Distortion Standards",
      ruSectionName: "Стандарты и регламенты: Supply Chain Bullwhip Demand Distortion",
      instructions: [
        "Apply core domain tenets for Supply Chain Bullwhip Demand Distortion.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Supply Chain Bullwhip Demand Distortion.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","supply","chain"],
    }),
  },

  "analysis-mobile-app-aso-keyword-conversion-audit": {
    id: "analysis-mobile-app-aso-keyword-conversion-audit",
    name: "MobileAppASOKeywordConversionAuditSkill",
    displayName: "Mobile App ASO Keyword Conversion Audit",
    categoryId: "analysis",
    description: "Analyzes app store search ranking factors and organic install conversion.",
    tags: ["analysis","analysis","mobile","app"],
    transform: createStandardSkillTransform({
      sectionName: "Mobile App ASO Keyword Conversion Audit Standards",
      ruSectionName: "Стандарты и регламенты: Mobile App ASO Keyword Conversion Audit",
      instructions: [
        "Apply core domain tenets for Mobile App ASO Keyword Conversion Audit.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Mobile App ASO Keyword Conversion Audit.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","mobile","app"],
    }),
  },

  "analysis-corporate-governance-board-composition-audit": {
    id: "analysis-corporate-governance-board-composition-audit",
    name: "CorporateGovernanceBoardCompositionAuditSkill",
    displayName: "Corporate Governance Board Composition Audit",
    categoryId: "analysis",
    description: "Evaluates board independence, diversity, and committee oversight efficacy.",
    tags: ["analysis","analysis","corporate","governance"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Governance Board Composition Audit Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Governance Board Composition Audit",
      instructions: [
        "Apply core domain tenets for Corporate Governance Board Composition Audit.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Governance Board Composition Audit.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["analysis","analysis","corporate","governance"],
    }),
  },
  "analysis-multi-multi-perspective-qualitative-research-analysis": {
    id: "analysis-multi-multi-perspective-qualitative-research-analysis",
    name: "MultiPerspectiveQualitativeResearchAnalysisSkill",
    displayName: "Multi Perspective Qualitative Research Analysis",
    categoryId: "analysis",
    description: "Analyzes interviews using Grounded Theory, Thematic Analysis, and Discourse Analysis simultaneously.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Qualitative Research Analysis",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Qualitative Research Analysis",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Perspective Qualitative Research Analysis.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Perspective Qualitative Research Analysis.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-layer-enterprise-risk-audit-cascades": {
    id: "analysis-multi-multi-layer-enterprise-risk-audit-cascades",
    name: "MultiLayerEnterpriseRiskAuditCascadesSkill",
    displayName: "Multi Layer Enterprise Risk Audit Cascades",
    categoryId: "analysis",
    description: "Audits operational, financial, reputational, and compliance risks in cascading failure chains.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Enterprise Risk Audit Cascades",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Enterprise Risk Audit Cascades",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Layer Enterprise Risk Audit Cascades.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Layer Enterprise Risk Audit Cascades.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-horizon-financial-ratio-decomposition": {
    id: "analysis-multi-multi-horizon-financial-ratio-decomposition",
    name: "MultiHorizonFinancialRatioDecompositionSkill",
    displayName: "Multi Horizon Financial Ratio Decomposition",
    categoryId: "analysis",
    description: "Decomposes DuPont return on equity (ROE) across past, current, and projected forward cycles.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Financial Ratio Decomposition",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Financial Ratio Decomposition",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Horizon Financial Ratio Decomposition.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Horizon Financial Ratio Decomposition.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-factor-root-cause-ishikawa-analysis": {
    id: "analysis-multi-multi-factor-root-cause-ishikawa-analysis",
    name: "MultiFactorRootCauseIshikawaAnalysisSkill",
    displayName: "Multi Factor Root Cause Ishikawa Analysis",
    categoryId: "analysis",
    description: "Combines 5-Whys, Fishbone Diagram, and Fault Tree Analysis for deep systemic failure diagnosis.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Root Cause Ishikawa Analysis",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Root Cause Ishikawa Analysis",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Factor Root Cause Ishikawa Analysis.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Factor Root Cause Ishikawa Analysis.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-dimensional-competitive-matrix-benchmarking": {
    id: "analysis-multi-multi-dimensional-competitive-matrix-benchmarking",
    name: "MultiDimensionalCompetitiveMatrixBenchmarkingSkill",
    displayName: "Multi Dimensional Competitive Matrix Benchmarking",
    categoryId: "analysis",
    description: "Evaluates competitors across pricing, feature set, UX, market share, and technical moat.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Dimensional Competitive Matrix Benchmarking",
      ruSectionName: "Композитный Multi-Skill: Multi Dimensional Competitive Matrix Benchmarking",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Dimensional Competitive Matrix Benchmarking.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Dimensional Competitive Matrix Benchmarking.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-method-sentiment-nuance-disambiguation": {
    id: "analysis-multi-multi-method-sentiment-nuance-disambiguation",
    name: "MultiMethodSentimentNuanceDisambiguationSkill",
    displayName: "Multi Method Sentiment Nuance Disambiguation",
    categoryId: "analysis",
    description: "Synthesizes VADER, Transformer sentiment scoring, and qualitative tone inspection.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Sentiment Nuance Disambiguation",
      ruSectionName: "Композитный Multi-Skill: Multi Method Sentiment Nuance Disambiguation",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Method Sentiment Nuance Disambiguation.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Method Sentiment Nuance Disambiguation.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-scenario-sensitivity-stress-testing": {
    id: "analysis-multi-multi-scenario-sensitivity-stress-testing",
    name: "MultiScenarioSensitivityStressTestingSkill",
    displayName: "Multi Scenario Sensitivity Stress Testing",
    categoryId: "analysis",
    description: "Models base, optimistic, pessimistic, and black-swan stress test parameters on business models.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Scenario Sensitivity Stress Testing",
      ruSectionName: "Композитный Multi-Skill: Multi Scenario Sensitivity Stress Testing",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Scenario Sensitivity Stress Testing.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Scenario Sensitivity Stress Testing.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-level-supply-chain-bottleneck-diagnostic": {
    id: "analysis-multi-multi-level-supply-chain-bottleneck-diagnostic",
    name: "MultiLevelSupplyChainBottleneckDiagnosticSkill",
    displayName: "Multi Level Supply Chain Bottleneck Diagnostic",
    categoryId: "analysis",
    description: "Traces raw material, Tier-1/2 suppliers, logistics hubs, and retail endpoint bottlenecks.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Supply Chain Bottleneck Diagnostic",
      ruSectionName: "Композитный Multi-Skill: Multi Level Supply Chain Bottleneck Diagnostic",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Level Supply Chain Bottleneck Diagnostic.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Level Supply Chain Bottleneck Diagnostic.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-view-customer-churn-cohort-analytics": {
    id: "analysis-multi-multi-view-customer-churn-cohort-analytics",
    name: "MultiViewCustomerChurnCohortAnalyticsSkill",
    displayName: "Multi View Customer Churn Cohort Analytics",
    categoryId: "analysis",
    description: "Analyzes churn by acquisition channel, usage frequency, contract tier, and support ticket history.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi View Customer Churn Cohort Analytics",
      ruSectionName: "Композитный Multi-Skill: Multi View Customer Churn Cohort Analytics",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi View Customer Churn Cohort Analytics.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi View Customer Churn Cohort Analytics.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-attribute-utility-theory-maut-decision-framework": {
    id: "analysis-multi-multi-attribute-utility-theory-maut-decision-framework",
    name: "MultiAttributeUtilityTheoryMAUTDecisionFrameworkSkill",
    displayName: "Multi Attribute Utility Theory MAUT Decision Framework",
    categoryId: "analysis",
    description: "Evaluates complex decisions by weighting trade-offs across multiple non-monetary criteria.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Attribute Utility Theory MAUT Decision Framework",
      ruSectionName: "Композитный Multi-Skill: Multi Attribute Utility Theory MAUT Decision Framework",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Attribute Utility Theory MAUT Decision Framework.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Attribute Utility Theory MAUT Decision Framework.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-stakeholder-value-stream-mapping": {
    id: "analysis-multi-multi-stakeholder-value-stream-mapping",
    name: "MultiStakeholderValueStreamMappingSkill",
    displayName: "Multi Stakeholder Value Stream Mapping",
    categoryId: "analysis",
    description: "Maps value flow and waste across internal teams, external vendors, and end customers.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stakeholder Value Stream Mapping",
      ruSectionName: "Композитный Multi-Skill: Multi Stakeholder Value Stream Mapping",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Stakeholder Value Stream Mapping.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Stakeholder Value Stream Mapping.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-layer-cybersecurity-threat-surface-inspection": {
    id: "analysis-multi-multi-layer-cybersecurity-threat-surface-inspection",
    name: "MultiLayerCybersecurityThreatSurfaceInspectionSkill",
    displayName: "Multi Layer Cybersecurity Threat Surface Inspection",
    categoryId: "analysis",
    description: "Audits network perimeter, cloud IAM, endpoint security, and application vulnerabilities.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Cybersecurity Threat Surface Inspection",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Cybersecurity Threat Surface Inspection",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Layer Cybersecurity Threat Surface Inspection.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Layer Cybersecurity Threat Surface Inspection.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-variable-macroeconomic-trend-triangulation": {
    id: "analysis-multi-multi-variable-macroeconomic-trend-triangulation",
    name: "MultiVariableMacroeconomicTrendTriangulationSkill",
    displayName: "Multi Variable Macroeconomic Trend Triangulation",
    categoryId: "analysis",
    description: "Triangulates GDP growth, inflation, interest rates, and labor data to project industry headwinds.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Variable Macroeconomic Trend Triangulation",
      ruSectionName: "Композитный Multi-Skill: Multi Variable Macroeconomic Trend Triangulation",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Variable Macroeconomic Trend Triangulation.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Variable Macroeconomic Trend Triangulation.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-model-software-performance-bottleneck-profiling": {
    id: "analysis-multi-multi-model-software-performance-bottleneck-profiling",
    name: "MultiModelSoftwarePerformanceBottleneckProfilingSkill",
    displayName: "Multi Model Software Performance Bottleneck Profiling",
    categoryId: "analysis",
    description: "Combines CPU flamegraphs, memory allocation traces, and DB query latency metrics.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Model Software Performance Bottleneck Profiling",
      ruSectionName: "Композитный Multi-Skill: Multi Model Software Performance Bottleneck Profiling",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Model Software Performance Bottleneck Profiling.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Model Software Performance Bottleneck Profiling.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-point-brand-perception-equity-audit": {
    id: "analysis-multi-multi-point-brand-perception-equity-audit",
    name: "MultiPointBrandPerceptionEquityAuditSkill",
    displayName: "Multi Point Brand Perception Equity Audit",
    categoryId: "analysis",
    description: "Measures brand sentiment across social media, press coverage, customer reviews, and surveys.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Point Brand Perception Equity Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Point Brand Perception Equity Audit",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Point Brand Perception Equity Audit.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Point Brand Perception Equity Audit.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-tier-regulatory-compliance-gap-diagnostic": {
    id: "analysis-multi-multi-tier-regulatory-compliance-gap-diagnostic",
    name: "MultiTierRegulatoryComplianceGapDiagnosticSkill",
    displayName: "Multi Tier Regulatory Compliance Gap Diagnostic",
    categoryId: "analysis",
    description: "Audits operations against GDPR, HIPAA, SOC 2, and ISO 27001 requirements simultaneously.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Tier Regulatory Compliance Gap Diagnostic",
      ruSectionName: "Композитный Multi-Skill: Multi Tier Regulatory Compliance Gap Diagnostic",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Tier Regulatory Compliance Gap Diagnostic.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Tier Regulatory Compliance Gap Diagnostic.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-criterion-commercial-real-estate-location-scoring": {
    id: "analysis-multi-multi-criterion-commercial-real-estate-location-scoring",
    name: "MultiCriterionCommercialRealEstateLocationScoringSkill",
    displayName: "Multi Criterion Commercial Real Estate Location Scoring",
    categoryId: "analysis",
    description: "Scores property sites based on foot traffic, demographic income, zoning, and transit access.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Criterion Commercial Real Estate Location Scoring",
      ruSectionName: "Композитный Multi-Skill: Multi Criterion Commercial Real Estate Location Scoring",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Criterion Commercial Real Estate Location Scoring.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Criterion Commercial Real Estate Location Scoring.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-method-usability-heuristic-evaluation": {
    id: "analysis-multi-multi-method-usability-heuristic-evaluation",
    name: "MultiMethodUsabilityHeuristicEvaluationSkill",
    displayName: "Multi Method Usability Heuristic Evaluation",
    categoryId: "analysis",
    description: "Combines Nielsen's 10 Heuristics, System Usability Scale (SUS), and cognitive walkthroughs.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Usability Heuristic Evaluation",
      ruSectionName: "Композитный Multi-Skill: Multi Method Usability Heuristic Evaluation",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Method Usability Heuristic Evaluation.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Method Usability Heuristic Evaluation.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-dimensional-saas-unit-economics-decomposition": {
    id: "analysis-multi-multi-dimensional-saas-unit-economics-decomposition",
    name: "MultiDimensionalSaaSUnitEconomicsDecompositionSkill",
    displayName: "Multi Dimensional SaaS Unit Economics Decomposition",
    categoryId: "analysis",
    description: "Decomposes CAC, LTV, Payback Period, and Expansion ARR across customer segments.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Dimensional SaaS Unit Economics Decomposition",
      ruSectionName: "Композитный Multi-Skill: Multi Dimensional SaaS Unit Economics Decomposition",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Dimensional SaaS Unit Economics Decomposition.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Dimensional SaaS Unit Economics Decomposition.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-stage-product-feature-prioritization-rice-kano": {
    id: "analysis-multi-multi-stage-product-feature-prioritization-rice-kano",
    name: "MultiStageProductFeaturePrioritizationRICEKanoSkill",
    displayName: "Multi Stage Product Feature Prioritization RICE Kano",
    categoryId: "analysis",
    description: "Combines RICE scoring, Kano Model classification, and MoSCoW categorization.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Product Feature Prioritization RICE Kano",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Product Feature Prioritization RICE Kano",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Stage Product Feature Prioritization RICE Kano.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Stage Product Feature Prioritization RICE Kano.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-perspective-geopolitical-risk-assessment": {
    id: "analysis-multi-multi-perspective-geopolitical-risk-assessment",
    name: "MultiPerspectiveGeopoliticalRiskAssessmentSkill",
    displayName: "Multi Perspective Geopolitical Risk Assessment",
    categoryId: "analysis",
    description: "Evaluates trade policy, political stability, currency risk, and regional conflicts.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Geopolitical Risk Assessment",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Geopolitical Risk Assessment",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Perspective Geopolitical Risk Assessment.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Perspective Geopolitical Risk Assessment.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-layer-data-quality-profiling-matrix": {
    id: "analysis-multi-multi-layer-data-quality-profiling-matrix",
    name: "MultiLayerDataQualityProfilingMatrixSkill",
    displayName: "Multi Layer Data Quality Profiling Matrix",
    categoryId: "analysis",
    description: "Audits completeness, accuracy, consistency, timeliness, and uniqueness across datasets.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Data Quality Profiling Matrix",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Data Quality Profiling Matrix",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Layer Data Quality Profiling Matrix.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Layer Data Quality Profiling Matrix.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-factor-employee-attrition-risk-diagnostic": {
    id: "analysis-multi-multi-factor-employee-attrition-risk-diagnostic",
    name: "MultiFactorEmployeeAttritionRiskDiagnosticSkill",
    displayName: "Multi Factor Employee Attrition Risk Diagnostic",
    categoryId: "analysis",
    description: "Analyzes salary benchmark gap, manager score, commute, tenure, and promotion velocity.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Employee Attrition Risk Diagnostic",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Employee Attrition Risk Diagnostic",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Factor Employee Attrition Risk Diagnostic.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Factor Employee Attrition Risk Diagnostic.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-angle-legal-contract-liability-exposure-screener": {
    id: "analysis-multi-multi-angle-legal-contract-liability-exposure-screener",
    name: "MultiAngleLegalContractLiabilityExposureScreenerSkill",
    displayName: "Multi Angle Legal Contract Liability Exposure Screener",
    categoryId: "analysis",
    description: "Audits indemnification caps, termination clauses, IP ownership, and jurisdiction terms.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Angle Legal Contract Liability Exposure Screener",
      ruSectionName: "Композитный Multi-Skill: Multi Angle Legal Contract Liability Exposure Screener",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Angle Legal Contract Liability Exposure Screener.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Angle Legal Contract Liability Exposure Screener.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-dimension-e-commerce-cart-abandonment-audit": {
    id: "analysis-multi-multi-dimension-e-commerce-cart-abandonment-audit",
    name: "MultiDimensionECommerceCartAbandonmentAuditSkill",
    displayName: "Multi Dimension E Commerce Cart Abandonment Audit",
    categoryId: "analysis",
    description: "Inspects checkout friction, unexpected shipping fees, payment gateway errors, and trust cues.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Dimension E Commerce Cart Abandonment Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Dimension E Commerce Cart Abandonment Audit",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Dimension E Commerce Cart Abandonment Audit.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Dimension E Commerce Cart Abandonment Audit.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-criteria-cloud-provider-cost-optimization-audit": {
    id: "analysis-multi-multi-criteria-cloud-provider-cost-optimization-audit",
    name: "MultiCriteriaCloudProviderCostOptimizationAuditSkill",
    displayName: "Multi Criteria Cloud Provider Cost Optimization Audit",
    categoryId: "analysis",
    description: "Evaluates reserved instances, idle resource termination, serverless auto-scaling, and egress costs.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Criteria Cloud Provider Cost Optimization Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Criteria Cloud Provider Cost Optimization Audit",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Criteria Cloud Provider Cost Optimization Audit.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Criteria Cloud Provider Cost Optimization Audit.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-level-educational-curriculum-gap-diagnostic": {
    id: "analysis-multi-multi-level-educational-curriculum-gap-diagnostic",
    name: "MultiLevelEducationalCurriculumGapDiagnosticSkill",
    displayName: "Multi Level Educational Curriculum Gap Diagnostic",
    categoryId: "analysis",
    description: "Maps learning objectives against Bloom's Taxonomy, industry skill demands, and exam benchmarks.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Educational Curriculum Gap Diagnostic",
      ruSectionName: "Композитный Multi-Skill: Multi Level Educational Curriculum Gap Diagnostic",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Level Educational Curriculum Gap Diagnostic.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Level Educational Curriculum Gap Diagnostic.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-layer-m-a-synergies-valuation-audit": {
    id: "analysis-multi-multi-layer-m-a-synergies-valuation-audit",
    name: "MultiLayerMASynergiesValuationAuditSkill",
    displayName: "Multi Layer M A Synergies Valuation Audit",
    categoryId: "analysis",
    description: "Analyzes cost synergies, cross-selling revenue uplift, technology consolidation, and tax credits.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer M A Synergies Valuation Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Layer M A Synergies Valuation Audit",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Layer M A Synergies Valuation Audit.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Layer M A Synergies Valuation Audit.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-factor-renewable-energy-site-feasibility-analysis": {
    id: "analysis-multi-multi-factor-renewable-energy-site-feasibility-analysis",
    name: "MultiFactorRenewableEnergySiteFeasibilityAnalysisSkill",
    displayName: "Multi Factor Renewable Energy Site Feasibility Analysis",
    categoryId: "analysis",
    description: "Evaluates solar irradiance/wind speed, grid interconnection cost, land topography, and zoning.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Renewable Energy Site Feasibility Analysis",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Renewable Energy Site Feasibility Analysis",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Factor Renewable Energy Site Feasibility Analysis.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Factor Renewable Energy Site Feasibility Analysis.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-method-patient-care-quality-outcome-audit": {
    id: "analysis-multi-multi-method-patient-care-quality-outcome-audit",
    name: "MultiMethodPatientCareQualityOutcomeAuditSkill",
    displayName: "Multi Method Patient Care Quality Outcome Audit",
    categoryId: "analysis",
    description: "Combines readmission rates, infection rates, patient satisfaction scores, and mortality risk.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Patient Care Quality Outcome Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Method Patient Care Quality Outcome Audit",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Method Patient Care Quality Outcome Audit.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Method Patient Care Quality Outcome Audit.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-horizon-corporate-capital-allocation-audit": {
    id: "analysis-multi-multi-horizon-corporate-capital-allocation-audit",
    name: "MultiHorizonCorporateCapitalAllocationAuditSkill",
    displayName: "Multi Horizon Corporate Capital Allocation Audit",
    categoryId: "analysis",
    description: "Audits capital deployment across R&D, dividends, share buybacks, CAPEX, and M&A.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Corporate Capital Allocation Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Corporate Capital Allocation Audit",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Horizon Corporate Capital Allocation Audit.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Horizon Corporate Capital Allocation Audit.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-level-logistics-freight-cost-decomposition": {
    id: "analysis-multi-multi-level-logistics-freight-cost-decomposition",
    name: "MultiLevelLogisticsFreightCostDecompositionSkill",
    displayName: "Multi Level Logistics Freight Cost Decomposition",
    categoryId: "analysis",
    description: "Decomposes ocean freight, drayage, customs clearance, demurrage, and last-mile costs.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Logistics Freight Cost Decomposition",
      ruSectionName: "Композитный Multi-Skill: Multi Level Logistics Freight Cost Decomposition",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Level Logistics Freight Cost Decomposition.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Level Logistics Freight Cost Decomposition.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-dimension-api-ecosystem-performance-audit": {
    id: "analysis-multi-multi-dimension-api-ecosystem-performance-audit",
    name: "MultiDimensionAPIEcosystemPerformanceAuditSkill",
    displayName: "Multi Dimension API Ecosystem Performance Audit",
    categoryId: "analysis",
    description: "Audits throughput, p99 latency, error rates, developer onboarding friction, and API limits.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Dimension API Ecosystem Performance Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Dimension API Ecosystem Performance Audit",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Dimension API Ecosystem Performance Audit.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Dimension API Ecosystem Performance Audit.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-view-customer-journey-friction-diagnostics": {
    id: "analysis-multi-multi-view-customer-journey-friction-diagnostics",
    name: "MultiViewCustomerJourneyFrictionDiagnosticsSkill",
    displayName: "Multi View Customer Journey Friction Diagnostics",
    categoryId: "analysis",
    description: "Maps customer frustration signals across onboarding, feature adoption, and support interactions.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi View Customer Journey Friction Diagnostics",
      ruSectionName: "Композитный Multi-Skill: Multi View Customer Journey Friction Diagnostics",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi View Customer Journey Friction Diagnostics.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi View Customer Journey Friction Diagnostics.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-factor-urban-traffic-congestion-diagnostic": {
    id: "analysis-multi-multi-factor-urban-traffic-congestion-diagnostic",
    name: "MultiFactorUrbanTrafficCongestionDiagnosticSkill",
    displayName: "Multi Factor Urban Traffic Congestion Diagnostic",
    categoryId: "analysis",
    description: "Analyzes signal timing, bottleneck bottlenecks, accident hotspots, and public transit overlap.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Urban Traffic Congestion Diagnostic",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Urban Traffic Congestion Diagnostic",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Factor Urban Traffic Congestion Diagnostic.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Factor Urban Traffic Congestion Diagnostic.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-angle-venture-capital-portfolio-risk-concentration": {
    id: "analysis-multi-multi-angle-venture-capital-portfolio-risk-concentration",
    name: "MultiAngleVentureCapitalPortfolioRiskConcentrationSkill",
    displayName: "Multi Angle Venture Capital Portfolio Risk Concentration",
    categoryId: "analysis",
    description: "Evaluates sector exposure, stage concentration, follow-on reserve adequacy, and runway.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Angle Venture Capital Portfolio Risk Concentration",
      ruSectionName: "Композитный Multi-Skill: Multi Angle Venture Capital Portfolio Risk Concentration",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Angle Venture Capital Portfolio Risk Concentration.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Angle Venture Capital Portfolio Risk Concentration.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-method-media-campaign-roi-attribution": {
    id: "analysis-multi-multi-method-media-campaign-roi-attribution",
    name: "MultiMethodMediaCampaignROIAttributionSkill",
    displayName: "Multi Method Media Campaign ROI Attribution",
    categoryId: "analysis",
    description: "Combines first-touch, last-touch, linear, and marketing mix modeling (MMM) attribution.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Media Campaign ROI Attribution",
      ruSectionName: "Композитный Multi-Skill: Multi Method Media Campaign ROI Attribution",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Method Media Campaign ROI Attribution.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Method Media Campaign ROI Attribution.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-layer-sustainable-esg-impact-metric-diagnostic": {
    id: "analysis-multi-multi-layer-sustainable-esg-impact-metric-diagnostic",
    name: "MultiLayerSustainableESGImpactMetricDiagnosticSkill",
    displayName: "Multi Layer Sustainable ESG Impact Metric Diagnostic",
    categoryId: "analysis",
    description: "Audits carbon footprint (Scopes 1-3), diversity equity metrics, and board governance rules.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Sustainable ESG Impact Metric Diagnostic",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Sustainable ESG Impact Metric Diagnostic",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Layer Sustainable ESG Impact Metric Diagnostic.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Layer Sustainable ESG Impact Metric Diagnostic.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-perspective-scientific-paper-methodology-audit": {
    id: "analysis-multi-multi-perspective-scientific-paper-methodology-audit",
    name: "MultiPerspectiveScientificPaperMethodologyAuditSkill",
    displayName: "Multi Perspective Scientific Paper Methodology Audit",
    categoryId: "analysis",
    description: "Audits statistical power, sample bias, replicability hazards, and data availability.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Scientific Paper Methodology Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Scientific Paper Methodology Audit",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Perspective Scientific Paper Methodology Audit.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Perspective Scientific Paper Methodology Audit.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-criteria-software-vendor-selection-evaluation": {
    id: "analysis-multi-multi-criteria-software-vendor-selection-evaluation",
    name: "MultiCriteriaSoftwareVendorSelectionEvaluationSkill",
    displayName: "Multi Criteria Software Vendor Selection Evaluation",
    categoryId: "analysis",
    description: "Scores vendors on security compliance, SLA uptime, pricing structure, and API extensibility.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Criteria Software Vendor Selection Evaluation",
      ruSectionName: "Композитный Multi-Skill: Multi Criteria Software Vendor Selection Evaluation",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Criteria Software Vendor Selection Evaluation.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Criteria Software Vendor Selection Evaluation.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-layer-warehouse-storage-space-utilization": {
    id: "analysis-multi-multi-layer-warehouse-storage-space-utilization",
    name: "MultiLayerWarehouseStorageSpaceUtilizationSkill",
    displayName: "Multi Layer Warehouse Storage Space Utilization",
    categoryId: "analysis",
    description: "Inspects rack height efficiency, aisle slotting optimization, and fast/slow-moving SKU placement.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Warehouse Storage Space Utilization",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Warehouse Storage Space Utilization",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Layer Warehouse Storage Space Utilization.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Layer Warehouse Storage Space Utilization.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-dimension-mobile-app-crash-rate-diagnostics": {
    id: "analysis-multi-multi-dimension-mobile-app-crash-rate-diagnostics",
    name: "MultiDimensionMobileAppCrashRateDiagnosticsSkill",
    displayName: "Multi Dimension Mobile App Crash Rate Diagnostics",
    categoryId: "analysis",
    description: "Correlates crashes by OS version, device model, memory threshold, and user action sequence.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Dimension Mobile App Crash Rate Diagnostics",
      ruSectionName: "Композитный Multi-Skill: Multi Dimension Mobile App Crash Rate Diagnostics",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Dimension Mobile App Crash Rate Diagnostics.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Dimension Mobile App Crash Rate Diagnostics.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-horizon-talent-pipeline-workforce-planning": {
    id: "analysis-multi-multi-horizon-talent-pipeline-workforce-planning",
    name: "MultiHorizonTalentPipelineWorkforcePlanningSkill",
    displayName: "Multi Horizon Talent Pipeline Workforce Planning",
    categoryId: "analysis",
    description: "Projects hiring needs, retirement rates, skill gap shifts, and internal promotion velocity.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Talent Pipeline Workforce Planning",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Talent Pipeline Workforce Planning",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Horizon Talent Pipeline Workforce Planning.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Horizon Talent Pipeline Workforce Planning.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-angle-hotel-occupancy-revenue-yield-diagnostics": {
    id: "analysis-multi-multi-angle-hotel-occupancy-revenue-yield-diagnostics",
    name: "MultiAngleHotelOccupancyRevenueYieldDiagnosticsSkill",
    displayName: "Multi Angle Hotel Occupancy Revenue Yield Diagnostics",
    categoryId: "analysis",
    description: "Analyzes RevPAR, ADR, booking window lead times, and OTA commission leaks.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Angle Hotel Occupancy Revenue Yield Diagnostics",
      ruSectionName: "Композитный Multi-Skill: Multi Angle Hotel Occupancy Revenue Yield Diagnostics",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Angle Hotel Occupancy Revenue Yield Diagnostics.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Angle Hotel Occupancy Revenue Yield Diagnostics.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-method-retail-inventory-shrinkage-loss-audit": {
    id: "analysis-multi-multi-method-retail-inventory-shrinkage-loss-audit",
    name: "MultiMethodRetailInventoryShrinkageLossAuditSkill",
    displayName: "Multi Method Retail Inventory Shrinkage Loss Audit",
    categoryId: "analysis",
    description: "Audits shoplifting data, employee theft vectors, vendor short-shipments, and POS errors.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Retail Inventory Shrinkage Loss Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Method Retail Inventory Shrinkage Loss Audit",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Method Retail Inventory Shrinkage Loss Audit.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Method Retail Inventory Shrinkage Loss Audit.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-layer-telecommunications-network-coverage-diagnostic": {
    id: "analysis-multi-multi-layer-telecommunications-network-coverage-diagnostic",
    name: "MultiLayerTelecommunicationsNetworkCoverageDiagnosticSkill",
    displayName: "Multi Layer Telecommunications Network Coverage Diagnostic",
    categoryId: "analysis",
    description: "Evaluates signal dead zones, tower handoff drop rates, bandwidth throttling, and latency.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Telecommunications Network Coverage Diagnostic",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Telecommunications Network Coverage Diagnostic",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Layer Telecommunications Network Coverage Diagnostic.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Layer Telecommunications Network Coverage Diagnostic.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-dimension-food-beverage-menu-profitability-matrix": {
    id: "analysis-multi-multi-dimension-food-beverage-menu-profitability-matrix",
    name: "MultiDimensionFoodBeverageMenuProfitabilityMatrixSkill",
    displayName: "Multi Dimension Food Beverage Menu Profitability Matrix",
    categoryId: "analysis",
    description: "Combines Menu Engineering matrix (Plowhorses, Stars, Dogs, Puzzles) with ingredient inflation.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Dimension Food Beverage Menu Profitability Matrix",
      ruSectionName: "Композитный Multi-Skill: Multi Dimension Food Beverage Menu Profitability Matrix",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Dimension Food Beverage Menu Profitability Matrix.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Dimension Food Beverage Menu Profitability Matrix.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-factor-agricultural-yield-disruption-screener": {
    id: "analysis-multi-multi-factor-agricultural-yield-disruption-screener",
    name: "MultiFactorAgriculturalYieldDisruptionScreenerSkill",
    displayName: "Multi Factor Agricultural Yield Disruption Screener",
    categoryId: "analysis",
    description: "Evaluates soil nitrogen levels, drought indices, pest pressure, and fertilizer cost spikes.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Agricultural Yield Disruption Screener",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Agricultural Yield Disruption Screener",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Factor Agricultural Yield Disruption Screener.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Factor Agricultural Yield Disruption Screener.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-level-airport-passenger-terminal-flow-bottleneck": {
    id: "analysis-multi-multi-level-airport-passenger-terminal-flow-bottleneck",
    name: "MultiLevelAirportPassengerTerminalFlowBottleneckSkill",
    displayName: "Multi Level Airport Passenger Terminal Flow Bottleneck",
    categoryId: "analysis",
    description: "Inspects security queue times, baggage handling latency, and gate boarding throughput.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Airport Passenger Terminal Flow Bottleneck",
      ruSectionName: "Композитный Multi-Skill: Multi Level Airport Passenger Terminal Flow Bottleneck",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Level Airport Passenger Terminal Flow Bottleneck.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Level Airport Passenger Terminal Flow Bottleneck.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-criterion-renewable-energy-storage-battery-audit": {
    id: "analysis-multi-multi-criterion-renewable-energy-storage-battery-audit",
    name: "MultiCriterionRenewableEnergyStorageBatteryAuditSkill",
    displayName: "Multi Criterion Renewable Energy Storage Battery Audit",
    categoryId: "analysis",
    description: "Evaluates cycle degradation, thermal runaway risk, round-trip efficiency, and recycling value.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Criterion Renewable Energy Storage Battery Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Criterion Renewable Energy Storage Battery Audit",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Criterion Renewable Energy Storage Battery Audit.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Criterion Renewable Energy Storage Battery Audit.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-horizon-intellectual-property-portfolio-valuation": {
    id: "analysis-multi-multi-horizon-intellectual-property-portfolio-valuation",
    name: "MultiHorizonIntellectualPropertyPortfolioValuationSkill",
    displayName: "Multi Horizon Intellectual Property Portfolio Valuation",
    categoryId: "analysis",
    description: "Evaluates patent remaining lifespan, citation impact, litigation history, and licensing potential.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Intellectual Property Portfolio Valuation",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Intellectual Property Portfolio Valuation",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Horizon Intellectual Property Portfolio Valuation.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Horizon Intellectual Property Portfolio Valuation.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-layer-medical-device-biocompatibility-audit": {
    id: "analysis-multi-multi-layer-medical-device-biocompatibility-audit",
    name: "MultiLayerMedicalDeviceBiocompatibilityAuditSkill",
    displayName: "Multi Layer Medical Device Biocompatibility Audit",
    categoryId: "analysis",
    description: "Audits material toxicity, extractables/leachables, sterilization validation, and ISO 10993.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Medical Device Biocompatibility Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Medical Device Biocompatibility Audit",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Layer Medical Device Biocompatibility Audit.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Layer Medical Device Biocompatibility Audit.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-dimension-high-frequency-trading-slippage-audit": {
    id: "analysis-multi-multi-dimension-high-frequency-trading-slippage-audit",
    name: "MultiDimensionHighFrequencyTradingSlippageAuditSkill",
    displayName: "Multi Dimension High Frequency Trading Slippage Audit",
    categoryId: "analysis",
    description: "Analyzes order routing delay, market impact cost, venue toxicity, and dark pool execution.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Dimension High Frequency Trading Slippage Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Dimension High Frequency Trading Slippage Audit",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Dimension High Frequency Trading Slippage Audit.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Dimension High Frequency Trading Slippage Audit.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-point-e-learning-course-completion-rate-audit": {
    id: "analysis-multi-multi-point-e-learning-course-completion-rate-audit",
    name: "MultiPointELearningCourseCompletionRateAuditSkill",
    displayName: "Multi Point E Learning Course Completion Rate Audit",
    categoryId: "analysis",
    description: "Inspects video drop-off points, quiz failure spikes, discussion forum activity, and module length.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Point E Learning Course Completion Rate Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Point E Learning Course Completion Rate Audit",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Point E Learning Course Completion Rate Audit.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Point E Learning Course Completion Rate Audit.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-factor-mining-quarry-reserve-extraction-audit": {
    id: "analysis-multi-multi-factor-mining-quarry-reserve-extraction-audit",
    name: "MultiFactorMiningQuarryReserveExtractionAuditSkill",
    displayName: "Multi Factor Mining Quarry Reserve Extraction Audit",
    categoryId: "analysis",
    description: "Evaluates ore grade distribution, overburden ratio, processing recovery rate, and reclamation costs.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Mining Quarry Reserve Extraction Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Mining Quarry Reserve Extraction Audit",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Factor Mining Quarry Reserve Extraction Audit.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Factor Mining Quarry Reserve Extraction Audit.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-method-pharmaceutical-drug-adherence-diagnostic": {
    id: "analysis-multi-multi-method-pharmaceutical-drug-adherence-diagnostic",
    name: "MultiMethodPharmaceuticalDrugAdherenceDiagnosticSkill",
    displayName: "Multi Method Pharmaceutical Drug Adherence Diagnostic",
    categoryId: "analysis",
    description: "Analyzes prescription refill frequency, patient side-effect surveys, and pill-count metrics.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Pharmaceutical Drug Adherence Diagnostic",
      ruSectionName: "Композитный Multi-Skill: Multi Method Pharmaceutical Drug Adherence Diagnostic",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Method Pharmaceutical Drug Adherence Diagnostic.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Method Pharmaceutical Drug Adherence Diagnostic.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-layer-commercial-airline-fleet-maintenance-diagnostics": {
    id: "analysis-multi-multi-layer-commercial-airline-fleet-maintenance-diagnostics",
    name: "MultiLayerCommercialAirlineFleetMaintenanceDiagnosticsSkill",
    displayName: "Multi Layer Commercial Airline Fleet Maintenance Diagnostics",
    categoryId: "analysis",
    description: "Inspects engine flight hours, mandatory AD compliance, unscheduled maintenance spikes, and parts stock.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Commercial Airline Fleet Maintenance Diagnostics",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Commercial Airline Fleet Maintenance Diagnostics",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Layer Commercial Airline Fleet Maintenance Diagnostics.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Layer Commercial Airline Fleet Maintenance Diagnostics.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-dimension-municipal-water-quality-contaminant-screener": {
    id: "analysis-multi-multi-dimension-municipal-water-quality-contaminant-screener",
    name: "MultiDimensionMunicipalWaterQualityContaminantScreenerSkill",
    displayName: "Multi Dimension Municipal Water Quality Contaminant Screener",
    categoryId: "analysis",
    description: "Audits heavy metals, PFAS, bacterial levels, turbidity, and pipe corrosion indices.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Dimension Municipal Water Quality Contaminant Screener",
      ruSectionName: "Композитный Multi-Skill: Multi Dimension Municipal Water Quality Contaminant Screener",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Dimension Municipal Water Quality Contaminant Screener.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Dimension Municipal Water Quality Contaminant Screener.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-point-saas-lead-scoring-qualification-matrix": {
    id: "analysis-multi-multi-point-saas-lead-scoring-qualification-matrix",
    name: "MultiPointSaaSLeadScoringQualificationMatrixSkill",
    displayName: "Multi Point SaaS Lead Scoring Qualification Matrix",
    categoryId: "analysis",
    description: "Scores lead intent signals, firmographic fit, website behavior, and product product-qualified signals.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Point SaaS Lead Scoring Qualification Matrix",
      ruSectionName: "Композитный Multi-Skill: Multi Point SaaS Lead Scoring Qualification Matrix",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Point SaaS Lead Scoring Qualification Matrix.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Point SaaS Lead Scoring Qualification Matrix.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },

  "analysis-multi-multi-perspective-master-analytical-diagnostics-engine": {
    id: "analysis-multi-multi-perspective-master-analytical-diagnostics-engine",
    name: "MultiPerspectiveMasterAnalyticalDiagnosticsEngineSkill",
    displayName: "Multi Perspective Master Analytical Diagnostics Engine",
    categoryId: "analysis",
    description: "Enforces master multi-dimensional qualitative, quantitative, and systemic analytical synthesis.",
    tags: ["analysis","multi-skill","analysis-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Master Analytical Diagnostics Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Master Analytical Diagnostics Engine",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Perspective Master Analytical Diagnostics Engine.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Perspective Master Analytical Diagnostics Engine.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["analysis","multi-skill","analysis-multi"],
    }),
  },
};
