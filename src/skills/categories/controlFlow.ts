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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
    categoryId: 'control_flow',
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
  "control-flow-singleflight-request-deduplication": {
    id: "control-flow-singleflight-request-deduplication",
    name: "ControlFlowSingleflightRequestDeduplicationSkill",
    displayName: "Singleflight In-Flight Request Deduplication & Thundering Herd Defense",
    categoryId: 'control_flow',
    description: "Suppresses duplicate concurrent calls to expensive backends by sharing a single in-flight promise across identical simultaneous requests.",
    tags: ["control-flow","singleflight","concurrency","caching","performance"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","singleflight","concurrency","caching","performance"],
    }),
  },

  "control-flow-hedged-requests-tail-latency": {
    id: "control-flow-hedged-requests-tail-latency",
    name: "ControlFlowHedgedRequestsTailLatencySkill",
    displayName: "Hedged Requests & Tail Latency p99 Elimination (Jeff Dean Pattern)",
    categoryId: 'control_flow',
    description: "Issues redundant duplicate requests to backup servers when p95 latency threshold expires, taking whichever response arrives first.",
    tags: ["control-flow","hedged-requests","tail-latency","distributed-systems","p99"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","hedged-requests","tail-latency","distributed-systems","p99"],
    }),
  },

  "control-flow-transactional-outbox-cdc-pattern": {
    id: "control-flow-transactional-outbox-cdc-pattern",
    name: "ControlFlowTransactionalOutboxCdcPatternSkill",
    displayName: "Transactional Outbox Pattern & CDC Broker Guarantees",
    categoryId: 'control_flow',
    description: "Guarantees dual-write consistency by persisting domain events to an outbox table in the same database transaction, polled via CDC.",
    tags: ["control-flow","outbox-pattern","cdc","event-driven","consistency"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","outbox-pattern","cdc","event-driven","consistency"],
    }),
  },

  "control-flow-fencing-tokens-distributed-lock": {
    id: "control-flow-fencing-tokens-distributed-lock",
    name: "ControlFlowFencingTokensDistributedLockSkill",
    displayName: "Distributed Locks with Monotonic Fencing Tokens (Martin Kleppmann)",
    categoryId: 'control_flow',
    description: "Prevents split-brain race conditions from GC pauses by issuing monotonically increasing fencing tokens validated by storage.",
    tags: ["control-flow","distributed-lock","fencing-tokens","concurrency","consistency"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","distributed-lock","fencing-tokens","concurrency","consistency"],
    }),
  },

  "control-flow-scatter-gather-dynamic-quorum": {
    id: "control-flow-scatter-gather-dynamic-quorum",
    name: "ControlFlowScatterGatherDynamicQuorumSkill",
    displayName: "Scatter-Gather Fan-Out with Dynamic Quorum Thresholds",
    categoryId: 'control_flow',
    description: "Broadcasts requests to N independent service nodes, resolving early as soon as a configurable quorum threshold (M of N) responds.",
    tags: ["control-flow","scatter-gather","quorum","concurrency","aggregation"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","scatter-gather","quorum","concurrency","aggregation"],
    }),
  },

  "control-flow-abort-controller-cascade-cancellation": {
    id: "control-flow-abort-controller-cascade-cancellation",
    name: "ControlFlowAbortControllerCascadeCancellationSkill",
    displayName: "Hierarchical AbortController & Tree Cancellation Cascades",
    categoryId: 'control_flow',
    description: "Propagates cancellation signals down deep nested asynchronous call trees using linked AbortController signal hierarchies.",
    tags: ["control-flow","abort-controller","cancellation","async","typescript"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","abort-controller","cancellation","async","typescript"],
    }),
  },

  "control-flow-statechart-history-states-harel": {
    id: "control-flow-statechart-history-states-harel",
    name: "ControlFlowStatechartHistoryStatesHarelSkill",
    displayName: "Harel Statecharts: Shallow & Deep History State Transitions",
    categoryId: 'control_flow',
    description: "Preserves nested sub-state configurations during temporary interrupt transitions using Statechart History states ($H$ / $H^*$).",
    tags: ["control-flow","statecharts","fsm","history-states","xstate"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","statecharts","fsm","history-states","xstate"],
    }),
  },

  "control-flow-poison-pill-dead-letter-triage": {
    id: "control-flow-poison-pill-dead-letter-triage",
    name: "ControlFlowPoisonPillDeadLetterTriageSkill",
    displayName: "Poison Pill Isolation & Dead-Letter Queue (DLQ) Auto-Triage",
    categoryId: 'control_flow',
    description: "Detects corrupted unprocessable messages (poison pills) in worker queues, isolating them to DLQ with diagnostic error traces.",
    tags: ["control-flow","dlq","poison-pill","queue","reliability"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","dlq","poison-pill","queue","reliability"],
    }),
  },

  "control-flow-sse-fallback-long-polling-transport": {
    id: "control-flow-sse-fallback-long-polling-transport",
    name: "ControlFlowSseFallbackLongPollingTransportSkill",
    displayName: "Server-Sent Events (SSE) Graceful Downgrade to Long-Polling",
    categoryId: 'control_flow',
    description: "Maintains real-time streaming connections by falling back from HTTP/2 SSE to adaptive HTTP long-polling behind restrictive proxies.",
    tags: ["control-flow","sse","long-polling","realtime","transport-fallback"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","sse","long-polling","realtime","transport-fallback"],
    }),
  },

  "control-flow-bloom-filter-idempotent-window": {
    id: "control-flow-bloom-filter-idempotent-window",
    name: "ControlFlowBloomFilterIdempotentWindowSkill",
    displayName: "Scalable Bloom Filter Sliding-Window Idempotency Filter",
    categoryId: 'control_flow',
    description: "Performs ultra-fast $O(1)$ pre-filtering of duplicate webhook payloads using tiered in-memory Counting Bloom Filters.",
    tags: ["control-flow","bloom-filter","idempotency","webhooks","high-throughput"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","bloom-filter","idempotency","webhooks","high-throughput"],
    }),
  },

  "control-flow-choreography-vs-orchestration-saga": {
    id: "control-flow-choreography-vs-orchestration-saga",
    name: "ControlFlowChoreographyVsOrchestrationSagaSkill",
    displayName: "Event-Driven Choreography vs Centralized Orchestrator Decision Engine",
    categoryId: 'control_flow',
    description: "Selects and implements event choreography for decoupled 2-3 step flows, or centralized state machine orchestrators for complex sagas.",
    tags: ["control-flow","choreography","orchestration","microservices","saga"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","choreography","orchestration","microservices","saga"],
    }),
  },

  "control-flow-adaptive-load-shedding-queue-delay": {
    id: "control-flow-adaptive-load-shedding-queue-delay",
    name: "ControlFlowAdaptiveLoadSheddingQueueDelaySkill",
    displayName: "Adaptive Load Shedding based on CoDel Queue Sojourn Time",
    categoryId: 'control_flow',
    description: "Sheds incoming excess load dynamically when queue waiting time (sojourn time) exceeds target SLO thresholds (e.g. 50ms).",
    tags: ["control-flow","load-shedding","codel","overload-protection","resilience"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","load-shedding","codel","overload-protection","resilience"],
    }),
  },

  "control-flow-worker-pool-work-stealing-deque": {
    id: "control-flow-worker-pool-work-stealing-deque",
    name: "ControlFlowWorkerPoolWorkStealingDequeSkill",
    displayName: "Work-Stealing Thread Pool with Lock-Free Double-Ended Queues",
    categoryId: 'control_flow',
    description: "Balances uneven multi-threaded CPU workloads by allowing idle threads to steal tasks from the tail of busy worker deques.",
    tags: ["control-flow","work-stealing","concurrency","thread-pool","performance"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","work-stealing","concurrency","thread-pool","performance"],
    }),
  },

  "control-flow-dynamic-route-intent-classifier": {
    id: "control-flow-dynamic-route-intent-classifier",
    name: "ControlFlowDynamicRouteIntentClassifierSkill",
    displayName: "LLM Semantic Intent Classifier & Dynamic Route Dispatcher",
    categoryId: 'control_flow',
    description: "Routes user prompts to specialized downstream agents, tools, or fast-path regex handlers using semantic intent classification.",
    tags: ["control-flow","intent-classifier","routing","agentic","dispatch"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","intent-classifier","routing","agentic","dispatch"],
    }),
  },

  "control-flow-multi-tier-fallback-ladder": {
    id: "control-flow-multi-tier-fallback-ladder",
    name: "ControlFlowMultiTierFallbackLadderSkill",
    displayName: "Multi-Tier Degrading Fallback Ladder Architecture",
    categoryId: 'control_flow',
    description: "Executes cascading degradation steps (Primary API -> Cache Replica -> Compressed Heuristic -> Static Safe Defaults) on outages.",
    tags: ["control-flow","fallback","graceful-degradation","resilience","high-availability"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","fallback","graceful-degradation","resilience","high-availability"],
    }),
  },

  "control-flow-two-phase-locking-deadlock-prevention": {
    id: "control-flow-two-phase-locking-deadlock-prevention",
    name: "ControlFlowTwoPhaseLockingDeadlockPreventionSkill",
    displayName: "Strict Two-Phase Locking (2PL) & Deadlock Prevention Ordering",
    categoryId: 'control_flow',
    description: "Prevents transactional deadlocks in multi-resource mutations by enforcing deterministic global resource acquisition ordering.",
    tags: ["control-flow","2pl","locking","deadlock-prevention","database"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","2pl","locking","deadlock-prevention","database"],
    }),
  },

  "control-flow-conditional-feature-flag-rollout": {
    id: "control-flow-conditional-feature-flag-rollout",
    name: "ControlFlowConditionalFeatureFlagRolloutSkill",
    displayName: "Multi-Variant Feature Flags & Dynamic Percentage Rollouts",
    categoryId: 'control_flow',
    description: "Evaluates user targeting rules, deterministic consistent-hash percentage bucketing, and emergency kill-switches.",
    tags: ["control-flow","feature-flags","rollout","ab-testing","devops"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","feature-flags","rollout","ab-testing","devops"],
    }),
  },

  "control-flow-event-loop-microtask-macrotask-coordination": {
    id: "control-flow-event-loop-microtask-macrotask-coordination",
    name: "ControlFlowEventLoopMicrotaskMacrotaskCoordinationSkill",
    displayName: "V8 Event Loop Scheduling: Microtasks vs Macrotasks vs requestAnimationFrame",
    categoryId: 'control_flow',
    description: "Schedules browser and Node.js tasks precisely across `queueMicrotask`, `Promise.then`, `setImmediate`, and `requestAnimationFrame`.",
    tags: ["control-flow","event-loop","microtasks","macrotasks","javascript-runtime"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","event-loop","microtasks","macrotasks","javascript-runtime"],
    }),
  },

  "control-flow-stream-chunking-windowed-aggregation": {
    id: "control-flow-stream-chunking-windowed-aggregation",
    name: "ControlFlowStreamChunkingWindowedAggregationSkill",
    displayName: "Streaming Chunk Aggregation & Sliding-Window Time Buffers",
    categoryId: 'control_flow',
    description: "Groups high-frequency real-time stream chunks into time-windowed batches (e.g. every 100ms or 50 items) for bulk database ingestion.",
    tags: ["control-flow","streaming","batching","aggregation","buffers"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","streaming","batching","aggregation","buffers"],
    }),
  },

  "control-flow-retry-after-http-429-respect": {
    id: "control-flow-retry-after-http-429-respect",
    name: "ControlFlowRetryAfterHttp429RespectSkill",
    displayName: "HTTP 429 Rate-Limit & Server `Retry-After` Header Adherence",
    categoryId: 'control_flow',
    description: "Parses and strictly respects server `Retry-After` (seconds / HTTP date) headers, pausing client execution queues dynamically.",
    tags: ["control-flow","retry-after","http-429","rate-limiting","resilience"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","retry-after","http-429","rate-limiting","resilience"],
    }),
  },
  "control-flow-priority-inversion-inheritance": {
    id: "control-flow-priority-inversion-inheritance",
    name: "ControlFlowPriorityInversionInheritanceSkill",
    displayName: "Priority Inheritance Protocol & Real-Time Lock Inversion Defense",
    categoryId: 'control_flow',
    description: "Eliminates priority inversion in real-time execution by elevating the priority of a low-priority task holding a critical mutex.",
    tags: ["control-flow","priority-inversion","concurrency","mutex","real-time"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","priority-inversion","concurrency","mutex","real-time"],
    }),
  },

  "control-flow-branch-prediction-hinting-hot-path": {
    id: "control-flow-branch-prediction-hinting-hot-path",
    name: "ControlFlowBranchPredictionHintingHotPathSkill",
    displayName: "Hot-Path Branch Prediction & CPU Pipeline Optimization",
    categoryId: 'control_flow',
    description: "Structures high-frequency conditional evaluation using `likely()` / `unlikely()` branch hinting to minimize CPU pipeline flush stalls.",
    tags: ["control-flow","branch-prediction","cpu-optimization","performance","low-level"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","branch-prediction","cpu-optimization","performance","low-level"],
    }),
  },

  "control-flow-idempotent-replay-token-window": {
    id: "control-flow-idempotent-replay-token-window",
    name: "ControlFlowIdempotentReplayTokenWindowSkill",
    displayName: "Idempotent Replay Window & Cryptographic Nonce Validation",
    categoryId: 'control_flow',
    description: "Validates incoming state mutation requests using timestamp-bounded nonces, rejecting replays outside a sliding 5-minute clock window.",
    tags: ["control-flow","idempotency","nonce","security","distributed-systems"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","idempotency","nonce","security","distributed-systems"],
    }),
  },

  "control-flow-hierarchical-timeout-propagation": {
    id: "control-flow-hierarchical-timeout-propagation",
    name: "ControlFlowHierarchicalTimeoutPropagationSkill",
    displayName: "Hierarchical Deadline & gRPC Context Timeout Propagation",
    categoryId: 'control_flow',
    description: "Passes monotonically shrinking absolute deadlines across distributed microservice RPC calls, preventing dead computation.",
    tags: ["control-flow","deadline-propagation","grpc","timeout","microservices"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","deadline-propagation","grpc","timeout","microservices"],
    }),
  },

  "control-flow-event-sourcing-checkpoint-snapshot": {
    id: "control-flow-event-sourcing-checkpoint-snapshot",
    name: "ControlFlowEventSourcingCheckpointSnapshotSkill",
    displayName: "Event Sourcing Periodic Snapshots & Monotonic Checkpoints",
    categoryId: 'control_flow',
    description: "Accelerates entity aggregate state reconstitution by saving periodic checkpoint snapshots every N events (e.g. every 100 events).",
    tags: ["control-flow","event-sourcing","snapshots","checkpoints","cqrs"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","event-sourcing","snapshots","checkpoints","cqrs"],
    }),
  },

  "control-flow-concurrency-pipeline-stage-buffering": {
    id: "control-flow-concurrency-pipeline-stage-buffering",
    name: "ControlFlowConcurrencyPipelineStageBufferingSkill",
    displayName: "Staged Pipeline Architecture & Bounded Channel Buffers (Go Channels / CSP)",
    categoryId: 'control_flow',
    description: "Organizes concurrent data pipelines into discrete processing stages connected by bounded FIFO channels with explicit backpressure.",
    tags: ["control-flow","csp","pipeline","channels","concurrency"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","csp","pipeline","channels","concurrency"],
    }),
  },

  "control-flow-circuit-breaker-exponential-probe": {
    id: "control-flow-circuit-breaker-exponential-probe",
    name: "ControlFlowCircuitBreakerExponentialProbeSkill",
    displayName: "Circuit Breaker Exponential Half-Open Probe Backoff",
    categoryId: 'control_flow',
    description: "Applies exponential cool-down backoff to half-open probe requests when downstream services suffer prolonged intermittent flapping.",
    tags: ["control-flow","circuit-breaker","half-open","flapping","resilience"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","circuit-breaker","half-open","flapping","resilience"],
    }),
  },

  "control-flow-multi-region-failover-dns-healthcheck": {
    id: "control-flow-multi-region-failover-dns-healthcheck",
    name: "ControlFlowMultiRegionFailoverDnsHealthcheckSkill",
    displayName: "Active-Passive Multi-Region DNS Failover & Health Checks",
    categoryId: 'control_flow',
    description: "Reroutes global user traffic automatically across multi-cloud regions upon persistent edge health check failures.",
    tags: ["control-flow","dns-failover","multi-region","disaster-recovery","high-availability"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","dns-failover","multi-region","disaster-recovery","high-availability"],
    }),
  },

  "control-flow-bounded-retry-budget-token-leaky": {
    id: "control-flow-bounded-retry-budget-token-leaky",
    name: "ControlFlowBoundedRetryBudgetTokenLeakySkill",
    displayName: "Client-Side Retry Budgets (Finagle / Envoy Token Bucket)",
    categoryId: 'control_flow',
    description: "Limits client retry volume to a strict percentage (e.g. max 10% of total outbound requests) to prevent retry storm amplification.",
    tags: ["control-flow","retry-budget","envoy","resilience","traffic-management"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","retry-budget","envoy","resilience","traffic-management"],
    }),
  },

  "control-flow-request-hedging-cost-aware": {
    id: "control-flow-request-hedging-cost-aware",
    name: "ControlFlowRequestHedgingCostAwareSkill",
    displayName: "Cost-Aware Speculative Request Hedging & Quota Conservation",
    categoryId: 'control_flow',
    description: "Issues hedged requests conditionally only for high-value priority customers or latency-critical interactive user sessions.",
    tags: ["control-flow","request-hedging","cost-aware","quota","optimization"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","request-hedging","cost-aware","quota","optimization"],
    }),
  },

  "control-flow-linearizable-read-lease-raft": {
    id: "control-flow-linearizable-read-lease-raft",
    name: "ControlFlowLinearizableReadLeaseRaftSkill",
    displayName: "Linearizable Read Leases & ReadIndex Optimization in Raft",
    categoryId: 'control_flow',
    description: "Serves linearizable, stale-free read queries directly from the Raft leader without logging full consensus log entries.",
    tags: ["control-flow","raft","linearizability","read-index","consensus"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","raft","linearizability","read-index","consensus"],
    }),
  },

  "control-flow-declarative-rule-engine-rete": {
    id: "control-flow-declarative-rule-engine-rete",
    name: "ControlFlowDeclarativeRuleEngineReteSkill",
    displayName: "Declarative Rule Engine & Rete Algorithm Pattern Matching",
    categoryId: 'control_flow',
    description: "Evaluates thousands of conditional business rules against incoming event facts in sub-millisecond time via Rete network compilation.",
    tags: ["control-flow","rule-engine","rete","business-logic","declarative"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","rule-engine","rete","business-logic","declarative"],
    }),
  },

  "control-flow-two-way-data-binding-dirty-checking": {
    id: "control-flow-two-way-data-binding-dirty-checking",
    name: "ControlFlowTwoWayDataBindingDirtyCheckingSkill",
    displayName: "Fine-Grained Reactive Signal Graphs & Dependency Tracking",
    categoryId: 'control_flow',
    description: "Propagates state mutations automatically across fine-grained reactive dependency graphs (SolidJS / Preact Signals) with zero VDOM diffing.",
    tags: ["control-flow","signals","reactivity","fine-grained","ui-runtime"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","signals","reactivity","fine-grained","ui-runtime"],
    }),
  },

  "control-flow-event-throttling-leading-edge": {
    id: "control-flow-event-throttling-leading-edge",
    name: "ControlFlowEventThrottlingLeadingEdgeSkill",
    displayName: "Leading-Edge & Trailing-Edge Configurable Event Throttling",
    categoryId: 'control_flow',
    description: "Configures event rate pacing with options for immediate leading execution, delayed trailing execution, or synchronized dual invocation.",
    tags: ["control-flow","throttle","leading-edge","trailing-edge","ui-events"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","throttle","leading-edge","trailing-edge","ui-events"],
    }),
  },

  "control-flow-task-orchestrator-dependency-injection": {
    id: "control-flow-task-orchestrator-dependency-injection",
    name: "ControlFlowTaskOrchestratorDependencyInjectionSkill",
    displayName: "Task Workflow Composition Root & Dependency Injection",
    categoryId: 'control_flow',
    description: "Decouples execution control flow from concrete storage, network, and cryptography drivers using IoC container inversion.",
    tags: ["control-flow","dependency-injection","ioc","architecture","clean-code"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","dependency-injection","ioc","architecture","clean-code"],
    }),
  },

  "control-flow-graceful-fallback-stale-while-revalidate": {
    id: "control-flow-graceful-fallback-stale-while-revalidate",
    name: "ControlFlowGracefulFallbackStaleWhileRevalidateSkill",
    displayName: "Stale-While-Revalidate (SWR) Asynchronous Cache Regeneration",
    categoryId: 'control_flow',
    description: "Returns instantly from cache while revalidating fresh data in the background, serving stale data gracefully if upstream fails.",
    tags: ["control-flow","swr","caching","stale-while-revalidate","performance"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","swr","caching","stale-while-revalidate","performance"],
    }),
  },

  "control-flow-async-resource-disposal-explicit": {
    id: "control-flow-async-resource-disposal-explicit",
    name: "ControlFlowAsyncResourceDisposalExplicitSkill",
    displayName: "Deterministic Async Resource Disposal (TypeScript `using` & `Symbol.asyncDispose`)",
    categoryId: 'control_flow',
    description: "Guarantees deterministic cleanup of file handles, database connections, and locks using ECMAScript Explicit Resource Management.",
    tags: ["control-flow","async-dispose","resource-cleanup","typescript","raii"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","async-dispose","resource-cleanup","typescript","raii"],
    }),
  },

  "control-flow-adaptive-concurrency-aimd-tcp": {
    id: "control-flow-adaptive-concurrency-aimd-tcp",
    name: "ControlFlowAdaptiveConcurrencyAimdTcpSkill",
    displayName: "Additive Increase / Multiplicative Decrease (AIMD) Dynamic Concurrency Limits",
    categoryId: 'control_flow',
    description: "Adjusts outbound concurrency limits dynamically (Vegas / AIMD) based on observed round-trip response time degradation.",
    tags: ["control-flow","aimd","concurrency-limits","congestion-control","resilience"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","aimd","concurrency-limits","congestion-control","resilience"],
    }),
  },

  "control-flow-safe-state-reset-circuit-breaker": {
    id: "control-flow-safe-state-reset-circuit-breaker",
    name: "ControlFlowSafeStateResetCircuitBreakerSkill",
    displayName: "Automated Ephemeral State Purge & Self-Healing Circuit Recovery",
    categoryId: 'control_flow',
    description: "Executes automated cache invalidation, memory compaction, and connection recycling when subsystems experience persistent memory leaks.",
    tags: ["control-flow","self-healing","state-purge","recovery","resilience"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","self-healing","state-purge","recovery","resilience"],
    }),
  },

  "control-flow-multi-tenant-fair-share-scheduling": {
    id: "control-flow-multi-tenant-fair-share-scheduling",
    name: "ControlFlowMultiTenantFairShareSchedulingSkill",
    displayName: "Deficit Weighted Round-Robin (DWRR) Multi-Tenant Fair Scheduling",
    categoryId: 'control_flow',
    description: "Allocates worker compute fairly across multiple competing tenants, preventing noisy-neighbor starvation.",
    tags: ["control-flow","multi-tenant","fair-share","dwrr","scheduling"],
    transform: createStandardSkillTransform({
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
      semanticType: "protocol",
      tags: ["control-flow","multi-tenant","fair-share","dwrr","scheduling"],
    }),
  },
  "control-flow-dynamic-rate-limiting-token-bucket-refill": {
    id: "control-flow-dynamic-rate-limiting-token-bucket-refill",
    name: "DynamicRateLimitingTokenBucketRefillSkill",
    displayName: "Dynamic Rate Limiting Token Bucket Refill",
    categoryId: "control_flow",
    description: "Replenishes request quotas dynamically based on token bucket capacity.",
    tags: ["control_flow","control-flow","flow","dynamic"],
    transform: createStandardSkillTransform({
      sectionName: "Dynamic Rate Limiting Token Bucket Refill Standards",
      ruSectionName: "Стандарты и регламенты: Dynamic Rate Limiting Token Bucket Refill",
      instructions: [
        "Apply core domain tenets for Dynamic Rate Limiting Token Bucket Refill.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Dynamic Rate Limiting Token Bucket Refill.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","dynamic"],
    }),
  },

  "control-flow-cascading-fallback-chain-execution": {
    id: "control-flow-cascading-fallback-chain-execution",
    name: "CascadingFallbackChainExecutionSkill",
    displayName: "Cascading Fallback Chain Execution",
    categoryId: "control_flow",
    description: "Executes multi-tiered fallback handlers sequentially until one succeeds.",
    tags: ["control_flow","control-flow","flow","cascading"],
    transform: createStandardSkillTransform({
      sectionName: "Cascading Fallback Chain Execution Standards",
      ruSectionName: "Стандарты и регламенты: Cascading Fallback Chain Execution",
      instructions: [
        "Apply core domain tenets for Cascading Fallback Chain Execution.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cascading Fallback Chain Execution.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","cascading"],
    }),
  },

  "control-flow-stateful-session-re-hydration-resume": {
    id: "control-flow-stateful-session-re-hydration-resume",
    name: "StatefulSessionRehydrationResumeSkill",
    displayName: "Stateful Session Re-hydration & Resume",
    categoryId: "control_flow",
    description: "Restores execution state seamlessly from persistent database checkpoints.",
    tags: ["control_flow","control-flow","flow","stateful"],
    transform: createStandardSkillTransform({
      sectionName: "Stateful Session Re-hydration & Resume Standards",
      ruSectionName: "Стандарты и регламенты: Stateful Session Re-hydration & Resume",
      instructions: [
        "Apply core domain tenets for Stateful Session Re-hydration & Resume.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Stateful Session Re-hydration & Resume.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","stateful"],
    }),
  },

  "control-flow-distributed-lock-acquisition-with-redlock": {
    id: "control-flow-distributed-lock-acquisition-with-redlock",
    name: "DistributedLockAcquisitionwithRedlockSkill",
    displayName: "Distributed Lock Acquisition with Redlock",
    categoryId: "control_flow",
    description: "Secures multi-node distributed locks with automatic TTL lease renewal.",
    tags: ["control_flow","control-flow","flow","distributed"],
    transform: createStandardSkillTransform({
      sectionName: "Distributed Lock Acquisition with Redlock Standards",
      ruSectionName: "Стандарты и регламенты: Distributed Lock Acquisition with Redlock",
      instructions: [
        "Apply core domain tenets for Distributed Lock Acquisition with Redlock.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Distributed Lock Acquisition with Redlock.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","distributed"],
    }),
  },

  "control-flow-dead-letter-queue-isolation-triage": {
    id: "control-flow-dead-letter-queue-isolation-triage",
    name: "DeadLetterQueueIsolationTriageSkill",
    displayName: "Dead-Letter Queue Isolation & Triage",
    categoryId: "control_flow",
    description: "Isolates unprocessable poison-pill messages for manual inspection.",
    tags: ["control_flow","control-flow","flow","dead"],
    transform: createStandardSkillTransform({
      sectionName: "Dead-Letter Queue Isolation & Triage Standards",
      ruSectionName: "Стандарты и регламенты: Dead-Letter Queue Isolation & Triage",
      instructions: [
        "Apply core domain tenets for Dead-Letter Queue Isolation & Triage.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Dead-Letter Queue Isolation & Triage.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","dead"],
    }),
  },

  "control-flow-scatter-gather-parallel-request-aggregation": {
    id: "control-flow-scatter-gather-parallel-request-aggregation",
    name: "ScatterGatherParallelRequestAggregationSkill",
    displayName: "Scatter-Gather Parallel Request Aggregation",
    categoryId: "control_flow",
    description: "Broadcasts queries to multiple backends and merges responses.",
    tags: ["control_flow","control-flow","flow","scatter"],
    transform: createStandardSkillTransform({
      sectionName: "Scatter-Gather Parallel Request Aggregation Standards",
      ruSectionName: "Стандарты и регламенты: Scatter-Gather Parallel Request Aggregation",
      instructions: [
        "Apply core domain tenets for Scatter-Gather Parallel Request Aggregation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Scatter-Gather Parallel Request Aggregation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","scatter"],
    }),
  },

  "control-flow-event-choreography-vs-centralized-orchestration": {
    id: "control-flow-event-choreography-vs-centralized-orchestration",
    name: "EventChoreographyvsCentralizedOrchestrationSkill",
    displayName: "Event Choreography vs Centralized Orchestration",
    categoryId: "control_flow",
    description: "Manages distributed workflows using decoupled event messaging.",
    tags: ["control_flow","control-flow","flow","event"],
    transform: createStandardSkillTransform({
      sectionName: "Event Choreography vs Centralized Orchestration Standards",
      ruSectionName: "Стандарты и регламенты: Event Choreography vs Centralized Orchestration",
      instructions: [
        "Apply core domain tenets for Event Choreography vs Centralized Orchestration.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Event Choreography vs Centralized Orchestration.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","event"],
    }),
  },

  "control-flow-hierarchical-abortsignal-cascade-cancellation": {
    id: "control-flow-hierarchical-abortsignal-cascade-cancellation",
    name: "HierarchicalAbortSignalCascadeCancellationSkill",
    displayName: "Hierarchical AbortSignal Cascade Cancellation",
    categoryId: "control_flow",
    description: "Propagates cancellation signals down nested async task trees.",
    tags: ["control_flow","control-flow","flow","hierarchical"],
    transform: createStandardSkillTransform({
      sectionName: "Hierarchical AbortSignal Cascade Cancellation Standards",
      ruSectionName: "Стандарты и регламенты: Hierarchical AbortSignal Cascade Cancellation",
      instructions: [
        "Apply core domain tenets for Hierarchical AbortSignal Cascade Cancellation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hierarchical AbortSignal Cascade Cancellation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","hierarchical"],
    }),
  },

  "control-flow-circuit-breaker-exponential-half-open-probe": {
    id: "control-flow-circuit-breaker-exponential-half-open-probe",
    name: "CircuitBreakerExponentialHalfOpenProbeSkill",
    displayName: "Circuit Breaker Exponential Half-Open Probe",
    categoryId: "control_flow",
    description: "Probes recovering services with exponential backoff before full reset.",
    tags: ["control_flow","control-flow","flow","circuit"],
    transform: createStandardSkillTransform({
      sectionName: "Circuit Breaker Exponential Half-Open Probe Standards",
      ruSectionName: "Стандарты и регламенты: Circuit Breaker Exponential Half-Open Probe",
      instructions: [
        "Apply core domain tenets for Circuit Breaker Exponential Half-Open Probe.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Circuit Breaker Exponential Half-Open Probe.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","circuit"],
    }),
  },

  "control-flow-idempotent-replay-window-nonce-verification": {
    id: "control-flow-idempotent-replay-window-nonce-verification",
    name: "IdempotentReplayWindowNonceVerificationSkill",
    displayName: "Idempotent Replay Window Nonce Verification",
    categoryId: "control_flow",
    description: "Prevents replay attacks using cryptographically signed timestamped nonces.",
    tags: ["control_flow","control-flow","flow","idempotent"],
    transform: createStandardSkillTransform({
      sectionName: "Idempotent Replay Window Nonce Verification Standards",
      ruSectionName: "Стандарты и регламенты: Idempotent Replay Window Nonce Verification",
      instructions: [
        "Apply core domain tenets for Idempotent Replay Window Nonce Verification.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Idempotent Replay Window Nonce Verification.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","idempotent"],
    }),
  },

  "control-flow-singleflight-in-flight-request-deduplication": {
    id: "control-flow-singleflight-in-flight-request-deduplication",
    name: "SingleflightInFlightRequestDeduplicationSkill",
    displayName: "Singleflight In-Flight Request Deduplication",
    categoryId: "control_flow",
    description: "Shares single execution promise across simultaneous identical requests.",
    tags: ["control_flow","control-flow","flow","singleflight"],
    transform: createStandardSkillTransform({
      sectionName: "Singleflight In-Flight Request Deduplication Standards",
      ruSectionName: "Стандарты и регламенты: Singleflight In-Flight Request Deduplication",
      instructions: [
        "Apply core domain tenets for Singleflight In-Flight Request Deduplication.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Singleflight In-Flight Request Deduplication.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","singleflight"],
    }),
  },

  "control-flow-transactional-outbox-pattern-for-cdc": {
    id: "control-flow-transactional-outbox-pattern-for-cdc",
    name: "TransactionalOutboxPatternforCDCSkill",
    displayName: "Transactional Outbox Pattern for CDC",
    categoryId: "control_flow",
    description: "Ensures atomic database mutations and event publishing consistency.",
    tags: ["control_flow","control-flow","flow","transactional"],
    transform: createStandardSkillTransform({
      sectionName: "Transactional Outbox Pattern for CDC Standards",
      ruSectionName: "Стандарты и регламенты: Transactional Outbox Pattern for CDC",
      instructions: [
        "Apply core domain tenets for Transactional Outbox Pattern for CDC.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Transactional Outbox Pattern for CDC.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","transactional"],
    }),
  },

  "control-flow-hedged-requests-for-tail-latency-elimination": {
    id: "control-flow-hedged-requests-for-tail-latency-elimination",
    name: "HedgedRequestsforTailLatencyEliminationSkill",
    displayName: "Hedged Requests for Tail Latency Elimination",
    categoryId: "control_flow",
    description: "Dispatches backup requests to secondary nodes upon p95 delay.",
    tags: ["control_flow","control-flow","flow","hedged"],
    transform: createStandardSkillTransform({
      sectionName: "Hedged Requests for Tail Latency Elimination Standards",
      ruSectionName: "Стандарты и регламенты: Hedged Requests for Tail Latency Elimination",
      instructions: [
        "Apply core domain tenets for Hedged Requests for Tail Latency Elimination.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hedged Requests for Tail Latency Elimination.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","hedged"],
    }),
  },

  "control-flow-fencing-token-distributed-mutex-lock": {
    id: "control-flow-fencing-token-distributed-mutex-lock",
    name: "FencingTokenDistributedMutexLockSkill",
    displayName: "Fencing Token Distributed Mutex Lock",
    categoryId: "control_flow",
    description: "Validates monotonic fencing tokens to prevent stale lock writes.",
    tags: ["control_flow","control-flow","flow","fencing"],
    transform: createStandardSkillTransform({
      sectionName: "Fencing Token Distributed Mutex Lock Standards",
      ruSectionName: "Стандарты и регламенты: Fencing Token Distributed Mutex Lock",
      instructions: [
        "Apply core domain tenets for Fencing Token Distributed Mutex Lock.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Fencing Token Distributed Mutex Lock.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","fencing"],
    }),
  },

  "control-flow-statechart-history-states-preservation": {
    id: "control-flow-statechart-history-states-preservation",
    name: "StatechartHistoryStatesPreservationSkill",
    displayName: "Statechart History States Preservation",
    categoryId: "control_flow",
    description: "Remembers sub-state configurations during temporary modal interrupts.",
    tags: ["control_flow","control-flow","flow","statechart"],
    transform: createStandardSkillTransform({
      sectionName: "Statechart History States Preservation Standards",
      ruSectionName: "Стандарты и регламенты: Statechart History States Preservation",
      instructions: [
        "Apply core domain tenets for Statechart History States Preservation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Statechart History States Preservation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","statechart"],
    }),
  },

  "control-flow-server-sent-events-graceful-long-polling-downgrade": {
    id: "control-flow-server-sent-events-graceful-long-polling-downgrade",
    name: "ServerSentEventsGracefulLongPollingDowngradeSkill",
    displayName: "Server-Sent Events Graceful Long-Polling Downgrade",
    categoryId: "control_flow",
    description: "Falls back to long-polling when SSE streaming is blocked by proxy.",
    tags: ["control_flow","control-flow","flow","server"],
    transform: createStandardSkillTransform({
      sectionName: "Server-Sent Events Graceful Long-Polling Downgrade Standards",
      ruSectionName: "Стандарты и регламенты: Server-Sent Events Graceful Long-Polling Downgrade",
      instructions: [
        "Apply core domain tenets for Server-Sent Events Graceful Long-Polling Downgrade.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Server-Sent Events Graceful Long-Polling Downgrade.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","server"],
    }),
  },

  "control-flow-bloom-filter-webhook-idempotency-check": {
    id: "control-flow-bloom-filter-webhook-idempotency-check",
    name: "BloomFilterWebhookIdempotencyCheckSkill",
    displayName: "Bloom Filter Webhook Idempotency Check",
    categoryId: "control_flow",
    description: "Pre-filters duplicate webhooks instantly with zero DB lookup.",
    tags: ["control_flow","control-flow","flow","bloom"],
    transform: createStandardSkillTransform({
      sectionName: "Bloom Filter Webhook Idempotency Check Standards",
      ruSectionName: "Стандарты и регламенты: Bloom Filter Webhook Idempotency Check",
      instructions: [
        "Apply core domain tenets for Bloom Filter Webhook Idempotency Check.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Bloom Filter Webhook Idempotency Check.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","bloom"],
    }),
  },

  "control-flow-codel-queue-sojourn-time-load-shedding": {
    id: "control-flow-codel-queue-sojourn-time-load-shedding",
    name: "CoDelQueueSojournTimeLoadSheddingSkill",
    displayName: "CoDel Queue Sojourn Time Load Shedding",
    categoryId: "control_flow",
    description: "Sheds excess load dynamically when queue waiting times exceed SLOs.",
    tags: ["control_flow","control-flow","flow","codel"],
    transform: createStandardSkillTransform({
      sectionName: "CoDel Queue Sojourn Time Load Shedding Standards",
      ruSectionName: "Стандарты и регламенты: CoDel Queue Sojourn Time Load Shedding",
      instructions: [
        "Apply core domain tenets for CoDel Queue Sojourn Time Load Shedding.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для CoDel Queue Sojourn Time Load Shedding.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","codel"],
    }),
  },

  "control-flow-work-stealing-task-queue-thread-pool": {
    id: "control-flow-work-stealing-task-queue-thread-pool",
    name: "WorkStealingTaskQueueThreadPoolSkill",
    displayName: "Work-Stealing Task Queue Thread Pool",
    categoryId: "control_flow",
    description: "Balances multi-threaded CPU load using lock-free task stealing.",
    tags: ["control_flow","control-flow","flow","work"],
    transform: createStandardSkillTransform({
      sectionName: "Work-Stealing Task Queue Thread Pool Standards",
      ruSectionName: "Стандарты и регламенты: Work-Stealing Task Queue Thread Pool",
      instructions: [
        "Apply core domain tenets for Work-Stealing Task Queue Thread Pool.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Work-Stealing Task Queue Thread Pool.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","work"],
    }),
  },

  "control-flow-llm-semantic-intent-classifier-dispatch": {
    id: "control-flow-llm-semantic-intent-classifier-dispatch",
    name: "LLMSemanticIntentClassifierDispatchSkill",
    displayName: "LLM Semantic Intent Classifier Dispatch",
    categoryId: "control_flow",
    description: "Routes user prompts to specialized tools via intent classification.",
    tags: ["control_flow","control-flow","flow","llm"],
    transform: createStandardSkillTransform({
      sectionName: "LLM Semantic Intent Classifier Dispatch Standards",
      ruSectionName: "Стандарты и регламенты: LLM Semantic Intent Classifier Dispatch",
      instructions: [
        "Apply core domain tenets for LLM Semantic Intent Classifier Dispatch.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для LLM Semantic Intent Classifier Dispatch.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","llm"],
    }),
  },

  "control-flow-priority-inversion-prevention-protocol": {
    id: "control-flow-priority-inversion-prevention-protocol",
    name: "PriorityInversionPreventionProtocolSkill",
    displayName: "Priority Inversion Prevention Protocol",
    categoryId: "control_flow",
    description: "Elevates priority of low-priority tasks holding critical locks.",
    tags: ["control_flow","control-flow","flow","priority"],
    transform: createStandardSkillTransform({
      sectionName: "Priority Inversion Prevention Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Priority Inversion Prevention Protocol",
      instructions: [
        "Apply core domain tenets for Priority Inversion Prevention Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Priority Inversion Prevention Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","priority"],
    }),
  },

  "control-flow-hot-path-branch-prediction-hinting": {
    id: "control-flow-hot-path-branch-prediction-hinting",
    name: "HotPathBranchPredictionHintingSkill",
    displayName: "Hot-Path Branch Prediction Hinting",
    categoryId: "control_flow",
    description: "Structures conditionals to optimize CPU instruction cache locality.",
    tags: ["control_flow","control-flow","flow","hot"],
    transform: createStandardSkillTransform({
      sectionName: "Hot-Path Branch Prediction Hinting Standards",
      ruSectionName: "Стандарты и регламенты: Hot-Path Branch Prediction Hinting",
      instructions: [
        "Apply core domain tenets for Hot-Path Branch Prediction Hinting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hot-Path Branch Prediction Hinting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","hot"],
    }),
  },

  "control-flow-hierarchical-timeout-deadline-propagation": {
    id: "control-flow-hierarchical-timeout-deadline-propagation",
    name: "HierarchicalTimeoutDeadlinePropagationSkill",
    displayName: "Hierarchical Timeout Deadline Propagation",
    categoryId: "control_flow",
    description: "Passes shrinking execution deadlines across microservice hops.",
    tags: ["control_flow","control-flow","flow","hierarchical"],
    transform: createStandardSkillTransform({
      sectionName: "Hierarchical Timeout Deadline Propagation Standards",
      ruSectionName: "Стандарты и регламенты: Hierarchical Timeout Deadline Propagation",
      instructions: [
        "Apply core domain tenets for Hierarchical Timeout Deadline Propagation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hierarchical Timeout Deadline Propagation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","hierarchical"],
    }),
  },

  "control-flow-event-sourcing-periodic-snapshotting": {
    id: "control-flow-event-sourcing-periodic-snapshotting",
    name: "EventSourcingPeriodicSnapshottingSkill",
    displayName: "Event Sourcing Periodic Snapshotting",
    categoryId: "control_flow",
    description: "Accelerates aggregate hydration using periodic checkpoint snapshots.",
    tags: ["control_flow","control-flow","flow","event"],
    transform: createStandardSkillTransform({
      sectionName: "Event Sourcing Periodic Snapshotting Standards",
      ruSectionName: "Стандарты и регламенты: Event Sourcing Periodic Snapshotting",
      instructions: [
        "Apply core domain tenets for Event Sourcing Periodic Snapshotting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Event Sourcing Periodic Snapshotting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","event"],
    }),
  },

  "control-flow-go-channel-style-csp-pipeline-buffering": {
    id: "control-flow-go-channel-style-csp-pipeline-buffering",
    name: "GoChannelStyleCSPPipelineBufferingSkill",
    displayName: "Go-Channel Style CSP Pipeline Buffering",
    categoryId: "control_flow",
    description: "Connects concurrent pipeline stages with bounded FIFO channels.",
    tags: ["control_flow","control-flow","flow","go"],
    transform: createStandardSkillTransform({
      sectionName: "Go-Channel Style CSP Pipeline Buffering Standards",
      ruSectionName: "Стандарты и регламенты: Go-Channel Style CSP Pipeline Buffering",
      instructions: [
        "Apply core domain tenets for Go-Channel Style CSP Pipeline Buffering.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Go-Channel Style CSP Pipeline Buffering.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","go"],
    }),
  },

  "control-flow-multi-region-active-passive-dns-failover": {
    id: "control-flow-multi-region-active-passive-dns-failover",
    name: "MultiRegionActivePassiveDNSFailoverSkill",
    displayName: "Multi-Region Active-Passive DNS Failover",
    categoryId: "control_flow",
    description: "Reroutes global traffic on edge health check probe failures.",
    tags: ["control_flow","control-flow","flow","multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Region Active-Passive DNS Failover Standards",
      ruSectionName: "Стандарты и регламенты: Multi-Region Active-Passive DNS Failover",
      instructions: [
        "Apply core domain tenets for Multi-Region Active-Passive DNS Failover.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Multi-Region Active-Passive DNS Failover.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","multi"],
    }),
  },

  "control-flow-client-side-retry-budget-token-bucket": {
    id: "control-flow-client-side-retry-budget-token-bucket",
    name: "ClientSideRetryBudgetTokenBucketSkill",
    displayName: "Client-Side Retry Budget Token Bucket",
    categoryId: "control_flow",
    description: "Limits retry attempts to a fixed percentage of total outbound traffic.",
    tags: ["control_flow","control-flow","flow","client"],
    transform: createStandardSkillTransform({
      sectionName: "Client-Side Retry Budget Token Bucket Standards",
      ruSectionName: "Стандарты и регламенты: Client-Side Retry Budget Token Bucket",
      instructions: [
        "Apply core domain tenets for Client-Side Retry Budget Token Bucket.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Client-Side Retry Budget Token Bucket.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","client"],
    }),
  },

  "control-flow-cost-aware-speculative-request-hedging": {
    id: "control-flow-cost-aware-speculative-request-hedging",
    name: "CostAwareSpeculativeRequestHedgingSkill",
    displayName: "Cost-Aware Speculative Request Hedging",
    categoryId: "control_flow",
    description: "Executes hedged requests selectively based on user tier and cost.",
    tags: ["control_flow","control-flow","flow","cost"],
    transform: createStandardSkillTransform({
      sectionName: "Cost-Aware Speculative Request Hedging Standards",
      ruSectionName: "Стандарты и регламенты: Cost-Aware Speculative Request Hedging",
      instructions: [
        "Apply core domain tenets for Cost-Aware Speculative Request Hedging.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cost-Aware Speculative Request Hedging.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","cost"],
    }),
  },

  "control-flow-linearizable-read-index-optimization-in-raft": {
    id: "control-flow-linearizable-read-index-optimization-in-raft",
    name: "LinearizableReadIndexOptimizationinRaftSkill",
    displayName: "Linearizable Read Index Optimization in Raft",
    categoryId: "control_flow",
    description: "Serves linearizable reads from leader without full log consensus.",
    tags: ["control_flow","control-flow","flow","linearizable"],
    transform: createStandardSkillTransform({
      sectionName: "Linearizable Read Index Optimization in Raft Standards",
      ruSectionName: "Стандарты и регламенты: Linearizable Read Index Optimization in Raft",
      instructions: [
        "Apply core domain tenets for Linearizable Read Index Optimization in Raft.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Linearizable Read Index Optimization in Raft.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","linearizable"],
    }),
  },

  "control-flow-declarative-rule-engine-rete-network-matching": {
    id: "control-flow-declarative-rule-engine-rete-network-matching",
    name: "DeclarativeRuleEngineReteNetworkMatchingSkill",
    displayName: "Declarative Rule Engine Rete Network Matching",
    categoryId: "control_flow",
    description: "Evaluates thousands of conditional rules in sub-millisecond time.",
    tags: ["control_flow","control-flow","flow","declarative"],
    transform: createStandardSkillTransform({
      sectionName: "Declarative Rule Engine Rete Network Matching Standards",
      ruSectionName: "Стандарты и регламенты: Declarative Rule Engine Rete Network Matching",
      instructions: [
        "Apply core domain tenets for Declarative Rule Engine Rete Network Matching.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Declarative Rule Engine Rete Network Matching.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","declarative"],
    }),
  },

  "control-flow-fine-grained-reactive-signal-graph": {
    id: "control-flow-fine-grained-reactive-signal-graph",
    name: "FineGrainedReactiveSignalGraphSkill",
    displayName: "Fine-Grained Reactive Signal Graph",
    categoryId: "control_flow",
    description: "Propagates state updates without virtual DOM diffing overhead.",
    tags: ["control_flow","control-flow","flow","fine"],
    transform: createStandardSkillTransform({
      sectionName: "Fine-Grained Reactive Signal Graph Standards",
      ruSectionName: "Стандарты и регламенты: Fine-Grained Reactive Signal Graph",
      instructions: [
        "Apply core domain tenets for Fine-Grained Reactive Signal Graph.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Fine-Grained Reactive Signal Graph.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","fine"],
    }),
  },

  "control-flow-leading-and-trailing-edge-event-throttling": {
    id: "control-flow-leading-and-trailing-edge-event-throttling",
    name: "LeadingandTrailingEdgeEventThrottlingSkill",
    displayName: "Leading and Trailing Edge Event Throttling",
    categoryId: "control_flow",
    description: "Configures event execution pacing with immediate or delayed invocation.",
    tags: ["control_flow","control-flow","flow","leading"],
    transform: createStandardSkillTransform({
      sectionName: "Leading and Trailing Edge Event Throttling Standards",
      ruSectionName: "Стандарты и регламенты: Leading and Trailing Edge Event Throttling",
      instructions: [
        "Apply core domain tenets for Leading and Trailing Edge Event Throttling.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Leading and Trailing Edge Event Throttling.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","leading"],
    }),
  },

  "control-flow-stale-while-revalidate-async-cache-refresh": {
    id: "control-flow-stale-while-revalidate-async-cache-refresh",
    name: "StaleWhileRevalidateAsyncCacheRefreshSkill",
    displayName: "Stale-While-Revalidate Async Cache Refresh",
    categoryId: "control_flow",
    description: "Returns cached data instantly while refreshing fresh data in background.",
    tags: ["control_flow","control-flow","flow","stale"],
    transform: createStandardSkillTransform({
      sectionName: "Stale-While-Revalidate Async Cache Refresh Standards",
      ruSectionName: "Стандарты и регламенты: Stale-While-Revalidate Async Cache Refresh",
      instructions: [
        "Apply core domain tenets for Stale-While-Revalidate Async Cache Refresh.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Stale-While-Revalidate Async Cache Refresh.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","stale"],
    }),
  },

  "control-flow-typescript-explicit-async-resource-disposal": {
    id: "control-flow-typescript-explicit-async-resource-disposal",
    name: "TypeScriptExplicitAsyncResourceDisposalSkill",
    displayName: "TypeScript Explicit Async Resource Disposal",
    categoryId: "control_flow",
    description: "Guarantees resource cleanup using `Symbol.asyncDispose` syntax.",
    tags: ["control_flow","control-flow","flow","typescript"],
    transform: createStandardSkillTransform({
      sectionName: "TypeScript Explicit Async Resource Disposal Standards",
      ruSectionName: "Стандарты и регламенты: TypeScript Explicit Async Resource Disposal",
      instructions: [
        "Apply core domain tenets for TypeScript Explicit Async Resource Disposal.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для TypeScript Explicit Async Resource Disposal.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","typescript"],
    }),
  },

  "control-flow-aimd-adaptive-concurrency-limits": {
    id: "control-flow-aimd-adaptive-concurrency-limits",
    name: "AIMDAdaptiveConcurrencyLimitsSkill",
    displayName: "AIMD Adaptive Concurrency Limits",
    categoryId: "control_flow",
    description: "Adjusts outbound concurrency limits dynamically based on RTT latency.",
    tags: ["control_flow","control-flow","flow","aimd"],
    transform: createStandardSkillTransform({
      sectionName: "AIMD Adaptive Concurrency Limits Standards",
      ruSectionName: "Стандарты и регламенты: AIMD Adaptive Concurrency Limits",
      instructions: [
        "Apply core domain tenets for AIMD Adaptive Concurrency Limits.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для AIMD Adaptive Concurrency Limits.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","aimd"],
    }),
  },

  "control-flow-self-healing-state-purge-memory-recycling": {
    id: "control-flow-self-healing-state-purge-memory-recycling",
    name: "SelfHealingStatePurgeMemoryRecyclingSkill",
    displayName: "Self-Healing State Purge & Memory Recycling",
    categoryId: "control_flow",
    description: "Purges ephemeral state and recycles pools upon memory pressure.",
    tags: ["control_flow","control-flow","flow","self"],
    transform: createStandardSkillTransform({
      sectionName: "Self-Healing State Purge & Memory Recycling Standards",
      ruSectionName: "Стандарты и регламенты: Self-Healing State Purge & Memory Recycling",
      instructions: [
        "Apply core domain tenets for Self-Healing State Purge & Memory Recycling.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Self-Healing State Purge & Memory Recycling.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","self"],
    }),
  },

  "control-flow-multi-tenant-deficit-weighted-round-robin": {
    id: "control-flow-multi-tenant-deficit-weighted-round-robin",
    name: "MultiTenantDeficitWeightedRoundRobinSkill",
    displayName: "Multi-Tenant Deficit Weighted Round-Robin",
    categoryId: "control_flow",
    description: "Allocates worker execution fairly across competing tenant queues.",
    tags: ["control_flow","control-flow","flow","multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Tenant Deficit Weighted Round-Robin Standards",
      ruSectionName: "Стандарты и регламенты: Multi-Tenant Deficit Weighted Round-Robin",
      instructions: [
        "Apply core domain tenets for Multi-Tenant Deficit Weighted Round-Robin.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Multi-Tenant Deficit Weighted Round-Robin.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","multi"],
    }),
  },

  "control-flow-graceful-process-termination-sigterm-drain": {
    id: "control-flow-graceful-process-termination-sigterm-drain",
    name: "GracefulProcessTerminationSIGTERMDrainSkill",
    displayName: "Graceful Process Termination SIGTERM Drain",
    categoryId: "control_flow",
    description: "Drains in-flight requests cleanly on process termination signals.",
    tags: ["control_flow","control-flow","flow","graceful"],
    transform: createStandardSkillTransform({
      sectionName: "Graceful Process Termination SIGTERM Drain Standards",
      ruSectionName: "Стандарты и регламенты: Graceful Process Termination SIGTERM Drain",
      instructions: [
        "Apply core domain tenets for Graceful Process Termination SIGTERM Drain.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Graceful Process Termination SIGTERM Drain.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","graceful"],
    }),
  },

  "control-flow-optimistic-concurrency-compare-and-swap": {
    id: "control-flow-optimistic-concurrency-compare-and-swap",
    name: "OptimisticConcurrencyCompareAndSwapSkill",
    displayName: "Optimistic Concurrency Compare-And-Swap",
    categoryId: "control_flow",
    description: "Guards against lost updates using version column updates.",
    tags: ["control_flow","control-flow","flow","optimistic"],
    transform: createStandardSkillTransform({
      sectionName: "Optimistic Concurrency Compare-And-Swap Standards",
      ruSectionName: "Стандарты и регламенты: Optimistic Concurrency Compare-And-Swap",
      instructions: [
        "Apply core domain tenets for Optimistic Concurrency Compare-And-Swap.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Optimistic Concurrency Compare-And-Swap.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","optimistic"],
    }),
  },

  "control-flow-2pc-two-phase-commit-atomic-coordination": {
    id: "control-flow-2pc-two-phase-commit-atomic-coordination",
    name: "2PCTwoPhaseCommitAtomicCoordinationSkill",
    displayName: "2PC Two-Phase Commit Atomic Coordination",
    categoryId: "control_flow",
    description: "Guarantees atomic multi-database transactions via Prepare/Commit.",
    tags: ["control_flow","control-flow","flow","2pc"],
    transform: createStandardSkillTransform({
      sectionName: "2PC Two-Phase Commit Atomic Coordination Standards",
      ruSectionName: "Стандарты и регламенты: 2PC Two-Phase Commit Atomic Coordination",
      instructions: [
        "Apply core domain tenets for 2PC Two-Phase Commit Atomic Coordination.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для 2PC Two-Phase Commit Atomic Coordination.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","2pc"],
    }),
  },

  "control-flow-reactive-backpressure-flow-control": {
    id: "control-flow-reactive-backpressure-flow-control",
    name: "ReactiveBackpressureFlowControlSkill",
    displayName: "Reactive Backpressure Flow Control",
    categoryId: "control_flow",
    description: "Prevents fast producers from overwhelming slow consumers.",
    tags: ["control_flow","control-flow","flow","reactive"],
    transform: createStandardSkillTransform({
      sectionName: "Reactive Backpressure Flow Control Standards",
      ruSectionName: "Стандарты и регламенты: Reactive Backpressure Flow Control",
      instructions: [
        "Apply core domain tenets for Reactive Backpressure Flow Control.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Reactive Backpressure Flow Control.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","reactive"],
    }),
  },

  "control-flow-debounce-search-input-key-pacing": {
    id: "control-flow-debounce-search-input-key-pacing",
    name: "DebounceSearchInputKeyPacingSkill",
    displayName: "Debounce Search Input Key Pacing",
    categoryId: "control_flow",
    description: "Delays search execution until user stops typing for N milliseconds.",
    tags: ["control_flow","control-flow","flow","debounce"],
    transform: createStandardSkillTransform({
      sectionName: "Debounce Search Input Key Pacing Standards",
      ruSectionName: "Стандарты и регламенты: Debounce Search Input Key Pacing",
      instructions: [
        "Apply core domain tenets for Debounce Search Input Key Pacing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Debounce Search Input Key Pacing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","debounce"],
    }),
  },

  "control-flow-middleware-pipeline-onion-execution": {
    id: "control-flow-middleware-pipeline-onion-execution",
    name: "MiddlewarePipelineOnionExecutionSkill",
    displayName: "Middleware Pipeline Onion Execution",
    categoryId: "control_flow",
    description: "Executes request pipelines through composable middleware layers.",
    tags: ["control_flow","control-flow","flow","middleware"],
    transform: createStandardSkillTransform({
      sectionName: "Middleware Pipeline Onion Execution Standards",
      ruSectionName: "Стандарты и регламенты: Middleware Pipeline Onion Execution",
      instructions: [
        "Apply core domain tenets for Middleware Pipeline Onion Execution.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Middleware Pipeline Onion Execution.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","middleware"],
    }),
  },

  "control-flow-swim-gossip-protocol-cluster-membership": {
    id: "control-flow-swim-gossip-protocol-cluster-membership",
    name: "SWIMGossipProtocolClusterMembershipSkill",
    displayName: "SWIM Gossip Protocol Cluster Membership",
    categoryId: "control_flow",
    description: "Detects cluster node failures using peer-to-peer gossip messages.",
    tags: ["control_flow","control-flow","flow","swim"],
    transform: createStandardSkillTransform({
      sectionName: "SWIM Gossip Protocol Cluster Membership Standards",
      ruSectionName: "Стандарты и регламенты: SWIM Gossip Protocol Cluster Membership",
      instructions: [
        "Apply core domain tenets for SWIM Gossip Protocol Cluster Membership.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SWIM Gossip Protocol Cluster Membership.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","swim"],
    }),
  },

  "control-flow-cqrs-asynchronous-event-projection-replay": {
    id: "control-flow-cqrs-asynchronous-event-projection-replay",
    name: "CQRSAsynchronousEventProjectionReplaySkill",
    displayName: "CQRS Asynchronous Event Projection Replay",
    categoryId: "control_flow",
    description: "Rebuilds read models by replaying past event streams.",
    tags: ["control_flow","control-flow","flow","cqrs"],
    transform: createStandardSkillTransform({
      sectionName: "CQRS Asynchronous Event Projection Replay Standards",
      ruSectionName: "Стандарты и регламенты: CQRS Asynchronous Event Projection Replay",
      instructions: [
        "Apply core domain tenets for CQRS Asynchronous Event Projection Replay.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для CQRS Asynchronous Event Projection Replay.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","cqrs"],
    }),
  },

  "control-flow-fork-join-parallel-recursive-execution": {
    id: "control-flow-fork-join-parallel-recursive-execution",
    name: "ForkJoinParallelRecursiveExecutionSkill",
    displayName: "Fork-Join Parallel Recursive Execution",
    categoryId: "control_flow",
    description: "Splits large tasks recursively and joins outputs asynchronously.",
    tags: ["control_flow","control-flow","flow","fork"],
    transform: createStandardSkillTransform({
      sectionName: "Fork-Join Parallel Recursive Execution Standards",
      ruSectionName: "Стандарты и регламенты: Fork-Join Parallel Recursive Execution",
      instructions: [
        "Apply core domain tenets for Fork-Join Parallel Recursive Execution.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Fork-Join Parallel Recursive Execution.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","fork"],
    }),
  },

  "control-flow-token-bucket-rate-limiter-with-burst-support": {
    id: "control-flow-token-bucket-rate-limiter-with-burst-support",
    name: "TokenBucketRateLimiterwithBurstSupportSkill",
    displayName: "Token Bucket Rate Limiter with Burst Support",
    categoryId: "control_flow",
    description: "Enforces smooth rate limits while allowing short traffic bursts.",
    tags: ["control_flow","control-flow","flow","token"],
    transform: createStandardSkillTransform({
      sectionName: "Token Bucket Rate Limiter with Burst Support Standards",
      ruSectionName: "Стандарты и регламенты: Token Bucket Rate Limiter with Burst Support",
      instructions: [
        "Apply core domain tenets for Token Bucket Rate Limiter with Burst Support.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Token Bucket Rate Limiter with Burst Support.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","token"],
    }),
  },

  "control-flow-sliding-window-log-redis-deduplication": {
    id: "control-flow-sliding-window-log-redis-deduplication",
    name: "SlidingWindowLogRedisDeduplicationSkill",
    displayName: "Sliding Window Log Redis Deduplication",
    categoryId: "control_flow",
    description: "Tracks request timestamps in sorted sets to prevent burst attacks.",
    tags: ["control_flow","control-flow","flow","sliding"],
    transform: createStandardSkillTransform({
      sectionName: "Sliding Window Log Redis Deduplication Standards",
      ruSectionName: "Стандарты и регламенты: Sliding Window Log Redis Deduplication",
      instructions: [
        "Apply core domain tenets for Sliding Window Log Redis Deduplication.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sliding Window Log Redis Deduplication.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","sliding"],
    }),
  },

  "control-flow-actor-model-mailbox-isolated-state": {
    id: "control-flow-actor-model-mailbox-isolated-state",
    name: "ActorModelMailboxIsolatedStateSkill",
    displayName: "Actor Model Mailbox Isolated State",
    categoryId: "control_flow",
    description: "Processes messages sequentially in isolated actor memory loops.",
    tags: ["control_flow","control-flow","flow","actor"],
    transform: createStandardSkillTransform({
      sectionName: "Actor Model Mailbox Isolated State Standards",
      ruSectionName: "Стандарты и регламенты: Actor Model Mailbox Isolated State",
      instructions: [
        "Apply core domain tenets for Actor Model Mailbox Isolated State.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Actor Model Mailbox Isolated State.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["control_flow","control-flow","flow","actor"],
    }),
  },
  "controlflow-final-distributed-saga-transaction-choreography-orchestration": {
    id: "controlflow-final-distributed-saga-transaction-choreography-orchestration",
    name: "DistributedSagaTransactionChoreographyOrchestrationSkill",
    displayName: "Distributed Saga Transaction Choreography Orchestration",
    categoryId: "controlFlow",
    description: "Manages multi-service distributed transactions with forward execution and compensations.",
    tags: ["controlFlow","controlflow-final","final","distributed"],
    transform: createStandardSkillTransform({
      sectionName: "Distributed Saga Transaction Choreography Orchestration Standards",
      ruSectionName: "Стандарты и регламенты: Distributed Saga Transaction Choreography Orchestration",
      instructions: [
        "Apply core domain tenets for Distributed Saga Transaction Choreography Orchestration.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Distributed Saga Transaction Choreography Orchestration.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["controlFlow","controlflow-final","final","distributed"],
    }),
  },

  "controlflow-final-rate-limiting-sliding-window-counter-algorithm": {
    id: "controlflow-final-rate-limiting-sliding-window-counter-algorithm",
    name: "RateLimitingSlidingWindowCounterAlgorithmSkill",
    displayName: "Rate-Limiting Sliding Window Counter Algorithm",
    categoryId: "controlFlow",
    description: "Implements high-accuracy sliding window rate limiters for API gateway protection.",
    tags: ["controlFlow","controlflow-final","final","rate"],
    transform: createStandardSkillTransform({
      sectionName: "Rate-Limiting Sliding Window Counter Algorithm Standards",
      ruSectionName: "Стандарты и регламенты: Rate-Limiting Sliding Window Counter Algorithm",
      instructions: [
        "Apply core domain tenets for Rate-Limiting Sliding Window Counter Algorithm.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Rate-Limiting Sliding Window Counter Algorithm.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["controlFlow","controlflow-final","final","rate"],
    }),
  },

  "controlflow-final-master-control-flow-architecture-execution-control": {
    id: "controlflow-final-master-control-flow-architecture-execution-control",
    name: "MasterControlFlowArchitectureExecutionControlSkill",
    displayName: "Master Control Flow Architecture Execution Control",
    categoryId: "controlFlow",
    description: "Enforces world-class workflow routing, state machines, and resilient execution control.",
    tags: ["controlFlow","controlflow-final","final","master"],
    transform: createStandardSkillTransform({
      sectionName: "Master Control Flow Architecture Execution Control Standards",
      ruSectionName: "Стандарты и регламенты: Master Control Flow Architecture Execution Control",
      instructions: [
        "Apply core domain tenets for Master Control Flow Architecture Execution Control.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Master Control Flow Architecture Execution Control.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["controlFlow","controlflow-final","final","master"],
    }),
  },
};
