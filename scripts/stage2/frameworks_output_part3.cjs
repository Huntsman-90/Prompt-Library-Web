const { appendSkills } = require('../appendSkills.cjs');

const FRAMEWORKS_PART3 = [
  {
    id: "framework-branch-by-abstraction-trunk",
    name: "FrameworkBranchByAbstractionTrunkSkill",
    displayName: "Paul Hammant Branch by Abstraction Framework",
    categoryId: "frameworks",
    description: "Replaces large long-lived feature branches by introducing an abstraction layer in trunk, swapping implementations incrementally.",
    tags: ["frameworks", "branch-by-abstraction", "trunk-based-development", "continuous-delivery"],
    sectionName: "Branch by Abstraction & Trunk-Based Delivery Protocol",
    ruSectionName: "Фреймворк Branch by Abstraction и Trunk-Based Development",
    instructions: [
      "Introduce an abstraction layer over the legacy subsystem directly in the main branch (Trunk).",
      "Develop the replacement subsystem behind the abstraction alongside the existing implementation.",
      "Flip the abstraction to call the new implementation, then delete the legacy implementation and abstraction."
    ],
    ruInstructions: [
      "Создайте слой абстракции над заменяемым модулем прямо в основной ветке (Trunk).",
      "Реализуйте новый модуль параллельно со старым за этим слоем абстракции.",
      "Переключите вызовы на новую реализацию, затем удалите старый код и временный слой абстракции."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-canary-analysis-kayenta",
    name: "FrameworkCanaryAnalysisKayentaSkill",
    displayName: "Automated Canary Analysis & Statistical Judge (Kayenta / Spinnaker)",
    categoryId: "frameworks",
    description: "Compares baseline vs canary metric distributions (Mann-Whitney U-test) to automate release promotion/rollback.",
    tags: ["frameworks", "canary-analysis", "kayenta", "sre", "deployment", "statistics"],
    sectionName: "Automated Canary Analysis (ACA) Protocol",
    ruSectionName: "Автоматический анализ канареечных релизов (Kayenta / Mann-Whitney U-test)",
    instructions: [
      "Deploy Baseline (current release) and Canary (new release) simultaneously under identical live traffic load.",
      "Perform automated statistical hypothesis testing (Mann-Whitney U-test) across latency, error rate, and memory usage.",
      "Calculate an overall Canary Score (0-100); automatically promote if Score >= 90 or roll back if Score < 75."
    ],
    ruInstructions: [
      "Разверните базовую (Baseline) и канареечную (Canary) версии под одинаковой рабочей нагрузкой.",
      "Проведите статистический тест Манна-Уитни по задержкам, ошибкам и потреблению памяти.",
      "Рассчитайте итоговый балл (Canary Score) и выполните автоматический промоушн или откат."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-data-vault-enterprise-modeling",
    name: "FrameworkDataVaultEnterpriseModelingSkill",
    displayName: "Dan Linstedt Data Vault 2.0 Enterprise Modeling Framework",
    categoryId: "frameworks",
    description: "Structures enterprise data warehouses into immutable Hubs (keys), Links (relationships), and Satellites (attributes).",
    tags: ["frameworks", "data-vault", "data-warehouse", "etl", "data-modeling"],
    sectionName: "Data Vault 2.0 Architecture & Entity Mapping",
    ruSectionName: "Архитектура корпоративного хранилища Data Vault 2.0 (Hubs, Links, Satellites)",
    instructions: [
      "Model core business keys as immutable Hub tables with cryptographic Hash Keys.",
      "Model many-to-many associations as Link tables.",
      "Capture temporal descriptive attributes and audit metadata in append-only Satellite tables."
    ],
    ruInstructions: [
      "Выделите бизнес-ключи в таблицы Hubs с суррогатными хэш-ключами.",
      "Опишите связи между сущностями в таблицах Links.",
      "Храните исторические атрибуты с контролем версий в таблицах Satellites."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-saga-orchestration-temporal-io",
    name: "FrameworkSagaOrchestrationTemporalIoSkill",
    displayName: "Temporal.io Durable Execution & Workflow Orchestration Framework",
    categoryId: "frameworks",
    description: "Implements resilient, fault-tolerant distributed workflows that survive server crashes and network partitions seamlessly.",
    tags: ["frameworks", "temporal", "durable-execution", "workflows", "distributed-systems"],
    sectionName: "Temporal.io Durable Execution Workflow Blueprint",
    ruSectionName: "Фреймворк отказоустойчивых рабочих процессов Temporal.io (Durable Workflows)",
    instructions: [
      "Structure workflows as deterministic, re-entrant functions.",
      "Delegate all non-deterministic side-effects (HTTP, DB queries, clock, random) to Temporal Activities.",
      "Configure automated Activity retries with exponential backoff and timeout envelopes."
    ],
    ruInstructions: [
      "Пишите функции рабочих процессов как детерминированные и идемпотентные.",
      "Выносите все недетерминированные вызовы (сеть, время, БД) в отдельные Activities.",
      "Настройте политики повторов и таймаутов для каждой активности."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-service-mesh-istio-envoy",
    name: "FrameworkServiceMeshIstioEnvoySkill",
    displayName: "Istio & Envoy Cloud-Native Service Mesh Architecture",
    categoryId: "frameworks",
    description: "Manages inter-service communication with mutual TLS (mTLS), traffic shifting, distributed tracing, and rate limiting.",
    tags: ["frameworks", "service-mesh", "istio", "envoy", "kubernetes", "mtls"],
    sectionName: "Istio Service Mesh & mTLS Invariants",
    ruSectionName: "Архитектура Service Mesh на базе Istio и Envoy (mTLS, трассировка, трафик)",
    instructions: [
      "Enforce strict mutual TLS (`STRICT` PeerAuthentication) across all pod-to-pod network transit.",
      "Define `VirtualService` and `DestinationRule` objects for weighted canary traffic routing.",
      "Inject Envoy sidecars to capture telemetry and propagate W3C distributed trace headers."
    ],
    ruInstructions: [
      "Включите обязательное взаимное шифрование mTLS между всеми сервисами кластера.",
      "Настройте объекты `VirtualService` для процентного разделения трафика между версиями.",
      "Используйте сайдкары Envoy для сбора метрик и сквозной передачи заголовков трассировки."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-event-driven-cqrs-axon",
    name: "FrameworkEventDrivenCqrsAxonSkill",
    displayName: "Axon Framework Domain-Driven CQRS Architecture",
    categoryId: "frameworks",
    description: "Implements Aggregate roots, Command Handlers, Event Sourcing Handlers, and Query Projections.",
    tags: ["frameworks", "axon", "cqrs", "event-sourcing", "ddd", "java"],
    sectionName: "Domain-Driven CQRS & Aggregate Root Blueprint",
    ruSectionName: "Доменно-ориентированный CQRS и агрегаты (Axon Pattern)",
    instructions: [
      "Define clean Aggregate Roots encapsulating business invariants and state mutation rules.",
      "Process commands in dedicated `@CommandHandler` methods, emitting domain events.",
      "Apply state mutations exclusively inside `@EventSourcingHandler` methods."
    ],
    ruInstructions: [
      "Создайте агрегаты (Aggregates), инкапсулирующие бизнес-инварианты и проверку правил.",
      "Обрабатывайте команды в обработчиках `@CommandHandler`, генерируя события.",
      "Мутируйте внутреннее состояние агрегата исключительно в обработчиках событий."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-progressive-web-app-offline-first",
    name: "FrameworkProgressiveWebAppOfflineFirstSkill",
    displayName: "Offline-First Progressive Web App (PWA) Framework",
    categoryId: "frameworks",
    description: "Builds offline-first web apps with Service Workers (Workbox), CacheStorage, IndexedDB sync, and Web App Manifest.",
    tags: ["frameworks", "pwa", "service-worker", "offline-first", "indexeddb", "workbox"],
    sectionName: "Offline-First PWA Architecture & Sync Blueprint",
    ruSectionName: "Архитектурный фреймворк Offline-First PWA (Service Workers, IndexedDB, Workbox)",
    instructions: [
      "Configure Service Worker runtime caching using Workbox: StaleWhileRevalidate for assets, NetworkFirst for APIs.",
      "Store local changes in client-side IndexedDB (Dexie) with background sync queueing.",
      "Deliver 100% full offline read and write capability with seamless background reconnection sync."
    ],
    ruInstructions: [
      "Настройте Service Worker (Workbox) со стратегиями кэширования StaleWhileRevalidate и NetworkFirst.",
      "Сохраняйте локальные изменения в IndexedDB с очередью фоновой синхронизации.",
      "Обеспечьте полноценную автономную работу приложения без доступа к интернету."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-graphql-federation-apollo-subgraphs",
    name: "FrameworkGraphqlFederationApolloSubgraphsSkill",
    displayName: "Apollo GraphQL Federation 2.0 Subgraph Architecture",
    categoryId: "frameworks",
    description: "Unifies distributed microservice schemas into a single federated supergraph with `@key` and `@shareable` directives.",
    tags: ["frameworks", "graphql-federation", "apollo", "subgraphs", "api-gateway"],
    sectionName: "Apollo GraphQL Federation 2.0 Supergraph Blueprint",
    ruSectionName: "Архитектура федеративных сабграфов Apollo GraphQL Federation 2.0",
    instructions: [
      "Define entity `@key(fields: \"id\")` directives to enable cross-subgraph entity extension.",
      "Compose multiple domain subgraphs into a unified Supergraph via Apollo Router / Rover CLI.",
      "Resolve entity fields across microservices in parallel query execution plans."
    ],
    ruInstructions: [
      "Задайте директивы `@key` для расширения сущностей между независимыми сервисами.",
      "Объедините схемы сабграфов в единый суперграф через Apollo Router.",
      "Обеспечьте параллельное разрешение полей сущностей из разных микросервисов."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-event-driven-microservices-choreography-vs-orchestration",
    name: "FrameworkEventDrivenMicroservicesChoreographyVsOrchestrationSkill",
    displayName: "Event Choreography vs Orchestration Architecture Pattern",
    categoryId: "frameworks",
    description: "Evaluates trade-offs between decentralized event choreography and centralized workflow orchestrators.",
    tags: ["frameworks", "choreography", "orchestration", "microservices", "event-driven"],
    sectionName: "Event Choreography vs Orchestration Trade-Off Matrix",
    ruSectionName: "Матрица выбора: хореография событий vs централизованная оркестрация",
    instructions: [
      "Use Event Choreography for simple, high-throughput notification streams with loose coupling.",
      "Use Workflow Orchestration (Temporal / Camunda) for complex, multi-step business transactions with compensation logic.",
      "Document the chosen trade-off rationale explicitly."
    ],
    ruInstructions: [
      "Применяйте хореографию для простых слабосвязанных потоков оповещения.",
      "Используйте оркестрацию для сложных многошаговых транзакций с компенсирующими откатами.",
      "Обоснуйте выбор архитектурного стиля под конкретные требования надежности."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-continuous-verification-sre-sli-slo",
    name: "FrameworkContinuousVerificationSreSliSloSkill",
    displayName: "SRE Error Budget & SLI / SLO Governance Framework",
    categoryId: "frameworks",
    description: "Defines Service Level Indicators (SLIs), Service Level Objectives (SLOs), and Error Budget burn-rate policies.",
    tags: ["frameworks", "sre", "slo", "sli", "error-budgets", "reliability"],
    sectionName: "SRE SLI/SLO & Error Budget Governance Framework",
    ruSectionName: "Фреймворк управления надежностью SRE: SLI, SLO и бюджеты ошибок (Error Budgets)",
    instructions: [
      "Define quantitative SLIs: `Good Requests / Total Valid Requests` over 30-day rolling window.",
      "Establish target SLOs (e.g. 99.95% availability, p95 latency < 200ms).",
      "Enforce Error Budget burn-rate policies: halt non-critical deployments when 20% of budget is burned in 1 hour."
    ],
    ruInstructions: [
      "Определите метрики SLI (процент успешных запросов) на скользящем 30-дневном окне.",
      "Зафиксируйте целевые значения SLO (доступность 99.95%, задержка p95 < 200 мс).",
      "Внедрите правила расхода бюджета ошибок: блокировка релизов при резком выгорании бюджета."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-threat-modeling-pasta-risk",
    name: "FrameworkThreatModelingPastaRiskSkill",
    displayName: "PASTA (Process for Attack Structure and Simulation) Framework",
    categoryId: "frameworks",
    description: "7-step risk-centric threat modeling framework aligning technical vulnerability analysis with business asset impact.",
    tags: ["frameworks", "pasta", "threat-modeling", "cybersecurity", "risk-management"],
    sectionName: "PASTA Risk-Centric Threat Modeling Framework",
    ruSectionName: "Фреймворк риск-ориентированного моделирования угроз PASTA (7 шагов)",
    instructions: [
      "Stage 1-2: Define business objectives, technical scope, and asset criticality.",
      "Stage 3-5: Decompose application architecture, identify threat vectors, and map vulnerability trees.",
      "Stage 6-7: Simulate attack exploitability and formulate business-aligned countermeasures."
    ],
    ruInstructions: [
      "Этапы 1–2: Определите бизнес-цели, границы системы и ценность активов.",
      "Этапы 3–5: Декомпозируйте архитектуру, выделите векторы атак и постройте деревья уязвимостей.",
      "Этапы 6–7: Смоделируйте реализацию атак и сформируйте экономически обоснованные контрмеры."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-observability-dora-metrics-engine",
    name: "FrameworkObservabilityDoraMetricsEngineSkill",
    displayName: "DORA Four Key Metrics Engineering Framework",
    categoryId: "frameworks",
    description: "Measures DevOps performance: Deployment Frequency, Lead Time for Changes, Change Failure Rate, Time to Restore.",
    tags: ["frameworks", "dora-metrics", "devops", "engineering-management", "continuous-delivery"],
    sectionName: "DORA 4 Key Metrics Engineering Framework",
    ruSectionName: "Фреймворк оценки инженерной эффективности DORA (4 ключевые метрики)",
    instructions: [
      "Track Deployment Frequency (daily vs weekly production deployments).",
      "Measure Lead Time for Changes (commit to production rollout).",
      "Monitor Change Failure Rate (% of releases requiring hotfixes/rollbacks) and Time to Restore Service (MTTR)."
    ],
    ruInstructions: [
      "Отслеживайте частоту развертываний в продакшен (Deployment Frequency).",
      "Измеряйте время доставки изменений от коммита до релиза (Lead Time for Changes).",
      "Контролируйте процент сбойных релизов (Change Failure Rate) и среднее время восстановления (MTTR)."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-secure-software-development-lifecycle-ssdlc",
    name: "FrameworkSecureSoftwareDevelopmentLifecycleSsdlcSkill",
    displayName: "NIST SSDF & OWASP OpenSAMM Secure SDLC Framework",
    categoryId: "frameworks",
    description: "Integrates automated security checkpoints across all phases of the software development lifecycle.",
    tags: ["frameworks", "ssdlc", "security", "devsecops", "opensamm", "nist"],
    sectionName: "Secure SDLC (SSDLC) Governance & Guardrail Framework",
    ruSectionName: "Фреймворк безопасного жизненного цикла разработки ПО (SSDLC / DevSecOps)",
    instructions: [
      "Phase 1 (Design): Automated STRIDE threat modeling and security architecture review.",
      "Phase 2 (Code): Pre-commit SAST scanning, secret detection, and dependency SCA audits.",
      "Phase 3 (Deploy): Container image vulnerability signing (Cosign), DAST scans, and IAM validation."
    ],
    ruInstructions: [
      "Фаза проектирования: Моделирование угроз STRIDE и ревью архитектуры безопасности.",
      "Фаза разработки: Автоматический статический анализ (SAST), поиск секретов и аудит зависимостей (SCA).",
      "Фаза релиза: Проверка уязвимостей контейнеров, динамическое сканирование (DAST) и подпись образов."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-continuous-integration-trunk-based-gates",
    name: "FrameworkContinuousIntegrationTrunkBasedGatesSkill",
    displayName: "Trunk-Based CI Quality Gate & Fast-Feedback Pipeline",
    categoryId: "frameworks",
    description: "Maintains rapid trunk-based integration with sub-10-minute CI build, lint, and test validation gates.",
    tags: ["frameworks", "ci", "trunk-based", "quality-gates", "continuous-integration"],
    sectionName: "Trunk-Based CI Quality Gate & Fast Feedback Framework",
    ruSectionName: "Фреймворк быстрого CI и строгих гейтов качества (Trunk-Based Development)",
    instructions: [
      "Enforce maximum 10-minute automated CI pipeline execution budget.",
      "Require green status across Lint, TypeScript Compile, Unit Tests, and E2E Smoke Tests before merging PRs.",
      "Reject long-lived feature branches; encourage small daily commits directly into Trunk behind feature flags."
    ],
    ruInstructions: [
      "Установите жесткий лимит времени выполнения пайплайна CI: не более 10 минут.",
      "Требуйте успешного прохождения линтинга, компиляции типов и тестов до слияния пулл-реквеста.",
      "Используйте короткоживущие ветки и регулярную интеграцию в Trunk под прикрытием фича-флагов."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-enterprise-integration-patterns-camel",
    name: "FrameworkEnterpriseIntegrationPatternsCamelSkill",
    displayName: "Gregor Hohpe Enterprise Integration Patterns (EIP / Apache Camel)",
    categoryId: "frameworks",
    description: "Solves enterprise integration using standard EIP primitives: Content-Based Router, Splitter, Aggregator, Message Filter.",
    tags: ["frameworks", "eip", "enterprise-integration", "camel", "messaging"],
    sectionName: "Enterprise Integration Patterns (EIP) Blueprint",
    ruSectionName: "Шаблоны интеграции корпоративных приложений (EIP Грегора Хопа / Apache Camel)",
    instructions: [
      "Implement Content-Based Routing to dispatch messages based on payload header inspection.",
      "Use Splitter and Aggregator patterns to decompose batch payloads, process in parallel, and recombine results.",
      "Deploy Idempotent Receivers to eliminate duplicate message processing side-effects."
    ],
    ruInstructions: [
      "Внедрите контентно-зависимую маршрутизацию (Content-Based Router) по заголовкам сообщений.",
      "Используйте паттерны Splitter и Aggregator для параллельной обработки частей составных пакетов.",
      "Применяйте идемпотентные приемники (Idempotent Consumer) для защиты от дублирования сообщений."
    ],
    semanticType: "protocol"
  }
];

const OUTPUT_PART3 = [
  {
    id: "output-openapi-3-1-yaml-production",
    name: "OutputOpenapi31YamlProductionSkill",
    displayName: "OpenAPI 3.1.0 Strict YAML Specification Standard",
    categoryId: "output",
    description: "Outputs fully compliant OpenAPI 3.1.0 YAML specs with components/schemas, responses, and security schemes.",
    tags: ["output", "openapi", "yaml", "api-spec", "swagger"],
    sectionName: "OpenAPI 3.1.0 Strict YAML Specification Standard",
    ruSectionName: "Стандарт спецификации REST API по стандарту OpenAPI 3.1.0 (YAML)",
    instructions: [
      "Output valid OpenAPI 3.1.0 YAML with `openapi: 3.1.0` declaration.",
      "Declare reusable schemas under `components.schemas` with exact data types.",
      "Define standard bearer authentication under `components.securitySchemes`."
    ],
    ruInstructions: [
      "Форматируйте спецификацию в формате YAML по стандарту OpenAPI 3.1.0.",
      "Выносите переиспользуемые структуры в раздел `components.schemas`.",
      "Описывайте схемы авторизации (Bearer / OAuth2) в `components.securitySchemes`."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-json-ld-schema-org-structured-data",
    name: "OutputJsonLdSchemaOrgStructuredDataSkill",
    displayName: "Schema.org JSON-LD SEO Structured Data Standard",
    categoryId: "output",
    description: "Outputs Google-compliant JSON-LD structured data scripts (`SoftwareApplication`, `TechArticle`, `Product`).",
    tags: ["output", "json-ld", "schema-org", "seo", "structured-data"],
    sectionName: "Schema.org JSON-LD Structured Data Standard",
    ruSectionName: "Стандарт микроразметки Schema.org в формате JSON-LD для SEO",
    instructions: [
      "Output valid `<script type=\"application/ld+json\">` blocks containing Schema.org entities.",
      "Populate `@context: \"https://schema.org\"`, `@type`, and mandatory Google Rich Snippet properties.",
      "Validate syntax against Google Rich Results Test standards."
    ],
    ruInstructions: [
      "Генерируйте структурированные данные внутри тега `<script type=\"application/ld+json\">`.",
      "Задавайте контекст `@context: \"https://schema.org\"` и обязательные свойства для Google Rich Snippets.",
      "Проверяйте корректность разметки по стандартам поисковых систем."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-apache-avro-schema-json",
    name: "OutputApacheAvroSchemaJsonSkill",
    displayName: "Apache Avro (AVSC) Binary Serialization Schema Standard",
    categoryId: "output",
    description: "Outputs Apache Avro JSON schema specifications for Kafka event streaming with doc annotations.",
    tags: ["output", "avro", "avsc", "kafka", "serialization", "schemas"],
    sectionName: "Apache Avro Schema (AVSC) Standard",
    ruSectionName: "Стандарт схем сериализации Apache Avro (AVSC / Kafka)",
    instructions: [
      "Output valid Avro JSON schema: `{ \"type\": \"record\", \"name\": \"...\", \"namespace\": \"...\", \"fields\": [...] }`.",
      "Specify explicit default values for every optional field to maintain schema evolution compatibility.",
      "Add detailed `doc` strings for every field."
    ],
    ruInstructions: [
      "Форматируйте схему в формате Avro JSON со всеми обязательными полями (name, namespace, fields).",
      "Задавайте значения по умолчанию (`default`) для обеспечения обратной совместимости эволюции схем.",
      "Добавляйте поясняющие описания (`doc`) к каждому атрибуту."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-postman-collection-v2-1-json",
    name: "OutputPostmanCollectionV21JsonSkill",
    displayName: "Postman Collection v2.1.0 Export Specification",
    categoryId: "output",
    description: "Outputs import-ready Postman Collection v2.1.0 JSON files with pre-request scripts and test assertions.",
    tags: ["output", "postman", "api-testing", "collection", "rest"],
    sectionName: "Postman Collection v2.1.0 Schema Standard",
    ruSectionName: "Стандарт экспорта коллекций запросов Postman v2.1.0 (JSON)",
    instructions: [
      "Output valid Postman Collection schema: `{ \"info\": { \"schema\": \"https://schema.getpostman.com/json/collection/v2.1.0/collection.json\" }, \"item\": [...] }`.",
      "Include realistic request URLs, query params, headers, and sample JSON bodies.",
      "Embed automated JavaScript test assertions (`pm.test(...)`) verifying HTTP 200 and schema validity."
    ],
    ruInstructions: [
      "Генерируйте коллекцию по официальной схеме Postman Collection v2.1.0.",
      "Включайте реальные примеры заголовков, параметров и тел запросов.",
      "Добавляйте автоматические тесты на JavaScript (`pm.test`) для проверки статусов ответов."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-jest-vitest-test-suite-typescript",
    name: "OutputJestVitestTestSuiteTypescriptSkill",
    displayName: "Jest / Vitest Production TypeScript Test Suite Standard",
    categoryId: "output",
    description: "Outputs complete, runnable Vitest/Jest test files with `describe`, `it`, `beforeEach`, mocks, and type safety.",
    tags: ["output", "vitest", "jest", "typescript", "testing", "unit-tests"],
    sectionName: "Vitest / Jest TypeScript Test Suite Standards",
    ruSectionName: "Стандарт модульных тестов на TypeScript (Vitest / Jest)",
    instructions: [
      "Output complete test files importing `{ describe, it, expect, beforeEach, vi }` from `vitest`.",
      "Structure tests with clear AAA pattern: Arrange, Act, Assert.",
      "Mock external modules with type-safe `vi.mock()` definitions."
    ],
    ruInstructions: [
      "Создавайте готовые файлы тестов с импортами из `vitest` или `@jest/globals`.",
      "Организуйте тесты по шаблону AAA: Arrange (Подготовка), Act (Действие), Assert (Проверка).",
      "Используйте типизированные моки для изоляции внешних модулей."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-tailwind-css-shadcn-component-tsx",
    name: "OutputTailwindCssShadcnComponentTsxSkill",
    displayName: "Modern React 19 & Tailwind CSS UI Component Standard",
    categoryId: "output",
    description: "Outputs accessible, responsive React components styled with Tailwind CSS utility classes and Lucide icons.",
    tags: ["output", "react", "tailwind", "tsx", "ui-components", "frontend"],
    sectionName: "Modern React 19 & Tailwind CSS Component Standard",
    ruSectionName: "Стандарт UI-компонентов на React 19 и Tailwind CSS",
    instructions: [
      "Output pure TypeScript React component (`.tsx`) with explicit props interface.",
      "Use responsive Tailwind utility classes (`sm:`, `md:`, `lg:`) and smooth micro-transitions.",
      "Ensure accessible ARIA labels, semantic HTML tags, and keyboard focus states."
    ],
    ruInstructions: [
      "Генерируйте чистый компонент React на TypeScript с интерфейсом свойств Props.",
      "Используйте адаптивные классы Tailwind CSS и плавные анимации переходов.",
      "Обеспечьте доступность: семантические HTML-теги, ARIA-атрибуты и фокус с клавиатуры."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-env-example-template-dotenv",
    name: "OutputEnvExampleTemplateDotenvSkill",
    displayName: "Production .env.example Configuration Template",
    categoryId: "output",
    description: "Outputs clean, documented `.env.example` templates with variable descriptions, types, and dummy defaults.",
    tags: ["output", "dotenv", "env-example", "configuration", "devops"],
    sectionName: "Production .env.example Template Standard",
    ruSectionName: "Стандарт шаблона переменных окружения .env.example",
    instructions: [
      "Group variables into logical sections: `# Database`, `# Authentication`, `# API Keys`, `# Feature Flags`.",
      "Add descriptive comments explaining what each variable configures.",
      "Provide safe placeholder dummy values (e.g. `DATABASE_URL=postgresql://user:password@localhost:5432/dbname`)."
    ],
    ruInstructions: [
      "Группируйте переменные по смысловым блокам: База данных, Авторизация, Внешние API.",
      "Добавляйте комментарии с описанием назначения и формата каждого параметра.",
      "Используйте безопасные фиктивные значения по умолчанию."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-latex-mathematical-formula-matrix",
    name: "OutputLatexMathematicalFormulaMatrixSkill",
    displayName: "LaTeX Mathematical Proof & Equation Matrix Standard",
    categoryId: "output",
    description: "Outputs academic-grade LaTeX equations and formal mathematical proofs enclosed in `$$` display math blocks.",
    tags: ["output", "latex", "math", "equations", "formal-methods"],
    sectionName: "LaTeX Mathematical Formula & Proof Standards",
    ruSectionName: "Стандарт математической верстки формул и доказательств в LaTeX",
    instructions: [
      "Format mathematical equations in standard LaTeX syntax enclosed in `$$ ... $$` for display and `$ ... $` for inline.",
      "Use proper matrix environments (`\\begin{pmatrix} ... \\end{pmatrix}`) and aligned equations (`\\begin{aligned}`).",
      "Ensure all Greek symbols, superscripts, and integrals are rendered with standard notation."
    ],
    ruInstructions: [
      "Оформляйте формулы в стандартном синтаксисе LaTeX с тегами `$$ ... $$`.",
      "Используйте окружения для матриц и многострочных выравниваний (`aligned`).",
      "Применяйте общепринятые обозначения для греческих символов, индексов и операторов."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-nginx-virtual-host-reverse-proxy",
    name: "OutputNginxVirtualHostReverseProxySkill",
    displayName: "Hardened Nginx Reverse Proxy & Virtual Host Configuration",
    categoryId: "output",
    description: "Outputs battle-tested Nginx configuration files with SSL/TLS termination, Gzip, proxy headers, and rate limits.",
    tags: ["output", "nginx", "reverse-proxy", "ssl", "devops", "web-server"],
    sectionName: "Hardened Nginx Reverse Proxy Configuration Standard",
    ruSectionName: "Стандарт конфигурации защищенного реверс-прокси Nginx",
    instructions: [
      "Output valid `nginx.conf` server blocks with `listen 443 ssl http2;`.",
      "Include standard security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Content-Security-Policy`).",
      "Set proper `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` and proxy buffer limits."
    ],
    ruInstructions: [
      "Форматируйте конфигурацию Nginx с поддержкой SSL/TLS и HTTP/2.",
      "Включайте стандартные заголовки безопасности браузера.",
      "Настройте корректную передачу IP-адресов клиентов и буферизацию прокси."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-sqlite-schema-migration-script",
    name: "OutputSqliteSchemaMigrationScriptSkill",
    displayName: "SQLite 3 Schema & WAL Mode Migration Script",
    categoryId: "output",
    description: "Outputs clean SQLite 3 schema creation scripts with WAL mode pragma, foreign keys, and indexes.",
    tags: ["output", "sqlite", "sql", "embedded-db", "migrations"],
    sectionName: "SQLite 3 Schema & Pragmas Specification",
    ruSectionName: "Спецификация схемы базы данных SQLite 3 (WAL Mode)",
    instructions: [
      "Enable performance and integrity pragmas: `PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;`.",
      "Define clean tables with `INTEGER PRIMARY KEY AUTOINCREMENT` or `TEXT PRIMARY KEY`.",
      "Include explicit unique constraints and covering indexes."
    ],
    ruInstructions: [
      "Включайте оптимизирующие прагмы: режим журнала WAL и проверку внешних ключей.",
      "Описывайте таблицы с явными первичными ключами и ограничениями целостности.",
      "Создавайте покрывающие индексы для ускорения выборок."
    ],
    semanticType: "format_directive"
  }
];

console.log('Appending Frameworks & Output Part 3...');
appendSkills('frameworks', FRAMEWORKS_PART3);
appendSkills('output', OUTPUT_PART3);
console.log('Frameworks & Output Part 3 appended.');
