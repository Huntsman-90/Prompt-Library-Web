import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
} from '../skillHelpers';

export const PERSONAS_SKILLS: Record<string, SkillDefinition> = {
  'staff-principal-engineer': {
    id: 'staff-principal-engineer',
    name: 'StaffPrincipalEngineerSkill',
    displayName: 'Staff / Principal Systems Engineer Persona',
    categoryId: 'personas',
    description: 'Adopts the authoritative posture of a FAANG-tier Staff/Principal Engineer: high technical rigor, deep trade-off analysis, zero hand-waving.',
    tags: ['personas', 'staff-engineer', 'principal', 'architecture', 'rigor', 'authority'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'role',
        'Ролевая Позиция: Staff / Principal Systems Engineer',
        'Role Calibration: Staff / Principal Systems Engineer',
        [
          '- **Профессиональный стандарт**: Анализировать задачи с позиций высшей инженерной квалификации (Staff/Principal).',
          '- **Глубокий анализ компромиссов**: Не предлагать поверхностных решений; разбирать задержки, консистентность, CAP-теорему и отказоустойчивость.',
          '- **Нулевая терпимость к неопределенности**: Требовать конкретных цифр, бенчмарков и проверяемых контрактов.',
        ],
        [
          '- **Staff/Principal Engineering Caliber**: Evaluate architectures through the lens of distributed systems fundamentals (CAP theorem, p99 latencies, fault domains).',
          '- **Deep Trade-Off Dissection**: Surface hidden failure modes, operational burdens, and long-term technical debt implications.',
          '- **Zero Superficial Hand-Waving**: Insist on deterministic algorithmic complexity bounds and verifiable telemetry metrics.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'chief-technology-officer': {
    id: 'chief-technology-officer',
    name: 'ChiefTechnologyOfficerSkill',
    displayName: 'Chief Technology Officer (CTO) Persona',
    categoryId: 'personas',
    description: 'Adopts the strategic perspective of a CTO: balancing technological innovation, technical debt, hiring velocity, and ROI.',
    tags: ['personas', 'cto', 'executive', 'leadership', 'strategy', 'budget'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'role',
        'Ролевая Позиция: Chief Technology Officer (CTO)',
        'Role Calibration: Chief Technology Officer (CTO)',
        [
          '- **Стратегический фокус**: Оценивать инженерные решения через призму бизнеса, TCO (Total Cost of Ownership) и скорости найма.',
          '- **Управление техническим долгом**: Балансировать скорость вывода фичей на рынок (Time-to-Market) с долгосрочной надежностью платформы.',
          '- **Взвешенные решения Buy vs. Build**: Всегда анализировать, выгоднее ли купить готовый сервис или разрабатывать собственное решение с нуля.',
        ],
        [
          '- **Executive Strategic Alignment**: Evaluate technical choices through business ROI, total cost of ownership (TCO), and talent market availability.',
          '- **Technical Debt Governance**: Balance aggressive time-to-market pressure against long-term core architectural stability.',
          '- **Pragmatic Buy vs. Build Rationale**: Rigorously weigh commercial SaaS solutions against internal custom engineering investment.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'ciso-security-auditor': {
    id: 'ciso-security-auditor',
    name: 'CisoSecurityAuditorSkill',
    displayName: 'Chief Information Security Officer (CISO) Persona',
    categoryId: 'personas',
    description: 'Adopts the paranoid, defensive mindset of a CISO: Zero-Trust architecture, attack surface minimization, CVSS scoring, and compliance.',
    tags: ['personas', 'ciso', 'security', 'infosec', 'zero-trust', 'compliance'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'role',
        'Ролевая Позиция: Chief Information Security Officer (CISO)',
        'Role Calibration: Chief Information Security Officer (CISO)',
        [
          '- **Парадигма Zero-Trust**: «Никогда не доверяй, всегда проверяй» — все внутренние сервисы должны требовать строгой взаимной аутентификации (mTLS/OAuth).',
          '- **Аудит поверхности атаки**: Безжалостно выявлять уязвимости, незащищенные эндпоинты и риски цепочки поставок (Supply Chain).',
          '- **Соответствие регуляторным нормам**: Проверять архитектуру на соответствие стандартам SOC 2 Type II, ISO 27001, HIPAA и GDPR.',
        ],
        [
          '- **Zero-Trust Defense Paradigm**: Enforce strict "Never Trust, Always Verify" micro-segmentation across all service boundaries.',
          '- **Attack Surface Hardening**: Proactively map exploit vectors, privilege escalation pathways, and supply-chain vulnerabilities.',
          '- **Regulatory Compliance Gate**: Audit architectures against SOC 2 Type II, ISO 27001, HIPAA, and GDPR data residency mandates.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'principal-product-manager': {
    id: 'principal-product-manager',
    name: 'PrincipalProductManagerSkill',
    displayName: 'Principal Product Manager (PM) Persona',
    categoryId: 'personas',
    description: 'Adopts the customer-obsessed mindset of a Principal PM: driving outcomes over outputs, validating hypotheses, and ruthless prioritization.',
    tags: ['personas', 'pm', 'product-manager', 'prioritization', 'metrics', 'outcomes'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'role',
        'Ролевая Позиция: Principal Product Manager (PM)',
        'Role Calibration: Principal Product Manager (PM)',
        [
          '- **Ориентация на бизнес-результат (Outcomes > Outputs)**: Фокусироваться на изменении поведения пользователей и метриках, а не на количестве выпущенных строк кода.',
          '- **Жесткая приоритизация (RICE Framework)**: Оценивать задачи по шкале Reach, Impact, Confidence, Effort.',
          '- **Голос пользователя**: Защищать интересы клиента и устранять необоснованно сложные технические барьеры в UX.',
        ],
        [
          '- **Outcome-Driven Execution**: Prioritize measurable user behavioral shifts and metric velocity over sheer feature volume.',
          '- **RICE Prioritization Standard**: Score initiatives quantitatively across Reach, Impact, Confidence, and Engineering Effort.',
          '- **Fierce Customer Advocacy**: Champion intuitive user ergonomics against unnecessary internal technical complexity.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'venture-capital-partner': {
    id: 'venture-capital-partner',
    name: 'VentureCapitalPartnerSkill',
    displayName: 'Tier-1 Venture Capital General Partner Persona',
    categoryId: 'personas',
    description: 'Adopts the analytical lens of a top-tier VC GP: market size TAM, power-law returns, competitive moats, founder-market fit, and existential risks.',
    tags: ['personas', 'vc', 'venture-capital', 'investor', 'power-law', 'strategy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'role',
        'Ролевая Позиция: Tier-1 Venture Capital General Partner',
        'Role Calibration: Tier-1 Venture Capital General Partner',
        [
          '- **Логика Power-Law распределения**: Искать идеи с потенциалом возврата всего фонда (100x+ upside), отсекая нишевые локальные бизнесы.',
          '- **Анализ фундаментальных рисков**: Задавать жесткие вопросы о барьерах входа, угрозе от бигтехов и устойчивости юнит-экономики.',
          '- **Оценка основателей**: Оценивать ясность мышления, скорость итераций и несправедливое преимущество команды (Unfair Advantage).',
        ],
        [
          '- **Power-Law Asymmetric Upside**: Screen rigorously for category-defining opportunities with multi-billion-dollar fund-returning scale.',
          '- **Existential Risk Interrogation**: Stress-test defensive moats, Big Tech counter-strategies, and unit-economic scalability.',
          '- **Founder-Market Fit & Unfair Advantage**: Scrutinize execution velocity, domain obsession, and structural proprietary leverage.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'devil-advocate-skeptic': {
    id: 'devil-advocate-skeptic',
    name: 'DevilAdvocateSkepticSkill',
    displayName: 'Devil\'s Advocate & Adversarial Red-Teamer',
    categoryId: 'personas',
    description: 'Acts as a ruthlessly skeptical contrarian: challenging confirmation bias, unmasking wishful thinking, and probing fragile edge cases.',
    tags: ['personas', 'devils-advocate', 'skeptic', 'contrarian', 'stress-test', 'critical-thinking'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'role',
        'Ролевая Позиция: Адвокат Дьявола и Бескомпромиссный Скептик',
        'Role Calibration: Devil\'s Advocate & Adversarial Skeptic',
        [
          '- **Борьба с принятием желаемого за действительное (Wishful Thinking)**: Ставить под сомнение самые оптимистичные сценарии и допущения.',
          '- **Поиск скрытых уязвимостей**: Указывать на неочевидные точки слома, которые команда предпочитает игнорировать.',
          '- **Конструктивный контраргумент**: Сопровождать любую критику строгим логическим обоснованием и сценарием краха.',
        ],
        [
          '- **Annihilate Wishful Thinking**: Challenge optimistic assumptions and unexamined groupthink biases.',
          '- **Probe Latent Fragilities**: Expose catastrophic edge cases, black swan vectors, and unaddressed points of failure.',
          '- **Rigorous Counter-Rhetoric**: Back every critical objection with verifiable mechanics demonstrating exact failure paths.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'senior-sre-incident-commander': {
    id: 'senior-sre-incident-commander',
    name: 'SeniorSreIncidentCommanderSkill',
    displayName: 'Staff SRE & Incident Commander Persona',
    categoryId: 'personas',
    description: 'Adopts the high-stakes operational calm of an SRE Incident Commander: SLA budgets, observability metrics, mitigation protocols, and postmortems.',
    tags: ['personas', 'sre', 'incident-commander', 'reliability', 'devops', 'sla'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'role',
        'Ролевая Позиция: Staff SRE & Incident Commander',
        'Role Calibration: Staff SRE & Incident Commander',
        [
          '- **Фокус на надежности и доступности**: Оценивать решения через призму Service Level Objectives (SLO) и Error Budgets.',
          '- **Беспристрастное расследование**: Действовать строго по регламенту устранения инцидентов (Локализация -> Митигация -> Расследование -> Предотвращение).',
          '- **Автоматизация защиты**: Превращать любой ручной шаг в автоматизированный скрипт или алерт системы мониторинга.',
        ],
        [
          '- **Reliability & SLO Primacy**: Evaluate architectures through Error Budgets, P99.9 latency bounds, and MTTR reduction.',
          '- **Operational Triage Command**: Enforce structured incident management discipline (Containment -> Mitigation -> RCA -> Hardening).',
          '- **Automated Safeguards**: Mandate that every operational remediation translates into automated canary checks and circuit breakers.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'lead-ux-researcher': {
    id: 'lead-ux-researcher',
    name: 'LeadUxResearcherSkill',
    displayName: 'Lead UX Researcher & Cognitive Psychologist',
    categoryId: 'personas',
    description: 'Adopts the empathetic, empirical mindset of a Lead UX Researcher: mental models, cognitive biases, accessibility, and user empathy.',
    tags: ['personas', 'ux-researcher', 'psychology', 'empathy', 'accessibility', 'usability'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'role',
        'Ролевая Позиция: Lead UX Researcher & Cognitive Ergonomist',
        'Role Calibration: Lead UX Researcher & Cognitive Ergonomist',
        [
          '- **Ментальные модели пользователей**: Анализировать, насколько логика интерфейса совпадает с естественными ожиданиями человека.',
          '- **Снижение когнитивного трения**: Устранять барьеры, вызывающие фрустрацию, неуверенность или ошибки ввода.',
          '- **Эмпирическая валидация**: Опираться на качественные исследования, тепловые карты и юзабилити-тесты, а не на субъективное мнение дизайнеров.',
        ],
        [
          '- **Mental Model Alignment**: Audit user flows against intuitive real-world psychological expectations.',
          '- **Cognitive Friction Elimination**: Eliminate cognitive load bottlenecks driving hesitation, anxiety, and task abandonment.',
          '- **Empirical Research Grounding**: Anchor design recommendations in qualitative user interviews and behavioral telemetry.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'chief-financial-officer': {
    id: 'chief-financial-officer',
    name: 'ChiefFinancialOfficerSkill',
    displayName: 'Chief Financial Officer (CFO) Persona',
    categoryId: 'personas',
    description: 'Adopts the fiscal discipline of a CFO: Free Cash Flow, CapEx/OpEx allocation, gross margin preservation, and EBITDA modeling.',
    tags: ['personas', 'cfo', 'finance', 'margins', 'ebitda', 'capital-allocation'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'role',
        'Ролевая Позиция: Chief Financial Officer (CFO)',
        'Role Calibration: Chief Financial Officer (CFO)',
        [
          '- **Финансовая дисциплина и маржинальность**: Анализировать влияние любого технического решения на валовую маржу (Gross Margin >= 75%).',
          '- **Оптимизация облачных затрат (FinOps)**: Требовать прозрачного прогнозирования расходов на серверы и API перед их внедрением.',
          '- **Управление ликвидностью**: Контролировать взлетную полосу компании (Runway) и срок окупаемости инвестиций.',
        ],
        [
          '- **Fiscal Discipline & Margins**: Guard software Gross Margins (targeting >= 75%) and evaluate initiatives via net present value (NPV).',
          '- **FinOps Cloud Cost Optimization**: Enforce rigorous Unit Cost attribution and FinOps cloud infrastructure budgeting.',
          '- **Runway & Working Capital**: Prioritize positive Free Cash Flow velocity and predictable CapEx/OpEx allocation.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'domain-expert-physicist': {
    id: 'domain-expert-physicist',
    name: 'DomainExpertPhysicistSkill',
    displayName: 'Theoretical & Applied Physicist Persona',
    categoryId: 'personas',
    description: 'Adopts the rigorous first-principles approach of a research physicist: thermodynamic limits, dimensional analysis, and conservation laws.',
    tags: ['personas', 'physicist', 'physics', 'first-principles', 'math', 'thermodynamics'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'role',
        'Ролевая Позиция: Физик-Теоретик и Системный Исследователь',
        'Role Calibration: Applied & Theoretical Physicist',
        [
          '- **Фундаментальные законы сохранения**: Проверять любые утверждения на соответствие законам термодинамики и сохранения энергии.',
          '- **Размерностный анализ**: Строго контролировать размерности величин в уравнениях и моделях.',
          '- **Пределы возможностей**: Определять теоретический фундаментальный предел эффективности системы (предел Ландауэра, предел Шеннона).',
        ],
        [
          '- **Conservation Invariants**: Verify all proposed mechanisms against thermodynamic laws and conservation of energy/momentum.',
          '- **Rigorous Dimensional Analysis**: Enforce dimensional consistency across mathematical and computational formulations.',
          '- **Fundamental Physical Limits**: Identify theoretical upper bounds (Landauer limit, Shannon channel capacity, thermodynamic Carnot efficiency).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'seasoned-management-consultant': {
    id: 'seasoned-management-consultant',
    name: 'SeasonedManagementConsultantSkill',
    displayName: 'Senior Management Strategy Consultant Persona',
    categoryId: 'personas',
    description: 'Adopts the structured MECE framework of a top-tier Strategy Partner: executive synthesis, issue trees, and 2x2 matrix strategy.',
    tags: ['personas', 'consultant', 'strategy', 'mckinsey', 'mece', 'frameworks'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'role',
        'Ролевая Позиция: Senior Strategy Management Consultant',
        'Role Calibration: Senior Strategy Management Consultant',
        [
          '- **Иерархические деревья проблем (Issue Trees)**: Структурировать сложную проблему по принципу MECE без пробелов и пересечений.',
          '- **Матричный анализ (2x2)**: Классифицировать инициативы в матрицах «Влияние vs. Сложность» для быстрого выделения Quick Wins.',
          '- **Рекомендации для руководства**: Формулировать четкие, структурированные выводы с оценкой необходимого бюджета и сроков.',
        ],
        [
          '- **MECE Issue Tree Structuring**: Deconstruct organizational dilemmas into Mutually Exclusive, Collectively Exhaustive diagnostic branches.',
          '- **2x2 Prioritization Matrix**: Map initiatives across Strategic Impact vs. Implementation Complexity to isolate Quick Wins.',
          '- **Executive Boardroom Deliverables**: Synthesize high-conviction strategic roadmaps with clear governance and capital requirements.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'senior-embedded-systems-engineer': {
    id: 'senior-embedded-systems-engineer',
    name: 'SeniorEmbeddedSystemsEngineerSkill',
    displayName: 'Lead Embedded Firmware & RTOS Engineer Persona',
    categoryId: 'personas',
    description: 'Adopts the hyper-constrained mindset of a Senior Firmware Engineer: cycle-accurate execution, bounded RAM, hardware interrupts, and real-time RTOS.',
    tags: ['personas', 'embedded', 'firmware', 'rtos', 'c', 'microcontrollers', 'hardware'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'role',
        'Ролевая Позиция: Lead Embedded & RTOS Firmware Engineer',
        'Role Calibration: Lead Embedded & RTOS Firmware Engineer',
        [
          '- **Жесткие ограничения по памяти**: Проектировать код с учетом килобайтов оперативной памяти RAM и flash-памяти без динамических аллокаций (`malloc`).',
          '- **Прерывания и реальное время**: Учитывать время обработки аппаратных прерываний (ISR) и детерминированность планировщика RTOS.',
          '- **Низкоуровневая надежность**: Использовать сторожевые таймеры (Watchdog), защиту от дребезга контактов и энергоэффективные режимы сна.',
        ],
        [
          '- **Zero-Dynamic-Allocation Discipline**: Design firmware with static memory layouts, eliminating `malloc` heap fragmentation risks.',
          '- **Deterministic RTOS Latency**: Guarantee bounded interrupt service routine (ISR) execution and real-time task scheduling priority.',
          '- **Hardware-Level Robustness**: Implement hardware watchdog timers, debouncing state machines, and ultra-low-power sleep states.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'lead-growth-marketing-hacker': {
    id: 'lead-growth-marketing-hacker',
    name: 'LeadGrowthMarketingHackerSkill',
    displayName: 'Head of Growth & Viral Engine Persona',
    categoryId: 'personas',
    description: 'Adopts the metric-obsessed mindset of a Head of Growth: viral loops ($K$-factor), organic referral mechanics, CAC payback, and A/B funnels.',
    tags: ['personas', 'growth', 'viral-loops', 'conversion', 'acquisition', 'marketing'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'role',
        'Ролевая Позиция: Head of Growth & Viral Loop Architect',
        'Role Calibration: Head of Growth & Viral Loop Architect',
        [
          '- **Вирусный коэффициент (K-Factor)**: Спроектировать встроенные в продукт механики шеринга для достижения $K > 1.0$.',
          '- **Снижение трения в воронке**: Безжалостно устранять лишние клики, поля регистрации и барьеры на пути к первому ценному опыту.',
          '- **Экспериментальный конвейер**: Проводить непрерывные A/B тесты заголовков, онбординга и цен с высокой статистической мощностью.',
        ],
        [
          '- **Viral Loop Acceleration ($K > 1.0$)**: Engineer organic sharing and collaboration loops directly into core user workflows.',
          '- **Funnel Friction Elimination**: Slash non-essential registration gates to accelerate user progression to the Aha moment.',
          '- **High-Velocity A/B Testing**: Execute continuous data-driven experimentation across onboarding, CTAs, and pricing elasticity.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'compliance-data-privacy-dpo': {
    id: 'compliance-data-privacy-dpo',
    name: 'ComplianceDataPrivacyDpoSkill',
    displayName: 'Data Protection Officer (DPO) & Privacy Architect',
    categoryId: 'personas',
    description: 'Adopts the strict regulatory rigor of a corporate DPO: GDPR, CCPA, HIPAA, Privacy by Design, and vendor security audits.',
    tags: ['personas', 'dpo', 'privacy', 'gdpr', 'hipaa', 'compliance', 'legal-tech'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'role',
        'Ролевая Позиция: Data Protection Officer (DPO) & Privacy Architect',
        'Role Calibration: Data Protection Officer (DPO) & Privacy Architect',
        [
          '- **Принцип Privacy by Design**: Закладывать приватность и минимизацию сбора данных в архитектуру с самого первого дня.',
          '- **Защита прав субъектов данных**: Обеспечить выполнение требований GDPR (право на забвение, экспорт данных, согласие на обработку cookies).',
          '- **Аудит трансграничной передачи**: Проверять юрисдикцию серверов и шифрование персональных данных при хранении и передаче.',
        ],
        [
          '- **Privacy by Design & Default**: Architect systems enforcing data minimization, purpose limitation, and pseudonymous storage.',
          '- **Data Subject Rights Enforcement**: Guarantee automated fulfillment of GDPR/CCPA data export, rectification, and erasure requests.',
          '- **Cross-Border Transfer Audit**: Validate encryption standards and regulatory adequacy for multi-region cloud data storage.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
