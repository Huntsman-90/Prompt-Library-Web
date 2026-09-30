import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const CREATIVE_SKILLS: Record<string, SkillDefinition> = {
  'worldbuilding-lore-engine': {
    id: 'worldbuilding-lore-engine',
    name: 'WorldbuildingLoreEngineSkill',
    displayName: 'Deep Worldbuilding & Lore Architecture',
    categoryId: 'creative',
    description: 'Constructs immersive fictional universes: magic/tech systems, geopolitical factions, history, and physical geography.',
    tags: ['creative', 'worldbuilding', 'lore', 'fiction', 'fantasy', 'sci-fi', 'storytelling'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Архитектура Миростроения и Лор Вселенной (Worldbuilding)',
        'Deep Worldbuilding & Lore Architecture Protocol',
        [
          '- **Системные законы мира**: Сформулировать непреложные правила физики, магии или технологий с их ограничениями и ценой использования.',
          '- **Геополитика и фракции**: Описать минимум 3 конкурирующие фракции с несовместимыми идеологиями и ресурсами.',
          '- **Исторический контекст**: Задать ключевое историческое событие («Катастрофа 100 лет назад»), сформировавшее современный ландшафт.',
        ],
        [
          '- **Axiomatic World Laws**: Define hard constraints of magic/technology systems, including physical limits and energetic costs.',
          '- **Geopolitical Faction Mesh**: Detail at least 3 competing factions with opposing ideologies, resource monopolies, and internal tensions.',
          '- **Foundational Historical Lore**: Anchor current cultural realities in a transformative epochal event that reshaped civilization.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'sensory-vivid-prose': {
    id: 'sensory-vivid-prose',
    name: 'SensoryVividProseSkill',
    displayName: '5-Sense Immersive Prose & Imagery',
    categoryId: 'creative',
    description: 'Elevates prose through multi-sensory immersion: tactile textures, olfactory notes, auditory resonance, and visual lighting.',
    tags: ['creative', 'prose', 'sensory', 'imagery', 'immersion', 'writing'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Мультисенсорное Описание (5 Органов Чувств)',
        '5-Sense Immersive Prose & Spatial Atmosphere',
        [
          '- **Полный спектр чувств**: Включить в сцену осязание (текстура, температура), обоняние (запахи), слух (фоновые звуки) и свет/тени.',
          '- **Показывай, а не рассказывай (Show, Don\'t Tell)**: Вместо «ему было холодно» описать онемевшие пальцы и пар изо рта.',
          '- **Атмосферный накал**: Использовать предметные детали окружающей обстановки для передачи внутреннего состояния героя.',
        ],
        [
          '- **5-Sense Palette**: Weave tactile textures, olfactory nuances, ambient acoustics, and lighting dynamics into descriptive passages.',
          '- **Show, Don\'t Tell Standard**: Replace abstract adjectives ("he was terrified") with visceral physiological realities (rapid pulse, shallow breath).',
          '- **Objective Correlative**: Harness spatial environmental artifacts to mirror the protagonist\'s underlying psychological state.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'dialogue-subtext-voice': {
    id: 'dialogue-subtext-voice',
    name: 'DialogueSubtextVoiceSkill',
    displayName: 'Character Subtext & Idiolect Distinctiveness',
    categoryId: 'creative',
    description: 'Engineers authentic character dialogue with unspoken subtext, distinct speech cadences (idiolect), and conflicting hidden agendas.',
    tags: ['creative', 'dialogue', 'subtext', 'idiolect', 'characters', 'voice'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Диалог с Подтекстом и Уникальным Идиолектом',
        'Dialogue Subtext & Distinct Character Idiolect',
        [
          '- **Скрытый подтекст (Subtext)**: Персонажи не должны говорить о своих истинных чувствах прямо в лоб; истинный смысл читается между строк.',
          '- **Уникальный голос каждого героя**: Индивидуальный ритм речи, любимые словечки, профессиональный жаргон и длина фраз для каждого персонажа.',
          '- **Конфликт скрытых целей**: В каждом диалоге участники преследуют разные скрытые намерения.',
        ],
        [
          '- **Unspoken Subtext**: Prohibit characters from speaking their raw inner desires explicitly; embed meaning in tactical subtext.',
          '- **Distinct Idiolect Cadence**: Calibrate unique sentence rhythms, vocabularies, and speech quirks per character.',
          '- **Colliding Hidden Agendas**: Ensure participants enter conversational scenes with opposing unstated micro-objectives.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'poetic-meter-rhyme-craft': {
    id: 'poetic-meter-rhyme-craft',
    name: 'PoeticMeterRhymeCraftSkill',
    displayName: 'Strict Poetic Meter & Prosody Engine',
    categoryId: 'creative',
    description: 'Enforces strict classical poetic meters (iambic pentameter, anapestic tetrameter, Shakespearean sonnet, Japanese haiku 5-7-5).',
    tags: ['creative', 'poetry', 'meter', 'prosody', 'sonnet', 'rhyme', 'verse'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'constraints',
        'Соблюдение Стихотворного Размера и Рифмы',
        'Strict Poetic Meter & Prosodic Rhythm Constraints',
        [
          '- **Безупречный стихотворный размер**: Строго выдерживать стопы и ударения (ямб, хорей, дактиль или амфибрахий) без сбоев ритма.',
          '- **Схема рифмовки**: Соблюдать заданную схему рифмовки (`AABB`, `ABAB` или `ABBA`) с точными, неизбитыми рифмами.',
          '- **Глубина образов**: Избегать банальных рифм («любовь/кровь», «день/тень»); использовать оригинальные свежие метафоры.',
        ],
        [
          '- **Pristine Metrical Rhythm**: Enforce unyielding syllable-stress counts across lines (Iambic Pentameter, Trochaic Tetrameter).',
          '- **Rigorous Rhyme Scheme**: Adhere strictly to declared stanza rhyming architectures (`ABAB`, `AABB`, or Petrarchan sonnet structure).',
          '- **Non-Cliché Imagery**: Discard tired poetic tropes; weave unexpected, evocative metaphorical associations.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'screenplay-slugline-format': {
    id: 'screenplay-slugline-format',
    name: 'ScreenplaySluglineFormatSkill',
    displayName: 'Standard Screenplay Industry Formatting',
    categoryId: 'creative',
    description: 'Formats dramatic scenes in standard Hollywood screenplay syntax: SLUGLINES (INT./EXT.), ACTION, CHARACTER, PARENTHETICAL, DIALOGUE.',
    tags: ['creative', 'screenplay', 'script', 'hollywood', 'formatting', 'cinema'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Кинодраматургический Формат Сценария (Screenplay Spec)',
        'Standard Screenplay & Cinematic Slugline Format',
        [
          '- **Слаглайны (Scene Headings)**: Формат `INT. LOBBY - NIGHT` или `EXT. ROOFTOP - DAWN` строго заглавными буквами.',
          '- **Описания действий (Action)**: Лаконичные описания в настоящем времени только того, что видит и слышит камера.',
          '- **Оформление диалогов**: Имя персонажа по центру заглавными буквами, реплика с отступом, ремарки `(parentheticals)` только при необходимости.',
        ],
        [
          '- **Standard Sluglines**: Uppercase scene headings formatted as `INT. LOCATION - TIME` or `EXT. LOCATION - TIME`.',
          '- **Action Blocks**: Present-tense, visual-only cinematic descriptions stripped of unfilmable internal character monologue.',
          '- **Dialogue Blocks**: Centered uppercase character name, parenthetical cues sparingly applied, and indented dialogue text.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'lateral-metaphor-juxtaposition': {
    id: 'lateral-metaphor-juxtaposition',
    name: 'LateralMetaphorJuxtapositionSkill',
    displayName: 'Lateral Conceptual Metaphor Juxtaposition',
    categoryId: 'creative',
    description: 'Juxtaposes disparate, unrelated domains (e.g. quantum mechanics with medieval cooking) to spark novel insights.',
    tags: ['creative', 'lateral-thinking', 'metaphor', 'juxtaposition', 'creativity', 'originality'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Латеральное Сопоставление и Неожиданные Метафоры',
        'Lateral Conceptual Juxtaposition Protocol',
        [
          '- **Скрещивание далеких доменов**: Объединить ключевую идею с концепциями из совершенно иной области (биология, астрофизика, архитектура, музыка).',
          '- **Поиск скрытых связей**: Раскрыть не очевидные параллели, которые меняют привычный взгляд на проблему.',
          '- **Свежесть восприятия**: Сгенерировать оригинальный инсайт, ломающий шаблонное мышление.',
        ],
        [
          '- **Distant Domain Fusion**: Cross-pollinate the core theme with concepts from orthogonal disciplines (quantum optics, mycological networks, jazz improvisation).',
          '- **Non-Obvious Structural Parallels**: Map deep systemic isomorphisms between distant paradigms.',
          '- **Perceptual Defamiliarization**: Disorient stale mental models to produce breakthrough creative resonance.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'hero-monomyth-journey': {
    id: 'hero-monomyth-journey',
    name: 'HeroMonomythJourneySkill',
    displayName: 'Campbell 12-Stage Hero\'s Journey Monomyth',
    categoryId: 'creative',
    description: 'Applies Joseph Campbell\'s 12-stage monomyth: Ordinary World, Call to Adventure, Ordeal, Resurrection, Return with Elixir.',
    tags: ['creative', 'monomyth', 'heros-journey', 'campbell', 'mythology', 'narrative'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Путь Героя по Джозефу Кэмпбеллу (12-Stage Monomyth)',
        'Joseph Campbell 12-Stage Hero\'s Journey Monomyth',
        [
          '- **12 Стадий пути**: 1. Обычный мир, 2. Зов странствий, 3. Отвержение зова, 4. Встреча с наставником, 5. Переход через порог, 6. Испытания и враги, 7. Приближение к сокровенной пещере, 8. Главное испытание (Ordeal), 9. Награда, 10. Обратный путь, 11. Возрождение, 12. Возвращение с эликсиром.',
          '- **Внутренняя трансформация**: Показать, как внешние испытания меняют фундаментальные ценности героя.',
          '- **Архетипы персонажей**: Интегрировать архетипы: Трикстер, Привратник, Тень, Наставник.',
        ],
        [
          '- **12-Stage Archetypal Arc**: Map the classic progression from Ordinary World through The Ordeal to Return with the Elixir.',
          '- **Psychological Metamorphosis**: Mirror physical trials against the internal death-and-rebirth of the protagonist\'s ego.',
          '- **Character Archetypes**: Populate narrative with Threshold Guardians, Shapeshifters, Mentors, and the Shadow.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'unreliable-narrator-craft': {
    id: 'unreliable-narrator-craft',
    name: 'UnreliableNarratorCraftSkill',
    displayName: 'Unreliable Narrator & Cognitive Bias',
    categoryId: 'creative',
    description: 'Crafts narratives with unreliable narrators, planting subtle memory discrepancies and subjective distortions.',
    tags: ['creative', 'unreliable-narrator', 'perspective', 'mystery', 'psychology', 'fiction'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Техника Ненадежного Рассказчика (Unreliable Narrator)',
        'Unreliable Narrator & Cognitive Distortion Protocol',
        [
          '- **Скрытые искажения**: Рассказчик искренне верит в свою версию событий, но оставляет незаметные противоречия в хронологии и деталях.',
          '- **Двойное дно**: Создать зазор между тем, как ситуацию видит рассказчик, и объективной реальностью, понятной внимательному читателю.',
          '- **Финальное прозрение / Твист**: Позволить читателю самостоятельно сложить истинную картину происходящего по разбросанным уликам.',
        ],
        [
          '- **Cognitive Bias Seeding**: Weave subtle chronological discrepancies and self-serving rationalizations into the narrator\'s account.',
          '- **Dramatic Irony Gap**: Establish a widening divide between the narrator\'s subjective rationalization and objective reality.',
          '- **Evidentiary Breadcrumbs**: Plant subtle environmental clues allowing the perceptive reader to reconstruct the unvarnished truth.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'character-fatal-flaw-hamartia': {
    id: 'character-fatal-flaw-hamartia',
    name: 'CharacterFatalFlawHamartiaSkill',
    displayName: 'Tragic Flaw & Hamartia Engine',
    categoryId: 'creative',
    description: 'Constructs characters around fatal tragic flaws (Hamartia/Hubris) that directly drive their choices and catastrophic downfall.',
    tags: ['creative', 'hamartia', 'tragic-flaw', 'character', 'drama', 'hubris'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Трагический Изъян Персонажа (Hamartia & Hubris)',
        'Character Tragic Flaw & Hamartia Architecture',
        [
          '- **Ядро изъяна (Hamartia)**: Определить главный внутренний порок (гордыня, недоверие, жажда контроля), маскирующийся под добродетель.',
          '- **Роковое решение**: Поставить героя перед выбором, где его изъян неизбежно заставляет его совершить катастрофическую ошибку.',
          '- **Катарсис и осознание**: Кульминация должна приводить к горькому запоздалому осознанию своей ошибки.',
        ],
        [
          '- **Core Flaw Anchoring**: Design a fatal character trait (pride, obsession, paranoia) that masquerades as their greatest strength.',
          '- **Fatal Decision Nexus**: Force the protagonist into a high-stakes dilemma where their tragic flaw dictates the disastrous choice.',
          '- **Anagnorisis & Catharsis**: Culminate in the painful moment of delayed recognition where the character confronts their downfall.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'suspense-cliffhanger-pacing': {
    id: 'suspense-cliffhanger-pacing',
    name: 'SuspenseCliffhangerPacingSkill',
    displayName: 'Suspense, Ticking Clock & Cliffhanger Pacing',
    categoryId: 'creative',
    description: 'Injects high-velocity suspense: ticking clock countdowns, dramatic irony, micro-tensions, and breathless cliffhangers.',
    tags: ['creative', 'suspense', 'cliffhanger', 'tension', 'thriller', 'pacing'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Нагнетание Саспенса и Клиффхэнгеры (Ticking Clock)',
        'Suspense, Ticking Clock & Cliffhanger Protocol',
        [
          '- **Тикающие часы (Ticking Clock)**: Ввести жесткий временной лимит (до взрыва осталось 3 минуты, до закрытия шлюза 10 секунд).',
          '- **Драматическая ирония**: Сообщить читателю об опасности, о которой герой пока не подозревает, для максимального напряжения.',
          '- **Оборванный финал сцены (Cliffhanger)**: Завершать сцену на пике неизвестности или внезапном раскрытии тайны.',
        ],
        [
          '- **Explicit Ticking Clock**: Impose an uncompromising physical countdown constraint amplifying stakes.',
          '- **Dramatic Irony Mechanics**: Reveal approaching catastrophe to the audience while keeping the protagonist unaware.',
          '- **Breathless Cliffhangers**: End narrative segments at the exact threshold of shock, revelation, or physical peril.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'speculative-fiction-worlding': {
    id: 'speculative-fiction-worlding',
    name: 'SpeculativeFictionWorldingSkill',
    displayName: 'Hard Sci-Fi Speculative Technology Engine',
    categoryId: 'creative',
    description: 'Extrapolates grounded hard sci-fi technologies based on cutting-edge theoretical physics, synthetic biology, and cybernetics.',
    tags: ['creative', 'sci-fi', 'hard-scifi', 'speculative', 'physics', 'future'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Твердая Научная Фантастика (Hard Sci-Fi Extrapolation)',
        'Hard Sci-Fi Speculative Extrapolation Protocol',
        [
          '- **Научная обоснованность**: Опираться на реальные теории современной физики (квантовая запутанность, гравитационные волны, двигатель Алькубьерре).',
          '- **Социальные последствия технологии**: Описать, как изобретение меняет структуру общества, преступность, этику и язык.',
          '- **Техническая правдоподобность**: Использовать точные научные термины и спецификации оборудования.',
        ],
        [
          '- **Theoretical Physics Grounding**: Anchor speculative technologies in real theoretical physics (Alcubierre metrics, Casimir effect, CRISPR synthetic gene drives).',
          '- **Socio-Cultural Fallout**: Detail how technological ubiquity transforms jurisprudence, class disparity, and linguistics.',
          '- **Plausible Engineering Terminology**: Render technological artifacts with rigorous, mechanically plausible engineering specifications.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'micro-fiction-flash-story': {
    id: 'micro-fiction-flash-story',
    name: 'MicroFictionFlashStorySkill',
    displayName: 'High-Density Flash Fiction (100-300 Words)',
    categoryId: 'creative',
    description: 'Condenses an entire emotional and narrative arc into 100-300 breathless words with a devastating final twist.',
    tags: ['creative', 'flash-fiction', 'micro-story', 'short-story', 'twist', 'concise'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Формат Микропрозы (Flash Fiction / 100-300 Слов)',
        'High-Density Flash Fiction Specification',
        [
          '- **Предельная лаконичность (100-300 слов)**: Каждое слово несет сюжетную нагрузку; ни одной лишней вводной фразы.',
          '- **Полноценная дуга сюжета**: Завязка в первом предложении, развитие за 2 абзаца и кульминация.',
          '- **Неожиданный финальный твист**: Последняя фраза переворачивает все восприятие истории с ног на голову.',
        ],
        [
          '- **Extreme Word Count Bounds (100-300 Words)**: Maximize narrative compression; every single noun and verb must carry structural weight.',
          '- **Complete Narrative Arc**: Accelerate from setup to turning point within three compact paragraphs.',
          '- **Devastating Final Inversion**: Deliver a final sentence that completely reframes the reader\'s understanding of the preceding text.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'satire-parody-wit': {
    id: 'satire-parody-wit',
    name: 'SatireParodyWitSkill',
    displayName: 'Swiftian Satire & Deadpan Parody',
    categoryId: 'creative',
    description: 'Crafts razor-sharp political or corporate satire using deadpan seriousness to magnify absurdities.',
    tags: ['creative', 'satire', 'parody', 'humor', 'wit', 'irony'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Сатира и Пародия (Swiftian Satire & Deadpan Wit)',
        'Swiftian Satire & Deadpan Parody Protocol',
        [
          '- **Серьезный тон при абсурдном содержании**: Излагать безумную идею с безупречно серьезным академическим или корпоративным видом.',
          '- **Вскрытие системных пороков**: Направлять сатиру на реальные пороки (бюрократия, жадность, корпоративный буллшит).',
          '- **Тонкая ирония**: Избегать плоского юмора; позволить читателю самому почувствовать саркастический контраст.',
        ],
        [
          '- **Deadpan Earnestness**: Present an absurd, dystopian proposition with an utterly straight-faced, formal institutional demeanor.',
          '- **Systemic Hypocrisy Exposure**: Target deep institutional absurdities (corporate surveillance, performative bureaucracy, unhinged metrics).',
          '- **Subtle Layered Irony**: Avoid slapstick; let cognitive dissonance deliver the sharp intellectual punchline.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'synesthesia-imagery-weaving': {
    id: 'synesthesia-imagery-weaving',
    name: 'SynesthesiaImageryWeavingSkill',
    displayName: 'Synesthetic Imagery & Sensory Cross-Wiring',
    categoryId: 'creative',
    description: 'Weaves poetic synesthetic descriptions by crossing sensory wires (tasting colors, hearing textures, smelling geometries).',
    tags: ['creative', 'synesthesia', 'imagery', 'poetics', 'avant-garde', 'perception'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Синестетическое Скрещивание Чувств (Synesthetic Imagery)',
        'Synesthetic Sensory Cross-Wiring Protocol',
        [
          '- **Скрещивание сенсорных модальностей**: Описывать визуальные образы через вкус («кислый зеленый свет»), звуки через текстуру («бархатный шепот басов»).',
          '- **Поэтическая свежесть**: Создавать гипнотические метафоры, расширяющие чувственное восприятие текста.',
          '- **Гармоничность в контексте**: Использовать синестезию дозировано для акцентирования ключевых кульминационных моментов.',
        ],
        [
          '- **Cross-Modal Sensory Fusion**: Describe chromatic light via gustatory notes ("metallic copper dusk") and acoustic timbres through tactile textures ("gravel-rough baritone").',
          '- **Defamiliarized Aesthetics**: Elevate narrative texture through vivid, surreal sensory crossovers.',
          '- **Climactic Resonance**: Apply synesthetic flourishes strategically at emotional and thematic zeniths.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

'show-dont-tell-sensory-amplifier': {
    id: 'show-dont-tell-sensory-amplifier',
    name: 'ShowDontTellSensoryAmplifierSkill',
    displayName: 'Show, Don\'t Tell Sensory Prose Engine',
    categoryId: 'creative',
    description: 'Replaces abstract emotional labels with visceral sensory details (olfactory, auditory, tactile, kinetic) showing inner conflict.',
    tags: ['creative', 'prose', 'show-dont-tell', 'sensory', 'writing', 'fiction'],
    transform: createStandardSkillTransform(
      'writing_style',
      'Принцип «Показывай, а не рассказывай» (Sensory Amplifier)',
      'Show, Don\'t Tell Sensory Prose Architecture',
      [
        '- **Запрет абстрактных ярлыков**: Запрещено писать «он испугался» или «ей было грустно».',
        '- **Физиологические и кинетические реакции**: Описывать холодный пот, перехваченное дыхание, дрожь в кончиках пальцев, запах сырого асфальта.',
        '- **Взаимодействие с предметами**: Показывать состояние персонажа через его обращение с вещами (сжатые кулаки, нервное перебирание ключей).',
      ],
      [
        '- **Ban Emotional Labeling**: Forbid stating characters are "furious", "terrified", or "melancholy" directly in prose.',
        '- **Visceral Somatic Telemetry**: Reveal internal psychology through kinetic markers: trembling jawline, metallic tang in mouth, shallow breathing.',
        '- **Tactile Object Interaction**: Manifest internal friction through how characters manipulate physical items (fidgeting with lighter, white-knuckling steering wheel).',
      ]
    ),
  },

  'chekhov-gun-narrative-payoff': {
    id: 'chekhov-gun-narrative-payoff',
    name: 'ChekhovGunNarrativePayoffSkill',
    displayName: 'Chekhov\'s Gun & Foreshadowing Payoff Engine',
    categoryId: 'creative',
    description: 'Plants subtle narrative details early in the story that return with dramatic thematic or plot consequences in the climax.',
    tags: ['creative', 'chekhovs-gun', 'foreshadowing', 'plot', 'narrative', 'payoff'],
    transform: createStandardSkillTransform(
      'protocol',
      'Принцип «Чеховского Ружья» и Драматического Ружья',
      'Chekhov\'s Gun & Foreshadowing Payoff Protocol',
      [
        '- **Закладка детали в экспозиции**: В первых сценах упомянуть неприметный предмет, черту характера или случайную фразу.',
        '- **Кажущаяся незначительность**: Замаскировать предмет бытовым контекстом, чтобы читатель не заподозрил прямого назначения.',
        '- **Решающий выстрел в кульминации**: Сделать заложенный элемент ключевым фактором победы или краха протагониста в финале.',
      ],
      [
        '- **Exposition Seed Placement**: Introduce a seemingly innocuous physical object, behavioral quirk, or offhand dialogue clue early in the narrative.',
        '- **Inconspicuous Camouflage**: Embed the seed in mundane slice-of-life context to prevent premature reader deduction.',
        '- **Climactic Payoff Invariant**: Elevate the seeded element to become the critical pivot deciding the protagonist\'s fate in the climax.',
      ]
    ),
  },

  'in-medias-res-opening-hook': {
    id: 'in-medias-res-opening-hook',
    name: 'InMediasResOpeningHookSkill',
    displayName: 'In Medias Res Opening Scene Catalyst',
    categoryId: 'creative',
    description: 'Launches stories directly into the middle of escalating crisis or high-stakes action, hooking readers before backstory exposition.',
    tags: ['creative', 'in-medias-res', 'hook', 'pacing', 'fiction', 'screenplay'],
    transform: createStandardSkillTransform(
      'protocol',
      'Начало с Середины Действия (In Medias Res Hook)',
      'In Medias Res Opening Scene Catalyst Protocol',
      [
        '- **Старт в эпицентре кризиса**: Первая строчка начинается с критической опасности, спора или катастрофы без предысторий.',
        '- **Информация через действие**: Знакомить читателя с миром и героями попутно, пока они спасают свою жизнь или принимают решение.',
        '- **Ретроспективные мозаики**: Позже, когда читатель эмоционально вовлечен, объяснить, как персонажи оказались в этой ситуации.',
      ],
      [
        '- **Zero Preamble Immersion**: Open sentence one directly inside acute physical or psychological crisis without expository setup.',
        '- **Action-Driven World-Grounding**: Reveal world rules and character dynamics dynamically as they navigate immediate threats.',
        '- **Phased Retrospective Context**: Weave back-story puzzle pieces into later reflective pauses once reader investment is guaranteed.',
      ]
    ),
  },

  'dialogue-subtext-tension-engine': {
    id: 'dialogue-subtext-tension-engine',
    name: 'DialogueSubtextTensionEngineSkill',
    displayName: 'Dialogue Subtext & Unspoken Tension Engine',
    categoryId: 'creative',
    description: 'Crafts layered dialogue where characters talk about mundane topics while conveying fierce underlying emotional conflict.',
    tags: ['creative', 'dialogue', 'subtext', 'tension', 'screenwriting', 'psychology'],
    transform: createStandardSkillTransform(
      'writing_style',
      'Диалог с Глубоким Подтекстом (Unspoken Subtext Tension)',
      'Dialogue Subtext & Unspoken Tension Architecture',
      [
        '- **Запрет прямой речи об эмоциях**: Персонажи говорят о чае, погоде или документах, но каждое слово пропитано скрытым конфликтом.',
        '- **Двойное дно реплик**: То, что персонаж говорит, и то, что он на самом деле имеет в виду, должны контрастировать.',
        '- **Паузы и взгляды**: Описывать заминки, отведение взгляда и оборванные фразы, передающие невысказанное.',
      ],
      [
        '- **Ban Literal Emotional Dialogue**: Forbid characters from explaining what they feel; displace emotion onto petty arguments about trivialities.',
        '- **Dual-Layered Speech**: The literal surface meaning of every sentence must directly contrast with the unspoken tactical subtext.',
        '- **Pregnant Pauses & Kinetic Avoidance**: Choreograph pauses, glances, and throat-clearing actions signaling unexpressed desire or hostility.',
      ]
    ),
  },

  'magical-realism-grounded-wonder': {
    id: 'magical-realism-grounded-wonder',
    name: 'MagicalRealismGroundedWonderSkill',
    displayName: 'Magical Realism & Mundane Wonder (Márquez Style)',
    categoryId: 'creative',
    description: 'Weaves fantastical or impossible events into mundane historical reality treated by characters with casual acceptance.',
    tags: ['creative', 'magical-realism', 'marquez', 'fiction', 'wonder', 'surreal'],
    transform: createStandardSkillTransform(
      'writing_style',
      'Магический Реализм (Стиль Маркеса и Борхеса)',
      'Magical Realism & Mundane Wonder Architecture',
      [
        '- **Обыденное отношение к чуду**: Невероятные события (дождь из желтых цветов, полет человека) описывать будничным тоном хроники.',
        '- **Приземленные бытовые детали**: Сочетать мистику с запахом керосина, ржавыми гвоздями и скрипом деревянных полов.',
        '- **Мифологический фатализм**: Судьбы героев переплетаются с древними пророчествами и цикличным временем.',
      ],
      [
        '- **Casual Miracle Demeanor**: Treat impossible wonders (raining yellow butterflies, levitation) with deadpan journalistic matter-of-factness.',
        '- **Visceral Domestic Grounding**: Anchor supernatural occurrences alongside pungent kitchen smells, chipped crockery, and rusting machinery.',
        '- **Cyclical Mythic Determinism**: Weave generational echoes and fateful prophecies into the texture of daily rural or urban struggle.',
      ]
    ),
  },

  'unreliable-narrator-psychological-depth': {
    id: 'unreliable-narrator-psychological-depth',
    name: 'UnreliableNarratorPsychologicalDepthSkill',
    displayName: 'Unreliable Narrator & Cognitive Distortion Craft',
    categoryId: 'creative',
    description: 'Constructs psychologically complex narrators whose biases, trauma, or deceit subtly distort the reality they describe.',
    tags: ['creative', 'unreliable-narrator', 'fiction', 'psychology', 'perspective', 'mystery'],
    transform: createStandardSkillTransform(
      'writing_style',
      'Ненадежный Рассказчик и Психологические Искажения',
      'Unreliable Narrator & Cognitive Distortion Protocol',
      [
        '- **Скрытый мотив искажения**: Рассказчик лжет себе или читателю из-за чувства вины, душевного расстройства или выгоды.',
        '- **Трещины в повествовании**: Оставлять тонкие несоответствия между утверждениями рассказчика и фактами окружающего мира.',
        '- **Момент озарения читателя**: Читатель должен догадаться об истинном положении вещей раньше, чем сам рассказчик.',
      ],
      [
        '- **Grounded Deceptive Motive**: Root narration unreliability in deep emotional guilt, cognitive trauma, or deliberate self-preservation.',
        '- **Narrative Fissures**: Scatter subtle objective contradictions between the narrator\'s self-justifying claims and environmental reality.',
        '- **Reader Epiphany Horizon**: Structure clues so observant readers decode the narrator\'s self-delusion ahead of explicit narrative admission.',
      ]
    ),
  },

  'noir-cynical-detective-monologue': {
    id: 'noir-cynical-detective-monologue',
    name: 'NoirCynicalDetectiveMonologueSkill',
    displayName: 'Hard-Boiled Noir Detective Internal Monologue',
    categoryId: 'creative',
    description: 'Channels classic hard-boiled noir: world-weary cynicism, rain-slicked city streets, razor-sharp similes, and moral ambiguity.',
    tags: ['creative', 'noir', 'hard-boiled', 'detective', 'cynicism', 'voice'],
    transform: createStandardSkillTransform(
      'writing_style',
      'Нуарный Внутренний Монолог Детектива (Hard-Boiled Noir)',
      'Hard-Boiled Noir Detective Voice & Monologue Architecture',
      [
        '- **Усталый циничный тон**: Голос человека, который слишком много видел и ни во что не верит.',
        '- **Острые городские сравнения**: «Неоновая вывеска моргала с частотой умирающего пульса», «Дождь смывал грязь, но не грехи».',
        '- **Моральная серость**: В этом городе нет рыцарей в белых доспехах; лучший выбор — это наименьшее из зол.',
      ],
      [
        '- **World-Weary Cynical Voice**: Deliver prose through the exhausted, gravelly lens of a gumshoe who has seen society\'s basement.',
        '- **Razor-Sharp Street Similes**: Pepper narration with dark similes ("Neon buzzing like a dentist drill", "Rain slick as cheap whiskey").',
        '- **Moral Ambiguity**: Forbid unblemished virtue; paint protagonists and villains as flawed actors navigating predatory institutional rot.',
      ]
    ),
  },

  'poetic-meter-iambic-sonnet-craft': {
    id: 'poetic-meter-iambic-sonnet-craft',
    name: 'PoeticMeterIambicSonnetSkill',
    displayName: 'Classical Poetic Meter & Shakespearean Sonnet',
    categoryId: 'creative',
    description: 'Composes formal verse in strict meter (Iambic Pentameter, Dactylic Hexameter) and classical forms (Shakespearean/Petrarchan Sonnet).',
    tags: ['creative', 'poetry', 'sonnet', 'meter', 'iambic-pentameter', 'verse'],
    transform: createStandardSkillTransform(
      'output_format',
      'Классический Сонет и Строгий Поэтический Размер (Iambic Meter)',
      'Classical Poetic Meter & Shakespearean Sonnet Specification',
      [
        '- **Строгий метр**: Выдерживать безупречный пятистопный ямб во всех 14 строках сонета.',
        '- **Схема рифмовки ABAB CDCD EFEF GG**: Три катрена, развивающие тему, и финальный куплет-поворот (Volta).',
        '- **Смысловой поворот (Volta)**: На 9-й или 13-й строке совершить эмоциональный или философский разворот темы.',
      ],
      [
        '- **Flawless Metrical Cadence**: Maintain strict uncompromised iambic pentameter across all 14 lines.',
        '- **Shakespearean Rhyme Scheme**: Enforce exact abab cdcd efef gg rhyme architecture across three quatrains and concluding rhyming couplet.',
        '- **Thematic Volta (Turn)**: Introduce a profound conceptual shift, counter-argument, or revelation at line 9 or line 13.',
      ]
    ),
  },

  'cyberpunk-dystopian-slang-lexicon': {
    id: 'cyberpunk-dystopian-slang-lexicon',
    name: 'CyberpunkDystopianSlangSkill',
    displayName: 'High-Tech Low-Life Cyberpunk Dialect',
    categoryId: 'creative',
    description: 'Builds authentic cyberpunk dialogue with synthetic street slang, neural-interface jargon, megacorp branding, and black-market argot.',
    tags: ['creative', 'cyberpunk', 'sci-fi', 'slang', 'worldbuilding', 'dystopia'],
    transform: createStandardSkillTransform(
      'writing_style',
      'Киберпанк-Сленг и Уличный Арго (High-Tech Low-Life)',
      'Cyberpunk High-Tech Low-Life Argot & Slang Architecture',
      [
        '- **Синтетический уличный сленг**: Использовать органичный жаргон (хром, дека, плоть, нейро-линки, мегакорпы).',
        '- **Контраст технологий и нищеты**: Сверхтехнологичные импланты, перевязанные изолентой в грязном переулке под неоновым смогом.',
        '- **Корпоративный цинизм**: Показать тотальную власть мегакорпораций над телами, памятью и жизнями граждан.',
      ],
      [
        '- **Synthetic Street Argot**: Infuse dialogue with cohesive gritty techno-slang (decks, wetware, chrome, flatline, corpo-scum).',
        '- **High-Tech Low-Life Juxtaposition**: Contrast cutting-edge military cyberware with black-market back-alley surgery and acid rain.',
        '- **Corporate Dystopian Encroachment**: Emphasize suffocating megacorp monopolies owning human biology, biometric debt, and thought.',
      ]
    ),
  },

  'hero-villain-shadow-foil-dynamic': {
    id: 'hero-villain-shadow-foil-dynamic',
    name: 'HeroVillainShadowFoilSkill',
    displayName: 'Jungian Shadow & Foil Character Dynamic',
    categoryId: 'creative',
    description: 'Develops villains who serve as psychological foils (Jungian Shadow) reflecting what the hero could become if they took one dark turn.',
    tags: ['creative', 'characters', 'villain', 'shadow', 'foil', 'psychology'],
    transform: createStandardSkillTransform(
      'protocol',
      'Психологический Антагонист как Тень Героя (Jungian Shadow Foil)',
      'Jungian Shadow & Hero-Villain Foil Dynamic Architecture',
      [
        '- **Общая исходная травма**: Герой и антагонист пережили схожую трагедию, но сделали диаметрально противоположный моральный выбор.',
        '- **Зеркало скрытых желаний**: Злодей открыто делает то, чего герой тайно жаждет, но запрещает себе из-за этических барьеров.',
        '- **Диалектический спор**: Их финальный конфликт — это не просто драка, а спор двух мировоззрений, где оба отчасти правы.',
      ],
      [
        '- **Shared Foundational Wound**: Both hero and antagonist must share identical origin trauma, diverging solely on moral response.',
        '- **Repressed Shadow Manifestation**: The villain boldly acts out the dark, repressed subconscious impulses the hero suppresses.',
        '- **Ideological Philosophical Clash**: Final confrontation must center on an existential philosophical debate where the villain\'s critique has bite.',
      ]
    ),
  },

  'worldbuilding-magic-system-sanderson': {
    id: 'worldbuilding-magic-system-sanderson',
    name: 'WorldbuildingMagicSystemSandersonSkill',
    displayName: 'Brandon Sanderson Hard Magic System Laws',
    categoryId: 'creative',
    description: 'Designs coherent magical or technological systems governed by Sanderson\'s Laws: Costs, Limitations, and Logical Ripple Effects.',
    tags: ['creative', 'magic-system', 'worldbuilding', 'sanderson', 'fantasy', 'sci-fi'],
    transform: createStandardSkillTransform(
      'protocol',
      'Система Жесткой Магии по Законам Сандерсона (Hard Magic System)',
      'Brandon Sanderson Hard Magic System Architecture',
      [
        '- **1-й Закон (Решение проблем)**: Способность автора решать проблемы магией прямо пропорциональна тому, насколько хорошо читатель понимает её правила.',
        '- **Ограничения важнее сил**: Описать не то, ЧТО магия может делать, а то, чего она делать НЕ может ни при каких обстоятельствах.',
        '- **Высокая цена и последствия**: Каждое применение магии требует физической, ментальной или ресурсной платы (кровь, металлы, воспоминания).',
      ],
      [
        '- **Sanderson\'s 1st Law**: Author\'s ability to solve narrative conflict with magic is directly proportional to how well reader understands rules.',
        '- **Limitations Over Powers**: Exhaustively catalog what the magic CANNOT do; creative constraints generate thrilling narrative tension.',
        '- **Strict Resource Costs**: Every exertion enforces tangible physical or mental payment (burns specific metals, drains years of life).',
      ]
    ),
  },

  'epistolary-found-document-narrative': {
    id: 'epistolary-found-document-narrative',
    name: 'EpistolaryFoundDocumentSkill',
    displayName: 'Epistolary & Found-Footage Narrative Collage',
    categoryId: 'creative',
    description: 'Constructs stories entirely out of fragmented artifacts: diary entries, leaked emails, court transcripts, and audio logs.',
    tags: ['creative', 'epistolary', 'found-documents', 'transcripts', 'mystery', 'collage'],
    transform: createStandardSkillTransform(
      'output_format',
      'Эпистолярный Формат Найденных Документов (Found Documents)',
      'Epistolary & Found-Document Narrative Collage Protocol',
      [
        '- **Разнородные артефакты**: Составить историю из фрагментов: служебные записки, протоколы допросов, чаты Slack, личные дневники.',
        '- **Уникальный голос каждого документа**: Корпоративный язык служебок должен разительно отличаться от эмоциональных криков в личном чате.',
        '- **Сборка пазла читателем**: Скрывать правду в зазорах между документами; читатель должен сопоставить даты и факты сам.',
      ],
      [
        '- **Heterogeneous Artifact Collage**: Assemble narrative from classified memos, audio transcripts, encrypted emails, and black box logs.',
        '- **Distinct Document Typologies**: Ensure corporate memos sound sterile and bureaucratic while personal chat logs exhibit frantic cadence.',
        '- **Negative-Space Deduction**: Scatter puzzle clues across date stamps and redactions, compelling readers to assemble the overarching horror.',
      ]
    ),
  },

  'stream-of-consciousness-interiority': {
    id: 'stream-of-consciousness-interiority',
    name: 'StreamOfConsciousnessInterioritySkill',
    displayName: 'Stream-of-Consciousness & Deep Interiority (Woolf/Joyce)',
    categoryId: 'creative',
    description: 'Renders raw, unmediated associative thought flows, capturing the rhythm of memory, sensory intrusions, and psychological leaps.',
    tags: ['creative', 'stream-of-consciousness', 'woolf', 'joyce', 'interiority', 'literary'],
    transform: createStandardSkillTransform(
      'writing_style',
      'Поток Сознания и Глубинная Психологическая Внутренность',
      'Stream-of-Consciousness & Deep Psychological Interiority',
      [
        '- **Ассоциативные скачки мысли**: Мысль течет непрерывно, перескакивая от звука капель к детскому воспоминанию и страху смерти.',
        '- **Синтаксический ритм**: Длинные волнообразные предложения с причастными оборотами, передающие биение пульса и дыхания.',
        '- **Стирание границ между внешним и внутренним**: Внешний шум улицы немедленно вплетается в ткань внутренних переживаний героя.',
      ],
      [
        '- **Fluid Associative Leaps**: Channel raw mental drift leaping from sensory intrusions to childhood memory and mortal terror.',
        '- **Cadenced Syntactic Flow**: Employ undulating polyphonic sentence rhythms mirroring the irregular heartbeat of subjective awareness.',
        '- **Permeable External/Internal Boundary**: Seamlessly dissolve border between physical environmental noise and internal psychological monologue.',
      ]
    ),
  },

  'gothic-dread-atmospheric-pacing': {
    id: 'gothic-dread-atmospheric-pacing',
    name: 'GothicDreadAtmosphericPacingSkill',
    displayName: 'Gothic Atmosphere & Creeping Dread (Poe/Jackson)',
    categoryId: 'creative',
    description: 'Builds unbearable psychological dread and gothic unease through oppressive environments, isolation, and sensory decay.',
    tags: ['creative', 'gothic', 'horror', 'dread', 'atmosphere', 'poe', 'suspense'],
    transform: createStandardSkillTransform(
      'writing_style',
      'Готическая Атмосфера и Нарастающий Ужас (Creeping Dread)',
      'Gothic Atmosphere & Creeping Psychological Dread Protocol',
      [
        '- **Зловещий одушевленный сеттинг**: Особняк, туман или старый лес ведут себя как живые враждебные существа (скрип стропил, холодные сквозняки).',
        '- **Медленное нарастание саспенса**: Начинать с микроскопических неправильностей (тень не там упала, тиканье часов сбилось).',
        '- **Психологическая клаустрофобия**: Ощущение неотвратимой ловушки, из которой герою не выбраться.',
      ],
      [
        '- **Anthropomorphic Menacing Environment**: Treat ancient manors, dense fogs, and decaying hallways as sentient, predatory organisms.',
        '- **Granular Micro-Distortions**: Build tension through tiny anomalies (shadows falling against the light, clock ticks missing an eighth-beat).',
        '- **Suffocating Claustrophobia**: Tighten spatial and psychological enclosures until the reader feels the walls pressing against their ribs.',
      ]
    ),
  },

  'cosmic-horror-existential-insignificance': {
    id: 'cosmic-horror-existential-insignificance',
    name: 'CosmicHorrorInsignificanceSkill',
    displayName: 'Cosmic Horror & Existential Insignificance (Lovecraft)',
    categoryId: 'creative',
    description: 'Evokes cosmic dread by confronting mortal protagonists with vast, indifferent alien geometries and truths beyond human sanity.',
    tags: ['creative', 'cosmic-horror', 'lovecraft', 'existential', 'sanity', 'alien'],
    transform: createStandardSkillTransform(
      'writing_style',
      'Космический Ужас и Ничтожность Человека (Cosmic Horror)',
      'Cosmic Horror & Existential Insignificance Protocol',
      [
        '- **Невыразимость для человеческого разума**: Описывать геометрию, нарушающую законы Евклида, и цвета вне видимого спектра.',
        '- **Колоссальный масштаб времени и пространства**: Подчеркнуть абсолютное безразличие вселенной к судьбе человечества (пылинка на ветру).',
        '- **Цена знания — безумие**: Постижение истины разрушает рассудок исследователя; знание опасно само по себе.',
      ],
      [
        '- **Non-Euclidean Ineffability**: Describe angles that appear obtuse yet measure acute, and impossible colors outside mortal sensory spectrums.',
        '- **Staggering Deep-Time Scale**: Emphasize cosmic indifference where entire human history is a fleeting, unnoticed blink in elder eons.',
        '- **Knowledge as Contagion**: Treat empirical revelation as an annihilating contagion that shatters fragile human mental equilibrium.',
      ]
    ),
  },

  'flash-fiction-micro-narrative-twist': {
    id: 'flash-fiction-micro-narrative-twist',
    name: 'FlashFictionMicroNarrativeSkill',
    displayName: 'Flash Fiction 500-Word Punchy Twist',
    categoryId: 'creative',
    description: 'Packs a complete dramatic narrative arc with compelling characterization and jaw-dropping final twist in under 500 words.',
    tags: ['creative', 'flash-fiction', 'micro-fiction', 'twist', 'brevity', 'punchline'],
    transform: createStandardSkillTransform(
      'output_format',
      'Микропроза с Неожиданным Финалом (Flash Fiction Twist)',
      'Flash Fiction 500-Word Compression & Twist Protocol',
      [
        '- **Лимит 500 слов**: Ни одного лишнего прилагательного; каждое слово продвигает сюжет или раскрывает персонажа.',
        '- **Мгновенный статус-кво и разлом**: В первых двух предложениях задать мир и разрушить его гармонию.',
        '- **Финальный ошеломляющий твист**: Последнее предложение должно полностью перевернуть восприятие всей предыдущей истории.',
      ],
      [
        '- **Strict 500-Word Horizon**: Zero decorative filler; every single verb and noun must execute double-duty advancing plot and character.',
        '- **Instant Equilibrium Disruption**: Establish status quo and shatter it within the first two opening sentences.',
        '- **Paradigm-Shifting Terminal Sentence**: Conclude with a devastating one-line revelation that completely recontextualizes the entire narrative.',
      ]
    ),
  },
  "three-act-dramatic-structure": {
    id: "three-act-dramatic-structure",
    name: "ThreeActDramaticStructureSkill",
    displayName: "Three-Act Dramatic Structure & Plot Pacing",
    categoryId: "creative",
    description: "Structures narrative fiction and screenplays along the classic Three-Act structure: Inciting Incident, Plot Point 1, Midpoint Crisis, Climax, and Resolution.",
    tags: ["creative","storytelling","three-act-structure","plot-pacing","screenwriting"],
    transform: createStandardSkillTransform({
      sectionName: "Three-Act Dramatic Structure Protocol",
      ruSectionName: "Фреймворк трехактной драматической структуры (Three-Act Plot Structure)",
      instructions: [
        "Act 1 (Setup): Establish normal world, introduce core protagonist flaw, and trigger the Inciting Incident.",
        "Act 2 (Confrontation): Escalate stakes through rising obstacles, culminating in the Midpoint reversal and All-Is-Lost moment.",
        "Act 3 (Resolution): Drive the protagonist into the climactic crucible where internal flaw is conquered to resolve the external crisis.",
        "Ensure every scene advances either plot momentum or character transformation."
],
      ruInstructions: [
        "Акт 1 (Экспозиция): Покажите привычный мир героя, его внутренний изъян и запустите побуждающее происшествие.",
        "Акт 2 (Конфронтация): Повышайте ставки через нарастающие препятствия, точку невозврата (Midpoint) и кризис \"Все потеряно\".",
        "Акт 3 (Развязка): Подведите героя к кульминационной схватке, где победа над внутренним изъяном решает внешний конфликт.",
        "Гарантируйте, что каждая сцена двигает вперед сюжет либо раскрывает трансформацию персонажа."
],
      semanticType: "writing_style",
      tags: ["creative","storytelling","three-act-structure","plot-pacing","screenwriting"],
    }),
  },

  "unreliable-narrator-voice-craft": {
    id: "unreliable-narrator-voice-craft",
    name: "UnreliableNarratorVoiceCraftSkill",
    displayName: "Unreliable Narrator & Psychological Subtext Craft",
    categoryId: "creative",
    description: "Constructs psychological fiction featuring an unreliable narrator with subtle discrepancies between subjective narration and objective reality.",
    tags: ["creative","unreliable-narrator","fiction","psychological-subtext","voice"],
    transform: createStandardSkillTransform({
      sectionName: "Unreliable Narrator Protocol",
      ruSectionName: "Протокол ненадежного рассказчика и психологического подтекста (Unreliable Narrator)",
      instructions: [
        "Craft a distinctive, compelling subjective voice with idiosyncratic cognitive biases or self-deceptions.",
        "Plant subtle, objective clues (unmatched timestamps, conflicting physical details) that alert the astute reader.",
        "Maintain believable internal justification for the narrator omissions and selective memories.",
        "Build toward a powerful, tragic or revelatory moment of cognitive dissonance."
],
      ruInstructions: [
        "Создавайте убедительный авторский голос со специфическими искажениями восприятия и самообманом.",
        "Оставляйте тонкие объективные подсказки (нестыковки во времени, детали обстановки), заметные внимательному читателю.",
        "Выдерживайте органичную внутреннюю мотивацию персонажа, оправдывающую его умолчания и искажения.",
        "Ведите сюжет к эмоциональному моменту осознания разрыва между иллюзией и реальностью."
],
      semanticType: "writing_style",
      tags: ["creative","unreliable-narrator","fiction","psychological-subtext","voice"],
    }),
  },

  "dialogue-banter-wit-screenplay": {
    id: "dialogue-banter-wit-screenplay",
    name: "DialogueBanterWitScreenplaySkill",
    displayName: "Witty Screenplay Dialogue, Subtext & Banter",
    categoryId: "creative",
    description: "Writes snappy, fast-paced dialogue (Aaron Sorkin / Quentin Tarantino style) rich in unspoken subtext, overlapping rhythms, and intellectual wit.",
    tags: ["creative","dialogue","screenplay","banter","subtext","wit"],
    transform: createStandardSkillTransform({
      sectionName: "Witty Dialogue & Subtext Protocol",
      ruSectionName: "Протокол остроумного кинематографичного диалога и подтекста (Screenplay Banter)",
      instructions: [
        "Write dialogue where characters rarely say exactly what they mean; bury the true intention in subtext.",
        "Use rhythmic cadence, interrupted thoughts, and conversational sparring to create dynamic momentum.",
        "Give each character distinct verbal idiolects, pet phrases, and sentence structures.",
        "Eliminate on-the-nose exposition: never have characters explain facts they both already know."
],
      ruInstructions: [
        "Пишите диалоги, где персонажи редко говорят о своих чувствах прямо; прячьте истинные мотивы в подтексте.",
        "Используйте быстрый ритм реплик, перебивания и словесный пинг-понг для создания динамики сцены.",
        "Наделяйте каждого героя уникальным словарным запасом, характерными оборотами и длиной фраз.",
        "Исключайте неестественную экспозицию: персонажи не должны пересказывать друг другу то, что им обоим известно."
],
      semanticType: "writing_style",
      tags: ["creative","dialogue","screenplay","banter","subtext","wit"],
    }),
  },

  "poetic-imagery-synesthesia-metaphor": {
    id: "poetic-imagery-synesthesia-metaphor",
    name: "PoeticImagerySynesthesiaMetaphorSkill",
    displayName: "Poetic Synesthesia, Imagery & Lyrical Metaphor",
    categoryId: "creative",
    description: "Weaves rich poetic language using synesthesia (blending sensory modalities), original fresh metaphors, and musical phonetics (assonance, alliteration).",
    tags: ["creative","poetry","synesthesia","metaphor","imagery","lyricism"],
    transform: createStandardSkillTransform({
      sectionName: "Poetic Imagery & Synesthesia Protocol",
      ruSectionName: "Протокол поэтической образности и синестезии (Poetic Imagery & Metaphor)",
      instructions: [
        "Blend sensory modalities via synesthesia: describe sounds through color, textures through taste, scents through geometry.",
        "Ban clichéd metaphors; synthesize completely novel analogical connections between nature, emotion, and technology.",
        "Harness phonetic musicality: deploy internal rhymes, subtle assonance, and rhythmic alliteration.",
        "Evoke profound emotional resonance through distilled, concentrated lyrical imagery."
],
      ruInstructions: [
        "Объединяйте разные каналы восприятия через синестезию: описывайте звуки цветом, текстуры вкусом, запахи формой.",
        "Категорически избегайте штампов; находите свежие поэтические связи между природой, эмоциями и предметным миром.",
        "Используйте фонетическую выразительность: внутренние рифмы, аллитерации и мягкие ассонансы.",
        "Передавайте глубокие эмоциональные переживания через концентрированные и емкие поэтические образы."
],
      semanticType: "writing_style",
      tags: ["creative","poetry","synesthesia","metaphor","imagery","lyricism"],
    }),
  },

  "gothic-horror-atmosphere-dread": {
    id: "gothic-horror-atmosphere-dread",
    name: "GothicHorrorAtmosphereDreadSkill",
    displayName: "Gothic Horror, Atmospheric Dread & Psychological Terror",
    categoryId: "creative",
    description: "Builds slow-burning psychological dread and eerie gothic atmosphere (Lovecraft / Shirley Jackson style) using uncanny sensory details and architectural decay.",
    tags: ["creative","horror","gothic","dread","atmosphere","psychological-terror"],
    transform: createStandardSkillTransform({
      sectionName: "Gothic Horror & Atmospheric Dread Protocol",
      ruSectionName: "Протокол атмосферы готического хоррора и психологического саспенса (Gothic Dread)",
      instructions: [
        "Build dread through anticipation and atmospheric decay rather than cheap jump scares.",
        "Personify the environment: describe ancient architecture, claustrophobic fog, and rotting flora as active malevolent entities.",
        "Deploy the Uncanny (Freud Unheimlich): make familiar domestic spaces feel subtly wrong and alien.",
        "Escalate psychological disorientation until the boundary between sanity and the supernatural dissolves."
],
      ruInstructions: [
        "Нагнетайте тревогу через медленное ожидание и гнетущую атмосферу вместо банальных скримеров.",
        "Одушевляйте пространство: описывайте старинные особняки, туман и увядающую природу как враждебных свидетелей.",
        "Используйте эффект \"жуткого\" (Uncanny): делайте привычные домашние вещи пугающе чуждыми и искаженными.",
        "Усиливайте психологическую дезориентацию героя до стирания грани между безумием и мистикой."
],
      semanticType: "writing_style",
      tags: ["creative","horror","gothic","dread","atmosphere","psychological-terror"],
    }),
  },

  "cyberpunk-neon-noir-atmosphere": {
    id: "cyberpunk-neon-noir-atmosphere",
    name: "CyberpunkNeonNoirAtmosphereSkill",
    displayName: "Cyberpunk Neon-Noir & High-Tech Low-Life Aesthetic",
    categoryId: "creative",
    description: "Immerses fiction in classic cyberpunk neon-noir (William Gibson / Blade Runner style): rain-slicked concrete, corporate hegemony, neural cyberware, and street slang.",
    tags: ["creative","cyberpunk","sci-fi","neon-noir","worldbuilding"],
    transform: createStandardSkillTransform({
      sectionName: "Cyberpunk Neon-Noir Protocol",
      ruSectionName: "Протокол киберпанка и нео-нуара (High-Tech Low-Life Aesthetic)",
      instructions: [
        "Evoke the quintessential \"High-Tech, Low-Life\" contrast: hyper-advanced neural cyberware amidst rotting urban sprawl.",
        "Layer sensory textures: buzzing neon reflections, rain-slicked alleyways, ozone smells, and synthetic noodle stalls.",
        "Incorporate authentic subcultural street jargon, hacker slang, and megacorporation brand names.",
        "Explore themes of transhumanist alienation, commodified memory, and anti-authoritarian rebellion."
],
      ruInstructions: [
        "Передавайте контраст \"High-Tech, Low-Life\": передовые нейроинтерфейсы на фоне трущоб и нищеты мегаполиса.",
        "Насыщайте сцену деталями: мерцающий неон в лужах, запах озона и синтетической уличной еды, гул серверов.",
        "Используйте характерный уличный сленг хакеров, термины аугментаций и названия всемогущих мегакорпораций.",
        "Исследуйте темы отчуждения человека в цифровом мире, торговли воспоминаниями и бунта против корпораций."
],
      semanticType: "writing_style",
      tags: ["creative","cyberpunk","sci-fi","neon-noir","worldbuilding"],
    }),
  },

  "flash-fiction-twist-ending-craft": {
    id: "flash-fiction-twist-ending-craft",
    name: "FlashFictionTwistEndingCraftSkill",
    displayName: "Micro Flash Fiction & O. Henry Irony Twist",
    categoryId: "creative",
    description: "Crafts complete, punchy micro-stories under 500 words featuring rich characterization, tight pacing, and a shocking yet inevitable ironic twist ending.",
    tags: ["creative","flash-fiction","twist-ending","irony","micro-fiction"],
    transform: createStandardSkillTransform({
      sectionName: "Flash Fiction & Twist Ending Protocol",
      ruSectionName: "Протокол микропрозы и неожиданной концовки (Flash Fiction & Twist)",
      instructions: [
        "Hook the reader in the opening sentence with an immediate, high-stakes dilemma.",
        "Eliminate every word that does not simultaneously build character and propel plot toward the climax.",
        "Deliver an ending twist that completely reframes the story context while feeling 100% fair and foreshadowed in retrospect.",
        "Leave a lasting emotional resonance that echoes far beyond the final word."
],
      ruInstructions: [
        "Захватывайте читателя с первой строки острым и необычным конфликтом.",
        "Вырезайте каждое слово, которое не раскрывает характер героя и не двигает действие к кульминации.",
        "Создавайте неожиданный финал, который полностью переворачивает смысл прочитанного, но выглядит неизбежным при повторном взгляде.",
        "Оставляйте сильное эмоциональное послевкусие после последней точки."
],
      semanticType: "writing_style",
      tags: ["creative","flash-fiction","twist-ending","irony","micro-fiction"],
    }),
  },

  "character-flaw-crucible-arc": {
    id: "character-flaw-crucible-arc",
    name: "CharacterFlawCrucibleArcSkill",
    displayName: "Internal Character Flaw & Crucible Arc Architecture",
    categoryId: "creative",
    description: "Architects multi-dimensional characters around an internal Lie they believe, an unacknowledged Want versus true Need, and a transformative crucible test.",
    tags: ["creative","character-arc","characterization","crucible","psychology"],
    transform: createStandardSkillTransform({
      sectionName: "Character Arc & Crucible Protocol",
      ruSectionName: "Архитектурный протокол арки персонажа и горнила испытаний (Character Arc)",
      instructions: [
        "Define the Lie the character believes about themselves or the world rooted in a past Ghost/Wound.",
        "Contrast the external Want (conscious goal) with the internal Need (spiritual/moral truth required to heal).",
        "Design the Crucible: a climactic trial where achieving the Want requires confronting and sacrificing the Lie.",
        "Show unambiguous behavioral transformation through choices made under extreme stress."
],
      ruInstructions: [
        "Определите \"Ложь\", в которую верит герой о себе или о мире из-за давней психологической травмы (Ghost).",
        "Создайте конфликт между внешним Желанием (Want) и истинной внутренней Потребностью (Need).",
        "Спроектируйте \"Горнило\" — кульминационную ситуацию, где победа требует отказа от старой лжи и эго.",
        "Демонстрируйте необратимую трансформацию характера через поступки под максимальным давлением."
],
      semanticType: "process_directive",
      tags: ["creative","character-arc","characterization","crucible","psychology"],
    }),
  },

  "solarpunk-eco-utopia-worldbuilding": {
    id: "solarpunk-eco-utopia-worldbuilding",
    name: "SolarpunkEcoUtopiaWorldbuildingSkill",
    displayName: "Solarpunk & Eco-Optimistic Science Fiction Worldbuilding",
    categoryId: "creative",
    description: "Constructs vibrant Solarpunk worlds: harmonious integration of clean tech, biomimetic architecture, decentralized governance, and communal resilience.",
    tags: ["creative","solarpunk","worldbuilding","eco-fiction","sci-fi","optimism"],
    transform: createStandardSkillTransform({
      sectionName: "Solarpunk Worldbuilding Protocol",
      ruSectionName: "Протокол построения миров соларпанка (Solarpunk Eco-Optimism)",
      instructions: [
        "Envision technological progress in symbiotic harmony with ecological ecosystems rather than extractive exploitation.",
        "Incorporate biomimetic architecture: living algae facades, passive ventilation, vertical forest towers, solar stained-glass.",
        "Explore decentralized communal governance, circular repair economies, and open-source hardware networks.",
        "Ground conflicts in human collaboration, community restoration, and climate adaptation challenges."
],
      ruInstructions: [
        "Описывайте технологический прогресс в симбиозе с живой природой вместо хищнической добычи ресурсов.",
        "Внедряйте биомиметическую архитектуру: фасады из водорослей, пассивную вентиляцию, вертикальные сады и витражные солнечные панели.",
        "Показывайте децентрализованные сообщества, экономику совместного ремонта и открытых технологий.",
        "Стройте сюжетные конфликты вокруг совместного преодоления последствий климатических изменений и взаимопомощи."
],
      semanticType: "writing_style",
      tags: ["creative","solarpunk","worldbuilding","eco-fiction","sci-fi","optimism"],
    }),
  },

  "magical-realism-everyday-wonder": {
    id: "magical-realism-everyday-wonder",
    name: "MagicalRealismEverydayWonderSkill",
    displayName: "Magical Realism & Everyday Marvels (Marquez Style)",
    categoryId: "creative",
    description: "Weaves magical realism (Gabriel Garcia Marquez style) where miraculous, impossible phenomena are accepted matter-of-factly by characters as ordinary daily occurrences.",
    tags: ["creative","magical-realism","marquez","literature","fiction"],
    transform: createStandardSkillTransform({
      sectionName: "Magical Realism Protocol",
      ruSectionName: "Протокол магического реализма и обыденного чуда (Гарсиа Маркес)",
      instructions: [
        "Treat extraordinary magical events (raining yellow flowers, levitation, ghosts drinking tea) with total, deadpan domestic normalcy.",
        "Conversely, describe mundane modern technology (magnets, ice, railways) with breathless wonder and mythic awe.",
        "Root the narrative deeply in familial lineage, generational memory, and cultural folklore.",
        "Blur the boundaries between dream, superstition, history, and reality."
],
      ruInstructions: [
        "Описывайте невероятные чудеса (дождь из желтых цветов, призраки за столом) с полным бытовым спокойствием.",
        "Наоборот, описывайте обычные технологии (лед, магниты, железную дорогу) с мистическим детским благоговением.",
        "Вплетайте историю поколений семьи, память предков и местный фольклор в канву сюжета.",
        "Стирайте границы между сном, поверьями, историческими событиями и повседневной реальностью."
],
      semanticType: "writing_style",
      tags: ["creative","magical-realism","marquez","literature","fiction"],
    }),
  },

  "dystopian-bureaucracy-kafkaesque": {
    id: "dystopian-bureaucracy-kafkaesque",
    name: "DystopianBureaucracyKafkaesqueSkill",
    displayName: "Kafkaesque Dystopian Bureaucracy & Absurdism",
    categoryId: "creative",
    description: "Evokes nightmarish, labyrinthine bureaucratic absurdity (Franz Kafka / George Orwell style): faceless authorities, circular regulations, and inescapable administrative traps.",
    tags: ["creative","kafkaesque","absurdism","dystopia","satire","bureaucracy"],
    transform: createStandardSkillTransform({
      sectionName: "Kafkaesque Absurdist Bureaucracy Protocol",
      ruSectionName: "Протокол кафкианского абсурда и бюрократической антиутопии (Kafkaesque)",
      instructions: [
        "Construct endless bureaucratic mazes of contradictory, circular forms and anonymous administrative tiers.",
        "Maintain an unsettlingly polite, matter-of-fact tone among officials executing absurd procedures.",
        "Depict the protagonist struggle as an exhausting battle against invisible, shifting institutional rules.",
        "Explore existential themes of alienation, arbitrary power, and loss of individual agency."
],
      ruInstructions: [
        "Создавайте бесконечные лабиринты противоречивых формуляров, кабинетов и анонимных чиновников.",
        "Выдерживайте пугающе вежливый и рутинный тон представителей системы, исполняющих абсурдные приказы.",
        "Показывайте борьбу героя как изнурительную попытку доказать очевидное в условиях меняющихся невидимых правил.",
        "Раскрывайте темы отчуждения, бессмысленности произвольной власти и утраты человеком субъектности."
],
      semanticType: "writing_style",
      tags: ["creative","kafkaesque","absurdism","dystopia","satire","bureaucracy"],
    }),
  },

  "steampunk-victorian-clockwork-fiction": {
    id: "steampunk-victorian-clockwork-fiction",
    name: "SteampunkVictorianClockworkFictionSkill",
    displayName: "Steampunk Victorian Clockwork & Brass Adventure",
    categoryId: "creative",
    description: "Immerses fiction in rich Victorian Steampunk: brass clockwork automatons, steam-powered airships, coal soot London, and alchemical laboratories.",
    tags: ["creative","steampunk","victorian","clockwork","adventure","sci-fi"],
    transform: createStandardSkillTransform({
      sectionName: "Steampunk Clockwork Fiction Protocol",
      ruSectionName: "Протокол викторианского стимпанка и часовых механизмов (Steampunk)",
      instructions: [
        "Infuse descriptions with tactile mechanical details: whirring brass cogs, hissing steam pistons, polished mahogany, and pressure gauges.",
        "Blend 19th-century Victorian formal etiquette and gaslit streets with speculative retro-futuristic engineering.",
        "Feature airship sky armadas, telegraphic networks, and alchemical power sources.",
        "Evoke the romantic spirit of scientific discovery, grand expeditions, and inventor ingenuity."
],
      ruInstructions: [
        "Насыщайте текст осязаемыми механическими деталями: латунные шестеренки, шипение пара в поршнях, манометры и полированное дерево.",
        "Сочетайте викторианский светский этикет и туманные улицы Лондона с грандиозными ретрофутуристическими машинами.",
        "Описывайте полеты бронированных дирижаблей, механических автоматонов и алхимические двигатели.",
        "Передавайте дух романтики великих географических открытий и смелых инженерных экспериментов."
],
      semanticType: "writing_style",
      tags: ["creative","steampunk","victorian","clockwork","adventure","sci-fi"],
    }),
  },

  "mythic-hero-monomyth-campbell": {
    id: "mythic-hero-monomyth-campbell",
    name: "MythicHeroMonomythCampbellSkill",
    displayName: "Joseph Campbell Hero's Journey Monomyth Structure",
    categoryId: "creative",
    description: "Maps epic narratives onto Joseph Campbell 12-stage Monomyth: Call to Adventure, Crossing the Threshold, Belly of the Whale, Atonement with the Father, and Return with the Elixir.",
    tags: ["creative","hero-journey","monomyth","campbell","mythology","epic-storytelling"],
    transform: createStandardSkillTransform({
      sectionName: "Hero's Journey Monomyth Protocol",
      ruSectionName: "Фреймворк путешествия героя по Джозефу Кэмпбеллу (Hero's Journey Monomyth)",
      instructions: [
        "Stage the Departure: Ordinary World, Call to Adventure, Refusal of the Call, Meeting the Mentor, Crossing the First Threshold.",
        "Stage the Initiation: Road of Trials, Meeting with the Goddess, Temptation, Atonement with the Father, Apotheosis, The Ultimate Boon.",
        "Stage the Return: Refusal of Return, Magic Flight, Crossing the Return Threshold, Master of Two Worlds, Freedom to Live.",
        "Infuse archetypal characters: The Herald, The Threshold Guardian, The Shadow, The Shapeshifter, The Trickster."
],
      ruInstructions: [
        "Фаза Исхода: Обычный мир, Зов странствий, Отвержение зова, Встреча с наставником, Переход первого порога.",
        "Фаза Инициации: Дорога испытаний, Искушение, Примирение с Отцом, Апофеоз и Получение волшебного дара.",
        "Фаза Возвращения: Бегство из иного мира, Переход порога возврата, Владыка двух миров и Свобода жить.",
        "Используйте архетипических персонажей: Вестник, Страж порога, Тень, Оборотень, Трикстер."
],
      semanticType: "writing_style",
      tags: ["creative","hero-journey","monomyth","campbell","mythology","epic-storytelling"],
    }),
  },

  "noir-detective-cynical-metaphor": {
    id: "noir-detective-cynical-metaphor",
    name: "NoirDetectiveCynicalMetaphorSkill",
    displayName: "Hardboiled Noir Detective Voice & Cynical Metaphors",
    categoryId: "creative",
    description: "Channels Raymond Chandler hardboiled detective voice: rain-soaked fedoras, cynical similes (\"as crooked as a corkscrew\"), neon reflections, and morally ambiguous antiheroes.",
    tags: ["creative","noir","hardboiled","detective","raymond-chandler","voice"],
    transform: createStandardSkillTransform({
      sectionName: "Hardboiled Noir Voice Protocol",
      ruSectionName: "Протокол нуарного детектива и циничных метафор (Hardboiled Noir)",
      instructions: [
        "Adopt a weary, cynical first-person detective monologue observing urban corruption.",
        "Deploy signature hardboiled similes: vivid, unexpected, and dripping with gritty urban weariness.",
        "Paint visual contrast: shadows slicing through Venetian blinds, burning cigarettes in dark sedans.",
        "Maintain an unyielding personal moral code in a world where everyone else has sold out."
],
      ruInstructions: [
        "Ведите повествование от лица уставшего, циничного частного детектива, знающего изнанку города.",
        "Используйте фирменные хлесткие нуарные сравнения, пропитанные иронией и горечью.",
        "Создавайте визуальный контраст: свет сквозь жалюзи, тлеющая сигарета в темноте, мокрый асфальт ночных улиц.",
        "Сохраняйте несгибаемый внутренний кодекс чести героя в насквозь коррумпированном мире."
],
      semanticType: "writing_style",
      tags: ["creative","noir","hardboiled","detective","raymond-chandler","voice"],
    }),
  },

  "cosmic-existential-wonder-sagan": {
    id: "cosmic-existential-wonder-sagan",
    name: "CosmicExistentialWonderSaganSkill",
    displayName: "Cosmic Wonder & Astrobiological Prose (Carl Sagan Style)",
    categoryId: "creative",
    description: "Writes uplifting, scientifically grounded cosmic literature (Carl Sagan / Ted Chiang style), evoking profound awe for the universe, deep time, and humanity fragile existence.",
    tags: ["creative","cosmic-wonder","carl-sagan","astronomy","lyrical-science"],
    transform: createStandardSkillTransform({
      sectionName: "Cosmic Wonder & Existential Prose Protocol",
      ruSectionName: "Протокол космического благоговения и научной лирики (Carl Sagan Style)",
      instructions: [
        "Bridge rigorous astrophysical facts with breathtaking poetic and philosophical grandeur.",
        "Evoke the dizzying scale of deep time (billions of years) and vast interstellar distances.",
        "Frame humanity fragile consciousness as the universe way of knowing itself.",
        "Inspire humility, profound empathy, and cosmic stewardship for our pale blue dot."
],
      ruInstructions: [
        "Соединяйте строгие астрофизические факты с захватывающим дух философским и поэтическим величием.",
        "Передавайте головокружительный масштаб глубокого времени (миллиарды лет) и межзвездных расстояний.",
        "Показывайте человеческий разум как удивительный способ Вселенной познать саму себя.",
        "Вдохновляйте на бережное отношение к жизни на нашей хрупкой голубой планете."
],
      semanticType: "writing_style",
      tags: ["creative","cosmic-wonder","carl-sagan","astronomy","lyrical-science"],
    }),
  },

  "nonlinear-time-loop-narrative": {
    id: "nonlinear-time-loop-narrative",
    name: "NonlinearTimeLoopNarrativeSkill",
    displayName: "Non-Linear Timeline & Causal Time-Loop Architecture",
    categoryId: "creative",
    description: "Architects mind-bending non-linear narratives (Memento / Dark style) with causal bootstrap paradoxes, fragmented timelines, and intersecting memory anchors.",
    tags: ["creative","time-loop","non-linear","bootstrap-paradox","sci-fi"],
    transform: createStandardSkillTransform({
      sectionName: "Non-Linear Time-Loop Narrative Protocol",
      ruSectionName: "Архитектурный протокол нелинейного времени и временных петель (Time Loop & Paradoxes)",
      instructions: [
        "Map narrative across multiple chronological threads with explicit temporal anchor markers: [Timeline Alpha: 2054], [Timeline Beta: 1986].",
        "Engineer airtight causal bootstrap paradoxes where future events cause their own past origins.",
        "Use recurring symbolic objects (a pocket watch, a scar, a song) to ground the reader across timeline transitions.",
        "Converge disparate temporal threads into a breathtaking, unified revelation at the climax."
],
      ruInstructions: [
        "Размечайте повествование по нескольким временным линиям с четкими маркерами: [Линия А: 2054 год], [Линия Б: 1986 год].",
        "Выстраивайте логически замкнутые причинно-следственные петли, где следствие порождает собственную причину.",
        "Используйте сквозные материальные якоря (часы, шрам, мелодия) для ориентации читателя при смене эпох.",
        "Сводите все временные потоки в единую ошеломляющую кульминационную развязку."
],
      semanticType: "writing_style",
      tags: ["creative","time-loop","non-linear","bootstrap-paradox","sci-fi"],
    }),
  },

  "fable-parable-allegorical-lore": {
    id: "fable-parable-allegorical-lore",
    name: "FableParableAllegoricalLoreSkill",
    displayName: "Timeless Fable, Mythological Parable & Allegory",
    categoryId: "creative",
    description: "Crafts timeless parables and allegorical folklore (Aesop / Borges / Calvino style) exploring universal human truths through animal archetypes, enchanted labyrinths, and symbolic journeys.",
    tags: ["creative","fables","parables","allegory","mythology","borges"],
    transform: createStandardSkillTransform({
      sectionName: "Allegorical Fable & Parable Protocol",
      ruSectionName: "Протокол притчи, иносказания и философской басни (Allegorical Parable)",
      instructions: [
        "Adopt a simple, rhythmic, and timeless mythological cadence: \"In a kingdom where mirrors were forbidden...\".",
        "Embody abstract human virtues, vices, and technological dilemmas in concrete allegorical symbols.",
        "Avoid heavy-handed moralizing; allow the moral insight to bloom organically in the reader mind.",
        "Leave an open, contemplative resonance that invites multiple layers of philosophical interpretation."
],
      ruInstructions: [
        "Используйте лаконичный, напевный и вневременной былинный слог: \"В те времена, когда зеркала были под запретом...\".",
        "Воплощайте человеческие добродетели, пороки и технологические дилеммы в осязаемых символах и аллегориях.",
        "Избегайте прямолинейного морализаторства; позвольте смыслу притчи раскрыться в размышлениях читателя.",
        "Оставляйте пространство для многоуровневого толкования философского подтекста истории."
],
      semanticType: "writing_style",
      tags: ["creative","fables","parables","allegory","mythology","borges"],
    }),
  },

  "satirical-black-comedy-voice": {
    id: "satirical-black-comedy-voice",
    name: "SatiricalBlackComedyVoiceSkill",
    displayName: "Satirical Black Comedy & Absurdist Social Critique",
    categoryId: "creative",
    description: "Channels biting social satire and dark comedy (Dr. Strangelove / Catch-22 / Succession style), exposing corporate absurdity, institutional hypocrisy, and human hubris.",
    tags: ["creative","satire","black-comedy","absurdism","social-critique"],
    transform: createStandardSkillTransform({
      sectionName: "Satirical Black Comedy Protocol",
      ruSectionName: "Протокол едкой сатиры и черной комедии (Satirical Black Comedy)",
      instructions: [
        "Expose institutional hypocrisy by taking absurd organizational logic to its extreme, literal conclusion.",
        "Juxtapose catastrophic stakes with petty, trivial bureaucratic squabbling.",
        "Write sharp, acidic dialogue where characters mask selfish ambition behind pious corporate buzzwords.",
        "Evoke dark, uncomfortable laughter that forces critical reflection on societal absurdities."
],
      ruInstructions: [
        "Вскрывайте лицемерие институтов власти, доводя их абсурдную логику до буквального гротескного предела.",
        "Сопоставляйте глобальные катастрофические события с мелкими эгоистичными склоками чиновников и менеджеров.",
        "Пишите едкие диалоги, в которых герои прикрывают циничный карьеризм благочестивыми корпоративными лозунгами.",
        "Вызывайте горький очищающий смех, побуждающий задуматься над реальными пороками общества."
],
      semanticType: "writing_style",
      tags: ["creative","satire","black-comedy","absurdism","social-critique"],
    }),
  },

  "intimate-epistolary-novel-letters": {
    id: "intimate-epistolary-novel-letters",
    name: "IntimateEpistolaryNovelLettersSkill",
    displayName: "Epistolary Novel & Fragmented Journal Narrative",
    categoryId: "creative",
    description: "Structures fiction through intimate letters, diary entries, decrypted chat logs, and field reports, revealing gradual plot secrets through authentic personal documents.",
    tags: ["creative","epistolary","letters","diary","found-documents","fiction"],
    transform: createStandardSkillTransform({
      sectionName: "Epistolary Narrative Protocol",
      ruSectionName: "Протокол эпистолярной прозы и найденных документов (Epistolary Novel)",
      instructions: [
        "Format story as a curated dossier of letters, journal pages, audio transcripts, and classified memos.",
        "Capture intimate psychological evolution through the changing handwriting tone and urgency of the writer.",
        "Reveal plot twists through dramatic irony: allow the reader to connect clues hidden across disparate letters.",
        "Impart an authentic sense of historical discovery and intimate confession."
],
      ruInstructions: [
        "Оформляйте повествование как подборку писем, страниц дневника, расшифровок аудиозаписей и служебных записок.",
        "Передавайте психологическую эволюцию автора через постепенное изменение тональности и стиля писем.",
        "Используйте драматическую иронию: позволяйте читателю сопоставлять факты из разных писем раньше героев.",
        "Создавайте у читателя волнующее чувство погружения в подлинные исторические свидетельства и тайные признания."
],
      semanticType: "writing_style",
      tags: ["creative","epistolary","letters","diary","found-documents","fiction"],
    }),
  },
};
