const { appendSkills } = require('../appendSkills.cjs');

// ==========================================
// 1. CONTROL FLOW (20 more skills -> 115 total)
// ==========================================
const CONTROL_FLOW_PART2 = [
  {
    id: "control-flow-priority-inversion-inheritance",
    name: "ControlFlowPriorityInversionInheritanceSkill",
    displayName: "Priority Inheritance Protocol & Real-Time Lock Inversion Defense",
    categoryId: "controlFlow",
    description: "Eliminates priority inversion in real-time execution by elevating the priority of a low-priority task holding a critical mutex.",
    tags: ["control-flow", "priority-inversion", "concurrency", "mutex", "real-time"],
    sectionName: "Priority Inheritance Locking Protocol",
    ruSectionName: "Протокол наследования приоритетов (Защита от инверсии приоритетов при блокировках)",
    instructions: [
      "Temporarily boost the scheduling priority of any worker holding a shared lock to match the highest-priority waiting task.",
      "Revert the worker's priority immediately upon releasing the contended lock.",
      "Enforce maximum lock hold durations to prevent unbounded latency in high-priority threads."
    ],
    ruInstructions: [
      "Временно повышайте приоритет потока, удерживающего блокировку, до уровня наивысшего ожидающего потока.",
      "Возвращайте исходный приоритет потока сразу после освобождения разделяемого ресурса.",
      "Ограничивайте максимальное время удержания блокировки для гарантии предсказуемой задержки."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-branch-prediction-hinting-hot-path",
    name: "ControlFlowBranchPredictionHintingHotPathSkill",
    displayName: "Hot-Path Branch Prediction & CPU Pipeline Optimization",
    categoryId: "controlFlow",
    description: "Structures high-frequency conditional evaluation using `likely()` / `unlikely()` branch hinting to minimize CPU pipeline flush stalls.",
    tags: ["control-flow", "branch-prediction", "cpu-optimization", "performance", "low-level"],
    sectionName: "Branch Prediction & Hot Path Standards",
    ruSectionName: "Оптимизация ветвлений в горячем коде (Branch Prediction и исключение сброса конвейера CPU)",
    instructions: [
      "Arrange conditional branches so the most common execution path fall-through is sequential without jumps.",
      "Isolate rare error checking branches out of the hot instruction cache loop.",
      "Avoid data-dependent branches in tight inner loops; prefer branchless ternary or bitwise operations."
    ],
    ruInstructions: [
      "Размещайте наиболее вероятную ветвь выполнения последовательно для непрерывной выборки инструкций.",
      "Выносите редкие проверки ошибок за пределы горячего цикла кэша инструкций.",
      "Заменяйте ветвления в критических циклах на безветвенные (branchless) битовые операции."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-idempotent-replay-token-window",
    name: "ControlFlowIdempotentReplayTokenWindowSkill",
    displayName: "Idempotent Replay Window & Cryptographic Nonce Validation",
    categoryId: "controlFlow",
    description: "Validates incoming state mutation requests using timestamp-bounded nonces, rejecting replays outside a sliding 5-minute clock window.",
    tags: ["control-flow", "idempotency", "nonce", "security", "distributed-systems"],
    sectionName: "Cryptographic Nonce Replay Defense Standards",
    ruSectionName: "Защита от повторных атак (Replay Defense) через криптографические Nonce и временные окна",
    instructions: [
      "Reject any request bearing a creation timestamp skewed more than 300 seconds from server clock.",
      "Record observed nonces in an in-memory TTL set; reject duplicate nonces within the valid time window.",
      "Synchronize host clocks via NTP / PTP to avoid spurious timestamp rejections."
    ],
    ruInstructions: [
      "Отклоняйте запросы с временной меткой, отклоняющейся от системных часов сервера более чем на 300 секунд.",
      "Сохраняйте использованные одноразовые номера (Nonce) в быстром кэше с автоудалением по TTL.",
      "Синхронизируйте системное время серверов по протоколу NTP для исключения ложных срабатываний."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-hierarchical-timeout-propagation",
    name: "ControlFlowHierarchicalTimeoutPropagationSkill",
    displayName: "Hierarchical Deadline & gRPC Context Timeout Propagation",
    categoryId: "controlFlow",
    description: "Passes monotonically shrinking absolute deadlines across distributed microservice RPC calls, preventing dead computation.",
    tags: ["control-flow", "deadline-propagation", "grpc", "timeout", "microservices"],
    sectionName: "Deadline & Context Timeout Standards",
    ruSectionName: "Сквозная передача дедлайнов и таймаутов в распределенных вызовах (gRPC Deadlines)",
    instructions: [
      "Propagate absolute unix timestamp deadlines (`grpc-timeout`) across all downstream network hops.",
      "Subtract processing elapsed time before initiating secondary sub-queries.",
      "Short-circuit and abort downstream calls immediately if the remaining time budget is less than round-trip network latency."
    ],
    ruInstructions: [
      "Передавайте абсолютное время дедлайна через заголовок `grpc-timeout` во все вложенные микросервисы.",
      "Вычитайте уже затраченное время перед вызовом последующих зависимостей.",
      "Мгновенно прерывайте цепочку, если оставшийся бюджет времени меньше базовой задержки сети."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-event-sourcing-checkpoint-snapshot",
    name: "ControlFlowEventSourcingCheckpointSnapshotSkill",
    displayName: "Event Sourcing Periodic Snapshots & Monotonic Checkpoints",
    categoryId: "controlFlow",
    description: "Accelerates entity aggregate state reconstitution by saving periodic checkpoint snapshots every N events (e.g. every 100 events).",
    tags: ["control-flow", "event-sourcing", "snapshots", "checkpoints", "cqrs"],
    sectionName: "Event Sourcing Snapshotting Standards",
    ruSectionName: "Периодические снапшоты состояния и контрольные точки в Event Sourcing",
    instructions: [
      "Save serialized aggregate state snapshot every 100 applied domain events.",
      "Load the latest snapshot and replay only subsequent delta events (`version > snapshot.version`) for fast hydration.",
      "Verify state hash parity during background reconciliation jobs to ensure zero event corruption."
    ],
    ruInstructions: [
      "Сохраняйте сериализованный снапшот состояния агрегата каждые 100 зафиксированных событий.",
      "Восстанавливайте состояние загрузкой последнего снапшота и применением только оставшихся новых событий.",
      "Периодически сверяйте хэш вычисленного состояния для исключения расхождений в проекциях."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-concurrency-pipeline-stage-buffering",
    name: "ControlFlowConcurrencyPipelineStageBufferingSkill",
    displayName: "Staged Pipeline Architecture & Bounded Channel Buffers (Go Channels / CSP)",
    categoryId: "controlFlow",
    description: "Organizes concurrent data pipelines into discrete processing stages connected by bounded FIFO channels with explicit backpressure.",
    tags: ["control-flow", "csp", "pipeline", "channels", "concurrency"],
    sectionName: "Bounded Pipeline Channel Standards",
    ruSectionName: "Конвейерная обработка данных через буферизованные каналы (CSP / Go Channels)",
    instructions: [
      "Decouple pipeline stages (Ingest -> Parse -> Transform -> Persist) using bounded FIFO channel queues.",
      "Block upstream stages automatically when downstream channel buffers reach full capacity.",
      "Close downstream channels explicitly when upstream producer finishes emitting data."
    ],
    ruInstructions: [
      "Разделяйте этапы конвейера (чтение, парсинг, обогащение, запись) очередями с фиксированной емкостью.",
      "Приостанавливайте работу предыдущего этапа при заполнении входного буфера следующего шага.",
      "Корректно закрывайте каналы передачи данных при завершении генерации потока источником."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-circuit-breaker-exponential-probe",
    name: "ControlFlowCircuitBreakerExponentialProbeSkill",
    displayName: "Circuit Breaker Exponential Half-Open Probe Backoff",
    categoryId: "controlFlow",
    description: "Applies exponential cool-down backoff to half-open probe requests when downstream services suffer prolonged intermittent flapping.",
    tags: ["control-flow", "circuit-breaker", "half-open", "flapping", "resilience"],
    sectionName: "Circuit Breaker Half-Open Probe Standards",
    ruSectionName: "Экспоненциальная адаптация полуоткрытого состояния Circuit Breaker при нестабильности сервиса",
    instructions: [
      "Double the cooldown period before opening Half-Open state if the previous recovery probe failed.",
      "Require a consecutive streak of $K$ successful probes (e.g. 5 consecutive 200 OKs) before transitioning fully to Closed state.",
      "Protect recovering backend servers from instant thundering-herd overload upon state closing."
    ],
    ruInstructions: [
      "Удваивайте интервал ожидания перед отправкой пробного запроса, если предыдущая попытка завершилась неудачей.",
      "Требуйте серию из $K$ успешных пробных ответов подряд для полного закрытия контура (перехода в Closed).",
      "Защищайте восстанавливающийся сервис от лавинообразного наплыва запросов при включении."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-multi-region-failover-dns-healthcheck",
    name: "ControlFlowMultiRegionFailoverDnsHealthcheckSkill",
    displayName: "Active-Passive Multi-Region DNS Failover & Health Checks",
    categoryId: "controlFlow",
    description: "Reroutes global user traffic automatically across multi-cloud regions upon persistent edge health check failures.",
    tags: ["control-flow", "dns-failover", "multi-region", "disaster-recovery", "high-availability"],
    sectionName: "Multi-Region DNS Failover Protocol",
    ruSectionName: "Автоматический переключатель регионов по DNS Health Checks (Active-Passive Failover)",
    instructions: [
      "Configure edge health probes pinging synthetic application endpoints every 5 seconds across 3 global vantage points.",
      "Trigger automatic DNS route update (Route53 / Cloudflare) when 2 of 3 probes fail consecutively for 15 seconds.",
      "Set DNS TTL to 30-60 seconds on critical service records to accelerate global propagation during emergencies."
    ],
    ruInstructions: [
      "Настраивайте синтетические проверки доступности каждые 5 секунд из нескольких независимых точек мира.",
      "Инициируйте автоматическое переключение DNS-записей при фиксации сбоя большинством зон проверки.",
      "Устанавливайте низкий TTL (30–60 секунд) для критических DNS-записей для быстрого применения маршрутов."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-bounded-retry-budget-token-leaky",
    name: "ControlFlowBoundedRetryBudgetTokenLeakySkill",
    displayName: "Client-Side Retry Budgets (Finagle / Envoy Token Bucket)",
    categoryId: "controlFlow",
    description: "Limits client retry volume to a strict percentage (e.g. max 10% of total outbound requests) to prevent retry storm amplification.",
    tags: ["control-flow", "retry-budget", "envoy", "resilience", "traffic-management"],
    sectionName: "Client Retry Budget Standards",
    ruSectionName: "Бюджет повторных попыток клиента (Retry Budget: не более 10% повторов от общего трафика)",
    instructions: [
      "Track successful requests and retry attempts in a sliding 10-second window.",
      "Allow retries only if the ratio of retries to initial requests is below the 10% budget threshold.",
      "Fast-fail subsequent failed requests without retrying when the retry budget is exhausted."
    ],
    ruInstructions: [
      "Учитывайте общее количество успешных запросов и число повторов в скользящем 10-секундном окне.",
      "Разрешайте повторную попытку только при условии, что доля повторов не превышает 10% от общего числа запросов.",
      "Мгновенно возвращайте ошибку без повтора при исчерпании бюджета повторных запросов."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-request-hedging-cost-aware",
    name: "ControlFlowRequestHedgingCostAwareSkill",
    displayName: "Cost-Aware Speculative Request Hedging & Quota Conservation",
    categoryId: "controlFlow",
    description: "Issues hedged requests conditionally only for high-value priority customers or latency-critical interactive user sessions.",
    tags: ["control-flow", "request-hedging", "cost-aware", "quota", "optimization"],
    sectionName: "Cost-Aware Request Hedging Standards",
    ruSectionName: "Экономически оптимизированные спекулятивные запросы с учетом квот и затрат",
    instructions: [
      "Evaluate session priority tier (e.g. Enterprise Tier vs Free Tier) before enabling speculative hedged requests.",
      "Disable hedging automatically during cloud API billing rate-limit pressure or high background system load.",
      "Enforce maximum 1 duplicate request per parent workflow."
    ],
    ruInstructions: [
      "Включайте спекулятивные параллельные запросы только для премиальных тарифов и интерактивных сессий.",
      "Автоматически отключайте дублирование запросов при росте нагрузки или риске исчерпания API-лимитов.",
      "Ограничивайте число спекулятивных запросов максимум одним дубликатом на операцию."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-linearizable-read-lease-raft",
    name: "ControlFlowLinearizableReadLeaseRaftSkill",
    displayName: "Linearizable Read Leases & ReadIndex Optimization in Raft",
    categoryId: "controlFlow",
    description: "Serves linearizable, stale-free read queries directly from the Raft leader without logging full consensus log entries.",
    tags: ["control-flow", "raft", "linearizability", "read-index", "consensus"],
    sectionName: "Raft Linearizable Read Standards",
    ruSectionName: "Линеаризуемое чтение в Raft без записи в лог (ReadIndex и аренда лидера)",
    instructions: [
      "Verify the leader holds a valid lease confirmed by majority heartbeat acks within clock drift bounds.",
      "Record current `commitIndex` as `readIndex` and wait for local state machine to apply up to `readIndex` before returning data.",
      "Guarantee strict serializable consistency while achieving 10x higher read query throughput."
    ],
    ruInstructions: [
      "Проверяйте валидность аренды лидера, подтвержденной большинством узлов в рамках допустимого дрейфа часов.",
      "Фиксируйте текущий `commitIndex` как `readIndex` и отдавайте ответ только после применения стейт-машины до этой точки.",
      "Обеспечивайте строгую согласованность чтения с 10-кратным ростом пропускной способности."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-declarative-rule-engine-rete",
    name: "ControlFlowDeclarativeRuleEngineReteSkill",
    displayName: "Declarative Rule Engine & Rete Algorithm Pattern Matching",
    categoryId: "controlFlow",
    description: "Evaluates thousands of conditional business rules against incoming event facts in sub-millisecond time via Rete network compilation.",
    tags: ["control-flow", "rule-engine", "rete", "business-logic", "declarative"],
    sectionName: "Declarative Business Rule Engine Standards",
    ruSectionName: "Декларативный движок бизнес-правил на основе алгоритма Rete",
    instructions: [
      "Compile conditional rules into an acyclic Directed Acyclic Graph (Alpha and Beta memory nodes).",
      "Propagate incoming fact mutations incrementally through the Rete network rather than re-evaluating all rules from scratch.",
      "Fire conflict resolution agenda rules in strict priority order upon activation."
    ],
    ruInstructions: [
      "Компилируйте правила условий в направленный граф узлов памяти (Alpha и Beta узлы алгоритма Rete).",
      "Передавайте изменения фактов по графу инкрементально без повторного полного прохода по всем правилам.",
      "Выполняйте сработавшие правила в соответствии с установленными приоритетами разрешения конфликтов."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-two-way-data-binding-dirty-checking",
    name: "ControlFlowTwoWayDataBindingDirtyCheckingSkill",
    displayName: "Fine-Grained Reactive Signal Graphs & Dependency Tracking",
    categoryId: "controlFlow",
    description: "Propagates state mutations automatically across fine-grained reactive dependency graphs (SolidJS / Preact Signals) with zero VDOM diffing.",
    tags: ["control-flow", "signals", "reactivity", "fine-grained", "ui-runtime"],
    sectionName: "Fine-Grained Signal Reactivity Standards",
    ruSectionName: "Мелкогранулярная реактивность сигналов (Signals: распространение изменений без VDOM)",
    instructions: [
      "Track variable read accesses dynamically inside `createEffect` or `computed` closures during execution.",
      "Subscribe observers to dependency signals automatically and invalidate computed caches monotonically.",
      "Batch downstream subscriber notifications inside an atomic `batch(() => ...)` transaction to prevent glitching."
    ],
    ruInstructions: [
      "Автоматически регистрируйте зависимости при чтении сигналов внутри вычисляемых функций.",
      "Подписывайте наблюдателей на сигналы и сбрасывайте кэш зависимых значений монотонно.",
      "Объединяйте оповещения подписчиков внутри транзакции `batch(...)` для предотвращения промежуточных глитчей."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-event-throttling-leading-edge",
    name: "ControlFlowEventThrottlingLeadingEdgeSkill",
    displayName: "Leading-Edge & Trailing-Edge Configurable Event Throttling",
    categoryId: "controlFlow",
    description: "Configures event rate pacing with options for immediate leading execution, delayed trailing execution, or synchronized dual invocation.",
    tags: ["control-flow", "throttle", "leading-edge", "trailing-edge", "ui-events"],
    sectionName: "Configurable Event Throttling Architecture",
    ruSectionName: "Конфигурируемый троттлинг событий с поддержкой Leading и Trailing фаз",
    instructions: [
      "Leading Mode: Execute callback immediately on first trigger; suppress subsequent calls during cooldown.",
      "Trailing Mode: Execute callback after cooldown window with the most recent arguments passed during the window.",
      "Dual Mode: Execute immediately on first event and once more at the end of cooldown if updates occurred."
    ],
    ruInstructions: [
      "Leading режим: Мгновенное выполнение при первом клике и блокировка повторов на время кулдауна.",
      "Trailing режим: Выполнение по завершении окна задержки с последними переданными аргументами.",
      "Dual режим: Выполнение на старте и повторный вызов в конце интервала при наличии новых данных."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-task-orchestrator-dependency-injection",
    name: "ControlFlowTaskOrchestratorDependencyInjectionSkill",
    displayName: "Task Workflow Composition Root & Dependency Injection",
    categoryId: "controlFlow",
    description: "Decouples execution control flow from concrete storage, network, and cryptography drivers using IoC container inversion.",
    tags: ["control-flow", "dependency-injection", "ioc", "architecture", "clean-code"],
    sectionName: "Workflow Dependency Injection Standards",
    ruSectionName: "Внедрение зависимостей и Composition Root в оркестраторах задач",
    instructions: [
      "Inject interface-based service abstractions into task runner constructors rather than instantiating singletons directly.",
      "Assemble concrete adapters and workflow graphs exclusively at the composition root entrypoint.",
      "Enable instant in-memory unit testing of complex workflows by injecting mock service adapters."
    ],
    ruInstructions: [
      "Внедряйте интерфейсы сервисов в конструкторы обработчиков вместо создания глобальных синглтонов.",
      "Собирайте граф зависимостей и адаптеры исключительно в точке входа приложения (Composition Root).",
      "Обеспечивайте мгновенное модульное тестирование логики воркфлоу путем подмены адаптеров на моки."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-graceful-fallback-stale-while-revalidate",
    name: "ControlFlowGracefulFallbackStaleWhileRevalidateSkill",
    displayName: "Stale-While-Revalidate (SWR) Asynchronous Cache Regeneration",
    categoryId: "controlFlow",
    description: "Returns instantly from cache while revalidating fresh data in the background, serving stale data gracefully if upstream fails.",
    tags: ["control-flow", "swr", "caching", "stale-while-revalidate", "performance"],
    sectionName: "Stale-While-Revalidate Caching Standards",
    ruSectionName: "Асинхронная фоновая ревалидация кэша (Stale-While-Revalidate / SWR)",
    instructions: [
      "Serve cached content immediately to the caller with zero perceived latency.",
      "Spawn background asynchronous fetch to revalidate and update cache storage.",
      "Retain stale cache item indefinitely as emergency fallback if background revalidation throws network errors."
    ],
    ruInstructions: [
      "Отдавайте кэшированные данные мгновенно пользователю с нулевой задержкой ожидания.",
      "Запускайте фоновое асинхронное обновление данных в кэше без блокировки ответа.",
      "Сохраняйте устаревший кэш как надежный аварийный fallback при сбоях сетевого источника."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-async-resource-disposal-explicit",
    name: "ControlFlowAsyncResourceDisposalExplicitSkill",
    displayName: "Deterministic Async Resource Disposal (TypeScript `using` & `Symbol.asyncDispose`)",
    categoryId: "controlFlow",
    description: "Guarantees deterministic cleanup of file handles, database connections, and locks using ECMAScript Explicit Resource Management.",
    tags: ["control-flow", "async-dispose", "resource-cleanup", "typescript", "raii"],
    sectionName: "Explicit Resource Disposal Protocol",
    ruSectionName: "Детерминированное освобождение ресурсов (TypeScript using и Symbol.asyncDispose)",
    instructions: [
      "Declare scoped resources using `await using resource = acquireResource()`.",
      "Implement `[Symbol.asyncDispose]()` on client wrappers to close connections and release mutexes.",
      "Guarantee automatic cleanup upon scope exit regardless of whether functions return normally or throw exceptions."
    ],
    ruInstructions: [
      "Объявляйте временные ресурсы с ключевым словом `await using resource = acquire()`.",
      "Реализуйте метод `[Symbol.asyncDispose]()` для закрытия сокетов и освобождения дескрипторов.",
      "Гарантируйте автоматический вызов очистки при выходе из блока кода даже при возникновении исключений."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-adaptive-concurrency-aimd-tcp",
    name: "ControlFlowAdaptiveConcurrencyAimdTcpSkill",
    displayName: "Additive Increase / Multiplicative Decrease (AIMD) Dynamic Concurrency Limits",
    categoryId: "controlFlow",
    description: "Adjusts outbound concurrency limits dynamically (Vegas / AIMD) based on observed round-trip response time degradation.",
    tags: ["control-flow", "aimd", "concurrency-limits", "congestion-control", "resilience"],
    sectionName: "AIMD Dynamic Concurrency Standards",
    ruSectionName: "Динамическое управление параллелизмом AIMD (Additive Increase, Multiplicative Decrease)",
    instructions: [
      "Additive Increase: Increment concurrency limit by +1 when observed latency is at baseline RTT.",
      "Multiplicative Decrease: Cut concurrency limit in half ($limit \\times 0.5$) immediately upon detecting latency spikes or drops.",
      "Prevent self-induced queue collapse on overloaded downstream microservices."
    ],
    ruInstructions: [
      "Аддитивное увеличение: Увеличивайте лимит одновременных задач на +1 при стабильной фоновой задержке RTT.",
      "Мультипликативное уменьшение: Снижайте лимит вдвое при резком росте задержки или появлении ошибок.",
      "Предотвращайте лавинообразную перегрузку нижележащих сервисов при исчерпании их ресурсов."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-safe-state-reset-circuit-breaker",
    name: "ControlFlowSafeStateResetCircuitBreakerSkill",
    displayName: "Automated Ephemeral State Purge & Self-Healing Circuit Recovery",
    categoryId: "controlFlow",
    description: "Executes automated cache invalidation, memory compaction, and connection recycling when subsystems experience persistent memory leaks.",
    tags: ["control-flow", "self-healing", "state-purge", "recovery", "resilience"],
    sectionName: "Self-Healing State Purge Standards",
    ruSectionName: "Автоматическая очистка эфемерного состояния и самовосстановление подсистем",
    instructions: [
      "Detect persistent subsystem degradation metrics (high memory watermark, heap fragmentation).",
      "Drain active work, purge transient in-memory caches, and reset connection pools gracefully.",
      "Re-initialize subsystem cleanly without dropping active user HTTP connections."
    ],
    ruInstructions: [
      "Фиксируйте маркеры деградации подсистемы (рост фрагментации памяти, утечки ссылок).",
      "Завершайте активные задачи, сбрасывайте эфемерный кэш и перезапускайте пулы соединений.",
      "Выполняйте чистую реинициализацию сервиса без разрыва внешних клиентских сессий."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-multi-tenant-fair-share-scheduling",
    name: "ControlFlowMultiTenantFairShareSchedulingSkill",
    displayName: "Deficit Weighted Round-Robin (DWRR) Multi-Tenant Fair Scheduling",
    categoryId: "controlFlow",
    description: "Allocates worker compute fairly across multiple competing tenants, preventing noisy-neighbor starvation.",
    tags: ["control-flow", "multi-tenant", "fair-share", "dwrr", "scheduling"],
    sectionName: "Multi-Tenant Fair Scheduling Standards",
    ruSectionName: "Справедливое распределение очередей между арендаторами (DWRR Multi-Tenant Scheduling)",
    instructions: [
      "Assign each tenant a dedicated FIFO sub-queue with a configured quantum byte/task budget.",
      "Rotate through tenant queues using Deficit Weighted Round-Robin, consuming deficit credits per task.",
      "Prevent noisy-neighbor tenants with massive job backlogs from starving smaller active tenants."
    ],
    ruInstructions: [
      "Выделяйте каждому клиенту отдельную субочередь с фиксированным квантом вычислительного бюджета.",
      "Опрашивайте очереди по кругу алгоритмом DWRR, списывая баланс кванта за каждую выполненную задачу.",
      "Исключайте монополизацию воркеров крупными клиентами с миллионными пакетами задач."
    ],
    semanticType: "protocol"
  }
];

// Append remaining Control Flow skills
appendSkills('controlFlow', CONTROL_FLOW_PART2);

console.log('Appended all Control Flow skills.');
