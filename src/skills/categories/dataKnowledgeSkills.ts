import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const DATA_KNOWLEDGE_SKILLS: Record<string, SkillDefinition> = {
  'schema-taxonomy-design': {
    id: 'schema-taxonomy-design',
    name: 'SchemaTaxonomyDesignSkill',
    displayName: 'Domain Taxonomy & Data Ontology Design',
    categoryId: 'data_knowledge',
    description: 'Constructs unambiguous hierarchical taxonomies, categorical ontologies, and entity relationships.',
    tags: ['data_knowledge', 'taxonomy', 'ontology', 'data-modeling', 'hierarchy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Проектирование Таксономии и Онтологии Данных',
        'Domain Taxonomy & Categorical Ontology Design',
        [
          '- Построить строгую иерархическую таксономию (Категория -> Подкатегория -> Атрибут) с взаимно исключающими терминами (MECE).',
          '- Зафиксировать канонические идентификаторы (slugs) для каждой сущности.',
        ],
        [
          '- Construct a Mutually Exclusive, Collectively Exhaustive (MECE) hierarchical taxonomy (Category -> Subcategory -> Attribute).',
          '- Assign immutable canonical slugs and semantic URIs for each ontology node.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'sql-query-optimization': {
    id: 'sql-query-optimization',
    name: 'SQLQueryOptimizationSkill',
    displayName: 'Advanced SQL Query Optimization',
    categoryId: 'data_knowledge',
    description: 'Refactors slow queries using CTEs, window functions (ROW_NUMBER, LAG, LEAD), and composite indexing.',
    tags: ['data_knowledge', 'sql', 'query-optimization', 'window-functions', 'cte', 'postgres'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Продвинутая Оптимизация SQL-Запросов',
        'Advanced SQL Optimization & Window Functions',
        [
          '- Использовать Common Table Expressions (CTE) и оконные функции (`ROW_NUMBER() OVER (...)`) вместо ресурсоемких подзапросов.',
          '- Проверить наличие `INDEX` по всем полям в блоках `WHERE`, `JOIN` и `ORDER BY`.',
        ],
        [
          '- Refactor correlated subqueries into clean Common Table Expressions (CTEs) and analytical window functions (`ROW_NUMBER() OVER (...)`).',
          '- Validate index coverage across all predicate columns in `JOIN`, `WHERE`, and `GROUP BY` clauses.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'data-integrity-validation': {
    id: 'data-integrity-validation',
    name: 'DataIntegrityValidationSkill',
    displayName: 'Data Integrity & Referential Constraints',
    categoryId: 'data_knowledge',
    description: 'Enforces ACID integrity rules: foreign key cascades, check constraints, unique indexes, and transaction isolation.',
    tags: ['data_knowledge', 'acid', 'integrity', 'constraints', 'foreign-keys'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Контроль Целостности Данных (ACID Invariants)',
        'Data Integrity & Referential Invariant Constraints',
        [
          '- Запрещены сиротские записи (orphan records): использовать `ON DELETE CASCADE / RESTRICT`.',
          '- Ограничения `CHECK` на бизнес-правила (например: `check (amount > 0)`).',
        ],
        [
          '- Prohibit orphan records via explicit `ON DELETE CASCADE` or `RESTRICT` foreign key contracts.',
          '- Embed database-level `CHECK` constraints asserting domain boundaries (e.g. `CHECK (balance >= 0)`).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'normalization-third-normal-form': {
    id: 'normalization-third-normal-form',
    name: 'NormalizationThirdNormalFormSkill',
    displayName: 'Database Normalization (3NF & BCNF)',
    categoryId: 'data_knowledge',
    description: 'Normalizes relational data models to 3rd Normal Form (3NF) to eliminate update anomalies and duplication.',
    tags: ['data_knowledge', 'normalization', '3nf', 'bcnf', 'relational', 'database'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Нормализация Баз Данных (3NF / BCNF)',
        'Relational Database Normalization (3NF & BCNF)',
        [
          '- Устранить транзитивные зависимости; каждый неключевой атрибут должен зависеть строго от первичного ключа целиком.',
        ],
        [
          '- Eliminate transitive and partial functional dependencies; guarantee every non-key column depends solely on the primary key.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'entity-relationship-modeling': {
    id: 'entity-relationship-modeling',
    name: 'EntityRelationshipModelingSkill',
    displayName: 'Entity-Relationship (ERD) Architecture',
    categoryId: 'data_knowledge',
    description: 'Defines 1:1, 1:N, and N:M cardinality relationships with junction tables and composite primary keys.',
    tags: ['data_knowledge', 'erd', 'cardinality', 'modeling', 'junction-tables'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'ER-Моделирование и Кардинальность Связей',
        'Entity-Relationship Diagram (ERD) & Cardinality',
        [
          '- Описать кардинальность всех связей (1:1, 1:N, N:M); для N:M спроектировать промежуточную таблицу-связку с составным PK.',
        ],
        [
          '- Specify formal cardinality (1:1, 1:N, N:M) across all entities; model junction bridge tables for many-to-many relationships.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'etl-pipeline-data-flow': {
    id: 'etl-pipeline-data-flow',
    name: 'EtlPipelineDataFlowSkill',
    displayName: 'ETL / ELT Pipeline Architecture',
    categoryId: 'data_knowledge',
    description: 'Designs resilient Extract-Transform-Load pipelines with dead-letter queues, idempotent upserts, and DAGs.',
    tags: ['data_knowledge', 'etl', 'elt', 'pipelines', 'data-engineering'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Архитектура Конвейера ETL / ELT',
        'Resilient ETL / ELT Data Pipeline Architecture',
        [
          '- **Extract**: Инкрементальная выгрузка по `updated_at`.',
          '- **Transform**: Валидация типов и очистка от дублей.',
          '- **Load**: Идемпотентный апсерт (`INSERT ... ON CONFLICT DO UPDATE`).',
          '- **Dead-Letter Queue**: Сбор поврежденных записей для ручного аудита.',
        ],
        [
          '- **Extract**: Incremental change data capture (CDC) based on monotonic timestamp watermarks.',
          '- **Transform**: Schema validation, deduplication, and surrogate key mapping.',
          '- **Load**: Idempotent upsert semantics (`INSERT ... ON CONFLICT DO UPDATE`).',
          '- **Dead-Letter Queue (DLQ)**: Isolated routing for corrupted records.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'vector-embedding-indexing': {
    id: 'vector-embedding-indexing',
    name: 'VectorEmbeddingIndexingSkill',
    displayName: 'Vector Embedding & HNSW Semantic Search',
    categoryId: 'data_knowledge',
    description: 'Designs vector search architectures using pgvector, HNSW / IVFFlat indexing, cosine similarity, and chunking.',
    tags: ['data_knowledge', 'vector', 'embeddings', 'hnsw', 'rag', 'pgvector', 'semantic-search'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Векторные Эмбеддинги и Поиск HNSW (pgvector)',
        'Vector Embedding & HNSW Indexing Architecture',
        [
          '- Чанкинг: разбить документы на блоки по 512 токенов с перекрытием 10% (overlap).',
          '- Индексация: создать HNSW индекс (`m=16, ef_construction=64`) по косинусному расстоянию (`vector_cosine_ops`).',
        ],
        [
          '- Chunking strategy: Partition text into 512-token chunks with 10% semantic sliding overlap.',
          '- Indexing topology: Create HNSW index (`m=16, ef_construction=64`) over cosine distance (`vector_cosine_ops`).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'metric-definition-standard': {
    id: 'metric-definition-standard',
    name: 'MetricDefinitionStandardSkill',
    displayName: 'Canonical Metric Semantic Layer',
    categoryId: 'data_knowledge',
    description: 'Establishes unambiguous formulas, denominators, exclusions, and business definitions for all enterprise KPIs.',
    tags: ['data_knowledge', 'metrics', 'kpis', 'semantic-layer', 'bi'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Канонический Семантический Слой Метрик',
        'Enterprise Metric Semantic Layer Standard',
        [
          '- Для каждой метрики зафиксировать: точную математическую формулу, числитель, знаменатель, правила фильтрации и период агрегации.',
        ],
        [
          '- Itemize canonical metric definitions: explicit SQL numerator, denominator, filtering exclusions, and attribution windows.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'data-dictionary-glossary': {
    id: 'data-dictionary-glossary',
    name: 'DataDictionaryGlossarySkill',
    displayName: 'Enterprise Data Dictionary & Glossary',
    categoryId: 'data_knowledge',
    description: 'Generates comprehensive data dictionaries with column names, SQL types, nullability, descriptions, and examples.',
    tags: ['data_knowledge', 'data-dictionary', 'glossary', 'documentation', 'schema'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Словарь Данных (Data Dictionary)',
        'Enterprise Data Dictionary Matrix',
        [
          '| Поле (Column) | Тип Данных (SQL) | Nullable? | Описание Назначения | Пример Значения |',
          '|---|---|:---:|---|---|',
          '| `user_id` | `UUID` | NO | Уникальный суррогатный ключ пользователя | `a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11` |',
        ],
        [
          '| Column Name | SQL Type | Nullable? | Domain Description | Canonical Example |',
          '|---|---|:---:|---|---|',
          '| `user_id` | `UUID` | NO | Immutable surrogate customer primary key | `a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11` |',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'anomaly-detection-criteria': {
    id: 'anomaly-detection-criteria',
    name: 'AnomalyDetectionCriteriaSkill',
    displayName: 'Statistical Data Anomaly Detection',
    categoryId: 'data_knowledge',
    description: 'Configures 3-Sigma z-score thresholds, IQR bounds, and heuristic outlier filters for incoming data streams.',
    tags: ['data_knowledge', 'anomaly-detection', 'statistics', 'outliers', 'quality'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Критерии Обнаружения Статистических Аномалий',
        'Statistical Anomaly Detection & Outlier Filters',
        [
          '- Вычислять Z-score для числовых метрик; значения с `|Z| > 3.0` помечать как аномальные выбросы и отправлять на алерт.',
        ],
        [
          '- Compute rolling Z-score thresholds; flag telemetry points with `|Z| > 3.0` as statistical anomalies triggering SRE alerts.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'json-schema-validation-rule': {
    id: 'json-schema-validation-rule',
    name: 'JsonSchemaValidationRuleSkill',
    displayName: 'JSON Schema Draft 2020-12 Spec',
    categoryId: 'data_knowledge',
    description: 'Produces full JSON Schema Draft 2020-12 specifications with `$schema`, `required`, and regex patterns.',
    tags: ['data_knowledge', 'json-schema', 'validation', 'specs', 'schema'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Спецификация JSON Schema Draft 2020-12',
        'JSON Schema Draft 2020-12 Specification',
        [
          'Описать схему в формате JSON Schema с полями `$schema`, `type: object`, `required: [...]`, `additionalProperties: false`.',
        ],
        [
          'Emit formal JSON Schema Draft 2020-12 specification with strict `$schema`, `required: [...]`, and `additionalProperties: false`.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'time-series-aggregation-syntax': {
    id: 'time-series-aggregation-syntax',
    name: 'TimeSeriesAggregationSyntaxSkill',
    displayName: 'Time-Series Aggregation & Bucketing',
    categoryId: 'data_knowledge',
    description: 'Implements TimescaleDB / Postgres `time_bucket()` aggregations with continuous rollups.',
    tags: ['data_knowledge', 'time-series', 'timescale', 'aggregation', 'rollups'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Агрегация Временных Рядов (Time-Series Bucketing)',
        'Time-Series Aggregation & Rollup Syntax',
        [
          '- Использовать `date_trunc(\'hour\', created_at)` или `time_bucket(\'5 minutes\', time)` для вычисления скользящих средних.',
        ],
        [
          '- Leverage `date_trunc(\'hour\', created_at)` or Timescale `time_bucket(\'5 minutes\', ts)` for continuous rollup aggregations.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'partitioning-sharding-strategy': {
    id: 'partitioning-sharding-strategy',
    name: 'PartitioningShardingStrategySkill',
    displayName: 'PostgreSQL Declarative Partitioning & Sharding',
    categoryId: 'data_knowledge',
    description: 'Designs declarative range/list partitioning by date or tenant ID for hundred-gigabyte tables.',
    tags: ['data_knowledge', 'partitioning', 'sharding', 'postgres', 'scaling'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Партиционирование Таблиц (Declarative Partitioning)',
        'PostgreSQL Declarative Partitioning Architecture',
        [
          '- Спроектировать партиционирование по диапазону дат (`PARTITION BY RANGE (created_at)`) с автоматическим созданием помесячных секций.',
        ],
        [
          '- Engineer declarative date-range partitioning (`PARTITION BY RANGE (created_at)`) with automated monthly table creation scripts.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'master-data-governance': {
    id: 'master-data-governance',
    name: 'MasterDataGovernanceSkill',
    displayName: 'Master Data Governance (MDM) & Golden Record',
    categoryId: 'data_knowledge',
    description: 'Designs single-source-of-truth master data reconciliation, deduplication, and data lineage audits.',
    tags: ['data_knowledge', 'mdm', 'governance', 'golden-record', 'lineage'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Управление Мастер-Данными (Golden Record MDM)',
        'Master Data Governance & Golden Record Reconciliation',
        [
          '- Определить правила формирования "золотой записи" (Golden Record) при конфликтах между CRM, биллингом и базой приложения.',
        ],
        [
          '- Establish canonical Golden Record precedence rules resolving schema conflicts across CRM, Billing, and Production tiers.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
