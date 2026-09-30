const { appendSkills } = require('../appendSkills.cjs');

const CODING_NEW = [
  {
    id: "coding-rust-memory-ownership-lifetimes",
    name: "CodingRustMemoryOwnershipLifetimesSkill",
    displayName: "Rust Memory Safety, Lifetimes, and Zero-Cost Abstractions",
    categoryId: "coding",
    description: "Enforces idiomatic Rust ownership, explicit lifetimes (`'a`), Send/Sync traits, and zero-cost abstractions.",
    tags: ["coding", "rust", "memory-safety", "concurrency", "systems-programming"],
    sectionName: "Rust Memory Ownership & Lifetime Invariants",
    ruSectionName: "Стандарт владения памятью и времен жизни Rust (Ownership & Lifetimes)",
    instructions: [
      "Structure types using strict ownership and borrowing semantics; eliminate unnecessary `.clone()` calls.",
      "Annotate explicit lifetime parameters (`'a`, `'static`) where reference elision is ambiguous.",
      "Implement `Error` and `From` traits for robust, idiomatic `Result<T, E>` error propagation."
    ],
    ruInstructions: [
      "Используйте строгую модель владения и заимствования (Borrowing); исключите лишние вызовы `.clone()`.",
      "Задавайте явные параметры времен жизни (`'a`) в сложных структурах данных с ссылками.",
      "Реализуйте трейты `Error` и `From` для идиоматической обработки ошибок через `Result<T, E>`."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-typescript-type-level-generics-ast",
    name: "CodingTypescriptTypeLevelGenericsAstSkill",
    displayName: "Advanced TypeScript Type-Level Metaprogramming",
    categoryId: "coding",
    description: "Constructs conditional types, template literal types, distributive unions, and mapped AST type transformations.",
    tags: ["coding", "typescript", "type-level", "generics", "advanced-ts"],
    sectionName: "Advanced TypeScript Type-Level Invariants",
    ruSectionName: "Продвинутое программирование на уровне типов TypeScript (Conditional & Mapped Types)",
    instructions: [
      "Use conditional types (`T extends U ? X : Y`), `infer` keyword, and template literal types for compile-time validation.",
      "Enforce immutable `as const` assertions and readonly utility wrappers.",
      "Eliminate `any` and unvalidated type assertions (`as Type`) in favor of type guards and `unknown`."
    ],
    ruInstructions: [
      "Используйте условные типы с ключевым словом `infer` и шаблонные строковые литералы типов.",
      "Применяйте утверждения `as const` и модификаторы `readonly` для обеспечения неизменяемости.",
      "Полностью исключите использование `any` в пользу безопасного `unknown` и пользовательских Type Guards."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-python-asyncio-structured-concurrency",
    name: "CodingPythonAsyncioStructuredConcurrencySkill",
    displayName: "Python 3.12+ AsyncIO & Structured Concurrency (TaskGroup)",
    categoryId: "coding",
    description: "Implements modern Python structured concurrency using `asyncio.TaskGroup()`, ExceptionGroups, and clean cancellations.",
    tags: ["coding", "python", "asyncio", "structured-concurrency", "taskgroup"],
    sectionName: "Python AsyncIO Structured Concurrency Standards",
    ruSectionName: "Структурированная асинхронность Python 3.12+ (AsyncIO TaskGroup)",
    instructions: [
      "Use `async with asyncio.TaskGroup() as tg:` to coordinate concurrent background tasks safely.",
      "Handle composite failures gracefully via `except* (CustomError, TimeoutError):` ExceptionGroups.",
      "Ensure proper cleanup of open network connections and file descriptors inside asynchronous context managers."
    ],
    ruInstructions: [
      "Используйте `asyncio.TaskGroup()` для надежного управления жизненным циклом фоновых корутин.",
      "Обрабатывайте параллельные исключения через конструкции `except*` (ExceptionGroups).",
      "Гарантируйте закрытие сетевых сессий в асинхронных контекстных менеджерах (`async with`)."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-golang-goroutine-leak-prevention",
    name: "CodingGolangGoroutineLeakPreventionSkill",
    displayName: "Go Concurrency, Channel Idioms, and Goroutine Leak Defense",
    categoryId: "coding",
    description: "Prevents goroutine leaks using `context.Context` cancellation propagation, buffered channels, and sync.WaitGroup.",
    tags: ["coding", "golang", "concurrency", "goroutines", "channels", "context"],
    sectionName: "Go Concurrency & Goroutine Leak Defense Standards",
    ruSectionName: "Идиомы конкурентности Go и предотвращение утечек горутин (Goroutine Leaks)",
    instructions: [
      "Always propagate `ctx context.Context` as the first parameter across all I/O function calls.",
      "Ensure every spawned goroutine listens to `<-ctx.Done()` for deterministic cancellation exit.",
      "Use `sync.WaitGroup` or `errgroup.Group` to wait for all child routines before function termination."
    ],
    ruInstructions: [
      "Передавайте `ctx context.Context` первым параметром во все функции ввода-вывода.",
      "Обязывайте каждую запускаемую горутину слушать канал `<-ctx.Done()` для безопасного завершения.",
      "Используйте `errgroup.Group` для контроля завершения пула параллельных задач."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-react-compiler-memoization-zero-cost",
    name: "CodingReactCompilerMemoizationZeroCostSkill",
    displayName: "React 19 Server Components & Actions Architecture",
    categoryId: "coding",
    description: "Builds React 19 apps with Server Components, optimistic UI mutations (`useOptimistic`), and Server Actions.",
    tags: ["coding", "react", "react19", "rsc", "server-actions", "frontend"],
    sectionName: "React 19 Server Components & Action Standards",
    ruSectionName: "Архитектура React 19 (Server Components, Server Actions, useOptimistic)",
    instructions: [
      "Default to React Server Components (RSC) for data-fetching; mark interactive leaves with `'use client'`.",
      "Execute state mutations via Server Actions integrated with progressive enhancement `<form action={...}>`.",
      "Implement `useOptimistic()` and `useTransition()` for instantaneous zero-latency UI responsiveness."
    ],
    ruInstructions: [
      "Используйте React Server Components по умолчанию для загрузки данных; выносите интерактивность в `'use client'`.",
      "Реализуйте мутации через Server Actions с поддержкой прогрессивного улучшения форм.",
      "Внедряйте `useOptimistic()` для мгновенного обновления интерфейса до ответа сервера."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-database-index-btree-gin-optimization",
    name: "CodingDatabaseIndexBtreeGinOptimizationSkill",
    displayName: "PostgreSQL Advanced Index Tuning (B-Tree, GIN, GiST, BRIN)",
    categoryId: "coding",
    description: "Selects the mathematically optimal index type for query patterns: B-Tree, GIN (JSONB), GiST, or BRIN (Time-series).",
    tags: ["coding", "postgresql", "indexes", "gin", "brin", "performance", "dba"],
    sectionName: "PostgreSQL Index Tuning & EXPLAIN ANALYZE Standards",
    ruSectionName: "Оптимизация индексов PostgreSQL (B-Tree, GIN, BRIN, Partial Indexes)",
    instructions: [
      "Use GIN indexes with `jsonb_path_ops` for high-frequency JSONB attribute filtering.",
      "Deploy BRIN indexes for append-only timestamp series tables to save 95% of index disk storage.",
      "Create Partial Indexes (`WHERE is_deleted = false`) to dramatically shrink index size."
    ],
    ruInstructions: [
      "Используйте индексы GIN (`jsonb_path_ops`) для быстрого поиска по вложенным структурам JSONB.",
      "Применяйте индексы BRIN для огромных неизменяемых таблиц с логами и временными рядами.",
      "Создавайте частичные индексы (Partial Indexes) для исключения неактуальных строк."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-distributed-tracing-opentelemetry-sdk",
    name: "CodingDistributedTracingOpentelemetrySdkSkill",
    displayName: "OpenTelemetry TypeScript SDK Manual Instrumentation",
    categoryId: "coding",
    description: "Instruments custom tracer spans, error status codes, baggage propagation, and span metrics.",
    tags: ["coding", "opentelemetry", "tracing", "observability", "sdk"],
    sectionName: "OpenTelemetry SDK Manual Instrumentation Standards",
    ruSectionName: "Ручная инструментация трейсов через OpenTelemetry SDK (TypeScript)",
    instructions: [
      "Obtain tracer instance and create explicit child spans: `tracer.startActiveSpan('operation_name', ...)`.",
      "Record exceptions inside spans with `span.recordException(err)` and set `span.setStatus({ code: SpanStatusCode.ERROR })`.",
      "Ensure spans are deterministically ended in `finally` blocks to prevent trace resource leaks."
    ],
    ruInstructions: [
      "Создавайте вложенные спаны через `tracer.startActiveSpan('operation_name', ...)`.",
      "Фиксируйте ошибки в теле спана через `span.recordException()` с установкой статуса ошибки.",
      "Гарантируйте вызов `span.end()` в блоке `finally` для исключения утечек памяти."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-tailwind-css-fluid-typography-design",
    name: "CodingTailwindCssFluidTypographyDesignSkill",
    displayName: "Fluid Typography & Responsive Clamp Layouts (Tailwind CSS)",
    categoryId: "coding",
    description: "Applies fluid clamp typography and dynamic responsive layouts without jagged breakpoint jumps.",
    tags: ["coding", "tailwind", "css", "typography", "responsive-design", "ui"],
    sectionName: "Fluid Responsive Typography & Layout Standards",
    ruSectionName: "Плавная адаптивная типографика и сетки (Tailwind CSS Clamp)",
    instructions: [
      "Use CSS `clamp(min, preferred_vw, max)` for fluid font sizing scaling smoothly across viewports.",
      "Implement container queries (`@container`) for modular components that adapt to parent container width.",
      "Ensure strict WCAG AAA color contrast ratios (minimum 7:1 for normal text)."
    ],
    ruInstructions: [
      "Используйте функцию `clamp()` для плавной масштабируемости шрифтов без скачков на брейкпоинтах.",
      "Применяйте контейнерные запросы (`@container`) для создания независимых адаптивных компонентов.",
      "Обеспечьте контрастность текста по стандарту WCAG AAA (не менее 7:1)."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-cryptographic-jwt-ed25519-auth",
    name: "CodingCryptographicJwtEd25519AuthSkill",
    displayName: "Ed25519 / RS256 Asymmetric JWT Authentication Engine",
    categoryId: "coding",
    description: "Signs and verifies JSON Web Tokens using asymmetric Ed25519 / RS256 public-private key cryptography.",
    tags: ["coding", "jwt", "ed25519", "auth", "security", "cryptography"],
    sectionName: "Asymmetric JWT (Ed25519/RS256) Authentication Standards",
    ruSectionName: "Асимметричная аутентификация по токенам JWT (Ed25519 / RS256)",
    instructions: [
      "Sign tokens using private Ed25519 / RSA keys; distribute only the public key to microservice verifiers.",
      "Enforce short expiration limits (`exp: 15m`) paired with secure httpOnly refresh tokens.",
      "Validate issuer (`iss`), audience (`aud`), and token signature algorithm strictly (ban `none` algorithm)."
    ],
    ruInstructions: [
      "Подписывайте JWT приватным ключом Ed25519; проверяйте подпись на микросервисах публичным ключом.",
      "Устанавливайте короткое время жизни access-токена (15 минут) в связке с защищенными refresh-токенами.",
      "Строго проверяйте издателя (`iss`), получателя (`aud`) и запрещайте алгоритм `none`."
    ],
    semanticType: "protocol"
  },
  {
    id: "coding-graphql-dataloader-n-plus-one-fix",
    name: "CodingGraphqlDataloaderNPlusOneFixSkill",
    displayName: "GraphQL DataLoader Batching & N+1 Query Elimination",
    categoryId: "coding",
    description: "Batches and deduplicates database queries across GraphQL resolver fields to eliminate N+1 latency spikes.",
    tags: ["coding", "graphql", "dataloader", "n-plus-one", "performance", "batching"],
    sectionName: "DataLoader Batching & N+1 Elimination Invariants",
    ruSectionName: "Устранение проблемы N+1 в GraphQL с помощью DataLoader (Батчинг и Кэширование)",
    instructions: [
      "Instantiate scoped DataLoader instances per HTTP request to batch entity lookups into a single `WHERE id IN (...)` query.",
      "Deduplicate identical keys requested by multiple fields in the same GraphQL query document.",
      "Prevent cross-request cache leaks by discarding DataLoader instances at the end of each request."
    ],
    ruInstructions: [
      "Создавайте экземпляры DataLoader на каждый HTTP-запрос для объединения выборок в один запрос `WHERE id IN (...)`.",
      "Дедуплицируйте одинаковые запросы сущностей внутри одного GraphQL-документа.",
      "Изолируйте кэш лоадера внутри одного запроса, предотвращая утечку данных между пользователями."
    ],
    semanticType: "protocol"
  }
];

const WRITING_NEW = [
  {
    id: "writing-pyramid-principle-barbara-minto",
    name: "WritingPyramidPrincipleBarbaraMintoSkill",
    displayName: "Barbara Minto Pyramid Principle & Executive Framing",
    categoryId: "writing",
    description: "Structures business and technical writing with core conclusions at the top, supported by deductive logic clusters.",
    tags: ["writing", "minto-pyramid", "executive-communication", "clarity", "structure"],
    sectionName: "Barbara Minto Pyramid Principle Structure",
    ruSectionName: "Принцип пирамиды Минто: Структурирование деловых текстов от вывода к деталям",
    instructions: [
      "Place the single overarching governing thought (Core Conclusion) at the apex of the document.",
      "Group supporting arguments into mutually exclusive, collectively exhaustive (MECE) horizontal tiers.",
      "Ensure every grouping answers the logical question raised by the summary point above it."
    ],
    ruInstructions: [
      "Сформулируйте главную управляющую мысль в самом начале документа.",
      "Сгруппируйте аргументы в логические блоки по принципу MECE.",
      "Обеспечьте строгую дедуктивную связь: каждый нижний уровень подтверждает тезис верхнего."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-scqa-business-storytelling-framework",
    name: "WritingScqaBusinessStorytellingFrameworkSkill",
    displayName: "McKinsey SCQA (Situation, Complication, Question, Answer)",
    categoryId: "writing",
    description: "Hooks stakeholders by establishing familiar Context, surfacing a critical Complication, raising the core Question, and Answering.",
    tags: ["writing", "scqa", "mckinsey", "storytelling", "persuasion", "proposals"],
    sectionName: "McKinsey SCQA Narrative Framework",
    ruSectionName: "Фреймворк убеждающего повествования SCQA (Ситуация, Осложнение, Вопрос, Ответ)",
    instructions: [
      "Situation: State undisputed baseline background context that everyone agrees with.",
      "Complication: Introduce the catalyst shift, emerging threat, or breakdown that disrupts the status quo.",
      "Question: Frame the pivotal question that arises directly from the complication.",
      "Answer: Deliver the decisive solution and action plan."
    ],
    ruInstructions: [
      "Ситуация (Situation): Опишите общепризнанный контекст, не вызывающий споров.",
      "Осложнение (Complication): Покажите возникшую проблему или угрозу, ломающую статус-кво.",
      "Вопрос (Question): Сформулируйте главный вызов, требующий решения.",
      "Ответ (Answer): Предложите убедительное решение и план действий."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-plain-language-flesch-kincaid-grade-8",
    name: "WritingPlainLanguageFleschKincaidGrade8Skill",
    displayName: "Plain Language & Flesch-Kincaid Grade 8 Readability",
    categoryId: "writing",
    description: "Simplifies complex technical prose to achieve a Flesch-Kincaid Grade 8 reading level without diluting accuracy.",
    tags: ["writing", "plain-language", "readability", "flesch-kincaid", "clarity"],
    sectionName: "Plain Language & High-Readability Standards",
    ruSectionName: "Стандарт ясного языка (Plain Language) и индекс удобочитаемости Флеша",
    instructions: [
      "Keep average sentence length under 18 words; use active voice for >90% of verbs.",
      "Replace multi-syllable bureaucratic jargon with clear, everyday equivalents.",
      "Use descriptive subheadings, bullet lists, and visual white space to enhance scannability."
    ],
    ruInstructions: [
      "Ограничьте среднюю длину предложений до 15–18 слов; используйте активный залог.",
      "Замените сложный канцелярит и бюрократические штампы на живой понятный язык.",
      "Разбивайте текст на короткие абзацы со списками и акцентными подзаголовками."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-technical-whitepaper-ieee-standard",
    name: "WritingTechnicalWhitepaperIeeeStandardSkill",
    displayName: "IEEE Technical Whitepaper & Architectural Report Standard",
    categoryId: "writing",
    description: "Structures formal engineering whitepapers with Abstract, Problem Statement, Solution, Benchmarks, and References.",
    tags: ["writing", "whitepaper", "ieee", "technical-report", "engineering-docs"],
    sectionName: "IEEE Technical Whitepaper Standards",
    ruSectionName: "Стандарт инженерного технического отчета и Whitepaper (IEEE)",
    instructions: [
      "Structure document: Abstract -> Introduction -> System Architecture -> Empirical Evaluation -> Conclusion.",
      "Include quantitative benchmark graphs and tables with statistical error bars.",
      "Format academic references in standard IEEE bracketed citation format (`[1]`, `[2]`)."
    ],
    ruInstructions: [
      "Оформляйте документ по структуре: Аннотация -> Введение -> Архитектура -> Эксперименты -> Выводы.",
      "Сопровождайте выводы таблицами измерений и графиками сравнительных тестов.",
      "Оформляйте список литературы и ссылок по академическому стандарту IEEE."
    ],
    semanticType: "writing_directive"
  },
  {
    id: "writing-investor-pitch-deck-narrative-sequoia",
    name: "WritingInvestorPitchDeckNarrativeSequoiaSkill",
    displayName: "Sequoia Capital 10-Slide Investor Narrative Framework",
    categoryId: "writing",
    description: "Structures venture capital pitch decks: Problem, Solution, Why Now, Market Size, Product, Traction, Team.",
    tags: ["writing", "pitch-deck", "sequoia", "venture-capital", "fundraising", "startups"],
    sectionName: "Sequoia Capital 10-Slide Narrative Blueprint",
    ruSectionName: "Фреймворк венчурной презентации Sequoia Capital (10 слайдов)",
    instructions: [
      "Slide 1-3: Company Purpose -> Problem (pain point) -> Solution (value proposition).",
      "Slide 4-6: Why Now (market inflection) -> Market Potential (TAM/SAM/SOM) -> Competition (defensibility).",
      "Slide 7-10: Product Architecture -> Business Model -> Team -> Financial Vision & Ask."
    ],
    ruInstructions: [
      "Слайды 1–3: Миссия -> Острая боль клиента -> Наше решение и ценность.",
      "Слайды 4–6: Почему именно сейчас -> Объем рынка (TAM/SAM) -> Конкурентные барьеры.",
      "Слайды 7–10: Архитектура продукта -> Юнит-экономика -> Команда -> Запрашиваемый раунд."
    ],
    semanticType: "writing_directive"
  }
];

const PERSONAS_NEW = [
  {
    id: "persona-principal-staff-infrastructure-architect",
    name: "PersonaPrincipalStaffInfrastructureArchitectSkill",
    displayName: "Principal Staff Cloud Infrastructure Architect Persona",
    categoryId: "personas",
    description: "Adopts the mental model of a top-tier Principal Infrastructure Engineer with 15+ years scaling distributed systems.",
    tags: ["personas", "principal-engineer", "infrastructure", "distributed-systems", "cloud-architect"],
    sectionName: "Principal Staff Infrastructure Architect Persona Directive",
    ruSectionName: "Ролевая персона: Главный архитектор распределенной инфраструктуры (Principal Staff)",
    instructions: [
      "Approach all problems with high-rigor systems thinking: latency percentiles (p99), blast radius, CAP tradeoffs.",
      "Demand quantitative proof, load benchmarks, and explicit disaster recovery runbooks.",
      "Reject trendy buzzwords in favor of battle-tested, observable, maintainable primitives."
    ],
    ruInstructions: [
      "Анализируйте задачи с позиции опытного системного архитектора: перцентили задержки, радиус аварий, CAP-теорема.",
      "Требуйте количественных подтверждений, тестов производительности и регламентов восстановления.",
      "Отвергайте мимолетный хайп в пользу надежных, масштабируемых и наблюдаемых решений."
    ],
    semanticType: "role"
  },
  {
    id: "persona-ruthless-red-team-penetration-tester",
    name: "PersonaRuthlessRedTeamPenetrationTesterSkill",
    displayName: "Elite Red-Team Penetration Tester & Threat Hunter Persona",
    categoryId: "personas",
    description: "Thinks like an adversarial advanced persistent threat (APT) to proactively identify hidden architectural exploits.",
    tags: ["personas", "red-team", "penetration-testing", "threat-hunting", "cybersecurity"],
    sectionName: "Red-Team Threat Hunter Persona Directive",
    ruSectionName: "Ролевая персона: Ведущий специалист Red-Team и охотник за уязвимостями",
    instructions: [
      "Analyze systems from an attacker's offensive perspective: locate unchecked trust boundaries and privilege escalation paths.",
      "Simulate sophisticated chained attacks combining subtle configuration flaws.",
      "Provide precise defensive remediation prescriptions for every identified attack vector."
    ],
    ruInstructions: [
      "Исследуйте архитектуру глазами квалифицированного атакующего: ищите скрытые доверительные бреши.",
      "Моделируйте сложные цепочки атак на стыке разных компонентов системы.",
      "Сразу предоставляйте точные рекомендации по нейтрализации найденных векторов."
    ],
    semanticType: "role"
  },
  {
    id: "persona-faang-vp-of-product-management",
    name: "PersonaFaangVpOfProductManagementSkill",
    displayName: "VP of Product Management (Silicon Valley Tier) Persona",
    categoryId: "personas",
    description: "Evaluates initiatives through ruthless prioritization, user retention loops, moat defensibility, and ROI.",
    tags: ["personas", "product-management", "vp-product", "strategy", "metrics"],
    sectionName: "VP of Product Management Persona Directive",
    ruSectionName: "Ролевая персона: Вице-президент по продукту (VP of Product Management)",
    instructions: [
      "Evaluate features against 3 core filters: 1. Does it move the North Star metric? 2. Is it defensible? 3. Is the ROI > 5x?",
      "Cut feature scope ruthlessly to deliver minimal viable prototypes that validate core customer hypotheses.",
      "Demand rigorous A/B experimentation and retention cohort telemetry for all roadmap proposals."
    ],
    ruInstructions: [
      "Оценивайте идеи по 3 фильтрам: влияние на North Star метрику, защита от копирования, окупаемость ROI.",
      "Безжалостно отсекайте лишний функционал ради быстрой проверки гипотез на реальных пользователях.",
      "Требуйте доказательств через когортный анализ удержания и A/B эксперименты."
    ],
    semanticType: "role"
  },
  {
    id: "persona-chief-information-security-officer-ciso",
    name: "PersonaChiefInformationSecurityOfficerCisoSkill",
    displayName: "Chief Information Security Officer (CISO) Persona",
    categoryId: "personas",
    description: "Balances regulatory compliance, enterprise risk governance, zero-trust security, and business velocity.",
    tags: ["personas", "ciso", "security-governance", "compliance", "executive"],
    sectionName: "Chief Information Security Officer (CISO) Persona Directive",
    ruSectionName: "Ролевая персона: Директор по информационной безопасности (CISO)",
    instructions: [
      "Align technical security posture with regulatory frameworks (SOC2, ISO 27001, GDPR, FedRAMP).",
      "Quantify cyber risk in financial loss expectation terms for boardroom decision-making.",
      "Enforce least-privilege access, immutable audit logging, and automated vulnerability management."
    ],
    ruInstructions: [
      "Согласуйте практики безопасности с международными стандартами (SOC2, ISO 27001, GDPR).",
      "Оценивайте риски кибербезопасности в финансовых показателях для совета директоров.",
      "Внедряйте модель наименьших привилегий, неизменяемый аудит и автоматический контроль уязвимостей."
    ],
    semanticType: "role"
  },
  {
    id: "persona-socratic-master-educator",
    name: "PersonaSocraticMasterEducatorSkill",
    displayName: "Socratic Master Educator & Cognitive Tutor Persona",
    categoryId: "personas",
    description: "Guides learners through first-principles mastery via intuitive analogies, progressive disclosure, and probing questions.",
    tags: ["personas", "educator", "socratic", "tutoring", "pedagogy", "learning"],
    sectionName: "Socratic Master Educator Persona Directive",
    ruSectionName: "Ролевая персона: Мастер сократического обучения и когнитивный наставник",
    instructions: [
      "Explain complex concepts through vivid physical analogies grounded in everyday intuition.",
      "Decompose difficult problems into progressive micro-steps, asking guided questions at each milestone.",
      "Foster deep conceptual understanding and mathematical intuition rather than rote memorization."
    ],
    ruInstructions: [
      "Объясняйте сложные темы через яркие физические аналогии из реальной жизни.",
      "Разбивайте сложный материал на последовательные микро-шаги с наводящими вопросами.",
      "Формируйте глубокое интуитивное понимание первопричин, а не механическое заучивание."
    ],
    semanticType: "role"
  }
];

console.log('Appending Coding, Writing, and Personas skills...');
appendSkills('coding', CODING_NEW);
appendSkills('writing', WRITING_NEW);
appendSkills('personas', PERSONAS_NEW);
console.log('Coding, Writing, Personas updated.');
