const newEducationSkills = [
  {
    id: 'blooms-taxonomy-cognitive-depth-ladder',
    name: 'BloomsTaxonomyCognitiveDepthLadderSkill',
    displayName: 'Bloom’s Revised Taxonomy Cognitive Ladder',
    categoryId: 'education',
    description: 'Structures progressive curricula spanning Remember, Understand, Apply, Analyze, Evaluate, and Create.',
    tags: ['education', 'blooms-taxonomy', 'curriculum-design', 'pedagogy', 'assessment'],
    sectionName: 'Bloom’s Taxonomy Learning Progression',
    ruSectionName: 'Прогрессия глубины обучения по таксономии Блума',
    semanticType: 'process_directive',
    instructions: [
      'Structure material starting from foundational recall and conceptual understanding.',
      'Progress to application drills and analytical trade-off breakdowns.',
      'Conclude with open-ended evaluation and synthesis/creation projects.'
    ],
    ruInstructions: [
      'Выстройте материал от базового запоминания к глубинному пониманию.',
      'Переходите к практическому применению и анализу компромиссов.',
      'Завершите обучение задачами на критическую оценку и создание собственных решений.'
    ]
  },
  {
    id: 'spaced-repetition-supermemo-sm2-scheduler',
    name: 'SpacedRepetitionSupermemoSm2SchedulerSkill',
    displayName: 'Spaced Repetition & SuperMemo SM-2 Scheduling',
    categoryId: 'education',
    description: 'Calculates optimal review intervals based on user recall quality scores (0-5) and item difficulty factors (EF).',
    tags: ['education', 'spaced-repetition', 'sm2', 'flashcards', 'memory'],
    sectionName: 'Spaced Repetition (SM-2) Scheduling Protocol',
    ruSectionName: 'Протокол интервальных повторений (SuperMemo SM-2)',
    semanticType: 'process_directive',
    instructions: [
      'Evaluate response recall grade Q from 0 (complete blackout) to 5 (perfect recall).',
      'Update Easiness Factor: EF’ = EF + (0.1 - (5-Q)*(0.08 + (5-Q)*0.02)).',
      'Calculate next review interval I(n) in days and output scheduled flashcard queue.'
    ],
    ruInstructions: [
      'Оцените качество ответа от 0 (полное забывание) до 5 (мгновенное точное воспроизведение).',
      'Пересчитайте фактор легкости EF по формуле SM-2.',
      'Рассчитайте интервал следующего повторения в днях и сформируйте очередь карточек.'
    ]
  },
  {
    id: 'worked-example-cognitive-load-reduction',
    name: 'WorkedExampleCognitiveLoadReductionSkill',
    displayName: 'Worked Example Effect & Cognitive Load Optimization',
    categoryId: 'education',
    description: 'Presents fully resolved step-by-step exemplars followed by faded completion problems to prevent novice cognitive overload.',
    tags: ['education', 'worked-examples', 'cognitive-load-theory', 'sweller', 'instructional-design'],
    sectionName: 'Worked Example & Scaffolding Protocol',
    ruSectionName: 'Метод разобранных примеров и снижение когнитивной нагрузки',
    semanticType: 'process_directive',
    instructions: [
      'Present a complete step-by-step worked solution highlighting sub-goals and annotations.',
      'Provide a paired isomorphic problem with 50% steps omitted for guided completion.',
      'Conclude with an unassisted challenge to test mastery.'
    ],
    ruInstructions: [
      'Покажите полностью решенный эталонный пример с пояснением каждого промежуточного шага.',
      'Дайте аналогичную задачу, где 50% шагов уже решено, а остальные должен заполнить ученик.',
      'Закрепите навык полностью самостоятельным упражнением.'
    ]
  },
  {
    id: 'peer-instruction-mazur-concept-test',
    name: 'PeerInstructionMazurConceptTestSkill',
    displayName: 'Eric Mazur Peer Instruction & ConcepTests',
    categoryId: 'education',
    description: 'Generates qualitative multiple-choice concept tests designed to expose and dismantle common student misconceptions via peer debate.',
    tags: ['education', 'peer-instruction', 'mazur', 'concept-test', 'active-learning'],
    sectionName: 'Mazur Peer Instruction Protocol',
    ruSectionName: 'Протокол взаимного обучения и концепт-тестов Мазура',
    semanticType: 'process_directive',
    instructions: [
      'Design a conceptual question that cannot be solved by rote formula memorization.',
      'Include distractor options corresponding to predictable cognitive misconceptions.',
      'Provide peer-debate prompts guiding students to articulate and stress-test their models.'
    ],
    ruInstructions: [
      'Сформулируйте концептуальный вопрос, который нельзя решить механической подстановкой в формулу.',
      'Включите варианты ответов с типичными когнитивными ловушками и заблуждениями.',
      'Напишите вопросы для групповой дискуссии, вскрывающие ошибки в рассуждениях.'
    ]
  },
  {
    id: 'zone-of-proximal-development-calibrator',
    name: 'ZoneOfProximalDevelopmentCalibratorSkill',
    displayName: 'Vygotsky Zone of Proximal Development (ZPD)',
    categoryId: 'education',
    description: 'Calibrates task difficulty dynamically to keep the learner at the boundary between independent mastery and guided capability.',
    tags: ['education', 'zpd', 'vygotsky', 'adaptive-learning', 'scaffolding'],
    sectionName: 'ZPD Dynamic Difficulty Calibration',
    ruSectionName: 'Калибровка зоны ближайшего развития (ЗБР Выготского)',
    semanticType: 'process_directive',
    instructions: [
      'Assess baseline student autonomy on prerequisite concepts.',
      'Formulate problems situated strictly within the zone requiring targeted assistance.',
      'Provide progressive hints (faded scaffolding) rather than giving away final answers.'
    ],
    ruInstructions: [
      'Оцените текущий уровень самостоятельного владения базовыми темами.',
      'Сформулируйте задачу в зоне, требующей направляющей подсказки, но не готового ответа.',
      'Предоставляйте дозированные подсказки по запросу, постепенно убирая поддержку.'
    ]
  },
  {
    id: 'rubric-analytic-holistic-grading-designer',
    name: 'RubricAnalyticHolisticGradingDesignerSkill',
    displayName: 'Analytic & Holistic Assessment Rubric Design',
    categoryId: 'education',
    description: 'Develops clear evaluation rubrics with explicit performance criteria across Exemplary, Proficient, Developing, and Unsatisfactory levels.',
    tags: ['education', 'rubrics', 'grading', 'assessment', 'evaluation'],
    sectionName: 'Assessment Rubric Specification',
    ruSectionName: 'Спецификация аналитических и целостных рубрик оценивания',
    semanticType: 'strategy_framework',
    instructions: [
      'Define 4-6 distinct, non-overlapping performance criteria.',
      'Write observable, concrete behavioral descriptions for each achievement tier (1 to 4).',
      'Include self-assessment reflection checklists for students.'
    ],
    ruInstructions: [
      'Сформулируйте 4-6 независимых критериев оценки навыка.',
      'Опишите четкие измеримые признаки для каждого уровня (от базового до экспертного).',
      'Добавьте чек-лист для самопроверки и рефлексии учащегося.'
    ]
  },
  {
    id: 'dual-coding-multimedia-learning-principles',
    name: 'DualCodingMultimediaLearningPrinciplesSkill',
    displayName: 'Mayer’s Multimedia Learning & Dual Coding',
    categoryId: 'education',
    description: 'Structures educational content adhering to Richard Mayer’s 12 principles (Coherence, Signaling, Redundancy, Spatial Contiguity).',
    tags: ['education', 'mayer', 'dual-coding', 'multimedia-learning', 'visual-verbal'],
    sectionName: 'Dual Coding & Multimedia Learning Architecture',
    ruSectionName: 'Принципы мультимедийного обучения и двойного кодирования (Мейер)',
    semanticType: 'process_directive',
    instructions: [
      'Pair visual mental models (diagrams, flowcharts) with synchronized concise text.',
      'Eliminate seductive details and extraneous cognitive load (Coherence Principle).',
      'Position explanatory labels in close spatial contiguity to visual focal points.'
    ],
    ruInstructions: [
      'Сопоставляйте визуальные схемы и диаграммы с кратким текстовым пояснением.',
      'Удалите отвлекающие второстепенные детали для устранения посторонней нагрузки.',
      'Размещайте поясняющие подписи непосредственно рядом с элементами схемы.'
    ]
  },
  {
    id: 'inquiry-based-learning-5e-model',
    name: 'InquiryBasedLearning5eModelSkill',
    displayName: '5E Instructional Model (Engage, Explore, Explain, Elaborate, Evaluate)',
    categoryId: 'education',
    description: 'Constructs science and technology inquiry modules guiding students from curiosity to autonomous hypothesis testing and evaluation.',
    tags: ['education', '5e-model', 'inquiry-based', 'constructivism', 'lesson-plan'],
    sectionName: '5E Inquiry Instructional Sequence',
    ruSectionName: 'Последовательность исследовательского обучения (модель 5E)',
    semanticType: 'strategy_framework',
    instructions: [
      'Engage: Present an intriguing phenomenon or anomaly.',
      'Explore: Provide hands-on sandbox exploration without upfront lecturing.',
      'Explain -> Elaborate -> Evaluate: Formalize concepts, extend to novel domains, and assess deep comprehension.'
    ],
    ruInstructions: [
      'Engage: Предъявите парадокс или интригующий феномен.',
      'Explore: Дайте возможность исследовать механику в песочнице без сухой теории.',
      'Explain / Elaborate / Evaluate: Введите терминологию, перенесите на новый контекст и оцените усвоение.'
    ]
  },
  {
    id: 'case-study-harvard-method-facilitator',
    name: 'CaseStudyHarvardMethodFacilitatorSkill',
    displayName: 'Harvard Business School Case Method Facilitation',
    categoryId: 'education',
    description: 'Constructs open-ended, real-world case scenarios requiring decision under incomplete information, followed by dialectical discussion boards.',
    tags: ['education', 'case-study', 'harvard-method', 'decision-making', 'executive-education'],
    sectionName: 'Case Study Simulation Protocol',
    ruSectionName: 'Методология Гарвардских кейсов (Case Method)',
    semanticType: 'strategy_framework',
    instructions: [
      'Draft a high-stakes dilemma with conflicting stakeholder data and time urgency.',
      'Structure discussion boards forcing participants to take a definitive executive stance.',
      'Provide debrief matrices extracting transferable strategic principles.'
    ],
    ruInstructions: [
      'Составьте кейс с острым конфликтом интересов и неполными данными.',
      'Сформулируйте вопросы, заставляющие участника занять твердую управленческую позицию.',
      'Сформируйте матрицу дебрифинга с универсальными выводами для практики.'
    ]
  },
  {
    id: 'deliberate-practice-ericsson-feedback-loop',
    name: 'DeliberatePracticeEricssonFeedbackLoopSkill',
    displayName: 'Anders Ericsson Deliberate Practice & Micro-Skill Drills',
    categoryId: 'education',
    description: 'Isolates weak sub-component mechanics for repetitive, high-intensity drills with immediate corrective feedback.',
    tags: ['education', 'deliberate-practice', 'ericsson', 'mastery', 'micro-drills'],
    sectionName: 'Deliberate Practice Drill Architecture',
    ruSectionName: 'Архитектура осознанной практики (Deliberate Practice)',
    semanticType: 'process_directive',
    instructions: [
      'Deconstruct the complex skill into atomic, measurable sub-skills.',
      'Design targeted high-repetition drills operating right at the edge of failure.',
      'Provide millisecond-accurate actionable corrective feedback after each repetition.'
    ],
    ruInstructions: [
      'Декомпозируйте сложный навык на атомарные измеримые микро-навыки.',
      'Создайте серию интенсивных упражнений на пределе текущих возможностей.',
      'Предоставляйте мгновенную корректирующую обратную связь после каждого действия.'
    ]
  },
  {
    id: 'interleaving-vs-blocking-curriculum-mixer',
    name: 'InterleavingVsBlockingCurriculumMixerSkill',
    displayName: 'Interleaved Practice & Discrimination Learning',
    categoryId: 'education',
    description: 'Mixes related problem types (A, B, C, B, A, C) to force learners to select the correct solving strategy rather than relying on rote habit.',
    tags: ['education', 'interleaving', 'retention', 'curriculum-design', 'discrimination'],
    sectionName: 'Interleaved Practice Sequence',
    ruSectionName: 'Чередование тем и распознавание стратегий (Interleaving)',
    semanticType: 'process_directive',
    instructions: [
      'Reject blocked single-topic problem sets (AAAA, BBBB, CCCC).',
      'Interleave problem types requiring distinct conceptual methods in pseudo-random order.',
      'Require students to state "Why method X applies over method Y" before executing calculations.'
    ],
    ruInstructions: [
      'Откажитесь от блочных однотипных серий задач подряд.',
      'Чередуйте задачи разного типа вперемешку, требуя выбора правильного метода.',
      'Попросите учащегося обосновать выбор формулы до начала вычислений.'
    ]
  },
  {
    id: 'mastery-learning-bloom-two-sigma-system',
    name: 'MasteryLearningBloomTwoSigmaSystemSkill',
    displayName: 'Bloom’s 2-Sigma Mastery Learning Architecture',
    categoryId: 'education',
    description: 'Enforces 90%+ diagnostic mastery prerequisites before unlocking advanced module tiers, paired with personalized corrective tutoring.',
    tags: ['education', 'mastery-learning', '2-sigma', 'personalized-tutoring', 'competency'],
    sectionName: 'Mastery Learning System Protocol',
    ruSectionName: 'Система обучения до полного усвоения (Mastery Learning 2-Sigma)',
    semanticType: 'strategy_framework',
    instructions: [
      'Administer formative diagnostic quizzes after every learning unit.',
      'Require >=90% mastery to progress; direct students scoring <90% to alternative modalities.',
      'Track cumulative mastery dashboards demonstrating progression.'
    ],
    ruInstructions: [
      'Проводите формирующее диагностическое тестирование после каждого модуля.',
      'Установите порог 90% для перехода дальше; при меньшем балле направляйте на альтернативные объяснения.',
      'Ведите наглядный дашборд освоенных компетенций.'
    ]
  },
  {
    id: 'flipped-classroom-asynchronous-prep-live-sync',
    name: 'FlippedClassroomAsynchronousPrepLiveSyncSkill',
    displayName: 'Flipped Classroom Pre-Work & Live Workshop Design',
    categoryId: 'education',
    description: 'Structures self-paced pre-class conceptual modules while reserving live classroom sessions for interactive debates and collaborative labs.',
    tags: ['education', 'flipped-classroom', 'active-learning', 'workshop', 'instructional-design'],
    sectionName: 'Flipped Classroom Architecture',
    ruSectionName: 'Архитектура перевернутого класса (Flipped Classroom)',
    semanticType: 'strategy_framework',
    instructions: [
      'Design bite-sized asynchronous prep materials (<15 min) with mandatory pre-class checkpoint quizzes.',
      'Design live synchronous workshops focused exclusively on group problem solving and debriefs.',
      'Provide instructors with pre-class anomaly reports highlighting topics needing live clarification.'
    ],
    ruInstructions: [
      'Создайте компактные материалы для самостоятельной подготовки (<15 мин) с проверочным тестом.',
      'Спроектируйте очное занятие исключительно вокруг совместной практики и разбора кейсов.',
      'Сформируйте для преподавателя отчет о типичных ошибках студентов до начала урока.'
    ]
  },
  {
    id: 'universal-design-for-learning-udl-framework',
    name: 'UniversalDesignForLearningUdlFrameworkSkill',
    displayName: 'Universal Design for Learning (UDL) Guidelines',
    categoryId: 'education',
    description: 'Provides multiple means of Representation, Action/Expression, and Engagement for diverse and neurodivergent learners.',
    tags: ['education', 'udl', 'accessibility', 'neurodiversity', 'inclusive-design'],
    sectionName: 'Universal Design for Learning Protocol',
    ruSectionName: 'Протокол универсального дизайна обучения (UDL)',
    semanticType: 'strategy_framework',
    instructions: [
      'Representation: Offer text, audio narration, diagrams, and interactive simulations for every concept.',
      'Action & Expression: Allow demonstration of mastery via essays, code, presentations, or audio recordings.',
      'Engagement: Provide adjustable autonomy levels and real-world relevance options.'
    ],
    ruInstructions: [
      'Представление информации: дублируйте текст схемами, аудио и интерактивными моделями.',
      'Действие и выражение: позвольте сдавать результаты в виде кода, текста или устной презентации.',
      'Вовлечение: дайте выбор уровня сложности и контекста задач под интересы учащегося.'
    ]
  },
  {
    id: 'metacognitive-self-regulation-journaling',
    name: 'MetacognitiveSelfRegulationJournalingSkill',
    displayName: 'Metacognitive Self-Monitoring & Reflection Prompts',
    categoryId: 'education',
    description: 'Prompts learners to plan, monitor, assess, and adjust their cognitive strategies before, during, and after problem solving.',
    tags: ['education', 'metacognition', 'self-regulation', 'learning-how-to-learn', 'reflection'],
    sectionName: 'Metacognitive Self-Regulation Protocol',
    ruSectionName: 'Протокол метакогнитивной саморегуляции и рефлексии',
    semanticType: 'process_directive',
    instructions: [
      'Pre-Task Planning: "What strategy will I use and what might go wrong?"',
      'During-Task Monitoring: "Am I making progress? Does this answer make physical sense?"',
      'Post-Task Evaluation: "What would I do differently next time and why?"'
    ],
    ruInstructions: [
      'Планирование: "Какую стратегию я выберу и где кроются главные риски?"',
      'Мониторинг: "Приближаюсь ли я к цели? Выглядит ли промежуточный результат правдоподобным?"',
      'Оценка: "Что сработало отлично, а что стоит изменить в следующий раз?"'
    ]
  },
  {
    id: 'simulation-roleplay-scenario-evaluator',
    name: 'SimulationRoleplayScenarioEvaluatorSkill',
    displayName: 'Branching Scenario Simulation & Crisis Roleplay',
    categoryId: 'education',
    description: 'Creates branching decision-tree simulations where user choices alter the narrative trajectory with realistic consequences.',
    tags: ['education', 'simulations', 'branching-scenarios', 'roleplay', 'experiential-learning'],
    sectionName: 'Branching Scenario Simulation',
    ruSectionName: 'Ветвящиеся симуляции и кризисные ролевые сценарии',
    semanticType: 'process_directive',
    instructions: [
      'Define a realistic dilemma with 3-4 viable actions, each carrying distinct hidden trade-offs.',
      'Branch the scenario dynamically based on choices without revealing immediate scoring.',
      'Provide an analytical post-simulation timeline detailing why outcomes materialized.'
    ],
    ruInstructions: [
      'Опишите острую ситуацию с 3-4 вариантами действий, несущими разные компромиссы.',
      'Развивайте сюжет в зависимости от решений пользователя без прямых подсказок.',
      'Предоставьте детальный таймлайн разбора последствий после завершения ветки.'
    ]
  },
  {
    id: 'retrieval-practice-low-stakes-testing',
    name: 'RetrievalPracticeLowStakesTestingSkill',
    displayName: 'Retrieval Practice & Testing Effect Optimization',
    categoryId: 'education',
    description: 'Leverages the Testing Effect (active memory retrieval vs passive rereading) through frequent, low-stakes formative challenges.',
    tags: ['education', 'retrieval-practice', 'testing-effect', 'memory-consolidation', 'active-recall'],
    sectionName: 'Active Retrieval Practice Protocol',
    ruSectionName: 'Протокол активного извлечения из памяти (Retrieval Practice)',
    semanticType: 'process_directive',
    instructions: [
      'Force active recall without notes before reviewing reference solutions.',
      'Space quick recall prompts across subsequent days to strengthen synaptic consolidation.',
      'Emphasize low-stakes diagnostic feedback rather than punitive grading.'
    ],
    ruInstructions: [
      'Требуйте воспроизведения понятий по памяти до открытия конспекта.',
      'Распределяйте мини-проверки по дням для долгосрочной консолидации памяти.',
      'Используйте тестирование как развивающий инструмент, а не карательный экзамен.'
    ]
  },
  {
    id: 'cognitive-apprenticeship-modeling-coaching',
    name: 'CognitiveApprenticeshipModelingCoachingSkill',
    displayName: 'Cognitive Apprenticeship (Collins, Brown & Newman)',
    categoryId: 'education',
    description: 'Makes expert tacit thought processes visible through Modeling, Coaching, Scaffolding, Articulation, Reflection, and Exploration.',
    tags: ['education', 'cognitive-apprenticeship', 'mentorship', 'expert-modeling', 'pedagogy'],
    sectionName: 'Cognitive Apprenticeship Framework',
    ruSectionName: 'Фреймворк когнитивного ученичества (Modeling & Coaching)',
    semanticType: 'strategy_framework',
    instructions: [
      'Modeling: The expert "thinks aloud" while navigating real-world ambiguity and errors.',
      'Coaching & Scaffolding: Observe student attempts, stepping in only at critical stumbling blocks.',
      'Articulation & Reflection: Prompt the student to defend their reasoning and compare against expert models.'
    ],
    ruInstructions: [
      'Modeling: Эксперт решает задачу, озвучивая ход мыслей, сомнения и проверку гипотез.',
      'Coaching: Наблюдайте за работой ученика, вмешиваясь только в моменты затыков.',
      'Reflection: Попросите ученика сравнить свои действия с подходом эксперта.'
    ]
  },
  {
    id: 'storytelling-narrative-pedagogy-anchor',
    name: 'StorytellingNarrativePedagogyAnchorSkill',
    displayName: 'Narrative Pedagogy & Storytelling Anchors',
    categoryId: 'education',
    description: 'Embeds dry technical concepts into emotional, high-stakes human stories and historical breakthrough narratives.',
    tags: ['education', 'storytelling', 'narrative-pedagogy', 'engagement', 'memory-anchors'],
    sectionName: 'Narrative Pedagogy Story Anchor',
    ruSectionName: 'Нарративная педагогика и сюжетные якоря',
    semanticType: 'process_directive',
    instructions: [
      'Frame the technical problem around the historical human crisis that prompted its invention.',
      'Introduce relatable protagonists, dramatic failures, and eureka breakthroughs.',
      'Anchor abstract formulas directly to characters and tangible stakes in the narrative.'
    ],
    ruInstructions: [
      'Поместите сухую концепцию в контекст реальной исторической драмы или кризиса.',
      'Опишите попытки героев, их ошибки и момент озарения.',
      'Привяжите абстрактные формулы к сюжетным поворотным точкам.'
    ]
  },
  {
    id: 'adaptive-learning-path-branching-engine',
    name: 'AdaptiveLearningPathBranchingEngineSkill',
    displayName: 'Adaptive Knowledge Graph & Learning Path Engine',
    categoryId: 'education',
    description: 'Maps concept prerequisite dependency graphs to dynamically route learners through remedial or accelerated tracks.',
    tags: ['education', 'adaptive-learning', 'knowledge-graph', 'personalized-path', 'prerequisites'],
    sectionName: 'Adaptive Learning Path Routing',
    ruSectionName: 'Маршрутизация адаптивных траекторий на графе знаний',
    semanticType: 'process_directive',
    instructions: [
      'Model course concepts as a Directed Acyclic Graph (DAG) of prerequisite competencies.',
      'Diagnose root cause prerequisite gaps when a student fails a downstream unit.',
      'Route the student to targeted remedial micro-modules before re-attempting the target concept.'
    ],
    ruInstructions: [
      'Сформируйте граф понятий (DAG) с указанием зависимостей и пререквизитов.',
      'При ошибке в сложной теме локализуйте пробел в базовых узлах графа.',
      'Перенаправьте студента на микро-модуль устранения конкретного пробела.'
    ]
  }
];

module.exports = { newEducationSkills };
