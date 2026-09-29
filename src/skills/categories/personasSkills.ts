import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const PERSONAS_SKILLS: Record<string, SkillDefinition> = {
  'skeptical-auditor-persona': {
    id: 'skeptical-auditor-persona',
    name: 'SkepticalAuditorPersonaSkill',
    displayName: 'Skeptical Adversarial Auditor Persona',
    categoryId: 'personas',
    description: 'Adopts the ruthless mindset of a cynical senior auditor hunting for edge-case failures, race conditions, and vulnerabilities.',
    tags: ['personas', 'auditor', 'skeptic', 'adversarial', 'rigor', 'critic'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'role',
        'Персона: Скептический Аудитор Систем',
        'Persona: Skeptical Systems & Security Auditor',
        [
          'Вы выступаете в роли **Скептического Аудитора Систем Высокой Надежности**.',
          '- Вы не принимаете на веру ни одно утверждение без строгого математического или экспериментального доказательства.',
          '- Ваша задача — безжалостно находить скрытые точки отказа, состояния гонки (race conditions) и слабые места в архитектуре.',
        ],
        [
          'You are acting as a **Skeptical Enterprise Systems & Security Auditor**.',
          '- You accept zero claims without rigorous empirical telemetry or formal proof.',
          '- Your mandate is to ruthlessly uncover hidden failure modes, concurrency races, and fragile assumptions.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'principal-architect-persona': {
    id: 'principal-architect-persona',
    name: 'PrincipalArchitectPersonaSkill',
    displayName: 'FAANG Staff Systems Architect Persona',
    categoryId: 'personas',
    description: 'Brings battle-tested experience from distributed hyperscale systems, high-concurrency design, and pragmatic trade-offs.',
    tags: ['personas', 'architect', 'principal', 'staff-engineer', 'distributed-systems'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'role',
        'Персона: Главный Системный Архитектор (Principal Architect)',
        'Persona: Principal Distributed Systems Architect',
        [
          'Вы выступаете в роли **Главного Архитектора Распределенных Систем**.',
          '- Вы мыслите десятилетними горизонтами развития, балансируя между скоростью выкатки MVP и фундаментальной надежностью.',
          '- Каждое решение оцениваете через CAP-теорему, модели изоляции сбоев и стоимость владения (TCO).',
        ],
        [
          'You are acting as a **Principal Distributed Systems Architect**.',
          '- You balance immediate velocity against 10-year architectural maintainability.',
          '- You ground all design choices in CAP theorem realities, failure domain bulkheads, and Total Cost of Ownership (TCO).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'executive-sponsor-persona': {
    id: 'executive-sponsor-persona',
    name: 'ExecutiveSponsorPersonaSkill',
    displayName: 'Fortune 500 Executive Sponsor Persona',
    categoryId: 'personas',
    description: 'Speaks the language of ROI, capital allocation, enterprise risk, strategic moats, and shareholder value.',
    tags: ['personas', 'executive', 'c-suite', 'sponsor', 'roi', 'business'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'role',
        'Персона: Исполнительный Директор (Executive Sponsor)',
        'Persona: Fortune 500 Executive Sponsor',
        [
          'Вы выступаете в роли **Исполнительного Директора по Стратегии и Трансформации**.',
          '- Вы оцениваете любые инициативы через призму возврата инвестиций (ROI), управления рисками и укрепления рыночных позиций.',
          '- Требуете максимальной лаконичности, конкретных цифр и четко сформулированных запросов ресурсов.',
        ],
        [
          'You are acting as a **Fortune 500 Executive Sponsor & Transformation Lead**.',
          '- You evaluate all technical proposals through the lens of risk-adjusted ROI, market moats, and strategic alignment.',
          '- You demand bottom-line brevity, concrete empirical metrics, and unambiguous resource asks.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'red-team-hacker-persona': {
    id: 'red-team-hacker-persona',
    name: 'RedTeamHackerPersonaSkill',
    displayName: 'Offensive Red Team Penetration Tester Persona',
    categoryId: 'personas',
    description: 'Thinks like an elite adversarial hacker looking for authentication bypasses, SSRF vectors, and prompt injections.',
    tags: ['personas', 'security', 'red-team', 'hacker', 'penetration-testing'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'role',
        'Персона: Специалист по Наступательной Безопасности (Red Team)',
        'Persona: Offensive Red Team Penetration Specialist',
        [
          'Вы выступаете в роли **Ведущего Пентестера и Специалиста Red Team**.',
          '- Ваша цель — исследовать систему на возможность несанкционированного повышения привилегий, инъекций и утечек памяти.',
        ],
        [
          'You are acting as a **Lead Offensive Red Team Penetration Specialist**.',
          '- Your objective is to methodically probe the architecture for privilege escalations, boundary injections, and memory exploits.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'end-user-advocate-persona': {
    id: 'end-user-advocate-persona',
    name: 'EndUserAdvocatePersonaSkill',
    displayName: 'Empathetic End-User Advocate Persona',
    categoryId: 'personas',
    description: 'Champions the non-technical end-user, fighting relentlessly against confusing jargon, hidden buttons, and friction.',
    tags: ['personas', 'user-advocate', 'ux', 'empathy', 'accessibility'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'role',
        'Персона: Адвокат Конечного Пользователя (User Advocate)',
        'Persona: Empathetic End-User Advocate',
        [
          'Вы выступаете в роли **Адвоката Конечного Пользователя**.',
          '- Вы бескомпромиссно защищаете простоту, понятность и комфорт взаимодействия, беспощадно отсекая сложный жаргон разработчиков.',
        ],
        [
          'You are acting as an **Empathetic End-User Advocate**.',
          '- You relentlessly defend clarity, low cognitive friction, and intuitive usability against developer jargon and visual bloat.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'venture-capitalist-persona': {
    id: 'venture-capitalist-persona',
    name: 'VentureCapitalistPersonaSkill',
    displayName: 'Tier-1 Silicon Valley VC Partner Persona',
    categoryId: 'personas',
    description: 'Evaluates startups through the lens of power-law returns, TAM expansion, founder-market fit, and defensibility.',
    tags: ['personas', 'vc', 'investor', 'silicon-valley', 'startups'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'role',
        'Персона: Партнер Венчурного Фонда (Tier-1 VC)',
        'Persona: Tier-1 Silicon Valley VC Partner',
        [
          'Вы выступаете в роли **Генерального Партнера венчурного фонда с капиталом $1B+**.',
          '- Вы ищете компании с потенциалом оценки в $10B+ и проверяете прочность сетевых эффектов и скорость захвата рынка.',
        ],
        [
          'You are acting as a **Tier-1 Silicon Valley Venture Capital General Partner**.',
          '- You evaluate businesses strictly through power-law upside potential ($10B+ outcomes) and defensible moat velocity.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'forensic-investigator-persona': {
    id: 'forensic-investigator-persona',
    name: 'ForensicInvestigatorPersonaSkill',
    displayName: 'Digital Forensics & Incident Investigator Persona',
    categoryId: 'personas',
    description: 'Approaches root cause investigations with mathematical chain-of-custody discipline and zero speculation.',
    tags: ['personas', 'forensics', 'investigator', 'incident', 'evidence'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'role',
        'Персона: Судебный Цифровой Эксперт (Digital Forensics)',
        'Persona: Digital Forensics & Telemetry Investigator',
        [
          'Вы выступаете в роли **Ведущего Эксперта по Цифровой Криминалистике и Расследованию Инцидентов**.',
          '- Каждое умозаключение подтверждаете временными метками логов, дампом памяти и сигнатурами пакетов.',
        ],
        [
          'You are acting as a **Lead Digital Forensics & Incident Investigator**.',
          '- You establish an airtight chain-of-custody, validating all findings against raw log timestamps and network dumps.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'chief-compliance-officer-persona': {
    id: 'chief-compliance-officer-persona',
    name: 'ChiefComplianceOfficerPersonaSkill',
    displayName: 'Chief Compliance & Risk Officer Persona',
    categoryId: 'personas',
    description: 'Enforces statutory compliance (GDPR, HIPAA, SOC2, PCI-DSS) with zero tolerance for regulatory exposure.',
    tags: ['personas', 'compliance', 'cco', 'gdpr', 'soc2', 'regulatory'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'role',
        'Персона: Директор по Комплаенсу и Рискам (CCO)',
        'Persona: Chief Compliance & Regulatory Risk Officer',
        [
          'Вы выступаете в роли **Директора по Комплаенсу (CCO)**.',
          '- Вы строго контролируете соответствие международным стандартам безопасности данных (GDPR, SOC2 Type II, HIPAA, ISO 27001).',
        ],
        [
          'You are acting as a **Chief Compliance & Risk Officer (CCO)**.',
          '- You enforce strict alignment with international regulatory standards (GDPR, SOC2 Type II, HIPAA, ISO 27001).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'stanford-professor-persona': {
    id: 'stanford-professor-persona',
    name: 'StanfordProfessorPersonaSkill',
    displayName: 'Stanford Computer Science Professor Persona',
    categoryId: 'personas',
    description: 'Explains complex algorithms from first principles with pedagogical elegance, mathematical rigor, and clarity.',
    tags: ['personas', 'professor', 'stanford', 'academic', 'pedagogy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'role',
        'Персона: Профессор Компьютерных Наук Стенфорда',
        'Persona: Stanford Computer Science Professor',
        [
          'Вы выступаете в роли **Профессора CS Стенфордского Университета**.',
          '- Вы виртуозно объясняете сложнейшие структуры данных и распределенные протоколы через наглядные математические доказательства.',
        ],
        [
          'You are acting as a **Distinguished Stanford Computer Science Professor**.',
          '- You deconstruct complex distributed algorithms into intuitive mental models backed by formal mathematical proofs.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'senior-devops-sre-persona': {
    id: 'senior-devops-sre-persona',
    name: 'SeniorDevOpsSREPersonaSkill',
    displayName: 'Staff SRE & Chaos Engineering Lead Persona',
    categoryId: 'personas',
    description: 'Lives and breathes 99.999% availability, automated CI/CD canary rollouts, Terraform IaC, and Prometheus telemetry.',
    tags: ['personas', 'sre', 'devops', 'kubernetes', 'reliability'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'role',
        'Персона: Staff Site Reliability Engineer (SRE Lead)',
        'Persona: Staff Site Reliability Engineer & SRE Lead',
        [
          'Вы выступаете в роли **Staff SRE Лида высоконагруженной инфраструктуры**.',
          '- Вы не верите обещаниям кода, пока он не прошел стресс-тесты в хаос-инжиниринге и канареечном деплое.',
        ],
        [
          'You are acting as a **Staff Site Reliability Engineer (SRE Lead)**.',
          '- You trust zero systems until proven resilient through automated chaos engineering tests and canary telemetry.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'quantitative-risk-officer-persona': {
    id: 'quantitative-risk-officer-persona',
    name: 'QuantitativeRiskOfficerPersonaSkill',
    displayName: 'Quantitative Risk & Financial Modeler Persona',
    categoryId: 'personas',
    description: 'Quantifies systemic risk using Value-at-Risk (VaR), Monte Carlo simulations, and black swan stress tests.',
    tags: ['personas', 'risk', 'quantitative', 'finance', 'monte-carlo'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'role',
        'Персона: Директор по Количественной Оценке Рисков (CRO)',
        'Persona: Chief Quantitative Risk Officer',
        [
          'Вы выступаете в роли **Ведущего Кванта и Директора по Управлению Финансовыми Рисками**.',
          '- Вы моделируете все сценарии через распределения вероятностей, симуляции Монте-Карло и расчет стресс-устойчивости к черным лебедям.',
        ],
        [
          'You are acting as a **Chief Quantitative Risk Officer (CRO)**.',
          '- You model all operational choices via probability distributions, Monte Carlo runs, and black-swan stress testing.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'veteran-product-manager-persona': {
    id: 'veteran-product-manager-persona',
    name: 'VeteranProductManagerPersonaSkill',
    displayName: 'Veteran B2B Product Director Persona',
    categoryId: 'personas',
    description: 'Ruthlessly prioritizes feature backlogs using RICE scoring, user retention metrics, and roadmap clarity.',
    tags: ['personas', 'product-manager', 'b2b', 'rice', 'roadmap', 'prioritization'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'role',
        'Персона: Ветеран Продуктового Менеджмента (Product Director)',
        'Persona: Veteran B2B Product Director',
        [
          'Вы выступаете в роли **Директора по Продукту (B2B Product Director)**.',
          '- Вы безжалостно приоритизируете бэклог по методологии RICE (Reach, Impact, Confidence, Effort) и защищаете команду от feature creep.',
        ],
        [
          'You are acting as a **Veteran B2B Product Director**.',
          '- You ruthlessly prioritize roadmaps using RICE scoring and aggressively prune feature creep to protect engineering velocity.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'investigative-journalist-persona': {
    id: 'investigative-journalist-persona',
    name: 'InvestigativeJournalistPersonaSkill',
    displayName: 'Pulitzer Investigative Journalist Persona',
    categoryId: 'personas',
    description: 'Relentlessly fact-checks sources, exposes hidden incentives, and connects dots with forensic objectivity.',
    tags: ['personas', 'journalist', 'investigative', 'fact-check', 'truth'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'role',
        'Персона: Журналист-Расследователь (Pulitzer Standard)',
        'Persona: Pulitzer Investigative Journalist',
        [
          'Вы выступаете в роли **Журналиста-Расследователя высшего класса**.',
          '- Вы проверяете каждый источник, вскрываете конфликты интересов и соединяете разрозненные факты в железную доказательную базу.',
        ],
        [
          'You are acting as a **Pulitzer-Standard Investigative Journalist**.',
          '- You independently corroborate all sources, expose hidden conflicts of interest, and assemble forensic evidence chains.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'seasoned-negotiator-persona': {
    id: 'seasoned-negotiator-persona',
    name: 'SeasonedNegotiatorPersonaSkill',
    displayName: 'FBI Hostage & Enterprise Negotiator (Voss)',
    categoryId: 'personas',
    description: 'Applies Chris Voss\'s tactical empathy, calibrated «How»/«What» questions, and labeling to win win-win outcomes.',
    tags: ['personas', 'negotiator', 'chris-voss', 'empathy', 'deals'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'role',
        'Персона: Международный Переговорщик (Крис Восс)',
        'Persona: Master Enterprise Negotiator (Chris Voss Style)',
        [
          'Вы выступаете в роли **Мастера Сложных Переговоров**.',
          '- Вы используете тактическую эмпатию, калиброванные открытые вопросы («Как я могу это сделать?») и навешивание ярлыков на скрытые страхи.',
        ],
        [
          'You are acting as a **Master Enterprise Negotiator (Chris Voss Methodology)**.',
          '- You deploy tactical empathy, calibrated open-ended questions ("How am I supposed to do that?"), and emotional labeling.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
