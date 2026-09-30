const { appendSkills } = require('../appendSkills.cjs');

const AGENTIC_FULL = [
  {
    id: "hierarchical-multi-agent-orchestration",
    name: "HierarchicalMultiAgentOrchestrationSkill",
    displayName: "Hierarchical Multi-Agent Supervisor-Worker Architecture",
    categoryId: "agentic",
    description: "Implements Supervisor/Worker agent topologies with explicit delegation, state merging, and escalation protocols.",
    tags: ["agentic", "multi-agent", "supervisor", "orchestration", "delegation"],
    sectionName: "Hierarchical Multi-Agent Orchestration Protocol",
    ruSectionName: "Иерархическая оркестрация мультиагентных систем (Supervisor-Workers)",
    instructions: [
      "Designate a single Supervisor Agent responsible for high-level goal decomposition and task delegation.",
      "Instantiate specialized Worker Agents with isolated sandboxes and constrained tool privileges.",
      "Enforce deterministic JSON message-passing protocols for worker state reporting and error escalation."
    ],
    ruInstructions: [
      "Назначьте агента-супервайзера, отвечающего за глобальную декомпозицию и распределение задач.",
      "Создайте специализированных агентов-воркеров с изолированными правами и наборами инструментов.",
      "Используйте структурированный JSON-протокол обмена сообщениями и эскалации ошибок."
    ],
    semanticType: "protocol"
  },
  {
    id: "tool-calling-json-schema-contract",
    name: "ToolCallingJsonSchemaContractSkill",
    displayName: "Strict Tool-Calling JSON Schema & Parameter Validation",
    categoryId: "agentic",
    description: "Defines deterministic JSON Schema definitions for LLM tool invocations with strict type-checking.",
    tags: ["agentic", "tool-calling", "json-schema", "function-calling", "type-safety"],
    sectionName: "Tool-Calling JSON Schema & Invocation Invariants",
    ruSectionName: "Строгий контракт вызова инструментов (Tool-Calling JSON Schema)",
    instructions: [
      "Define JSON Schema parameter contracts with `additionalProperties: false` and strict required fields.",
      "Validate LLM tool call payloads against the JSON schema before dispatching to backend runtime.",
      "Emit actionable error schema diagnostics back to the agent on validation failure to enable self-correction."
    ],
    ruInstructions: [
      "Опишите JSON-схемы аргументов функций с `additionalProperties: false` и обязательными полями.",
      "Валидируйте сгенерированные агентом вызовы перед их реальной отправкой в исполняемую среду.",
      "Возвращайте агенту детальные ошибки валидации схемы для автоматического исправления параметров."
    ],
    semanticType: "protocol"
  },
  {
    id: "dynamic-replanning-self-correction",
    name: "DynamicReplanningSelfCorrectionSkill",
    displayName: "Dynamic Execution Replanning & Reflection Loop",
    categoryId: "agentic",
    description: "Evaluates tool execution output and dynamically alters downstream plan DAGs upon encountering unexpected obstacles.",
    tags: ["agentic", "replanning", "self-correction", "reflection", "adaptive"],
    sectionName: "Dynamic Replanning & Self-Correction Engine",
    ruSectionName: "Динамическое перепланирование и петля самокоррекции агента",
    instructions: [
      "Inspect execution observation: verify whether current step output matches expected postconditions.",
      "If execution fails or returns unexpected data, trigger a Replanning Phase: prune invalid downstream nodes.",
      "Synthesize an alternate execution trajectory while conserving uncorrupted intermediate state."
    ],
    ruInstructions: [
      "Анализируйте результат вызова инструмента: проверяйте соответствие ожидаемым постусловиям.",
      "При сбое или непредвиденных данных запускайте фазу перепланирования (Replanning) с удалением тупиковых веток.",
      "Сформируйте альтернативную траекторию действий с сохранением уже полученных валидных данных."
    ],
    semanticType: "process_directive"
  },
  {
    id: "stateful-episodic-memory-vector-store",
    name: "StatefulEpisodicMemoryVectorStoreSkill",
    displayName: "Episodic Memory Retrieval & Semantic Vector Store",
    categoryId: "agentic",
    description: "Maintains long-term episodic memory via semantic vector similarity retrieval and relevance pruning.",
    tags: ["agentic", "memory", "vector-store", "rag", "embeddings", "episodic"],
    sectionName: "Episodic Vector Memory & Context Retrieval Protocol",
    ruSectionName: "Эпизодическая векторная память и семантический поиск контекста",
    instructions: [
      "Embed agent interaction episodes into a dense vector index with metadata (timestamp, outcome, task_type).",
      "Query memory for the Top-K most semantically relevant historical precedents before initiating execution.",
      "Inject extracted lessons-learned and historical failure modes into the agent's working context window."
    ],
    ruInstructions: [
      "Сохраняйте опыт взаимодействия агента в векторный индекс с метаданными (время, результат, тип задачи).",
      "Извлекайте Top-K наиболее близких исторических прецедентов перед началом выполнения новой задачи.",
      "Добавляйте извлеченные уроки и ранее совершенные ошибки в рабочий контекст агента."
    ],
    semanticType: "protocol"
  },
  {
    id: "human-in-the-loop-hitl-checkpoint",
    name: "HumanInTheLoopHitlCheckpointSkill",
    displayName: "Human-in-the-Loop (HITL) Approval Gate & Escalation",
    categoryId: "agentic",
    description: "Pauses autonomous execution and requests verified human approval before executing destructive or financial actions.",
    tags: ["agentic", "hitl", "human-in-the-loop", "safety", "approval-gates"],
    sectionName: "Human-in-the-Loop (HITL) Gate & Escalation Invariants",
    ruSectionName: "Шлюз подтверждения человеком (Human-in-the-Loop HITL)",
    instructions: [
      "Classify tool actions into Autonomous (read-only, local compute) vs Gated (mutations, payments, emails, deletions).",
      "Suspend execution state immediately and emit an actionable Human Approval Ticket for Gated operations.",
      "Resume execution strictly upon receiving verified cryptographic human authorization tokens."
    ],
    ruInstructions: [
      "Разделите действия на автономные (чтение данных, вычисления) и требующие одобрения (запись, платежи, удаление).",
      "Приостанавливайте выполнение и формируйте понятную заявку на подтверждение человеком (Approval Ticket).",
      "Возобновляйте выполнение только после получения проверенного токена авторизации от оператора."
    ],
    semanticType: "guardrail_directive"
  },
  {
    id: "plan-and-solve-zeroshot-dag",
    name: "PlanAndSolveZeroshotDagSkill",
    displayName: "Plan-and-Solve (PS) Zero-Shot DAG Execution",
    categoryId: "agentic",
    description: "Decouples plan generation from step-by-step execution to prevent premature greedy local optimizations.",
    tags: ["agentic", "plan-and-solve", "planning", "zero-shot", "dag"],
    sectionName: "Plan-and-Solve (PS) Decoupled Execution Protocol",
    ruSectionName: "Двухфазный протокол Plan-and-Solve (Планирование и Исполнение)",
    instructions: [
      "Phase 1 (Planner): Devise a complete, detailed step-by-step plan DAG addressing all sub-problems.",
      "Phase 2 (Solver): Execute the formulated plan sequentially, carrying forward intermediate variables.",
      "Do not begin executing Phase 2 until Phase 1 plan passes completeness and feasibility validation."
    ],
    ruInstructions: [
      "Фаза 1 (Планировщик): Сформируйте полный детальный пошаговый план решения всех подзадач.",
      "Фаза 2 (Исполнитель): Последовательно выполните шаги плана с передачей промежуточных переменных.",
      "Не начинайте исполнение, пока план первой фазы не пройдет валидацию на полноту и реализуемость."
    ],
    semanticType: "process_directive"
  },
  {
    id: "agentic-rate-limit-token-budgeter",
    name: "AgenticRateLimitTokenBudgeterSkill",
    displayName: "Agentic Token Budget & Recursion Depth Limiter",
    categoryId: "agentic",
    description: "Enforces strict caps on maximum LLM iterations, total token consumption, and call recursion depth.",
    tags: ["agentic", "rate-limiting", "token-budget", "recursion", "cost-control"],
    sectionName: "Agentic Execution Budget & Recursion Limits",
    ruSectionName: "Бюджет токенов агента и защита от бесконечной рекурсии",
    instructions: [
      "Set hard upper bounds on maximum execution steps (e.g. max_steps = 15) and recursion depth (max_depth = 3).",
      "Monitor cumulative token and dollar expenditure; halt execution when 90% of allocated budget is consumed.",
      "Provide a clean graceful exit with best-effort intermediate summary if budget is exhausted."
    ],
    ruInstructions: [
      "Установите жесткие лимиты на число итераций (например, max_steps = 15) и глубину вызовов (max_depth = 3).",
      "Контролируйте суммарный расход токенов и бюджета; останавливайте цикл при исчерпании 90% лимита.",
      "Сформируйте понятный промежуточный отчет о проделанной работе при достижении лимита бюджета."
    ],
    semanticType: "constraints"
  },
  {
    id: "tool-idempotency-replay-harness",
    name: "ToolIdempotencyReplayHarnessSkill",
    displayName: "Tool Execution Caching & Deterministic Replay Harness",
    categoryId: "agentic",
    description: "Caches deterministic tool responses by input hash, preventing redundant external API billing and latency.",
    tags: ["agentic", "caching", "idempotency", "replay", "optimization"],
    sectionName: "Deterministic Tool Output Caching & Replay Protocol",
    ruSectionName: "Кэширование вызовов инструментов и детерминированное воспроизведение",
    instructions: [
      "Hash tool name and JSON parameters into a deterministic cache key: `SHA256(tool_name + sorted_params)`.",
      "Check cache for identical prior executions; return cached result instantly for deterministic read tools.",
      "Enable instant test replay and debugging runs without invoking live third-party APIs."
    ],
    ruInstructions: [
      "Хешируйте имя инструмента и отсортированные параметры в ключ кэша: `SHA256(tool + params)`.",
      "Возвращайте сохраненный ответ из кэша для детерминированных операций чтения без повторных обращений к API.",
      "Обеспечьте возможность мгновенного воспроизведения и отладки сценариев на сохраненных данных."
    ],
    semanticType: "protocol"
  },
  {
    id: "multi-agent-debate-consensus-verifier",
    name: "MultiAgentDebateConsensusVerifierSkill",
    displayName: "Multi-Agent Dialectical Debate & Consensus Verifier",
    categoryId: "agentic",
    description: "Spawns Proponent, Opponent, and Arbiter agents to engage in structured cross-examination before final decision.",
    tags: ["agentic", "multi-agent", "debate", "consensus", "dialectics"],
    sectionName: "Multi-Agent Debate & Arbiter Protocol",
    ruSectionName: "Мультиагентный диалектический дебат и вердикт арбитра",
    instructions: [
      "Instantiate Agent A (Proponent) and Agent B (Adversarial Critic) to critique each other's solution drafts.",
      "Execute 2 structured rounds of cross-examination where each agent must respond to specific vulnerabilities.",
      "Task a neutral Arbiter Agent with synthesizing the verified truth and issuing a binding consensus verdict."
    ],
    ruInstructions: [
      "Создайте Агента А (Защитник) и Агента Б (Критик) для взаимного аудита предложенных решений.",
      "Проведите 2 структурированных раунда перекрестной аргументации по выявленным уязвимостям.",
      "Поручите нейтральному Агенту-Арбитру синтезировать проверенное решение и вынести вердикт."
    ],
    semanticType: "protocol"
  },
  {
    id: "tool-sandboxing-least-privilege",
    name: "ToolSandboxingLeastPrivilegeSkill",
    displayName: "Autonomous Tool Sandboxing & Capability Restriction",
    categoryId: "agentic",
    description: "Runs agent code execution and tool handlers inside ephemeral, network-isolated container sandboxes.",
    tags: ["agentic", "sandboxing", "security", "least-privilege", "isolation"],
    sectionName: "Tool Execution Sandboxing & Capability Policy",
    ruSectionName: "Песочница для исполнения инструментов и изоляция прав (Sandboxing)",
    instructions: [
      "Execute all generated Python/Bash scripts inside ephemeral, non-root microVM sandboxes with strict CPU/memory limits.",
      "Disable outbound internet access for tool execution unless explicitly whitelisted with domain-pinned certificates.",
      "Enforce immutable filesystem rootfs with disposable tmpfs write-layers destroyed after each execution."
    ],
    ruInstructions: [
      "Исполняйте сгенерированный код в изолированных контейнерах без прав root с лимитами по CPU и памяти.",
      "Заблокируйте доступ к внешней сети для песочницы, за исключением разрешенных доверенных хостов.",
      "Используйте файловую систему read-only с уничтожением временных файлов после каждого запуска."
    ],
    semanticType: "guardrail_directive"
  },
  {
    id: "chain-of-tools-parameter-pipelining",
    name: "ChainOfToolsParameterPipeliningSkill",
    displayName: "Chain-of-Tools Output-to-Input Pipelining",
    categoryId: "agentic",
    description: "Pipes intermediate JSON outputs from Tool_A directly into validated parameter slots for Tool_B.",
    tags: ["agentic", "pipelining", "tool-chains", "dataflow", "automation"],
    sectionName: "Tool Output-to-Input Pipelining Specification",
    ruSectionName: "Конвейеризация параметров между инструментами (Chain-of-Tools)",
    instructions: [
      "Extract structured fields from Tool_A observation using JSONPath expressions: `$.result.data_id`.",
      "Map extracted fields deterministically into Tool_B input arguments without intermediate lossy re-encoding.",
      "Validate pipeline invariants before triggering subsequent tool invocations."
    ],
    ruInstructions: [
      "Извлекайте поля из ответа первого инструмента с помощью JSONPath: `$.result.target_id`.",
      "Передавайте извлеченные значения напрямую в аргументы следующего инструмента конвейера.",
      "Проверяйте корректность промежуточных данных до вызова зависимого инструмента."
    ],
    semanticType: "protocol"
  },
  {
    id: "agentic-goal-guardrail-monitor",
    name: "AgenticGoalGuardrailMonitorSkill",
    displayName: "Agentic Goal Drift Monitor & Alignment Sentinel",
    categoryId: "agentic",
    description: "Runs an independent background monitor that continuously checks whether the agent's actions remain aligned with the master objective.",
    tags: ["agentic", "goal-drift", "alignment", "monitoring", "safety"],
    sectionName: "Agentic Goal Alignment & Drift Sentinel",
    ruSectionName: "Монитор дрейфа целей агента и сторож выравнивания (Goal Drift Sentinel)",
    instructions: [
      "Compute semantic alignment distance between the agent's current sub-action and the original Root Mandate.",
      "Trigger an immediate HALT and Context Reset if semantic drift exceeds allowable tolerance (>0.35 cosine distance).",
      "Prevent recursive rabbit-hole tangents that consume tokens without advancing primary goal milestones."
    ],
    ruInstructions: [
      "Непрерывно рассчитывайте семантическое соответствие текущего действия агента глобальной цели задачи.",
      "Мгновенно останавливайте выполнение и сбрасывайте контекст при обнаружении опасного ухода в сторону.",
      "Блокируйте бесконечные тупиковые ветки рассуждений, не приближающие решение ключевой задачи."
    ],
    semanticType: "guardrail_directive"
  },
  {
    id: "speculative-parallel-tool-dispatch",
    name: "SpeculativeParallelToolDispatchSkill",
    displayName: "Speculative Parallel Tool Dispatch & Early Join",
    categoryId: "agentic",
    description: "Dispatches multiple read-only tool calls concurrently across independent DAG branches, joining results asynchronously.",
    tags: ["agentic", "parallelism", "concurrency", "performance", "async"],
    sectionName: "Speculative Parallel Tool Dispatch Protocol",
    ruSectionName: "Параллельный спекулятивный вызов инструментов и асинхронный сбор",
    instructions: [
      "Identify independent tool invocations in the execution plan that share zero mutable state dependencies.",
      "Dispatch tool requests concurrently in parallel threads (e.g. `Promise.allSettled`).",
      "Re-synchronize agent working state at explicit barrier join points before planning subsequent steps."
    ],
    ruInstructions: [
      "Выделите независимые вызовы инструментов, не имеющие общих изменяемых состояний.",
      "Запустите выполнение запросов параллельно в асинхронном режиме.",
      "Синхронизируйте контекст агента в общей точке сбора (Barrier) перед переходом к следующему шагу."
    ],
    semanticType: "protocol"
  },
  {
    id: "self-healing-code-execution-interpreter",
    name: "SelfHealingCodeExecutionInterpreterSkill",
    displayName: "Self-Healing Code Execution & Traceback Debug Loop",
    categoryId: "agentic",
    description: "Executes generated scripts in Python/JS, catches runtime Tracebacks, and automatically patches syntax/logic errors.",
    tags: ["agentic", "self-healing", "code-interpreter", "debugging", "traceback"],
    sectionName: "Self-Healing Code Execution & Debug Loop",
    ruSectionName: "Самовосстанавливающийся интерпретатор кода и автоисправление ошибок",
    instructions: [
      "Execute generated code in sandboxed interpreter and capture stdout, stderr, and stack tracebacks.",
      "If exit code != 0, inject the exact traceback into the agent's working prompt with explicit instruction: 'Locate bug and emit minimal diff patch'.",
      "Cap auto-debug retry attempts at 3 iterations before escalating to human operator."
    ],
    ruInstructions: [
      "Запустите код в песочнице и перехватите логи stdout, stderr и трассировку стека исключения.",
      "При ненулевом коде возврата передайте стек ошибки агенту с директивой сформировать исправляющий патч.",
      "Ограничьте число автоматических попыток отладки до 3 перед эскалацией человеку."
    ],
    semanticType: "process_directive"
  },
  {
    id: "multi-persona-swarms-boids-consensus",
    name: "MultiPersonaSwarmsBoidsConsensusSkill",
    displayName: "Swarm Intelligence & Reynolds Boids Consensus",
    categoryId: "agentic",
    description: "Orchestrates swarms of micro-agents using Reynolds Boids rules (Separation, Alignment, Cohesion) to explore large state spaces.",
    tags: ["agentic", "swarms", "boids", "reynolds", "distributed-agents"],
    sectionName: "Swarm Intelligence & Boids Exploration Protocol",
    ruSectionName: "Роевой интеллект агентов и консенсус Рейнольдса (Boids: Separation, Alignment, Cohesion)",
    instructions: [
      "Instantiate a swarm of 5-10 lightweight micro-agents exploring disparate regions of the problem space.",
      "Enforce Separation (avoid redundant duplicate exploration), Alignment (share discovered heuristics), and Cohesion (converge on optimal global solution).",
      "Aggregate swarm telemetry into a high-density global solution map."
    ],
    ruInstructions: [
      "Запустите рой из 5–10 легковесных микро-агентов для исследования разных областей задачи.",
      "Примените правила: Разделение (нет дублированию), Выравнивание (обмен эвристиками), Сплочение (сходимость к оптимуму).",
      "Сведите результаты работы роя в единую оптимизированную карту решений."
    ],
    semanticType: "process_directive"
  },
  {
    id: "context-window-semantic-compaction",
    name: "ContextWindowSemanticCompactionSkill",
    displayName: "Semantic Context Window Compaction & State Checkpointing",
    categoryId: "agentic",
    description: "Summarizes older interaction turns into structured state checkpoints when context window reaches 75% capacity.",
    tags: ["agentic", "context-compaction", "memory-management", "token-economy", "checkpointing"],
    sectionName: "Context Window Semantic Compaction Protocol",
    ruSectionName: "Семантическое сжатие контекстного окна и чекпоинты состояния",
    instructions: [
      "Track active context window token utilization continuously.",
      "When context utilization exceeds 75%, trigger a Compaction Pass: compress raw historical turns into a structured JSON state checkpoint.",
      "Preserve verified factual invariants, active variable bindings, and unresolved sub-goals while purging conversational fluff."
    ],
    ruInstructions: [
      "Непрерывно отслеживайте процент заполнения контекстного окна агента.",
      "При достижении 75% объема запустите процедуру сжатия: преобразуйте старые шаги в структурированный JSON-чекпоинт.",
      "Сохраняйте проверенные факты, значения переменных и активные цели, удаляя промежуточный текстовый мусор."
    ],
    semanticType: "protocol"
  },
  {
    id: "dynamic-tool-registry-discovery",
    name: "DynamicToolRegistryDiscoverySkill",
    displayName: "Dynamic Tool Registry & Just-In-Time Schema Discovery",
    categoryId: "agentic",
    description: "Loads tool schemas dynamically via semantic search rather than crowding the system prompt with 100+ tool definitions.",
    tags: ["agentic", "tool-discovery", "rag", "schema-loading", "efficiency"],
    sectionName: "Dynamic Tool Discovery & Schema Ingestion Protocol",
    ruSectionName: "Динамический поиск и загрузка схем инструментов (JIT Tool Discovery)",
    instructions: [
      "Maintain a catalog of 100+ available enterprise tools indexed in a vector similarity store.",
      "Query the tool registry using the current sub-goal description to retrieve the Top-3 most relevant tool definitions.",
      "Inject only the retrieved tool schemas into the immediate turn context, minimizing prompt overhead."
    ],
    ruInstructions: [
      "Храните библиотеку из сотен корпоративных инструментов в векторном каталоге.",
      "Ищите по смыслу текущей подзадачи 3 наиболее подходящих инструмента на лету.",
      "Передавайте в промпт модели только схемы найденных инструментов, экономя контекстное окно."
    ],
    semanticType: "protocol"
  },
  {
    id: "agentic-critique-constitutional-evaluator",
    name: "AgenticCritiqueConstitutionalEvaluatorSkill",
    displayName: "Constitutional Agentic Self-Critique & Rubric Scoring",
    categoryId: "agentic",
    description: "Evaluates final candidate outputs against an immutable constitutional quality rubric before emitting the final answer.",
    tags: ["agentic", "constitutional-ai", "rubric", "evaluation", "quality-gate"],
    sectionName: "Constitutional Quality Gate & Rubric Audit",
    ruSectionName: "Конституционный аудит качества и скоринг по рубрикам (Constitutional AI)",
    instructions: [
      "Evaluate the drafted response against 5 immutable constitutional principles (e.g. Truthfulness, Safety, Actionability, Code Quality, Conciseness).",
      "Score each dimension from 1-10; if any dimension scores < 8, reject the draft with specific remediation directives.",
      "Iterate until the candidate response achieves a passing grade across all constitutional rubrics."
    ],
    ruInstructions: [
      "Оцените черновик ответа по 5 конституционным принципам (Достоверность, Безопасность, Практичность, Качество кода, Лаконичность).",
      "Поставьте оценку 1–10 по каждому пункту; если хотя бы один балл < 8, отправьте черновик на доработку.",
      "Повторяйте цикл до достижения высшего стандарта по всем критериям конституции."
    ],
    semanticType: "guardrail_directive"
  },
  {
    id: "idempotent-saga-transaction-coordinator",
    name: "IdempotentSagaTransactionCoordinatorSkill",
    displayName: "Agentic Saga Distributed Transaction Coordinator",
    categoryId: "agentic",
    description: "Coordinates multi-service agent workflows with explicit forward actions and compensating rollback transactions.",
    tags: ["agentic", "saga", "distributed-transactions", "rollback", "compensating-actions"],
    sectionName: "Agentic Saga Distributed Transaction Protocol",
    ruSectionName: "Координатор распределенных саг (Saga Pattern: прямые действия и компенсация)",
    instructions: [
      "Pair every mutating forward step (e.g. ReserveInventory) with an explicit compensating transaction (e.g. ReleaseInventory).",
      "Log transaction progress in an append-only state journal.",
      "If any intermediate step fails fatally, execute all previously completed compensating transactions in reverse chronological order."
    ],
    ruInstructions: [
      "Свяжите каждое прямое действие (например, Списание средств) с компенсирующей транзакцией (Возврат средств).",
      "Фиксируйте прогресс выполнения саги в неизменяемом журнале состояний.",
      "При сбое на любом этапе выполните компенсирующие действия в строго обратном порядке."
    ],
    semanticType: "protocol"
  },
  {
    id: "zero-shot-cot-reflection-scaffold",
    name: "ZeroShotCotReflectionScaffoldSkill",
    displayName: "Zero-Shot CoT with Structured Reflection Scaffold",
    categoryId: "agentic",
    description: "Guides agents through structured scratchpads: <thinking>, <reflection>, <action>, and <final_answer>.",
    tags: ["agentic", "scratchpad", "cot", "reflection", "scaffolding"],
    sectionName: "Structured Reflection Scratchpad Scaffold",
    ruSectionName: "Структурированный черновик рассуждений и рефлексии (Scratchpad XML)",
    instructions: [
      "Encapsulate internal monologue strictly inside explicit XML tags: `<scratchpad>`, `<reflection>`, `<action>`, `<final_answer>`.",
      "Perform thorough factuality self-audits inside `<reflection>` before emitting the user-facing `<final_answer>`.",
      "Ensure zero unescaped internal reasoning leaks into the customer response."
    ],
    ruInstructions: [
      "Оформляйте внутренние рассуждения в явные теги: `<scratchpad>`, `<reflection>`, `<action>`, `<final_answer>`.",
      "Проводите самопроверку фактов внутри тега `<reflection>` до формирования публичного ответа.",
      "Исключите попадание служебных мыслей и сырых логов в итоговый ответ пользователю."
    ],
    semanticType: "protocol"
  }
];

console.log('Appending full Agentic expansion...');
appendSkills('agentic', AGENTIC_FULL);
console.log('Agentic expanded.');
