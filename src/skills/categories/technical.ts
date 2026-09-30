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
};
