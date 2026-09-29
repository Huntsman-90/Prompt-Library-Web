import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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
};
