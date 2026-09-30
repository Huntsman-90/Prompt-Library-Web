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
};
