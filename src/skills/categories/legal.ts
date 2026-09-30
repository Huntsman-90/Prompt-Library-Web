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
};
