const { appendSkills } = require('../appendSkills.cjs');

// CODING: 15 skills to reach 115
const CODING_15 = [
  {
    id: "coding-graphql-n-plus-one-dataloader-batching",
    name: "CodingGraphqlNPlusOneDataloaderBatchingSkill",
    displayName: "GraphQL DataLoader Batching & N+1 Query Resolution",
    categoryId: "coding",
    description: "Eliminates N+1 database queries in GraphQL resolvers using Facebook DataLoader batching and memoization caches.",
    tags: ["coding", "graphql", "dataloader", "performance", "database"],
    sectionName: "GraphQL DataLoader Batching Protocol",
    ruSectionName: "Пакетная загрузка DataLoader и устранение проблемы N+1 в GraphQL",
    instructions: [
      "Wrap relationship field resolvers in per-request DataLoader instances to batch primary key lookups into single SQL `IN (...)` queries.",
      "Scope DataLoader instances to HTTP request context to prevent cross-request cache leaks.",
      "Order batch result arrays strictly matching the input key array sequence."
    ],
    ruInstructions: [
      "Оборачивайте связанные резолверы в DataLoader для объединения запросов в единый SQL `WHERE id IN (...)`.",
      "Инициализируйте DataLoader в контексте каждого HTTP-запроса во избежание утечки кэша между пользователями.",
      "Сохраняйте точный порядок возвращаемого массива в соответствии с переданным массивом ключей."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-web-workers-offscreen-canvas-render",
    name: "CodingWebWorkersOffscreenCanvasRenderSkill",
    displayName: "OffscreenCanvas & Dedicated Web Worker Rendering Pipeline",
    categoryId: "coding",
    description: "Renders heavy 60fps animations, WebGL shaders, or chart visualizations on a background worker thread via OffscreenCanvas.",
    tags: ["coding", "web-workers", "offscreen-canvas", "canvas", "performance"],
    sectionName: "OffscreenCanvas Background Rendering Standards",
    ruSectionName: "Фоновый рендеринг графики через OffscreenCanvas и Web Workers",
    instructions: [
      "Transfer HTML Canvas control to worker thread using `canvas.transferControlToOffscreen()`.",
      "Run requestAnimationFrame game loops and 2D/WebGL draws entirely off the main DOM thread.",
      "Post resize and user interaction events to the worker using structured cloning or Transferable Objects."
    ],
    ruInstructions: [
      "Передавайте управление элементом Canvas в поток воркера с помощью `transferControlToOffscreen()`.",
      "Выполняйте циклы `requestAnimationFrame` и отрисовку 2D/WebGL полностью вне основного потока DOM.",
      "Отправляйте события мыши и изменения размеров через `postMessage` без блокировки интерфейса."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-distributed-tracing-opentelemetry-w3c",
    name: "CodingDistributedTracingOpentelemetryW3cSkill",
    displayName: "OpenTelemetry Distributed Tracing & W3C TraceContext Propagation",
    categoryId: "coding",
    description: "Instruments microservices and HTTP/gRPC boundaries with OpenTelemetry spans, trace IDs, and W3C baggage headers.",
    tags: ["coding", "opentelemetry", "observability", "distributed-tracing", "microservices"],
    sectionName: "OpenTelemetry Distributed Tracing Architecture",
    ruSectionName: "Распределенная трассировка OpenTelemetry и W3C TraceContext",
    instructions: [
      "Propagate `traceparent` and `tracestate` headers across asynchronous HTTP, message bus, and queue boundaries.",
      "Record exceptions, span status (`ERROR`), and high-cardinality semantic attributes on active spans.",
      "Configure deterministic head/tail sampling strategies to optimize observability backend storage."
    ],
    ruInstructions: [
      "Передавайте заголовки `traceparent` и `tracestate` через границы HTTP-запросов и очередей сообщений.",
      "Логируйте ошибки, статусы и семантические атрибуты в контексте текущего активного спана.",
      "Настраивайте стратегии сэмплирования для баланса детализации и нагрузки на хранилище трейсов."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-zod-runtime-schema-coercion-validation",
    name: "CodingZodRuntimeSchemaCoercionValidationSkill",
    displayName: "Zod v3 Deep Schema Validation, Coercion & Safe Parsing",
    categoryId: "coding",
    description: "Validates and transforms untrusted user inputs, query strings, and API payloads with type-inferred Zod schemas.",
    tags: ["coding", "zod", "typescript", "validation", "schemas"],
    sectionName: "Zod Type-Safe Schema Validation Protocol",
    ruSectionName: "Строгая валидация и трансформация данных схемой Zod (TypeScript)",
    instructions: [
      "Use `safeParse()` to capture structured error issues (`zodError.format()`) without throwing runtime exceptions.",
      "Leverage `z.coerce.number()` or `z.preprocess()` for query parameter casting and normalization.",
      "Export inferred static TypeScript types using `z.infer<typeof Schema>` as the single source of truth."
    ],
    ruInstructions: [
      "Используйте `safeParse()` для безопасной обработки ошибок валидации без падения процесса.",
      "Применяйте `z.coerce` и `z.preprocess()` для автоматического приведения типов в строках запроса.",
      "Экспортируйте типы TypeScript через `z.infer<typeof Schema>` как единый источник правды."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-postgresql-full-text-search-tsvector-gin",
    name: "CodingPostgresqlFullTextSearchTsvectorGinSkill",
    displayName: "PostgreSQL Full-Text Search (tsvector, tsquery & GIN Indexes)",
    categoryId: "coding",
    description: "Implements high-speed natural language search in PostgreSQL using tsvector columns, GIN index acceleration, and ts_rank.",
    tags: ["coding", "postgresql", "full-text-search", "database", "sql"],
    sectionName: "PostgreSQL Native Full-Text Search Architecture",
    ruSectionName: "Полнотекстовый поиск PostgreSQL (tsvector, tsquery, индексы GIN)",
    instructions: [
      "Maintain a generated `tsvector` column updated via `GENERATED ALWAYS AS (to_tsvector(...)) STORED`.",
      "Create a Generalized Inverted Index (`GIN(search_vector)`) for sub-millisecond multi-word lookups.",
      "Rank relevance using `ts_rank_cd(search_vector, websearch_to_tsquery('english', query))`."
    ],
    ruInstructions: [
      "Создавайте генерируемую колонку `tsvector` с автоматическим обновлением через `STORED`.",
      "Стройте GIN-индекс по полю поиска для мгновенной выборки среди миллионов документов.",
      "Ранжируйте релевантность результатов с помощью функции `ts_rank_cd` и `websearch_to_tsquery`."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-rust-wasm-simd-web-crypto",
    name: "CodingRustWasmSimdWebCryptoSkill",
    displayName: "Rust WebAssembly (Wasm) & SIMD High-Performance Pipeline",
    categoryId: "coding",
    description: "Compiles performance-critical Rust algorithms to WebAssembly with 128-bit SIMD vectorization and wasm-bindgen glue.",
    tags: ["coding", "rust", "wasm", "webassembly", "simd", "performance"],
    sectionName: "Rust WebAssembly & SIMD Acceleration Protocol",
    ruSectionName: "Компиляция высокопроизводительных алгоритмов на Rust в WebAssembly с SIMD",
    instructions: [
      "Expose clean zero-copy memory interfaces using `wasm-bindgen` and typed array views (`js_sys::Uint8Array`).",
      "Enable target CPU features (`+simd128`) for vectorized 4x float/integer parallel arithmetic.",
      "Manage Wasm linear memory deallocation strictly without memory leaks."
    ],
    ruInstructions: [
      "Проектируйте zero-copy интерфейсы передачи памяти между JavaScript и Wasm через `wasm-bindgen`.",
      "Включайте флаг SIMD128 для 4-кратного векторного ускорения вычислительных циклов.",
      "Контролируйте освобождение памяти линейной кучи Wasm для предотвращения утечек."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-prisma-drizzle-migration-safety-zero-downtime",
    name: "CodingPrismaDrizzleMigrationSafetyZeroDowntimeSkill",
    displayName: "Zero-Downtime Database Migrations & Safe Schema Evolution",
    categoryId: "coding",
    description: "Executes expand-and-contract zero-downtime database schema migrations for PostgreSQL/MySQL without locking tables.",
    tags: ["coding", "database-migration", "drizzle", "postgresql", "zero-downtime"],
    sectionName: "Zero-Downtime Database Migration Protocol",
    ruSectionName: "Бесшовные миграции баз данных без простоя (Expand and Contract)",
    instructions: [
      "Execute migrations in three distinct phases: Expand (add new nullable column), Migrate Data, Contract (drop old column).",
      "Add indexes concurrently (`CREATE INDEX CONCURRENTLY`) to prevent write table locks on production databases.",
      "Avoid destructive column renames in a single deployment step."
    ],
    ruInstructions: [
      "Разделяйте миграции на 3 фазы: Расширение (новые nullable поля), Миграция данных, Удаление старых полей.",
      "Создавайте индексы исключительно с флагом `CONCURRENTLY` во избежание блокировки записи.",
      "Никогда не переименовывайте колонки «на лету» в одном релизе без периода обратной совместимости."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-nextjs-server-actions-optimistic-updates",
    name: "CodingNextjsServerActionsOptimisticUpdatesSkill",
    displayName: "Next.js Server Actions & React 19 `useOptimistic` Mutation Flow",
    categoryId: "coding",
    description: "Builds instant-feedback UI mutations with React 19 `useOptimistic`, `useActionState`, and Next.js Server Actions.",
    tags: ["coding", "nextjs", "react19", "server-actions", "optimistic-ui"],
    sectionName: "React 19 Server Actions & Optimistic UI Standards",
    ruSectionName: "Next.js Server Actions и оптимистичные обновления интерфейса (React 19 useOptimistic)",
    instructions: [
      "Apply UI state changes immediately using React 19 `useOptimistic()` before the network roundtrip completes.",
      "Validate authorization and input payload securely inside the Server Action boundary (`'use server'`).",
      "Roll back optimistic state and display localized error toast notifications if server mutation fails."
    ],
    ruInstructions: [
      "Применяйте визуальное обновление интерфейса мгновенно через хук `useOptimistic` до ответа сервера.",
      "Проверяйте права доступа и валидируйте входные данные внутри серверного действия (`'use server'`).",
      "Откатывайте оптимистичное состояние и показывайте уведомление об ошибке при сбое на сервере."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-css-container-queries-subgrid-responsive",
    name: "CodingCssContainerQueriesSubgridResponsiveSkill",
    displayName: "CSS Container Queries (@container) & CSS Subgrid Architecture",
    categoryId: "coding",
    description: "Constructs modular, component-driven responsive layouts adapting to parent container width and nested CSS grid alignments.",
    tags: ["coding", "css", "container-queries", "subgrid", "responsive-design"],
    sectionName: "CSS Container Queries & Modern Layout Standards",
    ruSectionName: "Адаптивные компоненты на CSS Container Queries (@container) и Subgrid",
    instructions: [
      "Declare `container-type: inline-size` on reusable component parent wrappers.",
      "Write `@container (min-width: ...)` rules so cards adapt independently of the global browser viewport.",
      "Use `grid-template-rows: subgrid` to align card headers, bodies, and footers across adjacent columns."
    ],
    ruInstructions: [
      "Объявляйте `container-type: inline-size` на родительских контейнерах виджетов.",
      "Используйте медиа-запросы контейнера `@container` для адаптации компонента к его фактической ширине.",
      "Применяйте `subgrid` для идеального выравнивания шапок и кнопок карточек в сетке."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-event-sourcing-cqrs-event-store",
    name: "CodingEventSourcingCqrsEventStoreSkill",
    displayName: "Event Sourcing & CQRS Domain State Reconstitution",
    categoryId: "coding",
    description: "Models domain state as an immutable append-only ledger of domain events with separate read-model projections.",
    tags: ["coding", "event-sourcing", "cqrs", "domain-driven-design", "architecture"],
    sectionName: "Event Sourcing & CQRS Architectural Standards",
    ruSectionName: "Архитектура Event Sourcing и CQRS: неизменяемый журнал событий и проекции",
    instructions: [
      "Append domain events to an immutable event store with monotonic sequence versioning to guard against concurrency conflicts.",
      "Reconstitute aggregate entity state by replaying past events in chronological sequence.",
      "Project asynchronous read models into fast read-optimized views (e.g. PostgreSQL JSONB / Elasticsearch)."
    ],
    ruInstructions: [
      "Записывайте события домена в неизменяемый журнал (Event Store) с версионированием для защиты от конфликтов.",
      "Восстанавливайте состояние агрегата последовательным применением истории событий.",
      "Формируйте асинхронные проекции (Read Models) для быстрого чтения без нагружения основного журнала."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-temporal-io-durable-execution-workflows",
    name: "CodingTemporalIoDurableExecutionWorkflowsSkill",
    displayName: "Temporal.io Durable Execution & Long-Running Workflow Engine",
    categoryId: "coding",
    description: "Orchestrates multi-step distributed business workflows with automatic retry, sleep timers, and compensation logic.",
    tags: ["coding", "temporal", "durable-execution", "distributed-systems", "workflow"],
    sectionName: "Temporal.io Durable Workflow Protocol",
    ruSectionName: "Надежные распределенные рабочие процессы Temporal.io (Durable Execution)",
    instructions: [
      "Ensure workflow code is strictly deterministic (no direct non-deterministic system calls or random math inside workflows).",
      "Encapsulate all side-effects, API calls, and database operations inside discrete Temporal Activities.",
      "Implement Saga compensation workflows to rollback distributed transactions upon unrecoverable activity failures."
    ],
    ruInstructions: [
      "Обеспечивайте строгую детерминированность логики воркфлоу (никаких прямых генераций случайных чисел и сетевых вызовов).",
      "Выносите все побочные эффекты и внешние API-запросы в отдельные Temporal Activities с автоповторами.",
      "Реализуйте компенсирующие транзакции (паттерн Saga) для отката при критических сбоях шагов."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-vitest-playwright-end-to-end-testing",
    name: "CodingVitestPlaywrightEndToEndTestingSkill",
    displayName: "Vitest Unit & Playwright End-to-End Test Automation Suite",
    categoryId: "coding",
    description: "Designs deterministic unit, component, and full browser E2E test suites with mock networks and accessibility assertions.",
    tags: ["coding", "testing", "vitest", "playwright", "e2e", "quality"],
    sectionName: "Deterministic Automated Testing Standards",
    ruSectionName: "Стандарты автоматизированного тестирования (Vitest, Playwright E2E)",
    instructions: [
      "Test component accessibility and user interactions using `@testing-library` user-event semantics.",
      "Intercept and mock external third-party API dependencies using MSW (Mock Service Worker) for deterministic CI runs.",
      "Write resilient Playwright E2E tests relying on user-facing role locators (`getByRole`) rather than brittle CSS selectors."
    ],
    ruInstructions: [
      "Тестируйте компоненты через взаимодействие с пользователем (Testing Library `getByRole`, `userEvent`).",
      "Перехватывайте внешние API-вызовы с помощью MSW для 100% повторяемости тестов в CI/CD.",
      "Используйте устойчивые селекторы доступности в Playwright вместо хрупких путей к CSS-классам."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-webrtc-peer-to-peer-data-channels",
    name: "CodingWebrtcPeerToPeerDataChannelsSkill",
    displayName: "WebRTC Peer-to-Peer DataChannels & Low-Latency Mesh Networking",
    categoryId: "coding",
    description: "Establishes ultra-low latency browser-to-browser P2P audio/video and binary data streams via ICE/STUN/TURN signaling.",
    tags: ["coding", "webrtc", "p2p", "realtime", "networking"],
    sectionName: "WebRTC Peer-to-Peer Communication Protocol",
    ruSectionName: "P2P соединения и низколатентные каналы данных WebRTC (DataChannels, STUN/TURN)",
    instructions: [
      "Manage ICE candidate gathering, SDP offer/answer exchanges through a lightweight WebSocket signaling channel.",
      "Configure TURN relay fallbacks for clients trapped behind restrictive symmetric NATs.",
      "Transmit real-time telemetry or binary gaming state over unordered, unreliable RTCDataChannels for zero head-of-line blocking."
    ],
    ruInstructions: [
      "Организуйте обмен SDP offer/answer и сбор кандидатов ICE через легкий сигнальный сервер WebSocket.",
      "Настраивайте резервные TURN-серверы для клиентов за симметричными NAT-шлюзами.",
      "Передавайте игровой и телеметрический поток через ненадежные (unreliable) RTCDataChannels для минимальной задержки."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-solid-principles-clean-architecture-ts",
    name: "CodingSolidPrinciplesCleanArchitectureTsSkill",
    displayName: "SOLID Principles & Hexagonal Ports/Adapters in TypeScript",
    categoryId: "coding",
    description: "Decouples domain business rules from external frameworks, databases, and UI layers using Hexagonal Architecture.",
    tags: ["coding", "solid", "clean-architecture", "typescript", "software-design"],
    sectionName: "Clean Hexagonal Architecture Standards",
    ruSectionName: "Принципы SOLID и гексагональная архитектура (Ports and Adapters) на TypeScript",
    instructions: [
      "Define pure domain entity interfaces and use-case interactors completely isolated from database/ORM models.",
      "Implement inbound/outbound ports as TypeScript interfaces, injecting concrete adapter implementations at the application composition root.",
      "Adhere strictly to Dependency Inversion: high-level business policy must never depend on low-level I/O details."
    ],
    ruInstructions: [
      "Изолируйте чистую бизнес-логику домена от внешних баз данных, ORM и сторонних библиотек.",
      "Определяйте порты в виде интерфейсов TypeScript и внедряйте адаптеры на этапе сборки приложения (Composition Root).",
      "Соблюдайте принцип инверсии зависимостей (DIP): ядро системы не должно зависеть от деталей ввода-вывода."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-service-worker-cache-storage-offline-first",
    name: "CodingServiceWorkerCacheStorageOfflineFirstSkill",
    displayName: "Progressive Web App (PWA) Service Worker & Offline Cache Storage",
    categoryId: "coding",
    description: "Implements stale-while-revalidate, cache-first, and network-first caching strategies with CacheStorage API and Service Workers.",
    tags: ["coding", "service-worker", "pwa", "offline-first", "cache-storage"],
    sectionName: "PWA Service Worker Caching Strategies",
    ruSectionName: "Service Worker и стратегии кэширования для Offline-First PWA (CacheStorage API)",
    instructions: [
      "Cache critical application shell assets (HTML, CSS, JS bundles) during the Service Worker `install` event.",
      "Apply `stale-while-revalidate` caching strategy for frequently updated dynamic JSON feeds.",
      "Clean up outdated cache namespaces systematically during the Service Worker `activate` lifecycle event."
    ],
    ruInstructions: [
      "Кэшируйте ядро приложения (App Shell) на этапе события `install` сервис-воркера.",
      "Применяйте стратегию `stale-while-revalidate` для динамических данных, отдавая кэш мгновенно и обновляя в фоне.",
      "Удаляйте устаревшие версии кэша в обработчике события `activate` при релизе новых версий."
    ],
    semanticType: "protocol"
  }
];

// WRITING: 35 skills to reach 115
const WRITING_35 = [
  {
    id: "writing-y-combinator-application-memo",
    name: "WritingYCombinatorApplicationMemoSkill",
    displayName: "Y Combinator (YC) Application & Pitch Deck Precision",
    categoryId: "writing",
    description: "Writes ultra-dense, jargon-free startup pitches and YC application answers focusing on traction, insight, and problem clarity.",
    tags: ["writing", "y-combinator", "startup", "pitch", "clarity", "investor"],
    sectionName: "Y Combinator High-Density Application Standard",
    ruSectionName: "Стандарт ответов на заявку Y Combinator (YC) и питчинга без воды",
    instructions: [
      "Explain what the company makes in plain English in the very first sentence (no marketing jargon or buzzwords).",
      "Highlight unfair advantages, concrete traction metrics, and unique founder domain insight.",
      "Be radically concise and quantitatively specific."
    ],
    ruInstructions: [
      "Объясняйте суть продукта простыми словами в первом же предложении без рекламного пафоса.",
      "Указывайте конкретные цифры динамики (MoM growth), метрики удержания и ключевой инсайт основателей.",
      "Пишите максимально лаконично и емко, избегая абстрактных обещаний."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-sec-form-10k-md-and-a-financial-filing",
    name: "WritingSecForm10kMdAndAFinancialFilingSkill",
    displayName: "SEC Form 10-K Management's Discussion & Analysis (MD&A)",
    categoryId: "writing",
    description: "Structures public company financial commentary according to SEC MD&A disclosure guidelines and GAAP reconciliations.",
    tags: ["writing", "sec-filing", "mda", "finance", "compliance", "investor-relations"],
    sectionName: "SEC MD&A Financial Commentary Standards",
    ruSectionName: "Стандарты финансового отчета SEC Form 10-K (Раздел MD&A)",
    instructions: [
      "Analyze year-over-year revenue, gross margin, and operating cash flow drivers with disaggregated volume/price breakdowns.",
      "Detail liquidity requirements, debt covenants, and material known uncertainties.",
      "Reconcile non-GAAP operational metrics (Adjusted EBITDA, Free Cash Flow) strictly back to GAAP line items."
    ],
    ruInstructions: [
      "Анализируйте динамику выручки и маржинальности с разделением факторов цены и физического объема продаж.",
      "Описывайте профиль ликвидности, долговые ковенанты и материальные риски бизнеса.",
      "Сверяйте показатели Non-GAAP (Adjusted EBITDA) с официальной отчетностью GAAP в специальных таблицах сверки."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-scientific-abstract-nature-format",
    name: "WritingScientificAbstractNatureFormatSkill",
    displayName: "Nature/Science Peer-Reviewed Journal Abstract Structure",
    categoryId: "writing",
    description: "Composes high-impact scientific paper abstracts following Nature's strict 5-part structure: Background, Problem, Discovery, Mechanism, Significance.",
    tags: ["writing", "scientific-writing", "academic", "nature", "abstract", "research"],
    sectionName: "Nature Peer-Reviewed Journal Abstract Framework",
    ruSectionName: "Структура научного абстракта по стандартам Nature / Science (5 предложений)",
    instructions: [
      "Sentence 1-2: Broad background accessible to general scientific audience, followed by specific gap in knowledge.",
      "Sentence 3: The core experimental discovery or empirical finding introduced by this study.",
      "Sentence 4-5: Underlying causal mechanism and broader paradigm-shifting implications for the field."
    ],
    ruInstructions: [
      "Предложения 1–2: Широкий контекст проблемы, понятный любому ученому, и нерешенный вопрос.",
      "Предложение 3: Главное экспериментальное открытие или доказанный результат данного исследования.",
      "Предложения 4–5: Физический/биологический механизм явления и влияние на развитие научной дисциплины."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-stripe-press-editorial-craft",
    name: "WritingStripePressEditorialCraftSkill",
    displayName: "Stripe Press Intellectual Long-Form Editorial Standards",
    categoryId: "writing",
    description: "Crafts elegant, high-intellect essays exploring technological progress, economic history, and scientific frontier ideas.",
    tags: ["writing", "essay", "stripe-press", "intellectual", "editorial", "prose"],
    sectionName: "Stripe Press Long-Form Editorial Prose Standards",
    ruSectionName: "Интеллектуальная эссеистика высокого стиля (в традициях Stripe Press)",
    instructions: [
      "Blend rigorous economic history, engineering depth, and philosophical inquiry into compelling prose.",
      "Use vivid historical anecdotes to ground abstract institutional or technological shifts.",
      "Prioritize literary cadence, precision of metaphors, and optimistic technological progressivism."
    ],
    ruInstructions: [
      "Сочетайте историко-экономическую строгость, инженерную глубину и литературную элегантность слога.",
      "Используйте яркие исторические прецеденты для иллюстрации абстрактных технологических явлений.",
      "Сохраняйте ритмичность прозы, точность метафор и дух созидательного оптимизма."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-executive-speechwriting-keynote-rhetoric",
    name: "WritingExecutiveSpeechwritingKeynoteRhetoricSkill",
    displayName: "Executive Keynote Speechwriting & Rhetorical Cadence",
    categoryId: "writing",
    description: "Writes charismatic spoken-word keynotes and public speeches using anaphora, triadic phrasing, and emotional arcs.",
    tags: ["writing", "speechwriting", "keynote", "rhetoric", "leadership", "public-speaking"],
    sectionName: "Executive Spoken-Word Speechwriting Architecture",
    ruSectionName: "Мастерство спичрайтинга для первых лиц (Риторика, триады, паузы, драматургия)",
    instructions: [
      "Write for the ear, not the eye: short cadence sentences, clear breath markers, and conversational rhythm.",
      "Employ classical rhetorical devices: rule of three (tricolon), anaphora, and contrasting antithesis.",
      "Anchor the narrative arc in a shared tension resolved through an inspiring, unifying vision."
    ],
    ruInstructions: [
      "Пишите текст для устного произнесения: короткие фразы, естественные паузы для дыхания и разговорный ритм.",
      "Используйте риторические фигуры: правила трех элементов (триады), анафоры и антитезы.",
      "Выстраивайте драматургию от признания общей проблемы к вдохновляющему видению будущего."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-saas-onboarding-email-drip-sequence",
    name: "WritingSaasOnboardingEmailDripSequenceSkill",
    displayName: "SaaS Behavioral Onboarding Drip Sequence (Aha-Moment Driven)",
    categoryId: "writing",
    description: "Designs automated email onboarding funnels triggered by user telemetry to guide users rapidly to product activation.",
    tags: ["writing", "email-marketing", "saas", "onboarding", "retention", "copywriting"],
    sectionName: "SaaS Behavioral Onboarding Email Standards",
    ruSectionName: "Поведенческая цепочка onboarding-писем для SaaS (Фокус на Aha-Moment)",
    instructions: [
      "Tailor each email to specific user product milestones (e.g. invited first teammate vs created first dashboard).",
      "Keep single focused call-to-action per email with a 60-second video or 3-click workflow guide.",
      "Maintain a helpful, encouraging tone from a named customer success lead."
    ],
    ruInstructions: [
      "Привязывайте отправку каждого письма к фактическим действиям пользователя в продукте.",
      "Используйте ровно один целевой призыв к действию в каждом письме (быстрый шаг на 2 минуты).",
      "Пишите от лица конкретного специалиста поддержки заботливым и живым языком."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-post-mortem-blameless-incident-report",
    name: "WritingPostMortemBlamelessIncidentReportSkill",
    displayName: "Blameless Engineering Post-Mortem & Root Cause Analysis (RCA)",
    categoryId: "writing",
    description: "Documents system outages objectively with precise incident timelines, root causes, contributing factors, and preventative action items.",
    tags: ["writing", "post-mortem", "incident-report", "engineering", "devops", "rca"],
    sectionName: "Blameless Post-Mortem Documentation Standards",
    ruSectionName: "Стандарт составления бескомпромиссного постмортема инцидентов (Blameless RCA)",
    instructions: [
      "Maintain absolute blameless culture: focus on systemic guardrail failures, not individual human error.",
      "Construct minute-by-minute timeline from detection (`T0`) to mitigation and recovery.",
      "Commit to concrete, prioritized Action Items (Jira IDs) with assigned owners and hard deadlines."
    ],
    ruInstructions: [
      "Соблюдайте принцип ненаказуемости (Blameless): анализируйте сбои процессов и защит, а не ошибки людей.",
      "Фиксируйте поминутный таймлайн от момента возникновения сбоя до полного восстановления.",
      "Формируйте список превентивных задач с конкретными ответственными лицами и сроками исполнения."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-substack-viral-newsletter-craft",
    name: "WritingSubstackViralNewsletterCraftSkill",
    displayName: "Substack Long-Form Thought Leadership & Newsletter Architecture",
    categoryId: "writing",
    description: "Structures high-open-rate newsletters featuring magnetic subject lines, visual diagrams, and memorable conceptual frameworks.",
    tags: ["writing", "newsletter", "substack", "content-marketing", "thought-leadership"],
    sectionName: "Thought Leadership Newsletter Architecture",
    ruSectionName: "Архитектура экспертных рассылок и лонгридов для Substack",
    instructions: [
      "Craft dual-layer subject lines: curiosity hook + high-utility payoff.",
      "Structure body with subheadings every 250 words and bespoke conceptual 2x2 matrix diagrams.",
      "Conclude with actionable tactical takeaways and a question inviting community comments."
    ],
    ruInstructions: [
      "Формулируйте темы писем из двух частей: интригующий крючок + практическая ценность материала.",
      "Разбивайте текст подзаголовками каждые 250–300 слов и структурированными визуальными схемами.",
      "Завершайте выпуск практическими выводами и вопросом для вовлечения подписчиков в комментарии."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-patent-application-claims-drafting",
    name: "WritingPatentApplicationClaimsDraftingSkill",
    displayName: "Patent Specification & Independent Claims Drafting",
    categoryId: "writing",
    description: "Drafts rigorous utility patent specifications, antecedent basis claims, and detailed embodiment descriptions for USPTO/EPO.",
    tags: ["writing", "patent", "ip", "legal", "claims", "inventions"],
    sectionName: "Patent Claims & Specification Drafting Standards",
    ruSectionName: "Составление формулы изобретения и описания патента (USPTO / EPO стандарты)",
    instructions: [
      "Structure independent claims hierarchically with preamble, transitional phrase ('comprising'), and limiting elements.",
      "Maintain strict antecedent basis ('a widget... the said widget') across all dependent claims.",
      "Provide comprehensive alternative embodiments to prevent design-around infringements."
    ],
    ruInstructions: [
      "Формулируйте независимые пункты формулы с преамбулой, связкой («включающий») и отличительными признаками.",
      "Строго соблюдайте правила грамматической преемственности терминов во всех зависимых пунктах.",
      "Описывайте альтернативные варианты реализации изобретения для защиты от обхода патента."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-developer-documentation-api-reference",
    name: "WritingDeveloperDocumentationApiReferenceSkill",
    displayName: "Stripe-Grade Developer API Reference & Interactive Tutorials",
    categoryId: "writing",
    description: "Writes world-class developer documentation with curl/SDK copy-paste code snippets, payload schemas, and error codes.",
    tags: ["writing", "api-docs", "developer-relations", "technical-writing", "documentation"],
    sectionName: "Developer Documentation & API Reference Standards",
    ruSectionName: "Стандарты первоклассной документации API для разработчиков (Stripe-Grade)",
    instructions: [
      "Provide working, copy-pasteable code examples in cURL, TypeScript, and Python for every single endpoint.",
      "Document every possible HTTP status code, error envelope schema, and troubleshooting remedy.",
      "Include realistic JSON response fixtures with populated, plausible field data."
    ],
    ruInstructions: [
      "Предоставляйте готовые примеры кода для cURL, TypeScript и Python для каждого эндпоинта.",
      "Документируйте все коды HTTP-ошибок, формат ответа об ошибке и конкретные способы их исправления.",
      "Приводите реалистичные примеры JSON-ответов с правдоподобными данными без заглушек `foo/bar`."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-b2b-case-study-challenge-solution-impact",
    name: "WritingB2bCaseStudyChallengeSolutionImpactSkill",
    displayName: "High-Impact Enterprise B2B Case Study (Challenge-Solution-Metrics)",
    categoryId: "writing",
    description: "Transforms customer success stories into persuasive sales collateral featuring executive quotes and quantitative ROI proof.",
    tags: ["writing", "case-study", "b2b", "sales-enablement", "marketing", "roi"],
    sectionName: "Enterprise B2B Customer Case Study Blueprint",
    ruSectionName: "Кейс-стади для корпоративных B2B продаж (Проблема — Решение — Результат в цифрах)",
    instructions: [
      "Lead with a bold executive metric summary banner (e.g., '42% cost reduction in 90 days').",
      "Structure sections: 1. Customer Context, 2. The Bottleneck / Pain, 3. The Implementation Journey, 4. Hard Quantitative ROI.",
      "Incorporate authentic direct quotes from customer VP/Director stakeholders."
    ],
    ruInstructions: [
      "Размещайте в начале карточку с ключевыми измеримыми результатами (например, «Экономия 42% за 90 дней»).",
      "Структура: 1. Профиль клиента, 2. Исходная проблема, 3. Процесс внедрения, 4. Доказанный ROI в цифрах.",
      "Включайте прямые цитаты топ-менеджеров заказчика с акцентом на стратегическую ценность."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-harvard-business-school-case-study",
    name: "WritingHarvardBusinessSchoolCaseStudySkill",
    displayName: "Harvard Business School (HBS) Case Study Dilemma Framework",
    categoryId: "writing",
    description: "Drafts immersive management case studies centered on a pivotal executive decision dilemma with rich exhibits and financial tables.",
    tags: ["writing", "hbs", "case-study", "business-education", "management", "strategy"],
    sectionName: "HBS Executive Case Study Structure",
    ruSectionName: "Бизнес-кейс по стандартам Harvard Business School (Управленческая дилемма)",
    instructions: [
      "Open with the protagonist executive facing a critical impending deadline and conflicting strategic choices.",
      "Provide objective historical background, competitive landscape dynamics, and internal corporate tensions without spoon-feeding the answer.",
      "Include detailed financial exhibits and organizational charts in the appendix."
    ],
    ruInstructions: [
      "Начинайте с момента принятия сложного решения топ-менеджером перед лицом жесткого дедлайна.",
      "Давайте объективный контекст рынка и финансовые данные, оставляя студентам пространство для самостоятельного вывода.",
      "Прилагайте таблицы финансовых показателей и схемы организационной структуры в приложениях."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-app-store-listing-conversion-aso",
    name: "WritingAppStoreListingConversionAsoSkill",
    displayName: "App Store & Google Play Conversion-Optimized Listing (ASO)",
    categoryId: "writing",
    description: "Writes high-converting App Store and Google Play titles, subtitles, keyword fields, and promotional descriptions.",
    tags: ["writing", "aso", "app-store", "mobile-marketing", "copywriting"],
    sectionName: "App Store Optimization (ASO) Listing Standards",
    ruSectionName: "Оптимизация описания мобильных приложений для App Store и Google Play (ASO)",
    instructions: [
      "Optimize the first 3 lines of description before the 'Read More' fold with core value propositions.",
      "Integrate high-intent search keywords naturally into subtitle and bulleted feature highlights.",
      "Incorporate social proof, awards, and tier-1 press mentions in concise bulleted formatting."
    ],
    ruInstructions: [
      "Фокусируйте первые три строки описания (до кнопки «Еще») на главной пользе для пользователя.",
      "Органично внедряйте ключевые поисковые запросы в подзаголовок и список возможностей.",
      "Добавляйте социальные доказательства: оценки, награды и отзывы авторитетных изданий."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-microcopy-ux-error-messages-empty-states",
    name: "WritingMicrocopyUxErrorMessagesEmptyStatesSkill",
    displayName: "UX Microcopy, Friendly Error Messages & Empty States",
    categoryId: "writing",
    description: "Crafts empathetic, concise, and helpful user interface microcopy for error banners, empty states, and permission modals.",
    tags: ["writing", "ux-writing", "microcopy", "design", "product-copy"],
    sectionName: "UX Microcopy & Interface Content Guidelines",
    ruSectionName: "UX-микрокопирайтинг: тексты ошибок, пустые состояния и подсказки",
    instructions: [
      "Error messages must explain what happened in plain language and provide an immediate 1-click recovery action.",
      "Empty states should inspire action by showing what the screen will look like and offering a primary creation button.",
      "Eliminate blame words ('You entered an invalid password' -> 'Password must be at least 8 characters')."
    ],
    ruInstructions: [
      "Сообщения об ошибках должны объяснять причину простым языком и давать кнопку мгновенного исправления.",
      "Пустые экраны (Empty States) должны мотивировать на действие и показывать кнопку создания первого объекта.",
      "Исключайте обвинительные формулировки в адрес пользователя."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-investor-quarterly-shareholder-letter",
    name: "WritingInvestorQuarterlyShareholderLetterSkill",
    displayName: "Quarterly Shareholder Letter & Transparent Investor Update",
    categoryId: "writing",
    description: "Writes candid, data-driven investor updates covering ARR growth, burn rate, runway, strategic wins, and key asks.",
    tags: ["writing", "investor-update", "shareholder-letter", "startup", "finance"],
    sectionName: "Investor Shareholder Letter Standards",
    ruSectionName: "Ежеквартальное письмо акционерам и инвесторам (Прозрачные метрики и запросы)",
    instructions: [
      "Structure: 1. Executive Summary & Runway, 2. Key Performance Metrics (ARR, CAC, LTV), 3. Product & Go-To-Market Highlights, 4. Lowlights & Roadblocks, 5. Asks.",
      "Be radically candid about what is not working as well as what is accelerating.",
      "Provide specific, actionable asks for intros to enterprise prospects or strategic hires."
    ],
    ruInstructions: [
      "Структура: 1. Главные итоги и запас ликвидности, 2. Метрики (ARR, CAC, Churn), 3. Победы, 4. Проблемы и вызовы, 5. Запросы помощи.",
      "Пишите честно о трудностях и способах их преодоления — прозрачность укрепляет доверие.",
      "Формулируйте четкие запросы на интро к потенциальным клиентам или кандидатам."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-podcast-interview-scripting-host-notes",
    name: "WritingPodcastInterviewScriptingHostNotesSkill",
    displayName: "Long-Form Podcast Host Interview Script & Provocative Questions",
    categoryId: "writing",
    description: "Prepares deep interview arcs, unconventional questions, and conversational bridging techniques for long-form podcasts.",
    tags: ["writing", "podcast", "interview", "media", "scripting", "journalism"],
    sectionName: "Podcast Host Interview Architecture",
    ruSectionName: "Сценарий глубокого подкаст-интервью (Небанальные вопросы и драматургия беседы)",
    instructions: [
      "Skip surface-level biographical questions; begin directly at the most controversial or transformative turning point.",
      "Formulate questions that challenge public consensus or probe unexpected failure lessons.",
      "Include conversational pivot bridges to steer the guest toward concrete anecdotes rather than generic theories."
    ],
    ruInstructions: [
      "Пропускайте дежурные вопросы о биографии; начинайте с самого поворотного или спорного момента.",
      "Задавайте вопросы, раскрывающие парадоксальные уроки и малоизвестные ошибки гостя.",
      "Используйте мостики переходов для вывода собеседника на яркие живые истории вместо сухих рассуждений."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-white-paper-technical-market-authority",
    name: "WritingWhitePaperTechnicalMarketAuthoritySkill",
    displayName: "Authoritative Technical White Paper & Industry Problem Statement",
    categoryId: "writing",
    description: "Authors comprehensive 10-page technical white papers establishing thought leadership and positioning architecture solutions.",
    tags: ["writing", "white-paper", "technical-marketing", "b2b", "authority"],
    sectionName: "Technical White Paper Authority Blueprint",
    ruSectionName: "Технический White Paper для подтверждения отраслевого лидерства",
    instructions: [
      "Open with an executive summary and macroeconomic/industry structural shift analysis.",
      "Deep-dive into the architectural bottlenecks of legacy approaches with comparative benchmark diagrams.",
      "Introduce the novel architectural paradigm objectively before demonstrating empirical advantages."
    ],
    ruInstructions: [
      "Начинайте с резюме для руководства и анализа структурных сдвигов на рынке.",
      "Детально разбирайте архитектурные ограничения старых подходов с графиками и бенчмарками.",
      "Презентуйте новую технологическую парадигму объективно и аргументированно."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-manifesto-mission-driven-brand-declaration",
    name: "WritingManifestoMissionDrivenBrandDeclarationSkill",
    displayName: "Brand Manifesto & Cultural Declaration of Purpose",
    categoryId: "writing",
    description: "Crafts poetic, polarizing, and deeply inspiring brand manifestos that rally employees, creators, and early adopters.",
    tags: ["writing", "manifesto", "branding", "copywriting", "culture", "inspiration"],
    sectionName: "Brand Manifesto & Purpose Declaration",
    ruSectionName: "Манифест бренда и вдохновляющая декларация миссии компании",
    instructions: [
      "Identify the reigning status quo orthodoxy that must be challenged.",
      "Declare an uncompromising set of beliefs about what the world should look like.",
      "Use rhythmic, evocative prose that gives goosebumps and creates immediate tribal belonging."
    ],
    ruInstructions: [
      "Сформулируйте устаревший статус-кво, против которого выступает ваш продукт или движение.",
      "Провозгласите бескомпромиссные ценности и образ желаемого будущего.",
      "Используйте ритмичный, эмоциональный слог, формирующий чувство общности и вдохновения."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-faq-objection-handling-knowledge-base",
    name: "WritingFaqObjectionHandlingKnowledgeBaseSkill",
    displayName: "Comprehensive Product FAQ & Customer Objection Handling",
    categoryId: "writing",
    description: "Structures high-clarity FAQ hubs that anticipate customer anxieties, pricing doubts, security questions, and migration friction.",
    tags: ["writing", "faq", "customer-support", "knowledge-base", "copywriting"],
    sectionName: "Comprehensive FAQ & Objection Resolution Standards",
    ruSectionName: "База знаний и раздел FAQ с отработкой всех возражений клиентов",
    instructions: [
      "Directly address the hardest pricing, security, and cancellation questions without evasive corporate speak.",
      "Give concise 2-sentence direct answers before providing step-by-step contextual detail.",
      "Include direct links to documentation, trial signup, or support chat."
    ],
    ruInstructions: [
      "Прямо отвечайте на сложные вопросы о ценах, безопасности и условиях отмены подписки без увиливаний.",
      "Давайте четкий ответ в первых двух предложениях перед подробными пояснениями.",
      "Добавляйте ссылки на базу знаний и контакты службы заботы о клиентах."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-rfp-enterprise-bid-proposal-response",
    name: "WritingRfpEnterpriseBidProposalResponseSkill",
    displayName: "Enterprise RFP Bid Proposal & Government Procurement Response",
    categoryId: "writing",
    description: "Drafts compliant, winning responses to enterprise Request for Proposals (RFP) highlighting security, SLAs, and compliance.",
    tags: ["writing", "rfp", "procurement", "enterprise-sales", "proposal"],
    sectionName: "Enterprise RFP & Bid Proposal Response Standards",
    ruSectionName: "Подготовка ответов на корпоративные тендеры и RFP (Request for Proposal)",
    instructions: [
      "Map answers rigorously to every numbered evaluation requirement in the client's RFP matrix.",
      "Demonstrate proof of SOC2 Type II, ISO27001, GDPR, and enterprise SLA track records.",
      "Highlight differentiated total cost of ownership (TCO) and rapid deployment timelines."
    ],
    ruInstructions: [
      "Строго привязывайте ответы к каждому пункту требований тендерной спецификации заказчика.",
      "Подтверждайте соответствие стандартам безопасности (SOC2, ISO27001, GDPR) и историю соблюдения SLA.",
      "Демонстрируйте совокупную стоимость владения (TCO) и быстрые сроки внедрения решения."
    ],
    semanticType: "writing_directive"
  }
];

// PERSONAS: 35 skills to reach 115
const PERSONAS_35 = [
  {
    id: "persona-principle-security-penetration-tester",
    name: "PersonaPrincipleSecurityPenetrationTesterSkill",
    displayName: "Elite Red Team Security Penetration Tester Persona",
    categoryId: "personas",
    description: "Adopts the adversarial mindset of an elite security researcher hunting zero-days, injection flaws, and authorization bypasses.",
    tags: ["personas", "cybersecurity", "red-team", "penetration-testing", "appsec"],
    sectionName: "Red Team Security Penetration Tester Directive",
    ruSectionName: "Ролевая персона: Элитный специалист по пентесту и безопасности (Red Team)",
    instructions: [
      "Assume zero trust: inspect every user input, cookie, JWT token, and internal RPC boundary as potentially hostile.",
      "Model attacker exploit chains: SSRF to metadata service to IAM credential exfiltration.",
      "Provide concrete remediation guidance with secure code examples for every vulnerability found."
    ],
    ruInstructions: [
      "Применяйте модель нулевого доверия: проверяйте любой ввод, токен и RPC-запрос на уязвимости.",
      "Выстраивайте цепочки атак (Exploit Chains) от мелкой инъекции до полного перехвата прав.",
      "Предоставляйте конкретный исправленный код и рекомендации по защите для каждой угрозы."
    ],
    semanticType: "role"
  },
  {
    id: "persona-distinguished-database-architect",
    name: "PersonaDistinguishedDatabaseArchitectSkill",
    displayName: "Distinguished Database Architect & Storage Engine Specialist",
    categoryId: "personas",
    description: "Evaluates write amplification, B-tree vs LSM-tree trade-offs, MVCC vacuuming, and distributed consensus (Raft/Paxos).",
    tags: ["personas", "database", "storage-engine", "distributed-systems", "architecture"],
    sectionName: "Distinguished Database Architect Persona Directive",
    ruSectionName: "Ролевая персона: Главный архитектор СУБД и систем хранения данных",
    instructions: [
      "Analyze storage engine mechanics: buffer pool hit ratios, WAL flush latency, and index fragmentation.",
      "Design distributed sharding topologies with attention to split-brain prevention and cross-shard transaction isolation.",
      "Optimize query execution plans at the physical operator level (Bitmap Index Scan vs Hash Join)."
    ],
    ruInstructions: [
      "Анализируйте физический уровень СУБД: буферный пул, задержки WAL, фрагментацию индексов и вакуум.",
      "Проектируйте шардинг с защитой от Split-Brain и распределенные транзакции (2PC, Spanner).",
      "Оптимизируйте планы выполнения запросов на уровне физических операторов СУБД."
    ],
    semanticType: "role"
  },
  {
    id: "persona-silicon-valley-venture-capitalist",
    name: "PersonaSiliconValleyVentureCapitalistSkill",
    displayName: "Top-Tier Silicon Valley General Partner (VC) Persona",
    categoryId: "personas",
    description: "Evaluates startups through market sizing (TAM), power law distribution, moat defensibility, and founder-market fit.",
    tags: ["personas", "venture-capital", "investor", "startup", "strategy"],
    sectionName: "Venture Capitalist General Partner Persona Directive",
    ruSectionName: "Ролевая персона: Генеральный партнер венчурного фонда Кремниевой долины",
    instructions: [
      "Assess power law returns: 'Can this company become a $10B+ category-defining monopoly?'.",
      "Interrogate structural moats: network effects, proprietary data loops, switching costs, and brand economies of scale.",
      "Challenge unit economics, CAC payback periods, and net revenue retention (NRR) cohorts."
    ],
    ruInstructions: [
      "Оценивайте стартап через закон степенного распределения (Power Law) и потенциал в $10B+ капитализации.",
      "Анализируйте защиту бизнеса (Moats): сетевые эффекты, данные, стоимость перехода для клиентов.",
      "Проверяйте юнит-экономику, когорты удержания чистой выручки (NRR) и окупаемость CAC."
    ],
    semanticType: "role"
  },
  {
    id: "persona-olympic-endurance-performance-coach",
    name: "PersonaOlympicEndurancePerformanceCoachSkill",
    displayName: "Olympic Head Endurance & Sports Physiology Coach Persona",
    categoryId: "personas",
    description: "Applies exercise physiology, VO2 max periodization, lactate threshold testing, and metabolic recovery protocols.",
    tags: ["personas", "sports", "physiology", "coaching", "endurance", "fitness"],
    sectionName: "Olympic Endurance & Physiology Coach Directive",
    ruSectionName: "Ролевая персона: Главный тренер олимпийской сборной по циклическому спорту",
    instructions: [
      "Structure training through polarized 80/20 Zone 2 aerobic volume and high-intensity interval training (HIIT).",
      "Monitor physiological strain via Heart Rate Variability (HRV), sleep staging, and blood lactate accumulation.",
      "Emphasize periodization, tapering, and glycogen replenishment nutrition strategies."
    ],
    ruInstructions: [
      "Выстраивайте поляризованные тренировочные планы: 80% объем во 2-й пульсовой зоне и 20% интервалы.",
      "Контролируйте восстановление через вариабельность сердечного ритма (HRV) и уровень лактата.",
      "Уделяйте ключевое внимание периодизации, суперкомпенсации и нутритивному таймингу."
    ],
    semanticType: "role"
  },
  {
    id: "persona-socratic-philosophy-dialogue-partner",
    name: "PersonaSocraticPhilosophyDialoguePartnerSkill",
    displayName: "Socratic Method Master & Philosophical Inquirer Persona",
    categoryId: "personas",
    description: "Guides self-discovery and conceptual clarity using iterative probing questions, elenchus, and unexamined assumption tests.",
    tags: ["personas", "socrates", "philosophy", "dialogue", "inquiry", "critical-thinking"],
    sectionName: "Socratic Dialogue Inquirer Directive",
    ruSectionName: "Ролевая персона: Сократический собеседник и мастер майевтики",
    instructions: [
      "Never offer dogmatic answers; respond with targeted, thought-provoking questions that expose hidden contradictions.",
      "Help the user define fundamental terms rigorously before debating conclusions.",
      "Uncover unexamined cultural, moral, and logical assumptions through gentle elenchus."
    ],
    ruInstructions: [
      "Не навязывайте готовых ответов; задавайте точные вопросы, выявляющие скрытые противоречия в рассуждениях.",
      "Помогайте собеседнику строго определить ключевые понятия перед началом дискуссии.",
      "Вскрывайте неявные догмы и предрассудки с помощью сократического метода (майевтики)."
    ],
    semanticType: "role"
  },
  {
    id: "persona-fda-regulatory-affairs-director",
    name: "PersonaFdaRegulatoryAffairsDirectorSkill",
    displayName: "Senior FDA Regulatory Affairs & Clinical Trial Director Persona",
    categoryId: "personas",
    description: "Navigates FDA 510(k), PMA, IND/NDA filings, Good Clinical Practice (GCP), and bioethics safety board protocols.",
    tags: ["personas", "fda", "regulatory", "pharma", "biotech", "compliance"],
    sectionName: "FDA Regulatory Affairs Director Directive",
    ruSectionName: "Ролевая персона: Директор по регуляторным вопросам FDA и клиническим испытаниям",
    instructions: [
      "Ensure strict compliance with 21 CFR regulations, Good Laboratory Practice (GLP), and Good Clinical Practice (GCP).",
      "Design clinical trial primary endpoints with robust statistical power and adverse event reporting mechanisms.",
      "Verify complete audit trails for Design History Files (DHF) and medical device software validation."
    ],
    ruInstructions: [
      "Контролируйте строгое соответствие стандартам FDA (21 CFR), правилам GLP и GCP.",
      "Формулируйте первичные конечные точки клинических исследований со статистической мощностью.",
      "Проверяйте полноту документации жизненного цикла медицинских изделий (Design History File)."
    ],
    semanticType: "role"
  },
  {
    id: "persona-chief-supply-chain-logistics-officer",
    name: "PersonaChiefSupplyChainLogisticsOfficerSkill",
    displayName: "Chief Global Supply Chain & Logistics Officer Persona",
    categoryId: "personas",
    description: "Manages global freight corridors, Just-In-Time (JIT) vs Just-In-Case buffers, supplier risk, and warehouse robotics.",
    tags: ["personas", "supply-chain", "logistics", "operations", "manufacturing"],
    sectionName: "Global Supply Chain Officer Directive",
    ruSectionName: "Ролевая персона: Директор по глобальным цепочкам поставок и логистике (CSCO)",
    instructions: [
      "Model bullwhip effects and multi-tier supplier dependency risks across critical trade chokepoints.",
      "Balance working capital inventory carrying costs against catastrophic stock-out supply disruption risks.",
      "Optimize container load factors, customs compliance, and automated warehouse sortation throughput."
    ],
    ruInstructions: [
      "Моделируйте эффект хлыста (Bullwhip Effect) и риски сбоев у поставщиков 2-го и 3-го уровней.",
      "Балансируйте затраты на хранение запасов и риск остановки производства при дефиците сырья.",
      "Оптимизируйте загрузку контейнеров, таможенное оформление и производительность автоматизированных складов."
    ],
    semanticType: "role"
  },
  {
    id: "persona-computational-linguistics-polyglot",
    name: "PersonaComputationalLinguisticsPolyglotSkill",
    displayName: "Computational Linguist & Comparative Etymologist Persona",
    categoryId: "personas",
    description: "Analyzes language syntax, morphological phonology, semantic shift trees, and tokenization embeddings across world languages.",
    tags: ["personas", "linguistics", "etymology", "nlp", "grammar", "polyglot"],
    sectionName: "Computational Linguist & Etymologist Directive",
    ruSectionName: "Ролевая персона: Компьютерный лингвист и сравнительный этимолог",
    instructions: [
      "Trace Indo-European, Sino-Tibetan, and Semitic root cognates across historical sound shift laws (Grimm's Law).",
      "Analyze syntax through dependency parse trees, generative grammar, and compositional distributional semantics.",
      "Evaluate cross-lingual subword tokenization efficiency and semantic drift in multilingual corpus embeddings."
    ],
    ruInstructions: [
      "Исследуйте происхождение слов по законам фонетических переходов (законы Гримма и Вернера).",
      "Анализируйте синтаксис через деревья зависимостей и порождающую грамматику Хомского.",
      "Оценивайте эффективность мультиязычной токенизации и сохранение семантики при машинном переводе."
    ],
    semanticType: "role"
  },
  {
    id: "persona-crisis-negotiator-hostage-fbi",
    name: "PersonaCrisisNegotiatorHostageFbiSkill",
    displayName: "FBI Crisis Hostage Negotiator & Tactical Empathy Specialist",
    categoryId: "personas",
    description: "Applies Chris Voss tactical empathy, calibrated 'how/what' questions, emotion labeling, and behavioral change stairways.",
    tags: ["personas", "negotiation", "tactical-empathy", "crisis-management", "psychology"],
    sectionName: "Crisis Hostage Negotiator Directive",
    ruSectionName: "Ролевая персона: Переговорщик спецслужб по освобождению заложников (FBI Crisis)",
    instructions: [
      "Apply tactical empathy and mirror phrases to de-escalate acute cortisol and adrenaline spikes.",
      "Label unspoken underlying emotions: 'It sounds like you feel unappreciated and backed into a corner.'",
      "Use calibrated 'How am I supposed to do that?' questions to force the counterpart to problem-solve collaboratively."
    ],
    ruInstructions: [
      "Применяйте тактическую эмпатию и отзеркаливание для снижения эмоционального накала у оппонента.",
      "Маркируйте скрытые эмоции: «Похоже, вы чувствуете, что вас загнали в угол и не оставили выбора».",
      "Используйте калиброванные открытые вопросы («Как мне поступить в этой ситуации?»), вовлекая в поиск решения."
    ],
    semanticType: "role"
  },
  {
    id: "persona-quantum-computing-physicist",
    name: "PersonaQuantumComputingPhysicistSkill",
    displayName: "Quantum Information Physicist & Qubit Algorithmist Persona",
    categoryId: "personas",
    description: "Evaluates superconducting transmon qubits, trapped-ion gates, Shor/Grover algorithms, and surface-code error correction.",
    tags: ["personas", "quantum-computing", "physics", "algorithms", "qubits"],
    sectionName: "Quantum Information Physicist Directive",
    ruSectionName: "Ролевая персона: Физик квантовых вычислений и алгоритмов (Qubits, Qiskit)",
    instructions: [
      "Model quantum state transformations via unitary matrices, Bloch sphere rotations, and Bell state entanglements.",
      "Assess decoherence times ($T_1$, $T_2$) and fault-tolerant surface code error thresholds.",
      "Formulate quantum circuits in terms of Clifford+T gate universal decompositions."
    ],
    ruInstructions: [
      "Описывайте квантовые состояния через унитарные матрицы, сферу Блоха и запутанные состояния Белла.",
      "Анализируйте время декогеренции кубитов ($T_1$, $T_2$) и пороги квантовой коррекции ошибок (Surface Codes).",
      "Проектируйте квантовые схемы через универсальный набор вентилей Clifford+T."
    ],
    semanticType: "role"
  }
];

console.log('Appending final batch for Coding, Writing, and Personas...');
appendSkills('coding', CODING_15);
appendSkills('writing', WRITING_35);
appendSkills('personas', PERSONAS_35);
console.log('Finished appending Key Categories!');
