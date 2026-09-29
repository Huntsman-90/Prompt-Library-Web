import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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
};
