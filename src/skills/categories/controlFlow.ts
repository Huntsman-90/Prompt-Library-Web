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
  "predicate-short-circuit-evaluator": {
    id: "predicate-short-circuit-evaluator",
    name: "PredicateShortCircuitEvaluatorSkill",
    displayName: "Boolean Predicate Short-Circuit Evaluator",
    categoryId: "control_flow",
    description: "Evaluates conditional expression chains with short-circuit evaluation, skipping expensive downstream checks if earlier conditions fail.",
    tags: ["control_flow","predicates","short-circuit","conditions","logic"],
    transform: createStandardSkillTransform({
      sectionName: "Predicate Short-Circuit Evaluation Protocol",
      ruSectionName: "Протокол короткого замыкания булевых предикатов (Short-Circuit)",
      instructions: [
        "Order chained preconditions by computational cost: evaluate lightweight boolean flags before initiating heavy external API calls.",
        "Halt execution immediately on the first false condition in an AND-chain without evaluating subsequent predicates.",
        "Terminate evaluation immediately on the first true condition in an OR-chain.",
        "Log the exact failing predicate term to provide transparent operational diagnostics."
],
      ruInstructions: [
        "Упорядочивайте условия по стоимости вычисления: проверяйте быстрые булевы флаги до запуска тяжелых проверок.",
        "Немедленно прерывайте цепочку условий И (AND) при первом ложном результате без оценки последующих выражений.",
        "Прекращайте вычисление условий ИЛИ (OR) при первом истинном значении.",
        "Фиксируйте точный предикат, приведший к остановке проверки, для прозрачной диагностики."
],
      semanticType: "process_directive",
      tags: ["control_flow","predicates","short-circuit","conditions","logic"],
    }),
  },

  "exponential-backoff-jitter-policy": {
    id: "exponential-backoff-jitter-policy",
    name: "ExponentialBackoffJitterPolicySkill",
    displayName: "Decorrelated Jitter Exponential Retry Policy",
    categoryId: "control_flow",
    description: "Governs automated retry loops with exponential backoff and randomized decorrelated jitter to prevent thundering herd collisions.",
    tags: ["control_flow","retry","exponential-backoff","jitter","resilience"],
    transform: createStandardSkillTransform({
      sectionName: "Exponential Backoff & Jitter Protocol",
      ruSectionName: "Протокол экспоненциальных повторов с рандомизацией задержки (Backoff & Jitter)",
      instructions: [
        "Calculate retry wait times using exponential backoff: `Sleep = min(MaxWait, BaseInterval * 2^attempt)`.",
        "Inject decorrelated uniform random jitter to desynchronize simultaneous client retry attempts.",
        "Enforce an absolute retry ceiling (MaxAttempts <= 5) before tripping an unrecoverable failure state.",
        "Categorize status codes: retry transient network errors (503, 429) while failing fast on permanent client faults (400, 401, 404)."
],
      ruInstructions: [
        "Рассчитывайте время ожидания повтора по экспоненциальной формуле: `Задержка = min(MaxWait, Base * 2^попытка)`.",
        "Добавляйте случайный джиттер (Jitter) для рассинхронизации одновременных повторных запросов от клиентов.",
        "Ограничивайте максимальное число попыток (MaxAttempts <= 5) до перехода в статус ошибки.",
        "Разделяйте ошибки: повторяйте временные сбои (503, 429) и мгновенно прерывайте выполнение при фатальных ошибках (400, 401, 404)."
],
      semanticType: "process_directive",
      tags: ["control_flow","retry","exponential-backoff","jitter","resilience"],
    }),
  },

  "pipeline-map-reduce-aggregator": {
    id: "pipeline-map-reduce-aggregator",
    name: "PipelineMapReduceAggregatorSkill",
    displayName: "Parallel Map-Reduce Stream Aggregator",
    categoryId: "control_flow",
    description: "Partitions large data streams into parallel chunk mappings, reducing intermediate outputs through an associative reduction operator.",
    tags: ["control_flow","map-reduce","parallelism","aggregation","streams"],
    transform: createStandardSkillTransform({
      sectionName: "Map-Reduce Stream Aggregation Protocol",
      ruSectionName: "Протокол параллельной обработки Map-Reduce",
      instructions: [
        "Partition input datasets into disjoint, bounded batch slices.",
        "Map each batch concurrently using stateless worker functions.",
        "Ensure the reduction combiner operator is mathematically associative and commutative.",
        "Emit a consolidated final summary state verifying zero data loss across batch partitions."
],
      ruInstructions: [
        "Разделяйте входящий массив данных на изолированные пачки фиксированного размера.",
        "Обрабатывайте каждую пачку параллельно с помощью чистых функций без сохранения состояния.",
        "Обеспечивайте ассоциативность функции редукции для корректности параллельного объединения результатов.",
        "Формируйте итоговый сводный результат с проверкой отсутствия пропущенных элементов."
],
      semanticType: "process_directive",
      tags: ["control_flow","map-reduce","parallelism","aggregation","streams"],
    }),
  },

  "saga-distributed-workflow-coordinator": {
    id: "saga-distributed-workflow-coordinator",
    name: "SagaDistributedWorkflowCoordinatorSkill",
    displayName: "Orchestrated Saga Distributed Transaction Coordinator",
    categoryId: "control_flow",
    description: "Coordinates multi-step distributed workflows across independent microservices with forward progress and backward compensating actions.",
    tags: ["control_flow","saga","distributed-transactions","orchestration","compensation"],
    transform: createStandardSkillTransform({
      sectionName: "Saga Transaction Coordinator Protocol",
      ruSectionName: "Протокол координации распределенных саг (Saga Orchestration)",
      instructions: [
        "Maintain an active execution log tracking forward transaction state.",
        "If step N fails, immediately halt forward progress and trigger compensating transactions for steps N-1 down to 1.",
        "Ensure all compensating rollback actions are strictly idempotent.",
        "Emit clear audit events recording saga completion or compensation resolution status."
],
      ruInstructions: [
        "Ведите журнал состояния выполнения шагов распределенной транзакции.",
        "При сбое на шаге N остановите процесс и последовательно вызовите компенсирующие действия от шага N-1 до шага 1.",
        "Обеспечивайте строгую идемпотентность всех компенсирующих функций отката.",
        "Формируйте аудит-отчет о завершении саги либо об успешности выполнения компенсирующего сценария."
],
      semanticType: "protocol",
      tags: ["control_flow","saga","distributed-transactions","orchestration","compensation"],
    }),
  },

  "stateful-rate-throttling-gate": {
    id: "stateful-rate-throttling-gate",
    name: "StatefulRateThrottlingGateSkill",
    displayName: "Stateful Rate-Throttling & Sliding-Window Gate",
    categoryId: "control_flow",
    description: "Enforces execution throughput budgets using stateful sliding-window counters, delaying or rejecting overflow requests.",
    tags: ["control_flow","rate-limiting","sliding-window","throttling","flow-control"],
    transform: createStandardSkillTransform({
      sectionName: "Sliding-Window Rate Throttling Protocol",
      ruSectionName: "Протокол ограничения частоты событий (Sliding Window Throttling)",
      instructions: [
        "Maintain an ordered deque of execution timestamps within the active sliding time window.",
        "Prune timestamps older than the window duration before evaluating quota capacity.",
        "If current count exceeds threshold, queue the action with calculated sleep or return a rate-limit error.",
        "Ensure atomic increment and state inspection to prevent concurrent race conditions."
],
      ruInstructions: [
        "Ведите упорядоченную очередь временных меток выполнения в пределах скользящего окна.",
        "Очищайте устаревшие метки до проверки доступного лимита запросов.",
        "При превышении порога откладывайте выполнение на расчетное время либо возвращайте статус ограничения частоты.",
        "Обеспечивайте атомарность обновления счетчика для исключения состояний гонки."
],
      semanticType: "guardrail_directive",
      tags: ["control_flow","rate-limiting","sliding-window","throttling","flow-control"],
    }),
  },

  "cascading-fallback-ladder": {
    id: "cascading-fallback-ladder",
    name: "CascadingFallbackLadderSkill",
    displayName: "Multi-Tier Cascading Fallback Ladder",
    categoryId: "control_flow",
    description: "Sequences cascading recovery tiers (Primary High-Fidelity -> Cached Intermediate -> Degraded Minimal -> Static Emergency) upon failure.",
    tags: ["control_flow","fallback","graceful-degradation","resilience","multi-tier"],
    transform: createStandardSkillTransform({
      sectionName: "Cascading Fallback Ladder Protocol",
      ruSectionName: "Протокол многоуровневой каскадной деградации (Fallback Ladder)",
      instructions: [
        "Attempt execution at Tier 1 (Full Live Model / High Precision API).",
        "On Tier 1 failure: fall back to Tier 2 (Semantic Cache / Pre-computed Heuristics).",
        "On Tier 2 failure: fall back to Tier 3 (Rule-Based Lightweight Local Model).",
        "On Tier 3 failure: emit Tier 4 (Safe Static Emergency Payload) with clear operational degradation notice."
],
      ruInstructions: [
        "Выполняйте основную попытку на Уровне 1 (Полнофункциональная живая модель / Точный API).",
        "При сбое Уровня 1: переключайтесь на Уровень 2 (Семантический кэш / Предвычисленные ответы).",
        "При сбое Уровня 2: переходите на Уровень 3 (Легковесная локальная эвристика по правилам).",
        "При полном отказе: выдавайте Уровень 4 (Безопасный статический ответ) с предупреждением о деградации сервиса."
],
      semanticType: "process_directive",
      tags: ["control_flow","fallback","graceful-degradation","resilience","multi-tier"],
    }),
  },

  "semaphore-concurrency-limiter": {
    id: "semaphore-concurrency-limiter",
    name: "SemaphoreConcurrencyLimiterSkill",
    displayName: "Bounded Semaphore & In-Flight Concurrency Limiter",
    categoryId: "control_flow",
    description: "Constrains simultaneous parallel operations to a strict concurrency ceiling (MaxParallel <= N) using counting semaphores.",
    tags: ["control_flow","semaphore","concurrency","limits","resource-management"],
    transform: createStandardSkillTransform({
      sectionName: "Semaphore Concurrency Limiting Protocol",
      ruSectionName: "Протокол ограничения параллелизма (Counting Semaphore)",
      instructions: [
        "Acquire a semaphore permit prior to launching asynchronous child tasks.",
        "Block or queue excess tasks when all permits are currently checked out.",
        "Release the permit unconditionally in a `finally` block upon task success or exception.",
        "Prevent system memory starvation caused by unbounded concurrent task spawning."
],
      ruInstructions: [
        "Запрашивайте разрешение семафора перед запуском каждой параллельной подзадачи.",
        "Ставьте в очередь ожидания новые задачи при исчерпании доступных слотов параллелизма.",
        "Гарантированно освобождайте слот в блоке `finally` при любом исходе выполнения задачи.",
        "Защищайте систему от исчерпания памяти при лавинообразном создании параллельных потоков."
],
      semanticType: "process_directive",
      tags: ["control_flow","semaphore","concurrency","limits","resource-management"],
    }),
  },

  "dag-topological-task-scheduler": {
    id: "dag-topological-task-scheduler",
    name: "DagTopologicalTaskSchedulerSkill",
    displayName: "Directed Acyclic Graph (DAG) Topological Scheduler",
    categoryId: "control_flow",
    description: "Computes topological dependency order for complex multi-task workflows, executing independent leaf nodes in parallel while sequencing dependencies.",
    tags: ["control_flow","dag","topological-sort","dependencies","workflow-scheduler"],
    transform: createStandardSkillTransform({
      sectionName: "DAG Topological Task Scheduling Protocol",
      ruSectionName: "Протокол топологического планирования графа задач (DAG Scheduler)",
      instructions: [
        "Construct a directed acyclic graph representing task dependency relationships.",
        "Perform Kahn algorithm topological sorting to verify zero cyclic dependencies.",
        "Dispatch independent zero-in-degree tasks concurrently.",
        "Unlock downstream dependent nodes dynamically as their prerequisite parents complete successfully."
],
      ruInstructions: [
        "Стройте направленный ациклический граф зависимостей между задачами.",
        "Выполняйте топологическую сортировку алгоритмом Кана для подтверждения отсутствия циклических блокировок.",
        "Запускайте задачи с нулевым числом входящих зависимостей параллельно.",
        "Динамически разблокируйте зависимые шаги по мере успешного завершения родительских задач."
],
      semanticType: "process_directive",
      tags: ["control_flow","dag","topological-sort","dependencies","workflow-scheduler"],
    }),
  },

  "polling-convergence-condition-gate": {
    id: "polling-convergence-condition-gate",
    name: "PollingConvergenceConditionGateSkill",
    displayName: "Convergence Polling & Termination Predicate Gate",
    categoryId: "control_flow",
    description: "Executes iterative polling cycles until a numeric delta drops below convergence epsilon or max iterations are exhausted.",
    tags: ["control_flow","polling","convergence","iteration","termination-condition"],
    transform: createStandardSkillTransform({
      sectionName: "Convergence Polling Protocol",
      ruSectionName: "Протокол итерационного контроля сходимости (Convergence Gate)",
      instructions: [
        "Sample system state at defined polling intervals with jitter.",
        "Calculate metric delta: `Delta = abs(CurrentMetric - PreviousMetric)`.",
        "Terminate loop successfully when `Delta < Epsilon` across 3 consecutive iterations.",
        "Trigger timeout contingency handler if max iterations threshold is reached without convergence."
],
      ruInstructions: [
        "Опрашивайте состояние системы с заданным интервалом и добавлением джиттера.",
        "Рассчитывайте изменение метрики: `Delta = abs(Текущее - Предыдущее)`.",
        "Завершайте цикл при достижении стабильности `Delta < Epsilon` на протяжении 3 последовательных замеров.",
        "Запускайте обработчик аварийного таймаута при исчерпании лимита итераций без достижения сходимости."
],
      semanticType: "process_directive",
      tags: ["control_flow","polling","convergence","iteration","termination-condition"],
    }),
  },

  "publish-subscribe-event-router": {
    id: "publish-subscribe-event-router",
    name: "PublishSubscribeEventRouterSkill",
    displayName: "Decoupled Publish-Subscribe Event Broker & Router",
    categoryId: "control_flow",
    description: "Decouples workflow triggers from executors by routing typed events through topic-based subscriber queues with topic wildcard filtering.",
    tags: ["control_flow","pub-sub","event-broker","decoupling","message-routing"],
    transform: createStandardSkillTransform({
      sectionName: "Pub-Sub Event Routing Protocol",
      ruSectionName: "Протокол маршрутизации событий Publish-Subscribe",
      instructions: [
        "Publish structured event envelopes containing eventType, sourceTopic, timestamp, and payload.",
        "Route events to subscribed handlers based on exact or wildcard topic matching (e.g. `order.*`).",
        "Isolate subscriber execution: ensure one subscriber failure does not impede other topic listeners.",
        "Support asynchronous fan-out processing with configurable delivery guarantees."
],
      ruInstructions: [
        "Публикуйте типизированные события с полями: eventType, топик, временная метка и полезная нагрузка.",
        "Маршрутизируйте события подписчикам по точному совпадению или маске топика (`order.*`).",
        "Изолируйте обработчики: сбой в одном подписчике не должен влиять на работу остальных получателей.",
        "Обеспечивайте асинхронную рассылку (Fan-Out) с настраиваемыми гарантиями доставки."
],
      semanticType: "structural_directive",
      tags: ["control_flow","pub-sub","event-broker","decoupling","message-routing"],
    }),
  },

  "priority-preemptive-task-queue": {
    id: "priority-preemptive-task-queue",
    name: "PriorityPreemptiveTaskQueueSkill",
    displayName: "Priority Preemptive Task Queue & Work Stealing",
    categoryId: "control_flow",
    description: "Manages task queues with strict priority tiers (Critical, High, Normal, Low), preempting lower-priority work when critical bursts occur.",
    tags: ["control_flow","priority-queue","preemption","work-stealing","scheduling"],
    transform: createStandardSkillTransform({
      sectionName: "Priority Preemptive Queue Protocol",
      ruSectionName: "Протокол приоритетной очереди с вытеснением (Priority Queue)",
      instructions: [
        "Enqueue incoming tasks into strict priority bins (P0 Critical down to P3 Background).",
        "Dispatch highest priority tasks first; suspend long-running P3 tasks when P0 bursts arrive.",
        "Prevent low-priority starvation by applying aging multipliers that elevate priority over elapsed wait time.",
        "Support work-stealing across idle worker threads to balance load dynamically."
],
      ruInstructions: [
        "Распределяйте входящие задачи по уровням приоритета (от P0 Критический до P3 Фоновый).",
        "Выбирайте на исполнение наиболее приоритетные задачи; приостанавливайте фоновые задачи при всплеске P0.",
        "Предотвращайте голодание низкоприоритетных задач путем постепенного повышения их веса по времени ожидания.",
        "Используйте алгоритм перехвата работы (Work Stealing) между свободными воркерами для балансировки."
],
      semanticType: "process_directive",
      tags: ["control_flow","priority-queue","preemption","work-stealing","scheduling"],
    }),
  },

  "speculative-branch-prediction-router": {
    id: "speculative-branch-prediction-router",
    name: "SpeculativeBranchPredictionRouterSkill",
    displayName: "Speculative Branch Execution & Verification Router",
    categoryId: "control_flow",
    description: "Executes high-probability decision paths speculatively in parallel with condition evaluation, committing branches upon condition confirmation.",
    tags: ["control_flow","speculative-execution","branching","latency-optimization","parallelism"],
    transform: createStandardSkillTransform({
      sectionName: "Speculative Branch Execution Protocol",
      ruSectionName: "Протокол спекулятивного исполнения ветвей (Branch Prediction)",
      instructions: [
        "Predict the most probable branch trajectory based on contextual heuristics (>80% confidence).",
        "Begin speculative branch execution concurrently with slow verification predicates.",
        "Commit speculative state immediately if the predicate resolves true.",
        "Discard speculative branch outputs cleanly with zero side-effects if the predicate resolves false."
],
      ruInstructions: [
        "Прогнозируйте наиболее вероятную ветку исполнения на основе эвристик (с уверенностью >80%).",
        "Запускайте выполнение предсказанной ветки параллельно с вычислением медленного условия проверки.",
        "Применяйте результаты спекулятивного вычисления мгновенно при подтверждении условия.",
        "Безопасно сбрасывайте результаты без побочных эффектов при несовпадении прогноза."
],
      semanticType: "process_directive",
      tags: ["control_flow","speculative-execution","branching","latency-optimization","parallelism"],
    }),
  },

  "batch-sliding-window-coalescer": {
    id: "batch-sliding-window-coalescer",
    name: "BatchSlidingWindowCoalescerSkill",
    displayName: "Micro-Batching Sliding-Window Coalescer",
    categoryId: "control_flow",
    description: "Coalesces rapid streams of individual events into micro-batches using time-window and maximum-size triggers to maximize I/O throughput.",
    tags: ["control_flow","micro-batching","coalescing","throughput","io-optimization"],
    transform: createStandardSkillTransform({
      sectionName: "Micro-Batch Coalescing Protocol",
      ruSectionName: "Протокол пакетирования и объединения запросов (Micro-Batching)",
      instructions: [
        "Buffer incoming individual requests into an active batch collection.",
        "Flush the batch immediately upon hitting either MaxBatchSize (e.g. 50 items) OR MaxBatchDelay (e.g. 20ms).",
        "Execute single vectorized bulk operations against underlying storage or APIs.",
        "Distribute individual response results back to their corresponding caller promises."
],
      ruInstructions: [
        "Буферизуйте входящие одиночные запросы в активную пачку.",
        "Отправляйте пачку при наступлении первого из событий: достижение MaxBatchSize (50 записей) ИЛИ таймаута MaxBatchDelay (20 мс).",
        "Выполняйте одну быструю пакетную операцию к базе данных или внешнему API.",
        "Возвращайте результаты каждому вызвавшему потоку в индивидуальные промисы."
],
      semanticType: "process_directive",
      tags: ["control_flow","micro-batching","coalescing","throughput","io-optimization"],
    }),
  },

  "circuit-breaker-half-open-probe": {
    id: "circuit-breaker-half-open-probe",
    name: "CircuitBreakerHalfOpenProbeSkill",
    displayName: "Circuit Breaker Three-State Machine (Closed / Open / Half-Open)",
    categoryId: "control_flow",
    description: "Protects external dependencies from overload with Closed (normal), Open (fast fail), and Half-Open (trial probe) state transitions.",
    tags: ["control_flow","circuit-breaker","half-open","resilience","fault-tolerance"],
    transform: createStandardSkillTransform({
      sectionName: "Circuit Breaker State Machine Protocol",
      ruSectionName: "Протокол трехпозиционного автомата Circuit Breaker (Closed / Open / Half-Open)",
      instructions: [
        "Closed State: Route calls normally; track consecutive failures; trip to OPEN if failure rate exceeds 50%.",
        "Open State: Fast-fail all incoming calls immediately without calling the failing downstream service.",
        "Transition to Half-Open after a cooldown period (e.g. 30s): allow a single probe request through.",
        "If probe succeeds: reset state to CLOSED; if probe fails: reset cooldown timer in OPEN state."
],
      ruInstructions: [
        "Состояние Closed: Пропускайте все запросы; при превышении порога ошибок (50%) переводите автомат в OPEN.",
        "Состояние Open: Мгновенно отклоняйте все запросы с ошибкой без обращения к упавшему сервису.",
        "Переход в Half-Open по истечении таймера остывания (30 сек): пропустите один пробный запрос.",
        "При успехе пробного запроса: возвращайтесь в CLOSED; при повторном сбое: оставайтесь в OPEN."
],
      semanticType: "process_directive",
      tags: ["control_flow","circuit-breaker","half-open","resilience","fault-tolerance"],
    }),
  },

  "idempotency-deduplication-filter": {
    id: "idempotency-deduplication-filter",
    name: "IdempotencyDeduplicationFilterSkill",
    displayName: "Idempotency Key Cache & Request Deduplication Filter",
    categoryId: "control_flow",
    description: "Filters incoming requests through an idempotency key cache, returning cached responses for identical duplicate requests without re-executing logic.",
    tags: ["control_flow","idempotency","deduplication","caching","at-most-once"],
    transform: createStandardSkillTransform({
      sectionName: "Idempotency Deduplication Protocol",
      ruSectionName: "Протокол дедупликации и контроля идемпотентности запросов",
      instructions: [
        "Extract unique client-supplied idempotency key (e.g. `Idempotency-Key` HTTP header).",
        "Inspect cache: if key exists in `COMPLETED` state, return cached response immediately.",
        "If key exists in `IN_PROGRESS` state, return HTTP 409 Conflict or wait for the active lock to release.",
        "Store successful execution response atomically in the cache with a 24-hour TTL."
],
      ruInstructions: [
        "Извлекайте уникальный ключ идемпотентности из заголовка запроса (`Idempotency-Key`).",
        "Проверяйте кэш: если ключ уже обработан (`COMPLETED`), мгновенно возвращайте сохраненный ответ.",
        "Если ключ находится в статусе обработки (`IN_PROGRESS`), возвращайте 409 Conflict или ожидайте снятия блокировки.",
        "Сохраняйте успешный ответ в кэше с временем жизни (TTL) 24 часа."
],
      semanticType: "guardrail_directive",
      tags: ["control_flow","idempotency","deduplication","caching","at-most-once"],
    }),
  },

  "async-coroutine-fanout-join": {
    id: "async-coroutine-fanout-join",
    name: "AsyncCoroutineFanoutJoinSkill",
    displayName: "Asynchronous Coroutine Fan-Out & Barrier Join",
    categoryId: "control_flow",
    description: "Fans out independent tasks across parallel asynchronous coroutines, synchronizing results at an all-settled barrier join point.",
    tags: ["control_flow","fan-out","barrier-join","coroutines","async-parallel"],
    transform: createStandardSkillTransform({
      sectionName: "Async Fan-Out & Barrier Join Protocol",
      ruSectionName: "Протокол асинхронного параллельного ветвления и барьерного слияния (Fan-Out / Join)",
      instructions: [
        "Spawn parallel worker coroutines for independent data sub-queries.",
        "Block at a barrier join point until all dispatched coroutines complete or time out.",
        "Collect results into a structured composite aggregate, isolating individual task errors.",
        "Ensure zero orphaned background coroutines upon parent scope termination."
],
      ruInstructions: [
        "Запускайте параллельные корутины для независимых подзадач выборки данных.",
        "Синхронизируйте выполнение на барьере слияния (Barrier Join) до завершения всех потоков.",
        "Собирайте результаты в единый композитный объект с изоляцией локальных ошибок.",
        "Гарантируйте отсутствие зависших фоновых процессов при завершении родительского контекста."
],
      semanticType: "process_directive",
      tags: ["control_flow","fan-out","barrier-join","coroutines","async-parallel"],
    }),
  },

  "backpressure-reactive-pull-stream": {
    id: "backpressure-reactive-pull-stream",
    name: "BackpressureReactivePullStreamSkill",
    displayName: "Reactive Streams Demand-Driven Backpressure Flow",
    categoryId: "control_flow",
    description: "Regulates high-volume data streams using Reactive Streams pull-based backpressure, where consumers signal exact buffer capacity before producers emit items.",
    tags: ["control_flow","backpressure","reactive-streams","flow-control","buffers"],
    transform: createStandardSkillTransform({
      sectionName: "Reactive Backpressure Flow Protocol",
      ruSectionName: "Протокол реактивного управления обратным давлением (Backpressure Flow)",
      instructions: [
        "Never push unbounded data elements to consumers; operate strictly on a demand-pull basis (`request(n)`).",
        "Producer must emit at most `n` items requested by the active subscriber subscription.",
        "Buffer items up to a bounded maximum queue size; apply drop-oldest or drop-latest strategies upon overflow.",
        "Propagate terminal cancellation signals upstream immediately if the consumer disconnects."
],
      ruInstructions: [
        "Не проталкивайте неограниченные объемы данных; работайте строго по запросу получателя (`request(n)`).",
        "Источник обязан отправлять не более `n` элементов, запрошенных подписчиком.",
        "Ограничивайте размер промежуточного буфера; применяйте стратегию сброса устаревших данных при переполнении.",
        "Передавайте сигнал отмены вверх по цепочке при отключении или ошибке потребителя данных."
],
      semanticType: "process_directive",
      tags: ["control_flow","backpressure","reactive-streams","flow-control","buffers"],
    }),
  },

  "sliding-window-rate-limiter-redis": {
    id: "sliding-window-rate-limiter-redis",
    name: "SlidingWindowRateLimiterRedisSkill",
    displayName: "Distributed Sliding-Log Rate Limiter (Redis Sorted Sets)",
    categoryId: "control_flow",
    description: "Implements mathematically exact distributed rate limiting using Redis Sorted Sets (ZADD, ZREMRANGEBYSCORE, ZCARD) executed in an atomic transaction.",
    tags: ["control_flow","redis","sliding-window","rate-limiting","distributed"],
    transform: createStandardSkillTransform({
      sectionName: "Redis Sliding-Log Rate Limiting Protocol",
      ruSectionName: "Протокол распределенного ограничения частоты на Redis Sorted Sets",
      instructions: [
        "Record each request timestamp in a Redis Sorted Set keyed by user/IP identifier.",
        "Execute atomic pipeline: remove timestamps older than `now - window_size`, count remaining members (`ZCARD`), add current timestamp (`ZADD`).",
        "Reject request if `ZCARD > max_limit` without adding current timestamp.",
        "Set key expiration TTL to automatically clean up inactive user rate limiter sets."
],
      ruInstructions: [
        "Записывайте временную метку каждого запроса в Redis Sorted Set по ключу пользователя или IP.",
        "Выполняйте атомарный пайплайн: удаляйте старые метки (`ZREMRANGEBYSCORE`), считайте текущее число (`ZCARD`) и добавляйте новую.",
        "Отклоняйте запрос, если число элементов превышает лимит, не добавляя новую метку.",
        "Устанавливайте время жизни ключа (TTL) для автоматической очистки неактивных записей."
],
      semanticType: "guardrail_directive",
      tags: ["control_flow","redis","sliding-window","rate-limiting","distributed"],
    }),
  },

  "leader-election-heartbeat-failover": {
    id: "leader-election-heartbeat-failover",
    name: "LeaderElectionHeartbeatFailoverSkill",
    displayName: "Leader Election & Lease Heartbeat Failover Coordinator",
    categoryId: "control_flow",
    description: "Coordinates single-active leader election using time-bounded lease locks with periodic renewal heartbeats and automatic failover elections upon leader timeout.",
    tags: ["control_flow","leader-election","failover","lease-lock","high-availability"],
    transform: createStandardSkillTransform({
      sectionName: "Leader Election & Failover Protocol",
      ruSectionName: "Протокол выборов лидера и аренды блокировок (Leader Election & Failover)",
      instructions: [
        "Acquire a time-bounded leader lease lock with an explicit TTL (e.g. 10 seconds).",
        "Active leader must refresh the lease periodically via background heartbeat loop at 1/3 of the TTL interval.",
        "Standby follower nodes monitor lease expiration; trigger an immediate election contest upon leader lease lapse.",
        "Enforce fencing tokens to reject stale commands emitted by demoted former leaders."
],
      ruInstructions: [
        "Захватывайте временную аренду лидерства (Lease Lock) с заданным временем жизни TTL (10 секунд).",
        "Активный лидер обязан обновлять аренду фоновым сигналом (Heartbeat) с интервалом в 1/3 от TTL.",
        "Резервные узлы отслеживают истечение аренды и автоматически начинают процедуру выборов нового лидера при таймауте.",
        "Используйте токены разграничения (Fencing Tokens) для отклонения команд от отставших старых лидеров."
],
      semanticType: "protocol",
      tags: ["control_flow","leader-election","failover","lease-lock","high-availability"],
    }),
  },
  "control-flow-dag-topological-dependency-resolution": {
    id: "control-flow-dag-topological-dependency-resolution",
    name: "ControlFlowDagTopologicalDependencyResolutionSkill",
    displayName: "DAG Topological Sort & Dependency Chain Execution",
    categoryId: "controlFlow",
    description: "Resolves execution sequence in Directed Acyclic Graphs (DAG) via Kahn's algorithm or DFS topological sort.",
    tags: ["control-flow","dag","topological-sort","graph","dependencies"],
    transform: createStandardSkillTransform({
      sectionName: "DAG Dependency Execution Standards",
      ruSectionName: "Топологическая сортировка графа зависимостей (DAG) и порядок выполнения",
      instructions: [
        "Detect cycles in task graphs before execution; abort with explicit cyclic dependency paths.",
        "Execute independent zero-in-degree nodes concurrently across worker pools.",
        "Trigger downstream dependent nodes immediately when all upstream parent tasks resolve successfully."
],
      ruInstructions: [
        "Проверяйте граф на отсутствие циклов перед запуском задач; прерывайте выполнение при обнаружении замкнутых зависимостей.",
        "Запускайте независимые узлы с нулевой степенью входа параллельно.",
        "Активируйте дочерние задачи сразу после успешного завершения всех родительских зависимостей."
],
      semanticType: "protocol",
      tags: ["control-flow","dag","topological-sort","graph","dependencies"],
    }),
  },

  "control-flow-saga-distributed-transaction-compensations": {
    id: "control-flow-saga-distributed-transaction-compensations",
    name: "ControlFlowSagaDistributedTransactionCompensationsSkill",
    displayName: "Saga Pattern & Distributed Transaction Compensation Flow",
    categoryId: "controlFlow",
    description: "Orchestrates multi-service transactions with backward compensating transactions when a mid-flow step fails.",
    tags: ["control-flow","saga","distributed-transactions","microservices","compensation"],
    transform: createStandardSkillTransform({
      sectionName: "Saga Distributed Transaction Protocol",
      ruSectionName: "Паттерн Saga: Оркестрация компенсирующих транзакций в распределенных системах",
      instructions: [
        "Pair every forward business action with an idempotent backward compensating action.",
        "Execute compensating steps in exact reverse chronological order upon any fatal downstream failure.",
        "Persist Saga state in durable storage to ensure recovery across system restarts."
],
      ruInstructions: [
        "Снабжайте каждое прямое действие идемпотентной компенсирующей операцией отката.",
        "Выполняйте компенсирующие действия в строго обратном порядке при ошибке на любом шаге цепочки.",
        "Сохраняйте состояние саги в надежном хранилище для восстановления после перезагрузки сервисов."
],
      semanticType: "protocol",
      tags: ["control-flow","saga","distributed-transactions","microservices","compensation"],
    }),
  },

  "control-flow-finite-state-machine-xstate-actor": {
    id: "control-flow-finite-state-machine-xstate-actor",
    name: "ControlFlowFiniteStateMachineXstateActorSkill",
    displayName: "Finite State Machine (FSM) & Actor Model Orchestration",
    categoryId: "controlFlow",
    description: "Structures complex UI and server workflows into mathematically explicit states, deterministic transitions, and guards.",
    tags: ["control-flow","fsm","state-machine","xstate","actor-model"],
    transform: createStandardSkillTransform({
      sectionName: "Finite State Machine (FSM) Architecture",
      ruSectionName: "Конечные автоматы (FSM) и модель акторов: строгая типизация состояний и переходов",
      instructions: [
        "Define all possible states, events, and guarded transitions in a formal state chart.",
        "Prevent impossible state combinations (e.g. `isLoading && isError && isSuccess`) by design.",
        "Decouple state transition triggers from side-effect action runners."
],
      ruInstructions: [
        "Описывайте состояния, события и условия переходов (Guards) в виде строгой диаграммы состояний.",
        "Исключайте невозможные комбинации состояний (например, одновременные `isLoading` и `isSuccess`).",
        "Разделяйте логику перехода между состояниями и выполнение побочных эффектов (Actions)."
],
      semanticType: "protocol",
      tags: ["control-flow","fsm","state-machine","xstate","actor-model"],
    }),
  },

  "control-flow-exponential-backoff-full-jitter-retry": {
    id: "control-flow-exponential-backoff-full-jitter-retry",
    name: "ControlFlowExponentialBackoffFullJitterRetrySkill",
    displayName: "Exponential Backoff with Full Jitter & Decorrelated Jitter",
    categoryId: "controlFlow",
    description: "Applies AWS-grade exponential backoff with randomized full jitter to prevent thundering herd spikes during downstream outages.",
    tags: ["control-flow","retry","exponential-backoff","jitter","resilience"],
    transform: createStandardSkillTransform({
      sectionName: "Exponential Backoff with Full Jitter Protocol",
      ruSectionName: "Экспоненциальная задержка с рандомизацией (Exponential Backoff with Full Jitter)",
      instructions: [
        "Calculate sleep interval: `sleep = random_between(0, min(max_sleep, base * 2^attempt))`.",
        "Avoid deterministic retries that synchronize failing clients into damaging synchronized pulse waves.",
        "Cap maximum retry attempts and bubble structured exceptions to the caller upon threshold exhaustion."
],
      ruInstructions: [
        "Рассчитывайте интервал повтора со случайным разбросом (Full Jitter): `sleep = random(0, min(max, base * 2^attempt))`.",
        "Исключайте детерминированные интервалы повторов во избежание эффекта набегающей толпы (Thundering Herd).",
        "Ограничивайте максимальное число попыток и возвращайте структурированную ошибку при исчерпании лимита."
],
      semanticType: "protocol",
      tags: ["control-flow","retry","exponential-backoff","jitter","resilience"],
    }),
  },

  "control-flow-circuit-breaker-hystrix-resilience": {
    id: "control-flow-circuit-breaker-hystrix-resilience",
    name: "ControlFlowCircuitBreakerHystrixResilienceSkill",
    displayName: "Circuit Breaker Tri-State Automation (Closed, Open, Half-Open)",
    categoryId: "controlFlow",
    description: "Protects upstream systems from cascading failures by automatically opening circuits on consecutive error thresholds.",
    tags: ["control-flow","circuit-breaker","resilience","fault-tolerance","microservices"],
    transform: createStandardSkillTransform({
      sectionName: "Circuit Breaker Fault Tolerance Standards",
      ruSectionName: "Автоматический выключатель (Circuit Breaker: Closed, Open, Half-Open)",
      instructions: [
        "Closed State: Normal operation, counting failure percentage over a rolling 10-second sliding window.",
        "Open State: Immediately fast-fail subsequent requests without hitting downstream failing servers.",
        "Half-Open State: Allow single probe request through after cooldown period to test recovery."
],
      ruInstructions: [
        "Состояние Closed: Обычный режим с подсчетом процента ошибок в скользящем 10-секундном окне.",
        "Состояние Open: Мгновенный сброс входящих запросов с возвратом fallback без обращения к упавшему сервису.",
        "Состояние Half-Open: Пропуск пробного запроса по истечении таймаута для проверки восстановления бэкенда."
],
      semanticType: "protocol",
      tags: ["control-flow","circuit-breaker","resilience","fault-tolerance","microservices"],
    }),
  },

  "control-flow-leaky-bucket-token-bucket-rate-limiting": {
    id: "control-flow-leaky-bucket-token-bucket-rate-limiting",
    name: "ControlFlowLeakyBucketTokenBucketRateLimitingSkill",
    displayName: "Token Bucket & Leaky Bucket Rate Limiting Algorithms",
    categoryId: "controlFlow",
    description: "Controls traffic bursts and sustains steady throughput using Redis-backed Token Bucket and Leaky Bucket algorithms.",
    tags: ["control-flow","rate-limiting","token-bucket","traffic-shaping","redis"],
    transform: createStandardSkillTransform({
      sectionName: "Token Bucket Traffic Shaping Standards",
      ruSectionName: "Алгоритмы ограничения частоты запросов Token Bucket и Leaky Bucket",
      instructions: [
        "Replenish tokens at a constant fractional rate based on elapsed millisecond timestamps.",
        "Permit short bursts up to max bucket capacity while strictly enforcing average egress rate limits.",
        "Return standard HTTP headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `Retry-After`."
],
      ruInstructions: [
        "Пополняйте токены с постоянной скоростью на основе прошедшего времени в миллисекундах.",
        "Разрешайте кратковременные всплески трафика в пределах емкости корзины при контроле средней скорости.",
        "Возвращайте стандартные HTTP-заголовки: `X-RateLimit-Limit`, `X-RateLimit-Remaining` и `Retry-After`."
],
      semanticType: "protocol",
      tags: ["control-flow","rate-limiting","token-bucket","traffic-shaping","redis"],
    }),
  },

  "control-flow-map-reduce-parallel-fan-out-fan-in": {
    id: "control-flow-map-reduce-parallel-fan-out-fan-in",
    name: "ControlFlowMapReduceParallelFanOutFanInSkill",
    displayName: "Parallel Fan-Out / Fan-In MapReduce Aggregation Flow",
    categoryId: "controlFlow",
    description: "Splits monolithic workloads into parallel independent workers (Fan-Out) and aggregates results into a single payload (Fan-In).",
    tags: ["control-flow","map-reduce","fan-out-fan-in","concurrency","parallelism"],
    transform: createStandardSkillTransform({
      sectionName: "Fan-Out / Fan-In Concurrency Standards",
      ruSectionName: "Параллельное ветвление и агрегация результатов (Fan-Out / Fan-In MapReduce)",
      instructions: [
        "Chunk input data into evenly balanced partitions across concurrent worker threads or async tasks.",
        "Handle partial worker failures gracefully using `Promise.allSettled()` without failing entire batches.",
        "Aggregate child outputs via a deterministic, associative reduction function."
],
      ruInstructions: [
        "Разбивайте массив данных на сбалансированные части между параллельными воркерами или асинхронными задачами.",
        "Обрабатывайте частичные сбои через `Promise.allSettled()` без падения всего батча.",
        "Объединяйте результаты через детерминированную ассоциативную функцию редукции (Reduce)."
],
      semanticType: "protocol",
      tags: ["control-flow","map-reduce","fan-out-fan-in","concurrency","parallelism"],
    }),
  },

  "control-flow-priority-queue-preemptive-scheduling": {
    id: "control-flow-priority-queue-preemptive-scheduling",
    name: "ControlFlowPriorityQueuePreemptiveSchedulingSkill",
    displayName: "Binary Heap Priority Queue & Fair Preemptive Scheduling",
    categoryId: "controlFlow",
    description: "Prioritizes critical tasks using binary min/max heaps with anti-starvation aging mechanisms for low-priority jobs.",
    tags: ["control-flow","priority-queue","binary-heap","scheduling","algorithms"],
    transform: createStandardSkillTransform({
      sectionName: "Priority Queue Scheduling Standards",
      ruSectionName: "Очередь с приоритетами на двоичной куче и защита от голодания задач",
      instructions: [
        "Order task execution using an efficient $O(\\log N)$ binary min-heap data structure.",
        "Increment priority rank of waiting low-priority tasks over time (Aging) to prevent starvation.",
        "Support preemptive cancellation of inflight lower-priority tasks when emergency critical tasks arrive."
],
      ruInstructions: [
        "Управляйте порядком задач через структуру двоичной кучи со сложностью $O(\\log N)$.",
        "Повышайте приоритет долго ожидающих задач с течением времени (Aging) для защиты от голодания.",
        "Поддерживайте безопасное прерывание фоновых задач при поступлении критически важных событий."
],
      semanticType: "protocol",
      tags: ["control-flow","priority-queue","binary-heap","scheduling","algorithms"],
    }),
  },

  "control-flow-sliding-window-log-rate-limiter": {
    id: "control-flow-sliding-window-log-rate-limiter",
    name: "ControlFlowSlidingWindowLogRateLimiterSkill",
    displayName: "Sliding Window Log & Sliding Window Counter Rate Limiter",
    categoryId: "controlFlow",
    description: "Eliminates boundary burst vulnerabilities of fixed-window counters using Redis sorted sets (ZSET) timestamp logs.",
    tags: ["control-flow","sliding-window","rate-limiting","redis","security"],
    transform: createStandardSkillTransform({
      sectionName: "Sliding Window Rate Limiter Architecture",
      ruSectionName: "Ограничение скорости по скользящему окну (Sliding Window Log на Redis ZSET)",
      instructions: [
        "Remove timestamps older than `now - window_size` using Redis `ZREMRANGEBYSCORE`.",
        "Count remaining items in the sorted set using `ZCARD`; reject requests if count exceeds limit.",
        "Add current timestamp using `ZADD` inside an atomic Redis multi-exec transaction."
],
      ruInstructions: [
        "Удаляйте временные метки старше границы окна с помощью команды Redis `ZREMRANGEBYSCORE`.",
        "Считайте текущие запросы через `ZCARD` и отклоняйте вызов при превышении лимита.",
        "Добавляйте текущую метку через `ZADD` в рамках единой атомарной транзакции Redis."
],
      semanticType: "protocol",
      tags: ["control-flow","sliding-window","rate-limiting","redis","security"],
    }),
  },

  "control-flow-pub-sub-event-broker-fan-out": {
    id: "control-flow-pub-sub-event-broker-fan-out",
    name: "ControlFlowPubSubEventBrokerFanOutSkill",
    displayName: "Publish-Subscribe Event Broker & Topic-Based Routing",
    categoryId: "controlFlow",
    description: "Decouples producers from consumers using asynchronous Pub/Sub event brokers, dead-letter queues, and wildcard topic matching.",
    tags: ["control-flow","pub-sub","event-driven","messaging","architecture"],
    transform: createStandardSkillTransform({
      sectionName: "Publish-Subscribe Event Routing Standards",
      ruSectionName: "Событийная шина Publish-Subscribe и маршрутизация сообщений по топикам",
      instructions: [
        "Publish events to semantic topic hierarchies (e.g. `order.created.v2`) without producer knowledge of subscribers.",
        "Route messages to multiple independent subscriber queues with at-least-once delivery guarantees.",
        "Route unparseable or poison-pill messages to a Dead-Letter Queue (DLQ) after 3 failed delivery attempts."
],
      ruInstructions: [
        "Публикуйте события в иерархические топики (`order.created.v2`) без привязки к конкретным получателям.",
        "Маршрутизируйте сообщения в независимые очереди подписчиков с гарантией доставки at-least-once.",
        "Направляйте необрабатываемые сообщения в очередь недоставленных сообщений (Dead-Letter Queue / DLQ)."
],
      semanticType: "protocol",
      tags: ["control-flow","pub-sub","event-driven","messaging","architecture"],
    }),
  },

  "control-flow-distributed-semaphore-lease-concurrency": {
    id: "control-flow-distributed-semaphore-lease-concurrency",
    name: "ControlFlowDistributedSemaphoreLeaseConcurrencySkill",
    displayName: "Distributed Semaphore & Time-Bounded Lease Concurrency",
    categoryId: "controlFlow",
    description: "Controls bounded concurrency across multi-instance microservices using Redis/Consul distributed counting semaphores with TTL leases.",
    tags: ["control-flow","distributed-semaphore","concurrency","locking","redis"],
    transform: createStandardSkillTransform({
      sectionName: "Distributed Semaphore & Lease Protocol",
      ruSectionName: "Распределенный семафор и управление параллелизмом через аренду с TTL",
      instructions: [
        "Acquire semaphore slot with an explicit Time-To-Live (TTL) expiration lease to prevent deadlocks from crashed holders.",
        "Refresh lease heartbeat periodically during extended processing.",
        "Release semaphore slot atomically via Lua script verifying token ownership."
],
      ruInstructions: [
        "Занимайте слот семафора с обязательным временем жизни (TTL) для защиты от зависаний при падении процесса.",
        "Продлевайте аренду (Heartbeat) в процессе выполнения долгих операций.",
        "Освобождайте слот семафора атомарным Lua-скриптом с проверкой владения идентификатором блокировки."
],
      semanticType: "protocol",
      tags: ["control-flow","distributed-semaphore","concurrency","locking","redis"],
    }),
  },

  "control-flow-human-in-the-loop-pause-resume-checkpoint": {
    id: "control-flow-human-in-the-loop-pause-resume-checkpoint",
    name: "ControlFlowHumanInTheLoopPauseResumeCheckpointSkill",
    displayName: "Human-in-the-Loop (HITL) Workflow Pause & Resume Checkpoints",
    categoryId: "controlFlow",
    description: "Suspends automated agent execution state at high-risk action checkpoints, waiting for manual human approval or modification.",
    tags: ["control-flow","hitl","human-in-the-loop","approval-workflow","safety"],
    transform: createStandardSkillTransform({
      sectionName: "Human-in-the-Loop Checkpoint Protocol",
      ruSectionName: "Точки останова и возобновления Human-in-the-Loop (HITL) для утверждения человеком",
      instructions: [
        "Serialize entire workflow execution context and variable state into durable storage upon reaching a sensitive action threshold.",
        "Send interactive notification (Slack, Email, UI modal) with clear diff summary and 1-click Approve / Reject buttons.",
        "Resume execution seamlessly from the exact paused instruction point upon receiving human confirmation."
],
      ruInstructions: [
        "Сериализуйте контекст и состояние переменных воркера в БД при достижении точки контроля чувствительных действий.",
        "Отправляйте уведомление (Slack, UI) с наглядным diff изменений и кнопками «Утвердить / Отклонить».",
        "Возобновляйте выполнение процесса с сохраненного шага после получения подтверждения от оператора."
],
      semanticType: "protocol",
      tags: ["control-flow","hitl","human-in-the-loop","approval-workflow","safety"],
    }),
  },

  "control-flow-async-await-concurrency-limiter": {
    id: "control-flow-async-await-concurrency-limiter",
    name: "ControlFlowAsyncAwaitConcurrencyLimiterSkill",
    displayName: "Async/Await Promise Concurrency Pool Limiter (p-limit)",
    categoryId: "controlFlow",
    description: "Limits parallel Promise execution concurrency (e.g. 5 concurrent HTTP calls) to prevent memory exhaustion and socket exhaustion.",
    tags: ["control-flow","concurrency","async-await","promises","typescript"],
    transform: createStandardSkillTransform({
      sectionName: "Promise Concurrency Limiting Standards",
      ruSectionName: "Ограничение параллелизма асинхронных вызовов (Promise Concurrency Pool)",
      instructions: [
        "Wrap asynchronous tasks in a bounded concurrency limiter (e.g. `p-limit(concurrency)`).",
        "Queue excess tasks in memory without initiating external network sockets until an active slot frees up.",
        "Capture and isolate individual task rejections so one failed promise does not crash the entire pool."
],
      ruInstructions: [
        "Оборачивайте асинхронные задачи в пул с фиксированным параллелизмом (например, `p-limit(5)`).",
        "Ставьте избыточные вызовы в очередь памяти без открытия лишних сокетов до освобождения слота.",
        "Изолируйте ошибки отдельных задач, предотвращая аварийное завершение всего пула промисов."
],
      semanticType: "protocol",
      tags: ["control-flow","concurrency","async-await","promises","typescript"],
    }),
  },

  "control-flow-optimistic-locking-version-cas": {
    id: "control-flow-optimistic-locking-version-cas",
    name: "ControlFlowOptimisticLockingVersionCasSkill",
    displayName: "Optimistic Concurrency Control (OCC) & Compare-And-Swap (CAS)",
    categoryId: "controlFlow",
    description: "Guards against lost updates in concurrent databases using integer version columns and atomic Compare-And-Swap statements.",
    tags: ["control-flow","optimistic-locking","concurrency","database","cas"],
    transform: createStandardSkillTransform({
      sectionName: "Optimistic Concurrency Control Standards",
      ruSectionName: "Оптимистичные блокировки (OCC) и атомарный Compare-And-Swap (CAS) по версии",
      instructions: [
        "Include a monotonically increasing `version` integer column on all mutable database records.",
        "Execute mutations with atomic conditions: `UPDATE table SET val = :val, version = version + 1 WHERE id = :id AND version = :current_version`.",
        "Retry the read-modify-write cycle automatically upon detecting zero updated rows (version collision)."
],
      ruInstructions: [
        "Добавляйте монотонно растущее целочисленное поле `version` во все изменяемые сущности БД.",
        "Выполняйте запись с условием: `UPDATE table SET ..., version = version + 1 WHERE id = :id AND version = :version`.",
        "Автоматически повторяйте чтение и запись при обнаружении конфликта версий (0 обновленных строк)."
],
      semanticType: "protocol",
      tags: ["control-flow","optimistic-locking","concurrency","database","cas"],
    }),
  },

  "control-flow-actor-model-message-passing-mailbox": {
    id: "control-flow-actor-model-message-passing-mailbox",
    name: "ControlFlowActorModelMessagePassingMailboxSkill",
    displayName: "Actor Model Concurrency & Isolated Mailbox Message Passing",
    categoryId: "controlFlow",
    description: "Eliminates shared mutable memory race conditions using isolated actors communicating strictly via asynchronous message mailboxes.",
    tags: ["control-flow","actor-model","concurrency","message-passing","erlang-akka"],
    transform: createStandardSkillTransform({
      sectionName: "Actor Model Message Passing Standards",
      ruSectionName: "Модель акторов: изолированное состояние и передача сообщений через Mailbox",
      instructions: [
        "Encapsulate all mutable actor state privately; strictly prohibit direct memory access from external actors.",
        "Process incoming mailbox messages sequentially and deterministically in single-threaded event loops.",
        "Handle actor lifecycle supervision with 'Let it crash' restart strategies (One-for-One / One-for-All)."
],
      ruInstructions: [
        "Изолируйте состояние актора внутри экземпляра; исключайте прямой доступ к чужой памяти.",
        "Обрабатывайте входящие сообщения из почтового ящика последовательно и детерминированно.",
        "Реализуйте стратегию супервизии («Let it crash») с автоматическим перезапуском упавших акторов."
],
      semanticType: "protocol",
      tags: ["control-flow","actor-model","concurrency","message-passing","erlang-akka"],
    }),
  },

  "control-flow-idempotency-key-deduplication": {
    id: "control-flow-idempotency-key-deduplication",
    name: "ControlFlowIdempotencyKeyDeduplicationSkill",
    displayName: "Stripe-Style Idempotency Keys & Request Deduplication",
    categoryId: "controlFlow",
    description: "Prevents duplicate charges or side-effects by caching API response payloads against client-generated UUID idempotency keys.",
    tags: ["control-flow","idempotency","api-design","deduplication","reliability"],
    transform: createStandardSkillTransform({
      sectionName: "Idempotency Key Deduplication Protocol",
      ruSectionName: "Идемпотентные ключи запросов (Idempotency Keys) и дедупликация вызовов API",
      instructions: [
        "Require clients to pass a unique `Idempotency-Key: <UUID>` header on all mutating POST requests.",
        "Store idempotency records atomically in Redis/PostgreSQL with `PROCESSING` state before executing logic.",
        "Return the cached previous response body and status code immediately if the same key is received again."
],
      ruInstructions: [
        "Принимайте уникальный заголовок `Idempotency-Key` от клиента для всех изменяющих POST-запросов.",
        "Фиксируйте статус `PROCESSING` в Redis перед стартом выполнения операции для защиты от гонок.",
        "Возвращайте сохраненный результат и статус-код при повторном поступлении того же ключа."
],
      semanticType: "protocol",
      tags: ["control-flow","idempotency","api-design","deduplication","reliability"],
    }),
  },
  "control-flow-leader-election-raft-lease": {
    id: "control-flow-leader-election-raft-lease",
    name: "ControlFlowLeaderElectionRaftLeaseSkill",
    displayName: "Raft Consensus Leader Election & Split-Brain Prevention",
    categoryId: "controlFlow",
    description: "Elects a single authoritative cluster leader using randomized heartbeats, term counters, and majority quorum voting.",
    tags: ["control-flow","raft","leader-election","distributed-systems","consensus"],
    transform: createStandardSkillTransform({
      sectionName: "Raft Leader Election Protocol",
      ruSectionName: "Выборы лидера в консенсусе Raft и защита от Split-Brain",
      instructions: [
        "Transition from Follower to Candidate if no heartbeat is received within randomized timeout (150-300ms).",
        "Request votes across cluster nodes; claim Leader status only after securing strict majority quorum ($N/2 + 1$).",
        "Step down to Follower immediately upon encountering a higher term number."
],
      ruInstructions: [
        "Переходите в состояние кандидата при отсутствии heartbeat-сигнала в течение случайного таймаута (150–300 мс).",
        "Запрашивайте голоса узлов и объявляйте себя лидером только при получении строгого большинства ($N/2 + 1$).",
        "Немедленно слагайте полномочия лидера при получении сообщения с более высоким номером эпохи (Term)."
],
      semanticType: "protocol",
      tags: ["control-flow","raft","leader-election","distributed-systems","consensus"],
    }),
  },

  "control-flow-bulkhead-thread-pool-isolation": {
    id: "control-flow-bulkhead-thread-pool-isolation",
    name: "ControlFlowBulkheadThreadPoolIsolationSkill",
    displayName: "Bulkhead Pattern & Resource Pool Failure Isolation",
    categoryId: "controlFlow",
    description: "Isolates critical system resources into separate dedicated thread/connection pools so failure in one subsystem cannot exhaust others.",
    tags: ["control-flow","bulkhead","isolation","resilience","architecture"],
    transform: createStandardSkillTransform({
      sectionName: "Bulkhead Resource Isolation Standards",
      ruSectionName: "Паттерн Bulkhead: Изоляция пулов ресурсов и защита от каскадных сбоев",
      instructions: [
        "Allocate dedicated connection pools for third-party external integrations (e.g. payment gateway vs analytics).",
        "Enforce maximum queue depths for each bulkhead; fast-reject overflow requests before thread starvation.",
        "Monitor saturation metrics per bulkhead pool independently."
],
      ruInstructions: [
        "Выделяйте независимые пулы соединений для разных внешних сервисов (например, платежи vs аналитика).",
        "Ограничивайте глубину очереди для каждого пула, сбрасывая избыточные запросы до исчерпания потоков.",
        "Отслеживайте метрики загрузки и утилизации для каждого пула изолированно."
],
      semanticType: "protocol",
      tags: ["control-flow","bulkhead","isolation","resilience","architecture"],
    }),
  },

  "control-flow-two-phase-commit-2pc-atomic-coordination": {
    id: "control-flow-two-phase-commit-2pc-atomic-coordination",
    name: "ControlFlowTwoPhaseCommit2pcAtomicCoordinationSkill",
    displayName: "Two-Phase Commit (2PC) Distributed Atomic Coordination",
    categoryId: "controlFlow",
    description: "Guarantees atomic all-or-nothing transactions across multiple databases via Prepare and Commit phases.",
    tags: ["control-flow","2pc","transactions","distributed-systems","coordination"],
    transform: createStandardSkillTransform({
      sectionName: "Two-Phase Commit (2PC) Protocol",
      ruSectionName: "Двухфазный коммит (Two-Phase Commit / 2PC) в распределенных базах данных",
      instructions: [
        "Phase 1 (Prepare): Coordinator queries all cohort nodes; cohorts lock resources and vote YES/NO.",
        "Phase 2 (Commit/Abort): Coordinator issues COMMIT only if 100% cohorts voted YES, otherwise issues ABORT.",
        "Log transaction coordinator state durably to disk before sending Phase 2 decision messages."
],
      ruInstructions: [
        "Фаза 1 (Prepare): Координатор опрашивает узлы; участники блокируют ресурсы и голосуют ЗА/ПРОТИВ.",
        "Фаза 2 (Commit/Abort): Координатор рассылает COMMIT только при 100% согласии, иначе рассылает ABORT.",
        "Записывайте решение координатора в журнал на диск перед отправкой команд второй фазы."
],
      semanticType: "protocol",
      tags: ["control-flow","2pc","transactions","distributed-systems","coordination"],
    }),
  },

  "control-flow-backpressure-reactive-streams-flow-control": {
    id: "control-flow-backpressure-reactive-streams-flow-control",
    name: "ControlFlowBackpressureReactiveStreamsFlowControlSkill",
    displayName: "Reactive Streams Backpressure & Demand-Driven Flow Control",
    categoryId: "controlFlow",
    description: "Prevents fast producers from overwhelming slow consumers using explicit demand signaling (`request(n)`).",
    tags: ["control-flow","backpressure","reactive-streams","flow-control","async"],
    transform: createStandardSkillTransform({
      sectionName: "Reactive Streams Backpressure Protocol",
      ruSectionName: "Управление противодавлением (Backpressure) и реактивные потоки (Reactive Streams)",
      instructions: [
        "Producers must never emit elements until downstream consumers explicitly request buffer capacity (`request(n)`).",
        "Apply configurable overflow strategies (DROP_OLDEST, BUFFER_BOUNDED, ERROR) when consumer capacity is reached.",
        "Propagate cancel signals upstream immediately when consumer terminates or unsubscribes."
],
      ruInstructions: [
        "Источники данных не должны отправлять элементы без явного запроса емкости от получателя (`request(n)`).",
        "Применяйте явные стратегии переполнения буфера (DROP_OLDEST, BUFFER, ERROR) при насыщении потребителя.",
        "Передавайте сигнал отмены подписки вверх по цепочке при завершении обработки."
],
      semanticType: "protocol",
      tags: ["control-flow","backpressure","reactive-streams","flow-control","async"],
    }),
  },

  "control-flow-debounce-throttle-ui-event-pacing": {
    id: "control-flow-debounce-throttle-ui-event-pacing",
    name: "ControlFlowDebounceThrottleUiEventPacingSkill",
    displayName: "Debounce & Throttle High-Frequency Event Pacing",
    categoryId: "controlFlow",
    description: "Paces rapid keyboard, resize, and scroll events using trailing debouncing and leading/trailing throttling.",
    tags: ["control-flow","debounce","throttle","ui-events","performance"],
    transform: createStandardSkillTransform({
      sectionName: "Event Debouncing & Throttling Standards",
      ruSectionName: "Оптимизация высокочастотных событий (Debounce и Throttle в UI)",
      instructions: [
        "Use Debounce (wait for $N$ ms of silence) for search auto-complete inputs and window resize recalculations.",
        "Use Throttle (execute at most once per $N$ ms) for continuous scroll position tracking and canvas draws.",
        "Cancel pending timers properly on React component unmount to prevent memory leaks."
],
      ruInstructions: [
        "Применяйте Debounce (ожидание паузы в $N$ мс) для поисковых подсказок и перерасчета геометрии экрана.",
        "Используйте Throttle (не чаще раза в $N$ мс) для отслеживания скролла и анимаций отрисовки.",
        "Обязательно очищайте таймеры при размонтировании React-компонентов для защиты от утечек памяти."
],
      semanticType: "protocol",
      tags: ["control-flow","debounce","throttle","ui-events","performance"],
    }),
  },

  "control-flow-pipeline-middleware-onion-architecture": {
    id: "control-flow-pipeline-middleware-onion-architecture",
    name: "ControlFlowPipelineMiddlewareOnionArchitectureSkill",
    displayName: "Composable Middleware Pipeline & Onion Execution Flow",
    categoryId: "controlFlow",
    description: "Executes request/response pipelines through composable middleware layers with pre-processing, next() delegation, and post-processing.",
    tags: ["control-flow","middleware","pipeline","onion-architecture","express-koa"],
    transform: createStandardSkillTransform({
      sectionName: "Composable Middleware Pipeline Standards",
      ruSectionName: "Конвейер промежуточной обработки Middleware («Луковичная архитектура» Onion Flow)",
      instructions: [
        "Delegate to the next middleware in chain via `await next()`.",
        "Execute pre-processing logic before `next()` and post-processing/error inspection after `next()` resolves.",
        "Support early exit and response short-circuiting for authentication failures and validation errors."
],
      ruInstructions: [
        "Передавайте управление следующему слою в цепочке через вызов `await next()`.",
        "Выполняйте логику предварительной обработки до `next()` и пост-обработку результата после завершения.",
        "Поддерживайте досрочное прерывание цепочки при ошибках авторизации и валидации."
],
      semanticType: "protocol",
      tags: ["control-flow","middleware","pipeline","onion-architecture","express-koa"],
    }),
  },

  "control-flow-gossip-protocol-cluster-membership": {
    id: "control-flow-gossip-protocol-cluster-membership",
    name: "ControlFlowGossipProtocolClusterMembershipSkill",
    displayName: "SWIM Gossip Protocol & Cluster Failure Detection",
    categoryId: "controlFlow",
    description: "Disseminates cluster state and detects node failures using weakly-consistent peer-to-peer Gossip message exchanges.",
    tags: ["control-flow","gossip-protocol","swim","cluster","distributed-systems"],
    transform: createStandardSkillTransform({
      sectionName: "Gossip Protocol Cluster Standards",
      ruSectionName: "Протокол сплетен (Gossip Protocol / SWIM) для обнаружения сбоев в кластере",
      instructions: [
        "Periodically ping random peer nodes; if no ack is received, request indirect pings through $k$ auxiliary peers.",
        "Declare node SUSPECT before DEAD to allow transient network partitions to recover gracefully.",
        "Piggyback membership updates onto existing heartbeat messages to achieve $O(1)$ network overhead per node."
],
      ruInstructions: [
        "Периодически опрашивайте случайные узлы кластера; при отсутствии ответа запрашивайте косвенный пинг через $k$ соседей.",
        "Помечайте узел как SUSPECT перед окончательным объявлением DEAD для защиты от кратковременных задержек.",
        "Добавляйте информацию об изменениях состава кластера к регулярным сообщениям без роста трафика."
],
      semanticType: "protocol",
      tags: ["control-flow","gossip-protocol","swim","cluster","distributed-systems"],
    }),
  },

  "control-flow-cqrs-event-stream-subscription": {
    id: "control-flow-cqrs-event-stream-subscription",
    name: "ControlFlowCqrsEventStreamSubscriptionSkill",
    displayName: "CQRS Asynchronous Event Stream Projection & Replay",
    categoryId: "controlFlow",
    description: "Subscribes to write-side event streams to build high-speed read projections with catch-up replay capabilities.",
    tags: ["control-flow","cqrs","event-stream","projection","kafka"],
    transform: createStandardSkillTransform({
      sectionName: "CQRS Event Projection Protocol",
      ruSectionName: "Асинхронные проекции событий CQRS и воспроизведение потоков (Replay)",
      instructions: [
        "Maintain a persistent consumer offset checkpoint for each read-model projection.",
        "Ensure projection event handlers are idempotent: replaying duplicate events produces identical projection state.",
        "Support background rebuilds of projections by replaying event logs from stream origin (`offset = 0`)."
],
      ruInstructions: [
        "Сохраняйте позицию смещения (Offset Checkpoint) для каждой проекции модели чтения.",
        "Обеспечивайте строгую идемпотентность обработчиков: повтор события не должен искажать данные.",
        "Поддерживайте фоновое перестроение проекций путем полного перезапуска потока с нулевого смещения."
],
      semanticType: "protocol",
      tags: ["control-flow","cqrs","event-stream","projection","kafka"],
    }),
  },

  "control-flow-fork-join-recursive-divide-conquer": {
    id: "control-flow-fork-join-recursive-divide-conquer",
    name: "ControlFlowForkJoinRecursiveDivideConquerSkill",
    displayName: "Fork-Join Parallel Recursive Divide-and-Conquer",
    categoryId: "controlFlow",
    description: "Breaks massive computational trees into subtasks (Fork) executed on work-stealing thread pools, merging outputs (Join).",
    tags: ["control-flow","fork-join","divide-and-conquer","parallelism","algorithms"],
    transform: createStandardSkillTransform({
      sectionName: "Fork-Join Concurrency Standards",
      ruSectionName: "Параллельная модель Fork-Join и рекурсивное разделение задач (Divide and Conquer)",
      instructions: [
        "Split tasks exceeding a predefined sequential threshold recursively into left and right subtasks (Fork).",
        "Execute small subtasks sequentially at the base case to avoid fork overhead thrashing.",
        "Join subtask results asynchronously using work-stealing queues to maximize CPU core utilization."
],
      ruInstructions: [
        "Рекурсивно разделяйте крупные задачи на подзадачи (Fork) при превышении порогового размера.",
        "Выполняйте базовые мелкие подзадачи последовательно без накладных расходов на создание потоков.",
        "Объединяйте результаты (Join) с использованием очередей Work-Stealing для равномерной загрузки ядер CPU."
],
      semanticType: "protocol",
      tags: ["control-flow","fork-join","divide-and-conquer","parallelism","algorithms"],
    }),
  },

  "control-flow-graceful-shutdown-drain-connections": {
    id: "control-flow-graceful-shutdown-drain-connections",
    name: "ControlFlowGracefulShutdownDrainConnectionsSkill",
    displayName: "Graceful Process Shutdown & In-Flight Connection Draining",
    categoryId: "controlFlow",
    description: "Handles SIGTERM/SIGINT signals by refusing new requests, completing in-flight jobs, and closing database pools cleanly.",
    tags: ["control-flow","graceful-shutdown","devops","lifecycle","reliability"],
    transform: createStandardSkillTransform({
      sectionName: "Graceful Process Termination Protocol",
      ruSectionName: "Корректное завершение процессов (Graceful Shutdown) и сброс активных соединений",
      instructions: [
        "Intercept `SIGTERM` and `SIGINT` signals; immediately stop accepting new HTTP/gRPC requests.",
        "Allow active in-flight requests a graceful grace period (e.g. 30 seconds) to complete processing.",
        "Close database connection pools, flush log buffers, and exit process with status code 0."
],
      ruInstructions: [
        "Перехватывайте системные сигналы `SIGTERM` и `SIGINT`, прекращая прием новых входящих запросов.",
        "Предоставляйте активным фоновым операциям фиксированный таймаут (например, 30 секунд) на завершение.",
        "Закрывайте пулы баз данных, сбрасывайте буферы логов на диск и завершайте процесс с кодом 0."
],
      semanticType: "protocol",
      tags: ["control-flow","graceful-shutdown","devops","lifecycle","reliability"],
    }),
  },
};
