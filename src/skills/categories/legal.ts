import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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
};
