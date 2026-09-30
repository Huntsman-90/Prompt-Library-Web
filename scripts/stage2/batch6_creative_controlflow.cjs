const { appendSkills } = require('../appendSkills.cjs');

// CONTROL FLOW: 10 skills to reach 75
const CONTROL_FLOW_10 = [
  {
    id: "control-flow-leader-election-raft-lease",
    name: "ControlFlowLeaderElectionRaftLeaseSkill",
    displayName: "Raft Consensus Leader Election & Split-Brain Prevention",
    categoryId: "controlFlow",
    description: "Elects a single authoritative cluster leader using randomized heartbeats, term counters, and majority quorum voting.",
    tags: ["control-flow", "raft", "leader-election", "distributed-systems", "consensus"],
    sectionName: "Raft Leader Election Protocol",
    ruSectionName: "Выборы лидера в консенсусе Raft и защита от Split-Brain",
    instructions: [
      "Transition from Follower to Candidate if no heartbeat is received within randomized timeout (150-300ms).",
      "Request votes across cluster nodes; claim Leader status only after securing strict majority quorum ($N/2 + 1$).",
      "Step down to Follower immediately upon encountering a higher term number."
    ],
    ruInstructions: [
      "Переходите в состояние кандидата при отсутствии heartbeat-сигнала в течение случайного таймаута (150–300 мс).",
      "Запрашивайте голоса узлов и объявляйте себя лидером только при получении строгого большинства ($N/2 + 1$).",
      "Немедленно слагайте полномочия лидера при получении сообщения с более высоким номером эпохи (Term)."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-bulkhead-thread-pool-isolation",
    name: "ControlFlowBulkheadThreadPoolIsolationSkill",
    displayName: "Bulkhead Pattern & Resource Pool Failure Isolation",
    categoryId: "controlFlow",
    description: "Isolates critical system resources into separate dedicated thread/connection pools so failure in one subsystem cannot exhaust others.",
    tags: ["control-flow", "bulkhead", "isolation", "resilience", "architecture"],
    sectionName: "Bulkhead Resource Isolation Standards",
    ruSectionName: "Паттерн Bulkhead: Изоляция пулов ресурсов и защита от каскадных сбоев",
    instructions: [
      "Allocate dedicated connection pools for third-party external integrations (e.g. payment gateway vs analytics).",
      "Enforce maximum queue depths for each bulkhead; fast-reject overflow requests before thread starvation.",
      "Monitor saturation metrics per bulkhead pool independently."
    ],
    ruInstructions: [
      "Выделяйте независимые пулы соединений для разных внешних сервисов (например, платежи vs аналитика).",
      "Ограничивайте глубину очереди для каждого пула, сбрасывая избыточные запросы до исчерпания потоков.",
      "Отслеживайте метрики загрузки и утилизации для каждого пула изолированно."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-two-phase-commit-2pc-atomic-coordination",
    name: "ControlFlowTwoPhaseCommit2pcAtomicCoordinationSkill",
    displayName: "Two-Phase Commit (2PC) Distributed Atomic Coordination",
    categoryId: "controlFlow",
    description: "Guarantees atomic all-or-nothing transactions across multiple databases via Prepare and Commit phases.",
    tags: ["control-flow", "2pc", "transactions", "distributed-systems", "coordination"],
    sectionName: "Two-Phase Commit (2PC) Protocol",
    ruSectionName: "Двухфазный коммит (Two-Phase Commit / 2PC) в распределенных базах данных",
    instructions: [
      "Phase 1 (Prepare): Coordinator queries all cohort nodes; cohorts lock resources and vote YES/NO.",
      "Phase 2 (Commit/Abort): Coordinator issues COMMIT only if 100% cohorts voted YES, otherwise issues ABORT.",
      "Log transaction coordinator state durably to disk before sending Phase 2 decision messages."
    ],
    ruInstructions: [
      "Фаза 1 (Prepare): Координатор опрашивает узлы; участники блокируют ресурсы и голосуют ЗА/ПРОТИВ.",
      "Фаза 2 (Commit/Abort): Координатор рассылает COMMIT только при 100% согласии, иначе рассылает ABORT.",
      "Записывайте решение координатора в журнал на диск перед отправкой команд второй фазы."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-backpressure-reactive-streams-flow-control",
    name: "ControlFlowBackpressureReactiveStreamsFlowControlSkill",
    displayName: "Reactive Streams Backpressure & Demand-Driven Flow Control",
    categoryId: "controlFlow",
    description: "Prevents fast producers from overwhelming slow consumers using explicit demand signaling (`request(n)`).",
    tags: ["control-flow", "backpressure", "reactive-streams", "flow-control", "async"],
    sectionName: "Reactive Streams Backpressure Protocol",
    ruSectionName: "Управление противодавлением (Backpressure) и реактивные потоки (Reactive Streams)",
    instructions: [
      "Producers must never emit elements until downstream consumers explicitly request buffer capacity (`request(n)`).",
      "Apply configurable overflow strategies (DROP_OLDEST, BUFFER_BOUNDED, ERROR) when consumer capacity is reached.",
      "Propagate cancel signals upstream immediately when consumer terminates or unsubscribes."
    ],
    ruInstructions: [
      "Источники данных не должны отправлять элементы без явного запроса емкости от получателя (`request(n)`).",
      "Применяйте явные стратегии переполнения буфера (DROP_OLDEST, BUFFER, ERROR) при насыщении потребителя.",
      "Передавайте сигнал отмены подписки вверх по цепочке при завершении обработки."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-debounce-throttle-ui-event-pacing",
    name: "ControlFlowDebounceThrottleUiEventPacingSkill",
    displayName: "Debounce & Throttle High-Frequency Event Pacing",
    categoryId: "controlFlow",
    description: "Paces rapid keyboard, resize, and scroll events using trailing debouncing and leading/trailing throttling.",
    tags: ["control-flow", "debounce", "throttle", "ui-events", "performance"],
    sectionName: "Event Debouncing & Throttling Standards",
    ruSectionName: "Оптимизация высокочастотных событий (Debounce и Throttle в UI)",
    instructions: [
      "Use Debounce (wait for $N$ ms of silence) for search auto-complete inputs and window resize recalculations.",
      "Use Throttle (execute at most once per $N$ ms) for continuous scroll position tracking and canvas draws.",
      "Cancel pending timers properly on React component unmount to prevent memory leaks."
    ],
    ruInstructions: [
      "Применяйте Debounce (ожидание паузы в $N$ мс) для поисковых подсказок и перерасчета геометрии экрана.",
      "Используйте Throttle (не чаще раза в $N$ мс) для отслеживания скролла и анимаций отрисовки.",
      "Обязательно очищайте таймеры при размонтировании React-компонентов для защиты от утечек памяти."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-pipeline-middleware-onion-architecture",
    name: "ControlFlowPipelineMiddlewareOnionArchitectureSkill",
    displayName: "Composable Middleware Pipeline & Onion Execution Flow",
    categoryId: "controlFlow",
    description: "Executes request/response pipelines through composable middleware layers with pre-processing, next() delegation, and post-processing.",
    tags: ["control-flow", "middleware", "pipeline", "onion-architecture", "express-koa"],
    sectionName: "Composable Middleware Pipeline Standards",
    ruSectionName: "Конвейер промежуточной обработки Middleware («Луковичная архитектура» Onion Flow)",
    instructions: [
      "Delegate to the next middleware in chain via `await next()`.",
      "Execute pre-processing logic before `next()` and post-processing/error inspection after `next()` resolves.",
      "Support early exit and response short-circuiting for authentication failures and validation errors."
    ],
    ruInstructions: [
      "Передавайте управление следующему слою в цепочке через вызов `await next()`.",
      "Выполняйте логику предварительной обработки до `next()` и пост-обработку результата после завершения.",
      "Поддерживайте досрочное прерывание цепочки при ошибках авторизации и валидации."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-gossip-protocol-cluster-membership",
    name: "ControlFlowGossipProtocolClusterMembershipSkill",
    displayName: "SWIM Gossip Protocol & Cluster Failure Detection",
    categoryId: "controlFlow",
    description: "Disseminates cluster state and detects node failures using weakly-consistent peer-to-peer Gossip message exchanges.",
    tags: ["control-flow", "gossip-protocol", "swim", "cluster", "distributed-systems"],
    sectionName: "Gossip Protocol Cluster Standards",
    ruSectionName: "Протокол сплетен (Gossip Protocol / SWIM) для обнаружения сбоев в кластере",
    instructions: [
      "Periodically ping random peer nodes; if no ack is received, request indirect pings through $k$ auxiliary peers.",
      "Declare node SUSPECT before DEAD to allow transient network partitions to recover gracefully.",
      "Piggyback membership updates onto existing heartbeat messages to achieve $O(1)$ network overhead per node."
    ],
    ruInstructions: [
      "Периодически опрашивайте случайные узлы кластера; при отсутствии ответа запрашивайте косвенный пинг через $k$ соседей.",
      "Помечайте узел как SUSPECT перед окончательным объявлением DEAD для защиты от кратковременных задержек.",
      "Добавляйте информацию об изменениях состава кластера к регулярным сообщениям без роста трафика."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-cqrs-event-stream-subscription",
    name: "ControlFlowCqrsEventStreamSubscriptionSkill",
    displayName: "CQRS Asynchronous Event Stream Projection & Replay",
    categoryId: "controlFlow",
    description: "Subscribes to write-side event streams to build high-speed read projections with catch-up replay capabilities.",
    tags: ["control-flow", "cqrs", "event-stream", "projection", "kafka"],
    sectionName: "CQRS Event Projection Protocol",
    ruSectionName: "Асинхронные проекции событий CQRS и воспроизведение потоков (Replay)",
    instructions: [
      "Maintain a persistent consumer offset checkpoint for each read-model projection.",
      "Ensure projection event handlers are idempotent: replaying duplicate events produces identical projection state.",
      "Support background rebuilds of projections by replaying event logs from stream origin (`offset = 0`)."
    ],
    ruInstructions: [
      "Сохраняйте позицию смещения (Offset Checkpoint) для каждой проекции модели чтения.",
      "Обеспечивайте строгую идемпотентность обработчиков: повтор события не должен искажать данные.",
      "Поддерживайте фоновое перестроение проекций путем полного перезапуска потока с нулевого смещения."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-fork-join-recursive-divide-conquer",
    name: "ControlFlowForkJoinRecursiveDivideConquerSkill",
    displayName: "Fork-Join Parallel Recursive Divide-and-Conquer",
    categoryId: "controlFlow",
    description: "Breaks massive computational trees into subtasks (Fork) executed on work-stealing thread pools, merging outputs (Join).",
    tags: ["control-flow", "fork-join", "divide-and-conquer", "parallelism", "algorithms"],
    sectionName: "Fork-Join Concurrency Standards",
    ruSectionName: "Параллельная модель Fork-Join и рекурсивное разделение задач (Divide and Conquer)",
    instructions: [
      "Split tasks exceeding a predefined sequential threshold recursively into left and right subtasks (Fork).",
      "Execute small subtasks sequentially at the base case to avoid fork overhead thrashing.",
      "Join subtask results asynchronously using work-stealing queues to maximize CPU core utilization."
    ],
    ruInstructions: [
      "Рекурсивно разделяйте крупные задачи на подзадачи (Fork) при превышении порогового размера.",
      "Выполняйте базовые мелкие подзадачи последовательно без накладных расходов на создание потоков.",
      "Объединяйте результаты (Join) с использованием очередей Work-Stealing для равномерной загрузки ядер CPU."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-graceful-shutdown-drain-connections",
    name: "ControlFlowGracefulShutdownDrainConnectionsSkill",
    displayName: "Graceful Process Shutdown & In-Flight Connection Draining",
    categoryId: "controlFlow",
    description: "Handles SIGTERM/SIGINT signals by refusing new requests, completing in-flight jobs, and closing database pools cleanly.",
    tags: ["control-flow", "graceful-shutdown", "devops", "lifecycle", "reliability"],
    sectionName: "Graceful Process Termination Protocol",
    ruSectionName: "Корректное завершение процессов (Graceful Shutdown) и сброс активных соединений",
    instructions: [
      "Intercept `SIGTERM` and `SIGINT` signals; immediately stop accepting new HTTP/gRPC requests.",
      "Allow active in-flight requests a graceful grace period (e.g. 30 seconds) to complete processing.",
      "Close database connection pools, flush log buffers, and exit process with status code 0."
    ],
    ruInstructions: [
      "Перехватывайте системные сигналы `SIGTERM` и `SIGINT`, прекращая прием новых входящих запросов.",
      "Предоставляйте активным фоновым операциям фиксированный таймаут (например, 30 секунд) на завершение.",
      "Закрывайте пулы баз данных, сбрасывайте буферы логов на диск и завершайте процесс с кодом 0."
    ],
    semanticType: "protocol"
  }
];

// CREATIVE: 26 skills to reach 75
const CREATIVE_26 = [
  {
    id: "creative-worldbuilding-magic-system-sanderson",
    name: "CreativeWorldbuildingMagicSystemSandersonSkill",
    displayName: "Brandon Sanderson Laws of Magic & Hard Magic Systems",
    categoryId: "creative",
    description: "Designs consistent fantasy magic systems governed by Sanderson's First, Second, and Third Laws of Magic.",
    tags: ["creative", "worldbuilding", "magic-systems", "sanderson", "fantasy", "writing"],
    sectionName: "Hard Magic System Design Framework",
    ruSectionName: "Законы магии Брэндона Сандерсона и проектирование строгих магических систем",
    instructions: [
      "Law 1: An author's ability to solve problems with magic is directly proportional to how well the reader understands said magic.",
      "Law 2: Limitations and costs are vastly more interesting than raw magical powers.",
      "Law 3: Expand on existing magical rules before adding brand-new elements."
    ],
    ruInstructions: [
      "Закон 1: Способность автора решать проблемы с помощью магии прямо пропорциональна пониманию правил читателем.",
      "Закон 2: Ограничения, слабости и цена применения магии интереснее самих способностей.",
      "Закон 3: Развивайте и углубляйте уже заданные правила мира перед добавлением новых элементов."
    ],
    semanticType: "creative_framework"
  },
  {
    id: "creative-pixar-storytelling-22-rules",
    name: "CreativePixarStorytelling22RulesSkill",
    displayName: "Pixar 22 Rules of Storytelling & Emotional Resonance",
    categoryId: "creative",
    description: "Applies Pixar narrative principles: admire characters for trying rather than success, simplify storylines, and embrace vulnerability.",
    tags: ["creative", "storytelling", "pixar", "narrative", "screenwriting", "animation"],
    sectionName: "Pixar Storytelling Rules Blueprint",
    ruSectionName: "22 правила сторителлинга студии Pixar (Эмоциональная глубина и путь героя)",
    instructions: [
      "You admire a character for trying more than for their successes.",
      "Putting it on paper lets you start fixing it; get the messy first draft out immediately.",
      "What is the essence of your story? Strip away everything that does not serve the core emotional spine."
    ],
    ruInstructions: [
      "Зрители восхищаются персонажем за упорные попытки и преодоление трудностей, а не за легкие победы.",
      "Переносите идеи на бумагу без самоцензуры: редактировать можно только то, что уже написано.",
      "Выделяйте эмоциональный стержень истории и безжалостно убирайте все сцены, которые ему не служат."
    ],
    semanticType: "creative_framework"
  },
  {
    id: "creative-metaphor-poetic-synesthesia-imagery",
    name: "CreativeMetaphorPoeticSynesthesiaImagerySkill",
    displayName: "Poetic Synesthesia & Multi-Sensory Metaphor Generation",
    categoryId: "creative",
    description: "Constructs evocative figurative language blending cross-modal sensory perceptions (tactile sound, luminous taste, weighted color).",
    tags: ["creative", "poetry", "synesthesia", "metaphor", "imagery", "literary-craft"],
    sectionName: "Poetic Synesthesia & Imagery Standards",
    ruSectionName: "Синестезия и мультисенсорные метафоры в поэтическом тексте",
    instructions: [
      "Cross sensory domains boldly: describe sounds through tactile textures, lights through physical temperatures.",
      "Avoid clichéd metaphors ('eyes like stars'); find unexpected structural affinities between disparate objects.",
      "Ground abstract philosophical emotions in concrete physical sensory anchors."
    ],
    ruInstructions: [
      "Смешивайте сенсорные регистры: описывайте звук через осязаемую текстуру, а свет — через температуру.",
      "Избегайте затертых штампов; находите неочевидные глубинные аналогии между разнородными явлениями.",
      "Заземляйте абстрактные переживания в конкретных физических и тактильных деталях."
    ],
    semanticType: "creative_framework"
  },
  {
    id: "creative-noir-detective-cynical-subtext",
    name: "CreativeNoirDetectiveCynicalSubtextSkill",
    displayName: "Hardboiled Noir Detective Fiction & Cynical Atmosphere",
    categoryId: "creative",
    description: "Emulates classic Raymond Chandler / Dashiell Hammett noir: rain-slicked neon streets, moral compromise, and sardonic similes.",
    tags: ["creative", "noir", "hardboiled", "fiction", "chandler", "mystery"],
    sectionName: "Hardboiled Noir Narrative Atmosphere",
    ruSectionName: "Атмосфера крутого нуарного детектива (Рэймонд Чандлер / Дашил Хэммет)",
    instructions: [
      "Use sharp, unexpected sardonic similes ('as honest as a three-dollar bill').",
      "Create morally ambiguous protagonists operating in corrupt institutional systems.",
      "Paint vivid sensory environments of smoke, neon reflections, rain, and quiet urban loneliness."
    ],
    ruInstructions: [
      "Используйте едкие, хлесткие сравнения и ироничный внутренний монолог героя.",
      "Создавайте неоднозначных персонажей, балансирующих на грани закона в продажном мире.",
      "Передавайте густую атмосферу ночного города: блики неона на мокром асфальте, дым и одиночество."
    ],
    semanticType: "creative_framework"
  },
  {
    id: "creative-cyberpunk-dystopian-worldbuilding",
    name: "CreativeCyberpunkDystopianWorldbuildingSkill",
    displayName: "Cyberpunk Worldbuilding (High Tech, Low Life Aesthetic)",
    categoryId: "creative",
    description: "Constructs dense cyberpunk settings: megacorporation sovereignty, black-market neural wetware, and street-level counterculture.",
    tags: ["creative", "cyberpunk", "worldbuilding", "sci-fi", "dystopia", "aesthetic"],
    sectionName: "Cyberpunk Dystopian Worldbuilding Blueprint",
    ruSectionName: "Миростроение в жанре киберпанк (High Tech, Low Life / Уильям Гибсон)",
    instructions: [
      "Intertwine cutting-edge neurotechnology with decaying, chaotic street-level urban reality.",
      "Establish sovereign megacorporations whose economic power completely eclipses nation-states.",
      "Incorporate authentic street slang, neural cyberware trade-offs, and subterranean underground economies."
    ],
    ruInstructions: [
      "Соединяйте прорывные нейротехнологии с разрухой и выживанием на уровне трущоб мегаполиса.",
      "Показывайте всесилие корпораций-дзайбацу, подменивших собой государственные институты.",
      "Внедряйте аутентичный уличный сленг, побочные эффекты аугментаций и теневой рынок данных."
    ],
    semanticType: "creative_framework"
  },
  {
    id: "creative-surrealist-automatisme-dream-logic",
    name: "CreativeSurrealistAutomatismeDreamLogicSkill",
    displayName: "Surrealist Dream Logic & André Breton Automatism",
    categoryId: "creative",
    description: "Explores subconscious associations, non-Euclidean spatial transitions, and poetic juxtaposition of contradictory objects.",
    tags: ["creative", "surrealism", "dream-logic", "avant-garde", "subconscious", "art"],
    sectionName: "Surrealist Dream Logic Architecture",
    ruSectionName: "Сюрреалистическая логика сновидений и автоматическое письмо (Андре Бретон)",
    instructions: [
      "Subvert linear causal logic in favor of emotional and symbolic dream associations.",
      "Juxtapose radically unrelated objects to unlock startling unconscious poetic resonance.",
      "Treat impossible spatial and temporal shifts with matter-of-fact narrative calmness."
    ],
    ruInstructions: [
      "Заменяйте прямолинейную логику причин и следствий символическими связями сновидений.",
      "Сопоставляйте контрастные образы для пробуждения глубинных ассоциаций подсознания.",
      "Описывайте метаморфозы пространства и времени как естественные и не вызывающие удивления события."
    ],
    semanticType: "creative_framework"
  }
];

console.log('Appending Control Flow Part 2 and Creative Part 1...');
appendSkills('controlFlow', CONTROL_FLOW_10);
appendSkills('creative', CREATIVE_26);
console.log('Control Flow and Creative appended successfully!');
