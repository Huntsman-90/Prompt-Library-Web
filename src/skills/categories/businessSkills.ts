import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const BUSINESS_SKILLS: Record<string, SkillDefinition> = {
  'unit-economics-modeling': {
    id: 'unit-economics-modeling',
    name: 'UnitEconomicsModelingSkill',
    displayName: 'SaaS Unit Economics (LTV / CAC / Payback)',
    categoryId: 'business',
    description: 'Calculates Customer Acquisition Cost, Lifetime Value, gross margins, and CAC Payback Period.',
    tags: ['business', 'unit-economics', 'ltv', 'cac', 'saas', 'payback', 'finance'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Модель Юнит-Экономики и Финансовые Метрики',
        'Unit Economics & Financial Sensitivity Model',
        [
          '- **CAC (Customer Acquisition Cost)**: Расчет стоимости привлечения по каналам.',
          '- **LTV (Lifetime Value)**: `(ARPU * Gross Margin %) / Monthly Churn Rate`.',
          '- **LTV/CAC Ratio**: Целевое соотношение >= 3.0x.',
          '- **CAC Payback Period**: Срок окупаемости затрат на привлечение (< 12 месяцев).',
        ],
        [
          '- **CAC Calculation**: Blended and paid customer acquisition cost per channel.',
          '- **LTV Calculation**: `(ARPU * Gross Margin %) / Churn Rate`. Target LTV/CAC >= 3.0x.',
          '- **CAC Payback Period**: Time required to recover acquisition spend (target < 12 months).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'gtm-roadmap-phasing': {
    id: 'gtm-roadmap-phasing',
    name: 'GTMRoadmapPhasingSkill',
    displayName: 'Go-to-Market (GTM) Phased Horizons',
    categoryId: 'business',
    description: 'Structures go-to-market execution into 3 phased horizons: Beachhead, Scaled Channels, and Ecosystem Moats.',
    tags: ['business', 'gtm', 'roadmap', 'growth', 'strategy', 'scaling'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Фазированная Дорожная Карта Выхода на Рынок (GTM)',
        'Phased Go-to-Market (GTM) Horizon Roadmap',
        [
          '- **Горизонт 1 (0-90 дней, Валидация)**: Достижение Product-Market Fit в узком сегменте (Beachhead ICP).',
          '- **Горизонт 2 (3-9 месяцев, Масштабирование)**: Построение повторяемых каналов дистрибуции и снижение CAC.',
          '- **Горизонт 3 (9+ месяцев, Доминирование)**: Формирование сетевых эффектов и экосистемного удержания.',
        ],
        [
          '- **Horizon 1 (0-90 Days, Beachhead)**: Secure Product-Market Fit validation within a narrow, high-urgency ICP cohort.',
          '- **Horizon 2 (3-9 Months, Expansion)**: Scale repeatable customer acquisition pipelines and compress payback period.',
          '- **Horizon 3 (9+ Months, Defense)**: Solidify platform network effects, enterprise contracts, and high switching costs.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'defensible-moats': {
    id: 'defensible-moats',
    name: 'DefensibleMoatsSkill',
    displayName: 'Hamilton Helmer 7 Powers Moat Strategy',
    categoryId: 'business',
    description: 'Engineers defensible structural competitive advantages (Network Effects, Switching Costs, Counter-Positioning).',
    tags: ['business', 'moats', '7-powers', 'competitive-advantage', 'strategy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Архитектура Защитных Рвов (7 Powers Moats)',
        'Defensible Moat & 7 Powers Architecture',
        [
          '- Сформировать минимум 2 структурных конкурентных преимущества:',
          '1. **Switching Costs (Высокая цена перехода)**: Глубокая интеграция данных и рабочих процессов.',
          '2. **Network Effects (Сетевые эффекты)**: Ценность платформы растет с каждым новым участником.',
          '3. **Counter-Positioning (Контр-позиционирование)**: Бизнес-модель, которую лидеры рынка не могут скопировать без каннибализации.',
        ],
        [
          '- Architect at least 2 defensible structural moats (Hamilton Helmer 7 Powers):',
          '1. **Switching Costs**: Deep workflow integration locking in proprietary enterprise data.',
          '2. **Network Effects**: Value compounds quadratically with active node adoption.',
          '3. **Counter-Positioning**: Novel pricing or delivery paradigm that incumbents cannot copy without destroying margins.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'value-proposition-canvas': {
    id: 'value-proposition-canvas',
    name: 'ValuePropositionCanvasSkill',
    displayName: 'Osterwalder Value Proposition Canvas',
    categoryId: 'business',
    description: 'Maps Customer Profile (Jobs, Pains, Gains) to Value Map (Products, Pain Relievers, Gain Creators).',
    tags: ['business', 'value-prop', 'canvas', 'osterwalder', 'product-market-fit'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Карта Ценностного Предложения (Value Proposition Canvas)',
        'Osterwalder Value Proposition Mapping',
        [
          '- **Профиль клиента**: 1. Задачи клиента (Jobs), 2. Боли и трения (Pains), 3. Желаемые выгоды (Gains).',
          '- **Карта ценности**: 1. Продукты и сервисы, 2. Обезболивающие (Pain Relievers), 3. Генераторы выгоды (Gain Creators).',
        ],
        [
          '- **Customer Profile**: 1. Core Jobs, 2. Pains & Financial Friction, 3. Expected Gains.',
          '- **Value Map**: 1. Products/Services, 2. Pain Relievers, 3. High-Velocity Gain Creators.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'pricing-strategy-architecture': {
    id: 'pricing-strategy-architecture',
    name: 'PricingStrategyArchitectureSkill',
    displayName: 'Value-Based & Tiered Pricing Architecture',
    categoryId: 'business',
    description: 'Designs high-margin tiered pricing matrices (Free, Pro, Enterprise) with value-metric expansion levers.',
    tags: ['business', 'pricing', 'monetization', 'tiers', 'packaging'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Архитектура Ценообразования и Тарифных Планов',
        'Tiered Value-Based Pricing Architecture',
        [
          'Спроектировать 3-уровневую тарифную сетку:',
          '- **Starter / Free**: Низкий порог входа для вирального роста (лимитирован по объему).',
          '- **Pro / Growth**: Оптимальный тариф для команд (привязан к ключевой метрике ценности: пользователи/транзакции).',
          '- **Enterprise**: Кастомные SLA, SSO/SAML, аудит-логи и персональный саппорт.',
        ],
        [
          'Engineer a 3-tier value-metric pricing matrix:',
          '- **Starter / Free**: Low-friction acquisition tier with hard volume caps.',
          '- **Pro / Scale**: Team tier anchored to core value expansion metrics (active seats, API calls).',
          '- **Enterprise**: Custom SOC2 compliance, dedicated SSO/SAML, SLA guarantees, and audit exports.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'competitive-positioning-matrix': {
    id: 'competitive-positioning-matrix',
    name: 'CompetitivePositioningMatrixSkill',
    displayName: '2x2 Competitive Positioning Matrix',
    categoryId: 'business',
    description: 'Positions company in the top-right quadrant of a 2x2 matrix defined by two unique differentiation axes.',
    tags: ['business', 'positioning', 'matrix', '2x2', 'differentiation'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Матрица Конкурентного Позиционирования (2x2 Matrix)',
        'Competitive Differentiation 2x2 Matrix',
        [
          '- Выбрать 2 ортогональные оси (например: «Глубина автоматизации» и «Скорость развертывания»).',
          '- Разместить продукт в верхнем правом квадранте и четко противопоставить устаревшим конкурентам.',
        ],
        [
          '- Define 2 orthogonal differentiation axes (e.g. "Automation Depth" vs "Time-to-Value Velocity").',
          '- Position the target product in the dominant top-right quadrant, contrasting against legacy alternatives.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'investor-pitch-deck-narrative': {
    id: 'investor-pitch-deck-narrative',
    name: 'InvestorPitchDeckNarrativeSkill',
    displayName: 'Sequoia 10-Slide Pitch Deck Narrative',
    categoryId: 'business',
    description: 'Structures an investor pitch narrative: Problem, Solution, Why Now, Market Size, Product, Traction, Team.',
    tags: ['business', 'pitch-deck', 'sequoia', 'investors', 'fundraising'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Структура Инвестиционного Питча (Sequoia 10 Slides)',
        'Sequoia 10-Slide Pitch Deck Narrative Arc',
        [
          '1. Проблема -> 2. Решение -> 3. Почему сейчас (Why Now) -> 4. Объем рынка (TAM/SAM/SOM) -> 5. Продукт -> 6. Юнит-экономика -> 7. Защитные рвы -> 8. Конкуренты -> 9. Команда -> 10. Запрос раунда (The Ask).',
        ],
        [
          '1. Problem -> 2. Solution -> 3. Why Now Catalyst -> 4. Market Size (TAM) -> 5. Product Mechanics -> 6. Traction & Unit Economics -> 7. Moats -> 8. Competition -> 9. Team -> 10. The Ask.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'customer-acquisition-flywheel': {
    id: 'customer-acquisition-flywheel',
    name: 'CustomerAcquisitionFlywheelSkill',
    displayName: 'Self-Sustaining Growth Flywheel',
    categoryId: 'business',
    description: 'Replaces leaky linear funnels with compounding growth loops where users naturally generate new users.',
    tags: ['business', 'flywheel', 'growth-loop', 'viral', 'retention'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Самоподдерживающийся Маховик Роста (Growth Flywheel)',
        'Compounding Customer Growth Flywheel',
        [
          '- Описать цикл: Использование продукта -> Создание публичного контента/артефакта -> Привлечение новых пользователей -> Рост ценности.',
        ],
        [
          '- Map compounding growth loop: User Activity -> Public Artifact Generation -> Inbound Traffic Acquisition -> Platform Network Effects.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'churn-reduction-playbook': {
    id: 'churn-reduction-playbook',
    name: 'ChurnReductionPlaybookSkill',
    displayName: 'SaaS Churn Reduction & Retention Playbook',
    categoryId: 'business',
    description: 'Identifies early drop-off signals and implements automated proactive retention and re-engagement campaigns.',
    tags: ['business', 'churn', 'retention', 'saas', 'customer-success'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'План Снижения Оттока (Churn Reduction Playbook)',
        'SaaS Churn Diagnostics & Retention Playbook',
        [
          '- Выявить опережающие индикаторы оттока (падение DAU/MAU на 30%, прекращение экспорта отчетов).',
          '- Внедрить превентивные триггеры Customer Success до момента отмены подписки.',
        ],
        [
          '- Flag leading churn indicators (30% drop in DAU/MAU, zero export activity over 14 days).',
          '- Deploy automated Customer Success interventions before cancellation events occur.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'market-size-tam-calculation': {
    id: 'market-size-tam-calculation',
    name: 'MarketSizeTAMCalculationSkill',
    displayName: 'TAM / SAM / SOM Market Sizing',
    categoryId: 'business',
    description: 'Calculates Total Addressable Market, Serviceable Addressable Market, and Obtainable Market from bottom-up data.',
    tags: ['business', 'tam', 'sam', 'som', 'market-size', 'finance'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Расчет Объекта Рынка (TAM / SAM / SOM)',
        'Bottom-Up TAM / SAM / SOM Market Sizing',
        [
          '- **TAM (Total Addressable Market)**: Общее число потенциальных компаний * средний годовой контракт (ACV).',
          '- **SAM (Serviceable Market)**: Сегмент компаний, подходящих под текущий функционал.',
          '- **SOM (Serviceable Obtainable)**: Реалистичная доля рынка за 3 года (1-3% от SAM).',
        ],
        [
          '- **TAM**: Total universe of qualifying accounts * Annual Contract Value (ACV).',
          '- **SAM**: Addressable segment reachable with current technology stack and geographic presence.',
          '- **SOM**: Target obtainable capture within a 36-month operational horizon (1-3% of SAM).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'okr-goal-cascading': {
    id: 'okr-goal-cascading',
    name: 'OKRGoalCascadingSkill',
    displayName: 'Objectives & Key Results (OKR) Cascading',
    categoryId: 'business',
    description: 'Cascades qualitative Objectives into 3 quantifiable Key Results with leading and lagging indicators.',
    tags: ['business', 'okr', 'goals', 'strategy', 'metrics', 'alignment'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Каскадирование Целей OKR (Objectives & Key Results)',
        'OKR Goal Cascading & Key Results Framework',
        [
          '- **Objective (Цель)**: Вдохновляющая качественная формулировка («Стать стандартом надежности в финтехе»).',
          '- **Key Results (Ключевые результаты)**: 3 числовые метрики («KR1: Достичь 99.99% доступности», «KR2: Снизить отток до < 1.5%»).',
        ],
        [
          '- **Objective**: Ambitious qualitative vision ("Become the undisputed reliability standard in enterprise fintech").',
          '- **Key Results (KR)**: 3 quantifiable milestones ("KR1: Achieve 99.99% SLO", "KR2: Compress churn to < 1.5%").',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'enterprise-sales-battlecard': {
    id: 'enterprise-sales-battlecard',
    name: 'EnterpriseSalesBattlecardSkill',
    displayName: 'Enterprise Competitive Sales Battlecard',
    categoryId: 'business',
    description: 'Equips sales teams with FUD-neutralizing counter-points, killer features, and competitive landmines.',
    tags: ['business', 'sales', 'battlecard', 'enterprise', 'competitive'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Конкурентный Боевой Лист Продаж (Sales Battlecard)',
        'Enterprise Competitive Sales Battlecard',
        [
          '- **Наши убойные преимущества (Killer Features)**: 3 функции, которых нет у конкурентов.',
          '- **Закладка мин (Landmines)**: Вопросы, которые клиент должен задать конкуренту, чтобы вскрыть его слабости.',
          '- **Отработка FUD**: Нейтрализация страхов безопасности и надежности.',
        ],
        [
          '- **Killer Differentiators**: 3 proprietary capabilities unmatched by legacy vendors.',
          '- **Competitive Landmines**: Calibrated questions for buyers to ask competitors to expose hidden architectural deficits.',
          '- **FUD Neutralization**: Pre-emptive objection handlers regarding security, scalability, and compliance.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'gross-margin-sensitivity': {
    id: 'gross-margin-sensitivity',
    name: 'GrossMarginSensitivitySkill',
    displayName: 'COGS & Gross Margin Sensitivity Modeling',
    categoryId: 'business',
    description: 'Models Cost of Goods Sold (LLM token costs, cloud compute, support) against gross margin targets (>= 75%).',
    tags: ['business', 'gross-margin', 'cogs', 'tokens', 'finance', 'profitability'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Моделирование Себестоимости и Валовой Маржи (COGS)',
        'COGS & Gross Margin Sensitivity Modeling',
        [
          '- Оцифровать себестоимость на одного активного пользователя: (LLM токены + Cloud CPU/RAM + База данных + Саппорт).',
          '- Обеспечить целевую валовую маржинальность бизнеса (Gross Margin >= 75-80%).',
        ],
        [
          '- Model unit Cost of Goods Sold (COGS): LLM inference tokens + database I/O + CDN egress + Tier-1 support.',
          '- Maintain gross margin sensitivity model targeting >= 75-80% enterprise profitability.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'cap-table-dilution-model': {
    id: 'cap-table-dilution-model',
    name: 'CapTableDilutionModelSkill',
    displayName: 'Venture Capital Cap Table Dilution Model',
    categoryId: 'business',
    description: 'Models equity dilution across Seed, Series A, and ESOP option pool expansions.',
    tags: ['business', 'cap-table', 'dilution', 'equity', 'fundraising', 'vc'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Модель Размытия Долей (Cap Table Dilution)',
        'Cap Table Equity Dilution & ESOP Modeling',
        [
          '- Рассчитать доли основателей, инвесторов и опционного пула (ESOP: 10-15%) по раундам Seed и Series A.',
        ],
        [
          '- Model founder equity ownership, ESOP expansion pools (10-15%), and post-money dilution across Seed and Series A.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'strategic-partnership-framework': {
    id: 'strategic-partnership-framework',
    name: 'StrategicPartnershipFrameworkSkill',
    displayName: 'B2B Strategic Partnership & Channel Model',
    categoryId: 'business',
    description: 'Designs win-win co-selling and OEM partnership structures with clear revenue-share economics.',
    tags: ['business', 'partnerships', 'channel', 'co-selling', 'alliances'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Фреймворк Стратегического Партнерства (B2B Alliances)',
        'B2B Strategic Alliance & Revenue-Share Framework',
        [
          '- Описать модель взаимной выгоды: интеграция в экосистему партнера, условия распределения выручки (Rev-Share) и совместные продажи (Co-Sell).',
        ],
        [
          '- Architect mutual value exchange: platform ecosystem integration, revenue-share splits, and joint co-selling playbooks.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
