import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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
};
