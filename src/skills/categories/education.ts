import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const EDUCATION_SKILLS: Record<string, SkillDefinition> = {
  'socratic-scaffolding': {
    id: 'socratic-scaffolding',
    name: 'SocraticScaffoldingSkill',
    displayName: 'Socratic Educational Scaffolding',
    categoryId: 'education',
    description: 'Guides learners through progressive cognitive scaffolding, asking targeted probing questions instead of spoon-feeding answers.',
    tags: ['education', 'socratic', 'scaffolding', 'pedagogy', 'learning', 'tutoring'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Педагогический Скеффолдинг и Сократовский Метод',
        'Pedagogical Scaffolding & Socratic Guided Tutoring',
        [
          '- **Поэтапное усложнение (Scaffolding)**: Вести ученика от простых базовых фактов к сложным синтетическим выводам.',
          '- **Наводящие вопросы вместо готовых ответов**: При возникновении ошибки не давать ответ, а указать на противоречие в рассуждениях.',
          '- **Закрепление успеха**: Отмечать верные шаги ученика и предлагать применить усвоенный принцип к новой задаче.',
        ],
        [
          '- **Progressive Cognitive Scaffolding**: Escalate complexity incrementally from foundational intuition to multi-variable synthesis.',
          '- **Probing Questions over Direct Answers**: When students err, pose a diagnostic counter-question exposing the logical contradiction.',
          '- **Concept Reinforcement**: Validate correct intermediate steps and prompt immediate application to an isomorphic challenge.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'feynman-technique-simplifier': {
    id: 'feynman-technique-simplifier',
    name: 'FeynmanTechniqueSimplifierSkill',
    displayName: 'Feynman Technique & Plain Language Simplifier',
    categoryId: 'education',
    description: 'Explains intricate technical concepts in crystal-clear plain language without jargon, as if explaining to a curious 10-year-old.',
    tags: ['education', 'feynman', 'simplification', 'plain-language', 'intuition', 'teaching'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Метод Ричарда Фейнмана (Простое Объяснение)',
        'Richard Feynman Technique & Plain Language Protocol',
        [
          '- **Запрет на заумный жаргон**: Объяснить суть явления простыми повседневными словами, понятными школьнику.',
          '- **Выявление скрытых пробелов в понимании**: Если какое-то место невозможно объяснить простыми словами — значит, там есть пробел в понимании, требующий упрощения.',
          '- **Наглядная аналогия**: Использовать яркий живой образ из реального физического мира.',
        ],
        [
          '- **Zero Obfuscating Jargon**: Strip away complex academic terminology; explain core mechanics using intuitive everyday vocabulary.',
          '- **Concept Gap Interrogation**: If a sub-process cannot be expressed in simple terms, deconstruct it further until elemental.',
          '- **Grounded Physical Metaphor**: Anchor abstract mechanisms in a tangible real-world physical model.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'concept-analogy-engine': {
    id: 'concept-analogy-engine',
    name: 'ConceptAnalogyEngineSkill',
    displayName: 'Intuitive Educational Analogy Engine',
    categoryId: 'education',
    description: 'Generates intuitive, isomorphic physical analogies to demystify abstract mathematical, algorithmic, or systems concepts.',
    tags: ['education', 'analogy', 'mental-models', 'intuition', 'metaphor', 'pedagogy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Интуитивные Образовательные Аналогии',
        'Educational Isomorphic Analogy Engine',
        [
          '- **Яркая аналогия из жизни**: Подобрать понятный физический эквивалент (например: асинхронность как работа ресторана с официантами и кухней).',
          '- **Таблица соответствий**: Наглядно показать, какой элемент технической концепции соответствует каждому элементу аналогии.',
          '- **Предостережение об ограничениях**: Четко указать, в чем аналогия расходится с реальным кодом/системой.',
        ],
        [
          '- **Intuitive Isomorphic Model**: Frame abstract algorithms through intuitive real-world systems (e.g. async I/O as restaurant kitchen tickets).',
          '- **Mapping Reference Table**: Tabulate precise correspondences between domain entities and analogical actors.',
          '- **Analogy Boundary Disclosure**: Explicitly document where the physical metaphor diverges from computational reality.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'diagnostic-quiz-generator': {
    id: 'diagnostic-quiz-generator',
    name: 'DiagnosticQuizGeneratorSkill',
    displayName: 'Diagnostic Mastery Quiz & Distractor Traps',
    categoryId: 'education',
    description: 'Generates diagnostic multiple-choice questions with tricky plausible distractors that expose specific conceptual misconceptions.',
    tags: ['education', 'quiz', 'assessment', 'mcq', 'distractors', 'misconceptions'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Диагностический Квиз с Разбором Ловушек',
        'Diagnostic Mastery Quiz & Conceptual Distractor Matrix',
        [
          '- **3–4 Вопроса с глубоким смыслом**: Каждый вопрос должен проверять не механическую память, а глубинное понимание принципов.',
          '- **Правдоподобные дистракторы (Ловушки)**: Каждый неверный вариант ответа должен отражать типичное распространенное заблуждение новичков.',
          '- **Исчерпывающее объяснение**: Для каждого варианта подробно объяснить, почему он верен или ошибочен.',
        ],
        [
          '- **3-4 Deep Conceptual Questions**: Test fundamental understanding rather than superficial syntax trivia.',
          '- **Plausible Distractor Traps**: Design incorrect options to specifically expose well-known beginner mental model flaws.',
          '- **Exhaustive Diagnostic Rationales**: Provide thorough explanations dissecting why the correct option holds and why distractors fail.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'bloom-taxonomy-ladder': {
    id: 'bloom-taxonomy-ladder',
    name: 'BloomTaxonomyLadderSkill',
    displayName: 'Bloom\'s Revised Taxonomy Cognitive Ladder',
    categoryId: 'education',
    description: 'Structures exercises across Bloom\'s 6 cognitive levels: Remember -> Understand -> Apply -> Analyze -> Evaluate -> Create.',
    tags: ['education', 'blooms-taxonomy', 'pedagogy', 'curriculum', 'cognitive-depth'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Когнитивная Лестница Таксономии Блума (Bloom\'s Ladder)',
        'Bloom\'s Revised Taxonomy Cognitive Ladder',
        [
          '- **1. Запоминание (Remember)**: Воспроизведение базовых определений и синтаксиса.',
          '- **2. Понимание (Understand)**: Объяснение концепта своими словами.',
          '- **3. Применение (Apply)**: Решение практической типовой задачи по шаблону.',
          '- **4. Анализ (Analyze)**: Поиск дефектов, декомпозиция и профилирование решения.',
          '- **5. Оценка (Evaluate)**: Сравнение компромиссов между альтернативными подходами.',
          '- **6. Создание (Create)**: Проектирование уникальной архитектуры с нуля.',
        ],
        [
          '- **1. Remember**: Recall core syntax definitions and structural rules.',
          '- **2. Understand**: Articulate underlying conceptual mechanisms in plain language.',
          '- **3. Apply**: Execute standard production use cases using established patterns.',
          '- **4. Analyze**: Deconstruct bottlenecks, memory allocations, and edge vulnerabilities.',
          '- **5. Evaluate**: Weigh trade-offs and justify architectural decisions against benchmarks.',
          '- **6. Create**: Synthesize a novel, production-grade custom system from scratch.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'spaced-repetition-flashcards': {
    id: 'spaced-repetition-flashcards',
    name: 'SpacedRepetitionFlashcardsSkill',
    displayName: 'Spaced Repetition & Anki Flashcard Generator',
    categoryId: 'education',
    description: 'Generates atomic, high-retention Anki flashcards adhering to Piotr Wozniak\'s 20 rules of knowledge formulation.',
    tags: ['education', 'anki', 'flashcards', 'spaced-repetition', 'active-recall', 'memory'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Карточки Интервального Повторения (Anki Format)',
        'Anki Spaced Repetition Flashcard Specification',
        [
          '- **Правило минимальной информации (Атомарность)**: Одна карточка = один конкретный факт или связь.',
          '- **Формат Cloze Deletion (Пропуски)**: Формулировать утверждения с пропусками ключевых терминов `{{c1::термин}}`.',
          '- **Двусторонние карточки (Q&A)**: Четкий вопрос на лицевой стороне, краткий исчерпывающий ответ на обороте.',
        ],
        [
          '- **Atomic Minimum Information Principle**: Exactly one discrete concept or mechanism per card.',
          '- **Cloze Deletion Syntax**: Generate contextual cloze deletion items formatted as `{{c1::target_concept}}`.',
          '- **Active Recall Q&A**: Formulate unambiguous front-side prompts requiring precise, non-guessing recall.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'worked-examples-cognitive-load': {
    id: 'worked-examples-cognitive-load',
    name: 'WorkedExamplesCognitiveLoadSkill',
    displayName: 'Worked Examples & Cognitive Load Fading',
    categoryId: 'education',
    description: 'Applies Sweller\'s cognitive load theory: provides fully worked examples, then partially completed problems, then independent challenges.',
    tags: ['education', 'cognitive-load', 'worked-examples', 'sweller', 'scaffolding', 'exercises'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Методика Разобранных Примеров (Worked Examples Effect)',
        'Worked Examples & Cognitive Load Fading Protocol',
        [
          '- **Этап 1: Полностью решенный эталонный пример**: Пошаговый детальный разбор задачи с аннотациями каждого шага.',
          '- **Этап 2: Частично заполненный пример (Faded Problem)**: Задача с готовой структурой, где ученик должен заполнить 2 ключевых блока.',
          '- **Этап 3: Самостоятельная задача**: Полностью независимая аналогичная задача для проверки закрепления навыка.',
        ],
        [
          '- **Stage 1: Fully Worked Benchmark Example**: Exhaustive step-by-step solution with explicit reasoning annotations.',
          '- **Stage 2: Partially Faded Problem**: Scaffolded template where the student completes 2 critical architectural blocks.',
          '- **Stage 3: Independent Challenge**: Autonomous problem requiring complete solution formulation from scratch.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'misconception-busting-protocol': {
    id: 'misconception-busting-protocol',
    name: 'MisconceptionBustingProtocolSkill',
    displayName: 'Proactive Misconception Buster',
    categoryId: 'education',
    description: 'Preemptively identifies, diagnoses, and dismantles common student misconceptions and flawed mental models.',
    tags: ['education', 'misconceptions', 'flaws', 'mental-models', 'clarification', 'debugging'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Разбор Типичных Заблуждений (Misconception Busting)',
        'Proactive Misconception Dismantling Protocol',
        [
          '- **Инвентаризация заблуждений**: Выделить топ-3 самых частых ошибок понимания в данной теме («Многие ошибочно считают, что...»).',
          '- **Демонстрация сбоя модели**: Показать конкретный пример кода или сценарий, где ошибочное представление приводит к краху.',
          '- **Корректная ментальная модель**: Сформулировать правильный интуитивный принцип, навсегда закрывающий проблему.',
        ],
        [
          '- **Misconception Catalog**: Enumerate the top 3 persistent misunderstandings beginners encounter in this domain.',
          '- **Counter-Intuitive Breakdown**: Provide a concrete code edge case proving why the flawed assumption breaks in production.',
          '- **Hardened Correct Paradigm**: Establish the definitive correct mental model with indelible visual clarity.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'interactive-coding-sandbox-task': {
    id: 'interactive-coding-sandbox-task',
    name: 'InteractiveCodingSandboxTaskSkill',
    displayName: 'Interactive Coding Challenge & Unit Tests',
    categoryId: 'education',
    description: 'Designs hands-on coding challenges with starter boilerplate, explicit task instructions, hints, and automated test assertions.',
    tags: ['education', 'coding-challenge', 'exercises', 'sandbox', 'tests', 'learn-to-code'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Интерактивная Практическая Задача (Coding Challenge)',
        'Interactive Coding Challenge & Test Harness Spec',
        [
          '- **1. Описание задачи и условия**: Четкие требования к разрабатываемой функции и ее сигнатуре.',
          '- **2. Стартовый шаблон (Boilerplate)**: Заготовка кода с типизацией и комментарием `// Ваш код здесь`.',
          '- **3. Чеклист автотестов**: Набор готовых unit-тестов для проверки корректности решения учеником.',
          '- **4. Подсказки (Hints)**: 2 скрытые подсказки с нарастающей степенью детализации.',
        ],
        [
          '- **1. Mission Objective & Signature**: Unambiguous input/output specification and algorithmic constraints.',
          '- **2. Starter Boilerplate**: Typed code skeleton ready for immediate implementation in browser sandbox.',
          '- **3. Automated Test Suite**: Vitest/Jest test harness validating base, edge, and performance test cases.',
          '- **4. Progressive Hint Tiers**: 2 graduated hints guiding the student without revealing the direct solution.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'curriculum-learning-roadmap': {
    id: 'curriculum-learning-roadmap',
    name: 'CurriculumLearningRoadmapSkill',
    displayName: '12-Week Mastery Curriculum Roadmap',
    categoryId: 'education',
    description: 'Designs comprehensive 12-week educational curricula: weekly milestones, learning objectives, reading lists, and capstone projects.',
    tags: ['education', 'curriculum', 'roadmap', 'syllabus', 'course-design', 'milestones'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Учебный План и Дорожная Карта (12-Week Curriculum)',
        '12-Week Mastery Curriculum & Syllabus Roadmap',
        [
          '- **Понедельная разбивка (Weeks 1-12)**: Для каждой недели: Тема, Цели обучения (Learning Outcomes), Практическое задание.',
          '- **Кривая сложности**: Недели 1-4 (Фундамент), Недели 5-8 (Продвинутая практика), Недели 9-12 (Архитектура и дипломный проект).',
          '- **Дипломный проект (Capstone Project)**: Спецификация комплексного продакшен-проекта для портфолио.',
        ],
        [
          '- **Weekly Milestone Syllabus (Weeks 1-12)**: Detail weekly topics, explicit learning outcomes, required readings, and assignments.',
          '- **Pedagogical Progression Arc**: Weeks 1-4 (Core Foundations) -> Weeks 5-8 (Production Patterns) -> Weeks 9-12 (Architectural Capstone).',
          '- **Portfolio Capstone Project**: Specification for a production-grade end-to-end deliverable showcasing domain mastery.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'gamified-quest-learning-flow': {
    id: 'gamified-quest-learning-flow',
    name: 'GamifiedQuestLearningFlowSkill',
    displayName: 'Gamified Quest & Skill-Tree Learning',
    categoryId: 'education',
    description: 'Gamifies educational journeys: story-driven questlines, XP milestones, unlockable skill trees, and boss-fight challenges.',
    tags: ['education', 'gamification', 'quests', 'skill-tree', 'xp', 'engagement'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Геймифицированное Обучение и Дерево Навыков (Quest Flow)',
        'Gamified Educational Quest & Skill-Tree Protocol',
        [
          '- **Сюжетный квест**: Оформить учебные задания как миссии по спасению продакшена или исследованию кибер-вселенной.',
          '- **Дерево навыков (Skill Tree)**: Разметить ветки прокачки с очками опыта (XP) за выполненные задачи.',
          '- **«Битва с боссом» (Boss Fight)**: Комплексное стресс-испытание в конце каждого модуля, требующее применения всех изученных навыков.',
        ],
        [
          '- **Narrative Questline**: Frame technical exercises as high-stakes simulations (e.g. restoring critical distributed services during an outage).',
          '- **Unlockable Skill Tree**: Design branching prerequisite skill nodes rewarding verified task completion with XP tokens.',
          '- **Module Boss Fight**: Culminate each milestone in an unguided, multi-variable challenge synthesizing all module competencies.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'meta-cognitive-self-assessment': {
    id: 'meta-cognitive-self-assessment',
    name: 'MetaCognitiveSelfAssessmentSkill',
    displayName: 'Metacognitive Self-Assessment Rubric',
    categoryId: 'education',
    description: 'Prompts learners to evaluate their own learning process, identify blind spots, and calibrate calibration accuracy.',
    tags: ['education', 'metacognition', 'self-assessment', 'reflection', 'calibration'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Метакогнитивная Самооценка и Рефлексия',
        'Metacognitive Self-Assessment & Reflection Rubric',
        [
          '- **Чеклист самопроверки**: 5 вопросов («Смогу ли я реализовать это без подсказок?», «В чем самое уязвимое место моего кода?»).',
          '- **Калибровка уверенности**: Оценка уверенности в своих знаниях от 1 до 5 до и после решения практического теста.',
          '- **План ликвидации пробелов**: Сформировать персональный список тем для повторения на основе выявленных трудностей.',
        ],
        [
          '- **Self-Interrogation Checklist**: 5 probing reflection gates ("Can I rebuild this from memory?", "Where would my implementation fail under 100x load?").',
          '- **Confidence Calibration**: Compare self-assessed pre-task confidence against empirical test score outcomes.',
          '- **Targeted Remediation Plan**: Formulate prioritized personal review topics targeting discovered comprehension blind spots.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'mnemonic-memory-anchor': {
    id: 'mnemonic-memory-anchor',
    name: 'MnemonicMemoryAnchorSkill',
    displayName: 'Mnemonic Acronym & Memory Palace Anchor',
    categoryId: 'education',
    description: 'Creates vivid mnemonic acronyms, spatial memory palaces, and phonetic anchors for complex multi-item taxonomies.',
    tags: ['education', 'mnemonics', 'memory-palace', 'acronyms', 'retention', 'memory'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Мнемонические Акронимы и Чертоги Разума',
        'Mnemonic Acronym & Spatial Memory Palace Specification',
        [
          '- **Запоминающийся акроним**: Сформировать звучный акроним из первых букв ключевых понятий (например: SOLID, ACID, CRUD).',
          '- **Пространственные Чертоги Разума**: Привязать каждый термин к узнаваемым комнатам или предметам в воображаемом доме.',
          '- **Яркая ассоциативная история**: Составить гротескную, запоминающуюся мини-историю, объединяющую все ключевые термины.',
        ],
        [
          '- **Resonant Mnemonic Acronym**: Construct high-retention phonetic acronyms matching domain lists (e.g. SOLID, ACID, STRIDE).',
          '- **Spatial Memory Palace**: Anchor abstract items to spatial coordinates in a familiar architectural layout.',
          '- **Vivid Narrative Anchor**: Weave an imaginative, high-contrast narrative scene cementing the sequential order of terms.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'peer-teaching-reciprocal': {
    id: 'peer-teaching-reciprocal',
    name: 'PeerTeachingReciprocalSkill',
    displayName: 'Reciprocal Peer-Teaching Protocol',
    categoryId: 'education',
    description: 'Simulates a peer-learning dynamic where the learner is prompted to explain the concept back to a curious peer (Protege Effect).',
    tags: ['education', 'peer-teaching', 'protege-effect', 'active-learning', 'reciprocal'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Протокол Взаимного Обучения (Эффект Протеже)',
        'Reciprocal Peer-Teaching & Protégé Effect Protocol',
        [
          '- **Роль любознательного коллеги**: Задавать ученику вопросы от лица младшего коллеги, просящего объяснить сложный момент.',
          '- **Проверка объяснения**: Оценивать ясность и точность формулировок ученика, выделяя неточности в доброжелательной манере.',
          '- **Углубление через преподавание**: Доказано, что объяснение материала другому человеку закрепляет знания на 90%.',
        ],
        [
          '- **Inquisitive Junior Peer Persona**: Prompt the student to teach the newly learned principle to a curious junior teammate.',
          '- **Teaching Clarity Evaluation**: Critically evaluate the student\'s explanatory prose, celebrating clarity while diagnosing ambiguities.',
          '- **Protégé Effect Mastery**: Leverage the 90% retention lift unlocked when learners synthesize concepts for others.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

'inquiry-based-learning': {
    id: 'inquiry-based-learning',
    name: 'InquiryBasedLearningSkill',
    displayName: 'Inquiry-Based Learning & Question Framing',
    categoryId: 'education',
    description: 'Structures educational experiences around open-ended exploration, student curiosity, and investigative hypothesis testing.',
    tags: ['education', 'inquiry-based', 'pedagogy', 'hypotheses', 'critical-thinking'],
    transform: createStandardSkillTransform({
sectionName: 'Inquiry-Based Pedagogical Protocol',
      ruSectionName: 'Протокол проблемно-ориентированного обучения (Inquiry-Based Learning)',
      instructions: [
        'Frame lessons around an authentic, provocative essential question rather than passive factual exposition.',
        'Guide the learner to formulate testable hypotheses, identify necessary evidence, and gather observations.',
        'Encourage synthesis and argumentation: prompt the learner to defend conclusions using observed facts.',
        'Facilitate metacognitive reflection on the investigation process: what assumptions changed and why.',
      ],
      ruInstructions: [
        'Стройте обучение вокруг провокационного проблемного вопроса вместо пассивного изложения сухих фактов.',
        'Направляйте учащегося к самостоятельной формулировке гипотез, поиску доказательств и анализу наблюдений.',
        'Стимулируйте аргументацию и защиту собственных выводов на основе собранных данных.',
        'Включайте этап метакогнитивной рефлексии: какие первоначальные предположения изменились в процессе исследования.',
      ],
      semanticType: 'process_directive',
      tags: ['education', 'inquiry-based', 'pedagogy', 'hypotheses', 'critical-thinking'],
    }),
  },

  'mastery-learning-rubric': {
    id: 'mastery-learning-rubric',
    name: 'MasteryLearningRubricSkill',
    displayName: 'Mastery Learning & Milestone Gates',
    categoryId: 'education',
    description: 'Requires demonstrated 85%+ competency on prerequisite concepts before unlocking advanced learning modules.',
    tags: ['education', 'mastery-learning', 'curriculum', 'assessment', 'benchmarks'],
    transform: createStandardSkillTransform({
sectionName: 'Mastery Learning Progression Protocol',
      ruSectionName: 'Протокол обучения до полного усвоения (Mastery Learning)',
      instructions: [
        'Deconstruct complex subjects into sequential hierarchical units with explicit, measurable mastery criteria.',
        'Administer diagnostic checkpoint evaluations before allowing progression to subsequent advanced modules.',
        'When mastery falls below the threshold (85%), prescribe targeted corrective instruction tailored to identified gaps.',
        'Provide parallel alternative explanations and practice variations until genuine conceptual fluency is attained.',
      ],
      ruInstructions: [
        'Разбивайте сложный материал на последовательные модули с четко измеримыми критериями усвоения.',
        'Проводите обязательные проверочные чекпоинты перед допуском к изучению следующего продвинутого блока.',
        'Если уровень усвоения ниже 85%, формируйте адресный корректирующий материал под выявленные пробелы.',
        'Предоставляйте альтернативные объяснения и вариативные практические задачи до достижения уверенного понимания.',
      ],
      semanticType: 'process_directive',
      tags: ['education', 'mastery-learning', 'curriculum', 'assessment', 'benchmarks'],
    }),
  },

  'dual-coding-multimodal': {
    id: 'dual-coding-multimodal',
    name: 'DualCodingMultimodalSkill',
    displayName: 'Dual Coding & Multimodal Representation',
    categoryId: 'education',
    description: 'Pairs verbal and conceptual explanations with complementary visual schematics, diagrams, and structural analogies.',
    tags: ['education', 'dual-coding', 'multimodal', 'visualization', 'memory'],
    transform: createStandardSkillTransform({
sectionName: 'Dual Coding Theory Presentation',
      ruSectionName: 'Мультимодальное обучение по теории двойного кодирования (Dual Coding)',
      instructions: [
        'Pair every abstract verbal concept with a concrete visual or structural representation (ASCII diagram, flowchart, or matrix).',
        'Ensure visual and text representations reinforce each other without cognitive redundancy or extraneous split-attention.',
        'Use spatial layouts, color/tag annotations, and flow arrows to depict relationships, hierarchies, and causal sequences.',
        'Ask the learner to translate from visual diagrams to verbal summaries, and vice-versa, to solidify memory traces.',
      ],
      ruInstructions: [
        'Сопровождайте каждое абстрактное текстовое понятие наглядной схемой (диаграмма, блок-схема или таблица).',
        'Следите, чтобы визуальные и словесные образы взаимно дополняли друг друга без избыточного расщепления внимания.',
        'Используйте пространственную разметку и стрелки связей для отображения иерархий и причинно-следственных цепочек.',
        'Предлагайте учащемуся переводить визуальные схемы в текст и обратно для закрепления нейронных связей.',
      ],
      semanticType: 'structural_directive',
      tags: ['education', 'dual-coding', 'multimodal', 'visualization', 'memory'],
    }),
  },

  'interleaving-practice-drill': {
    id: 'interleaving-practice-drill',
    name: 'InterleavingPracticeDrillSkill',
    displayName: 'Interleaved Practice & Discrimination Drills',
    categoryId: 'education',
    description: 'Mixes related but distinct problem types to train discrimination, formula selection, and flexible problem-solving.',
    tags: ['education', 'interleaving', 'practice', 'problem-solving', 'retention'],
    transform: createStandardSkillTransform({
sectionName: 'Interleaved Practice Protocol',
      ruSectionName: 'Протокол чередующейся практики (Interleaved Practice)',
      instructions: [
        'Do not present problems in homogenous blocks; deliberately interleave problems requiring different analytical techniques.',
        'Force the learner to first classify the problem type and select the appropriate solution strategy before computing.',
        'Highlight subtle structural differences between surface-similar problems that demand divergent resolution paths.',
        'Include spaced recall items from earlier lessons to reinforce cumulative retention and cross-topic transfer.',
      ],
      ruInstructions: [
        'Не давайте однотипные задачи подряд блоками; целенаправленно чередуйте задачи, требующие разных подходов и формул.',
        'Требуйте от ученика в первую очередь определить тип проблемы и выбрать стратегию решения перед вычислениями.',
        'Акцентируйте внимание на тонких различиях между внешне похожими кейсами, требующими принципиально разных решений.',
        'Включайте задачи из прошлых пройденных тем для долговременного закрепления и развития гибкости мышления.',
      ],
      semanticType: 'process_directive',
      tags: ['education', 'interleaving', 'practice', 'problem-solving', 'retention'],
    }),
  },

  'deliberate-practice-feedback': {
    id: 'deliberate-practice-feedback',
    name: 'DeliberatePracticeFeedbackSkill',
    displayName: 'Deliberate Practice & Micro-Drills',
    categoryId: 'education',
    description: 'Isolates weak sub-skills, prescribes hyper-focused micro-drills, and delivers immediate actionable corrective feedback.',
    tags: ['education', 'deliberate-practice', 'micro-drills', 'feedback', 'mastery'],
    transform: createStandardSkillTransform({
sectionName: 'Deliberate Practice Architecture',
      ruSectionName: 'Архитектура осознанной практики (Deliberate Practice)',
      instructions: [
        'Deconstruct complex master skills into atomic sub-components and identify the precise point of student failure.',
        'Design short, high-repetition micro-drills focused exclusively on that isolated bottleneck.',
        'Provide immediate, highly specific feedback on mechanical execution, avoiding vague generalities.',
        'Progressively increase difficulty and reintegrate the mastered micro-skill into the full macro-task.',
      ],
      ruInstructions: [
        'Разбивайте комплексный навык на атомарные составляющие и точно локализуйте слабое звено ученика.',
        'Создавайте короткие высокоинтенсивные микро-упражнения, направленные строго на ликвидацию выявленного узкого места.',
        'Давайте немедленную и предельно конкретную обратную связь по технике исполнения, избегая абстрактных похвал.',
        'Постепенно повышайте сложность и реинтегрируйте отработанный микронавык обратно в общую деятельность.',
      ],
      semanticType: 'process_directive',
      tags: ['education', 'deliberate-practice', 'micro-drills', 'feedback', 'mastery'],
    }),
  },

  'anchored-instruction-case': {
    id: 'anchored-instruction-case',
    name: 'AnchoredInstructionCaseSkill',
    displayName: 'Anchored Instruction & Real-World Case',
    categoryId: 'education',
    description: 'Anchors theoretical principles in a rich, realistic storyline or case study containing all relevant authentic data.',
    tags: ['education', 'anchored-instruction', 'case-study', 'situated-learning', 'storytelling'],
    transform: createStandardSkillTransform({
sectionName: 'Anchored Instruction Case Study',
      ruSectionName: 'Якорное обучение на реальных кейсах (Anchored Instruction)',
      instructions: [
        'Embed all curriculum objectives into an immersive, authentic real-world narrative (e.g., engineering failure, business turnaround).',
        'Provide realistic supplementary artifacts (data tables, memos, error logs, interview transcripts) within the anchor scenario.',
        'Require the student to extract clues, filter noise, and apply academic concepts to resolve the realistic dilemma.',
        'Demonstrate how theoretical abstractions directly resolve concrete challenges faced by industry practitioners.',
      ],
      ruInstructions: [
        'Погружайте учебные цели в реалистичную практическую историю (инженерная авария, антикризисный кейс компании).',
        'Предоставляйте контекстные артефакты (таблицы данных, служебные записки, логи ошибок, расшифровки бесед).',
        'Ставьте задачу фильтровать информационный шум, находить ключевые факты и применять теорию для решения кейса.',
        'Наглядно показывайте, как академические концепции напрямую решают прикладные задачи в реальном мире.',
      ],
      semanticType: 'context_directive',
      tags: ['education', 'anchored-instruction', 'case-study', 'situated-learning', 'storytelling'],
    }),
  },

  'retrieval-practice-scheduler': {
    id: 'retrieval-practice-scheduler',
    name: 'RetrievalPracticeSchedulerSkill',
    displayName: 'Active Retrieval Practice & Testing Effect',
    categoryId: 'education',
    description: 'Leverages the testing effect by prompting effortful recall from memory rather than passive re-reading or review.',
    tags: ['education', 'retrieval-practice', 'testing-effect', 'memory-consolidation', 'spaced-learning'],
    transform: createStandardSkillTransform({
sectionName: 'Active Retrieval Practice Protocol',
      ruSectionName: 'Протокол активного извлечения из памяти (Retrieval Practice)',
      instructions: [
        'Discourage passive re-reading; force active memory retrieval through open-ended self-explanation and cued recall prompts.',
        'Pose questions that require reconstructing conceptual mental models without looking at reference notes.',
        'Provide feedback only after the learner has committed to an answer and exerted cognitive effort.',
        'Schedule recall queries at expanding temporal intervals (1 day, 3 days, 7 days, 21 days) to maximize synaptic consolidation.',
      ],
      ruInstructions: [
        'Исключайте пассивное перечитывание; требуйте активного извлечения знаний из памяти через открытые вопросы и самообъяснение.',
        'Формулируйте задания, требующие реконструкции мысленной модели концепта без подглядывания в исходный текст.',
        'Давайте правильный ответ и пояснения только после того, как ученик приложил усилия и дал свой вариант ответа.',
        'Организуйте повторные сессии извлечения через возрастающие интервалы времени (1 день, 3 дня, неделя, месяц).',
      ],
      semanticType: 'process_directive',
      tags: ['education', 'retrieval-practice', 'testing-effect', 'memory-consolidation', 'spaced-learning'],
    }),
  },

  'cognitive-apprenticeship-modeling': {
    id: 'cognitive-apprenticeship-modeling',
    name: 'CognitiveApprenticeshipModelingSkill',
    displayName: 'Cognitive Apprenticeship (Model, Coach, Fade)',
    categoryId: 'education',
    description: 'Employs expert think-aloud modeling, followed by guided scaffolding, active coaching, and gradual support fading.',
    tags: ['education', 'cognitive-apprenticeship', 'scaffolding', 'coaching', 'autonomy'],
    transform: createStandardSkillTransform({
sectionName: 'Cognitive Apprenticeship Framework',
      ruSectionName: 'Фреймворк когнитивного наставничества (Modeling, Coaching, Fading)',
      instructions: [
        'Stage 1 (Modeling): Demonstrate the expert problem-solving process while verbalizing internal thoughts, doubts, and trade-offs.',
        'Stage 2 (Scaffolding): Provide structured templates, sentence starters, and checklists while the student attempts the task.',
        'Stage 3 (Coaching): Observe student execution, offering timely hints and prompts to steer them past sticking points.',
        'Stage 4 (Fading): Systematically remove scaffolding, allowing the student to achieve complete autonomous mastery.',
      ],
      ruInstructions: [
        'Этап 1 (Моделирование): Покажите решение задачи экспертом, проговаривая вслух внутренние рассуждения и сомнения.',
        'Этап 2 (Скеффолдинг): Дайте учащемуся опорные шаблоны, чек-листы и пошаговые структуры при первых попытках.',
        'Этап 3 (Коучинг): Наблюдайте за выполнением, давая точечные подсказки и направляющие наводящие вопросы.',
        'Этап 4 (Угасание поддержки): Постепенно убирайте внешние подсказки, доводя ученика до полной автономности.',
      ],
      semanticType: 'process_directive',
      tags: ['education', 'cognitive-apprenticeship', 'scaffolding', 'coaching', 'autonomy'],
    }),
  },

  'zone-proximal-development': {
    id: 'zone-proximal-development',
    name: 'ZoneProximalDevelopmentSkill',
    displayName: 'Zone of Proximal Development (ZPD) Calibration',
    categoryId: 'education',
    description: 'Calibrates challenge difficulty to the sweet spot between boring simplicity and paralyzing frustration.',
    tags: ['education', 'zpd', 'vygotsky', 'adaptive-learning', 'flow-state'],
    transform: createStandardSkillTransform({
sectionName: 'ZPD Dynamic Difficulty Calibration',
      ruSectionName: 'Калибровка зоны ближайшего развития (ZPD)',
      instructions: [
        'Dynamically assess student current capability level to identify tasks they cannot yet do unaided, but can accomplish with guidance.',
        'Prevent boredom by eliminating redundant low-level drills as soon as baseline competency is demonstrated.',
        'Prevent cognitive overload and frustration by breaking daunting leaps into intermediate reachable micro-milestones.',
        'Monitor emotional and cognitive engagement cues, dynamically adjusting assistance levels up or down.',
      ],
      ruInstructions: [
        'Динамически оценивайте текущий уровень ученика, подбирая задачи на грани его возможностей (выполнимые с поддержкой).',
        'Исключайте скуку, убирая тривиальные повторы сразу же, как только базовый навык продемонстрирован.',
        'Предотвращайте когнитивную перегрузку и стресс, деля чрезмерно сложные шаги на доступные промежуточные этапы.',
        'Отслеживайте признаки переутомления или потери темпа, гибко усиливая или ослабляя помощь.',
      ],
      semanticType: 'behavior_directive',
      tags: ['education', 'zpd', 'vygotsky', 'adaptive-learning', 'flow-state'],
    }),
  },

  'constructivist-discovery-lab': {
    id: 'constructivist-discovery-lab',
    name: 'ConstructivistDiscoveryLabSkill',
    displayName: 'Constructivist Discovery Lab',
    categoryId: 'education',
    description: 'Facilitates self-guided conceptual discovery through simulated experimentation, parameter tweaking, and observation.',
    tags: ['education', 'constructivism', 'discovery-learning', 'experimentation', 'intuition'],
    transform: createStandardSkillTransform({
sectionName: 'Constructivist Discovery Protocol',
      ruSectionName: 'Лаборатория конструктивистского открытия (Discovery Learning)',
      instructions: [
        'Present the student with an interactive scenario, simulation, or data set with adjustable parameters.',
        'Prompt the learner to manipulate variables systematically and record resultant changes in system behavior.',
        'Guide the learner to deduce underlying scientific or mathematical principles independently before stating the official rule.',
        'Anchor newly discovered insights in existing mental schema to foster deep, durable conceptual ownership.',
      ],
      ruInstructions: [
        'Предоставляйте ученику интерактивную модель, симуляцию или набор данных с изменяемыми параметрами.',
        'Побуждайте системно менять переменные и фиксировать происходящие изменения в поведении системы.',
        'Подводите учащегося к самостоятельному открытию закономерности или формулы до того, как озвучить готовое правило.',
        'Связывайте открытые закономерности с уже имеющимся жизненным опытом для глубокого и прочного усвоения.',
      ],
      semanticType: 'process_directive',
      tags: ['education', 'constructivism', 'discovery-learning', 'experimentation', 'intuition'],
    }),
  },

  'formative-assessment-exit-ticket': {
    id: 'formative-assessment-exit-ticket',
    name: 'FormativeAssessmentExitTicketSkill',
    displayName: 'Formative Assessment & Exit Tickets',
    categoryId: 'education',
    description: 'Designs brief, 2-minute formative diagnostic exit tickets to evaluate lesson takeaway and identify lingering confusion.',
    tags: ['education', 'formative-assessment', 'exit-tickets', 'feedback-loop', 'diagnostic'],
    transform: createStandardSkillTransform({
sectionName: 'Formative Assessment Exit Ticket Spec',
      ruSectionName: 'Спецификация формирующего оценивания (Exit Tickets)',
      instructions: [
        'Conclude instructional units with a 3-question exit ticket: 1 core concept check, 1 application scenario, 1 self-reported confusion point.',
        'Use objective questions that reveal whether foundational takeaways were accurately absorbed or fundamentally misunderstood.',
        'Ask the learner explicitly: "What is the single muddiest, least clear point from today\'s lesson?"',
        'Use aggregated responses to adapt the opening review of the subsequent instructional session.',
      ],
      ruInstructions: [
        'Завершайте учебный блок кратким опросом из 3 пунктов: проверка базового понятия, кейс на применение и зона неуверенности.',
        'Используйте диагностические вопросы, выявляющие, усвоен ли ключевой вывод урока или возникли искажения.',
        'Задавайте прямой вопрос: «Какой аспект темы остался наиболее туманным или вызвал больше всего сомнений?»',
        'Используйте результаты обратной связи для точечной корректировки начала следующего занятия.',
      ],
      semanticType: 'structural_directive',
      tags: ['education', 'formative-assessment', 'exit-tickets', 'feedback-loop', 'diagnostic'],
    }),
  },

  'differentiated-instruction-tier': {
    id: 'differentiated-instruction-tier',
    name: 'DifferentiatedInstructionTierSkill',
    displayName: 'Differentiated Instruction by Readiness',
    categoryId: 'education',
    description: 'Adapts instructional content, process, and product across beginner, intermediate, and advanced readiness tiers.',
    tags: ['education', 'differentiated-instruction', 'readiness-tiers', 'adaptive', 'inclusion'],
    transform: createStandardSkillTransform({
sectionName: 'Differentiated Tiered Instruction',
      ruSectionName: 'Дифференцированное многоуровневое обучение (Differentiated Instruction)',
      instructions: [
        'Provide parallel learning pathways tailored to three distinct readiness levels: Foundation, Core Application, and Advanced Extension.',
        'Tier 1 (Foundation): Emphasize concrete examples, explicit vocabulary definitions, and step-by-step guidance.',
        'Tier 2 (Core): Focus on autonomous problem-solving, real-world application, and standard competency criteria.',
        'Tier 3 (Advanced): Challenge with open-ended design problems, edge-case optimization, and peer-coaching prompts.',
      ],
      ruInstructions: [
        'Формируйте три параллельные траектории обучения в зависимости от готовности: Базовый уровень, Основной и Продвинутый.',
        'Уровень 1 (База): Наглядные примеры, разбор терминов, пошаговые инструкции и детальные подсказки.',
        'Уровень 2 (Основной): Самостоятельное решение типовых задач, прикладные кейсы и стандартные критерии.',
        'Уровень 3 (Продвинутый): Нестандартные открытые задачи, оптимизация граничных случаев и исследовательские задания.',
      ],
      semanticType: 'process_directive',
      tags: ['education', 'differentiated-instruction', 'readiness-tiers', 'adaptive', 'inclusion'],
    }),
  },

  'ubd-backward-design': {
    id: 'ubd-backward-design',
    name: 'UbdBackwardDesignSkill',
    displayName: 'Understanding by Design (UbD) Backward Curriculum',
    categoryId: 'education',
    description: 'Plans curriculum through 3-stage backward design: Stage 1 Desired Results, Stage 2 Evidence, Stage 3 Learning Plan.',
    tags: ['education', 'ubd', 'backward-design', 'curriculum-design', 'learning-outcomes'],
    transform: createStandardSkillTransform({
sectionName: 'UbD Backward Design Curriculum Architecture',
      ruSectionName: 'Обратное проектирование учебных программ (UbD Backward Design)',
      instructions: [
        'Stage 1 (Desired Results): Define Big Ideas, Essential Questions, and specific enduring understandings students will retain for years.',
        'Stage 2 (Assessment Evidence): Determine what authentic performance tasks and evidence will prove students have achieved understanding.',
        'Stage 3 (Learning Plan): Design instructional activities, scaffolding sequences, and resources aligned directly to the required evidence.',
        'Eliminate aimless "activity-oriented" or "coverage-oriented" instruction lacking clear alignment to enduring outcomes.',
      ],
      ruInstructions: [
        'Этап 1 (Желаемые результаты): Сформулируйте ключевые идеи, сквозные вопросы и долгосрочные инсайты, которые останутся на годы.',
        'Этап 2 (Доказательства понимания): Разработайте практические аттестационные задачи и критерии, доказывающие освоение темы.',
        'Этап 3 (План обучения): Проектируйте конкретные уроки и упражнения, строго ведущие к успешной демонстрации этих доказательств.',
        'Исключайте бессистемные активности и бездумное «вычитывание программы», не привязанное к измеримым результатам.',
      ],
      semanticType: 'structural_directive',
      tags: ['education', 'ubd', 'backward-design', 'curriculum-design', 'learning-outcomes'],
    }),
  },

  'peer-review-calibration-rubric': {
    id: 'peer-review-calibration-rubric',
    name: 'PeerReviewCalibrationRubricSkill',
    displayName: 'Peer Review & Evaluation Rubric Calibration',
    categoryId: 'education',
    description: 'Equips learners with calibrated evaluation rubrics to provide objective, constructive, and actionable peer feedback.',
    tags: ['education', 'peer-review', 'rubrics', 'constructive-feedback', 'assessment'],
    transform: createStandardSkillTransform({
sectionName: 'Calibrated Peer Review Rubric',
      ruSectionName: 'Калиброванная рубрика взаимного рецензирования (Peer Review)',
      instructions: [
        'Provide an unambiguous rubric with 4 clear performance tiers (Exemplary, Proficient, Developing, Inadequate) for each dimension.',
        'Require peer reviewers to identify at least 2 specific strengths with quoted evidence from the peer\'s work.',
        'Mandate 2 concrete, actionable suggestions for improvement framed as constructive "Next Steps".',
        'Include a self-calibration benchmark example showing how a sample submission should be scored and justified.',
      ],
      ruInstructions: [
        'Предоставляйте прозрачную рубрику с 4 уровнями оценки (Отлично, Компетентно, Требует доработки, Неудовлетворительно).',
        'Требуйте от рецензента выделить минимум 2 конкретных сильных стороны работы с точными цитатами.',
        'Обязывайте дать 2 конструктивных и практически применимых предложения по улучшению в формате «Следующие шаги».',
        'Включайте эталонный разобранный пример работы с образцовой рецензией для калибровки критериев оценки.',
      ],
      semanticType: 'structural_directive',
      tags: ['education', 'peer-review', 'rubrics', 'constructive-feedback', 'assessment'],
    }),
  },

  'microlearning-chunking': {
    id: 'microlearning-chunking',
    name: 'MicrolearningChunkingSkill',
    displayName: 'Microlearning & Cognitive Chunking',
    categoryId: 'education',
    description: 'Distills complex content into bite-sized 3-5 minute micro-learning units with a single concept and rapid check.',
    tags: ['education', 'microlearning', 'chunking', 'cognitive-load', 'bite-sized'],
    transform: createStandardSkillTransform({
sectionName: 'Microlearning Chunking Architecture',
      ruSectionName: 'Архитектура микрообучения и когнитивного чанкинга (Microlearning)',
      instructions: [
        'Constrain each instructional chunk to a single, focused learning objective deliverable in under 5 minutes.',
        'Structure each chunk: 1-sentence hook -> core concept explanation -> concrete snippet/example -> 60-second interactive check.',
        'Adhere strictly to working memory limits (Miller\'s 7±2 law, Sweller\'s cognitive load theory); eliminate tangential anecdotes.',
        'Provide a clear "Next Step" link tying the micro-unit into the broader learning journey roadmap.',
      ],
      ruInstructions: [
        'Ограничивайте каждый микромодуль одной законченной учебной целью, рассчитанной на освоение за 3–5 минут.',
        'Стройте модуль по формуле: 1 завлекающая фраза -> суть концепции -> наглядный пример -> 60-секундная экспресс-проверка.',
        'Соблюдайте ограничения рабочей памяти (закон Миллера, теория когнитивной нагрузки); безжалостно удаляйте воду.',
        'Завершайте модуль четким мостиком к следующему шагу в общей карте образовательного трека.',
      ],
      semanticType: 'structural_directive',
      tags: ['education', 'microlearning', 'chunking', 'cognitive-load', 'bite-sized'],
    }),
  },

  'andragogy-adult-learning-spec': {
    id: 'andragogy-adult-learning-spec',
    name: 'AndragogyAdultLearningSpecSkill',
    displayName: 'Andragogy & Adult Learning Principles',
    categoryId: 'education',
    description: 'Applies Knowles adult learning theory: autonomy, prior experience leverage, problem-orientation, and immediate relevance.',
    tags: ['education', 'andragogy', 'adult-learning', 'relevance', 'professional-development'],
    transform: createStandardSkillTransform({
sectionName: 'Andragogical Adult Learning Principles',
      ruSectionName: 'Принципы андрагогики и обучения взрослых (Andragogy)',
      instructions: [
        'Respect adult autonomy: explain upfront WHY this knowledge matters and how it applies directly to immediate professional challenges.',
        'Acknowledge and leverage the learner\'s accumulated professional experience as a foundational learning asset.',
        'Frame lessons around realistic problem-solving scenarios rather than academic rote memorization.',
        'Incorporate immediate opportunities for practical application and personal customization of the learned techniques.',
      ],
      ruInstructions: [
        'Уважайте самостоятельность взрослого: сразу объясняйте, ЗАЧЕМ нужен этот материал и какую рабочую задачу он решит.',
        'Опирайтесь на накопленный профессиональный опыт учащегося как на фундамент для усвоения новых концепций.',
        'Ориентируйте обучение на решение практических проблем и кейсов, а не на пассивное заучивание теории.',
        'Предоставляйте возможность немедленного применения инструментов в личной практике ученика с адаптацией под его стек.',
      ],
      semanticType: 'role_directive',
      tags: ['education', 'andragogy', 'adult-learning', 'relevance', 'professional-development'],
    }),
  },
};
