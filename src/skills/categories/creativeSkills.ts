import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const CREATIVE_SKILLS: Record<string, SkillDefinition> = {
  'lateral-metaphor': {
    id: 'lateral-metaphor',
    name: 'LateralMetaphorSkill',
    displayName: 'Lateral Metaphors & Unconventional Parallels',
    categoryId: 'creative',
    description: 'Generates non-obvious cross-domain metaphors that spark creative breakthroughs and memorability.',
    tags: ['creative', 'metaphor', 'lateral', 'imagery', 'analogies'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Генерация Латеральных Метафор',
        'Lateral Metaphor Synthesis Protocol',
        [
          '- Провести неожиданную параллель с концепцией из органической химии, джазовой импровизации или глубоководной биологии.',
          '- Обосновать связь через 3 конкретные точки пересечения механизмов.',
        ],
        [
          '- Synthesize a non-obvious parallel derived from organic chemistry, jazz improvisation, or deep-sea biology.',
          '- Ground the metaphor via 3 concrete isomorphic structural intersections.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'narrative-pacing': {
    id: 'narrative-pacing',
    name: 'NarrativePacingSkill',
    displayName: 'Cinematic Narrative Pacing & Tension',
    categoryId: 'creative',
    description: 'Modulates scene rhythm between high-octane kinetic action and introspective sensory stillness.',
    tags: ['creative', 'pacing', 'narrative', 'tension', 'storytelling'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Управление Нарративным Темпом и Напряжением',
        'Cinematic Narrative Pacing Directives',
        [
          '- Чередовать сцены быстрого действия с паузами глубокой сенсорной детализации.',
          '- Повышать напряжение к кульминации за счет укорочения синтаксических конструкций.',
        ],
        [
          '- Modulate scene rhythm: alternate kinetic forward momentum with contemplative sensory stillness.',
          '- Accelerate dramatic tension toward climax by compressing sentence length and syntactic pauses.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'worldbuilding-ruleset': {
    id: 'worldbuilding-ruleset',
    name: 'WorldbuildingRulesetSkill',
    displayName: 'Hard-Magic Worldbuilding Invariant Ruleset',
    categoryId: 'creative',
    description: 'Establishes internally consistent physical, magical, technological, and sociological laws.',
    tags: ['creative', 'worldbuilding', 'lore', 'invariants', 'scifi', 'fantasy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Правила и Законы Вымышленного Мира (Worldbuilding)',
        'Hard Worldbuilding Invariants & Lore System',
        [
          '- **Физические/Магические законы**: Зафиксировать 3 строгих ограничения (что невозможно сделать ни при каких условиях).',
          '- **Социо-экономические следствия**: Показать, как эти законы влияют на торговлю, власть и быт обычных жителей.',
        ],
        [
          '- **Core Physical/Magical Invariants**: Establish 3 immutable constraints (what is strictly impossible).',
          '- **Sociological Ramifications**: Trace how core laws shape trade economies, power hierarchies, and daily survival.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'dramatic-tension-arc': {
    id: 'dramatic-tension-arc',
    name: 'DramaticTensionArcSkill',
    displayName: 'Freytag\'s Dramatic Tension Pyramid',
    categoryId: 'creative',
    description: 'Structures narrative across Exposition, Inciting Incident, Rising Action, Climax, Falling Action, and Resolution.',
    tags: ['creative', 'drama', 'freytag', 'climax', 'story-structure'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Пирамида Драматического Напряжения Фрейтага',
        'Freytag\'s Dramatic Pyramid Structure',
        [
          '1. Экспозиция -> 2. Триггер конфликта -> 3. Нарастание напряжения -> 4. Кульминация -> 5. Развязка.',
        ],
        [
          '1. Exposition -> 2. Inciting Catalyst -> 3. Escalating Obstacles -> 4. Climax -> 5. Resolution.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'show-dont-tell-sensory': {
    id: 'show-dont-tell-sensory',
    name: 'ShowDontTellSensorySkill',
    displayName: 'Show, Don\'t Tell Sensory Immersion',
    categoryId: 'creative',
    description: 'Replaces abstract emotional adjectives with concrete physiological reactions and environmental details.',
    tags: ['creative', 'show-dont-tell', 'sensory', 'immersion', 'writing'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Принцип «Показывай, а не рассказывай» (Show, Don\'t Tell)',
        'Show, Don\'t Tell Sensory Immersion Directives',
        [
          '- Запрещено напрямую писать «он испугался» или «было холодно»; описывать дрожь пальцев, пар от дыхания и звук шагов.',
        ],
        [
          '- Strictly ban emotional declarations ("she was terrified"); depict kinetic physiology (shallow breathing, trembling fingers, white knuckles).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'character-voice-dialect': {
    id: 'character-voice-dialect',
    name: 'CharacterVoiceDialectSkill',
    displayName: 'Distinct Character Voice & Sociolect',
    categoryId: 'creative',
    description: 'Shapes distinct verbal idiolects, vocabulary quirks, rhythms, and worldview filters for each character.',
    tags: ['creative', 'character', 'voice', 'dialogue', 'idiolect'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Индивидуальный Голос Персонажа (Idiolect)',
        'Character Idiolect & Linguistic Voice Directives',
        [
          '- Отразить в речи персонажа его происхождение, профессию и скрытые психологические зажимы через речевые паттерны.',
        ],
        [
          '- Embed character background, trade vocabulary, and psychological biases into unique speech rhythms and diction.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'poetic-cadence-meter': {
    id: 'poetic-cadence-meter',
    name: 'PoeticCadenceMeterSkill',
    displayName: 'Poetic Metrical Cadence & Alliteration',
    categoryId: 'creative',
    description: 'Enriches prose with subtle rhythmic meter (iambic, anapestic), assonance, and alliteration.',
    tags: ['creative', 'poetry', 'meter', 'cadence', 'alliteration'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Поэтический Ритм и Аллитерация',
        'Poetic Meter & Alliterative Resonance',
        [
          '- Использовать фонетическую гармонию, аллитерацию согласных и ритмические повторы для усиления эмоционального воздействия.',
        ],
        [
          '- Infuse prose with metrical resonance, consonant alliteration, and vowel cadence to elevate emotional resonance.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'micro-fiction-genesis': {
    id: 'micro-fiction-genesis',
    name: 'MicroFictionGenesisSkill',
    displayName: '50-Word Micro-Fiction Genesis',
    categoryId: 'creative',
    description: 'Condenses a complete emotional and narrative arc with a shocking twist into under 50 words.',
    tags: ['creative', 'micro-fiction', 'flash-fiction', 'twist', 'brevity'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Формат Микро-Рассказа (Flash Fiction)',
        'Micro-Fiction Flash Narrative Constraints',
        [
          '- Объем строго до 50 слов: завязка, кульминация и неожиданный финальный поворот (Twist).',
        ],
        [
          '- Strictly under 50 words: complete character arc, escalating tension, and a devastating final twist.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'mythic-archetype-resonance': {
    id: 'mythic-archetype-resonance',
    name: 'MythicArchetypeResonanceSkill',
    displayName: 'Jungian Mythic Archetype Resonance',
    categoryId: 'creative',
    description: 'Weaves Jungian archetypes (The Shadow, The Anima, The Trickster, The Mentor) into character dynamics.',
    tags: ['creative', 'jung', 'archetypes', 'mythology', 'depth'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Юнгианские Мифические Архетипы',
        'Jungian Mythic Archetype Dynamics',
        [
          '- Интегрировать архетипические роли (Трикстер, Тень, Мудрый Наставник) для создания многослойного глубинного подтекста.',
        ],
        [
          '- Weave mythic archetypal tension (The Shadow, The Trickster, The Threshold Guardian) into character dynamics.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'surrealist-juxtaposition': {
    id: 'surrealist-juxtaposition',
    name: 'SurrealistJuxtapositionSkill',
    displayName: 'Surrealist Imagery Juxtaposition',
    categoryId: 'creative',
    description: 'Juxtaposes incompatible everyday elements to produce dreamlike, thought-provoking surreal imagery.',
    tags: ['creative', 'surrealism', 'juxtaposition', 'dreamlike', 'imagination'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Сюрреалистическое Сопоставление Образов',
        'Surrealist Conceptual Juxtaposition',
        [
          '- Соединить два несовместимых физических понятия для создания гипнотического сюрреалистического образа.',
        ],
        [
          '- Juxtapose incompatible physical or temporal realities to craft haunting, poetic surrealist imagery.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'cinematic-scene-framing': {
    id: 'cinematic-scene-framing',
    name: 'CinematicSceneFramingSkill',
    displayName: 'Cinematic Director\'s Camera Framing',
    categoryId: 'creative',
    description: 'Directs scenes using film terminology: Establishing Shot, Close-Up, Dutch Angle, and Sound Design.',
    tags: ['creative', 'cinematic', 'camera', 'film', 'screenplay'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Кинематографическая Раскадровка Сцены',
        'Cinematic Scene Framing & Audio Design',
        [
          '- Описать сцену через операторские планы: Общий план (Establishing Shot) -> Крупный план детали -> Звуковой ландшафт (Foley).',
        ],
        [
          '- Structure prose through cinematic camera lenses: Establishing Wide Shot -> Macro Close-Up -> Ambient Soundscape Foley.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'dialogue-subtext-weaving': {
    id: 'dialogue-subtext-weaving',
    name: 'DialogueSubtextWeavingSkill',
    displayName: 'Dialogue Subtext & Hidden Agendas',
    categoryId: 'creative',
    description: 'Ensures characters never say what they actually mean, embedding rich psychological subtext beneath dialogue.',
    tags: ['creative', 'subtext', 'dialogue', 'psychology', 'screenwriting'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Скрытый Подтекст в Диалогах (Subtext)',
        'Subtext & Psychological Hidden Agenda Weaving',
        [
          '- Персонажи говорят о бытовых вещах, но через интонации и выбор слов транслируют скрытую угрозу или влечение.',
        ],
        [
          '- Characters speak of trivial topics while subtextually conveying latent hostility, desire, or strategic manipulation.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'world-lore-chronology': {
    id: 'world-lore-chronology',
    name: 'WorldLoreChronologySkill',
    displayName: 'Historical Lore & Timeline Architecture',
    categoryId: 'creative',
    description: 'Builds multi-epoch historical timelines with foundational cataclysms, treaty signings, and cultural schisms.',
    tags: ['creative', 'lore', 'timeline', 'worldbuilding', 'history'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Хронология Эпох и Исторический Лор',
        'Historical Epochs & Lore Chronology',
        [
          '- Описать 3 ключевые исторические эпохи (Древний Катаклизм -> Эпоха Раскола -> Современный Кризис).',
        ],
        [
          '- Outline 3 distinct historical epochs: The Primordial Cataclysm -> The Fractured Reconstruction -> The Contemporary Crisis.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'speculative-future-worldbuilding': {
    id: 'speculative-future-worldbuilding',
    name: 'SpeculativeFutureWorldbuildingSkill',
    displayName: 'Near-Future Speculative Sci-Fi Extrapolation',
    categoryId: 'creative',
    description: 'Extrapolates current AI, biotech, and geopolitical trends 30 years into the future with rigorous plausibility.',
    tags: ['creative', 'scifi', 'speculative', 'futurism', 'extrapolation'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Экстраполяция Научной Фантастики Ближнего Прицела',
        'Near-Future Speculative Sci-Fi Extrapolation',
        [
          '- Взять существующую технологию и показать ее развитие через 30 лет с учетом социальных, правовых и этических деформаций.',
        ],
        [
          '- Extrapolate emerging frontier technologies 30 years forward, mapping cultural, legal, and economic mutations.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
