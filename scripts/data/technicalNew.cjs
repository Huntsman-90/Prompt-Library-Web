const newTechnicalSkills = [
  {
    id: 'gitops-argo-cd-sync-wave-architecture',
    name: 'GitopsArgoCdSyncWaveArchitectureSkill',
    displayName: 'GitOps ArgoCD Sync Waves & Progressive Rollouts',
    categoryId: 'technical',
    description: 'Architects declarative Kubernetes deployments with ArgoCD sync waves, hooks, health checks, and automatic drift remediation.',
    tags: ['technical', 'devops', 'gitops', 'argocd', 'kubernetes'],
    sectionName: 'GitOps & ArgoCD Sync Wave Architecture',
    ruSectionName: 'Архитектура GitOps (ArgoCD) и фазовое развертывание',
    semanticType: 'process_directive',
    instructions: [
      'Order resource deployment with annotations `argocd.argoproj.io/sync-wave: "-1"`, `"0"`, `"1"`.',
      'Configure PreSync hooks for database schema migrations and PostSync hooks for smoke testing.',
      'Define custom Lua health checks for third-party Custom Resource Definitions (CRDs).'
    ],
    ruInstructions: [
      'Задайте порядок выкатки ресурсов через аннотации sync-wave (-1 для CRD, 0 для базовых сервисов, 1 для ингрессов).',
      'Настройте PreSync хуки для миграций БД и PostSync для смоук-тестов.',
      'Опишите кастомные проверки здоровья (Lua Health Checks) для CRD.'
    ]
  },
  {
    id: 'istio-service-mesh-mtls-canary-routing',
    name: 'IstioServiceMeshMtlsCanaryRoutingSkill',
    displayName: 'Istio Service Mesh mTLS & Weighted Canary Routing',
    categoryId: 'technical',
    description: 'Configures Envoy sidecars, strict PeerAuthentication mTLS, VirtualServices, and DestinationRules for 90/10 traffic splitting.',
    tags: ['technical', 'service-mesh', 'istio', 'mtls', 'canary-deployment'],
    sectionName: 'Istio Service Mesh & Canary Routing Protocol',
    ruSectionName: 'Протокол сервисной сетки Istio (mTLS и канареечная маршрутизация)',
    semanticType: 'process_directive',
    instructions: [
      'Enforce strict zero-trust PeerAuthentication mTLS mode cluster-wide.',
      'Configure VirtualService with weighted routing (90% v1, 10% v2) and header-based overrides.',
      'Define DestinationRule with connection pool limits and outlier detection circuit breakers.'
    ],
    ruInstructions: [
      'Включите строгий режим взаимной аутентификации (STRICT mTLS) во всем кластере.',
      'Настройте VirtualService с весовым разделением трафика (90% stable, 10% canary).',
      'Опишите DestinationRule с ограничением пула соединений и размыкателями цепи (Circuit Breaker).'
    ]
  },
  {
    id: 'ebpf-cilium-network-security-observability',
    name: 'EbpfCiliumNetworkSecurityObservabilitySkill',
    displayName: 'eBPF Kernel-Level Network Security & Observability (Cilium/Tetragon)',
    categoryId: 'technical',
    description: 'Leverages eBPF for lightning-fast L3-L7 network filtering, socket-level load balancing, and runtime syscall security monitoring.',
    tags: ['technical', 'ebpf', 'cilium', 'tetragon', 'network-security'],
    sectionName: 'eBPF & Cilium Network Security Protocol',
    ruSectionName: 'Безопасность и мониторинг на уровне ядра с eBPF (Cilium / Tetragon)',
    semanticType: 'process_directive',
    instructions: [
      'Deploy Cilium CNI replacing kube-proxy with eBPF socket-level load balancing.',
      'Author CiliumNetworkPolicy enforcing Layer 7 HTTP/gRPC API method boundaries.',
      'Configure Tetragon security sensors detecting unauthorized kernel privilege escalations.'
    ],
    ruInstructions: [
      'Разверните Cilium CNI с заменой kube-proxy на eBPF для ускорения маршрутизации.',
      'Настройте политики CiliumNetworkPolicy с контролем вызовов на уровне L7 (HTTP/gRPC).',
      'Сконфигурируйте Tetragon для выявления несанкционированных системных вызовов в реальном времени.'
    ]
  },
  {
    id: 'vault-dynamic-secret-ephemeral-credentials',
    name: 'VaultDynamicSecretEphemeralCredentialsSkill',
    displayName: 'HashiCorp Vault Dynamic Secrets & Ephemeral Tokens',
    categoryId: 'technical',
    description: 'Eliminates static passwords by provisioning on-demand, time-limited dynamic database credentials and cloud IAM roles.',
    tags: ['technical', 'security', 'vault', 'dynamic-secrets', 'zero-trust'],
    sectionName: 'Vault Dynamic Secrets Architecture',
    ruSectionName: 'Архитектура динамических секретов и эфемерных доступов HashiCorp Vault',
    semanticType: 'process_directive',
    instructions: [
      'Configure Vault Database Secret Engine to generate short-lived (e.g. 1-hour TTL) PostgreSQL credentials.',
      'Inject secrets dynamically via Vault Agent Sidecar or Kubernetes CSI provider.',
      'Automate instant revocation upon lease expiration or detected security breach.'
    ],
    ruInstructions: [
      'Настройте движок Database Secrets в Vault для генерации временных логинов БД с коротким TTL.',
      'Внедрите доставку секретов в поды через Vault Agent Sidecar или CSI Driver.',
      'Автоматизируйте отзыв токенов при истечении срока аренды или инциденте.'
    ]
  },
  {
    id: 'chaos-engineering-litmus-fault-injection',
    name: 'ChaosEngineeringLitmusFaultInjectionSkill',
    displayName: 'Chaos Engineering & Fault Injection (LitmusChaos / Chaos Mesh)',
    categoryId: 'technical',
    description: 'Systematically injects pod kills, network packet loss, disk fill, and DNS corruption to validate system resilience and SLOs.',
    tags: ['technical', 'chaos-engineering', 'resilience', 'litmus', 'sre'],
    sectionName: 'Chaos Engineering Experiment Protocol',
    ruSectionName: 'Протокол экспериментов хаос-инженерии (LitmusChaos / Chaos Mesh)',
    semanticType: 'process_directive',
    instructions: [
      'Define Steady State Hypothesis using primary Golden Signals (latency, error rate).',
      'Execute automated fault injections (Pod delete, 200ms network latency, 50% CPU throttle).',
      'Verify that automated recovery restores the steady state within the defined RTO without human intervention.'
    ],
    ruInstructions: [
      'Сформулируйте гипотезу устойчивого состояния (Steady State) по ключевым SLI/SLO.',
      'Запустите симуляцию сбоев (убийство подов, искусственные сетевые задержки, троттлинг CPU).',
      'Убедитесь, что система восстанавливается автоматически без участия человека в рамках RTO.'
    ]
  },
  {
    id: 'opentelemetry-distributed-trace-sampling',
    name: 'OpentelemetryDistributedTraceSamplingSkill',
    displayName: 'OpenTelemetry (OTel) Distributed Tracing & Tail Sampling',
    categoryId: 'technical',
    description: 'Instruments distributed microservices with W3C tracecontext propagation and configures tail-sampling collectors for 100% error captures.',
    tags: ['technical', 'observability', 'opentelemetry', 'tracing', 'tail-sampling'],
    sectionName: 'OpenTelemetry Tracing & Sampling Architecture',
    ruSectionName: 'Архитектура распределенной трассировки OpenTelemetry и Tail-Sampling',
    semanticType: 'process_directive',
    instructions: [
      'Enforce W3C Trace Context propagation across all HTTP and messaging middleware.',
      'Deploy OTel Collector with Tail Sampling processor (100% of errors/5xx, 100% of p99 latency outliers, 1% of normal 200 OKs).',
      'Correlate spans directly with structured application logs and Prometheus metrics.'
    ],
    ruInstructions: [
      'Обеспечьте проброс заголовков W3C Trace Context через все микросервисы и очереди.',
      'Настройте OTel Collector с Tail Sampling (100% ошибок, 100% аномально долгих запросов, 1% нормы).',
      'Свяжите span_id с логами и метриками в графане.'
    ]
  },
  {
    id: 'kafka-schema-registry-avro-compatibility',
    name: 'KafkaSchemaRegistryAvroCompatibilitySkill',
    displayName: 'Confluent Kafka Schema Registry & Avro Compatibility Matrix',
    categoryId: 'technical',
    description: 'Enforces strict BACKWARD or FULL compatibility modes on Apache Avro event schemas in high-throughput Kafka ecosystems.',
    tags: ['technical', 'kafka', 'avro', 'schema-registry', 'event-driven'],
    sectionName: 'Kafka Schema Evolution Protocol',
    ruSectionName: 'Протокол эволюции схем Kafka (Avro / Schema Registry)',
    semanticType: 'process_directive',
    instructions: [
      'Set schema subject compatibility to `BACKWARD_TRANSITIVE` or `FULL`.',
      'Enforce rules: new fields MUST have default values; existing fields MUST NOT be renamed without aliasing.',
      'Automate schema validation in CI/CD before deploying application producer updates.'
    ],
    ruInstructions: [
      'Установите режим совместимости схем BACKWARD_TRANSITIVE или FULL.',
      'Соблюдайте правила: новые поля обязаны иметь default, старые поля нельзя удалять без поддержки.',
      'Внедрите проверку схем в пайплайны CI/CD до деплоя продюсеров.'
    ]
  },
  {
    id: 'terraform-module-refactoring-and-state-mv',
    name: 'TerraformModuleRefactoringAndStateMvSkill',
    displayName: 'Terraform State Surgery (`terraform state mv` & `moved` blocks)',
    categoryId: 'technical',
    description: 'Refactors monolithic Terraform configurations into composable modules using HCL `moved` blocks without destroying cloud infrastructure.',
    tags: ['technical', 'terraform', 'iac', 'state-management', 'refactoring'],
    sectionName: 'Terraform State Refactoring Protocol',
    ruSectionName: 'Рефакторинг Terraform и безопасная миграция состояния (moved blocks)',
    semanticType: 'process_directive',
    instructions: [
      'Use native declarative `moved { from = ... to = ... }` blocks rather than manual state manipulation.',
      'Verify plan output shows `0 to add, X to change (or 0), 0 to destroy`.',
      'Lock remote state backends (S3/DynamoDB or GCS) with optimistic locking.'
    ],
    ruInstructions: [
      'Используйте декларативные блоки `moved { from = ... to = ... }` вместо ручного редактирования стейта.',
      'Убедитесь по выводу `terraform plan`, что запланировано 0 удалений ресурсов.',
      'Обеспечьте блокировку стейта (State Locking) для предотвращения параллельных правок.'
    ]
  },
  {
    id: 'redis-cluster-failover-split-brain-guard',
    name: 'RedisClusterFailoverSplitBrainGuardSkill',
    displayName: 'Redis Cluster Sharding & Split-Brain Prevention',
    categoryId: 'technical',
    description: 'Architects 16,384 hash slot distributed Redis clusters with Raft/Sentinel quorum rules preventing split-brain data divergence.',
    tags: ['technical', 'redis', 'caching', 'sharding', 'high-availability'],
    sectionName: 'Redis High-Availability Architecture',
    ruSectionName: 'Архитектура Redis Cluster и защита от разделения сети (Split-Brain)',
    semanticType: 'strategy_framework',
    instructions: [
      'Distribute master nodes across minimum 3 independent availability zones.',
      'Configure `min-replicas-to-write 1` and `min-replicas-max-lag 10` to stop writes during master network partitions.',
      'Use Redis Hash Tags `{user:123}:profile` to guarantee colocation of multi-key transactions.'
    ],
    ruInstructions: [
      'Разнесите master-ноды минимум по 3 независимым зонам доступности (AZ).',
      'Задайте параметры min-replicas-to-write для блокировки записи в изолированный мастер.',
      'Используйте Hash Tags `{id}:key` для гарантированного попадания связанных ключей в один слот.'
    ]
  },
  {
    id: 'zero-downtime-blue-green-loadbalancer-cutover',
    name: 'ZeroDowntimeBlueGreenLoadbalancerCutoverSkill',
    displayName: 'Blue-Green Deployment Load Balancer Cutover & Instant Rollback',
    categoryId: 'technical',
    description: 'Orchestrates zero-downtime Blue-Green production cutovers with pre-warming, connection draining, and instant DNS/ALB rollback.',
    tags: ['technical', 'blue-green', 'zero-downtime', 'load-balancer', 'deployments'],
    sectionName: 'Blue-Green Cutover Protocol',
    ruSectionName: 'Протокол Blue-Green переключения трафика с мгновенным откатом',
    semanticType: 'process_directive',
    instructions: [
      'Provision parallel Green environment identical to live Blue environment.',
      'Run end-to-end synthetic health checks against Green before shifting traffic.',
      'Shift traffic instantly at the ALB level while maintaining Blue warm for a 30-minute rollback window.'
    ],
    ruInstructions: [
      'Разверните параллельный контур Green, идентичный текущему Blue.',
      'Выполните синтетические тесты на контуре Green до переключения трафика.',
      'Переключите балансировщик (ALB) на Green, оставив контур Blue прогретым на 30 минут для отката.'
    ]
  },
  {
    id: 'grpc-protobuf-backward-compatibility-guard',
    name: 'GrpcProtobufBackwardCompatibilityGuardSkill',
    displayName: 'gRPC & Protocol Buffers Backward Compatibility Rules',
    categoryId: 'technical',
    description: 'Enforces field tag preservation, `reserved` tag guards, and non-breaking protobuf schema evolutions with Buf CLI linting.',
    tags: ['technical', 'grpc', 'protobuf', 'api-design', 'buf-cli'],
    sectionName: 'Protobuf Backward Compatibility Protocol',
    ruSectionName: 'Правила обратной совместимости gRPC и Protocol Buffers (Buf Lint)',
    semanticType: 'process_directive',
    instructions: [
      'Never alter numeric field tags of existing message fields.',
      'Mark deleted fields explicitly as `reserved 3, 7, 12;` and `reserved "old_field_name";`.',
      'Validate changes in CI using `buf breaking --against .git#branch=main`.'
    ],
    ruInstructions: [
      'Никогда не изменяйте числовые номера (field tags) существующих полей protobuf.',
      'Помечайте удаленные поля как `reserved` по номерам и именам во избежание повторного использования.',
      'Проверяйте совместимость в CI с помощью утилиты `buf breaking`.'
    ]
  },
  {
    id: 'waf-modsecurity-owasp-crs-tuning',
    name: 'WafModsecurityOwaspCrsTuningSkill',
    displayName: 'WAF Rule Tuning & OWASP Core Rule Set (CRS) False Positive Suppression',
    categoryId: 'technical',
    description: 'Configures Web Application Firewalls with OWASP CRS anomaly scoring and surgical rule exclusions for legitimate JSON payloads.',
    tags: ['technical', 'security', 'waf', 'owasp-crs', 'modsecurity'],
    sectionName: 'WAF Tuning & Anomaly Scoring Protocol',
    ruSectionName: 'Настройка WAF и подавление ложных срабатываний (OWASP CRS)',
    semanticType: 'process_directive',
    instructions: [
      'Deploy WAF in Anomaly Scoring detection-only mode during initial staging baseline.',
      'Audit blocked requests and craft surgical exclusion rules targeted by URI and Parameter name.',
      'Switch to blocking mode once paranoia levels (PL 1-2) operate with zero false-positive drop rate.'
    ],
    ruInstructions: [
      'Запустите WAF в режиме детекции (Anomaly Scoring) для сбора базового профиля трафика.',
      'Изучите заблокированные легитимные запросы и создайте точечные исключения (exclusions).',
      'Включите блокирующий режим при подтверждении отсутствия ложных срабатываний.'
    ]
  },
  {
    id: 'elasticsearch-ilm-index-lifecycle-hot-warm-cold',
    name: 'ElasticsearchIlmIndexLifecycleHotWarmColdSkill',
    displayName: 'Elasticsearch Hot-Warm-Cold Tiering & ILM Policies',
    categoryId: 'technical',
    description: 'Configures Index Lifecycle Management (ILM) rolling indices from SSD Hot ingest nodes to Warm HDD nodes and searchable Cold snapshots.',
    tags: ['technical', 'elasticsearch', 'opensearch', 'ilm', 'storage-tiering'],
    sectionName: 'Elasticsearch ILM Tiering Architecture',
    ruSectionName: 'Архитектура жизненного цикла индексов Elasticsearch (Hot / Warm / Cold)',
    semanticType: 'process_directive',
    instructions: [
      'Hot Phase: Max primary shards on NVMe SSD nodes with rollover at 50GB index size or 30 days.',
      'Warm Phase: Shrink shards, force-merge to 1 segment, relocate to high-density SATA storage.',
      'Cold/Frozen Phase: Convert to searchable snapshots mounted directly from S3 object storage.'
    ],
    ruInstructions: [
      'Hot: Запись на быстрые NVMe SSD с роллоslashвером при 50 Гб или 30 днях.',
      'Warm: Сжатие шардов (Shrink), Force-Merge в 1 сегмент и перенос на емкие диски.',
      'Cold: Конвертация в Searchable Snapshots в объектном хранилище S3.'
    ]
  },
  {
    id: 'rate-limiting-distributed-token-bucket-redis-lua',
    name: 'RateLimitingDistributedTokenBucketRedisLuaSkill',
    displayName: 'Distributed Token Bucket & Leaky Bucket (Redis + Lua)',
    categoryId: 'technical',
    description: 'Implements atomic token bucket rate limiting scripts in Redis Lua preventing race conditions across scaled application clusters.',
    tags: ['technical', 'rate-limiting', 'redis', 'lua', 'api-gateway'],
    sectionName: 'Distributed Rate Limiting Specification',
    ruSectionName: 'Распределенный Rate Limiting (Token Bucket на Redis + Lua)',
    semanticType: 'process_directive',
    instructions: [
      'Execute atomic calculation inside Redis Lua: replenish tokens based on elapsed millisecond timestamp.',
      'Return standard HTTP headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `Retry-After`.',
      'Provide graduated tiering by API key subscription tier with fallback burst allowance.'
    ],
    ruInstructions: [
      'Выполняйте расчет пополнения токенов атомарно в скрипте Redis Lua по меткам времени.',
      'Возвращайте заголовки `X-RateLimit-Limit`, `X-RateLimit-Remaining` и `Retry-After`.',
      'Задайте лимиты и burst-допуски в зависимости от тарифного плана API-ключа.'
    ]
  },
  {
    id: 'oauth2-pkce-authorization-code-flow',
    name: 'Oauth2PkceAuthorizationCodeFlowSkill',
    displayName: 'OAuth 2.1 & PKCE (Proof Key for Code Exchange) Flow',
    categoryId: 'technical',
    description: 'Implements secure Authorization Code flow with SHA-256 code challenge/verifier (PKCE) for Single Page Apps and mobile clients.',
    tags: ['technical', 'security', 'oauth2', 'pkce', 'auth'],
    sectionName: 'OAuth 2.1 & PKCE Implementation Protocol',
    ruSectionName: 'Протокол авторизации OAuth 2.1 с защитой PKCE (SPA и Mobile)',
    semanticType: 'process_directive',
    instructions: [
      'Generate cryptographically secure random `code_verifier` and compute `code_challenge = BASE64URL(SHA256(code_verifier))`.',
      'Send authorization request with `code_challenge_method=S256`.',
      'Exchange returned authorization code with plaintext `code_verifier` over TLS.'
    ],
    ruInstructions: [
      'Сгенерируйте криптографический `code_verifier` и вычислите хэш `code_challenge` (SHA256).',
      'Отправьте запрос авторизации с параметром `code_challenge_method=S256`.',
      'Обменяйте код авторизации на токены, передав исходный verifier на бэкенд.'
    ]
  },
  {
    id: 'postgresql-vacuum-bloat-and-pg-repack',
    name: 'PostgresqlVacuumBloatAndPgRepackSkill',
    displayName: 'PostgreSQL Table Bloat, Autovacuum Tuning & pg_repack',
    categoryId: 'technical',
    description: 'Tunes autovacuum parameters (scale_factor, cost_limit) and conducts zero-lock live table packing with `pg_repack`.',
    tags: ['technical', 'postgresql', 'database', 'autovacuum', 'pg-repack', 'performance'],
    sectionName: 'PostgreSQL Table Bloat & Maintenance Protocol',
    ruSectionName: 'Борьба с раздуванием таблиц PostgreSQL (Autovacuum и pg_repack)',
    semanticType: 'process_directive',
    instructions: [
      'Identify bloated dead tuples using `pgstattuple` or system catalog metrics.',
      'Aggressively tune `autovacuum_vacuum_scale_factor = 0.05` and `autovacuum_vacuum_cost_limit = 2000` for high-write tables.',
      'Reclaim disk space online without exclusive table locks using `pg_repack`.'
    ],
    ruInstructions: [
      'Выявите раздутые таблицы и мертвые кортежи (dead tuples) через системные представления.',
      'Настройте агрессивный autovacuum для таблиц с частыми апдейтами (scale_factor 0.05).',
      'Выполните реорганизацию таблиц без эксклюзивной блокировки с помощью `pg_repack`.'
    ]
  },
  {
    id: 'sre-error-budget-burn-rate-alerting',
    name: 'SreErrorBudgetBurnRateAlertingSkill',
    displayName: 'Multiwindow Multi-Burn-Rate SRE Alerting (Google SRE Book)',
    categoryId: 'technical',
    description: 'Implements multiwindow multi-burn-rate alerts (e.g. 14.4x burn over 1h/5m, 6x burn over 6h/30m) to eliminate alert fatigue while protecting SLOs.',
    tags: ['technical', 'sre', 'error-budget', 'burn-rate', 'prometheus-alerting'],
    sectionName: 'SRE Error Budget Burn Rate Alerting',
    ruSectionName: 'Мультиоконный алерт скорости сжигания Error Budget (Google SRE)',
    semanticType: 'process_directive',
    instructions: [
      'Define clear SLI and monthly target SLO (e.g. 99.9% success rate).',
      'Configure Page Alert: 14.4x burn rate consumed in 1 hour (window: 1h long, 5m short).',
      'Configure Ticket Alert: 6x burn rate consumed in 6 hours (window: 6h long, 30m short).'
    ],
    ruInstructions: [
      'Задайте SLI и месячный целевой SLO (например, 99.9% успешных запросов).',
      'Настройте дежурный пейджер-алерт: 14.4x сжигание бюджета за 1 час (окна: 1ч и 5 мин).',
      'Настройте тикет-алерт для медленного сжигания: 6x за 6 часов (окна: 6ч и 30 мин).'
    ]
  },
  {
    id: 'cdn-cache-invalidation-surrogate-keys',
    name: 'CdnCacheInvalidationSurrogateKeysSkill',
    displayName: 'Edge CDN Caching & Surrogate-Key / Cache-Tag Purging',
    categoryId: 'technical',
    description: 'Emits `Surrogate-Key` / `Cache-Tags` headers to enable instant, pinpoint cache purging of millions of related edge URLs upon database mutation.',
    tags: ['technical', 'cdn', 'caching', 'fastly', 'cloudflare', 'surrogate-keys'],
    sectionName: 'Surrogate-Key CDN Caching Protocol',
    ruSectionName: 'Кэширование на CDN и точечный сброс по Surrogate-Keys / Cache-Tags',
    semanticType: 'process_directive',
    instructions: [
      'Attach granular entity cache tags to HTTP responses (e.g. `Cache-Tag: user-42, product-901, catalog-fall`).',
      'Set aggressive `s-maxage=31536000, stale-while-revalidate=86400` at the edge.',
      'Emit instant API purge calls targeted strictly by mutated Surrogate Key on entity update.'
    ],
    ruInstructions: [
      'Добавляйте теги сущностей в HTTP-ответы (`Cache-Tag: item-12, collection-5`).',
      'Устанавливайте длительный кэш на CDN с директивой `stale-while-revalidate`.',
      'Отправляйте API-запрос на сброс кэша строго по измененному тегу при апдейте в БД.'
    ]
  },
  {
    id: 'graphql-schema-stitching-federation-apollo',
    name: 'GraphqlSchemaStitchingFederationApolloSkill',
    displayName: 'Apollo Federation Subgraph Schema Composition',
    categoryId: 'technical',
    description: 'Architects enterprise GraphQL federated supergraphs using `@key`, `@shareable`, and `@provides` directives across independent microservices.',
    tags: ['technical', 'graphql', 'apollo-federation', 'subgraphs', 'api-gateway'],
    sectionName: 'Apollo Federation Subgraph Architecture',
    ruSectionName: 'Федеративная схема GraphQL (Apollo Federation и субграфы)',
    semanticType: 'strategy_framework',
    instructions: [
      'Define federated entity primary keys with `@key(fields: "id")`.',
      'Extend foreign types across subgraphs using `@external` and `@requires` directives.',
      'Compose supergraph schema in CI with Rover CLI, preventing breaking gateway compositions.'
    ],
    ruInstructions: [
      'Опишите первичные ключи сущностей через директиву `@key(fields: "id")`.',
      'Расширяйте типы из других субграфов с помощью `@external` и `@requires`.',
      'Проверяйте сборку суперграфа в CI через утилиту Rover до деплоя в прод.'
    ]
  },
  {
    id: 'continuous-profiling-pyroscope-ebpf',
    name: 'ContinuousProfilingPyroscopeEbpfSkill',
    displayName: 'Continuous CPU/Memory Profiling (Pyroscope & Parca)',
    categoryId: 'technical',
    description: 'Deploys continuous low-overhead eBPF profilers generating flamegraphs of production CPU cycles, lock contention, and memory heap allocations.',
    tags: ['technical', 'profiling', 'flamegraph', 'pyroscope', 'performance-engineering'],
    sectionName: 'Continuous Profiling & Flamegraph Protocol',
    ruSectionName: 'Непрерывное профилирование CPU и памяти в проде (Pyroscope / Parca)',
    semanticType: 'process_directive',
    instructions: [
      'Deploy zero-instrumentation eBPF profiling agents across Kubernetes worker nodes (<1% CPU overhead).',
      'Aggregate time-series flamegraphs by Service, Namespace, and Git Commit SHA.',
      'Analyze diff flamegraphs comparing release builds to detect memory allocation leaks before rollout.'
    ],
    ruInstructions: [
      'Разверните eBPF-агенты профилирования на нодах кластера (накладные расходы <1%).',
      'Агрегируйте флеймграфы (Flamegraphs) по сервисам, неймспейсам и хэшам коммитов.',
      'Сравнивайте флеймграфы между релизами для выявления утечек памяти до выхода в прод.'
    ]
  }
];

module.exports = { newTechnicalSkills };
