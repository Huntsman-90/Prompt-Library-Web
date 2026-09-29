import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const MEDICAL_SKILLS: Record<string, SkillDefinition> = {
  'clinical-trial-evaluation': {
    id: 'clinical-trial-evaluation',
    name: 'ClinicalTrialEvaluationSkill',
    displayName: 'Clinical Trial Methodology & GRADE Review',
    categoryId: 'medical',
    description: 'Evaluates randomized controlled trials (RCTs), sample sizes, p-values, endpoints, and bias risks.',
    tags: ['medical', 'clinical-trials', 'rct', 'ebm', 'grade', 'evidence'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Оценка Клинических Исследований (EBM / GRADE)',
        'Evidence-Based Clinical Appraisal (GRADE Framework)',
        [
          '- **Дизайн исследования**: РКИ (двойное слепое), когортное, мета-анализ.',
          '- **Статистическая мощность**: Достоверность выборки (N), p-value, 95% доверительный интервал (CI).',
          '- **Аудит смещений (Risk of Bias)**: Проверить рандомизацию, ослепление и конфликт интересов авторов.',
        ],
        [
          '- **Trial Methodology**: Double-blind RCT, prospective cohort, or PRISMA systematic meta-analysis.',
          '- **Statistical Rigor**: Sample power (N), p-values, 95% Confidence Intervals (CI), and Number Needed to Treat (NNT).',
          '- **Risk of Bias**: Audit allocation concealment, attrition rates, and funding bias.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'patient-communication': {
    id: 'patient-communication',
    name: 'PatientCommunicationSkill',
    displayName: 'Empathetic Patient Communication & Health Literacy',
    categoryId: 'medical',
    description: 'Translates complex medical terminology into empathetic, reassuring, 6th-grade reading level advice.',
    tags: ['medical', 'patient-communication', 'empathy', 'health-literacy', 'clarity'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Коммуникация с Пациентом (Health Literacy)',
        'Empathetic Patient Communication Protocol',
        [
          '- Объяснять диагноз простым, поддерживающим языком без пугающих латинских терминов.',
          '- Четко выделить 3 понятных шага по уходу и указать тревожные симптомы (красные флаги).',
        ],
        [
          '- Explain clinical diagnoses and care regimens in empathetic, accessible language.',
          '- Provide 3 clear self-care action steps accompanied by unambiguous red-flag warning triggers.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'diagnostic-differential': {
    id: 'diagnostic-differential',
    name: 'DiagnosticDifferentialSkill',
    displayName: 'Stratified Differential Diagnosis Algorithm',
    categoryId: 'medical',
    description: 'Structures differential diagnoses hierarchically: Most Likely, Must-Not-Miss (Life Threatening), and Rare.',
    tags: ['medical', 'diagnosis', 'differential', 'triage', 'clinical-reasoning'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Дифференциальная Диагностика (Differential Diagnosis)',
        'Stratified Differential Diagnosis Protocol',
        [
          '1. **Наиболее вероятные патологии (Most Likely)**: Обоснование по клинике и анамнезу.',
          '2. **Жизнеугрожающие состояния (Must-Not-Miss)**: Критические диагнозы, требующие срочного исключения.',
          '3. **Редкие / Атипичные варианты (Zebras)**: Диагнозы исключения.',
          '4. **План обследования**: Перечень анализов и инструментальных тестов первого выбора.',
        ],
        [
          '1. **High-Probability Differentials**: Primary working diagnoses supported by clinical presentation.',
          '2. **Must-Not-Miss Critical Emergencies**: Life-threatening pathologies requiring urgent rule-out.',
          '3. **Atypical / Rare Differentials**: Zebras and diagnoses of exclusion.',
          '4. **Diagnostic Workup Plan**: Tier-1 laboratory panels and imaging modalities.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'grade-evidence-assessment': {
    id: 'grade-evidence-assessment',
    name: 'GRADEEvidenceAssessmentSkill',
    displayName: 'GRADE Quality of Evidence Assessment',
    categoryId: 'medical',
    description: 'Applies the formal GRADE framework to score evidence strength (High, Moderate, Low, Very Low).',
    tags: ['medical', 'grade', 'evidence', 'guidelines', 'clinical'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Шкала Доказательности GRADE',
        'GRADE Quality of Evidence Scoring Matrix',
        [
          '- Оценить качество доказательств по шкале GRADE: Высокое (A) / Умеренное (B) / Низкое (C) / Очень низкое (D).',
          '- Указать степень силы клинической рекомендации: Сильная vs Условная.',
        ],
        [
          '- Score evidence certainty using formal GRADE tiers: High (A) / Moderate (B) / Low (C) / Very Low (D).',
          '- Annotate the strength of recommendation: Strong Recommendation vs Conditional/Weak Preference.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'pharmacological-interaction-audit': {
    id: 'pharmacological-interaction-audit',
    name: 'PharmacologicalInteractionAuditSkill',
    displayName: 'Pharmacokinetics & Drug Interaction Audit',
    categoryId: 'medical',
    description: 'Audits Cytochrome P450 interactions, QT prolongation risks, contraindications, and renal dose adjustments.',
    tags: ['medical', 'pharmacology', 'interactions', 'cyp450', 'safety'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Аудит Межлекарственных Взаимодействий и Безопасности',
        'Pharmacological Interaction & Safety Directives',
        [
          '- Проверить ингибиторы/индукторы изоферментов CYP450, риск удлинения интервала QTc и кумулятивную токсичность.',
          '- Указать необходимость коррекции дозировок при почечной/печеночной недостаточности (СКФ < 30 мл/мин).',
        ],
        [
          '- Audit Cytochrome P450 substrate interactions, cumulative QTc prolongation risks, and synergistic toxicities.',
          '- Specify mandatory dosage titrations for compromised renal (eGFR < 30) or hepatic function.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'medical-terminology-simplifier': {
    id: 'medical-terminology-simplifier',
    name: 'MedicalTerminologySimplifierSkill',
    displayName: 'Medical Terminology Plain Translation',
    categoryId: 'medical',
    description: 'De-jargonizes clinical chart notes and lab reports into transparent, actionable patient summaries.',
    tags: ['medical', 'translation', 'plain-language', 'patient', 'charts'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Перевод Медицинских Заключений на Простой Язык',
        'Medical Terminology Plain Translation Protocol',
        [
          '- Перевести выписку или результат анализа понятным языком, объяснив, что означает каждое отклонение от нормы.',
        ],
        [
          '- Translate complex pathology or lab reports into intuitive, empowering summaries explaining out-of-range biomarkers.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'clinical-triage-algorithm': {
    id: 'clinical-triage-algorithm',
    name: 'ClinicalTriageAlgorithmSkill',
    displayName: 'Emergency Clinical Triage (ESI 1-5)',
    categoryId: 'medical',
    description: 'Categorizes acute clinical complaints using the Emergency Severity Index (ESI Levels 1-5).',
    tags: ['medical', 'triage', 'esi', 'emergency', 'acuteness'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Алгоритм Неотложной Сортировки (ESI Triage)',
        'Emergency Severity Index (ESI) Triage Protocol',
        [
          '- Присвоить уровень срочности: ESI 1 (Угроза жизни, немедленно) -> ESI 2 (Высокий риск) -> ESI 3-5 (Стабильные).',
        ],
        [
          '- Assign acuity index: ESI Level 1 (Resuscitation) -> ESI Level 2 (High-Risk/Emergent) -> ESI Level 3-5 (Stable/Routine).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'bioethical-consent-directives': {
    id: 'bioethical-consent-directives',
    name: 'BioethicalConsentDirectivesSkill',
    displayName: 'Bioethics & Informed Consent Standards',
    categoryId: 'medical',
    description: 'Enforces the 4 bioethical pillars: Autonomy, Beneficence, Non-maleficence, and Justice.',
    tags: ['medical', 'bioethics', 'consent', 'ethics', 'autonomy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Биоэтические Принципы и Информированное Согласие',
        'Bioethical Directives & Informed Consent Framework',
        [
          '- Строго соблюдать 4 принципа биоэтики: Автономия пациента, Благодеяние, Ненанесение вреда, Справедливость.',
        ],
        [
          '- Adhere strictly to the 4 bioethical pillars: Patient Autonomy, Beneficence, Non-Maleficence, and Distributive Justice.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'contraindication-alert-protocol': {
    id: 'contraindication-alert-protocol',
    name: 'ContraindicationAlertProtocolSkill',
    displayName: 'Absolute vs Relative Contraindication Alert',
    categoryId: 'medical',
    description: 'Explicitly demarcates absolute contraindications (Black Box warnings) from relative clinical cautions.',
    tags: ['medical', 'contraindications', 'black-box', 'safety', 'alerts'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Протокол Предупреждения о Противопоказаниях',
        'Absolute & Relative Contraindication Alerts',
        [
          '- Явно выделить абсолютные противопоказания (полный запрет) и относительные противопоказания с оценкой соотношения риск/польза.',
        ],
        [
          '- Clearly differentiate Absolute Contraindications (Black Box Warnings) from Relative Clinical Cautions requiring risk/benefit assessment.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'systematic-review-appraisal': {
    id: 'systematic-review-appraisal',
    name: 'SystematicReviewAppraisalSkill',
    displayName: 'PRISMA Systematic Review & Meta-Analysis Appraisal',
    categoryId: 'medical',
    description: 'Critically evaluates systematic reviews against PRISMA standards, forest plots, and I^2 heterogeneity metrics.',
    tags: ['medical', 'prisma', 'meta-analysis', 'systematic-review', 'forest-plot'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Аудит Систематических Обзоров (PRISMA)',
        'PRISMA Systematic Review Critical Appraisal',
        [
          '- Оценить статистическую гетерогенность исследований (I^2 > 50%), воронкообразный график (Funnel plot) и силу сводного эффекта.',
        ],
        [
          '- Evaluate meta-analytic heterogeneity (I^2 > 50%), publication bias (Funnel plots), and pooled odds ratios (OR / RR).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'clinical-case-vignette': {
    id: 'clinical-case-vignette',
    name: 'ClinicalCaseVignetteSkill',
    displayName: 'USMLE Clinical Case Vignette Simulator',
    categoryId: 'medical',
    description: 'Constructs standardized USMLE clinical case vignettes with vitals, labs, physical exam, and stepwise management.',
    tags: ['medical', 'usmle', 'vignette', 'case-study', 'clinical'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Клинический Кейс (Clinical Case Vignette)',
        'Standardized USMLE Clinical Case Vignette Protocol',
        [
          '- Формат кейса: Демография и жалоба -> Анамнез -> Витальные показатели и осмотр -> Лабораторные данные -> Вопрос по тактике ведения.',
        ],
        [
          '- Vignette Structure: Demographic & Chief Complaint -> History of Present Illness -> Physical Vitals -> Diagnostic Panel -> Next Best Step.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'patient-adherence-framework': {
    id: 'patient-adherence-framework',
    name: 'PatientAdherenceFrameworkSkill',
    displayName: 'Medication Adherence & Behavioral Nudges',
    categoryId: 'medical',
    description: 'Designs behavioral regimens, habit loops, and simplified dosing schedules to maximize patient compliance.',
    tags: ['medical', 'adherence', 'compliance', 'behavioral', 'habits'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Повышение Приверженности Лечению (Adherence Framework)',
        'Patient Medication Adherence & Behavioral Nudges',
        [
          '- Упростить схему приема (однократный прием утром, привязка к чистке зубов/завтраку) и дать памятку по преодолению побочных эффектов.',
        ],
        [
          '- Optimize dosing regimens (once-daily morning administration, habit-stacking with meals) and provide side-effect management cues.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'red-flag-symptom-stratification': {
    id: 'red-flag-symptom-stratification',
    name: 'RedFlagSymptomStratificationSkill',
    displayName: 'Emergency Red-Flag Symptom Stratification',
    categoryId: 'medical',
    description: 'Highlights critical red-flag symptoms that demand immediate emergency room (ER) ambulance dispatch.',
    tags: ['medical', 'red-flags', 'emergency', 'safety', 'triage'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Красные Флаги и Экстренные Показания к Госпитализации',
        'Emergency Red-Flag Symptom Stratification',
        [
          '- Выделить жирным шрифтом тревожные симптомы (острая загрудинная боль, внезапная асимметрия лица, одышка в покое), требующие вызова скорой помощи.',
        ],
        [
          '- Explicitly bold critical emergency red flags (crushing substernal chest pain, acute unilateral weakness, stridor) mandating immediate ER dispatch.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'medical-legal-documentation': {
    id: 'medical-legal-documentation',
    name: 'MedicalLegalDocumentationSkill',
    displayName: 'SOAP Note Medical-Legal Documentation',
    categoryId: 'medical',
    description: 'Formats clinical encounters into legally defensible SOAP notes: Subjective, Objective, Assessment, Plan.',
    tags: ['medical', 'soap', 'documentation', 'medical-legal', 'emr'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'output_format',
        'Медицинская Документация в Формате SOAP',
        'SOAP Clinical Note Documentation Format',
        [
          'Оформить клинический протокол по стандарту SOAP:',
          '- **S (Subjective)**: Жалобы и анамнез со слов пациента.',
          '- **O (Objective)**: Осмотр, витальные функции, результаты анализов.',
          '- **A (Assessment)**: Клиническое суждение и дифдиагноз.',
          '- **P (Plan)**: Лекарственная терапия, дообследование, дата повторного приема.',
        ],
        [
          'Emit legally compliant SOAP clinical encounter documentation:',
          '- **S (Subjective)**: Chief complaint and patient narrative.',
          '- **O (Objective)**: Physical exam findings, vital signs, and diagnostic telemetry.',
          '- **A (Assessment)**: Diagnostic formulation and differential stratification.',
          '- **P (Plan)**: Pharmacotherapy, consultations, and follow-up milestones.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
