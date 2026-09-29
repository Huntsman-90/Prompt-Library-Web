import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const WRITING_SKILLS: Record<string, SkillDefinition> = {
  'persuasive-copy-arc': {
    id: 'persuasive-copy-arc',
    name: 'PersuasiveCopyArcSkill',
    displayName: 'PAS / AIDA Narrative Persuasion Arc',
    categoryId: 'writing',
    description: 'Constructs psychological persuasion flow: Problem, Agitation, Solution, Proof, and Call to Action.',
    tags: ['writing', 'copywriting', 'pas', 'aida', 'persuasion', 'marketing'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Арка Убеждения и Психологическая Динамика (PAS)',
        'Narrative Persuasion Arc (PAS / AIDA)',
        [
          '- **Боль (Problem)**: Точно вскрыть острую проблему и скрытые финансовые/временные потери клиента.',
          '- **Усиление (Agitation)**: Показать цену бездействия и неизбежную деградацию ситуации.',
          '- **Решение (Solution)**: Представить элегантное системное решение без лишнего пафоса.',
          '- **Доказательства (Proof)**: Привести конкретные кейсы, бенчмарки и цифры конверсии.',
          '- **Призыв к действию (CTA)**: Сформулировать четкий, низкобарьерный следующий шаг.',
        ],
        [
          '- **Problem Hook**: Articulate the acute customer friction point and latent financial burn.',
          '- **Agitation**: Expose compounding cost of inaction and status-quo inertia.',
          '- **Solution**: Deliver an elegant, differentiated solution architecture.',
          '- **Proof & Evidence**: Ground value claims in empirical telemetry and benchmarks.',
          '- **Definitive CTA**: Formulate a frictionless, high-urgency call to action.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'executive-memo-style': {
    id: 'executive-memo-style',
    name: 'ExecutiveMemoStyleSkill',
    displayName: 'Executive Narrative Memo (Amazon 6-Pager)',
    categoryId: 'writing',
    description: 'Formats communication into a crisp narrative memo with context, customer friction, and decision asks.',
    tags: ['writing', 'executive', 'memo', 'leadership', 'narrative', 'amazon'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Формат Исполнительного Меморандума (Narrative Memo)',
        'Executive Narrative Memo Architecture',
        [
          '- **Контекст и Стратегическая Цель**: Обоснование приоритета для бизнеса в первой главе.',
          '- **Голос Клиента**: Реальные цитаты, метрики недовольства и данные обратной связи.',
          '- **Ключевые Принципы**: 3–5 догматов, которыми руководствовались при выборе пути.',
          '- **Запрос Решения (The Ask)**: Точный объем требуемых ресурсов, сроков и финальное решение.',
        ],
        [
          '- **Strategic Context**: Articulate enterprise business mandate and macro strategic alignment in paragraph 1.',
          '- **Customer Voice & Friction**: Concrete qualitative and quantitative customer pain signals.',
          '- **Guiding Tenets**: 3–5 non-negotiable principles anchoring all trade-off decisions.',
          '- **The Strategic Ask**: Unambiguous resource allocation, governance mandate, and timeline commitment requested.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'inverted-pyramid-copy': {
    id: 'inverted-pyramid-copy',
    name: 'InvertedPyramidCopySkill',
    displayName: 'Inverted Pyramid Journalism Structure',
    categoryId: 'writing',
    description: 'Structures writing with crucial facts at the top, followed by supporting evidence and background context.',
    tags: ['writing', 'journalism', 'clarity', 'speed-reading', 'hierarchy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Принцип Перевернутой Пирамиды (Inverted Pyramid)',
        'Inverted Pyramid Information Hierarchy',
        [
          '- **Вершина пирамиды**: Самый главный факт (Кто, Что, Где, Когда, Почему) в первых 30 словах.',
          '- **Тело статьи**: Важные подробности, доказательная база, цитаты и цифры.',
          '- **Основание пирамиды**: Исторический контекст и второстепенные детали, которые можно отрезать без потери смысла.',
        ],
        [
          '- **Apex of Pyramid**: Most critical revelation (Who, What, Where, When, Why) delivered within the first 30 words.',
          '- **Supporting Body**: Substantive evidence, corroborating statistics, direct quotes, and technical specifics.',
          '- **Base of Pyramid**: Historical context and supplementary color that can be truncated without compromising comprehension.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'active-voice-density': {
    id: 'active-voice-density',
    name: 'ActiveVoiceDensitySkill',
    displayName: 'Active Voice & Verb-First Cadence',
    categoryId: 'writing',
    description: 'Eliminates passive voice and nominalizations, driving high-tempo verb-first prose.',
    tags: ['writing', 'active-voice', 'verbs', 'rhythm', 'conciseness'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Требования к Активному Залогу и Глагольной Динамике',
        'Active Voice & Verb-First Directives',
        [
          '- Полный запрет на пассивный залог («было сделано», «производится расчет» -> «инженеры внедрили», «система рассчитывает»).',
          '- Заменять отглагольные существительные («осуществление оптимизации») на энергичные глаголы («оптимизировать»).',
        ],
        [
          '- Strict prohibition of passive voice ("it was implemented" -> "we engineered", "the pipeline executes").',
          '- Eradicate nominalizations and bureaucratic fluff in favor of strong dynamic action verbs.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'sensory-rhetoric-hook': {
    id: 'sensory-rhetoric-hook',
    name: 'SensoryRhetoricHookSkill',
    displayName: 'Sensory Hook & Concrete Metaphors',
    categoryId: 'writing',
    description: 'Engages reader attention using tangible sensory imagery and concrete real-world metaphors.',
    tags: ['writing', 'hooks', 'metaphor', 'sensory', 'engagement'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Сенсорные Крючки и Наглядные Метафоры',
        'Sensory Hooks & Tangible Metaphor Crafting',
        [
          '- Начинать текст с яркого осязаемого образа, иллюстрирующего масштаб проблемы.',
          '- Заменять абстрактные концепции на физические аналогии (например, «бутылочное горлышко шлюза» вместо «задержка»).',
        ],
        [
          '- Open text with a vivid sensory anchor illustrating the physical/operational magnitude of problem.',
          '- Ground intangible concepts in concrete kinetic metaphors to anchor reader memory.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'storybrand-framework': {
    id: 'storybrand-framework',
    name: 'StoryBrandFrameworkSkill',
    displayName: 'StoryBrand Hero\'s Journey Framework',
    categoryId: 'writing',
    description: 'Positions the customer as the Hero, the company as the Guide, with a plan that avoids failure.',
    tags: ['writing', 'storybrand', 'narrative', 'hero', 'guide', 'marketing'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Фреймворк StoryBrand (Клиент — Герой)',
        'StoryBrand Narrative Positioning',
        [
          '1. **Герой (Клиент)**: Имеет четкое желание и сталкивается с внешним/внутренним препятствием.',
          '2. **Проводник (Наш Продукт)**: Проявляет эмпатию и демонстрирует непререкаемый авторитет.',
          '3. **Понятный План**: Дает 3 простых шага к успеху.',
          '4. **Ставки**: Четко показывает картину триумфа (успех) и картину катастрофы (провал).',
        ],
        [
          '1. **Hero (Customer)**: Encounters a villainous external/internal blocker.',
          '2. **The Guide (Product)**: Demonstrates deep empathy and undeniable domain authority.',
          '3. **The 3-Step Plan**: Provides a frictionless, unambiguous path forward.',
          '4. **The Stakes**: Paints vivid pictures of both catastrophic failure and triumph.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'problem-agitation-solution': {
    id: 'problem-agitation-solution',
    name: 'ProblemAgitationSolutionSkill',
    displayName: 'High-Velocity PAS Copywriter',
    categoryId: 'writing',
    description: 'Generates tight, punchy PAS copy optimized for high conversion rates on landing pages and cold emails.',
    tags: ['writing', 'pas', 'conversion', 'cold-email', 'landing-page'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Высокоскоростная Структура PAS',
        'High-Velocity PAS Architecture',
        [
          '- 1-й абзац: Боль. 2-й абзац: Усиление последствий. 3-й абзац: Легкое решение. 4-й абзац: Прямой призыв к действию.',
        ],
        [
          '- Paragraph 1: Pain. Paragraph 2: Compounding Agitation. Paragraph 3: Turnkey Solution. Paragraph 4: Low-friction CTA.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'cognitive-rhythm-cadence': {
    id: 'cognitive-rhythm-cadence',
    name: 'CognitiveRhythmCadenceSkill',
    displayName: 'Prose Rhythm & Sentence Length Variation',
    categoryId: 'writing',
    description: 'Alternates short punchy sentences with longer flowing explanatory cadences (Gary Provost style).',
    tags: ['writing', 'rhythm', 'cadence', 'prose', 'style', 'engagement'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Ритмика Текста и Варьирование Длины Предложений',
        'Prose Cadence & Sentence Length Modulation',
        [
          '- Чередовать короткие предложения (3-5 слов) с развернутыми аналитическими конструкциями для поддержания музыкального ритма чтения.',
        ],
        [
          '- Modulate sentence lengths dynamically: alternate punchy fragments (3-5 words) with rich analytical clauses to sustain reading momentum.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'microcopy-clarity': {
    id: 'microcopy-clarity',
    name: 'MicrocopyClaritySkill',
    displayName: 'UX Microcopy & Button Hook Writing',
    categoryId: 'writing',
    description: 'Crafts high-converting, reassuring interface microcopy, button CTAs, and tooltip explanations.',
    tags: ['writing', 'microcopy', 'ux', 'cta', 'buttons', 'tooltips'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Микрокопирайтинг Интерфейсных Текстов',
        'Interface Microcopy & CTA Design',
        [
          '- Кнопки CTA должны отвечать на вопрос пользователя: «Я хочу... [действие + результат]».',
          '- Тексты ошибок обязаны содержать понятное объяснение причины и конкретную инструкцию по исправлению.',
        ],
        [
          '- CTA buttons must complete the user thought: "I want to... [action + benefit]".',
          '- Error microcopy must explain root cause clearly and provide a 1-click corrective remedy.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'technical-storytelling': {
    id: 'technical-storytelling',
    name: 'TechnicalStorytellingSkill',
    displayName: 'Technical Architecture Storytelling',
    categoryId: 'writing',
    description: 'Translates dry system architecture and refactoring into a compelling narrative of technical triumph.',
    tags: ['writing', 'storytelling', 'engineering-blog', 'case-study'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Инженерный Сторителлинг (Tech Blog Narrative)',
        'Engineering Narrative & Case Study Arc',
        [
          '- Структура: 1. Вызов и масштаб проблемы, 2. Неудачные первые попытки, 3. Архитектурный прорыв, 4. Результаты в продакшене.',
        ],
        [
          '- Narrative Arc: 1. The Scaling Challenge, 2. The Failed Naive Attempts, 3. The Architectural Breakthrough, 4. Telemetry in Production.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'headline-hook-engine': {
    id: 'headline-hook-engine',
    name: 'HeadlineHookEngineSkill',
    displayName: 'Viral Headline & Hook Generator',
    categoryId: 'writing',
    description: 'Generates 5 distinct headline formulas: How-To, Contrarian, Numbered, Curiosity Gap, and Direct Benefit.',
    tags: ['writing', 'headlines', 'hooks', 'copywriting', 'viral'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Спецификация Заголовков и Крючков',
        'Headline Hook Formulation Matrix',
        [
          'Предоставить 5 вариантов заголовка: 1. Противоречивый (Contrarian), 2. Прямая выгода, 3. С числом/статистикой, 4. Любопытство, 5. Инструкция (How-To).',
        ],
        [
          'Provide 5 distinct headline candidates: 1. Contrarian, 2. Direct Value, 3. Quantified Data, 4. Curiosity Gap, 5. Tactical How-To.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'analogy-bridge-crafting': {
    id: 'analogy-bridge-crafting',
    name: 'AnalogyBridgeCraftingSkill',
    displayName: 'Conceptual Analogy Bridge Building',
    categoryId: 'writing',
    description: 'Connects difficult technical abstractions to familiar everyday concepts via three-step bridge analogies.',
    tags: ['writing', 'analogy', 'education', 'clarity', 'metaphor'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Мостовые Аналогии (Analogy Bridge)',
        'Conceptual Analogy Bridge Protocol',
        [
          '- Шаг 1: Знакомый образ. Шаг 2: Мост сравнения (что общего). Шаг 3: Перенос на техническую архитектуру.',
        ],
        [
          '- Step 1: Familiar Everyday Domain. Step 2: Mapping Bridge. Step 3: Technical System Equivalence.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'objection-demolition-copy': {
    id: 'objection-demolition-copy',
    name: 'ObjectionDemolitionCopySkill',
    displayName: 'Pre-Emptive Objection Demolition',
    categoryId: 'writing',
    description: 'Identifies the 3 biggest customer hesitations (Price, Risk, Time) and demolishes them pre-emptively.',
    tags: ['writing', 'objections', 'sales', 'conversion', 'hesitation'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Превентивная Отработка Возражений',
        'Pre-Emptive Objection Demolition Protocol',
        [
          '- Выявить 3 главных сомнения («Слишком дорого», «Сложно внедрить», «У нас уже есть решение») и ответить фактами до того, как их озвучат.',
        ],
        [
          '- Identify the top 3 cognitive hesitations (Cost, Migration Friction, Sunk Cost) and dismantle them with hard proof.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'high-density-brevity': {
    id: 'high-density-brevity',
    name: 'HighDensityBrevitySkill',
    displayName: 'High-Density Word Count Compression',
    categoryId: 'writing',
    description: 'Compresses text by 50% without dropping a single substantive fact or technical requirement.',
    tags: ['writing', 'compression', 'brevity', 'density', 'editing'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Сжатие Объема и Высокая Плотность Текста',
        'Word Count Compression & Density Directives',
        [
          '- Сократить объем текста на 50%, удалив слова-паразиты, вводные конструкции и дублирующиеся смыслы.',
        ],
        [
          '- Compress word count by 50% while preserving 100% of substantive data points, code contracts, and requirements.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'plain-language-translation': {
    id: 'plain-language-translation',
    name: 'PlainLanguageTranslationSkill',
    displayName: 'Plain Language Legal & Technical Translation',
    categoryId: 'writing',
    description: 'Translates convoluted legalese and engineering jargon into clear, friendly, human-accessible language.',
    tags: ['writing', 'plain-language', 'simplification', 'accessibility'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Перевод на Понятный Человеческий Язык (Plain Language)',
        'Plain Language Translation Protocol',
        [
          '- Переписать сложные технические/юридические формулировки простыми словами с сохранением юридической и технической силы.',
        ],
        [
          '- Translate complex regulatory or architectural clauses into plain, human-readable prose without compromising accuracy.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
