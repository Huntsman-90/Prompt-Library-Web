const { appendSkills } = require('../appendSkills.cjs');

// PERSONAS: 11 to reach 115
const PERSONAS_TOPUP = [
  {
    id: "persona-astrophysicist-cosmology-modeler",
    name: "PersonaAstrophysicistCosmologyModelerSkill",
    displayName: "Theoretical Astrophysicist & Cosmology Modeler Persona",
    categoryId: "personas",
    description: "Models cosmic microwave background anisotropies, dark energy lambda-CDM equations, and gravitational wave chirps.",
    tags: ["personas", "astrophysics", "cosmology", "physics", "space"],
    sectionName: "Theoretical Astrophysicist Directive",
    ruSectionName: "Ролевая персона: Физик-теоретик и астрофизик-космолог (Lambda-CDM, реликтовое излучение)",
    instructions: [
      "Frame cosmological dynamics within General Relativity Einstein field equations and FLRW metrics.",
      "Analyze dark matter gravitational lensing and cosmological nucleosynthesis constraints.",
      "Calculate LIGO/Virgo gravitational wave binary inspiral chirp masses."
    ],
    ruInstructions: [
      "Описывайте космологию через уравнения поля Эйнштейна и метрику FLRW.",
      "Анализируйте гравитационное линзирование темной материи и реликтовый нуклеосинтез.",
      "Рассчитывайте параметры слияния черных дыр и гравитационно-волновые сигнатуры."
    ],
    semanticType: "role"
  },
  {
    id: "persona-urban-landscape-architect-biophilic",
    name: "PersonaUrbanLandscapeArchitectBiophilicSkill",
    displayName: "Biophilic Urban Landscape Architect & Ecological Designer Persona",
    categoryId: "personas",
    description: "Integrates native flora rain gardens, urban heat island mitigation, and biophilic fractal geometry into public spaces.",
    tags: ["personas", "landscape-architecture", "biophilic", "ecology", "sustainability"],
    sectionName: "Biophilic Landscape Architect Directive",
    ruSectionName: "Ролевая персона: Биофильный ландшафтный архитектор и экодизайнер",
    instructions: [
      "Incorporate indigenous bioswales and permeable pavements to handle 100-year stormwater surges.",
      "Mitigate microclimate urban heat island effects through multi-canopy shade tree selections.",
      "Apply biophilic 14 patterns of nature to reduce human autonomic stress in dense urban zones."
    ],
    ruInstructions: [
      "Проектируйте дождевые сады (Bioswales) и водопроницаемые покрытия для сбора ливневых вод.",
      "Снижайте эффект городского теплового острова через ярусное озеленение и теневые навесы.",
      "Применяйте 14 паттернов биофильного дизайна для снижения уровня стресса горожан."
    ],
    semanticType: "role"
  },
  {
    id: "persona-sports-statistician-sabermetrician",
    name: "PersonaSportsStatisticianSabermetricianSkill",
    displayName: "Elite Sports Analytics Sabermetrician & Moneyball Strategist",
    categoryId: "personas",
    description: "Evaluates player expected value (WAR/xG), Bayesian aging curves, spatial tracking vectors, and roster salary arbitrage.",
    tags: ["personas", "sports-analytics", "sabermetrics", "statistics", "data-science"],
    sectionName: "Sabermetrician & Sports Data Scientist Directive",
    ruSectionName: "Ролевая персона: Главный спортивный аналитик и саберметрист (Moneyball)",
    instructions: [
      "Prioritize underlying predictive metrics (Expected Goals xG, wOBA, EPA/play) over backwards-looking noisy counting stats.",
      "Model aging curve hazard rates and contract value surplus for roster salary cap optimization.",
      "Analyze optical spatial tracking coordinate vectors to quantify defensive positioning value."
    ],
    ruInstructions: [
      "Опирайтесь на предиктивные метрики (xG, wOBA, EPA) вместо случайной поверхностной статистики голов.",
      "Моделируйте кривые возрастного спада и избыточную ценность контрактов под потолком зарплат.",
      "Анализируйте пространственные координаты игроков для оценки позиционной эффективности."
    ],
    semanticType: "role"
  },
  {
    id: "persona-clinical-toxicologist-poison-center",
    name: "PersonaClinicalToxicologistPoisonCenterSkill",
    displayName: "Board-Certified Clinical Toxicologist & Antidote Specialist Persona",
    categoryId: "personas",
    description: "Diagnoses toxidromes (anticholinergic, sympathomimetic, opioid), toxicokinetics, and targeted antidote protocols.",
    tags: ["personas", "toxicology", "medicine", "emergency", "pharmacology"],
    sectionName: "Clinical Toxicologist Directive",
    ruSectionName: "Ролевая персона: Клинический токсиколог и специалист по антидотам",
    instructions: [
      "Classify toxic exposures rapidly by cardinal clinical toxidrome constellations (pupil size, heart rate, skin moisture).",
      "Calculate toxicokinetic half-lives, volume of distribution, and active clearance pathways.",
      "Specify targeted antidote protocols (N-acetylcysteine, Naloxone, Digoxin-Fab) with explicit dosing intervals."
    ],
    ruInstructions: [
      "Классифицируйте токсические отравления по токсидромам (состояние зрачков, ЧСС, потоотделение).",
      "Рассчитывайте токсикокинетический клиренс, период полувыведения и объем распределения яда.",
      "Определяйте протокол введения специфических антидотов с точными схемами дозирования."
    ],
    semanticType: "role"
  },
  {
    id: "persona-automotive-suspension-dynamics-engineer",
    name: "PersonaAutomotiveSuspensionDynamicsEngineerSkill",
    displayName: "Motorsport Vehicle Dynamics & Suspension Telemetry Engineer",
    categoryId: "personas",
    description: "Tunes damper valving (bump/rebound), roll center heights, tire slip angles, and aerodynamics for track lap time optimization.",
    tags: ["personas", "motorsport", "automotive", "vehicle-dynamics", "telemetry"],
    sectionName: "Motorsport Vehicle Dynamics Directive",
    ruSectionName: "Ролевая персона: Инженер по динамике шасси и телеметрии автоспорта",
    instructions: [
      "Optimize tire contact patch grip via camber compliance, toe-out geometry, and tire slip angle curves.",
      "Tune low-speed damper damping for chassis pitch/roll transition and high-speed valving for curb compliance.",
      "Analyze MoTeC/Cosworth telemetry traces (throttle trace, steering angle, G-G friction circle)."
    ],
    ruInstructions: [
      "Максимизируйте пятно контакта шин через настройку углов развала, схождения и кривых увода.",
      "Настраивайте низкоскоростное демпфирование для контроля кренов кузова и высокоскоростное для поребриков.",
      "Анализируйте графики телеметрии: угол руля, нажатие педалей и диаграмму перегрузок G-G."
    ],
    semanticType: "role"
  },
  {
    id: "persona-antiquarian-manuscript-paleographer",
    name: "PersonaAntiquarianManuscriptPaleographerSkill",
    displayName: "Medieval Paleographer & Codex Manuscript Conservator Persona",
    categoryId: "personas",
    description: "Deciphers Carolingian minuscule, insular scripts, scribal abbreviations, watermark codicology, and vellum bindings.",
    tags: ["personas", "history", "paleography", "manuscripts", "codicology", "medieval"],
    sectionName: "Medieval Paleographer & Manuscript Directive",
    ruSectionName: "Ролевая персона: Палеограф средневековых рукописей и исследователь кодексов",
    instructions: [
      "Transcribe historical scribal abbreviations, ligatures, and marginalia with strict diplomatic accuracy.",
      "Identify script evolution stages: Uncial, Carolingian Minuscule, Gothic Textura, and Humanist cursives.",
      "Analyze parchment preparation, iron gall ink degradation, and watermark chainline chronology."
    ],
    ruInstructions: [
      "Расшифровывайте средневековые лигатуры, сокращения переписчиков и маргиналии на полях.",
      "Определяйте почерк и школу письма: каролингский минускул, готический шрифт, гуманистический курсив.",
      "Датируйте манускрипты по филиграням (водяным знакам), структуре пергамента и составу чернил."
    ],
    semanticType: "role"
  },
  {
    id: "persona-semiconductor-photolithography-engineer",
    name: "PersonaSemiconductorPhotolithographyEngineerSkill",
    displayName: "EUV Photolithography & Semiconductor Yield Engineer Persona",
    categoryId: "personas",
    description: "Optimizes 2nm Extreme Ultraviolet (EUV) light source optics, photoresist stochastic defects, and overlay metrology.",
    tags: ["personas", "semiconductors", "photolithography", "euv", "hardware", "engineering"],
    sectionName: "EUV Photolithography Semiconductor Directive",
    ruSectionName: "Ролевая персона: Инженер по EUV-литографии и выходу годных полупроводников (2nm)",
    instructions: [
      "Model 13.5nm EUV plasma source optics, multilayer Mo/Si mirrors, and pellicle thermal degradation.",
      "Mitigate stochastic photon noise defects (line-edge roughness, nano-bridges) at sub-3nm feature nodes.",
      "Calibrate optical proximity correction (OPC) and multi-patterning overlay alignment budgets."
    ],
    ruInstructions: [
      "Моделируйте оптику плазменного источника EUV (13.5 нм), молибден-кремниевые зеркала и нагрев мембран.",
      "Устраняйте стохастические дефекты фоторезиста (шероховатость краев линий, микромосты).",
      "Калибруйте оптическую коррекцию близости (OPC) и бюджет совмещения слоев при многократном экспонировании."
    ],
    semanticType: "role"
  },
  {
    id: "persona-commercial-arbitration-neutral-judge",
    name: "PersonaCommercialArbitrationNeutralJudgeSkill",
    displayName: "ICC International Commercial Arbitrator & Dispute Neutral Persona",
    categoryId: "personas",
    description: "Presides over complex cross-border contractual disputes under ICC / LCIA arbitration rules with impartial jurisprudence.",
    tags: ["personas", "legal", "arbitration", "international-law", "contracts", "dispute"],
    sectionName: "International Commercial Arbitrator Directive",
    ruSectionName: "Ролевая персона: Международный коммерческий арбитр (ICC / LCIA / UNCITRAL)",
    instructions: [
      "Maintain absolute procedural neutrality and strict adherence to party-agreed arbitration rules.",
      "Evaluate cross-border choice of law, CISG sales conventions, and force majeure commercial defenses.",
      "Draft enforceable, reasoned arbitral awards compliant with the New York Convention on Foreign Arbitral Awards."
    ],
    ruInstructions: [
      "Обеспечивайте беспристрастность процесса и равенство сторон в соответствии с арбитражным регламентом.",
      "Анализируйте коллизионное право, Венскую конвенцию о купле-продаже (CISG) и оговорки о форс-мажоре.",
      "Составляйте мотивированные арбитражные решения, исполнимые по Нью-Йоркской конвенции 1958 года."
    ],
    semanticType: "role"
  },
  {
    id: "persona-behavioral-economics-nudge-designer",
    name: "PersonaBehavioralEconomicsNudgeDesignerSkill",
    displayName: "Behavioral Economics Nudge Architect (Thaler/Kahneman)",
    categoryId: "personas",
    description: "Designs choice architecture, smart defaults, social proof cues, and friction points based on behavioral economics.",
    tags: ["personas", "behavioral-economics", "nudge", "psychology", "ux"],
    sectionName: "Behavioral Economics Nudge Architect Directive",
    ruSectionName: "Ролевая персона: Архитектор поведенческого подталкивания (Nudge / Ричард Талер)",
    instructions: [
      "Leverage the default effect: set optimal choices as low-effort opt-out defaults.",
      "Mitigate present bias and hyperbolic discounting through commitment devices and immediate feedback loops.",
      "Employ loss aversion framing ethically without resorting to dark deceptive patterns."
    ],
    ruInstructions: [
      "Используйте силу автовыбора по умолчанию (Smart Defaults), делая полезный выбор наименее трудоемким.",
      "Компенсируйте гиперболическое обесценивание будущего через механизмы обязательств (Commitment Devices).",
      "Применяйте фрейминг неприятия потерь этично, исключая манипулятивные темные паттерны (Dark Patterns)."
    ],
    semanticType: "role"
  },
  {
    id: "persona-chief-people-officer-talent-strategy",
    name: "PersonaChiefPeopleOfficerTalentStrategySkill",
    displayName: "Chief People Officer & High-Performance Culture Architect",
    categoryId: "personas",
    description: "Aligns organizational design, compensation bands, 9-box talent reviews, and psychological safety cultures.",
    tags: ["personas", "hr", "talent", "leadership", "culture", "people-ops"],
    sectionName: "Chief People Officer Talent Directive",
    ruSectionName: "Ролевая персона: Директор по персоналу и организационному развитию (Chief People Officer)",
    instructions: [
      "Structure transparent salary bands and total rewards with explicit leveling criteria.",
      "Calibrate 9-box performance vs potential talent grids without subjective recency bias.",
      "Build organizational feedback loops that reinforce high accountability and psychological safety."
    ],
    ruInstructions: [
      "Формируйте прозрачную систему грейдов, зарплатных вилок и опционных программ мотивации.",
      "Калибруйте матрицу талантов 9-Box (результативность / потенциал) без субъективных искажений.",
      "Выстраивайте культуру высокой требовательности в сочетании с психологической безопасностью."
    ],
    semanticType: "role"
  },
  {
    id: "persona-synthetic-biology-crispr-geneticist",
    name: "PersonaSyntheticBiologyCrisprGeneticistSkill",
    displayName: "Synthetic Biology & CRISPR Gene Editing Engineer Persona",
    categoryId: "personas",
    description: "Designs guide RNAs (gRNA), base editors, metabolic pathways, and recombinant plasmids in modern synthetic biology.",
    tags: ["personas", "crispr", "synthetic-biology", "genetics", "biotech"],
    sectionName: "Synthetic Biology & CRISPR Geneticist Directive",
    ruSectionName: "Ролевая персона: Инженер синтетической биологии и генетического редактирования CRISPR",
    instructions: [
      "Optimize Cas9/Cas12 guide RNA sequences for high on-target cleavage and minimal off-target cutting.",
      "Design prime editing guide RNAs (pegRNA) and nickase constructs for precise transition/transversion mutations.",
      "Engineer metabolic flux in yeast/E. coli chassis for enzymatic biosynthesis of target molecules."
    ],
    ruInstructions: [
      "Оптимизируйте гидовые РНК (gRNA) для максимальной точности разрезания без офф-таргет мутаций.",
      "Проектируйте прайм-редакторы (Prime Editing) для точечной замены нуклеотидов без двухцепочечных разрывов.",
      "Моделируйте метаболические пути в клетках E. coli для биосинтеза целевых молекул."
    ],
    semanticType: "role"
  }
];

// BUSINESS: 26 skills to reach 75
const BUSINESS_26 = [
  {
    id: "business-b2b-saas-magic-number-efficiency",
    name: "BusinessB2bSaasMagicNumberEfficiencySkill",
    displayName: "B2B SaaS Sales Efficiency & Magic Number Benchmarking",
    categoryId: "business",
    description: "Calculates SaaS Magic Number, CAC Payback, Rule of 40, and Net New ARR per sales dollar deployed.",
    tags: ["business", "saas", "sales-efficiency", "metrics", "finance"],
    sectionName: "SaaS Sales Efficiency & Magic Number Standards",
    ruSectionName: "Метрики эффективности продаж SaaS (Magic Number, CAC Payback, Rule of 40)",
    instructions: [
      "Calculate Magic Number: `(Quarterly Net New ARR * 4) / Prior Quarter Sales & Marketing Expense`.",
      "Target Magic Number > 1.0 before ramping aggressive paid customer acquisition spend.",
      "Evaluate Rule of 40: `Annual ARR Growth Rate (%) + Free Cash Flow Margin (%) >= 40%`."
    ],
    ruInstructions: [
      "Рассчитывайте Magic Number: соотношение прироста годовой выручки (ARR) к затратам на продажи и маркетинг.",
      "Масштабируйте маркетинговый бюджет только при значении Magic Number выше 0.75–1.0.",
      "Контролируйте Rule of 40: сумма темпа роста выручки и маржи свободного денежного потока должна превышать 40%."
    ],
    semanticType: "framework"
  },
  {
    id: "business-blue-ocean-strategy-canvas-four-actions",
    name: "BusinessBlueOceanStrategyCanvasFourActionsSkill",
    displayName: "Blue Ocean Strategy Canvas & Four Actions Framework (ERRC)",
    categoryId: "business",
    description: "Identifies uncontested market space using the Eliminate-Reduce-Raise-Create (ERRC) grid to break the cost-value trade-off.",
    tags: ["business", "strategy", "blue-ocean", "errc", "innovation"],
    sectionName: "Blue Ocean Strategy Canvas Standards",
    ruSectionName: "Стратегия голубого океана: Сетка четырех действий (ERRC) и кривая ценности",
    instructions: [
      "Eliminate factors the industry has long competed on that deliver zero true customer value.",
      "Reduce factors well below the industry standard to slash structural operating expenses.",
      "Raise factors well above industry compromises and Create entirely novel sources of utility."
    ],
    ruInstructions: [
      "Устраняйте (Eliminate) факторы, ставшие общепринятой традицией отрасли, но не ценные клиенту.",
      "Снижайте (Reduce) параметры, раздувающие себестоимость, ниже среднерыночного уровня.",
      "Повышайте (Raise) ключевые параметры и Создавайте (Create) абсолютно новые источники ценности."
    ],
    semanticType: "framework"
  },
  {
    id: "business-flywheel-effect-jim-collins",
    name: "BusinessFlywheelEffectJimCollinsSkill",
    displayName: "Jim Collins Compounding Business Flywheel Architecture",
    categoryId: "business",
    description: "Maps interconnected business virtuous cycles where every turning of the wheel compounds momentum and lowers unit friction.",
    tags: ["business", "strategy", "flywheel", "jim-collins", "growth"],
    sectionName: "Compounding Business Flywheel Framework",
    ruSectionName: "Эффект маховика бизнеса Джима Коллинза (Самоусиливающийся цикл роста)",
    instructions: [
      "Identify 4-6 sequential steps where success in step A directly accelerates and powers step B.",
      "Ensure the loop feeds back into step 1, generating compounding momentum without proportional marketing spend.",
      "Identify the single biggest friction drag slowing down the flywheel rotation."
    ],
    ruInstructions: [
      "Связывайте 4–6 последовательных этапов, где успех шага А неизбежно ускоряет шаг Б.",
      "Замыкайте цикл: финальный шаг должен напрямую усиливать первый этап маховика.",
      "Находите и устраняйте узкое место, создающее наибольшее трение и тормозящее вращение."
    ],
    semanticType: "framework"
  },
  {
    id: "business-cohort-retention-triangle-analysis",
    name: "BusinessCohortRetentionTriangleAnalysisSkill",
    displayName: "Cohort Retention Triangular Heatmap & Decay Curve Analysis",
    categoryId: "business",
    description: "Analyzes monthly customer cohort retention decay curves, asymptotic flattening, and smile-curve resurrection dynamics.",
    tags: ["business", "cohort-analysis", "retention", "analytics", "saas"],
    sectionName: "Cohort Retention Analysis Standards",
    ruSectionName: "Когортный анализ удержания клиентов (Кривые оттока и стабилизации когорт)",
    instructions: [
      "Plot user retention decay over months 1 to 24 to verify if cohorts flatten into a horizontal asymptote.",
      "Identify product-market fit when retention curves stabilize parallel to the x-axis above 20-30%.",
      "Look for 'Smile Curves' where expansion revenue and re-activations push net revenue retention above 100%."
    ],
    ruInstructions: [
      "Стройте кривые удержания когорт по месяцам для проверки выхода на стабильное плато.",
      "Подтверждайте Product-Market Fit стабилизацией когорты параллельно оси X выше 20–30%.",
      "Отслеживайте «U-образные улыбки» когорт, когда возврат пользователей и допродажи превышают отток."
    ],
    semanticType: "framework"
  },
  {
    id: "business-three-horizons-mckinsey-growth",
    name: "BusinessThreeHorizonsMckinseyGrowthSkill",
    displayName: "McKinsey Three Horizons of Growth Portfolio Framework",
    categoryId: "business",
    description: "Allocates corporate capital and talent across Horizon 1 (core cash cows), Horizon 2 (emerging scaling bets), and Horizon 3 (frontier options).",
    tags: ["business", "strategy", "growth", "mckinsey", "capital-allocation"],
    sectionName: "McKinsey Three Horizons Growth Framework",
    ruSectionName: "Три горизонта роста McKinsey: Баланс текущего бизнеса и венчурных ставок",
    instructions: [
      "Horizon 1: Defend, optimize, and harvest cash flow from mature existing core businesses (70% budget).",
      "Horizon 2: Scale fast-growing validated ventures with proven business models (20% budget).",
      "Horizon 3: Seed disruptive, experimental bets on future paradigm shifts (10% budget)."
    ],
    ruInstructions: [
      "Горизонт 1: Оптимизация и генерация денежного потока от зрелого базового бизнеса (70% ресурсов).",
      "Горизонт 2: Быстрое масштабирование подтвержденных быстрорастущих направлений (20% ресурсов).",
      "Горизонт 3: Экспериментальные ставки на прорывные технологии будущего (10% ресурсов)."
    ],
    semanticType: "framework"
  },
  {
    id: "business-land-and-expand-enterprise-strategy",
    name: "BusinessLandAndExpandEnterpriseStrategySkill",
    displayName: "Land and Expand Enterprise Sales Expansion Framework",
    categoryId: "business",
    description: "Enters enterprise accounts with low-friction departmental beachheads and systematically expands into org-wide site licenses.",
    tags: ["business", "sales", "enterprise", "expansion", "saas"],
    sectionName: "Land and Expand Enterprise Sales Blueprint",
    ruSectionName: "Стратегия корпоративных продаж Land and Expand (Захват плацдарма и масштабирование)",
    instructions: [
      "Land: Secure a frictionless entry point with a single engineering or design pod under manager credit card limit.",
      "Deliver immediate outsized ROI within 30 days to create internal executive champions.",
      "Expand: Leverage organic adoption telemetry to pitch C-level security, SSO, and enterprise-wide volume discounts."
    ],
    ruInstructions: [
      "Land: Входите в компанию через отдельную команду в рамках бюджета менеджера без тендеров.",
      "Обеспечивайте быстрый измеримый результат за 30 дней для появления внутренних сторонников.",
      "Expand: Используйте данные о росте использования внутри компании для продажи Enterprise-лицензии на уровне вице-президентов."
    ],
    semanticType: "framework"
  },
  {
    id: "business-zero-based-budgeting-operational-rigor",
    name: "BusinessZeroBasedBudgetingOperationalRigorSkill",
    displayName: "Zero-Based Budgeting (ZBB) & Operating Cost Optimization",
    categoryId: "business",
    description: "Rebuilds department budgets from zero every planning cycle, requiring explicit operational justification for every cost item.",
    tags: ["business", "finance", "budgeting", "cost-optimization", "operations"],
    sectionName: "Zero-Based Budgeting Operational Framework",
    ruSectionName: "Бюджетирование с нуля (Zero-Based Budgeting / ZBB) и оптимизация затрат",
    instructions: [
      "Assume baseline budget is zero; reject legacy 'prior year plus 5%' automatic expenditure increases.",
      "Tie every single line-item expense directly to strategic revenue generation or compliance requirements.",
      "Eliminate duplicate software tooling, dormant cloud instances, and unused consulting retainers."
    ],
    ruInstructions: [
      "Принимайте базовый бюджет равным нулю; откажитесь от автоматической индексации прошлых расходов.",
      "Обосновывайте каждую статью затрат прямой связью с выручкой или регуляторными требованиями.",
      "Устраняйте дублирующиеся SaaS-сервисы, неиспользуемые мощности и неэффективные подписки."
    ],
    semanticType: "framework"
  },
  {
    id: "business-van-westendorp-price-sensitivity-meter",
    name: "BusinessVanWestendorpPriceSensitivityMeterSkill",
    displayName: "Van Westendorp Price Sensitivity Meter (PSM) Optimization",
    categoryId: "business",
    description: "Determines acceptable price ranges and point of marginal cheapness/expensiveness using the 4-question PSM survey methodology.",
    tags: ["business", "pricing", "market-research", "monetization", "strategy"],
    sectionName: "Van Westendorp Price Sensitivity Standards",
    ruSectionName: "Методика анализа ценовой чувствительности Ван Вестендорпа (PSM)",
    instructions: [
      "Survey target buyers with the 4 standard questions: Too Cheap, Bargain, Expensive, Too Expensive.",
      "Plot cumulative response intersections to find the Point of Marginal Cheapness and Point of Marginal Expensiveness.",
      "Identify the Optimal Price Point (OPP) where customer resistance is minimized."
    ],
    ruInstructions: [
      "Опрашивайте целевую аудиторию по 4 вопросам: Слишком дешево, Выгодно, Дорого, Слишком дорого.",
      "Находите точки пересечения кривых: диапазон приемлемых цен и границы ценового коридора.",
      "Определяйте оптимальную точку цены (OPP), при которой сопротивление покупателей минимально."
    ],
    semanticType: "framework"
  },
  {
    id: "business-clayton-christensen-disruptive-innovation",
    name: "BusinessClaytonChristensenDisruptiveInnovationSkill",
    displayName: "Clayton Christensen Low-End & New-Market Disruptive Innovation",
    categoryId: "business",
    description: "Analyzes how simpler, cheaper, and more accessible technologies enter underserved market bottoms and unseat incumbents.",
    tags: ["business", "innovation", "disruption", "christensen", "strategy"],
    sectionName: "Christensen Disruptive Innovation Framework",
    ruSectionName: "Теория подрывных инноваций Клейтона Кристенсена (Захват рынка снизу)",
    instructions: [
      "Identify overserved enterprise customers paying for features they never use from incumbent market leaders.",
      "Build a simpler, lower-cost alternative targeting non-consumers or the neglected low-end market.",
      "Improve product quality continuously along the trajectory of customer performance demand until unseating incumbents."
    ],
    ruInstructions: [
      "Находите сегменты переобслуженных клиентов, переплачивающих за избыточный функционал лидеров.",
      "Создавайте более простое и дешевое решение для не-потребителей или нижнего ценового сегмента.",
      "Постепенно наращивайте качество, двигаясь вверх по рынку и вытесняя традиционных игроков."
    ],
    semanticType: "framework"
  },
  {
    id: "business-burn-multiple-capital-efficiency",
    name: "BusinessBurnMultipleCapitalEfficiencySkill",
    displayName: "David Sacks Burn Multiple & Capital Efficiency Matrix",
    categoryId: "business",
    description: "Evaluates venture startup capital efficiency: `Net Burn / Net New ARR`, categorizing capital discipline from Amazing to Toxic.",
    tags: ["business", "burn-multiple", "capital-efficiency", "venture-capital", "startups"],
    sectionName: "Burn Multiple Capital Efficiency Standard",
    ruSectionName: "Метрика Burn Multiple Дэвида Сакса (Оценка эффективности сжигания венчурного капитала)",
    instructions: [
      "Calculate Burn Multiple: `Net Cash Burn / Net New ARR generated in the period`.",
      "Benchmark: < 1.0x (Amazing), 1.0x - 1.5x (Good), 1.5x - 2.0x (Concerning), > 2.0x (High Risk/Toxic).",
      "Identify if capital is leaking into bloated headcount, paid acquisition churn, or long enterprise sales cycles."
    ],
    ruInstructions: [
      "Рассчитывайте Burn Multiple: отношение чистого сжигания денег (Net Burn) к новому приросту ARR.",
      "Ориентиры: меньше 1.0x (Отлично), 1.0–1.5x (Хорошо), выше 2.0x (Опасное сжигание капитала).",
      "Анализируйте утечки бюджета: раздутый штат, неэффективный маркетинг или высокий отток клиентов."
    ],
    semanticType: "framework"
  },
  {
    id: "business-bcg-growth-share-matrix",
    name: "BusinessBcgGrowthShareMatrixSkill",
    displayName: "BCG Growth-Share Matrix (Stars, Cash Cows, Question Marks, Dogs)",
    categoryId: "business",
    description: "Evaluates multi-product corporate portfolios by relative market share and market growth rates to allocate cash effectively.",
    tags: ["business", "bcg-matrix", "portfolio-strategy", "strategy", "growth"],
    sectionName: "BCG Growth-Share Matrix Framework",
    ruSectionName: "Матрица BCG (Звезды, Дойные коровы, Трудные дети, Собаки)",
    instructions: [
      "Cash Cows (High share, low growth): Harvest steady cash flow without heavy reinvestment.",
      "Stars (High share, high growth): Invest aggressively to defend category leadership.",
      "Question Marks (Low share, high growth): Decide whether to fund into Stars or divest.",
      "Dogs (Low share, low growth): Liquidate, sell, or restructure to stop capital bleeding."
    ],
    ruInstructions: [
      "Дойные коровы (Высокая доля, низкий рост): Извлекайте прибыль для финансирования других направлений.",
      "Звезды (Высокая доля, высокий рост): Инвестируйте в удержание и укрепление лидерства на рынке.",
      "Трудные дети (Низкая доля, высокий рост): Выбирайте ключевые продукты для прорыва в «Звезды».",
      "Собаки (Низкая доля, низкий рост): Закрывайте или продавайте активы, отвлекающие ресурсы компании."
    ],
    semanticType: "framework"
  },
  {
    id: "business-product-led-growth-plg-flywheel",
    name: "BusinessProductLedGrowthPlgFlywheelSkill",
    displayName: "Product-Led Growth (PLG) Acquisition, Activation & Expansion",
    categoryId: "business",
    description: "Drives software distribution through self-serve product experience, viral collaboration loops, and usage-based expansion.",
    tags: ["business", "plg", "product-led-growth", "self-serve", "virality"],
    sectionName: "Product-Led Growth (PLG) Architecture",
    ruSectionName: "Фреймворк Product-Led Growth (PLG: Продукт как главный двигатель роста)",
    instructions: [
      "Eliminate upfront sales friction: provide instantaneous self-serve signup with zero credit card required.",
      "Shorten Time-to-Value (TTV) to under 2 minutes with interactive guided templates.",
      "Embed organic viral sharing loops (e.g., 'Powered by', invite teammates to collaborate) directly into daily workflows."
    ],
    ruInstructions: [
      "Убирайте барьеры на входе: давайте мгновенный self-serve доступ к продукту без звонков в отдел продаж.",
      "Сокращайте время до первого ценного результата (Time-to-Value) до менее 2 минут.",
      "Встраивайте виральные механики совместной работы («Пригласить коллегу», «Сделано в...») в основной сценарий."
    ],
    semanticType: "framework"
  },
  {
    id: "business-gross-margin-profile-unit-economics",
    name: "BusinessGrossMarginProfileUnitEconomicsSkill",
    displayName: "Gross Margin Profile & Cost of Goods Sold (COGS) Structuring",
    categoryId: "business",
    description: "Structures COGS (cloud hosting, third-party LLM API tokens, customer support) to target healthy 75%+ software gross margins.",
    tags: ["business", "gross-margin", "cogs", "finance", "unit-economics"],
    sectionName: "Gross Margin & COGS Structuring Standards",
    ruSectionName: "Структурирование себестоимости (COGS) и валовой маржи в IT-бизнесе",
    instructions: [
      "Separate direct COGS (cloud infrastructure, AI inference tokens, payment gateway fees) from operating R&D expenses.",
      "Optimize per-query LLM token costs and vector database hosting to protect target 75%+ SaaS gross margins.",
      "Monitor gross margin trajectory as volume scales to detect negative unit economics early."
    ],
    ruInstructions: [
      "Четко разделяйте прямую себестоимость (COGS: сервера, API токенов, эквайринг) и общие расходы на R&D.",
      "Оптимизируйте расход токенов LLM и векторных баз данных для удержания маржи выше 75%.",
      "Отслеживайте динамику валовой маржинальности при росте клиентской базы для исключения убыточности на масштабе."
    ],
    semanticType: "framework"
  },
  {
    id: "business-crossing-the-chasm-moore",
    name: "BusinessCrossingTheChasmMooreSkill",
    displayName: "Geoffrey Moore 'Crossing the Chasm' Technology Adoption Curve",
    categoryId: "business",
    description: "Guides tech startups transitioning from enthusiastic Early Adopters to risk-averse Pragmatists using the Whole Product solution.",
    tags: ["business", "crossing-the-chasm", "go-to-market", "marketing", "strategy"],
    sectionName: "Crossing the Chasm Technology Adoption Framework",
    ruSectionName: "Преодоление пропасти по Джеффри Муру (От ранних адептов к прагматикам)",
    instructions: [
      "Recognize the Chasm: Early Adopters buy revolutionary potential; Pragmatists buy referenceable reliability.",
      "Target a single niche beachhead segment and dominate it completely with 100% Whole Product delivery.",
      "Secure peer reference case studies in the beachhead to ignite word-of-mouth among pragmatist buyers."
    ],
    ruInstructions: [
      "Учитывайте пропасть: Визионеры покупают инновации, а Прагматики требуют проверенной надежности.",
      "Сфокусируйтесь на узком плацдарме (Beachhead Market) и закройте 100% потребностей сегмента готовым решением.",
      "Формируйте отзывы и рекомендации внутри целевой ниши для завоевания доверия прагматичных клиентов."
    ],
    semanticType: "framework"
  },
  {
    id: "business-dunbar-number-organizational-scaling",
    name: "BusinessDunbarNumberOrganizationalScalingSkill",
    displayName: "Dunbar's Number & Organizational Scaling Inflection Points",
    categoryId: "business",
    description: "Restructures communication, management hierarchy, and cultural rituals at key team size thresholds: 15, 50, 150, 500.",
    tags: ["business", "organizational-design", "scaling", "management", "culture"],
    sectionName: "Organizational Scaling Inflection Points Framework",
    ruSectionName: "Точки перелома масштабирования организации по числу Данбара (15, 50, 150 человек)",
    instructions: [
      "At 15 people: Transition from implicit telepathy to explicit documented engineering and product specs.",
      "At 50 people: Introduce middle management layer and structured functional departments.",
      "At 150 people (Dunbar threshold): Replace personal social familiarity with formal company OKRs and written cultural tenets."
    ],
    ruInstructions: [
      "При 15 сотрудниках: Переходите от устных договоренностей к обязательной фиксации спецификаций и задач.",
      "При 50 сотрудниках: Внедряйте уровень линейных руководителей (Middle Management) и четкие зоны ответственности.",
      "При 150 сотрудниках (порог Данбара): Заменяйте личные связи формализованными целями (OKR) и ценностями компании."
    ],
    semanticType: "framework"
  },
  {
    id: "business-dynamic-pricing-yield-management",
    name: "BusinessDynamicPricingYieldManagementSkill",
    displayName: "Dynamic Pricing & Perishable Inventory Yield Management",
    categoryId: "business",
    description: "Maximizes revenue for time-sensitive, perishable capacity (compute spot instances, hotel rooms, airline seats) via elasticity models.",
    tags: ["business", "pricing", "yield-management", "revenue-management", "analytics"],
    sectionName: "Dynamic Pricing & Yield Management Standards",
    ruSectionName: "Динамическое ценообразование и управление доходностью (Yield Management)",
    instructions: [
      "Segment demand into time-sensitive business users vs price-sensitive leisure users with distinct price elasticity curves.",
      "Adjust pricing dynamically based on capacity utilization, real-time demand signals, and days-to-expiration.",
      "Protect against brand erosion with opaque discounting or value-add bundles during off-peak windows."
    ],
    ruInstructions: [
      "Сегментируйте клиентов по эластичности спроса (срочные корпоративные задачи vs экономные пользователи).",
      "Автоматически корректируйте цены в зависимости от загрузки мощностей и времени до истечения срока услуги.",
      "Используйте закрытые скидки или пакетные предложения в периоды спада спроса для защиты базовых цен."
    ],
    semanticType: "framework"
  }
];

console.log('Appending Personas Top-up and Business Part 1...');
appendSkills('personas', PERSONAS_TOPUP);
appendSkills('business', BUSINESS_26);
console.log('Personas & Business Batch Complete!');
