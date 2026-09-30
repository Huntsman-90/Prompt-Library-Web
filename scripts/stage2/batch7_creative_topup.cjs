const { appendSkills } = require('../appendSkills.cjs');

// Creative (20 skills)
const CREATIVE_20 = [
  {
    id: "creative-haiku-kireji-seasonal-cutting-word",
    name: "CreativeHaikuKirejiSeasonalCuttingWordSkill",
    displayName: "Classical Japanese Haiku (Kigo & Kireji Cutting Words)",
    categoryId: "creative",
    description: "Composes 5-7-5 syllable haiku rooted in seasonal kigo references and a dramatic conceptual cutting pause (kireji).",
    tags: ["creative", "poetry", "haiku", "kigo", "japanese-literature"],
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
    semanticType: "creative_framework"
  },
  {
    id: "creative-epic-poetry-dactylic-hexameter-homer",
    name: "CreativeEpicPoetryDactylicHexameterHomerSkill",
    displayName: "Homeric Epic Poetry & Dactylic Hexameter Invocation",
    categoryId: "creative",
    description: "Crafts epic heroic poetry featuring Muse invocations, epithets (rosy-fingered Dawn), and extended Homeric similes.",
    tags: ["creative", "poetry", "epic", "homer", "mythology", "classics"],
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
    semanticType: "creative_framework"
  },
  {
    id: "creative-magical-realism-marquez-macondo",
    name: "CreativeMagicalRealismMarquezMacondoSkill",
    displayName: "Gabriel García Márquez Magical Realism & Mythic Matter-of-Factness",
    categoryId: "creative",
    description: "Blends fantastical occurrences (yellow butterflies, ascending levitations) with calm, journalistic realism in Latin American tradition.",
    tags: ["creative", "magical-realism", "marquez", "literature", "fiction"],
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
    semanticType: "creative_framework"
  },
  {
    id: "creative-steampunk-victorian-clockwork-aesthetics",
    name: "CreativeSteampunkVictorianClockworkAestheticsSkill",
    displayName: "Steampunk Victorian Brass & Pneumatic Clockwork Aesthetics",
    categoryId: "creative",
    description: "Designs alternative 19th-century worlds powered by brass gears, pressurized steam pistons, airships, and gaslight romance.",
    tags: ["creative", "steampunk", "sci-fi", "worldbuilding", "victorian"],
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
    semanticType: "creative_framework"
  },
  {
    id: "creative-horror-lovecraftian-cosmic-dread",
    name: "CreativeHorrorLovecraftianCosmicDreadSkill",
    displayName: "Lovecraftian Cosmic Horror & Existential Insignificance",
    categoryId: "creative",
    description: "Evokes atmospheric dread through ancient non-Euclidean architectures, sanity-shattering cosmic entities, and forbidden grimoires.",
    tags: ["creative", "horror", "lovecraft", "cosmic-dread", "fiction"],
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
    semanticType: "creative_framework"
  },
  {
    id: "creative-lyric-songwriting-verse-chorus-bridge",
    name: "CreativeLyricSongwritingVerseChorusBridgeSkill",
    displayName: "Commercial Lyric Songwriting & Prosody Harmonization",
    categoryId: "creative",
    description: "Structures radio-ready song lyrics: storytelling verses, explosive anthemic choruses, and transformative bridge twists.",
    tags: ["creative", "songwriting", "lyrics", "music", "composition"],
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
    semanticType: "creative_framework"
  },
  {
    id: "creative-space-opera-intergalactic-geopolitics",
    name: "CreativeSpaceOperaIntergalacticGeopoliticsSkill",
    displayName: "Epic Space Opera & Interstellar Dynastic Geopolitics",
    categoryId: "creative",
    description: "Builds massive sci-fi sagas (Dune / Foundation style): dynastic royal houses, faster-than-light trade monopolies, and planet-spanning cultures.",
    tags: ["creative", "space-opera", "sci-fi", "dune", "worldbuilding"],
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
    semanticType: "creative_framework"
  },
  {
    id: "creative-childrens-picture-book-rhythm-rhyme",
    name: "CreativeChildrensPictureBookRhythmRhymeSkill",
    displayName: "Children's Picture Book Rhythmic Storytelling & Visual Cues",
    categoryId: "creative",
    description: "Crafts playful, read-aloud early childhood picture books featuring onomatopoeia, refrains, and dynamic page-turn anticipation.",
    tags: ["creative", "childrens-books", "picture-book", "storytelling", "rhyme"],
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
    semanticType: "creative_framework"
  },
  {
    id: "creative-flash-fiction-500-words-twist",
    name: "CreativeFlashFiction500WordsTwistSkill",
    displayName: "Micro & Flash Fiction (<500 Words) Punchline Twists",
    categoryId: "creative",
    description: "Distills powerful short narratives under 500 words with immediate character stakes, compressed timeframes, and unforgettable endings.",
    tags: ["creative", "flash-fiction", "micro-story", "writing-craft", "short-story"],
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
    semanticType: "creative_framework"
  },
  {
    id: "creative-gothic-romance-haunted-manor-atmosphere",
    name: "CreativeGothicRomanceHauntedManorAtmosphereSkill",
    displayName: "Gothic Romance & Decaying Haunted Manor Atmosphere",
    categoryId: "creative",
    description: "Constructs atmospheric Victorian gothic fiction: windswept moors, ancestral curses, architectural labyrinths, and brooding aristocrats.",
    tags: ["creative", "gothic", "romance", "horror", "victorian", "atmosphere"],
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
    semanticType: "creative_framework"
  },
  {
    id: "creative-comedic-satire-onion-parody-craft",
    name: "CreativeComedicSatireOnionParodyCraftSkill",
    displayName: "Sharp Satirical News Parody & Irony (The Onion Style)",
    categoryId: "creative",
    description: "Writes razor-sharp journalistic satire using deadpan headlines, absurd premises treated with grave institutional seriousness.",
    tags: ["creative", "satire", "comedy", "parody", "the-onion", "humor"],
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
    semanticType: "creative_framework"
  },
  {
    id: "creative-solarpunk-optimistic-ecological-utopia",
    name: "CreativeSolarpunkOptimisticEcologicalUtopiaSkill",
    displayName: "Solarpunk Optimistic Eco-Utopian Worldbuilding",
    categoryId: "creative",
    description: "Builds hopeful, high-tech sustainable futures: solar stained-glass, urban permaculture towers, community co-ops, and biomimicry.",
    tags: ["creative", "solarpunk", "sci-fi", "sustainability", "utopia", "ecology"],
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
    semanticType: "creative_framework"
  },
  {
    id: "creative-standup-comedy-premise-punchline-callback",
    name: "CreativeStandupComedyPremisePunchlineCallbackSkill",
    displayName: "Stand-Up Comedy Bit Writing & Setup-Punch-Tag Mechanics",
    categoryId: "creative",
    description: "Structures stand-up comedy sets: relatable premises, misdirection punchlines, rapid-fire tags, and closing callbacks.",
    tags: ["creative", "comedy", "standup", "humor", "joke-writing"],
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
    semanticType: "creative_framework"
  },
  {
    id: "creative-interactive-murder-mystery-clue-matrix",
    name: "CreativeInteractiveMurderMysteryClueMatrixSkill",
    displayName: "Agatha Christie Murder Mystery & Whodunit Clue Matrix",
    categoryId: "creative",
    description: "Designs fair-play whodunits: locked-room crime scenes, distinct suspect alibis, hidden physical clues, and clever red herrings.",
    tags: ["creative", "mystery", "whodunit", "agatha-christie", "detective"],
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
    semanticType: "creative_framework"
  }
];

console.log('Appending Creative 14 more skills...');
appendSkills('creative', CREATIVE_20);
console.log('Creative update complete!');
