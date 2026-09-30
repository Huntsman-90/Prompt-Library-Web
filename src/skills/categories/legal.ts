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
};
