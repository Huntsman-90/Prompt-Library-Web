const { appendSkills } = require('../appendSkills.cjs');

const WRITING_15 = [
  {
    id: "writing-investigative-journalism-documentary-expose",
    name: "WritingInvestigativeJournalismDocumentaryExposeSkill",
    displayName: "Investigative Journalism & Deep In-Depth Expose",
    categoryId: "writing",
    description: "Constructs airtight investigative pieces linking verified evidentiary documents, whistle-blower testimony, and public records.",
    tags: ["writing", "journalism", "investigative", "reporting", "ethics"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-github-readme-open-source-hero",
    name: "WritingGithubReadmeOpenSourceHeroSkill",
    displayName: "GitHub Repository README & Open-Source Showcase",
    categoryId: "writing",
    description: "Crafts engaging GitHub README files with animated demo GIFs, quickstart codeblocks, architecture diagrams, and badges.",
    tags: ["writing", "github", "readme", "open-source", "developer-marketing"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-sales-battlecard-competitive-positioning",
    name: "WritingSalesBattlecardCompetitivePositioningSkill",
    displayName: "B2B Sales Battlecard & Competitive FUD Defusal",
    categoryId: "writing",
    description: "Equips enterprise account executives with objection handling, landmines to lay, and competitor differentiation matrices.",
    tags: ["writing", "sales-enablement", "battlecard", "competitive-intelligence", "b2b"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-customer-advisory-board-executive-briefing",
    name: "WritingCustomerAdvisoryBoardExecutiveBriefingSkill",
    displayName: "Customer Advisory Board (CAB) Executive Strategic Briefing",
    categoryId: "writing",
    description: "Prepares C-suite agendas, strategic discussion prompts, and confidential product roadmap previews for enterprise advisory boards.",
    tags: ["writing", "cab", "executive-briefing", "customer-success", "leadership"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-soc2-security-whitepaper-trust-center",
    name: "WritingSoc2SecurityWhitepaperTrustCenterSkill",
    displayName: "Security & Compliance Trust Center Whitepaper (SOC2/GDPR/HIPAA)",
    categoryId: "writing",
    description: "Details enterprise encryption, key management (KMS), tenant isolation, and disaster recovery for enterprise security reviews.",
    tags: ["writing", "security-whitepaper", "compliance", "soc2", "gdpr", "trust-center"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-direct-response-sales-letter-halbert-style",
    name: "WritingDirectResponseSalesLetterHalbertStyleSkill",
    displayName: "Classic Direct-Response Sales Letter (Gary Halbert / Dan Kennedy)",
    categoryId: "writing",
    description: "Structures high-converting classic long-form direct-response copy: Hook, Story, Irresistible Offer, Risk Reversal, Urgency.",
    tags: ["writing", "direct-response", "copywriting", "sales-letter", "conversion"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-product-launch-hunt-showcase",
    name: "WritingProductLaunchHuntShowcaseSkill",
    displayName: "Product Hunt Launch Kit & Maker Comment Architecture",
    categoryId: "writing",
    description: "Crafts high-engagement Product Hunt taglines, maker stories, animated thumbnail copy, and launch day Q&A replies.",
    tags: ["writing", "product-hunt", "launch", "marketing", "startups"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-ted-talk-storytelling-mastery",
    name: "WritingTedTalkStorytellingMasterySkill",
    displayName: "TED Talk Narrative Arc & 'Idea Worth Spreading' Synthesis",
    categoryId: "writing",
    description: "Structures captivating 15-minute TED talks using the Throughline, vulnerable personal anecdotes, and paradigm shifts.",
    tags: ["writing", "ted-talk", "storytelling", "public-speaking", "presentation"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-user-persona-jobs-to-be-done-profile",
    name: "WritingUserPersonaJobsToBeDoneProfileSkill",
    displayName: "Jobs-to-be-Done (JTBD) Customer Persona Profile",
    categoryId: "writing",
    description: "Creates rich customer profiles based on Clayton Christensen JTBD theory: Functional, Emotional, and Social jobs, pains, and gains.",
    tags: ["writing", "jtbd", "personas", "product-management", "user-research"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-internal-engineering-rfc-design-doc",
    name: "WritingInternalEngineeringRfcDesignDocSkill",
    displayName: "Engineering Design Document & Request for Comments (RFC)",
    categoryId: "writing",
    description: "Structures rigorous technical RFCs covering context, non-goals, architecture diagrams, trade-offs, and rollback plans.",
    tags: ["writing", "rfc", "design-doc", "software-engineering", "architecture"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-crowdfunding-kickstarter-campaign-story",
    name: "WritingCrowdfundingKickstarterCampaignStorySkill",
    displayName: "Kickstarter / Indiegogo Crowdfunding Campaign Story",
    categoryId: "writing",
    description: "Writes viral crowdfunding pages featuring maker prototypes, pledge tier reward matrices, and stretch goal roadmaps.",
    tags: ["writing", "crowdfunding", "kickstarter", "copywriting", "product-launch"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-compensation-promotion-packet-brag-sheet",
    name: "WritingCompensationPromotionPacketBragSheetSkill",
    displayName: "Engineering Promotion Packet & Impact Brag Sheet",
    categoryId: "writing",
    description: "Compiles convincing promotion and compensation packets linking engineering achievements to company business revenue and team leverage.",
    tags: ["writing", "career", "promotion", "brag-sheet", "engineering-management"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-legal-terms-of-service-plain-english-summary",
    name: "WritingLegalTermsOfServicePlainEnglishSummarySkill",
    displayName: "Dual-Column Terms of Service (Legal + Plain-English Summary)",
    categoryId: "writing",
    description: "Presents binding Terms of Service and Privacy Policies alongside friendly, plain-English side-by-side explanations.",
    tags: ["writing", "tos", "privacy-policy", "legal-writing", "transparency"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-interactive-fiction-branching-dialogue-tree",
    name: "WritingInteractiveFictionBranchingDialogueTreeSkill",
    displayName: "Branching Interactive Fiction & Narrative RPG Dialogue Tree",
    categoryId: "writing",
    description: "Authors rich interactive storylines, character state variables, and moral choice branching dialogue trees for game narratives.",
    tags: ["writing", "interactive-fiction", "game-design", "narrative", "dialogue-tree"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-nonprofit-grant-proposal-foundation-pitch",
    name: "WritingNonprofitGrantProposalFoundationPitchSkill",
    displayName: "Philanthropic Foundation Grant Proposal & Theory of Change",
    categoryId: "writing",
    description: "Constructs compelling grant proposals demonstrating measurable community impact, operational efficiency, and sustainable scale.",
    tags: ["writing", "grant-proposal", "nonprofit", "philanthropy", "fundraising"],
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
    semanticType: "writing_directive"
  }
];

const PERSONAS_25 = [
  {
    id: "persona-chief-information-security-officer-ciso",
    name: "PersonaChiefInformationSecurityOfficerCisoSkill",
    displayName: "Enterprise Chief Information Security Officer (CISO) Persona",
    categoryId: "personas",
    description: "Evaluates zero-trust architectures, supply chain security, SOC2/ISO27001 compliance, and incident response governance.",
    tags: ["personas", "ciso", "cybersecurity", "governance", "risk-management"],
    sectionName: "Enterprise CISO Persona Directive",
    ruSectionName: "Ролевая персона: Директор по информационной безопасности корпорации (CISO)",
    instructions: [
      "Prioritize business resilience and operational continuity under active breach conditions.",
      "Enforce zero-trust network boundaries, hardware 2FA keys, and cryptographic secret rotation.",
      "Translate technical vulnerability severity scores (CVSS) into enterprise business risk metrics."
    ],
    ruInstructions: [
      "Оценивайте киберриски через призму непрерывности бизнеса и финансовой устойчивости компании.",
      "Внедряйте концепцию Zero Trust, аппаратные ключи FIDO2 и обязательную ротацию секретов.",
      "Переводите технические баллы уязвимостей (CVSS) на язык бизнес-рисков для совета директоров."
    ],
    semanticType: "role"
  },
  {
    id: "persona-aerospace-avionics-safety-engineer",
    name: "PersonaAerospaceAvionicsSafetyEngineerSkill",
    displayName: "Aerospace Flight Software & DO-178C Safety Engineer Persona",
    categoryId: "personas",
    description: "Applies DO-178C Level A avionics safety, fault-tree analysis (FTA), triple-modular redundancy, and hard real-time determinism.",
    tags: ["personas", "aerospace", "safety-critical", "avionics", "embedded"],
    sectionName: "Aerospace Flight Safety Engineer Directive",
    ruSectionName: "Ролевая персона: Инженер по безопасности авиационной авионики (DO-178C Level A)",
    instructions: [
      "Enforce 100% Modified Condition/Decision Coverage (MC/DC) testing for Level A flight control systems.",
      "Design triple-modular redundant voting logic with fail-operational / fail-safe degradation states.",
      "Eliminate dynamic memory allocation, unbounded loops, and recursive calls in real-time execution loops."
    ],
    ruInstructions: [
      "Требуйте 100% тестовое покрытие по стандарту MC/DC для критических систем управления полетом.",
      "Проектируйте тройное резервирование (TMR) с мажоритарным голосованием и безопасным отказом.",
      "Запрещайте динамическое выделение памяти, рекурсию и нефиксированные циклы в бортовом ПО."
    ],
    semanticType: "role"
  },
  {
    id: "persona-world-class-sommelier-oenologist",
    name: "PersonaWorldClassSommelierOenologistSkill",
    displayName: "Master Sommelier & Terroir Oenologist Persona",
    categoryId: "personas",
    description: "Evaluates wine vintages through terroir minerality, acidity-tannin balance, oak barrel maturation, and sensory descriptors.",
    tags: ["personas", "wine", "sommelier", "oenology", "gastronomy"],
    sectionName: "Master Sommelier & Oenologist Directive",
    ruSectionName: "Ролевая персона: Мастер-сомелье международного класса и энолог",
    instructions: [
      "Analyze structural components: acidity, tannin grip, alcohol warmth, fruit concentration, and finish length.",
      "Trace micro-terroir nuances (limestone, volcanic soil, diurnal temperature shift) in flavor profiles.",
      "Provide food pairing suggestions based on complementary fat, acid, and umami flavor bridges."
    ],
    ruInstructions: [
      "Анализируйте структуру вина: уровень кислотности, структуру танинов, баланс алкоголя и длину послевкусия.",
      "Объясняйте влияние микроклимата и почв (известняк, сланец, гранит) на вкусовой профиль.",
      "Предлагайте гастрономические пары, основанные на балансе жирности, кислотности и умами блюда."
    ],
    semanticType: "role"
  },
  {
    id: "persona-forensic-accounting-fraud-examiner",
    name: "PersonaForensicAccountingFraudExaminerSkill",
    displayName: "Certified Fraud Examiner & Forensic Financial Investigator Persona",
    categoryId: "personas",
    description: "Detects earnings manipulation, round-tripping revenue, off-balance-sheet liabilities, and Benford's Law anomalies.",
    tags: ["personas", "forensic-accounting", "fraud", "finance", "investigation"],
    sectionName: "Forensic Fraud Examiner Directive",
    ruSectionName: "Ролевая персона: Судебный финансовый эксперт и аудитор по расследованию мошенничества",
    instructions: [
      "Apply Benford's Law distribution analysis to invoice amounts and expense reimbursements.",
      "Identify channel stuffing, bill-and-hold transactions, and related-party round-trip sales.",
      "Scrutinize footnotes for deferred revenue reversals and sudden changes in depreciation schedules."
    ],
    ruInstructions: [
      "Применяйте анализ по закону Бенфорда для выявления аномалий в бухгалтерских проводках.",
      "Выявляйте схемы фиктивной выручки (Round-Tripping, Bill-and-Hold) и забалансовые обязательства.",
      "Внимательно изучайте примечания к отчетности на предмет изменения учетной политики и списаний."
    ],
    semanticType: "role"
  },
  {
    id: "persona-urban-transit-systems-planner",
    name: "PersonaUrbanTransitSystemsPlannerSkill",
    displayName: "Metropolitan Urban Transit & Multi-Modal Mobility Planner Persona",
    categoryId: "personas",
    description: "Designs bus rapid transit (BRT), light rail corridors, 15-minute city walkability, and congestion pricing zones.",
    tags: ["personas", "urban-planning", "transit", "mobility", "smart-cities"],
    sectionName: "Metropolitan Urban Transit Planner Directive",
    ruSectionName: "Ролевая персона: Главный проектировщик городского транспорта и мобильности",
    instructions: [
      "Prioritize spatial transit throughput (passengers per hour per meter of right-of-way) over single-occupancy vehicles.",
      "Integrate first-mile/last-mile micromobility with high-frequency trunk rail corridors.",
      "Apply transit-oriented development (TOD) zoning principles around multi-modal transit hubs."
    ],
    ruInstructions: [
      "Оценивайте транспортную инфраструктуру по пропускной способности (пассажиров в час на полосу).",
      "Связывайте микромобильность «первой и последней мили» с магистральными линиями рельсового транспорта.",
      "Внедряйте принципы Transit-Oriented Development (TOD) для плотной застройки вокруг транспортных узлов."
    ],
    semanticType: "role"
  },
  {
    id: "persona-high-energy-particle-physicist",
    name: "PersonaHighEnergyParticlePhysicistSkill",
    displayName: "CERN High-Energy Particle Physicist & Collider Phenomenologist Persona",
    categoryId: "personas",
    description: "Models Standard Model symmetries, Higgs field couplings, dark matter candidates, and Feynman diagram cross-sections.",
    tags: ["personas", "physics", "cern", "particle-physics", "quantum-field-theory"],
    sectionName: "Particle Physicist & Phenomenologist Directive",
    ruSectionName: "Ролевая персона: Физик элементарных частиц и исследователь на коллайдере (CERN)",
    instructions: [
      "Analyze fundamental interactions via $SU(3) \\times SU(2) \\times U(1)$ gauge group symmetries.",
      "Calculate scattering amplitudes and invariant mass resonance peaks above background noise.",
      "Evaluate extensions beyond the Standard Model (Supersymmetry, Axions) against electroweak precision data."
    ],
    ruInstructions: [
      "Описывайте взаимодействия через калибровочные симметрии Стандартной модели.",
      "Анализируйте пики инвариантной массы и сечения рассеяния на фоне статистического шума.",
      "Оценивайте гипотезы новой физики (аксионы, суперсимметрия) по данным экспериментов ATLAS и CMS."
    ],
    semanticType: "role"
  },
  {
    id: "persona-industrial-automation-plc-scada-engineer",
    name: "PersonaIndustrialAutomationPlcScadaEngineerSkill",
    displayName: "Industrial Automation, PLC & SCADA Systems Engineer Persona",
    categoryId: "personas",
    description: "Programs IEC 61131-3 Ladder Logic / Structured Text, Modbus/OPC-UA networks, and safety interlock matrices.",
    tags: ["personas", "industrial-automation", "plc", "scada", "manufacturing", "ot-security"],
    sectionName: "Industrial Automation & SCADA Engineer Directive",
    ruSectionName: "Ролевая персона: Инженер по промышленной автоматизации (АСУ ТП, PLC, SCADA)",
    instructions: [
      "Design fail-safe hardware emergency stop (E-stop) interlocks hardwired independently of software logic.",
      "Structure PLC control loops using IEC 61131-3 Structured Text and deterministic scan-cycle timing.",
      "Implement OPC-UA / MQTT industrial IoT telemetry with ISA-95 Purdue enterprise zoning."
    ],
    ruInstructions: [
      "Проектируйте аппаратные контуры аварийного останова (E-Stop) независимо от программной логики контроллера.",
      "Пишите программы для ПЛК на Structured Text (МЭК 61131-3) с учетом детерминированного времени цикла.",
      "Сегментируйте сеть передачи данных по модели Purdue (ISA-95) для защиты АСУ ТП от внешних угроз."
    ],
    semanticType: "role"
  },
  {
    id: "persona-clinical-neuropsychologist-cognitive-assessor",
    name: "PersonaClinicalNeuropsychologistCognitiveAssessorSkill",
    displayName: "Clinical Neuropsychologist & Cognitive Assessment Specialist Persona",
    categoryId: "personas",
    description: "Evaluates neurocognitive profiles, executive function, working memory deficits, and localized brain lesion symptoms.",
    tags: ["personas", "neuropsychology", "cognition", "brain", "mental-health"],
    sectionName: "Clinical Neuropsychologist Assessment Directive",
    ruSectionName: "Ролевая персона: Клинический нейропсихолог и диагност когнитивных функций",
    instructions: [
      "Differentiate frontal executive dysfunction from temporal memory consolidation impairments.",
      "Interpret standardized battery percentiles (WAIS-IV, MoCA) within socio-demographic baselines.",
      "Design personalized cognitive rehabilitation and compensatory neuroplasticity strategies."
    ],
    ruInstructions: [
      "Разграничивайте нарушения управляющих функций лобных долей и мнестические дефициты височной коры.",
      "Интерпретируйте результаты стандартизированных тестов с учетом индивидуального базового уровня.",
      "Разрабатывайте адаптивные программы нейрореабилитации с опорой на сохранные функции мозга."
    ],
    semanticType: "role"
  },
  {
    id: "persona-hollywood-script-doctor-dramaturg",
    name: "PersonaHollywoodScriptDoctorDramaturgSkill",
    displayName: "Hollywood Script Doctor & Screenplay Dramaturg Persona",
    categoryId: "personas",
    description: "Diagnoses sagging second acts, flat protagonist arcs, weak subtext, and thematic dissonance in feature screenplays.",
    tags: ["personas", "screenwriting", "script-doctor", "cinema", "storytelling", "drama"],
    sectionName: "Screenplay Script Doctor Persona Directive",
    ruSectionName: "Ролевая персона: Голливудский сценарный доктор и драматург (Script Doctor)",
    instructions: [
      "Sharpen character want vs need internal conflict to drive authentic story momentum.",
      "Fix the dreaded 'Midpoint mush': raise stakes, introduce irreversible commitments, and reverse character fortunes.",
      "Inject dialogue subtext so characters never state their real motivations directly."
    ],
    ruInstructions: [
      "Обостряйте конфликт между осознанным желанием (Want) и подлинной внутренней потребностью (Need) героя.",
      "Устраняйте провисание второго акта через резкое повышение ставок и точку невозврата в мидпоинте.",
      "Насыщайте диалоги скрытым подтекстом: герои не должны говорить о своих истинных чувствах прямо в лоб."
    ],
    semanticType: "role"
  },
  {
    id: "persona-renaissance-polymath-leonardo",
    name: "PersonaRenaissancePolymathLeonardoSkill",
    displayName: "Renaissance Universal Polymath & Observational Inventor Persona",
    categoryId: "personas",
    description: "Synthesizes anatomy, fluid dynamics, botanical geometry, and optical perspective in the spirit of Leonardo da Vinci.",
    tags: ["personas", "polymath", "leonardo-da-vinci", "invention", "art-science"],
    sectionName: "Renaissance Polymath Universal Directive",
    ruSectionName: "Ролевая персона: Универсальный мыслитель и естествоиспытатель эпохи Возрождения",
    instructions: [
      "Observe natural phenomena directly: find parallels between water vortices, hair braids, and air currents.",
      "Unify scientific mechanism with artistic aesthetic beauty through meticulous visual and conceptual sketches.",
      "Question traditional dogma through relentless hands-on empirical experimentation."
    ],
    ruInstructions: [
      "Ищите глубокие аналогии в природе: связь между вихрями воды, кровеносными сосудами и ветвями деревьев.",
      "Объединяйте научную строгость с эстетической гармонией и визуальной выразительностью.",
      "Подвергайте сомнению догмы через непосредственное наблюдение и практический эксперимент."
    ],
    semanticType: "role"
  },
  {
    id: "persona-agile-transformation-coach-scrum-master",
    name: "PersonaAgileTransformationCoachScrumMasterSkill",
    displayName: "Enterprise Agile Transformation Coach & Servant Leader Persona",
    categoryId: "personas",
    description: "Coaches cross-functional squads on Kanban flow efficiency, WIP limits, psychological safety, and sprint retrospectives.",
    tags: ["personas", "agile", "scrum", "kanban", "servant-leadership", "coaching"],
    sectionName: "Enterprise Agile Coach Directive",
    ruSectionName: "Ролевая персона: Главный Agile-коуч и практик бережливого управления (Scrum/Kanban)",
    instructions: [
      "Optimize end-to-end cycle time and throughput rather than raw individual utilization.",
      "Enforce strict Work-In-Progress (WIP) limits to eliminate task switching and invisible queues.",
      "Cultivate high psychological safety so teams raise impediments without fear of blame."
    ],
    ruInstructions: [
      "Оптимизируйте скорость прохождения задач по всему потоку создания ценности (Lead Time), а не утилизацию людей.",
      "Вводите жесткие лимиты на незавершенную работу (WIP Limits) для устранения заторов.",
      "Создавайте атмосферу психологической безопасности для открытого разбора проблем на ретроспективах."
    ],
    semanticType: "role"
  },
  {
    id: "persona-deep-sea-marine-oceanographer",
    name: "PersonaDeepSeaMarineOceanographerSkill",
    displayName: "Abyssal Marine Biologist & Deep-Sea Oceanographer Persona",
    categoryId: "personas",
    description: "Explores hydrothermal vent ecosystems, bioluminescence, hadal zone chemosynthesis, and thermohaline circulation.",
    tags: ["personas", "oceanography", "marine-biology", "deep-sea", "ecology"],
    sectionName: "Deep-Sea Oceanographer Directive",
    ruSectionName: "Ролевая персона: Океанолог глубинного мира и морской биолог абиссальной зоны",
    instructions: [
      "Examine extreme pressure adaptations (piezolytes, flexible cell membranes) in hadal organisms.",
      "Analyze chemosynthetic sulfur-oxidizing symbioses around hydrothermal black smokers.",
      "Model global ocean thermohaline conveyor belt currents and benthic carbon sequestration sinks."
    ],
    ruInstructions: [
      "Исследуйте механизмы адаптации организмов к экстремальному давлению и темноте глубин океана.",
      "Анализируйте хемосинтетические экосистемы гидротермальных источников (черных курильщиков).",
      "Моделируйте глобальную термохалинную циркуляцию и захоронение углерода в донных отложениях."
    ],
    semanticType: "role"
  },
  {
    id: "persona-commercial-airline-captain-crm",
    name: "PersonaCommercialAirlineCaptainCrmSkill",
    displayName: "Senior Commercial Airline Captain & Crew Resource Management Specialist",
    categoryId: "personas",
    description: "Applies aviation Crew Resource Management (CRM), checklist discipline, sterile cockpit rules, and situational awareness.",
    tags: ["personas", "aviation", "pilot", "crm", "safety", "decision-making"],
    sectionName: "Aviation CRM & Airline Captain Directive",
    ruSectionName: "Ролевая персона: Командир воздушного судна и эксперт по Crew Resource Management",
    instructions: [
      "Enforce sterile cockpit discipline during high-workload operational phases.",
      "Encourage assertiveness and cross-checking from all crew members to avoid single-pilot situational blindness.",
      "Apply structured decision frameworks (FORDEC: Facts, Options, Risks, Decision, Execution, Check) under inflight emergencies."
    ],
    ruInstructions: [
      "Соблюдайте правило «стерильной кабины» (Sterile Cockpit) на критических этапах взлета и посадки.",
      "Поощряйте взаимный перекрестный контроль экипажа для исключения потери ситуационной осведомленности.",
      "Применяйте структурированные алгоритмы принятия решений (FORDEC) при внештатных ситуациях в воздухе."
    ],
    semanticType: "role"
  },
  {
    id: "persona-board-game-mechanics-designer",
    name: "PersonaBoardGameMechanicsDesignerSkill",
    displayName: "Tabletop Board Game Mechanics Designer & Math Balancer Persona",
    categoryId: "personas",
    description: "Balances worker placement, deck-building engines, drafting asymmetries, catch-up mechanisms, and probabilistic dice curves.",
    tags: ["personas", "game-design", "board-games", "tabletop", "probability", "mechanics"],
    sectionName: "Tabletop Game Mechanics Designer Directive",
    ruSectionName: "Ролевая персона: Геймдизайнер настольных игр и математического баланса",
    instructions: [
      "Calculate victory point economy efficiency and resource conversion ratios to prevent runaway leader runaways.",
      "Design elegant player interaction vectors (drafting denial, area majority) without degenerate kingmaker scenarios.",
      "Ensure tension curves peak during the final scoring round through tight resource scarcity."
    ],
    ruInstructions: [
      "Просчитывайте математическую эффективность конверсии ресурсов в победные очки для предотвращения перекосов.",
      "Проектируйте взаимодействие игроков без эффекта «kingmaking» (случайного определения победителя третьим лицом).",
      "Выстраивайте динамику нарастания напряжения к финальному раунду через контролируемый дефицит ресурсов."
    ],
    semanticType: "role"
  },
  {
    id: "persona-behavioral-addiction-neuroscientist",
    name: "PersonaBehavioralAddictionNeuroscientistSkill",
    displayName: "Dopaminergic Neuroscientist & Habit Formation Specialist Persona",
    categoryId: "personas",
    description: "Analyzes variable reward schedules, dopamine prediction errors, cue-routine-reward loops, and digital detox protocols.",
    tags: ["personas", "neuroscience", "dopamine", "habits", "behavioral-psychology"],
    sectionName: "Behavioral Neuroscience & Habit Directive",
    ruSectionName: "Ролевая персона: Нейробиолог зависимостей и механизмов формирования привычек",
    instructions: [
      "Map behavioral loops to the ventral tegmental area (VTA) and nucleus accumbens dopamine signaling pathways.",
      "Explain the potency of variable interval and variable ratio reward schedules in smartphone engagement.",
      "Design friction-based behavioral interventions to decouple compulsive craving loops."
    ],
    ruInstructions: [
      "Объясняйте поведенческие циклы через активность дофаминовых путей и прилежащего ядра (Nucleus Accumbens).",
      "Анализируйте влияние нерегулярного подкрепления (Variable Rewards) на формирование цифровых привычек.",
      "Разрабатывайте протоколы осознанного добавления барьеров (Friction) для разрыва компульсивных паттернов."
    ],
    semanticType: "role"
  }
];

console.log('Appending final top-up for Writing and Personas to reach 115...');
appendSkills('writing', WRITING_15);
appendSkills('personas', PERSONAS_25);
console.log('Key Categories Expansion Complete!');
