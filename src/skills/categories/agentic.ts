import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
} from '../skillHelpers';

export const AGENTIC_SKILLS: Record<string, SkillDefinition> = {
  'react-loop': {
    id: 'react-loop',
    name: 'ReActLoopSkill',
    displayName: 'ReAct Autonomous Cycle (Thought/Action/Obs)',
    categoryId: 'agentic',
    description: 'Enforces strict ReAct cycle (Thought -> Action -> Observation -> Reflection) with explicit halt states.',
    tags: ['agentic', 'react', 'loop', 'autonomous', 'tool-use', 'workflow'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Протокол Автономного Цикла ReAct',
        'ReAct Autonomous Execution Protocol',
        [
          '- **Формат шага**: Каждый шаг должен строго следовать схеме: `[Thought: анализ ситуации] -> [Action: вызов инструмента] -> [Observation: результат] -> [Reflection: оценка прогресса]`.',
          '- **Критерий завершения**: Прекратить цикл только при достижении гарантированного решения (`Final Answer`) либо исчерпании лимита итераций.',
          '- **Запрет на галлюцинацию вызовов**: Никогда не выдумывать результаты работы инструментов; использовать только фактические данные из Observation.',
        ],
        [
          '- **Step Anatomy**: Enforce strict execution quad: `[Thought: State Analysis] -> [Action: Tool Invocation] -> [Observation: Output Contract] -> [Reflection: Goal Progress]`.',
          '- **Halt State**: Terminate execution loop strictly upon emitting verified `Final Answer` or exhausting iteration budgets.',
          '- **Observation Grounding**: Never hallucinate tool payloads; condition every subsequent Thought strictly on observed data.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'task-decomposition': {
    id: 'task-decomposition',
    name: 'TaskDecompositionSkill',
    displayName: 'Hierarchical DAG Task Decomposition',
    categoryId: 'agentic',
    description: 'Deconstructs complex goals into directed acyclic task graphs with explicit prerequisite dependencies.',
    tags: ['agentic', 'dag', 'decomposition', 'planning', 'subtasks', 'dependencies'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Иерархическая Декомпозиция в DAG-Граф Задач',
        'Hierarchical DAG Task Decomposition',
        [
          '- **Граф подзадач**: Разбить глобальную цель на атомарные подзадачи с указанием зависимостей: `Subtask_N: [Зависит от: Subtask_K]`.',
          '- **Параллелизм vs Последовательность**: Четко выделить шаги, которые могут выполняться параллельно, и шаги, требующие строгой последовательности.',
          '- **Контракт входа/выхода**: Для каждой подзадачи определить точный формат входных данных и ожидаемый артефакт на выходе.',
        ],
        [
          '- **Subtask DAG Graph**: Deconstruct overarching mission into atomic subtasks tagged with explicit prerequisites: `Subtask_N: [DependsOn: Subtask_K]`.',
          '- **Concurrency Isolation**: Explicitly separate parallelizable sub-workflows from strictly synchronous linear pipelines.',
          '- **I/O Interface Contract**: Define explicit JSON input parameters and output artifact schema for every atomic node in the graph.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'tool-use-protocol': {
    id: 'tool-use-protocol',
    name: 'ToolUseProtocolSkill',
    displayName: 'Deterministic Tool Contract & Validation',
    categoryId: 'agentic',
    description: 'Defines schema-validated JSON tool invocation protocols with strict error handling and recovery.',
    tags: ['agentic', 'tools', 'schema', 'validation', 'contracts', 'api'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Протокол Вызова Инструментов и Валидации Схем',
        'Deterministic Tool Invocation & Schema Contracts',
        [
          '- **Строгая схема аргументов**: Формировать вызовы инструментов строго в формате валидного JSON по заданной схеме без лишнего текста.',
          '- **Обработка ошибок выполнения**: При получении ошибки от инструмента (4xx, 5xx, timeout) проанализировать payload и исправить параметры перед повторным вызовом.',
          '- **Проверка предусловий**: Перед вызовом инструмента убедиться в наличии всех обязательных переменных контекста.',
        ],
        [
          '- **Strict Schema Compliance**: Emit tool calls as pristine JSON payloads matching declared parameter signatures exactly.',
          '- **Error Interception & Recovery**: On tool exceptions (4xx, 5xx, timeouts), parse error body and adjust invocation parameters prior to retry.',
          '- **Precondition Gate**: Validate presence and type-correctness of all required context keys before dispatching calls.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'memory-context-protocol': {
    id: 'memory-context-protocol',
    name: 'MemoryContextProtocolSkill',
    displayName: 'Multi-Tier Memory & Scratchpad Protocol',
    categoryId: 'agentic',
    description: 'Manages multi-tier agent memory: working scratchpad, episodic conversation logs, and semantic long-term storage.',
    tags: ['agentic', 'memory', 'scratchpad', 'context', 'episodic', 'state'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Протокол Управления Памятью и Рабочим Блокнотом',
        'Multi-Tier Memory & Scratchpad Management Protocol',
        [
          '- **Рабочий блокнот (Scratchpad)**: Хранить текущее промежуточное состояние, проверенные факты и открытые вопросы в изолированном блоке памяти.',
          '- **Эпизодическая память**: Фиксировать ключевые развилки и принятые решения для предотвращения повторения отвергнутых путей.',
          '- **Сжатие контекста**: При исчерпании контекстного окна суммировать историю в компактный вектор фактов без потери числовых данных.',
        ],
        [
          '- **Working Scratchpad**: Maintain current execution state, validated facts, and unresolved blocker items in an isolated scratchpad buffer.',
          '- **Episodic Decision Log**: Catalog critical decision pivots and rejected branches to prevent redundant re-exploration.',
          '- **Context Compaction**: Upon context limits, synthesize a high-density factual summary preserving exact metrics and entity IDs.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'self-healing-agent': {
    id: 'self-healing-agent',
    name: 'SelfHealingAgentSkill',
    displayName: 'Self-Healing & Autonomous Error Recovery',
    categoryId: 'agentic',
    description: 'Enables automatic detection of execution exceptions, self-diagnosis, fallback routing, and retry loops.',
    tags: ['agentic', 'self-healing', 'recovery', 'fault-tolerance', 'fallback'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Протокол Самовосстановления и Автономной Коррекции',
        'Self-Healing & Autonomous Error Recovery Protocol',
        [
          '- **Детекция сбоя**: Автоматически распознавать синтаксические ошибки, таймауты, пустые ответы и невалидные JSON-схемы.',
          '- **Самодиагностика**: Провести моментальный анализ первопричины сбоя (Invalid Argument vs. Upstream Down vs. Rate Limit).',
          '- **Маршрутизация на Fallback**: При невозможности прямого исправления переключиться на резервный алгоритм или альтернативный инструмент.',
        ],
        [
          '- **Fault Detection**: Automatically classify syntax errors, schema violations, empty responses, and timeouts.',
          '- **Automated Diagnosis**: Determine exact root cause (Payload Mismatch vs. Service Outage vs. Rate Limit).',
          '- **Fallback Routing**: Gracefully switch to secondary backup toolpaths or degraded heuristic modes when primary route fails.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'subagent-swarm-orchestration': {
    id: 'subagent-swarm-orchestration',
    name: 'SubagentSwarmOrchestrationSkill',
    displayName: 'Subagent Swarm & Consensus Orchestration',
    categoryId: 'agentic',
    description: 'Orchestrates concurrent specialized subagents (Researcher, Coder, Reviewer) and synthesizes consensus.',
    tags: ['agentic', 'swarm', 'subagents', 'orchestration', 'consensus', 'multi-agent'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Оркестрация Роя Субагентов и Консенсус',
        'Subagent Swarm Dispatch & Consensus Orchestration',
        [
          '- **Делегирование ролей**: Назначить специализированных субагентов (Planner, Worker, Security Auditor, Verifier) с изолированными промптами.',
          '- **Параллельное исполнение**: Запустить независимые задачи асинхронно, агрегируя результаты в едином координаторе.',
          '- **Механизм консенсуса**: При расхождении выводов провести раунд перекрестной верификации для выработки единого решения.',
        ],
        [
          '- **Specialized Role Dispatch**: Instantiate specialized subagents (Planner, Specialist Worker, Security Auditor, QA Verifier) with isolated system boundaries.',
          '- **Parallel Execution**: Execute independent subtasks concurrently, streaming partial outputs to the master orchestrator.',
          '- **Consensus Reconciliation**: Mediate conflicting subagent findings via weighted cross-verification rounds before emitting final state.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'human-in-the-loop-gate': {
    id: 'human-in-the-loop-gate',
    name: 'HumanInTheLoopGateSkill',
    displayName: 'Human-in-the-Loop (HITL) Safety Gate',
    categoryId: 'agentic',
    description: 'Places explicit approval interrupts and confirmation prompts before executing irreversible actions.',
    tags: ['agentic', 'hitl', 'approval', 'safety-gate', 'destructive-actions'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'constraints',
        'Шлюз Одобрения Человеком (Human-in-the-Loop Gate)',
        'Human-in-the-Loop (HITL) Execution Gate',
        [
          '- **Классификация деструктивности**: Операции удаления данных, отправки платежей, изменения прав и деплоя в прод маркировать как High-Risk.',
          '- **Точка останова (Breakpoint)**: Перед выполнением High-Risk действия приостановить выполнение и запросить подтверждение пользователя с описанием последствий.',
          '- **План отката (Rollback Plan)**: Вместе с запросом на одобрение предоставить готовый сценарий отката в случае сбоя.',
        ],
        [
          '- **Risk Classification**: Classify state mutations, data deletion, financial transactions, permission grants, and prod deployments as High-Risk.',
          '- **Execution Breakpoint**: Halt execution before High-Risk dispatches; output explicit impact preview and request user sign-off.',
          '- **Rollback Manifest**: Accompany every destructive request with a pre-computed rollback script.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'budget-token-governor': {
    id: 'budget-token-governor',
    name: 'BudgetTokenGovernorSkill',
    displayName: 'Execution Budget & Loop Governor',
    categoryId: 'agentic',
    description: 'Enforces hard upper bounds on iterations, token consumption, execution time, and recursion depth.',
    tags: ['agentic', 'budget', 'tokens', 'limits', 'rate-limit', 'governor'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'constraints',
        'Контроль Бюджета Выполнения и Лимиты Итераций',
        'Execution Budget & Loop Governor',
        [
          '- **Лимит шагов (Max Steps)**: Установить жесткое ограничение (например, максимум 10 шагов цикла); при превышении выдать аварийную остановку с текущим состоянием.',
          '- **Токен-менеджмент**: Ограничить длину каждого шага; не спамить избыточными логами.',
          '- **Защита от бесконечного цикла**: Детектировать повторяющиеся состояния (state looping) и принудительно менять стратегию.',
        ],
        [
          '- **Hard Step Cap**: Enforce an upper bound on agent cycles (e.g., max 10 steps); abort with partial state if limit is breached.',
          '- **Token Economy**: Constrain per-step response volume; suppress voluminous raw tool logs.',
          '- **Loop Detection**: Detect cyclic state repetitions and force strategy mutation or graceful termination.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'plan-and-solve': {
    id: 'plan-and-solve',
    name: 'PlanAndSolveSkill',
    displayName: 'Plan-and-Solve Two-Phase Execution',
    categoryId: 'agentic',
    description: 'Separates macro strategic planning from step-by-step tactical execution and verification.',
    tags: ['agentic', 'plan-and-solve', 'planning', 'execution', 'strategy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Двухфазный Протокол: Планирование и Исполнение (Plan-and-Solve)',
        'Plan-and-Solve Two-Phase Execution Protocol',
        [
          '- **Фаза 1: Стратегический план**: Сформировать полный нумерованный план решения задачи с критериями завершения каждого пункта.',
          '- **Фаза 2: Последовательное исполнение**: Выполнять пункты строго по порядку, отмечая статус `[DONE]` или `[IN PROGRESS]`.',
          '- **Динамическая корректировка плана**: Если на шаге N получены новые факты, пересмотреть оставшуюся часть плана перед продолжением.',
        ],
        [
          '- **Phase 1: Strategic Planning**: Construct an exhaustive numbered roadmap with explicit completion gates per item.',
          '- **Phase 2: Tactical Execution**: Execute nodes sequentially, marking status tags `[COMPLETED]`, `[FAILED]`, or `[PENDING]`.',
          '- **Dynamic Plan Revision**: If step N reveals unforeseen constraints, recalculate downstream roadmap prior to continuation.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'dynamic-context-pruning': {
    id: 'dynamic-context-pruning',
    name: 'DynamicContextPruningSkill',
    displayName: 'Dynamic Context Pruning & Window Defense',
    categoryId: 'agentic',
    description: 'Dynamically strips obsolete intermediate outputs and compresses payload tokens to prevent context dilution.',
    tags: ['agentic', 'pruning', 'context', 'window', 'compression', 'optimization'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Динамическая Очистка Контекста и Сжатие Истории',
        'Dynamic Context Pruning & Window Optimization',
        [
          '- **Удаление промежуточного мусора**: Стирать из активной памяти сырые логи и промежуточные вызовы, сохранив только извлеченные структурированные факты.',
          '- **Сворачивание завершенных этапов**: Сворачивать выполненные подзадачи в однострочные резюме: `Subtask X: Completed successfully (Result: ID=123)`.',
          '- **Сохранение ключевых инвариантов**: Никогда не удалять корневую задачу, активные ограничения и финальную схему ответа.',
        ],
        [
          '- **Raw Payload Pruning**: Strip massive raw API logs from working memory, retaining only distilled semantic key-value facts.',
          '- **Completed Step Condensation**: Compress resolved subtasks into one-line summaries: `Subtask X: Verified (Artifact: ID=123)`.',
          '- **Core Invariant Preservation**: Strictly protect root mission, hard constraints, and final output schemas from eviction.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'deterministic-state-machine': {
    id: 'deterministic-state-machine',
    name: 'DeterministicStateMachineSkill',
    displayName: 'Deterministic Finite State Machine (FSM)',
    categoryId: 'agentic',
    description: 'Constrains agent transitions through a deterministic state machine (e.g. INIT -> GATHER -> PROCESS -> VERIFY -> EMIT).',
    tags: ['agentic', 'fsm', 'state-machine', 'transitions', 'deterministic'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Детерминированный Конечный Автомат (FSM Protocol)',
        'Deterministic Finite State Machine (FSM Protocol)',
        [
          '- **Определение состояний**: Агент может находиться строго в одном из состояний: `[INIT] -> [DATA_FETCH] -> [VALIDATE] -> [EXECUTE] -> [VERIFY] -> [HALT]`.',
          '- **Правила переходов (Transitions)**: Переход в следующее состояние возможен только при выполнении всех guard-условий текущего состояния.',
          '- **Запрет невалидных действий**: В состоянии `[VALIDATE]` запрещено вызывать исполнительные инструменты; в `[DATA_FETCH]` запрещено формировать финальный ответ.',
        ],
        [
          '- **State Topology**: Agent must reside strictly in defined discrete states: `[INIT] -> [DISCOVERY] -> [VALIDATE] -> [EXECUTE] -> [AUDIT] -> [HALT]`.',
          '- **Transition Guard**: Transition to the next state only when all guard conditions of the current state evaluate to TRUE.',
          '- **Action Restriction**: Enforce strict tool whitelists per state (e.g., destructive actions prohibited during DISCOVERY state).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'adversarial-tool-verifier': {
    id: 'adversarial-tool-verifier',
    name: 'AdversarialToolVerifierSkill',
    displayName: 'Adversarial Tool Input Sanitizer',
    categoryId: 'agentic',
    description: 'Scans and sanitizes tool parameters against injection attacks, path traversals, and unvalidated shell commands.',
    tags: ['agentic', 'security', 'sanitizer', 'adversarial', 'injection', 'safety'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'constraints',
        'Санитизация и Защита Параметров Вызова Инструментов',
        'Adversarial Tool Input Sanitization Protocol',
        [
          '- **Проверка на инъекции**: Блокировать любые попытки выполнения command injection (`rm -rf`, `;`, `&&`), path traversal (`../`) и SQL-инъекций.',
          '- **Валидация типов и диапазонов**: Проверять числовые границы, длину строк и допустимые enum-значения перед отправкой вызова.',
          '- **Принцип наименьших привилегий**: Выбирать инструмент с минимально необходимым уровнем доступа к файловой системе и сети.',
        ],
        [
          '- **Injection Defense**: Intercept and block command injection tokens (`;`, `&&`, `|`), directory traversal (`../`), and SQLi fragments.',
          '- **Type & Range Boundary Check**: Validate numeric bounds, string lengths, and enum values prior to tool invocation.',
          '- **Least Privilege Principle**: Select tools with the lowest required permissions scope for the target operation.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'idempotent-retry-policy': {
    id: 'idempotent-retry-policy',
    name: 'IdempotentRetryPolicySkill',
    displayName: 'Idempotency & Exponential Backoff Policy',
    categoryId: 'agentic',
    description: 'Enforces idempotency keys and exponential backoff with jitter on agent tool calls to avoid side-effect duplication.',
    tags: ['agentic', 'idempotency', 'retry', 'backoff', 'reliability', 'resilience'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Идемпотентность и Политика Повторов (Backoff Policy)',
        'Idempotency & Exponential Backoff Protocol',
        [
          '- **Идемпотентные ключи (Idempotency Key)**: Каждому изменяющему запросу присваивать уникальный детерминированный ключ операции для защиты от дублирования.',
          '- **Экспоненциальная задержка с джиттером**: При ошибках 429 или 503 повторять запросы с интервалом: $t = 2^k \\times base + jitter$.',
          '- **Лимит повторных попыток**: Максимум 3 повтора на операцию; при повторном сбое перейти в режим аварийной обработки.',
        ],
        [
          '- **Deterministic Idempotency Key**: Attach unique idempotency keys to mutating tool actions to prevent duplicate executions.',
          '- **Exponential Backoff with Jitter**: On 429 rate limits or transient 503 errors, apply $t = 2^k \\times base + jitter$.',
          '- **Circuit Breaker Retry Cap**: Limit retries to 3 attempts before triggering circuit breaker fallback.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'telemetry-agent-audit': {
    id: 'telemetry-agent-audit',
    name: 'TelemetryAgentAuditSkill',
    displayName: 'Agent Audit Trail & Telemetry Logging',
    categoryId: 'agentic',
    description: 'Emits structured audit logs with execution durations, tool latencies, token counters, and decision rationale.',
    tags: ['agentic', 'telemetry', 'audit', 'logging', 'observability', 'traces'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Аудит-Лог и Телеметрия Выполнения Агента',
        'Agent Audit Trail & Execution Telemetry Schema',
        [
          '- **Структурированный лог решений**: Фиксировать каждое действие с полями: `[Timestamp | Step Number | Selected Tool | Execution Status | Rationale]`.',
          '- **Метрики производительности**: Отслеживать время выполнения каждого шага и объем потребленных токенов.',
          '- **Финальный отчет исполнения**: Сопроводить итоговый ответ краткой сводкой работы агента (Количество шагов, вызовы инструментов, время).',
        ],
        [
          '- **Structured Audit Log**: Record every action with: `[Timestamp | Step # | Tool Name | Execution Status | Decision Rationale]`.',
          '- **Execution Metrics**: Track per-step latency, tool response times, and token consumption.',
          '- **Final Execution Summary**: Append a concise execution summary block (Total Steps, Tools Invoked, Errors Recovered).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
