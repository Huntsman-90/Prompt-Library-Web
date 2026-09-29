import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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
};
