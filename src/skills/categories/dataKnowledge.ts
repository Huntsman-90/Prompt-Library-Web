import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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
};
