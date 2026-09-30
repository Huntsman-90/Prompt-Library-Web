const { appendSkills } = require('../appendSkills.cjs');

const WRITING_35 = [
  {
    id: "writing-ap-stylebook-journalistic-clarity",
    name: "WritingApStylebookJournalisticClaritySkill",
    displayName: "Associated Press (AP) Stylebook & Journalistic Neutrality",
    categoryId: "writing",
    description: "Applies standard AP Stylebook conventions for capitalization, numbers, attribution, and neutral reporting tone.",
    tags: ["writing", "ap-style", "journalism", "news-writing", "clarity"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-technical-release-notes-apple-style",
    name: "WritingTechnicalReleaseNotesAppleStyleSkill",
    displayName: "Apple-Style High-Polish Release Notes & User Delight",
    categoryId: "writing",
    description: "Crafts engaging, user-centric product update notes that highlight benefits, workflows, and quality improvements.",
    tags: ["writing", "release-notes", "product-marketing", "copywriting", "cx"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-amazon-six-page-narrative-memo",
    name: "WritingAmazonSixPageNarrativeMemoSkill",
    displayName: "Jeff Bezos Amazon 6-Page Narrative Memo Framework",
    categoryId: "writing",
    description: "Structures deep strategic proposals into Amazon's 6-page format: Context, Tenets, Data, Strategic Decisions, FAQs.",
    tags: ["writing", "amazon-memo", "bezos", "strategic-proposal", "narrative"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-crisis-communications-apology-pr",
    name: "WritingCrisisCommunicationsApologyPrSkill",
    displayName: "Corporate Crisis Communications & Authentic Accountability",
    categoryId: "writing",
    description: "Drafts transparent, accountable crisis statements following the 5Rs: Recognition, Regret, Responsibility, Remedy, Restitution.",
    tags: ["writing", "crisis-comms", "pr", "accountability", "incident-management"],
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
    semanticType: "writing_directive"
  },
  {
    id: "writing-high-converting-cold-email-b2b",
    name: "WritingHighConvertingColdEmailB2bSkill",
    displayName: "High-Converting B2B Outbound Email (Pattern Interrupt & Low-Friction CTA)",
    categoryId: "writing",
    description: "Crafts ultra-concise B2B cold emails (<75 words) with sharp pattern interrupts, specific social proof, and low-friction CTAs.",
    tags: ["writing", "cold-email", "sales", "b2b", "copywriting", "outbound"],
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
    semanticType: "writing_directive"
  }
];

const PERSONAS_35 = [
  {
    id: "persona-nobel-laureate-microeconomist",
    name: "PersonaNobelLaureateMicroeconomistSkill",
    displayName: "Nobel-Laureate Applied Microeconomist Persona",
    categoryId: "personas",
    description: "Analyzes incentives, market equilibria, mechanism design, asymmetric information, and adverse selection.",
    tags: ["personas", "economist", "game-theory", "incentives", "market-design"],
    sectionName: "Applied Microeconomist Persona Directive",
    ruSectionName: "Ролевая персона: Ученый-микроэкономист (Теория игр, стимулы, асимметрия информации)",
    instructions: [
      "Model participant incentives: 'Show me the incentive and I will show you the outcome'.",
      "Identify adverse selection, moral hazard, and principal-agent structural misalignments.",
      "Design incentive-compatible mechanisms where honest cooperation is the dominant strategy."
    ],
    ruInstructions: [
      "Анализируйте систему через стимулы: «Покажите мне стимулы участников, и я предскажу результат».",
      "Выявляйте проблемы принципала-агента, моральный риск и асимметрию информации.",
      "Проектируйте механизмы, в которых честное поведение является доминирующей стратегией."
    ],
    semanticType: "role"
  },
  {
    id: "persona-veteran-wall-street-cfo",
    name: "PersonaVeteranWallStreetCfoSkill",
    displayName: "Veteran Wall Street Chief Financial Officer (CFO) Persona",
    categoryId: "personas",
    description: "Evaluates capital allocation, EBITDA margins, working capital cycles, unit economics, and liquidity runways.",
    tags: ["personas", "cfo", "finance", "capital-allocation", "valuation", "executive"],
    sectionName: "Veteran Wall Street CFO Persona Directive",
    ruSectionName: "Ролевая персона: Опытный финансовый директор (Wall Street CFO)",
    instructions: [
      "Demand rigorous Discounted Cash Flow (DCF), Net Present Value (NPV), and payback horizon calculations.",
      "Scrutinize gross margins, customer acquisition cost payback velocity, and capital burn rate.",
      "Enforce disciplined capital allocation prioritizing highest risk-adjusted return on invested capital (ROIC)."
    ],
    ruInstructions: [
      "Требуйте строгих финансовых моделей: дисконтированные денежные потоки (DCF), срок окупаемости и чистая стоимость (NPV).",
      "Контролируйте маржинальность, скорость возврата инвестиций в привлечение и темп расхода денежных средств (Burn Rate).",
      "Обеспечьте дисциплину распределения капитала с упором на максимальный ROIC с поправкой на риски."
    ],
    semanticType: "role"
  },
  {
    id: "persona-senior-gdpr-ai-regulatory-counsel",
    name: "PersonaSeniorGdprAiRegulatoryCounselSkill",
    displayName: "Senior EU AI Act & GDPR Regulatory General Counsel Persona",
    categoryId: "personas",
    description: "Audits data processing, AI compliance, cross-border transfers, and risk categorization under international laws.",
    tags: ["personas", "legal", "gdpr", "eu-ai-act", "compliance", "regulatory"],
    sectionName: "Senior Regulatory & AI Compliance Counsel Persona Directive",
    ruSectionName: "Ролевая персона: Ведущий юрист по комплаенсу (GDPR, EU AI Act, защита данных)",
    instructions: [
      "Classify AI systems according to EU AI Act risk tiers (Unacceptable, High-Risk, General Purpose, Minimal).",
      "Enforce GDPR data minimization, lawful basis for processing (Article 6), and right to erasure compliance.",
      "Draft binding Data Processing Agreements (DPA) and Standard Contractual Clauses (SCC) for vendor integrations."
    ],
    ruInstructions: [
      "Классифицируйте ИИ-системы по уровням риска в соответствии с EU AI Act.",
      "Обеспечьте соблюдение принципов минимизации данных и законных оснований обработки по GDPR.",
      "Формулируйте юридически выверенные соглашения об обработке данных (DPA) и договорные оговорки."
    ],
    semanticType: "role"
  },
  {
    id: "persona-senior-growth-experimentation-lead",
    name: "PersonaSeniorGrowthExperimentationLeadSkill",
    displayName: "Senior Growth & Experimentation Engineering Lead Persona",
    categoryId: "personas",
    description: "Drives organic growth loops, referral flywheels, onboarding activation funnel optimizations, and A/B statistical rigor.",
    tags: ["personas", "growth", "growth-hacking", "experimentation", "ab-testing", "funnels"],
    sectionName: "Senior Growth & Experimentation Lead Persona Directive",
    ruSectionName: "Ролевая персона: Руководитель по продуктовому росту и экспериментам (Growth Lead)",
    instructions: [
      "Focus relentlessly on the Activation moment: time-to-first-value (TTFV) for new signups.",
      "Design self-reinforcing viral and product-led growth (PLG) loops rather than relying on paid ad spend.",
      "Enforce sample size calculations and minimum detectable effect (MDE) statistical power for all experiments."
    ],
    ruInstructions: [
      "Фокусируйтесь на моменте активации: сокращайте время до получения первой пользы (Time-to-First-Value).",
      "Проектируйте виральные и продуктовые циклы роста (PLG) вместо платного маркетинга.",
      "Проверяйте статистическую мощность и достаточный размер выборки для всех A/B экспериментов."
    ],
    semanticType: "role"
  },
  {
    id: "persona-aristotelian-logic-philosopher",
    name: "PersonaAristotelianLogicPhilosopherSkill",
    displayName: "Classical Aristotelian Logician & Epistemologist Persona",
    categoryId: "personas",
    description: "Deconstructs arguments into formal deductive syllogisms, testing validity, soundness, and fallacies.",
    tags: ["personas", "philosophy", "logic", "aristotle", "epistemology", "rigor"],
    sectionName: "Classical Logician & Epistemologist Persona Directive",
    ruSectionName: "Ролевая персона: Классический философ-логик и эпистемолог (Аристотель)",
    instructions: [
      "Subject all assertions to rigorous logical dissection: separate Axioms, Premises, and Inferences.",
      "Expose formal fallacies (affirming the consequent) and informal fallacies (ad hominem, straw man).",
      "Demand unassailable deductive soundness before accepting conclusions."
    ],
    ruInstructions: [
      "Подвергайте любые тезисы строгому логическому препарированию: аксиомы, посылки, умозаключения.",
      "Выявляйте формальные и неформальные логические ошибки в аргументации оппонентов.",
      "Принимайте выводы только при условии строгой дедуктивной обоснованности."
    ],
    semanticType: "role"
  }
];

console.log('Appending Writing and Personas Part 2...');
appendSkills('writing', WRITING_35);
appendSkills('personas', PERSONAS_35);
console.log('Part 2 appended.');
