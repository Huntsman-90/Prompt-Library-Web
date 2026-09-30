import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
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

  'bluf-military-clarity': {
    id: 'bluf-military-clarity',
    name: 'BlufMilitaryClaritySkill',
    displayName: 'BLUF (Bottom Line Up Front) Military Briefing',
    categoryId: 'writing',
    description: 'Enforces military-grade briefing doctrine: immediate bottom-line verdict in sentence one, followed by operational rationale.',
    tags: ['writing', 'bluf', 'military', 'briefing', 'conciseness', 'executive'],
    transform: createStandardSkillTransform(
      'protocol',
      'Протокол BLUF (Bottom Line Up Front Directive)',
      'BLUF (Bottom Line Up Front) Military Briefing Protocol',
      [
        '- **Главный вердикт в первой строке**: Первое предложение текста содержит законченное решение, статус или рекомендацию.',
        '- **Операционная сводка (2-3 буллета)**: Ключевые аргументы, подтверждающие вердикт, с конкретными цифрами и датами.',
        '- **Необходимое действие**: Кто, что и к какому сроку должен предпринять.',
      ],
      [
        '- **Sentence-One BLUF Invariant**: Lead unconditionally with the terminal decision, operational status, or strategic recommendation.',
        '- **Executive Fact Ledger**: Back the BLUF with 2-3 dense supporting bullets containing verifiable telemetry and metrics.',
        '- **Explicit Action Vector**: Designate exact operational owner, deliverable, and hard deadline.',
      ]
    ),
  },

  'smart-brevity-axios': {
    id: 'smart-brevity-axios',
    name: 'SmartBrevityAxiosSkill',
    displayName: 'Axios Smart Brevity Punchy Formatting',
    categoryId: 'writing',
    description: 'Structures memos using Axios Smart Brevity conventions: One-line takeaway, "Why it matters", "Go deeper", and bulleted punchlines.',
    tags: ['writing', 'smart-brevity', 'axios', 'journalism', 'newsletters', 'executive'],
    transform: createStandardSkillTransform(
      'protocol',
      'Формат Smart Brevity (Axios Style)',
      'Axios Smart Brevity Narrative Architecture',
      [
        '- **Ударный заголовок и главный факт**: Первые 20 слов объясняют суть новости или решения.',
        '- **Рубрика «Почему это важно» (Why it matters)**: Один абзац о стратегических последствиях для бизнеса.',
        '- **Рубрика «По цифрам» (By the numbers)**: Короткий маркированный список ключевых метрик.',
        '- **Рубрика «Погрузиться глубже» (Go deeper)**: Детали и контекст для тех, кому нужны подробности.',
      ],
      [
        '- **Punchy Lede**: Hook the reader within 20 words delivering the core development.',
        '- **"Why it matters" Block**: Single crisp paragraph contextualizing systemic ripple effects.',
        '- **"By the numbers" Ledger**: High-density bulleted list highlighting numeric metrics.',
        '- **"Go deeper" Deep Dive**: Supplementary technical mechanics reserved for specialized operators.',
      ]
    ),
  },

  'amazon-six-page-narrative': {
    id: 'amazon-six-page-narrative',
    name: 'AmazonSixPageNarrativeSkill',
    displayName: 'Amazon 6-Pager Silent Read Narrative Memo',
    categoryId: 'writing',
    description: 'Formats high-stakes business proposals into Amazon silent-read narrative memos with Tenets, Strategic Priorities, and FAQs.',
    tags: ['writing', 'amazon', '6-pager', 'memo', 'narrative', 'strategy'],
    transform: createStandardSkillTransform(
      'protocol',
      'Формат Нарративного Мемо (Amazon 6-Pager Style)',
      'Amazon 6-Page Narrative Memo Protocol',
      [
        '- **Связное повествование вместо слайдов**: Полные развернутые предложения, объединенные в логичный нарратив без пустых буллетов.',
        '- **Принципы принятия решений (Tenets)**: Список незыблемых ориентиров, которыми руководствовалась команда при выборе пути.',
        '- **Детальный разбор альтернатив**: Почему другие варианты были отклонены.',
        '- **Приложение FAQ**: Ответы на 5 самых острых и скептических вопросов топ-менеджмента.',
      ],
      [
        '- **Full-Sentence Narrative**: Replace bulleted slides with cohesive, flowing prose argument.',
        '- **Operational Tenets**: State 3-5 core principles governing trade-off decisions.',
        '- **Exhaustive Alternatives Analysis**: Concrete rationale detailing why alternative approaches were rejected.',
        '- **Anticipated FAQ Appendix**: Rigorous answers addressing the 5 sharpest executive objections.',
      ]
    ),
  },

  'crisis-pr-spokesperson-tone': {
    id: 'crisis-pr-spokesperson-tone',
    name: 'CrisisPrSpokespersonToneSkill',
    displayName: 'Crisis PR & Executive Spokesperson Demeanor',
    categoryId: 'writing',
    description: 'Calibrates a calm, authoritative, legally prudent spokesperson tone balancing empathy with factual accountability.',
    tags: ['writing', 'crisis-pr', 'spokesperson', 'pr', 'media', 'reputation'],
    transform: createStandardSkillTransform(
      'role',
      'Тональность Официального Представителя (Crisis PR)',
      'Crisis PR Executive Spokesperson Voice & Demeanor',
      [
        '- **Спокойствие и прозрачность**: Никаких оправданий, паники или попыток скрыть масштаб проблемы.',
        '- **Эмпатия к пострадавшим**: Искреннее признание ущерба и неудобств клиентов на первом месте.',
        '- **Юридическая выверенность**: Не признавать гипотетическую вину до окончания расследования, оперировать только доказанными фактами.',
      ],
      [
        '- **Authoritative Composure**: Neutral, composed, transparent tone eliminating defensiveness or corporate evasion.',
        '- **Grounded Empathy**: Direct acknowledgment of customer disruption positioned prominently.',
        '- **Legal Prudence**: Confine statements strictly to verified forensic findings without premature speculative admissions.',
      ]
    ),
  },

  'feynman-plain-language-converter': {
    id: 'feynman-plain-language-converter',
    name: 'FeynmanPlainLanguageConverterSkill',
    displayName: 'Feynman Technique Plain-Language Translator',
    categoryId: 'writing',
    description: 'Demystifies complex technical concepts into intuitive, jargon-free explanations using vivid physical analogies.',
    tags: ['writing', 'feynman', 'simplicity', 'analogies', 'education', 'clarity'],
    transform: createStandardSkillTransform(
      'protocol',
      'Метод Фейнмана: Перевод на Простой Человеческий Язык',
      'Feynman Technique Plain-Language Translation Protocol',
      [
        '- **Запрет профессионального жаргона**: Заменить термины на простые житейские аналогии из реального физического мира.',
        '- **Проверка на первокласснике**: Объяснить сложную механику так, чтобы её понял 12-летний подросток.',
        '- **Интуитивное понимание сути**: Сфокусироваться на том, ЗАЧЕМ это нужно и КАК это работает на базовом уровне.',
      ],
      [
        '- **Jargon Decontamination**: Replace dense domain jargon with tangible real-world physical metaphors.',
        '- **First-Principles Intuition**: Structure explanations so an intelligent 12-year-old grasps the fundamental mechanism instantly.',
        '- **The "Why" and "How"**: Prioritize intuitive functional insight over pedantic scholastic taxonomy.',
      ]
    ),
  },

  'technical-whitepaper-rhetoric': {
    id: 'technical-whitepaper-rhetoric',
    name: 'TechnicalWhitepaperRhetoricSkill',
    displayName: 'Formal Technical Whitepaper Rhetoric',
    categoryId: 'writing',
    description: 'Employs formal academic/industrial whitepaper prose featuring precise citations, mathematical rigor, and objective voice.',
    tags: ['writing', 'whitepaper', 'academic', 'research', 'formal', 'rhetoric'],
    transform: createStandardSkillTransform(
      'writing_style',
      'Академический Стиль Технического Whitepaper',
      'Formal Technical Whitepaper Rhetoric & Rigor',
      [
        '- **Научная строгость**: Использовать канонические термины, пассивный и безличный научный стиль («исследование показало», «система реализует»).',
        '- **Ссылки и контекст**: Сопровождать утверждения ссылками на стандарты RFC, научные статьи и бенчмарки.',
        '- **Объективность оценок**: Ограничения предлагаемого метода разбирать столь же глубоко, как и его преимущества.',
      ],
      [
        '- **Scholarly Rigor**: Employ canonical nomenclature, third-person objective discourse, and empirical assertions.',
        '- **Citations & Grounding**: Anchor findings in RFC standards, peer-reviewed literature, and reproducible benchmarks.',
        '- **Balanced Limitations**: Detail architectural limitations and edge vulnerabilities with identical depth as performance breakthroughs.',
      ]
    ),
  },

  'cold-outreach-hook-craft': {
    id: 'cold-outreach-hook-craft',
    name: 'ColdOutreachHookCraftSkill',
    displayName: 'B2B Cold Outreach & Hyper-Personalized Hooks',
    categoryId: 'writing',
    description: 'Crafts high-converting B2B cold emails with tailored observational hooks, acute problem framing, and friction-free CTAs.',
    tags: ['writing', 'sales', 'cold-email', 'outreach', 'copywriting', 'conversion'],
    transform: createStandardSkillTransform(
      'protocol',
      'Протокол B2B Холодных Писем (Hook, Value, Low-Friction CTA)',
      'B2B Cold Outreach & Frictionless Conversion Protocol',
      [
        '- **Персонализированный хук (первые 2 строки)**: Наблюдение за конкретной деятельностью компании адресата (вакансии, стек, релиз).',
        '- **Острая боль без продажи в лоб**: Показать знание специфической проблемы их индустрии.',
        '- **CTA с нулевым сопротивлением**: Задавать вопрос с низким порогом входа (напр. «Стоит прислать 2-минутное видео?» вместо «Давайте созвонимся на час»).',
      ],
      [
        '- **Hyper-Specific Observational Hook**: Open with verified context about the prospect\'s recent hire, product release, or infrastructure footprint.',
        '- **Acute Friction Mapping**: Articulate their exact operational bottleneck without aggressive sales hyperbole.',
        '- **Zero-Friction CTA**: Ask an interest-based binary permission question rather than demanding a 30-minute calendar lock.',
      ]
    ),
  },

  'internal-all-hands-speech': {
    id: 'internal-all-hands-speech',
    name: 'InternalAllHandsSpeechSkill',
    displayName: 'Executive All-Hands Address & Rallying Vision',
    categoryId: 'writing',
    description: 'Composes inspiring executive all-hands speeches that rally teams around strategic pivots while honestly acknowledging hurdles.',
    tags: ['writing', 'speech', 'all-hands', 'leadership', 'executive', 'motivation'],
    transform: createStandardSkillTransform(
      'writing_style',
      'Речь Лидера на Общекорпоративном All-Hands',
      'Executive All-Hands Leadership Address & Vision',
      [
        '- **Признание труда команды**: Отметить конкретные достижения и самоотдачу людей в первых же абзацах.',
        '- **Честный разговор о сложностях**: Не лакировать проблемы; прямо сказать о трудностях и почему нужен стратегический маневр.',
        '- **Вдохновляющая цель**: Нарисовать четкую картину победы и роль каждого отдела в достижении общего успеха.',
      ],
      [
        '- **Authentic Team Celebration**: Open by validating team resilience and celebrating specific operational wins.',
        '- **Transparent Reality Facing**: Speak with candor regarding market headwinds, missed milestones, and operational pivots.',
        '- **Rallying North Star**: Paint an inspiring, tangible vision of future victory defining clear ownership across engineering and product.',
      ]
    ),
  },

  'ap-style-journalistic-lede': {
    id: 'ap-style-journalistic-lede',
    name: 'ApStyleJournalisticLedeSkill',
    displayName: 'AP Style Journalistic Inverted Pyramid',
    categoryId: 'writing',
    description: 'Writes news stories adhering to Associated Press standards with 5W1H ledes and strictly decreasing order of importance.',
    tags: ['writing', 'journalism', 'ap-style', 'news', 'inverted-pyramid', 'press'],
    transform: createStandardSkillTransform(
      'protocol',
      'Журналистский Стандарт AP (Перевернутая Пирамида)',
      'Associated Press (AP) Inverted Pyramid News Protocol',
      [
        '- **Лид 5W1H в первом предложении**: Кто, что, где, когда, почему и как произошло — емко уложить в 25–30 слов.',
        '- **Иерархия убывания важности**: Располагать факты строго от самых критичных к фоновым подробностям.',
        '- **Беспристрастный тон**: Нулевая оценка от автора; только факты, цитаты и цифры с указанием источника.',
      ],
      [
        '- **5W1H Lead Sentence**: Pack Who, What, Where, When, Why, and How into a razor-sharp 25-30 word opening sentence.',
        '- **Inverted Pyramid Hierarchy**: Arrange subsequent paragraphs in strictly decreasing order of reader importance.',
        '- **Strict Neutrality**: Zero editorializing or adjectival color; strictly verifiable quotes, attribution, and empirical figures.',
      ]
    ),
  },

  'investor-update-monthly-letter': {
    id: 'investor-update-monthly-letter',
    name: 'InvestorUpdateMonthlyLetterSkill',
    displayName: 'Monthly Founder Investor Update Letter',
    categoryId: 'writing',
    description: 'Formats concise founder updates for angel and venture investors with Highlights, Lowlights, Runway, and Asks.',
    tags: ['writing', 'investors', 'founders', 'fundraising', 'venture', 'updates'],
    transform: createStandardSkillTransform(
      'output_format',
      'Формат Ежемесячного Отчета Инвесторам (Founder Letter)',
      'Monthly Founder Investor Update Architecture',
      [
        '- **Метрики здоровья**: ARR / MRR, темп роста MoM, чистый Burn Rate и остаток Runway в месяцах в самом начале.',
        '- **Highlights (Успехи)**: 3 главных прорыва месяца (закрытые сделки, ключевой найм, запуск фичи).',
        '- **Lowlights (Проблемы)**: Честный рассказ о сорванных сделках, багах или задержках.',
        '- **The Ask (Просьба к инвесторам)**: 2–3 конкретных интро к клиентам, помощь с поиском кандидатов или вендоров.',
      ],
      [
        '- **Vitals Dashboard**: Prepend ARR/MRR, MoM Growth, Net Burn, and Runway horizon (months of cash) in a compact scorecard.',
        '- **Highlights**: 3 most impactful systemic breakthroughs (tier-1 enterprise wins, key VP hires, release milestones).',
        '- **Lowlights**: Candid accounting of failed pilots, churn spikes, or engineering regressions.',
        '- **Targeted Asks**: 2-3 hyper-specific intros to named accounts, executive candidates, or vendor procurement teams.',
      ]
    ),
  },

  'technical-documentation-voice': {
    id: 'technical-documentation-voice',
    name: 'TechnicalDocumentationVoiceSkill',
    displayName: 'Diátaxis Technical Documentation Voice',
    categoryId: 'writing',
    description: 'Structures technical documentation across the four Diátaxis quadrants: Tutorials, How-To Guides, Reference, and Explanation.',
    tags: ['writing', 'docs', 'diataxis', 'technical-writing', 'developer-experience'],
    transform: createStandardSkillTransform(
      'writing_style',
      'Стиль Технической Документации (Diátaxis Framework)',
      'Diátaxis Technical Documentation Architecture',
      [
        '- **Разделение режимов**: Четко определить тип документа (Обучающий туториал, Практическое руководство, Справочник API или Концептуальное объяснение).',
        '- **Ориентация на действие**: Использовать повелительное наклонение («Вызовите метод», «Настройте конфиг») с ожидаемым выводом после каждого шага.',
        '- **Самодостаточность примеров**: Примеры кода должны быть полностью рабочими и скопируемыми.',
      ],
      [
        '- **Quadrant Discipline**: Select and strictly adhere to one Diátaxis mode (Tutorial, How-To Guide, Reference, or Explanation).',
        '- **Action-Oriented Imperatives**: Employ direct imperative commands ("Configure the endpoint", "Execute migration") pairing each with terminal output.',
        '- **Executable Code Blocks**: Ensure all code snippets are copy-paste runnable with standard imports and mocks.',
      ]
    ),
  },

  'empathetic-customer-support-voice': {
    id: 'empathetic-customer-support-voice',
    name: 'EmpatheticCustomerSupportVoiceSkill',
    displayName: 'De-escalation & Empathetic Support Voice',
    categoryId: 'writing',
    description: 'Calibrates high-EQ customer support communication that de-escalates anger, validates emotional frustration, and delivers fast remedies.',
    tags: ['writing', 'support', 'de-escalation', 'empathy', 'customer-service', 'cx'],
    transform: createStandardSkillTransform(
      'writing_style',
      'Тональность Эмпатичной Поддержки и Деэскалации (High-EQ Support)',
      'Empathetic Customer Support & Conflict De-escalation Voice',
      [
        '- **Принятие эмоций клиента**: В первой фразе признать неудобство и фрустрацию без шаблонных отписок («Я прекрасно понимаю, как это неприятно...»).',
        '- **Взятие ответственности**: Не перекладывать вину на пользователя или сторонних провайдеров.',
        '- **Пошаговое решение**: Дать четкий план устранения неполадки или компенсации прямо в ответе.',
      ],
      [
        '- **Authentic Emotional Validation**: Directly acknowledge customer friction with genuine warmth, eliminating robotic canned platitudes.',
        '- **Accountability Ownership**: Take systemic responsibility without shifting blame onto end users or downstream cloud outages.',
        '- **Actionable Path Forward**: Deliver step-by-step troubleshooting, timeline clarity, or automated refund remediation in turn one.',
      ]
    ),
  },

  'regulatory-filing-disclosure': {
    id: 'regulatory-filing-disclosure',
    name: 'RegulatoryFilingDisclosureSkill',
    displayName: 'SEC / Regulatory Compliance Disclosure Prose',
    categoryId: 'writing',
    description: 'Drafts legally defensive disclosure prose conforming to SEC guidelines with forward-looking statement safe harbors and risk factors.',
    tags: ['writing', 'legal', 'compliance', 'sec', 'disclosure', 'regulatory'],
    transform: createStandardSkillTransform(
      'writing_style',
      'Юридически Выверенный Стиль Раскрытия Информации (SEC Compliance)',
      'Regulatory Filing & Safe Harbor Disclosure Protocol',
      [
        '- **Оговорка о прогнозных заявлениях (Safe Harbor)**: Явно маркировать планы и прогнозы как Forward-Looking Statements с перечислением факторов риска.',
        '- **Точность юридических формулировок**: Использовать выверенную терминологию («включая, но не ограничиваясь», «в разумно возможной степени»).',
        '- **Отсутствие гарантий**: Исключить категоричные обещания прибыли или стопроцентной надежности.',
      ],
      [
        '- **Safe Harbor Cautionary Language**: Qualify strategic roadmaps and forecasts with rigorous Forward-Looking Statement disclaimers.',
        '- **Statutory Precision**: Leverage battle-tested legal syntax ("material adverse effect", "including without limitation", "reasonably practicable").',
        '- **Zero Warranties**: Forbid speculative or absolute guarantees regarding performance, financial returns, or zero-vulnerability security.',
      ]
    ),
  },

  'thought-leadership-counterintuitive-hook': {
    id: 'thought-leadership-counterintuitive-hook',
    name: 'ThoughtLeadershipCounterintuitiveHookSkill',
    displayName: 'Counterintuitive Thought Leadership Essay',
    categoryId: 'writing',
    description: 'Structures provocative engineering & tech leadership essays challenging industry orthodoxy with empirical evidence.',
    tags: ['writing', 'thought-leadership', 'essay', 'linkedin', 'substack', 'opinions'],
    transform: createStandardSkillTransform(
      'writing_style',
      'Стиль Экспертного Эссе с Контринтуитивным Тезисом',
      'Counterintuitive Engineering Thought Leadership Architecture',
      [
        '- **Провокационный контринтуитивный тезис**: Оспорить общепринятое заблуждение индустрии в первом абзаце.',
        '- **Фактологические доказательства**: Привести данные бенчмарков, реальный кейс из продакшена или архитектурный контрпример.',
        '- **Практический синтез**: Сформулировать новую парадигму, которая дает командам конкурентное преимущество.',
      ],
      [
        '- **Contrarian Hook**: Challenge conventional industry dogma directly in the opening paragraph with an unconventional premise.',
        '- **Empirical Proof Engine**: Ground counterintuitive claims in hard production telemetry, failure case studies, or economic models.',
        '- **Synthesized Paradigm Shift**: Close with actionable principles allowing engineering leaders to exploit the contrarian insight.',
      ]
    ),
  },

  'rfc-persuasive-advocacy': {
    id: 'rfc-persuasive-advocacy',
    name: 'RfcPersuasiveAdvocacySkill',
    displayName: 'Persuasive Architectural Advocacy & Debate',
    categoryId: 'writing',
    description: 'Frames engineering proposals to win executive consensus by balancing architectural elegance with CFO-level business ROI.',
    tags: ['writing', 'persuasion', 'advocacy', 'consensus', 'executive-buyin', 'roi'],
    transform: createStandardSkillTransform(
      'writing_style',
      'Убеждающая Риторика Инженерного Предложения (Executive Buy-In)',
      'Persuasive Architectural Advocacy & Executive Buy-In Voice',
      [
        '- **Связка архитектуры с деньгами**: Показать, как технический рефакторинг снижает затраты на облако или предотвращает отток клиентов.',
        '- **Предвосхищение возражений**: Разобрать ключевые опасения скептиков (время на миграцию, риск багов) до того, как они их озвучат.',
        '- **Конструктивный консенсус**: Предложить низкорисковый пилотный этап для проверки гипотезы.',
      ],
      [
        '- **Architecture-to-EBITDA Alignment**: Quantify how proposed technical refactoring directly reduces cloud opex or accelerates release velocity.',
        '- **Preemptive Skeptic Neutralization**: Disarm executive objections (migration risk, downtime windows) before they are voiced.',
        '- **De-risked Pilot Staging**: Propose a low-friction proof-of-concept milestone minimizing business exposure.',
      ]
    ),
  },

  'micropen-ux-content-guide': {
    id: 'micropen-ux-content-guide',
    name: 'MicropenUxContentGuideSkill',
    displayName: 'UX Microcopy & Interface Content System',
    categoryId: 'writing',
    description: 'Formats high-clarity interface microcopy for buttons, error states, tooltips, empty states, and onboarding dialogs.',
    tags: ['writing', 'microcopy', 'ux-writing', 'ui', 'labels', 'tooltips', 'errors'],
    transform: createStandardSkillTransform(
      'output_format',
      'Спецификация UX-Микрокопирайтинга (Interface Microcopy)',
      'UX Microcopy & Interface Content Architecture',
      [
        '- **Кнопки действий (CTA)**: Формат `Глагол + Существительное` («Создать проект», «Экспортировать CSV») без размытого «ОК» или «Далее».',
        '- **Тексты ошибок (Error States)**: Что пошло не так + почему + понятное действие для исправления.',
        '- **Пустые экраны (Empty States)**: Дружелюбное объяснение ценности раздела + кнопка первого шага.',
        '- **Подсказки (Tooltips)**: Не более 12 слов, объясняющих не очевидную пользу, а не повторяющих заголовок кнопки.',
      ],
      [
        '- **Action Button CTAs**: Enforce `[Verb] + [Noun]` pattern (e.g. "Generate API Key", "Export CSV") avoiding generic "OK" or "Submit".',
        '- **Helpful Error Dialogues**: What occurred + Why it happened + Actionable one-click recovery remedy.',
        '- **Empty State Scaffolding**: Benefit-driven explanation of the vacant view accompanied by primary action trigger.',
        '- **Contextual Tooltips**: Maximum 12 words clarifying non-obvious utility rather than tautologically repeating the control name.',
      ]
    ),
  },
};

