import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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
};
