const newIdeationSkills = [
  {
    id: 'triz-inventive-principles-engine',
    name: 'TrizInventivePrinciplesEngineSkill',
    displayName: 'TRIZ Systematic Inventive Principles',
    categoryId: 'ideation',
    description: 'Applies Genrich Altshuller’s 40 TRIZ inventive principles and contradiction matrix to resolve technical and engineering bottlenecks.',
    tags: ['ideation', 'triz', 'inventive', 'engineering', 'contradiction-matrix'],
    sectionName: 'TRIZ Inventive Principles Protocol',
    ruSectionName: 'Протокол изобретательских принципов ТРИЗ',
    semanticType: 'strategy_framework',
    instructions: [
      'State the core engineering or product contradiction (Parameter A improves while Parameter B worsens).',
      'Select relevant TRIZ principles (Segmentation, Local Quality, Asymmetry, Inversion, Blessing in Disguise, Cushion in Advance).',
      'Formulate at least 3 concrete inventive implementations eliminating the trade-off entirely.'
    ],
    ruInstructions: [
      'Сформулируйте ключевое противоречие (улучшение параметра А ухудшает параметр Б).',
      'Примените принципы ТРИЗ (дробление, местное качество, асимметрия, инверсия, обратить вред в пользу).',
      'Сформулируйте не менее 3 конкретных изобретательских решений без компромиссов.'
    ]
  },
  {
    id: 'biomimicry-nature-solution-mapper',
    name: 'BiomimicryNatureSolutionMapperSkill',
    displayName: 'Biomimicry & Nature-Inspired Architecture',
    categoryId: 'ideation',
    description: 'Transfers biological and evolutionary mechanisms to human engineering, software architectures, and product mechanics.',
    tags: ['ideation', 'biomimicry', 'nature-inspired', 'biology', 'systems'],
    sectionName: 'Biomimetic Solution Mapping',
    ruSectionName: 'Биомиметическое проектирование решений',
    semanticType: 'strategy_framework',
    instructions: [
      'Translate the design problem into a natural functional challenge (e.g., thermal dissipation, resilient routing).',
      'Identify 2-3 biological organisms or ecosystems evolved to solve this challenge.',
      'Abstract the biological mechanism into technical architecture principles.'
    ],
    ruInstructions: [
      'Трансформируйте инженерную задачу в биологический вызов (терморегуляция, устойчивая маршрутизация).',
      'Приведите 2-3 природных организма или экосистемы, решающих этот вызов.',
      'Абстрагируйте биологический механизм в принципы архитектуры.'
    ]
  },
  {
    id: 'first-principles-reduction-ideation',
    name: 'FirstPrinciplesReductionIdeationSkill',
    displayName: 'First Principles Physical & Financial Reduction',
    categoryId: 'ideation',
    description: 'Strips away industry dogmas and conventions to reconstruct product concepts from atomic physics and fundamental cost limits.',
    tags: ['ideation', 'first-principles', 'musk-method', 'cost-curve', 'atomic-truth'],
    sectionName: 'First Principles Decomposition',
    ruSectionName: 'Декомпозиция от первых принципов',
    semanticType: 'reasoning_protocol',
    instructions: [
      'Identify all inherited industry assumptions, pricing standards, and technological dogmas.',
      'Deconstruct the problem to bedrock physical and mathematical truths.',
      'Reassemble an optimal solution purely from foundational elements.'
    ],
    ruInstructions: [
      'Выявите унаследованные отраслевые догмы и шаблонные ценовые ожидания.',
      'Декомпозируйте проблему до фундаментальных физических и математических истин.',
      'Соберите заново оптимальное решение исключительно на базе элементарных составляющих.'
    ]
  },
  {
    id: 'provocation-po-lateral-thinking',
    name: 'ProvocationPoLateralThinkingSkill',
    displayName: 'Lateral Thinking PO (Provocative Operation)',
    categoryId: 'ideation',
    description: 'Forces provocative, seemingly absurd assumptions (PO) to break mental ruts and stimulate lateral breakthroughs.',
    tags: ['ideation', 'lateral-thinking', 'de-bono', 'provocation', 'paradox'],
    sectionName: 'Provocative Operation (PO) Protocol',
    ruSectionName: 'Протокол латеральной провокации (PO)',
    semanticType: 'process_directive',
    instructions: [
      'Formulate a radical provocation starting with "PO: [Absurd statement]" (e.g., "PO: cars have square wheels").',
      'Extract movement principles: What new affordances, properties, or advantages does this absurdity highlight?',
      'Channel the movement into practical, innovative feature architectures.'
    ],
    ruInstructions: [
      'Сформулируйте радикальную провокацию "PO: [Абсурдное утверждение]".',
      'Найдите точки движения: какие неожиданные свойства и скрытые плюсы вскрывает этот парадокс?',
      'Сконвертируйте находки в практические инновационные фичи.'
    ]
  },
  {
    id: 'forced-analogous-domain-transfer',
    name: 'ForcedAnalogousDomainTransferSkill',
    displayName: 'Cross-Domain Analogous Mapping (Synectics)',
    categoryId: 'ideation',
    description: 'Cross-pollinates mechanics from completely unrelated industries (e.g. Formula 1 pitstops -> surgery, theme parks -> banking).',
    tags: ['ideation', 'synectics', 'cross-domain', 'analogy-mapping', 'transfer'],
    sectionName: 'Cross-Domain Synectic Mapping',
    ruSectionName: 'Кросс-доменный синектический перенос',
    semanticType: 'strategy_framework',
    instructions: [
      'Pick a distant, high-performance domain unrelated to the target problem.',
      'Map the source domain’s core operational verbs, rhythms, and failure preventions.',
      'Overlay these mechanisms onto the target domain to uncover novel interaction models.'
    ],
    ruInstructions: [
      'Выберите далекую высокоэффективную отрасль, не связанную с задачей.',
      'Опишите ключевые глаголы, ритмы и защиту от сбоев в выбранной сфере.',
      'Перенесите эти механики на целевой продукт для создания прорывных решений.'
    ]
  },
  {
    id: 'disruptive-low-end-encroachment-ideator',
    name: 'DisruptiveLowEndEncroachmentIdeatorSkill',
    displayName: 'Christensen Low-End & New-Market Disruption',
    categoryId: 'ideation',
    description: 'Designs stripped-down, ultra-accessible solutions for overserved or non-consuming segments following Clayton Christensen disruption theory.',
    tags: ['ideation', 'disruption', 'christensen', 'low-end', 'innovators-dilemma'],
    sectionName: 'Low-End Disruption Architecture',
    ruSectionName: 'Архитектура низовой подрывной инновации',
    semanticType: 'strategy_framework',
    instructions: [
      'Identify overserved mainstream features that create bloat and cost friction.',
      'Specify a "good enough", 10x simpler and cheaper core offering for non-consumers.',
      'Plot the upward trajectory enabling eventual encroachment on incumbent tiers.'
    ],
    ruInstructions: [
      'Определите избыточные функции рынка, создающие удорожание и сложность.',
      'Спроектируйте решение "good enough" — в 10 раз проще и доступнее для не охваченной аудитории.',
      'Спланируйте траекторию последующего масштабирования на смежные сегменты.'
    ]
  },
  {
    id: 'anti-problem-inversion-divergence',
    name: 'AntiProblemInversionDivergenceSkill',
    displayName: 'Anti-Problem & Disaster Maximizer',
    categoryId: 'ideation',
    description: 'Systematically brainstorms how to guarantee maximum failure, catastrophe, and churn, then inverts every step into bulletproof innovation.',
    tags: ['ideation', 'inversion', 'anti-problem', 'charlie-munger', 'premortem'],
    sectionName: 'Anti-Problem Inversion Architecture',
    ruSectionName: 'Инверсия анти-проблемы и катастроф',
    semanticType: 'process_directive',
    instructions: [
      'Devise the most catastrophic, painful, and infuriating ways to fail the objective.',
      'Analyze why each anti-mechanism is so effective at creating disruption.',
      'Directly invert each catastrophic vector into an active, proactive design feature.'
    ],
    ruInstructions: [
      'Придумайте самые разрушительные и гарантированные способы провалить цель.',
      'Проанализируйте механизм действия каждого деструктивного фактора.',
      'Инвертируйте каждый вектор в активную защитную или превосходную фичу.'
    ]
  },
  {
    id: 'ten-x-moonshot-scale-multiplier',
    name: 'TenXMoonshotScaleMultiplierSkill',
    displayName: '10x Moonshot Thinking & Scale Multiplier',
    categoryId: 'ideation',
    description: 'Forces 10x improvement constraints over 10% incremental steps, breaking linear process boundaries.',
    tags: ['ideation', '10x', 'moonshot', 'exponential', 'scale'],
    sectionName: '10x Moonshot Ideation',
    ruSectionName: '10x Экспоненциальная генерация (Moonshot)',
    semanticType: 'process_directive',
    instructions: [
      'Reject all 10% optimizations as invalid.',
      'Frame the requirements assuming 100x traffic, 0 latency, or 10x cheaper delivery.',
      'Formulate step-function paradigms capable of fulfilling the 10x leap.'
    ],
    ruInstructions: [
      'Отклоните любые 10% оптимизации как недопустимые.',
      'Сформулируйте требования при условии 100x нагрузки, 0 задержки или 10x удешевления.',
      'Сгенерируйте качественные сдвиги парадигмы для достижения 10x эффекта.'
    ]
  },
  {
    id: 'unbundling-rebundling-value-chain',
    name: 'UnbundlingRebundlingValueChainSkill',
    displayName: 'Value Chain Unbundling & Rebundling',
    categoryId: 'ideation',
    description: 'Identifies monolithic industry solutions, unbundles single high-affinity verticals, or bundles fragmented point solutions into unified suites.',
    tags: ['ideation', 'unbundling', 'rebundling', 'value-chain', 'business-architecture'],
    sectionName: 'Value Chain Unbundling / Rebundling',
    ruSectionName: 'Анбандлинг и ребандлинг цепочки создания ценности',
    semanticType: 'strategy_framework',
    instructions: [
      'Diagram the monolithic platform’s feature map vs user willingness-to-pay.',
      'Unbundle the core 5% superpower feature into a dedicated, hyper-specialized vertical.',
      'Design complementary rebundled integrations creating switching barriers.'
    ],
    ruInstructions: [
      'Составьте карту возможностей монолитного решения против готовности платить.',
      'Выделите (анбандлинг) ключевую 5% суперсилу в отдельный сверхузкий продукт.',
      'Спроектируйте модули для ребандлинга вокруг этой суперсилы.'
    ]
  },
  {
    id: 'zero-interface-ambient-computing',
    name: 'ZeroInterfaceAmbientComputingSkill',
    displayName: 'Zero-UI & Ambient Autonomous Interaction',
    categoryId: 'ideation',
    description: 'Generates product concepts where user interaction requires zero clicks, forms, or screens, operating purely through ambient inference.',
    tags: ['ideation', 'zero-ui', 'ambient', 'invisible-computing', 'proactive'],
    sectionName: 'Zero-UI Ambient Ideation',
    ruSectionName: 'Генерация Zero-UI и фоновых взаимодействий',
    semanticType: 'process_directive',
    instructions: [
      'Eliminate every button, dropdown, and form input from the workflow.',
      'Replace manual inputs with contextual triggers (temporal, sensory, behavioral, predictive).',
      'Define non-intrusive ambient confirmation and fail-safe recovery patterns.'
    ],
    ruInstructions: [
      'Устраните все кнопки, поля ввода и экраны из привычного пользовательского пути.',
      'Замените ручной ввод контекстными триггерами (время, сенсоры, поведение, предикты).',
      'Опишите ненавязчивые способы обратной связи и механизмы коррекции.'
    ]
  },
  {
    id: 'extreme-user-persona-stress-testing',
    name: 'ExtremeUserPersonaStressTestingSkill',
    displayName: 'Extreme User Constraints Ideation',
    categoryId: 'ideation',
    description: 'Derives universal innovations by designing exclusively for extreme boundary users (zero vision, 1000 tasks/hr, harsh environments).',
    tags: ['ideation', 'extreme-users', 'boundary-design', 'accessibility', 'stress-test'],
    sectionName: 'Extreme User Boundary Ideation',
    ruSectionName: 'Проектирование под экстремальных пользователей',
    semanticType: 'process_directive',
    instructions: [
      'Define extreme polar user profiles (e.g. novice with 3-second attention vs high-frequency trader with milliseconds latency).',
      'Solve the workflow strictly under extreme cognitive or physical constraints.',
      'Demonstrate how solving for extreme cases elevates the experience for mainstream users.'
    ],
    ruInstructions: [
      'Опишите полярные профили пользователей (новичок с 3-секундным фокусом vs высокочастотный трейдер).',
      'Спроектируйте решение исключительно в рамках экстремальных ограничений.',
      'Покажите, как решение экстремального кейса улучшает опыт 99% обычной аудитории.'
    ]
  },
  {
    id: 'metaphorical-interface-transposition',
    name: 'MetaphoricalInterfaceTranspositionSkill',
    displayName: 'Metaphorical Skeuomorphic & Cognitive Transposition',
    categoryId: 'ideation',
    description: 'Transposes rich real-world physical interfaces (audio mixers, air traffic control, cockpit dials) into digital workflows.',
    tags: ['ideation', 'metaphor', 'skeuomorphism', 'spatial-mental-model', 'ux-ideation'],
    sectionName: 'Metaphorical Interface Transposition',
    ruSectionName: 'Метафорический перенос интерфейсных моделей',
    semanticType: 'process_directive',
    instructions: [
      'Identify the real-world tool with the highest cognitive alignment to the problem.',
      'Map physical affordances (sliders, knobs, tactile feedback, spatial layouts) to digital state changes.',
      'Evaluate cognitive load reduction achieved via familiar mental models.'
    ],
    ruInstructions: [
      'Найдите физический инструмент с максимальным сходством логики управления.',
      'Сопоставьте физические элементы (фейдеры, тумблеры, индикаторы) с цифровыми состояниями.',
      'Оцените снижение когнитивной нагрузки за счет готовых ментальных моделей.'
    ]
  },
  {
    id: 'gamified-core-loop-mechanics-ideator',
    name: 'GamifiedCoreLoopMechanicsIdeatorSkill',
    displayName: 'Game Core Loop & Octalysis Motivation Engine',
    categoryId: 'ideation',
    description: 'Injects intrinsic behavioral drivers (Epic Meaning, Empowerment, Social Influence, Scarcity) into utility workflows.',
    tags: ['ideation', 'gamification', 'octalysis', 'core-loop', 'retention'],
    sectionName: 'Gamified Behavioral Mechanics',
    ruSectionName: 'Геймифицированные поведенческие механики (Octalysis)',
    semanticType: 'strategy_framework',
    instructions: [
      'Define the primary virtuous loop (Trigger -> Action -> Variable Reward -> Investment).',
      'Apply Yu-kai Chou Octalysis drives (White Hat meaning vs Black Hat urgency).',
      'Ensure gamification amplifies genuine user mastery without superficial badge spam.'
    ],
    ruInstructions: [
      'Определите продуктовый цикл (триггер -> действие -> переменная награда -> инвестиция).',
      'Интегрируйте драйверы по модели Octalysis (смысл, автономия, дефицит, социальное признание).',
      'Убедитесь, что геймификация развивает мастерство, а не сводится к бессмысленным бейджам.'
    ]
  },
  {
    id: 'counter-intuitive-pricing-model-ideator',
    name: 'CounterIntuitivePricingModelIdeatorSkill',
    displayName: 'Counter-Intuitive & Outcome-Based Monetization',
    categoryId: 'ideation',
    description: 'Designs novel monetization models (reverse auctions, shared upside, carbon/compute offsets, pay-for-outcomes).',
    tags: ['ideation', 'monetization', 'pricing-strategy', 'outcome-based', 'business-model'],
    sectionName: 'Monetization Architecture Ideation',
    ruSectionName: 'Генерация инновационных моделей монетизации',
    semanticType: 'strategy_framework',
    instructions: [
      'Reject standard flat SaaS seat licenses.',
      'Propose 3 aligned monetization mechanisms tied directly to customer value realization (e.g. % of savings, compute credits, insurance margin).',
      'Model incentive alignment and adverse selection mitigations.'
    ],
    ruInstructions: [
      'Откажитесь от классической фиксированной подписки за пользователя.',
      'Предложите 3 модели, привязанные к реальному успеху клиента (% экономии, результат, квоты).',
      'Опишите выравнивание стимулов и защиту от недобросовестного использования.'
    ]
  },
  {
    id: 'regulatory-arbitrage-sandbox-ideator',
    name: 'RegulatoryArbitrageSandboxIdeatorSkill',
    displayName: 'Regulatory Shift & Compliance Arbitrage Ideation',
    categoryId: 'ideation',
    description: 'Identifies emerging global regulatory mandates (AI Act, GDPR, CSRD, Basel IV) as foundational business opportunities.',
    tags: ['ideation', 'regulatory-arbitrage', 'compliance', 'legaltech', 'policy-shift'],
    sectionName: 'Regulatory Shift Innovation Mapping',
    ruSectionName: 'Инновации на регуляторных сдвигах и комплаенсе',
    semanticType: 'strategy_framework',
    instructions: [
      'Pinpoint an incoming compliance obligation that creates operational friction.',
      'Turn the compliance burden into an automated competitive asset.',
      'Architect the product to turn mandatory reporting into revenue growth.'
    ],
    ruInstructions: [
      'Выявите вступающие в силу регуляторные требования, создающие проблемы рынку.',
      'Превратите необходимость комплаенса в автоматизированное конкурентное преимущество.',
      'Сделайте обязательную отчетность источником операционной оптимизации для клиента.'
    ]
  },
  {
    id: 'asymmetric-collaboration-topology',
    name: 'AsymmetricCollaborationTopologySkill',
    displayName: 'Asymmetric Multi-Player Collaboration Topologies',
    categoryId: 'ideation',
    description: 'Ideates collaboration workflows with unbalanced roles (Director vs Worker, Client vs Agency, Expert vs Crowd).',
    tags: ['ideation', 'collaboration', 'multiplayer', 'asymmetric', 'workflow'],
    sectionName: 'Asymmetric Collaboration Topology',
    ruSectionName: 'Асимметричные многопользовательские топологии',
    semanticType: 'process_directive',
    instructions: [
      'Map distinct stakeholder authority, visibility, and latency requirements.',
      'Design tailored views and permissions that remove coordination overhead.',
      'Introduce asynchronous approvals, escrow checkpoints, and real-time co-authoring.'
    ],
    ruInstructions: [
      'Опишите роли с разными правами, уровнем видимости и временем отклика.',
      'Спроектируйте специализированные интерфейсы для каждой роли без лишнего шума.',
      'Внедрите асинхронные согласования, контрольные точки и совместное редактирование.'
    ]
  },
  {
    id: 'future-back-scenario-forecasting',
    name: 'FutureBackScenarioForecastingSkill',
    displayName: 'Future-Back Horizon & Sci-Fi Backcasting',
    categoryId: 'ideation',
    description: 'Plants a flag 10 years into an extreme future scenario, working backward step-by-step to identify the immediate missing links.',
    tags: ['ideation', 'future-back', 'backcasting', 'foresight', 'strategic-planning'],
    sectionName: 'Future-Back Strategic Backcasting',
    ruSectionName: 'Стратегический бэккастинг из будущего (Future-Back)',
    semanticType: 'strategy_framework',
    instructions: [
      'Describe a future state where key current constraints are completely eradicated.',
      'Identify what foundational primitives, protocols, and developer tools must precede this future.',
      'Derive the MVP that can be built today as the foundational wedge.'
    ],
    ruInstructions: [
      'Опишите целевое будущее через 10 лет, где текущие барьеры полностью сняты.',
      'Определите примитивы, стандарты и протоколы, которые должны возникнуть первыми.',
      'Сформулируйте первый шаг и MVP, который можно создавать уже сегодня.'
    ]
  },
  {
    id: 'crowdsourced-data-flywheel-designer',
    name: 'CrowdsourcedDataFlywheelDesignerSkill',
    displayName: 'Crowdsourced Data Flywheel & UGC Network Effects',
    categoryId: 'ideation',
    description: 'Engineers self-reinforcing data loops where every user interaction refines models and creates compounding moat value.',
    tags: ['ideation', 'data-flywheel', 'network-effects', 'ugc', 'moat'],
    sectionName: 'Data Flywheel Architecture',
    ruSectionName: 'Архитектура данных маховика (Data Flywheel)',
    semanticType: 'strategy_framework',
    instructions: [
      'Identify valuable side-effect data generated during organic user workflows.',
      'Design mechanisms to automatically clean, label, and aggregate this data.',
      'Feed aggregated intelligence back into the product to deliver 10x personalization.'
    ],
    ruInstructions: [
      'Определите ценные побочные данные, возникающие при обычной работе пользователя.',
      'Спроектируйте алгоритм автоматической очистки, разметки и агрегации этих данных.',
      'Верните агрегированную пользу в продукт для улучшения точности и персонализации.'
    ]
  },
  {
    id: 'waste-to-resource-byproduct-monetization',
    name: 'WasteToResourceByproductMonetizationSkill',
    displayName: 'Byproduct & Exhaust Data Monetization',
    categoryId: 'ideation',
    description: 'Identifies hidden operational exhaust (telemetry, idle compute, logistics margins) and repurposes it as a prime B2B offering.',
    tags: ['ideation', 'byproduct', 'circular-economy', 'exhaust-data', 'monetization'],
    sectionName: 'Byproduct Resource Monetization',
    ruSectionName: 'Монетизация побочных продуктов и цифрового следа',
    semanticType: 'strategy_framework',
    instructions: [
      'Audit internal exhaust data, idle capacity, and operational waste.',
      'Identify external industries where this exhaust represents high-value primary intelligence.',
      'Package raw exhaust into clean APIs or benchmark indices.'
    ],
    ruInstructions: [
      'Проведите аудит побочных данных, простаивающих ресурсов и инфраструктурного следа.',
      'Найдите смежные рынки, для которых эти данные представляют стратегическую ценность.',
      'Упакуйте побочные данные в чистые API или аналитические индексы.'
    ]
  },
  {
    id: 'plug-and-play-ecosystem-composable-ideator',
    name: 'PlugAndPlayEcosystemComposableIdeatorSkill',
    displayName: 'Composable Ecosystem & Marketplace Primitives',
    categoryId: 'ideation',
    description: 'Transforms standalone software into an extensible platform featuring third-party plugins, revenue sharing, and open schemas.',
    tags: ['ideation', 'platform-ecosystem', 'composability', 'marketplace', 'api-economy'],
    sectionName: 'Composable Ecosystem Primitives',
    ruSectionName: 'Примитивы компонуемой экосистемы и маркетплейса',
    semanticType: 'strategy_framework',
    instructions: [
      'Define core unopinionated primitives and extension hook points.',
      'Design the developer experience, sandbox SDK, and revenue-sharing logic for third-party builders.',
      'Plan curation and verification mechanisms to maintain high ecosystem quality.'
    ],
    ruInstructions: [
      'Определите базовые расширяемые примитивы и точки подключения хуков.',
      'Спроектируйте DX, SDK песочницы и систему разделения выручки для разработчиков.',
      'Опишите механизмы верификации и каталогизации для контроля качества экосистемы.'
    ]
  }
];

module.exports = { newIdeationSkills };
