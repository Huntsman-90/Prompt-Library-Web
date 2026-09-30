const { appendSkills } = require('../appendSkills.cjs');

// Run batch7 creative top-up first
require('./batch7_creative_topup.cjs');

// Complete remaining to 75-80 each!
const CATEGORY_EXPANSIONS = {
  creative: [
    {
      id: "creative-folk-fairy-tale-propp-morphology",
      name: "CreativeFolkFairyTaleProppMorphologySkill",
      displayName: "Vladimir Propp Folk Tale Morphology & Archetypal Functions",
      categoryId: "creative",
      description: "Structures authentic folktales using Vladimir Propp's 31 narrative functions (Interdiction, Violation, Departure, Donor Test).",
      tags: ["creative", "folklore", "propp", "fairy-tale", "mythology"],
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
      semanticType: "creative_framework"
    },
    {
      id: "creative-stream-of-consciousness-joyce-woolf",
      name: "CreativeStreamOfConsciousnessJoyceWoolfSkill",
      displayName: "Modernist Stream of Consciousness (James Joyce / Virginia Woolf)",
      categoryId: "creative",
      description: "Captures unedited sensory flow, internal monologues, and involuntary memory associations (Proustian epiphanies).",
      tags: ["creative", "modernism", "stream-of-consciousness", "joyce", "woolf", "literature"],
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
      semanticType: "creative_framework"
    },
    {
      id: "creative-cyber-noir-augmented-detective",
      name: "CreativeCyberNoirAugmentedDetectiveSkill",
      displayName: "Cyber-Noir Augmented Reality Investigation & Digital Grit",
      categoryId: "creative",
      description: "Merges rain-drenched hardboiled detective tropes with ocular HUD overlays, memory implant forensic extractions, and neon haze.",
      tags: ["creative", "cyber-noir", "sci-fi", "detective", "cyberpunk"],
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
      semanticType: "creative_framework"
    },
    {
      id: "creative-mythological-pantheon-creation",
      name: "CreativeMythologicalPantheonCreationSkill",
      displayName: "Mythological Pantheon & Cosmogony Creation Engine",
      categoryId: "creative",
      description: "Generates coherent polytheistic pantheons: creation cosmogonies, sibling rivalries, divine domains, and mortal prayer rituals.",
      tags: ["creative", "mythology", "worldbuilding", "pantheon", "gods"],
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
      semanticType: "creative_framework"
    },
    {
      id: "creative-epic-fantasy-conlang-phonotactics",
      name: "CreativeEpicFantasyConlangPhonotacticsSkill",
      displayName: "Fantasy Conlang Naming & Phonotactic Consistency",
      categoryId: "creative",
      description: "Develops believable fictional languages (Tolkien style) with strict phonetic inventories, consonant clusters, and naming conventions.",
      tags: ["creative", "conlang", "fantasy", "worldbuilding", "linguistics"],
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
      semanticType: "creative_framework"
    },
    {
      id: "creative-screenplay-scene-beat-sheet-snyder",
      name: "CreativeScreenplaySceneBeatSheetSnyderSkill",
      displayName: "Blake Snyder 'Save the Cat' 15-Beat Screenplay Structure",
      categoryId: "creative",
      description: "Structures cinematic screenplays according to the proven 15-beat timeline: Catalyst, Break into Two, Midpoint, All is Lost, Climax.",
      tags: ["creative", "screenwriting", "save-the-cat", "blake-snyder", "cinema"],
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
      semanticType: "creative_framework"
    }
  ]
};

console.log('Running master batch expansions for all categories...');
for (const [cat, skills] of Object.entries(CATEGORY_EXPANSIONS)) {
  appendSkills(cat, skills);
}
console.log('Master batch complete!');
