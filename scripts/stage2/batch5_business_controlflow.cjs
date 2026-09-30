const { appendSkills } = require('../appendSkills.cjs');

// 1. BUSINESS (10 skills to reach 75)
const BUSINESS_10 = [
  {
    id: "business-b2b-procurement-vendor-vetting",
    name: "BusinessB2bProcurementVendorVettingSkill",
    displayName: "Enterprise Procurement & Vendor Risk Assessment",
    categoryId: "business",
    description: "Evaluates third-party vendor financial solvency, concentration risk, SLA penalty structures, and business continuity readiness.",
    tags: ["business", "procurement", "vendor-management", "risk", "operations"],
    sectionName: "Enterprise Vendor Procurement Standards",
    ruSectionName: "Оценка надежности поставщиков и аудит вендорских рисков (Procurement)",
    instructions: [
      "Assess vendor balance sheet liquidity, insurance liability limits, and single-point-of-failure exposure.",
      "Incorporate financial clawbacks and penalty credits tied to uptime SLA breaches.",
      "Mandate quarterly disaster recovery simulation proof and escrow of source code/data."
    ],
    ruInstructions: [
      "Оценивайте финансовую устойчивость поставщика, лимиты страхования и риски зависимости от единственного вендора.",
      "Включайте в договор штрафные санкции и финансовые компенсации за нарушение SLA доступности.",
      "Требуйте регулярных отчетов об учениях по аварийному восстановлению и депонирование исходного кода (Escrow)."
    ],
    semanticType: "framework"
  },
  {
    id: "business-freemium-conversion-paywall-optimization",
    name: "BusinessFreemiumConversionPaywallOptimizationSkill",
    displayName: "Freemium-to-Paid Conversion & Paywall Placement Optimization",
    categoryId: "business",
    description: "Structures feature gating, usage limits, reverse trials, and contextual upgrade triggers to maximize conversion without alienating free users.",
    tags: ["business", "freemium", "monetization", "paywall", "conversion"],
    sectionName: "Freemium Conversion & Paywall Standards",
    ruSectionName: "Оптимизация конверсии Freemium-to-Paid и дизайн пейволлов",
    instructions: [
      "Gate features at the moment of highest perceived value, not at random onboarding steps.",
      "Implement 14-day Reverse Trials (all pro features unlocked initially) to drive habituation.",
      "Provide transparent soft-cap notifications before locking user workflows."
    ],
    ruInstructions: [
      "Показывайте пейволл в момент максимальной ощущаемой ценности функции, а не на первых шагах регистрации.",
      "Используйте реверсивные триалы (Reverse Trials: полный Pro-доступ на 14 дней) для формирования привычки.",
      "Предупреждайте о приближении к лимиту использования заранее, исключая внезапные блокировки."
    ],
    semanticType: "framework"
  },
  {
    id: "business-net-promoter-score-nps-closed-loop",
    name: "BusinessNetPromoterScoreNpsClosedLoopSkill",
    displayName: "Net Promoter Score (NPS) Closed-Loop Operational System",
    categoryId: "business",
    description: "Segments customer feedback into Promoters (9-10), Passives (7-8), and Detractors (0-6), triggering immediate executive follow-ups.",
    tags: ["business", "nps", "customer-success", "feedback", "retention"],
    sectionName: "Closed-Loop NPS Operational Standards",
    ruSectionName: "Операционная система работы с NPS (Закрытие цикла обратной связи)",
    instructions: [
      "Trigger automated 24-hour escalation workflows for Detractor scores (<7) with personal executive outreach.",
      "Convert Promoters (9-10) directly into G2/Capterra reviews, case study candidates, and referral advocates.",
      "Categorize qualitative feedback themes systematically into product bug vs feature request backlogs."
    ],
    ruInstructions: [
      "Автоматически эскалируйте оценки критиков (Detractors) руководству с личным звонком в течение 24 часов.",
      "Направляйте промоутеров (Promoters) на платформы отзывов (G2, Trustpilot) и в реферальную программу.",
      "Систематизируйте текстовые комментарии по категориям: баги, пробелы функционала, ценовые барьеры."
    ],
    semanticType: "framework"
  },
  {
    id: "business-franchise-model-unit-economics-replication",
    name: "BusinessFranchiseModelUnitEconomicsReplicationSkill",
    displayName: "Franchise Playbook & Unit Economics Replication Standards",
    categoryId: "business",
    description: "Standardizes four-wall EBITDA, royalty fee structures, territory exclusivity, and operational SOPs for scalable franchising.",
    tags: ["business", "franchising", "operations", "scaling", "retail"],
    sectionName: "Franchise Model & Replication Blueprint",
    ruSectionName: "Стандарты тиражирования бизнеса по франшизе (Four-Wall EBITDA, SOP)",
    instructions: [
      "Prove 4-wall EBITDA profitability and payback under 24 months across 3 distinct corporate-owned locations before franchising.",
      "Document every operational standard operating procedure (SOP) into a step-by-step digital manual.",
      "Establish royalty and marketing fund fee structures aligned with franchisee long-term unit margins."
    ],
    ruInstructions: [
      "Докажите окупаемость до 24 месяцев на 3 собственных точках перед запуском франчайзинговой программы.",
      "Опишите все операционные стандарты (SOP) в виде пошаговых регламентов и чек-листов.",
      "Устанавливайте процент роялти и маркетинговых сборов так, чтобы сохранять высокую рентабельность франчайзи."
    ],
    semanticType: "framework"
  },
  {
    id: "business-mergers-acquisitions-m-and-a-integration",
    name: "BusinessMergersAcquisitionsMAndAIntegrationSkill",
    displayName: "Post-Merger Integration (PMI) & Synergy Realization Plan",
    categoryId: "business",
    description: "Executes 100-day post-acquisition integration covering IT consolidation, culture alignment, talent retention, and cost synergies.",
    tags: ["business", "m-and-a", "integration", "corporate-development", "strategy"],
    sectionName: "Post-Merger Integration (PMI) Framework",
    ruSectionName: "План интеграции после слияний и поглощений (PMI 100 Days & Synergies)",
    instructions: [
      "Establish a centralized Integration Management Office (IMO) with workstream leads for HR, Tech, and Sales.",
      "Execute Day 1 readiness checklists: payroll continuity, email systems, and unified customer communication.",
      "Track hard revenue and cost synergy milestones against the acquisition investment thesis."
    ],
    ruInstructions: [
      "Создавайте проектный офис интеграции (IMO) с лидерами по направлениям IT, HR, продажам и финансам.",
      "Обеспечивайте бесперебойность процессов в День 1: непрерывность выплат, доступ к системам и коммуникация с клиентами.",
      "Контролируйте достижение плановых синергий по выручке и сокращению издержек по сравнению с исходным инвест-мемо."
    ],
    semanticType: "framework"
  },
  {
    id: "business-channel-partner-reseller-program",
    name: "BusinessChannelPartnerResellerProgramSkill",
    displayName: "B2B Indirect Channel Partner & Value-Added Reseller (VAR) Program",
    categoryId: "business",
    description: "Designs multi-tier reseller programs, deal registration protection, co-op marketing funds, and partner enablement academies.",
    tags: ["business", "channel-sales", "partnerships", "reseller", "b2b"],
    sectionName: "Channel Partner & VAR Program Architecture",
    ruSectionName: "Архитектура партнерских и дистрибьюторских программ продаж (VAR, Channel Sales)",
    instructions: [
      "Enforce ironclad deal registration policies to prevent channel conflict between direct sales and partners.",
      "Tier partner margins based on technical certification levels, active pipeline generation, and co-selling activity.",
      "Provide ready-to-use co-branded collateral and dedicated partner sales engineering support."
    ],
    ruInstructions: [
      "Внедряйте строгую регистрацию сделок (Deal Registration) для исключения конфликта между прямыми и партнерскими продажами.",
      "Дифференцируйте маржу партнеров в зависимости от уровня технической сертификации и объемов продаж.",
      "Предоставляйте совместные маркетинговые материалы и выделенных инженеров поддержки партнерских сделок."
    ],
    semanticType: "framework"
  },
  {
    id: "business-esg-sustainability-reporting-csrd",
    name: "BusinessEsgSustainabilityReportingCsrdSkill",
    displayName: "Corporate Sustainability & ESG Reporting (CSRD/GRI Standards)",
    categoryId: "business",
    description: "Measures Scope 1, 2, and 3 carbon emissions, supply chain labor ethics, and board governance transparency under EU CSRD.",
    tags: ["business", "esg", "sustainability", "compliance", "csrd", "reporting"],
    sectionName: "Corporate ESG & CSRD Sustainability Standards",
    ruSectionName: "Корпоративная отчетность ESG и устойчивое развитие (CSRD, GRI, Scope 1-3)",
    instructions: [
      "Calculate Scope 1 (direct), Scope 2 (purchased electricity), and Scope 3 (upstream/downstream value chain) emissions.",
      "Perform double materiality assessments: evaluate climate impact on the business and business impact on society.",
      "Ensure third-party auditable audit trails for all sustainability data points."
    ],
    ruInstructions: [
      "Рассчитывайте выбросы парниковых газов по трем охватам: Scope 1 (прямые), Scope 2 (энергия), Scope 3 (цепочка поставок).",
      "Проводите оценку двойной существенности (Double Materiality): влияние климата на бизнес и бизнеса на экологию.",
      "Обеспечивайте аудируемость всех данных об устойчивом развитии для внешних проверяющих органов."
    ],
    semanticType: "framework"
  },
  {
    id: "business-voice-of-the-customer-voc-analytics",
    name: "BusinessVoiceOfTheCustomerVocAnalyticsSkill",
    displayName: "Enterprise Voice-of-the-Customer (VoC) Multi-Channel Listening Engine",
    categoryId: "business",
    description: "Synthesizes customer call recordings, support tickets, app store reviews, and sales notes into unified prioritization vectors.",
    tags: ["business", "voc", "customer-feedback", "product-management", "insights"],
    sectionName: "Voice of the Customer (VoC) Architecture",
    ruSectionName: "Система сбора и синтеза голоса клиента (Voice of the Customer / VoC)",
    instructions: [
      "Ingest unstructured customer feedback across support chats, Gong call transcripts, and survey open fields.",
      "Cluster complaints into root-cause problem statements tagged by revenue impact and customer tier.",
      "Present a monthly VoC executive summary connecting top customer pain points to product engineering sprints."
    ],
    ruInstructions: [
      "Агрегируйте неструктурированную обратную связь из тикетов поддержки, записей звонков и опросов.",
      "Кластеризуйте боли пользователей с привязкой к объему выручки затронутых клиентов.",
      "Формируйте ежемесячный дайджест для руководства, связывающий ключевые жалобы с планами разработки."
    ],
    semanticType: "framework"
  },
  {
    id: "business-working-capital-cash-conversion-cycle",
    name: "BusinessWorkingCapitalCashConversionCycleSkill",
    displayName: "Working Capital & Cash Conversion Cycle (CCC) Compression",
    categoryId: "business",
    description: "Compresses Days Sales Outstanding (DSO) + Days Sales of Inventory (DSI) - Days Payable Outstanding (DPO) to liberate operating cash.",
    tags: ["business", "working-capital", "finance", "cash-flow", "treasury"],
    sectionName: "Cash Conversion Cycle (CCC) Optimization",
    ruSectionName: "Оптимизация рабочего капитала и цикла обращения денежных средств (CCC: DSO, DSI, DPO)",
    instructions: [
      "Calculate CCC: `Days Sales of Inventory (DSI) + Days Sales Outstanding (DSO) - Days Payable Outstanding (DPO)`.",
      "Incentivize early customer invoice settlement via dynamic discounting (e.g. 2/10 Net 30).",
      "Negotiate extended vendor payment terms while optimizing just-in-time inventory turnover."
    ],
    ruInstructions: [
      "Рассчитывайте финансовый цикл (CCC): время оборота запасов + срок сбора дебиторской задолженности - срок оплаты поставщикам.",
      "Ускоряйте сбор дебиторки с помощью скидок за досрочную оплату счетов (Dynamic Discounting).",
      "Договаривайтесь об отсрочках платежей с поставщиками для высвобождения свободного операционного кэша."
    ],
    semanticType: "framework"
  },
  {
    id: "business-key-account-management-kam-growth",
    name: "BusinessKeyAccountManagementKamGrowthSkill",
    displayName: "Strategic Key Account Management (KAM) & Multi-Year Joint Business Plans",
    categoryId: "business",
    description: "Aligns executive sponsorship, joint business plans (JBP), and quarterly value reviews to protect and grow top 20% revenue accounts.",
    tags: ["business", "kam", "account-management", "enterprise-sales", "growth"],
    sectionName: "Strategic Key Account Management (KAM) Standards",
    ruSectionName: "Стратегическое управление ключевыми клиентами (Key Account Management / KAM)",
    instructions: [
      "Build a multi-threaded relationship map across customer executive sponsors, economic buyers, and champions.",
      "Co-create a mutual Joint Business Plan (JBP) with shared 12-month business milestones and quantifiable ROI targets.",
      "Conduct quarterly strategic executive business reviews (EBR) focused on strategic outcomes rather than support tickets."
    ],
    ruInstructions: [
      "Формируйте многоуровневую карту контактов: от технических специалистов до топ-менеджеров клиента.",
      "Разрабатывайте совместный бизнес-план (JBP) с согласованными целями и критериями окупаемости на год.",
      "Проводите ежеквартальные стратегические встречи (EBR), обсуждая влияние на бизнес клиента, а не статус тикетов."
    ],
    semanticType: "framework"
  }
];

// 2. CONTROL FLOW (26 skills to reach 75)
const CONTROL_FLOW_26 = [
  {
    id: "control-flow-dag-topological-dependency-resolution",
    name: "ControlFlowDagTopologicalDependencyResolutionSkill",
    displayName: "DAG Topological Sort & Dependency Chain Execution",
    categoryId: "controlFlow",
    description: "Resolves execution sequence in Directed Acyclic Graphs (DAG) via Kahn's algorithm or DFS topological sort.",
    tags: ["control-flow", "dag", "topological-sort", "graph", "dependencies"],
    sectionName: "DAG Dependency Execution Standards",
    ruSectionName: "Топологическая сортировка графа зависимостей (DAG) и порядок выполнения",
    instructions: [
      "Detect cycles in task graphs before execution; abort with explicit cyclic dependency paths.",
      "Execute independent zero-in-degree nodes concurrently across worker pools.",
      "Trigger downstream dependent nodes immediately when all upstream parent tasks resolve successfully."
    ],
    ruInstructions: [
      "Проверяйте граф на отсутствие циклов перед запуском задач; прерывайте выполнение при обнаружении замкнутых зависимостей.",
      "Запускайте независимые узлы с нулевой степенью входа параллельно.",
      "Активируйте дочерние задачи сразу после успешного завершения всех родительских зависимостей."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-saga-distributed-transaction-compensations",
    name: "ControlFlowSagaDistributedTransactionCompensationsSkill",
    displayName: "Saga Pattern & Distributed Transaction Compensation Flow",
    categoryId: "controlFlow",
    description: "Orchestrates multi-service transactions with backward compensating transactions when a mid-flow step fails.",
    tags: ["control-flow", "saga", "distributed-transactions", "microservices", "compensation"],
    sectionName: "Saga Distributed Transaction Protocol",
    ruSectionName: "Паттерн Saga: Оркестрация компенсирующих транзакций в распределенных системах",
    instructions: [
      "Pair every forward business action with an idempotent backward compensating action.",
      "Execute compensating steps in exact reverse chronological order upon any fatal downstream failure.",
      "Persist Saga state in durable storage to ensure recovery across system restarts."
    ],
    ruInstructions: [
      "Снабжайте каждое прямое действие идемпотентной компенсирующей операцией отката.",
      "Выполняйте компенсирующие действия в строго обратном порядке при ошибке на любом шаге цепочки.",
      "Сохраняйте состояние саги в надежном хранилище для восстановления после перезагрузки сервисов."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-finite-state-machine-xstate-actor",
    name: "ControlFlowFiniteStateMachineXstateActorSkill",
    displayName: "Finite State Machine (FSM) & Actor Model Orchestration",
    categoryId: "controlFlow",
    description: "Structures complex UI and server workflows into mathematically explicit states, deterministic transitions, and guards.",
    tags: ["control-flow", "fsm", "state-machine", "xstate", "actor-model"],
    sectionName: "Finite State Machine (FSM) Architecture",
    ruSectionName: "Конечные автоматы (FSM) и модель акторов: строгая типизация состояний и переходов",
    instructions: [
      "Define all possible states, events, and guarded transitions in a formal state chart.",
      "Prevent impossible state combinations (e.g. `isLoading && isError && isSuccess`) by design.",
      "Decouple state transition triggers from side-effect action runners."
    ],
    ruInstructions: [
      "Описывайте состояния, события и условия переходов (Guards) в виде строгой диаграммы состояний.",
      "Исключайте невозможные комбинации состояний (например, одновременные `isLoading` и `isSuccess`).",
      "Разделяйте логику перехода между состояниями и выполнение побочных эффектов (Actions)."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-exponential-backoff-full-jitter-retry",
    name: "ControlFlowExponentialBackoffFullJitterRetrySkill",
    displayName: "Exponential Backoff with Full Jitter & Decorrelated Jitter",
    categoryId: "controlFlow",
    description: "Applies AWS-grade exponential backoff with randomized full jitter to prevent thundering herd spikes during downstream outages.",
    tags: ["control-flow", "retry", "exponential-backoff", "jitter", "resilience"],
    sectionName: "Exponential Backoff with Full Jitter Protocol",
    ruSectionName: "Экспоненциальная задержка с рандомизацией (Exponential Backoff with Full Jitter)",
    instructions: [
      "Calculate sleep interval: `sleep = random_between(0, min(max_sleep, base * 2^attempt))`.",
      "Avoid deterministic retries that synchronize failing clients into damaging synchronized pulse waves.",
      "Cap maximum retry attempts and bubble structured exceptions to the caller upon threshold exhaustion."
    ],
    ruInstructions: [
      "Рассчитывайте интервал повтора со случайным разбросом (Full Jitter): `sleep = random(0, min(max, base * 2^attempt))`.",
      "Исключайте детерминированные интервалы повторов во избежание эффекта набегающей толпы (Thundering Herd).",
      "Ограничивайте максимальное число попыток и возвращайте структурированную ошибку при исчерпании лимита."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-circuit-breaker-hystrix-resilience",
    name: "ControlFlowCircuitBreakerHystrixResilienceSkill",
    displayName: "Circuit Breaker Tri-State Automation (Closed, Open, Half-Open)",
    categoryId: "controlFlow",
    description: "Protects upstream systems from cascading failures by automatically opening circuits on consecutive error thresholds.",
    tags: ["control-flow", "circuit-breaker", "resilience", "fault-tolerance", "microservices"],
    sectionName: "Circuit Breaker Fault Tolerance Standards",
    ruSectionName: "Автоматический выключатель (Circuit Breaker: Closed, Open, Half-Open)",
    instructions: [
      "Closed State: Normal operation, counting failure percentage over a rolling 10-second sliding window.",
      "Open State: Immediately fast-fail subsequent requests without hitting downstream failing servers.",
      "Half-Open State: Allow single probe request through after cooldown period to test recovery."
    ],
    ruInstructions: [
      "Состояние Closed: Обычный режим с подсчетом процента ошибок в скользящем 10-секундном окне.",
      "Состояние Open: Мгновенный сброс входящих запросов с возвратом fallback без обращения к упавшему сервису.",
      "Состояние Half-Open: Пропуск пробного запроса по истечении таймаута для проверки восстановления бэкенда."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-leaky-bucket-token-bucket-rate-limiting",
    name: "ControlFlowLeakyBucketTokenBucketRateLimitingSkill",
    displayName: "Token Bucket & Leaky Bucket Rate Limiting Algorithms",
    categoryId: "controlFlow",
    description: "Controls traffic bursts and sustains steady throughput using Redis-backed Token Bucket and Leaky Bucket algorithms.",
    tags: ["control-flow", "rate-limiting", "token-bucket", "traffic-shaping", "redis"],
    sectionName: "Token Bucket Traffic Shaping Standards",
    ruSectionName: "Алгоритмы ограничения частоты запросов Token Bucket и Leaky Bucket",
    instructions: [
      "Replenish tokens at a constant fractional rate based on elapsed millisecond timestamps.",
      "Permit short bursts up to max bucket capacity while strictly enforcing average egress rate limits.",
      "Return standard HTTP headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `Retry-After`."
    ],
    ruInstructions: [
      "Пополняйте токены с постоянной скоростью на основе прошедшего времени в миллисекундах.",
      "Разрешайте кратковременные всплески трафика в пределах емкости корзины при контроле средней скорости.",
      "Возвращайте стандартные HTTP-заголовки: `X-RateLimit-Limit`, `X-RateLimit-Remaining` и `Retry-After`."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-map-reduce-parallel-fan-out-fan-in",
    name: "ControlFlowMapReduceParallelFanOutFanInSkill",
    displayName: "Parallel Fan-Out / Fan-In MapReduce Aggregation Flow",
    categoryId: "controlFlow",
    description: "Splits monolithic workloads into parallel independent workers (Fan-Out) and aggregates results into a single payload (Fan-In).",
    tags: ["control-flow", "map-reduce", "fan-out-fan-in", "concurrency", "parallelism"],
    sectionName: "Fan-Out / Fan-In Concurrency Standards",
    ruSectionName: "Параллельное ветвление и агрегация результатов (Fan-Out / Fan-In MapReduce)",
    instructions: [
      "Chunk input data into evenly balanced partitions across concurrent worker threads or async tasks.",
      "Handle partial worker failures gracefully using `Promise.allSettled()` without failing entire batches.",
      "Aggregate child outputs via a deterministic, associative reduction function."
    ],
    ruInstructions: [
      "Разбивайте массив данных на сбалансированные части между параллельными воркерами или асинхронными задачами.",
      "Обрабатывайте частичные сбои через `Promise.allSettled()` без падения всего батча.",
      "Объединяйте результаты через детерминированную ассоциативную функцию редукции (Reduce)."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-priority-queue-preemptive-scheduling",
    name: "ControlFlowPriorityQueuePreemptiveSchedulingSkill",
    displayName: "Binary Heap Priority Queue & Fair Preemptive Scheduling",
    categoryId: "controlFlow",
    description: "Prioritizes critical tasks using binary min/max heaps with anti-starvation aging mechanisms for low-priority jobs.",
    tags: ["control-flow", "priority-queue", "binary-heap", "scheduling", "algorithms"],
    sectionName: "Priority Queue Scheduling Standards",
    ruSectionName: "Очередь с приоритетами на двоичной куче и защита от голодания задач",
    instructions: [
      "Order task execution using an efficient $O(\\log N)$ binary min-heap data structure.",
      "Increment priority rank of waiting low-priority tasks over time (Aging) to prevent starvation.",
      "Support preemptive cancellation of inflight lower-priority tasks when emergency critical tasks arrive."
    ],
    ruInstructions: [
      "Управляйте порядком задач через структуру двоичной кучи со сложностью $O(\\log N)$.",
      "Повышайте приоритет долго ожидающих задач с течением времени (Aging) для защиты от голодания.",
      "Поддерживайте безопасное прерывание фоновых задач при поступлении критически важных событий."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-sliding-window-log-rate-limiter",
    name: "ControlFlowSlidingWindowLogRateLimiterSkill",
    displayName: "Sliding Window Log & Sliding Window Counter Rate Limiter",
    categoryId: "controlFlow",
    description: "Eliminates boundary burst vulnerabilities of fixed-window counters using Redis sorted sets (ZSET) timestamp logs.",
    tags: ["control-flow", "sliding-window", "rate-limiting", "redis", "security"],
    sectionName: "Sliding Window Rate Limiter Architecture",
    ruSectionName: "Ограничение скорости по скользящему окну (Sliding Window Log на Redis ZSET)",
    instructions: [
      "Remove timestamps older than `now - window_size` using Redis `ZREMRANGEBYSCORE`.",
      "Count remaining items in the sorted set using `ZCARD`; reject requests if count exceeds limit.",
      "Add current timestamp using `ZADD` inside an atomic Redis multi-exec transaction."
    ],
    ruInstructions: [
      "Удаляйте временные метки старше границы окна с помощью команды Redis `ZREMRANGEBYSCORE`.",
      "Считайте текущие запросы через `ZCARD` и отклоняйте вызов при превышении лимита.",
      "Добавляйте текущую метку через `ZADD` в рамках единой атомарной транзакции Redis."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-pub-sub-event-broker-fan-out",
    name: "ControlFlowPubSubEventBrokerFanOutSkill",
    displayName: "Publish-Subscribe Event Broker & Topic-Based Routing",
    categoryId: "controlFlow",
    description: "Decouples producers from consumers using asynchronous Pub/Sub event brokers, dead-letter queues, and wildcard topic matching.",
    tags: ["control-flow", "pub-sub", "event-driven", "messaging", "architecture"],
    sectionName: "Publish-Subscribe Event Routing Standards",
    ruSectionName: "Событийная шина Publish-Subscribe и маршрутизация сообщений по топикам",
    instructions: [
      "Publish events to semantic topic hierarchies (e.g. `order.created.v2`) without producer knowledge of subscribers.",
      "Route messages to multiple independent subscriber queues with at-least-once delivery guarantees.",
      "Route unparseable or poison-pill messages to a Dead-Letter Queue (DLQ) after 3 failed delivery attempts."
    ],
    ruInstructions: [
      "Публикуйте события в иерархические топики (`order.created.v2`) без привязки к конкретным получателям.",
      "Маршрутизируйте сообщения в независимые очереди подписчиков с гарантией доставки at-least-once.",
      "Направляйте необрабатываемые сообщения в очередь недоставленных сообщений (Dead-Letter Queue / DLQ)."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-distributed-semaphore-lease-concurrency",
    name: "ControlFlowDistributedSemaphoreLeaseConcurrencySkill",
    displayName: "Distributed Semaphore & Time-Bounded Lease Concurrency",
    categoryId: "controlFlow",
    description: "Controls bounded concurrency across multi-instance microservices using Redis/Consul distributed counting semaphores with TTL leases.",
    tags: ["control-flow", "distributed-semaphore", "concurrency", "locking", "redis"],
    sectionName: "Distributed Semaphore & Lease Protocol",
    ruSectionName: "Распределенный семафор и управление параллелизмом через аренду с TTL",
    instructions: [
      "Acquire semaphore slot with an explicit Time-To-Live (TTL) expiration lease to prevent deadlocks from crashed holders.",
      "Refresh lease heartbeat periodically during extended processing.",
      "Release semaphore slot atomically via Lua script verifying token ownership."
    ],
    ruInstructions: [
      "Занимайте слот семафора с обязательным временем жизни (TTL) для защиты от зависаний при падении процесса.",
      "Продлевайте аренду (Heartbeat) в процессе выполнения долгих операций.",
      "Освобождайте слот семафора атомарным Lua-скриптом с проверкой владения идентификатором блокировки."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-human-in-the-loop-pause-resume-checkpoint",
    name: "ControlFlowHumanInTheLoopPauseResumeCheckpointSkill",
    displayName: "Human-in-the-Loop (HITL) Workflow Pause & Resume Checkpoints",
    categoryId: "controlFlow",
    description: "Suspends automated agent execution state at high-risk action checkpoints, waiting for manual human approval or modification.",
    tags: ["control-flow", "hitl", "human-in-the-loop", "approval-workflow", "safety"],
    sectionName: "Human-in-the-Loop Checkpoint Protocol",
    ruSectionName: "Точки останова и возобновления Human-in-the-Loop (HITL) для утверждения человеком",
    instructions: [
      "Serialize entire workflow execution context and variable state into durable storage upon reaching a sensitive action threshold.",
      "Send interactive notification (Slack, Email, UI modal) with clear diff summary and 1-click Approve / Reject buttons.",
      "Resume execution seamlessly from the exact paused instruction point upon receiving human confirmation."
    ],
    ruInstructions: [
      "Сериализуйте контекст и состояние переменных воркера в БД при достижении точки контроля чувствительных действий.",
      "Отправляйте уведомление (Slack, UI) с наглядным diff изменений и кнопками «Утвердить / Отклонить».",
      "Возобновляйте выполнение процесса с сохраненного шага после получения подтверждения от оператора."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-async-await-concurrency-limiter",
    name: "ControlFlowAsyncAwaitConcurrencyLimiterSkill",
    displayName: "Async/Await Promise Concurrency Pool Limiter (p-limit)",
    categoryId: "controlFlow",
    description: "Limits parallel Promise execution concurrency (e.g. 5 concurrent HTTP calls) to prevent memory exhaustion and socket exhaustion.",
    tags: ["control-flow", "concurrency", "async-await", "promises", "typescript"],
    sectionName: "Promise Concurrency Limiting Standards",
    ruSectionName: "Ограничение параллелизма асинхронных вызовов (Promise Concurrency Pool)",
    instructions: [
      "Wrap asynchronous tasks in a bounded concurrency limiter (e.g. `p-limit(concurrency)`).",
      "Queue excess tasks in memory without initiating external network sockets until an active slot frees up.",
      "Capture and isolate individual task rejections so one failed promise does not crash the entire pool."
    ],
    ruInstructions: [
      "Оборачивайте асинхронные задачи в пул с фиксированным параллелизмом (например, `p-limit(5)`).",
      "Ставьте избыточные вызовы в очередь памяти без открытия лишних сокетов до освобождения слота.",
      "Изолируйте ошибки отдельных задач, предотвращая аварийное завершение всего пула промисов."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-optimistic-locking-version-cas",
    name: "ControlFlowOptimisticLockingVersionCasSkill",
    displayName: "Optimistic Concurrency Control (OCC) & Compare-And-Swap (CAS)",
    categoryId: "controlFlow",
    description: "Guards against lost updates in concurrent databases using integer version columns and atomic Compare-And-Swap statements.",
    tags: ["control-flow", "optimistic-locking", "concurrency", "database", "cas"],
    sectionName: "Optimistic Concurrency Control Standards",
    ruSectionName: "Оптимистичные блокировки (OCC) и атомарный Compare-And-Swap (CAS) по версии",
    instructions: [
      "Include a monotonically increasing `version` integer column on all mutable database records.",
      "Execute mutations with atomic conditions: `UPDATE table SET val = :val, version = version + 1 WHERE id = :id AND version = :current_version`.",
      "Retry the read-modify-write cycle automatically upon detecting zero updated rows (version collision)."
    ],
    ruInstructions: [
      "Добавляйте монотонно растущее целочисленное поле `version` во все изменяемые сущности БД.",
      "Выполняйте запись с условием: `UPDATE table SET ..., version = version + 1 WHERE id = :id AND version = :version`.",
      "Автоматически повторяйте чтение и запись при обнаружении конфликта версий (0 обновленных строк)."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-actor-model-message-passing-mailbox",
    name: "ControlFlowActorModelMessagePassingMailboxSkill",
    displayName: "Actor Model Concurrency & Isolated Mailbox Message Passing",
    categoryId: "controlFlow",
    description: "Eliminates shared mutable memory race conditions using isolated actors communicating strictly via asynchronous message mailboxes.",
    tags: ["control-flow", "actor-model", "concurrency", "message-passing", "erlang-akka"],
    sectionName: "Actor Model Message Passing Standards",
    ruSectionName: "Модель акторов: изолированное состояние и передача сообщений через Mailbox",
    instructions: [
      "Encapsulate all mutable actor state privately; strictly prohibit direct memory access from external actors.",
      "Process incoming mailbox messages sequentially and deterministically in single-threaded event loops.",
      "Handle actor lifecycle supervision with 'Let it crash' restart strategies (One-for-One / One-for-All)."
    ],
    ruInstructions: [
      "Изолируйте состояние актора внутри экземпляра; исключайте прямой доступ к чужой памяти.",
      "Обрабатывайте входящие сообщения из почтового ящика последовательно и детерминированно.",
      "Реализуйте стратегию супервизии («Let it crash») с автоматическим перезапуском упавших акторов."
    ],
    semanticType: "protocol"
  },
  {
    id: "control-flow-idempotency-key-deduplication",
    name: "ControlFlowIdempotencyKeyDeduplicationSkill",
    displayName: "Stripe-Style Idempotency Keys & Request Deduplication",
    categoryId: "controlFlow",
    description: "Prevents duplicate charges or side-effects by caching API response payloads against client-generated UUID idempotency keys.",
    tags: ["control-flow", "idempotency", "api-design", "deduplication", "reliability"],
    sectionName: "Idempotency Key Deduplication Protocol",
    ruSectionName: "Идемпотентные ключи запросов (Idempotency Keys) и дедупликация вызовов API",
    instructions: [
      "Require clients to pass a unique `Idempotency-Key: <UUID>` header on all mutating POST requests.",
      "Store idempotency records atomically in Redis/PostgreSQL with `PROCESSING` state before executing logic.",
      "Return the cached previous response body and status code immediately if the same key is received again."
    ],
    ruInstructions: [
      "Принимайте уникальный заголовок `Idempotency-Key` от клиента для всех изменяющих POST-запросов.",
      "Фиксируйте статус `PROCESSING` в Redis перед стартом выполнения операции для защиты от гонок.",
      "Возвращайте сохраненный результат и статус-код при повторном поступлении того же ключа."
    ],
    semanticType: "protocol"
  }
];

console.log('Appending Business Part 2 and Control Flow Part 1...');
appendSkills('business', BUSINESS_10);
appendSkills('controlFlow', CONTROL_FLOW_26);
console.log('Business and Control Flow appended successfully!');
