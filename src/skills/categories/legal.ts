import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const LEGAL_SKILLS: Record<string, SkillDefinition> = {
  'contract-clause-redline-audit': {
    id: 'contract-clause-redline-audit',
    name: 'ContractClauseRedlineAuditSkill',
    displayName: 'Contract Clause Redline & Risk Audit',
    categoryId: 'legal',
    description: 'Audits commercial contracts clause-by-clause, identifying one-sided risks, uncapped liabilities, and suggesting markup redlines.',
    tags: ['legal', 'contracts', 'redline', 'risk-audit', 'negotiation', 'clauses'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Аудит Договора и Редлайн-Правки (Contract Redline)',
        'Contract Clause Redline & Risk Audit Matrix',
        [
          '- **Таблица анализа пунктов**: `[Пункт договора | Текущая редакция | Уровень риска (High/Med/Low) | Предлагаемый редлайн | Юридическое обоснование]`.',
          '- **Аудит скрытых ловушек**: Проверить автоматическое продление (Evergreen), односторонние штрафы и несимметричные обязательства.',
          '- **Сбалансированная альтернатива**: Предложить компромиссную формулировку, приемлемую для обеих сторон.',
        ],
        [
          '- **Redline Audit Matrix**: Tabulate: `[Clause Section | Raw Text | Risk Level (High/Med/Low) | Proposed Redline Markup | Strategic Legal Rationale]`.',
          '- **Latent Hazard Detection**: Intercept unilateral indemnity triggers, silent auto-renewal traps, and unmetered audit rights.',
          '- **Balanced Counter-Language**: Provide defensible fallback wording aligned with prevailing commercial norms.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'irac-legal-reasoning': {
    id: 'irac-legal-reasoning',
    name: 'IracLegalReasoningSkill',
    displayName: 'IRAC Legal Analysis Framework (Issue-Rule-Application-Conclusion)',
    categoryId: 'legal',
    description: 'Structures legal analysis using IRAC: Issue (legal question), Rule (statutes/precedents), Application (fact matching), Conclusion.',
    tags: ['legal', 'irac', 'legal-reasoning', 'jurisprudence', 'analysis', 'case-law'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Юридический Анализ по Методологии IRAC',
        'IRAC Legal Analysis Protocol (Issue — Rule — Application — Conclusion)',
        [
          '- **[I] Issue (Правовой вопрос)**: Точная формулировка юридической дилеммы, подлежащей разрешению.',
          '- **[R] Rule (Правовая норма)**: Ссылки на применимые статьи законов, нормативные акты и судебные прецеденты.',
          '- **[A] Application (Применение к фактам)**: Подробное сопоставление обстоятельств дела с диспозицией правовой нормы.',
          '- **[C] Conclusion (Итоговый вывод)**: Однозначное правовое заключение с оценкой вероятности исхода в суде.',
        ],
        [
          '- **[I] Issue**: Precision legal question and actionable threshold inquiry.',
          '- **[R] Rule**: Controlling statutory provisions, regulatory mandates, and binding judicial precedents.',
          '- **[A] Application**: Rigorous, objective application of statutory elements to empirical case facts.',
          '- **[C] Conclusion**: Definite legal finding with probabilistic risk evaluation of judicial outcomes.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'limitation-of-liability-cap': {
    id: 'limitation-of-liability-cap',
    name: 'LimitationOfLiabilityCapSkill',
    displayName: 'Limitation of Liability (LoL) & Cap Architecture',
    categoryId: 'legal',
    description: 'Structures aggregate liability caps (e.g., 12 months fees paid), super-caps, and explicitly carves out exceptions.',
    tags: ['legal', 'liability', 'lol', 'risk-management', 'commercial-contracts'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Архитектура Ограничения Ответственности (Limitation of Liability)',
        'Limitation of Liability (LoL) & Super-Cap Architecture',
        [
          '- **Базовый совокупный лимит (Aggregate Cap)**: Ограничить общую ответственность суммой выплат за последние 12 месяцев по договору.',
          '- **Исключение косвенных убытков (Consequential Damages)**: Полный отказ от ответственности за упущенную выгоду, потерю данных и репутационный ущерб.',
          '- **Супер-кэпы и исключения (Super-Caps)**: Для утечек данных или нарушения конфиденциальности задать фиксированный супер-кэп (например, 2x от базового).',
        ],
        [
          '- **Aggregate Liability Cap**: Bound total aggregate liability strictly to fees paid in preceding 12-month period.',
          '- **Consequential Damages Exclusion**: Mutual waiver of indirect, punitive, special, and loss-of-profit damages.',
          '- **Super-Cap Carve-Outs**: Bound high-risk exceptions (e.g. data breach, confidentiality breach) to a defined multiple (e.g. 2x standard cap).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'ip-assignment-work-for-hire': {
    id: 'ip-assignment-work-for-hire',
    name: 'IpAssignmentWorkForHireSkill',
    displayName: 'IP Assignment & Work-Made-For-Hire Provisions',
    categoryId: 'legal',
    description: 'Drafts ironclad IP assignment clauses: Work-Made-For-Hire transfer of copyrights, patent rights, trade secrets, and moral rights waivers.',
    tags: ['legal', 'ip', 'intellectual-property', 'copyright', 'work-for-hire', 'patents'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Передача Прав на Интеллектуальную Собственность (IP Assignment)',
        'IP Assignment & Work-Made-For-Hire Protocol',
        [
          '- **Полное отчуждение исключительных прав**: Передача 100% прав на исходный код, дизайн, документацию и патенты заказчику в момент создания.',
          '- **Отказ от личных неимущественных прав (Moral Rights)**: Безоговорочный отказ исполнителя от права на авторское имя и неприкосновенность произведения.',
          '- **Лицензия на Background IP**: Если исполнитель использует собственные наработки, предоставить заказчику бессрочную бесплатную лицензию.',
        ],
        [
          '- **Comprehensive Worldwide Assignment**: Full, irrevocable transfer of all copyright, patent, trademark, and trade secret assets upon creation.',
          '- **Moral Rights Waiver**: Unconditional waiver of moral rights, author attribution rights, and modification objections to the fullest extent permitted by law.',
          '- **Background IP Pre-Existing License**: Grant perpetual, irrevocable, royalty-free, worldwide license for embedded pre-existing vendor libraries.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'regulatory-gdpr-dpa-audit': {
    id: 'regulatory-gdpr-dpa-audit',
    name: 'RegulatoryGdprDpaAuditSkill',
    displayName: 'GDPR Article 28 Data Processing Agreement (DPA)',
    categoryId: 'legal',
    description: 'Audits and drafts GDPR Article 28 Data Processing Agreements: sub-processor obligations, audit rights, and SCCs for cross-border transfers.',
    tags: ['legal', 'gdpr', 'dpa', 'privacy', 'data-protection', 'compliance'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Аудит Соглашения об Обработке Данных (GDPR DPA Article 28)',
        'GDPR Article 28 Data Processing Agreement (DPA) Audit Protocol',
        [
          '- **Роли сторон (Controller vs. Processor)**: Четко зафиксировать статус оператора (Controller) и обработчика (Processor).',
          '- **Регламент уведомления об утечках (Data Breach)**: Обязать обработчика уведомить оператора об инциденте в течение 24–48 часов с момента обнаружения.',
          '- **Стандартные договорные условия (SCC)**: Включить Standard Contractual Clauses при передаче данных за пределы ЕС/ЕЭЗ.',
        ],
        [
          '- **Role Delineation**: Unambiguously classify Data Controller vs. Data Processor responsibilities and processing scopes.',
          '- **Breach Notification SLAs**: Enforce mandatory notification of personal data breaches within 48 hours of discovery.',
          '- **Standard Contractual Clauses (SCCs)**: Incorporate EU/UK Standard Contractual Clauses governing cross-border transfers to third countries.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'non-disclosure-agreement-nda': {
    id: 'non-disclosure-agreement-nda',
    name: 'NonDisclosureAgreementNdaSkill',
    displayName: 'Mutual NDA & Confidentiality Architecture',
    categoryId: 'legal',
    description: 'Drafts balanced bilateral Non-Disclosure Agreements: definition of Confidential Information, standard carve-outs, and survival terms.',
    tags: ['legal', 'nda', 'confidentiality', 'contracts', 'trade-secrets'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Спецификация Соглашения о Конфиденциальности (Mutual NDA)',
        'Mutual NDA & Confidentiality Agreement Specification',
        [
          '- **Определение Конфиденциальной Информации**: Четкий охват технических, финансовых данных и исходного кода.',
          '- **Стандартные исключения (Carve-outs)**: Исключить общедоступную информацию, данные, законно полученные от третьих лиц или разработанные независимо.',
          '- **Срок действия обязательств**: Установить срок защиты (например, 3–5 лет с момента раскрытия, а для ноу-хау — бессрочно).',
        ],
        [
          '- **Scope of Confidential Information**: Precise definition encompassing technical architectures, source code, roadmap, and commercial terms.',
          '- **Standard Carve-Out Exceptions**: Exclude public domain data, prior known information, independent development, and legally compelled disclosures.',
          '- **Survival Horizon**: Enforce standard 3-5 year confidentiality survival, with perpetual protection for trade secret IP.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'sla-uptime-remedy-clause': {
    id: 'sla-uptime-remedy-clause',
    name: 'SlaUptimeRemedyClauseSkill',
    displayName: 'SLA Uptime & Service Credit Remedies',
    categoryId: 'legal',
    description: 'Drafts production SLA terms: 99.9% uptime commitment, service credit refund schedules, maintenance windows, and chronic failure exit rights.',
    tags: ['legal', 'sla', 'uptime', 'service-credits', 'cloud', 'saas-contracts'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Условия Соглашения об Уровне Сервиса (SLA & Service Credits)',
        'SLA Uptime & Service Credit Remedy Terms',
        [
          '- **Гарантия доступности (99.9% Uptime)**: Формула расчета ежемесячного процента аптайма с исключением плановых регламентных окон.',
          '- **Шкала сервисных кредитов**: Таблица компенсаций: 99.0%–99.9% -> 10% кредит, 95.0%–99.0% -> 25% кредит, < 95.0% -> 50% кредит.',
          '- **Право на расторжение (Chronic Failure)**: Право клиента на немедленное расторжение договора без штрафов при нарушении SLA 3 месяца подряд.',
        ],
        [
          '- **Uptime Commitment Formula**: Quantify availability: $(\\text{Total Minutes} - \\text{Unscheduled Downtime}) / \\text{Total Minutes} \\times 100\\%$.',
          '- **Tiered Service Credit Matrix**: Tabulate credit remedies: $<99.9\\% \\rightarrow 10\\%$, $<99.0\\% \\rightarrow 25\\%$, $<95.0\\% \\rightarrow 50\\%$ monthly credit.',
          '- **Chronic Outage Termination Right**: Grant customer right to terminate agreement without penalty upon 3 consecutive months of SLA breach.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'force-majeure-clause-hardening': {
    id: 'force-majeure-clause-hardening',
    name: 'ForceMajeureClauseHardeningSkill',
    displayName: 'Force Majeure & Unforeseen Event Hardening',
    categoryId: 'legal',
    description: 'Hardens Force Majeure clauses: explicit qualifying events, notification deadlines, mitigation obligations, and termination rights.',
    tags: ['legal', 'force-majeure', 'risk', 'contracts', 'clauses'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Условия Форс-Мажора и Непреодолимой Силы (Force Majeure)',
        'Hardened Force Majeure & Disaster Clause Protocol',
        [
          '- **Квалифицирующие события**: Стихийные бедствия, войны, правительственные санкции, глобальные сбои электросетей (с исключением обычных перебоев интернета).',
          '- **Обязанность митигации**: Пострадавшая сторона обязана предпринимать разумные усилия для минимизации задержек и задействовать план аварийного восстановления (DRP).',
          '- **Срок прекращения обязательств**: Право расторгнуть договор, если действие форс-мажора продолжается более 60 дней.',
        ],
        [
          '- **Explicit Qualifying Triggers**: War, natural disasters, national infrastructure grid collapse, armed conflict (excluding routine commercial hardship).',
          '- **Mitigation Duty**: Affected party must exert commercial best efforts to invoke Disaster Recovery Plans (DRP) and mitigate delay.',
          '- **Prolonged Event Termination**: Either party may terminate agreement without penalty if Force Majeure persists beyond 60 calendar days.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'dispute-resolution-arbitration': {
    id: 'dispute-resolution-arbitration',
    name: 'DisputeResolutionArbitrationSkill',
    displayName: 'Multi-Tier Dispute Resolution & Arbitration',
    categoryId: 'legal',
    description: 'Structures multi-tier dispute escalation: Executive Good-Faith Negotiations -> Mediation -> Binding Arbitration (AAA / ICC).',
    tags: ['legal', 'dispute-resolution', 'arbitration', 'mediation', 'governing-law', 'litigation'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Порядок Разрешения Споров и Арбитражная Оговорка',
        'Multi-Tier Dispute Resolution & Arbitration Clause',
        [
          '- **Этап 1: Переговоры руководства**: Обязательный 30-дневный период прямых переговоров топ-менеджеров сторон.',
          '- **Этап 2: Медиация**: Попытка урегулирования с участием независимого сертифицированного медиатора.',
          '- **Этап 3: Обязательный арбитраж**: Окончательное разрешение спора в Международном коммерческом арбитраже (1 арбитр, язык разбирательства, применимое право).',
        ],
        [
          '- **Tier 1: Executive Good-Faith Escalation**: Mandatory 30-day senior executive conference prior to formal filings.',
          '- **Tier 2: Non-Binding Mediation**: Structured mediation under accredited dispute resolution rules.',
          '- **Tier 3: Binding Final Arbitration**: Exclusive binding arbitration (e.g. AAA/ICC/LCIA rules, seated in declared venue, 1 arbitrator, English language).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'employment-non-compete-severability': {
    id: 'employment-non-compete-severability',
    name: 'EmploymentNonCompeteSeverabilitySkill',
    displayName: 'Restrictive Covenants & Severability (Blue-Penciling)',
    categoryId: 'legal',
    description: 'Drafts enforceable restrictive covenants (Non-Solicitation, Non-Compete) with reasonable geography/duration and blue-penciling severability.',
    tags: ['legal', 'employment', 'non-compete', 'non-solicitation', 'severability', 'blue-pencil'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Ограничительные Обязательства и Разделимость (Severability)',
        'Restrictive Covenants & Blue-Pencil Severability Protocol',
        [
          '- **Разумные границы**: Ограничить Non-Solicit разумным сроком (до 12 месяцев) и строго определенным кругом клиентов/сотрудников.',
          '- **Оговорка о делимости (Severability / Blue-Pencil)**: Указать, что недействительность одного пункта не влечет недействительность всего договора.',
          '- **Судебная корректировка**: Предоставить суду право сузить объем ограничения до максимально допустимого законом уровня вместо его полной отмены.',
        ],
        [
          '- **Reasonable Scope & Duration**: Bound non-solicitation and restrictive covenants to reasonable durations (max 12 months) and targeted client lists.',
          '- **Severability Clause**: Provide that invalidity of any sub-clause shall not impair the enforceability of remaining contract provisions.',
          '- **Judicial Blue-Penciling**: Expressly authorize judicial modification to prune overbroad terms down to maximum enforceable statutory limits.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'compliance-sanctions-ofac-audit': {
    id: 'compliance-sanctions-ofac-audit',
    name: 'ComplianceSanctionsOfacAuditSkill',
    displayName: 'OFAC Sanctions & AML/KYC Compliance Checklist',
    categoryId: 'legal',
    description: 'Enforces international trade compliance: OFAC Specially Designated Nationals (SDN) screening, AML anti-money laundering, and export controls.',
    tags: ['legal', 'ofac', 'sanctions', 'aml', 'kyc', 'compliance', 'export-control'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'constraints',
        'Соблюдение Санкционных Режимов (OFAC, AML, Export Controls)',
        'OFAC Sanctions, AML & Export Compliance Standards',
        [
          '- **Проверка по спискам санкций**: Запрет любых транзакций с лицами и организациями из списков OFAC SDN, ЕС и ООН.',
          '- **Экспортный контроль**: Запрет экспорта криптографического ПО двойного назначения в подсанкционные юрисдикции (ITAR / EAR99).',
          '- **Процедуры KYC/AML**: Обязательная верификация бенефициарных владельцев с долей > 25% (Ultimate Beneficial Owners).',
        ],
        [
          '- **Sanctions Screening Invariant**: Strict prohibition of business transactions with OFAC SDN, EU Consolidated, and UN designated entities.',
          '- **Export Control & Cryptography**: Comply strictly with EAR/ITAR export regulations on dual-use cryptographic technologies.',
          '- **KYC/AML Beneficial Ownership**: Enforce identification and verification of Ultimate Beneficial Owners (UBO) holding > 25% equity.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'software-license-warranty-disclaimer': {
    id: 'software-license-warranty-disclaimer',
    name: 'SoftwareLicenseWarrantyDisclaimerSkill',
    displayName: 'Software Warranty Disclaimer & IP Indemnity',
    categoryId: 'legal',
    description: 'Drafts UCC Article 2 warranty disclaimers ("AS IS", Fitness for a Particular Purpose) paired with IP infringement indemnification obligations.',
    tags: ['legal', 'warranty', 'as-is', 'indemnification', 'ip-infringement', 'software-license'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Отказ от Гарантий и Возмещение Убытков (Warranty & IP Indemnity)',
        'Software Warranty Disclaimer & IP Infringement Indemnity Terms',
        [
          '- **Отказ от подразумеваемых гарантий («AS IS»)**: Заглавными буквами исключить гарантии коммерческой пригодности и соответствия конкретным целям (UCC Disclaimers).',
          '- **Гарантия ненарушения прав третьих лиц**: Обязательство разработчика защитить заказчика от исков о нарушении патентов или авторских прав сторонним софтом.',
          '- **Порядок возмещения**: Пошаговый регламент защиты (уведомление в течение 10 дней, единоличный контроль защиты, запрет несогласованных мировых соглашений).',
        ],
        [
          '- **Uppercase UCC Warranty Disclaimer**: Deliver standard uppercase disclaimer disclaiming all implied warranties of merchantability and fitness for a particular purpose.',
          '- **Third-Party IP Indemnity**: Vendor duty to defend and indemnify customer against third-party patent, copyright, or trade-secret infringement claims.',
          '- **Defense Procedure Conditions**: Impose conditions (timely written notice within 10 days, sole defense control, no unauthorized settlements).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'consumer-terms-of-service-tos': {
    id: 'consumer-terms-of-service-tos',
    name: 'ConsumerTermsOfServiceTosSkill',
    displayName: 'B2C Terms of Service & DMCA Safe Harbor',
    categoryId: 'legal',
    description: 'Drafts compliant consumer SaaS Terms of Service: Acceptable Use Policy (AUP), DMCA copyright takedown procedures, and account termination rights.',
    tags: ['legal', 'tos', 'terms-of-service', 'dmca', 'aup', 'saas', 'consumer-law'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Пользовательское Соглашение (Terms of Service & DMCA)',
        'Consumer Terms of Service & DMCA Safe Harbor Policy',
        [
          '- **Правила допустимого использования (AUP)**: Запрет парсинга, спама, обратного инжиниринга и распространения вредоносного ПО.',
          '- **Процедура DMCA Takedown**: Назначенный агент DMCA, форма подачи претензии о нарушении авторских прав и правила встречного уведомления.',
          '- **Право на блокировку**: Право сервиса немедленно заблокировать аккаунт при нарушении правил без предварительного уведомления.',
        ],
        [
          '- **Acceptable Use Policy (AUP)**: Prohibit scraping, botting, reverse-engineering, vulnerability scanning, and malicious payload distribution.',
          '- **DMCA Safe Harbor Protocol**: Designated Copyright Agent contact, formal notice-and-takedown procedure, and counter-notification process.',
          '- **Termination for Cause**: Unilateral right to immediately suspend or terminate accounts engaging in abusive conduct without liability.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'legal-disclaimer-informational': {
    id: 'legal-disclaimer-informational',
    name: 'LegalDisclaimerInformationalSkill',
    displayName: 'Mandatory Non-Legal-Advice Disclaimer',
    categoryId: 'legal',
    description: 'Injects non-lawyer legal disclaimer, clarifying that information is educational and does not establish an attorney-client relationship.',
    tags: ['legal', 'disclaimer', 'attorney-client', 'compliance', 'ethics'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'constraints',
        'Обязательный Юридический Дисклеймер',
        'Mandatory Non-Legal-Advice Informational Disclaimer',
        [
          '- **Отсутствие отношений адвокат-клиент**: Прямо указать, что предоставленный материал не является официальной юридической консультацией и не создает отношений «адвокат — клиент».',
          '- **Справочный характер**: Материал предназначен исключительно для ознакомительных целей.',
          '- **Рекомендация лицензированного юриста**: Рекомендовать привлечение квалифицированного юриста для оформления юридически значимых документов в соответствующей юрисдикции.',
        ],
        [
          '- **No Attorney-Client Relationship**: Explicitly state that provided analysis does not constitute formal legal advice or create an attorney-client relationship.',
          '- **Informational Purpose Only**: Directives are formulated strictly for reference and general structural drafting assistance.',
          '- **Licensed Counsel Recommendation**: Mandate review by licensed legal counsel in the governing jurisdiction prior to executing binding agreements.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

'cross-border-data-transfer-scc': {
    id: 'cross-border-data-transfer-scc',
    name: 'CrossBorderDataTransferSccSkill',
    displayName: 'EU Standard Contractual Clauses (SCCs) & TIA',
    categoryId: 'legal',
    description: 'Structures international data transfers under GDPR Chapter V using EU Standard Contractual Clauses and Transfer Impact Assessments.',
    tags: ['legal', 'gdpr', 'scc', 'tia', 'privacy', 'cross-border'],
    transform: createStandardSkillTransform({
sectionName: 'Cross-Border Data Transfer (SCCs & TIA) Protocol',
      ruSectionName: 'Трансграничная передача данных (SCCs и TIA по GDPR)',
      instructions: [
        'Select the appropriate EU Standard Contractual Clauses (SCC) module: Module 1 (C2C), Module 2 (C2P), Module 3 (P2P), or Module 4 (P2C).',
        'Execute a Transfer Impact Assessment (TIA) evaluating destination country surveillance laws (e.g., US FISA Section 702, Cloud Act).',
        'Specify mandatory supplementary technical, organizational, and contractual measures (e.g., end-to-end encryption with keys in EU).',
        'Document detailed Annexes: Categories of Data Subjects, Types of Personal Data, Processing Operations, and Technical Security Measures.',
      ],
      ruInstructions: [
        'Выбирайте корректный модуль стандартных договорных условий ЕС (SCC): Модуль 1 (C2C), Модуль 2 (C2P), Модуль 3 (P2P) или Модуль 4 (P2C).',
        'Проводите оценку влияния передачи данных (TIA), анализируя законодательство страны назначения о слежке и доступе спецслужб (FISA 702, CLOUD Act).',
        'Определяйте обязательные компенсирующие меры: сквозное шифрование с хранением ключей в юрисдикции ЕС, аудит доступа и уведомление об ордерах.',
        'Детально заполняйте приложения к договору: категории субъектов, состав персональных данных, цели обработки и технические меры защиты.',
      ],
      semanticType: 'compliance_directive',
      tags: ['legal', 'gdpr', 'scc', 'tia', 'privacy', 'cross-border'],
    }),
  },

  'mergers-acquisitions-due-diligence': {
    id: 'mergers-acquisitions-due-diligence',
    name: 'MergersAcquisitionsDueDiligenceSkill',
    displayName: 'M&A Legal Due Diligence Matrix',
    categoryId: 'legal',
    description: 'Executes comprehensive M&A legal audit across corporate standing, material contracts, IP ownership, litigation, and regulatory risk.',
    tags: ['legal', 'm-and-a', 'due-diligence', 'corporate-law', 'acquisitions'],
    transform: createStandardSkillTransform({
sectionName: 'M&A Legal Due Diligence Matrix',
      ruSectionName: 'Матрица юридического аудита сделок M&A (Due Diligence)',
      instructions: [
        'Audit target corporate records: capitalization table, minute books, shareholder agreements, and good standing certificates in jurisdiction of incorporation.',
        'Review Material Contracts for change-of-control triggers, anti-assignment covenants, exclusivity restraints, and most-favored-nation clauses.',
        'Verify intellectual property clean-chain-of-title: inventor assignments, proprietary information agreements, open-source audit, and trademark registrations.',
        'Quantify litigation liabilities, unasserted claims, environmental exposures, and employment misclassification risks (independent contractors vs employees).',
      ],
      ruInstructions: [
        'Проверяйте корпоративную историю цели: актуальный каптейбл (cap table), протоколы собраний, акционерные соглашения и сертификаты юридической чистоты.',
        'Анализируйте ключевые контракты на предмет условий о смене контроля (change of control), запретов на уступку прав и эксклюзивных ограничений.',
        'Верифицируйте цепочку прав на интеллектуальную собственность (chain of title): договоры авторского заказа, соглашения о передаче прав и чистоту OSS.',
        'Количественно оценивайте судебные риски, экологические обязательства и риски переквалификации договоров с подрядчиками в трудовые отношения.',
      ],
      semanticType: 'process_directive',
      tags: ['legal', 'm-and-a', 'due-diligence', 'corporate-law', 'acquisitions'],
    }),
  },

  'open-source-license-compliance-spdx': {
    id: 'open-source-license-compliance-spdx',
    name: 'OpenSourceLicenseComplianceSpdxSkill',
    displayName: 'Open Source License Compliance & Copyleft Isolation',
    categoryId: 'legal',
    description: 'Audits software dependencies against GPL, AGPL, LGPL, MIT, and Apache-2.0 to eliminate viral copyleft contamination.',
    tags: ['legal', 'open-source', 'spdx', 'copyleft', 'gpl', 'licensing'],
    transform: createStandardSkillTransform({
sectionName: 'Open Source License Compliance & SPDX Audit',
      ruSectionName: 'Комплаенс открытых лицензий и изоляция копилефта (SPDX / GPL / MIT)',
      instructions: [
        'Categorize all third-party software dependencies by SPDX identifier: Permissive (MIT, BSD-3-Clause, Apache-2.0), Weak Copyleft (LGPL, MPL-2.0), and Strong/Network Copyleft (GPL-3.0, AGPL-3.0).',
        'Assess linking architecture (static vs dynamic linking, IPC boundaries, independent REST microservices) to determine derivative work exposure under GPL.',
        'Highlight strict notice obligations: copyright preservation, attribution files, and patent grant retaliation clauses (Apache-2.0 Section 3).',
        'Architect clean isolation boundaries to prevent proprietary codebase contamination by AGPL-3.0 network-triggered source disclosure mandates.',
      ],
      ruInstructions: [
        'Классифицируйте сторонние библиотеки по идентификаторам SPDX: разрешительные (MIT, Apache-2.0), слабый копилефт (LGPL, MPL) и сильный копилефт (GPL-3.0, AGPL-3.0).',
        'Оценивайте архитектуру связывания (статическая/динамическая линковка, IPC, REST API) для исключения признания проприетарного кода производным произведением.',
        'Фиксируйте обязательства по сохранению уведомлений об авторских правах и патентные оговорки (Apache-2.0 статья 3).',
        'Проектируйте строгие изоляционные границы для предотвращения вирусного раскрытия исходного кода под лицензией AGPL-3.0.',
      ],
      semanticType: 'compliance_directive',
      tags: ['legal', 'open-source', 'spdx', 'copyleft', 'gpl', 'licensing'],
    }),
  },

  'indemnification-defense-carveouts': {
    id: 'indemnification-defense-carveouts',
    name: 'IndemnificationDefenseCarveoutsSkill',
    displayName: 'Indemnification, Defense & IP Carve-Outs',
    categoryId: 'legal',
    description: 'Drafts balanced mutual indemnification clauses, duty to defend procedures, and explicit exceptions for third-party IP claims.',
    tags: ['legal', 'contracts', 'indemnification', 'ip-infringement', 'risk-allocation'],
    transform: createStandardSkillTransform({
sectionName: 'Indemnification & Defense Clauses Protocol',
      ruSectionName: 'Условия возмещения убытков (Indemnification) и защита от исков',
      instructions: [
        'Clearly delineate the tripartite obligations: Indemnify (compensate loss), Defend (provide legal counsel), and Hold Harmless (release from liability).',
        'Establish procedural notice requirements: prompt written notice, exclusive control of defense/settlement, and full reasonable cooperation.',
        'Carve out IP infringement indemnification exceptions: customer modifications, unauthorized combinations with third-party software, or failure to apply security updates.',
        'Specify remedies for IP infringement: obtain right to continue using, replace with non-infringing equivalent, or terminate with pro-rata refund.',
      ],
      ruInstructions: [
        'Четко разграничивайте триаду обязательств: возместить ущерб (Indemnify), предоставить судебную защиту (Defend) и освободить от ответственности (Hold Harmless).',
        'Прописывайте процедурные требования: своевременное письменное уведомление, контроль над ведением процесса и согласование мировых соглашений.',
        'Формулируйте исключения из возмещения за нарушение IP: модификация софта клиентом, несанкционированное комбинирование со сторонними системами.',
        'Указывайте исчерпывающие средства правовой защиты: приобретение лицензии, замена на ненарушающий аналог или возврат аванса при расторжении.',
      ],
      semanticType: 'structural_directive',
      tags: ['legal', 'contracts', 'indemnification', 'ip-infringement', 'risk-allocation'],
    }),
  },

  'anticorruption-fcpa-ukba-compliance': {
    id: 'anticorruption-fcpa-ukba-compliance',
    name: 'AnticorruptionFcpaUkbaComplianceSkill',
    displayName: 'Anti-Corruption & FCPA / UK Bribery Act Compliance',
    categoryId: 'legal',
    description: 'Implements anti-bribery policies, third-party intermediary vetting, government official gift caps, and books-and-records audit rights.',
    tags: ['legal', 'fcpa', 'anti-corruption', 'bribery', 'compliance'],
    transform: createStandardSkillTransform({
sectionName: 'Anti-Corruption & FCPA/UKBA Compliance Protocol',
      ruSectionName: 'Антикоррупционный комплаенс (FCPA / UK Bribery Act)',
      instructions: [
        'Enforce strict prohibitions against giving, offering, or promising anything of value to foreign government officials or commercial counterparties.',
        'Mandate comprehensive third-party due diligence (background checks, politically exposed persons screening, ultimate beneficial ownership).',
        'Incorporate strict Books and Records representations ensuring all expenditures are accurately recorded in reasonable detail.',
        'Establish contractual audit rights, termination for cause upon compliance breach, and immediate reporting channels for suspected bribery.',
      ],
      ruInstructions: [
        'Внедряйте строгий запрет на предоставление или обещание любых ценностей иностранным должностным лицам или коммерческим партнерам.',
        'Обязывайте проводить глубокую проверку контрагентов (due diligence третьих лиц, проверка публичных должностных лиц PEP и конечных бенефициаров).',
        'Включайте заверения о надлежащем ведении бухгалтерского учета (Books & Records) с точным и прозрачным отражением всех расходов.',
        'Закрепляйте право на внеплановый аудит, право немедленного одностороннего расторжения при нарушении и каналы сообщений о злоупотреблениях.',
      ],
      semanticType: 'compliance_directive',
      tags: ['legal', 'fcpa', 'anti-corruption', 'bribery', 'compliance'],
    }),
  },

  'safes-convertible-notes-cap-table': {
    id: 'safes-convertible-notes-cap-table',
    name: 'SafesConvertibleNotesCapTableSkill',
    displayName: 'Post-Money SAFE & Convertible Financing Architecture',
    categoryId: 'legal',
    description: 'Structures early-stage venture financing instruments: YC Post-Money SAFEs, valuation caps, discount rates, and dilution modeling.',
    tags: ['legal', 'venture-capital', 'safe', 'startup-financing', 'cap-table'],
    transform: createStandardSkillTransform({
sectionName: 'Post-Money SAFE & Venture Financing Protocol',
      ruSectionName: 'Структурирование венчурного финансирования (Post-Money SAFE)',
      instructions: [
        'Structure standard Y Combinator Post-Money Simple Agreements for Future Equity (SAFE) with explicit Valuation Cap and/or Discount Rate (typically 20%).',
        'Model cap-table dilution dynamics: calculate investor ownership percentage directly from Investment Amount / Post-Money Valuation Cap.',
        'Define clear triggering conversion events: Equity Financing (Next Qualified Round), Corporate Liquidity Event (M&A), and Dissolution Event.',
        'Clarify Pro Rata Rights side-letter agreements and Most Favored Nation (MFN) provisions for angel investors.',
      ],
      ruInstructions: [
        'Оформляйте венчурные инвестиции по стандартам Y Combinator Post-Money SAFE с фиксацией оценки (Valuation Cap) и дисконта (Discount Rate, обычно 20%).',
        'Моделируйте размытие долей в каптейбле: расчет доли инвестора напрямую из соотношения суммы инвестиций к Post-Money Cap.',
        'Четко формулируйте условия автоматической конвертации: квалифицированный раунд (Equity Financing), продажа компании (M&A) или ликвидация.',
        'Прописывайте условия дополнительных соглашений (Side Letters): право на сохранение доли в следующих раундах (Pro Rata) и условия MFN.',
      ],
      semanticType: 'structural_directive',
      tags: ['legal', 'venture-capital', 'safe', 'startup-financing', 'cap-table'],
    }),
  },

  'california-ccpa-cpra-privacy-audit': {
    id: 'california-ccpa-cpra-privacy-audit',
    name: 'CaliforniaCcpaCpraPrivacyAuditSkill',
    displayName: 'California Privacy Rights Act (CPRA/CCPA) Compliance',
    categoryId: 'legal',
    description: 'Enforces CPRA/CCPA consumer rights: Right to Know, Delete, Correct, Opt-Out of Sale/Share, and Limit Sensitive Personal Information.',
    tags: ['legal', 'ccpa', 'cpra', 'privacy', 'consumer-rights', 'california'],
    transform: createStandardSkillTransform({
sectionName: 'CPRA / CCPA Consumer Privacy Protocol',
      ruSectionName: 'Комплаенс защиты потребительской приватности по CPRA / CCPA',
      instructions: [
        'Provide conspicuous "Do Not Sell or Share My Personal Information" and "Limit the Use of My Sensitive Personal Information" links.',
        'Establish standard operating procedures for verifying and responding to Verifiable Consumer Requests (VCR) within statutory 45-day timelines.',
        'Audit third-party vendor contracts to mandate Service Provider and Contractor addenda prohibiting retention, use, or sale of disclosed data.',
        'Maintain annual data categorization matrices disclosing: Categories collected, Sources, Business Purpose, and Third Parties shared with.',
      ],
      ruInstructions: [
        'Обеспечивайте размещение заметных ссылок «Do Not Sell or Share My Personal Information» и управления использованием конфиденциальных данных.',
        'Регламентируйте порядок верификации личности и предоставления ответов на запросы потребителей в установленный законом срок 45 дней.',
        'Аудируйте договоры с подрядчиками, включая обязательные условия статуса Service Provider с запретом на коммерческое использование переданных данных.',
        'Ведите прозрачную матрицу раскрытия информации в Политике конфиденциальности: категории данных, источники, цели сбора и получатели.',
      ],
      semanticType: 'compliance_directive',
      tags: ['legal', 'ccpa', 'cpra', 'privacy', 'consumer-rights', 'california'],
    }),
  },

  'commercial-real-estate-triple-net-lease': {
    id: 'commercial-real-estate-triple-net-lease',
    name: 'CommercialRealEstateTripleNetLeaseSkill',
    displayName: 'Commercial Triple Net (NNN) Lease Review',
    categoryId: 'legal',
    description: 'Audits commercial real estate lease agreements: base rent, Common Area Maintenance (CAM), tax prorations, and surrender covenants.',
    tags: ['legal', 'real-estate', 'lease-agreement', 'triple-net', 'contracts'],
    transform: createStandardSkillTransform({
sectionName: 'Commercial Triple Net (NNN) Lease Protocol',
      ruSectionName: 'Аудит договоров коммерческой аренды (Triple Net / NNN Lease)',
      instructions: [
        'Audit Common Area Maintenance (CAM) operational expense pass-throughs, insisting on controllable expense caps (e.g., 5% per annum) and audit rights.',
        'Clarify tenant vs landlord maintenance obligations: restrict tenant repair duties to interior premises, excluding structural elements and roof.',
        'Scrutinize assignment and subletting covenants, mandating landlord consent "shall not be unreasonably withheld, conditioned, or delayed".',
        'Review Casualty and Condemnation clauses, ensuring tenant rent abatement rights and mutual termination options for substantial destruction.',
      ],
      ruInstructions: [
        'Аудируйте эксплуатационные расходы на содержание общих зон (CAM), требуя фиксации предельного ежегодного роста (кэп 5%) и права на аудит смет.',
        'Четко разграничивайте обязанности по ремонту: ограничивайте ответственность арендатора внутренними помещениями, возлагая кровлю и несущие стены на арендодателя.',
        'Контролируйте условия субаренды и уступки прав, исключая необоснованные отказы со стороны арендодателя.',
        'Проверяйте положения о форс-мажоре, авариях и сносе: право арендатора на соразмерное снижение арендной платы или расторжение при невозможности эксплуатации.',
      ],
      semanticType: 'structural_directive',
      tags: ['legal', 'real-estate', 'lease-agreement', 'triple-net', 'contracts'],
    }),
  },

  'severability-integration-boilerplate': {
    id: 'severability-integration-boilerplate',
    name: 'SeverabilityIntegrationBoilerplateSkill',
    displayName: 'Contractual Boilerplate Hardening & Integration',
    categoryId: 'legal',
    description: 'Fortifies four-corners integration, survival, blue-penciling severability, and cumulative remedies boilerplate provisions.',
    tags: ['legal', 'boilerplate', 'contracts', 'severability', 'integration-clause'],
    transform: createStandardSkillTransform({
sectionName: 'Boilerplate Hardening & Integration Protocol',
      ruSectionName: 'Усиление стандартных условий договоров (Boilerplate Clauses)',
      instructions: [
        'Draft an ironclad Integration / Entire Agreement clause superseding all prior oral and written negotiations, drafts, and representations.',
        'Structure Severability with blue-penciling provisions instructing courts to reform invalid terms to preserve original commercial intent.',
        'Explicitly enumerate Survival provisions specifying which sections (indemnification, confidentiality, IP, limitation of liability) outlive contract termination.',
        'Include Cumulative Remedies, Counterparts / Electronic Signature recognition, and strict No-Waiver estoppel protections.',
      ],
      ruInstructions: [
        'Формулируйте исчерпывающее условие о полноте соглашения (Entire Agreement), отменяющее все предварительные устные договоренности и переписку.',
        'Прописывайте автономность положений договора (Severability) с правом суда скорректировать недействительное условие для сохранения коммерческого смысла.',
        'Явно перечисляйте положения, сохраняющие силу после расторжения договора (конфиденциальность, IP, ограничение ответственности, подсудность).',
        'Включайте условия о кумулятивности средств защиты, юридической силе электронных подписей и неприменении эстоппеля при временном отказе от претензий.',
      ],
      semanticType: 'structural_directive',
      tags: ['legal', 'boilerplate', 'contracts', 'severability', 'integration-clause'],
    }),
  },

  'export-control-itar-ear-classification': {
    id: 'export-control-itar-ear-classification',
    name: 'ExportControlItarEarClassificationSkill',
    displayName: 'Export Controls: ITAR & EAR Dual-Use Classification',
    categoryId: 'legal',
    description: 'Classifies technologies and encryption software under US Export Administration Regulations (EAR) and International Traffic in Arms (ITAR).',
    tags: ['legal', 'export-control', 'itar', 'ear', 'eccn', 'sanctions'],
    transform: createStandardSkillTransform({
sectionName: 'Export Controls Classification (EAR & ITAR)',
      ruSectionName: 'Экспортный контроль и классификация технологий (EAR / ITAR)',
      instructions: [
        'Determine jurisdiction: US Munitions List (USML / ITAR defense articles) vs Commerce Control List (CCL / EAR dual-use commercial items).',
        'Classify software/hardware under exact Export Control Classification Numbers (ECCN, e.g., 5D002 for strong cryptography, or EAR99).',
        'Evaluate license exceptions (e.g., TSU, ENC for commercial encryption software) and mandatory BIS self-classification reporting filings.',
        'Implement deemed export controls preventing unauthorized technical data disclosures to foreign national employees without licenses.',
      ],
      ruInstructions: [
        'Определяйте применимую юрисдикцию: товары военного назначения (список USML / ITAR) против товаров двойного назначения (список CCL / EAR).',
        'Классифицируйте программное обеспечение по кодам ECCN (например, 5D002 для систем с сильным шифрованием или EAR99).',
        'Анализируйте применимость лицензионных исключений (TSU, ENC для коммерческой криптографии) и необходимость подачи отчетов в Бюро промышленности и безопасности (BIS).',
        'Внедряйте контроль «условного экспорта» (deemed export) для предотвращения несанкционированной передачи исходного кода иностранным сотрудникам.',
      ],
      semanticType: 'compliance_directive',
      tags: ['legal', 'export-control', 'itar', 'ear', 'eccn', 'sanctions'],
    }),
  },

  'whistleblower-protection-sec-policy': {
    id: 'whistleblower-protection-sec-policy',
    name: 'WhistleblowerProtectionSecPolicySkill',
    displayName: 'Whistleblower Policy & Anti-Retaliation Protocol',
    categoryId: 'legal',
    description: 'Establishes Sarbanes-Oxley (SOX), Dodd-Frank, and EU Whistleblowing Directive compliance, intake channels, and retaliation immunity.',
    tags: ['legal', 'whistleblower', 'compliance', 'sox', 'ethics', 'governance'],
    transform: createStandardSkillTransform({
sectionName: 'Whistleblower Protection & Anti-Retaliation Policy',
      ruSectionName: 'Политика защиты информаторов и противодействия давлению (Whistleblower)',
      instructions: [
        'Establish secure, anonymous reporting intake hotlines overseen by an independent audit committee or dedicated compliance officer.',
        'Affirm strict anti-retaliation protections prohibiting termination, demotion, harassment, or adverse employment actions against reporting employees.',
        'Ensure confidentiality and personal data protection for both whistleblower and accused parties throughout the investigative process.',
        'Explicitly state that no severance or non-disclosure agreement may restrict an employee from communicating directly with regulatory authorities (e.g., SEC Rule 21F-17).',
      ],
      ruInstructions: [
        'Создавайте защищенные каналы анонимного приема сообщений под контролем независимого комитета по аудиту или комплаенс-офицера.',
        'Закрепляйте абсолютный запрет на любые формы преследования (retaliation): увольнение, понижение в должности или дискриминацию заявителя.',
        'Гарантируйте конфиденциальность личности заявителя и защиту персональных данных всех участников внутреннего расследования.',
        'Явно фиксируйте, что никакие соглашения о неразглашении (NDA) не могут ограничивать право сотрудника обращаться в надзорные и правоохранительные органы.',
      ],
      semanticType: 'compliance_directive',
      tags: ['legal', 'whistleblower', 'compliance', 'sox', 'ethics', 'governance'],
    }),
  },

  'trademark-fair-use-clearance-audit': {
    id: 'trademark-fair-use-clearance-audit',
    name: 'TrademarkFairUseClearanceAuditSkill',
    displayName: 'Trademark Clearance & Nominative Fair Use Audit',
    categoryId: 'legal',
    description: 'Evaluates trademark infringement likelihood of confusion factors and structures nominative fair use comparative claims.',
    tags: ['legal', 'trademark', 'intellectual-property', 'fair-use', 'branding'],
    transform: createStandardSkillTransform({
sectionName: 'Trademark Clearance & Nominative Fair Use Audit',
      ruSectionName: 'Аудит товарных знаков и добросовестного использования (Fair Use)',
      instructions: [
        'Analyze likelihood of confusion across Polaroid / Sleekcraft factors: mark similarity, goods/services relatedness, marketing channels, and intent.',
        'Apply the 3-part Nominative Fair Use test: product not readily identifiable without mark, use only as much as necessary, and no false suggestion of sponsorship.',
        'Audit comparative advertising campaigns to ensure factual accuracy, substantiation of claims, and avoidance of brand tarnishment or dilution.',
        'Provide standardized trademark disclaimer notices stating lack of affiliation, sponsorship, or endorsement by the trademark owner.',
      ],
      ruInstructions: [
        'Оценивайте риски смешения до степени сходства: сходство обозначений, однородность товаров/услуг, каналы сбыта и известность знака.',
        'Применяйте критерии номинативного добросовестного использования: товар невозможно описать иначе, используется лишь минимально необходимое обозначение, нет ложной видимости спонсорства.',
        'Аудируйте сравнительную рекламу на предмет достоверности утверждений, наличия документальных доказательств и отсутствия дискредитации чужого бренда.',
        'Включайте обязательный дисклеймер об отсутствии аффилированности, спонсорства или одобрения со стороны правообладателя товарного знака.',
      ],
      semanticType: 'compliance_directive',
      tags: ['legal', 'trademark', 'intellectual-property', 'fair-use', 'branding'],
    }),
  },

  'patent-claims-construction-markman': {
    id: 'patent-claims-construction-markman',
    name: 'PatentClaimsConstructionMarkmanSkill',
    displayName: 'Patent Claim Drafting & Construction Architecture',
    categoryId: 'legal',
    description: 'Structures patent independent and dependent claims with precise transitions, antecedent basis, and defensible scope.',
    tags: ['legal', 'patents', 'intellectual-property', 'claim-drafting', 'innovation'],
    transform: createStandardSkillTransform({
sectionName: 'Patent Claim Construction & Drafting Architecture',
      ruSectionName: 'Архитектура формулы изобретения и патентных притязаний',
      instructions: [
        'Structure independent claims rigorously: Preamble (technical field), Transition ("comprising" for open, "consisting of" for closed), and Body (elements and interactions).',
        'Maintain strict antecedent basis: every element introduced with an indefinite article ("a/an") before subsequent definite references ("the/said").',
        'Draft nested dependent claims progressively narrowing scope to create robust fallbacks against prior art invalidation attacks.',
        'Avoid functional claiming and vague promissory language; provide concrete structural and algorithmic embodiments in the specification.',
      ],
      ruInstructions: [
        'Структурируйте независимые пункты формулы: преамбула (область техники), переходная фраза («содержащий/включающий» для открытого перечня) и тело притязания.',
        'Соблюдайте строгость первоначального упоминания признаков (antecedent basis) при повторных ссылках по тексту формулы.',
        'Разрабатывайте систему зависимых пунктов, последовательно сужающих объем прав и создающих эшелонированную защиту от противопоставления аналогов.',
        'Избегайте чисто функциональных формулировок без привязки к конкретным конструктивным элементам или шагам алгоритма.',
      ],
      semanticType: 'structural_directive',
      tags: ['legal', 'patents', 'intellectual-property', 'claim-drafting', 'innovation'],
    }),
  },

  'hipaa-baa-business-associate-agreement': {
    id: 'hipaa-baa-business-associate-agreement',
    name: 'HipaaBaaBusinessAssociateAgreementSkill',
    displayName: 'HIPAA Business Associate Agreement (BAA) Audit',
    categoryId: 'legal',
    description: 'Ensures Business Associate Agreement compliance under HIPAA/HITECH: permitted PHI uses, breach notifications, and subcontractor flow-downs.',
    tags: ['legal', 'hipaa', 'baa', 'healthcare-compliance', 'phi', 'data-security'],
    transform: createStandardSkillTransform({
sectionName: 'HIPAA Business Associate Agreement (BAA) Protocol',
      ruSectionName: 'Аудит соглашения об обработке медицинских данных (HIPAA BAA)',
      instructions: [
        'Strictly enumerate permitted and required uses and disclosures of Protected Health Information (PHI) under HIPAA Privacy and Security Rules.',
        'Mandate implementation of administrative, physical, and technical safeguards meeting 45 CFR Part 164 Subpart C.',
        'Enforce rapid breach notification timelines: require Business Associate to notify Covered Entity without unreasonable delay (and within 24-72 hours).',
        'Mandate that all subcontractors handling PHI execute equivalent downstream Business Associate Agreements.',
      ],
      ruInstructions: [
        'Строго ограничивайте разрешенные цели использования и раскрытия защищаемой медицинской информации (PHI) в рамках HIPAA.',
        'Обязывайте внедрять административные, физические и технические меры безопасности по стандарту 45 CFR Part 164.',
        'Устанавливайте жесткие сроки уведомления об утечках или инцидентах безопасности: незамедлительно (в течение 24–72 часов).',
        'Требуйте зеркального возложения всех обязательств по соглашению BAA на любых субподрядчиков и поставщиков облачных услуг.',
      ],
      semanticType: 'compliance_directive',
      tags: ['legal', 'hipaa', 'baa', 'healthcare-compliance', 'phi', 'data-security'],
    }),
  },

  'ai-governance-eu-ai-act-compliance': {
    id: 'ai-governance-eu-ai-act-compliance',
    name: 'AiGovernanceEuAiActComplianceSkill',
    displayName: 'EU AI Act Governance & Risk Classification',
    categoryId: 'legal',
    description: 'Classifies AI systems under the EU AI Act (Unacceptable, High-Risk, GPAI, Minimal) and drafts mandatory transparency dossiers.',
    tags: ['legal', 'ai-act', 'eu-law', 'ai-governance', 'compliance', 'high-risk-ai'],
    transform: createStandardSkillTransform({
sectionName: 'EU AI Act Governance & Classification Architecture',
      ruSectionName: 'Комплаенс Закона ЕС об искусственном интеллекте (EU AI Act)',
      instructions: [
        'Classify AI system into statutory tier: Prohibited (social scoring, biometric categorization), High-Risk (Annex III critical infrastructure/employment), GPAI with systemic risk, or Minimal Risk.',
        'For High-Risk systems, establish mandatory risk management systems, data governance protocols against training bias, and comprehensive technical documentation.',
        'Enforce human-in-the-loop oversight mechanisms, continuous logging of runtime operations, and robust cybersecurity hardening.',
        'Fulfill mandatory transparency disclosures: inform users they are interacting with AI, watermarking generated synthetic media, and copyright policy summaries.',
      ],
      ruInstructions: [
        'Классифицируйте ИИ-систему по уровням риска EU AI Act: запрещенные практики, высокий риск (Приложение III), модели общего назначения (GPAI) или минимальный риск.',
        'Для систем высокого риска внедряйте обязательную систему управления рисками, аудит обучающих выборок на смещения (bias) и техническое досье.',
        'Обеспечивайте механизмы контроля человеком (human oversight), непрерывное логирование работы и защиту от состязательных атак.',
        'Выполняйте требования прозрачности: уведомление пользователей о контакте с ИИ, цифровая маркировка синтетического контента и сводка по авторским правам.',
      ],
      semanticType: 'compliance_directive',
      tags: ['legal', 'ai-act', 'eu-law', 'ai-governance', 'compliance', 'high-risk-ai'],
    }),
  },

  'liquidated-damages-unenforceable-penalty': {
    id: 'liquidated-damages-unenforceable-penalty',
    name: 'LiquidatedDamagesUnenforceablePenaltySkill',
    displayName: 'Liquidated Damages vs Penalty Clause Calibration',
    categoryId: 'legal',
    description: 'Drafts enforceable liquidated damages clauses by demonstrating pre-estimated actual harm and avoiding punitive characterization.',
    tags: ['legal', 'contracts', 'liquidated-damages', 'remedies', 'dispute-avoidance'],
    transform: createStandardSkillTransform({
sectionName: 'Enforceable Liquidated Damages Calibration',
      ruSectionName: 'Калибровка заранее оцененных убытков (Liquidated Damages vs Penalty)',
      instructions: [
        'Draft liquidated damages provisions demonstrating that actual damages would be difficult or impossible to estimate accurately at time of contract execution.',
        'Ensure the stipulated sum or calculation formula represents a reasonable pre-estimate of probable commercial loss, not an arbitrary punishment.',
        'Include mutual recitals expressly agreeing that the remedy is reasonable compensation and not a penalty or forfeiture.',
        'Calibrate tiered daily or milestone-specific damage amounts to reflect graduated business disruption rather than a single disproportionate lump sum.',
      ],
      ruInstructions: [
        'Формулируйте условия о заранее оцененных убытках с обоснованием, почему точный размер ущерба сложно оценить на момент заключения сделки.',
        'Убедитесь, что согласованная формула компенсации отражает разумную предварительную оценку вероятных потерь, а не носит карательный характер.',
        'Включайте прямое согласие сторон о том, что данная сумма является справедливой компенсацией реальных расходов, а не штрафом (penalty).',
        'Применяйте градуированные подневные или поэтапные ставки компенсации в зависимости от длительности просрочки вместо единовременного штрафа.',
      ],
      semanticType: 'structural_directive',
      tags: ['legal', 'contracts', 'liquidated-damages', 'remedies', 'dispute-avoidance'],
    }),
  },
  "indemnification-and-hold-harmless-audit": {
    id: "indemnification-and-hold-harmless-audit",
    name: "IndemnificationAndHoldHarmlessAuditSkill",
    displayName: "Indemnification, Defense & Hold Harmless Clause Analysis",
    categoryId: "legal",
    description: "Scrutinizes scope of indemnification triggers (IP infringement, gross negligence, third-party claims) and defense control mechanisms.",
    tags: ["legal","contracts","indemnification","risk-allocation","liability"],
    transform: createStandardSkillTransform({
      sectionName: "Indemnification & Defense Scope Analysis",
      ruSectionName: "Анализ условий возмещения убытков и освобождения от ответственности",
      instructions: [
        "Dissect the three distinct obligations: Indemnify (pay damages), Defend (provide legal counsel), Hold Harmless (exonerate).",
        "Ensure IP infringement indemnity includes explicit carve-outs (customer modifications, unauthorized combinations).",
        "Verify whether indemnification obligations are subject to or expressly carved out of the general Limitation of Liability cap."
],
      ruInstructions: [
        "Разграничьте три обязательства: возместить убытки (Indemnify), предоставить защиту (Defend) и освободить от претензий (Hold Harmless).",
        "Проверьте исключения в IP-индемнити (модификации заказчика, нецелевое использование).",
        "Уточните, входит ли индемнити под общий лимит ответственности или является исключением без лимита."
],
      semanticType: 'protocol',
      tags: ["legal","contracts","indemnification","risk-allocation","liability"],
    }),
  },

  "gdpr-dpa-standard-contractual-clauses": {
    id: "gdpr-dpa-standard-contractual-clauses",
    name: "GdprDpaStandardContractualClausesSkill",
    displayName: "GDPR Data Processing Agreement (DPA) & EU SCCs",
    categoryId: "legal",
    description: "Reviews Article 28 DPA terms, sub-processor notification windows, audit rights, and Module 1-4 Standard Contractual Clauses for cross-border data transfers.",
    tags: ["legal","gdpr","privacy","dpa","scc","cross-border-transfers"],
    transform: createStandardSkillTransform({
      sectionName: "GDPR DPA & Cross-Border Transfer Compliance",
      ruSectionName: "Соответствие GDPR DPA и стандартным договорным условиям (SCC)",
      instructions: [
        "Verify mandatory Article 28 terms (processing instructions, confidentiality, security measures, sub-processor authorization).",
        "Select applicable EU SCC Module (Controller-to-Controller, Controller-to-Processor, Processor-to-Processor, Processor-to-Controller).",
        "Conduct a Transfer Impact Assessment (TIA) documenting supplementary technical/encryption measures."
],
      ruInstructions: [
        "Проверьте обязательные условия ст. 28 GDPR (инструкции обработки, аудит, субобработчики).",
        "Выберите корректный модуль SCC (C2C, C2P, P2P, P2C) для трансграничной передачи.",
        "Опишите оценку рисков передачи (TIA) и дополнительные технические меры шифрования."
],
      semanticType: "process_directive",
      tags: ["legal","gdpr","privacy","dpa","scc","cross-border-transfers"],
    }),
  },

  "intellectual-property-work-for-hire-assignment": {
    id: "intellectual-property-work-for-hire-assignment",
    name: "IntellectualPropertyWorkForHireAssignmentSkill",
    displayName: "IP Assignment, Work Made for Hire & Moral Rights Waiver",
    categoryId: "legal",
    description: "Ensures bulletproof intellectual property assignment from employees, contractors, and agency partners with express moral rights waivers.",
    tags: ["legal","intellectual-property","work-made-for-hire","assignment","copyright"],
    transform: createStandardSkillTransform({
      sectionName: "IP Assignment & Ownership Verification",
      ruSectionName: "Передача прав на интеллектуальную собственность и отказ от неимущественных прав",
      instructions: [
        "Include explicit \"present assignment\" language (\"hereby assigns all right, title, and interest\" vs \"agrees to assign\").",
        "Incorporate comprehensive Work Made for Hire clauses covering worldwide copyrights, patents, trade secrets, and designs.",
        "Secure irrevocable waivers of author moral rights (droit moral) to the maximum extent permitted by applicable law."
],
      ruInstructions: [
        "Используйте формулировки немедленной передачи прав в настоящем времени (\"hereby assigns\", а не \"agrees to assign\").",
        "Включите условия служебного произведения (Work Made for Hire) на все результаты интеллектуальной деятельности.",
        "Зафиксируйте безотзывный отказ от неотчуждаемых авторских прав в рамках применимого права."
],
      semanticType: "process_directive",
      tags: ["legal","intellectual-property","work-made-for-hire","assignment","copyright"],
    }),
  },

  "non-compete-non-solicit-enforceability-audit": {
    id: "non-compete-non-solicit-enforceability-audit",
    name: "NonCompeteNonSolicitEnforceabilityAuditSkill",
    displayName: "Restrictive Covenants Enforceability (Non-Compete & Non-Solicit)",
    categoryId: "legal",
    description: "Audits restrictive covenants against FTC non-compete bans, state blue-pencil doctrines, temporal reasonableness, and geographical scope limits.",
    tags: ["legal","employment","non-compete","non-solicit","covenants"],
    transform: createStandardSkillTransform({
      sectionName: "Restrictive Covenant Enforceability Audit",
      ruSectionName: "Аудит юридической силы соглашений о неконкуренции и непереманивании",
      instructions: [
        "Check jurisdiction-specific enforceability rules (e.g. California strict ban vs Delaware blue-pencil doctrine).",
        "Ensure non-solicitation clauses are strictly tailored to clients/employees with whom the person had direct material contact.",
        "Insert severability and reformation clauses allowing court modification of overbroad terms."
],
      ruInstructions: [
        "Проверьте региональное законодательство (полный запрет non-compete в Калифорнии vs модификация условий судом).",
        "Ограничьте non-solicitation только клиентами и сотрудниками, с которыми был непосредственный контакт.",
        "Включите оговорку о делимости договора для сохранения силы остальных пунктов."
],
      semanticType: 'protocol',
      tags: ["legal","employment","non-compete","non-solicit","covenants"],
    }),
  },

  "safes-convertible-notes-most-favored-nation": {
    id: "safes-convertible-notes-most-favored-nation",
    name: "SafesConvertibleNotesMostFavoredNationSkill",
    displayName: "SAFE & Convertible Note MFN & Pro-Rata Rights",
    categoryId: "legal",
    description: "Evaluates Most Favored Nation (MFN) clauses, pro-rata side letters, valuation caps, and discount rates in startup financing instruments.",
    tags: ["legal","venture-capital","safe","convertible-note","mfn"],
    transform: createStandardSkillTransform({
      sectionName: "Venture Financing Instrument Analysis",
      ruSectionName: "Анализ инвестиционных инструментов SAFE, MFN и прав Pro-Rata",
      instructions: [
        "Verify whether the SAFE is structured as Pre-Money or Post-Money (standard Y Combinator post-money).",
        "Examine MFN clause triggering conditions upon issuance of subsequent convertible notes with superior terms.",
        "Check Pro-Rata side letter agreements to prevent unintended super-dilutive investor rights."
],
      ruInstructions: [
        "Уточните структуру SAFE: pre-money или post-money (стандарт YC post-money).",
        "Проверьте условия срабатывания пункта MFN (режим наибольшего благоприятствования) при следующих раундах.",
        "Оцените соглашения о преимущественном праве выкупа (Pro-Rata) во избежание чрезмерного размытия."
],
      semanticType: 'protocol',
      tags: ["legal","venture-capital","safe","convertible-note","mfn"],
    }),
  },

  "force-majeure-supply-chain-disruption": {
    id: "force-majeure-supply-chain-disruption",
    name: "ForceMajeureSupplyChainDisruptionSkill",
    displayName: "Force Majeure, Frustration of Purpose & Commercial Impracticability",
    categoryId: "legal",
    description: "Interprets force majeure triggering events (epidemics, embargoes, war, grid failure) and procedural notice deadlines under UCC 2-615 and common law.",
    tags: ["legal","contracts","force-majeure","supply-chain","litigation-risk"],
    transform: createStandardSkillTransform({
      sectionName: "Force Majeure & Impracticability Analysis",
      ruSectionName: "Анализ форс-мажора и невозможности исполнения обязательств",
      instructions: [
        "Scrutinize force majeure event enumerations (specifically whether pandemics, cyberattacks, or supply bottlenecks are listed).",
        "Check strict mandatory notice cure periods (e.g. written notice within 5 business days of occurrence).",
        "Verify whether the invoking party is under an express duty to mitigate damages and find alternate sourcing."
],
      ruInstructions: [
        "Изучите перечень форс-мажорных событий (включены ли кибератаки, пандемии, сбои электросетей).",
        "Проверьте соблюдение сроков обязательного письменного уведомления контрагента.",
        "Убедитесь в наличии обязанности стороны минимизировать ущерб и искать альтернативные поставки."
],
      semanticType: 'protocol',
      tags: ["legal","contracts","force-majeure","supply-chain","litigation-risk"],
    }),
  },

  "whistleblower-internal-investigation-protocol": {
    id: "whistleblower-internal-investigation-protocol",
    name: "WhistleblowerInternalInvestigationProtocolSkill",
    displayName: "Whistleblower Complaint & Internal Investigation Protocol",
    categoryId: "legal",
    description: "Establishes privileged internal investigation procedures ensuring attorney-client privilege, Upjohn warnings, and anti-retaliation compliance.",
    tags: ["legal","compliance","investigations","whistleblower","upjohn-warning"],
    transform: createStandardSkillTransform({
      sectionName: "Internal Investigation & Upjohn Protocol",
      ruSectionName: "Протокол внутреннего расследования и предупреждения Апджона (Upjohn)",
      instructions: [
        "Deliver formal Upjohn Warning to interviewees (\"Counsel represents the Company, not you personally; privilege belongs solely to Company\").",
        "Maintain strict attorney-client privilege and work-product doctrine document labeling.",
        "Enforce anti-retaliation safeguards protecting the whistleblower from adverse employment actions."
],
      ruInstructions: [
        "Озвучьте предупреждение Upjohn (\"Юрист представляет компанию, а не вас лично; тайна принадлежит компании\").",
        "Маркируйте все рабочие материалы грифом адвокатской тайны (Attorney-Client Privileged).",
        "Обеспечьте защиту заявителя (whistleblower) от дискриминации и увольнения."
],
      semanticType: "process_directive",
      tags: ["legal","compliance","investigations","whistleblower","upjohn-warning"],
    }),
  },

  "fiduciary-duty-business-judgment-rule": {
    id: "fiduciary-duty-business-judgment-rule",
    name: "FiduciaryDutyBusinessJudgmentRuleSkill",
    displayName: "Board of Directors Fiduciary Duties & Business Judgment Rule",
    categoryId: "legal",
    description: "Evaluates Director Duty of Care, Duty of Loyalty, Duty of Good Faith, and conflicts of interest under Delaware General Corporation Law (DGCL).",
    tags: ["legal","corporate-governance","fiduciary-duty","delaware-law","business-judgment"],
    transform: createStandardSkillTransform({
      sectionName: "Fiduciary Duty & Board Governance Analysis",
      ruSectionName: "Анализ фидуциарных обязанностей директоров и правила делового решения",
      instructions: [
        "Examine Duty of Care: Did the board act on an informed basis with adequate expert diligence?",
        "Examine Duty of Loyalty: Are there interested directors? Was the transaction vetted by an independent special committee?",
        "Verify applicability of the Business Judgment Rule presumption shielding board decisions from judicial second-guessing."
],
      ruInstructions: [
        "Проверьте обязанность осмотрительности (Duty of Care): было ли решение обоснованным и всесторонним?",
        "Проверьте обязанность лояльности (Duty of Loyalty): нет ли конфликта интересов у членов совета директоров?",
        "Оцените защиту решения презумпцией правила делового суждения (Business Judgment Rule)."
],
      semanticType: 'protocol',
      tags: ["legal","corporate-governance","fiduciary-duty","delaware-law","business-judgment"],
    }),
  },

  "source-code-escrow-agreement-triggers": {
    id: "source-code-escrow-agreement-triggers",
    name: "SourceCodeEscrowAgreementTriggersSkill",
    displayName: "Software Source Code Escrow & Release Triggers",
    categoryId: "legal",
    description: "Structures software escrow agreements defining verified deposit materials, testing schedules, and strict release trigger events.",
    tags: ["legal","software-escrow","ip-licensing","b2b-contracts","source-code"],
    transform: createStandardSkillTransform({
      sectionName: "Source Code Escrow Architecture",
      ruSectionName: "Архитектура депонирования исходного кода (Escrow) и триггеры раскрытия",
      instructions: [
        "Specify exact deposit materials: full source code, compiler versions, build scripts, third-party libraries, and documentation.",
        "Define objective Release Conditions (bankruptcy, insolvency, dissolution, uncured material breach of maintenance SLA).",
        "Limit licensee rights upon release strictly to internal maintenance and support without redistribution rights."
],
      ruInstructions: [
        "Определите состав депонируемого пакета: исходный код, скрипты сборки, компиляторы, документация.",
        "Задайте объективные триггеры раскрытия (банкротство, ликвидация, отказ вендора от поддержки SLA).",
        "Ограничьте права лицензиата после раскрытия только поддержкой и исправлением багов без перепродажи."
],
      semanticType: "process_directive",
      tags: ["legal","software-escrow","ip-licensing","b2b-contracts","source-code"],
    }),
  },

  "open-source-gpl-copyleft-license-audit": {
    id: "open-source-gpl-copyleft-license-audit",
    name: "OpenSourceGplCopyleftLicenseAuditSkill",
    displayName: "Open Source License Compliance (GPL / AGPL Copyleft Audit)",
    categoryId: "legal",
    description: "Audits software dependencies to eliminate viral copyleft contamination (GPLv3, AGPLv3) of proprietary commercial codebases.",
    tags: ["legal","open-source","gpl","agpl","copyleft","license-compliance"],
    transform: createStandardSkillTransform({
      sectionName: "Open Source License Compliance Audit",
      ruSectionName: "Аудит лицензионной чистоты Open Source (GPL / AGPL Copyleft)",
      instructions: [
        "Categorize all dependencies: Permissive (MIT, Apache 2.0, BSD), Weak Copyleft (LGPL, MPL), Strong Copyleft (GPLv2/v3), Network Copyleft (AGPLv3).",
        "Identify static vs dynamic linking risks that could force disclosure of proprietary application source code.",
        "Recommend dual-licensing or alternative permissive library replacements."
],
      ruInstructions: [
        "Классифицируйте зависимости: разрешительные (MIT/Apache), слабый copyleft (LGPL), вирусный (GPL) и сетевой (AGPL).",
        "Оцените риски динамической и статической линковки для коммерческого кода.",
        "Предложите замену вирусных библиотек на разрешительные аналоги или коммерческие лицензии."
],
      semanticType: 'protocol',
      tags: ["legal","open-source","gpl","agpl","copyleft","license-compliance"],
    }),
  },

  "trademark-clearance-and-knockout-search": {
    id: "trademark-clearance-and-knockout-search",
    name: "TrademarkClearanceAndKnockoutSearchSkill",
    displayName: "Trademark Clearance & Knockout Likelihood of Confusion",
    categoryId: "legal",
    description: "Assesses proposed brand and product names across USPTO/EUIPO databases for phonetic similarity, commercial impression, and related goods overlap.",
    tags: ["legal","trademark","intellectual-property","clearance-search","brand-protection"],
    transform: createStandardSkillTransform({
      sectionName: "Trademark Clearance & Risk Assessment",
      ruSectionName: "Проверка товарных знаков и оценка риска смешения (Likelihood of Confusion)",
      instructions: [
        "Analyze the DuPont factors: similarity of marks in sound, appearance, and meaning.",
        "Evaluate relatedness of goods/services across Nice Classifications.",
        "Score trademark distinctiveness (Fanciful/Arbitrary = Strongest, Suggestive = Defensible, Descriptive = Weak/Refusal risk)."
],
      ruInstructions: [
        "Проверьте фонетическое, смысловое и визуальное сходство знаков (критерии DuPont).",
        "Сопоставьте пересечения классов товаров и услуг по МКТУ.",
        "Оцените различительную способность обозначения (фантазийное, ассоциативное или описательное)."
],
      semanticType: 'protocol',
      tags: ["legal","trademark","intellectual-property","clearance-search","brand-protection"],
    }),
  },

  "anti-bribery-fcpa-anti-corruption-audit": {
    id: "anti-bribery-fcpa-anti-corruption-audit",
    name: "AntiBriberyFcpaAntiCorruptionAuditSkill",
    displayName: "FCPA & UK Bribery Act Anti-Corruption Compliance",
    categoryId: "legal",
    description: "Screens international business dealings, third-party intermediaries, and gifts/hospitality against Foreign Corrupt Practices Act prohibitions.",
    tags: ["legal","fcpa","anti-corruption","bribery","compliance"],
    transform: createStandardSkillTransform({
      sectionName: "FCPA & Anti-Corruption Audit Protocol",
      ruSectionName: "Аудит антикоррупционного комплаенса (FCPA и UK Bribery Act)",
      instructions: [
        "Screen transactions involving foreign officials, state-owned enterprises, or government tenders.",
        "Audit third-party sales agents, customs brokers, and consultants for red flags (unusual commissions, offshore accounts).",
        "Enforce strict hospitality, travel expense, and political contribution approval thresholds."
],
      ruInstructions: [
        "Проверьте сделки с участием госслужащих, госкомпаний и участие в госзакупках.",
        "Проведите аудит агентов и брокеров на предмет подозрительных комиссий и офшорных счетов.",
        "Установите жесткие лимиты на подарки, представительские расходы и благотворительность."
],
      semanticType: "process_directive",
      tags: ["legal","fcpa","anti-corruption","bribery","compliance"],
    }),
  },

  "terms-of-service-class-action-waiver-arbitration": {
    id: "terms-of-service-class-action-waiver-arbitration",
    name: "TermsOfServiceClassActionWaiverArbitrationSkill",
    displayName: "Terms of Service Mandatory Arbitration & Class Action Waiver",
    categoryId: "legal",
    description: "Drafts enforceable consumer ToS dispute clauses including informal negotiation periods, AAA/JAMS arbitration, and class action waivers.",
    tags: ["legal","terms-of-service","arbitration","class-action-waiver","consumer-law"],
    transform: createStandardSkillTransform({
      sectionName: "Arbitration & Class Action Waiver Architecture",
      ruSectionName: "Арбитражная оговорка ToS и отказ от коллективных исков",
      instructions: [
        "Incorporate a mandatory 30-day informal dispute resolution notice window.",
        "Draft express, conspicuous class action and representative action waivers.",
        "Provide a 30-day opt-out mechanism to enhance judicial enforceability against unconscionability challenges."
],
      ruInstructions: [
        "Включите обязательный 30-дневный этап досудебного урегулирования споров.",
        "Сформулируйте явный и заметный отказ от коллективных и представительских исков.",
        "Предусмотрите право пользователя отказаться от арбитража в течение 30 дней для устойчивости в суде."
],
      semanticType: "process_directive",
      tags: ["legal","terms-of-service","arbitration","class-action-waiver","consumer-law"],
    }),
  },

  "ai-governance-eu-ai-act-risk-classification": {
    id: "ai-governance-eu-ai-act-risk-classification",
    name: "AiGovernanceEuAiActRiskClassificationSkill",
    displayName: "EU AI Act Risk Classification & Compliance Mandates",
    categoryId: "legal",
    description: "Classifies AI systems into Prohibited, High-Risk, Limited, or Minimal risk tiers under the EU AI Act and outlines compliance obligations.",
    tags: ["legal","ai-act","ai-governance","compliance","high-risk-ai"],
    transform: createStandardSkillTransform({
      sectionName: "EU AI Act Risk Classification Matrix",
      ruSectionName: "Классификация систем ИИ по регламенту EU AI Act",
      instructions: [
        "Check for Prohibited AI practices (subliminal manipulation, social scoring, real-time remote biometric ID in public spaces).",
        "Audit against Annex III High-Risk domains (critical infrastructure, employment recruiting, credit scoring, law enforcement).",
        "Specify conformity assessment, risk management system, data governance, and human oversight (Article 14) requirements."
],
      ruInstructions: [
        "Проверьте наличие запрещенных практик (манипуляция сознанием, социальный скоринг, биометрия).",
        "Оцените систему на соответствие категории высокого риска по Приложению III (найм, кредиты, инфраструктура).",
        "Сформулируйте требования к оценке соответствия, управлению рисками и контролю со стороны человека (ст. 14)."
],
      semanticType: 'protocol',
      tags: ["legal","ai-act","ai-governance","compliance","high-risk-ai"],
    }),
  },

  "severance-agreement-adea-older-workers-benefit": {
    id: "severance-agreement-adea-older-workers-benefit",
    name: "SeveranceAgreementAdeaOlderWorkersBenefitSkill",
    displayName: "Severance Agreements & OWBPA / ADEA Compliance",
    categoryId: "legal",
    description: "Drafts employment separation agreements complying with the Older Workers Benefit Protection Act (21/45-day review and 7-day revocation periods).",
    tags: ["legal","employment","severance","owbpa","adea","release-of-claims"],
    transform: createStandardSkillTransform({
      sectionName: "Severance & OWBPA Compliance Protocol",
      ruSectionName: "Соглашения о расторжении трудового договора и соблюдение OWBPA/ADEA",
      instructions: [
        "Provide mandatory 21-day consideration period for individual terminations (45 days for group/reduction-in-force exits).",
        "Include statutory 7-day post-signing revocation period that cannot be waived.",
        "Attach Exhibit listing job titles and ages of selected vs unselected individuals in group layoff programs."
],
      ruInstructions: [
        "Предоставьте обязательный 21 день на рассмотрение для индивидуальных увольнений (45 дней для сокращения штата).",
        "Включите 7-дневный период безоговорочного отзыва соглашения после подписания.",
        "Приложите таблицу должностей и возрастов сокращаемых и остающихся сотрудников при групповом увольнении."
],
      semanticType: "process_directive",
      tags: ["legal","employment","severance","owbpa","adea","release-of-claims"],
    }),
  },

  "venture-capital-term-sheet-protective-provisions": {
    id: "venture-capital-term-sheet-protective-provisions",
    name: "VentureCapitalTermSheetProtectiveProvisionsSkill",
    displayName: "VC Series A Term Sheet Protective Provisions & Governance",
    categoryId: "legal",
    description: "Reviews Series A investor term sheets for board composition, voting thresholds, drag-along rights, and negative covenants.",
    tags: ["legal","venture-capital","term-sheet","protective-provisions","series-a"],
    transform: createStandardSkillTransform({
      sectionName: "VC Term Sheet Governance & Protective Clauses",
      ruSectionName: "Защитные положения и корпоративный контроль в Term Sheet Series A",
      instructions: [
        "Audit investor veto rights (protective provisions) over budget, debt issuance, executive hires, and M&A.",
        "Structure Drag-Along rights with fair founder and common majority vote protections.",
        "Balance Board of Directors composition (Founders, Investor Nominees, Independent Industry Expert)."
],
      ruInstructions: [
        "Проверьте перечень вето инвесторов (изменение устава, займы, найм топ-менеджмента, M&A).",
        "Сбалансируйте условия принудительной продажи (Drag-Along) защитой интересов основателей.",
        "Сформируйте сбалансированный состав совета директоров (основатели, инвесторы, независимый эксперт)."
],
      semanticType: 'protocol',
      tags: ["legal","venture-capital","term-sheet","protective-provisions","series-a"],
    }),
  },

  "commercial-lease-triple-net-nnn-audit": {
    id: "commercial-lease-triple-net-nnn-audit",
    name: "CommercialLeaseTripleNetNnnAuditSkill",
    displayName: "Commercial Real Estate Triple Net (NNN) Lease Audit",
    categoryId: "legal",
    description: "Scrutinizes NNN commercial lease agreements for Common Area Maintenance (CAM) capital expenditure exclusions, audit rights, and assignment terms.",
    tags: ["legal","real-estate","commercial-lease","nnn","cam-charges"],
    transform: createStandardSkillTransform({
      sectionName: "Commercial NNN Lease Analysis",
      ruSectionName: "Аудит коммерческой аренды Triple Net (NNN) и расходов CAM",
      instructions: [
        "Carve out structural capital replacements (roof, HVAC major overhauls) from annual CAM operating expenses.",
        "Secure explicit tenant CAM audit rights and financial penalty remedies for landlord overcharges.",
        "Ensure flexible subleasing and assignment rights upon corporate reorganization or subsidiary mergers."
],
      ruInstructions: [
        "Исключите капитальный ремонт здания (крыша, несущие конструкции) из операционных расходов CAM.",
        "Закрепите право арендатора на ежегодный независимый аудит начислений арендодателя.",
        "Обеспечьте право субаренды и переуступки договора при слияниях и реорганизации компании."
],
      semanticType: 'protocol',
      tags: ["legal","real-estate","commercial-lease","nnn","cam-charges"],
    }),
  },

  "software-sla-remedies-credit-calculator": {
    id: "software-sla-remedies-credit-calculator",
    name: "SoftwareSlaRemediesCreditCalculatorSkill",
    displayName: "Enterprise Software SLA Credits & Performance Penalties",
    categoryId: "legal",
    description: "Defines Service Level Agreements across 99.9%, 99.95%, and 99.99% availability tiers with graduated service credits and termination rights.",
    tags: ["legal","sla","uptime","service-credits","contracts"],
    transform: createStandardSkillTransform({
      sectionName: "Enterprise SLA & Service Credit Framework",
      ruSectionName: "Соглашение об уровне сервиса (SLA) и расчет сервисных компенсаций",
      instructions: [
        "Define uptime formula excluding scheduled maintenance windows and force majeure.",
        "Structure graduated fee credits (e.g. 10% credit for <99.9%, 25% for <99.5%, 50% for <99.0%).",
        "Provide chronic failure termination exit clauses allowing contract cancellation without penalty if SLA is breached 3 months consecutively."
],
      ruInstructions: [
        "Сформулируйте расчет доступности с исключением плановых техработ и форс-мажора.",
        "Задайте прогрессивную шкалу скидок и компенсаций при падении аптайма.",
        "Предусмотрите право досрочного расторжения без штрафов при систематических сбоях (3 месяца подряд)."
],
      semanticType: "process_directive",
      tags: ["legal","sla","uptime","service-credits","contracts"],
    }),
  },

  "trade-secret-defend-trade-secrets-act-dtsa": {
    id: "trade-secret-defend-trade-secrets-act-dtsa",
    name: "TradeSecretDefendTradeSecretsActDtsaSkill",
    displayName: "Trade Secret Protection & DTSA Immunity Notice",
    categoryId: "legal",
    description: "Embeds Defend Trade Secrets Act (DTSA) statutory immunity notices into confidentiality agreements to preserve exemplary damages and attorney fees.",
    tags: ["legal","trade-secrets","dtsa","confidentiality","nda"],
    transform: createStandardSkillTransform({
      sectionName: "Trade Secret Protection & DTSA Protocol",
      ruSectionName: "Защита коммерческой тайны и обязательное уведомление по DTSA",
      instructions: [
        "Verify reasonable measures standard (role-based encryption, access logs, physical barriers).",
        "Mandate the inclusion of statutory 18 U.S.C. § 1833(b) whistleblower immunity notice in all employee and contractor NDAs.",
        "Document immediate ex parte seizure prerequisites in trade secret misappropriation claims."
],
      ruInstructions: [
        "Проверьте соблюдение стандарта разумных мер защиты (шифрование, журнал доступа, NDA).",
        "Включите обязательное уведомление об иммунитете осведомителей по закону DTSA в соглашения о конфиденциальности.",
        "Опишите основания для срочного судебного ареста похищенных данных при нарушении тайны."
],
      semanticType: "process_directive",
      tags: ["legal","trade-secrets","dtsa","confidentiality","nda"],
    }),
  },

  "securities-reg-d-accredited-investor-verification": {
    id: "securities-reg-d-accredited-investor-verification",
    name: "SecuritiesRegDAccreditedInvestorVerificationSkill",
    displayName: "Regulation D Rule 506(c) Accredited Investor Verification",
    categoryId: "legal",
    description: "Audits private securities offering compliance under Reg D 506(c) general solicitation and third-party accredited investor verification.",
    tags: ["legal","securities","reg-d","accredited-investor","private-placements"],
    transform: createStandardSkillTransform({
      sectionName: "Reg D 506(c) Investor Verification Protocol",
      ruSectionName: "Верификация аккредитованных инвесторов по правилу Reg D 506(c)",
      instructions: [
        "Review reasonable verification steps: tax returns, W-2s, bank statements, CPA or attorney verification letters within 90 days.",
        "Ensure Form D electronic filing compliance within 15 calendar days after first sale.",
        "Confirm bad actor disqualification checks under Rule 506(d)."
],
      ruInstructions: [
        "Проверьте подтверждение статуса инвестора (справки 2-НДФЛ, выписки, письма аудиторов не старше 90 дней).",
        "Обеспечьте подачу формы Form D в SEC в течение 15 дней с момента первой продажи долей.",
        "Проведите проверку на отсутствие дисквалифицирующих нарушений (Bad Actor Checks)."
],
      semanticType: "process_directive",
      tags: ["legal","securities","reg-d","accredited-investor","private-placements"],
    }),
  },
  "legal-irac-legal-reasoning-issue-rule-analysis-conclusion": {
    id: "legal-irac-legal-reasoning-issue-rule-analysis-conclusion",
    name: "IRACLegalReasoningIssueRuleAnalysisConclusionSkill",
    displayName: "IRAC Legal Reasoning (Issue Rule Analysis Conclusion)",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for IRAC Legal Reasoning (Issue Rule Analysis Conclusion).",
    tags: ["legal","irac","legal","reasoning"],
    transform: createStandardSkillTransform({
      sectionName: "IRAC Legal Analysis Standards",
      ruSectionName: "Стандарты и практические требования: IRAC Legal Reasoning (Issue Rule Analysis Conclusion)",
      instructions: [
        "Apply core domain tenets and industry best practices for IRAC Legal Reasoning (Issue Rule Analysis Conclusion).",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для IRAC Legal Reasoning (Issue Rule Analysis Conclusion).",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","irac","legal","reasoning"],
    }),
  },

  "legal-mutual-non-disclosure-agreement-nda-drafting": {
    id: "legal-mutual-non-disclosure-agreement-nda-drafting",
    name: "MutualNonDisclosureAgreementNDADraftingSkill",
    displayName: "Mutual Non-Disclosure Agreement (NDA) Drafting",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Mutual Non-Disclosure Agreement (NDA) Drafting.",
    tags: ["legal","mutual","non","disclosure"],
    transform: createStandardSkillTransform({
      sectionName: "Mutual NDA Drafting Protocols",
      ruSectionName: "Стандарты и практические требования: Mutual Non-Disclosure Agreement (NDA) Drafting",
      instructions: [
        "Apply core domain tenets and industry best practices for Mutual Non-Disclosure Agreement (NDA) Drafting.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Mutual Non-Disclosure Agreement (NDA) Drafting.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","mutual","non","disclosure"],
    }),
  },

  "legal-software-license-agreement-sla-eula-provisions": {
    id: "legal-software-license-agreement-sla-eula-provisions",
    name: "SoftwareLicenseAgreementSLAEULAProvisionsSkill",
    displayName: "Software License Agreement (SLA/EULA) Provisions",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Software License Agreement (SLA/EULA) Provisions.",
    tags: ["legal","software","license","agreement"],
    transform: createStandardSkillTransform({
      sectionName: "Software License Agreement Standards",
      ruSectionName: "Стандарты и практические требования: Software License Agreement (SLA/EULA) Provisions",
      instructions: [
        "Apply core domain tenets and industry best practices for Software License Agreement (SLA/EULA) Provisions.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Software License Agreement (SLA/EULA) Provisions.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","software","license","agreement"],
    }),
  },

  "legal-gdpr-data-protection-impact-assessment-dpia": {
    id: "legal-gdpr-data-protection-impact-assessment-dpia",
    name: "GDPRDataProtectionImpactAssessmentDPIASkill",
    displayName: "GDPR Data Protection Impact Assessment (DPIA)",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for GDPR Data Protection Impact Assessment (DPIA).",
    tags: ["legal","gdpr","data","protection"],
    transform: createStandardSkillTransform({
      sectionName: "GDPR DPIA Assessment Protocol",
      ruSectionName: "Стандарты и практические требования: GDPR Data Protection Impact Assessment (DPIA)",
      instructions: [
        "Apply core domain tenets and industry best practices for GDPR Data Protection Impact Assessment (DPIA).",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для GDPR Data Protection Impact Assessment (DPIA).",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","gdpr","data","protection"],
    }),
  },

  "legal-intellectual-property-assignment-work-for-hire": {
    id: "legal-intellectual-property-assignment-work-for-hire",
    name: "IntellectualPropertyAssignmentWorkforHireSkill",
    displayName: "Intellectual Property Assignment & Work-for-Hire",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Intellectual Property Assignment & Work-for-Hire.",
    tags: ["legal","intellectual","property","assignment"],
    transform: createStandardSkillTransform({
      sectionName: "IP Assignment Work-for-Hire Rules",
      ruSectionName: "Стандарты и практические требования: Intellectual Property Assignment & Work-for-Hire",
      instructions: [
        "Apply core domain tenets and industry best practices for Intellectual Property Assignment & Work-for-Hire.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Intellectual Property Assignment & Work-for-Hire.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","intellectual","property","assignment"],
    }),
  },

  "legal-indemnification-limitation-of-liability-clauses": {
    id: "legal-indemnification-limitation-of-liability-clauses",
    name: "IndemnificationLimitationofLiabilityClausesSkill",
    displayName: "Indemnification & Limitation of Liability Clauses",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Indemnification & Limitation of Liability Clauses.",
    tags: ["legal","indemnification","limitation","of"],
    transform: createStandardSkillTransform({
      sectionName: "Indemnity & Liability Drafting Guidelines",
      ruSectionName: "Стандарты и практические требования: Indemnification & Limitation of Liability Clauses",
      instructions: [
        "Apply core domain tenets and industry best practices for Indemnification & Limitation of Liability Clauses.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Indemnification & Limitation of Liability Clauses.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","indemnification","limitation","of"],
    }),
  },

  "legal-employment-non-compete-severance-agreement": {
    id: "legal-employment-non-compete-severance-agreement",
    name: "EmploymentNonCompeteSeveranceAgreementSkill",
    displayName: "Employment Non-Compete & Severance Agreement",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Employment Non-Compete & Severance Agreement.",
    tags: ["legal","employment","non","compete"],
    transform: createStandardSkillTransform({
      sectionName: "Employment Agreement Standards",
      ruSectionName: "Стандарты и практические требования: Employment Non-Compete & Severance Agreement",
      instructions: [
        "Apply core domain tenets and industry best practices for Employment Non-Compete & Severance Agreement.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Employment Non-Compete & Severance Agreement.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","employment","non","compete"],
    }),
  },

  "legal-convertible-note-safe-financing-instrument": {
    id: "legal-convertible-note-safe-financing-instrument",
    name: "ConvertibleNoteSAFEFinancingInstrumentSkill",
    displayName: "Convertible Note & SAFE Financing Instrument",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Convertible Note & SAFE Financing Instrument.",
    tags: ["legal","convertible","note","safe"],
    transform: createStandardSkillTransform({
      sectionName: "SAFE Financing Term Protocols",
      ruSectionName: "Стандарты и практические требования: Convertible Note & SAFE Financing Instrument",
      instructions: [
        "Apply core domain tenets and industry best practices for Convertible Note & SAFE Financing Instrument.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Convertible Note & SAFE Financing Instrument.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","convertible","note","safe"],
    }),
  },

  "legal-antitrust-hart-scott-rodino-merger-clearance": {
    id: "legal-antitrust-hart-scott-rodino-merger-clearance",
    name: "AntitrustHartScottRodinoMergerClearanceSkill",
    displayName: "Antitrust & Hart-Scott-Rodino Merger Clearance",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Antitrust & Hart-Scott-Rodino Merger Clearance.",
    tags: ["legal","antitrust","hart","scott"],
    transform: createStandardSkillTransform({
      sectionName: "Antitrust Clearance Analysis",
      ruSectionName: "Стандарты и практические требования: Antitrust & Hart-Scott-Rodino Merger Clearance",
      instructions: [
        "Apply core domain tenets and industry best practices for Antitrust & Hart-Scott-Rodino Merger Clearance.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Antitrust & Hart-Scott-Rodino Merger Clearance.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","antitrust","hart","scott"],
    }),
  },

  "legal-cross-border-data-transfer-standard-contractual-clauses": {
    id: "legal-cross-border-data-transfer-standard-contractual-clauses",
    name: "CrossBorderDataTransferStandardContractualClausesSkill",
    displayName: "Cross-Border Data Transfer Standard Contractual Clauses",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Cross-Border Data Transfer Standard Contractual Clauses.",
    tags: ["legal","cross","border","data"],
    transform: createStandardSkillTransform({
      sectionName: "SCC Cross-Border Data Standards",
      ruSectionName: "Стандарты и практические требования: Cross-Border Data Transfer Standard Contractual Clauses",
      instructions: [
        "Apply core domain tenets and industry best practices for Cross-Border Data Transfer Standard Contractual Clauses.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Cross-Border Data Transfer Standard Contractual Clauses.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","cross","border","data"],
    }),
  },

  "legal-commercial-real-estate-triple-net-nnn-lease": {
    id: "legal-commercial-real-estate-triple-net-nnn-lease",
    name: "CommercialRealEstateTripleNetNNNLeaseSkill",
    displayName: "Commercial Real Estate Triple Net (NNN) Lease",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Commercial Real Estate Triple Net (NNN) Lease.",
    tags: ["legal","commercial","real","estate"],
    transform: createStandardSkillTransform({
      sectionName: "Triple Net Commercial Lease Rules",
      ruSectionName: "Стандарты и практические требования: Commercial Real Estate Triple Net (NNN) Lease",
      instructions: [
        "Apply core domain tenets and industry best practices for Commercial Real Estate Triple Net (NNN) Lease.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Commercial Real Estate Triple Net (NNN) Lease.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","commercial","real","estate"],
    }),
  },

  "legal-hipaa-business-associate-agreement-baa": {
    id: "legal-hipaa-business-associate-agreement-baa",
    name: "HIPAABusinessAssociateAgreementBAASkill",
    displayName: "HIPAA Business Associate Agreement (BAA)",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for HIPAA Business Associate Agreement (BAA).",
    tags: ["legal","hipaa","business","associate"],
    transform: createStandardSkillTransform({
      sectionName: "HIPAA BAA Agreement Standards",
      ruSectionName: "Стандарты и практические требования: HIPAA Business Associate Agreement (BAA)",
      instructions: [
        "Apply core domain tenets and industry best practices for HIPAA Business Associate Agreement (BAA).",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для HIPAA Business Associate Agreement (BAA).",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","hipaa","business","associate"],
    }),
  },

  "legal-whistleblower-protection-internal-compliance-policy": {
    id: "legal-whistleblower-protection-internal-compliance-policy",
    name: "WhistleblowerProtectionInternalCompliancePolicySkill",
    displayName: "Whistleblower Protection & Internal Compliance Policy",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Whistleblower Protection & Internal Compliance Policy.",
    tags: ["legal","whistleblower","protection","internal"],
    transform: createStandardSkillTransform({
      sectionName: "Whistleblower Compliance Standards",
      ruSectionName: "Стандарты и практические требования: Whistleblower Protection & Internal Compliance Policy",
      instructions: [
        "Apply core domain tenets and industry best practices for Whistleblower Protection & Internal Compliance Policy.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Whistleblower Protection & Internal Compliance Policy.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","whistleblower","protection","internal"],
    }),
  },

  "legal-patent-non-infringement-freedom-to-operate-fto": {
    id: "legal-patent-non-infringement-freedom-to-operate-fto",
    name: "PatentNonInfringementFreedomtoOperateFTOSkill",
    displayName: "Patent Non-Infringement & Freedom-to-Operate (FTO)",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Patent Non-Infringement & Freedom-to-Operate (FTO).",
    tags: ["legal","patent","non","infringement"],
    transform: createStandardSkillTransform({
      sectionName: "Patent FTO Analysis Protocol",
      ruSectionName: "Стандарты и практические требования: Patent Non-Infringement & Freedom-to-Operate (FTO)",
      instructions: [
        "Apply core domain tenets and industry best practices for Patent Non-Infringement & Freedom-to-Operate (FTO).",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Patent Non-Infringement & Freedom-to-Operate (FTO).",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","patent","non","infringement"],
    }),
  },

  "legal-trademark-opposition-ttab-proceedings": {
    id: "legal-trademark-opposition-ttab-proceedings",
    name: "TrademarkOppositionTTABProceedingsSkill",
    displayName: "Trademark Opposition & TTAB Proceedings",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Trademark Opposition & TTAB Proceedings.",
    tags: ["legal","trademark","opposition","ttab"],
    transform: createStandardSkillTransform({
      sectionName: "Trademark Opposition Standards",
      ruSectionName: "Стандарты и практические требования: Trademark Opposition & TTAB Proceedings",
      instructions: [
        "Apply core domain tenets and industry best practices for Trademark Opposition & TTAB Proceedings.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Trademark Opposition & TTAB Proceedings.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","trademark","opposition","ttab"],
    }),
  },

  "legal-corporate-governance-board-resolutions-minutes": {
    id: "legal-corporate-governance-board-resolutions-minutes",
    name: "CorporateGovernanceBoardResolutionsMinutesSkill",
    displayName: "Corporate Governance Board Resolutions & Minutes",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Corporate Governance Board Resolutions & Minutes.",
    tags: ["legal","corporate","governance","board"],
    transform: createStandardSkillTransform({
      sectionName: "Board Resolution Governance Blueprint",
      ruSectionName: "Стандарты и практические требования: Corporate Governance Board Resolutions & Minutes",
      instructions: [
        "Apply core domain tenets and industry best practices for Corporate Governance Board Resolutions & Minutes.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Corporate Governance Board Resolutions & Minutes.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","corporate","governance","board"],
    }),
  },

  "legal-force-majeure-frustration-of-purpose-defense": {
    id: "legal-force-majeure-frustration-of-purpose-defense",
    name: "ForceMajeureFrustrationofPurposeDefenseSkill",
    displayName: "Force Majeure & Frustration of Purpose Defense",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Force Majeure & Frustration of Purpose Defense.",
    tags: ["legal","force","majeure","frustration"],
    transform: createStandardSkillTransform({
      sectionName: "Force Majeure Commercial Rules",
      ruSectionName: "Стандарты и практические требования: Force Majeure & Frustration of Purpose Defense",
      instructions: [
        "Apply core domain tenets and industry best practices for Force Majeure & Frustration of Purpose Defense.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Force Majeure & Frustration of Purpose Defense.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","force","majeure","frustration"],
    }),
  },

  "legal-securities-regulation-d-private-placement-exemption": {
    id: "legal-securities-regulation-d-private-placement-exemption",
    name: "SecuritiesRegulationDPrivatePlacementExemptionSkill",
    displayName: "Securities Regulation D Private Placement Exemption",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Securities Regulation D Private Placement Exemption.",
    tags: ["legal","securities","regulation","d"],
    transform: createStandardSkillTransform({
      sectionName: "Regulation D Exemption Standards",
      ruSectionName: "Стандарты и практические требования: Securities Regulation D Private Placement Exemption",
      instructions: [
        "Apply core domain tenets and industry best practices for Securities Regulation D Private Placement Exemption.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Securities Regulation D Private Placement Exemption.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","securities","regulation","d"],
    }),
  },

  "legal-consumer-arbitration-class-action-waiver-clause": {
    id: "legal-consumer-arbitration-class-action-waiver-clause",
    name: "ConsumerArbitrationClassActionWaiverClauseSkill",
    displayName: "Consumer Arbitration & Class Action Waiver Clause",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Consumer Arbitration & Class Action Waiver Clause.",
    tags: ["legal","consumer","arbitration","class"],
    transform: createStandardSkillTransform({
      sectionName: "Arbitration Waiver Drafting Standards",
      ruSectionName: "Стандарты и практические требования: Consumer Arbitration & Class Action Waiver Clause",
      instructions: [
        "Apply core domain tenets and industry best practices for Consumer Arbitration & Class Action Waiver Clause.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Consumer Arbitration & Class Action Waiver Clause.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","consumer","arbitration","class"],
    }),
  },

  "legal-vendor-master-services-agreement-msa-playbook": {
    id: "legal-vendor-master-services-agreement-msa-playbook",
    name: "VendorMasterServicesAgreementMSAPlaybookSkill",
    displayName: "Vendor Master Services Agreement (MSA) Playbook",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Vendor Master Services Agreement (MSA) Playbook.",
    tags: ["legal","vendor","master","services"],
    transform: createStandardSkillTransform({
      sectionName: "Master Services Agreement Protocol",
      ruSectionName: "Стандарты и практические требования: Vendor Master Services Agreement (MSA) Playbook",
      instructions: [
        "Apply core domain tenets and industry best practices for Vendor Master Services Agreement (MSA) Playbook.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Vendor Master Services Agreement (MSA) Playbook.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","vendor","master","services"],
    }),
  },

  "legal-export-control-ear-itar-regulatory-compliance": {
    id: "legal-export-control-ear-itar-regulatory-compliance",
    name: "ExportControlEARITARRegulatoryComplianceSkill",
    displayName: "Export Control EAR / ITAR Regulatory Compliance",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Export Control EAR / ITAR Regulatory Compliance.",
    tags: ["legal","export","control","ear"],
    transform: createStandardSkillTransform({
      sectionName: "Export Control Compliance Protocol",
      ruSectionName: "Стандарты и практические требования: Export Control EAR / ITAR Regulatory Compliance",
      instructions: [
        "Apply core domain tenets and industry best practices for Export Control EAR / ITAR Regulatory Compliance.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Export Control EAR / ITAR Regulatory Compliance.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","export","control","ear"],
    }),
  },

  "legal-california-privacy-rights-act-cpra-opt-out-audit": {
    id: "legal-california-privacy-rights-act-cpra-opt-out-audit",
    name: "CaliforniaPrivacyRightsActCPRAOptOutAuditSkill",
    displayName: "California Privacy Rights Act (CPRA) Opt-Out Audit",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for California Privacy Rights Act (CPRA) Opt-Out Audit.",
    tags: ["legal","california","privacy","rights"],
    transform: createStandardSkillTransform({
      sectionName: "CPRA Privacy Compliance Standards",
      ruSectionName: "Стандарты и практические требования: California Privacy Rights Act (CPRA) Opt-Out Audit",
      instructions: [
        "Apply core domain tenets and industry best practices for California Privacy Rights Act (CPRA) Opt-Out Audit.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для California Privacy Rights Act (CPRA) Opt-Out Audit.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","california","privacy","rights"],
    }),
  },

  "legal-asset-purchase-agreement-apa-representation-warranties": {
    id: "legal-asset-purchase-agreement-apa-representation-warranties",
    name: "AssetPurchaseAgreementAPARepresentationWarrantiesSkill",
    displayName: "Asset Purchase Agreement (APA) Representation & Warranties",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Asset Purchase Agreement (APA) Representation & Warranties.",
    tags: ["legal","asset","purchase","agreement"],
    transform: createStandardSkillTransform({
      sectionName: "Asset Purchase Agreement Protocol",
      ruSectionName: "Стандарты и практические требования: Asset Purchase Agreement (APA) Representation & Warranties",
      instructions: [
        "Apply core domain tenets and industry best practices for Asset Purchase Agreement (APA) Representation & Warranties.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Asset Purchase Agreement (APA) Representation & Warranties.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","asset","purchase","agreement"],
    }),
  },

  "legal-open-source-software-copyleft-gpl-audit": {
    id: "legal-open-source-software-copyleft-gpl-audit",
    name: "OpenSourceSoftwareCopyleftGPLAuditSkill",
    displayName: "Open-Source Software Copyleft (GPL) Audit",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Open-Source Software Copyleft (GPL) Audit.",
    tags: ["legal","open","source","software"],
    transform: createStandardSkillTransform({
      sectionName: "GPL Copyleft Audit Standards",
      ruSectionName: "Стандарты и практические требования: Open-Source Software Copyleft (GPL) Audit",
      instructions: [
        "Apply core domain tenets and industry best practices for Open-Source Software Copyleft (GPL) Audit.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Open-Source Software Copyleft (GPL) Audit.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","open","source","software"],
    }),
  },

  "legal-civil-litigation-deposition-preparation-outline": {
    id: "legal-civil-litigation-deposition-preparation-outline",
    name: "CivilLitigationDepositionPreparationOutlineSkill",
    displayName: "Civil Litigation Deposition Preparation Outline",
    categoryId: "legal",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Civil Litigation Deposition Preparation Outline.",
    tags: ["legal","civil","litigation","deposition"],
    transform: createStandardSkillTransform({
      sectionName: "Deposition Outline Preparation Protocol",
      ruSectionName: "Стандарты и практические требования: Civil Litigation Deposition Preparation Outline",
      instructions: [
        "Apply core domain tenets and industry best practices for Civil Litigation Deposition Preparation Outline.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Civil Litigation Deposition Preparation Outline.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["legal","civil","litigation","deposition"],
    }),
  },
  "legal-international-commercial-arbitration-icc-rules": {
    id: "legal-international-commercial-arbitration-icc-rules",
    name: "InternationalCommercialArbitrationICCRulesSkill",
    displayName: "International Commercial Arbitration ICC Rules",
    categoryId: "legal",
    description: "Drafts arbitration clauses under International Chamber of Commerce rules.",
    tags: ["legal","legal","international","commercial"],
    transform: createStandardSkillTransform({
      sectionName: "International Commercial Arbitration ICC Rules Standards",
      ruSectionName: "Стандарты и регламенты: International Commercial Arbitration ICC Rules",
      instructions: [
        "Apply core domain tenets for International Commercial Arbitration ICC Rules.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для International Commercial Arbitration ICC Rules.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","international","commercial"],
    }),
  },

  "legal-construction-contract-aia-a201-general-conditions": {
    id: "legal-construction-contract-aia-a201-general-conditions",
    name: "ConstructionContractAIAA201GeneralConditionsSkill",
    displayName: "Construction Contract AIA A201 General Conditions",
    categoryId: "legal",
    description: "Navigates owner, contractor, and architect responsibilities in construction.",
    tags: ["legal","legal","construction","contract"],
    transform: createStandardSkillTransform({
      sectionName: "Construction Contract AIA A201 General Conditions Standards",
      ruSectionName: "Стандарты и регламенты: Construction Contract AIA A201 General Conditions",
      instructions: [
        "Apply core domain tenets for Construction Contract AIA A201 General Conditions.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Construction Contract AIA A201 General Conditions.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","construction","contract"],
    }),
  },

  "legal-fcpa-foreign-corrupt-practices-act-anti-bribery": {
    id: "legal-fcpa-foreign-corrupt-practices-act-anti-bribery",
    name: "FCPAForeignCorruptPracticesActAntiBriberySkill",
    displayName: "FCPA Foreign Corrupt Practices Act Anti-Bribery",
    categoryId: "legal",
    description: "Establishes anti-corruption compliance controls for international business.",
    tags: ["legal","legal","fcpa","foreign"],
    transform: createStandardSkillTransform({
      sectionName: "FCPA Foreign Corrupt Practices Act Anti-Bribery Standards",
      ruSectionName: "Стандарты и регламенты: FCPA Foreign Corrupt Practices Act Anti-Bribery",
      instructions: [
        "Apply core domain tenets for FCPA Foreign Corrupt Practices Act Anti-Bribery.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для FCPA Foreign Corrupt Practices Act Anti-Bribery.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","fcpa","foreign"],
    }),
  },

  "legal-environmental-protection-act-epa-site-assessment": {
    id: "legal-environmental-protection-act-epa-site-assessment",
    name: "EnvironmentalProtectionActEPASiteAssessmentSkill",
    displayName: "Environmental Protection Act EPA Site Assessment",
    categoryId: "legal",
    description: "Conducts Phase I Environmental Site Assessments for commercial property.",
    tags: ["legal","legal","environmental","protection"],
    transform: createStandardSkillTransform({
      sectionName: "Environmental Protection Act EPA Site Assessment Standards",
      ruSectionName: "Стандарты и регламенты: Environmental Protection Act EPA Site Assessment",
      instructions: [
        "Apply core domain tenets for Environmental Protection Act EPA Site Assessment.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Environmental Protection Act EPA Site Assessment.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","environmental","protection"],
    }),
  },

  "legal-bankruptcy-chapter-11-reorganization-plan": {
    id: "legal-bankruptcy-chapter-11-reorganization-plan",
    name: "BankruptcyChapter11ReorganizationPlanSkill",
    displayName: "Bankruptcy Chapter 11 Reorganization Plan",
    categoryId: "legal",
    description: "Structures Chapter 11 debtor-in-possession financing and creditor plans.",
    tags: ["legal","legal","bankruptcy","chapter"],
    transform: createStandardSkillTransform({
      sectionName: "Bankruptcy Chapter 11 Reorganization Plan Standards",
      ruSectionName: "Стандарты и регламенты: Bankruptcy Chapter 11 Reorganization Plan",
      instructions: [
        "Apply core domain tenets for Bankruptcy Chapter 11 Reorganization Plan.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Bankruptcy Chapter 11 Reorganization Plan.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","bankruptcy","chapter"],
    }),
  },

  "legal-copyright-fair-use-digital-millennium-copyright-act": {
    id: "legal-copyright-fair-use-digital-millennium-copyright-act",
    name: "CopyrightFairUseDigitalMillenniumCopyrightActSkill",
    displayName: "Copyright Fair Use Digital Millennium Copyright Act",
    categoryId: "legal",
    description: "Evaluates DMCA safe harbor eligibility and four-factor fair use defenses.",
    tags: ["legal","legal","copyright","fair"],
    transform: createStandardSkillTransform({
      sectionName: "Copyright Fair Use Digital Millennium Copyright Act Standards",
      ruSectionName: "Стандарты и регламенты: Copyright Fair Use Digital Millennium Copyright Act",
      instructions: [
        "Apply core domain tenets for Copyright Fair Use Digital Millennium Copyright Act.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Copyright Fair Use Digital Millennium Copyright Act.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","copyright","fair"],
    }),
  },

  "legal-franchise-disclosure-document-fdd-item-20-audit": {
    id: "legal-franchise-disclosure-document-fdd-item-20-audit",
    name: "FranchiseDisclosureDocumentFDDItem20AuditSkill",
    displayName: "Franchise Disclosure Document (FDD) Item 20 Audit",
    categoryId: "legal",
    description: "Audits FDD disclosures for franchisee turnover and litigation history.",
    tags: ["legal","legal","franchise","disclosure"],
    transform: createStandardSkillTransform({
      sectionName: "Franchise Disclosure Document (FDD) Item 20 Audit Standards",
      ruSectionName: "Стандарты и регламенты: Franchise Disclosure Document (FDD) Item 20 Audit",
      instructions: [
        "Apply core domain tenets for Franchise Disclosure Document (FDD) Item 20 Audit.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Franchise Disclosure Document (FDD) Item 20 Audit.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","franchise","disclosure"],
    }),
  },

  "legal-employee-stock-option-plan-esop-409a-valuation": {
    id: "legal-employee-stock-option-plan-esop-409a-valuation",
    name: "EmployeeStockOptionPlanESOP409AValuationSkill",
    displayName: "Employee Stock Option Plan (ESOP) 409A Valuation",
    categoryId: "legal",
    description: "Structures IRS-compliant 409A fair market value stock option grants.",
    tags: ["legal","legal","employee","stock"],
    transform: createStandardSkillTransform({
      sectionName: "Employee Stock Option Plan (ESOP) 409A Valuation Standards",
      ruSectionName: "Стандарты и регламенты: Employee Stock Option Plan (ESOP) 409A Valuation",
      instructions: [
        "Apply core domain tenets for Employee Stock Option Plan (ESOP) 409A Valuation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Employee Stock Option Plan (ESOP) 409A Valuation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","employee","stock"],
    }),
  },

  "legal-government-contracting-far-dfars-compliance": {
    id: "legal-government-contracting-far-dfars-compliance",
    name: "GovernmentContractingFARDFARSComplianceSkill",
    displayName: "Government Contracting FAR / DFARS Compliance",
    categoryId: "legal",
    description: "Navigates Federal Acquisition Regulation rules for defense contractors.",
    tags: ["legal","legal","government","contracting"],
    transform: createStandardSkillTransform({
      sectionName: "Government Contracting FAR / DFARS Compliance Standards",
      ruSectionName: "Стандарты и регламенты: Government Contracting FAR / DFARS Compliance",
      instructions: [
        "Apply core domain tenets for Government Contracting FAR / DFARS Compliance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Government Contracting FAR / DFARS Compliance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","government","contracting"],
    }),
  },

  "legal-consumer-financial-protection-cfpb-truth-in-lending": {
    id: "legal-consumer-financial-protection-cfpb-truth-in-lending",
    name: "ConsumerFinancialProtectionCFPBTruthinLendingSkill",
    displayName: "Consumer Financial Protection CFPB Truth in Lending",
    categoryId: "legal",
    description: "Ensures APR financial disclosures comply with TILA and Regulation Z.",
    tags: ["legal","legal","consumer","financial"],
    transform: createStandardSkillTransform({
      sectionName: "Consumer Financial Protection CFPB Truth in Lending Standards",
      ruSectionName: "Стандарты и регламенты: Consumer Financial Protection CFPB Truth in Lending",
      instructions: [
        "Apply core domain tenets for Consumer Financial Protection CFPB Truth in Lending.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Consumer Financial Protection CFPB Truth in Lending.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","consumer","financial"],
    }),
  },

  "legal-maritime-law-jones-act-admiralty-jurisdiction": {
    id: "legal-maritime-law-jones-act-admiralty-jurisdiction",
    name: "MaritimeLawJonesActAdmiraltyJurisdictionSkill",
    displayName: "Maritime Law Jones Act & Admiralty Jurisdiction",
    categoryId: "legal",
    description: "Evaluates seaman injury claims and vessel charterparty agreements.",
    tags: ["legal","legal","maritime","law"],
    transform: createStandardSkillTransform({
      sectionName: "Maritime Law Jones Act & Admiralty Jurisdiction Standards",
      ruSectionName: "Стандарты и регламенты: Maritime Law Jones Act & Admiralty Jurisdiction",
      instructions: [
        "Apply core domain tenets for Maritime Law Jones Act & Admiralty Jurisdiction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Maritime Law Jones Act & Admiralty Jurisdiction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","maritime","law"],
    }),
  },

  "legal-entertainment-law-talent-option-rights-purchase": {
    id: "legal-entertainment-law-talent-option-rights-purchase",
    name: "EntertainmentLawTalentOptionRightsPurchaseSkill",
    displayName: "Entertainment Law Talent Option & Rights Purchase",
    categoryId: "legal",
    description: "Drafts film rights purchase options and talent performance contracts.",
    tags: ["legal","legal","entertainment","law"],
    transform: createStandardSkillTransform({
      sectionName: "Entertainment Law Talent Option & Rights Purchase Standards",
      ruSectionName: "Стандарты и регламенты: Entertainment Law Talent Option & Rights Purchase",
      instructions: [
        "Apply core domain tenets for Entertainment Law Talent Option & Rights Purchase.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Entertainment Law Talent Option & Rights Purchase.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","entertainment","law"],
    }),
  },

  "legal-sports-law-athlete-endorsement-name-image-likeness": {
    id: "legal-sports-law-athlete-endorsement-name-image-likeness",
    name: "SportsLawAthleteEndorsementNameImageLikenessSkill",
    displayName: "Sports Law Athlete Endorsement & Name Image Likeness",
    categoryId: "legal",
    description: "Drafts college athlete NIL marketing and brand sponsorship contracts.",
    tags: ["legal","legal","sports","law"],
    transform: createStandardSkillTransform({
      sectionName: "Sports Law Athlete Endorsement & Name Image Likeness Standards",
      ruSectionName: "Стандарты и регламенты: Sports Law Athlete Endorsement & Name Image Likeness",
      instructions: [
        "Apply core domain tenets for Sports Law Athlete Endorsement & Name Image Likeness.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sports Law Athlete Endorsement & Name Image Likeness.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","sports","law"],
    }),
  },

  "legal-tax-law-section-368-reorganization-corporate-tax": {
    id: "legal-tax-law-section-368-reorganization-corporate-tax",
    name: "TaxLawSection368ReorganizationCorporateTaxSkill",
    displayName: "Tax Law Section 368 Reorganization Corporate Tax",
    categoryId: "legal",
    description: "Structures tax-free corporate mergers and stock-for-stock exchanges.",
    tags: ["legal","legal","tax","law"],
    transform: createStandardSkillTransform({
      sectionName: "Tax Law Section 368 Reorganization Corporate Tax Standards",
      ruSectionName: "Стандарты и регламенты: Tax Law Section 368 Reorganization Corporate Tax",
      instructions: [
        "Apply core domain tenets for Tax Law Section 368 Reorganization Corporate Tax.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Tax Law Section 368 Reorganization Corporate Tax.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","tax","law"],
    }),
  },

  "legal-immigration-law-h-1b-o-1-extraordinary-ability": {
    id: "legal-immigration-law-h-1b-o-1-extraordinary-ability",
    name: "ImmigrationLawH1BO1ExtraordinaryAbilitySkill",
    displayName: "Immigration Law H-1B / O-1 Extraordinary Ability",
    categoryId: "legal",
    description: "Drafts petitions proving specialized knowledge or extraordinary ability.",
    tags: ["legal","legal","immigration","law"],
    transform: createStandardSkillTransform({
      sectionName: "Immigration Law H-1B / O-1 Extraordinary Ability Standards",
      ruSectionName: "Стандарты и регламенты: Immigration Law H-1B / O-1 Extraordinary Ability",
      instructions: [
        "Apply core domain tenets for Immigration Law H-1B / O-1 Extraordinary Ability.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Immigration Law H-1B / O-1 Extraordinary Ability.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","immigration","law"],
    }),
  },

  "legal-sovereignty-native-american-tribal-law-jurisdiction": {
    id: "legal-sovereignty-native-american-tribal-law-jurisdiction",
    name: "SovereigntyNativeAmericanTribalLawJurisdictionSkill",
    displayName: "Sovereignty & Native American Tribal Law Jurisdiction",
    categoryId: "legal",
    description: "Navigates tribal court jurisdiction and sovereign immunity doctrines.",
    tags: ["legal","legal","sovereignty","native"],
    transform: createStandardSkillTransform({
      sectionName: "Sovereignty & Native American Tribal Law Jurisdiction Standards",
      ruSectionName: "Стандарты и регламенты: Sovereignty & Native American Tribal Law Jurisdiction",
      instructions: [
        "Apply core domain tenets for Sovereignty & Native American Tribal Law Jurisdiction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sovereignty & Native American Tribal Law Jurisdiction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","sovereignty","native"],
    }),
  },

  "legal-aviation-law-faa-aircraft-lease-registration": {
    id: "legal-aviation-law-faa-aircraft-lease-registration",
    name: "AviationLawFAAAircraftLeaseRegistrationSkill",
    displayName: "Aviation Law FAA Aircraft Lease & Registration",
    categoryId: "legal",
    description: "Drafts dry/wet aircraft leases compliant with FAA FAR Part 91/135.",
    tags: ["legal","legal","aviation","law"],
    transform: createStandardSkillTransform({
      sectionName: "Aviation Law FAA Aircraft Lease & Registration Standards",
      ruSectionName: "Стандарты и регламенты: Aviation Law FAA Aircraft Lease & Registration",
      instructions: [
        "Apply core domain tenets for Aviation Law FAA Aircraft Lease & Registration.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Aviation Law FAA Aircraft Lease & Registration.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","aviation","law"],
    }),
  },

  "legal-telecommunications-fcc-spectrum-licensing-auction": {
    id: "legal-telecommunications-fcc-spectrum-licensing-auction",
    name: "TelecommunicationsFCCSpectrumLicensingAuctionSkill",
    displayName: "Telecommunications FCC Spectrum Licensing & Auction",
    categoryId: "legal",
    description: "Navigates FCC wireless spectrum auction bidding and compliance.",
    tags: ["legal","legal","telecommunications","fcc"],
    transform: createStandardSkillTransform({
      sectionName: "Telecommunications FCC Spectrum Licensing & Auction Standards",
      ruSectionName: "Стандарты и регламенты: Telecommunications FCC Spectrum Licensing & Auction",
      instructions: [
        "Apply core domain tenets for Telecommunications FCC Spectrum Licensing & Auction.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Telecommunications FCC Spectrum Licensing & Auction.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","telecommunications","fcc"],
    }),
  },

  "legal-insurance-law-bad-faith-denial-litigation": {
    id: "legal-insurance-law-bad-faith-denial-litigation",
    name: "InsuranceLawBadFaithDenialLitigationSkill",
    displayName: "Insurance Law Bad Faith Denial Litigation",
    categoryId: "legal",
    description: "Drafts insurance coverage demand letters citing first-party bad faith.",
    tags: ["legal","legal","insurance","law"],
    transform: createStandardSkillTransform({
      sectionName: "Insurance Law Bad Faith Denial Litigation Standards",
      ruSectionName: "Стандарты и регламенты: Insurance Law Bad Faith Denial Litigation",
      instructions: [
        "Apply core domain tenets for Insurance Law Bad Faith Denial Litigation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Insurance Law Bad Faith Denial Litigation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","insurance","law"],
    }),
  },

  "legal-bioethics-human-gene-editing-irb-legal-review": {
    id: "legal-bioethics-human-gene-editing-irb-legal-review",
    name: "BioethicsHumanGeneEditingIRBLegalReviewSkill",
    displayName: "Bioethics & Human Gene Editing IRB Legal Review",
    categoryId: "legal",
    description: "Audits clinical trial consent forms for experimental genetic therapies.",
    tags: ["legal","legal","bioethics","human"],
    transform: createStandardSkillTransform({
      sectionName: "Bioethics & Human Gene Editing IRB Legal Review Standards",
      ruSectionName: "Стандарты и регламенты: Bioethics & Human Gene Editing IRB Legal Review",
      instructions: [
        "Apply core domain tenets for Bioethics & Human Gene Editing IRB Legal Review.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Bioethics & Human Gene Editing IRB Legal Review.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","bioethics","human"],
    }),
  },

  "legal-cryptocurrency-sec-howey-test-securities-status": {
    id: "legal-cryptocurrency-sec-howey-test-securities-status",
    name: "CryptocurrencySECHoweyTestSecuritiesStatusSkill",
    displayName: "Cryptocurrency SEC Howey Test Securities Status",
    categoryId: "legal",
    description: "Analyzes digital token utility against the Howey Test securities threshold.",
    tags: ["legal","legal","cryptocurrency","sec"],
    transform: createStandardSkillTransform({
      sectionName: "Cryptocurrency SEC Howey Test Securities Status Standards",
      ruSectionName: "Стандарты и регламенты: Cryptocurrency SEC Howey Test Securities Status",
      instructions: [
        "Apply core domain tenets for Cryptocurrency SEC Howey Test Securities Status.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cryptocurrency SEC Howey Test Securities Status.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","cryptocurrency","sec"],
    }),
  },

  "legal-space-law-outer-space-treaty-satellite-debris": {
    id: "legal-space-law-outer-space-treaty-satellite-debris",
    name: "SpaceLawOuterSpaceTreatySatelliteDebrisSkill",
    displayName: "Space Law Outer Space Treaty & Satellite Debris",
    categoryId: "legal",
    description: "Navigates satellite orbital slot licensing and liability for space debris.",
    tags: ["legal","legal","space","law"],
    transform: createStandardSkillTransform({
      sectionName: "Space Law Outer Space Treaty & Satellite Debris Standards",
      ruSectionName: "Стандарты и регламенты: Space Law Outer Space Treaty & Satellite Debris",
      instructions: [
        "Apply core domain tenets for Space Law Outer Space Treaty & Satellite Debris.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Space Law Outer Space Treaty & Satellite Debris.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","space","law"],
    }),
  },

  "legal-cannabis-hemp-state-level-regulatory-licensing": {
    id: "legal-cannabis-hemp-state-level-regulatory-licensing",
    name: "CannabisHempStateLevelRegulatoryLicensingSkill",
    displayName: "Cannabis & Hemp State-Level Regulatory Licensing",
    categoryId: "legal",
    description: "Navigates state commercial cannabis licensing and Banking 280E tax.",
    tags: ["legal","legal","cannabis","hemp"],
    transform: createStandardSkillTransform({
      sectionName: "Cannabis & Hemp State-Level Regulatory Licensing Standards",
      ruSectionName: "Стандарты и регламенты: Cannabis & Hemp State-Level Regulatory Licensing",
      instructions: [
        "Apply core domain tenets for Cannabis & Hemp State-Level Regulatory Licensing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cannabis & Hemp State-Level Regulatory Licensing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","cannabis","hemp"],
    }),
  },

  "legal-ai-ethics-algorithmic-liability-risk-audit": {
    id: "legal-ai-ethics-algorithmic-liability-risk-audit",
    name: "AIEthicsAlgorithmicLiabilityRiskAuditSkill",
    displayName: "AI Ethics & Algorithmic Liability Risk Audit",
    categoryId: "legal",
    description: "Audits AI automated decision systems for bias, transparency, and liability.",
    tags: ["legal","legal","ai","ethics"],
    transform: createStandardSkillTransform({
      sectionName: "AI Ethics & Algorithmic Liability Risk Audit Standards",
      ruSectionName: "Стандарты и регламенты: AI Ethics & Algorithmic Liability Risk Audit",
      instructions: [
        "Apply core domain tenets for AI Ethics & Algorithmic Liability Risk Audit.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для AI Ethics & Algorithmic Liability Risk Audit.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","ai","ethics"],
    }),
  },

  "legal-cross-border-tax-double-taxation-treaty-optimization": {
    id: "legal-cross-border-tax-double-taxation-treaty-optimization",
    name: "CrossBorderTaxDoubleTaxationTreatyOptimizationSkill",
    displayName: "Cross-Border Tax Double Taxation Treaty Optimization",
    categoryId: "legal",
    description: "Applies bilateral tax treaties to prevent double taxation on foreign income.",
    tags: ["legal","legal","cross","border"],
    transform: createStandardSkillTransform({
      sectionName: "Cross-Border Tax Double Taxation Treaty Optimization Standards",
      ruSectionName: "Стандарты и регламенты: Cross-Border Tax Double Taxation Treaty Optimization",
      instructions: [
        "Apply core domain tenets for Cross-Border Tax Double Taxation Treaty Optimization.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cross-Border Tax Double Taxation Treaty Optimization.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","cross","border"],
    }),
  },

  "legal-trade-secret-uniform-trade-secrets-act-utsa-protection": {
    id: "legal-trade-secret-uniform-trade-secrets-act-utsa-protection",
    name: "TradeSecretUniformTradeSecretsActUTSAProtectionSkill",
    displayName: "Trade Secret Uniform Trade Secrets Act (UTSA) Protection",
    categoryId: "legal",
    description: "Establishes reasonable security measures to preserve trade secret status.",
    tags: ["legal","legal","trade","secret"],
    transform: createStandardSkillTransform({
      sectionName: "Trade Secret Uniform Trade Secrets Act (UTSA) Protection Standards",
      ruSectionName: "Стандарты и регламенты: Trade Secret Uniform Trade Secrets Act (UTSA) Protection",
      instructions: [
        "Apply core domain tenets for Trade Secret Uniform Trade Secrets Act (UTSA) Protection.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Trade Secret Uniform Trade Secrets Act (UTSA) Protection.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","trade","secret"],
    }),
  },

  "legal-commercial-debt-collection-fdcpa-seizure-enforcement": {
    id: "legal-commercial-debt-collection-fdcpa-seizure-enforcement",
    name: "CommercialDebtCollectionFDCPASeizureEnforcementSkill",
    displayName: "Commercial Debt Collection FDCPA & Seizure Enforcement",
    categoryId: "legal",
    description: "Enforces post-judgment asset discovery, garnishment, and property liens.",
    tags: ["legal","legal","commercial","debt"],
    transform: createStandardSkillTransform({
      sectionName: "Commercial Debt Collection FDCPA & Seizure Enforcement Standards",
      ruSectionName: "Стандарты и регламенты: Commercial Debt Collection FDCPA & Seizure Enforcement",
      instructions: [
        "Apply core domain tenets for Commercial Debt Collection FDCPA & Seizure Enforcement.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Commercial Debt Collection FDCPA & Seizure Enforcement.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","commercial","debt"],
    }),
  },

  "legal-labor-law-national-labor-relations-board-nlrb-union": {
    id: "legal-labor-law-national-labor-relations-board-nlrb-union",
    name: "LaborLawNationalLaborRelationsBoardNLRBUnionSkill",
    displayName: "Labor Law National Labor Relations Board (NLRB) Union",
    categoryId: "legal",
    description: "Navigates collective bargaining agreements and unfair labor practice charges.",
    tags: ["legal","legal","labor","law"],
    transform: createStandardSkillTransform({
      sectionName: "Labor Law National Labor Relations Board (NLRB) Union Standards",
      ruSectionName: "Стандарты и регламенты: Labor Law National Labor Relations Board (NLRB) Union",
      instructions: [
        "Apply core domain tenets for Labor Law National Labor Relations Board (NLRB) Union.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Labor Law National Labor Relations Board (NLRB) Union.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","labor","law"],
    }),
  },

  "legal-joint-venture-shared-equity-governance-deed": {
    id: "legal-joint-venture-shared-equity-governance-deed",
    name: "JointVentureSharedEquityGovernanceDeedSkill",
    displayName: "Joint Venture Shared Equity Governance Deed",
    categoryId: "legal",
    description: "Drafts 50/50 joint venture operating deeds with deadlock resolution rules.",
    tags: ["legal","legal","joint","venture"],
    transform: createStandardSkillTransform({
      sectionName: "Joint Venture Shared Equity Governance Deed Standards",
      ruSectionName: "Стандарты и регламенты: Joint Venture Shared Equity Governance Deed",
      instructions: [
        "Apply core domain tenets for Joint Venture Shared Equity Governance Deed.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Joint Venture Shared Equity Governance Deed.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","joint","venture"],
    }),
  },

  "legal-commercial-equipment-lease-ucc-article-2a": {
    id: "legal-commercial-equipment-lease-ucc-article-2a",
    name: "CommercialEquipmentLeaseUCCArticle2ASkill",
    displayName: "Commercial Equipment Lease UCC Article 2A",
    categoryId: "legal",
    description: "Structures equipment leases under Uniform Commercial Code Article 2A.",
    tags: ["legal","legal","commercial","equipment"],
    transform: createStandardSkillTransform({
      sectionName: "Commercial Equipment Lease UCC Article 2A Standards",
      ruSectionName: "Стандарты и регламенты: Commercial Equipment Lease UCC Article 2A",
      instructions: [
        "Apply core domain tenets for Commercial Equipment Lease UCC Article 2A.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Commercial Equipment Lease UCC Article 2A.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","commercial","equipment"],
    }),
  },

  "legal-privacy-law-eu-eprivacy-directive-cookie-consent": {
    id: "legal-privacy-law-eu-eprivacy-directive-cookie-consent",
    name: "PrivacyLawEUePrivacyDirectiveCookieConsentSkill",
    displayName: "Privacy Law EU ePrivacy Directive Cookie Consent",
    categoryId: "legal",
    description: "Enforces cookie consent banners compliant with ePrivacy Directive.",
    tags: ["legal","legal","privacy","law"],
    transform: createStandardSkillTransform({
      sectionName: "Privacy Law EU ePrivacy Directive Cookie Consent Standards",
      ruSectionName: "Стандарты и регламенты: Privacy Law EU ePrivacy Directive Cookie Consent",
      instructions: [
        "Apply core domain tenets for Privacy Law EU ePrivacy Directive Cookie Consent.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Privacy Law EU ePrivacy Directive Cookie Consent.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","privacy","law"],
    }),
  },

  "legal-securities-fraud-rule-10b-5-material-misrepresentation": {
    id: "legal-securities-fraud-rule-10b-5-material-misrepresentation",
    name: "SecuritiesFraudRule10b5MaterialMisrepresentationSkill",
    displayName: "Securities Fraud Rule 10b-5 Material Misrepresentation",
    categoryId: "legal",
    description: "Analyzes 10b-5 civil liability for false statements affecting stock prices.",
    tags: ["legal","legal","securities","fraud"],
    transform: createStandardSkillTransform({
      sectionName: "Securities Fraud Rule 10b-5 Material Misrepresentation Standards",
      ruSectionName: "Стандарты и регламенты: Securities Fraud Rule 10b-5 Material Misrepresentation",
      instructions: [
        "Apply core domain tenets for Securities Fraud Rule 10b-5 Material Misrepresentation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Securities Fraud Rule 10b-5 Material Misrepresentation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","securities","fraud"],
    }),
  },

  "legal-real-estate-zoning-board-variance-special-permit": {
    id: "legal-real-estate-zoning-board-variance-special-permit",
    name: "RealEstateZoningBoardVarianceSpecialPermitSkill",
    displayName: "Real Estate Zoning Board Variance & Special Permit",
    categoryId: "legal",
    description: "Drafts variance applications proving unnecessary hardship to zoning boards.",
    tags: ["legal","legal","real","estate"],
    transform: createStandardSkillTransform({
      sectionName: "Real Estate Zoning Board Variance & Special Permit Standards",
      ruSectionName: "Стандарты и регламенты: Real Estate Zoning Board Variance & Special Permit",
      instructions: [
        "Apply core domain tenets for Real Estate Zoning Board Variance & Special Permit.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Real Estate Zoning Board Variance & Special Permit.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","real","estate"],
    }),
  },

  "legal-healthcare-stark-law-anti-kickback-statute-aks": {
    id: "legal-healthcare-stark-law-anti-kickback-statute-aks",
    name: "HealthcareStarkLawAntiKickbackStatuteAKSSkill",
    displayName: "Healthcare Stark Law & Anti-Kickback Statute (AKS)",
    categoryId: "legal",
    description: "Audits physician referral relationships to prevent illegal kickbacks.",
    tags: ["legal","legal","healthcare","stark"],
    transform: createStandardSkillTransform({
      sectionName: "Healthcare Stark Law & Anti-Kickback Statute (AKS) Standards",
      ruSectionName: "Стандарты и регламенты: Healthcare Stark Law & Anti-Kickback Statute (AKS)",
      instructions: [
        "Apply core domain tenets for Healthcare Stark Law & Anti-Kickback Statute (AKS).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Healthcare Stark Law & Anti-Kickback Statute (AKS).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","healthcare","stark"],
    }),
  },

  "legal-constitutional-law-first-amendment-free-speech": {
    id: "legal-constitutional-law-first-amendment-free-speech",
    name: "ConstitutionalLawFirstAmendmentFreeSpeechSkill",
    displayName: "Constitutional Law First Amendment Free Speech",
    categoryId: "legal",
    description: "Analyzes government speech restrictions under strict scrutiny standards.",
    tags: ["legal","legal","constitutional","law"],
    transform: createStandardSkillTransform({
      sectionName: "Constitutional Law First Amendment Free Speech Standards",
      ruSectionName: "Стандарты и регламенты: Constitutional Law First Amendment Free Speech",
      instructions: [
        "Apply core domain tenets for Constitutional Law First Amendment Free Speech.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Constitutional Law First Amendment Free Speech.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","constitutional","law"],
    }),
  },

  "legal-probate-estate-planning-living-trust-pour-over-will": {
    id: "legal-probate-estate-planning-living-trust-pour-over-will",
    name: "ProbateEstatePlanningLivingTrustPourOverWillSkill",
    displayName: "Probate & Estate Planning Living Trust & Pour-Over Will",
    categoryId: "legal",
    description: "Drafts revocable living trusts to avoid probate court costs.",
    tags: ["legal","legal","probate","estate"],
    transform: createStandardSkillTransform({
      sectionName: "Probate & Estate Planning Living Trust & Pour-Over Will Standards",
      ruSectionName: "Стандарты и регламенты: Probate & Estate Planning Living Trust & Pour-Over Will",
      instructions: [
        "Apply core domain tenets for Probate & Estate Planning Living Trust & Pour-Over Will.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Probate & Estate Planning Living Trust & Pour-Over Will.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","probate","estate"],
    }),
  },

  "legal-product-liability-restatement-third-strict-torts": {
    id: "legal-product-liability-restatement-third-strict-torts",
    name: "ProductLiabilityRestatementThirdStrictTortsSkill",
    displayName: "Product Liability Restatement Third Strict Torts",
    categoryId: "legal",
    description: "Evaluates manufacturing defect, design defect, and failure to warn claims.",
    tags: ["legal","legal","product","liability"],
    transform: createStandardSkillTransform({
      sectionName: "Product Liability Restatement Third Strict Torts Standards",
      ruSectionName: "Стандарты и регламенты: Product Liability Restatement Third Strict Torts",
      instructions: [
        "Apply core domain tenets for Product Liability Restatement Third Strict Torts.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Product Liability Restatement Third Strict Torts.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","product","liability"],
    }),
  },

  "legal-class-action-rule-23-certification-motion": {
    id: "legal-class-action-rule-23-certification-motion",
    name: "ClassActionRule23CertificationMotionSkill",
    displayName: "Class Action Rule 23 Certification Motion",
    categoryId: "legal",
    description: "Drafts class certification motions proving numerosity, commonality, and typicality.",
    tags: ["legal","legal","class","action"],
    transform: createStandardSkillTransform({
      sectionName: "Class Action Rule 23 Certification Motion Standards",
      ruSectionName: "Стандарты и регламенты: Class Action Rule 23 Certification Motion",
      instructions: [
        "Apply core domain tenets for Class Action Rule 23 Certification Motion.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Class Action Rule 23 Certification Motion.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","class","action"],
    }),
  },

  "legal-cyber-insurance-claim-proof-of-loss-documentation": {
    id: "legal-cyber-insurance-claim-proof-of-loss-documentation",
    name: "CyberInsuranceClaimProofofLossDocumentationSkill",
    displayName: "Cyber Insurance Claim Proof of Loss Documentation",
    categoryId: "legal",
    description: "Documents ransomware extortion losses for cyber insurance reimbursement.",
    tags: ["legal","legal","cyber","insurance"],
    transform: createStandardSkillTransform({
      sectionName: "Cyber Insurance Claim Proof of Loss Documentation Standards",
      ruSectionName: "Стандарты и регламенты: Cyber Insurance Claim Proof of Loss Documentation",
      instructions: [
        "Apply core domain tenets for Cyber Insurance Claim Proof of Loss Documentation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cyber Insurance Claim Proof of Loss Documentation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","cyber","insurance"],
    }),
  },

  "legal-defamation-libel-per-se-public-figure-malice": {
    id: "legal-defamation-libel-per-se-public-figure-malice",
    name: "DefamationLibelPerSePublicFigureMaliceSkill",
    displayName: "Defamation Libel Per Se Public Figure Malice",
    categoryId: "legal",
    description: "Evaluates actual malice standards in defamation suits involving public figures.",
    tags: ["legal","legal","defamation","libel"],
    transform: createStandardSkillTransform({
      sectionName: "Defamation Libel Per Se Public Figure Malice Standards",
      ruSectionName: "Стандарты и регламенты: Defamation Libel Per Se Public Figure Malice",
      instructions: [
        "Apply core domain tenets for Defamation Libel Per Se Public Figure Malice.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Defamation Libel Per Se Public Figure Malice.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","defamation","libel"],
    }),
  },

  "legal-sovereignty-immunity-foreign-sovereign-immunities-act-fsia": {
    id: "legal-sovereignty-immunity-foreign-sovereign-immunities-act-fsia",
    name: "SovereigntyImmunityForeignSovereignImmunitiesActFSIASkill",
    displayName: "Sovereignty Immunity Foreign Sovereign Immunities Act (FSIA)",
    categoryId: "legal",
    description: "Navigates lawsuits against foreign states under FSIA commercial activity exceptions.",
    tags: ["legal","legal","sovereignty","immunity"],
    transform: createStandardSkillTransform({
      sectionName: "Sovereignty Immunity Foreign Sovereign Immunities Act (FSIA) Standards",
      ruSectionName: "Стандарты и регламенты: Sovereignty Immunity Foreign Sovereign Immunities Act (FSIA)",
      instructions: [
        "Apply core domain tenets for Sovereignty Immunity Foreign Sovereign Immunities Act (FSIA).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sovereignty Immunity Foreign Sovereign Immunities Act (FSIA).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","sovereignty","immunity"],
    }),
  },

  "legal-international-sales-cisg-vienna-convention-application": {
    id: "legal-international-sales-cisg-vienna-convention-application",
    name: "InternationalSalesCISGViennaConventionApplicationSkill",
    displayName: "International Sales CISG Vienna Convention Application",
    categoryId: "legal",
    description: "Applies the UN Convention on Contracts for International Sale of Goods.",
    tags: ["legal","legal","international","sales"],
    transform: createStandardSkillTransform({
      sectionName: "International Sales CISG Vienna Convention Application Standards",
      ruSectionName: "Стандарты и регламенты: International Sales CISG Vienna Convention Application",
      instructions: [
        "Apply core domain tenets for International Sales CISG Vienna Convention Application.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для International Sales CISG Vienna Convention Application.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","international","sales"],
    }),
  },

  "legal-patent-inter-partes-review-ipr-invalidity-petition": {
    id: "legal-patent-inter-partes-review-ipr-invalidity-petition",
    name: "PatentInterPartesReviewIPRInvalidityPetitionSkill",
    displayName: "Patent Inter Partes Review (IPR) Invalidity Petition",
    categoryId: "legal",
    description: "Drafts IPR petitions challenging patent validity before the USPTO PTAB.",
    tags: ["legal","legal","patent","inter"],
    transform: createStandardSkillTransform({
      sectionName: "Patent Inter Partes Review (IPR) Invalidity Petition Standards",
      ruSectionName: "Стандарты и регламенты: Patent Inter Partes Review (IPR) Invalidity Petition",
      instructions: [
        "Apply core domain tenets for Patent Inter Partes Review (IPR) Invalidity Petition.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Patent Inter Partes Review (IPR) Invalidity Petition.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","patent","inter"],
    }),
  },

  "legal-corporate-director-fiduciary-duty-duty-of-loyalty": {
    id: "legal-corporate-director-fiduciary-duty-duty-of-loyalty",
    name: "CorporateDirectorFiduciaryDutyDutyofLoyaltySkill",
    displayName: "Corporate Director Fiduciary Duty Duty of Loyalty",
    categoryId: "legal",
    description: "Evaluates board director business judgment rule defenses vs duty breaches.",
    tags: ["legal","legal","corporate","director"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Director Fiduciary Duty Duty of Loyalty Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Director Fiduciary Duty Duty of Loyalty",
      instructions: [
        "Apply core domain tenets for Corporate Director Fiduciary Duty Duty of Loyalty.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Director Fiduciary Duty Duty of Loyalty.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","corporate","director"],
    }),
  },

  "legal-eminent-domain-takings-clause-just-compensation": {
    id: "legal-eminent-domain-takings-clause-just-compensation",
    name: "EminentDomainTakingsClauseJustCompensationSkill",
    displayName: "Eminent Domain Takings Clause Just Compensation",
    categoryId: "legal",
    description: "Navigates government land condemnation and fair market value compensation.",
    tags: ["legal","legal","eminent","domain"],
    transform: createStandardSkillTransform({
      sectionName: "Eminent Domain Takings Clause Just Compensation Standards",
      ruSectionName: "Стандарты и регламенты: Eminent Domain Takings Clause Just Compensation",
      instructions: [
        "Apply core domain tenets for Eminent Domain Takings Clause Just Compensation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Eminent Domain Takings Clause Just Compensation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","eminent","domain"],
    }),
  },

  "legal-sovereign-wealth-fund-cross-border-investment-governance": {
    id: "legal-sovereign-wealth-fund-cross-border-investment-governance",
    name: "SovereignWealthFundCrossBorderInvestmentGovernanceSkill",
    displayName: "Sovereign Wealth Fund Cross-Border Investment Governance",
    categoryId: "legal",
    description: "Structures foreign direct investment deals subject to CFIUS national security review.",
    tags: ["legal","legal","sovereign","wealth"],
    transform: createStandardSkillTransform({
      sectionName: "Sovereign Wealth Fund Cross-Border Investment Governance Standards",
      ruSectionName: "Стандарты и регламенты: Sovereign Wealth Fund Cross-Border Investment Governance",
      instructions: [
        "Apply core domain tenets for Sovereign Wealth Fund Cross-Border Investment Governance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sovereign Wealth Fund Cross-Border Investment Governance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","sovereign","wealth"],
    }),
  },

  "legal-saas-service-level-agreement-uptime-penalty": {
    id: "legal-saas-service-level-agreement-uptime-penalty",
    name: "SaaSServiceLevelAgreementUptimePenaltySkill",
    displayName: "SaaS Service Level Agreement Uptime Penalty",
    categoryId: "legal",
    description: "Drafts 99.9% uptime SLAs with credit remedies for downtime.",
    tags: ["legal","legal","saas","service"],
    transform: createStandardSkillTransform({
      sectionName: "SaaS Service Level Agreement Uptime Penalty Standards",
      ruSectionName: "Стандарты и регламенты: SaaS Service Level Agreement Uptime Penalty",
      instructions: [
        "Apply core domain tenets for SaaS Service Level Agreement Uptime Penalty.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SaaS Service Level Agreement Uptime Penalty.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","saas","service"],
    }),
  },

  "legal-labor-union-grievance-arbitration-hearing": {
    id: "legal-labor-union-grievance-arbitration-hearing",
    name: "LaborUnionGrievanceArbitrationHearingSkill",
    displayName: "Labor Union Grievance Arbitration Hearing",
    categoryId: "legal",
    description: "Prepares management briefs for labor union contract grievance arbitrations.",
    tags: ["legal","legal","labor","union"],
    transform: createStandardSkillTransform({
      sectionName: "Labor Union Grievance Arbitration Hearing Standards",
      ruSectionName: "Стандарты и регламенты: Labor Union Grievance Arbitration Hearing",
      instructions: [
        "Apply core domain tenets for Labor Union Grievance Arbitration Hearing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Labor Union Grievance Arbitration Hearing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","labor","union"],
    }),
  },

  "legal-media-defamation-pre-publication-legal-vetting": {
    id: "legal-media-defamation-pre-publication-legal-vetting",
    name: "MediaDefamationPrePublicationLegalVettingSkill",
    displayName: "Media Defamation Pre-Publication Legal Vetting",
    categoryId: "legal",
    description: "Reviews investigative news stories prior to publication to mitigate libel risk.",
    tags: ["legal","legal","media","defamation"],
    transform: createStandardSkillTransform({
      sectionName: "Media Defamation Pre-Publication Legal Vetting Standards",
      ruSectionName: "Стандарты и регламенты: Media Defamation Pre-Publication Legal Vetting",
      instructions: [
        "Apply core domain tenets for Media Defamation Pre-Publication Legal Vetting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Media Defamation Pre-Publication Legal Vetting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","media","defamation"],
    }),
  },

  "legal-cross-border-insolvency-uncitral-model-law": {
    id: "legal-cross-border-insolvency-uncitral-model-law",
    name: "CrossBorderInsolvencyUNCITRALModelLawSkill",
    displayName: "Cross-Border Insolvency UNCITRAL Model Law",
    categoryId: "legal",
    description: "Coordinates multi-jurisdictional corporate restructuring across borders.",
    tags: ["legal","legal","cross","border"],
    transform: createStandardSkillTransform({
      sectionName: "Cross-Border Insolvency UNCITRAL Model Law Standards",
      ruSectionName: "Стандарты и регламенты: Cross-Border Insolvency UNCITRAL Model Law",
      instructions: [
        "Apply core domain tenets for Cross-Border Insolvency UNCITRAL Model Law.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cross-Border Insolvency UNCITRAL Model Law.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","cross","border"],
    }),
  },

  "legal-biometric-information-privacy-act-bipa-compliance": {
    id: "legal-biometric-information-privacy-act-bipa-compliance",
    name: "BiometricInformationPrivacyActBIPAComplianceSkill",
    displayName: "Biometric Information Privacy Act (BIPA) Compliance",
    categoryId: "legal",
    description: "Enforces written consent rules for collecting facial scans and fingerprints.",
    tags: ["legal","legal","biometric","information"],
    transform: createStandardSkillTransform({
      sectionName: "Biometric Information Privacy Act (BIPA) Compliance Standards",
      ruSectionName: "Стандарты и регламенты: Biometric Information Privacy Act (BIPA) Compliance",
      instructions: [
        "Apply core domain tenets for Biometric Information Privacy Act (BIPA) Compliance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Biometric Information Privacy Act (BIPA) Compliance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","biometric","information"],
    }),
  },

  "legal-intellectual-property-licensing-royalty-audit": {
    id: "legal-intellectual-property-licensing-royalty-audit",
    name: "IntellectualPropertyLicensingRoyaltyAuditSkill",
    displayName: "Intellectual Property Licensing Royalty Audit",
    categoryId: "legal",
    description: "Audits licensee sales books to uncover underreported IP royalty payments.",
    tags: ["legal","legal","intellectual","property"],
    transform: createStandardSkillTransform({
      sectionName: "Intellectual Property Licensing Royalty Audit Standards",
      ruSectionName: "Стандарты и регламенты: Intellectual Property Licensing Royalty Audit",
      instructions: [
        "Apply core domain tenets for Intellectual Property Licensing Royalty Audit.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Intellectual Property Licensing Royalty Audit.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","intellectual","property"],
    }),
  },

  "legal-corporate-compliance-hotline-code-of-ethics": {
    id: "legal-corporate-compliance-hotline-code-of-ethics",
    name: "CorporateComplianceHotlineCodeofEthicsSkill",
    displayName: "Corporate Compliance Hotline Code of Ethics",
    categoryId: "legal",
    description: "Establishes independent hotline reporting for accounting or safety fraud.",
    tags: ["legal","legal","corporate","compliance"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Compliance Hotline Code of Ethics Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Compliance Hotline Code of Ethics",
      instructions: [
        "Apply core domain tenets for Corporate Compliance Hotline Code of Ethics.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Compliance Hotline Code of Ethics.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","corporate","compliance"],
    }),
  },

  "legal-franchise-agreement-master-territorial-development": {
    id: "legal-franchise-agreement-master-territorial-development",
    name: "FranchiseAgreementMasterTerritorialDevelopmentSkill",
    displayName: "Franchise Agreement Master Territorial Development",
    categoryId: "legal",
    description: "Drafts master franchise agreements granting exclusive regional development rights.",
    tags: ["legal","legal","franchise","agreement"],
    transform: createStandardSkillTransform({
      sectionName: "Franchise Agreement Master Territorial Development Standards",
      ruSectionName: "Стандарты и регламенты: Franchise Agreement Master Territorial Development",
      instructions: [
        "Apply core domain tenets for Franchise Agreement Master Territorial Development.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Franchise Agreement Master Territorial Development.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","franchise","agreement"],
    }),
  },

  "legal-construction-mechanics-lien-foreclosure": {
    id: "legal-construction-mechanics-lien-foreclosure",
    name: "ConstructionMechanicsLienForeclosureSkill",
    displayName: "Construction Mechanics Lien Foreclosure",
    categoryId: "legal",
    description: "Files and forecloses mechanics liens on real property for unpaid contractor work.",
    tags: ["legal","legal","construction","mechanics"],
    transform: createStandardSkillTransform({
      sectionName: "Construction Mechanics Lien Foreclosure Standards",
      ruSectionName: "Стандарты и регламенты: Construction Mechanics Lien Foreclosure",
      instructions: [
        "Apply core domain tenets for Construction Mechanics Lien Foreclosure.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Construction Mechanics Lien Foreclosure.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","construction","mechanics"],
    }),
  },

  "legal-commercial-guarantee-personal-suretyship-deed": {
    id: "legal-commercial-guarantee-personal-suretyship-deed",
    name: "CommercialGuaranteePersonalSuretyshipDeedSkill",
    displayName: "Commercial Guarantee & Personal Suretyship Deed",
    categoryId: "legal",
    description: "Drafts unconditional personal guarantees backing commercial corporate loans.",
    tags: ["legal","legal","commercial","guarantee"],
    transform: createStandardSkillTransform({
      sectionName: "Commercial Guarantee & Personal Suretyship Deed Standards",
      ruSectionName: "Стандарты и регламенты: Commercial Guarantee & Personal Suretyship Deed",
      instructions: [
        "Apply core domain tenets for Commercial Guarantee & Personal Suretyship Deed.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Commercial Guarantee & Personal Suretyship Deed.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","commercial","guarantee"],
    }),
  },

  "legal-ada-title-iii-public-accommodation-accessibility": {
    id: "legal-ada-title-iii-public-accommodation-accessibility",
    name: "ADATitleIIIPublicAccommodationAccessibilitySkill",
    displayName: "ADA Title III Public Accommodation Accessibility",
    categoryId: "legal",
    description: "Audits physical store and digital website compliance with ADA accessibility.",
    tags: ["legal","legal","ada","title"],
    transform: createStandardSkillTransform({
      sectionName: "ADA Title III Public Accommodation Accessibility Standards",
      ruSectionName: "Стандарты и регламенты: ADA Title III Public Accommodation Accessibility",
      instructions: [
        "Apply core domain tenets for ADA Title III Public Accommodation Accessibility.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для ADA Title III Public Accommodation Accessibility.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","ada","title"],
    }),
  },

  "legal-securities-insider-trading-rule-10b5-1-trading-plan": {
    id: "legal-securities-insider-trading-rule-10b5-1-trading-plan",
    name: "SecuritiesInsiderTradingRule10b51TradingPlanSkill",
    displayName: "Securities Insider Trading Rule 10b5-1 Trading Plan",
    categoryId: "legal",
    description: "Structures pre-scheduled executive stock sale plans under Rule 10b5-1.",
    tags: ["legal","legal","securities","insider"],
    transform: createStandardSkillTransform({
      sectionName: "Securities Insider Trading Rule 10b5-1 Trading Plan Standards",
      ruSectionName: "Стандарты и регламенты: Securities Insider Trading Rule 10b5-1 Trading Plan",
      instructions: [
        "Apply core domain tenets for Securities Insider Trading Rule 10b5-1 Trading Plan.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Securities Insider Trading Rule 10b5-1 Trading Plan.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","securities","insider"],
    }),
  },

  "legal-healthcare-hipaa-breach-notification-rule": {
    id: "legal-healthcare-hipaa-breach-notification-rule",
    name: "HealthcareHIPAABreachNotificationRuleSkill",
    displayName: "Healthcare HIPAA Breach Notification Rule",
    categoryId: "legal",
    description: "Manages 60-day notification requirements following Protected Health Info leaks.",
    tags: ["legal","legal","healthcare","hipaa"],
    transform: createStandardSkillTransform({
      sectionName: "Healthcare HIPAA Breach Notification Rule Standards",
      ruSectionName: "Стандарты и регламенты: Healthcare HIPAA Breach Notification Rule",
      instructions: [
        "Apply core domain tenets for Healthcare HIPAA Breach Notification Rule.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Healthcare HIPAA Breach Notification Rule.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","healthcare","hipaa"],
    }),
  },

  "legal-commercial-debt-restructuring-workout-agreement": {
    id: "legal-commercial-debt-restructuring-workout-agreement",
    name: "CommercialDebtRestructuringWorkoutAgreementSkill",
    displayName: "Commercial Debt Restructuring Workout Agreement",
    categoryId: "legal",
    description: "Renegotiates distressed corporate debt terms outside formal bankruptcy.",
    tags: ["legal","legal","commercial","debt"],
    transform: createStandardSkillTransform({
      sectionName: "Commercial Debt Restructuring Workout Agreement Standards",
      ruSectionName: "Стандарты и регламенты: Commercial Debt Restructuring Workout Agreement",
      instructions: [
        "Apply core domain tenets for Commercial Debt Restructuring Workout Agreement.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Commercial Debt Restructuring Workout Agreement.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","commercial","debt"],
    }),
  },

  "legal-corporate-merger-stock-for-stock-reorganization": {
    id: "legal-corporate-merger-stock-for-stock-reorganization",
    name: "CorporateMergerStockforStockReorganizationSkill",
    displayName: "Corporate Merger Stock-for-Stock Reorganization",
    categoryId: "legal",
    description: "Drafts tax-free stock swap merger agreements.",
    tags: ["legal","legal","corporate","merger"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Merger Stock-for-Stock Reorganization Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Merger Stock-for-Stock Reorganization",
      instructions: [
        "Apply core domain tenets for Corporate Merger Stock-for-Stock Reorganization.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Merger Stock-for-Stock Reorganization.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","corporate","merger"],
    }),
  },

  "legal-environmental-superfund-cercla-contamination-liability": {
    id: "legal-environmental-superfund-cercla-contamination-liability",
    name: "EnvironmentalSuperfundCERCLAContaminationLiabilitySkill",
    displayName: "Environmental Superfund CERCLA Contamination Liability",
    categoryId: "legal",
    description: "Navigates strictly joint and several liability for hazardous waste cleanup.",
    tags: ["legal","legal","environmental","superfund"],
    transform: createStandardSkillTransform({
      sectionName: "Environmental Superfund CERCLA Contamination Liability Standards",
      ruSectionName: "Стандарты и регламенты: Environmental Superfund CERCLA Contamination Liability",
      instructions: [
        "Apply core domain tenets for Environmental Superfund CERCLA Contamination Liability.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Environmental Superfund CERCLA Contamination Liability.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","environmental","superfund"],
    }),
  },

  "legal-intellectual-property-injunction-ex-parte-order": {
    id: "legal-intellectual-property-injunction-ex-parte-order",
    name: "IntellectualPropertyInjunctionExParteOrderSkill",
    displayName: "Intellectual Property Injunction Ex Parte Order",
    categoryId: "legal",
    description: "Requests emergency court injunctions to seize counterfeit goods at borders.",
    tags: ["legal","legal","intellectual","property"],
    transform: createStandardSkillTransform({
      sectionName: "Intellectual Property Injunction Ex Parte Order Standards",
      ruSectionName: "Стандарты и регламенты: Intellectual Property Injunction Ex Parte Order",
      instructions: [
        "Apply core domain tenets for Intellectual Property Injunction Ex Parte Order.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Intellectual Property Injunction Ex Parte Order.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","intellectual","property"],
    }),
  },

  "legal-master-enterprise-legal-jurisprudence-constitution": {
    id: "legal-master-enterprise-legal-jurisprudence-constitution",
    name: "MasterEnterpriseLegalJurisprudenceConstitutionSkill",
    displayName: "Master Enterprise Legal Jurisprudence Constitution",
    categoryId: "legal",
    description: "Enforces world-class legal analysis, contract drafting, and regulatory compliance.",
    tags: ["legal","legal","master","enterprise"],
    transform: createStandardSkillTransform({
      sectionName: "Master Enterprise Legal Jurisprudence Constitution Standards",
      ruSectionName: "Стандарты и регламенты: Master Enterprise Legal Jurisprudence Constitution",
      instructions: [
        "Apply core domain tenets for Master Enterprise Legal Jurisprudence Constitution.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Master Enterprise Legal Jurisprudence Constitution.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","master","enterprise"],
    }),
  },

  "legal-legal-skill-90": {
    id: "legal-legal-skill-90",
    name: "legalSkill90Skill",
    displayName: "legal Skill 90",
    categoryId: "legal",
    description: "Applies advanced legal Skill 90 standards and execution patterns.",
    tags: ["legal","legal","legal","skill"],
    transform: createStandardSkillTransform({
      sectionName: "legal Skill 90 Standards",
      ruSectionName: "Стандарты и регламенты: legal Skill 90",
      instructions: [
        "Apply core domain tenets for legal Skill 90.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для legal Skill 90.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal","legal","skill"],
    }),
  },
  "legal-final-alternative-dispute-resolution-mediation-protocol": {
    id: "legal-final-alternative-dispute-resolution-mediation-protocol",
    name: "AlternativeDisputeResolutionMediationProtocolSkill",
    displayName: "Alternative Dispute Resolution Mediation Protocol",
    categoryId: "legal",
    description: "Guides pre-litigation commercial dispute resolution through structured mediation.",
    tags: ["legal","legal-final","final","alternative"],
    transform: createStandardSkillTransform({
      sectionName: "Alternative Dispute Resolution Mediation Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Alternative Dispute Resolution Mediation Protocol",
      instructions: [
        "Apply core domain tenets for Alternative Dispute Resolution Mediation Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Alternative Dispute Resolution Mediation Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","alternative"],
    }),
  },

  "legal-final-maritime-carriage-of-goods-by-sea-act-cogsa": {
    id: "legal-final-maritime-carriage-of-goods-by-sea-act-cogsa",
    name: "MaritimeCarriageofGoodsbySeaActCOGSASkill",
    displayName: "Maritime Carriage of Goods by Sea Act COGSA",
    categoryId: "legal",
    description: "Applies ocean carrier liability limits and bill of lading legal defenses.",
    tags: ["legal","legal-final","final","maritime"],
    transform: createStandardSkillTransform({
      sectionName: "Maritime Carriage of Goods by Sea Act COGSA Standards",
      ruSectionName: "Стандарты и регламенты: Maritime Carriage of Goods by Sea Act COGSA",
      instructions: [
        "Apply core domain tenets for Maritime Carriage of Goods by Sea Act COGSA.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Maritime Carriage of Goods by Sea Act COGSA.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","maritime"],
    }),
  },

  "legal-final-sovereign-debt-restructuring-paris-club-principles": {
    id: "legal-final-sovereign-debt-restructuring-paris-club-principles",
    name: "SovereignDebtRestructuringParisClubPrinciplesSkill",
    displayName: "Sovereign Debt Restructuring Paris Club Principles",
    categoryId: "legal",
    description: "Coordinates bilateral official sovereign debt rescheduling and comparability of treatment.",
    tags: ["legal","legal-final","final","sovereign"],
    transform: createStandardSkillTransform({
      sectionName: "Sovereign Debt Restructuring Paris Club Principles Standards",
      ruSectionName: "Стандарты и регламенты: Sovereign Debt Restructuring Paris Club Principles",
      instructions: [
        "Apply core domain tenets for Sovereign Debt Restructuring Paris Club Principles.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sovereign Debt Restructuring Paris Club Principles.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","sovereign"],
    }),
  },

  "legal-final-space-launch-liability-insurance-faa-authorization": {
    id: "legal-final-space-launch-liability-insurance-faa-authorization",
    name: "SpaceLaunchLiabilityInsuranceFAAAuthorizationSkill",
    displayName: "Space Launch Liability Insurance FAA Authorization",
    categoryId: "legal",
    description: "Navigates commercial space launch financial responsibility and FAA payload licenses.",
    tags: ["legal","legal-final","final","space"],
    transform: createStandardSkillTransform({
      sectionName: "Space Launch Liability Insurance FAA Authorization Standards",
      ruSectionName: "Стандарты и регламенты: Space Launch Liability Insurance FAA Authorization",
      instructions: [
        "Apply core domain tenets for Space Launch Liability Insurance FAA Authorization.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Space Launch Liability Insurance FAA Authorization.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","space"],
    }),
  },

  "legal-final-biometric-genetic-information-nondiscrimination-gina": {
    id: "legal-final-biometric-genetic-information-nondiscrimination-gina",
    name: "BiometricGeneticInformationNondiscriminationGINASkill",
    displayName: "Biometric Genetic Information Nondiscrimination GINA",
    categoryId: "legal",
    description: "Audits employment wellness programs for GINA and genetic data compliance.",
    tags: ["legal","legal-final","final","biometric"],
    transform: createStandardSkillTransform({
      sectionName: "Biometric Genetic Information Nondiscrimination GINA Standards",
      ruSectionName: "Стандарты и регламенты: Biometric Genetic Information Nondiscrimination GINA",
      instructions: [
        "Apply core domain tenets for Biometric Genetic Information Nondiscrimination GINA.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Biometric Genetic Information Nondiscrimination GINA.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","biometric"],
    }),
  },

  "legal-final-cross-border-chapter-15-ancillary-insolvency": {
    id: "legal-final-cross-border-chapter-15-ancillary-insolvency",
    name: "CrossBorderChapter15AncillaryInsolvencySkill",
    displayName: "Cross-Border Chapter 15 Ancillary Insolvency",
    categoryId: "legal",
    description: "Manages foreign main bankruptcy proceedings in US bankruptcy courts under Chapter 15.",
    tags: ["legal","legal-final","final","cross"],
    transform: createStandardSkillTransform({
      sectionName: "Cross-Border Chapter 15 Ancillary Insolvency Standards",
      ruSectionName: "Стандарты и регламенты: Cross-Border Chapter 15 Ancillary Insolvency",
      instructions: [
        "Apply core domain tenets for Cross-Border Chapter 15 Ancillary Insolvency.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cross-Border Chapter 15 Ancillary Insolvency.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","cross"],
    }),
  },

  "legal-final-telecommunications-spectrum-lease-tower-colocation": {
    id: "legal-final-telecommunications-spectrum-lease-tower-colocation",
    name: "TelecommunicationsSpectrumLeaseTowerColocationSkill",
    displayName: "Telecommunications Spectrum Lease Tower Colocation",
    categoryId: "legal",
    description: "Drafts wireless cell tower ground leases and DAS antenna colocation agreements.",
    tags: ["legal","legal-final","final","telecommunications"],
    transform: createStandardSkillTransform({
      sectionName: "Telecommunications Spectrum Lease Tower Colocation Standards",
      ruSectionName: "Стандарты и регламенты: Telecommunications Spectrum Lease Tower Colocation",
      instructions: [
        "Apply core domain tenets for Telecommunications Spectrum Lease Tower Colocation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Telecommunications Spectrum Lease Tower Colocation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","telecommunications"],
    }),
  },

  "legal-final-false-claims-act-qui-tam-whistleblower-defense": {
    id: "legal-final-false-claims-act-qui-tam-whistleblower-defense",
    name: "FalseClaimsActQuiTamWhistleblowerDefenseSkill",
    displayName: "False Claims Act Qui Tam Whistleblower Defense",
    categoryId: "legal",
    description: "Defends corporate healthcare and defense contractors against relator FCA suits.",
    tags: ["legal","legal-final","final","false"],
    transform: createStandardSkillTransform({
      sectionName: "False Claims Act Qui Tam Whistleblower Defense Standards",
      ruSectionName: "Стандарты и регламенты: False Claims Act Qui Tam Whistleblower Defense",
      instructions: [
        "Apply core domain tenets for False Claims Act Qui Tam Whistleblower Defense.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для False Claims Act Qui Tam Whistleblower Defense.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","false"],
    }),
  },

  "legal-final-environmental-clean-air-act-title-v-permitting": {
    id: "legal-final-environmental-clean-air-act-title-v-permitting",
    name: "EnvironmentalCleanAirActTitleVPermittingSkill",
    displayName: "Environmental Clean Air Act Title V Permitting",
    categoryId: "legal",
    description: "Audits industrial plant air emissions and major source operating permits.",
    tags: ["legal","legal-final","final","environmental"],
    transform: createStandardSkillTransform({
      sectionName: "Environmental Clean Air Act Title V Permitting Standards",
      ruSectionName: "Стандарты и регламенты: Environmental Clean Air Act Title V Permitting",
      instructions: [
        "Apply core domain tenets for Environmental Clean Air Act Title V Permitting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Environmental Clean Air Act Title V Permitting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","environmental"],
    }),
  },

  "legal-final-consumer-product-safety-cpsc-recall-protocol": {
    id: "legal-final-consumer-product-safety-cpsc-recall-protocol",
    name: "ConsumerProductSafetyCPSCRecallProtocolSkill",
    displayName: "Consumer Product Safety CPSC Recall Protocol",
    categoryId: "legal",
    description: "Executes CPSC Section 15(b) fast-track product safety defect reporting and recalls.",
    tags: ["legal","legal-final","final","consumer"],
    transform: createStandardSkillTransform({
      sectionName: "Consumer Product Safety CPSC Recall Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Consumer Product Safety CPSC Recall Protocol",
      instructions: [
        "Apply core domain tenets for Consumer Product Safety CPSC Recall Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Consumer Product Safety CPSC Recall Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","consumer"],
    }),
  },

  "legal-final-fda-510k-medical-device-clearance-pathway": {
    id: "legal-final-fda-510k-medical-device-clearance-pathway",
    name: "FDA510kMedicalDeviceClearancePathwaySkill",
    displayName: "FDA 510k Medical Device Clearance Pathway",
    categoryId: "legal",
    description: "Drafts 510(k) premarket notifications demonstrating substantial equivalence.",
    tags: ["legal","legal-final","final","fda"],
    transform: createStandardSkillTransform({
      sectionName: "FDA 510k Medical Device Clearance Pathway Standards",
      ruSectionName: "Стандарты и регламенты: FDA 510k Medical Device Clearance Pathway",
      instructions: [
        "Apply core domain tenets for FDA 510k Medical Device Clearance Pathway.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для FDA 510k Medical Device Clearance Pathway.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","fda"],
    }),
  },

  "legal-final-erisa-fiduciary-duty-pension-investment-policy": {
    id: "legal-final-erisa-fiduciary-duty-pension-investment-policy",
    name: "ERISAFiduciaryDutyPensionInvestmentPolicySkill",
    displayName: "ERISA Fiduciary Duty Pension Investment Policy",
    categoryId: "legal",
    description: "Ensures ERISA plan trustee compliance with the prudent expert rule and diversification.",
    tags: ["legal","legal-final","final","erisa"],
    transform: createStandardSkillTransform({
      sectionName: "ERISA Fiduciary Duty Pension Investment Policy Standards",
      ruSectionName: "Стандарты и регламенты: ERISA Fiduciary Duty Pension Investment Policy",
      instructions: [
        "Apply core domain tenets for ERISA Fiduciary Duty Pension Investment Policy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для ERISA Fiduciary Duty Pension Investment Policy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","erisa"],
    }),
  },

  "legal-final-itc-section-337-patent-import-exclusion-order": {
    id: "legal-final-itc-section-337-patent-import-exclusion-order",
    name: "ITCSection337PatentImportExclusionOrderSkill",
    displayName: "ITC Section 337 Patent Import Exclusion Order",
    categoryId: "legal",
    description: "Litigates unfair import trade practices before the International Trade Commission.",
    tags: ["legal","legal-final","final","itc"],
    transform: createStandardSkillTransform({
      sectionName: "ITC Section 337 Patent Import Exclusion Order Standards",
      ruSectionName: "Стандарты и регламенты: ITC Section 337 Patent Import Exclusion Order",
      instructions: [
        "Apply core domain tenets for ITC Section 337 Patent Import Exclusion Order.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для ITC Section 337 Patent Import Exclusion Order.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","itc"],
    }),
  },

  "legal-final-antitrust-hart-scott-rodino-premerger-filings": {
    id: "legal-final-antitrust-hart-scott-rodino-premerger-filings",
    name: "AntitrustHartScottRodinoPremergerFilingsSkill",
    displayName: "Antitrust Hart-Scott-Rodino Premerger Filings",
    categoryId: "legal",
    description: "Prepares FTC/DOJ HSR notification forms for high-value corporate acquisitions.",
    tags: ["legal","legal-final","final","antitrust"],
    transform: createStandardSkillTransform({
      sectionName: "Antitrust Hart-Scott-Rodino Premerger Filings Standards",
      ruSectionName: "Стандарты и регламенты: Antitrust Hart-Scott-Rodino Premerger Filings",
      instructions: [
        "Apply core domain tenets for Antitrust Hart-Scott-Rodino Premerger Filings.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Antitrust Hart-Scott-Rodino Premerger Filings.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","antitrust"],
    }),
  },

  "legal-final-corporate-officer-indemnification-deed-do-insurance": {
    id: "legal-final-corporate-officer-indemnification-deed-do-insurance",
    name: "CorporateOfficerIndemnificationDeedDOInsuranceSkill",
    displayName: "Corporate Officer Indemnification Deed DO Insurance",
    categoryId: "legal",
    description: "Structures advancement of legal fees and D&O insurance policy coverage.",
    tags: ["legal","legal-final","final","corporate"],
    transform: createStandardSkillTransform({
      sectionName: "Corporate Officer Indemnification Deed DO Insurance Standards",
      ruSectionName: "Стандарты и регламенты: Corporate Officer Indemnification Deed DO Insurance",
      instructions: [
        "Apply core domain tenets for Corporate Officer Indemnification Deed DO Insurance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Corporate Officer Indemnification Deed DO Insurance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","corporate"],
    }),
  },

  "legal-final-patent-prosecution-cpc-specification-drafting": {
    id: "legal-final-patent-prosecution-cpc-specification-drafting",
    name: "PatentProsecutionCPCSpecificationDraftingSkill",
    displayName: "Patent Prosecution CPC Specification Drafting",
    categoryId: "legal",
    description: "Drafts patent specifications and claims formatted for CPC classification.",
    tags: ["legal","legal-final","final","patent"],
    transform: createStandardSkillTransform({
      sectionName: "Patent Prosecution CPC Specification Drafting Standards",
      ruSectionName: "Стандарты и регламенты: Patent Prosecution CPC Specification Drafting",
      instructions: [
        "Apply core domain tenets for Patent Prosecution CPC Specification Drafting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Patent Prosecution CPC Specification Drafting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","patent"],
    }),
  },

  "legal-final-franchise-disclosure-item-19-performance-audit": {
    id: "legal-final-franchise-disclosure-item-19-performance-audit",
    name: "FranchiseDisclosureItem19PerformanceAuditSkill",
    displayName: "Franchise Disclosure Item 19 Performance Audit",
    categoryId: "legal",
    description: "Audits item 19 Financial Performance Representations in Franchise Disclosure Documents.",
    tags: ["legal","legal-final","final","franchise"],
    transform: createStandardSkillTransform({
      sectionName: "Franchise Disclosure Item 19 Performance Audit Standards",
      ruSectionName: "Стандарты и регламенты: Franchise Disclosure Item 19 Performance Audit",
      instructions: [
        "Apply core domain tenets for Franchise Disclosure Item 19 Performance Audit.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Franchise Disclosure Item 19 Performance Audit.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","franchise"],
    }),
  },

  "legal-final-intellectual-property-co-existence-trademark-settlement": {
    id: "legal-final-intellectual-property-co-existence-trademark-settlement",
    name: "IntellectualPropertyCoExistenceTrademarkSettlementSkill",
    displayName: "Intellectual Property Co-Existence Trademark Settlement",
    categoryId: "legal",
    description: "Drafts worldwide trademark co-existence agreements with geographic boundaries.",
    tags: ["legal","legal-final","final","intellectual"],
    transform: createStandardSkillTransform({
      sectionName: "Intellectual Property Co-Existence Trademark Settlement Standards",
      ruSectionName: "Стандарты и регламенты: Intellectual Property Co-Existence Trademark Settlement",
      instructions: [
        "Apply core domain tenets for Intellectual Property Co-Existence Trademark Settlement.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Intellectual Property Co-Existence Trademark Settlement.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","intellectual"],
    }),
  },

  "legal-final-municipal-bond-official-statement-disclosure-counsel": {
    id: "legal-final-municipal-bond-official-statement-disclosure-counsel",
    name: "MunicipalBondOfficialStatementDisclosureCounselSkill",
    displayName: "Municipal Bond Official Statement Disclosure Counsel",
    categoryId: "legal",
    description: "Drafts primary disclosure documents for tax-exempt municipal bond issuances.",
    tags: ["legal","legal-final","final","municipal"],
    transform: createStandardSkillTransform({
      sectionName: "Municipal Bond Official Statement Disclosure Counsel Standards",
      ruSectionName: "Стандарты и регламенты: Municipal Bond Official Statement Disclosure Counsel",
      instructions: [
        "Apply core domain tenets for Municipal Bond Official Statement Disclosure Counsel.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Municipal Bond Official Statement Disclosure Counsel.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","municipal"],
    }),
  },

  "legal-final-ferc-interstate-natural-gas-pipeline-tariff": {
    id: "legal-final-ferc-interstate-natural-gas-pipeline-tariff",
    name: "FERCInterstateNaturalGasPipelineTariffSkill",
    displayName: "FERC Interstate Natural Gas Pipeline Tariff",
    categoryId: "legal",
    description: "Navigates Federal Energy Regulatory Commission open-access transmission tariffs.",
    tags: ["legal","legal-final","final","ferc"],
    transform: createStandardSkillTransform({
      sectionName: "FERC Interstate Natural Gas Pipeline Tariff Standards",
      ruSectionName: "Стандарты и регламенты: FERC Interstate Natural Gas Pipeline Tariff",
      instructions: [
        "Apply core domain tenets for FERC Interstate Natural Gas Pipeline Tariff.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для FERC Interstate Natural Gas Pipeline Tariff.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","ferc"],
    }),
  },

  "legal-final-native-american-tribal-gaming-compact-sovereignty": {
    id: "legal-final-native-american-tribal-gaming-compact-sovereignty",
    name: "NativeAmericanTribalGamingCompactSovereigntySkill",
    displayName: "Native American Tribal Gaming Compact Sovereignty",
    categoryId: "legal",
    description: "Drafts Class III Indian gaming compacts balancing state and tribal authority.",
    tags: ["legal","legal-final","final","native"],
    transform: createStandardSkillTransform({
      sectionName: "Native American Tribal Gaming Compact Sovereignty Standards",
      ruSectionName: "Стандарты и регламенты: Native American Tribal Gaming Compact Sovereignty",
      instructions: [
        "Apply core domain tenets for Native American Tribal Gaming Compact Sovereignty.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Native American Tribal Gaming Compact Sovereignty.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","native"],
    }),
  },

  "legal-final-cyber-liability-incident-response-forensics-privilege": {
    id: "legal-final-cyber-liability-incident-response-forensics-privilege",
    name: "CyberLiabilityIncidentResponseForensicsPrivilegeSkill",
    displayName: "Cyber Liability Incident Response Forensics Privilege",
    categoryId: "legal",
    description: "Directs cybersecurity breach investigations under attorney-client privilege.",
    tags: ["legal","legal-final","final","cyber"],
    transform: createStandardSkillTransform({
      sectionName: "Cyber Liability Incident Response Forensics Privilege Standards",
      ruSectionName: "Стандарты и регламенты: Cyber Liability Incident Response Forensics Privilege",
      instructions: [
        "Apply core domain tenets for Cyber Liability Incident Response Forensics Privilege.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cyber Liability Incident Response Forensics Privilege.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","cyber"],
    }),
  },

  "legal-final-cfpb-unfair-deceptive-abusive-practice-udaap": {
    id: "legal-final-cfpb-unfair-deceptive-abusive-practice-udaap",
    name: "CFPBUnfairDeceptiveAbusivePracticeUDAAPSkill",
    displayName: "CFPB Unfair Deceptive Abusive Practice UDAAP",
    categoryId: "legal",
    description: "Audits consumer fintech lending flows for CFPB UDAAP enforcement risks.",
    tags: ["legal","legal-final","final","cfpb"],
    transform: createStandardSkillTransform({
      sectionName: "CFPB Unfair Deceptive Abusive Practice UDAAP Standards",
      ruSectionName: "Стандарты и регламенты: CFPB Unfair Deceptive Abusive Practice UDAAP",
      instructions: [
        "Apply core domain tenets for CFPB Unfair Deceptive Abusive Practice UDAAP.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для CFPB Unfair Deceptive Abusive Practice UDAAP.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","cfpb"],
    }),
  },

  "legal-final-international-commercial-agency-treaty-cisg": {
    id: "legal-final-international-commercial-agency-treaty-cisg",
    name: "InternationalCommercialAgencyTreatyCISGSkill",
    displayName: "International Commercial Agency Treaty CISG",
    categoryId: "legal",
    description: "Structures cross-border distributor agreements under local agency protection laws.",
    tags: ["legal","legal-final","final","international"],
    transform: createStandardSkillTransform({
      sectionName: "International Commercial Agency Treaty CISG Standards",
      ruSectionName: "Стандарты и регламенты: International Commercial Agency Treaty CISG",
      instructions: [
        "Apply core domain tenets for International Commercial Agency Treaty CISG.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для International Commercial Agency Treaty CISG.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","international"],
    }),
  },

  "legal-final-master-jurisprudence-constitutional-legal-systems": {
    id: "legal-final-master-jurisprudence-constitutional-legal-systems",
    name: "MasterJurisprudenceConstitutionalLegalSystemsSkill",
    displayName: "Master Jurisprudence Constitutional Legal Systems",
    categoryId: "legal",
    description: "Enforces world-class legal analysis, statutory interpretation, and contract jurisprudence.",
    tags: ["legal","legal-final","final","master"],
    transform: createStandardSkillTransform({
      sectionName: "Master Jurisprudence Constitutional Legal Systems Standards",
      ruSectionName: "Стандарты и регламенты: Master Jurisprudence Constitutional Legal Systems",
      instructions: [
        "Apply core domain tenets for Master Jurisprudence Constitutional Legal Systems.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Master Jurisprudence Constitutional Legal Systems.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["legal","legal-final","final","master"],
    }),
  },
  "legal-multi-multi-jurisdictional-cross-border-m-a-due-diligence": {
    id: "legal-multi-multi-jurisdictional-cross-border-m-a-due-diligence",
    name: "MultiJurisdictionalCrossBorderMADueDiligenceSkill",
    displayName: "Multi Jurisdictional Cross Border M A Due Diligence",
    categoryId: "legal",
    description: "Audits target company legal compliance across US, EU, UK, and Asian jurisdictions.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Jurisdictional Cross Border M A Due Diligence",
      ruSectionName: "Композитный Multi-Skill: Multi Jurisdictional Cross Border M A Due Diligence",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Jurisdictional Cross Border M A Due Diligence.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Jurisdictional Cross Border M A Due Diligence.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-layer-commercial-msa-indemnification-negotiation": {
    id: "legal-multi-multi-layer-commercial-msa-indemnification-negotiation",
    name: "MultiLayerCommercialMSAIndemnificationNegotiationSkill",
    displayName: "Multi Layer Commercial MSA Indemnification Negotiation",
    categoryId: "legal",
    description: "Drafts master service agreements balancing liability caps, mutual indemnities, and IP rights.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Commercial MSA Indemnification Negotiation",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Commercial MSA Indemnification Negotiation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Commercial MSA Indemnification Negotiation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Commercial MSA Indemnification Negotiation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-patent-infringement-freedom-to-operate-fto": {
    id: "legal-multi-multi-stage-patent-infringement-freedom-to-operate-fto",
    name: "MultiStagePatentInfringementFreedomtoOperateFTOSkill",
    displayName: "Multi Stage Patent Infringement Freedom to Operate FTO",
    categoryId: "legal",
    description: "Analyzes patent claim trees, prior art, and product specs evaluating infringement risks.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Patent Infringement Freedom to Operate FTO",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Patent Infringement Freedom to Operate FTO",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Patent Infringement Freedom to Operate FTO.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Patent Infringement Freedom to Operate FTO.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-regulatory-data-privacy-gdpr-ccpa-cpra-audit": {
    id: "legal-multi-multi-regulatory-data-privacy-gdpr-ccpa-cpra-audit",
    name: "MultiRegulatoryDataPrivacyGDPRCCPACPRAAuditSkill",
    displayName: "Multi Regulatory Data Privacy GDPR CCPA CPRA Audit",
    categoryId: "legal",
    description: "Audits data processing agreements, cross-border transfers, SCCs, and consent mechanisms.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Regulatory Data Privacy GDPR CCPA CPRA Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Regulatory Data Privacy GDPR CCPA CPRA Audit",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Regulatory Data Privacy GDPR CCPA CPRA Audit.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Regulatory Data Privacy GDPR CCPA CPRA Audit.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-tier-corporate-governance-board-resolution-drafter": {
    id: "legal-multi-multi-tier-corporate-governance-board-resolution-drafter",
    name: "MultiTierCorporateGovernanceBoardResolutionDrafterSkill",
    displayName: "Multi Tier Corporate Governance Board Resolution Drafter",
    categoryId: "legal",
    description: "Drafts corporate resolutions, board minutes, shareholder agreements, and voting trusts.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Tier Corporate Governance Board Resolution Drafter",
      ruSectionName: "Композитный Multi-Skill: Multi Tier Corporate Governance Board Resolution Drafter",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Tier Corporate Governance Board Resolution Drafter.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Tier Corporate Governance Board Resolution Drafter.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-party-intellectual-property-assignment-agreement": {
    id: "legal-multi-multi-party-intellectual-property-assignment-agreement",
    name: "MultiPartyIntellectualPropertyAssignmentAgreementSkill",
    displayName: "Multi Party Intellectual Property Assignment Agreement",
    categoryId: "legal",
    description: "Drafts IP assignment agreements securing founder, employee, and contractor inventions.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Party Intellectual Property Assignment Agreement",
      ruSectionName: "Композитный Multi-Skill: Multi Party Intellectual Property Assignment Agreement",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Party Intellectual Property Assignment Agreement.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Party Intellectual Property Assignment Agreement.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-employment-non-compete-severance-playbook": {
    id: "legal-multi-multi-stage-employment-non-compete-severance-playbook",
    name: "MultiStageEmploymentNonCompeteSeverancePlaybookSkill",
    displayName: "Multi Stage Employment Non Compete Severance Playbook",
    categoryId: "legal",
    description: "Drafts executive employment agreements with non-solicit, non-compete, and severance terms.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Employment Non Compete Severance Playbook",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Employment Non Compete Severance Playbook",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Employment Non Compete Severance Playbook.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Employment Non Compete Severance Playbook.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-layer-software-license-agreement-sla-eula-drafter": {
    id: "legal-multi-multi-layer-software-license-agreement-sla-eula-drafter",
    name: "MultiLayerSoftwareLicenseAgreementSLAEULADrafterSkill",
    displayName: "Multi Layer Software License Agreement SLA EULA Drafter",
    categoryId: "legal",
    description: "Drafts enterprise SaaS SLAs, end-user license agreements, and uptime credit terms.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Software License Agreement SLA EULA Drafter",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Software License Agreement SLA EULA Drafter",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Software License Agreement SLA EULA Drafter.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Software License Agreement SLA EULA Drafter.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-forum-international-arbitration-clause-drafter": {
    id: "legal-multi-multi-forum-international-arbitration-clause-drafter",
    name: "MultiForumInternationalArbitrationClauseDrafterSkill",
    displayName: "Multi Forum International Arbitration Clause Drafter",
    categoryId: "legal",
    description: "Structures ICC/LCIA arbitration clauses specifying seat, language, governing law, and rules.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Forum International Arbitration Clause Drafter",
      ruSectionName: "Композитный Multi-Skill: Multi Forum International Arbitration Clause Drafter",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Forum International Arbitration Clause Drafter.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Forum International Arbitration Clause Drafter.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-regulatory-antitrust-hart-scott-rodino-clearance": {
    id: "legal-multi-multi-regulatory-antitrust-hart-scott-rodino-clearance",
    name: "MultiRegulatoryAntitrustHartScottRodinoClearanceSkill",
    displayName: "Multi Regulatory Antitrust Hart Scott Rodino Clearance",
    categoryId: "legal",
    description: "Prepares HSR premerger notifications evaluating market concentration and overlaps.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Regulatory Antitrust Hart Scott Rodino Clearance",
      ruSectionName: "Композитный Multi-Skill: Multi Regulatory Antitrust Hart Scott Rodino Clearance",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Regulatory Antitrust Hart Scott Rodino Clearance.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Regulatory Antitrust Hart Scott Rodino Clearance.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-commercial-real-estate-triple-net-nnn-lease": {
    id: "legal-multi-multi-stage-commercial-real-estate-triple-net-nnn-lease",
    name: "MultiStageCommercialRealEstateTripleNetNNNLeaseSkill",
    displayName: "Multi Stage Commercial Real Estate Triple Net NNN Lease",
    categoryId: "legal",
    description: "Drafts NNN commercial lease agreements detailing CAM expenses, tenant improvements, and default.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Commercial Real Estate Triple Net NNN Lease",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Commercial Real Estate Triple Net NNN Lease",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Commercial Real Estate Triple Net NNN Lease.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Commercial Real Estate Triple Net NNN Lease.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-layer-hipaa-business-associate-agreement-baa": {
    id: "legal-multi-multi-layer-hipaa-business-associate-agreement-baa",
    name: "MultiLayerHIPAABusinessAssociateAgreementBAASkill",
    displayName: "Multi Layer HIPAA Business Associate Agreement BAA",
    categoryId: "legal",
    description: "Drafts healthcare BAAs establishing PHI data safeguards, breach reporting, and audits.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer HIPAA Business Associate Agreement BAA",
      ruSectionName: "Композитный Multi-Skill: Multi Layer HIPAA Business Associate Agreement BAA",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer HIPAA Business Associate Agreement BAA.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer HIPAA Business Associate Agreement BAA.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-party-joint-venture-strategic-alliance-agreement": {
    id: "legal-multi-multi-party-joint-venture-strategic-alliance-agreement",
    name: "MultiPartyJointVentureStrategicAllianceAgreementSkill",
    displayName: "Multi Party Joint Venture Strategic Alliance Agreement",
    categoryId: "legal",
    description: "Structures JV governance, profit splits, capital calls, deadlock resolution, and buyouts.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Party Joint Venture Strategic Alliance Agreement",
      ruSectionName: "Композитный Multi-Skill: Multi Party Joint Venture Strategic Alliance Agreement",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Party Joint Venture Strategic Alliance Agreement.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Party Joint Venture Strategic Alliance Agreement.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-whistleblower-internal-investigation-protocol": {
    id: "legal-multi-multi-stage-whistleblower-internal-investigation-protocol",
    name: "MultiStageWhistleblowerInternalInvestigationProtocolSkill",
    displayName: "Multi Stage Whistleblower Internal Investigation Protocol",
    categoryId: "legal",
    description: "Directs privileged corporate internal investigations into fraud or compliance violations.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Whistleblower Internal Investigation Protocol",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Whistleblower Internal Investigation Protocol",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Whistleblower Internal Investigation Protocol.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Whistleblower Internal Investigation Protocol.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-tier-venture-capital-safe-convertible-note-instrument": {
    id: "legal-multi-multi-tier-venture-capital-safe-convertible-note-instrument",
    name: "MultiTierVentureCapitalSAFEConvertibleNoteInstrumentSkill",
    displayName: "Multi Tier Venture Capital SAFE Convertible Note Instrument",
    categoryId: "legal",
    description: "Drafts YC SAFE notes, valuation caps, discount rates, and pro-rata investor rights.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Tier Venture Capital SAFE Convertible Note Instrument",
      ruSectionName: "Композитный Multi-Skill: Multi Tier Venture Capital SAFE Convertible Note Instrument",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Tier Venture Capital SAFE Convertible Note Instrument.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Tier Venture Capital SAFE Convertible Note Instrument.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-regulatory-export-control-ear-itar-sanctions-audit": {
    id: "legal-multi-multi-regulatory-export-control-ear-itar-sanctions-audit",
    name: "MultiRegulatoryExportControlEARITARSanctionsAuditSkill",
    displayName: "Multi Regulatory Export Control EAR ITAR Sanctions Audit",
    categoryId: "legal",
    description: "Audits dual-use technology exports against BIS Commerce Control Lists and OFAC sanctions.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Regulatory Export Control EAR ITAR Sanctions Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Regulatory Export Control EAR ITAR Sanctions Audit",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Regulatory Export Control EAR ITAR Sanctions Audit.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Regulatory Export Control EAR ITAR Sanctions Audit.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-layer-trademark-opposition-ttab-proceeding": {
    id: "legal-multi-multi-layer-trademark-opposition-ttab-proceeding",
    name: "MultiLayerTrademarkOppositionTTABProceedingSkill",
    displayName: "Multi Layer Trademark Opposition TTAB Proceeding",
    categoryId: "legal",
    description: "Drafts TTAB trademark opposition notices, responses, likelihood of confusion briefs.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Trademark Opposition TTAB Proceeding",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Trademark Opposition TTAB Proceeding",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Trademark Opposition TTAB Proceeding.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Trademark Opposition TTAB Proceeding.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-securities-reg-d-private-placement-memorandum": {
    id: "legal-multi-multi-stage-securities-reg-d-private-placement-memorandum",
    name: "MultiStageSecuritiesRegDPrivatePlacementMemorandumSkill",
    displayName: "Multi Stage Securities Reg D Private Placement Memorandum",
    categoryId: "legal",
    description: "Drafts PPM disclosure documents, accredited investor questionnaires, and Form D filings.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Securities Reg D Private Placement Memorandum",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Securities Reg D Private Placement Memorandum",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Securities Reg D Private Placement Memorandum.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Securities Reg D Private Placement Memorandum.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-party-construction-epc-engineering-procurement-contract": {
    id: "legal-multi-multi-party-construction-epc-engineering-procurement-contract",
    name: "MultiPartyConstructionEPCEngineeringProcurementContractSkill",
    displayName: "Multi Party Construction EPC Engineering Procurement Contract",
    categoryId: "legal",
    description: "Drafts lump-sum EPC contracts with liquidated damages, performance guarantees, and delays.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Party Construction EPC Engineering Procurement Contract",
      ruSectionName: "Композитный Multi-Skill: Multi Party Construction EPC Engineering Procurement Contract",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Party Construction EPC Engineering Procurement Contract.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Party Construction EPC Engineering Procurement Contract.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-layer-open-source-software-copyleft-gpl-audit": {
    id: "legal-multi-multi-layer-open-source-software-copyleft-gpl-audit",
    name: "MultiLayerOpenSourceSoftwareCopyleftGPLAuditSkill",
    displayName: "Multi Layer Open Source Software Copyleft GPL Audit",
    categoryId: "legal",
    description: "Audits codebase for open source license compliance preventing viral copyleft triggers.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Open Source Software Copyleft GPL Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Open Source Software Copyleft GPL Audit",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Open Source Software Copyleft GPL Audit.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Open Source Software Copyleft GPL Audit.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-civil-litigation-deposition-outline-strategy": {
    id: "legal-multi-multi-stage-civil-litigation-deposition-outline-strategy",
    name: "MultiStageCivilLitigationDepositionOutlineStrategySkill",
    displayName: "Multi Stage Civil Litigation Deposition Outline Strategy",
    categoryId: "legal",
    description: "Drafts witness deposition questioning outlines, document impeachment exhibits, and objections.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Civil Litigation Deposition Outline Strategy",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Civil Litigation Deposition Outline Strategy",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Civil Litigation Deposition Outline Strategy.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Civil Litigation Deposition Outline Strategy.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-regulatory-consumer-financial-cfpb-udaap-compliance": {
    id: "legal-multi-multi-regulatory-consumer-financial-cfpb-udaap-compliance",
    name: "MultiRegulatoryConsumerFinancialCFPBUDAAPComplianceSkill",
    displayName: "Multi Regulatory Consumer Financial CFPB UDAAP Compliance",
    categoryId: "legal",
    description: "Audits fintech lending flows for unfair, deceptive, or abusive acts or practices.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Regulatory Consumer Financial CFPB UDAAP Compliance",
      ruSectionName: "Композитный Multi-Skill: Multi Regulatory Consumer Financial CFPB UDAAP Compliance",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Regulatory Consumer Financial CFPB UDAAP Compliance.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Regulatory Consumer Financial CFPB UDAAP Compliance.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-party-commercial-maritime-carriage-of-goods-cogsa": {
    id: "legal-multi-multi-party-commercial-maritime-carriage-of-goods-cogsa",
    name: "MultiPartyCommercialMaritimeCarriageofGoodsCOGSASkill",
    displayName: "Multi Party Commercial Maritime Carriage of Goods COGSA",
    categoryId: "legal",
    description: "Drafts bills of lading, charter party agreements, and ocean carrier liability claims.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Party Commercial Maritime Carriage of Goods COGSA",
      ruSectionName: "Композитный Multi-Skill: Multi Party Commercial Maritime Carriage of Goods COGSA",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Party Commercial Maritime Carriage of Goods COGSA.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Party Commercial Maritime Carriage of Goods COGSA.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-product-liability-defect-defense-strategy": {
    id: "legal-multi-multi-stage-product-liability-defect-defense-strategy",
    name: "MultiStageProductLiabilityDefectDefenseStrategySkill",
    displayName: "Multi Stage Product Liability Defect Defense Strategy",
    categoryId: "legal",
    description: "Defends manufacturing design defect claims under strict liability and negligence standards.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Product Liability Defect Defense Strategy",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Product Liability Defect Defense Strategy",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Product Liability Defect Defense Strategy.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Product Liability Defect Defense Strategy.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-layer-sovereign-debt-restructuring-paris-club-rules": {
    id: "legal-multi-multi-layer-sovereign-debt-restructuring-paris-club-rules",
    name: "MultiLayerSovereignDebtRestructuringParisClubRulesSkill",
    displayName: "Multi Layer Sovereign Debt Restructuring Paris Club Rules",
    categoryId: "legal",
    description: "Navigates sovereign bond restructuring, comparability of treatment, and debt swaps.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Sovereign Debt Restructuring Paris Club Rules",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Sovereign Debt Restructuring Paris Club Rules",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Sovereign Debt Restructuring Paris Club Rules.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Sovereign Debt Restructuring Paris Club Rules.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-party-telecommunications-cell-tower-lease-master": {
    id: "legal-multi-multi-party-telecommunications-cell-tower-lease-master",
    name: "MultiPartyTelecommunicationsCellTowerLeaseMasterSkill",
    displayName: "Multi Party Telecommunications Cell Tower Lease Master",
    categoryId: "legal",
    description: "Drafts wireless tower ground leases, colocation rights, and fiber backhaul easements.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Party Telecommunications Cell Tower Lease Master",
      ruSectionName: "Композитный Multi-Skill: Multi Party Telecommunications Cell Tower Lease Master",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Party Telecommunications Cell Tower Lease Master.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Party Telecommunications Cell Tower Lease Master.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-false-claims-act-qui-tam-whistleblower-defense": {
    id: "legal-multi-multi-stage-false-claims-act-qui-tam-whistleblower-defense",
    name: "MultiStageFalseClaimsActQuiTamWhistleblowerDefenseSkill",
    displayName: "Multi Stage False Claims Act Qui Tam Whistleblower Defense",
    categoryId: "legal",
    description: "Defends healthcare/defense contractors against relator FCA suits and CID subpoenas.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage False Claims Act Qui Tam Whistleblower Defense",
      ruSectionName: "Композитный Multi-Skill: Multi Stage False Claims Act Qui Tam Whistleblower Defense",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage False Claims Act Qui Tam Whistleblower Defense.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage False Claims Act Qui Tam Whistleblower Defense.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-regulatory-environmental-clean-air-act-permitting": {
    id: "legal-multi-multi-regulatory-environmental-clean-air-act-permitting",
    name: "MultiRegulatoryEnvironmentalCleanAirActPermittingSkill",
    displayName: "Multi Regulatory Environmental Clean Air Act Permitting",
    categoryId: "legal",
    description: "Audits industrial plant Title V air operating permits and EPA emission compliance.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Regulatory Environmental Clean Air Act Permitting",
      ruSectionName: "Композитный Multi-Skill: Multi Regulatory Environmental Clean Air Act Permitting",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Regulatory Environmental Clean Air Act Permitting.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Regulatory Environmental Clean Air Act Permitting.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-party-consumer-product-safety-cpsc-recall-protocol": {
    id: "legal-multi-multi-party-consumer-product-safety-cpsc-recall-protocol",
    name: "MultiPartyConsumerProductSafetyCPSCRecallProtocolSkill",
    displayName: "Multi Party Consumer Product Safety CPSC Recall Protocol",
    categoryId: "legal",
    description: "Executes CPSC fast-track product safety defect reporting and recall plan management.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Party Consumer Product Safety CPSC Recall Protocol",
      ruSectionName: "Композитный Multi-Skill: Multi Party Consumer Product Safety CPSC Recall Protocol",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Party Consumer Product Safety CPSC Recall Protocol.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Party Consumer Product Safety CPSC Recall Protocol.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-fda-510k-medical-device-clearance-pathway": {
    id: "legal-multi-multi-stage-fda-510k-medical-device-clearance-pathway",
    name: "MultiStageFDA510kMedicalDeviceClearancePathwaySkill",
    displayName: "Multi Stage FDA 510k Medical Device Clearance Pathway",
    categoryId: "legal",
    description: "Drafts 510(k) premarket notifications demonstrating substantial equivalence.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage FDA 510k Medical Device Clearance Pathway",
      ruSectionName: "Композитный Multi-Skill: Multi Stage FDA 510k Medical Device Clearance Pathway",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage FDA 510k Medical Device Clearance Pathway.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage FDA 510k Medical Device Clearance Pathway.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-regulatory-erisa-pension-plan-fiduciary-audit": {
    id: "legal-multi-multi-regulatory-erisa-pension-plan-fiduciary-audit",
    name: "MultiRegulatoryERISAPensionPlanFiduciaryAuditSkill",
    displayName: "Multi Regulatory ERISA Pension Plan Fiduciary Audit",
    categoryId: "legal",
    description: "Ensures plan trustee compliance with prudent expert rule, fee disclosures, and investments.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Regulatory ERISA Pension Plan Fiduciary Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Regulatory ERISA Pension Plan Fiduciary Audit",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Regulatory ERISA Pension Plan Fiduciary Audit.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Regulatory ERISA Pension Plan Fiduciary Audit.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-forum-itc-section-337-patent-import-exclusion": {
    id: "legal-multi-multi-forum-itc-section-337-patent-import-exclusion",
    name: "MultiForumITCSection337PatentImportExclusionSkill",
    displayName: "Multi Forum ITC Section 337 Patent Import Exclusion",
    categoryId: "legal",
    description: "Litigates unfair import trade practices before International Trade Commission.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Forum ITC Section 337 Patent Import Exclusion",
      ruSectionName: "Композитный Multi-Skill: Multi Forum ITC Section 337 Patent Import Exclusion",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Forum ITC Section 337 Patent Import Exclusion.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Forum ITC Section 337 Patent Import Exclusion.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-layer-corporate-officer-d-o-indemnification-deed": {
    id: "legal-multi-multi-layer-corporate-officer-d-o-indemnification-deed",
    name: "MultiLayerCorporateOfficerDOIndemnificationDeedSkill",
    displayName: "Multi Layer Corporate Officer D O Indemnification Deed",
    categoryId: "legal",
    description: "Structures advancement of legal fees, side-A D&O coverage, and tail policy terms.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Corporate Officer D O Indemnification Deed",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Corporate Officer D O Indemnification Deed",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Corporate Officer D O Indemnification Deed.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Corporate Officer D O Indemnification Deed.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-patent-prosecution-cpc-claim-drafting": {
    id: "legal-multi-multi-stage-patent-prosecution-cpc-claim-drafting",
    name: "MultiStagePatentProsecutionCPCClaimDraftingSkill",
    displayName: "Multi Stage Patent Prosecution CPC Claim Drafting",
    categoryId: "legal",
    description: "Drafts patent specifications and independent/dependent claims formatted for CPC.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Patent Prosecution CPC Claim Drafting",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Patent Prosecution CPC Claim Drafting",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Patent Prosecution CPC Claim Drafting.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Patent Prosecution CPC Claim Drafting.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-regulatory-franchise-disclosure-document-fdd-audit": {
    id: "legal-multi-multi-regulatory-franchise-disclosure-document-fdd-audit",
    name: "MultiRegulatoryFranchiseDisclosureDocumentFDDAuditSkill",
    displayName: "Multi Regulatory Franchise Disclosure Document FDD Audit",
    categoryId: "legal",
    description: "Audits Item 19 Financial Performance Representations in FDD filings.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Regulatory Franchise Disclosure Document FDD Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Regulatory Franchise Disclosure Document FDD Audit",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Regulatory Franchise Disclosure Document FDD Audit.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Regulatory Franchise Disclosure Document FDD Audit.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-party-trademark-co-existence-settlement-agreement": {
    id: "legal-multi-multi-party-trademark-co-existence-settlement-agreement",
    name: "MultiPartyTrademarkCoExistenceSettlementAgreementSkill",
    displayName: "Multi Party Trademark Co-Existence Settlement Agreement",
    categoryId: "legal",
    description: "Drafts worldwide trademark co-existence agreements with geographic boundaries.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Party Trademark Co-Existence Settlement Agreement",
      ruSectionName: "Композитный Multi-Skill: Multi Party Trademark Co-Existence Settlement Agreement",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Party Trademark Co-Existence Settlement Agreement.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Party Trademark Co-Existence Settlement Agreement.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-municipal-bond-official-statement-disclosure": {
    id: "legal-multi-multi-stage-municipal-bond-official-statement-disclosure",
    name: "MultiStageMunicipalBondOfficialStatementDisclosureSkill",
    displayName: "Multi Stage Municipal Bond Official Statement Disclosure",
    categoryId: "legal",
    description: "Drafts primary disclosure documents for tax-exempt municipal bond issuances.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Municipal Bond Official Statement Disclosure",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Municipal Bond Official Statement Disclosure",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Municipal Bond Official Statement Disclosure.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Municipal Bond Official Statement Disclosure.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-regulatory-ferc-interstate-natural-gas-pipeline-tariff": {
    id: "legal-multi-multi-regulatory-ferc-interstate-natural-gas-pipeline-tariff",
    name: "MultiRegulatoryFERCInterstateNaturalGasPipelineTariffSkill",
    displayName: "Multi Regulatory FERC Interstate Natural Gas Pipeline Tariff",
    categoryId: "legal",
    description: "Navigates Federal Energy Regulatory Commission open-access transmission tariffs.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Regulatory FERC Interstate Natural Gas Pipeline Tariff",
      ruSectionName: "Композитный Multi-Skill: Multi Regulatory FERC Interstate Natural Gas Pipeline Tariff",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Regulatory FERC Interstate Natural Gas Pipeline Tariff.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Regulatory FERC Interstate Natural Gas Pipeline Tariff.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-party-native-american-tribal-gaming-compact": {
    id: "legal-multi-multi-party-native-american-tribal-gaming-compact",
    name: "MultiPartyNativeAmericanTribalGamingCompactSkill",
    displayName: "Multi Party Native American Tribal Gaming Compact",
    categoryId: "legal",
    description: "Drafts Class III Indian gaming compacts balancing state and tribal sovereignty.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Party Native American Tribal Gaming Compact",
      ruSectionName: "Композитный Multi-Skill: Multi Party Native American Tribal Gaming Compact",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Party Native American Tribal Gaming Compact.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Party Native American Tribal Gaming Compact.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-cyber-breach-privilege-incident-response": {
    id: "legal-multi-multi-stage-cyber-breach-privilege-incident-response",
    name: "MultiStageCyberBreachPrivilegeIncidentResponseSkill",
    displayName: "Multi Stage Cyber Breach Privilege Incident Response",
    categoryId: "legal",
    description: "Directs cybersecurity breach investigations under attorney-client privilege.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Cyber Breach Privilege Incident Response",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Cyber Breach Privilege Incident Response",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Cyber Breach Privilege Incident Response.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Cyber Breach Privilege Incident Response.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-regulatory-commercial-banking-aml-bsa-compliance": {
    id: "legal-multi-multi-regulatory-commercial-banking-aml-bsa-compliance",
    name: "MultiRegulatoryCommercialBankingAMLBSAComplianceSkill",
    displayName: "Multi Regulatory Commercial Banking AML BSA Compliance",
    categoryId: "legal",
    description: "Audits Anti-Money Laundering and Bank Secrecy Act Know-Your-Customer (KYC) flows.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Regulatory Commercial Banking AML BSA Compliance",
      ruSectionName: "Композитный Multi-Skill: Multi Regulatory Commercial Banking AML BSA Compliance",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Regulatory Commercial Banking AML BSA Compliance.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Regulatory Commercial Banking AML BSA Compliance.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-party-cross-border-asset-purchase-agreement-apa": {
    id: "legal-multi-multi-party-cross-border-asset-purchase-agreement-apa",
    name: "MultiPartyCrossBorderAssetPurchaseAgreementAPASkill",
    displayName: "Multi Party Cross Border Asset Purchase Agreement APA",
    categoryId: "legal",
    description: "Drafts asset acquisition agreements, representation/warranties, and escrow terms.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Party Cross Border Asset Purchase Agreement APA",
      ruSectionName: "Композитный Multi-Skill: Multi Party Cross Border Asset Purchase Agreement APA",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Party Cross Border Asset Purchase Agreement APA.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Party Cross Border Asset Purchase Agreement APA.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-civil-rights-ada-title-iii-accessibility-defense": {
    id: "legal-multi-multi-stage-civil-rights-ada-title-iii-accessibility-defense",
    name: "MultiStageCivilRightsADATitleIIIAccessibilityDefenseSkill",
    displayName: "Multi Stage Civil Rights ADA Title III Accessibility Defense",
    categoryId: "legal",
    description: "Defends commercial website and physical facility ADA accessibility lawsuits.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Civil Rights ADA Title III Accessibility Defense",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Civil Rights ADA Title III Accessibility Defense",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Civil Rights ADA Title III Accessibility Defense.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Civil Rights ADA Title III Accessibility Defense.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-layer-force-majeure-commercial-frustration-defense": {
    id: "legal-multi-multi-layer-force-majeure-commercial-frustration-defense",
    name: "MultiLayerForceMajeureCommercialFrustrationDefenseSkill",
    displayName: "Multi Layer Force Majeure Commercial Frustration Defense",
    categoryId: "legal",
    description: "Evaluates force majeure contract triggers, impossibility, and impracticability defenses.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Force Majeure Commercial Frustration Defense",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Force Majeure Commercial Frustration Defense",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Force Majeure Commercial Frustration Defense.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Force Majeure Commercial Frustration Defense.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-party-commercial-aircraft-equipment-trust-lease": {
    id: "legal-multi-multi-party-commercial-aircraft-equipment-trust-lease",
    name: "MultiPartyCommercialAircraftEquipmentTrustLeaseSkill",
    displayName: "Multi Party Commercial Aircraft Equipment Trust Lease",
    categoryId: "legal",
    description: "Drafts airline aircraft leasing, Cape Town Convention filings, and engine maintenance reserves.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Party Commercial Aircraft Equipment Trust Lease",
      ruSectionName: "Композитный Multi-Skill: Multi Party Commercial Aircraft Equipment Trust Lease",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Party Commercial Aircraft Equipment Trust Lease.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Party Commercial Aircraft Equipment Trust Lease.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-class-action-waiver-consumer-arbitration": {
    id: "legal-multi-multi-stage-class-action-waiver-consumer-arbitration",
    name: "MultiStageClassActionWaiverConsumerArbitrationSkill",
    displayName: "Multi Stage Class Action Waiver Consumer Arbitration",
    categoryId: "legal",
    description: "Drafts enforceable consumer arbitration clauses and class action waiver provisions.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Class Action Waiver Consumer Arbitration",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Class Action Waiver Consumer Arbitration",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Class Action Waiver Consumer Arbitration.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Class Action Waiver Consumer Arbitration.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-regulatory-insurance-solvency-naic-financial-audit": {
    id: "legal-multi-multi-regulatory-insurance-solvency-naic-financial-audit",
    name: "MultiRegulatoryInsuranceSolvencyNAICFinancialAuditSkill",
    displayName: "Multi Regulatory Insurance Solvency NAIC Financial Audit",
    categoryId: "legal",
    description: "Audits insurance company statutory accounting principles and reserve adequacy.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Regulatory Insurance Solvency NAIC Financial Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Regulatory Insurance Solvency NAIC Financial Audit",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Regulatory Insurance Solvency NAIC Financial Audit.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Regulatory Insurance Solvency NAIC Financial Audit.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-party-cross-border-technology-transfer-licensing": {
    id: "legal-multi-multi-party-cross-border-technology-transfer-licensing",
    name: "MultiPartyCrossBorderTechnologyTransferLicensingSkill",
    displayName: "Multi Party Cross Border Technology Transfer Licensing",
    categoryId: "legal",
    description: "Structures cross-border tech licensing agreements with withholding tax optimizations.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Party Cross Border Technology Transfer Licensing",
      ruSectionName: "Композитный Multi-Skill: Multi Party Cross Border Technology Transfer Licensing",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Party Cross Border Technology Transfer Licensing.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Party Cross Border Technology Transfer Licensing.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-labor-union-collective-bargaining-agreement": {
    id: "legal-multi-multi-stage-labor-union-collective-bargaining-agreement",
    name: "MultiStageLaborUnionCollectiveBargainingAgreementSkill",
    displayName: "Multi Stage Labor Union Collective Bargaining Agreement",
    categoryId: "legal",
    description: "Drafts CBA terms covering wages, grievances, seniority rights, and strike clauses.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Labor Union Collective Bargaining Agreement",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Labor Union Collective Bargaining Agreement",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Labor Union Collective Bargaining Agreement.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Labor Union Collective Bargaining Agreement.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-regulatory-biometric-data-privacy-bipa-audit": {
    id: "legal-multi-multi-regulatory-biometric-data-privacy-bipa-audit",
    name: "MultiRegulatoryBiometricDataPrivacyBIPAAuditSkill",
    displayName: "Multi Regulatory Biometric Data Privacy BIPA Audit",
    categoryId: "legal",
    description: "Audits employee and customer biometric data collection consent protocols under BIPA.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Regulatory Biometric Data Privacy BIPA Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Regulatory Biometric Data Privacy BIPA Audit",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Regulatory Biometric Data Privacy BIPA Audit.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Regulatory Biometric Data Privacy BIPA Audit.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-party-renewable-energy-solar-ground-lease-easement": {
    id: "legal-multi-multi-party-renewable-energy-solar-ground-lease-easement",
    name: "MultiPartyRenewableEnergySolarGroundLeaseEasementSkill",
    displayName: "Multi Party Renewable Energy Solar Ground Lease Easement",
    categoryId: "legal",
    description: "Drafts long-term utility-scale solar ground leases, decommissioning bonds, and easements.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Party Renewable Energy Solar Ground Lease Easement",
      ruSectionName: "Композитный Multi-Skill: Multi Party Renewable Energy Solar Ground Lease Easement",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Party Renewable Energy Solar Ground Lease Easement.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Party Renewable Energy Solar Ground Lease Easement.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-criminal-defense-white-collar-subpoena-response": {
    id: "legal-multi-multi-stage-criminal-defense-white-collar-subpoena-response",
    name: "MultiStageCriminalDefenseWhiteCollarSubpoenaResponseSkill",
    displayName: "Multi Stage Criminal Defense White Collar Subpoena Response",
    categoryId: "legal",
    description: "Coordinates grand jury subpoena response, document holds, and employee interviews.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Criminal Defense White Collar Subpoena Response",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Criminal Defense White Collar Subpoena Response",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Criminal Defense White Collar Subpoena Response.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Criminal Defense White Collar Subpoena Response.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-regulatory-pharmaceutical-drug-price-transparency": {
    id: "legal-multi-multi-regulatory-pharmaceutical-drug-price-transparency",
    name: "MultiRegulatoryPharmaceuticalDrugPriceTransparencySkill",
    displayName: "Multi Regulatory Pharmaceutical Drug Price Transparency",
    categoryId: "legal",
    description: "Navigates state drug price transparency filings and IRA inflation rebate rules.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Regulatory Pharmaceutical Drug Price Transparency",
      ruSectionName: "Композитный Multi-Skill: Multi Regulatory Pharmaceutical Drug Price Transparency",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Regulatory Pharmaceutical Drug Price Transparency.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Regulatory Pharmaceutical Drug Price Transparency.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-party-entertainment-film-production-rights-clearance": {
    id: "legal-multi-multi-party-entertainment-film-production-rights-clearance",
    name: "MultiPartyEntertainmentFilmProductionRightsClearanceSkill",
    displayName: "Multi Party Entertainment Film Production Rights Clearance",
    categoryId: "legal",
    description: "Clears life story rights, synchronization music licenses, and location releases.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Party Entertainment Film Production Rights Clearance",
      ruSectionName: "Композитный Multi-Skill: Multi Party Entertainment Film Production Rights Clearance",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Party Entertainment Film Production Rights Clearance.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Party Entertainment Film Production Rights Clearance.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-chapter-11-corporate-bankruptcy-reorganization": {
    id: "legal-multi-multi-stage-chapter-11-corporate-bankruptcy-reorganization",
    name: "MultiStageChapter11CorporateBankruptcyReorganizationSkill",
    displayName: "Multi Stage Chapter 11 Corporate Bankruptcy Reorganization",
    categoryId: "legal",
    description: "Drafts debtor-in-possession (DIP) financing motions, disclosure statements, and plans.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Chapter 11 Corporate Bankruptcy Reorganization",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Chapter 11 Corporate Bankruptcy Reorganization",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Chapter 11 Corporate Bankruptcy Reorganization.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Chapter 11 Corporate Bankruptcy Reorganization.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-regulatory-federal-election-commission-fec-compliance": {
    id: "legal-multi-multi-regulatory-federal-election-commission-fec-compliance",
    name: "MultiRegulatoryFederalElectionCommissionFECComplianceSkill",
    displayName: "Multi Regulatory Federal Election Commission FEC Compliance",
    categoryId: "legal",
    description: "Audits PAC corporate contributions, lobbyist disclosure reports, and campaign finance.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Regulatory Federal Election Commission FEC Compliance",
      ruSectionName: "Композитный Multi-Skill: Multi Regulatory Federal Election Commission FEC Compliance",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Regulatory Federal Election Commission FEC Compliance.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Regulatory Federal Election Commission FEC Compliance.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-party-commercial-franchising-territory-protection": {
    id: "legal-multi-multi-party-commercial-franchising-territory-protection",
    name: "MultiPartyCommercialFranchisingTerritoryProtectionSkill",
    displayName: "Multi Party Commercial Franchising Territory Protection",
    categoryId: "legal",
    description: "Drafts exclusive franchisee territory boundaries, right of first refusal, and covenants.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Party Commercial Franchising Territory Protection",
      ruSectionName: "Композитный Multi-Skill: Multi Party Commercial Franchising Territory Protection",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Party Commercial Franchising Territory Protection.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Party Commercial Franchising Territory Protection.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-stage-intellectual-property-trade-secret-audit": {
    id: "legal-multi-multi-stage-intellectual-property-trade-secret-audit",
    name: "MultiStageIntellectualPropertyTradeSecretAuditSkill",
    displayName: "Multi Stage Intellectual Property Trade Secret Audit",
    categoryId: "legal",
    description: "Establishes NDA protocols, reasonable secrecy measures, and DTSA enforcement.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Intellectual Property Trade Secret Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Intellectual Property Trade Secret Audit",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Intellectual Property Trade Secret Audit.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Intellectual Property Trade Secret Audit.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-regulatory-distilled-spirits-ttb-labeling-compliance": {
    id: "legal-multi-multi-regulatory-distilled-spirits-ttb-labeling-compliance",
    name: "MultiRegulatoryDistilledSpiritsTTBLabelingComplianceSkill",
    displayName: "Multi Regulatory Distilled Spirits TTB Labeling Compliance",
    categoryId: "legal",
    description: "Navigates TTB COLA alcoholic beverage label approvals and formula filings.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Regulatory Distilled Spirits TTB Labeling Compliance",
      ruSectionName: "Композитный Multi-Skill: Multi Regulatory Distilled Spirits TTB Labeling Compliance",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Regulatory Distilled Spirits TTB Labeling Compliance.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Regulatory Distilled Spirits TTB Labeling Compliance.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },

  "legal-multi-multi-horizon-master-legal-jurisprudence-drafting-engine": {
    id: "legal-multi-multi-horizon-master-legal-jurisprudence-drafting-engine",
    name: "MultiHorizonMasterLegalJurisprudenceDraftingEngineSkill",
    displayName: "Multi Horizon Master Legal Jurisprudence Drafting Engine",
    categoryId: "legal",
    description: "Enforces master statutory analysis, contract drafting, regulatory compliance, and risk mitigation.",
    tags: ["legal","multi-skill","legal-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Master Legal Jurisprudence Drafting Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Master Legal Jurisprudence Drafting Engine",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Horizon Master Legal Jurisprudence Drafting Engine.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Horizon Master Legal Jurisprudence Drafting Engine.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["legal","multi-skill","legal-multi"],
    }),
  },
};
