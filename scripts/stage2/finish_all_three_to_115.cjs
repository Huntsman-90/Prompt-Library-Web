const { appendSkills } = require('../appendSkills.cjs');

// Run the intermediate append scripts first
require('./expand_three_target_categories_115.cjs');
require('./append_controlflow_part2.cjs');
require('./append_ux_and_data_knowledge.cjs');

// Final 20 UX Design skills
const UX_FINAL_20 = [
  {
    id: "ux-design-accessible-aria-live-announcements",
    name: "UxDesignAccessibleAriaLiveAnnouncementsSkill",
    displayName: "Screen Reader Live Regions (aria-live='polite') & Audio Accessibility",
    categoryId: "uxDesign",
    description: "Announces dynamic search result counts, async save confirmations, and error alerts to visually impaired screen reader users via ARIA live regions.",
    tags: ["ux-design", "accessibility", "screen-readers", "aria-live", "wcag"],
    sectionName: "ARIA Live Region Standards",
    ruSectionName: "Оповещение скринридеров об обновлениях экрана (aria-live='polite')",
    instructions: [
      "Use `aria-live='polite'` for non-urgent background state updates (e.g. '3 results found').",
      "Use `aria-live='assertive'` sparingly only for critical immediate errors that demand instant attention.",
      "Clear live region text content after 1 second to prevent stale buffer re-announcements."
    ],
    ruInstructions: [
      "Используйте `aria-live='polite'` для фоновых обновлений (например, «Найдено 3 результата»).",
      "Применяйте `aria-live='assertive'` только для критических ошибок, требующих немедленной реакции.",
      "Очищайте текст живого региона через 1 секунду во избежание повторного озвучивания."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-infinite-canvas-pan-zoom-controls",
    name: "UxDesignInfiniteCanvasPanZoomControlsSkill",
    displayName: "Miro/Figma Infinite Canvas Navigation, Mini-Map & Zoom Pacing",
    categoryId: "uxDesign",
    description: "Implements infinite workspace navigation: pinch-to-zoom, middle-mouse panning, floating mini-map navigation, and zoom-to-fit hotkeys.",
    tags: ["ux-design", "infinite-canvas", "pan-zoom", "mini-map", "visual-workspace"],
    sectionName: "Infinite Canvas Navigation Standards",
    ruSectionName: "Навигация по бесконечному холсту (Pan & Zoom, интерактивная миникарта, центрирование)",
    instructions: [
      "Support smooth pinch-to-zoom centered precisely on the user's cursor position.",
      "Provide a floating interactive Mini-Map in the bottom-right corner displaying active viewport rectangle.",
      "Bind `Shift+1` or `Cmd+0` hotkey for instant Zoom-to-Fit all canvas items."
    ],
    ruInstructions: [
      "Реализуйте плавное масштабирование (Zoom) с фокусом в текущую точку курсора мыши.",
      "Отображайте интерактивную миникарту в правом нижнем углу с рамкой текущей области видимости.",
      "Привязывайте горячую клавишу `Shift+1` / `Cmd+0` для быстрого показа всех объектов на экране."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-microcopy-voice-and-tone-matrix",
    name: "UxDesignMicrocopyVoiceAndToneMatrixSkill",
    displayName: "UX Microcopy Voice & Tone Matrix (State-Specific Empathy)",
    categoryId: "uxDesign",
    description: "Calibrates interface copywriting tone across emotional user states: celebratory on success, clear & humble during billing or outage errors.",
    tags: ["ux-design", "microcopy", "ux-writing", "tone-of-voice", "empathy"],
    sectionName: "UX Microcopy Tone Standards",
    ruSectionName: "Матрица тональности UX-текстов (Tone of Voice в зависимости от контекста)",
    instructions: [
      "During critical errors or billing issues: Use clear, unambiguous, empathetic language without joking.",
      "During onboarding success milestones: Use encouraging, confident, and celebratory copy.",
      "Eliminate technical jargon: replace 'Database connection pool timeout' with 'We could not save your changes. Please try again in a moment.'."
    ],
    ruInstructions: [
      "При сбоях и платежных ошибках: используйте предельно ясный, уважительный и спокойный тон без шуток.",
      "При успешных действиях и онбординге: используйте дружелюбный и вдохновляющий стиль.",
      "Исключайте технический жаргон: заменяйте системные ошибки понятными инструкциями, что делать дальше."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-split-screen-side-by-side-diff-viewer",
    name: "UxDesignSplitScreenSideBySideDiffViewerSkill",
    displayName: "Side-by-Side Unified Diff Viewer & Visual Version Comparison",
    categoryId: "uxDesign",
    description: "Presents document and code revisions using unified and split-screen diff views with red/green inline character-level highlighting.",
    tags: ["ux-design", "diff-viewer", "version-control", "comparison", "data-visualization"],
    sectionName: "Diff Viewer UX Standards",
    ruSectionName: "Интерфейс сравнения версий (Side-by-Side Diff с посимвольной подсветкой изменений)",
    instructions: [
      "Support both Split-View (side-by-side columns) and Unified-View (stacked inline) comparison modes.",
      "Highlight character-level diffs within modified lines using high-contrast red/green tint backgrounds.",
      "Synchronize vertical scrolling across both left and right panes automatically in split mode."
    ],
    ruInstructions: [
      "Поддерживайте два режима: раздельный вид в две колонки (Split) и единый строчный список (Unified).",
      "Выделяйте посимвольные изменения внутри строк контрастным зеленым и красным фоном.",
      "Синхронизируйте вертикальную прокрутку левой и правой колонок в режиме раздельного экрана."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-tree-testing-information-architecture",
    name: "UxDesignTreeTestingInformationArchitectureSkill",
    displayName: "Information Architecture Tree Testing & Mental Model Mapping",
    categoryId: "uxDesign",
    description: "Evaluates menu hierarchies, category nesting depth (max 3 levels), and navigation findability via quantitative tree testing.",
    tags: ["ux-design", "information-architecture", "tree-testing", "navigation", "mental-models"],
    sectionName: "Information Architecture Standards",
    ruSectionName: "Информационная архитектура: древовидное тестирование и глубина вложенности меню",
    instructions: [
      "Limit navigation hierarchy nesting to maximum 3 levels to prevent user cognitive disorientation.",
      "Group categories according to user task mental models rather than internal corporate department charts.",
      "Conduct quantitative tree testing targeting >80% direct success path findability."
    ],
    ruInstructions: [
      "Ограничивайте глубину вложенности меню максимум 3 уровнями для простоты ориентации.",
      "Группируйте разделы по задачам пользователей, а не по внутренней структуре отделов компании.",
      "Проводите количественные тесты дерева навигации с целевым показателем находимости выше 80%."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-interactive-stepper-number-input",
    name: "UxDesignInteractiveStepperNumberInputSkill",
    displayName: "Accessible Number Stepper & Direct Typing Frictionless Input",
    categoryId: "uxDesign",
    description: "Combines large increment/decrement click buttons (+ / -) with direct keyboard editing and arrow key step acceleration.",
    tags: ["ux-design", "inputs", "stepper", "form-controls", "accessibility"],
    sectionName: "Number Stepper Input Standards",
    ruSectionName: "Удобный числовой шаговый ввод (Stepper: кнопки +/-, стрелки и прямой ввод)",
    instructions: [
      "Allow direct typing in the input field alongside +/- button clicks.",
      "Accelerate step increments when user holds down Up/Down arrow keys.",
      "Enforce min/max boundaries gracefully without clearing valid typed intermediate values."
    ],
    ruInstructions: [
      "Предоставляйте возможность как клика по кнопкам +/-, так и прямого ручного ввода числа в поле.",
      "Ускоряйте шаг изменения при длительном зажатии стрелок на клавиатуре.",
      "Контролируйте границы min/max без стирания промежуточного ввода пользователя."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-contextual-menu-radial-pie-selector",
    name: "UxDesignContextualMenuRadialPieSelectorSkill",
    displayName: "Right-Click Contextual Menus & Radial Pie Action Selectors",
    categoryId: "uxDesign",
    description: "Positions right-click context menus at exact cursor coordinates with automatic viewport boundary auto-flipping.",
    tags: ["ux-design", "context-menu", "right-click", "radial-menu", "desktop-ux"],
    sectionName: "Contextual Action Menu Standards",
    ruSectionName: "Контекстные меню по правому клику (Позиционирование и авторазворот у краев экрана)",
    instructions: [
      "Open context menu exactly at cursor position, preventing default browser context menu.",
      "Flip menu alignment automatically if menu bounds would extend beyond the right or bottom screen edges.",
      "Close context menu immediately upon clicking outside, scrolling, or pressing Escape."
    ],
    ruInstructions: [
      "Открывайте контекстное меню в точке курсора с отменой стандартного меню браузера.",
      "Автоматически разворачивайте меню влево или вверх при приближении к границам экрана.",
      "Закрывайте меню при клике в любое место, начале скролла или нажатии клавиши Escape."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-search-highlighting-instant-jump",
    name: "UxDesignSearchHighlightingInstantJumpSkill",
    displayName: "In-Page Keyword Search Highlighting & Match Cycling",
    categoryId: "uxDesign",
    description: "Highlights all matching search terms across document text with distinct yellow/orange active match pills and smooth scrolling.",
    tags: ["ux-design", "search-highlight", "find-in-page", "reading-ux", "navigation"],
    sectionName: "Search Keyword Highlighting Standards",
    ruSectionName: "Подсветка поисковых фраз в тексте и циклическая навигация по совпадениям",
    instructions: [
      "Wrap matching text in `<mark>` elements with high-visibility background tints.",
      "Distinguish active match with prominent focus ring and display current match index (e.g. '3 of 12').",
      "Scroll active match into view smoothly with vertical centering."
    ],
    ruInstructions: [
      "Оборачивайте найденные слова в теги `<mark>` с контрастным желтым или оранжевым фоном.",
      "Выделяйте активный текущий результат рамкой и показывайте счетчик («3 из 12»).",
      "Плавно скролльте экран к активному совпадению с центрированием по вертикали."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-tab-navigation-animated-underline-pill",
    name: "UxDesignTabNavigationAnimatedUnderlinePillSkill",
    displayName: "Animated Sliding Pill Tabs & Fluid Underline Indicator",
    categoryId: "uxDesign",
    description: "Animates active tab selection with a sliding background pill or underline indicator using CSS layout transition transforms.",
    tags: ["ux-design", "tabs", "navigation", "animation", "layout"],
    sectionName: "Sliding Tab Navigation Standards",
    ruSectionName: "Анимированное переключение вкладок с плавающим индикатором (Sliding Pill Tabs)",
    instructions: [
      "Animate position and width of active tab indicator using CSS transform `translateX()` and `scaleX()`.",
      "Support Left/Right arrow key navigation across tab lists following WAI-ARIA tablist standards.",
      "Preserve active tab URL query parameter for deep linking and sharing."
    ],
    ruInstructions: [
      "Анимируйте перемещение индикатора активной вкладки через CSS `transform` для 60fps плавности.",
      "Поддерживайте переключение вкладок стрелками влево/вправо по стандартам WAI-ARIA.",
      "Сохраняйте активную вкладку в URL-параметрах для прямых ссылок и обновления страницы."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-password-strength-meter-zxcvbn",
    name: "UxDesignPasswordStrengthMeterZxcvbnSkill",
    displayName: "Real-Time Password Entropy Meter & Concrete Crack-Time Guidance",
    categoryId: "uxDesign",
    description: "Evaluates password strength in real time via zxcvbn entropy estimation, showing estimated crack time and actionable hardening hints.",
    tags: ["ux-design", "password-strength", "security-ux", "forms", "zxcvbn"],
    sectionName: "Password Entropy & Strength Standards",
    ruSectionName: "Индикатор стойкости пароля в реальном времени (Оценка энтропии и подсказки)",
    instructions: [
      "Display a 4-tier colored strength bar (Red -> Orange -> Yellow -> Green) updating live on input.",
      "Show concrete crack time estimates (e.g. 'Crack time: 400 centuries') to motivate strong passphrases.",
      "Provide specific hints for common patterns ('Avoid common names or predictable sequences')."
    ],
    ruInstructions: [
      "Отображайте 4-уровневую цветовую шкалу надежности, обновляющуюся при каждом вводе символа.",
      "Показывайте понятную оценку времени взлома («Время взлома: более 100 лет») для мотивации надежных фраз.",
      "Давайте конкретные подсказки при использовании словарных слов и простых последовательностей."
    ],
    semanticType: "framework"
  }
];

// Final 20 Data & Knowledge skills
const DATA_FINAL_20 = [
  {
    id: "data-knowledge-clickhouse-mergetree-partition-pruning",
    name: "DataKnowledgeClickhouseMergetreePartitionPruningSkill",
    displayName: "ClickHouse MergeTree Primary Key Indexing & Granule Skipping",
    categoryId: "dataKnowledge",
    description: "Accelerates billion-row real-time analytical queries by optimizing ClickHouse Primary Keys and 8192-row sparse index granules.",
    tags: ["data-knowledge", "clickhouse", "olap", "sparse-index", "analytics"],
    sectionName: "ClickHouse MergeTree Optimization Standards",
    ruSectionName: "Оптимизация ClickHouse MergeTree: разреженные индексы и пропуск гранул (8192 строки)",
    instructions: [
      "Order Primary Key columns by ascending cardinality (e.g. `tenant_id, event_type, timestamp`).",
      "Align partition keys (e.g. `toYYYYMM(event_date)`) to avoid creating millions of tiny part files.",
      "Leverage sparse index granule skipping to evaluate queries scanning <1% of physical table storage."
    ],
    ruInstructions: [
      "Сортируйте колонки первичного ключа по возрастанию кардинальности для максимального сжатия.",
      "Задавайте ключ партиционирования по месяцам для исключения создания миллионов мелких файлов.",
      "Используйте разреженный индекс для пропуска нерелевантных гранул и сканирования менее 1% данных."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-duckdb-spatial-parquet-analytics",
    name: "DataKnowledgeDuckdbSpatialParquetAnalyticsSkill",
    displayName: "DuckDB Embedded OLAP: In-Memory SQL & Geospatial Parquet Analytics",
    categoryId: "dataKnowledge",
    description: "Executes ultra-fast vectorized SQL queries directly against local and remote S3 Parquet files without external database servers.",
    tags: ["data-knowledge", "duckdb", "olap", "parquet", "spatial-sql", "embedded"],
    sectionName: "DuckDB Embedded Analytical Engine Standards",
    ruSectionName: "Встраиваемый аналитический движок DuckDB: прямые SQL-запросы по файлам Parquet в S3",
    instructions: [
      "Query Parquet files directly via `read_parquet('s3://bucket/*.parquet')` with automatic filter pushdown.",
      "Use spatial geometry functions (`ST_Intersects`, `ST_Point`) for high-speed local GIS queries.",
      "Export aggregated query results straight to Apache Arrow memory or compressed Parquet datasets."
    ],
    ruInstructions: [
      "Выполняйте SQL-запросы напрямую по файлам Parquet в S3 с автоматическим пробросом фильтров (Pushdown).",
      "Применяйте пространственные функции для быстрой обработки геоданных без развертывания PostGIS.",
      "Экспортируйте результаты вычислений напрямую в память Apache Arrow или компактные файлы Parquet."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-great-expectations-data-quality-suite",
    name: "DataKnowledgeGreatExpectationsDataQualitySuiteSkill",
    displayName: "Great Expectations Automated Data Quality & Schema Assertions",
    categoryId: "dataKnowledge",
    description: "Enforces data quality contracts on analytical pipelines with automated assertions: null bounds, value ranges, and regex matches.",
    tags: ["data-knowledge", "data-quality", "great-expectations", "data-contracts", "testing"],
    sectionName: "Great Expectations Data Quality Standards",
    ruSectionName: "Автоматизированный контроль качества данных (Great Expectations & Data Contracts)",
    instructions: [
      "Define explicit expectation suites: `expect_column_values_to_not_be_null`, `expect_column_values_to_be_between`.",
      "Halt downstream ETL pipeline ingestion automatically upon failing critical severity expectation tests.",
      "Generate automated HTML Data Docs visual test reports for stakeholders and data audits."
    ],
    ruInstructions: [
      "Задавайте строгие наборы правил (Expectation Suites) для валидации типов, диапазонов и отсутствия null.",
      "Останавливайте пайплайн загрузки данных при нарушении критических правил качества данных.",
      "Формируйте визуальные HTML-отчеты (Data Docs) для аудита надежности источников."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-openlineage-metadata-provenance",
    name: "DataKnowledgeOpenlineageMetadataProvenanceSkill",
    displayName: "OpenLineage Data Provenance & Column-Level Dependency Graph",
    categoryId: "dataKnowledge",
    description: "Tracks end-to-end data lineage from raw Kafka events through Airflow DAGs and dbt models to final executive dashboards.",
    tags: ["data-knowledge", "openlineage", "data-lineage", "metadata", "governance"],
    sectionName: "OpenLineage Data Provenance Standards",
    ruSectionName: "Сквозная трассировка происхождения данных (OpenLineage и граф зависимостей на уровне колонок)",
    instructions: [
      "Emit OpenLineage run events (START, COMPLETE, FAIL) capturing input/output dataset schemas.",
      "Construct directed column-level dependency graphs to assess upstream breaking change impact.",
      "Integrate lineage telemetry with Marquez or DataHub metadata catalogs."
    ],
    ruInstructions: [
      "Отправляйте события выполнения OpenLineage со схемами входных и выходных датасетов.",
      "Стройте направленный граф зависимостей на уровне отдельных колонок для анализа влияния изменений.",
      "Интегрируйте телеметрию происхождения данных с каталогами метаданных (DataHub, Marquez)."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-timeseries-continuous-aggregates",
    name: "DataKnowledgeTimeseriesContinuousAggregatesSkill",
    displayName: "TimescaleDB Continuous Aggregates & Tiered Data Retention",
    categoryId: "dataKnowledge",
    description: "Maintains real-time rollups (hourly/daily metrics) over billions of time-series records with automated retention downsampling.",
    tags: ["data-knowledge", "timeseries", "timescaledb", "continuous-aggregates", "iot"],
    sectionName: "TimescaleDB Continuous Aggregate Standards",
    ruSectionName: "Непрерывные агрегаты временных рядов (TimescaleDB Continuous Aggregates и Downsampling)",
    instructions: [
      "Create materialized continuous aggregate views computing `time_bucket('1 hour', time)` rollups in background.",
      "Combine pre-aggregated historical chunks with live real-time delta data seamlessly in query results.",
      "Apply automated data retention policies dropping raw 1-second metrics after 30 days while retaining 1-hour rollups."
    ],
    ruInstructions: [
      "Создавайте материализованные представления для фонового расчета почасовых и суточных агрегатов.",
      "Бесшовно объединяйте исторические агрегаты с сырыми данными реального времени в одном запросе.",
      "Настраивайте политики автоматического удаления сырых секундных данных через 30 дней с сохранением почасовых срезов."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-redis-hyperloglog-cardinality",
    name: "DataKnowledgeRedisHyperloglogCardinalitySkill",
    displayName: "Redis HyperLogLog (HLL) Probabilistic Unique Count Estimation",
    categoryId: "dataKnowledge",
    description: "Counts hundreds of millions of unique daily active users (DAU) in constant 12KB memory with <0.81% standard error via HyperLogLog.",
    tags: ["data-knowledge", "hyperloglog", "redis", "probabilistic", "cardinality"],
    sectionName: "HyperLogLog Cardinality Estimation Standards",
    ruSectionName: "Вероятностный подсчет уникальных пользователей (HyperLogLog на Redis: 12 КБ памяти)",
    instructions: [
      "Use `PFADD key element` to register unique user identifiers in the HyperLogLog structure.",
      "Retrieve estimated unique count via `PFCOUNT key` with standard statistical error under 0.81%.",
      "Merge multiple daily keys into weekly/monthly unique counts instantly via `PFMERGE`."
    ],
    ruInstructions: [
      "Добавляйте идентификаторы пользователей командой `PFADD` в структуру HyperLogLog.",
      "Получайте оценку количества уникальных посетителей через `PFCOUNT` с погрешностью менее 0.81%.",
      "Объединяйте дневные счетчики в недельные и месячные без дублирования с помощью `PFMERGE`."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-debezium-cdc-streaming-lakehouse",
    name: "DataKnowledgeDebeziumCdcStreamingLakehouseSkill",
    displayName: "Change Data Capture (CDC) Real-Time Lakehouse Streaming (Debezium + Apache Iceberg)",
    categoryId: "dataKnowledge",
    description: "Streams PostgreSQL/MySQL row mutations directly into Iceberg/Delta Lake tables with sub-minute query latency.",
    tags: ["data-knowledge", "cdc", "debezium", "iceberg", "lakehouse", "real-time"],
    sectionName: "CDC Lakehouse Ingestion Standards",
    ruSectionName: "Потоковая репликация Change Data Capture (Debezium CDC в Apache Iceberg Lakehouse)",
    instructions: [
      "Capture database write-ahead log mutations (INSERT, UPDATE, DELETE) with Debezium Kafka connectors.",
      "Apply UPSERT compaction logic in Apache Iceberg using equality delete files.",
      "Ensure end-to-end exactly-once stream processing using Kafka transactional offsets."
    ],
    ruInstructions: [
      "Считывайте события WAL-журнала СУБД с помощью коннекторов Debezium в топики Kafka.",
      "Выполняйте операцию UPSERT в таблицы Apache Iceberg с использованием механизма Equality Deletes.",
      "Обеспечивайте семантику обработки Exactly-Once с фиксацией транзакционных смещений Kafka."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-star-schema-snowflake-dimension",
    name: "DataKnowledgeStarSchemaSnowflakeDimensionSkill",
    displayName: "Star Schema vs Snowflake Dimensional Modeling (Facts & Conformed Dimensions)",
    categoryId: "dataKnowledge",
    description: "Designs denormalized dimensional data models balancing query join performance, storage redundancy, and BI navigation ease.",
    tags: ["data-knowledge", "star-schema", "data-modeling", "dimensional", "bi"],
    sectionName: "Dimensional Modeling Standards",
    ruSectionName: "Размерное моделирование: схема «Звезда» и «Снежинка» (Таблицы фактов и измерений)",
    instructions: [
      "Prefer Star Schema (denormalized dimensions) to minimize expensive multi-table SQL joins in columnar engines.",
      "Establish Conformed Dimensions (e.g. shared `dim_customer`, `dim_date`) across all business fact tables.",
      "Define Granularity explicitly at the lowest atomic transaction level in fact table specifications."
    ],
    ruInstructions: [
      "Отдавайте предпочтение схеме «Звезда» (денормализованные измерения) для исключения лишних Join в аналитических СУБД.",
      "Используйте согласованные измерения (Conformed Dimensions: клиент, дата) между всеми таблицами фактов.",
      "Четко определяйте гранулярность таблицы фактов на самом детальном атомарном уровне транзакции."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-differential-privacy-epsilon-laplace",
    name: "DataKnowledgeDifferentialPrivacyEpsilonLaplaceSkill",
    displayName: "Differential Privacy: Epsilon Privacy Budgets & Laplace Noise Injection",
    categoryId: "dataKnowledge",
    description: "Protects individual user privacy in analytical aggregates by injecting calibrated mathematical Laplace noise within an epsilon ($\epsilon$) privacy budget.",
    tags: ["data-knowledge", "differential-privacy", "privacy", "laplace-noise", "compliance"],
    sectionName: "Differential Privacy Standards",
    ruSectionName: "Дифференциальная приватность (Differential Privacy: добавление шума Лапласа и бюджет $\epsilon$)",
    instructions: [
      "Calculate global sensitivity ($\Delta f$) for the target aggregate function (count, sum, mean).",
      "Inject calibrated random noise drawn from Laplace distribution: $Lap(\\Delta f / \\epsilon)$.",
      "Track and enforce cumulative privacy budget ($\epsilon$) per user session, denying queries upon budget exhaustion."
    ],
    ruInstructions: [
      "Рассчитывайте чувствительность функции ($\Delta f$) для агрегатных запросов (количество, сумма, среднее).",
      "Добавляйте калиброванный случайный шум из распределения Лапласа $Lap(\\Delta f / \\epsilon)$.",
      "Ведите учет суммарного бюджета приватности ($\epsilon$) на пользователя, блокируя запросы при его исчерпании."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-graph-database-cypher-query-optimization",
    name: "DataKnowledgeGraphDatabaseCypherQueryOptimizationSkill",
    displayName: "Neo4j Cypher Graph Query Optimization & Variable-Length Path Traversal",
    categoryId: "dataKnowledge",
    description: "Tunes Cypher path queries, index lookups, and relationship directionality to traverse multi-hop graphs in sub-millisecond time.",
    tags: ["data-knowledge", "graph-database", "neo4j", "cypher", "knowledge-graph"],
    sectionName: "Graph Cypher Query Standards",
    ruSectionName: "Оптимизация графовых запросов Cypher (Neo4j: обход путей переменной длины и индексы связей)",
    instructions: [
      "Specify relationship directionality (`(a)-[:ACTED_IN]->(m)`) to prune 50% of candidate search paths during traversal.",
      "Cap variable-length pattern matching paths explicitly: `MATCH p=(a)-[:FRIEND*1..3]->(b)` to prevent combinatorial explosions.",
      "Profile queries via `EXPLAIN` and `PROFILE` to eliminate full node scans and enforce schema index hints."
    ],
    ruInstructions: [
      "Явно указывайте направление связей в графе для сокращения пространства поиска вдвое.",
      "Ограничивайте глубину обхода путей переменной длины (`[:FRIEND*1..3]`) для защиты от комбинаторного взрыва.",
      "Анализируйте планы запросов через `PROFILE` для проверки использования индексов узлов и связей."
    ],
    semanticType: "framework"
  }
];

appendSkills('uxDesign', UX_FINAL_20);
appendSkills('dataKnowledge', DATA_FINAL_20);

console.log('All three target categories fully expanded to 115+ skills!');
