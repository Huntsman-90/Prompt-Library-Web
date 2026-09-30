const { appendSkills } = require('../appendSkills.cjs');

const FRAMEWORKS_FINISH = [
  {
    id: "framework-event-sourcing-snapshot-compression",
    name: "FrameworkEventSourcingSnapshotCompressionSkill",
    displayName: "Event Store Aggregate Snapshot & Compaction Strategy",
    categoryId: "frameworks",
    description: "Periodically serializes aggregate root snapshots every N events to accelerate rehydration latency.",
    tags: ["frameworks", "event-sourcing", "snapshots", "compaction", "performance"],
    sectionName: "Event Store Snapshot & Compaction Strategy",
    ruSectionName: "Стратегия снапшотов и сжатия истории событий (Event Sourcing)",
    instructions: [
      "Generate an atomic snapshot of the aggregate root state every 100 events.",
      "When loading an aggregate, fetch the latest snapshot and replay only events occurring after the snapshot version.",
      "Achieve sub-5ms aggregate rehydration regardless of total historical event volume."
    ],
    ruInstructions: [
      "Формируйте снимок состояния (Snapshot) агрегата каждые 100 событий.",
      "При загрузке агрегата читайте последний снимок и воспроизводите только последующие события.",
      "Обеспечьте восстановление состояния менее чем за 5 мс независимо от глубины истории."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-graphql-persisted-queries-relay",
    name: "FrameworkGraphqlPersistedQueriesRelaySkill",
    displayName: "Automated Persisted Queries (APQ) & CDN Caching Framework",
    categoryId: "frameworks",
    description: "Replaces large GraphQL POST bodies with SHA256 query hashes for Edge CDN caching and DDoS protection.",
    tags: ["frameworks", "graphql", "persisted-queries", "cdn", "caching"],
    sectionName: "Automated Persisted Queries (APQ) & Edge CDN Caching",
    ruSectionName: "Автоматические персистентные запросы GraphQL (APQ) и кэширование на CDN",
    instructions: [
      "Register client GraphQL query strings as SHA256 hashes during build compilation.",
      "Send lightweight GET requests containing only the query hash (`/graphql?hash=7f3...`).",
      "Cache query responses at the Cloudflare/CloudFront edge with fine-grained cache-control headers."
    ],
    ruInstructions: [
      "Регистрируйте запросы GraphQL в виде SHA256-хэшей на этапе сборки клиента.",
      "Отправляйте легковесные GET-запросы с хэшем вместо передачи длинного тела запроса.",
      "Кэшируйте ответы на узлах Edge CDN с точными заголовками инвалидации."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-database-sharding-vitess-citus",
    name: "FrameworkDatabaseShardingVitessCitusSkill",
    displayName: "Distributed Relational Database Sharding Framework (Vitess/Citus)",
    categoryId: "frameworks",
    description: "Horizontally partitions relational databases across tenant and entity shard keys with transparent SQL proxying.",
    tags: ["frameworks", "sharding", "vitess", "citus", "postgresql", "scaling"],
    sectionName: "Distributed Relational Sharding Architecture",
    ruSectionName: "Фреймворк шардирования реляционных баз данных (Vitess / Citus / PostgreSQL)",
    instructions: [
      "Select high-cardinality, evenly distributed Shard Keys (e.g. `tenant_id` or `user_id`).",
      "Route single-shard queries directly to designated database nodes; minimize costly distributed multi-shard joins.",
      "Automate online, zero-downtime shard splitting as storage volume expands."
    ],
    ruInstructions: [
      "Выберите ключ шардирования (Shard Key) с равномерным распределением данных.",
      "Маршрутизируйте запросы напрямую к целевым шардам, минимизируя межшардовые объединения (Joins).",
      "Обеспечьте возможность онлайн-расщепления шардов без остановки сервиса."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-distributed-cache-redis-cluster",
    name: "FrameworkDistributedCacheRedisClusterSkill",
    displayName: "Redis Cluster Multi-Slot Caching & Cache-Aside Architecture",
    categoryId: "frameworks",
    description: "Implements Cache-Aside, Write-Through, and Cache Stampede protection (XFetch probabilistic early expiration).",
    tags: ["frameworks", "redis", "caching", "cache-stampede", "distributed-systems"],
    sectionName: "Redis Cluster & Cache Stampede Defense Architecture",
    ruSectionName: "Архитектура кэширования Redis Cluster и защита от лавины запросов (Cache Stampede)",
    instructions: [
      "Implement Cache-Aside with probabilistic early expiration (XFetch algorithm) to prevent cache stampedes.",
      "Distribute keys evenly across 16,384 Redis Cluster hash slots using explicit `{hash_tag}` routing.",
      "Enforce maximum TTL on all keys to prevent unbounded memory leaks."
    ],
    ruInstructions: [
      "Внедрите алгоритм вероятностного раннего обновления (XFetch) для защиты от лавинообразных запросов.",
      "Используйте хэш-теги `{tag}` для группировки связанных ключей в один слот Redis.",
      "Устанавливайте обязательный TTL для всех кэшируемых сущностей."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-zero-trust-identity-aware-proxy",
    name: "FrameworkZeroTrustIdentityAwareProxySkill",
    displayName: "Identity-Aware Proxy (IAP) & BeyondCorp Perimeter Framework",
    categoryId: "frameworks",
    description: "Replaces traditional corporate VPNs with context-aware HTTPS proxying and identity federation (BeyondCorp model).",
    tags: ["frameworks", "iap", "beyondcorp", "zero-trust", "google-cloud", "security"],
    sectionName: "Google BeyondCorp & Identity-Aware Proxy (IAP) Blueprint",
    ruSectionName: "Фреймворк Identity-Aware Proxy (IAP) и концепция BeyondCorp",
    instructions: [
      "Expose internal applications exclusively behind an Identity-Aware Reverse Proxy (Google Cloud IAP / Cloudflare Access).",
      "Verify user identity, multi-factor authentication, and device posture on every individual request.",
      "Eliminate open VPN access to entire internal subnetworks."
    ],
    ruInstructions: [
      "Публикуйте внутренние сервисы только через прокси с проверкой личности (IAP).",
      "Проверяйте личность, второй фактор (MFA) и статус доверия устройства при каждом запросе.",
      "Откажитесь от сквозного доступа через классические корпоративные VPN."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-reactive-streams-backpressure-flow",
    name: "FrameworkReactiveStreamsBackpressureFlowSkill",
    displayName: "Reactive Streams (Project Reactor / RxJava) Flow Framework",
    categoryId: "frameworks",
    description: "Processes asynchronous data streams with non-blocking backpressure signals (Subscriber-driven flow control).",
    tags: ["frameworks", "reactive-streams", "rxjava", "project-reactor", "concurrency"],
    sectionName: "Reactive Streams & Non-Blocking Backpressure Architecture",
    ruSectionName: "Реактивные потоки (Reactive Streams) и неблокирующее противодавление",
    instructions: [
      "Enforce Reactive Streams specification: Publisher, Subscriber, Subscription, Processor.",
      "Signal downstream demand explicitly via `Subscription.request(n)` before producer emits items.",
      "Handle buffer overflow strategies: `DROP`, `LATEST`, or `BUFFER` with bounded capacities."
    ],
    ruInstructions: [
      "Соблюдайте спецификацию Reactive Streams (Publisher, Subscriber, Subscription).",
      "Передавайте сигнал готовности потребителя через `request(n)` до отправки порции данных.",
      "Настройте стратегии при переполнении буфера (Drop, Latest, Bounded Buffer)."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-event-driven-saga-camunda-bpm",
    name: "FrameworkEventDrivenSagaCamundaBpmSkill",
    displayName: "Camunda BPMN 2.0 & Orchestrated Saga Engine Framework",
    categoryId: "frameworks",
    description: "Executes visual ISO BPMN 2.0 executable workflow models with automated compensation boundary events.",
    tags: ["frameworks", "camunda", "bpmn", "saga", "orchestration", "workflow-engine"],
    sectionName: "Camunda BPMN 2.0 Executable Saga Architecture",
    ruSectionName: "Исполняемые саги на базе стандарта BPMN 2.0 (Camunda / Zeebe)",
    instructions: [
      "Define business processes in standard executable BPMN 2.0 XML diagrams.",
      "Attach Compensation Boundary Events to all transactional service tasks.",
      "Automate distributed task worker dispatch via Zeebe gRPC job workers."
    ],
    ruInstructions: [
      "Описывайте рабочие процессы в виде исполняемых схем стандарта BPMN 2.0.",
      "Привязывайте компенсирующие события (Compensation Events) к каждой транзакционной задаче.",
      "Используйте распределенные воркеры Zeebe с опросом задач через gRPC."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-multi-region-active-active-cockroachdb",
    name: "FrameworkMultiRegionActiveActiveCockroachdbSkill",
    displayName: "CockroachDB Multi-Region Distributed SQL Framework",
    categoryId: "frameworks",
    description: "Designs global multi-region databases with Regional by Row, Regional by Table, and Global Table data placement.",
    tags: ["frameworks", "cockroachdb", "distributed-sql", "multi-region", "active-active"],
    sectionName: "Multi-Region Distributed SQL Data Placement Framework",
    ruSectionName: "Распределенная многорегиональная СУБД (CockroachDB Multi-Region SQL)",
    instructions: [
      "Classify tables by geography: `REGIONAL BY ROW` (local latency), `GLOBAL` (fast reads everywhere).",
      "Keep transaction read and write latencies under 10ms by anchoring partition ranges near users.",
      "Survive total AWS/GCP region outages with zero manual failover intervention."
    ],
    ruInstructions: [
      "Разделяйте таблицы по гео-политике: `REGIONAL BY ROW` для локализации данных пользователей.",
      "Обеспечьте задержку чтения и записи менее 10 мс за счет приближения данных к клиенту.",
      "Гарантируйте работу системы при падении целого дата-центра или региона облака."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-feature-management-launchdarkly-flags",
    name: "FrameworkFeatureManagementLaunchdarklyFlagsSkill",
    displayName: "Enterprise Feature Management & Targeted Rollouts (LaunchDarkly)",
    categoryId: "frameworks",
    description: "Implements multivariate feature flags, percentage-based user targeting, and automated kill-switches.",
    tags: ["frameworks", "launchdarkly", "feature-flags", "experimentation", "devops"],
    sectionName: "Enterprise Feature Management & Flag Governance",
    ruSectionName: "Управление функционалом и целевые релизы (LaunchDarkly Feature Management)",
    instructions: [
      "Implement multivariate flags targeting users by attributes (Beta group, Company, Region).",
      "Use percentage rollouts with deterministic hashing to ensure consistent user experience across sessions.",
      "Enforce flag lifecycle governance: archive and delete temporary migration flags after 60 days."
    ],
    ruInstructions: [
      "Настройте многовариантные флаги с таргетингом по атрибутам пользователя (бета-тестеры, тариф).",
      "Используйте процентные раскатки с детерминированным хэшированием для стабильного опыта пользователя.",
      "Проводите регулярный аудит и удаление временных флагов после завершения миграции."
    ],
    semanticType: "protocol"
  },
  {
    id: "framework-infrastructure-cost-finops-cloud-governance",
    name: "FrameworkInfrastructureCostFinopsCloudGovernanceSkill",
    displayName: "FinOps Cloud Cost Optimization & Tagging Governance Framework",
    categoryId: "frameworks",
    description: "Implements FinOps principles (Inform, Optimize, Operate), mandatory resource cost allocation tags, and right-sizing.",
    tags: ["frameworks", "finops", "cloud-cost", "aws", "governance", "optimization"],
    sectionName: "FinOps Cloud Governance & Cost Optimization Framework",
    ruSectionName: "Фреймворк оптимизации облачных затрат FinOps и аллокации расходов",
    instructions: [
      "Enforce mandatory cost allocation tags on all cloud resources: `Owner`, `Environment`, `Service`, `CostCenter`.",
      "Automate idle resource shutdown and compute right-sizing via automated policies.",
      "Track unit economics metrics (e.g. Cloud Cost per Active User) on weekly engineering dashboards."
    ],
    ruInstructions: [
      "Внедрите обязательные теги аллокации затрат на всех облачных ресурсах (Owner, Environment, Service).",
      "Автоматизируйте отключение неиспользуемых тестовых сред и оптимизацию размеров инстансов.",
      "Отслеживайте юнит-метрику затрат на одного активного пользователя на еженедельных дашбордах."
    ],
    semanticType: "protocol"
  }
];

const OUTPUT_FINISH = [
  {
    id: "output-protobuf-grpcurl-cli-command",
    name: "OutputProtobufGrpcurlCliCommandSkill",
    displayName: "gRPCurl CLI Interactive Request & Payload Recipe",
    categoryId: "output",
    description: "Outputs runnable gRPCurl commands with plaintext reflection flags, JSON data payloads, and service endpoints.",
    tags: ["output", "grpcurl", "grpc", "cli", "api-testing"],
    sectionName: "Production gRPCurl CLI Invocation Standards",
    ruSectionName: "Стандарт вызовов gRPCurl для тестирования gRPC-эндпоинтов",
    instructions: [
      "Output valid `grpcurl` commands with `-plaintext` or TLS certificate flags.",
      "Include structured `-d '{\"user_id\": \"123\"}'` JSON input payloads.",
      "Specify exact fully-qualified service methods (`package.Service/Method`)."
    ],
    ruInstructions: [
      "Форматируйте команду `grpcurl` с флагами шифрования или `-plaintext`.",
      "Передавайте аргументы в виде структурированного JSON через флаг `-d`.",
      "Указывайте полное имя метода gRPC: `package.ServiceName/MethodName`."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-ansible-playbook-yaml-hardened",
    name: "OutputAnsiblePlaybookYamlHardenedSkill",
    displayName: "Hardened Ansible Automation Playbook (YAML)",
    categoryId: "output",
    description: "Outputs production-grade Ansible playbooks with tasks, handlers, become privilege escalation, and idempotency.",
    tags: ["output", "ansible", "yaml", "automation", "devops", "sysadmin"],
    sectionName: "Production Ansible Playbook (YAML) Standard",
    ruSectionName: "Стандарт сценариев автоматизации Ansible Playbook (YAML)",
    instructions: [
      "Output valid Ansible YAML containing `hosts`, `become: true`, `vars`, `tasks`, and `handlers`.",
      "Ensure all tasks are idempotent and have human-readable descriptive `name` fields.",
      "Use native Ansible modules (`ansible.builtin.template`, `systemd`) rather than raw shell commands."
    ],
    ruInstructions: [
      "Генерируйте валидный YAML-сценарий Ansible со структурой `hosts`, `vars`, `tasks`, `handlers`.",
      "Обеспечьте идемпотентность всех задач и понятные имена шагов.",
      "Используйте встроенные модули Ansible вместо сырых команд bash."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-cypress-playwright-e2e-spec-ts",
    name: "OutputCypressPlaywrightE2eSpecTsSkill",
    displayName: "Playwright / Cypress E2E End-to-End Test Suite (TypeScript)",
    categoryId: "output",
    description: "Outputs resilient Playwright end-to-end browser automation tests using semantic role selectors and auto-waiting.",
    tags: ["output", "playwright", "cypress", "e2e-testing", "typescript", "qa"],
    sectionName: "Playwright E2E Browser Test Suite Standard",
    ruSectionName: "Стандарт сквозных E2E-тестов браузера на Playwright (TypeScript)",
    instructions: [
      "Output complete Playwright test file importing `{ test, expect }` from `@playwright/test`.",
      "Use user-facing accessibility locators (`page.getByRole('button', { name: 'Submit' })`).",
      "Rely on Playwright auto-waiting; strictly forbid hardcoded `page.waitForTimeout()` sleep calls."
    ],
    ruInstructions: [
      "Создавайте файлы тестов Playwright с импортами из `@playwright/test`.",
      "Используйте селекторы доступности (getByRole, getByLabel) вместо хрупких CSS-путей.",
      "Полагайтесь на автоматическое ожидание элементов, запретив `sleep` и фиксированные паузы."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-prometheus-alerting-rules-yaml",
    name: "OutputPrometheusAlertingRulesYamlSkill",
    displayName: "Prometheus Alertmanager Rule Specification (YAML)",
    categoryId: "output",
    description: "Outputs PromQL alerting rules with `expr`, `for` duration, severity labels, and actionable runbook annotations.",
    tags: ["output", "prometheus", "promql", "alertmanager", "monitoring", "sre"],
    sectionName: "Prometheus Alertmanager Rule Standards",
    ruSectionName: "Стандарт правил алертинга Prometheus и Alertmanager (YAML / PromQL)",
    instructions: [
      "Output valid Prometheus rule group YAML with `alert: AlertName` and optimized `expr: PromQL`.",
      "Set `for: 5m` duration to filter out transient metric spikes.",
      "Include mandatory `labels.severity` (critical/warning) and `annotations.runbook_url`."
    ],
    ruInstructions: [
      "Генерируйте группы правил Prometheus с понятными именами и выверенными PromQL-выражениями.",
      "Задавайте задержку `for: 5m` для фильтрации кратковременных всплесков метрик.",
      "Обязательно добавляйте лейблы критичности и ссылки на регламенты реагирования (Runbook)."
    ],
    semanticType: "format_directive"
  },
  {
    id: "output-apache-kafka-connect-config-json",
    name: "OutputApacheKafkaConnectConfigJsonSkill",
    displayName: "Kafka Connect Connector Configuration (JSON)",
    categoryId: "output",
    description: "Outputs production Kafka Connect source/sink JSON configs with converter settings, transforms, and error policies.",
    tags: ["output", "kafka-connect", "json", "streaming", "data-engineering"],
    sectionName: "Kafka Connect Connector JSON Standard",
    ruSectionName: "Стандарт конфигурации коннекторов Kafka Connect (JSON)",
    instructions: [
      "Output valid Kafka Connect configuration JSON with `connector.class` and connection parameters.",
      "Configure Schema Registry Avro/JSON converters for key and value.",
      "Set `errors.tolerance = \"all\"` and `errors.deadletterqueue.topic.name` for robust poison message handling."
    ],
    ruInstructions: [
      "Форматируйте конфигурацию в виде валидного JSON-объекта с классом коннектора.",
      "Настройте конвертеры Avro со ссылкой на Schema Registry.",
      "Укажите топик для сбойных сообщений (Dead Letter Queue)."
    ],
    semanticType: "format_directive"
  }
];

console.log('Appending final Frameworks & Output...');
appendSkills('frameworks', FRAMEWORKS_FINISH);
appendSkills('output', OUTPUT_FINISH);
console.log('Frameworks & Output final appended.');
