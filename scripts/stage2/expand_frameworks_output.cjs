const { appendSkills } = require('../appendSkills.cjs');

const FRAMEWORKS_EXP = [
  {
    id: "framework-cqrs-event-sourcing",
    name: "FrameworkCqrsEventSourcingSkill",
    displayName: "CQRS & Event Sourcing Architecture Blueprint",
    categoryId: "frameworks",
    description: "End-to-end framework decoupling Command state mutations from Query read projections with immutable event streams.",
    tags: ["frameworks", "cqrs", "event-sourcing", "architecture", "distributed-systems"],
    sectionName: "CQRS & Event Sourcing Architectural Blueprint",
    ruSectionName: "Архитектурный фреймворк CQRS и Event Sourcing (Команды, События, Проекции)",
    instructions: [
      "Separate Command Model (handling write invariants) from Query Model (optimized read projections).",
      "Store domain state as an immutable append-only sequence of domain events.",
      "Replay events deterministically to rebuild read-side materializations and audit logs."
    ],
    ruInstructions: [
      "Разделите модель команд (запись и валидация) и модель запросов (денормализованные витрины чтения).",
      "Храните состояние как неизменяемую последовательность бизнес-событий (Append-Only Event Store).",
      "Используйте воспроизведение событий для построения материализованных представлений."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-strangler-fig-migration",
    name: "FrameworkStranglerFigMigrationSkill",
    displayName: "Martin Fowler Strangler Fig Legacy Migration Framework",
    categoryId: "frameworks",
    description: "Sequentially replaces legacy systems by routing micro-capabilities to modern microservices via facade routing.",
    tags: ["frameworks", "strangler-fig", "legacy-migration", "refactoring", "microservices"],
    sectionName: "Martin Fowler Strangler Fig Migration Framework",
    ruSectionName: "Фреймворк миграции устаревших систем Strangler Fig (Мартин Фаулер)",
    instructions: [
      "Deploy an API Gateway/Routing Facade in front of the monolithic legacy application.",
      "Intercept discrete bounded contexts and route traffic to new independent microservices.",
      "Gradually strangle the legacy codebase until the old system can be safely decommissioned."
    ],
    ruInstructions: [
      "Разверните маршрутизирующий фасад (API Gateway) перед монолитной устаревшей системой.",
      "Постепенно перенаправляйте трафик отдельных сценариев на новые современные микросервисы.",
      "Шаг за шагом выводите из эксплуатации старые компоненты без остановки бизнес-процессов."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-honeycomb-distributed-observability",
    name: "FrameworkHoneycombDistributedObservabilitySkill",
    displayName: "High-Cardinality Structured Observability Framework",
    categoryId: "frameworks",
    description: "Implements high-cardinality, wide structured event telemetry (Honeycomb/Charity Majors model) for distributed systems.",
    tags: ["frameworks", "observability", "honeycomb", "telemetry", "distributed-systems"],
    sectionName: "High-Cardinality Wide Event Telemetry Blueprint",
    ruSectionName: "Фреймворк глубокой наблюдаемости и высококардинальных событий (Honeycomb)",
    instructions: [
      "Emit wide structured JSON events containing 50-100 contextual fields per request (User ID, Tenant, Version, Latency).",
      "Enable instant arbitrary-dimensional slicing and correlation analysis across billions of events.",
      "Replace coarse sampling with intelligent tail-sampling on error and latency spikes."
    ],
    ruInstructions: [
      "Формируйте широкие структурированные JSON-события с десятками контекстных полей (ID пользователя, тенант, версия).",
      "Обеспечьте возможность мгновенной аналитики и поиска аномалий по любым сочетаниям параметров.",
      "Используйте выборочное сэмплирование с сохранением 100% подозрительных и медленных запросов."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-gitops-declarative-argocd",
    name: "FrameworkGitopsDeclarativeArgocdSkill",
    displayName: "GitOps Declarative Continuous Delivery Framework (ArgoCD/Flux)",
    categoryId: "frameworks",
    description: "Implements Git as single source of truth with automated reconciliation loops detecting and repairing cluster drift.",
    tags: ["frameworks", "gitops", "argocd", "kubernetes", "ci-cd", "devops"],
    sectionName: "GitOps Declarative Delivery & Reconciliation Framework",
    ruSectionName: "Декларативный GitOps-фреймворк непрерывной доставки (ArgoCD / Kubernetes)",
    instructions: [
      "Store 100% of infrastructure, environment configs, and Kubernetes manifests in declarative Git repositories.",
      "Run continuous reconciliation controllers that automatically sync cluster state with Git HEAD.",
      "Enforce immutable audit trails where every production change corresponds to an approved Git commit."
    ],
    ruInstructions: [
      "Храните все манифесты инфраструктуры и конфигурации в Git-репозиториях.",
      "Используйте контроллеры сверки (ArgoCD), автоматически устраняющие дрейф состояния кластера.",
      "Обеспечьте прозрачный аудит: любые изменения в продакшене происходят только через коммиты в Git."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-chaos-engineering-netflix-simian",
    name: "FrameworkChaosEngineeringNetflixSimianSkill",
    displayName: "Netflix Chaos Engineering & Resiliency Fault Injection",
    categoryId: "frameworks",
    description: "Injects controlled network latency, node crashes, and packet loss in production to verify systemic resilience.",
    tags: ["frameworks", "chaos-engineering", "netflix", "resilience", "fault-injection", "sre"],
    sectionName: "Chaos Engineering & Fault Injection Framework",
    ruSectionName: "Фреймворк хаос-инжиниринга и внедрения сбоев (Netflix Simian Army / SRE)",
    instructions: [
      "Define steady-state normal baseline metrics (e.g. successful transactions per second).",
      "Hypothesize that steady state will continue during controlled faults (e.g. killing 20% of database replicas).",
      "Inject automated chaos perturbations and automatically abort if steady-state metrics drop >5%."
    ],
    ruInstructions: [
      "Зафиксируйте базовые метрики нормального состояния системы (Steady State).",
      "Сформулируйте гипотезу устойчивости при искусственном отключении узлов или деградации сети.",
      "Внедрите контролируемые сбои с автоматической отменой эксперимента при падении ключевых метрик."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-domain-storytelling-collaborative",
    name: "FrameworkDomainStorytellingCollaborativeSkill",
    displayName: "Domain Storytelling Visual Knowledge Extraction Framework",
    categoryId: "frameworks",
    description: "Transforms business workflows into visual pictographic stories showing Actors, Work Objects, and Activities.",
    tags: ["frameworks", "domain-storytelling", "ddd", "requirements", "modeling"],
    sectionName: "Domain Storytelling Visual Workflow Blueprint",
    ruSectionName: "Фреймворк Domain Storytelling: визуальное моделирование бизнес-процессов",
    instructions: [
      "Model domain processes with 3 core visual primitives: Actors (Who), Work Objects (What), and Activities (How).",
      "Number chronological interaction steps sequentially from left to right.",
      "Highlight bounded context handoffs and digital-to-manual interface boundaries."
    ],
    ruInstructions: [
      "Моделируйте процессы через 3 базовых элемента: Акторы (Кто), Объекты (Что), Действия (Как).",
      "Последовательно пронумеруйте хронологические шаги взаимодействия слева направо.",
      "Четко обозначьте границы систем и точки перехода между ручными и автоматическими операциями."
    ],
    semanticType: "process_directive"
  },
  {
    id: "framework-zero-trust-architecture-nist-800-207",
    name: "FrameworkZeroTrustArchitectureNist800207Skill",
    displayName: "NIST SP 800-207 Zero-Trust Architecture Framework",
    categoryId: "frameworks",
    description: "Enforces continuous verification across Policy Engine, Policy Administrator, and Policy Enforcement Points.",
    tags: ["frameworks", "zero-trust", "nist", "security-architecture", "compliance"],
    sectionName: "NIST SP 800-207 Zero-Trust Architecture Blueprint",
    ruSectionName: "Архитектурный фреймворк Zero-Trust по стандарту NIST SP 800-207",
    instructions: [
      "Implement Policy Enforcement Points (PEP) gating every discrete resource access.",
      "Evaluate dynamic context signals (device health, geolocation, user behavior) at the Policy Engine (PE).",
      "Grant short-lived, least-privilege cryptographic access tokens per transaction."
    ],
    ruInstructions: [
      "Разверните точки применения политик (PEP) перед каждым изолированным ресурсом.",
      "Оценивайте динамические сигналы контекста (состояние устройства, IP, поведение) в Policy Engine.",
      "Выдавайте временные токены с минимально необходимыми правами на каждую транзакцию."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-data-mesh-domain-ownership",
    name: "FrameworkDataMeshDomainOwnershipSkill",
    displayName: "Zhamak Dehghani Data Mesh & Data-as-a-Product Framework",
    categoryId: "frameworks",
    description: "Decentralizes data analytics into autonomous domain teams treating data as a product with self-serve infrastructure.",
    tags: ["frameworks", "data-mesh", "data-as-a-product", "analytics", "architecture"],
    sectionName: "Zhamak Dehghani Data Mesh Architectural Blueprint",
    ruSectionName: "Архитектурный фреймворк Data Mesh: Данные как продукт и федеративное управление",
    instructions: [
      "Organize data around 4 core principles: Domain Ownership, Data as a Product, Self-Serve Platform, Federated Governance.",
      "Package data products with strict schema contracts, lineage metadata, and programmatic SLA guarantees.",
      "Enable federated cross-domain data discovery via decentralized semantic registries."
    ],
    ruInstructions: [
      "Внедрите 4 принципа: Доменное владение, Данные как продукт, Платформа самообслуживания, Федеративное управление.",
      "Упаковывайте наборы данных в продукты с четкими контрактами схем, метаданными и гарантиями качества.",
      "Обеспечьте удобный поиск и использование данных между командами через федеративный каталог."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-clean-architecture-uncle-bob",
    name: "FrameworkCleanArchitectureUncleBobSkill",
    displayName: "Robert C. Martin (Uncle Bob) Clean Architecture Blueprint",
    categoryId: "frameworks",
    description: "Structures applications into concentric circles: Entities -> Use Cases -> Interface Adapters -> Frameworks.",
    tags: ["frameworks", "clean-architecture", "uncle-bob", "solid", "software-engineering"],
    sectionName: "Uncle Bob Clean Architecture & Dependency Rule",
    ruSectionName: "Чистая архитектура Роберта Мартина (Clean Architecture / Dependency Rule)",
    instructions: [
      "Enforce the Dependency Rule: source code dependencies must point strictly inward toward higher-level policies.",
      "Isolate Enterprise Business Rules (Entities) and Application Business Rules (Use Cases) from UI and Database drivers.",
      "Use Interface Adapters and DTOs to cross architectural boundary rings safely."
    ],
    ruInstructions: [
      "Соблюдайте правило зависимостей: зависимости в коде направлены строго внутрь к ядру бизнес-правил.",
      "Изолируйте сущности и сценарии использования (Use Cases) от деталей веб-фреймворков и баз данных.",
      "Используйте адаптеры интерфейсов и DTO для безопасного пересечения границ архитектурных слоев."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-event-driven-architecture-eda",
    name: "FrameworkEventDrivenArchitectureEdaSkill",
    displayName: "Asynchronous Event-Driven Architecture (EDA & Choreography)",
    categoryId: "frameworks",
    description: "Coordinates microservices asynchronously via Publish/Subscribe message brokers (Kafka/RabbitMQ) with dead-letter queues.",
    tags: ["frameworks", "eda", "event-driven", "kafka", "rabbitmq", "async"],
    sectionName: "Asynchronous Event-Driven Architecture (EDA) Blueprint",
    ruSectionName: "Событийно-ориентированная архитектура (EDA, Pub/Sub, Kafka, DLQ)",
    instructions: [
      "Design loosely coupled event producers and consumers communicating via durable topic partitions.",
      "Implement the Transactional Outbox Pattern to guarantee atomic database write + message publish.",
      "Route unprocessable poison messages to Dead Letter Queues (DLQ) with automated alert triage."
    ],
    ruInstructions: [
      "Спроектируйте слабосвязанные сервисы, обменивающиеся событиями через отказоустойчивые топики сообщений.",
      "Внедрите паттерн Transactional Outbox для атомарной записи в БД и отправки события.",
      "Настройте очереди недоставленных сообщений (Dead Letter Queue) для изоляции сбойных пакетов."
    ],
    semanticType: "protocol"
  }
];

const OUTPUT_EXP = [
  {
    id: "output-json-schema-strict-draft-07",
    name: "OutputJsonSchemaStrictDraft07Skill",
    displayName: "Strict JSON Schema (Draft-07) Formatted Output",
    categoryId: "output",
    description: "Enforces 100% compliant JSON Schema Draft-07 syntax with typed definitions, required fields, and no additional properties.",
    tags: ["output", "json-schema", "draft-07", "type-safety", "api"],
    sectionName: "Strict JSON Schema (Draft-07) Specification",
    ruSectionName: "Форматирование вывода по схеме JSON Schema Draft-07",
    instructions: [
      "Output strictly valid JSON Schema Draft-07 format: `{ \"$schema\": \"http://json-schema.org/draft-07/schema#\", ... }`.",
      "Explicitly enumerate `required` array and set `additionalProperties: false`.",
      "Include semantic `description` and `type` for every declared property."
    ],
    ruInstructions: [
      "Форматируйте вывод строго по стандарту JSON Schema Draft-07.",
      "Указывайте список обязательных полей `required` и `additionalProperties: false`.",
      "Добавляйте понятные описания и типы для каждого свойства схемы."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-k8s-manifest-yaml-production",
    name: "OutputK8sManifestYamlProductionSkill",
    displayName: "Production Kubernetes YAML Manifest Standard",
    categoryId: "output",
    description: "Outputs complete, copy-pasteable Kubernetes manifests with resource requests/limits, probes, and securityContext.",
    tags: ["output", "kubernetes", "yaml", "devops", "manifests"],
    sectionName: "Production Kubernetes YAML Manifest Standards",
    ruSectionName: "Стандарт производственных манифестов Kubernetes (YAML)",
    instructions: [
      "Output valid Kubernetes YAML containing `apiVersion`, `kind`, `metadata`, and `spec`.",
      "Include explicit `resources.requests` and `resources.limits` (CPU and Memory).",
      "Embed `livenessProbe`, `readinessProbe`, and hardened `securityContext` (`readOnlyRootFilesystem: true`)."
    ],
    ruInstructions: [
      "Генерируйте полностью готовые YAML-манифесты Kubernetes со всеми стандартными полями.",
      "Обязательно задавайте лимиты и запросы ресурсов по CPU и оперативной памяти.",
      "Включайте проверки жизнеспособности (Probes) и строгие настройки безопасности (securityContext)."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-markdown-executive-memo",
    name: "OutputMarkdownExecutiveMemoSkill",
    displayName: "Standard Executive Memorandum Format (To/From/Date/Subject)",
    categoryId: "output",
    description: "Structures high-stakes executive memos with header metadata, BLUF statement, financial impact, and sign-off.",
    tags: ["output", "executive-memo", "memo", "business-writing", "management"],
    sectionName: "Standard Executive Memorandum Format",
    ruSectionName: "Формат официального исполнительного меморандума (Executive Memo)",
    instructions: [
      "Header block: `MEMORANDUM | TO: [Executive] | FROM: [Author] | DATE: [ISO Date] | SUBJECT: [Topic]`.",
      "Section 1: Executive Summary & Recommendation (BLUF).",
      "Section 2: Strategic Context & Rationale.",
      "Section 3: Financial & Operational Impact Matrix.",
      "Section 4: Next Steps & Immediate Decision Required."
    ],
    ruInstructions: [
      "Шапка: `МЕМОРАНДУМ | КОМУ | ОТ КОГО | ДАТА | ТЕМА`.",
      "Раздел 1: Краткое резюме и ключевая рекомендация (BLUF).",
      "Раздел 2: Стратегический контекст и обоснование.",
      "Раздел 3: Таблица финансово-операционного эффекта.",
      "Раздел 4: Требуемое решение руководства и следующие шаги."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-csv-rfc-4180-strict",
    name: "OutputCsvRfc4180StrictSkill",
    displayName: "Strict RFC 4180 CSV Export with Quoting and Escaping",
    categoryId: "output",
    description: "Outputs tabular data formatted strictly to RFC 4180 CSV standard with escaped quotes and standard CRLF endings.",
    tags: ["output", "csv", "rfc4180", "tabular", "data-export"],
    sectionName: "Strict RFC 4180 CSV Formatting Invariants",
    ruSectionName: "Экспорт данных в строгом соответствии со стандартом RFC 4180 CSV",
    instructions: [
      "Format output as clean comma-separated values adhering strictly to RFC 4180.",
      "Wrap fields containing commas, line breaks, or double quotes inside double quotes (`\"...\")`.",
      "Escape internal double quotes with double-quotes (`\"\"`)."
    ],
    ruInstructions: [
      "Форматируйте данные строго по стандарту RFC 4180 CSV.",
      "Оборачивайте в кавычки поля, содержащие запятые, переносы строк или кавычки.",
      "Экранируйте внутренние кавычки их удвоением (`\"\"`)."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-mermaid-sequence-flowchart",
    name: "OutputMermaidSequenceFlowchartSkill",
    displayName: "Mermaid.js Sequence Diagram & Architecture Flowchart",
    categoryId: "output",
    description: "Generates syntactically pristine Mermaid.js diagram codeblocks for sequence diagrams, ER diagrams, and state charts.",
    tags: ["output", "mermaid", "diagrams", "sequence-diagram", "visualization"],
    sectionName: "Mermaid.js Diagram Specification Standards",
    ruSectionName: "Генерация синтаксически выверенных диаграмм Mermaid.js",
    instructions: [
      "Enclose diagram code inside ````mermaid ... ```` markdown codeblocks.",
      "Use descriptive participant aliases and clear arrow semantics (`->>`, `-->>`, `-.->`).",
      "Verify syntax against standard Mermaid parser rules to prevent frontend rendering crashes."
    ],
    ruInstructions: [
      "Оборачивайте диаграммы в блоки кода с тегом ````mermaid````.",
      "Используйте понятные имена участников и правильный синтаксис стрелок взаимодействия.",
      "Проверяйте валидность синтаксиса для исключения ошибок рендеринга на клиенте."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-graphql-schema-sdl-production",
    name: "OutputGraphqlSchemaSdlProductionSkill",
    displayName: "GraphQL Schema Definition Language (SDL) Specification",
    categoryId: "output",
    description: "Outputs production-grade GraphQL SDL schemas with explicit types, inputs, queries, mutations, and docstrings.",
    tags: ["output", "graphql", "sdl", "api", "schema-design"],
    sectionName: "GraphQL Schema Definition Language (SDL) Standard",
    ruSectionName: "Спецификация схемы GraphQL Schema Definition Language (SDL)",
    instructions: [
      "Define clean GraphQL SDL types with non-null modifiers (`!`) and descriptive markdown docstrings `\"\"\"...\"\"\"`.",
      "Segregate read `Query` types from state-mutating `Mutation` and real-time `Subscription` types.",
      "Implement Relay-compliant connection pagination types (`Connection`, `Edge`, `PageInfo`)."
    ],
    ruInstructions: [
      "Описывайте типы GraphQL SDL с модификаторами обязательности (`!`) и документацией `\"\"\"...\"\"\"`.",
      "Разделяйте типы запросов чтения (Query) и изменения состояния (Mutation).",
      "Используйте стандарт пагинации Relay (Connection, Edge, PageInfo)."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-sql-ddl-postgresql-production",
    name: "OutputSqlDdlPostgresqlProductionSkill",
    displayName: "Production PostgreSQL 16 DDL with Indexes and Constraints",
    categoryId: "output",
    description: "Outputs complete PostgreSQL DDL with UUID primary keys, foreign keys, CHECK constraints, and btree/gin indexes.",
    tags: ["output", "sql", "postgresql", "ddl", "database-design"],
    sectionName: "Production PostgreSQL DDL Specification",
    ruSectionName: "Промышленный стандарт SQL DDL для PostgreSQL 16",
    instructions: [
      "Use `UUID PRIMARY KEY DEFAULT gen_random_uuid()` and `TIMESTAMPTZ` for all temporal fields.",
      "Define explicit foreign key `ON DELETE CASCADE / SET NULL` constraints.",
      "Create optimized indexes (`CREATE INDEX idx_... ON ... (column);`) for high-cardinality search predicates."
    ],
    ruInstructions: [
      "Используйте UUID в качестве первичных ключей и TIMESTAMPTZ для временных меток.",
      "Задавайте явные внешние ключи с правилами каскадного удаления.",
      "Создавайте оптимальные B-Tree и GIN индексы для фильтруемых полей."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-ndjson-json-lines-streaming",
    name: "OutputNdjsonJsonLinesStreamingSkill",
    displayName: "Newline Delimited JSON (NDJSON / JSONLines) Stream",
    categoryId: "output",
    description: "Outputs high-throughput streaming data formatted as single-line JSON objects separated strictly by newlines.",
    tags: ["output", "ndjson", "jsonl", "streaming", "big-data"],
    sectionName: "Newline Delimited JSON (NDJSON) Stream Standard",
    ruSectionName: "Потоковый формат Newline Delimited JSON (NDJSON / JSONLines)",
    instructions: [
      "Emit each discrete record as a single-line, self-contained JSON object terminated by `\\n`.",
      "Never wrap records inside an outer JSON array or add trailing commas.",
      "Enable instant streaming chunk processing without buffering entire multi-megabyte payloads."
    ],
    ruInstructions: [
      "Выводите каждую запись в виде отдельного валидного JSON-объекта в одну строку с переносом `\\n`.",
      "Не оборачивайте записи во внешний массив и не ставьте запятые в конце строк.",
      "Обеспечьте возможность потокового построчного чтения без загрузки всего файла в память."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-github-actions-ci-yaml",
    name: "OutputGithubActionsCiYamlSkill",
    displayName: "Production GitHub Actions Workflow (.github/workflows)",
    categoryId: "output",
    description: "Outputs battle-hardened GitHub Actions CI/CD YAML workflows with caching, matrix builds, and security scans.",
    tags: ["output", "github-actions", "ci-cd", "yaml", "devops", "automation"],
    sectionName: "Production GitHub Actions CI/CD Workflow Standards",
    ruSectionName: "Производственный стандарт пайплайнов GitHub Actions CI/CD",
    instructions: [
      "Generate complete YAML with triggers (`on: [push, pull_request]`), job matrices, and pinned action versions (`actions/checkout@v4`).",
      "Include dependency caching steps (`actions/cache`) to accelerate build execution times.",
      "Integrate automated linting, unit testing, and vulnerability scanning (Trivy/CodeQL)."
    ],
    ruInstructions: [
      "Создавайте полные YAML-пайплайны с триггерами, матрицами сборки и версионированными экшенами.",
      "Включайте кэширование зависимостей (npm, pip) для ускорения сборки.",
      "Интегрируйте шаги статического анализа, тестирования и сканирования уязвимостей."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-semantic-release-changelog-keepachangelog",
    name: "OutputSemanticReleaseChangelogKeepachangelogSkill",
    displayName: "Keep a Changelog & Semantic Release Markdown Standard",
    categoryId: "output",
    description: "Outputs changelog entries categorized by Added, Changed, Deprecated, Removed, Fixed, Security adhering to Keep a Changelog.",
    tags: ["output", "changelog", "keepachangelog", "release-notes", "documentation"],
    sectionName: "Keep a Changelog & Semantic Release Standard",
    ruSectionName: "Стандарт ведения истории изменений (Keep a Changelog v1.1.0)",
    instructions: [
      "Categorize release notes under standard H3 headers: `### Added`, `### Changed`, `### Fixed`, `### Security`, `### Deprecated`.",
      "Include version numbers, release dates in ISO format (`[1.4.0] - 2026-09-30`), and comparison diff links.",
      "Write concise, user-focused descriptions in active voice."
    ],
    ruInstructions: [
      "Группируйте изменения по стандартным разделам: Добавлено, Изменено, Исправлено, Безопасность.",
      "Указывайте версию и дату релиза в формате ISO-8601 со ссылками на коммиты.",
      "Пишите краткие и понятные описания с точки зрения пользователя."
    ],
    semanticType: "format_directive"
  }
];

console.log('Appending Frameworks & Output expansion...');
appendSkills('frameworks', FRAMEWORKS_EXP);
appendSkills('output', OUTPUT_EXP);
console.log('Frameworks & Output expansion completed.');
