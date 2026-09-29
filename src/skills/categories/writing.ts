import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
} from '../skillHelpers';

export const WRITING_SKILLS: Record<string, SkillDefinition> = {
  'pyramid-principle-minto': {
    id: 'pyramid-principle-minto',
    name: 'PyramidPrincipleMintoSkill',
    displayName: 'Minto Pyramid Principle (SCQA)',
    categoryId: 'writing',
    description: 'Structures communication top-down: starts with the answer/recommendation first, backed by MECE arguments.',
    tags: ['writing', 'minto', 'pyramid', 'scqa', 'executive', 'communication', 'mece'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Принцип Пирамиды Минто (Minto Pyramid & SCQA)',
        'Minto Pyramid Principle & SCQA Executive Structure',
        [
          '- **Главный вывод в самом начале (BLUF)**: Начинать с итогового решения или ключевой рекомендации в первом предложении.',
          '- **Структура SCQA**: Вводная часть по схеме: Situation (Ситуация) -> Complication (Осложнение) -> Question (Вопрос) -> Answer (Ответ).',
          '- **Принцип MECE**: Аргументы поддержки должны быть взаимно исключающими и совместно исчерпывающими (Mutually Exclusive, Collectively Exhaustive).',
        ],
        [
          '- **Bottom Line Up Front (BLUF)**: Lead with the final decision or core recommendation in the opening sentence.',
          '- **SCQA Narrative Intro**: Frame context: Situation -> Complication -> Central Question -> Core Answer.',
          '- **MECE Argument Hierarchy**: Group supporting arguments into Mutually Exclusive, Collectively Exhaustive analytical clusters.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'executive-brevity-craft': {
    id: 'executive-brevity-craft',
    name: 'ExecutiveBrevityCraftSkill',
    displayName: 'Executive Brevity & High-Signal Writing',
    categoryId: 'writing',
    description: 'Eliminates passive voice, weak adverbs, and filler words to maximize signal-to-noise ratio.',
    tags: ['writing', 'brevity', 'conciseness', 'executive', 'clarity', 'signal'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Лаконичность и Высокая Плотность Текста',
        'Executive Brevity & Signal Density Protocol',
        [
          '- **Удаление словесного мусора**: Безжалостно вырезать слова-паразиты, вводные конструкции («следует отметить, что») и слабые наречия.',
          '- **Активный залог**: Использовать только прямой активный залог (Субъект -> Глагол -> Объект).',
          '- **Ограничение длины предложений**: Держать длину предложений в пределах 15–20 слов для мгновенного восприятия.',
        ],
        [
          '- **Zero Verbosity Bleed**: Strip filler phrases ("it is important to note that", "needless to say") and weak qualifying adverbs.',
          '- **Active Voice Dominance**: Enforce strong active voice (Subject -> Transitive Verb -> Object).',
          '- **Sentence Length Discipline**: Constrain average sentence length to 15-20 words to ensure rapid cognitive ingestion.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'narrative-arc-storytelling': {
    id: 'narrative-arc-storytelling',
    name: 'NarrativeArcStorytellingSkill',
    displayName: 'Persuasive Narrative Arc & Storytelling',
    categoryId: 'writing',
    description: 'Constructs compelling narrative arcs (Hook -> Conflict -> Climax -> Resolution) for product launches and pitches.',
    tags: ['writing', 'storytelling', 'narrative', 'pitch', 'persuasion'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Драматургическая Структура и Сторителлинг',
        'Persuasive Narrative Arc Architecture',
        [
          '- **Захватывающий крючок (Hook)**: Начать с интригующего парадокса или острой боли клиента, приковывающей внимание.',
          '- **Эскалация конфликта**: Показать цену статус-кво и нарастающие трудности при отсутствии изменений.',
          '- **Кульминация и триумфальное разрешение**: Презентовать предлагаемое решение как логичный и неотвратимый путь к победе.',
        ],
        [
          '- **Compelling Narrative Hook**: Open with a sharp counter-intuitive paradox or acute customer pain point.',
          '- **Conflict Escalation**: Dramatize the compounding friction and existential costs of maintaining the status quo.',
          '- **Climax & Resolution**: Reveal the target solution as the elegant, inevitable path unlocking breakthrough transformation.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'tone-modulator-empathetic': {
    id: 'tone-modulator-empathetic',
    name: 'ToneModulatorEmpatheticSkill',
    displayName: 'Empathetic & De-Escalating Tone Modulation',
    categoryId: 'writing',
    description: 'Calibrates tone for de-escalation, conflict resolution, sensitive customer communications, and empathetic support.',
    tags: ['writing', 'tone', 'empathy', 'de-escalation', 'support', 'customer-success'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Эмпатичная и Деэскалирующая Тональность',
        'Empathetic & De-Escalating Tone Modulation',
        [
          '- **Признание эмоций и валидация**: Начать с искреннего признания сложности ситуации («Мы понимаем, насколько это критично для вашей работы»).',
          '- **Отсутствие оправданий**: Не перекладывать вину на третьи стороны; взять ответственность за решение проблемы.',
          '- **Четкий план помощи**: Сформулировать конкретные шаги, которые предпринимаются прямо сейчас для устранения неудобств.',
        ],
        [
          '- **Emotional Validation**: Open with sincere validation of customer impact ("We recognize the operational friction this caused").',
          '- **Zero Defensive Posturing**: Eliminate defensive excuses; take unambiguous ownership of resolving the blocker.',
          '- **Transparent Action Plan**: Provide concrete, time-stamped remediation steps currently being executed.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'technical-copywriting-clarity': {
    id: 'technical-copywriting-clarity',
    name: 'TechnicalCopywritingClaritySkill',
    displayName: 'Google Dev Style Technical Documentation',
    categoryId: 'writing',
    description: 'Applies rigorous developer documentation standards: clear imperative verbs, unambiguous terminology, and code samples.',
    tags: ['writing', 'technical-writing', 'docs', 'google-style', 'developer-experience'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Стандарты Технической Документации (Google Dev Style)',
        'Technical Documentation Standards (Google Dev Style Guide)',
        [
          '- **Повелительное наклонение в инструкциях**: Начинать шаги руководств с глаголов действия («Установите пакет», «Сконфигурируйте порт»).',
          '- **Единообразие терминов**: Использовать одни и те же технические термины без синонимической путаницы.',
          '- **Ожидаемый результат после каждого шага**: После команды показывать, какой вывод в терминале должен увидеть разработчик.',
        ],
        [
          '- **Imperative Procedural Steps**: Begin tutorial steps with clear action verbs ("Install the CLI", "Configure port 8080").',
          '- **Consistent Nomenclature**: Maintain uniform terminology throughout; avoid arbitrary synonymous variations.',
          '- **Expected Output Verification**: Accompany CLI commands with expected terminal outputs for instant developer validation.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'persuasive-rhetoric-ethos-pathos-logos': {
    id: 'persuasive-rhetoric-ethos-pathos-logos',
    name: 'PersuasiveRhetoricEthosPathosLogosSkill',
    displayName: 'Classical Rhetoric Triad (Ethos-Pathos-Logos)',
    categoryId: 'writing',
    description: 'Balances Aristotelian persuasion triad: Ethos (authority/credentials), Logos (data/logic), and Pathos (human resonance).',
    tags: ['writing', 'rhetoric', 'persuasion', 'ethos', 'logos', 'pathos', 'influence'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Классическая Риторическая Триада (Ethos, Pathos, Logos)',
        'Classical Rhetorical Triad (Ethos — Pathos — Logos)',
        [
          '- **[Ethos] Авторитет и доверие**: Подтвердить экспертную компетенцию реальными кейсами, стандартами и опытом команды.',
          '- **[Logos] Железная логика и данные**: Привести неоспоримые цифры, бенчмарки, ROI и математические доказательства.',
          '- **[Pathos] Эмоциональный отклик**: Затронуть реальные переживания, амбиции и ценности аудитории.',
        ],
        [
          '- **[Ethos] Trust & Credibility**: Establish authoritative domain credentials, production track record, and compliance standards.',
          '- **[Logos] Empirical Rigor**: Anchor arguments in quantitative metrics, benchmark data, and formal deductive proofs.',
          '- **[Pathos] Value Resonance**: Connect solutions directly to core human motivations, team morale, and organizational ambition.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'in-house-style-guide-enforcer': {
    id: 'in-house-style-guide-enforcer',
    name: 'InHouseStyleGuideEnforcerSkill',
    displayName: 'Brand Voice & Corporate Style Guide Enforcer',
    categoryId: 'writing',
    description: 'Enforces strict corporate brand voice guidelines, product capitalization, trademark rules, and approved terminology.',
    tags: ['writing', 'brand-voice', 'style-guide', 'glossary', 'corporate', 'consistency'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'constraints',
        'Соблюдение Корпоративного Brand Voice и Глоссария',
        'Brand Voice & Style Guide Compliance Guardrail',
        [
          '- **Точность брендинга**: Строго соблюдать написание имен продуктов и сервисов (правильный регистр букв, дефисы, товарные знаки).',
          '- **Запрет запрещенных синонимов**: Использовать только утвержденные термины из корпоративного глоссария.',
          '- **Единый голос бренда**: Выдерживать тональность: уверенный, инновационный, клиентоориентированный и строгий.',
        ],
        [
          '- **Brand Asset Accuracy**: Maintain pristine casing and nomenclature for all proprietary product trademarks.',
          '- **Approved Glossary Adherence**: Prohibit non-canonical internal jargon; enforce standard enterprise terminology.',
          '- **Unified Brand Stance**: Sustain a consistent voice: confident, technically precise, and customer-first.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'analogy-metaphor-craft': {
    id: 'analogy-metaphor-craft',
    name: 'AnalogyMetaphorCraftSkill',
    displayName: 'Intuitive Analogy & Metaphor Craft',
    categoryId: 'writing',
    description: 'Crafts vivid, illuminating metaphors to explain complex technical concepts to non-technical stakeholders.',
    tags: ['writing', 'metaphor', 'analogy', 'explanation', 'storytelling', 'clarity'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Создание Наглядных Аналогий и Метафор',
        'Intuitive Metaphor & Analogy Craft Protocol',
        [
          '- **Интуитивная модель**: Подобрать яркую бытовую или физическую аналогию (например, работа кэша как стол повара, а БД как склад).',
          '- **Пошаговое сопоставление**: Провести параллели между каждым элементом технической системы и элементами метафоры.',
          '- **Предотвращение искажений**: Кратко указать, в чем метафора упрощает реальность, чтобы не вводить в заблуждение.',
        ],
        [
          '- **Intuitive Mental Model**: Craft a tangible physical analogy demystifying abstract distributed computing concepts.',
          '- **Isomorphic Mapping**: Systematically map real-world components to system entities (e.g. Cache as countertop, DB as deep warehouse).',
          '- **Metaphor Boundary Disclosure**: Note where the analogy simplifies mechanics to prevent flawed mechanical inferences.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'microcopy-ux-writing': {
    id: 'microcopy-ux-writing',
    name: 'MicrocopyUxWritingSkill',
    displayName: 'Actionable UI Microcopy & UX Writing',
    categoryId: 'writing',
    description: 'Engineers high-converting, crystal-clear UI microcopy for CTAs, modal confirmations, error states, and tooltips.',
    tags: ['writing', 'microcopy', 'ux-writing', 'cta', 'buttons', 'product-copy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Спецификация UI-Микрокопи и UX-Текстов',
        'UI Microcopy & UX Writing Specification',
        [
          '- **Кнопки действий (CTA)**: Формулировать текст кнопок по формуле `[Глагол] + [Объект]` («Создать проект», «Оплатить заказ»).',
          '- **Понятные сообщения об ошибках**: Сообщение об ошибке должно объяснять: 1) Что произошло, 2) Почему, 3) Как это исправить за 1 клик.',
          '- **Подсказки и плейсхолдеры**: Делать текст плейсхолдеров примером валидного ввода (`например, name@company.com`).',
        ],
        [
          '- **Action-Oriented CTAs**: Format button text strictly as `[Action Verb] + [Target Entity]` ("Deploy Cluster", "Generate Key").',
          '- **Empathetic Error Messages**: Structure error toasts with 3 parts: 1) What happened, 2) Root cause, 3) 1-click recovery action.',
          '- **Exemplar Input Placeholders**: Provide realistic valid syntax in placeholders (e.g. `e.g. staging-db-01.internal`).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'flesch-kincaid-readability-tuner': {
    id: 'flesch-kincaid-readability-tuner',
    name: 'FleschKincaidReadabilityTunerSkill',
    displayName: 'Flesch-Kincaid Readability Calibrator',
    categoryId: 'writing',
    description: 'Tunes syntactic complexity and syllable count to target exact reading grade levels (Grade 7-9 for general, 13+ for academic).',
    tags: ['writing', 'readability', 'flesch-kincaid', 'grade-level', 'accessibility'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Калибровка Индекса Удобочитаемости (Readability Level)',
        'Flesch-Kincaid Readability & Complexity Calibration',
        [
          '- **Целевой уровень сложности**: Адаптировать длину слов и структуру предложений под заданный уровень (например, 8 класс школы для широкой публики).',
          '- **Упрощение синтаксиса**: Разбивать сложные придаточные предложения с множественными запятыми на 2–3 простых.',
          '- **Тест на плавность чтения**: Текст должен легко читаться вслух на одном дыхании без запинок.',
        ],
        [
          '- **Target Reading Grade Level**: Calibrate syllable count and clause density for target grade level (Grade 8 for general public, 14+ for specialized peers).',
          '- **Syntactic Simplification**: Decompose convoluted nested clauses into punchy, independent grammatical units.',
          '- **Vocal Rhythm Audit**: Ensure text flows smoothly with natural prosody when read aloud.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'headline-hook-craft': {
    id: 'headline-hook-craft',
    name: 'HeadlineHookCraftSkill',
    displayName: 'High-Impact Headline & Hook Generator',
    categoryId: 'writing',
    description: 'Generates irresistible, high-CTR headlines and social hooks leveraging curiosity gaps and quantified value.',
    tags: ['writing', 'headlines', 'hooks', 'copywriting', 'ctr', 'marketing'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Генерация Сильных Заголовков и Хуков (Headline Matrix)',
        'High-Impact Headline & Hook Generation Matrix',
        [
          '- **5 Вариантов заголовков**: Предложить 5 разных формул: 1) Как сделать [Желаемое] без [Боли], 2) Числовая выгода, 3) Провокационный вопрос, 4) Кейс-история, 5) Ультимативное руководство.',
          '- **Оценка виральности**: Указать прогнозируемый CTR и эмоциональный триггер для каждого варианта.',
          '- **Запрет дешевого кликбейта**: Заголовок должен на 100% соответствовать содержанию статьи без обмана ожиданий.',
        ],
        [
          '- **5 Headline Archetypes**: Deliver 5 distinct formulas: 1) How-To without Pain, 2) Quantified Metric Lift, 3) Contrarian Question, 4) Real-World Case, 5) Definitive Architecture Guide.',
          '- **Engagement Diagnostics**: Tag each variant with estimated engagement driver and cognitive hook mechanism.',
          '- **Zero Clickbait Bait-and-Switch**: Ensure content delivers 100% on the headline promise without misleading exaggeration.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'active-voice-densifier': {
    id: 'active-voice-densifier',
    name: 'ActiveVoiceDensifierSkill',
    displayName: 'Active Voice & Strong Verb Densifier',
    categoryId: 'writing',
    description: 'Replaces passive constructions ("was implemented by") with strong, authoritative, kinetic verbs ("architected", "optimized").',
    tags: ['writing', 'active-voice', 'verbs', 'kinetic', 'prose', 'impact'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Усиление Глаголов и Перевод в Активный Залог',
        'Active Voice & Kinetic Verb Densification',
        [
          '- **Полный перевод в активный залог**: Заменить все пассивные конструкции («система была настроена») на активные («инженеры сконфигурировали систему»).',
          '- **Сильные кинетические глаголы**: Использовать точные профессиональные глаголы: `спроектировал`, `изолировал`, `профилировал`, `митигировал` вместо размытых «сделал».',
          '- **Энергия текста**: Сделать каждое предложение динамичным и передающим импульс действия.',
        ],
        [
          '- **100% Active Voice Conversion**: Eliminate passive constructs ("was deployed by the team") in favor of direct active syntax ("engineers deployed the cluster").',
          '- **Kinetic High-Impact Verbs**: Deploy precise technical verbs (`orchestrated`, `benchmarked`, `isolated`, `mitigated`) over weak generic verbs (`did`, `handled`).',
          '- **Propulsive Prose Energy**: Inject momentum and authority into every declarative sentence.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'jargon-de-obfuscator': {
    id: 'jargon-de-obfuscator',
    name: 'JargonDeObfuscatorSkill',
    displayName: 'Jargon De-Obfuscator & Plain English',
    categoryId: 'writing',
    description: 'Translates hollow corporate buzzwords ("synergize", "paradigm shift", "leverage") into clear, honest, grounded language.',
    tags: ['writing', 'plain-english', 'de-obfuscation', 'clarity', 'honesty', 'anti-buzzword'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Устранение Корпоративного Жаргона и Прямой Язык',
        'Plain English & Anti-Buzzword De-Obfuscation',
        [
          '- **Замена пустых баззвордов**: Заменить слова «синергия», «дизруптивный», «парадигма» на простые и честные формулировки («совместная работа», «быстрее на 30%»).',
          '- **Прямота и честность**: Называть проблемы своими именами без эвфемизмов («падение сервера», а не «временная аномалия доступности»).',
          '- **Понятность с первого прочтения**: Текст должен быть кристально ясен человеку без профильного корпоративного словаря.',
        ],
        [
          '- **Buzzword Elimination**: Replace hollow corporate jargon ("synergy", "paradigm shift", "leverage") with concrete operational language ("cost reduction", "joint API").',
          '- **Radical Honesty**: Discard euphemisms; address architectural failures directly ("cluster outage" over "intermittent connectivity event").',
          '- **Instant Comprehension**: Ensure language is immediately transparent to cross-functional stakeholders.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'crisis-communications-protocol': {
    id: 'crisis-communications-protocol',
    name: 'CrisisCommunicationsProtocolSkill',
    displayName: 'Crisis Communications & Incident Disclosure',
    categoryId: 'writing',
    description: 'Drafts transparent, reassuring, legally sound crisis disclosures for customer status pages and press releases.',
    tags: ['writing', 'crisis', 'communications', 'statuspage', 'pr', 'disclosure'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Коммуникация в Условиях Кризиса (Status Page & PR)',
        'Crisis Communications & Incident Disclosure Protocol',
        [
          '- **1. Фиксация фактов**: Что произошло, масштаб влияния и текущий статус расследования.',
          '- **2. Предпринятые действия**: Какие меры защиты уже развернуты для локализации сбоя.',
          '- **3. Рекомендации клиентам**: Что пользователям необходимо предпринять прямо сейчас (смена паролей, проверка баланса).',
          '- **4. Следующее обновление**: Точное время следующего публичного апдейта (например: «Следующее обновление в 14:00 UTC»).',
        ],
        [
          '- **1. Transparent Fact Ledger**: Blast radius, affected capabilities, and real-time investigation status.',
          '- **2. Active Containment Measures**: Explicit defensive interlocks currently deployed to isolate the incident.',
          '- **3. Actionable Customer Guidance**: Concrete steps required from end users (e.g. token rotation, backup verification).',
          '- **4. Next Update Commitment**: Explicit scheduled timestamp for the subsequent status disclosure (e.g. "Next update at 14:00 UTC").',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
