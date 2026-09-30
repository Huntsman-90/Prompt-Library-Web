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
};
