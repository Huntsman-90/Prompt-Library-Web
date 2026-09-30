const newMiscellaneousSkills = [
  {
    id: 'gtd-getting-things-done-inbox-zero',
    name: 'GtdGettingThingsDoneInboxZeroSkill',
    displayName: 'Getting Things Done (GTD) & Inbox Zero Processing',
    categoryId: 'miscellaneous',
    description: 'Implements David Allen’s 5-step workflow: Capture, Clarify (2-minute rule), Organize, Reflect, and Engage.',
    tags: ['miscellaneous', 'productivity', 'gtd', 'inbox-zero', 'workflow'],
    sectionName: 'GTD Workflow & Triage Protocol',
    ruSectionName: 'Протокол обработки задач по системе GTD и Inbox Zero',
    semanticType: 'process_directive',
    instructions: [
      'Capture: Route every inbound task or thought into an unfiltered Inbox.',
      'Clarify: If it takes < 2 minutes, do it immediately; otherwise Delegate, Defer (Next Action), or Delete.',
      'Organize: Categorize into Projects, Next Actions by Context, Waiting For, and Someday/Maybe.'
    ],
    ruInstructions: [
      'Capture: Зафиксируйте входящие мысли и задачи в единый буфер Inbox.',
      'Clarify: Если действие занимает < 2 минут — сделайте сразу; иначе делегируйте или запланируйте.',
      'Organize: Разнесите по спискам Проекты, Следующие действия, Ожидание и Когда-нибудь.'
    ]
  },
  {
    id: 'negotiation-getting-to-yes-batna',
    name: 'NegotiationGettingToYesBatnaSkill',
    displayName: 'Principled Negotiation (BATNA, ZOPA & Harvard Method)',
    categoryId: 'miscellaneous',
    description: 'Prepares for high-stakes negotiation by identifying Best Alternative to a Negotiated Agreement (BATNA) and Zone of Possible Agreement (ZOPA).',
    tags: ['miscellaneous', 'negotiation', 'batna', 'zopa', 'harvard-negotiation'],
    sectionName: 'Principled Negotiation Architecture',
    ruSectionName: 'Гарвардская методология переговоров (BATNA и ZOPA)',
    semanticType: 'strategy_framework',
    instructions: [
      'Identify and strengthen your walk-away alternative (BATNA) prior to discussions.',
      'Separate the people from the problem; focus on underlying interests rather than fixed positions.',
      'Map the ZOPA and invent creative multi-issue trade-offs for mutual gain.'
    ],
    ruInstructions: [
      'Определите и укрепите наилучшую альтернативу переговорам (BATNA) до встречи.',
      'Отделите человека от проблемы; исследуйте глубинные интересы вместо жестких позиций.',
      'Определите зону возможного соглашения (ZOPA) и предложите варианты взаимного выигрыша.'
    ]
  },
  {
    id: 'feynman-mental-model-interdisciplinary-latticework',
    name: 'FeynmanMentalModelInterdisciplinaryLatticeworkSkill',
    displayName: 'Munger Latticework of Mental Models',
    categoryId: 'miscellaneous',
    description: 'Synthesizes decision making across core models from Physics (Entropy), Biology (Evolution), Psychology (Incentives), and Math (Compounding).',
    tags: ['miscellaneous', 'mental-models', 'charlie-munger', 'multidisciplinary', 'thinking'],
    sectionName: 'Latticework of Mental Models Protocol',
    ruSectionName: 'Решетка ментальных моделей Чарли Мангера',
    semanticType: 'reasoning_protocol',
    instructions: [
      'Examine the dilemma through 4 fundamental disciplinary lenses (Physics, Biology, Microeconomics, Psychology).',
      'Check for Lollapalooza effects where multiple behavioral tendencies act in the same direction.',
      'Synthesize holistic conclusions rather than relying on narrow single-domain tools.'
    ],
    ruInstructions: [
      'Рассмотрите ситуацию через призму 4 дисциплин (физика, биология, микроэкономика, психология).',
      'Проверьте наличие кумулятивного эффекта (Lollapalooza), когда несколько факторов усиливают друг друга.',
      'Сформулируйте взвешенное решение без уклона в узкоспециализированные догмы.'
    ]
  },
  {
    id: 'stoic-dichotomy-of-control-reframing',
    name: 'StoicDichotomyOfControlReframingSkill',
    displayName: 'Stoic Dichotomy of Control & Cognitive Reframing',
    categoryId: 'miscellaneous',
    description: 'Separates variables into things strictly within internal control vs external uncontrollables to eliminate reactive anxiety.',
    tags: ['miscellaneous', 'stoicism', 'mindset', 'reframing', 'resilience'],
    sectionName: 'Stoic Dichotomy of Control Protocol',
    ruSectionName: 'Стоическая дихотомия контроля и когнитивный рефрейминг',
    semanticType: 'process_directive',
    instructions: [
      'Categorize all situational inputs: Internal (Effort, Values, Reactions) vs External (Outcomes, Others’ Opinions, Market Conditions).',
      'Detain attachment from external outcomes; focus 100% of cognitive energy on internal execution.',
      'Formulate positive reframings embracing obstacles as the path forward (Amor Fati).'
    ],
    ruInstructions: [
      'Разделите факторы на внутренние (усилия, реакции) и внешние (рынок, поведение других людей).',
      'Снимите эмоциональную фиксацию с внешних результатов; направьте всю энергию на качество действий.',
      'Преобразуйте возникшие препятствия в точку роста и новый опыт.'
    ]
  },
  {
    id: 'kanban-personal-wip-limit-system',
    name: 'KanbanPersonalWipLimitSystemSkill',
    displayName: 'Personal Kanban & Work-in-Progress (WIP) Caps',
    categoryId: 'miscellaneous',
    description: 'Limits active concurrent tasks to a strict maximum of 3 (WIP = 3) to eliminate multitasking switching costs and maximize flow throughput.',
    tags: ['miscellaneous', 'kanban', 'wip-limits', 'focus', 'productivity'],
    sectionName: 'Personal Kanban Protocol',
    ruSectionName: 'Персональный канбан и ограничение незавершенной работы (WIP Caps)',
    semanticType: 'process_directive',
    instructions: [
      'Maintain visual columns: Backlog, Ready, Doing (Max 3), Done.',
      'Enforce strict rule: No new card moves into "Doing" until an existing card moves to "Done".',
      'Track cycle time and identify recurrent blockage patterns.'
    ],
    ruInstructions: [
      'Ведите наглядную доску: Бэклог, Готово к работе, В работе (макс. 3), Сделано.',
      'Соблюдайте жесткое правило: новая задача не берется в работу, пока не завершена текущая.',
      'Измеряйте время выполнения задач и устраняйте регулярные задержки.'
    ]
  },
  {
    id: 'habit-loop-atomic-cue-craving-response-reward',
    name: 'HabitLoopAtomicCueCravingResponseRewardSkill',
    displayName: 'James Clear Atomic Habit Loop Architecture',
    categoryId: 'miscellaneous',
    description: 'Architects sustainable behavior change using the 4 Laws: Make it Obvious (Cue), Attractive (Craving), Easy (Response), Satisfying (Reward).',
    tags: ['miscellaneous', 'habits', 'atomic-habits', 'james-clear', 'behavior-design'],
    sectionName: 'Atomic Habit Loop Architecture',
    ruSectionName: 'Архитектура привычек по Джеймсу Клиру (4 закона изменения поведения)',
    semanticType: 'process_directive',
    instructions: [
      'Make it Obvious: Habit stack onto existing routines ("After [Current Habit], I will [New Habit]").',
      'Make it Easy: Reduce the initial friction to under 2 minutes (Two-Minute Rule).',
      'Make it Satisfying: Implement immediate visual tracking and streak reinforcement.'
    ],
    ruInstructions: [
      'Сделайте очевидным: привяжите новую привычку к существующей цепочке действий.',
      'Сделайте простым: уменьшите стартовое усилие до правила двух минут.',
      'Сделайте приятным: внедрите мгновенное визуальное подкрепление и трекинг серий.'
    ]
  },
  {
    id: 'sleep-hygiene-circadian-rhythm-optimization',
    name: 'SleepHygieneCircadianRhythmOptimizationSkill',
    displayName: 'Circadian Rhythm & Sleep Architecture Optimization',
    categoryId: 'miscellaneous',
    description: 'Applies Huberman/Walker neurobiology protocols (morning sunlight, temperature drops, caffeine half-life cutoffs) to maximize slow-wave and REM sleep.',
    tags: ['miscellaneous', 'health', 'sleep', 'circadian-rhythm', 'biohacking'],
    sectionName: 'Circadian Rhythm Protocol',
    ruSectionName: 'Оптимизация циркадных ритмов и архитектуры сна',
    semanticType: 'process_directive',
    instructions: [
      'View natural outdoor sunlight within 30-60 minutes of waking.',
      'Establish a strict 10-hour caffeine cutoff before target bedtime (metabolic clearance).',
      'Optimize sleep environment: pitch dark, cool room temperature (18°C / 65°F), zero screens 60m prior.'
    ],
    ruInstructions: [
      'Получите естественный дневной свет в первые 30-60 минут после пробуждения.',
      'Прекратите употребление кофеина за 10 часов до планируемого отхода ко сну.',
      'Обеспечьте прохладную температуру в спальне (~18°C) и полный блэкаут.'
    ]
  },
  {
    id: 'cold-email-sales-outreach-four-sentence',
    name: 'ColdEmailSalesOutreachFourSentenceSkill',
    displayName: 'High-Response 4-Sentence Cold Email Framework',
    categoryId: 'miscellaneous',
    description: 'Drafts punchy, hyper-relevant B2B cold emails under 75 words with an interest-based Call-to-Action.',
    tags: ['miscellaneous', 'cold-email', 'sales', 'outreach', 'copywriting'],
    sectionName: '4-Sentence Cold Outreach Protocol',
    ruSectionName: '4-строчный фреймворк холодных B2B email-рассылок',
    semanticType: 'process_directive',
    instructions: [
      'Sentence 1: Hyper-personalized observation showing real homework on their company.',
      'Sentence 2-3: State the acute problem you solve and one quantifiable result achieved for a peer.',
      'Sentence 4: Low-friction interest CTA (e.g. "Open to exploring how this would work for your team?").'
    ],
    ruInstructions: [
      'Предложение 1: Персонализированное наблюдение о бизнесе получателя.',
      'Предложения 2-3: Острая проблема и измеримый результат решения для похожих компаний.',
      'Предложение 4: Мягкий вопрос об интересе без агрессивного требования созвона.'
    ]
  },
  {
    id: 'decision-matrix-weighted-pugh-scoring',
    name: 'DecisionMatrixWeightedPughScoringSkill',
    displayName: 'Pugh Decision Matrix & Weighted Scoring Model',
    categoryId: 'miscellaneous',
    description: 'Evaluates multi-option strategic decisions across weighted evaluation criteria to eliminate emotional confirmation bias.',
    tags: ['miscellaneous', 'decision-making', 'pugh-matrix', 'weighted-scoring', 'strategy'],
    sectionName: 'Weighted Decision Matrix Protocol',
    ruSectionName: 'Взвешенная матрица принятия решений (матрица Пью)',
    semanticType: 'analysis_protocol',
    instructions: [
      'List 5-8 non-overlapping criteria and assign relative weights summing to 100%.',
      'Score each candidate option on a 1-5 or 1-10 scale per criterion.',
      'Calculate weighted composite scores and run sensitivity tests on top criteria weights.'
    ],
    ruInstructions: [
      'Сформулируйте 5-8 критериев и распределите веса с суммой 100%.',
      'Оцените каждый вариант по каждому критерию по шкале от 1 до 10.',
      'Рассчитайте итоговые баллы и проверьте устойчивость результата при изменении весов.'
    ]
  },
  {
    id: 'pre-mortem-gary-klein-failure-simulation',
    name: 'PreMortemGaryKleinFailureSimulationSkill',
    displayName: 'Gary Klein Pre-Mortem Prospective Hindsight',
    categoryId: 'miscellaneous',
    description: 'Simulates a total project disaster 1 year into the future, uncovering hidden team concerns, blind spots, and proactive mitigations.',
    tags: ['miscellaneous', 'pre-mortem', 'risk-management', 'gary-klein', 'project-management'],
    sectionName: 'Prospective Hindsight Pre-Mortem Protocol',
    ruSectionName: 'Протокол пре-мортем анализа рисков (метод ретроспективы неудач)',
    semanticType: 'process_directive',
    instructions: [
      'Set the premise: "It is 12 months from today, and this initiative has suffered a total, embarrassing catastrophe."',
      'Independently generate all possible underlying causes that contributed to the collapse.',
      'Consolidate failure vectors and assign proactive preventative owners to each item.'
    ],
    ruInstructions: [
      'Сформулируйте вводную: "Прошел 1 год, и наш проект с треском и катастрофой провалился".',
      'Соберите все скрытые опасения и возможные причины гибели инициативы.',
      'Сгруппируйте риски и назначьте превентивные меры до старта проекта.'
    ]
  },
  {
    id: 'conflict-resolution-nonviolent-communication-nvc',
    name: 'ConflictResolutionNonviolentCommunicationNvcSkill',
    displayName: 'Nonviolent Communication (NVC) by Marshall Rosenberg',
    categoryId: 'miscellaneous',
    description: 'Navigates interpersonal conflicts using 4 components: Observation (without judgment), Feelings, Universal Needs, and Concrete Requests.',
    tags: ['miscellaneous', 'communication', 'nvc', 'conflict-resolution', 'empathy'],
    sectionName: 'Nonviolent Communication (NVC) Protocol',
    ruSectionName: 'Протокол ненасильственного общения (ННО Розенберга)',
    semanticType: 'process_directive',
    instructions: [
      'Observation: State factual, objective actions without interpretive evaluation or blame.',
      'Feelings: Express vulnerable internal emotions rather than disguised accusations ("I feel ignored").',
      'Needs & Requests: Connect feelings to unmet universal human needs and issue clear, actionable requests.'
    ],
    ruInstructions: [
      'Наблюдение: Опишите факты без оценочных суждений и обвинений.',
      'Чувства: Назовите свои истинные эмоции вместо скрытых претензий.',
      'Потребности и Просьба: Свяжите эмоцию с потребностью и озвучьте конкретную выполнимую просьбу.'
    ]
  },
  {
    id: 'public-speaking-ted-talk-story-arc',
    name: 'PublicSpeakingTedTalkStoryArcSkill',
    displayName: 'TED Talk 18-Minute Narrative Arc Architecture',
    categoryId: 'miscellaneous',
    description: 'Structures keynote presentations: The Common Ground, The Destabilizing Idea, The Valley of Obstacles, The Revelation, and The Call to Action.',
    tags: ['miscellaneous', 'public-speaking', 'ted-talk', 'storytelling', 'presentations'],
    sectionName: 'TED Keynote Narrative Arc',
    ruSectionName: 'Сюжетная структура 18-минутного выступления в стиле TED',
    semanticType: 'process_directive',
    instructions: [
      'Minutes 0-3: Establish relatable baseline and plant one bold, provocative central premise ("Throughline").',
      'Minutes 3-12: Share vulnerability, experiments, failures, and evidentiary proof points.',
      'Minutes 12-18: Deliver the inspiring synthesis, leaving the audience with an actionable vision for change.'
    ],
    ruInstructions: [
      '0-3 мин: Найдите общую точку соприкосновения с залом и озвучьте главную провокационную идею.',
      '3-12 мин: Расскажите историю преодоления, ошибки, эксперименты и факты.',
      '12-18 мин: Сделайте воодушевляющий вывод и завершите речь призывом к действию.'
    ]
  },
  {
    id: 'speed-reading-comprehension-retention-inspection',
    name: 'SpeedReadingComprehensionRetentionInspectionSkill',
    displayName: 'Adler Syntopical & Inspectional Reading Protocol',
    categoryId: 'miscellaneous',
    description: 'Applies Mortimer Adler’s "How to Read a Book" framework across Elementary, Inspectional, Analytical, and Syntopical reading tiers.',
    tags: ['miscellaneous', 'reading', 'syntopical', 'learning', 'comprehension'],
    sectionName: 'Inspectional & Syntopical Reading Protocol',
    ruSectionName: 'Протокол инспекционного и синтопического чтения (Мортимер Адлер)',
    semanticType: 'process_directive',
    instructions: [
      'Inspectional: Skim title, preface, table of contents, and conclusion chapters in 15 minutes to build the mental scaffolding.',
      'Analytical: State the book’s central argument in 2 sentences; identify the author’s primary propositions.',
      'Syntopical: Cross-reference 3+ books on the same topic to construct a neutral dialectical landscape.'
    ],
    ruInstructions: [
      'Инспекционное чтение: Изучите оглавление, введение и выводы глав за 15 минут для понимания скелета.',
      'Аналитическое чтение: Сформулируйте тезис книги в 2 предложениях и выделите аргументы автора.',
      'Синтопическое чтение: Сопоставьте позиции 3+ авторов по одной теме для объективной картины.'
    ]
  },
  {
    id: 'deep-work-cal-newport-distraction-blocker',
    name: 'DeepWorkCalNewportDistractionBlockerSkill',
    displayName: 'Cal Newport Deep Work & Attention Residue Elimination',
    categoryId: 'miscellaneous',
    description: 'Structures 90-120 minute uninterrupted deep work blocks while eliminating cognitive switching costs and attention residue.',
    tags: ['miscellaneous', 'deep-work', 'focus', 'cal-newport', 'productivity'],
    sectionName: 'Deep Work Block Protocol',
    ruSectionName: 'Протокол глубокой работы (Deep Work) и устранения остаточного внимания',
    semanticType: 'process_directive',
    instructions: [
      'Schedule discrete 90-minute blocks with strict zero-connectivity modes (no notifications or messaging apps).',
      'Define a single unambiguous objective before entering the block.',
      'Perform a formal shutdown ritual at the end of the workday to disconnect cognitive loops.'
    ],
    ruInstructions: [
      'Выделите 90-минутные блоки с полным отключением мессенджеров и уведомлений.',
      'Сформулируйте одну измеримую цель до входа в блок глубокой концентрации.',
      'Выполните ритуал завершения рабочего дня для разгрузки рабочей памяти.'
    ]
  },
  {
    id: 'crisis-first-aid-cpr-aed-resuscitation',
    name: 'CrisisFirstAidCprAedResuscitationSkill',
    displayName: 'Bystander CPR, AED & Choking Emergency Protocol',
    categoryId: 'miscellaneous',
    description: 'Provides standardized emergency guidelines for bystander Hands-Only CPR (100-120 bpm), AED pad placement, and Heimlich maneuver.',
    tags: ['miscellaneous', 'first-aid', 'cpr', 'aed', 'emergency-response'],
    sectionName: 'Bystander Emergency Resuscitation Protocol',
    ruSectionName: 'Протокол первой помощи (СЛР, дефибриллятор АНД, прием Геймлиха)',
    semanticType: 'process_directive',
    instructions: [
      'Check scene safety, assess responsiveness, and explicitly direct a specific person to call emergency services and retrieve an AED.',
      'Begin Hands-Only CPR: Push hard and fast in the center of the chest at 100-120 compressions per minute (depth: 2 inches / 5 cm).',
      'Attach AED immediately upon arrival; follow spoken voice prompts and ensure everyone is clear before shock.'
    ],
    ruInstructions: [
      'Убедитесь в безопасности, проверьте реакцию и назначьте конкретного человека вызвать скорую и принести дефибриллятор.',
      'Начните компрессии грудной клетки: 100-120 нажатий в минуту на глубину 5 см.',
      'Подключите АНД при доставке; следуйте голосовым инструкциям и следите, чтобы никто не касался пострадавшего при разряде.'
    ]
  },
  {
    id: 'travel-itinerary-frictionless-logistics-planner',
    name: 'TravelItineraryFrictionlessLogisticsPlannerSkill',
    displayName: 'Frictionless Travel Logistics & Geographic Batching',
    categoryId: 'miscellaneous',
    description: 'Plans multi-day travel itineraries optimized by geographic neighborhood clustering, transit buffer times, and reservation booking windows.',
    tags: ['miscellaneous', 'travel', 'logistics', 'itinerary-planning', 'organization'],
    sectionName: 'Travel Itinerary Logistics Architecture',
    ruSectionName: 'Планирование путешествий и логистическая кластеризация маршрутов',
    semanticType: 'process_directive',
    instructions: [
      'Cluster activities and dining strictly by geographic neighborhood to eliminate zig-zag transit waste.',
      'Insert realistic 45-60 minute transit and rest buffers between major excursions.',
      'Generate a consolidated single-pane-of-glass timeline with confirmation numbers and offline maps.'
    ],
    ruInstructions: [
      'Группируйте достопримечательности и рестораны строго по районам во избежание лишних переездов.',
      'Закладывайте буфер 45-60 минут на дорогу и отдых между ключевыми точками.',
      'Сформируйте единый таймлайн со всеми номерами броней и ссылками на оффлайн-карты.'
    ]
  },
  {
    id: 'gardening-companion-planting-permaculture',
    name: 'GardeningCompanionPlantingPermacultureSkill',
    displayName: 'Companion Planting & Permaculture Guild Design',
    categoryId: 'miscellaneous',
    description: 'Designs synergistic organic garden guilds (Three Sisters, aromatic pest repellents, dynamic nutrient accumulators) and soil health regimes.',
    tags: ['miscellaneous', 'gardening', 'permaculture', 'companion-planting', 'agriculture'],
    sectionName: 'Permaculture Guild & Planting Protocol',
    ruSectionName: 'Пермакультурный дизайн и синергия совместных посадок (Companion Planting)',
    semanticType: 'strategy_framework',
    instructions: [
      'Pair symbiotic plant species (e.g. Corn for structure, Beans for nitrogen fixation, Squash for living mulch).',
      'Integrate aromatic pest repellents (marigolds, basil, mint) around vulnerable crops.',
      'Design soil composting and organic mulch coverage routines to retain moisture.'
    ],
    ruInstructions: [
      'Сочетайте симбиотические культуры (кукуруза как опора, фасоль для фиксации азота, тыква для защиты почвы).',
      'Высаживайте пряные травы и цветы (бархатцы, базилик) для естественного отпугивания вредителей.',
      'Организуйте мульчирование и компостирование для сохранения влаги и плодородия почвы.'
    ]
  },
  {
    id: 'personal-finance-bogleheads-three-fund-portfolio',
    name: 'PersonalFinanceBogleheadsThreeFundPortfolioSkill',
    displayName: 'Bogleheads 3-Fund Index Portfolio & Asset Allocation',
    categoryId: 'miscellaneous',
    description: 'Implements Jack Bogle’s low-cost passive index investing philosophy: Total US Market, Total International Market, and Total Bond Market.',
    tags: ['miscellaneous', 'finance', 'investing', 'bogleheads', 'index-funds'],
    sectionName: 'Bogleheads 3-Fund Portfolio Protocol',
    ruSectionName: 'Портфельные инвестиции по системе Джона Богла (3-Fund Portfolio)',
    semanticType: 'strategy_framework',
    instructions: [
      'Define target asset allocation based on risk tolerance and investment horizon (e.g. 70% Equities / 30% Bonds).',
      'Select low-expense-ratio broad market index funds (Total US, Total Ex-US, Total Bond).',
      'Establish annual rebalancing thresholds (e.g. 5/25 rule) to maintain target weights without market timing.'
    ],
    ruInstructions: [
      'Определите пропорцию активов исходя из горизонта и терпимости к риску (например, 70% акции / 30% облигации).',
      'Выберите биржевые фонды широкого рынка с минимальной комиссией.',
      'Настройте ежегодную ребалансировку портфеля по правилу отклонения весов без попыток угадать рынок.'
    ]
  },
  {
    id: 'diy-home-maintenance-seasonal-checklist',
    name: 'DiyHomeMaintenanceSeasonalChecklistSkill',
    displayName: 'Quarterly Preventative Home Maintenance Checklist',
    categoryId: 'miscellaneous',
    description: 'Schedules essential preventative home infrastructure checks: HVAC filter swaps, gutter clearing, water heater flushes, and foundation inspections.',
    tags: ['miscellaneous', 'home-maintenance', 'diy', 'preventative', 'checklists'],
    sectionName: 'Quarterly Home Maintenance Protocol',
    ruSectionName: 'Сезонный чек-лист профилактического обслуживания дома',
    semanticType: 'process_directive',
    instructions: [
      'Spring: Inspect roof shingles, clean gutters, test sump pump, and service AC condensers.',
      'Fall: Flush sediment from water heater, insulate exposed pipes, replace furnace filters, inspect chimney.',
      'Document warranty dates and local service technician contact numbers.'
    ],
    ruInstructions: [
      'Весна: Осмотр кровли, прочистка водостоков, проверка кондиционеров и дренажных насосов.',
      'Осень: Промывка водонагревателя от накипи, утепление уличных труб, замена фильтров отопления.',
      'Ведите журнал обслуживания с датами гарантий и контактами проверенных мастеров.'
    ]
  },
  {
    id: 'culinary-flavor-pairing-flavor-bible-matrix',
    name: 'CulinaryFlavorPairingFlavorBibleMatrixSkill',
    displayName: 'Culinary Flavor Balancing & Taste Balancing Matrix',
    categoryId: 'miscellaneous',
    description: 'Diagnoses and rectifies flat dishes by balancing the 5 fundamental tastes (Sweet, Salty, Sour, Bitter, Umami) plus heat and fat textures.',
    tags: ['miscellaneous', 'culinary', 'cooking', 'flavor-pairing', 'taste-balancing'],
    sectionName: 'Culinary Flavor Balancing Matrix',
    ruSectionName: 'Матрица балансировки вкусов и сочетаемости ингредиентов (The Flavor Bible)',
    semanticType: 'process_directive',
    instructions: [
      'Diagnose imbalance: Too salty? Add acid (lemon/vinegar) or starch. Too sweet? Add acid or bitter notes. Too heavy/fatty? Add acidity or herbs.',
      'Incorporate Umami depth (aged cheese, mushrooms, fermented paste, anchovy) to round out savory foundations.',
      'Pair primary ingredients using complementary aromatic affinities.'
    ],
    ruInstructions: [
      'Исправьте баланс: Слишком солено? Добавьте кислоту (лимон/уксус) или крахмал. Слишком жирно? Добавьте кислоту и свежие травы.',
      'Усильте глубину умами (выдержанный сыр, грибы, ферментированные соусы).',
      'Подберите гармоничные вкусовые пары на основе ароматических соединений продуктов.'
    ]
  }
];

module.exports = { newMiscellaneousSkills };
