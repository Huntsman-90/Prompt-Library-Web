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
};
