import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const LEGAL_SKILLS: Record<string, SkillDefinition> = {
  'contract-risk-analysis': {
    id: 'contract-risk-analysis',
    name: 'ContractRiskAnalysisSkill',
    displayName: 'Contractual Liability & Risk Assessment',
    categoryId: 'legal',
    description: 'Audits commercial contracts for uncapped liabilities, one-sided indemnification, and IP assignment loopholes.',
    tags: ['legal', 'contracts', 'liability', 'risk', 'indemnification', 'law'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Юридический Аудит Договорных Рисков',
        'Contractual Liability & Exposure Audit Protocol',
        [
          '- **Предел ответственности (Limitation of Liability)**: Проверить наличие кепки ответственности (12 месяцев выплаченных сборов).',
          '- **Возмещение убытков (Indemnification)**: Исключить односторонние и неограниченные обязательства по возмещению.',
          '- **Передача интеллектуальной собственности (IP Assignment)**: Защитить фоновую IP и ноу-хау исполнителя.',
        ],
        [
          '- **Limitation of Liability (LoL)**: Assert mutual aggregate liability cap (e.g. 12 months fees paid).',
          '- **Indemnification**: Eliminate uncapped, unilateral third-party indemnification obligations.',
          '- **Intellectual Property (IP)**: Explicitly safeguard pre-existing background IP and developer tooling.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'regulatory-compliance': {
    id: 'regulatory-compliance',
    name: 'RegulatoryComplianceSkill',
    displayName: 'GDPR / CCPA / EU AI Act Statutory Compliance',
    categoryId: 'legal',
    description: 'Enforces statutory compliance with GDPR data rights, CCPA opt-outs, and EU AI Act transparency tiers.',
    tags: ['legal', 'gdpr', 'compliance', 'privacy', 'ai-act', 'ccpa'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Регуляторный Комплаенс (GDPR / AI Act)',
        'Statutory Compliance (GDPR, CCPA, EU AI Act)',
        [
          '- **Права субъектов данных**: Право на забвение (Right to Erasure), экспорт данных и фиксация согласия (Consent).',
          '- **EU AI Act**: Классифицировать систему по уровню риска (Minimal, Limited, High) и внедрить обязательную маркировку AI.',
        ],
        [
          '- **Data Subject Rights**: Enforce Right to Erasure, data portability, and verifiable explicit consent records.',
          '- **EU AI Act Tiers**: Classify operational risk tier (Minimal, High-Risk) and mandate transparency disclosure watermarking.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'ambiguity-mitigation': {
    id: 'ambiguity-mitigation',
    name: 'AmbiguityMitigationSkill',
    displayName: 'Contractual Ambiguity & Loophole Hardening',
    categoryId: 'legal',
    description: 'Replaces subjective phrases («best efforts», «commercially reasonable») with empirical, objective standards.',
    tags: ['legal', 'ambiguity', 'contracts', 'loopholes', 'drafting'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Устранение Юридических Двусмысленностей',
        'Contractual Ambiguity Elimination & Linguistic Hardening',
        [
          '- Заменить размытые формулировки («разумные усилия», «в разумный срок») на точные числовые критерии и SLA (в течение 3 рабочих дней).',
        ],
        [
          '- Purge vague contractual standards ("commercially reasonable efforts") in favor of deterministic empirical benchmarks and explicit SLA windows.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'liability-indemnification-cap': {
    id: 'liability-indemnification-cap',
    name: 'LiabilityIndemnificationCapSkill',
    displayName: 'Consequential Damages Waiver & LoL Cap',
    categoryId: 'legal',
    description: 'Drafts mutual consequential damages waivers and aggregate liability cap clauses.',
    tags: ['legal', 'liability', 'damages', 'waiver', 'contracts'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Ограничение Ответственности и Отказ от Косвенных Убытков',
        'Consequential Damages Waiver & Aggregate Liability Cap',
        [
          '- Включить взаимный отказ от косвенных убытков, упущенной выгоды (consequential/indirect damages) и установить совокупный лимит ответственности.',
        ],
        [
          '- Draft mutual waivers disclaiming indirect, punitive, or consequential damages with a hard aggregate fee multiplier cap.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'ip-protection-licensing': {
    id: 'ip-protection-licensing',
    name: 'IPProtectionLicensingSkill',
    displayName: 'IP Protection & Open-Source License Audit',
    categoryId: 'legal',
    description: 'Protects proprietary IP while auditing open-source licenses against viral copyleft infections (GPL / AGPL).',
    tags: ['legal', 'ip', 'licensing', 'open-source', 'gpl', 'agpl', 'mit'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Защита Интеллектуальной Собственности и Лицензионный Аудит',
        'IP Protection & Open-Source Copyleft License Audit',
        [
          '- Запретить использование библиотек с вирусными лицензиями GPL/AGPL в коммерческом закрытом коде; разрешены MIT, Apache 2.0, BSD.',
        ],
        [
          '- Strictly ban GPL/AGPL viral copyleft dependencies in proprietary builds; restrict imports to permissive MIT/Apache-2.0/BSD licenses.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'gdpr-soc2-privacy-audit': {
    id: 'gdpr-soc2-privacy-audit',
    name: 'GdprSoc2PrivacyAuditSkill',
    displayName: 'SOC2 Type II & GDPR Privacy Security Controls',
    categoryId: 'legal',
    description: 'Specifies SOC2 Trust Services Criteria (Security, Availability, Confidentiality) and data processing agreements (DPA).',
    tags: ['legal', 'soc2', 'gdpr', 'privacy', 'dpa', 'security-controls'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Аудит Контролей Безопасности SOC2 Type II',
        'SOC2 Type II Trust Services Criteria & DPA Alignment',
        [
          '- Проверить наличие: 1. Шифрование в покое (AES-256) и при передаче (TLS 1.3), 2. Неизменяемые аудит-логи, 3. Ролевой доступ (RBAC).',
        ],
        [
          '- Verify SOC2 Trust Services Controls: 1. AES-256 at-rest and TLS 1.3 in-transit encryption, 2. Tamper-evident audit logs, 3. Granular RBAC.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'force-majeure-termination': {
    id: 'force-majeure-termination',
    name: 'ForceMajeureTerminationSkill',
    displayName: 'Force Majeure & Early Termination Rights',
    categoryId: 'legal',
    description: 'Drafts modern force majeure clauses (cyber warfare, grid failure) and termination for convenience/breach provisions.',
    tags: ['legal', 'force-majeure', 'termination', 'breach', 'contracts'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Форс-Мажор и Условия Расторжения Договора',
        'Force Majeure & Contractual Termination Framework',
        [
          '- Определить обстоятельства непреодолимой силы (включая масштабные кибератаки и сбои магистральных сетей) и право расторжения с уведомлением за 30 дней.',
        ],
        [
          '- Modernize Force Majeure definitions to encompass grid outages and cyber conflict; specify 30-day cure windows for breach termination.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'dispute-resolution-arbitration': {
    id: 'dispute-resolution-arbitration',
    name: 'DisputeResolutionArbitrationSkill',
    displayName: 'Arbitration & Choice of Jurisdiction Clause',
    categoryId: 'legal',
    description: 'Structures multi-tiered dispute resolution: Good-faith negotiation -> Mediation -> Binding AAA/LCIA arbitration.',
    tags: ['legal', 'dispute-resolution', 'arbitration', 'jurisdiction', 'governing-law'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Разрешение Споров и Применимое Право (Arbitration)',
        'Tiered Dispute Resolution & Choice of Law Protocol',
        [
          '- 3-ступенчатый порядок: 1. Переговоры руководителей (30 дней), 2. Медиация, 3. Обязательный коммерческий арбитраж с выбором нейтральной юрисдикции.',
        ],
        [
          '- 3-Tier Escalation: 1. Executive Negotiation (30 days), 2. Mediation, 3. Binding AAA / LCIA commercial arbitration with explicit venue choice.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'non-disclosure-covenant-check': {
    id: 'non-disclosure-covenant-check',
    name: 'NonDisclosureCovenantCheckSkill',
    displayName: 'NDA Mutual Confidentiality Covenant',
    categoryId: 'legal',
    description: 'Enforces mutual NDA terms: Standard of Care, Defend Trade Secrets Act notices, and survival terms (3-5 years).',
    tags: ['legal', 'nda', 'confidentiality', 'trade-secrets', 'covenants'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Соглашение о Конфиденциальности (Mutual NDA)',
        'Mutual Confidentiality & Trade Secret Protection Directives',
        [
          '- Стандарт защиты: не ниже, чем для собственной конфиденциальной информации. Срок действия обязательств: 3 года с момента раскрытия.',
        ],
        [
          '- Standard of Care: reasonable commercial diligence matching proprietary safeguards. Survival duration: 3-5 years post-disclosure.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'statutory-interpretation-rigor': {
    id: 'statutory-interpretation-rigor',
    name: 'StatutoryInterpretationRigorSkill',
    displayName: 'Statutory Interpretation & Canons of Construction',
    categoryId: 'legal',
    description: 'Applies legal canons of construction (Ejusdem Generis, Expressio Unius, Plain Meaning Rule) to resolve text.',
    tags: ['legal', 'statutory', 'canons', 'interpretation', 'court'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Каноны Юридического Толкования Текста',
        'Legal Canons of Statutory Construction Protocol',
        [
          '- Применять буквальное толкование (Plain Meaning Rule) и канон `Expressio Unius Est Exclusio Alterius` (прямое упоминание одного исключает другое).',
        ],
        [
          '- Apply formal canons of construction (Plain Meaning Rule, Ejusdem Generis, Expressio Unius) to eliminate textual ambiguities.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'warranty-disclaimer-hardening': {
    id: 'warranty-disclaimer-hardening',
    name: 'WarrantyDisclaimerHardeningSkill',
    displayName: 'UCC Conspicuous Warranty Disclaimer (AS-IS)',
    categoryId: 'legal',
    description: 'Drafts legally enforceable, conspicuous ALL-CAPS warranty disclaimers (Merchantability, Fitness for Particular Purpose).',
    tags: ['legal', 'warranty', 'disclaimer', 'ucc', 'as-is'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Отказ от Гарантийных Обязательств (AS-IS Disclaimer)',
        'Conspicuous UCC Warranty Disclaimer Formulation',
        [
          '- Оформить отказ от гарантий заглавными буквами (CONSPICUOUS): Продукт поставляется «КАК ЕСТЬ» (AS-IS) без гарантий пригодности для конкретной цели.',
        ],
        [
          '- Format UCC-mandated conspicuous ALL-CAPS disclaimers: software provided strictly "AS IS", disclaiming implied warranties of merchantability and fitness.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'legal-precedent-analogizer': {
    id: 'legal-precedent-analogizer',
    name: 'LegalPrecedentAnalogizerSkill',
    displayName: 'Common Law Case Precedent Analogizer',
    categoryId: 'legal',
    description: 'Analogizes current dispute facts against seminal case law precedents and court holdings.',
    tags: ['legal', 'precedent', 'case-law', 'common-law', 'analogy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Сопоставление с Судебными Прецедентами (Case Precedents)',
        'Common Law Case Precedent Analogy Protocol',
        [
          '- Провести сравнительный анализ фактов дела с устоявшимися судебными решениями и выявить ключевые различия (distinguishing facts).',
        ],
        [
          '- Analogize operational facts against binding appellate precedents, explicitly isolating distinguishing factual variables.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'severability-boilerplate-audit': {
    id: 'severability-boilerplate-audit',
    name: 'SeverabilityBoilerplateAuditSkill',
    displayName: 'Severability & Survival Clause Hardening',
    categoryId: 'legal',
    description: 'Ensures that invalidation of any single clause does not invalidate the remainder of the commercial agreement.',
    tags: ['legal', 'severability', 'boilerplate', 'survival', 'contracts'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Положение о Делимости Договора (Severability Clause)',
        'Severability & Contractual Survival Provisions',
        [
          '- Признание недействительным одного пункта договора не влечет недействительности остальных положений.',
        ],
        [
          '- Enforce that judicial invalidation of any single clause preserves the full enforceability of remaining covenants.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'cross-border-jurisdiction-check': {
    id: 'cross-border-jurisdiction-check',
    name: 'CrossBorderJurisdictionCheckSkill',
    displayName: 'Cross-Border Data Transfer & Standard Contractual Clauses (SCC)',
    categoryId: 'legal',
    description: 'Audits international data flows against EU Standard Contractual Clauses (SCC) and Schrems II transfer impact assessments.',
    tags: ['legal', 'cross-border', 'scc', 'schrems-ii', 'gdpr', 'international'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Трансграничная Передача Данных (SCC / Schrems II)',
        'Cross-Border Data Transfer & SCC Compliance',
        [
          '- Внедрить стандартные договорные условия (EU Standard Contractual Clauses) и оценить риск доступа зарубежных спецслужб (TIA assessment).',
        ],
        [
          '- Mandate execution of EU Standard Contractual Clauses (SCCs) and formal Transfer Impact Assessments (TIA) for cross-border data replication.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
