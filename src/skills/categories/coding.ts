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
};

