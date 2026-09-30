const { appendSkills } = require('../appendSkills.cjs');

const DATA_FINAL_9 = [
  {
    id: "data-knowledge-lakefs-git-for-data-branching",
    name: "DataKnowledgeLakefsGitForDataBranchingSkill",
    displayName: "lakeFS: Git-Style Branching, Commits & Rollbacks for Object Storage Lakes",
    categoryId: "dataKnowledge",
    description: "Enables zero-copy Git workflows (branch, commit, merge, revert) over S3/GCS data lakes with ACID isolation guarantees.",
    tags: ["data-knowledge", "lakefs", "git-for-data", "data-versioning", "lakehouse"],
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
    semanticType: "framework"
  },
  {
    id: "data-knowledge-snowflake-search-optimization-service",
    name: "DataKnowledgeSnowflakeSearchOptimizationServiceSkill",
    displayName: "Snowflake Search Optimization Service (SOS) & Point-Lookup Indexing",
    categoryId: "dataKnowledge",
    description: "Accelerates high-cardinality point-lookup queries on massive multi-terabyte Snowflake tables using persistent search access paths.",
    tags: ["data-knowledge", "snowflake", "search-optimization", "point-lookups", "cloud-data-warehouse"],
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
    semanticType: "framework"
  },
  {
    id: "data-knowledge-data-contracts-json-schema-protobuf",
    name: "DataKnowledgeDataContractsJsonSchemaProtobufSkill",
    displayName: "Enterprise Data Contracts: Protobuf / JSON Schema Producers-Consumers SLA",
    categoryId: "dataKnowledge",
    description: "Establishes formal schema and freshness contracts between software engineering producers and data analytics consumers.",
    tags: ["data-knowledge", "data-contracts", "protobuf", "schema-registry", "sla"],
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
    semanticType: "framework"
  },
  {
    id: "data-knowledge-semantic-caching-gptcache-similarity",
    name: "DataKnowledgeSemanticCachingGptcacheSimilaritySkill",
    displayName: "Semantic Query Caching: Embedding Distance Vector Hit Ratio",
    categoryId: "dataKnowledge",
    description: "Caches and serves expensive LLM / SQL responses for semantically equivalent queries within a tight cosine distance threshold (e.g. >0.96).",
    tags: ["data-knowledge", "semantic-caching", "vector-cache", "cost-reduction", "llmops"],
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
    semanticType: "framework"
  },
  {
    id: "data-knowledge-delta-lake-liquid-clustering",
    name: "DataKnowledgeDeltaLakeLiquidClusteringSkill",
    displayName: "Delta Lake Liquid Clustering & Multi-Dimensional Data Skipping",
    categoryId: "dataKnowledge",
    description: "Replaces rigid hive-style table partitioning with Delta Lake Liquid Clustering for flexible multi-column incremental sorting.",
    tags: ["data-knowledge", "delta-lake", "liquid-clustering", "lakehouse", "data-skipping"],
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
    semanticType: "framework"
  },
  {
    id: "data-knowledge-entity-resolution-dedupe-py",
    name: "DataKnowledgeEntityResolutionDedupePySkill",
    displayName: "Machine Learning Entity Resolution & Record Deduplication (Dedupe)",
    categoryId: "dataKnowledge",
    description: "Trains active-learning classification models over messy text records to deduplicate entities with ambiguous variations.",
    tags: ["data-knowledge", "entity-resolution", "deduplication", "active-learning", "data-cleaning"],
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
    semanticType: "framework"
  },
  {
    id: "data-knowledge-columnar-encoding-rle-delta-bitpacking",
    name: "DataKnowledgeColumnarEncodingRleDeltaBitpackingSkill",
    displayName: "Low-Level Columnar Encodings: RLE, Delta Encoding & Bit-Packing",
    categoryId: "dataKnowledge",
    description: "Maximizes numerical data compression using Run-Length Encoding (RLE) on repeated values, Delta on timestamps, and Bit-Packing on integers.",
    tags: ["data-knowledge", "columnar-encoding", "rle", "delta-encoding", "bit-packing", "storage"],
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
    semanticType: "framework"
  },
  {
    id: "data-knowledge-rag-reranking-cross-encoder",
    name: "DataKnowledgeRagRerankingCrossEncoderSkill",
    displayName: "RAG Two-Stage Retrieval: Fast Bi-Encoder + Deep Cross-Encoder Reranker",
    categoryId: "dataKnowledge",
    description: "Re-scores top-50 candidate documents with a computationally deep Cross-Encoder model (Cohere Rerank / BGE-Reranker) before prompt injection.",
    tags: ["data-knowledge", "reranking", "cross-encoder", "rag", "information-retrieval"],
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
    semanticType: "framework"
  },
  {
    id: "data-knowledge-knowledge-distillation-compact-indexes",
    name: "DataKnowledgeKnowledgeDistillationCompactIndexesSkill",
    displayName: "Domain Taxonomy Pruning & Ontological Depth Normalization",
    categoryId: "dataKnowledge",
    description: "Prunes redundant hierarchy branches in sprawling corporate knowledge taxonomies, establishing balanced 4-level classification schemas.",
    tags: ["data-knowledge", "taxonomy", "ontology", "classification", "knowledge-management"],
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
    semanticType: "framework"
  }
];

appendSkills('dataKnowledge', DATA_FINAL_9);

console.log('Appended final Data & Knowledge skills. Target complete!');
