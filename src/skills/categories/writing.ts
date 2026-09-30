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
  "hemingway-sparse-prose-editor": {
    id: "hemingway-sparse-prose-editor",
    name: "HemingwaySparseProseEditorSkill",
    displayName: "Hemingway Sparse & Vigorous Prose Style",
    categoryId: "writing",
    description: "Edits text down to muscular, declarative prose: short sentences, active verbs, zero extraneous adverbs, and direct emotional cadence.",
    tags: ["writing","hemingway","conciseness","active-voice","editing"],
    transform: createStandardSkillTransform({
      sectionName: "Hemingway Sparse Prose Protocol",
      ruSectionName: "Протокол лаконичной и выразительной прозы Хемингуэя (Hemingway Style)",
      instructions: [
        "Write in short, powerful declarative sentences with crisp cadence and natural rhythm.",
        "Eliminate 100% of non-essential adverbs (e.g. \"very\", \"extremely\", \"basically\", \"actually\").",
        "Replace passive voice constructions with vibrant, visceral Anglo-Saxon active verbs.",
        "Trust the reader: convey immense emotional weight and technical substance through plain understatement."
],
      ruInstructions: [
        "Пишите короткими, емкими повествовательными предложениями с четким естественным ритмом.",
        "Удаляйте все лишние наречия и слова-паразиты (\"очень\", \"фактически\", \"буквально\", \"чрезвычайно\").",
        "Заменяйте пассивные обороты активными, выразительными глаголами прямого действия.",
        "Доверяйте читателю: передавайте глубину мысли через точные факты без пафоса и лишних украшательств."
],
      semanticType: "process_directive",
      tags: ["writing","hemingway","conciseness","active-voice","editing"],
    }),
  },

  "orwell-six-rules-clarity": {
    id: "orwell-six-rules-clarity",
    name: "OrwellSixRulesClaritySkill",
    displayName: "George Orwell Six Rules of Literary & Essay Clarity",
    categoryId: "writing",
    description: "Enforces George Orwell classic rules: never use a metaphor you are used to seeing in print, never use a long word where a short one will do, cut words ruthlessly.",
    tags: ["writing","orwell","clarity","rules-of-writing","essays"],
    transform: createStandardSkillTransform({
      sectionName: "George Orwell Rules of Clarity Protocol",
      ruSectionName: "Шесть правил ясности текста Джорджа Оруэлла",
      instructions: [
        "Never use a metaphor, simile, or other figure of speech which you are used to seeing in print.",
        "Never use a long word where a short one will do.",
        "If it is possible to cut a word out, always cut it out.",
        "Never use the passive where you can use the active; never use a foreign phrase or jargon if an everyday English equivalent exists."
],
      ruInstructions: [
        "Никогда не используйте заезженные метафоры и штампы, которые вы привыкли встречать в печати.",
        "Никогда не используйте длинное слово там, где подойдет простое короткое.",
        "Если слово можно без потери смысла вычеркнуть — непременно вычеркивайте его.",
        "Никогда не используйте пассивный залог вместо активного и избегайте заумных терминов при наличии понятных аналогов."
],
      semanticType: "process_directive",
      tags: ["writing","orwell","clarity","rules-of-writing","essays"],
    }),
  },

  "show-dont-tell-narrative-visuality": {
    id: "show-dont-tell-narrative-visuality",
    name: "ShowDontTellNarrativeVisualitySkill",
    displayName: "Show, Don't Tell Sensory & Behavioral Evocation",
    categoryId: "writing",
    description: "Transforms abstract claims (\"the team was stressed\", \"the system is fast\") into vivid sensory details, behavioral metrics, and concrete observations.",
    tags: ["writing","show-dont-tell","storytelling","vividness","copywriting"],
    transform: createStandardSkillTransform({
      sectionName: "Show, Don't Tell Evocation Protocol",
      ruSectionName: "Протокол визуализации и конкретики (Show, Don't Tell)",
      instructions: [
        "Replace abstract qualitative labels with concrete observable physical actions and quantified metrics.",
        "Instead of stating an emotion or condition, describe physical posture, sensory details, and tangible evidence.",
        "Demonstrate software performance through concrete timeline benchmarks rather than generic adjectives.",
        "Evoke vivid mental imagery in the reader mind instantly."
],
      ruInstructions: [
        "Заменяйте абстрактные оценочные суждения конкретными наблюдаемыми фактами и числовыми метриками.",
        "Вместо констатации состояния описывайте действия людей, физические детали и осязаемые свидетельства.",
        "Демонстрируйте скорость и надежность через точные замеры времени и сценарии вместо общих похвал.",
        "Создавайте у читателя яркую визуальную картину происходящего с первых строк."
],
      semanticType: "process_directive",
      tags: ["writing","show-dont-tell","storytelling","vividness","copywriting"],
    }),
  },

  "executive-one-pager-decision-memo": {
    id: "executive-one-pager-decision-memo",
    name: "ExecutiveOnePagerDecisionMemoSkill",
    displayName: "C-Suite 1-Page Investment & Strategy Decision Memo",
    categoryId: "writing",
    description: "Drafts high-stakes 1-page decision memos for executive committees: The Problem, The Proposed Investment, Expected ROI, Key Risks & Recommendation.",
    tags: ["writing","executive-memo","decision-making","c-suite","business-writing"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Decision Memo Protocol",
      ruSectionName: "Протокол одностраничного меморандума для руководства (Decision Memo)",
      instructions: [
        "Enforce an absolute 1-page constraint (under 450 words) with high information density.",
        "Structure sections: 1. Core Decision Required; 2. Financial & Strategic Context; 3. Options Evaluated; 4. Recommended Action & ROI.",
        "Present exact capital expenditures, operational savings, and risk mitigations upfront.",
        "Conclude with explicit sign-off checkboxes for key stakeholders."
],
      ruInstructions: [
        "Удерживайте строгий объем в одну страницу (до 450 слов) с предельной концентрацией фактов.",
        "Структурируйте документ: 1. Требуемое решение; 2. Контекст и ставки; 3. Рассмотренные альтернативы; 4. Рекомендация и ROI.",
        "Указывайте точные финансовые затраты, ожидаемую окупаемость и меры компенсации рисков.",
        "Завершайте меморандум блоком для согласования ключевыми лицами."
],
      semanticType: "structural_directive",
      tags: ["writing","executive-memo","decision-making","c-suite","business-writing"],
    }),
  },

  "copywriting-pas-problem-agitate-solve": {
    id: "copywriting-pas-problem-agitate-solve",
    name: "CopywritingPasProblemAgitateSolveSkill",
    displayName: "PAS Persuasive Copywriting Architecture (Problem / Agitate / Solve)",
    categoryId: "writing",
    description: "Structures high-converting landing pages, sales letters, and pitches using Problem, Agitate (emotional amplification of cost of inaction), and Solution.",
    tags: ["writing","pas","copywriting","conversion","persuasion"],
    transform: createStandardSkillTransform({
      sectionName: "PAS Copywriting Framework",
      ruSectionName: "Фреймворк убеждающего копирайтинга PAS (Проблема / Усиление / Решение)",
      instructions: [
        "Problem: State the customer acute frustration with absolute clarity and validation.",
        "Agitate: Amplify the hidden costs, emotional exhaustion, and financial risks of continuing with the status quo.",
        "Solve: Introduce the product/solution as the natural, inevitable, and effortless remedy.",
        "Conclude with a frictionless, single call-to-action (CTA)."
],
      ruInstructions: [
        "Проблема (Problem): Сформулируйте острую боль и разочарование клиента с глубоким пониманием ситуации.",
        "Усиление (Agitate): Раскройте скрытые издержки, стресс и финансовые потери от сохранения статус-кво.",
        "Решение (Solve): Представьте ваш продукт как естественное, надежное и простое решение проблемы.",
        "Завершайте текст четким и понятным целевым действием (CTA)."
],
      semanticType: "process_directive",
      tags: ["writing","pas","copywriting","conversion","persuasion"],
    }),
  },

  "copywriting-aida-attention-interest-desire": {
    id: "copywriting-aida-attention-interest-desire",
    name: "CopywritingAidaAttentionInterestDesireSkill",
    displayName: "AIDA Marketing Copywriting Architecture (Attention / Interest / Desire / Action)",
    categoryId: "writing",
    description: "Guides readers down the psychological conversion funnel using Attention hook, Interest curiosity, Desire transformation proof, and Action trigger.",
    tags: ["writing","aida","marketing","copywriting","funnels"],
    transform: createStandardSkillTransform({
      sectionName: "AIDA Marketing Copywriting Protocol",
      ruSectionName: "Фреймворк маркетингового копирайтинга AIDA (Внимание / Интерес / Желание / Действие)",
      instructions: [
        "Attention: Grab focus with a pattern-interrupt headline or counterintuitive statistic.",
        "Interest: Sustain engagement by explaining the surprising mechanics behind why traditional methods fail.",
        "Desire: Stoke emotional desire using social proof, case studies, and concrete before/after transformations.",
        "Action: Drive immediate conversion with risk-reversal guarantees and urgency."
],
      ruInstructions: [
        "Внимание (Attention): Захватите внимание заголовком, ломающим привычные шаблоны, или парадоксальным фактом.",
        "Интерес (Interest): Удержите интерес, раскрыв неожиданную причину неэффективности стандартных подходов.",
        "Желание (Desire): Разжигайте желание через социальные доказательства, кейсы и яркий контраст \"до/после\".",
        "Действие (Action): Побуждайте к мгновенному действию, снимая риски гарантией возврата средств."
],
      semanticType: "process_directive",
      tags: ["writing","aida","marketing","copywriting","funnels"],
    }),
  },

  "press-release-inverted-pyramid-wire": {
    id: "press-release-inverted-pyramid-wire",
    name: "PressReleaseInvertedPyramidWireSkill",
    displayName: "Standard Inverted-Pyramid PR Newswire Press Release",
    categoryId: "writing",
    description: "Formats corporate announcements adhering to PR Newswire/AP standards: FOR IMMEDIATE RELEASE, City/Date DATELINE, 5Ws Lede, Executive Quote, Boilerplate.",
    tags: ["writing","press-release","pr","media","communications"],
    transform: createStandardSkillTransform({
      sectionName: "Press Release Inverted Pyramid Protocol",
      ruSectionName: "Спецификация пресс-релиза для СМИ (Inverted Pyramid / PR Newswire)",
      instructions: [
        "Header: `FOR IMMEDIATE RELEASE` with contact name, email, and publication date.",
        "Dateline & Lede: CITY, State -- Date -- Open with who, what, where, when, and why in paragraph 1.",
        "Body & Quotes: Incorporate authentic executive leadership quotes articulating strategic market context.",
        "Footer: Conclude with standard company `About [Company]` boilerplate and media inquiries link."
],
      ruInstructions: [
        "Заголовок: Маркер `ДЛЯ НЕМЕДЛЕННОГО РАСПРОСТРАНЕНИЯ` с контактами для прессы и датой публикации.",
        "Дейтлайн и лид: ГОРОД, Дата -- Раскройте кто, что, где, когда и почему в первом предложении.",
        "Тело и цитаты: Включите цитату топ-менеджера с объяснением стратегического значения новости.",
        "Справка: Завершайте релиз стандартным блоком `О компании` (Boilerplate) и контактами пресс-службы."
],
      semanticType: "structural_directive",
      tags: ["writing","press-release","pr","media","communications"],
    }),
  },

  "apology-restitution-crisis-response": {
    id: "apology-restitution-crisis-response",
    name: "ApologyRestitutionCrisisResponseSkill",
    displayName: "Four-Part Corporate Crisis Apology & Restitution Response",
    categoryId: "writing",
    description: "Crafts authentic, non-defensive public apologies during outages or PR crises: Unconditional Ownership, Root Cause Transparency, Restitution, Prevention Plan.",
    tags: ["writing","crisis-pr","apology","reputation","communications"],
    transform: createStandardSkillTransform({
      sectionName: "Crisis Apology & Restitution Protocol",
      ruSectionName: "Протокол публичных извинений и компенсации ущерба (Crisis Response)",
      instructions: [
        "Unconditional Ownership: Accept 100% responsibility immediately without shifting blame to third-party vendors or users.",
        "Direct Empathy: Acknowledge the exact disruption, financial cost, and frustration caused to affected customers.",
        "Transparent Root Cause: Explain what went wrong technically in clear, honest plain language.",
        "Restitution & Prevention: Detail immediate compensation credits and permanent architectural safeguards."
],
      ruInstructions: [
        "Безусловная ответственность: Примите 100% ответственности на себя без перекладывания вины на подрядчиков.",
        "Прямая эмпатия: Честно признайте причиненные неудобства, потери времени и финансовый ущерб клиентов.",
        "Прозрачность первопричины: Объясните суть технического сбоя понятным и честным языком.",
        "Компенсация и защита: Опишите начисленные компенсации и конкретные шаги по исключению повторения инцидента."
],
      semanticType: "process_directive",
      tags: ["writing","crisis-pr","apology","reputation","communications"],
    }),
  },

  "speechwriting-anaphora-cadence-rhetoric": {
    id: "speechwriting-anaphora-cadence-rhetoric",
    name: "SpeechwritingAnaphoraCadenceRhetoricSkill",
    displayName: "Rhetorical Oratory, Anaphora & Cadenced Speechwriting",
    categoryId: "writing",
    description: "Composes moving, memorable speeches using classical rhetorical devices: Anaphora, Tricolon (Rule of Three), Chiasmus, and vocal breathing pauses.",
    tags: ["writing","speechwriting","rhetoric","keynotes","public-speaking"],
    transform: createStandardSkillTransform({
      sectionName: "Rhetorical Oratory & Speechwriting Protocol",
      ruSectionName: "Протокол риторического мастерства и ораторских речей (Anaphora & Cadence)",
      instructions: [
        "Deploy classical rhetorical figures: Anaphora (repetition of opening phrases), Tricolon (triplets of ideas), Antithesis.",
        "Structure rhythm for oral delivery: mark intentional pauses with [PAUSE] and vocal inflection cues.",
        "Vary sentence lengths to create dynamic musical cadence (short punchy lines followed by rolling harmonic prose).",
        "Build to an inspiring, emotional crescendo that mobilizes listeners into shared collective action."
],
      ruInstructions: [
        "Используйте классические риторические приемы: анафору (повтор начальных слов), триколоны (правило трех), антитезы.",
        "Размечайте текст под устное выступление: расставляйте маркеры смысловых пауз `[ПАУЗА]` и интонационные акценты.",
        "Чередуйте длину предложений для создания живой ритмики речи (хлесткие фразы после развернутых мыслей).",
        "Ведите речь к эмоциональной кульминации, побуждающей слушателей к совместному действию."
],
      semanticType: "process_directive",
      tags: ["writing","speechwriting","rhetoric","keynotes","public-speaking"],
    }),
  },

  "technical-tutorial-task-oriented-pacing": {
    id: "technical-tutorial-task-oriented-pacing",
    name: "TechnicalTutorialTaskOrientedPacingSkill",
    displayName: "Task-Oriented Developer Tutorial & Quickstart Architecture",
    categoryId: "writing",
    description: "Structures developer guides into frictionless, milestone-driven journeys: Prerequisites, 5-Minute Quickstart, Code Samples, and \"What Just Happened?\" breakdowns.",
    tags: ["writing","developer-documentation","tutorials","tech-writing","quickstart"],
    transform: createStandardSkillTransform({
      sectionName: "Task-Oriented Developer Tutorial Protocol",
      ruSectionName: "Протокол создания практических руководств для разработчиков (Tutorial Flow)",
      instructions: [
        "Lead with a 5-minute Quickstart getting the user to a working \"Hello World\" deliverable immediately.",
        "List explicit prerequisites with copy-pasteable version verification commands.",
        "Accompany every code snippet with a \"What Just Happened?\" conceptual explanation.",
        "Include a troubleshooting section addressing the top 3 most common beginner mistakes."
],
      ruInstructions: [
        "Начинайте с 5-минутного быстрого старта (Quickstart), дающего работающий результат на первом же шаге.",
        "Указывайте точные системные требования с командами для проверки версий установленных утилит.",
        "Снабжайте каждый блок кода разделом \"Что здесь произошло?\" с разбором ключевых строк.",
        "Включайте блок решения типичных проблем (Troubleshooting) с ответами на частые ошибки новичков."
],
      semanticType: "process_directive",
      tags: ["writing","developer-documentation","tutorials","tech-writing","quickstart"],
    }),
  },

  "board-of-directors-quarterly-deck-narrative": {
    id: "board-of-directors-quarterly-deck-narrative",
    name: "BoardOfDirectorsQuarterlyDeckNarrativeSkill",
    displayName: "Board of Directors Quarterly Strategic Deck Narrative",
    categoryId: "writing",
    description: "Drafts strategic commentary for quarterly Board of Directors meetings: Executive Summary, OKR Performance, Financial Burn, Strategic Pivots, and Asks.",
    tags: ["writing","board-deck","executive","governance","strategy"],
    transform: createStandardSkillTransform({
      sectionName: "Board of Directors Narrative Protocol",
      ruSectionName: "Протокол подготовки материалов для Совета Директоров (Board Deck)",
      instructions: [
        "Adopt an objective, confident, and radically candid tone regarding business performance.",
        "Highlight Key Highlights (Wins), Key Lowlights (Misses), and corrective strategic interventions.",
        "Present cash runway, burn rate, and unit economics with unambiguous charts and scenario modeling.",
        "Frame formal Board Resolutions and voting requests with crisp legal and governance clarity."
],
      ruInstructions: [
        "Используйте объективный, зрелый и предельно честный тон при описании показателей бизнеса.",
        "Четко выделяйте главные победы (Highlights) и ключевые неудачи (Lowlights) с планом их исправления.",
        "Показывайте динамику денежного потока (Burn Rate), взлетно-посадочную полосу (Runway) и юнит-экономику.",
        "Формулируйте вопросы для голосования членов Совета Директоров с четкими юридическими формулировками."
],
      semanticType: "process_directive",
      tags: ["writing","board-deck","executive","governance","strategy"],
    }),
  },

  "case-study-hero-customer-transformation": {
    id: "case-study-hero-customer-transformation",
    name: "CaseStudyHeroCustomerTransformationSkill",
    displayName: "B2B Customer Transformation Hero Case Study",
    categoryId: "writing",
    description: "Writes compelling enterprise B2B case studies casting the customer as the hero: The Incumbent Struggle, The Solution Discovery, The Deployment, The 10x Metrics.",
    tags: ["writing","case-study","b2b-marketing","customer-story","social-proof"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Customer Transformation Case Study Protocol",
      ruSectionName: "Фреймворк клиентского кейса B2B (Customer Transformation Story)",
      instructions: [
        "Cast the customer as the protagonist hero overcoming insurmountable legacy hurdles.",
        "Present quantifiable baseline metrics before adoption (e.g. 14-day manual processing cycle).",
        "Detail the collaborative rollout experience and smooth migration milestones.",
        "Conclude with audited business transformation metrics (e.g. 85% cost reduction, $2.4M saved annually)."
],
      ruInstructions: [
        "Позиционируйте клиента как главного героя истории, преодолевающего тяжелые легаси-барьеры.",
        "Фиксируйте точные исходные показатели до внедрения (например, 14 дней ручной обработки заявок).",
        "Описывайте процесс внедрения и ключевые этапы командного взаимодействия.",
        "Завершайте кейс подтвержденными бизнес-метриками (сокращение издержек на 85%, экономия $2.4M в год)."
],
      semanticType: "process_directive",
      tags: ["writing","case-study","b2b-marketing","customer-story","social-proof"],
    }),
  },

  "ghostwriting-c-suite-linkedin-voice": {
    id: "ghostwriting-c-suite-linkedin-voice",
    name: "GhostwritingCSuiteLinkedinVoiceSkill",
    displayName: "Executive Ghostwriting & Thought-Leadership Voice",
    categoryId: "writing",
    description: "Ghostwrites authentic thought-leadership essays and social posts for founders and C-suite executives with distinctive personal voice and sharp industry insights.",
    tags: ["writing","ghostwriting","thought-leadership","linkedin","personal-brand"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Ghostwriting Protocol",
      ruSectionName: "Протокол авторского гострайтинга для топ-менеджеров (Executive Voice)",
      instructions: [
        "Capture the executive unique personal idiolect: sentence cadence, characteristic analogies, and worldview.",
        "Open with a bold counter-narrative hook challenging prevailing industry dogma.",
        "Ground arguments in real-world leadership dilemmas and proprietary operational data.",
        "Deliver actionable insights that elevate the reader perspective without self-serving promotional fluff."
],
      ruInstructions: [
        "Воспроизводите уникальный авторский голос лидера: ритмику речи, любимые метафоры и профессиональный взгляд.",
        "Начинайте с сильного контринтуитивного тезиса, бросающего вызов устоявшимся отраслевым догмам.",
        "Опирайтесь на реальный опыт преодоления управленческих кризисов и практические данные.",
        "Формируйте экспертные выводы высокой ценности для аудитории без навязчивой саморекламы."
],
      semanticType: "process_directive",
      tags: ["writing","ghostwriting","thought-leadership","linkedin","personal-brand"],
    }),
  },

  "product-launch-hacker-news-show-hn": {
    id: "product-launch-hacker-news-show-hn",
    name: "ProductLaunchHackerNewsShowHnSkill",
    displayName: "Show HN Authentic Engineering Launch Storytelling",
    categoryId: "writing",
    description: "Crafts authentic launch posts for developer communities (Show HN, Reddit /r/programming) with zero corporate marketing speak, open tech stack details, and humility.",
    tags: ["writing","show-hn","hacker-news","developer-marketing","product-launch"],
    transform: createStandardSkillTransform({
      sectionName: "Show HN Engineering Launch Protocol",
      ruSectionName: "Протокол инженерного анонса на Hacker News (Show HN Style)",
      instructions: [
        "Headline: Clean `Show HN: [Product Name] – [Concise, descriptive technical value prop]`.",
        "Body: Explain why you built this, the technical hurdles solved, and the exact architectural stack used.",
        "Maintain an authentic, humble, builder-to-builder tone; eliminate 100% of PR and marketing buzzwords.",
        "Invite technical feedback and explicitly address privacy, data storage, and pricing transparency upfront."
],
      ruInstructions: [
        "Заголовок: Лаконичный формат `Show HN: [Имя] – [Понятная суть технического продукта]`.",
        "Текст: Расскажите, почему вы решили это создать, с какими сложностями столкнулись и какой стек использовали.",
        "Выдерживайте открытый, скромный тон разработчика для разработчиков; полностью исключите маркетинговый пафос.",
        "Приглашайте к открытому обсуждению архитектуры и прямо отвечайте на вопросы о хранении данных и ценах."
],
      semanticType: "process_directive",
      tags: ["writing","show-hn","hacker-news","developer-marketing","product-launch"],
    }),
  },

  "sales-objection-reframing-matrix": {
    id: "sales-objection-reframing-matrix",
    name: "SalesObjectionReframingMatrixSkill",
    displayName: "B2B Sales Objection Neutralization & Value Anchor",
    categoryId: "writing",
    description: "Reframes tough enterprise buyer objections (\"Too expensive\", \"Already using competitor\", \"No budget\") into compelling ROI and risk-mitigation conversations.",
    tags: ["writing","sales","objection-handling","b2b-sales","negotiation"],
    transform: createStandardSkillTransform({
      sectionName: "Sales Objection Reframing Framework",
      ruSectionName: "Фреймворк нейтрализации возражений в B2B-продажах (Objection Reframing)",
      instructions: [
        "Acknowledge & Validate: Validate buyer concern respectfully without defensive pushback.",
        "Clarify & Isolate: Ask targeted diagnostic questions to uncover the root underlying anxiety.",
        "Reframe: Shift perspective from short-term purchase price to long-term cost of inaction and hidden operational waste.",
        "Evidence Proof: Provide a peer case study demonstrating verified positive payback period."
],
      ruInstructions: [
        "Присоединение и валидация: Уважительно примите сомнение клиента без споров и защитной реакции.",
        "Уточнение: Задайте диагностический вопрос для выявления истинной причины беспокойства.",
        "Перефреймирование: Переведите фокус с цены покупки на совокупную стоимость владения и потери от бездействия.",
        "Доказательство: Приведите пример аналогичной компании, успешно окупившей внедрение в короткие сроки."
],
      semanticType: "process_directive",
      tags: ["writing","sales","objection-handling","b2b-sales","negotiation"],
    }),
  },

  "newsletter-curation-editorial-voice": {
    id: "newsletter-curation-editorial-voice",
    name: "NewsletterCurationEditorialVoiceSkill",
    displayName: "Curated Editorial Newsletter & Synthesis Voice",
    categoryId: "writing",
    description: "Curates complex weekly industry developments into crisp, high-signal newsletters with witty commentary, key takeaways, and curated links.",
    tags: ["writing","newsletter","curation","editorial","content-strategy"],
    transform: createStandardSkillTransform({
      sectionName: "Newsletter Editorial Curation Protocol",
      ruSectionName: "Протокол авторской рассылки и дайджеста новостей (Editorial Newsletter)",
      instructions: [
        "Lead with a 2-paragraph \"Big Theme of the Week\" deep-dive essay connecting disparate industry trends.",
        "Structure curated links with: 1-sentence TL;DR, \"Why It Matters\" strategic analysis, and direct source link.",
        "Maintain an engaging, conversational, yet intellectually rigorous editorial voice.",
        "Conclude with an interactive reader question or thought-provoking closing thought."
],
      ruInstructions: [
        "Открывайте выпуск аналитическим эссе на 2 абзаца о главной теме недели, связывающей разрозненные события.",
        "Оформляйте подборки ссылок: краткая суть в 1 предложение, блок \"Почему это важно\" и ссылка на первоисточник.",
        "Поддерживайте живой, остроумный и глубокий экспертный тон автора рассылки.",
        "Завершайте письмо вопросом к читателям для стимулирования обратной связи и диалога."
],
      semanticType: "process_directive",
      tags: ["writing","newsletter","curation","editorial","content-strategy"],
    }),
  },

  "technical-rfc-executive-summary": {
    id: "technical-rfc-executive-summary",
    name: "TechnicalRfcExecutiveSummarySkill",
    displayName: "Architecture Decision RFC 30-Second Executive Summary",
    categoryId: "writing",
    description: "Compresses multi-page Request for Comments (RFC) engineering proposals into a crisp 30-second executive summary for engineering leadership.",
    tags: ["writing","rfc","executive-summary","system-architecture","tech-leadership"],
    transform: createStandardSkillTransform({
      sectionName: "RFC Executive Summary Protocol",
      ruSectionName: "Протокол краткого резюме архитектурного предложения (RFC Executive Summary)",
      instructions: [
        "Problem Statement: Summarize the current architectural bottleneck in 2 clear sentences.",
        "Proposed Solution: State the chosen technology pattern and why alternatives were rejected.",
        "Resource & Time Investment: Detail estimated engineering weeks and infrastructure budget impacts.",
        "Blast Radius & Migration Risk: Outline downtime exposure and rollback capability."
],
      ruInstructions: [
        "Суть проблемы: Опишите текущее архитектурное ограничение в двух емких предложениях.",
        "Предлагаемое решение: Укажите выбранный технологический паттерн и причину отказа от альтернатив.",
        "Затраты ресурсов: Зафиксируйте оценку человеко-недель разработки и влияние на облачный бюджет.",
        "Радиус влияния и риски: Опишите план безопасной миграции и стратегию гарантированного отката."
],
      semanticType: "structural_directive",
      tags: ["writing","rfc","executive-summary","system-architecture","tech-leadership"],
    }),
  },

  "grant-proposal-aims-significance-nih": {
    id: "grant-proposal-aims-significance-nih",
    name: "GrantProposalAimsSignificanceNihSkill",
    displayName: "Academic Grant Proposal Specific Aims & Significance",
    categoryId: "writing",
    description: "Structures grant applications (NIH/NSF style) with compelling Specific Aims, Long-Term Objectives, Hypothesis, Innovation, and Preliminary Data narratives.",
    tags: ["writing","grants","academic-writing","research-funding","proposals"],
    transform: createStandardSkillTransform({
      sectionName: "Grant Proposal Specific Aims Protocol",
      ruSectionName: "Спецификация раздела целей грантовой заявки (Specific Aims / NIH)",
      instructions: [
        "Significance & Critical Gap: Establish the major societal/scientific unmet challenge and current barrier.",
        "Central Hypothesis: Formulate a clear, mechanistic, and experimentally testable hypothesis.",
        "Specific Aims: Detail 2-3 focused, independent, and feasible experimental aims.",
        "Innovation & Impact: Articulate how this work transforms the paradigm in the field."
],
      ruInstructions: [
        "Актуальность и научный пробел: Обозначьте фундаментальную проблему науки и существующие ограничения.",
        "Центральная гипотеза: Сформулируйте проверяемую научную гипотезу с понятным механизмом действия.",
        "Конкретные задачи (Specific Aims): Сформируйте 2-3 независимые, реалистичные и измеримые исследовательские задачи.",
        "Новизна и вклад: Раскройте, как результаты исследования изменят существующую парадигму в отрасли."
],
      semanticType: "process_directive",
      tags: ["writing","grants","academic-writing","research-funding","proposals"],
    }),
  },

  "customer-winback-re-engagement-email": {
    id: "customer-winback-re-engagement-email",
    name: "CustomerWinbackReEngagementEmailSkill",
    displayName: "Dormant Customer Win-Back & Value Realization Email",
    categoryId: "writing",
    description: "Crafts persuasive re-engagement emails to dormant or churned users: Acknowledging hiatus, highlighting major product leaps, and offering friction-free return paths.",
    tags: ["writing","email-marketing","winback","retention","lifecycle"],
    transform: createStandardSkillTransform({
      sectionName: "Customer Win-Back Email Protocol",
      ruSectionName: "Протокол реактивации клиентов и возврата оттока (Win-Back Email)",
      instructions: [
        "Acknowledge Absence Warmly: Open with a genuine, low-pressure acknowledgment of the user hiatus.",
        "Highlight Real Upgrades: Showcase top 3 major new features or performance improvements shipped since they left.",
        "Offer Direct Immediate Value: Provide a personalized incentive (e.g. 14-day premium trial, free audit).",
        "Make Returning Effortless: Include a single 1-click magic link bypassing password reset friction."
],
      ruInstructions: [
        "Теплое приветствие: Начните с дружелюбного и ненавязчивого признания перерыва в использовании сервиса.",
        "Показ реального прогресса: Покажите 3 главных обновления продукта, выпущенных за время отсутствия пользователя.",
        "Прямая ценность: Предложите персональный бонус (бесплатный период, аудит, доступ к премиум-функциям).",
        "Бесшовный возврат: Добавьте прямую ссылку входа в один клик без сложного сброса пароля."
],
      semanticType: "process_directive",
      tags: ["writing","email-marketing","winback","retention","lifecycle"],
    }),
  },

  "onboarding-email-drip-sequence": {
    id: "onboarding-email-drip-sequence",
    name: "OnboardingEmailDripSequenceSkill",
    displayName: "5-Stage SaaS User Onboarding Email Drip Sequence",
    categoryId: "writing",
    description: "Designs an automated 5-part customer onboarding email sequence: Welcome/AHA Trigger, Quick Win, Pro Feature, Case Study Inspiration, and Support Check-in.",
    tags: ["writing","onboarding","email-drip","saas","lifecycle-marketing"],
    transform: createStandardSkillTransform({
      sectionName: "Onboarding Email Drip Sequence Protocol",
      ruSectionName: "Фреймворк цепочки писем онбординга пользователей (Onboarding Drip Campaign)",
      instructions: [
        "Email 1 (Day 0): Instant Welcome + Single Actionable Step to achieve first AHA moment.",
        "Email 2 (Day 2): Quick Win Guide showing a 3-minute shortcut feature.",
        "Email 3 (Day 4): Overcoming Common Hurdles + Power User workflow tip.",
        "Email 4 (Day 7): Customer Success Story demonstrating transformative workflow results.",
        "Email 5 (Day 11): Personalized Check-in from Founder/Success Manager offering 1-on-1 assistance."
],
      ruInstructions: [
        "Письмо 1 (День 0): Приветствие и одно простое действие для получения первого результата (AHA-момент).",
        "Письмо 2 (День 2): Руководство по быстрой победе с показом полезной скрытой фичи сервиса.",
        "Письмо 3 (День 4): Разбор частых ошибок и продвинутый лайфхак для опытных пользователей.",
        "Письмо 4 (День 7): Вдохновляющий кейс клиента с измеримыми результатами экономии времени.",
        "Письмо 5 (День 11): Личный вопрос от основателя сервиса с предложением персональной помощи."
],
      semanticType: "process_directive",
      tags: ["writing","onboarding","email-drip","saas","lifecycle-marketing"],
    }),
  },

  "academic-abstract-structured-imrad": {
    id: "academic-abstract-structured-imrad",
    name: "AcademicAbstractStructuredImradSkill",
    displayName: "Structured IMRaD Scientific Journal Abstract",
    categoryId: "writing",
    description: "Formats scientific and technical papers into structured IMRaD abstracts: Introduction/Background, Methods, Results (with metrics), and Discussion/Conclusion.",
    tags: ["writing","abstract","imrad","academic-writing","peer-review"],
    transform: createStandardSkillTransform({
      sectionName: "Structured IMRaD Abstract Protocol",
      ruSectionName: "Спецификация структурированной научной аннотации (IMRaD Abstract)",
      instructions: [
        "Background: State the fundamental scientific context and unmet research question in 2 sentences.",
        "Methods: Detail study design, sample size, control groups, and statistical testing methodologies.",
        "Results: Report quantitative findings with confidence intervals (p-values, effect sizes, percentages).",
        "Conclusion: Synthesize the broader implications and novel paradigm shifts introduced by the findings."
],
      ruInstructions: [
        "Введение (Background): Опишите научный контекст и нерешенный исследовательский вопрос в 2 предложениях.",
        "Методы (Methods): Укажите дизайн исследования, размер выборки, контрольные группы и методы статистического анализа.",
        "Результаты (Results): Приведите количественные результаты с доверительными интервалами и p-value.",
        "Заключение (Conclusion): Сформулируйте практическое значение выводов для развития научной дисциплины."
],
      semanticType: "structural_directive",
      tags: ["writing","abstract","imrad","academic-writing","peer-review"],
    }),
  },

  "keynote-presentation-script-steve-jobs": {
    id: "keynote-presentation-script-steve-jobs",
    name: "KeynotePresentationScriptSteveJobsSkill",
    displayName: "Steve Jobs 3-Act Product Keynote Presentation Script",
    categoryId: "writing",
    description: "Scripts mesmerizing product announcement keynotes following Steve Jobs legendary 3-act narrative structure: The Villain (status quo), The Hero (our product), and One More Thing.",
    tags: ["writing","keynote","presentations","steve-jobs","storytelling","product-launch"],
    transform: createStandardSkillTransform({
      sectionName: "Three-Act Product Keynote Protocol",
      ruSectionName: "Сценарий продуктовой презентации в стиле Стива Джобса (Three-Act Keynote)",
      instructions: [
        "Act 1 (The Villain): Establish the painful status quo and explain why existing industry solutions are broken.",
        "Act 2 (The Hero): Reveal the new product with theatrical pacing; demonstrate live magical features.",
        "Act 3 (The Revolution): Anchor product impact in cultural/industry transformation, pricing, and availability.",
        "Incorporate \"One More Thing\" surprise reveal at the emotional peak of the presentation."
],
      ruInstructions: [
        "Акт 1 (Противник): Опишите несовершенство существующего рынка и покажите, почему старые решения не работают.",
        "Акт 2 (Герой): Эффектно презентуйте новый продукт; покажите живую демонстрацию ключевых возможностей.",
        "Акт 3 (Революция): Раскройте влияние продукта на индустрию, объявите доступность и справедливую цену.",
        "Используйте прием \"One More Thing\" для неожиданного финального сюрприза на пике эмоций зала."
],
      semanticType: "process_directive",
      tags: ["writing","keynote","presentations","steve-jobs","storytelling","product-launch"],
    }),
  },

  "conflict-de-escalation-workplace-feedback": {
    id: "conflict-de-escalation-workplace-feedback",
    name: "ConflictDeEscalationWorkplaceFeedbackSkill",
    displayName: "SBI Workplace Feedback & Conflict De-escalation Memo",
    categoryId: "writing",
    description: "Delivers tough constructive feedback using the SBI framework (Situation, Behavior, Impact) without triggering defensive hostility.",
    tags: ["writing","feedback","sbi-framework","management","conflict-resolution"],
    transform: createStandardSkillTransform({
      sectionName: "SBI Constructive Feedback Protocol",
      ruSectionName: "Фреймворк конструктивной обратной связи SBI (Ситуация / Поведение / Влияние)",
      instructions: [
        "Situation: Ground feedback in a specific time and physical/virtual location.",
        "Behavior: Describe purely objective observable actions without making character or motivation judgments.",
        "Impact: Explain the direct operational, emotional, or business consequences of the behavior.",
        "Collaborative Forward Plan: Invite the individual perspective and co-create an agreed corrective action plan."
],
      ruInstructions: [
        "Ситуация (Situation): Привяжите обратную связь к конкретному моменту времени и рабочей встрече.",
        "Поведение (Behavior): Опишите строго наблюдаемые факты и действия без оценок личности и мотивов коллеги.",
        "Влияние (Impact): Объясните прямые последствия этих действий для проекта, команды и бизнес-результатов.",
        "Совместный план: Выслушайте взгляд собеседника и согласуйте понятные договоренности на будущее."
],
      semanticType: "process_directive",
      tags: ["writing","feedback","sbi-framework","management","conflict-resolution"],
    }),
  },

  "policy-whitepaper-legislative-brief": {
    id: "policy-whitepaper-legislative-brief",
    name: "PolicyWhitepaperLegislativeBriefSkill",
    displayName: "Public Policy Legislative Briefing & Regulatory Whitepaper",
    categoryId: "writing",
    description: "Drafts authoritative legislative policy briefs for policymakers: Executive Summary, Statutory Background, Socio-Economic Impact, and Model Legislation.",
    tags: ["writing","public-policy","whitepaper","government","legislation"],
    transform: createStandardSkillTransform({
      sectionName: "Public Policy Briefing Protocol",
      ruSectionName: "Спецификация аналитической записки по государственной политике (Policy Brief)",
      instructions: [
        "Executive Summary: Summarize the regulatory imperative and recommended legislative action in 300 words.",
        "Statutory Background: Review existing legal frameworks, jurisdictional precedents, and market failures.",
        "Cost-Benefit Analysis: Provide quantitative projections of fiscal, economic, and societal outcomes.",
        "Actionable Model Policy: Include precise statutory amendment language ready for legislative introduction."
],
      ruInstructions: [
        "Краткое резюме: Сформулируйте суть регуляторной проблемы и предлагаемые меры в пределах 300 слов.",
        "Правовой контекст: Проанализируйте действующие законы, судебные прецеденты и причины провалов рынка.",
        "Анализ затрат и выгод: Приведите прогноз финансовых, экономических и социальных последствий реформы.",
        "Проект норм: Предоставьте готовые формулировки статей нормативного акта для внесения на рассмотрение."
],
      semanticType: "structural_directive",
      tags: ["writing","public-policy","whitepaper","government","legislation"],
    }),
  },

  "user-interview-synthesis-executive-summary": {
    id: "user-interview-synthesis-executive-summary",
    name: "UserInterviewSynthesisExecutiveSummarySkill",
    displayName: "Qualitative User Research Synthesis & Insight Themes",
    categoryId: "writing",
    description: "Synthesizes dozens of qualitative user interview transcripts into structured research findings: Persona archetypes, Core Frustrations, Surprising Insights, and Product Opportunities.",
    tags: ["writing","ux-research","user-interviews","synthesis","product-discovery"],
    transform: createStandardSkillTransform({
      sectionName: "User Research Synthesis Protocol",
      ruSectionName: "Протокол синтеза качественных исследований пользователей (UX Synthesis)",
      instructions: [
        "Affinity Grouping: Group qualitative interview quotes into cohesive thematic insight clusters.",
        "Verbatim Voice of Customer: Include powerful, unedited customer quotes that illuminate core pain points.",
        "Highlight Surprises: Explicitly document findings that invalidated initial team assumptions.",
        "Prioritized Product Recommendations: Rank actionable opportunities by customer frequency and business impact."
],
      ruInstructions: [
        "Кластеризация данных: Объединяйте цитаты из интервью в смысловые группы ключевых инсайтов.",
        "Голос клиента: Включайте яркие прямые цитаты пользователей, наиболее точно передающие остроту проблемы.",
        "Опровергнутые гипотезы: Фиксируйте факты, которые опровергли первоначальные предположения команды.",
        "Приоритеты для продукта: Ранжируйте рекомендации по частоте упоминания клиентами и эффекту для бизнеса."
],
      semanticType: "process_directive",
      tags: ["writing","ux-research","user-interviews","synthesis","product-discovery"],
    }),
  },

  "faq-knowledge-base-resolution-writing": {
    id: "faq-knowledge-base-resolution-writing",
    name: "FaqKnowledgeBaseResolutionWritingSkill",
    displayName: "Knowledge Base & Self-Service FAQ Resolution Guide",
    categoryId: "writing",
    description: "Formats customer support articles for rapid self-service resolution: Direct 1-Sentence Answer, Step-by-Step Instructions, Visual Cues, and Related Troubleshooting.",
    tags: ["writing","knowledge-base","faq","customer-support","self-service"],
    transform: createStandardSkillTransform({
      sectionName: "Knowledge Base Resolution Protocol",
      ruSectionName: "Протокол написания статей базы знаний и FAQ (Self-Service Resolution)",
      instructions: [
        "Lead with a direct 1-sentence answer answering the customer question before any step-by-step lists.",
        "Provide numbered, sequential action steps with precise UI button and menu label names in bold.",
        "Incorporate callouts highlighting critical caveats or prerequisite permissions.",
        "Include a \"Still having trouble?\" contact escalation path at the bottom."
],
      ruInstructions: [
        "Давайте прямой ответ на вопрос клиента в первом предложении до начала пошаговых инструкций.",
        "Оформляйте шаги нумерованным списком с выделением названий кнопок и пунктов меню жирным шрифтом.",
        "Используйте визуальные блоки-выноски для предупреждения о важных системных требованиях и правах доступа.",
        "Добавляйте ссылку на связь с поддержкой в конце статьи на случай нестандартных проблем."
],
      semanticType: "structural_directive",
      tags: ["writing","knowledge-base","faq","customer-support","self-service"],
    }),
  },

  "changelog-release-notes-user-delight": {
    id: "changelog-release-notes-user-delight",
    name: "ChangelogReleaseNotesUserDelightSkill",
    displayName: "User-Centric Release Notes & Feature Changelog",
    categoryId: "writing",
    description: "Transforms dry git commit logs into engaging, user-delight release notes highlighting how new features save time and solve real workflow bottlenecks.",
    tags: ["writing","release-notes","changelog","product-marketing","customer-delight"],
    transform: createStandardSkillTransform({
      sectionName: "User-Centric Release Notes Protocol",
      ruSectionName: "Протокол написания ориентированных на пользователя заметок о релизе (Release Notes)",
      instructions: [
        "Categorize updates under user-friendly headers: `✨ New Capabilities`, `⚡ Speed & Polish`, `🛠️ Fixes`.",
        "Explain the \"Why\": Describe the real user workflow improvement behind every technical change.",
        "Adopt a cheerful, appreciative, and celebratory tone celebrating customer feedback.",
        "Include clear animated GIF or screenshot placeholders showcasing visual improvements."
],
      ruInstructions: [
        "Группируйте изменения по понятным категориям: `✨ Новые возможности`, `⚡ Скорость и удобство`, `🛠️ Исправления`.",
        "Объясняйте пользу: показывайте, как каждое изменение экономит время и упрощает работу пользователя.",
        "Используйте дружелюбный, живой тон и благодарите клиентов за присланные идеи и отзывы.",
        "Включайте места под скриншоты и демонстрационные анимации для наглядного показа интерфейса."
],
      semanticType: "process_directive",
      tags: ["writing","release-notes","changelog","product-marketing","customer-delight"],
    }),
  },

  "landing-page-hero-subhead-cta-trio": {
    id: "landing-page-hero-subhead-cta-trio",
    name: "LandingPageHeroSubheadCtaTrioSkill",
    displayName: "High-Converting Landing Page Hero Trio (H1 / Subhead / CTA)",
    categoryId: "writing",
    description: "Architects the critical above-the-fold landing page trio: Clear Benefit-Driven H1 Headline, Explanatory Subhead with Social Proof, and High-Intent Action Button.",
    tags: ["writing","landing-page","hero-section","copywriting","conversion-rate"],
    transform: createStandardSkillTransform({
      sectionName: "Landing Page Hero Trio Protocol",
      ruSectionName: "Протокол создания главного экрана лендинга (H1 / Подзаголовок / CTA)",
      instructions: [
        "H1 Headline: Deliver a crisp value proposition under 8 words emphasizing end customer transformation.",
        "Subhead: Elaborate on how the product achieves this, who it is for, and include an authority social proof stat.",
        "Primary CTA: Write action-oriented, low-friction button copy (e.g. \"Start Building Free\", not \"Submit\").",
        "Micro-Assurance: Include reassurance copy directly below the button (e.g. \"No credit card required • 2-minute setup\")."
],
      ruInstructions: [
        "Главный заголовок (H1): Сформулируйте ключевую ценность продукта емко (до 8 слов) с акцентом на результат для клиента.",
        "Подзаголовок: Поясните, как именно работает продукт, для кого он создан, и добавьте факт социального доказательства.",
        "Кнопка действия (CTA): Пишите энергичный и безопасный текст кнопки (\"Начать бесплатно\", а не \"Отправить\").",
        "Микрогарантия: Размещайте снимающий тревогу текст под кнопкой (\"Без привязки карты • Настройка за 2 минуты\")."
],
      semanticType: "process_directive",
      tags: ["writing","landing-page","hero-section","copywriting","conversion-rate"],
    }),
  },

  "manifesto-movement-building-prose": {
    id: "manifesto-movement-building-prose",
    name: "ManifestoMovementBuildingProseSkill",
    displayName: "Company Manifesto & Cultural Movement Building Prose",
    categoryId: "writing",
    description: "Crafts inspiring company manifestos that rally employees and customers around an urgent collective mission, defining what the organization fights for and against.",
    tags: ["writing","manifesto","culture","branding","storytelling","inspiration"],
    transform: createStandardSkillTransform({
      sectionName: "Company Cultural Manifesto Protocol",
      ruSectionName: "Протокол создания корпоративного манифеста (Movement-Building Manifesto)",
      instructions: [
        "Declare the Enemy: Clearly articulate the broken legacy status quo or outdated mindset being challenged.",
        "State Core Convictions: Detail 5 non-negotiable philosophical principles using rhythmic, anthemic prose.",
        "Paint the Future: Cast a compelling vision of the world when this collective mission succeeds.",
        "Call to Revolution: Invite passionate builders, customers, and partners to join the movement."
],
      ruInstructions: [
        "Обозначьте проблему: Четко сформулируйте устаревший порядок вещей или догму, против которой вы выступаете.",
        "Провозгласите принципы: Зафиксируйте 5 фундаментальных убеждений компании в ритмичной и вдохновляющей форме.",
        "Опишите будущее: Нарисуйте вдохновляющую картину мира, в котором эта миссия успешно реализована.",
        "Призыв к действию: Пригласите единомышленников, клиентов и партнеров присоединиться к движению."
],
      semanticType: "process_directive",
      tags: ["writing","manifesto","culture","branding","storytelling","inspiration"],
    }),
  },

  "podcast-host-script-narrative-transitions": {
    id: "podcast-host-script-narrative-transitions",
    name: "PodcastHostScriptNarrativeTransitionsSkill",
    displayName: "Narrative Audio Documentary Script & Host Transitions",
    categoryId: "writing",
    description: "Scripts immersive narrative podcast episodes with spoken-word host voiceovers, sound design cues [SFX], and seamless interview audio clip setups.",
    tags: ["writing","podcast","audio-storytelling","scriptwriting","media"],
    transform: createStandardSkillTransform({
      sectionName: "Narrative Audio Podcast Script Protocol",
      ruSectionName: "Спецификация сценария нарративного аудиоподкаста (Podcast Script)",
      instructions: [
        "Write in an intimate, conversational spoken-word style crafted for the ear rather than the eye.",
        "Integrate audio production cues: `[SFX: Ambient rain]`, `[MUSIC: Tense strings swell]`, `[TAPE: Guest interview clip]`.",
        "Craft smooth narrative setups that contextualize guest audio clips without repeating verbatim what they say.",
        "Maintain narrative momentum through intriguing open loops and cliffhanger chapter breaks."
],
      ruInstructions: [
        "Пишите разговорным, доверительным стилем, ориентированным на восприятие на слух, а не на чтение.",
        "Размечайте звуковой дизайн: `[SFX: шум улицы]`, `[МУЗЫКА: нарастание темпа]`, `[ЗАПИСЬ: цитата гостя]`.",
        "Создавайте органичные подводки к синхронам гостей без дословного пересказа их будущих слов.",
        "Удерживайте внимание слушателя через интригующие переходы и сюжетные крючки между главами."
],
      semanticType: "structural_directive",
      tags: ["writing","podcast","audio-storytelling","scriptwriting","media"],
    }),
  },

  "micro-storytelling-anecdote-hook": {
    id: "micro-storytelling-anecdote-hook",
    name: "MicroStorytellingAnecdoteHookSkill",
    displayName: "60-Second Business Storytelling & Opening Anecdote Hook",
    categoryId: "writing",
    description: "Opens articles, keynotes, and sales meetings with captivating 60-second micro-stories featuring a relatable character, a sudden stakes twist, and a profound lesson.",
    tags: ["writing","storytelling","anecdote","hooks","engagement"],
    transform: createStandardSkillTransform({
      sectionName: "60-Second Micro-Story Hook Protocol",
      ruSectionName: "Протокол 60-секундной бизнес-истории и открывающего хука (Micro-Storytelling)",
      instructions: [
        "Establish Character & Setting in 1 sentence: Introduce a relatable protagonist facing a concrete dilemma.",
        "Introduce the Conflict & Twist: Describe a sudden turning point where standard expectations collapsed.",
        "Deliver the Transformation: Reveal the breakthrough insight that resolved the crisis.",
        "Bridge Seamlessly to Core Topic: Connect the story moral directly to the business agenda."
],
      ruInstructions: [
        "Герой и место действия: Введите главного героя и его исходную рабочую ситуацию в первом предложении.",
        "Конфликт и поворот: Опишите внезапный кризисный момент, когда привычный план полностью провалился.",
        "Трансформация: Покажите ключевое озарение и нестандартное решение, позволившее преодолеть трудность.",
        "Бесшовный переход: Свяжите вывод истории напрямую с главной темой сегодняшней презентации или статьи."
],
      semanticType: "process_directive",
      tags: ["writing","storytelling","anecdote","hooks","engagement"],
    }),
  },

  "brand-tone-of-voice-matrix-delineator": {
    id: "brand-tone-of-voice-matrix-delineator",
    name: "BrandToneOfVoiceMatrixDelineatorSkill",
    displayName: "Brand Tone-of-Voice Behavioral 4-Quadrant Guide",
    categoryId: "writing",
    description: "Defines actionable brand voice rules across 4 key spectrums: Funny vs Serious, Formal vs Casual, Respectful vs Irreverent, Enthusiastic vs Matter-of-Fact.",
    tags: ["writing","tone-of-voice","branding","style-guide","copywriting"],
    transform: createStandardSkillTransform({
      sectionName: "Brand Tone-of-Voice Matrix Protocol",
      ruSectionName: "Спецификация матрицы тональности бренда (Brand Tone-of-Voice Guide)",
      instructions: [
        "Plot brand voice along 4 core dimensions: Formality, Humor, Irreverence, and Energy.",
        "For each dimension, provide explicit \"We are X, but never Y\" behavioral guidelines.",
        "Include side-by-side \"Say This\" vs \"Never Say That\" copywriting examples across email, web, and error messages.",
        "Ensure consistent voice regardless of which internal team author generates customer-facing copy."
],
      ruInstructions: [
        "Калибруйте голос бренда по 4 шкалам: Формальность, Юмор, Смелость и Энергичность.",
        "Для каждого параметра задавайте четкие правила: \"Мы X, но никогда не Y\" (например, \"Мы дружелюбны, но не фамильярны\").",
        "Приводите парные примеры \"Как пишем\" и \"Как не пишем\" для интерфейса, рассылок и сообщений об ошибках.",
        "Обеспечивайте монолитное единство тональности бренда независимо от того, кто из авторов пишет текст."
],
      semanticType: "process_directive",
      tags: ["writing","tone-of-voice","branding","style-guide","copywriting"],
    }),
  },

  "comparative-product-matrix-tear-down": {
    id: "comparative-product-matrix-tear-down",
    name: "ComparativeProductMatrixTearDownSkill",
    displayName: "Objective Head-to-Head Product Comparison & Teardown",
    categoryId: "writing",
    description: "Writes objective, balanced competitive comparison guides that earn buyer trust by openly detailing where competitors excel while proving unique product differentiation.",
    tags: ["writing","product-comparison","competitive-analysis","seo","trust-building"],
    transform: createStandardSkillTransform({
      sectionName: "Competitive Product Teardown Protocol",
      ruSectionName: "Протокол сравнительного обзора продуктов и конкурентного анализа (Product Teardown)",
      instructions: [
        "Maintain an honest, authoritative tone: explicitly acknowledge competitor genuine strengths and ideal customer profiles.",
        "Structure comparisons around core evaluation pillars: Architecture, Developer Experience, Security, Total Cost.",
        "Highlight your unique architectural differentiator without resorting to cheap mudslinging or false claims.",
        "Conclude with clear buyer recommendations matching specific company sizes and use cases."
],
      ruInstructions: [
        "Сохраняйте честный экспертный тон: открыто признавайте реальные сильные стороны конкурентов и их ниши.",
        "Структурируйте сравнение по ключевым осям: Архитектура, Опыт разработчика, Безопасность, Совокупная стоимость.",
        "Доказывайте свое ключевое архитектурное преимущество фактами без голословной критики соперников.",
        "Завершайте обзор понятными рекомендациями: кому лучше подойдет продукт А, а кому — продукт Б."
],
      semanticType: "process_directive",
      tags: ["writing","product-comparison","competitive-analysis","seo","trust-building"],
    }),
  },

  "salary-negotiation-counter-offer-script": {
    id: "salary-negotiation-counter-offer-script",
    name: "SalaryNegotiationCounterOfferScriptSkill",
    displayName: "Executive Compensation Counter-Offer Email Script",
    categoryId: "writing",
    description: "Drafts highly professional, collaborative compensation counter-offers balancing base salary, equity, signing bonus, and performance milestones.",
    tags: ["writing","negotiation","compensation","executive-careers","scripts"],
    transform: createStandardSkillTransform({
      sectionName: "Compensation Negotiation Script Protocol",
      ruSectionName: "Протокол составления предложений по компенсационному пакету (Salary Negotiation)",
      instructions: [
        "Express genuine enthusiasm for the role, the team, and the shared corporate vision.",
        "Anchor counter-proposals to objective market benchmarks (levels.fyi, Radford data) and demonstrated value creation.",
        "Present flexible multi-variable trade-offs: balance base salary, equity vesting schedules, and signing incentives.",
        "Maintain a collaborative partnership tone that strengthens interpersonal rapport with hiring executives."
],
      ruInstructions: [
        "Выразите искреннюю увлеченность позицией, командой и стратегическими целями компании.",
        "Обосновывайте встречные предложения объективными рыночными бенчмарками и подтвержденным опытом создания ценности.",
        "Предлагайте гибкие варианты компромисса: балансируйте оклад, опционы, бонус за подписание и KPI.",
        "Сохраняйте конструктивный партнерский тон, укрепляющий взаимное уважение с будущим руководством."
],
      semanticType: "process_directive",
      tags: ["writing","negotiation","compensation","executive-careers","scripts"],
    }),
  },

  "annual-letter-to-shareholders-bezos": {
    id: "annual-letter-to-shareholders-bezos",
    name: "AnnualLetterToShareholdersBezosSkill",
    displayName: "Jeff Bezos Style Annual Letter to Shareholders",
    categoryId: "writing",
    description: "Composes long-horizon annual shareholder letters inspired by Jeff Bezos classic Amazon letters: Day 1 mindset, customer obsession, high-velocity decision making.",
    tags: ["writing","shareholder-letter","bezos","leadership","long-term-thinking"],
    transform: createStandardSkillTransform({
      sectionName: "Shareholder Letter & Day-1 Protocol",
      ruSectionName: "Протокол годового письма акционерам в стиле Джеффа Безоса (Day 1 Letter)",
      instructions: [
        "Emphasize long-term value creation over short-term quarterly financial optics.",
        "Reiterate the \"Day 1\" philosophy: customer obsession, eagerness to experiment, and resistance to corporate bureaucracy.",
        "Discuss big failed bets with radical transparency as the necessary cost of breakthrough innovation.",
        "Reinforce operational rigor, free cash flow generation, and durable competitive moats."
],
      ruInstructions: [
        "Ставьте долгосрочное создание фундаментальной ценности выше сиюминутных квартальных отчетов.",
        "Транслируйте философию \"Day 1\": одержимость клиентами, смелость экспериментов и отказ от бюрократии.",
        "Открыто рассказывайте о неудавшихся экспериментах как о неизбежной цене прорывных инноваций.",
        "Подчеркивайте фокус на операционной эффективности, генерации свободного денежного потока и защитных рвах."
],
      semanticType: "process_directive",
      tags: ["writing","shareholder-letter","bezos","leadership","long-term-thinking"],
    }),
  },

  "pitch-deck-10-slide-narrative-arc": {
    id: "pitch-deck-10-slide-narrative-arc",
    name: "PitchDeck10SlideNarrativeArcSkill",
    displayName: "Sequoia 10-Slide Seed Pitch Deck Narrative Script",
    categoryId: "writing",
    description: "Scripts the narrative arc for a venture capital pitch deck: Problem, Solution, Why Now, Market Size, Competition, Product, Business Model, Team, Financials, The Ask.",
    tags: ["writing","pitch-deck","sequoia","venture-capital","fundraising","startups"],
    transform: createStandardSkillTransform({
      sectionName: "Venture Pitch Deck Narrative Protocol",
      ruSectionName: "Спецификация структуры венчурного питч-дека (Sequoia 10-Slide Pitch)",
      instructions: [
        "Structure slides strictly across the 10 canonical beats: Problem, Solution, Why Now, Market Size, Product, Traction, Team, Competition, Business Model, The Ask.",
        "Limit each slide to 1 single overarching core takeaway stated as a clear declarative header.",
        "Highlight the \"Why Now\" catalyst (technological shift, regulatory change, behavioral inflection).",
        "Articulate an undeniable unfair advantage and clear path to $100M+ ARR."
],
      ruInstructions: [
        "Выстраивайте структуру строго по 10 каноническим слайдам: Проблема, Решение, Почему сейчас, Рынок, Продукт, Трекшн, Команда, Конкуренты, Бизнес-модель, Запрос раунда.",
        "Ограничивайте каждый слайд одной главной мыслью, вынесенной в утвердительный заголовок.",
        "Обязательно раскрывайте фактор \"Почему сейчас\" (технологический сдвиг, регуляторные реформы, смена привычек).",
        "Показывайте убедительное конкурентное преимущество и понятный путь масштабирования до $100M+ выручки."
],
      semanticType: "process_directive",
      tags: ["writing","pitch-deck","sequoia","venture-capital","fundraising","startups"],
    }),
  },

  "eulogy-tribute-commemorative-address": {
    id: "eulogy-tribute-commemorative-address",
    name: "EulogyTributeCommemorativeAddressSkill",
    displayName: "Commemorative Tribute & Memorial Address Architecture",
    categoryId: "writing",
    description: "Composes heartfelt, dignified commemorative tributes and eulogies celebrating human legacy, enduring values, and humorous, tender personal memories.",
    tags: ["writing","eulogy","tribute","commemorative","emotional-depth"],
    transform: createStandardSkillTransform({
      sectionName: "Commemorative Tribute Protocol",
      ruSectionName: "Протокол памятной речи и мемориального трибьюта (Eulogy & Tribute)",
      instructions: [
        "Balance profound reverence and sorrow with joyful celebration of the individual vibrant life and character.",
        "Share specific, sensory vignettes illustrating their kindness, idiosyncrasies, and enduring principles.",
        "Articulate how their legacy and values continue to live on in their community and loved ones.",
        "Deliver comfort and uplifting closure to grieving listeners."
],
      ruInstructions: [
        "Сочетайте глубокое уважение и скорбь со светлой памятью и празднованием яркой жизни человека.",
        "Рассказывайте живые трогательные истории, раскрывающие характер, доброту и принципы личности.",
        "Покажите, как ценности и наследие ушедшего продолжают жить в сердцах близких и коллег.",
        "Дарите утешение, тепло и чувство светлой благодарности всем присутствующим."
],
      semanticType: "process_directive",
      tags: ["writing","eulogy","tribute","commemorative","emotional-depth"],
    }),
  },

  "legal-plain-english-contract-summary": {
    id: "legal-plain-english-contract-summary",
    name: "LegalPlainEnglishContractSummarySkill",
    displayName: "Plain-English Plain-Language Contract Terms Summary",
    categoryId: "writing",
    description: "Translates dense legalese contracts into crystal-clear plain-English summaries outlining rights, obligations, indemnities, and termination triggers.",
    tags: ["writing","plain-english","legal-writing","contract-summary","clarity"],
    transform: createStandardSkillTransform({
      sectionName: "Plain-Language Contract Summary Protocol",
      ruSectionName: "Протокол перевода договоров на понятный язык (Plain-English Legal Summary)",
      instructions: [
        "Translate archaic legalese (e.g. \"heretofore\", \"indemnify and hold harmless\") into crisp modern conversational prose.",
        "Organize summary into: What You Get, What You Must Do, What It Costs, How It Ends, and What Happens If Things Go Wrong.",
        "Flag hidden risk traps: automatic renewals, unilateral modification rights, uncapped liabilities.",
        "Maintain 100% legal accuracy without ambiguity."
],
      ruInstructions: [
        "Переводите архаичный юридический жаргон на ясный современный человеческий язык.",
        "Структурируйте выжимку: Что вы получаете, Что обязаны делать, Сколько это стоит, Как расторгнуть и Кто за что отвечает.",
        "Выделяйте скрытые ловушки: автопродление подписки, право одностороннего изменения цен, неограниченную ответственность.",
        "Гарантируйте точность передачи юридического смысла условий без искажений."
],
      semanticType: "process_directive",
      tags: ["writing","plain-english","legal-writing","contract-summary","clarity"],
    }),
  },

  "video-script-hook-retention-storyboard": {
    id: "video-script-hook-retention-storyboard",
    name: "VideoScriptHookRetentionStoryboardSkill",
    displayName: "YouTube Video 8-Second Hook & Retention Storyboard",
    categoryId: "writing",
    description: "Scripts dynamic online video content optimized for viewer retention: 8-second visual hook, fast-paced pacing, pattern interrupts, and payoff moments.",
    tags: ["writing","video-scripting","youtube","content-creation","storyboarding"],
    transform: createStandardSkillTransform({
      sectionName: "Video Retention Scripting Protocol",
      ruSectionName: "Спецификация сценария видео с удержанием внимания (YouTube Retention Script)",
      instructions: [
        "First 8 Seconds: Hook the viewer visually and narratively with an immediate stakes promise; zero logo animations or channel intros.",
        "Format as a two-column storyboard: Left column for Visual/B-Roll cues, Right column for Spoken Audio.",
        "Insert intentional pattern interrupts (graphic pops, sound effects, perspective cuts) every 30 seconds.",
        "Deliver on the promised video premise completely before offering an end-screen CTA."
],
      ruInstructions: [
        "Первые 8 секунд: Захватите зрителя визуальным действием и сильным обещанием; исключите заставки и долгие приветствия.",
        "Оформляйте сценарий в две колонки: слева визуальный ряд (B-Roll, графика), справа дикторский текст и эмоции.",
        "Вставляйте смену планов и звуковые акценты (Pattern Interrupts) каждые 30 секунд для предотвращения закрытия ролика.",
        "Полностью раскрывайте обещанную тему видео до перехода к финальному призыву подписаться."
],
      semanticType: "structural_directive",
      tags: ["writing","video-scripting","youtube","content-creation","storyboarding"],
    }),
  },

  "whistleblower-internal-escalation-dossier": {
    id: "whistleblower-internal-escalation-dossier",
    name: "WhistleblowerInternalEscalationDossierSkill",
    displayName: "Structured Whistleblower & Compliance Escalation Memo",
    categoryId: "writing",
    description: "Formats serious regulatory and ethics escalations into legally defensible compliance dossiers: Factual Allegations, Evidence Cross-References, and Regulatory Impact.",
    tags: ["writing","whistleblower","compliance","investigation","legal-dossier"],
    transform: createStandardSkillTransform({
      sectionName: "Compliance Escalation Dossier Protocol",
      ruSectionName: "Спецификация отчета о нарушениях и комплаенс-эскалации (Compliance Dossier)",
      instructions: [
        "Maintain an objective, dispassionate tone strictly grounded in verifiable empirical evidence.",
        "Structure sections: Chronological Incident Timeline, Specific Statutory Violations, Corroborating Documentation.",
        "Avoid speculative emotional accusations; present exact document hashes, timestamps, and witness records.",
        "State the immediate organizational remediation steps requested to cure the non-compliance."
],
      ruInstructions: [
        "Используйте сдержанный, беспристрастный и юридически выверенный тон, опирающийся только на факты.",
        "Структурируйте отчет: Хронологический таймлайн событий, Конкретные нарушенные нормы закона, Перечень доказательств.",
        "Исключайте эмоциональные домыслы; приводите точные даты, выгрузки логов, номера документов и свидетельства.",
        "Формулируйте необходимые неотложные меры по устранению нарушений и защите компании от санкций."
],
      semanticType: "process_directive",
      tags: ["writing","whistleblower","compliance","investigation","legal-dossier"],
    }),
  },
  "writing-pyramid-principle-barbara-minto": {
    id: "writing-pyramid-principle-barbara-minto",
    name: "WritingPyramidPrincipleBarbaraMintoSkill",
    displayName: "Barbara Minto Pyramid Principle & Executive Framing",
    categoryId: "writing",
    description: "Structures business and technical writing with core conclusions at the top, supported by deductive logic clusters.",
    tags: ["writing","minto-pyramid","executive-communication","clarity","structure"],
    transform: createStandardSkillTransform({
      sectionName: "Barbara Minto Pyramid Principle Structure",
      ruSectionName: "Принцип пирамиды Минто: Структурирование деловых текстов от вывода к деталям",
      instructions: [
        "Place the single overarching governing thought (Core Conclusion) at the apex of the document.",
        "Group supporting arguments into mutually exclusive, collectively exhaustive (MECE) horizontal tiers.",
        "Ensure every grouping answers the logical question raised by the summary point above it."
],
      ruInstructions: [
        "Сформулируйте главную управляющую мысль в самом начале документа.",
        "Сгруппируйте аргументы в логические блоки по принципу MECE.",
        "Обеспечьте строгую дедуктивную связь: каждый нижний уровень подтверждает тезис верхнего."
],
      semanticType: "process_directive",
      tags: ["writing","minto-pyramid","executive-communication","clarity","structure"],
    }),
  },

  "writing-scqa-business-storytelling-framework": {
    id: "writing-scqa-business-storytelling-framework",
    name: "WritingScqaBusinessStorytellingFrameworkSkill",
    displayName: "McKinsey SCQA (Situation, Complication, Question, Answer)",
    categoryId: "writing",
    description: "Hooks stakeholders by establishing familiar Context, surfacing a critical Complication, raising the core Question, and Answering.",
    tags: ["writing","scqa","mckinsey","storytelling","persuasion","proposals"],
    transform: createStandardSkillTransform({
      sectionName: "McKinsey SCQA Narrative Framework",
      ruSectionName: "Фреймворк убеждающего повествования SCQA (Ситуация, Осложнение, Вопрос, Ответ)",
      instructions: [
        "Situation: State undisputed baseline background context that everyone agrees with.",
        "Complication: Introduce the catalyst shift, emerging threat, or breakdown that disrupts the status quo.",
        "Question: Frame the pivotal question that arises directly from the complication.",
        "Answer: Deliver the decisive solution and action plan."
],
      ruInstructions: [
        "Ситуация (Situation): Опишите общепризнанный контекст, не вызывающий споров.",
        "Осложнение (Complication): Покажите возникшую проблему или угрозу, ломающую статус-кво.",
        "Вопрос (Question): Сформулируйте главный вызов, требующий решения.",
        "Ответ (Answer): Предложите убедительное решение и план действий."
],
      semanticType: "process_directive",
      tags: ["writing","scqa","mckinsey","storytelling","persuasion","proposals"],
    }),
  },

  "writing-plain-language-flesch-kincaid-grade-8": {
    id: "writing-plain-language-flesch-kincaid-grade-8",
    name: "WritingPlainLanguageFleschKincaidGrade8Skill",
    displayName: "Plain Language & Flesch-Kincaid Grade 8 Readability",
    categoryId: "writing",
    description: "Simplifies complex technical prose to achieve a Flesch-Kincaid Grade 8 reading level without diluting accuracy.",
    tags: ["writing","plain-language","readability","flesch-kincaid","clarity"],
    transform: createStandardSkillTransform({
      sectionName: "Plain Language & High-Readability Standards",
      ruSectionName: "Стандарт ясного языка (Plain Language) и индекс удобочитаемости Флеша",
      instructions: [
        "Keep average sentence length under 18 words; use active voice for >90% of verbs.",
        "Replace multi-syllable bureaucratic jargon with clear, everyday equivalents.",
        "Use descriptive subheadings, bullet lists, and visual white space to enhance scannability."
],
      ruInstructions: [
        "Ограничьте среднюю длину предложений до 15–18 слов; используйте активный залог.",
        "Замените сложный канцелярит и бюрократические штампы на живой понятный язык.",
        "Разбивайте текст на короткие абзацы со списками и акцентными подзаголовками."
],
      semanticType: "process_directive",
      tags: ["writing","plain-language","readability","flesch-kincaid","clarity"],
    }),
  },

  "writing-technical-whitepaper-ieee-standard": {
    id: "writing-technical-whitepaper-ieee-standard",
    name: "WritingTechnicalWhitepaperIeeeStandardSkill",
    displayName: "IEEE Technical Whitepaper & Architectural Report Standard",
    categoryId: "writing",
    description: "Structures formal engineering whitepapers with Abstract, Problem Statement, Solution, Benchmarks, and References.",
    tags: ["writing","whitepaper","ieee","technical-report","engineering-docs"],
    transform: createStandardSkillTransform({
      sectionName: "IEEE Technical Whitepaper Standards",
      ruSectionName: "Стандарт инженерного технического отчета и Whitepaper (IEEE)",
      instructions: [
        "Structure document: Abstract -> Introduction -> System Architecture -> Empirical Evaluation -> Conclusion.",
        "Include quantitative benchmark graphs and tables with statistical error bars.",
        "Format academic references in standard IEEE bracketed citation format (`[1]`, `[2]`)."
],
      ruInstructions: [
        "Оформляйте документ по структуре: Аннотация -> Введение -> Архитектура -> Эксперименты -> Выводы.",
        "Сопровождайте выводы таблицами измерений и графиками сравнительных тестов.",
        "Оформляйте список литературы и ссылок по академическому стандарту IEEE."
],
      semanticType: "process_directive",
      tags: ["writing","whitepaper","ieee","technical-report","engineering-docs"],
    }),
  },

  "writing-investor-pitch-deck-narrative-sequoia": {
    id: "writing-investor-pitch-deck-narrative-sequoia",
    name: "WritingInvestorPitchDeckNarrativeSequoiaSkill",
    displayName: "Sequoia Capital 10-Slide Investor Narrative Framework",
    categoryId: "writing",
    description: "Structures venture capital pitch decks: Problem, Solution, Why Now, Market Size, Product, Traction, Team.",
    tags: ["writing","pitch-deck","sequoia","venture-capital","fundraising","startups"],
    transform: createStandardSkillTransform({
      sectionName: "Sequoia Capital 10-Slide Narrative Blueprint",
      ruSectionName: "Фреймворк венчурной презентации Sequoia Capital (10 слайдов)",
      instructions: [
        "Slide 1-3: Company Purpose -> Problem (pain point) -> Solution (value proposition).",
        "Slide 4-6: Why Now (market inflection) -> Market Potential (TAM/SAM/SOM) -> Competition (defensibility).",
        "Slide 7-10: Product Architecture -> Business Model -> Team -> Financial Vision & Ask."
],
      ruInstructions: [
        "Слайды 1–3: Миссия -> Острая боль клиента -> Наше решение и ценность.",
        "Слайды 4–6: Почему именно сейчас -> Объем рынка (TAM/SAM) -> Конкурентные барьеры.",
        "Слайды 7–10: Архитектура продукта -> Юнит-экономика -> Команда -> Запрашиваемый раунд."
],
      semanticType: "process_directive",
      tags: ["writing","pitch-deck","sequoia","venture-capital","fundraising","startups"],
    }),
  },
  "writing-ap-stylebook-journalistic-clarity": {
    id: "writing-ap-stylebook-journalistic-clarity",
    name: "WritingApStylebookJournalisticClaritySkill",
    displayName: "Associated Press (AP) Stylebook & Journalistic Neutrality",
    categoryId: "writing",
    description: "Applies standard AP Stylebook conventions for capitalization, numbers, attribution, and neutral reporting tone.",
    tags: ["writing","ap-style","journalism","news-writing","clarity"],
    transform: createStandardSkillTransform({
      sectionName: "Associated Press (AP) Stylebook & Neutrality Standards",
      ruSectionName: "Стандарты новостной журналистики AP Stylebook и нейтральный тон",
      instructions: [
        "Spell out whole numbers under 10; use numerals for 10 and above.",
        "Attribute controversial statements clearly to explicit named sources ('according to...').",
        "Maintain neutral, balanced, third-person journalistic objectivity."
],
      ruInstructions: [
        "Пишите числа прописью до 10, цифрами от 10 и выше по правилам AP Style.",
        "Четко атрибутируйте факты источникам («согласно данным регулятора» вместо анонимных утверждений).",
        "Сохраняйте нейтральный, взвешенный тон от третьего лица."
],
      semanticType: "process_directive",
      tags: ["writing","ap-style","journalism","news-writing","clarity"],
    }),
  },

  "writing-technical-release-notes-apple-style": {
    id: "writing-technical-release-notes-apple-style",
    name: "WritingTechnicalReleaseNotesAppleStyleSkill",
    displayName: "Apple-Style High-Polish Release Notes & User Delight",
    categoryId: "writing",
    description: "Crafts engaging, user-centric product update notes that highlight benefits, workflows, and quality improvements.",
    tags: ["writing","release-notes","product-marketing","copywriting","cx"],
    transform: createStandardSkillTransform({
      sectionName: "High-Polish Product Release Notes Standards",
      ruSectionName: "Стандарт вдохновляющих продуктовых Release Notes (Apple Style)",
      instructions: [
        "Lead with the primary user superpower or workflow acceleration delivered by the release.",
        "Explain technical improvements in terms of tangible customer experience (speed, battery, responsiveness).",
        "Maintain an inspiring, conversational, and precise tone."
],
      ruInstructions: [
        "Начинайте с описания новой суперсилы или удобства, которое получает пользователь.",
        "Описывайте технические оптимизации через ощутимый пользовательский опыт (скорость, плавность, надежность).",
        "Сохраняйте вдохновляющий, дружелюбный и аккуратный стиль повествования."
],
      semanticType: "process_directive",
      tags: ["writing","release-notes","product-marketing","copywriting","cx"],
    }),
  },

  "writing-amazon-six-page-narrative-memo": {
    id: "writing-amazon-six-page-narrative-memo",
    name: "WritingAmazonSixPageNarrativeMemoSkill",
    displayName: "Jeff Bezos Amazon 6-Page Narrative Memo Framework",
    categoryId: "writing",
    description: "Structures deep strategic proposals into Amazon's 6-page format: Context, Tenets, Data, Strategic Decisions, FAQs.",
    tags: ["writing","amazon-memo","bezos","strategic-proposal","narrative"],
    transform: createStandardSkillTransform({
      sectionName: "Amazon 6-Page Strategic Narrative Memo Blueprint",
      ruSectionName: "Фреймворк 6-страничного меморандума Amazon (Джефф Безос: нарратив вместо слайдов)",
      instructions: [
        "Structure proposal as a continuous, rigorous written narrative (no bulleted PowerPoint decks).",
        "Include: 1. Introduction & Goals, 2. Tenets, 3. State of the Business, 4. Strategic Proposals, 5. Appendices & FAQs.",
        "Demand high-density factual arguments backed by unit metrics."
],
      ruInstructions: [
        "Оформляйте предложение в виде связного глубокого текста вместо слайдов с тезисами.",
        "Структура: Введение, Базовые принципы (Tenets), Анализ текущей ситуации, Стратегическое решение, FAQ.",
        "Приводите жесткие факты и финансово-операционные расчеты в приложениях."
],
      semanticType: "process_directive",
      tags: ["writing","amazon-memo","bezos","strategic-proposal","narrative"],
    }),
  },

  "writing-crisis-communications-apology-pr": {
    id: "writing-crisis-communications-apology-pr",
    name: "WritingCrisisCommunicationsApologyPrSkill",
    displayName: "Corporate Crisis Communications & Authentic Accountability",
    categoryId: "writing",
    description: "Drafts transparent, accountable crisis statements following the 5Rs: Recognition, Regret, Responsibility, Remedy, Restitution.",
    tags: ["writing","crisis-comms","pr","accountability","incident-management"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Crisis Communication & Accountability Blueprint",
      ruSectionName: "Антикризисные коммуникации и публичные заявления (Принцип 5R)",
      instructions: [
        "Apply the 5Rs framework: Recognition of impact, sincere Regret, taking clear Responsibility, immediate Remedy, long-term Restitution.",
        "Eliminate corporate jargon, passive evasion ('mistakes were made'), and legal deflections.",
        "Detail concrete preventive technical steps already taken to guarantee the issue never recurs."
],
      ruInstructions: [
        "Используйте модель 5R: Признание масштаба проблемы, Сожаление, Ответственность, Меры исправления, Гарантии.",
        "Исключите канцелярские отговорки и уклончивые формулировки в страдательном залоге.",
        "Опишите конкретные технические меры, уже предпринятые для исключения повторения сбоя."
],
      semanticType: "process_directive",
      tags: ["writing","crisis-comms","pr","accountability","incident-management"],
    }),
  },

  "writing-high-converting-cold-email-b2b": {
    id: "writing-high-converting-cold-email-b2b",
    name: "WritingHighConvertingColdEmailB2bSkill",
    displayName: "High-Converting B2B Outbound Email (Pattern Interrupt & Low-Friction CTA)",
    categoryId: "writing",
    description: "Crafts ultra-concise B2B cold emails (<75 words) with sharp pattern interrupts, specific social proof, and low-friction CTAs.",
    tags: ["writing","cold-email","sales","b2b","copywriting","outbound"],
    transform: createStandardSkillTransform({
      sectionName: "High-Converting B2B Outbound Email Standard",
      ruSectionName: "Стандарт результативных B2B холодных писем (до 75 слов, низкий порог действия)",
      instructions: [
        "Keep total email body under 75 words; maximize mobile screen readability.",
        "Line 1 (Pattern Interrupt): Reference a specific recent trigger event or relevant pain point.",
        "Line 2 (Proof & Value): Share a 1-sentence concrete metric achieved for a direct peer.",
        "Line 3 (Low-Friction CTA): Ask for interest rather than booking time (e.g. 'Open to checking a 2-min video walkthrough?')."
],
      ruInstructions: [
        "Ограничьте объем письма до 60–75 слов для мгновенного чтения с экрана смартфона.",
        "Первая строка: персональный контекст или острая проблема без шаблонных приветствий.",
        "Вторая строка: конкретный измеримый кейс решения для схожей компании.",
        "Призыв к действию (CTA): вопрос на интерес без давления немедленно назначить звонок."
],
      semanticType: "process_directive",
      tags: ["writing","cold-email","sales","b2b","copywriting","outbound"],
    }),
  },
  "writing-y-combinator-application-memo": {
    id: "writing-y-combinator-application-memo",
    name: "WritingYCombinatorApplicationMemoSkill",
    displayName: "Y Combinator (YC) Application & Pitch Deck Precision",
    categoryId: "writing",
    description: "Writes ultra-dense, jargon-free startup pitches and YC application answers focusing on traction, insight, and problem clarity.",
    tags: ["writing","y-combinator","startup","pitch","clarity","investor"],
    transform: createStandardSkillTransform({
      sectionName: "Y Combinator High-Density Application Standard",
      ruSectionName: "Стандарт ответов на заявку Y Combinator (YC) и питчинга без воды",
      instructions: [
        "Explain what the company makes in plain English in the very first sentence (no marketing jargon or buzzwords).",
        "Highlight unfair advantages, concrete traction metrics, and unique founder domain insight.",
        "Be radically concise and quantitatively specific."
],
      ruInstructions: [
        "Объясняйте суть продукта простыми словами в первом же предложении без рекламного пафоса.",
        "Указывайте конкретные цифры динамики (MoM growth), метрики удержания и ключевой инсайт основателей.",
        "Пишите максимально лаконично и емко, избегая абстрактных обещаний."
],
      semanticType: "process_directive",
      tags: ["writing","y-combinator","startup","pitch","clarity","investor"],
    }),
  },

  "writing-sec-form-10k-md-and-a-financial-filing": {
    id: "writing-sec-form-10k-md-and-a-financial-filing",
    name: "WritingSecForm10kMdAndAFinancialFilingSkill",
    displayName: "SEC Form 10-K Management's Discussion & Analysis (MD&A)",
    categoryId: "writing",
    description: "Structures public company financial commentary according to SEC MD&A disclosure guidelines and GAAP reconciliations.",
    tags: ["writing","sec-filing","mda","finance","compliance","investor-relations"],
    transform: createStandardSkillTransform({
      sectionName: "SEC MD&A Financial Commentary Standards",
      ruSectionName: "Стандарты финансового отчета SEC Form 10-K (Раздел MD&A)",
      instructions: [
        "Analyze year-over-year revenue, gross margin, and operating cash flow drivers with disaggregated volume/price breakdowns.",
        "Detail liquidity requirements, debt covenants, and material known uncertainties.",
        "Reconcile non-GAAP operational metrics (Adjusted EBITDA, Free Cash Flow) strictly back to GAAP line items."
],
      ruInstructions: [
        "Анализируйте динамику выручки и маржинальности с разделением факторов цены и физического объема продаж.",
        "Описывайте профиль ликвидности, долговые ковенанты и материальные риски бизнеса.",
        "Сверяйте показатели Non-GAAP (Adjusted EBITDA) с официальной отчетностью GAAP в специальных таблицах сверки."
],
      semanticType: "process_directive",
      tags: ["writing","sec-filing","mda","finance","compliance","investor-relations"],
    }),
  },

  "writing-scientific-abstract-nature-format": {
    id: "writing-scientific-abstract-nature-format",
    name: "WritingScientificAbstractNatureFormatSkill",
    displayName: "Nature/Science Peer-Reviewed Journal Abstract Structure",
    categoryId: "writing",
    description: "Composes high-impact scientific paper abstracts following Nature's strict 5-part structure: Background, Problem, Discovery, Mechanism, Significance.",
    tags: ["writing","scientific-writing","academic","nature","abstract","research"],
    transform: createStandardSkillTransform({
      sectionName: "Nature Peer-Reviewed Journal Abstract Framework",
      ruSectionName: "Структура научного абстракта по стандартам Nature / Science (5 предложений)",
      instructions: [
        "Sentence 1-2: Broad background accessible to general scientific audience, followed by specific gap in knowledge.",
        "Sentence 3: The core experimental discovery or empirical finding introduced by this study.",
        "Sentence 4-5: Underlying causal mechanism and broader paradigm-shifting implications for the field."
],
      ruInstructions: [
        "Предложения 1–2: Широкий контекст проблемы, понятный любому ученому, и нерешенный вопрос.",
        "Предложение 3: Главное экспериментальное открытие или доказанный результат данного исследования.",
        "Предложения 4–5: Физический/биологический механизм явления и влияние на развитие научной дисциплины."
],
      semanticType: "process_directive",
      tags: ["writing","scientific-writing","academic","nature","abstract","research"],
    }),
  },

  "writing-stripe-press-editorial-craft": {
    id: "writing-stripe-press-editorial-craft",
    name: "WritingStripePressEditorialCraftSkill",
    displayName: "Stripe Press Intellectual Long-Form Editorial Standards",
    categoryId: "writing",
    description: "Crafts elegant, high-intellect essays exploring technological progress, economic history, and scientific frontier ideas.",
    tags: ["writing","essay","stripe-press","intellectual","editorial","prose"],
    transform: createStandardSkillTransform({
      sectionName: "Stripe Press Long-Form Editorial Prose Standards",
      ruSectionName: "Интеллектуальная эссеистика высокого стиля (в традициях Stripe Press)",
      instructions: [
        "Blend rigorous economic history, engineering depth, and philosophical inquiry into compelling prose.",
        "Use vivid historical anecdotes to ground abstract institutional or technological shifts.",
        "Prioritize literary cadence, precision of metaphors, and optimistic technological progressivism."
],
      ruInstructions: [
        "Сочетайте историко-экономическую строгость, инженерную глубину и литературную элегантность слога.",
        "Используйте яркие исторические прецеденты для иллюстрации абстрактных технологических явлений.",
        "Сохраняйте ритмичность прозы, точность метафор и дух созидательного оптимизма."
],
      semanticType: "process_directive",
      tags: ["writing","essay","stripe-press","intellectual","editorial","prose"],
    }),
  },

  "writing-executive-speechwriting-keynote-rhetoric": {
    id: "writing-executive-speechwriting-keynote-rhetoric",
    name: "WritingExecutiveSpeechwritingKeynoteRhetoricSkill",
    displayName: "Executive Keynote Speechwriting & Rhetorical Cadence",
    categoryId: "writing",
    description: "Writes charismatic spoken-word keynotes and public speeches using anaphora, triadic phrasing, and emotional arcs.",
    tags: ["writing","speechwriting","keynote","rhetoric","leadership","public-speaking"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Spoken-Word Speechwriting Architecture",
      ruSectionName: "Мастерство спичрайтинга для первых лиц (Риторика, триады, паузы, драматургия)",
      instructions: [
        "Write for the ear, not the eye: short cadence sentences, clear breath markers, and conversational rhythm.",
        "Employ classical rhetorical devices: rule of three (tricolon), anaphora, and contrasting antithesis.",
        "Anchor the narrative arc in a shared tension resolved through an inspiring, unifying vision."
],
      ruInstructions: [
        "Пишите текст для устного произнесения: короткие фразы, естественные паузы для дыхания и разговорный ритм.",
        "Используйте риторические фигуры: правила трех элементов (триады), анафоры и антитезы.",
        "Выстраивайте драматургию от признания общей проблемы к вдохновляющему видению будущего."
],
      semanticType: "process_directive",
      tags: ["writing","speechwriting","keynote","rhetoric","leadership","public-speaking"],
    }),
  },

  "writing-saas-onboarding-email-drip-sequence": {
    id: "writing-saas-onboarding-email-drip-sequence",
    name: "WritingSaasOnboardingEmailDripSequenceSkill",
    displayName: "SaaS Behavioral Onboarding Drip Sequence (Aha-Moment Driven)",
    categoryId: "writing",
    description: "Designs automated email onboarding funnels triggered by user telemetry to guide users rapidly to product activation.",
    tags: ["writing","email-marketing","saas","onboarding","retention","copywriting"],
    transform: createStandardSkillTransform({
      sectionName: "SaaS Behavioral Onboarding Email Standards",
      ruSectionName: "Поведенческая цепочка onboarding-писем для SaaS (Фокус на Aha-Moment)",
      instructions: [
        "Tailor each email to specific user product milestones (e.g. invited first teammate vs created first dashboard).",
        "Keep single focused call-to-action per email with a 60-second video or 3-click workflow guide.",
        "Maintain a helpful, encouraging tone from a named customer success lead."
],
      ruInstructions: [
        "Привязывайте отправку каждого письма к фактическим действиям пользователя в продукте.",
        "Используйте ровно один целевой призыв к действию в каждом письме (быстрый шаг на 2 минуты).",
        "Пишите от лица конкретного специалиста поддержки заботливым и живым языком."
],
      semanticType: "process_directive",
      tags: ["writing","email-marketing","saas","onboarding","retention","copywriting"],
    }),
  },

  "writing-post-mortem-blameless-incident-report": {
    id: "writing-post-mortem-blameless-incident-report",
    name: "WritingPostMortemBlamelessIncidentReportSkill",
    displayName: "Blameless Engineering Post-Mortem & Root Cause Analysis (RCA)",
    categoryId: "writing",
    description: "Documents system outages objectively with precise incident timelines, root causes, contributing factors, and preventative action items.",
    tags: ["writing","post-mortem","incident-report","engineering","devops","rca"],
    transform: createStandardSkillTransform({
      sectionName: "Blameless Post-Mortem Documentation Standards",
      ruSectionName: "Стандарт составления бескомпромиссного постмортема инцидентов (Blameless RCA)",
      instructions: [
        "Maintain absolute blameless culture: focus on systemic guardrail failures, not individual human error.",
        "Construct minute-by-minute timeline from detection (`T0`) to mitigation and recovery.",
        "Commit to concrete, prioritized Action Items (Jira IDs) with assigned owners and hard deadlines."
],
      ruInstructions: [
        "Соблюдайте принцип ненаказуемости (Blameless): анализируйте сбои процессов и защит, а не ошибки людей.",
        "Фиксируйте поминутный таймлайн от момента возникновения сбоя до полного восстановления.",
        "Формируйте список превентивных задач с конкретными ответственными лицами и сроками исполнения."
],
      semanticType: "process_directive",
      tags: ["writing","post-mortem","incident-report","engineering","devops","rca"],
    }),
  },

  "writing-substack-viral-newsletter-craft": {
    id: "writing-substack-viral-newsletter-craft",
    name: "WritingSubstackViralNewsletterCraftSkill",
    displayName: "Substack Long-Form Thought Leadership & Newsletter Architecture",
    categoryId: "writing",
    description: "Structures high-open-rate newsletters featuring magnetic subject lines, visual diagrams, and memorable conceptual frameworks.",
    tags: ["writing","newsletter","substack","content-marketing","thought-leadership"],
    transform: createStandardSkillTransform({
      sectionName: "Thought Leadership Newsletter Architecture",
      ruSectionName: "Архитектура экспертных рассылок и лонгридов для Substack",
      instructions: [
        "Craft dual-layer subject lines: curiosity hook + high-utility payoff.",
        "Structure body with subheadings every 250 words and bespoke conceptual 2x2 matrix diagrams.",
        "Conclude with actionable tactical takeaways and a question inviting community comments."
],
      ruInstructions: [
        "Формулируйте темы писем из двух частей: интригующий крючок + практическая ценность материала.",
        "Разбивайте текст подзаголовками каждые 250–300 слов и структурированными визуальными схемами.",
        "Завершайте выпуск практическими выводами и вопросом для вовлечения подписчиков в комментарии."
],
      semanticType: "process_directive",
      tags: ["writing","newsletter","substack","content-marketing","thought-leadership"],
    }),
  },

  "writing-patent-application-claims-drafting": {
    id: "writing-patent-application-claims-drafting",
    name: "WritingPatentApplicationClaimsDraftingSkill",
    displayName: "Patent Specification & Independent Claims Drafting",
    categoryId: "writing",
    description: "Drafts rigorous utility patent specifications, antecedent basis claims, and detailed embodiment descriptions for USPTO/EPO.",
    tags: ["writing","patent","ip","legal","claims","inventions"],
    transform: createStandardSkillTransform({
      sectionName: "Patent Claims & Specification Drafting Standards",
      ruSectionName: "Составление формулы изобретения и описания патента (USPTO / EPO стандарты)",
      instructions: [
        "Structure independent claims hierarchically with preamble, transitional phrase ('comprising'), and limiting elements.",
        "Maintain strict antecedent basis ('a widget... the said widget') across all dependent claims.",
        "Provide comprehensive alternative embodiments to prevent design-around infringements."
],
      ruInstructions: [
        "Формулируйте независимые пункты формулы с преамбулой, связкой («включающий») и отличительными признаками.",
        "Строго соблюдайте правила грамматической преемственности терминов во всех зависимых пунктах.",
        "Описывайте альтернативные варианты реализации изобретения для защиты от обхода патента."
],
      semanticType: "process_directive",
      tags: ["writing","patent","ip","legal","claims","inventions"],
    }),
  },

  "writing-developer-documentation-api-reference": {
    id: "writing-developer-documentation-api-reference",
    name: "WritingDeveloperDocumentationApiReferenceSkill",
    displayName: "Stripe-Grade Developer API Reference & Interactive Tutorials",
    categoryId: "writing",
    description: "Writes world-class developer documentation with curl/SDK copy-paste code snippets, payload schemas, and error codes.",
    tags: ["writing","api-docs","developer-relations","technical-writing","documentation"],
    transform: createStandardSkillTransform({
      sectionName: "Developer Documentation & API Reference Standards",
      ruSectionName: "Стандарты первоклассной документации API для разработчиков (Stripe-Grade)",
      instructions: [
        "Provide working, copy-pasteable code examples in cURL, TypeScript, and Python for every single endpoint.",
        "Document every possible HTTP status code, error envelope schema, and troubleshooting remedy.",
        "Include realistic JSON response fixtures with populated, plausible field data."
],
      ruInstructions: [
        "Предоставляйте готовые примеры кода для cURL, TypeScript и Python для каждого эндпоинта.",
        "Документируйте все коды HTTP-ошибок, формат ответа об ошибке и конкретные способы их исправления.",
        "Приводите реалистичные примеры JSON-ответов с правдоподобными данными без заглушек `foo/bar`."
],
      semanticType: "process_directive",
      tags: ["writing","api-docs","developer-relations","technical-writing","documentation"],
    }),
  },

  "writing-b2b-case-study-challenge-solution-impact": {
    id: "writing-b2b-case-study-challenge-solution-impact",
    name: "WritingB2bCaseStudyChallengeSolutionImpactSkill",
    displayName: "High-Impact Enterprise B2B Case Study (Challenge-Solution-Metrics)",
    categoryId: "writing",
    description: "Transforms customer success stories into persuasive sales collateral featuring executive quotes and quantitative ROI proof.",
    tags: ["writing","case-study","b2b","sales-enablement","marketing","roi"],
    transform: createStandardSkillTransform({
      sectionName: "Enterprise B2B Customer Case Study Blueprint",
      ruSectionName: "Кейс-стади для корпоративных B2B продаж (Проблема — Решение — Результат в цифрах)",
      instructions: [
        "Lead with a bold executive metric summary banner (e.g., '42% cost reduction in 90 days').",
        "Structure sections: 1. Customer Context, 2. The Bottleneck / Pain, 3. The Implementation Journey, 4. Hard Quantitative ROI.",
        "Incorporate authentic direct quotes from customer VP/Director stakeholders."
],
      ruInstructions: [
        "Размещайте в начале карточку с ключевыми измеримыми результатами (например, «Экономия 42% за 90 дней»).",
        "Структура: 1. Профиль клиента, 2. Исходная проблема, 3. Процесс внедрения, 4. Доказанный ROI в цифрах.",
        "Включайте прямые цитаты топ-менеджеров заказчика с акцентом на стратегическую ценность."
],
      semanticType: "process_directive",
      tags: ["writing","case-study","b2b","sales-enablement","marketing","roi"],
    }),
  },

  "writing-harvard-business-school-case-study": {
    id: "writing-harvard-business-school-case-study",
    name: "WritingHarvardBusinessSchoolCaseStudySkill",
    displayName: "Harvard Business School (HBS) Case Study Dilemma Framework",
    categoryId: "writing",
    description: "Drafts immersive management case studies centered on a pivotal executive decision dilemma with rich exhibits and financial tables.",
    tags: ["writing","hbs","case-study","business-education","management","strategy"],
    transform: createStandardSkillTransform({
      sectionName: "HBS Executive Case Study Structure",
      ruSectionName: "Бизнес-кейс по стандартам Harvard Business School (Управленческая дилемма)",
      instructions: [
        "Open with the protagonist executive facing a critical impending deadline and conflicting strategic choices.",
        "Provide objective historical background, competitive landscape dynamics, and internal corporate tensions without spoon-feeding the answer.",
        "Include detailed financial exhibits and organizational charts in the appendix."
],
      ruInstructions: [
        "Начинайте с момента принятия сложного решения топ-менеджером перед лицом жесткого дедлайна.",
        "Давайте объективный контекст рынка и финансовые данные, оставляя студентам пространство для самостоятельного вывода.",
        "Прилагайте таблицы финансовых показателей и схемы организационной структуры в приложениях."
],
      semanticType: "process_directive",
      tags: ["writing","hbs","case-study","business-education","management","strategy"],
    }),
  },

  "writing-app-store-listing-conversion-aso": {
    id: "writing-app-store-listing-conversion-aso",
    name: "WritingAppStoreListingConversionAsoSkill",
    displayName: "App Store & Google Play Conversion-Optimized Listing (ASO)",
    categoryId: "writing",
    description: "Writes high-converting App Store and Google Play titles, subtitles, keyword fields, and promotional descriptions.",
    tags: ["writing","aso","app-store","mobile-marketing","copywriting"],
    transform: createStandardSkillTransform({
      sectionName: "App Store Optimization (ASO) Listing Standards",
      ruSectionName: "Оптимизация описания мобильных приложений для App Store и Google Play (ASO)",
      instructions: [
        "Optimize the first 3 lines of description before the 'Read More' fold with core value propositions.",
        "Integrate high-intent search keywords naturally into subtitle and bulleted feature highlights.",
        "Incorporate social proof, awards, and tier-1 press mentions in concise bulleted formatting."
],
      ruInstructions: [
        "Фокусируйте первые три строки описания (до кнопки «Еще») на главной пользе для пользователя.",
        "Органично внедряйте ключевые поисковые запросы в подзаголовок и список возможностей.",
        "Добавляйте социальные доказательства: оценки, награды и отзывы авторитетных изданий."
],
      semanticType: "process_directive",
      tags: ["writing","aso","app-store","mobile-marketing","copywriting"],
    }),
  },

  "writing-microcopy-ux-error-messages-empty-states": {
    id: "writing-microcopy-ux-error-messages-empty-states",
    name: "WritingMicrocopyUxErrorMessagesEmptyStatesSkill",
    displayName: "UX Microcopy, Friendly Error Messages & Empty States",
    categoryId: "writing",
    description: "Crafts empathetic, concise, and helpful user interface microcopy for error banners, empty states, and permission modals.",
    tags: ["writing","ux-writing","microcopy","design","product-copy"],
    transform: createStandardSkillTransform({
      sectionName: "UX Microcopy & Interface Content Guidelines",
      ruSectionName: "UX-микрокопирайтинг: тексты ошибок, пустые состояния и подсказки",
      instructions: [
        "Error messages must explain what happened in plain language and provide an immediate 1-click recovery action.",
        "Empty states should inspire action by showing what the screen will look like and offering a primary creation button.",
        "Eliminate blame words ('You entered an invalid password' -> 'Password must be at least 8 characters')."
],
      ruInstructions: [
        "Сообщения об ошибках должны объяснять причину простым языком и давать кнопку мгновенного исправления.",
        "Пустые экраны (Empty States) должны мотивировать на действие и показывать кнопку создания первого объекта.",
        "Исключайте обвинительные формулировки в адрес пользователя."
],
      semanticType: "process_directive",
      tags: ["writing","ux-writing","microcopy","design","product-copy"],
    }),
  },

  "writing-investor-quarterly-shareholder-letter": {
    id: "writing-investor-quarterly-shareholder-letter",
    name: "WritingInvestorQuarterlyShareholderLetterSkill",
    displayName: "Quarterly Shareholder Letter & Transparent Investor Update",
    categoryId: "writing",
    description: "Writes candid, data-driven investor updates covering ARR growth, burn rate, runway, strategic wins, and key asks.",
    tags: ["writing","investor-update","shareholder-letter","startup","finance"],
    transform: createStandardSkillTransform({
      sectionName: "Investor Shareholder Letter Standards",
      ruSectionName: "Ежеквартальное письмо акционерам и инвесторам (Прозрачные метрики и запросы)",
      instructions: [
        "Structure: 1. Executive Summary & Runway, 2. Key Performance Metrics (ARR, CAC, LTV), 3. Product & Go-To-Market Highlights, 4. Lowlights & Roadblocks, 5. Asks.",
        "Be radically candid about what is not working as well as what is accelerating.",
        "Provide specific, actionable asks for intros to enterprise prospects or strategic hires."
],
      ruInstructions: [
        "Структура: 1. Главные итоги и запас ликвидности, 2. Метрики (ARR, CAC, Churn), 3. Победы, 4. Проблемы и вызовы, 5. Запросы помощи.",
        "Пишите честно о трудностях и способах их преодоления — прозрачность укрепляет доверие.",
        "Формулируйте четкие запросы на интро к потенциальным клиентам или кандидатам."
],
      semanticType: "process_directive",
      tags: ["writing","investor-update","shareholder-letter","startup","finance"],
    }),
  },

  "writing-podcast-interview-scripting-host-notes": {
    id: "writing-podcast-interview-scripting-host-notes",
    name: "WritingPodcastInterviewScriptingHostNotesSkill",
    displayName: "Long-Form Podcast Host Interview Script & Provocative Questions",
    categoryId: "writing",
    description: "Prepares deep interview arcs, unconventional questions, and conversational bridging techniques for long-form podcasts.",
    tags: ["writing","podcast","interview","media","scripting","journalism"],
    transform: createStandardSkillTransform({
      sectionName: "Podcast Host Interview Architecture",
      ruSectionName: "Сценарий глубокого подкаст-интервью (Небанальные вопросы и драматургия беседы)",
      instructions: [
        "Skip surface-level biographical questions; begin directly at the most controversial or transformative turning point.",
        "Formulate questions that challenge public consensus or probe unexpected failure lessons.",
        "Include conversational pivot bridges to steer the guest toward concrete anecdotes rather than generic theories."
],
      ruInstructions: [
        "Пропускайте дежурные вопросы о биографии; начинайте с самого поворотного или спорного момента.",
        "Задавайте вопросы, раскрывающие парадоксальные уроки и малоизвестные ошибки гостя.",
        "Используйте мостики переходов для вывода собеседника на яркие живые истории вместо сухих рассуждений."
],
      semanticType: "process_directive",
      tags: ["writing","podcast","interview","media","scripting","journalism"],
    }),
  },

  "writing-white-paper-technical-market-authority": {
    id: "writing-white-paper-technical-market-authority",
    name: "WritingWhitePaperTechnicalMarketAuthoritySkill",
    displayName: "Authoritative Technical White Paper & Industry Problem Statement",
    categoryId: "writing",
    description: "Authors comprehensive 10-page technical white papers establishing thought leadership and positioning architecture solutions.",
    tags: ["writing","white-paper","technical-marketing","b2b","authority"],
    transform: createStandardSkillTransform({
      sectionName: "Technical White Paper Authority Blueprint",
      ruSectionName: "Технический White Paper для подтверждения отраслевого лидерства",
      instructions: [
        "Open with an executive summary and macroeconomic/industry structural shift analysis.",
        "Deep-dive into the architectural bottlenecks of legacy approaches with comparative benchmark diagrams.",
        "Introduce the novel architectural paradigm objectively before demonstrating empirical advantages."
],
      ruInstructions: [
        "Начинайте с резюме для руководства и анализа структурных сдвигов на рынке.",
        "Детально разбирайте архитектурные ограничения старых подходов с графиками и бенчмарками.",
        "Презентуйте новую технологическую парадигму объективно и аргументированно."
],
      semanticType: "process_directive",
      tags: ["writing","white-paper","technical-marketing","b2b","authority"],
    }),
  },

  "writing-manifesto-mission-driven-brand-declaration": {
    id: "writing-manifesto-mission-driven-brand-declaration",
    name: "WritingManifestoMissionDrivenBrandDeclarationSkill",
    displayName: "Brand Manifesto & Cultural Declaration of Purpose",
    categoryId: "writing",
    description: "Crafts poetic, polarizing, and deeply inspiring brand manifestos that rally employees, creators, and early adopters.",
    tags: ["writing","manifesto","branding","copywriting","culture","inspiration"],
    transform: createStandardSkillTransform({
      sectionName: "Brand Manifesto & Purpose Declaration",
      ruSectionName: "Манифест бренда и вдохновляющая декларация миссии компании",
      instructions: [
        "Identify the reigning status quo orthodoxy that must be challenged.",
        "Declare an uncompromising set of beliefs about what the world should look like.",
        "Use rhythmic, evocative prose that gives goosebumps and creates immediate tribal belonging."
],
      ruInstructions: [
        "Сформулируйте устаревший статус-кво, против которого выступает ваш продукт или движение.",
        "Провозгласите бескомпромиссные ценности и образ желаемого будущего.",
        "Используйте ритмичный, эмоциональный слог, формирующий чувство общности и вдохновения."
],
      semanticType: "process_directive",
      tags: ["writing","manifesto","branding","copywriting","culture","inspiration"],
    }),
  },

  "writing-faq-objection-handling-knowledge-base": {
    id: "writing-faq-objection-handling-knowledge-base",
    name: "WritingFaqObjectionHandlingKnowledgeBaseSkill",
    displayName: "Comprehensive Product FAQ & Customer Objection Handling",
    categoryId: "writing",
    description: "Structures high-clarity FAQ hubs that anticipate customer anxieties, pricing doubts, security questions, and migration friction.",
    tags: ["writing","faq","customer-support","knowledge-base","copywriting"],
    transform: createStandardSkillTransform({
      sectionName: "Comprehensive FAQ & Objection Resolution Standards",
      ruSectionName: "База знаний и раздел FAQ с отработкой всех возражений клиентов",
      instructions: [
        "Directly address the hardest pricing, security, and cancellation questions without evasive corporate speak.",
        "Give concise 2-sentence direct answers before providing step-by-step contextual detail.",
        "Include direct links to documentation, trial signup, or support chat."
],
      ruInstructions: [
        "Прямо отвечайте на сложные вопросы о ценах, безопасности и условиях отмены подписки без увиливаний.",
        "Давайте четкий ответ в первых двух предложениях перед подробными пояснениями.",
        "Добавляйте ссылки на базу знаний и контакты службы заботы о клиентах."
],
      semanticType: "process_directive",
      tags: ["writing","faq","customer-support","knowledge-base","copywriting"],
    }),
  },

  "writing-rfp-enterprise-bid-proposal-response": {
    id: "writing-rfp-enterprise-bid-proposal-response",
    name: "WritingRfpEnterpriseBidProposalResponseSkill",
    displayName: "Enterprise RFP Bid Proposal & Government Procurement Response",
    categoryId: "writing",
    description: "Drafts compliant, winning responses to enterprise Request for Proposals (RFP) highlighting security, SLAs, and compliance.",
    tags: ["writing","rfp","procurement","enterprise-sales","proposal"],
    transform: createStandardSkillTransform({
      sectionName: "Enterprise RFP & Bid Proposal Response Standards",
      ruSectionName: "Подготовка ответов на корпоративные тендеры и RFP (Request for Proposal)",
      instructions: [
        "Map answers rigorously to every numbered evaluation requirement in the client's RFP matrix.",
        "Demonstrate proof of SOC2 Type II, ISO27001, GDPR, and enterprise SLA track records.",
        "Highlight differentiated total cost of ownership (TCO) and rapid deployment timelines."
],
      ruInstructions: [
        "Строго привязывайте ответы к каждому пункту требований тендерной спецификации заказчика.",
        "Подтверждайте соответствие стандартам безопасности (SOC2, ISO27001, GDPR) и историю соблюдения SLA.",
        "Демонстрируйте совокупную стоимость владения (TCO) и быстрые сроки внедрения решения."
],
      semanticType: "process_directive",
      tags: ["writing","rfp","procurement","enterprise-sales","proposal"],
    }),
  },
  "writing-investigative-journalism-documentary-expose": {
    id: "writing-investigative-journalism-documentary-expose",
    name: "WritingInvestigativeJournalismDocumentaryExposeSkill",
    displayName: "Investigative Journalism & Deep In-Depth Expose",
    categoryId: "writing",
    description: "Constructs airtight investigative pieces linking verified evidentiary documents, whistle-blower testimony, and public records.",
    tags: ["writing","journalism","investigative","reporting","ethics"],
    transform: createStandardSkillTransform({
      sectionName: "Investigative Journalism Reporting Standards",
      ruSectionName: "Стандарты журналистского расследования (Проверка источников и работа с уликами)",
      instructions: [
        "Corroborate every factual assertion with at least two independent primary documentary sources.",
        "Detail timeline of inquiries and provide subjects ample formal right-of-reply before publication.",
        "Distinguish hard verified evidence from unverified circumstantial speculation clearly."
],
      ruInstructions: [
        "Подтверждайте каждое утверждение минимум двумя независимыми первичными документами.",
        "Предоставляйте фигурантам расследования официальное право на ответ в установленный срок.",
        "Четко разграничивайте доказанные факты и косвенные предположения."
],
      semanticType: "process_directive",
      tags: ["writing","journalism","investigative","reporting","ethics"],
    }),
  },

  "writing-github-readme-open-source-hero": {
    id: "writing-github-readme-open-source-hero",
    name: "WritingGithubReadmeOpenSourceHeroSkill",
    displayName: "GitHub Repository README & Open-Source Showcase",
    categoryId: "writing",
    description: "Crafts engaging GitHub README files with animated demo GIFs, quickstart codeblocks, architecture diagrams, and badges.",
    tags: ["writing","github","readme","open-source","developer-marketing"],
    transform: createStandardSkillTransform({
      sectionName: "Open-Source GitHub README Showcase Standards",
      ruSectionName: "Стандарт оформления README репозитория на GitHub (Open Source Showcase)",
      instructions: [
        "Show, don't tell: place high-resolution visual/GIF demo above the fold immediately after the title.",
        "Include a 30-second quickstart guide (`npm install` / `docker run`) with zero prerequisites.",
        "Provide clear visual architecture diagrams and explicit benchmark comparison tables."
],
      ruInstructions: [
        "Показывайте продукт в действии: размещайте GIF-демонстрацию в первом экране под заголовком.",
        "Добавляйте блок быстрого старта на 30 секунд без сложных предварительных настроек.",
        "Включайте наглядную схему архитектуры и таблицу сравнения производительности."
],
      semanticType: "process_directive",
      tags: ["writing","github","readme","open-source","developer-marketing"],
    }),
  },

  "writing-sales-battlecard-competitive-positioning": {
    id: "writing-sales-battlecard-competitive-positioning",
    name: "WritingSalesBattlecardCompetitivePositioningSkill",
    displayName: "B2B Sales Battlecard & Competitive FUD Defusal",
    categoryId: "writing",
    description: "Equips enterprise account executives with objection handling, landmines to lay, and competitor differentiation matrices.",
    tags: ["writing","sales-enablement","battlecard","competitive-intelligence","b2b"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Sales Battlecard & Competitive Positioning Standard",
      ruSectionName: "Боевая карточка продаж (Sales Battlecard) и отстройка от конкурентов",
      instructions: [
        "Highlight 'Where we win' vs 'Where they win' with radical honesty to preserve AE sales credibility.",
        "Provide trap-setting discovery questions that steer buyers toward our proprietary strengths.",
        "Arm sales reps with concise 'Quick Dismiss' scripts for common competitor FUD attacks."
],
      ruInstructions: [
        "Честно сопоставляйте сильные и слабые стороны своего решения и конкурентов для реалистичной картины.",
        "Формулируйте наводящие вопросы на этапе Discovery, подсвечивающие уникальные преимущества продукта.",
        "Давайте менеджерам готовые реплики для нейтрализации типовых атак конкурентов."
],
      semanticType: "process_directive",
      tags: ["writing","sales-enablement","battlecard","competitive-intelligence","b2b"],
    }),
  },

  "writing-customer-advisory-board-executive-briefing": {
    id: "writing-customer-advisory-board-executive-briefing",
    name: "WritingCustomerAdvisoryBoardExecutiveBriefingSkill",
    displayName: "Customer Advisory Board (CAB) Executive Strategic Briefing",
    categoryId: "writing",
    description: "Prepares C-suite agendas, strategic discussion prompts, and confidential product roadmap previews for enterprise advisory boards.",
    tags: ["writing","cab","executive-briefing","customer-success","leadership"],
    transform: createStandardSkillTransform({
      sectionName: "Customer Advisory Board Executive Briefing Standards",
      ruSectionName: "Подготовка стратегических материалов для консультативного совета клиентов (CAB)",
      instructions: [
        "Design interactive executive discussion prompts rather than one-way promotional presentations.",
        "Frame roadmap debates around macro industry trends and joint coinnovation opportunities.",
        "Document feedback with assigned C-level champions and follow-up commitments."
],
      ruInstructions: [
        "Формируйте повестку в виде открытых дискуссионных вопросов вместо односторонней презентации.",
        "Привязывайте обсуждение дорожной карты к макротрендам индустрии и совместным инновациям.",
        "Фиксируйте обратную связь с назначением ответственных топ-менеджеров за реализацию пожеланий."
],
      semanticType: "process_directive",
      tags: ["writing","cab","executive-briefing","customer-success","leadership"],
    }),
  },

  "writing-soc2-security-whitepaper-trust-center": {
    id: "writing-soc2-security-whitepaper-trust-center",
    name: "WritingSoc2SecurityWhitepaperTrustCenterSkill",
    displayName: "Security & Compliance Trust Center Whitepaper (SOC2/GDPR/HIPAA)",
    categoryId: "writing",
    description: "Details enterprise encryption, key management (KMS), tenant isolation, and disaster recovery for enterprise security reviews.",
    tags: ["writing","security-whitepaper","compliance","soc2","gdpr","trust-center"],
    transform: createStandardSkillTransform({
      sectionName: "Security & Trust Center Whitepaper Standards",
      ruSectionName: "Стандарт документации безопасности и комплаенса (SOC2, GDPR, Trust Center)",
      instructions: [
        "Specify AES-256 encryption at rest, TLS 1.3 in transit, and customer-managed encryption key (CMEK) policies.",
        "Detail multi-tenant logical database isolation, role-based access control (RBAC), and least-privilege IAM.",
        "Outline business continuity (BCP) and disaster recovery (DR) RPO/RTO metrics."
],
      ruInstructions: [
        "Описывайте протоколы шифрования (AES-256 в покое, TLS 1.3 при передаче) и политики управления ключами.",
        "Детализируйте логическую изоляцию данных клиентов, модель RBAC и принцип наименьших привилегий.",
        "Приводите целевые показатели восстановления после сбоев: RPO (допустимая потеря данных) и RTO (время восстановления)."
],
      semanticType: "process_directive",
      tags: ["writing","security-whitepaper","compliance","soc2","gdpr","trust-center"],
    }),
  },

  "writing-direct-response-sales-letter-halbert-style": {
    id: "writing-direct-response-sales-letter-halbert-style",
    name: "WritingDirectResponseSalesLetterHalbertStyleSkill",
    displayName: "Classic Direct-Response Sales Letter (Gary Halbert / Dan Kennedy)",
    categoryId: "writing",
    description: "Structures high-converting classic long-form direct-response copy: Hook, Story, Irresistible Offer, Risk Reversal, Urgency.",
    tags: ["writing","direct-response","copywriting","sales-letter","conversion"],
    transform: createStandardSkillTransform({
      sectionName: "Classic Direct-Response Copywriting Architecture",
      ruSectionName: "Классический длинный продающий текст прямого отклика (Direct-Response Halbert)",
      instructions: [
        "Craft an emotionally charged, curiosity-driven headline that demands immediate continuation.",
        "Tell a gripping personal transformation story illustrating the discovery of the breakthrough mechanism.",
        "Stack bonuses, guarantee 100% unconditional risk reversal, and inject genuine ethical scarcity."
],
      ruInstructions: [
        "Создавайте интригующий заголовок, заставляющий прочитать первую строчку текста.",
        "Рассказывайте эмоциональную историю преодоления трудностей и открытия уникального механизма.",
        "Формируйте неотразимое предложение (Offer Stack), давайте 100% гарантию возврата и указывайте дедлайн."
],
      semanticType: "process_directive",
      tags: ["writing","direct-response","copywriting","sales-letter","conversion"],
    }),
  },

  "writing-product-launch-hunt-showcase": {
    id: "writing-product-launch-hunt-showcase",
    name: "WritingProductLaunchHuntShowcaseSkill",
    displayName: "Product Hunt Launch Kit & Maker Comment Architecture",
    categoryId: "writing",
    description: "Crafts high-engagement Product Hunt taglines, maker stories, animated thumbnail copy, and launch day Q&A replies.",
    tags: ["writing","product-hunt","launch","marketing","startups"],
    transform: createStandardSkillTransform({
      sectionName: "Product Hunt Launch Kit Blueprint",
      ruSectionName: "Пакет материалов для запуска на Product Hunt (Maker Comment и визитка продукта)",
      instructions: [
        "Write an punchy 60-character tagline focusing on the magical superpower the tool gives users.",
        "Craft an authentic First Maker Comment explaining why you spent months building this and the pain that sparked it.",
        "Prepare friendly, value-adding responses to community questions within 5 minutes of posting."
],
      ruInstructions: [
        "Формулируйте слоган до 60 символов, подчеркивающий уникальную возможность инструмента.",
        "Пишите искренний комментарий создателя (Maker Comment) о личной боли и истории создания продукта.",
        "Оперативно и дружелюбно отвечайте на комментарии сообщества в день релиза."
],
      semanticType: "process_directive",
      tags: ["writing","product-hunt","launch","marketing","startups"],
    }),
  },

  "writing-ted-talk-storytelling-mastery": {
    id: "writing-ted-talk-storytelling-mastery",
    name: "WritingTedTalkStorytellingMasterySkill",
    displayName: "TED Talk Narrative Arc & 'Idea Worth Spreading' Synthesis",
    categoryId: "writing",
    description: "Structures captivating 15-minute TED talks using the Throughline, vulnerable personal anecdotes, and paradigm shifts.",
    tags: ["writing","ted-talk","storytelling","public-speaking","presentation"],
    transform: createStandardSkillTransform({
      sectionName: "TED Talk Narrative Throughline Architecture",
      ruSectionName: "Драматургия и сценарная структура выступления в стиле TED Talk",
      instructions: [
        "Establish a single unifying Throughline: one powerful, counterintuitive idea worth spreading.",
        "Take the audience on a journey from what is known to what could be, alternating between data and emotion.",
        "End with a tangible call to reimagining human potential or collective action."
],
      ruInstructions: [
        "Выстраивайте выступление вокруг одной центральной сквозной идеи (Throughline).",
        "Чередуйте научные факты с личными уязвимыми историями для удержания эмоционального контакта.",
        "Завершайте вдохновляющим призывом к переосмыслению привычных взглядов."
],
      semanticType: "process_directive",
      tags: ["writing","ted-talk","storytelling","public-speaking","presentation"],
    }),
  },

  "writing-user-persona-jobs-to-be-done-profile": {
    id: "writing-user-persona-jobs-to-be-done-profile",
    name: "WritingUserPersonaJobsToBeDoneProfileSkill",
    displayName: "Jobs-to-be-Done (JTBD) Customer Persona Profile",
    categoryId: "writing",
    description: "Creates rich customer profiles based on Clayton Christensen JTBD theory: Functional, Emotional, and Social jobs, pains, and gains.",
    tags: ["writing","jtbd","personas","product-management","user-research"],
    transform: createStandardSkillTransform({
      sectionName: "Jobs-to-be-Done Customer Profile Standards",
      ruSectionName: "Профиль персоны пользователя по методологии Jobs-to-be-Done (JTBD)",
      instructions: [
        "Frame customer motivations through the formula: 'When I [situation], I want to [motivation], so I can [outcome]'.",
        "Differentiate functional jobs from deeper emotional anxieties and social status motivations.",
        "Identify the 'hiring' and 'firing' triggers of competing solutions."
],
      ruInstructions: [
        "Описывайте потребности через формулу JTBD: «Когда я [контекст], я хочу [действие], чтобы [результат]».",
        "Разделяйте функциональные задачи, эмоциональные тревоги и социальный статус пользователя.",
        "Анализируйте триггеры отказа от старого решения («увольнение») и перехода на новое («найм»)."
],
      semanticType: "process_directive",
      tags: ["writing","jtbd","personas","product-management","user-research"],
    }),
  },

  "writing-internal-engineering-rfc-design-doc": {
    id: "writing-internal-engineering-rfc-design-doc",
    name: "WritingInternalEngineeringRfcDesignDocSkill",
    displayName: "Engineering Design Document & Request for Comments (RFC)",
    categoryId: "writing",
    description: "Structures rigorous technical RFCs covering context, non-goals, architecture diagrams, trade-offs, and rollback plans.",
    tags: ["writing","rfc","design-doc","software-engineering","architecture"],
    transform: createStandardSkillTransform({
      sectionName: "Engineering Design Document (RFC) Standards",
      ruSectionName: "Технический дизайн-документ и RFC для инженерных команд",
      instructions: [
        "Explicitly list Non-Goals in the first section to prevent scope creep during review.",
        "Document at least two discarded alternative architectures with explicit reasons for rejection.",
        "Include database schema changes, operational risk assessments, and zero-downtime rollback procedures."
],
      ruInstructions: [
        "Явно фиксируйте раздел «Не-цели» (Non-Goals) в самом начале для защиты от раздувания скоупа.",
        "Описывайте отклоненные альтернативные архитектурные решения с обоснованием причин отказа.",
        "Включайте схему БД, оценку нагрузки, план тестирования и процедуру безопасного отката (Rollback)."
],
      semanticType: "process_directive",
      tags: ["writing","rfc","design-doc","software-engineering","architecture"],
    }),
  },

  "writing-crowdfunding-kickstarter-campaign-story": {
    id: "writing-crowdfunding-kickstarter-campaign-story",
    name: "WritingCrowdfundingKickstarterCampaignStorySkill",
    displayName: "Kickstarter / Indiegogo Crowdfunding Campaign Story",
    categoryId: "writing",
    description: "Writes viral crowdfunding pages featuring maker prototypes, pledge tier reward matrices, and stretch goal roadmaps.",
    tags: ["writing","crowdfunding","kickstarter","copywriting","product-launch"],
    transform: createStandardSkillTransform({
      sectionName: "Crowdfunding Campaign Story Architecture",
      ruSectionName: "Структура страницы краудфандинговой кампании (Kickstarter / Indiegogo)",
      instructions: [
        "Hook backers in the first 10 seconds with working physical/software prototypes.",
        "Structure pledge tiers with clear early-bird discounts and exclusive community perks.",
        "Publish exciting stretch goals that unlock manufacturing upgrades upon reaching funding milestones."
],
      ruInstructions: [
        "Захватывайте внимание бэкеров реальным работающим прототипом в первые секунды просмотра.",
        "Оформляйте уровни вознаграждений с привлекательными скидками для первых спонсоров (Early Bird).",
        "Публикуйте вдохновляющие сверхцели (Stretch Goals), открывающие новые функции при росте сборов."
],
      semanticType: "process_directive",
      tags: ["writing","crowdfunding","kickstarter","copywriting","product-launch"],
    }),
  },

  "writing-compensation-promotion-packet-brag-sheet": {
    id: "writing-compensation-promotion-packet-brag-sheet",
    name: "WritingCompensationPromotionPacketBragSheetSkill",
    displayName: "Engineering Promotion Packet & Impact Brag Sheet",
    categoryId: "writing",
    description: "Compiles convincing promotion and compensation packets linking engineering achievements to company business revenue and team leverage.",
    tags: ["writing","career","promotion","brag-sheet","engineering-management"],
    transform: createStandardSkillTransform({
      sectionName: "Engineering Promotion Packet & Impact Standards",
      ruSectionName: "Пакет обоснования повышения и карьерного роста (Promotion & Impact Packet)",
      instructions: [
        "Map technical projects to next-level staff/principal competency rubrics.",
        "Quantify business leverage: dollars saved, latency shaved, uptime preserved, and engineers mentored.",
        "Include peer and cross-functional leadership testimonials supporting the elevation."
],
      ruInstructions: [
        "Сопоставляйте достижения с формальными критериями следующего грейда в компании.",
        "Оцифровывайте влияние на бизнес: сохраненная выручка, ускорение CI/CD, рост надежности и менторство.",
        "Приводите отзывы коллег и смежных руководителей о лидерском вкладе кандидата."
],
      semanticType: "process_directive",
      tags: ["writing","career","promotion","brag-sheet","engineering-management"],
    }),
  },

  "writing-legal-terms-of-service-plain-english-summary": {
    id: "writing-legal-terms-of-service-plain-english-summary",
    name: "WritingLegalTermsOfServicePlainEnglishSummarySkill",
    displayName: "Dual-Column Terms of Service (Legal + Plain-English Summary)",
    categoryId: "writing",
    description: "Presents binding Terms of Service and Privacy Policies alongside friendly, plain-English side-by-side explanations.",
    tags: ["writing","tos","privacy-policy","legal-writing","transparency"],
    transform: createStandardSkillTransform({
      sectionName: "Transparent Terms of Service Dual-Column Standards",
      ruSectionName: "Пользовательское соглашение с понятным переводом на человеческий язык (Side-by-Side)",
      instructions: [
        "Pair formal legal clauses with simple 1-sentence 'What this actually means for you' translations.",
        "Clarify user data ownership, intellectual property rights, and billing cancellation terms without obfuscation.",
        "Highlight privacy commitments regarding no selling of personal identifiable information."
],
      ruInstructions: [
        "Сопровождайте юридические формулировки простыми пояснениями «Что это значит на человеческом языке».",
        "Четко объясняйте права собственности на пользовательский контент и правила отмены подписки.",
        "Выделяйте гарантии конфиденциальности и запрет на продажу персональных данных третьим лицам."
],
      semanticType: "process_directive",
      tags: ["writing","tos","privacy-policy","legal-writing","transparency"],
    }),
  },

  "writing-interactive-fiction-branching-dialogue-tree": {
    id: "writing-interactive-fiction-branching-dialogue-tree",
    name: "WritingInteractiveFictionBranchingDialogueTreeSkill",
    displayName: "Branching Interactive Fiction & Narrative RPG Dialogue Tree",
    categoryId: "writing",
    description: "Authors rich interactive storylines, character state variables, and moral choice branching dialogue trees for game narratives.",
    tags: ["writing","interactive-fiction","game-design","narrative","dialogue-tree"],
    transform: createStandardSkillTransform({
      sectionName: "Interactive Fiction Branching Dialogue Architecture",
      ruSectionName: "Нелинейные диалоговые деревья и нарратив для интерактивных игр (RPG)",
      instructions: [
        "Design distinct player choice nodes reflecting personality archetypes (Pragmatist, Idealist, Rebel).",
        "Track implicit state variables (reputation, loyalty) affecting downstream chapter consequences.",
        "Avoid false choices: ensure every major branch delivers distinct emotional and tactical payoffs."
],
      ruInstructions: [
        "Создавайте ветви диалогов для разных архетипов персонажей (Прагматик, Идеалист, Бунтарь).",
        "Отслеживайте скрытые параметры отношений и репутации, влияющие на сюжетные повороты.",
        "Избегайте иллюзии выбора: каждый ключевой выбор должен приводить к ощутимым последствиям."
],
      semanticType: "process_directive",
      tags: ["writing","interactive-fiction","game-design","narrative","dialogue-tree"],
    }),
  },

  "writing-nonprofit-grant-proposal-foundation-pitch": {
    id: "writing-nonprofit-grant-proposal-foundation-pitch",
    name: "WritingNonprofitGrantProposalFoundationPitchSkill",
    displayName: "Philanthropic Foundation Grant Proposal & Theory of Change",
    categoryId: "writing",
    description: "Constructs compelling grant proposals demonstrating measurable community impact, operational efficiency, and sustainable scale.",
    tags: ["writing","grant-proposal","nonprofit","philanthropy","fundraising"],
    transform: createStandardSkillTransform({
      sectionName: "Nonprofit Foundation Grant Proposal Framework",
      ruSectionName: "Заявка на грант для благотворительных фондов (Теория изменений и метрики влияния)",
      instructions: [
        "Articulate a rigorous Theory of Change: Inputs -> Activities -> Outputs -> Outcomes -> Systemic Impact.",
        "Provide detailed line-item budgets with low overhead ratios and high direct-benefit delivery.",
        "Detail qualitative beneficiary stories alongside third-party audited impact metrics."
],
      ruInstructions: [
        "Описывайте логическую модель: Ресурсы -> Мероприятия -> Результаты -> Долгосрочные социальные изменения.",
        "Предоставляйте прозрачную смету расходов с высоким процентом прямого финансирования программ.",
        "Сочетайте живые истории благополучателей с независимой верифицированной статистикой влияния."
],
      semanticType: "process_directive",
      tags: ["writing","grant-proposal","nonprofit","philanthropy","fundraising"],
    }),
  },
  "writing-executive-summary-elevator-pitch-synthesis": {
    id: "writing-executive-summary-elevator-pitch-synthesis",
    name: "ExecutiveSummaryElevatorPitchSynthesisSkill",
    displayName: "Executive Summary & Elevator Pitch Synthesis",
    categoryId: "writing",
    description: "Distills long complex documents into a 1-page executive summary.",
    tags: ["writing","writing","executive","summary"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Summary & Elevator Pitch Synthesis Standards",
      ruSectionName: "Стандарты и регламенты: Executive Summary & Elevator Pitch Synthesis",
      instructions: [
        "Apply core domain tenets for Executive Summary & Elevator Pitch Synthesis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Executive Summary & Elevator Pitch Synthesis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","executive","summary"],
    }),
  },

  "writing-cold-outbound-email-pattern-interrupt": {
    id: "writing-cold-outbound-email-pattern-interrupt",
    name: "ColdOutboundEmailPatternInterruptSkill",
    displayName: "Cold Outbound Email & Pattern Interrupt",
    categoryId: "writing",
    description: "Drafts high-converting B2B sales emails under 75 words.",
    tags: ["writing","writing","cold","outbound"],
    transform: createStandardSkillTransform({
      sectionName: "Cold Outbound Email & Pattern Interrupt Standards",
      ruSectionName: "Стандарты и регламенты: Cold Outbound Email & Pattern Interrupt",
      instructions: [
        "Apply core domain tenets for Cold Outbound Email & Pattern Interrupt.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cold Outbound Email & Pattern Interrupt.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","cold","outbound"],
    }),
  },

  "writing-crisis-communications-pr-apology-statement": {
    id: "writing-crisis-communications-pr-apology-statement",
    name: "CrisisCommunicationsPRApologyStatementSkill",
    displayName: "Crisis Communications & PR Apology Statement",
    categoryId: "writing",
    description: "Crafts transparent, accountable corporate crisis responses.",
    tags: ["writing","writing","crisis","communications"],
    transform: createStandardSkillTransform({
      sectionName: "Crisis Communications & PR Apology Statement Standards",
      ruSectionName: "Стандарты и регламенты: Crisis Communications & PR Apology Statement",
      instructions: [
        "Apply core domain tenets for Crisis Communications & PR Apology Statement.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Crisis Communications & PR Apology Statement.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","crisis","communications"],
    }),
  },

  "writing-technical-release-notes-customer-delight": {
    id: "writing-technical-release-notes-customer-delight",
    name: "TechnicalReleaseNotesCustomerDelightSkill",
    displayName: "Technical Release Notes & Customer Delight",
    categoryId: "writing",
    description: "Translates code commits into engaging user-facing release notes.",
    tags: ["writing","writing","technical","release"],
    transform: createStandardSkillTransform({
      sectionName: "Technical Release Notes & Customer Delight Standards",
      ruSectionName: "Стандарты и регламенты: Technical Release Notes & Customer Delight",
      instructions: [
        "Apply core domain tenets for Technical Release Notes & Customer Delight.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Technical Release Notes & Customer Delight.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","technical","release"],
    }),
  },

  "writing-amazon-6-page-narrative-strategy-memo": {
    id: "writing-amazon-6-page-narrative-strategy-memo",
    name: "Amazon6PageNarrativeStrategyMemoSkill",
    displayName: "Amazon 6-Page Narrative Strategy Memo",
    categoryId: "writing",
    description: "Structures strategic proposals in Bezos narrative memo format.",
    tags: ["writing","writing","amazon","6"],
    transform: createStandardSkillTransform({
      sectionName: "Amazon 6-Page Narrative Strategy Memo Standards",
      ruSectionName: "Стандарты и регламенты: Amazon 6-Page Narrative Strategy Memo",
      instructions: [
        "Apply core domain tenets for Amazon 6-Page Narrative Strategy Memo.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Amazon 6-Page Narrative Strategy Memo.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","amazon","6"],
    }),
  },

  "writing-ap-stylebook-journalistic-clarity-neutrality": {
    id: "writing-ap-stylebook-journalistic-clarity-neutrality",
    name: "APStylebookJournalisticClarityNeutralitySkill",
    displayName: "AP Stylebook Journalistic Clarity & Neutrality",
    categoryId: "writing",
    description: "Applies standard AP Stylebook conventions for news articles.",
    tags: ["writing","writing","ap","stylebook"],
    transform: createStandardSkillTransform({
      sectionName: "AP Stylebook Journalistic Clarity & Neutrality Standards",
      ruSectionName: "Стандарты и регламенты: AP Stylebook Journalistic Clarity & Neutrality",
      instructions: [
        "Apply core domain tenets for AP Stylebook Journalistic Clarity & Neutrality.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для AP Stylebook Journalistic Clarity & Neutrality.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","ap","stylebook"],
    }),
  },

  "writing-y-combinator-startup-pitch-application": {
    id: "writing-y-combinator-startup-pitch-application",
    name: "YCombinatorStartupPitchApplicationSkill",
    displayName: "Y Combinator Startup Pitch Application",
    categoryId: "writing",
    description: "Drafts concise, high-density answers for startup accelerator applications.",
    tags: ["writing","writing","y","combinator"],
    transform: createStandardSkillTransform({
      sectionName: "Y Combinator Startup Pitch Application Standards",
      ruSectionName: "Стандарты и регламенты: Y Combinator Startup Pitch Application",
      instructions: [
        "Apply core domain tenets for Y Combinator Startup Pitch Application.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Y Combinator Startup Pitch Application.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","y","combinator"],
    }),
  },

  "writing-sec-form-10-k-md-a-financial-commentary": {
    id: "writing-sec-form-10-k-md-a-financial-commentary",
    name: "SECForm10KMDAFinancialCommentarySkill",
    displayName: "SEC Form 10-K MD&A Financial Commentary",
    categoryId: "writing",
    description: "Drafts public company financial discussion and analysis sections.",
    tags: ["writing","writing","sec","form"],
    transform: createStandardSkillTransform({
      sectionName: "SEC Form 10-K MD&A Financial Commentary Standards",
      ruSectionName: "Стандарты и регламенты: SEC Form 10-K MD&A Financial Commentary",
      instructions: [
        "Apply core domain tenets for SEC Form 10-K MD&A Financial Commentary.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SEC Form 10-K MD&A Financial Commentary.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","sec","form"],
    }),
  },

  "writing-nature-peer-reviewed-abstract-structure": {
    id: "writing-nature-peer-reviewed-abstract-structure",
    name: "NaturePeerReviewedAbstractStructureSkill",
    displayName: "Nature Peer-Reviewed Abstract Structure",
    categoryId: "writing",
    description: "Composes 5-part scientific paper abstracts following Nature standards.",
    tags: ["writing","writing","nature","peer"],
    transform: createStandardSkillTransform({
      sectionName: "Nature Peer-Reviewed Abstract Structure Standards",
      ruSectionName: "Стандарты и регламенты: Nature Peer-Reviewed Abstract Structure",
      instructions: [
        "Apply core domain tenets for Nature Peer-Reviewed Abstract Structure.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Nature Peer-Reviewed Abstract Structure.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","nature","peer"],
    }),
  },

  "writing-stripe-press-long-form-intellectual-essay": {
    id: "writing-stripe-press-long-form-intellectual-essay",
    name: "StripePressLongFormIntellectualEssaySkill",
    displayName: "Stripe Press Long-Form Intellectual Essay",
    categoryId: "writing",
    description: "Crafts high-grade essays on technological progress and economics.",
    tags: ["writing","writing","stripe","press"],
    transform: createStandardSkillTransform({
      sectionName: "Stripe Press Long-Form Intellectual Essay Standards",
      ruSectionName: "Стандарты и регламенты: Stripe Press Long-Form Intellectual Essay",
      instructions: [
        "Apply core domain tenets for Stripe Press Long-Form Intellectual Essay.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Stripe Press Long-Form Intellectual Essay.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","stripe","press"],
    }),
  },

  "writing-executive-keynote-speechwriting-rhetoric": {
    id: "writing-executive-keynote-speechwriting-rhetoric",
    name: "ExecutiveKeynoteSpeechwritingRhetoricSkill",
    displayName: "Executive Keynote Speechwriting & Rhetoric",
    categoryId: "writing",
    description: "Writes charismatic spoken-word speeches using classical rhetorical devices.",
    tags: ["writing","writing","executive","keynote"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Keynote Speechwriting & Rhetoric Standards",
      ruSectionName: "Стандарты и регламенты: Executive Keynote Speechwriting & Rhetoric",
      instructions: [
        "Apply core domain tenets for Executive Keynote Speechwriting & Rhetoric.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Executive Keynote Speechwriting & Rhetoric.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","executive","keynote"],
    }),
  },

  "writing-saas-behavioral-onboarding-email-drip": {
    id: "writing-saas-behavioral-onboarding-email-drip",
    name: "SaaSBehavioralOnboardingEmailDripSkill",
    displayName: "SaaS Behavioral Onboarding Email Drip",
    categoryId: "writing",
    description: "Designs automated email onboarding funnels triggered by telemetry.",
    tags: ["writing","writing","saas","behavioral"],
    transform: createStandardSkillTransform({
      sectionName: "SaaS Behavioral Onboarding Email Drip Standards",
      ruSectionName: "Стандарты и регламенты: SaaS Behavioral Onboarding Email Drip",
      instructions: [
        "Apply core domain tenets for SaaS Behavioral Onboarding Email Drip.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SaaS Behavioral Onboarding Email Drip.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","saas","behavioral"],
    }),
  },

  "writing-blameless-engineering-incident-post-mortem": {
    id: "writing-blameless-engineering-incident-post-mortem",
    name: "BlamelessEngineeringIncidentPostMortemSkill",
    displayName: "Blameless Engineering Incident Post-Mortem",
    categoryId: "writing",
    description: "Documents system outages objectively with root causes and timelines.",
    tags: ["writing","writing","blameless","engineering"],
    transform: createStandardSkillTransform({
      sectionName: "Blameless Engineering Incident Post-Mortem Standards",
      ruSectionName: "Стандарты и регламенты: Blameless Engineering Incident Post-Mortem",
      instructions: [
        "Apply core domain tenets for Blameless Engineering Incident Post-Mortem.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Blameless Engineering Incident Post-Mortem.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","blameless","engineering"],
    }),
  },

  "writing-substack-thought-leadership-newsletter": {
    id: "writing-substack-thought-leadership-newsletter",
    name: "SubstackThoughtLeadershipNewsletterSkill",
    displayName: "Substack Thought Leadership Newsletter",
    categoryId: "writing",
    description: "Structures high-open-rate newsletters with magnetic subject lines.",
    tags: ["writing","writing","substack","thought"],
    transform: createStandardSkillTransform({
      sectionName: "Substack Thought Leadership Newsletter Standards",
      ruSectionName: "Стандарты и регламенты: Substack Thought Leadership Newsletter",
      instructions: [
        "Apply core domain tenets for Substack Thought Leadership Newsletter.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Substack Thought Leadership Newsletter.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","substack","thought"],
    }),
  },

  "writing-patent-claims-specification-drafting": {
    id: "writing-patent-claims-specification-drafting",
    name: "PatentClaimsSpecificationDraftingSkill",
    displayName: "Patent Claims & Specification Drafting",
    categoryId: "writing",
    description: "Drafts utility patent specifications and independent claim language.",
    tags: ["writing","writing","patent","claims"],
    transform: createStandardSkillTransform({
      sectionName: "Patent Claims & Specification Drafting Standards",
      ruSectionName: "Стандарты и регламенты: Patent Claims & Specification Drafting",
      instructions: [
        "Apply core domain tenets for Patent Claims & Specification Drafting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Patent Claims & Specification Drafting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","patent","claims"],
    }),
  },

  "writing-developer-api-reference-documentation": {
    id: "writing-developer-api-reference-documentation",
    name: "DeveloperAPIReferenceDocumentationSkill",
    displayName: "Developer API Reference Documentation",
    categoryId: "writing",
    description: "Writes Stripe-grade developer API docs with copy-paste code snippets.",
    tags: ["writing","writing","developer","api"],
    transform: createStandardSkillTransform({
      sectionName: "Developer API Reference Documentation Standards",
      ruSectionName: "Стандарты и регламенты: Developer API Reference Documentation",
      instructions: [
        "Apply core domain tenets for Developer API Reference Documentation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Developer API Reference Documentation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","developer","api"],
    }),
  },

  "writing-b2b-enterprise-case-study-roi-story": {
    id: "writing-b2b-enterprise-case-study-roi-story",
    name: "B2BEnterpriseCaseStudyROIStorySkill",
    displayName: "B2B Enterprise Case Study ROI Story",
    categoryId: "writing",
    description: "Transforms customer success into sales collateral with quantitative proof.",
    tags: ["writing","writing","b2b","enterprise"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Enterprise Case Study ROI Story Standards",
      ruSectionName: "Стандарты и регламенты: B2B Enterprise Case Study ROI Story",
      instructions: [
        "Apply core domain tenets for B2B Enterprise Case Study ROI Story.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Enterprise Case Study ROI Story.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","b2b","enterprise"],
    }),
  },

  "writing-harvard-business-school-executive-case-study": {
    id: "writing-harvard-business-school-executive-case-study",
    name: "HarvardBusinessSchoolExecutiveCaseStudySkill",
    displayName: "Harvard Business School Executive Case Study",
    categoryId: "writing",
    description: "Drafts management case studies centered on critical executive choices.",
    tags: ["writing","writing","harvard","business"],
    transform: createStandardSkillTransform({
      sectionName: "Harvard Business School Executive Case Study Standards",
      ruSectionName: "Стандарты и регламенты: Harvard Business School Executive Case Study",
      instructions: [
        "Apply core domain tenets for Harvard Business School Executive Case Study.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Harvard Business School Executive Case Study.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","harvard","business"],
    }),
  },

  "writing-app-store-listing-optimization-aso": {
    id: "writing-app-store-listing-optimization-aso",
    name: "AppStoreListingOptimizationASOSkill",
    displayName: "App Store Listing Optimization (ASO)",
    categoryId: "writing",
    description: "Writes high-converting titles, subtitles, and descriptions for app stores.",
    tags: ["writing","writing","app","store"],
    transform: createStandardSkillTransform({
      sectionName: "App Store Listing Optimization (ASO) Standards",
      ruSectionName: "Стандарты и регламенты: App Store Listing Optimization (ASO)",
      instructions: [
        "Apply core domain tenets for App Store Listing Optimization (ASO).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для App Store Listing Optimization (ASO).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","app","store"],
    }),
  },

  "writing-ux-microcopy-friendly-error-messages": {
    id: "writing-ux-microcopy-friendly-error-messages",
    name: "UXMicrocopyFriendlyErrorMessagesSkill",
    displayName: "UX Microcopy & Friendly Error Messages",
    categoryId: "writing",
    description: "Crafts empathetic interface microcopy for errors and empty states.",
    tags: ["writing","writing","ux","microcopy"],
    transform: createStandardSkillTransform({
      sectionName: "UX Microcopy & Friendly Error Messages Standards",
      ruSectionName: "Стандарты и регламенты: UX Microcopy & Friendly Error Messages",
      instructions: [
        "Apply core domain tenets for UX Microcopy & Friendly Error Messages.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для UX Microcopy & Friendly Error Messages.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","ux","microcopy"],
    }),
  },

  "writing-quarterly-shareholder-letter-update": {
    id: "writing-quarterly-shareholder-letter-update",
    name: "QuarterlyShareholderLetterUpdateSkill",
    displayName: "Quarterly Shareholder Letter & Update",
    categoryId: "writing",
    description: "Writes candid investor updates covering ARR, burn rate, and key asks.",
    tags: ["writing","writing","quarterly","shareholder"],
    transform: createStandardSkillTransform({
      sectionName: "Quarterly Shareholder Letter & Update Standards",
      ruSectionName: "Стандарты и регламенты: Quarterly Shareholder Letter & Update",
      instructions: [
        "Apply core domain tenets for Quarterly Shareholder Letter & Update.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Quarterly Shareholder Letter & Update.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","quarterly","shareholder"],
    }),
  },

  "writing-podcast-host-interview-script-questions": {
    id: "writing-podcast-host-interview-script-questions",
    name: "PodcastHostInterviewScriptQuestionsSkill",
    displayName: "Podcast Host Interview Script & Questions",
    categoryId: "writing",
    description: "Prepares deep interview arcs and provocative questions for podcasts.",
    tags: ["writing","writing","podcast","host"],
    transform: createStandardSkillTransform({
      sectionName: "Podcast Host Interview Script & Questions Standards",
      ruSectionName: "Стандарты и регламенты: Podcast Host Interview Script & Questions",
      instructions: [
        "Apply core domain tenets for Podcast Host Interview Script & Questions.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Podcast Host Interview Script & Questions.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","podcast","host"],
    }),
  },

  "writing-technical-white-paper-authority-blueprint": {
    id: "writing-technical-white-paper-authority-blueprint",
    name: "TechnicalWhitePaperAuthorityBlueprintSkill",
    displayName: "Technical White Paper Authority Blueprint",
    categoryId: "writing",
    description: "Authors comprehensive technical white papers establishing market leadership.",
    tags: ["writing","writing","technical","white"],
    transform: createStandardSkillTransform({
      sectionName: "Technical White Paper Authority Blueprint Standards",
      ruSectionName: "Стандарты и регламенты: Technical White Paper Authority Blueprint",
      instructions: [
        "Apply core domain tenets for Technical White Paper Authority Blueprint.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Technical White Paper Authority Blueprint.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","technical","white"],
    }),
  },

  "writing-brand-manifesto-cultural-declaration": {
    id: "writing-brand-manifesto-cultural-declaration",
    name: "BrandManifestoCulturalDeclarationSkill",
    displayName: "Brand Manifesto & Cultural Declaration",
    categoryId: "writing",
    description: "Crafts inspiring brand manifestos that rally employees and users.",
    tags: ["writing","writing","brand","manifesto"],
    transform: createStandardSkillTransform({
      sectionName: "Brand Manifesto & Cultural Declaration Standards",
      ruSectionName: "Стандарты и регламенты: Brand Manifesto & Cultural Declaration",
      instructions: [
        "Apply core domain tenets for Brand Manifesto & Cultural Declaration.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Brand Manifesto & Cultural Declaration.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","brand","manifesto"],
    }),
  },

  "writing-comprehensive-product-faq-objection-handling": {
    id: "writing-comprehensive-product-faq-objection-handling",
    name: "ComprehensiveProductFAQObjectionHandlingSkill",
    displayName: "Comprehensive Product FAQ & Objection Handling",
    categoryId: "writing",
    description: "Structures FAQ hubs addressing pricing, security, and migration friction.",
    tags: ["writing","writing","comprehensive","product"],
    transform: createStandardSkillTransform({
      sectionName: "Comprehensive Product FAQ & Objection Handling Standards",
      ruSectionName: "Стандарты и регламенты: Comprehensive Product FAQ & Objection Handling",
      instructions: [
        "Apply core domain tenets for Comprehensive Product FAQ & Objection Handling.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Comprehensive Product FAQ & Objection Handling.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","comprehensive","product"],
    }),
  },

  "writing-enterprise-rfp-bid-proposal-response": {
    id: "writing-enterprise-rfp-bid-proposal-response",
    name: "EnterpriseRFPBidProposalResponseSkill",
    displayName: "Enterprise RFP Bid Proposal Response",
    categoryId: "writing",
    description: "Drafts compliant, winning responses to enterprise Requests for Proposal.",
    tags: ["writing","writing","enterprise","rfp"],
    transform: createStandardSkillTransform({
      sectionName: "Enterprise RFP Bid Proposal Response Standards",
      ruSectionName: "Стандарты и регламенты: Enterprise RFP Bid Proposal Response",
      instructions: [
        "Apply core domain tenets for Enterprise RFP Bid Proposal Response.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Enterprise RFP Bid Proposal Response.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","enterprise","rfp"],
    }),
  },

  "writing-investigative-journalism-expose-article": {
    id: "writing-investigative-journalism-expose-article",
    name: "InvestigativeJournalismExposeArticleSkill",
    displayName: "Investigative Journalism Expose Article",
    categoryId: "writing",
    description: "Constructs airtight investigative pieces linking verified source documents.",
    tags: ["writing","writing","investigative","journalism"],
    transform: createStandardSkillTransform({
      sectionName: "Investigative Journalism Expose Article Standards",
      ruSectionName: "Стандарты и регламенты: Investigative Journalism Expose Article",
      instructions: [
        "Apply core domain tenets for Investigative Journalism Expose Article.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Investigative Journalism Expose Article.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","investigative","journalism"],
    }),
  },

  "writing-github-repository-readme-showcase": {
    id: "writing-github-repository-readme-showcase",
    name: "GitHubRepositoryREADMEShowcaseSkill",
    displayName: "GitHub Repository README Showcase",
    categoryId: "writing",
    description: "Crafts engaging open-source READMEs with animated GIFs and quickstarts.",
    tags: ["writing","writing","github","repository"],
    transform: createStandardSkillTransform({
      sectionName: "GitHub Repository README Showcase Standards",
      ruSectionName: "Стандарты и регламенты: GitHub Repository README Showcase",
      instructions: [
        "Apply core domain tenets for GitHub Repository README Showcase.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для GitHub Repository README Showcase.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","github","repository"],
    }),
  },

  "writing-sales-battlecard-competitor-differentiation": {
    id: "writing-sales-battlecard-competitor-differentiation",
    name: "SalesBattlecardCompetitorDifferentiationSkill",
    displayName: "Sales Battlecard & Competitor Differentiation",
    categoryId: "writing",
    description: "Equips sales reps with objection handling and competitive trap questions.",
    tags: ["writing","writing","sales","battlecard"],
    transform: createStandardSkillTransform({
      sectionName: "Sales Battlecard & Competitor Differentiation Standards",
      ruSectionName: "Стандарты и регламенты: Sales Battlecard & Competitor Differentiation",
      instructions: [
        "Apply core domain tenets for Sales Battlecard & Competitor Differentiation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sales Battlecard & Competitor Differentiation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","sales","battlecard"],
    }),
  },

  "writing-customer-advisory-board-strategic-briefing": {
    id: "writing-customer-advisory-board-strategic-briefing",
    name: "CustomerAdvisoryBoardStrategicBriefingSkill",
    displayName: "Customer Advisory Board Strategic Briefing",
    categoryId: "writing",
    description: "Prepares C-suite agendas and confidential roadmap previews.",
    tags: ["writing","writing","customer","advisory"],
    transform: createStandardSkillTransform({
      sectionName: "Customer Advisory Board Strategic Briefing Standards",
      ruSectionName: "Стандарты и регламенты: Customer Advisory Board Strategic Briefing",
      instructions: [
        "Apply core domain tenets for Customer Advisory Board Strategic Briefing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Customer Advisory Board Strategic Briefing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","customer","advisory"],
    }),
  },

  "writing-security-trust-center-whitepaper": {
    id: "writing-security-trust-center-whitepaper",
    name: "SecurityTrustCenterWhitepaperSkill",
    displayName: "Security & Trust Center Whitepaper",
    categoryId: "writing",
    description: "Details enterprise encryption, tenant isolation, and SOC2 compliance.",
    tags: ["writing","writing","security","trust"],
    transform: createStandardSkillTransform({
      sectionName: "Security & Trust Center Whitepaper Standards",
      ruSectionName: "Стандарты и регламенты: Security & Trust Center Whitepaper",
      instructions: [
        "Apply core domain tenets for Security & Trust Center Whitepaper.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Security & Trust Center Whitepaper.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","security","trust"],
    }),
  },

  "writing-classic-direct-response-sales-letter": {
    id: "writing-classic-direct-response-sales-letter",
    name: "ClassicDirectResponseSalesLetterSkill",
    displayName: "Classic Direct-Response Sales Letter",
    categoryId: "writing",
    description: "Structures high-converting long-form direct-response sales copy.",
    tags: ["writing","writing","classic","direct"],
    transform: createStandardSkillTransform({
      sectionName: "Classic Direct-Response Sales Letter Standards",
      ruSectionName: "Стандарты и регламенты: Classic Direct-Response Sales Letter",
      instructions: [
        "Apply core domain tenets for Classic Direct-Response Sales Letter.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Classic Direct-Response Sales Letter.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","classic","direct"],
    }),
  },

  "writing-product-hunt-launch-kit-maker-comment": {
    id: "writing-product-hunt-launch-kit-maker-comment",
    name: "ProductHuntLaunchKitMakerCommentSkill",
    displayName: "Product Hunt Launch Kit & Maker Comment",
    categoryId: "writing",
    description: "Crafts Product Hunt taglines, maker stories, and launch Q&A replies.",
    tags: ["writing","writing","product","hunt"],
    transform: createStandardSkillTransform({
      sectionName: "Product Hunt Launch Kit & Maker Comment Standards",
      ruSectionName: "Стандарты и регламенты: Product Hunt Launch Kit & Maker Comment",
      instructions: [
        "Apply core domain tenets for Product Hunt Launch Kit & Maker Comment.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Product Hunt Launch Kit & Maker Comment.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","product","hunt"],
    }),
  },

  "writing-ted-talk-storytelling-narrative-arc": {
    id: "writing-ted-talk-storytelling-narrative-arc",
    name: "TEDTalkStorytellingNarrativeArcSkill",
    displayName: "TED Talk Storytelling Narrative Arc",
    categoryId: "writing",
    description: "Structures captivating 15-minute talks around an 'idea worth spreading'.",
    tags: ["writing","writing","ted","talk"],
    transform: createStandardSkillTransform({
      sectionName: "TED Talk Storytelling Narrative Arc Standards",
      ruSectionName: "Стандарты и регламенты: TED Talk Storytelling Narrative Arc",
      instructions: [
        "Apply core domain tenets for TED Talk Storytelling Narrative Arc.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для TED Talk Storytelling Narrative Arc.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","ted","talk"],
    }),
  },

  "writing-jobs-to-be-done-jtbd-user-persona-profile": {
    id: "writing-jobs-to-be-done-jtbd-user-persona-profile",
    name: "JobstobeDoneJTBDUserPersonaProfileSkill",
    displayName: "Jobs-to-be-Done (JTBD) User Persona Profile",
    categoryId: "writing",
    description: "Creates customer profiles based on functional, emotional, and social jobs.",
    tags: ["writing","writing","jobs","to"],
    transform: createStandardSkillTransform({
      sectionName: "Jobs-to-be-Done (JTBD) User Persona Profile Standards",
      ruSectionName: "Стандарты и регламенты: Jobs-to-be-Done (JTBD) User Persona Profile",
      instructions: [
        "Apply core domain tenets for Jobs-to-be-Done (JTBD) User Persona Profile.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Jobs-to-be-Done (JTBD) User Persona Profile.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","jobs","to"],
    }),
  },

  "writing-engineering-design-document-rfc": {
    id: "writing-engineering-design-document-rfc",
    name: "EngineeringDesignDocumentRFCSkill",
    displayName: "Engineering Design Document (RFC)",
    categoryId: "writing",
    description: "Structures technical RFCs covering non-goals, architecture, and rollbacks.",
    tags: ["writing","writing","engineering","design"],
    transform: createStandardSkillTransform({
      sectionName: "Engineering Design Document (RFC) Standards",
      ruSectionName: "Стандарты и регламенты: Engineering Design Document (RFC)",
      instructions: [
        "Apply core domain tenets for Engineering Design Document (RFC).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Engineering Design Document (RFC).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","engineering","design"],
    }),
  },

  "writing-promotion-packet-impact-brag-sheet": {
    id: "writing-promotion-packet-impact-brag-sheet",
    name: "PromotionPacketImpactBragSheetSkill",
    displayName: "Promotion Packet & Impact Brag Sheet",
    categoryId: "writing",
    description: "Compiles convincing promotion packets linking technical wins to revenue.",
    tags: ["writing","writing","promotion","packet"],
    transform: createStandardSkillTransform({
      sectionName: "Promotion Packet & Impact Brag Sheet Standards",
      ruSectionName: "Стандарты и регламенты: Promotion Packet & Impact Brag Sheet",
      instructions: [
        "Apply core domain tenets for Promotion Packet & Impact Brag Sheet.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Promotion Packet & Impact Brag Sheet.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","promotion","packet"],
    }),
  },

  "writing-dual-column-terms-of-service-plain-summary": {
    id: "writing-dual-column-terms-of-service-plain-summary",
    name: "DualColumnTermsofServicePlainSummarySkill",
    displayName: "Dual-Column Terms of Service Plain Summary",
    categoryId: "writing",
    description: "Presents legal TOS alongside friendly plain-English side-by-side notes.",
    tags: ["writing","writing","dual","column"],
    transform: createStandardSkillTransform({
      sectionName: "Dual-Column Terms of Service Plain Summary Standards",
      ruSectionName: "Стандарты и регламенты: Dual-Column Terms of Service Plain Summary",
      instructions: [
        "Apply core domain tenets for Dual-Column Terms of Service Plain Summary.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Dual-Column Terms of Service Plain Summary.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","dual","column"],
    }),
  },

  "writing-nonprofit-grant-proposal-theory-of-change": {
    id: "writing-nonprofit-grant-proposal-theory-of-change",
    name: "NonprofitGrantProposalTheoryofChangeSkill",
    displayName: "Nonprofit Grant Proposal & Theory of Change",
    categoryId: "writing",
    description: "Constructs grant proposals demonstrating measurable social impact.",
    tags: ["writing","writing","nonprofit","grant"],
    transform: createStandardSkillTransform({
      sectionName: "Nonprofit Grant Proposal & Theory of Change Standards",
      ruSectionName: "Стандарты и регламенты: Nonprofit Grant Proposal & Theory of Change",
      instructions: [
        "Apply core domain tenets for Nonprofit Grant Proposal & Theory of Change.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Nonprofit Grant Proposal & Theory of Change.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","nonprofit","grant"],
    }),
  },

  "writing-thoughtful-linkedin-thought-leadership-post": {
    id: "writing-thoughtful-linkedin-thought-leadership-post",
    name: "ThoughtfulLinkedInThoughtLeadershipPostSkill",
    displayName: "Thoughtful LinkedIn Thought Leadership Post",
    categoryId: "writing",
    description: "Crafts high-engagement LinkedIn posts with strong hook headlines.",
    tags: ["writing","writing","thoughtful","linkedin"],
    transform: createStandardSkillTransform({
      sectionName: "Thoughtful LinkedIn Thought Leadership Post Standards",
      ruSectionName: "Стандарты и регламенты: Thoughtful LinkedIn Thought Leadership Post",
      instructions: [
        "Apply core domain tenets for Thoughtful LinkedIn Thought Leadership Post.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Thoughtful LinkedIn Thought Leadership Post.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","thoughtful","linkedin"],
    }),
  },

  "writing-customer-offboarding-exit-survey-copy": {
    id: "writing-customer-offboarding-exit-survey-copy",
    name: "CustomerOffboardingExitSurveyCopySkill",
    displayName: "Customer Offboarding & Exit Survey Copy",
    categoryId: "writing",
    description: "Writes empathetic cancellation flows that gather honest exit feedback.",
    tags: ["writing","writing","customer","offboarding"],
    transform: createStandardSkillTransform({
      sectionName: "Customer Offboarding & Exit Survey Copy Standards",
      ruSectionName: "Стандарты и регламенты: Customer Offboarding & Exit Survey Copy",
      instructions: [
        "Apply core domain tenets for Customer Offboarding & Exit Survey Copy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Customer Offboarding & Exit Survey Copy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","customer","offboarding"],
    }),
  },

  "writing-internal-employee-policy-announcement": {
    id: "writing-internal-employee-policy-announcement",
    name: "InternalEmployeePolicyAnnouncementSkill",
    displayName: "Internal Employee Policy Announcement",
    categoryId: "writing",
    description: "Communicates company policy changes with clarity and transparency.",
    tags: ["writing","writing","internal","employee"],
    transform: createStandardSkillTransform({
      sectionName: "Internal Employee Policy Announcement Standards",
      ruSectionName: "Стандарты и регламенты: Internal Employee Policy Announcement",
      instructions: [
        "Apply core domain tenets for Internal Employee Policy Announcement.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Internal Employee Policy Announcement.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","internal","employee"],
    }),
  },

  "writing-investor-pitch-deck-speaker-notes": {
    id: "writing-investor-pitch-deck-speaker-notes",
    name: "InvestorPitchDeckSpeakerNotesSkill",
    displayName: "Investor Pitch Deck Speaker Notes",
    categoryId: "writing",
    description: "Prepares spoken slide-by-side scripts for startup founder pitch decks.",
    tags: ["writing","writing","investor","pitch"],
    transform: createStandardSkillTransform({
      sectionName: "Investor Pitch Deck Speaker Notes Standards",
      ruSectionName: "Стандарты и регламенты: Investor Pitch Deck Speaker Notes",
      instructions: [
        "Apply core domain tenets for Investor Pitch Deck Speaker Notes.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Investor Pitch Deck Speaker Notes.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","investor","pitch"],
    }),
  },

  "writing-product-feature-announcement-blog-post": {
    id: "writing-product-feature-announcement-blog-post",
    name: "ProductFeatureAnnouncementBlogPostSkill",
    displayName: "Product Feature Announcement Blog Post",
    categoryId: "writing",
    description: "Writes exciting product feature announcement posts highlighting benefits.",
    tags: ["writing","writing","product","feature"],
    transform: createStandardSkillTransform({
      sectionName: "Product Feature Announcement Blog Post Standards",
      ruSectionName: "Стандарты и регламенты: Product Feature Announcement Blog Post",
      instructions: [
        "Apply core domain tenets for Product Feature Announcement Blog Post.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Product Feature Announcement Blog Post.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","product","feature"],
    }),
  },

  "writing-technical-troubleshooting-knowledge-base": {
    id: "writing-technical-troubleshooting-knowledge-base",
    name: "TechnicalTroubleshootingKnowledgeBaseSkill",
    displayName: "Technical Troubleshooting Knowledge Base",
    categoryId: "writing",
    description: "Authors step-by-step troubleshooting articles for common user bugs.",
    tags: ["writing","writing","technical","troubleshooting"],
    transform: createStandardSkillTransform({
      sectionName: "Technical Troubleshooting Knowledge Base Standards",
      ruSectionName: "Стандарты и регламенты: Technical Troubleshooting Knowledge Base",
      instructions: [
        "Apply core domain tenets for Technical Troubleshooting Knowledge Base.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Technical Troubleshooting Knowledge Base.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","technical","troubleshooting"],
    }),
  },

  "writing-b2b-sales-proposal-follow-up-email": {
    id: "writing-b2b-sales-proposal-follow-up-email",
    name: "B2BSalesProposalFollowUpEmailSkill",
    displayName: "B2B Sales Proposal Follow-Up Email",
    categoryId: "writing",
    description: "Drafts polite, high-converting follow-up emails after enterprise demos.",
    tags: ["writing","writing","b2b","sales"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Sales Proposal Follow-Up Email Standards",
      ruSectionName: "Стандарты и регламенты: B2B Sales Proposal Follow-Up Email",
      instructions: [
        "Apply core domain tenets for B2B Sales Proposal Follow-Up Email.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Sales Proposal Follow-Up Email.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","b2b","sales"],
    }),
  },

  "writing-community-guidelines-conduct-policy": {
    id: "writing-community-guidelines-conduct-policy",
    name: "CommunityGuidelinesConductPolicySkill",
    displayName: "Community Guidelines & Conduct Policy",
    categoryId: "writing",
    description: "Establishes clear, welcoming community behavior standards and rules.",
    tags: ["writing","writing","community","guidelines"],
    transform: createStandardSkillTransform({
      sectionName: "Community Guidelines & Conduct Policy Standards",
      ruSectionName: "Стандарты и регламенты: Community Guidelines & Conduct Policy",
      instructions: [
        "Apply core domain tenets for Community Guidelines & Conduct Policy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Community Guidelines & Conduct Policy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","community","guidelines"],
    }),
  },

  "writing-sponsorship-deck-partner-media-kit": {
    id: "writing-sponsorship-deck-partner-media-kit",
    name: "SponsorshipDeckPartnerMediaKitSkill",
    displayName: "Sponsorship Deck & Partner Media Kit",
    categoryId: "writing",
    description: "Creates compelling media kit copy detailing audience metrics and reach.",
    tags: ["writing","writing","sponsorship","deck"],
    transform: createStandardSkillTransform({
      sectionName: "Sponsorship Deck & Partner Media Kit Standards",
      ruSectionName: "Стандарты и регламенты: Sponsorship Deck & Partner Media Kit",
      instructions: [
        "Apply core domain tenets for Sponsorship Deck & Partner Media Kit.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sponsorship Deck & Partner Media Kit.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing","sponsorship","deck"],
    }),
  },
  "writing-final-worldbuilding-fictional-magic-system-rule-creation": {
    id: "writing-final-worldbuilding-fictional-magic-system-rule-creation",
    name: "WorldbuildingFictionalMagicSystemRuleCreationSkill",
    displayName: "Worldbuilding Fictional Magic System Rule Creation",
    categoryId: "writing",
    description: "Establishes hard vs soft magic rules, costs, and limitations for fantasy fiction.",
    tags: ["writing","writing-final","final","worldbuilding"],
    transform: createStandardSkillTransform({
      sectionName: "Worldbuilding Fictional Magic System Rule Creation Standards",
      ruSectionName: "Стандарты и регламенты: Worldbuilding Fictional Magic System Rule Creation",
      instructions: [
        "Apply core domain tenets for Worldbuilding Fictional Magic System Rule Creation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Worldbuilding Fictional Magic System Rule Creation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing-final","final","worldbuilding"],
    }),
  },

  "writing-final-high-stakes-speechwriting-rhetorical-metaphor": {
    id: "writing-final-high-stakes-speechwriting-rhetorical-metaphor",
    name: "HighStakesSpeechwritingRhetoricalMetaphorSkill",
    displayName: "High-Stakes Speechwriting Rhetorical Metaphor",
    categoryId: "writing",
    description: "Crafts keynote speeches using tricolons, anaphora, and memorable metaphors.",
    tags: ["writing","writing-final","final","high"],
    transform: createStandardSkillTransform({
      sectionName: "High-Stakes Speechwriting Rhetorical Metaphor Standards",
      ruSectionName: "Стандарты и регламенты: High-Stakes Speechwriting Rhetorical Metaphor",
      instructions: [
        "Apply core domain tenets for High-Stakes Speechwriting Rhetorical Metaphor.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для High-Stakes Speechwriting Rhetorical Metaphor.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing-final","final","high"],
    }),
  },

  "writing-final-technical-whitepaper-executive-summary-framing": {
    id: "writing-final-technical-whitepaper-executive-summary-framing",
    name: "TechnicalWhitepaperExecutiveSummaryFramingSkill",
    displayName: "Technical Whitepaper Executive Summary Framing",
    categoryId: "writing",
    description: "Condenses complex enterprise technology innovations into persuasive executive whitepapers.",
    tags: ["writing","writing-final","final","technical"],
    transform: createStandardSkillTransform({
      sectionName: "Technical Whitepaper Executive Summary Framing Standards",
      ruSectionName: "Стандарты и регламенты: Technical Whitepaper Executive Summary Framing",
      instructions: [
        "Apply core domain tenets for Technical Whitepaper Executive Summary Framing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Technical Whitepaper Executive Summary Framing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing-final","final","technical"],
    }),
  },

  "writing-final-master-creative-professional-prose-crafting": {
    id: "writing-final-master-creative-professional-prose-crafting",
    name: "MasterCreativeProfessionalProseCraftingSkill",
    displayName: "Master Creative Professional Prose Crafting",
    categoryId: "writing",
    description: "Enforces world-class prose, storytelling, persuasive copy, and editorial excellence.",
    tags: ["writing","writing-final","final","master"],
    transform: createStandardSkillTransform({
      sectionName: "Master Creative Professional Prose Crafting Standards",
      ruSectionName: "Стандарты и регламенты: Master Creative Professional Prose Crafting",
      instructions: [
        "Apply core domain tenets for Master Creative Professional Prose Crafting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Master Creative Professional Prose Crafting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["writing","writing-final","final","master"],
    }),
  },
};

