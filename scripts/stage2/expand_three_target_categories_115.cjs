const { appendSkills } = require('../appendSkills.cjs');

// ==========================================
// 1. CONTROL FLOW (40 Skills -> 115 Total)
// ==========================================
const CONTROL_FLOW_40 = [
  {
    id: "control-flow-singleflight-request-deduplication",
    name: "ControlFlowSingleflightRequestDeduplicationSkill",
    displayName: "Singleflight In-Flight Request Deduplication & Thundering Herd Defense",
    categoryId: "controlFlow",
    description: "Suppresses duplicate concurrent calls to expensive backends by sharing a single in-flight promise across identical simultaneous requests.",
    tags: ["control-flow", "singleflight", "concurrency", "caching", "performance"],
    sectionName: "Singleflight In-Flight Request Deduplication Protocol",
    ruSectionName: "Дедупликация одновременных запросов Singleflight и защита от Thundering Herd",
    instructions: [
      "Track active in-flight promises by cache key in an internal mutex-guarded map.",
      "Attach subsequent identical concurrent callers to the existing unresolved promise rather than spawning new backend calls.",
      "Clean up the key from the in-flight map immediately upon promise resolution or rejection."
    ],
    ruInstructions: [
      "Регистрируйте активные промисы по ключу в потокобезопасной карте текущих запросов.",
      "Перенаправляйте параллельные идентичные вызовы к уже выполняющемуся промису без повторного обращения к бэкенду.",
      "Удаляйте ключ из реестра сразу после завершения или ошибки запроса."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-hedged-requests-tail-latency",
    name: "ControlFlowHedgedRequestsTailLatencySkill",
    displayName: "Hedged Requests & Tail Latency p99 Elimination (Jeff Dean Pattern)",
    categoryId: "controlFlow",
    description: "Issues redundant duplicate requests to backup servers when p95 latency threshold expires, taking whichever response arrives first.",
    tags: ["control-flow", "hedged-requests", "tail-latency", "distributed-systems", "p99"],
    sectionName: "Hedged Requests Speculative Execution Protocol",
    ruSectionName: "Спекулятивные параллельные запросы (Hedged Requests) для снижения p99 задержки",
    instructions: [
      "Send the primary request and start an aggressive timer set to historical p95 latency (e.g. 25ms).",
      "If no response arrives before timer expiration, dispatch a duplicate hedged request to a secondary replica node.",
      "Accept the first successful response to arrive and immediately cancel/abort the outstanding slower request via AbortController."
    ],
    ruInstructions: [
      "Отправляйте основной запрос и запускайте таймер, равный исторической p95 задержке (например, 25 мс).",
      "При отсутствии ответа до истечения таймера отправляйте параллельный дублирующий запрос на резервную реплику.",
      "Принимайте первый пришедший успешный ответ и отменяйте второй запрос через AbortController."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-transactional-outbox-cdc-pattern",
    name: "ControlFlowTransactionalOutboxCdcPatternSkill",
    displayName: "Transactional Outbox Pattern & CDC Broker Guarantees",
    categoryId: "controlFlow",
    description: "Guarantees dual-write consistency by persisting domain events to an outbox table in the same database transaction, polled via CDC.",
    tags: ["control-flow", "outbox-pattern", "cdc", "event-driven", "consistency"],
    sectionName: "Transactional Outbox & Event Publishing Architecture",
    ruSectionName: "Паттерн Transactional Outbox: атомарная запись событий домена и шины сообщений",
    instructions: [
      "Write business state mutations and event payloads into the database within the same atomic SQL transaction.",
      "Tail the database WAL log via Debezium CDC or an asynchronous outbox poller with deterministic message sequence numbers.",
      "Publish events to message broker with at-least-once delivery guarantees and mark outbox records as dispatched."
    ],
    ruInstructions: [
      "Записывайте изменения бизнес-сущностей и события в таблицу `outbox` в рамках единой ACID-транзакции.",
      "Считывайте события из журнала WAL через Debezium CDC или фоновый поллер с сохранением порядка сообщений.",
      "Публикуйте события в очередь с гарантией at-least-once и помечайте записи outbox как отправленные."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-fencing-tokens-distributed-lock",
    name: "ControlFlowFencingTokensDistributedLockSkill",
    displayName: "Distributed Locks with Monotonic Fencing Tokens (Martin Kleppmann)",
    categoryId: "controlFlow",
    description: "Prevents split-brain race conditions from GC pauses by issuing monotonically increasing fencing tokens validated by storage.",
    tags: ["control-flow", "distributed-lock", "fencing-tokens", "concurrency", "consistency"],
    sectionName: "Fencing Token Distributed Locking Protocol",
    ruSectionName: "Распределенные блокировки с монотонными Fencing Tokens (Защита от GC-пауз)",
    instructions: [
      "Every distributed lock acquisition must return a strictly monotonic incrementing integer fencing token.",
      "Clients must pass the fencing token alongside every write payload to the storage layer.",
      "Storage engines must reject any write bearing a token lower than the highest token processed so far."
    ],
    ruInstructions: [
      "Каждая успешная блокировка должна возвращать строго возрастающий целочисленный номер (Fencing Token).",
      "Клиент обязан передавать полученный токен во всех операциях записи в целевое хранилище.",
      "Хранилище обязано отвергать операции, номер токена которых меньше ранее зафиксированного максимума."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-scatter-gather-dynamic-quorum",
    name: "ControlFlowScatterGatherDynamicQuorumSkill",
    displayName: "Scatter-Gather Fan-Out with Dynamic Quorum Thresholds",
    categoryId: "controlFlow",
    description: "Broadcasts requests to N independent service nodes, resolving early as soon as a configurable quorum threshold (M of N) responds.",
    tags: ["control-flow", "scatter-gather", "quorum", "concurrency", "aggregation"],
    sectionName: "Scatter-Gather Quorum Protocol",
    ruSectionName: "Шаблон Scatter-Gather с динамическим кворумом (M из N ответов)",
    instructions: [
      "Fan-out queries simultaneously across all candidate provider nodes with a global timeout deadline.",
      "Collect responses into an atomic accumulator; trigger resolution callback as soon as quorum threshold is met.",
      "Short-circuit and abort remaining uncompleted node queries once quorum is satisfied."
    ],
    ruInstructions: [
      "Рассылайте запросы параллельно по всем узлам-исполнителям с установкой единого жесткого дедлайна.",
      "Собирайте ответы в накопитель и завершайте этап, как только достигнут порог кворума (например, 3 из 5).",
      "Прерывайте оставшиеся медленные вызовы сразу после сбора необходимого кворума ответов."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-abort-controller-cascade-cancellation",
    name: "ControlFlowAbortControllerCascadeCancellationSkill",
    displayName: "Hierarchical AbortController & Tree Cancellation Cascades",
    categoryId: "controlFlow",
    description: "Propagates cancellation signals down deep nested asynchronous call trees using linked AbortController signal hierarchies.",
    tags: ["control-flow", "abort-controller", "cancellation", "async", "typescript"],
    sectionName: "Hierarchical Cancellation Cascade Protocol",
    ruSectionName: "Иерархическая отмена асинхронных операций (Каскадный AbortController)",
    instructions: [
      "Link child `AbortSignal` instances to parent controller signals using `AbortSignal.any()` or event listeners.",
      "Check `signal.aborted` eagerly before executing heavy CPU parsing or outbound network requests.",
      "Pass the signal through to all `fetch()`, database queries, and timer promises to immediately free sockets."
    ],
    ruInstructions: [
      "Связывайте дочерние `AbortSignal` с родительскими сигналами через `AbortSignal.any()` или подписку на событие.",
      "Проверяйте флаг `signal.aborted` перед стартом ресурсоемких операций и парсинга.",
      "Передавайте сигнал во все вызовы `fetch()`, запросы к БД и таймеры для мгновенного освобождения сокетов."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-statechart-history-states-harel",
    name: "ControlFlowStatechartHistoryStatesHarelSkill",
    displayName: "Harel Statecharts: Shallow & Deep History State Transitions",
    categoryId: "controlFlow",
    description: "Preserves nested sub-state configurations during temporary interrupt transitions using Statechart History states ($H$ / $H^*$).",
    tags: ["control-flow", "statecharts", "fsm", "history-states", "xstate"],
    sectionName: "Statechart History State Transition Standards",
    ruSectionName: "Иерархические конечные автоматы (Statecharts): сохранение истории состояний",
    instructions: [
      "Define History pseudo-states within compound parent states to memorize active child sub-states.",
      "Target history state upon returning from temporary interrupt states (e.g. paused modal / auth re-prompt).",
      "Distinguish Shallow History (immediate child layer) from Deep History (all recursive sub-states)."
    ],
    ruInstructions: [
      "Задавайте псевдосостояния History ($H$) внутри составных состояний для запоминания активных подсостояний.",
      "Выполняйте возврат в состояние History после завершения временных прерываний (модальные окна, повторная авторизация).",
      "Разграничивайте поверхностную историю (Shallow History) и полную рекурсивную историю (Deep History)."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-poison-pill-dead-letter-triage",
    name: "ControlFlowPoisonPillDeadLetterTriageSkill",
    displayName: "Poison Pill Isolation & Dead-Letter Queue (DLQ) Auto-Triage",
    categoryId: "controlFlow",
    description: "Detects corrupted unprocessable messages (poison pills) in worker queues, isolating them to DLQ with diagnostic error traces.",
    tags: ["control-flow", "dlq", "poison-pill", "queue", "reliability"],
    sectionName: "Poison Pill & Dead-Letter Queue Triage Protocol",
    ruSectionName: "Изоляция ядовитых сообщений (Poison Pill) и авто-триаж Dead-Letter Queue",
    instructions: [
      "Track per-message failure delivery count in message metadata headers.",
      "Route message to DLQ immediately when retry count exceeds max threshold (e.g. 3 attempts) to unblock consumer workers.",
      "Append stack traces, host ID, and timestamp headers to the DLQ message envelope for rapid debugging."
    ],
    ruInstructions: [
      "Ведите счетчик неудачных попыток обработки в метаданных заголовков каждого сообщения.",
      "Перемещайте сообщение в очередь DLQ при превышении лимита попыток, предотвращая блокировку воркеров.",
      "Прикрепляйте трассировку ошибки, имя хоста и временную метку к телу сообщения в DLQ для диагностики."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-sse-fallback-long-polling-transport",
    name: "ControlFlowSseFallbackLongPollingTransportSkill",
    displayName: "Server-Sent Events (SSE) Graceful Downgrade to Long-Polling",
    categoryId: "controlFlow",
    description: "Maintains real-time streaming connections by falling back from HTTP/2 SSE to adaptive HTTP long-polling behind restrictive proxies.",
    tags: ["control-flow", "sse", "long-polling", "realtime", "transport-fallback"],
    sectionName: "Real-Time Transport Fallback Protocol",
    ruSectionName: "Автоматический переход с Server-Sent Events (SSE) на Long-Polling при сбоях прокси",
    instructions: [
      "Attempt primary connection via HTTP/2 streaming Server-Sent Events (SSE) with auto-reconnect heartbeat.",
      "Detect proxy buffer stalling or repeated premature connection termination within 15 seconds.",
      "Gracefully downgrade client transport to adaptive HTTP long-polling while preserving identical event interfaces."
    ],
    ruInstructions: [
      "Инициализируйте соединение через стриминг Server-Sent Events (SSE) с контролем heartbeat-сигналов.",
      "Фиксируйте блокировку буферизации прокси или частые обрывы соединения в течение первых 15 секунд.",
      "Бесшовно переключайте транспорт клиента на адаптивный Long-Polling с сохранением единого API событий."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-bloom-filter-idempotent-window",
    name: "ControlFlowBloomFilterIdempotentWindowSkill",
    displayName: "Scalable Bloom Filter Sliding-Window Idempotency Filter",
    categoryId: "controlFlow",
    description: "Performs ultra-fast $O(1)$ pre-filtering of duplicate webhook payloads using tiered in-memory Counting Bloom Filters.",
    tags: ["control-flow", "bloom-filter", "idempotency", "webhooks", "high-throughput"],
    sectionName: "Bloom Filter Idempotency Verification Protocol",
    ruSectionName: "Фильтр Блума для высокоскоростной дедупликации входящих вебхуков ($O(1)$)",
    instructions: [
      "Query a rotating pair of Counting Bloom Filters representing current and prior 10-minute time windows.",
      "If the Bloom filter returns FALSE, process the request immediately with zero database lookup latency.",
      "If the Bloom filter returns TRUE (possible duplicate), verify key presence in durable primary database store."
    ],
    ruInstructions: [
      "Проверяйте ключ по паре вращающихся фильтров Блума для текущего и предыдущего временных интервалов.",
      "Если фильтр возвращает FALSE (ключа точно нет), немедленно передавайте запрос в обработку без чтения БД.",
      "Если фильтр возвращает TRUE (возможный дубликат), выполняйте точную проверку по первичной базе данных."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-choreography-vs-orchestration-saga",
    name: "ControlFlowChoreographyVsOrchestrationSagaSkill",
    displayName: "Event-Driven Choreography vs Centralized Orchestrator Decision Engine",
    categoryId: "controlFlow",
    description: "Selects and implements event choreography for decoupled 2-3 step flows, or centralized state machine orchestrators for complex sagas.",
    tags: ["control-flow", "choreography", "orchestration", "microservices", "saga"],
    sectionName: "Saga Architecture Selection & Execution Standards",
    ruSectionName: "Выбор и реализация: хореография событий vs централизованный оркестратор Saga",
    instructions: [
      "Use Event Choreography for loose, 2-3 step asynchronous workflows with independent domain boundaries.",
      "Use Centralized State Orchestrators (Temporal / Step Functions) when workflows require complex compensation, timers, or auditability.",
      "Avoid distributed cyclic dependency loops in choreographed topologies by enforcing acyclic domain event flows."
    ],
    ruInstructions: [
      "Применяйте хореографию событий для простых 2–3 шаговых асинхронных процессов без единого координатора.",
      "Используйте централизованный оркестратор для сложных процессов с ветвлениями, таймерами и компенсациями.",
      "Исключайте циклические зависимости в хореографии, контролируя направленность потока событий домена."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-adaptive-load-shedding-queue-delay",
    name: "ControlFlowAdaptiveLoadSheddingQueueDelaySkill",
    displayName: "Adaptive Load Shedding based on CoDel Queue Sojourn Time",
    categoryId: "controlFlow",
    description: "Sheds incoming excess load dynamically when queue waiting time (sojourn time) exceeds target SLO thresholds (e.g. 50ms).",
    tags: ["control-flow", "load-shedding", "codel", "overload-protection", "resilience"],
    sectionName: "Queue Sojourn Time Load Shedding Protocol",
    ruSectionName: "Адаптивный сброс нагрузки (Load Shedding) по времени ожидания в очереди (CoDel)",
    instructions: [
      "Stamp incoming requests with entry timestamps upon entering the internal processing queue.",
      "Measure actual waiting time (sojourn delay) at the moment a worker pulls the task from the queue.",
      "Fast-drop non-critical background requests immediately with HTTP 503 if queue delay exceeds 50ms."
    ],
    ruInstructions: [
      "Фиксируйте точную временную метку поступления запроса в очередь обработки воркеров.",
      "Измеряйте фактическое время нахождения в очереди (Sojourn Delay) в момент взятия задачи в работу.",
      "Мгновенно сбрасывайте некритичные фоновые запросы с кодом 503, если задержка в очереди превышает лимит (50 мс)."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-worker-pool-work-stealing-deque",
    name: "ControlFlowWorkerPoolWorkStealingDequeSkill",
    displayName: "Work-Stealing Thread Pool with Lock-Free Double-Ended Queues",
    categoryId: "controlFlow",
    description: "Balances uneven multi-threaded CPU workloads by allowing idle threads to steal tasks from the tail of busy worker deques.",
    tags: ["control-flow", "work-stealing", "concurrency", "thread-pool", "performance"],
    sectionName: "Work-Stealing Worker Pool Architecture",
    ruSectionName: "Пул воркеров с алгоритмом Work-Stealing и двусторонними очередями (Deque)",
    instructions: [
      "Assign each worker thread a dedicated double-ended queue (deque); workers push and pop tasks from their own head.",
      "When a worker becomes idle, attempt to steal tasks from the tail of a randomly chosen peer worker's deque.",
      "Minimize lock contention using atomic lock-free CAS operations on deque heads and tails."
    ],
    ruInstructions: [
      "Выделяйте каждому потоку-воркеру собственную двустороннюю очередь (Deque) для локальных задач.",
      "При опустошении очереди воркер переходит в режим кражи задач с конца очереди случайного соседа.",
      "Минимизируйте блокировки с помощью атомарных неблокирующих операций Compare-And-Swap (CAS)."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-dynamic-route-intent-classifier",
    name: "ControlFlowDynamicRouteIntentClassifierSkill",
    displayName: "LLM Semantic Intent Classifier & Dynamic Route Dispatcher",
    categoryId: "controlFlow",
    description: "Routes user prompts to specialized downstream agents, tools, or fast-path regex handlers using semantic intent classification.",
    tags: ["control-flow", "intent-classifier", "routing", "agentic", "dispatch"],
    sectionName: "Semantic Intent Dynamic Routing Protocol",
    ruSectionName: "Семантический классификатор намерений и динамическая маршрутизация запросов",
    instructions: [
      "Evaluate incoming prompt against predefined route confidence scores and structured schema categories.",
      "Route high-confidence deterministic queries directly to zero-latency rule-based or SQL handlers.",
      "Dispatch ambiguous or multi-faceted queries to the primary conversational reasoning agent."
    ],
    ruInstructions: [
      "Классифицируйте входящий запрос по семантическим категориям и вероятностным оценкам намерений.",
      "Направляйте детерминированные типовые запросы напрямую в быстрые обработчики без вызова тяжелых моделей.",
      "Передавайте сложные составные запросы в основной агент рассуждений с сохранением контекста."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-multi-tier-fallback-ladder",
    name: "ControlFlowMultiTierFallbackLadderSkill",
    displayName: "Multi-Tier Degrading Fallback Ladder Architecture",
    categoryId: "controlFlow",
    description: "Executes cascading degradation steps (Primary API -> Cache Replica -> Compressed Heuristic -> Static Safe Defaults) on outages.",
    tags: ["control-flow", "fallback", "graceful-degradation", "resilience", "high-availability"],
    sectionName: "Multi-Tier Fallback Degradation Standards",
    ruSectionName: "Многоуровневая лестница резервных сценариев (Multi-Tier Fallback Ladder)",
    instructions: [
      "Tier 1: Live Primary Service execution with strict timeout.",
      "Tier 2: Stale Cache replica retrieval with soft warning headers.",
      "Tier 3: Algorithmic heuristic local approximation.",
      "Tier 4: Guaranteed static fallback response ensuring zero broken user UI states."
    ],
    ruInstructions: [
      "Уровень 1: Вызов основного сервиса в реальном времени с жестким таймаутом.",
      "Уровень 2: Чтение данных из кэша с пометкой об устаревании (Stale Cache).",
      "Уровень 3: Локальный эвристический расчет приближенного значения.",
      "Уровень 4: Гарантированный статический ответ по умолчанию, сохраняющий работоспособность интерфейса."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-two-phase-locking-deadlock-prevention",
    name: "ControlFlowTwoPhaseLockingDeadlockPreventionSkill",
    displayName: "Strict Two-Phase Locking (2PL) & Deadlock Prevention Ordering",
    categoryId: "controlFlow",
    description: "Prevents transactional deadlocks in multi-resource mutations by enforcing deterministic global resource acquisition ordering.",
    tags: ["control-flow", "2pl", "locking", "deadlock-prevention", "database"],
    sectionName: "2PL Deadlock Prevention Standards",
    ruSectionName: "Строгая двухфазная блокировка (2PL) и упорядочивание ресурсов против дедлоков",
    instructions: [
      "Acquire all locks during the expanding Growing Phase; release locks only during the Shrinking Phase after commit.",
      "Sort resource IDs in strictly ascending alphanumeric order before acquiring multiple simultaneous locks.",
      "Enforce lock acquisition timeouts (e.g. 5 seconds) with immediate rollback to break potential cycles."
    ],
    ruInstructions: [
      "Захватывайте все блокировки на растущей фазе (Growing Phase) и освобождайте только после завершения транзакции.",
      "Сортируйте идентификаторы блокируемых ресурсов в строго возрастающем порядке перед захватом.",
      "Устанавливайте предельный таймаут ожидания блокировки с немедленным откатом для предотвращения клинчей."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-conditional-feature-flag-rollout",
    name: "ControlFlowConditionalFeatureFlagRolloutSkill",
    displayName: "Multi-Variant Feature Flags & Dynamic Percentage Rollouts",
    categoryId: "controlFlow",
    description: "Evaluates user targeting rules, deterministic consistent-hash percentage bucketing, and emergency kill-switches.",
    tags: ["control-flow", "feature-flags", "rollout", "ab-testing", "devops"],
    sectionName: "Feature Flag Evaluation Protocol",
    ruSectionName: "Условные флаги фичей (Feature Flags) и процентный релиз по хэшу пользователя",
    instructions: [
      "Compute deterministic bucket allocation: `hash(userId + flagKey) % 100 < rolloutPercentage`.",
      "Evaluate targeted override rules (internal employees, beta cohorts) before global percentage bucketing.",
      "Support instantaneous client and server kill-switches that disable features without requiring code redeployments."
    ],
    ruInstructions: [
      "Вычисляйте детерминированное попадание в когорту: `hash(userId + flagKey) % 100 < процент_раскатки`.",
      "Проверяйте точечные правила переопределения (сотрудники, бета-тестеры) до применения общего процента.",
      "Обеспечивайте работу аварийных рубильников (Kill-Switches) для мгновенного отключения фичи без перезапуска."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-event-loop-microtask-macrotask-coordination",
    name: "ControlFlowEventLoopMicrotaskMacrotaskCoordinationSkill",
    displayName: "V8 Event Loop Scheduling: Microtasks vs Macrotasks vs requestAnimationFrame",
    categoryId: "controlFlow",
    description: "Schedules browser and Node.js tasks precisely across `queueMicrotask`, `Promise.then`, `setImmediate`, and `requestAnimationFrame`.",
    tags: ["control-flow", "event-loop", "microtasks", "macrotasks", "javascript-runtime"],
    sectionName: "Event Loop Task Scheduling Standards",
    ruSectionName: "Планирование задач Event Loop: Microtasks, Macrotasks и requestAnimationFrame",
    instructions: [
      "Use `queueMicrotask()` for high-priority state mutations that must resolve before the next DOM render cycle.",
      "Use `requestAnimationFrame()` for visual layout recalculations and animation updates synced to display refresh.",
      "Use `setTimeout(..., 0)` or `setImmediate()` to yield the main thread and break up long-running CPU loops."
    ],
    ruInstructions: [
      "Используйте `queueMicrotask()` для синхронных изменений состояния, которые должны завершиться до перерисовки DOM.",
      "Применяйте `requestAnimationFrame()` для анимаций и перерасчета стилей, привязанных к кадровой частоте дисплея.",
      "Используйте `setTimeout(0)` или `setImmediate()` для уступки главного потока и предотвращения зависания UI."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-stream-chunking-windowed-aggregation",
    name: "ControlFlowStreamChunkingWindowedAggregationSkill",
    displayName: "Streaming Chunk Aggregation & Sliding-Window Time Buffers",
    categoryId: "controlFlow",
    description: "Groups high-frequency real-time stream chunks into time-windowed batches (e.g. every 100ms or 50 items) for bulk database ingestion.",
    tags: ["control-flow", "streaming", "batching", "aggregation", "buffers"],
    sectionName: "Streaming Chunk Aggregation Standards",
    ruSectionName: "Пакетная агрегация потоковых данных по временным окнам (Time-Windowed Buffers)",
    instructions: [
      "Buffer incoming items until either batch size limit (e.g. 100 items) or maximum buffer time (e.g. 100ms) is reached.",
      "Flush buffers immediately upon receiving upstream stream end (`EOF`) or process termination signals.",
      "Execute bulk insertion queries (`INSERT INTO ... VALUES (...)`) to maximize database write IOPS efficiency."
    ],
    ruInstructions: [
      "Накапливайте элементы в буфере до достижения лимита размера (100 шт) или таймаута (100 мс).",
      "Принудительно сбрасывайте буфер при получении сигнала завершения потока (`EOF`) или остановке сервиса.",
      "Выполняйте пакетную запись единым запросом для оптимизации операций ввода-вывода (IOPS)."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-retry-after-http-429-respect",
    name: "ControlFlowRetryAfterHttp429RespectSkill",
    displayName: "HTTP 429 Rate-Limit & Server `Retry-After` Header Adherence",
    categoryId: "controlFlow",
    description: "Parses and strictly respects server `Retry-After` (seconds / HTTP date) headers, pausing client execution queues dynamically.",
    tags: ["control-flow", "retry-after", "http-429", "rate-limiting", "resilience"],
    sectionName: "HTTP 429 Retry-After Adherence Standards",
    ruSectionName: "Корректная обработка HTTP 429 и соблюдение серверного заголовка Retry-After",
    instructions: [
      "Extract and parse `Retry-After` header value (handling both integer seconds and RFC 7231 HTTP date formats).",
      "Pause all outbound client requests sharing the same rate-limit domain bucket until the deadline passes.",
      "Add a small randomized delta (100-500ms jitter) to the wait duration to prevent synchronized wave rebounds."
    ],
    ruInstructions: [
      "Извлекайте значение заголовка `Retry-After` с поддержкой формата секунд и даты RFC 7231.",
      "Приостанавливайте отправку новых запросов к данному домену до истечения указанного времени ожидания.",
      "Добавляйте случайный джиттер (100–500 мс) к интервалу ожидания для защиты от одновременных повторов."
    ],
    semanticType: "protocol"
  }
];

// Append first batch for Control Flow
console.log('Appending 20 Control Flow skills...');
appendSkills('controlFlow', CONTROL_FLOW_40);

