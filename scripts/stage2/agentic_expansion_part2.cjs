const { appendSkills } = require('../appendSkills.cjs');

const AGENTIC_PART2 = [
  {
    id: "tree-of-thoughts-beam-search-agent",
    name: "TreeOfThoughtsBeamSearchAgentSkill",
    displayName: "Tree-of-Thoughts (ToT) Beam Search Exploration",
    categoryId: "agentic",
    description: "Maintains a beam of top-K candidate reasoning trajectories, pruning unpromising branches via heuristic evaluation.",
    tags: ["agentic", "tree-of-thoughts", "tot", "beam-search", "heuristics"],
    sectionName: "Tree-of-Thoughts (ToT) Beam Search Protocol",
    ruSectionName: "Дерево мыслей (Tree-of-Thoughts ToT) и лучевой поиск (Beam Search)",
    instructions: [
      "Generate 3-5 distinct candidate thought branches at each decision step.",
      "Score each candidate branch using a self-evaluator heuristic (0.0 to 1.0).",
      "Retain only the Top-K (Beam Width = 2) most promising trajectories while pruning dead ends."
    ],
    ruInstructions: [
      "Генерируйте 3–5 альтернативных ветвей мыслей на каждом шаге принятия решения.",
      "Оценивайте перспективность каждой ветки эвристической функцией (от 0.0 до 1.0).",
      "Сохраняйте только 2 лучшие траектории (Beam Width = 2), отсекая заведомо тупиковые."
    ],
    semanticType: "process_directive"
  },
  {
    id: "tool-retry-exponential-backoff-jitter",
    name: "ToolRetryExponentialBackoffJitterSkill",
    displayName: "Full-Jitter Exponential Backoff & Transient Fault Handling",
    categoryId: "agentic",
    description: "Implements AWS-style Full Jitter Exponential Backoff for tool API calls to prevent thundering herds.",
    tags: ["agentic", "retry", "exponential-backoff", "jitter", "resilience", "fault-tolerance"],
    sectionName: "Full-Jitter Exponential Backoff Protocol",
    ruSectionName: "Экспоненциальная задержка с джиттером (Full-Jitter Exponential Backoff)",
    instructions: [
      "Calculate sleep duration: `Sleep = Random(0, Min(MaxSleep, BaseSleep * 2^attempt))`.",
      "Catch transient network exceptions (HTTP 429, 502, 503, 504) and retry up to 4 attempts.",
      "Fast-fail on non-retryable client errors (HTTP 400, 401, 403, 422) without wasting retry budgets."
    ],
    ruInstructions: [
      "Рассчитывайте время ожидания по формуле случайного джиттера: `Sleep = Random(0, Base * 2^attempt)`.",
      "Перехватывайте временные сетевые сбои (HTTP 429, 502, 503, 504) с повтором до 4 раз.",
      "Мгновенно прерывайте выполнение при фатальных клиентских ошибках (HTTP 400, 401, 403)."
    ],
    semanticType: "protocol"
  },
  {
    id: "multi-agent-voting-majority-consensus",
    name: "MultiAgentVotingMajorityConsensusSkill",
    displayName: "Self-Consistency & Majority Voting Consensus",
    categoryId: "agentic",
    description: "Samples multiple independent reasoning paths at temperature T > 0 and extracts the plurality consensus answer.",
    tags: ["agentic", "self-consistency", "majority-voting", "sampling", "reliability"],
    sectionName: "Self-Consistency & Plurality Voting Consensus",
    ruSectionName: "Самосогласованность (Self-Consistency) и голосование большинством",
    instructions: [
      "Sample 5 independent execution chains with distinct stochastic seeds.",
      "Parse and normalize the final numerical/categorical answers across all 5 runs.",
      "Select the plurality consensus answer and report agreement confidence ratio (e.g. 4/5 = 80%)."
    ],
    ruInstructions: [
      "Сгенерируйте 5 независимых цепочек рассуждений с разными случайными сидами.",
      "Нормализуйте и извлеките итоговые ответы из каждого прогона.",
      "Выберите вариант с большинством голосов и укажите степень согласованности (например, 80%)."
    ],
    semanticType: "protocol"
  },
  {
    id: "declarative-agentic-state-schema",
    name: "DeclarativeAgenticStateSchemaSkill",
    displayName: "Typed State Graph Schema & Immutable Transitions",
    categoryId: "agentic",
    description: "Defines agent workflow state as an immutable TypeScript/Pydantic schema with deterministic reducers.",
    tags: ["agentic", "state-graph", "immutability", "langgraph", "type-safety"],
    sectionName: "Immutable State Graph & Reducer Contract",
    ruSectionName: "Типизированный граф состояний и неизменяемые редьюсеры",
    instructions: [
      "Define agent state as a strict TypedDict/Interface containing messages, memory, and scratchpad.",
      "Enforce immutable state transitions where each node returns partial state updates merged via pure reducers.",
      "Prevent direct in-place state mutations across node boundaries."
    ],
    ruInstructions: [
      "Опишите состояние агента в виде строгой схемы (messages, context, active_plan).",
      "Применяйте чистые функции-редьюсеры для объединения частичных обновлений состояния.",
      "Запретите мутацию глобального состояния напрямую внутри исполняемых узлов."
    ],
    semanticType: "protocol"
  },
  {
    id: "autonomous-ground-truth-fact-checker",
    name: "AutonomousGroundTruthFactCheckerSkill",
    displayName: "Autonomous Ground-Truth Retrieval & Claim Cross-Checking",
    categoryId: "agentic",
    description: "Verifies internal model assertions by issuing targeted search queries to verified documentation corpora.",
    tags: ["agentic", "fact-checking", "rag", "verification", "ground-truth"],
    sectionName: "Ground-Truth Cross-Checking & Retrieval Protocol",
    ruSectionName: "Автономный фактчекинг и сверка с доверенными базами знаний",
    instructions: [
      "Identify high-risk factual assertions in the draft response (version numbers, API methods, citations).",
      "Execute targeted search queries against verified documentation sources.",
      "Overwrite any inaccurate draft claims with verified empirical ground truth."
    ],
    ruInstructions: [
      "Выделите в ответе ключевые факты с высоким риском галлюцинаций (номера версий, методы API).",
      "Выполните целевой поиск по официальной документации и авторитетным источникам.",
      "Скорректируйте любые неточности в ответе на основе подтвержденных фактов."
    ],
    semanticType: "protocol"
  }
];

console.log('Appending Agentic Part 2...');
appendSkills('agentic', AGENTIC_PART2);
console.log('Agentic Part 2 appended.');
