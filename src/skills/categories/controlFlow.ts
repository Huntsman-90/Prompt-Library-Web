import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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
};
