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
      semanticType: "process_directive",
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
      semanticType: "process_directive",
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
      semanticType: "process_directive",
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
      semanticType: "process_directive",
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
      semanticType: "process_directive",
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
      semanticType: "process_directive",
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
      semanticType: "process_directive",
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
      semanticType: "process_directive",
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
      semanticType: "process_directive",
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
      semanticType: "process_directive",
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
      semanticType: "process_directive",
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
      semanticType: "process_directive",
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
      semanticType: "process_directive",
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
      semanticType: "process_directive",
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
      semanticType: "process_directive",
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
      semanticType: "process_directive",
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
      semanticType: "process_directive",
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
      semanticType: "process_directive",
      tags: ["creative","epistolary","letters","diary","found-documents","fiction"],
    }),
  },
  "creative-worldbuilding-magic-system-sanderson": {
    id: "creative-worldbuilding-magic-system-sanderson",
    name: "CreativeWorldbuildingMagicSystemSandersonSkill",
    displayName: "Brandon Sanderson Laws of Magic & Hard Magic Systems",
    categoryId: "creative",
    description: "Designs consistent fantasy magic systems governed by Sanderson's First, Second, and Third Laws of Magic.",
    tags: ["creative","worldbuilding","magic-systems","sanderson","fantasy","writing"],
    transform: createStandardSkillTransform({
      sectionName: "Hard Magic System Design Framework",
      ruSectionName: "Законы магии Брэндона Сандерсона и проектирование строгих магических систем",
      instructions: [
        "Law 1: An author's ability to solve problems with magic is directly proportional to how well the reader understands said magic.",
        "Law 2: Limitations and costs are vastly more interesting than raw magical powers.",
        "Law 3: Expand on existing magical rules before adding brand-new elements."
],
      ruInstructions: [
        "Закон 1: Способность автора решать проблемы с помощью магии прямо пропорциональна пониманию правил читателем.",
        "Закон 2: Ограничения, слабости и цена применения магии интереснее самих способностей.",
        "Закон 3: Развивайте и углубляйте уже заданные правила мира перед добавлением новых элементов."
],
      semanticType: "structural_directive",
      tags: ["creative","worldbuilding","magic-systems","sanderson","fantasy","writing"],
    }),
  },

  "creative-pixar-storytelling-22-rules": {
    id: "creative-pixar-storytelling-22-rules",
    name: "CreativePixarStorytelling22RulesSkill",
    displayName: "Pixar 22 Rules of Storytelling & Emotional Resonance",
    categoryId: "creative",
    description: "Applies Pixar narrative principles: admire characters for trying rather than success, simplify storylines, and embrace vulnerability.",
    tags: ["creative","storytelling","pixar","narrative","screenwriting","animation"],
    transform: createStandardSkillTransform({
      sectionName: "Pixar Storytelling Rules Blueprint",
      ruSectionName: "22 правила сторителлинга студии Pixar (Эмоциональная глубина и путь героя)",
      instructions: [
        "You admire a character for trying more than for their successes.",
        "Putting it on paper lets you start fixing it; get the messy first draft out immediately.",
        "What is the essence of your story? Strip away everything that does not serve the core emotional spine."
],
      ruInstructions: [
        "Зрители восхищаются персонажем за упорные попытки и преодоление трудностей, а не за легкие победы.",
        "Переносите идеи на бумагу без самоцензуры: редактировать можно только то, что уже написано.",
        "Выделяйте эмоциональный стержень истории и безжалостно убирайте все сцены, которые ему не служат."
],
      semanticType: "structural_directive",
      tags: ["creative","storytelling","pixar","narrative","screenwriting","animation"],
    }),
  },

  "creative-metaphor-poetic-synesthesia-imagery": {
    id: "creative-metaphor-poetic-synesthesia-imagery",
    name: "CreativeMetaphorPoeticSynesthesiaImagerySkill",
    displayName: "Poetic Synesthesia & Multi-Sensory Metaphor Generation",
    categoryId: "creative",
    description: "Constructs evocative figurative language blending cross-modal sensory perceptions (tactile sound, luminous taste, weighted color).",
    tags: ["creative","poetry","synesthesia","metaphor","imagery","literary-craft"],
    transform: createStandardSkillTransform({
      sectionName: "Poetic Synesthesia & Imagery Standards",
      ruSectionName: "Синестезия и мультисенсорные метафоры в поэтическом тексте",
      instructions: [
        "Cross sensory domains boldly: describe sounds through tactile textures, lights through physical temperatures.",
        "Avoid clichéd metaphors ('eyes like stars'); find unexpected structural affinities between disparate objects.",
        "Ground abstract philosophical emotions in concrete physical sensory anchors."
],
      ruInstructions: [
        "Смешивайте сенсорные регистры: описывайте звук через осязаемую текстуру, а свет — через температуру.",
        "Избегайте затертых штампов; находите неочевидные глубинные аналогии между разнородными явлениями.",
        "Заземляйте абстрактные переживания в конкретных физических и тактильных деталях."
],
      semanticType: "structural_directive",
      tags: ["creative","poetry","synesthesia","metaphor","imagery","literary-craft"],
    }),
  },

  "creative-noir-detective-cynical-subtext": {
    id: "creative-noir-detective-cynical-subtext",
    name: "CreativeNoirDetectiveCynicalSubtextSkill",
    displayName: "Hardboiled Noir Detective Fiction & Cynical Atmosphere",
    categoryId: "creative",
    description: "Emulates classic Raymond Chandler / Dashiell Hammett noir: rain-slicked neon streets, moral compromise, and sardonic similes.",
    tags: ["creative","noir","hardboiled","fiction","chandler","mystery"],
    transform: createStandardSkillTransform({
      sectionName: "Hardboiled Noir Narrative Atmosphere",
      ruSectionName: "Атмосфера крутого нуарного детектива (Рэймонд Чандлер / Дашил Хэммет)",
      instructions: [
        "Use sharp, unexpected sardonic similes ('as honest as a three-dollar bill').",
        "Create morally ambiguous protagonists operating in corrupt institutional systems.",
        "Paint vivid sensory environments of smoke, neon reflections, rain, and quiet urban loneliness."
],
      ruInstructions: [
        "Используйте едкие, хлесткие сравнения и ироничный внутренний монолог героя.",
        "Создавайте неоднозначных персонажей, балансирующих на грани закона в продажном мире.",
        "Передавайте густую атмосферу ночного города: блики неона на мокром асфальте, дым и одиночество."
],
      semanticType: "structural_directive",
      tags: ["creative","noir","hardboiled","fiction","chandler","mystery"],
    }),
  },

  "creative-cyberpunk-dystopian-worldbuilding": {
    id: "creative-cyberpunk-dystopian-worldbuilding",
    name: "CreativeCyberpunkDystopianWorldbuildingSkill",
    displayName: "Cyberpunk Worldbuilding (High Tech, Low Life Aesthetic)",
    categoryId: "creative",
    description: "Constructs dense cyberpunk settings: megacorporation sovereignty, black-market neural wetware, and street-level counterculture.",
    tags: ["creative","cyberpunk","worldbuilding","sci-fi","dystopia","aesthetic"],
    transform: createStandardSkillTransform({
      sectionName: "Cyberpunk Dystopian Worldbuilding Blueprint",
      ruSectionName: "Миростроение в жанре киберпанк (High Tech, Low Life / Уильям Гибсон)",
      instructions: [
        "Intertwine cutting-edge neurotechnology with decaying, chaotic street-level urban reality.",
        "Establish sovereign megacorporations whose economic power completely eclipses nation-states.",
        "Incorporate authentic street slang, neural cyberware trade-offs, and subterranean underground economies."
],
      ruInstructions: [
        "Соединяйте прорывные нейротехнологии с разрухой и выживанием на уровне трущоб мегаполиса.",
        "Показывайте всесилие корпораций-дзайбацу, подменивших собой государственные институты.",
        "Внедряйте аутентичный уличный сленг, побочные эффекты аугментаций и теневой рынок данных."
],
      semanticType: "structural_directive",
      tags: ["creative","cyberpunk","worldbuilding","sci-fi","dystopia","aesthetic"],
    }),
  },

  "creative-surrealist-automatisme-dream-logic": {
    id: "creative-surrealist-automatisme-dream-logic",
    name: "CreativeSurrealistAutomatismeDreamLogicSkill",
    displayName: "Surrealist Dream Logic & André Breton Automatism",
    categoryId: "creative",
    description: "Explores subconscious associations, non-Euclidean spatial transitions, and poetic juxtaposition of contradictory objects.",
    tags: ["creative","surrealism","dream-logic","avant-garde","subconscious","art"],
    transform: createStandardSkillTransform({
      sectionName: "Surrealist Dream Logic Architecture",
      ruSectionName: "Сюрреалистическая логика сновидений и автоматическое письмо (Андре Бретон)",
      instructions: [
        "Subvert linear causal logic in favor of emotional and symbolic dream associations.",
        "Juxtapose radically unrelated objects to unlock startling unconscious poetic resonance.",
        "Treat impossible spatial and temporal shifts with matter-of-fact narrative calmness."
],
      ruInstructions: [
        "Заменяйте прямолинейную логику причин и следствий символическими связями сновидений.",
        "Сопоставляйте контрастные образы для пробуждения глубинных ассоциаций подсознания.",
        "Описывайте метаморфозы пространства и времени как естественные и не вызывающие удивления события."
],
      semanticType: "structural_directive",
      tags: ["creative","surrealism","dream-logic","avant-garde","subconscious","art"],
    }),
  },
  "creative-haiku-kireji-seasonal-cutting-word": {
    id: "creative-haiku-kireji-seasonal-cutting-word",
    name: "CreativeHaikuKirejiSeasonalCuttingWordSkill",
    displayName: "Classical Japanese Haiku (Kigo & Kireji Cutting Words)",
    categoryId: "creative",
    description: "Composes 5-7-5 syllable haiku rooted in seasonal kigo references and a dramatic conceptual cutting pause (kireji).",
    tags: ["creative","poetry","haiku","kigo","japanese-literature"],
    transform: createStandardSkillTransform({
      sectionName: "Classical Japanese Haiku Architecture",
      ruSectionName: "Классическое японское хокку (Сезонное слово киго и пауза кирэдзи)",
      instructions: [
        "Follow strict 5-7-5 morae rhythm with a vivid natural kigo seasonal marker.",
        "Incorporate an evocative cutting pause (kireji) juxtaposing two distinct imagery moments.",
        "Capture fleeting impermanence (mono no aware) without overt moralizing."
],
      ruInstructions: [
        "Соблюдайте ритмическую структуру 5-7-5 с указанием на время года (киго).",
        "Используйте смысловой перелом (кирэдзи), сопоставляющий два визуальных образа.",
        "Передавайте мимолетность момента (моно-но аварэ) без назидательности."
],
      semanticType: "structural_directive",
      tags: ["creative","poetry","haiku","kigo","japanese-literature"],
    }),
  },

  "creative-epic-poetry-dactylic-hexameter-homer": {
    id: "creative-epic-poetry-dactylic-hexameter-homer",
    name: "CreativeEpicPoetryDactylicHexameterHomerSkill",
    displayName: "Homeric Epic Poetry & Dactylic Hexameter Invocation",
    categoryId: "creative",
    description: "Crafts epic heroic poetry featuring Muse invocations, epithets (rosy-fingered Dawn), and extended Homeric similes.",
    tags: ["creative","poetry","epic","homer","mythology","classics"],
    transform: createStandardSkillTransform({
      sectionName: "Homeric Epic Poetry Architecture",
      ruSectionName: "Гомеровский героический эпос (Гекзаметр, постоянные эпитеты, призыв Музы)",
      instructions: [
        "Begin with a solemn invocation to the Muse asking for inspiration to tell of grand struggles.",
        "Use repeating character epithets ('swift-footed Achilles', 'grey-eyed Athena').",
        "Deploy sprawling extended similes drawn from animal hunts, ocean tempests, and roaring fires."
],
      ruInstructions: [
        "Начинайте с торжественного призыва к Музе для воспевания подвигов и гнева героев.",
        "Используйте устойчивые эпитеты («быстроногий Ахилл», «совоокая Афина»).",
        "Разворачивайте масштабные гомеровские сравнения из жизни дикой природы и морских бурь."
],
      semanticType: "structural_directive",
      tags: ["creative","poetry","epic","homer","mythology","classics"],
    }),
  },

  "creative-magical-realism-marquez-macondo": {
    id: "creative-magical-realism-marquez-macondo",
    name: "CreativeMagicalRealismMarquezMacondoSkill",
    displayName: "Gabriel García Márquez Magical Realism & Mythic Matter-of-Factness",
    categoryId: "creative",
    description: "Blends fantastical occurrences (yellow butterflies, ascending levitations) with calm, journalistic realism in Latin American tradition.",
    tags: ["creative","magical-realism","marquez","literature","fiction"],
    transform: createStandardSkillTransform({
      sectionName: "Magical Realism Narrative Standards",
      ruSectionName: "Магический реализм Габриэля Гарсиа Маркеса (Будничные чудеса Макондо)",
      instructions: [
        "Narrate impossible supernatural phenomena with complete deadpan journalistic sobriety.",
        "Intertwine multi-generational family curses, tropical humidity, and historical cycles of solitude.",
        "Treat magical events as ordinary town gossip and ordinary modern technology as terrifying sorcery."
],
      ruInstructions: [
        "Описывайте невероятные чудеса спокойным репортерским тоном без тени сомнения.",
        "Переплетайте родовые проклятия, тропические ливни и циклы исторического одиночества.",
        "Относитесь к магии как к повседневности, а к плодам прогресса — как к непостижимому волшебству."
],
      semanticType: "structural_directive",
      tags: ["creative","magical-realism","marquez","literature","fiction"],
    }),
  },

  "creative-steampunk-victorian-clockwork-aesthetics": {
    id: "creative-steampunk-victorian-clockwork-aesthetics",
    name: "CreativeSteampunkVictorianClockworkAestheticsSkill",
    displayName: "Steampunk Victorian Brass & Pneumatic Clockwork Aesthetics",
    categoryId: "creative",
    description: "Designs alternative 19th-century worlds powered by brass gears, pressurized steam pistons, airships, and gaslight romance.",
    tags: ["creative","steampunk","sci-fi","worldbuilding","victorian"],
    transform: createStandardSkillTransform({
      sectionName: "Steampunk Aesthetic Worldbuilding Standards",
      ruSectionName: "Стимпанк-миростроение (Викторианская эстетика, шестеренки, дирижабли и пар)",
      instructions: [
        "Describe mechanical systems with tactile detail: polished brass valves, escaping steam pressure, and ticking escapements.",
        "Juxtapose rigid Victorian social etiquette with madcap pneumatic aerial inventions.",
        "Ground technology in analog physical mechanisms rather than magical microchips."
],
      ruInstructions: [
        "Детализируйте механические узлы: латунные манометры, свист паровых клапанов и шум шестеренок.",
        "Сочетайте чопорные викторианские манеры с безумными изобретениями воздухоплавателей.",
        "Опирайтесь на аналоговую механику и термодинамику пара, исключая цифровую электронику."
],
      semanticType: "structural_directive",
      tags: ["creative","steampunk","sci-fi","worldbuilding","victorian"],
    }),
  },

  "creative-horror-lovecraftian-cosmic-dread": {
    id: "creative-horror-lovecraftian-cosmic-dread",
    name: "CreativeHorrorLovecraftianCosmicDreadSkill",
    displayName: "Lovecraftian Cosmic Horror & Existential Insignificance",
    categoryId: "creative",
    description: "Evokes atmospheric dread through ancient non-Euclidean architectures, sanity-shattering cosmic entities, and forbidden grimoires.",
    tags: ["creative","horror","lovecraft","cosmic-dread","fiction"],
    transform: createStandardSkillTransform({
      sectionName: "Cosmic Horror & Dread Architecture",
      ruSectionName: "Лавкрафтовский космический ужас (Безумие, Древние боги, неевклидова геометрия)",
      instructions: [
        "Emphasize the utter cosmic insignificance of humanity before incomprehensible primordial entities.",
        "Describe architectural geometries that defy Euclidean mathematics and break the narrator's senses.",
        "Build creeping paranoia through scholarly research in dust-covered occult libraries."
],
      ruInstructions: [
        "Подчеркивайте ничтожность человечества перед лицом древних непостижимых сущностей космоса.",
        "Описывайте искаженные циклопические строения с невозможной неевклидовой геометрией.",
        "Нагнетайте паранойю через архивные изыскания в старинных трактатах и запретных манускриптах."
],
      semanticType: "structural_directive",
      tags: ["creative","horror","lovecraft","cosmic-dread","fiction"],
    }),
  },

  "creative-lyric-songwriting-verse-chorus-bridge": {
    id: "creative-lyric-songwriting-verse-chorus-bridge",
    name: "CreativeLyricSongwritingVerseChorusBridgeSkill",
    displayName: "Commercial Lyric Songwriting & Prosody Harmonization",
    categoryId: "creative",
    description: "Structures radio-ready song lyrics: storytelling verses, explosive anthemic choruses, and transformative bridge twists.",
    tags: ["creative","songwriting","lyrics","music","composition"],
    transform: createStandardSkillTransform({
      sectionName: "Commercial Lyric Songwriting Standards",
      ruSectionName: "Написание текстов песен (Куплет, взрывной припев, бридж и ритмика)",
      instructions: [
        "Ensure perfect prosody: lyrical syllable stresses must match musical beat downbeats naturally.",
        "Contrast sensory details in Verses with high-level universal emotional release in the Chorus.",
        "Deliver an unexpected emotional realization or sonic dynamic shift in the Bridge."
],
      ruInstructions: [
        "Соблюдайте просодию: ударения в словах должны точно попадать в сильные доли музыкального такта.",
        "Контрастируйте сюжетные детали в куплетах с обобщающим эмоциональным выплеском в припеве.",
        "Создавайте поворотный смысловой и гармонический сдвиг в бридже (Bridge)."
],
      semanticType: "structural_directive",
      tags: ["creative","songwriting","lyrics","music","composition"],
    }),
  },

  "creative-space-opera-intergalactic-geopolitics": {
    id: "creative-space-opera-intergalactic-geopolitics",
    name: "CreativeSpaceOperaIntergalacticGeopoliticsSkill",
    displayName: "Epic Space Opera & Interstellar Dynastic Geopolitics",
    categoryId: "creative",
    description: "Builds massive sci-fi sagas (Dune / Foundation style): dynastic royal houses, faster-than-light trade monopolies, and planet-spanning cultures.",
    tags: ["creative","space-opera","sci-fi","dune","worldbuilding"],
    transform: createStandardSkillTransform({
      sectionName: "Space Opera Dynastic Worldbuilding Standards",
      ruSectionName: "Космическая опера (Межзвездные династии, монополии на прыжки и геополитика)",
      instructions: [
        "Establish deep economic and technological dependencies governing faster-than-light transit corridors.",
        "Model feudal dynastic bloodlines, religious orders, and planetary resource monopolies.",
        "Weave intimate personal betrayals into sweeping galaxy-shattering military campaigns."
],
      ruInstructions: [
        "Проектируйте экономическую зависимость империй от редких ресурсов для сверхсветовых перелетов.",
        "Создавайте феодальные Дома, тайные религиозные ордены и планетарные ресурсные монополии.",
        "Переплетайте личные драмы героев с масштабными межзвездными баталиями."
],
      semanticType: "structural_directive",
      tags: ["creative","space-opera","sci-fi","dune","worldbuilding"],
    }),
  },

  "creative-childrens-picture-book-rhythm-rhyme": {
    id: "creative-childrens-picture-book-rhythm-rhyme",
    name: "CreativeChildrensPictureBookRhythmRhymeSkill",
    displayName: "Children's Picture Book Rhythmic Storytelling & Visual Cues",
    categoryId: "creative",
    description: "Crafts playful, read-aloud early childhood picture books featuring onomatopoeia, refrains, and dynamic page-turn anticipation.",
    tags: ["creative","childrens-books","picture-book","storytelling","rhyme"],
    transform: createStandardSkillTransform({
      sectionName: "Children's Picture Book Narrative Standards",
      ruSectionName: "Ритмические детские сказки и иллюстрированные книги (Onomatopoeia, Page-turns)",
      instructions: [
        "Use joyful onomatopoeia, alliteration, and musical cadence designed for reading aloud.",
        "Structure satisfying predictable refrains that toddlers can chant along with.",
        "Place cliffhangers and visual mystery prompts at the end of each spread to drive page turns."
],
      ruInstructions: [
        "Используйте звукоподражание (бум-трах), аллитерацию и певучий ритм для чтения вслух родителями.",
        "Создавайте повторяющиеся запоминающиеся рефрены, которые дети могут подпевать хором.",
        "Заканчивайте каждый разворот визуальной загадкой, мотивирующей перевернуть страницу."
],
      semanticType: "structural_directive",
      tags: ["creative","childrens-books","picture-book","storytelling","rhyme"],
    }),
  },

  "creative-flash-fiction-500-words-twist": {
    id: "creative-flash-fiction-500-words-twist",
    name: "CreativeFlashFiction500WordsTwistSkill",
    displayName: "Micro & Flash Fiction (<500 Words) Punchline Twists",
    categoryId: "creative",
    description: "Distills powerful short narratives under 500 words with immediate character stakes, compressed timeframes, and unforgettable endings.",
    tags: ["creative","flash-fiction","micro-story","writing-craft","short-story"],
    transform: createStandardSkillTransform({
      sectionName: "Flash Fiction Architecture (<500 Words)",
      ruSectionName: "Мастерство микропрозы и флеш-фикшн (До 500 слов, неожиданный финал)",
      instructions: [
        "Start in media res on the critical turning second of the protagonist's life.",
        "Every single adjective and verb must pull double duty conveying plot and theme.",
        "Deliver a closing sentence that completely reframes the reader's understanding of the opening line."
],
      ruInstructions: [
        "Начинайте прямо в эпицентре ключевого события (in media res) без долгих вступлений.",
        "Каждое слово и глагол должны нести двойную смысловую нагрузку для сюжета и раскрытия темы.",
        "Завершайте текст финальной фразой, переворачивающей восприятие всей истории с ног на голову."
],
      semanticType: "structural_directive",
      tags: ["creative","flash-fiction","micro-story","writing-craft","short-story"],
    }),
  },

  "creative-gothic-romance-haunted-manor-atmosphere": {
    id: "creative-gothic-romance-haunted-manor-atmosphere",
    name: "CreativeGothicRomanceHauntedManorAtmosphereSkill",
    displayName: "Gothic Romance & Decaying Haunted Manor Atmosphere",
    categoryId: "creative",
    description: "Constructs atmospheric Victorian gothic fiction: windswept moors, ancestral curses, architectural labyrinths, and brooding aristocrats.",
    tags: ["creative","gothic","romance","horror","victorian","atmosphere"],
    transform: createStandardSkillTransform({
      sectionName: "Gothic Romance Narrative Standards",
      ruSectionName: "Готический роман (Мрачные поместья, родовые тайны, вересковые пустоши)",
      instructions: [
        "Treat the decaying architectural estate as a living, menacing character with secrets.",
        "Evoke windswept foggy moors, flickering candlelight, and unexplainable nighttime footsteps.",
        "Balance intense psychological attraction with deep dread and hidden ancestral crimes."
],
      ruInstructions: [
        "Превращайте старинный разрушающийся особняк в отдельного одушевленного персонажа с тайнами.",
        "Создавайте атмосферу туманных пустошей, колеблющегося пламени свечей и шагов в темных коридорах.",
        "Балансируйте между романтическим влечением и леденящим страхом перед темным прошлым рода."
],
      semanticType: "structural_directive",
      tags: ["creative","gothic","romance","horror","victorian","atmosphere"],
    }),
  },

  "creative-comedic-satire-onion-parody-craft": {
    id: "creative-comedic-satire-onion-parody-craft",
    name: "CreativeComedicSatireOnionParodyCraftSkill",
    displayName: "Sharp Satirical News Parody & Irony (The Onion Style)",
    categoryId: "creative",
    description: "Writes razor-sharp journalistic satire using deadpan headlines, absurd premises treated with grave institutional seriousness.",
    tags: ["creative","satire","comedy","parody","the-onion","humor"],
    transform: createStandardSkillTransform({
      sectionName: "Satirical News Parody Blueprint",
      ruSectionName: "Острая социальная сатира и новостная пародия (В традициях The Onion)",
      instructions: [
        "Craft headlines that embody the entire joke premise cleanly with zero wasted words.",
        "Report absurd, bizarre premises with bone-dry, solemn Associated Press journalistic sobriety.",
        "Include fabricated quotes from self-deluded citizens and pompous corporate PR spokespeople."
],
      ruInstructions: [
        "Формулируйте заголовок так, чтобы в нем содержалась вся соль комической идеи без лишних слов.",
        "Подавайте абсурдный инфоповод с невозмутимой серьезностью официального репортажа новостных агентств.",
        "Добавляйте вымышленные цитаты самодовольных экспертов и шаблонных пресс-секретарей."
],
      semanticType: "structural_directive",
      tags: ["creative","satire","comedy","parody","the-onion","humor"],
    }),
  },

  "creative-solarpunk-optimistic-ecological-utopia": {
    id: "creative-solarpunk-optimistic-ecological-utopia",
    name: "CreativeSolarpunkOptimisticEcologicalUtopiaSkill",
    displayName: "Solarpunk Optimistic Eco-Utopian Worldbuilding",
    categoryId: "creative",
    description: "Builds hopeful, high-tech sustainable futures: solar stained-glass, urban permaculture towers, community co-ops, and biomimicry.",
    tags: ["creative","solarpunk","sci-fi","sustainability","utopia","ecology"],
    transform: createStandardSkillTransform({
      sectionName: "Solarpunk Worldbuilding Standards",
      ruSectionName: "Миростроение в стиле соларпанк (Solarpunk: Эко-утопия, возобновляемая энергия, надежда)",
      instructions: [
        "Envision high-technology coexisting symbiotically with lush biodiversity and indigenous flora.",
        "Highlight grassroots cooperative governance, decentralized microgrids, and circular zero-waste economies.",
        "Focus conflict on ecological restoration, communal consensus building, and healing past industrial scars."
],
      ruInstructions: [
        "Проектируйте гармоничный союз высоких технологий и пышной природы (пермакультура, солнечные витражи).",
        "Показывайте децентрализованную зеленую энергетику и циркулярную безотходную экономику.",
        "Стройте сюжет вокруг восстановления экосистем и преодоления последствий индустриального кризиса."
],
      semanticType: "structural_directive",
      tags: ["creative","solarpunk","sci-fi","sustainability","utopia","ecology"],
    }),
  },

  "creative-standup-comedy-premise-punchline-callback": {
    id: "creative-standup-comedy-premise-punchline-callback",
    name: "CreativeStandupComedyPremisePunchlineCallbackSkill",
    displayName: "Stand-Up Comedy Bit Writing & Setup-Punch-Tag Mechanics",
    categoryId: "creative",
    description: "Structures stand-up comedy sets: relatable premises, misdirection punchlines, rapid-fire tags, and closing callbacks.",
    tags: ["creative","comedy","standup","humor","joke-writing"],
    transform: createStandardSkillTransform({
      sectionName: "Stand-Up Comedy Set Writing Standards",
      ruSectionName: "Написание стендап-комедии (Сетап, панчлайн, тэги и колбэки)",
      instructions: [
        "Setup: Establish a recognizable shared human truth or embarrassing observation.",
        "Punchline: Shatter expectation with an unexpected lateral association or reverse exaggeration.",
        "Tags & Callbacks: Stack 2-3 quick follow-up jokes and weave earlier punchlines into later bits."
],
      ruInstructions: [
        "Сетап (Setup): Задавайте понятную жизненную ситуацию или парадоксальное наблюдение.",
        "Панчлайн (Punchline): Ломайте ожидания слушателя неожиданным ракурсом или контрастным сравнением.",
        "Тэги и колбэки: Добивайте шутку дополнительными репликами (Tags) и связывайте финал с началом сета."
],
      semanticType: "structural_directive",
      tags: ["creative","comedy","standup","humor","joke-writing"],
    }),
  },

  "creative-interactive-murder-mystery-clue-matrix": {
    id: "creative-interactive-murder-mystery-clue-matrix",
    name: "CreativeInteractiveMurderMysteryClueMatrixSkill",
    displayName: "Agatha Christie Murder Mystery & Whodunit Clue Matrix",
    categoryId: "creative",
    description: "Designs fair-play whodunits: locked-room crime scenes, distinct suspect alibis, hidden physical clues, and clever red herrings.",
    tags: ["creative","mystery","whodunit","agatha-christie","detective"],
    transform: createStandardSkillTransform({
      sectionName: "Fair-Play Murder Mystery Architecture",
      ruSectionName: "Классический детектив-головоломка (Whodunit: Улики, ложные следы, алиби подозреваемых)",
      instructions: [
        "Ensure Fair-Play rule: every single clue needed to identify the killer must be presented to the reader beforehand.",
        "Give every suspect a distinct motive, a viable opportunity, and a plausible lie in their alibi.",
        "Disguise the true murder weapon or clue in plain sight through clever psychological misdirection."
],
      ruInstructions: [
        "Соблюдайте правило честной игры: все улики для раскрытия убийцы должны быть открыты читателю до финала.",
        "Давайте каждому подозреваемому скрытый мотив, возможность совершения преступления и ложное алиби.",
        "Маскируйте ключевую улику на самом видном месте через психологическое отвлечение внимания."
],
      semanticType: "structural_directive",
      tags: ["creative","mystery","whodunit","agatha-christie","detective"],
    }),
  },
  "creative-folk-fairy-tale-propp-morphology": {
    id: "creative-folk-fairy-tale-propp-morphology",
    name: "CreativeFolkFairyTaleProppMorphologySkill",
    displayName: "Vladimir Propp Folk Tale Morphology & Archetypal Functions",
    categoryId: "creative",
    description: "Structures authentic folktales using Vladimir Propp's 31 narrative functions (Interdiction, Violation, Departure, Donor Test).",
    tags: ["creative","folklore","propp","fairy-tale","mythology"],
    transform: createStandardSkillTransform({
      sectionName: "Folk Tale Morphology Framework",
      ruSectionName: "Морфология волшебной сказки Владимира Проппа (31 функция сюжета)",
      instructions: [
        "Sequence narrative via classical functions: Absentation -> Interdiction -> Violation -> Donor Encounter -> Magical Aid.",
        "Include traditional folk motifs: threefold repetitions, talking beasts, and liminal forest crossroads.",
        "Reward moral virtue and resourcefulness while punishing greed through poetic karmic justice."
],
      ruInstructions: [
        "Выстраивайте сюжет по функциям Проппа: Запрет -> Нарушение -> Встреча с дарителем -> Испытание -> Награда.",
        "Используйте традиционные сказочные мотивы: троекратные повторы, говорящих зверей и дремучий лес.",
        "Награждайте доброту и смекалку, наказывая алчность закономерным сказочным возмездием."
],
      semanticType: "structural_directive",
      tags: ["creative","folklore","propp","fairy-tale","mythology"],
    }),
  },

  "creative-stream-of-consciousness-joyce-woolf": {
    id: "creative-stream-of-consciousness-joyce-woolf",
    name: "CreativeStreamOfConsciousnessJoyceWoolfSkill",
    displayName: "Modernist Stream of Consciousness (James Joyce / Virginia Woolf)",
    categoryId: "creative",
    description: "Captures unedited sensory flow, internal monologues, and involuntary memory associations (Proustian epiphanies).",
    tags: ["creative","modernism","stream-of-consciousness","joyce","woolf","literature"],
    transform: createStandardSkillTransform({
      sectionName: "Stream of Consciousness Prose Standards",
      ruSectionName: "Поток сознания модернистской прозы (Джеймс Джойс / Вирджиния Вулф)",
      instructions: [
        "Weave continuous internal thought streams with immediate sensory sights, sounds, and physical sensations.",
        "Transition seamlessly between present moments and deep involuntary childhood memories.",
        "Embrace rhythmic, fluid sentence structures reflecting the authentic ebb and flow of human thought."
],
      ruInstructions: [
        "Переплетайте внутренний диалог персонажа с непосредственными звуками и запахами окружающего мира.",
        "Совершайте плавные ассоциативные переходы от текущего момента к глубоким пластам памяти.",
        "Используйте текучий, музыкальный синтаксис, отражающий непрерывное биение мысли."
],
      semanticType: "structural_directive",
      tags: ["creative","modernism","stream-of-consciousness","joyce","woolf","literature"],
    }),
  },

  "creative-cyber-noir-augmented-detective": {
    id: "creative-cyber-noir-augmented-detective",
    name: "CreativeCyberNoirAugmentedDetectiveSkill",
    displayName: "Cyber-Noir Augmented Reality Investigation & Digital Grit",
    categoryId: "creative",
    description: "Merges rain-drenched hardboiled detective tropes with ocular HUD overlays, memory implant forensic extractions, and neon haze.",
    tags: ["creative","cyber-noir","sci-fi","detective","cyberpunk"],
    transform: createStandardSkillTransform({
      sectionName: "Cyber-Noir Narrative Standards",
      ruSectionName: "Кибер-нуар: дополненная реальность, оцифрованные воспоминания и неоновый туман",
      instructions: [
        "Interleave cynical detective inner monologues with flickering HUD augmented-reality biometric feeds.",
        "Investigate crimes involving stolen neural memories, deepfake alibis, and rogue synthetic clones.",
        "Maintain moody atmosphere: neon reflections in dirty puddle water, cigarette smoke, and synthetic rain."
],
      ruInstructions: [
        "Сочетайте циничный монолог сыщика с мерцающими данными оптического HUD-интерфейса.",
        "Расследуйте преступления, связанные с кражей нейронных воспоминаний и синтетическими клонами.",
        "Передавайте фактуру города: неоновые блики в грязных лужах, сигаретный дым и кислотный дождь."
],
      semanticType: "structural_directive",
      tags: ["creative","cyber-noir","sci-fi","detective","cyberpunk"],
    }),
  },

  "creative-mythological-pantheon-creation": {
    id: "creative-mythological-pantheon-creation",
    name: "CreativeMythologicalPantheonCreationSkill",
    displayName: "Mythological Pantheon & Cosmogony Creation Engine",
    categoryId: "creative",
    description: "Generates coherent polytheistic pantheons: creation cosmogonies, sibling rivalries, divine domains, and mortal prayer rituals.",
    tags: ["creative","mythology","worldbuilding","pantheon","gods"],
    transform: createStandardSkillTransform({
      sectionName: "Mythological Pantheon Architecture",
      ruSectionName: "Проектирование мифологического пантеона и космогонических мифов",
      instructions: [
        "Establish a foundational Creation Cosmogony explaining how order arose from primordial chaos.",
        "Design distinct divine portfolios (sun, storm, craft, underworld) with complex sibling jealousies.",
        "Detail tangible mortal worship practices, taboos, sacrificial rites, and temple architecture."
],
      ruInstructions: [
        "Формулируйте миф о сотворении мира: как из первобытного хаоса возник мировой порядок.",
        "Распределяйте сферы влияния богов (солнце, гроза, ремесло) с учетом их сложных родственных интриг.",
        "Описывайте священные обряды смертных, храмовые праздники и табу."
],
      semanticType: "structural_directive",
      tags: ["creative","mythology","worldbuilding","pantheon","gods"],
    }),
  },

  "creative-epic-fantasy-conlang-phonotactics": {
    id: "creative-epic-fantasy-conlang-phonotactics",
    name: "CreativeEpicFantasyConlangPhonotacticsSkill",
    displayName: "Fantasy Conlang Naming & Phonotactic Consistency",
    categoryId: "creative",
    description: "Develops believable fictional languages (Tolkien style) with strict phonetic inventories, consonant clusters, and naming conventions.",
    tags: ["creative","conlang","fantasy","worldbuilding","linguistics"],
    transform: createStandardSkillTransform({
      sectionName: "Fantasy Conlang Naming Standards",
      ruSectionName: "Лингвистическое конструирование языков (Конланги и фонетика имен по Толкину)",
      instructions: [
        "Define an explicit consonant and vowel phonetic inventory per culture (e.g. guttural vs flowing liquid sounds).",
        "Enforce strict phonotactic rules for syllable structure (CV, CVC) to ensure consistent name aesthetics.",
        "Derive place names and family surnames from shared linguistic root words with historical etymology."
],
      ruInstructions: [
        "Задавайте фонетический профиль языка расы (например, гортанные резкие звуки или певучие гласные).",
        "Соблюдайте правила построения слогов для гармоничного и узнаваемого звучания имен.",
        "Образуйте географические названия от общих базовых корней с прозрачной исторической этимологией."
],
      semanticType: "structural_directive",
      tags: ["creative","conlang","fantasy","worldbuilding","linguistics"],
    }),
  },

  "creative-screenplay-scene-beat-sheet-snyder": {
    id: "creative-screenplay-scene-beat-sheet-snyder",
    name: "CreativeScreenplaySceneBeatSheetSnyderSkill",
    displayName: "Blake Snyder 'Save the Cat' 15-Beat Screenplay Structure",
    categoryId: "creative",
    description: "Structures cinematic screenplays according to the proven 15-beat timeline: Catalyst, Break into Two, Midpoint, All is Lost, Climax.",
    tags: ["creative","screenwriting","save-the-cat","blake-snyder","cinema"],
    transform: createStandardSkillTransform({
      sectionName: "Save the Cat 15-Beat Screenplay Framework",
      ruSectionName: "15 сценарных ударов структуры «Спасите котика» (Blake Snyder Beat Sheet)",
      instructions: [
        "Place Opening Image and Catalyst cleanly within the first 10-12% of narrative runtime.",
        "Deliver a false victory/defeat at the Midpoint (50%) that raises stakes irreversibly.",
        "Plunge protagonist into the 'All is Lost' dark night of the soul before synthesizing the thematic lesson in the Climax."
],
      ruInstructions: [
        "Размещайте экспозицию и катализатор событий в первых 10–12 минутах экранного времени.",
        "Создавайте ложную победу или поражение в мидпоинте (50%), кардинально повышая ставки.",
        "Проводите героя через «темную ночь души» (All is Lost), подводя к перерождению в финале."
],
      semanticType: "structural_directive",
      tags: ["creative","screenwriting","save-the-cat","blake-snyder","cinema"],
    }),
  },
  "creative-hard-magic-system-sanderson-three-laws": {
    id: "creative-hard-magic-system-sanderson-three-laws",
    name: "HardMagicSystemSandersonThreeLawsSkill",
    displayName: "Hard Magic System Sanderson Three Laws",
    categoryId: "creative",
    description: "Designs consistent fantasy magic systems governed by Sanderson's laws.",
    tags: ["creative","creative","hard","magic"],
    transform: createStandardSkillTransform({
      sectionName: "Hard Magic System Sanderson Three Laws Standards",
      ruSectionName: "Стандарты и регламенты: Hard Magic System Sanderson Three Laws",
      instructions: [
        "Apply core domain tenets for Hard Magic System Sanderson Three Laws.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hard Magic System Sanderson Three Laws.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","hard","magic"],
    }),
  },

  "creative-pixar-22-rules-of-emotional-storytelling": {
    id: "creative-pixar-22-rules-of-emotional-storytelling",
    name: "Pixar22RulesofEmotionalStorytellingSkill",
    displayName: "Pixar 22 Rules of Emotional Storytelling",
    categoryId: "creative",
    description: "Applies Pixar narrative principles: admire character effort, embrace vulnerability.",
    tags: ["creative","creative","pixar","22"],
    transform: createStandardSkillTransform({
      sectionName: "Pixar 22 Rules of Emotional Storytelling Standards",
      ruSectionName: "Стандарты и регламенты: Pixar 22 Rules of Emotional Storytelling",
      instructions: [
        "Apply core domain tenets for Pixar 22 Rules of Emotional Storytelling.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Pixar 22 Rules of Emotional Storytelling.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","pixar","22"],
    }),
  },

  "creative-poetic-synesthesia-multi-sensory-imagery": {
    id: "creative-poetic-synesthesia-multi-sensory-imagery",
    name: "PoeticSynesthesiaMultiSensoryImagerySkill",
    displayName: "Poetic Synesthesia & Multi-Sensory Imagery",
    categoryId: "creative",
    description: "Constructs evocative figurative language blending cross-modal sensory perceptions.",
    tags: ["creative","creative","poetic","synesthesia"],
    transform: createStandardSkillTransform({
      sectionName: "Poetic Synesthesia & Multi-Sensory Imagery Standards",
      ruSectionName: "Стандарты и регламенты: Poetic Synesthesia & Multi-Sensory Imagery",
      instructions: [
        "Apply core domain tenets for Poetic Synesthesia & Multi-Sensory Imagery.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Poetic Synesthesia & Multi-Sensory Imagery.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","poetic","synesthesia"],
    }),
  },

  "creative-hardboiled-noir-detective-cynical-subtext": {
    id: "creative-hardboiled-noir-detective-cynical-subtext",
    name: "HardboiledNoirDetectiveCynicalSubtextSkill",
    displayName: "Hardboiled Noir Detective Cynical Subtext",
    categoryId: "creative",
    description: "Emulates classic Raymond Chandler / Dashiell Hammett noir atmosphere and similes.",
    tags: ["creative","creative","hardboiled","noir"],
    transform: createStandardSkillTransform({
      sectionName: "Hardboiled Noir Detective Cynical Subtext Standards",
      ruSectionName: "Стандарты и регламенты: Hardboiled Noir Detective Cynical Subtext",
      instructions: [
        "Apply core domain tenets for Hardboiled Noir Detective Cynical Subtext.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hardboiled Noir Detective Cynical Subtext.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","hardboiled","noir"],
    }),
  },

  "creative-cyberpunk-dystopian-high-tech-low-life": {
    id: "creative-cyberpunk-dystopian-high-tech-low-life",
    name: "CyberpunkDystopianHighTechLowLifeSkill",
    displayName: "Cyberpunk Dystopian High-Tech Low-Life",
    categoryId: "creative",
    description: "Constructs dense cyberpunk settings: megacorps, neural wetware, street culture.",
    tags: ["creative","creative","cyberpunk","dystopian"],
    transform: createStandardSkillTransform({
      sectionName: "Cyberpunk Dystopian High-Tech Low-Life Standards",
      ruSectionName: "Стандарты и регламенты: Cyberpunk Dystopian High-Tech Low-Life",
      instructions: [
        "Apply core domain tenets for Cyberpunk Dystopian High-Tech Low-Life.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cyberpunk Dystopian High-Tech Low-Life.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","cyberpunk","dystopian"],
    }),
  },

  "creative-surrealist-dream-logic-automatic-writing": {
    id: "creative-surrealist-dream-logic-automatic-writing",
    name: "SurrealistDreamLogicAutomaticWritingSkill",
    displayName: "Surrealist Dream Logic & Automatic Writing",
    categoryId: "creative",
    description: "Explores subconscious associations, non-Euclidean spaces, and poetic juxtapositions.",
    tags: ["creative","creative","surrealist","dream"],
    transform: createStandardSkillTransform({
      sectionName: "Surrealist Dream Logic & Automatic Writing Standards",
      ruSectionName: "Стандарты и регламенты: Surrealist Dream Logic & Automatic Writing",
      instructions: [
        "Apply core domain tenets for Surrealist Dream Logic & Automatic Writing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Surrealist Dream Logic & Automatic Writing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","surrealist","dream"],
    }),
  },

  "creative-classical-japanese-haiku-kigo-kireji": {
    id: "creative-classical-japanese-haiku-kigo-kireji",
    name: "ClassicalJapaneseHaikuKigoKirejiSkill",
    displayName: "Classical Japanese Haiku Kigo & Kireji",
    categoryId: "creative",
    description: "Composes 5-7-5 syllable haiku rooted in seasonal kigo references and kireji cutting words.",
    tags: ["creative","creative","classical","japanese"],
    transform: createStandardSkillTransform({
      sectionName: "Classical Japanese Haiku Kigo & Kireji Standards",
      ruSectionName: "Стандарты и регламенты: Classical Japanese Haiku Kigo & Kireji",
      instructions: [
        "Apply core domain tenets for Classical Japanese Haiku Kigo & Kireji.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Classical Japanese Haiku Kigo & Kireji.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","classical","japanese"],
    }),
  },

  "creative-homeric-epic-poetry-dactylic-hexameter": {
    id: "creative-homeric-epic-poetry-dactylic-hexameter",
    name: "HomericEpicPoetryDactylicHexameterSkill",
    displayName: "Homeric Epic Poetry Dactylic Hexameter",
    categoryId: "creative",
    description: "Crafts epic heroic poetry featuring Muse invocations, epithets, and extended similes.",
    tags: ["creative","creative","homeric","epic"],
    transform: createStandardSkillTransform({
      sectionName: "Homeric Epic Poetry Dactylic Hexameter Standards",
      ruSectionName: "Стандарты и регламенты: Homeric Epic Poetry Dactylic Hexameter",
      instructions: [
        "Apply core domain tenets for Homeric Epic Poetry Dactylic Hexameter.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Homeric Epic Poetry Dactylic Hexameter.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","homeric","epic"],
    }),
  },

  "creative-gabriel-garcia-marquez-magical-realism": {
    id: "creative-gabriel-garcia-marquez-magical-realism",
    name: "GabrielGarciaMarquezMagicalRealismSkill",
    displayName: "Gabriel Garcia Marquez Magical Realism",
    categoryId: "creative",
    description: "Blends fantastical occurrences with calm, journalistic realism in Latin American style.",
    tags: ["creative","creative","gabriel","garcia"],
    transform: createStandardSkillTransform({
      sectionName: "Gabriel Garcia Marquez Magical Realism Standards",
      ruSectionName: "Стандарты и регламенты: Gabriel Garcia Marquez Magical Realism",
      instructions: [
        "Apply core domain tenets for Gabriel Garcia Marquez Magical Realism.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Gabriel Garcia Marquez Magical Realism.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","gabriel","garcia"],
    }),
  },

  "creative-steampunk-victorian-clockwork-worldbuilding": {
    id: "creative-steampunk-victorian-clockwork-worldbuilding",
    name: "SteampunkVictorianClockworkWorldbuildingSkill",
    displayName: "Steampunk Victorian Clockwork Worldbuilding",
    categoryId: "creative",
    description: "Designs alternative 19th-century worlds powered by brass gears, steam, and airships.",
    tags: ["creative","creative","steampunk","victorian"],
    transform: createStandardSkillTransform({
      sectionName: "Steampunk Victorian Clockwork Worldbuilding Standards",
      ruSectionName: "Стандарты и регламенты: Steampunk Victorian Clockwork Worldbuilding",
      instructions: [
        "Apply core domain tenets for Steampunk Victorian Clockwork Worldbuilding.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Steampunk Victorian Clockwork Worldbuilding.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","steampunk","victorian"],
    }),
  },

  "creative-lovecraftian-cosmic-horror-dread": {
    id: "creative-lovecraftian-cosmic-horror-dread",
    name: "LovecraftianCosmicHorrorDreadSkill",
    displayName: "Lovecraftian Cosmic Horror & Dread",
    categoryId: "creative",
    description: "Evokes atmospheric dread through ancient non-Euclidean architectures and cosmic entities.",
    tags: ["creative","creative","lovecraftian","cosmic"],
    transform: createStandardSkillTransform({
      sectionName: "Lovecraftian Cosmic Horror & Dread Standards",
      ruSectionName: "Стандарты и регламенты: Lovecraftian Cosmic Horror & Dread",
      instructions: [
        "Apply core domain tenets for Lovecraftian Cosmic Horror & Dread.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Lovecraftian Cosmic Horror & Dread.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","lovecraftian","cosmic"],
    }),
  },

  "creative-commercial-lyric-songwriting-prosody": {
    id: "creative-commercial-lyric-songwriting-prosody",
    name: "CommercialLyricSongwritingProsodySkill",
    displayName: "Commercial Lyric Songwriting & Prosody",
    categoryId: "creative",
    description: "Structures radio-ready song lyrics: storytelling verses, explosive choruses, bridges.",
    tags: ["creative","creative","commercial","lyric"],
    transform: createStandardSkillTransform({
      sectionName: "Commercial Lyric Songwriting & Prosody Standards",
      ruSectionName: "Стандарты и регламенты: Commercial Lyric Songwriting & Prosody",
      instructions: [
        "Apply core domain tenets for Commercial Lyric Songwriting & Prosody.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Commercial Lyric Songwriting & Prosody.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","commercial","lyric"],
    }),
  },

  "creative-epic-space-opera-intergalactic-geopolitics": {
    id: "creative-epic-space-opera-intergalactic-geopolitics",
    name: "EpicSpaceOperaIntergalacticGeopoliticsSkill",
    displayName: "Epic Space Opera Intergalactic Geopolitics",
    categoryId: "creative",
    description: "Builds massive sci-fi sagas: dynastic royal houses, FTL trade, planet-spanning cultures.",
    tags: ["creative","creative","epic","space"],
    transform: createStandardSkillTransform({
      sectionName: "Epic Space Opera Intergalactic Geopolitics Standards",
      ruSectionName: "Стандарты и регламенты: Epic Space Opera Intergalactic Geopolitics",
      instructions: [
        "Apply core domain tenets for Epic Space Opera Intergalactic Geopolitics.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Epic Space Opera Intergalactic Geopolitics.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","epic","space"],
    }),
  },

  "creative-children-picture-book-rhythm-rhyme": {
    id: "creative-children-picture-book-rhythm-rhyme",
    name: "ChildrenPictureBookRhythmRhymeSkill",
    displayName: "Children Picture Book Rhythm & Rhyme",
    categoryId: "creative",
    description: "Crafts playful, read-aloud early childhood picture books featuring refrains.",
    tags: ["creative","creative","children","picture"],
    transform: createStandardSkillTransform({
      sectionName: "Children Picture Book Rhythm & Rhyme Standards",
      ruSectionName: "Стандарты и регламенты: Children Picture Book Rhythm & Rhyme",
      instructions: [
        "Apply core domain tenets for Children Picture Book Rhythm & Rhyme.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Children Picture Book Rhythm & Rhyme.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","children","picture"],
    }),
  },

  "creative-flash-fiction-under-500-words-twist": {
    id: "creative-flash-fiction-under-500-words-twist",
    name: "FlashFictionUnder500WordsTwistSkill",
    displayName: "Flash Fiction Under 500 Words Twist",
    categoryId: "creative",
    description: "Distills powerful short narratives under 500 words with punchline twists.",
    tags: ["creative","creative","flash","fiction"],
    transform: createStandardSkillTransform({
      sectionName: "Flash Fiction Under 500 Words Twist Standards",
      ruSectionName: "Стандарты и регламенты: Flash Fiction Under 500 Words Twist",
      instructions: [
        "Apply core domain tenets for Flash Fiction Under 500 Words Twist.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Flash Fiction Under 500 Words Twist.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","flash","fiction"],
    }),
  },

  "creative-satirical-news-parody-the-onion-style": {
    id: "creative-satirical-news-parody-the-onion-style",
    name: "SatiricalNewsParodyTheOnionStyleSkill",
    displayName: "Satirical News Parody The Onion Style",
    categoryId: "creative",
    description: "Writes razor-sharp journalistic satire using deadpan headlines and absurd premises.",
    tags: ["creative","creative","satirical","news"],
    transform: createStandardSkillTransform({
      sectionName: "Satirical News Parody The Onion Style Standards",
      ruSectionName: "Стандарты и регламенты: Satirical News Parody The Onion Style",
      instructions: [
        "Apply core domain tenets for Satirical News Parody The Onion Style.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Satirical News Parody The Onion Style.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","satirical","news"],
    }),
  },

  "creative-solarpunk-optimistic-eco-utopian-world": {
    id: "creative-solarpunk-optimistic-eco-utopian-world",
    name: "SolarpunkOptimisticEcoUtopianWorldSkill",
    displayName: "Solarpunk Optimistic Eco-Utopian World",
    categoryId: "creative",
    description: "Builds hopeful, high-tech sustainable futures: solar glass, permaculture, co-ops.",
    tags: ["creative","creative","solarpunk","optimistic"],
    transform: createStandardSkillTransform({
      sectionName: "Solarpunk Optimistic Eco-Utopian World Standards",
      ruSectionName: "Стандарты и регламенты: Solarpunk Optimistic Eco-Utopian World",
      instructions: [
        "Apply core domain tenets for Solarpunk Optimistic Eco-Utopian World.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Solarpunk Optimistic Eco-Utopian World.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","solarpunk","optimistic"],
    }),
  },

  "creative-stand-up-comedy-setup-punchline-callback": {
    id: "creative-stand-up-comedy-setup-punchline-callback",
    name: "StandUpComedySetupPunchlineCallbackSkill",
    displayName: "Stand-Up Comedy Setup Punchline Callback",
    categoryId: "creative",
    description: "Structures stand-up comedy sets: relatable premises, misdirection, tags, callbacks.",
    tags: ["creative","creative","stand","up"],
    transform: createStandardSkillTransform({
      sectionName: "Stand-Up Comedy Setup Punchline Callback Standards",
      ruSectionName: "Стандарты и регламенты: Stand-Up Comedy Setup Punchline Callback",
      instructions: [
        "Apply core domain tenets for Stand-Up Comedy Setup Punchline Callback.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Stand-Up Comedy Setup Punchline Callback.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","stand","up"],
    }),
  },

  "creative-agatha-christie-murder-mystery-clue-matrix": {
    id: "creative-agatha-christie-murder-mystery-clue-matrix",
    name: "AgathaChristieMurderMysteryClueMatrixSkill",
    displayName: "Agatha Christie Murder Mystery Clue Matrix",
    categoryId: "creative",
    description: "Designs fair-play whodunits: locked-room scenes, suspect alibis, red herrings.",
    tags: ["creative","creative","agatha","christie"],
    transform: createStandardSkillTransform({
      sectionName: "Agatha Christie Murder Mystery Clue Matrix Standards",
      ruSectionName: "Стандарты и регламенты: Agatha Christie Murder Mystery Clue Matrix",
      instructions: [
        "Apply core domain tenets for Agatha Christie Murder Mystery Clue Matrix.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Agatha Christie Murder Mystery Clue Matrix.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","agatha","christie"],
    }),
  },

  "creative-vladimir-propp-folk-tale-31-morphology": {
    id: "creative-vladimir-propp-folk-tale-31-morphology",
    name: "VladimirProppFolkTale31MorphologySkill",
    displayName: "Vladimir Propp Folk Tale 31 Morphology",
    categoryId: "creative",
    description: "Structures authentic folktales using Propp's 31 narrative functions.",
    tags: ["creative","creative","vladimir","propp"],
    transform: createStandardSkillTransform({
      sectionName: "Vladimir Propp Folk Tale 31 Morphology Standards",
      ruSectionName: "Стандарты и регламенты: Vladimir Propp Folk Tale 31 Morphology",
      instructions: [
        "Apply core domain tenets for Vladimir Propp Folk Tale 31 Morphology.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Vladimir Propp Folk Tale 31 Morphology.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","vladimir","propp"],
    }),
  },

  "creative-stream-of-consciousness-joyce-woolf-prose": {
    id: "creative-stream-of-consciousness-joyce-woolf-prose",
    name: "StreamofConsciousnessJoyceWoolfProseSkill",
    displayName: "Stream of Consciousness Joyce Woolf Prose",
    categoryId: "creative",
    description: "Captures unedited sensory flow, internal monologues, and involuntary memory.",
    tags: ["creative","creative","stream","of"],
    transform: createStandardSkillTransform({
      sectionName: "Stream of Consciousness Joyce Woolf Prose Standards",
      ruSectionName: "Стандарты и регламенты: Stream of Consciousness Joyce Woolf Prose",
      instructions: [
        "Apply core domain tenets for Stream of Consciousness Joyce Woolf Prose.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Stream of Consciousness Joyce Woolf Prose.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","stream","of"],
    }),
  },

  "creative-cyber-noir-augmented-reality-investigation": {
    id: "creative-cyber-noir-augmented-reality-investigation",
    name: "CyberNoirAugmentedRealityInvestigationSkill",
    displayName: "Cyber-Noir Augmented Reality Investigation",
    categoryId: "creative",
    description: "Merges rain-drenched hardboiled detective tropes with ocular HUD overlays.",
    tags: ["creative","creative","cyber","noir"],
    transform: createStandardSkillTransform({
      sectionName: "Cyber-Noir Augmented Reality Investigation Standards",
      ruSectionName: "Стандарты и регламенты: Cyber-Noir Augmented Reality Investigation",
      instructions: [
        "Apply core domain tenets for Cyber-Noir Augmented Reality Investigation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cyber-Noir Augmented Reality Investigation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","cyber","noir"],
    }),
  },

  "creative-mythological-cosmogony-pantheon-creation": {
    id: "creative-mythological-cosmogony-pantheon-creation",
    name: "MythologicalCosmogonyPantheonCreationSkill",
    displayName: "Mythological Cosmogony Pantheon Creation",
    categoryId: "creative",
    description: "Generates coherent polytheistic pantheons: creation cosmogonies and divine domains.",
    tags: ["creative","creative","mythological","cosmogony"],
    transform: createStandardSkillTransform({
      sectionName: "Mythological Cosmogony Pantheon Creation Standards",
      ruSectionName: "Стандарты и регламенты: Mythological Cosmogony Pantheon Creation",
      instructions: [
        "Apply core domain tenets for Mythological Cosmogony Pantheon Creation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Mythological Cosmogony Pantheon Creation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","mythological","cosmogony"],
    }),
  },

  "creative-fantasy-conlang-phonotactics-naming": {
    id: "creative-fantasy-conlang-phonotactics-naming",
    name: "FantasyConlangPhonotacticsNamingSkill",
    displayName: "Fantasy Conlang Phonotactics & Naming",
    categoryId: "creative",
    description: "Develops fictional languages with strict phonetic inventories and naming rules.",
    tags: ["creative","creative","fantasy","conlang"],
    transform: createStandardSkillTransform({
      sectionName: "Fantasy Conlang Phonotactics & Naming Standards",
      ruSectionName: "Стандарты и регламенты: Fantasy Conlang Phonotactics & Naming",
      instructions: [
        "Apply core domain tenets for Fantasy Conlang Phonotactics & Naming.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Fantasy Conlang Phonotactics & Naming.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","fantasy","conlang"],
    }),
  },

  "creative-blake-snyder-save-the-cat-15-beat-sheet": {
    id: "creative-blake-snyder-save-the-cat-15-beat-sheet",
    name: "BlakeSnyderSavetheCat15BeatSheetSkill",
    displayName: "Blake Snyder Save the Cat 15-Beat Sheet",
    categoryId: "creative",
    description: "Structures cinematic screenplays according to the proven 15-beat timeline.",
    tags: ["creative","creative","blake","snyder"],
    transform: createStandardSkillTransform({
      sectionName: "Blake Snyder Save the Cat 15-Beat Sheet Standards",
      ruSectionName: "Стандарты и регламенты: Blake Snyder Save the Cat 15-Beat Sheet",
      instructions: [
        "Apply core domain tenets for Blake Snyder Save the Cat 15-Beat Sheet.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Blake Snyder Save the Cat 15-Beat Sheet.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","blake","snyder"],
    }),
  },

  "creative-high-fantasy-worldbuilding-cultural-map": {
    id: "creative-high-fantasy-worldbuilding-cultural-map",
    name: "HighFantasyWorldbuildingCulturalMapSkill",
    displayName: "High Fantasy Worldbuilding Cultural Map",
    categoryId: "creative",
    description: "Architects high fantasy worlds: geography, trade routes, magic, and heraldry.",
    tags: ["creative","creative","high","fantasy"],
    transform: createStandardSkillTransform({
      sectionName: "High Fantasy Worldbuilding Cultural Map Standards",
      ruSectionName: "Стандарты и регламенты: High Fantasy Worldbuilding Cultural Map",
      instructions: [
        "Apply core domain tenets for High Fantasy Worldbuilding Cultural Map.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для High Fantasy Worldbuilding Cultural Map.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","high","fantasy"],
    }),
  },

  "creative-post-apocalyptic-survival-scarcity-fiction": {
    id: "creative-post-apocalyptic-survival-scarcity-fiction",
    name: "PostApocalypticSurvivalScarcityFictionSkill",
    displayName: "Post-Apocalyptic Survival Scarcity Fiction",
    categoryId: "creative",
    description: "Writes gritty post-apocalyptic fiction focused on resource scarcity and moral choices.",
    tags: ["creative","creative","post","apocalyptic"],
    transform: createStandardSkillTransform({
      sectionName: "Post-Apocalyptic Survival Scarcity Fiction Standards",
      ruSectionName: "Стандарты и регламенты: Post-Apocalyptic Survival Scarcity Fiction",
      instructions: [
        "Apply core domain tenets for Post-Apocalyptic Survival Scarcity Fiction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Post-Apocalyptic Survival Scarcity Fiction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","post","apocalyptic"],
    }),
  },

  "creative-historical-fiction-period-authenticity-arc": {
    id: "creative-historical-fiction-period-authenticity-arc",
    name: "HistoricalFictionPeriodAuthenticityArcSkill",
    displayName: "Historical Fiction Period Authenticity Arc",
    categoryId: "creative",
    description: "Crafts historical fiction with authentic dialogue, material culture, and social norms.",
    tags: ["creative","creative","historical","fiction"],
    transform: createStandardSkillTransform({
      sectionName: "Historical Fiction Period Authenticity Arc Standards",
      ruSectionName: "Стандарты и регламенты: Historical Fiction Period Authenticity Arc",
      instructions: [
        "Apply core domain tenets for Historical Fiction Period Authenticity Arc.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Historical Fiction Period Authenticity Arc.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","historical","fiction"],
    }),
  },

  "creative-psychological-thriller-unreliable-narrator": {
    id: "creative-psychological-thriller-unreliable-narrator",
    name: "PsychologicalThrillerunreliableNarratorSkill",
    displayName: "Psychological Thriller unreliable Narrator",
    categoryId: "creative",
    description: "Designs psychological thrillers featuring gaslighting and unreliable narrators.",
    tags: ["creative","creative","psychological","thriller"],
    transform: createStandardSkillTransform({
      sectionName: "Psychological Thriller unreliable Narrator Standards",
      ruSectionName: "Стандарты и регламенты: Psychological Thriller unreliable Narrator",
      instructions: [
        "Apply core domain tenets for Psychological Thriller unreliable Narrator.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Psychological Thriller unreliable Narrator.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","psychological","thriller"],
    }),
  },

  "creative-cozy-mystery-small-town-amateur-sleuth": {
    id: "creative-cozy-mystery-small-town-amateur-sleuth",
    name: "CozyMysterySmallTownAmateurSleuthSkill",
    displayName: "Cozy Mystery Small-Town Amateur Sleuth",
    categoryId: "creative",
    description: "Writes charming cozy mysteries featuring amateur sleuths and small-town eccentricities.",
    tags: ["creative","creative","cozy","mystery"],
    transform: createStandardSkillTransform({
      sectionName: "Cozy Mystery Small-Town Amateur Sleuth Standards",
      ruSectionName: "Стандарты и регламенты: Cozy Mystery Small-Town Amateur Sleuth",
      instructions: [
        "Apply core domain tenets for Cozy Mystery Small-Town Amateur Sleuth.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cozy Mystery Small-Town Amateur Sleuth.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","cozy","mystery"],
    }),
  },

  "creative-space-horror-alien-containment-isolation": {
    id: "creative-space-horror-alien-containment-isolation",
    name: "SpaceHorrorAlienContainmentIsolationSkill",
    displayName: "Space Horror Alien Containment Isolation",
    categoryId: "creative",
    description: "Evokes claustrophobic horror aboard isolated space stations hunted by alien life.",
    tags: ["creative","creative","space","horror"],
    transform: createStandardSkillTransform({
      sectionName: "Space Horror Alien Containment Isolation Standards",
      ruSectionName: "Стандарты и регламенты: Space Horror Alien Containment Isolation",
      instructions: [
        "Apply core domain tenets for Space Horror Alien Containment Isolation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Space Horror Alien Containment Isolation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","space","horror"],
    }),
  },

  "creative-urban-fantasy-hidden-magic-underbelly": {
    id: "creative-urban-fantasy-hidden-magic-underbelly",
    name: "UrbanFantasyHiddenMagicUnderbellySkill",
    displayName: "Urban Fantasy Hidden Magic Underbelly",
    categoryId: "creative",
    description: "Designs urban fantasy settings where secret magical societies coexist with modern cities.",
    tags: ["creative","creative","urban","fantasy"],
    transform: createStandardSkillTransform({
      sectionName: "Urban Fantasy Hidden Magic Underbelly Standards",
      ruSectionName: "Стандарты и регламенты: Urban Fantasy Hidden Magic Underbelly",
      instructions: [
        "Apply core domain tenets for Urban Fantasy Hidden Magic Underbelly.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Urban Fantasy Hidden Magic Underbelly.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","urban","fantasy"],
    }),
  },

  "creative-time-travel-multiverse-causality-paradox": {
    id: "creative-time-travel-multiverse-causality-paradox",
    name: "TimeTravelMultiverseCausalityParadoxSkill",
    displayName: "Time Travel Multiverse Causality Paradox",
    categoryId: "creative",
    description: "Structures complex time travel narratives managing grandfather paradoxes and timelines.",
    tags: ["creative","creative","time","travel"],
    transform: createStandardSkillTransform({
      sectionName: "Time Travel Multiverse Causality Paradox Standards",
      ruSectionName: "Стандарты и регламенты: Time Travel Multiverse Causality Paradox",
      instructions: [
        "Apply core domain tenets for Time Travel Multiverse Causality Paradox.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Time Travel Multiverse Causality Paradox.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","time","travel"],
    }),
  },

  "creative-sonnet-shakespearean-iambic-pentameter": {
    id: "creative-sonnet-shakespearean-iambic-pentameter",
    name: "SonnetShakespeareaniambicpentameterSkill",
    displayName: "Sonnet Shakespearean iambic pentameter",
    categoryId: "creative",
    description: "Composes 14-line Shakespearean sonnets in iambic pentameter with ABAB CDCD EFEF GG rhyme.",
    tags: ["creative","creative","sonnet","shakespearean"],
    transform: createStandardSkillTransform({
      sectionName: "Sonnet Shakespearean iambic pentameter Standards",
      ruSectionName: "Стандарты и регламенты: Sonnet Shakespearean iambic pentameter",
      instructions: [
        "Apply core domain tenets for Sonnet Shakespearean iambic pentameter.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sonnet Shakespearean iambic pentameter.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","sonnet","shakespearean"],
    }),
  },

  "creative-hero-journey-campbell-mythic-blueprint": {
    id: "creative-hero-journey-campbell-mythic-blueprint",
    name: "HeroJourneyCampbellMythicBlueprintSkill",
    displayName: "Hero Journey Campbell Mythic Blueprint",
    categoryId: "creative",
    description: "Guides narrative arcs through Joseph Campbell's 12-stage monomyth journey.",
    tags: ["creative","creative","hero","journey"],
    transform: createStandardSkillTransform({
      sectionName: "Hero Journey Campbell Mythic Blueprint Standards",
      ruSectionName: "Стандарты и регламенты: Hero Journey Campbell Mythic Blueprint",
      instructions: [
        "Apply core domain tenets for Hero Journey Campbell Mythic Blueprint.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hero Journey Campbell Mythic Blueprint.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","hero","journey"],
    }),
  },

  "creative-noir-femme-fatale-moral-ambiguity": {
    id: "creative-noir-femme-fatale-moral-ambiguity",
    name: "NoirFemmeFataleMoralAmbiguitySkill",
    displayName: "Noir Femme Fatale & Moral Ambiguity",
    categoryId: "creative",
    description: "Crafts compelling femme fatale characters and noir moral compromises.",
    tags: ["creative","creative","noir","femme"],
    transform: createStandardSkillTransform({
      sectionName: "Noir Femme Fatale & Moral Ambiguity Standards",
      ruSectionName: "Стандарты и регламенты: Noir Femme Fatale & Moral Ambiguity",
      instructions: [
        "Apply core domain tenets for Noir Femme Fatale & Moral Ambiguity.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Noir Femme Fatale & Moral Ambiguity.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","noir","femme"],
    }),
  },

  "creative-biopunk-genetic-engineering-dystopia": {
    id: "creative-biopunk-genetic-engineering-dystopia",
    name: "BiopunkGeneticEngineeringDystopiaSkill",
    displayName: "Biopunk Genetic Engineering Dystopia",
    categoryId: "creative",
    description: "Explores biopunk themes: DNA splicing, bio-hacking, and organic technology.",
    tags: ["creative","creative","biopunk","genetic"],
    transform: createStandardSkillTransform({
      sectionName: "Biopunk Genetic Engineering Dystopia Standards",
      ruSectionName: "Стандарты и регламенты: Biopunk Genetic Engineering Dystopia",
      instructions: [
        "Apply core domain tenets for Biopunk Genetic Engineering Dystopia.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Biopunk Genetic Engineering Dystopia.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","biopunk","genetic"],
    }),
  },

  "creative-epistolary-novel-letter-journal-format": {
    id: "creative-epistolary-novel-letter-journal-format",
    name: "EpistolaryNovelLetterJournalFormatSkill",
    displayName: "Epistolary Novel Letter & Journal Format",
    categoryId: "creative",
    description: "Tells stories through fictional letters, diary entries, emails, and police transcripts.",
    tags: ["creative","creative","epistolary","novel"],
    transform: createStandardSkillTransform({
      sectionName: "Epistolary Novel Letter & Journal Format Standards",
      ruSectionName: "Стандарты и регламенты: Epistolary Novel Letter & Journal Format",
      instructions: [
        "Apply core domain tenets for Epistolary Novel Letter & Journal Format.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Epistolary Novel Letter & Journal Format.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","epistolary","novel"],
    }),
  },

  "creative-slipstream-weird-fiction-reality-bending": {
    id: "creative-slipstream-weird-fiction-reality-bending",
    name: "SlipstreamWeirdFictionRealityBendingSkill",
    displayName: "Slipstream Weird Fiction Reality Bending",
    categoryId: "creative",
    description: "Blends literary fiction, sci-fi, and surrealism into slipstream 'weird' stories.",
    tags: ["creative","creative","slipstream","weird"],
    transform: createStandardSkillTransform({
      sectionName: "Slipstream Weird Fiction Reality Bending Standards",
      ruSectionName: "Стандарты и регламенты: Slipstream Weird Fiction Reality Bending",
      instructions: [
        "Apply core domain tenets for Slipstream Weird Fiction Reality Bending.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Slipstream Weird Fiction Reality Bending.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","slipstream","weird"],
    }),
  },

  "creative-grimdark-dark-fantasy-moral-decay": {
    id: "creative-grimdark-dark-fantasy-moral-decay",
    name: "GrimdarkDarkFantasyMoralDecaySkill",
    displayName: "Grimdark Dark Fantasy Moral Decay",
    categoryId: "creative",
    description: "Writes gritty, cynical grimdark fantasy with antiheroes and moral compromise.",
    tags: ["creative","creative","grimdark","dark"],
    transform: createStandardSkillTransform({
      sectionName: "Grimdark Dark Fantasy Moral Decay Standards",
      ruSectionName: "Стандарты и регламенты: Grimdark Dark Fantasy Moral Decay",
      instructions: [
        "Apply core domain tenets for Grimdark Dark Fantasy Moral Decay.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Grimdark Dark Fantasy Moral Decay.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","grimdark","dark"],
    }),
  },

  "creative-wuxia-martial-arts-xianxia-cultivation": {
    id: "creative-wuxia-martial-arts-xianxia-cultivation",
    name: "WuxiaMartialArtsXianxiaCultivationSkill",
    displayName: "Wuxia Martial Arts Xianxia Cultivation",
    categoryId: "creative",
    description: "Crafts Chinese wuxia/xianxia martial arts fantasy with qi cultivation and honor.",
    tags: ["creative","creative","wuxia","martial"],
    transform: createStandardSkillTransform({
      sectionName: "Wuxia Martial Arts Xianxia Cultivation Standards",
      ruSectionName: "Стандарты и регламенты: Wuxia Martial Arts Xianxia Cultivation",
      instructions: [
        "Apply core domain tenets for Wuxia Martial Arts Xianxia Cultivation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Wuxia Martial Arts Xianxia Cultivation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","wuxia","martial"],
    }),
  },

  "creative-regency-romance-austen-manner-social-comedy": {
    id: "creative-regency-romance-austen-manner-social-comedy",
    name: "RegencyRomanceAustenMannerSocialComedySkill",
    displayName: "Regency Romance Austen Manner Social Comedy",
    categoryId: "creative",
    description: "Writes witty Regency romance focusing on ballroom etiquette and social satire.",
    tags: ["creative","creative","regency","romance"],
    transform: createStandardSkillTransform({
      sectionName: "Regency Romance Austen Manner Social Comedy Standards",
      ruSectionName: "Стандарты и регламенты: Regency Romance Austen Manner Social Comedy",
      instructions: [
        "Apply core domain tenets for Regency Romance Austen Manner Social Comedy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Regency Romance Austen Manner Social Comedy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","regency","romance"],
    }),
  },

  "creative-space-colonization-terraforming-hard-sci-fi": {
    id: "creative-space-colonization-terraforming-hard-sci-fi",
    name: "SpaceColonizationTerraformingHardSciFiSkill",
    displayName: "Space Colonization Terraforming Hard Sci-Fi",
    categoryId: "creative",
    description: "Explores hard sci-fi terraforming mechanics and Martian colony survival.",
    tags: ["creative","creative","space","colonization"],
    transform: createStandardSkillTransform({
      sectionName: "Space Colonization Terraforming Hard Sci-Fi Standards",
      ruSectionName: "Стандарты и регламенты: Space Colonization Terraforming Hard Sci-Fi",
      instructions: [
        "Apply core domain tenets for Space Colonization Terraforming Hard Sci-Fi.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Space Colonization Terraforming Hard Sci-Fi.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","space","colonization"],
    }),
  },

  "creative-dieselpunk-interwar-retro-futurism": {
    id: "creative-dieselpunk-interwar-retro-futurism",
    name: "DieselpunkInterwarRetroFuturismSkill",
    displayName: "Dieselpunk Interwar Retro-Futurism",
    categoryId: "creative",
    description: "Designs 1920s-1940s dieselpunk aesthetics: art deco, giant war machines, and aviation.",
    tags: ["creative","creative","dieselpunk","interwar"],
    transform: createStandardSkillTransform({
      sectionName: "Dieselpunk Interwar Retro-Futurism Standards",
      ruSectionName: "Стандарты и регламенты: Dieselpunk Interwar Retro-Futurism",
      instructions: [
        "Apply core domain tenets for Dieselpunk Interwar Retro-Futurism.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Dieselpunk Interwar Retro-Futurism.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","dieselpunk","interwar"],
    }),
  },

  "creative-weird-west-supernatural-frontier-western": {
    id: "creative-weird-west-supernatural-frontier-western",
    name: "WeirdWestSupernaturalFrontierWesternSkill",
    displayName: "Weird West Supernatural Frontier Western",
    categoryId: "creative",
    description: "Blends 19th-century American western frontier themes with occult magic and monsters.",
    tags: ["creative","creative","weird","west"],
    transform: createStandardSkillTransform({
      sectionName: "Weird West Supernatural Frontier Western Standards",
      ruSectionName: "Стандарты и регламенты: Weird West Supernatural Frontier Western",
      instructions: [
        "Apply core domain tenets for Weird West Supernatural Frontier Western.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Weird West Supernatural Frontier Western.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","weird","west"],
    }),
  },

  "creative-litrpg-video-game-mechanics-narrative": {
    id: "creative-litrpg-video-game-mechanics-narrative",
    name: "LitRPGVideoGameMechanicsNarrativeSkill",
    displayName: "LitRPG Video Game Mechanics Narrative",
    categoryId: "creative",
    description: "Writes LitRPG fiction featuring stat screens, leveling up, loot drops, and quest lines.",
    tags: ["creative","creative","litrpg","video"],
    transform: createStandardSkillTransform({
      sectionName: "LitRPG Video Game Mechanics Narrative Standards",
      ruSectionName: "Стандарты и регламенты: LitRPG Video Game Mechanics Narrative",
      instructions: [
        "Apply core domain tenets for LitRPG Video Game Mechanics Narrative.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для LitRPG Video Game Mechanics Narrative.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","litrpg","video"],
    }),
  },

  "creative-micro-poetry-couplet-epigram-precision": {
    id: "creative-micro-poetry-couplet-epigram-precision",
    name: "MicroPoetryCoupletEpigramPrecisionSkill",
    displayName: "Micro-Poetry Couplet & Epigram Precision",
    categoryId: "creative",
    description: "Crafts 2-line micro-poems and sharp epigrams delivering profound philosophical punch.",
    tags: ["creative","creative","micro","poetry"],
    transform: createStandardSkillTransform({
      sectionName: "Micro-Poetry Couplet & Epigram Precision Standards",
      ruSectionName: "Стандарты и регламенты: Micro-Poetry Couplet & Epigram Precision",
      instructions: [
        "Apply core domain tenets for Micro-Poetry Couplet & Epigram Precision.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Micro-Poetry Couplet & Epigram Precision.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","micro","poetry"],
    }),
  },

  "creative-interactive-narrative-choose-your-own-path": {
    id: "creative-interactive-narrative-choose-your-own-path",
    name: "InteractiveNarrativeChooseYourOwnPathSkill",
    displayName: "Interactive Narrative Choose-Your-Own-Path",
    categoryId: "creative",
    description: "Structures branching choose-your-own-adventure storylines with multiple endings.",
    tags: ["creative","creative","interactive","narrative"],
    transform: createStandardSkillTransform({
      sectionName: "Interactive Narrative Choose-Your-Own-Path Standards",
      ruSectionName: "Стандарты и регламенты: Interactive Narrative Choose-Your-Own-Path",
      instructions: [
        "Apply core domain tenets for Interactive Narrative Choose-Your-Own-Path.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Interactive Narrative Choose-Your-Own-Path.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","interactive","narrative"],
    }),
  },

  "creative-eldritch-cosmic-horror-artifact-inspection": {
    id: "creative-eldritch-cosmic-horror-artifact-inspection",
    name: "EldritchCosmicHorrorArtifactInspectionSkill",
    displayName: "Eldritch Cosmic Horror Artifact Inspection",
    categoryId: "creative",
    description: "Describes cursed artifacts whose inspection drives scholars to madness.",
    tags: ["creative","creative","eldritch","cosmic"],
    transform: createStandardSkillTransform({
      sectionName: "Eldritch Cosmic Horror Artifact Inspection Standards",
      ruSectionName: "Стандарты и регламенты: Eldritch Cosmic Horror Artifact Inspection",
      instructions: [
        "Apply core domain tenets for Eldritch Cosmic Horror Artifact Inspection.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Eldritch Cosmic Horror Artifact Inspection.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","eldritch","cosmic"],
    }),
  },

  "creative-solarpunk-community-garden-city-architecture": {
    id: "creative-solarpunk-community-garden-city-architecture",
    name: "SolarpunkCommunityGardenCityArchitectureSkill",
    displayName: "Solarpunk Community Garden City Architecture",
    categoryId: "creative",
    description: "Envisions sustainable urban architecture integrating vertical farming and solar.",
    tags: ["creative","creative","solarpunk","community"],
    transform: createStandardSkillTransform({
      sectionName: "Solarpunk Community Garden City Architecture Standards",
      ruSectionName: "Стандарты и регламенты: Solarpunk Community Garden City Architecture",
      instructions: [
        "Apply core domain tenets for Solarpunk Community Garden City Architecture.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Solarpunk Community Garden City Architecture.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","solarpunk","community"],
    }),
  },

  "creative-dark-academia-ancient-library-mystery": {
    id: "creative-dark-academia-ancient-library-mystery",
    name: "DarkAcademiaAncientLibraryMysterySkill",
    displayName: "Dark Academia Ancient Library Mystery",
    categoryId: "creative",
    description: "Writes dark academia fiction set in gothic universities centered on secret societies.",
    tags: ["creative","creative","dark","academia"],
    transform: createStandardSkillTransform({
      sectionName: "Dark Academia Ancient Library Mystery Standards",
      ruSectionName: "Стандарты и регламенты: Dark Academia Ancient Library Mystery",
      instructions: [
        "Apply core domain tenets for Dark Academia Ancient Library Mystery.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Dark Academia Ancient Library Mystery.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","dark","academia"],
    }),
  },

  "creative-hopepunk-compassionate-resistance-narrative": {
    id: "creative-hopepunk-compassionate-resistance-narrative",
    name: "HopepunkCompassionateResistanceNarrativeSkill",
    displayName: "Hopepunk Compassionate Resistance Narrative",
    categoryId: "creative",
    description: "Crafts hopepunk fiction emphasizing radical kindness, community, and standing up to tyranny.",
    tags: ["creative","creative","hopepunk","compassionate"],
    transform: createStandardSkillTransform({
      sectionName: "Hopepunk Compassionate Resistance Narrative Standards",
      ruSectionName: "Стандарты и регламенты: Hopepunk Compassionate Resistance Narrative",
      instructions: [
        "Apply core domain tenets for Hopepunk Compassionate Resistance Narrative.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hopepunk Compassionate Resistance Narrative.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","hopepunk","compassionate"],
    }),
  },

  "creative-cybernetic-cyberpunk-body-augmentation": {
    id: "creative-cybernetic-cyberpunk-body-augmentation",
    name: "CyberneticCyberpunkBodyAugmentationSkill",
    displayName: "Cybernetic Cyberpunk Body Augmentation",
    categoryId: "creative",
    description: "Explores human identity trade-offs as characters replace organs with cyberware.",
    tags: ["creative","creative","cybernetic","cyberpunk"],
    transform: createStandardSkillTransform({
      sectionName: "Cybernetic Cyberpunk Body Augmentation Standards",
      ruSectionName: "Стандарты и регламенты: Cybernetic Cyberpunk Body Augmentation",
      instructions: [
        "Apply core domain tenets for Cybernetic Cyberpunk Body Augmentation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cybernetic Cyberpunk Body Augmentation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","cybernetic","cyberpunk"],
    }),
  },

  "creative-mythic-retelling-classic-tale-feminist-lens": {
    id: "creative-mythic-retelling-classic-tale-feminist-lens",
    name: "MythicRetellingClassicTaleFeministLensSkill",
    displayName: "Mythic Retelling Classic Tale Feminist Lens",
    categoryId: "creative",
    description: "Retells ancient Greek or Norse myths from the perspective of sidelined female figures.",
    tags: ["creative","creative","mythic","retelling"],
    transform: createStandardSkillTransform({
      sectionName: "Mythic Retelling Classic Tale Feminist Lens Standards",
      ruSectionName: "Стандарты и регламенты: Mythic Retelling Classic Tale Feminist Lens",
      instructions: [
        "Apply core domain tenets for Mythic Retelling Classic Tale Feminist Lens.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Mythic Retelling Classic Tale Feminist Lens.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","mythic","retelling"],
    }),
  },

  "creative-hard-sci-fi-orbital-mechanics-space-navigation": {
    id: "creative-hard-sci-fi-orbital-mechanics-space-navigation",
    name: "HardSciFiOrbitalMechanicsSpaceNavigationSkill",
    displayName: "Hard Sci-Fi Orbital Mechanics Space Navigation",
    categoryId: "creative",
    description: "Calculates realistic delta-v burns, Hohmann transfer orbits, and artificial gravity.",
    tags: ["creative","creative","hard","sci"],
    transform: createStandardSkillTransform({
      sectionName: "Hard Sci-Fi Orbital Mechanics Space Navigation Standards",
      ruSectionName: "Стандарты и регламенты: Hard Sci-Fi Orbital Mechanics Space Navigation",
      instructions: [
        "Apply core domain tenets for Hard Sci-Fi Orbital Mechanics Space Navigation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hard Sci-Fi Orbital Mechanics Space Navigation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","hard","sci"],
    }),
  },

  "creative-spaghetti-western-silent-gunslinger-standoff": {
    id: "creative-spaghetti-western-silent-gunslinger-standoff",
    name: "SpaghettiWesternSilentGunslingerStandoffSkill",
    displayName: "Spaghetti Western Silent Gunslinger Standoff",
    categoryId: "creative",
    description: "Writes tense western showdowns featuring Sergio Leone cinematic pacing and silence.",
    tags: ["creative","creative","spaghetti","western"],
    transform: createStandardSkillTransform({
      sectionName: "Spaghetti Western Silent Gunslinger Standoff Standards",
      ruSectionName: "Стандарты и регламенты: Spaghetti Western Silent Gunslinger Standoff",
      instructions: [
        "Apply core domain tenets for Spaghetti Western Silent Gunslinger Standoff.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Spaghetti Western Silent Gunslinger Standoff.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","spaghetti","western"],
    }),
  },

  "creative-gaslamp-fantasy-victorian-faerie-courts": {
    id: "creative-gaslamp-fantasy-victorian-faerie-courts",
    name: "GaslampFantasyVictorianFaerieCourtsSkill",
    displayName: "Gaslamp Fantasy Victorian Faerie Courts",
    categoryId: "creative",
    description: "Blends Victorian London gaslight aesthetics with secret faerie realm politics.",
    tags: ["creative","creative","gaslamp","fantasy"],
    transform: createStandardSkillTransform({
      sectionName: "Gaslamp Fantasy Victorian Faerie Courts Standards",
      ruSectionName: "Стандарты и регламенты: Gaslamp Fantasy Victorian Faerie Courts",
      instructions: [
        "Apply core domain tenets for Gaslamp Fantasy Victorian Faerie Courts.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Gaslamp Fantasy Victorian Faerie Courts.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","gaslamp","fantasy"],
    }),
  },

  "creative-prose-poetry-paragraph-lyricism-cadence": {
    id: "creative-prose-poetry-paragraph-lyricism-cadence",
    name: "ProsePoetryParagraphLyricismCadenceSkill",
    displayName: "Prose Poetry Paragraph Lyricism & Cadence",
    categoryId: "creative",
    description: "Writes dense, poetic prose paragraphs prioritizing rhythm and sensory resonance.",
    tags: ["creative","creative","prose","poetry"],
    transform: createStandardSkillTransform({
      sectionName: "Prose Poetry Paragraph Lyricism & Cadence Standards",
      ruSectionName: "Стандарты и регламенты: Prose Poetry Paragraph Lyricism & Cadence",
      instructions: [
        "Apply core domain tenets for Prose Poetry Paragraph Lyricism & Cadence.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Prose Poetry Paragraph Lyricism & Cadence.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","prose","poetry"],
    }),
  },

  "creative-kaiju-giant-monster-city-destruction-arc": {
    id: "creative-kaiju-giant-monster-city-destruction-arc",
    name: "KaijuGiantMonsterCityDestructionArcSkill",
    displayName: "Kaiju Giant Monster City Destruction Arc",
    categoryId: "creative",
    description: "Drafts epic titan monster narratives featuring urban destruction and military response.",
    tags: ["creative","creative","kaiju","giant"],
    transform: createStandardSkillTransform({
      sectionName: "Kaiju Giant Monster City Destruction Arc Standards",
      ruSectionName: "Стандарты и регламенты: Kaiju Giant Monster City Destruction Arc",
      instructions: [
        "Apply core domain tenets for Kaiju Giant Monster City Destruction Arc.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Kaiju Giant Monster City Destruction Arc.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","kaiju","giant"],
    }),
  },

  "creative-time-loop-groundhog-day-narrative-arc": {
    id: "creative-time-loop-groundhog-day-narrative-arc",
    name: "TimeLoopGroundhogDayNarrativeArcSkill",
    displayName: "Time Loop Groundhog Day Narrative Arc",
    categoryId: "creative",
    description: "Structures time loop stories where protagonists relive the same day to learn lessons.",
    tags: ["creative","creative","time","loop"],
    transform: createStandardSkillTransform({
      sectionName: "Time Loop Groundhog Day Narrative Arc Standards",
      ruSectionName: "Стандарты и регламенты: Time Loop Groundhog Day Narrative Arc",
      instructions: [
        "Apply core domain tenets for Time Loop Groundhog Day Narrative Arc.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Time Loop Groundhog Day Narrative Arc.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","time","loop"],
    }),
  },

  "creative-cyber-espionage-hacktivist-thriller-arc": {
    id: "creative-cyber-espionage-hacktivist-thriller-arc",
    name: "CyberEspionageHacktivistThrillerArcSkill",
    displayName: "Cyber-Espionage Hacktivist Thriller Arc",
    categoryId: "creative",
    description: "Writes high-stakes cyber-espionage thrillers featuring encryption and whistleblowers.",
    tags: ["creative","creative","cyber","espionage"],
    transform: createStandardSkillTransform({
      sectionName: "Cyber-Espionage Hacktivist Thriller Arc Standards",
      ruSectionName: "Стандарты и регламенты: Cyber-Espionage Hacktivist Thriller Arc",
      instructions: [
        "Apply core domain tenets for Cyber-Espionage Hacktivist Thriller Arc.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cyber-Espionage Hacktivist Thriller Arc.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","cyber","espionage"],
    }),
  },

  "creative-mythic-beast-beastiary-lore-directory": {
    id: "creative-mythic-beast-beastiary-lore-directory",
    name: "MythicBeastBeastiaryLoreDirectorySkill",
    displayName: "Mythic Beast Beastiary Lore Directory",
    categoryId: "creative",
    description: "Creates detailed bestiary entries for mythical creatures: habits, weaknesses, lore.",
    tags: ["creative","creative","mythic","beast"],
    transform: createStandardSkillTransform({
      sectionName: "Mythic Beast Beastiary Lore Directory Standards",
      ruSectionName: "Стандарты и регламенты: Mythic Beast Beastiary Lore Directory",
      instructions: [
        "Apply core domain tenets for Mythic Beast Beastiary Lore Directory.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Mythic Beast Beastiary Lore Directory.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","mythic","beast"],
    }),
  },

  "creative-absurdist-theater-ionesco-existential-comedy": {
    id: "creative-absurdist-theater-ionesco-existential-comedy",
    name: "AbsurdistTheaterIonescoExistentialComedySkill",
    displayName: "Absurdist Theater Ionesco Existential Comedy",
    categoryId: "creative",
    description: "Writes absurdist theatrical dialogue exploring the breakdown of human communication.",
    tags: ["creative","creative","absurdist","theater"],
    transform: createStandardSkillTransform({
      sectionName: "Absurdist Theater Ionesco Existential Comedy Standards",
      ruSectionName: "Стандарты и регламенты: Absurdist Theater Ionesco Existential Comedy",
      instructions: [
        "Apply core domain tenets for Absurdist Theater Ionesco Existential Comedy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Absurdist Theater Ionesco Existential Comedy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","absurdist","theater"],
    }),
  },

  "creative-high-seas-pirate-swashbuckler-adventure": {
    id: "creative-high-seas-pirate-swashbuckler-adventure",
    name: "HighSeasPirateSwashbucklerAdventureSkill",
    displayName: "High-Seas Pirate Swashbuckler Adventure",
    categoryId: "creative",
    description: "Drafts high-seas nautical adventures: naval broadsides, treasure maps, and mutinies.",
    tags: ["creative","creative","high","seas"],
    transform: createStandardSkillTransform({
      sectionName: "High-Seas Pirate Swashbuckler Adventure Standards",
      ruSectionName: "Стандарты и регламенты: High-Seas Pirate Swashbuckler Adventure",
      instructions: [
        "Apply core domain tenets for High-Seas Pirate Swashbuckler Adventure.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для High-Seas Pirate Swashbuckler Adventure.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","high","seas"],
    }),
  },

  "creative-afrofuturism-african-mythology-tech-utopia": {
    id: "creative-afrofuturism-african-mythology-tech-utopia",
    name: "AfrofuturismAfricanMythologyTechUtopiaSkill",
    displayName: "Afrofuturism African Mythology Tech Utopia",
    categoryId: "creative",
    description: "Combines African cultural traditions, mythology, and futuristic technology.",
    tags: ["creative","creative","afrofuturism","african"],
    transform: createStandardSkillTransform({
      sectionName: "Afrofuturism African Mythology Tech Utopia Standards",
      ruSectionName: "Стандарты и регламенты: Afrofuturism African Mythology Tech Utopia",
      instructions: [
        "Apply core domain tenets for Afrofuturism African Mythology Tech Utopia.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Afrofuturism African Mythology Tech Utopia.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","afrofuturism","african"],
    }),
  },

  "creative-metaphorical-fabulism-animal-allegory": {
    id: "creative-metaphorical-fabulism-animal-allegory",
    name: "MetaphoricalFabulismAnimalAllegorySkill",
    displayName: "Metaphorical Fabulism Animal Allegory",
    categoryId: "creative",
    description: "Writes modern Aesop-style fables using animal characters to critique human society.",
    tags: ["creative","creative","metaphorical","fabulism"],
    transform: createStandardSkillTransform({
      sectionName: "Metaphorical Fabulism Animal Allegory Standards",
      ruSectionName: "Стандарты и регламенты: Metaphorical Fabulism Animal Allegory",
      instructions: [
        "Apply core domain tenets for Metaphorical Fabulism Animal Allegory.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Metaphorical Fabulism Animal Allegory.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","metaphorical","fabulism"],
    }),
  },

  "creative-gothic-horror-haunted-asylum-medical-lore": {
    id: "creative-gothic-horror-haunted-asylum-medical-lore",
    name: "GothicHorrorHauntedAsylumMedicalLoreSkill",
    displayName: "Gothic Horror Haunted Asylum Medical Lore",
    categoryId: "creative",
    description: "Explores 19th-century abandoned asylum medical horrors and psychological dread.",
    tags: ["creative","creative","gothic","horror"],
    transform: createStandardSkillTransform({
      sectionName: "Gothic Horror Haunted Asylum Medical Lore Standards",
      ruSectionName: "Стандарты и регламенты: Gothic Horror Haunted Asylum Medical Lore",
      instructions: [
        "Apply core domain tenets for Gothic Horror Haunted Asylum Medical Lore.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Gothic Horror Haunted Asylum Medical Lore.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","gothic","horror"],
    }),
  },

  "creative-parallel-dimension-portal-fantasy-worlding": {
    id: "creative-parallel-dimension-portal-fantasy-worlding",
    name: "ParallelDimensionPortalFantasyWorldingSkill",
    displayName: "Parallel Dimension Portal Fantasy Worlding",
    categoryId: "creative",
    description: "Designs portal fantasy transitions between mundane real-world locations and magical realms.",
    tags: ["creative","creative","parallel","dimension"],
    transform: createStandardSkillTransform({
      sectionName: "Parallel Dimension Portal Fantasy Worlding Standards",
      ruSectionName: "Стандарты и регламенты: Parallel Dimension Portal Fantasy Worlding",
      instructions: [
        "Apply core domain tenets for Parallel Dimension Portal Fantasy Worlding.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Parallel Dimension Portal Fantasy Worlding.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","parallel","dimension"],
    }),
  },

  "creative-retro-80s-synthwave-neon-nostalgia-narrative": {
    id: "creative-retro-80s-synthwave-neon-nostalgia-narrative",
    name: "Retro80sSynthwaveNeonNostalgiaNarrativeSkill",
    displayName: "Retro 80s Synthwave Neon Nostalgia Narrative",
    categoryId: "creative",
    description: "Evokes 1980s VHS nostalgia: arcade games, synthwave music, and summer adventures.",
    tags: ["creative","creative","retro","80s"],
    transform: createStandardSkillTransform({
      sectionName: "Retro 80s Synthwave Neon Nostalgia Narrative Standards",
      ruSectionName: "Стандарты и регламенты: Retro 80s Synthwave Neon Nostalgia Narrative",
      instructions: [
        "Apply core domain tenets for Retro 80s Synthwave Neon Nostalgia Narrative.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Retro 80s Synthwave Neon Nostalgia Narrative.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","retro","80s"],
    }),
  },

  "creative-steampunk-airship-naval-battle-tactics": {
    id: "creative-steampunk-airship-naval-battle-tactics",
    name: "SteampunkAirshipNavalBattleTacticsSkill",
    displayName: "Steampunk Airship Naval Battle Tactics",
    categoryId: "creative",
    description: "Describes sky battles between armored steam-powered dirigibles and gunships.",
    tags: ["creative","creative","steampunk","airship"],
    transform: createStandardSkillTransform({
      sectionName: "Steampunk Airship Naval Battle Tactics Standards",
      ruSectionName: "Стандарты и регламенты: Steampunk Airship Naval Battle Tactics",
      instructions: [
        "Apply core domain tenets for Steampunk Airship Naval Battle Tactics.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Steampunk Airship Naval Battle Tactics.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","steampunk","airship"],
    }),
  },

  "creative-interactive-rpg-quest-dialogue-tree-design": {
    id: "creative-interactive-rpg-quest-dialogue-tree-design",
    name: "InteractiveRPGQuestDialogueTreeDesignSkill",
    displayName: "Interactive RPG Quest Dialogue Tree Design",
    categoryId: "creative",
    description: "Drafts branching NPC quest dialogue trees with reputation checks.",
    tags: ["creative","creative","interactive","rpg"],
    transform: createStandardSkillTransform({
      sectionName: "Interactive RPG Quest Dialogue Tree Design Standards",
      ruSectionName: "Стандарты и регламенты: Interactive RPG Quest Dialogue Tree Design",
      instructions: [
        "Apply core domain tenets for Interactive RPG Quest Dialogue Tree Design.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Interactive RPG Quest Dialogue Tree Design.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","interactive","rpg"],
    }),
  },

  "creative-cozy-fantasy-teahouse-community-craft": {
    id: "creative-cozy-fantasy-teahouse-community-craft",
    name: "CozyFantasyTeahouseCommunityCraftSkill",
    displayName: "Cozy Fantasy Teahouse Community Craft",
    categoryId: "creative",
    description: "Writes low-stakes, warm cozy fantasy stories centered on running teahouses or bakeries.",
    tags: ["creative","creative","cozy","fantasy"],
    transform: createStandardSkillTransform({
      sectionName: "Cozy Fantasy Teahouse Community Craft Standards",
      ruSectionName: "Стандарты и регламенты: Cozy Fantasy Teahouse Community Craft",
      instructions: [
        "Apply core domain tenets for Cozy Fantasy Teahouse Community Craft.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cozy Fantasy Teahouse Community Craft.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","cozy","fantasy"],
    }),
  },

  "creative-hardboiled-detective-crime-scene-forensics": {
    id: "creative-hardboiled-detective-crime-scene-forensics",
    name: "HardboiledDetectiveCrimeSceneForensicsSkill",
    displayName: "Hardboiled Detective Crime Scene Forensics",
    categoryId: "creative",
    description: "Describes 1940s noir crime scenes with gritty forensic observation.",
    tags: ["creative","creative","hardboiled","detective"],
    transform: createStandardSkillTransform({
      sectionName: "Hardboiled Detective Crime Scene Forensics Standards",
      ruSectionName: "Стандарты и регламенты: Hardboiled Detective Crime Scene Forensics",
      instructions: [
        "Apply core domain tenets for Hardboiled Detective Crime Scene Forensics.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hardboiled Detective Crime Scene Forensics.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","hardboiled","detective"],
    }),
  },

  "creative-surrealist-object-transformation-poem": {
    id: "creative-surrealist-object-transformation-poem",
    name: "SurrealistObjectTransformationPoemSkill",
    displayName: "Surrealist Object Transformation Poem",
    categoryId: "creative",
    description: "Writes poetry where everyday household objects mutate into natural landscapes.",
    tags: ["creative","creative","surrealist","object"],
    transform: createStandardSkillTransform({
      sectionName: "Surrealist Object Transformation Poem Standards",
      ruSectionName: "Стандарты и регламенты: Surrealist Object Transformation Poem",
      instructions: [
        "Apply core domain tenets for Surrealist Object Transformation Poem.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Surrealist Object Transformation Poem.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","surrealist","object"],
    }),
  },

  "creative-cyberpunk-netrunning-cyberspace-visuals": {
    id: "creative-cyberpunk-netrunning-cyberspace-visuals",
    name: "CyberpunkNetrunningCyberspaceVisualsSkill",
    displayName: "Cyberpunk Netrunning Cyberspace Visuals",
    categoryId: "creative",
    description: "Visualizes virtual reality cyberspace matrix hacks as geometric glowing architectures.",
    tags: ["creative","creative","cyberpunk","netrunning"],
    transform: createStandardSkillTransform({
      sectionName: "Cyberpunk Netrunning Cyberspace Visuals Standards",
      ruSectionName: "Стандарты и регламенты: Cyberpunk Netrunning Cyberspace Visuals",
      instructions: [
        "Apply core domain tenets for Cyberpunk Netrunning Cyberspace Visuals.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cyberpunk Netrunning Cyberspace Visuals.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","cyberpunk","netrunning"],
    }),
  },

  "creative-epic-battle-tactical-army-formation-arc": {
    id: "creative-epic-battle-tactical-army-formation-arc",
    name: "EpicBattleTacticalArmyFormationArcSkill",
    displayName: "Epic Battle Tactical Army Formation Arc",
    categoryId: "creative",
    description: "Describes medieval military battles featuring shield walls, cavalry flanks, and archery.",
    tags: ["creative","creative","epic","battle"],
    transform: createStandardSkillTransform({
      sectionName: "Epic Battle Tactical Army Formation Arc Standards",
      ruSectionName: "Стандарты и регламенты: Epic Battle Tactical Army Formation Arc",
      instructions: [
        "Apply core domain tenets for Epic Battle Tactical Army Formation Arc.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Epic Battle Tactical Army Formation Arc.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","epic","battle"],
    }),
  },

  "creative-philosophical-dialogue-mind-body-dualism": {
    id: "creative-philosophical-dialogue-mind-body-dualism",
    name: "PhilosophicalDialogueMindBodyDualismSkill",
    displayName: "Philosophical Dialogue Mind-Body Dualism",
    categoryId: "creative",
    description: "Writes engaging philosophical dialogues exploring consciousness and AI identity.",
    tags: ["creative","creative","philosophical","dialogue"],
    transform: createStandardSkillTransform({
      sectionName: "Philosophical Dialogue Mind-Body Dualism Standards",
      ruSectionName: "Стандарты и регламенты: Philosophical Dialogue Mind-Body Dualism",
      instructions: [
        "Apply core domain tenets for Philosophical Dialogue Mind-Body Dualism.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Philosophical Dialogue Mind-Body Dualism.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","philosophical","dialogue"],
    }),
  },

  "creative-mythological-underworld-descent-orpheus-arc": {
    id: "creative-mythological-underworld-descent-orpheus-arc",
    name: "MythologicalUnderworldDescentOrpheusArcSkill",
    displayName: "Mythological Underworld Descent Orpheus Arc",
    categoryId: "creative",
    description: "Structures heroic descent narratives into the realm of the dead to retrieve loved ones.",
    tags: ["creative","creative","mythological","underworld"],
    transform: createStandardSkillTransform({
      sectionName: "Mythological Underworld Descent Orpheus Arc Standards",
      ruSectionName: "Стандарты и регламенты: Mythological Underworld Descent Orpheus Arc",
      instructions: [
        "Apply core domain tenets for Mythological Underworld Descent Orpheus Arc.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Mythological Underworld Descent Orpheus Arc.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","mythological","underworld"],
    }),
  },

  "creative-solarpunk-permaculture-community-building": {
    id: "creative-solarpunk-permaculture-community-building",
    name: "SolarpunkPermacultureCommunityBuildingSkill",
    displayName: "Solarpunk Permaculture Community Building",
    categoryId: "creative",
    description: "Describes cooperative eco-villages building zero-waste closed-loop systems.",
    tags: ["creative","creative","solarpunk","permaculture"],
    transform: createStandardSkillTransform({
      sectionName: "Solarpunk Permaculture Community Building Standards",
      ruSectionName: "Стандарты и регламенты: Solarpunk Permaculture Community Building",
      instructions: [
        "Apply core domain tenets for Solarpunk Permaculture Community Building.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Solarpunk Permaculture Community Building.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","solarpunk","permaculture"],
    }),
  },

  "creative-dark-fantasy-necromancy-magic-mechanics": {
    id: "creative-dark-fantasy-necromancy-magic-mechanics",
    name: "DarkFantasyNecromancyMagicMechanicsSkill",
    displayName: "Dark Fantasy Necromancy Magic Mechanics",
    categoryId: "creative",
    description: "Designs dark magic systems based on soul manipulation and undead animation.",
    tags: ["creative","creative","dark","fantasy"],
    transform: createStandardSkillTransform({
      sectionName: "Dark Fantasy Necromancy Magic Mechanics Standards",
      ruSectionName: "Стандарты и регламенты: Dark Fantasy Necromancy Magic Mechanics",
      instructions: [
        "Apply core domain tenets for Dark Fantasy Necromancy Magic Mechanics.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Dark Fantasy Necromancy Magic Mechanics.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","dark","fantasy"],
    }),
  },

  "creative-space-western-frontier-colony-saloon": {
    id: "creative-space-western-frontier-colony-saloon",
    name: "SpaceWesternFrontierColonySaloonSkill",
    displayName: "Space Western Frontier Colony Saloon",
    categoryId: "creative",
    description: "Blends space opera and western themes on lawless outer-rim desert mining planets.",
    tags: ["creative","creative","space","western"],
    transform: createStandardSkillTransform({
      sectionName: "Space Western Frontier Colony Saloon Standards",
      ruSectionName: "Стандарты и регламенты: Space Western Frontier Colony Saloon",
      instructions: [
        "Apply core domain tenets for Space Western Frontier Colony Saloon.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Space Western Frontier Colony Saloon.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","space","western"],
    }),
  },

  "creative-cyberpunk-street-slang-lexicon-idioms": {
    id: "creative-cyberpunk-street-slang-lexicon-idioms",
    name: "CyberpunkStreetSlangLexiconIdiomsSkill",
    displayName: "Cyberpunk Street Slang Lexicon & Idioms",
    categoryId: "creative",
    description: "Develops rich futuristic street slang and corporate jargon for sci-fi dialogue.",
    tags: ["creative","creative","cyberpunk","street"],
    transform: createStandardSkillTransform({
      sectionName: "Cyberpunk Street Slang Lexicon & Idioms Standards",
      ruSectionName: "Стандарты и регламенты: Cyberpunk Street Slang Lexicon & Idioms",
      instructions: [
        "Apply core domain tenets for Cyberpunk Street Slang Lexicon & Idioms.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cyberpunk Street Slang Lexicon & Idioms.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","cyberpunk","street"],
    }),
  },

  "creative-gothic-romance-secret-passage-discovery": {
    id: "creative-gothic-romance-secret-passage-discovery",
    name: "GothicRomanceSecretPassageDiscoverySkill",
    displayName: "Gothic Romance Secret Passage Discovery",
    categoryId: "creative",
    description: "Describes dramatic discoveries of hidden chambers and diary secrets in ancient manors.",
    tags: ["creative","creative","gothic","romance"],
    transform: createStandardSkillTransform({
      sectionName: "Gothic Romance Secret Passage Discovery Standards",
      ruSectionName: "Стандарты и регламенты: Gothic Romance Secret Passage Discovery",
      instructions: [
        "Apply core domain tenets for Gothic Romance Secret Passage Discovery.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Gothic Romance Secret Passage Discovery.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","gothic","romance"],
    }),
  },

  "creative-time-travel-causality-repair-agency-arc": {
    id: "creative-time-travel-causality-repair-agency-arc",
    name: "TimeTravelCausalityRepairAgencyArcSkill",
    displayName: "Time Travel Causality Repair Agency Arc",
    categoryId: "creative",
    description: "Follows time cops repairing historical anomalies caused by rogue time travelers.",
    tags: ["creative","creative","time","travel"],
    transform: createStandardSkillTransform({
      sectionName: "Time Travel Causality Repair Agency Arc Standards",
      ruSectionName: "Стандарты и регламенты: Time Travel Causality Repair Agency Arc",
      instructions: [
        "Apply core domain tenets for Time Travel Causality Repair Agency Arc.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Time Travel Causality Repair Agency Arc.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","time","travel"],
    }),
  },

  "creative-noir-voiceover-monologue-cynical-reflection": {
    id: "creative-noir-voiceover-monologue-cynical-reflection",
    name: "NoirVoiceoverMonologueCynicalReflectionSkill",
    displayName: "Noir Voiceover Monologue Cynical Reflection",
    categoryId: "creative",
    description: "Writes iconic rain-slicked noir detective opening voiceover monologues.",
    tags: ["creative","creative","noir","voiceover"],
    transform: createStandardSkillTransform({
      sectionName: "Noir Voiceover Monologue Cynical Reflection Standards",
      ruSectionName: "Стандарты и регламенты: Noir Voiceover Monologue Cynical Reflection",
      instructions: [
        "Apply core domain tenets for Noir Voiceover Monologue Cynical Reflection.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Noir Voiceover Monologue Cynical Reflection.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","noir","voiceover"],
    }),
  },

  "creative-high-fantasy-sacred-sword-legend-prophecy": {
    id: "creative-high-fantasy-sacred-sword-legend-prophecy",
    name: "HighFantasySacredSwordLegendProphecySkill",
    displayName: "High Fantasy Sacred Sword Legend Prophecy",
    categoryId: "creative",
    description: "Drafts ancient prophecies and legendary weapon forging mythologies.",
    tags: ["creative","creative","high","fantasy"],
    transform: createStandardSkillTransform({
      sectionName: "High Fantasy Sacred Sword Legend Prophecy Standards",
      ruSectionName: "Стандарты и регламенты: High Fantasy Sacred Sword Legend Prophecy",
      instructions: [
        "Apply core domain tenets for High Fantasy Sacred Sword Legend Prophecy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для High Fantasy Sacred Sword Legend Prophecy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","high","fantasy"],
    }),
  },

  "creative-micro-fiction-6-word-story-emotional-punch": {
    id: "creative-micro-fiction-6-word-story-emotional-punch",
    name: "MicroFiction6WordStoryEmotionalPunchSkill",
    displayName: "Micro-Fiction 6-Word Story Emotional Punch",
    categoryId: "creative",
    description: "Drafts ultra-compressed 6-word micro-stories that deliver instant emotional resonance.",
    tags: ["creative","creative","micro","fiction"],
    transform: createStandardSkillTransform({
      sectionName: "Micro-Fiction 6-Word Story Emotional Punch Standards",
      ruSectionName: "Стандарты и регламенты: Micro-Fiction 6-Word Story Emotional Punch",
      instructions: [
        "Apply core domain tenets for Micro-Fiction 6-Word Story Emotional Punch.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Micro-Fiction 6-Word Story Emotional Punch.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","micro","fiction"],
    }),
  },

  "creative-interactive-fiction-game-master-dm-guide": {
    id: "creative-interactive-fiction-game-master-dm-guide",
    name: "InteractiveFictionGameMasterDMGuideSkill",
    displayName: "Interactive Fiction Game Master DM Guide",
    categoryId: "creative",
    description: "Provides game masters with evocative room descriptions and improvisational prompts.",
    tags: ["creative","creative","interactive","fiction"],
    transform: createStandardSkillTransform({
      sectionName: "Interactive Fiction Game Master DM Guide Standards",
      ruSectionName: "Стандарты и регламенты: Interactive Fiction Game Master DM Guide",
      instructions: [
        "Apply core domain tenets for Interactive Fiction Game Master DM Guide.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Interactive Fiction Game Master DM Guide.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","interactive","fiction"],
    }),
  },

  "creative-comprehensive-creative-writing-master-constitution": {
    id: "creative-comprehensive-creative-writing-master-constitution",
    name: "ComprehensiveCreativeWritingMasterConstitutionSkill",
    displayName: "Comprehensive Creative Writing Master Constitution",
    categoryId: "creative",
    description: "Enforces world-class creative writing, narrative architecture, and prose craft.",
    tags: ["creative","creative","comprehensive","creative"],
    transform: createStandardSkillTransform({
      sectionName: "Comprehensive Creative Writing Master Constitution Standards",
      ruSectionName: "Стандарты и регламенты: Comprehensive Creative Writing Master Constitution",
      instructions: [
        "Apply core domain tenets for Comprehensive Creative Writing Master Constitution.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Comprehensive Creative Writing Master Constitution.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative","comprehensive","creative"],
    }),
  },
  "creative-final-multi-sensory-immersive-world-scene-conception": {
    id: "creative-final-multi-sensory-immersive-world-scene-conception",
    name: "MultiSensoryImmersiveWorldSceneConceptionSkill",
    displayName: "Multi-Sensory Immersive World Scene Conception",
    categoryId: "creative",
    description: "Evokes vivid auditory, olfactory, tactile, and visual imagery in fictional settings.",
    tags: ["creative","creative-final","final","multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Sensory Immersive World Scene Conception Standards",
      ruSectionName: "Стандарты и регламенты: Multi-Sensory Immersive World Scene Conception",
      instructions: [
        "Apply core domain tenets for Multi-Sensory Immersive World Scene Conception.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Multi-Sensory Immersive World Scene Conception.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative-final","final","multi"],
    }),
  },

  "creative-final-avant-garde-experimental-narrative-structure-design": {
    id: "creative-final-avant-garde-experimental-narrative-structure-design",
    name: "AvantGardeExperimentalNarrativeStructureDesignSkill",
    displayName: "Avant-Garde Experimental Narrative Structure Design",
    categoryId: "creative",
    description: "Structures non-linear, fragmented, or interactive multi-perspective narratives.",
    tags: ["creative","creative-final","final","avant"],
    transform: createStandardSkillTransform({
      sectionName: "Avant-Garde Experimental Narrative Structure Design Standards",
      ruSectionName: "Стандарты и регламенты: Avant-Garde Experimental Narrative Structure Design",
      instructions: [
        "Apply core domain tenets for Avant-Garde Experimental Narrative Structure Design.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Avant-Garde Experimental Narrative Structure Design.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative-final","final","avant"],
    }),
  },

  "creative-final-master-artistic-expression-creative-direction": {
    id: "creative-final-master-artistic-expression-creative-direction",
    name: "MasterArtisticExpressionCreativeDirectionSkill",
    displayName: "Master Artistic Expression Creative Direction",
    categoryId: "creative",
    description: "Enforces world-class creative concepting, artistic vision, and multimedia storytelling.",
    tags: ["creative","creative-final","final","master"],
    transform: createStandardSkillTransform({
      sectionName: "Master Artistic Expression Creative Direction Standards",
      ruSectionName: "Стандарты и регламенты: Master Artistic Expression Creative Direction",
      instructions: [
        "Apply core domain tenets for Master Artistic Expression Creative Direction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Master Artistic Expression Creative Direction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["creative","creative-final","final","master"],
    }),
  },
  "creative-multi-multi-layer-worldbuilding-cosmology-magic-system": {
    id: "creative-multi-multi-layer-worldbuilding-cosmology-magic-system",
    name: "MultiLayerWorldbuildingCosmologyMagicSystemSkill",
    displayName: "Multi Layer Worldbuilding Cosmology Magic System",
    categoryId: "creative",
    description: "Constructs rich fictional universes with coherent physical laws, magic limitations, and lore.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Worldbuilding Cosmology Magic System",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Worldbuilding Cosmology Magic System",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Worldbuilding Cosmology Magic System.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Worldbuilding Cosmology Magic System.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-voice-polyphonic-novel-narrative-design": {
    id: "creative-multi-multi-voice-polyphonic-novel-narrative-design",
    name: "MultiVoicePolyphonicNovelNarrativeDesignSkill",
    displayName: "Multi Voice Polyphonic Novel Narrative Design",
    categoryId: "creative",
    description: "Weaves multiple distinct character perspective chapters into a cohesive overarching plot arc.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Voice Polyphonic Novel Narrative Design",
      ruSectionName: "Композитный Multi-Skill: Multi Voice Polyphonic Novel Narrative Design",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Voice Polyphonic Novel Narrative Design.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Voice Polyphonic Novel Narrative Design.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-sensory-immersive-environment-scene-evocation": {
    id: "creative-multi-multi-sensory-immersive-environment-scene-evocation",
    name: "MultiSensoryImmersiveEnvironmentSceneEvocationSkill",
    displayName: "Multi Sensory Immersive Environment Scene Evocation",
    categoryId: "creative",
    description: "Evokes vivid auditory, olfactory, visual, tactile, and gustatory descriptions in literary fiction.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Sensory Immersive Environment Scene Evocation",
      ruSectionName: "Композитный Multi-Skill: Multi Sensory Immersive Environment Scene Evocation",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Sensory Immersive Environment Scene Evocation.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Sensory Immersive Environment Scene Evocation.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-genre-fusion-fiction-story-concepting": {
    id: "creative-multi-multi-genre-fusion-fiction-story-concepting",
    name: "MultiGenreFusionFictionStoryConceptingSkill",
    displayName: "Multi Genre Fusion Fiction Story Concepting",
    categoryId: "creative",
    description: "Blends disparate genres (e.g. Cyberpunk Western, Historical Fantasy, Sci-Fi Horror) into original narratives.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Genre Fusion Fiction Story Concepting",
      ruSectionName: "Композитный Multi-Skill: Multi Genre Fusion Fiction Story Concepting",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Genre Fusion Fiction Story Concepting.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Genre Fusion Fiction Story Concepting.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-stage-character-arc-psychological-transformation": {
    id: "creative-multi-multi-stage-character-arc-psychological-transformation",
    name: "MultiStageCharacterArcPsychologicalTransformationSkill",
    displayName: "Multi Stage Character Arc Psychological Transformation",
    categoryId: "creative",
    description: "Tracks protagonist internal flaws, catalytic inciting incidents, midpoints, and thematic redemption.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Character Arc Psychological Transformation",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Character Arc Psychological Transformation",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Character Arc Psychological Transformation.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Character Arc Psychological Transformation.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-format-transmedia-storytelling-universe-blueprint": {
    id: "creative-multi-multi-format-transmedia-storytelling-universe-blueprint",
    name: "MultiFormatTransmediaStorytellingUniverseBlueprintSkill",
    displayName: "Multi Format Transmedia Storytelling Universe Blueprint",
    categoryId: "creative",
    description: "Expands story IP across novels, graphic novels, podcasts, video games, and film adaptations.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Format Transmedia Storytelling Universe Blueprint",
      ruSectionName: "Композитный Multi-Skill: Multi Format Transmedia Storytelling Universe Blueprint",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Format Transmedia Storytelling Universe Blueprint.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Format Transmedia Storytelling Universe Blueprint.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-perspective-non-linear-storytelling-architecture": {
    id: "creative-multi-multi-perspective-non-linear-storytelling-architecture",
    name: "MultiPerspectiveNonLinearStorytellingArchitectureSkill",
    displayName: "Multi Perspective Non Linear Storytelling Architecture",
    categoryId: "creative",
    description: "Structures stories using non-linear chronologies, memory flashbacks, and parallel timeline loops.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Non Linear Storytelling Architecture",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Non Linear Storytelling Architecture",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Perspective Non Linear Storytelling Architecture.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Perspective Non Linear Storytelling Architecture.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-dynamic-interactive-choice-fiction-branching": {
    id: "creative-multi-multi-dynamic-interactive-choice-fiction-branching",
    name: "MultiDynamicInteractiveChoiceFictionBranchingSkill",
    displayName: "Multi Dynamic Interactive Choice Fiction Branching",
    categoryId: "creative",
    description: "Drafts choose-your-own-adventure story paths with meaningful consequences and multiple endings.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Dynamic Interactive Choice Fiction Branching",
      ruSectionName: "Композитный Multi-Skill: Multi Dynamic Interactive Choice Fiction Branching",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Dynamic Interactive Choice Fiction Branching.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Dynamic Interactive Choice Fiction Branching.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-layer-allegorical-symbolism-metaphor-design": {
    id: "creative-multi-multi-layer-allegorical-symbolism-metaphor-design",
    name: "MultiLayerAllegoricalSymbolismMetaphorDesignSkill",
    displayName: "Multi Layer Allegorical Symbolism Metaphor Design",
    categoryId: "creative",
    description: "Embeds subtle philosophical allegories, recurring motifs, and thematic symbolism throughout fiction.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Allegorical Symbolism Metaphor Design",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Allegorical Symbolism Metaphor Design",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Allegorical Symbolism Metaphor Design.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Allegorical Symbolism Metaphor Design.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-style-poetic-form-metrical-composition": {
    id: "creative-multi-multi-style-poetic-form-metrical-composition",
    name: "MultiStylePoeticFormMetricalCompositionSkill",
    displayName: "Multi Style Poetic Form Metrical Composition",
    categoryId: "creative",
    description: "Drafts poetry in Sonnet, Haiku, Villanelle, Free Verse, or Spoken Word styles with metrical precision.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Style Poetic Form Metrical Composition",
      ruSectionName: "Композитный Multi-Skill: Multi Style Poetic Form Metrical Composition",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Style Poetic Form Metrical Composition.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Style Poetic Form Metrical Composition.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-character-dialogue-subtext-tension-crafting": {
    id: "creative-multi-multi-character-dialogue-subtext-tension-crafting",
    name: "MultiCharacterDialogueSubtextTensionCraftingSkill",
    displayName: "Multi Character Dialogue Subtext Tension Crafting",
    categoryId: "creative",
    description: "Writes dramatic dialogue where characters' true motives, conflicts, and emotions lie beneath spoken words.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Character Dialogue Subtext Tension Crafting",
      ruSectionName: "Композитный Multi-Skill: Multi Character Dialogue Subtext Tension Crafting",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Character Dialogue Subtext Tension Crafting.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Character Dialogue Subtext Tension Crafting.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-stage-screenplay-scene-pacing-beat-sheet": {
    id: "creative-multi-multi-stage-screenplay-scene-pacing-beat-sheet",
    name: "MultiStageScreenplayScenePacingBeatSheetSkill",
    displayName: "Multi Stage Screenplay Scene Pacing Beat Sheet",
    categoryId: "creative",
    description: "Structures movie scenes using Blake Snyder Save the Cat beats, sequence pacing, and dramatic tension.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Screenplay Scene Pacing Beat Sheet",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Screenplay Scene Pacing Beat Sheet",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Screenplay Scene Pacing Beat Sheet.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Screenplay Scene Pacing Beat Sheet.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-horizon-science-fiction-speculative-world-building": {
    id: "creative-multi-multi-horizon-science-fiction-speculative-world-building",
    name: "MultiHorizonScienceFictionSpeculativeWorldBuildingSkill",
    displayName: "Multi Horizon Science Fiction Speculative World Building",
    categoryId: "creative",
    description: "Extrapolates future technologies, societal shifts, bio-engineering, and space colonization concepts.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Science Fiction Speculative World Building",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Science Fiction Speculative World Building",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Horizon Science Fiction Speculative World Building.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Horizon Science Fiction Speculative World Building.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-faction-geopolitical-fantasy-kingdom-conflicts": {
    id: "creative-multi-multi-faction-geopolitical-fantasy-kingdom-conflicts",
    name: "MultiFactionGeopoliticalFantasyKingdomConflictsSkill",
    displayName: "Multi Faction Geopolitical Fantasy Kingdom Conflicts",
    categoryId: "creative",
    description: "Designs competing noble houses, guilds, religious orders, and secret societies vying for power.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Faction Geopolitical Fantasy Kingdom Conflicts",
      ruSectionName: "Композитный Multi-Skill: Multi Faction Geopolitical Fantasy Kingdom Conflicts",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Faction Geopolitical Fantasy Kingdom Conflicts.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Faction Geopolitical Fantasy Kingdom Conflicts.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-layer-mystery-crime-clue-red-herring-weaving": {
    id: "creative-multi-multi-layer-mystery-crime-clue-red-herring-weaving",
    name: "MultiLayerMysteryCrimeClueRedHerringWeavingSkill",
    displayName: "Multi Layer Mystery Crime Clue Red Herring Weaving",
    categoryId: "creative",
    description: "Engineers whodunit mystery plots with fair-play clues, subtle red herrings, and shocking reveals.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Mystery Crime Clue Red Herring Weaving",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Mystery Crime Clue Red Herring Weaving",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Mystery Crime Clue Red Herring Weaving.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Mystery Crime Clue Red Herring Weaving.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-perspective-villain-motivation-antagonist-design": {
    id: "creative-multi-multi-perspective-villain-motivation-antagonist-design",
    name: "MultiPerspectiveVillainMotivationAntagonistDesignSkill",
    displayName: "Multi Perspective Villain Motivation Antagonist Design",
    categoryId: "creative",
    description: "Crafts complex antagonists with sympathetic backstories, moral justifications, and tragic flaws.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Villain Motivation Antagonist Design",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Villain Motivation Antagonist Design",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Perspective Villain Motivation Antagonist Design.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Perspective Villain Motivation Antagonist Design.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-style-lyric-songwriting-melody-meter": {
    id: "creative-multi-multi-style-lyric-songwriting-melody-meter",
    name: "MultiStyleLyricSongwritingMelodyMeterSkill",
    displayName: "Multi Style Lyric Songwriting Melody Meter",
    categoryId: "creative",
    description: "Drafts song lyrics with verse-chorus-bridge structures, rhyme schemes, and musical rhythm.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Style Lyric Songwriting Melody Meter",
      ruSectionName: "Композитный Multi-Skill: Multi Style Lyric Songwriting Melody Meter",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Style Lyric Songwriting Melody Meter.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Style Lyric Songwriting Melody Meter.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-layer-historical-fiction-authenticity-weaving": {
    id: "creative-multi-multi-layer-historical-fiction-authenticity-weaving",
    name: "MultiLayerHistoricalFictionAuthenticityWeavingSkill",
    displayName: "Multi Layer Historical Fiction Authenticity Weaving",
    categoryId: "creative",
    description: "Weaves historical facts, period dialogue, cultural norms, and real figures into fictional narratives.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Historical Fiction Authenticity Weaving",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Historical Fiction Authenticity Weaving",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Historical Fiction Authenticity Weaving.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Historical Fiction Authenticity Weaving.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-character-ensemble-comedy-dynamics-design": {
    id: "creative-multi-multi-character-ensemble-comedy-dynamics-design",
    name: "MultiCharacterEnsembleComedyDynamicsDesignSkill",
    displayName: "Multi Character Ensemble Comedy Dynamics Design",
    categoryId: "creative",
    description: "Structures ensemble comedy character archetypes, banter dynamics, and escalating situational chaos.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Character Ensemble Comedy Dynamics Design",
      ruSectionName: "Композитный Multi-Skill: Multi Character Ensemble Comedy Dynamics Design",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Character Ensemble Comedy Dynamics Design.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Character Ensemble Comedy Dynamics Design.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-stage-horror-tension-dread-atmosphere-building": {
    id: "creative-multi-multi-stage-horror-tension-dread-atmosphere-building",
    name: "MultiStageHorrorTensionDreadAtmosphereBuildingSkill",
    displayName: "Multi Stage Horror Tension Dread Atmosphere Building",
    categoryId: "creative",
    description: "Builds psychological horror through eerie pacing, sensory isolation, uncanny atmosphere, and climactic terror.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Horror Tension Dread Atmosphere Building",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Horror Tension Dread Atmosphere Building",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Horror Tension Dread Atmosphere Building.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Horror Tension Dread Atmosphere Building.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-level-mythological-folklore-legend-crafting": {
    id: "creative-multi-multi-level-mythological-folklore-legend-crafting",
    name: "MultiLevelMythologicalFolkloreLegendCraftingSkill",
    displayName: "Multi Level Mythological Folklore Legend Crafting",
    categoryId: "creative",
    description: "Creates original mythologies, pantheons of deities, creation myths, and ancient hero legends.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Mythological Folklore Legend Crafting",
      ruSectionName: "Композитный Multi-Skill: Multi Level Mythological Folklore Legend Crafting",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Level Mythological Folklore Legend Crafting.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Level Mythological Folklore Legend Crafting.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-medium-visual-storyboard-scene-description": {
    id: "creative-multi-multi-medium-visual-storyboard-scene-description",
    name: "MultiMediumVisualStoryboardSceneDescriptionSkill",
    displayName: "Multi Medium Visual Storyboard Scene Description",
    categoryId: "creative",
    description: "Writes camera direction, shot framing (close-up, wide panning), lighting mood, and action descriptions.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Medium Visual Storyboard Scene Description",
      ruSectionName: "Композитный Multi-Skill: Multi Medium Visual Storyboard Scene Description",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Medium Visual Storyboard Scene Description.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Medium Visual Storyboard Scene Description.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-character-romance-chemistry-slow-burn-arc": {
    id: "creative-multi-multi-character-romance-chemistry-slow-burn-arc",
    name: "MultiCharacterRomanceChemistrySlowBurnArcSkill",
    displayName: "Multi Character Romance Chemistry Slow Burn Arc",
    categoryId: "creative",
    description: "Paces romantic tension, emotional intimacy, miscommunications, and satisfying resolution.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Character Romance Chemistry Slow Burn Arc",
      ruSectionName: "Композитный Multi-Skill: Multi Character Romance Chemistry Slow Burn Arc",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Character Romance Chemistry Slow Burn Arc.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Character Romance Chemistry Slow Burn Arc.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-layer-satire-parody-cultural-critique": {
    id: "creative-multi-multi-layer-satire-parody-cultural-critique",
    name: "MultiLayerSatireParodyCulturalCritiqueSkill",
    displayName: "Multi Layer Satire Parody Cultural Critique",
    categoryId: "creative",
    description: "Crafts sharp satirical fiction parodying corporate absurdities, social trends, or political systems.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Satire Parody Cultural Critique",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Satire Parody Cultural Critique",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Satire Parody Cultural Critique.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Satire Parody Cultural Critique.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-horizon-post-apocalyptic-survival-environment": {
    id: "creative-multi-multi-horizon-post-apocalyptic-survival-environment",
    name: "MultiHorizonPostApocalypticSurvivalEnvironmentSkill",
    displayName: "Multi Horizon Post Apocalyptic Survival Environment",
    categoryId: "creative",
    description: "Designs post-collapse societies, resource scarcity dynamics, mutated ecosystems, and survivor enclaves.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Post Apocalyptic Survival Environment",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Post Apocalyptic Survival Environment",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Horizon Post Apocalyptic Survival Environment.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Horizon Post Apocalyptic Survival Environment.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-character-speech-voice-dialect-idiolect-styling": {
    id: "creative-multi-multi-character-speech-voice-dialect-idiolect-styling",
    name: "MultiCharacterSpeechVoiceDialectIdiolectStylingSkill",
    displayName: "Multi Character Speech Voice Dialect Idiolect Styling",
    categoryId: "creative",
    description: "Gives each character unique speech patterns, regional slang, vocabulary quirks, and catchphrases.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Character Speech Voice Dialect Idiolect Styling",
      ruSectionName: "Композитный Multi-Skill: Multi Character Speech Voice Dialect Idiolect Styling",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Character Speech Voice Dialect Idiolect Styling.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Character Speech Voice Dialect Idiolect Styling.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-stage-graphic-novel-script-panel-layout": {
    id: "creative-multi-multi-stage-graphic-novel-script-panel-layout",
    name: "MultiStageGraphicNovelScriptPanelLayoutSkill",
    displayName: "Multi Stage Graphic Novel Script Panel Layout",
    categoryId: "creative",
    description: "Formats comic book scripts specifying page grids, panel descriptions, captions, and speech bubbles.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Graphic Novel Script Panel Layout",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Graphic Novel Script Panel Layout",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Graphic Novel Script Panel Layout.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Graphic Novel Script Panel Layout.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-layer-magical-realism-everyday-surrealism": {
    id: "creative-multi-multi-layer-magical-realism-everyday-surrealism",
    name: "MultiLayerMagicalRealismEverydaySurrealismSkill",
    displayName: "Multi Layer Magical Realism Everyday Surrealism",
    categoryId: "creative",
    description: "Blends mundane real-world settings with extraordinary, dreamlike magical elements accepted as normal.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Magical Realism Everyday Surrealism",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Magical Realism Everyday Surrealism",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Magical Realism Everyday Surrealism.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Magical Realism Everyday Surrealism.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-character-heist-plot-blueprint-execution": {
    id: "creative-multi-multi-character-heist-plot-blueprint-execution",
    name: "MultiCharacterHeistPlotBlueprintExecutionSkill",
    displayName: "Multi Character Heist Plot Blueprint Execution",
    categoryId: "creative",
    description: "Engineers intricate heist plans with specialist team assembly, security obstacles, and unexpected twists.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Character Heist Plot Blueprint Execution",
      ruSectionName: "Композитный Multi-Skill: Multi Character Heist Plot Blueprint Execution",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Character Heist Plot Blueprint Execution.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Character Heist Plot Blueprint Execution.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-horizon-cyberpunk-high-tech-low-life-dystopia": {
    id: "creative-multi-multi-horizon-cyberpunk-high-tech-low-life-dystopia",
    name: "MultiHorizonCyberpunkHighTechLowLifeDystopiaSkill",
    displayName: "Multi Horizon Cyberpunk High Tech Low Life Dystopia",
    categoryId: "creative",
    description: "Designs neon-lit megacities, mega-corporations, cybernetic enhancements, and underworld hackers.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Cyberpunk High Tech Low Life Dystopia",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Cyberpunk High Tech Low Life Dystopia",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Horizon Cyberpunk High Tech Low Life Dystopia.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Horizon Cyberpunk High Tech Low Life Dystopia.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-perspective-epistolary-novel-document-assembly": {
    id: "creative-multi-multi-perspective-epistolary-novel-document-assembly",
    name: "MultiPerspectiveEpistolaryNovelDocumentAssemblySkill",
    displayName: "Multi Perspective Epistolary Novel Document Assembly",
    categoryId: "creative",
    description: "Tells stories through diary entries, emails, police reports, interview transcripts, and letters.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Epistolary Novel Document Assembly",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Epistolary Novel Document Assembly",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Perspective Epistolary Novel Document Assembly.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Perspective Epistolary Novel Document Assembly.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-stage-action-choreography-stunt-pacing": {
    id: "creative-multi-multi-stage-action-choreography-stunt-pacing",
    name: "MultiStageActionChoreographyStuntPacingSkill",
    displayName: "Multi Stage Action Choreography Stunt Pacing",
    categoryId: "creative",
    description: "Writes visceral, spatial action combat scenes with clear cause-and-effect choreography.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Action Choreography Stunt Pacing",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Action Choreography Stunt Pacing",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Action Choreography Stunt Pacing.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Action Choreography Stunt Pacing.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-layer-gothic-atmosphere-haunted-environment": {
    id: "creative-multi-multi-layer-gothic-atmosphere-haunted-environment",
    name: "MultiLayerGothicAtmosphereHauntedEnvironmentSkill",
    displayName: "Multi Layer Gothic Atmosphere Haunted Environment",
    categoryId: "creative",
    description: "Crafts creepy gothic horror featuring crumbling mansions, family curses, stormy weather, and madness.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Gothic Atmosphere Haunted Environment",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Gothic Atmosphere Haunted Environment",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Gothic Atmosphere Haunted Environment.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Gothic Atmosphere Haunted Environment.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-character-time-travel-causality-loop-paradox": {
    id: "creative-multi-multi-character-time-travel-causality-loop-paradox",
    name: "MultiCharacterTimeTravelCausalityLoopParadoxSkill",
    displayName: "Multi Character Time Travel Causality Loop Paradox",
    categoryId: "creative",
    description: "Engineers time travel narratives navigating grandfather paradoxes, butterfly effects, and fixed points.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Character Time Travel Causality Loop Paradox",
      ruSectionName: "Композитный Multi-Skill: Multi Character Time Travel Causality Loop Paradox",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Character Time Travel Causality Loop Paradox.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Character Time Travel Causality Loop Paradox.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-stage-audio-drama-script-sound-effect-design": {
    id: "creative-multi-multi-stage-audio-drama-script-sound-effect-design",
    name: "MultiStageAudioDramaScriptSoundEffectDesignSkill",
    displayName: "Multi Stage Audio Drama Script Sound Effect Design",
    categoryId: "creative",
    description: "Formats radio/podcast drama scripts with rich sound effects (SFX), ambient noise, and voice cues.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Audio Drama Script Sound Effect Design",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Audio Drama Script Sound Effect Design",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Audio Drama Script Sound Effect Design.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Audio Drama Script Sound Effect Design.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-layer-urban-fantasy-hidden-world-concealment": {
    id: "creative-multi-multi-layer-urban-fantasy-hidden-world-concealment",
    name: "MultiLayerUrbanFantasyHiddenWorldConcealmentSkill",
    displayName: "Multi Layer Urban Fantasy Hidden World Concealment",
    categoryId: "creative",
    description: "Designs secret magical societies hiding in plain sight beneath modern metropolitan cities.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Urban Fantasy Hidden World Concealment",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Urban Fantasy Hidden World Concealment",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Urban Fantasy Hidden World Concealment.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Urban Fantasy Hidden World Concealment.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-perspective-multiverse-parallel-reality-architecture": {
    id: "creative-multi-multi-perspective-multiverse-parallel-reality-architecture",
    name: "MultiPerspectiveMultiverseParallelRealityArchitectureSkill",
    displayName: "Multi Perspective Multiverse Parallel Reality Architecture",
    categoryId: "creative",
    description: "Structures stories exploring alternate history branches and parallel universe counterpart characters.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Multiverse Parallel Reality Architecture",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Multiverse Parallel Reality Architecture",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Perspective Multiverse Parallel Reality Architecture.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Perspective Multiverse Parallel Reality Architecture.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-character-micro-fiction-flash-story-crafting": {
    id: "creative-multi-multi-character-micro-fiction-flash-story-crafting",
    name: "MultiCharacterMicroFictionFlashStoryCraftingSkill",
    displayName: "Multi Character Micro Fiction Flash Story Crafting",
    categoryId: "creative",
    description: "Writes impactful complete stories under 500 words with vivid punchlines and emotional resonance.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Character Micro Fiction Flash Story Crafting",
      ruSectionName: "Композитный Multi-Skill: Multi Character Micro Fiction Flash Story Crafting",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Character Micro Fiction Flash Story Crafting.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Character Micro Fiction Flash Story Crafting.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-layer-space-opera-galactic-empire-civilizations": {
    id: "creative-multi-multi-layer-space-opera-galactic-empire-civilizations",
    name: "MultiLayerSpaceOperaGalacticEmpireCivilizationsSkill",
    displayName: "Multi Layer Space Opera Galactic Empire Civilizations",
    categoryId: "creative",
    description: "Designs sprawling space empires, alien species physiology, faster-than-light transit, and starship battles.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Space Opera Galactic Empire Civilizations",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Space Opera Galactic Empire Civilizations",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Space Opera Galactic Empire Civilizations.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Space Opera Galactic Empire Civilizations.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-stage-childrens-picture-book-rhythm-rhyme": {
    id: "creative-multi-multi-stage-childrens-picture-book-rhythm-rhyme",
    name: "MultiStageChildrensPictureBookRhythmRhymeSkill",
    displayName: "Multi Stage Childrens Picture Book Rhythm Rhyme",
    categoryId: "creative",
    description: "Drafts engaging picture book text with rhythmic repetition, visual page-turn hooks, and gentle morals.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Childrens Picture Book Rhythm Rhyme",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Childrens Picture Book Rhythm Rhyme",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Childrens Picture Book Rhythm Rhyme.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Childrens Picture Book Rhythm Rhyme.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-character-young-adult-coming-of-age-storyline": {
    id: "creative-multi-multi-character-young-adult-coming-of-age-storyline",
    name: "MultiCharacterYoungAdultComingofAgeStorylineSkill",
    displayName: "Multi Character Young Adult Coming of Age Storyline",
    categoryId: "creative",
    description: "Explores teenage identity, friendship conflicts, first love, and standing up against authority.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Character Young Adult Coming of Age Storyline",
      ruSectionName: "Композитный Multi-Skill: Multi Character Young Adult Coming of Age Storyline",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Character Young Adult Coming of Age Storyline.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Character Young Adult Coming of Age Storyline.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-layer-noir-detective-hardboiled-investigation": {
    id: "creative-multi-multi-layer-noir-detective-hardboiled-investigation",
    name: "MultiLayerNoirDetectiveHardboiledInvestigationSkill",
    displayName: "Multi Layer Noir Detective Hardboiled Investigation",
    categoryId: "creative",
    description: "Crafts gritty detective noir with cynicism, femme fatales, rain-soaked streets, and systemic corruption.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Noir Detective Hardboiled Investigation",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Noir Detective Hardboiled Investigation",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Noir Detective Hardboiled Investigation.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Noir Detective Hardboiled Investigation.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-stage-steampunk-victorian-industrial-technology": {
    id: "creative-multi-multi-stage-steampunk-victorian-industrial-technology",
    name: "MultiStageSteampunkVictorianIndustrialTechnologySkill",
    displayName: "Multi Stage Steampunk Victorian Industrial Technology",
    categoryId: "creative",
    description: "Designs brass clockwork mechanisms, steam-powered airships, Victorian etiquette, and mad scientists.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Steampunk Victorian Industrial Technology",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Steampunk Victorian Industrial Technology",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Steampunk Victorian Industrial Technology.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Steampunk Victorian Industrial Technology.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-character-solarpunk-ecological-hopeful-future": {
    id: "creative-multi-multi-character-solarpunk-ecological-hopeful-future",
    name: "MultiCharacterSolarpunkEcologicalHopefulFutureSkill",
    displayName: "Multi Character Solarpunk Ecological Hopeful Future",
    categoryId: "creative",
    description: "Designs optimistic eco-cities, solar architecture, community resilience, and sustainable tech.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Character Solarpunk Ecological Hopeful Future",
      ruSectionName: "Композитный Multi-Skill: Multi Character Solarpunk Ecological Hopeful Future",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Character Solarpunk Ecological Hopeful Future.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Character Solarpunk Ecological Hopeful Future.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-layer-litrpg-game-mechanics-progression-story": {
    id: "creative-multi-multi-layer-litrpg-game-mechanics-progression-story",
    name: "MultiLayerLitRPGGameMechanicsProgressionStorySkill",
    displayName: "Multi Layer LitRPG Game Mechanics Progression Story",
    categoryId: "creative",
    description: "Integrates stats, level-ups, skill trees, and quest logs seamlessly into fiction narratives.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer LitRPG Game Mechanics Progression Story",
      ruSectionName: "Композитный Multi-Skill: Multi Layer LitRPG Game Mechanics Progression Story",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer LitRPG Game Mechanics Progression Story.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer LitRPG Game Mechanics Progression Story.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-stage-kaiju-giant-monster-disaster-narrative": {
    id: "creative-multi-multi-stage-kaiju-giant-monster-disaster-narrative",
    name: "MultiStageKaijuGiantMonsterDisasterNarrativeSkill",
    displayName: "Multi Stage Kaiju Giant Monster Disaster Narrative",
    categoryId: "creative",
    description: "Paces giant monster attacks, military defense strategies, city destruction, and human survival.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Kaiju Giant Monster Disaster Narrative",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Kaiju Giant Monster Disaster Narrative",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Kaiju Giant Monster Disaster Narrative.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Kaiju Giant Monster Disaster Narrative.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-character-superhero-origin-team-assembly": {
    id: "creative-multi-multi-character-superhero-origin-team-assembly",
    name: "MultiCharacterSuperheroOriginTeamAssemblySkill",
    displayName: "Multi Character Superhero Origin Team Assembly",
    categoryId: "creative",
    description: "Crafts superhero origin stories, unique power sets, weakness limitations, and team chemistry.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Character Superhero Origin Team Assembly",
      ruSectionName: "Композитный Multi-Skill: Multi Character Superhero Origin Team Assembly",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Character Superhero Origin Team Assembly.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Character Superhero Origin Team Assembly.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-layer-grimdark-dark-fantasy-moral-grey-ambiguity": {
    id: "creative-multi-multi-layer-grimdark-dark-fantasy-moral-grey-ambiguity",
    name: "MultiLayerGrimdarkDarkFantasyMoralGreyAmbiguitySkill",
    displayName: "Multi Layer Grimdark Dark Fantasy Moral Grey Ambiguity",
    categoryId: "creative",
    description: "Creates bleak fantasy worlds with morally grey anti-heroes, brutal realism, and pyrrhic victories.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Grimdark Dark Fantasy Moral Grey Ambiguity",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Grimdark Dark Fantasy Moral Grey Ambiguity",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Layer Grimdark Dark Fantasy Moral Grey Ambiguity.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Layer Grimdark Dark Fantasy Moral Grey Ambiguity.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-stage-tabletop-rpg-campaign-module-architect": {
    id: "creative-multi-multi-stage-tabletop-rpg-campaign-module-architect",
    name: "MultiStageTabletopRPGCampaignModuleArchitectSkill",
    displayName: "Multi Stage Tabletop RPG Campaign Module Architect",
    categoryId: "creative",
    description: "Designs D&D/TTRPG campaign modules with quest hooks, dungeon maps, NPC stats, and encounter balance.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Tabletop RPG Campaign Module Architect",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Tabletop RPG Campaign Module Architect",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Stage Tabletop RPG Campaign Module Architect.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Stage Tabletop RPG Campaign Module Architect.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },

  "creative-multi-multi-horizon-master-creative-direction-storytelling-engine": {
    id: "creative-multi-multi-horizon-master-creative-direction-storytelling-engine",
    name: "MultiHorizonMasterCreativeDirectionStorytellingEngineSkill",
    displayName: "Multi Horizon Master Creative Direction Storytelling Engine",
    categoryId: "creative",
    description: "Enforces master artistic vision, narrative pacing, emotional resonance, and world-class prose.",
    tags: ["creative","multi-skill","creative-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Master Creative Direction Storytelling Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Master Creative Direction Storytelling Engine",
      instructions: [
        "Phase 1: Setup parameters and initial input routing for Multi Horizon Master Creative Direction Storytelling Engine.",
        "Phase 2: Multi-stage transformation, orchestration, and evaluation loop.",
        "Phase 3: Synthesize output into structured format with comprehensive validations."
],
      ruInstructions: [
        "Этап 1: Инициализация параметров и маршрутизация входящих данных для Multi Horizon Master Creative Direction Storytelling Engine.",
        "Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.",
        "Этап 3: Итоговый синтез в структурированный формат с полной валидацией."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi"],
    }),
  },
  "creative-multi-topup-multi-layer-cyberpunk-neon-underworld-detective-narrative": {
    id: "creative-multi-topup-multi-layer-cyberpunk-neon-underworld-detective-narrative",
    name: "MultiLayerCyberpunkNeonUnderworldDetectiveNarrativeSkill",
    displayName: "Multi Layer Cyberpunk Neon Underworld Detective Narrative",
    categoryId: "creative",
    description: "Crafts gritty cyberpunk noir detective stories with implants, megacorps, and rain-soaked alleyways.",
    tags: ["creative","multi-skill","creative-multi-topup"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Cyberpunk Neon Underworld Detective Narrative",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Cyberpunk Neon Underworld Detective Narrative",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Cyberpunk Neon Underworld Detective Narrative.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Cyberpunk Neon Underworld Detective Narrative.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi-topup"],
    }),
  },

  "creative-multi-topup-multi-stage-fantasy-epic-siege-battle-strategy": {
    id: "creative-multi-topup-multi-stage-fantasy-epic-siege-battle-strategy",
    name: "MultiStageFantasyEpicSiegeBattleStrategySkill",
    displayName: "Multi Stage Fantasy Epic Siege Battle Strategy",
    categoryId: "creative",
    description: "Paces massive castle siege battles with trebuchets, magic defense barriers, and heroic duels.",
    tags: ["creative","multi-skill","creative-multi-topup"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Fantasy Epic Siege Battle Strategy",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Fantasy Epic Siege Battle Strategy",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Fantasy Epic Siege Battle Strategy.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Fantasy Epic Siege Battle Strategy.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi-topup"],
    }),
  },

  "creative-multi-topup-multi-perspective-time-travel-multiverse-timeline-repair": {
    id: "creative-multi-topup-multi-perspective-time-travel-multiverse-timeline-repair",
    name: "MultiPerspectiveTimeTravelMultiverseTimelineRepairSkill",
    displayName: "Multi Perspective Time Travel Multiverse Timeline Repair",
    categoryId: "creative",
    description: "Navigates complex multiverse timeline paradoxes and temporal paradox agents.",
    tags: ["creative","multi-skill","creative-multi-topup"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Time Travel Multiverse Timeline Repair",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Time Travel Multiverse Timeline Repair",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Perspective Time Travel Multiverse Timeline Repair.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Perspective Time Travel Multiverse Timeline Repair.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi-topup"],
    }),
  },

  "creative-multi-topup-multi-character-cozy-mystery-village-bakery-whodunit": {
    id: "creative-multi-topup-multi-character-cozy-mystery-village-bakery-whodunit",
    name: "MultiCharacterCozyMysteryVillageBakeryWhodunitSkill",
    displayName: "Multi Character Cozy Mystery Village Bakery Whodunit",
    categoryId: "creative",
    description: "Engineers charming cozy mystery plots in small seaside villages with eccentric suspects.",
    tags: ["creative","multi-skill","creative-multi-topup"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Character Cozy Mystery Village Bakery Whodunit",
      ruSectionName: "Композитный Multi-Skill: Multi Character Cozy Mystery Village Bakery Whodunit",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Character Cozy Mystery Village Bakery Whodunit.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Character Cozy Mystery Village Bakery Whodunit.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi-topup"],
    }),
  },

  "creative-multi-topup-multi-layer-solar-punk-organic-architecture-worldbuilding": {
    id: "creative-multi-topup-multi-layer-solar-punk-organic-architecture-worldbuilding",
    name: "MultiLayerSolarPunkOrganicArchitectureWorldbuildingSkill",
    displayName: "Multi Layer Solar Punk Organic Architecture Worldbuilding",
    categoryId: "creative",
    description: "Designs hopeful solar-powered eco-cities integrated with living botanical structures.",
    tags: ["creative","multi-skill","creative-multi-topup"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Solar Punk Organic Architecture Worldbuilding",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Solar Punk Organic Architecture Worldbuilding",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Solar Punk Organic Architecture Worldbuilding.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Solar Punk Organic Architecture Worldbuilding.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi-topup"],
    }),
  },

  "creative-multi-topup-multi-stage-gothic-vampire-aristocracy-political-intrigue": {
    id: "creative-multi-topup-multi-stage-gothic-vampire-aristocracy-political-intrigue",
    name: "MultiStageGothicVampireAristocracyPoliticalIntrigueSkill",
    displayName: "Multi Stage Gothic Vampire Aristocracy Political Intrigue",
    categoryId: "creative",
    description: "Drafts political intrigue stories between immortal aristocratic vampire coven houses.",
    tags: ["creative","multi-skill","creative-multi-topup"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Gothic Vampire Aristocracy Political Intrigue",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Gothic Vampire Aristocracy Political Intrigue",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Gothic Vampire Aristocracy Political Intrigue.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Gothic Vampire Aristocracy Political Intrigue.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi-topup"],
    }),
  },

  "creative-multi-topup-multi-character-space-western-freight-hauler-crew": {
    id: "creative-multi-topup-multi-character-space-western-freight-hauler-crew",
    name: "MultiCharacterSpaceWesternFreightHaulerCrewSkill",
    displayName: "Multi Character Space Western Freight Hauler Crew",
    categoryId: "creative",
    description: "Structures ragtag space freighter crew dynamics completing dangerous smuggling jobs.",
    tags: ["creative","multi-skill","creative-multi-topup"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Character Space Western Freight Hauler Crew",
      ruSectionName: "Композитный Multi-Skill: Multi Character Space Western Freight Hauler Crew",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Character Space Western Freight Hauler Crew.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Character Space Western Freight Hauler Crew.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi-topup"],
    }),
  },

  "creative-multi-topup-multi-horizon-master-narrative-prose-stylist-engine": {
    id: "creative-multi-topup-multi-horizon-master-narrative-prose-stylist-engine",
    name: "MultiHorizonMasterNarrativeProseStylistEngineSkill",
    displayName: "Multi Horizon Master Narrative Prose Stylist Engine",
    categoryId: "creative",
    description: "Enforces master literary prose, poetic cadence, and unforgettable story craft.",
    tags: ["creative","multi-skill","creative-multi-topup"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Master Narrative Prose Stylist Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Master Narrative Prose Stylist Engine",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Horizon Master Narrative Prose Stylist Engine.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Horizon Master Narrative Prose Stylist Engine.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["creative","multi-skill","creative-multi-topup"],
    }),
  },
};
