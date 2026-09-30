const { appendSkills } = require('../appendSkills.cjs');

const CODING_35 = [
  {
    id: "coding-solid-single-responsibility-decoupler",
    name: "CodingSolidSingleResponsibilityDecouplerSkill",
    displayName: "Single Responsibility Principle (SRP) Class Decoupler",
    categoryId: "coding",
    description: "Refactors monolithic classes with multiple reasons to change into cohesive, single-responsibility services.",
    tags: ["coding", "solid", "srp", "refactoring", "clean-code"],
    sectionName: "Single Responsibility Principle (SRP) Standards",
    ruSectionName: "Принцип единственной ответственности (SRP по Роберту Мартину)",
    instructions: [
      "Ensure each class or module has exactly one reason to change and encapsulates one cohesive business concern.",
      "Extract persistence, formatting, and validation logic into dedicated collaborator classes.",
      "Inject dependencies via constructor interfaces to enable isolated unit testing."
    ],
    ruInstructions: [
      "Гарантируйте, что каждый класс имеет единственную причину для изменений.",
      "Выносите логику сохранения в БД, валидации и форматирования в отдельные классы.",
      "Внедряйте зависимости через интерфейсы в конструкторе для изоляции тестов."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-solid-open-closed-strategy-pattern",
    name: "CodingSolidOpenClosedStrategyPatternSkill",
    displayName: "Open/Closed Principle (OCP) & Strategy Pattern",
    categoryId: "coding",
    description: "Replaces brittle switch/if-else cascades with extensible polymorphic Strategy patterns.",
    tags: ["coding", "solid", "ocp", "strategy-pattern", "polymorphism"],
    sectionName: "Open/Closed Principle & Strategy Pattern Standards",
    ruSectionName: "Принцип открытости/закрытости (OCP) и паттерн Стратегия",
    instructions: [
      "Code must be open for extension but closed for modification.",
      "Replace branching `switch(type)` cascades with a polymorphic Strategy registry map.",
      "Add new behaviors by registering new Strategy classes without touching existing battle-tested code."
    ],
    ruInstructions: [
      "Классы должны быть открыты для расширения, но закрыты для модификации.",
      "Заменяйте ветвящиеся конструкции `switch` полиморфным реестром стратегий.",
      "Добавляйте новые типы поведения путем регистрации новых классов без правок существующего кода."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-solid-liskov-substitution-principle",
    name: "CodingSolidLiskovSubstitutionPrincipleSkill",
    displayName: "Liskov Substitution Principle (LSP) Contract Adherence",
    categoryId: "coding",
    description: "Ensures derived classes honor base class behavioral contracts without throwing unexpected exceptions.",
    tags: ["coding", "solid", "lsp", "oop", "contract-compliance"],
    sectionName: "Liskov Substitution Principle (LSP) Invariants",
    ruSectionName: "Принцип подстановки Барбары Лисков (LSP) и сохранение контракта",
    instructions: [
      "Subtypes must be substitutable for their base types without altering system correctness.",
      "Never weaken preconditions or strengthen postconditions in subclass overrides.",
      "Never throw `NotImplementedException` in concrete subclass methods."
    ],
    ruInstructions: [
      "Подклассы должны полностью заменять базовые классы без нарушения логики работы программы.",
      "Не ужесточайте предусловия и не ослабляйте постусловия в переопределенных методах.",
      "Категорически запрещено выбрасывать `NotImplementedException` в методах наследников."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-solid-interface-segregation-principle",
    name: "CodingSolidInterfaceSegregationPrincipleSkill",
    displayName: "Interface Segregation Principle (ISP) Role Interfaces",
    categoryId: "coding",
    description: "Splits fat interfaces into fine-grained, client-specific role interfaces.",
    tags: ["coding", "solid", "isp", "interfaces", "clean-architecture"],
    sectionName: "Interface Segregation Principle (ISP) Standards",
    ruSectionName: "Принцип разделения интерфейсов (ISP): узкие ролевые интерфейсы",
    instructions: [
      "Clients should never be forced to depend on methods they do not use.",
      "Split fat interfaces into small, cohesive role interfaces (`Readable`, `Writable`, `Closable`).",
      "Compose rich objects through multiple small interface implementations."
    ],
    ruInstructions: [
      "Клиенты не должны зависеть от методов интерфейса, которые они не используют.",
      "Разбивайте громоздкие интерфейсы на компактные ролевые интерфейсы (например, `Reader`, `Writer`).",
      "Собирайте сложные объекты через композицию нескольких специализированных интерфейсов."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-state-machine-xstate-v5-actor",
    name: "CodingStateMachineXstateV5ActorSkill",
    displayName: "XState v5 Actor Model & Statecharts (TypeScript)",
    categoryId: "coding",
    description: "Implements deterministic Statecharts using XState v5 with strongly typed context, events, and actions.",
    tags: ["coding", "xstate", "statecharts", "actor-model", "typescript", "frontend"],
    sectionName: "XState v5 Statechart & Actor Model Standards",
    ruSectionName: "Архитектура конечных автоматов на XState v5 (Statecharts & Actor Model)",
    instructions: [
      "Define statecharts using `setup({...}).createMachine({...})` with strong type inference for events and context.",
      "Eliminate boolean state flags (`isLoading`, `isError`, `isSuccess`) in favor of discrete finite states.",
      "Coordinate concurrent sub-machines using actor spawning and event messaging."
    ],
    ruInstructions: [
      "Создавайте стейтчарты через функцию `setup()` со строгой типизацией контекста и событий.",
      "Заменяйте россыпь булевых флагов (`isLoading`, `isError`) явными непересекающимися состояниями.",
      "Координируйте параллельные процессы через модель акторов и обмен сообщениями."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-indexeddb-dexie-reactive-storage",
    name: "CodingIndexeddbDexieReactiveStorageSkill",
    displayName: "Dexie.js IndexedDB Reactive Storage & Observable Queries",
    categoryId: "coding",
    description: "Implements client-side reactive IndexedDB databases with Dexie.js `useLiveQuery` hooks and versioned migrations.",
    tags: ["coding", "indexeddb", "dexie", "offline-first", "react", "storage"],
    sectionName: "Dexie.js IndexedDB Reactive Storage Standards",
    ruSectionName: "Реактивное локальное хранилище IndexedDB на базе Dexie.js",
    instructions: [
      "Define versioned Dexie schemas with indexed primary keys and composite search indexes.",
      "Bind UI components reactively using `useLiveQuery(() => db.table.toArray())`.",
      "Wrap multi-table mutations in atomic `db.transaction('rw', ...)` blocks."
    ],
    ruInstructions: [
      "Описывайте версионированные схемы Dexie с индексированными ключами поиска.",
      "Подключайте реактивные запросы в React через хук `useLiveQuery`.",
      "Оборачивайте изменения нескольких таблиц в атомарные транзакции `db.transaction()`."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-nextjs-app-router-turbopack-standards",
    name: "CodingNextjsAppRouterTurbopackStandardsSkill",
    displayName: "Next.js 15 App Router & Server Components Architecture",
    categoryId: "coding",
    description: "Structures modern Next.js 15 apps with parallel routes, intercepting routes, Server Actions, and metadata generation.",
    tags: ["coding", "nextjs", "react", "app-router", "server-components", "turbopack"],
    sectionName: "Next.js 15 App Router Architecture Standards",
    ruSectionName: "Стандарты Next.js 15 App Router (Параллельные маршруты, Server Actions)",
    instructions: [
      "Organize routes using `(groups)`, `[dynamic]`, `@slots` (parallel routes), and `(.)intercept` handlers.",
      "Implement dynamic OpenGraph and SEO metadata via `generateMetadata()`.",
      "Handle data fetching directly in async Server Components with fine-grained `revalidatePath()`."
    ],
    ruInstructions: [
      "Организуйте файловую структуру с группами маршрутов, слотами и перехватывающими роутами.",
      "Генерируйте динамические SEO-метаданные через функцию `generateMetadata()`.",
      "Загружайте данные напрямую в асинхронных серверных компонентах с точечной инвалидацией кэша."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-graphql-codegen-typescript-types",
    name: "CodingGraphqlCodegenTypescriptTypesSkill",
    displayName: "GraphQL Code Generator & Fully Typed Client SDK",
    categoryId: "coding",
    description: "Automates end-to-end type safety from GraphQL SDL to React Query/Apollo client hooks via graphql-codegen.",
    tags: ["coding", "graphql", "codegen", "typescript", "type-safety", "apollo"],
    sectionName: "GraphQL Code Generator & Typed Client Workflow",
    ruSectionName: "Генерация типов GraphQL Code Generator для клиентских хуков (TypeScript)",
    instructions: [
      "Configure `codegen.yml` to compile operations into fully-typed React Query or Apollo hooks.",
      "Generate strict TypeScript types matching exact query selection sets with `TypedDocumentNode`.",
      "Eliminate manual interface maintenance for API response payloads."
    ],
    ruInstructions: [
      "Настройте `codegen.yml` для автоматической генерации типизированных хуков React Query / Apollo.",
      "Генерируйте точные типы для каждого конкретного запроса с использованием `TypedDocumentNode`.",
      "Исключите ручное написание интерфейсов ответов API."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-docker-compose-local-dev-environment",
    name: "CodingDockerComposeLocalDevEnvironmentSkill",
    displayName: "Reproducible Local Docker Compose Dev Environment",
    categoryId: "coding",
    description: "Sets up complete local development environments (Postgres, Redis, Kafka, Mailpit) with healthchecks and seed scripts.",
    tags: ["coding", "docker-compose", "local-dev", "database", "redis", "devops"],
    sectionName: "Docker Compose Local Development Stack Standard",
    ruSectionName: "Стандарт локального окружения разработки на Docker Compose",
    instructions: [
      "Configure local services (Postgres, Redis, Mock API, Mailpit) with named volume persistence.",
      "Include initialization SQL scripts mounted to `/docker-entrypoint-initdb.d` for automatic DB seeding.",
      "Bind services to standard non-conflicting host ports with automatic restart policies."
    ],
    ruInstructions: [
      "Настройте локальный стек сервисов (PostgreSQL, Redis, Kafka) с сохранением данных в именованных томах.",
      "Подключите скрипты начальной инициализации и сидирования тестовых данных.",
      "Настройте неконфликтующие порты и автоматический перезапуск контейнеров."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-zustand-state-management-slices",
    name: "CodingZustandStateManagementSlicesSkill",
    displayName: "Zustand State Store & Slice Pattern Architecture",
    categoryId: "coding",
    description: "Structures scalable React client state using Zustand with TypeScript slice patterns, persistence, and devtools.",
    tags: ["coding", "zustand", "react", "state-management", "typescript", "slices"],
    sectionName: "Zustand Slice Pattern & State Management Standards",
    ruSectionName: "Архитектура стейт-менеджмента Zustand (Slice Pattern & Persistence)",
    instructions: [
      "Decompose large global stores into modular slice creators: `createAuthSlice`, `createThemeSlice`.",
      "Enforce immutable state updates inside slice actions using Immer middleware if needed.",
      "Attach `persist` middleware with selective storage whitelists and versioned migrations."
    ],
    ruInstructions: [
      "Разбивайте глобальное состояние на модульные слайсы (Auth, Theme, Cart).",
      "Обеспечьте неизменяемость состояния при выполнении экшенов.",
      "Настройте middleware `persist` с выборочным сохранением полей в localStorage."
    ],
    semanticType: "protocol"
  }
];

console.log('Appending Coding 35...');
appendSkills('coding', CODING_35);
console.log('Coding 35 appended.');
