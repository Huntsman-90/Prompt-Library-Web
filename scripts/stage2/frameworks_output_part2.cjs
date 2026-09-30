const { appendSkills } = require('../appendSkills.cjs');

const FRAMEWORKS_35 = [
  {
    id: "framework-twelve-factor-app-modern",
    name: "FrameworkTwelveFactorAppModernSkill",
    displayName: "Modern 12-Factor Cloud-Native Architecture Blueprint",
    categoryId: "frameworks",
    description: "Implements the 12-Factor App methodology (Codebase, Config in env, Backing services, Stateless processes, Port binding).",
    tags: ["frameworks", "12-factor", "cloud-native", "devops", "microservices"],
    sectionName: "12-Factor Cloud-Native Architecture Blueprint",
    ruSectionName: "Архитектурный фреймворк 12-Factor App для облачных сервисов",
    instructions: [
      "Strictly separate config from code: store all environment variables in runtime injection environments.",
      "Execute app processes as stateless and share-nothing; persist state exclusively in stateful backing services.",
      "Maximize robustness with fast startup and graceful shutdown on SIGTERM signals."
    ],
    ruInstructions: [
      "Строго разделяйте конфигурацию и код: передавайте переменные через окружение.",
      "Проектируйте процессы как stateless (без сохранения состояния на диске).",
      "Обеспечьте быстрый запуск и корректное завершение работы по сигналу SIGTERM."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-hexagonal-ports-and-adapters",
    name: "FrameworkHexagonalPortsAndAdaptersSkill",
    displayName: "Alistair Cockburn Hexagonal (Ports & Adapters) Architecture",
    categoryId: "frameworks",
    description: "Isolates core business logic inside a hexagon, communicating with drivers and databases via Ports and Adapters.",
    tags: ["frameworks", "hexagonal", "ports-adapters", "architecture", "cockburn"],
    sectionName: "Hexagonal Ports & Adapters Architecture Blueprint",
    ruSectionName: "Гексагональная архитектура (Порты и Адаптеры по Алистеру Кокберну)",
    instructions: [
      "Place pure domain entities and business logic in the central Hexagon.",
      "Define Driver Ports (API, CLI, GUI) and Driven Ports (DB, Messaging, 3rd-party services) as abstract interfaces.",
      "Implement pluggable concrete Adapters outside the hexagon with zero domain leakage."
    ],
    ruInstructions: [
      "Поместите чистую бизнес-логику в центр гексагона.",
      "Определите входящие и исходящие порты в виде абстрактных интерфейсов.",
      "Реализуйте сменные адаптеры на внешнем периметре без влияния на доменное ядро."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-onion-architecture-jeffrey-palermo",
    name: "FrameworkOnionArchitectureJeffreyPalermoSkill",
    displayName: "Jeffrey Palermo Onion Architecture Framework",
    categoryId: "frameworks",
    description: "Structures applications into concentric layers around a domain core with inverted external infrastructure dependencies.",
    tags: ["frameworks", "onion-architecture", "domain-core", "palermo", "clean-code"],
    sectionName: "Jeffrey Palermo Onion Architecture Blueprint",
    ruSectionName: "Луковая архитектура Джеффри Палермо (Onion Architecture)",
    instructions: [
      "Core Layer: Domain Model Entities.",
      "Middle Layer: Domain Services & Repository Interfaces.",
      "Outer Layer: Infrastructure, UI, and Database Adapters.",
      "All code points inward; inner layers know nothing of outer layers."
    ],
    ruInstructions: [
      "Внутренний слой: Доменные сущности.",
      "Средний слой: Доменные сервисы и интерфейсы репозиториев.",
      "Внешний слой: Инфраструктура, UI и драйверы баз данных.",
      "Все зависимости направлены строго к центру."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-serverless-event-pipeline-aws",
    name: "FrameworkServerlessEventPipelineAwsSkill",
    displayName: "AWS Serverless Event-Driven Pipeline (Lambda, SQS, EventBridge)",
    categoryId: "frameworks",
    description: "Designs auto-scaling serverless workflows connecting EventBridge routers, SQS queues, and Lambda compute.",
    tags: ["frameworks", "serverless", "aws", "lambda", "eventbridge", "cloud"],
    sectionName: "AWS Serverless Event Pipeline Architecture",
    ruSectionName: "Серверлесс-архитектура на базе AWS EventBridge, SQS и Lambda",
    instructions: [
      "Publish events to central EventBridge bus with schema discovery.",
      "Buffer asynchronous consumer workloads through Amazon SQS queues with Dead Letter Queues.",
      "Execute granular Lambda functions with sub-second scaling and minimal IAM permission policies."
    ],
    ruInstructions: [
      "Публикуйте события в шину AWS EventBridge с валидацией схем.",
      "Буферизуйте нагрузку через очереди SQS с обработкой ошибок в DLQ.",
      "Используйте изолированные Lambda-функции с гранулярными правами IAM."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-outbox-pattern-debezium-cdc",
    name: "FrameworkOutboxPatternDebeziumCdcSkill",
    displayName: "Transactional Outbox Pattern & Debezium CDC Streaming",
    categoryId: "frameworks",
    description: "Solves dual-write problems by writing outbox records to relational tables and streaming them via Debezium CDC.",
    tags: ["frameworks", "outbox-pattern", "cdc", "debezium", "kafka", "distributed-systems"],
    sectionName: "Transactional Outbox & CDC Streaming Architecture",
    ruSectionName: "Паттерн Transactional Outbox и сбор изменений данных (Debezium CDC)",
    instructions: [
      "Write domain mutations and corresponding event payloads atomically into the same database transaction.",
      "Use Debezium Change Data Capture (CDC) to tail database transaction logs (WAL) in real-time.",
      "Stream outbox events to Apache Kafka with guaranteed at-least-once delivery."
    ],
    ruInstructions: [
      "Записывайте изменения бизнес-сущностей и события в таблицу Outbox в единой транзакции БД.",
      "Используйте Debezium для чтения журналов транзакций (WAL) в реальном времени.",
      "Отправляйте события в Apache Kafka с гарантией доставки At-Least-Once."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-rag-retrieval-augmented-generation-deep",
    name: "FrameworkRagRetrievalAugmentedGenerationDeepSkill",
    displayName: "Production RAG Architecture (Chunking, Hybrid Search, Reranking)",
    categoryId: "frameworks",
    description: "Designs production RAG pipelines with semantic chunking, BM25+Vector hybrid search, and cross-encoder reranking.",
    tags: ["frameworks", "rag", "vector-search", "reranking", "hybrid-search", "llm-architecture"],
    sectionName: "Production RAG Hybrid Search & Reranking Blueprint",
    ruSectionName: "Производственный фреймворк RAG: гибридный поиск, чанкинг и реранкинг",
    instructions: [
      "Apply semantic chunking with overlapping sliding windows to preserve sentence context.",
      "Execute Hybrid Search combining sparse lexical BM25 and dense vector cosine similarity (Reciprocal Rank Fusion).",
      "Pass top-50 candidates through a cross-encoder Reranker to select the top-5 most relevant context chunks."
    ],
    ruInstructions: [
      "Используйте семантическое разбиение на чанки с перекрытием для сохранения контекста.",
      "Применяйте гибридный поиск: плотные векторные эмбеддинги + разреженный поиск BM25 (RRF).",
      "Выполняйте реранкинг кандидатов через Cross-Encoder перед передачей в промпт."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-feature-store-feast-mlops",
    name: "FrameworkFeatureStoreFeastMlopsSkill",
    displayName: "MLOps Feature Store Architecture (Feast / Hopsworks)",
    categoryId: "frameworks",
    description: "Standardizes feature engineering with dual offline historical storage (Parquet/Snowflake) and online low-latency serving (Redis).",
    tags: ["frameworks", "feature-store", "mlops", "feast", "machine-learning"],
    sectionName: "MLOps Dual Feature Store Architectural Blueprint",
    ruSectionName: "Архитектура Feature Store для MLOps (Feast, онлайн/офлайн хранилища)",
    instructions: [
      "Define versioned feature definitions as code with standardized data transformations.",
      "Sync features to Offline Store (Parquet/Warehouse) for training and Online Store (Redis) for <10ms inference lookup.",
      "Eliminate train-serve data skew via automated point-in-time correctness joins."
    ],
    ruInstructions: [
      "Описывайте признаки (Features) как код с контролем версий.",
      "Синхронизируйте данные в офлайн-хранилище для обучения и Redis для онлайн-инференса (<10 мс).",
      "Исключите утечку данных из будущего через корректные временные срезы (Point-in-Time Joins)."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-zero-downtime-blue-green-deployment",
    name: "FrameworkZeroDowntimeBlueGreenDeploymentSkill",
    displayName: "Zero-Downtime Blue/Green Deployment Architecture",
    categoryId: "frameworks",
    description: "Maintains two identical production environments (Blue and Green), switching load balancer traffic instantaneously.",
    tags: ["frameworks", "blue-green", "zero-downtime", "deployment", "devops"],
    sectionName: "Blue/Green Zero-Downtime Deployment Protocol",
    ruSectionName: "Фреймворк развертывания Blue/Green с нулевым временем простоя",
    instructions: [
      "Maintain active production environment (Blue) while deploying and testing new releases on idle environment (Green).",
      "Execute smoke and health tests on Green before initiating traffic cutover.",
      "Switch router/load balancer traffic instantly; keep Blue on standby for 1-hour instant rollback if needed."
    ],
    ruInstructions: [
      "Поддерживайте две идентичные среды: рабочую (Blue) и развертываемую (Green).",
      "Проводите полное тестирование среды Green до переключения трафика.",
      "Мгновенно переключайте балансировщик нагрузки с сохранением Blue для быстрого отката."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-api-first-governance-stoplight",
    name: "FrameworkApiFirstGovernanceStoplightSkill",
    displayName: "API-First Design & Spectral Linting Governance Framework",
    categoryId: "frameworks",
    description: "Mandates OpenAPI specification design, review, and automated Spectral linting before writing backend code.",
    tags: ["frameworks", "api-first", "governance", "openapi", "spectral", "developer-experience"],
    sectionName: "API-First Governance & Spectral Linting Framework",
    ruSectionName: "Фреймворк управления разработкой API-First и автоматический линтинг (Spectral)",
    instructions: [
      "Design OpenAPI 3.1 YAML specifications collaboratively with frontend and consumer teams before backend coding.",
      "Enforce automated Spectral linter rules in CI: standard naming conventions, mandatory auth schemas, error formats.",
      "Generate typed client SDKs and mock servers automatically from validated contracts."
    ],
    ruInstructions: [
      "Проектируйте спецификацию OpenAPI до написания бэкенд-кода совместно с клиентами API.",
      "Запускайте автоматический линтинг Spectral в CI для проверки стандартов именования и безопасности.",
      "Генерируйте клиентские SDK и мок-серверы автоматически на основе контракта."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-micro-frontends-module-federation",
    name: "FrameworkMicroFrontendsModuleFederationSkill",
    displayName: "Webpack 5 Module Federation Micro-Frontend Architecture",
    categoryId: "frameworks",
    description: "Decomposes monolithic web apps into independent micro-apps sharing shared dependencies at runtime via Module Federation.",
    tags: ["frameworks", "micro-frontends", "module-federation", "webpack", "react", "frontend"],
    sectionName: "Module Federation Micro-Frontend Architecture",
    ruSectionName: "Архитектура микрофронтендов на базе Webpack Module Federation",
    instructions: [
      "Configure Host shell and independent Remote micro-applications with dynamic container remotes.",
      "Share core runtime singleton libraries (React, React-DOM, UI-Kit) without duplicate bundling.",
      "Implement resilient error boundaries and fallbacks for failed remote micro-frontend loads."
    ],
    ruInstructions: [
      "Настройте хост-приложение (Shell) и независимые удаленные микрофронтенды (Remotes).",
      "Настройте совместное использование синглтонов (React, UI Kit) без дублирования в бандле.",
      "Используйте Error Boundaries для изоляции сбоев отдельных микрофронтендов."
    ],
    semanticType: "protocol"
  }
];

const OUTPUT_35 = [
  {
    id: "output-proto3-protocol-buffers-spec",
    name: "OutputProto3ProtocolBuffersSpecSkill",
    displayName: "Google Protocol Buffers (Proto3) Service & Message Standard",
    categoryId: "output",
    description: "Outputs syntax-compliant Proto3 definitions with field tags, service RPC definitions, and option annotations.",
    tags: ["output", "protobuf", "proto3", "grpc", "serialization"],
    sectionName: "Google Protocol Buffers (Proto3) Specification",
    ruSectionName: "Стандарт спецификации Google Protocol Buffers (Proto3 / gRPC)",
    instructions: [
      "Output valid `syntax = \"proto3\";` files with package, imports, and options.",
      "Number all message fields sequentially (`string user_id = 1;`).",
      "Define standard gRPC `service` definitions with unary and streaming RPC methods."
    ],
    ruInstructions: [
      "Форматируйте файл с заголовком `syntax = \"proto3\";` и описанием пакета.",
      "Последовательно нумеруйте теги всех полей структуры данных.",
      "Описывайте gRPC-сервисы с унарными и потоковыми RPC-методами."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-dockerfile-multi-stage-hardened",
    name: "OutputDockerfileMultiStageHardenedSkill",
    displayName: "Hardened Multi-Stage Dockerfile Standard",
    categoryId: "output",
    description: "Outputs secure, optimized multi-stage Dockerfiles with non-root users, minimal scratch images, and cache mounts.",
    tags: ["output", "dockerfile", "containers", "multi-stage", "devops", "security"],
    sectionName: "Production Hardened Multi-Stage Dockerfile Standards",
    ruSectionName: "Стандарт многоэтапных защищенных Dockerfile (Multi-Stage Build)",
    instructions: [
      "Use Builder stage for dependency compilation (`FROM node:22-alpine AS builder`).",
      "Copy compiled artifacts into a minimal runtime distroless/alpine image.",
      "Create and switch to a non-root unprivileged system user (`USER appuser`)."
    ],
    ruInstructions: [
      "Используйте этап сборки (Builder) для компиляции и установки зависимостей.",
      "Копируйте только готовые артефакты в минимальный финальный образ (Distroless/Alpine).",
      "Запускайте приложение от имени выделенного непривилегированного пользователя."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-terraform-hcl-iac-module",
    name: "OutputTerraformHclIacModuleSkill",
    displayName: "Production Terraform (HCL) Infrastructure-as-Code Module",
    categoryId: "output",
    description: "Outputs clean, modular Terraform HCL code with variables, locals, outputs, and provider version pins.",
    tags: ["output", "terraform", "hcl", "iac", "cloud", "devops"],
    sectionName: "Production Terraform (HCL) Module Standard",
    ruSectionName: "Стандарт модулей инфраструктуры как кода Terraform (HCL)",
    instructions: [
      "Structure Terraform code into `main.tf`, `variables.tf`, and `outputs.tf`.",
      "Pin required provider versions (`required_providers { aws = { version = \"~> 5.0\" } }`).",
      "Add explicit types, descriptions, and validation rules to all input variables."
    ],
    ruInstructions: [
      "Структурируйте код на файлы `main.tf`, `variables.tf`, `outputs.tf`.",
      "Фиксируйте версии провайдеров в блоке `required_providers`.",
      "Задавайте типы, описания и правила валидации для всех входных переменных."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-typescript-zod-schema-validator",
    name: "OutputTypescriptZodSchemaValidatorSkill",
    displayName: "TypeScript & Zod Runtime Schema Validation Standard",
    categoryId: "output",
    description: "Outputs paired Zod schemas (`z.object({...})`) and inferred TypeScript types (`z.infer<typeof schema>`).",
    tags: ["output", "zod", "typescript", "validation", "type-safety"],
    sectionName: "TypeScript Zod Runtime Schema & Type Standards",
    ruSectionName: "Стандарт валидации Zod и генерации типов TypeScript",
    instructions: [
      "Define comprehensive Zod runtime schemas with detailed error messages and string constraints.",
      "Export inferred TypeScript static types using `export type User = z.infer<typeof UserSchema>`.",
      "Include custom refinements and transformations for dates, emails, and UUIDs."
    ],
    ruInstructions: [
      "Описывайте схемы валидации Zod с проверкой форматов и понятными сообщениями об ошибках.",
      "Экспортируйте статические типы через `z.infer<typeof Schema>`.",
      "Используйте кастомные трансформации для дат и нормализации данных."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-junit-xml-test-reporter",
    name: "OutputJunitXmlTestReporterSkill",
    displayName: "JUnit XML Test Results Schema Specification",
    categoryId: "output",
    description: "Outputs automated test execution reports formatted strictly as standard JUnit XML for CI/CD test dashboards.",
    tags: ["output", "junit", "xml", "testing", "ci-cd", "reports"],
    sectionName: "JUnit XML Test Results Schema Standard",
    ruSectionName: "Формат отчетов о тестировании JUnit XML для CI/CD",
    instructions: [
      "Output valid XML structure: `<testsuites><testsuite name=\"...\" tests=\"10\" failures=\"0\" time=\"1.2\">`.",
      "Enclose individual tests in `<testcase name=\"...\" classname=\"...\" time=\"...\">`.",
      "Include `<failure message=\"...\">` with stack traces for failed test scenarios."
    ],
    ruInstructions: [
      "Форматируйте отчет в виде валидного XML-дерева `<testsuites>` и `<testsuite>`.",
      "Описывайте каждый тест тегом `<testcase>` с длительностью выполнения.",
      "Включайте подробный стек ошибки в блок `<failure>` при падении теста."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-asciidoc-technical-documentation",
    name: "OutputAsciidocTechnicalDocumentationSkill",
    displayName: "AsciiDoc (ADOC) Enterprise Technical Manual Standard",
    categoryId: "output",
    description: "Outputs enterprise technical documentation formatted in AsciiDoc with callouts, admonitions, and tables.",
    tags: ["output", "asciidoc", "adoc", "documentation", "technical-writing"],
    sectionName: "AsciiDoc (ADOC) Enterprise Technical Manual Standard",
    ruSectionName: "Стандарт технической документации в формате AsciiDoc (ADOC)",
    instructions: [
      "Use standard AsciiDoc section markers (`= Title`, `== Section`, `=== Subsection`).",
      "Embed standardized Admonition blocks (`NOTE:`, `WARNING:`, `IMPORTANT:`).",
      "Format code callouts (`<1>`, `<2>`) matching numbered annotations below the snippet."
    ],
    ruInstructions: [
      "Используйте разметку AsciiDoc для заголовков (`=`, `==`, `===`).",
      "Вставляйте блоки предупреждений (`NOTE:`, `WARNING:`, `IMPORTANT:`).",
      "Используйте нумерованные сноски-коллауты (`<1>`, `<2>`) для пояснения строк кода."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-plantuml-architecture-diagram",
    name: "OutputPlantumlArchitectureDiagramSkill",
    displayName: "PlantUML C4 Architecture Diagram Standard",
    categoryId: "output",
    description: "Outputs clean PlantUML code enclosed in `@startuml` ... `@enduml` adhering to the C4 Model.",
    tags: ["output", "plantuml", "c4-model", "diagrams", "architecture"],
    sectionName: "PlantUML C4 Architecture Diagram Standard",
    ruSectionName: "Спецификация архитектурных диаграмм PlantUML (C4 Model)",
    instructions: [
      "Enclose diagram code inside `@startuml` and `@enduml` tags.",
      "Use C4 model macros (`Person`, `System`, `Container`, `Component`, `Rel`).",
      "Provide clean layouts and relationship labels with protocols (`Rel(web, api, \"Uses\", \"HTTPS/JSON\")`)."
    ],
    ruInstructions: [
      "Оборачивайте диаграмму в блок `@startuml` ... `@enduml`.",
      "Используйте макросы стандарта C4 (Person, Container, Component, Rel).",
      "Указывайте протоколы и характер взаимодействия на связях между узлами."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-sarif-static-analysis-json",
    name: "OutputSarifStaticAnalysisJsonSkill",
    displayName: "OASIS SARIF 2.1.0 Static Analysis Results Format",
    categoryId: "output",
    description: "Outputs vulnerability and lint findings in standard Static Analysis Results Interchange Format (SARIF 2.1.0).",
    tags: ["output", "sarif", "security", "static-analysis", "github-code-scanning"],
    sectionName: "OASIS SARIF 2.1.0 Static Analysis Standard",
    ruSectionName: "Стандарт отчетов статического анализа SARIF 2.1.0 (GitHub Code Scanning)",
    instructions: [
      "Output valid SARIF 2.1.0 JSON: `{ \"$schema\": \"...\", \"version\": \"2.1.0\", \"runs\": [...] }`.",
      "Populate `tool.driver.rules` with rule IDs, descriptions, and CWE taxonomy classifications.",
      "Map findings to exact file paths and line/column coordinate ranges."
    ],
    ruInstructions: [
      "Форматируйте вывод строго по стандарту OASIS SARIF 2.1.0 JSON.",
      "Описывайте правила анализа с указанием идентификаторов уязвимостей (CWE).",
      "Указывайте точные координаты файлов, строк и колонок для каждой находки."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-helm-values-yaml-chart",
    name: "OutputHelmValuesYamlChartSkill",
    displayName: "Kubernetes Helm Chart values.yaml Production Standard",
    categoryId: "output",
    description: "Outputs structured, self-documenting Helm values.yaml configurations with comments, defaults, and override slots.",
    tags: ["output", "helm", "kubernetes", "values-yaml", "devops", "charts"],
    sectionName: "Kubernetes Helm values.yaml Configuration Standard",
    ruSectionName: "Стандарт конфигураций Kubernetes Helm values.yaml",
    instructions: [
      "Organize values hierarchically: `image`, `service`, `ingress`, `resources`, `autoscaling`, `nodeSelector`.",
      "Add descriptive inline comments explaining each configuration toggle and its default.",
      "Include production-ready replicas, resource limits, and TLS ingress annotations."
    ],
    ruInstructions: [
      "Группируйте параметры по блокам: `image`, `service`, `ingress`, `resources`.",
      "Добавляйте подробные комментарии к каждой опции с пояснением значений.",
      "Включайте готовые настройки автомасштабирования (HPA) и TLS сертификатов."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-curl-bash-api-recipes",
    name: "OutputCurlBashApiRecipesSkill",
    displayName: "Production cURL & Bash API Command Recipe Standard",
    categoryId: "output",
    description: "Outputs copy-pasteable, robust multi-line cURL commands with HTTP headers, JSON payloads, and silent error handling.",
    tags: ["output", "curl", "bash", "api-testing", "cli", "rest"],
    sectionName: "Production cURL & Bash API Recipe Standards",
    ruSectionName: "Стандарт готовых исполняемых команд cURL и Bash для тестирования API",
    instructions: [
      "Format cURL commands with escaped backslashes for clean multi-line readability.",
      "Include explicit `-H \"Content-Type: application/json\"` and `-H \"Authorization: Bearer $TOKEN\"` headers.",
      "Use `--fail-with-body` and `--silent` flags for reliable scripting and debugging."
    ],
    ruInstructions: [
      "Оформляйте многострочные команды cURL с переносами строк через обратный слеш `\\`.",
      "Указывайте все необходимые заголовки авторизации и типа контента.",
      "Используйте флаги `--fail-with-body` и `-sS` для надежной работы в скриптах."
    ],
    semanticType: "format_directive"
  }
];

console.log('Appending Frameworks & Output Part 2...');
appendSkills('frameworks', FRAMEWORKS_35);
appendSkills('output', OUTPUT_35);
console.log('Frameworks & Output Part 2 appended.');
