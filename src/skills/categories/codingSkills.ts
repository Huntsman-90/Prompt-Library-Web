import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const CODING_SKILLS: Record<string, SkillDefinition> = {
  'code-audit-smells': {
    id: 'code-audit-smells',
    name: 'CodeAuditSmellsSkill',
    displayName: 'Code Smell & Anti-Pattern Detection',
    categoryId: 'coding',
    description: 'Audits codebases for SOLID violations, hidden mutations, memory leaks, and cyclomatic bloat.',
    tags: ['coding', 'code-smells', 'audit', 'solid', 'refactoring', 'clean-code'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Протокол Аудита Дефектов и Code Smells',
        'Code Smell & Architectural Audit Protocol',
        [
          '- **Нарушения SOLID**: Выявить раздутые классы (God Object), жесткую связность и нарушение инверсии зависимостей.',
          '- **Неявные мутации состояния**: Проверить отсутствие побочных эффектов (side-effects) в чистых функциях.',
          '- **Цикломатическая сложность**: Изолировать глубоко вложенные конструкции `if/else` и тернарные операторы.',
        ],
        [
          '- **SOLID Violations**: Flag God Objects, tight coupling, and leaky abstraction interfaces.',
          '- **Hidden State Mutations**: Audit functions for unintended side-effects and mutable references.',
          '- **Cyclomatic Bloat**: Refactor nested control structures and complex ternary cascades into early-return guards.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'type-safety-contracts': {
    id: 'type-safety-contracts',
    name: 'TypeSafetyContractsSkill',
    displayName: 'Type Safety & Invariant Contracts',
    categoryId: 'coding',
    description: 'Enforces strict static typing: zero `any`, discriminated unions, brand types, and boundary assertions.',
    tags: ['coding', 'typescript', 'type-safety', 'contracts', 'invariants'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Контракт Строгой Типобезопасности',
        'Static Type Safety & Invariant Contracts',
        [
          '- **Тотальный запрет на `any`**: Использовать строгие интерфейсы, `unknown` с type guards и `readonly` свойства.',
          '- **Дискриминантные объединения (Discriminated Unions)**: Описывать полиморфные состояния через явный дискриминатор `kind / type`.',
          '- **Брендированные типы (Brand Types)**: Предотвращать случайное смешивание примитивов (`UserId`, `AccountId`).',
        ],
        [
          '- **Zero `any` Mandate**: Enforce strict interfaces, `unknown` with runtime type guards, and `readonly` immutability.',
          '- **Discriminated Unions**: Model polymorphic domain states using explicit discriminant keys (`kind / type`).',
          '- **Branded Primitives**: Prevent structural primitive confusion via phantom nominal typing (`type UserId = string & { __brand: "UserId" }`).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'regression-test-specs': {
    id: 'regression-test-specs',
    name: 'RegressionTestSpecsSkill',
    displayName: 'Vitest / Jest Regression Test Suite',
    categoryId: 'coding',
    description: 'Specifies executable unit and integration test suites covering happy paths, edge cases, and failure modes.',
    tags: ['coding', 'tests', 'vitest', 'jest', 'regression', 'unit-tests'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Спецификация Регрессионных Тестов (Vitest / Jest)',
        'Regression Test Suite Specification (Vitest / Jest)',
        [
          '- Написать исчерпывающие тесты: 1. Номинальный сценарий, 2. Граничные условия (0, null, пустой массив), 3. Сбои сети и таймауты.',
          '- Использовать понятную структуру `describe -> it(\'should...\') -> expect`.',
        ],
        [
          '- Deliver exhaustive test suites: 1. Happy-path assertions, 2. Boundary conditions (0, null, empty array), 3. Fault injection & timeouts.',
          '- Structure tests with clean BDD semantics: `describe -> it(\'should...\') -> expect`.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'clean-architecture-decoupling': {
    id: 'clean-architecture-decoupling',
    name: 'CleanArchitectureDecouplingSkill',
    displayName: 'Clean Architecture Layered Decoupling',
    categoryId: 'coding',
    description: 'Enforces strict separation of concerns: Domain Core -> Use Cases -> Adapters -> Frameworks.',
    tags: ['coding', 'clean-architecture', 'domain-driven', 'decoupling', 'layers'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Слоистая Архитектура (Clean Architecture)',
        'Clean Architecture Layered Decoupling',
        [
          '- **Ядро домена (Domain Core)**: Чистая бизнес-логика без зависимостей от React, Express или SQL.',
          '- **Интерфейсные адаптеры (Adapters)**: Конвертеры между форматами внешнего мира и внутренними сущностями.',
        ],
        [
          '- **Domain Core**: Pure business logic with zero framework dependencies (no React, Express, or SQL imports).',
          '- **Adapters & Ports**: Clear translation boundaries separating network I/O from internal domain entities.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'concurrency-race-mitigation': {
    id: 'concurrency-race-mitigation',
    name: 'ConcurrencyRaceMitigationSkill',
    displayName: 'Concurrency & Race Condition Mitigation',
    categoryId: 'coding',
    description: 'Shields async flows against race conditions, ABA anomalies, unhandled rejections, and dangling promises.',
    tags: ['coding', 'concurrency', 'async', 'race-condition', 'mutex', 'promises'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Устранение Состояний Гонки (Race Conditions)',
        'Concurrency Safety & Race Condition Mitigation',
        [
          '- Использовать `AbortController` для отмены устаревших сетевых запросов.',
          '- Применять мьютексы/очереди для атомарной модификации разделяемого асинхронного состояния.',
        ],
        [
          '- Mandate `AbortController` signaling to cancel obsolete in-flight async promises.',
          '- Implement async mutexes or serialized queues for atomic shared-state mutations.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'performance-profiling-optimization': {
    id: 'performance-profiling-optimization',
    name: 'PerformanceProfilingOptimizationSkill',
    displayName: 'High-Performance Profiling & Optimization',
    categoryId: 'coding',
    description: 'Optimizes runtime CPU bottlenecks, memory allocations, garbage collection pauses, and Big-O complexity.',
    tags: ['coding', 'performance', 'profiling', 'big-o', 'optimization', 'cpu'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Профилирование и Оптимизация Производительности',
        'Performance Profiling & Big-O Optimization',
        [
          '- Снизить временную сложность с O(N^2) до O(N) с помощью хэш-таблиц (Map/Set).',
          '- Минимизировать аллокации в циклах для снижения давления на сборщик мусора (GC pressure).',
        ],
        [
          '- Compress algorithmic complexity from O(N^2) to O(N) leveraging constant-time Map/Set lookups.',
          '- Eliminate redundant object allocations inside hot loops to reduce Garbage Collection pauses.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'error-result-pattern': {
    id: 'error-result-pattern',
    name: 'ErrorResultPatternSkill',
    displayName: 'Result<T, E> Algebraic Error Handling',
    categoryId: 'coding',
    description: 'Replaces untyped `throw new Error()` exceptions with explicit compiler-enforced `Result<T, E>` unions.',
    tags: ['coding', 'errors', 'result-type', 'monad', 'type-safety'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Алгебраическая Обработка Ошибок (Result<T, E>)',
        'Algebraic Error Handling (Result<T, E>) Protocol',
        [
          '- Запрещен бесконтрольный выброс `throw`; функции обязаны возвращать `{ ok: true, data: T } | { ok: false, error: E }`.',
          '- Каждая возможная ошибка должна быть явно типизирована в дискриминантном типе `E`.',
        ],
        [
          '- Ban untyped `throw`; functions must return typed unions: `{ ok: true, data: T } | { ok: false, error: E }`.',
          '- Require exhaustive pattern matching across all typed error variants.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'api-contract-harden': {
    id: 'api-contract-harden',
    name: 'ApiContractHardenSkill',
    displayName: 'Zod Boundary Schema API Hardening',
    categoryId: 'coding',
    description: 'Hardens API boundaries using Zod/Valibot schema parsers, guaranteeing zero unvalidated payloads.',
    tags: ['coding', 'api', 'zod', 'schema', 'validation', 'security'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Валидация Границ с Помощью Zod/Valibot',
        'API Boundary Hardening with Zod Schemas',
        [
          '- Описать входящие данные схемой Zod: `z.object({...}).strict()`.',
          '- Парсить полезную нагрузку через `schema.safeParse(input)` до передачи во внутренние сервисы.',
        ],
        [
          '- Enforce strict schema validation on all network I/O boundaries via `z.object({...}).strict()`.',
          '- Execute runtime assertions using `schema.safeParse(input)` prior to domain ingestion.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'database-query-optimization': {
    id: 'database-query-optimization',
    name: 'DatabaseQueryOptimizationSkill',
    displayName: 'SQL EXPLAIN ANALYZE Query Tuning',
    categoryId: 'coding',
    description: 'Optimizes SQL queries: eliminates N+1 queries, leverages composite covering indexes, and uses CTEs.',
    tags: ['coding', 'sql', 'query-tuning', 'indexes', 'postgres', 'performance'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Оптимизация SQL-Запросов (EXPLAIN ANALYZE)',
        'SQL Query Tuning & Index Topology Optimization',
        [
          '- Устранить проблему N+1 запросов с помощью `JOIN` или пакетной выборки `WHERE IN (...)`.',
          '- Спроектировать составные B-Tree/GIN индексы под частые условия фильтрации.',
        ],
        [
          '- Eradicate N+1 query patterns via eager joins or batched `WHERE IN (...)` loading.',
          '- Engineer composite covering B-Tree/GIN indexes matched to query predicate topologies.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'security-vulnerability-patching': {
    id: 'security-vulnerability-patching',
    name: 'SecurityVulnerabilityPatchingSkill',
    displayName: 'OWASP Top 10 Security Hardening',
    categoryId: 'coding',
    description: 'Hardens code against XSS, SQL injection, CSRF, SSRF, prototype pollution, and path traversal.',
    tags: ['coding', 'security', 'owasp', 'xss', 'sql-injection', 'hardening'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Защита от Уязвимостей OWASP Top 10',
        'OWASP Top 10 Security Hardening Mandate',
        [
          '- Запрещена конкатенация строк в SQL/HTML; использовать параметризованные запросы и автоэкранирование.',
          '- Проверять пути к файлам на отсутствие path traversal (`../`).',
        ],
        [
          '- Strictly ban string concatenation in SQL or HTML builders; mandate parameterized queries and auto-escaping.',
          '- Assert strict sanitization against path traversal vectors (`../`) and prototype pollution.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'refactoring-martin-fowler': {
    id: 'refactoring-martin-fowler',
    name: 'RefactoringMartinFowlerSkill',
    displayName: 'Martin Fowler Canonical Refactoring Patterns',
    categoryId: 'coding',
    description: 'Applies canonical refactorings: Extract Method, Replace Conditional with Polymorphism, Introduce Parameter Object.',
    tags: ['coding', 'refactoring', 'martin-fowler', 'clean-code', 'design-patterns'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Канонический Рефакторинг (Мартин Фаулер)',
        'Martin Fowler Canonical Refactoring Catalog',
        [
          '- Применить паттерны: **Extract Method** (выделение метода), **Introduce Parameter Object** (объект параметров), **Replace Conditional with Polymorphism**.',
        ],
        [
          '- Execute formal refactoring transformations: **Extract Method**, **Introduce Parameter Object**, **Replace Conditional with Polymorphism**.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'modern-design-patterns': {
    id: 'modern-design-patterns',
    name: 'ModernDesignPatternsSkill',
    displayName: 'GoF & Modern Cloud Design Patterns',
    categoryId: 'coding',
    description: 'Implements battle-tested design patterns: Strategy, Factory, Observer, Circuit Breaker, Outbox Pattern.',
    tags: ['coding', 'design-patterns', 'gof', 'architecture', 'strategy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Паттерны Проектирования (Design Patterns)',
        'Modern Software & Cloud Design Patterns',
        [
          '- Использовать проверенные паттерны: **Strategy** для смены алгоритмов, **Transactional Outbox** для надежной отправки событий.',
        ],
        [
          '- Leverage standard patterns: **Strategy** for swappable business algorithms, **Transactional Outbox** for guaranteed event delivery.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'memory-leak-prevention': {
    id: 'memory-leak-prevention',
    name: 'MemoryLeakPreventionSkill',
    displayName: 'Memory Leak & Resource Cleanup Guard',
    categoryId: 'coding',
    description: 'Guarantees cleanup of dangling event listeners, timers, web sockets, and circular references.',
    tags: ['coding', 'memory-leaks', 'cleanup', 'react', 'node', 'event-listeners'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Предотвращение Утечек Памяти (Memory Safety)',
        'Memory Leak & Lifecycle Cleanup Directives',
        [
          '- Все таймеры `setInterval`, подписки на события и сокеты обязаны иметь функции отписки в блоках `cleanup / useEffect / dispose`.',
        ],
        [
          '- Mandate explicit cleanup handlers for all event listeners, intervals, and WebSocket subscriptions in `dispose / useEffect` lifecycles.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'defensive-null-safety': {
    id: 'defensive-null-safety',
    name: 'DefensiveNullSafetySkill',
    displayName: 'Defensive Null-Safety & Optionals',
    categoryId: 'coding',
    description: 'Enforces optional chaining (`?.`), nullish coalescing (`??`), and explicit default values.',
    tags: ['coding', 'null-safety', 'optional-chaining', 'typescript', 'defensive'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Защита от Undefined/Null (Null Safety)',
        'Defensive Null Safety & Coalescing Directives',
        [
          '- Использовать `?.` и `??` во всех точках доступа к внешним объектам; запрещено полагаться на неявное приведение типов.',
        ],
        [
          '- Mandate non-nullable assertions, optional chaining (`?.`), and nullish coalescing (`??`) across all external object lookups.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'legacy-code-characterization': {
    id: 'legacy-code-characterization',
    name: 'LegacyCodeCharacterizationSkill',
    displayName: 'Legacy Code Characterization Testing (Feathers)',
    categoryId: 'coding',
    description: 'Applies Michael Feathers\' techniques to safely wrap legacy black-box code in golden characterization tests before refactoring.',
    tags: ['coding', 'legacy-code', 'characterization', 'feathers', 'golden-tests'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Характеризационные Тесты для Легаси (Michael Feathers)',
        'Legacy Characterization Testing Protocol',
        [
          '- Шаг 1: Написать характеризующие тесты, фиксирующие текущее реальное поведение (включая баги).',
          '- Шаг 2: Провести рефакторинг с гарантией сохранения всех зафиксированных тестов.',
        ],
        [
          '- Step 1: Write golden characterization test harnesses locking in current runtime behavior.',
          '- Step 2: Refactor underlying modules while maintaining 100% test suite passage.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
