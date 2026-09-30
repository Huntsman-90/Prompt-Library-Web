import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const DATA_KNOWLEDGE_SKILLS: Record<string, SkillDefinition> = {
  'sql-query-architecture': {
    id: 'sql-query-architecture',
    name: 'SqlQueryArchitectureSkill',
    displayName: 'Advanced SQL Query & CTE Architecture',
    categoryId: 'data_knowledge',
    description: 'Writes production-grade SQL with Common Table Expressions (CTEs), window functions (ROW_NUMBER, LAG, LEAD), and partition pruning.',
    tags: ['data_knowledge', 'sql', 'cte', 'window-functions', 'queries', 'database'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Архитектура SQL Запросов и Оконные Функции',
        'Advanced SQL Query Architecture & Window Functions',
        [
          '- **Модульные CTE**: Разбивать сложную логику на именованные блоки `WITH ... AS (...)` с говорящими именами.',
          '- **Оконные функции**: Использовать `OVER (PARTITION BY ... ORDER BY ...)` для расчета скользящих средних, рангов и дельт (LAG/LEAD).',
          '- **Оптимизация производительности**: Избегать `SELECT *`, использовать предикаты по индексированным колонкам и партициям.',
        ],
        [
          '- **Modular Common Table Expressions**: Decompose complex aggregations into readable, indexed `WITH cte AS (...)` pipeline blocks.',
          '- **Analytic Window Functions**: Leverage `OVER (PARTITION BY ... ORDER BY ...)` for running totals, moving averages, and lag/lead deltas.',
          '- **Partition Pruning**: Enforce partition key filters in `WHERE` clauses and eliminate wildcard column selections.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'schema-modeling-3nf-star': {
    id: 'schema-modeling-3nf-star',
    name: 'SchemaModeling3nfStarSkill',
    displayName: '3NF Relational & Star Schema Modeling',
    categoryId: 'data_knowledge',
    description: 'Designs Third Normal Form (3NF) relational OLTP databases and dimensional Star/Snowflake schemas for OLAP warehouses.',
    tags: ['data_knowledge', 'schema', '3nf', 'star-schema', 'olap', 'oltp', 'data-warehouse'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Моделирование Схем Данных (3NF vs Star Schema)',
        'Data Schema Modeling Specification (3NF & Dimensional Star)',
        [
          '- **OLTP (3-я Нормальная Форма)**: Устранить транзитивные зависимости; гарантировать целостность через Foreign Keys.',
          '- **OLAP (Звезда / Снежинка)**: Выделить таблицу фактов (Facts) с числовыми метриками и таблицы измерений (Dimensions) со суррогатными ключами.',
          '- **Медленно меняющиеся измерения (SCD)**: Предусмотреть стратегию версионирования данных (SCD Type 2 с `valid_from` и `valid_to`).',
        ],
        [
          '- **OLTP Normalization (3NF)**: Eliminate transitive dependencies, enforcing strict referential integrity across relational keys.',
          '- **OLAP Dimensional Model (Star Schema)**: Architect dense numeric Fact tables surrounded by denormalized Dimension tables with surrogate keys.',
          '- **Slowly Changing Dimensions (SCD Type 2)**: Incorporate temporal validity windows (`effective_start_date`, `effective_end_date`, `is_current`).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'etl-pipeline-dag': {
    id: 'etl-pipeline-dag',
    name: 'EtlPipelineDagSkill',
    displayName: 'ETL/ELT Data Pipeline & Lineage DAG',
    categoryId: 'data_knowledge',
    description: 'Constructs resilient Airflow/dbt ETL DAGs with idempotent staging, data lineage tracking, and backfill capabilities.',
    tags: ['data_knowledge', 'etl', 'elt', 'airflow', 'dbt', 'pipeline', 'dag', 'data-engineering'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Конвейеры Данных и Data Lineage (Airflow / dbt DAG)',
        'ETL/ELT Data Pipeline & Lineage DAG Architecture',
        [
          '- **Идемпотентность запусков**: Любой шаг пайплайна должен давать идентичный результат при повторном запуске за тот же период.',
          '- **Стейджинг и очистка**: Загрузка сырых данных в `stg_` таблицы перед трансформацией в витрины данных.',
          '- **Отслеживание происхождения (Data Lineage)**: Документировать путь данных от источника до финального дашборда.',
        ],
        [
          '- **Idempotent Ingestion**: Design transformations to guarantee zero duplicate records during historical backfills and retries.',
          '- **Staging & Curated Layers**: Enforce clear separation between raw staging models, intermediate transforms, and final consumption marts.',
          '- **Data Lineage Manifest**: Document graph lineage and dependency DAG contracts from ingestion raw data down to executive dashboards.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'statistical-hypothesis-testing': {
    id: 'statistical-hypothesis-testing',
    name: 'StatisticalHypothesisTestingSkill',
    displayName: 'Rigorous Statistical Hypothesis Testing',
    categoryId: 'data_knowledge',
    description: 'Designs statistical tests (Student\'s t-test, Mann-Whitney U, Chi-Square, ANOVA) calculating p-values and confidence intervals.',
    tags: ['data_knowledge', 'statistics', 'hypothesis-testing', 'p-value', 'a-b-testing', 'math'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Статистическая Проверка Гипотез (Hypothesis Testing)',
        'Statistical Hypothesis Testing & Power Analysis',
        [
          '- **Формулирование гипотез**: Четко задать нулевую гипотезу ($H_0$) и альтернативную гипотезу ($H_1$).',
          '- **Выбор статистического теста**: Обосновать выбор (параметрический t-test при нормальном распределении vs непараметрический Mann-Whitney U).',
          '- **Статистическая мощность и p-value**: Задать уровень значимости $\\alpha = 0.05$ и мощность $1 - \\beta = 0.80$ для предотвращения ошибок 1 и 2 рода.',
        ],
        [
          '- **Hypothesis Formulation**: Formulate null ($H_0$) and alternative ($H_1$) hypotheses with directional validation.',
          '- **Test Selection Rationale**: Justify statistical test (Two-Sample t-Test under normality vs. Mann-Whitney U for skewed metrics).',
          '- **Power & Sample Sizing**: Calibrate significance threshold $\\alpha = 0.05$ and statistical power $1 - \\beta = 0.80$ against Type I/II errors.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'taxonomy-ontology-graph': {
    id: 'taxonomy-ontology-graph',
    name: 'TaxonomyOntologyGraphSkill',
    displayName: 'Formal Knowledge Graph & Ontology Design',
    categoryId: 'data_knowledge',
    description: 'Designs formal knowledge graph ontologies, entity relations (RDF/OWL triples), and controlled domain taxonomies.',
    tags: ['data_knowledge', 'ontology', 'taxonomy', 'knowledge-graph', 'rdf', 'owl', 'semantics'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Спецификация Онтологии и Графа Знаний',
        'Knowledge Graph & Semantic Ontology Specification',
        [
          '- **Сущности и свойства**: Описать классы сущностей (`Class`), их атрибуты (`Property`) и допустимые типы значений.',
          '- **Семантические триплеты**: Сформулировать связи в формате триплетов: `[Subject] -> [Predicate / Relationship] -> [Object]`.',
          '- **Иерархия таксономии**: Построить дерево категорий с отношениями `is-a` и `part-of`.',
        ],
        [
          '- **Entity Classes & Properties**: Define formal entity classes, scalar properties, and cardinality constraints.',
          '- **Semantic Triples**: Specify directed relationships formatted as canonical `[Subject] -> [Predicate] -> [Object]` triples.',
          '- **Taxonomic Hierarchy**: Construct hierarchical classification schemas enforcing strict `is-a` and `part-of` inheritance rules.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'rag-chunking-retrieval': {
    id: 'rag-chunking-retrieval',
    name: 'RagChunkingRetrievalSkill',
    displayName: 'RAG Chunking Strategy & Hybrid Retrieval',
    categoryId: 'data_knowledge',
    description: 'Optimizes RAG pipelines: semantic chunking with overlap, dense/sparse hybrid search (BM25 + Vector), and cross-encoder re-ranking.',
    tags: ['data_knowledge', 'rag', 'chunking', 'embeddings', 'retrieval', 'hybrid-search', 're-ranking'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Стратегия Чанкинга и Поиска RAG (Hybrid Search)',
        'RAG Chunking Strategy & Hybrid Retrieval Architecture',
        [
          '- **Семантический чанкинг**: Разбивать документы по логическим разделам с перекрытием (например, 512 токенов с overlap 64 токена).',
          '- **Гибридный поиск (BM25 + Dense)**: Комбинировать полнотекстовый поиск по ключевым словам и семантический векторный поиск.',
          '- **Кросс-энкодер реранкинг (Re-ranking)**: Пропускать топ-20 результатов через Re-ranker модель для отбора топ-5 наиболее релевантных чанков.',
        ],
        [
          '- **Semantic Chunking**: Segment corpora into coherent chunks with overlap windows (e.g. 512 tokens with 64-token overlap).',
          '- **Hybrid Search Fusion**: Combine sparse keyword matching (BM25) with dense vector cosine similarity via Reciprocal Rank Fusion (RRF).',
          '- **Cross-Encoder Re-Ranking**: Score candidate top-20 chunks through a specialized re-ranking model to filter the top-5 high-signal passages.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'data-quality-sla-great-expectations': {
    id: 'data-quality-sla-great-expectations',
    name: 'DataQualitySlaGreatExpectationsSkill',
    displayName: 'Automated Data Quality & SLA Testing',
    categoryId: 'data_knowledge',
    description: 'Defines automated data validation assertions (null rates, uniqueness, schema drifts, outlier bounds) to guard data lakes.',
    tags: ['data_knowledge', 'data-quality', 'sla', 'validation', 'testing', 'assertions'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Автоматический Контроль Качества Данных (Data Quality SLA)',
        'Automated Data Quality Assertions & SLA Suite',
        [
          '- **Проверка инвариантов (Assertions)**: 1) `expect_column_values_to_not_be_null`, 2) `expect_column_values_to_be_unique`, 3) `expect_column_values_to_be_between(min, max)`.',
          '- **Детекция дрейфа схемы (Schema Drift)**: Автоматически блокировать пайплайн при несанкционированном изменении типов полей.',
          '- **Алертинг и изоляция**: При сбое проверки качества изолировать сбойный батч и отправлять алерт инженерам данных.',
        ],
        [
          '- **Core Quality Assertions**: Define tests: non-nullability, uniqueness, foreign key validity, and numeric distribution bounds.',
          '- **Schema Drift Interception**: Halt downstream ingestion upon unannounced column removals or data type mutations.',
          '- **Quarantine & Alerting**: Route non-compliant data batches to staging quarantine and trigger immediate PagerDuty alerts.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'feature-engineering-matrix': {
    id: 'feature-engineering-matrix',
    name: 'FeatureEngineeringMatrixSkill',
    displayName: 'ML Feature Engineering & Transformation Matrix',
    categoryId: 'data_knowledge',
    description: 'Engineers high-signal machine learning features: numerical scaling, categorical encoding, target embeddings, and rolling aggregates.',
    tags: ['data_knowledge', 'feature-engineering', 'ml', 'transformations', 'embeddings', 'data-science'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Матрица Генерации Признаков (Feature Engineering)',
        'Feature Engineering & Transformation Specification Matrix',
        [
          '- **Числовые трансформации**: Логарифмирование для скошенных распределений, масштабирование (StandardScaler, RobustScaler).',
          '- **Категориальное кодирование**: One-Hot Encoding для малой мощности, Target Encoding или Embeddings для высокой мощности категорий.',
          '- **Временные оконные агрегаты**: Расчет скользящих метрик за 7, 30 и 90 дней (Rolling Mean, Rolling Std).',
        ],
        [
          '- **Numeric Transformations**: Log transforms for heavy-tailed distributions, standardizing via RobustScaler to mitigate outlier distortions.',
          '- **Categorical Encoding Strategy**: One-Hot Encoding for low-cardinality keys; CatBoost/Target Encoding for high-cardinality features.',
          '- **Temporal Rolling Windows**: Construct rolling historical metrics across 7, 30, and 90-day aggregation horizons.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'time-series-decomposition': {
    id: 'time-series-decomposition',
    name: 'TimeSeriesDecompositionSkill',
    displayName: 'Time-Series Decomposition & Forecasting',
    categoryId: 'data_knowledge',
    description: 'Decomposes temporal data into Trend, Seasonality, and Residual components, identifying cyclical patterns and anomalies.',
    tags: ['data_knowledge', 'time-series', 'forecasting', 'seasonality', 'trend', 'analytics'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Декомпозиция Временных Рядов (Trend & Seasonality)',
        'Time-Series Decomposition & Anomaly Isolation Protocol',
        [
          '- **Разделение компонент**: Разложить ряд на $Y(t) = Trend(t) + Seasonal(t) + Residual(t)$ (аддитивная или мультипликативная модель).',
          '- **Анализ сезонности**: Выявить циклические паттерны (дневная, недельная, квартальная сезонность).',
          '- **Детекция аномалий в остатках**: Найти выбросы в остаточном шуме (Residuals), превышающие 3 стандартных отклонения ($3\\sigma$).',
        ],
        [
          '- **Additive/Multiplicative Decomposition**: Deconstruct raw series into $Y(t) = Trend(t) + Seasonality(t) + \\epsilon(t)$.',
          '- **Cyclic Seasonality Profiling**: Isolate diurnal, weekly, and annual seasonality harmonics.',
          '- **Residual Outlier Detection**: Flag statistical anomalies in residual white-noise components exceeding $3\\sigma$ thresholds.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'data-lakehouse-medallion': {
    id: 'data-lakehouse-medallion',
    name: 'DataLakehouseMedallionSkill',
    displayName: 'Medallion Lakehouse (Bronze-Silver-Gold)',
    categoryId: 'data_knowledge',
    description: 'Structures data lakehouses into Bronze (Raw append-only), Silver (Enriched/Cleaned), and Gold (Business-level aggregated) tiers.',
    tags: ['data_knowledge', 'lakehouse', 'medallion', 'bronze-silver-gold', 'delta-lake', 'parquet'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Архитектура Озера Данных (Medallion Lakehouse)',
        'Medallion Lakehouse Architecture (Bronze — Silver — Gold)',
        [
          '- **Bronze Layer (Сырые данные)**: Неизменяемый журнал сырых событий в формате Parquet/Delta с сохранением исходной структуры.',
          '- **Silver Layer (Очищенные данные)**: Очищенные, дедуплицированные и типизированные таблицы с валидацией схемы.',
          '- **Gold Layer (Бизнес-витрины)**: Агрегированные витрины данных, оптимизированные для аналитики и BI-дашбордов.',
        ],
        [
          '- **Bronze Tier (Raw Ingestion)**: Immutable append-only raw telemetry and change data capture (CDC) logs in Delta/Parquet.',
          '- **Silver Tier (Enriched & Conformed)**: Cleaned, deduplicated, schema-validated tables with standardized keys and timestamps.',
          '- **Gold Tier (Business Marts)**: Aggregated, dimensional analytical marts optimized for sub-second BI dashboard querying.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'entity-resolution-dedup': {
    id: 'entity-resolution-dedup',
    name: 'EntityResolutionDedupSkill',
    displayName: 'Entity Resolution & Record Deduplication',
    categoryId: 'data_knowledge',
    description: 'Resolves duplicate customer/entity records using deterministic rules, fuzzy string matching (Jaro-Winkler, Levenshtein), and phonetic algorithms.',
    tags: ['data_knowledge', 'entity-resolution', 'deduplication', 'fuzzy-matching', 'jaro-winkler', 'data-cleaning'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Разрешение Сущностей и Дедупликация (Entity Resolution)',
        'Entity Resolution & Fuzzy Deduplication Protocol',
        [
          '- **Блокировка (Blocking Keys)**: Группировать кандидатов по надежным полям (первые 3 буквы фамилии + почтовый индекс) для снижения числа сравнений.',
          '- **Нечеткое сопоставление (Fuzzy Scoring)**: Рассчитывать сходство строк через алгоритмы Jaro-Winkler и Levenshtein Distance (порог > 0.88).',
          '- **Слияние записей (Golden Record)**: Определить правила формирования эталонной записи при объединении дубликатов.',
        ],
        [
          '- **Blocking Heuristics**: Partition candidate record pairs using deterministic blocking keys to bound quadratic comparison explosion.',
          '- **Fuzzy Matching Distance**: Score string similarity using Jaro-Winkler and Levenshtein metrics (matching threshold > 0.88).',
          '- **Golden Record Consolidation**: Define deterministic survivorship rules to merge redundant records into a single canonical entity.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'stream-processing-watermark': {
    id: 'stream-processing-watermark',
    name: 'StreamProcessingWatermarkSkill',
    displayName: 'Event Stream Windowing & Watermark Architecture',
    categoryId: 'data_knowledge',
    description: 'Architects real-time streaming pipelines (Kafka/Flink) with Tumbling, Sliding, and Session windows and late-arriving event watermarks.',
    tags: ['data_knowledge', 'streaming', 'kafka', 'flink', 'watermarks', 'event-time', 'windows'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Потоковая Обработка Данных и Водяные Знаки (Stream Watermarking)',
        'Event Stream Windowing & Watermark Architecture Protocol',
        [
          '- **Event Time vs. Processing Time**: Производить все агрегации строго по времени возникновения события (`event_timestamp`).',
          '- **Водяные знаки (Watermarks)**: Задать допустимую задержку для опоздавших событий (например, Watermark = MaxEventTime - 10 секунд).',
          '- **Типы окон**: Четко специфицировать тип окна: Tumbling (фиксированные интервалы), Sliding (скользящие) или Session (окна сессий).',
        ],
        [
          '- **Event Time Semantics**: Execute stream aggregations strictly anchored to source event timestamps, never processing wall-clock time.',
          '- **Bounded Out-of-Order Watermarks**: Calibrate watermarking heuristics to accommodate late-arriving records (e.g. Watermark = MaxTimestamp - 10s).',
          '- **Windowing Mechanics**: Specify exact window semantics (Fixed Tumbling, Overlapping Sliding, or Inactivity-Triggered Session windows).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'vector-index-hnsw-tuning': {
    id: 'vector-index-hnsw-tuning',
    name: 'VectorIndexHnswTuningSkill',
    displayName: 'Vector Database & HNSW Index Tuning',
    categoryId: 'data_knowledge',
    description: 'Calibrates vector databases (pgvector, Pinecone, Qdrant): HNSW parameters (M, efConstruction, efSearch), distance metrics, and quantization.',
    tags: ['data_knowledge', 'vector-db', 'hnsw', 'embeddings', 'similarity-search', 'pgvector'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Калибровка Векторного Индекса HNSW (Vector DB Tuning)',
        'Vector Database HNSW Index Tuning Specification',
        [
          '- **Метрика расстояния**: Выбрать Cosine Similarity для нормализованных векторов или Inner Product (Dot Product) для максимальной производительности.',
          '- **Параметры графа HNSW**: Настроить `M` (16–64 связей на узел) и `efConstruction` (128–512) для баланса скорости построения и точности (Recall).',
          '- **Квантование векторов**: Применить скалярное (SQ8) или продуктовое (PQ) квантование для сжатия памяти RAM в 4 раза.',
        ],
        [
          '- **Distance Metric Selection**: Calibrate Cosine Similarity for normalized embeddings or Dot Product for high-throughput arithmetic acceleration.',
          '- **HNSW Graph Hyperparameters**: Tune `M` (16-64 edges per node) and `efConstruction` (128-512) to optimize recall vs. build latency trade-offs.',
          '- **Vector Quantization**: Deploy Scalar Quantization (SQ8) or Product Quantization (PQ) to reduce in-memory RAM footprint by 4x.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'data-governance-catalog': {
    id: 'data-governance-catalog',
    name: 'DataGovernanceCatalogSkill',
    displayName: 'Data Governance, Lineage & Compliance Catalog',
    categoryId: 'data_knowledge',
    description: 'Establishes data governance: automated metadata tagging, PII classification, data retention policies, and GDPR deletion workflows.',
    tags: ['data_knowledge', 'governance', 'gdpr', 'lineage', 'compliance', 'metadata', 'catalog'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'constraints',
        'Корпоративное Управление Данными (Data Governance & GDPR)',
        'Data Governance, Lineage & Compliance Standards',
        [
          '- **Классификация чувствительности**: Маркировать каждое поле тегами `Confidential`, `Internal`, `Public` или `Restricted (PII)`.',
          '- **Политики хранения (Retention)**: Задать срок жизни данных (Data TTL) с автоматическим архивированием или удалением через N дней.',
          '- **Процедура удаления по GDPR (Right to be Forgotten)**: Обеспечить каскадное удаление персональных данных во всех зависимых базах и кэшах.',
        ],
        [
          '- **Data Sensitivity Classification**: Tag every column with governance classifications: `Public`, `Internal`, `Confidential`, `Restricted-PII`.',
          '- **Automated Retention Lifecycle**: Enforce automated TTL purge policies moving cold historical records to cold storage before deletion.',
          '- **GDPR Right-to-Erasure Workflow**: Implement cascading deletion protocols across persistence, search indexes, and cache layers.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

'change-data-capture-debezium': {
    id: 'change-data-capture-debezium',
    name: 'ChangeDataCaptureDebeziumSkill',
    displayName: 'Change Data Capture (CDC) & Debezium Streaming',
    categoryId: 'data_knowledge',
    description: 'Captures database row-level mutations via transaction log tailing (WAL) and streams them to Kafka topics without polling.',
    tags: ['data_knowledge', 'cdc', 'debezium', 'kafka', 'streaming', 'database'],
    transform: createStandardSkillTransform(
      'protocol',
      'Захват Изменений Данных (Change Data Capture / Debezium)',
      'Change Data Capture (CDC) & Debezium Streaming Architecture',
      [
        '- **Чтение журнала транзакций (WAL / Binlog)**: Извлекать события вставок, обновлений и удалений без создания нагрузки на БД запросами SELECT.',
        '- **Контракт события Debezium**: Форматировать сообщения с блоками `before`, `after`, `source` (ts_ms, lsn) и операцией `op` (c, u, d).',
        '- **Гарантия порядка**: Секционировать топики Kafka по первичному ключу таблицы для строгой очередности событий одной записи.',
      ],
      [
        '- **Transaction Log Tailing (WAL/Binlog)**: Stream row-level mutations directly from database write-ahead logs with zero query overhead.',
        '- **Debezium Event Envelope**: Format payloads featuring explicit `before`, `after`, `source` metadata (ts_ms, lsn), and `op` enum.',
        '- **Keyed Partition Ordering**: Partition destination Kafka topics strictly by table primary key to guarantee in-order message delivery.',
      ]
    ),
  },

  'slowly-changing-dimensions-scd2': {
    id: 'slowly-changing-dimensions-scd2',
    name: 'SlowlyChangingDimensionsScd2Skill',
    displayName: 'Slowly Changing Dimensions (SCD Type 2) Modeling',
    categoryId: 'data_knowledge',
    description: 'Models historical dimension changes using SCD Type 2 with `valid_from`, `valid_to`, `is_current`, and surrogate keys.',
    tags: ['data_knowledge', 'data-warehouse', 'scd2', 'dimensional-modeling', 'sql', 'analytics'],
    transform: createStandardSkillTransform(
      'protocol',
      'Моделирование Исторических Данных (SCD Type 2 Dimension)',
      'Slowly Changing Dimensions (SCD Type 2) Architecture',
      [
        '- **Суррогатный первичный ключ**: Использовать синтетический ключ `dim_key` вместо естественного бизнес-ключа для уникальности каждой версии.',
        '- **Временные метки версий**: Добавить колонки `valid_from` (TIMESTAMP), `valid_to` (TIMESTAMP, default \'9999-12-31\') и `is_current` (BOOLEAN).',
        '- **Атомарное закрытие старой версии**: При изменении атрибута закрывать текущую строку (`is_current = false, valid_to = now()`) и вставлять новую.',
      ],
      [
        '- **Synthetic Surrogate Key**: Decouple natural business keys from unique historical rows using dedicated surrogate dimension keys.',
        '- **Temporal Tracking Columns**: Maintain `valid_from` (timestamp), `valid_to` (timestamp with infinity fallback), and boolean `is_current`.',
        '- **Atomic Version Rollover**: On attribute mutation, expire active row (`is_current = false, valid_to = now()`) and insert new version atomically.',
      ]
    ),
  },

  'apache-iceberg-table-format': {
    id: 'apache-iceberg-table-format',
    name: 'ApacheIcebergTableFormatSkill',
    displayName: 'Apache Iceberg Open Lakehouse Table Format',
    categoryId: 'data_knowledge',
    description: 'Designs modern Lakehouse storage on Apache Iceberg with hidden partitioning, schema evolution, and time-travel snapshot queries.',
    tags: ['data_knowledge', 'iceberg', 'lakehouse', 'parquet', 'data-engineering', 'storage'],
    transform: createStandardSkillTransform(
      'protocol',
      'Формат Таблиц Apache Iceberg (Modern Lakehouse Storage)',
      'Apache Iceberg Open Lakehouse Table Architecture',
      [
        '- **Скрытое секционирование (Hidden Partitioning)**: Партиционировать по датам или бакетам без необходимости пользователям указывать партиции в WHERE.',
        '- **Эволюция схем без переписывания**: Добавление, переименование и удаление колонок без изменения физических файлов Parquet.',
        '- **Time Travel и Snapshots**: Поддержка запросов к историческим слепкам данных: `SELECT * FROM table FOR SYSTEM_TIME AS OF \'2026-09-01\'`.',
      ],
      [
        '- **Hidden Partitioning Discipline**: Partition by identity, hour, or bucket transforms eliminating explicit partition column predicate requirements.',
        '- **In-Place Schema Evolution**: Add, rename, drop, or reorder table columns without physically rewriting immutable underlying Parquet files.',
        '- **Snapshot Time Travel**: Enable historical point-in-time auditing queries via `FOR SYSTEM_TIME AS OF` or snapshot ID specifications.',
      ]
    ),
  },

  'dbt-semantic-layer-metrics': {
    id: 'dbt-semantic-layer-metrics',
    name: 'DbtSemanticLayerMetricsSkill',
    displayName: 'dbt Semantic Layer & MetricFlow Definitions',
    categoryId: 'data_knowledge',
    description: 'Defines standardized enterprise metrics in dbt with measures, dimensions, granular time-grains, and cumulative windows.',
    tags: ['data_knowledge', 'dbt', 'semantic-layer', 'metricflow', 'bi', 'metrics'],
    transform: createStandardSkillTransform(
      'output_format',
      'Спецификация dbt Semantic Layer (MetricFlow YAML)',
      'dbt Semantic Layer & MetricFlow Definition Architecture',
      [
        '- **Семантическая модель**: Описать сущности `entities`, физические измерения `dimensions` и агрегируемые меры `measures` в YAML.',
        '- **Определение метрик**: Создать метрики `metrics` (simple, derived, cumulative) с привязкой к мерам и временным окнам.',
        '- **Единый источник правды**: Гарантировать, что метрика «Revenue» или «Active Users» вычисляется одинаково во всех BI-системах.',
      ],
      [
        '- **Semantic Model YAML**: Declare semantic entities, categorical dimensions, and additive aggregations (measures) in dbt YAML contracts.',
        '- **Standardized Metric Types**: Define simple, ratio, derived, and cumulative rolling metrics with explicit grain definitions.',
        '- **Single Truth Source**: Eliminate conflicting metric calculations across Tableau, Looker, and downstream operational pipelines.',
      ]
    ),
  },

  'graph-database-cypher-query': {
    id: 'graph-database-cypher-query',
    name: 'GraphDatabaseCypherQuerySkill',
    displayName: 'Property Graph Modeling & Neo4j Cypher Queries',
    categoryId: 'data_knowledge',
    description: 'Models highly connected networks as Property Graphs with labeled nodes, directed relationships, properties, and Cypher queries.',
    tags: ['data_knowledge', 'graph', 'neo4j', 'cypher', 'knowledge-graph', 'network-analysis'],
    transform: createStandardSkillTransform(
      'protocol',
      'Моделирование Графов Знаний и Запросы Cypher (Neo4j)',
      'Property Graph Modeling & Neo4j Cypher Query Architecture',
      [
        '- **Узлы и ребра**: Описать сущности как узлы с метками `:User`, `:Company` и направленные связи `[:WORKS_AT { since: 2024 }]`.',
        '- **Шаблоны Cypher**: Использовать декларативный синтаксис `MATCH (u:User)-[:OWNS]->(a:Account) WHERE a.balance > 1000 RETURN u`.',
        '- **Оптимизация обхода графа**: Создавать индексы по свойствам узлов и ограничивать глубину обхода `*1..3` во избежание комбинаторного взрыва.',
      ],
      [
        '- **Property Graph Schema**: Model real-world networks into typed nodes (`:Entity`) and directed relationships (`-[:RELATION]->`) with properties.',
        '- **Declarative Cypher Matching**: Structure queries using graph pattern matching (`MATCH (a)-[:LINK]->(b) WHERE b.active RETURN a`).',
        '- **Traversal Path Bounding**: Anchor node lookup indices and constrain traversal depths (`*1..3`) to avoid exponential graph explosions.',
      ]
    ),
  },

  'columnar-storage-parquet-tuning': {
    id: 'columnar-storage-parquet-tuning',
    name: 'ColumnarStorageParquetTuningSkill',
    displayName: 'Apache Parquet Columnar Storage Tuning',
    categoryId: 'data_knowledge',
    description: 'Optimizes Parquet layouts: row group sizes (128-512MB), dictionary encoding, ZSTD/Snappy compression, and column pruning.',
    tags: ['data_knowledge', 'parquet', 'columnar', 'performance', 'data-lake', 'compression'],
    transform: createStandardSkillTransform(
      'protocol',
      'Оптимизация Колоночного Хранения Apache Parquet',
      'Apache Parquet Columnar Storage & Compression Optimization Protocol',
      [
        '- **Размер Row Group**: Настроить размер группы строк в диапазоне 128–512 МБ для баланса параллельного чтения и памяти.',
        '- **Кодирование и компрессия**: Использовать Dictionary Encoding для низкокардинальных полей и алгоритм сжатия ZSTD (или Snappy).',
        '- **Статистика для пропуска данных (Data Skipping)**: Сохранять min/max статистики в заголовках страниц для пропуска блоков при чтении.',
      ],
      [
        '- **Row Group Sizing**: Calibrate row group thresholds between 128MB and 512MB balancing multi-threaded I/O parallelism and memory caps.',
        '- **Encoding & Compression Tuning**: Enforce Dictionary Encoding on low-cardinality string columns; apply ZSTD compression for cold data.',
        '- **Page-Level Statistics**: Ensure min/max metadata statistics are written to headers enabling query engines to skip unread row groups.',
      ]
    ),
  },

  'bayesian-ab-testing-framework': {
    id: 'bayesian-ab-testing-framework',
    name: 'BayesianAbTestingFrameworkSkill',
    displayName: 'Bayesian A/B Testing & Posterior Loss Modeling',
    categoryId: 'data_knowledge',
    description: 'Replaces p-values with Bayesian A/B inference: Beta-Binomial conjugate priors, Posterior probability to beat control, and Expected Loss.',
    tags: ['data_knowledge', 'bayesian', 'ab-testing', 'statistics', 'experimentation', 'inference'],
    transform: createStandardSkillTransform(
      'protocol',
      'Байесовское A/B Тестирование и Оценка Ожидаемых Потерь',
      'Bayesian A/B Testing & Posterior Expected Loss Protocol',
      [
        '- **Априорное распределение (Priors)**: Задать информативное или слабоинформативное априорное распределение Beta(alpha, beta).',
        '- **Вероятность превосходства (P(B > A))**: Вычислить вероятность того, что вариант B превосходит вариант A по метрике конверсии.',
        '- **Ожидаемые потери (Expected Loss)**: Рассчитать ожидаемую величину ошибки в случае ложного выбора B; останавливать тест при Loss < 0.001.',
      ],
      [
        '- **Conjugate Prior Calibration**: Establish defensible historical Beta(alpha, beta) priors bounding conversion distributions.',
        '- **Posterior Superiority Estimation**: Compute Monte Carlo probability P(Variant B > Variant A) yielding intuitive decision percentages.',
        '- **Expected Loss Decision Rule**: Calculate Expected Loss (risk of picking worse variant); trigger rollouts strictly when loss drops below epsilon.',
      ]
    ),
  },

  'reverse-etl-sync-engine': {
    id: 'reverse-etl-sync-engine',
    name: 'ReverseEtlSyncEngineSkill',
    displayName: 'Reverse ETL & Operational Analytics Sync',
    categoryId: 'data_knowledge',
    description: 'Pipes dimensional data warehouse tables back into operational SaaS tools (Salesforce, HubSpot, Stripe) with delta syncing.',
    tags: ['data_knowledge', 'reverse-etl', 'operational-analytics', 'sync', 'salesforce', 'integrations'],
    transform: createStandardSkillTransform(
      'protocol',
      'Архитектура Reverse ETL (Синхронизация с Бизнес-Приложениями)',
      'Reverse ETL & Operational Analytics Synchronization Protocol',
      [
        '- **Дельта-синхронизация**: Передавать только измененные строки с момента последнего синка, вычисляя хеш строки (`md5(concat(fields))` или `updated_at`).',
        '- **Сопоставление идентификаторов (Identity Resolution)**: Использовать корпоративный email или account_id в качестве первичного ключа сопоставления.',
        '- **Соблюдение лимитов API**: Пакетировать запросы (до 200 записей за вызов) и соблюдать суточные квоты вызовов CRM API.',
      ],
      [
        '- **Stateful Delta Differencing**: Isolate modified entities using row hashing (`hash(all_columns)`) or monotonic timestamps to sync diffs only.',
        '- **Determinative Identity Mapping**: Align warehouse customer IDs with SaaS destination primary keys (e.g. corporate email, Stripe Customer ID).',
        '- **API Throttling & Batching**: Batch outbound payloads (up to 200 records per call) and throttle dispatches to stay within CRM API quotas.',
      ]
    ),
  },

  'data-lineage-openlineage-spec': {
    id: 'data-lineage-openlineage-spec',
    name: 'DataLineageOpenlineageSkill',
    displayName: 'OpenLineage Metadata & Provenance Standard',
    categoryId: 'data_knowledge',
    description: 'Instruments end-to-end data pipelines with OpenLineage standard events tracing dataset inputs, transformations, and output dependencies.',
    tags: ['data_knowledge', 'openlineage', 'data-lineage', 'metadata', 'governance', 'provenance'],
    transform: createStandardSkillTransform(
      'output_format',
      'Спецификация Происхождения Данных (OpenLineage Standard)',
      'OpenLineage Metadata & Data Lineage Specification',
      [
        '- **Формат событий OpenLineage**: Излучать события жизненного цикла (`START`, `RUNNING`, `COMPLETE`, `FAIL`) с точным таймстемпом.',
        '- **Входы и выходы (Datasets)**: Для каждого набора данных указать `namespace` (напр. s3://bucket или postgres://host) и имя таблицы `name`.',
        '- **Фасеты (Facets)**: Включать фасет схемы `schemaFacets` и фасет SQL-запроса `sqlFacets` для построения графа зависимостей.',
      ],
      [
        '- **OpenLineage Event Lifecycle**: Emit structured telemetry payloads across `START`, `RUNNING`, `COMPLETE`, and `ABORT` job execution states.',
        '- **Dataset URI Attribution**: Pinpoint input and output datasets with canonical `namespace` (e.g. `s3://prod-lake/`) and table `name`.',
        '- **Lineage Facets Enrichment**: Accompany job runs with `schemaFacets` and compiled `sqlFacets` mapping dataset-to-dataset column lineage.',
      ]
    ),
  },

  'sparse-dense-hybrid-search': {
    id: 'sparse-dense-hybrid-search',
    name: 'SparseDenseHybridSearchSkill',
    displayName: 'Hybrid Search & Reciprocal Rank Fusion (RRF)',
    categoryId: 'data_knowledge',
    description: 'Combines BM25 lexical keyword matching with dense vector semantic search, merging rank scores via Reciprocal Rank Fusion.',
    tags: ['data_knowledge', 'search', 'hybrid-search', 'rrf', 'bm25', 'vector-search', 'rag'],
    transform: createStandardSkillTransform(
      'protocol',
      'Гибридный Поиск (BM25 + Dense Vectors) и Слияние RRF',
      'Hybrid Lexical/Dense Search & Reciprocal Rank Fusion (RRF) Protocol',
      [
        '- **Двухпоточный поиск**: Параллельно выполнить BM25 поиск по ключевым словам и поиск ближайших соседей (kNN) по плотным векторам.',
        '- **Слияние Reciprocal Rank Fusion (RRF)**: Формула: score = 1 / (60 + rank_bm25) + 1 / (60 + rank_vector).',
        '- **Устранение слепых зон**: Обеспечить нахождение как точных артикулов и аббревиатур (BM25), так и концептуальных синонимов (векторы).',
      ],
      [
        '- **Dual-Engine Execution**: Dispatch parallel queries to BM25 lexical inverted index and dense embedding vector space simultaneously.',
        '- **Reciprocal Rank Fusion (RRF)**: Blend disparate candidate rank positions using canonical formula: `score = sum(1 / (k + rank_i))` where k=60.',
        '- **Complementary Advantage**: Capture exact keyword terminology (IDs, codes, proper nouns) alongside fuzzy conceptual semantic intent.',
      ]
    ),
  },

  'geospatial-postgis-h3-indexing': {
    id: 'geospatial-postgis-h3-indexing',
    name: 'GeospatialPostgisH3IndexingSkill',
    displayName: 'PostGIS & Uber H3 Hexagonal Spatial Indexing',
    categoryId: 'data_knowledge',
    description: 'Indexes geospatial points using Uber H3 hexagonal hierarchical spatial cells and PostGIS GiST geometric operators.',
    tags: ['data_knowledge', 'geospatial', 'postgis', 'h3', 'gis', 'spatial-index'],
    transform: createStandardSkillTransform(
      'protocol',
      'Пространственная Индексация (PostGIS и Шестиугольники Uber H3)',
      'PostGIS & Uber H3 Hexagonal Spatial Indexing Architecture',
      [
        '- **Шестиугольная сетка Uber H3**: Преобразовывать широту/долготу в дискретный 64-битный индекс ячейки H3 (разрешение 7–9).',
        '- **Радиальный поиск (k-Ring)**: Выполнять агрегацию и поиск ближайших объектов через соседние ячейки `h3_k_ring(cell, 2)`.',
        '- **Индексы PostGIS GiST**: Создавать пространственные индексы `USING GIST(geom)` для полигональных пересечений `ST_Intersects`.',
      ],
      [
        '- **Uber H3 Discrete Binning**: Convert continuous latitude/longitude pairs into 64-bit integer H3 hexagonal grid cells (resolution 7-9).',
        '- **Constant-Time Neighborhood (k-Ring)**: Execute spatial proximity clustering and radius lookups via discrete `h3_k_ring(cell, k)` sets.',
        '- **PostGIS GiST Indices**: Accelerate arbitrary polygon boundary intersections and geofencing checks using spatial `USING GIST(geometry)` trees.',
      ]
    ),
  },

  'anomaly-detection-isolation-forest': {
    id: 'anomaly-detection-isolation-forest',
    name: 'AnomalyDetectionIsolationForestSkill',
    displayName: 'Isolation Forest & Time-Series Anomaly Detection',
    categoryId: 'data_knowledge',
    description: 'Identifies multi-dimensional outliers using Isolation Forests and seasonal ESD (Extreme Studentized Deviate) decomposition.',
    tags: ['data_knowledge', 'anomaly-detection', 'isolation-forest', 'time-series', 'statistics', 'ml'],
    transform: createStandardSkillTransform(
      'protocol',
      'Детекция Аномалий в Данных (Isolation Forest Protocol)',
      'Isolation Forest & Time-Series Anomaly Detection Protocol',
      [
        '- **Принцип изолирующего леса (Isolation Forest)**: Аномальные точки изолируются меньшим числом случайных разбиений дерева, чем нормальные.',
        '- **Учет сезонности и тренда**: Перед детекцией устранить дневную и недельную сезонность с помощью STL-декомпозиции.',
        '- **Калибровка порога контаминации**: Настроить процент ожидаемых выбросов `contamination = 0.01` (1% данных) с генерацией алерта.',
      ],
      [
        '- **Tree Partitioning Anomaly Score**: Isolate outliers based on short average path length in randomized decision isolation trees.',
        '- **Seasonal Decomposition Gate**: Pre-process time-series data using STL decomposition to subtract weekly/daily seasonality from residual noise.',
        '- **Contamination Tuning**: Calibrate contamination budget (default 1%) paired with severity classification tiers (Critical, Warning, Informational).',
      ]
    ),
  },

  'data-privacy-pii-tokenization': {
    id: 'data-privacy-pii-tokenization',
    name: 'DataPrivacyPiiTokenizationSkill',
    displayName: 'PII Pseudonymization & Vaultless Tokenization',
    categoryId: 'data_knowledge',
    description: 'Protects personal data (GDPR/HIPAA) using format-preserving encryption (FPE), HMAC tokenization, and differential privacy noise.',
    tags: ['data_knowledge', 'pii', 'privacy', 'tokenization', 'gdpr', 'security', 'fpe'],
    transform: createStandardSkillTransform(
      'constraints',
      'Токенизация и Защита Персональных Данных (PII Protection)',
      'PII Pseudonymization & Vaultless Tokenization Protocol',
      [
        '- **Формат-сохраняющее шифрование (FPE)**: Шифровать номера кредитных карт и телефонов с сохранением их длины и валидности синтаксиса.',
        '- **HMAC токенизация идентификаторов**: Заменять персональные email на `HMAC-SHA256(email, secret_salt)` для сквозной аналитики без утечки данных.',
        '- **Запрет сырых PII в Data Lake**: Автоматически маскировать или удалять любые PII до их записи в аналитическое хранилище.',
      ],
      [
        '- **Format-Preserving Encryption (FPE)**: Encrypt structured PII (credit cards, SSNs) ensuring ciphertext retains identical length and digit syntax.',
        '- **Keyed HMAC Pseudonymization**: Substitute user emails with `HMAC-SHA256(email, rotation_salt)` enabling cohort analytics without storing raw identity.',
        '- **Ingestion Redaction Gate**: Intercept and scrub unhashed PII at ingest gateways before persistence into analytics lakehouse storage.',
      ]
    ),
  },

  'clickhouse-olap-aggregating-mergetree': {
    id: 'clickhouse-olap-aggregating-mergetree',
    name: 'ClickhouseAggregatingMergeTreeSkill',
    displayName: 'ClickHouse AggregatingMergeTree OLAP Optimization',
    categoryId: 'data_knowledge',
    description: 'Designs sub-second real-time aggregation queries on ClickHouse using AggregatingMergeTree tables and Materialized Views.',
    tags: ['data_knowledge', 'clickhouse', 'olap', 'aggregating-mergetree', 'real-time', 'big-data'],
    transform: createStandardSkillTransform(
      'protocol',
      'Оптимизация ClickHouse OLAP (AggregatingMergeTree Engine)',
      'ClickHouse AggregatingMergeTree & Materialized View Architecture',
      [
        '- **Движок AggregatingMergeTree**: Использовать для предвычисления промежуточных состояний агрегатов (HLL, Quantiles, Sum).',
        '- **Комбинаторы State и Merge**: Записывать промежуточные состояния функций через `-State` (`uniqState(user_id)`), а читать через `-Merge`.',
        '- **Материализованные представления (MV)**: Создавать Materialized View для непрерывного фонового обновления агрегированных таблиц при вставке.',
      ],
      [
        '- **AggregatingMergeTree Engine**: Pre-aggregate metrics in background merges using binary state representations (HyperLogLog, Quantiles, Sum).',
        '- **State/Merge Function Combinators**: Persist aggregation state using `-State` combinators (`uniqState(user_id)`); query results using `-Merge`.',
        '- **Materialized View Push Stream**: Wire trigger Materialized Views on base tables to continuously compute real-time aggregate rollups upon insert.',
      ]
    ),
  },

  'semantic-search-reranking-cohere': {
    id: 'semantic-search-reranking-cohere',
    name: 'SemanticSearchRerankingCohereSkill',
    displayName: 'Two-Stage Retrieval & Cross-Encoder Reranking',
    categoryId: 'data_knowledge',
    description: 'Implements two-stage search: High-recall retrieval (top-100 via vector/BM25) followed by high-precision Cross-Encoder reranking (top-5).',
    tags: ['data_knowledge', 'reranking', 'cohere', 'cross-encoder', 'retrieval', 'rag', 'search'],
    transform: createStandardSkillTransform(
      'protocol',
      'Двухэтапный Поиск и Cross-Encoder Реренкинг (Two-Stage Retrieval)',
      'Two-Stage Retrieval & Cross-Encoder Reranking Protocol',
      [
        '- **Этап 1 (High Recall)**: Извлечь топ-50 кандидатов с помощью быстрого био-кодировщика (векторный поиск) или BM25.',
        '- **Этап 2 (High Precision)**: Пропустить 50 пар (Запрос, Документ) через глубокий Cross-Encoder (Cohere Rerank / BGE-Reranker).',
        '- **Финальная фильтрация**: Отобрать топ-5 документов с наибольшей семантической релевантностью для передачи в контекст LLM.',
      ],
      [
        '- **Stage 1 Fast Candidate Retrieval**: Fetch top-50 candidate documents with broad recall using lightweight bi-encoder vector lookups or BM25.',
        '- **Stage 2 Deep Cross-Encoder Scoring**: Score all 50 `(query, document)` pairs simultaneously through a cross-attention reranking model.',
        '- **Score Threshold Pruning**: Select top-5 highest-scoring passages, discarding entries failing relevance confidence ceilings.',
      ]
    ),
  },

  'data-mesh-domain-ownership-manifest': {
    id: 'data-mesh-domain-ownership-manifest',
    name: 'DataMeshDomainOwnershipSkill',
    displayName: 'Data Mesh Product Specification & Ownership',
    categoryId: 'data_knowledge',
    description: 'Formalizes Data Mesh decentralized domain products: output ports, SLA freshness guarantees, access control, and ownership metadata.',
    tags: ['data_knowledge', 'data-mesh', 'data-product', 'domain-ownership', 'governance', 'architecture'],
    transform: createStandardSkillTransform(
      'output_format',
      'Манифест Продукта Данных (Data Mesh Product Manifest)',
      'Data Mesh Domain Product & Output Port Specification',
      [
        '- **Владелец и домен**: Четко указать ответственную продуктовую команду (`domain: billing`, `owner_team: payments-eng`).',
        '- **Спецификация Output Ports**: Предоставить типизированные интерфейсы для потребителей (SQL-вью, Kafka топик, S3 бакет).',
        '- **Гарантии качества данных (SLO)**: Время обновления (freshness), допустимый процент пропусков и окно сохранения истории.',
      ],
      [
        '- **Domain Ownership Attribution**: Explicitly assign domain stewardship metadata (`domain: orders`, `owner_email: billing-eng@org.com`).',
        '- **Typed Output Port Endpoints**: Publish machine-readable consumer ports: SQL Analytical View, Kafka Event Topic, and S3 Parquet partitions.',
        '- **SLO Quality Contracts**: Declare strict SLAs covering maximum freshness lag (e.g. <15 mins), completeness thresholds, and retention policies.',
      ]
    ),
  },
  "data-lakehouse-medallion-architecture": {
    id: "data-lakehouse-medallion-architecture",
    name: "DataLakehouseMedallionArchitectureSkill",
    displayName: "Medallion Lakehouse Architecture (Bronze/Silver/Gold)",
    categoryId: "data_knowledge",
    description: "Designs structured data lakehouse tiers from raw streaming ingestion to cleaned enterprise dimension models.",
    tags: ["data","lakehouse","medallion","delta-lake","data-engineering"],
    transform: createStandardSkillTransform({
      sectionName: "Medallion Lakehouse Architecture",
      ruSectionName: "Медальонная архитектура Lakehouse (Bronze / Silver / Gold)",
      instructions: [
        "Define Bronze tier for immutable raw event streaming and change-data-capture (CDC).",
        "Specify Silver tier for deduplication, schema enforcement, and enriched entity tables.",
        "Construct Gold tier aggregated marts optimized for high-performance BI reporting."
],
      ruInstructions: [
        "Спроектируйте Bronze-слой для неизменяемого сырого потока данных и CDC.",
        "Опишите Silver-слой для дедупликации, очистки и валидации схем.",
        "Постройте Gold-витрины с агрегатами, оптимизированными под BI и аналитику."
],
      semanticType: 'protocol',
      tags: ["data","lakehouse","medallion","delta-lake","data-engineering"],
    }),
  },

  "slowly-changing-dimensions-scd2-modeling": {
    id: "slowly-changing-dimensions-scd2-modeling",
    name: "SlowlyChangingDimensionsScd2ModelingSkill",
    displayName: "Slowly Changing Dimensions (SCD Type 2 & 4)",
    categoryId: "data_knowledge",
    description: "Models historical entity mutations using surrogate keys, valid_from/valid_to timestamps, and active flags.",
    tags: ["data","data-modeling","scd2","data-warehouse","kimball"],
    transform: createStandardSkillTransform({
      sectionName: "SCD Dimension Modeling Protocol",
      ruSectionName: "Моделирование медленно меняющихся измерений (SCD2 / SCD4)",
      instructions: [
        "Define effective date range tracking columns: `valid_from_ts`, `valid_to_ts`, and `is_current_flag`.",
        "Handle out-of-order event ingestion with atomic version insertion and timestamp reconciliation.",
        "Provide standard idempotent merge/upsert SQL statements."
],
      ruInstructions: [
        "Добавьте поля отслеживания версий: valid_from, valid_to и is_current.",
        "Обработайте сценарии поступления данных не по порядку с коррекцией версий.",
        "Предоставьте идемпотентные SQL-запросы слияния и обновления (MERGE)."
],
      semanticType: "process_directive",
      tags: ["data","data-modeling","scd2","data-warehouse","kimball"],
    }),
  },

  "dbt-semantic-layer-metricflow-spec": {
    id: "dbt-semantic-layer-metricflow-spec",
    name: "DbtSemanticLayerMetricflowSpecSkill",
    displayName: "dbt Semantic Layer & MetricFlow Governance",
    categoryId: "data_knowledge",
    description: "Defines governed enterprise metrics, semantic models, entities, and dimensions using dbt Semantic Layer standard specs.",
    tags: ["data","dbt","metricflow","semantic-layer","metrics-governance"],
    transform: createStandardSkillTransform({
      sectionName: "dbt Semantic Layer & Metrics Spec",
      ruSectionName: "Семантический слой dbt и управление метриками (MetricFlow)",
      instructions: [
        "Define semantic models with primary/foreign entities, measures, and time grains.",
        "Specify derived and cumulative metrics with mathematical precision.",
        "Ensure single-source-of-truth definitions for cross-BI consumption."
],
      ruInstructions: [
        "Опишите семантические модели с сущностями, мерами и временной гранулярностью.",
        "Сформулируйте производные и кумулятивные метрики с точными формулами.",
        "Обеспечьте единый источник правды для всех BI-инструментов."
],
      semanticType: "process_directive",
      tags: ["data","dbt","metricflow","semantic-layer","metrics-governance"],
    }),
  },

  "vector-database-hsnw-indexing-optimizer": {
    id: "vector-database-hsnw-indexing-optimizer",
    name: "VectorDatabaseHsnwIndexingOptimizerSkill",
    displayName: "Vector Search Indexing (HNSW & IVF-PQ)",
    categoryId: "data_knowledge",
    description: "Tunes vector index parameters (M, efConstruction, efSearch, metric distance) for low-latency similarity search.",
    tags: ["data","vector-db","hnsw","embeddings","similarity-search"],
    transform: createStandardSkillTransform({
      sectionName: "Vector Index Optimization Protocol",
      ruSectionName: "Оптимизация векторных индексов (HNSW / IVF-PQ)",
      instructions: [
        "Choose distance metric (Cosine, L2 Euclidean, Dot Product) aligned with embedding normalization.",
        "Tune HNSW graph parameters: balance `M` (connections) and `efConstruction` against memory footprint.",
        "Implement hybrid sparse-dense reciprocal rank fusion (RRF)."
],
      ruInstructions: [
        "Выберите метрику расстояния (косинус, L2, скалярное произведение) под нормализацию эмбеддингов.",
        "Сбалансируйте параметры графа HNSW (M, efConstruction) с учетом объема оперативной памяти.",
        "Настройте гибридный поиск (sparse + dense) с алгоритмом RRF."
],
      semanticType: "process_directive",
      tags: ["data","vector-db","hnsw","embeddings","similarity-search"],
    }),
  },

  "data-lineage-openlineage-governance": {
    id: "data-lineage-openlineage-governance",
    name: "DataLineageOpenlineageGovernanceSkill",
    displayName: "Data Lineage & Column-Level Impact Tracing",
    categoryId: "data_knowledge",
    description: "Tracks upstream/downstream column-level dependencies and pipeline provenance using OpenLineage and Marquez standards.",
    tags: ["data","data-lineage","openlineage","governance","metadata"],
    transform: createStandardSkillTransform({
      sectionName: "Data Lineage Governance Protocol",
      ruSectionName: "Управление происхождением данных (Lineage) и аудит влияния изменений",
      instructions: [
        "Map full transformation lineage from source raw feeds to destination dashboards.",
        "Evaluate column-level breaking change blast radius before modifying DDL.",
        "Emit OpenLineage run events across job start, complete, and fail phases."
],
      ruInstructions: [
        "Постройте полную цепочку зависимостей от источников до конечных отчетов.",
        "Оцените радиус поражения при изменении колонок до внесения правок в схемы.",
        "Сформируйте события OpenLineage для мониторинга фаз выполнения пайплайнов."
],
      semanticType: "process_directive",
      tags: ["data","data-lineage","openlineage","governance","metadata"],
    }),
  },

  "kafka-event-streaming-partitioning-strategy": {
    id: "kafka-event-streaming-partitioning-strategy",
    name: "KafkaEventStreamingPartitioningStrategySkill",
    displayName: "Kafka Partitioning, Keying & Exactly-Once Semantics",
    categoryId: "data_knowledge",
    description: "Architects distributed Kafka topics, partition key hashing, consumer lag monitoring, and transactional idempotence.",
    tags: ["data","kafka","streaming","partitioning","exactly-once"],
    transform: createStandardSkillTransform({
      sectionName: "Kafka Partitioning & Streaming Architecture",
      ruSectionName: "Архитектура партиционирования и потоковой обработки Kafka",
      instructions: [
        "Design partition keys to prevent hot partitions while guaranteeing strict message ordering.",
        "Configure Producer idempotence (`enable.idempotence=true`, `acks=all`) and consumer read-committed isolation.",
        "Set retention, compaction, and dead-letter queue (DLQ) policies."
],
      ruInstructions: [
        "Спроектируйте ключи партиционирования для равномерного распределения и сохранения порядка сообщений.",
        "Настройте идемпотентные продюсеры и изоляцию транзакций у консьюмеров.",
        "Задайте политики компактизации, хранения и очереди недоставленных сообщений (DLQ)."
],
      semanticType: 'protocol',
      tags: ["data","kafka","streaming","partitioning","exactly-once"],
    }),
  },

  "graph-database-cypher-property-modeling": {
    id: "graph-database-cypher-property-modeling",
    name: "GraphDatabaseCypherPropertyModelingSkill",
    displayName: "Property Graph Modeling & Cypher Optimization",
    categoryId: "data_knowledge",
    description: "Models complex interconnected networks, knowledge graphs, and fraud patterns using labeled property graphs and Cypher.",
    tags: ["data","graph-db","neo4j","cypher","knowledge-graph"],
    transform: createStandardSkillTransform({
      sectionName: "Property Graph Modeling & Cypher Protocol",
      ruSectionName: "Моделирование графов свойств и оптимизация Cypher",
      instructions: [
        "Define domain entities as Nodes with clear Labels, and actions/relations as directed Relationships.",
        "Avoid high-degree supernode bottlenecks with intermediate indexing or relationship grouping.",
        "Write optimized Cypher traversal queries leveraging index-backed anchors."
],
      ruInstructions: [
        "Определите узлы (Nodes) с метками и направленные связи (Relationships) со свойствами.",
        "Устраните риски суперузлов высокой степени связанности через промежуточные вершины.",
        "Составьте оптимизированные Cypher-запросы с использованием якорных индексов."
],
      semanticType: "process_directive",
      tags: ["data","graph-db","neo4j","cypher","knowledge-graph"],
    }),
  },

  "feature-store-online-offline-sync-spec": {
    id: "feature-store-online-offline-sync-spec",
    name: "FeatureStoreOnlineOfflineSyncSpecSkill",
    displayName: "ML Feature Store (Online/Offline) Synchronization",
    categoryId: "data_knowledge",
    description: "Designs low-latency online key-value feature stores (Redis) synced with point-in-time correct offline historical lakes (Feast/Hopsworks).",
    tags: ["data","feature-store","mlops","point-in-time","feast"],
    transform: createStandardSkillTransform({
      sectionName: "ML Feature Store Architecture",
      ruSectionName: "Архитектура Feature Store для машинного обучения (Online/Offline)",
      instructions: [
        "Define Feature Views with strict entity keys, timestamp fields, and aggregations.",
        "Guarantee point-in-time correctness during offline historical training dataset generation.",
        "Configure real-time stream ingestion for sub-10ms online inference lookups."
],
      ruInstructions: [
        "Опишите Feature Views с первичными ключами сущностей и временными срезами.",
        "Обеспечьте корректность исторических срезов без утечки данных из будущего.",
        "Настройте синхронизацию с online-хранилищем для выдачи фичей быстрее 10 мс."
],
      semanticType: 'protocol',
      tags: ["data","feature-store","mlops","point-in-time","feast"],
    }),
  },

  "data-contracts-json-schema-enforcement": {
    id: "data-contracts-json-schema-enforcement",
    name: "DataContractsJsonSchemaEnforcementSkill",
    displayName: "Data Contracts & Schema Evolution Governance",
    categoryId: "data_knowledge",
    description: "Enforces formal data contracts between software engineering producers and data analytics consumers with CI validation.",
    tags: ["data","data-contracts","schema-governance","json-schema","ci-cd"],
    transform: createStandardSkillTransform({
      sectionName: "Data Contract Specification & Governance",
      ruSectionName: "Спецификация дата-контрактов и версионирование схем",
      instructions: [
        "Specify contract terms: schema definition, SLA timeliness, quality guarantees, and breaking change notice periods.",
        "Implement strict schema backward/forward compatibility checks in CI/CD.",
        "Provide fallback and error quashing protocols on schema contract violations."
],
      ruInstructions: [
        "Зафиксируйте условия контракта: схемы, SLA доставки, правила качества данных.",
        "Внедрите автоматическую проверку обратной совместимости схем в CI/CD.",
        "Опишите обработку нарушений контракта и изоляцию некорректных батчей."
],
      semanticType: "process_directive",
      tags: ["data","data-contracts","schema-governance","json-schema","ci-cd"],
    }),
  },

  "clickhouse-olap-sharding-engine-tuning": {
    id: "clickhouse-olap-sharding-engine-tuning",
    name: "ClickhouseOlapShardingEngineTuningSkill",
    displayName: "ClickHouse OLAP Engine & Sharding Optimization",
    categoryId: "data_knowledge",
    description: "Configures ReplacingMergeTree, AggregatingMergeTree, distributed sharding keys, and skip indexes for billion-row real-time analytics.",
    tags: ["data","clickhouse","olap","mergetree","real-time-analytics"],
    transform: createStandardSkillTransform({
      sectionName: "ClickHouse OLAP Configuration Protocol",
      ruSectionName: "Оптимизация ClickHouse OLAP движков и шардирования",
      instructions: [
        "Select appropriate MergeTree engine variant (Replacing, Collapsing, Summing, or Aggregating).",
        "Choose PRIMARY KEY and ORDER BY columns ordered strictly by increasing cardinality.",
        "Configure secondary data skipping indexes (minmax, bloom_filter, set) for sparse lookups."
],
      ruInstructions: [
        "Выберите семейство MergeTree (Replacing, Collapsing, Aggregating) под тип нагрузки.",
        "Задайте ORDER BY колонки в порядке возрастания мощности (cardinality).",
        "Настройте пропускающие индексы (minmax, bloom filter) для ускорения фильтрации."
],
      semanticType: "process_directive",
      tags: ["data","clickhouse","olap","mergetree","real-time-analytics"],
    }),
  },

  "spark-distributed-join-skew-mitigation": {
    id: "spark-distributed-join-skew-mitigation",
    name: "SparkDistributedJoinSkewMitigationSkill",
    displayName: "Apache Spark Data Skew & Distributed Join Optimization",
    categoryId: "data_knowledge",
    description: "Removes out-of-memory OOM bottlenecks, optimizes broadcast hash joins, and salts high-cardinality skew keys.",
    tags: ["data","spark","data-skew","broadcast-join","distributed-computing"],
    transform: createStandardSkillTransform({
      sectionName: "Spark Skew Mitigation & Join Optimization",
      ruSectionName: "Устранение перекоса данных (Data Skew) и оптимизация джойнов в Spark",
      instructions: [
        "Identify skewed join keys causing stranded single-task executor bottlenecks.",
        "Apply key salting with random salt prefixes and replicated cross-joins.",
        "Leverage Broadcast Hash Joins for dimension tables smaller than the broadcast threshold."
],
      ruInstructions: [
        "Выявите перекошенные ключи объединения, перегружающие отдельные исполнители (executors).",
        "Примените технику соления ключей (key salting) для равномерного распределения партиций.",
        "Используйте Broadcast Hash Join для небольших справочников."
],
      semanticType: "process_directive",
      tags: ["data","spark","data-skew","broadcast-join","distributed-computing"],
    }),
  },

  "time-series-downsampling-retention-policy": {
    id: "time-series-downsampling-retention-policy",
    name: "TimeSeriesDownsamplingRetentionPolicySkill",
    displayName: "Time-Series Downsampling & Rollup Retention",
    categoryId: "data_knowledge",
    description: "Configures multi-tier time-series storage policies (e.g. 10-second raw -> 1-minute 30-day -> 1-hour 1-year rollups).",
    tags: ["data","time-series","downsampling","rollups","retention-policy"],
    transform: createStandardSkillTransform({
      sectionName: "Time-Series Downsampling Architecture",
      ruSectionName: "Архитектура сжатия и хранения временных рядов (Downsampling)",
      instructions: [
        "Define tiered rollup schedules: High Resolution (1s/10s), Medium (1m/5m), Low (1h/1d).",
        "Choose non-lossy statistical aggregations (min, max, mean, p50, p99, count).",
        "Automate cold storage tiering to S3/GCS object buckets."
],
      ruInstructions: [
        "Спроектируйте уровни хранения: высокое разрешение, среднее и дневные агрегаты.",
        "Настройте статистические агрегации (мин, макс, среднее, квантили p50, p99).",
        "Автоматизируйте перенос устаревших данных в холодное объектное хранилище."
],
      semanticType: "process_directive",
      tags: ["data","time-series","downsampling","rollups","retention-policy"],
    }),
  },

  "zero-downtime-cdc-debezium-pipeline": {
    id: "zero-downtime-cdc-debezium-pipeline",
    name: "ZeroDowntimeCdcDebeziumPipelineSkill",
    displayName: "Change Data Capture (CDC) via Debezium & Kafka Connect",
    categoryId: "data_knowledge",
    description: "Captures database transaction logs (PostgreSQL WAL, MySQL binlog) for zero-impact real-time synchronization.",
    tags: ["data","cdc","debezium","wal","real-time-sync"],
    transform: createStandardSkillTransform({
      sectionName: "Change Data Capture (CDC) Architecture",
      ruSectionName: "Архитектура Change Data Capture (Debezium / Kafka Connect)",
      instructions: [
        "Configure database replication slots and logical decoding plugins.",
        "Handle schema evolution events in the Debezium event envelope without breaking consumers.",
        "Design initial consistent snapshotting without table locks."
],
      ruInstructions: [
        "Настройте слоты логической репликации в БД (PostgreSQL WAL / MySQL binlog).",
        "Опишите обработку эволюции схем в сообщениях Debezium без сбоя потребителей.",
        "Организуйте начальный снимок данных (snapshot) без блокировки таблиц."
],
      semanticType: 'protocol',
      tags: ["data","cdc","debezium","wal","real-time-sync"],
    }),
  },

  "data-observability-monte-carlo-metrics": {
    id: "data-observability-monte-carlo-metrics",
    name: "DataObservabilityMonteCarloMetricsSkill",
    displayName: "Data Observability & Anomaly Alerting (5 Pillars)",
    categoryId: "data_knowledge",
    description: "Monitors the 5 pillars of data observability: Freshness, Volume, Schema, Quality, and Lineage across warehouse pipelines.",
    tags: ["data","observability","data-quality","anomalies","monitoring"],
    transform: createStandardSkillTransform({
      sectionName: "Data Observability 5 Pillars Framework",
      ruSectionName: "Фреймворк 5 столпов наблюдаемости данных (Data Observability)",
      instructions: [
        "Instrument freshness and SLA threshold monitors for every critical table.",
        "Deploy volume anomaly detectors tracking unexpected zero-row or 10x row spikes.",
        "Automate schema drift alerts and downstream user notifications."
],
      ruInstructions: [
        "Настройте мониторинг свежести данных и соблюдения SLA по ключевым таблицам.",
        "Внедрите детекторы аномалий объема (пустые таблицы или аномальные всплески строк).",
        "Автоматизируйте алерты об изменении схем данных для зависимых команд."
],
      semanticType: "process_directive",
      tags: ["data","observability","data-quality","anomalies","monitoring"],
    }),
  },

  "anonymization-pii-differential-privacy": {
    id: "anonymization-pii-differential-privacy",
    name: "AnonymizationPiiDifferentialPrivacySkill",
    displayName: "PII Tokenization, Masking & Differential Privacy",
    categoryId: "data_knowledge",
    description: "Applies cryptographic tokenization, k-anonymity, l-diversity, and laplace noise injection to preserve dataset utility while complying with privacy laws.",
    tags: ["data","privacy","pii-masking","differential-privacy","compliance"],
    transform: createStandardSkillTransform({
      sectionName: "Data Anonymization & Privacy Protocol",
      ruSectionName: "Протокол анонимизации данных и дифференциальной приватности",
      instructions: [
        "Identify Direct Identifiers (SSN, Email, Name) and apply reversible vaulted tokenization.",
        "Evaluate Quasi-Identifiers against k-anonymity (k>=5) and l-diversity thresholds.",
        "Inject calibrated Laplace/Gaussian noise for differential privacy query engines."
],
      ruInstructions: [
        "Найдите прямые идентификаторы (ПДн) и примените токенизацию через защищенное хранилище.",
        "Проверьте квази-идентификаторы на соответствие стандартам k-anonymity и l-diversity.",
        "Добавьте калиброванный шум Лапласа для аналитических запросов с дифференциальной приватностью."
],
      semanticType: "process_directive",
      tags: ["data","privacy","pii-masking","differential-privacy","compliance"],
    }),
  },

  "embedded-analytics-multitenant-row-level-security": {
    id: "embedded-analytics-multitenant-row-level-security",
    name: "EmbeddedAnalyticsMultitenantRowLevelSecuritySkill",
    displayName: "Multi-Tenant Embedded Analytics & Row-Level Security",
    categoryId: "data_knowledge",
    description: "Architects multi-tenant reporting pipelines enforcing strict tenant isolation through JWT claim filtering and database RLS.",
    tags: ["data","analytics","multi-tenant","rls","row-level-security"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Tenant Analytics Isolation Protocol",
      ruSectionName: "Многопользовательская изоляция аналитики (Row-Level Security)",
      instructions: [
        "Enforce Row-Level Security (RLS) policies driven by authenticated tenant context tokens.",
        "Implement tenant-aware query caching to prevent cross-tenant data leaks.",
        "Isolate heavy tenant query workloads using elastic warehouse compute pools."
],
      ruInstructions: [
        "Настройте политики RLS на основе проверенных JWT-токенов тенанта.",
        "Организуйте кэширование запросов с жесткой изоляцией по tenant_id.",
        "Изолируйте ресурсоемкие запросы крупных клиентов в отдельные пулы вычислений."
],
      semanticType: "process_directive",
      tags: ["data","analytics","multi-tenant","rls","row-level-security"],
    }),
  },

  "geospatial-h3-postgis-indexing": {
    id: "geospatial-h3-postgis-indexing",
    name: "GeospatialH3PostgisIndexingSkill",
    displayName: "Geospatial Hexagonal Indexing (Uber H3 & PostGIS)",
    categoryId: "data_knowledge",
    description: "Indexes latitude/longitude coordinates into hierarchical hexagonal H3 cells for rapid radius queries, aggregation, and spatial joins.",
    tags: ["data","geospatial","postgis","h3","spatial-indexing"],
    transform: createStandardSkillTransform({
      sectionName: "Geospatial H3 Indexing Protocol",
      ruSectionName: "Протокол геопространственного индексирования (H3 / PostGIS)",
      instructions: [
        "Convert lat/lng points into discrete H3 indexes at appropriate resolution (e.g. Res 7-9 for urban areas).",
        "Optimize k-ring spatial neighbor searches and polygon intersection lookups.",
        "Build PostGIS GiST indexed queries for complex boundary containment."
],
      ruInstructions: [
        "Конвертируйте координаты в гексагональные индексы H3 с нужным разрешением.",
        "Оптимизируйте поиск соседей (k-ring) и пересечения полигонов.",
        "Создайте GiST-индексы PostGIS для быстрых пространственных выборок."
],
      semanticType: "process_directive",
      tags: ["data","geospatial","postgis","h3","spatial-indexing"],
    }),
  },

  "document-store-polymorphic-schema-design": {
    id: "document-store-polymorphic-schema-design",
    name: "DocumentStorePolymorphicSchemaDesignSkill",
    displayName: "MongoDB / Document Store Polymorphic Schema Design",
    categoryId: "data_knowledge",
    description: "Designs polymorphic document structures, bucket pattern time-series, and subset patterns to minimize IO and join overhead.",
    tags: ["data","mongodb","document-db","nosql","schema-design"],
    transform: createStandardSkillTransform({
      sectionName: "Document Store Schema Optimization",
      ruSectionName: "Проектирование полиморфных схем документоориентированных БД",
      instructions: [
        "Apply the Polymorphic Pattern using discriminator fields (`schema_version`, `entity_type`).",
        "Implement the Subset Pattern by embedding only frequently accessed summary attributes.",
        "Use the Bucket Pattern to compress high-frequency telemetry documents."
],
      ruInstructions: [
        "Примените полиморфный паттерн с дискриминатором типа сущности и версии схемы.",
        "Внедрите паттерн подмножеств (Subset Pattern) для частых полей во избежание лишнего IO.",
        "Используйте пакетирование (Bucket Pattern) для временных рядов."
],
      semanticType: "process_directive",
      tags: ["data","mongodb","document-db","nosql","schema-design"],
    }),
  },

  "entity-resolution-deduplication-probabilistic": {
    id: "entity-resolution-deduplication-probabilistic",
    name: "EntityResolutionDeduplicationProbabilisticSkill",
    displayName: "Probabilistic Entity Resolution & Deduplication",
    categoryId: "data_knowledge",
    description: "Matches and merges messy customer records across disparate systems using Fellegi-Sunter record linkage and Jaro-Winkler distance.",
    tags: ["data","entity-resolution","deduplication","record-linkage","master-data"],
    transform: createStandardSkillTransform({
      sectionName: "Probabilistic Entity Resolution Protocol",
      ruSectionName: "Протокол вероятностной дедупликации и слияния сущностей",
      instructions: [
        "Implement blocking strategies to reduce the O(N^2) comparison space.",
        "Compute similarity scores across name, address, phone, and tax identifiers using phonetic and string metrics.",
        "Assign probabilistic match weights and configure auto-merge vs manual review thresholds."
],
      ruInstructions: [
        "Настройте блокирующие ключи (blocking) для исключения перебора всех пар O(N^2).",
        "Рассчитайте схожесть полей (имена, телефоны, адреса) с помощью метрик расстояния.",
        "Задайте пороги автоматического слияния и ручной модерации спорных дубликатов."
],
      semanticType: "process_directive",
      tags: ["data","entity-resolution","deduplication","record-linkage","master-data"],
    }),
  },

  "reverse-etl-activation-crm-sync": {
    id: "reverse-etl-activation-crm-sync",
    name: "ReverseEtlActivationCrmSyncSkill",
    displayName: "Reverse-ETL & Operational Analytics Activation",
    categoryId: "data_knowledge",
    description: "Pumps calculated data warehouse scores (LTV, product health, churn propensity) into operational tools (Salesforce, HubSpot, Stripe).",
    tags: ["data","reverse-etl","operational-analytics","census","hightouch"],
    transform: createStandardSkillTransform({
      sectionName: "Reverse-ETL Activation Architecture",
      ruSectionName: "Архитектура Reverse-ETL и активации данных в CRM/ERP",
      instructions: [
        "Select canonical source warehouse views with deterministic surrogate IDs.",
        "Configure differential sync schedules (only updating mutated downstream records).",
        "Establish API rate-limit throttling and webhook retry buffers for target CRM endpoints."
],
      ruInstructions: [
        "Определите канонические витрины с детерминированными внешними ID.",
        "Настройте дифференциальную синхронизацию (обновление только изменившихся строк).",
        "Внедрите контроль лимитов API сторонних CRM и буферизацию повторных попыток."
],
      semanticType: 'protocol',
      tags: ["data","reverse-etl","operational-analytics","census","hightouch"],
    }),
  },
  "data-knowledge-apache-iceberg-parquet-table-format": {
    id: "data-knowledge-apache-iceberg-parquet-table-format",
    name: "ApacheIcebergParquetTableFormatSkill",
    displayName: "Apache Iceberg Parquet Table Format",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Apache Iceberg Parquet Table Format.",
    tags: ["dataKnowledge","knowledge","apache","iceberg"],
    transform: createStandardSkillTransform({
      sectionName: "Apache Iceberg Table Format Standards",
      ruSectionName: "Стандарты и практические требования: Apache Iceberg Parquet Table Format",
      instructions: [
        "Apply core domain tenets and industry best practices for Apache Iceberg Parquet Table Format.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Apache Iceberg Parquet Table Format.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","apache","iceberg"],
    }),
  },

  "data-knowledge-vector-database-hnsw-index-tuning": {
    id: "data-knowledge-vector-database-hnsw-index-tuning",
    name: "VectorDatabaseHNSWIndexTuningSkill",
    displayName: "Vector Database HNSW Index Tuning",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Vector Database HNSW Index Tuning.",
    tags: ["dataKnowledge","knowledge","vector","database"],
    transform: createStandardSkillTransform({
      sectionName: "Vector Database HNSW Indexing Protocol",
      ruSectionName: "Стандарты и практические требования: Vector Database HNSW Index Tuning",
      instructions: [
        "Apply core domain tenets and industry best practices for Vector Database HNSW Index Tuning.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Vector Database HNSW Index Tuning.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","vector","database"],
    }),
  },

  "data-knowledge-change-data-capture-debezium-streaming": {
    id: "data-knowledge-change-data-capture-debezium-streaming",
    name: "ChangeDataCaptureDebeziumStreamingSkill",
    displayName: "Change Data Capture Debezium Streaming",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Change Data Capture Debezium Streaming.",
    tags: ["dataKnowledge","knowledge","change","data"],
    transform: createStandardSkillTransform({
      sectionName: "CDC Debezium Stream Standards",
      ruSectionName: "Стандарты и практические требования: Change Data Capture Debezium Streaming",
      instructions: [
        "Apply core domain tenets and industry best practices for Change Data Capture Debezium Streaming.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Change Data Capture Debezium Streaming.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","change","data"],
    }),
  },

  "data-knowledge-data-mesh-federated-governance-model": {
    id: "data-knowledge-data-mesh-federated-governance-model",
    name: "DataMeshFederatedGovernanceModelSkill",
    displayName: "Data Mesh Federated Governance Model",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Data Mesh Federated Governance Model.",
    tags: ["dataKnowledge","knowledge","data","mesh"],
    transform: createStandardSkillTransform({
      sectionName: "Data Mesh Governance Architecture",
      ruSectionName: "Стандарты и практические требования: Data Mesh Federated Governance Model",
      instructions: [
        "Apply core domain tenets and industry best practices for Data Mesh Federated Governance Model.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Data Mesh Federated Governance Model.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","data","mesh"],
    }),
  },

  "data-knowledge-dbt-data-build-tool-semantic-layer": {
    id: "data-knowledge-dbt-data-build-tool-semantic-layer",
    name: "dbtDataBuildToolSemanticLayerSkill",
    displayName: "dbt Data Build Tool Semantic Layer",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for dbt Data Build Tool Semantic Layer.",
    tags: ["dataKnowledge","knowledge","dbt","data"],
    transform: createStandardSkillTransform({
      sectionName: "dbt Semantic Layer Standards",
      ruSectionName: "Стандарты и практические требования: dbt Data Build Tool Semantic Layer",
      instructions: [
        "Apply core domain tenets and industry best practices for dbt Data Build Tool Semantic Layer.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для dbt Data Build Tool Semantic Layer.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","dbt","data"],
    }),
  },

  "data-knowledge-duckdb-in-memory-olap-query-engine": {
    id: "data-knowledge-duckdb-in-memory-olap-query-engine",
    name: "DuckDBInMemoryOLAPQueryEngineSkill",
    displayName: "DuckDB In-Memory OLAP Query Engine",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for DuckDB In-Memory OLAP Query Engine.",
    tags: ["dataKnowledge","knowledge","duckdb","in"],
    transform: createStandardSkillTransform({
      sectionName: "DuckDB In-Memory Analytics Protocol",
      ruSectionName: "Стандарты и практические требования: DuckDB In-Memory OLAP Query Engine",
      instructions: [
        "Apply core domain tenets and industry best practices for DuckDB In-Memory OLAP Query Engine.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для DuckDB In-Memory OLAP Query Engine.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","duckdb","in"],
    }),
  },

  "data-knowledge-knowledge-graph-rdf-triple-sparql-store": {
    id: "data-knowledge-knowledge-graph-rdf-triple-sparql-store",
    name: "KnowledgeGraphRDFTripleSparqlStoreSkill",
    displayName: "Knowledge Graph RDF Triple Sparql Store",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Knowledge Graph RDF Triple Sparql Store.",
    tags: ["dataKnowledge","knowledge","knowledge","graph"],
    transform: createStandardSkillTransform({
      sectionName: "Knowledge Graph RDF SPARQL Standards",
      ruSectionName: "Стандарты и практические требования: Knowledge Graph RDF Triple Sparql Store",
      instructions: [
        "Apply core domain tenets and industry best practices for Knowledge Graph RDF Triple Sparql Store.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Knowledge Graph RDF Triple Sparql Store.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","knowledge","graph"],
    }),
  },

  "data-knowledge-data-lineage-openlineage-metadata": {
    id: "data-knowledge-data-lineage-openlineage-metadata",
    name: "DataLineageOpenLineageMetadataSkill",
    displayName: "Data Lineage OpenLineage Metadata",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Data Lineage OpenLineage Metadata.",
    tags: ["dataKnowledge","knowledge","data","lineage"],
    transform: createStandardSkillTransform({
      sectionName: "Data Lineage & Metadata Standards",
      ruSectionName: "Стандарты и практические требования: Data Lineage OpenLineage Metadata",
      instructions: [
        "Apply core domain tenets and industry best practices for Data Lineage OpenLineage Metadata.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Data Lineage OpenLineage Metadata.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","data","lineage"],
    }),
  },

  "data-knowledge-snowflake-micro-partition-pruning": {
    id: "data-knowledge-snowflake-micro-partition-pruning",
    name: "SnowflakeMicroPartitionPruningSkill",
    displayName: "Snowflake Micro-Partition Pruning",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Snowflake Micro-Partition Pruning.",
    tags: ["dataKnowledge","knowledge","snowflake","micro"],
    transform: createStandardSkillTransform({
      sectionName: "Snowflake Partition Pruning Guidelines",
      ruSectionName: "Стандарты и практические требования: Snowflake Micro-Partition Pruning",
      instructions: [
        "Apply core domain tenets and industry best practices for Snowflake Micro-Partition Pruning.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Snowflake Micro-Partition Pruning.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","snowflake","micro"],
    }),
  },

  "data-knowledge-delta-lake-acid-transaction-log": {
    id: "data-knowledge-delta-lake-acid-transaction-log",
    name: "DeltaLakeACIDTransactionLogSkill",
    displayName: "Delta Lake ACID Transaction Log",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Delta Lake ACID Transaction Log.",
    tags: ["dataKnowledge","knowledge","delta","lake"],
    transform: createStandardSkillTransform({
      sectionName: "Delta Lake ACID Standards",
      ruSectionName: "Стандарты и практические требования: Delta Lake ACID Transaction Log",
      instructions: [
        "Apply core domain tenets and industry best practices for Delta Lake ACID Transaction Log.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Delta Lake ACID Transaction Log.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","delta","lake"],
    }),
  },

  "data-knowledge-redis-hyperloglog-cardinality-estimation": {
    id: "data-knowledge-redis-hyperloglog-cardinality-estimation",
    name: "RedisHyperLogLogCardinalityEstimationSkill",
    displayName: "Redis HyperLogLog Cardinality Estimation",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Redis HyperLogLog Cardinality Estimation.",
    tags: ["dataKnowledge","knowledge","redis","hyperloglog"],
    transform: createStandardSkillTransform({
      sectionName: "HyperLogLog Cardinality Protocol",
      ruSectionName: "Стандарты и практические требования: Redis HyperLogLog Cardinality Estimation",
      instructions: [
        "Apply core domain tenets and industry best practices for Redis HyperLogLog Cardinality Estimation.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Redis HyperLogLog Cardinality Estimation.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","redis","hyperloglog"],
    }),
  },

  "data-knowledge-clickhouse-mergetree-columnar-partitioning": {
    id: "data-knowledge-clickhouse-mergetree-columnar-partitioning",
    name: "ClickHouseMergeTreeColumnarPartitioningSkill",
    displayName: "ClickHouse MergeTree Columnar Partitioning",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for ClickHouse MergeTree Columnar Partitioning.",
    tags: ["dataKnowledge","knowledge","clickhouse","mergetree"],
    transform: createStandardSkillTransform({
      sectionName: "ClickHouse MergeTree Architecture",
      ruSectionName: "Стандарты и практические требования: ClickHouse MergeTree Columnar Partitioning",
      instructions: [
        "Apply core domain tenets and industry best practices for ClickHouse MergeTree Columnar Partitioning.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для ClickHouse MergeTree Columnar Partitioning.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","clickhouse","mergetree"],
    }),
  },

  "data-knowledge-kafka-schema-registry-avro-serialization": {
    id: "data-knowledge-kafka-schema-registry-avro-serialization",
    name: "KafkaSchemaRegistryAvroSerializationSkill",
    displayName: "Kafka Schema Registry Avro Serialization",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Kafka Schema Registry Avro Serialization.",
    tags: ["dataKnowledge","knowledge","kafka","schema"],
    transform: createStandardSkillTransform({
      sectionName: "Schema Registry Avro Standards",
      ruSectionName: "Стандарты и практические требования: Kafka Schema Registry Avro Serialization",
      instructions: [
        "Apply core domain tenets and industry best practices for Kafka Schema Registry Avro Serialization.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Kafka Schema Registry Avro Serialization.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","kafka","schema"],
    }),
  },

  "data-knowledge-data-quality-great-expectations-assertion": {
    id: "data-knowledge-data-quality-great-expectations-assertion",
    name: "DataQualityGreatExpectationsAssertionSkill",
    displayName: "Data Quality Great Expectations Assertion",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Data Quality Great Expectations Assertion.",
    tags: ["dataKnowledge","knowledge","data","quality"],
    transform: createStandardSkillTransform({
      sectionName: "Great Expectations Data Quality Rules",
      ruSectionName: "Стандарты и практические требования: Data Quality Great Expectations Assertion",
      instructions: [
        "Apply core domain tenets and industry best practices for Data Quality Great Expectations Assertion.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Data Quality Great Expectations Assertion.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","data","quality"],
    }),
  },

  "data-knowledge-star-schema-kimbal-dimensional-modeling": {
    id: "data-knowledge-star-schema-kimbal-dimensional-modeling",
    name: "StarSchemaKimbalDimensionalModelingSkill",
    displayName: "Star Schema Kimbal Dimensional Modeling",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Star Schema Kimbal Dimensional Modeling.",
    tags: ["dataKnowledge","knowledge","star","schema"],
    transform: createStandardSkillTransform({
      sectionName: "Kimball Dimensional Modeling Standards",
      ruSectionName: "Стандарты и практические требования: Star Schema Kimbal Dimensional Modeling",
      instructions: [
        "Apply core domain tenets and industry best practices for Star Schema Kimbal Dimensional Modeling.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Star Schema Kimbal Dimensional Modeling.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","star","schema"],
    }),
  },

  "data-knowledge-vector-embedding-cosine-similarity-search": {
    id: "data-knowledge-vector-embedding-cosine-similarity-search",
    name: "VectorEmbeddingCosineSimilaritySearchSkill",
    displayName: "Vector Embedding Cosine Similarity Search",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Vector Embedding Cosine Similarity Search.",
    tags: ["dataKnowledge","knowledge","vector","embedding"],
    transform: createStandardSkillTransform({
      sectionName: "Vector Embedding Similarity Protocol",
      ruSectionName: "Стандарты и практические требования: Vector Embedding Cosine Similarity Search",
      instructions: [
        "Apply core domain tenets and industry best practices for Vector Embedding Cosine Similarity Search.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Vector Embedding Cosine Similarity Search.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","vector","embedding"],
    }),
  },

  "data-knowledge-feature-store-feast-machine-learning-pipeline": {
    id: "data-knowledge-feature-store-feast-machine-learning-pipeline",
    name: "FeatureStoreFeastMachineLearningPipelineSkill",
    displayName: "Feature Store Feast Machine Learning Pipeline",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Feature Store Feast Machine Learning Pipeline.",
    tags: ["dataKnowledge","knowledge","feature","store"],
    transform: createStandardSkillTransform({
      sectionName: "Feature Store Feast Protocol",
      ruSectionName: "Стандарты и практические требования: Feature Store Feast Machine Learning Pipeline",
      instructions: [
        "Apply core domain tenets and industry best practices for Feature Store Feast Machine Learning Pipeline.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Feature Store Feast Machine Learning Pipeline.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","feature","store"],
    }),
  },

  "data-knowledge-graphql-mesh-unified-subgraph-federation": {
    id: "data-knowledge-graphql-mesh-unified-subgraph-federation",
    name: "GraphQLMeshUnifiedSubgraphFederationSkill",
    displayName: "GraphQL Mesh Unified Subgraph Federation",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for GraphQL Mesh Unified Subgraph Federation.",
    tags: ["dataKnowledge","knowledge","graphql","mesh"],
    transform: createStandardSkillTransform({
      sectionName: "GraphQL Mesh Federation Standards",
      ruSectionName: "Стандарты и практические требования: GraphQL Mesh Unified Subgraph Federation",
      instructions: [
        "Apply core domain tenets and industry best practices for GraphQL Mesh Unified Subgraph Federation.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для GraphQL Mesh Unified Subgraph Federation.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","graphql","mesh"],
    }),
  },

  "data-knowledge-apache-flink-stateful-stream-processing": {
    id: "data-knowledge-apache-flink-stateful-stream-processing",
    name: "ApacheFlinkStatefulStreamProcessingSkill",
    displayName: "Apache Flink Stateful Stream Processing",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Apache Flink Stateful Stream Processing.",
    tags: ["dataKnowledge","knowledge","apache","flink"],
    transform: createStandardSkillTransform({
      sectionName: "Flink Stream Processing Protocol",
      ruSectionName: "Стандарты и практические требования: Apache Flink Stateful Stream Processing",
      instructions: [
        "Apply core domain tenets and industry best practices for Apache Flink Stateful Stream Processing.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Apache Flink Stateful Stream Processing.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","apache","flink"],
    }),
  },

  "data-knowledge-postgres-foreign-data-wrapper-fdw": {
    id: "data-knowledge-postgres-foreign-data-wrapper-fdw",
    name: "PostgresForeignDataWrapperFDWSkill",
    displayName: "Postgres Foreign Data Wrapper (FDW)",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Postgres Foreign Data Wrapper (FDW).",
    tags: ["dataKnowledge","knowledge","postgres","foreign"],
    transform: createStandardSkillTransform({
      sectionName: "Postgres FDW Integration Standards",
      ruSectionName: "Стандарты и практические требования: Postgres Foreign Data Wrapper (FDW)",
      instructions: [
        "Apply core domain tenets and industry best practices for Postgres Foreign Data Wrapper (FDW).",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Postgres Foreign Data Wrapper (FDW).",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","postgres","foreign"],
    }),
  },

  "data-knowledge-data-privacy-differential-privacy-anonymization": {
    id: "data-knowledge-data-privacy-differential-privacy-anonymization",
    name: "DataPrivacyDifferentialPrivacyAnonymizationSkill",
    displayName: "Data Privacy Differential Privacy Anonymization",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Data Privacy Differential Privacy Anonymization.",
    tags: ["dataKnowledge","knowledge","data","privacy"],
    transform: createStandardSkillTransform({
      sectionName: "Differential Privacy Anonymization Protocol",
      ruSectionName: "Стандарты и практические требования: Data Privacy Differential Privacy Anonymization",
      instructions: [
        "Apply core domain tenets and industry best practices for Data Privacy Differential Privacy Anonymization.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Data Privacy Differential Privacy Anonymization.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","data","privacy"],
    }),
  },

  "data-knowledge-master-data-management-mdm-golden-record": {
    id: "data-knowledge-master-data-management-mdm-golden-record",
    name: "MasterDataManagementMDMGoldenRecordSkill",
    displayName: "Master Data Management MDM Golden Record",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Master Data Management MDM Golden Record.",
    tags: ["dataKnowledge","knowledge","master","data"],
    transform: createStandardSkillTransform({
      sectionName: "Master Data Golden Record Rules",
      ruSectionName: "Стандарты и практические требования: Master Data Management MDM Golden Record",
      instructions: [
        "Apply core domain tenets and industry best practices for Master Data Management MDM Golden Record.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Master Data Management MDM Golden Record.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","master","data"],
    }),
  },

  "data-knowledge-apache-arrow-zero-copy-memory-format": {
    id: "data-knowledge-apache-arrow-zero-copy-memory-format",
    name: "ApacheArrowZeroCopyMemoryFormatSkill",
    displayName: "Apache Arrow Zero-Copy Memory Format",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Apache Arrow Zero-Copy Memory Format.",
    tags: ["dataKnowledge","knowledge","apache","arrow"],
    transform: createStandardSkillTransform({
      sectionName: "Apache Arrow Memory Standards",
      ruSectionName: "Стандарты и практические требования: Apache Arrow Zero-Copy Memory Format",
      instructions: [
        "Apply core domain tenets and industry best practices for Apache Arrow Zero-Copy Memory Format.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Apache Arrow Zero-Copy Memory Format.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","apache","arrow"],
    }),
  },

  "data-knowledge-elasticsearch-bm25-relevance-scoring": {
    id: "data-knowledge-elasticsearch-bm25-relevance-scoring",
    name: "ElasticsearchBM25RelevanceScoringSkill",
    displayName: "Elasticsearch BM25 Relevance Scoring",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Elasticsearch BM25 Relevance Scoring.",
    tags: ["dataKnowledge","knowledge","elasticsearch","bm25"],
    transform: createStandardSkillTransform({
      sectionName: "Elasticsearch BM25 Search Standards",
      ruSectionName: "Стандарты и практические требования: Elasticsearch BM25 Relevance Scoring",
      instructions: [
        "Apply core domain tenets and industry best practices for Elasticsearch BM25 Relevance Scoring.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Elasticsearch BM25 Relevance Scoring.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","elasticsearch","bm25"],
    }),
  },

  "data-knowledge-time-series-timescaledb-continuous-aggregation": {
    id: "data-knowledge-time-series-timescaledb-continuous-aggregation",
    name: "TimeSeriesTimescaleDBContinuousAggregationSkill",
    displayName: "Time-Series TimescaleDB Continuous Aggregation",
    categoryId: 'data_knowledge',
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Time-Series TimescaleDB Continuous Aggregation.",
    tags: ["dataKnowledge","knowledge","time","series"],
    transform: createStandardSkillTransform({
      sectionName: "TimescaleDB Continuous Aggregates",
      ruSectionName: "Стандарты и практические требования: Time-Series TimescaleDB Continuous Aggregation",
      instructions: [
        "Apply core domain tenets and industry best practices for Time-Series TimescaleDB Continuous Aggregation.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Time-Series TimescaleDB Continuous Aggregation.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dataKnowledge","knowledge","time","series"],
    }),
  },
  "data-knowledge-hybrid-search-bm25-dense-fusion": {
    id: "data-knowledge-hybrid-search-bm25-dense-fusion",
    name: "DataKnowledgeHybridSearchBm25DenseFusionSkill",
    displayName: "Hybrid Search Fusion: Sparse Lexical (BM25) + Dense Vector Embeddings",
    categoryId: 'data_knowledge',
    description: "Combines exact keyword keyword matching (BM25) and semantic vector similarity using Reciprocal Rank Fusion (RRF).",
    tags: ["data-knowledge","hybrid-search","bm25","vector-search","rrf","rag"],
    transform: createStandardSkillTransform({
      sectionName: "Hybrid Search & Reciprocal Rank Fusion Protocol",
      ruSectionName: "Гибридный поиск: объединение лексического BM25 и векторных эмбеддингов (RRF)",
      instructions: [
        "Execute parallel searches across BM25 inverted keyword index and dense HNSW vector index.",
        "Normalize and merge rank positions via Reciprocal Rank Fusion: $RRFScore(d) = \\sum \\frac{1}{k + rank(d)}$.",
        "Return unified top-K documents balancing precise keyword exactness with semantic conceptual recall."
],
      ruInstructions: [
        "Выполняйте параллельный запрос по лексическому индексу BM25 и векторному индексу HNSW.",
        "Объединяйте результаты по формуле Reciprocal Rank Fusion (RRF) с константой сглаживания $k=60$.",
        "Возвращайте итоговый топ-K документов, сочетающий точные совпадения терминов и семантическую релевантность."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","hybrid-search","bm25","vector-search","rrf","rag"],
    }),
  },

  "data-knowledge-graphrag-knowledge-graph-synthesis": {
    id: "data-knowledge-graphrag-knowledge-graph-synthesis",
    name: "DataKnowledgeGraphragKnowledgeGraphSynthesisSkill",
    displayName: "GraphRAG: Knowledge Graph Entity Extraction & Community Summaries",
    categoryId: 'data_knowledge',
    description: "Extracts entity nodes, relationship edges, and hierarchical community clusters from unstructured text for deep global RAG reasoning.",
    tags: ["data-knowledge","graphrag","knowledge-graph","rag","entity-extraction"],
    transform: createStandardSkillTransform({
      sectionName: "GraphRAG Knowledge Graph Synthesis Architecture",
      ruSectionName: "GraphRAG: Извлечение графа сущностей и кластеризация сообществ для глубокого RAG",
      instructions: [
        "Extract structured Entity nodes and Relationship edges with supporting source text citations.",
        "Partition the entity graph into hierarchical communities using the Leiden community detection algorithm.",
        "Pre-generate comprehensive community summaries to answer high-level holistic dataset queries."
],
      ruInstructions: [
        "Извлекайте сущности (Entity) и типы связей (Relationships) с цитатами из исходного текста.",
        "Кластеризуйте граф знаний на сообщества с помощью алгоритма Лейдена (Leiden Detection).",
        "Генерируйте сводные описания сообществ для ответов на глобальные вопросы по всему корпусу документов."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","graphrag","knowledge-graph","rag","entity-extraction"],
    }),
  },

  "data-knowledge-hierarchical-parent-child-chunking": {
    id: "data-knowledge-hierarchical-parent-child-chunking",
    name: "DataKnowledgeHierarchicalParentChildChunkingSkill",
    displayName: "Hierarchical Document Indexing: Small Chunk Search, Large Parent Retrieval",
    categoryId: 'data_knowledge',
    description: "Indexes granular 200-token child chunks for precision vector retrieval while passing rich 1500-token parent context to the LLM.",
    tags: ["data-knowledge","chunking","parent-document-retriever","rag","vector-search"],
    transform: createStandardSkillTransform({
      sectionName: "Hierarchical Parent-Child Chunking Standards",
      ruSectionName: "Иерархический чанкинг: поиск по мелким фрагментам, передача полного родительского контекста",
      instructions: [
        "Split source documents into 1500-token Parent Chunks and subdivide each into 200-token Child Chunks.",
        "Generate embeddings exclusively for the fine-grained child chunks to maximize semantic query similarity.",
        "Retrieve and pass the full parent document chunk to the LLM prompt to preserve complete surrounding context."
],
      ruInstructions: [
        "Разбивайте документы на крупные родительские блоки (1500 токенов) и вложенные дочерние чанки (200 токенов).",
        "Стройте векторные эмбеддинги по мелким чанкам для точного попадания поискового запроса.",
        "Передавайте в промпт модели полный родительский блок для сохранения целостного контекста."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","chunking","parent-document-retriever","rag","vector-search"],
    }),
  },

  "data-knowledge-scd-slowly-changing-dimensions": {
    id: "data-knowledge-scd-slowly-changing-dimensions",
    name: "DataKnowledgeScdSlowlyChangingDimensionsSkill",
    displayName: "Slowly Changing Dimensions (SCD Type 1, 2, 4) Data Warehouse Modeling",
    categoryId: 'data_knowledge',
    description: "Tracks historical changes in dimensional tables using Type 1 (overwrite), Type 2 (validity date ranges), and Type 4 (history tables).",
    tags: ["data-knowledge","scd","data-warehouse","kimball","sql"],
    transform: createStandardSkillTransform({
      sectionName: "Slowly Changing Dimensions (SCD) Standards",
      ruSectionName: "Медленно меняющиеся измерения (SCD Type 1, Type 2, Type 4) в DWH",
      instructions: [
        "SCD Type 1: Overwrite existing row attributes for error corrections without preserving history.",
        "SCD Type 2: Insert new row version with `valid_from`, `valid_to`, and `is_current = TRUE` flags.",
        "SCD Type 4: Maintain clean current dimension table and log historical changes to a separate audit table."
],
      ruInstructions: [
        "SCD Type 1: Перезапись значений для исправления опечаток без сохранения истории изменений.",
        "SCD Type 2: Добавление новой строки с полями `valid_from`, `valid_to` и флагом текущей версии `is_current`.",
        "SCD Type 4: Хранение актуального среза в основной таблице и логирование изменений в отдельную историю."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","scd","data-warehouse","kimball","sql"],
    }),
  },

  "data-knowledge-apache-arrow-zero-copy-ipc": {
    id: "data-knowledge-apache-arrow-zero-copy-ipc",
    name: "DataKnowledgeApacheArrowZeroCopyIpcSkill",
    displayName: "Apache Arrow Columnar In-Memory Format & Zero-Copy IPC Sharing",
    categoryId: 'data_knowledge',
    description: "Transfers multi-gigabyte data frames across Python, Rust, and Node.js processes with zero serialization overhead via Arrow IPC.",
    tags: ["data-knowledge","apache-arrow","zero-copy","columnar","performance"],
    transform: createStandardSkillTransform({
      sectionName: "Apache Arrow Zero-Copy Memory Standards",
      ruSectionName: "Колоночный формат Apache Arrow и передача данных в памяти без сериализации (Zero-Copy)",
      instructions: [
        "Align in-memory record batches strictly with Apache Arrow 64-byte aligned SIMD memory specifications.",
        "Share data across microservices via Arrow Flight RPC or memory-mapped files without JSON/Protobuf decoding.",
        "Execute vectorized analytical expressions directly on raw Arrow memory buffers."
],
      ruInstructions: [
        "Выравнивайте массивы данных по 64-байтной границе спецификации Apache Arrow для SIMD-векторизации.",
        "Передавайте данные между процессами через Arrow Flight RPC без накладных расходов на сериализацию.",
        "Выполняйте аналитические вычисления прямо по бинарным буферам памяти без распаковки в объекты."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","apache-arrow","zero-copy","columnar","performance"],
    }),
  },

  "data-knowledge-vector-quantization-hnsw-tuning": {
    id: "data-knowledge-vector-quantization-hnsw-tuning",
    name: "DataKnowledgeVectorQuantizationHnswTuningSkill",
    displayName: "Vector Quantization (Product Quantization PQ / Scalar SQ) & HNSW Memory Optimization",
    categoryId: 'data_knowledge',
    description: "Reduces vector database RAM footprint by 75-95% using 8-bit Scalar Quantization (SQ8) and Product Quantization (PQ) centroids.",
    tags: ["data-knowledge","vector-quantization","hnsw","product-quantization","vector-db"],
    transform: createStandardSkillTransform({
      sectionName: "Vector Index Quantization Standards",
      ruSectionName: "Квантование векторов (Scalar SQ8, Product Quantization PQ) и оптимизация памяти HNSW",
      instructions: [
        "Apply Scalar Quantization (SQ8) to compress 32-bit float vectors to 8-bit integers with <1% recall degradation.",
        "Use Product Quantization (PQ) to decompose 1536-dimensional vectors into compact sub-vector byte codes.",
        "Tune HNSW index parameters: `M=16` (bi-directional links) and `efConstruction=200` for optimal build/search balance."
],
      ruInstructions: [
        "Применяйте скалярное квантование (SQ8) для сжатия 32-битных векторов до 8 бит с сохранением 99% точности.",
        "Используйте Product Quantization (PQ) для разбиения многомерных векторов на компактные байтовые коды.",
        "Калибруйте параметры графа HNSW (`M=16`, `efSearch=64`) для баланса скорости поиска и расхода памяти."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","vector-quantization","hnsw","product-quantization","vector-db"],
    }),
  },

  "data-knowledge-dbt-semantic-layer-metrics": {
    id: "data-knowledge-dbt-semantic-layer-metrics",
    name: "DataKnowledgeDbtSemanticLayerMetricsSkill",
    displayName: "dbt Semantic Layer, MetricFlow & Centralized Metric Governance",
    categoryId: 'data_knowledge',
    description: "Defines single-source-of-truth business metrics (MRR, Churn, CAC) in YAML, querying dynamically across BI tools via MetricFlow.",
    tags: ["data-knowledge","dbt","semantic-layer","metricflow","analytics-engineering"],
    transform: createStandardSkillTransform({
      sectionName: "dbt Semantic Layer Metrics Standards",
      ruSectionName: "Семантический слой dbt (Semantic Layer & MetricFlow: единый источник бизнес-метрик)",
      instructions: [
        "Define dimensions, entities, and semantic metrics in modular dbt YAML configuration files.",
        "Enforce consistent calculation logic: preventing conflicting definitions of Revenue across sales vs finance dashboards.",
        "Expose semantic metrics via standard SQL / GraphQL APIs to downstream BI and AI querying agents."
],
      ruInstructions: [
        "Описывайте измерения, сущности и метрики в декларативных YAML-файлах проекта dbt.",
        "Обеспечивайте единый алгоритм расчета ключевых показателей (MRR, Churn) для всех отделов компании.",
        "Предоставляйте доступ к метрикам через единый интерфейс SQL/GraphQL для BI-систем и AI-агентов."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","dbt","semantic-layer","metricflow","analytics-engineering"],
    }),
  },

  "data-knowledge-parquet-compression-row-group-sizing": {
    id: "data-knowledge-parquet-compression-row-group-sizing",
    name: "DataKnowledgeParquetCompressionRowGroupSizingSkill",
    displayName: "Apache Parquet Row Group Sizing, Dictionary Encoding & ZSTD Compression",
    categoryId: 'data_knowledge',
    description: "Optimizes analytical data lake storage by tuning Parquet row group sizes (128MB-512MB), dictionary encoding, and ZSTD compression levels.",
    tags: ["data-knowledge","parquet","compression","data-lake","zstd"],
    transform: createStandardSkillTransform({
      sectionName: "Parquet Columnar Storage Optimization Standards",
      ruSectionName: "Оптимизация файлов Apache Parquet (Размер Row Group, Dictionary Encoding, ZSTD)",
      instructions: [
        "Size Parquet Row Groups between 128MB and 512MB to balance parallel reader threads with column chunk scanning.",
        "Enable Dictionary Encoding on low-cardinality string columns for 10x storage compression and instant filter pruning.",
        "Apply Zstandard (ZSTD level 3) compression for the optimal Pareto trade-off between write speed and compression ratio."
],
      ruInstructions: [
        "Устанавливайте размер Row Group от 128 МБ до 512 МБ для баланса параллельного чтения и пропускной способности.",
        "Включайте словарное сжатие (Dictionary Encoding) для строковых полей с низкой кардинальностью.",
        "Используйте алгоритм сжатия ZSTD (уровень 3) для достижения лучшего баланса скорости и размера файлов."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","parquet","compression","data-lake","zstd"],
    }),
  },

  "data-knowledge-master-data-management-record-linkage": {
    id: "data-knowledge-master-data-management-record-linkage",
    name: "DataKnowledgeMasterDataManagementRecordLinkageSkill",
    displayName: "Master Data Management (MDM) & Probabilistic Record Linkage (Fellegi-Sunter)",
    categoryId: 'data_knowledge',
    description: "Merges duplicate customer records across disparate enterprise databases using Jaro-Winkler fuzzy matching and Fellegi-Sunter weights.",
    tags: ["data-knowledge","mdm","record-linkage","fuzzy-matching","data-quality"],
    transform: createStandardSkillTransform({
      sectionName: "Master Data Record Linkage Standards",
      ruSectionName: "Управление мастер-данными (MDM) и вероятностное объединение дубликатов (Fellegi-Sunter)",
      instructions: [
        "Calculate string similarity distance using Jaro-Winkler, Levenshtein, and Double Metaphone phonetic algorithms.",
        "Assign probabilistic match weights to field pairs (name, address, email, phone) to classify matches (Auto-Merge, Manual Review, Non-Match).",
        "Construct an immutable Golden Record maintaining explicit lineage pointers back to source database IDs."
],
      ruInstructions: [
        "Рассчитывайте сходство записей с помощью алгоритмов Яро-Винклера, Левенштейна и фонетического Double Metaphone.",
        "Применяйте вероятностные веса совпадения полей для автоматического объединения или ручной модерации.",
        "Формируйте эталонную запись (Golden Record) с сохранением ссылок на первичные идентификаторы источников."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","mdm","record-linkage","fuzzy-matching","data-quality"],
    }),
  },

  "data-knowledge-automated-pii-data-masking-compliance": {
    id: "data-knowledge-automated-pii-data-masking-compliance",
    name: "DataKnowledgeAutomatedPiiDataMaskingComplianceSkill",
    displayName: "Automated PII Entity Detection, Pseudonymization & Dynamic Data Masking",
    categoryId: 'data_knowledge',
    description: "Detects personally identifiable information (emails, SSNs, credit cards) via regex and NER models, applying irreversible SHA-256 salting or masking.",
    tags: ["data-knowledge","pii","data-masking","compliance","gdpr","security"],
    transform: createStandardSkillTransform({
      sectionName: "PII Detection & Data Masking Standards",
      ruSectionName: "Автоматическое обнаружение и маскирование персональных данных (PII / GDPR)",
      instructions: [
        "Scan incoming data streams with high-precision Regex and Named Entity Recognition (NER) models for PII patterns.",
        "Replace sensitive identifiers with cryptographically salted HMAC hashes or format-preserving tokenized placeholders.",
        "Enforce dynamic role-based data masking (e.g. `****-****-****-1234`) on analytical SQL query results."
],
      ruInstructions: [
        "Сканируйте входящие данные с помощью регулярных выражений и моделей NER для поиска персональных данных.",
        "Заменяйте чувствительные поля на криптографические HMAC-хэши с солью или псевдонимы с сохранением формата.",
        "Внедряйте динамическое маскирование данных в зависимости от роли аналитика (например, `****-****-1234`)."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","pii","data-masking","compliance","gdpr","security"],
    }),
  },
  "data-knowledge-clickhouse-mergetree-partition-pruning": {
    id: "data-knowledge-clickhouse-mergetree-partition-pruning",
    name: "DataKnowledgeClickhouseMergetreePartitionPruningSkill",
    displayName: "ClickHouse MergeTree Primary Key Indexing & Granule Skipping",
    categoryId: 'data_knowledge',
    description: "Accelerates billion-row real-time analytical queries by optimizing ClickHouse Primary Keys and 8192-row sparse index granules.",
    tags: ["data-knowledge","clickhouse","olap","sparse-index","analytics"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["data-knowledge","clickhouse","olap","sparse-index","analytics"],
    }),
  },

  "data-knowledge-duckdb-spatial-parquet-analytics": {
    id: "data-knowledge-duckdb-spatial-parquet-analytics",
    name: "DataKnowledgeDuckdbSpatialParquetAnalyticsSkill",
    displayName: "DuckDB Embedded OLAP: In-Memory SQL & Geospatial Parquet Analytics",
    categoryId: 'data_knowledge',
    description: "Executes ultra-fast vectorized SQL queries directly against local and remote S3 Parquet files without external database servers.",
    tags: ["data-knowledge","duckdb","olap","parquet","spatial-sql","embedded"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["data-knowledge","duckdb","olap","parquet","spatial-sql","embedded"],
    }),
  },

  "data-knowledge-great-expectations-data-quality-suite": {
    id: "data-knowledge-great-expectations-data-quality-suite",
    name: "DataKnowledgeGreatExpectationsDataQualitySuiteSkill",
    displayName: "Great Expectations Automated Data Quality & Schema Assertions",
    categoryId: 'data_knowledge',
    description: "Enforces data quality contracts on analytical pipelines with automated assertions: null bounds, value ranges, and regex matches.",
    tags: ["data-knowledge","data-quality","great-expectations","data-contracts","testing"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["data-knowledge","data-quality","great-expectations","data-contracts","testing"],
    }),
  },

  "data-knowledge-openlineage-metadata-provenance": {
    id: "data-knowledge-openlineage-metadata-provenance",
    name: "DataKnowledgeOpenlineageMetadataProvenanceSkill",
    displayName: "OpenLineage Data Provenance & Column-Level Dependency Graph",
    categoryId: 'data_knowledge',
    description: "Tracks end-to-end data lineage from raw Kafka events through Airflow DAGs and dbt models to final executive dashboards.",
    tags: ["data-knowledge","openlineage","data-lineage","metadata","governance"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["data-knowledge","openlineage","data-lineage","metadata","governance"],
    }),
  },

  "data-knowledge-timeseries-continuous-aggregates": {
    id: "data-knowledge-timeseries-continuous-aggregates",
    name: "DataKnowledgeTimeseriesContinuousAggregatesSkill",
    displayName: "TimescaleDB Continuous Aggregates & Tiered Data Retention",
    categoryId: 'data_knowledge',
    description: "Maintains real-time rollups (hourly/daily metrics) over billions of time-series records with automated retention downsampling.",
    tags: ["data-knowledge","timeseries","timescaledb","continuous-aggregates","iot"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["data-knowledge","timeseries","timescaledb","continuous-aggregates","iot"],
    }),
  },

  "data-knowledge-redis-hyperloglog-cardinality": {
    id: "data-knowledge-redis-hyperloglog-cardinality",
    name: "DataKnowledgeRedisHyperloglogCardinalitySkill",
    displayName: "Redis HyperLogLog (HLL) Probabilistic Unique Count Estimation",
    categoryId: 'data_knowledge',
    description: "Counts hundreds of millions of unique daily active users (DAU) in constant 12KB memory with <0.81% standard error via HyperLogLog.",
    tags: ["data-knowledge","hyperloglog","redis","probabilistic","cardinality"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["data-knowledge","hyperloglog","redis","probabilistic","cardinality"],
    }),
  },

  "data-knowledge-debezium-cdc-streaming-lakehouse": {
    id: "data-knowledge-debezium-cdc-streaming-lakehouse",
    name: "DataKnowledgeDebeziumCdcStreamingLakehouseSkill",
    displayName: "Change Data Capture (CDC) Real-Time Lakehouse Streaming (Debezium + Apache Iceberg)",
    categoryId: 'data_knowledge',
    description: "Streams PostgreSQL/MySQL row mutations directly into Iceberg/Delta Lake tables with sub-minute query latency.",
    tags: ["data-knowledge","cdc","debezium","iceberg","lakehouse","real-time"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["data-knowledge","cdc","debezium","iceberg","lakehouse","real-time"],
    }),
  },

  "data-knowledge-star-schema-snowflake-dimension": {
    id: "data-knowledge-star-schema-snowflake-dimension",
    name: "DataKnowledgeStarSchemaSnowflakeDimensionSkill",
    displayName: "Star Schema vs Snowflake Dimensional Modeling (Facts & Conformed Dimensions)",
    categoryId: 'data_knowledge',
    description: "Designs denormalized dimensional data models balancing query join performance, storage redundancy, and BI navigation ease.",
    tags: ["data-knowledge","star-schema","data-modeling","dimensional","bi"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["data-knowledge","star-schema","data-modeling","dimensional","bi"],
    }),
  },

  "data-knowledge-differential-privacy-epsilon-laplace": {
    id: "data-knowledge-differential-privacy-epsilon-laplace",
    name: "DataKnowledgeDifferentialPrivacyEpsilonLaplaceSkill",
    displayName: "Differential Privacy: Epsilon Privacy Budgets & Laplace Noise Injection",
    categoryId: 'data_knowledge',
    description: "Protects individual user privacy in analytical aggregates by injecting calibrated mathematical Laplace noise within an epsilon ($epsilon$) privacy budget.",
    tags: ["data-knowledge","differential-privacy","privacy","laplace-noise","compliance"],
    transform: createStandardSkillTransform({
      sectionName: "Differential Privacy Standards",
      ruSectionName: "Дифференциальная приватность (Differential Privacy: добавление шума Лапласа и бюджет $epsilon$)",
      instructions: [
        "Calculate global sensitivity ($Delta f$) for the target aggregate function (count, sum, mean).",
        "Inject calibrated random noise drawn from Laplace distribution: $Lap(\\Delta f / \\epsilon)$.",
        "Track and enforce cumulative privacy budget ($epsilon$) per user session, denying queries upon budget exhaustion."
],
      ruInstructions: [
        "Рассчитывайте чувствительность функции ($Delta f$) для агрегатных запросов (количество, сумма, среднее).",
        "Добавляйте калиброванный случайный шум из распределения Лапласа $Lap(\\Delta f / \\epsilon)$.",
        "Ведите учет суммарного бюджета приватности ($epsilon$) на пользователя, блокируя запросы при его исчерпании."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","differential-privacy","privacy","laplace-noise","compliance"],
    }),
  },

  "data-knowledge-graph-database-cypher-query-optimization": {
    id: "data-knowledge-graph-database-cypher-query-optimization",
    name: "DataKnowledgeGraphDatabaseCypherQueryOptimizationSkill",
    displayName: "Neo4j Cypher Graph Query Optimization & Variable-Length Path Traversal",
    categoryId: 'data_knowledge',
    description: "Tunes Cypher path queries, index lookups, and relationship directionality to traverse multi-hop graphs in sub-millisecond time.",
    tags: ["data-knowledge","graph-database","neo4j","cypher","knowledge-graph"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["data-knowledge","graph-database","neo4j","cypher","knowledge-graph"],
    }),
  },
  "data-knowledge-iceberg-schema-evolution-partition-spec": {
    id: "data-knowledge-iceberg-schema-evolution-partition-spec",
    name: "DataKnowledgeIcebergSchemaEvolutionPartitionSpecSkill",
    displayName: "Apache Iceberg In-Place Schema Evolution & Hidden Partitioning",
    categoryId: 'data_knowledge',
    description: "Evolves data lake schemas (add/rename/drop columns) and updates partition specs with zero table rewrites via Iceberg metadata.",
    tags: ["data-knowledge","iceberg","schema-evolution","hidden-partitioning","data-lakehouse"],
    transform: createStandardSkillTransform({
      sectionName: "Apache Iceberg Schema Evolution Standards",
      ruSectionName: "Эволюция схем в Apache Iceberg (Переименование колонок и скрытое партиционирование)",
      instructions: [
        "Assign unique permanent integer IDs to columns, enabling column renames without data rewriting.",
        "Apply Hidden Partitioning transforms (e.g. `days(ts)`, `bucket(16, id)`) transparent to user SQL queries.",
        "Perform time-travel queries across historical snapshot IDs: `SELECT * FROM table VERSION AS OF 12345`."
],
      ruInstructions: [
        "Присваивайте колонкам постоянные уникальные ID для переименования полей без перезаписи данных.",
        "Используйте скрытое партиционирование (`days(ts)`), избавляя аналитиков от ручных фильтров по папкам.",
        "Выполняйте запросы Time-Travel к историческим снимкам данных: `VERSION AS OF <snapshot_id>`."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","iceberg","schema-evolution","hidden-partitioning","data-lakehouse"],
    }),
  },

  "data-knowledge-reciprocal-rank-fusion-rrf-k60": {
    id: "data-knowledge-reciprocal-rank-fusion-rrf-k60",
    name: "DataKnowledgeReciprocalRankFusionRrfK60Skill",
    displayName: "Reciprocal Rank Fusion (RRF k=60) Multi-Retriever Ensemble",
    categoryId: 'data_knowledge',
    description: "Ensembles search results from multiple disparate retrievers (dense, sparse, knowledge graph) using rank reciprocal scoring.",
    tags: ["data-knowledge","rrf","search-ensemble","rag","retrieval"],
    transform: createStandardSkillTransform({
      sectionName: "Reciprocal Rank Fusion Ensemble Protocol",
      ruSectionName: "Ансамбль поисковых систем Reciprocal Rank Fusion (RRF с константой k=60)",
      instructions: [
        "Extract integer rank positions ($r_i$) for each document across individual search engine result lists.",
        "Calculate score: $RRF(d) = \\sum_{m \\in models} \\frac{1}{60 + r_m(d)}$.",
        "Sort merged candidate pool descending by RRF score to select final top-K documents."
],
      ruInstructions: [
        "Определяйте порядковый номер ранга ($r_i$) для каждого документа в каждом поисковом источнике.",
        "Суммируйте скоры по формуле: $RRF(d) = \\sum \\frac{1}{60 + rank(d)}$.",
        "Сортируйте объединенный список по убыванию RRF для отбора финального топ-K контекста."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","rrf","search-ensemble","rag","retrieval"],
    }),
  },

  "data-knowledge-semantic-chunking-embedding-distance": {
    id: "data-knowledge-semantic-chunking-embedding-distance",
    name: "DataKnowledgeSemanticChunkingEmbeddingDistanceSkill",
    displayName: "Semantic Distance Chunking & Embedding Split Points",
    categoryId: 'data_knowledge',
    description: "Splits documents at natural semantic boundary transitions where consecutive sentence embedding cosine distance exceeds threshold.",
    tags: ["data-knowledge","semantic-chunking","embeddings","rag","nlp"],
    transform: createStandardSkillTransform({
      sectionName: "Semantic Embedding Distance Chunking Standards",
      ruSectionName: "Семантический чанкинг по косинусному расстоянию соседних предложений",
      instructions: [
        "Compute embedding vectors for sliding consecutive sentence pairs across the document.",
        "Calculate cosine distance deltas; place chunk split points at local distance spike peaks exceeding percentile threshold (95th percentile).",
        "Keep semantically coherent paragraphs intact while separating distinct conceptual topic shifts."
],
      ruInstructions: [
        "Вычисляйте эмбеддинги для последовательных пар предложений по всему тексту документа.",
        "Находите локальные пики косинусного расстояния, сигнализирующие о смене темы повествования.",
        "Разделяйте текст в точках смысловых переходов, сохраняя логически связанные абзацы едиными."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","semantic-chunking","embeddings","rag","nlp"],
    }),
  },

  "data-knowledge-colbert-late-interaction-token-multivector": {
    id: "data-knowledge-colbert-late-interaction-token-multivector",
    name: "DataKnowledgeColbertLateInteractionTokenMultivectorSkill",
    displayName: "ColBERTv2 Late Interaction Token-Level Multi-Vector Retrieval",
    categoryId: 'data_knowledge',
    description: "Performs fine-grained retrieval by computing all-pairs MaxSim similarity between individual query and document token embedding matrices.",
    tags: ["data-knowledge","colbert","late-interaction","multivector","information-retrieval"],
    transform: createStandardSkillTransform({
      sectionName: "ColBERT Late Interaction Standards",
      ruSectionName: "Поиск с поздним взаимодействием ColBERTv2 (Потокеновые мультивекторы и MaxSim)",
      instructions: [
        "Generate independent token vector matrices for queries ($Q$) and document passages ($D$).",
        "Calculate late interaction relevance via MaxSim operator: $\\sum_{q \\in Q} \\max_{d \\in D} (q \\cdot d)$.",
        "Compress token vectors using residual centroid quantization to achieve millisecond search speed."
],
      ruInstructions: [
        "Формируйте матрицы потокеновых векторов для запроса и каждого фрагмента документа.",
        "Рассчитывайте релевантность через оператор MaxSim: сумма максимальных скалярных произведений токенов.",
        "Сжимайте векторы токенов через остаточное квантование (Residual Quantization) для экономии RAM."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","colbert","late-interaction","multivector","information-retrieval"],
    }),
  },

  "data-knowledge-zstandard-dictionary-compression-json": {
    id: "data-knowledge-zstandard-dictionary-compression-json",
    name: "DataKnowledgeZstandardDictionaryCompressionJsonSkill",
    displayName: "Zstandard (zstd) Pre-Trained Dictionary Compression for JSON Feeds",
    categoryId: 'data_knowledge',
    description: "Trains domain-specific 110KB ZSTD dictionaries over representative JSON payloads, achieving 5x higher compression ratios on small records.",
    tags: ["data-knowledge","zstd","compression","json","dictionary-training"],
    transform: createStandardSkillTransform({
      sectionName: "Zstandard Dictionary Compression Standards",
      ruSectionName: "Сжатие мелких JSON-записей через обученные словари Zstandard (ZSTD Dictionary)",
      instructions: [
        "Train a shared 110KB ZSTD dictionary over a sample corpus of 10,000 representative JSON payloads.",
        "Compress and decompress small records referencing the pre-shared dictionary ID.",
        "Achieve 80% size reduction on small 500-byte JSON records where standard gzip fails."
],
      ruInstructions: [
        "Обучайте общий словарь ZSTD размером 110 КБ на выборке из 10 000 типичных JSON-сообщений.",
        "Сжимайте и распаковывайте мелкие записи с указанием идентификатора обученного словаря.",
        "Достигайте 80% сжатия даже на коротких JSON-записях (до 500 байт), где gzip малоэффективен."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","zstd","compression","json","dictionary-training"],
    }),
  },

  "data-knowledge-sparql-knowledge-graph-ontology-w3c": {
    id: "data-knowledge-sparql-knowledge-graph-ontology-w3c",
    name: "DataKnowledgeSparqlKnowledgeGraphOntologyW3cSkill",
    displayName: "W3C RDF/OWL Knowledge Graph Ontologies & SPARQL 1.1 Query Engine",
    categoryId: 'data_knowledge',
    description: "Models enterprise domains in W3C OWL ontologies, executing expressive SPARQL pattern queries and RDFS inferencing.",
    tags: ["data-knowledge","sparql","rdf","owl","ontology","semantic-web"],
    transform: createStandardSkillTransform({
      sectionName: "W3C Semantic Graph Standards",
      ruSectionName: "Онтологии W3C RDF/OWL и графовые запросы SPARQL 1.1",
      instructions: [
        "Define formal Class hierarchies and Object/Datatype properties using W3C OWL2 vocabulary.",
        "Query relationship patterns using SPARQL 1.1 `SELECT`, `CONSTRUCT`, and `ASK` graph operators.",
        "Enable RDFS rule-based reasoning engines to materialize implicit domain relationships automatically."
],
      ruInstructions: [
        "Описывайте иерархии классов и свойства связей на формальном языке W3C OWL2.",
        "Составляйте графовые запросы на языке SPARQL 1.1 (`SELECT`, `CONSTRUCT`, `OPTIONAL`).",
        "Используйте движки логического вывода RDFS для автоматического раскрытия неявных связей."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","sparql","rdf","owl","ontology","semantic-web"],
    }),
  },

  "data-knowledge-feature-store-feast-online-offline": {
    id: "data-knowledge-feature-store-feast-online-offline",
    name: "DataKnowledgeFeatureStoreFeastOnlineOfflineSkill",
    displayName: "Feast Feature Store: Low-Latency Redis Online & BigQuery Offline Sync",
    categoryId: 'data_knowledge',
    description: "Maintains ML feature parity across offline batch training datasets (BigQuery/Snowflake) and sub-10ms online inference caches (Redis).",
    tags: ["data-knowledge","feature-store","feast","machine-learning","redis"],
    transform: createStandardSkillTransform({
      sectionName: "ML Feature Store Architecture",
      ruSectionName: "Хранилище фичей для ML (Feast Feature Store: Redis Online и BigQuery Offline)",
      instructions: [
        "Define feature views and entity keys in declarative Feast Python / YAML specifications.",
        "Materialize scheduled batch features incrementally to Redis for sub-10ms real-time model inference.",
        "Generate point-in-time correct historical feature matrices for offline training to prevent data leakage."
],
      ruInstructions: [
        "Определяйте фичи и ключи сущностей в декларативных конфигурациях Feast.",
        "Инкрементально материализуйте фичи в Redis для доступа модели в реальном времени (<10 мс).",
        "Формируйте исторические обучающие выборки с учетом временных меток (Point-in-Time) для защиты от утечки данных."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","feature-store","feast","machine-learning","redis"],
    }),
  },

  "data-knowledge-data-diff-automated-regression-testing": {
    id: "data-knowledge-data-diff-automated-regression-testing",
    name: "DataKnowledgeDataDiffAutomatedRegressionTestingSkill",
    displayName: "Automated Data-Diff Regression Testing & SQL Schema Migration Auditing",
    categoryId: 'data_knowledge',
    description: "Compares billion-row source and target tables row-by-row and column-by-column (Datafold / data-diff) to catch silent data corruption in CI/CD.",
    tags: ["data-knowledge","data-diff","testing","ci-cd","regression","dbt"],
    transform: createStandardSkillTransform({
      sectionName: "Data-Diff Regression Testing Standards",
      ruSectionName: "Автоматизированное сравнение датасетов (Data-Diff в CI/CD для выявления расхождений)",
      instructions: [
        "Hash row primary keys and column values into algorithmic checksum buckets to detect exact discrepancies.",
        "Run automated data-diff comparisons between production and staging tables during pull request CI runs.",
        "Block deployment if value discrepancies or unexplained row-count shifts exceed 0.00% tolerance."
],
      ruInstructions: [
        "Хэшируйте строки и значения полей в контрольные суммы для мгновенного поиска расхождений.",
        "Запускайте автоматическое сравнение таблиц продакшена и стейджинга при каждом пулл-реквесте в CI/CD.",
        "Блокируйте выкатку изменений при обнаружении несанкционированных искажений данных."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","data-diff","testing","ci-cd","regression","dbt"],
    }),
  },

  "data-knowledge-anomalous-data-drift-ks-test": {
    id: "data-knowledge-anomalous-data-drift-ks-test",
    name: "DataKnowledgeAnomalousDataDriftKsTestSkill",
    displayName: "Statistical Data Drift Detection: Kolmogorov-Smirnov & Population Stability Index (PSI)",
    categoryId: 'data_knowledge',
    description: "Monitors numerical distribution shift and categorical concept drift between baseline training distributions and live production feeds.",
    tags: ["data-knowledge","data-drift","ks-test","psi","monitoring","mlops"],
    transform: createStandardSkillTransform({
      sectionName: "Data Drift Detection Standards",
      ruSectionName: "Обнаружение дрейфа данных (Тест Колмогорова-Смирнова и индекс PSI)",
      instructions: [
        "Run two-sample Kolmogorov-Smirnov (KS) tests on continuous numerical features to detect statistical drift ($p < 0.05$).",
        "Calculate Population Stability Index (PSI) on binned features: alert when $PSI > 0.2$ indicates significant distribution change.",
        "Trigger automated retraining pipelines when feature drift crosses warning thresholds."
],
      ruInstructions: [
        "Применяйте двухвыборочный критерий Колмогорова-Смирнова для непрерывных числовых признаков ($p < 0.05$).",
        "Рассчитывайте индекс стабильности популяции (PSI): поднимайте тревогу при $PSI > 0.2$.",
        "Инициируйте автоматический пересчет статистик или переобучение моделей при фиксации дрейфа."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","data-drift","ks-test","psi","monitoring","mlops"],
    }),
  },

  "data-knowledge-geospatial-h3-hexagonal-indexing": {
    id: "data-knowledge-geospatial-h3-hexagonal-indexing",
    name: "DataKnowledgeGeospatialH3HexagonalIndexingSkill",
    displayName: "Uber H3 Spatial Hexagonal Hierarchical Spatial Indexing",
    categoryId: 'data_knowledge',
    description: "Indexes geographic coordinates into hierarchical hexagonal grid cells (resolutions 0-15) for $O(1)$ spatial aggregations and k-ring lookups.",
    tags: ["data-knowledge","h3","geospatial","hexagons","spatial-indexing","gis"],
    transform: createStandardSkillTransform({
      sectionName: "Uber H3 Spatial Indexing Standards",
      ruSectionName: "Геопространственная индексация Uber H3 (Иерархические шестиугольники и k-ring соседи)",
      instructions: [
        "Convert latitude/longitude coordinate pairs to 64-bit H3 integer cell indexes at resolution 8-9 (neighborhood level).",
        "Perform spatial radius searches using `H3.gridDisk(cell, k)` for constant $O(1)$ neighbor cell retrieval.",
        "Aggregate metrics across hexagonal hierarchies without boundary distortion common in square grids."
],
      ruInstructions: [
        "Преобразуйте координаты широты и долготы в 64-битные целочисленные индексы H3 (разрешение 8–9).",
        "Выполняйте поиск в радиусе через `gridDisk(cell, k)`, находя соседние соты за $O(1)$ без тригонометрии.",
        "Агрегируйте пространственные данные по гексагонам без искажений на границах, свойственных прямоугольным сеткам."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","h3","geospatial","hexagons","spatial-indexing","gis"],
    }),
  },

  "data-knowledge-bloom-filter-probabilistic-indexing": {
    id: "data-knowledge-bloom-filter-probabilistic-indexing",
    name: "DataKnowledgeBloomFilterProbabilisticIndexingSkill",
    displayName: "Probabilistic LSM-Tree Bloom Filters & Key Non-Existence Checks",
    categoryId: 'data_knowledge',
    description: "Tunes Bloom filter bit arrays and hash functions in RocksDB/Cassandra LSM storage to avoid expensive disk lookups for missing keys.",
    tags: ["data-knowledge","bloom-filter","lsm-tree","storage-engines","database-tuning"],
    transform: createStandardSkillTransform({
      sectionName: "Probabilistic Storage Indexing Standards",
      ruSectionName: "Фильтры Блума в LSM-деревьях (RocksDB / Cassandra: исключение лишних чтений с диска)",
      instructions: [
        "Size Bloom filter bit allocation to target 1% false positive probability: $m = -\\frac{n \\ln p}{(\\ln 2)^2}$ (approx 10 bits/key).",
        "Compute optimal number of Murmur3 hash functions: $k = \\frac{m}{n} \\ln 2$ (approx 7 hashes).",
        "Eliminate 99% of unnecessary SSTable disk reads for non-existent key lookups."
],
      ruInstructions: [
        "Рассчитывайте размер битового массива фильтра Блума для 1% вероятности ложных срабатываний (~10 бит на ключ).",
        "Используйте оптимальное число хэш-функций Murmur3 ($k = 7$) для равномерного распределения бит.",
        "Исключайте 99% ненужных обращений к диску при поиске отсутствующих ключей в таблицах SSTable."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","bloom-filter","lsm-tree","storage-engines","database-tuning"],
    }),
  },
  "data-knowledge-lakefs-git-for-data-branching": {
    id: "data-knowledge-lakefs-git-for-data-branching",
    name: "DataKnowledgeLakefsGitForDataBranchingSkill",
    displayName: "lakeFS: Git-Style Branching, Commits & Rollbacks for Object Storage Lakes",
    categoryId: 'data_knowledge',
    description: "Enables zero-copy Git workflows (branch, commit, merge, revert) over S3/GCS data lakes with ACID isolation guarantees.",
    tags: ["data-knowledge","lakefs","git-for-data","data-versioning","lakehouse"],
    transform: createStandardSkillTransform({
      sectionName: "lakeFS Data Versioning Standards",
      ruSectionName: "Версионирование данных в стиле Git (lakeFS: ветки, коммиты и атомарные слияния в S3)",
      instructions: [
        "Create zero-copy isolated branch (`lakefs branch create my-experiment`) for experimental data pipeline runs.",
        "Execute automated data quality validation hooks on the isolated branch before merging.",
        "Atomically merge verified data branch to main with instantaneous zero-downtime pointer update."
],
      ruInstructions: [
        "Создавайте изолированные ветки данных без копирования файлов для тестирования ETL-пайплайнов.",
        "Запускайте автоматические проверки качества данных на тестовой ветке перед слиянием.",
        "Атомарно вливайте проверенную ветку в основную (main) мгновенным переключением указателей метаданных."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","lakefs","git-for-data","data-versioning","lakehouse"],
    }),
  },

  "data-knowledge-snowflake-search-optimization-service": {
    id: "data-knowledge-snowflake-search-optimization-service",
    name: "DataKnowledgeSnowflakeSearchOptimizationServiceSkill",
    displayName: "Snowflake Search Optimization Service (SOS) & Point-Lookup Indexing",
    categoryId: 'data_knowledge',
    description: "Accelerates high-cardinality point-lookup queries on massive multi-terabyte Snowflake tables using persistent search access paths.",
    tags: ["data-knowledge","snowflake","search-optimization","point-lookups","cloud-data-warehouse"],
    transform: createStandardSkillTransform({
      sectionName: "Snowflake Search Optimization Standards",
      ruSectionName: "Сервис оптимизации поиска Snowflake (Search Optimization Service для точечных выборок)",
      instructions: [
        "Enable Search Optimization on high-cardinality predicate columns (e.g. `customer_uuid`, `ip_address`).",
        "Monitor Search Access Path build progress and compute maintenance credit consumption.",
        "Drastically cut query execution time from 45 seconds to sub-second on multi-billion row tables."
],
      ruInstructions: [
        "Включайте Search Optimization Service для колонок с высокой кардинальностью (UUID, IP-адреса).",
        "Отслеживайте статус построения поисковых структур и расход кредитов хранилища.",
        "Сокращайте время выполнения точечных запросов с десятков секунд до долей секунды на миллиардных таблицах."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","snowflake","search-optimization","point-lookups","cloud-data-warehouse"],
    }),
  },

  "data-knowledge-data-contracts-json-schema-protobuf": {
    id: "data-knowledge-data-contracts-json-schema-protobuf",
    name: "DataKnowledgeDataContractsJsonSchemaProtobufSkill",
    displayName: "Enterprise Data Contracts: Protobuf / JSON Schema Producers-Consumers SLA",
    categoryId: 'data_knowledge',
    description: "Establishes formal schema and freshness contracts between software engineering producers and data analytics consumers.",
    tags: ["data-knowledge","data-contracts","protobuf","schema-registry","sla"],
    transform: createStandardSkillTransform({
      sectionName: "Data Contracts Governance Standards",
      ruSectionName: "Контракты данных (Data Contracts: строгие спецификации схем и SLA между командами)",
      instructions: [
        "Define explicit event schemas using Protocol Buffers (Protobuf) or JSON Schema in versioned Git repos.",
        "Enforce backward compatibility rules in CI/CD before allowing producer schema modifications.",
        "Specify explicit Service Level Agreements (SLA) for event arrival freshness, completeness, and nullability limits."
],
      ruInstructions: [
        "Фиксируйте структуры событий в схемах Protobuf или JSON Schema в версионируемых репозиториях.",
        "Проверяйте обратную совместимость схем в CI/CD для защиты аналитиков от ломающих изменений.",
        "Определяйте формальные SLA по свежести данных, допустимому проценту null и задержке доставки."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","data-contracts","protobuf","schema-registry","sla"],
    }),
  },

  "data-knowledge-semantic-caching-gptcache-similarity": {
    id: "data-knowledge-semantic-caching-gptcache-similarity",
    name: "DataKnowledgeSemanticCachingGptcacheSimilaritySkill",
    displayName: "Semantic Query Caching: Embedding Distance Vector Hit Ratio",
    categoryId: 'data_knowledge',
    description: "Caches and serves expensive LLM / SQL responses for semantically equivalent queries within a tight cosine distance threshold (e.g. >0.96).",
    tags: ["data-knowledge","semantic-caching","vector-cache","cost-reduction","llmops"],
    transform: createStandardSkillTransform({
      sectionName: "Semantic Query Caching Standards",
      ruSectionName: "Семантическое кэширование запросов (Векторный поиск похожих ответов с порогом >0.96)",
      instructions: [
        "Embed incoming user query and perform fast similarity search against vector cache storage.",
        "If nearest neighbor cosine similarity exceeds 0.96, return the cached answer with zero inference cost.",
        "Expire cached semantic entries on a sliding TTL basis to prevent stale business data delivery."
],
      ruInstructions: [
        "Вычисляйте эмбеддинг входящего запроса и ищите ближайших соседей в векторном кэше.",
        "Если косинусное сходство превышает порог 0.96, мгновенно отдавайте сохраненный ответ с нулевыми затратами токенов.",
        "Устанавливайте скользящий TTL для кэшированных ответов во избежание отдачи устаревших данных."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","semantic-caching","vector-cache","cost-reduction","llmops"],
    }),
  },

  "data-knowledge-delta-lake-liquid-clustering": {
    id: "data-knowledge-delta-lake-liquid-clustering",
    name: "DataKnowledgeDeltaLakeLiquidClusteringSkill",
    displayName: "Delta Lake Liquid Clustering & Multi-Dimensional Data Skipping",
    categoryId: 'data_knowledge',
    description: "Replaces rigid hive-style table partitioning with Delta Lake Liquid Clustering for flexible multi-column incremental sorting.",
    tags: ["data-knowledge","delta-lake","liquid-clustering","lakehouse","data-skipping"],
    transform: createStandardSkillTransform({
      sectionName: "Delta Lake Liquid Clustering Standards",
      ruSectionName: "Delta Lake Liquid Clustering: гибкая кластеризация данных без жесткого партиционирования",
      instructions: [
        "Define clustering columns: `CLUSTER BY (date, customer_id, region)` on Delta Lake tables.",
        "Run incremental `OPTIMIZE table` jobs to cluster newly ingested data without rewriting entire tables.",
        "Achieve balanced file sizes and multi-dimensional min/max data skipping across diverse query patterns."
],
      ruInstructions: [
        "Задавайте колонки кластеризации командой `CLUSTER BY (date, customer_id, region)`.",
        "Запускайте инкрементальную оптимизацию `OPTIMIZE` для кластеризации новых файлов без перезаписи всей таблицы.",
        "Обеспечивайте пропуск нерелевантных данных (Data Skipping) сразу по нескольким измерениям запроса."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","delta-lake","liquid-clustering","lakehouse","data-skipping"],
    }),
  },

  "data-knowledge-entity-resolution-dedupe-py": {
    id: "data-knowledge-entity-resolution-dedupe-py",
    name: "DataKnowledgeEntityResolutionDedupePySkill",
    displayName: "Machine Learning Entity Resolution & Record Deduplication (Dedupe)",
    categoryId: 'data_knowledge',
    description: "Trains active-learning classification models over messy text records to deduplicate entities with ambiguous variations.",
    tags: ["data-knowledge","entity-resolution","deduplication","active-learning","data-cleaning"],
    transform: createStandardSkillTransform({
      sectionName: "Entity Resolution Machine Learning Standards",
      ruSectionName: "Машинное обучение для разрешения сущностей (Entity Resolution и дедупликация записей)",
      instructions: [
        "Train active learning distance models on pairs of ambiguous customer records with human feedback.",
        "Cluster connected matching record pairs into single canonical entity clusters.",
        "Score precision and recall curves against ground-truth validation datasets."
],
      ruInstructions: [
        "Обучайте классификатор сходства на спорных парах записей с помощью активного дообучения с человеком.",
        "Кластеризуйте связанные дублирующиеся записи в единые канонические сущности.",
        "Оценивайте метрики точности (Precision) и полноты (Recall) на проверочном датасете."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","entity-resolution","deduplication","active-learning","data-cleaning"],
    }),
  },

  "data-knowledge-columnar-encoding-rle-delta-bitpacking": {
    id: "data-knowledge-columnar-encoding-rle-delta-bitpacking",
    name: "DataKnowledgeColumnarEncodingRleDeltaBitpackingSkill",
    displayName: "Low-Level Columnar Encodings: RLE, Delta Encoding & Bit-Packing",
    categoryId: 'data_knowledge',
    description: "Maximizes numerical data compression using Run-Length Encoding (RLE) on repeated values, Delta on timestamps, and Bit-Packing on integers.",
    tags: ["data-knowledge","columnar-encoding","rle","delta-encoding","bit-packing","storage"],
    transform: createStandardSkillTransform({
      sectionName: "Low-Level Columnar Encoding Standards",
      ruSectionName: "Низкоуровневые колоночные кодировки: RLE, Delta Encoding и Bit-Packing",
      instructions: [
        "Apply Run-Length Encoding (RLE) to sorted columns with repeated runs of identical values.",
        "Use Delta Encoding for monotonically increasing timestamp integer series to store only small delta differences.",
        "Pack small integers into exact bit-width bounds (Bit-Packing) rather than standard 32/64-bit word boundaries."
],
      ruInstructions: [
        "Применяйте кодирование серий (RLE) для отсортированных колонок с повторяющимися значениями.",
        "Используйте Delta Encoding для временных рядов, сохраняя только разницу между соседними метками.",
        "Упаковывайте целые числа в точную битовую ширину (Bit-Packing) без заполнения до 64 бит."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","columnar-encoding","rle","delta-encoding","bit-packing","storage"],
    }),
  },

  "data-knowledge-rag-reranking-cross-encoder": {
    id: "data-knowledge-rag-reranking-cross-encoder",
    name: "DataKnowledgeRagRerankingCrossEncoderSkill",
    displayName: "RAG Two-Stage Retrieval: Fast Bi-Encoder + Deep Cross-Encoder Reranker",
    categoryId: 'data_knowledge',
    description: "Re-scores top-50 candidate documents with a computationally deep Cross-Encoder model (Cohere Rerank / BGE-Reranker) before prompt injection.",
    tags: ["data-knowledge","reranking","cross-encoder","rag","information-retrieval"],
    transform: createStandardSkillTransform({
      sectionName: "Two-Stage Retrieval & Cross-Encoder Standards",
      ruSectionName: "Двухэтапный поиск в RAG: быстрый векторный отбор + глубокий Cross-Encoder реранкер",
      instructions: [
        "Stage 1 (Bi-Encoder): Retrieve top-50 candidates via fast vector/hybrid search under 10ms.",
        "Stage 2 (Cross-Encoder): Re-score the 50 candidate pairs jointly through full cross-attention transformer layers.",
        "Select top-5 highest-scoring reranked passages to inject into final LLM context window, boosting answer relevance by 35%."
],
      ruInstructions: [
        "Этап 1 (Bi-Encoder): Быстрый отбор топ-50 кандидатов через векторный/гибридный поиск до 10 мс.",
        "Этап 2 (Cross-Encoder): Совместная оценка запроса и текста через глубокий реранкер с полным вниманием.",
        "Передавайте в контекст модели топ-5 лучших фрагментов после реранкинга, повышая точность ответов на 35%."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","reranking","cross-encoder","rag","information-retrieval"],
    }),
  },

  "data-knowledge-knowledge-distillation-compact-indexes": {
    id: "data-knowledge-knowledge-distillation-compact-indexes",
    name: "DataKnowledgeKnowledgeDistillationCompactIndexesSkill",
    displayName: "Domain Taxonomy Pruning & Ontological Depth Normalization",
    categoryId: 'data_knowledge',
    description: "Prunes redundant hierarchy branches in sprawling corporate knowledge taxonomies, establishing balanced 4-level classification schemas.",
    tags: ["data-knowledge","taxonomy","ontology","classification","knowledge-management"],
    transform: createStandardSkillTransform({
      sectionName: "Domain Taxonomy Governance Standards",
      ruSectionName: "Нормализация и оптимизация глубины корпоративных таксономий и онтологий",
      instructions: [
        "Cap taxonomy tree depth to a balanced 4-level hierarchy (Domain -> Category -> Subcategory -> Concept).",
        "Eliminate orphaned or single-child intermediary taxonomy nodes.",
        "Ensure mutually exclusive and collectively exhaustive (MECE) classification across sibling categories."
],
      ruInstructions: [
        "Ограничивайте глубину дерева таксономии 4 сбалансированными уровнями (Домен -> Категория -> Подкатегория -> Понятие).",
        "Устраняйте пустые узлы и промежуточные ветви с единственным потомком.",
        "Соблюдайте принцип взаимного исключения и совокупной исчерпанности (MECE) для соседних категорий."
],
      semanticType: "structural_directive",
      tags: ["data-knowledge","taxonomy","ontology","classification","knowledge-management"],
    }),
  },
  "data-knowledge-hybrid-search-bm25-hnsw-reciprocal-rank-fusion": {
    id: "data-knowledge-hybrid-search-bm25-hnsw-reciprocal-rank-fusion",
    name: "HybridSearchBM25HNSWReciprocalRankFusionSkill",
    displayName: "Hybrid Search BM25 + HNSW Reciprocal Rank Fusion",
    categoryId: "data_knowledge",
    description: "Combines exact keyword search (BM25) and dense vector search via RRF.",
    tags: ["data_knowledge","data-knowledge","knowledge","hybrid"],
    transform: createStandardSkillTransform({
      sectionName: "Hybrid Search BM25 + HNSW Reciprocal Rank Fusion Standards",
      ruSectionName: "Стандарты и регламенты: Hybrid Search BM25 + HNSW Reciprocal Rank Fusion",
      instructions: [
        "Apply core domain tenets for Hybrid Search BM25 + HNSW Reciprocal Rank Fusion.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hybrid Search BM25 + HNSW Reciprocal Rank Fusion.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","hybrid"],
    }),
  },

  "data-knowledge-graphrag-knowledge-graph-entity-extraction": {
    id: "data-knowledge-graphrag-knowledge-graph-entity-extraction",
    name: "GraphRAGKnowledgeGraphEntityExtractionSkill",
    displayName: "GraphRAG Knowledge Graph Entity Extraction",
    categoryId: "data_knowledge",
    description: "Extracts entity nodes, relationship edges, and community summaries for RAG.",
    tags: ["data_knowledge","data-knowledge","knowledge","graphrag"],
    transform: createStandardSkillTransform({
      sectionName: "GraphRAG Knowledge Graph Entity Extraction Standards",
      ruSectionName: "Стандарты и регламенты: GraphRAG Knowledge Graph Entity Extraction",
      instructions: [
        "Apply core domain tenets for GraphRAG Knowledge Graph Entity Extraction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для GraphRAG Knowledge Graph Entity Extraction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","graphrag"],
    }),
  },

  "data-knowledge-hierarchical-parent-child-document-chunking": {
    id: "data-knowledge-hierarchical-parent-child-document-chunking",
    name: "HierarchicalParentChildDocumentChunkingSkill",
    displayName: "Hierarchical Parent-Child Document Chunking",
    categoryId: "data_knowledge",
    description: "Indexes granular child chunks for search while retrieving full parent document context.",
    tags: ["data_knowledge","data-knowledge","knowledge","hierarchical"],
    transform: createStandardSkillTransform({
      sectionName: "Hierarchical Parent-Child Document Chunking Standards",
      ruSectionName: "Стандарты и регламенты: Hierarchical Parent-Child Document Chunking",
      instructions: [
        "Apply core domain tenets for Hierarchical Parent-Child Document Chunking.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hierarchical Parent-Child Document Chunking.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","hierarchical"],
    }),
  },

  "data-knowledge-slowly-changing-dimensions-scd-type-1-4-dwh": {
    id: "data-knowledge-slowly-changing-dimensions-scd-type-1-4-dwh",
    name: "SlowlyChangingDimensionsSCDType14DWHSkill",
    displayName: "Slowly Changing Dimensions (SCD Type 1-4) DWH",
    categoryId: "data_knowledge",
    description: "Tracks historical record changes in data warehouse dimension tables.",
    tags: ["data_knowledge","data-knowledge","knowledge","slowly"],
    transform: createStandardSkillTransform({
      sectionName: "Slowly Changing Dimensions (SCD Type 1-4) DWH Standards",
      ruSectionName: "Стандарты и регламенты: Slowly Changing Dimensions (SCD Type 1-4) DWH",
      instructions: [
        "Apply core domain tenets for Slowly Changing Dimensions (SCD Type 1-4) DWH.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Slowly Changing Dimensions (SCD Type 1-4) DWH.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","slowly"],
    }),
  },

  "data-knowledge-apache-arrow-zero-copy-memory-ipc-format": {
    id: "data-knowledge-apache-arrow-zero-copy-memory-ipc-format",
    name: "ApacheArrowZeroCopyMemoryIPCFormatSkill",
    displayName: "Apache Arrow Zero-Copy Memory IPC Format",
    categoryId: "data_knowledge",
    description: "Transfers multi-gigabyte dataframes across process boundaries with zero serialization.",
    tags: ["data_knowledge","data-knowledge","knowledge","apache"],
    transform: createStandardSkillTransform({
      sectionName: "Apache Arrow Zero-Copy Memory IPC Format Standards",
      ruSectionName: "Стандарты и регламенты: Apache Arrow Zero-Copy Memory IPC Format",
      instructions: [
        "Apply core domain tenets for Apache Arrow Zero-Copy Memory IPC Format.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Apache Arrow Zero-Copy Memory IPC Format.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","apache"],
    }),
  },

  "data-knowledge-vector-quantization-sq8-pq-hnsw-optimization": {
    id: "data-knowledge-vector-quantization-sq8-pq-hnsw-optimization",
    name: "VectorQuantizationSQ8PQHNSWOptimizationSkill",
    displayName: "Vector Quantization (SQ8 / PQ) & HNSW Optimization",
    categoryId: "data_knowledge",
    description: "Reduces vector database memory footprint by 75-95% using scalar and product quantization.",
    tags: ["data_knowledge","data-knowledge","knowledge","vector"],
    transform: createStandardSkillTransform({
      sectionName: "Vector Quantization (SQ8 / PQ) & HNSW Optimization Standards",
      ruSectionName: "Стандарты и регламенты: Vector Quantization (SQ8 / PQ) & HNSW Optimization",
      instructions: [
        "Apply core domain tenets for Vector Quantization (SQ8 / PQ) & HNSW Optimization.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Vector Quantization (SQ8 / PQ) & HNSW Optimization.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","vector"],
    }),
  },

  "data-knowledge-dbt-semantic-layer-metricflow-governance": {
    id: "data-knowledge-dbt-semantic-layer-metricflow-governance",
    name: "dbtSemanticLayerMetricFlowGovernanceSkill",
    displayName: "dbt Semantic Layer & MetricFlow Governance",
    categoryId: "data_knowledge",
    description: "Defines single-source-of-truth business metrics in YAML for downstream BI.",
    tags: ["data_knowledge","data-knowledge","knowledge","dbt"],
    transform: createStandardSkillTransform({
      sectionName: "dbt Semantic Layer & MetricFlow Governance Standards",
      ruSectionName: "Стандарты и регламенты: dbt Semantic Layer & MetricFlow Governance",
      instructions: [
        "Apply core domain tenets for dbt Semantic Layer & MetricFlow Governance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для dbt Semantic Layer & MetricFlow Governance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","dbt"],
    }),
  },

  "data-knowledge-apache-parquet-dictionary-encoding-zstd": {
    id: "data-knowledge-apache-parquet-dictionary-encoding-zstd",
    name: "ApacheParquetDictionaryEncodingZSTDSkill",
    displayName: "Apache Parquet Dictionary Encoding & ZSTD",
    categoryId: "data_knowledge",
    description: "Optimizes analytical data lake storage using Parquet row group sizing and compression.",
    tags: ["data_knowledge","data-knowledge","knowledge","apache"],
    transform: createStandardSkillTransform({
      sectionName: "Apache Parquet Dictionary Encoding & ZSTD Standards",
      ruSectionName: "Стандарты и регламенты: Apache Parquet Dictionary Encoding & ZSTD",
      instructions: [
        "Apply core domain tenets for Apache Parquet Dictionary Encoding & ZSTD.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Apache Parquet Dictionary Encoding & ZSTD.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","apache"],
    }),
  },

  "data-knowledge-master-data-management-mdm-fellegi-sunter-linkage": {
    id: "data-knowledge-master-data-management-mdm-fellegi-sunter-linkage",
    name: "MasterDataManagementMDMFellegiSunterLinkageSkill",
    displayName: "Master Data Management (MDM) Fellegi-Sunter Linkage",
    categoryId: "data_knowledge",
    description: "Merges duplicate records across enterprise databases using probabilistic fuzzy matching.",
    tags: ["data_knowledge","data-knowledge","knowledge","master"],
    transform: createStandardSkillTransform({
      sectionName: "Master Data Management (MDM) Fellegi-Sunter Linkage Standards",
      ruSectionName: "Стандарты и регламенты: Master Data Management (MDM) Fellegi-Sunter Linkage",
      instructions: [
        "Apply core domain tenets for Master Data Management (MDM) Fellegi-Sunter Linkage.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Master Data Management (MDM) Fellegi-Sunter Linkage.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","master"],
    }),
  },

  "data-knowledge-automated-pii-detection-dynamic-data-masking": {
    id: "data-knowledge-automated-pii-detection-dynamic-data-masking",
    name: "AutomatedPIIDetectionDynamicDataMaskingSkill",
    displayName: "Automated PII Detection & Dynamic Data Masking",
    categoryId: "data_knowledge",
    description: "Detects personally identifiable information and applies cryptographic salting or masking.",
    tags: ["data_knowledge","data-knowledge","knowledge","automated"],
    transform: createStandardSkillTransform({
      sectionName: "Automated PII Detection & Dynamic Data Masking Standards",
      ruSectionName: "Стандарты и регламенты: Automated PII Detection & Dynamic Data Masking",
      instructions: [
        "Apply core domain tenets for Automated PII Detection & Dynamic Data Masking.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Automated PII Detection & Dynamic Data Masking.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","automated"],
    }),
  },

  "data-knowledge-clickhouse-mergetree-primary-key-sparse-indexing": {
    id: "data-knowledge-clickhouse-mergetree-primary-key-sparse-indexing",
    name: "ClickHouseMergeTreePrimaryKeySparseIndexingSkill",
    displayName: "ClickHouse MergeTree Primary Key Sparse Indexing",
    categoryId: "data_knowledge",
    description: "Accelerates billion-row real-time analytical queries using ClickHouse sparse indexes.",
    tags: ["data_knowledge","data-knowledge","knowledge","clickhouse"],
    transform: createStandardSkillTransform({
      sectionName: "ClickHouse MergeTree Primary Key Sparse Indexing Standards",
      ruSectionName: "Стандарты и регламенты: ClickHouse MergeTree Primary Key Sparse Indexing",
      instructions: [
        "Apply core domain tenets for ClickHouse MergeTree Primary Key Sparse Indexing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для ClickHouse MergeTree Primary Key Sparse Indexing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","clickhouse"],
    }),
  },

  "data-knowledge-duckdb-embedded-olap-s3-parquet-analytics": {
    id: "data-knowledge-duckdb-embedded-olap-s3-parquet-analytics",
    name: "DuckDBEmbeddedOLAPS3ParquetAnalyticsSkill",
    displayName: "DuckDB Embedded OLAP & S3 Parquet Analytics",
    categoryId: "data_knowledge",
    description: "Executes fast vectorized SQL queries directly against remote S3 Parquet files.",
    tags: ["data_knowledge","data-knowledge","knowledge","duckdb"],
    transform: createStandardSkillTransform({
      sectionName: "DuckDB Embedded OLAP & S3 Parquet Analytics Standards",
      ruSectionName: "Стандарты и регламенты: DuckDB Embedded OLAP & S3 Parquet Analytics",
      instructions: [
        "Apply core domain tenets for DuckDB Embedded OLAP & S3 Parquet Analytics.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для DuckDB Embedded OLAP & S3 Parquet Analytics.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","duckdb"],
    }),
  },

  "data-knowledge-great-expectations-automated-data-quality-suite": {
    id: "data-knowledge-great-expectations-automated-data-quality-suite",
    name: "GreatExpectationsAutomatedDataQualitySuiteSkill",
    displayName: "Great Expectations Automated Data Quality Suite",
    categoryId: "data_knowledge",
    description: "Enforces data quality contracts on analytical pipelines with automated assertions.",
    tags: ["data_knowledge","data-knowledge","knowledge","great"],
    transform: createStandardSkillTransform({
      sectionName: "Great Expectations Automated Data Quality Suite Standards",
      ruSectionName: "Стандарты и регламенты: Great Expectations Automated Data Quality Suite",
      instructions: [
        "Apply core domain tenets for Great Expectations Automated Data Quality Suite.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Great Expectations Automated Data Quality Suite.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","great"],
    }),
  },

  "data-knowledge-openlineage-metadata-lineage-provenance-graph": {
    id: "data-knowledge-openlineage-metadata-lineage-provenance-graph",
    name: "OpenLineageMetadataLineageProvenanceGraphSkill",
    displayName: "OpenLineage Metadata Lineage & Provenance Graph",
    categoryId: "data_knowledge",
    description: "Tracks end-to-end data lineage from raw Kafka streams to executive dashboards.",
    tags: ["data_knowledge","data-knowledge","knowledge","openlineage"],
    transform: createStandardSkillTransform({
      sectionName: "OpenLineage Metadata Lineage & Provenance Graph Standards",
      ruSectionName: "Стандарты и регламенты: OpenLineage Metadata Lineage & Provenance Graph",
      instructions: [
        "Apply core domain tenets for OpenLineage Metadata Lineage & Provenance Graph.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для OpenLineage Metadata Lineage & Provenance Graph.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","openlineage"],
    }),
  },

  "data-knowledge-timescaledb-continuous-aggregates-downsampling": {
    id: "data-knowledge-timescaledb-continuous-aggregates-downsampling",
    name: "TimescaleDBContinuousAggregatesDownsamplingSkill",
    displayName: "TimescaleDB Continuous Aggregates & Downsampling",
    categoryId: "data_knowledge",
    description: "Maintains real-time rollups over time-series data with automated retention downsampling.",
    tags: ["data_knowledge","data-knowledge","knowledge","timescaledb"],
    transform: createStandardSkillTransform({
      sectionName: "TimescaleDB Continuous Aggregates & Downsampling Standards",
      ruSectionName: "Стандарты и регламенты: TimescaleDB Continuous Aggregates & Downsampling",
      instructions: [
        "Apply core domain tenets for TimescaleDB Continuous Aggregates & Downsampling.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для TimescaleDB Continuous Aggregates & Downsampling.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","timescaledb"],
    }),
  },

  "data-knowledge-redis-hyperloglog-probabilistic-cardinality": {
    id: "data-knowledge-redis-hyperloglog-probabilistic-cardinality",
    name: "RedisHyperLogLogProbabilisticCardinalitySkill",
    displayName: "Redis HyperLogLog Probabilistic Cardinality",
    categoryId: "data_knowledge",
    description: "Counts unique daily active users in constant 12KB memory with <0.81% error.",
    tags: ["data_knowledge","data-knowledge","knowledge","redis"],
    transform: createStandardSkillTransform({
      sectionName: "Redis HyperLogLog Probabilistic Cardinality Standards",
      ruSectionName: "Стандарты и регламенты: Redis HyperLogLog Probabilistic Cardinality",
      instructions: [
        "Apply core domain tenets for Redis HyperLogLog Probabilistic Cardinality.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Redis HyperLogLog Probabilistic Cardinality.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","redis"],
    }),
  },

  "data-knowledge-debezium-cdc-streaming-into-apache-iceberg": {
    id: "data-knowledge-debezium-cdc-streaming-into-apache-iceberg",
    name: "DebeziumCDCStreamingintoApacheIcebergSkill",
    displayName: "Debezium CDC Streaming into Apache Iceberg",
    categoryId: "data_knowledge",
    description: "Streams database row mutations directly into Iceberg lakehouse tables.",
    tags: ["data_knowledge","data-knowledge","knowledge","debezium"],
    transform: createStandardSkillTransform({
      sectionName: "Debezium CDC Streaming into Apache Iceberg Standards",
      ruSectionName: "Стандарты и регламенты: Debezium CDC Streaming into Apache Iceberg",
      instructions: [
        "Apply core domain tenets for Debezium CDC Streaming into Apache Iceberg.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Debezium CDC Streaming into Apache Iceberg.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","debezium"],
    }),
  },

  "data-knowledge-star-schema-vs-snowflake-dimensional-modeling": {
    id: "data-knowledge-star-schema-vs-snowflake-dimensional-modeling",
    name: "StarSchemavsSnowflakeDimensionalModelingSkill",
    displayName: "Star Schema vs Snowflake Dimensional Modeling",
    categoryId: "data_knowledge",
    description: "Designs denormalized dimensional data models balancing query join speed and storage.",
    tags: ["data_knowledge","data-knowledge","knowledge","star"],
    transform: createStandardSkillTransform({
      sectionName: "Star Schema vs Snowflake Dimensional Modeling Standards",
      ruSectionName: "Стандарты и регламенты: Star Schema vs Snowflake Dimensional Modeling",
      instructions: [
        "Apply core domain tenets for Star Schema vs Snowflake Dimensional Modeling.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Star Schema vs Snowflake Dimensional Modeling.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","star"],
    }),
  },

  "data-knowledge-differential-privacy-laplace-noise-injection": {
    id: "data-knowledge-differential-privacy-laplace-noise-injection",
    name: "DifferentialPrivacyLaplaceNoiseInjectionSkill",
    displayName: "Differential Privacy Laplace Noise Injection",
    categoryId: "data_knowledge",
    description: "Protects individual user privacy in analytical aggregates by injecting calibrated noise.",
    tags: ["data_knowledge","data-knowledge","knowledge","differential"],
    transform: createStandardSkillTransform({
      sectionName: "Differential Privacy Laplace Noise Injection Standards",
      ruSectionName: "Стандарты и регламенты: Differential Privacy Laplace Noise Injection",
      instructions: [
        "Apply core domain tenets for Differential Privacy Laplace Noise Injection.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Differential Privacy Laplace Noise Injection.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","differential"],
    }),
  },

  "data-knowledge-neo4j-cypher-graph-query-path-traversal": {
    id: "data-knowledge-neo4j-cypher-graph-query-path-traversal",
    name: "Neo4jCypherGraphQueryPathTraversalSkill",
    displayName: "Neo4j Cypher Graph Query Path Traversal",
    categoryId: "data_knowledge",
    description: "Tunes Cypher path queries and relationship indexes for multi-hop graph traversals.",
    tags: ["data_knowledge","data-knowledge","knowledge","neo4j"],
    transform: createStandardSkillTransform({
      sectionName: "Neo4j Cypher Graph Query Path Traversal Standards",
      ruSectionName: "Стандарты и регламенты: Neo4j Cypher Graph Query Path Traversal",
      instructions: [
        "Apply core domain tenets for Neo4j Cypher Graph Query Path Traversal.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Neo4j Cypher Graph Query Path Traversal.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","neo4j"],
    }),
  },

  "data-knowledge-lakefs-git-style-data-versioning-for-s3": {
    id: "data-knowledge-lakefs-git-style-data-versioning-for-s3",
    name: "lakeFSGitStyleDataVersioningforS3Skill",
    displayName: "lakeFS Git-Style Data Versioning for S3",
    categoryId: "data_knowledge",
    description: "Enables zero-copy branch, commit, and rollback workflows over object storage data lakes.",
    tags: ["data_knowledge","data-knowledge","knowledge","lakefs"],
    transform: createStandardSkillTransform({
      sectionName: "lakeFS Git-Style Data Versioning for S3 Standards",
      ruSectionName: "Стандарты и регламенты: lakeFS Git-Style Data Versioning for S3",
      instructions: [
        "Apply core domain tenets for lakeFS Git-Style Data Versioning for S3.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для lakeFS Git-Style Data Versioning for S3.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","lakefs"],
    }),
  },

  "data-knowledge-snowflake-search-optimization-service-sos": {
    id: "data-knowledge-snowflake-search-optimization-service-sos",
    name: "SnowflakeSearchOptimizationServiceSOSSkill",
    displayName: "Snowflake Search Optimization Service (SOS)",
    categoryId: "data_knowledge",
    description: "Accelerates high-cardinality point-lookup queries on multi-terabyte tables.",
    tags: ["data_knowledge","data-knowledge","knowledge","snowflake"],
    transform: createStandardSkillTransform({
      sectionName: "Snowflake Search Optimization Service (SOS) Standards",
      ruSectionName: "Стандарты и регламенты: Snowflake Search Optimization Service (SOS)",
      instructions: [
        "Apply core domain tenets for Snowflake Search Optimization Service (SOS).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Snowflake Search Optimization Service (SOS).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","snowflake"],
    }),
  },

  "data-knowledge-enterprise-data-contracts-protobuf-sla": {
    id: "data-knowledge-enterprise-data-contracts-protobuf-sla",
    name: "EnterpriseDataContractsProtobufSLASkill",
    displayName: "Enterprise Data Contracts Protobuf SLA",
    categoryId: "data_knowledge",
    description: "Establishes formal schema and freshness contracts between software producers and data teams.",
    tags: ["data_knowledge","data-knowledge","knowledge","enterprise"],
    transform: createStandardSkillTransform({
      sectionName: "Enterprise Data Contracts Protobuf SLA Standards",
      ruSectionName: "Стандарты и регламенты: Enterprise Data Contracts Protobuf SLA",
      instructions: [
        "Apply core domain tenets for Enterprise Data Contracts Protobuf SLA.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Enterprise Data Contracts Protobuf SLA.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","enterprise"],
    }),
  },

  "data-knowledge-semantic-query-caching-gptcache-vector-similarity": {
    id: "data-knowledge-semantic-query-caching-gptcache-vector-similarity",
    name: "SemanticQueryCachingGPTCacheVectorSimilaritySkill",
    displayName: "Semantic Query Caching GPTCache Vector Similarity",
    categoryId: "data_knowledge",
    description: "Caches and serves expensive LLM / SQL responses for semantically equivalent queries.",
    tags: ["data_knowledge","data-knowledge","knowledge","semantic"],
    transform: createStandardSkillTransform({
      sectionName: "Semantic Query Caching GPTCache Vector Similarity Standards",
      ruSectionName: "Стандарты и регламенты: Semantic Query Caching GPTCache Vector Similarity",
      instructions: [
        "Apply core domain tenets for Semantic Query Caching GPTCache Vector Similarity.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Semantic Query Caching GPTCache Vector Similarity.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","semantic"],
    }),
  },

  "data-knowledge-delta-lake-liquid-clustering-multi-dimensional": {
    id: "data-knowledge-delta-lake-liquid-clustering-multi-dimensional",
    name: "DeltaLakeLiquidClusteringMultiDimensionalSkill",
    displayName: "Delta Lake Liquid Clustering Multi-Dimensional",
    categoryId: "data_knowledge",
    description: "Replaces rigid table partitioning with Delta Lake Liquid Clustering for sorting.",
    tags: ["data_knowledge","data-knowledge","knowledge","delta"],
    transform: createStandardSkillTransform({
      sectionName: "Delta Lake Liquid Clustering Multi-Dimensional Standards",
      ruSectionName: "Стандарты и регламенты: Delta Lake Liquid Clustering Multi-Dimensional",
      instructions: [
        "Apply core domain tenets for Delta Lake Liquid Clustering Multi-Dimensional.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Delta Lake Liquid Clustering Multi-Dimensional.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","delta"],
    }),
  },

  "data-knowledge-machine-learning-entity-resolution-dedupe": {
    id: "data-knowledge-machine-learning-entity-resolution-dedupe",
    name: "MachineLearningEntityResolutionDedupeSkill",
    displayName: "Machine Learning Entity Resolution & Dedupe",
    categoryId: "data_knowledge",
    description: "Trains active-learning classification models to deduplicate messy text records.",
    tags: ["data_knowledge","data-knowledge","knowledge","machine"],
    transform: createStandardSkillTransform({
      sectionName: "Machine Learning Entity Resolution & Dedupe Standards",
      ruSectionName: "Стандарты и регламенты: Machine Learning Entity Resolution & Dedupe",
      instructions: [
        "Apply core domain tenets for Machine Learning Entity Resolution & Dedupe.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Machine Learning Entity Resolution & Dedupe.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","machine"],
    }),
  },

  "data-knowledge-low-level-columnar-encodings-rle-delta-bit-packing": {
    id: "data-knowledge-low-level-columnar-encodings-rle-delta-bit-packing",
    name: "LowLevelColumnarEncodingsRLEDeltaBitPackingSkill",
    displayName: "Low-Level Columnar Encodings (RLE, Delta, Bit-Packing)",
    categoryId: "data_knowledge",
    description: "Maximizes numerical data compression using RLE, Delta, and Bit-Packing.",
    tags: ["data_knowledge","data-knowledge","knowledge","low"],
    transform: createStandardSkillTransform({
      sectionName: "Low-Level Columnar Encodings (RLE, Delta, Bit-Packing) Standards",
      ruSectionName: "Стандарты и регламенты: Low-Level Columnar Encodings (RLE, Delta, Bit-Packing)",
      instructions: [
        "Apply core domain tenets for Low-Level Columnar Encodings (RLE, Delta, Bit-Packing).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Low-Level Columnar Encodings (RLE, Delta, Bit-Packing).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","low"],
    }),
  },

  "data-knowledge-rag-two-stage-retrieval-with-cross-encoder-reranker": {
    id: "data-knowledge-rag-two-stage-retrieval-with-cross-encoder-reranker",
    name: "RAGTwoStageRetrievalwithCrossEncoderRerankerSkill",
    displayName: "RAG Two-Stage Retrieval with Cross-Encoder Reranker",
    categoryId: "data_knowledge",
    description: "Re-scores top candidate documents with a deep Cross-Encoder model before prompt injection.",
    tags: ["data_knowledge","data-knowledge","knowledge","rag"],
    transform: createStandardSkillTransform({
      sectionName: "RAG Two-Stage Retrieval with Cross-Encoder Reranker Standards",
      ruSectionName: "Стандарты и регламенты: RAG Two-Stage Retrieval with Cross-Encoder Reranker",
      instructions: [
        "Apply core domain tenets for RAG Two-Stage Retrieval with Cross-Encoder Reranker.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для RAG Two-Stage Retrieval with Cross-Encoder Reranker.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","rag"],
    }),
  },

  "data-knowledge-domain-taxonomy-pruning-ontological-depth": {
    id: "data-knowledge-domain-taxonomy-pruning-ontological-depth",
    name: "DomainTaxonomyPruningOntologicalDepthSkill",
    displayName: "Domain Taxonomy Pruning & Ontological Depth",
    categoryId: "data_knowledge",
    description: "Prunes redundant hierarchy branches in corporate knowledge taxonomies.",
    tags: ["data_knowledge","data-knowledge","knowledge","domain"],
    transform: createStandardSkillTransform({
      sectionName: "Domain Taxonomy Pruning & Ontological Depth Standards",
      ruSectionName: "Стандарты и регламенты: Domain Taxonomy Pruning & Ontological Depth",
      instructions: [
        "Apply core domain tenets for Domain Taxonomy Pruning & Ontological Depth.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Domain Taxonomy Pruning & Ontological Depth.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","domain"],
    }),
  },

  "data-knowledge-feast-feature-store-low-latency-online-offline-sync": {
    id: "data-knowledge-feast-feature-store-low-latency-online-offline-sync",
    name: "FeastFeatureStoreLowLatencyOnlineOfflineSyncSkill",
    displayName: "Feast Feature Store Low-Latency Online/Offline Sync",
    categoryId: "data_knowledge",
    description: "Maintains ML feature parity across BigQuery training and Redis inference.",
    tags: ["data_knowledge","data-knowledge","knowledge","feast"],
    transform: createStandardSkillTransform({
      sectionName: "Feast Feature Store Low-Latency Online/Offline Sync Standards",
      ruSectionName: "Стандарты и регламенты: Feast Feature Store Low-Latency Online/Offline Sync",
      instructions: [
        "Apply core domain tenets for Feast Feature Store Low-Latency Online/Offline Sync.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Feast Feature Store Low-Latency Online/Offline Sync.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","feast"],
    }),
  },

  "data-knowledge-apache-iceberg-schema-evolution-hidden-partitioning": {
    id: "data-knowledge-apache-iceberg-schema-evolution-hidden-partitioning",
    name: "ApacheIcebergSchemaEvolutionHiddenPartitioningSkill",
    displayName: "Apache Iceberg Schema Evolution & Hidden Partitioning",
    categoryId: "data_knowledge",
    description: "Evolves data lake schemas and updates partition specs with zero table rewrites.",
    tags: ["data_knowledge","data-knowledge","knowledge","apache"],
    transform: createStandardSkillTransform({
      sectionName: "Apache Iceberg Schema Evolution & Hidden Partitioning Standards",
      ruSectionName: "Стандарты и регламенты: Apache Iceberg Schema Evolution & Hidden Partitioning",
      instructions: [
        "Apply core domain tenets for Apache Iceberg Schema Evolution & Hidden Partitioning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Apache Iceberg Schema Evolution & Hidden Partitioning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","apache"],
    }),
  },

  "data-knowledge-colbertv2-late-interaction-token-multi-vector-search": {
    id: "data-knowledge-colbertv2-late-interaction-token-multi-vector-search",
    name: "ColBERTv2LateInteractionTokenMultiVectorSearchSkill",
    displayName: "ColBERTv2 Late Interaction Token Multi-Vector Search",
    categoryId: "data_knowledge",
    description: "Performs fine-grained retrieval by computing token-level MaxSim matrix similarity.",
    tags: ["data_knowledge","data-knowledge","knowledge","colbertv2"],
    transform: createStandardSkillTransform({
      sectionName: "ColBERTv2 Late Interaction Token Multi-Vector Search Standards",
      ruSectionName: "Стандарты и регламенты: ColBERTv2 Late Interaction Token Multi-Vector Search",
      instructions: [
        "Apply core domain tenets for ColBERTv2 Late Interaction Token Multi-Vector Search.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для ColBERTv2 Late Interaction Token Multi-Vector Search.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","colbertv2"],
    }),
  },

  "data-knowledge-zstandard-pre-trained-dictionary-compression-for-json": {
    id: "data-knowledge-zstandard-pre-trained-dictionary-compression-for-json",
    name: "ZstandardPreTrainedDictionaryCompressionforJSONSkill",
    displayName: "Zstandard Pre-Trained Dictionary Compression for JSON",
    categoryId: "data_knowledge",
    description: "Trains 110KB ZSTD dictionaries over JSON payloads for 5x higher compression.",
    tags: ["data_knowledge","data-knowledge","knowledge","zstandard"],
    transform: createStandardSkillTransform({
      sectionName: "Zstandard Pre-Trained Dictionary Compression for JSON Standards",
      ruSectionName: "Стандарты и регламенты: Zstandard Pre-Trained Dictionary Compression for JSON",
      instructions: [
        "Apply core domain tenets for Zstandard Pre-Trained Dictionary Compression for JSON.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Zstandard Pre-Trained Dictionary Compression for JSON.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","zstandard"],
    }),
  },

  "data-knowledge-w3c-owl-ontologies-sparql-1-1-query-engine": {
    id: "data-knowledge-w3c-owl-ontologies-sparql-1-1-query-engine",
    name: "W3COWLOntologiesSPARQL11QueryEngineSkill",
    displayName: "W3C OWL Ontologies & SPARQL 1.1 Query Engine",
    categoryId: "data_knowledge",
    description: "Models enterprise domains in W3C OWL ontologies, executing SPARQL queries.",
    tags: ["data_knowledge","data-knowledge","knowledge","w3c"],
    transform: createStandardSkillTransform({
      sectionName: "W3C OWL Ontologies & SPARQL 1.1 Query Engine Standards",
      ruSectionName: "Стандарты и регламенты: W3C OWL Ontologies & SPARQL 1.1 Query Engine",
      instructions: [
        "Apply core domain tenets for W3C OWL Ontologies & SPARQL 1.1 Query Engine.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для W3C OWL Ontologies & SPARQL 1.1 Query Engine.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","w3c"],
    }),
  },

  "data-knowledge-statistical-data-drift-detection-ks-test-psi": {
    id: "data-knowledge-statistical-data-drift-detection-ks-test-psi",
    name: "StatisticalDataDriftDetectionKSTestPSISkill",
    displayName: "Statistical Data Drift Detection (KS-Test & PSI)",
    categoryId: "data_knowledge",
    description: "Monitors numerical distribution shift and categorical concept drift between baseline and live data.",
    tags: ["data_knowledge","data-knowledge","knowledge","statistical"],
    transform: createStandardSkillTransform({
      sectionName: "Statistical Data Drift Detection (KS-Test & PSI) Standards",
      ruSectionName: "Стандарты и регламенты: Statistical Data Drift Detection (KS-Test & PSI)",
      instructions: [
        "Apply core domain tenets for Statistical Data Drift Detection (KS-Test & PSI).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Statistical Data Drift Detection (KS-Test & PSI).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","statistical"],
    }),
  },

  "data-knowledge-uber-h3-spatial-hexagonal-hierarchical-indexing": {
    id: "data-knowledge-uber-h3-spatial-hexagonal-hierarchical-indexing",
    name: "UberH3SpatialHexagonalHierarchicalIndexingSkill",
    displayName: "Uber H3 Spatial Hexagonal Hierarchical Indexing",
    categoryId: "data_knowledge",
    description: "Indexes geographic coordinates into hierarchical hexagonal grid cells for O(1) spatial queries.",
    tags: ["data_knowledge","data-knowledge","knowledge","uber"],
    transform: createStandardSkillTransform({
      sectionName: "Uber H3 Spatial Hexagonal Hierarchical Indexing Standards",
      ruSectionName: "Стандарты и регламенты: Uber H3 Spatial Hexagonal Hierarchical Indexing",
      instructions: [
        "Apply core domain tenets for Uber H3 Spatial Hexagonal Hierarchical Indexing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Uber H3 Spatial Hexagonal Hierarchical Indexing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","uber"],
    }),
  },

  "data-knowledge-lsm-tree-bloom-filters-key-non-existence-check": {
    id: "data-knowledge-lsm-tree-bloom-filters-key-non-existence-check",
    name: "LSMTreeBloomFiltersKeyNonExistenceCheckSkill",
    displayName: "LSM-Tree Bloom Filters Key Non-Existence Check",
    categoryId: "data_knowledge",
    description: "Tunes Bloom filter bit arrays in RocksDB/Cassandra to avoid expensive disk lookups.",
    tags: ["data_knowledge","data-knowledge","knowledge","lsm"],
    transform: createStandardSkillTransform({
      sectionName: "LSM-Tree Bloom Filters Key Non-Existence Check Standards",
      ruSectionName: "Стандарты и регламенты: LSM-Tree Bloom Filters Key Non-Existence Check",
      instructions: [
        "Apply core domain tenets for LSM-Tree Bloom Filters Key Non-Existence Check.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для LSM-Tree Bloom Filters Key Non-Existence Check.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","lsm"],
    }),
  },

  "data-knowledge-data-lake-compaction-small-file-problem-fix": {
    id: "data-knowledge-data-lake-compaction-small-file-problem-fix",
    name: "DataLakeCompactionSmallFileProblemFixSkill",
    displayName: "Data Lake Compaction & Small File Problem Fix",
    categoryId: "data_knowledge",
    description: "Merges millions of tiny streaming Parquet files into optimal 256MB blocks.",
    tags: ["data_knowledge","data-knowledge","knowledge","data"],
    transform: createStandardSkillTransform({
      sectionName: "Data Lake Compaction & Small File Problem Fix Standards",
      ruSectionName: "Стандарты и регламенты: Data Lake Compaction & Small File Problem Fix",
      instructions: [
        "Apply core domain tenets for Data Lake Compaction & Small File Problem Fix.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Data Lake Compaction & Small File Problem Fix.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","data"],
    }),
  },

  "data-knowledge-metadata-cataloging-automated-asset-discovery": {
    id: "data-knowledge-metadata-cataloging-automated-asset-discovery",
    name: "MetadataCatalogingAutomatedAssetDiscoverySkill",
    displayName: "Metadata Cataloging & Automated Asset Discovery",
    categoryId: "data_knowledge",
    description: "Scans enterprise data warehouses to auto-generate data dictionaries and tags.",
    tags: ["data_knowledge","data-knowledge","knowledge","metadata"],
    transform: createStandardSkillTransform({
      sectionName: "Metadata Cataloging & Automated Asset Discovery Standards",
      ruSectionName: "Стандарты и регламенты: Metadata Cataloging & Automated Asset Discovery",
      instructions: [
        "Apply core domain tenets for Metadata Cataloging & Automated Asset Discovery.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Metadata Cataloging & Automated Asset Discovery.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","metadata"],
    }),
  },

  "data-knowledge-temporal-graph-analytics-historical-link-prediction": {
    id: "data-knowledge-temporal-graph-analytics-historical-link-prediction",
    name: "TemporalGraphAnalyticsHistoricalLinkPredictionSkill",
    displayName: "Temporal Graph Analytics & Historical Link Prediction",
    categoryId: "data_knowledge",
    description: "Analyzes time-evolving networks to predict future relationships between entities.",
    tags: ["data_knowledge","data-knowledge","knowledge","temporal"],
    transform: createStandardSkillTransform({
      sectionName: "Temporal Graph Analytics & Historical Link Prediction Standards",
      ruSectionName: "Стандарты и регламенты: Temporal Graph Analytics & Historical Link Prediction",
      instructions: [
        "Apply core domain tenets for Temporal Graph Analytics & Historical Link Prediction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Temporal Graph Analytics & Historical Link Prediction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","temporal"],
    }),
  },

  "data-knowledge-vector-database-hnsw-graph-index-tuning": {
    id: "data-knowledge-vector-database-hnsw-graph-index-tuning",
    name: "VectorDatabaseHNSWGraphIndexTuningSkill",
    displayName: "Vector Database HNSW Graph Index Tuning",
    categoryId: "data_knowledge",
    description: "Tunes HNSW index parameters (M, efConstruction) for high-recall vector search.",
    tags: ["data_knowledge","data-knowledge","knowledge","vector"],
    transform: createStandardSkillTransform({
      sectionName: "Vector Database HNSW Graph Index Tuning Standards",
      ruSectionName: "Стандарты и регламенты: Vector Database HNSW Graph Index Tuning",
      instructions: [
        "Apply core domain tenets for Vector Database HNSW Graph Index Tuning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Vector Database HNSW Graph Index Tuning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","vector"],
    }),
  },

  "data-knowledge-data-governance-access-policies-column-security": {
    id: "data-knowledge-data-governance-access-policies-column-security",
    name: "DataGovernanceAccessPoliciesColumnSecuritySkill",
    displayName: "Data Governance Access Policies & Column Security",
    categoryId: "data_knowledge",
    description: "Enforces row-level and column-level security policies across analytical tables.",
    tags: ["data_knowledge","data-knowledge","knowledge","data"],
    transform: createStandardSkillTransform({
      sectionName: "Data Governance Access Policies & Column Security Standards",
      ruSectionName: "Стандарты и регламенты: Data Governance Access Policies & Column Security",
      instructions: [
        "Apply core domain tenets for Data Governance Access Policies & Column Security.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Data Governance Access Policies & Column Security.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","data"],
    }),
  },

  "data-knowledge-streaming-analytics-sliding-vs-tumbling-windows": {
    id: "data-knowledge-streaming-analytics-sliding-vs-tumbling-windows",
    name: "StreamingAnalyticsSlidingvsTumblingWindowsSkill",
    displayName: "Streaming Analytics Sliding vs Tumbling Windows",
    categoryId: "data_knowledge",
    description: "Applies sliding and tumbling time windows on real-time event streams.",
    tags: ["data_knowledge","data-knowledge","knowledge","streaming"],
    transform: createStandardSkillTransform({
      sectionName: "Streaming Analytics Sliding vs Tumbling Windows Standards",
      ruSectionName: "Стандарты и регламенты: Streaming Analytics Sliding vs Tumbling Windows",
      instructions: [
        "Apply core domain tenets for Streaming Analytics Sliding vs Tumbling Windows.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Streaming Analytics Sliding vs Tumbling Windows.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","streaming"],
    }),
  },

  "data-knowledge-geospatial-gis-postgis-geometry-indexing": {
    id: "data-knowledge-geospatial-gis-postgis-geometry-indexing",
    name: "GeospatialGISPostGISGeometryIndexingSkill",
    displayName: "Geospatial GIS PostGIS Geometry Indexing",
    categoryId: "data_knowledge",
    description: "Executes spatial joins and distance calculations using PostGIS R-Tree indexes.",
    tags: ["data_knowledge","data-knowledge","knowledge","geospatial"],
    transform: createStandardSkillTransform({
      sectionName: "Geospatial GIS PostGIS Geometry Indexing Standards",
      ruSectionName: "Стандарты и регламенты: Geospatial GIS PostGIS Geometry Indexing",
      instructions: [
        "Apply core domain tenets for Geospatial GIS PostGIS Geometry Indexing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Geospatial GIS PostGIS Geometry Indexing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","geospatial"],
    }),
  },

  "data-knowledge-data-cleaning-deduplication-outlier-removal": {
    id: "data-knowledge-data-cleaning-deduplication-outlier-removal",
    name: "DataCleaningDeduplicationOutlierRemovalSkill",
    displayName: "Data Cleaning Deduplication & Outlier Removal",
    categoryId: "data_knowledge",
    description: "Cleans raw datasets by identifying z-score statistical outliers and duplicates.",
    tags: ["data_knowledge","data-knowledge","knowledge","data"],
    transform: createStandardSkillTransform({
      sectionName: "Data Cleaning Deduplication & Outlier Removal Standards",
      ruSectionName: "Стандарты и регламенты: Data Cleaning Deduplication & Outlier Removal",
      instructions: [
        "Apply core domain tenets for Data Cleaning Deduplication & Outlier Removal.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Data Cleaning Deduplication & Outlier Removal.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","data"],
    }),
  },

  "data-knowledge-sql-query-cost-optimizer-cbo-hint-tuning": {
    id: "data-knowledge-sql-query-cost-optimizer-cbo-hint-tuning",
    name: "SQLQueryCostOptimizerCBOHintTuningSkill",
    displayName: "SQL Query Cost Optimizer & CBO Hint Tuning",
    categoryId: "data_knowledge",
    description: "Analyzes cost-based optimizer statistics to tune complex SQL analytical joins.",
    tags: ["data_knowledge","data-knowledge","knowledge","sql"],
    transform: createStandardSkillTransform({
      sectionName: "SQL Query Cost Optimizer & CBO Hint Tuning Standards",
      ruSectionName: "Стандарты и регламенты: SQL Query Cost Optimizer & CBO Hint Tuning",
      instructions: [
        "Apply core domain tenets for SQL Query Cost Optimizer & CBO Hint Tuning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SQL Query Cost Optimizer & CBO Hint Tuning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","sql"],
    }),
  },

  "data-knowledge-knowledge-base-rag-document-ingestion-pipeline": {
    id: "data-knowledge-knowledge-base-rag-document-ingestion-pipeline",
    name: "KnowledgeBaseRAGDocumentIngestionPipelineSkill",
    displayName: "Knowledge Base RAG Document Ingestion Pipeline",
    categoryId: "data_knowledge",
    description: "Parses, chunks, embeds, and indexes unstructured PDF/Word corpora into vector stores.",
    tags: ["data_knowledge","data-knowledge","knowledge","knowledge"],
    transform: createStandardSkillTransform({
      sectionName: "Knowledge Base RAG Document Ingestion Pipeline Standards",
      ruSectionName: "Стандарты и регламенты: Knowledge Base RAG Document Ingestion Pipeline",
      instructions: [
        "Apply core domain tenets for Knowledge Base RAG Document Ingestion Pipeline.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Knowledge Base RAG Document Ingestion Pipeline.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","knowledge"],
    }),
  },

  "data-knowledge-synthetic-data-generation-for-ml-privacy": {
    id: "data-knowledge-synthetic-data-generation-for-ml-privacy",
    name: "SyntheticDataGenerationforMLPrivacySkill",
    displayName: "Synthetic Data Generation for ML Privacy",
    categoryId: "data_knowledge",
    description: "Generates privacy-preserving synthetic tabular datasets matching real distributions.",
    tags: ["data_knowledge","data-knowledge","knowledge","synthetic"],
    transform: createStandardSkillTransform({
      sectionName: "Synthetic Data Generation for ML Privacy Standards",
      ruSectionName: "Стандарты и регламенты: Synthetic Data Generation for ML Privacy",
      instructions: [
        "Apply core domain tenets for Synthetic Data Generation for ML Privacy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Synthetic Data Generation for ML Privacy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","synthetic"],
    }),
  },

  "data-knowledge-enterprise-data-warehouse-lakehouse-architecture": {
    id: "data-knowledge-enterprise-data-warehouse-lakehouse-architecture",
    name: "EnterpriseDataWarehouseLakehouseArchitectureSkill",
    displayName: "Enterprise Data Warehouse Lakehouse Architecture",
    categoryId: "data_knowledge",
    description: "Architects modern data lakehouse systems unifying batch, streaming, and ML.",
    tags: ["data_knowledge","data-knowledge","knowledge","enterprise"],
    transform: createStandardSkillTransform({
      sectionName: "Enterprise Data Warehouse Lakehouse Architecture Standards",
      ruSectionName: "Стандарты и регламенты: Enterprise Data Warehouse Lakehouse Architecture",
      instructions: [
        "Apply core domain tenets for Enterprise Data Warehouse Lakehouse Architecture.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Enterprise Data Warehouse Lakehouse Architecture.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","enterprise"],
    }),
  },

  "data-knowledge-master-knowledge-management-information-governance": {
    id: "data-knowledge-master-knowledge-management-information-governance",
    name: "MasterKnowledgeManagementInformationGovernanceSkill",
    displayName: "Master Knowledge Management & Information Governance",
    categoryId: "data_knowledge",
    description: "Establishes enterprise-wide knowledge curation, taxonomy, and governance standards.",
    tags: ["data_knowledge","data-knowledge","knowledge","master"],
    transform: createStandardSkillTransform({
      sectionName: "Master Knowledge Management & Information Governance Standards",
      ruSectionName: "Стандарты и регламенты: Master Knowledge Management & Information Governance",
      instructions: [
        "Apply core domain tenets for Master Knowledge Management & Information Governance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Master Knowledge Management & Information Governance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["data_knowledge","data-knowledge","knowledge","master"],
    }),
  },
  "dataknowledge-multi-multi-source-knowledge-graph-triplet-extraction-engine": {
    id: "dataknowledge-multi-multi-source-knowledge-graph-triplet-extraction-engine",
    name: "MultiSourceKnowledgeGraphTripletExtractionEngineSkill",
    displayName: "Multi Source Knowledge Graph Triplet Extraction Engine",
    categoryId: "dataKnowledge",
    description: "Extracts subject-predicate-object triples from unstructured texts for GraphDB ingestion.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Source Knowledge Graph Triplet Extraction Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Source Knowledge Graph Triplet Extraction Engine",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Source Knowledge Graph Triplet Extraction Engine.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Source Knowledge Graph Triplet Extraction Engine.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-modal-vector-embedding-hybrid-search-engine": {
    id: "dataknowledge-multi-multi-modal-vector-embedding-hybrid-search-engine",
    name: "MultiModalVectorEmbeddingHybridSearchEngineSkill",
    displayName: "Multi Modal Vector Embedding Hybrid Search Engine",
    categoryId: "dataKnowledge",
    description: "Combines dense vector embeddings with sparse BM25 keyword search for high-accuracy retrieval.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Modal Vector Embedding Hybrid Search Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Modal Vector Embedding Hybrid Search Engine",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Modal Vector Embedding Hybrid Search Engine.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Modal Vector Embedding Hybrid Search Engine.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-layer-enterprise-ontology-taxonomy-builder": {
    id: "dataknowledge-multi-multi-layer-enterprise-ontology-taxonomy-builder",
    name: "MultiLayerEnterpriseOntologyTaxonomyBuilderSkill",
    displayName: "Multi Layer Enterprise Ontology Taxonomy Builder",
    categoryId: "dataKnowledge",
    description: "Constructs hierarchical domain taxonomies and OWL ontologies for enterprise data unification.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Enterprise Ontology Taxonomy Builder",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Enterprise Ontology Taxonomy Builder",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Enterprise Ontology Taxonomy Builder.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Enterprise Ontology Taxonomy Builder.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-stage-data-deduplication-record-linkage-engine": {
    id: "dataknowledge-multi-multi-stage-data-deduplication-record-linkage-engine",
    name: "MultiStageDataDeduplicationRecordLinkageEngineSkill",
    displayName: "Multi Stage Data Deduplication Record Linkage Engine",
    categoryId: "dataKnowledge",
    description: "Identifies duplicate customer records using fuzzy string matching, blocking keys, and machine learning.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Data Deduplication Record Linkage Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Data Deduplication Record Linkage Engine",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Data Deduplication Record Linkage Engine.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Data Deduplication Record Linkage Engine.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-tenant-database-schema-row-level-security-rls": {
    id: "dataknowledge-multi-multi-tenant-database-schema-row-level-security-rls",
    name: "MultiTenantDatabaseSchemaRowLevelSecurityRLSSkill",
    displayName: "Multi Tenant Database Schema Row Level Security RLS",
    categoryId: "dataKnowledge",
    description: "Configures PostgreSQL RLS policies ensuring strict tenant data isolation in shared databases.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Tenant Database Schema Row Level Security RLS",
      ruSectionName: "Композитный Multi-Skill: Multi Tenant Database Schema Row Level Security RLS",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Tenant Database Schema Row Level Security RLS.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Tenant Database Schema Row Level Security RLS.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-provider-data-ingestion-pipeline-etl-elt-engine": {
    id: "dataknowledge-multi-multi-provider-data-ingestion-pipeline-etl-elt-engine",
    name: "MultiProviderDataIngestionPipelineETLELTEngineSkill",
    displayName: "Multi Provider Data Ingestion Pipeline ETL ELT Engine",
    categoryId: "dataKnowledge",
    description: "Extracts data from REST APIs, Kafka, and SQL DBs into Snowflake/BigQuery data warehouses.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Provider Data Ingestion Pipeline ETL ELT Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Provider Data Ingestion Pipeline ETL ELT Engine",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Provider Data Ingestion Pipeline ETL ELT Engine.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Provider Data Ingestion Pipeline ETL ELT Engine.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-level-data-governance-lineage-compliance-audit": {
    id: "dataknowledge-multi-multi-level-data-governance-lineage-compliance-audit",
    name: "MultiLevelDataGovernanceLineageComplianceAuditSkill",
    displayName: "Multi Level Data Governance Lineage Compliance Audit",
    categoryId: "dataKnowledge",
    description: "Tracks data origin, transformation lineage, and PII exposure across corporate pipelines.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Data Governance Lineage Compliance Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Level Data Governance Lineage Compliance Audit",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Level Data Governance Lineage Compliance Audit.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Level Data Governance Lineage Compliance Audit.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-format-document-ocr-structured-extraction-engine": {
    id: "dataknowledge-multi-multi-format-document-ocr-structured-extraction-engine",
    name: "MultiFormatDocumentOCRStructuredExtractionEngineSkill",
    displayName: "Multi Format Document OCR Structured Extraction Engine",
    categoryId: "dataKnowledge",
    description: "Extracts tabular data from scanned PDFs, receipts, and invoices into structured JSON.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Format Document OCR Structured Extraction Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Format Document OCR Structured Extraction Engine",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Format Document OCR Structured Extraction Engine.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Format Document OCR Structured Extraction Engine.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-layer-semantic-cache-vector-query-optimization": {
    id: "dataknowledge-multi-multi-layer-semantic-cache-vector-query-optimization",
    name: "MultiLayerSemanticCacheVectorQueryOptimizationSkill",
    displayName: "Multi Layer Semantic Cache Vector Query Optimization",
    categoryId: "dataKnowledge",
    description: "Caches LLM vector responses to dramatically reduce API costs and latency on similar queries.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Semantic Cache Vector Query Optimization",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Semantic Cache Vector Query Optimization",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Semantic Cache Vector Query Optimization.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Semantic Cache Vector Query Optimization.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-source-master-data-management-mdm-consensus": {
    id: "dataknowledge-multi-multi-source-master-data-management-mdm-consensus",
    name: "MultiSourceMasterDataManagementMDMConsensusSkill",
    displayName: "Multi Source Master Data Management MDM Consensus",
    categoryId: "dataKnowledge",
    description: "Resolves conflicting data fields across CRM, ERP, and billing systems into a single source of truth.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Source Master Data Management MDM Consensus",
      ruSectionName: "Композитный Multi-Skill: Multi Source Master Data Management MDM Consensus",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Source Master Data Management MDM Consensus.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Source Master Data Management MDM Consensus.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-stage-time-series-anomaly-detection-pipeline": {
    id: "dataknowledge-multi-multi-stage-time-series-anomaly-detection-pipeline",
    name: "MultiStageTimeSeriesAnomalyDetectionPipelineSkill",
    displayName: "Multi Stage Time Series Anomaly Detection Pipeline",
    categoryId: "dataKnowledge",
    description: "Identifies trend spikes, seasonal outliers, and sensor drops in IoT time-series streams.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Time Series Anomaly Detection Pipeline",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Time Series Anomaly Detection Pipeline",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Time Series Anomaly Detection Pipeline.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Time Series Anomaly Detection Pipeline.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-layer-relational-data-normalization-3nf-audit": {
    id: "dataknowledge-multi-multi-layer-relational-data-normalization-3nf-audit",
    name: "MultiLayerRelationalDataNormalization3NFAuditSkill",
    displayName: "Multi Layer Relational Data Normalization 3NF Audit",
    categoryId: "dataKnowledge",
    description: "Audits SQL schemas ensuring 1NF, 2NF, and 3NF normalization eliminating redudancy.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Relational Data Normalization 3NF Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Relational Data Normalization 3NF Audit",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Relational Data Normalization 3NF Audit.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Relational Data Normalization 3NF Audit.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-provider-vector-database-benchmark-evaluation": {
    id: "dataknowledge-multi-multi-provider-vector-database-benchmark-evaluation",
    name: "MultiProviderVectorDatabaseBenchmarkEvaluationSkill",
    displayName: "Multi Provider Vector Database Benchmark Evaluation",
    categoryId: "dataKnowledge",
    description: "Benchmarks Pinecone, Qdrant, Milvus, and Weaviate on latency, recall, and indexing throughput.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Provider Vector Database Benchmark Evaluation",
      ruSectionName: "Композитный Multi-Skill: Multi Provider Vector Database Benchmark Evaluation",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Provider Vector Database Benchmark Evaluation.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Provider Vector Database Benchmark Evaluation.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-stage-automated-data-profiling-statistics-engine": {
    id: "dataknowledge-multi-multi-stage-automated-data-profiling-statistics-engine",
    name: "MultiStageAutomatedDataProfilingStatisticsEngineSkill",
    displayName: "Multi Stage Automated Data Profiling Statistics Engine",
    categoryId: "dataKnowledge",
    description: "Calculates null percentages, distributions, cardinality, and skewness across database columns.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Automated Data Profiling Statistics Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Automated Data Profiling Statistics Engine",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Automated Data Profiling Statistics Engine.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Automated Data Profiling Statistics Engine.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-source-api-web-scraping-resilient-harvester": {
    id: "dataknowledge-multi-multi-source-api-web-scraping-resilient-harvester",
    name: "MultiSourceAPIWebScrapingResilientHarvesterSkill",
    displayName: "Multi Source API Web Scraping Resilient Harvester",
    categoryId: "dataKnowledge",
    description: "Scrapes web pages handling IP rotation, CAPTCHAs, headless browser rendering, and parsing.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Source API Web Scraping Resilient Harvester",
      ruSectionName: "Композитный Multi-Skill: Multi Source API Web Scraping Resilient Harvester",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Source API Web Scraping Resilient Harvester.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Source API Web Scraping Resilient Harvester.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-layer-data-warehouse-dimensional-star-schema": {
    id: "dataknowledge-multi-multi-layer-data-warehouse-dimensional-star-schema",
    name: "MultiLayerDataWarehouseDimensionalStarSchemaSkill",
    displayName: "Multi Layer Data Warehouse Dimensional Star Schema",
    categoryId: "dataKnowledge",
    description: "Designs Kimball star schemas with fact tables and slowly changing dimensions (SCD Type 2).",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Data Warehouse Dimensional Star Schema",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Data Warehouse Dimensional Star Schema",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Data Warehouse Dimensional Star Schema.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Data Warehouse Dimensional Star Schema.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-stage-document-chunking-rag-optimization": {
    id: "dataknowledge-multi-multi-stage-document-chunking-rag-optimization",
    name: "MultiStageDocumentChunkingRAGOptimizationSkill",
    displayName: "Multi Stage Document Chunking RAG Optimization",
    categoryId: "dataKnowledge",
    description: "Optimizes document chunking strategies (semantic, sliding window, parent-child) for RAG.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Document Chunking RAG Optimization",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Document Chunking RAG Optimization",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Document Chunking RAG Optimization.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Document Chunking RAG Optimization.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-layer-data-encryption-at-rest-in-transit-architecture": {
    id: "dataknowledge-multi-multi-layer-data-encryption-at-rest-in-transit-architecture",
    name: "MultiLayerDataEncryptionatRestInTransitArchitectureSkill",
    displayName: "Multi Layer Data Encryption at Rest In Transit Architecture",
    categoryId: "dataKnowledge",
    description: "Configures AES-256 database encryption, TLS 1.3 transit encryption, and KMS key rotation.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Data Encryption at Rest In Transit Architecture",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Data Encryption at Rest In Transit Architecture",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Data Encryption at Rest In Transit Architecture.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Data Encryption at Rest In Transit Architecture.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-method-missing-data-imputation-pipeline": {
    id: "dataknowledge-multi-multi-method-missing-data-imputation-pipeline",
    name: "MultiMethodMissingDataImputationPipelineSkill",
    displayName: "Multi Method Missing Data Imputation Pipeline",
    categoryId: "dataKnowledge",
    description: "Imputes missing dataset values using mean, median, k-NN, or MICE statistical methods.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Missing Data Imputation Pipeline",
      ruSectionName: "Композитный Multi-Skill: Multi Method Missing Data Imputation Pipeline",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Method Missing Data Imputation Pipeline.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Method Missing Data Imputation Pipeline.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-provider-geospatial-spatial-query-engine": {
    id: "dataknowledge-multi-multi-provider-geospatial-spatial-query-engine",
    name: "MultiProviderGeospatialSpatialQueryEngineSkill",
    displayName: "Multi Provider Geospatial Spatial Query Engine",
    categoryId: "dataKnowledge",
    description: "Performs PostGIS spatial joins, buffer calculations, and distance queries on GeoJSON data.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Provider Geospatial Spatial Query Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Provider Geospatial Spatial Query Engine",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Provider Geospatial Spatial Query Engine.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Provider Geospatial Spatial Query Engine.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-stage-data-pipeline-quality-validation-expectations": {
    id: "dataknowledge-multi-multi-stage-data-pipeline-quality-validation-expectations",
    name: "MultiStageDataPipelineQualityValidationExpectationsSkill",
    displayName: "Multi Stage Data Pipeline Quality Validation Expectations",
    categoryId: "dataKnowledge",
    description: "Validates data pipeline outputs against Great Expectations rules (non-null, value ranges).",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Data Pipeline Quality Validation Expectations",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Data Pipeline Quality Validation Expectations",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Data Pipeline Quality Validation Expectations.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Data Pipeline Quality Validation Expectations.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-source-social-listening-aggregator-pipeline": {
    id: "dataknowledge-multi-multi-source-social-listening-aggregator-pipeline",
    name: "MultiSourceSocialListeningAggregatorPipelineSkill",
    displayName: "Multi Source Social Listening Aggregator Pipeline",
    categoryId: "dataKnowledge",
    description: "Aggregates social posts, filters spam, extracts hashtags, and computes brand sentiment.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Source Social Listening Aggregator Pipeline",
      ruSectionName: "Композитный Multi-Skill: Multi Source Social Listening Aggregator Pipeline",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Source Social Listening Aggregator Pipeline.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Source Social Listening Aggregator Pipeline.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-layer-database-indexing-query-tuning-blueprint": {
    id: "dataknowledge-multi-multi-layer-database-indexing-query-tuning-blueprint",
    name: "MultiLayerDatabaseIndexingQueryTuningBlueprintSkill",
    displayName: "Multi Layer Database Indexing Query Tuning Blueprint",
    categoryId: "dataKnowledge",
    description: "Tunes slow SQL queries adding B-Tree, GIN, GiST, and partial indexes for high IOPS.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Database Indexing Query Tuning Blueprint",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Database Indexing Query Tuning Blueprint",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Database Indexing Query Tuning Blueprint.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Database Indexing Query Tuning Blueprint.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-format-log-parser-regex-structuring-engine": {
    id: "dataknowledge-multi-multi-format-log-parser-regex-structuring-engine",
    name: "MultiFormatLogParserRegexStructuringEngineSkill",
    displayName: "Multi Format Log Parser Regex Structuring Engine",
    categoryId: "dataKnowledge",
    description: "Parses unformatted syslog, Nginx, and application logs into structured JSON event logs.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Format Log Parser Regex Structuring Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Format Log Parser Regex Structuring Engine",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Format Log Parser Regex Structuring Engine.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Format Log Parser Regex Structuring Engine.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-stage-machine-learning-feature-store-architecture": {
    id: "dataknowledge-multi-multi-stage-machine-learning-feature-store-architecture",
    name: "MultiStageMachineLearningFeatureStoreArchitectureSkill",
    displayName: "Multi Stage Machine Learning Feature Store Architecture",
    categoryId: "dataKnowledge",
    description: "Stores, versions, and serves online and offline ML features using Feast/Hopsworks.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Machine Learning Feature Store Architecture",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Machine Learning Feature Store Architecture",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Machine Learning Feature Store Architecture.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Machine Learning Feature Store Architecture.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-provider-distributed-database-sharding-partitioning": {
    id: "dataknowledge-multi-multi-provider-distributed-database-sharding-partitioning",
    name: "MultiProviderDistributedDatabaseShardingPartitioningSkill",
    displayName: "Multi Provider Distributed Database Sharding Partitioning",
    categoryId: "dataKnowledge",
    description: "Partitions high-volume database tables across database shards using hash keys.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Provider Distributed Database Sharding Partitioning",
      ruSectionName: "Композитный Multi-Skill: Multi Provider Distributed Database Sharding Partitioning",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Provider Distributed Database Sharding Partitioning.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Provider Distributed Database Sharding Partitioning.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-stage-natural-language-entity-disambiguation-engine": {
    id: "dataknowledge-multi-multi-stage-natural-language-entity-disambiguation-engine",
    name: "MultiStageNaturalLanguageEntityDisambiguationEngineSkill",
    displayName: "Multi Stage Natural Language Entity Disambiguation Engine",
    categoryId: "dataKnowledge",
    description: "Disambiguates named entities (e.g. 'Apple' company vs fruit) linking to Wikidata IDs.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Natural Language Entity Disambiguation Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Natural Language Entity Disambiguation Engine",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Natural Language Entity Disambiguation Engine.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Natural Language Entity Disambiguation Engine.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-layer-real-time-data-stream-processing-flink": {
    id: "dataknowledge-multi-multi-layer-real-time-data-stream-processing-flink",
    name: "MultiLayerRealTimeDataStreamProcessingFlinkSkill",
    displayName: "Multi Layer Real Time Data Stream Processing Flink",
    categoryId: "dataKnowledge",
    description: "Processes low-latency event streams using Apache Flink sliding time windows.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Real Time Data Stream Processing Flink",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Real Time Data Stream Processing Flink",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Real Time Data Stream Processing Flink.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Real Time Data Stream Processing Flink.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-format-graph-database-query-cypher-gremlin-engine": {
    id: "dataknowledge-multi-multi-format-graph-database-query-cypher-gremlin-engine",
    name: "MultiFormatGraphDatabaseQueryCypherGremlinEngineSkill",
    displayName: "Multi Format Graph Database Query Cypher Gremlin Engine",
    categoryId: "dataKnowledge",
    description: "Writes complex graph traversal queries in Cypher (Neo4j) and Gremlin (AWS Neptune).",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Format Graph Database Query Cypher Gremlin Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Format Graph Database Query Cypher Gremlin Engine",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Format Graph Database Query Cypher Gremlin Engine.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Format Graph Database Query Cypher Gremlin Engine.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-source-financial-market-data-feed-handler": {
    id: "dataknowledge-multi-multi-source-financial-market-data-feed-handler",
    name: "MultiSourceFinancialMarketDataFeedHandlerSkill",
    displayName: "Multi Source Financial Market Data Feed Handler",
    categoryId: "dataKnowledge",
    description: "Parses FIX protocol and WebSocket stock/crypto market depth orderbook feeds.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Source Financial Market Data Feed Handler",
      ruSectionName: "Композитный Multi-Skill: Multi Source Financial Market Data Feed Handler",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Source Financial Market Data Feed Handler.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Source Financial Market Data Feed Handler.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-stage-automated-data-classification-tagging": {
    id: "dataknowledge-multi-multi-stage-automated-data-classification-tagging",
    name: "MultiStageAutomatedDataClassificationTaggingSkill",
    displayName: "Multi Stage Automated Data Classification Tagging",
    categoryId: "dataKnowledge",
    description: "Classifies dataset columns by sensitivity level (Public, Internal, Confidential, Restricted).",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Automated Data Classification Tagging",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Automated Data Classification Tagging",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Automated Data Classification Tagging.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Automated Data Classification Tagging.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-layer-data-archival-cold-storage-lifecycle-rule": {
    id: "dataknowledge-multi-multi-layer-data-archival-cold-storage-lifecycle-rule",
    name: "MultiLayerDataArchivalColdStorageLifecycleRuleSkill",
    displayName: "Multi Layer Data Archival Cold Storage Lifecycle Rule",
    categoryId: "dataKnowledge",
    description: "Configures S3 Glacier lifecycle policies auto-archiving inactive data to low-cost storage.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Data Archival Cold Storage Lifecycle Rule",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Data Archival Cold Storage Lifecycle Rule",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Data Archival Cold Storage Lifecycle Rule.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Data Archival Cold Storage Lifecycle Rule.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-method-text-summarization-abstractive-extractive": {
    id: "dataknowledge-multi-multi-method-text-summarization-abstractive-extractive",
    name: "MultiMethodTextSummarizationAbstractiveExtractiveSkill",
    displayName: "Multi Method Text Summarization Abstractive Extractive",
    categoryId: "dataKnowledge",
    description: "Combines extractive key sentence scoring with abstractive transformer summarization.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Text Summarization Abstractive Extractive",
      ruSectionName: "Композитный Multi-Skill: Multi Method Text Summarization Abstractive Extractive",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Method Text Summarization Abstractive Extractive.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Method Text Summarization Abstractive Extractive.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-source-e-commerce-product-catalog-standardization": {
    id: "dataknowledge-multi-multi-source-e-commerce-product-catalog-standardization",
    name: "MultiSourceECommerceProductCatalogStandardizationSkill",
    displayName: "Multi Source E-Commerce Product Catalog Standardization",
    categoryId: "dataKnowledge",
    description: "Standardizes product titles, categories, and attributes across vendor supplier feeds.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Source E-Commerce Product Catalog Standardization",
      ruSectionName: "Композитный Multi-Skill: Multi Source E-Commerce Product Catalog Standardization",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Source E-Commerce Product Catalog Standardization.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Source E-Commerce Product Catalog Standardization.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-stage-image-feature-vector-extraction-engine": {
    id: "dataknowledge-multi-multi-stage-image-feature-vector-extraction-engine",
    name: "MultiStageImageFeatureVectorExtractionEngineSkill",
    displayName: "Multi Stage Image Feature Vector Extraction Engine",
    categoryId: "dataKnowledge",
    description: "Extracts image feature vectors using ResNet/CLIP for visual similarity search.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Image Feature Vector Extraction Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Image Feature Vector Extraction Engine",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Image Feature Vector Extraction Engine.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Image Feature Vector Extraction Engine.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-layer-database-connection-proxy-pooling-pgbouncer": {
    id: "dataknowledge-multi-multi-layer-database-connection-proxy-pooling-pgbouncer",
    name: "MultiLayerDatabaseConnectionProxyPoolingPgBouncerSkill",
    displayName: "Multi Layer Database Connection Proxy Pooling PgBouncer",
    categoryId: "dataKnowledge",
    description: "Configures PgBouncer transaction pooling reducing memory overhead on database servers.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Database Connection Proxy Pooling PgBouncer",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Database Connection Proxy Pooling PgBouncer",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Database Connection Proxy Pooling PgBouncer.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Database Connection Proxy Pooling PgBouncer.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-stage-audio-transcript-diarization-speaker-labeling": {
    id: "dataknowledge-multi-multi-stage-audio-transcript-diarization-speaker-labeling",
    name: "MultiStageAudioTranscriptDiarizationSpeakerLabelingSkill",
    displayName: "Multi Stage Audio Transcript Diarization Speaker Labeling",
    categoryId: "dataKnowledge",
    description: "Labels who spoke when in multi-speaker meeting audio transcripts using Whisper/PyAnnote.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Audio Transcript Diarization Speaker Labeling",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Audio Transcript Diarization Speaker Labeling",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Audio Transcript Diarization Speaker Labeling.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Audio Transcript Diarization Speaker Labeling.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-source-customer-data-platform-cdp-identity-resolution": {
    id: "dataknowledge-multi-multi-source-customer-data-platform-cdp-identity-resolution",
    name: "MultiSourceCustomerDataPlatformCDPIdentityResolutionSkill",
    displayName: "Multi Source Customer Data Platform CDP Identity Resolution",
    categoryId: "dataKnowledge",
    description: "Stitches anonymous web cookies, email leads, and mobile app IDs into unified user profiles.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Source Customer Data Platform CDP Identity Resolution",
      ruSectionName: "Композитный Multi-Skill: Multi Source Customer Data Platform CDP Identity Resolution",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Source Customer Data Platform CDP Identity Resolution.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Source Customer Data Platform CDP Identity Resolution.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-layer-data-lakehouse-delta-lake-apache-iceberg": {
    id: "dataknowledge-multi-multi-layer-data-lakehouse-delta-lake-apache-iceberg",
    name: "MultiLayerDataLakehouseDeltaLakeApacheIcebergSkill",
    displayName: "Multi Layer Data Lakehouse Delta Lake Apache Iceberg",
    categoryId: "dataKnowledge",
    description: "Configures Apache Iceberg/Delta Lake ACID transaction layers over object storage.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Data Lakehouse Delta Lake Apache Iceberg",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Data Lakehouse Delta Lake Apache Iceberg",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Data Lakehouse Delta Lake Apache Iceberg.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Data Lakehouse Delta Lake Apache Iceberg.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-method-outlier-detection-statistical-pipeline": {
    id: "dataknowledge-multi-multi-method-outlier-detection-statistical-pipeline",
    name: "MultiMethodOutlierDetectionStatisticalPipelineSkill",
    displayName: "Multi Method Outlier Detection Statistical Pipeline",
    categoryId: "dataKnowledge",
    description: "Identifies dataset anomalies using Z-score, Isolation Forests, and DBSCAN clustering.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Outlier Detection Statistical Pipeline",
      ruSectionName: "Композитный Multi-Skill: Multi Method Outlier Detection Statistical Pipeline",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Method Outlier Detection Statistical Pipeline.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Method Outlier Detection Statistical Pipeline.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-source-real-estate-mls-property-feed-aggregator": {
    id: "dataknowledge-multi-multi-source-real-estate-mls-property-feed-aggregator",
    name: "MultiSourceRealEstateMLSPropertyFeedAggregatorSkill",
    displayName: "Multi Source Real Estate MLS Property Feed Aggregator",
    categoryId: "dataKnowledge",
    description: "Aggregates and normalizes RETS/RESO MLS property listings into unified search index.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Source Real Estate MLS Property Feed Aggregator",
      ruSectionName: "Композитный Multi-Skill: Multi Source Real Estate MLS Property Feed Aggregator",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Source Real Estate MLS Property Feed Aggregator.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Source Real Estate MLS Property Feed Aggregator.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-layer-database-backup-point-in-time-recovery-pitr": {
    id: "dataknowledge-multi-multi-layer-database-backup-point-in-time-recovery-pitr",
    name: "MultiLayerDatabaseBackupPointinTimeRecoveryPITRSkill",
    displayName: "Multi Layer Database Backup Point in Time Recovery PITR",
    categoryId: "dataKnowledge",
    description: "Configures WAL streaming archiving enabling point-in-time database restoration to exact second.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Database Backup Point in Time Recovery PITR",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Database Backup Point in Time Recovery PITR",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Database Backup Point in Time Recovery PITR.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Database Backup Point in Time Recovery PITR.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-stage-natural-language-keyword-tf-idf-rake-extractor": {
    id: "dataknowledge-multi-multi-stage-natural-language-keyword-tf-idf-rake-extractor",
    name: "MultiStageNaturalLanguageKeywordTFIDFRAKEExtractorSkill",
    displayName: "Multi Stage Natural Language Keyword TF-IDF RAKE Extractor",
    categoryId: "dataKnowledge",
    description: "Extracts domain keyphrases using TF-IDF, RAKE, and TextRank algorithms.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Natural Language Keyword TF-IDF RAKE Extractor",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Natural Language Keyword TF-IDF RAKE Extractor",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Natural Language Keyword TF-IDF RAKE Extractor.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Natural Language Keyword TF-IDF RAKE Extractor.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-source-healthcare-hl7-fhir-interoperability-engine": {
    id: "dataknowledge-multi-multi-source-healthcare-hl7-fhir-interoperability-engine",
    name: "MultiSourceHealthcareHL7FHIRInteroperabilityEngineSkill",
    displayName: "Multi Source Healthcare HL7 FHIR Interoperability Engine",
    categoryId: "dataKnowledge",
    description: "Parses and transforms legacy HL7 v2 messages into modern FHIR JSON resources.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Source Healthcare HL7 FHIR Interoperability Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Source Healthcare HL7 FHIR Interoperability Engine",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Source Healthcare HL7 FHIR Interoperability Engine.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Source Healthcare HL7 FHIR Interoperability Engine.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-layer-columnar-database-clickhouse-query-optimization": {
    id: "dataknowledge-multi-multi-layer-columnar-database-clickhouse-query-optimization",
    name: "MultiLayerColumnarDatabaseClickHouseQueryOptimizationSkill",
    displayName: "Multi Layer Columnar Database ClickHouse Query Optimization",
    categoryId: "dataKnowledge",
    description: "Optimizes ClickHouse MergeTree primary keys, compression codecs, and materialized views.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Columnar Database ClickHouse Query Optimization",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Columnar Database ClickHouse Query Optimization",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Columnar Database ClickHouse Query Optimization.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Columnar Database ClickHouse Query Optimization.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-stage-video-metadata-extraction-scene-segmentation": {
    id: "dataknowledge-multi-multi-stage-video-metadata-extraction-scene-segmentation",
    name: "MultiStageVideoMetadataExtractionSceneSegmentationSkill",
    displayName: "Multi Stage Video Metadata Extraction Scene Segmentation",
    categoryId: "dataKnowledge",
    description: "Segments video files into scenes extracting keyframes, OCR text, and speech transcripts.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Video Metadata Extraction Scene Segmentation",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Video Metadata Extraction Scene Segmentation",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Video Metadata Extraction Scene Segmentation.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Video Metadata Extraction Scene Segmentation.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-source-supply-chain-shipment-tracking-aggregator": {
    id: "dataknowledge-multi-multi-source-supply-chain-shipment-tracking-aggregator",
    name: "MultiSourceSupplyChainShipmentTrackingAggregatorSkill",
    displayName: "Multi Source Supply Chain Shipment Tracking Aggregator",
    categoryId: "dataKnowledge",
    description: "Aggregates container tracking APIs across carriers into unified ETA status pipeline.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Source Supply Chain Shipment Tracking Aggregator",
      ruSectionName: "Композитный Multi-Skill: Multi Source Supply Chain Shipment Tracking Aggregator",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Source Supply Chain Shipment Tracking Aggregator.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Source Supply Chain Shipment Tracking Aggregator.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-layer-graph-retrieval-augmented-generation-graphrag": {
    id: "dataknowledge-multi-multi-layer-graph-retrieval-augmented-generation-graphrag",
    name: "MultiLayerGraphRetrievalAugmentedGenerationGraphRAGSkill",
    displayName: "Multi Layer Graph Retrieval Augmented Generation GraphRAG",
    categoryId: "dataKnowledge",
    description: "Combines Knowledge Graph node traversal with vector RAG for complex multi-hop QA.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Graph Retrieval Augmented Generation GraphRAG",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Graph Retrieval Augmented Generation GraphRAG",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Graph Retrieval Augmented Generation GraphRAG.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Graph Retrieval Augmented Generation GraphRAG.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-stage-survey-response-text-mining-topic-modeling": {
    id: "dataknowledge-multi-multi-stage-survey-response-text-mining-topic-modeling",
    name: "MultiStageSurveyResponseTextMiningTopicModelingSkill",
    displayName: "Multi Stage Survey Response Text Mining Topic Modeling",
    categoryId: "dataKnowledge",
    description: "Extracts latent topics from open-ended survey comments using BERTopic/LDA.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Survey Response Text Mining Topic Modeling",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Survey Response Text Mining Topic Modeling",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Survey Response Text Mining Topic Modeling.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Survey Response Text Mining Topic Modeling.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-source-patent-document-citation-graph-builder": {
    id: "dataknowledge-multi-multi-source-patent-document-citation-graph-builder",
    name: "MultiSourcePatentDocumentCitationGraphBuilderSkill",
    displayName: "Multi Source Patent Document Citation Graph Builder",
    categoryId: "dataKnowledge",
    description: "Builds patent citation trees mapping technology lineages and competitor IP portfolios.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Source Patent Document Citation Graph Builder",
      ruSectionName: "Композитный Multi-Skill: Multi Source Patent Document Citation Graph Builder",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Source Patent Document Citation Graph Builder.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Source Patent Document Citation Graph Builder.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-layer-web-application-firewall-waf-log-inspector": {
    id: "dataknowledge-multi-multi-layer-web-application-firewall-waf-log-inspector",
    name: "MultiLayerWebApplicationFirewallWAFLogInspectorSkill",
    displayName: "Multi Layer Web Application Firewall WAF Log Inspector",
    categoryId: "dataKnowledge",
    description: "Parses WAF alert logs identifying SQL injection and XSS attack patterns.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Web Application Firewall WAF Log Inspector",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Web Application Firewall WAF Log Inspector",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Web Application Firewall WAF Log Inspector.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Web Application Firewall WAF Log Inspector.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-stage-genetic-sequence-fasta-vcf-file-parser": {
    id: "dataknowledge-multi-multi-stage-genetic-sequence-fasta-vcf-file-parser",
    name: "MultiStageGeneticSequenceFASTAVCFFileParserSkill",
    displayName: "Multi Stage Genetic Sequence FASTA VCF File Parser",
    categoryId: "dataKnowledge",
    description: "Parses genomic variant call format (VCF) files extracting gene mutation annotations.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Genetic Sequence FASTA VCF File Parser",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Genetic Sequence FASTA VCF File Parser",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Genetic Sequence FASTA VCF File Parser.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Genetic Sequence FASTA VCF File Parser.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-source-news-article-event-extraction-pipeline": {
    id: "dataknowledge-multi-multi-source-news-article-event-extraction-pipeline",
    name: "MultiSourceNewsArticleEventExtractionPipelineSkill",
    displayName: "Multi Source News Article Event Extraction Pipeline",
    categoryId: "dataKnowledge",
    description: "Extracts who, what, where, when event facts from worldwide news RSS feeds.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Source News Article Event Extraction Pipeline",
      ruSectionName: "Композитный Multi-Skill: Multi Source News Article Event Extraction Pipeline",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Source News Article Event Extraction Pipeline.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Source News Article Event Extraction Pipeline.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-layer-high-velocity-key-value-store-redis-cluster": {
    id: "dataknowledge-multi-multi-layer-high-velocity-key-value-store-redis-cluster",
    name: "MultiLayerHighVelocityKeyValueStoreRedisClusterSkill",
    displayName: "Multi Layer High Velocity Key Value Store Redis Cluster",
    categoryId: "dataKnowledge",
    description: "Configures Redis cluster hash slot sharding and sentinel automatic failover.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer High Velocity Key Value Store Redis Cluster",
      ruSectionName: "Композитный Multi-Skill: Multi Layer High Velocity Key Value Store Redis Cluster",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer High Velocity Key Value Store Redis Cluster.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer High Velocity Key Value Store Redis Cluster.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-stage-pdf-form-field-interactive-coordinate-extractor": {
    id: "dataknowledge-multi-multi-stage-pdf-form-field-interactive-coordinate-extractor",
    name: "MultiStagePDFFormFieldInteractiveCoordinateExtractorSkill",
    displayName: "Multi Stage PDF Form Field Interactive Coordinate Extractor",
    categoryId: "dataKnowledge",
    description: "Extracts form field coordinates and checkbox states from fillable PDF forms.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage PDF Form Field Interactive Coordinate Extractor",
      ruSectionName: "Композитный Multi-Skill: Multi Stage PDF Form Field Interactive Coordinate Extractor",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage PDF Form Field Interactive Coordinate Extractor.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage PDF Form Field Interactive Coordinate Extractor.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-source-cryptocurrency-blockchain-ledger-indexer": {
    id: "dataknowledge-multi-multi-source-cryptocurrency-blockchain-ledger-indexer",
    name: "MultiSourceCryptocurrencyBlockchainLedgerIndexerSkill",
    displayName: "Multi Source Cryptocurrency Blockchain Ledger Indexer",
    categoryId: "dataKnowledge",
    description: "Indexes EVM transaction logs, ERC-20 token transfers, and smart contract events.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Source Cryptocurrency Blockchain Ledger Indexer",
      ruSectionName: "Композитный Multi-Skill: Multi Source Cryptocurrency Blockchain Ledger Indexer",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Source Cryptocurrency Blockchain Ledger Indexer.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Source Cryptocurrency Blockchain Ledger Indexer.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-layer-open-data-ckan-api-harvesting-engine": {
    id: "dataknowledge-multi-multi-layer-open-data-ckan-api-harvesting-engine",
    name: "MultiLayerOpenDataCKANAPIHarvestingEngineSkill",
    displayName: "Multi Layer Open Data CKAN API Harvesting Engine",
    categoryId: "dataKnowledge",
    description: "Harvests open government datasets from CKAN platforms into centralized portal.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Open Data CKAN API Harvesting Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Open Data CKAN API Harvesting Engine",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Open Data CKAN API Harvesting Engine.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Open Data CKAN API Harvesting Engine.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-stage-speech-recognition-phoneme-alignment-pipeline": {
    id: "dataknowledge-multi-multi-stage-speech-recognition-phoneme-alignment-pipeline",
    name: "MultiStageSpeechRecognitionPhonemeAlignmentPipelineSkill",
    displayName: "Multi Stage Speech Recognition Phoneme Alignment Pipeline",
    categoryId: "dataKnowledge",
    description: "Aligns spoken audio timestamps with word-level phonetic transcripts.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Speech Recognition Phoneme Alignment Pipeline",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Speech Recognition Phoneme Alignment Pipeline",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Speech Recognition Phoneme Alignment Pipeline.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Speech Recognition Phoneme Alignment Pipeline.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-source-meteorological-weather-forecast-aggregator": {
    id: "dataknowledge-multi-multi-source-meteorological-weather-forecast-aggregator",
    name: "MultiSourceMeteorologicalWeatherForecastAggregatorSkill",
    displayName: "Multi Source Meteorological Weather Forecast Aggregator",
    categoryId: "dataKnowledge",
    description: "Aggregates NOAA, ECMWF, and local weather station data into unified weather API.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Source Meteorological Weather Forecast Aggregator",
      ruSectionName: "Композитный Multi-Skill: Multi Source Meteorological Weather Forecast Aggregator",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Source Meteorological Weather Forecast Aggregator.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Source Meteorological Weather Forecast Aggregator.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },

  "dataknowledge-multi-multi-horizon-master-data-engineering-knowledge-engine": {
    id: "dataknowledge-multi-multi-horizon-master-data-engineering-knowledge-engine",
    name: "MultiHorizonMasterDataEngineeringKnowledgeEngineSkill",
    displayName: "Multi Horizon Master Data Engineering Knowledge Engine",
    categoryId: "dataKnowledge",
    description: "Enforces master data modeling, pipeline scalability, vector storage, and analytics architecture.",
    tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Master Data Engineering Knowledge Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Master Data Engineering Knowledge Engine",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Horizon Master Data Engineering Knowledge Engine.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Horizon Master Data Engineering Knowledge Engine.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["dataKnowledge","multi-skill","dataknowledge-multi"],
    }),
  },
};
