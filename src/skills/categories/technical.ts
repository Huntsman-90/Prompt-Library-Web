import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const TECHNICAL_SKILLS: Record<string, SkillDefinition> = {
  'incident-postmortem': {
    id: 'incident-postmortem',
    name: 'IncidentPostmortemSkill',
    displayName: 'Production Incident Postmortem & SRE Review',
    categoryId: 'technical',
    description: 'Generates thorough SRE incident postmortems: impact summary, T0-T3 timeline, 5-Whys root cause, and preventative action matrix.',
    tags: ['technical', 'postmortem', 'incident', 'sre', 'devops', 'reliability'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Протокол Разбора Производственного Инцидента (Postmortem)',
        'Production Incident Postmortem & Root Cause Protocol',
        [
          '- **Сводка воздействия (Impact)**: Зафиксировать длительность сбоя, процент ошибок 5xx, затронутых пользователей и финансовый ущерб.',
          '- **Поминутная хронология**: Таблица событий с точным временем UTC от момента триггера до полного восстановления.',
          '- **Первопричины и превентивные меры**: Детальный 5-Whys анализ и таблица задач с приоритетами P0-P2 и ответственными.',
        ],
        [
          '- **Blast Radius & Impact**: Document outage duration, error rates, SLA breach metrics, and affected business workflows.',
          '- **Chronological Event Timeline**: Granular UTC ledger tracking Trigger (T0), Detection (T1), Mitigation (T2), and Full Resolution (T3).',
          '- **Root Cause & Action Matrix**: Deep 5-Whys systemic analysis paired with an actionable remediation ledger with assigned owners.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'kubernetes-manifest-hardening': {
    id: 'kubernetes-manifest-hardening',
    name: 'KubernetesManifestHardeningSkill',
    displayName: 'Hardened Kubernetes Manifest Architecture',
    categoryId: 'technical',
    description: 'Generates hardened production K8s YAML: resource requests/limits, liveness/readiness/startup probes, PDBs, and securityContext.',
    tags: ['technical', 'kubernetes', 'k8s', 'devops', 'helm', 'containers', 'manifests'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Спецификация Харденинга Kubernetes Манифестов',
        'Hardened Production Kubernetes Manifest Specification',
        [
          '- **Лимиты ресурсов (Requests & Limits)**: Обязательно задать `cpu` и `memory` requests и limits для предотвращения OOMKilled.',
          '- **Пробы жизнеспособности**: Настроить `livenessProbe`, `readinessProbe` и `startupProbe` с адекватными `initialDelaySeconds`.',
          '- **Безопасный контекст (securityContext)**: `runAsNonRoot: true`, `readOnlyRootFilesystem: true`, `allowPrivilegeEscalation: false`.',
        ],
        [
          '- **Resource Bounds**: Explicitly declare CPU/Memory `requests` and `limits` to prevent node noisy-neighbor thrashing and unhandled OOMKilled events.',
          '- **Health Probes**: Implement `livenessProbe`, `readinessProbe`, and `startupProbe` with calibrated HTTP/TCP health endpoints.',
          '- **Hardened SecurityContext**: Enforce `runAsNonRoot: true`, `readOnlyRootFilesystem: true`, `allowPrivilegeEscalation: false`, and drop `ALL` capabilities.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'terraform-iac-module': {
    id: 'terraform-iac-module',
    name: 'TerraformIacModuleSkill',
    displayName: 'Modular Terraform / OpenTofu IaC Architecture',
    categoryId: 'technical',
    description: 'Architects reusable, typed Terraform/OpenTofu modules with clean variables, outputs, remote state locks, and tag policies.',
    tags: ['technical', 'terraform', 'iac', 'opentofu', 'cloud', 'aws', 'gcp', 'infrastructure'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Спецификация Модулей Terraform (IaC Architecture)',
        'Modular Terraform / OpenTofu IaC Specification',
        [
          '- **Структура модуля**: Разделить код на файлы: `main.tf`, `variables.tf`, `outputs.tf`, `versions.tf`.',
          '- **Типизация переменных**: Каждая переменная должна иметь тип (`string`, `number`, `map`), описание (`description`) и безопасный дефолт.',
          '- **Политика тегирования (Tagging Policy)**: Автоматически добавлять теги `Environment`, `Owner`, `ManagedBy = "Terraform"`.',
        ],
        [
          '- **Standard File Layout**: Decompose configuration cleanly into `main.tf`, `variables.tf`, `outputs.tf`, and `versions.tf`.',
          '- **Strict Variable Typing**: Provide explicit variable types, descriptive summaries, and validated input bounds.',
          '- **Mandatory Tagging Policy**: Attach canonical metadata tags (`Environment`, `CostCenter`, `ManagedBy = "Terraform"`).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'microservice-resilience-mesh': {
    id: 'microservice-resilience-mesh',
    name: 'MicroserviceResilienceMeshSkill',
    displayName: 'Service Mesh & Distributed Resilience (Istio/Envoy)',
    categoryId: 'technical',
    description: 'Configures service mesh resilience: mTLS zero-trust encryption, timeout budgets, retries with jitter, and outlier circuit breakers.',
    tags: ['technical', 'service-mesh', 'istio', 'envoy', 'resilience', 'mtls', 'circuit-breaker'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Конфигурация Service Mesh и Отказоустойчивости (Istio)',
        'Service Mesh Resilience & mTLS Configuration Protocol',
        [
          '- **Взаимная аутентификация (Strict mTLS)**: Настроить `PeerAuthentication` в режиме `STRICT` для всех межсервисных вызовов.',
          '- **Таймауты и ретраи**: Задать `VirtualService` с жестким таймаутом (например, 2s) и максимум 2 повторами с джиттером.',
          '- **Outlier Detection (Circuit Breaker)**: Настроить `DestinationRule` для автоматического исключения сбойных подов на 30 секунд при 3 ошибках подряд.',
        ],
        [
          '- **Strict mTLS Enforcement**: Mandate `STRICT` mode `PeerAuthentication` ensuring end-to-end encrypted transport across all microservices.',
          '- **Bounded Retries & Timeouts**: Configure `VirtualService` with strict timeout caps and exponential backoff retry policies.',
          '- **Outlier Detection Circuit Breaker**: Configure `DestinationRule` ejecting unhealthy pods from the load balancing pool upon consecutive 5xx errors.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'load-testing-k6-script': {
    id: 'load-testing-k6-script',
    name: 'LoadTestingK6ScriptSkill',
    displayName: 'Distributed Load & Stress Testing (k6 / Locust)',
    categoryId: 'technical',
    description: 'Constructs automated k6 performance stress-testing scripts with ramping VUs, stages (smoke, load, stress, soak), and SLA threshold checks.',
    tags: ['technical', 'k6', 'load-testing', 'performance', 'stress-test', 'benchmarking'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Сценарий Нагрузочного Тестирования (k6 Script)',
        'Distributed Load & Stress Testing Specification (k6 Script)',
        [
          '- **Стадии нагрузки (Ramping Stages)**: Настроить прогрев (Ramp-up), плато максимальной нагрузки (Target 5,000 VUs) и спад (Ramp-down).',
          "- **Пороги производительности (Thresholds / SLAs)**: Задать условия падения теста: `http_req_duration: [\"p(99)<200\"]`, `http_req_failed: [\"rate<0.01\"]`.",
          '- **Реалистичные пользовательские сценарии**: Использовать случайные паузы (`sleep`), вариативность параметров и авторизацию.',
        ],
        [
          '- **Ramping Stages Lifecycle**: Configure smooth ramp-up, peak saturation plateau (e.g. 5,000 VUs), and gradual ramp-down stages.',
          "- **Strict SLA Thresholds**: Enforce CI/CD quality gates: `http_req_duration: [\"p(99)<200\"]`, `http_req_failed: [\"rate<0.001\"]`.",
          '- **Realistic Synthetic Scenarios**: Incorporate randomized pacing pauses, parameter variation, and auth token session lifecycles.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'disaster-recovery-drp-plan': {
    id: 'disaster-recovery-drp-plan',
    name: 'DisasterRecoveryDrpPlanSkill',
    displayName: 'Disaster Recovery Plan (RTO / RPO & Failover)',
    categoryId: 'technical',
    description: 'Constructs comprehensive Disaster Recovery Plans (DRP): defining Recovery Time Objective (RTO), Recovery Point Objective (RPO), and multi-region failover.',
    tags: ['technical', 'disaster-recovery', 'drp', 'rto', 'rpo', 'failover', 'business-continuity'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'План Аварийного Восстановления (Disaster Recovery Plan)',
        'Disaster Recovery Plan (DRP) & Business Continuity Spec',
        [
          '- **Метрики RTO и RPO**: Четко зафиксировать RTO (максимальное время простоя, например: < 15 мин) и RPO (максимальная потеря данных, например: < 1 мин).',
          '- **Стратегия переключения (Active-Active / Warm Standby)**: Пошаговый сценарий DNS-переключения (Route 53 Failover) на резервный регион.',
          '- **Регламент регулярного тестирования (GameDay)**: Расписание проведения учебных тренировок по имитации падения дата-центра раз в квартал.',
        ],
        [
          '- **RTO & RPO Bounds**: Formulate strict Recovery Time Objective (RTO < 15 min) and Recovery Point Objective (RPO < 1 min) SLA commitments.',
          '- **Automated Multi-Region Failover**: Step-by-step DNS/BGP cutover and cross-region database promotion runbook.',
          '- **Quarterly GameDay Drills**: Schedule periodic simulated multi-zone infrastructure outages to test disaster runbooks under pressure.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'dns-networking-troubleshooter': {
    id: 'dns-networking-troubleshooter',
    name: 'DnsNetworkingTroubleshooterSkill',
    displayName: 'Network, DNS & TLS Protocol Diagnostics',
    categoryId: 'technical',
    description: 'Diagnoses complex network issues: DNS propagation/split-horizon, BGP routing, MTU path discovery, TCP handshakes, and TLS certificate chains.',
    tags: ['technical', 'networking', 'dns', 'tls', 'tcp', 'bgp', 'troubleshooting'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Диагностика Сети, DNS и TLS (Network Troubleshooting)',
        'Network, DNS & TLS Protocol Diagnostic Protocol',
        [
          '- **Проверка DNS цепочки**: Проверить авторитетные NS-серверы, TTL кэширования, записи A/AAAA, CNAME и Split-Horizon зоны.',
          '- **Диагностика TLS рукопожатия**: Проверить валидность цепочки сертификатов (CA Chain), поддержку ALPN (h2) и шифров TLS 1.3.',
          '- **Анализ пакетов и MTU**: Проверить фрагментацию пакетов (Path MTU Discovery) и сетевые задержки через `mtr` и `tcpdump`.',
        ],
        [
          '- **DNS Resolution Diagnostics**: Audit authoritative nameservers, negative TTL caching, CNAME loops, and Split-Horizon DNS mappings.',
          '- **TLS Handshake Diagnostics**: Verify intermediate CA certificate chains, ALPN protocol negotiation (h2/h3), and modern TLS 1.3 cipher suites.',
          '- **Packet & Path MTU Profiling**: Trace TCP window scaling, MTU fragmentation black holes, and packet drop anomalies via `tcpdump`.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'canary-deployment-strategy': {
    id: 'canary-deployment-strategy',
    name: 'CanaryDeploymentStrategySkill',
    displayName: 'Canary & Blue-Green Progressive Delivery',
    categoryId: 'technical',
    description: 'Implements progressive delivery: Argo Rollouts canary traffic shifting (5% -> 25% -> 100%), automated telemetry analysis, and instant rollbacks.',
    tags: ['technical', 'canary', 'blue-green', 'argo-rollouts', 'progressive-delivery', 'deployment'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Стратегия Прогрессивного Релиза (Canary Rollouts)',
        'Canary & Blue-Green Progressive Delivery Protocol',
        [
          '- **Поэтапное переключение трафика**: Направить 5% трафика на канареечную версию на 15 минут -> 25% на 30 минут -> 100% при успехе.',
          '- **Автоматический анализ метрик (AnalysisTemplate)**: Непрерывно сравнивать процент ошибок и задержку P99 канарейки с базовой версией.',
          '- **Мгновенный автоматический откат**: При превышении порога ошибок > 1% мгновенно сбросить трафик канарейки на 0% без вмешательства человека.',
        ],
        [
          '- **Gradual Traffic Shift Schedule**: Route 5% traffic to canary for 15m -> expand to 25% for 30m -> promote to 100% upon baseline health parity.',
          '- **Automated Telemetry Analysis**: Continuously compare canary error rates and P99 latency against baseline production cohorts.',
          '- **Zero-Touch Automated Rollback**: Instantly route 100% traffic back to stable baseline if canary error budget breaches 1% threshold.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'linux-kernel-tuning-sysctl': {
    id: 'linux-kernel-tuning-sysctl',
    name: 'LinuxKernelTuningSysctlSkill',
    displayName: 'Linux Kernel & High-Throughput Network Tuning',
    categoryId: 'technical',
    description: 'Tunes Linux kernel parameters (`sysctl.conf`, `limits.conf`): TCP socket buffers, SOMAXCONN, file descriptors, ephemeral ports, and BBR congestion.',
    tags: ['technical', 'linux', 'sysctl', 'kernel', 'performance', 'networking', 'tuning'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Тюнинг Ядра Linux для Высоких Нагрузок (sysctl.conf)',
        'Linux Kernel High-Throughput Performance Tuning Spec',
        [
          '- **Сетевой стек TCP/IP**: `net.core.somaxconn = 65535`, `net.ipv4.tcp_max_syn_backlog = 65535`, `net.ipv4.tcp_congestion_control = bbr`.',
          '- **Буферы сокетов**: Увеличить `net.core.rmem_max` и `net.core.wmem_max` до 16MB для высокоскоростной передачи данных.',
          '- **Файловые дескрипторы**: Настроить `fs.file-max = 2097152` и `limits.conf` (`nofile 1048576`).',
        ],
        [
          '- **TCP/IP Stack Tuning**: Configure `net.core.somaxconn = 65535`, `net.ipv4.tcp_max_syn_backlog = 65535`, and `net.ipv4.tcp_congestion_control = bbr`.',
          '- **Socket Buffer Sizing**: Expand `net.core.rmem_max` and `net.core.wmem_max` to 16MB to optimize high-bandwidth, long-fat-network transfers.',
          '- **File Descriptor Capacity**: Expand `fs.file-max = 2097152` and configure `/etc/security/limits.conf` with `nofile 1048576`.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  "opentelemetry-collector-distributed-tracing": {
    id: "opentelemetry-collector-distributed-tracing",
    name: 'DistributedTracingOpentelemetrySkill',
    displayName: 'OpenTelemetry Distributed Tracing & W3C Spans',
    categoryId: 'technical',
    description: 'Instruments distributed systems with OpenTelemetry: W3C TraceContext propagation, semantic span attributes, baggage, and Jaeger export.',
    tags: ['technical', 'opentelemetry', 'otel', 'tracing', 'observability', 'spans', 'jaeger'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Распределенная Трассировка OpenTelemetry (OTel Tracing)',
        'OpenTelemetry Distributed Tracing & Context Propagation Spec',
        [
          '- **Проброс контекста (W3C TraceContext)**: Передавать заголовки `traceparent` и `tracestate` во всех исходящих HTTP/gRPC вызовах.',
          '- **Семантические атрибуты спанов**: Обогащать спаны стандартизированными полями `http.status_code`, `db.system`, `net.peer.name`, `user.id`.',
          '- **Экспорт данных**: Настроить надежную передачу трейсов через OTel Collector по протоколу OTLP/gRPC.',
        ],
        [
          '- **W3C TraceContext Propagation**: Inject and extract `traceparent` and `tracestate` headers across all distributed RPC and queue boundaries.',
          '- **Semantic Span Attributes**: Enrich spans with standard OpenTelemetry semantic conventions (`http.request.method`, `db.statement`, `error.type`).',
          '- **OTLP/gRPC Export Pipeline**: Route traces asynchronously through local OpenTelemetry Collectors to Jaeger/Tempo backends.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'secrets-management-vault': {
    id: 'secrets-management-vault',
    name: 'SecretsManagementVaultSkill',
    displayName: 'HashiCorp Vault & Dynamic Secret Rotation',
    categoryId: 'technical',
    description: 'Implements zero-static-secrets architecture: HashiCorp Vault dynamic credentials, short-lived leases, auto-rotation, and Transit encryption.',
    tags: ['technical', 'vault', 'secrets', 'security', 'kms', 'encryption', 'credentials'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Управление Секретами и Динамическая Ротация (HashiCorp Vault)',
        'Secrets Management & Dynamic Secret Rotation Protocol',
        [
          '- **Отказ от статических паролей**: Заменить постоянные учетные данные на динамические короткоживущие токены (Lease TTL < 1 часа).',
          '- **Аутентификация через K8s ServiceAccount**: Сервисы получают токены Vault через проверку подлинности в Kubernetes (Vault Agent Sidecar).',
          '- **Шифрование как сервис (Transit Engine)**: Использовать Vault для шифрования конфиденциальных полей данных без доступа приложения к мастер-ключу.',
        ],
        [
          '- **Zero Static Credentials**: Replace persistent database passwords with dynamic credentials leased with automatic 1-hour TTL expiration.',
          '- **Kubernetes Workload Identity**: Authenticate pods to Vault using native Kubernetes ServiceAccount token projection.',
          '- **Transit Encryption-as-a-Service**: Offload field-level encryption/decryption workloads to Vault\'s centralized Transit engine.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'reverse-proxy-nginx-hardened': {
    id: 'reverse-proxy-nginx-hardened',
    name: 'ReverseProxyNginxHardenedSkill',
    displayName: 'Hardened Nginx / Envoy Reverse Proxy Config',
    categoryId: 'technical',
    description: 'Generates secure Nginx reverse proxy configurations: HTTP/2, TLS 1.3, Rate Limiting (limit_req), security headers (HSTS, CSP), and Brotli compression.',
    tags: ['technical', 'nginx', 'reverse-proxy', 'security-headers', 'hsts', 'rate-limit', 'envoy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Конфигурация Защищенного Прокси Nginx (Hardened Config)',
        'Hardened Production Nginx Reverse Proxy Specification',
        [
          '- **Заголовки безопасности**: Добавить `Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"`, `X-Content-Type-Options nosniff`, `X-Frame-Options DENY`.',
          '- **Защита от DDoS и перебора (Rate Limiting)**: Настроить `limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s burst=20 nodelay`.',
          '- **Оптимизация производительности**: Включить HTTP/2, `keepalive_timeout 65`, кэширование статики и сжатие gzip/brotli.',
        ],
        [
          '- **Security Headers Suite**: Inject `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`.',
          '- **Granular Rate Limiting**: Configure `limit_req_zone $binary_remote_addr zone=api_limit:10m rate=20r/s` with burst smoothing.',
          '- **Performance Optimization**: Enable HTTP/2, optimized keepalive connection pooling, static asset caching, and Brotli compression.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'event-sourcing-cqrs-spec': {
    id: 'event-sourcing-cqrs-spec',
    name: 'EventSourcingCqrsSpecSkill',
    displayName: 'Event Sourcing & CQRS Architectural Pattern',
    categoryId: 'technical',
    description: 'Architects Event Sourcing and Command Query Responsibility Segregation (CQRS): immutable event streams, aggregates, and read model projections.',
    tags: ['technical', 'event-sourcing', 'cqrs', 'architecture', 'event-driven', 'aggregates'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Архитектура Event Sourcing и CQRS',
        'Event Sourcing & CQRS Architectural Specification',
        [
          '- **Неизменяемый журнал событий (Event Store)**: Сохранять все изменения состояния как цепочку неизменяемых событий (`UserRegistered`, `OrderPlaced`).',
          '- **Разделение команд и запросов (CQRS)**: Слой записи (Commands) валидирует агрегаты; слой чтения (Queries) читает денормализованные проекции.',
          '- **Асинхронные проекции (Read Models)**: Обновлять таблицы чтения через обработчики событий с гарантией eventual consistency.',
        ],
        [
          '- **Immutable Event Ledger**: Model all state mutations strictly as an append-only sequence of historical domain events.',
          '- **Command/Query Segregation (CQRS)**: Isolate write-side domain aggregates from high-performance read-side denormalized projections.',
          '- **Asynchronous Projections**: Project event streams into tailored query stores upholding eventual consistency guarantees.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'chaos-engineering-experiment': {
    id: 'chaos-engineering-experiment',
    name: 'ChaosEngineeringExperimentSkill',
    displayName: 'Chaos Engineering Experiment (Chaos Mesh / Gremlin)',
    categoryId: 'technical',
    description: 'Designs Chaos Engineering experiments: Steady-State hypothesis, controlled blast radius, failure injection (packet loss, pod kill, latency), and abort conditions.',
    tags: ['technical', 'chaos-engineering', 'resilience', 'gremlin', 'chaos-mesh', 'fault-injection'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'План Эксперимента Chaos Engineering',
        'Chaos Engineering Resilience Experiment Specification',
        [
          '- **Гипотеза устойчивого состояния (Steady State)**: Определить нормальные метрики системы (например: P99 < 150ms при ошибках < 0.1%).',
          '- **Инъекция сбоя (Fault Injection)**: Имитация отказа: отключение 50% нод БД, внесение сетевой задержки 500ms или потеря 10% пакетов.',
          '- **Критерий экстренной остановки (Abort Trigger)**: Автоматически остановить эксперимент, если общий error rate превысит 2% более чем на 30 секунд.',
        ],
        [
          '- **Steady-State Hypothesis**: Define measurable telemetry baseline (e.g. 99.9% success rate, P99 latency < 150ms under normal load).',
          '- **Controlled Fault Injection**: Inject targeted failure scenarios (pod kills, CPU starvation, 500ms packet latency injection).',
          '- **Automated Emergency Abort Trigger**: Immediately abort chaos injection and revert state if customer-facing error rate exceeds 2%.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

'ebpf-observability-kernel-profiling': {
    id: 'ebpf-observability-kernel-profiling',
    name: 'EbpfObservabilityKernelProfilingSkill',
    displayName: 'eBPF Kernel Probing & System Performance Profiling',
    categoryId: 'technical',
    description: 'Profiles low-level system performance, socket latency, and kernel tracing without overhead using Linux eBPF programs.',
    tags: ['technical', 'ebpf', 'linux-kernel', 'performance', 'profiling', 'observability'],
    transform: createStandardSkillTransform({
sectionName: 'eBPF Kernel Observability Protocol',
      ruSectionName: 'Профилирование ядра и наблюдаемость через eBPF',
      instructions: [
        'Attach eBPF probes (kprobes, tracepoints, uprobes) directly to Linux kernel tracepoints with zero user-space context-switching overhead.',
        'Profile on-CPU and off-CPU latency bottlenecks, disk I/O wait times, and TCP socket lifecycle delays.',
        'Generate interactive flamegraphs visualizing system call callstacks and CPU instruction hotspots.',
        'Enforce in-kernel security filtering (XDP / TC filters) dropping malicious network packets at the NIC driver layer before stack allocation.',
      ],
      ruInstructions: [
        'Подключайте зонды eBPF (kprobes, tracepoints, uprobes) напрямую к точкам трассировки ядра Linux без накладных расходов переключения контекста.',
        'Профилируйте задержки on-CPU и off-CPU, ожидание дискового ввода-вывода (I/O wait) и жизненный цикл сокетов TCP.',
        'Стройте интерактивные флеймграфы (flamegraphs) для визуализации горячих точек выполнения системных вызовов ядра.',
        'Реализуйте высокопроизводительную фильтрацию пакетов (XDP/TC), отбрасывая вредоносный трафик на уровне драйвера сетевой карты.',
      ],
      semanticType: 'process_directive',
      tags: ['technical', 'ebpf', 'linux-kernel', 'performance', 'profiling', 'observability'],
    }),
  },

  'zero-trust-network-architecture-ztna': {
    id: 'zero-trust-network-architecture-ztna',
    name: 'ZeroTrustNetworkArchitectureZtnaSkill',
    displayName: 'Zero Trust Network Architecture & mTLS Mesh',
    categoryId: 'technical',
    description: 'Eliminates perimeter VPNs in favor of identity-aware proxies, device posture validation, and universal mutual TLS.',
    tags: ['technical', 'zero-trust', 'security', 'mtls', 'spiffe', 'networking'],
    transform: createStandardSkillTransform({
sectionName: 'Zero Trust Network Architecture (ZTNA)',
      ruSectionName: 'Архитектура нулевого доверия (Zero Trust & mTLS)',
      instructions: [
        'Adopt the core tenet: "Never trust, always verify" across all internal service communications and user access requests.',
        'Replace flat internal networks and VPNs with identity-aware application proxies enforcing ephemeral, just-in-time access tokens.',
        'Mandate mutual TLS (mTLS) with cryptographically verifiable SPIFFE/SPIRE workload identities for all service-to-service communication.',
        'Continuous device posture verification: validate OS patch level, disk encryption, and endpoint detection and response (EDR) agent health.',
      ],
      ruInstructions: [
        'Следуйте главному принципу Zero Trust: «Никогда не доверяй, всегда проверяй» для каждого межсервисного запроса и пользователя.',
        'Отказывайтесь от плоских периметровых сетей и VPN в пользу контекстных прокси доступа с выпуском временных токенов (JIT access).',
        'Внедряйте взаимный TLS (mTLS) с криптографической аутентификацией микросервисов на базе стандартов SPIFFE/SPIRE.',
        'Непрерывно валидируйте состояние клиентских устройств: версию ОС, полнодисковое шифрование и активность EDR-агентов.',
      ],
      semanticType: 'structural_directive',
      tags: ['technical', 'zero-trust', 'security', 'mtls', 'spiffe', 'networking'],
    }),
  },

  'kafka-partition-event-streaming-spec': {
    id: 'kafka-partition-event-streaming-spec',
    name: 'KafkaPartitionEventStreamingSpecSkill',
    displayName: 'Apache Kafka Partitioning & Exactly-Once Semantics',
    categoryId: 'technical',
    description: 'Designs high-throughput Kafka streaming topologies: partition keys, consumer group rebalances, and idempotent producers.',
    tags: ['technical', 'kafka', 'event-streaming', 'distributed-systems', 'messaging'],
    transform: createStandardSkillTransform({
sectionName: 'Apache Kafka Event Streaming Architecture',
      ruSectionName: 'Архитектура потоковой передачи событий Apache Kafka',
      instructions: [
        'Select partition keys carefully to ensure even message distribution across brokers while preserving strict ordering for related business entities.',
        'Configure idempotent producers (`enable.idempotence=true`, `acks=all`) and transactional commits to guarantee Exactly-Once Processing (EOS).',
        'Tune consumer group configurations: calibrate `max.poll.interval.ms` and `heartbeat.interval.ms` to eliminate spurious consumer rebalance storms.',
        'Design dead-letter queue (DLQ) retry topologies with exponential backoff for unprocessable or poison-pill event payloads.',
      ],
      ruInstructions: [
        'Проектируйте ключи партиционирования для равномерного распределения нагрузки по брокерам с сохранением строгого порядка событий по сущностям.',
        'Настраивайте идемпотентные продюсеры (`acks=all`, `enable.idempotence=true`) и транзакции для семантики ровно один раз (EOS).',
        'Оптимизируйте конфигурацию групп потребителей (`max.poll.interval.ms`, `heartbeat`), предотвращая штормы ребалансировки кластера.',
        'Создавайте топологии очередей недоставленных сообщений (DLQ) с экспоненциальной задержкой для ядовитых сообщений (poison pills).',
      ],
      semanticType: 'structural_directive',
      tags: ['technical', 'kafka', 'event-streaming', 'distributed-systems', 'messaging'],
    }),
  },

  'database-sharding-vitess-citus': {
    id: 'database-sharding-vitess-citus',
    name: 'DatabaseShardingVitessCitusSkill',
    displayName: 'Horizontal Database Sharding & Shard Key Topology',
    categoryId: 'technical',
    description: 'Architects horizontal database partitioning using Vitess, Citus, or custom application sharding with minimal cross-shard joins.',
    tags: ['technical', 'sharding', 'database', 'vitess', 'citus', 'scalability'],
    transform: createStandardSkillTransform({
sectionName: 'Database Sharding & Partitioning Architecture',
      ruSectionName: 'Горизонтальное шардирование баз данных и топология ключей',
      instructions: [
        'Select optimal shard keys (e.g., tenant_id, user_uuid) to guarantee high data colocation and prevent hot-spot shard skew.',
        'Strictly eliminate distributed multi-shard cross-joins; redesign schemas with reference tables replicated globally to all shard nodes.',
        'Implement resilient two-phase commit (2PC) or saga pattern orchestrators for multi-shard transactional mutations.',
        'Design online shard splitting and live data migration protocols maintaining read/write availability throughout resharding operations.',
      ],
      ruInstructions: [
        'Выбирайте оптимальный ключ шардирования (tenant_id, user_id) для колокации связанных данных и предотвращения перекосов нагрузки.',
        'Полностью исключайте распределенные межшардовые JOIN-запросы; дублируйте справочные таблицы глобально на каждый нод-шард.',
        'Используйте паттерн Saga или двухфазную фиксацию (2PC) для транзакций, затрагивающих несколько независимых шардов.',
        'Проектируйте процедуры онлайн-расщепления шардов и миграции данных без остановки обслуживания чтения и записи (zero-downtime resharding).',
      ],
      semanticType: 'structural_directive',
      tags: ['technical', 'sharding', 'database', 'vitess', 'citus', 'scalability'],
    }),
  },

  'grpc-protobuf-schema-evolution': {
    id: 'grpc-protobuf-schema-evolution',
    name: 'GrpcProtobufSchemaEvolutionSkill',
    displayName: 'gRPC Protocol Buffers Schema Evolution & Versioning',
    categoryId: 'technical',
    description: 'Enforces backwards- and forwards-compatible Protocol Buffers (.proto) schemas, tag reservations, and field deprecation rules.',
    tags: ['technical', 'grpc', 'protobuf', 'schema-evolution', 'api-design'],
    transform: createStandardSkillTransform({
sectionName: 'gRPC Protobuf Schema Evolution Protocol',
      ruSectionName: 'Эволюция схем Protocol Buffers и версионирование gRPC',
      instructions: [
        'Never change the numeric tag identifier or data type of an existing protobuf field.',
        'When removing fields, use `reserved` tag numbers and field names to permanently prevent accidental future reuse and serialization collisions.',
        'Maintain strict wire-format backwards and forwards compatibility: new clients must read old messages, and old clients must parse new messages safely.',
        'Package APIs with semantic versioned namespaces (e.g., `package acme.inventory.v1beta1;`) and declare explicit gRPC status code mappings.',
      ],
      ruInstructions: [
        'Никогда не изменяйте числовой номер тега и тип данных уже опубликованного поля в файле .proto.',
        'При удалении полей обязательно объявляйте номера тегов и имена устаревших полей как `reserved` для защиты от повторного использования.',
        'Гарантируйте обратную и прямую совместимость на бинарном уровне: старые клиенты должны корректно игнорировать новые поля, и наоборот.',
        'Оформляйте пространства имен с версиями (`package acme.service.v1;`) и строго следуйте стандарту кодов ошибок gRPC Status.',
      ],
      semanticType: 'compliance_directive',
      tags: ['technical', 'grpc', 'protobuf', 'schema-evolution', 'api-design'],
    }),
  },

  'redis-distributed-caching-patterns': {
    id: 'redis-distributed-caching-patterns',
    name: 'RedisDistributedCachingPatternsSkill',
    displayName: 'Redis Distributed Caching Architecture & Invalidation',
    categoryId: 'technical',
    description: 'Implements Cache-Aside, Write-Through, Write-Behind caching, cache stampede prevention (mutex/probabilistic), and eviction policies.',
    tags: ['technical', 'redis', 'caching', 'performance', 'distributed-systems', 'ttl'],
    transform: createStandardSkillTransform({
sectionName: 'Redis Distributed Caching Architecture',
      ruSectionName: 'Архитектура распределенного кэширования Redis и инвалидация',
      instructions: [
        'Select the appropriate caching design pattern: Cache-Aside (Lazy Loading), Write-Through, or Write-Behind (Write-Back) with durable queues.',
        'Prevent Cache Stampede (Thundering Herd) on hot keys using distributed mutex locks or probabilistic early expiration (XFetch algorithm).',
        'Add random jitter (±10%) to Time-To-Live (TTL) timestamps to prevent synchronized mass cache expiration spikes.',
        'Configure explicit Redis memory eviction policies (e.g., `volatile-lru` or `allkeys-lfu`) and monitor fragmentation ratios.',
      ],
      ruInstructions: [
        'Выбирайте паттерн кэширования: Cache-Aside (ленивая загрузка), Write-Through (сквозная запись) или Write-Behind с очередями.',
        'Защищайте систему от лавинообразных нагрузок (Cache Stampede / Thundering Herd) через распределенные мьютексы или вероятностный алгоритм XFetch.',
        'Добавляйте случайный джиттер (±10%) к значениям времени жизни кэша (TTL) для предотвращения одновременного сброса ключей.',
        'Настраивайте политики вытеснения ключей из памяти (`volatile-lru`, `allkeys-lfu`) и контролируйте коэффициент фрагментации памяти.',
      ],
      semanticType: 'structural_directive',
      tags: ['technical', 'redis', 'caching', 'performance', 'distributed-systems', 'ttl'],
    }),
  },

  'bgp-anycast-global-routing': {
    id: 'bgp-anycast-global-routing',
    name: 'BgpAnycastGlobalRoutingSkill',
    displayName: 'BGP Anycast Global Routing & Edge PoP Topology',
    categoryId: 'technical',
    description: 'Architects global edge routing via Border Gateway Protocol (BGP) Anycast: single IP broadcast across multiple edge data centers.',
    tags: ['technical', 'bgp', 'anycast', 'networking', 'ddos-mitigation', 'edge-computing'],
    transform: createStandardSkillTransform({
sectionName: 'BGP Anycast Global Routing Architecture',
      ruSectionName: 'Глобальная маршрутизация BGP Anycast и топология Edge PoP',
      instructions: [
        'Broadcast identical /24 IPv4 and /48 IPv6 address blocks via BGP from geographically distributed Points of Presence (PoPs).',
        'Leverage internet Autonomous System (AS) path shortest-distance routing to terminate user TCP/TLS connections at the closest geographic edge.',
        'Mitigate Volumetric DDoS attacks at the edge: dilute attack traffic naturally across dozens of global ingress scrubber centers.',
        'Handle Anycast route flapping and connection resets by deploying consistent hashing layers and connection-tracking state synchronization across nodes.',
      ],
      ruInstructions: [
        'Анонсируйте идентичные блоки IP-адресов (/24 для IPv4 и /48 для IPv6) по протоколу BGP из географически распределенных точек присутствия (PoP).',
        'Используйте маршрутизацию по кратчайшему пути AS-Path для терминации TCP/TLS-соединений на ближайшем к пользователю краевом узле.',
        'Естественным образом рассеивайте объемные DDoS-атаки по десяткам дата-центров по всему миру, предотвращая перегрузку ядра сети.',
        'Боритесь с разрывами TCP-соединений при флаппинге маршрутов (route flapping) с помощью консистентного хэширования и синхронизации состояний.',
      ],
      semanticType: 'structural_directive',
      tags: ['technical', 'bgp', 'anycast', 'networking', 'ddos-mitigation', 'edge-computing'],
    }),
  },

  'tls13-pki-certificate-lifecycle': {
    id: 'tls13-pki-certificate-lifecycle',
    name: 'Tls13PkiCertificateLifecycleSkill',
    displayName: 'TLS 1.3 Handshake, Cipher Suites & Automated PKI',
    categoryId: 'technical',
    description: 'Fortifies TLS 1.3 protocol configs, perfect forward secrecy (PFS), short-lived certificates, and automated ACME renewals.',
    tags: ['technical', 'tls', 'pki', 'security', 'cryptography', 'certificates', 'acme'],
    transform: createStandardSkillTransform({
sectionName: 'TLS 1.3 & PKI Certificate Lifecycle Architecture',
      ruSectionName: 'Криптографическая безопасность TLS 1.3 и автоматизация PKI',
      instructions: [
        'Enforce TLS 1.3 exclusively (or strict fallback to TLS 1.2 with secure cipher suites only); deprecate TLS 1.0, 1.1, and all CBC/RSA-key-exchange ciphers.',
        'Mandate Ephemeral Diffie-Hellman key exchange (ECDHE) with Curve25519/secp256r1 to guarantee Perfect Forward Secrecy (PFS).',
        'Implement automated ACME (Let\'s Encrypt / Vault PKI) certificate issuance with automated rotation cycles every 30-60 days.',
        'Configure OCSP Stapling, HTTP Strict Transport Security (HSTS with preload and subdomains), and Certificate Transparency (CT) log monitoring.',
      ],
      ruInstructions: [
        'Используйте исключительно TLS 1.3 (или TLS 1.2 только с безопасными шифрами); полностью отключите TLS 1.0, 1.1 и устаревшие алгоритмы RSA/CBC.',
        'Требуйте обмена ключами по алгоритму Диффи-Хеллмана на эллиптических кривых (ECDHE) для гарантии совершенной прямой секретности (PFS).',
        'Автоматизируйте выпуск и ротацию сертификатов через протокол ACME (Let\'s Encrypt, HashiCorp Vault) со сроком жизни сертификатов 30–60 дней.',
        'Включайте OCSP Stapling, заголовок HSTS с директивой preload и мониторинг журналов прозрачности сертификатов (Certificate Transparency).',
      ],
      semanticType: 'compliance_directive',
      tags: ['technical', 'tls', 'pki', 'security', 'cryptography', 'certificates', 'acme'],
    }),
  },

  'graphql-federation-apollo-subgraph': {
    id: 'graphql-federation-apollo-subgraph',
    name: 'GraphqlFederationApolloSubgraphSkill',
    displayName: 'Apollo GraphQL Federation & Subgraph Gateway',
    categoryId: 'technical',
    description: 'Designs federated GraphQL architectures: supergraph schemas, entity `@key` directives, and subgraph query execution plans.',
    tags: ['technical', 'graphql', 'federation', 'apollo', 'api-gateway', 'microservices'],
    transform: createStandardSkillTransform({
sectionName: 'Apollo GraphQL Federation Architecture',
      ruSectionName: 'Архитектура федеративного GraphQL (Apollo Supergraph & Subgraphs)',
      instructions: [
        'Decompose monolithic GraphQL schemas into autonomous, domain-owned Subgraph services united by an Apollo Router / Gateway.',
        'Define federated entities using `@key(fields: "id")` directives allowing disparate subgraphs to resolve entity fields independently.',
        'Use `@shareable`, `@inaccessible`, `@provides`, and `@requires` directives to optimize field resolution and prevent schema duplication.',
        'Audit generated Query Execution Plans to detect and eliminate N+1 cross-subgraph downstream HTTP request waterfalls.',
      ],
      ruInstructions: [
        'Разделяйте монолитную GraphQL-схему на автономные доменные подграфы (Subgraphs), объединяемые шлюзом Apollo Router в суперграф.',
        'Определяйте сущности федерации с директивами `@key(fields: "id")`, позволяя разным сервисам независимо обогащать единую модель данных.',
        'Используйте директивы `@shareable`, `@provides` и `@requires` для оптимизации вызовов и четкого разграничения зон ответственности.',
        'Анализируйте планы выполнения запросов (Query Plans) для полного исключения каскадных проблем N+1 между подграфами.',
      ],
      semanticType: 'structural_directive',
      tags: ['technical', 'graphql', 'federation', 'apollo', 'api-gateway', 'microservices'],
    }),
  },

  'cloud-finops-cost-allocation-tags': {
    id: 'cloud-finops-cost-allocation-tags',
    name: 'CloudFinopsCostAllocationTagsSkill',
    displayName: 'Cloud FinOps: Cost Allocation & Unit Economics',
    categoryId: 'technical',
    description: 'Establishes cloud financial engineering: mandatory cost allocation tagging, Spot instance orchestration, and cost per tenant/query.',
    tags: ['technical', 'finops', 'cloud-costs', 'aws', 'gcp', 'cost-optimization'],
    transform: createStandardSkillTransform({
sectionName: 'Cloud FinOps Cost Engineering Architecture',
      ruSectionName: 'Облачный FinOps: распределение затрат и экономика сервисов',
      instructions: [
        'Enforce mandatory infrastructure tags via CI/CD linting: Environment, CostCenter, Owner, Service, and TenantId.',
        'Architect stateless workload autoscaling utilizing Spot / Preemptible instances with automated graceful termination draining hooks.',
        'Establish unit economic metrics: calculate and track Cloud Cost Per Active User, Cost Per Transaction, and Cost Per Inference Token.',
        'Implement real-time budget anomaly detection alerts triggering when daily burn rates exceed historical moving averages by >20%.',
      ],
      ruInstructions: [
        'Внедряйте обязательную разметку ресурсов тегами через CI/CD: окружение (Environment), центр затрат (CostCenter), владелец, сервис и TenantId.',
        'Оркестрируйте масштабирование stateless-нагрузок на базе Spot / Preemptible инстансов с плавным выводом из эксплуатации (drain hooks).',
        'Считайте юнит-экономику инфраструктуры: себестоимость одного активного пользователя, стоимость одной транзакции и одного запроса.',
        'Настраивайте алерты аномалий затрат в реальном времени при превышении суточного темпа расходов на >20% от скользящей средней.',
      ],
      semanticType: 'process_directive',
      tags: ['technical', 'finops', 'cloud-costs', 'aws', 'gcp', 'cost-optimization'],
    }),
  },

  'immutable-infrastructure-nixos-packer': {
    id: 'immutable-infrastructure-nixos-packer',
    name: 'ImmutableInfrastructureNixosPackerSkill',
    displayName: 'Immutable Infrastructure & Declarative Golden AMIs',
    categoryId: 'technical',
    description: 'Replaces in-place server patching with strictly immutable machine images built declaratively via HashiCorp Packer or NixOS.',
    tags: ['technical', 'immutable-infrastructure', 'packer', 'devops', 'ami', 'automation'],
    transform: createStandardSkillTransform({
sectionName: 'Immutable Infrastructure Architecture',
      ruSectionName: 'Иммутабельная инфраструктура и декларативные образы (Packer / NixOS)',
      instructions: [
        'Prohibit manual SSH logins and mutable in-place patching on production compute instances; treat servers as disposable cattle, not pets.',
        'Build pre-baked, vulnerability-scanned Golden AMIs / VM images using automated HashiCorp Packer pipelines in CI/CD.',
        'Enforce declarative system configurations where OS dependencies, daemon configurations, and application binaries are pinned cryptographically.',
        'Deploy updates via complete machine image instance replacement (rolling Auto Scaling Group rollouts with zero downtime).',
      ],
      ruInstructions: [
        'Запрещайте ручные SSH-входы и установку пакетов на работающие серверы (серверы — это расходный материал, а не питомцы).',
        'Собирайте неизменяемые предварительно прогретые золотые образы (Golden AMIs) с проверкой уязвимостей через HashiCorp Packer в CI/CD.',
        'Используйте строго декларативные конфигурации ОС с криптографической фиксацией всех бинарников и системных демонов.',
        'Выполняйте релизы исключительно через полную замену виртуальных машин в Auto Scaling группах с плавным переключением трафика.',
      ],
      semanticType: 'process_directive',
      tags: ['technical', 'immutable-infrastructure', 'packer', 'devops', 'ami', 'automation'],
    }),
  },

  'kernel-cgroups-memory-oom-killer': {
    id: 'kernel-cgroups-memory-oom-killer',
    name: 'KernelCgroupsMemoryOomKillerSkill',
    displayName: 'Linux cgroups v2, CFS & Memory OOM Score Tuning',
    categoryId: 'technical',
    description: 'Tunes Linux cgroups v2 resource limits, CFS CPU scheduler shares, memory high watermarks, and OOM killer scores.',
    tags: ['technical', 'linux', 'cgroups', 'kernel', 'oom-killer', 'system-tuning'],
    transform: createStandardSkillTransform({
sectionName: 'Linux cgroups v2 & Kernel Resource Isolation',
      ruSectionName: 'Изоляция ресурсов Linux cgroups v2 и настройка OOM Killer',
      instructions: [
        'Enforce Linux unified cgroups v2 hierarchy for containers: configure `memory.max` (hard ceiling) and `memory.high` (proactive throttling limit).',
        'Tune Completely Fair Scheduler (CFS) bandwidth quotas (`cpu.max`) to prevent noisy-neighbor CPU starvation while avoiding artificial throttling.',
        'Adjust `/proc/$PID/oom_score_adj` appropriately: set negative scores (-1000) for mission-critical system daemons to immunize them against OOM termination.',
        'Configure memory pressure stall information (PSI) monitors to trigger autoscaling before kernel OOM kills occur.',
      ],
      ruInstructions: [
        'Используйте иерархию cgroups v2: задавайте `memory.max` (жесткий лимит) и `memory.high` (порог для упреждающего троттлинга памяти).',
        'Настраивайте квоты планировщика CFS (`cpu.max`), защищаясь от проблемы «шумных соседей» без необоснованного троттлинга CPU.',
        'Калибруйте приоритеты `/proc/$PID/oom_score_adj`: выставляйте защитный балл (-1000) для критически важных системных процессов.',
        'Подключайте метрики давления на ресурсы (Pressure Stall Information — PSI) для превентивного масштабирования до срабатывания OOM Killer.',
      ],
      semanticType: 'process_directive',
      tags: ['technical', 'linux', 'cgroups', 'kernel', 'oom-killer', 'system-tuning'],
    }),
  },

  'cilium-service-mesh-ebpf-network': {
    id: 'cilium-service-mesh-ebpf-network',
    name: 'CiliumServiceMeshEbpfNetworkSkill',
    displayName: 'Cilium eBPF CNI & Sidecarless Service Mesh',
    categoryId: 'technical',
    description: 'Deploys sidecarless Kubernetes networking, L7 traffic routing, and cryptographic wireguard encryption using Cilium and eBPF.',
    tags: ['technical', 'cilium', 'ebpf', 'kubernetes', 'service-mesh', 'networking'],
    transform: createStandardSkillTransform({
sectionName: 'Cilium eBPF Service Mesh Architecture',
      ruSectionName: 'Сетевой стек Cilium CNI и бессайдкарный Service Mesh на базе eBPF',
      instructions: [
        'Replace legacy iptables and kube-proxy with high-performance eBPF host routing for Pod-to-Pod and Service communication.',
        'Implement sidecarless Service Mesh: process Layer 7 HTTP/gRPC ingress routing directly in the Linux kernel without Envoy sidecar memory overhead.',
        'Enforce fine-grained L3/L4/L7 CiliumNetworkPolicies restricting communication to verified DNS domains and API paths.',
        'Enable transparent node-to-node network encryption using kernel WireGuard or IPsec tunnels with automated key management.',
      ],
      ruInstructions: [
        'Заменяйте устаревшие цепочки iptables и kube-proxy на прямую высокопроизводительную маршрутизацию пакетов через eBPF.',
        'Внедряйте бессайдкарный (sidecarless) Service Mesh: обработка трафика L7 (HTTP/gRPC) на уровне ядра без тяжелых сайдкаров Envoy.',
        'Формулируйте гранулярные политики сетевой безопасности CiliumNetworkPolicy с фильтрацией доменов DNS и путей REST API.',
        'Включайте прозрачное шифрование межсерверного трафика между нодами кластера через WireGuard или IPsec с авто-ротацией ключей.',
      ],
      semanticType: 'structural_directive',
      tags: ['technical', 'cilium', 'ebpf', 'kubernetes', 'service-mesh', 'networking'],
    }),
  },

  'zero-downtime-blue-green-deployment': {
    id: 'zero-downtime-blue-green-deployment',
    name: 'ZeroDowntimeBlueGreenDeploymentSkill',
    displayName: 'Zero-Downtime Blue/Green Deployment Topology',
    categoryId: 'technical',
    description: 'Executes zero-downtime releases via twin Blue/Green environments, active health gate probing, and atomic load balancer switchover.',
    tags: ['technical', 'blue-green', 'deployments', 'ci-cd', 'zero-downtime', 'devops'],
    transform: createStandardSkillTransform({
sectionName: 'Blue/Green Zero-Downtime Deployment Protocol',
      ruSectionName: 'Протокол Blue/Green развертывания с нулевым простоем',
      instructions: [
        'Maintain two identical production environments: Blue (active live traffic) and Green (idle staging target for new release).',
        'Deploy new artifact version to Green environment; execute automated synthetic smoke tests and deep synthetic database health checks.',
        'Perform atomic traffic switchover at the load balancer / ingress layer (0% to 100% in a single instant transaction).',
        'Maintain old Blue environment in standby readiness for 60 minutes, enabling instant 1-click rollback in case of latent error spikes.',
      ],
      ruInstructions: [
        'Поддерживайте два идентичных production-окружения: Blue (активный рабочий трафик) и Green (целевая среда для релиза).',
        'Разворачивайте новую версию в среде Green; проводите автоматические синтетические смоук-тесты и проверку доступности базы данных.',
        'Выполняйте атомарное переключение маршрутизации на балансировщике нагрузки (мгновенный переход трафика со среды Blue на Green).',
        'Оставляйте прежнюю среду Blue в горячем резерве на 60 минут для возможности моментального отката в один клик при росте ошибок.',
      ],
      semanticType: 'process_directive',
      tags: ['technical', 'blue-green', 'deployments', 'ci-cd', 'zero-downtime', 'devops'],
    }),
  },

  'distributed-consensus-raft-paxos': {
    id: 'distributed-consensus-raft-paxos',
    name: 'DistributedConsensusRaftPaxosSkill',
    displayName: 'Distributed Consensus: Raft Quorum & Leader Election',
    categoryId: 'technical',
    description: 'Analyzes quorum sizing, leader election heartbeats, term counters, log compaction, and split-brain resolution in Raft clusters.',
    tags: ['technical', 'raft', 'consensus', 'distributed-systems', 'quorum', 'fault-tolerance'],
    transform: createStandardSkillTransform({
sectionName: 'Raft Distributed Consensus Architecture',
      ruSectionName: 'Распределенный консенсус: кворум и выборы лидера по алгоритму Raft',
      instructions: [
        'Size consensus clusters strictly using odd numbers of nodes (2F + 1) to tolerate up to F node failures with majority quorum (F + 1).',
        'Model the three Raft states (Follower, Candidate, Leader) and randomized election timeout timers to prevent split-vote deadlocks.',
        'Verify log replication invariant: entries are committed only when safely acknowledged by a majority of nodes in the current term.',
        'Implement log compaction via state snapshotting to truncate disk logs and enable fast catch-up for lagging replica nodes.',
      ],
      ruInstructions: [
        'Формируйте кластеры консенсуса строго из нечетного числа узлов (2F + 1) для обеспечения кворума большинства при отказе до F нод.',
        'Моделируйте три состояния Raft (Follower, Candidate, Leader) с рандомизированными тайм-аутами выборов для исключения коллизий.',
        'Обеспечивайте инвариант репликации лога: транзакция считается зафиксированной (committed) только после подтверждения большинством узлов.',
        'Внедряйте компактификацию журнала через снапшоты состояния системы для экономии диска и быстрой синхронизации отставших нод.',
      ],
      semanticType: 'structural_directive',
      tags: ['technical', 'raft', 'consensus', 'distributed-systems', 'quorum', 'fault-tolerance'],
    }),
  },

  'postgresql-wal-logical-replication': {
    id: 'postgresql-wal-logical-replication',
    name: 'PostgresqlWalLogicalReplicationSkill',
    displayName: 'PostgreSQL WAL Archiving, CDC & Logical Replication',
    categoryId: 'technical',
    description: 'Implements PostgreSQL Write-Ahead Log (WAL) archiving, replication slots, and Change Data Capture (CDC) streaming into Kafka/Debezium.',
    tags: ['technical', 'postgresql', 'wal', 'replication', 'cdc', 'debezium', 'database'],
    transform: createStandardSkillTransform({
sectionName: 'PostgreSQL WAL & Logical Replication Architecture',
      ruSectionName: 'Репликация PostgreSQL WAL и Change Data Capture (CDC)',
      instructions: [
        'Configure PostgreSQL write-ahead log parameters: set `wal_level = logical` and allocate dedicated replication slots.',
        'Monitor replication slot disk lag: alert aggressively before unconsumed WAL segments exhaust primary database disk storage.',
        'Stream change data capture (CDC) row-level events into Kafka via Debezium connectors with minimal primary query overhead.',
        'Manage schema evolution across logical replication publications and subscriptions without breaking downstream consumer pipelines.',
      ],
      ruInstructions: [
        'Настраивайте параметры журнала опережающей записи (WAL): выставляйте `wal_level = logical` и выделяйте именованные слоты репликации.',
        'Контролируйте отставание слотов репликации (WAL lag): настройте жесткий мониторинг для защиты дискового пространства основного сервера.',
        'Организуйте потоковый захват изменений данных (CDC) строк в Kafka через коннекторы Debezium без влияния на скорость запросов.',
        'Синхронизируйте миграции схемы базы данных между публикациями (publications) и подписками (subscriptions) без остановки очередей.',
      ],
      semanticType: 'structural_directive',
      tags: ['technical', 'postgresql', 'wal', 'replication', 'cdc', 'debezium', 'database'],
    }),
  },
  "gitops-argo-cd-sync-wave-architecture": {
    id: "gitops-argo-cd-sync-wave-architecture",
    name: "GitopsArgoCdSyncWaveArchitectureSkill",
    displayName: "GitOps ArgoCD Sync Waves & Progressive Rollouts",
    categoryId: "technical",
    description: "Architects declarative Kubernetes deployments with ArgoCD sync waves, hooks, health checks, and automatic drift remediation.",
    tags: ["technical","devops","gitops","argocd","kubernetes"],
    transform: createStandardSkillTransform({
      sectionName: "GitOps & ArgoCD Sync Wave Architecture",
      ruSectionName: "Архитектура GitOps (ArgoCD) и фазовое развертывание",
      instructions: [
        "Order resource deployment with annotations `argocd.argoproj.io/sync-wave: \"-1\"`, `\"0\"`, `\"1\"`.",
        "Configure PreSync hooks for database schema migrations and PostSync hooks for smoke testing.",
        "Define custom Lua health checks for third-party Custom Resource Definitions (CRDs)."
],
      ruInstructions: [
        "Задайте порядок выкатки ресурсов через аннотации sync-wave (-1 для CRD, 0 для базовых сервисов, 1 для ингрессов).",
        "Настройте PreSync хуки для миграций БД и PostSync для смоук-тестов.",
        "Опишите кастомные проверки здоровья (Lua Health Checks) для CRD."
],
      semanticType: "process_directive",
      tags: ["technical","devops","gitops","argocd","kubernetes"],
    }),
  },

  "istio-service-mesh-mtls-canary-routing": {
    id: "istio-service-mesh-mtls-canary-routing",
    name: "IstioServiceMeshMtlsCanaryRoutingSkill",
    displayName: "Istio Service Mesh mTLS & Weighted Canary Routing",
    categoryId: "technical",
    description: "Configures Envoy sidecars, strict PeerAuthentication mTLS, VirtualServices, and DestinationRules for 90/10 traffic splitting.",
    tags: ["technical","service-mesh","istio","mtls","canary-deployment"],
    transform: createStandardSkillTransform({
      sectionName: "Istio Service Mesh & Canary Routing Protocol",
      ruSectionName: "Протокол сервисной сетки Istio (mTLS и канареечная маршрутизация)",
      instructions: [
        "Enforce strict zero-trust PeerAuthentication mTLS mode cluster-wide.",
        "Configure VirtualService with weighted routing (90% v1, 10% v2) and header-based overrides.",
        "Define DestinationRule with connection pool limits and outlier detection circuit breakers."
],
      ruInstructions: [
        "Включите строгий режим взаимной аутентификации (STRICT mTLS) во всем кластере.",
        "Настройте VirtualService с весовым разделением трафика (90% stable, 10% canary).",
        "Опишите DestinationRule с ограничением пула соединений и размыкателями цепи (Circuit Breaker)."
],
      semanticType: "process_directive",
      tags: ["technical","service-mesh","istio","mtls","canary-deployment"],
    }),
  },

  "ebpf-cilium-network-security-observability": {
    id: "ebpf-cilium-network-security-observability",
    name: "EbpfCiliumNetworkSecurityObservabilitySkill",
    displayName: "eBPF Kernel-Level Network Security & Observability (Cilium/Tetragon)",
    categoryId: "technical",
    description: "Leverages eBPF for lightning-fast L3-L7 network filtering, socket-level load balancing, and runtime syscall security monitoring.",
    tags: ["technical","ebpf","cilium","tetragon","network-security"],
    transform: createStandardSkillTransform({
      sectionName: "eBPF & Cilium Network Security Protocol",
      ruSectionName: "Безопасность и мониторинг на уровне ядра с eBPF (Cilium / Tetragon)",
      instructions: [
        "Deploy Cilium CNI replacing kube-proxy with eBPF socket-level load balancing.",
        "Author CiliumNetworkPolicy enforcing Layer 7 HTTP/gRPC API method boundaries.",
        "Configure Tetragon security sensors detecting unauthorized kernel privilege escalations."
],
      ruInstructions: [
        "Разверните Cilium CNI с заменой kube-proxy на eBPF для ускорения маршрутизации.",
        "Настройте политики CiliumNetworkPolicy с контролем вызовов на уровне L7 (HTTP/gRPC).",
        "Сконфигурируйте Tetragon для выявления несанкционированных системных вызовов в реальном времени."
],
      semanticType: "process_directive",
      tags: ["technical","ebpf","cilium","tetragon","network-security"],
    }),
  },

  "vault-dynamic-secret-ephemeral-credentials": {
    id: "vault-dynamic-secret-ephemeral-credentials",
    name: "VaultDynamicSecretEphemeralCredentialsSkill",
    displayName: "HashiCorp Vault Dynamic Secrets & Ephemeral Tokens",
    categoryId: "technical",
    description: "Eliminates static passwords by provisioning on-demand, time-limited dynamic database credentials and cloud IAM roles.",
    tags: ["technical","security","vault","dynamic-secrets","zero-trust"],
    transform: createStandardSkillTransform({
      sectionName: "Vault Dynamic Secrets Architecture",
      ruSectionName: "Архитектура динамических секретов и эфемерных доступов HashiCorp Vault",
      instructions: [
        "Configure Vault Database Secret Engine to generate short-lived (e.g. 1-hour TTL) PostgreSQL credentials.",
        "Inject secrets dynamically via Vault Agent Sidecar or Kubernetes CSI provider.",
        "Automate instant revocation upon lease expiration or detected security breach."
],
      ruInstructions: [
        "Настройте движок Database Secrets в Vault для генерации временных логинов БД с коротким TTL.",
        "Внедрите доставку секретов в поды через Vault Agent Sidecar или CSI Driver.",
        "Автоматизируйте отзыв токенов при истечении срока аренды или инциденте."
],
      semanticType: "process_directive",
      tags: ["technical","security","vault","dynamic-secrets","zero-trust"],
    }),
  },

  "chaos-engineering-litmus-fault-injection": {
    id: "chaos-engineering-litmus-fault-injection",
    name: "ChaosEngineeringLitmusFaultInjectionSkill",
    displayName: "Chaos Engineering & Fault Injection (LitmusChaos / Chaos Mesh)",
    categoryId: "technical",
    description: "Systematically injects pod kills, network packet loss, disk fill, and DNS corruption to validate system resilience and SLOs.",
    tags: ["technical","chaos-engineering","resilience","litmus","sre"],
    transform: createStandardSkillTransform({
      sectionName: "Chaos Engineering Experiment Protocol",
      ruSectionName: "Протокол экспериментов хаос-инженерии (LitmusChaos / Chaos Mesh)",
      instructions: [
        "Define Steady State Hypothesis using primary Golden Signals (latency, error rate).",
        "Execute automated fault injections (Pod delete, 200ms network latency, 50% CPU throttle).",
        "Verify that automated recovery restores the steady state within the defined RTO without human intervention."
],
      ruInstructions: [
        "Сформулируйте гипотезу устойчивого состояния (Steady State) по ключевым SLI/SLO.",
        "Запустите симуляцию сбоев (убийство подов, искусственные сетевые задержки, троттлинг CPU).",
        "Убедитесь, что система восстанавливается автоматически без участия человека в рамках RTO."
],
      semanticType: "process_directive",
      tags: ["technical","chaos-engineering","resilience","litmus","sre"],
    }),
  },

  "opentelemetry-distributed-trace-sampling": {
    id: "opentelemetry-distributed-trace-sampling",
    name: "OpentelemetryDistributedTraceSamplingSkill",
    displayName: "OpenTelemetry (OTel) Distributed Tracing & Tail Sampling",
    categoryId: "technical",
    description: "Instruments distributed microservices with W3C tracecontext propagation and configures tail-sampling collectors for 100% error captures.",
    tags: ["technical","observability","opentelemetry","tracing","tail-sampling"],
    transform: createStandardSkillTransform({
      sectionName: "OpenTelemetry Tracing & Sampling Architecture",
      ruSectionName: "Архитектура распределенной трассировки OpenTelemetry и Tail-Sampling",
      instructions: [
        "Enforce W3C Trace Context propagation across all HTTP and messaging middleware.",
        "Deploy OTel Collector with Tail Sampling processor (100% of errors/5xx, 100% of p99 latency outliers, 1% of normal 200 OKs).",
        "Correlate spans directly with structured application logs and Prometheus metrics."
],
      ruInstructions: [
        "Обеспечьте проброс заголовков W3C Trace Context через все микросервисы и очереди.",
        "Настройте OTel Collector с Tail Sampling (100% ошибок, 100% аномально долгих запросов, 1% нормы).",
        "Свяжите span_id с логами и метриками в графане."
],
      semanticType: "process_directive",
      tags: ["technical","observability","opentelemetry","tracing","tail-sampling"],
    }),
  },

  "kafka-schema-registry-avro-compatibility": {
    id: "kafka-schema-registry-avro-compatibility",
    name: "KafkaSchemaRegistryAvroCompatibilitySkill",
    displayName: "Confluent Kafka Schema Registry & Avro Compatibility Matrix",
    categoryId: "technical",
    description: "Enforces strict BACKWARD or FULL compatibility modes on Apache Avro event schemas in high-throughput Kafka ecosystems.",
    tags: ["technical","kafka","avro","schema-registry","event-driven"],
    transform: createStandardSkillTransform({
      sectionName: "Kafka Schema Evolution Protocol",
      ruSectionName: "Протокол эволюции схем Kafka (Avro / Schema Registry)",
      instructions: [
        "Set schema subject compatibility to `BACKWARD_TRANSITIVE` or `FULL`.",
        "Enforce rules: new fields MUST have default values; existing fields MUST NOT be renamed without aliasing.",
        "Automate schema validation in CI/CD before deploying application producer updates."
],
      ruInstructions: [
        "Установите режим совместимости схем BACKWARD_TRANSITIVE или FULL.",
        "Соблюдайте правила: новые поля обязаны иметь default, старые поля нельзя удалять без поддержки.",
        "Внедрите проверку схем в пайплайны CI/CD до деплоя продюсеров."
],
      semanticType: "process_directive",
      tags: ["technical","kafka","avro","schema-registry","event-driven"],
    }),
  },

  "terraform-module-refactoring-and-state-mv": {
    id: "terraform-module-refactoring-and-state-mv",
    name: "TerraformModuleRefactoringAndStateMvSkill",
    displayName: "Terraform State Surgery (`terraform state mv` & `moved` blocks)",
    categoryId: "technical",
    description: "Refactors monolithic Terraform configurations into composable modules using HCL `moved` blocks without destroying cloud infrastructure.",
    tags: ["technical","terraform","iac","state-management","refactoring"],
    transform: createStandardSkillTransform({
      sectionName: "Terraform State Refactoring Protocol",
      ruSectionName: "Рефакторинг Terraform и безопасная миграция состояния (moved blocks)",
      instructions: [
        "Use native declarative `moved { from = ... to = ... }` blocks rather than manual state manipulation.",
        "Verify plan output shows `0 to add, X to change (or 0), 0 to destroy`.",
        "Lock remote state backends (S3/DynamoDB or GCS) with optimistic locking."
],
      ruInstructions: [
        "Используйте декларативные блоки `moved { from = ... to = ... }` вместо ручного редактирования стейта.",
        "Убедитесь по выводу `terraform plan`, что запланировано 0 удалений ресурсов.",
        "Обеспечьте блокировку стейта (State Locking) для предотвращения параллельных правок."
],
      semanticType: "process_directive",
      tags: ["technical","terraform","iac","state-management","refactoring"],
    }),
  },

  "redis-cluster-failover-split-brain-guard": {
    id: "redis-cluster-failover-split-brain-guard",
    name: "RedisClusterFailoverSplitBrainGuardSkill",
    displayName: "Redis Cluster Sharding & Split-Brain Prevention",
    categoryId: "technical",
    description: "Architects 16,384 hash slot distributed Redis clusters with Raft/Sentinel quorum rules preventing split-brain data divergence.",
    tags: ["technical","redis","caching","sharding","high-availability"],
    transform: createStandardSkillTransform({
      sectionName: "Redis High-Availability Architecture",
      ruSectionName: "Архитектура Redis Cluster и защита от разделения сети (Split-Brain)",
      instructions: [
        "Distribute master nodes across minimum 3 independent availability zones.",
        "Configure `min-replicas-to-write 1` and `min-replicas-max-lag 10` to stop writes during master network partitions.",
        "Use Redis Hash Tags `{user:123}:profile` to guarantee colocation of multi-key transactions."
],
      ruInstructions: [
        "Разнесите master-ноды минимум по 3 независимым зонам доступности (AZ).",
        "Задайте параметры min-replicas-to-write для блокировки записи в изолированный мастер.",
        "Используйте Hash Tags `{id}:key` для гарантированного попадания связанных ключей в один слот."
],
      semanticType: 'protocol',
      tags: ["technical","redis","caching","sharding","high-availability"],
    }),
  },

  "zero-downtime-blue-green-loadbalancer-cutover": {
    id: "zero-downtime-blue-green-loadbalancer-cutover",
    name: "ZeroDowntimeBlueGreenLoadbalancerCutoverSkill",
    displayName: "Blue-Green Deployment Load Balancer Cutover & Instant Rollback",
    categoryId: "technical",
    description: "Orchestrates zero-downtime Blue-Green production cutovers with pre-warming, connection draining, and instant DNS/ALB rollback.",
    tags: ["technical","blue-green","zero-downtime","load-balancer","deployments"],
    transform: createStandardSkillTransform({
      sectionName: "Blue-Green Cutover Protocol",
      ruSectionName: "Протокол Blue-Green переключения трафика с мгновенным откатом",
      instructions: [
        "Provision parallel Green environment identical to live Blue environment.",
        "Run end-to-end synthetic health checks against Green before shifting traffic.",
        "Shift traffic instantly at the ALB level while maintaining Blue warm for a 30-minute rollback window."
],
      ruInstructions: [
        "Разверните параллельный контур Green, идентичный текущему Blue.",
        "Выполните синтетические тесты на контуре Green до переключения трафика.",
        "Переключите балансировщик (ALB) на Green, оставив контур Blue прогретым на 30 минут для отката."
],
      semanticType: "process_directive",
      tags: ["technical","blue-green","zero-downtime","load-balancer","deployments"],
    }),
  },

  "grpc-protobuf-backward-compatibility-guard": {
    id: "grpc-protobuf-backward-compatibility-guard",
    name: "GrpcProtobufBackwardCompatibilityGuardSkill",
    displayName: "gRPC & Protocol Buffers Backward Compatibility Rules",
    categoryId: "technical",
    description: "Enforces field tag preservation, `reserved` tag guards, and non-breaking protobuf schema evolutions with Buf CLI linting.",
    tags: ["technical","grpc","protobuf","api-design","buf-cli"],
    transform: createStandardSkillTransform({
      sectionName: "Protobuf Backward Compatibility Protocol",
      ruSectionName: "Правила обратной совместимости gRPC и Protocol Buffers (Buf Lint)",
      instructions: [
        "Never alter numeric field tags of existing message fields.",
        "Mark deleted fields explicitly as `reserved 3, 7, 12;` and `reserved \"old_field_name\";`.",
        "Validate changes in CI using `buf breaking --against .git#branch=main`."
],
      ruInstructions: [
        "Никогда не изменяйте числовые номера (field tags) существующих полей protobuf.",
        "Помечайте удаленные поля как `reserved` по номерам и именам во избежание повторного использования.",
        "Проверяйте совместимость в CI с помощью утилиты `buf breaking`."
],
      semanticType: "process_directive",
      tags: ["technical","grpc","protobuf","api-design","buf-cli"],
    }),
  },

  "waf-modsecurity-owasp-crs-tuning": {
    id: "waf-modsecurity-owasp-crs-tuning",
    name: "WafModsecurityOwaspCrsTuningSkill",
    displayName: "WAF Rule Tuning & OWASP Core Rule Set (CRS) False Positive Suppression",
    categoryId: "technical",
    description: "Configures Web Application Firewalls with OWASP CRS anomaly scoring and surgical rule exclusions for legitimate JSON payloads.",
    tags: ["technical","security","waf","owasp-crs","modsecurity"],
    transform: createStandardSkillTransform({
      sectionName: "WAF Tuning & Anomaly Scoring Protocol",
      ruSectionName: "Настройка WAF и подавление ложных срабатываний (OWASP CRS)",
      instructions: [
        "Deploy WAF in Anomaly Scoring detection-only mode during initial staging baseline.",
        "Audit blocked requests and craft surgical exclusion rules targeted by URI and Parameter name.",
        "Switch to blocking mode once paranoia levels (PL 1-2) operate with zero false-positive drop rate."
],
      ruInstructions: [
        "Запустите WAF в режиме детекции (Anomaly Scoring) для сбора базового профиля трафика.",
        "Изучите заблокированные легитимные запросы и создайте точечные исключения (exclusions).",
        "Включите блокирующий режим при подтверждении отсутствия ложных срабатываний."
],
      semanticType: "process_directive",
      tags: ["technical","security","waf","owasp-crs","modsecurity"],
    }),
  },

  "elasticsearch-ilm-index-lifecycle-hot-warm-cold": {
    id: "elasticsearch-ilm-index-lifecycle-hot-warm-cold",
    name: "ElasticsearchIlmIndexLifecycleHotWarmColdSkill",
    displayName: "Elasticsearch Hot-Warm-Cold Tiering & ILM Policies",
    categoryId: "technical",
    description: "Configures Index Lifecycle Management (ILM) rolling indices from SSD Hot ingest nodes to Warm HDD nodes and searchable Cold snapshots.",
    tags: ["technical","elasticsearch","opensearch","ilm","storage-tiering"],
    transform: createStandardSkillTransform({
      sectionName: "Elasticsearch ILM Tiering Architecture",
      ruSectionName: "Архитектура жизненного цикла индексов Elasticsearch (Hot / Warm / Cold)",
      instructions: [
        "Hot Phase: Max primary shards on NVMe SSD nodes with rollover at 50GB index size or 30 days.",
        "Warm Phase: Shrink shards, force-merge to 1 segment, relocate to high-density SATA storage.",
        "Cold/Frozen Phase: Convert to searchable snapshots mounted directly from S3 object storage."
],
      ruInstructions: [
        "Hot: Запись на быстрые NVMe SSD с роллоslashвером при 50 Гб или 30 днях.",
        "Warm: Сжатие шардов (Shrink), Force-Merge в 1 сегмент и перенос на емкие диски.",
        "Cold: Конвертация в Searchable Snapshots в объектном хранилище S3."
],
      semanticType: "process_directive",
      tags: ["technical","elasticsearch","opensearch","ilm","storage-tiering"],
    }),
  },

  "rate-limiting-distributed-token-bucket-redis-lua": {
    id: "rate-limiting-distributed-token-bucket-redis-lua",
    name: "RateLimitingDistributedTokenBucketRedisLuaSkill",
    displayName: "Distributed Token Bucket & Leaky Bucket (Redis + Lua)",
    categoryId: "technical",
    description: "Implements atomic token bucket rate limiting scripts in Redis Lua preventing race conditions across scaled application clusters.",
    tags: ["technical","rate-limiting","redis","lua","api-gateway"],
    transform: createStandardSkillTransform({
      sectionName: "Distributed Rate Limiting Specification",
      ruSectionName: "Распределенный Rate Limiting (Token Bucket на Redis + Lua)",
      instructions: [
        "Execute atomic calculation inside Redis Lua: replenish tokens based on elapsed millisecond timestamp.",
        "Return standard HTTP headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `Retry-After`.",
        "Provide graduated tiering by API key subscription tier with fallback burst allowance."
],
      ruInstructions: [
        "Выполняйте расчет пополнения токенов атомарно в скрипте Redis Lua по меткам времени.",
        "Возвращайте заголовки `X-RateLimit-Limit`, `X-RateLimit-Remaining` и `Retry-After`.",
        "Задайте лимиты и burst-допуски в зависимости от тарифного плана API-ключа."
],
      semanticType: "process_directive",
      tags: ["technical","rate-limiting","redis","lua","api-gateway"],
    }),
  },

  "oauth2-pkce-handshake-infrastructure": {
    id: "oauth2-pkce-handshake-infrastructure",
    name: "Oauth2PkceAuthorizationCodeFlowSkill",
    displayName: "OAuth 2.1 & PKCE (Proof Key for Code Exchange) Flow",
    categoryId: "technical",
    description: "Implements secure Authorization Code flow with SHA-256 code challenge/verifier (PKCE) for Single Page Apps and mobile clients.",
    tags: ["technical","security","oauth2","pkce","auth"],
    transform: createStandardSkillTransform({
      sectionName: "OAuth 2.1 & PKCE Implementation Protocol",
      ruSectionName: "Протокол авторизации OAuth 2.1 с защитой PKCE (SPA и Mobile)",
      instructions: [
        "Generate cryptographically secure random `code_verifier` and compute `code_challenge = BASE64URL(SHA256(code_verifier))`.",
        "Send authorization request with `code_challenge_method=S256`.",
        "Exchange returned authorization code with plaintext `code_verifier` over TLS."
],
      ruInstructions: [
        "Сгенерируйте криптографический `code_verifier` и вычислите хэш `code_challenge` (SHA256).",
        "Отправьте запрос авторизации с параметром `code_challenge_method=S256`.",
        "Обменяйте код авторизации на токены, передав исходный verifier на бэкенд."
],
      semanticType: "process_directive",
      tags: ["technical","security","oauth2","pkce","auth"],
    }),
  },

  "postgresql-vacuum-bloat-and-pg-repack": {
    id: "postgresql-vacuum-bloat-and-pg-repack",
    name: "PostgresqlVacuumBloatAndPgRepackSkill",
    displayName: "PostgreSQL Table Bloat, Autovacuum Tuning & pg_repack",
    categoryId: "technical",
    description: "Tunes autovacuum parameters (scale_factor, cost_limit) and conducts zero-lock live table packing with `pg_repack`.",
    tags: ["technical","postgresql","database","autovacuum","pg-repack","performance"],
    transform: createStandardSkillTransform({
      sectionName: "PostgreSQL Table Bloat & Maintenance Protocol",
      ruSectionName: "Борьба с раздуванием таблиц PostgreSQL (Autovacuum и pg_repack)",
      instructions: [
        "Identify bloated dead tuples using `pgstattuple` or system catalog metrics.",
        "Aggressively tune `autovacuum_vacuum_scale_factor = 0.05` and `autovacuum_vacuum_cost_limit = 2000` for high-write tables.",
        "Reclaim disk space online without exclusive table locks using `pg_repack`."
],
      ruInstructions: [
        "Выявите раздутые таблицы и мертвые кортежи (dead tuples) через системные представления.",
        "Настройте агрессивный autovacuum для таблиц с частыми апдейтами (scale_factor 0.05).",
        "Выполните реорганизацию таблиц без эксклюзивной блокировки с помощью `pg_repack`."
],
      semanticType: "process_directive",
      tags: ["technical","postgresql","database","autovacuum","pg-repack","performance"],
    }),
  },

  "sre-error-budget-burn-rate-alerting": {
    id: "sre-error-budget-burn-rate-alerting",
    name: "SreErrorBudgetBurnRateAlertingSkill",
    displayName: "Multiwindow Multi-Burn-Rate SRE Alerting (Google SRE Book)",
    categoryId: "technical",
    description: "Implements multiwindow multi-burn-rate alerts (e.g. 14.4x burn over 1h/5m, 6x burn over 6h/30m) to eliminate alert fatigue while protecting SLOs.",
    tags: ["technical","sre","error-budget","burn-rate","prometheus-alerting"],
    transform: createStandardSkillTransform({
      sectionName: "SRE Error Budget Burn Rate Alerting",
      ruSectionName: "Мультиоконный алерт скорости сжигания Error Budget (Google SRE)",
      instructions: [
        "Define clear SLI and monthly target SLO (e.g. 99.9% success rate).",
        "Configure Page Alert: 14.4x burn rate consumed in 1 hour (window: 1h long, 5m short).",
        "Configure Ticket Alert: 6x burn rate consumed in 6 hours (window: 6h long, 30m short)."
],
      ruInstructions: [
        "Задайте SLI и месячный целевой SLO (например, 99.9% успешных запросов).",
        "Настройте дежурный пейджер-алерт: 14.4x сжигание бюджета за 1 час (окна: 1ч и 5 мин).",
        "Настройте тикет-алерт для медленного сжигания: 6x за 6 часов (окна: 6ч и 30 мин)."
],
      semanticType: "process_directive",
      tags: ["technical","sre","error-budget","burn-rate","prometheus-alerting"],
    }),
  },

  "cdn-cache-invalidation-surrogate-keys": {
    id: "cdn-cache-invalidation-surrogate-keys",
    name: "CdnCacheInvalidationSurrogateKeysSkill",
    displayName: "Edge CDN Caching & Surrogate-Key / Cache-Tag Purging",
    categoryId: "technical",
    description: "Emits `Surrogate-Key` / `Cache-Tags` headers to enable instant, pinpoint cache purging of millions of related edge URLs upon database mutation.",
    tags: ["technical","cdn","caching","fastly","cloudflare","surrogate-keys"],
    transform: createStandardSkillTransform({
      sectionName: "Surrogate-Key CDN Caching Protocol",
      ruSectionName: "Кэширование на CDN и точечный сброс по Surrogate-Keys / Cache-Tags",
      instructions: [
        "Attach granular entity cache tags to HTTP responses (e.g. `Cache-Tag: user-42, product-901, catalog-fall`).",
        "Set aggressive `s-maxage=31536000, stale-while-revalidate=86400` at the edge.",
        "Emit instant API purge calls targeted strictly by mutated Surrogate Key on entity update."
],
      ruInstructions: [
        "Добавляйте теги сущностей в HTTP-ответы (`Cache-Tag: item-12, collection-5`).",
        "Устанавливайте длительный кэш на CDN с директивой `stale-while-revalidate`.",
        "Отправляйте API-запрос на сброс кэша строго по измененному тегу при апдейте в БД."
],
      semanticType: "process_directive",
      tags: ["technical","cdn","caching","fastly","cloudflare","surrogate-keys"],
    }),
  },

  "graphql-schema-stitching-federation-apollo": {
    id: "graphql-schema-stitching-federation-apollo",
    name: "GraphqlSchemaStitchingFederationApolloSkill",
    displayName: "Apollo Federation Subgraph Schema Composition",
    categoryId: "technical",
    description: "Architects enterprise GraphQL federated supergraphs using `@key`, `@shareable`, and `@provides` directives across independent microservices.",
    tags: ["technical","graphql","apollo-federation","subgraphs","api-gateway"],
    transform: createStandardSkillTransform({
      sectionName: "Apollo Federation Subgraph Architecture",
      ruSectionName: "Федеративная схема GraphQL (Apollo Federation и субграфы)",
      instructions: [
        "Define federated entity primary keys with `@key(fields: \"id\")`.",
        "Extend foreign types across subgraphs using `@external` and `@requires` directives.",
        "Compose supergraph schema in CI with Rover CLI, preventing breaking gateway compositions."
],
      ruInstructions: [
        "Опишите первичные ключи сущностей через директиву `@key(fields: \"id\")`.",
        "Расширяйте типы из других субграфов с помощью `@external` и `@requires`.",
        "Проверяйте сборку суперграфа в CI через утилиту Rover до деплоя в прод."
],
      semanticType: 'protocol',
      tags: ["technical","graphql","apollo-federation","subgraphs","api-gateway"],
    }),
  },

  "continuous-profiling-pyroscope-ebpf": {
    id: "continuous-profiling-pyroscope-ebpf",
    name: "ContinuousProfilingPyroscopeEbpfSkill",
    displayName: "Continuous CPU/Memory Profiling (Pyroscope & Parca)",
    categoryId: "technical",
    description: "Deploys continuous low-overhead eBPF profilers generating flamegraphs of production CPU cycles, lock contention, and memory heap allocations.",
    tags: ["technical","profiling","flamegraph","pyroscope","performance-engineering"],
    transform: createStandardSkillTransform({
      sectionName: "Continuous Profiling & Flamegraph Protocol",
      ruSectionName: "Непрерывное профилирование CPU и памяти в проде (Pyroscope / Parca)",
      instructions: [
        "Deploy zero-instrumentation eBPF profiling agents across Kubernetes worker nodes (<1% CPU overhead).",
        "Aggregate time-series flamegraphs by Service, Namespace, and Git Commit SHA.",
        "Analyze diff flamegraphs comparing release builds to detect memory allocation leaks before rollout."
],
      ruInstructions: [
        "Разверните eBPF-агенты профилирования на нодах кластера (накладные расходы <1%).",
        "Агрегируйте флеймграфы (Flamegraphs) по сервисам, неймспейсам и хэшам коммитов.",
        "Сравнивайте флеймграфы между релизами для выявления утечек памяти до выхода в прод."
],
      semanticType: "process_directive",
      tags: ["technical","profiling","flamegraph","pyroscope","performance-engineering"],
    }),
  },
  "technical-kubernetes-cluster-helm-chart-deployment": {
    id: "technical-kubernetes-cluster-helm-chart-deployment",
    name: "KubernetesClusterHelmChartDeploymentSkill",
    displayName: "Kubernetes Cluster Helm Chart Deployment",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Kubernetes Cluster Helm Chart Deployment.",
    tags: ["technical","kubernetes","cluster","helm"],
    transform: createStandardSkillTransform({
      sectionName: "Kubernetes Helm Deployment Protocol",
      ruSectionName: "Стандарты и практические требования: Kubernetes Cluster Helm Chart Deployment",
      instructions: [
        "Apply core domain tenets and industry best practices for Kubernetes Cluster Helm Chart Deployment.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Kubernetes Cluster Helm Chart Deployment.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","kubernetes","cluster","helm"],
    }),
  },

  "technical-terraform-infrastructure-as-code-iac-state-lock": {
    id: "technical-terraform-infrastructure-as-code-iac-state-lock",
    name: "TerraformInfrastructureasCodeIaCStateLockSkill",
    displayName: "Terraform Infrastructure as Code (IaC) State Lock",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Terraform Infrastructure as Code (IaC) State Lock.",
    tags: ["technical","terraform","infrastructure","as"],
    transform: createStandardSkillTransform({
      sectionName: "Terraform IaC State Standards",
      ruSectionName: "Стандарты и практические требования: Terraform Infrastructure as Code (IaC) State Lock",
      instructions: [
        "Apply core domain tenets and industry best practices for Terraform Infrastructure as Code (IaC) State Lock.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Terraform Infrastructure as Code (IaC) State Lock.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","terraform","infrastructure","as"],
    }),
  },

  "technical-prometheus-grafana-alertmanager-sli-slo-alerts": {
    id: "technical-prometheus-grafana-alertmanager-sli-slo-alerts",
    name: "PrometheusGrafanaAlertmanagerSLISLOAlertsSkill",
    displayName: "Prometheus & Grafana Alertmanager SLI/SLO Alerts",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Prometheus & Grafana Alertmanager SLI/SLO Alerts.",
    tags: ["technical","prometheus","grafana","alertmanager"],
    transform: createStandardSkillTransform({
      sectionName: "Prometheus SLI/SLO Alerting Standards",
      ruSectionName: "Стандарты и практические требования: Prometheus & Grafana Alertmanager SLI/SLO Alerts",
      instructions: [
        "Apply core domain tenets and industry best practices for Prometheus & Grafana Alertmanager SLI/SLO Alerts.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Prometheus & Grafana Alertmanager SLI/SLO Alerts.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","prometheus","grafana","alertmanager"],
    }),
  },

  "technical-nginx-reverse-proxy-rate-limiting-ssl-termination": {
    id: "technical-nginx-reverse-proxy-rate-limiting-ssl-termination",
    name: "NginxReverseProxyRateLimitingSSLTerminationSkill",
    displayName: "Nginx Reverse Proxy Rate-Limiting & SSL Termination",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Nginx Reverse Proxy Rate-Limiting & SSL Termination.",
    tags: ["technical","nginx","reverse","proxy"],
    transform: createStandardSkillTransform({
      sectionName: "Nginx Reverse Proxy Security Standards",
      ruSectionName: "Стандарты и практические требования: Nginx Reverse Proxy Rate-Limiting & SSL Termination",
      instructions: [
        "Apply core domain tenets and industry best practices for Nginx Reverse Proxy Rate-Limiting & SSL Termination.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Nginx Reverse Proxy Rate-Limiting & SSL Termination.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","nginx","reverse","proxy"],
    }),
  },

  "technical-docker-multi-stage-build-minimal-container-image": {
    id: "technical-docker-multi-stage-build-minimal-container-image",
    name: "DockerMultiStageBuildMinimalContainerImageSkill",
    displayName: "Docker Multi-Stage Build Minimal Container Image",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Docker Multi-Stage Build Minimal Container Image.",
    tags: ["technical","docker","multi","stage"],
    transform: createStandardSkillTransform({
      sectionName: "Docker Multi-Stage Build Standards",
      ruSectionName: "Стандарты и практические требования: Docker Multi-Stage Build Minimal Container Image",
      instructions: [
        "Apply core domain tenets and industry best practices for Docker Multi-Stage Build Minimal Container Image.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Docker Multi-Stage Build Minimal Container Image.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","docker","multi","stage"],
    }),
  },

  "technical-bgp-autonomous-system-routing-anycast-dns": {
    id: "technical-bgp-autonomous-system-routing-anycast-dns",
    name: "BGPAutonomousSystemRoutingAnycastDNSSkill",
    displayName: "BGP Autonomous System Routing & Anycast DNS",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for BGP Autonomous System Routing & Anycast DNS.",
    tags: ["technical","bgp","autonomous","system"],
    transform: createStandardSkillTransform({
      sectionName: "BGP Anycast Routing Architecture",
      ruSectionName: "Стандарты и практические требования: BGP Autonomous System Routing & Anycast DNS",
      instructions: [
        "Apply core domain tenets and industry best practices for BGP Autonomous System Routing & Anycast DNS.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для BGP Autonomous System Routing & Anycast DNS.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","bgp","autonomous","system"],
    }),
  },

  "technical-linux-kernel-sysctl-epoll-network-performance": {
    id: "technical-linux-kernel-sysctl-epoll-network-performance",
    name: "LinuxKernelSysctlEpollNetworkPerformanceSkill",
    displayName: "Linux Kernel Sysctl Epoll Network Performance",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Linux Kernel Sysctl Epoll Network Performance.",
    tags: ["technical","linux","kernel","sysctl"],
    transform: createStandardSkillTransform({
      sectionName: "Linux Sysctl Tuning Standards",
      ruSectionName: "Стандарты и практические требования: Linux Kernel Sysctl Epoll Network Performance",
      instructions: [
        "Apply core domain tenets and industry best practices for Linux Kernel Sysctl Epoll Network Performance.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Linux Kernel Sysctl Epoll Network Performance.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","linux","kernel","sysctl"],
    }),
  },

  "technical-zero-trust-wireguard-mesh-vpn-infrastructure": {
    id: "technical-zero-trust-wireguard-mesh-vpn-infrastructure",
    name: "ZeroTrustWireGuardMeshVPNInfrastructureSkill",
    displayName: "Zero Trust WireGuard Mesh VPN Infrastructure",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Zero Trust WireGuard Mesh VPN Infrastructure.",
    tags: ["technical","zero","trust","wireguard"],
    transform: createStandardSkillTransform({
      sectionName: "WireGuard Zero-Trust Mesh Standards",
      ruSectionName: "Стандарты и практические требования: Zero Trust WireGuard Mesh VPN Infrastructure",
      instructions: [
        "Apply core domain tenets and industry best practices for Zero Trust WireGuard Mesh VPN Infrastructure.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Zero Trust WireGuard Mesh VPN Infrastructure.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","zero","trust","wireguard"],
    }),
  },

  "technical-ci-cd-github-actions-matrix-pipeline-cache": {
    id: "technical-ci-cd-github-actions-matrix-pipeline-cache",
    name: "CICDGitHubActionsMatrixPipelineCacheSkill",
    displayName: "CI/CD GitHub Actions Matrix Pipeline Cache",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for CI/CD GitHub Actions Matrix Pipeline Cache.",
    tags: ["technical","ci","cd","github"],
    transform: createStandardSkillTransform({
      sectionName: "GitHub Actions Pipeline Protocol",
      ruSectionName: "Стандарты и практические требования: CI/CD GitHub Actions Matrix Pipeline Cache",
      instructions: [
        "Apply core domain tenets and industry best practices for CI/CD GitHub Actions Matrix Pipeline Cache.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для CI/CD GitHub Actions Matrix Pipeline Cache.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","ci","cd","github"],
    }),
  },

  "technical-aws-iam-principle-of-least-privilege-scp-governance": {
    id: "technical-aws-iam-principle-of-least-privilege-scp-governance",
    name: "AWSIAMPrincipleofLeastPrivilegeSCPGovernanceSkill",
    displayName: "AWS IAM Principle of Least Privilege SCP Governance",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for AWS IAM Principle of Least Privilege SCP Governance.",
    tags: ["technical","aws","iam","principle"],
    transform: createStandardSkillTransform({
      sectionName: "AWS IAM Least Privilege Standards",
      ruSectionName: "Стандарты и практические требования: AWS IAM Principle of Least Privilege SCP Governance",
      instructions: [
        "Apply core domain tenets and industry best practices for AWS IAM Principle of Least Privilege SCP Governance.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для AWS IAM Principle of Least Privilege SCP Governance.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","aws","iam","principle"],
    }),
  },

  "technical-grpc-protocol-buffers-high-speed-rpc-microservices": {
    id: "technical-grpc-protocol-buffers-high-speed-rpc-microservices",
    name: "gRPCProtocolBuffersHighSpeedRPCMicroservicesSkill",
    displayName: "gRPC Protocol Buffers High-Speed RPC Microservices",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for gRPC Protocol Buffers High-Speed RPC Microservices.",
    tags: ["technical","grpc","protocol","buffers"],
    transform: createStandardSkillTransform({
      sectionName: "gRPC Protocol Buffers Architecture",
      ruSectionName: "Стандарты и практические требования: gRPC Protocol Buffers High-Speed RPC Microservices",
      instructions: [
        "Apply core domain tenets and industry best practices for gRPC Protocol Buffers High-Speed RPC Microservices.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для gRPC Protocol Buffers High-Speed RPC Microservices.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","grpc","protocol","buffers"],
    }),
  },

  "technical-kafka-partition-leader-rebalance-consumer-lag": {
    id: "technical-kafka-partition-leader-rebalance-consumer-lag",
    name: "KafkaPartitionLeaderRebalanceConsumerLagSkill",
    displayName: "Kafka Partition Leader Rebalance & Consumer Lag",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Kafka Partition Leader Rebalance & Consumer Lag.",
    tags: ["technical","kafka","partition","leader"],
    transform: createStandardSkillTransform({
      sectionName: "Kafka Partition Lag Management",
      ruSectionName: "Стандарты и практические требования: Kafka Partition Leader Rebalance & Consumer Lag",
      instructions: [
        "Apply core domain tenets and industry best practices for Kafka Partition Leader Rebalance & Consumer Lag.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Kafka Partition Leader Rebalance & Consumer Lag.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","kafka","partition","leader"],
    }),
  },

  "technical-postgresql-wal-streaming-replication-failover": {
    id: "technical-postgresql-wal-streaming-replication-failover",
    name: "PostgreSQLWALStreamingReplicationFailoverSkill",
    displayName: "PostgreSQL WAL Streaming Replication & Failover",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for PostgreSQL WAL Streaming Replication & Failover.",
    tags: ["technical","postgresql","wal","streaming"],
    transform: createStandardSkillTransform({
      sectionName: "Postgres WAL Replication Standards",
      ruSectionName: "Стандарты и практические требования: PostgreSQL WAL Streaming Replication & Failover",
      instructions: [
        "Apply core domain tenets and industry best practices for PostgreSQL WAL Streaming Replication & Failover.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для PostgreSQL WAL Streaming Replication & Failover.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","postgresql","wal","streaming"],
    }),
  },

  "technical-vault-secrets-management-dynamic-database-credential": {
    id: "technical-vault-secrets-management-dynamic-database-credential",
    name: "VaultSecretsManagementDynamicDatabaseCredentialSkill",
    displayName: "Vault Secrets Management Dynamic Database Credential",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Vault Secrets Management Dynamic Database Credential.",
    tags: ["technical","vault","secrets","management"],
    transform: createStandardSkillTransform({
      sectionName: "HashiCorp Vault Secrets Protocol",
      ruSectionName: "Стандарты и практические требования: Vault Secrets Management Dynamic Database Credential",
      instructions: [
        "Apply core domain tenets and industry best practices for Vault Secrets Management Dynamic Database Credential.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Vault Secrets Management Dynamic Database Credential.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","vault","secrets","management"],
    }),
  },

  "technical-envoy-service-mesh-sidecar-proxy-routing": {
    id: "technical-envoy-service-mesh-sidecar-proxy-routing",
    name: "EnvoyServiceMeshSidecarProxyRoutingSkill",
    displayName: "Envoy Service Mesh Sidecar Proxy Routing",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Envoy Service Mesh Sidecar Proxy Routing.",
    tags: ["technical","envoy","service","mesh"],
    transform: createStandardSkillTransform({
      sectionName: "Envoy Service Mesh Standards",
      ruSectionName: "Стандарты и практические требования: Envoy Service Mesh Sidecar Proxy Routing",
      instructions: [
        "Apply core domain tenets and industry best practices for Envoy Service Mesh Sidecar Proxy Routing.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Envoy Service Mesh Sidecar Proxy Routing.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","envoy","service","mesh"],
    }),
  },

  "technical-redis-sentinel-high-availability-auto-failover": {
    id: "technical-redis-sentinel-high-availability-auto-failover",
    name: "RedisSentinelHighAvailabilityAutoFailoverSkill",
    displayName: "Redis Sentinel High Availability Auto-Failover",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Redis Sentinel High Availability Auto-Failover.",
    tags: ["technical","redis","sentinel","high"],
    transform: createStandardSkillTransform({
      sectionName: "Redis Sentinel High Availability Protocol",
      ruSectionName: "Стандарты и практические требования: Redis Sentinel High Availability Auto-Failover",
      instructions: [
        "Apply core domain tenets and industry best practices for Redis Sentinel High Availability Auto-Failover.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Redis Sentinel High Availability Auto-Failover.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","redis","sentinel","high"],
    }),
  },

  "technical-linux-systemd-unit-service-lifecycle-management": {
    id: "technical-linux-systemd-unit-service-lifecycle-management",
    name: "LinuxSystemdUnitServiceLifecycleManagementSkill",
    displayName: "Linux Systemd Unit Service Lifecycle Management",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Linux Systemd Unit Service Lifecycle Management.",
    tags: ["technical","linux","systemd","unit"],
    transform: createStandardSkillTransform({
      sectionName: "Systemd Service Lifecycle Standards",
      ruSectionName: "Стандарты и практические требования: Linux Systemd Unit Service Lifecycle Management",
      instructions: [
        "Apply core domain tenets and industry best practices for Linux Systemd Unit Service Lifecycle Management.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Linux Systemd Unit Service Lifecycle Management.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","linux","systemd","unit"],
    }),
  },

  "technical-ansible-idempotent-server-configuration-playbook": {
    id: "technical-ansible-idempotent-server-configuration-playbook",
    name: "AnsibleIdempotentServerConfigurationPlaybookSkill",
    displayName: "Ansible Idempotent Server Configuration Playbook",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Ansible Idempotent Server Configuration Playbook.",
    tags: ["technical","ansible","idempotent","server"],
    transform: createStandardSkillTransform({
      sectionName: "Ansible Configuration Standards",
      ruSectionName: "Стандарты и практические требования: Ansible Idempotent Server Configuration Playbook",
      instructions: [
        "Apply core domain tenets and industry best practices for Ansible Idempotent Server Configuration Playbook.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Ansible Idempotent Server Configuration Playbook.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","ansible","idempotent","server"],
    }),
  },

  "technical-elasticsearch-hot-warm-cold-storage-tier-sharding": {
    id: "technical-elasticsearch-hot-warm-cold-storage-tier-sharding",
    name: "ElasticsearchHotWarmColdStorageTierShardingSkill",
    displayName: "Elasticsearch Hot-Warm-Cold Storage Tier Sharding",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Elasticsearch Hot-Warm-Cold Storage Tier Sharding.",
    tags: ["technical","elasticsearch","hot","warm"],
    transform: createStandardSkillTransform({
      sectionName: "Elasticsearch Tiering Architecture",
      ruSectionName: "Стандарты и практические требования: Elasticsearch Hot-Warm-Cold Storage Tier Sharding",
      instructions: [
        "Apply core domain tenets and industry best practices for Elasticsearch Hot-Warm-Cold Storage Tier Sharding.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Elasticsearch Hot-Warm-Cold Storage Tier Sharding.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","elasticsearch","hot","warm"],
    }),
  },

  "technical-cisco-bgp-route-reflector-mpls-network-fabric": {
    id: "technical-cisco-bgp-route-reflector-mpls-network-fabric",
    name: "CiscoBGPRouteReflectorMPLSNetworkFabricSkill",
    displayName: "Cisco BGP Route Reflector & MPLS Network Fabric",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Cisco BGP Route Reflector & MPLS Network Fabric.",
    tags: ["technical","cisco","bgp","route"],
    transform: createStandardSkillTransform({
      sectionName: "Enterprise Network Fabric Standards",
      ruSectionName: "Стандарты и практические требования: Cisco BGP Route Reflector & MPLS Network Fabric",
      instructions: [
        "Apply core domain tenets and industry best practices for Cisco BGP Route Reflector & MPLS Network Fabric.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Cisco BGP Route Reflector & MPLS Network Fabric.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","cisco","bgp","route"],
    }),
  },

  "technical-ebpf-kernel-tracing-network-packet-filtering": {
    id: "technical-ebpf-kernel-tracing-network-packet-filtering",
    name: "eBPFKernelTracingNetworkPacketFilteringSkill",
    displayName: "eBPF Kernel Tracing & Network Packet Filtering",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for eBPF Kernel Tracing & Network Packet Filtering.",
    tags: ["technical","ebpf","kernel","tracing"],
    transform: createStandardSkillTransform({
      sectionName: "eBPF Kernel Tracing Standards",
      ruSectionName: "Стандарты и практические требования: eBPF Kernel Tracing & Network Packet Filtering",
      instructions: [
        "Apply core domain tenets and industry best practices for eBPF Kernel Tracing & Network Packet Filtering.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для eBPF Kernel Tracing & Network Packet Filtering.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","ebpf","kernel","tracing"],
    }),
  },

  "technical-cloudflare-workers-edge-serverless-compute-flow": {
    id: "technical-cloudflare-workers-edge-serverless-compute-flow",
    name: "CloudflareWorkersEdgeServerlessComputeFlowSkill",
    displayName: "Cloudflare Workers Edge Serverless Compute Flow",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Cloudflare Workers Edge Serverless Compute Flow.",
    tags: ["technical","cloudflare","workers","edge"],
    transform: createStandardSkillTransform({
      sectionName: "Edge Serverless Compute Standards",
      ruSectionName: "Стандарты и практические требования: Cloudflare Workers Edge Serverless Compute Flow",
      instructions: [
        "Apply core domain tenets and industry best practices for Cloudflare Workers Edge Serverless Compute Flow.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Cloudflare Workers Edge Serverless Compute Flow.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","cloudflare","workers","edge"],
    }),
  },

  "technical-rabbitmq-quorum-queues-distributed-messaging": {
    id: "technical-rabbitmq-quorum-queues-distributed-messaging",
    name: "RabbitMQQuorumQueuesDistributedMessagingSkill",
    displayName: "RabbitMQ Quorum Queues Distributed Messaging",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for RabbitMQ Quorum Queues Distributed Messaging.",
    tags: ["technical","rabbitmq","quorum","queues"],
    transform: createStandardSkillTransform({
      sectionName: "RabbitMQ Distributed Queue Protocol",
      ruSectionName: "Стандарты и практические требования: RabbitMQ Quorum Queues Distributed Messaging",
      instructions: [
        "Apply core domain tenets and industry best practices for RabbitMQ Quorum Queues Distributed Messaging.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для RabbitMQ Quorum Queues Distributed Messaging.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","rabbitmq","quorum","queues"],
    }),
  },

  "technical-ceph-distributed-object-storage-pool-balancing": {
    id: "technical-ceph-distributed-object-storage-pool-balancing",
    name: "CephDistributedObjectStoragePoolBalancingSkill",
    displayName: "Ceph Distributed Object Storage Pool Balancing",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Ceph Distributed Object Storage Pool Balancing.",
    tags: ["technical","ceph","distributed","object"],
    transform: createStandardSkillTransform({
      sectionName: "Ceph Storage Pool Architecture",
      ruSectionName: "Стандарты и практические требования: Ceph Distributed Object Storage Pool Balancing",
      instructions: [
        "Apply core domain tenets and industry best practices for Ceph Distributed Object Storage Pool Balancing.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Ceph Distributed Object Storage Pool Balancing.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","ceph","distributed","object"],
    }),
  },

  "technical-chaos-engineering-chaos-mesh-resilience-injection": {
    id: "technical-chaos-engineering-chaos-mesh-resilience-injection",
    name: "ChaosEngineeringChaosMeshResilienceInjectionSkill",
    displayName: "Chaos Engineering Chaos Mesh Resilience Injection",
    categoryId: "technical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Chaos Engineering Chaos Mesh Resilience Injection.",
    tags: ["technical","chaos","engineering","chaos"],
    transform: createStandardSkillTransform({
      sectionName: "Chaos Engineering Injection Protocol",
      ruSectionName: "Стандарты и практические требования: Chaos Engineering Chaos Mesh Resilience Injection",
      instructions: [
        "Apply core domain tenets and industry best practices for Chaos Engineering Chaos Mesh Resilience Injection.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Chaos Engineering Chaos Mesh Resilience Injection.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["technical","chaos","engineering","chaos"],
    }),
  },
  "technical-kubernetes-cluster-helm-deployment-protocol": {
    id: "technical-kubernetes-cluster-helm-deployment-protocol",
    name: "KubernetesClusterHelmDeploymentProtocolSkill",
    displayName: "Kubernetes Cluster Helm Deployment Protocol",
    categoryId: "technical",
    description: "Deploys multi-environment application manifests using versioned Helm charts.",
    tags: ["technical","technical","kubernetes","cluster"],
    transform: createStandardSkillTransform({
      sectionName: "Kubernetes Cluster Helm Deployment Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Kubernetes Cluster Helm Deployment Protocol",
      instructions: [
        "Apply core domain tenets for Kubernetes Cluster Helm Deployment Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Kubernetes Cluster Helm Deployment Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","kubernetes","cluster"],
    }),
  },

  "technical-terraform-infrastructure-as-code-state-locking": {
    id: "technical-terraform-infrastructure-as-code-state-locking",
    name: "TerraformInfrastructureasCodeStateLockingSkill",
    displayName: "Terraform Infrastructure as Code State Locking",
    categoryId: "technical",
    description: "Manages Terraform state locks in S3/DynamoDB to prevent concurrent pipeline collisions.",
    tags: ["technical","technical","terraform","infrastructure"],
    transform: createStandardSkillTransform({
      sectionName: "Terraform Infrastructure as Code State Locking Standards",
      ruSectionName: "Стандарты и регламенты: Terraform Infrastructure as Code State Locking",
      instructions: [
        "Apply core domain tenets for Terraform Infrastructure as Code State Locking.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Terraform Infrastructure as Code State Locking.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","terraform","infrastructure"],
    }),
  },

  "technical-prometheus-grafana-sli-slo-alerting-rules": {
    id: "technical-prometheus-grafana-sli-slo-alerting-rules",
    name: "PrometheusGrafanaSLISLOAlertingRulesSkill",
    displayName: "Prometheus & Grafana SLI/SLO Alerting Rules",
    categoryId: "technical",
    description: "Configures Prometheus alerts based on Service Level Indicators and error budgets.",
    tags: ["technical","technical","prometheus","grafana"],
    transform: createStandardSkillTransform({
      sectionName: "Prometheus & Grafana SLI/SLO Alerting Rules Standards",
      ruSectionName: "Стандарты и регламенты: Prometheus & Grafana SLI/SLO Alerting Rules",
      instructions: [
        "Apply core domain tenets for Prometheus & Grafana SLI/SLO Alerting Rules.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Prometheus & Grafana SLI/SLO Alerting Rules.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","prometheus","grafana"],
    }),
  },

  "technical-nginx-reverse-proxy-security-ssl-termination": {
    id: "technical-nginx-reverse-proxy-security-ssl-termination",
    name: "NginxReverseProxySecuritySSLTerminationSkill",
    displayName: "Nginx Reverse Proxy Security & SSL Termination",
    categoryId: "technical",
    description: "Configures Nginx reverse proxy with TLS 1.3 termination, rate limiting, and headers.",
    tags: ["technical","technical","nginx","reverse"],
    transform: createStandardSkillTransform({
      sectionName: "Nginx Reverse Proxy Security & SSL Termination Standards",
      ruSectionName: "Стандарты и регламенты: Nginx Reverse Proxy Security & SSL Termination",
      instructions: [
        "Apply core domain tenets for Nginx Reverse Proxy Security & SSL Termination.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Nginx Reverse Proxy Security & SSL Termination.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","nginx","reverse"],
    }),
  },

  "technical-docker-multi-stage-build-minimal-container": {
    id: "technical-docker-multi-stage-build-minimal-container",
    name: "DockerMultiStageBuildMinimalContainerSkill",
    displayName: "Docker Multi-Stage Build Minimal Container",
    categoryId: "technical",
    description: "Optimizes container images using multi-stage builds and distroless base layers.",
    tags: ["technical","technical","docker","multi"],
    transform: createStandardSkillTransform({
      sectionName: "Docker Multi-Stage Build Minimal Container Standards",
      ruSectionName: "Стандарты и регламенты: Docker Multi-Stage Build Minimal Container",
      instructions: [
        "Apply core domain tenets for Docker Multi-Stage Build Minimal Container.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Docker Multi-Stage Build Minimal Container.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","docker","multi"],
    }),
  },

  "technical-bgp-autonomous-system-anycast-routing": {
    id: "technical-bgp-autonomous-system-anycast-routing",
    name: "BGPAutonomousSystemAnycastRoutingSkill",
    displayName: "BGP Autonomous System Anycast Routing",
    categoryId: "technical",
    description: "Routes global user traffic to nearest edge data centers using BGP Anycast.",
    tags: ["technical","technical","bgp","autonomous"],
    transform: createStandardSkillTransform({
      sectionName: "BGP Autonomous System Anycast Routing Standards",
      ruSectionName: "Стандарты и регламенты: BGP Autonomous System Anycast Routing",
      instructions: [
        "Apply core domain tenets for BGP Autonomous System Anycast Routing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для BGP Autonomous System Anycast Routing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","bgp","autonomous"],
    }),
  },

  "technical-linux-kernel-sysctl-epoll-performance-tuning": {
    id: "technical-linux-kernel-sysctl-epoll-performance-tuning",
    name: "LinuxKernelSysctlEpollPerformanceTuningSkill",
    displayName: "Linux Kernel Sysctl Epoll Performance Tuning",
    categoryId: "technical",
    description: "Tunes Linux kernel network parameters (epoll, file descriptors, TCP buffers).",
    tags: ["technical","technical","linux","kernel"],
    transform: createStandardSkillTransform({
      sectionName: "Linux Kernel Sysctl Epoll Performance Tuning Standards",
      ruSectionName: "Стандарты и регламенты: Linux Kernel Sysctl Epoll Performance Tuning",
      instructions: [
        "Apply core domain tenets for Linux Kernel Sysctl Epoll Performance Tuning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linux Kernel Sysctl Epoll Performance Tuning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","linux","kernel"],
    }),
  },

  "technical-aws-iam-least-privilege-governance": {
    id: "technical-aws-iam-least-privilege-governance",
    name: "AWSIAMLeastPrivilegeGovernanceSkill",
    displayName: "AWS IAM Least Privilege Governance",
    categoryId: "technical",
    description: "Enforces strict IAM role policies and Service Control Policies (SCPs).",
    tags: ["technical","technical","aws","iam"],
    transform: createStandardSkillTransform({
      sectionName: "AWS IAM Least Privilege Governance Standards",
      ruSectionName: "Стандарты и регламенты: AWS IAM Least Privilege Governance",
      instructions: [
        "Apply core domain tenets for AWS IAM Least Privilege Governance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для AWS IAM Least Privilege Governance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","aws","iam"],
    }),
  },

  "technical-grpc-protocol-buffers-high-speed-microservices": {
    id: "technical-grpc-protocol-buffers-high-speed-microservices",
    name: "gRPCProtocolBuffersHighSpeedMicroservicesSkill",
    displayName: "gRPC Protocol Buffers High-Speed Microservices",
    categoryId: "technical",
    description: "Defines binary RPC services using Protocol Buffers and gRPC streaming.",
    tags: ["technical","technical","grpc","protocol"],
    transform: createStandardSkillTransform({
      sectionName: "gRPC Protocol Buffers High-Speed Microservices Standards",
      ruSectionName: "Стандарты и регламенты: gRPC Protocol Buffers High-Speed Microservices",
      instructions: [
        "Apply core domain tenets for gRPC Protocol Buffers High-Speed Microservices.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для gRPC Protocol Buffers High-Speed Microservices.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","grpc","protocol"],
    }),
  },

  "technical-kafka-partition-leader-rebalance-lag-monitoring": {
    id: "technical-kafka-partition-leader-rebalance-lag-monitoring",
    name: "KafkaPartitionLeaderRebalanceLagMonitoringSkill",
    displayName: "Kafka Partition Leader Rebalance & Lag Monitoring",
    categoryId: "technical",
    description: "Monitors Kafka consumer group lag and manages partition leader rebalancing.",
    tags: ["technical","technical","kafka","partition"],
    transform: createStandardSkillTransform({
      sectionName: "Kafka Partition Leader Rebalance & Lag Monitoring Standards",
      ruSectionName: "Стандарты и регламенты: Kafka Partition Leader Rebalance & Lag Monitoring",
      instructions: [
        "Apply core domain tenets for Kafka Partition Leader Rebalance & Lag Monitoring.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Kafka Partition Leader Rebalance & Lag Monitoring.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","kafka","partition"],
    }),
  },

  "technical-hashicorp-vault-dynamic-secrets-management": {
    id: "technical-hashicorp-vault-dynamic-secrets-management",
    name: "HashiCorpVaultDynamicSecretsManagementSkill",
    displayName: "HashiCorp Vault Dynamic Secrets Management",
    categoryId: "technical",
    description: "Generates ephemeral database credentials and rotates secrets automatically.",
    tags: ["technical","technical","hashicorp","vault"],
    transform: createStandardSkillTransform({
      sectionName: "HashiCorp Vault Dynamic Secrets Management Standards",
      ruSectionName: "Стандарты и регламенты: HashiCorp Vault Dynamic Secrets Management",
      instructions: [
        "Apply core domain tenets for HashiCorp Vault Dynamic Secrets Management.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для HashiCorp Vault Dynamic Secrets Management.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","hashicorp","vault"],
    }),
  },

  "technical-linux-systemd-service-unit-lifecycle-management": {
    id: "technical-linux-systemd-service-unit-lifecycle-management",
    name: "LinuxSystemdServiceUnitLifecycleManagementSkill",
    displayName: "Linux Systemd Service Unit Lifecycle Management",
    categoryId: "technical",
    description: "Authors systemd unit files with security sandboxing and auto-restart policies.",
    tags: ["technical","technical","linux","systemd"],
    transform: createStandardSkillTransform({
      sectionName: "Linux Systemd Service Unit Lifecycle Management Standards",
      ruSectionName: "Стандарты и регламенты: Linux Systemd Service Unit Lifecycle Management",
      instructions: [
        "Apply core domain tenets for Linux Systemd Service Unit Lifecycle Management.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linux Systemd Service Unit Lifecycle Management.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","linux","systemd"],
    }),
  },

  "technical-ansible-idempotent-configuration-playbooks": {
    id: "technical-ansible-idempotent-configuration-playbooks",
    name: "AnsibleIdempotentConfigurationPlaybooksSkill",
    displayName: "Ansible Idempotent Configuration Playbooks",
    categoryId: "technical",
    description: "Automates server provisioning using idempotent Ansible tasks and roles.",
    tags: ["technical","technical","ansible","idempotent"],
    transform: createStandardSkillTransform({
      sectionName: "Ansible Idempotent Configuration Playbooks Standards",
      ruSectionName: "Стандарты и регламенты: Ansible Idempotent Configuration Playbooks",
      instructions: [
        "Apply core domain tenets for Ansible Idempotent Configuration Playbooks.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Ansible Idempotent Configuration Playbooks.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","ansible","idempotent"],
    }),
  },

  "technical-enterprise-bgp-route-reflector-network-fabric": {
    id: "technical-enterprise-bgp-route-reflector-network-fabric",
    name: "EnterpriseBGPRouteReflectorNetworkFabricSkill",
    displayName: "Enterprise BGP Route Reflector Network Fabric",
    categoryId: "technical",
    description: "Architects scalable internal BGP network fabrics using route reflectors.",
    tags: ["technical","technical","enterprise","bgp"],
    transform: createStandardSkillTransform({
      sectionName: "Enterprise BGP Route Reflector Network Fabric Standards",
      ruSectionName: "Стандарты и регламенты: Enterprise BGP Route Reflector Network Fabric",
      instructions: [
        "Apply core domain tenets for Enterprise BGP Route Reflector Network Fabric.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Enterprise BGP Route Reflector Network Fabric.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","enterprise","bgp"],
    }),
  },

  "technical-ebpf-kernel-network-tracing-packet-filtering": {
    id: "technical-ebpf-kernel-network-tracing-packet-filtering",
    name: "eBPFKernelNetworkTracingPacketFilteringSkill",
    displayName: "eBPF Kernel Network Tracing & Packet Filtering",
    categoryId: "technical",
    description: "Attaches eBPF programs to kernel sockets for high-performance packet filtering.",
    tags: ["technical","technical","ebpf","kernel"],
    transform: createStandardSkillTransform({
      sectionName: "eBPF Kernel Network Tracing & Packet Filtering Standards",
      ruSectionName: "Стандарты и регламенты: eBPF Kernel Network Tracing & Packet Filtering",
      instructions: [
        "Apply core domain tenets for eBPF Kernel Network Tracing & Packet Filtering.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для eBPF Kernel Network Tracing & Packet Filtering.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","ebpf","kernel"],
    }),
  },

  "technical-edge-serverless-compute-cloudflare-workers": {
    id: "technical-edge-serverless-compute-cloudflare-workers",
    name: "EdgeServerlessComputeCloudflareWorkersSkill",
    displayName: "Edge Serverless Compute Cloudflare Workers",
    categoryId: "technical",
    description: "Deploys low-latency serverless JavaScript/Wasm code to global edge locations.",
    tags: ["technical","technical","edge","serverless"],
    transform: createStandardSkillTransform({
      sectionName: "Edge Serverless Compute Cloudflare Workers Standards",
      ruSectionName: "Стандарты и регламенты: Edge Serverless Compute Cloudflare Workers",
      instructions: [
        "Apply core domain tenets for Edge Serverless Compute Cloudflare Workers.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Edge Serverless Compute Cloudflare Workers.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","edge","serverless"],
    }),
  },

  "technical-rabbitmq-distributed-quorum-queues": {
    id: "technical-rabbitmq-distributed-quorum-queues",
    name: "RabbitMQDistributedQuorumQueuesSkill",
    displayName: "RabbitMQ Distributed Quorum Queues",
    categoryId: "technical",
    description: "Configures replicated, fault-tolerant message queues using RabbitMQ quorum queues.",
    tags: ["technical","technical","rabbitmq","distributed"],
    transform: createStandardSkillTransform({
      sectionName: "RabbitMQ Distributed Quorum Queues Standards",
      ruSectionName: "Стандарты и регламенты: RabbitMQ Distributed Quorum Queues",
      instructions: [
        "Apply core domain tenets for RabbitMQ Distributed Quorum Queues.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для RabbitMQ Distributed Quorum Queues.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","rabbitmq","distributed"],
    }),
  },

  "technical-ceph-distributed-storage-pool-balancing": {
    id: "technical-ceph-distributed-storage-pool-balancing",
    name: "CephDistributedStoragePoolBalancingSkill",
    displayName: "Ceph Distributed Storage Pool Balancing",
    categoryId: "technical",
    description: "Manages distributed block, object, and file storage pools across server clusters.",
    tags: ["technical","technical","ceph","distributed"],
    transform: createStandardSkillTransform({
      sectionName: "Ceph Distributed Storage Pool Balancing Standards",
      ruSectionName: "Стандарты и регламенты: Ceph Distributed Storage Pool Balancing",
      instructions: [
        "Apply core domain tenets for Ceph Distributed Storage Pool Balancing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Ceph Distributed Storage Pool Balancing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","ceph","distributed"],
    }),
  },

  "technical-chaos-engineering-chaos-mesh-injection": {
    id: "technical-chaos-engineering-chaos-mesh-injection",
    name: "ChaosEngineeringChaosMeshInjectionSkill",
    displayName: "Chaos Engineering Chaos Mesh Injection",
    categoryId: "technical",
    description: "Injects network latency, packet loss, and pod failures to test system resilience.",
    tags: ["technical","technical","chaos","engineering"],
    transform: createStandardSkillTransform({
      sectionName: "Chaos Engineering Chaos Mesh Injection Standards",
      ruSectionName: "Стандарты и регламенты: Chaos Engineering Chaos Mesh Injection",
      instructions: [
        "Apply core domain tenets for Chaos Engineering Chaos Mesh Injection.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Chaos Engineering Chaos Mesh Injection.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","chaos","engineering"],
    }),
  },

  "technical-istio-service-mesh-traffic-shifting-canary": {
    id: "technical-istio-service-mesh-traffic-shifting-canary",
    name: "IstioServiceMeshTrafficShiftingCanarySkill",
    displayName: "Istio Service Mesh Traffic Shifting & Canary",
    categoryId: "technical",
    description: "Executes canary deployments by shifting traffic percentages using Istio VirtualServices.",
    tags: ["technical","technical","istio","service"],
    transform: createStandardSkillTransform({
      sectionName: "Istio Service Mesh Traffic Shifting & Canary Standards",
      ruSectionName: "Стандарты и регламенты: Istio Service Mesh Traffic Shifting & Canary",
      instructions: [
        "Apply core domain tenets for Istio Service Mesh Traffic Shifting & Canary.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Istio Service Mesh Traffic Shifting & Canary.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","istio","service"],
    }),
  },

  "technical-aws-s3-lifecycle-policies-glacier-archiving": {
    id: "technical-aws-s3-lifecycle-policies-glacier-archiving",
    name: "AWSS3LifecyclePoliciesGlacierArchivingSkill",
    displayName: "AWS S3 Lifecycle Policies & Glacier Archiving",
    categoryId: "technical",
    description: "Automates object transition policies from S3 Standard to Glacier and Deep Archive.",
    tags: ["technical","technical","aws","s3"],
    transform: createStandardSkillTransform({
      sectionName: "AWS S3 Lifecycle Policies & Glacier Archiving Standards",
      ruSectionName: "Стандарты и регламенты: AWS S3 Lifecycle Policies & Glacier Archiving",
      instructions: [
        "Apply core domain tenets for AWS S3 Lifecycle Policies & Glacier Archiving.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для AWS S3 Lifecycle Policies & Glacier Archiving.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","aws","s3"],
    }),
  },

  "technical-postgresql-vacuuming-bloat-maintenance": {
    id: "technical-postgresql-vacuuming-bloat-maintenance",
    name: "PostgreSQLVacuumingBloatMaintenanceSkill",
    displayName: "PostgreSQL Vacuuming & Bloat Maintenance",
    categoryId: "technical",
    description: "Configures autovacuum parameters to prevent table bloat and transaction wraparound.",
    tags: ["technical","technical","postgresql","vacuuming"],
    transform: createStandardSkillTransform({
      sectionName: "PostgreSQL Vacuuming & Bloat Maintenance Standards",
      ruSectionName: "Стандарты и регламенты: PostgreSQL Vacuuming & Bloat Maintenance",
      instructions: [
        "Apply core domain tenets for PostgreSQL Vacuuming & Bloat Maintenance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для PostgreSQL Vacuuming & Bloat Maintenance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","postgresql","vacuuming"],
    }),
  },

  "technical-cisco-nexus-data-center-vxlan-evpn-fabric": {
    id: "technical-cisco-nexus-data-center-vxlan-evpn-fabric",
    name: "CiscoNexusDataCenterVXLANEVPNFabricSkill",
    displayName: "Cisco Nexus Data Center VXLAN EVPN Fabric",
    categoryId: "technical",
    description: "Architects scalable spine-and-leaf data center fabrics using VXLAN EVPN.",
    tags: ["technical","technical","cisco","nexus"],
    transform: createStandardSkillTransform({
      sectionName: "Cisco Nexus Data Center VXLAN EVPN Fabric Standards",
      ruSectionName: "Стандарты и регламенты: Cisco Nexus Data Center VXLAN EVPN Fabric",
      instructions: [
        "Apply core domain tenets for Cisco Nexus Data Center VXLAN EVPN Fabric.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cisco Nexus Data Center VXLAN EVPN Fabric.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","cisco","nexus"],
    }),
  },

  "technical-linux-cgroups-v2-system-resource-limits": {
    id: "technical-linux-cgroups-v2-system-resource-limits",
    name: "LinuxCgroupsv2SystemResourceLimitsSkill",
    displayName: "Linux Cgroups v2 & System Resource Limits",
    categoryId: "technical",
    description: "Enforces CPU, memory, and I/O resource limits on container workloads via cgroups v2.",
    tags: ["technical","technical","linux","cgroups"],
    transform: createStandardSkillTransform({
      sectionName: "Linux Cgroups v2 & System Resource Limits Standards",
      ruSectionName: "Стандарты и регламенты: Linux Cgroups v2 & System Resource Limits",
      instructions: [
        "Apply core domain tenets for Linux Cgroups v2 & System Resource Limits.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linux Cgroups v2 & System Resource Limits.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","linux","cgroups"],
    }),
  },

  "technical-argocd-gitops-declarative-kubernetes-sync": {
    id: "technical-argocd-gitops-declarative-kubernetes-sync",
    name: "ArgoCDGitOpsDeclarativeKubernetesSyncSkill",
    displayName: "ArgoCD GitOps Declarative Kubernetes Sync",
    categoryId: "technical",
    description: "Implements GitOps deployment pipelines syncing Git repos to Kubernetes clusters.",
    tags: ["technical","technical","argocd","gitops"],
    transform: createStandardSkillTransform({
      sectionName: "ArgoCD GitOps Declarative Kubernetes Sync Standards",
      ruSectionName: "Стандарты и регламенты: ArgoCD GitOps Declarative Kubernetes Sync",
      instructions: [
        "Apply core domain tenets for ArgoCD GitOps Declarative Kubernetes Sync.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для ArgoCD GitOps Declarative Kubernetes Sync.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","argocd","gitops"],
    }),
  },

  "technical-haproxy-high-availability-load-balancing": {
    id: "technical-haproxy-high-availability-load-balancing",
    name: "HAProxyHighAvailabilityLoadBalancingSkill",
    displayName: "HAProxy High-Availability Load Balancing",
    categoryId: "technical",
    description: "Configures HAProxy layer 4 and layer 7 load balancing with health checks.",
    tags: ["technical","technical","haproxy","high"],
    transform: createStandardSkillTransform({
      sectionName: "HAProxy High-Availability Load Balancing Standards",
      ruSectionName: "Стандарты и регламенты: HAProxy High-Availability Load Balancing",
      instructions: [
        "Apply core domain tenets for HAProxy High-Availability Load Balancing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для HAProxy High-Availability Load Balancing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","haproxy","high"],
    }),
  },

  "technical-dnssec-cryptographic-domain-name-protection": {
    id: "technical-dnssec-cryptographic-domain-name-protection",
    name: "DNSSECCryptographicDomainNameProtectionSkill",
    displayName: "DNSSEC Cryptographic Domain Name Protection",
    categoryId: "technical",
    description: "Secures DNS infrastructure against spoofing using DNSSEC digital signatures.",
    tags: ["technical","technical","dnssec","cryptographic"],
    transform: createStandardSkillTransform({
      sectionName: "DNSSEC Cryptographic Domain Name Protection Standards",
      ruSectionName: "Стандарты и регламенты: DNSSEC Cryptographic Domain Name Protection",
      instructions: [
        "Apply core domain tenets for DNSSEC Cryptographic Domain Name Protection.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для DNSSEC Cryptographic Domain Name Protection.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","dnssec","cryptographic"],
    }),
  },

  "technical-aws-vpc-peering-transit-gateway-architecture": {
    id: "technical-aws-vpc-peering-transit-gateway-architecture",
    name: "AWSVPCPeeringTransitGatewayArchitectureSkill",
    displayName: "AWS VPC Peering & Transit Gateway Architecture",
    categoryId: "technical",
    description: "Connects multi-region cloud VPCs using Transit Gateway and routing tables.",
    tags: ["technical","technical","aws","vpc"],
    transform: createStandardSkillTransform({
      sectionName: "AWS VPC Peering & Transit Gateway Architecture Standards",
      ruSectionName: "Стандарты и регламенты: AWS VPC Peering & Transit Gateway Architecture",
      instructions: [
        "Apply core domain tenets for AWS VPC Peering & Transit Gateway Architecture.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для AWS VPC Peering & Transit Gateway Architecture.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","aws","vpc"],
    }),
  },

  "technical-linux-pam-ssh-key-hardening": {
    id: "technical-linux-pam-ssh-key-hardening",
    name: "LinuxPAMSSHKeyHardeningSkill",
    displayName: "Linux PAM & SSH Key Hardening",
    categoryId: "technical",
    description: "Secures SSH server access using hardware security keys and two-factor PAM modules.",
    tags: ["technical","technical","linux","pam"],
    transform: createStandardSkillTransform({
      sectionName: "Linux PAM & SSH Key Hardening Standards",
      ruSectionName: "Стандарты и регламенты: Linux PAM & SSH Key Hardening",
      instructions: [
        "Apply core domain tenets for Linux PAM & SSH Key Hardening.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linux PAM & SSH Key Hardening.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","linux","pam"],
    }),
  },

  "technical-clickhouse-columnar-database-cluster-architecture": {
    id: "technical-clickhouse-columnar-database-cluster-architecture",
    name: "ClickHouseColumnarDatabaseClusterArchitectureSkill",
    displayName: "ClickHouse Columnar Database Cluster Architecture",
    categoryId: "technical",
    description: "Architects distributed ClickHouse clusters for sub-second analytical queries.",
    tags: ["technical","technical","clickhouse","columnar"],
    transform: createStandardSkillTransform({
      sectionName: "ClickHouse Columnar Database Cluster Architecture Standards",
      ruSectionName: "Стандарты и регламенты: ClickHouse Columnar Database Cluster Architecture",
      instructions: [
        "Apply core domain tenets for ClickHouse Columnar Database Cluster Architecture.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для ClickHouse Columnar Database Cluster Architecture.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","clickhouse","columnar"],
    }),
  },

  "technical-apache-apache-flink-stateful-stream-processing": {
    id: "technical-apache-apache-flink-stateful-stream-processing",
    name: "ApacheApacheFlinkStatefulStreamProcessingSkill",
    displayName: "Apache Apache Flink Stateful Stream Processing",
    categoryId: "technical",
    description: "Builds stateful real-time stream processing applications using Apache Flink.",
    tags: ["technical","technical","apache","apache"],
    transform: createStandardSkillTransform({
      sectionName: "Apache Apache Flink Stateful Stream Processing Standards",
      ruSectionName: "Стандарты и регламенты: Apache Apache Flink Stateful Stream Processing",
      instructions: [
        "Apply core domain tenets for Apache Apache Flink Stateful Stream Processing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Apache Apache Flink Stateful Stream Processing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","apache","apache"],
    }),
  },

  "technical-vault-transit-secrets-engine-data-encryption": {
    id: "technical-vault-transit-secrets-engine-data-encryption",
    name: "VaultTransitSecretsEngineDataEncryptionSkill",
    displayName: "Vault Transit Secrets Engine Data Encryption",
    categoryId: "technical",
    description: "Encrypts application data in transit and at rest using HashiCorp Vault APIs.",
    tags: ["technical","technical","vault","transit"],
    transform: createStandardSkillTransform({
      sectionName: "Vault Transit Secrets Engine Data Encryption Standards",
      ruSectionName: "Стандарты и регламенты: Vault Transit Secrets Engine Data Encryption",
      instructions: [
        "Apply core domain tenets for Vault Transit Secrets Engine Data Encryption.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Vault Transit Secrets Engine Data Encryption.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","vault","transit"],
    }),
  },

  "technical-opensearch-indexing-search-cluster-performance": {
    id: "technical-opensearch-indexing-search-cluster-performance",
    name: "OpenSearchIndexingSearchClusterPerformanceSkill",
    displayName: "OpenSearch Indexing & Search Cluster Performance",
    categoryId: "technical",
    description: "Tunes OpenSearch cluster JVM heap, shard counts, and search performance.",
    tags: ["technical","technical","opensearch","indexing"],
    transform: createStandardSkillTransform({
      sectionName: "OpenSearch Indexing & Search Cluster Performance Standards",
      ruSectionName: "Стандарты и регламенты: OpenSearch Indexing & Search Cluster Performance",
      instructions: [
        "Apply core domain tenets for OpenSearch Indexing & Search Cluster Performance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для OpenSearch Indexing & Search Cluster Performance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","opensearch","indexing"],
    }),
  },

  "technical-linux-lvm-storage-volume-management": {
    id: "technical-linux-lvm-storage-volume-management",
    name: "LinuxLVMStorageVolumeManagementSkill",
    displayName: "Linux LVM Storage Volume Management",
    categoryId: "technical",
    description: "Manages logical volumes, snapshots, and filesystem resizing using LVM.",
    tags: ["technical","technical","linux","lvm"],
    transform: createStandardSkillTransform({
      sectionName: "Linux LVM Storage Volume Management Standards",
      ruSectionName: "Стандарты и регламенты: Linux LVM Storage Volume Management",
      instructions: [
        "Apply core domain tenets for Linux LVM Storage Volume Management.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linux LVM Storage Volume Management.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","linux","lvm"],
    }),
  },

  "technical-cloudflare-ddos-protection-waf-rules": {
    id: "technical-cloudflare-ddos-protection-waf-rules",
    name: "CloudflareDDoSProtectionWAFRulesSkill",
    displayName: "Cloudflare DDoS Protection & WAF Rules",
    categoryId: "technical",
    description: "Configures Web Application Firewall rules to block SQL injection and rate-limit bots.",
    tags: ["technical","technical","cloudflare","ddos"],
    transform: createStandardSkillTransform({
      sectionName: "Cloudflare DDoS Protection & WAF Rules Standards",
      ruSectionName: "Стандарты и регламенты: Cloudflare DDoS Protection & WAF Rules",
      instructions: [
        "Apply core domain tenets for Cloudflare DDoS Protection & WAF Rules.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cloudflare DDoS Protection & WAF Rules.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","cloudflare","ddos"],
    }),
  },

  "technical-graphql-subgraph-federation-router": {
    id: "technical-graphql-subgraph-federation-router",
    name: "GraphQLSubgraphFederationRouterSkill",
    displayName: "GraphQL Subgraph Federation & Router",
    categoryId: "technical",
    description: "Deploys Apollo Router connecting federated subgraphs into a unified API.",
    tags: ["technical","technical","graphql","subgraph"],
    transform: createStandardSkillTransform({
      sectionName: "GraphQL Subgraph Federation & Router Standards",
      ruSectionName: "Стандарты и регламенты: GraphQL Subgraph Federation & Router",
      instructions: [
        "Apply core domain tenets for GraphQL Subgraph Federation & Router.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для GraphQL Subgraph Federation & Router.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","graphql","subgraph"],
    }),
  },

  "technical-kafka-schema-registry-avro-compatibility": {
    id: "technical-kafka-schema-registry-avro-compatibility",
    name: "KafkaSchemaRegistryAvroCompatibilitySkill",
    displayName: "Kafka Schema Registry Avro Compatibility",
    categoryId: "technical",
    description: "Enforces schema compatibility rules for Kafka messages using Confluent Schema Registry.",
    tags: ["technical","technical","kafka","schema"],
    transform: createStandardSkillTransform({
      sectionName: "Kafka Schema Registry Avro Compatibility Standards",
      ruSectionName: "Стандарты и регламенты: Kafka Schema Registry Avro Compatibility",
      instructions: [
        "Apply core domain tenets for Kafka Schema Registry Avro Compatibility.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Kafka Schema Registry Avro Compatibility.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","kafka","schema"],
    }),
  },

  "technical-linux-system-performance-profiling-with-perf": {
    id: "technical-linux-system-performance-profiling-with-perf",
    name: "LinuxSystemPerformanceProfilingwithperfSkill",
    displayName: "Linux System Performance Profiling with perf",
    categoryId: "technical",
    description: "Profiles CPU utilization and memory bottlenecks using Linux `perf` tools.",
    tags: ["technical","technical","linux","system"],
    transform: createStandardSkillTransform({
      sectionName: "Linux System Performance Profiling with perf Standards",
      ruSectionName: "Стандарты и регламенты: Linux System Performance Profiling with perf",
      instructions: [
        "Apply core domain tenets for Linux System Performance Profiling with perf.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linux System Performance Profiling with perf.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","linux","system"],
    }),
  },

  "technical-datadog-apm-distributed-tracing-setup": {
    id: "technical-datadog-apm-distributed-tracing-setup",
    name: "DatadogAPMDistributedTracingSetupSkill",
    displayName: "Datadog APM & Distributed Tracing Setup",
    categoryId: "technical",
    description: "Instruments microservices with Datadog APM agents for performance monitoring.",
    tags: ["technical","technical","datadog","apm"],
    transform: createStandardSkillTransform({
      sectionName: "Datadog APM & Distributed Tracing Setup Standards",
      ruSectionName: "Стандарты и регламенты: Datadog APM & Distributed Tracing Setup",
      instructions: [
        "Apply core domain tenets for Datadog APM & Distributed Tracing Setup.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Datadog APM & Distributed Tracing Setup.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","datadog","apm"],
    }),
  },

  "technical-aws-lambda-cold-start-provisioned-concurrency": {
    id: "technical-aws-lambda-cold-start-provisioned-concurrency",
    name: "AWSLambdaColdStartProvisionedConcurrencySkill",
    displayName: "AWS Lambda Cold Start & Provisioned Concurrency",
    categoryId: "technical",
    description: "Optimizes serverless function execution times using provisioned concurrency.",
    tags: ["technical","technical","aws","lambda"],
    transform: createStandardSkillTransform({
      sectionName: "AWS Lambda Cold Start & Provisioned Concurrency Standards",
      ruSectionName: "Стандарты и регламенты: AWS Lambda Cold Start & Provisioned Concurrency",
      instructions: [
        "Apply core domain tenets for AWS Lambda Cold Start & Provisioned Concurrency.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для AWS Lambda Cold Start & Provisioned Concurrency.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","aws","lambda"],
    }),
  },

  "technical-nfs-glusterfs-network-file-system-mounts": {
    id: "technical-nfs-glusterfs-network-file-system-mounts",
    name: "NFSGlusterFSNetworkFileSystemMountsSkill",
    displayName: "NFS / GlusterFS Network File System Mounts",
    categoryId: "technical",
    description: "Configures shared network file systems with high availability and locking.",
    tags: ["technical","technical","nfs","glusterfs"],
    transform: createStandardSkillTransform({
      sectionName: "NFS / GlusterFS Network File System Mounts Standards",
      ruSectionName: "Стандарты и регламенты: NFS / GlusterFS Network File System Mounts",
      instructions: [
        "Apply core domain tenets for NFS / GlusterFS Network File System Mounts.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для NFS / GlusterFS Network File System Mounts.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","nfs","glusterfs"],
    }),
  },

  "technical-bgp-peering-internet-exchange-ixp-interconnect": {
    id: "technical-bgp-peering-internet-exchange-ixp-interconnect",
    name: "BGPPeeringInternetExchangeIXPInterconnectSkill",
    displayName: "BGP Peering & Internet Exchange (IXP) Interconnect",
    categoryId: "technical",
    description: "Establishes direct peering connections at Internet Exchange Points to cut latency.",
    tags: ["technical","technical","bgp","peering"],
    transform: createStandardSkillTransform({
      sectionName: "BGP Peering & Internet Exchange (IXP) Interconnect Standards",
      ruSectionName: "Стандарты и регламенты: BGP Peering & Internet Exchange (IXP) Interconnect",
      instructions: [
        "Apply core domain tenets for BGP Peering & Internet Exchange (IXP) Interconnect.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для BGP Peering & Internet Exchange (IXP) Interconnect.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","bgp","peering"],
    }),
  },

  "technical-coredns-custom-plugin-dns-forwarding": {
    id: "technical-coredns-custom-plugin-dns-forwarding",
    name: "CoreDNSCustomPluginDNSForwardingSkill",
    displayName: "CoreDNS Custom Plugin & DNS Forwarding",
    categoryId: "technical",
    description: "Configures Kubernetes CoreDNS for custom service discovery and forwarding.",
    tags: ["technical","technical","coredns","custom"],
    transform: createStandardSkillTransform({
      sectionName: "CoreDNS Custom Plugin & DNS Forwarding Standards",
      ruSectionName: "Стандарты и регламенты: CoreDNS Custom Plugin & DNS Forwarding",
      instructions: [
        "Apply core domain tenets for CoreDNS Custom Plugin & DNS Forwarding.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для CoreDNS Custom Plugin & DNS Forwarding.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","coredns","custom"],
    }),
  },

  "technical-linux-iptables-nftables-network-firewall": {
    id: "technical-linux-iptables-nftables-network-firewall",
    name: "LinuxIPTablesNFTablesNetworkFirewallSkill",
    displayName: "Linux IPTables & NFTables Network Firewall",
    categoryId: "technical",
    description: "Authors packet filtering rules using Linux `nftables` for server hardening.",
    tags: ["technical","technical","linux","iptables"],
    transform: createStandardSkillTransform({
      sectionName: "Linux IPTables & NFTables Network Firewall Standards",
      ruSectionName: "Стандарты и регламенты: Linux IPTables & NFTables Network Firewall",
      instructions: [
        "Apply core domain tenets for Linux IPTables & NFTables Network Firewall.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linux IPTables & NFTables Network Firewall.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","linux","iptables"],
    }),
  },

  "technical-mongodb-replica-set-auto-failover-oplog": {
    id: "technical-mongodb-replica-set-auto-failover-oplog",
    name: "MongoDBReplicaSetAutoFailoverOplogSkill",
    displayName: "MongoDB Replica Set Auto-Failover & Oplog",
    categoryId: "technical",
    description: "Configures MongoDB replica sets with automated leader election and oplog sizing.",
    tags: ["technical","technical","mongodb","replica"],
    transform: createStandardSkillTransform({
      sectionName: "MongoDB Replica Set Auto-Failover & Oplog Standards",
      ruSectionName: "Стандарты и регламенты: MongoDB Replica Set Auto-Failover & Oplog",
      instructions: [
        "Apply core domain tenets for MongoDB Replica Set Auto-Failover & Oplog.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для MongoDB Replica Set Auto-Failover & Oplog.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","mongodb","replica"],
    }),
  },

  "technical-apache-airflow-dag-scheduling-task-sensors": {
    id: "technical-apache-airflow-dag-scheduling-task-sensors",
    name: "ApacheAirflowDAGSchedulingTaskSensorsSkill",
    displayName: "Apache Airflow DAG Scheduling & Task Sensors",
    categoryId: "technical",
    description: "Authors idempotent Airflow DAGs with custom task sensors and retries.",
    tags: ["technical","technical","apache","airflow"],
    transform: createStandardSkillTransform({
      sectionName: "Apache Airflow DAG Scheduling & Task Sensors Standards",
      ruSectionName: "Стандарты и регламенты: Apache Airflow DAG Scheduling & Task Sensors",
      instructions: [
        "Apply core domain tenets for Apache Airflow DAG Scheduling & Task Sensors.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Apache Airflow DAG Scheduling & Task Sensors.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","apache","airflow"],
    }),
  },

  "technical-openvpn-ipsec-site-to-site-tunneling": {
    id: "technical-openvpn-ipsec-site-to-site-tunneling",
    name: "OpenVPNIPsecSitetoSiteTunnelingSkill",
    displayName: "OpenVPN / IPsec Site-to-Site Tunneling",
    categoryId: "technical",
    description: "Establishes encrypted site-to-site IPsec VPN tunnels between data centers.",
    tags: ["technical","technical","openvpn","ipsec"],
    transform: createStandardSkillTransform({
      sectionName: "OpenVPN / IPsec Site-to-Site Tunneling Standards",
      ruSectionName: "Стандарты и регламенты: OpenVPN / IPsec Site-to-Site Tunneling",
      instructions: [
        "Apply core domain tenets for OpenVPN / IPsec Site-to-Site Tunneling.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для OpenVPN / IPsec Site-to-Site Tunneling.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","openvpn","ipsec"],
    }),
  },

  "technical-postgresql-connection-pooling-with-pgbouncer": {
    id: "technical-postgresql-connection-pooling-with-pgbouncer",
    name: "PostgreSQLConnectionPoolingwithPgBouncerSkill",
    displayName: "PostgreSQL Connection Pooling with PgBouncer",
    categoryId: "technical",
    description: "Deploys PgBouncer in transaction pooling mode to support thousands of connections.",
    tags: ["technical","technical","postgresql","connection"],
    transform: createStandardSkillTransform({
      sectionName: "PostgreSQL Connection Pooling with PgBouncer Standards",
      ruSectionName: "Стандарты и регламенты: PostgreSQL Connection Pooling with PgBouncer",
      instructions: [
        "Apply core domain tenets for PostgreSQL Connection Pooling with PgBouncer.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для PostgreSQL Connection Pooling with PgBouncer.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","postgresql","connection"],
    }),
  },

  "technical-gcp-cloud-run-container-auto-scaling": {
    id: "technical-gcp-cloud-run-container-auto-scaling",
    name: "GCPCloudRunContainerAutoScalingSkill",
    displayName: "GCP Cloud Run Container Auto-Scaling",
    categoryId: "technical",
    description: "Deploys serverless containers on GCP Cloud Run with concurrency auto-scaling.",
    tags: ["technical","technical","gcp","cloud"],
    transform: createStandardSkillTransform({
      sectionName: "GCP Cloud Run Container Auto-Scaling Standards",
      ruSectionName: "Стандарты и регламенты: GCP Cloud Run Container Auto-Scaling",
      instructions: [
        "Apply core domain tenets for GCP Cloud Run Container Auto-Scaling.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для GCP Cloud Run Container Auto-Scaling.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","gcp","cloud"],
    }),
  },

  "technical-linux-zfs-storage-pool-compression-snapshots": {
    id: "technical-linux-zfs-storage-pool-compression-snapshots",
    name: "LinuxZFSStoragePoolCompressionSnapshotsSkill",
    displayName: "Linux ZFS Storage Pool Compression & Snapshots",
    categoryId: "technical",
    description: "Manages ZFS pools with LZ4 compression, RAID-Z redundancy, and atomic snapshots.",
    tags: ["technical","technical","linux","zfs"],
    transform: createStandardSkillTransform({
      sectionName: "Linux ZFS Storage Pool Compression & Snapshots Standards",
      ruSectionName: "Стандарты и регламенты: Linux ZFS Storage Pool Compression & Snapshots",
      instructions: [
        "Apply core domain tenets for Linux ZFS Storage Pool Compression & Snapshots.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linux ZFS Storage Pool Compression & Snapshots.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","linux","zfs"],
    }),
  },

  "technical-snmp-ipfix-network-device-telemetry": {
    id: "technical-snmp-ipfix-network-device-telemetry",
    name: "SNMPIPFIXNetworkDeviceTelemetrySkill",
    displayName: "SNMP & IPFIX Network Device Telemetry",
    categoryId: "technical",
    description: "Monitors router and switch hardware metrics using SNMP and IPFIX flow export.",
    tags: ["technical","technical","snmp","ipfix"],
    transform: createStandardSkillTransform({
      sectionName: "SNMP & IPFIX Network Device Telemetry Standards",
      ruSectionName: "Стандарты и регламенты: SNMP & IPFIX Network Device Telemetry",
      instructions: [
        "Apply core domain tenets for SNMP & IPFIX Network Device Telemetry.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SNMP & IPFIX Network Device Telemetry.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","snmp","ipfix"],
    }),
  },

  "technical-hashicorp-consul-service-discovery-health-checks": {
    id: "technical-hashicorp-consul-service-discovery-health-checks",
    name: "HashiCorpConsulServiceDiscoveryHealthChecksSkill",
    displayName: "HashiCorp Consul Service Discovery & Health Checks",
    categoryId: "technical",
    description: "Implements dynamic service discovery and health monitoring via Consul.",
    tags: ["technical","technical","hashicorp","consul"],
    transform: createStandardSkillTransform({
      sectionName: "HashiCorp Consul Service Discovery & Health Checks Standards",
      ruSectionName: "Стандарты и регламенты: HashiCorp Consul Service Discovery & Health Checks",
      instructions: [
        "Apply core domain tenets for HashiCorp Consul Service Discovery & Health Checks.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для HashiCorp Consul Service Discovery & Health Checks.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","hashicorp","consul"],
    }),
  },

  "technical-aws-cloudfront-cdn-caching-invalidation": {
    id: "technical-aws-cloudfront-cdn-caching-invalidation",
    name: "AWSCloudFrontCDNCachingInvalidationSkill",
    displayName: "AWS CloudFront CDN Caching & Invalidation",
    categoryId: "technical",
    description: "Optimizes CDN cache hit ratios and configures edge cache invalidations.",
    tags: ["technical","technical","aws","cloudfront"],
    transform: createStandardSkillTransform({
      sectionName: "AWS CloudFront CDN Caching & Invalidation Standards",
      ruSectionName: "Стандарты и регламенты: AWS CloudFront CDN Caching & Invalidation",
      instructions: [
        "Apply core domain tenets for AWS CloudFront CDN Caching & Invalidation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для AWS CloudFront CDN Caching & Invalidation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","aws","cloudfront"],
    }),
  },

  "technical-linux-auditd-security-event-logging": {
    id: "technical-linux-auditd-security-event-logging",
    name: "LinuxAuditdSecurityEventLoggingSkill",
    displayName: "Linux Auditd Security Event Logging",
    categoryId: "technical",
    description: "Monitors system file access and privilege escalation attempts using `auditd`.",
    tags: ["technical","technical","linux","auditd"],
    transform: createStandardSkillTransform({
      sectionName: "Linux Auditd Security Event Logging Standards",
      ruSectionName: "Стандарты и регламенты: Linux Auditd Security Event Logging",
      instructions: [
        "Apply core domain tenets for Linux Auditd Security Event Logging.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linux Auditd Security Event Logging.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","linux","auditd"],
    }),
  },

  "technical-traefik-cloud-native-ingress-controller": {
    id: "technical-traefik-cloud-native-ingress-controller",
    name: "TraefikCloudNativeIngressControllerSkill",
    displayName: "Traefik Cloud-Native Ingress Controller",
    categoryId: "technical",
    description: "Deploys Traefik Ingress Controller with automated Let's Encrypt SSL certificates.",
    tags: ["technical","technical","traefik","cloud"],
    transform: createStandardSkillTransform({
      sectionName: "Traefik Cloud-Native Ingress Controller Standards",
      ruSectionName: "Стандарты и регламенты: Traefik Cloud-Native Ingress Controller",
      instructions: [
        "Apply core domain tenets for Traefik Cloud-Native Ingress Controller.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traefik Cloud-Native Ingress Controller.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","traefik","cloud"],
    }),
  },

  "technical-cassandra-multi-dc-replication-consistency-level": {
    id: "technical-cassandra-multi-dc-replication-consistency-level",
    name: "CassandraMultiDCReplicationConsistencyLevelSkill",
    displayName: "Cassandra Multi-DC Replication & Consistency Level",
    categoryId: "technical",
    description: "Configures Apache Cassandra multi-datacenter replication and QUORUM consistency.",
    tags: ["technical","technical","cassandra","multi"],
    transform: createStandardSkillTransform({
      sectionName: "Cassandra Multi-DC Replication & Consistency Level Standards",
      ruSectionName: "Стандарты и регламенты: Cassandra Multi-DC Replication & Consistency Level",
      instructions: [
        "Apply core domain tenets for Cassandra Multi-DC Replication & Consistency Level.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cassandra Multi-DC Replication & Consistency Level.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","cassandra","multi"],
    }),
  },

  "technical-linux-kernel-memory-out-of-memory-oom-killer-tuning": {
    id: "technical-linux-kernel-memory-out-of-memory-oom-killer-tuning",
    name: "LinuxKernelMemoryOutOfMemoryOOMKillerTuningSkill",
    displayName: "Linux Kernel Memory Out-Of-Memory (OOM) Killer Tuning",
    categoryId: "technical",
    description: "Tunes `oom_score_adj` to protect critical system daemons from OOM termination.",
    tags: ["technical","technical","linux","kernel"],
    transform: createStandardSkillTransform({
      sectionName: "Linux Kernel Memory Out-Of-Memory (OOM) Killer Tuning Standards",
      ruSectionName: "Стандарты и регламенты: Linux Kernel Memory Out-Of-Memory (OOM) Killer Tuning",
      instructions: [
        "Apply core domain tenets for Linux Kernel Memory Out-Of-Memory (OOM) Killer Tuning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linux Kernel Memory Out-Of-Memory (OOM) Killer Tuning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","linux","kernel"],
    }),
  },

  "technical-aws-aurora-serverless-v2-auto-scaling-db": {
    id: "technical-aws-aurora-serverless-v2-auto-scaling-db",
    name: "AWSAuroraServerlessv2AutoScalingDBSkill",
    displayName: "AWS Aurora Serverless v2 Auto-Scaling DB",
    categoryId: "technical",
    description: "Deploys Aurora PostgreSQL Serverless v2 with instant ACU scaling.",
    tags: ["technical","technical","aws","aurora"],
    transform: createStandardSkillTransform({
      sectionName: "AWS Aurora Serverless v2 Auto-Scaling DB Standards",
      ruSectionName: "Стандарты и регламенты: AWS Aurora Serverless v2 Auto-Scaling DB",
      instructions: [
        "Apply core domain tenets for AWS Aurora Serverless v2 Auto-Scaling DB.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для AWS Aurora Serverless v2 Auto-Scaling DB.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","aws","aurora"],
    }),
  },

  "technical-grafana-loki-log-aggregation-querying": {
    id: "technical-grafana-loki-log-aggregation-querying",
    name: "GrafanaLokiLogAggregationQueryingSkill",
    displayName: "Grafana Loki Log Aggregation & Querying",
    categoryId: "technical",
    description: "Aggregates application logs using Grafana Loki and LogQL query syntax.",
    tags: ["technical","technical","grafana","loki"],
    transform: createStandardSkillTransform({
      sectionName: "Grafana Loki Log Aggregation & Querying Standards",
      ruSectionName: "Стандарты и регламенты: Grafana Loki Log Aggregation & Querying",
      instructions: [
        "Apply core domain tenets for Grafana Loki Log Aggregation & Querying.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Grafana Loki Log Aggregation & Querying.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","grafana","loki"],
    }),
  },

  "technical-linux-raid-array-management-with-mdadm": {
    id: "technical-linux-raid-array-management-with-mdadm",
    name: "LinuxRAIDArrayManagementwithmdadmSkill",
    displayName: "Linux RAID Array Management with mdadm",
    categoryId: "technical",
    description: "Configures software RAID 1/5/10 arrays using Linux `mdadm` utilities.",
    tags: ["technical","technical","linux","raid"],
    transform: createStandardSkillTransform({
      sectionName: "Linux RAID Array Management with mdadm Standards",
      ruSectionName: "Стандарты и регламенты: Linux RAID Array Management with mdadm",
      instructions: [
        "Apply core domain tenets for Linux RAID Array Management with mdadm.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linux RAID Array Management with mdadm.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","linux","raid"],
    }),
  },

  "technical-gcp-bigquery-slot-reservation-partitioning": {
    id: "technical-gcp-bigquery-slot-reservation-partitioning",
    name: "GCPBigQuerySlotReservationPartitioningSkill",
    displayName: "GCP BigQuery Slot Reservation & Partitioning",
    categoryId: "technical",
    description: "Optimizes BigQuery SQL query costs using slot reservations and table partitioning.",
    tags: ["technical","technical","gcp","bigquery"],
    transform: createStandardSkillTransform({
      sectionName: "GCP BigQuery Slot Reservation & Partitioning Standards",
      ruSectionName: "Стандарты и регламенты: GCP BigQuery Slot Reservation & Partitioning",
      instructions: [
        "Apply core domain tenets for GCP BigQuery Slot Reservation & Partitioning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для GCP BigQuery Slot Reservation & Partitioning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","gcp","bigquery"],
    }),
  },

  "technical-nats-jetstream-high-performance-messaging": {
    id: "technical-nats-jetstream-high-performance-messaging",
    name: "NATSJetStreamHighPerformanceMessagingSkill",
    displayName: "NATS JetStream High-Performance Messaging",
    categoryId: "technical",
    description: "Deploys lightweight, ultra-fast NATS JetStream messaging clusters.",
    tags: ["technical","technical","nats","jetstream"],
    transform: createStandardSkillTransform({
      sectionName: "NATS JetStream High-Performance Messaging Standards",
      ruSectionName: "Стандарты и регламенты: NATS JetStream High-Performance Messaging",
      instructions: [
        "Apply core domain tenets for NATS JetStream High-Performance Messaging.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для NATS JetStream High-Performance Messaging.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","nats","jetstream"],
    }),
  },

  "technical-linux-network-interface-bonding-lacp": {
    id: "technical-linux-network-interface-bonding-lacp",
    name: "LinuxNetworkInterfaceBondingLACPSkill",
    displayName: "Linux Network Interface Bonding & LACP",
    categoryId: "technical",
    description: "Configures link aggregation (LACP) for high-bandwidth network redundancy.",
    tags: ["technical","technical","linux","network"],
    transform: createStandardSkillTransform({
      sectionName: "Linux Network Interface Bonding & LACP Standards",
      ruSectionName: "Стандарты и регламенты: Linux Network Interface Bonding & LACP",
      instructions: [
        "Apply core domain tenets for Linux Network Interface Bonding & LACP.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linux Network Interface Bonding & LACP.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","linux","network"],
    }),
  },

  "technical-aws-route-53-latency-based-geolocation-routing": {
    id: "technical-aws-route-53-latency-based-geolocation-routing",
    name: "AWSRoute53LatencyBasedGeolocationRoutingSkill",
    displayName: "AWS Route 53 Latency-Based & Geolocation Routing",
    categoryId: "technical",
    description: "Configures DNS routing policies based on user geographic location and network latency.",
    tags: ["technical","technical","aws","route"],
    transform: createStandardSkillTransform({
      sectionName: "AWS Route 53 Latency-Based & Geolocation Routing Standards",
      ruSectionName: "Стандарты и регламенты: AWS Route 53 Latency-Based & Geolocation Routing",
      instructions: [
        "Apply core domain tenets for AWS Route 53 Latency-Based & Geolocation Routing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для AWS Route 53 Latency-Based & Geolocation Routing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","aws","route"],
    }),
  },

  "technical-kubernetes-networkpolicy-micro-segmentation": {
    id: "technical-kubernetes-networkpolicy-micro-segmentation",
    name: "KubernetesNetworkPolicyMicroSegmentationSkill",
    displayName: "Kubernetes NetworkPolicy Micro-Segmentation",
    categoryId: "technical",
    description: "Restricts pod-to-pod network traffic using Kubernetes NetworkPolicies.",
    tags: ["technical","technical","kubernetes","networkpolicy"],
    transform: createStandardSkillTransform({
      sectionName: "Kubernetes NetworkPolicy Micro-Segmentation Standards",
      ruSectionName: "Стандарты и регламенты: Kubernetes NetworkPolicy Micro-Segmentation",
      instructions: [
        "Apply core domain tenets for Kubernetes NetworkPolicy Micro-Segmentation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Kubernetes NetworkPolicy Micro-Segmentation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","kubernetes","networkpolicy"],
    }),
  },

  "technical-postgresql-postgis-geospatial-extension-tuning": {
    id: "technical-postgresql-postgis-geospatial-extension-tuning",
    name: "PostgreSQLPostGISGeospatialExtensionTuningSkill",
    displayName: "PostgreSQL PostGIS Geospatial Extension Tuning",
    categoryId: "technical",
    description: "Indexes and queries spatial data using PostGIS R-Tree indexes.",
    tags: ["technical","technical","postgresql","postgis"],
    transform: createStandardSkillTransform({
      sectionName: "PostgreSQL PostGIS Geospatial Extension Tuning Standards",
      ruSectionName: "Стандарты и регламенты: PostgreSQL PostGIS Geospatial Extension Tuning",
      instructions: [
        "Apply core domain tenets for PostgreSQL PostGIS Geospatial Extension Tuning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для PostgreSQL PostGIS Geospatial Extension Tuning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","postgresql","postgis"],
    }),
  },

  "technical-linux-system-hardening-cis-benchmark-compliance": {
    id: "technical-linux-system-hardening-cis-benchmark-compliance",
    name: "LinuxSystemHardeningCISBenchmarkComplianceSkill",
    displayName: "Linux System Hardening CIS Benchmark Compliance",
    categoryId: "technical",
    description: "Hardens Linux server configurations according to CIS Security Benchmarks.",
    tags: ["technical","technical","linux","system"],
    transform: createStandardSkillTransform({
      sectionName: "Linux System Hardening CIS Benchmark Compliance Standards",
      ruSectionName: "Стандарты и регламенты: Linux System Hardening CIS Benchmark Compliance",
      instructions: [
        "Apply core domain tenets for Linux System Hardening CIS Benchmark Compliance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linux System Hardening CIS Benchmark Compliance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","linux","system"],
    }),
  },

  "technical-apache-spark-distributed-cluster-resource-tuning": {
    id: "technical-apache-spark-distributed-cluster-resource-tuning",
    name: "ApacheSparkDistributedClusterResourceTuningSkill",
    displayName: "Apache Spark Distributed Cluster Resource Tuning",
    categoryId: "technical",
    description: "Tunes Spark executor memory, core counts, and shuffle partitions for big data.",
    tags: ["technical","technical","apache","spark"],
    transform: createStandardSkillTransform({
      sectionName: "Apache Spark Distributed Cluster Resource Tuning Standards",
      ruSectionName: "Стандарты и регламенты: Apache Spark Distributed Cluster Resource Tuning",
      instructions: [
        "Apply core domain tenets for Apache Spark Distributed Cluster Resource Tuning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Apache Spark Distributed Cluster Resource Tuning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","apache","spark"],
    }),
  },

  "technical-aws-kms-customer-managed-encryption-keys-cmek": {
    id: "technical-aws-kms-customer-managed-encryption-keys-cmek",
    name: "AWSKMSCustomerManagedEncryptionKeysCMEKSkill",
    displayName: "AWS KMS Customer Managed Encryption Keys (CMEK)",
    categoryId: "technical",
    description: "Manages KMS key policies and automatic annual key rotation.",
    tags: ["technical","technical","aws","kms"],
    transform: createStandardSkillTransform({
      sectionName: "AWS KMS Customer Managed Encryption Keys (CMEK) Standards",
      ruSectionName: "Стандарты и регламенты: AWS KMS Customer Managed Encryption Keys (CMEK)",
      instructions: [
        "Apply core domain tenets for AWS KMS Customer Managed Encryption Keys (CMEK).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для AWS KMS Customer Managed Encryption Keys (CMEK).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","aws","kms"],
    }),
  },

  "technical-linux-kernel-module-management-dkms": {
    id: "technical-linux-kernel-module-management-dkms",
    name: "LinuxKernelModuleManagementDKMSSkill",
    displayName: "Linux Kernel Module Management & DKMS",
    categoryId: "technical",
    description: "Loads, configures, and compiles Linux kernel modules using DKMS.",
    tags: ["technical","technical","linux","kernel"],
    transform: createStandardSkillTransform({
      sectionName: "Linux Kernel Module Management & DKMS Standards",
      ruSectionName: "Стандарты и регламенты: Linux Kernel Module Management & DKMS",
      instructions: [
        "Apply core domain tenets for Linux Kernel Module Management & DKMS.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linux Kernel Module Management & DKMS.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","linux","kernel"],
    }),
  },

  "technical-cloudflare-magic-transit-bgp-ddos-mitigation": {
    id: "technical-cloudflare-magic-transit-bgp-ddos-mitigation",
    name: "CloudflareMagicTransitBGPDDoSMitigationSkill",
    displayName: "Cloudflare Magic Transit BGP DDoS Mitigation",
    categoryId: "technical",
    description: "Protects data center IP ranges using Cloudflare Magic Transit BGP rerouting.",
    tags: ["technical","technical","cloudflare","magic"],
    transform: createStandardSkillTransform({
      sectionName: "Cloudflare Magic Transit BGP DDoS Mitigation Standards",
      ruSectionName: "Стандарты и регламенты: Cloudflare Magic Transit BGP DDoS Mitigation",
      instructions: [
        "Apply core domain tenets for Cloudflare Magic Transit BGP DDoS Mitigation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cloudflare Magic Transit BGP DDoS Mitigation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","cloudflare","magic"],
    }),
  },

  "technical-kubernetes-cluster-autoscaler-hpa-scaling": {
    id: "technical-kubernetes-cluster-autoscaler-hpa-scaling",
    name: "KubernetesClusterAutoscalerHPAScalingSkill",
    displayName: "Kubernetes Cluster Autoscaler & HPA Scaling",
    categoryId: "technical",
    description: "Configures Horizontal Pod Autoscaler and Cluster Autoscaler for dynamic node provisioning.",
    tags: ["technical","technical","kubernetes","cluster"],
    transform: createStandardSkillTransform({
      sectionName: "Kubernetes Cluster Autoscaler & HPA Scaling Standards",
      ruSectionName: "Стандарты и регламенты: Kubernetes Cluster Autoscaler & HPA Scaling",
      instructions: [
        "Apply core domain tenets for Kubernetes Cluster Autoscaler & HPA Scaling.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Kubernetes Cluster Autoscaler & HPA Scaling.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","kubernetes","cluster"],
    }),
  },

  "technical-postgresql-logical-replication-selective-sync": {
    id: "technical-postgresql-logical-replication-selective-sync",
    name: "PostgreSQLLogicalReplicationSelectiveSyncSkill",
    displayName: "PostgreSQL Logical Replication & Selective Sync",
    categoryId: "technical",
    description: "Replicates specific tables across PostgreSQL databases using logical publication/subscription.",
    tags: ["technical","technical","postgresql","logical"],
    transform: createStandardSkillTransform({
      sectionName: "PostgreSQL Logical Replication & Selective Sync Standards",
      ruSectionName: "Стандарты и регламенты: PostgreSQL Logical Replication & Selective Sync",
      instructions: [
        "Apply core domain tenets for PostgreSQL Logical Replication & Selective Sync.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для PostgreSQL Logical Replication & Selective Sync.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","postgresql","logical"],
    }),
  },

  "technical-linux-disk-i-o-scheduler-tuning-mq-deadline-kyber": {
    id: "technical-linux-disk-i-o-scheduler-tuning-mq-deadline-kyber",
    name: "LinuxDiskIOSchedulerTuningmqdeadlinekyberSkill",
    displayName: "Linux Disk I/O Scheduler Tuning (mq-deadline / kyber)",
    categoryId: "technical",
    description: "Selects optimal disk I/O schedulers for NVMe SSD vs spinning hard drives.",
    tags: ["technical","technical","linux","disk"],
    transform: createStandardSkillTransform({
      sectionName: "Linux Disk I/O Scheduler Tuning (mq-deadline / kyber) Standards",
      ruSectionName: "Стандарты и регламенты: Linux Disk I/O Scheduler Tuning (mq-deadline / kyber)",
      instructions: [
        "Apply core domain tenets for Linux Disk I/O Scheduler Tuning (mq-deadline / kyber).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linux Disk I/O Scheduler Tuning (mq-deadline / kyber).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","linux","disk"],
    }),
  },

  "technical-aws-direct-connect-dedicated-network-line": {
    id: "technical-aws-direct-connect-dedicated-network-line",
    name: "AWSDirectConnectDedicatedNetworkLineSkill",
    displayName: "AWS Direct Connect Dedicated Network Line",
    categoryId: "technical",
    description: "Establishes private 10Gbps network connections between corporate data centers and AWS.",
    tags: ["technical","technical","aws","direct"],
    transform: createStandardSkillTransform({
      sectionName: "AWS Direct Connect Dedicated Network Line Standards",
      ruSectionName: "Стандарты и регламенты: AWS Direct Connect Dedicated Network Line",
      instructions: [
        "Apply core domain tenets for AWS Direct Connect Dedicated Network Line.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для AWS Direct Connect Dedicated Network Line.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","aws","direct"],
    }),
  },

  "technical-kubernetes-pod-disruption-budget-pdb-maintenance": {
    id: "technical-kubernetes-pod-disruption-budget-pdb-maintenance",
    name: "KubernetesPodDisruptionBudgetPDBMaintenanceSkill",
    displayName: "Kubernetes Pod Disruption Budget (PDB) Maintenance",
    categoryId: "technical",
    description: "Protects application availability during cluster node upgrades using PDBs.",
    tags: ["technical","technical","kubernetes","pod"],
    transform: createStandardSkillTransform({
      sectionName: "Kubernetes Pod Disruption Budget (PDB) Maintenance Standards",
      ruSectionName: "Стандарты и регламенты: Kubernetes Pod Disruption Budget (PDB) Maintenance",
      instructions: [
        "Apply core domain tenets for Kubernetes Pod Disruption Budget (PDB) Maintenance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Kubernetes Pod Disruption Budget (PDB) Maintenance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","kubernetes","pod"],
    }),
  },

  "technical-linux-system-time-ntp-chrony-synchronization": {
    id: "technical-linux-system-time-ntp-chrony-synchronization",
    name: "LinuxSystemTimeNTPChronySynchronizationSkill",
    displayName: "Linux System Time NTP / Chrony Synchronization",
    categoryId: "technical",
    description: "Configures `chrony` NTP daemons for sub-millisecond clock synchronization across clusters.",
    tags: ["technical","technical","linux","system"],
    transform: createStandardSkillTransform({
      sectionName: "Linux System Time NTP / Chrony Synchronization Standards",
      ruSectionName: "Стандарты и регламенты: Linux System Time NTP / Chrony Synchronization",
      instructions: [
        "Apply core domain tenets for Linux System Time NTP / Chrony Synchronization.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linux System Time NTP / Chrony Synchronization.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","linux","system"],
    }),
  },

  "technical-datadog-synthetic-monitoring-global-probes": {
    id: "technical-datadog-synthetic-monitoring-global-probes",
    name: "DatadogSyntheticMonitoringGlobalProbesSkill",
    displayName: "Datadog Synthetic Monitoring & Global Probes",
    categoryId: "technical",
    description: "Schedules automated API and browser synthetic tests from global probe locations.",
    tags: ["technical","technical","datadog","synthetic"],
    transform: createStandardSkillTransform({
      sectionName: "Datadog Synthetic Monitoring & Global Probes Standards",
      ruSectionName: "Стандарты и регламенты: Datadog Synthetic Monitoring & Global Probes",
      instructions: [
        "Apply core domain tenets for Datadog Synthetic Monitoring & Global Probes.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Datadog Synthetic Monitoring & Global Probes.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","datadog","synthetic"],
    }),
  },

  "technical-aws-dynamodb-global-tables-multi-region-active-active": {
    id: "technical-aws-dynamodb-global-tables-multi-region-active-active",
    name: "AWSDynamoDBGlobalTablesMultiRegionActiveActiveSkill",
    displayName: "AWS DynamoDB Global Tables Multi-Region Active-Active",
    categoryId: "technical",
    description: "Deploys fully managed multi-region active-active DynamoDB databases.",
    tags: ["technical","technical","aws","dynamodb"],
    transform: createStandardSkillTransform({
      sectionName: "AWS DynamoDB Global Tables Multi-Region Active-Active Standards",
      ruSectionName: "Стандарты и регламенты: AWS DynamoDB Global Tables Multi-Region Active-Active",
      instructions: [
        "Apply core domain tenets for AWS DynamoDB Global Tables Multi-Region Active-Active.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для AWS DynamoDB Global Tables Multi-Region Active-Active.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","aws","dynamodb"],
    }),
  },

  "technical-linux-bcachefs-btrfs-filesystem-management": {
    id: "technical-linux-bcachefs-btrfs-filesystem-management",
    name: "LinuxBcachefsBtrfsFilesystemManagementSkill",
    displayName: "Linux Bcachefs / Btrfs Filesystem Management",
    categoryId: "technical",
    description: "Manages modern Linux filesystems with built-in checksums and copy-on-write.",
    tags: ["technical","technical","linux","bcachefs"],
    transform: createStandardSkillTransform({
      sectionName: "Linux Bcachefs / Btrfs Filesystem Management Standards",
      ruSectionName: "Стандарты и регламенты: Linux Bcachefs / Btrfs Filesystem Management",
      instructions: [
        "Apply core domain tenets for Linux Bcachefs / Btrfs Filesystem Management.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linux Bcachefs / Btrfs Filesystem Management.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","linux","bcachefs"],
    }),
  },

  "technical-kubernetes-cert-manager-automated-tls-certificates": {
    id: "technical-kubernetes-cert-manager-automated-tls-certificates",
    name: "KubernetesCertManagerAutomatedTLSCertificatesSkill",
    displayName: "Kubernetes Cert-Manager Automated TLS Certificates",
    categoryId: "technical",
    description: "Automates SSL/TLS certificate issuance and renewal via cert-manager and Let's Encrypt.",
    tags: ["technical","technical","kubernetes","cert"],
    transform: createStandardSkillTransform({
      sectionName: "Kubernetes Cert-Manager Automated TLS Certificates Standards",
      ruSectionName: "Стандарты и регламенты: Kubernetes Cert-Manager Automated TLS Certificates",
      instructions: [
        "Apply core domain tenets for Kubernetes Cert-Manager Automated TLS Certificates.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Kubernetes Cert-Manager Automated TLS Certificates.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","kubernetes","cert"],
    }),
  },

  "technical-comprehensive-infrastructure-systems-engineering-constitution": {
    id: "technical-comprehensive-infrastructure-systems-engineering-constitution",
    name: "ComprehensiveInfrastructureSystemsEngineeringConstitutionSkill",
    displayName: "Comprehensive Infrastructure & Systems Engineering Constitution",
    categoryId: "technical",
    description: "Enforces world-class DevOps, cloud architecture, system hardening, and high availability.",
    tags: ["technical","technical","comprehensive","infrastructure"],
    transform: createStandardSkillTransform({
      sectionName: "Comprehensive Infrastructure & Systems Engineering Constitution Standards",
      ruSectionName: "Стандарты и регламенты: Comprehensive Infrastructure & Systems Engineering Constitution",
      instructions: [
        "Apply core domain tenets for Comprehensive Infrastructure & Systems Engineering Constitution.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Comprehensive Infrastructure & Systems Engineering Constitution.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","comprehensive","infrastructure"],
    }),
  },

  "technical-technical-skill-89": {
    id: "technical-technical-skill-89",
    name: "technicalSkill89Skill",
    displayName: "technical Skill 89",
    categoryId: "technical",
    description: "Applies advanced technical Skill 89 standards and execution patterns.",
    tags: ["technical","technical","technical","skill"],
    transform: createStandardSkillTransform({
      sectionName: "technical Skill 89 Standards",
      ruSectionName: "Стандарты и регламенты: technical Skill 89",
      instructions: [
        "Apply core domain tenets for technical Skill 89.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для technical Skill 89.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","technical","skill"],
    }),
  },

  "technical-technical-skill-90": {
    id: "technical-technical-skill-90",
    name: "technicalSkill90Skill",
    displayName: "technical Skill 90",
    categoryId: "technical",
    description: "Applies advanced technical Skill 90 standards and execution patterns.",
    tags: ["technical","technical","technical","skill"],
    transform: createStandardSkillTransform({
      sectionName: "technical Skill 90 Standards",
      ruSectionName: "Стандарты и регламенты: technical Skill 90",
      instructions: [
        "Apply core domain tenets for technical Skill 90.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для technical Skill 90.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","technical","technical","skill"],
    }),
  },
  "tech-final-kubernetes-custom-resource-definition-operator-pattern": {
    id: "tech-final-kubernetes-custom-resource-definition-operator-pattern",
    name: "KubernetesCustomResourceDefinitionOperatorPatternSkill",
    displayName: "Kubernetes Custom Resource Definition Operator Pattern",
    categoryId: "technical",
    description: "Builds Kubernetes CRD controllers in Go using controller-runtime reconciliation.",
    tags: ["technical","tech-final","final","kubernetes"],
    transform: createStandardSkillTransform({
      sectionName: "Kubernetes Custom Resource Definition Operator Pattern Standards",
      ruSectionName: "Стандарты и регламенты: Kubernetes Custom Resource Definition Operator Pattern",
      instructions: [
        "Apply core domain tenets for Kubernetes Custom Resource Definition Operator Pattern.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Kubernetes Custom Resource Definition Operator Pattern.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","tech-final","final","kubernetes"],
    }),
  },

  "tech-final-ebpf-linux-kernel-network-packet-filtering-tracing": {
    id: "tech-final-ebpf-linux-kernel-network-packet-filtering-tracing",
    name: "eBPFLinuxKernelNetworkPacketFilteringTracingSkill",
    displayName: "eBPF Linux Kernel Network Packet Filtering Tracing",
    categoryId: "technical",
    description: "Writes C eBPF programs attached to XDP hooks for low-latency kernel packet inspection.",
    tags: ["technical","tech-final","final","ebpf"],
    transform: createStandardSkillTransform({
      sectionName: "eBPF Linux Kernel Network Packet Filtering Tracing Standards",
      ruSectionName: "Стандарты и регламенты: eBPF Linux Kernel Network Packet Filtering Tracing",
      instructions: [
        "Apply core domain tenets for eBPF Linux Kernel Network Packet Filtering Tracing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для eBPF Linux Kernel Network Packet Filtering Tracing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","tech-final","final","ebpf"],
    }),
  },

  "tech-final-ceph-distributed-block-object-storage-cluster-tuning": {
    id: "tech-final-ceph-distributed-block-object-storage-cluster-tuning",
    name: "CephDistributedBlockObjectStorageClusterTuningSkill",
    displayName: "Ceph Distributed Block Object Storage Cluster Tuning",
    categoryId: "technical",
    description: "Tunes Ceph OSD storage pools, CRUSH maps, and Bluestore caching for high IOPS.",
    tags: ["technical","tech-final","final","ceph"],
    transform: createStandardSkillTransform({
      sectionName: "Ceph Distributed Block Object Storage Cluster Tuning Standards",
      ruSectionName: "Стандарты и регламенты: Ceph Distributed Block Object Storage Cluster Tuning",
      instructions: [
        "Apply core domain tenets for Ceph Distributed Block Object Storage Cluster Tuning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Ceph Distributed Block Object Storage Cluster Tuning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","tech-final","final","ceph"],
    }),
  },

  "tech-final-hashicorp-nomad-orchestration-engine-job-specification": {
    id: "tech-final-hashicorp-nomad-orchestration-engine-job-specification",
    name: "HashiCorpNomadOrchestrationEngineJobSpecificationSkill",
    displayName: "HashiCorp Nomad Orchestration Engine Job Specification",
    categoryId: "technical",
    description: "Deploys multi-region containerized workloads using Nomad declarative job specs.",
    tags: ["technical","tech-final","final","hashicorp"],
    transform: createStandardSkillTransform({
      sectionName: "HashiCorp Nomad Orchestration Engine Job Specification Standards",
      ruSectionName: "Стандарты и регламенты: HashiCorp Nomad Orchestration Engine Job Specification",
      instructions: [
        "Apply core domain tenets for HashiCorp Nomad Orchestration Engine Job Specification.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для HashiCorp Nomad Orchestration Engine Job Specification.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","tech-final","final","hashicorp"],
    }),
  },

  "tech-final-clickhouse-real-time-analytics-columnar-database": {
    id: "tech-final-clickhouse-real-time-analytics-columnar-database",
    name: "ClickHouseRealTimeAnalyticsColumnarDatabaseSkill",
    displayName: "ClickHouse Real-Time Analytics Columnar Database",
    categoryId: "technical",
    description: "Optimizes ClickHouse MergeTree engines, primary keys, and vectorization.",
    tags: ["technical","tech-final","final","clickhouse"],
    transform: createStandardSkillTransform({
      sectionName: "ClickHouse Real-Time Analytics Columnar Database Standards",
      ruSectionName: "Стандарты и регламенты: ClickHouse Real-Time Analytics Columnar Database",
      instructions: [
        "Apply core domain tenets for ClickHouse Real-Time Analytics Columnar Database.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для ClickHouse Real-Time Analytics Columnar Database.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","tech-final","final","clickhouse"],
    }),
  },

  "tech-final-opentelemetry-distributed-tracing-collector-architecture": {
    id: "tech-final-opentelemetry-distributed-tracing-collector-architecture",
    name: "OpenTelemetryDistributedTracingCollectorArchitectureSkill",
    displayName: "OpenTelemetry Distributed Tracing Collector Architecture",
    categoryId: "technical",
    description: "Configures OpenTelemetry Collectors for traces, metrics, and logs export.",
    tags: ["technical","tech-final","final","opentelemetry"],
    transform: createStandardSkillTransform({
      sectionName: "OpenTelemetry Distributed Tracing Collector Architecture Standards",
      ruSectionName: "Стандарты и регламенты: OpenTelemetry Distributed Tracing Collector Architecture",
      instructions: [
        "Apply core domain tenets for OpenTelemetry Distributed Tracing Collector Architecture.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для OpenTelemetry Distributed Tracing Collector Architecture.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","tech-final","final","opentelemetry"],
    }),
  },

  "tech-final-traefik-reverse-proxy-dynamic-routing-acme": {
    id: "tech-final-traefik-reverse-proxy-dynamic-routing-acme",
    name: "TraefikReverseProxyDynamicRoutingACMESkill",
    displayName: "Traefik Reverse Proxy Dynamic Routing ACME",
    categoryId: "technical",
    description: "Sets up Traefik ingress routers with Let's Encrypt automated TLS certificate renewal.",
    tags: ["technical","tech-final","final","traefik"],
    transform: createStandardSkillTransform({
      sectionName: "Traefik Reverse Proxy Dynamic Routing ACME Standards",
      ruSectionName: "Стандарты и регламенты: Traefik Reverse Proxy Dynamic Routing ACME",
      instructions: [
        "Apply core domain tenets for Traefik Reverse Proxy Dynamic Routing ACME.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Traefik Reverse Proxy Dynamic Routing ACME.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","tech-final","final","traefik"],
    }),
  },

  "tech-final-master-cloud-native-infrastructure-systems-architecture": {
    id: "tech-final-master-cloud-native-infrastructure-systems-architecture",
    name: "MasterCloudNativeInfrastructureSystemsArchitectureSkill",
    displayName: "Master Cloud Native Infrastructure Systems Architecture",
    categoryId: "technical",
    description: "Enforces world-class cloud-native, distributed systems, and DevOps engineering.",
    tags: ["technical","tech-final","final","master"],
    transform: createStandardSkillTransform({
      sectionName: "Master Cloud Native Infrastructure Systems Architecture Standards",
      ruSectionName: "Стандарты и регламенты: Master Cloud Native Infrastructure Systems Architecture",
      instructions: [
        "Apply core domain tenets for Master Cloud Native Infrastructure Systems Architecture.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Master Cloud Native Infrastructure Systems Architecture.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["technical","tech-final","final","master"],
    }),
  },
  "tech-multi-multi-region-kubernetes-cluster-federation-deployment": {
    id: "tech-multi-multi-region-kubernetes-cluster-federation-deployment",
    name: "MultiRegionKubernetesClusterFederationDeploymentSkill",
    displayName: "Multi Region Kubernetes Cluster Federation Deployment",
    categoryId: "technical",
    description: "Deploys multi-region K8s clusters using KubeFed with global load balancing and failover.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Region Kubernetes Cluster Federation Deployment",
      ruSectionName: "Композитный Multi-Skill: Multi Region Kubernetes Cluster Federation Deployment",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Region Kubernetes Cluster Federation Deployment.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Region Kubernetes Cluster Federation Deployment.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-linux-kernel-ebpf-packet-filtering-engine": {
    id: "tech-multi-multi-layer-linux-kernel-ebpf-packet-filtering-engine",
    name: "MultiLayerLinuxKerneleBPFPacketFilteringEngineSkill",
    displayName: "Multi Layer Linux Kernel eBPF Packet Filtering Engine",
    categoryId: "technical",
    description: "Writes C eBPF programs attached to XDP hooks for low-latency kernel packet processing.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Linux Kernel eBPF Packet Filtering Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Linux Kernel eBPF Packet Filtering Engine",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer Linux Kernel eBPF Packet Filtering Engine.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer Linux Kernel eBPF Packet Filtering Engine.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-node-ceph-distributed-object-storage-tuning": {
    id: "tech-multi-multi-node-ceph-distributed-object-storage-tuning",
    name: "MultiNodeCephDistributedObjectStorageTuningSkill",
    displayName: "Multi Node Ceph Distributed Object Storage Tuning",
    categoryId: "technical",
    description: "Configures Ceph OSD storage pools, CRUSH maps, and Bluestore caching for high IOPS.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Node Ceph Distributed Object Storage Tuning",
      ruSectionName: "Композитный Multi-Skill: Multi Node Ceph Distributed Object Storage Tuning",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Node Ceph Distributed Object Storage Tuning.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Node Ceph Distributed Object Storage Tuning.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-service-hashicorp-nomad-workload-orchestration": {
    id: "tech-multi-multi-service-hashicorp-nomad-workload-orchestration",
    name: "MultiServiceHashiCorpNomadWorkloadOrchestrationSkill",
    displayName: "Multi Service HashiCorp Nomad Workload Orchestration",
    categoryId: "technical",
    description: "Deploys containerized and non-containerized workloads using Nomad job specifications.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Service HashiCorp Nomad Workload Orchestration",
      ruSectionName: "Композитный Multi-Skill: Multi Service HashiCorp Nomad Workload Orchestration",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Service HashiCorp Nomad Workload Orchestration.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Service HashiCorp Nomad Workload Orchestration.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-opentelemetry-distributed-tracing-collector": {
    id: "tech-multi-multi-layer-opentelemetry-distributed-tracing-collector",
    name: "MultiLayerOpenTelemetryDistributedTracingCollectorSkill",
    displayName: "Multi Layer OpenTelemetry Distributed Tracing Collector",
    categoryId: "technical",
    description: "Configures OpenTelemetry Collectors for traces, metrics, and logs export to Jaeger/Prometheus.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer OpenTelemetry Distributed Tracing Collector",
      ruSectionName: "Композитный Multi-Skill: Multi Layer OpenTelemetry Distributed Tracing Collector",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer OpenTelemetry Distributed Tracing Collector.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer OpenTelemetry Distributed Tracing Collector.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-gateway-traefik-reverse-proxy-acme-tls-router": {
    id: "tech-multi-multi-gateway-traefik-reverse-proxy-acme-tls-router",
    name: "MultiGatewayTraefikReverseProxyACMETLSRouterSkill",
    displayName: "Multi Gateway Traefik Reverse Proxy ACME TLS Router",
    categoryId: "technical",
    description: "Sets up Traefik ingress routers with Let's Encrypt automated TLS certificate renewal.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Gateway Traefik Reverse Proxy ACME TLS Router",
      ruSectionName: "Композитный Multi-Skill: Multi Gateway Traefik Reverse Proxy ACME TLS Router",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Gateway Traefik Reverse Proxy ACME TLS Router.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Gateway Traefik Reverse Proxy ACME TLS Router.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-node-clickhouse-columnar-database-sharding": {
    id: "tech-multi-multi-node-clickhouse-columnar-database-sharding",
    name: "MultiNodeClickHouseColumnarDatabaseShardingSkill",
    displayName: "Multi Node ClickHouse Columnar Database Sharding",
    categoryId: "technical",
    description: "Configures ClickHouse cluster Distributed tables, Zookeeper synchronization, and queries.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Node ClickHouse Columnar Database Sharding",
      ruSectionName: "Композитный Multi-Skill: Multi Node ClickHouse Columnar Database Sharding",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Node ClickHouse Columnar Database Sharding.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Node ClickHouse Columnar Database Sharding.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-wireguard-zero-trust-mesh-vpn-infrastructure": {
    id: "tech-multi-multi-layer-wireguard-zero-trust-mesh-vpn-infrastructure",
    name: "MultiLayerWireGuardZeroTrustMeshVPNInfrastructureSkill",
    displayName: "Multi Layer WireGuard Zero Trust Mesh VPN Infrastructure",
    categoryId: "technical",
    description: "Configures mesh VPN networks using WireGuard for encrypted node-to-node communication.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer WireGuard Zero Trust Mesh VPN Infrastructure",
      ruSectionName: "Композитный Multi-Skill: Multi Layer WireGuard Zero Trust Mesh VPN Infrastructure",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer WireGuard Zero Trust Mesh VPN Infrastructure.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer WireGuard Zero Trust Mesh VPN Infrastructure.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-stage-ci-cd-github-actions-matrix-build-caching": {
    id: "tech-multi-multi-stage-ci-cd-github-actions-matrix-build-caching",
    name: "MultiStageCICDGitHubActionsMatrixBuildCachingSkill",
    displayName: "Multi Stage CI CD GitHub Actions Matrix Build Caching",
    categoryId: "technical",
    description: "Builds GitHub Actions workflows with parallel OS matrix testing and dependency caching.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage CI CD GitHub Actions Matrix Build Caching",
      ruSectionName: "Композитный Multi-Skill: Multi Stage CI CD GitHub Actions Matrix Build Caching",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Stage CI CD GitHub Actions Matrix Build Caching.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Stage CI CD GitHub Actions Matrix Build Caching.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-node-postgresql-wal-streaming-replication-failover": {
    id: "tech-multi-multi-node-postgresql-wal-streaming-replication-failover",
    name: "MultiNodePostgreSQLWALStreamingReplicationFailoverSkill",
    displayName: "Multi Node PostgreSQL WAL Streaming Replication Failover",
    categoryId: "technical",
    description: "Sets up active-passive PostgreSQL streaming replication with Patroni auto-failover.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Node PostgreSQL WAL Streaming Replication Failover",
      ruSectionName: "Композитный Multi-Skill: Multi Node PostgreSQL WAL Streaming Replication Failover",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Node PostgreSQL WAL Streaming Replication Failover.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Node PostgreSQL WAL Streaming Replication Failover.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-envoy-service-mesh-sidecar-proxy-routing": {
    id: "tech-multi-multi-layer-envoy-service-mesh-sidecar-proxy-routing",
    name: "MultiLayerEnvoyServiceMeshSidecarProxyRoutingSkill",
    displayName: "Multi Layer Envoy Service Mesh Sidecar Proxy Routing",
    categoryId: "technical",
    description: "Configures Envoy sidecars for mTLS encryption, rate limiting, and dynamic traffic splitting.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Envoy Service Mesh Sidecar Proxy Routing",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Envoy Service Mesh Sidecar Proxy Routing",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer Envoy Service Mesh Sidecar Proxy Routing.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer Envoy Service Mesh Sidecar Proxy Routing.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-node-redis-sentinel-high-availability-failover": {
    id: "tech-multi-multi-node-redis-sentinel-high-availability-failover",
    name: "MultiNodeRedisSentinelHighAvailabilityFailoverSkill",
    displayName: "Multi Node Redis Sentinel High Availability Failover",
    categoryId: "technical",
    description: "Configures Redis Sentinel master-replica clusters with automatic leader election.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Node Redis Sentinel High Availability Failover",
      ruSectionName: "Композитный Multi-Skill: Multi Node Redis Sentinel High Availability Failover",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Node Redis Sentinel High Availability Failover.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Node Redis Sentinel High Availability Failover.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-tier-elasticsearch-hot-warm-cold-tier-sharding": {
    id: "tech-multi-multi-tier-elasticsearch-hot-warm-cold-tier-sharding",
    name: "MultiTierElasticsearchHotWarmColdTierShardingSkill",
    displayName: "Multi Tier Elasticsearch Hot Warm Cold Tier Sharding",
    categoryId: "technical",
    description: "Manages Elasticsearch index lifecycle policies (ILM) migrating indices across storage tiers.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Tier Elasticsearch Hot Warm Cold Tier Sharding",
      ruSectionName: "Композитный Multi-Skill: Multi Tier Elasticsearch Hot Warm Cold Tier Sharding",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Tier Elasticsearch Hot Warm Cold Tier Sharding.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Tier Elasticsearch Hot Warm Cold Tier Sharding.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-provider-cloud-security-posture-management-cspm": {
    id: "tech-multi-multi-provider-cloud-security-posture-management-cspm",
    name: "MultiProviderCloudSecurityPostureManagementCSPMSkill",
    displayName: "Multi Provider Cloud Security Posture Management CSPM",
    categoryId: "technical",
    description: "Scans AWS/GCP/Azure IAM policies, security groups, and S3 buckets for misconfigurations.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Provider Cloud Security Posture Management CSPM",
      ruSectionName: "Композитный Multi-Skill: Multi Provider Cloud Security Posture Management CSPM",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Provider Cloud Security Posture Management CSPM.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Provider Cloud Security Posture Management CSPM.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-stage-infrastructure-as-code-terraform-opentofu": {
    id: "tech-multi-multi-stage-infrastructure-as-code-terraform-opentofu",
    name: "MultiStageInfrastructureasCodeTerraformOpenTofuSkill",
    displayName: "Multi Stage Infrastructure as Code Terraform OpenTofu",
    categoryId: "technical",
    description: "Writes modular Terraform state configurations with remote S3 backends and state locking.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Infrastructure as Code Terraform OpenTofu",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Infrastructure as Code Terraform OpenTofu",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Stage Infrastructure as Code Terraform OpenTofu.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Stage Infrastructure as Code Terraform OpenTofu.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-bgp-anycast-routing-network-edge-balancer": {
    id: "tech-multi-multi-layer-bgp-anycast-routing-network-edge-balancer",
    name: "MultiLayerBGPAnycastRoutingNetworkEdgeBalancerSkill",
    displayName: "Multi Layer BGP Anycast Routing Network Edge Balancer",
    categoryId: "technical",
    description: "Configures BGP Anycast routing announcing IP prefixes across distributed POP edge centers.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer BGP Anycast Routing Network Edge Balancer",
      ruSectionName: "Композитный Multi-Skill: Multi Layer BGP Anycast Routing Network Edge Balancer",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer BGP Anycast Routing Network Edge Balancer.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer BGP Anycast Routing Network Edge Balancer.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-node-apache-kafka-distributed-event-log-cluster": {
    id: "tech-multi-multi-node-apache-kafka-distributed-event-log-cluster",
    name: "MultiNodeApacheKafkaDistributedEventLogClusterSkill",
    displayName: "Multi Node Apache Kafka Distributed Event Log Cluster",
    categoryId: "technical",
    description: "Tunes Kafka broker JVM settings, partition replication factors, and log retention.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Node Apache Kafka Distributed Event Log Cluster",
      ruSectionName: "Композитный Multi-Skill: Multi Node Apache Kafka Distributed Event Log Cluster",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Node Apache Kafka Distributed Event Log Cluster.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Node Apache Kafka Distributed Event Log Cluster.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-tier-cloudflare-edge-workers-serverless-routing": {
    id: "tech-multi-multi-tier-cloudflare-edge-workers-serverless-routing",
    name: "MultiTierCloudflareEdgeWorkersServerlessRoutingSkill",
    displayName: "Multi Tier Cloudflare Edge Workers Serverless Routing",
    categoryId: "technical",
    description: "Deploys TypeScript functions to Cloudflare Workers edge runtime for low-latency header rewrites.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Tier Cloudflare Edge Workers Serverless Routing",
      ruSectionName: "Композитный Multi-Skill: Multi Tier Cloudflare Edge Workers Serverless Routing",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Tier Cloudflare Edge Workers Serverless Routing.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Tier Cloudflare Edge Workers Serverless Routing.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-hardened-linux-os-cis-benchmark-kernel": {
    id: "tech-multi-multi-layer-hardened-linux-os-cis-benchmark-kernel",
    name: "MultiLayerHardenedLinuxOSCISBenchmarkKernelSkill",
    displayName: "Multi Layer Hardened Linux OS CIS Benchmark Kernel",
    categoryId: "technical",
    description: "Hardens Linux server OS (Ubuntu/RHEL) adhering to CIS Level 2 security benchmarks.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Hardened Linux OS CIS Benchmark Kernel",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Hardened Linux OS CIS Benchmark Kernel",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer Hardened Linux OS CIS Benchmark Kernel.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer Hardened Linux OS CIS Benchmark Kernel.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-provider-aws-gcp-hybrid-cloud-network-interconnect": {
    id: "tech-multi-multi-provider-aws-gcp-hybrid-cloud-network-interconnect",
    name: "MultiProviderAWSGCPHybridCloudNetworkInterconnectSkill",
    displayName: "Multi Provider AWS GCP Hybrid Cloud Network Interconnect",
    categoryId: "technical",
    description: "Sets up AWS Direct Connect and GCP Dedicated Interconnect with IPsec VPN backup.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Provider AWS GCP Hybrid Cloud Network Interconnect",
      ruSectionName: "Композитный Multi-Skill: Multi Provider AWS GCP Hybrid Cloud Network Interconnect",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Provider AWS GCP Hybrid Cloud Network Interconnect.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Provider AWS GCP Hybrid Cloud Network Interconnect.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-node-cassandra-distributed-nosql-replication": {
    id: "tech-multi-multi-node-cassandra-distributed-nosql-replication",
    name: "MultiNodeCassandraDistributedNoSQLReplicationSkill",
    displayName: "Multi Node Cassandra Distributed NoSQL Replication",
    categoryId: "technical",
    description: "Configures Apache Cassandra multi-datacenter keyspaces, consistency levels, and repair.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Node Cassandra Distributed NoSQL Replication",
      ruSectionName: "Композитный Multi-Skill: Multi Node Cassandra Distributed NoSQL Replication",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Node Cassandra Distributed NoSQL Replication.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Node Cassandra Distributed NoSQL Replication.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-prometheus-alertmanager-monitoring-metrics": {
    id: "tech-multi-multi-layer-prometheus-alertmanager-monitoring-metrics",
    name: "MultiLayerPrometheusAlertmanagerMonitoringMetricsSkill",
    displayName: "Multi Layer Prometheus Alertmanager Monitoring Metrics",
    categoryId: "technical",
    description: "Writes Prometheus recording rules and Alertmanager routing trees for PagerDuty dispatches.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Prometheus Alertmanager Monitoring Metrics",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Prometheus Alertmanager Monitoring Metrics",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer Prometheus Alertmanager Monitoring Metrics.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer Prometheus Alertmanager Monitoring Metrics.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-stage-container-image-minimal-distroless-security": {
    id: "tech-multi-multi-stage-container-image-minimal-distroless-security",
    name: "MultiStageContainerImageMinimalDistrolessSecuritySkill",
    displayName: "Multi Stage Container Image Minimal Distroless Security",
    categoryId: "technical",
    description: "Builds multi-stage Dockerfiles producing minimal Distroless images scanned with Trivy.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Container Image Minimal Distroless Security",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Container Image Minimal Distroless Security",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Stage Container Image Minimal Distroless Security.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Stage Container Image Minimal Distroless Security.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-high-availability-haproxy-load-balancer": {
    id: "tech-multi-multi-layer-high-availability-haproxy-load-balancer",
    name: "MultiLayerHighAvailabilityHAProxyLoadBalancerSkill",
    displayName: "Multi Layer High Availability HAProxy Load Balancer",
    categoryId: "technical",
    description: "Configures HAProxy layer 4/7 load balancing with health checks and sticky sessions.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer High Availability HAProxy Load Balancer",
      ruSectionName: "Композитный Multi-Skill: Multi Layer High Availability HAProxy Load Balancer",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer High Availability HAProxy Load Balancer.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer High Availability HAProxy Load Balancer.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-node-glusterfs-distributed-clustered-volume": {
    id: "tech-multi-multi-node-glusterfs-distributed-clustered-volume",
    name: "MultiNodeGlusterFSDistributedClusteredVolumeSkill",
    displayName: "Multi Node GlusterFS Distributed Clustered Volume",
    categoryId: "technical",
    description: "Configures GlusterFS replicated storage volumes across distributed Linux nodes.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Node GlusterFS Distributed Clustered Volume",
      ruSectionName: "Композитный Multi-Skill: Multi Node GlusterFS Distributed Clustered Volume",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Node GlusterFS Distributed Clustered Volume.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Node GlusterFS Distributed Clustered Volume.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-hashicorp-vault-secrets-encryption-engine": {
    id: "tech-multi-multi-layer-hashicorp-vault-secrets-encryption-engine",
    name: "MultiLayerHashiCorpVaultSecretsEncryptionEngineSkill",
    displayName: "Multi Layer HashiCorp Vault Secrets Encryption Engine",
    categoryId: "technical",
    description: "Configures Vault transit secret engines, dynamic database credentials, and PKI certs.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer HashiCorp Vault Secrets Encryption Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Layer HashiCorp Vault Secrets Encryption Engine",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer HashiCorp Vault Secrets Encryption Engine.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer HashiCorp Vault Secrets Encryption Engine.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-stage-microservice-circuit-breaker-resilience": {
    id: "tech-multi-multi-stage-microservice-circuit-breaker-resilience",
    name: "MultiStageMicroserviceCircuitBreakerResilienceSkill",
    displayName: "Multi Stage Microservice Circuit Breaker Resilience",
    categoryId: "technical",
    description: "Configures Istio/Resilience4j circuit breakers, timeouts, and retry budgets.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Microservice Circuit Breaker Resilience",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Microservice Circuit Breaker Resilience",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Stage Microservice Circuit Breaker Resilience.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Stage Microservice Circuit Breaker Resilience.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-provider-dns-cloudflare-aws-route53-failover": {
    id: "tech-multi-multi-provider-dns-cloudflare-aws-route53-failover",
    name: "MultiProviderDNSCloudflareAWSRoute53FailoverSkill",
    displayName: "Multi Provider DNS Cloudflare AWS Route53 Failover",
    categoryId: "technical",
    description: "Sets up dual-provider DNS routing with health checks preventing DNS provider outages.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Provider DNS Cloudflare AWS Route53 Failover",
      ruSectionName: "Композитный Multi-Skill: Multi Provider DNS Cloudflare AWS Route53 Failover",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Provider DNS Cloudflare AWS Route53 Failover.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Provider DNS Cloudflare AWS Route53 Failover.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-node-apache-flink-stateful-stream-processing": {
    id: "tech-multi-multi-node-apache-flink-stateful-stream-processing",
    name: "MultiNodeApacheFlinkStatefulStreamProcessingSkill",
    displayName: "Multi Node Apache Flink Stateful Stream Processing",
    categoryId: "technical",
    description: "Configures Flink job managers, RocksDB state backends, and checkpointing intervals.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Node Apache Flink Stateful Stream Processing",
      ruSectionName: "Композитный Multi-Skill: Multi Node Apache Flink Stateful Stream Processing",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Node Apache Flink Stateful Stream Processing.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Node Apache Flink Stateful Stream Processing.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-linux-cgroups-v2-namespace-container-isolation": {
    id: "tech-multi-multi-layer-linux-cgroups-v2-namespace-container-isolation",
    name: "MultiLayerLinuxcgroupsv2NamespaceContainerIsolationSkill",
    displayName: "Multi Layer Linux cgroups v2 Namespace Container Isolation",
    categoryId: "technical",
    description: "Tunes Linux kernel namespaces and cgroups limiting CPU/memory bounds for workloads.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Linux cgroups v2 Namespace Container Isolation",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Linux cgroups v2 Namespace Container Isolation",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer Linux cgroups v2 Namespace Container Isolation.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer Linux cgroups v2 Namespace Container Isolation.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-node-rabbitmq-erlang-clustered-message-broker": {
    id: "tech-multi-multi-node-rabbitmq-erlang-clustered-message-broker",
    name: "MultiNodeRabbitMQErlangClusteredMessageBrokerSkill",
    displayName: "Multi Node RabbitMQ Erlang Clustered Message Broker",
    categoryId: "technical",
    description: "Configures RabbitMQ mirrored queues, exchange bindings, and dead-letter routing.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Node RabbitMQ Erlang Clustered Message Broker",
      ruSectionName: "Композитный Multi-Skill: Multi Node RabbitMQ Erlang Clustered Message Broker",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Node RabbitMQ Erlang Clustered Message Broker.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Node RabbitMQ Erlang Clustered Message Broker.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-tier-enterprise-storage-san-nas-fibre-channel": {
    id: "tech-multi-multi-tier-enterprise-storage-san-nas-fibre-channel",
    name: "MultiTierEnterpriseStorageSANNASFibreChannelSkill",
    displayName: "Multi Tier Enterprise Storage SAN NAS Fibre Channel",
    categoryId: "technical",
    description: "Configures Fibre Channel SAN storage LUNs, multipath I/O (MPIO), and NFS mounts.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Tier Enterprise Storage SAN NAS Fibre Channel",
      ruSectionName: "Композитный Multi-Skill: Multi Tier Enterprise Storage SAN NAS Fibre Channel",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Tier Enterprise Storage SAN NAS Fibre Channel.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Tier Enterprise Storage SAN NAS Fibre Channel.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-linux-kernel-network-stack-tcp-tuning": {
    id: "tech-multi-multi-layer-linux-kernel-network-stack-tcp-tuning",
    name: "MultiLayerLinuxKernelNetworkStackTCPTuningSkill",
    displayName: "Multi Layer Linux Kernel Network Stack TCP Tuning",
    categoryId: "technical",
    description: "Tunes sysctl TCP window scaling, SYN backlog queues, and BBR congestion control.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Linux Kernel Network Stack TCP Tuning",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Linux Kernel Network Stack TCP Tuning",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer Linux Kernel Network Stack TCP Tuning.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer Linux Kernel Network Stack TCP Tuning.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-stage-system-performance-ebpf-flamegraph-profiling": {
    id: "tech-multi-multi-stage-system-performance-ebpf-flamegraph-profiling",
    name: "MultiStageSystemPerformanceeBPFFlamegraphProfilingSkill",
    displayName: "Multi Stage System Performance eBPF Flamegraph Profiling",
    categoryId: "technical",
    description: "Generates CPU flamegraphs using BCC/bpftrace isolating kernel and userland bottlenecks.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage System Performance eBPF Flamegraph Profiling",
      ruSectionName: "Композитный Multi-Skill: Multi Stage System Performance eBPF Flamegraph Profiling",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Stage System Performance eBPF Flamegraph Profiling.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Stage System Performance eBPF Flamegraph Profiling.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-provider-serverless-aws-lambda-google-cloud-functions": {
    id: "tech-multi-multi-provider-serverless-aws-lambda-google-cloud-functions",
    name: "MultiProviderServerlessAWSLambdaGoogleCloudFunctionsSkill",
    displayName: "Multi Provider Serverless AWS Lambda Google Cloud Functions",
    categoryId: "technical",
    description: "Deploys event-driven serverless functions with provisioned concurrency preventing cold starts.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Provider Serverless AWS Lambda Google Cloud Functions",
      ruSectionName: "Композитный Multi-Skill: Multi Provider Serverless AWS Lambda Google Cloud Functions",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Provider Serverless AWS Lambda Google Cloud Functions.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Provider Serverless AWS Lambda Google Cloud Functions.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-node-minio-distributed-object-storage-cluster": {
    id: "tech-multi-multi-node-minio-distributed-object-storage-cluster",
    name: "MultiNodeMinIODistributedObjectStorageClusterSkill",
    displayName: "Multi Node MinIO Distributed Object Storage Cluster",
    categoryId: "technical",
    description: "Configures MinIO erasure coding pools for high-availability S3-compatible storage.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Node MinIO Distributed Object Storage Cluster",
      ruSectionName: "Композитный Multi-Skill: Multi Node MinIO Distributed Object Storage Cluster",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Node MinIO Distributed Object Storage Cluster.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Node MinIO Distributed Object Storage Cluster.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-hardened-ssh-key-bastion-host-architecture": {
    id: "tech-multi-multi-layer-hardened-ssh-key-bastion-host-architecture",
    name: "MultiLayerHardenedSSHKeyBastionHostArchitectureSkill",
    displayName: "Multi Layer Hardened SSH Key Bastion Host Architecture",
    categoryId: "technical",
    description: "Configures SSH bastion jump hosts with YubiKey hardware 2FA and session recording.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Hardened SSH Key Bastion Host Architecture",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Hardened SSH Key Bastion Host Architecture",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer Hardened SSH Key Bastion Host Architecture.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer Hardened SSH Key Bastion Host Architecture.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-node-cockroachdb-distributed-sql-replication": {
    id: "tech-multi-multi-node-cockroachdb-distributed-sql-replication",
    name: "MultiNodeCockroachDBDistributedSQLReplicationSkill",
    displayName: "Multi Node CockroachDB Distributed SQL Replication",
    categoryId: "technical",
    description: "Configures CockroachDB multi-region Raft consensus clusters with geo-partitioning.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Node CockroachDB Distributed SQL Replication",
      ruSectionName: "Композитный Multi-Skill: Multi Node CockroachDB Distributed SQL Replication",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Node CockroachDB Distributed SQL Replication.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Node CockroachDB Distributed SQL Replication.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-nginx-web-server-performance-caching": {
    id: "tech-multi-multi-layer-nginx-web-server-performance-caching",
    name: "MultiLayerNginxWebServerPerformanceCachingSkill",
    displayName: "Multi Layer Nginx Web Server Performance Caching",
    categoryId: "technical",
    description: "Tunes Nginx worker processes, keepalive timeouts, open file cache, and gzip/brotli.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Nginx Web Server Performance Caching",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Nginx Web Server Performance Caching",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer Nginx Web Server Performance Caching.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer Nginx Web Server Performance Caching.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-stage-automated-chaos-engineering-litmus-chaosmesh": {
    id: "tech-multi-multi-stage-automated-chaos-engineering-litmus-chaosmesh",
    name: "MultiStageAutomatedChaosEngineeringLitmusChaosMeshSkill",
    displayName: "Multi Stage Automated Chaos Engineering Litmus ChaosMesh",
    categoryId: "technical",
    description: "Injects pod kills, network latency spikes, and disk fill stress tests using ChaosMesh.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Automated Chaos Engineering Litmus ChaosMesh",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Automated Chaos Engineering Litmus ChaosMesh",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Stage Automated Chaos Engineering Litmus ChaosMesh.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Stage Automated Chaos Engineering Litmus ChaosMesh.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-provider-cloud-finops-cost-allocation-tagging": {
    id: "tech-multi-multi-provider-cloud-finops-cost-allocation-tagging",
    name: "MultiProviderCloudFinOpsCostAllocationTaggingSkill",
    displayName: "Multi Provider Cloud FinOps Cost Allocation Tagging",
    categoryId: "technical",
    description: "Configures cloud tag policies, AWS Cost Explorer alerts, and Kubecost pod allocation.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Provider Cloud FinOps Cost Allocation Tagging",
      ruSectionName: "Композитный Multi-Skill: Multi Provider Cloud FinOps Cost Allocation Tagging",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Provider Cloud FinOps Cost Allocation Tagging.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Provider Cloud FinOps Cost Allocation Tagging.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-node-scylladb-c-plus-plus-nosql-performance": {
    id: "tech-multi-multi-node-scylladb-c-plus-plus-nosql-performance",
    name: "MultiNodeScyllaDBCPlusPlusNoSQLPerformanceSkill",
    displayName: "Multi Node ScyllaDB C Plus Plus NoSQL Performance",
    categoryId: "technical",
    description: "Configures ScyllaDB auto-sharding C++ NoSQL clusters for ultra-low latency.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Node ScyllaDB C Plus Plus NoSQL Performance",
      ruSectionName: "Композитный Multi-Skill: Multi Node ScyllaDB C Plus Plus NoSQL Performance",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Node ScyllaDB C Plus Plus NoSQL Performance.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Node ScyllaDB C Plus Plus NoSQL Performance.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-ansible-configuration-management-playbook": {
    id: "tech-multi-multi-layer-ansible-configuration-management-playbook",
    name: "MultiLayerAnsibleConfigurationManagementPlaybookSkill",
    displayName: "Multi Layer Ansible Configuration Management Playbook",
    categoryId: "technical",
    description: "Writes idempotent Ansible playbooks deploying infrastructure configurations across fleets.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Ansible Configuration Management Playbook",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Ansible Configuration Management Playbook",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer Ansible Configuration Management Playbook.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer Ansible Configuration Management Playbook.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-stage-kubernetes-helm-chart-package-management": {
    id: "tech-multi-multi-stage-kubernetes-helm-chart-package-management",
    name: "MultiStageKubernetesHelmChartPackageManagementSkill",
    displayName: "Multi Stage Kubernetes Helm Chart Package Management",
    categoryId: "technical",
    description: "Creates modular Helm charts with templates, values validation, and release rollbacks.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Kubernetes Helm Chart Package Management",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Kubernetes Helm Chart Package Management",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Stage Kubernetes Helm Chart Package Management.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Stage Kubernetes Helm Chart Package Management.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-linux-pam-system-authentication-sssd": {
    id: "tech-multi-multi-layer-linux-pam-system-authentication-sssd",
    name: "MultiLayerLinuxPAMSystemAuthenticationSSSDSkill",
    displayName: "Multi Layer Linux PAM System Authentication SSSD",
    categoryId: "technical",
    description: "Configures Linux PAM with SSSD joining Linux servers to Active Directory LDAP domains.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Linux PAM System Authentication SSSD",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Linux PAM System Authentication SSSD",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer Linux PAM System Authentication SSSD.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer Linux PAM System Authentication SSSD.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-node-apache-spark-big-data-distributed-cluster": {
    id: "tech-multi-multi-node-apache-spark-big-data-distributed-cluster",
    name: "MultiNodeApacheSparkBigDataDistributedClusterSkill",
    displayName: "Multi Node Apache Spark Big Data Distributed Cluster",
    categoryId: "technical",
    description: "Configures Spark standalone/YARN clusters tuning executor memory and shuffle partitions.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Node Apache Spark Big Data Distributed Cluster",
      ruSectionName: "Композитный Multi-Skill: Multi Node Apache Spark Big Data Distributed Cluster",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Node Apache Spark Big Data Distributed Cluster.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Node Apache Spark Big Data Distributed Cluster.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-palo-alto-enterprise-firewall-ipsec-tunnel": {
    id: "tech-multi-multi-layer-palo-alto-enterprise-firewall-ipsec-tunnel",
    name: "MultiLayerPaloAltoEnterpriseFirewallIPsecTunnelSkill",
    displayName: "Multi Layer Palo Alto Enterprise Firewall IPsec Tunnel",
    categoryId: "technical",
    description: "Configures Palo Alto Next-Gen Firewall BGP routing, threat prevention, and IPsec VPNs.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Palo Alto Enterprise Firewall IPsec Tunnel",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Palo Alto Enterprise Firewall IPsec Tunnel",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer Palo Alto Enterprise Firewall IPsec Tunnel.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer Palo Alto Enterprise Firewall IPsec Tunnel.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-stage-gitops-argocd-kubernetes-deployment": {
    id: "tech-multi-multi-stage-gitops-argocd-kubernetes-deployment",
    name: "MultiStageGitOpsArgoCDKubernetesDeploymentSkill",
    displayName: "Multi Stage GitOps ArgoCD Kubernetes Deployment",
    categoryId: "technical",
    description: "Sets up ArgoCD GitOps pipelines auto-syncing Git repository state to K8s clusters.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage GitOps ArgoCD Kubernetes Deployment",
      ruSectionName: "Композитный Multi-Skill: Multi Stage GitOps ArgoCD Kubernetes Deployment",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Stage GitOps ArgoCD Kubernetes Deployment.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Stage GitOps ArgoCD Kubernetes Deployment.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-node-elasticsearch-vector-search-hnsw-indexing": {
    id: "tech-multi-multi-node-elasticsearch-vector-search-hnsw-indexing",
    name: "MultiNodeElasticsearchVectorSearchHNSWIndexingSkill",
    displayName: "Multi Node Elasticsearch Vector Search HNSW Indexing",
    categoryId: "technical",
    description: "Configures Elasticsearch k-NN vector search using HNSW graph indexing.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Node Elasticsearch Vector Search HNSW Indexing",
      ruSectionName: "Композитный Multi-Skill: Multi Node Elasticsearch Vector Search HNSW Indexing",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Node Elasticsearch Vector Search HNSW Indexing.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Node Elasticsearch Vector Search HNSW Indexing.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-linux-lvm-logical-volume-snapshot-encryption": {
    id: "tech-multi-multi-layer-linux-lvm-logical-volume-snapshot-encryption",
    name: "MultiLayerLinuxLVMLogicalVolumeSnapshotEncryptionSkill",
    displayName: "Multi Layer Linux LVM Logical Volume Snapshot Encryption",
    categoryId: "technical",
    description: "Configures LVM storage volumes with LUKS disk encryption and snapshot backups.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Linux LVM Logical Volume Snapshot Encryption",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Linux LVM Logical Volume Snapshot Encryption",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer Linux LVM Logical Volume Snapshot Encryption.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer Linux LVM Logical Volume Snapshot Encryption.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-provider-hybrid-identity-azure-ad-okta-saml-sso": {
    id: "tech-multi-multi-provider-hybrid-identity-azure-ad-okta-saml-sso",
    name: "MultiProviderHybridIdentityAzureADOktaSAMLSSOSkill",
    displayName: "Multi Provider Hybrid Identity Azure AD Okta SAML SSO",
    categoryId: "technical",
    description: "Configures Azure AD and Okta identity federation with SAML 2.0 and SCIM user provisioning.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Provider Hybrid Identity Azure AD Okta SAML SSO",
      ruSectionName: "Композитный Multi-Skill: Multi Provider Hybrid Identity Azure AD Okta SAML SSO",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Provider Hybrid Identity Azure AD Okta SAML SSO.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Provider Hybrid Identity Azure AD Okta SAML SSO.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-node-trino-presto-distributed-query-engine": {
    id: "tech-multi-multi-node-trino-presto-distributed-query-engine",
    name: "MultiNodeTrinoPrestoDistributedQueryEngineSkill",
    displayName: "Multi Node Trino Presto Distributed Query Engine",
    categoryId: "technical",
    description: "Configures Trino query engine connecting Hive, PostgreSQL, and S3 data lakes.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Node Trino Presto Distributed Query Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Node Trino Presto Distributed Query Engine",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Node Trino Presto Distributed Query Engine.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Node Trino Presto Distributed Query Engine.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-cisco-catalyst-enterprise-network-vlan-trunking": {
    id: "tech-multi-multi-layer-cisco-catalyst-enterprise-network-vlan-trunking",
    name: "MultiLayerCiscoCatalystEnterpriseNetworkVLANTrunkingSkill",
    displayName: "Multi Layer Cisco Catalyst Enterprise Network VLAN Trunking",
    categoryId: "technical",
    description: "Configures Cisco switch 802.1Q VLAN trunking, Spanning Tree (RSTP), and LACP bonds.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Cisco Catalyst Enterprise Network VLAN Trunking",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Cisco Catalyst Enterprise Network VLAN Trunking",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer Cisco Catalyst Enterprise Network VLAN Trunking.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer Cisco Catalyst Enterprise Network VLAN Trunking.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-stage-automated-vulnerability-scanning-dependency-check": {
    id: "tech-multi-multi-stage-automated-vulnerability-scanning-dependency-check",
    name: "MultiStageAutomatedVulnerabilityScanningDependencyCheckSkill",
    displayName: "Multi Stage Automated Vulnerability Scanning Dependency Check",
    categoryId: "technical",
    description: "Integrates Dependency-Check, Snyk, and Trivy into CI/CD build pipelines.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Automated Vulnerability Scanning Dependency Check",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Automated Vulnerability Scanning Dependency Check",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Stage Automated Vulnerability Scanning Dependency Check.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Stage Automated Vulnerability Scanning Dependency Check.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-node-glusterfs-geo-replication-disaster-recovery": {
    id: "tech-multi-multi-node-glusterfs-geo-replication-disaster-recovery",
    name: "MultiNodeGlusterFSGeoReplicationDisasterRecoverySkill",
    displayName: "Multi Node GlusterFS Geo Replication Disaster Recovery",
    categoryId: "technical",
    description: "Configures GlusterFS asynchronous geo-replication across remote datacenters.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Node GlusterFS Geo Replication Disaster Recovery",
      ruSectionName: "Композитный Multi-Skill: Multi Node GlusterFS Geo Replication Disaster Recovery",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Node GlusterFS Geo Replication Disaster Recovery.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Node GlusterFS Geo Replication Disaster Recovery.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-linux-raid-array-mdadm-storage-configuration": {
    id: "tech-multi-multi-layer-linux-raid-array-mdadm-storage-configuration",
    name: "MultiLayerLinuxRAIDArrayMDADMStorageConfigurationSkill",
    displayName: "Multi Layer Linux RAID Array MDADM Storage Configuration",
    categoryId: "technical",
    description: "Configures software RAID 10 arrays using mdadm with hot-spare disk drives.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Linux RAID Array MDADM Storage Configuration",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Linux RAID Array MDADM Storage Configuration",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer Linux RAID Array MDADM Storage Configuration.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer Linux RAID Array MDADM Storage Configuration.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-stage-infrastructure-monitoring-grafana-dashboard": {
    id: "tech-multi-multi-stage-infrastructure-monitoring-grafana-dashboard",
    name: "MultiStageInfrastructureMonitoringGrafanaDashboardSkill",
    displayName: "Multi Stage Infrastructure Monitoring Grafana Dashboard",
    categoryId: "technical",
    description: "Builds Grafana operational dashboards visualizing system metrics and SLO error budgets.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Infrastructure Monitoring Grafana Dashboard",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Infrastructure Monitoring Grafana Dashboard",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Stage Infrastructure Monitoring Grafana Dashboard.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Stage Infrastructure Monitoring Grafana Dashboard.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-node-apache-zookeeper-distributed-coordination": {
    id: "tech-multi-multi-node-apache-zookeeper-distributed-coordination",
    name: "MultiNodeApacheZooKeeperDistributedCoordinationSkill",
    displayName: "Multi Node Apache ZooKeeper Distributed Coordination",
    categoryId: "technical",
    description: "Configures ZooKeeper ensemble quorums managing distributed system leader elections.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Node Apache ZooKeeper Distributed Coordination",
      ruSectionName: "Композитный Multi-Skill: Multi Node Apache ZooKeeper Distributed Coordination",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Node Apache ZooKeeper Distributed Coordination.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Node Apache ZooKeeper Distributed Coordination.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-layer-hardware-security-module-hsm-key-storage": {
    id: "tech-multi-multi-layer-hardware-security-module-hsm-key-storage",
    name: "MultiLayerHardwareSecurityModuleHSMKeyStorageSkill",
    displayName: "Multi Layer Hardware Security Module HSM Key Storage",
    categoryId: "technical",
    description: "Configures Cloud HSM / PKCS#11 modules for cryptographic key generation and signing.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Hardware Security Module HSM Key Storage",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Hardware Security Module HSM Key Storage",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Layer Hardware Security Module HSM Key Storage.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Layer Hardware Security Module HSM Key Storage.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },

  "tech-multi-multi-horizon-master-cloud-native-technical-infrastructure-engine": {
    id: "tech-multi-multi-horizon-master-cloud-native-technical-infrastructure-engine",
    name: "MultiHorizonMasterCloudNativeTechnicalInfrastructureEngineSkill",
    displayName: "Multi Horizon Master Cloud Native Technical Infrastructure Engine",
    categoryId: "technical",
    description: "Enforces master DevOps, cloud-native architecture, system resilience, and infrastructure engineering.",
    tags: ["technical","multi-skill","tech-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Master Cloud Native Technical Infrastructure Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Master Cloud Native Technical Infrastructure Engine",
      instructions: [
        "Phase 1: Setup research, social, technical, or design baseline parameters for Multi Horizon Master Cloud Native Technical Infrastructure Engine.",
        "Phase 2: Multi-perspective analysis, design execution, or technical synthesis.",
        "Phase 3: Produce verified structured output adhering to domain quality standards."
],
      ruInstructions: [
        "Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для Multi Horizon Master Cloud Native Technical Infrastructure Engine.",
        "Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.",
        "Этап 3: Формирование структурированного результата по стандартам качества."
],
      semanticType: "process_directive",
      tags: ["technical","multi-skill","tech-multi"],
    }),
  },
};
