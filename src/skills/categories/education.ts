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
      semanticType: "role",
      tags: ['education', 'andragogy', 'adult-learning', 'relevance', 'professional-development'],
    }),
  },
  "blooms-taxonomy-cognitive-depth-ladder": {
    id: "blooms-taxonomy-cognitive-depth-ladder",
    name: "BloomsTaxonomyCognitiveDepthLadderSkill",
    displayName: "Bloom’s Revised Taxonomy Cognitive Ladder",
    categoryId: "education",
    description: "Structures progressive curricula spanning Remember, Understand, Apply, Analyze, Evaluate, and Create.",
    tags: ["education","blooms-taxonomy","curriculum-design","pedagogy","assessment"],
    transform: createStandardSkillTransform({
      sectionName: "Bloom’s Taxonomy Learning Progression",
      ruSectionName: "Прогрессия глубины обучения по таксономии Блума",
      instructions: [
        "Structure material starting from foundational recall and conceptual understanding.",
        "Progress to application drills and analytical trade-off breakdowns.",
        "Conclude with open-ended evaluation and synthesis/creation projects."
],
      ruInstructions: [
        "Выстройте материал от базового запоминания к глубинному пониманию.",
        "Переходите к практическому применению и анализу компромиссов.",
        "Завершите обучение задачами на критическую оценку и создание собственных решений."
],
      semanticType: "process_directive",
      tags: ["education","blooms-taxonomy","curriculum-design","pedagogy","assessment"],
    }),
  },

  "spaced-repetition-supermemo-sm2-scheduler": {
    id: "spaced-repetition-supermemo-sm2-scheduler",
    name: "SpacedRepetitionSupermemoSm2SchedulerSkill",
    displayName: "Spaced Repetition & SuperMemo SM-2 Scheduling",
    categoryId: "education",
    description: "Calculates optimal review intervals based on user recall quality scores (0-5) and item difficulty factors (EF).",
    tags: ["education","spaced-repetition","sm2","flashcards","memory"],
    transform: createStandardSkillTransform({
      sectionName: "Spaced Repetition (SM-2) Scheduling Protocol",
      ruSectionName: "Протокол интервальных повторений (SuperMemo SM-2)",
      instructions: [
        "Evaluate response recall grade Q from 0 (complete blackout) to 5 (perfect recall).",
        "Update Easiness Factor: EF’ = EF + (0.1 - (5-Q)*(0.08 + (5-Q)*0.02)).",
        "Calculate next review interval I(n) in days and output scheduled flashcard queue."
],
      ruInstructions: [
        "Оцените качество ответа от 0 (полное забывание) до 5 (мгновенное точное воспроизведение).",
        "Пересчитайте фактор легкости EF по формуле SM-2.",
        "Рассчитайте интервал следующего повторения в днях и сформируйте очередь карточек."
],
      semanticType: "process_directive",
      tags: ["education","spaced-repetition","sm2","flashcards","memory"],
    }),
  },

  "worked-example-cognitive-load-reduction": {
    id: "worked-example-cognitive-load-reduction",
    name: "WorkedExampleCognitiveLoadReductionSkill",
    displayName: "Worked Example Effect & Cognitive Load Optimization",
    categoryId: "education",
    description: "Presents fully resolved step-by-step exemplars followed by faded completion problems to prevent novice cognitive overload.",
    tags: ["education","worked-examples","cognitive-load-theory","sweller","instructional-design"],
    transform: createStandardSkillTransform({
      sectionName: "Worked Example & Scaffolding Protocol",
      ruSectionName: "Метод разобранных примеров и снижение когнитивной нагрузки",
      instructions: [
        "Present a complete step-by-step worked solution highlighting sub-goals and annotations.",
        "Provide a paired isomorphic problem with 50% steps omitted for guided completion.",
        "Conclude with an unassisted challenge to test mastery."
],
      ruInstructions: [
        "Покажите полностью решенный эталонный пример с пояснением каждого промежуточного шага.",
        "Дайте аналогичную задачу, где 50% шагов уже решено, а остальные должен заполнить ученик.",
        "Закрепите навык полностью самостоятельным упражнением."
],
      semanticType: "process_directive",
      tags: ["education","worked-examples","cognitive-load-theory","sweller","instructional-design"],
    }),
  },

  "peer-instruction-mazur-concept-test": {
    id: "peer-instruction-mazur-concept-test",
    name: "PeerInstructionMazurConceptTestSkill",
    displayName: "Eric Mazur Peer Instruction & ConcepTests",
    categoryId: "education",
    description: "Generates qualitative multiple-choice concept tests designed to expose and dismantle common student misconceptions via peer debate.",
    tags: ["education","peer-instruction","mazur","concept-test","active-learning"],
    transform: createStandardSkillTransform({
      sectionName: "Mazur Peer Instruction Protocol",
      ruSectionName: "Протокол взаимного обучения и концепт-тестов Мазура",
      instructions: [
        "Design a conceptual question that cannot be solved by rote formula memorization.",
        "Include distractor options corresponding to predictable cognitive misconceptions.",
        "Provide peer-debate prompts guiding students to articulate and stress-test their models."
],
      ruInstructions: [
        "Сформулируйте концептуальный вопрос, который нельзя решить механической подстановкой в формулу.",
        "Включите варианты ответов с типичными когнитивными ловушками и заблуждениями.",
        "Напишите вопросы для групповой дискуссии, вскрывающие ошибки в рассуждениях."
],
      semanticType: "process_directive",
      tags: ["education","peer-instruction","mazur","concept-test","active-learning"],
    }),
  },

  "zone-of-proximal-development-calibrator": {
    id: "zone-of-proximal-development-calibrator",
    name: "ZoneOfProximalDevelopmentCalibratorSkill",
    displayName: "Vygotsky Zone of Proximal Development (ZPD)",
    categoryId: "education",
    description: "Calibrates task difficulty dynamically to keep the learner at the boundary between independent mastery and guided capability.",
    tags: ["education","zpd","vygotsky","adaptive-learning","scaffolding"],
    transform: createStandardSkillTransform({
      sectionName: "ZPD Dynamic Difficulty Calibration",
      ruSectionName: "Калибровка зоны ближайшего развития (ЗБР Выготского)",
      instructions: [
        "Assess baseline student autonomy on prerequisite concepts.",
        "Formulate problems situated strictly within the zone requiring targeted assistance.",
        "Provide progressive hints (faded scaffolding) rather than giving away final answers."
],
      ruInstructions: [
        "Оцените текущий уровень самостоятельного владения базовыми темами.",
        "Сформулируйте задачу в зоне, требующей направляющей подсказки, но не готового ответа.",
        "Предоставляйте дозированные подсказки по запросу, постепенно убирая поддержку."
],
      semanticType: "process_directive",
      tags: ["education","zpd","vygotsky","adaptive-learning","scaffolding"],
    }),
  },

  "rubric-analytic-holistic-grading-designer": {
    id: "rubric-analytic-holistic-grading-designer",
    name: "RubricAnalyticHolisticGradingDesignerSkill",
    displayName: "Analytic & Holistic Assessment Rubric Design",
    categoryId: "education",
    description: "Develops clear evaluation rubrics with explicit performance criteria across Exemplary, Proficient, Developing, and Unsatisfactory levels.",
    tags: ["education","rubrics","grading","assessment","evaluation"],
    transform: createStandardSkillTransform({
      sectionName: "Assessment Rubric Specification",
      ruSectionName: "Спецификация аналитических и целостных рубрик оценивания",
      instructions: [
        "Define 4-6 distinct, non-overlapping performance criteria.",
        "Write observable, concrete behavioral descriptions for each achievement tier (1 to 4).",
        "Include self-assessment reflection checklists for students."
],
      ruInstructions: [
        "Сформулируйте 4-6 независимых критериев оценки навыка.",
        "Опишите четкие измеримые признаки для каждого уровня (от базового до экспертного).",
        "Добавьте чек-лист для самопроверки и рефлексии учащегося."
],
      semanticType: 'protocol',
      tags: ["education","rubrics","grading","assessment","evaluation"],
    }),
  },

  "dual-coding-multimedia-learning-principles": {
    id: "dual-coding-multimedia-learning-principles",
    name: "DualCodingMultimediaLearningPrinciplesSkill",
    displayName: "Mayer’s Multimedia Learning & Dual Coding",
    categoryId: "education",
    description: "Structures educational content adhering to Richard Mayer’s 12 principles (Coherence, Signaling, Redundancy, Spatial Contiguity).",
    tags: ["education","mayer","dual-coding","multimedia-learning","visual-verbal"],
    transform: createStandardSkillTransform({
      sectionName: "Dual Coding & Multimedia Learning Architecture",
      ruSectionName: "Принципы мультимедийного обучения и двойного кодирования (Мейер)",
      instructions: [
        "Pair visual mental models (diagrams, flowcharts) with synchronized concise text.",
        "Eliminate seductive details and extraneous cognitive load (Coherence Principle).",
        "Position explanatory labels in close spatial contiguity to visual focal points."
],
      ruInstructions: [
        "Сопоставляйте визуальные схемы и диаграммы с кратким текстовым пояснением.",
        "Удалите отвлекающие второстепенные детали для устранения посторонней нагрузки.",
        "Размещайте поясняющие подписи непосредственно рядом с элементами схемы."
],
      semanticType: "process_directive",
      tags: ["education","mayer","dual-coding","multimedia-learning","visual-verbal"],
    }),
  },

  "inquiry-based-learning-5e-model": {
    id: "inquiry-based-learning-5e-model",
    name: "InquiryBasedLearning5eModelSkill",
    displayName: "5E Instructional Model (Engage, Explore, Explain, Elaborate, Evaluate)",
    categoryId: "education",
    description: "Constructs science and technology inquiry modules guiding students from curiosity to autonomous hypothesis testing and evaluation.",
    tags: ["education","5e-model","inquiry-based","constructivism","lesson-plan"],
    transform: createStandardSkillTransform({
      sectionName: "5E Inquiry Instructional Sequence",
      ruSectionName: "Последовательность исследовательского обучения (модель 5E)",
      instructions: [
        "Engage: Present an intriguing phenomenon or anomaly.",
        "Explore: Provide hands-on sandbox exploration without upfront lecturing.",
        "Explain -> Elaborate -> Evaluate: Formalize concepts, extend to novel domains, and assess deep comprehension."
],
      ruInstructions: [
        "Engage: Предъявите парадокс или интригующий феномен.",
        "Explore: Дайте возможность исследовать механику в песочнице без сухой теории.",
        "Explain / Elaborate / Evaluate: Введите терминологию, перенесите на новый контекст и оцените усвоение."
],
      semanticType: 'protocol',
      tags: ["education","5e-model","inquiry-based","constructivism","lesson-plan"],
    }),
  },

  "case-study-harvard-method-facilitator": {
    id: "case-study-harvard-method-facilitator",
    name: "CaseStudyHarvardMethodFacilitatorSkill",
    displayName: "Harvard Business School Case Method Facilitation",
    categoryId: "education",
    description: "Constructs open-ended, real-world case scenarios requiring decision under incomplete information, followed by dialectical discussion boards.",
    tags: ["education","case-study","harvard-method","decision-making","executive-education"],
    transform: createStandardSkillTransform({
      sectionName: "Case Study Simulation Protocol",
      ruSectionName: "Методология Гарвардских кейсов (Case Method)",
      instructions: [
        "Draft a high-stakes dilemma with conflicting stakeholder data and time urgency.",
        "Structure discussion boards forcing participants to take a definitive executive stance.",
        "Provide debrief matrices extracting transferable strategic principles."
],
      ruInstructions: [
        "Составьте кейс с острым конфликтом интересов и неполными данными.",
        "Сформулируйте вопросы, заставляющие участника занять твердую управленческую позицию.",
        "Сформируйте матрицу дебрифинга с универсальными выводами для практики."
],
      semanticType: 'protocol',
      tags: ["education","case-study","harvard-method","decision-making","executive-education"],
    }),
  },

  "deliberate-practice-ericsson-feedback-loop": {
    id: "deliberate-practice-ericsson-feedback-loop",
    name: "DeliberatePracticeEricssonFeedbackLoopSkill",
    displayName: "Anders Ericsson Deliberate Practice & Micro-Skill Drills",
    categoryId: "education",
    description: "Isolates weak sub-component mechanics for repetitive, high-intensity drills with immediate corrective feedback.",
    tags: ["education","deliberate-practice","ericsson","mastery","micro-drills"],
    transform: createStandardSkillTransform({
      sectionName: "Deliberate Practice Drill Architecture",
      ruSectionName: "Архитектура осознанной практики (Deliberate Practice)",
      instructions: [
        "Deconstruct the complex skill into atomic, measurable sub-skills.",
        "Design targeted high-repetition drills operating right at the edge of failure.",
        "Provide millisecond-accurate actionable corrective feedback after each repetition."
],
      ruInstructions: [
        "Декомпозируйте сложный навык на атомарные измеримые микро-навыки.",
        "Создайте серию интенсивных упражнений на пределе текущих возможностей.",
        "Предоставляйте мгновенную корректирующую обратную связь после каждого действия."
],
      semanticType: "process_directive",
      tags: ["education","deliberate-practice","ericsson","mastery","micro-drills"],
    }),
  },

  "interleaving-vs-blocking-curriculum-mixer": {
    id: "interleaving-vs-blocking-curriculum-mixer",
    name: "InterleavingVsBlockingCurriculumMixerSkill",
    displayName: "Interleaved Practice & Discrimination Learning",
    categoryId: "education",
    description: "Mixes related problem types (A, B, C, B, A, C) to force learners to select the correct solving strategy rather than relying on rote habit.",
    tags: ["education","interleaving","retention","curriculum-design","discrimination"],
    transform: createStandardSkillTransform({
      sectionName: "Interleaved Practice Sequence",
      ruSectionName: "Чередование тем и распознавание стратегий (Interleaving)",
      instructions: [
        "Reject blocked single-topic problem sets (AAAA, BBBB, CCCC).",
        "Interleave problem types requiring distinct conceptual methods in pseudo-random order.",
        "Require students to state \"Why method X applies over method Y\" before executing calculations."
],
      ruInstructions: [
        "Откажитесь от блочных однотипных серий задач подряд.",
        "Чередуйте задачи разного типа вперемешку, требуя выбора правильного метода.",
        "Попросите учащегося обосновать выбор формулы до начала вычислений."
],
      semanticType: "process_directive",
      tags: ["education","interleaving","retention","curriculum-design","discrimination"],
    }),
  },

  "mastery-learning-bloom-two-sigma-system": {
    id: "mastery-learning-bloom-two-sigma-system",
    name: "MasteryLearningBloomTwoSigmaSystemSkill",
    displayName: "Bloom’s 2-Sigma Mastery Learning Architecture",
    categoryId: "education",
    description: "Enforces 90%+ diagnostic mastery prerequisites before unlocking advanced module tiers, paired with personalized corrective tutoring.",
    tags: ["education","mastery-learning","2-sigma","personalized-tutoring","competency"],
    transform: createStandardSkillTransform({
      sectionName: "Mastery Learning System Protocol",
      ruSectionName: "Система обучения до полного усвоения (Mastery Learning 2-Sigma)",
      instructions: [
        "Administer formative diagnostic quizzes after every learning unit.",
        "Require >=90% mastery to progress; direct students scoring <90% to alternative modalities.",
        "Track cumulative mastery dashboards demonstrating progression."
],
      ruInstructions: [
        "Проводите формирующее диагностическое тестирование после каждого модуля.",
        "Установите порог 90% для перехода дальше; при меньшем балле направляйте на альтернативные объяснения.",
        "Ведите наглядный дашборд освоенных компетенций."
],
      semanticType: 'protocol',
      tags: ["education","mastery-learning","2-sigma","personalized-tutoring","competency"],
    }),
  },

  "flipped-classroom-asynchronous-prep-live-sync": {
    id: "flipped-classroom-asynchronous-prep-live-sync",
    name: "FlippedClassroomAsynchronousPrepLiveSyncSkill",
    displayName: "Flipped Classroom Pre-Work & Live Workshop Design",
    categoryId: "education",
    description: "Structures self-paced pre-class conceptual modules while reserving live classroom sessions for interactive debates and collaborative labs.",
    tags: ["education","flipped-classroom","active-learning","workshop","instructional-design"],
    transform: createStandardSkillTransform({
      sectionName: "Flipped Classroom Architecture",
      ruSectionName: "Архитектура перевернутого класса (Flipped Classroom)",
      instructions: [
        "Design bite-sized asynchronous prep materials (<15 min) with mandatory pre-class checkpoint quizzes.",
        "Design live synchronous workshops focused exclusively on group problem solving and debriefs.",
        "Provide instructors with pre-class anomaly reports highlighting topics needing live clarification."
],
      ruInstructions: [
        "Создайте компактные материалы для самостоятельной подготовки (<15 мин) с проверочным тестом.",
        "Спроектируйте очное занятие исключительно вокруг совместной практики и разбора кейсов.",
        "Сформируйте для преподавателя отчет о типичных ошибках студентов до начала урока."
],
      semanticType: 'protocol',
      tags: ["education","flipped-classroom","active-learning","workshop","instructional-design"],
    }),
  },

  "universal-design-for-learning-udl-framework": {
    id: "universal-design-for-learning-udl-framework",
    name: "UniversalDesignForLearningUdlFrameworkSkill",
    displayName: "Universal Design for Learning (UDL) Guidelines",
    categoryId: "education",
    description: "Provides multiple means of Representation, Action/Expression, and Engagement for diverse and neurodivergent learners.",
    tags: ["education","udl","accessibility","neurodiversity","inclusive-design"],
    transform: createStandardSkillTransform({
      sectionName: "Universal Design for Learning Protocol",
      ruSectionName: "Протокол универсального дизайна обучения (UDL)",
      instructions: [
        "Representation: Offer text, audio narration, diagrams, and interactive simulations for every concept.",
        "Action & Expression: Allow demonstration of mastery via essays, code, presentations, or audio recordings.",
        "Engagement: Provide adjustable autonomy levels and real-world relevance options."
],
      ruInstructions: [
        "Представление информации: дублируйте текст схемами, аудио и интерактивными моделями.",
        "Действие и выражение: позвольте сдавать результаты в виде кода, текста или устной презентации.",
        "Вовлечение: дайте выбор уровня сложности и контекста задач под интересы учащегося."
],
      semanticType: 'protocol',
      tags: ["education","udl","accessibility","neurodiversity","inclusive-design"],
    }),
  },

  "metacognitive-self-regulation-journaling": {
    id: "metacognitive-self-regulation-journaling",
    name: "MetacognitiveSelfRegulationJournalingSkill",
    displayName: "Metacognitive Self-Monitoring & Reflection Prompts",
    categoryId: "education",
    description: "Prompts learners to plan, monitor, assess, and adjust their cognitive strategies before, during, and after problem solving.",
    tags: ["education","metacognition","self-regulation","learning-how-to-learn","reflection"],
    transform: createStandardSkillTransform({
      sectionName: "Metacognitive Self-Regulation Protocol",
      ruSectionName: "Протокол метакогнитивной саморегуляции и рефлексии",
      instructions: [
        "Pre-Task Planning: \"What strategy will I use and what might go wrong?\"",
        "During-Task Monitoring: \"Am I making progress? Does this answer make physical sense?\"",
        "Post-Task Evaluation: \"What would I do differently next time and why?\""
],
      ruInstructions: [
        "Планирование: \"Какую стратегию я выберу и где кроются главные риски?\"",
        "Мониторинг: \"Приближаюсь ли я к цели? Выглядит ли промежуточный результат правдоподобным?\"",
        "Оценка: \"Что сработало отлично, а что стоит изменить в следующий раз?\""
],
      semanticType: "process_directive",
      tags: ["education","metacognition","self-regulation","learning-how-to-learn","reflection"],
    }),
  },

  "simulation-roleplay-scenario-evaluator": {
    id: "simulation-roleplay-scenario-evaluator",
    name: "SimulationRoleplayScenarioEvaluatorSkill",
    displayName: "Branching Scenario Simulation & Crisis Roleplay",
    categoryId: "education",
    description: "Creates branching decision-tree simulations where user choices alter the narrative trajectory with realistic consequences.",
    tags: ["education","simulations","branching-scenarios","roleplay","experiential-learning"],
    transform: createStandardSkillTransform({
      sectionName: "Branching Scenario Simulation",
      ruSectionName: "Ветвящиеся симуляции и кризисные ролевые сценарии",
      instructions: [
        "Define a realistic dilemma with 3-4 viable actions, each carrying distinct hidden trade-offs.",
        "Branch the scenario dynamically based on choices without revealing immediate scoring.",
        "Provide an analytical post-simulation timeline detailing why outcomes materialized."
],
      ruInstructions: [
        "Опишите острую ситуацию с 3-4 вариантами действий, несущими разные компромиссы.",
        "Развивайте сюжет в зависимости от решений пользователя без прямых подсказок.",
        "Предоставьте детальный таймлайн разбора последствий после завершения ветки."
],
      semanticType: "process_directive",
      tags: ["education","simulations","branching-scenarios","roleplay","experiential-learning"],
    }),
  },

  "retrieval-practice-low-stakes-testing": {
    id: "retrieval-practice-low-stakes-testing",
    name: "RetrievalPracticeLowStakesTestingSkill",
    displayName: "Retrieval Practice & Testing Effect Optimization",
    categoryId: "education",
    description: "Leverages the Testing Effect (active memory retrieval vs passive rereading) through frequent, low-stakes formative challenges.",
    tags: ["education","retrieval-practice","testing-effect","memory-consolidation","active-recall"],
    transform: createStandardSkillTransform({
      sectionName: "Active Retrieval Practice Protocol",
      ruSectionName: "Протокол активного извлечения из памяти (Retrieval Practice)",
      instructions: [
        "Force active recall without notes before reviewing reference solutions.",
        "Space quick recall prompts across subsequent days to strengthen synaptic consolidation.",
        "Emphasize low-stakes diagnostic feedback rather than punitive grading."
],
      ruInstructions: [
        "Требуйте воспроизведения понятий по памяти до открытия конспекта.",
        "Распределяйте мини-проверки по дням для долгосрочной консолидации памяти.",
        "Используйте тестирование как развивающий инструмент, а не карательный экзамен."
],
      semanticType: "process_directive",
      tags: ["education","retrieval-practice","testing-effect","memory-consolidation","active-recall"],
    }),
  },

  "cognitive-apprenticeship-modeling-coaching": {
    id: "cognitive-apprenticeship-modeling-coaching",
    name: "CognitiveApprenticeshipModelingCoachingSkill",
    displayName: "Cognitive Apprenticeship (Collins, Brown & Newman)",
    categoryId: "education",
    description: "Makes expert tacit thought processes visible through Modeling, Coaching, Scaffolding, Articulation, Reflection, and Exploration.",
    tags: ["education","cognitive-apprenticeship","mentorship","expert-modeling","pedagogy"],
    transform: createStandardSkillTransform({
      sectionName: "Cognitive Apprenticeship Framework",
      ruSectionName: "Фреймворк когнитивного ученичества (Modeling & Coaching)",
      instructions: [
        "Modeling: The expert \"thinks aloud\" while navigating real-world ambiguity and errors.",
        "Coaching & Scaffolding: Observe student attempts, stepping in only at critical stumbling blocks.",
        "Articulation & Reflection: Prompt the student to defend their reasoning and compare against expert models."
],
      ruInstructions: [
        "Modeling: Эксперт решает задачу, озвучивая ход мыслей, сомнения и проверку гипотез.",
        "Coaching: Наблюдайте за работой ученика, вмешиваясь только в моменты затыков.",
        "Reflection: Попросите ученика сравнить свои действия с подходом эксперта."
],
      semanticType: 'protocol',
      tags: ["education","cognitive-apprenticeship","mentorship","expert-modeling","pedagogy"],
    }),
  },

  "storytelling-narrative-pedagogy-anchor": {
    id: "storytelling-narrative-pedagogy-anchor",
    name: "StorytellingNarrativePedagogyAnchorSkill",
    displayName: "Narrative Pedagogy & Storytelling Anchors",
    categoryId: "education",
    description: "Embeds dry technical concepts into emotional, high-stakes human stories and historical breakthrough narratives.",
    tags: ["education","storytelling","narrative-pedagogy","engagement","memory-anchors"],
    transform: createStandardSkillTransform({
      sectionName: "Narrative Pedagogy Story Anchor",
      ruSectionName: "Нарративная педагогика и сюжетные якоря",
      instructions: [
        "Frame the technical problem around the historical human crisis that prompted its invention.",
        "Introduce relatable protagonists, dramatic failures, and eureka breakthroughs.",
        "Anchor abstract formulas directly to characters and tangible stakes in the narrative."
],
      ruInstructions: [
        "Поместите сухую концепцию в контекст реальной исторической драмы или кризиса.",
        "Опишите попытки героев, их ошибки и момент озарения.",
        "Привяжите абстрактные формулы к сюжетным поворотным точкам."
],
      semanticType: "process_directive",
      tags: ["education","storytelling","narrative-pedagogy","engagement","memory-anchors"],
    }),
  },

  "adaptive-learning-path-branching-engine": {
    id: "adaptive-learning-path-branching-engine",
    name: "AdaptiveLearningPathBranchingEngineSkill",
    displayName: "Adaptive Knowledge Graph & Learning Path Engine",
    categoryId: "education",
    description: "Maps concept prerequisite dependency graphs to dynamically route learners through remedial or accelerated tracks.",
    tags: ["education","adaptive-learning","knowledge-graph","personalized-path","prerequisites"],
    transform: createStandardSkillTransform({
      sectionName: "Adaptive Learning Path Routing",
      ruSectionName: "Маршрутизация адаптивных траекторий на графе знаний",
      instructions: [
        "Model course concepts as a Directed Acyclic Graph (DAG) of prerequisite competencies.",
        "Diagnose root cause prerequisite gaps when a student fails a downstream unit.",
        "Route the student to targeted remedial micro-modules before re-attempting the target concept."
],
      ruInstructions: [
        "Сформируйте граф понятий (DAG) с указанием зависимостей и пререквизитов.",
        "При ошибке в сложной теме локализуйте пробел в базовых узлах графа.",
        "Перенаправьте студента на микро-модуль устранения конкретного пробела."
],
      semanticType: "process_directive",
      tags: ["education","adaptive-learning","knowledge-graph","personalized-path","prerequisites"],
    }),
  },
  "education-bloom-taxonomy-cognitive-depth-scaffolding": {
    id: "education-bloom-taxonomy-cognitive-depth-scaffolding",
    name: "BloomTaxonomyCognitiveDepthScaffoldingSkill",
    displayName: "Bloom Taxonomy Cognitive Depth Scaffolding",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Bloom Taxonomy Cognitive Depth Scaffolding.",
    tags: ["education","bloom","taxonomy","cognitive"],
    transform: createStandardSkillTransform({
      sectionName: "Bloom Taxonomy Scaffolding Standards",
      ruSectionName: "Стандарты и практические требования: Bloom Taxonomy Cognitive Depth Scaffolding",
      instructions: [
        "Apply core domain tenets and industry best practices for Bloom Taxonomy Cognitive Depth Scaffolding.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Bloom Taxonomy Cognitive Depth Scaffolding.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","bloom","taxonomy","cognitive"],
    }),
  },

  "education-feynman-technique-radical-concept-simplification": {
    id: "education-feynman-technique-radical-concept-simplification",
    name: "FeynmanTechniqueRadicalConceptSimplificationSkill",
    displayName: "Feynman Technique Radical Concept Simplification",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Feynman Technique Radical Concept Simplification.",
    tags: ["education","feynman","technique","radical"],
    transform: createStandardSkillTransform({
      sectionName: "Feynman Simplification Protocol",
      ruSectionName: "Стандарты и практические требования: Feynman Technique Radical Concept Simplification",
      instructions: [
        "Apply core domain tenets and industry best practices for Feynman Technique Radical Concept Simplification.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Feynman Technique Radical Concept Simplification.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","feynman","technique","radical"],
    }),
  },

  "education-spaced-repetition-leitner-system-schedule": {
    id: "education-spaced-repetition-leitner-system-schedule",
    name: "SpacedRepetitionLeitnerSystemScheduleSkill",
    displayName: "Spaced Repetition & Leitner System Schedule",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Spaced Repetition & Leitner System Schedule.",
    tags: ["education","spaced","repetition","leitner"],
    transform: createStandardSkillTransform({
      sectionName: "Spaced Repetition Scheduling Protocol",
      ruSectionName: "Стандарты и практические требования: Spaced Repetition & Leitner System Schedule",
      instructions: [
        "Apply core domain tenets and industry best practices for Spaced Repetition & Leitner System Schedule.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Spaced Repetition & Leitner System Schedule.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","spaced","repetition","leitner"],
    }),
  },

  "education-cognitive-load-theory-working-memory-limits": {
    id: "education-cognitive-load-theory-working-memory-limits",
    name: "CognitiveLoadTheoryWorkingMemoryLimitsSkill",
    displayName: "Cognitive Load Theory Working Memory Limits",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Cognitive Load Theory Working Memory Limits.",
    tags: ["education","cognitive","load","theory"],
    transform: createStandardSkillTransform({
      sectionName: "Cognitive Load Management Standards",
      ruSectionName: "Стандарты и практические требования: Cognitive Load Theory Working Memory Limits",
      instructions: [
        "Apply core domain tenets and industry best practices for Cognitive Load Theory Working Memory Limits.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Cognitive Load Theory Working Memory Limits.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","cognitive","load","theory"],
    }),
  },

  "education-inquiry-based-learning-scientific-method": {
    id: "education-inquiry-based-learning-scientific-method",
    name: "InquiryBasedLearningScientificMethodSkill",
    displayName: "Inquiry-Based Learning Scientific Method",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Inquiry-Based Learning Scientific Method.",
    tags: ["education","inquiry","based","learning"],
    transform: createStandardSkillTransform({
      sectionName: "Inquiry-Based Learning Blueprint",
      ruSectionName: "Стандарты и практические требования: Inquiry-Based Learning Scientific Method",
      instructions: [
        "Apply core domain tenets and industry best practices for Inquiry-Based Learning Scientific Method.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Inquiry-Based Learning Scientific Method.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","inquiry","based","learning"],
    }),
  },

  "education-gamified-formative-assessment-quizzes": {
    id: "education-gamified-formative-assessment-quizzes",
    name: "GamifiedFormativeAssessmentQuizzesSkill",
    displayName: "Gamified Formative Assessment Quizzes",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Gamified Formative Assessment Quizzes.",
    tags: ["education","gamified","formative","assessment"],
    transform: createStandardSkillTransform({
      sectionName: "Gamified Assessment Standards",
      ruSectionName: "Стандарты и практические требования: Gamified Formative Assessment Quizzes",
      instructions: [
        "Apply core domain tenets and industry best practices for Gamified Formative Assessment Quizzes.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Gamified Formative Assessment Quizzes.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","gamified","formative","assessment"],
    }),
  },

  "education-universal-design-for-learning-udl-accessibility": {
    id: "education-universal-design-for-learning-udl-accessibility",
    name: "UniversalDesignforLearningUDLAccessibilitySkill",
    displayName: "Universal Design for Learning (UDL) Accessibility",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Universal Design for Learning (UDL) Accessibility.",
    tags: ["education","universal","design","for"],
    transform: createStandardSkillTransform({
      sectionName: "UDL Educational Accessibility Protocol",
      ruSectionName: "Стандарты и практические требования: Universal Design for Learning (UDL) Accessibility",
      instructions: [
        "Apply core domain tenets and industry best practices for Universal Design for Learning (UDL) Accessibility.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Universal Design for Learning (UDL) Accessibility.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","universal","design","for"],
    }),
  },

  "education-socratic-seminar-critical-inquiry-circles": {
    id: "education-socratic-seminar-critical-inquiry-circles",
    name: "SocraticSeminarCriticalInquiryCirclesSkill",
    displayName: "Socratic Seminar Critical Inquiry Circles",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Socratic Seminar Critical Inquiry Circles.",
    tags: ["education","socratic","seminar","critical"],
    transform: createStandardSkillTransform({
      sectionName: "Socratic Seminar Circles Standards",
      ruSectionName: "Стандарты и практические требования: Socratic Seminar Critical Inquiry Circles",
      instructions: [
        "Apply core domain tenets and industry best practices for Socratic Seminar Critical Inquiry Circles.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Socratic Seminar Critical Inquiry Circles.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","socratic","seminar","critical"],
    }),
  },

  "education-problem-based-learning-case-challenges": {
    id: "education-problem-based-learning-case-challenges",
    name: "ProblemBasedLearningCaseChallengesSkill",
    displayName: "Problem-Based Learning Case Challenges",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Problem-Based Learning Case Challenges.",
    tags: ["education","problem","based","learning"],
    transform: createStandardSkillTransform({
      sectionName: "Problem-Based Learning Protocol",
      ruSectionName: "Стандарты и практические требования: Problem-Based Learning Case Challenges",
      instructions: [
        "Apply core domain tenets and industry best practices for Problem-Based Learning Case Challenges.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Problem-Based Learning Case Challenges.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","problem","based","learning"],
    }),
  },

  "education-scaffolded-worked-examples-step-by-step": {
    id: "education-scaffolded-worked-examples-step-by-step",
    name: "ScaffoldedWorkedExamplesStepbyStepSkill",
    displayName: "Scaffolded Worked Examples Step-by-Step",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Scaffolded Worked Examples Step-by-Step.",
    tags: ["education","scaffolded","worked","examples"],
    transform: createStandardSkillTransform({
      sectionName: "Worked Examples Scaffolding Blueprint",
      ruSectionName: "Стандарты и практические требования: Scaffolded Worked Examples Step-by-Step",
      instructions: [
        "Apply core domain tenets and industry best practices for Scaffolded Worked Examples Step-by-Step.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Scaffolded Worked Examples Step-by-Step.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","scaffolded","worked","examples"],
    }),
  },

  "education-metacognitive-self-reflection-prompting": {
    id: "education-metacognitive-self-reflection-prompting",
    name: "MetacognitiveSelfReflectionPromptingSkill",
    displayName: "Metacognitive Self-Reflection Prompting",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Metacognitive Self-Reflection Prompting.",
    tags: ["education","metacognitive","self","reflection"],
    transform: createStandardSkillTransform({
      sectionName: "Metacognitive Reflection Standards",
      ruSectionName: "Стандарты и практические требования: Metacognitive Self-Reflection Prompting",
      instructions: [
        "Apply core domain tenets and industry best practices for Metacognitive Self-Reflection Prompting.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Metacognitive Self-Reflection Prompting.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","metacognitive","self","reflection"],
    }),
  },

  "education-flipped-classroom-interactive-exploration": {
    id: "education-flipped-classroom-interactive-exploration",
    name: "FlippedClassroomInteractiveExplorationSkill",
    displayName: "Flipped Classroom Interactive Exploration",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Flipped Classroom Interactive Exploration.",
    tags: ["education","flipped","classroom","interactive"],
    transform: createStandardSkillTransform({
      sectionName: "Flipped Classroom Architecture",
      ruSectionName: "Стандарты и практические требования: Flipped Classroom Interactive Exploration",
      instructions: [
        "Apply core domain tenets and industry best practices for Flipped Classroom Interactive Exploration.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Flipped Classroom Interactive Exploration.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","flipped","classroom","interactive"],
    }),
  },

  "education-differentiated-instruction-tiered-lessons": {
    id: "education-differentiated-instruction-tiered-lessons",
    name: "DifferentiatedInstructionTieredLessonsSkill",
    displayName: "Differentiated Instruction Tiered Lessons",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Differentiated Instruction Tiered Lessons.",
    tags: ["education","differentiated","instruction","tiered"],
    transform: createStandardSkillTransform({
      sectionName: "Differentiated Instruction Protocol",
      ruSectionName: "Стандарты и практические требования: Differentiated Instruction Tiered Lessons",
      instructions: [
        "Apply core domain tenets and industry best practices for Differentiated Instruction Tiered Lessons.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Differentiated Instruction Tiered Lessons.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","differentiated","instruction","tiered"],
    }),
  },

  "education-peer-instruction-mazur-concept-tests": {
    id: "education-peer-instruction-mazur-concept-tests",
    name: "PeerInstructionMazurConceptTestsSkill",
    displayName: "Peer Instruction & Mazur Concept Tests",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Peer Instruction & Mazur Concept Tests.",
    tags: ["education","peer","instruction","mazur"],
    transform: createStandardSkillTransform({
      sectionName: "Peer Instruction Mazur Standards",
      ruSectionName: "Стандарты и практические требования: Peer Instruction & Mazur Concept Tests",
      instructions: [
        "Apply core domain tenets and industry best practices for Peer Instruction & Mazur Concept Tests.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Peer Instruction & Mazur Concept Tests.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","peer","instruction","mazur"],
    }),
  },

  "education-direct-instruction-mastery-learning": {
    id: "education-direct-instruction-mastery-learning",
    name: "DirectInstructionMasteryLearningSkill",
    displayName: "Direct Instruction Mastery Learning",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Direct Instruction Mastery Learning.",
    tags: ["education","direct","instruction","mastery"],
    transform: createStandardSkillTransform({
      sectionName: "Mastery Learning Protocols",
      ruSectionName: "Стандарты и практические требования: Direct Instruction Mastery Learning",
      instructions: [
        "Apply core domain tenets and industry best practices for Direct Instruction Mastery Learning.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Direct Instruction Mastery Learning.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","direct","instruction","mastery"],
    }),
  },

  "education-experiential-learning-kolb-cycle": {
    id: "education-experiential-learning-kolb-cycle",
    name: "ExperientialLearningKolbCycleSkill",
    displayName: "Experiential Learning Kolb Cycle",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Experiential Learning Kolb Cycle.",
    tags: ["education","experiential","learning","kolb"],
    transform: createStandardSkillTransform({
      sectionName: "Kolb Experiential Cycle Blueprint",
      ruSectionName: "Стандарты и практические требования: Experiential Learning Kolb Cycle",
      instructions: [
        "Apply core domain tenets and industry best practices for Experiential Learning Kolb Cycle.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Experiential Learning Kolb Cycle.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","experiential","learning","kolb"],
    }),
  },

  "education-story-driven-mnemonic-memory-palaces": {
    id: "education-story-driven-mnemonic-memory-palaces",
    name: "StoryDrivenMnemonicMemoryPalacesSkill",
    displayName: "Story-Driven Mnemonic Memory Palaces",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Story-Driven Mnemonic Memory Palaces.",
    tags: ["education","story","driven","mnemonic"],
    transform: createStandardSkillTransform({
      sectionName: "Mnemonic Memory Palace Standards",
      ruSectionName: "Стандарты и практические требования: Story-Driven Mnemonic Memory Palaces",
      instructions: [
        "Apply core domain tenets and industry best practices for Story-Driven Mnemonic Memory Palaces.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Story-Driven Mnemonic Memory Palaces.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","story","driven","mnemonic"],
    }),
  },

  "education-zone-of-proximal-development-zpd-calibrator": {
    id: "education-zone-of-proximal-development-zpd-calibrator",
    name: "ZoneofProximalDevelopmentZPDCalibratorSkill",
    displayName: "Zone of Proximal Development (ZPD) Calibrator",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Zone of Proximal Development (ZPD) Calibrator.",
    tags: ["education","zone","of","proximal"],
    transform: createStandardSkillTransform({
      sectionName: "ZPD Calibration Protocol",
      ruSectionName: "Стандарты и практические требования: Zone of Proximal Development (ZPD) Calibrator",
      instructions: [
        "Apply core domain tenets and industry best practices for Zone of Proximal Development (ZPD) Calibrator.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Zone of Proximal Development (ZPD) Calibrator.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","zone","of","proximal"],
    }),
  },

  "education-formative-rubric-scoring-actionable-feedback": {
    id: "education-formative-rubric-scoring-actionable-feedback",
    name: "FormativeRubricScoringActionableFeedbackSkill",
    displayName: "Formative Rubric Scoring & Actionable Feedback",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Formative Rubric Scoring & Actionable Feedback.",
    tags: ["education","formative","rubric","scoring"],
    transform: createStandardSkillTransform({
      sectionName: "Formative Rubric Feedback Standards",
      ruSectionName: "Стандарты и практические требования: Formative Rubric Scoring & Actionable Feedback",
      instructions: [
        "Apply core domain tenets and industry best practices for Formative Rubric Scoring & Actionable Feedback.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Formative Rubric Scoring & Actionable Feedback.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","formative","rubric","scoring"],
    }),
  },

  "education-interleaved-practice-problem-sets": {
    id: "education-interleaved-practice-problem-sets",
    name: "InterleavedPracticeProblemSetsSkill",
    displayName: "Interleaved Practice Problem Sets",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Interleaved Practice Problem Sets.",
    tags: ["education","interleaved","practice","problem"],
    transform: createStandardSkillTransform({
      sectionName: "Interleaved Practice Standards",
      ruSectionName: "Стандарты и практические требования: Interleaved Practice Problem Sets",
      instructions: [
        "Apply core domain tenets and industry best practices for Interleaved Practice Problem Sets.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Interleaved Practice Problem Sets.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","interleaved","practice","problem"],
    }),
  },

  "education-project-based-learning-showcase-milestones": {
    id: "education-project-based-learning-showcase-milestones",
    name: "ProjectBasedLearningShowcaseMilestonesSkill",
    displayName: "Project-Based Learning Showcase Milestones",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Project-Based Learning Showcase Milestones.",
    tags: ["education","project","based","learning"],
    transform: createStandardSkillTransform({
      sectionName: "Project-Based Learning Framework",
      ruSectionName: "Стандарты и практические требования: Project-Based Learning Showcase Milestones",
      instructions: [
        "Apply core domain tenets and industry best practices for Project-Based Learning Showcase Milestones.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Project-Based Learning Showcase Milestones.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","project","based","learning"],
    }),
  },

  "education-dual-coding-theory-visual-verbal-harmony": {
    id: "education-dual-coding-theory-visual-verbal-harmony",
    name: "DualCodingTheoryVisualVerbalHarmonySkill",
    displayName: "Dual Coding Theory Visual-Verbal Harmony",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Dual Coding Theory Visual-Verbal Harmony.",
    tags: ["education","dual","coding","theory"],
    transform: createStandardSkillTransform({
      sectionName: "Dual Coding Visual-Verbal Protocol",
      ruSectionName: "Стандарты и практические требования: Dual Coding Theory Visual-Verbal Harmony",
      instructions: [
        "Apply core domain tenets and industry best practices for Dual Coding Theory Visual-Verbal Harmony.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Dual Coding Theory Visual-Verbal Harmony.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","dual","coding","theory"],
    }),
  },

  "education-concept-mapping-hierarchical-schemas": {
    id: "education-concept-mapping-hierarchical-schemas",
    name: "ConceptMappingHierarchicalSchemasSkill",
    displayName: "Concept Mapping Hierarchical Schemas",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Concept Mapping Hierarchical Schemas.",
    tags: ["education","concept","mapping","hierarchical"],
    transform: createStandardSkillTransform({
      sectionName: "Concept Mapping Hierarchy Standards",
      ruSectionName: "Стандарты и практические требования: Concept Mapping Hierarchical Schemas",
      instructions: [
        "Apply core domain tenets and industry best practices for Concept Mapping Hierarchical Schemas.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Concept Mapping Hierarchical Schemas.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","concept","mapping","hierarchical"],
    }),
  },

  "education-growth-mindset-productive-struggle-cues": {
    id: "education-growth-mindset-productive-struggle-cues",
    name: "GrowthMindsetProductiveStruggleCuesSkill",
    displayName: "Growth Mindset Productive Struggle Cues",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Growth Mindset Productive Struggle Cues.",
    tags: ["education","growth","mindset","productive"],
    transform: createStandardSkillTransform({
      sectionName: "Productive Struggle Coaching Protocol",
      ruSectionName: "Стандарты и практические требования: Growth Mindset Productive Struggle Cues",
      instructions: [
        "Apply core domain tenets and industry best practices for Growth Mindset Productive Struggle Cues.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Growth Mindset Productive Struggle Cues.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","growth","mindset","productive"],
    }),
  },

  "education-real-world-scenario-roleplay-simulation": {
    id: "education-real-world-scenario-roleplay-simulation",
    name: "RealWorldScenarioRoleplaySimulationSkill",
    displayName: "Real-World Scenario Roleplay Simulation",
    categoryId: "education",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Real-World Scenario Roleplay Simulation.",
    tags: ["education","real","world","scenario"],
    transform: createStandardSkillTransform({
      sectionName: "Scenario Simulation Learning Blueprint",
      ruSectionName: "Стандарты и практические требования: Real-World Scenario Roleplay Simulation",
      instructions: [
        "Apply core domain tenets and industry best practices for Real-World Scenario Roleplay Simulation.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Real-World Scenario Roleplay Simulation.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["education","real","world","scenario"],
    }),
  },
  "education-bloom-taxonomy-cognitive-scaffolding": {
    id: "education-bloom-taxonomy-cognitive-scaffolding",
    name: "BloomTaxonomyCognitiveScaffoldingSkill",
    displayName: "Bloom Taxonomy Cognitive Scaffolding",
    categoryId: "education",
    description: "Scaffolds learning from Remember -> Understand -> Apply -> Analyze -> Evaluate -> Create.",
    tags: ["education","education","bloom","taxonomy"],
    transform: createStandardSkillTransform({
      sectionName: "Bloom Taxonomy Cognitive Scaffolding Standards",
      ruSectionName: "Стандарты и регламенты: Bloom Taxonomy Cognitive Scaffolding",
      instructions: [
        "Apply core domain tenets for Bloom Taxonomy Cognitive Scaffolding.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Bloom Taxonomy Cognitive Scaffolding.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","bloom","taxonomy"],
    }),
  },

  "education-feynman-radical-concept-simplification": {
    id: "education-feynman-radical-concept-simplification",
    name: "FeynmanRadicalConceptSimplificationSkill",
    displayName: "Feynman Radical Concept Simplification",
    categoryId: "education",
    description: "Simplifies complex scientific topics so a 12-year-old can understand without jargon.",
    tags: ["education","education","feynman","radical"],
    transform: createStandardSkillTransform({
      sectionName: "Feynman Radical Concept Simplification Standards",
      ruSectionName: "Стандарты и регламенты: Feynman Radical Concept Simplification",
      instructions: [
        "Apply core domain tenets for Feynman Radical Concept Simplification.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Feynman Radical Concept Simplification.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","feynman","radical"],
    }),
  },

  "education-spaced-repetition-leitner-box-schedule": {
    id: "education-spaced-repetition-leitner-box-schedule",
    name: "SpacedRepetitionLeitnerBoxScheduleSkill",
    displayName: "Spaced Repetition & Leitner Box Schedule",
    categoryId: "education",
    description: "Schedules review intervals based on memory decay curves to maximize retention.",
    tags: ["education","education","spaced","repetition"],
    transform: createStandardSkillTransform({
      sectionName: "Spaced Repetition & Leitner Box Schedule Standards",
      ruSectionName: "Стандарты и регламенты: Spaced Repetition & Leitner Box Schedule",
      instructions: [
        "Apply core domain tenets for Spaced Repetition & Leitner Box Schedule.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Spaced Repetition & Leitner Box Schedule.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","spaced","repetition"],
    }),
  },

  "education-cognitive-load-working-memory-limits": {
    id: "education-cognitive-load-working-memory-limits",
    name: "CognitiveLoadWorkingMemoryLimitsSkill",
    displayName: "Cognitive Load Working Memory Limits",
    categoryId: "education",
    description: "Manages intrinsic, extraneous, and germane cognitive load in instructional design.",
    tags: ["education","education","cognitive","load"],
    transform: createStandardSkillTransform({
      sectionName: "Cognitive Load Working Memory Limits Standards",
      ruSectionName: "Стандарты и регламенты: Cognitive Load Working Memory Limits",
      instructions: [
        "Apply core domain tenets for Cognitive Load Working Memory Limits.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cognitive Load Working Memory Limits.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","cognitive","load"],
    }),
  },

  "education-inquiry-based-learning-scientific-discovery": {
    id: "education-inquiry-based-learning-scientific-discovery",
    name: "InquiryBasedLearningScientificDiscoverySkill",
    displayName: "Inquiry-Based Learning Scientific Discovery",
    categoryId: "education",
    description: "Guides students through hypothesis formation, experimentation, and data analysis.",
    tags: ["education","education","inquiry","based"],
    transform: createStandardSkillTransform({
      sectionName: "Inquiry-Based Learning Scientific Discovery Standards",
      ruSectionName: "Стандарты и регламенты: Inquiry-Based Learning Scientific Discovery",
      instructions: [
        "Apply core domain tenets for Inquiry-Based Learning Scientific Discovery.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Inquiry-Based Learning Scientific Discovery.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","inquiry","based"],
    }),
  },

  "education-gamified-formative-quiz-feedback": {
    id: "education-gamified-formative-quiz-feedback",
    name: "GamifiedFormativeQuizFeedbackSkill",
    displayName: "Gamified Formative Quiz & Feedback",
    categoryId: "education",
    description: "Designs low-stakes interactive quizzes providing instant corrective feedback.",
    tags: ["education","education","gamified","formative"],
    transform: createStandardSkillTransform({
      sectionName: "Gamified Formative Quiz & Feedback Standards",
      ruSectionName: "Стандарты и регламенты: Gamified Formative Quiz & Feedback",
      instructions: [
        "Apply core domain tenets for Gamified Formative Quiz & Feedback.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Gamified Formative Quiz & Feedback.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","gamified","formative"],
    }),
  },

  "education-universal-design-for-learning-udl": {
    id: "education-universal-design-for-learning-udl",
    name: "UniversalDesignforLearningUDLSkill",
    displayName: "Universal Design for Learning (UDL)",
    categoryId: "education",
    description: "Provides multiple means of Engagement, Representation, and Action/Expression.",
    tags: ["education","education","universal","design"],
    transform: createStandardSkillTransform({
      sectionName: "Universal Design for Learning (UDL) Standards",
      ruSectionName: "Стандарты и регламенты: Universal Design for Learning (UDL)",
      instructions: [
        "Apply core domain tenets for Universal Design for Learning (UDL).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Universal Design for Learning (UDL).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","universal","design"],
    }),
  },

  "education-problem-based-case-challenge-learning": {
    id: "education-problem-based-case-challenge-learning",
    name: "ProblemBasedCaseChallengeLearningSkill",
    displayName: "Problem-Based Case Challenge Learning",
    categoryId: "education",
    description: "Presents messy real-world scenarios for small team collaborative problem-solving.",
    tags: ["education","education","problem","based"],
    transform: createStandardSkillTransform({
      sectionName: "Problem-Based Case Challenge Learning Standards",
      ruSectionName: "Стандарты и регламенты: Problem-Based Case Challenge Learning",
      instructions: [
        "Apply core domain tenets for Problem-Based Case Challenge Learning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Problem-Based Case Challenge Learning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","problem","based"],
    }),
  },

  "education-differentiated-tiered-instruction": {
    id: "education-differentiated-tiered-instruction",
    name: "DifferentiatedTieredInstructionSkill",
    displayName: "Differentiated Tiered Instruction",
    categoryId: "education",
    description: "Adapts lesson complexity and support levels for diverse learner readiness tiers.",
    tags: ["education","education","differentiated","tiered"],
    transform: createStandardSkillTransform({
      sectionName: "Differentiated Tiered Instruction Standards",
      ruSectionName: "Стандарты и регламенты: Differentiated Tiered Instruction",
      instructions: [
        "Apply core domain tenets for Differentiated Tiered Instruction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Differentiated Tiered Instruction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","differentiated","tiered"],
    }),
  },

  "education-formative-rubric-scoring-feedback": {
    id: "education-formative-rubric-scoring-feedback",
    name: "FormativeRubricScoringFeedbackSkill",
    displayName: "Formative Rubric Scoring & Feedback",
    categoryId: "education",
    description: "Evaluates student work using clear analytic rubrics paired with actionable next steps.",
    tags: ["education","education","formative","rubric"],
    transform: createStandardSkillTransform({
      sectionName: "Formative Rubric Scoring & Feedback Standards",
      ruSectionName: "Стандарты и регламенты: Formative Rubric Scoring & Feedback",
      instructions: [
        "Apply core domain tenets for Formative Rubric Scoring & Feedback.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Formative Rubric Scoring & Feedback.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","formative","rubric"],
    }),
  },

  "education-retrieval-practice-active-flashcard-recall": {
    id: "education-retrieval-practice-active-flashcard-recall",
    name: "RetrievalPracticeActiveFlashcardRecallSkill",
    displayName: "Retrieval Practice Active Flashcard Recall",
    categoryId: "education",
    description: "Uses active recall quizzes rather than passive re-reading to solidify memory.",
    tags: ["education","education","retrieval","practice"],
    transform: createStandardSkillTransform({
      sectionName: "Retrieval Practice Active Flashcard Recall Standards",
      ruSectionName: "Стандарты и регламенты: Retrieval Practice Active Flashcard Recall",
      instructions: [
        "Apply core domain tenets for Retrieval Practice Active Flashcard Recall.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Retrieval Practice Active Flashcard Recall.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","retrieval","practice"],
    }),
  },

  "education-adaptive-learning-individualized-pace": {
    id: "education-adaptive-learning-individualized-pace",
    name: "AdaptiveLearningIndividualizedPaceSkill",
    displayName: "Adaptive Learning Individualized Pace",
    categoryId: "education",
    description: "Dynamically adjusts curriculum difficulty based on real-time student performance.",
    tags: ["education","education","adaptive","learning"],
    transform: createStandardSkillTransform({
      sectionName: "Adaptive Learning Individualized Pace Standards",
      ruSectionName: "Стандарты и регламенты: Adaptive Learning Individualized Pace",
      instructions: [
        "Apply core domain tenets for Adaptive Learning Individualized Pace.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Adaptive Learning Individualized Pace.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","adaptive","learning"],
    }),
  },

  "education-elaborative-interrogation-why-questions": {
    id: "education-elaborative-interrogation-why-questions",
    name: "ElaborativeInterrogationWhyQuestionsSkill",
    displayName: "Elaborative Interrogation 'Why' Questions",
    categoryId: "education",
    description: "Prompts learners to explain why facts are true to deepen conceptual encoding.",
    tags: ["education","education","elaborative","interrogation"],
    transform: createStandardSkillTransform({
      sectionName: "Elaborative Interrogation 'Why' Questions Standards",
      ruSectionName: "Стандарты и регламенты: Elaborative Interrogation 'Why' Questions",
      instructions: [
        "Apply core domain tenets for Elaborative Interrogation 'Why' Questions.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Elaborative Interrogation 'Why' Questions.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","elaborative","interrogation"],
    }),
  },

  "education-explicit-schema-activation-warm-up": {
    id: "education-explicit-schema-activation-warm-up",
    name: "ExplicitSchemaActivationWarmUpSkill",
    displayName: "Explicit Schema Activation Warm-Up",
    categoryId: "education",
    description: "Activates prior knowledge before introducing new complex academic concepts.",
    tags: ["education","education","explicit","schema"],
    transform: createStandardSkillTransform({
      sectionName: "Explicit Schema Activation Warm-Up Standards",
      ruSectionName: "Стандарты и регламенты: Explicit Schema Activation Warm-Up",
      instructions: [
        "Apply core domain tenets for Explicit Schema Activation Warm-Up.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Explicit Schema Activation Warm-Up.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","explicit","schema"],
    }),
  },

  "education-anchor-based-instruction-video-context": {
    id: "education-anchor-based-instruction-video-context",
    name: "AnchorBasedInstructionVideoContextSkill",
    displayName: "Anchor Based Instruction Video Context",
    categoryId: "education",
    description: "Anchors math and science learning in engaging video-based adventure contexts.",
    tags: ["education","education","anchor","based"],
    transform: createStandardSkillTransform({
      sectionName: "Anchor Based Instruction Video Context Standards",
      ruSectionName: "Стандарты и регламенты: Anchor Based Instruction Video Context",
      instructions: [
        "Apply core domain tenets for Anchor Based Instruction Video Context.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Anchor Based Instruction Video Context.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","anchor","based"],
    }),
  },

  "education-peer-tutoring-cross-age-buddy-system": {
    id: "education-peer-tutoring-cross-age-buddy-system",
    name: "PeerTutoringCrossAgeBuddySystemSkill",
    displayName: "Peer Tutoring Cross-Age Buddy System",
    categoryId: "education",
    description: "Pairs older students with younger peers to reinforce mastery through teaching.",
    tags: ["education","education","peer","tutoring"],
    transform: createStandardSkillTransform({
      sectionName: "Peer Tutoring Cross-Age Buddy System Standards",
      ruSectionName: "Стандарты и регламенты: Peer Tutoring Cross-Age Buddy System",
      instructions: [
        "Apply core domain tenets for Peer Tutoring Cross-Age Buddy System.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Peer Tutoring Cross-Age Buddy System.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","peer","tutoring"],
    }),
  },

  "education-micro-learning-bitesized-video-modules": {
    id: "education-micro-learning-bitesized-video-modules",
    name: "MicroLearningBitesizedVideoModulesSkill",
    displayName: "Micro-Learning Bitesized Video Modules",
    categoryId: "education",
    description: "Breaks complex courses into 3-5 minute self-contained video learning modules.",
    tags: ["education","education","micro","learning"],
    transform: createStandardSkillTransform({
      sectionName: "Micro-Learning Bitesized Video Modules Standards",
      ruSectionName: "Стандарты и регламенты: Micro-Learning Bitesized Video Modules",
      instructions: [
        "Apply core domain tenets for Micro-Learning Bitesized Video Modules.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Micro-Learning Bitesized Video Modules.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","micro","learning"],
    }),
  },

  "education-rubric-co-creation-student-ownership": {
    id: "education-rubric-co-creation-student-ownership",
    name: "RubricCoCreationStudentOwnershipSkill",
    displayName: "Rubric Co-Creation Student Ownership",
    categoryId: "education",
    description: "Involves students in co-creating grading rubrics to build ownership of quality.",
    tags: ["education","education","rubric","co"],
    transform: createStandardSkillTransform({
      sectionName: "Rubric Co-Creation Student Ownership Standards",
      ruSectionName: "Стандарты и регламенты: Rubric Co-Creation Student Ownership",
      instructions: [
        "Apply core domain tenets for Rubric Co-Creation Student Ownership.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Rubric Co-Creation Student Ownership.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","rubric","co"],
    }),
  },

  "education-self-regulated-learning-goal-tracking": {
    id: "education-self-regulated-learning-goal-tracking",
    name: "SelfRegulatedLearningGoalTrackingSkill",
    displayName: "Self-Regulated Learning Goal Tracking",
    categoryId: "education",
    description: "Guides students to set weekly learning goals, monitor time, and evaluate progress.",
    tags: ["education","education","self","regulated"],
    transform: createStandardSkillTransform({
      sectionName: "Self-Regulated Learning Goal Tracking Standards",
      ruSectionName: "Стандарты и регламенты: Self-Regulated Learning Goal Tracking",
      instructions: [
        "Apply core domain tenets for Self-Regulated Learning Goal Tracking.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Self-Regulated Learning Goal Tracking.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","self","regulated"],
    }),
  },

  "education-analogical-mapping-conceptual-bridges": {
    id: "education-analogical-mapping-conceptual-bridges",
    name: "AnalogicalMappingConceptualBridgesSkill",
    displayName: "Analogical Mapping Conceptual Bridges",
    categoryId: "education",
    description: "Uses familiar everyday analogies to introduce unintuitive scientific concepts.",
    tags: ["education","education","analogical","mapping"],
    transform: createStandardSkillTransform({
      sectionName: "Analogical Mapping Conceptual Bridges Standards",
      ruSectionName: "Стандарты и регламенты: Analogical Mapping Conceptual Bridges",
      instructions: [
        "Apply core domain tenets for Analogical Mapping Conceptual Bridges.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Analogical Mapping Conceptual Bridges.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","analogical","mapping"],
    }),
  },

  "education-culturally-responsive-teaching-pedagogy": {
    id: "education-culturally-responsive-teaching-pedagogy",
    name: "CulturallyResponsiveTeachingPedagogySkill",
    displayName: "Culturally Responsive Teaching Pedagogy",
    categoryId: "education",
    description: "Connects curriculum content to diverse student cultural backgrounds and experiences.",
    tags: ["education","education","culturally","responsive"],
    transform: createStandardSkillTransform({
      sectionName: "Culturally Responsive Teaching Pedagogy Standards",
      ruSectionName: "Стандарты и регламенты: Culturally Responsive Teaching Pedagogy",
      instructions: [
        "Apply core domain tenets for Culturally Responsive Teaching Pedagogy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Culturally Responsive Teaching Pedagogy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","culturally","responsive"],
    }),
  },

  "education-interactive-science-lab-virtual-simulator": {
    id: "education-interactive-science-lab-virtual-simulator",
    name: "InteractiveScienceLabVirtualSimulatorSkill",
    displayName: "Interactive Science Lab Virtual Simulator",
    categoryId: "education",
    description: "Guides virtual physics and chemistry experiments with parameter controls.",
    tags: ["education","education","interactive","science"],
    transform: createStandardSkillTransform({
      sectionName: "Interactive Science Lab Virtual Simulator Standards",
      ruSectionName: "Стандарты и регламенты: Interactive Science Lab Virtual Simulator",
      instructions: [
        "Apply core domain tenets for Interactive Science Lab Virtual Simulator.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Interactive Science Lab Virtual Simulator.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","interactive","science"],
    }),
  },

  "education-authentic-assessment-real-world-portfolio": {
    id: "education-authentic-assessment-real-world-portfolio",
    name: "AuthenticAssessmentRealWorldPortfolioSkill",
    displayName: "Authentic Assessment Real-World Portfolio",
    categoryId: "education",
    description: "Evaluates student competence through curated portfolios of authentic work.",
    tags: ["education","education","authentic","assessment"],
    transform: createStandardSkillTransform({
      sectionName: "Authentic Assessment Real-World Portfolio Standards",
      ruSectionName: "Стандарты и регламенты: Authentic Assessment Real-World Portfolio",
      instructions: [
        "Apply core domain tenets for Authentic Assessment Real-World Portfolio.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Authentic Assessment Real-World Portfolio.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","authentic","assessment"],
    }),
  },

  "education-socio-emotional-learning-sel-self-awareness": {
    id: "education-socio-emotional-learning-sel-self-awareness",
    name: "SocioEmotionalLearningSELSelfAwarenessSkill",
    displayName: "Socio-Emotional Learning (SEL) Self-Awareness",
    categoryId: "education",
    description: "Integrates emotional regulation, empathy, and relationship building into daily routines.",
    tags: ["education","education","socio","emotional"],
    transform: createStandardSkillTransform({
      sectionName: "Socio-Emotional Learning (SEL) Self-Awareness Standards",
      ruSectionName: "Стандарты и регламенты: Socio-Emotional Learning (SEL) Self-Awareness",
      instructions: [
        "Apply core domain tenets for Socio-Emotional Learning (SEL) Self-Awareness.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Socio-Emotional Learning (SEL) Self-Awareness.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","socio","emotional"],
    }),
  },

  "education-jigsaw-cooperative-expert-group-learning": {
    id: "education-jigsaw-cooperative-expert-group-learning",
    name: "JigsawCooperativeExpertGroupLearningSkill",
    displayName: "Jigsaw Cooperative Expert Group Learning",
    categoryId: "education",
    description: "Divides topics among student 'experts' who teach their section to group members.",
    tags: ["education","education","jigsaw","cooperative"],
    transform: createStandardSkillTransform({
      sectionName: "Jigsaw Cooperative Expert Group Learning Standards",
      ruSectionName: "Стандарты и регламенты: Jigsaw Cooperative Expert Group Learning",
      instructions: [
        "Apply core domain tenets for Jigsaw Cooperative Expert Group Learning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Jigsaw Cooperative Expert Group Learning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","jigsaw","cooperative"],
    }),
  },

  "education-think-pair-share-collaborative-pacing": {
    id: "education-think-pair-share-collaborative-pacing",
    name: "ThinkPairShareCollaborativePacingSkill",
    displayName: "Think-Pair-Share Collaborative Pacing",
    categoryId: "education",
    description: "Allows individual thinking time, peer discussion, and whole-class sharing.",
    tags: ["education","education","think","pair"],
    transform: createStandardSkillTransform({
      sectionName: "Think-Pair-Share Collaborative Pacing Standards",
      ruSectionName: "Стандарты и регламенты: Think-Pair-Share Collaborative Pacing",
      instructions: [
        "Apply core domain tenets for Think-Pair-Share Collaborative Pacing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Think-Pair-Share Collaborative Pacing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","think","pair"],
    }),
  },

  "education-guided-note-taking-graphic-organizers": {
    id: "education-guided-note-taking-graphic-organizers",
    name: "GuidedNoteTakingGraphicOrganizersSkill",
    displayName: "Guided Note-Taking Graphic Organizers",
    categoryId: "education",
    description: "Provides structured fill-in-the-blank outline notes to support lecture listening.",
    tags: ["education","education","guided","note"],
    transform: createStandardSkillTransform({
      sectionName: "Guided Note-Taking Graphic Organizers Standards",
      ruSectionName: "Стандарты и регламенты: Guided Note-Taking Graphic Organizers",
      instructions: [
        "Apply core domain tenets for Guided Note-Taking Graphic Organizers.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Guided Note-Taking Graphic Organizers.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","guided","note"],
    }),
  },

  "education-math-concrete-representational-abstract-cra": {
    id: "education-math-concrete-representational-abstract-cra",
    name: "MathConcreteRepresentationalAbstractCRASkill",
    displayName: "Math Concrete-Representational-Abstract (CRA)",
    categoryId: "education",
    description: "Transitions math instruction from physical blocks to visual drawings to abstract symbols.",
    tags: ["education","education","math","concrete"],
    transform: createStandardSkillTransform({
      sectionName: "Math Concrete-Representational-Abstract (CRA) Standards",
      ruSectionName: "Стандарты и регламенты: Math Concrete-Representational-Abstract (CRA)",
      instructions: [
        "Apply core domain tenets for Math Concrete-Representational-Abstract (CRA).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Math Concrete-Representational-Abstract (CRA).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","math","concrete"],
    }),
  },

  "education-phonics-explicit-decodable-reading": {
    id: "education-phonics-explicit-decodable-reading",
    name: "PhonicsExplicitDecodableReadingSkill",
    displayName: "Phonics Explicit Decodable Reading",
    categoryId: "education",
    description: "Teaches early reading through systematic phonics rules and decodable text practice.",
    tags: ["education","education","phonics","explicit"],
    transform: createStandardSkillTransform({
      sectionName: "Phonics Explicit Decodable Reading Standards",
      ruSectionName: "Стандарты и регламенты: Phonics Explicit Decodable Reading",
      instructions: [
        "Apply core domain tenets for Phonics Explicit Decodable Reading.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Phonics Explicit Decodable Reading.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","phonics","explicit"],
    }),
  },

  "education-vocabulary-frayer-model-definition-grid": {
    id: "education-vocabulary-frayer-model-definition-grid",
    name: "VocabularyFrayerModelDefinitionGridSkill",
    displayName: "Vocabulary Frayer Model Definition Grid",
    categoryId: "education",
    description: "Explores new terms via Definition, Characteristics, Examples, and Non-Examples.",
    tags: ["education","education","vocabulary","frayer"],
    transform: createStandardSkillTransform({
      sectionName: "Vocabulary Frayer Model Definition Grid Standards",
      ruSectionName: "Стандарты и регламенты: Vocabulary Frayer Model Definition Grid",
      instructions: [
        "Apply core domain tenets for Vocabulary Frayer Model Definition Grid.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Vocabulary Frayer Model Definition Grid.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","vocabulary","frayer"],
    }),
  },

  "education-constructivist-knowledge-co-construction": {
    id: "education-constructivist-knowledge-co-construction",
    name: "ConstructivistKnowledgeCoConstructionSkill",
    displayName: "Constructivist Knowledge Co-Construction",
    categoryId: "education",
    description: "Facilitates student discovery where learners actively construct their own understanding.",
    tags: ["education","education","constructivist","knowledge"],
    transform: createStandardSkillTransform({
      sectionName: "Constructivist Knowledge Co-Construction Standards",
      ruSectionName: "Стандарты и регламенты: Constructivist Knowledge Co-Construction",
      instructions: [
        "Apply core domain tenets for Constructivist Knowledge Co-Construction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Constructivist Knowledge Co-Construction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","constructivist","knowledge"],
    }),
  },

  "education-scaffolded-writing-cer-claim-evidence-reasoning": {
    id: "education-scaffolded-writing-cer-claim-evidence-reasoning",
    name: "ScaffoldedWritingCERClaimEvidenceReasoningSkill",
    displayName: "Scaffolded Writing CER (Claim-Evidence-Reasoning)",
    categoryId: "education",
    description: "Structures persuasive academic essays: Claim -> Supporting Evidence -> Reasoning.",
    tags: ["education","education","scaffolded","writing"],
    transform: createStandardSkillTransform({
      sectionName: "Scaffolded Writing CER (Claim-Evidence-Reasoning) Standards",
      ruSectionName: "Стандарты и регламенты: Scaffolded Writing CER (Claim-Evidence-Reasoning)",
      instructions: [
        "Apply core domain tenets for Scaffolded Writing CER (Claim-Evidence-Reasoning).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Scaffolded Writing CER (Claim-Evidence-Reasoning).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","scaffolded","writing"],
    }),
  },

  "education-gamified-digital-leaderboard-badge-systems": {
    id: "education-gamified-digital-leaderboard-badge-systems",
    name: "GamifiedDigitalLeaderboardBadgeSystemsSkill",
    displayName: "Gamified Digital Leaderboard & Badge Systems",
    categoryId: "education",
    description: "Motivates student assignment completion through badges, levels, and achievements.",
    tags: ["education","education","gamified","digital"],
    transform: createStandardSkillTransform({
      sectionName: "Gamified Digital Leaderboard & Badge Systems Standards",
      ruSectionName: "Стандарты и регламенты: Gamified Digital Leaderboard & Badge Systems",
      instructions: [
        "Apply core domain tenets for Gamified Digital Leaderboard & Badge Systems.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Gamified Digital Leaderboard & Badge Systems.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","gamified","digital"],
    }),
  },

  "education-special-education-individualized-education-program-iep": {
    id: "education-special-education-individualized-education-program-iep",
    name: "SpecialEducationIndividualizedEducationProgramIEPSkill",
    displayName: "Special Education Individualized Education Program (IEP)",
    categoryId: "education",
    description: "Adapts curriculum accommodations and goals for neurodiverse special needs learners.",
    tags: ["education","education","special","education"],
    transform: createStandardSkillTransform({
      sectionName: "Special Education Individualized Education Program (IEP) Standards",
      ruSectionName: "Стандарты и регламенты: Special Education Individualized Education Program (IEP)",
      instructions: [
        "Apply core domain tenets for Special Education Individualized Education Program (IEP).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Special Education Individualized Education Program (IEP).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","special","education"],
    }),
  },

  "education-english-language-learner-ell-sheltered-instruction": {
    id: "education-english-language-learner-ell-sheltered-instruction",
    name: "EnglishLanguageLearnerELLShelteredInstructionSkill",
    displayName: "English Language Learner (ELL) Sheltered Instruction",
    categoryId: "education",
    description: "Supports non-native speakers with visual aids, sentence frames, and simplified syntax.",
    tags: ["education","education","english","language"],
    transform: createStandardSkillTransform({
      sectionName: "English Language Learner (ELL) Sheltered Instruction Standards",
      ruSectionName: "Стандарты и регламенты: English Language Learner (ELL) Sheltered Instruction",
      instructions: [
        "Apply core domain tenets for English Language Learner (ELL) Sheltered Instruction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для English Language Learner (ELL) Sheltered Instruction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","english","language"],
    }),
  },

  "education-mastery-based-standards-grading-scale": {
    id: "education-mastery-based-standards-grading-scale",
    name: "MasteryBasedStandardsGradingScaleSkill",
    displayName: "Mastery-Based Standards Grading Scale",
    categoryId: "education",
    description: "Grades student work against standards mastery rather than points-based homework completion.",
    tags: ["education","education","mastery","based"],
    transform: createStandardSkillTransform({
      sectionName: "Mastery-Based Standards Grading Scale Standards",
      ruSectionName: "Стандарты и регламенты: Mastery-Based Standards Grading Scale",
      instructions: [
        "Apply core domain tenets for Mastery-Based Standards Grading Scale.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Mastery-Based Standards Grading Scale.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","mastery","based"],
    }),
  },

  "education-flipped-classroom-pre-class-video-quiz": {
    id: "education-flipped-classroom-pre-class-video-quiz",
    name: "FlippedClassroomPreClassVideoQuizSkill",
    displayName: "Flipped Classroom Pre-Class Video Quiz",
    categoryId: "education",
    description: "Checks pre-class video comprehension with 3 quick check-in questions before class.",
    tags: ["education","education","flipped","classroom"],
    transform: createStandardSkillTransform({
      sectionName: "Flipped Classroom Pre-Class Video Quiz Standards",
      ruSectionName: "Стандарты и регламенты: Flipped Classroom Pre-Class Video Quiz",
      instructions: [
        "Apply core domain tenets for Flipped Classroom Pre-Class Video Quiz.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Flipped Classroom Pre-Class Video Quiz.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","flipped","classroom"],
    }),
  },

  "education-case-based-clinical-medical-education": {
    id: "education-case-based-clinical-medical-education",
    name: "CaseBasedClinicalMedicalEducationSkill",
    displayName: "Case-Based Clinical Medical Education",
    categoryId: "education",
    description: "Guides medical students through patient diagnostic case studies and differential reasoning.",
    tags: ["education","education","case","based"],
    transform: createStandardSkillTransform({
      sectionName: "Case-Based Clinical Medical Education Standards",
      ruSectionName: "Стандарты и регламенты: Case-Based Clinical Medical Education",
      instructions: [
        "Apply core domain tenets for Case-Based Clinical Medical Education.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Case-Based Clinical Medical Education.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","case","based"],
    }),
  },

  "education-executive-function-time-management-coaching": {
    id: "education-executive-function-time-management-coaching",
    name: "ExecutiveFunctionTimeManagementCoachingSkill",
    displayName: "Executive Function Time Management Coaching",
    categoryId: "education",
    description: "Teaches students how to break large term papers into manageable daily tasks.",
    tags: ["education","education","executive","function"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Function Time Management Coaching Standards",
      ruSectionName: "Стандарты и регламенты: Executive Function Time Management Coaching",
      instructions: [
        "Apply core domain tenets for Executive Function Time Management Coaching.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Executive Function Time Management Coaching.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","executive","function"],
    }),
  },

  "education-design-thinking-k-12-innovation-challenge": {
    id: "education-design-thinking-k-12-innovation-challenge",
    name: "DesignThinkingK12InnovationChallengeSkill",
    displayName: "Design Thinking K-12 Innovation Challenge",
    categoryId: "education",
    description: "Guides middle school students through design thinking projects to solve community problems.",
    tags: ["education","education","design","thinking"],
    transform: createStandardSkillTransform({
      sectionName: "Design Thinking K-12 Innovation Challenge Standards",
      ruSectionName: "Стандарты и регламенты: Design Thinking K-12 Innovation Challenge",
      instructions: [
        "Apply core domain tenets for Design Thinking K-12 Innovation Challenge.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Design Thinking K-12 Innovation Challenge.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","design","thinking"],
    }),
  },

  "education-interactive-coding-playground-auto-grader": {
    id: "education-interactive-coding-playground-auto-grader",
    name: "InteractiveCodingPlaygroundAutoGraderSkill",
    displayName: "Interactive Coding Playground Auto-Grader",
    categoryId: "education",
    description: "Provides instant feedback on coding exercises with automated test suite checks.",
    tags: ["education","education","interactive","coding"],
    transform: createStandardSkillTransform({
      sectionName: "Interactive Coding Playground Auto-Grader Standards",
      ruSectionName: "Стандарты и регламенты: Interactive Coding Playground Auto-Grader",
      instructions: [
        "Apply core domain tenets for Interactive Coding Playground Auto-Grader.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Interactive Coding Playground Auto-Grader.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","interactive","coding"],
    }),
  },

  "education-peer-to-peer-essay-review-protocol": {
    id: "education-peer-to-peer-essay-review-protocol",
    name: "PeertoPeerEssayReviewProtocolSkill",
    displayName: "Peer-to-Peer Essay Review Protocol",
    categoryId: "education",
    description: "Structures constructive peer writing reviews using rubric checklists.",
    tags: ["education","education","peer","to"],
    transform: createStandardSkillTransform({
      sectionName: "Peer-to-Peer Essay Review Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Peer-to-Peer Essay Review Protocol",
      instructions: [
        "Apply core domain tenets for Peer-to-Peer Essay Review Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Peer-to-Peer Essay Review Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","peer","to"],
    }),
  },

  "education-socratic-method-legal-case-dialogue": {
    id: "education-socratic-method-legal-case-dialogue",
    name: "SocraticMethodLegalCaseDialogueSkill",
    displayName: "Socratic Method Legal Case Dialogue",
    categoryId: "education",
    description: "Guides law students through cold-call questioning on landmark legal precedents.",
    tags: ["education","education","socratic","method"],
    transform: createStandardSkillTransform({
      sectionName: "Socratic Method Legal Case Dialogue Standards",
      ruSectionName: "Стандарты и регламенты: Socratic Method Legal Case Dialogue",
      instructions: [
        "Apply core domain tenets for Socratic Method Legal Case Dialogue.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Socratic Method Legal Case Dialogue.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","socratic","method"],
    }),
  },

  "education-project-based-science-fair-research-milestone": {
    id: "education-project-based-science-fair-research-milestone",
    name: "ProjectBasedScienceFairResearchMilestoneSkill",
    displayName: "Project-Based Science Fair Research Milestone",
    categoryId: "education",
    description: "Scaffolds science fair projects from question to variable control and poster presentation.",
    tags: ["education","education","project","based"],
    transform: createStandardSkillTransform({
      sectionName: "Project-Based Science Fair Research Milestone Standards",
      ruSectionName: "Стандарты и регламенты: Project-Based Science Fair Research Milestone",
      instructions: [
        "Apply core domain tenets for Project-Based Science Fair Research Milestone.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Project-Based Science Fair Research Milestone.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","project","based"],
    }),
  },

  "education-early-childhood-play-based-learning-exploration": {
    id: "education-early-childhood-play-based-learning-exploration",
    name: "EarlyChildhoodPlayBasedLearningExplorationSkill",
    displayName: "Early Childhood Play-Based Learning Exploration",
    categoryId: "education",
    description: "Fosters early cognitive development through structured sensory play and discovery.",
    tags: ["education","education","early","childhood"],
    transform: createStandardSkillTransform({
      sectionName: "Early Childhood Play-Based Learning Exploration Standards",
      ruSectionName: "Стандарты и регламенты: Early Childhood Play-Based Learning Exploration",
      instructions: [
        "Apply core domain tenets for Early Childhood Play-Based Learning Exploration.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Early Childhood Play-Based Learning Exploration.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","early","childhood"],
    }),
  },

  "education-adult-learning-theory-andragogy-self-direction": {
    id: "education-adult-learning-theory-andragogy-self-direction",
    name: "AdultLearningTheoryAndragogySelfDirectionSkill",
    displayName: "Adult Learning Theory (Andragogy) Self-Direction",
    categoryId: "education",
    description: "Designs adult professional training focused on immediate practical application.",
    tags: ["education","education","adult","learning"],
    transform: createStandardSkillTransform({
      sectionName: "Adult Learning Theory (Andragogy) Self-Direction Standards",
      ruSectionName: "Стандарты и регламенты: Adult Learning Theory (Andragogy) Self-Direction",
      instructions: [
        "Apply core domain tenets for Adult Learning Theory (Andragogy) Self-Direction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Adult Learning Theory (Andragogy) Self-Direction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","adult","learning"],
    }),
  },

  "education-blended-learning-station-rotation-model": {
    id: "education-blended-learning-station-rotation-model",
    name: "BlendedLearningStationRotationModelSkill",
    displayName: "Blended Learning Station Rotation Model",
    categoryId: "education",
    description: "Rotates students between teacher instruction, online learning, and small group work.",
    tags: ["education","education","blended","learning"],
    transform: createStandardSkillTransform({
      sectionName: "Blended Learning Station Rotation Model Standards",
      ruSectionName: "Стандарты и регламенты: Blended Learning Station Rotation Model",
      instructions: [
        "Apply core domain tenets for Blended Learning Station Rotation Model.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Blended Learning Station Rotation Model.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","blended","learning"],
    }),
  },

  "education-executive-summary-study-guide-synthesis": {
    id: "education-executive-summary-study-guide-synthesis",
    name: "ExecutiveSummaryStudyGuideSynthesisSkill",
    displayName: "Executive Summary Study Guide Synthesis",
    categoryId: "education",
    description: "Summarizes textbook chapters into high-density 2-page exam study guides.",
    tags: ["education","education","executive","summary"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Summary Study Guide Synthesis Standards",
      ruSectionName: "Стандарты и регламенты: Executive Summary Study Guide Synthesis",
      instructions: [
        "Apply core domain tenets for Executive Summary Study Guide Synthesis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Executive Summary Study Guide Synthesis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","executive","summary"],
    }),
  },

  "education-interactive-geometry-proof-construction": {
    id: "education-interactive-geometry-proof-construction",
    name: "InteractiveGeometryProofConstructionSkill",
    displayName: "Interactive Geometry Proof Construction",
    categoryId: "education",
    description: "Guides students through step-by-step geometric proofs with logical justifications.",
    tags: ["education","education","interactive","geometry"],
    transform: createStandardSkillTransform({
      sectionName: "Interactive Geometry Proof Construction Standards",
      ruSectionName: "Стандарты и регламенты: Interactive Geometry Proof Construction",
      instructions: [
        "Apply core domain tenets for Interactive Geometry Proof Construction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Interactive Geometry Proof Construction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","interactive","geometry"],
    }),
  },

  "education-gamified-reading-comprehension-quest": {
    id: "education-gamified-reading-comprehension-quest",
    name: "GamifiedReadingComprehensionQuestSkill",
    displayName: "Gamified Reading Comprehension Quest",
    categoryId: "education",
    description: "Turns chapter reading into interactive story quests with decision choices.",
    tags: ["education","education","gamified","reading"],
    transform: createStandardSkillTransform({
      sectionName: "Gamified Reading Comprehension Quest Standards",
      ruSectionName: "Стандарты и регламенты: Gamified Reading Comprehension Quest",
      instructions: [
        "Apply core domain tenets for Gamified Reading Comprehension Quest.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Gamified Reading Comprehension Quest.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","gamified","reading"],
    }),
  },

  "education-stem-robotics-engineering-challenge": {
    id: "education-stem-robotics-engineering-challenge",
    name: "STEMRoboticsEngineeringChallengeSkill",
    displayName: "STEM Robotics Engineering Challenge",
    categoryId: "education",
    description: "Scaffolds robotics building and programming challenges for middle school teams.",
    tags: ["education","education","stem","robotics"],
    transform: createStandardSkillTransform({
      sectionName: "STEM Robotics Engineering Challenge Standards",
      ruSectionName: "Стандарты и регламенты: STEM Robotics Engineering Challenge",
      instructions: [
        "Apply core domain tenets for STEM Robotics Engineering Challenge.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для STEM Robotics Engineering Challenge.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","stem","robotics"],
    }),
  },

  "education-universal-primary-source-document-analysis": {
    id: "education-universal-primary-source-document-analysis",
    name: "UniversalPrimarySourceDocumentAnalysisSkill",
    displayName: "Universal Primary Source Document Analysis",
    categoryId: "education",
    description: "Guides history students to analyze primary sources for bias, context, and intent.",
    tags: ["education","education","universal","primary"],
    transform: createStandardSkillTransform({
      sectionName: "Universal Primary Source Document Analysis Standards",
      ruSectionName: "Стандарты и регламенты: Universal Primary Source Document Analysis",
      instructions: [
        "Apply core domain tenets for Universal Primary Source Document Analysis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Universal Primary Source Document Analysis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","universal","primary"],
    }),
  },

  "education-calculus-visual-derivative-rate-of-change": {
    id: "education-calculus-visual-derivative-rate-of-change",
    name: "CalculusVisualDerivativeRateofChangeSkill",
    displayName: "Calculus Visual Derivative Rate-of-Change",
    categoryId: "education",
    description: "Teaches calculus derivatives visually using secant line slope approximations.",
    tags: ["education","education","calculus","visual"],
    transform: createStandardSkillTransform({
      sectionName: "Calculus Visual Derivative Rate-of-Change Standards",
      ruSectionName: "Стандарты и регламенты: Calculus Visual Derivative Rate-of-Change",
      instructions: [
        "Apply core domain tenets for Calculus Visual Derivative Rate-of-Change.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Calculus Visual Derivative Rate-of-Change.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","calculus","visual"],
    }),
  },

  "education-computer-science-algorithmic-thinking-unplugged": {
    id: "education-computer-science-algorithmic-thinking-unplugged",
    name: "ComputerScienceAlgorithmicThinkingunpluggedSkill",
    displayName: "Computer Science Algorithmic Thinking unplugged",
    categoryId: "education",
    description: "Teaches sorting and searching algorithms using physical cards and unplugged activities.",
    tags: ["education","education","computer","science"],
    transform: createStandardSkillTransform({
      sectionName: "Computer Science Algorithmic Thinking unplugged Standards",
      ruSectionName: "Стандарты и регламенты: Computer Science Algorithmic Thinking unplugged",
      instructions: [
        "Apply core domain tenets for Computer Science Algorithmic Thinking unplugged.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Computer Science Algorithmic Thinking unplugged.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","computer","science"],
    }),
  },

  "education-music-theory-sight-reading-solfege": {
    id: "education-music-theory-sight-reading-solfege",
    name: "MusicTheorySightReadingSolfegeSkill",
    displayName: "Music Theory Sight-Reading & Solfege",
    categoryId: "education",
    description: "Scaffolds musical sight-reading skills through solfege hand signs and rhythm exercises.",
    tags: ["education","education","music","theory"],
    transform: createStandardSkillTransform({
      sectionName: "Music Theory Sight-Reading & Solfege Standards",
      ruSectionName: "Стандарты и регламенты: Music Theory Sight-Reading & Solfege",
      instructions: [
        "Apply core domain tenets for Music Theory Sight-Reading & Solfege.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Music Theory Sight-Reading & Solfege.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","music","theory"],
    }),
  },

  "education-art-history-visual-thinking-strategy-vts": {
    id: "education-art-history-visual-thinking-strategy-vts",
    name: "ArtHistoryVisualThinkingStrategyVTSSkill",
    displayName: "Art History Visual Thinking Strategy (VTS)",
    categoryId: "education",
    description: "Facilitates open-ended group discussion of artwork: 'What's going on in this picture?'.",
    tags: ["education","education","art","history"],
    transform: createStandardSkillTransform({
      sectionName: "Art History Visual Thinking Strategy (VTS) Standards",
      ruSectionName: "Стандарты и регламенты: Art History Visual Thinking Strategy (VTS)",
      instructions: [
        "Apply core domain tenets for Art History Visual Thinking Strategy (VTS).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Art History Visual Thinking Strategy (VTS).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","art","history"],
    }),
  },

  "education-physical-education-motor-skill-progression": {
    id: "education-physical-education-motor-skill-progression",
    name: "PhysicalEducationMotorSkillProgressionSkill",
    displayName: "Physical Education Motor Skill Progression",
    categoryId: "education",
    description: "Breaks complex athletic movements (throwing, jumping) into developmental phases.",
    tags: ["education","education","physical","education"],
    transform: createStandardSkillTransform({
      sectionName: "Physical Education Motor Skill Progression Standards",
      ruSectionName: "Стандарты и регламенты: Physical Education Motor Skill Progression",
      instructions: [
        "Apply core domain tenets for Physical Education Motor Skill Progression.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Physical Education Motor Skill Progression.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","physical","education"],
    }),
  },

  "education-chemistry-molecular-model-building-lab": {
    id: "education-chemistry-molecular-model-building-lab",
    name: "ChemistryMolecularModelBuildingLabSkill",
    displayName: "Chemistry Molecular Model Building Lab",
    categoryId: "education",
    description: "Teaches chemical bonding and VSEPR geometry using 3D physical model kits.",
    tags: ["education","education","chemistry","molecular"],
    transform: createStandardSkillTransform({
      sectionName: "Chemistry Molecular Model Building Lab Standards",
      ruSectionName: "Стандарты и регламенты: Chemistry Molecular Model Building Lab",
      instructions: [
        "Apply core domain tenets for Chemistry Molecular Model Building Lab.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Chemistry Molecular Model Building Lab.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","chemistry","molecular"],
    }),
  },

  "education-foreign-language-immersion-conversation": {
    id: "education-foreign-language-immersion-conversation",
    name: "ForeignLanguageImmersionConversationSkill",
    displayName: "Foreign Language Immersion Conversation",
    categoryId: "education",
    description: "Conducts target language practice using gestures, visuals, and 90%+ immersion.",
    tags: ["education","education","foreign","language"],
    transform: createStandardSkillTransform({
      sectionName: "Foreign Language Immersion Conversation Standards",
      ruSectionName: "Стандарты и регламенты: Foreign Language Immersion Conversation",
      instructions: [
        "Apply core domain tenets for Foreign Language Immersion Conversation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Foreign Language Immersion Conversation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","foreign","language"],
    }),
  },

  "education-financial-literacy-budgeting-compound-interest": {
    id: "education-financial-literacy-budgeting-compound-interest",
    name: "FinancialLiteracyBudgetingCompoundInterestSkill",
    displayName: "Financial Literacy Budgeting & Compound Interest",
    categoryId: "education",
    description: "Teaches high school students personal budgeting, credit card math, and investing.",
    tags: ["education","education","financial","literacy"],
    transform: createStandardSkillTransform({
      sectionName: "Financial Literacy Budgeting & Compound Interest Standards",
      ruSectionName: "Стандарты и регламенты: Financial Literacy Budgeting & Compound Interest",
      instructions: [
        "Apply core domain tenets for Financial Literacy Budgeting & Compound Interest.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Financial Literacy Budgeting & Compound Interest.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","financial","literacy"],
    }),
  },

  "education-environmental-science-eco-system-simulation": {
    id: "education-environmental-science-eco-system-simulation",
    name: "EnvironmentalScienceEcoSystemSimulationSkill",
    displayName: "Environmental Science Eco-System Simulation",
    categoryId: "education",
    description: "Simulates food web predator-prey dynamics and ecological population balance.",
    tags: ["education","education","environmental","science"],
    transform: createStandardSkillTransform({
      sectionName: "Environmental Science Eco-System Simulation Standards",
      ruSectionName: "Стандарты и регламенты: Environmental Science Eco-System Simulation",
      instructions: [
        "Apply core domain tenets for Environmental Science Eco-System Simulation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Environmental Science Eco-System Simulation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","environmental","science"],
    }),
  },

  "education-geography-spatial-map-layering-skills": {
    id: "education-geography-spatial-map-layering-skills",
    name: "GeographySpatialMapLayeringSkillsSkill",
    displayName: "Geography Spatial Map Layering Skills",
    categoryId: "education",
    description: "Teaches GIS map reading, topographic elevation lines, and spatial analysis.",
    tags: ["education","education","geography","spatial"],
    transform: createStandardSkillTransform({
      sectionName: "Geography Spatial Map Layering Skills Standards",
      ruSectionName: "Стандарты и регламенты: Geography Spatial Map Layering Skills",
      instructions: [
        "Apply core domain tenets for Geography Spatial Map Layering Skills.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Geography Spatial Map Layering Skills.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","geography","spatial"],
    }),
  },

  "education-psychology-behavioral-conditioning-lab": {
    id: "education-psychology-behavioral-conditioning-lab",
    name: "PsychologyBehavioralConditioningLabSkill",
    displayName: "Psychology Behavioral Conditioning Lab",
    categoryId: "education",
    description: "Demonstrates classical and operant conditioning principles through interactive examples.",
    tags: ["education","education","psychology","behavioral"],
    transform: createStandardSkillTransform({
      sectionName: "Psychology Behavioral Conditioning Lab Standards",
      ruSectionName: "Стандарты и регламенты: Psychology Behavioral Conditioning Lab",
      instructions: [
        "Apply core domain tenets for Psychology Behavioral Conditioning Lab.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Psychology Behavioral Conditioning Lab.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","psychology","behavioral"],
    }),
  },

  "education-debate-club-argumentation-refutation": {
    id: "education-debate-club-argumentation-refutation",
    name: "DebateClubArgumentationRefutationSkill",
    displayName: "Debate Club Argumentation & Refutation",
    categoryId: "education",
    description: "Trains high school debate teams in constructing arguments, evidence, and cross-examination.",
    tags: ["education","education","debate","club"],
    transform: createStandardSkillTransform({
      sectionName: "Debate Club Argumentation & Refutation Standards",
      ruSectionName: "Стандарты и регламенты: Debate Club Argumentation & Refutation",
      instructions: [
        "Apply core domain tenets for Debate Club Argumentation & Refutation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Debate Club Argumentation & Refutation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","debate","club"],
    }),
  },

  "education-creative-writing-story-arc-workshop": {
    id: "education-creative-writing-story-arc-workshop",
    name: "CreativeWritingStoryArcWorkshopSkill",
    displayName: "Creative Writing Story Arc Workshop",
    categoryId: "education",
    description: "Guides young writers to develop character motivations, inciting incidents, and climaxes.",
    tags: ["education","education","creative","writing"],
    transform: createStandardSkillTransform({
      sectionName: "Creative Writing Story Arc Workshop Standards",
      ruSectionName: "Стандарты и регламенты: Creative Writing Story Arc Workshop",
      instructions: [
        "Apply core domain tenets for Creative Writing Story Arc Workshop.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Creative Writing Story Arc Workshop.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","creative","writing"],
    }),
  },

  "education-philosophy-ethics-thought-experiment-circle": {
    id: "education-philosophy-ethics-thought-experiment-circle",
    name: "PhilosophyEthicsThoughtExperimentCircleSkill",
    displayName: "Philosophy Ethics Thought Experiment Circle",
    categoryId: "education",
    description: "Facilitates student discussions of ethical dilemmas (Trolley Problem, Experience Machine).",
    tags: ["education","education","philosophy","ethics"],
    transform: createStandardSkillTransform({
      sectionName: "Philosophy Ethics Thought Experiment Circle Standards",
      ruSectionName: "Стандарты и регламенты: Philosophy Ethics Thought Experiment Circle",
      instructions: [
        "Apply core domain tenets for Philosophy Ethics Thought Experiment Circle.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Philosophy Ethics Thought Experiment Circle.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","philosophy","ethics"],
    }),
  },

  "education-microbiology-bacterial-culture-staining-lab": {
    id: "education-microbiology-bacterial-culture-staining-lab",
    name: "MicrobiologyBacterialCultureStainingLabSkill",
    displayName: "Microbiology Bacterial Culture & Staining Lab",
    categoryId: "education",
    description: "Teaches sterile lab techniques, Gram staining, and microscope identification.",
    tags: ["education","education","microbiology","bacterial"],
    transform: createStandardSkillTransform({
      sectionName: "Microbiology Bacterial Culture & Staining Lab Standards",
      ruSectionName: "Стандарты и регламенты: Microbiology Bacterial Culture & Staining Lab",
      instructions: [
        "Apply core domain tenets for Microbiology Bacterial Culture & Staining Lab.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Microbiology Bacterial Culture & Staining Lab.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","microbiology","bacterial"],
    }),
  },

  "education-physics-kinematics-motion-graphing": {
    id: "education-physics-kinematics-motion-graphing",
    name: "PhysicsKinematicsMotionGraphingSkill",
    displayName: "Physics Kinematics Motion Graphing",
    categoryId: "education",
    description: "Connects physical toy car motion to position-time and velocity-time graphs.",
    tags: ["education","education","physics","kinematics"],
    transform: createStandardSkillTransform({
      sectionName: "Physics Kinematics Motion Graphing Standards",
      ruSectionName: "Стандарты и регламенты: Physics Kinematics Motion Graphing",
      instructions: [
        "Apply core domain tenets for Physics Kinematics Motion Graphing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Physics Kinematics Motion Graphing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","physics","kinematics"],
    }),
  },

  "education-civics-government-mock-trial-simulation": {
    id: "education-civics-government-mock-trial-simulation",
    name: "CivicsGovernmentMockTrialSimulationSkill",
    displayName: "Civics & Government Mock Trial Simulation",
    categoryId: "education",
    description: "Immerses students in court trial roles: attorneys, witnesses, and jury members.",
    tags: ["education","education","civics","government"],
    transform: createStandardSkillTransform({
      sectionName: "Civics & Government Mock Trial Simulation Standards",
      ruSectionName: "Стандарты и регламенты: Civics & Government Mock Trial Simulation",
      instructions: [
        "Apply core domain tenets for Civics & Government Mock Trial Simulation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Civics & Government Mock Trial Simulation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","civics","government"],
    }),
  },

  "education-data-literacy-chart-reading-misleading-graphs": {
    id: "education-data-literacy-chart-reading-misleading-graphs",
    name: "DataLiteracyChartReadingMisleadingGraphsSkill",
    displayName: "Data Literacy Chart Reading & Misleading Graphs",
    categoryId: "education",
    description: "Teaches students how to spot manipulated Y-axes and misleading data visualizations.",
    tags: ["education","education","data","literacy"],
    transform: createStandardSkillTransform({
      sectionName: "Data Literacy Chart Reading & Misleading Graphs Standards",
      ruSectionName: "Стандарты и регламенты: Data Literacy Chart Reading & Misleading Graphs",
      instructions: [
        "Apply core domain tenets for Data Literacy Chart Reading & Misleading Graphs.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Data Literacy Chart Reading & Misleading Graphs.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","data","literacy"],
    }),
  },

  "education-mindfulness-brain-break-stress-reduction": {
    id: "education-mindfulness-brain-break-stress-reduction",
    name: "MindfulnessBrainBreakStressReductionSkill",
    displayName: "Mindfulness & Brain Break Stress Reduction",
    categoryId: "education",
    description: "Leads short 2-minute breathing exercises before high-stakes exams to reduce anxiety.",
    tags: ["education","education","mindfulness","brain"],
    transform: createStandardSkillTransform({
      sectionName: "Mindfulness & Brain Break Stress Reduction Standards",
      ruSectionName: "Стандарты и регламенты: Mindfulness & Brain Break Stress Reduction",
      instructions: [
        "Apply core domain tenets for Mindfulness & Brain Break Stress Reduction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Mindfulness & Brain Break Stress Reduction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","mindfulness","brain"],
    }),
  },

  "education-peer-study-group-facilitation-guide": {
    id: "education-peer-study-group-facilitation-guide",
    name: "PeerStudyGroupFacilitationGuideSkill",
    displayName: "Peer Study Group Facilitation Guide",
    categoryId: "education",
    description: "Provides student study groups with structured agendas and practice question sets.",
    tags: ["education","education","peer","study"],
    transform: createStandardSkillTransform({
      sectionName: "Peer Study Group Facilitation Guide Standards",
      ruSectionName: "Стандарты и регламенты: Peer Study Group Facilitation Guide",
      instructions: [
        "Apply core domain tenets for Peer Study Group Facilitation Guide.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Peer Study Group Facilitation Guide.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","peer","study"],
    }),
  },

  "education-holistic-teacher-professional-development-workshop": {
    id: "education-holistic-teacher-professional-development-workshop",
    name: "HolisticTeacherProfessionalDevelopmentWorkshopSkill",
    displayName: "Holistic Teacher Professional Development Workshop",
    categoryId: "education",
    description: "Trains educators on innovative classroom management and instructional tech.",
    tags: ["education","education","holistic","teacher"],
    transform: createStandardSkillTransform({
      sectionName: "Holistic Teacher Professional Development Workshop Standards",
      ruSectionName: "Стандарты и регламенты: Holistic Teacher Professional Development Workshop",
      instructions: [
        "Apply core domain tenets for Holistic Teacher Professional Development Workshop.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Holistic Teacher Professional Development Workshop.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","holistic","teacher"],
    }),
  },

  "education-comprehensive-pedagogy-instructional-excellence-constitution": {
    id: "education-comprehensive-pedagogy-instructional-excellence-constitution",
    name: "ComprehensivePedagogyInstructionalExcellenceConstitutionSkill",
    displayName: "Comprehensive Pedagogy & Instructional Excellence Constitution",
    categoryId: "education",
    description: "Enforces world-class educational scaffolding, Bloom taxonomy, and active learning.",
    tags: ["education","education","comprehensive","pedagogy"],
    transform: createStandardSkillTransform({
      sectionName: "Comprehensive Pedagogy & Instructional Excellence Constitution Standards",
      ruSectionName: "Стандарты и регламенты: Comprehensive Pedagogy & Instructional Excellence Constitution",
      instructions: [
        "Apply core domain tenets for Comprehensive Pedagogy & Instructional Excellence Constitution.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Comprehensive Pedagogy & Instructional Excellence Constitution.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","comprehensive","pedagogy"],
    }),
  },

  "education-education-skill-90": {
    id: "education-education-skill-90",
    name: "educationSkill90Skill",
    displayName: "education Skill 90",
    categoryId: "education",
    description: "Applies advanced education Skill 90 standards and execution patterns.",
    tags: ["education","education","education","skill"],
    transform: createStandardSkillTransform({
      sectionName: "education Skill 90 Standards",
      ruSectionName: "Стандарты и регламенты: education Skill 90",
      instructions: [
        "Apply core domain tenets for education Skill 90.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для education Skill 90.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education","education","skill"],
    }),
  },
  "education-topup-socratic-method-legal-case-briefing-dialogue": {
    id: "education-topup-socratic-method-legal-case-briefing-dialogue",
    name: "SocraticMethodLegalCaseBriefingDialogueSkill",
    displayName: "Socratic Method Legal Case Briefing Dialogue",
    categoryId: "education",
    description: "Guides law students through cold-call questioning on landmark precedents.",
    tags: ["education","education-topup","topup","socratic"],
    transform: createStandardSkillTransform({
      sectionName: "Socratic Method Legal Case Briefing Dialogue Standards",
      ruSectionName: "Стандарты и регламенты: Socratic Method Legal Case Briefing Dialogue",
      instructions: [
        "Apply core domain tenets for Socratic Method Legal Case Briefing Dialogue.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Socratic Method Legal Case Briefing Dialogue.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","socratic"],
    }),
  },

  "education-topup-project-based-science-fair-research-milestone": {
    id: "education-topup-project-based-science-fair-research-milestone",
    name: "ProjectBasedScienceFairResearchMilestoneSkill",
    displayName: "Project-Based Science Fair Research Milestone",
    categoryId: "education",
    description: "Scaffolds science fair projects from question to variable control and poster.",
    tags: ["education","education-topup","topup","project"],
    transform: createStandardSkillTransform({
      sectionName: "Project-Based Science Fair Research Milestone Standards",
      ruSectionName: "Стандарты и регламенты: Project-Based Science Fair Research Milestone",
      instructions: [
        "Apply core domain tenets for Project-Based Science Fair Research Milestone.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Project-Based Science Fair Research Milestone.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","project"],
    }),
  },

  "education-topup-early-childhood-play-based-sensory-discovery": {
    id: "education-topup-early-childhood-play-based-sensory-discovery",
    name: "EarlyChildhoodPlayBasedSensoryDiscoverySkill",
    displayName: "Early Childhood Play-Based Sensory Discovery",
    categoryId: "education",
    description: "Fosters early cognitive development through structured sensory play and discovery.",
    tags: ["education","education-topup","topup","early"],
    transform: createStandardSkillTransform({
      sectionName: "Early Childhood Play-Based Sensory Discovery Standards",
      ruSectionName: "Стандарты и регламенты: Early Childhood Play-Based Sensory Discovery",
      instructions: [
        "Apply core domain tenets for Early Childhood Play-Based Sensory Discovery.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Early Childhood Play-Based Sensory Discovery.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","early"],
    }),
  },

  "education-topup-adult-learning-theory-andragogy-self-direction": {
    id: "education-topup-adult-learning-theory-andragogy-self-direction",
    name: "AdultLearningTheoryAndragogySelfDirectionSkill",
    displayName: "Adult Learning Theory (Andragogy) Self-Direction",
    categoryId: "education",
    description: "Designs adult professional training focused on immediate practical application.",
    tags: ["education","education-topup","topup","adult"],
    transform: createStandardSkillTransform({
      sectionName: "Adult Learning Theory (Andragogy) Self-Direction Standards",
      ruSectionName: "Стандарты и регламенты: Adult Learning Theory (Andragogy) Self-Direction",
      instructions: [
        "Apply core domain tenets for Adult Learning Theory (Andragogy) Self-Direction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Adult Learning Theory (Andragogy) Self-Direction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","adult"],
    }),
  },

  "education-topup-blended-learning-station-rotation-model": {
    id: "education-topup-blended-learning-station-rotation-model",
    name: "BlendedLearningStationRotationModelSkill",
    displayName: "Blended Learning Station Rotation Model",
    categoryId: "education",
    description: "Rotates students between teacher instruction, online learning, and small group work.",
    tags: ["education","education-topup","topup","blended"],
    transform: createStandardSkillTransform({
      sectionName: "Blended Learning Station Rotation Model Standards",
      ruSectionName: "Стандарты и регламенты: Blended Learning Station Rotation Model",
      instructions: [
        "Apply core domain tenets for Blended Learning Station Rotation Model.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Blended Learning Station Rotation Model.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","blended"],
    }),
  },

  "education-topup-executive-summary-study-guide-exam-prep": {
    id: "education-topup-executive-summary-study-guide-exam-prep",
    name: "ExecutiveSummaryStudyGuideExamPrepSkill",
    displayName: "Executive Summary Study Guide Exam Prep",
    categoryId: "education",
    description: "Summarizes textbook chapters into high-density 2-page exam study guides.",
    tags: ["education","education-topup","topup","executive"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Summary Study Guide Exam Prep Standards",
      ruSectionName: "Стандарты и регламенты: Executive Summary Study Guide Exam Prep",
      instructions: [
        "Apply core domain tenets for Executive Summary Study Guide Exam Prep.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Executive Summary Study Guide Exam Prep.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","executive"],
    }),
  },

  "education-topup-interactive-geometry-proof-construction": {
    id: "education-topup-interactive-geometry-proof-construction",
    name: "InteractiveGeometryProofConstructionSkill",
    displayName: "Interactive Geometry Proof Construction",
    categoryId: "education",
    description: "Guides students through step-by-step geometric proofs with logical justifications.",
    tags: ["education","education-topup","topup","interactive"],
    transform: createStandardSkillTransform({
      sectionName: "Interactive Geometry Proof Construction Standards",
      ruSectionName: "Стандарты и регламенты: Interactive Geometry Proof Construction",
      instructions: [
        "Apply core domain tenets for Interactive Geometry Proof Construction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Interactive Geometry Proof Construction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","interactive"],
    }),
  },

  "education-topup-gamified-reading-comprehension-quest": {
    id: "education-topup-gamified-reading-comprehension-quest",
    name: "GamifiedReadingComprehensionQuestSkill",
    displayName: "Gamified Reading Comprehension Quest",
    categoryId: "education",
    description: "Turns chapter reading into interactive story quests with decision choices.",
    tags: ["education","education-topup","topup","gamified"],
    transform: createStandardSkillTransform({
      sectionName: "Gamified Reading Comprehension Quest Standards",
      ruSectionName: "Стандарты и регламенты: Gamified Reading Comprehension Quest",
      instructions: [
        "Apply core domain tenets for Gamified Reading Comprehension Quest.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Gamified Reading Comprehension Quest.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","gamified"],
    }),
  },

  "education-topup-stem-robotics-engineering-challenge": {
    id: "education-topup-stem-robotics-engineering-challenge",
    name: "STEMRoboticsEngineeringChallengeSkill",
    displayName: "STEM Robotics Engineering Challenge",
    categoryId: "education",
    description: "Scaffolds robotics building and programming challenges for middle school teams.",
    tags: ["education","education-topup","topup","stem"],
    transform: createStandardSkillTransform({
      sectionName: "STEM Robotics Engineering Challenge Standards",
      ruSectionName: "Стандарты и регламенты: STEM Robotics Engineering Challenge",
      instructions: [
        "Apply core domain tenets for STEM Robotics Engineering Challenge.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для STEM Robotics Engineering Challenge.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","stem"],
    }),
  },

  "education-topup-universal-primary-source-document-analysis": {
    id: "education-topup-universal-primary-source-document-analysis",
    name: "UniversalPrimarySourceDocumentAnalysisSkill",
    displayName: "Universal Primary Source Document Analysis",
    categoryId: "education",
    description: "Guides history students to analyze primary sources for bias, context, and intent.",
    tags: ["education","education-topup","topup","universal"],
    transform: createStandardSkillTransform({
      sectionName: "Universal Primary Source Document Analysis Standards",
      ruSectionName: "Стандарты и регламенты: Universal Primary Source Document Analysis",
      instructions: [
        "Apply core domain tenets for Universal Primary Source Document Analysis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Universal Primary Source Document Analysis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","universal"],
    }),
  },

  "education-topup-calculus-visual-derivative-rate-of-change": {
    id: "education-topup-calculus-visual-derivative-rate-of-change",
    name: "CalculusVisualDerivativeRateofChangeSkill",
    displayName: "Calculus Visual Derivative Rate-of-Change",
    categoryId: "education",
    description: "Teaches calculus derivatives visually using secant line slope approximations.",
    tags: ["education","education-topup","topup","calculus"],
    transform: createStandardSkillTransform({
      sectionName: "Calculus Visual Derivative Rate-of-Change Standards",
      ruSectionName: "Стандарты и регламенты: Calculus Visual Derivative Rate-of-Change",
      instructions: [
        "Apply core domain tenets for Calculus Visual Derivative Rate-of-Change.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Calculus Visual Derivative Rate-of-Change.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","calculus"],
    }),
  },

  "education-topup-computer-science-algorithmic-thinking-unplugged": {
    id: "education-topup-computer-science-algorithmic-thinking-unplugged",
    name: "ComputerScienceAlgorithmicThinkingUnpluggedSkill",
    displayName: "Computer Science Algorithmic Thinking Unplugged",
    categoryId: "education",
    description: "Teaches sorting and searching algorithms using physical cards and unplugged activities.",
    tags: ["education","education-topup","topup","computer"],
    transform: createStandardSkillTransform({
      sectionName: "Computer Science Algorithmic Thinking Unplugged Standards",
      ruSectionName: "Стандарты и регламенты: Computer Science Algorithmic Thinking Unplugged",
      instructions: [
        "Apply core domain tenets for Computer Science Algorithmic Thinking Unplugged.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Computer Science Algorithmic Thinking Unplugged.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","computer"],
    }),
  },

  "education-topup-music-theory-sight-reading-solfege": {
    id: "education-topup-music-theory-sight-reading-solfege",
    name: "MusicTheorySightReadingSolfegeSkill",
    displayName: "Music Theory Sight-Reading & Solfege",
    categoryId: "education",
    description: "Scaffolds musical sight-reading skills through solfege hand signs and rhythm exercises.",
    tags: ["education","education-topup","topup","music"],
    transform: createStandardSkillTransform({
      sectionName: "Music Theory Sight-Reading & Solfege Standards",
      ruSectionName: "Стандарты и регламенты: Music Theory Sight-Reading & Solfege",
      instructions: [
        "Apply core domain tenets for Music Theory Sight-Reading & Solfege.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Music Theory Sight-Reading & Solfege.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","music"],
    }),
  },

  "education-topup-art-history-visual-thinking-strategy-vts": {
    id: "education-topup-art-history-visual-thinking-strategy-vts",
    name: "ArtHistoryVisualThinkingStrategyVTSSkill",
    displayName: "Art History Visual Thinking Strategy (VTS)",
    categoryId: "education",
    description: "Facilitates open-ended group discussion of artwork: 'What's going on in this picture?'.",
    tags: ["education","education-topup","topup","art"],
    transform: createStandardSkillTransform({
      sectionName: "Art History Visual Thinking Strategy (VTS) Standards",
      ruSectionName: "Стандарты и регламенты: Art History Visual Thinking Strategy (VTS)",
      instructions: [
        "Apply core domain tenets for Art History Visual Thinking Strategy (VTS).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Art History Visual Thinking Strategy (VTS).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","art"],
    }),
  },

  "education-topup-physical-education-motor-skill-progression": {
    id: "education-topup-physical-education-motor-skill-progression",
    name: "PhysicalEducationMotorSkillProgressionSkill",
    displayName: "Physical Education Motor Skill Progression",
    categoryId: "education",
    description: "Breaks complex athletic movements (throwing, jumping) into developmental phases.",
    tags: ["education","education-topup","topup","physical"],
    transform: createStandardSkillTransform({
      sectionName: "Physical Education Motor Skill Progression Standards",
      ruSectionName: "Стандарты и регламенты: Physical Education Motor Skill Progression",
      instructions: [
        "Apply core domain tenets for Physical Education Motor Skill Progression.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Physical Education Motor Skill Progression.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","physical"],
    }),
  },

  "education-topup-chemistry-molecular-model-building-lab": {
    id: "education-topup-chemistry-molecular-model-building-lab",
    name: "ChemistryMolecularModelBuildingLabSkill",
    displayName: "Chemistry Molecular Model Building Lab",
    categoryId: "education",
    description: "Teaches chemical bonding and VSEPR geometry using 3D physical model kits.",
    tags: ["education","education-topup","topup","chemistry"],
    transform: createStandardSkillTransform({
      sectionName: "Chemistry Molecular Model Building Lab Standards",
      ruSectionName: "Стандарты и регламенты: Chemistry Molecular Model Building Lab",
      instructions: [
        "Apply core domain tenets for Chemistry Molecular Model Building Lab.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Chemistry Molecular Model Building Lab.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","chemistry"],
    }),
  },

  "education-topup-foreign-language-immersion-conversation": {
    id: "education-topup-foreign-language-immersion-conversation",
    name: "ForeignLanguageImmersionConversationSkill",
    displayName: "Foreign Language Immersion Conversation",
    categoryId: "education",
    description: "Conducts target language practice using gestures, visuals, and 90%+ immersion.",
    tags: ["education","education-topup","topup","foreign"],
    transform: createStandardSkillTransform({
      sectionName: "Foreign Language Immersion Conversation Standards",
      ruSectionName: "Стандарты и регламенты: Foreign Language Immersion Conversation",
      instructions: [
        "Apply core domain tenets for Foreign Language Immersion Conversation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Foreign Language Immersion Conversation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","foreign"],
    }),
  },

  "education-topup-financial-literacy-budgeting-compound-interest": {
    id: "education-topup-financial-literacy-budgeting-compound-interest",
    name: "FinancialLiteracyBudgetingCompoundInterestSkill",
    displayName: "Financial Literacy Budgeting & Compound Interest",
    categoryId: "education",
    description: "Teaches high school students personal budgeting, credit card math, and investing.",
    tags: ["education","education-topup","topup","financial"],
    transform: createStandardSkillTransform({
      sectionName: "Financial Literacy Budgeting & Compound Interest Standards",
      ruSectionName: "Стандарты и регламенты: Financial Literacy Budgeting & Compound Interest",
      instructions: [
        "Apply core domain tenets for Financial Literacy Budgeting & Compound Interest.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Financial Literacy Budgeting & Compound Interest.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","financial"],
    }),
  },

  "education-topup-environmental-science-eco-system-simulation": {
    id: "education-topup-environmental-science-eco-system-simulation",
    name: "EnvironmentalScienceEcoSystemSimulationSkill",
    displayName: "Environmental Science Eco-System Simulation",
    categoryId: "education",
    description: "Simulates food web predator-prey dynamics and ecological population balance.",
    tags: ["education","education-topup","topup","environmental"],
    transform: createStandardSkillTransform({
      sectionName: "Environmental Science Eco-System Simulation Standards",
      ruSectionName: "Стандарты и регламенты: Environmental Science Eco-System Simulation",
      instructions: [
        "Apply core domain tenets for Environmental Science Eco-System Simulation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Environmental Science Eco-System Simulation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","environmental"],
    }),
  },

  "education-topup-master-pedagogy-curriculum-excellence": {
    id: "education-topup-master-pedagogy-curriculum-excellence",
    name: "MasterPedagogyCurriculumExcellenceSkill",
    displayName: "Master Pedagogy & Curriculum Excellence",
    categoryId: "education",
    description: "Applies world-class educational scaffolding and active learning strategies.",
    tags: ["education","education-topup","topup","master"],
    transform: createStandardSkillTransform({
      sectionName: "Master Pedagogy & Curriculum Excellence Standards",
      ruSectionName: "Стандарты и регламенты: Master Pedagogy & Curriculum Excellence",
      instructions: [
        "Apply core domain tenets for Master Pedagogy & Curriculum Excellence.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Master Pedagogy & Curriculum Excellence.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["education","education-topup","topup","master"],
    }),
  },
  "education-multi-multi-stage-differentiated-instructional-curriculum-design": {
    id: "education-multi-multi-stage-differentiated-instructional-curriculum-design",
    name: "MultiStageDifferentiatedInstructionalCurriculumDesignSkill",
    displayName: "Multi Stage Differentiated Instructional Curriculum Design",
    categoryId: "education",
    description: "Tailors lesson plans dynamically for advanced, grade-level, and struggling learners.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Differentiated Instructional Curriculum Design",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Differentiated Instructional Curriculum Design",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Differentiated Instructional Curriculum Design.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Differentiated Instructional Curriculum Design.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-bloom-taxonomy-cognitive-scaffolding": {
    id: "education-multi-multi-level-bloom-taxonomy-cognitive-scaffolding",
    name: "MultiLevelBloomTaxonomyCognitiveScaffoldingSkill",
    displayName: "Multi Level Bloom Taxonomy Cognitive Scaffolding",
    categoryId: "education",
    description: "Guides students systematically from Remember and Understand up to Evaluate and Create.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Bloom Taxonomy Cognitive Scaffolding",
      ruSectionName: "Композитный Multi-Skill: Multi Level Bloom Taxonomy Cognitive Scaffolding",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Bloom Taxonomy Cognitive Scaffolding.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Bloom Taxonomy Cognitive Scaffolding.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-formative-diagnostic-assessment-suite": {
    id: "education-multi-multi-method-formative-diagnostic-assessment-suite",
    name: "MultiMethodFormativeDiagnosticAssessmentSuiteSkill",
    displayName: "Multi Method Formative Diagnostic Assessment Suite",
    categoryId: "education",
    description: "Combines diagnostic pre-tests, exit tickets, peer grading rubrics, and summative exams.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Formative Diagnostic Assessment Suite",
      ruSectionName: "Композитный Multi-Skill: Multi Method Formative Diagnostic Assessment Suite",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method Formative Diagnostic Assessment Suite.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method Formative Diagnostic Assessment Suite.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-modal-interactive-learning-activity-design": {
    id: "education-multi-multi-modal-interactive-learning-activity-design",
    name: "MultiModalInteractiveLearningActivityDesignSkill",
    displayName: "Multi Modal Interactive Learning Activity Design",
    categoryId: "education",
    description: "Integrates visual diagrams, auditory discussions, kinesthetic experiments, and reading tasks.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Modal Interactive Learning Activity Design",
      ruSectionName: "Композитный Multi-Skill: Multi Modal Interactive Learning Activity Design",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Modal Interactive Learning Activity Design.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Modal Interactive Learning Activity Design.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-project-based-learning-pbl-unit-blueprint": {
    id: "education-multi-multi-stage-project-based-learning-pbl-unit-blueprint",
    name: "MultiStageProjectBasedLearningPBLUnitBlueprintSkill",
    displayName: "Multi Stage Project Based Learning PBL Unit Blueprint",
    categoryId: "education",
    description: "Structures real-world problem solving units with student inquiry, milestone checks, and public showcases.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Project Based Learning PBL Unit Blueprint",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Project Based Learning PBL Unit Blueprint",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Project Based Learning PBL Unit Blueprint.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Project Based Learning PBL Unit Blueprint.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-universal-design-for-learning-udl-scaffolding": {
    id: "education-multi-multi-level-universal-design-for-learning-udl-scaffolding",
    name: "MultiLevelUniversalDesignforLearningUDLScaffoldingSkill",
    displayName: "Multi Level Universal Design for Learning UDL Scaffolding",
    categoryId: "education",
    description: "Provides multiple means of engagement, representation, and action/expression.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Universal Design for Learning UDL Scaffolding",
      ruSectionName: "Композитный Multi-Skill: Multi Level Universal Design for Learning UDL Scaffolding",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Universal Design for Learning UDL Scaffolding.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Universal Design for Learning UDL Scaffolding.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-perspective-socratic-seminar-discussion-guide": {
    id: "education-multi-multi-perspective-socratic-seminar-discussion-guide",
    name: "MultiPerspectiveSocraticSeminarDiscussionGuideSkill",
    displayName: "Multi Perspective Socratic Seminar Discussion Guide",
    categoryId: "education",
    description: "Facilitates student-led Socratic seminars with open-ended textual analysis questions.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Socratic Seminar Discussion Guide",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Socratic Seminar Discussion Guide",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Socratic Seminar Discussion Guide.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Socratic Seminar Discussion Guide.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-gamified-learning-progression-framework": {
    id: "education-multi-multi-stage-gamified-learning-progression-framework",
    name: "MultiStageGamifiedLearningProgressionFrameworkSkill",
    displayName: "Multi Stage Gamified Learning Progression Framework",
    categoryId: "education",
    description: "Structures badges, quest milestones, XP points, and leaderboard mechanics into academic units.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Gamified Learning Progression Framework",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Gamified Learning Progression Framework",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Gamified Learning Progression Framework.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Gamified Learning Progression Framework.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-dyslexia-adhd-accessibility-accommodations": {
    id: "education-multi-multi-level-dyslexia-adhd-accessibility-accommodations",
    name: "MultiLevelDyslexiaADHDAccessibilityAccommodationsSkill",
    displayName: "Multi Level Dyslexia ADHD Accessibility Accommodations",
    categoryId: "education",
    description: "Adapts curriculum materials with dyslexic-friendly fonts, chunked instructions, and extra time.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Dyslexia ADHD Accessibility Accommodations",
      ruSectionName: "Композитный Multi-Skill: Multi Level Dyslexia ADHD Accessibility Accommodations",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Dyslexia ADHD Accessibility Accommodations.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Dyslexia ADHD Accessibility Accommodations.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-flipped-classroom-pre-work-architecture": {
    id: "education-multi-multi-method-flipped-classroom-pre-work-architecture",
    name: "MultiMethodFlippedClassroomPreWorkArchitectureSkill",
    displayName: "Multi Method Flipped Classroom Pre Work Architecture",
    categoryId: "education",
    description: "Coordinates pre-class video lectures, comprehension quizzes, and in-class problem-solving labs.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Flipped Classroom Pre Work Architecture",
      ruSectionName: "Композитный Multi-Skill: Multi Method Flipped Classroom Pre Work Architecture",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method Flipped Classroom Pre Work Architecture.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method Flipped Classroom Pre Work Architecture.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-stem-engineering-design-challenge": {
    id: "education-multi-multi-stage-stem-engineering-design-challenge",
    name: "MultiStageSTEMEngineeringDesignChallengeSkill",
    displayName: "Multi Stage STEM Engineering Design Challenge",
    categoryId: "education",
    description: "Guides students through Ask, Imagine, Plan, Create, Test, and Improve engineering cycles.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage STEM Engineering Design Challenge",
      ruSectionName: "Композитный Multi-Skill: Multi Stage STEM Engineering Design Challenge",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage STEM Engineering Design Challenge.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage STEM Engineering Design Challenge.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-language-immersion-scaffolding-framework": {
    id: "education-multi-multi-level-language-immersion-scaffolding-framework",
    name: "MultiLevelLanguageImmersionScaffoldingFrameworkSkill",
    displayName: "Multi Level Language Immersion Scaffolding Framework",
    categoryId: "education",
    description: "Scaffolds dual-language instruction using sentence frames, visual vocabulary, and code-switching.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Language Immersion Scaffolding Framework",
      ruSectionName: "Композитный Multi-Skill: Multi Level Language Immersion Scaffolding Framework",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Language Immersion Scaffolding Framework.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Language Immersion Scaffolding Framework.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-social-emotional-learning-sel-curriculum": {
    id: "education-multi-multi-method-social-emotional-learning-sel-curriculum",
    name: "MultiMethodSocialEmotionalLearningSELCurriculumSkill",
    displayName: "Multi Method Social Emotional Learning SEL Curriculum",
    categoryId: "education",
    description: "Integrates self-awareness, self-management, social awareness, and responsible decision-making.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Social Emotional Learning SEL Curriculum",
      ruSectionName: "Композитный Multi-Skill: Multi Method Social Emotional Learning SEL Curriculum",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method Social Emotional Learning SEL Curriculum.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method Social Emotional Learning SEL Curriculum.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-academic-essay-peer-review-protocol": {
    id: "education-multi-multi-stage-academic-essay-peer-review-protocol",
    name: "MultiStageAcademicEssayPeerReviewProtocolSkill",
    displayName: "Multi Stage Academic Essay Peer Review Protocol",
    categoryId: "education",
    description: "Structures peer editing rounds focusing on thesis clarity, evidence strength, and citations.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Academic Essay Peer Review Protocol",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Academic Essay Peer Review Protocol",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Academic Essay Peer Review Protocol.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Academic Essay Peer Review Protocol.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-montessori-hands-on-discovery-environment": {
    id: "education-multi-multi-level-montessori-hands-on-discovery-environment",
    name: "MultiLevelMontessoriHandsOnDiscoveryEnvironmentSkill",
    displayName: "Multi Level Montessori Hands On Discovery Environment",
    categoryId: "education",
    description: "Designs self-directed, tactile learning station guides encouraging independent mastery.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Montessori Hands On Discovery Environment",
      ruSectionName: "Композитный Multi-Skill: Multi Level Montessori Hands On Discovery Environment",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Montessori Hands On Discovery Environment.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Montessori Hands On Discovery Environment.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-math-concept-concrete-pictorial-abstract-cpa": {
    id: "education-multi-multi-method-math-concept-concrete-pictorial-abstract-cpa",
    name: "MultiMethodMathConceptConcretePictorialAbstractCPASkill",
    displayName: "Multi Method Math Concept Concrete Pictorial Abstract CPA",
    categoryId: "education",
    description: "Teaches math concepts through physical manipulatives, visual diagrams, and symbolic equations.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Math Concept Concrete Pictorial Abstract CPA",
      ruSectionName: "Композитный Multi-Skill: Multi Method Math Concept Concrete Pictorial Abstract CPA",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method Math Concept Concrete Pictorial Abstract CPA.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method Math Concept Concrete Pictorial Abstract CPA.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-executive-function-study-skills-coaching": {
    id: "education-multi-multi-stage-executive-function-study-skills-coaching",
    name: "MultiStageExecutiveFunctionStudySkillsCoachingSkill",
    displayName: "Multi Stage Executive Function Study Skills Coaching",
    categoryId: "education",
    description: "Teaches time blocking, note-taking (Cornell Method), prioritization, and exam prep strategy.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Executive Function Study Skills Coaching",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Executive Function Study Skills Coaching",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Executive Function Study Skills Coaching.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Executive Function Study Skills Coaching.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-higher-education-syllabus-rubric-architecture": {
    id: "education-multi-multi-level-higher-education-syllabus-rubric-architecture",
    name: "MultiLevelHigherEducationSyllabusRubricArchitectureSkill",
    displayName: "Multi Level Higher Education Syllabus Rubric Architecture",
    categoryId: "education",
    description: "Drafts university course syllabi with explicit grading rubrics, weekly readings, and policies.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Higher Education Syllabus Rubric Architecture",
      ruSectionName: "Композитный Multi-Skill: Multi Level Higher Education Syllabus Rubric Architecture",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Higher Education Syllabus Rubric Architecture.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Higher Education Syllabus Rubric Architecture.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-special-education-iep-goal-tracker": {
    id: "education-multi-multi-method-special-education-iep-goal-tracker",
    name: "MultiMethodSpecialEducationIEPGoalTrackerSkill",
    displayName: "Multi Method Special Education IEP Goal Tracker",
    categoryId: "education",
    description: "Drafts Individualized Education Program (IEP) measurable goals and progress monitoring metrics.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Special Education IEP Goal Tracker",
      ruSectionName: "Композитный Multi-Skill: Multi Method Special Education IEP Goal Tracker",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method Special Education IEP Goal Tracker.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method Special Education IEP Goal Tracker.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-medical-residency-case-based-clinical-teaching": {
    id: "education-multi-multi-stage-medical-residency-case-based-clinical-teaching",
    name: "MultiStageMedicalResidencyCaseBasedClinicalTeachingSkill",
    displayName: "Multi Stage Medical Residency Case Based Clinical Teaching",
    categoryId: "education",
    description: "Structures morning report case presentations teaching differential diagnosis and patient management.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Medical Residency Case Based Clinical Teaching",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Medical Residency Case Based Clinical Teaching",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Medical Residency Case Based Clinical Teaching.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Medical Residency Case Based Clinical Teaching.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-coding-bootcamp-project-milestone-roadmap": {
    id: "education-multi-multi-level-coding-bootcamp-project-milestone-roadmap",
    name: "MultiLevelCodingBootcampProjectMilestoneRoadmapSkill",
    displayName: "Multi Level Coding Bootcamp Project Milestone Roadmap",
    categoryId: "education",
    description: "Structures full-stack coding curriculum with daily labs, pair programming, and capstone reviews.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Coding Bootcamp Project Milestone Roadmap",
      ruSectionName: "Композитный Multi-Skill: Multi Level Coding Bootcamp Project Milestone Roadmap",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Coding Bootcamp Project Milestone Roadmap.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Coding Bootcamp Project Milestone Roadmap.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-science-inquiry-lab-experiment-manual": {
    id: "education-multi-multi-method-science-inquiry-lab-experiment-manual",
    name: "MultiMethodScienceInquiryLabExperimentManualSkill",
    displayName: "Multi Method Science Inquiry Lab Experiment Manual",
    categoryId: "education",
    description: "Drafts chemistry/physics lab manuals with safety protocols, hypothesis formulation, and data graphing.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Science Inquiry Lab Experiment Manual",
      ruSectionName: "Композитный Multi-Skill: Multi Method Science Inquiry Lab Experiment Manual",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method Science Inquiry Lab Experiment Manual.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method Science Inquiry Lab Experiment Manual.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-corporate-employee-upskilling-pathway": {
    id: "education-multi-multi-stage-corporate-employee-upskilling-pathway",
    name: "MultiStageCorporateEmployeeUpskillingPathwaySkill",
    displayName: "Multi Stage Corporate Employee Upskilling Pathway",
    categoryId: "education",
    description: "Designs professional certification tracks with micro-learning modules and skill verification.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Corporate Employee Upskilling Pathway",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Corporate Employee Upskilling Pathway",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Corporate Employee Upskilling Pathway.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Corporate Employee Upskilling Pathway.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-early-childhood-literacy-phonemic-awareness": {
    id: "education-multi-multi-level-early-childhood-literacy-phonemic-awareness",
    name: "MultiLevelEarlyChildhoodLiteracyPhonemicAwarenessSkill",
    displayName: "Multi Level Early Childhood Literacy Phonemic Awareness",
    categoryId: "education",
    description: "Structures phonics, sight word recognition, guided reading, and story comprehension activities.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Early Childhood Literacy Phonemic Awareness",
      ruSectionName: "Композитный Multi-Skill: Multi Level Early Childhood Literacy Phonemic Awareness",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Early Childhood Literacy Phonemic Awareness.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Early Childhood Literacy Phonemic Awareness.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-high-school-debate-argumentation-training": {
    id: "education-multi-multi-method-high-school-debate-argumentation-training",
    name: "MultiMethodHighSchoolDebateArgumentationTrainingSkill",
    displayName: "Multi Method High School Debate Argumentation Training",
    categoryId: "education",
    description: "Teaches claim-warrant-impact structure, cross-examination skills, and rebuttal flow sheets.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method High School Debate Argumentation Training",
      ruSectionName: "Композитный Multi-Skill: Multi Method High School Debate Argumentation Training",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method High School Debate Argumentation Training.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method High School Debate Argumentation Training.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-vocational-trade-apprenticeship-curriculum": {
    id: "education-multi-multi-stage-vocational-trade-apprenticeship-curriculum",
    name: "MultiStageVocationalTradeApprenticeshipCurriculumSkill",
    displayName: "Multi Stage Vocational Trade Apprenticeship Curriculum",
    categoryId: "education",
    description: "Structures electrician/welding hands-on shop practice, safety codes, and master sign-offs.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Vocational Trade Apprenticeship Curriculum",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Vocational Trade Apprenticeship Curriculum",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Vocational Trade Apprenticeship Curriculum.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Vocational Trade Apprenticeship Curriculum.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-music-theory-sight-reading-mastery-track": {
    id: "education-multi-multi-level-music-theory-sight-reading-mastery-track",
    name: "MultiLevelMusicTheorySightReadingMasteryTrackSkill",
    displayName: "Multi Level Music Theory Sight Reading Mastery Track",
    categoryId: "education",
    description: "Scaffolds pitch identification, rhythm dictation, interval training, and sight singing.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Music Theory Sight Reading Mastery Track",
      ruSectionName: "Композитный Multi-Skill: Multi Level Music Theory Sight Reading Mastery Track",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Music Theory Sight Reading Mastery Track.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Music Theory Sight Reading Mastery Track.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-history-primary-source-dbq-document-analysis": {
    id: "education-multi-multi-method-history-primary-source-dbq-document-analysis",
    name: "MultiMethodHistoryPrimarySourceDBQDocumentAnalysisSkill",
    displayName: "Multi Method History Primary Source DBQ Document Analysis",
    categoryId: "education",
    description: "Guides students analyzing historical primary sources for bias, context, and corroboration.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method History Primary Source DBQ Document Analysis",
      ruSectionName: "Композитный Multi-Skill: Multi Method History Primary Source DBQ Document Analysis",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method History Primary Source DBQ Document Analysis.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method History Primary Source DBQ Document Analysis.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-kindergarten-transition-social-readiness": {
    id: "education-multi-multi-stage-kindergarten-transition-social-readiness",
    name: "MultiStageKindergartenTransitionSocialReadinessSkill",
    displayName: "Multi Stage Kindergarten Transition Social Readiness",
    categoryId: "education",
    description: "Prepares young children for classroom routines, sharing, emotion regulation, and motor skills.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Kindergarten Transition Social Readiness",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Kindergarten Transition Social Readiness",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Kindergarten Transition Social Readiness.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Kindergarten Transition Social Readiness.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-art-history-visual-analysis-criticism": {
    id: "education-multi-multi-level-art-history-visual-analysis-criticism",
    name: "MultiLevelArtHistoryVisualAnalysisCriticismSkill",
    displayName: "Multi Level Art History Visual Analysis Criticism",
    categoryId: "education",
    description: "Teaches formal visual analysis (color, composition, medium) and cultural art history context.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Art History Visual Analysis Criticism",
      ruSectionName: "Композитный Multi-Skill: Multi Level Art History Visual Analysis Criticism",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Art History Visual Analysis Criticism.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Art History Visual Analysis Criticism.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-physical-education-fitness-health-unit": {
    id: "education-multi-multi-method-physical-education-fitness-health-unit",
    name: "MultiMethodPhysicalEducationFitnessHealthUnitSkill",
    displayName: "Multi Method Physical Education Fitness Health Unit",
    categoryId: "education",
    description: "Combines cardiovascular motor skills, team sportsmanship, and nutrition education.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Physical Education Fitness Health Unit",
      ruSectionName: "Композитный Multi-Skill: Multi Method Physical Education Fitness Health Unit",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method Physical Education Fitness Health Unit.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method Physical Education Fitness Health Unit.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-philosophy-ethics-thought-experiment-lab": {
    id: "education-multi-multi-stage-philosophy-ethics-thought-experiment-lab",
    name: "MultiStagePhilosophyEthicsThoughtExperimentLabSkill",
    displayName: "Multi Stage Philosophy Ethics Thought Experiment Lab",
    categoryId: "education",
    description: "Engages high school/college students in ethical debate using structured moral dilemmas.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Philosophy Ethics Thought Experiment Lab",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Philosophy Ethics Thought Experiment Lab",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Philosophy Ethics Thought Experiment Lab.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Philosophy Ethics Thought Experiment Lab.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-environmental-science-field-trip-guide": {
    id: "education-multi-multi-level-environmental-science-field-trip-guide",
    name: "MultiLevelEnvironmentalScienceFieldTripGuideSkill",
    displayName: "Multi Level Environmental Science Field Trip Guide",
    categoryId: "education",
    description: "Structures outdoor ecology field work collecting water samples, identifying species, and logging data.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Environmental Science Field Trip Guide",
      ruSectionName: "Композитный Multi-Skill: Multi Level Environmental Science Field Trip Guide",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Environmental Science Field Trip Guide.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Environmental Science Field Trip Guide.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-chess-tactical-opening-strategy-training": {
    id: "education-multi-multi-method-chess-tactical-opening-strategy-training",
    name: "MultiMethodChessTacticalOpeningStrategyTrainingSkill",
    displayName: "Multi Method Chess Tactical Opening Strategy Training",
    categoryId: "education",
    description: "Scaffolds chess tactical vision, opening principles, endgame patterns, and puzzle solving.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Chess Tactical Opening Strategy Training",
      ruSectionName: "Композитный Multi-Skill: Multi Method Chess Tactical Opening Strategy Training",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method Chess Tactical Opening Strategy Training.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method Chess Tactical Opening Strategy Training.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-culinary-arts-kitchen-safety-knife-skills": {
    id: "education-multi-multi-stage-culinary-arts-kitchen-safety-knife-skills",
    name: "MultiStageCulinaryArtsKitchenSafetyKnifeSkillsSkill",
    displayName: "Multi Stage Culinary Arts Kitchen Safety Knife Skills",
    categoryId: "education",
    description: "Structures commercial culinary training in knife cuts, food sanitation, and station prep.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Culinary Arts Kitchen Safety Knife Skills",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Culinary Arts Kitchen Safety Knife Skills",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Culinary Arts Kitchen Safety Knife Skills.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Culinary Arts Kitchen Safety Knife Skills.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-astronomy-stargazing-constellation-lab": {
    id: "education-multi-multi-level-astronomy-stargazing-constellation-lab",
    name: "MultiLevelAstronomyStargazingConstellationLabSkill",
    displayName: "Multi Level Astronomy Stargazing Constellation Lab",
    categoryId: "education",
    description: "Guides observational astronomy calculating celestial coordinates and planetary orbits.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Astronomy Stargazing Constellation Lab",
      ruSectionName: "Композитный Multi-Skill: Multi Level Astronomy Stargazing Constellation Lab",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Astronomy Stargazing Constellation Lab.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Astronomy Stargazing Constellation Lab.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-financial-literacy-money-management-unit": {
    id: "education-multi-multi-method-financial-literacy-money-management-unit",
    name: "MultiMethodFinancialLiteracyMoneyManagementUnitSkill",
    displayName: "Multi Method Financial Literacy Money Management Unit",
    categoryId: "education",
    description: "Teaches high school students budgeting, compound interest, credit scores, and tax basics.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Financial Literacy Money Management Unit",
      ruSectionName: "Композитный Multi-Skill: Multi Method Financial Literacy Money Management Unit",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method Financial Literacy Money Management Unit.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method Financial Literacy Money Management Unit.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-foreign-language-oral-fluency-drill": {
    id: "education-multi-multi-stage-foreign-language-oral-fluency-drill",
    name: "MultiStageForeignLanguageOralFluencyDrillSkill",
    displayName: "Multi Stage Foreign Language Oral Fluency Drill",
    categoryId: "education",
    description: "Practices conversational speed drills, verb conjugation, and real-world dialog simulation.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Foreign Language Oral Fluency Drill",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Foreign Language Oral Fluency Drill",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Foreign Language Oral Fluency Drill.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Foreign Language Oral Fluency Drill.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-architecture-design-drafting-studio": {
    id: "education-multi-multi-level-architecture-design-drafting-studio",
    name: "MultiLevelArchitectureDesignDraftingStudioSkill",
    displayName: "Multi Level Architecture Design Drafting Studio",
    categoryId: "education",
    description: "Guides architecture students from physical sketches and scale models to CAD rendering.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Architecture Design Drafting Studio",
      ruSectionName: "Композитный Multi-Skill: Multi Level Architecture Design Drafting Studio",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Architecture Design Drafting Studio.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Architecture Design Drafting Studio.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-journalism-news-reporting-ethics-unit": {
    id: "education-multi-multi-method-journalism-news-reporting-ethics-unit",
    name: "MultiMethodJournalismNewsReportingEthicsUnitSkill",
    displayName: "Multi Method Journalism News Reporting Ethics Unit",
    categoryId: "education",
    description: "Teaches interviewing techniques, lead paragraph writing, fact-checking, and media ethics.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Journalism News Reporting Ethics Unit",
      ruSectionName: "Композитный Multi-Skill: Multi Method Journalism News Reporting Ethics Unit",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method Journalism News Reporting Ethics Unit.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method Journalism News Reporting Ethics Unit.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-psychology-behavioral-experiment-design": {
    id: "education-multi-multi-stage-psychology-behavioral-experiment-design",
    name: "MultiStagePsychologyBehavioralExperimentDesignSkill",
    displayName: "Multi Stage Psychology Behavioral Experiment Design",
    categoryId: "education",
    description: "Guides undergraduate psychology students designing IRB-compliant human subject surveys.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Psychology Behavioral Experiment Design",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Psychology Behavioral Experiment Design",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Psychology Behavioral Experiment Design.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Psychology Behavioral Experiment Design.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-aviation-flight-school-ground-theory-track": {
    id: "education-multi-multi-level-aviation-flight-school-ground-theory-track",
    name: "MultiLevelAviationFlightSchoolGroundTheoryTrackSkill",
    displayName: "Multi Level Aviation Flight School Ground Theory Track",
    categoryId: "education",
    description: "Structures private pilot ground school in aerodynamics, weather METARs, navigation, and FAA rules.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Aviation Flight School Ground Theory Track",
      ruSectionName: "Композитный Multi-Skill: Multi Level Aviation Flight School Ground Theory Track",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Aviation Flight School Ground Theory Track.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Aviation Flight School Ground Theory Track.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-creative-writing-workshop-critique-protocol": {
    id: "education-multi-multi-method-creative-writing-workshop-critique-protocol",
    name: "MultiMethodCreativeWritingWorkshopCritiqueProtocolSkill",
    displayName: "Multi Method Creative Writing Workshop Critique Protocol",
    categoryId: "education",
    description: "Structures fiction workshop feedback rules balancing encouraging praise and constructive edits.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Creative Writing Workshop Critique Protocol",
      ruSectionName: "Композитный Multi-Skill: Multi Method Creative Writing Workshop Critique Protocol",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method Creative Writing Workshop Critique Protocol.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method Creative Writing Workshop Critique Protocol.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-agricultural-farming-youth-club-project": {
    id: "education-multi-multi-stage-agricultural-farming-youth-club-project",
    name: "MultiStageAgriculturalFarmingYouthClubProjectSkill",
    displayName: "Multi Stage Agricultural Farming Youth Club Project",
    categoryId: "education",
    description: "Guides 4-H / FFA students raising livestock or crops with financial record keeping.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Agricultural Farming Youth Club Project",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Agricultural Farming Youth Club Project",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Agricultural Farming Youth Club Project.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Agricultural Farming Youth Club Project.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-theatre-acting-improvisation-character-method": {
    id: "education-multi-multi-level-theatre-acting-improvisation-character-method",
    name: "MultiLevelTheatreActingImprovisationCharacterMethodSkill",
    displayName: "Multi Level Theatre Acting Improvisation Character Method",
    categoryId: "education",
    description: "Structures drama exercises in vocal projection, Stanislavski character motivation, and improv.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Theatre Acting Improvisation Character Method",
      ruSectionName: "Композитный Multi-Skill: Multi Level Theatre Acting Improvisation Character Method",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Theatre Acting Improvisation Character Method.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Theatre Acting Improvisation Character Method.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-oceanography-marine-biology-field-unit": {
    id: "education-multi-multi-method-oceanography-marine-biology-field-unit",
    name: "MultiMethodOceanographyMarineBiologyFieldUnitSkill",
    displayName: "Multi Method Oceanography Marine Biology Field Unit",
    categoryId: "education",
    description: "Teaches ocean currents, intertidal zone ecology, and marine organism dissection labs.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Oceanography Marine Biology Field Unit",
      ruSectionName: "Композитный Multi-Skill: Multi Method Oceanography Marine Biology Field Unit",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method Oceanography Marine Biology Field Unit.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method Oceanography Marine Biology Field Unit.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-robotics-first-lego-league-team-coaching": {
    id: "education-multi-multi-stage-robotics-first-lego-league-team-coaching",
    name: "MultiStageRoboticsFirstLegoLeagueTeamCoachingSkill",
    displayName: "Multi Stage Robotics First Lego League Team Coaching",
    categoryId: "education",
    description: "Guides youth robotics teams building autonomous EV3/Spike robots and research presentations.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Robotics First Lego League Team Coaching",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Robotics First Lego League Team Coaching",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Robotics First Lego League Team Coaching.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Robotics First Lego League Team Coaching.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-law-school-case-brief-socratic-dialogue": {
    id: "education-multi-multi-level-law-school-case-brief-socratic-dialogue",
    name: "MultiLevelLawSchoolCaseBriefSocraticDialogueSkill",
    displayName: "Multi Level Law School Case Brief Socratic Dialogue",
    categoryId: "education",
    description: "Teaches first-year law students IRAC case briefing and surviving cold-call Socratic questioning.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Law School Case Brief Socratic Dialogue",
      ruSectionName: "Композитный Multi-Skill: Multi Level Law School Case Brief Socratic Dialogue",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Law School Case Brief Socratic Dialogue.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Law School Case Brief Socratic Dialogue.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-entrepreneurship-pitch-deck-student-competition": {
    id: "education-multi-multi-method-entrepreneurship-pitch-deck-student-competition",
    name: "MultiMethodEntrepreneurshipPitchDeckStudentCompetitionSkill",
    displayName: "Multi Method Entrepreneurship Pitch Deck Student Competition",
    categoryId: "education",
    description: "Guides high school/college teams developing business MVPs and pitching to judges.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Entrepreneurship Pitch Deck Student Competition",
      ruSectionName: "Композитный Multi-Skill: Multi Method Entrepreneurship Pitch Deck Student Competition",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method Entrepreneurship Pitch Deck Student Competition.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method Entrepreneurship Pitch Deck Student Competition.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-public-speaking-toastmasters-speech-mastery": {
    id: "education-multi-multi-stage-public-speaking-toastmasters-speech-mastery",
    name: "MultiStagePublicSpeakingToastmastersSpeechMasterySkill",
    displayName: "Multi Stage Public Speaking Toastmasters Speech Mastery",
    categoryId: "education",
    description: "Scaffolds vocal variety, body language, eliminating filler words, and impromptu speaking.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Public Speaking Toastmasters Speech Mastery",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Public Speaking Toastmasters Speech Mastery",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Public Speaking Toastmasters Speech Mastery.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Public Speaking Toastmasters Speech Mastery.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-graphic-design-typography-layout-studio": {
    id: "education-multi-multi-level-graphic-design-typography-layout-studio",
    name: "MultiLevelGraphicDesignTypographyLayoutStudioSkill",
    displayName: "Multi Level Graphic Design Typography Layout Studio",
    categoryId: "education",
    description: "Teaches color theory, grid alignment, typography hierarchy, and Adobe Illustrator mastery.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Graphic Design Typography Layout Studio",
      ruSectionName: "Композитный Multi-Skill: Multi Level Graphic Design Typography Layout Studio",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Graphic Design Typography Layout Studio.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Graphic Design Typography Layout Studio.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-archaeology-excavation-fieldwork-manual": {
    id: "education-multi-multi-method-archaeology-excavation-fieldwork-manual",
    name: "MultiMethodArchaeologyExcavationFieldworkManualSkill",
    displayName: "Multi Method Archaeology Excavation Fieldwork Manual",
    categoryId: "education",
    description: "Teaches stratigraphic grid trench digging, artifact cataloging, and carbon dating theory.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Archaeology Excavation Fieldwork Manual",
      ruSectionName: "Композитный Multi-Skill: Multi Method Archaeology Excavation Fieldwork Manual",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method Archaeology Excavation Fieldwork Manual.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method Archaeology Excavation Fieldwork Manual.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-dental-school-pre-clinical-cavity-prep-lab": {
    id: "education-multi-multi-stage-dental-school-pre-clinical-cavity-prep-lab",
    name: "MultiStageDentalSchoolPreClinicalCavityPrepLabSkill",
    displayName: "Multi Stage Dental School Pre Clinical Cavity Prep Lab",
    categoryId: "education",
    description: "Guides dental students practicing drill ergonomics and tooth restoration on typodont models.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Dental School Pre Clinical Cavity Prep Lab",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Dental School Pre Clinical Cavity Prep Lab",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Dental School Pre Clinical Cavity Prep Lab.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Dental School Pre Clinical Cavity Prep Lab.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-meteorology-weather-map-synoptic-analysis": {
    id: "education-multi-multi-level-meteorology-weather-map-synoptic-analysis",
    name: "MultiLevelMeteorologyWeatherMapSynopticAnalysisSkill",
    displayName: "Multi Level Meteorology Weather Map Synoptic Analysis",
    categoryId: "education",
    description: "Teaches reading isobar weather charts, satellite radar, and forecasting storm fronts.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Meteorology Weather Map Synoptic Analysis",
      ruSectionName: "Композитный Multi-Skill: Multi Level Meteorology Weather Map Synoptic Analysis",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Meteorology Weather Map Synoptic Analysis.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Meteorology Weather Map Synoptic Analysis.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-veterinary-assistant-animal-handling-unit": {
    id: "education-multi-multi-method-veterinary-assistant-animal-handling-unit",
    name: "MultiMethodVeterinaryAssistantAnimalHandlingUnitSkill",
    displayName: "Multi Method Veterinary Assistant Animal Handling Unit",
    categoryId: "education",
    description: "Structures training in animal restraint, vitals monitoring, surgical prep, and pharmacy math.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Veterinary Assistant Animal Handling Unit",
      ruSectionName: "Композитный Multi-Skill: Multi Method Veterinary Assistant Animal Handling Unit",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method Veterinary Assistant Animal Handling Unit.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method Veterinary Assistant Animal Handling Unit.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-film-production-camera-lighting-crew-guide": {
    id: "education-multi-multi-stage-film-production-camera-lighting-crew-guide",
    name: "MultiStageFilmProductionCameraLightingCrewGuideSkill",
    displayName: "Multi Stage Film Production Camera Lighting Crew Guide",
    categoryId: "education",
    description: "Teaches 3-point lighting setup, camera focal length choice, boom mic audio, and slate protocol.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Film Production Camera Lighting Crew Guide",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Film Production Camera Lighting Crew Guide",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Film Production Camera Lighting Crew Guide.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Film Production Camera Lighting Crew Guide.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-level-forestry-conservation-timber-cruise-lab": {
    id: "education-multi-multi-level-forestry-conservation-timber-cruise-lab",
    name: "MultiLevelForestryConservationTimberCruiseLabSkill",
    displayName: "Multi Level Forestry Conservation Timber Cruise Lab",
    categoryId: "education",
    description: "Teaches tree species identification, inclinometer height measurement, and forest management.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Forestry Conservation Timber Cruise Lab",
      ruSectionName: "Композитный Multi-Skill: Multi Level Forestry Conservation Timber Cruise Lab",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level Forestry Conservation Timber Cruise Lab.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level Forestry Conservation Timber Cruise Lab.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-method-emergency-medical-technician-emt-basic-prep": {
    id: "education-multi-multi-method-emergency-medical-technician-emt-basic-prep",
    name: "MultiMethodEmergencyMedicalTechnicianEMTBasicPrepSkill",
    displayName: "Multi Method Emergency Medical Technician EMT Basic Prep",
    categoryId: "education",
    description: "Structures EMT training in CPR, trauma triage, splinting, and ambulance radio reports.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Emergency Medical Technician EMT Basic Prep",
      ruSectionName: "Композитный Multi-Skill: Multi Method Emergency Medical Technician EMT Basic Prep",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Method Emergency Medical Technician EMT Basic Prep.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Method Emergency Medical Technician EMT Basic Prep.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-stage-cyber-defense-high-school-capture-the-flag": {
    id: "education-multi-multi-stage-cyber-defense-high-school-capture-the-flag",
    name: "MultiStageCyberDefenseHighSchoolCaptureTheFlagSkill",
    displayName: "Multi Stage Cyber Defense High School Capture The Flag",
    categoryId: "education",
    description: "Guides student cybersecurity teams solving password cracking and network packet analysis CTFs.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Cyber Defense High School Capture The Flag",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Cyber Defense High School Capture The Flag",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Cyber Defense High School Capture The Flag.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Cyber Defense High School Capture The Flag.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },

  "education-multi-multi-horizon-master-pedagogical-instructional-framework": {
    id: "education-multi-multi-horizon-master-pedagogical-instructional-framework",
    name: "MultiHorizonMasterPedagogicalInstructionalFrameworkSkill",
    displayName: "Multi Horizon Master Pedagogical Instructional Framework",
    categoryId: "education",
    description: "Enforces master instructional design, learning taxonomy, differentiated scaffolding, and student outcome mastery.",
    tags: ["education","multi-skill","education-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Master Pedagogical Instructional Framework",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Master Pedagogical Instructional Framework",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Horizon Master Pedagogical Instructional Framework.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Horizon Master Pedagogical Instructional Framework.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["education","multi-skill","education-multi"],
    }),
  },
};
