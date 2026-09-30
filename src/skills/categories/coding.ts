import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const CODING_SKILLS: Record<string, SkillDefinition> = {
  'code-audit-smells': {
    id: 'code-audit-smells',
    name: 'CodeAuditSmellsSkill',
    displayName: 'Code Smell & Anti-Pattern Audit',
    categoryId: 'coding',
    description: 'Audits codebases for architectural smells, high cyclomatic complexity, memory leaks, and anti-patterns.',
    tags: ['coding', 'audit', 'code-smells', 'refactoring', 'clean-code', 'complexity'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Аудит Кода и Поиск Антипаттернов (Code Smell Audit)',
        'Code Smell & Architectural Anti-Pattern Audit',
        [
          '- **Инвентаризация дефектов**: Выявить нарушения принципов SOLID, дублирование логики (DRY) и спагетти-код.',
          '- **Оценка цикломатической сложности**: Найти функции с цикломатической сложностью > 10 и разбить их на модульные чистые функции.',
          '- **Поиск скрытых утечек**: Проверить отсутствие незакрытых подписок, утечек замыканий и висячих таймеров.',
        ],
        [
          '- **Defect Inventory**: Catalog SOLID violations, code duplication (DRY), and god-object anti-patterns.',
          '- **Cyclomatic Complexity Profiling**: Identify functions with cyclomatic complexity > 10 and decompose into pure atomic units.',
          '- **Leak Diagnostics**: Audit for unclosed stream handles, memory-leaking closures, and dangling interval timers.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'type-safety-contracts': {
    id: 'type-safety-contracts',
    name: 'TypeSafetyContractsSkill',
    displayName: 'Strict TypeScript Type Contracts',
    categoryId: 'coding',
    description: 'Eliminates `any`, implementing discriminated unions, branded types, and immutable generics.',
    tags: ['coding', 'typescript', 'types', 'generics', 'type-safety', 'contracts'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Строгие Контракты Типов (TypeScript Type Safety)',
        'Strict TypeScript Type Safety & Contract Architecture',
        [
          '- **Категорический запрет `any`**: Полностью исключить использование типа `any` и небезопасных приведений `as unknown as T`.',
          '- **Discriminated Unions**: Описывать полиморфные состояния через размеченные объединения с полем-дискриминатором `type` или `kind`.',
          '- **Неизменяемость по умолчанию**: Использовать модификаторы `readonly` и `ReadonlyArray` для защиты от мутаций состояния.',
        ],
        [
          '- **Zero `any` Standard**: Strictly prohibit `any` and unsafe type assertions (`as unknown as T`); use precise generics and `unknown`.',
          '- **Discriminated Unions**: Model multi-state domain entities via discriminated unions with exhaustive switch narrowing.',
          '- **Immutability by Default**: Enforce `readonly` properties and `ReadonlyArray` collections across all interface contracts.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'regression-test-specs': {
    id: 'regression-test-specs',
    name: 'RegressionTestSpecsSkill',
    displayName: 'Automated Regression & Property Test Suite',
    categoryId: 'coding',
    description: 'Generates robust Vitest/Jest unit, boundary, and property-based test suites covering 100% of branch logic.',
    tags: ['coding', 'testing', 'unit-tests', 'jest', 'vitest', 'regression', 'qa'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Спецификация Тестов (Vitest / Jest Test Suite)',
        'Automated Test Suite Specification (Vitest / Jest)',
        [
          '- **Структура тестов (AAA)**: Оформлять каждый тест по схеме Arrange -> Act -> Assert.',
          '- **Покрытие краевых случаев**: Включить тесты на `null`, `undefined`, пустые массивы, экстремальные числа и обрывы сети.',
          '- **Изоляция моков**: Мокировать внешние I/O зависимости с проверкой контрактов вызовов.',
        ],
        [
          '- **AAA Test Structure**: Format every test case strictly as Arrange -> Act -> Assert with descriptive BDD `describe/it` blocks.',
          '- **Exhaustive Edge Coverage**: Implement test cases for `null`, `undefined`, empty collections, integer overflow, and network dropouts.',
          '- **Hermetic Mocking**: Mock external I/O boundaries with strict contract verification and reset between suites.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'database-query-optimizer': {
    id: 'database-query-optimizer',
    name: 'DatabaseQueryOptimizerSkill',
    displayName: 'SQL Query & Index Plan Optimizer',
    categoryId: 'coding',
    description: 'Optimizes SQL queries, eliminates Seq Scans with composite B-Tree/GiST indexes, and analyzes EXPLAIN plans.',
    tags: ['coding', 'sql', 'database', 'postgres', 'indexes', 'performance', 'query-optimization'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Оптимизация SQL Запросов и Индексов (EXPLAIN ANALYZE)',
        'SQL Query & Index Optimization Protocol (EXPLAIN ANALYZE)',
        [
          '- **Устранение Seq Scans**: Заменить последовательные сканирования таблиц на эффективные индексные поиски (Index Scan / Index Only Scan).',
          '- **Составные индексы**: Спроектировать составные B-Tree индексы с правильным порядком колонок: `[Equality Columns -> Range Columns]`.',
          '- **Борьба с проблемой N+1**: Переписать множественные запросы в циклах на `JOIN` или групповые выборки `WHERE id IN (...)`.',
        ],
        [
          '- **Eliminate Sequential Scans**: Replace costly full table scans with high-efficiency Index Scans and Index-Only Scans.',
          '- **Composite Index Design**: Order composite index columns according to the equality-then-range rule: `(equality_cols, range_cols)`.',
          '- **N+1 Query Elimination**: Consolidate repetitive loop queries into single-roundtrip batch `JOIN` or `IN (...)` queries.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'concurrency-race-detector': {
    id: 'concurrency-race-detector',
    name: 'ConcurrencyRaceDetectorSkill',
    displayName: 'Concurrency & Race Condition Hardener',
    categoryId: 'coding',
    description: 'Identifies race conditions, lost updates, and deadlocks, implementing atomic operations and distributed locks.',
    tags: ['coding', 'concurrency', 'race-condition', 'mutex', 'distributed-lock', 'deadlock', 'threads'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Аудит Конкурентности и Защита от Race Conditions',
        'Concurrency & Race Condition Hardening Protocol',
        [
          '- **Атомарность операций (CAS / Locks)**: Использовать атомарные операции Compare-And-Swap или транзакционные блокировки `SELECT ... FOR UPDATE`.',
          '- **Распределенные локи**: Для многонодовых сред применять проверенные алгоритмы (например, Redlock с TTL и детерминированным освобождением).',
          '- **Предотвращение Deadlock**: Всегда захватывать множественные блокировки в строго детерминированном глобальном порядке.',
        ],
        [
          '- **Atomic Mutations (CAS / Row Locks)**: Implement Compare-And-Swap (CAS) or transactional pessimistic `SELECT ... FOR UPDATE` locks.',
          '- **Distributed Locking**: Deploy battle-tested distributed locks with TTL leases and guaranteed release in `finally` blocks.',
          '- **Deadlock Prevention**: Acquire multiple lock resources in a globally deterministic lexicographical order.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'api-idempotency-keys': {
    id: 'api-idempotency-keys',
    name: 'ApiIdempotencyKeysSkill',
    displayName: 'API Idempotency Key Protocol',
    categoryId: 'coding',
    description: 'Implements robust idempotency headers (`Idempotency-Key`), caching responses to prevent duplicate billing or side-effects.',
    tags: ['coding', 'idempotency', 'api', 'http', 'billing', 'payments', 'rest'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Протокол Идемпотентности API (Idempotency-Key Header)',
        'API Idempotency Key Architecture Protocol',
        [
          '- **Заголовок `Idempotency-Key`**: Принимать уникальный UUID операции от клиента в HTTP-заголовке.',
          '- **Атомарная фиксация ключа**: Записывать ключ в Redis/БД со статусом `IN_PROGRESS` с TTL (24 часа).',
          '- **Кэширование ответа**: При повторном запросе с тем же ключом возвращать сохраненный ответ `200 OK` без повторного списания или мутации.',
        ],
        [
          '- **Idempotency Header Contract**: Ingest unique client-generated UUID in `Idempotency-Key` HTTP header.',
          '- **Atomic Key Locking**: Atomically reserve the key in cache with state `IN_PROGRESS` and 24h lease TTL.',
          '- **Replay Cached Response**: Upon detecting duplicate keys, replay the persisted previous response with header `Idempotent-Replay: true`.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'clean-architecture-hexagonal': {
    id: 'clean-architecture-hexagonal',
    name: 'CleanArchitectureHexagonalSkill',
    displayName: 'Hexagonal / Ports & Adapters Architecture',
    categoryId: 'coding',
    description: 'Decouples business domain entities from external frameworks, databases, and UI via Ports and Adapters.',
    tags: ['coding', 'clean-architecture', 'hexagonal', 'ddd', 'domain', 'ports-and-adapters'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Гексагональная Архитектура (Ports and Adapters)',
        'Hexagonal / Ports & Adapters Architecture Protocol',
        [
          '- **Изоляция доменного ядра (Domain Core)**: Доменная логика и сущности не должны иметь зависимостей от фреймворков и БД.',
          '- **Порты (Ports)**: Описать все взаимодействия с внешним миром через интерфейсы (Driven & Driving Ports).',
          '- **Адаптеры (Adapters)**: Реализовать конкретные адаптеры (PostgresRepository, StripeGateway, HttpController), реализующие порты.',
        ],
        [
          '- **Pure Domain Core**: Zero external dependencies in core domain entities and pure business use cases.',
          '- **Interface Ports**: Define driving (incoming use case) and driven (outgoing infrastructure) interfaces.',
          '- **Modular Adapters**: Implement concrete infrastructure adapters (SQL repository, REST controller, Queue listener) conforming to ports.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'memory-leak-profiler': {
    id: 'memory-leak-profiler',
    name: 'MemoryLeakProfilerSkill',
    displayName: 'Memory Leak & Heap Snapshot Profiler',
    categoryId: 'coding',
    description: 'Profiles heap allocations, identifies retaining trees, detached DOM nodes, and unbounded cache growth.',
    tags: ['coding', 'memory', 'heap', 'profiler', 'v8', 'gc', 'performance'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Профилирование Памяти и Поиск Утечек (Heap Profiler)',
        'Memory Leak & Heap Allocation Profiling Protocol',
        [
          '- **Анализ графа удержания (Retaining Tree)**: Найти корневые ссылки (GC Roots), не дающие сборщику мусора освободить память.',
          '- **Ограничение размера кэшей**: Заменить неограниченные `Map` / `Set` на LRU-кэши со строгим `maxSize` и `TTL`.',
          '- **Очистка слушателей событий**: Гарантировать вызов `.removeEventListener()` или `cleanup` функций при размонтировании компонентов.',
        ],
        [
          '- **Retaining Tree Diagnostics**: Trace GC root paths preventing unreachable objects from being collected by the garbage collector.',
          '- **Bounded Cache Pruning**: Replace unbounded in-memory maps with LRU caches enforcing strict `maxSize` and `ttl` eviction.',
          '- **Event Listener Lifecycle**: Ensure symmetrical deregistration of event subscriptions and WebSocket handlers in lifecycle cleanups.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'algorithmic-big-o-tuner': {
    id: 'algorithmic-big-o-tuner',
    name: 'AlgorithmicBigOTunerSkill',
    displayName: 'Algorithmic Complexity & Big-O Optimizer',
    categoryId: 'coding',
    description: 'Refactors inefficient algorithms, reducing quadratic $\\mathcal{O}(N^2)$ bottlenecks down to linear $\\mathcal{O}(N)$ or logarithmic $\\mathcal{O}(\\log N)$.',
    tags: ['coding', 'algorithms', 'big-o', 'complexity', 'performance', 'data-structures'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Оптимизация Алгоритмической Сложности (Big-O)',
        'Algorithmic Complexity & Big-O Optimization Protocol',
        [
          '- **Выбор оптимальных структур данных**: Заменить линейный поиск в массивах $\\mathcal{O}(N)$ на поиск в хеш-таблицах или Set $\\mathcal{O}(1)$.',
          '- **Устранение вложенных циклов**: Переписать алгоритмы со сложностью $\\mathcal{O}(N^2)$ на $\\mathcal{O}(N \\log N)$ или $\\mathcal{O}(N)$ с использованием двух указателей или префиксных сумм.',
          '- **Оценка потребления памяти**: Рассчитать пространственную сложность $\\mathcal{O}(1)$ vs $\\mathcal{O}(N)$ и минимизировать аллокации.',
        ],
        [
          '- **Optimal Data Structure Selection**: Replace $\\mathcal{O}(N)$ array lookups with $\\mathcal{O}(1)$ HashMaps or HashSets.',
          '- **Nested Loop Elimination**: Refactor quadratic $\\mathcal{O}(N^2)$ algorithms into $\\mathcal{O}(N \\log N)$ divide-and-conquer or $\\mathcal{O}(N)$ two-pointer sweeps.',
          '- **Space Complexity Optimization**: Minimize memory allocations and evaluate in-place $\\mathcal{O}(1)$ algorithmic alternatives.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'secure-crypto-vault': {
    id: 'secure-crypto-vault',
    name: 'SecureCryptoVaultSkill',
    displayName: 'Cryptographic Security & Key Vault Standard',
    categoryId: 'coding',
    description: 'Implements modern cryptography: AES-256-GCM authenticated encryption, Argon2id password hashing, and constant-time comparisons.',
    tags: ['coding', 'crypto', 'security', 'encryption', 'hashing', 'argon2', 'aes'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Криптографические Стандарты Безопасности (Crypto Vault)',
        'Cryptographic Standards & Key Vault Protocol',
        [
          '- **Аутентифицированное шифрование**: Использовать алгоритм AES-256-GCM или ChaCha20-Poly1305 с уникальным случайным IV/Nonce для каждой операции.',
          '- **Хеширование паролей**: Применять Argon2id или bcrypt с солью; категорически запрещено использовать MD5 или SHA-256 для паролей.',
          '- **Защита от атак по времени**: Использовать функции сравнения с постоянным временем (`crypto.timingSafeEqual`) для проверки подписей и HMAC.',
        ],
        [
          '- **Authenticated Encryption**: Deploy AES-256-GCM or ChaCha20-Poly1305 with cryptographically random initialization vectors (IV) per record.',
          '- **Password Hashing Standard**: Mandate Argon2id or scrypt with dynamic memory cost parameters; strictly prohibit unsalted hashes.',
          '- **Constant-Time Verification**: Use `crypto.timingSafeEqual` for all HMAC, auth token, and signature verifications to prevent timing attacks.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'error-handling-resilience': {
    id: 'error-handling-resilience',
    name: 'ErrorHandlingResilienceSkill',
    displayName: 'Typed Result<T, E> Error Architecture',
    categoryId: 'coding',
    description: 'Implements functional typed errors (Result<T, E> / Either) with exhaustive pattern matching and zero unhandled exceptions.',
    tags: ['coding', 'error-handling', 'result', 'exceptions', 'resilience', 'functional'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Архитектура Типизированных Ошибок (Result<T, E>)',
        'Typed Result<T, E> Error Architecture Protocol',
        [
          '- **Явный тип возврата**: Использовать тип `Result<T, AppError>` вместо непредсказуемых `throw new Error()`.',
          '- **Иерархия доменных ошибок**: Описать все возможные типы сбоев через типизированные структуры (`NotFoundError`, `ValidationError`, `TimeoutError`).',
          '- **Исчерпывающий pattern matching**: Обязать вызывающий код обрабатывать каждую ветку ошибки компилятором.',
        ],
        [
          '- **Explicit Result Monad**: Return typed `Result<T, AppError>` instead of throwing untyped runtime exceptions.',
          '- **Domain Error Hierarchy**: Enumerate distinct domain error classes (`NotFoundError`, `PermissionDeniedError`, `ConflictError`).',
          '- **Exhaustive Matching**: Require callers to handle both Success and Failure branches through exhaustive pattern matching.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'graphql-schema-designer': {
    id: 'graphql-schema-designer',
    name: 'GraphqlSchemaDesignerSkill',
    displayName: 'GraphQL Schema & DataLoader Batcher',
    categoryId: 'coding',
    description: 'Designs schema-first GraphQL APIs with Relay-style pagination, custom scalars, and DataLoader N+1 batching.',
    tags: ['coding', 'graphql', 'api', 'dataloader', 'schema', 'relay', 'pagination'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Спецификация Схемы GraphQL и Резолверов',
        'GraphQL Schema & DataLoader Architecture Spec',
        [
          '- **Schema-First определение**: Описать SDL-схему со строгими типами, кастомными скалярами (`DateTime`, `UUID`) и мутациями.',
          '- **Пагинация по спецификации Relay**: Реализовать курсорную пагинацию `edges`, `node`, `pageInfo { hasNextPage, endCursor }`.',
          '- **DataLoader для решения N+1**: Обязательно снабдить все связанные поля батч-загрузчиками DataLoader.',
        ],
        [
          '- **Schema-First SDL**: Define strict SDL schema models with custom scalar types (`DateTime`, `JSON`) and mutation payloads.',
          '- **Relay Connection Pagination**: Enforce cursor-based pagination with `edges`, `node`, and `pageInfo { hasNextPage, endCursor }`.',
          '- **DataLoader N+1 Mitigation**: Implement DataLoader batching and per-request memoization across all relation resolvers.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'ci-cd-pipeline-automation': {
    id: 'ci-cd-pipeline-automation',
    name: 'CiCdPipelineAutomationSkill',
    displayName: 'Hardened GitHub Actions CI/CD Pipeline',
    categoryId: 'coding',
    description: 'Constructs automated GitHub Actions workflows: matrix testing, dependency caching, SAST security audits, and zero-downtime deployment.',
    tags: ['coding', 'ci-cd', 'github-actions', 'devops', 'automation', 'pipeline'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Спецификация CI/CD Конвейера (GitHub Actions)',
        'Hardened GitHub Actions CI/CD Workflow Spec',
        [
          '- **Этапы конвейера**: Настроить параллельные джобы: `lint` -> `typecheck` -> `test (matrix)` -> `security-audit` -> `build` -> `deploy`.',
          '- **Кэширование зависимостей**: Использовать `actions/cache` для node_modules и билд-кэша для сокращения времени выполнения.',
          '- **Безопасность секретов**: Передавать секреты только через GitHub Secrets с минимальными правами токена `GITHUB_TOKEN`.',
        ],
        [
          '- **Pipeline Stages**: Structure parallel jobs: `lint` -> `typecheck` -> `test (matrix)` -> `security-sast` -> `build` -> `deploy-staging`.',
          '- **Dependency Caching**: Leverage `actions/cache` for package dependencies and build artifacts to maximize throughput.',
          '- **Least-Privilege Secrets**: Restrict default `GITHUB_TOKEN` permissions to read-only; scope deploy credentials to isolated environments.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'zero-downtime-migration': {
    id: 'zero-downtime-migration',
    name: 'ZeroDowntimeMigrationSkill',
    displayName: 'Zero-Downtime Database Migration',
    categoryId: 'coding',
    description: 'Designs Expand-and-Contract database schema migrations allowing zero downtime during breaking schema changes.',
    tags: ['coding', 'database', 'migration', 'zero-downtime', 'expand-contract', 'schema'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Паттерн Бесшовных Миграций БД (Expand and Contract)',
        'Zero-Downtime Database Migration Protocol (Expand & Contract)',
        [
          '- **Фаза 1 (Expand)**: Добавить новую колонку/таблицу с поддержкой `NULL` или дефолтным значением без блокировки существующих запросов.',
          '- **Фаза 2 (Dual-Write)**: Код приложения начинает писать данные одновременно в старую и новую колонки.',
          '- **Фаза 3 (Backfill & Switch)**: Фоновый перенос исторических данных и переключение чтения на новую колонку.',
          '- **Фаза 4 (Contract)**: Удаление старой неиспользуемой колонки в отдельном релизе.',
        ],
        [
          '- **Phase 1 (Expand)**: Add new column/table as nullable with safe defaults without locking live tables.',
          '- **Phase 2 (Dual-Write)**: Application dual-writes to both legacy and new structures concurrently.',
          '- **Phase 3 (Backfill & Cutover)**: Backfill historical records asynchronously and switch read traffic to new schema.',
          '- **Phase 4 (Contract)**: Safely drop legacy columns in a subsequent release after validation.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'tdd-red-green-refactor': {
    id: 'tdd-red-green-refactor',
    name: 'TddRedGreenRefactorSkill',
    displayName: 'Strict Test-Driven Development (TDD Loop)',
    categoryId: 'coding',
    description: 'Enforces strict TDD discipline: failing test first (Red), minimal passing implementation (Green), and design cleanup (Refactor).',
    tags: ['coding', 'tdd', 'testing', 'unit-tests', 'red-green-refactor', 'clean-code'],
    transform: createStandardSkillTransform(
      'protocol',
      'Протокол Разработки через Тестирование (TDD Red-Green-Refactor)',
      'Strict Test-Driven Development (TDD) Red-Green-Refactor Protocol',
      [
        '- **Шаг 1 (Red)**: Написать изолированный юнит-тест, проверяющий желаемое поведение, и убедиться, что он падает с понятной ошибкой.',
        '- **Шаг 2 (Green)**: Написать минимально необходимый объем рабочего кода, чтобы тест стал зеленым (без преждевременной оптимизации).',
        '- **Шаг 3 (Refactor)**: Устранить дублирование, улучшить читаемость и архитектуру кода, сохраняя все тесты проходящими.',
      ],
      [
        '- **Phase 1 (Red)**: Author a failing unit test asserting the exact desired contract; verify it fails with explicit diagnostic assertion messages.',
        '- **Phase 2 (Green)**: Implement the bare minimum executable code required to satisfy the assertion without premature over-engineering.',
        '- **Phase 3 (Refactor)**: Clean code smells, extract pure functions, and harden types while preserving a 100% green test suite.',
      ]
    ),
  },

  'ast-parser-transformer': {
    id: 'ast-parser-transformer',
    name: 'AstParserTransformerSkill',
    displayName: 'Abstract Syntax Tree (AST) Codemod & Transformation',
    categoryId: 'coding',
    description: 'Designs robust AST codemods using TypeScript Compiler API, Babel, or jscodeshift with tree traversal and zero text regex bugs.',
    tags: ['coding', 'ast', 'compiler', 'babel', 'typescript', 'codemod', 'metaprogramming'],
    transform: createStandardSkillTransform(
      'protocol',
      'Протокол Трансформации AST (Abstract Syntax Tree Codemod)',
      'Abstract Syntax Tree (AST) Parsing & Transformation Architecture',
      [
        '- **Парсинг в AST**: Запретить использование регулярок для модификации кода; парсить исходники в валидное дерево узлов (AST).',
        '- **Паттерн Visitor**: Обходить дерево с помощью посетителя (Visitor), проверяя типы узлов (`ts.isCallExpression`, `isIdentifier`).',
        '- **Безопасная кодогенерация**: Генерировать модифицированный код с сохранением комментариев и форматирования (Prettier / Printer API).',
      ],
      [
        '- **AST-First Parsing**: Forbid fragile regex substitutions; parse source text into fully typed Abstract Syntax Tree representation.',
        '- **Visitor Pattern Traversal**: Traverse AST nodes safely using type guards (`ts.isCallExpression`, `isPropertyAccessExpression`).',
        '- **Preserved Source Synthesis**: Emit transformed source trees with round-trip comment retention and formatter formatting.',
      ]
    ),
  },

  'concurrency-race-condition-auditor': {
    id: 'concurrency-race-condition-auditor',
    name: 'ConcurrencyRaceConditionAuditorSkill',
    displayName: 'Concurrency & Race Condition Elimination',
    categoryId: 'coding',
    description: 'Audits multi-threaded and asynchronous code for race conditions, deadlocks, TOCTOU vulnerabilities, and unhandled promise states.',
    tags: ['coding', 'concurrency', 'async', 'deadlock', 'race-condition', 'threads'],
    transform: createStandardSkillTransform(
      'protocol',
      'Аудит Конкурентности и Устранение Race Conditions',
      'Concurrency Safety & Race Condition Audit Protocol',
      [
        '- **Поиск гонок состояний (Race Conditions)**: Проверить наличие TOCTOU (Time-of-Check to Time-of-Use) и несинхронизированного доступа к общим переменным.',
        '- **Атомарные операции и мьютексы**: Защитить критические секции с помощью атомарных операций, распределенных блокировок (Redis Redlock) или очередей.',
        '- **Безопасный Promise.allSettled**: Заменить `Promise.all` на `Promise.allSettled` там, где ошибка одной задачи не должна обрывать остальные.',
      ],
      [
        '- **TOCTOU & State Drift Audit**: Inspect non-atomic shared mutable state access across asynchronous turns and threaded workloads.',
        '- **Synchronization Primitives**: Guard critical execution paths with Mutexes, optimistic concurrency versioning, or serial execution queues.',
        '- **Resilient Aggregation**: Replace fragile `Promise.all` with `Promise.allSettled` to isolate individual asynchronous task failures.',
      ]
    ),
  },

  'sql-query-performance-tuner': {
    id: 'sql-query-performance-tuner',
    name: 'SqlQueryPerformanceTunerSkill',
    displayName: 'PostgreSQL EXPLAIN ANALYZE Query Tuner',
    categoryId: 'coding',
    description: 'Diagnoses slow database queries via EXPLAIN ANALYZE, eliminating Seq Scans, nested loops, N+1 queries, and index bloat.',
    tags: ['coding', 'sql', 'postgres', 'query-optimization', 'explain-analyze', 'indexing'],
    transform: createStandardSkillTransform(
      'protocol',
      'Оптимизация SQL-Запросов (EXPLAIN ANALYZE Tuning)',
      'PostgreSQL Query Execution Plan & Index Optimization Protocol',
      [
        '- **Анализ плана выполнения**: Интерпретировать вывод `EXPLAIN (ANALYZE, BUFFERS)`: найти Sequential Scan на больших таблицах и дорогостоящие Hash Joins.',
        '- **Индексная стратегия**: Разработать B-Tree / GIN / BRIN составные индексы с покрывающими колонками (`INCLUDE`), избегая избыточных индексов.',
        '- **Устранение N+1 проблем**: Переписать циклы запросов на эффективные `JOIN`, `LATERAL` выборки или пакетные CTE.',
      ],
      [
        '- **Execution Plan Diagnostics**: Parse `EXPLAIN (ANALYZE, BUFFERS)` identifying costly Sequential Scans, spills to disk, and Cartesian joins.',
        '- **Strategic Index Design**: Architect composite B-Tree, partial, or covering (`INCLUDE`) indexes matching exact WHERE/ORDER BY query filters.',
        '- **N+1 Batch Elimination**: Rewrite ORM iterative subqueries into unified CTE window functions or parameterized batch fetches.',
      ]
    ),
  },

  'distributed-tracing-opentelemetry': {
    id: 'distributed-tracing-opentelemetry',
    name: 'DistributedTracingOpentelemetrySkill',
    displayName: 'OpenTelemetry Distributed Tracing & Spans',
    categoryId: 'coding',
    description: 'Instruments applications with OpenTelemetry standard spans, semantic attributes, baggage context propagation, and error records.',
    tags: ['coding', 'opentelemetry', 'otel', 'tracing', 'observability', 'metrics'],
    transform: createStandardSkillTransform(
      'protocol',
      'Инструментирование Распределенной Трассировки (OpenTelemetry)',
      'OpenTelemetry Distributed Tracing & Context Propagation Protocol',
      [
        '- **Семантические атрибуты OTel**: Использовать официальные конвенции OpenTelemetry (`http.status_code`, `db.system`, `rpc.method`).',
        '- **Проброс контекста (W3C TraceContext)**: Извлекать и передавать заголовки `traceparent` и `tracestate` через границы HTTP и gRPC вызовов.',
        '- **Обработка исключений в спанах**: При возникновении ошибки вызывать `span.recordException(err)` и устанавливать `span.setStatus({ code: SpanStatusCode.ERROR })`.',
      ],
      [
        '- **OTel Semantic Conventions**: Standardize span attributes matching canonical OpenTelemetry schemas (`http.request.method`, `db.statement`).',
        '- **W3C TraceContext Propagation**: Inject and extract `traceparent` and `tracestate` across HTTP, gRPC, and messaging boundaries.',
        '- **Error Telemetry Recording**: On exceptions, execute `span.recordException(err)` and flag `span.setStatus({ code: SpanStatusCode.ERROR })`.',
      ]
    ),
  },

  'resilience-circuit-breaker-retry': {
    id: 'resilience-circuit-breaker-retry',
    name: 'ResilienceCircuitBreakerRetrySkill',
    displayName: 'Circuit Breaker, Jitter & Retry Resilience',
    categoryId: 'coding',
    description: 'Implements production fault tolerance: 3-state Circuit Breaker (Closed, Open, Half-Open), exponential backoff with full jitter, and bulkheads.',
    tags: ['coding', 'resilience', 'circuit-breaker', 'retry', 'jitter', 'fault-tolerance'],
    transform: createStandardSkillTransform(
      'protocol',
      'Паттерн Отказоустойчивости (Circuit Breaker & Exponential Jitter)',
      'Production Circuit Breaker & Exponential Jitter Resilience Protocol',
      [
        '- **3 состояния автомата**: Реализовать логику `Closed` (норма), `Open` (аварийный разрыв цепи при 50% ошибок), `Half-Open` (пробные запросы).',
        '- **Экспоненциальная задержка с джиттером**: Формула `sleep = min(max_delay, base * 2^attempt) * random(0.5, 1.5)` для защиты от эффекта громоподобного стада (Thundering Herd).',
        '- **Деградированный fallback**: Предусмотреть возврат кэшированных данных или безопасного ответа по умолчанию при открытом предохранителе.',
      ],
      [
        '- **Tri-State Circuit Machine**: Enforce transitions across `Closed` (healthy), `Open` (fast-fail on error threshold), and `Half-Open` (canary probe).',
        '- **Exponential Backoff with Full Jitter**: Calculate retry delays dynamically via `min(max_wait, base * 2^attempt) * uniform(0.5, 1.5)`.',
        '- **Graceful Fallback Envelope**: Return cached stale responses or degraded safe defaults when downstream services are tripped.',
      ]
    ),
  },

  'wasm-rust-interop-bridge': {
    id: 'wasm-rust-interop-bridge',
    name: 'WasmRustInteropBridgeSkill',
    displayName: 'WebAssembly (WASM) & Rust Zero-Copy Interop',
    categoryId: 'coding',
    description: 'Architects high-performance Rust WebAssembly modules with `wasm-bindgen`, typed arrays, and zero-copy shared memory buffers.',
    tags: ['coding', 'wasm', 'rust', 'webassembly', 'performance', 'memory'],
    transform: createStandardSkillTransform(
      'protocol',
      'Мост Производительности WebAssembly (Rust wasm-bindgen)',
      'Rust WebAssembly (WASM) & Zero-Copy Interop Architecture',
      [
        '- **Zero-Copy передача памяти**: Передавать большие массивы данных через прямые указатели на линейную память WASM (`Uint8Array` views).',
        '- **Контракт wasm-bindgen**: Использовать атрибуты `#[wasm_bindgen]` со строгими типами для исключения накладных расходов сериализации JSON.',
        '- **Управление жизненным циклом**: Явно вызывать `.free()` для аллоцированных структур Rust при сборке мусора в JavaScript.',
      ],
      [
        '- **Zero-Copy Buffer Sharing**: Exchange massive tabular payloads directly via linear memory views (`Uint8Array`) without JSON parsing overhead.',
        '- **Strict wasm-bindgen Contracts**: Decorate native methods with typed `#[wasm_bindgen]` signatures ensuring low-overhead FFI crossings.',
        '- **Explicit Memory Lifecycle**: Implement RAII patterns and deterministic memory teardown on the JavaScript runtime side.',
      ]
    ),
  },

  'css-grid-flexbox-fluid-layout': {
    id: 'css-grid-flexbox-fluid-layout',
    name: 'CssGridFlexboxFluidLayoutSkill',
    displayName: 'Fluid CSS Grid, Subgrid & Zero-CLS Layout',
    categoryId: 'coding',
    description: 'Architects modern fluid frontend layouts using CSS Grid, `subgrid`, container queries `@container`, and `clamp()` without Cumulative Layout Shift.',
    tags: ['coding', 'css', 'grid', 'subgrid', 'fluid', 'cls', 'frontend'],
    transform: createStandardSkillTransform(
      'protocol',
      'Архитектура Адаптивного CSS Grid и Zero Cumulative Layout Shift',
      'Modern Fluid CSS Grid, Subgrid & Zero-CLS Layout Architecture',
      [
        '- **Контейнерные запросы (@container)**: Стилизовать компоненты относительно размера их родительского контейнера, а не глобального окна viewport.',
        '- **Использование Subgrid**: Выравнивать вложенные элементы карточек по единой сетке родителя через `grid-template-rows: subgrid`.',
        '- **Zero Cumulative Layout Shift (CLS)**: Фиксировать соотношение сторон через `aspect-ratio` и резервировать место под шрифты и изображения.',
      ],
      [
        '- **Container Query Modularization**: Style components responsively based on container boundaries using `@container` rules.',
        '- **CSS Subgrid Alignment**: Leverage `grid-template-rows: subgrid` to ensure pixel-perfect vertical alignment across card layouts.',
        '- **Zero Cumulative Layout Shift (CLS)**: Lock aspect ratios via `aspect-ratio` and allocate reserved layout geometry for async media.',
      ]
    ),
  },

  'websocket-reconnect-backoff': {
    id: 'websocket-reconnect-backoff',
    name: 'WebsocketReconnectBackoffSkill',
    displayName: 'Resilient WebSocket Lifecycle & Heartbeat Protocol',
    categoryId: 'coding',
    description: 'Implements production WebSocket client/server architecture with bidirectional ping-pong heartbeats, message queues, and reconnect backoff.',
    tags: ['coding', 'websocket', 'realtime', 'heartbeat', 'reconnect', 'networking'],
    transform: createStandardSkillTransform(
      'protocol',
      'Протокол Отказоустойчивого WebSocket (Heartbeats & Reconnect Queue)',
      'Resilient WebSocket Lifecycle & Heartbeat Protocol',
      [
        '- **Heartbeat Ping-Pong**: Каждые 30 секунд отправлять ping; если pong не получен в течение 10 секунд — признать соединение мертвым и закрыть сокет.',
        '- **Очередь сообщений при обрыве**: Буферизовать исходящие сообщения в локальную очередь (до 100 сообщений) во время переподключения.',
        '- **Бесшовный Reconnect**: Переподключаться с нарастающей задержкой и автоматически воспроизводить сообщения из буфера после рукопожатия.',
      ],
      [
        '- **Heartbeat Ping-Pong Protocol**: Dispatch periodic ping frames; close socket and trigger reconnect if pong is missing within 10 seconds.',
        '- **Offline Message Buffer**: Queue outbound payloads locally during disconnections with configurable backpressure caps.',
        '- **Seamless Reconnection Handshake**: Re-establish connection with exponential backoff and replay queued messages in strict FIFO order.',
      ]
    ),
  },

  'clean-architecture-hexagonal-ports': {
    id: 'clean-architecture-hexagonal-ports',
    name: 'CleanArchitectureHexagonalPortsSkill',
    displayName: 'Hexagonal Ports & Adapters Architecture',
    categoryId: 'coding',
    description: 'Separates business logic from I/O frameworks using Ports & Adapters (Hexagonal Architecture) with dependency inversion.',
    tags: ['coding', 'architecture', 'hexagonal', 'ports-and-adapters', 'clean-architecture', 'domain'],
    transform: createStandardSkillTransform(
      'protocol',
      'Гексагональная Архитектура (Ports & Adapters)',
      'Hexagonal (Ports & Adapters) Architectural Pattern',
      [
        '- **Изоляция домена**: Бизнес-логика (Entities & Use Cases) не должна иметь зависимостей от сторонних фреймворков, баз данных или протоколов HTTP.',
        '- **Порты как интерфейсы**: Входные (Driver) и выходные (Driven) порты определяются строго как интерфейсы внутри доменного слоя.',
        '- **Адаптеры как реализация**: Базы данных (Postgres, Mongo) и внешние API реализуются в слое инфраструктуры через адаптеры к портам.',
      ],
      [
        '- **Pristine Core Isolation**: Keep domain entities and use cases completely free from HTTP frameworks, ORMs, or third-party SDKs.',
        '- **Inbound & Outbound Ports**: Define primary (driver) and secondary (driven) interfaces strictly within the core domain boundary.',
        '- **Infrastructure Adapters**: Encapsulate concrete SQL engines, cloud queues, and REST clients inside swappable adapter modules.',
      ]
    ),
  },

  'memory-heap-profiling-optimizer': {
    id: 'memory-heap-profiling-optimizer',
    name: 'MemoryHeapProfilingOptimizerSkill',
    displayName: 'V8 Heap Profiling & Garbage Collection Tuning',
    categoryId: 'coding',
    description: 'Diagnoses JavaScript/Node.js memory leaks using heap snapshots, retained object trees, and object pooling to reduce GC pauses.',
    tags: ['coding', 'memory', 'v8', 'heap', 'profiling', 'garbage-collection', 'performance'],
    transform: createStandardSkillTransform(
      'protocol',
      'Профилирование Памяти V8 и Устранение Утечек (Heap Profiling)',
      'V8 Engine Heap Profiling & Memory Leak Mitigation Protocol',
      [
        '- **Анализ дерева удержания (Retained Size)**: Найти объекты, удерживаемые глобальными ссылками, забытыми Event Listeners или замыканиями.',
        '- **Пул объектов (Object Pooling)**: В высоконагруженных циклах переиспользовать существующие объекты вместо постоянного создания новых, снижая давление на GC.',
        '- **Проверка WeakRef и WeakMap**: Использовать `WeakMap` для кэшей, чтобы сборщик мусора мог свободно освобождать объекты при отсутствии активных ссылок.',
      ],
      [
        '- **Retained Object Diagnostics**: Isolate memory leaks caused by lingering event listeners, detached DOM trees, and uncollected closure scopes.',
        '- **Object Pooling for High-Throughput**: Re-use object instances across hot compute loops to eliminate GC pressure and stop-the-world pauses.',
        '- **Weak References**: Employ `WeakMap` and `WeakSet` collections for caching to allow effortless garbage collection of abandoned keys.',
      ]
    ),
  },

  'secure-input-sanitization-xss-sqli': {
    id: 'secure-input-sanitization-xss-sqli',
    name: 'SecureInputSanitizationXssSqliSkill',
    displayName: 'Defense-in-Depth Input Sanitization & XSS/SQLi Defense',
    categoryId: 'coding',
    description: 'Enforces parameterized SQL queries, DOMPurify HTML sanitization, strict CSP nonces, and context-aware output encoding.',
    tags: ['coding', 'security', 'xss', 'sqli', 'sanitization', 'owasp', 'defense'],
    transform: createStandardSkillTransform(
      'protocol',
      'Эшелонированная Санитизация Ввода (Защита от XSS и SQLi)',
      'Defense-in-Depth Input Sanitization & XSS/SQLi Elimination',
      [
        '- **Параметризованные запросы**: Категорический запрет конкатенации строк при формировании SQL-запросов; использовать только `$1, $2` плейсхолдеры.',
        '- **Санитизация DOMPurify**: Перед рендерингом любого внешнего HTML пропускать строку через DOMPurify с белым списком безопасных тегов.',
        '- **Контекстное экранирование**: Экранировать спецсимволы в зависимости от контекста вставки (HTML-атрибут, текст, JavaScript-переменная, URL).',
      ],
      [
        '- **Parameterized SQL Invariant**: Strictly forbid string interpolation in SQL clauses; enforce parameterized query drivers exclusively.',
        '- **DOMPurify HTML Scrubbing**: Pass all user-rendered HTML through DOMPurify with an explicit minimal allowlist of tags and attributes.',
        '- **Context-Aware Output Encoding**: Apply distinct encoding rules depending on placement (HTML body, attribute value, script block, query string).',
      ]
    ),
  },

  'api-idempotency-key-pattern': {
    id: 'api-idempotency-key-pattern',
    name: 'ApiIdempotencyKeyPatternSkill',
    displayName: 'Distributed Idempotency Key Lock & Replay Pattern',
    categoryId: 'coding',
    description: 'Designs bulletproof distributed idempotency using Redis SETNX with TTL, atomic request locking, and cached response replay.',
    tags: ['coding', 'idempotency', 'redis', 'api', 'distributed-systems', 'transactions'],
    transform: createStandardSkillTransform(
      'protocol',
      'Паттерн Идемпотентных API Запросов (Distributed Idempotency)',
      'Distributed Idempotency Key Locking & Replay Architecture',
      [
        '- **Блокировка по Idempotency-Key**: При получении запроса с заголовком `Idempotency-Key` попытаться захватить распределенный lock в Redis (`SET key "processing" NX EX 120`).',
        '- **Обработка параллельных дубликатов**: Если ключ уже находится в состоянии `processing`, вернуть статус `409 Conflict` или заблокировать поток до завершения.',
        '- **Кэширование и возврат оригинального ответа**: После успешного выполнения сохранить статус-код и тело ответа в Redis на 24 часа для мгновенного реплея.',
      ],
      [
        '- **Distributed Idempotency Lock**: Atomically acquire execution lock via Redis `SET key "in_flight" NX EX 120` using request idempotency header.',
        '- **Concurrent In-Flight Handling**: Emit HTTP 409 Conflict if an identical request is actively processing, preventing dual-charging.',
        '- **Deterministic Response Replay**: Cache terminal response code, headers, and payload for 24 hours to replay on identical retried keys.',
      ]
    ),
  },

  'graphql-dataloader-batching': {
    id: 'graphql-dataloader-batching',
    name: 'GraphqlDataloaderBatchingSkill',
    displayName: 'GraphQL DataLoader Batching & Memoization',
    categoryId: 'coding',
    description: 'Eliminates GraphQL N+1 execution bottlenecks by coalescing individual field resolver queries into single batched database lookups.',
    tags: ['coding', 'graphql', 'dataloader', 'batching', 'n-plus-one', 'performance'],
    transform: createStandardSkillTransform(
      'protocol',
      'Пакетная Загрузка GraphQL через DataLoader (Устранение N+1)',
      'GraphQL DataLoader Batching & Per-Request Memoization Protocol',
      [
        '- **Пакетная функция загрузки**: Создавать DataLoader с функцией `batchFunction(keys: readonly K[]): Promise<V[]>`, возвращающей результаты в том же порядке.',
        '- **Изоляция контекста запроса**: Создавать новые экземпляры DataLoader на каждый входящий HTTP-запрос для предотвращения утечек данных между пользователями.',
        '- **Мемоизация в рамках запроса**: Использовать встроенный кэш DataLoader для устранения повторных запросов одного и того же ID за один запрос.',
      ],
      [
        '- **Batched Resolution Contract**: Construct DataLoaders pairing keys to values in exact 1:1 order: `batchFn(keys) => Promise<values>`.',
        '- **Per-Request Context Lifecycle**: Instantiate fresh DataLoaders on every inbound HTTP context to prevent cross-user data leakage.',
        '- **Turn-Scoped Memoization**: Leverage DataLoader internal map to eliminate redundant round-trips for shared entity IDs within a request.',
      ]
    ),
  },

  'microfrontend-module-federation': {
    id: 'microfrontend-module-federation',
    name: 'MicrofrontendModuleFederationSkill',
    displayName: 'Webpack / Vite Module Federation Contracts',
    categoryId: 'coding',
    description: 'Architects microfrontends via Module Federation with shared singleton dependencies, fallback error boundaries, and SemVer version negotiation.',
    tags: ['coding', 'microfrontend', 'module-federation', 'webpack', 'vite', 'frontend-architecture'],
    transform: createStandardSkillTransform(
      'protocol',
      'Архитектура Микрофронтендов (Module Federation)',
      'Microfrontend Module Federation & Shared Singleton Architecture',
      [
        '- **Синглтоны общих библиотек**: Конфигурировать `shared: { react: { singleton: true, requiredVersion: "^19.0.0" } }` для исключения двойной загрузки React.',
        '- **Изолирующие Error Boundaries**: Оборачивать каждый удаленный модуль (Remote) в локальный `ErrorBoundary` со скелетоном fallback на случай сбоя хоста.',
        '- **Типизированные контракты модулей**: Экспортировать TypeScript-интерфейсы пропсов удаленных компонентов для предотвращения несовместимости при релизах.',
      ],
      [
        '- **Shared Singleton Dependencies**: Configure shared packages (`react`, `react-dom`) with `singleton: true` and strict `requiredVersion` bounds.',
        '- **Remote Error Isolation**: Enclose every remote component in a resilient `ErrorBoundary` accompanied by a graceful fallback placeholder.',
        '- **Typed Remote Contracts**: Publish and consume contract `.d.ts` interfaces ensuring build-time compatibility across decoupled repositories.',
      ]
    ),
  },

  'git-bisect-rebase-hygiene': {
    id: 'git-bisect-rebase-hygiene',
    name: 'GitBisectRebaseHygieneSkill',
    displayName: 'Atomic Git Commits & Automated Bisect Hygiene',
    categoryId: 'coding',
    description: 'Enforces atomic conventional commits, interactive rebase squashing, and automated `git bisect run` regression hunting scripts.',
    tags: ['coding', 'git', 'commits', 'rebase', 'bisect', 'hygiene', 'devops'],
    transform: createStandardSkillTransform(
      'protocol',
      'Дисциплина Атомарных Коммитов и Автоматический Git Bisect',
      'Atomic Git Commits & Automated Bisect Regression Protocol',
      [
        '- **Атомарность каждого коммита**: Каждый коммит обязан компилироваться и проходить тесты независимо, без смешивания несвязанных изменений.',
        '- **Conventional Commits**: Использовать строгий префикс `feat:`, `fix:`, `refactor:`, `perf:` с кратким императивным описанием.',
        '- **Скрипт для `git bisect run`**: Предоставить bash-скрипт с кодом возврата (0 = Good, 1 = Bad, 125 = Skip) для автоматического нахождения коммита-регрессии.',
      ],
      [
        '- **Atomic Commit Invariant**: Every discrete commit must compile and pass tests independently to ensure bisect safety.',
        '- **Conventional Commit Specification**: Format headers strictly: `type(scope): concise imperative description`.',
        '- **Automated Bisect Script**: Provide executable shell scripts yielding canonical return codes (0=good, 1=bad, 125=skip) for `git bisect run`.',
      ]
    ),
  },
  "rust-borrow-checker-lifetimes": {
    id: "rust-borrow-checker-lifetimes",
    name: "RustBorrowCheckerLifetimesSkill",
    displayName: "Rust Memory Safety, Explicit Lifetimes & Zero-Cost Abstractions",
    categoryId: "coding",
    description: "Solves complex Rust ownership, borrowing, lifetime annotations, and interior mutability challenges without resorting to unnecessary allocations.",
    tags: ["coding","rust","memory-safety","lifetimes","systems-programming"],
    transform: createStandardSkillTransform({
      sectionName: "Rust Ownership & Lifetime Architecture Protocol",
      ruSectionName: "Протокол архитектуры владения и времен жизни Rust (Lifetimes & Ownership)",
      instructions: [
        "Structure data models to minimize unneeded allocations (`clone()`); prefer borrowing (`&str`, `&[T]`) with explicit lifetime annotations (`'a`).",
        "Resolve borrow checker collisions using scoped interior mutability (`Cell`, `RefCell`, `RwLock`) or data restructuring.",
        "Leverage Rust type-state patterns to verify compile-time state machine transitions.",
        "Enforce zero-cost abstractions: ensure iterator chains compile into vectorized assembly loops."
],
      ruInstructions: [
        "Проектируйте структуры данных с минимизацией лишних клонирований (`clone()`); используйте ссылки и аннотации времен жизни (`'a`).",
        "Разрешайте конфликты Borrow Checker через инкапсуляцию мутабельности (`Cell`, `RwLock`) или разделение структур.",
        "Применяйте паттерн Type-State для контроля корректности переходов состояний на этапе компиляции.",
        "Используйте идиоматичные итераторы Rust для генерации оптимального ассемблерного кода без накладных расходов."
],
      semanticType: "process_directive",
      tags: ["coding","rust","memory-safety","lifetimes","systems-programming"],
    }),
  },

  "go-goroutine-channel-concurrency": {
    id: "go-goroutine-channel-concurrency",
    name: "GoGoroutineChannelConcurrencySkill",
    displayName: "Go Goroutines, Select Multiplexing & Worker Pool Architecture",
    categoryId: "coding",
    description: "Architects robust, leak-free Go concurrent systems using buffered channels, select multiplexing, sync.WaitGroup, and context cancellation.",
    tags: ["coding","golang","concurrency","goroutines","channels","worker-pool"],
    transform: createStandardSkillTransform({
      sectionName: "Go Concurrency & Channel Multiplexing Protocol",
      ruSectionName: "Протокол конкурентного программирования на Go (Goroutines, Channels, Context)",
      instructions: [
        "Pass `context.Context` as the first argument to all concurrent functions to ensure deterministic cancellation propagation.",
        "Prevent goroutine leaks: guarantee every spawned goroutine has a clear termination condition and unblocking channel path.",
        "Use buffered worker pools with `select` default cases to handle burst traffic gracefully without deadlocks.",
        "Synchronize state mutations via channels (CSP model) or explicit `sync.Mutex` / `sync.RWMutex` with deferred unlocks."
],
      ruInstructions: [
        "Передавайте `context.Context` первым аргументом во все асинхронные функции для распространения сигналов отмены.",
        "Предотвращайте утечки горутин: гарантируйте, что каждая горутина завершится при закрытии канала или отмене контекста.",
        "Проектируйте пулы воркеров с буферизованными каналами и мультиплексированием через `select`.",
        "Синхронизируйте доступ к разделяемым данным через каналы (модель CSP) или мьютексы `sync.Mutex` с `defer Unlock()`."
],
      semanticType: "process_directive",
      tags: ["coding","golang","concurrency","goroutines","channels","worker-pool"],
    }),
  },

  "react-memo-re-render-profiler": {
    id: "react-memo-re-render-profiler",
    name: "ReactMemoReRenderProfilerSkill",
    displayName: "React Re-render Elimination & Virtualized List Performance",
    categoryId: "coding",
    description: "Diagnoses and eliminates unnecessary React component re-renders using React.memo, stable callbacks, selector memoization, and DOM virtualization.",
    tags: ["coding","react","performance","re-renders","virtualization","frontend"],
    transform: createStandardSkillTransform({
      sectionName: "React Re-render Optimization Protocol",
      ruSectionName: "Протокол оптимизации рендеринга и профилирования React",
      instructions: [
        "Isolate volatile state down the component tree; avoid hoisting rapidly changing state to high-level parent components.",
        "Ensure referential stability for callbacks and objects passed to memoized children using `useCallback` and `useMemo`.",
        "Implement windowed virtualization (e.g. `@tanstack/react-virtual`) for lists exceeding 100 items to keep DOM node count constant.",
        "Prevent layout thrashing: batch state updates and measure DOM geometry within `useLayoutEffect` only when necessary."
],
      ruInstructions: [
        "Изолируйте часто меняющееся состояние как можно ближе к листьям дерева компонентов; не поднимайте его наверх без нужды.",
        "Обеспечивайте стабильность ссылок на функции и объекты через `useCallback` и `useMemo` при передаче в мемоизированные компоненты.",
        "Используйте виртуализацию списков для массивов свыше 100 элементов для поддержания постоянного числа узлов в DOM.",
        "Предотвращайте Layout Thrashing: пакетируйте обновления состояния и синхронизируйте замеры разметки."
],
      semanticType: "process_directive",
      tags: ["coding","react","performance","re-renders","virtualization","frontend"],
    }),
  },

  "python-asyncio-event-loop-tuner": {
    id: "python-asyncio-event-loop-tuner",
    name: "PythonAsyncioEventLoopTunerSkill",
    displayName: "Python Asyncio Concurrency & Non-Blocking I/O Architecture",
    categoryId: "coding",
    description: "Architects high-throughput Python async services, preventing event-loop starvation by offloading CPU-bound workloads to ThreadPoolExecutors.",
    tags: ["coding","python","asyncio","concurrency","event-loop","backend"],
    transform: createStandardSkillTransform({
      sectionName: "Python Asyncio Event Loop Protocol",
      ruSectionName: "Протокол асинхронной архитектуры Python (Asyncio & Non-Blocking I/O)",
      instructions: [
        "Never execute synchronous blocking I/O (e.g. `time.sleep`, `requests.get`) directly within async coroutines.",
        "Offload blocking calls or heavy CPU computations to dedicated worker threads via `asyncio.to_thread` or ProcessPoolExecutor.",
        "Use `asyncio.gather` with `return_exceptions=True` or TaskGroups for robust parallel task execution.",
        "Configure connection pools (e.g. `aiohttp.ClientSession`, `asyncpg.Pool`) with explicit timeout and concurrency limits."
],
      ruInstructions: [
        "Категорически запрещайте синхронные блокирующие вызовы (`time.sleep`, `requests.get`) внутри асинхронного цикла событий.",
        "Выносите тяжелые вычисления и синхронные библиотеки в отдельные потоки через `asyncio.to_thread` или ProcessPoolExecutor.",
        "Используйте `asyncio.gather` с обработкой исключений или современный синтаксис `TaskGroup` для надежного параллелизма.",
        "Настраивайте пулы соединений (HTTP и БД) с явными лимитами одновременных сокетов и таймаутами."
],
      semanticType: "process_directive",
      tags: ["coding","python","asyncio","concurrency","event-loop","backend"],
    }),
  },

  "property-based-testing-quickcheck": {
    id: "property-based-testing-quickcheck",
    name: "PropertyBasedTestingQuickcheckSkill",
    displayName: "Property-Based Generative Testing & Invariant Fuzzing",
    categoryId: "coding",
    description: "Synthesizes property-based test suites using Hypothesis (Python) or Fast-Check (TypeScript) to discover edge-case counterexamples automatically.",
    tags: ["coding","property-testing","fast-check","hypothesis","testing","invariants"],
    transform: createStandardSkillTransform({
      sectionName: "Property-Based Testing Protocol",
      ruSectionName: "Протокол тестирования на основе свойств (Property-Based Testing)",
      instructions: [
        "Define mathematical invariants that must hold true across all randomized valid input domains (e.g. idempotency, round-trip serialization).",
        "Generate hundreds of stochastic input vectors using arbitrary generators (strings, numbers, complex nested trees).",
        "Rely on automated test-case shrinking algorithms to isolate the absolute minimal failing counterexample.",
        "Cover boundary conditions (empty arrays, Unicode surrogates, max integer, negative zero) systematically."
],
      ruInstructions: [
        "Формулируйте математические инварианты системы, которые обязаны выполняться на любых валидных данных (идемпотентность, обратимость).",
        "Генерируйте сотни случайных тестовых векторов с помощью генераторов произвольных структур данных.",
        "Используйте механизм автоматического сжатия (Shrinking) для поиска минимального воспроизводящего сбой примера.",
        "Систематически покрывайте краевые случаи (пустые массивы, спецсимволы Unicode, граничные целые числа)."
],
      semanticType: "process_directive",
      tags: ["coding","property-testing","fast-check","hypothesis","testing","invariants"],
    }),
  },

  "actor-model-akka-erlang-concurrency": {
    id: "actor-model-akka-erlang-concurrency",
    name: "ActorModelAkkaErlangConcurrencySkill",
    displayName: "Actor Model Distributed Message Passing & Supervision Trees",
    categoryId: "coding",
    description: "Implements actor-model architectures with isolated state, asynchronous mailbox message passing, and \"let-it-crash\" supervision hierarchies.",
    tags: ["coding","actor-model","erlang","akka","fault-tolerance","concurrency"],
    transform: createStandardSkillTransform({
      sectionName: "Actor Model & Supervision Tree Protocol",
      ruSectionName: "Протокол модели акторов и деревьев супервизии (Actor Model)",
      instructions: [
        "Enforce complete state isolation: actors communicate exclusively via asynchronous immutable message mailboxes.",
        "Adopt the \"Let It Crash\" philosophy: isolate failures to individual leaf actors without crashing parent coordinators.",
        "Design hierarchical Supervision Trees with explicit restart strategies: One-For-One, One-For-All, Rest-For-One.",
        "Implement bounded mailboxes and dead-letter queues to prevent unbounded memory growth during downstream backpressure."
],
      ruInstructions: [
        "Обеспечивайте полную изоляцию состояния: акторы взаимодействуют исключительно через асинхронные неизменяемые сообщения.",
        "Применяйте философию \"Let It Crash\": изолируйте сбои на уровне отдельных рабочих акторов без падения всей системы.",
        "Проектируйте иерархические деревья супервизии со стратегиями перезапуска (One-For-One, One-For-All).",
        "Ограничивайте размер очередей сообщений (Mailbox) и настраивайте очередь недоставленных писем (Dead Letter Queue)."
],
      semanticType: "structural_directive",
      tags: ["coding","actor-model","erlang","akka","fault-tolerance","concurrency"],
    }),
  },

  "lock-free-atomic-data-structures": {
    id: "lock-free-atomic-data-structures",
    name: "LockFreeAtomicDataStructuresSkill",
    displayName: "Lock-Free Atomic Data Structures & CAS Concurrency",
    categoryId: "coding",
    description: "Designs high-performance lock-free queues, stacks, and ring buffers using Compare-And-Swap (CAS) atomic primitives and memory fences.",
    tags: ["coding","lock-free","atomic","cas","concurrency","systems-programming"],
    transform: createStandardSkillTransform({
      sectionName: "Lock-Free Data Structure Protocol",
      ruSectionName: "Протокол разработки lock-free структур данных и атомарных операций",
      instructions: [
        "Implement synchronization using Compare-And-Swap (CAS) loops without relying on OS-level mutex locks.",
        "Apply appropriate memory ordering fences (Acquire-Release semantics, Sequentially Consistent) to guarantee visibility.",
        "Defend against the ABA problem using versioned tagged pointers or Hazard Pointers.",
        "Design lock-free Single-Producer Single-Consumer (SPSC) and Multi-Producer Multi-Consumer (MPMC) ring buffers."
],
      ruInstructions: [
        "Реализуйте синхронизацию через циклы атомарных операций Compare-And-Swap (CAS) без системных блокировок мьютексами.",
        "Задавайте корректные барьеры памяти (Acquire-Release, Relaxed, SeqCst) для гарантии видимости изменений между ядрами.",
        "Защищайте алгоритмы от проблемы ABA с помощью версионированных указателей или Hazard Pointers.",
        "Проектируйте неблокирующие кольцевые буферы (SPSC и MPMC) с минимальной межъядерной задержкой."
],
      semanticType: "process_directive",
      tags: ["coding","lock-free","atomic","cas","concurrency","systems-programming"],
    }),
  },

  "simd-vectorization-compiler-opt": {
    id: "simd-vectorization-compiler-opt",
    name: "SimdVectorizationCompilerOptSkill",
    displayName: "SIMD Vectorization & CPU Cache-Line Locality Tuning",
    categoryId: "coding",
    description: "Optimizes computational inner loops by organizing memory in Struct-of-Arrays (SoA) layout to enable auto-vectorization (AVX-512, NEON).",
    tags: ["coding","simd","vectorization","cache-locality","performance","optimization"],
    transform: createStandardSkillTransform({
      sectionName: "SIMD Vectorization & Cache Optimization Protocol",
      ruSectionName: "Протокол векторной оптимизации SIMD и локальности кэша процессора",
      instructions: [
        "Transform Array-of-Structures (AoS) to Structure-of-Arrays (SoA) layout to achieve contiguous memory streams.",
        "Align array buffers to 64-byte boundaries to match CPU L1 cache-line and vector register widths.",
        "Eliminate branching conditionals and pointer chasing within hot computational inner loops.",
        "Verify compiler assembly output to confirm generation of packed vector instructions (AVX2, AVX-512, ARM NEON)."
],
      ruInstructions: [
        "Преобразуйте структуры данных из массива структур (AoS) в структуру массивов (SoA) для непрерывного доступа к памяти.",
        "Выравнивайте буферы данных по границе 64 байт для соответствия строкам L1-кэша и векторным регистрам.",
        "Устраняйте ветвления и разыменования указателей внутри критических вычислительных циклов.",
        "Проверяйте ассемблерный листинг на наличие инструкций параллельной обработки данных (AVX2, AVX-512, NEON)."
],
      semanticType: "process_directive",
      tags: ["coding","simd","vectorization","cache-locality","performance","optimization"],
    }),
  },

  "state-machine-xstate-actor": {
    id: "state-machine-xstate-actor",
    name: "StateMachineXstateActorSkill",
    displayName: "Deterministic Statecharts & Finite State Machine (FSM) Modeling",
    categoryId: "coding",
    description: "Models complex application workflows using formal statecharts (XState / State Pattern) with explicit states, events, guards, and side-effects.",
    tags: ["coding","state-machine","fsm","xstate","architecture","statecharts"],
    transform: createStandardSkillTransform({
      sectionName: "Deterministic Statechart Architecture Protocol",
      ruSectionName: "Протокол проектирования конечных автоматов и стейтчартов (FSM / XState)",
      instructions: [
        "Enumerate all valid operational states and explicit allowed transition events; forbid undeclared state mutations.",
        "Define pure boolean Guard functions to protect conditional transitions.",
        "Separate state transitions from asynchronous side-effects (Actions, Services, Invocations).",
        "Eliminate impossible UI states (e.g. simultaneously loading and displaying an error) by construction."
],
      ruInstructions: [
        "Перечисляйте все допустимые состояния системы и разрешенные события переходов; запрещайте неявные мутации.",
        "Задавайте чистые булевы функции-охранники (Guards) для условных переходов между состояниями.",
        "Разделяйте логику переключения состояний и выполнение побочных эффектов (Actions, Services).",
        "Исключайте возникновение невозможных состояний интерфейса (например, одновременная загрузка и показ ошибки)."
],
      semanticType: "structural_directive",
      tags: ["coding","state-machine","fsm","xstate","architecture","statecharts"],
    }),
  },

  "grpc-streaming-multiplexing-client": {
    id: "grpc-streaming-multiplexing-client",
    name: "GrpcStreamingMultiplexingClientSkill",
    displayName: "gRPC Bi-directional Streaming & Client Interceptor Architecture",
    categoryId: "coding",
    description: "Implements production gRPC clients with HTTP/2 connection pooling, bi-directional streaming, metadata propagation, and retry interceptors.",
    tags: ["coding","grpc","http2","streaming","microservices","rpc"],
    transform: createStandardSkillTransform({
      sectionName: "gRPC Streaming & Client Architecture Protocol",
      ruSectionName: "Протокол потоковой передачи данных и клиентской архитектуры gRPC",
      instructions: [
        "Leverage HTTP/2 multiplexed streams over shared long-lived TCP connections.",
        "Implement client interceptor chains for automated JWT auth header injection, OpenTelemetry tracing, and exponential retries.",
        "Handle bi-directional streaming backpressure: pause pulling messages when consumer buffer reaches saturation.",
        "Catch gRPC status codes (UNAVAILABLE, DEADLINE_EXCEEDED) and apply circuit breaker failovers."
],
      ruInstructions: [
        "Используйте мультиплексирование потоков HTTP/2 поверх единого постоянного TCP-соединения.",
        "Внедряйте цепочки клиентских интерцепторов для передачи токенов авторизации, трассировки и повторов запросов.",
        "Управляйте обратным давлением (Backpressure) в двунаправленных стримах, контролируя размер буфера приемника.",
        "Обрабатывайте статусы ошибок gRPC (UNAVAILABLE, DEADLINE_EXCEEDED) с интеграцией Circuit Breaker."
],
      semanticType: "process_directive",
      tags: ["coding","grpc","http2","streaming","microservices","rpc"],
    }),
  },

  "css-subgrid-container-queries": {
    id: "css-subgrid-container-queries",
    name: "CssSubgridContainerQueriesSkill",
    displayName: "Modern CSS Container Queries & CSS Subgrid Layouts",
    categoryId: "coding",
    description: "Builds component-driven, responsive UI layouts using modern CSS features: container queries (@container), CSS subgrid, and logical properties.",
    tags: ["coding","css","container-queries","subgrid","responsive-design","modern-css"],
    transform: createStandardSkillTransform({
      sectionName: "Modern CSS Responsive Architecture Protocol",
      ruSectionName: "Протокол современной верстки CSS (Container Queries & Subgrid)",
      instructions: [
        "Define container context via `container-type: inline-size` to style components based on parent width rather than viewport size.",
        "Use `@container (min-width: ...)` rules to create truly modular, drop-in responsive widgets.",
        "Apply `grid-template-columns: subgrid` to align nested child elements directly to parent grid tracks.",
        "Adopt CSS Logical Properties (`margin-inline`, `padding-block`) for native internationalization and RTL layout support."
],
      ruInstructions: [
        "Объявляйте контекст контейнера через `container-type: inline-size` для адаптации компонента к ширине родительского блока.",
        "Используйте правила `@container` для создания полностью автономных адаптивных виджетов.",
        "Применяйте `grid-template-columns: subgrid` для идеального выравнивания вложенных элементов по общей сетке родителя.",
        "Используйте логические свойства CSS (`padding-inline`, `margin-block`) для нативной поддержки RTL-языков."
],
      semanticType: "structural_directive",
      tags: ["coding","css","container-queries","subgrid","responsive-design","modern-css"],
    }),
  },

  "web-workers-offscreen-canvas-multithreading": {
    id: "web-workers-offscreen-canvas-multithreading",
    name: "WebWorkersOffscreenCanvasMultithreadingSkill",
    displayName: "Web Workers & OffscreenCanvas Browser Multithreading",
    categoryId: "coding",
    description: "Offloads heavy data parsing, cryptography, and canvas rendering off the main UI thread using Web Workers and OffscreenCanvas.",
    tags: ["coding","web-workers","offscreen-canvas","multithreading","browser-performance"],
    transform: createStandardSkillTransform({
      sectionName: "Browser Web Worker Multithreading Protocol",
      ruSectionName: "Протокол многопоточности в браузере (Web Workers & OffscreenCanvas)",
      instructions: [
        "Transfer heavy computations (large JSON parsing, image filters, data indexing) to background Web Workers.",
        "Transfer ownership of Canvas elements to worker threads using `canvas.transferControlToOffscreen()`.",
        "Use `ArrayBuffer` transferables (`postMessage(data, [data.buffer])`) to achieve zero-copy memory handoffs between threads.",
        "Keep the main browser thread at a solid 60/120 FPS with zero input frame drops."
],
      ruInstructions: [
        "Выносите тяжелые вычисления (парсинг больших данных, криптографию, расчет графов) в фоновые Web Workers.",
        "Передавайте управление рендерингом холста в поток воркера через `canvas.transferControlToOffscreen()`.",
        "Используйте передачу владения буферами ArrayBuffer (Transferables) для нулевого копирования данных между потоками.",
        "Гарантируйте плавность основного потока интерфейса на уровне 60/120 FPS без микрофризов."
],
      semanticType: "process_directive",
      tags: ["coding","web-workers","offscreen-canvas","multithreading","browser-performance"],
    }),
  },

  "indexeddb-dexie-offline-sync": {
    id: "indexeddb-dexie-offline-sync",
    name: "IndexeddbDexieOfflineSyncSkill",
    displayName: "Offline-First IndexedDB Persistence & CRDT Sync",
    categoryId: "coding",
    description: "Architects offline-first client storage using IndexedDB/Dexie.js paired with Conflict-Free Replicated Data Types (CRDT) for conflict-free cloud sync.",
    tags: ["coding","indexeddb","offline-first","crdt","local-storage","pwa"],
    transform: createStandardSkillTransform({
      sectionName: "Offline-First Storage & Synchronization Protocol",
      ruSectionName: "Протокол локального хранения данных (IndexedDB) и синхронизации без конфликтов (CRDT)",
      instructions: [
        "Store primary working state locally in IndexedDB using structured indices for instantaneous client-side queries.",
        "Model collaborative or distributed entities using CRDTs (e.g. Yjs, Automerge) to resolve offline edits deterministically.",
        "Queue local mutations in an append-only outbox queue with exponential retry backoff upon network restoration.",
        "Provide immediate optimistic UI updates while synchronization reconciles in the background."
],
      ruInstructions: [
        "Сохраняйте рабочие данные локально в IndexedDB с индексами для мгновенного выполнения запросов в браузере.",
        "Используйте беcконфликтные реплицируемые типы данных (CRDT) для автоматического слияния правок, сделанных офлайн.",
        "Ведите журнал локальных мутаций (Outbox Queue) для фоновой отправки на сервер при появлении сети.",
        "Обеспечивайте мгновенный отклик интерфейса (Optimistic UI) до подтверждения сервером."
],
      semanticType: "process_directive",
      tags: ["coding","indexeddb","offline-first","crdt","local-storage","pwa"],
    }),
  },

  "mutation-testing-stryker-audit": {
    id: "mutation-testing-stryker-audit",
    name: "MutationTestingStrykerAuditSkill",
    displayName: "Mutation Testing & Test-Suite Fault Injection (Stryker)",
    categoryId: "coding",
    description: "Evaluates the true quality of unit test suites by deliberately mutating source code statements (inverting booleans, altering arithmetic) to detect surviving mutants.",
    tags: ["coding","mutation-testing","stryker","test-quality","code-coverage"],
    transform: createStandardSkillTransform({
      sectionName: "Mutation Testing & Test Quality Protocol",
      ruSectionName: "Протокол мутационного тестирования и оценки качества тестов (Mutation Testing)",
      instructions: [
        "Inject synthetic mutations into source code: invert conditionals (`>` to `<=`), replace arithmetic operators, strip function calls.",
        "Execute unit test suites against mutants: verify that at least one test fails (\"kills the mutant\").",
        "Calculate Mutation Score Indicator (MSI): target >80% killed mutants across mission-critical domains.",
        "Identify fragile pseudo-tests that produce 100% line coverage without actually asserting correctness."
],
      ruInstructions: [
        "Внедряйте синтетические мутации в код: инвертируйте условия (`>` на `<=`), меняйте знаки операций, удаляйте вызовы.",
        "Запускайте тесты на каждом мутанте: проверяйте, что хотя бы один тест падает, уничтожая мутанта (Killed Mutant).",
        "Рассчитывайте показатель Mutation Score (MSI): стремитесь к уничтожению более 80% мутантов в критическом коде.",
        "Выявляйте фиктивные тесты, которые дают 100% покрытия строк, но не содержат реальных проверок утверждений."
],
      semanticType: "process_directive",
      tags: ["coding","mutation-testing","stryker","test-quality","code-coverage"],
    }),
  },

  "linux-ebpf-xdp-packet-filter": {
    id: "linux-ebpf-xdp-packet-filter",
    name: "LinuxEbpfXdpPacketFilterSkill",
    displayName: "Linux eBPF / XDP High-Performance Network Filter",
    categoryId: "coding",
    description: "Develops kernel-space eBPF programs utilizing eXpress Data Path (XDP) hooks for sub-microsecond packet filtering and DDoS mitigation.",
    tags: ["coding","ebpf","xdp","networking","linux-kernel","c"],
    transform: createStandardSkillTransform({
      sectionName: "eBPF / XDP Kernel Program Protocol",
      ruSectionName: "Протокол разработки программ ядра Linux eBPF / XDP",
      instructions: [
        "Write safe, verifier-compliant C code targeting XDP driver/generic hook points.",
        "Enforce packet bounds checks before every memory access to satisfy the strict in-kernel eBPF verifier.",
        "Use eBPF maps (BPF_MAP_TYPE_HASH, BPF_MAP_TYPE_RINGBUF) for zero-copy metrics export to user-space.",
        "Return fast action verdicts: `XDP_DROP` for blacklisted traffic, `XDP_PASS` for legitimate flows."
],
      ruInstructions: [
        "Пишите безопасный C-код, успешно проходящий проверку встроенного верификатора ядра eBPF.",
        "Выполняйте обязательную проверку границ пакета перед каждым обращением к указателям данных.",
        "Используйте карты BPF (Hash Map, Ring Buffer) для эффективного обмена данными с пользовательским пространством.",
        "Возвращайте быстрые вердикты: `XDP_DROP` для мгновенного сброса вредоносных пакетов и `XDP_PASS` для штатного трафика."
],
      semanticType: "process_directive",
      tags: ["coding","ebpf","xdp","networking","linux-kernel","c"],
    }),
  },

  "protobuf-backward-compatibility-audit": {
    id: "protobuf-backward-compatibility-audit",
    name: "ProtobufBackwardCompatibilityAuditSkill",
    displayName: "Protobuf Wire Compatibility & Breaking Change Linter",
    categoryId: "coding",
    description: "Audits Protocol Buffers schema mutations for breaking wire-compatibility issues (e.g. changing field IDs, renaming enum zero-values, removing required fields).",
    tags: ["coding","protobuf","backward-compatibility","wire-format","api-governance"],
    transform: createStandardSkillTransform({
      sectionName: "Protobuf Wire Compatibility Audit Protocol",
      ruSectionName: "Протокол аудита обратной совместимости схем Protobuf (Buf Linter)",
      instructions: [
        "Never alter or reassign existing numerical field tag numbers in production proto files.",
        "When removing deprecated fields, mark tag numbers and field names with `reserved` directives.",
        "Disallow altering wire types (e.g. changing string to int32, or changing scalar to repeated).",
        "Ensure enum default zero values remain semantically unchanged across all schema revisions."
],
      ruInstructions: [
        "Никогда не изменяйте и не переназначайте числовые номера тегов полей в существующих proto-файлах.",
        "При удалении устаревших полей обязательно объявляйте их номера и имена через директиву `reserved`.",
        "Запрещайте изменение типов передачи (например, замену string на int32 или одиночного поля на repeated).",
        "Гарантируйте неизменность нулевого значения перечислений (Enum) при выпуске новых версий схемы."
],
      semanticType: "guardrail_directive",
      tags: ["coding","protobuf","backward-compatibility","wire-format","api-governance"],
    }),
  },

  "distributed-lock-redis-redlock": {
    id: "distributed-lock-redis-redlock",
    name: "DistributedLockRedisRedlockSkill",
    displayName: "Distributed Locking & Redlock Algorithm Synchronization",
    categoryId: "coding",
    description: "Implements fault-tolerant distributed locking across multi-node Redis clusters using the Redlock algorithm with random fence tokens and renewal heartbeats.",
    tags: ["coding","distributed-locks","redlock","redis","concurrency","synchronization"],
    transform: createStandardSkillTransform({
      sectionName: "Distributed Lock (Redlock) Protocol",
      ruSectionName: "Протокол распределенных блокировок (Redlock / Redis)",
      instructions: [
        "Acquire locks with unique cryptographic random values using `SET resource_name my_random_value NX PX 30000`.",
        "Release locks strictly via atomic Lua scripts verifying ownership token equality before deletion.",
        "Implement background auto-renewal heartbeat routines for long-running critical operations.",
        "Acquire locks across majority (N/2 + 1) independent Redis master nodes to survive single-node crashes."
],
      ruInstructions: [
        "Захватывайте блокировку с уникальным случайным токеном владения командой `SET lock_key token NX PX 30000`.",
        "Освобождайте блокировку исключительно через атомарный Lua-скрипт, сверяющий токен перед удалением ключа.",
        "Настраивайте фоновый процесс продления времени жизни блокировки (Heartbeat) для длительных задач.",
        "Захватывайте блокировку на кворуме независимых узлов Redis (N/2 + 1) для устойчивости к сбоям серверов."
],
      semanticType: "protocol",
      tags: ["coding","distributed-locks","redlock","redis","concurrency","synchronization"],
    }),
  },

  "kernel-mmap-zero-copy-io": {
    id: "kernel-mmap-zero-copy-io",
    name: "KernelMmapZeroCopyIoSkill",
    displayName: "Zero-Copy I/O & Memory-Mapped File Operations (mmap)",
    categoryId: "coding",
    description: "Maximizes file I/O throughput by mapping multi-gigabyte files directly into process virtual memory addresses using mmap and kernel sendfile primitives.",
    tags: ["coding","zero-copy","mmap","io-performance","systems-programming"],
    transform: createStandardSkillTransform({
      sectionName: "Kernel Zero-Copy & mmap Architecture Protocol",
      ruSectionName: "Протокол оптимизации ввода-вывода Zero-Copy и Memory-Mapped файлов (mmap)",
      instructions: [
        "Map large persistent files directly into process memory space via `mmap()` to bypass user-space buffer copies.",
        "Inform the kernel of anticipated access patterns using `madvise()` (MADV_SEQUENTIAL, MADV_WILLNEED).",
        "Use `sendfile()` or `splice()` system calls to stream data directly from disk to network sockets in kernel space.",
        "Handle virtual memory page faults gracefully and ensure safe synchronization via `msync()`."
],
      ruInstructions: [
        "Отображайте большие файлы напрямую в виртуальную память процесса через `mmap()`, исключая копирование в буфер.",
        "Подсказывайте ядру ОС ожидаемый профиль чтения с помощью системного вызова `madvise()` (MADV_SEQUENTIAL).",
        "Используйте `sendfile()` или `splice()` для передачи данных из файла в сетевой сокет целиком внутри ядра.",
        "Корректно обрабатывайте страничные прерывания и синхронизируйте грязные страницы на диск вызовом `msync()`."
],
      semanticType: "process_directive",
      tags: ["coding","zero-copy","mmap","io-performance","systems-programming"],
    }),
  },

  "tree-shaking-bundle-analyzer": {
    id: "tree-shaking-bundle-analyzer",
    name: "TreeShakingBundleAnalyzerSkill",
    displayName: "Tree-Shaking Optimization & JavaScript Bundle Diet",
    categoryId: "coding",
    description: "Audits JavaScript/TypeScript packages for side-effects, ensuring code exports are 100% tree-shakeable and stripping dead code from production bundles.",
    tags: ["coding","tree-shaking","bundle-size","es-modules","performance","webpack"],
    transform: createStandardSkillTransform({
      sectionName: "Tree-Shaking & Bundle Optimization Protocol",
      ruSectionName: "Протокол оптимизации Tree-Shaking и минификации бандлов",
      instructions: [
        "Structure code strictly using static ES Module syntax (`import`/`export`); disallow dynamic CommonJS `require()`.",
        "Declare `\"sideEffects\": false` or specify exact CSS files in package.json to permit bundler dead-code elimination.",
        "Avoid exporting large monolith namespaces; prefer granular named function exports.",
        "Replace bloated utility dependencies (e.g. full lodash, moment.js) with modular native equivalents (date-fns, lodash-es)."
],
      ruInstructions: [
        "Используйте статический синтаксис ES-модулей (`import`/`export`); избегайте динамических вызовов `require()`.",
        "Указывайте флаг `\"sideEffects\": false` в файле package.json для разрешения агрессивного удаления неиспользуемого кода.",
        "Экспортируйте функции точечно вместо создания монолитных объектов-неймспейсов.",
        "Заменяйте тяжелые библиотеки (Moment.js, Lodash) на модульные легковесные аналоги (date-fns, нативные методы)."
],
      semanticType: "process_directive",
      tags: ["coding","tree-shaking","bundle-size","es-modules","performance","webpack"],
    }),
  },

  "service-worker-cache-strategies": {
    id: "service-worker-cache-strategies",
    name: "ServiceWorkerCacheStrategiesSkill",
    displayName: "PWA Service Worker Progressive Caching Strategies",
    categoryId: "coding",
    description: "Implements Workbox caching strategies: Stale-While-Revalidate, Network-First, Cache-First, and Cache-Only tailored to specific resource route patterns.",
    tags: ["coding","service-worker","pwa","caching-strategies","workbox","offline"],
    transform: createStandardSkillTransform({
      sectionName: "Service Worker Caching Strategy Protocol",
      ruSectionName: "Протокол стратегий кэширования Service Worker (PWA Workbox)",
      instructions: [
        "Apply Stale-While-Revalidate to semi-static data (e.g. avatars, user profiles) for instant rendering with background updates.",
        "Apply Network-First to real-time APIs (checkout, live notifications) with offline cached fallbacks.",
        "Apply Cache-First with long expiration policies to immutable content-hashed assets (JS, CSS, fonts, webp).",
        "Implement cache size and TTL eviction policies to prevent consuming excess device storage."
],
      ruInstructions: [
        "Применяйте Stale-While-Revalidate для полустатических данных (профили, списки) для мгновенной загрузки с фоновым обновлением.",
        "Используйте стратегию Network-First для критических транзакционных API с резервным чтением из кэша при сбоях сети.",
        "Настраивайте Cache-First для неизменяемых статических файлов с хэшами в именах (JS, CSS, шрифты).",
        "Задавайте лимиты по количеству записей и времени жизни (TTL) для предотвращения разрастания кэша устройства."
],
      semanticType: "process_directive",
      tags: ["coding","service-worker","pwa","caching-strategies","workbox","offline"],
    }),
  },

  "solid-principles-oop-refactoring": {
    id: "solid-principles-oop-refactoring",
    name: "SolidPrinciplesOopRefactoringSkill",
    displayName: "SOLID Object-Oriented Refactoring & Design Pattern Audit",
    categoryId: "coding",
    description: "Refactors coupled procedural code into clean SOLID architecture: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.",
    tags: ["coding","solid","oop","refactoring","clean-code","design-patterns"],
    transform: createStandardSkillTransform({
      sectionName: "SOLID Refactoring & OOP Protocol",
      ruSectionName: "Протокол рефакторинга по принципам SOLID и паттернам проектирования",
      instructions: [
        "Single Responsibility: Ensure each class or module has one and only one reason to change.",
        "Open/Closed: Design components open for extension via polymorphism/interfaces, closed for direct source modification.",
        "Liskov Substitution: Guarantee derived subtypes can substitute base types without altering program correctness.",
        "Interface Segregation & Dependency Inversion: Split fat interfaces into fine-grained contracts; depend on abstractions, not concretions."
],
      ruInstructions: [
        "Единственная ответственность (SRP): Гарантируйте, что класс или модуль отвечает за одну четко очерченную задачу.",
        "Открытость/Закрытость (OCP): Проектируйте системы, расширяемые через полиморфизм и интерфейсы без правок исходного кода.",
        "Подстановка Барбары Лисков (LSP): Обеспечивайте полную взаимозаменяемость базовых классов их наследниками.",
        "Разделение интерфейсов и инверсия зависимостей (ISP/DIP): Разделяйте громоздкие интерфейсы и внедряйте зависимости через абстракции."
],
      semanticType: "process_directive",
      tags: ["coding","solid","oop","refactoring","clean-code","design-patterns"],
    }),
  },

  "functional-programming-monadic-pipelines": {
    id: "functional-programming-monadic-pipelines",
    name: "FunctionalProgrammingMonadicPipelinesSkill",
    displayName: "Functional Programming & Monadic Error Handling (Option / Result)",
    categoryId: "coding",
    description: "Eliminates unchecked runtime exceptions and null reference crashes using functional programming primitives: Result/Option monads and pure pipelines.",
    tags: ["coding","functional-programming","monads","result-type","type-safety"],
    transform: createStandardSkillTransform({
      sectionName: "Functional Monadic Architecture Protocol",
      ruSectionName: "Протокол функционального программирования и монадической обработки ошибок (Result / Option)",
      instructions: [
        "Wrap operations prone to failure in typed `Result<T, E>` monads (`Ok` or `Err`) rather than throwing raw exceptions.",
        "Eliminate null/undefined pointer dereference bugs using `Option<T>` / `Maybe<T>` types.",
        "Chain multi-step data transformations using monadic combinators: `map`, `flatMap`, `andThen`, `orElse`.",
        "Enforce pure side-effect-free functions for all core business logic transformations."
],
      ruInstructions: [
        "Оборачивайте потенциально сбойные операции в типизированные монады `Result<T, E>` вместо выбрасывания исключений.",
        "Исключайте ошибки разыменования null/undefined с помощью типов `Option<T>` (`Some` или `None`).",
        "Выстраивайте цепочки преобразований данных через композиционные методы: `map`, `flatMap`, `andThen`.",
        "Пишите чистые функции без побочных эффектов для всей вычислительной бизнес-логики."
],
      semanticType: "process_directive",
      tags: ["coding","functional-programming","monads","result-type","type-safety"],
    }),
  },

  "jwt-jwks-rotation-auth-verifier": {
    id: "jwt-jwks-rotation-auth-verifier",
    name: "JwtJwksRotationAuthVerifierSkill",
    displayName: "JWKS Public Key Rotation & JWT Token Authentication",
    categoryId: "coding",
    description: "Implements production JWT token verification against remote JSON Web Key Sets (JWKS) with automatic public key caching and rotation.",
    tags: ["coding","jwt","jwks","authentication","security","oauth"],
    transform: createStandardSkillTransform({
      sectionName: "JWKS & JWT Verification Protocol",
      ruSectionName: "Протокол верификации токенов JWT по набору ключей JWKS с ротацией",
      instructions: [
        "Fetch and cache public signing keys from identity provider JWKS endpoint (`/.well-known/jwks.json`).",
        "Match incoming JWT header `kid` (Key ID) against cached JWK keys before signature validation.",
        "Enforce strict cryptographic verification of `exp` (expiration), `nbf` (not before), `iss` (issuer), and `aud` (audience) claims.",
        "Implement asynchronous key cache eviction upon encountering unknown `kid` to handle key rotation seamlessly."
],
      ruInstructions: [
        "Загружайте и кэшируйте открытые ключи подписи с эндпоинта провайдера аутентификации (`/.well-known/jwks.json`).",
        "Сопоставляйте идентификатор ключа `kid` из заголовка JWT с кэшированным набором JWKS перед проверкой подписи.",
        "Проверяйте обязательные клеймы токена: срок действия (`exp`), издатель (`iss`) и целевая аудитория (`aud`).",
        "Настраивайте фоновое обновление кэша ключей при появлении нового неизвестного `kid` для плавной ротации сертификатов."
],
      semanticType: "process_directive",
      tags: ["coding","jwt","jwks","authentication","security","oauth"],
    }),
  },

  "kafka-consumer-group-rebalance-tuner": {
    id: "kafka-consumer-group-rebalance-tuner",
    name: "KafkaConsumerGroupRebalanceTunerSkill",
    displayName: "Apache Kafka Consumer Group Partition Rebalance Tuner",
    categoryId: "coding",
    description: "Tunes Kafka consumer group throughput by configuring Cooperative Sticky assignors, heartbeat timeouts, and max poll intervals to eliminate rebalance storms.",
    tags: ["coding","kafka","event-streaming","consumer-groups","distributed-systems"],
    transform: createStandardSkillTransform({
      sectionName: "Kafka Consumer Group Rebalance Protocol",
      ruSectionName: "Протокол оптимизации балансировки потребителей Apache Kafka",
      instructions: [
        "Configure `CooperativeStickyAssignor` to allow non-revoked partitions to continue processing during cluster rebalances.",
        "Tune `max.poll.interval.ms` to comfortably exceed the longest expected batch processing duration.",
        "Ensure heartbeat threads execute independently to prevent false consumer evictions.",
        "Implement manual offset commits (`commitSync`/`commitAsync`) only after downstream messages are durably persisted."
],
      ruInstructions: [
        "Настраивайте стратегию `CooperativeStickyAssignor` для продолжения обработки нетронутых партиций во время ребалансировки.",
        "Задавайте `max.poll.interval.ms` с запасом относительно максимального времени обработки пачки сообщений.",
        "Следите за непрерывной отправкой сигналов Heartbeat во избежание ложного исключения воркера из группы.",
        "Выполняйте ручную фиксацию смещений (Offsets) только после гарантированного сохранения результатов обработки."
],
      semanticType: "process_directive",
      tags: ["coding","kafka","event-streaming","consumer-groups","distributed-systems"],
    }),
  },

  "optimistic-ui-mutation-rollback": {
    id: "optimistic-ui-mutation-rollback",
    name: "OptimisticUiMutationRollbackSkill",
    displayName: "Optimistic UI Mutation with Instant Rollback Reversion",
    categoryId: "coding",
    description: "Implements instant optimistic UI feedback on user actions while maintaining an immutable state snapshot to revert changes if server mutation fails.",
    tags: ["coding","optimistic-ui","ux","state-management","error-recovery"],
    transform: createStandardSkillTransform({
      sectionName: "Optimistic UI State Mutation Protocol",
      ruSectionName: "Протокол оптимистичных обновлений интерфейса с откатом при сбое (Optimistic UI)",
      instructions: [
        "Apply anticipated mutation results immediately to local client cache before network request resolves.",
        "Capture an immutable snapshot of previous state prior to applying optimistic patch.",
        "If the network mutation succeeds: replace optimistic entity with authoritative server record.",
        "If the network mutation fails: revert immediately to snapshot, display non-intrusive toast, and provide retry button."
],
      ruInstructions: [
        "Применяйте ожидаемый результат действия пользователя в локальном кэше мгновенно до ответа сервера.",
        "Сохраняйте неизменяемый снимок (снапшот) предыдущего состояния перед внесением оптимистичных правок.",
        "При успешном ответе бэкенда: заменяйте временную запись на канонический объект сервера.",
        "При сбое запроса: мгновенно откатывайте интерфейс к снапшоту, показывайте понятное уведомление и кнопку повтора."
],
      semanticType: "process_directive",
      tags: ["coding","optimistic-ui","ux","state-management","error-recovery"],
    }),
  },

  "dependency-injection-inversion-of-control": {
    id: "dependency-injection-inversion-of-control",
    name: "DependencyInjectionInversionOfControlSkill",
    displayName: "Inversion of Control (IoC) & Dependency Injection Container",
    categoryId: "coding",
    description: "Decouples service instantiation using IoC containers and Constructor Dependency Injection, enabling seamless mock testing and swappable infrastructure.",
    tags: ["coding","dependency-injection","ioc","clean-architecture","unit-testing"],
    transform: createStandardSkillTransform({
      sectionName: "Dependency Injection & IoC Protocol",
      ruSectionName: "Протокол инверсии управления и внедрения зависимостей (IoC / DI)",
      instructions: [
        "Pass service dependencies strictly via constructors (`Constructor Injection`); forbid hardcoded `new Service()` instantiations.",
        "Depend on abstract interfaces rather than concrete service implementations.",
        "Configure IoC container lifetimes purposefully: Singleton (stateless), Scoped (per-request), Transient (new instance).",
        "Enable effortless unit testing by injecting mock implementations during test harness setup."
],
      ruInstructions: [
        "Внедряйте зависимости исключительно через параметры конструктора (Constructor Injection); не создавайте объекты через `new` внутри классов.",
        "Определяйте зависимости через абстрактные интерфейсы, а не конкретные классы реализации.",
        "Настраивайте жизненный цикл объектов в DI-контейнере: Singleton (один на приложение), Scoped (на запрос), Transient (новый экземпляр).",
        "Обеспечивайте простоту модульного тестирования за счет легкой подстановки Mock-объектов."
],
      semanticType: "structural_directive",
      tags: ["coding","dependency-injection","ioc","clean-architecture","unit-testing"],
    }),
  },

  "semantic-versioning-git-tag-release": {
    id: "semantic-versioning-git-tag-release",
    name: "SemanticVersioningGitTagReleaseSkill",
    displayName: "Automated Semantic Release & Git Tagging Workflow",
    categoryId: "coding",
    description: "Automates semantic version bumping, CHANGELOG.md generation, and git tag creation by parsing conventional commit history in CI/CD.",
    tags: ["coding","semantic-release","git-tags","changelog","automation","ci-cd"],
    transform: createStandardSkillTransform({
      sectionName: "Automated Semantic Release Protocol",
      ruSectionName: "Протокол автоматизации версионирования и релизов (Semantic Release)",
      instructions: [
        "Analyze commit message history since the last git tag: calculate next version (MAJOR for breaking, MINOR for feat, PATCH for fix).",
        "Generate automated CHANGELOG.md grouping commits into Features, Bug Fixes, and Performance Improvements.",
        "Create annotated, cryptographically signed git tags for every production deployment.",
        "Publish compiled build artifacts and release notes automatically to distribution registries."
],
      ruInstructions: [
        "Анализируйте историю коммитов от предыдущего тега: вычисляйте следующую версию по типу изменений (MAJOR/MINOR/PATCH).",
        "Генерируйте файл CHANGELOG.md с группировкой коммитов по разделам: Возможности, Исправления, Производительность.",
        "Создавайте аннотированные и подписанные git-теги для каждого производственного релиза.",
        "Публикуйте скомпилированные артефакты и заметки о релизе в целевые репозитории пакетов."
],
      semanticType: "process_directive",
      tags: ["coding","semantic-release","git-tags","changelog","automation","ci-cd"],
    }),
  },

  "sql-window-functions-analytics": {
    id: "sql-window-functions-analytics",
    name: "SqlWindowFunctionsAnalyticsSkill",
    displayName: "Advanced SQL Analytic Window Functions (OVER, PARTITION BY, LAG/LEAD)",
    categoryId: "coding",
    description: "Solves complex analytical and running-total aggregation queries using SQL window functions without expensive self-joins.",
    tags: ["coding","sql","window-functions","analytics","database","postgresql"],
    transform: createStandardSkillTransform({
      sectionName: "SQL Analytic Window Functions Protocol",
      ruSectionName: "Протокол аналитических оконных функций SQL (OVER, PARTITION BY, LAG/LEAD)",
      instructions: [
        "Use `PARTITION BY` and `ORDER BY` inside `OVER()` clauses to calculate running totals, moving averages, and ranks.",
        "Leverage navigation window functions: `LAG()` and `LEAD()` to compute period-over-period delta differences.",
        "Utilize ranking functions (`ROW_NUMBER()`, `DENSE_RANK()`) for deduplication and Top-N per category filtering.",
        "Optimize query execution plans: verify that underlying tables have compound indexes matching PARTITION and ORDER columns."
],
      ruInstructions: [
        "Используйте предложения `PARTITION BY` и `ORDER BY` внутри `OVER()` для вычисления скользящих средних и нарастающих итогов.",
        "Применяйте функции смещения `LAG()` и `LEAD()` для расчета динамики показателей от периода к периоду.",
        "Используйте `ROW_NUMBER()` и `DENSE_RANK()` для дедупликации данных и выборки Top-N записей по категориям.",
        "Оптимизируйте запросы: создавайте составные индексы, покрывающие колонки секционирования и сортировки."
],
      semanticType: "process_directive",
      tags: ["coding","sql","window-functions","analytics","database","postgresql"],
    }),
  },

  "graphql-n-plus-one-dataloader-fix": {
    id: "graphql-n-plus-one-dataloader-fix",
    name: "GraphqlNPlusOneDataloaderFixSkill",
    displayName: "GraphQL N+1 Query Elimination via Batching DataLoader",
    categoryId: "coding",
    description: "Eliminates catastrophic N+1 database queries in GraphQL resolvers by batching and memoizing child relation lookups via DataLoader.",
    tags: ["coding","graphql","n-plus-one","dataloader","database-performance"],
    transform: createStandardSkillTransform({
      sectionName: "GraphQL DataLoader Batching Protocol",
      ruSectionName: "Протокол устранения проблемы N+1 запросов в GraphQL (DataLoader)",
      instructions: [
        "Wrap relational database queries in Facebook DataLoader instances instantiated per request context.",
        "Coalesce individual entity fetches into a single batched `WHERE id IN (...)` query during event-loop tick.",
        "Ensure the batch load function returns an array matching the exact length and order of the requested key array.",
        "Prevent cross-request cache contamination by creating fresh DataLoader instances per HTTP request context."
],
      ruInstructions: [
        "Оборачивайте выборки связанных данных в экземпляры DataLoader, создаваемые для каждого HTTP-запроса.",
        "Объединяйте одиночные обращения к БД в единый пакетный запрос `WHERE id IN (...)` за один тик цикла событий.",
        "Гарантируйте, что функция пакетной загрузки возвращает массив сущностей, строго совпадающий по порядку с переданными ключами.",
        "Исключайте утечку данных между пользователями: не делайте DataLoader глобальным синглтоном."
],
      semanticType: "process_directive",
      tags: ["coding","graphql","n-plus-one","dataloader","database-performance"],
    }),
  },

  "sse-server-sent-events-reconnect": {
    id: "sse-server-sent-events-reconnect",
    name: "SseServerSentEventsReconnectSkill",
    displayName: "Server-Sent Events (SSE) Real-time Stream & Resilient Reconnection",
    categoryId: "coding",
    description: "Implements lightweight real-time server-to-client event streaming using SSE (text/event-stream) with Last-Event-ID replay and exponential backoff.",
    tags: ["coding","sse","server-sent-events","real-time","streaming","http"],
    transform: createStandardSkillTransform({
      sectionName: "Server-Sent Events (SSE) Protocol",
      ruSectionName: "Протокол потоковой передачи данных Server-Sent Events (SSE)",
      instructions: [
        "Format stream output with mandatory `Content-Type: text/event-stream` and `Cache-Control: no-cache` headers.",
        "Emit structured frames: `id: <uuid>\\nevent: <name>\\ndata: <json>\\n\\n` terminated by double newlines.",
        "Handle client reconnections: inspect incoming `Last-Event-ID` header and replay missed events from buffer.",
        "Configure keepalive ping comments (`: keepalive\\n\\n`) every 15 seconds to prevent intermediate proxy timeouts."
],
      ruInstructions: [
        "Отправляйте поток с обязательными заголовками `Content-Type: text/event-stream` и `Cache-Control: no-cache`.",
        "Форматируйте события по стандарту: `id: <id>\\nevent: <тип>\\ndata: <данные>\\n\\n` с двойным переводом строки.",
        "Обрабатывайте переподключения клиента: считывайте заголовок `Last-Event-ID` и досылайте пропущенные события.",
        "Отправляйте периодические пустые комментарии (`: ping\\n\\n`) каждые 15 секунд для защиты от закрытия прокси-соединения."
],
      semanticType: "process_directive",
      tags: ["coding","sse","server-sent-events","real-time","streaming","http"],
    }),
  },

  "typescript-template-literal-types": {
    id: "typescript-template-literal-types",
    name: "TypescriptTemplateLiteralTypesSkill",
    displayName: "Advanced TypeScript Template Literal & Mapped Types",
    categoryId: "coding",
    description: "Constructs expressive, type-safe API routers, event emitters, and CSS-in-JS style contracts using TypeScript Template Literal types.",
    tags: ["coding","typescript","template-literals","type-system","metaprogramming"],
    transform: createStandardSkillTransform({
      sectionName: "TypeScript Template Literal Types Protocol",
      ruSectionName: "Протокол продвинутой типизации TypeScript (Template Literal & Mapped Types)",
      instructions: [
        "Build dynamic string union types using template literals: e.g. `type Event = `on${Capitalize<Action>}` `.",
        "Derive nested object path string keys automatically: e.g. `\"user.address.street\"`.",
        "Implement deep mapped types (`DeepPartial<T>`, `DeepReadonly<T>`, `PathValue<T, P>`).",
        "Provide strict compile-time validation for dynamic route parameters and event handlers."
],
      ruInstructions: [
        "Создавайте динамические строковые типы через шаблонные литералы (например, `type Event = `on${Capitalize<Action>}` `).",
        "Автоматически типизируйте строковые пути к глубоко вложенным свойствам объектов (`\"user.profile.avatar\"`).",
        "Используйте рекурсивные маппинг-типы (`DeepReadonly<T>`, `DeepRequired<T>`) для строгой типизации структур.",
        "Обеспечивайте проверку корректности параметров URL и названий событий на этапе компиляции."
],
      semanticType: "structural_directive",
      tags: ["coding","typescript","template-literals","type-system","metaprogramming"],
    }),
  },

  "secure-session-cookie-attributes": {
    id: "secure-session-cookie-attributes",
    name: "SecureSessionCookieAttributesSkill",
    displayName: "Hardened Session Cookie Security Attributes",
    categoryId: "coding",
    description: "Enforces secure cookie configurations: HttpOnly, Secure, SameSite=Strict, Domain scoping, and __Host- prefix protection to prevent session hijacking.",
    tags: ["coding","cookies","security","session-management","appsec","web"],
    transform: createStandardSkillTransform({
      sectionName: "Session Cookie Hardening Protocol",
      ruSectionName: "Протокол безопасности сессионных cookie (HttpOnly, Secure, SameSite, __Host-)",
      instructions: [
        "Enforce `HttpOnly` flag unconditionally on all authentication session cookies to block XSS theft.",
        "Set `Secure` flag to ensure cookies are transmitted exclusively over encrypted HTTPS connections.",
        "Configure `SameSite=Strict` or `SameSite=Lax` to eliminate Cross-Site Request Forgery (CSRF) vulnerabilities.",
        "Use the `__Host-` cookie name prefix to enforce path=\"/\" and prevent subdomain cookie tossing attacks."
],
      ruInstructions: [
        "Устанавливайте флаг `HttpOnly` для всех сессионных cookie для защиты от кражи через XSS-атаки.",
        "Включайте флаг `Secure`, гарантируя передачу cookie исключительно по зашифрованному протоколу HTTPS.",
        "Задавайте атрибут `SameSite=Lax` или `SameSite=Strict` для предотвращения CSRF-атак межсайтовой подделки запросов.",
        "Используйте префикс имени `__Host-` для привязки cookie к точному домену и пути `/` без доступа с поддоменов."
],
      semanticType: "guardrail_directive",
      tags: ["coding","cookies","security","session-management","appsec","web"],
    }),
  },

  "rate-limiting-token-bucket-algorithm": {
    id: "rate-limiting-token-bucket-algorithm",
    name: "RateLimitingTokenBucketAlgorithmSkill",
    displayName: "Token Bucket & Leaky Bucket Rate Limiting Algorithm",
    categoryId: "coding",
    description: "Implements mathematically precise rate limiters using Token Bucket or Sliding Window algorithms with burst capacity and refill rates.",
    tags: ["coding","rate-limiting","token-bucket","algorithms","api-security"],
    transform: createStandardSkillTransform({
      sectionName: "Token Bucket Rate Limiting Protocol",
      ruSectionName: "Протокол алгоритма ограничения частоты запросов (Token Bucket / Sliding Window)",
      instructions: [
        "Maintain bucket state: current tokens count, maximum capacity, and last refill timestamp.",
        "Refill tokens proportionally based on elapsed time delta: `tokens += timeDelta * refillRate`.",
        "Allow instantaneous request bursts up to max capacity while enforcing steady-state throughput limits.",
        "Return standard HTTP 429 response headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`."
],
      ruInstructions: [
        "Ведите состояние корзины: текущее количество токенов, максимальная емкость и время последнего пополнения.",
        "Пополняйте токены пропорционально прошедшему времени: `tokens += timeDelta * refillRate`.",
        "Разрешайте кратковременные всплески нагрузки в пределах емкости корзины, удерживая среднюю частоту.",
        "Возвращайте клиенту информативные заголовки: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`."
],
      semanticType: "process_directive",
      tags: ["coding","rate-limiting","token-bucket","algorithms","api-security"],
    }),
  },

  "binary-search-tree-avl-red-black": {
    id: "binary-search-tree-avl-red-black",
    name: "BinarySearchTreeAvlRedBlackSkill",
    displayName: "Self-Balancing Binary Search Trees (AVL / Red-Black) Algorithm",
    categoryId: "coding",
    description: "Implements self-balancing binary search trees with deterministic O(log N) operations using tree rotations (Left/Right, Left-Right, Right-Left).",
    tags: ["coding","algorithms","binary-tree","avl","red-black-tree","data-structures"],
    transform: createStandardSkillTransform({
      sectionName: "Self-Balancing Binary Search Tree Protocol",
      ruSectionName: "Протокол самобалансирующихся бинарных деревьев поиска (AVL / Red-Black Tree)",
      instructions: [
        "Track node balance factors (Height(Left) - Height(Right)) or node color properties.",
        "Execute single and double tree rotations to rebalance tree immediately upon insertion or deletion.",
        "Guarantee worst-case O(log N) time complexity for Search, Insertion, and Deletion operations.",
        "Provide in-order, pre-order, and post-order traversal iterator implementations."
],
      ruInstructions: [
        "Отслеживайте фактор баланса каждого узла (разницу высот поддеревьев) или цветовые свойства узлов.",
        "Выполняйте малые и большие повороты дерева для восстановления балансировки при вставке и удалении элементов.",
        "Гарантируйте логарифмическую сложность O(log N) в худшем случае для поиска, вставки и удаления.",
        "Реализуйте итераторы прямого, симметричного и обратного обхода дерева."
],
      semanticType: "process_directive",
      tags: ["coding","algorithms","binary-tree","avl","red-black-tree","data-structures"],
    }),
  },

  "spatial-indexing-r-tree-geohash": {
    id: "spatial-indexing-r-tree-geohash",
    name: "SpatialIndexingRTreeGeohashSkill",
    displayName: "Geospatial Indexing & Bounding Box Search (R-Tree / Geohash)",
    categoryId: "coding",
    description: "Implements high-performance geospatial range search and K-Nearest Neighbors (KNN) algorithms using R-Trees, QuadTrees, or Geohash string prefixes.",
    tags: ["coding","geospatial","r-tree","geohash","spatial-indexing","algorithms"],
    transform: createStandardSkillTransform({
      sectionName: "Spatial Indexing & Range Search Protocol",
      ruSectionName: "Протокол пространственного индексирования и геопоиска (R-Tree / Geohash)",
      instructions: [
        "Group geospatial points into hierarchical Minimum Bounding Boxes (MBR) in R-Tree index structures.",
        "Encode latitude/longitude coordinates into interleaved binary Geohash strings for B-tree range queries.",
        "Execute K-Nearest Neighbors (KNN) search with pruning: prune bounding boxes further than current best distance.",
        "Calculate precise great-circle distances using the Haversine formula for final candidate verification."
],
      ruInstructions: [
        "Группируйте географические координаты в иерархические минимальные ограничивающие прямоугольники (MBR) в структуре R-Tree.",
        "Кодируйте координаты в строки Geohash для быстрого поиска соседних объектов по префиксам в стандартных индексах.",
        "Реализуйте поиск K ближайших соседей (KNN) с отсечением ветвей дерева, заведомо находящихся дальше текущего минимума.",
        "Используйте формулу гаверсинусов для точного расчета расстояний по поверхности сферы для отобранных кандидатов."
],
      semanticType: "process_directive",
      tags: ["coding","geospatial","r-tree","geohash","spatial-indexing","algorithms"],
    }),
  },

  "oauth2-pkce-authorization-code-flow": {
    id: "oauth2-pkce-authorization-code-flow",
    name: "Oauth2PkceAuthorizationCodeFlowSkill",
    displayName: "OAuth 2.0 Authorization Code Flow with PKCE",
    categoryId: "coding",
    description: "Implements secure OAuth 2.0 Authorization Code Flow with Proof Key for Code Exchange (PKCE) for Single Page Apps and native mobile clients.",
    tags: ["coding","oauth2","pkce","security","authentication","spa"],
    transform: createStandardSkillTransform({
      sectionName: "OAuth 2.0 PKCE Security Protocol",
      ruSectionName: "Протокол авторизации OAuth 2.0 с защитой PKCE (Proof Key for Code Exchange)",
      instructions: [
        "Generate a high-entropy cryptographic `code_verifier` and compute its SHA-256 `code_challenge`.",
        "Pass `code_challenge` and `code_challenge_method=S256` in the initial authorization URL.",
        "Exchange received authorization code alongside raw `code_verifier` directly at the token endpoint.",
        "Verify `state` parameter to prevent cross-site request forgery authorization attacks."
],
      ruInstructions: [
        "Генерируйте криптографически стойкий случайный `code_verifier` и вычисляйте его SHA-256 хэш `code_challenge`.",
        "Передавайте `code_challenge` и параметр `code_challenge_method=S256` в запросе на авторизацию.",
        "Обменивайте полученный код авторизации на токены с передачей исходного `code_verifier` на эндпоинте `/token`.",
        "Проверяйте совпадение параметра `state` для защиты от атак межсайтовой подделки авторизации."
],
      semanticType: "protocol",
      tags: ["coding","oauth2","pkce","security","authentication","spa"],
    }),
  },

  "cross-browser-polyfilling-feature-detection": {
    id: "cross-browser-polyfilling-feature-detection",
    name: "CrossBrowserPolyfillingFeatureDetectionSkill",
    displayName: "Progressive Enhancement & Feature Detection Architecture",
    categoryId: "coding",
    description: "Architects resilient frontend applications that gracefully degrade across older browser engines using dynamic feature detection instead of fragile user-agent sniffing.",
    tags: ["coding","cross-browser","feature-detection","progressive-enhancement","compatibility"],
    transform: createStandardSkillTransform({
      sectionName: "Feature Detection & Progressive Enhancement Protocol",
      ruSectionName: "Протокол прогрессивного улучшения и проверки возможностей браузера (Feature Detection)",
      instructions: [
        "Detect browser capabilities dynamically using `if (\"IntersectionObserver\" in window)` feature checks.",
        "Never rely on fragile, easily spoofed `navigator.userAgent` string sniffing.",
        "Load modern JavaScript polyfills asynchronously on-demand only when a required capability is absent.",
        "Ensure core functional workflows remain fully operational even if advanced animations or visual effects are unsupported."
],
      ruInstructions: [
        "Проверяйте поддержку API динамически через прямое обращение к объектам (`\"IntersectionObserver\" in window`).",
        "Никогда не завязывайте логику на разбор строки браузера `navigator.userAgent`.",
        "Загружайте полифилы асинхронно по требованию только для тех клиентов, у которых отсутствует нативная поддержка.",
        "Гарантируйте доступность базового функционала приложения даже при отключенных визуальных эффектах."
],
      semanticType: "process_directive",
      tags: ["coding","cross-browser","feature-detection","progressive-enhancement","compatibility"],
    }),
  },

  "webassembly-c-cpp-emscripten-compile": {
    id: "webassembly-c-cpp-emscripten-compile",
    name: "WebassemblyCCppEmscriptenCompileSkill",
    displayName: "C/C++ to WebAssembly (Wasm) Compilation & Linear Memory Bridge",
    categoryId: "coding",
    description: "Compiles high-performance C/C++ modules to WebAssembly using Emscripten, managing linear memory allocation, pointers, and JS bindings.",
    tags: ["coding","webassembly","wasm","c-cpp","emscripten","low-level"],
    transform: createStandardSkillTransform({
      sectionName: "WebAssembly C/C++ Interop Protocol",
      ruSectionName: "Протокол компиляции C/C++ в WebAssembly и работы с линейной памятью (Wasm)",
      instructions: [
        "Compile C/C++ source code using Emscripten flags: `-s WASM=1 -O3 -s ALLOW_MEMORY_GROWTH=1`.",
        "Manage linear memory lifecycle: allocate buffers via `_malloc()` and free immediately after use via `_free()`.",
        "Transfer byte arrays between JavaScript typed arrays (`Uint8Array`) and Wasm linear memory pointers.",
        "Export C API functions using `EMSCRIPTEN_KEEPALIVE` decorators to prevent compiler dead-code elimination."
],
      ruInstructions: [
        "Компилируйте исходный код C/C++ через Emscripten с флагами оптимизации `-O3 -s WASM=1`.",
        "Управляйте жизненным циклом линейной памяти: выделяйте память через `_malloc()` и освобождайте через `_free()`.",
        "Передавайте массивы байтов между JavaScript TypedArrays и линейной памятью Wasm по указателям.",
        "Экспортируйте функции C-интерфейса с макросом `EMSCRIPTEN_KEEPALIVE` для предотвращения вырезания компилятором."
],
      semanticType: "process_directive",
      tags: ["coding","webassembly","wasm","c-cpp","emscripten","low-level"],
    }),
  },

  "api-pagination-cursor-vs-offset": {
    id: "api-pagination-cursor-vs-offset",
    name: "ApiPaginationCursorVsOffsetSkill",
    displayName: "Cursor-Based vs Keyset Pagination for High-Scale APIs",
    categoryId: "coding",
    description: "Replaces inefficient SQL OFFSET/LIMIT pagination with high-scale Keyset / Cursor-based pagination to eliminate database scan performance degradation.",
    tags: ["coding","pagination","cursor-pagination","sql","api-design","performance"],
    transform: createStandardSkillTransform({
      sectionName: "Cursor-Based Pagination Protocol",
      ruSectionName: "Протокол курсорной пагинации и масштабирования выборок (Cursor-Based Pagination)",
      instructions: [
        "Disallow deep `OFFSET N` queries which force the database to scan and discard N rows linearly.",
        "Implement Keyset pagination using indexed columns: `WHERE (created_at, id) < ($last_created_at, $last_id) ORDER BY created_at DESC, id DESC LIMIT $limit`.",
        "Encode cursor strings as opaque Base64-encoded serialized tokens passed to clients.",
        "Return pagination metadata: `hasNextPage`, `endCursor`, and page size in response envelopes."
],
      ruInstructions: [
        "Запрещайте использование больших `OFFSET N` в БД, приводящих к линейному сканированию и сбросу N строк.",
        "Используйте пагинацию по ключам (Keyset) по индексированным полям: `WHERE (created_at, id) < (...) ORDER BY created_at DESC, id DESC LIMIT N`.",
        "Кодируйте курсор в непрозрачную строку Base64 для передачи клиентским приложениям.",
        "Возвращайте метаданные пагинации: флаг `hasNextPage`, строку `endCursor` и число записей в ответе."
],
      semanticType: "structural_directive",
      tags: ["coding","pagination","cursor-pagination","sql","api-design","performance"],
    }),
  },

  "chaos-monkey-network-latency-simulation": {
    id: "chaos-monkey-network-latency-simulation",
    name: "ChaosMonkeyNetworkLatencySimulationSkill",
    displayName: "Chaos Network Jitter, Latency Injection & Proxy Simulation",
    categoryId: "coding",
    description: "Simulates real-world network degradations (packet loss, latency spikes, TCP connection drops) using Toxiproxy or local middleware proxies.",
    tags: ["coding","chaos-testing","resilience","latency-injection","network-simulation"],
    transform: createStandardSkillTransform({
      sectionName: "Chaos Network Latency Simulation Protocol",
      ruSectionName: "Протокол симуляции сетевых сбоев и задержек (Chaos Proxy Testing)",
      instructions: [
        "Inject configurable network latencies, jitter, and packet loss into test environment service proxies.",
        "Simulate abrupt socket resets and bandwidth throttling to verify client timeout and reconnect logic.",
        "Verify that application services degrade gracefully without hanging connection pools or cascading outages.",
        "Automate chaos resilience assertions in continuous integration test suites."
],
      ruInstructions: [
        "Внедряйте настраиваемые задержки, джиттер и процент потери пакетов в тестовые прокси-соединения сервисов.",
        "Моделируйте внезапные разрывы TCP-сокетов и сужение пропускной способности для проверки таймаутов клиента.",
        "Убеждайтесь, что сервисы корректно обрабатывают деградацию сети без зависания пулов соединений.",
        "Автоматизируйте проверки отказоустойчивости в пайплайнах интеграционного тестирования."
],
      semanticType: "process_directive",
      tags: ["coding","chaos-testing","resilience","latency-injection","network-simulation"],
    }),
  },
};

