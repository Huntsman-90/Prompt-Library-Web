import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
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

  'reflexion-episodic-memory': {
    id: 'reflexion-episodic-memory',
    name: 'ReflexionEpisodicMemorySkill',
    displayName: 'Reflexion Episodic Memory & Learning',
    categoryId: 'agentic',
    description: 'Maintains an episodic memory buffer of verbal post-trial reflections to eliminate repeated exploration mistakes.',
    tags: ['agentic', 'reflexion', 'memory', 'reinforcement', 'learning', 'self-reflection'],
    transform: createStandardSkillTransform(
      'protocol',
      'Эпизодическая Память Ошибок и Саморефлексия (Reflexion)',
      'Reflexion Episodic Memory & Self-Learning Protocol',
      [
        '- **Вербальная рефлексия после сбоя**: При неудачном выполнении подзадачи сгенерировать вербальное заключение: почему действие не сработало и что нужно изменить.',
        '- **Буфер эпизодической памяти**: Сохранить выводы в краткосрочном буфере рефлексий и проверять их перед каждым новым действием.',
        '- **Запрет повторных ошибок**: Категорически запрещено повторять траекторию вызова инструментов, которая уже привела к ошибке в текущей сессии.',
      ],
      [
        '- **Post-Failure Verbal Reflection**: On tool error or hallucinated goal delta, generate explicit verbal self-critique detailing why the hypothesis failed.',
        '- **Episodic Working Buffer**: Maintain reflections in an active memory scratchpad consultable before selecting subsequent actions.',
        '- **Eradicate Repetitive Failures**: Strictly forbid re-executing action trajectories that previously yielded failure signatures in the current trajectory.',
      ]
    ),
  },

  'map-reduce-subagent-dispatch': {
    id: 'map-reduce-subagent-dispatch',
    name: 'MapReduceSubagentDispatchSkill',
    displayName: 'Map-Reduce Parallel Subagent Swarm',
    categoryId: 'agentic',
    description: 'Splits massive multi-item jobs into concurrent worker subagents, joining and deduplicating outputs via a master reducer.',
    tags: ['agentic', 'map-reduce', 'parallel', 'subagents', 'swarm', 'concurrency'],
    transform: createStandardSkillTransform(
      'protocol',
      'Параллельный Диспетчер Под-Агентов (Map-Reduce)',
      'Map-Reduce Subagent Dispatch Protocol',
      [
        '- **Фаза Map (Разделение)**: Разбить массив входных данных (файлы, репозитории, сущности) на изолированные независимые чанки.',
        '- **Изолированное исполнение воркеров**: Назначить на каждый чанк отдельный экземпляр под-агента со своим контекстом и строгой схемой возврата.',
        '- **Фаза Reduce (Сборка и Дедупликация)**: Агент-редуктор собирает частичные результаты, устраняет дубликаты и синтезирует согласованный финальный артефакт.',
      ],
      [
        '- **Map Stage Chunk Partitioning**: Decompose monolithic batch datasets (files, endpoints, codebase repos) into isolated atomic chunks.',
        '- **Ephemeral Worker Isolation**: Dispatch concurrent, context-isolated worker agents per chunk enforcing uniform JSON output contracts.',
        '- **Reduce Consolidation**: Master reducer agent ingests worker streams, performs conflict resolution, deduplicates insights, and emits a synthesized deliverable.',
      ]
    ),
  },

  'agentic-tool-registry-pruning': {
    id: 'agentic-tool-registry-pruning',
    name: 'AgenticToolRegistryPruningSkill',
    displayName: 'Dynamic Tool Registry Pruning & Selection',
    categoryId: 'agentic',
    description: 'Filters massive tool catalogues, dynamically injecting only the top-K relevant tool schemas into context per turn.',
    tags: ['agentic', 'tool-selection', 'pruning', 'context-management', 'schema'],
    transform: createStandardSkillTransform(
      'protocol',
      'Динамический Отбор и Фильтрация Инструментов (Tool Pruning)',
      'Dynamic Tool Registry Pruning Protocol',
      [
        '- **Релевантный отбор Top-K**: Из каталога десятков инструментов отбирать только 3–5 наиболее подходящих для текущего шага.',
        '- **Предотвращение размытия внимания**: Исключить нерелевантные схемы вызовов, чтобы избежать галлюцинаций аргументов и переполнения контекста.',
        '- **Обоснование выбора**: Агент должен кратко аргументировать, почему для шага выбран именно этот инструмент из доступных.',
      ],
      [
        '- **Top-K Tool Injection**: From comprehensive tool libraries, dynamically retrieve and inject only the 3-5 most pertinent schemas for the immediate step.',
        '- **Context Bloat Prevention**: Shield LLM attention from tool clutter to minimize parameter hallucinations and schema degradation.',
        '- **Invocation Rationale**: Require the agent to explicitly state tool selection logic before dispatching payloads.',
      ]
    ),
  },

  'critique-revise-loop-actor': {
    id: 'critique-revise-loop-actor',
    name: 'CritiqueReviseLoopActorSkill',
    displayName: 'Actor-Critic Dual-Agent Revision Loop',
    categoryId: 'agentic',
    description: 'Decouples output generation from adversarial critique, looping revisions until the Critic signs off.',
    tags: ['agentic', 'actor-critic', 'revision', 'dual-agent', 'quality-gate'],
    transform: createStandardSkillTransform(
      'protocol',
      'Двухагентный Контур «Генератор — Критик» (Actor-Critic)',
      'Actor-Critic Dual-Agent Revision Loop Protocol',
      [
        '- **Разделение ролей**: Роль Актёра генерирует решение; Роль Критика выступает враждебным аудитором, выискивающим ошибки и уязвимости.',
        '- **Строгие критерии согласования**: Актёр не может закрыть задачу, пока Критик не выставит вердикт «Approved» по всем критериям безопасности и качества.',
        '- **Итеративная доработка**: При замечаниях Критика Актёр получает структурированный перечень дефектов и переделывает решение.',
      ],
      [
        '- **Role Bifurcation**: Actor entity synthesizes candidate solutions; Critic entity acts as an adversarial auditor scrutinizing for flaws.',
        '- **Sign-off Quality Gate**: The agent cannot declare task completion until the Critic issues a formal "Approved" clearance token.',
        '- **Targeted Rectification**: On rejection, Critic outputs machine-readable bug vectors that the Actor systematically resolves in the next turn.',
      ]
    ),
  },

  'conversational-state-machine': {
    id: 'conversational-state-machine',
    name: 'ConversationalStateMachineSkill',
    displayName: 'Deterministic Finite State Machine (FSM)',
    categoryId: 'agentic',
    description: 'Constrains multi-turn autonomous dialogs to explicit deterministic states (Init -> Intake -> Verification -> Execution -> Final).',
    tags: ['agentic', 'fsm', 'state-machine', 'dialogue', 'deterministic', 'workflow'],
    transform: createStandardSkillTransform(
      'protocol',
      'Конечный Автомат Диалога (Deterministic FSM)',
      'Deterministic Finite State Machine (FSM) Protocol',
      [
        '- **Спецификация состояний**: Агент обязан находиться в одном из состояний: `INIT`, `INFO_GATHERING`, `VALIDATION`, `EXECUTION`, `TERMINATED`.',
        '- **Правила переходов (Transitions)**: Переход в следующее состояние возможен только при выполнении строгих входных условий (Guard Conditions).',
        '- **Маркировка состояния**: Каждый ответ агента должен начинаться с мета-тега текущего состояния (напр. `[STATE: VALIDATION]`).',
      ],
      [
        '- **Discrete State Topology**: Constrain execution to explicit states: `INIT`, `INTAKE`, `VERIFICATION`, `MUTATION`, `FINALIZED`.',
        '- **Guard Condition Transitions**: State transitions require 100% satisfaction of formal preconditions (e.g. all parameters validated).',
        '- **State Header Annotation**: Every agent emission must begin with its active state marker (e.g. `[CURRENT_STATE: VERIFICATION]`).',
      ]
    ),
  },

  'budget-constrained-agent-cutoff': {
    id: 'budget-constrained-agent-cutoff',
    name: 'BudgetConstrainedAgentCutoffSkill',
    displayName: 'Token & Monetary Execution Budget Guard',
    categoryId: 'agentic',
    description: 'Enforces hard token counters and execution step ceilings, triggering graceful best-effort consolidation at 90% budget.',
    tags: ['agentic', 'budget', 'token-limit', 'circuit-breaker', 'cost-control'],
    transform: createStandardSkillTransform(
      'constraints',
      'Контроль Бюджета Токенов и Лимита Шагов (Budget Guard)',
      'Execution Budget & Step Ceiling Protocol',
      [
        '- **Лимит итераций и токенов**: Зафиксировать жесткий лимит: максимум N шагов (напр. 8) или X токенов.',
        '- **Порог 90% (Graceful Wind-Down)**: При достижении 90% лимита агент обязан прекратить исследовательские вызовы и собрать лучший промежуточный ответ.',
        '- **Прозрачность расходов**: В конце работы указать количество затраченных шагов и оставшийся бюджет.',
      ],
      [
        '- **Hard Step & Token Ceilings**: Enforce maximum iteration cap (e.g. 8 turns) and maximum token consumption envelope.',
        '- **90% Budget Emergency Consolidation**: At 90% budget consumption, abort exploratory tool calls and synthesize best-effort partial deliverables.',
        '- **Resource Spend Telemetry**: Conclude execution with an itemized accounting of turns elapsed and token budget variance.',
      ]
    ),
  },

  'semantic-cache-retrieval': {
    id: 'semantic-cache-retrieval',
    name: 'SemanticCacheRetrievalSkill',
    displayName: 'Semantic Vector Tool-Result Caching',
    categoryId: 'agentic',
    description: 'Intercepts tool invocations with semantic vector cache lookups to bypass expensive repetitive external API queries.',
    tags: ['agentic', 'caching', 'vector-cache', 'performance', 'latency', 'api'],
    transform: createStandardSkillTransform(
      'protocol',
      'Семантическое Кэширование Вызовов Инструментов',
      'Semantic Vector Tool-Result Caching Protocol',
      [
        '- **Проверка кэша перед запросом**: Перед обращением к внешнему API или тяжелому инструменту проверить наличие семантически эквивалентного ответа в кэше.',
        '- **Порог схожести (Cosine Similarity > 0.92)**: Использовать кэшированный результат только при высокой степени совпадения параметров.',
        '- **Инвалидация и TTL**: Обязательно учитывать срок жизни данных (TTL) и не использовать устаревшие кэшированные состояния.',
      ],
      [
        '- **Pre-Invocation Cache Probe**: Intercept outbound tool calls by matching normalized parameter embeddings against cached historical results.',
        '- **Semantic Similarity Threshold**: Re-use cached output payloads only when cosine similarity exceeds 0.92 with identical environmental context.',
        '- **TTL & Freshness Verification**: Reject cached payloads exceeding TTL freshness horizons, enforcing live queries for volatile real-time entities.',
      ]
    ),
  },

  'context-compaction-summarizer': {
    id: 'context-compaction-summarizer',
    name: 'ContextCompactionSummarizerSkill',
    displayName: 'Scratchpad Context Compaction & Pruning',
    categoryId: 'agentic',
    description: 'Periodically compresses historical tool outputs and reasoning scratchpads into dense state snapshots to preserve context window.',
    tags: ['agentic', 'context-compaction', 'summarization', 'tokens', 'scratchpad'],
    transform: createStandardSkillTransform(
      'protocol',
      'Компрессия Контекста и Сжатие Истории Шагов',
      'Scratchpad Context Compaction Protocol',
      [
        '- **Периодическая свертка (Каждые 3–4 шага)**: Сворачивать сырые логи вызовов инструментов в компактное резюме ключевых фактов.',
        '- **Удаление промежуточного мусора**: Стирать из активного контекста гигантские JSON-ответы, сохраняя только извлеченные сущности.',
        '- **Сохранение целевого вектора**: В компактном снепшоте обязательно сохранять неизменную исходную цель задачи.',
      ],
      [
        '- **Periodic Compaction Cadence**: Every 3-4 turns, compress raw execution logs into a dense factual delta state vector.',
        '- **Payload Stripping**: Discard multi-kilobyte raw JSON tool payloads, preserving solely isolated parameters and validated return values.',
        '- **Core Goal Persistence**: Ensure the condensed scratchpad maintains explicit alignment with the root user directive.',
      ]
    ),
  },

  'deterministic-fallback-routing': {
    id: 'deterministic-fallback-routing',
    name: 'DeterministicFallbackRoutingSkill',
    displayName: 'Deterministic Fallback & Safe Routing',
    categoryId: 'agentic',
    description: 'Switches execution from speculative LLM tool loops to deterministic hardcoded algorithms when divergence or loops are detected.',
    tags: ['agentic', 'fallback', 'deterministic', 'safety', 'circuit-breaker'],
    transform: createStandardSkillTransform(
      'protocol',
      'Детерминированный Аварийный Фоллбэк (Fallback Routing)',
      'Deterministic Fallback & Safe Routing Protocol',
      [
        '- **Детекция расхождения (Divergence Detection)**: Фиксировать ситуации, когда агент делает более 2 нерелевантных действий подряд.',
        '- **Аварийное переключение на код**: При потере курса немедленно переключить задачу на классический детерминированный алгоритм (regex, SQL, hardcoded rule).',
        '- **Безопасное завершение**: Предоставить прозрачное объяснение причин переключения на аварийный сценарий.',
      ],
      [
        '- **Divergence Threshold Trip**: Monitor for semantic drift or when >2 consecutive actions yield zero progress toward target invariants.',
        '- **Deterministic Circuit Breaker**: Instantly fall back to static deterministic heuristics (compiled regex, hardcoded queries, rule-based scripts).',
        '- **Safe Exit Transparency**: Document why autonomous execution was suspended and provide diagnostic logs to the supervisory system.',
      ]
    ),
  },

  'tool-payload-schema-guard': {
    id: 'tool-payload-schema-guard',
    name: 'ToolPayloadSchemaGuardSkill',
    displayName: 'Runtime Zod / JSON Schema Tool Guard',
    categoryId: 'agentic',
    description: 'Strictly validates and auto-repairs tool payloads against formal JSON schemas before network transmission.',
    tags: ['agentic', 'zod', 'schema-guard', 'json-schema', 'validation', 'runtime'],
    transform: createStandardSkillTransform(
      'constraints',
      'Строгая Валидация Схемы Полезной Нагрузки (Schema Guard)',
      'Runtime Tool Payload Schema Guard Protocol',
      [
        '- **Предварительная валидация схемы**: Перед отправкой проверить каждый параметр на соответствие типам (string, number, boolean, array, enum).',
        '- **Автоматическое приведение типов (Coercion)**: Автоматически конвертировать числовые строки в `number` и приводить даты к ISO-8601.',
        '- **Отклонение невалидных вызовов**: Запретить отправку payload с недостающими обязательными полями (Required Fields).',
      ],
      [
        '- **Pre-Flight Schema Validation**: Validate every tool argument payload against declared JSON Schema / Zod contracts prior to network dispatch.',
        '- **Type Coercion & Normalization**: Automatically normalize scalar string numbers into true numeric types and parse dates into ISO-8601.',
        '- **Required Key Enforcement**: Intercept payloads with omitted non-nullable parameters and repair them in-memory before execution.',
      ]
    ),
  },

  'hierarchical-delegation-supervisor': {
    id: 'hierarchical-delegation-supervisor',
    name: 'HierarchicalDelegationSupervisorSkill',
    displayName: 'Supervisor-Worker Hierarchical Delegation',
    categoryId: 'agentic',
    description: 'Implements an authoritative Supervisor agent that plans, assigns sub-goals to Worker agents, and audits pull requests.',
    tags: ['agentic', 'supervisor', 'delegation', 'hierarchy', 'multi-agent', 'orchestration'],
    transform: createStandardSkillTransform(
      'protocol',
      'Иерархическая Делегация «Супервизор — Воркеры»',
      'Hierarchical Supervisor-Worker Delegation Protocol',
      [
        '- **Разделение полномочий**: Супервизор отвечает за глобальный план и приемку; Воркеры выполняют конкретные технические задачи.',
        '- **Контракт поручения**: Каждое задание для воркера содержит: контекст, допустимые инструменты, критерий готовности и тайм-аут.',
        '- **Приемка результата супервизором**: Супервизор тестирует артефакт воркера перед включением его в главный результат проекта.',
      ],
      [
        '- **Authority Demarcation**: Supervisor agent maintains the global architectural DAG; Worker agents execute localized atomic directives.',
        '- **Delegation Work Order**: Each worker dispatch contract includes: bounded context, allowable tool whitelist, and binary acceptance criteria.',
        '- **Supervisory Audit Gate**: Supervisor tests and verifies worker deliverables against system invariants before merging into the main branch.',
      ]
    ),
  },

  'dry-run-speculative-execution': {
    id: 'dry-run-speculative-execution',
    name: 'DryRunSpeculativeExecutionSkill',
    displayName: 'Dry-Run Sandbox Speculative Execution',
    categoryId: 'agentic',
    description: 'Executes non-destructive dry-run / simulation passes before issuing destructive, state-mutating, or financial operations.',
    tags: ['agentic', 'dry-run', 'sandbox', 'safety', 'speculation', 'mutation'],
    transform: createStandardSkillTransform(
      'protocol',
      'Режим Симуляции и Проверки без Мутаций (Dry-Run)',
      'Dry-Run Sandbox Speculative Execution Protocol',
      [
        '- **Флаг `--dry-run`**: Для любых операций изменения данных (удаление, перезапись, финансовая транзакция) сначала выполнить симуляцию с флагом проверки.',
        '- **Анализ предполагаемого диффа**: Изучить список файлов или записей, которые будут затронуты мутацией.',
        '- **Подтверждение безопасности**: Выполнять реальное изменение только после того, как симуляция завершилась успешно и без непредвиденных побочных эффектов.',
      ],
      [
        '- **Simulation Pass Requirement**: Enforce a mandatory `--dry-run` or sandbox validation pass prior to committing mutating actions (e.g. DELETE, DROP, billing API).',
        '- **Blast Radius Diff Inspection**: Inspect the projected state mutation delta (rows affected, files touched, network payload sent).',
        '- **Commit Clearance Gate**: Dispatch irreversible live mutations only when the simulation pass finishes with zero unexpected side-effects.',
      ]
    ),
  },

  'active-perception-information-gathering': {
    id: 'active-perception-information-gathering',
    name: 'ActivePerceptionInformationGatheringSkill',
    displayName: 'Active Perception & Entropy-Driven Exploration',
    categoryId: 'agentic',
    description: 'Directs diagnostic tool calls strictly toward minimizing the Shannon entropy of the most uncertain system variable.',
    tags: ['agentic', 'active-perception', 'entropy', 'diagnostics', 'exploration', 'information-theory'],
    transform: createStandardSkillTransform(
      'protocol',
      'Активное Восприятие и Снижение Энтропии Неопределенности',
      'Active Perception & Entropy-Driven Exploration Protocol',
      [
        '- **Выявление максимальной неопределенности**: Определить, какой параметр системы наименее понятен, но критичен для успеха.',
        '- **Целевой диагностический вызов**: Вызывать только те инструменты, которые дают максимум информации об этой конкретной неизвестной.',
        '- **Остановка сбора данных**: Немедленно прекратить сбор информации, как только уровень уверенности превысил 95%.',
      ],
      [
        '- **Maximal Uncertainty Identification**: Isolate the specific systemic variable exhibiting highest epistemic entropy / variance.',
        '- **Entropy-Targeted Probing**: Dispatch diagnostic queries engineered strictly to maximize information gain regarding that critical unknown.',
        '- **Exploration Halt Horizon**: Terminate data-gathering calls instantly once confidence reaches the 95% threshold, pivoting directly to execution.',
      ]
    ),
  },

  'unrecoverable-loop-circuit-breaker': {
    id: 'unrecoverable-loop-circuit-breaker',
    name: 'UnrecoverableLoopCircuitBreakerSkill',
    displayName: 'Loop Detection & Cyclical Action Breaker',
    categoryId: 'agentic',
    description: 'Detects repetitive thought/action cycles (e.g. repeated failure on same arguments) and trips a hard circuit breaker.',
    tags: ['agentic', 'loop-breaker', 'circuit-breaker', 'anti-stuck', 'cycle-detection'],
    transform: createStandardSkillTransform(
      'constraints',
      'Защита от Зацикливания (Loop Circuit Breaker)',
      'Action Loop Detection & Circuit Breaker Protocol',
      [
        '- **Детекция циклов**: Если агент вызывает один и тот же инструмент с идентичными аргументами 2 раза подряд с одинаковым результатом — объявить обнаружение цикла.',
        '- **Аварийный разрыв (Trip Circuit)**: Запретить повторный вызов зацикленного инструмента; принудительно сменить стратегию или обратиться к человеку.',
        '- **Смена эвристики**: Попробовать альтернативный путь решения или переформулировать запрос.',
      ],
      [
        '- **Repetitive Action Cycle Detection**: Intercept agent trajectories executing identical tool/argument payloads ≥2 times without state delta.',
        '- **Circuit Breaker Trip**: Hard-block re-dispatch of the cycling tool; force an instantaneous paradigm shift or trigger human escalation.',
        '- **Heuristic Diversification**: Mandate alternative exploratory trajectories rather than perseverating on failed endpoints.',
      ]
    ),
  },

  'agent-persona-role-specialization': {
    id: 'agent-persona-role-specialization',
    name: 'AgentPersonaRoleSpecializationSkill',
    displayName: 'Agent Role Boundary & Mandate Enforcement',
    categoryId: 'agentic',
    description: 'Enforces strict organizational role boundaries between agents (e.g. Auditor never writes code, Coder never modifies specs).',
    tags: ['agentic', 'roles', 'boundaries', 'specialization', 'collaboration'],
    transform: createStandardSkillTransform(
      'role',
      'Специализация Ролей и Разделение Обязанностей Агента',
      'Agent Persona Role Specialization & Boundary Protocol',
      [
        '- **Четкие границы мандата**: Агент выполняет строго предписанную роль (напр., Архитектор, Ревьюер, QA-инженер, Security-аудитор).',
        '- **Запрет выхода за рамки роли**: Агент-аудитор не пишет производственный код; Агент-разработчик не может сам утверждать свои PR.',
        '- **Профессиональный язык роли**: Использовать специализированный вокабуляр и ментальные модели, соответствующие назначенной позиции.',
      ],
      [
        '- **Strict Mandate Boundaries**: Constrain agent operations to its precise mandate (e.g. Security Auditor, System Architect, Test Engineer).',
        '- **No Role Contamination**: Auditor agents are forbidden from mutating application code; developer agents cannot self-approve pull requests.',
        '- **Domain Nomenclature Alignment**: Enforce deep alignment with the vocabulary, risk models, and review standards of the assigned persona.',
      ]
    ),
  },

  'asynchronous-event-queue-handler': {
    id: 'asynchronous-event-queue-handler',
    name: 'AsynchronousEventQueueHandlerSkill',
    displayName: 'Asynchronous Event Queue & Webhook Ingestion',
    categoryId: 'agentic',
    description: 'Manages non-blocking asynchronous event intake, prioritizing high-urgency interruptions while preserving state continuity.',
    tags: ['agentic', 'async', 'events', 'webhooks', 'queues', 'concurrency'],
    transform: createStandardSkillTransform(
      'protocol',
      'Асинхронная Очередь Событий и Обработка Прерываний',
      'Asynchronous Event Queue & Webhook Ingestion Protocol',
      [
        '- **Очередь событий с приоритетом**: Сортировать входящие внешние сигналы (вебхуки, алерты, сообщения) по приоритету (Critical / Normal / Low).',
        '- **Корректная обработка прерываний**: При поступлении критического события сохранить текущее состояние задачи, обработать инцидент и вернуться к прерванной работе.',
        '- **Защита от потери сообщений**: Использовать семантику «At-Least-Once» с подтверждением обработки (Ack/Nack).',
      ],
      [
        '- **Priority-Ranked Event Queue**: Ingest and categorize external signals (webhooks, alerts, human inputs) across Critical, Operational, and Background queues.',
        '- **Preemptive Interruption Handling**: On Critical alert arrival, snapshot current working scratchpad, remediate the alert, and resume original state.',
        '- **At-Least-Once Delivery Guarantees**: Enforce explicit acknowledgment (ACK/NACK) protocols ensuring zero event loss during async turns.',
      ]
    ),
  },

  'dynamic-few-shot-exemplar-selection': {
    id: 'dynamic-few-shot-exemplar-selection',
    name: 'DynamicFewShotExemplarSelectionSkill',
    displayName: 'Dynamic Few-Shot Trajectory Retrieval',
    categoryId: 'agentic',
    description: 'Retrieves past high-scoring tool trajectories semantically matching the current task to guide autonomous generation.',
    tags: ['agentic', 'few-shot', 'trajectories', 'exemplars', 'in-context-learning'],
    transform: createStandardSkillTransform(
      'context',
      'Динамический Подбор Успешных Примеров Траекторий (Few-Shot)',
      'Dynamic Few-Shot Trajectory Retrieval Protocol',
      [
        '- **Семантический поиск примеров**: Найти в библиотеке 2 эталонных примера решения схожих задач с успешными цепочками вызовов инструментов.',
        '- **Демонстрация формата успеха**: Использовать примеры для калибровки формата аргументов и логики рассуждений агента.',
        '- **Исключение нерелевантного шума**: Включать в промпт только компактные, релевантные шаги без длинных лишних данных.',
      ],
      [
        '- **Vector Trajectory Retrieval**: Retrieve 2 gold-standard operational trajectories solving topologically similar tool-use challenges.',
        '- **Exemplar Trajectory Injection**: Format selected exemplars to calibrate proper JSON syntax, error recovery, and intermediate deductions.',
        '- **Minimal Exemplar Footprint**: Trim exemplar context to essential thought/action/observation tokens to avoid crowding available attention.',
      ]
    ),
  },

  'dual-system-fast-slow-arbiter': {
    id: 'dual-system-fast-slow-arbiter',
    name: 'DualSystemFastSlowArbiterSkill',
    displayName: 'Dual-Process (System 1 vs System 2) Arbiter',
    categoryId: 'agentic',
    description: 'Routes routine queries through fast direct heuristic answers (System 1) while reserving multi-turn agentic loops for high-complexity problems (System 2).',
    tags: ['agentic', 'system-1-system-2', 'routing', 'efficiency', 'arbiter', 'cognitive-load'],
    transform: createStandardSkillTransform(
      'protocol',
      'Двухсистемный Арбитр Сложности (Система 1 против Системы 2)',
      'Dual-Process (System 1 vs System 2) Routing Protocol',
      [
        '- **Классификация сложности запроса**: На входе оценить сложность задачи: простая фактологическая (Система 1) или многошаговая инженерная (Система 2).',
        '- **Быстрый ответ (Система 1)**: Простые задачи решать мгновенно за один шаг без запуска тяжелых циклов и вызова сторонних инструментов.',
        '- **Глубокий автономный контур (Система 2)**: Включать многошаговый протокол ReAct только для задач с неопределенностью, сложным графом зависимостей и рисками.',
      ],
      [
        '- **Cognitive Complexity Triage**: Triage incoming prompt complexity into System 1 (direct retrieval / low ambiguity) vs. System 2 (multi-step planning).',
        '- **System 1 Fast-Path**: Resolve straightforward lookups and format conversions in a single atomic turn without initiating tool loops.',
        '- **System 2 Heavyweight Orchestration**: Reserve iterative ReAct planning and multi-agent coordination strictly for high-uncertainty engineering directives.',
      ]
    ),
  },
};
