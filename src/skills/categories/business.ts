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
    description: 'Sequences commercial launches across Private Alpha, Public Beta, General Availability (GA), and Expansion phases.',
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
          '- **Фазы запуска**: Разбить запуск на 4 этапа: 1) Private Alpha (10 дизайн-партнеров), 2) Public Beta (тест юнит-экономики), 3) Commercial GA, 4) Scale Expansion.',
          '- **Критерии перехода (Phase Gates)**: Определить жесткие условия перехода на следующий этап (NPS > 50, Retention > 40%, zero P0 багов).',
          '- **Каналы дистрибуции**: Специфицировать ведущие каналы привлечения (Product-Led Growth vs. Outbound Enterprise Sales).',
        ],
        [
          '- **Launch Milestones**: Segment launch across 1) Private Alpha (10 design partners), 2) Public Beta (monetization test), 3) Commercial GA, 4) Scale.',
          '- **Phase Gate Criteria**: Establish strict quantitative gates to unlock next phase (NPS > 50, Day-30 Retention > 40%, zero P0 bugs).',
          '- **Channel Mix**: Delineate primary acquisition channels (PLG viral loops vs. High-Touch Outbound Enterprise Sales).',
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
};
