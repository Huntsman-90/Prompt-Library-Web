const newLegalSkills = [
  {
    id: 'indemnification-and-hold-harmless-audit',
    name: 'IndemnificationAndHoldHarmlessAuditSkill',
    displayName: 'Indemnification, Defense & Hold Harmless Clause Analysis',
    categoryId: 'legal',
    description: 'Scrutinizes scope of indemnification triggers (IP infringement, gross negligence, third-party claims) and defense control mechanisms.',
    tags: ['legal', 'contracts', 'indemnification', 'risk-allocation', 'liability'],
    sectionName: 'Indemnification & Defense Scope Analysis',
    ruSectionName: 'Анализ условий возмещения убытков и освобождения от ответственности',
    semanticType: 'analysis_protocol',
    instructions: [
      'Dissect the three distinct obligations: Indemnify (pay damages), Defend (provide legal counsel), Hold Harmless (exonerate).',
      'Ensure IP infringement indemnity includes explicit carve-outs (customer modifications, unauthorized combinations).',
      'Verify whether indemnification obligations are subject to or expressly carved out of the general Limitation of Liability cap.'
    ],
    ruInstructions: [
      'Разграничьте три обязательства: возместить убытки (Indemnify), предоставить защиту (Defend) и освободить от претензий (Hold Harmless).',
      'Проверьте исключения в IP-индемнити (модификации заказчика, нецелевое использование).',
      'Уточните, входит ли индемнити под общий лимит ответственности или является исключением без лимита.'
    ]
  },
  {
    id: 'gdpr-dpa-standard-contractual-clauses',
    name: 'GdprDpaStandardContractualClausesSkill',
    displayName: 'GDPR Data Processing Agreement (DPA) & EU SCCs',
    categoryId: 'legal',
    description: 'Reviews Article 28 DPA terms, sub-processor notification windows, audit rights, and Module 1-4 Standard Contractual Clauses for cross-border data transfers.',
    tags: ['legal', 'gdpr', 'privacy', 'dpa', 'scc', 'cross-border-transfers'],
    sectionName: 'GDPR DPA & Cross-Border Transfer Compliance',
    ruSectionName: 'Соответствие GDPR DPA и стандартным договорным условиям (SCC)',
    semanticType: 'process_directive',
    instructions: [
      'Verify mandatory Article 28 terms (processing instructions, confidentiality, security measures, sub-processor authorization).',
      'Select applicable EU SCC Module (Controller-to-Controller, Controller-to-Processor, Processor-to-Processor, Processor-to-Controller).',
      'Conduct a Transfer Impact Assessment (TIA) documenting supplementary technical/encryption measures.'
    ],
    ruInstructions: [
      'Проверьте обязательные условия ст. 28 GDPR (инструкции обработки, аудит, субобработчики).',
      'Выберите корректный модуль SCC (C2C, C2P, P2P, P2C) для трансграничной передачи.',
      'Опишите оценку рисков передачи (TIA) и дополнительные технические меры шифрования.'
    ]
  },
  {
    id: 'intellectual-property-work-for-hire-assignment',
    name: 'IntellectualPropertyWorkForHireAssignmentSkill',
    displayName: 'IP Assignment, Work Made for Hire & Moral Rights Waiver',
    categoryId: 'legal',
    description: 'Ensures bulletproof intellectual property assignment from employees, contractors, and agency partners with express moral rights waivers.',
    tags: ['legal', 'intellectual-property', 'work-made-for-hire', 'assignment', 'copyright'],
    sectionName: 'IP Assignment & Ownership Verification',
    ruSectionName: 'Передача прав на интеллектуальную собственность и отказ от неимущественных прав',
    semanticType: 'process_directive',
    instructions: [
      'Include explicit "present assignment" language ("hereby assigns all right, title, and interest" vs "agrees to assign").',
      'Incorporate comprehensive Work Made for Hire clauses covering worldwide copyrights, patents, trade secrets, and designs.',
      'Secure irrevocable waivers of author moral rights (droit moral) to the maximum extent permitted by applicable law.'
    ],
    ruInstructions: [
      'Используйте формулировки немедленной передачи прав в настоящем времени ("hereby assigns", а не "agrees to assign").',
      'Включите условия служебного произведения (Work Made for Hire) на все результаты интеллектуальной деятельности.',
      'Зафиксируйте безотзывный отказ от неотчуждаемых авторских прав в рамках применимого права.'
    ]
  },
  {
    id: 'non-compete-non-solicit-enforceability-audit',
    name: 'NonCompeteNonSolicitEnforceabilityAuditSkill',
    displayName: 'Restrictive Covenants Enforceability (Non-Compete & Non-Solicit)',
    categoryId: 'legal',
    description: 'Audits restrictive covenants against FTC non-compete bans, state blue-pencil doctrines, temporal reasonableness, and geographical scope limits.',
    tags: ['legal', 'employment', 'non-compete', 'non-solicit', 'covenants'],
    sectionName: 'Restrictive Covenant Enforceability Audit',
    ruSectionName: 'Аудит юридической силы соглашений о неконкуренции и непереманивании',
    semanticType: 'analysis_protocol',
    instructions: [
      'Check jurisdiction-specific enforceability rules (e.g. California strict ban vs Delaware blue-pencil doctrine).',
      'Ensure non-solicitation clauses are strictly tailored to clients/employees with whom the person had direct material contact.',
      'Insert severability and reformation clauses allowing court modification of overbroad terms.'
    ],
    ruInstructions: [
      'Проверьте региональное законодательство (полный запрет non-compete в Калифорнии vs модификация условий судом).',
      'Ограничьте non-solicitation только клиентами и сотрудниками, с которыми был непосредственный контакт.',
      'Включите оговорку о делимости договора для сохранения силы остальных пунктов.'
    ]
  },
  {
    id: 'safes-convertible-notes-most-favored-nation',
    name: 'SafesConvertibleNotesMostFavoredNationSkill',
    displayName: 'SAFE & Convertible Note MFN & Pro-Rata Rights',
    categoryId: 'legal',
    description: 'Evaluates Most Favored Nation (MFN) clauses, pro-rata side letters, valuation caps, and discount rates in startup financing instruments.',
    tags: ['legal', 'venture-capital', 'safe', 'convertible-note', 'mfn'],
    sectionName: 'Venture Financing Instrument Analysis',
    ruSectionName: 'Анализ инвестиционных инструментов SAFE, MFN и прав Pro-Rata',
    semanticType: 'analysis_protocol',
    instructions: [
      'Verify whether the SAFE is structured as Pre-Money or Post-Money (standard Y Combinator post-money).',
      'Examine MFN clause triggering conditions upon issuance of subsequent convertible notes with superior terms.',
      'Check Pro-Rata side letter agreements to prevent unintended super-dilutive investor rights.'
    ],
    ruInstructions: [
      'Уточните структуру SAFE: pre-money или post-money (стандарт YC post-money).',
      'Проверьте условия срабатывания пункта MFN (режим наибольшего благоприятствования) при следующих раундах.',
      'Оцените соглашения о преимущественном праве выкупа (Pro-Rata) во избежание чрезмерного размытия.'
    ]
  },
  {
    id: 'force-majeure-supply-chain-disruption',
    name: 'ForceMajeureSupplyChainDisruptionSkill',
    displayName: 'Force Majeure, Frustration of Purpose & Commercial Impracticability',
    categoryId: 'legal',
    description: 'Interprets force majeure triggering events (epidemics, embargoes, war, grid failure) and procedural notice deadlines under UCC 2-615 and common law.',
    tags: ['legal', 'contracts', 'force-majeure', 'supply-chain', 'litigation-risk'],
    sectionName: 'Force Majeure & Impracticability Analysis',
    ruSectionName: 'Анализ форс-мажора и невозможности исполнения обязательств',
    semanticType: 'analysis_protocol',
    instructions: [
      'Scrutinize force majeure event enumerations (specifically whether pandemics, cyberattacks, or supply bottlenecks are listed).',
      'Check strict mandatory notice cure periods (e.g. written notice within 5 business days of occurrence).',
      'Verify whether the invoking party is under an express duty to mitigate damages and find alternate sourcing.'
    ],
    ruInstructions: [
      'Изучите перечень форс-мажорных событий (включены ли кибератаки, пандемии, сбои электросетей).',
      'Проверьте соблюдение сроков обязательного письменного уведомления контрагента.',
      'Убедитесь в наличии обязанности стороны минимизировать ущерб и искать альтернативные поставки.'
    ]
  },
  {
    id: 'whistleblower-internal-investigation-protocol',
    name: 'WhistleblowerInternalInvestigationProtocolSkill',
    displayName: 'Whistleblower Complaint & Internal Investigation Protocol',
    categoryId: 'legal',
    description: 'Establishes privileged internal investigation procedures ensuring attorney-client privilege, Upjohn warnings, and anti-retaliation compliance.',
    tags: ['legal', 'compliance', 'investigations', 'whistleblower', 'upjohn-warning'],
    sectionName: 'Internal Investigation & Upjohn Protocol',
    ruSectionName: 'Протокол внутреннего расследования и предупреждения Апджона (Upjohn)',
    semanticType: 'process_directive',
    instructions: [
      'Deliver formal Upjohn Warning to interviewees ("Counsel represents the Company, not you personally; privilege belongs solely to Company").',
      'Maintain strict attorney-client privilege and work-product doctrine document labeling.',
      'Enforce anti-retaliation safeguards protecting the whistleblower from adverse employment actions.'
    ],
    ruInstructions: [
      'Озвучьте предупреждение Upjohn ("Юрист представляет компанию, а не вас лично; тайна принадлежит компании").',
      'Маркируйте все рабочие материалы грифом адвокатской тайны (Attorney-Client Privileged).',
      'Обеспечьте защиту заявителя (whistleblower) от дискриминации и увольнения.'
    ]
  },
  {
    id: 'fiduciary-duty-business-judgment-rule',
    name: 'FiduciaryDutyBusinessJudgmentRuleSkill',
    displayName: 'Board of Directors Fiduciary Duties & Business Judgment Rule',
    categoryId: 'legal',
    description: 'Evaluates Director Duty of Care, Duty of Loyalty, Duty of Good Faith, and conflicts of interest under Delaware General Corporation Law (DGCL).',
    tags: ['legal', 'corporate-governance', 'fiduciary-duty', 'delaware-law', 'business-judgment'],
    sectionName: 'Fiduciary Duty & Board Governance Analysis',
    ruSectionName: 'Анализ фидуциарных обязанностей директоров и правила делового решения',
    semanticType: 'analysis_protocol',
    instructions: [
      'Examine Duty of Care: Did the board act on an informed basis with adequate expert diligence?',
      'Examine Duty of Loyalty: Are there interested directors? Was the transaction vetted by an independent special committee?',
      'Verify applicability of the Business Judgment Rule presumption shielding board decisions from judicial second-guessing.'
    ],
    ruInstructions: [
      'Проверьте обязанность осмотрительности (Duty of Care): было ли решение обоснованным и всесторонним?',
      'Проверьте обязанность лояльности (Duty of Loyalty): нет ли конфликта интересов у членов совета директоров?',
      'Оцените защиту решения презумпцией правила делового суждения (Business Judgment Rule).'
    ]
  },
  {
    id: 'source-code-escrow-agreement-triggers',
    name: 'SourceCodeEscrowAgreementTriggersSkill',
    displayName: 'Software Source Code Escrow & Release Triggers',
    categoryId: 'legal',
    description: 'Structures software escrow agreements defining verified deposit materials, testing schedules, and strict release trigger events.',
    tags: ['legal', 'software-escrow', 'ip-licensing', 'b2b-contracts', 'source-code'],
    sectionName: 'Source Code Escrow Architecture',
    ruSectionName: 'Архитектура депонирования исходного кода (Escrow) и триггеры раскрытия',
    semanticType: 'process_directive',
    instructions: [
      'Specify exact deposit materials: full source code, compiler versions, build scripts, third-party libraries, and documentation.',
      'Define objective Release Conditions (bankruptcy, insolvency, dissolution, uncured material breach of maintenance SLA).',
      'Limit licensee rights upon release strictly to internal maintenance and support without redistribution rights.'
    ],
    ruInstructions: [
      'Определите состав депонируемого пакета: исходный код, скрипты сборки, компиляторы, документация.',
      'Задайте объективные триггеры раскрытия (банкротство, ликвидация, отказ вендора от поддержки SLA).',
      'Ограничьте права лицензиата после раскрытия только поддержкой и исправлением багов без перепродажи.'
    ]
  },
  {
    id: 'open-source-gpl-copyleft-license-audit',
    name: 'OpenSourceGplCopyleftLicenseAuditSkill',
    displayName: 'Open Source License Compliance (GPL / AGPL Copyleft Audit)',
    categoryId: 'legal',
    description: 'Audits software dependencies to eliminate viral copyleft contamination (GPLv3, AGPLv3) of proprietary commercial codebases.',
    tags: ['legal', 'open-source', 'gpl', 'agpl', 'copyleft', 'license-compliance'],
    sectionName: 'Open Source License Compliance Audit',
    ruSectionName: 'Аудит лицензионной чистоты Open Source (GPL / AGPL Copyleft)',
    semanticType: 'analysis_protocol',
    instructions: [
      'Categorize all dependencies: Permissive (MIT, Apache 2.0, BSD), Weak Copyleft (LGPL, MPL), Strong Copyleft (GPLv2/v3), Network Copyleft (AGPLv3).',
      'Identify static vs dynamic linking risks that could force disclosure of proprietary application source code.',
      'Recommend dual-licensing or alternative permissive library replacements.'
    ],
    ruInstructions: [
      'Классифицируйте зависимости: разрешительные (MIT/Apache), слабый copyleft (LGPL), вирусный (GPL) и сетевой (AGPL).',
      'Оцените риски динамической и статической линковки для коммерческого кода.',
      'Предложите замену вирусных библиотек на разрешительные аналоги или коммерческие лицензии.'
    ]
  },
  {
    id: 'trademark-clearance-and-knockout-search',
    name: 'TrademarkClearanceAndKnockoutSearchSkill',
    displayName: 'Trademark Clearance & Knockout Likelihood of Confusion',
    categoryId: 'legal',
    description: 'Assesses proposed brand and product names across USPTO/EUIPO databases for phonetic similarity, commercial impression, and related goods overlap.',
    tags: ['legal', 'trademark', 'intellectual-property', 'clearance-search', 'brand-protection'],
    sectionName: 'Trademark Clearance & Risk Assessment',
    ruSectionName: 'Проверка товарных знаков и оценка риска смешения (Likelihood of Confusion)',
    semanticType: 'analysis_protocol',
    instructions: [
      'Analyze the DuPont factors: similarity of marks in sound, appearance, and meaning.',
      'Evaluate relatedness of goods/services across Nice Classifications.',
      'Score trademark distinctiveness (Fanciful/Arbitrary = Strongest, Suggestive = Defensible, Descriptive = Weak/Refusal risk).'
    ],
    ruInstructions: [
      'Проверьте фонетическое, смысловое и визуальное сходство знаков (критерии DuPont).',
      'Сопоставьте пересечения классов товаров и услуг по МКТУ.',
      'Оцените различительную способность обозначения (фантазийное, ассоциативное или описательное).'
    ]
  },
  {
    id: 'anti-bribery-fcpa-anti-corruption-audit',
    name: 'AntiBriberyFcpaAntiCorruptionAuditSkill',
    displayName: 'FCPA & UK Bribery Act Anti-Corruption Compliance',
    categoryId: 'legal',
    description: 'Screens international business dealings, third-party intermediaries, and gifts/hospitality against Foreign Corrupt Practices Act prohibitions.',
    tags: ['legal', 'fcpa', 'anti-corruption', 'bribery', 'compliance'],
    sectionName: 'FCPA & Anti-Corruption Audit Protocol',
    ruSectionName: 'Аудит антикоррупционного комплаенса (FCPA и UK Bribery Act)',
    semanticType: 'process_directive',
    instructions: [
      'Screen transactions involving foreign officials, state-owned enterprises, or government tenders.',
      'Audit third-party sales agents, customs brokers, and consultants for red flags (unusual commissions, offshore accounts).',
      'Enforce strict hospitality, travel expense, and political contribution approval thresholds.'
    ],
    ruInstructions: [
      'Проверьте сделки с участием госслужащих, госкомпаний и участие в госзакупках.',
      'Проведите аудит агентов и брокеров на предмет подозрительных комиссий и офшорных счетов.',
      'Установите жесткие лимиты на подарки, представительские расходы и благотворительность.'
    ]
  },
  {
    id: 'terms-of-service-class-action-waiver-arbitration',
    name: 'TermsOfServiceClassActionWaiverArbitrationSkill',
    displayName: 'Terms of Service Mandatory Arbitration & Class Action Waiver',
    categoryId: 'legal',
    description: 'Drafts enforceable consumer ToS dispute clauses including informal negotiation periods, AAA/JAMS arbitration, and class action waivers.',
    tags: ['legal', 'terms-of-service', 'arbitration', 'class-action-waiver', 'consumer-law'],
    sectionName: 'Arbitration & Class Action Waiver Architecture',
    ruSectionName: 'Арбитражная оговорка ToS и отказ от коллективных исков',
    semanticType: 'process_directive',
    instructions: [
      'Incorporate a mandatory 30-day informal dispute resolution notice window.',
      'Draft express, conspicuous class action and representative action waivers.',
      'Provide a 30-day opt-out mechanism to enhance judicial enforceability against unconscionability challenges.'
    ],
    ruInstructions: [
      'Включите обязательный 30-дневный этап досудебного урегулирования споров.',
      'Сформулируйте явный и заметный отказ от коллективных и представительских исков.',
      'Предусмотрите право пользователя отказаться от арбитража в течение 30 дней для устойчивости в суде.'
    ]
  },
  {
    id: 'ai-governance-eu-ai-act-risk-classification',
    name: 'AiGovernanceEuAiActRiskClassificationSkill',
    displayName: 'EU AI Act Risk Classification & Compliance Mandates',
    categoryId: 'legal',
    description: 'Classifies AI systems into Prohibited, High-Risk, Limited, or Minimal risk tiers under the EU AI Act and outlines compliance obligations.',
    tags: ['legal', 'ai-act', 'ai-governance', 'compliance', 'high-risk-ai'],
    sectionName: 'EU AI Act Risk Classification Matrix',
    ruSectionName: 'Классификация систем ИИ по регламенту EU AI Act',
    semanticType: 'analysis_protocol',
    instructions: [
      'Check for Prohibited AI practices (subliminal manipulation, social scoring, real-time remote biometric ID in public spaces).',
      'Audit against Annex III High-Risk domains (critical infrastructure, employment recruiting, credit scoring, law enforcement).',
      'Specify conformity assessment, risk management system, data governance, and human oversight (Article 14) requirements.'
    ],
    ruInstructions: [
      'Проверьте наличие запрещенных практик (манипуляция сознанием, социальный скоринг, биометрия).',
      'Оцените систему на соответствие категории высокого риска по Приложению III (найм, кредиты, инфраструктура).',
      'Сформулируйте требования к оценке соответствия, управлению рисками и контролю со стороны человека (ст. 14).'
    ]
  },
  {
    id: 'severance-agreement-adea-older-workers-benefit',
    name: 'SeveranceAgreementAdeaOlderWorkersBenefitSkill',
    displayName: 'Severance Agreements & OWBPA / ADEA Compliance',
    categoryId: 'legal',
    description: 'Drafts employment separation agreements complying with the Older Workers Benefit Protection Act (21/45-day review and 7-day revocation periods).',
    tags: ['legal', 'employment', 'severance', 'owbpa', 'adea', 'release-of-claims'],
    sectionName: 'Severance & OWBPA Compliance Protocol',
    ruSectionName: 'Соглашения о расторжении трудового договора и соблюдение OWBPA/ADEA',
    semanticType: 'process_directive',
    instructions: [
      'Provide mandatory 21-day consideration period for individual terminations (45 days for group/reduction-in-force exits).',
      'Include statutory 7-day post-signing revocation period that cannot be waived.',
      'Attach Exhibit listing job titles and ages of selected vs unselected individuals in group layoff programs.'
    ],
    ruInstructions: [
      'Предоставьте обязательный 21 день на рассмотрение для индивидуальных увольнений (45 дней для сокращения штата).',
      'Включите 7-дневный период безоговорочного отзыва соглашения после подписания.',
      'Приложите таблицу должностей и возрастов сокращаемых и остающихся сотрудников при групповом увольнении.'
    ]
  },
  {
    id: 'venture-capital-term-sheet-protective-provisions',
    name: 'VentureCapitalTermSheetProtectiveProvisionsSkill',
    displayName: 'VC Series A Term Sheet Protective Provisions & Governance',
    categoryId: 'legal',
    description: 'Reviews Series A investor term sheets for board composition, voting thresholds, drag-along rights, and negative covenants.',
    tags: ['legal', 'venture-capital', 'term-sheet', 'protective-provisions', 'series-a'],
    sectionName: 'VC Term Sheet Governance & Protective Clauses',
    ruSectionName: 'Защитные положения и корпоративный контроль в Term Sheet Series A',
    semanticType: 'analysis_protocol',
    instructions: [
      'Audit investor veto rights (protective provisions) over budget, debt issuance, executive hires, and M&A.',
      'Structure Drag-Along rights with fair founder and common majority vote protections.',
      'Balance Board of Directors composition (Founders, Investor Nominees, Independent Industry Expert).'
    ],
    ruInstructions: [
      'Проверьте перечень вето инвесторов (изменение устава, займы, найм топ-менеджмента, M&A).',
      'Сбалансируйте условия принудительной продажи (Drag-Along) защитой интересов основателей.',
      'Сформируйте сбалансированный состав совета директоров (основатели, инвесторы, независимый эксперт).'
    ]
  },
  {
    id: 'commercial-lease-triple-net-nnn-audit',
    name: 'CommercialLeaseTripleNetNnnAuditSkill',
    displayName: 'Commercial Real Estate Triple Net (NNN) Lease Audit',
    categoryId: 'legal',
    description: 'Scrutinizes NNN commercial lease agreements for Common Area Maintenance (CAM) capital expenditure exclusions, audit rights, and assignment terms.',
    tags: ['legal', 'real-estate', 'commercial-lease', 'nnn', 'cam-charges'],
    sectionName: 'Commercial NNN Lease Analysis',
    ruSectionName: 'Аудит коммерческой аренды Triple Net (NNN) и расходов CAM',
    semanticType: 'analysis_protocol',
    instructions: [
      'Carve out structural capital replacements (roof, HVAC major overhauls) from annual CAM operating expenses.',
      'Secure explicit tenant CAM audit rights and financial penalty remedies for landlord overcharges.',
      'Ensure flexible subleasing and assignment rights upon corporate reorganization or subsidiary mergers.'
    ],
    ruInstructions: [
      'Исключите капитальный ремонт здания (крыша, несущие конструкции) из операционных расходов CAM.',
      'Закрепите право арендатора на ежегодный независимый аудит начислений арендодателя.',
      'Обеспечьте право субаренды и переуступки договора при слияниях и реорганизации компании.'
    ]
  },
  {
    id: 'software-sla-remedies-credit-calculator',
    name: 'SoftwareSlaRemediesCreditCalculatorSkill',
    displayName: 'Enterprise Software SLA Credits & Performance Penalties',
    categoryId: 'legal',
    description: 'Defines Service Level Agreements across 99.9%, 99.95%, and 99.99% availability tiers with graduated service credits and termination rights.',
    tags: ['legal', 'sla', 'uptime', 'service-credits', 'contracts'],
    sectionName: 'Enterprise SLA & Service Credit Framework',
    ruSectionName: 'Соглашение об уровне сервиса (SLA) и расчет сервисных компенсаций',
    semanticType: 'process_directive',
    instructions: [
      'Define uptime formula excluding scheduled maintenance windows and force majeure.',
      'Structure graduated fee credits (e.g. 10% credit for <99.9%, 25% for <99.5%, 50% for <99.0%).',
      'Provide chronic failure termination exit clauses allowing contract cancellation without penalty if SLA is breached 3 months consecutively.'
    ],
    ruInstructions: [
      'Сформулируйте расчет доступности с исключением плановых техработ и форс-мажора.',
      'Задайте прогрессивную шкалу скидок и компенсаций при падении аптайма.',
      'Предусмотрите право досрочного расторжения без штрафов при систематических сбоях (3 месяца подряд).'
    ]
  },
  {
    id: 'trade-secret-defend-trade-secrets-act-dtsa',
    name: 'TradeSecretDefendTradeSecretsActDtsaSkill',
    displayName: 'Trade Secret Protection & DTSA Immunity Notice',
    categoryId: 'legal',
    description: 'Embeds Defend Trade Secrets Act (DTSA) statutory immunity notices into confidentiality agreements to preserve exemplary damages and attorney fees.',
    tags: ['legal', 'trade-secrets', 'dtsa', 'confidentiality', 'nda'],
    sectionName: 'Trade Secret Protection & DTSA Protocol',
    ruSectionName: 'Защита коммерческой тайны и обязательное уведомление по DTSA',
    semanticType: 'process_directive',
    instructions: [
      'Verify reasonable measures standard (role-based encryption, access logs, physical barriers).',
      'Mandate the inclusion of statutory 18 U.S.C. § 1833(b) whistleblower immunity notice in all employee and contractor NDAs.',
      'Document immediate ex parte seizure prerequisites in trade secret misappropriation claims.'
    ],
    ruInstructions: [
      'Проверьте соблюдение стандарта разумных мер защиты (шифрование, журнал доступа, NDA).',
      'Включите обязательное уведомление об иммунитете осведомителей по закону DTSA в соглашения о конфиденциальности.',
      'Опишите основания для срочного судебного ареста похищенных данных при нарушении тайны.'
    ]
  },
  {
    id: 'securities-reg-d-accredited-investor-verification',
    name: 'SecuritiesRegDAccreditedInvestorVerificationSkill',
    displayName: 'Regulation D Rule 506(c) Accredited Investor Verification',
    categoryId: 'legal',
    description: 'Audits private securities offering compliance under Reg D 506(c) general solicitation and third-party accredited investor verification.',
    tags: ['legal', 'securities', 'reg-d', 'accredited-investor', 'private-placements'],
    sectionName: 'Reg D 506(c) Investor Verification Protocol',
    ruSectionName: 'Верификация аккредитованных инвесторов по правилу Reg D 506(c)',
    semanticType: 'process_directive',
    instructions: [
      'Review reasonable verification steps: tax returns, W-2s, bank statements, CPA or attorney verification letters within 90 days.',
      'Ensure Form D electronic filing compliance within 15 calendar days after first sale.',
      'Confirm bad actor disqualification checks under Rule 506(d).'
    ],
    ruInstructions: [
      'Проверьте подтверждение статуса инвестора (справки 2-НДФЛ, выписки, письма аудиторов не старше 90 дней).',
      'Обеспечьте подачу формы Form D в SEC в течение 15 дней с момента первой продажи долей.',
      'Проведите проверку на отсутствие дисквалифицирующих нарушений (Bad Actor Checks).'
    ]
  }
];

module.exports = { newLegalSkills };
