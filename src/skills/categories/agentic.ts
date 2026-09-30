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

  "multi-agent-blackboard-pattern": {
    id: "multi-agent-blackboard-pattern",
    name: "MultiAgentBlackboardPatternSkill",
    displayName: "Multi-Agent Blackboard Shared Memory Pattern",
    categoryId: "agentic",
    description: "Coordinates specialized sub-agents via a central shared blackboard workspace with event-driven change notifications.",
    tags: ["agentic","blackboard-pattern","multi-agent","orchestration","shared-memory"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Agent Blackboard Architecture",
      ruSectionName: "Мультиагентный паттерн общей доски (Blackboard Pattern)",
      instructions: [
        "Establish a centralized, structured Blackboard state repository accessible to all specialized worker agents.",
        "Allow domain-specialist agents (e.g. Coder, Tester, Security Auditor) to inspect current blackboard state and publish incremental solutions.",
        "Implement an arbitrator controller monitoring state changes and dynamically activating the most relevant specialist.",
        "Maintain an immutable append-only event log recording which agent produced each hypothesis or modification.",
      ],
      ruInstructions: [
        "Создайте централизованное структурированное хранилище состояния (доску), доступное специализированным агентам.",
        "Разрешите профильным агентам (программист, тестировщик, аудитор) читать состояние доски и публиковать решения.",
        "Внедрите контроллер-арбитр, анализирующий обновления и активирующий наиболее подходящего агента.",
        "Ведите неизменяемый журнал событий с фиксацией авторства каждой гипотезы или правки.",
      ],
      semanticType: "structural_directive",
      tags: ["agentic","blackboard-pattern","multi-agent","orchestration","shared-memory"],
    }),
  },

  "self-healing-tool-output-repair": {
    id: "self-healing-tool-output-repair",
    name: "SelfHealingToolOutputRepairSkill",
    displayName: "Tool Output Schema Validation & Self-Healing Repair",
    categoryId: "agentic",
    description: "Validates tool outputs against Zod/JSON schemas; on validation failure, injects targeted diagnostic hints for self-repair.",
    tags: ["agentic","self-healing","schema-validation","tool-use","error-recovery"],
    transform: createStandardSkillTransform({
      sectionName: "Tool Output Validation & Self-Healing Protocol",
      ruSectionName: "Валидация вывода инструментов и самовосстановление (Self-Healing)",
      instructions: [
        "Parse and validate raw tool execution responses against strict schema definitions (e.g. Zod or JSON Schema).",
        "When schema validation fails, capture the exact path and error message (e.g. \"missing property `status` at root\").",
        "Feed the schema error directly back into the agent context with a targeted repair instruction rather than aborting execution.",
        "Limit self-repair retries to a maximum of 3 attempts before escalating to fallback degradation.",
      ],
      ruInstructions: [
        "Валидируйте сырые ответы вызванных инструментов по строгим схемам (Zod или JSON Schema).",
        "При ошибке схемы фиксируйте точный путь и причину (например, «отсутствует обязательное поле status»).",
        "Передавайте текст ошибки обратно в контекст агента с инструкцией исправления формата вместо аварийной остановки.",
        "Ограничивайте число попыток самовосстановления тремя итерациями перед переходом к запасному сценарию.",
      ],
      semanticType: "process_directive",
      tags: ["agentic","self-healing","schema-validation","tool-use","error-recovery"],
    }),
  },

  "dynamic-token-budget-governor": {
    id: "dynamic-token-budget-governor",
    name: "DynamicTokenBudgetGovernorSkill",
    displayName: "Dynamic Token Budget Governor & Cost Guard",
    categoryId: "agentic",
    description: "Tracks accumulated prompt and completion tokens across agent turns, enforcing hard financial limits and context pruning.",
    tags: ["agentic","token-budget","cost-control","finops","context-pruning"],
    transform: createStandardSkillTransform({
      sectionName: "Dynamic Token Budget & Cost Governor",
      ruSectionName: "Динамический регулятор токенов и контроль затрат агента",
      instructions: [
        "Maintain running totals of input tokens, output tokens, and calculated dollar expenditure across the complete trajectory.",
        "Enforce soft budget threshold (70%): automatically compress long conversation turns and summarize intermediate tool payloads.",
        "Enforce hard budget threshold (100%): gracefully finalize the current deliverable and return the best partial synthesis without spawning new tool calls.",
      ],
      ruInstructions: [
        "Ведите непрерывный подсчет потраченных токенов на вход и выход с калькуляцией стоимости в реальном времени.",
        "При достижении мягкого лимита (70%): автоматически сжимайте прошлые шаги и суммаризируйте ответы инструментов.",
        "При достижении жесткого лимита (100%): завершайте работу, выдавая наилучший синтез результатов без новых запросов к API.",
      ],
      semanticType: "guardrail_directive",
      tags: ["agentic","token-budget","cost-control","finops","context-pruning"],
    }),
  },

  "human-in-the-loop-diff-approval": {
    id: "human-in-the-loop-diff-approval",
    name: "HumanInTheLoopDiffApprovalSkill",
    displayName: "Human-in-the-Loop Explicit Diff Approval Gate",
    categoryId: "agentic",
    description: "Halts autonomous agent execution prior to high-stakes destructive mutations, generating a clean unified diff for human confirmation.",
    tags: ["agentic","human-in-the-loop","approval-gate","safety","diff"],
    transform: createStandardSkillTransform({
      sectionName: "Human-in-the-Loop Diff Approval Gate",
      ruSectionName: "Шлюз подтверждения человеком с отображением дифа (Human-in-the-Loop)",
      instructions: [
        "Identify critical state mutations: file deletions, database writes, external network calls, or production deployments.",
        "Suspend execution immediately prior to invoking the destructive mutation.",
        "Format a concise unified diff showing exact deletions (-) and additions (+), estimated financial cost, and blast radius.",
        "Resume execution only upon receiving explicit, authenticated human approval.",
      ],
      ruInstructions: [
        "Определяйте критические операции: удаление файлов, запись в прод-БД, внешние платежи или деплой.",
        "Приостанавливайте работу агента непосредственно перед выполнением необратимого действия.",
        "Формируйте наглядный diff с отображением удаляемых (-) и добавляемых (+) строк, стоимости и рисков.",
        "Возобновляйте выполнение только после получения явного подтверждения от авторизованного оператора.",
      ],
      semanticType: "guardrail_directive",
      tags: ["agentic","human-in-the-loop","approval-gate","safety","diff"],
    }),
  },

  "hierarchical-task-network-htn-planner": {
    id: "hierarchical-task-network-htn-planner",
    name: "HierarchicalTaskNetworkHtnPlannerSkill",
    displayName: "Hierarchical Task Network (HTN) Recursive Decomposition",
    categoryId: "agentic",
    description: "Decomposes compound goals into progressively refined sub-tasks until primitive, tool-executable action nodes are reached.",
    tags: ["agentic","htn","planning","task-decomposition","orchestration"],
    transform: createStandardSkillTransform({
      sectionName: "HTN Hierarchical Task Decomposition Protocol",
      ruSectionName: "Иерархическая декомпозиция задач (HTN Planning)",
      instructions: [
        "Represent the overarching objective as a Compound Root Task.",
        "Select applicable decomposition methods based on current world state preconditions to break compound tasks into sub-tasks.",
        "Recurse until every leaf node in the task tree is an executable Primitive Task bound to a specific tool API.",
        "Execute primitive tasks sequentially, updating world state preconditions before triggering subsequent branches.",
      ],
      ruInstructions: [
        "Представьте главную цель как составную задачу верхнего уровня.",
        "Подберите методы декомпозиции с учетом текущих условий среды, разбив задачу на подзадачи.",
        "Повторяйте декомпозицию до тех пор, пока все листовые узлы дерева не станут примитивными действиями инструментов.",
        "Выполняйте примитивные действия, обновляя состояние среды перед переходом к следующим веткам.",
      ],
      semanticType: "process_directive",
      tags: ["agentic","htn","planning","task-decomposition","orchestration"],
    }),
  },

  "agentic-memory-consolidation-rag": {
    id: "agentic-memory-consolidation-rag",
    name: "AgenticMemoryConsolidationRagSkill",
    displayName: "Episodic Memory Consolidation & Semantic Retrieval",
    categoryId: "agentic",
    description: "Consolidates short-term session interactions into long-term episodic memories via embeddings and semantic cosine similarity search.",
    tags: ["agentic","memory","rag","embeddings","long-term-memory"],
    transform: createStandardSkillTransform({
      sectionName: "Episodic Memory Consolidation & RAG Architecture",
      ruSectionName: "Консолидация эпизодической памяти и семантический поиск (RAG)",
      instructions: [
        "Extract high-signal facts, user preferences, and operational lessons from completed session turns.",
        "Generate vector embeddings for extracted episodic memories and store in a persistent semantic vector store.",
        "Prior to answering novel queries, perform top-k cosine similarity search to retrieve relevant historical lessons.",
        "Inject retrieved episodic context into the agent prompt with relevance confidence scores.",
      ],
      ruInstructions: [
        "Извлекайте ключевые факты, предпочтения пользователя и уроки из завершенных диалоговых сессий.",
        "Генерируйте векторные эмбеддинги для сохраненных воспоминаний и записывайте их в векторную базу.",
        "Перед выполнением нового запроса делайте поиск k ближайших релевантных воспоминаний по косинусному сходству.",
        "Внедряйте извлеченный контекст в системный промпт с указанием степени уверенности.",
      ],
      semanticType: "process_directive",
      tags: ["agentic","memory","rag","embeddings","long-term-memory"],
    }),
  },

  "idempotent-tool-call-caching": {
    id: "idempotent-tool-call-caching",
    name: "IdempotentToolCallCachingSkill",
    displayName: "Idempotent Tool Call Caching & Deduplication",
    categoryId: "agentic",
    description: "Computes cryptographic hashes of tool names and arguments, serving identical read-only requests from an in-memory cache.",
    tags: ["agentic","idempotency","caching","tool-use","performance"],
    transform: createStandardSkillTransform({
      sectionName: "Tool Call Deduplication & Idempotency Protocol",
      ruSectionName: "Идемпотентное кэширование и дедупликация вызовов инструментов",
      instructions: [
        "Compute SHA-256 digest hash of tool name and canonicalized JSON argument payload.",
        "For read-only idempotent tools (e.g. `read_file`, `web_search`), check the session cache prior to executing external network calls.",
        "Return cached result immediately on cache hit, saving token latency and downstream API costs.",
        "Invalidate cached entries whenever a state-mutating tool (e.g. `write_file`, `delete_file`) modifies the underlying entity.",
      ],
      ruInstructions: [
        "Вычисляйте SHA-256 хэш от имени инструмента и нормализованного JSON-пейлоада его аргументов.",
        "Для безопасных read-only инструментов проверяйте кэш перед отправкой повторного сетевого вызова.",
        "Мгновенно возвращайте результат из кэша при совпадении, экономя время и квоты API.",
        "Сбрасывайте кэш, как только мутирующий инструмент (`edit_file`, `create_file`) изменяет состояние системы.",
      ],
      semanticType: "process_directive",
      tags: ["agentic","idempotency","caching","tool-use","performance"],
    }),
  },

  "plan-repair-dynamic-replanning": {
    id: "plan-repair-dynamic-replanning",
    name: "PlanRepairDynamicReplanningSkill",
    displayName: "Dynamic Plan Repair & Runtime Replanning",
    categoryId: "agentic",
    description: "Monitors execution preconditions; when environment divergence occurs, repairs remaining plan steps without full restart.",
    tags: ["agentic","replanning","plan-repair","adaptability","resilience"],
    transform: createStandardSkillTransform({
      sectionName: "Runtime Plan Repair & Replanning Protocol",
      ruSectionName: "Динамическая починка плана и перепланирование на лету",
      instructions: [
        "Verify that expected preconditions hold before dispatching each scheduled plan step.",
        "When an action fails or returns unexpected environmental state, immediately halt the linear plan sequence.",
        "Execute localized plan repair: retain completed valid milestones and rewrite only the broken and subsequent sub-steps.",
        "Verify that the repaired sub-plan still converges on the terminal goal before resuming execution.",
      ],
      ruInstructions: [
        "Проверяйте соблюдение предусловий перед запуском каждого очередного шага плана.",
        "При сбое действия или получении неожиданного состояния среды останавливайте линейное выполнение.",
        "Выполняйте локальный ремонт плана: сохраняйте уже пройденные шаги и переписывайте только сломавшуюся ветку.",
        "Убедитесь, что скорректированный план гарантированно ведет к исходной цели, и продолжайте работу.",
      ],
      semanticType: "process_directive",
      tags: ["agentic","replanning","plan-repair","adaptability","resilience"],
    }),
  },

  "async-parallel-subagent-fanout": {
    id: "async-parallel-subagent-fanout",
    name: "AsyncParallelSubagentFanoutSkill",
    displayName: "Asynchronous Sub-Agent Fan-Out & Map-Reduce Fan-In",
    categoryId: "agentic",
    description: "Dispatches multiple parallel sub-agents across decomposed sub-problems and reconciles their outputs via structured map-reduce.",
    tags: ["agentic","parallel-agents","fan-out","fan-in","map-reduce"],
    transform: createStandardSkillTransform({
      sectionName: "Sub-Agent Fan-Out & Aggregation Protocol",
      ruSectionName: "Асинхронный запуск субагентов (Fan-Out) и сборка результатов (Fan-In)",
      instructions: [
        "Identify independent sub-problems that can be solved concurrently without shared state dependencies.",
        "Spawn isolated sub-agent tasks with localized context envelopes and targeted prompt mandates (Fan-Out).",
        "Collect sub-agent results asynchronously using a completion barrier timeout.",
        "Execute a synthesis reducer step (Fan-In) resolving conflicts and integrating outputs into a unified master deliverable.",
      ],
      ruInstructions: [
        "Выделяйте независимые подзадачи, которые могут выполняться параллельно без общих блокировок.",
        "Запускайте изолированных субагентов с компактным контекстом под каждую подзадачу (Fan-Out).",
        "Ожидайте завершения работы всех субагентов с контролем общего тайм-аута.",
        "Выполняйте финальную сборку (Fan-In), устраняя противоречия и формируя целостный итоговый результат.",
      ],
      semanticType: "structural_directive",
      tags: ["agentic","parallel-agents","fan-out","fan-in","map-reduce"],
    }),
  },

  "supervisor-critic-adversarial-gate": {
    id: "supervisor-critic-adversarial-gate",
    name: "SupervisorCriticAdversarialGateSkill",
    displayName: "Supervisor-Critic Adversarial Verification Gate",
    categoryId: "agentic",
    description: "Employs a dedicated Critic agent that aggressively stress-tests the Worker agent's output against security, edge-case, and SLA criteria.",
    tags: ["agentic","supervisor-critic","adversarial","verification","quality-gate"],
    transform: createStandardSkillTransform({
      sectionName: "Supervisor-Critic Verification Architecture",
      ruSectionName: "Архитектура «Исполнитель-Критик» (Supervisor-Critic Gate)",
      instructions: [
        "Separate Worker generation from Critic verification into distinct agent roles with independent prompts.",
        "Empower the Critic agent with strict rejection criteria: security vulnerabilities, edge-case negligence, and non-compliance.",
        "Require the Worker agent to address all specific rejection points before deliverable publication.",
        "Limit adversarial critique loops to maximum 2 rounds to prevent endless pedantic debates.",
      ],
      ruInstructions: [
        "Разделяйте генерацию решения и его проверку между двумя разными агентами (Исполнитель и Критик).",
        "Наделяйте Критика правом вето по критериям безопасности, граничных случаев и соответствия ТЗ.",
        "Обязывайте Исполнителя устранить замечания Критика перед финальной публикацией результата.",
        "Ограничивайте цикл критики максимум двумя раундами во избежание бесконечных споров.",
      ],
      semanticType: "process_directive",
      tags: ["agentic","supervisor-critic","adversarial","verification","quality-gate"],
    }),
  },

  "contract-based-pre-post-conditions": {
    id: "contract-based-pre-post-conditions",
    name: "ContractBasedPrePostConditionsSkill",
    displayName: "Design-by-Contract Tool Pre- and Post-Conditions",
    categoryId: "agentic",
    description: "Surrounds all agent tool calls with Meyer's Design-by-Contract assertions: verified preconditions before call, postconditions after.",
    tags: ["agentic","design-by-contract","preconditions","postconditions","formal-methods"],
    transform: createStandardSkillTransform({
      sectionName: "Design-by-Contract Tool Execution Protocol",
      ruSectionName: "Контрактное выполнение инструментов (Design-by-Contract)",
      instructions: [
        "Precondition Check: Verify environmental invariants (e.g. file exists, credentials valid) before dispatching the tool call.",
        "Abort immediately if preconditions fail, outputting a clear explanation of the missing prerequisite.",
        "Postcondition Check: Verify that the tool execution achieved its promised state change (e.g. file size > 0, HTTP status 200).",
        "Roll back or report defect if postconditions are violated despite a \"success\" exit code.",
      ],
      ruInstructions: [
        "Проверка предусловий: Убедитесь в готовности среды (файл существует, права доступа есть) до отправки запроса инструменту.",
        "Немедленно отменяйте вызов при несоблюдении предусловий с фиксацией отсутствующего требования.",
        "Проверка постусловий: Убедитесь, что инструмент реально перевел систему в целевое состояние (файл создан, статус 200).",
        "Инициируйте откат, если инструмент вернул код успеха, но постусловие фактически нарушено.",
      ],
      semanticType: "constraints",
      tags: ["agentic","design-by-contract","preconditions","postconditions","formal-methods"],
    }),
  },

  "openinference-agent-tracing-spans": {
    id: "openinference-agent-tracing-spans",
    name: "OpenInferenceAgentTracingSpansSkill",
    displayName: "OpenInference Agent Telemetry & Span Tracing",
    categoryId: "agentic",
    description: "Structures agent workflows into standardized OpenInference spans: Agent, Chain, Tool, and LLM semantic telemetry conventions.",
    tags: ["agentic","openinference","telemetry","tracing","observability"],
    transform: createStandardSkillTransform({
      sectionName: "OpenInference Telemetry & Span Architecture",
      ruSectionName: "Телеметрия агента по стандарту OpenInference (Spans & Traces)",
      instructions: [
        "Emit structured span records adhering to OpenInference semantic conventions: SpanKind (AGENT, CHAIN, TOOL, LLM).",
        "Record input parameters, output payloads, token counts, and latency duration for every nested execution span.",
        "Propagate trace ID and parent span ID across all asynchronous sub-agent invocations.",
        "Record exception event logs with full stack traces whenever an execution span terminates abnormally.",
      ],
      ruInstructions: [
        "Формируйте записи спанов по стандартам OpenInference с указанием типа: AGENT, CHAIN, TOOL, LLM.",
        "Фиксируйте входные данные, результат, расход токенов и задержку для каждого вложенного вызова.",
        "Пробрасывайте сквозной Trace ID и Parent Span ID через все вызовы асинхронных субагентов.",
        "Логируйте события ошибок с полным контекстом при аварийном завершении любого спана.",
      ],
      semanticType: "structural_directive",
      tags: ["agentic","openinference","telemetry","tracing","observability"],
    }),
  },

  "goal-drift-semantic-anchor-guard": {
    id: "goal-drift-semantic-anchor-guard",
    name: "GoalDriftSemanticAnchorGuardSkill",
    displayName: "Goal Drift & Semantic Alignment Anchor Guard",
    categoryId: "agentic",
    description: "Computes cosine semantic similarity between current execution steps and the initial user goal, aborting if drift exceeds threshold.",
    tags: ["agentic","goal-drift","alignment","guardrails","cosine-similarity"],
    transform: createStandardSkillTransform({
      sectionName: "Goal Drift Detection & Alignment Anchor Protocol",
      ruSectionName: "Защита от смещения цели (Goal Drift) и семантический якорь",
      instructions: [
        "Maintain an immutable representation of the primary user goal anchored at the top of working context.",
        "Evaluate current sub-task trajectory every 3 steps: verify that active operations directly contribute to the original mandate.",
        "Detect semantic drift: flag when the agent begins pursuing tangential rabbit holes or solving invented side-problems.",
        "Force an immediate course correction back to the primary objective if semantic alignment drops below 80%.",
      ],
      ruInstructions: [
        "Закрепляйте неизменяемый текст первоначальной цели пользователя в начале рабочего контекста.",
        "Каждые 3 шага сопоставляйте текущие действия с исходной задачей: ведут ли они к прямому результату.",
        "Выявляйте смещение фокуса: пресекайте увлечение агента второстепенными деталями и решением надуманных проблем.",
        "Принудительно возвращайте траекторию к главной цели при падении смысловой связи ниже 80%.",
      ],
      semanticType: "guardrail_directive",
      tags: ["agentic","goal-drift","alignment","guardrails","cosine-similarity"],
    }),
  },

  "agentic-loop-stuck-circuit-breaker": {
    id: "agentic-loop-stuck-circuit-breaker",
    name: "AgenticLoopStuckCircuitBreakerSkill",
    displayName: "Anti-Thrashing Action Loop Circuit Breaker",
    categoryId: "agentic",
    description: "Detects repetitive alternating tool sequences (e.g. edit -> test fail -> revert -> test fail) and trips a hard circuit breaker.",
    tags: ["agentic","anti-thrashing","circuit-breaker","loop-breaker","stability"],
    transform: createStandardSkillTransform({
      sectionName: "Anti-Thrashing Loop Circuit Breaker Protocol",
      ruSectionName: "Размыкатель зацикливаний и метаний агента (Anti-Thrashing Breaker)",
      instructions: [
        "Maintain a circular rolling window of the last 6 tool invocation signatures.",
        "Detect oscillating thrash cycles: alternating patterns such as Action A -> Action B -> Action A -> Action B.",
        "Trip the circuit breaker immediately upon identifying repetitive cyclical thrashing.",
        "Force a radical heuristic shift: summarize the impasse, formulate an orthogonal strategy, or request human clarification.",
      ],
      ruInstructions: [
        "Ведите скользящее окно последних 6 вызовов инструментов с их аргументами.",
        "Распознавайте осцилляции и метания: повторяющиеся цепочки вида Действие А -> Действие Б -> Действие А -> Действие Б.",
        "Размыкайте цепь (trip circuit) при первом обнаружении устойчивого циклического повторения.",
        "Принудительно меняйте подход: зафиксируйте тупик, выберите принципиально иную стратегию или запросите совет человека.",
      ],
      semanticType: "guardrail_directive",
      tags: ["agentic","anti-thrashing","circuit-breaker","loop-breaker","stability"],
    }),
  },
  "temporal-discounting-agent-planner": {
    id: "temporal-discounting-agent-planner",
    name: "TemporalDiscountingAgentPlannerSkill",
    displayName: "Temporal Horizon & Discounted Value Planning",
    categoryId: "agentic",
    description: "Prioritizes agent actions by discounting future rewards over execution steps, preventing long-horizon rabbit holes.",
    tags: ["agentic","planning","temporal-discounting","horizon","priority"],
    transform: createStandardSkillTransform({
      sectionName: "Temporal Horizon & Action Valuation Protocol",
      ruSectionName: "Протокол временного горизонта и дисконтирования ценности шагов",
      instructions: [
        "Assign an immediate utility score to each candidate sub-action based on distance to the end goal.",
        "Discount downstream anticipated rewards by step factor: favor high-confidence short-term gains over speculative 10-step plans.",
        "Enforce an execution horizon limit: prune subtrees requiring excessive speculative actions without intermediate verification.",
        "Emit a step valuation log detailing why the selected action provides the highest expected immediate progress."
],
      ruInstructions: [
        "Присваивайте каждому шагу оценку полезности с учетом дистанции до конечной цели.",
        "Дисконтируйте ценность далеких шагов: отдавайте предпочтение надежным промежуточным результатам перед спекулятивными планами на 10 шагов.",
        "Устанавливайте жесткий горизонт планирования: отсекайте ветви, требующие длинных гипотетических цепочек без промежуточной валидации.",
        "Фиксируйте краткое обоснование выбора конкретного действия как дающего наибольший проверенный прогресс."
],
      semanticType: "process_directive",
      tags: ["agentic","planning","temporal-discounting","horizon","priority"],
    }),
  },

  "multi-agent-debate-consensus": {
    id: "multi-agent-debate-consensus",
    name: "MultiAgentDebateConsensusSkill",
    displayName: "Multi-Agent Debate & Adversarial Consensus",
    categoryId: "agentic",
    description: "Coordinates multi-agent adversarial debate rounds to arrive at hardened, peer-reviewed conclusions.",
    tags: ["agentic","multi-agent","debate","consensus","adversarial"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Agent Adversarial Debate & Consensus Protocol",
      ruSectionName: "Протокол мультиагентных дебатов и достижения консенсуса",
      instructions: [
        "Formulate independent agent viewpoints (Proposer, Adversarial Skeptic, Synthesis Judge) on controversial decisions.",
        "Conduct structured debate rounds: each round requires explicit rebuttal of cited counter-arguments.",
        "Disallow consensus until all fatal vulnerabilities raised by the Skeptic are provably mitigated.",
        "Synthesize the final verdict with explicit vote tally, convergence criteria, and remaining residual risks."
],
      ruInstructions: [
        "Формируйте три независимые агентные роли: Автор гипотезы, Критический оппонент и Арбитр синтеза.",
        "Проводите структурированные раунды дебатов с обязательным ответом на каждый контраргумент оппонента.",
        "Запрещайте принятие решения до тех пор, пока все фатальные риски оппонента не будут аргументированно сняты.",
        "Фиксируйте финальный вердикт с указанием критериев сходимости и оставшихся неустранимых рисков."
],
      semanticType: "protocol",
      tags: ["agentic","multi-agent","debate","consensus","adversarial"],
    }),
  },

  "agentic-backtracking-mcts": {
    id: "agentic-backtracking-mcts",
    name: "AgenticBacktrackingMctsSkill",
    displayName: "MCTS Tree Search with State Backtracking",
    categoryId: "agentic",
    description: "Implements Monte Carlo Tree Search exploration over agent decision states with explicit savepoints and backtracking.",
    tags: ["agentic","mcts","backtracking","tree-search","state-management"],
    transform: createStandardSkillTransform({
      sectionName: "MCTS State Exploration & Rollback Protocol",
      ruSectionName: "Протокол древовидного поиска (MCTS) с откатом состояний",
      instructions: [
        "Serialize system state before executing non-idempotent or branching tool invocations as named checkpoints.",
        "Score branch states: if an action path encounters a dead-end or score drops below threshold, trigger immediate rollback.",
        "Maintain an explicit explored-nodes registry to prevent re-traversing unpromising failure trajectories.",
        "Select the path that maximizes Upper Confidence Bound (UCB1) balancing proven utility and exploratory novelty."
],
      ruInstructions: [
        "Сериализуйте контекст и состояние системы перед ветвящимися или необратимыми действиями в именованные чекпоинты.",
        "Оценивайте состояние ветвей: при обнаружении тупика или падении метрики прогресса делайте немедленный откат к развилке.",
        "Ведите реестр посещенных узлов для предотвращения повторного исследования заведомо тупиковых траекторий.",
        "Выбирайте следующий шаг по критерию UCB1, балансируя между проверенной пользой и исследовательской новизной."
],
      semanticType: "process_directive",
      tags: ["agentic","mcts","backtracking","tree-search","state-management"],
    }),
  },

  "sandboxed-code-interpreter-env": {
    id: "sandboxed-code-interpreter-env",
    name: "SandboxedCodeInterpreterEnvSkill",
    displayName: "Sandboxed REPL Execution & Output Scrubbing",
    categoryId: "agentic",
    description: "Executes generated scripts in a sandboxed REPL environment with timeout enforcement and output scrubbing.",
    tags: ["agentic","repl","sandbox","code-execution","isolation"],
    transform: createStandardSkillTransform({
      sectionName: "Sandboxed Code Execution & Isolation Protocol",
      ruSectionName: "Протокол изолированного выполнения кода (Sandbox REPL)",
      instructions: [
        "Enclose all dynamic execution within isolated sandbox boundaries with strict wall-clock and memory limits.",
        "Sanitize script outputs: strip ANSI control codes, memory dumps, stack overflow traces, and sensitive internal paths.",
        "Handle runtime errors gracefully: capture stderr and format a standardized execution diagnosis frame.",
        "Enforce idempotent side-effects: ensure scratch files and temporary bindings are completely purged upon termination."
],
      ruInstructions: [
        "Изолируйте динамическое исполнение в ограниченной песочнице с лимитами по памяти и времени исполнения.",
        "Очищайте вывод скрипта: удаляйте ANSI-последовательности, дампы памяти, внутренние пути и чувствительные токены.",
        "Обрабатывайте ошибки рантайма: перехватывайте stderr и формируйте стандартизированный диагностический отчет.",
        "Обеспечивайте идемпотентность: гарантируйте полное удаление временных файлов и переменных окружения после завершения."
],
      semanticType: "protocol",
      tags: ["agentic","repl","sandbox","code-execution","isolation"],
    }),
  },

  "schema-constrained-tool-dispatcher": {
    id: "schema-constrained-tool-dispatcher",
    name: "SchemaConstrainedToolDispatcherSkill",
    displayName: "Schema-Constrained Tool Dispatcher & Validator",
    categoryId: "agentic",
    description: "Validates tool invocation payloads against strict JSON schemas before dispatch, auto-correcting type coercions.",
    tags: ["agentic","tool-use","json-schema","validation","dispatcher"],
    transform: createStandardSkillTransform({
      sectionName: "Schema-Constrained Tool Dispatch Protocol",
      ruSectionName: "Протокол строгой валидации схемы вызова инструментов",
      instructions: [
        "Validate tool argument payloads against strict JSON Schema contracts before executing the underlying function.",
        "Auto-coerce minor primitive type mismatches (e.g., stringified numbers) only when semantics are unambiguously preserved.",
        "Reject malformed payloads immediately with structured schema violation errors highlighting the exact missing field or type breach.",
        "Never send unvalidated speculative payloads to external interfaces."
],
      ruInstructions: [
        "Валидируйте аргументы инструментов по строгой JSON-схеме до момента их фактической отправки.",
        "Выполняйте безопасное приведение базовых типов (например, числа в строке) только при полной однозначности смысла.",
        "Мгновенно отклоняйте некорректные вызовы с точным указанием нарушенного поля и ожидаемого типа.",
        "Никогда не направляйте сырые невалидированные структуры во внешние API или функции."
],
      semanticType: "guardrail_directive",
      tags: ["agentic","tool-use","json-schema","validation","dispatcher"],
    }),
  },

  "agent-intent-confirmation-checkpoint": {
    id: "agent-intent-confirmation-checkpoint",
    name: "AgentIntentConfirmationCheckpointSkill",
    displayName: "Destructive Action Confirmation & Pre-flight Audit",
    categoryId: "agentic",
    description: "Establishes mandatory pre-flight verification gates before executing high-impact, state-mutating, or financial actions.",
    tags: ["agentic","safety","confirmation","pre-flight","audit","destructive-action"],
    transform: createStandardSkillTransform({
      sectionName: "Pre-flight Intent Confirmation Protocol",
      ruSectionName: "Протокол подтверждения деструктивных действий и префлайт-аудита",
      instructions: [
        "Classify all planned actions into Safe (Read-Only), Mutating (Reversible), and Destructive (Irreversible/Financial).",
        "Halt execution immediately before any Destructive action: generate an impact blast radius summary.",
        "Require explicit operator approval containing precise target ID, diff preview, and rollback procedure.",
        "Log an immutable audit event recording user confirmation token and pre-flight parameters."
],
      ruInstructions: [
        "Классифицируйте действия на безопасные (чтение), изменяемые (обратимые) и деструктивные (необратимые/финансовые).",
        "Приостанавливайте работу перед деструктивными операциями и формируйте карточку радиуса поражения (Blast Radius).",
        "Запрашивайте прямое подтверждение пользователя с показом diff-изменений и плана отката.",
        "Фиксируйте факт и параметры подтверждения в журнале аудита действий агента."
],
      semanticType: "guardrail_directive",
      tags: ["agentic","safety","confirmation","pre-flight","audit","destructive-action"],
    }),
  },

  "graph-of-thought-agent-router": {
    id: "graph-of-thought-agent-router",
    name: "GraphOfThoughtAgentRouterSkill",
    displayName: "Graph-of-Thoughts (GoT) Branching & Aggregation Engine",
    categoryId: "agentic",
    description: "Structures agent reasoning as non-linear directed graphs, supporting branch merging, cross-pollination, and loop evaluation.",
    tags: ["agentic","graph-of-thoughts","got","reasoning","dag"],
    transform: createStandardSkillTransform({
      sectionName: "Graph-of-Thoughts Execution & Aggregation Protocol",
      ruSectionName: "Протокол графового мышления (Graph-of-Thoughts) и агрегации ветвей",
      instructions: [
        "Model reasoning as an arbitrary directed graph of discrete thought nodes rather than a linear chain.",
        "Support branch merging: synthesize ideas from distinct parallel paths to create superior compound solutions.",
        "Prune inferior thought nodes dynamically based on objective evaluation functions.",
        "Generate a final consolidated output by traversing the highest-scoring topological path."
],
      ruInstructions: [
        "Организуйте рассуждения в виде направленного графа мыслей (GoT) вместо линейной последовательности.",
        "Поддерживайте слияние ветвей: синтезируйте идеи из параллельных веток в единое сильное решение.",
        "Динамически отсекайте неперспективные узлы графа на основе целевой функции полезности.",
        "Формируйте итоговый ответ путем обхода топологически оптимального пути в графе."
],
      semanticType: "protocol",
      tags: ["agentic","graph-of-thoughts","got","reasoning","dag"],
    }),
  },

  "contextual-bandit-tool-selector": {
    id: "contextual-bandit-tool-selector",
    name: "ContextualBanditToolSelectorSkill",
    displayName: "Contextual Bandit Tool Selection & Exploration",
    categoryId: "agentic",
    description: "Balances tool exploitation of known efficient APIs with controlled exploration of novel capabilities based on historical success.",
    tags: ["agentic","bandit","tool-selection","exploration","optimization"],
    transform: createStandardSkillTransform({
      sectionName: "Contextual Bandit Tool Selection Protocol",
      ruSectionName: "Протокол выбора инструментов на основе контекстных бандитов",
      instructions: [
        "Evaluate tool candidates using contextual feature matching (cost, historical success rate, latency).",
        "Apply an epsilon-greedy or Thompson sampling strategy: utilize best-performing tool 90% of the time, explore alternates 10%.",
        "Record latency and outcome quality to dynamically update tool selection confidence priors.",
        "Prevent cascading failures by demoting repeatedly failing tools temporarily."
],
      ruInstructions: [
        "Оценивайте кандидатов-инструментов по признакам задачи (стоимость токенов, надежность, скорость ответа).",
        "Используйте взвешенный выбор: в 90% случаев выбирайте проверенный инструмент, в 10% исследуйте альтернативные.",
        "Фиксируйте задержку и успешность для динамической калибровки весов инструментов.",
        "Временно снижайте приоритет инструментов, выдающих повторные сбои, во избежание каскадной деградации."
],
      semanticType: "process_directive",
      tags: ["agentic","bandit","tool-selection","exploration","optimization"],
    }),
  },

  "subagent-heartbeat-liveness-monitor": {
    id: "subagent-heartbeat-liveness-monitor",
    name: "SubagentHeartbeatLivenessMonitorSkill",
    displayName: "Subagent Liveness & Zombie Task Reaper",
    categoryId: "agentic",
    description: "Monitors dispatched subagents via heartbeat pings, terminating stalled workers and re-queuing orphaned workloads.",
    tags: ["agentic","heartbeat","subagent","liveness","orchestration"],
    transform: createStandardSkillTransform({
      sectionName: "Subagent Liveness & Reaper Protocol",
      ruSectionName: "Протокол контроля живости субагентов и очистки зависших задач",
      instructions: [
        "Establish a strict timeout interval for every dispatched asynchronous subagent.",
        "Track periodic heartbeat status ticks; identify subagents exceeding maximum latency thresholds.",
        "Terminate stalled zombie workers forcefully to release system resources and context allocations.",
        "Reassign orphaned subtasks to fresh workers with state snapshot and failure context attached."
],
      ruInstructions: [
        "Устанавливайте жесткий тайм-аут для каждого запущенного асинхронного субагента.",
        "Отслеживайте периодические сигналы активности (heartbeat) и фиксируйте превышение лимитов ожидания.",
        "Принудительно завершайте зависшие задачи (zombie workers) для освобождения памяти и слотов контекста.",
        "Переназначайте брошенные задачи новому исполнителю с передачей контекста предыдущего сбоя."
],
      semanticType: "protocol",
      tags: ["agentic","heartbeat","subagent","liveness","orchestration"],
    }),
  },

  "declarative-agent-goal-specification": {
    id: "declarative-agent-goal-specification",
    name: "DeclarativeAgentGoalSpecificationSkill",
    displayName: "Declarative Invariant & Post-condition Goal Specifier",
    categoryId: "agentic",
    description: "Transforms ambiguous user prompts into formal declarative goals with explicit invariants, bounds, and termination predicates.",
    tags: ["agentic","goal-specification","invariants","formalization","contracts"],
    transform: createStandardSkillTransform({
      sectionName: "Declarative Goal Specification Protocol",
      ruSectionName: "Протокол декларативной спецификации целей и инвариантов",
      instructions: [
        "Deconstruct the user directive into a Target State, Invariant Conditions, and Failure Boundaries.",
        "Formulate a boolean termination predicate that unambiguously defines when the goal is 100% achieved.",
        "Specify immutable invariants that no intermediate action is permitted to violate.",
        "Evaluate candidate steps strictly against whether they narrow the delta between current state and target state."
],
      ruInstructions: [
        "Декомпозируйте запрос пользователя на Целевое Состояние, Инварианты и Границы Допустимого.",
        "Сформулируйте однозначный булев предикат завершения: критерий того, что цель достигнута на 100%.",
        "Задайте неизменяемые правила (инварианты), которые запрещено нарушать ни на одном из промежуточных шагов.",
        "Оценивайте каждый планируемый шаг исключительно по тому, сокращает ли он разрыв до целевого состояния."
],
      semanticType: "process_directive",
      tags: ["agentic","goal-specification","invariants","formalization","contracts"],
    }),
  },

  "agentic-working-memory-scratchpad": {
    id: "agentic-working-memory-scratchpad",
    name: "AgenticWorkingMemoryScratchpadSkill",
    displayName: "Ephemeral Working Memory Scratchpad",
    categoryId: "agentic",
    description: "Maintains an active scratchpad buffer for intermediate calculations, variable storage, and transient state tracking.",
    tags: ["agentic","scratchpad","working-memory","state","buffer"],
    transform: createStandardSkillTransform({
      sectionName: "Working Memory Scratchpad Protocol",
      ruSectionName: "Протокол оперативной памяти и рабочего блокнота (Scratchpad)",
      instructions: [
        "Maintain an explicit Scratchpad section for uncommitted hypotheses, temporary IDs, and intermediate values.",
        "Update the Scratchpad after every observation: overwrite obsolete facts and append freshly verified data.",
        "Keep the scratchpad concise: prune redundant drafts once synthesized into the core plan.",
        "Ground all final answers exclusively in verified values recorded in the scratchpad."
],
      ruInstructions: [
        "Ведите выделенный блок рабочего блокнота (Scratchpad) для промежуточных вычислений, ID и гипотез.",
        "Обновляйте блокнот после каждого шага: удаляйте устаревшие данные и фиксируйте подтвержденные факты.",
        "Поддерживайте компактность: очищайте черновики, как только они перенесены в основной результат.",
        "Формируйте итоговый ответ только на основе данных, зафиксированных и проверенных в Scratchpad."
],
      semanticType: "structural_directive",
      tags: ["agentic","scratchpad","working-memory","state","buffer"],
    }),
  },

  "vector-similarity-tool-router": {
    id: "vector-similarity-tool-router",
    name: "VectorSimilarityToolRouterSkill",
    displayName: "Semantic Vector-Indexed Tool Retrieval",
    categoryId: "agentic",
    description: "Retrieves relevant tools dynamically from a large library using semantic embeddings rather than cluttering prompt context.",
    tags: ["agentic","rag-tools","vector-search","tool-retrieval","context-efficiency"],
    transform: createStandardSkillTransform({
      sectionName: "Semantic Tool Retrieval Protocol",
      ruSectionName: "Протокол семантического поиска и динамического подключения инструментов",
      instructions: [
        "Never dump entire tool catalogs into system context; index tool descriptions in semantic vector space.",
        "Query the tool index dynamically using the current sub-task intent to retrieve Top-K (K <= 5) relevant schemas.",
        "Mount only selected tools for the active turn, dramatically conserving input token bandwidth.",
        "Evict tools from working context immediately once their operational phase completes."
],
      ruInstructions: [
        "Не загружайте весь каталог инструментов в контекст модели; индексируйте описания семантическими векторами.",
        "Ищите инструменты по текущей подзадаче, подключая только Top-K (K <= 5) наиболее подходящих схем.",
        "Подключайте только выбранные инструменты в активный контекст, экономя токены и снижая риск ошибок.",
        "Выгружайте схемы инструментов из контекста сразу после завершения фазы их использования."
],
      semanticType: "process_directive",
      tags: ["agentic","rag-tools","vector-search","tool-retrieval","context-efficiency"],
    }),
  },

  "agent-telemetry-token-rate-limiter": {
    id: "agent-telemetry-token-rate-limiter",
    name: "AgentTelemetryTokenRateLimiterSkill",
    displayName: "Sliding-Window Token & Rate Limit Governor",
    categoryId: "agentic",
    description: "Tracks real-time token spend and API request velocity, smoothing bursts and shedding non-essential load.",
    tags: ["agentic","rate-limiting","token-budget","telemetry","governance"],
    transform: createStandardSkillTransform({
      sectionName: "Token & Request Rate Governor Protocol",
      ruSectionName: "Протокол контроля лимитов запросов и расхода токенов (Rate Governor)",
      instructions: [
        "Track cumulative TPM (Tokens Per Minute) and RPM (Requests Per Minute) in a rolling 60-second window.",
        "Apply adaptive throttling when approaching 80% of quota capacity to prevent HTTP 429 backpressure.",
        "Prioritize mission-critical reasoning over optional verbose reflection during high-utilization periods.",
        "Emit telemetry metrics on token consumption per sub-task to identify expensive agentic loops."
],
      ruInstructions: [
        "Отслеживайте текущую скорость расхода токенов (TPM) и запросов (RPM) в скользящем окне 60 секунд.",
        "При приближении к 80% квоты включайте адаптивное замедление во избежание блокировок 429 Too Many Requests.",
        "В моменты пиковой нагрузки отдавайте приоритет критическим шагам, отключая избыточные рефлексии.",
        "Выводите метрики расхода ресурсов по каждой подзадаче для выявления неэффективных циклов."
],
      semanticType: "guardrail_directive",
      tags: ["agentic","rate-limiting","token-budget","telemetry","governance"],
    }),
  },

  "speculative-tool-pipelining": {
    id: "speculative-tool-pipelining",
    name: "SpeculativeToolPipeliningSkill",
    displayName: "Speculative Async Tool Execution Pipelining",
    categoryId: "agentic",
    description: "Pipelining multiple independent tool queries speculatively in parallel when confidence in subsequent steps is high.",
    tags: ["agentic","speculative-execution","parallelism","latency-optimization","pipelining"],
    transform: createStandardSkillTransform({
      sectionName: "Speculative Tool Execution Protocol",
      ruSectionName: "Протокол спекулятивного параллельного выполнения инструментов",
      instructions: [
        "Identify upcoming read-only tool calls that have high statistical probability (>85%) of being required.",
        "Dispatch queries speculatively in parallel before preceding steps fully resolve, buffering responses.",
        "Commit speculative results if predictions match; cleanly discard buffered results if trajectory diverges.",
        "Strictly prohibit speculative execution for state-mutating, destructive, or fee-incurring APIs."
],
      ruInstructions: [
        "Определяйте предстоящие запросы на чтение данных с высокой вероятностью востребованности (>85%).",
        "Запускайте такие вызовы параллельно заранее, помещая полученные данные в буфер ожидания.",
        "Используйте результаты буфера при подтверждении гипотезы; безопасно сбрасывайте буфер при смене направления.",
        "Категорически запрещайте спекулятивный вызов для изменяющих состояние, деструктивных или платных API."
],
      semanticType: "process_directive",
      tags: ["agentic","speculative-execution","parallelism","latency-optimization","pipelining"],
    }),
  },

  "agent-exception-hierarchical-escalation": {
    id: "agent-exception-hierarchical-escalation",
    name: "AgentExceptionHierarchicalEscalationSkill",
    displayName: "Hierarchical Exception Escalation Matrix",
    categoryId: "agentic",
    description: "Defines structured escalation levels (Retry -> Alternative Tool -> Human Intervention) for unresolvable agentic failures.",
    tags: ["agentic","error-handling","escalation","resilience","fault-tolerance"],
    transform: createStandardSkillTransform({
      sectionName: "Hierarchical Exception Escalation Protocol",
      ruSectionName: "Иерархическая матрица эскалации ошибок агента",
      instructions: [
        "Map runtime failures to 3 escalation tiers: Tier 1 (Self-heal retry), Tier 2 (Fallback strategy/tool), Tier 3 (Human Escalation).",
        "Never loop indefinitely at Tier 1: after 2 consecutive identical failures, escalate immediately to Tier 2.",
        "When reaching Tier 3, assemble a triage packet: root failure cause, attempted mitigations, and exact blocking question.",
        "Gracefully yield control to the operator without corrupting system state or leaving dangling resources."
],
      ruInstructions: [
        "Классифицируйте ошибки по трем уровням: Уровень 1 (Повтор с автоисправлением), Уровень 2 (Альтернативный инструмент), Уровень 3 (Эскалация человеку).",
        "Не зацикливайтесь на Уровне 1: после 2 безуспешных попыток немедленно переходите на альтернативную стратегию Уровня 2.",
        "При эскалации на Уровень 3 подготовьте компактный отчет: первопричина сбоя, испробованные методы и конкретный вопрос оператору.",
        "Безопасно приостанавливайте работу, не оставляя несохраненных изменений или зависших процессов."
],
      semanticType: "guardrail_directive",
      tags: ["agentic","error-handling","escalation","resilience","fault-tolerance"],
    }),
  },

  "active-query-disambiguation-agent": {
    id: "active-query-disambiguation-agent",
    name: "ActiveQueryDisambiguationAgentSkill",
    displayName: "Proactive Ambiguity Detection & Disambiguation",
    categoryId: "agentic",
    description: "Identifies under-specified parameters before execution and generates targeted clarifying questions with option menus.",
    tags: ["agentic","clarification","disambiguation","user-experience","precision"],
    transform: createStandardSkillTransform({
      sectionName: "Proactive Query Disambiguation Protocol",
      ruSectionName: "Протокол проактивного выявления неопределенности и уточнения",
      instructions: [
        "Detect semantic ambiguity or missing critical parameters before initiating expensive autonomous workflows.",
        "Never guess blind defaults on high-variance decisions; formulate targeted, multiple-choice clarifying questions.",
        "Present choices with clear trade-offs (e.g., speed vs exhaustiveness, cost vs accuracy).",
        "Resume full autonomous execution seamlessly once the ambiguity is resolved."
],
      ruInstructions: [
        "Выявляйте двусмысленность и нехватку ключевых параметров до запуска ресурсоемких автономных цепочек.",
        "Не угадывайте параметры вслепую при высоких рисках; задавайте пользователю четкие вопросы с вариантами выбора.",
        "Формулируйте варианты с указанием компромиссов (скорость против полноты, экономия против точности).",
        "Бесшовно возобновляйте автономную работу после получения уточнения от пользователя."
],
      semanticType: "process_directive",
      tags: ["agentic","clarification","disambiguation","user-experience","precision"],
    }),
  },

  "dynamic-tool-composition-macro": {
    id: "dynamic-tool-composition-macro",
    name: "DynamicToolCompositionMacroSkill",
    displayName: "Dynamic Tool Macro Synthesis & Chaining",
    categoryId: "agentic",
    description: "Composes multi-tool sequences into reusable macro pipelines when recurring patterns are identified during execution.",
    tags: ["agentic","macros","tool-composition","automation","pipelines"],
    transform: createStandardSkillTransform({
      sectionName: "Dynamic Tool Composition Macro Protocol",
      ruSectionName: "Протокол синтеза макросов и композиции цепочек инструментов",
      instructions: [
        "Detect recurring sub-task patterns involving multi-tool sequences (e.g., Fetch -> Filter -> Transform -> Save).",
        "Synthesize a composite macro pipeline that threads output pipes directly into subsequent inputs without model roundtrips.",
        "Validate intermediate type compatibility across the composed pipeline boundaries.",
        "Execute the composite macro atomically, reducing roundtrip latency and prompt token overhead."
],
      ruInstructions: [
        "Выявляйте повторяющиеся последовательности вызовов (например, Скачать -> Отфильтровать -> Преобразовать -> Сохранить).",
        "Формируйте составной макрос, передающий данные напрямую между инструментами без лишних промежуточных запросов к модели.",
        "Проверяйте совместимость типов данных на стыках компонентов цепочки.",
        "Выполняйте составной макрос атомарно, сокращая общее время ответа и затраты токенов."
],
      semanticType: "process_directive",
      tags: ["agentic","macros","tool-composition","automation","pipelines"],
    }),
  },

  "ephemeral-subagent-lifecycle-manager": {
    id: "ephemeral-subagent-lifecycle-manager",
    name: "EphemeralSubagentLifecycleManagerSkill",
    displayName: "Just-in-Time Ephemeral Worker Lifecycle Management",
    categoryId: "agentic",
    description: "Spawns single-purpose ephemeral workers with stripped, hyper-focused context and tears them down immediately upon task completion.",
    tags: ["agentic","ephemeral","subagent","lifecycle","worker-management"],
    transform: createStandardSkillTransform({
      sectionName: "Ephemeral Subagent Lifecycle Protocol",
      ruSectionName: "Протокол управления жизненным циклом эфемерных субагентов",
      instructions: [
        "Spawn specialized ephemeral subagents with strictly scoped minimum-viable context for atomic tasks.",
        "Strip irrelevant parent history, system meta-prompts, and non-essential tools before worker initialization.",
        "Extract the structured artifact or conclusion upon worker completion and terminate the worker context immediately.",
        "Prevent context pollution: never bleed ephemeral worker scratchpad logs back into the root parent conversation."
],
      ruInstructions: [
        "Создавайте узкоспециализированных эфемерных субагентов с минимально необходимым контекстом для конкретной атомарной задачи.",
        "Очищайте контекст работника от нерелевантной предыстории и ненужных инструментов перед стартом.",
        "Импортируйте только готовый артефакт по завершении задачи и немедленно уничтожайте контекст воркера.",
        "Предотвращайте загрязнение контекста: не переносите черновики и логи воркера в основной диалог."
],
      semanticType: "protocol",
      tags: ["agentic","ephemeral","subagent","lifecycle","worker-management"],
    }),
  },

  "agentic-evidence-provenance-tracker": {
    id: "agentic-evidence-provenance-tracker",
    name: "AgenticEvidenceProvenanceTrackerSkill",
    displayName: "Evidence Provenance & Tool Ledger Chain-of-Custody",
    categoryId: "agentic",
    description: "Maintains an immutable chain-of-custody ledger linking every synthesized fact to its exact tool execution source and timestamp.",
    tags: ["agentic","provenance","ledger","evidence","chain-of-custody","audit"],
    transform: createStandardSkillTransform({
      sectionName: "Evidence Provenance & Source Ledger Protocol",
      ruSectionName: "Протокол учета происхождения доказательств (Evidence Provenance Ledger)",
      instructions: [
        "Tag every extracted fact with an evidence tuple: [Source Tool, Query Signature, Timestamp, Content Hash].",
        "Trace reasoning dependencies: if a source fact is invalidated, flag all downstream conclusions as suspect.",
        "Output a provenance appendix showing exact origins for all critical metrics and quantitative assertions.",
        "Reject assertions lacking verifiable source provenance during final synthesis."
],
      ruInstructions: [
        "Маркируйте каждый извлеченный факт метаданными: [Инструмент-источник, Сигнатура запроса, Временная метка, Хэш].",
        "Отслеживайте зависимости: при опровержении исходного факта помечайте все производные выводы как требующие перепроверки.",
        "Формируйте реестр источников (Provenance Ledger) для всех числовых данных и критических утверждений.",
        "Исключайте из финального ответа любые утверждения, не имеющие подтвержденной привязки к источнику."
],
      semanticType: "compliance_directive",
      tags: ["agentic","provenance","ledger","evidence","chain-of-custody","audit"],
    }),
  },

  "multi-agent-role-contract-handshake": {
    id: "multi-agent-role-contract-handshake",
    name: "MultiAgentRoleContractHandshakeSkill",
    displayName: "Inter-Agent Role Contract & Handshake Interface",
    categoryId: "agentic",
    description: "Defines formal interface contracts and schema handshakes between collaborating agents with strict payload validation.",
    tags: ["agentic","multi-agent","contracts","handshake","interface-definition"],
    transform: createStandardSkillTransform({
      sectionName: "Inter-Agent Contract Handshake Protocol",
      ruSectionName: "Протокол контрактного рукопожатия между взаимодействующими агентами",
      instructions: [
        "Establish strict input/output interface contracts between delegator and worker agents.",
        "Execute a handshake check: the worker must acknowledge understanding of schema constraints and output requirements.",
        "Reject malformed worker deliverables at the interface boundary with typed contract violations.",
        "Guarantee deterministic interoperability regardless of underlying agent model architectures."
],
      ruInstructions: [
        "Фиксируйте формальные контракты интерфейсов между делегирующим и исполняющим агентами.",
        "Проводите верификационное рукопожатие: исполнитель подтверждает готовность вернуть данные строго в указанной схеме.",
        "Отклоняйте некорректные результаты на границе интерфейса с указанием конкретных нарушений контракта.",
        "Обеспечивайте совместимость взаимодействия независимых агентов независимо от их внутренних моделей."
],
      semanticType: "protocol",
      tags: ["agentic","multi-agent","contracts","handshake","interface-definition"],
    }),
  },

  "relevance-decay-episodic-forgetting": {
    id: "relevance-decay-episodic-forgetting",
    name: "RelevanceDecayEpisodicForgettingSkill",
    displayName: "Exponential Decay Memory Pruning & Forgetting",
    categoryId: "agentic",
    description: "Applies time-and-relevance decay algorithms to prune stale episodic memories, maintaining high signal-to-noise in long runs.",
    tags: ["agentic","memory-pruning","exponential-decay","forgetting","long-horizon"],
    transform: createStandardSkillTransform({
      sectionName: "Memory Relevance Decay & Pruning Protocol",
      ruSectionName: "Протокол забывания и экспоненциального затухания памяти",
      instructions: [
        "Assign an initial salience score to every stored memory or conversational turn.",
        "Apply an exponential decay function based on elapsed interaction steps and access frequency.",
        "Evict low-salience memories from working context when token limits near saturation.",
        "Protect core user constraints and immutable invariants from decay with a zero-decay pinning flag."
],
      ruInstructions: [
        "Присваивайте каждому факту или воспоминанию начальный коэффициент значимости.",
        "Применяйте экспоненциальное затухание весов по мере удаления шага и при отсутствии повторных обращений.",
        "Удаляйте факты с низким весом из активного контекста при приближении к лимиту токенов.",
        "Защищайте ключевые правила и ограничения пользователя от забывания с помощью флага постоянного закрепления (Pinning)."
],
      semanticType: "process_directive",
      tags: ["agentic","memory-pruning","exponential-decay","forgetting","long-horizon"],
    }),
  },

  "agentic-compensating-transaction-rollback": {
    id: "agentic-compensating-transaction-rollback",
    name: "AgenticCompensatingTransactionRollbackSkill",
    displayName: "Saga Pattern Compensating Transaction Rollback",
    categoryId: "agentic",
    description: "Executes compensating inverse actions (Saga pattern) to roll back external mutations when a multi-step agent flow aborts.",
    tags: ["agentic","saga","rollback","transactions","compensating-actions","resilience"],
    transform: createStandardSkillTransform({
      sectionName: "Compensating Transaction & Saga Rollback Protocol",
      ruSectionName: "Протокол компенсационных транзакций (Saga Rollback)",
      instructions: [
        "Register an explicit compensating inverse action for every state-mutating tool execution.",
        "Track the execution forward-log in a transactional stack.",
        "If an unrecoverable failure occurs at step N, execute inverse compensating operations in reverse order (LIFO).",
        "Report final system rollback status: confirm whether clean baseline state was successfully restored."
],
      ruInstructions: [
        "Регистрируйте компенсирующее действие (компенсацию) для каждой изменяющей внешнее состояние операции.",
        "Ведите журнал выполненных прямых шагов в виде транзакционного стека.",
        "При неустранимом сбое на шаге N последовательно запускайте компенсирующие действия в обратном порядке (LIFO).",
        "Формируйте отчет о результатах отката: подтверждайте возврат системы в исходное безопасное состояние."
],
      semanticType: "protocol",
      tags: ["agentic","saga","rollback","transactions","compensating-actions","resilience"],
    }),
  },

  "meta-agent-telemetry-evaluator": {
    id: "meta-agent-telemetry-evaluator",
    name: "MetaAgentTelemetryEvaluatorSkill",
    displayName: "Post-Run Telemetry & Execution Quality Evaluator",
    categoryId: "agentic",
    description: "Performs post-mortem telemetry evaluation on completed agent workflows, scoring efficiency, reasoning depth, and dead ends.",
    tags: ["agentic","telemetry","evaluation","post-mortem","meta-analysis"],
    transform: createStandardSkillTransform({
      sectionName: "Post-Execution Telemetry Evaluation Protocol",
      ruSectionName: "Протокол телеметрической оценки качества выполнения (Post-Run Eval)",
      instructions: [
        "Calculate execution metrics upon goal resolution: Total Tokens, Step Count, Dead-End Ratio, Tool Failure Count.",
        "Score task efficiency: ratio of productive forward actions versus exploratory or corrected actions.",
        "Identify bottlenecks: highlight tools with high latency or frequent schema mismatches.",
        "Generate actionable architectural recommendations to optimize subsequent agentic runs."
],
      ruInstructions: [
        "Рассчитывайте ключевые метрики сессии: суммарные токены, число шагов, долю тупиковых путей и сбоев инструментов.",
        "Оценивайте коэффициент полезного действия (КПД): соотношение результативных действий к общим итерациям.",
        "Локализуйте узкие места: отмечайте инструменты с частыми ошибками и высокой задержкой.",
        "Формулируйте практические рекомендации по оптимизации структуры следующих запусков агента."
],
      semanticType: "process_directive",
      tags: ["agentic","telemetry","evaluation","post-mortem","meta-analysis"],
    }),
  },

  "agent-environment-snapshot-diff": {
    id: "agent-environment-snapshot-diff",
    name: "AgentEnvironmentSnapshotDiffSkill",
    displayName: "Environment State Snapshot & Delta Verification",
    categoryId: "agentic",
    description: "Captures pre- and post-execution environment state snapshots, verifying that only authorized changes were introduced.",
    tags: ["agentic","snapshots","state-diff","verification","side-effects"],
    transform: createStandardSkillTransform({
      sectionName: "Environment Snapshot & State Delta Protocol",
      ruSectionName: "Протокол фиксации снапшотов окружения и верификации изменений",
      instructions: [
        "Capture a comprehensive structural snapshot of target assets prior to execution.",
        "Compute a strict cryptographic diff (added, modified, deleted) upon completion of operations.",
        "Audit the delta against user authorization: detect and flag any unintended collateral file or data mutations.",
        "Halt and alert the operator if unexpected side-effects outside the target scope are detected."
],
      ruInstructions: [
        "Создавайте структурный снимок (снапшот) целевых объектов и файлов перед началом работы.",
        "Вычисляйте точный diff изменений (добавлено, изменено, удалено) после завершения операций.",
        "Сопоставляйте diff с санкционированным заданием: выявляйте любые непреднамеренные побочные изменения.",
        "Немедленно сигнализируйте оператору при обнаружении модификаций за пределами целевой зоны."
],
      semanticType: "guardrail_directive",
      tags: ["agentic","snapshots","state-diff","verification","side-effects"],
    }),
  },

  "bounded-depth-first-agent-search": {
    id: "bounded-depth-first-agent-search",
    name: "BoundedDepthFirstAgentSearchSkill",
    displayName: "Depth-Bounded DFS with Cycle Detection",
    categoryId: "agentic",
    description: "Explores solution spaces using bounded Depth-First Search with cryptographic node hashing to prevent infinite cycles.",
    tags: ["agentic","dfs","search","cycle-detection","bounded-depth"],
    transform: createStandardSkillTransform({
      sectionName: "Depth-Bounded DFS & Cycle Prevention Protocol",
      ruSectionName: "Протокол поиска в глубину (DFS) с контролем циклов и глубины",
      instructions: [
        "Set an immutable maximum depth limit (MaxDepth <= 5) for nested sub-problem investigations.",
        "Hash each visited state representation; check new candidate states against the visited set before branching.",
        "Prune and backtrack immediately when a potential cycle or depth overflow is detected.",
        "Prioritize deeper exploration only along branches exhibiting monotonically increasing heuristic scores."
],
      ruInstructions: [
        "Устанавливайте фиксированный предел глубины вложенности (MaxDepth <= 5) для исследования подзадач.",
        "Хэшируйте каждое пройденное состояние; сверяйте новые шаги с множеством посещенных узлов для исключения циклов.",
        "Немедленно отсекайте ветку и выполняйте откат при обнаружении повтора состояния или исчерпании лимита глубины.",
        "Углубляйтесь только по тем направлениям, где эвристическая оценка решения монотонно возрастает."
],
      semanticType: "process_directive",
      tags: ["agentic","dfs","search","cycle-detection","bounded-depth"],
    }),
  },

  "deterministic-seed-agent-replay": {
    id: "deterministic-seed-agent-replay",
    name: "DeterministicSeedAgentReplaySkill",
    displayName: "Deterministic Trace Logging & Replay Harness",
    categoryId: "agentic",
    description: "Enables deterministic execution trace replay by capturing environment seeds, tool inputs, and mockable observation fixtures.",
    tags: ["agentic","replay","determinism","testing","debugging","traces"],
    transform: createStandardSkillTransform({
      sectionName: "Deterministic Trace Logging & Replay Protocol",
      ruSectionName: "Протокол детерминированного логирования и воспроизведения трасс (Trace Replay)",
      instructions: [
        "Log full deterministic execution records: seed configuration, exact prompt tokens, tool inputs, and raw outputs.",
        "Support dry-run replay mode: substitute live external APIs with recorded trace fixtures to verify reasoning determinism.",
        "Isolate behavioral divergence: compare current reasoning steps against the baseline trace to pinpoint regressions.",
        "Produce shareable diagnostic traces that reproduce edge-case agent failures with 100% fidelity."
],
      ruInstructions: [
        "Записывайте полную трассу выполнения: сид генератора, входящие токены, вызовы инструментов и полученные ответы.",
        "Поддерживайте режим воспроизведения трассы: подставляйте записанные фикстуры вместо реальных API для проверки логики.",
        "Локализуйте расхождения: сравнивайте текущий ход мысли с эталонной трассой для поиска регрессий.",
        "Формируйте диагностический пакет трассы, позволяющий воспроизвести любой сложный сбой со 100% точностью."
],
      semanticType: "protocol",
      tags: ["agentic","replay","determinism","testing","debugging","traces"],
    }),
  },
};
