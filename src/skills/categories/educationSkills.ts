import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const EDUCATION_SKILLS: Record<string, SkillDefinition> = {
  'scaffolding-pedagogy': {
    id: 'scaffolding-pedagogy',
    name: 'ScaffoldingPedagogySkill',
    displayName: 'Vygotsky Scaffolding & Zone of Proximal Development',
    categoryId: 'education',
    description: 'Builds progressive educational scaffolds (Foundations -> Guided Practice -> Independent Synthesis).',
    tags: ['education', 'pedagogy', 'scaffolding', 'vygotsky', 'zpd', 'learning'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Педагогические Строительные Леса (Scaffolding / ZPD)',
        'Vygotskian Scaffolding & Progressive Mastery Protocol',
        [
          '- **Уровень 1 (Фундамент)**: Наглядный интуитивный разбор базового принципа.',
          '- **Уровень 2 (Совместная практика)**: Пошаговый разбор эталонной задачи с подробными подсказками.',
          '- **Уровень 3 (Самостоятельный синтез)**: Сложная задача для самостоятельного решения с критериями самопроверки.',
        ],
        [
          '- **Tier 1 (Foundational Intuition)**: Ground the core conceptual mechanism in accessible terms.',
          '- **Tier 2 (Guided Practice)**: Worked example walking through derivation with structured hints.',
          '- **Tier 3 (Independent Synthesis)**: High-complexity challenge problem validating autonomous mastery.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'feynman-technique': {
    id: 'feynman-technique',
    name: 'FeynmanTechniqueSkill',
    displayName: 'Feynman Conceptual Reduction Technique',
    categoryId: 'education',
    description: 'Explains complex technical and scientific concepts so simply that a bright 12-year-old understands.',
    tags: ['education', 'feynman', 'simplification', 'analogies', 'clarity'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Метод Объяснения Ричарда Фейнмана',
        'Feynman Conceptual Reduction Protocol',
        [
          '- Объяснить концепт простым языком без заумных терминов, используя наглядную аналогию из реального мира.',
          '- Если термин неизбежен — сразу дать ему кристально понятное объяснение «на пальцах».',
        ],
        [
          '- Deconstruct the abstract concept using plain language and intuitive real-world physical analogies.',
          '- Whenever a domain-specific term is introduced, define it instantly via a crisp plain-English metaphor.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'knowledge-check-quiz': {
    id: 'knowledge-check-quiz',
    name: 'KnowledgeCheckQuizSkill',
    displayName: 'Formative Diagnostic Quiz & Misconception Traps',
    categoryId: 'education',
    description: 'Generates 3 calibrated quiz questions with plausible distractor options that expose shallow understanding.',
    tags: ['education', 'quiz', 'assessment', 'misconceptions', 'tests'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Диагностический Квиз с Разбором Заблуждений',
        'Formative Diagnostic Assessment & Quiz Matrix',
        [
          'Сформулировать 3 проверочных вопроса с вариантами ответа (A, B, C, D):',
          '- Включить варианты с распространенными заблуждениями (distractors).',
          '- Привести подробное объяснение, почему неверные варианты ошибочны.',
        ],
        [
          'Formulate 3 diagnostic multiple-choice questions (Options A, B, C, D):',
          '- Embed plausible misconception traps (distractors) exposing surface-level rote memorization.',
          '- Provide granular explanations detailing why incorrect choices fail.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'bloom-taxonomy-progression': {
    id: 'bloom-taxonomy-progression',
    name: 'BloomTaxonomyProgressionSkill',
    displayName: 'Bloom\'s Taxonomy 6-Level Cognitive Progression',
    categoryId: 'education',
    description: 'Guides student through Bloom\'s 6 levels: Remember -> Understand -> Apply -> Analyze -> Evaluate -> Create.',
    tags: ['education', 'bloom', 'taxonomy', 'cognitive-progression', 'curriculum'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Когнитивная Лестница Таксономии Блума',
        'Bloom\'s Taxonomy 6-Tier Cognitive Progression',
        [
          '1. Знание (Запомнить) -> 2. Понимание (Объяснить) -> 3. Применение (Использовать) -> 4. Анализ (Разобрать) -> 5. Оценка (Сравнить) -> 6. Создание (Синтезировать новое).',
        ],
        [
          '1. Remember -> 2. Understand -> 3. Apply -> 4. Analyze -> 5. Evaluate -> 6. Create.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'misconception-diagnostics': {
    id: 'misconception-diagnostics',
    name: 'MisconceptionDiagnosticsSkill',
    displayName: 'Pre-Emptive Misconception Eradication',
    categoryId: 'education',
    description: 'Identifies the top 3 common myths/misunderstandings in the topic and systematically dismantles them.',
    tags: ['education', 'misconceptions', 'myths', 'clarity', 'unlearning'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Устранение Типичных Заблуждений (Misconceptions)',
        'Pre-Emptive Misconception Eradication Protocol',
        [
          '- Выделить 3 частых мифа / типичных ошибки новичков и доказать, почему они ошибочны.',
        ],
        [
          '- Identify the top 3 prevalent conceptual myths and demonstrate with counterexamples why they fail.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'spaced-repetition-prompter': {
    id: 'spaced-repetition-prompter',
    name: 'SpacedRepetitionPrompterSkill',
    displayName: 'Anki Spaced Repetition Flashcard Synthesizer',
    categoryId: 'education',
    description: 'Converts material into atomic, high-retention Anki / SuperMemo flashcards with cloze deletions.',
    tags: ['education', 'spaced-repetition', 'anki', 'flashcards', 'memory'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Флэш-Карточки для Интервального Повторения (Anki Cards)',
        'Anki Spaced Repetition Flashcard Deck',
        [
          'Сформировать 5 атомарных карточек: `Вопрос / Лицевая сторона (Front)` <-> `Ответ / Обратная сторона (Back)`.',
        ],
        [
          'Synthesize 5 atomic Anki flashcards with cloze deletions: `{{c1::Fact}}` and explicit Q&A prompt pairs.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'worked-example-tutorial': {
    id: 'worked-example-tutorial',
    name: 'WorkedExampleTutorialSkill',
    displayName: 'Cognitive Load Worked-Example Tutorial',
    categoryId: 'education',
    description: 'Applies Sweller\'s Cognitive Load Theory to present step-by-step worked examples with self-explanation prompts.',
    tags: ['education', 'worked-example', 'cognitive-load', 'tutorial', 'step-by-step'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Пошаговый Разбор Примера (Worked Example Effect)',
        'Cognitive Load Worked-Example Protocol',
        [
          '- Провести полный разбор сложной задачи от исходного состояния до готового решения с объяснением логики каждого шага.',
        ],
        [
          '- Deliver a complete step-by-step worked example annotated with explicit self-explanation prompts.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'dual-coding-visual-analogy': {
    id: 'dual-coding-visual-analogy',
    name: 'DualCodingVisualAnalogySkill',
    displayName: 'Paivio Dual-Coding Visual-Verbal Mapping',
    categoryId: 'education',
    description: 'Combines textual explanations with complementary visual ASCII diagrams for dual-channel memory encoding.',
    tags: ['education', 'dual-coding', 'visual', 'paivio', 'memory'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Двойное Кодирование Памяти (Текст + ASCII Схема)',
        'Paivio Dual-Coding Verbal-Visual Protocol',
        [
          '- Сопроводить каждое ключевое понятие наглядной ASCII-диаграммой или пространственной схемой.',
        ],
        [
          '- Anchor every verbal abstraction with an accompanying structural ASCII diagram for dual cognitive encoding.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'formative-feedback-rubric': {
    id: 'formative-feedback-rubric',
    name: 'FormativeFeedbackRubricSkill',
    displayName: 'Constructive Formative Feedback Rubric',
    categoryId: 'education',
    description: 'Provides pedagogical feedback: Praise for correct instincts, specific flaw diagnoses, and actionable fix prompts.',
    tags: ['education', 'feedback', 'rubric', 'pedagogy', 'constructive'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Формирующая Обратная Связь (Constructive Feedback)',
        'Constructive Formative Feedback Framework',
        [
          '- 1. Что сделано верно (Strengths) -> 2. Точная точка сбоя (Defect Diagnosis) -> 3. Направляющий вопрос для исправления.',
        ],
        [
          '- 1. Validated Foundations -> 2. Precise Root Cause of Misunderstanding -> 3. Guided Self-Correction Challenge.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'curiosity-hook-intro': {
    id: 'curiosity-hook-intro',
    name: 'CuriosityHookIntroSkill',
    displayName: 'Curiosity Gap & Paradox Hook Introduction',
    categoryId: 'education',
    description: 'Hooks student curiosity by presenting a counter-intuitive paradox or mystery before revealing the principle.',
    tags: ['education', 'curiosity', 'paradox', 'engagement', 'hook'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Интригующее Вступление (Парадокс и Любопытство)',
        'Paradoxical Curiosity Hook Introduction',
        [
          '- Открыть объяснение контринтуитивным парадоксом (например, «Почему добавление серверов может замедлить систему?»).',
        ],
        [
          '- Open lesson with a counter-intuitive operational paradox to trigger active epistemic curiosity.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'conceptual-prerequisites-mapper': {
    id: 'conceptual-prerequisites-mapper',
    name: 'ConceptualPrerequisitesMapperSkill',
    displayName: 'Conceptual Prerequisites Dependency Graph',
    categoryId: 'education',
    description: 'Maps out required foundational concepts (Prerequisites) before diving into advanced material.',
    tags: ['education', 'prerequisites', 'dependencies', 'curriculum', 'learning-path'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'context',
        'Необходимые Предварительные Знания (Prerequisites)',
        'Conceptual Prerequisites Dependency Matrix',
        [
          '- Перечислить 3 базовые концепции, знание которых обязательно перед переходом к текущей теме.',
        ],
        [
          '- Itemize 3 prerequisite concepts required to successfully comprehend target material.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'interactive-simulation-script': {
    id: 'interactive-simulation-script',
    name: 'InteractiveSimulationScriptSkill',
    displayName: 'Interactive Mental Sandbox Simulation',
    categoryId: 'education',
    description: 'Runs a dynamic step-by-step roleplay simulation where the student tests hypotheses in a safe sandbox.',
    tags: ['education', 'simulation', 'sandbox', 'interactive', 'experiment'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Интерактивная Симуляция и Ментальная Песочница',
        'Interactive Mental Sandbox Simulation Protocol',
        [
          '- Предложить пользователю смоделировать изменение параметров системы и наблюдать за виртуальным поведением.',
        ],
        [
          '- Provide an interactive sandbox scenario prompting student to adjust variables and observe synthetic system response.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'self-paced-mastery-criteria': {
    id: 'self-paced-mastery-criteria',
    name: 'SelfPacedMasteryCriteriaSkill',
    displayName: 'Bloom Mastery Learning Criteria',
    categoryId: 'education',
    description: 'Enforces Benjamin Bloom\'s 80%+ mastery threshold before allowing advancement to the next module.',
    tags: ['education', 'mastery', 'bloom', 'criteria', 'pacing'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Критерии Полного Освоения Материала (Mastery Learning)',
        'Mastery Learning Threshold Criteria',
        [
          '- Обучаемый должен безошибочно решить контрольную задачу, прежде чем переходить к более сложной теме.',
        ],
        [
          '- Mandate 100% correct resolution of diagnostic synthesis challenge before advancing to advanced modules.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'metacognitive-study-guide': {
    id: 'metacognitive-study-guide',
    name: 'MetacognitiveStudyGuideSkill',
    displayName: 'Metacognitive Executive Summary & Study Guide',
    categoryId: 'education',
    description: 'Generates a comprehensive cheat sheet, self-testing questions, and common pitfall checklists.',
    tags: ['education', 'study-guide', 'cheat-sheet', 'summary', 'revision'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Шпаргалка и Учебный Гайд (Study Guide)',
        'Metacognitive Study Guide & Summary Cheat Sheet',
        [
          '- Оформить шпаргалку: 1. Ключевые термины, 2. Главные формулы/паттерны, 3. Чек-лист самопроверки перед экзаменом.',
        ],
        [
          '- Emit a high-yield study sheet: 1. Core Taxonomy, 2. Key Architecture Invariants, 3. Pre-Exam Self-Test Checklist.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
