import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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

  'distributed-tracing-opentelemetry': {
    id: 'distributed-tracing-opentelemetry',
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
};
