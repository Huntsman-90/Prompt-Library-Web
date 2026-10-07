import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const BUSINESS_SKILLS: Record<string, SkillDefinition> = {
  'unit-economics-modeling': {
    id: 'unit-economics-modeling',
    name: 'UnitEconomicsModelingSkill',
    displayName: 'Unit Economics & Financial Modeling (CAC/LTV)',
    categoryId: 'business',
    description: 'Models unit economics: Customer Acquisition Cost (CAC), Lifetime Value (LTV), Payback Period, and Gross Margins.',
    tags: ['business', 'finance', 'unit-economics', 'cac', 'ltv', 'margins', 'saas'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Моделирование Юнит-Экономики (CAC / LTV / Payback)',
        'Unit Economics & Financial Metric Modeling',
        [
          '- **Формулы расчета**: Рассчитать $LTV = (ARPU \\times Gross Margin) / Churn Rate$ и соотношение $LTV / CAC$ (целевое значение >= 3.0).',
          '- **Срок окупаемости (Payback Period)**: Определить количество месяцев до возврата инвестиций в привлечение (цель <= 12 месяцев).',
          '- **Анализ когорт**: Проанализировать влияние удержания (Net Revenue Retention / NRR) на экспоненциальный рост выручки.',
        ],
        [
          '- **Core Formulas**: Compute $LTV = (ARPU \\times Gross Margin) / Churn Rate$ and validate $LTV / CAC$ ratio targets (>= 3.0x).',
          '- **Payback Velocity**: Calculate CAC Payback Period in months (targeting <= 12 months for capital-efficient growth).',
          '- **Cohort Retention**: Model compound ARR growth driven by Net Revenue Retention (NRR > 120%).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'gtm-roadmap-phasing': {
    id: 'gtm-roadmap-phasing',
    name: 'GtmRoadmapPhasingSkill',
    displayName: 'Phased Go-To-Market Execution Roadmap',
    categoryId: 'business',
    description: 'Plans context-dependent go-to-market phases, channels, and decision gates within stated resources.',
    tags: ['business', 'gtm', 'roadmap', 'launch', 'milestones', 'strategy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Поэтапная Дорожная Карта Запуска (GTM Roadmap)',
        'Phased GTM Launch Execution Roadmap',
        [
          '- Выберите этапы и их число по готовности продукта, горизонту, аудитории и указанным ресурсам; не навязывайте последовательность alpha/beta/GA.',
          '- Подберите каналы по целевой аудитории и доступным свидетельствам; сравнивайте только правдоподобные варианты и помечайте непроверенную пригодность как гипотезу.',
          '- Используйте числовые phase gates только если они заданы или обоснованы вводными; иначе укажите наблюдаемые сигналы и условия продолжения/остановки без вымышленных порогов.',
        ],
        [
          '- Choose phases and their number based on product readiness, horizon, audience, and stated resources; do not impose an alpha/beta/GA sequence.',
          '- Select channels based on the target audience and available evidence; compare only plausible options and label untested fit as a hypothesis.',
          '- Use numeric phase gates only when supplied or justified by the task; otherwise specify observable signals and continue/stop conditions without inventing thresholds.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'defensible-moats': {
    id: 'defensible-moats',
    name: 'DefensibleMoatsSkill',
    displayName: '7 Powers Defensible Competitive Moats',
    categoryId: 'business',
    description: 'Applies Hamilton Helmer\'s 7 Powers framework (Network Effects, Switching Costs, Scale Economies, Counter-Positioning).',
    tags: ['business', 'moats', '7-powers', 'strategy', 'competitive-advantage'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Формирование Защитных Рвов (Hamilton Helmer 7 Powers)',
        'Hamilton Helmer 7 Powers Defensible Moats Protocol',
        [
          '- **Аудит 7 Сил**: Оценить потенциал защиты по направлениям: Сетевые эффекты, Высокие издержки переключения (Switching Costs), Эффект масштаба, Контр-позиционирование, Проприетарные активы.',
          '- **Укрепление рвов**: Сформулировать долгосрочные инженерные решения, делающие копирование продукта экономически невыгодным для конкурентов.',
          '- **Удержание клиентов**: Интегрировать данные пользователя в ядро продукта для максимизации ценности при длительном использовании.',
        ],
        [
          '- **7 Powers Audit**: Evaluate defensibility across Network Effects, Switching Costs, Scale Economies, Counter-Positioning, Cornered Resources, Process Power, Branding.',
          '- **Moat Reinforcement**: Architect technical mechanisms that make competitive replication economically non-viable.',
          '- **Data Compounding**: Embed proprietary customer workflows and datasets into the core system to maximize switching costs.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'pricing-tier-architecture': {
    id: 'pricing-tier-architecture',
    name: 'PricingTierArchitectureSkill',
    displayName: 'SaaS Pricing & Packaging Architecture',
    categoryId: 'business',
    description: 'Designs high-converting SaaS pricing tiers (Free/Starter/Pro/Enterprise) aligned with value metrics.',
    tags: ['business', 'pricing', 'monetization', 'packaging', 'saas', 'tiers'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Архитектура Тарифных Планов и Ценообразования',
        'SaaS Pricing & Packaging Tier Architecture',
        [
          '- **Метрика ценности (Value Metric)**: Привязать цену к ключевому параметру потребления (например: за активного пользователя, за объем обработанных GB или за API-вызовы).',
          '- **Матрица тарифов**: Сформировать 3–4 понятных тарифа (Starter -> Growth -> Scale -> Custom Enterprise).',
          '- **Feature Fencing**: Четко разделить функции: базовые для привлечения, продвинутые (SSO, Audit Logs, SLA 99.99%) только в Enterprise.',
        ],
        [
          '- **Value Metric Alignment**: Align billing tightly with customer value consumption (e.g. per active seat, per processed GB, per API event).',
          '- **Tier Matrix**: Deliver a transparent 4-tier model (Starter -> Growth -> Pro -> Custom Enterprise).',
          '- **Feature Fencing**: Restrict enterprise-grade controls (SAML SSO, RBAC, Data Residency, 99.99% SLA) exclusively to the Enterprise tier.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'tam-sam-som-sizing': {
    id: 'tam-sam-som-sizing',
    name: 'TamSamSomSizingSkill',
    displayName: 'TAM / SAM / SOM Market Sizing',
    categoryId: 'business',
    description: 'Quantifies market opportunity: Total Addressable Market (TAM), Serviceable Addressable Market (SAM), and Obtainable Market (SOM).',
    tags: ['business', 'market-sizing', 'tam', 'sam', 'som', 'strategy', 'market-research'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Оценка Объема Рынка (TAM / SAM / SOM)',
        'TAM / SAM / SOM Market Sizing Methodology',
        [
          '- **TAM (Общий объем рынка)**: Оценить глобальный потенциальный объем рынка при 100% проникновении.',
          '- **SAM (Доступный сегмент)**: Выделить целевой сегмент, соответствующий текущей географии и профилю продукта.',
          '- **SOM (Реально достижимая доля)**: Рассчитать реалистичный объем продаж на горизонте 24–36 месяцев с учетом конкуренции и ресурсов команды.',
        ],
        [
          '- **TAM (Total Addressable Market)**: Model macro global theoretical demand under 100% market penetration.',
          '- **SAM (Serviceable Available Market)**: Filter target market matching current geographic, regulatory, and capability focus.',
          '- **SOM (Serviceable Obtainable Market)**: Quantify capture target over 24-36 months grounded in sales capacity and marketing budget.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'investor-pitch-narrative': {
    id: 'investor-pitch-narrative',
    name: 'InvestorPitchNarrativeSkill',
    displayName: '10-Slide Venture Capital Pitch Deck Narrative',
    categoryId: 'business',
    description: 'Structures persuasive Sequoia-style pitch decks: Problem, Solution, Why Now, Market Size, Traction, Moats, Team, Ask.',
    tags: ['business', 'pitch-deck', 'fundraising', 'vc', 'venture-capital', 'investor'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Нарратив Питч-Дека для Инвесторов (10-Slide Deck)',
        'Venture Capital Pitch Deck Narrative Structure',
        [
          '- **10 Ключевых слайдов**: 1. Проблема, 2. Решение, 3. Почему сейчас (Why Now), 4. Размер рынка, 5. Продукт, 6. Трэкшн и метрики, 7. Бизнес-модель, 8. Конкуренты, 9. Команда, 10. Запрос на раунд (The Ask).',
          '- **Фокус на трэкшне**: Подтверждать каждое заявление реальными цифрами роста (MoM ARR growth, NRR, CAC Payback).',
          '- **Понятная цель финансирования**: Четко расписать использование привлекаемых средств (70% R&D, 30% GTM) на 18 месяцев взлетной полосы (Runway).',
        ],
        [
          '- **10 Canonical Slides**: 1. Problem, 2. Solution, 3. Why Now, 4. Market Size, 5. Product Demo, 6. Traction Metrics, 7. Business Model, 8. Moats, 9. Team, 10. The Ask & Milestones.',
          '- **Traction Evidence**: Anchor investor narrative in verifiable metrics (MoM ARR growth %, logo retention, payback velocity).',
          '- **Capital Allocation**: Detail runway extension (18-24 months) and explicit engineering/sales hiring milestones funded by the round.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'churn-mitigation-engine': {
    id: 'churn-mitigation-engine',
    name: 'ChurnMitigationEngineSkill',
    displayName: 'Customer Health Scoring & Churn Prevention',
    categoryId: 'business',
    description: 'Constructs proactive customer health scoring models and automated playbooks to prevent account churn.',
    tags: ['business', 'churn', 'retention', 'customer-success', 'health-score', 'nps'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Модель Здоровья Клиентов и Предотвращение Оттока (Anti-Churn)',
        'Customer Health Scoring & Churn Prevention Playbook',
        [
          '- **Индекс здоровья клиента (Health Score 0-100)**: Взвесить метрики активности: частота логинов (30%), глубина использования фичей (40%), количество открытых тикетов (30%).',
          '- **Триггеры раннего оповещения**: Настроить алерты при падении активности на > 35% за 14 дней.',
          '- **Плейбук спасения аккаунта**: Сформировать готовый алгоритм вмешательства Customer Success менеджера с конкретным оффером помощи.',
        ],
        [
          '- **Composite Health Score (0-100)**: Calculate customer health: DAU/MAU frequency (30%), core feature adoption (40%), support friction signals (30%).',
          '- **Early At-Risk Trigger**: Automatically flag accounts exhibiting > 35% usage velocity drop-off over trailing 14-day window.',
          '- **Intervention Playbook**: Prescribe structured CS escalation workflows and proactive technical account reviews to neutralize churn risk.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'enterprise-sales-meddpicc': {
    id: 'enterprise-sales-meddpicc',
    name: 'EnterpriseSalesMeddpiccSkill',
    displayName: 'MEDDPICC Enterprise Deal Qualification',
    categoryId: 'business',
    description: 'Qualifies six-figure B2B enterprise opportunities across Metrics, Economic Buyer, Decision Criteria, Process, Paper Process, Pain, Champion, Competition.',
    tags: ['business', 'sales', 'meddpicc', 'enterprise', 'b2b', 'deals'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Квалификация Сделок по Методологии MEDDPICC',
        'MEDDPICC Enterprise Deal Qualification Protocol',
        [
          '- **[M] Metrics**: Количественная экономическая выгода клиента от внедрения решения.',
          '- **[EB] Economic Buyer**: Лицо, реально владеющее бюджетом и правом подписания договора.',
          '- **[DC] Decision Criteria**: Технические и коммерческие критерии выбора подрядчика.',
          '- **[DP] Decision Process**: Регламент принятия решения, комитеты и этапы согласования.',
          '- **[PP] Paper Process**: Юридический процесс согласования договора, комплаенса и безопасности.',
          '- **[IP] Identified Pain**: Острая бизнес-проблема, заставляющая клиента искать решение прямо сейчас.',
          '- **[C] Champion**: Внутренний союзник в компании клиента, продвигающий наш продукт.',
          '- **[CO] Competition**: Анализ конкурентов и внутреннего решения «сделать своими силами».',
        ],
        [
          '- **[M] Metrics**: Quantified financial value and ROI delivered to the enterprise.',
          '- **[EB] Economic Buyer**: Direct access to the ultimate budget signatory.',
          '- **[DC] Decision Criteria**: Explicit technical, compliance, and vendor selection rubrics.',
          '- **[DP] Decision Process**: The formal committee review timeline and sign-off sequence.',
          '- **[PP] Paper Process**: Legal, infosec, procurement, and contract execution mechanics.',
          '- **[IP] Identified Pain**: High-urgency business bottleneck with high cost of inaction.',
          '- **[C] Champion**: Dedicated internal stakeholder with vested interest in our success.',
          '- **[CO] Competition**: Deep intelligence on competitor bids and "build-in-house" alternatives.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'okr-goal-cascade': {
    id: 'okr-goal-cascade',
    name: 'OkrGoalCascadeSkill',
    displayName: 'High-Impact OKR Cascade Framework',
    categoryId: 'business',
    description: 'Aligns company, team, and individual goals via qualitative Objectives and ambitious, quantitatively measurable Key Results.',
    tags: ['business', 'okr', 'goals', 'alignment', 'management', 'kpi'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Каскад Целей и Ключевых Результатов (OKR Framework)',
        'High-Impact Objective & Key Results (OKR) Cascade',
        [
          '- **Objective (Качественная вдохновляющая цель)**: Краткая, амбициозная и мотивирующая цель на квартал.',
          '- **Key Results (3–5 измеримых метрик)**: Каждый ключевой результат должен иметь формат: «Увеличить/Уменьшить [Метрика] с X до Y».',
          '- **Разделение Committed vs. Aspirational**: Четко маркировать 100% обязательные цели и цели «на вырост» (70% выполнения = успех).',
        ],
        [
          '- **Objective (Inspirational Focus)**: Qualitative, ambitious, action-oriented strategic quarterly goal.',
          '- **Key Results (3-5 Quantitative Metrics)**: Strictly format as: "Move [Metric Name] from baseline X to target Y by [Date]".',
          '- **Committed vs. Aspirational Split**: Explicitly distinguish mandatory committed OKRs (100% pass) from aspirational moonshots (70% score is a win).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'cap-table-dilution-model': {
    id: 'cap-table-dilution-model',
    name: 'CapTableDilutionModelSkill',
    displayName: 'Cap Table Equity & Dilution Modeling',
    categoryId: 'business',
    description: 'Models equity distribution, option pools (ESOP), SAFE conversions, and founder dilution across funding rounds.',
    tags: ['business', 'cap-table', 'equity', 'fundraising', 'safes', 'dilution', 'esop'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Моделирование Структуры Капитала (Cap Table & Dilution)',
        'Cap Table Equity Dilution & SAFE Modeling Protocol',
        [
          '- **Учет опционного пула (ESOP)**: Смоделировать расширение пула опционов для сотрудников (10–15%) до раунда (Pre-money pool expansion).',
          '- **Конвертация SAFE нот**: Рассчитать конвертацию с учетом дисконтов (20%) и valuation cap.',
          '- **Таблица долей основателей**: Составить таблицу владения по раундам (Founders -> Seed -> Series A -> Series B) с расчетом размытия.',
        ],
        [
          '- **ESOP Option Pool Sizing**: Model pre-money unallocated employee option pool expansions (typically 10-15%).',
          '- **SAFE Note Conversion**: Model post-money SAFE conversions accounting for valuation caps and discount rates.',
          '- **Fully-Diluted Equity Waterfall**: Produce a multi-round ownership matrix tracking founder, investor, and pool equity percentages.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'competitive-battlecard-craft': {
    id: 'competitive-battlecard-craft',
    name: 'CompetitiveBattlecardCraftSkill',
    displayName: 'Sales Competitive Battlecard Engine',
    categoryId: 'business',
    description: 'Constructs tactical sales enablement battlecards: Competitor weaknesses, FUD counters, trap questions, and key differentiation.',
    tags: ['business', 'sales', 'battlecards', 'competitors', 'objections', 'enablement'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Конкурентная Баттлкарта для Продаж (Sales Battlecard)',
        'Competitive Sales Battlecard Specification',
        [
          '- **Быстрое резюме (Quick Dismiss)**: Одно предложение для снятия сравнения с конкурентом («Они отлично подходят для простого прототипирования, но не выдерживают нагрузку в энтерпрайзе»).',
          '- **Вопросы-ловушки (Trap Questions)**: 3 вопроса, которые клиент должен задать конкуренту, обнажающие их архитектурную слабость.',
          '- **Работа с возражениями**: Готовые скрипты ответов на топ-5 аргументов конкурента.',
        ],
        [
          '- **Quick Dismiss Positioning**: One-sentence positioning neutralizing competitor strengths ("Great for lightweight MVPs, incapable of enterprise HA").',
          '- **Landmine / Trap Questions**: 3 probing technical questions the prospect should ask the rival that expose architectural flaws.',
          '- **Objection Counter-Scripts**: Actionable talk-tracks countering competitor attack vectors with benchmark evidence.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'partner-ecosystem-channel': {
    id: 'partner-ecosystem-channel',
    name: 'PartnerEcosystemChannelSkill',
    displayName: 'Partner Ecosystem & Channel Distribution Strategy',
    categoryId: 'business',
    description: 'Designs indirect channel partner programs, marketplace revenue shares, co-sell motions, and system integrator alliances.',
    tags: ['business', 'partnerships', 'channel', 'marketplace', 'integrators', 'alliances'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Стратегия Партнерской Экосистемы и Каналов Продаж',
        'Partner Ecosystem & Channel Distribution Protocol',
        [
          '- **Типология партнеров**: Разделить партнерскую сеть (Technology Partners / ISVs, System Integrators / Resellers, Cloud Marketplaces).',
          '- **Модель разделения выручки (RevShare)**: Задать четкие финансовые условия (например: 20% комиссии на 1-й год, 10% на продления).',
          '- **Совместные продажи (Co-Sell Playbook)**: Описать регламент совместного выхода на сделки и стимулирования партнерских сейлзов.',
        ],
        [
          '- **Partner Tiering**: Segment alliance tiers (Technology ISVs, Global System Integrators, Cloud Hyperscaler Marketplaces).',
          '- **Commercial RevShare Structure**: Define margin structures (e.g. 20% Year-1 referral fee, 10% lifetime renewal margin).',
          '- **Co-Selling Enablement**: Document joint field selling playbooks, lead registration protocols, and sales commission alignment.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'm-and-a-due-diligence': {
    id: 'm-and-a-due-diligence',
    name: 'MAndADueDiligenceSkill',
    displayName: 'M&A Technical & Commercial Due Diligence',
    categoryId: 'business',
    description: 'Conducts rigorous M&A due diligence audits across IP ownership, open source licenses, tech debt, security compliance, and customer concentration.',
    tags: ['business', 'm-and-a', 'due-diligence', 'acquisition', 'audit', 'compliance'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Аудит M&A Due Diligence (Технический и Коммерческий)',
        'M&A Technical & Commercial Due Diligence Audit',
        [
          '- **Технический долг и масштабируемость**: Оценить стоимость модернизации унаследованного стека и риски доступности.',
          '- **Юридическая и IP-чистота**: Проверить отсутствие лицензионных рисков GPL/AGPL и чистоту прав на интеллектуальную собственность.',
          '- **Концентрация выручки**: Оценить риски, если на топ-3 клиентов приходится более 30% всей выручки компании.',
        ],
        [
          '- **Tech Debt & Re-Architecture Costs**: Quantify CapEx required to refactor legacy bottlenecks and achieve enterprise scale.',
          '- **IP & License Hygiene**: Audit codebase against copyleft contagion (GPL/AGPL) and verify clean-room proprietary ownership.',
          '- **Customer Concentration Risk**: Audit revenue exposure when Top-3 accounts represent > 30% of total recurring revenue.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'saas-magic-number-velocity': {
    id: 'saas-magic-number-velocity',
    name: 'SaaSながらMagicNumberVelocitySkill',
    displayName: 'SaaS Magic Number & Capital Efficiency Velocity',
    categoryId: 'business',
    description: 'Measures SaaS growth efficiency: Rule of 40 (Growth% + Margin%), Magic Number, Burn Multiple, and Bessemer Efficiency Score.',
    tags: ['business', 'saas', 'magic-number', 'rule-of-40', 'burn-multiple', 'finance', 'metrics'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Метрики Эффективности Роста SaaS (Rule of 40 & Magic Number)',
        'SaaS Growth Efficiency & Capital Velocity Metrics',
        [
          '- **Правило 40% (Rule of 40)**: Вычислить $Growth Rate (YoY) + Free Cash Flow Margin \\ge 40\\%$.',
          '- **Magic Number**: Рассчитать эффективность продаж: $Magic Number = (Net New ARR) / (Sales \\& Marketing Expense) \\ge 0.75$.',
          '- **Burn Multiple**: Оценить эффективность расходования капитала: $Burn Multiple = Net Burn / Net New ARR \\le 1.5$.',
        ],
        [
          '- **Rule of 40 Verification**: Calculate $YoY ARR Growth Rate (\\%) + FCF Margin (\\%) \\ge 40\\%$.',
          '- **SaaS Magic Number**: Measure sales productivity: $Magic Number = (Quarterly Net New ARR \\times 4) / (Previous Quarter S\\&M Spend) \\ge 0.75$.',
          '- **Burn Multiple Standard**: Quantify capital burn efficiency: $Burn Multiple = Net Burn / Net New ARR \\le 1.5$ (Target < 1.0).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

'net-promoter-score-root-cause': {
    id: 'net-promoter-score-root-cause',
    name: 'NetPromoterScoreRootCauseSkill',
    displayName: 'Net Promoter Score (NPS) & Root-Cause Triage',
    categoryId: 'business',
    description: 'Deconstructs customer sentiment into Promoters, Passives, and Detractors, generating root-cause fixes for churn.',
    tags: ['business', 'nps', 'sentiment', 'customer-retention', 'detractors', 'cx'],
    transform: createStandardSkillTransform(
      'protocol',
      'Анализ NPS и Причин Оттока (NPS Root-Cause Triage)',
      'Net Promoter Score (NPS) & Customer Feedback Triage Protocol',
      [
        '- **Сегментация ответов**: Разделить клиентов на Промоутеров (9-10), Нейтралов (7-8) и Критиков (0-6).',
        '- **Выделение системных болей**: Сгруппировать комментарии критиков по категориям (UX, надежность, цена, саппорт).',
        '- **План действий по нейтрализации**: Предложить конкретные доработки продукта, снижающие долю критиков на 15% за квартал.',
      ],
      [
        '- **NPS Cohort Segmentation**: Segment feedback across Promoters (9-10), Passives (7-8), and Detractors (0-6).',
        '- **Systemic Friction Clustering**: Categorize qualitative feedback into root themes: stability, pricing fences, usability, onboarding.',
        '- **Detractor Recovery Playbook**: Engineer high-touch remediation workflows reducing detractor percentage by 15% within 90 days.',
      ]
    ),
  },

  'customer-acquisition-cost-payback-optimizer': {
    id: 'customer-acquisition-cost-payback-optimizer',
    name: 'CacPaybackOptimizerSkill',
    displayName: 'CAC Payback Period & LTV/CAC Optimization',
    categoryId: 'business',
    description: 'Models customer acquisition unit economics, optimizing paid vs organic CAC to achieve sub-12-month payback horizons.',
    tags: ['business', 'cac', 'ltv', 'unit-economics', 'payback-period', 'growth'],
    transform: createStandardSkillTransform(
      'protocol',
      'Оптимизация Срока Окупаемости CAC (CAC Payback Horizon)',
      'CAC Payback Period & Unit Economic Optimization Protocol',
      [
        '- **Расчет раздельного CAC**: Четко разделить полностью нагруженный Blended CAC и Paid CAC по каналам привлечения.',
        '- **Срок окупаемости (Payback Months)**: Рассчитать месяцы окупаемости: CAC / (MRR * Gross Margin %). Целевой показатель: < 12 месяцев.',
        '- **Соотношение LTV/CAC**: Обеспечить коэффициент LTV/CAC в диапазоне 3.0x–5.0x для устойчивой юнит-экономики.',
      ],
      [
        '- **Granular CAC Allocation**: Explicitly decouple Fully Loaded Blended CAC from Channel-Specific Paid CAC across marketing channels.',
        '- **Payback Horizon Calculation**: Model months to payback: CAC / (MRR * Gross Margin %). Target benchmark: <12 months.',
        '- **LTV/CAC Ratio Invariant**: Maintain LTV/CAC between 3.0x and 5.0x balancing capital efficiency and hyper-growth velocity.',
      ]
    ),
  },

  'b2b-rfp-procurement-triage': {
    id: 'b2b-rfp-procurement-triage',
    name: 'B2bRfpProcurementTriageSkill',
    displayName: 'Enterprise B2B RFP Bid/No-Bid Decision Engine',
    categoryId: 'business',
    description: 'Evaluates enterprise Request for Proposals (RFP) through a scoring matrix (Fit, Budget, Competitor, Margin) to decide Bid or No-Bid.',
    tags: ['business', 'rfp', 'procurement', 'b2b-sales', 'enterprise', 'deals'],
    transform: createStandardSkillTransform(
      'protocol',
      'Аудит и Оценка Корпоративных RFP (Bid/No-Bid Matrix)',
      'Enterprise B2B RFP Bid/No-Bid Evaluation Protocol',
      [
        '- **Матрица оценки Bid/No-Bid**: Оценить запрос по 4 критериям (Техническое соответствие, Наличие бюджета, Отношения с ЛПР, Маржинальность).',
        '- **Порог отсечения**: Если скор ниже 70% — выдать мотивированный отказ (No-Bid) для экономии ресурсов команды продаж.',
        '- **Стратегия победы**: Для одобренных RFP составить ключевые дифференциаторы против основных конкурентов.',
      ],
      [
        '- **Bid/No-Bid Scoring Rubric**: Score opportunity across 4 pillars: Technical Fit, Allocated Budget, Executive Relationship, Gross Margin.',
        '- **Hard Disqualification Threshold**: If composite score fails to reach 70%, trigger an unequivocal No-Bid recommendation.',
        '- **Strategic Differentiation Plan**: For approved bids, highlight proprietary architectural moats and compliance proof points.',
      ]
    ),
  },

  'board-meeting-deck-executive-narrative': {
    id: 'board-meeting-deck-executive-narrative',
    name: 'BoardMeetingDeckExecutiveNarrativeSkill',
    displayName: 'Quarterly Board Meeting Narrative & Governance',
    categoryId: 'business',
    description: 'Structures quarterly board presentations: CEO executive overview, financial P&L, strategic roadblocks, and formal votes.',
    tags: ['business', 'board-deck', 'governance', 'executive', 'investors', 'strategy'],
    transform: createStandardSkillTransform(
      'output_format',
      'Структура Квартального Отчета для Совета Директоров (Board Deck)',
      'Quarterly Board Meeting Executive Narrative & Governance Architecture',
      [
        '- **Сводка CEO (State of the Union)**: 3 главных победы, 3 ключевых вызова и стратегический фокус на следующий квартал.',
        '- **Финансовый блок**: Фактический P&L против бюджета, динамика ARR/EBITDA, сжигание кэша (Burn) и взлетно-посадочная полоса (Runway).',
        '- **Стратегические обсуждения и голосования**: Вопросы, требующие официального одобрения совета (опционы, бюджеты, M&A).',
      ],
      [
        '- **CEO Executive State of the Union**: 3 overarching triumphs, 3 acute operational vulnerabilities, and next quarter strategic North Star.',
        '- **Financial & Runway Ledger**: Actual vs Budget P&L, net burn, ARR expansion rate, and cash runway trajectory.',
        '- **Formal Governance Actions**: Explicit agenda items requiring official board votes (equity grants, debt facilities, major capital opex).',
      ]
    ),
  },

  'plg-product-led-growth-flywheel': {
    id: 'plg-product-led-growth-flywheel',
    name: 'PlgProductLedGrowthFlywheelSkill',
    displayName: 'Product-Led Growth (PLG) Acquisition Flywheel',
    categoryId: 'business',
    description: 'Engineers self-serve product loops: friction-free signup, rapid activation, viral collaboration loops, and in-product monetization gates.',
    tags: ['business', 'plg', 'product-led-growth', 'virality', 'self-serve', 'conversion'],
    transform: createStandardSkillTransform(
      'protocol',
      'Маховик Продуктового Роста (Product-Led Growth Flywheel)',
      'Product-Led Growth (PLG) Self-Serve Flywheel Architecture',
      [
        '- **Бесшовный вход без кредитки**: Вход в 1 клик через Google/GitHub без требования платежных данных.',
        '- **Встроенные виральные петли**: Совместная работа (шаринг дашбордов, инвайты коллег) как естественный драйвер привлечения новых юзеров.',
        '- **Контекстные платные триггеры**: Предлагать апгрейд на Pro-тариф в момент достижения лимита ценности (напр. 5-й проект или экспорт данных).',
      ],
      [
        '- **Zero-Friction Ingestion**: One-click social auth without credit card requirements or multi-screen onboarding hurdles.',
        '- **Inherent Viral Loops**: Collaborative sharing primitives (embeds, team workspace invites) converting viewers into active accounts.',
        '- **Contextual Paywall Fences**: Trigger in-app upgrade dialogs strictly when users hit natural capacity thresholds (usage ceilings).',
      ]
    ),
  },

  'sales-compensation-quota-design': {
    id: 'sales-compensation-quota-design',
    name: 'SalesCompensationQuotaDesignSkill',
    displayName: 'Sales Quota & Commission Incentive Architecture',
    categoryId: 'business',
    description: 'Designs sales compensation plans (OTE, base/variable split, accelerators, clawbacks, SPIFs) driving high-margin revenue.',
    tags: ['business', 'sales-comp', 'quota', 'ote', 'incentives', 'revenue'],
    transform: createStandardSkillTransform(
      'protocol',
      'Проектирование Плана Продаж и Мотивации (Sales Comp & Quota)',
      'Sales Commission & Quota Compensation Architecture',
      [
        '- **Соотношение OTE (Base / Variable)**: Стандарт 50/50 для Account Executives и 70/30 для Sales Engineering.',
        '- **Акселераторы перевыполнения**: Повышенная ставка комиссии (напр. 1.5x) при выполнении квоты свыше 100%.',
        '- **Условия возврата комиссии (Clawback)**: Автоматический возврат выплаченной комиссии, если клиент отменил подписку в течение 90 дней.',
      ],
      [
        '- **On-Target Earnings (OTE) Split**: 50/50 Base-to-Variable ratio for quota-carrying Account Executives; 70/30 for Technical Solutions Architects.',
        '- **Progressive Over-Attainment Accelerators**: 1.5x to 2.0x commission multipliers on revenue booked beyond 100% of quarterly quota.',
        '- **Clawback Protection Invariants**: Enforce mandatory 90-day clawback mechanisms if new enterprise accounts churn within warranty period.',
      ]
    ),
  },

  'strategic-pricing-van-westendorp': {
    id: 'strategic-pricing-van-westendorp',
    name: 'StrategicPricingVanWestendorpSkill',
    displayName: 'Van Westendorp Price Sensitivity Modeling',
    categoryId: 'business',
    description: 'Calculates the Point of Marginal Cheapness, Indifference Price Point, and Optimal Price Point via 4-question sensitivity curves.',
    tags: ['business', 'pricing', 'van-westendorp', 'monetization', 'economics', 'research'],
    transform: createStandardSkillTransform(
      'protocol',
      'Моделирование Чувствительности к Цене (Van Westendorp PSM)',
      'Van Westendorp Price Sensitivity Measurement Protocol',
      [
        '- **4 ключевых вопроса**: 1) Слишком дешево (сомнения в качестве)? 2) Выгодно? 3) Дорого, но приемлемо? 4) Слишком дорого?',
        '- **Точка оптимума (OPP)**: Пересечение кривых «Слишком дорого» и «Слишком дешево» как оптимум готовности платить.',
        '- **Диапазон приемлемых цен**: Ограничить коридор ценообразования между предельной дешевизной и предельной дороговизной.',
      ],
      [
        '- **4 Standard Inquiries**: Solicit price points where offering is: 1) Too Cheap (doubt quality), 2) Bargain, 3) Expensive, 4) Too Expensive.',
        '- **Optimal Price Point (OPP)**: Plot the intersection between "Too Expensive" and "Too Cheap" curves to establish maximum yield pricing.',
        '- **Acceptable Price Range**: Enclose monetization fences between the Point of Marginal Cheapness and Point of Marginal Expensiveness.',
      ]
    ),
  },

  'enterprise-sla-penalty-credit-matrix': {
    id: 'enterprise-sla-penalty-credit-matrix',
    name: 'EnterpriseSlaPenaltyCreditSkill',
    displayName: 'Enterprise SLA & Service Credit Penalty Matrix',
    categoryId: 'business',
    description: 'Establishes legally binding SLA tiers (99.9%, 99.99%) paired with graduated financial service credit penalties for downtime.',
    tags: ['business', 'sla', 'service-credits', 'contracts', 'enterprise', 'uptime'],
    transform: createStandardSkillTransform(
      'output_format',
      'Матрица Корпоративных SLA и Сервисных Кредитов (Service Credits)',
      'Enterprise SLA Tier & Downtime Credit Penalty Matrix',
      [
        '- **Градация доступности**: 99.9% (до 43 минут простоя в месяц) и 99.99% (до 4.3 минут простоя в месяц).',
        '- **Сетка компенсаций**: При 99.0–99.8% — 10% кредита от месячного счета; при < 95.0% — 50% кредита.',
        '- **Исключения и ограничения**: Форс-мажор, плановые техработы с уведомлением за 7 дней и DDoS-атаки не считаются нарушением SLA.',
      ],
      [
        '- **Availability Tiering**: 99.9% availability ceiling (≤43.8 mins monthly downtime) vs. 99.99% mission-critical (≤4.38 mins).',
        '- **Graduated Credit Penalty Matrix**: 99.0%-99.8% = 10% invoice credit; 95.0%-98.9% = 25% credit; <95.0% = 50% max monthly credit.',
        '- **Excused Outage Invariants**: Explicitly exclude declared scheduled maintenance windows, customer DNS misconfigurations, and force majeure.',
      ]
    ),
  },

  'market-entry-ansoff-matrix': {
    id: 'market-entry-ansoff-matrix',
    name: 'MarketEntryAnsoffMatrixSkill',
    displayName: 'Ansoff Market Expansion & Diversification Matrix',
    categoryId: 'business',
    description: 'Analyzes strategic growth across 4 vectors: Market Penetration, Market Development, Product Development, and Diversification.',
    tags: ['business', 'ansoff', 'market-entry', 'strategy', 'expansion', 'growth'],
    transform: createStandardSkillTransform(
      'protocol',
      'Матрица Расширения Рынка Ансоффа (Ansoff Growth Matrix)',
      'Ansoff Market Expansion & Diversification Strategy Protocol',
      [
        '- **Проникновение на рынок (Существующий продукт / Существующий рынок)**: Увеличение доли через маркетинг и вытеснение конкурентов.',
        '- **Развитие рынка (Существующий продукт / Новый рынок)**: Экспансия в новые географические регионы или смежные отрасли.',
        '- **Развитие продукта (Новый продукт / Существующий рынок)**: Кросс-продажи новых модулей текущей лояльной базе клиентов.',
        '- **Диверсификация (Новый продукт / Новый рынок)**: Оценка рисков и венчурных инвестиций в совершенно новые бизнес-модели.',
      ],
      [
        '- **Market Penetration Quadrant**: Maximize market share with existing products in current market via pricing and distribution leverage.',
        '- **Market Development Quadrant**: Export current battle-tested product to novel geographic territories or unexplored enterprise verticals.',
        '- **Product Development Quadrant**: Launch complementary new software modules to monetize high-trust existing customer relationships.',
        '- **Diversification Quadrant**: Rigorously evaluate risk-weighted capital investments launching brand-new offerings into uncharted markets.',
      ]
    ),
  },

  'dcf-discounted-cash-flow-valuation': {
    id: 'dcf-discounted-cash-flow-valuation',
    name: 'DcfDiscountedCashFlowValuationSkill',
    displayName: 'Discounted Cash Flow (DCF) Valuation Model',
    categoryId: 'business',
    description: 'Models intrinsic company valuation using 5-year Free Cash Flow projections, WACC discount rates, and Gordon Growth terminal values.',
    tags: ['business', 'dcf', 'valuation', 'finance', 'cash-flow', 'wacc'],
    transform: createStandardSkillTransform(
      'output_format',
      'Финансовая Модель Дисконтированных Денежных Потоков (DCF)',
      'Discounted Cash Flow (DCF) Financial Valuation Architecture',
      [
        '- **Прогноз Free Cash Flow на 5 лет**: Выручка, операционные расходы, налоги, капитальные затраты (CapEx) и изменения оборотного капитала.',
        '- **Ставка дисконтирования WACC**: Расчет средневзвешенной стоимости капитала с учетом безрисковой ставки и рыночной премии за риск.',
        '- **Терминальная стоимость (Terminal Value)**: Расчет по модели Гордона с долгосрочным темпом роста 2.0–3.0%.',
      ],
      [
        '- **5-Year Free Cash Flow Horizon**: Forecast revenue, opex, depreciation, taxes, capital expenditures (CapEx), and working capital deltas.',
        '- **WACC Discount Rate**: Synthesize Weighted Average Cost of Capital incorporating risk-free sovereign yields and equity risk premiums.',
        '- **Terminal Value (Gordon Growth)**: Calculate terminal enterprise value assuming perpetual conservative GDP growth rates (2.0%-3.0%).',
      ]
    ),
  },

  'retention-cohort-triangulation': {
    id: 'retention-cohort-triangulation',
    name: 'RetentionCohortTriangulationSkill',
    displayName: 'Retention Cohort Analysis & Smile Curve Modeling',
    categoryId: 'business',
    description: 'Evaluates user retention cohorts across weekly/monthly intervals, identifying retention flattening and product-market fit smile curves.',
    tags: ['business', 'retention', 'cohorts', 'pmf', 'analytics', 'churn'],
    transform: createStandardSkillTransform(
      'output_format',
      'Когортный Анализ Удержания Пользователей (Retention Cohorts)',
      'Retention Cohort Analysis & Smile Curve Architecture',
      [
        '- **Помесячные когорты**: Таблица с процентом активных пользователей от M0 до M12 для каждой группы регистрации.',
        '- **Выход на плато**: Проверить, стабилизируется ли кривая удержания (хороший бенчмарк для B2B SaaS: стабилизация выше 40%).',
        '- **Smile Curve (Кривая улыбки)**: Наличие реактивации старых пользователей за счет сетевых эффектов или новых релизов.',
      ],
      [
        '- **Granular Monthly Cohort Ledger**: Render matrix tracking user retention percentage from Day 0 / Month 0 through Month 12.',
        '- **Retention Plateau Verification**: Verify whether cohort retention curves flatten out horizontally (validating Product-Market Fit).',
        '- **Smile Curve Re-engagement**: Diagnose whether cohorts exhibit expansion and resurrection inflection points driven by network effects.',
      ]
    ),
  },

  'b2b-partnership-co-selling-playbook': {
    id: 'b2b-partnership-co-selling-playbook',
    name: 'B2bPartnershipCoSellingSkill',
    displayName: 'B2B Strategic Alliance & Co-Selling Playbook',
    categoryId: 'business',
    description: 'Structures enterprise co-selling alliances: joint value proposition, account mapping rituals, revenue sharing, and sales enablement.',
    tags: ['business', 'partnerships', 'alliances', 'co-selling', 'channel-sales', 'ecosystem'],
    transform: createStandardSkillTransform(
      'protocol',
      'Плейбук Совместных B2B Продаж (Co-Selling Alliance Playbook)',
      'B2B Strategic Alliance & Co-Selling Channel Playbook',
      [
        '- **Совместное ценностное предложение (Better Together)**: Почему клиент должен купить связку решений у обоих партнеров сразу.',
        '- **Account Mapping (Сверка клиентских баз)**: Процесс сопоставления целевых списков компаний в Crossbeam для выявления пересечений.',
        '- **Модель разделения выручки**: Процент комиссионных за интро (10–20%) или реселлерская скидка при прямом выставлении счета.',
      ],
      [
        '- **"Better Together" Joint Value Proposition**: Articulate why combining both vendor platforms yields superior ROI over standalone tools.',
        '- **Account Mapping Cadence**: Establish recurring Crossbeam account overlap reviews identifying overlapping enterprise target accounts.',
        '- **Revenue Share Economics**: Define structured referral fees (10%-20% first year ACV) or reseller margin discounts with conflict resolution rules.',
      ]
    ),
  },

  'customer-success-qbr-health-score': {
    id: 'customer-success-qbr-health-score',
    name: 'CustomerSuccessQbrHealthScoreSkill',
    displayName: 'Customer Success Health Score & QBR Playbook',
    categoryId: 'business',
    description: 'Scores enterprise account health (usage frequency, executive sponsor, support tickets) and structures Quarterly Business Reviews (QBR).',
    tags: ['business', 'customer-success', 'qbr', 'account-health', 'expansion', 'churn'],
    transform: createStandardSkillTransform(
      'protocol',
      'Оценка Здоровья Клиента и Проведение QBR (Customer Success)',
      'Customer Success Health Scoring & Executive QBR Playbook',
      [
        '- **Индекс здоровья аккаунта (Health Score)**: Сводный балл 0–100 на основе активности в продукте, обращений в саппорт и регулярности оплат.',
        '- **Повестка встречи QBR**: 1) Достигнутые бизнес-результаты, 2) Демонстрация ROI, 3) Роадмап на следующий квартал, 4) Планы расширения (Expansion).',
        '- **Раннее обнаружение риска оттока**: Если Health Score падает ниже 50 — немедленный вызов аварийного плейбука удержания.',
      ],
      [
        '- **Composite Account Health Score**: Calculate 0-100 vitality metric synthesizing DAU/MAU frequency, support ticket severity, and renewal dates.',
        '- **Executive QBR Structure**: 1) Realized Business Value vs. Initial Goals, 2) Empirical ROI metrics, 3) Product Roadmap preview, 4) Expansion upsell proposal.',
        '- **Early-Warning Churn Triggers**: Automatically initiate high-touch executive interventions when account score falls below 50.',
      ]
    ),
  },

  'freemium-feature-fence-architecture': {
    id: 'freemium-feature-fence-architecture',
    name: 'FreemiumFeatureFenceSkill',
    displayName: 'Freemium Packaging & Feature Fence Architecture',
    categoryId: 'business',
    description: 'Designs defensible packaging fences separating Free, Pro, and Enterprise tiers (seats, volume, security SSO, compliance).',
    tags: ['business', 'freemium', 'pricing', 'packaging', 'feature-fences', 'monetization'],
    transform: createStandardSkillTransform(
      'protocol',
      'Архитектура Границ Тарифов (Freemium Feature Fences)',
      'Freemium Packaging & Feature Fence Architecture',
      [
        '- **Бесплатный уровень (Free Tier)**: Полноценная функциональность для 1 пользователя с ограничением по объему (до 100 записей в месяц).',
        '- **Тариф Pro (Команды)**: Снятие лимитов объема, совместная работа, расширенная аналитика и приоритетная поддержка.',
        '- **Тариф Enterprise (Корпорации)**: SAML/SSO авторизация, аудит-логи, кастомные SLA, хранение данных в выбранном регионе.',
      ],
      [
        '- **Free Tier Value Anchor**: Complete, non-crippled utility for solo operators bounded strictly by volume quotas (e.g. 100 tasks/mo).',
        '- **Pro Tier Growth Lever**: Remove volume caps, unlock collaborative multi-user permissions, advanced reporting, and priority webhooks.',
        '- **Enterprise Governance Fences**: Gate SAML/SSO authentication, custom data residency, immutable audit trails, and dedicated account management.',
      ]
    ),
  },

  'working-capital-cash-conversion-cycle': {
    id: 'working-capital-cash-conversion-cycle',
    name: 'CashConversionCycleSkill',
    displayName: 'Cash Conversion Cycle (CCC) & Working Capital',
    categoryId: 'business',
    description: 'Calculates and optimizes Days Sales Outstanding (DSO), Days Inventory (DIO), and Days Payable (DPO) to maximize liquidity.',
    tags: ['business', 'cash-conversion', 'dso', 'finance', 'liquidity', 'working-capital'],
    transform: createStandardSkillTransform(
      'protocol',
      'Оптимизация Цикла Конверсии Денег (Cash Conversion Cycle)',
      'Cash Conversion Cycle (CCC) & Working Capital Optimization Protocol',
      [
        '- **Формула CCC**: Cash Conversion Cycle = DIO (дни запасов) + DSO (дни дебиторки) - DPO (дни кредиторки).',
        '- **Ускорение сбора дебиторской задолженности (DSO)**: Переход на предоплату по кредитным картам или скидки за быструю оплату счетов (2/10 Net 30).',
        '- **Удлинение DPO**: Переговоры с вендорами об отсрочке платежа до 60 дней для сохранения бесплатной ликвидности внутри бизнеса.',
      ],
      [
        '- **CCC Formula Invariant**: Cash Conversion Cycle = Days Inventory Outstanding (DIO) + Days Sales Outstanding (DSO) - Days Payable Outstanding (DPO).',
        '- **Receivable Acceleration (Lower DSO)**: Enforce upfront credit card billing, automated billing reminders, and dynamic early-pay discounts (2/10 Net 30).',
        '- **Payable Optimization (Extend DPO)**: Negotiate 60-day vendor payment terms to preserve zero-cost operational cash flow internally.',
      ]
    ),
  },

  'scenario-planning-bear-base-bull': {
    id: 'scenario-planning-bear-base-bull',
    name: 'ScenarioPlanningBearBaseBullSkill',
    displayName: 'Bear, Base & Bull Macro Scenario Planning',
    categoryId: 'business',
    description: 'Stress-tests business plans across three macroeconomic scenarios: Bear (downside survival), Base (realistic), and Bull (aggressive upside).',
    tags: ['business', 'scenario-planning', 'bear-bull', 'macroeconomics', 'financial-model', 'resilience'],
    transform: createStandardSkillTransform(
      'output_format',
      'Сценарное Планирование (Bear, Base, Bull Scenarios)',
      'Macro Scenario Planning (Bear, Base, Bull) Architecture',
      [
        '- **Bear Case (Пессимистичный)**: Падение выручки на 30%, заморозка найма, сокращение расходов, проверка выживаемости без внешних инвестиций.',
        '- **Base Case (Базовый)**: Умеренный рост на 20-30%, плановые операционные расходы, сохранение текущей маржинальности.',
        '- **Bull Case (Оптимистичный)**: Перевыполнение плана на 50%, агрессивное масштабирование команды и инвестиции в новые рынки.',
      ],
      [
        '- **Bear Case (Downside Survival)**: Model 30% top-line contraction, immediate hiring freezes, marketing trim, and zero-external-funding survival.',
        '- **Base Case (Realistic Execution)**: Steady 20%-30% revenue expansion, disciplined head-count ramp, and sustained unit economic margins.',
        '- **Bull Case (Aggressive Upside)**: 50%+ hyper-growth trajectory unlocking aggressive capital re-investment into brand-new market expansion.',
      ]
    ),
  },
  "burn-multiple-capital-efficiency": {
    id: "burn-multiple-capital-efficiency",
    name: "BurnMultipleCapitalEfficiencySkill",
    displayName: "Burn Multiple & Capital Efficiency Indexing",
    categoryId: "business",
    description: "Calculates Net Burn / Net New ARR to assess capital efficiency across venture stages.",
    tags: ["business","finance","burn-multiple","capital-efficiency","venture-capital"],
    transform: createStandardSkillTransform({
      sectionName: "Capital Efficiency & Burn Multiple Analysis",
      ruSectionName: "Анализ эффективности капитала и Burn Multiple",
      instructions: [
        "Calculate Burn Multiple = Net Burn / Net New ARR for monthly and annual cohorts.",
        "Benchmark against SaaS industry tiers (Under 1.0x = Amazing, 1.0-1.5x = Good, 2.0x+ = Dangerous).",
        "Identify actionable headcount, marketing, or vendor levers to optimize the multiple."
],
      ruInstructions: [
        "Рассчитайте Burn Multiple = Чистый Burn / Чистый прирост ARR за периоды.",
        "Сопоставьте с бенчмарками венчурного рынка (<1.0x отлично, >2.0x тревожно).",
        "Определите рычаги оптимизации расходов (ФОТ, маркетинг, вендоры)."
],
      semanticType: 'protocol',
      tags: ["business","finance","burn-multiple","capital-efficiency","venture-capital"],
    }),
  },

  "magic-number-sales-efficiency": {
    id: "magic-number-sales-efficiency",
    name: "MagicNumberSalesEfficiencySkill",
    displayName: "SaaS Magic Number & Go-To-Market Efficiency",
    categoryId: "business",
    description: "Evaluates Sales & Marketing return on investment to determine if go-to-market spending should be scaled or paused.",
    tags: ["business","saas","magic-number","gtm-efficiency","sales-velocity"],
    transform: createStandardSkillTransform({
      sectionName: "SaaS Magic Number Evaluation",
      ruSectionName: "Оценка эффективности продаж (SaaS Magic Number)",
      instructions: [
        "Compute Magic Number = (Q_N Revenue - Q_N-1 Revenue) * 4 / (Q_N-1 S&M Expense).",
        "Interpret readiness to scale (Magic Number > 1.0 indicates green light to accelerate acquisition spend).",
        "Audit CAC payback periods by customer acquisition channel."
],
      ruInstructions: [
        "Рассчитайте Magic Number = (Выручка Q_N - Выручка Q_N-1) * 4 / Расходы S&M Q_N-1.",
        "Сформулируйте вывод о готовности к масштабированию (>1.0x — сигнал к росту инвестиций в продажи).",
        "Проведите аудит окупаемости CAC по отдельным каналам привлечения."
],
      semanticType: 'protocol',
      tags: ["business","saas","magic-number","gtm-efficiency","sales-velocity"],
    }),
  },

  "net-revenue-retention-cohort-audit": {
    id: "net-revenue-retention-cohort-audit",
    name: "NetRevenueRetentionCohortAuditSkill",
    displayName: "Net Revenue Retention (NRR) & Expansion Modeling",
    categoryId: "business",
    description: "Models cohort expansion, gross churn, contraction, and upgrades to project compound organic ARR growth.",
    tags: ["business","nrr","retention","expansion-revenue","churn-modeling"],
    transform: createStandardSkillTransform({
      sectionName: "NRR & Retention Cohort Modeling",
      ruSectionName: "Моделирование когортного удержания выручки (NRR)",
      instructions: [
        "Track cohort revenue: Starting ARR + Expansion - Contraction - Churn = Ending ARR.",
        "Derive Gross Revenue Retention (GRR) and Net Revenue Retention (NRR).",
        "Formulate specific account expansion playbooks (cross-sell, consumption tiers, enterprise add-ons)."
],
      ruInstructions: [
        "Постройте когортную матрицу: Начальный ARR + Расширение - Сжатие - Отток = Конечный ARR.",
        "Рассчитайте показатели GRR и NRR.",
        "Сформируйте план действий по допродажам и апгрейдам в ключевых сегментах."
],
      semanticType: 'protocol',
      tags: ["business","nrr","retention","expansion-revenue","churn-modeling"],
    }),
  },

  "customer-acquisition-cost-payback-matrix": {
    id: "customer-acquisition-cost-payback-matrix",
    name: "CustomerAcquisitionCostPaybackMatrixSkill",
    displayName: "Blended vs Paid CAC & Payback Period Matrix",
    categoryId: "business",
    description: "Disaggregates blended vs fully-loaded paid CAC, computing gross-margin adjusted payback periods.",
    tags: ["business","cac","cac-payback","unit-economics","gross-margin"],
    transform: createStandardSkillTransform({
      sectionName: "CAC & Payback Period Disaggregation",
      ruSectionName: "Детализация CAC и периода окупаемости с учетом маржинальности",
      instructions: [
        "Calculate Fully Loaded Paid CAC (including sales salaries, software stack, and agency fees).",
        "Compute Gross Margin Adjusted Payback Period = CAC / (ARPU * Gross Margin %).",
        "Highlight payback risk thresholds across customer segments."
],
      ruInstructions: [
        "Рассчитайте Fully-Loaded CAC (с учетом ФОТ сейлзов, комиссий и инструментов).",
        "Вычислите период окупаемости: CAC / (ARPU * % Валовой маржи).",
        "Выявите пороги риска окупаемости по типам клиентов."
],
      semanticType: 'protocol',
      tags: ["business","cac","cac-payback","unit-economics","gross-margin"],
    }),
  },

  "b2b-enterprise-deal-meddpicc-scorecard": {
    id: "b2b-enterprise-deal-meddpicc-scorecard",
    name: "B2bEnterpriseDealMeddpiccScorecardSkill",
    displayName: "MEDDPICC Enterprise Deal Qualification",
    categoryId: "business",
    description: "Audits complex enterprise pipeline deals across Metrics, Economic Buyer, Decision Criteria/Process, Paper Process, Pain, and Champion.",
    tags: ["business","sales","meddpicc","enterprise-deals","qualification"],
    transform: createStandardSkillTransform({
      sectionName: "MEDDPICC Qualification Audit",
      ruSectionName: "Квалификация enterprise-сделок по методологии MEDDPICC",
      instructions: [
        "Score each deal dimension: Metrics, Economic Buyer, Decision Criteria, Decision Process, Paper Process, Identified Pain, Champion, Competition.",
        "Flag deal-killing blind spots (e.g., lack of access to the economic buyer, unmapped procurement cycles).",
        "Define immediate closing actions to mitigate unvalidated criteria."
],
      ruInstructions: [
        "Оцените сделку по каждому фактору MEDDPICC (метрики, ЛПР, критерии, процесс, боли, чемпион, конкуренты).",
        "Выделите критические риски (отсутствие доступа к бюджетодержателю, неясный цикл закупки).",
        "Составьте пошаговый план закрытия пробелов до дедлайна квартала."
],
      semanticType: 'protocol',
      tags: ["business","sales","meddpicc","enterprise-deals","qualification"],
    }),
  },

  "rule-of-40-saas-valuation-optimizer": {
    id: "rule-of-40-saas-valuation-optimizer",
    name: "RuleOf40SaasValuationOptimizerSkill",
    displayName: "Rule of 40 & SaaS Valuation Multiplier Tuning",
    categoryId: "business",
    description: "Balances YoY revenue growth rate against Free Cash Flow margin to maximize public/private market valuation multiples.",
    tags: ["business","rule-of-40","saas-metrics","valuation","fcf-margin"],
    transform: createStandardSkillTransform({
      sectionName: "Rule of 40 Optimization Analysis",
      ruSectionName: "Оптимизация Rule of 40 и мультипликаторов оценки",
      instructions: [
        "Calculate Score = YoY Revenue Growth % + Free Cash Flow Margin %.",
        "Assess corporate health against the 40% benchmark under current market conditions.",
        "Determine whether capital allocation should pivot toward accelerated growth or cash preservation."
],
      ruInstructions: [
        "Рассчитайте показатель: Темп роста выручки % + Маржа FCF %.",
        "Оцените положение компании относительно целевой планки 40%.",
        "Сформируйте рекомендации по перебалансировке ресурсов между ростом и рентабельностью."
],
      semanticType: 'protocol',
      tags: ["business","rule-of-40","saas-metrics","valuation","fcf-margin"],
    }),
  },

  "tam-sam-som-market-sizing-triangulation": {
    id: "tam-sam-som-market-sizing-triangulation",
    name: "TamSamSomMarketSizingTriangulationSkill",
    displayName: "TAM / SAM / SOM Market Sizing Triangulation",
    categoryId: "business",
    description: "Triangulates addressable market sizing using top-down industry reports, bottom-up unit pricing, and value-theory models.",
    tags: ["business","market-sizing","tam","sam","som","investor-readiness"],
    transform: createStandardSkillTransform({
      sectionName: "TAM / SAM / SOM Triangulation Protocol",
      ruSectionName: "Триангуляция оценки объема рынка (TAM / SAM / SOM)",
      instructions: [
        "Calculate Bottom-Up Market Size: Total Count of Target Accounts * Realistic Annual Contract Value (ACV).",
        "Compare against Top-Down industry analyst figures and highlight discrepancies.",
        "Define the Serviceable Obtainable Market (SOM) based on practical 3-year distribution capacity."
],
      ruInstructions: [
        "Рассчитайте рынок снизу-вверх: Количество потенциальных клиентов * Реалистичный ACV.",
        "Сопоставьте с отраслевыми отчетами сверху-вниз и обоснуйте расхождения.",
        "Определите достижимый рынок SOM с учетом фактических каналов продаж за 3 года."
],
      semanticType: 'protocol',
      tags: ["business","market-sizing","tam","sam","som","investor-readiness"],
    }),
  },

  "van-westendorp-pricing-sensitivity": {
    id: "van-westendorp-pricing-sensitivity",
    name: "VanWestendorpPricingSensitivitySkill",
    displayName: "Van Westendorp Price Sensitivity Meter (PSM)",
    categoryId: "business",
    description: "Determines the Point of Marginal Cheapness, Optimal Price Point, and Indifference Price Point from customer survey data.",
    tags: ["business","pricing","van-westendorp","psm","willingness-to-pay"],
    transform: createStandardSkillTransform({
      sectionName: "Van Westendorp Price Sensitivity Analysis",
      ruSectionName: "Анализ ценовой чувствительности по Ван Вестендорпу",
      instructions: [
        "Map the four survey curves: Too Cheap, Cheap (Bargain), Expensive, Too Expensive.",
        "Identify the Optimal Price Point (OPP) and Point of Marginal Expensiveness (PME).",
        "Provide package tiering recommendations based on price elasticity inflection points."
],
      ruInstructions: [
        "Постройте 4 кривые восприятия: Слишком дешево, Выгодно, Дорого, Слишком дорого.",
        "Определите оптимальную цену (OPP) и предельную цену дороговизны (PME).",
        "Сформулируйте структуру тарифной сетки с учетом эластичности спроса."
],
      semanticType: 'protocol',
      tags: ["business","pricing","van-westendorp","psm","willingness-to-pay"],
    }),
  },

  "cap-table-dilution-scenario-modeler": {
    id: "cap-table-dilution-scenario-modeler",
    name: "CapTableDilutionScenarioModelerSkill",
    displayName: "Cap Table Dilution & Waterfall Modeling",
    categoryId: "business",
    description: "Models SAFE conversion, ESOP option pool creation, liquidation preferences, and multi-round founder dilution waterfalls.",
    tags: ["business","cap-table","dilution","safe-note","liquidation-preference"],
    transform: createStandardSkillTransform({
      sectionName: "Cap Table & Dilution Waterfall Modeling",
      ruSectionName: "Моделирование таблицы долей (Cap Table) и сценариев размытия",
      instructions: [
        "Model pre-money vs post-money SAFE note conversions including valuation caps and discount rates.",
        "Simulate unallocated ESOP expansion impact on existing common stockholders.",
        "Calculate liquidation waterfall payouts across 1x Non-Participating vs Participating Preferred tiers."
],
      ruInstructions: [
        "Смоделируйте конвертацию SAFE с учетом valuation cap и дисконта (pre vs post-money).",
        "Рассчитайте влияние расширения опционного пула ESOP на долю основателей.",
        "Постройте водопад выплат при различных сценариях экзита с учетом преференций."
],
      semanticType: 'protocol',
      tags: ["business","cap-table","dilution","safe-note","liquidation-preference"],
    }),
  },

  "rfp-enterprise-proposal-evaluator": {
    id: "rfp-enterprise-proposal-evaluator",
    name: "RfpEnterpriseProposalEvaluatorSkill",
    displayName: "RFP Response Architecture & Compliance Matrix",
    categoryId: "business",
    description: "Structures enterprise RFP responses with compliant traceability matrices, executive summaries, and technical proof points.",
    tags: ["business","rfp","procurement","proposals","enterprise-sales"],
    transform: createStandardSkillTransform({
      sectionName: "Enterprise RFP Response Framework",
      ruSectionName: "Структура ответов на RFP и комплаенс-матрица",
      instructions: [
        "Build a Requirements Traceability Matrix matching every RFP clause to solution features.",
        "Draft high-impact Executive Summaries spotlighting direct ROI and risk elimination.",
        "Validate SLA, security, and integration compliance commitments."
],
      ruInstructions: [
        "Составьте матрицу соответствия требований RFP функционалу продукта.",
        "Напишите executive summary с фокусом на финансовый ROI и устранение операционных рисков.",
        "Проверьте соответствие заявленных SLA, протоколов безопасности и интеграций."
],
      semanticType: 'protocol',
      tags: ["business","rfp","procurement","proposals","enterprise-sales"],
    }),
  },

  "plg-self-serve-funnel-optimizer": {
    id: "plg-self-serve-funnel-optimizer",
    name: "PlgSelfServeFunnelOptimizerSkill",
    displayName: "Product-Led Growth (PLG) Funnel & Time-to-Value",
    categoryId: "business",
    description: "Optimizes self-serve conversion funnels, onboarding aha-moments, product-qualified leads (PQL), and freemium upgrade triggers.",
    tags: ["business","plg","product-led-growth","pql","time-to-value","activation"],
    transform: createStandardSkillTransform({
      sectionName: "PLG Funnel & Activation Optimization",
      ruSectionName: "Оптимизация PLG-воронки и пути к Time-to-Value",
      instructions: [
        "Map Time-to-Value (TTV) and identify steps causing early drop-off.",
        "Define strict Product-Qualified Lead (PQL) behavioral criteria triggering sales outreach.",
        "Engineer contextual in-app paywalls and feature limits aligned with user value milestones."
],
      ruInstructions: [
        "Измерьте Time-to-Value (TTV) и устраните барьеры в онбординге.",
        "Сформулируйте триггеры PQL (Product-Qualified Lead) для передачи пользователей в продажи.",
        "Спроектируйте нативные пейволлы и лимиты, активируемые в моменты максимальной ценности."
],
      semanticType: 'protocol',
      tags: ["business","plg","product-led-growth","pql","time-to-value","activation"],
    }),
  },

  "seven-powers-competitive-moat-audit": {
    id: "seven-powers-competitive-moat-audit",
    name: "SevenPowersCompetitiveMoatAuditSkill",
    displayName: "Helmer 7 Powers Moat & Defensibility Audit",
    categoryId: "business",
    description: "Applies Hamilton Helmer’s 7 Powers framework (Scale Economies, Network Effects, Counter-Positioning, Switching Costs, Branding, Cornered Resource, Process Power).",
    tags: ["business","7-powers","competitive-advantage","strategy","moat"],
    transform: createStandardSkillTransform({
      sectionName: "7 Powers Defensibility Audit",
      ruSectionName: "Аудит стратегических барьеров по модели 7 Powers",
      instructions: [
        "Audit the business against all 7 Powers and score current vs durable defensibility.",
        "Identify structural counter-positioning opportunities against incumbents.",
        "Draft a strategy roadmap to build high-switching-cost flywheels."
],
      ruInstructions: [
        "Оцените силу компании по 7 факторам Хелмера (сетевые эффекты, контр-позиционирование, издержки переключения и т.д.).",
        "Найдите точки структурного контр-позиционирования против лидеров рынка.",
        "Сформируйте план построения долгосрочных защитных рвов вокруг продукта."
],
      semanticType: 'protocol',
      tags: ["business","7-powers","competitive-advantage","strategy","moat"],
    }),
  },

  "b2b-customer-success-health-scorecard": {
    id: "b2b-customer-success-health-scorecard",
    name: "B2bCustomerSuccessHealthScorecardSkill",
    displayName: "B2B Customer Health Scoring & Churn Early Warning",
    categoryId: "business",
    description: "Combines telemetry, support ticket velocity, NPS, license utilization, and champion departures into an automated account health score.",
    tags: ["business","customer-success","health-score","churn-prevention","retention"],
    transform: createStandardSkillTransform({
      sectionName: "Customer Health Scoring Protocol",
      ruSectionName: "Скоринг здоровья B2B-клиентов и ранее предупреждение оттока",
      instructions: [
        "Aggregate 5 health pillars: Feature Adoption %, Active Users / Total Seats, Ticket Escalation Count, Executive Engagement, Invoice Payment Timeliness.",
        "Classify accounts into Red, Yellow, Green status with automated alert triggers.",
        "Specify immediate intervention playbooks for at-risk enterprise accounts."
],
      ruInstructions: [
        "Объедините метрики здоровья: % использования фичей, утилизация лицензий, эскалации тикетов, контакт с ЛПР.",
        "Классифицируйте аккаунты (Red / Yellow / Green) с автоматическими алертами.",
        "Назначьте регламенты спасения и удержания для клиентов в красной зоне."
],
      semanticType: "process_directive",
      tags: ["business","customer-success","health-score","churn-prevention","retention"],
    }),
  },

  "m-and-a-commercial-due-diligence": {
    id: "m-and-a-commercial-due-diligence",
    name: "MAndACommercialDueDiligenceSkill",
    displayName: "M&A Commercial Due Diligence & Synergy Analysis",
    categoryId: "business",
    description: "Evaluates acquisition targets for customer concentration risks, tech stack debt, recurring revenue quality, and cost/revenue synergies.",
    tags: ["business","m-and-a","due-diligence","synergies","private-equity"],
    transform: createStandardSkillTransform({
      sectionName: "Commercial Due Diligence Matrix",
      ruSectionName: "Коммерческий Due Diligence и анализ синергий при слияниях",
      instructions: [
        "Analyze customer concentration (e.g. top 5 accounts > 30% revenue risk).",
        "Audit churn cohorts and cohort lifetime value (LTV/CAC durability).",
        "Quantify realistic Year 1-3 cost synergies and cross-sell revenue synergies."
],
      ruInstructions: [
        "Проанализируйте концентрацию выручки на ключевых клиентах (риск ухода топ-5).",
        "Проверьте устойчивость когорт LTV/CAC и исторический отток.",
        "Количественно оцените синергии расходов и перекрестных продаж на горизонте 1-3 лет."
],
      semanticType: 'protocol',
      tags: ["business","m-and-a","due-diligence","synergies","private-equity"],
    }),
  },

  "partner-ecosystem-co-sell-framework": {
    id: "partner-ecosystem-co-sell-framework",
    name: "PartnerEcosystemCoSellFrameworkSkill",
    displayName: "Channel Partner & Co-Selling Ecosystem Framework",
    categoryId: "business",
    description: "Designs reseller tiering, margin sharing, marketplace listings (AWS, Azure, GCP), and joint co-selling incentive structures.",
    tags: ["business","partnerships","co-sell","channel-sales","alliances"],
    transform: createStandardSkillTransform({
      sectionName: "Co-Sell & Partner Channel Architecture",
      ruSectionName: "Архитектура партнерских продаж и совместного со-селлинга",
      instructions: [
        "Establish partner tiers (Referral, Certified Reseller, Strategic Global Integrator).",
        "Define margin splits, lead-registration rules, and conflict resolution protocols.",
        "Structure cloud marketplace listings with private offers and committed spend drawdown."
],
      ruInstructions: [
        "Определите партнерские уровни (реферальные партнеры, интеграторы, глобальные альянсы).",
        "Сформулируйте маржинальные схемы, правила защиты сделок и урегулирования конфликтов.",
        "Настройте каналы через облачные маркетплейсы с списанием с коммитментов клиентов."
],
      semanticType: 'protocol',
      tags: ["business","partnerships","co-sell","channel-sales","alliances"],
    }),
  },

  "dynamic-surge-pricing-algorithm-design": {
    id: "dynamic-surge-pricing-algorithm-design",
    name: "DynamicSurgePricingAlgorithmDesignSkill",
    displayName: "Dynamic Surge & Demand-Based Pricing Logic",
    categoryId: "business",
    description: "Formulates algorithmic pricing rules adapting to real-time supply scarcity, demand spikes, inventory perishability, and competitor movements.",
    tags: ["business","pricing","dynamic-pricing","yield-management","algorithms"],
    transform: createStandardSkillTransform({
      sectionName: "Dynamic Pricing & Yield Management",
      ruSectionName: "Динамическое ценообразование и управление доходностью",
      instructions: [
        "Specify input variables: Current Demand Velocity, Available Capacity %, Competitor Floor/Ceiling, Historical Elasticity.",
        "Define floor/ceiling safety boundaries preventing customer backlash or price gouging.",
        "Set automated throttling and smoothing functions across time intervals."
],
      ruInstructions: [
        "Определите входные переменные (скорость спроса, загрузка мощностей, цены конкурентов).",
        "Задайте жесткие защитные коридоры (min/max), предотвращающие негатив клиентов.",
        "Опишите алгоритм сглаживания цен во избежание резких скачков."
],
      semanticType: "process_directive",
      tags: ["business","pricing","dynamic-pricing","yield-management","algorithms"],
    }),
  },

  "sales-compensation-quota-commission-model": {
    id: "sales-compensation-quota-commission-model",
    name: "SalesCompensationQuotaCommissionModelSkill",
    displayName: "Sales Compensation, OTE & Commission Accelerator Modeling",
    categoryId: "business",
    description: "Designs rep compensation plans with base/variable splits, On-Target Earnings (OTE), quota-to-OTE ratios, and multi-tier accelerators.",
    tags: ["business","sales-ops","compensation","commissions","quota-planning"],
    transform: createStandardSkillTransform({
      sectionName: "Sales Compensation Plan Architecture",
      ruSectionName: "Архитектура планов мотивации и комиссионных сейлзов",
      instructions: [
        "Set target Base/Variable split (e.g. 50/50 for AEs, 70/30 for AMs) and Quota:OTE multiple (4x-6x).",
        "Design graduated commission accelerators (e.g. 1.5x at 100-120% quota, 2.0x above 120%).",
        "Incorporate clawback terms for cancellations occurring within initial contract windows."
],
      ruInstructions: [
        "Установите пропорцию фикс/бонус (50/50 для AE, 70/30 для AM) и коэффициент Quota:OTE (4x-6x).",
        "Спроектируйте ступени акселераторов за перевыполнение плана (1.5x при 100-120%, 2x свыше 120%).",
        "Внедрите условия возврата комиссионных (clawback) при досрочном расторжении контрактов."
],
      semanticType: 'protocol',
      tags: ["business","sales-ops","compensation","commissions","quota-planning"],
    }),
  },

  "esg-sustainability-roi-reporting-framework": {
    id: "esg-sustainability-roi-reporting-framework",
    name: "EsgSustainabilityRoiReportingFrameworkSkill",
    displayName: "ESG Sustainability & Carbon Accounting ROI",
    categoryId: "business",
    description: "Quantifies Scope 1-3 emissions reduction ROI, sustainable procurement impact, and compliance readiness for ESG capital mandates.",
    tags: ["business","esg","sustainability","carbon-accounting","corporate-governance"],
    transform: createStandardSkillTransform({
      sectionName: "ESG ROI & Carbon Accounting Framework",
      ruSectionName: "Оценка ROI устойчивого развития (ESG) и углеродного учета",
      instructions: [
        "Establish Scope 1, 2, and 3 baseline reporting workflows.",
        "Link ESG investments directly to cost savings (energy reduction, material efficiency) and lower debt financing costs.",
        "Prepare auditable compliance disclosures aligned with CSRD and SEC climate rules."
],
      ruInstructions: [
        "Сформируйте контур учета выбросов Scope 1, 2 и 3.",
        "Свяжите экологические инициативы с сокращением издержек и снижением ставки по кредитам.",
        "Подготовьте прозрачную отчетность по стандартам CSRD и климатическим директивам."
],
      semanticType: 'protocol',
      tags: ["business","esg","sustainability","carbon-accounting","corporate-governance"],
    }),
  },

  "crisis-business-continuity-disaster-recovery": {
    id: "crisis-business-continuity-disaster-recovery",
    name: "CrisisBusinessContinuityDisasterRecoverySkill",
    displayName: "Business Continuity Plan (BCP) & Financial Contingency",
    categoryId: "business",
    description: "Drafts operational and financial disaster recovery playbooks for severe macroeconomic shocks, runway shortfalls, and supply cutoffs.",
    tags: ["business","bcp","disaster-recovery","crisis-management","contingency-planning"],
    transform: createStandardSkillTransform({
      sectionName: "Business Continuity & Crisis Contingency",
      ruSectionName: "План непрерывности бизнеса и кризисное финансовое планирование",
      instructions: [
        "Map critical business functions, Recovery Time Objectives (RTO), and minimum viable operations.",
        "Model 3 severe downside cash scenarios (e.g. 50% revenue drop) with immediate cost reduction triggers.",
        "Establish clear crisis decision-making command hierarchies and external stakeholder communication sequences."
],
      ruInstructions: [
        "Определите критические функции, целевое время восстановления (RTO) и минимальный рабочий режим.",
        "Смоделируйте стресс-сценарии движения денег (падение выручки на 50%) с автоматическими триггерами сокращения расходов.",
        "Установите цепочку принятия решений в кризисе и протокол коммуникации с инвесторами и клиентами."
],
      semanticType: 'protocol',
      tags: ["business","bcp","disaster-recovery","crisis-management","contingency-planning"],
    }),
  },
  "business-b2b-saas-magic-number-efficiency": {
    id: "business-b2b-saas-magic-number-efficiency",
    name: "BusinessB2bSaasMagicNumberEfficiencySkill",
    displayName: "B2B SaaS Sales Efficiency & Magic Number Benchmarking",
    categoryId: "business",
    description: "Calculates SaaS Magic Number, CAC Payback, Rule of 40, and Net New ARR per sales dollar deployed.",
    tags: ["business","saas","sales-efficiency","metrics","finance"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["business","saas","sales-efficiency","metrics","finance"],
    }),
  },

  "business-blue-ocean-strategy-canvas-four-actions": {
    id: "business-blue-ocean-strategy-canvas-four-actions",
    name: "BusinessBlueOceanStrategyCanvasFourActionsSkill",
    displayName: "Blue Ocean Strategy Canvas & Four Actions Framework (ERRC)",
    categoryId: "business",
    description: "Identifies uncontested market space using the Eliminate-Reduce-Raise-Create (ERRC) grid to break the cost-value trade-off.",
    tags: ["business","strategy","blue-ocean","errc","innovation"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["business","strategy","blue-ocean","errc","innovation"],
    }),
  },

  "business-flywheel-effect-jim-collins": {
    id: "business-flywheel-effect-jim-collins",
    name: "BusinessFlywheelEffectJimCollinsSkill",
    displayName: "Jim Collins Compounding Business Flywheel Architecture",
    categoryId: "business",
    description: "Maps interconnected business virtuous cycles where every turning of the wheel compounds momentum and lowers unit friction.",
    tags: ["business","strategy","flywheel","jim-collins","growth"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["business","strategy","flywheel","jim-collins","growth"],
    }),
  },

  "business-cohort-retention-triangle-analysis": {
    id: "business-cohort-retention-triangle-analysis",
    name: "BusinessCohortRetentionTriangleAnalysisSkill",
    displayName: "Cohort Retention Triangular Heatmap & Decay Curve Analysis",
    categoryId: "business",
    description: "Analyzes monthly customer cohort retention decay curves, asymptotic flattening, and smile-curve resurrection dynamics.",
    tags: ["business","cohort-analysis","retention","analytics","saas"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["business","cohort-analysis","retention","analytics","saas"],
    }),
  },

  "business-three-horizons-mckinsey-growth": {
    id: "business-three-horizons-mckinsey-growth",
    name: "BusinessThreeHorizonsMckinseyGrowthSkill",
    displayName: "McKinsey Three Horizons of Growth Portfolio Framework",
    categoryId: "business",
    description: "Allocates corporate capital and talent across Horizon 1 (core cash cows), Horizon 2 (emerging scaling bets), and Horizon 3 (frontier options).",
    tags: ["business","strategy","growth","mckinsey","capital-allocation"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["business","strategy","growth","mckinsey","capital-allocation"],
    }),
  },

  "business-land-and-expand-enterprise-strategy": {
    id: "business-land-and-expand-enterprise-strategy",
    name: "BusinessLandAndExpandEnterpriseStrategySkill",
    displayName: "Land and Expand Enterprise Sales Expansion Framework",
    categoryId: "business",
    description: "Enters enterprise accounts with low-friction departmental beachheads and systematically expands into org-wide site licenses.",
    tags: ["business","sales","enterprise","expansion","saas"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["business","sales","enterprise","expansion","saas"],
    }),
  },

  "business-zero-based-budgeting-operational-rigor": {
    id: "business-zero-based-budgeting-operational-rigor",
    name: "BusinessZeroBasedBudgetingOperationalRigorSkill",
    displayName: "Zero-Based Budgeting (ZBB) & Operating Cost Optimization",
    categoryId: "business",
    description: "Rebuilds department budgets from zero every planning cycle, requiring explicit operational justification for every cost item.",
    tags: ["business","finance","budgeting","cost-optimization","operations"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["business","finance","budgeting","cost-optimization","operations"],
    }),
  },

  "business-van-westendorp-price-sensitivity-meter": {
    id: "business-van-westendorp-price-sensitivity-meter",
    name: "BusinessVanWestendorpPriceSensitivityMeterSkill",
    displayName: "Van Westendorp Price Sensitivity Meter (PSM) Optimization",
    categoryId: "business",
    description: "Determines acceptable price ranges and point of marginal cheapness/expensiveness using the 4-question PSM survey methodology.",
    tags: ["business","pricing","market-research","monetization","strategy"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["business","pricing","market-research","monetization","strategy"],
    }),
  },

  "business-clayton-christensen-disruptive-innovation": {
    id: "business-clayton-christensen-disruptive-innovation",
    name: "BusinessClaytonChristensenDisruptiveInnovationSkill",
    displayName: "Clayton Christensen Low-End & New-Market Disruptive Innovation",
    categoryId: "business",
    description: "Analyzes how simpler, cheaper, and more accessible technologies enter underserved market bottoms and unseat incumbents.",
    tags: ["business","innovation","disruption","christensen","strategy"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["business","innovation","disruption","christensen","strategy"],
    }),
  },

  "business-burn-multiple-capital-efficiency": {
    id: "business-burn-multiple-capital-efficiency",
    name: "BusinessBurnMultipleCapitalEfficiencySkill",
    displayName: "David Sacks Burn Multiple & Capital Efficiency Matrix",
    categoryId: "business",
    description: "Evaluates venture startup capital efficiency: `Net Burn / Net New ARR`, categorizing capital discipline from Amazing to Toxic.",
    tags: ["business","burn-multiple","capital-efficiency","venture-capital","startups"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["business","burn-multiple","capital-efficiency","venture-capital","startups"],
    }),
  },

  "business-bcg-growth-share-matrix": {
    id: "business-bcg-growth-share-matrix",
    name: "BusinessBcgGrowthShareMatrixSkill",
    displayName: "BCG Growth-Share Matrix (Stars, Cash Cows, Question Marks, Dogs)",
    categoryId: "business",
    description: "Evaluates multi-product corporate portfolios by relative market share and market growth rates to allocate cash effectively.",
    tags: ["business","bcg-matrix","portfolio-strategy","strategy","growth"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["business","bcg-matrix","portfolio-strategy","strategy","growth"],
    }),
  },

  "business-product-led-growth-plg-flywheel": {
    id: "business-product-led-growth-plg-flywheel",
    name: "BusinessProductLedGrowthPlgFlywheelSkill",
    displayName: "Product-Led Growth (PLG) Acquisition, Activation & Expansion",
    categoryId: "business",
    description: "Drives software distribution through self-serve product experience, viral collaboration loops, and usage-based expansion.",
    tags: ["business","plg","product-led-growth","self-serve","virality"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["business","plg","product-led-growth","self-serve","virality"],
    }),
  },

  "business-gross-margin-profile-unit-economics": {
    id: "business-gross-margin-profile-unit-economics",
    name: "BusinessGrossMarginProfileUnitEconomicsSkill",
    displayName: "Gross Margin Profile & Cost of Goods Sold (COGS) Structuring",
    categoryId: "business",
    description: "Structures COGS (cloud hosting, third-party LLM API tokens, customer support) to target healthy 75%+ software gross margins.",
    tags: ["business","gross-margin","cogs","finance","unit-economics"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["business","gross-margin","cogs","finance","unit-economics"],
    }),
  },

  "business-crossing-the-chasm-moore": {
    id: "business-crossing-the-chasm-moore",
    name: "BusinessCrossingTheChasmMooreSkill",
    displayName: "Geoffrey Moore 'Crossing the Chasm' Technology Adoption Curve",
    categoryId: "business",
    description: "Guides tech startups transitioning from enthusiastic Early Adopters to risk-averse Pragmatists using the Whole Product solution.",
    tags: ["business","crossing-the-chasm","go-to-market","marketing","strategy"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["business","crossing-the-chasm","go-to-market","marketing","strategy"],
    }),
  },

  "business-dunbar-number-organizational-scaling": {
    id: "business-dunbar-number-organizational-scaling",
    name: "BusinessDunbarNumberOrganizationalScalingSkill",
    displayName: "Dunbar's Number & Organizational Scaling Inflection Points",
    categoryId: "business",
    description: "Restructures communication, management hierarchy, and cultural rituals at key team size thresholds: 15, 50, 150, 500.",
    tags: ["business","organizational-design","scaling","management","culture"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["business","organizational-design","scaling","management","culture"],
    }),
  },

  "business-dynamic-pricing-yield-management": {
    id: "business-dynamic-pricing-yield-management",
    name: "BusinessDynamicPricingYieldManagementSkill",
    displayName: "Dynamic Pricing & Perishable Inventory Yield Management",
    categoryId: "business",
    description: "Maximizes revenue for time-sensitive, perishable capacity (compute spot instances, hotel rooms, airline seats) via elasticity models.",
    tags: ["business","pricing","yield-management","revenue-management","analytics"],
    transform: createStandardSkillTransform({
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
      semanticType: "structural_directive",
      tags: ["business","pricing","yield-management","revenue-management","analytics"],
    }),
  },
  "business-b2b-procurement-vendor-vetting": {
    id: "business-b2b-procurement-vendor-vetting",
    name: "BusinessB2bProcurementVendorVettingSkill",
    displayName: "Enterprise Procurement & Vendor Risk Assessment",
    categoryId: "business",
    description: "Evaluates third-party vendor financial solvency, concentration risk, SLA penalty structures, and business continuity readiness.",
    tags: ["business","procurement","vendor-management","risk","operations"],
    transform: createStandardSkillTransform({
      sectionName: "Enterprise Vendor Procurement Standards",
      ruSectionName: "Оценка надежности поставщиков и аудит вендорских рисков (Procurement)",
      instructions: [
        "Assess vendor balance sheet liquidity, insurance liability limits, and single-point-of-failure exposure.",
        "Incorporate financial clawbacks and penalty credits tied to uptime SLA breaches.",
        "Mandate quarterly disaster recovery simulation proof and escrow of source code/data."
],
      ruInstructions: [
        "Оценивайте финансовую устойчивость поставщика, лимиты страхования и риски зависимости от единственного вендора.",
        "Включайте в договор штрафные санкции и финансовые компенсации за нарушение SLA доступности.",
        "Требуйте регулярных отчетов об учениях по аварийному восстановлению и депонирование исходного кода (Escrow)."
],
      semanticType: "structural_directive",
      tags: ["business","procurement","vendor-management","risk","operations"],
    }),
  },

  "business-freemium-conversion-paywall-optimization": {
    id: "business-freemium-conversion-paywall-optimization",
    name: "BusinessFreemiumConversionPaywallOptimizationSkill",
    displayName: "Freemium-to-Paid Conversion & Paywall Placement Optimization",
    categoryId: "business",
    description: "Structures feature gating, usage limits, reverse trials, and contextual upgrade triggers to maximize conversion without alienating free users.",
    tags: ["business","freemium","monetization","paywall","conversion"],
    transform: createStandardSkillTransform({
      sectionName: "Freemium Conversion & Paywall Standards",
      ruSectionName: "Оптимизация конверсии Freemium-to-Paid и дизайн пейволлов",
      instructions: [
        "Gate features at the moment of highest perceived value, not at random onboarding steps.",
        "Implement 14-day Reverse Trials (all pro features unlocked initially) to drive habituation.",
        "Provide transparent soft-cap notifications before locking user workflows."
],
      ruInstructions: [
        "Показывайте пейволл в момент максимальной ощущаемой ценности функции, а не на первых шагах регистрации.",
        "Используйте реверсивные триалы (Reverse Trials: полный Pro-доступ на 14 дней) для формирования привычки.",
        "Предупреждайте о приближении к лимиту использования заранее, исключая внезапные блокировки."
],
      semanticType: "structural_directive",
      tags: ["business","freemium","monetization","paywall","conversion"],
    }),
  },

  "business-net-promoter-score-nps-closed-loop": {
    id: "business-net-promoter-score-nps-closed-loop",
    name: "BusinessNetPromoterScoreNpsClosedLoopSkill",
    displayName: "Net Promoter Score (NPS) Closed-Loop Operational System",
    categoryId: "business",
    description: "Segments customer feedback into Promoters (9-10), Passives (7-8), and Detractors (0-6), triggering immediate executive follow-ups.",
    tags: ["business","nps","customer-success","feedback","retention"],
    transform: createStandardSkillTransform({
      sectionName: "Closed-Loop NPS Operational Standards",
      ruSectionName: "Операционная система работы с NPS (Закрытие цикла обратной связи)",
      instructions: [
        "Trigger automated 24-hour escalation workflows for Detractor scores (<7) with personal executive outreach.",
        "Convert Promoters (9-10) directly into G2/Capterra reviews, case study candidates, and referral advocates.",
        "Categorize qualitative feedback themes systematically into product bug vs feature request backlogs."
],
      ruInstructions: [
        "Автоматически эскалируйте оценки критиков (Detractors) руководству с личным звонком в течение 24 часов.",
        "Направляйте промоутеров (Promoters) на платформы отзывов (G2, Trustpilot) и в реферальную программу.",
        "Систематизируйте текстовые комментарии по категориям: баги, пробелы функционала, ценовые барьеры."
],
      semanticType: "structural_directive",
      tags: ["business","nps","customer-success","feedback","retention"],
    }),
  },

  "business-franchise-model-unit-economics-replication": {
    id: "business-franchise-model-unit-economics-replication",
    name: "BusinessFranchiseModelUnitEconomicsReplicationSkill",
    displayName: "Franchise Playbook & Unit Economics Replication Standards",
    categoryId: "business",
    description: "Standardizes four-wall EBITDA, royalty fee structures, territory exclusivity, and operational SOPs for scalable franchising.",
    tags: ["business","franchising","operations","scaling","retail"],
    transform: createStandardSkillTransform({
      sectionName: "Franchise Model & Replication Blueprint",
      ruSectionName: "Стандарты тиражирования бизнеса по франшизе (Four-Wall EBITDA, SOP)",
      instructions: [
        "Prove 4-wall EBITDA profitability and payback under 24 months across 3 distinct corporate-owned locations before franchising.",
        "Document every operational standard operating procedure (SOP) into a step-by-step digital manual.",
        "Establish royalty and marketing fund fee structures aligned with franchisee long-term unit margins."
],
      ruInstructions: [
        "Докажите окупаемость до 24 месяцев на 3 собственных точках перед запуском франчайзинговой программы.",
        "Опишите все операционные стандарты (SOP) в виде пошаговых регламентов и чек-листов.",
        "Устанавливайте процент роялти и маркетинговых сборов так, чтобы сохранять высокую рентабельность франчайзи."
],
      semanticType: "structural_directive",
      tags: ["business","franchising","operations","scaling","retail"],
    }),
  },

  "business-mergers-acquisitions-m-and-a-integration": {
    id: "business-mergers-acquisitions-m-and-a-integration",
    name: "BusinessMergersAcquisitionsMAndAIntegrationSkill",
    displayName: "Post-Merger Integration (PMI) & Synergy Realization Plan",
    categoryId: "business",
    description: "Executes 100-day post-acquisition integration covering IT consolidation, culture alignment, talent retention, and cost synergies.",
    tags: ["business","m-and-a","integration","corporate-development","strategy"],
    transform: createStandardSkillTransform({
      sectionName: "Post-Merger Integration (PMI) Framework",
      ruSectionName: "План интеграции после слияний и поглощений (PMI 100 Days & Synergies)",
      instructions: [
        "Establish a centralized Integration Management Office (IMO) with workstream leads for HR, Tech, and Sales.",
        "Execute Day 1 readiness checklists: payroll continuity, email systems, and unified customer communication.",
        "Track hard revenue and cost synergy milestones against the acquisition investment thesis."
],
      ruInstructions: [
        "Создавайте проектный офис интеграции (IMO) с лидерами по направлениям IT, HR, продажам и финансам.",
        "Обеспечивайте бесперебойность процессов в День 1: непрерывность выплат, доступ к системам и коммуникация с клиентами.",
        "Контролируйте достижение плановых синергий по выручке и сокращению издержек по сравнению с исходным инвест-мемо."
],
      semanticType: "structural_directive",
      tags: ["business","m-and-a","integration","corporate-development","strategy"],
    }),
  },

  "business-channel-partner-reseller-program": {
    id: "business-channel-partner-reseller-program",
    name: "BusinessChannelPartnerResellerProgramSkill",
    displayName: "B2B Indirect Channel Partner & Value-Added Reseller (VAR) Program",
    categoryId: "business",
    description: "Designs multi-tier reseller programs, deal registration protection, co-op marketing funds, and partner enablement academies.",
    tags: ["business","channel-sales","partnerships","reseller","b2b"],
    transform: createStandardSkillTransform({
      sectionName: "Channel Partner & VAR Program Architecture",
      ruSectionName: "Архитектура партнерских и дистрибьюторских программ продаж (VAR, Channel Sales)",
      instructions: [
        "Enforce ironclad deal registration policies to prevent channel conflict between direct sales and partners.",
        "Tier partner margins based on technical certification levels, active pipeline generation, and co-selling activity.",
        "Provide ready-to-use co-branded collateral and dedicated partner sales engineering support."
],
      ruInstructions: [
        "Внедряйте строгую регистрацию сделок (Deal Registration) для исключения конфликта между прямыми и партнерскими продажами.",
        "Дифференцируйте маржу партнеров в зависимости от уровня технической сертификации и объемов продаж.",
        "Предоставляйте совместные маркетинговые материалы и выделенных инженеров поддержки партнерских сделок."
],
      semanticType: "structural_directive",
      tags: ["business","channel-sales","partnerships","reseller","b2b"],
    }),
  },

  "business-esg-sustainability-reporting-csrd": {
    id: "business-esg-sustainability-reporting-csrd",
    name: "BusinessEsgSustainabilityReportingCsrdSkill",
    displayName: "Corporate Sustainability & ESG Reporting (CSRD/GRI Standards)",
    categoryId: "business",
    description: "Measures Scope 1, 2, and 3 carbon emissions, supply chain labor ethics, and board governance transparency under EU CSRD.",
    tags: ["business","esg","sustainability","compliance","csrd","reporting"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate ESG & CSRD Sustainability Standards",
      ruSectionName: "Корпоративная отчетность ESG и устойчивое развитие (CSRD, GRI, Scope 1-3)",
      instructions: [
        "Calculate Scope 1 (direct), Scope 2 (purchased electricity), and Scope 3 (upstream/downstream value chain) emissions.",
        "Perform double materiality assessments: evaluate climate impact on the business and business impact on society.",
        "Ensure third-party auditable audit trails for all sustainability data points."
],
      ruInstructions: [
        "Рассчитывайте выбросы парниковых газов по трем охватам: Scope 1 (прямые), Scope 2 (энергия), Scope 3 (цепочка поставок).",
        "Проводите оценку двойной существенности (Double Materiality): влияние климата на бизнес и бизнеса на экологию.",
        "Обеспечивайте аудируемость всех данных об устойчивом развитии для внешних проверяющих органов."
],
      semanticType: "structural_directive",
      tags: ["business","esg","sustainability","compliance","csrd","reporting"],
    }),
  },

  "business-voice-of-the-customer-voc-analytics": {
    id: "business-voice-of-the-customer-voc-analytics",
    name: "BusinessVoiceOfTheCustomerVocAnalyticsSkill",
    displayName: "Enterprise Voice-of-the-Customer (VoC) Multi-Channel Listening Engine",
    categoryId: "business",
    description: "Synthesizes customer call recordings, support tickets, app store reviews, and sales notes into unified prioritization vectors.",
    tags: ["business","voc","customer-feedback","product-management","insights"],
    transform: createStandardSkillTransform({
      sectionName: "Voice of the Customer (VoC) Architecture",
      ruSectionName: "Система сбора и синтеза голоса клиента (Voice of the Customer / VoC)",
      instructions: [
        "Ingest unstructured customer feedback across support chats, Gong call transcripts, and survey open fields.",
        "Cluster complaints into root-cause problem statements tagged by revenue impact and customer tier.",
        "Present a monthly VoC executive summary connecting top customer pain points to product engineering sprints."
],
      ruInstructions: [
        "Агрегируйте неструктурированную обратную связь из тикетов поддержки, записей звонков и опросов.",
        "Кластеризуйте боли пользователей с привязкой к объему выручки затронутых клиентов.",
        "Формируйте ежемесячный дайджест для руководства, связывающий ключевые жалобы с планами разработки."
],
      semanticType: "structural_directive",
      tags: ["business","voc","customer-feedback","product-management","insights"],
    }),
  },

  "business-working-capital-cash-conversion-cycle": {
    id: "business-working-capital-cash-conversion-cycle",
    name: "BusinessWorkingCapitalCashConversionCycleSkill",
    displayName: "Working Capital & Cash Conversion Cycle (CCC) Compression",
    categoryId: "business",
    description: "Compresses Days Sales Outstanding (DSO) + Days Sales of Inventory (DSI) - Days Payable Outstanding (DPO) to liberate operating cash.",
    tags: ["business","working-capital","finance","cash-flow","treasury"],
    transform: createStandardSkillTransform({
      sectionName: "Cash Conversion Cycle (CCC) Optimization",
      ruSectionName: "Оптимизация рабочего капитала и цикла обращения денежных средств (CCC: DSO, DSI, DPO)",
      instructions: [
        "Calculate CCC: `Days Sales of Inventory (DSI) + Days Sales Outstanding (DSO) - Days Payable Outstanding (DPO)`.",
        "Incentivize early customer invoice settlement via dynamic discounting (e.g. 2/10 Net 30).",
        "Negotiate extended vendor payment terms while optimizing just-in-time inventory turnover."
],
      ruInstructions: [
        "Рассчитывайте финансовый цикл (CCC): время оборота запасов + срок сбора дебиторской задолженности - срок оплаты поставщикам.",
        "Ускоряйте сбор дебиторки с помощью скидок за досрочную оплату счетов (Dynamic Discounting).",
        "Договаривайтесь об отсрочках платежей с поставщиками для высвобождения свободного операционного кэша."
],
      semanticType: "structural_directive",
      tags: ["business","working-capital","finance","cash-flow","treasury"],
    }),
  },

  "business-key-account-management-kam-growth": {
    id: "business-key-account-management-kam-growth",
    name: "BusinessKeyAccountManagementKamGrowthSkill",
    displayName: "Strategic Key Account Management (KAM) & Multi-Year Joint Business Plans",
    categoryId: "business",
    description: "Aligns executive sponsorship, joint business plans (JBP), and quarterly value reviews to protect and grow top 20% revenue accounts.",
    tags: ["business","kam","account-management","enterprise-sales","growth"],
    transform: createStandardSkillTransform({
      sectionName: "Strategic Key Account Management (KAM) Standards",
      ruSectionName: "Стратегическое управление ключевыми клиентами (Key Account Management / KAM)",
      instructions: [
        "Build a multi-threaded relationship map across customer executive sponsors, economic buyers, and champions.",
        "Co-create a mutual Joint Business Plan (JBP) with shared 12-month business milestones and quantifiable ROI targets.",
        "Conduct quarterly strategic executive business reviews (EBR) focused on strategic outcomes rather than support tickets."
],
      ruInstructions: [
        "Формируйте многоуровневую карту контактов: от технических специалистов до топ-менеджеров клиента.",
        "Разрабатывайте совместный бизнес-план (JBP) с согласованными целями и критериями окупаемости на год.",
        "Проводите ежеквартальные стратегические встречи (EBR), обсуждая влияние на бизнес клиента, а не статус тикетов."
],
      semanticType: "structural_directive",
      tags: ["business","kam","account-management","enterprise-sales","growth"],
    }),
  },
  "business-b2b-saas-magic-number-sales-efficiency": {
    id: "business-b2b-saas-magic-number-sales-efficiency",
    name: "B2BSaaSMagicNumberSalesEfficiencySkill",
    displayName: "B2B SaaS Magic Number & Sales Efficiency",
    categoryId: "business",
    description: "Calculates SaaS Magic Number, CAC Payback, and Rule of 40.",
    tags: ["business","business","b2b","saas"],
    transform: createStandardSkillTransform({
      sectionName: "B2B SaaS Magic Number & Sales Efficiency Standards",
      ruSectionName: "Стандарты и регламенты: B2B SaaS Magic Number & Sales Efficiency",
      instructions: [
        "Apply core domain tenets for B2B SaaS Magic Number & Sales Efficiency.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B SaaS Magic Number & Sales Efficiency.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","saas"],
    }),
  },

  "business-blue-ocean-strategy-canvas-errc-grid": {
    id: "business-blue-ocean-strategy-canvas-errc-grid",
    name: "BlueOceanStrategyCanvasERRCGridSkill",
    displayName: "Blue Ocean Strategy Canvas & ERRC Grid",
    categoryId: "business",
    description: "Identifies uncontested market space using Eliminate-Reduce-Raise-Create grid.",
    tags: ["business","business","blue","ocean"],
    transform: createStandardSkillTransform({
      sectionName: "Blue Ocean Strategy Canvas & ERRC Grid Standards",
      ruSectionName: "Стандарты и регламенты: Blue Ocean Strategy Canvas & ERRC Grid",
      instructions: [
        "Apply core domain tenets for Blue Ocean Strategy Canvas & ERRC Grid.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Blue Ocean Strategy Canvas & ERRC Grid.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","blue","ocean"],
    }),
  },

  "business-jim-collins-compounding-flywheel-architecture": {
    id: "business-jim-collins-compounding-flywheel-architecture",
    name: "JimCollinsCompoundingFlywheelArchitectureSkill",
    displayName: "Jim Collins Compounding Flywheel Architecture",
    categoryId: "business",
    description: "Maps interconnected business virtuous cycles where momentum compounds.",
    tags: ["business","business","jim","collins"],
    transform: createStandardSkillTransform({
      sectionName: "Jim Collins Compounding Flywheel Architecture Standards",
      ruSectionName: "Стандарты и регламенты: Jim Collins Compounding Flywheel Architecture",
      instructions: [
        "Apply core domain tenets for Jim Collins Compounding Flywheel Architecture.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Jim Collins Compounding Flywheel Architecture.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","jim","collins"],
    }),
  },

  "business-cohort-retention-heatmap-decay-curves": {
    id: "business-cohort-retention-heatmap-decay-curves",
    name: "CohortRetentionHeatmapDecayCurvesSkill",
    displayName: "Cohort Retention Heatmap & Decay Curves",
    categoryId: "business",
    description: "Analyzes monthly customer cohort retention decay curves and asymptotic flattening.",
    tags: ["business","business","cohort","retention"],
    transform: createStandardSkillTransform({
      sectionName: "Cohort Retention Heatmap & Decay Curves Standards",
      ruSectionName: "Стандарты и регламенты: Cohort Retention Heatmap & Decay Curves",
      instructions: [
        "Apply core domain tenets for Cohort Retention Heatmap & Decay Curves.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cohort Retention Heatmap & Decay Curves.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","cohort","retention"],
    }),
  },

  "business-mckinsey-three-horizons-portfolio-framework": {
    id: "business-mckinsey-three-horizons-portfolio-framework",
    name: "McKinseyThreeHorizonsPortfolioFrameworkSkill",
    displayName: "McKinsey Three Horizons Portfolio Framework",
    categoryId: "business",
    description: "Allocates capital across Horizon 1 core, Horizon 2 scaling, and Horizon 3 bets.",
    tags: ["business","business","mckinsey","three"],
    transform: createStandardSkillTransform({
      sectionName: "McKinsey Three Horizons Portfolio Framework Standards",
      ruSectionName: "Стандарты и регламенты: McKinsey Three Horizons Portfolio Framework",
      instructions: [
        "Apply core domain tenets for McKinsey Three Horizons Portfolio Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для McKinsey Three Horizons Portfolio Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","mckinsey","three"],
    }),
  },

  "business-land-and-expand-enterprise-sales-framework": {
    id: "business-land-and-expand-enterprise-sales-framework",
    name: "LandandExpandEnterpriseSalesFrameworkSkill",
    displayName: "Land and Expand Enterprise Sales Framework",
    categoryId: "business",
    description: "Enters accounts with departmental beachheads and expands to site licenses.",
    tags: ["business","business","land","and"],
    transform: createStandardSkillTransform({
      sectionName: "Land and Expand Enterprise Sales Framework Standards",
      ruSectionName: "Стандарты и регламенты: Land and Expand Enterprise Sales Framework",
      instructions: [
        "Apply core domain tenets for Land and Expand Enterprise Sales Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Land and Expand Enterprise Sales Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","land","and"],
    }),
  },

  "business-zero-based-budgeting-zbb-cost-optimization": {
    id: "business-zero-based-budgeting-zbb-cost-optimization",
    name: "ZeroBasedBudgetingZBBCostOptimizationSkill",
    displayName: "Zero-Based Budgeting (ZBB) Cost Optimization",
    categoryId: "business",
    description: "Rebuilds department budgets from zero requiring explicit operational justification.",
    tags: ["business","business","zero","based"],
    transform: createStandardSkillTransform({
      sectionName: "Zero-Based Budgeting (ZBB) Cost Optimization Standards",
      ruSectionName: "Стандарты и регламенты: Zero-Based Budgeting (ZBB) Cost Optimization",
      instructions: [
        "Apply core domain tenets for Zero-Based Budgeting (ZBB) Cost Optimization.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Zero-Based Budgeting (ZBB) Cost Optimization.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","zero","based"],
    }),
  },

  "business-van-westendorp-price-sensitivity-meter-psm": {
    id: "business-van-westendorp-price-sensitivity-meter-psm",
    name: "VanWestendorpPriceSensitivityMeterPSMSkill",
    displayName: "Van Westendorp Price Sensitivity Meter (PSM)",
    categoryId: "business",
    description: "Determines acceptable price ranges using the 4-question PSM survey methodology.",
    tags: ["business","business","van","westendorp"],
    transform: createStandardSkillTransform({
      sectionName: "Van Westendorp Price Sensitivity Meter (PSM) Standards",
      ruSectionName: "Стандарты и регламенты: Van Westendorp Price Sensitivity Meter (PSM)",
      instructions: [
        "Apply core domain tenets for Van Westendorp Price Sensitivity Meter (PSM).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Van Westendorp Price Sensitivity Meter (PSM).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","van","westendorp"],
    }),
  },

  "business-clayton-christensen-low-end-disruption": {
    id: "business-clayton-christensen-low-end-disruption",
    name: "ClaytonChristensenLowEndDisruptionSkill",
    displayName: "Clayton Christensen Low-End Disruption",
    categoryId: "business",
    description: "Analyzes how simpler, cheaper solutions enter underserved market bottoms.",
    tags: ["business","business","clayton","christensen"],
    transform: createStandardSkillTransform({
      sectionName: "Clayton Christensen Low-End Disruption Standards",
      ruSectionName: "Стандарты и регламенты: Clayton Christensen Low-End Disruption",
      instructions: [
        "Apply core domain tenets for Clayton Christensen Low-End Disruption.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Clayton Christensen Low-End Disruption.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","clayton","christensen"],
    }),
  },

  "business-david-sacks-burn-multiple-capital-efficiency": {
    id: "business-david-sacks-burn-multiple-capital-efficiency",
    name: "DavidSacksBurnMultipleCapitalEfficiencySkill",
    displayName: "David Sacks Burn Multiple & Capital Efficiency",
    categoryId: "business",
    description: "Evaluates startup capital efficiency: Net Burn / Net New ARR.",
    tags: ["business","business","david","sacks"],
    transform: createStandardSkillTransform({
      sectionName: "David Sacks Burn Multiple & Capital Efficiency Standards",
      ruSectionName: "Стандарты и регламенты: David Sacks Burn Multiple & Capital Efficiency",
      instructions: [
        "Apply core domain tenets for David Sacks Burn Multiple & Capital Efficiency.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для David Sacks Burn Multiple & Capital Efficiency.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","david","sacks"],
    }),
  },

  "business-bcg-growth-share-portfolio-matrix-strategy": {
    id: "business-bcg-growth-share-portfolio-matrix-strategy",
    name: "BCGGrowthSharePortfolioMatrixStrategySkill",
    displayName: "BCG Growth-Share Portfolio Matrix Strategy",
    categoryId: "business",
    description: "Categorizes business units into Stars, Cash Cows, Question Marks, and Dogs.",
    tags: ["business","business","bcg","growth"],
    transform: createStandardSkillTransform({
      sectionName: "BCG Growth-Share Portfolio Matrix Strategy Standards",
      ruSectionName: "Стандарты и регламенты: BCG Growth-Share Portfolio Matrix Strategy",
      instructions: [
        "Apply core domain tenets for BCG Growth-Share Portfolio Matrix Strategy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для BCG Growth-Share Portfolio Matrix Strategy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","bcg","growth"],
    }),
  },

  "business-product-led-growth-plg-self-serve-funnel": {
    id: "business-product-led-growth-plg-self-serve-funnel",
    name: "ProductLedGrowthPLGSelfServeFunnelSkill",
    displayName: "Product-Led Growth (PLG) Self-Serve Funnel",
    categoryId: "business",
    description: "Drives software distribution through self-serve product experience.",
    tags: ["business","business","product","led"],
    transform: createStandardSkillTransform({
      sectionName: "Product-Led Growth (PLG) Self-Serve Funnel Standards",
      ruSectionName: "Стандарты и регламенты: Product-Led Growth (PLG) Self-Serve Funnel",
      instructions: [
        "Apply core domain tenets for Product-Led Growth (PLG) Self-Serve Funnel.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Product-Led Growth (PLG) Self-Serve Funnel.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","product","led"],
    }),
  },

  "business-gross-margin-profile-cogs-structuring": {
    id: "business-gross-margin-profile-cogs-structuring",
    name: "GrossMarginProfileCOGSStructuringSkill",
    displayName: "Gross Margin Profile & COGS Structuring",
    categoryId: "business",
    description: "Structures COGS to target healthy 75%+ software gross margins.",
    tags: ["business","business","gross","margin"],
    transform: createStandardSkillTransform({
      sectionName: "Gross Margin Profile & COGS Structuring Standards",
      ruSectionName: "Стандарты и регламенты: Gross Margin Profile & COGS Structuring",
      instructions: [
        "Apply core domain tenets for Gross Margin Profile & COGS Structuring.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Gross Margin Profile & COGS Structuring.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","gross","margin"],
    }),
  },

  "business-geoffrey-moore-crossing-the-chasm-framework": {
    id: "business-geoffrey-moore-crossing-the-chasm-framework",
    name: "GeoffreyMooreCrossingtheChasmFrameworkSkill",
    displayName: "Geoffrey Moore Crossing the Chasm Framework",
    categoryId: "business",
    description: "Guides tech startups transitioning from Early Adopters to Pragmatists.",
    tags: ["business","business","geoffrey","moore"],
    transform: createStandardSkillTransform({
      sectionName: "Geoffrey Moore Crossing the Chasm Framework Standards",
      ruSectionName: "Стандарты и регламенты: Geoffrey Moore Crossing the Chasm Framework",
      instructions: [
        "Apply core domain tenets for Geoffrey Moore Crossing the Chasm Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Geoffrey Moore Crossing the Chasm Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","geoffrey","moore"],
    }),
  },

  "business-dunbar-number-organizational-scaling-points": {
    id: "business-dunbar-number-organizational-scaling-points",
    name: "DunbarNumberOrganizationalScalingPointsSkill",
    displayName: "Dunbar Number Organizational Scaling Points",
    categoryId: "business",
    description: "Restructures management hierarchy at team thresholds: 15, 50, 150, 500.",
    tags: ["business","business","dunbar","number"],
    transform: createStandardSkillTransform({
      sectionName: "Dunbar Number Organizational Scaling Points Standards",
      ruSectionName: "Стандарты и регламенты: Dunbar Number Organizational Scaling Points",
      instructions: [
        "Apply core domain tenets for Dunbar Number Organizational Scaling Points.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Dunbar Number Organizational Scaling Points.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","dunbar","number"],
    }),
  },

  "business-dynamic-pricing-perishable-yield-management": {
    id: "business-dynamic-pricing-perishable-yield-management",
    name: "DynamicPricingPerishableYieldManagementSkill",
    displayName: "Dynamic Pricing & Perishable Yield Management",
    categoryId: "business",
    description: "Maximizes revenue for time-sensitive capacity via elasticity models.",
    tags: ["business","business","dynamic","pricing"],
    transform: createStandardSkillTransform({
      sectionName: "Dynamic Pricing & Perishable Yield Management Standards",
      ruSectionName: "Стандарты и регламенты: Dynamic Pricing & Perishable Yield Management",
      instructions: [
        "Apply core domain tenets for Dynamic Pricing & Perishable Yield Management.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Dynamic Pricing & Perishable Yield Management.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","dynamic","pricing"],
    }),
  },

  "business-b2b-procurement-vendor-risk-assessment": {
    id: "business-b2b-procurement-vendor-risk-assessment",
    name: "B2BProcurementVendorRiskAssessmentSkill",
    displayName: "B2B Procurement & Vendor Risk Assessment",
    categoryId: "business",
    description: "Evaluates vendor financial solvency, SLA penalties, and business continuity.",
    tags: ["business","business","b2b","procurement"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Procurement & Vendor Risk Assessment Standards",
      ruSectionName: "Стандарты и регламенты: B2B Procurement & Vendor Risk Assessment",
      instructions: [
        "Apply core domain tenets for B2B Procurement & Vendor Risk Assessment.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Procurement & Vendor Risk Assessment.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","procurement"],
    }),
  },

  "business-freemium-conversion-paywall-placement": {
    id: "business-freemium-conversion-paywall-placement",
    name: "FreemiumConversionPaywallPlacementSkill",
    displayName: "Freemium Conversion & Paywall Placement",
    categoryId: "business",
    description: "Structures feature gating, reverse trials, and contextual upgrade triggers.",
    tags: ["business","business","freemium","conversion"],
    transform: createStandardSkillTransform({
      sectionName: "Freemium Conversion & Paywall Placement Standards",
      ruSectionName: "Стандарты и регламенты: Freemium Conversion & Paywall Placement",
      instructions: [
        "Apply core domain tenets for Freemium Conversion & Paywall Placement.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Freemium Conversion & Paywall Placement.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","freemium","conversion"],
    }),
  },

  "business-closed-loop-nps-operational-system": {
    id: "business-closed-loop-nps-operational-system",
    name: "ClosedLoopNPSOperationalSystemSkill",
    displayName: "Closed-Loop NPS Operational System",
    categoryId: "business",
    description: "Segments feedback into Promoters, Passives, and Detractors with SLA follow-ups.",
    tags: ["business","business","closed","loop"],
    transform: createStandardSkillTransform({
      sectionName: "Closed-Loop NPS Operational System Standards",
      ruSectionName: "Стандарты и регламенты: Closed-Loop NPS Operational System",
      instructions: [
        "Apply core domain tenets for Closed-Loop NPS Operational System.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Closed-Loop NPS Operational System.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","closed","loop"],
    }),
  },

  "business-post-merger-integration-pmi-100-day-plan": {
    id: "business-post-merger-integration-pmi-100-day-plan",
    name: "PostMergerIntegrationPMI100DayPlanSkill",
    displayName: "Post-Merger Integration (PMI) 100-Day Plan",
    categoryId: "business",
    description: "Executes post-acquisition integration covering IT, culture, and cost synergies.",
    tags: ["business","business","post","merger"],
    transform: createStandardSkillTransform({
      sectionName: "Post-Merger Integration (PMI) 100-Day Plan Standards",
      ruSectionName: "Стандарты и регламенты: Post-Merger Integration (PMI) 100-Day Plan",
      instructions: [
        "Apply core domain tenets for Post-Merger Integration (PMI) 100-Day Plan.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Post-Merger Integration (PMI) 100-Day Plan.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","post","merger"],
    }),
  },

  "business-channel-partner-var-reseller-program": {
    id: "business-channel-partner-var-reseller-program",
    name: "ChannelPartnerVARResellerProgramSkill",
    displayName: "Channel Partner & VAR Reseller Program",
    categoryId: "business",
    description: "Designs multi-tier reseller programs, deal registration, and co-op funds.",
    tags: ["business","business","channel","partner"],
    transform: createStandardSkillTransform({
      sectionName: "Channel Partner & VAR Reseller Program Standards",
      ruSectionName: "Стандарты и регламенты: Channel Partner & VAR Reseller Program",
      instructions: [
        "Apply core domain tenets for Channel Partner & VAR Reseller Program.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Channel Partner & VAR Reseller Program.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","channel","partner"],
    }),
  },

  "business-corporate-esg-csrd-sustainability-reporting": {
    id: "business-corporate-esg-csrd-sustainability-reporting",
    name: "CorporateESGCSRDSustainabilityReportingSkill",
    displayName: "Corporate ESG & CSRD Sustainability Reporting",
    categoryId: "business",
    description: "Measures Scope 1-3 carbon emissions and supply chain labor ethics.",
    tags: ["business","business","corporate","esg"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate ESG & CSRD Sustainability Reporting Standards",
      ruSectionName: "Стандарты и регламенты: Corporate ESG & CSRD Sustainability Reporting",
      instructions: [
        "Apply core domain tenets for Corporate ESG & CSRD Sustainability Reporting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate ESG & CSRD Sustainability Reporting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","corporate","esg"],
    }),
  },

  "business-voice-of-the-customer-voc-listening-engine": {
    id: "business-voice-of-the-customer-voc-listening-engine",
    name: "VoiceoftheCustomerVoCListeningEngineSkill",
    displayName: "Voice of the Customer (VoC) Listening Engine",
    categoryId: "business",
    description: "Synthesizes customer call recordings, tickets, and reviews into feature backlogs.",
    tags: ["business","business","voice","of"],
    transform: createStandardSkillTransform({
      sectionName: "Voice of the Customer (VoC) Listening Engine Standards",
      ruSectionName: "Стандарты и регламенты: Voice of the Customer (VoC) Listening Engine",
      instructions: [
        "Apply core domain tenets for Voice of the Customer (VoC) Listening Engine.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Voice of the Customer (VoC) Listening Engine.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","voice","of"],
    }),
  },

  "business-working-capital-cash-conversion-cycle-ccc": {
    id: "business-working-capital-cash-conversion-cycle-ccc",
    name: "WorkingCapitalCashConversionCycleCCCSkill",
    displayName: "Working Capital Cash Conversion Cycle (CCC)",
    categoryId: "business",
    description: "Compresses DSO + DSI - DPO to liberate operating cash.",
    tags: ["business","business","working","capital"],
    transform: createStandardSkillTransform({
      sectionName: "Working Capital Cash Conversion Cycle (CCC) Standards",
      ruSectionName: "Стандарты и регламенты: Working Capital Cash Conversion Cycle (CCC)",
      instructions: [
        "Apply core domain tenets for Working Capital Cash Conversion Cycle (CCC).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Working Capital Cash Conversion Cycle (CCC).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","working","capital"],
    }),
  },

  "business-key-account-management-kam-joint-plans": {
    id: "business-key-account-management-kam-joint-plans",
    name: "KeyAccountManagementKAMJointPlansSkill",
    displayName: "Key Account Management (KAM) Joint Plans",
    categoryId: "business",
    description: "Aligns executive sponsorship and 12-month joint business plans.",
    tags: ["business","business","key","account"],
    transform: createStandardSkillTransform({
      sectionName: "Key Account Management (KAM) Joint Plans Standards",
      ruSectionName: "Стандарты и регламенты: Key Account Management (KAM) Joint Plans",
      instructions: [
        "Apply core domain tenets for Key Account Management (KAM) Joint Plans.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Key Account Management (KAM) Joint Plans.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","key","account"],
    }),
  },

  "business-saas-net-revenue-retention-nrr-expansion": {
    id: "business-saas-net-revenue-retention-nrr-expansion",
    name: "SaaSNetRevenueRetentionNRRExpansionSkill",
    displayName: "SaaS Net Revenue Retention (NRR) Expansion",
    categoryId: "business",
    description: "Drives account expansion through seat additions, upsells, and usage tiers.",
    tags: ["business","business","saas","net"],
    transform: createStandardSkillTransform({
      sectionName: "SaaS Net Revenue Retention (NRR) Expansion Standards",
      ruSectionName: "Стандарты и регламенты: SaaS Net Revenue Retention (NRR) Expansion",
      instructions: [
        "Apply core domain tenets for SaaS Net Revenue Retention (NRR) Expansion.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SaaS Net Revenue Retention (NRR) Expansion.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","saas","net"],
    }),
  },

  "business-b2b-sales-pipeline-stage-conversion-rate": {
    id: "business-b2b-sales-pipeline-stage-conversion-rate",
    name: "B2BSalesPipelineStageConversionRateSkill",
    displayName: "B2B Sales Pipeline Stage Conversion Rate",
    categoryId: "business",
    description: "Analyzes pipeline bottlenecks across MQL, SQL, Opportunity, and Closed-Won.",
    tags: ["business","business","b2b","sales"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Sales Pipeline Stage Conversion Rate Standards",
      ruSectionName: "Стандарты и регламенты: B2B Sales Pipeline Stage Conversion Rate",
      instructions: [
        "Apply core domain tenets for B2B Sales Pipeline Stage Conversion Rate.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Sales Pipeline Stage Conversion Rate.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","sales"],
    }),
  },

  "business-unit-economics-cac-payback-period-calculation": {
    id: "business-unit-economics-cac-payback-period-calculation",
    name: "UnitEconomicsCACPaybackPeriodCalculationSkill",
    displayName: "Unit Economics CAC Payback Period Calculation",
    categoryId: "business",
    description: "Calculates fully-burdened CAC and payback period in months.",
    tags: ["business","business","unit","economics"],
    transform: createStandardSkillTransform({
      sectionName: "Unit Economics CAC Payback Period Calculation Standards",
      ruSectionName: "Стандарты и регламенты: Unit Economics CAC Payback Period Calculation",
      instructions: [
        "Apply core domain tenets for Unit Economics CAC Payback Period Calculation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Unit Economics CAC Payback Period Calculation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","unit","economics"],
    }),
  },

  "business-enterprise-sla-uptime-guarantee-penalty": {
    id: "business-enterprise-sla-uptime-guarantee-penalty",
    name: "EnterpriseSLAUptimeGuaranteePenaltySkill",
    displayName: "Enterprise SLA Uptime Guarantee Penalty",
    categoryId: "business",
    description: "Structures 99.9% uptime SLAs with tier-based financial penalty credits.",
    tags: ["business","business","enterprise","sla"],
    transform: createStandardSkillTransform({
      sectionName: "Enterprise SLA Uptime Guarantee Penalty Standards",
      ruSectionName: "Стандарты и регламенты: Enterprise SLA Uptime Guarantee Penalty",
      instructions: [
        "Apply core domain tenets for Enterprise SLA Uptime Guarantee Penalty.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Enterprise SLA Uptime Guarantee Penalty.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","enterprise","sla"],
    }),
  },

  "business-b2b-pricing-tier-packaging-feature-matrix": {
    id: "business-b2b-pricing-tier-packaging-feature-matrix",
    name: "B2BPricingTierPackagingFeatureMatrixSkill",
    displayName: "B2B Pricing Tier Packaging & Feature Matrix",
    categoryId: "business",
    description: "Packages features into Good-Better-Best tier plans targeting buyer personas.",
    tags: ["business","business","b2b","pricing"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Pricing Tier Packaging & Feature Matrix Standards",
      ruSectionName: "Стандарты и регламенты: B2B Pricing Tier Packaging & Feature Matrix",
      instructions: [
        "Apply core domain tenets for B2B Pricing Tier Packaging & Feature Matrix.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Pricing Tier Packaging & Feature Matrix.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","pricing"],
    }),
  },

  "business-customer-success-health-score-early-warning": {
    id: "business-customer-success-health-score-early-warning",
    name: "CustomerSuccessHealthScoreEarlyWarningSkill",
    displayName: "Customer Success Health Score Early Warning",
    categoryId: "business",
    description: "Combines telemetry, support tickets, and NPS into composite health scores.",
    tags: ["business","business","customer","success"],
    transform: createStandardSkillTransform({
      sectionName: "Customer Success Health Score Early Warning Standards",
      ruSectionName: "Стандарты и регламенты: Customer Success Health Score Early Warning",
      instructions: [
        "Apply core domain tenets for Customer Success Health Score Early Warning.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Customer Success Health Score Early Warning.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","customer","success"],
    }),
  },

  "business-strategic-supplier-single-source-diversification": {
    id: "business-strategic-supplier-single-source-diversification",
    name: "StrategicSupplierSingleSourceDiversificationSkill",
    displayName: "Strategic Supplier Single-Source Diversification",
    categoryId: "business",
    description: "Mitigates supply chain risk by qualifying secondary backup suppliers.",
    tags: ["business","business","strategic","supplier"],
    transform: createStandardSkillTransform({
      sectionName: "Strategic Supplier Single-Source Diversification Standards",
      ruSectionName: "Стандарты и регламенты: Strategic Supplier Single-Source Diversification",
      instructions: [
        "Apply core domain tenets for Strategic Supplier Single-Source Diversification.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Strategic Supplier Single-Source Diversification.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","strategic","supplier"],
    }),
  },

  "business-corporate-divestiture-carve-out-strategy": {
    id: "business-corporate-divestiture-carve-out-strategy",
    name: "CorporateDivestitureCarveOutStrategySkill",
    displayName: "Corporate Divestiture & Carve-Out Strategy",
    categoryId: "business",
    description: "Executes non-core business unit spin-offs and carve-out asset sales.",
    tags: ["business","business","corporate","divestiture"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Divestiture & Carve-Out Strategy Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Divestiture & Carve-Out Strategy",
      instructions: [
        "Apply core domain tenets for Corporate Divestiture & Carve-Out Strategy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Divestiture & Carve-Out Strategy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","corporate","divestiture"],
    }),
  },

  "business-subscription-churn-voluntary-vs-involuntary": {
    id: "business-subscription-churn-voluntary-vs-involuntary",
    name: "SubscriptionChurnVoluntaryvsInvoluntarySkill",
    displayName: "Subscription Churn Voluntary vs Involuntary",
    categoryId: "business",
    description: "Reduces involuntary churn via automated dunning credit card retry logic.",
    tags: ["business","business","subscription","churn"],
    transform: createStandardSkillTransform({
      sectionName: "Subscription Churn Voluntary vs Involuntary Standards",
      ruSectionName: "Стандарты и регламенты: Subscription Churn Voluntary vs Involuntary",
      instructions: [
        "Apply core domain tenets for Subscription Churn Voluntary vs Involuntary.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Subscription Churn Voluntary vs Involuntary.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","subscription","churn"],
    }),
  },

  "business-b2b-sales-territory-realignment-quota": {
    id: "business-b2b-sales-territory-realignment-quota",
    name: "B2BSalesTerritoryRealignmentQuotaSkill",
    displayName: "B2B Sales Territory Realignment & Quota",
    categoryId: "business",
    description: "Allocates enterprise sales territories and sets achievable account quotas.",
    tags: ["business","business","b2b","sales"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Sales Territory Realignment & Quota Standards",
      ruSectionName: "Стандарты и регламенты: B2B Sales Territory Realignment & Quota",
      instructions: [
        "Apply core domain tenets for B2B Sales Territory Realignment & Quota.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Sales Territory Realignment & Quota.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","sales"],
    }),
  },

  "business-corporate-treasury-liquidity-runway-management": {
    id: "business-corporate-treasury-liquidity-runway-management",
    name: "CorporateTreasuryLiquidityRunwayManagementSkill",
    displayName: "Corporate Treasury Liquidity Runway Management",
    categoryId: "business",
    description: "Manages cash reserves, short-term yields, and 24-month runway projections.",
    tags: ["business","business","corporate","treasury"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Treasury Liquidity Runway Management Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Treasury Liquidity Runway Management",
      instructions: [
        "Apply core domain tenets for Corporate Treasury Liquidity Runway Management.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Treasury Liquidity Runway Management.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","corporate","treasury"],
    }),
  },

  "business-strategic-intellectual-property-portfolio-licensing": {
    id: "business-strategic-intellectual-property-portfolio-licensing",
    name: "StrategicIntellectualPropertyPortfolioLicensingSkill",
    displayName: "Strategic Intellectual Property Portfolio Licensing",
    categoryId: "business",
    description: "Monetizes patent portfolios through out-licensing and cross-licensing.",
    tags: ["business","business","strategic","intellectual"],
    transform: createStandardSkillTransform({
      sectionName: "Strategic Intellectual Property Portfolio Licensing Standards",
      ruSectionName: "Стандарты и регламенты: Strategic Intellectual Property Portfolio Licensing",
      instructions: [
        "Apply core domain tenets for Strategic Intellectual Property Portfolio Licensing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Strategic Intellectual Property Portfolio Licensing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","strategic","intellectual"],
    }),
  },

  "business-e-commerce-average-order-value-aov-boost": {
    id: "business-e-commerce-average-order-value-aov-boost",
    name: "ECommerceAverageOrderValueAOVBoostSkill",
    displayName: "E-Commerce Average Order Value (AOV) Boost",
    categoryId: "business",
    description: "Increases order values via bundle discounts, cross-sells, and threshold free shipping.",
    tags: ["business","business","e","commerce"],
    transform: createStandardSkillTransform({
      sectionName: "E-Commerce Average Order Value (AOV) Boost Standards",
      ruSectionName: "Стандарты и регламенты: E-Commerce Average Order Value (AOV) Boost",
      instructions: [
        "Apply core domain tenets for E-Commerce Average Order Value (AOV) Boost.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для E-Commerce Average Order Value (AOV) Boost.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","e","commerce"],
    }),
  },

  "business-b2b-enterprise-discount-governance-matrix": {
    id: "business-b2b-enterprise-discount-governance-matrix",
    name: "B2BEnterpriseDiscountGovernanceMatrixSkill",
    displayName: "B2B Enterprise Discount Governance Matrix",
    categoryId: "business",
    description: "Restricts AE sales discount authority with approval workflows.",
    tags: ["business","business","b2b","enterprise"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Enterprise Discount Governance Matrix Standards",
      ruSectionName: "Стандарты и регламенты: B2B Enterprise Discount Governance Matrix",
      instructions: [
        "Apply core domain tenets for B2B Enterprise Discount Governance Matrix.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Enterprise Discount Governance Matrix.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","enterprise"],
    }),
  },

  "business-joint-venture-strategic-alliance-structure": {
    id: "business-joint-venture-strategic-alliance-structure",
    name: "JointVentureStrategicAllianceStructureSkill",
    displayName: "Joint Venture & Strategic Alliance Structure",
    categoryId: "business",
    description: "Negotiates equity joint ventures and shared governance agreements.",
    tags: ["business","business","joint","venture"],
    transform: createStandardSkillTransform({
      sectionName: "Joint Venture & Strategic Alliance Structure Standards",
      ruSectionName: "Стандарты и регламенты: Joint Venture & Strategic Alliance Structure",
      instructions: [
        "Apply core domain tenets for Joint Venture & Strategic Alliance Structure.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Joint Venture & Strategic Alliance Structure.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","joint","venture"],
    }),
  },

  "business-executive-compensation-stock-option-pool": {
    id: "business-executive-compensation-stock-option-pool",
    name: "ExecutiveCompensationStockOptionPoolSkill",
    displayName: "Executive Compensation & Stock Option Pool",
    categoryId: "business",
    description: "Designs 4-year vesting stock option pools with 1-year cliff terms.",
    tags: ["business","business","executive","compensation"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Compensation & Stock Option Pool Standards",
      ruSectionName: "Стандарты и регламенты: Executive Compensation & Stock Option Pool",
      instructions: [
        "Apply core domain tenets for Executive Compensation & Stock Option Pool.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Executive Compensation & Stock Option Pool.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","executive","compensation"],
    }),
  },

  "business-customer-acquisition-channel-roi-attribution": {
    id: "business-customer-acquisition-channel-roi-attribution",
    name: "CustomerAcquisitionChannelROIAttributionSkill",
    displayName: "Customer Acquisition Channel ROI Attribution",
    categoryId: "business",
    description: "Attributes customer acquisition spend across Google, LinkedIn, and Organic.",
    tags: ["business","business","customer","acquisition"],
    transform: createStandardSkillTransform({
      sectionName: "Customer Acquisition Channel ROI Attribution Standards",
      ruSectionName: "Стандарты и регламенты: Customer Acquisition Channel ROI Attribution",
      instructions: [
        "Apply core domain tenets for Customer Acquisition Channel ROI Attribution.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Customer Acquisition Channel ROI Attribution.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","customer","acquisition"],
    }),
  },

  "business-b2b-contract-renewal-auto-escalation-clause": {
    id: "business-b2b-contract-renewal-auto-escalation-clause",
    name: "B2BContractRenewalAutoEscalationClauseSkill",
    displayName: "B2B Contract Renewal Auto-Escalation Clause",
    categoryId: "business",
    description: "Includes annual 5% price increase auto-escalation clauses in enterprise SLAs.",
    tags: ["business","business","b2b","contract"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Contract Renewal Auto-Escalation Clause Standards",
      ruSectionName: "Стандарты и регламенты: B2B Contract Renewal Auto-Escalation Clause",
      instructions: [
        "Apply core domain tenets for B2B Contract Renewal Auto-Escalation Clause.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Contract Renewal Auto-Escalation Clause.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","contract"],
    }),
  },

  "business-corporate-credit-rating-debt-covenant": {
    id: "business-corporate-credit-rating-debt-covenant",
    name: "CorporateCreditRatingDebtCovenantSkill",
    displayName: "Corporate Credit Rating & Debt Covenant",
    categoryId: "business",
    description: "Monitors leverage ratios (Net Debt / EBITDA) to comply with debt covenants.",
    tags: ["business","business","corporate","credit"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Credit Rating & Debt Covenant Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Credit Rating & Debt Covenant",
      instructions: [
        "Apply core domain tenets for Corporate Credit Rating & Debt Covenant.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Credit Rating & Debt Covenant.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","corporate","credit"],
    }),
  },

  "business-retail-store-foot-traffic-conversion-audit": {
    id: "business-retail-store-foot-traffic-conversion-audit",
    name: "RetailStoreFootTrafficConversionAuditSkill",
    displayName: "Retail Store Foot-Traffic Conversion Audit",
    categoryId: "business",
    description: "Analyzes store visitor foot-traffic conversion rates and basket sizes.",
    tags: ["business","business","retail","store"],
    transform: createStandardSkillTransform({
      sectionName: "Retail Store Foot-Traffic Conversion Audit Standards",
      ruSectionName: "Стандарты и регламенты: Retail Store Foot-Traffic Conversion Audit",
      instructions: [
        "Apply core domain tenets for Retail Store Foot-Traffic Conversion Audit.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Retail Store Foot-Traffic Conversion Audit.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","retail","store"],
    }),
  },

  "business-b2b-sales-engineering-demo-conversion": {
    id: "business-b2b-sales-engineering-demo-conversion",
    name: "B2BSalesEngineeringDemoConversionSkill",
    displayName: "B2B Sales Engineering Demo Conversion",
    categoryId: "business",
    description: "Pairs AEs with sales engineers to conduct high-converting technical proof-of-concepts.",
    tags: ["business","business","b2b","sales"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Sales Engineering Demo Conversion Standards",
      ruSectionName: "Стандарты и регламенты: B2B Sales Engineering Demo Conversion",
      instructions: [
        "Apply core domain tenets for B2B Sales Engineering Demo Conversion.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Sales Engineering Demo Conversion.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","sales"],
    }),
  },

  "business-corporate-board-governance-audit-committee": {
    id: "business-corporate-board-governance-audit-committee",
    name: "CorporateBoardGovernanceAuditCommitteeSkill",
    displayName: "Corporate Board Governance & Audit Committee",
    categoryId: "business",
    description: "Establishes independent board audit committees and risk oversight.",
    tags: ["business","business","corporate","board"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Board Governance & Audit Committee Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Board Governance & Audit Committee",
      instructions: [
        "Apply core domain tenets for Corporate Board Governance & Audit Committee.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Board Governance & Audit Committee.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","corporate","board"],
    }),
  },

  "business-saas-usage-based-pricing-consumption-metering": {
    id: "business-saas-usage-based-pricing-consumption-metering",
    name: "SaaSUsageBasedPricingConsumptionMeteringSkill",
    displayName: "SaaS Usage-Based Pricing Consumption Metering",
    categoryId: "business",
    description: "Implements metered billing based on active storage, compute, or API tokens.",
    tags: ["business","business","saas","usage"],
    transform: createStandardSkillTransform({
      sectionName: "SaaS Usage-Based Pricing Consumption Metering Standards",
      ruSectionName: "Стандарты и регламенты: SaaS Usage-Based Pricing Consumption Metering",
      instructions: [
        "Apply core domain tenets for SaaS Usage-Based Pricing Consumption Metering.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SaaS Usage-Based Pricing Consumption Metering.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","saas","usage"],
    }),
  },

  "business-product-sunset-legacy-eol-migration-plan": {
    id: "business-product-sunset-legacy-eol-migration-plan",
    name: "ProductSunsetLegacyEOLMigrationPlanSkill",
    displayName: "Product Sunset & Legacy EOL Migration Plan",
    categoryId: "business",
    description: "Deprecates legacy software products with structured migration paths for users.",
    tags: ["business","business","product","sunset"],
    transform: createStandardSkillTransform({
      sectionName: "Product Sunset & Legacy EOL Migration Plan Standards",
      ruSectionName: "Стандарты и регламенты: Product Sunset & Legacy EOL Migration Plan",
      instructions: [
        "Apply core domain tenets for Product Sunset & Legacy EOL Migration Plan.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Product Sunset & Legacy EOL Migration Plan.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","product","sunset"],
    }),
  },

  "business-strategic-advisory-board-incentive-equity": {
    id: "business-strategic-advisory-board-incentive-equity",
    name: "StrategicAdvisoryBoardIncentiveEquitySkill",
    displayName: "Strategic Advisory Board Incentive Equity",
    categoryId: "business",
    description: "Recruits industry luminary advisors using 0.25%-0.5% 2-year vesting equity.",
    tags: ["business","business","strategic","advisory"],
    transform: createStandardSkillTransform({
      sectionName: "Strategic Advisory Board Incentive Equity Standards",
      ruSectionName: "Стандарты и регламенты: Strategic Advisory Board Incentive Equity",
      instructions: [
        "Apply core domain tenets for Strategic Advisory Board Incentive Equity.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Strategic Advisory Board Incentive Equity.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","strategic","advisory"],
    }),
  },

  "business-b2b-cold-calling-script-objection-defusal": {
    id: "business-b2b-cold-calling-script-objection-defusal",
    name: "B2BColdCallingScriptObjectionDefusalSkill",
    displayName: "B2B Cold Calling Script & Objection Defusal",
    categoryId: "business",
    description: "Arms sales SDRs with pattern-interrupt cold call scripts and objection handling.",
    tags: ["business","business","b2b","cold"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Cold Calling Script & Objection Defusal Standards",
      ruSectionName: "Стандарты и регламенты: B2B Cold Calling Script & Objection Defusal",
      instructions: [
        "Apply core domain tenets for B2B Cold Calling Script & Objection Defusal.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Cold Calling Script & Objection Defusal.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","cold"],
    }),
  },

  "business-corporate-debt-refinancing-term-loan-b": {
    id: "business-corporate-debt-refinancing-term-loan-b",
    name: "CorporateDebtRefinancingTermLoanBSkill",
    displayName: "Corporate Debt Refinancing & Term Loan B",
    categoryId: "business",
    description: "Structures corporate debt refinancing to lower interest expense and extend maturities.",
    tags: ["business","business","corporate","debt"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Debt Refinancing & Term Loan B Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Debt Refinancing & Term Loan B",
      instructions: [
        "Apply core domain tenets for Corporate Debt Refinancing & Term Loan B.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Debt Refinancing & Term Loan B.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","corporate","debt"],
    }),
  },

  "business-customer-trial-to-paid-conversion-optimization": {
    id: "business-customer-trial-to-paid-conversion-optimization",
    name: "CustomerTrialtoPaidConversionOptimizationSkill",
    displayName: "Customer Trial-to-Paid Conversion Optimization",
    categoryId: "business",
    description: "Optimizes 14-day free trial conversion through in-app guided onboarding.",
    tags: ["business","business","customer","trial"],
    transform: createStandardSkillTransform({
      sectionName: "Customer Trial-to-Paid Conversion Optimization Standards",
      ruSectionName: "Стандарты и регламенты: Customer Trial-to-Paid Conversion Optimization",
      instructions: [
        "Apply core domain tenets for Customer Trial-to-Paid Conversion Optimization.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Customer Trial-to-Paid Conversion Optimization.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","customer","trial"],
    }),
  },

  "business-b2b-sales-commission-plan-incentive-structure": {
    id: "business-b2b-sales-commission-plan-incentive-structure",
    name: "B2BSalesCommissionPlanIncentiveStructureSkill",
    displayName: "B2B Sales Commission Plan Incentive Structure",
    categoryId: "business",
    description: "Designs quota-based commission tiers with accelerators for over-performance.",
    tags: ["business","business","b2b","sales"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Sales Commission Plan Incentive Structure Standards",
      ruSectionName: "Стандарты и регламенты: B2B Sales Commission Plan Incentive Structure",
      instructions: [
        "Apply core domain tenets for B2B Sales Commission Plan Incentive Structure.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Sales Commission Plan Incentive Structure.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","sales"],
    }),
  },

  "business-global-transfer-pricing-tax-compliance": {
    id: "business-global-transfer-pricing-tax-compliance",
    name: "GlobalTransferPricingTaxComplianceSkill",
    displayName: "Global Transfer Pricing Tax Compliance",
    categoryId: "business",
    description: "Sets arm's length intercompany transfer prices compliant with OECD standards.",
    tags: ["business","business","global","transfer"],
    transform: createStandardSkillTransform({
      sectionName: "Global Transfer Pricing Tax Compliance Standards",
      ruSectionName: "Стандарты и регламенты: Global Transfer Pricing Tax Compliance",
      instructions: [
        "Apply core domain tenets for Global Transfer Pricing Tax Compliance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Global Transfer Pricing Tax Compliance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","global","transfer"],
    }),
  },

  "business-commercial-real-estate-lease-subleasing-strategy": {
    id: "business-commercial-real-estate-lease-subleasing-strategy",
    name: "CommercialRealEstateLeaseSubleasingStrategySkill",
    displayName: "Commercial Real Estate Lease Subleasing Strategy",
    categoryId: "business",
    description: "Subleases excess corporate office footprint to reduce operating overhead.",
    tags: ["business","business","commercial","real"],
    transform: createStandardSkillTransform({
      sectionName: "Commercial Real Estate Lease Subleasing Strategy Standards",
      ruSectionName: "Стандарты и регламенты: Commercial Real Estate Lease Subleasing Strategy",
      instructions: [
        "Apply core domain tenets for Commercial Real Estate Lease Subleasing Strategy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Commercial Real Estate Lease Subleasing Strategy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","commercial","real"],
    }),
  },

  "business-b2b-enterprise-security-questionnaire-defense": {
    id: "business-b2b-enterprise-security-questionnaire-defense",
    name: "B2BEnterpriseSecurityQuestionnaireDefenseSkill",
    displayName: "B2B Enterprise Security Questionnaire Defense",
    categoryId: "business",
    description: "Accelerates enterprise procurement deals by streamlining SOC2/ISO answers.",
    tags: ["business","business","b2b","enterprise"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Enterprise Security Questionnaire Defense Standards",
      ruSectionName: "Стандарты и регламенты: B2B Enterprise Security Questionnaire Defense",
      instructions: [
        "Apply core domain tenets for B2B Enterprise Security Questionnaire Defense.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Enterprise Security Questionnaire Defense.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","enterprise"],
    }),
  },

  "business-product-category-creation-market-education": {
    id: "business-product-category-creation-market-education",
    name: "ProductCategoryCreationMarketEducationSkill",
    displayName: "Product Category Creation & Market Education",
    categoryId: "business",
    description: "Establishes new software product categories through thought leadership.",
    tags: ["business","business","product","category"],
    transform: createStandardSkillTransform({
      sectionName: "Product Category Creation & Market Education Standards",
      ruSectionName: "Стандарты и регламенты: Product Category Creation & Market Education",
      instructions: [
        "Apply core domain tenets for Product Category Creation & Market Education.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Product Category Creation & Market Education.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","product","category"],
    }),
  },

  "business-corporate-philanthropy-foundation-matching": {
    id: "business-corporate-philanthropy-foundation-matching",
    name: "CorporatePhilanthropyFoundationMatchingSkill",
    displayName: "Corporate Philanthropy & Foundation Matching",
    categoryId: "business",
    description: "Establishes corporate 1% pledge programs matching employee charitable donations.",
    tags: ["business","business","corporate","philanthropy"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Philanthropy & Foundation Matching Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Philanthropy & Foundation Matching",
      instructions: [
        "Apply core domain tenets for Corporate Philanthropy & Foundation Matching.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Philanthropy & Foundation Matching.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","corporate","philanthropy"],
    }),
  },

  "business-b2b-content-marketing-lead-generation-funnel": {
    id: "business-b2b-content-marketing-lead-generation-funnel",
    name: "B2BContentMarketingLeadGenerationFunnelSkill",
    displayName: "B2B Content Marketing Lead Generation Funnel",
    categoryId: "business",
    description: "Generates MQLs through gated white papers, webinars, and ROI calculators.",
    tags: ["business","business","b2b","content"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Content Marketing Lead Generation Funnel Standards",
      ruSectionName: "Стандарты и регламенты: B2B Content Marketing Lead Generation Funnel",
      instructions: [
        "Apply core domain tenets for B2B Content Marketing Lead Generation Funnel.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Content Marketing Lead Generation Funnel.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","content"],
    }),
  },

  "business-supply-chain-vendor-quality-defect-penalties": {
    id: "business-supply-chain-vendor-quality-defect-penalties",
    name: "SupplyChainVendorQualityDefectPenaltiesSkill",
    displayName: "Supply Chain Vendor Quality Defect Penalties",
    categoryId: "business",
    description: "Enforces factory defect SLA penalties on manufacturing suppliers.",
    tags: ["business","business","supply","chain"],
    transform: createStandardSkillTransform({
      sectionName: "Supply Chain Vendor Quality Defect Penalties Standards",
      ruSectionName: "Стандарты и регламенты: Supply Chain Vendor Quality Defect Penalties",
      instructions: [
        "Apply core domain tenets for Supply Chain Vendor Quality Defect Penalties.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Supply Chain Vendor Quality Defect Penalties.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","supply","chain"],
    }),
  },

  "business-saas-gross-margin-cloud-cost-optimization": {
    id: "business-saas-gross-margin-cloud-cost-optimization",
    name: "SaaSGrossMarginCloudCostOptimizationSkill",
    displayName: "SaaS Gross Margin Cloud Cost Optimization",
    categoryId: "business",
    description: "Reduces AWS/GCP hosting costs to increase software gross margins toward 80%.",
    tags: ["business","business","saas","gross"],
    transform: createStandardSkillTransform({
      sectionName: "SaaS Gross Margin Cloud Cost Optimization Standards",
      ruSectionName: "Стандарты и регламенты: SaaS Gross Margin Cloud Cost Optimization",
      instructions: [
        "Apply core domain tenets for SaaS Gross Margin Cloud Cost Optimization.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SaaS Gross Margin Cloud Cost Optimization.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","saas","gross"],
    }),
  },

  "business-corporate-restructuring-severance-plan": {
    id: "business-corporate-restructuring-severance-plan",
    name: "CorporateRestructuringSeverancePlanSkill",
    displayName: "Corporate Restructuring & Severance Plan",
    categoryId: "business",
    description: "Executes organizational rightsizing with transparent severance and job placement.",
    tags: ["business","business","corporate","restructuring"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Restructuring & Severance Plan Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Restructuring & Severance Plan",
      instructions: [
        "Apply core domain tenets for Corporate Restructuring & Severance Plan.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Restructuring & Severance Plan.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","corporate","restructuring"],
    }),
  },

  "business-b2b-account-based-marketing-abm-campaign": {
    id: "business-b2b-account-based-marketing-abm-campaign",
    name: "B2BAccountBasedMarketingABMCampaignSkill",
    displayName: "B2B Account-Based Marketing (ABM) Campaign",
    categoryId: "business",
    description: "Coordinates personalized multi-channel marketing campaigns targeting top 100 enterprise accounts.",
    tags: ["business","business","b2b","account"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Account-Based Marketing (ABM) Campaign Standards",
      ruSectionName: "Стандарты и регламенты: B2B Account-Based Marketing (ABM) Campaign",
      instructions: [
        "Apply core domain tenets for B2B Account-Based Marketing (ABM) Campaign.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Account-Based Marketing (ABM) Campaign.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","account"],
    }),
  },

  "business-franchisee-royalty-collection-field-audit": {
    id: "business-franchisee-royalty-collection-field-audit",
    name: "FranchiseeRoyaltyCollectionFieldAuditSkill",
    displayName: "Franchisee Royalty Collection & Field Audit",
    categoryId: "business",
    description: "Audits franchisee POS sales records to ensure accurate royalty collection.",
    tags: ["business","business","franchisee","royalty"],
    transform: createStandardSkillTransform({
      sectionName: "Franchisee Royalty Collection & Field Audit Standards",
      ruSectionName: "Стандарты и регламенты: Franchisee Royalty Collection & Field Audit",
      instructions: [
        "Apply core domain tenets for Franchisee Royalty Collection & Field Audit.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Franchisee Royalty Collection & Field Audit.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","franchisee","royalty"],
    }),
  },

  "business-retail-inventory-markdown-clearance-strategy": {
    id: "business-retail-inventory-markdown-clearance-strategy",
    name: "RetailInventoryMarkdownClearanceStrategySkill",
    displayName: "Retail Inventory Markdown & Clearance Strategy",
    categoryId: "business",
    description: "Executes seasonal inventory markdowns to clear slow-moving SKUs.",
    tags: ["business","business","retail","inventory"],
    transform: createStandardSkillTransform({
      sectionName: "Retail Inventory Markdown & Clearance Strategy Standards",
      ruSectionName: "Стандарты и регламенты: Retail Inventory Markdown & Clearance Strategy",
      instructions: [
        "Apply core domain tenets for Retail Inventory Markdown & Clearance Strategy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Retail Inventory Markdown & Clearance Strategy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","retail","inventory"],
    }),
  },

  "business-b2b-executive-sponsor-relationship-mapping": {
    id: "business-b2b-executive-sponsor-relationship-mapping",
    name: "B2BExecutiveSponsorRelationshipMappingSkill",
    displayName: "B2B Executive Sponsor Relationship Mapping",
    categoryId: "business",
    description: "Pairs internal VP executives with C-suite stakeholders at top clients.",
    tags: ["business","business","b2b","executive"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Executive Sponsor Relationship Mapping Standards",
      ruSectionName: "Стандарты и регламенты: B2B Executive Sponsor Relationship Mapping",
      instructions: [
        "Apply core domain tenets for B2B Executive Sponsor Relationship Mapping.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Executive Sponsor Relationship Mapping.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","executive"],
    }),
  },

  "business-corporate-crisis-financial-solvency-plan": {
    id: "business-corporate-crisis-financial-solvency-plan",
    name: "CorporateCrisisFinancialSolvencyPlanSkill",
    displayName: "Corporate Crisis Financial Solvency Plan",
    categoryId: "business",
    description: "Draws down credit lines and freezes non-essential CapEx during macro downturns.",
    tags: ["business","business","corporate","crisis"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Crisis Financial Solvency Plan Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Crisis Financial Solvency Plan",
      instructions: [
        "Apply core domain tenets for Corporate Crisis Financial Solvency Plan.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Crisis Financial Solvency Plan.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","corporate","crisis"],
    }),
  },

  "business-saas-customer-churn-save-desk-win-back": {
    id: "business-saas-customer-churn-save-desk-win-back",
    name: "SaaSCustomerChurnSaveDeskWinBackSkill",
    displayName: "SaaS Customer Churn Save Desk & Win-Back",
    categoryId: "business",
    description: "Deploys specialized save desk reps to offer customized retention plans.",
    tags: ["business","business","saas","customer"],
    transform: createStandardSkillTransform({
      sectionName: "SaaS Customer Churn Save Desk & Win-Back Standards",
      ruSectionName: "Стандарты и регламенты: SaaS Customer Churn Save Desk & Win-Back",
      instructions: [
        "Apply core domain tenets for SaaS Customer Churn Save Desk & Win-Back.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SaaS Customer Churn Save Desk & Win-Back.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","saas","customer"],
    }),
  },

  "business-b2b-sales-partner-portal-co-op-funds": {
    id: "business-b2b-sales-partner-portal-co-op-funds",
    name: "B2BSalesPartnerPortalCoOpFundsSkill",
    displayName: "B2B Sales Partner Portal & Co-Op Funds",
    categoryId: "business",
    description: "Provides resellers with co-branded marketing materials and MDF funds.",
    tags: ["business","business","b2b","sales"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Sales Partner Portal & Co-Op Funds Standards",
      ruSectionName: "Стандарты и регламенты: B2B Sales Partner Portal & Co-Op Funds",
      instructions: [
        "Apply core domain tenets for B2B Sales Partner Portal & Co-Op Funds.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Sales Partner Portal & Co-Op Funds.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","sales"],
    }),
  },

  "business-corporate-shared-services-efficiency-hub": {
    id: "business-corporate-shared-services-efficiency-hub",
    name: "CorporateSharedServicesEfficiencyHubSkill",
    displayName: "Corporate Shared Services Efficiency Hub",
    categoryId: "business",
    description: "Consolidates back-office HR, Finance, and IT functions into shared service hubs.",
    tags: ["business","business","corporate","shared"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Shared Services Efficiency Hub Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Shared Services Efficiency Hub",
      instructions: [
        "Apply core domain tenets for Corporate Shared Services Efficiency Hub.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Shared Services Efficiency Hub.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","corporate","shared"],
    }),
  },

  "business-e-commerce-return-rate-reduction-strategy": {
    id: "business-e-commerce-return-rate-reduction-strategy",
    name: "ECommerceReturnRateReductionStrategySkill",
    displayName: "E-Commerce Return Rate Reduction Strategy",
    categoryId: "business",
    description: "Reduces apparel return rates via accurate sizing charts and 3D product previews.",
    tags: ["business","business","e","commerce"],
    transform: createStandardSkillTransform({
      sectionName: "E-Commerce Return Rate Reduction Strategy Standards",
      ruSectionName: "Стандарты и регламенты: E-Commerce Return Rate Reduction Strategy",
      instructions: [
        "Apply core domain tenets for E-Commerce Return Rate Reduction Strategy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для E-Commerce Return Rate Reduction Strategy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","e","commerce"],
    }),
  },

  "business-b2b-enterprise-pilot-to-contract-conversion": {
    id: "business-b2b-enterprise-pilot-to-contract-conversion",
    name: "B2BEnterprisePilottoContractConversionSkill",
    displayName: "B2B Enterprise Pilot-to-Contract Conversion",
    categoryId: "business",
    description: "Converts paid proof-of-concept pilots into multi-year site licenses.",
    tags: ["business","business","b2b","enterprise"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Enterprise Pilot-to-Contract Conversion Standards",
      ruSectionName: "Стандарты и регламенты: B2B Enterprise Pilot-to-Contract Conversion",
      instructions: [
        "Apply core domain tenets for B2B Enterprise Pilot-to-Contract Conversion.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Enterprise Pilot-to-Contract Conversion.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","enterprise"],
    }),
  },

  "business-corporate-insurance-liability-d-o-coverage": {
    id: "business-corporate-insurance-liability-d-o-coverage",
    name: "CorporateInsuranceLiabilityDOCoverageSkill",
    displayName: "Corporate Insurance Liability & D&O Coverage",
    categoryId: "business",
    description: "Secures Directors & Officers (D&O), cyber liability, and general liability policies.",
    tags: ["business","business","corporate","insurance"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Insurance Liability & D&O Coverage Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Insurance Liability & D&O Coverage",
      instructions: [
        "Apply core domain tenets for Corporate Insurance Liability & D&O Coverage.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Insurance Liability & D&O Coverage.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","corporate","insurance"],
    }),
  },

  "business-saas-multi-year-contract-upfront-payment-discount": {
    id: "business-saas-multi-year-contract-upfront-payment-discount",
    name: "SaaSMultiYearContractUpfrontPaymentDiscountSkill",
    displayName: "SaaS Multi-Year Contract Upfront Payment Discount",
    categoryId: "business",
    description: "Offers 15% discounts for multi-year upfront contract cash payments.",
    tags: ["business","business","saas","multi"],
    transform: createStandardSkillTransform({
      sectionName: "SaaS Multi-Year Contract Upfront Payment Discount Standards",
      ruSectionName: "Стандарты и регламенты: SaaS Multi-Year Contract Upfront Payment Discount",
      instructions: [
        "Apply core domain tenets for SaaS Multi-Year Contract Upfront Payment Discount.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SaaS Multi-Year Contract Upfront Payment Discount.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","saas","multi"],
    }),
  },

  "business-b2b-sdr-lead-qualification-bant-standard": {
    id: "business-b2b-sdr-lead-qualification-bant-standard",
    name: "B2BSDRLeadQualificationBANTStandardSkill",
    displayName: "B2B SDR Lead Qualification BANT Standard",
    categoryId: "business",
    description: "Qualifies inbound sales leads across Budget, Authority, Need, and Timeline.",
    tags: ["business","business","b2b","sdr"],
    transform: createStandardSkillTransform({
      sectionName: "B2B SDR Lead Qualification BANT Standard Standards",
      ruSectionName: "Стандарты и регламенты: B2B SDR Lead Qualification BANT Standard",
      instructions: [
        "Apply core domain tenets for B2B SDR Lead Qualification BANT Standard.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B SDR Lead Qualification BANT Standard.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","sdr"],
    }),
  },

  "business-corporate-employee-referral-bonus-program": {
    id: "business-corporate-employee-referral-bonus-program",
    name: "CorporateEmployeeReferralBonusProgramSkill",
    displayName: "Corporate Employee Referral Bonus Program",
    categoryId: "business",
    description: "Drives high-quality engineering hires through cash employee referral bonuses.",
    tags: ["business","business","corporate","employee"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Employee Referral Bonus Program Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Employee Referral Bonus Program",
      instructions: [
        "Apply core domain tenets for Corporate Employee Referral Bonus Program.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Employee Referral Bonus Program.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","corporate","employee"],
    }),
  },

  "business-supply-chain-just-in-time-jit-buffer-safety": {
    id: "business-supply-chain-just-in-time-jit-buffer-safety",
    name: "SupplyChainJustinTimeJITBufferSafetySkill",
    displayName: "Supply Chain Just-in-Time (JIT) Buffer Safety",
    categoryId: "business",
    description: "Balances JIT lean inventory with strategic safety stock buffers.",
    tags: ["business","business","supply","chain"],
    transform: createStandardSkillTransform({
      sectionName: "Supply Chain Just-in-Time (JIT) Buffer Safety Standards",
      ruSectionName: "Стандарты и регламенты: Supply Chain Just-in-Time (JIT) Buffer Safety",
      instructions: [
        "Apply core domain tenets for Supply Chain Just-in-Time (JIT) Buffer Safety.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Supply Chain Just-in-Time (JIT) Buffer Safety.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","supply","chain"],
    }),
  },

  "business-b2b-customer-advocacy-reference-program": {
    id: "business-b2b-customer-advocacy-reference-program",
    name: "B2BCustomerAdvocacyReferenceProgramSkill",
    displayName: "B2B Customer Advocacy & Reference Program",
    categoryId: "business",
    description: "Nurtures customer advocates to participate in prospect reference calls.",
    tags: ["business","business","b2b","customer"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Customer Advocacy & Reference Program Standards",
      ruSectionName: "Стандарты и регламенты: B2B Customer Advocacy & Reference Program",
      instructions: [
        "Apply core domain tenets for B2B Customer Advocacy & Reference Program.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Customer Advocacy & Reference Program.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","customer"],
    }),
  },

  "business-corporate-pension-401-k-matching-governance": {
    id: "business-corporate-pension-401-k-matching-governance",
    name: "CorporatePension401kMatchingGovernanceSkill",
    displayName: "Corporate Pension & 401(k) Matching Governance",
    categoryId: "business",
    description: "Manages employee retirement benefits and fiduciary committee oversight.",
    tags: ["business","business","corporate","pension"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Pension & 401(k) Matching Governance Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Pension & 401(k) Matching Governance",
      instructions: [
        "Apply core domain tenets for Corporate Pension & 401(k) Matching Governance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Pension & 401(k) Matching Governance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","corporate","pension"],
    }),
  },

  "business-saas-benchmark-valuation-multiple-analysis": {
    id: "business-saas-benchmark-valuation-multiple-analysis",
    name: "SaaSBenchmarkValuationMultipleAnalysisSkill",
    displayName: "SaaS Benchmark Valuation Multiple Analysis",
    categoryId: "business",
    description: "Evaluates company valuation multiples (EV/ARR) based on growth and NRR.",
    tags: ["business","business","saas","benchmark"],
    transform: createStandardSkillTransform({
      sectionName: "SaaS Benchmark Valuation Multiple Analysis Standards",
      ruSectionName: "Стандарты и регламенты: SaaS Benchmark Valuation Multiple Analysis",
      instructions: [
        "Apply core domain tenets for SaaS Benchmark Valuation Multiple Analysis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SaaS Benchmark Valuation Multiple Analysis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","saas","benchmark"],
    }),
  },

  "business-b2b-field-marketing-regional-event-strategy": {
    id: "business-b2b-field-marketing-regional-event-strategy",
    name: "B2BFieldMarketingRegionalEventStrategySkill",
    displayName: "B2B Field Marketing Regional Event Strategy",
    categoryId: "business",
    description: "Hosts intimate C-suite dinners and regional roundtables to accelerate enterprise deals.",
    tags: ["business","business","b2b","field"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Field Marketing Regional Event Strategy Standards",
      ruSectionName: "Стандарты и регламенты: B2B Field Marketing Regional Event Strategy",
      instructions: [
        "Apply core domain tenets for B2B Field Marketing Regional Event Strategy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Field Marketing Regional Event Strategy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","field"],
    }),
  },

  "business-corporate-foreign-exchange-risk-hedging": {
    id: "business-corporate-foreign-exchange-risk-hedging",
    name: "CorporateForeignExchangeRiskHedgingSkill",
    displayName: "Corporate Foreign Exchange Risk Hedging",
    categoryId: "business",
    description: "Mitigates currency fluctuations using forward contracts and currency options.",
    tags: ["business","business","corporate","foreign"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Foreign Exchange Risk Hedging Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Foreign Exchange Risk Hedging",
      instructions: [
        "Apply core domain tenets for Corporate Foreign Exchange Risk Hedging.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Foreign Exchange Risk Hedging.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","corporate","foreign"],
    }),
  },

  "business-e-commerce-loyalty-program-point-redemption": {
    id: "business-e-commerce-loyalty-program-point-redemption",
    name: "ECommerceLoyaltyProgramPointRedemptionSkill",
    displayName: "E-Commerce Loyalty Program Point Redemption",
    categoryId: "business",
    description: "Designs gamified customer loyalty programs driving repeat purchase frequency.",
    tags: ["business","business","e","commerce"],
    transform: createStandardSkillTransform({
      sectionName: "E-Commerce Loyalty Program Point Redemption Standards",
      ruSectionName: "Стандарты и регламенты: E-Commerce Loyalty Program Point Redemption",
      instructions: [
        "Apply core domain tenets for E-Commerce Loyalty Program Point Redemption.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для E-Commerce Loyalty Program Point Redemption.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","e","commerce"],
    }),
  },

  "business-b2b-sales-demo-script-value-narrative": {
    id: "business-b2b-sales-demo-script-value-narrative",
    name: "B2BSalesDemoScriptValueNarrativeSkill",
    displayName: "B2B Sales Demo Script & Value Narrative",
    categoryId: "business",
    description: "Structures 30-minute sales demo scripts focused on prospect pain points.",
    tags: ["business","business","b2b","sales"],
    transform: createStandardSkillTransform({
      sectionName: "B2B Sales Demo Script & Value Narrative Standards",
      ruSectionName: "Стандарты и регламенты: B2B Sales Demo Script & Value Narrative",
      instructions: [
        "Apply core domain tenets for B2B Sales Demo Script & Value Narrative.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для B2B Sales Demo Script & Value Narrative.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","b2b","sales"],
    }),
  },

  "business-corporate-offshoring-global-capability-center": {
    id: "business-corporate-offshoring-global-capability-center",
    name: "CorporateOffshoringGlobalCapabilityCenterSkill",
    displayName: "Corporate Offshoring & Global Capability Center",
    categoryId: "business",
    description: "Establishes global capability centers (GCC) in India or Poland for engineering.",
    tags: ["business","business","corporate","offshoring"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Offshoring & Global Capability Center Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Offshoring & Global Capability Center",
      instructions: [
        "Apply core domain tenets for Corporate Offshoring & Global Capability Center.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Offshoring & Global Capability Center.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","corporate","offshoring"],
    }),
  },

  "business-saas-product-expansion-seat-add-on-engine": {
    id: "business-saas-product-expansion-seat-add-on-engine",
    name: "SaaSProductExpansionSeatAddOnEngineSkill",
    displayName: "SaaS Product Expansion Seat Add-On Engine",
    categoryId: "business",
    description: "Drives organic seat expansion as client departments adopt software.",
    tags: ["business","business","saas","product"],
    transform: createStandardSkillTransform({
      sectionName: "SaaS Product Expansion Seat Add-On Engine Standards",
      ruSectionName: "Стандарты и регламенты: SaaS Product Expansion Seat Add-On Engine",
      instructions: [
        "Apply core domain tenets for SaaS Product Expansion Seat Add-On Engine.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SaaS Product Expansion Seat Add-On Engine.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","saas","product"],
    }),
  },

  "business-comprehensive-business-strategy-execution-constitution": {
    id: "business-comprehensive-business-strategy-execution-constitution",
    name: "ComprehensiveBusinessStrategyExecutionConstitutionSkill",
    displayName: "Comprehensive Business Strategy & Execution Constitution",
    categoryId: "business",
    description: "Enforces world-class corporate strategy, unit economics, and operational rigor.",
    tags: ["business","business","comprehensive","business"],
    transform: createStandardSkillTransform({
      sectionName: "Comprehensive Business Strategy & Execution Constitution Standards",
      ruSectionName: "Стандарты и регламенты: Comprehensive Business Strategy & Execution Constitution",
      instructions: [
        "Apply core domain tenets for Comprehensive Business Strategy & Execution Constitution.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Comprehensive Business Strategy & Execution Constitution.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","comprehensive","business"],
    }),
  },

  "business-business-skill-90": {
    id: "business-business-skill-90",
    name: "businessSkill90Skill",
    displayName: "business Skill 90",
    categoryId: "business",
    description: "Applies advanced business Skill 90 standards and execution patterns.",
    tags: ["business","business","business","skill"],
    transform: createStandardSkillTransform({
      sectionName: "business Skill 90 Standards",
      ruSectionName: "Стандарты и регламенты: business Skill 90",
      instructions: [
        "Apply core domain tenets for business Skill 90.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для business Skill 90.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business","business","skill"],
    }),
  },
  "business-final-saas-net-revenue-retention-nrr-expansion-playbook": {
    id: "business-final-saas-net-revenue-retention-nrr-expansion-playbook",
    name: "SaaSNetRevenueRetentionNRRExpansionPlaybookSkill",
    displayName: "SaaS Net Revenue Retention NRR Expansion Playbook",
    categoryId: "business",
    description: "Drives account expansion through tier upgrades, seat expansion, and usage add-ons.",
    tags: ["business","business-final","final","saas"],
    transform: createStandardSkillTransform({
      sectionName: "SaaS Net Revenue Retention NRR Expansion Playbook Standards",
      ruSectionName: "Стандарты и регламенты: SaaS Net Revenue Retention NRR Expansion Playbook",
      instructions: [
        "Apply core domain tenets for SaaS Net Revenue Retention NRR Expansion Playbook.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SaaS Net Revenue Retention NRR Expansion Playbook.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business-final","final","saas"],
    }),
  },

  "business-final-strategic-corporate-ma-post-merger-integration-plan": {
    id: "business-final-strategic-corporate-ma-post-merger-integration-plan",
    name: "StrategicCorporateMAPostMergerIntegrationPlanSkill",
    displayName: "Strategic Corporate MA Post-Merger Integration Plan",
    categoryId: "business",
    description: "Executes 100-day post-merger integration for tech, culture, and sales synergy.",
    tags: ["business","business-final","final","strategic"],
    transform: createStandardSkillTransform({
      sectionName: "Strategic Corporate MA Post-Merger Integration Plan Standards",
      ruSectionName: "Стандарты и регламенты: Strategic Corporate MA Post-Merger Integration Plan",
      instructions: [
        "Apply core domain tenets for Strategic Corporate MA Post-Merger Integration Plan.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Strategic Corporate MA Post-Merger Integration Plan.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business-final","final","strategic"],
    }),
  },

  "business-final-master-enterprise-strategy-commercial-growth": {
    id: "business-final-master-enterprise-strategy-commercial-growth",
    name: "MasterEnterpriseStrategyCommercialGrowthSkill",
    displayName: "Master Enterprise Strategy Commercial Growth",
    categoryId: "business",
    description: "Enforces world-class commercial execution, corporate strategy, and revenue growth.",
    tags: ["business","business-final","final","master"],
    transform: createStandardSkillTransform({
      sectionName: "Master Enterprise Strategy Commercial Growth Standards",
      ruSectionName: "Стандарты и регламенты: Master Enterprise Strategy Commercial Growth",
      instructions: [
        "Apply core domain tenets for Master Enterprise Strategy Commercial Growth.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Master Enterprise Strategy Commercial Growth.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["business","business-final","final","master"],
    }),
  },
  "business-multi-multi-horizon-corporate-strategic-growth-roadmap": {
    id: "business-multi-multi-horizon-corporate-strategic-growth-roadmap",
    name: "MultiHorizonCorporateStrategicGrowthRoadmapSkill",
    displayName: "Multi Horizon Corporate Strategic Growth Roadmap",
    categoryId: "business",
    description: "Drafts Horizon 1 (core business), Horizon 2 (emerging opportunities), and Horizon 3 (disruptive bets).",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Corporate Strategic Growth Roadmap",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Corporate Strategic Growth Roadmap",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Horizon Corporate Strategic Growth Roadmap.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Horizon Corporate Strategic Growth Roadmap.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-stakeholder-value-proposition-canvas-alignment": {
    id: "business-multi-multi-stakeholder-value-proposition-canvas-alignment",
    name: "MultiStakeholderValuePropositionCanvasAlignmentSkill",
    displayName: "Multi Stakeholder Value Proposition Canvas Alignment",
    categoryId: "business",
    description: "Aligns buyer, end-user, IT admin, and executive buyer jobs-to-be-done into unified value proposition.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stakeholder Value Proposition Canvas Alignment",
      ruSectionName: "Композитный Multi-Skill: Multi Stakeholder Value Proposition Canvas Alignment",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Stakeholder Value Proposition Canvas Alignment.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Stakeholder Value Proposition Canvas Alignment.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-channel-go-to-market-omnichannel-strategy": {
    id: "business-multi-multi-channel-go-to-market-omnichannel-strategy",
    name: "MultiChannelGoToMarketOmnichannelStrategySkill",
    displayName: "Multi Channel Go To Market Omnichannel Strategy",
    categoryId: "business",
    description: "Coordinates direct sales, channel partners, self-serve PLG, and marketplace distribution channels.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Channel Go To Market Omnichannel Strategy",
      ruSectionName: "Композитный Multi-Skill: Multi Channel Go To Market Omnichannel Strategy",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Channel Go To Market Omnichannel Strategy.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Channel Go To Market Omnichannel Strategy.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-layer-business-model-canvas-architecture": {
    id: "business-multi-multi-layer-business-model-canvas-architecture",
    name: "MultiLayerBusinessModelCanvasArchitectureSkill",
    displayName: "Multi Layer Business Model Canvas Architecture",
    categoryId: "business",
    description: "Drafts value propositions, revenue streams, cost structures, and key partnerships in interconnected system.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Business Model Canvas Architecture",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Business Model Canvas Architecture",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Layer Business Model Canvas Architecture.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Layer Business Model Canvas Architecture.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-scenario-financial-forecasting-valuation-model": {
    id: "business-multi-multi-scenario-financial-forecasting-valuation-model",
    name: "MultiScenarioFinancialForecastingValuationModelSkill",
    displayName: "Multi Scenario Financial Forecasting Valuation Model",
    categoryId: "business",
    description: "Builds discounted cash flow (DCF) models with dynamic scenario toggles and sensitivity tables.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Scenario Financial Forecasting Valuation Model",
      ruSectionName: "Композитный Multi-Skill: Multi Scenario Financial Forecasting Valuation Model",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Scenario Financial Forecasting Valuation Model.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Scenario Financial Forecasting Valuation Model.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-tier-enterprise-sales-playbook-execution": {
    id: "business-multi-multi-tier-enterprise-sales-playbook-execution",
    name: "MultiTierEnterpriseSalesPlaybookExecutionSkill",
    displayName: "Multi Tier Enterprise Sales Playbook Execution",
    categoryId: "business",
    description: "Structures qualification (MEDDPICC), discovery call scripts, executive pitching, and closing playbooks.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Tier Enterprise Sales Playbook Execution",
      ruSectionName: "Композитный Multi-Skill: Multi Tier Enterprise Sales Playbook Execution",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Tier Enterprise Sales Playbook Execution.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Tier Enterprise Sales Playbook Execution.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-phase-corporate-turnaround-restructuring-plan": {
    id: "business-multi-multi-phase-corporate-turnaround-restructuring-plan",
    name: "MultiPhaseCorporateTurnaroundRestructuringPlanSkill",
    displayName: "Multi Phase Corporate Turnaround Restructuring Plan",
    categoryId: "business",
    description: "Executes emergency cash preservation, non-core asset divestiture, and operational margin recovery.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Phase Corporate Turnaround Restructuring Plan",
      ruSectionName: "Композитный Multi-Skill: Multi Phase Corporate Turnaround Restructuring Plan",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Phase Corporate Turnaround Restructuring Plan.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Phase Corporate Turnaround Restructuring Plan.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-country-international-expansion-playbook": {
    id: "business-multi-multi-country-international-expansion-playbook",
    name: "MultiCountryInternationalExpansionPlaybookSkill",
    displayName: "Multi Country International Expansion Playbook",
    categoryId: "business",
    description: "Guides market sizing, entity formation, local tax compliance, and cultural product adaptation.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Country International Expansion Playbook",
      ruSectionName: "Композитный Multi-Skill: Multi Country International Expansion Playbook",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Country International Expansion Playbook.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Country International Expansion Playbook.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-product-pricing-tier-monetization-matrix": {
    id: "business-multi-multi-product-pricing-tier-monetization-matrix",
    name: "MultiProductPricingTierMonetizationMatrixSkill",
    displayName: "Multi Product Pricing Tier Monetization Matrix",
    categoryId: "business",
    description: "Structures Freemium, Starter, Pro, and Enterprise pricing tiers with feature gates and usage limits.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Product Pricing Tier Monetization Matrix",
      ruSectionName: "Композитный Multi-Skill: Multi Product Pricing Tier Monetization Matrix",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Product Pricing Tier Monetization Matrix.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Product Pricing Tier Monetization Matrix.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-level-okr-objective-key-result-cascade": {
    id: "business-multi-multi-level-okr-objective-key-result-cascade",
    name: "MultiLevelOKRObjectiveKeyResultCascadeSkill",
    displayName: "Multi Level OKR Objective Key Result Cascade",
    categoryId: "business",
    description: "Cascades corporate OKRs down to department, team, and individual key result metrics.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level OKR Objective Key Result Cascade",
      ruSectionName: "Композитный Multi-Skill: Multi Level OKR Objective Key Result Cascade",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Level OKR Objective Key Result Cascade.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Level OKR Objective Key Result Cascade.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-method-competitive-moat-fortification-blueprint": {
    id: "business-multi-multi-method-competitive-moat-fortification-blueprint",
    name: "MultiMethodCompetitiveMoatFortificationBlueprintSkill",
    displayName: "Multi Method Competitive Moat Fortification Blueprint",
    categoryId: "business",
    description: "Strengthens network effects, switching costs, cost advantages, scale economies, and brand equity.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Method Competitive Moat Fortification Blueprint",
      ruSectionName: "Композитный Multi-Skill: Multi Method Competitive Moat Fortification Blueprint",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Method Competitive Moat Fortification Blueprint.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Method Competitive Moat Fortification Blueprint.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-stage-post-merger-integration-pmi-plan": {
    id: "business-multi-multi-stage-post-merger-integration-pmi-plan",
    name: "MultiStagePostMergerIntegrationPMIPlanSkill",
    displayName: "Multi Stage Post Merger Integration PMI Plan",
    categoryId: "business",
    description: "Executes Day 1, Day 30, Day 100 integration milestones across tech, culture, sales, and HR.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Post Merger Integration PMI Plan",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Post Merger Integration PMI Plan",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Stage Post Merger Integration PMI Plan.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Stage Post Merger Integration PMI Plan.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-segment-customer-retention-expansion-playbook": {
    id: "business-multi-multi-segment-customer-retention-expansion-playbook",
    name: "MultiSegmentCustomerRetentionExpansionPlaybookSkill",
    displayName: "Multi Segment Customer Retention Expansion Playbook",
    categoryId: "business",
    description: "Drives Net Revenue Retention (NRR) through upsells, cross-sells, seat expansion, and usage tiers.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Segment Customer Retention Expansion Playbook",
      ruSectionName: "Композитный Multi-Skill: Multi Segment Customer Retention Expansion Playbook",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Segment Customer Retention Expansion Playbook.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Segment Customer Retention Expansion Playbook.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-channel-customer-acquisition-cost-cac-optimization": {
    id: "business-multi-multi-channel-customer-acquisition-cost-cac-optimization",
    name: "MultiChannelCustomerAcquisitionCostCACOptimizationSkill",
    displayName: "Multi Channel Customer Acquisition Cost CAC Optimization",
    categoryId: "business",
    description: "Optimizes CAC across paid search, content SEO, paid social, outbound sales, and affiliate programs.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Channel Customer Acquisition Cost CAC Optimization",
      ruSectionName: "Композитный Multi-Skill: Multi Channel Customer Acquisition Cost CAC Optimization",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Channel Customer Acquisition Cost CAC Optimization.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Channel Customer Acquisition Cost CAC Optimization.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-layer-commercial-contract-negotiation-playbook": {
    id: "business-multi-multi-layer-commercial-contract-negotiation-playbook",
    name: "MultiLayerCommercialContractNegotiationPlaybookSkill",
    displayName: "Multi Layer Commercial Contract Negotiation Playbook",
    categoryId: "business",
    description: "Establishes deal term fallback positions for pricing discounts, payment terms, SLAs, and liability.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Commercial Contract Negotiation Playbook",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Commercial Contract Negotiation Playbook",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Layer Commercial Contract Negotiation Playbook.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Layer Commercial Contract Negotiation Playbook.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-variable-product-market-fit-pmf-verification": {
    id: "business-multi-multi-variable-product-market-fit-pmf-verification",
    name: "MultiVariableProductMarketFitPMFVerificationSkill",
    displayName: "Multi Variable Product Market Fit PMF Verification",
    categoryId: "business",
    description: "Measures Sean Ellis 40% rule, retention curve flattening, organic referral rates, and NPS.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Variable Product Market Fit PMF Verification",
      ruSectionName: "Композитный Multi-Skill: Multi Variable Product Market Fit PMF Verification",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Variable Product Market Fit PMF Verification.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Variable Product Market Fit PMF Verification.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-tier-franchise-expansion-operations-playbook": {
    id: "business-multi-multi-tier-franchise-expansion-operations-playbook",
    name: "MultiTierFranchiseExpansionOperationsPlaybookSkill",
    displayName: "Multi Tier Franchise Expansion Operations Playbook",
    categoryId: "business",
    description: "Drafts Franchise Disclosure Document (FDD) guidelines, franchisee onboarding, and royalty audits.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Tier Franchise Expansion Operations Playbook",
      ruSectionName: "Композитный Multi-Skill: Multi Tier Franchise Expansion Operations Playbook",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Tier Franchise Expansion Operations Playbook.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Tier Franchise Expansion Operations Playbook.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-horizon-corporate-innovation-lab-accelerator": {
    id: "business-multi-multi-horizon-corporate-innovation-lab-accelerator",
    name: "MultiHorizonCorporateInnovationLabAcceleratorSkill",
    displayName: "Multi Horizon Corporate Innovation Lab Accelerator",
    categoryId: "business",
    description: "Structures internal venture building, hackathons, strategic corporate venture capital (CVC) investments.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Corporate Innovation Lab Accelerator",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Corporate Innovation Lab Accelerator",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Horizon Corporate Innovation Lab Accelerator.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Horizon Corporate Innovation Lab Accelerator.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-metric-balanced-scorecard-performance-engine": {
    id: "business-multi-multi-metric-balanced-scorecard-performance-engine",
    name: "MultiMetricBalancedScorecardPerformanceEngineSkill",
    displayName: "Multi Metric Balanced Scorecard Performance Engine",
    categoryId: "business",
    description: "Tracks Financial, Customer, Internal Process, and Learning/Growth metrics in executive dashboard.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Metric Balanced Scorecard Performance Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Metric Balanced Scorecard Performance Engine",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Metric Balanced Scorecard Performance Engine.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Metric Balanced Scorecard Performance Engine.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-level-vendor-procurement-cost-reduction-strategy": {
    id: "business-multi-multi-level-vendor-procurement-cost-reduction-strategy",
    name: "MultiLevelVendorProcurementCostReductionStrategySkill",
    displayName: "Multi Level Vendor Procurement Cost Reduction Strategy",
    categoryId: "business",
    description: "Executes competitive RFPs, vendor consolidation, volume rebate negotiations, and contract renegotiation.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level Vendor Procurement Cost Reduction Strategy",
      ruSectionName: "Композитный Multi-Skill: Multi Level Vendor Procurement Cost Reduction Strategy",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Level Vendor Procurement Cost Reduction Strategy.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Level Vendor Procurement Cost Reduction Strategy.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-channel-content-marketing-demand-generation": {
    id: "business-multi-multi-channel-content-marketing-demand-generation",
    name: "MultiChannelContentMarketingDemandGenerationSkill",
    displayName: "Multi Channel Content Marketing Demand Generation",
    categoryId: "business",
    description: "Builds content engine converting top-of-funnel thought leadership into sales-qualified pipeline.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Channel Content Marketing Demand Generation",
      ruSectionName: "Композитный Multi-Skill: Multi Channel Content Marketing Demand Generation",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Channel Content Marketing Demand Generation.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Channel Content Marketing Demand Generation.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-tier-strategic-partnership-co-selling-playbook": {
    id: "business-multi-multi-tier-strategic-partnership-co-selling-playbook",
    name: "MultiTierStrategicPartnershipCoSellingPlaybookSkill",
    displayName: "Multi Tier Strategic Partnership Co Selling Playbook",
    categoryId: "business",
    description: "Drafts partner tier requirements, revenue share splits, co-marketing collateral, and deal registration.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Tier Strategic Partnership Co Selling Playbook",
      ruSectionName: "Композитный Multi-Skill: Multi Tier Strategic Partnership Co Selling Playbook",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Tier Strategic Partnership Co Selling Playbook.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Tier Strategic Partnership Co Selling Playbook.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-stage-corporate-venture-capital-cvc-investment": {
    id: "business-multi-multi-stage-corporate-venture-capital-cvc-investment",
    name: "MultiStageCorporateVentureCapitalCVCInvestmentSkill",
    displayName: "Multi Stage Corporate Venture Capital CVC Investment",
    categoryId: "business",
    description: "Evaluates deal sourcing, strategic fit matrix, due diligence, board observer terms, and follow-ons.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Corporate Venture Capital CVC Investment",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Corporate Venture Capital CVC Investment",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Stage Corporate Venture Capital CVC Investment.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Stage Corporate Venture Capital CVC Investment.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-horizon-esg-sustainability-business-integration": {
    id: "business-multi-multi-horizon-esg-sustainability-business-integration",
    name: "MultiHorizonESGSustainabilityBusinessIntegrationSkill",
    displayName: "Multi Horizon ESG Sustainability Business Integration",
    categoryId: "business",
    description: "Integrates decarbonization goals, sustainable sourcing, circular economy, and ESG reporting.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon ESG Sustainability Business Integration",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon ESG Sustainability Business Integration",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Horizon ESG Sustainability Business Integration.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Horizon ESG Sustainability Business Integration.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-segment-b2b-enterprise-account-based-marketing-abm": {
    id: "business-multi-multi-segment-b2b-enterprise-account-based-marketing-abm",
    name: "MultiSegmentB2BEnterpriseAccountBasedMarketingABMSkill",
    displayName: "Multi Segment B2B Enterprise Account Based Marketing ABM",
    categoryId: "business",
    description: "Structures tier-1 target account lists, personalized campaign playbooks, and sales cadences.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Segment B2B Enterprise Account Based Marketing ABM",
      ruSectionName: "Композитный Multi-Skill: Multi Segment B2B Enterprise Account Based Marketing ABM",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Segment B2B Enterprise Account Based Marketing ABM.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Segment B2B Enterprise Account Based Marketing ABM.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-layer-operations-process-reengineering-bpr": {
    id: "business-multi-multi-layer-operations-process-reengineering-bpr",
    name: "MultiLayerOperationsProcessReengineeringBPRSkill",
    displayName: "Multi Layer Operations Process Reengineering BPR",
    categoryId: "business",
    description: "Redesigns core business workflows eliminating waste, reducing lead time, and automating handoffs.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Operations Process Reengineering BPR",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Operations Process Reengineering BPR",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Layer Operations Process Reengineering BPR.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Layer Operations Process Reengineering BPR.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-country-tax-transfer-pricing-strategy": {
    id: "business-multi-multi-country-tax-transfer-pricing-strategy",
    name: "MultiCountryTaxTransferPricingStrategySkill",
    displayName: "Multi Country Tax Transfer Pricing Strategy",
    categoryId: "business",
    description: "Establishes arm's length transfer pricing documentation, intercompany agreements, and BEPS compliance.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Country Tax Transfer Pricing Strategy",
      ruSectionName: "Композитный Multi-Skill: Multi Country Tax Transfer Pricing Strategy",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Country Tax Transfer Pricing Strategy.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Country Tax Transfer Pricing Strategy.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-stage-product-launch-go-live-playbook": {
    id: "business-multi-multi-stage-product-launch-go-live-playbook",
    name: "MultiStageProductLaunchGoLivePlaybookSkill",
    displayName: "Multi Stage Product Launch Go Live Playbook",
    categoryId: "business",
    description: "Coordinates PR announcements, enablement training, customer webinars, and ad campaign launches.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Product Launch Go Live Playbook",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Product Launch Go Live Playbook",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Stage Product Launch Go Live Playbook.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Stage Product Launch Go Live Playbook.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-tier-customer-success-health-score-architecture": {
    id: "business-multi-multi-tier-customer-success-health-score-architecture",
    name: "MultiTierCustomerSuccessHealthScoreArchitectureSkill",
    displayName: "Multi Tier Customer Success Health Score Architecture",
    categoryId: "business",
    description: "Combines product usage frequency, support ticket volume, executive sponsor changes, and NPS.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Tier Customer Success Health Score Architecture",
      ruSectionName: "Композитный Multi-Skill: Multi Tier Customer Success Health Score Architecture",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Tier Customer Success Health Score Architecture.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Tier Customer Success Health Score Architecture.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-factor-executive-compensation-incentive-scheme": {
    id: "business-multi-multi-factor-executive-compensation-incentive-scheme",
    name: "MultiFactorExecutiveCompensationIncentiveSchemeSkill",
    displayName: "Multi Factor Executive Compensation Incentive Scheme",
    categoryId: "business",
    description: "Structures base salary, short-term bonuses, long-term equity RSUs, and performance vesting hurdles.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Executive Compensation Incentive Scheme",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Executive Compensation Incentive Scheme",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Factor Executive Compensation Incentive Scheme.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Factor Executive Compensation Incentive Scheme.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-horizon-supply-chain-resiliency-strategy": {
    id: "business-multi-multi-horizon-supply-chain-resiliency-strategy",
    name: "MultiHorizonSupplyChainResiliencyStrategySkill",
    displayName: "Multi Horizon Supply Chain Resiliency Strategy",
    categoryId: "business",
    description: "Diversifies dual-sourcing, nearshoring, safety stock buffers, and carrier redundancy.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Supply Chain Resiliency Strategy",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Supply Chain Resiliency Strategy",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Horizon Supply Chain Resiliency Strategy.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Horizon Supply Chain Resiliency Strategy.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-channel-e-commerce-d2c-growth-playbook": {
    id: "business-multi-multi-channel-e-commerce-d2c-growth-playbook",
    name: "MultiChannelECommerceD2CGrowthPlaybookSkill",
    displayName: "Multi Channel E Commerce D2C Growth Playbook",
    categoryId: "business",
    description: "Optimizes conversion funnels, subscription retention, AOV upsells, and email/SMS flows.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Channel E Commerce D2C Growth Playbook",
      ruSectionName: "Композитный Multi-Skill: Multi Channel E Commerce D2C Growth Playbook",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Channel E Commerce D2C Growth Playbook.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Channel E Commerce D2C Growth Playbook.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-stage-change-management-adkar-deployment": {
    id: "business-multi-multi-stage-change-management-adkar-deployment",
    name: "MultiStageChangeManagementADKARDeploymentSkill",
    displayName: "Multi Stage Change Management ADKAR Deployment",
    categoryId: "business",
    description: "Guides organizational change through Awareness, Desire, Knowledge, Ability, and Reinforcement.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Change Management ADKAR Deployment",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Change Management ADKAR Deployment",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Stage Change Management ADKAR Deployment.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Stage Change Management ADKAR Deployment.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-tier-working-capital-optimization-blueprint": {
    id: "business-multi-multi-tier-working-capital-optimization-blueprint",
    name: "MultiTierWorkingCapitalOptimizationBlueprintSkill",
    displayName: "Multi Tier Working Capital Optimization Blueprint",
    categoryId: "business",
    description: "Optimizes Days Sales Outstanding (DSO), Days Inventory Outstanding (DIO), and Days Payable (DPO).",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Tier Working Capital Optimization Blueprint",
      ruSectionName: "Композитный Multi-Skill: Multi Tier Working Capital Optimization Blueprint",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Tier Working Capital Optimization Blueprint.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Tier Working Capital Optimization Blueprint.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-channel-product-product-led-growth-plg-engine": {
    id: "business-multi-multi-channel-product-product-led-growth-plg-engine",
    name: "MultiChannelProductProductLedGrowthPLGEngineSkill",
    displayName: "Multi Channel Product Product-Led Growth PLG Engine",
    categoryId: "business",
    description: "Builds viral invitation loops, self-serve onboarding, product-qualified lead (PQL) triggers, and paywalls.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Channel Product Product-Led Growth PLG Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Channel Product Product-Led Growth PLG Engine",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Channel Product Product-Led Growth PLG Engine.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Channel Product Product-Led Growth PLG Engine.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-market-cross-border-e-commerce-expansion": {
    id: "business-multi-multi-market-cross-border-e-commerce-expansion",
    name: "MultiMarketCrossBorderECommerceExpansionSkill",
    displayName: "Multi Market Cross Border E Commerce Expansion",
    categoryId: "business",
    description: "Configures multi-currency checkouts, localized shipping, duty calculation, and regional marketing.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Market Cross Border E Commerce Expansion",
      ruSectionName: "Композитный Multi-Skill: Multi Market Cross Border E Commerce Expansion",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Market Cross Border E Commerce Expansion.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Market Cross Border E Commerce Expansion.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-tier-cloud-saas-security-compliance-positioning": {
    id: "business-multi-multi-tier-cloud-saas-security-compliance-positioning",
    name: "MultiTierCloudSaaSSecurityCompliancePositioningSkill",
    displayName: "Multi Tier Cloud SaaS Security Compliance Positioning",
    categoryId: "business",
    description: "Transforms SOC 2, ISO 27001, and FedRAMP compliance credentials into enterprise sales collaterals.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Tier Cloud SaaS Security Compliance Positioning",
      ruSectionName: "Композитный Multi-Skill: Multi Tier Cloud SaaS Security Compliance Positioning",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Tier Cloud SaaS Security Compliance Positioning.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Tier Cloud SaaS Security Compliance Positioning.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-stage-customer-advisory-board-cab-governance": {
    id: "business-multi-multi-stage-customer-advisory-board-cab-governance",
    name: "MultiStageCustomerAdvisoryBoardCABGovernanceSkill",
    displayName: "Multi Stage Customer Advisory Board CAB Governance",
    categoryId: "business",
    description: "Schedules bi-annual CAB meetings, agenda creation, feedback loops, and executive relationship building.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Customer Advisory Board CAB Governance",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Customer Advisory Board CAB Governance",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Stage Customer Advisory Board CAB Governance.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Stage Customer Advisory Board CAB Governance.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-horizon-corporate-real-estate-workplace-strategy": {
    id: "business-multi-multi-horizon-corporate-real-estate-workplace-strategy",
    name: "MultiHorizonCorporateRealEstateWorkplaceStrategySkill",
    displayName: "Multi Horizon Corporate Real Estate Workplace Strategy",
    categoryId: "business",
    description: "Balances hybrid office footprint, flex space leasing, lease renegotiation, and facilities costs.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Corporate Real Estate Workplace Strategy",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Corporate Real Estate Workplace Strategy",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Horizon Corporate Real Estate Workplace Strategy.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Horizon Corporate Real Estate Workplace Strategy.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-factor-brand-crisis-management-playbook": {
    id: "business-multi-multi-factor-brand-crisis-management-playbook",
    name: "MultiFactorBrandCrisisManagementPlaybookSkill",
    displayName: "Multi Factor Brand Crisis Management Playbook",
    categoryId: "business",
    description: "Executes holding statements, press conference protocol, social media monitoring, and brand rehabilitation.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Brand Crisis Management Playbook",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Brand Crisis Management Playbook",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Factor Brand Crisis Management Playbook.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Factor Brand Crisis Management Playbook.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-tier-logistics-last-mile-delivery-optimization": {
    id: "business-multi-multi-tier-logistics-last-mile-delivery-optimization",
    name: "MultiTierLogisticsLastMileDeliveryOptimizationSkill",
    displayName: "Multi Tier Logistics Last Mile Delivery Optimization",
    categoryId: "business",
    description: "Optimizes urban micro-fulfillment hubs, courier partner fleets, dynamic route grouping, and SLA tracking.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Tier Logistics Last Mile Delivery Optimization",
      ruSectionName: "Композитный Multi-Skill: Multi Tier Logistics Last Mile Delivery Optimization",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Tier Logistics Last Mile Delivery Optimization.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Tier Logistics Last Mile Delivery Optimization.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-stage-strategic-licensing-ip-monetization": {
    id: "business-multi-multi-stage-strategic-licensing-ip-monetization",
    name: "MultiStageStrategicLicensingIPMonetizationSkill",
    displayName: "Multi Stage Strategic Licensing IP Monetization",
    categoryId: "business",
    description: "Drafts patent and trademark licensing agreements, royalty rate benchmarks, and audit rights.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Strategic Licensing IP Monetization",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Strategic Licensing IP Monetization",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Stage Strategic Licensing IP Monetization.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Stage Strategic Licensing IP Monetization.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-channel-b2b-customer-support-sla-strategy": {
    id: "business-multi-multi-channel-b2b-customer-support-sla-strategy",
    name: "MultiChannelB2BCustomerSupportSLAStrategySkill",
    displayName: "Multi Channel B2B Customer Support SLA Strategy",
    categoryId: "business",
    description: "Defines Tier 1-3 support channels, ticket response/resolution SLAs, and customer escalation paths.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Channel B2B Customer Support SLA Strategy",
      ruSectionName: "Композитный Multi-Skill: Multi Channel B2B Customer Support SLA Strategy",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Channel B2B Customer Support SLA Strategy.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Channel B2B Customer Support SLA Strategy.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-horizon-family-office-wealth-succession-plan": {
    id: "business-multi-multi-horizon-family-office-wealth-succession-plan",
    name: "MultiHorizonFamilyOfficeWealthSuccessionPlanSkill",
    displayName: "Multi Horizon Family Office Wealth Succession Plan",
    categoryId: "business",
    description: "Structures asset allocation, intergenerational trust governance, philanthropic foundations, and tax planning.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Family Office Wealth Succession Plan",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Family Office Wealth Succession Plan",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Horizon Family Office Wealth Succession Plan.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Horizon Family Office Wealth Succession Plan.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-tier-food-beverage-franchise-store-operations": {
    id: "business-multi-multi-tier-food-beverage-franchise-store-operations",
    name: "MultiTierFoodBeverageFranchiseStoreOperationsSkill",
    displayName: "Multi Tier Food Beverage Franchise Store Operations",
    categoryId: "business",
    description: "Drafts store opening checklists, secret shopper audits, labor cost scheduling, and food safety standards.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Tier Food Beverage Franchise Store Operations",
      ruSectionName: "Композитный Multi-Skill: Multi Tier Food Beverage Franchise Store Operations",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Tier Food Beverage Franchise Store Operations.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Tier Food Beverage Franchise Store Operations.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-stage-pharmaceutical-commercialization-pathway": {
    id: "business-multi-multi-stage-pharmaceutical-commercialization-pathway",
    name: "MultiStagePharmaceuticalCommercializationPathwaySkill",
    displayName: "Multi Stage Pharmaceutical Commercialization Pathway",
    categoryId: "business",
    description: "Navigates market access, payer reimbursement negotiation, physician detail campaigns, and launch.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Pharmaceutical Commercialization Pathway",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Pharmaceutical Commercialization Pathway",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Stage Pharmaceutical Commercialization Pathway.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Stage Pharmaceutical Commercialization Pathway.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-channel-crowdfunding-equity-campaign-execution": {
    id: "business-multi-multi-channel-crowdfunding-equity-campaign-execution",
    name: "MultiChannelCrowdfundingEquityCampaignExecutionSkill",
    displayName: "Multi Channel Crowdfunding Equity Campaign Execution",
    categoryId: "business",
    description: "Structures campaign video scripting, backer rewards, PR outreach, and SEC Reg CF/Reg A+ compliance.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Channel Crowdfunding Equity Campaign Execution",
      ruSectionName: "Композитный Multi-Skill: Multi Channel Crowdfunding Equity Campaign Execution",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Channel Crowdfunding Equity Campaign Execution.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Channel Crowdfunding Equity Campaign Execution.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-layer-telecom-arpu-churn-prevention-playbook": {
    id: "business-multi-multi-layer-telecom-arpu-churn-prevention-playbook",
    name: "MultiLayerTelecomARPUChurnPreventionPlaybookSkill",
    displayName: "Multi Layer Telecom ARPU Churn Prevention Playbook",
    categoryId: "business",
    description: "Drives Average Revenue Per User (ARPU) via 5G speed upgrades, device financing, and OTT bundles.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Telecom ARPU Churn Prevention Playbook",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Telecom ARPU Churn Prevention Playbook",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Layer Telecom ARPU Churn Prevention Playbook.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Layer Telecom ARPU Churn Prevention Playbook.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-stage-heavy-machinery-asset-leasing-playbook": {
    id: "business-multi-multi-stage-heavy-machinery-asset-leasing-playbook",
    name: "MultiStageHeavyMachineryAssetLeasingPlaybookSkill",
    displayName: "Multi Stage Heavy Machinery Asset Leasing Playbook",
    categoryId: "business",
    description: "Structures equipment operating leases, residual value calculations, maintenance contracts, and repossession.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Heavy Machinery Asset Leasing Playbook",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Heavy Machinery Asset Leasing Playbook",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Stage Heavy Machinery Asset Leasing Playbook.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Stage Heavy Machinery Asset Leasing Playbook.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-channel-non-profit-donor-acquisition-strategy": {
    id: "business-multi-multi-channel-non-profit-donor-acquisition-strategy",
    name: "MultiChannelNonProfitDonorAcquisitionStrategySkill",
    displayName: "Multi Channel Non Profit Donor Acquisition Strategy",
    categoryId: "business",
    description: "Executes major donor stewardship, recurring monthly giver campaigns, grant applications, and galas.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Channel Non Profit Donor Acquisition Strategy",
      ruSectionName: "Композитный Multi-Skill: Multi Channel Non Profit Donor Acquisition Strategy",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Channel Non Profit Donor Acquisition Strategy.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Channel Non Profit Donor Acquisition Strategy.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-tier-renewable-energy-power-purchase-agreement-ppa": {
    id: "business-multi-multi-tier-renewable-energy-power-purchase-agreement-ppa",
    name: "MultiTierRenewableEnergyPowerPurchaseAgreementPPASkill",
    displayName: "Multi Tier Renewable Energy Power Purchase Agreement PPA",
    categoryId: "business",
    description: "Structures corporate virtual PPAs, strike price negotiations, green attribute RECs, and curtailment terms.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Tier Renewable Energy Power Purchase Agreement PPA",
      ruSectionName: "Композитный Multi-Skill: Multi Tier Renewable Energy Power Purchase Agreement PPA",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Tier Renewable Energy Power Purchase Agreement PPA.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Tier Renewable Energy Power Purchase Agreement PPA.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-stage-commercial-aviation-route-profitability": {
    id: "business-multi-multi-stage-commercial-aviation-route-profitability",
    name: "MultiStageCommercialAviationRouteProfitabilitySkill",
    displayName: "Multi Stage Commercial Aviation Route Profitability",
    categoryId: "business",
    description: "Calculates passenger load factors, yield per seat mile (RASM), jet fuel hedging, and airport slot costs.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Commercial Aviation Route Profitability",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Commercial Aviation Route Profitability",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Stage Commercial Aviation Route Profitability.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Stage Commercial Aviation Route Profitability.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-channel-automotive-dealership-network-sales": {
    id: "business-multi-multi-channel-automotive-dealership-network-sales",
    name: "MultiChannelAutomotiveDealershipNetworkSalesSkill",
    displayName: "Multi Channel Automotive Dealership Network Sales",
    categoryId: "business",
    description: "Coordinates OEM inventory allocation, dealer margin incentives, floorplan financing, and EV sales training.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Channel Automotive Dealership Network Sales",
      ruSectionName: "Композитный Multi-Skill: Multi Channel Automotive Dealership Network Sales",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Channel Automotive Dealership Network Sales.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Channel Automotive Dealership Network Sales.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-layer-commercial-banking-small-business-lending": {
    id: "business-multi-multi-layer-commercial-banking-small-business-lending",
    name: "MultiLayerCommercialBankingSmallBusinessLendingSkill",
    displayName: "Multi Layer Commercial Banking Small Business Lending",
    categoryId: "business",
    description: "Streamlines credit underwriting, SBA loan guarantee applications, collateral valuation, and defaults.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Commercial Banking Small Business Lending",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Commercial Banking Small Business Lending",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Layer Commercial Banking Small Business Lending.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Layer Commercial Banking Small Business Lending.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-stage-hotel-hospitality-loyalty-program": {
    id: "business-multi-multi-stage-hotel-hospitality-loyalty-program",
    name: "MultiStageHotelHospitalityLoyaltyProgramSkill",
    displayName: "Multi Stage Hotel Hospitality Loyalty Program",
    categoryId: "business",
    description: "Structures reward point earning tiers, partner airline point swaps, VIP perks, and redemption liability.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Hotel Hospitality Loyalty Program",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Hotel Hospitality Loyalty Program",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Stage Hotel Hospitality Loyalty Program.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Stage Hotel Hospitality Loyalty Program.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-channel-independent-software-vendor-isv-ecosystem": {
    id: "business-multi-multi-channel-independent-software-vendor-isv-ecosystem",
    name: "MultiChannelIndependentSoftwareVendorISVEcosystemSkill",
    displayName: "Multi Channel Independent Software Vendor ISV Ecosystem",
    categoryId: "business",
    description: "Builds app marketplace partner programs, developer APIs, co-marketing funds, and revenue share terms.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Channel Independent Software Vendor ISV Ecosystem",
      ruSectionName: "Композитный Multi-Skill: Multi Channel Independent Software Vendor ISV Ecosystem",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Channel Independent Software Vendor ISV Ecosystem.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Channel Independent Software Vendor ISV Ecosystem.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-horizon-construction-contractor-cash-flow-management": {
    id: "business-multi-multi-horizon-construction-contractor-cash-flow-management",
    name: "MultiHorizonConstructionContractorCashFlowManagementSkill",
    displayName: "Multi Horizon Construction Contractor Cash Flow Management",
    categoryId: "business",
    description: "Manages progress billing, retainage release, subcontractor pay-when-paid clauses, and surety bonds.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Construction Contractor Cash Flow Management",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Construction Contractor Cash Flow Management",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Horizon Construction Contractor Cash Flow Management.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Horizon Construction Contractor Cash Flow Management.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-tier-retail-store-layout-foot-traffic-optimization": {
    id: "business-multi-multi-tier-retail-store-layout-foot-traffic-optimization",
    name: "MultiTierRetailStoreLayoutFootTrafficOptimizationSkill",
    displayName: "Multi Tier Retail Store Layout Foot Traffic Optimization",
    categoryId: "business",
    description: "Optimizes endcap displays, planogram shelf placement, impulse buy zones, and loss prevention.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Tier Retail Store Layout Foot Traffic Optimization",
      ruSectionName: "Композитный Multi-Skill: Multi Tier Retail Store Layout Foot Traffic Optimization",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Tier Retail Store Layout Foot Traffic Optimization.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Tier Retail Store Layout Foot Traffic Optimization.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-stage-maritime-freight-charter-party-negotiation": {
    id: "business-multi-multi-stage-maritime-freight-charter-party-negotiation",
    name: "MultiStageMaritimeFreightCharterPartyNegotiationSkill",
    displayName: "Multi Stage Maritime Freight Charter Party Negotiation",
    categoryId: "business",
    description: "Drafts time and voyage charter contracts, demurrage terms, laytime calculations, and fuel clauses.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Maritime Freight Charter Party Negotiation",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Maritime Freight Charter Party Negotiation",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Stage Maritime Freight Charter Party Negotiation.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Stage Maritime Freight Charter Party Negotiation.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },

  "business-multi-multi-horizon-master-business-growth-blueprint-engine": {
    id: "business-multi-multi-horizon-master-business-growth-blueprint-engine",
    name: "MultiHorizonMasterBusinessGrowthBlueprintEngineSkill",
    displayName: "Multi Horizon Master Business Growth Blueprint Engine",
    categoryId: "business",
    description: "Enforces master strategic vision, commercial execution, financial modeling, and market dominance.",
    tags: ["business","multi-skill","business-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Master Business Growth Blueprint Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Master Business Growth Blueprint Engine",
      instructions: [
        "Execute multi-perspective phase 1: Role setup & constraint specification for Multi Horizon Master Business Growth Blueprint Engine.",
        "Execute multi-perspective phase 2: Iterative debate, analysis, or multi-agent execution pipeline.",
        "Execute multi-perspective phase 3: Synthesize consensus, friction points, and structured final summary."
],
      ruInstructions: [
        "Этап 1: Инициализация ролей, параметров и ограничений для Multi Horizon Master Business Growth Blueprint Engine.",
        "Этап 2: Итеративный анализ, дебаты или мульти-агентное исполнение конвейера.",
        "Этап 3: Синтез консенсуса, разногласий и итогового структурированного вывода."
],
      semanticType: "process_directive",
      tags: ["business","multi-skill","business-multi"],
    }),
  },
};
