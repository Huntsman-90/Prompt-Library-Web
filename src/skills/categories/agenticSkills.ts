import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const AGENTIC_SKILLS: Record<string, SkillDefinition> = {
  'react-loop': {
    id: 'react-loop',
    name: 'ReActSkill',
    displayName: 'Autonomous ReAct Loop (Thought -> Action -> Observation)',
    categoryId: 'agentic',
    description: 'Embeds the deterministic Thought-Action-Observation operational cycle for autonomous agents.',
    tags: ['agentic', 'react', 'autonomous', 'tools', 'loop', 'execution'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Протокол Исполнения ReAct',
        'Autonomous ReAct Execution Protocol',
        [
          'Каждый шаг выполнения обязан строго следовать формату:',
          '- **Thought**: Анализ текущего состояния, формулировка гипотезы и обоснование следующего действия.',
          '- **Action**: Вызов инструмента в формате строгого JSON `{"tool": "name", "arguments": { ... }}`.',
          '- **Observation**: Анализ ответа инструмента и сопоставление с критерием успешности.',
        ],
        [
          'Every autonomous cycle must strictly adhere to the tripartite execution schema:',
          '- **Thought**: Deduction regarding environment state delta and operational necessity of next action.',
          '- **Action**: Strictly typed JSON tool invocation `{"tool": "name", "arguments": { ... }}`.',
          '- **Observation**: Grounded interpretation of tool response before determining next step.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'task-decomposition': {
    id: 'task-decomposition',
    name: 'TaskDecompositionSkill',
    displayName: 'DAG Task Graph Decomposition',
    categoryId: 'agentic',
    description: 'Decomposes complex objectives into a Directed Acyclic Graph (DAG) with explicit dependencies.',
    tags: ['agentic', 'dag', 'decomposition', 'planning', 'graph'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Декомпозиция Задач в Граф Зависимостей (DAG)',
        'Task Graph DAG Decomposition Protocol',
        [
          '1. Разбить генеральную цель на независимые атомарные подзадачи.',
          '2. Определить критический путь выполнения и возможности для параллельного асинхронного запуска.',
          '3. Для каждого узла зафиксировать неизменяемую схему входных данных и контракт завершения.',
        ],
        [
          '1. Decompose master goal into an explicit Directed Acyclic Graph (DAG) of atomic execution nodes.',
          '2. Isolate critical dependency path and annotate opportunities for concurrent execution.',
          '3. For each node, specify strict input schemas and verifiable completion criteria.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'tool-use-protocol': {
    id: 'tool-use-protocol',
    name: 'ToolUseProtocolSkill',
    displayName: 'Tool Use & Parameter Validation Protocol',
    categoryId: 'agentic',
    description: 'Defines strict tool-calling schemas, parameter assertions, retry policies, and error handling.',
    tags: ['agentic', 'tools', 'schema', 'api-contract', 'parameters'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Протокол Вызова Инструментов (Tool Use)',
        'Tool-Calling & Parameter Validation Protocol',
        [
          '- До вызова инструмента валидировать типы всех параметров на соответствие схеме.',
          '- При получении ошибки инструмента: проанализировать код ошибки, сформировать скорректированный вызов и повторить попытку (до 3 раз).',
          '- Не экстраполировать результаты вызова: использовать только фактические данные, возвращенные инструментом.',
        ],
        [
          '- Perform strict runtime type validation on all arguments prior to tool dispatch.',
          '- On tool failure: inspect error schema, apply exponential backoff, and retry with adjusted payload (up to 3 attempts).',
          '- Never hallucinate tool output: ground subsequent steps strictly in the raw returned payload.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'memory-context-protocol': {
    id: 'memory-context-protocol',
    name: 'MemoryContextProtocolSkill',
    displayName: 'Working Memory Scratchpad Protocol',
    categoryId: 'agentic',
    description: 'Configures working memory scratchpad, sliding context compression, and state preservation.',
    tags: ['agentic', 'memory', 'scratchpad', 'state', 'context'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Управление Рабочей Памятью (Scratchpad)',
        'Working Memory Scratchpad & State Retention Protocol',
        [
          '- Вести явный раздел `[SCRATCHPAD]` с промежуточными переменными и проверенными фактами.',
          '- При приближении к лимиту токенов выполнять сжатие выполненных шагов в компактную сводку состояния.',
        ],
        [
          '- Maintain an explicit `[SCRATCHPAD]` section logging current state deltas and validated invariants.',
          '- Perform sliding window summarization when execution history nears context thresholds.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'autonomous-reflection-loop': {
    id: 'autonomous-reflection-loop',
    name: 'AutonomousReflectionLoopSkill',
    displayName: 'Autonomous Self-Reflection & Course Correction',
    categoryId: 'agentic',
    description: 'Triggers internal self-reflection passes after tool outputs to detect dead-ends and steer execution.',
    tags: ['agentic', 'reflection', 'self-correction', 'autonomous', 'steering'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Автономная Рефлексия и Коррекция Маршрута',
        'Autonomous Self-Reflection & Trajectory Correction',
        [
          '- После каждого шага оценить: приблизило ли действие агента к цели или привело в тупик?',
          '- При обнаружении тупика немедленно сменить стратегию вместо повторения аналогичных запросов.',
        ],
        [
          '- Following each execution step, evaluate progress delta toward target objective.',
          '- Upon detecting dead-end trajectories, immediately pivot strategy and mutate action plan.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'plan-and-solve-protocol': {
    id: 'plan-and-solve-protocol',
    name: 'PlanAndSolveProtocolSkill',
    displayName: 'Plan-and-Solve Two-Phase Strategy',
    categoryId: 'agentic',
    description: 'Separates planning phase (global strategy synthesis) from execution phase (step-by-step tool actions).',
    tags: ['agentic', 'plan-and-solve', 'planning', 'execution', 'strategy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Двухфазная Стратегия: Планирование и Исполнение',
        'Plan-and-Solve Execution Strategy',
        [
          '- **Фаза 1 (План)**: Сформировать исчерпывающий пошаговый план решения до вызова первого инструмента.',
          '- **Фаза 2 (Исполнение)**: Последовательно реализовать шаги плана с фиксацией статуса каждого.',
        ],
        [
          '- **Phase 1 (Global Plan)**: Synthesize an exhaustive execution blueprint prior to dispatching tools.',
          '- **Phase 2 (Targeted Execution)**: Execute discrete steps sequentially, verifying intermediate exit criteria.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'multi-agent-orchestrator': {
    id: 'multi-agent-orchestrator',
    name: 'MultiAgentOrchestratorSkill',
    displayName: 'Multi-Agent Role Orchestrator & Dispatcher',
    categoryId: 'agentic',
    description: 'Orchestrates specialized sub-agents (Researcher, Coder, Critic, Reviewer) via structured message bus.',
    tags: ['agentic', 'multi-agent', 'orchestrator', 'roles', 'message-bus'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Оркестрация Мультиагентного Конвейера',
        'Multi-Agent Role Orchestration Protocol',
        [
          '- **Researcher Agent**: Сбор данных и поиск документации.',
          '- **Architect / Coder Agent**: Генерация реализации по спецификации.',
          '- **Critic / Security Auditor Agent**: Бескомпромиссный аудит и валидация кода.',
          '- Главный оркестратор агрегирует результаты и выносит итоговое решение.',
        ],
        [
          '- **Researcher Agent**: Data gathering and schema discovery.',
          '- **Architect / Coder Agent**: Contract implementation and refactoring.',
          '- **Critic / Security Auditor Agent**: Adversarial code audit and regression verification.',
          '- Lead Orchestrator reconciles agent responses into a unified verified deliverable.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'subgoal-verification-gate': {
    id: 'subgoal-verification-gate',
    name: 'SubgoalVerificationGateSkill',
    displayName: 'Subgoal Atomic Verification Gate',
    categoryId: 'agentic',
    description: 'Prevents advancing to the next step until the current subgoal passes explicit automated test assertions.',
    tags: ['agentic', 'subgoal', 'verification', 'gate', 'assertions'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Шлюз Верификации Подцелей (Subgoal Gate)',
        'Subgoal Verification & Gatekeeper Assertion',
        [
          '- Для каждого промежуточного шага сформулировать булевый предикат проверки успеха (`assert result.status === 200`).',
          '- Запрещено переходить к следующей подцели без 100% выполнения предиката.',
        ],
        [
          '- Define explicit boolean assertion predicates for each intermediate subgoal (`assert res.status === 200`).',
          '- Advance to subsequent nodes only upon deterministic predicate satisfaction.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'tool-argument-assertion': {
    id: 'tool-argument-assertion',
    name: 'ToolArgumentAssertionSkill',
    displayName: 'Pre-Invocation Argument Schema Assertion',
    categoryId: 'agentic',
    description: 'Enforces strict JSON schema validation and sanitization on all parameters before tool dispatch.',
    tags: ['agentic', 'tools', 'schema-validation', 'parameters', 'sanitization'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Проверка Аргументов Инструментов (Pre-Invocation Check)',
        'Tool Argument Schema Assertion Directives',
        [
          '- Проверять наличие обязательных полей, типы данных и диапазоны значений до отправки вызова.',
        ],
        [
          '- Validate all required arguments, enum constraints, and string sanitization rules prior to dispatch.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'dynamic-scratchpad-context': {
    id: 'dynamic-scratchpad-context',
    name: 'DynamicScratchpadContextSkill',
    displayName: 'Dynamic Scratchpad State Ledger',
    categoryId: 'agentic',
    description: 'Maintains an immutable state ledger tracking created files, modified variables, and open tasks.',
    tags: ['agentic', 'scratchpad', 'state-ledger', 'tracking', 'context'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Журнал Состояния и Артефактов (State Ledger)',
        'Dynamic Scratchpad & State Ledger Protocol',
        [
          'Вести реестр артефактов:',
          '- `Modified Files`: список измененных путей.',
          '- `Pending Subtasks`: список оставшихся нерешенных шагов.',
          '- `Verified Invariants`: список подтвержденных контрактов.',
        ],
        [
          'Maintain a structured state ledger:',
          '- `Modified Files`: itemized list of updated file paths.',
          '- `Pending Subtasks`: remaining incomplete DAG nodes.',
          '- `Verified Invariants`: validated compiler and runtime assertions.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'fail-fast-self-healing': {
    id: 'fail-fast-self-healing',
    name: 'FailFastSelfHealingSkill',
    displayName: 'Fail-Fast Self-Healing & Crash Recovery',
    categoryId: 'agentic',
    description: 'Catches unrecoverable runtime errors immediately and launches automatic diagnostic self-healing.',
    tags: ['agentic', 'fail-fast', 'self-healing', 'recovery', 'resilience'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Самовосстановление при Сбоях (Self-Healing)',
        'Fail-Fast Self-Healing & Diagnostics Protocol',
        [
          '- При падении инструмента или синтаксической ошибке немедленно изолировать сбой.',
          '- Запустить диагностический шаг: прочитать стек ошибки, локализовать строку дефекта и применить точечный патч.',
        ],
        [
          '- Upon tool crash or compiler syntax error, immediately trap the exception.',
          '- Execute diagnostic self-healing: parse stacktrace, isolate culprit line, and apply atomic regression fix.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'human-in-the-loop-escalation': {
    id: 'human-in-the-loop-escalation',
    name: 'HumanInTheLoopEscalationSkill',
    displayName: 'Human-in-the-Loop Escalation Gate',
    categoryId: 'agentic',
    description: 'Requires explicit human authorization before executing irreversible or destructive operations.',
    tags: ['agentic', 'hitl', 'escalation', 'human-in-the-loop', 'safety', 'destructive'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Шлюз Авторизации Человека (Human-in-the-Loop)',
        'Human-in-the-Loop (HITL) Escalation Directives',
        [
          '- Любые деструктивные операции (удаление БД, сброс прод-конфига, отправка внешних транзакций) требуют явного подтверждения пользователя.',
        ],
        [
          '- High-risk destructive actions (database drops, production deployments, monetary transactions) mandate explicit human sign-off.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'environment-feedback-loop': {
    id: 'environment-feedback-loop',
    name: 'EnvironmentFeedbackLoopSkill',
    displayName: 'Environment Telemetry Feedback Loop',
    categoryId: 'agentic',
    description: 'Feeds real compiler diagnostics, linter output, and test telemetry back into the decision loop.',
    tags: ['agentic', 'feedback-loop', 'telemetry', 'compiler', 'linter'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Обратная Связь от Среды Исполнения',
        'Environmental Telemetry Feedback Integration',
        [
          '- Считать вывод компилятора, линтера и тестов абсолютным источником истины для верификации правоты агента.',
        ],
        [
          '- Treat compiler diagnostics, linter outputs, and test suite results as absolute ground-truth telemetry.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'bounded-search-exploration': {
    id: 'bounded-search-exploration',
    name: 'BoundedSearchExplorationSkill',
    displayName: 'Bounded Search Space Exploration',
    categoryId: 'agentic',
    description: 'Restricts search and discovery queries to tightly bounded, relevant directories and API domains.',
    tags: ['agentic', 'search', 'bounded', 'efficiency', 'tokens'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Ограничение Поискового Пространства',
        'Bounded Search Space Directives',
        [
          '- Ограничивать поиск строго целевыми директориями проекта; не сканировать без необходимости node_modules или бинарные файлы.',
        ],
        [
          '- Restrict file and symbol search strictly to targeted source modules; never scan build artifacts or dependency caches.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'idempotent-execution-contract': {
    id: 'idempotent-execution-contract',
    name: 'IdempotentExecutionContractSkill',
    displayName: 'Idempotent Execution & Determinism Contract',
    categoryId: 'agentic',
    description: 'Guarantees that re-running the same tool call or action multiple times produces identical state without side-effects.',
    tags: ['agentic', 'idempotency', 'determinism', 'reproducibility', 'safety'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Контракт Идемпотентности Операций',
        'Idempotent Execution & State Invariance Contract',
        [
          '- Все генерируемые скрипты и действия обязаны быть строго идемпотентными (повторный запуск не создает дубликатов и не ломает состояние).',
        ],
        [
          '- All generated tool invocations, migrations, and scripts must be strictly idempotent (repeat runs produce identical state without mutation).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
