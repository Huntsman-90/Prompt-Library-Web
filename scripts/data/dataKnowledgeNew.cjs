const newDataKnowledgeSkills = [
  {
    id: 'data-lakehouse-medallion-architecture',
    name: 'DataLakehouseMedallionArchitectureSkill',
    displayName: 'Medallion Lakehouse Architecture (Bronze/Silver/Gold)',
    categoryId: 'data_knowledge',
    description: 'Designs structured data lakehouse tiers from raw streaming ingestion to cleaned enterprise dimension models.',
    tags: ['data', 'lakehouse', 'medallion', 'delta-lake', 'data-engineering'],
    sectionName: 'Medallion Lakehouse Architecture',
    ruSectionName: 'Медальонная архитектура Lakehouse (Bronze / Silver / Gold)',
    semanticType: 'strategy_framework',
    instructions: [
      'Define Bronze tier for immutable raw event streaming and change-data-capture (CDC).',
      'Specify Silver tier for deduplication, schema enforcement, and enriched entity tables.',
      'Construct Gold tier aggregated marts optimized for high-performance BI reporting.'
    ],
    ruInstructions: [
      'Спроектируйте Bronze-слой для неизменяемого сырого потока данных и CDC.',
      'Опишите Silver-слой для дедупликации, очистки и валидации схем.',
      'Постройте Gold-витрины с агрегатами, оптимизированными под BI и аналитику.'
    ]
  },
  {
    id: 'slowly-changing-dimensions-scd2-modeling',
    name: 'SlowlyChangingDimensionsScd2ModelingSkill',
    displayName: 'Slowly Changing Dimensions (SCD Type 2 & 4)',
    categoryId: 'data_knowledge',
    description: 'Models historical entity mutations using surrogate keys, valid_from/valid_to timestamps, and active flags.',
    tags: ['data', 'data-modeling', 'scd2', 'data-warehouse', 'kimball'],
    sectionName: 'SCD Dimension Modeling Protocol',
    ruSectionName: 'Моделирование медленно меняющихся измерений (SCD2 / SCD4)',
    semanticType: 'process_directive',
    instructions: [
      'Define effective date range tracking columns: `valid_from_ts`, `valid_to_ts`, and `is_current_flag`.',
      'Handle out-of-order event ingestion with atomic version insertion and timestamp reconciliation.',
      'Provide standard idempotent merge/upsert SQL statements.'
    ],
    ruInstructions: [
      'Добавьте поля отслеживания версий: valid_from, valid_to и is_current.',
      'Обработайте сценарии поступления данных не по порядку с коррекцией версий.',
      'Предоставьте идемпотентные SQL-запросы слияния и обновления (MERGE).'
    ]
  },
  {
    id: 'dbt-semantic-layer-metricflow-spec',
    name: 'DbtSemanticLayerMetricflowSpecSkill',
    displayName: 'dbt Semantic Layer & MetricFlow Governance',
    categoryId: 'data_knowledge',
    description: 'Defines governed enterprise metrics, semantic models, entities, and dimensions using dbt Semantic Layer standard specs.',
    tags: ['data', 'dbt', 'metricflow', 'semantic-layer', 'metrics-governance'],
    sectionName: 'dbt Semantic Layer & Metrics Spec',
    ruSectionName: 'Семантический слой dbt и управление метриками (MetricFlow)',
    semanticType: 'process_directive',
    instructions: [
      'Define semantic models with primary/foreign entities, measures, and time grains.',
      'Specify derived and cumulative metrics with mathematical precision.',
      'Ensure single-source-of-truth definitions for cross-BI consumption.'
    ],
    ruInstructions: [
      'Опишите семантические модели с сущностями, мерами и временной гранулярностью.',
      'Сформулируйте производные и кумулятивные метрики с точными формулами.',
      'Обеспечьте единый источник правды для всех BI-инструментов.'
    ]
  },
  {
    id: 'vector-database-hsnw-indexing-optimizer',
    name: 'VectorDatabaseHsnwIndexingOptimizerSkill',
    displayName: 'Vector Search Indexing (HNSW & IVF-PQ)',
    categoryId: 'data_knowledge',
    description: 'Tunes vector index parameters (M, efConstruction, efSearch, metric distance) for low-latency similarity search.',
    tags: ['data', 'vector-db', 'hnsw', 'embeddings', 'similarity-search'],
    sectionName: 'Vector Index Optimization Protocol',
    ruSectionName: 'Оптимизация векторных индексов (HNSW / IVF-PQ)',
    semanticType: 'process_directive',
    instructions: [
      'Choose distance metric (Cosine, L2 Euclidean, Dot Product) aligned with embedding normalization.',
      'Tune HNSW graph parameters: balance `M` (connections) and `efConstruction` against memory footprint.',
      'Implement hybrid sparse-dense reciprocal rank fusion (RRF).'
    ],
    ruInstructions: [
      'Выберите метрику расстояния (косинус, L2, скалярное произведение) под нормализацию эмбеддингов.',
      'Сбалансируйте параметры графа HNSW (M, efConstruction) с учетом объема оперативной памяти.',
      'Настройте гибридный поиск (sparse + dense) с алгоритмом RRF.'
    ]
  },
  {
    id: 'data-lineage-openlineage-governance',
    name: 'DataLineageOpenlineageGovernanceSkill',
    displayName: 'Data Lineage & Column-Level Impact Tracing',
    categoryId: 'data_knowledge',
    description: 'Tracks upstream/downstream column-level dependencies and pipeline provenance using OpenLineage and Marquez standards.',
    tags: ['data', 'data-lineage', 'openlineage', 'governance', 'metadata'],
    sectionName: 'Data Lineage Governance Protocol',
    ruSectionName: 'Управление происхождением данных (Lineage) и аудит влияния изменений',
    semanticType: 'process_directive',
    instructions: [
      'Map full transformation lineage from source raw feeds to destination dashboards.',
      'Evaluate column-level breaking change blast radius before modifying DDL.',
      'Emit OpenLineage run events across job start, complete, and fail phases.'
    ],
    ruInstructions: [
      'Постройте полную цепочку зависимостей от источников до конечных отчетов.',
      'Оцените радиус поражения при изменении колонок до внесения правок в схемы.',
      'Сформируйте события OpenLineage для мониторинга фаз выполнения пайплайнов.'
    ]
  },
  {
    id: 'kafka-event-streaming-partitioning-strategy',
    name: 'KafkaEventStreamingPartitioningStrategySkill',
    displayName: 'Kafka Partitioning, Keying & Exactly-Once Semantics',
    categoryId: 'data_knowledge',
    description: 'Architects distributed Kafka topics, partition key hashing, consumer lag monitoring, and transactional idempotence.',
    tags: ['data', 'kafka', 'streaming', 'partitioning', 'exactly-once'],
    sectionName: 'Kafka Partitioning & Streaming Architecture',
    ruSectionName: 'Архитектура партиционирования и потоковой обработки Kafka',
    semanticType: 'strategy_framework',
    instructions: [
      'Design partition keys to prevent hot partitions while guaranteeing strict message ordering.',
      'Configure Producer idempotence (`enable.idempotence=true`, `acks=all`) and consumer read-committed isolation.',
      'Set retention, compaction, and dead-letter queue (DLQ) policies.'
    ],
    ruInstructions: [
      'Спроектируйте ключи партиционирования для равномерного распределения и сохранения порядка сообщений.',
      'Настройте идемпотентные продюсеры и изоляцию транзакций у консьюмеров.',
      'Задайте политики компактизации, хранения и очереди недоставленных сообщений (DLQ).'
    ]
  },
  {
    id: 'graph-database-cypher-property-modeling',
    name: 'GraphDatabaseCypherPropertyModelingSkill',
    displayName: 'Property Graph Modeling & Cypher Optimization',
    categoryId: 'data_knowledge',
    description: 'Models complex interconnected networks, knowledge graphs, and fraud patterns using labeled property graphs and Cypher.',
    tags: ['data', 'graph-db', 'neo4j', 'cypher', 'knowledge-graph'],
    sectionName: 'Property Graph Modeling & Cypher Protocol',
    ruSectionName: 'Моделирование графов свойств и оптимизация Cypher',
    semanticType: 'process_directive',
    instructions: [
      'Define domain entities as Nodes with clear Labels, and actions/relations as directed Relationships.',
      'Avoid high-degree supernode bottlenecks with intermediate indexing or relationship grouping.',
      'Write optimized Cypher traversal queries leveraging index-backed anchors.'
    ],
    ruInstructions: [
      'Определите узлы (Nodes) с метками и направленные связи (Relationships) со свойствами.',
      'Устраните риски суперузлов высокой степени связанности через промежуточные вершины.',
      'Составьте оптимизированные Cypher-запросы с использованием якорных индексов.'
    ]
  },
  {
    id: 'feature-store-online-offline-sync-spec',
    name: 'FeatureStoreOnlineOfflineSyncSpecSkill',
    displayName: 'ML Feature Store (Online/Offline) Synchronization',
    categoryId: 'data_knowledge',
    description: 'Designs low-latency online key-value feature stores (Redis) synced with point-in-time correct offline historical lakes (Feast/Hopsworks).',
    tags: ['data', 'feature-store', 'mlops', 'point-in-time', 'feast'],
    sectionName: 'ML Feature Store Architecture',
    ruSectionName: 'Архитектура Feature Store для машинного обучения (Online/Offline)',
    semanticType: 'strategy_framework',
    instructions: [
      'Define Feature Views with strict entity keys, timestamp fields, and aggregations.',
      'Guarantee point-in-time correctness during offline historical training dataset generation.',
      'Configure real-time stream ingestion for sub-10ms online inference lookups.'
    ],
    ruInstructions: [
      'Опишите Feature Views с первичными ключами сущностей и временными срезами.',
      'Обеспечьте корректность исторических срезов без утечки данных из будущего.',
      'Настройте синхронизацию с online-хранилищем для выдачи фичей быстрее 10 мс.'
    ]
  },
  {
    id: 'data-contracts-json-schema-enforcement',
    name: 'DataContractsJsonSchemaEnforcementSkill',
    displayName: 'Data Contracts & Schema Evolution Governance',
    categoryId: 'data_knowledge',
    description: 'Enforces formal data contracts between software engineering producers and data analytics consumers with CI validation.',
    tags: ['data', 'data-contracts', 'schema-governance', 'json-schema', 'ci-cd'],
    sectionName: 'Data Contract Specification & Governance',
    ruSectionName: 'Спецификация дата-контрактов и версионирование схем',
    semanticType: 'process_directive',
    instructions: [
      'Specify contract terms: schema definition, SLA timeliness, quality guarantees, and breaking change notice periods.',
      'Implement strict schema backward/forward compatibility checks in CI/CD.',
      'Provide fallback and error quashing protocols on schema contract violations.'
    ],
    ruInstructions: [
      'Зафиксируйте условия контракта: схемы, SLA доставки, правила качества данных.',
      'Внедрите автоматическую проверку обратной совместимости схем в CI/CD.',
      'Опишите обработку нарушений контракта и изоляцию некорректных батчей.'
    ]
  },
  {
    id: 'clickhouse-olap-sharding-engine-tuning',
    name: 'ClickhouseOlapShardingEngineTuningSkill',
    displayName: 'ClickHouse OLAP Engine & Sharding Optimization',
    categoryId: 'data_knowledge',
    description: 'Configures ReplacingMergeTree, AggregatingMergeTree, distributed sharding keys, and skip indexes for billion-row real-time analytics.',
    tags: ['data', 'clickhouse', 'olap', 'mergetree', 'real-time-analytics'],
    sectionName: 'ClickHouse OLAP Configuration Protocol',
    ruSectionName: 'Оптимизация ClickHouse OLAP движков и шардирования',
    semanticType: 'process_directive',
    instructions: [
      'Select appropriate MergeTree engine variant (Replacing, Collapsing, Summing, or Aggregating).',
      'Choose PRIMARY KEY and ORDER BY columns ordered strictly by increasing cardinality.',
      'Configure secondary data skipping indexes (minmax, bloom_filter, set) for sparse lookups.'
    ],
    ruInstructions: [
      'Выберите семейство MergeTree (Replacing, Collapsing, Aggregating) под тип нагрузки.',
      'Задайте ORDER BY колонки в порядке возрастания мощности (cardinality).',
      'Настройте пропускающие индексы (minmax, bloom filter) для ускорения фильтрации.'
    ]
  },
  {
    id: 'spark-distributed-join-skew-mitigation',
    name: 'SparkDistributedJoinSkewMitigationSkill',
    displayName: 'Apache Spark Data Skew & Distributed Join Optimization',
    categoryId: 'data_knowledge',
    description: 'Removes out-of-memory OOM bottlenecks, optimizes broadcast hash joins, and salts high-cardinality skew keys.',
    tags: ['data', 'spark', 'data-skew', 'broadcast-join', 'distributed-computing'],
    sectionName: 'Spark Skew Mitigation & Join Optimization',
    ruSectionName: 'Устранение перекоса данных (Data Skew) и оптимизация джойнов в Spark',
    semanticType: 'process_directive',
    instructions: [
      'Identify skewed join keys causing stranded single-task executor bottlenecks.',
      'Apply key salting with random salt prefixes and replicated cross-joins.',
      'Leverage Broadcast Hash Joins for dimension tables smaller than the broadcast threshold.'
    ],
    ruInstructions: [
      'Выявите перекошенные ключи объединения, перегружающие отдельные исполнители (executors).',
      'Примените технику соления ключей (key salting) для равномерного распределения партиций.',
      'Используйте Broadcast Hash Join для небольших справочников.'
    ]
  },
  {
    id: 'time-series-downsampling-retention-policy',
    name: 'TimeSeriesDownsamplingRetentionPolicySkill',
    displayName: 'Time-Series Downsampling & Rollup Retention',
    categoryId: 'data_knowledge',
    description: 'Configures multi-tier time-series storage policies (e.g. 10-second raw -> 1-minute 30-day -> 1-hour 1-year rollups).',
    tags: ['data', 'time-series', 'downsampling', 'rollups', 'retention-policy'],
    sectionName: 'Time-Series Downsampling Architecture',
    ruSectionName: 'Архитектура сжатия и хранения временных рядов (Downsampling)',
    semanticType: 'process_directive',
    instructions: [
      'Define tiered rollup schedules: High Resolution (1s/10s), Medium (1m/5m), Low (1h/1d).',
      'Choose non-lossy statistical aggregations (min, max, mean, p50, p99, count).',
      'Automate cold storage tiering to S3/GCS object buckets.'
    ],
    ruInstructions: [
      'Спроектируйте уровни хранения: высокое разрешение, среднее и дневные агрегаты.',
      'Настройте статистические агрегации (мин, макс, среднее, квантили p50, p99).',
      'Автоматизируйте перенос устаревших данных в холодное объектное хранилище.'
    ]
  },
  {
    id: 'zero-downtime-cdc-debezium-pipeline',
    name: 'ZeroDowntimeCdcDebeziumPipelineSkill',
    displayName: 'Change Data Capture (CDC) via Debezium & Kafka Connect',
    categoryId: 'data_knowledge',
    description: 'Captures database transaction logs (PostgreSQL WAL, MySQL binlog) for zero-impact real-time synchronization.',
    tags: ['data', 'cdc', 'debezium', 'wal', 'real-time-sync'],
    sectionName: 'Change Data Capture (CDC) Architecture',
    ruSectionName: 'Архитектура Change Data Capture (Debezium / Kafka Connect)',
    semanticType: 'strategy_framework',
    instructions: [
      'Configure database replication slots and logical decoding plugins.',
      'Handle schema evolution events in the Debezium event envelope without breaking consumers.',
      'Design initial consistent snapshotting without table locks.'
    ],
    ruInstructions: [
      'Настройте слоты логической репликации в БД (PostgreSQL WAL / MySQL binlog).',
      'Опишите обработку эволюции схем в сообщениях Debezium без сбоя потребителей.',
      'Организуйте начальный снимок данных (snapshot) без блокировки таблиц.'
    ]
  },
  {
    id: 'data-observability-monte-carlo-metrics',
    name: 'DataObservabilityMonteCarloMetricsSkill',
    displayName: 'Data Observability & Anomaly Alerting (5 Pillars)',
    categoryId: 'data_knowledge',
    description: 'Monitors the 5 pillars of data observability: Freshness, Volume, Schema, Quality, and Lineage across warehouse pipelines.',
    tags: ['data', 'observability', 'data-quality', 'anomalies', 'monitoring'],
    sectionName: 'Data Observability 5 Pillars Framework',
    ruSectionName: 'Фреймворк 5 столпов наблюдаемости данных (Data Observability)',
    semanticType: 'process_directive',
    instructions: [
      'Instrument freshness and SLA threshold monitors for every critical table.',
      'Deploy volume anomaly detectors tracking unexpected zero-row or 10x row spikes.',
      'Automate schema drift alerts and downstream user notifications.'
    ],
    ruInstructions: [
      'Настройте мониторинг свежести данных и соблюдения SLA по ключевым таблицам.',
      'Внедрите детекторы аномалий объема (пустые таблицы или аномальные всплески строк).',
      'Автоматизируйте алерты об изменении схем данных для зависимых команд.'
    ]
  },
  {
    id: 'anonymization-pii-differential-privacy',
    name: 'AnonymizationPiiDifferentialPrivacySkill',
    displayName: 'PII Tokenization, Masking & Differential Privacy',
    categoryId: 'data_knowledge',
    description: 'Applies cryptographic tokenization, k-anonymity, l-diversity, and laplace noise injection to preserve dataset utility while complying with privacy laws.',
    tags: ['data', 'privacy', 'pii-masking', 'differential-privacy', 'compliance'],
    sectionName: 'Data Anonymization & Privacy Protocol',
    ruSectionName: 'Протокол анонимизации данных и дифференциальной приватности',
    semanticType: 'process_directive',
    instructions: [
      'Identify Direct Identifiers (SSN, Email, Name) and apply reversible vaulted tokenization.',
      'Evaluate Quasi-Identifiers against k-anonymity (k>=5) and l-diversity thresholds.',
      'Inject calibrated Laplace/Gaussian noise for differential privacy query engines.'
    ],
    ruInstructions: [
      'Найдите прямые идентификаторы (ПДн) и примените токенизацию через защищенное хранилище.',
      'Проверьте квази-идентификаторы на соответствие стандартам k-anonymity и l-diversity.',
      'Добавьте калиброванный шум Лапласа для аналитических запросов с дифференциальной приватностью.'
    ]
  },
  {
    id: 'embedded-analytics-multitenant-row-level-security',
    name: 'EmbeddedAnalyticsMultitenantRowLevelSecuritySkill',
    displayName: 'Multi-Tenant Embedded Analytics & Row-Level Security',
    categoryId: 'data_knowledge',
    description: 'Architects multi-tenant reporting pipelines enforcing strict tenant isolation through JWT claim filtering and database RLS.',
    tags: ['data', 'analytics', 'multi-tenant', 'rls', 'row-level-security'],
    sectionName: 'Multi-Tenant Analytics Isolation Protocol',
    ruSectionName: 'Многопользовательская изоляция аналитики (Row-Level Security)',
    semanticType: 'process_directive',
    instructions: [
      'Enforce Row-Level Security (RLS) policies driven by authenticated tenant context tokens.',
      'Implement tenant-aware query caching to prevent cross-tenant data leaks.',
      'Isolate heavy tenant query workloads using elastic warehouse compute pools.'
    ],
    ruInstructions: [
      'Настройте политики RLS на основе проверенных JWT-токенов тенанта.',
      'Организуйте кэширование запросов с жесткой изоляцией по tenant_id.',
      'Изолируйте ресурсоемкие запросы крупных клиентов в отдельные пулы вычислений.'
    ]
  },
  {
    id: 'geospatial-h3-postgis-indexing',
    name: 'GeospatialH3PostgisIndexingSkill',
    displayName: 'Geospatial Hexagonal Indexing (Uber H3 & PostGIS)',
    categoryId: 'data_knowledge',
    description: 'Indexes latitude/longitude coordinates into hierarchical hexagonal H3 cells for rapid radius queries, aggregation, and spatial joins.',
    tags: ['data', 'geospatial', 'postgis', 'h3', 'spatial-indexing'],
    sectionName: 'Geospatial H3 Indexing Protocol',
    ruSectionName: 'Протокол геопространственного индексирования (H3 / PostGIS)',
    semanticType: 'process_directive',
    instructions: [
      'Convert lat/lng points into discrete H3 indexes at appropriate resolution (e.g. Res 7-9 for urban areas).',
      'Optimize k-ring spatial neighbor searches and polygon intersection lookups.',
      'Build PostGIS GiST indexed queries for complex boundary containment.'
    ],
    ruInstructions: [
      'Конвертируйте координаты в гексагональные индексы H3 с нужным разрешением.',
      'Оптимизируйте поиск соседей (k-ring) и пересечения полигонов.',
      'Создайте GiST-индексы PostGIS для быстрых пространственных выборок.'
    ]
  },
  {
    id: 'document-store-polymorphic-schema-design',
    name: 'DocumentStorePolymorphicSchemaDesignSkill',
    displayName: 'MongoDB / Document Store Polymorphic Schema Design',
    categoryId: 'data_knowledge',
    description: 'Designs polymorphic document structures, bucket pattern time-series, and subset patterns to minimize IO and join overhead.',
    tags: ['data', 'mongodb', 'document-db', 'nosql', 'schema-design'],
    sectionName: 'Document Store Schema Optimization',
    ruSectionName: 'Проектирование полиморфных схем документоориентированных БД',
    semanticType: 'process_directive',
    instructions: [
      'Apply the Polymorphic Pattern using discriminator fields (`schema_version`, `entity_type`).',
      'Implement the Subset Pattern by embedding only frequently accessed summary attributes.',
      'Use the Bucket Pattern to compress high-frequency telemetry documents.'
    ],
    ruInstructions: [
      'Примените полиморфный паттерн с дискриминатором типа сущности и версии схемы.',
      'Внедрите паттерн подмножеств (Subset Pattern) для частых полей во избежание лишнего IO.',
      'Используйте пакетирование (Bucket Pattern) для временных рядов.'
    ]
  },
  {
    id: 'entity-resolution-deduplication-probabilistic',
    name: 'EntityResolutionDeduplicationProbabilisticSkill',
    displayName: 'Probabilistic Entity Resolution & Deduplication',
    categoryId: 'data_knowledge',
    description: 'Matches and merges messy customer records across disparate systems using Fellegi-Sunter record linkage and Jaro-Winkler distance.',
    tags: ['data', 'entity-resolution', 'deduplication', 'record-linkage', 'master-data'],
    sectionName: 'Probabilistic Entity Resolution Protocol',
    ruSectionName: 'Протокол вероятностной дедупликации и слияния сущностей',
    semanticType: 'process_directive',
    instructions: [
      'Implement blocking strategies to reduce the O(N^2) comparison space.',
      'Compute similarity scores across name, address, phone, and tax identifiers using phonetic and string metrics.',
      'Assign probabilistic match weights and configure auto-merge vs manual review thresholds.'
    ],
    ruInstructions: [
      'Настройте блокирующие ключи (blocking) для исключения перебора всех пар O(N^2).',
      'Рассчитайте схожесть полей (имена, телефоны, адреса) с помощью метрик расстояния.',
      'Задайте пороги автоматического слияния и ручной модерации спорных дубликатов.'
    ]
  },
  {
    id: 'reverse-etl-activation-crm-sync',
    name: 'ReverseEtlActivationCrmSyncSkill',
    displayName: 'Reverse-ETL & Operational Analytics Activation',
    categoryId: 'data_knowledge',
    description: 'Pumps calculated data warehouse scores (LTV, product health, churn propensity) into operational tools (Salesforce, HubSpot, Stripe).',
    tags: ['data', 'reverse-etl', 'operational-analytics', 'census', 'hightouch'],
    sectionName: 'Reverse-ETL Activation Architecture',
    ruSectionName: 'Архитектура Reverse-ETL и активации данных в CRM/ERP',
    semanticType: 'strategy_framework',
    instructions: [
      'Select canonical source warehouse views with deterministic surrogate IDs.',
      'Configure differential sync schedules (only updating mutated downstream records).',
      'Establish API rate-limit throttling and webhook retry buffers for target CRM endpoints.'
    ],
    ruInstructions: [
      'Определите канонические витрины с детерминированными внешними ID.',
      'Настройте дифференциальную синхронизацию (обновление только изменившихся строк).',
      'Внедрите контроль лимитов API сторонних CRM и буферизацию повторных попыток.'
    ]
  }
];

module.exports = { newDataKnowledgeSkills };
