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
};
