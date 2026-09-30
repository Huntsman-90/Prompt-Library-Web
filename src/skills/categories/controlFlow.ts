import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const CONTROL_FLOW_SKILLS: Record<string, SkillDefinition> = {
  'conditional-branching': {
    id: 'conditional-branching',
    name: 'ConditionalBranchingSkill',
    displayName: 'Conditional Branching & Logic Gates (If/Else)',
    categoryId: 'control_flow',
    description: 'Implements deterministic conditional branches (IF condition THEN route A ELSE route B) with explicit predicates.',
    tags: ['control_flow', 'conditional', 'branching', 'if-else', 'routing', 'logic'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Протокол Условного Ветвления (If-Else Logic)',
        'Conditional Branching & Predicate Routing Protocol',
        [
          '- **Явные предикаты**: Проверить входящие параметры: `IF [условие X выполнено] -> следовать Сценарию 1; ELSE IF [условие Y] -> следовать Сценарию 2; ELSE -> Дефолтный сценарий`.',
          '- **Исключение неоднозначности**: Каждое условие должно однозначно вычисляться в `true` или `false` без субъективных трактовок.',
          '- **Полное покрытие веток**: Гарантировать, что ни один возможный ввод не остается без обработчика.',
        ],
        [
          '- **Explicit Boolean Predicates**: Evaluate input variables: `IF [condition X] -> Route A; ELSE IF [condition Y] -> Route B; ELSE -> Default Route`.',
          '- **Zero Ambiguity**: Ensure each routing predicate evaluates deterministically to boolean TRUE or FALSE.',
          '- **Exhaustive Branch Coverage**: Guarantee zero unhandled edge states across all input permutations.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'fallback-routing': {
    id: 'fallback-routing',
    name: 'FallbackRoutingSkill',
    displayName: 'Graceful Fallback & Degradation Routing',
    categoryId: 'control_flow',
    description: 'Routes execution to safe fallback handlers and degraded operational modes upon primary failure.',
    tags: ['control_flow', 'fallback', 'degradation', 'resilience', 'routing'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Маршрутизация на Резервный Сценарий (Fallback Protocol)',
        'Graceful Fallback & Degradation Routing Protocol',
        [
          '- **Детекция сбоя основного пути**: При таймауте, невалидном ответе или недоступности данных переключиться на резервный контур.',
          '- **Режим плавной деградации**: Предоставить базовую функциональность из локального кэша или эвристических правил вместо аварийного падения.',
          '- **Прозрачное информирование**: Сопроводить fallback-ответ сервисным маркером `[DEGRADED_MODE_ACTIVE]`.',
        ],
        [
          '- **Primary Path Failure Detection**: Trigger fallback upon timeout, schema violation, or upstream service unavailability.',
          '- **Graceful Degradation**: Serve baseline cached heuristics rather than emitting catastrophic hard exceptions.',
          '- **Telemetry Flagging**: Tag degraded execution responses with an explicit `[DEGRADED_MODE_ACTIVE]` marker.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'switch-case-dispatcher': {
    id: 'switch-case-dispatcher',
    name: 'SwitchCaseDispatcherSkill',
    displayName: 'Multi-Way Switch/Case Intent Dispatcher',
    categoryId: 'control_flow',
    description: 'Dispatches execution across N discrete domain handlers based on classified user intent or entity type.',
    tags: ['control_flow', 'switch', 'dispatcher', 'intent', 'routing', 'classification'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Диспетчеризация Намерений (Switch-Case Dispatcher)',
        'Multi-Way Intent Switch/Case Dispatcher Protocol',
        [
          '- **Классификация намерения**: Определить категорию запроса (например: `[BUG_REPORT]`, `[FEATURE_REQUEST]`, `[BILLING_INQUIRY]`, `[GENERAL_QUESTION]`).',
          '- **Диспетчеризация**: Направить запрос в специализированный обработчик с соответствующими правилами и ограничениями.',
          '- **Default Handler**: Для нераспознанных категорий использовать безопасный обработчик с запросом уточнения.',
        ],
        [
          '- **Intent Classification**: Classify incoming payload into discrete enums (e.g. `[BUG_REPORT]`, `[FEATURE_REQUEST]`, `[BILLING_INQUIRY]`, `[GENERAL_QUESTION]`).',
          '- **Targeted Dispatch**: Route payload to domain-specific handler with tuned system prompts and schemas.',
          '- **Default Handler**: Provide a resilient default fallback prompting the user for parameter disambiguation.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'early-exit-guard': {
    id: 'early-exit-guard',
    name: 'EarlyExitGuardSkill',
    displayName: 'Early Exit & Precondition Guard Clauses',
    categoryId: 'control_flow',
    description: 'Enforces guard clauses at the very start of execution, bailing out early on invalid inputs or safety violations.',
    tags: ['control_flow', 'guard-clause', 'early-exit', 'preconditions', 'validation'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Предохранительные Условия и Ранний Выход (Early Exit Guards)',
        'Early Exit Guard Clauses & Precondition Validation',
        [
          '- **Проверка предусловий**: Перед началом тяжелых вычислений проверить валидность всех обязательных аргументов.',
          '- **Ранний возврат (Bail Out)**: Если хотя бы одно обязательное поле отсутствует или нарушает безопасность, немедленно прервать выполнение с понятным сообщением об ошибке.',
          '- **Экономия ресурсов**: Не выполнять последующие блоки алгоритма при нарушении условий раннего выхода.',
        ],
        [
          '- **Precondition Gate**: Audit mandatory input variables and security flags prior to invoking complex reasoning.',
          '- **Immediate Bail Out**: If critical preconditions fail, abort execution immediately with a structured diagnostic error.',
          '- **Compute Preservation**: Halt downstream execution entirely to eliminate wasted token consumption.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'loop-iteration-controller': {
    id: 'loop-iteration-controller',
    name: 'LoopIterationControllerSkill',
    displayName: 'Bounded Loop & Iteration Controller',
    categoryId: 'control_flow',
    description: 'Controls bounded iterative refinement loops with explicit termination conditions and convergence checks.',
    tags: ['control_flow', 'loop', 'iteration', 'convergence', 'termination'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Контроль Циклов и Сходимости (Bounded Loop Controller)',
        'Bounded Iteration Loop & Convergence Protocol',
        [
          '- **Условие продолжения цикла**: Повторять шаг улучшения до тех пор, пока выполняется условие `delta > threshold` и `iteration < MAX_LOOPS`.',
          '- **Проверка сходимости**: Измерять величину улучшения на каждой итерации; при отсутствии прогресса (плато) принудительно завершить цикл.',
          '- **Финальный возврат лучшего состояния**: Сохранять лучший полученный результат и возвращать его при выходе из цикла.',
        ],
        [
          '- **Loop Invariant**: Continue iterative refinement while `delta > epsilon` and `iteration < MAX_LOOPS`.',
          '- **Convergence Check**: Measure metric improvement delta per cycle; break immediately upon detecting plateau stagnation.',
          '- **Best State Emittance**: Persist and emit the highest-scoring candidate artifact generated across all iterations.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'checkpoint-state-save': {
    id: 'checkpoint-state-save',
    name: 'CheckpointStateSaveSkill',
    displayName: 'Transactional Checkpoint & State Snapshot',
    categoryId: 'control_flow',
    description: 'Saves serialized state snapshots after every successful stage to allow idempotent resumption.',
    tags: ['control_flow', 'checkpoint', 'state', 'snapshot', 'transactional', 'recovery'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Транзакционные Контрольные Точки (State Checkpointing)',
        'Transactional State Checkpoint & Snapshot Protocol',
        [
          '- **Снимок состояния после каждого этапа**: Сохранять сериализованный JSON-снимок прогресса после успешного завершения каждого макро-шага.',
          '- **Идемпотентное возобновление**: При прерывании сессии восстанавливать выполнение строго с последнего сохраненного чекпоинта.',
          '- **Консистентность данных**: Проверять валидность снимка перед сохранением в постоянное хранилище.',
        ],
        [
          '- **Post-Stage Snapshot**: Serialize execution state into a clean JSON snapshot payload after every verified milestone.',
          '- **Idempotent Resume**: Resume interrupted pipelines seamlessly from the latest verified checkpoint without recomputing earlier stages.',
          '- **State Integrity Validation**: Verify schema integrity of snapshot state before writing to persistent storage.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'parallel-fork-join': {
    id: 'parallel-fork-join',
    name: 'ParallelForkJoinSkill',
    displayName: 'Parallel Fork-Join Concurrency Flow',
    categoryId: 'control_flow',
    description: 'Forks independent tasks into concurrent branches and joins/merges partial outputs via barrier synchronization.',
    tags: ['control_flow', 'fork-join', 'parallel', 'concurrency', 'barrier', 'sync'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Параллельное Ветвление и Слияние (Fork-Join Protocol)',
        'Parallel Fork-Join Concurrency & Barrier Synchronization',
        [
          '- **Фаза Fork (Разделение)**: Разбить независимые подзадачи на параллельные потоки вычислений.',
          '- **Барьер синхронизации (Barrier)**: Дождаться завершения всех параллельных потоков либо истечения общего таймаута.',
          '- **Фаза Join (Слияние)**: Агрегировать частичные результаты в единый непротиворечивый документ с разрешением конфликтов.',
        ],
        [
          '- **Fork Phase**: Split decoupled subtasks into concurrent processing threads.',
          '- **Synchronization Barrier**: Await completion of all concurrent branches or overall timeout deadline.',
          '- **Join Phase**: Synthesize and reconcile partial deliverables into a unified, conflict-free master artifact.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'circuit-breaker-pattern': {
    id: 'circuit-breaker-pattern',
    name: 'CircuitBreakerPatternSkill',
    displayName: 'Circuit Breaker State Machine',
    categoryId: 'control_flow',
    description: 'Implements Closed -> Open -> Half-Open circuit breaker states to halt requests to failing downstream services.',
    tags: ['control_flow', 'circuit-breaker', 'resilience', 'fault-tolerance', 'traffic'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Шаблон Автоматического Размыкателя Цепи (Circuit Breaker)',
        'Circuit Breaker Resilience Protocol',
        [
          '- **Closed (Нормальная работа)**: Пропускать все запросы, подсчитывая процент ошибок.',
          '- **Open (Размыкание цепи)**: При превышении порога ошибок (например, 50% сбоев) мгновенно отклонять последующие вызовы без ожидания таймаута.',
          '- **Half-Open (Пробный режим)**: Через заданный интервал пропустить 1 пробный запрос для проверки восстановления сервиса.',
        ],
        [
          '- **Closed State**: Normal flow; track consecutive error count and error rate percentages.',
          '- **Open State**: Trip circuit breaker when error threshold is breached; fail fast immediately without blocking.',
          '- **Half-Open State**: After cooldown, dispatch limited probe requests to verify downstream health before closing circuit.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'priority-queue-scheduling': {
    id: 'priority-queue-scheduling',
    name: 'PriorityQueueSchedulingSkill',
    displayName: 'Weighted Priority Queue Scheduling',
    categoryId: 'control_flow',
    description: 'Schedules and sequences task execution based on weighted priority scores (SLA, customer tier, criticality).',
    tags: ['control_flow', 'scheduling', 'priority', 'queue', 'sla', 'concurrency'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Приоритетное Планирование Задач (Priority Queue)',
        'Weighted Priority Queue Task Scheduling Protocol',
        [
          '- **Расчет веса задачи**: Вычислить $Priority = (Критичность \\times 3) + (SLA \\times 2) - Сложность$.',
          '- **Упорядочивание очереди**: Выполнять задачи строго в порядке убывания приоритета.',
          '- **Защита от голодания (Starvation Prevention)**: Постепенно повышать приоритет низкоприоритетных задач по мере времени их ожидания.',
        ],
        [
          '- **Priority Scoring**: Compute task weight: $Priority = (Criticality \\times 3) + (SLABreachRisk \\times 2) - Complexity$.',
          '- **Queue Sorting**: Dispatch queued tasks in strict descending order of priority score.',
          '- **Starvation Aging**: Progressively increment priority scores of long-waiting low-priority tasks to guarantee execution.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'backpressure-throttling': {
    id: 'backpressure-throttling',
    name: 'BackpressureThrottlingSkill',
    displayName: 'Backpressure & Rate Throttling Flow',
    categoryId: 'control_flow',
    description: 'Regulates ingestion and processing flow when downstream consumers experience saturation or buffer pressure.',
    tags: ['control_flow', 'backpressure', 'throttling', 'flow-control', 'buffers', 'rate-limit'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Управление Противодавлением (Backpressure Flow Control)',
        'Backpressure & Rate Throttling Protocol',
        [
          '- **Мониторинг заполнения буфера**: Отслеживать размер очереди обработки; при заполнении > 80% сигнализировать о перегрузке.',
          '- **Снижение входящей скорости (Throttling)**: Замедлить генерацию новых запросов или временно отвечать кодом 429 (Too Many Requests).',
          '- **Плавное восстановление**: Возвращаться к полной скорости работы постепенно после снижения нагрузки ниже 40%.',
        ],
        [
          '- **Buffer Pressure Monitoring**: Continuously track worker queue depth; trigger backpressure signals when capacity exceeds 80%.',
          '- **Rate Throttling**: Throttle upstream ingest rate or return HTTP 429 Retry-After responses to balance processing flow.',
          '- **Gradual Ramp-Up**: Gradually restore full processing velocity only after consumer queues drop below 40% threshold.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'compensating-transaction-saga': {
    id: 'compensating-transaction-saga',
    name: 'CompensatingTransactionSagaSkill',
    displayName: 'Saga Pattern & Compensating Transactions',
    categoryId: 'control_flow',
    description: 'Coordinates multi-step distributed workflows, applying reverse compensating actions on any intermediate step failure.',
    tags: ['control_flow', 'saga', 'transactions', 'rollback', 'distributed', 'compensation'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Паттерн Saga и Компенсирующие Транзакции',
        'Compensating Transaction Saga Protocol',
        [
          '- **Прямые шаги (Forward Actions)**: Выполнять цепочку шагов `A -> B -> C`, сохраняя журнал выполненных действий.',
          '- **Компенсирующие действия (Rollback Actions)**: Для каждого прямого шага определить компенсирующее обратное действие (`Undo_A`, `Undo_B`, `Undo_C`).',
          '- **Откат при сбое**: Если шаг C завершился ошибкой, автоматически выполнить `Undo_B` и `Undo_A` в обратном порядке для сохранения консистентности.',
        ],
        [
          '- **Forward Execution Chain**: Execute distributed workflow steps `Step_1 -> Step_2 -> Step_3`, logging successful commits.',
          '- **Compensating Action Pairs**: Pair every mutating step with a deterministic compensating action (`Rollback_1`, `Rollback_2`).',
          '- **Reverse Cascade Rollback**: If step 3 fails, execute `Rollback_2` and `Rollback_1` in reverse order to preserve global consistency.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'dead-letter-quarantine': {
    id: 'dead-letter-quarantine',
    name: 'DeadLetterQuarantineSkill',
    displayName: 'Dead Letter Queue (DLQ) Quarantine',
    categoryId: 'control_flow',
    description: 'Isolates poisoned, malformed, or unparseable payloads into a quarantine queue without blocking global execution.',
    tags: ['control_flow', 'dlq', 'quarantine', 'poison-pill', 'error-handling'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Изоляция Сбойных Запросов (Dead Letter Queue / DLQ)',
        'Dead Letter Queue (DLQ) Quarantine Protocol',
        [
          '- **Детекция неисправимых ошибок**: Распознавать «отравленные» сообщения (Poison Pills), вызывающие повторный сбой после 3 попыток.',
          '- **Изоляция в DLQ**: Перемещать сбойный payload в изолированное хранилище DLQ с метаданными ошибки для последующего ручного анализа.',
          '- **Непрерывность основного конвейера**: Продолжать обработку остальных сообщений из очереди без задержек и простоев.',
        ],
        [
          '- **Poison Pill Detection**: Classify unprocessable, unparseable messages that repeatedly fail retry thresholds.',
          '- **DLQ Isolation**: Route offending payloads to an isolated Dead Letter Queue with full execution stack trace and context metadata.',
          '- **Uninterrupted Pipeline**: Continue processing downstream queue items without blocking system throughput.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'event-driven-trigger': {
    id: 'event-driven-trigger',
    name: 'EventDrivenTriggerSkill',
    displayName: 'Event-Driven Reactive Trigger Hooks',
    categoryId: 'control_flow',
    description: 'Binds execution flows to discrete lifecycle event triggers (e.g. onUserCreated, onQuotaExceeded, onStateChanged).',
    tags: ['control_flow', 'events', 'pubsub', 'triggers', 'hooks', 'reactive'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Событийно-Ориентированные Триггеры (Event-Driven Hooks)',
        'Event-Driven Reactive Trigger Protocol',
        [
          '- **Подписка на события**: Определить точные сигнатуры событий: `ON [EventName] DO [WorkflowHandler]`.',
          '- **Асинхронная реакция**: Запускать обработчики событий асинхронно без блокировки основного потока выполнения.',
          '- **Гарантия доставки**: Использовать семантику «at-least-once» с обязательной дедупликацией на стороне обработчика.',
        ],
        [
          '- **Event Subscriptions**: Declare explicit event hooks: `ON [Event_Signature] DISPATCH [Async_Workflow_Handler]`.',
          '- **Asynchronous Non-Blocking Execution**: Dispatch reactive handlers decoupled from primary execution thread.',
          '- **At-Least-Once Delivery**: Enforce at-least-once event delivery semantics with idempotent receiver deduplication.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'hysteresis-debounce-filter': {
    id: 'hysteresis-debounce-filter',
    name: 'HysteresisDebounceFilterSkill',
    displayName: 'Hysteresis & Debounce Decision Filter',
    categoryId: 'control_flow',
    description: 'Applies debounce timers and hysteresis thresholds to prevent rapid flapping between competing decision states.',
    tags: ['control_flow', 'hysteresis', 'debounce', 'flapping', 'stability', 'thresholds'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Фильтр Гистерезиса и Устранение Дребезга (Debounce Protocol)',
        'Hysteresis & Debounce State Stabilization Protocol',
        [
          '- **Устранение дребезга (Debounce)**: Игнорировать высокочастотные колебания входных данных, реагируя только на устойчивый сигнал (тишина >= T ms).',
          '- **Порог гистерезиса**: Задать разные пороги для включения и выключения состояния (например: Включение при CPU > 85%, Выключение при CPU < 65%).',
          '- **Стабилизация системы**: Защитить систему от постоянного бесполезного переключения между режимами работы.',
        ],
        [
          '- **Signal Debouncing**: Suppress high-frequency transient oscillations, triggering state transitions only after signal settles for T ms.',
          '- **Hysteresis Dual Thresholds**: Separate state activation and deactivation thresholds (e.g. Scale-Up at >85% load, Scale-Down at <65% load).',
          '- **Flapping Prevention**: Eliminate erratic flapping cycles between active and standby operating modes.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

'retry-with-exponential-backoff': {
    id: 'retry-with-exponential-backoff',
    name: 'RetryWithExponentialBackoffSkill',
    displayName: 'Exponential Backoff Retry Strategy',
    categoryId: 'control_flow',
    description: 'Governs transient failures with exponential delay progression, maximum attempt thresholds, and full jitter.',
    tags: ['control_flow', 'retry', 'backoff', 'jitter', 'transient-errors', 'resilience'],
    transform: createStandardSkillTransform(
      'protocol',
      'Протокол Повторных Попыток с Экспоненциальной Задержкой',
      'Exponential Backoff Retry Control Protocol',
      [
        '- **Интервалы повторов**: При временных сбоях вычислять задержку: delay = min(max_delay, initial_delay * 2^attempt) + random_jitter.',
        '- **Критерий прекращения**: Прерывать попытки после N неудач (по умолчанию 3) и перенаправлять задачу в аварийный поток.',
        '- **Идемпотентность повторов**: Убедиться, что повторные попытки безопасны и не создают дублирующих побочных эффектов.',
      ],
      [
        '- **Backoff Progression**: On transient failures, compute backoff: delay = min(max_delay, initial_delay * 2^attempt) + random_jitter.',
        '- **Ceiling Condition**: Terminate retries strictly upon exhausting N attempts (default 3), diverting control to fallback handler.',
        '- **Idempotency Guarantee**: Guarantee re-executed requests are side-effect safe and replay-tolerant.',
      ]
    ),
  },

  'sliding-window-rate-limiter': {
    id: 'sliding-window-rate-limiter',
    name: 'SlidingWindowRateLimiterSkill',
    displayName: 'Sliding Window Rate Limiter & Token Bucket',
    categoryId: 'control_flow',
    description: 'Enforces rate limits using a sliding window or token bucket algorithm with proactive throttling and rejection codes.',
    tags: ['control_flow', 'rate-limiter', 'sliding-window', 'token-bucket', 'throttling', 'traffic'],
    transform: createStandardSkillTransform(
      'constraints',
      'Управление Трафиком (Sliding Window Rate Limiting)',
      'Sliding Window Rate Limiter & Flow Regulation Protocol',
      [
        '- **Скользящее окно**: Отслеживать количество событий за последние W секунд, не допуская превышения лимита Rps.',
        '- **Реакция на превышение**: При исчерпании лимита возвращать HTTP 429 Too Many Requests с заголовком Retry-After.',
        '- **Плавное сглаживание**: Использовать алгоритм Token Bucket для сглаживания кратковременных всплесков запросов.',
      ],
      [
        '- **Sliding Window Tracking**: Calculate transaction velocity within rolling W-second windows, capping volume at declared thresholds.',
        '- **Rejection Contract**: When limits are exceeded, emit deterministic HTTP 429 Too Many Requests payloads with Retry-After headers.',
        '- **Burst Smoothing**: Employ Token Bucket smoothing to accommodate transient traffic bursts without destabilizing downstream systems.',
      ]
    ),
  },

  'two-phase-commit-coordinator': {
    id: 'two-phase-commit-coordinator',
    name: 'TwoPhaseCommitCoordinatorSkill',
    displayName: 'Two-Phase Commit (2PC) Distributed Coordinator',
    categoryId: 'control_flow',
    description: 'Coordinates atomic multi-service state changes using Prepare and Commit/Rollback phases with recovery log.',
    tags: ['control_flow', '2pc', 'distributed-transactions', 'coordination', 'atomic', 'consensus'],
    transform: createStandardSkillTransform(
      'protocol',
      'Протокол Двухфазной Фиксации (Two-Phase Commit Coordinator)',
      'Two-Phase Commit (2PC) Distributed Coordination Architecture',
      [
        '- **Фаза 1 (Prepare)**: Разослать запрос готовности всем участникам транзакции; ожидать утвердительного ответа от 100% сервисов.',
        '- **Фаза 2 (Commit / Rollback)**: Если все участники готовы — отправить команду Commit; если хотя бы один ответил отказом — отправить глобальный Rollback.',
        '- **Логирование состояний**: Записывать каждое решение в журнал транзакций до отправки команд участникам.',
      ],
      [
        '- **Phase 1 (Prepare Phase)**: Broadcast prepare directives to all participant nodes; await unanimous affirmative votes.',
        '- **Phase 2 (Commit or Abort)**: If 100% vote ready, broadcast global Commit; on any negative response, execute global Abort.',
        '- **Write-Ahead Decision Logging**: Persist state transitions to persistent coordinator WAL before dispatching network commit calls.',
      ]
    ),
  },

  'workflow-state-machine-fsm': {
    id: 'workflow-state-machine-fsm',
    name: 'WorkflowStateMachineFsmSkill',
    displayName: 'Finite State Machine (FSM) Lifecycle Engine',
    categoryId: 'control_flow',
    description: 'Models complex entity workflows as formal Finite State Machines with explicit states, events, guards, and transition tables.',
    tags: ['control_flow', 'fsm', 'state-machine', 'transitions', 'lifecycle', 'deterministic'],
    transform: createStandardSkillTransform(
      'protocol',
      'Архитектура Конечного Автомата Состояний (FSM Protocol)',
      'Finite State Machine (FSM) Lifecycle Specification',
      [
        '- **Таблица состояний**: Задать полный перечень состояний: Initial, Pending, InProgress, Review, Completed, Failed.',
        '- **Валидация переходов**: Разрешать переход из State_A в State_B только при наступлении определенного события Event и выполнении Guard-условия.',
        '- **Защита от невалидных переходов**: Попытка недопустимого перехода должна выбрасывать строгое исключение IllegalStateTransition.',
      ],
      [
        '- **State Enumeration**: Declare exhaustive set of discrete lifecycle states: Initial, Pending, Active, Suspended, Settled, Terminated.',
        '- **Transition Guard Contracts**: Permit state transition A -> B strictly when triggered by designated Event and satisfying Guard predicates.',
        '- **Illegal Transition Interception**: Intercept and reject undeclared transition vectors with typed IllegalStateTransition exceptions.',
      ]
    ),
  },

  'event-fanout-broadcast': {
    id: 'event-fanout-broadcast',
    name: 'EventFanoutBroadcastSkill',
    displayName: 'Event Fan-Out & Multi-Consumer Dispatch',
    categoryId: 'control_flow',
    description: 'Dispatches single incoming events to multiple independent worker queues or downstream subscribers in parallel.',
    tags: ['control_flow', 'fan-out', 'broadcast', 'pub-sub', 'event-bus', 'async'],
    transform: createStandardSkillTransform(
      'protocol',
      'Протокол Веерной Рассылки Событий (Event Fan-Out Broadcast)',
      'Event Fan-Out & Parallel Consumer Broadcast Protocol',
      [
        '- **Топик и подписчики**: Публиковать входящее событие в шину (Topic), автоматически дублируя его в очереди всех зарегистрированных консьюмеров.',
        '- **Изоляция сбоев подписчиков**: Сбой или задержка одного консьюмера не должны влиять на обработку события остальными подписчиками.',
        '- **Фильтрация на стороне брокера**: Подписчики могут получать только события, удовлетворяющие их правилам фильтрации.',
      ],
      [
        '- **Pub-Sub Demux**: Ingest singular source events and dispatch replicated payloads across all subscriber queues concurrently.',
        '- **Consumer Fault Isolation**: Guarantee slow or failing subscriber queues cannot impede message delivery to sibling consumers.',
        '- **Broker-Side Filtering**: Support attribute-based message filtering so subscribers ingest only relevant event subsets.',
      ]
    ),
  },

  'task-cancellation-token': {
    id: 'task-cancellation-token',
    name: 'TaskCancellationTokenSkill',
    displayName: 'Asynchronous Task Cancellation Token Protocol',
    categoryId: 'control_flow',
    description: 'Propagates cooperative cancellation signals across asynchronous execution hierarchies via AbortSignal / CancellationToken.',
    tags: ['control_flow', 'cancellation', 'abort-signal', 'async', 'timeout', 'teardown'],
    transform: createStandardSkillTransform(
      'protocol',
      'Протокол Кооперативной Отмены Задач (Cancellation Token)',
      'Cooperative Task Cancellation & AbortSignal Protocol',
      [
        '- **Проброс сигнала отмены**: Передавать AbortSignal во все вложенные асинхронные вызовы и сетевые запросы.',
        '- **Регулярная проверка отмены**: В длинных циклах проверять наличие сигнала отмены перед каждым тяжелым шагом.',
        '- **Очистка ресурсов**: При получении сигнала немедленно закрывать открытые сокеты, файлы и освобождать временные ресурсы.',
      ],
      [
        '- **AbortSignal Propagation**: Thread AbortSignal instances through all nested asynchronous boundaries and fetch operations.',
        '- **Periodic Cancellation Check**: Audit cancellation signal invariants prior to initiating heavyweight computational turns.',
        '- **Teardown Guarantees**: Immediately release file descriptors, database connections, and memory buffers upon abort notification.',
      ]
    ),
  },

  'bulkhead-isolation-partition': {
    id: 'bulkhead-isolation-partition',
    name: 'BulkheadIsolationPartitionSkill',
    displayName: 'Bulkhead Resource Isolation & Thread Partitioning',
    categoryId: 'control_flow',
    description: 'Partitions thread pools, memory quotas, and connection pools across tenants to prevent cascading resource starvation.',
    tags: ['control_flow', 'bulkhead', 'isolation', 'tenants', 'thread-pool', 'resilience'],
    transform: createStandardSkillTransform(
      'constraints',
      'Изоляция Ресурсов по Паттерну Bulkhead (Отсеки Живучести)',
      'Bulkhead Resource Isolation & Tenant Partitioning Architecture',
      [
        '- **Разделение пулов потоков**: Выделить изолированные пулы потоков и соединений для критических и фоновых задач.',
        '- **Защита от исчерпания ресурсов**: Перегрузка одного арендатора (tenant) или модуля не должна лишать ресурсов остальные компоненты системы.',
        '- **Ограничение очередей**: Задавать жесткий предел глубины очереди для каждого отсека с немедленным отбоем при переполнении.',
      ],
      [
        '- **Partitioned Execution Pools**: Assign isolated thread and connection pools across distinct service categories and critical workflows.',
        '- **Starvation Prevention**: Prevent anomalous traffic spikes in a single tenant from starving resources of adjacent workloads.',
        '- **Bounded Queue Capacities**: Enforce strict capacity limits per bulkhead partition, shedding excess loads instantly.',
      ]
    ),
  },

  'scatter-gather-aggregator': {
    id: 'scatter-gather-aggregator',
    name: 'ScatterGatherAggregatorSkill',
    displayName: 'Scatter-Gather Parallel Query Aggregator',
    categoryId: 'control_flow',
    description: 'Broadcasts requests to N heterogeneous data sources in parallel, collecting and merging results within a strict SLA deadline.',
    tags: ['control_flow', 'scatter-gather', 'parallel', 'aggregation', 'timeout', 'sla'],
    transform: createStandardSkillTransform(
      'protocol',
      'Протокол Scatter-Gather (Параллельный Сбор и Агрегация)',
      'Scatter-Gather Parallel Query & Result Aggregation Protocol',
      [
        '- **Фаза Scatter (Рассылка)**: Одновременно отправить запрос к N микросервисам или источникам данных.',
        '- **Таймаут сбора (Gather)**: Установить жесткий лимит ожидания (SLA, например 250 мс); собрать все ответившие узлы.',
        '- **Обработка неполных данных**: При задержке отдельных источников сформировать агрегированный ответ на основе доступных данных с флагом partial: true.',
      ],
      [
        '- **Scatter Phase**: Dispatch parallel queries across N heterogeneous downstream data endpoints simultaneously.',
        '- **Gather Deadline SLA**: Enforce strict timeout ceilings (e.g. 250ms), capturing all successful responses received prior to deadline.',
        '- **Partial Result Synthesis**: If individual workers timeout, synthesize output from arrived partitions and flag partial: true.',
      ]
    ),
  },

  'idempotent-consumer-deduplicator': {
    id: 'idempotent-consumer-deduplicator',
    name: 'IdempotentConsumerDeduplicatorSkill',
    displayName: 'Idempotent Consumer & Message Deduplication Gate',
    categoryId: 'control_flow',
    description: 'Prevents duplicate processing of at-least-once message streams using distributed transaction ID tracking.',
    tags: ['control_flow', 'idempotency', 'deduplication', 'message-queue', 'kafka', 'at-least-once'],
    transform: createStandardSkillTransform(
      'protocol',
      'Фильтр Дедупликации Сообщений (Idempotent Consumer Gate)',
      'Idempotent Consumer & Message Deduplication Gate Protocol',
      [
        '- **Проверка ID сообщения**: Перед обработкой проверить уникальный MessageId или CorrelationId в быстром хранилище (Redis/DB).',
        '- **Игнорирование дубликатов**: Если событие с данным ID уже обработано — подтвердить прием (ACK), но не выполнять бизнес-логику повторно.',
        '- **Атомарная фиксация**: Обработку события и сохранение его ID в реестр выполненных выполнять в единой атомарной транзакции.',
      ],
      [
        '- **Message Identity Verification**: Intercept incoming payloads and verify MessageId/CorrelationId in distributed deduplication registry.',
        '- **Duplicate Suppression**: If the unique identifier has already been processed, ACK the transport message without re-executing logic.',
        '- **Atomic State & ID Commit**: Bundle business mutations and deduplication key persistence inside a single atomic transaction.',
      ]
    ),
  },

  'pipe-and-filter-pipeline': {
    id: 'pipe-and-filter-pipeline',
    name: 'PipeAndFilterPipelineSkill',
    displayName: 'Pipe-and-Filter Stream Processing Pipeline',
    categoryId: 'control_flow',
    description: 'Chains decoupled processing filters where each transformation step receives stream input from previous output.',
    tags: ['control_flow', 'pipe-and-filter', 'pipeline', 'streaming', 'transformation', 'modular'],
    transform: createStandardSkillTransform(
      'protocol',
      'Конвейер Обработки Pipe-and-Filter (Трубы и Фильтры)',
      'Pipe-and-Filter Sequential Stream Architecture',
      [
        '- **Атомарность фильтров**: Каждый фильтр решает строго одну задачу (парсинг, валидация, обогащение, шифрование).',
        '- **Стандартный интерфейс**: Фильтры связываются через единый типизированный интерфейс потока InputStream -> OutputStream.',
        '- **Свобода перекомпоновки**: Обеспечить возможность менять порядок фильтров или добавлять новые без модификации соседних компонентов.',
      ],
      [
        '- **Filter Atomicity**: Design each filter to execute exactly one transformation (parsing, validation, enrichment, redaction).',
        '- **Standardized Stream Contract**: Connect filters via uniform typed streaming channels (InputStream -> OutputStream).',
        '- **Composability**: Ensure filters are fully decoupled so stages can be reordered or inserted with zero adjacent code modification.',
      ]
    ),
  },

  'circuit-breaker-fallback-chain': {
    id: 'circuit-breaker-fallback-chain',
    name: 'CircuitBreakerFallbackChainSkill',
    displayName: 'Multi-Tier Hierarchical Fallback Cascade',
    categoryId: 'control_flow',
    description: 'Navigates multi-tier degraded fallback states (Primary -> Replica -> Cache -> Static Degraded Response).',
    tags: ['control_flow', 'fallback', 'cascade', 'high-availability', 'graceful-degradation'],
    transform: createStandardSkillTransform(
      'protocol',
      'Каскадный Многоуровневый Fallback (Graceful Degradation)',
      'Multi-Tier Hierarchical Fallback Cascade Protocol',
      [
        '- **Уровень 1 (Primary)**: Попытка запроса к основному производственному сервису.',
        '- **Уровень 2 (Replica / Secondary)**: При сбое переключение на резервную реплику или альтернативный регион.',
        '- **Уровень 3 (Stale Cache)**: Если реплика недоступна — возврат данных из кэша с пометкой о возможном устаревании.',
        '- **Уровень 4 (Static Safe Default)**: При полном отказе возврат безопасного дефолтного значения без падения пользовательского UI.',
      ],
      [
        '- **Tier 1 (Primary Target)**: Dispatch initial request to active high-performance production cluster.',
        '- **Tier 2 (Secondary Replica)**: On primary timeout or 5xx, pivot seamlessly to read-only replica or cross-region cluster.',
        '- **Tier 3 (Stale Cache Fallback)**: If replicas fail, return cached read snapshot annotated with stale: true.',
        '- **Tier 4 (Safe Static Default)**: On complete infrastructure loss, return minimal safe baseline UI payload preventing crash.',
      ]
    ),
  },

  'dynamic-routing-slip': {
    id: 'dynamic-routing-slip',
    name: 'DynamicRoutingSlipSkill',
    displayName: 'Dynamic Routing Slip & Message Trampoline',
    categoryId: 'control_flow',
    description: 'Attaches an evolving route itinerary to message headers directing sequential processing across services.',
    tags: ['control_flow', 'routing-slip', 'itinerary', 'enterprise-integration', 'dynamic-routing'],
    transform: createStandardSkillTransform(
      'protocol',
      'Протокол Маршрутного Листа (Dynamic Routing Slip)',
      'Dynamic Routing Slip & Itinerary Dispatch Protocol',
      [
        '- **Маршрутный лист в заголовке**: Добавить к сообщению список шагов: RoutingSlip: [StepA, StepB, StepC].',
        '- **Шаг обработки**: Текущий сервис выполняет свою работу, удаляет себя из начала списка и пересылает сообщение следующему сервису.',
        '- **Динамическая корректировка**: Сервисы имеют право добавлять дополнительные шаги проверки в зависимости от результатов вычислений.',
      ],
      [
        '- **Header Routing Itinerary**: Attach an ordered sequence of processing hops inside message metadata: RoutingSlip: [ServiceA, ServiceB, ServiceC].',
        '- **Sequential Hop Dispatch**: Current worker fulfills its contract, pops its identity from header, and forwards payload to next node.',
        '- **Dynamic Route Mutation**: Allow intermediate workers to inject conditional remediation hops based on payload inspection.',
      ]
    ),
  },

  'backpressure-reactive-pull': {
    id: 'backpressure-reactive-pull',
    name: 'BackpressureReactivePullSkill',
    displayName: 'Reactive Streams Pull-Based Backpressure',
    categoryId: 'control_flow',
    description: 'Implements Reactive Streams pull-based demand requests (Subscription.request(N)) to prevent consumer buffer overflow.',
    tags: ['control_flow', 'backpressure', 'reactive-streams', 'flow-control', 'pull-based', 'streaming'],
    transform: createStandardSkillTransform(
      'protocol',
      'Управление Давлением Потока (Reactive Pull-Based Backpressure)',
      'Reactive Streams Pull-Based Backpressure Protocol',
      [
        '- **Спрос со стороны получателя**: Источник данных отправляет новые элементы только тогда, когда потребитель запросил их через request(N).',
        '- **Защита от переполнения памяти**: Потребитель регулирует N в зависимости от загрузки своего CPU и размера очереди в оперативной памяти.',
        '- **Стратегия сброса**: При превышении критического порога буфера применить явную политику: DROP_OLDEST, DROP_LATEST или BUFFER_OR_ERROR.',
      ],
      [
        '- **Demand-Driven Emission**: Upstream producers emit data chunks strictly upon receiving downstream demand requests request(n).',
        '- **Buffer Overflow Shielding**: Downstream consumers dynamically scale requested n based on local memory and event loop saturation.',
        '- **Explicit Overflow Policy**: When buffers breach configured thresholds, enforce deterministic policy: DROP_OLDEST, DROP_LATEST, or FAIL.',
      ]
    ),
  },

  'dead-letter-retry-escalation': {
    id: 'dead-letter-retry-escalation',
    name: 'DeadLetterRetryEscalationSkill',
    displayName: 'Dead Letter Queue (DLQ) Triage & Escalation',
    categoryId: 'control_flow',
    description: 'Routes permanently failing poison-pill messages into quarantined DLQ storage with diagnostic headers and human alerts.',
    tags: ['control_flow', 'dlq', 'poison-pill', 'quarantine', 'incident-response', 'messaging'],
    transform: createStandardSkillTransform(
      'protocol',
      'Маршрутизация Ядовитых Сообщений (DLQ & Incident Escalation)',
      'Dead Letter Queue (DLQ) Quarantine & Escalation Protocol',
      [
        '- **Изоляция сбоя**: После исчерпания максимального числа повторов переместить поврежденное сообщение в Dead Letter Queue (DLQ).',
        '- **Диагностические метаданные**: Обогатить сообщение заголовками: x-death-reason, x-failed-at-timestamp, x-original-queue, x-stack-trace.',
        '- **Оповещение дежурного инженера**: Отправить алерт в PagerDuty/Slack при превышении порога в 5 сообщений в DLQ за минуту.',
      ],
      [
        '- **Poison Message Quarantine**: Reroute permanently failing payloads into a dedicated Dead Letter Queue (DLQ) after retry exhaustion.',
        '- **Diagnostic Envelope Injection**: Append triage metadata headers: x-death-reason, x-failed-timestamp, x-original-exchange, x-error-trace.',
        '- **On-Call Incident Escalation**: Trigger automated high-priority telemetry alerts when DLQ ingestion rate breaches anomaly thresholds.',
      ]
    ),
  },

  'asynchronous-poller-with-deadline': {
    id: 'asynchronous-poller-with-deadline',
    name: 'AsynchronousPollerWithDeadlineSkill',
    displayName: 'Async Long-Poll & Timeout Deadline Governor',
    categoryId: 'control_flow',
    description: 'Manages asynchronous polling loops against long-running external jobs with adaptive intervals and deadline cutoffs.',
    tags: ['control_flow', 'polling', 'long-polling', 'deadline', 'timeout', 'async-jobs'],
    transform: createStandardSkillTransform(
      'protocol',
      'Асинхронный Поллинг с Жестким Дедлайном (Polling Governor)',
      'Asynchronous Polling Loop & Absolute Deadline Governor',
      [
        '- **Адаптивный интервал опроса**: Начинать опрос статуса с малого интервала (100 мс), постепенно увеличивая шаг до 5 секунд.',
        '- **Абсолютный дедлайн**: Задать предельное время ожидания задачи (например, 120 секунд), после которого считать операцию проваленной по таймауту.',
        '- **Прекращение при терминальном статусе**: Немедленно завершать цикл при получении статусов COMPLETED, FAILED или CANCELLED.',
      ],
      [
        '- **Adaptive Poll Interval**: Initialize polling frequency at 100ms, ramping adaptively up to 5s intervals as wait duration expands.',
        '- **Hard Timeout Horizon**: Enforce an absolute wall-clock deadline ceiling (e.g. 120s), aborting with TimeoutError upon expiration.',
        '- **Terminal State Circuit**: Terminate polling loop immediately when external response status transitions to COMPLETED, FAILED, or ABORTED.',
      ]
    ),
  },

  'token-bucket-traffic-shaper': {
    id: 'token-bucket-traffic-shaper',
    name: 'TokenBucketTrafficShaperSkill',
    displayName: 'Token Bucket Smooth Traffic Shaper',
    categoryId: 'control_flow',
    description: 'Regulates outbound API traffic using leaky token bucket models, pacing outbound requests to eliminate burst limits.',
    tags: ['control_flow', 'traffic-shaping', 'token-bucket', 'rate-limit', 'pacing', 'egress'],
    transform: createStandardSkillTransform(
      'constraints',
      'Формирование Плавного Трафика (Token Bucket Traffic Shaper)',
      'Token Bucket Smooth Egress Traffic Shaping Protocol',
      [
        '- **Пополнение токенов**: Пополнять корзину с постоянной скоростью R токенов в секунду до максимальной емкости C.',
        '- **Списание за транзакцию**: Каждый исходящий вызов требует списания 1 токена; при пустой корзине запрос ожидает доступности токена.',
        '- **Защита от всплесков**: Исключить одновременную отправку пачки запросов к внешним API, предотвращая блокировки аккаунта.',
      ],
      [
        '- **Constant Rate Replenishment**: Refill token bucket at steady pace R tokens/second up to capacity cap C.',
        '- **Token Consumption Gate**: Every outbound dispatch consumes 1 token; hold execution thread in non-blocking wait if bucket is depleted.',
        '- **Egress Burst Elimination**: Smooth outbound network spikes to prevent tripping upstream cloud provider rate-limit tripwires.',
      ]
    ),
  },
};
