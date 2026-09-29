import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const CONTROL_FLOW_SKILLS: Record<string, SkillDefinition> = {
  'state-machine-routing': {
    id: 'state-machine-routing',
    name: 'StateMachineRoutingSkill',
    displayName: 'Finite State Machine (FSM) Routing',
    categoryId: 'control_flow',
    description: 'Models execution transitions using explicit states, event triggers, and deterministic guard conditions.',
    tags: ['control_flow', 'fsm', 'state-machine', 'transitions', 'routing'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Маршрутизация по Конечному Автомату (FSM)',
        'Finite State Machine (FSM) Execution Routing',
        [
          '- **Состояния (States)**: Описать дискретные состояния системы: [INIT, PROCESSING, AWAITING_INPUT, FAILED, COMPLETED].',
          '- **Переходы (Transitions)**: Для каждого перехода указать: `[State_A] --(Event / Trigger)--> [State_B]`.',
          '- **Инварианты переходов**: Ни один переход не может произойти без валидации входных предусловий (Guards).',
        ],
        [
          '- **State Registry**: Define discrete states: [INIT, PROCESSING, AWAITING_INPUT, FAILED, COMPLETED].',
          '- **Deterministic Transitions**: Specify explicit transition rules: `[State_A] --(Event / Trigger)--> [State_B]`.',
          '- **Guard Invariants**: Zero transitions allowed without satisfying formal precondition assertions.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'fallback-branching': {
    id: 'fallback-branching',
    name: 'FallbackBranchingSkill',
    displayName: 'Graceful Fallback & Degradation Branching',
    categoryId: 'control_flow',
    description: 'Implements hierarchical fallback branches when primary APIs or network dependencies fail.',
    tags: ['control_flow', 'fallback', 'graceful-degradation', 'resilience', 'branching'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Иерархические Ветви Отката (Fallback Strategy)',
        'Hierarchical Fallback & Degradation Protocol',
        [
          '- **Основная ветвь (Primary)**: Полный функционал с высокой точностью.',
          '- **Вторичная ветвь (Fallback 1)**: Упрощенный эвристический расчет или использование кэша.',
          '- **Аварийная ветвь (Emergency Fallback)**: Безопасное дефолтное значение с логированием инцидента.',
        ],
        [
          '- **Primary Path**: Full-featured execution with maximum fidelity.',
          '- **Secondary Fallback**: Heuristic approximations or stale-cache serving.',
          '- **Emergency Safe-Default**: Deterministic safe default payload accompanied by structured error telemetry.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'loop-termination-criteria': {
    id: 'loop-termination-criteria',
    name: 'LoopTerminationCriteriaSkill',
    displayName: 'Deterministic Loop Termination & Halt Safety',
    categoryId: 'control_flow',
    description: 'Guarantees execution halts via strict iteration caps, convergence thresholds, and loop detection.',
    tags: ['control_flow', 'loop', 'termination', 'halt', 'safety', 'infinite-loop'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Критерии Остановки Циклов (Loop Safety)',
        'Deterministic Loop Termination Protocol',
        [
          '- **Жесткий лимит итераций (Max Steps = 10)**: Прерывать цикл при превышении порога с кодом ошибки `LOOP_EXHAUSTION`.',
          '- **Порог сходимости (Convergence Delta)**: Останавливать итерации, если дельта улучшения между шагами < 1%.',
          '- **Детектор зацикливания**: Сравнивать хэши состояний; при повторении немедленно переходить в ветвь восстановления.',
        ],
        [
          '- **Hard Step Budget (Max Steps = 10)**: Terminate loop upon exhaustion with explicit error token `LOOP_EXHAUSTION`.',
          '- **Convergence Delta**: Halt iterations when incremental delta falls below 1% threshold.',
          '- **Cycle Detection**: Compute state hashes; trigger recovery branch upon duplicate state detection.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'dynamic-condition-branching': {
    id: 'dynamic-condition-branching',
    name: 'DynamicConditionBranchingSkill',
    displayName: 'Multi-Condition Discriminator Branching',
    categoryId: 'control_flow',
    description: 'Directs execution flow dynamically based on payload complexity, data size, or intent classification.',
    tags: ['control_flow', 'branching', 'conditions', 'routing', 'switch-case'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Условное Ветвление по Типу Входных Данных',
        'Dynamic Multi-Condition Branching Rules',
        [
          '- **Ветвь А (Легковесный запрос)**: Если объем < 100 строк — выполнить синхронную однопроходную обработку.',
          '- **Ветвь Б (Сложный / Пакетный запрос)**: Если объем > 100 строк — применить чанкинг и параллельный конвейер.',
        ],
        [
          '- **Branch A (Lightweight Payload)**: If size < 100 items — execute single-pass synchronous pipeline.',
          '- **Branch B (High-Volume Payload)**: If size >= 100 items — apply chunking and asynchronous map-reduce flow.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'milestone-checkpoint': {
    id: 'milestone-checkpoint',
    name: 'MilestoneCheckpointSkill',
    displayName: 'Milestone Checkpointing & State Persistence',
    categoryId: 'control_flow',
    description: 'Saves intermediate state snapshots at critical milestones to allow idempotent resumes upon failure.',
    tags: ['control_flow', 'checkpoint', 'state', 'resume', 'persistence'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Контрольные Точки и Сохранение Состояния (Checkpoints)',
        'Milestone Checkpointing & Resume Protocol',
        [
          '- Фиксировать промежуточный снимок состояния после каждого логического блока: `CHECKPOINT_1 (Schema Validated)`.',
          '- При сбое на последующем шаге возобновлять выполнение с последней успешной контрольной точки.',
        ],
        [
          '- Persist immutable state snapshot after each phase: `CHECKPOINT_1 (Schema Validated)`.',
          '- On downstream failure, resume execution directly from most recent validated checkpoint.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'retry-backoff-policy': {
    id: 'retry-backoff-policy',
    name: 'RetryBackoffPolicySkill',
    displayName: 'Exponential Backoff & Jitter Retry Policy',
    categoryId: 'control_flow',
    description: 'Defines formal retry semantics with exponential backoff and randomized jitter to prevent thundering herds.',
    tags: ['control_flow', 'retry', 'backoff', 'jitter', 'thundering-herd'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Политика Повторных Попыток (Exponential Backoff + Jitter)',
        'Exponential Backoff & Jitter Retry Protocol',
        [
          '- Формула задержки: `t = min(t_max, t_initial * 2^attempt + jitter)`.',
          '- Максимум 3 повторные попытки только для транзиентных (5xx, 429) ошибок; фатальные (4xx) ошибки фейлить немедленно.',
        ],
        [
          '- Backoff formula: `t = min(t_max, t_initial * 2^attempt + random_jitter)`.',
          '- Maximum 3 retry attempts reserved strictly for transient faults (5xx, 429); fail fast on 4xx validation errors.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'early-exit-short-circuit': {
    id: 'early-exit-short-circuit',
    name: 'EarlyExitShortCircuitSkill',
    displayName: 'Early-Exit Short-Circuit Gate',
    categoryId: 'control_flow',
    description: 'Evaluates critical pre-requisites upfront to abort execution immediately if invariants are violated.',
    tags: ['control_flow', 'early-exit', 'short-circuit', 'gate', 'guard'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Быстрый Отказ (Early-Exit Gate)',
        'Early-Exit Short-Circuit Protocol',
        [
          '- На шаге 0 проверить обязательные предусловия; если данные некорректны — мгновенно вернуть ошибку без запуска тяжелых вычислений.',
        ],
        [
          '- Execute Step 0 precondition gate: if inputs violate baseline invariants, abort immediately with explicit diagnostic code.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'fork-join-parallel': {
    id: 'fork-join-parallel',
    name: 'ForkJoinParallelSkill',
    displayName: 'Fork-Join Parallel Branching',
    categoryId: 'control_flow',
    description: 'Forks independent sub-tasks into parallel processing tracks and joins them into a unified synthesized result.',
    tags: ['control_flow', 'fork-join', 'parallel', 'concurrency', 'merge'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Параллельная Обработка Fork-Join',
        'Fork-Join Parallel Execution Pattern',
        [
          '- **Fork**: Разделить входной массив на N независимых подзадач, исполняемых параллельно.',
          '- **Join & Barrier**: Дождаться завершения всех N потоков, слить результаты и устранить дубликаты.',
        ],
        [
          '- **Fork Phase**: Partition workload into N isolated sub-tasks for concurrent execution.',
          '- **Join & Synchronization Barrier**: Await completion across all tracks, reconcile conflicts, and merge into unified payload.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'circuit-breaker': {
    id: 'circuit-breaker',
    name: 'CircuitBreakerSkill',
    displayName: 'Circuit Breaker Fault Protection',
    categoryId: 'control_flow',
    description: 'Trips circuit breaker into OPEN state after consecutive failures to protect downstream dependencies.',
    tags: ['control_flow', 'circuit-breaker', 'fault-tolerance', 'resilience'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Паттерн Предохранителя (Circuit Breaker)',
        'Circuit Breaker Resilience Protocol',
        [
          '- Состояния: **CLOSED** (штатный режим) -> **OPEN** (после 3 сбоев подряд; вызовы блокируются) -> **HALF-OPEN** (пробный запрос).',
        ],
        [
          '- Tri-State Lifecycle: **CLOSED** (nominal) -> **OPEN** (tripped on 3 consecutive faults) -> **HALF-OPEN** (canary probe).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'exception-isolation': {
    id: 'exception-isolation',
    name: 'ExceptionIsolationSkill',
    displayName: 'Fault Isolation & Blast Radius Containment',
    categoryId: 'control_flow',
    description: 'Sandboxes volatile operations so sub-component crashes do not cascade across the entire system.',
    tags: ['control_flow', 'isolation', 'sandbox', 'blast-radius', 'safety'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Изоляция Сбоев и Ограничение Радиуса Поражения',
        'Fault Isolation & Blast Radius Containment',
        [
          '- Обернуть нестабильные операции в изолированный блок обработки ошибок; сбой одного элемента не должен останавливать весь батч.',
        ],
        [
          '- Sandbox volatile operations in isolated error boundaries; failure of single item must never crash batch processing.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'polling-rate-limiting': {
    id: 'polling-rate-limiting',
    name: 'PollingRateLimitingSkill',
    displayName: 'Rate Limiting & Token Bucket Control',
    categoryId: 'control_flow',
    description: 'Enforces token bucket and sliding window rate limits to adhere strictly to API quota constraints.',
    tags: ['control_flow', 'rate-limiting', 'token-bucket', 'quota'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Контроль Лимитов Частоты Запросов (Rate Limiting)',
        'Token Bucket & Rate Limiting Directives',
        [
          '- Не превышать допустимый лимит запросов в секунду (RPS limit); использовать очередь с задержкой при приближении к квоте.',
        ],
        [
          '- Adhere strictly to upstream token bucket rate limits; throttle request bursts and queue non-urgent calls.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'graceful-degradation': {
    id: 'graceful-degradation',
    name: 'GracefulDegradationSkill',
    displayName: 'Graceful Degradation & Feature Toggles',
    categoryId: 'control_flow',
    description: 'Selectively turns off non-critical bells and whistles during heavy load to keep core business operations alive.',
    tags: ['control_flow', 'degradation', 'feature-flags', 'load-shedding'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Плавная Деградация при Пиковой Нагрузке',
        'Graceful Degradation & Shedding Protocol',
        [
          '- При перегрузке отключить вторичную аналитику и фоновые украшения, сохранив работоспособность критического пути.',
        ],
        [
          '- Shed non-critical telemetry and secondary computations under load to preserve critical transaction path latency.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'priority-queue-routing': {
    id: 'priority-queue-routing',
    name: 'PriorityQueueRoutingSkill',
    displayName: 'Priority Queue Execution Routing',
    categoryId: 'control_flow',
    description: 'Dispatches high-priority tasks (P0/P1) ahead of bulk background jobs using priority lanes.',
    tags: ['control_flow', 'priority-queue', 'qos', 'scheduling'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Приоритетная Маршрутизация Задач (QoS)',
        'Priority Queue Scheduling & QoS Protocol',
        [
          '- Разделить очередь задач на приоритеты: High (P0/P1) обрабатываются вне очереди, Low (P2/P3) — в фоне.',
        ],
        [
          '- Partition execution into prioritized lanes: P0/P1 high-priority tasks preempt bulk background jobs.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'multi-stage-gatekeeper': {
    id: 'multi-stage-gatekeeper',
    name: 'MultiStageGatekeeperSkill',
    displayName: 'Multi-Stage Staged Gatekeeper Approval',
    categoryId: 'control_flow',
    description: 'Requires explicit sign-off at each gate (Plan -> Audit -> Execute -> Verify) before moving to next stage.',
    tags: ['control_flow', 'gatekeeper', 'approval', 'staged', 'safety'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Многоэтапный Контроль Качества (Stage Gates)',
        'Multi-Stage Gatekeeper Verification Protocol',
        [
          '- Этап 1 (Планирование) -> **GATE 1 (Аудит архитектуры)** -> Этап 2 (Имплементация) -> **GATE 2 (Тесты и безопасность)**.',
          '- Переход на следующий этап возможен только после 100% прохождения критериев текущего шлюза.',
        ],
        [
          '- Phase 1 (Planning) -> **GATE 1 (Architecture Sign-off)** -> Phase 2 (Implementation) -> **GATE 2 (Regression Tests & Audit)**.',
          '- Advance to subsequent stage only upon 100% satisfaction of active gatekeeper criteria.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
