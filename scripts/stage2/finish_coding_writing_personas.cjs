const { appendSkills } = require('../appendSkills.cjs');

const CODING_SKILLS = [
  {
    id: "coding-tailwind-css-custom-design-tokens",
    name: "CodingTailwindCssCustomDesignTokensSkill",
    displayName: "Tailwind CSS v4 Design Token & CSS Variable System",
    categoryId: "coding",
    description: "Configures custom CSS variables, design tokens, color scales, and theme extensions in Tailwind CSS v4.",
    tags: ["coding", "tailwind", "design-tokens", "css-variables", "styling"],
    sectionName: "Tailwind CSS Design Tokens & Variable System",
    ruSectionName: "Система дизайн-токенов и CSS-переменных (Tailwind CSS v4)",
    instructions: [
      "Define semantic color tokens (`--primary`, `--surface-elevated`) using OKLCH color space for perceptual uniformity.",
      "Integrate `@theme` blocks in global CSS without legacy JavaScript config files.",
      "Ensure automatic dark mode transitions using CSS custom properties."
    ],
    ruInstructions: [
      "Задавайте семантические токены в пространстве OKLCH для идеального цветового восприятия.",
      "Используйте блок `@theme` в глобальном CSS без устаревших конфигурационных JS-файлов.",
      "Настройте плавное автоматическое переключение темной темы через CSS-переменные."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-node-worker-threads-parallel-cpu",
    name: "CodingNodeWorkerThreadsParallelCpuSkill",
    displayName: "Node.js Worker Threads & Parallel CPU Computation Pool",
    categoryId: "coding",
    description: "Offloads heavy CPU cryptographic or parsing tasks to a managed pool of Node.js `worker_threads`.",
    tags: ["coding", "nodejs", "worker-threads", "concurrency", "performance"],
    sectionName: "Node.js Worker Threads Pool Standards",
    ruSectionName: "Пул рабочих потоков Node.js Worker Threads для тяжелых вычислений",
    instructions: [
      "Offload CPU-intensive operations (image processing, hashing, big JSON parsing) away from the main event loop.",
      "Manage worker lifecycles with a bounded pool (e.g. `piscina`) matching CPU core count.",
      "Transfer binary memory using `SharedArrayBuffer` or Transferable Objects with zero serialization copying."
    ],
    ruInstructions: [
      "Выносите ресурсоемкие операции (хэширование, обработка графики) из основного Event Loop.",
      "Управляйте жизненным циклом потоков через фиксированный пул по числу ядер CPU.",
      "Передавайте бинарные данные через `SharedArrayBuffer` без накладных расходов на сериализацию."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-sql-window-functions-analytics",
    name: "CodingSqlWindowFunctionsAnalyticsSkill",
    displayName: "SQL Window Functions & Analytical Partitioning (PostgreSQL)",
    categoryId: "coding",
    description: "Constructs complex analytical queries using `ROW_NUMBER()`, `RANK()`, `LAG()`, `LEAD()`, and rolling `OVER (PARTITION BY...)`.",
    tags: ["coding", "sql", "window-functions", "postgresql", "analytics"],
    sectionName: "SQL Analytical Window Functions Standards",
    ruSectionName: "Аналитические оконные функции SQL (ROW_NUMBER, LAG/LEAD, PARTITION BY)",
    instructions: [
      "Use `PARTITION BY` and `ORDER BY` inside `OVER (...)` to compute running totals and rankings.",
      "Compute period-over-period differences using `LAG()` and `LEAD()` without self-joins.",
      "Filter ranked results efficiently using Common Table Expressions (CTE) and `QUALIFY` / `WHERE row_num = 1`."
    ],
    ruInstructions: [
      "Используйте `PARTITION BY` и `ORDER BY` внутри `OVER (...)` для расчета скользящих итогов и рангов.",
      "Вычисляйте изменения между периодами с помощью функций `LAG()` и `LEAD()` без лишних JOIN.",
      "Фильтруйте топ-N записей через CTE и предикаты по номеру строки `row_num = 1`."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-react-virtualized-infinite-list",
    name: "CodingReactVirtualizedInfiniteListSkill",
    displayName: "TanStack Virtual (Virtual List & Infinite Scrolling)",
    categoryId: "coding",
    description: "Renders 100,000+ DOM nodes with 60 FPS performance by virtualizing only visible viewport window rows.",
    tags: ["coding", "react", "virtualization", "tanstack-virtual", "performance", "dom"],
    sectionName: "TanStack Virtual DOM Windowing Standards",
    ruSectionName: "Виртуализация длинных списков (TanStack Virtual, 60 FPS, Infinite Scroll)",
    instructions: [
      "Instantiate `useVirtualizer` with estimated row sizes and parent scroll container ref.",
      "Render only elements intersecting the active viewport plus a small buffer window (e.g. `overscan: 5`).",
      "Support dynamic row height measurement with zero layout shift."
    ],
    ruInstructions: [
      "Инициализируйте хук `useVirtualizer` с примерной высотой строки и ссылкой на контейнер.",
      "Рендерите только видимые элементы в окне просмотра с небольшим буфером (overscan).",
      "Обеспечьте поддержку динамической высоты строк без сдвигов верстки."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-security-helmet-csp-headers",
    name: "CodingSecurityHelmetCspHeadersSkill",
    displayName: "Express / Fastify Helmet Security & Content Security Policy (CSP)",
    categoryId: "coding",
    description: "Configures strict HTTP security headers: Content-Security-Policy (CSP), HSTS, X-Content-Type-Options, Referrer-Policy.",
    tags: ["coding", "security", "helmet", "csp", "headers", "web-security"],
    sectionName: "HTTP Security Headers & Strict CSP Standards",
    ruSectionName: "Настройка заголовков безопасности Helmet и строгой политики CSP",
    instructions: [
      "Configure strict CSP directives (`default-src 'self'`, `script-src 'self' 'nonce-...'`).",
      "Enable HTTP Strict Transport Security (`HSTS: max-age=31536000; includeSubDomains; preload`).",
      "Disable MIME-type sniffing (`X-Content-Type-Options: nosniff`) and frame embedding (`X-Frame-Options: DENY`)."
    ],
    ruInstructions: [
      "Настройте строгую политику CSP (`default-src 'self'`) с защитой одноразовыми nonces.",
      "Включите HSTS с предзагрузкой (Preload) на срок не менее 1 года.",
      "Заблокируйте сниффинг MIME-типов и встраивание страниц во фреймы (Anti-Clickjacking)."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-pwa-service-worker-workbox-caching",
    name: "CodingPwaServiceWorkerWorkboxCachingSkill",
    displayName: "Workbox Service Worker Caching Strategies (PWA)",
    categoryId: "coding",
    description: "Implements CacheFirst, StaleWhileRevalidate, and NetworkFirst strategies for static assets, fonts, and API data.",
    tags: ["coding", "pwa", "service-worker", "workbox", "offline", "caching"],
    sectionName: "Workbox Service Worker Caching Blueprint",
    ruSectionName: "Стратегии кэширования Workbox Service Worker (CacheFirst, NetworkFirst, StaleWhileRevalidate)",
    instructions: [
      "Use `CacheFirst` with 1-year expiration plugin for immutable hashed static assets and web fonts.",
      "Use `StaleWhileRevalidate` for API metadata and frequent navigations.",
      "Use `NetworkFirst` with a 3-second timeout for real-time user state data."
    ],
    ruInstructions: [
      "Применяйте стратегию `CacheFirst` для неизменяемых бандлов и шрифтов.",
      "Используйте `StaleWhileRevalidate` для кэширования карточек каталога и справочников.",
      "Применяйте `NetworkFirst` с таймаутом 3 секунды для динамических данных пользователя."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-graphql-dataloader-per-request-cache",
    name: "CodingGraphqlDataloaderPerRequestCacheSkill",
    displayName: "Per-Request Scoped DataLoader Dependency Injection",
    categoryId: "coding",
    description: "Binds DataLoader instances to individual request contexts, preventing cross-tenant data leaks in GraphQL servers.",
    tags: ["coding", "graphql", "dataloader", "context", "security", "nodejs"],
    sectionName: "Scoped DataLoader Request Context Standards",
    ruSectionName: "Изоляция контекста DataLoader на каждый HTTP-запрос (GraphQL)",
    instructions: [
      "Instantiate all DataLoaders inside the request context factory function: `createContext({ req })`.",
      "Ensure loaders are never shared across concurrent client requests to prevent tenant data leakage.",
      "Clear loader cache on state-mutating GraphQL mutations."
    ],
    ruInstructions: [
      "Создавайте экземпляры DataLoader внутри фабрики контекста запроса `createContext()`.",
      "Исключите переиспользование экземпляров лоадеров между разными пользователями.",
      "Очищайте кэш лоадера при выполнении мутаций для сохранения свежести данных."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-react-hook-form-zod-resolver",
    name: "CodingReactHookFormZodResolverSkill",
    displayName: "React Hook Form & Zod Schema Resolver Integration",
    categoryId: "coding",
    description: "Builds high-performance form state with React Hook Form, uncontrolled inputs, and Zod resolver schema validation.",
    tags: ["coding", "react", "react-hook-form", "zod", "forms", "validation"],
    sectionName: "React Hook Form & Zod Resolver Standards",
    ruSectionName: "Интеграция форм React Hook Form и валидации схем Zod (Resolver)",
    instructions: [
      "Use `useForm<FormValues>({ resolver: zodResolver(schema), mode: 'onBlur' })`.",
      "Rely on uncontrolled inputs to minimize re-renders on every keystroke.",
      "Display field-level error messages with accessible ARIA invalid indicators (`aria-invalid={!!errors.field}`)."
    ],
    ruInstructions: [
      "Подключайте валидацию через `zodResolver(schema)` с проверкой на событии `onBlur`.",
      "Используйте неконтролируемые поля ввода для исключения лишних ререндеров при наборе текста.",
      "Отображайте ошибки валидации с атрибутами доступности `aria-invalid`."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-git-atomic-conventional-commits",
    name: "CodingGitAtomicConventionalCommitsSkill",
    displayName: "Conventional Commits 1.0.0 & Atomic Git History",
    categoryId: "coding",
    description: "Enforces structured Conventional Commit messages (`feat:`, `fix:`, `refactor:`, `chore:`) with breaking change markers (`!`).",
    tags: ["coding", "git", "conventional-commits", "version-control", "ci-cd"],
    sectionName: "Conventional Commits 1.0.0 Standard",
    ruSectionName: "Стандарт атомарных коммитов Conventional Commits (feat, fix, refactor)",
    instructions: [
      "Format commit messages: `<type>(<scope>): <short imperative summary>`.",
      "Use standard types: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `chore`, `ci`.",
      "Mark breaking changes with `!` suffix (e.g. `feat!: rename public api`) and `BREAKING CHANGE:` footer."
    ],
    ruInstructions: [
      "Форматируйте коммиты по схеме: `<тип>(<область>): <краткое описание в повелительном наклонении>`.",
      "Используйте стандартные типы: `feat`, `fix`, `refactor`, `perf`, `test`, `chore`.",
      "Обозначайте ломающие изменения восклицательным знаком `feat!:` и блоком `BREAKING CHANGE`."
    ],
    semanticType: "compliance_directive"
  },
  {
    id: "coding-python-dataclasses-pydantic-validation",
    name: "CodingPythonDataclassesPydanticValidationSkill",
    displayName: "Python Pydantic v2 Immutable Settings & Config Parser",
    categoryId: "coding",
    description: "Parses environment configurations into type-safe, immutable Pydantic `BaseSettings` with strict validation.",
    tags: ["coding", "python", "pydantic", "configuration", "settings", "type-safety"],
    sectionName: "Python Pydantic v2 Settings & Configuration Standards",
    ruSectionName: "Типизированные настройки приложения на базе Pydantic v2 BaseSettings",
    instructions: [
      "Inherit configuration models from `pydantic_settings.BaseSettings` with `frozen=True` immutability.",
      "Validate connection strings, ports, and secret keys at startup; crash immediately if required configs are missing.",
      "Provide clean default fallbacks for local development environments."
    ],
    ruInstructions: [
      "Создавайте модели конфигурации на базе `pydantic_settings.BaseSettings` с флагом `frozen=True`.",
      "Валидируйте порты, строки подключения к БД и секретные ключи на этапе старта приложения.",
      "Задавайте безопасные значения по умолчанию для локальной разработки."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-lucide-react-accessible-icon-buttons",
    name: "CodingLucideReactAccessibleIconButtonsSkill",
    displayName: "Lucide React Accessible Icon Button Standard",
    categoryId: "coding",
    description: "Integrates Lucide React icons into interactive buttons with proper ARIA accessibility labels and touch target sizes.",
    tags: ["coding", "lucide-react", "icons", "accessibility", "a11y", "react"],
    sectionName: "Accessible Icon Button Standards",
    ruSectionName: "Стандарт доступных кнопок с иконками Lucide React (A11y & Touch Targets)",
    instructions: [
      "Always attach explicit `aria-label` or `title` to standalone icon buttons without visible text.",
      "Enforce minimum 44x44px touch target hit-boxes for mobile responsiveness (`p-2.5` or `h-11 w-11`).",
      "Pass `aria-hidden=\"true\"` to decorative icon SVGs."
    ],
    ruInstructions: [
      "Всегда добавляйте `aria-label` или `title` для кнопок, содержащих только иконку.",
      "Обеспечьте минимальную область нажатия 44х44 пикселя для удобства на сенсорных экранах.",
      "Указывайте `aria-hidden=\"true\"` для декоративных SVG-иконок."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-error-boundary-react-suspense-fallback",
    name: "CodingErrorBoundaryReactSuspenseFallbackSkill",
    displayName: "React Error Boundary & Suspense Fallback Hierarchy",
    categoryId: "coding",
    description: "Wraps granular component subtrees in Error Boundaries and Suspense skeletons to prevent full page crashes.",
    tags: ["coding", "react", "error-boundary", "suspense", "skeletons", "resilience"],
    sectionName: "React Granular Error Boundary & Suspense Standards",
    ruSectionName: "Иерархия Error Boundary и скелетоны Suspense в React",
    instructions: [
      "Wrap isolated widget subtrees inside localized `ErrorBoundary` components with retry buttons.",
      "Pair data-fetching components with clean `Suspense` fallback skeletons matching exact target layout dimensions.",
      "Prevent an error in one secondary sidebar widget from unmounting the entire application."
    ],
    ruInstructions: [
      "Оборачивайте независимые виджеты в локальные `ErrorBoundary` с кнопкой повтора.",
      "Используйте `Suspense` со скелетонами загрузки, точно повторяющими форму контента.",
      "Изолируйте сбои: падение второстепенного блока не должно ломать всю страницу."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-database-connection-pool-pgpool",
    name: "CodingDatabaseConnectionPoolPgpoolSkill",
    displayName: "PostgreSQL Database Connection Pooling (pgbouncer / pg.Pool)",
    categoryId: "coding",
    description: "Tunes database connection pool sizes, idle timeouts, and statement timeouts to maximize concurrent throughput.",
    tags: ["coding", "postgresql", "connection-pool", "pgbouncer", "dba", "performance"],
    sectionName: "PostgreSQL Connection Pool & Timeout Standards",
    ruSectionName: "Тюнинг пула соединений PostgreSQL (pg.Pool, pgbouncer, таймауты)",
    instructions: [
      "Size connection pool according to Postgres formula: `Connections = ((CoreCount * 2) + EffectiveSpindleCount)`.",
      "Set aggressive `statement_timeout = '5s'` to automatically abort runaway rogue queries.",
      "Configure `idleTimeoutMillis: 30000` to close zombie connections cleanly."
    ],
    ruInstructions: [
      "Рассчитывайте размер пула соединений по формуле: `Connections = (2 * CPU_Cores) + Spindles`.",
      "Устанавливайте строгий `statement_timeout = '5s'` для автоотмены зависших запросов.",
      "Настройте таймауты закрытия простаивающих соединений (Idle Timeout)."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-vitest-snapshot-testing-contracts",
    name: "CodingVitestSnapshotTestingContractsSkill",
    displayName: "Vitest Inline Snapshot & AST Contract Testing",
    categoryId: "coding",
    description: "Uses Vitest inline snapshots (`toMatchInlineSnapshot()`) to lock down serialization formats and UI trees.",
    tags: ["coding", "vitest", "snapshots", "testing", "typescript", "regression"],
    sectionName: "Vitest Inline Snapshot Testing Standards",
    ruSectionName: "Инлайн-снапшоты в Vitest (Inline Snapshots & Contract Verification)",
    instructions: [
      "Use `expect(output).toMatchInlineSnapshot()` for deterministic API payload and prompt output contracts.",
      "Review snapshot diffs meticulously in code reviews before accepting updates.",
      "Prevent unexpected structural regressions in generated prompt transforms."
    ],
    ruInstructions: [
      "Используйте `toMatchInlineSnapshot()` для фиксации контрактов генерации промптов и API-ответов.",
      "Внимательно анализируйте дифф снапшотов при код-ревью перед их обновлением.",
      "Защищайте трансформации от непреднамеренных регрессионных изменений структуры."
    ],
    semanticType: "compliance_directive"
  },
  {
    id: "coding-graphql-cursor-pagination-relay",
    name: "CodingGraphqlCursorPaginationRelaySkill",
    displayName: "Relay Cursor-Based Connection Pagination (GraphQL)",
    categoryId: "coding",
    description: "Implements infinite scrolling cursor pagination with `first`, `after`, `pageInfo`, and opaque base64 cursors.",
    tags: ["coding", "graphql", "relay", "pagination", "cursors", "api"],
    sectionName: "Relay Cursor-Based Pagination Standards",
    ruSectionName: "Курсорная пагинация GraphQL по спецификации Relay (first/after, PageInfo)",
    instructions: [
      "Use opaque base64 cursor strings encoding sort keys (e.g. `base64(created_at + id)`).",
      "Return standard connection envelope: `{ edges: [{ cursor, node }], pageInfo: { hasNextPage, endCursor } }`.",
      "Avoid slow SQL `OFFSET` queries; use efficient indexed keyset seeking (`WHERE (created_at, id) < ($1, $2)`)."
    ],
    ruInstructions: [
      "Используйте непрозрачные base64-курсоры с закодированным ключом сортировки.",
      "Возвращайте стандартную структуру Relay с массивом `edges` и объектом `pageInfo`.",
      "Замените медленный SQL `OFFSET` на быстрый поиск по индексу (`Keyset Pagination`)."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-openapi-typescript-fetch-client",
    name: "CodingOpenapiTypescriptFetchClientSkill",
    displayName: "Type-Safe Fetch Client (openapi-typescript & openapi-fetch)",
    categoryId: "coding",
    description: "Generates ultra-lightweight zero-bundle type-safe HTTP clients directly from OpenAPI schemas via openapi-fetch.",
    tags: ["coding", "openapi", "openapi-fetch", "typescript", "type-safety", "fetch"],
    sectionName: "Type-Safe OpenAPI Fetch Client Standards",
    ruSectionName: "Типобезопасный HTTP-клиент на базе OpenAPI (openapi-fetch & TypeScript)",
    instructions: [
      "Compile OpenAPI YAML schemas into TypeScript schema types via `openapi-typescript`.",
      "Create client: `const client = createClient<paths>({ baseUrl: '/api' })`.",
      "Enjoy 100% compile-time autocomplete for all paths, query parameters, request bodies, and responses."
    ],
    ruInstructions: [
      "Генерируйте типы путей `paths` из схемы OpenAPI через утилиту `openapi-typescript`.",
      "Создавайте типизированный клиент с помощью `createClient<paths>()`.",
      "Получите 100% автодополнение путей, параметров и типов ответов без раздувания бандла."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-express-async-errors-handler",
    name: "CodingExpressAsyncErrorsHandlerSkill",
    displayName: "Express Async Error Handling & Structured JSON Exceptions",
    categoryId: "coding",
    description: "Implements centralized async error middleware in Express/Node.js, converting exceptions into RFC 7807 Problem Details.",
    tags: ["coding", "express", "error-handling", "rfc7807", "nodejs", "api"],
    sectionName: "Express Centralized Error Handling Standards",
    ruSectionName: "Централизованная обработка асинхронных ошибок в Express (RFC 7807 Problem Details)",
    instructions: [
      "Catch all unhandled promise rejections using `express-async-errors` or async route wrappers.",
      "Format error responses strictly to RFC 7807: `{ type, title, status, detail, instance }`.",
      "Never leak raw stack traces to client responses in production mode (`process.env.NODE_ENV === 'production'`)."
    ],
    ruInstructions: [
      "Перехватывайте все отклоненные промисы в централизованном middleware обработки ошибок.",
      "Форматируйте ответы об ошибках по стандарту RFC 7807 Problem Details.",
      "Никогда не отдавайте сырые стеки вызовов клиенту в продакшен-режиме."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-tailwindcss-dark-mode-color-contrast",
    name: "CodingTailwindcssDarkModeColorContrastSkill",
    displayName: "High-Contrast Dark Mode & Surface Elevation (Tailwind CSS)",
    categoryId: "coding",
    description: "Designs rich dark mode UI with semantic slate surface elevations (`bg-slate-950`, `bg-slate-900`, `bg-slate-800`).",
    tags: ["coding", "tailwind", "dark-mode", "colors", "ui-design", "accessibility"],
    sectionName: "High-Contrast Dark Mode & Surface Elevation Standards",
    ruSectionName: "Стандарт многослойных темных тем и контраста поверхностей (Tailwind CSS)",
    instructions: [
      "Use dark surface elevations: `bg-slate-950` (base canvas) -> `bg-slate-900` (cards) -> `bg-slate-800` (inputs/dropdowns).",
      "Pair with crisp borders (`border-slate-800` or `border-slate-700/80`) and subtle backdrops (`backdrop-blur-md`).",
      "Ensure high legibility for text: `text-slate-100` for headings, `text-slate-300` for body, `text-slate-400` for secondary captions."
    ],
    ruInstructions: [
      "Используйте слои темных поверхностей: холст `bg-slate-950`, карточки `bg-slate-900`, поля ввода `bg-slate-800`.",
      "Подчеркивайте границы тонкими полупрозрачными рамками `border-slate-800`.",
      "Соблюдайте четкую цветовую иерархию текста (белый для заголовков, светло-серый для текста)."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-react-custom-hooks-lifecycle-cleanup",
    name: "CodingReactCustomHooksLifecycleCleanupSkill",
    displayName: "Robust React Custom Hooks & Event Listener Cleanup",
    categoryId: "coding",
    description: "Designs robust React custom hooks (`useEffect`, `useCallback`, `useRef`) with deterministic listener teardowns.",
    tags: ["coding", "react", "hooks", "custom-hooks", "memory-leaks", "clean-code"],
    sectionName: "React Custom Hook Lifecycle & Cleanup Standards",
    ruSectionName: "Стандарты разработки кастомных хуков React (Очистка подписок и таймеров)",
    instructions: [
      "Always return explicit cleanup functions from `useEffect` to remove event listeners, abort fetches, and clear timers.",
      "Use `AbortController` to cancel ongoing network requests when components unmount.",
      "Stabilize callbacks with `useCallback` and keep dependency arrays exhaustive and accurate."
    ],
    ruInstructions: [
      "Всегда возвращайте функцию очистки из `useEffect` для удаления слушателей и отмены таймеров.",
      "Используйте `AbortController` для отмены сетевых запросов при размонтировании компонента.",
      "Стабилизируйте ссылки на функции через `useCallback` и поддерживайте актуальность списка зависимостей."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-zod-openapi-swagger-generator",
    name: "CodingZodOpenapiSwaggerGeneratorSkill",
    displayName: "Zod-to-OpenAPI Automated Swagger Doc Generator",
    categoryId: "coding",
    description: "Generates OpenAPI documentation directly from Zod schemas using `@asteasolutions/zod-to-openapi`.",
    tags: ["coding", "zod", "openapi", "swagger", "documentation", "typescript"],
    sectionName: "Zod-to-OpenAPI Automated Documentation Standards",
    ruSectionName: "Автоматическая генерация OpenAPI-документации из схем Zod (zod-to-openapi)",
    instructions: [
      "Extend Zod schemas with `.openapi({ description: \"...\", example: \"...\" })` annotations.",
      "Register paths and query schemas in a centralized `OpenAPIRegistry` instance.",
      "Generate valid OpenAPI 3.1 JSON automatically without duplicate schema maintenance."
    ],
    ruInstructions: [
      "Расширяйте схемы Zod метаданными через метод `.openapi({ description, example })`.",
      "Регистрируйте маршруты и параметры в едином реестре `OpenAPIRegistry`.",
      "Генерируйте спецификацию OpenAPI автоматически из единого источника истины."
    ],
    semanticType: "protocol"
  }
];

console.log('Appending Coding 35 (Total 115 target)...');
appendSkills('coding', CODING_SKILLS);
console.log('Coding skills complete.');
