import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const MEDICAL_SKILLS: Record<string, SkillDefinition> = {
  'clinical-triage-emergency-gate': {
    id: 'clinical-triage-emergency-gate',
    name: 'ClinicalTriageEmergencyGateSkill',
    displayName: 'Emergency Triage & Red-Flag Screener (ABCDE)',
    categoryId: 'medical',
    description: 'Screens symptoms for emergency red flags using the ABCDE triage protocol (Airway, Breathing, Circulation, Disability, Exposure).',
    tags: ['medical', 'triage', 'emergency', 'red-flags', 'abcde', 'clinical'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Клинический Триаж и Красные Флаги (ABCDE Protocol)',
        'Clinical Emergency Triage & Red-Flag Screener (ABCDE Protocol)',
        [
          '- **Скрининг жизненных функций (ABCDE)**: Проверить проходимость дыхательных путей (A), дыхание (B), кровообращение (C), неврологический статус (D), осмотр (E).',
          '- **Выделение красных флагов**: При симптомах острого коронарного синдрома, инсульта или сепсиса немедленно рекомендовать экстренную медицинскую помощь (Скорая помощь 112/911).',
          '- **Приоритет безопасности**: Любое сомнение трактовать в пользу более высокого уровня срочности.',
        ],
        [
          '- **ABCDE Emergency Protocol**: Evaluate Airway patency, Breathing adequacy, Circulatory stability, Neurological Disability, and Exposure.',
          '- **Red-Flag Interception**: Upon detecting emergent conditions (acute coronary syndrome, stroke, anaphylaxis, sepsis), mandate immediate emergency services contact.',
          '- **Safety Bias**: Resolve diagnostic ambiguity strictly towards higher urgency clinical escalation.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'differential-diagnosis-matrix': {
    id: 'differential-diagnosis-matrix',
    name: 'DifferentialDiagnosisMatrixSkill',
    displayName: 'Structured Differential Diagnosis (DDx) Matrix',
    categoryId: 'medical',
    description: 'Constructs structured differential diagnosis tables ranked by pre-test probability, life-threatening "can\'t miss" conditions, and diagnostic tests.',
    tags: ['medical', 'ddx', 'diagnosis', 'clinical-reasoning', 'matrix', 'medicine'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Матрица Дифференциального Диагноза (DDx)',
        'Structured Differential Diagnosis (DDx) Matrix',
        [
          '- **Табличный формат**: Оформить список возможных диагнозов: `[Диагноз | Вероятность (Высокая/Средняя/Низкая) | Жизнеугрожающий (Can\'t Miss) | Подтверждающие исследования]`.',
          '- **Приоритет опасных состояний**: Первыми в списке рассмотреть смертельно опасные патологии, даже если их вероятность мала.',
          '- **Диагностический план**: Для каждого диагноза указать «золотой стандарт» лабораторной или инструментальной диагностики.',
        ],
        [
          '- **DDx Tabular Format**: Deliver matrix: `[Candidate Pathology | Pre-Test Likelihood | Life-Threatening ("Can\'t Miss") | Diagnostic Rule-In/Out Tests]`.',
          '- **"Can\'t-Miss" Prioritization**: Explicitly evaluate high-mortality conditions upfront regardless of statistical base rates.',
          '- **Gold-Standard Diagnostic Plan**: Specify definitive laboratory, imaging, or biomarker tests required for confirmation.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'soap-clinical-note-format': {
    id: 'soap-clinical-note-format',
    name: 'SoapClinicalNoteFormatSkill',
    displayName: 'Standard Clinical SOAP Note Architecture',
    categoryId: 'medical',
    description: 'Formats clinical encounters into standard SOAP documentation: Subjective, Objective, Assessment, and Plan.',
    tags: ['medical', 'soap-note', 'clinical-documentation', 'emr', 'ehr', 'charting'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Клинический Протокол Осмотра (Формат SOAP)',
        'Standard Clinical SOAP Note Specification',
        [
          '- **[S] Subjective (Субъективно)**: Жалобы пациента, история текущего заболевания (HPI), анамнез жизни и аллергологический анамнез.',
          '- **[O] Objective (Объективно)**: Жизненные показатели (ЧСС, АД, SpO2, температура), данные физикального осмотра и лабораторные анализы.',
          '- **[A] Assessment (Оценка / Диагноз)**: Клиническое суждение, основной диагноз (МКБ-10/11) и сопутствующие патологии.',
          '- **[P] Plan (План лечения)**: Медикаментозная терапия (дозировки, кратность), дообследование, рекомендации по образу жизни и контрольный визит.',
        ],
        [
          '- **[S] Subjective**: Chief complaint, History of Present Illness (HPI), past medical/surgical history, and allergy status.',
          '- **[O] Objective**: Vital signs (BP, HR, RR, SpO2, Temp), physical examination findings, and diagnostic lab/imaging data.',
          '- **[A] Assessment**: Primary clinical diagnosis (ICD-10/11) with differential rationale and patient stability assessment.',
          '- **[P] Plan**: Pharmacological regimen (exact dosage, route, frequency), diagnostic follow-ups, and emergency escalation thresholds.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'evidence-based-grade-hierarchy': {
    id: 'evidence-based-grade-hierarchy',
    name: 'EvidenceBasedGradeHierarchySkill',
    displayName: 'GRADE Evidence Hierarchy & Study Quality',
    categoryId: 'medical',
    description: 'Grades biomedical literature and clinical recommendations using the GRADE framework (High, Moderate, Low, Very Low quality).',
    tags: ['medical', 'grade', 'evidence-based', 'ebm', 'clinical-guidelines', 'meta-analysis'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Градация Доказательности (EBM / GRADE Hierarchy)',
        'Evidence-Based Medicine (GRADE) Quality Hierarchy',
        [
          '- **Иерархия источников**: 1. Систематические обзоры и мета-анализы РКИ (Level I), 2. Рандомизированные контролируемые испытания (Level II), 3. Когортные исследования, 4. Экспертное мнение.',
          '- **Оценка качества по GRADE**: Классифицировать доказательства: Высокое (High) / Умеренное (Moderate) / Низкое (Low) качество.',
          '- **Сила рекомендаций**: Четко разделять строгие клинические рекомендации («Рекомендуется делать...») и условные («Целесообразно рассмотреть...»).',
        ],
        [
          '- **Evidence Pyramid**: Rank citations: Systematic Reviews/Meta-Analyses (Level I) -> RCTs (Level II) -> Cohort Studies -> Case Reports.',
          '- **GRADE Classification**: Assign GRADE quality ratings (High / Moderate / Low / Very Low) accounting for risk of bias and imprecision.',
          '- **Recommendation Strength**: Explicitly distinguish Strong Recommendations ("Clinicians must...") from Conditional Guidance ("Consider...").',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'patient-plain-language-explainer': {
    id: 'patient-plain-language-explainer',
    name: 'PatientPlainLanguageExplainerSkill',
    displayName: 'Empathetic Patient Education & Plain Language',
    categoryId: 'medical',
    description: 'Translates complex clinical diagnoses and treatment mechanisms into clear, empathetic, jargon-free patient education leaflets.',
    tags: ['medical', 'patient-education', 'plain-language', 'empathy', 'health-literacy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Памятка для Пациента Простым Языком (Patient Education)',
        'Empathetic Patient Education & Plain-Language Leaflet',
        [
          '- **Язык без сложного медицинского жаргона**: Заменить термины («артериальная гипертензия» -> «повышенное давление», «диуретический» -> «мочегонный»).',
          '- **Простая структура**: 1. Что это за состояние, 2. Как работает лечение, 3. Как правильно принимать лекарства, 4. Когда срочно звонить врачу.',
          '- **Эмпатия и поддержка**: Снизить тревожность пациента, дав четкие и спокойные инструкции.',
        ],
        [
          '- **Plain Health Literacy**: Translate complex medical jargon into clear everyday language (e.g. "hypertension" -> "high blood pressure").',
          '- **Patient-Centric Structure**: 1. Condition Overview, 2. How the Treatment Helps, 3. Daily Medication Schedule, 4. When to Call the Doctor Immediately.',
          '- **Anxiety-Reducing Tone**: Provide reassuring, actionable guidance empowering the patient in their self-care management.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'drug-interaction-contraindication': {
    id: 'drug-interaction-contraindication',
    name: 'DrugInteractionContraindicationSkill',
    displayName: 'Pharmacology, CYP450 & Contraindication Audit',
    categoryId: 'medical',
    description: 'Audits pharmacokinetics: CYP450 enzyme interactions, renal/hepatic dosing adjustments (eGFR/Child-Pugh), and absolute contraindications.',
    tags: ['medical', 'pharmacology', 'drug-interactions', 'cyp450', 'contraindications', 'dosage'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Фармакологический Аудит и Взаимодействие Лекарств',
        'Pharmacology, CYP450 & Contraindication Audit Protocol',
        [
          '- **Межлекарственные взаимодействия (DDI)**: Проверить индукторы и ингибиторы цитохромов CYP3A4, CYP2D6, CYP2C19 и конкурентное связывание с белками.',
          '- **Коррекция дозы при ХБП/печеночной недостаточности**: Проверить необходимость снижения дозы по клиренсу креатинина (eGFR) или шкале Чайлд-Пью.',
          '- **Абсолютные противопоказания**: Четко выделить состояния (беременность, удлинение интервала QT, язвенные кровотечения), исключающие прием препарата.',
        ],
        [
          '- **Cytochrome P450 (CYP) Audit**: Screen for substrate/inhibitor/inducer interactions across CYP3A4, CYP2D6, and P-glycoprotein pathways.',
          '- **Organ Clearance Dosing**: Validate renal dosing adjustments based on eGFR / CrCl and hepatic adjustments via Child-Pugh score.',
          '- **Absolute Contraindications**: Explicitly flag black-box warnings, teratogenicity risks, QT-prolongation hazards, and severe allergy history.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'medical-disclaimer-safety-guard': {
    id: 'medical-disclaimer-safety-guard',
    name: 'MedicalDisclaimerSafetyGuardSkill',
    displayName: 'Mandatory Medical Informational Disclaimer',
    categoryId: 'medical',
    description: 'Enforces mandatory non-diagnostic medical disclaimers, emphasizing consultation with licensed healthcare professionals.',
    tags: ['medical', 'disclaimer', 'safety', 'ethics', 'compliance', 'legal-medical'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'constraints',
        'Обязательный Медицинский Дисклеймер и Ограничения',
        'Mandatory Medical Information Disclaimer & Safety Guardrail',
        [
          '- **Информационный характер**: Прямо указать, что предоставленная информация носит исключительно образовательный и справочный характер и не заменяет очную консультацию врача.',
          '- **Запрет на самолечение**: Не устанавливать окончательный диагноз и не отменять ранее назначенные лечащим врачом препараты.',
          '- **Призыв к очному визиту**: При любых сомнениях рекомендовать немедленное обращение в лицензированное медицинское учреждение.',
        ],
        [
          '- **Educational Scope Notice**: Explicitly state that provided materials are for educational and informational purposes only and do not constitute clinical diagnosis.',
          '- **Zero Self-Medication Prescription**: Prohibit prescribing final medical regimens or overriding an existing physician\'s verified treatment plan.',
          '- **Clinical Consultation Imperative**: Emphasize mandatory in-person evaluation by licensed medical practitioners.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'clinical-trial-pico-extractor': {
    id: 'clinical-trial-pico-extractor',
    name: 'ClinicalTrialPicoExtractorSkill',
    displayName: 'Clinical Trial PICO Framework Extractor',
    categoryId: 'medical',
    description: 'Extracts PICO parameters (Population, Intervention, Comparison, Outcome) and statistical endpoints from clinical research studies.',
    tags: ['medical', 'pico', 'clinical-trials', 'research', 'meta-analysis', 'endpoints'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Анализ Клинического Исследования по Схеме PICO',
        'Clinical Research Study Extraction (PICO Framework)',
        [
          '- **[P] Population**: Критерии включения/исключения пациентов, размер выборки $N$, демография и стадия заболевания.',
          '- **[I] Intervention**: Тестируемый препарат или методика (дозировка, схема, длительность).',
          '- **[C] Comparison**: Группа контроля (плацебо, стандартная терапия SoC).',
          '- **[O] Outcomes**: Первичные и вторичные конечные точки (Overall Survival, PFS, Отношение рисков Hazard Ratio, p-value).',
        ],
        [
          '- **[P] Population**: Sample size $N$, inclusion/exclusion criteria, baseline demographics, and disease staging.',
          '- **[I] Intervention**: Experimental regimen, dosing schedule, route, and treatment duration.',
          '- **[C] Comparison**: Control arm protocol (active comparator SoC vs. double-blind placebo).',
          '- **[O] Outcomes**: Primary/secondary statistical endpoints (Hazard Ratio, Progression-Free Survival, ARR, $p$-value, 95% CI).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'lab-biomarker-reference-interpreter': {
    id: 'lab-biomarker-reference-interpreter',
    name: 'LabBiomarkerReferenceInterpreterSkill',
    displayName: 'Laboratory Panel & Biomarker Interpretation',
    categoryId: 'medical',
    description: 'Interprets diagnostic laboratory panels (CBC, BMP, LFT, Coagulation, Cardiac Enzymes) against reference ranges with clinical context.',
    tags: ['medical', 'lab-tests', 'biomarkers', 'cbc', 'bmp', 'blood-work', 'diagnostics'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Интерпретация Лабораторных Анализов и Биомаркеров',
        'Laboratory Panel & Biomarker Interpretation Schema',
        [
          '- **Таблица показателей**: Оформить данные: `[Биомаркер | Результат | Референсный интервал | Статус (В норме / Выше / Ниже) | Клиническое значение]`.',
          '- **Комплексная оценка**: Интерпретировать отклонения не изолированно, а в совокупности (например: АЛТ/АСТ в сочетании с Билирубином и ГГТ).',
          '- **Критические значения (Panic Values)**: Немедленно выделять показатели, требующие срочного врачебного вмешательства (например, Калий K+ > 6.0 ммоль/л).',
        ],
        [
          '- **Biomarker Matrix**: Tabulate findings: `[Analyte | Value | Reference Interval | Deviation Flag (High/Low/Critical) | Pathophysiologic Significance]`.',
          '- **Synergistic Panel Interpretation**: Evaluate multi-biomarker patterns holistically (e.g. transaminase ratio AST/ALT with direct bilirubin).',
          '- **Panic Value Highlights**: Highlight critical life-threatening values demanding emergent STAT intervention (e.g. Potassium $K^+ > 6.0$ mEq/L).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'sbar-clinical-handover': {
    id: 'sbar-clinical-handover',
    name: 'SbarClinicalHandoverSkill',
    displayName: 'SBAR Clinical Team Handover Protocol',
    categoryId: 'medical',
    description: 'Structures inter-professional clinical handovers using SBAR: Situation, Background, Assessment, Recommendation.',
    tags: ['medical', 'sbar', 'handover', 'communication', 'hospital', 'patient-safety'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Клиническая Передача Пациента (Протокол SBAR)',
        'SBAR Clinical Team Handover Specification',
        [
          '- **[S] Situation (Ситуация)**: Имя пациента, возраст, палата, текущая острая жалоба или повод для вызова.',
          '- **[B] Background (Анамнез)**: Диагноз при поступлении, ключевые сопутствующие заболевания, недавние операции или назначения.',
          '- **[A] Assessment (Оценка состояния)**: Текущие жизненные показатели, динамика за смену и предполагаемая причина ухудшения.',
          '- **[R] Recommendation (Рекомендация)**: Что конкретно требуется от принимающего дежурного врача прямо сейчас (осмотр, коррекция капельницы, повтор ЭКГ).',
        ],
        [
          '- **[S] Situation**: Patient demographics, ward location, and immediate presenting clinical concern.',
          '- **[B] Background**: Admission diagnosis, surgical history, allergy alerts, and recent therapeutic interventions.',
          '- **[A] Assessment**: Current vital signs trajectory, clinical deterioration markers, and working diagnostic impression.',
          '- **[R] Recommendation**: Explicit urgent actions requested from the incoming team (STAT bedside review, lab redraw, inotrope adjustment).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'biomedical-ethics-four-principles': {
    id: 'biomedical-ethics-four-principles',
    name: 'BiomedicalEthicsFourPrinciplesSkill',
    displayName: 'Beauchamp & Childress 4 Principles of Bioethics',
    categoryId: 'medical',
    description: 'Evaluates clinical ethical dilemmas using the 4 principles: Autonomy, Beneficence, Non-maleficence, and Justice.',
    tags: ['medical', 'bioethics', 'ethics', 'autonomy', 'beneficence', 'justice'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Биоэтический Анализ (4 Принципа Бошама и Чилдресса)',
        'Beauchamp & Childress 4 Principles of Biomedical Ethics',
        [
          '- **[Autonomy] Уважение к автономии**: Информированное согласие пациента, право на отказ от лечения и уважение его воли.',
          '- **[Beneficence] Благодеяние**: Обязанность действовать в наилучших интересах здоровья пациента.',
          '- **[Non-maleficence] Непричинение вреда («Primum non nocere»)**: Минимизация рисков и предотвращение неоправданного вреда.',
          '- **[Justice] Справедливость**: Равный доступ к медицинским ресурсам и отсутствие дискриминации при распределении помощи.',
        ],
        [
          '- **[Autonomy] Patient Self-Determination**: Uphold informed consent, advance directives, and patient decision-making rights.',
          '- **[Beneficence] Active Benefit**: Maximize positive therapeutic outcomes and clinical value for the patient.',
          '- **[Non-Maleficence] Primum Non Nocere**: Rigorously minimize procedural risks, iatrogenic harm, and overtreatment.',
          '- **[Justice] Equitable Resource Allocation**: Ensure fair, non-discriminatory distribution of clinical care and scarce interventions.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'epidemiological-risk-stratification': {
    id: 'epidemiological-risk-stratification',
    name: 'EpidemiologicalRiskStratificationSkill',
    displayName: 'Epidemiological Risk Modeling (RR/OR/NNT)',
    categoryId: 'medical',
    description: 'Calculates epidemiological metrics: Relative Risk (RR), Odds Ratio (OR), Absolute Risk Reduction (ARR), and Number Needed to Treat (NNT).',
    tags: ['medical', 'epidemiology', 'statistics', 'nnt', 'relative-risk', 'odds-ratio', 'public-health'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Эпидемиологическая Оценка Рисков (RR, OR, NNT)',
        'Epidemiological Risk Stratification & NNT Modeling',
        [
          '- **Расчет NNT (Number Needed to Treat)**: Вычислить $NNT = 1 / ARR$ — сколько пациентов нужно пролечить для предотвращения одного неблагоприятного исхода.',
          '- **Относительный риск (RR) vs Отношение шансов (OR)**: Рассчитать точечные оценки и 95% доверительные интервалы ($95\\% CI$).',
          '- **Клиническая значимость**: Оценить, оправдывает ли снижение абсолютного риска потенциальные побочные эффекты терапии (NNH — Number Needed to Harm).',
        ],
        [
          '- **NNT Metric Calculation**: Compute $NNT = 1 / ARR$ quantifying how many patients must be treated to prevent one clinical endpoint event.',
          '- **Relative Risk & Odds Ratios**: Derive RR and OR point estimates bounded by 95% confidence intervals ($95\\% CI$).',
          '- **Benefit-to-Harm Ratio (NNT vs NNH)**: Weigh therapeutic benefit against Number Needed to Harm (NNH) for adverse events.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'fhir-hl7-interoperability': {
    id: 'fhir-hl7-interoperability',
    name: 'FhirHl7InteroperabilitySkill',
    displayName: 'HL7 FHIR R4 Health Data Interoperability',
    categoryId: 'medical',
    description: 'Models clinical health data into standard HL7 FHIR Release 4 JSON resources (Patient, Observation, Condition, Encounter, DiagnosticReport).',
    tags: ['medical', 'fhir', 'hl7', 'health-tech', 'interoperability', 'json', 'ehr'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Спецификация Ресурсов HL7 FHIR R4 (JSON)',
        'HL7 FHIR R4 Health Data Resource Specification',
        [
          '- **Стандарт FHIR R4**: Оформить клинические данные в виде валидного FHIR JSON ресурса (`Patient`, `Observation`, `Encounter`, `Condition`).',
          '- **Стандартизированные кодификаторы**: Использовать международные классификаторы: LOINC для анализов, SNOMED CT для симптомов, RxNorm для лекарств.',
          '- **Проверка связей**: Корректно ссылаться на другие ресурсы через поля `subject: { reference: "Patient/123" }`.',
        ],
        [
          '- **FHIR R4 Schema Conformance**: Emit valid FHIR JSON schemas (`Patient`, `Observation`, `Encounter`, `Condition`, `MedicationRequest`).',
          '- **Standard Clinical Vocabularies**: Bind clinical concepts to LOINC (laboratory), SNOMED-CT (clinical findings), and RxNorm (medications).',
          '- **Referential Graph Integrity**: Populate structural references linking observations to target patients (`subject: { reference: "Patient/id" }`).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'surgical-pre-op-checklist-who': {
    id: 'surgical-pre-op-checklist-who',
    name: 'SurgicalPreOpChecklistWhoSkill',
    displayName: 'WHO Surgical Safety Checklist Protocol',
    categoryId: 'medical',
    description: 'Implements the World Health Organization (WHO) Surgical Safety Checklist across Sign In, Time Out, and Sign Out phases.',
    tags: ['medical', 'surgery', 'checklist', 'who', 'patient-safety', 'operating-room'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Контрольный Список Хирургической Безопасности ВОЗ',
        'WHO Surgical Safety Checklist Specification',
        [
          '- **1. Sign In (До индукции анестезии)**: Подтверждение личности пациента, разметки операционного поля, согласия и риска кровопотери.',
          '- **2. Time Out (Перед разрезом кожи)**: Представление всех членов бригады, подтверждение плана операции и введения антибиотикопрофилактики.',
          '- **3. Sign Out (До выезда из операционной)**: Подтверждение подсчета инструментов и салфеток, маркировка биоптатов и план послеоперационного ведения.',
        ],
        [
          '- **1. Sign In (Pre-Anesthesia)**: Patient identity confirmation, surgical site marking, informed consent verification, and airway/blood loss risk assessment.',
          '- **2. Time Out (Pre-Incision Pause)**: Surgical team introductions, verbal confirmation of procedure, and antibiotic prophylaxis status (<60 min).',
          '- **3. Sign Out (Pre-Closure / Post-Op)**: Instrument/sponge counts verification, specimen labeling confirmation, and PACU recovery handoff protocol.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

'pharmacokinetics-adme-profile': {
    id: 'pharmacokinetics-adme-profile',
    name: 'PharmacokineticsAdmeProfileSkill',
    displayName: 'Pharmacokinetics & ADME Profiler',
    categoryId: 'medical',
    description: 'Models drug Absorption, Distribution, Metabolism, and Excretion parameters, half-life, and bioavailability constraints.',
    tags: ['medical', 'pharmacokinetics', 'adme', 'pharmacology', 'drug-safety'],
    transform: createStandardSkillTransform({
sectionName: 'Pharmacokinetic ADME Profile Analysis',
      ruSectionName: 'Фармакокинетический профиль ADME и метаболизм',
      instructions: [
        'Analyze pharmacological agents systematically across ADME: Absorption (bioavailability, food effect), Distribution (protein binding, volume of distribution Vd), Metabolism (CYP450 pathways, active metabolites), and Excretion (renal clearance, fecal elimination).',
        'Calculate or cite elimination half-life (t1/2), steady-state kinetics, therapeutic window, and peak plasma concentrations (Cmax, Tmax).',
        'Highlight hepatic impairment (Child-Pugh) and renal impairment (creatinine clearance / eGFR) dose adjustment formulas.',
        'Flag pharmacogenetic polymorphisms (e.g., CYP2D6, CYP2C19 poor/ultra-rapid metabolizers) altering drug exposure.',
      ],
      ruInstructions: [
        'Анализируйте фармпрепараты по системе ADME: всасывание (биодоступность, влияние пищи), распределение (связывание с белками, Vd), метаболизм (изоферменты CYP450) и выведение (почечный клиренс).',
        'Указывайте период полувыведения (t1/2), кинетику достижения равновесной концентрации, терапевтическое окно и пиковые концентрации (Cmax, Tmax).',
        'Выделяйте правила коррекции дозы при почечной (клиренс креатинина, СКФ) и печеночной недостаточности (шкала Чайлд-Пью).',
        'Отмечайте клинически значимые фармакогенетические полиморфизмы (CYP2D6, CYP2C19 и др.), влияющие на скорость метаболизма.',
      ],
      semanticType: 'process_directive',
      tags: ['medical', 'pharmacokinetics', 'adme', 'pharmacology', 'drug-safety'],
    }),
  },

  'radiology-imaging-report-structurer': {
    id: 'radiology-imaging-report-structurer',
    name: 'RadiologyImagingReportStructurerSkill',
    displayName: 'Structured Radiology Report & Standard Lexicon',
    categoryId: 'medical',
    description: 'Formats radiological findings using standardized clinical lexicons (BI-RADS, Lung-RADS, RECIST) and clear anatomic localization.',
    tags: ['medical', 'radiology', 'imaging', 'bi-rads', 'recist'],
    transform: createStandardSkillTransform({
sectionName: 'Structured Radiology Report Protocol',
      ruSectionName: 'Структурированный радиологический отчет (RADS / RECIST)',
      instructions: [
        'Format imaging interpretation strictly: Clinical Indication, Technique/Comparison, Findings by Anatomic Compartment, and Impression.',
        'Use standardized categorical systems (BI-RADS 0-6, PI-RADS, LI-RADS, Lung-RADS) with explicit management recommendations.',
        'Clearly document lesion dimensions in three orthogonal planes, internal architecture, enhancement patterns, and adjacent mass effect.',
        'Conclude with prioritized differential impressions and explicit next diagnostic steps (e.g., biopsy, follow-up interval CT).',
      ],
      ruInstructions: [
        'Оформляйте описание визуализации строго по разделам: клинические показания, методика/сравнение с архивом, находки по анатомическим зонам и заключение.',
        'Используйте стандартные оценочные шкалы (BI-RADS, PI-RADS, LI-RADS, Lung-RADS) с однозначными рекомендациями по дальнейшим действиям.',
        'Фиксируйте размеры образований в трех взаимно перпендикулярных плоскостях, структуру, накопление контраста и смещение соседних структур.',
        'Формулируйте дифференциальный ряд в порядке убывания вероятности с рекомендацией конкретных дообследований (биопсия, контрольное КТ через N месяцев).',
      ],
      semanticType: 'structural_directive',
      tags: ['medical', 'radiology', 'imaging', 'bi-rads', 'recist'],
    }),
  },

  'oncology-tnm-staging-classifier': {
    id: 'oncology-tnm-staging-classifier',
    name: 'OncologyTnmStagingClassifierSkill',
    displayName: 'AJCC TNM Oncology Staging Classifier',
    categoryId: 'medical',
    description: 'Applies rigorous AJCC 8th edition TNM criteria to classify primary tumor extension, nodal involvement, and distant metastasis.',
    tags: ['medical', 'oncology', 'tnm-staging', 'ajcc', 'cancer-treatment'],
    transform: createStandardSkillTransform({
sectionName: 'AJCC TNM Oncology Staging Architecture',
      ruSectionName: 'Онкологическое стадирование по классификации AJCC TNM',
      instructions: [
        'Classify malignancy according to current AJCC/UICC 8th edition staging criteria: Primary Tumor (T0-T4), Regional Lymph Nodes (N0-N3), Distant Metastasis (M0-M1).',
        'Distinguish clearly between clinical staging (cTNM) and post-surgical pathological staging (pTNM).',
        'Incorporate relevant molecular and biological prognostic biomarkers (e.g., ER/PR/HER2, Ki-67, EGFR, KRAS, BRAF, PD-L1, MSI/MMR status).',
        'Map resultant TNM subcategories to overall prognostic Stage Grouping (Stage 0 to Stage IV) with standard NCCN guideline treatment modalities.',
      ],
      ruInstructions: [
        'Классифицируйте новообразование по актуальным критериям AJCC/UICC 8-й редакции: первичная опухоль (T), лимфоузлы (N), отдаленные метастазы (M).',
        'Четко разграничивайте клиническую стадию (cTNM) и патоморфологическую послеоперационную стадию (pTNM).',
        'Интегрируйте ключевые молекулярно-генетические биомаркеры (ER/PR/HER2, Ki-67, EGFR, KRAS, BRAF, MSI, PD-L1).',
        'Сопоставляйте комбинацию TNM с итоговой клинической стадией (I–IV) и стандартными терапевтическими опциями по гайдлайнам NCCN/RUSSCO.',
      ],
      semanticType: 'process_directive',
      tags: ['medical', 'oncology', 'tnm-staging', 'ajcc', 'cancer-treatment'],
    }),
  },

  'telehealth-intake-screening-protocol': {
    id: 'telehealth-intake-screening-protocol',
    name: 'TelehealthIntakeScreeningProtocolSkill',
    displayName: 'Telehealth Intake & Remote Screening Protocol',
    categoryId: 'medical',
    description: 'Executes structured remote clinical intake, red flag triage, symptom chronology, and video-visit appropriateness gates.',
    tags: ['medical', 'telehealth', 'triage', 'opqrst', 'remote-care'],
    transform: createStandardSkillTransform({
sectionName: 'Telehealth Intake & Screening Protocol',
      ruSectionName: 'Протокол первичного телемедицинского скрининга и триажа',
      instructions: [
        'Perform immediate red-flag emergency screening (chest pain, acute neurologic deficits, severe respiratory distress) redirecting to 911/emergency services.',
        'Collect standardized chief complaint narrative: onset, provocation/palliation, quality, radiation, severity (1-10), and time-course (OPQRST).',
        'Assess whether clinical presentation is safe and appropriate for telemedicine vs mandating in-person physical examination or urgent care.',
        'Verify current medication regimen, pharmacy location, and vital sign home measurements (blood pressure, SpO2, heart rate, temperature).',
      ],
      ruInstructions: [
        'Проводите моментальный скрининг красных флагов неотложных состояний (острая боль в груди, парезы, удушье) с немедленной маршрутизацией в скорую помощь.',
        'Собирайте анамнез по схеме OPQRST: начало симптомов, провоцирующие факторы, характер боли, иррадиация, тяжесть (1-10) и динамика во времени.',
        'Оценивайте принципиальную безопасность телемедицинского формата в данном случае или необходимость очного визита.',
        'Фиксируйте текущий список принимаемых препаратов и данные домашних измерений (давление, пульс, сатурация, температура).',
      ],
      semanticType: 'process_directive',
      tags: ['medical', 'telehealth', 'triage', 'opqrst', 'remote-care'],
    }),
  },

  'adverse-event-ctcae-grading': {
    id: 'adverse-event-ctcae-grading',
    name: 'AdverseEventCtcaeGradingSkill',
    displayName: 'CTCAE Adverse Drug Event Severity Grading',
    categoryId: 'medical',
    description: 'Grades medical therapy toxicity and adverse reactions according to NCI Common Terminology Criteria for Adverse Events (Grade 1-5).',
    tags: ['medical', 'ctcae', 'pharmacovigilance', 'adverse-events', 'toxicity'],
    transform: createStandardSkillTransform({
sectionName: 'NCI CTCAE Toxicity Grading Protocol',
      ruSectionName: 'Градация токсичности и нежелательных явлений по шкале CTCAE',
      instructions: [
        'Map reported signs, symptoms, and laboratory aberrations to precise NCI CTCAE v5.0 preferred terms and organ system categories.',
        'Assign definitive numerical toxicity grades: Grade 1 (Mild/Asymptomatic), Grade 2 (Moderate/Minimal intervention), Grade 3 (Severe/Hospitalization), Grade 4 (Life-threatening), Grade 5 (Death).',
        'Determine attribution causality using the WHO-UMC or Naranjo algorithm (Certain, Probable, Possible, Unlikely, Unrelated).',
        'Specify recommended clinical action: continue therapy, hold dose, dose-reduction tier, or permanent treatment discontinuation.',
      ],
      ruInstructions: [
        'Сопоставляйте клинические симптомы и лабораторные отклонения с терминологией классификатора NCI CTCAE v5.0.',
        'Присваивайте точный класс токсичности от 1 до 5 (Grade 1 — легкая, Grade 2 — умеренная, Grade 3 — тяжелая, Grade 4 — жизнеугрожающая, Grade 5 — летальная).',
        'Оценивайте причинно-следственную связь с препаратом по шкале Наранхо или ВОЗ (достоверная, вероятная, возможная, маловероятная).',
        'Формулируйте четкий алгоритм действий: продолжение терапии, временная приостановка, снижение дозы или полная отмена препарата.',
      ],
      semanticType: 'process_directive',
      tags: ['medical', 'ctcae', 'pharmacovigilance', 'adverse-events', 'toxicity'],
    }),
  },

  'pediatric-weight-based-dosing': {
    id: 'pediatric-weight-based-dosing',
    name: 'PediatricWeightBasedDosingSkill',
    displayName: 'Pediatric Weight-Based Dosage Verification',
    categoryId: 'medical',
    description: 'Calculates and double-checks pediatric dosages strictly by mg/kg/day, BSA (m²), and maximum adult ceiling caps.',
    tags: ['medical', 'pediatrics', 'dosing', 'patient-safety', 'pharmacology'],
    transform: createStandardSkillTransform({
sectionName: 'Pediatric Weight-Based Dosage Verification',
      ruSectionName: 'Педиатрический расчет дозировок по массе тела (мг/кг)',
      instructions: [
        'Mandate patient weight in kilograms (kg) and exact chronological/gestational age before calculating pediatric medication doses.',
        'Calculate dose per administration strictly according to recommended mg/kg/dose or mg/kg/day divided into standard intervals (q8h, q12h).',
        'Enforce absolute adult dose ceilings: never allow a pediatric calculated dose to exceed the maximum recommended adult single or daily dose.',
        'Verify liquid concentration volume math (e.g., 250mg/5mL) to prevent common decimal place and measurement syringe errors.',
      ],
      ruInstructions: [
        'Требуйте точную массу тела ребенка в килограммах (кг) и точный возраст перед расчетом любых фармакологических доз.',
        'Рассчитывайте разовую и суточную дозу строго по нормативам мг/кг/сутки с корректным разделением на интервалы приема (каждые 8 или 12 часов).',
        'Жестко ограничивайте результат максимальной взрослой терапевтической дозой — расчетная педиатрическая доза никогда не должна ее превышать.',
        'Проводите двойной пересчет миллиграммов в миллилитры суспензии (мг/мл) во избежание частых ошибок дозирования шприцем.',
      ],
      semanticType: 'guardrail_directive',
      tags: ['medical', 'pediatrics', 'dosing', 'patient-safety', 'pharmacology'],
    }),
  },

  'geriatric-beers-criteria-audit': {
    id: 'geriatric-beers-criteria-audit',
    name: 'GeriatricBeersCriteriaAuditSkill',
    displayName: 'Geriatric Beers Criteria & Polypharmacy Audit',
    categoryId: 'medical',
    description: 'Audits medication lists in older adults (≥65) using AGS Beers Criteria to identify inappropriate medications and deprescribing opportunities.',
    tags: ['medical', 'geriatrics', 'beers-criteria', 'polypharmacy', 'deprescribing'],
    transform: createStandardSkillTransform({
sectionName: 'Geriatric Beers Criteria & Deprescribing Audit',
      ruSectionName: 'Аудит полипрагмазии у пожилых по критериям Бирса (Beers Criteria)',
      instructions: [
        'Screen medication profiles of adults aged 65+ against American Geriatrics Society (AGS) Beers Criteria for potentially inappropriate medications (PIMs).',
        'Identify high-risk drug classes: anticholinergics (confusion/falls), benzodiazepines/Z-drugs, long-acting sulfonylureas, and chronic NSAIDs.',
        'Evaluate cumulative Anticholinergic Cognitive Burden (ACB) and drug-drug interactions multiplying fall and delirium risks.',
        'Provide evidence-based safer therapeutic alternatives and practical tapering/deprescribing schedules.',
      ],
      ruInstructions: [
        'Проверяйте медикаментозные назначения пациентам старше 65 лет по актуальным критериям Бирса (AGS Beers Criteria).',
        'Выявляйте потенциально опасные группы препаратов: холиноблокаторы (риск когнитивного снижения), бензодиазепины, сульфонилмочевину и длительные НПВП.',
        'Оценивайте кумулятивную антихолинергическую нагрузку (шкала ACB) и лекарственные взаимодействия, повышающие риск падений и делирия.',
        'Предлагайте более безопасные альтернативные препараты и схемы постепенной отмены (депрескрайбинга).',
      ],
      semanticType: 'process_directive',
      tags: ['medical', 'geriatrics', 'beers-criteria', 'polypharmacy', 'deprescribing'],
    }),
  },

  'palliative-care-esaso-assessment': {
    id: 'palliative-care-esaso-assessment',
    name: 'PalliativeCareEsasoAssessmentSkill',
    displayName: 'Palliative Care ESAS-r Symptom Burden Assessment',
    categoryId: 'medical',
    description: 'Applies Edmonton Symptom Assessment System (ESAS-r) to systematically quantify physical and psychological distress in serious illness.',
    tags: ['medical', 'palliative-care', 'esas-r', 'symptom-management', 'pain-control'],
    transform: createStandardSkillTransform({
sectionName: 'Palliative Care ESAS-r Assessment Protocol',
      ruSectionName: 'Оценка симптоматической нагрузки в паллиативной помощи (ESAS-r)',
      instructions: [
        'Score nine core symptoms on validated 0-10 numeric rating scales: pain, tiredness, drowsiness, nausea, lack of appetite, shortness of breath, depression, anxiety, and overall well-being.',
        'Distinguish nociceptive pain from neuropathic or visceral pain to guide targeted multi-modal analgesic therapy.',
        'Address total pain concepts incorporating physical distress, existential angst, family caregiver burnout, and social isolation.',
        'Formulate holistic symptom management plans prioritizing patient-defined comfort goals over aggressive non-beneficial interventions.',
      ],
      ruInstructions: [
        'Оценивайте 9 ключевых симптомов по шкале от 0 до 10 (ESAS-r): боль, утомляемость, сонливость, тошнота, аппетит, одышка, депрессия, тревога и общее самочувствие.',
        'Дифференцируйте ноцицептивную, невропатическую и висцеральную боль для подбора таргетированной анальгетической терапии.',
        'Учитывайте концепцию «тотальной боли», охватывающую физические страдания, психологическую тревогу и истощение родственников.',
        'Формируйте комплексный план паллиативной помощи, ставя во главу угла комфорт пациента и его индивидуальные ценности.',
      ],
      semanticType: 'process_directive',
      tags: ['medical', 'palliative-care', 'esas-r', 'symptom-management', 'pain-control'],
    }),
  },

  'antimicrobial-stewardship-pathway': {
    id: 'antimicrobial-stewardship-pathway',
    name: 'AntimicrobialStewardshipPathwaySkill',
    displayName: 'Antimicrobial Stewardship & De-escalation Protocol',
    categoryId: 'medical',
    description: 'Guides rational antibiotic selection, local antibiogram alignment, empiric-to-targeted de-escalation, and duration limits.',
    tags: ['medical', 'antibiotics', 'stewardship', 'microbiology', 'idsa'],
    transform: createStandardSkillTransform({
sectionName: 'Antimicrobial Stewardship & De-escalation Protocol',
      ruSectionName: 'Протокол антимикробной терапии и деэскалации (Stewardship)',
      instructions: [
        'Differentiate true bacterial infection requiring antimicrobials from viral syndromes or sterile inflammatory colonization.',
        'Select narrowest effective spectrum empiric coverage aligned with standard guidelines (IDSA/Sanford Guide) and anatomical penetration.',
        'Mandate diagnostic microbiology blood/tissue cultures prior to initiating initial antibiotic administration whenever feasible.',
        'Enforce 48-72 hour "antibiotic time-out": review microbiological susceptibility results and immediately de-escalate or discontinue therapy.',
      ],
      ruInstructions: [
        'Четко дифференцируйте бактериальную инфекцию от вирусных респираторных заболеваний или бессимптомной бактериурии.',
        'Выбирайте антибиотик с минимально необходимым спектром действия с учетом проникновения в очаг инфекции (IDSA / Sanford Guide).',
        'Требуйте забора микробиологических посевов до введения первой дозы антибактериального препарата.',
        'Проводите обязательный «антибиотический тайм-аут» через 48–72 часа: анализ посевов с деэскалацией спектра или отменой антибиотика.',
      ],
      semanticType: 'process_directive',
      tags: ['medical', 'antibiotics', 'stewardship', 'microbiology', 'idsa'],
    }),
  },

  'psychiatric-dsm5-diagnostic-criteria': {
    id: 'psychiatric-dsm5-diagnostic-criteria',
    name: 'PsychiatricDsm5DiagnosticCriteriaSkill',
    displayName: 'DSM-5-TR Psychiatric Diagnostic Criteria Cross-Check',
    categoryId: 'medical',
    description: 'Systematically maps psychiatric symptoms against DSM-5-TR diagnostic criteria, exclusion rules, and functional impairment benchmarks.',
    tags: ['medical', 'psychiatry', 'dsm-5', 'mental-health', 'differential-diagnosis'],
    transform: createStandardSkillTransform({
sectionName: 'DSM-5-TR Psychiatric Diagnostic Verification',
      ruSectionName: 'Верификация диагностических критериев по DSM-5-TR',
      instructions: [
        'Enforce exact DSM-5-TR diagnostic criteria: required core symptoms (Criterion A), duration threshold (e.g., 2 weeks for MDD), and count thresholds.',
        'Screen rigorously for medical etiologies (thyroid disease, neurosyphilis, electrolyte disturbances) and substance-induced origins (Criterion C/D).',
        'Verify documented clinically significant distress or impairment in social, occupational, or other important areas of functioning (Criterion B).',
        'Exclude bipolar mania/hypomania history before evaluating unipolar major depressive episodes to prevent antidepressant-induced switching.',
      ],
      ruInstructions: [
        'Проверяйте соответствие строгим критериям DSM-5-TR: наличие облигатных симптомов (критерий А), порог длительности и необходимое число признаков.',
        'Исключайте соматические причины (гипотиреоз, электролитные нарушения) и состояния, вызванные приемом психоактивных веществ.',
        'Фиксируйте наличие клинически значимого дистресса или нарушений в профессиональной и социальной сферах жизни (критерий B).',
        'Обязательно исключайте эпизоды мании или гипомании в анамнезе перед оценкой депрессии для предотвращения ятрогенной инверсии фазы.',
      ],
      semanticType: 'process_directive',
      tags: ['medical', 'psychiatry', 'dsm-5', 'mental-health', 'differential-diagnosis'],
    }),
  },

  'cardiac-ecg-rhythm-interpretation': {
    id: 'cardiac-ecg-rhythm-interpretation',
    name: 'CardiacEcgRhythmInterpretationSkill',
    displayName: 'Systematic 12-Lead ECG Analysis Protocol',
    categoryId: 'medical',
    description: 'Executes disciplined 7-step electrocardiogram interpretation: rate, rhythm, axis, intervals, hypertrophy, ischemia, and infarction.',
    tags: ['medical', 'cardiology', 'ecg', 'arrhythmia', 'ischemia'],
    transform: createStandardSkillTransform({
sectionName: 'Systematic 12-Lead ECG Analysis Protocol',
      ruSectionName: 'Систематический протокол анализа 12-канальной ЭКГ',
      instructions: [
        'Step 1-2 (Rate & Rhythm): Calculate ventricular rate, determine regular vs irregular, and verify P wave morphology before each QRS.',
        'Step 3 (Axis): Determine frontal QRS axis using Leads I and aVF (Normal, LAD, RAD, Extreme axis deviation).',
        'Step 4 (Intervals): Quantify PR interval (120-200ms), QRS duration (<120ms), and QTc interval (Bazett formula, <450ms male, <460ms female).',
        'Step 5-7 (Morphology & Ischemia): Assess chamber enlargement (Sokolow-Lyon), ST-segment elevations/depressions, T-wave inversions, and pathological Q waves in anatomic vascular territories.',
      ],
      ruInstructions: [
        'Шаги 1–2 (Частота и ритм): Рассчитайте ЧСС, оцените регулярность ритма и наличие связи зубца P с каждым комплексом QRS.',
        'Шаг 3 (ЭОС): Определите электрическую ось сердца по отведениям I и aVF (нормальная, отклонение влево/вправо, резкое отклонение).',
        'Шаг 4 (Интервалы): Измерьте интервал PR (120-200 мс), ширину QRS (<120 мс) и корригированный QT (QTc по формуле Базетта).',
        'Шаги 5–7 (Ишемия и морфология): Оцените признаки гипертрофии (индекс Соколова-Лайона), элевации/депрессии ST, инверсию зубцов T и патологические зубцы Q по анатомическим бассейнам.',
      ],
      semanticType: 'process_directive',
      tags: ['medical', 'cardiology', 'ecg', 'arrhythmia', 'ischemia'],
    }),
  },

  'icu-apache-sofa-scoring': {
    id: 'icu-apache-sofa-scoring',
    name: 'IcuApacheSofaScoringSkill',
    displayName: 'ICU Critical Care Severity Scoring (SOFA & APACHE II)',
    categoryId: 'medical',
    description: 'Quantifies organ dysfunction and ICU mortality risk using sequential SOFA, qSOFA, and APACHE II physiologic scoring.',
    tags: ['medical', 'critical-care', 'icu', 'sofa', 'sepsis'],
    transform: createStandardSkillTransform({
sectionName: 'ICU Severity & Organ Dysfunction Scoring',
      ruSectionName: 'Оценка тяжести состояния в ОРИТ (SOFA / APACHE II)',
      instructions: [
        'Calculate Sequential Organ Failure Assessment (SOFA) across 6 organ systems: Respiration (PaO2/FiO2), Coagulation (Platelets), Liver (Bilirubin), Cardiovascular (MAP/Vasopressors), CNS (Glasgow Coma Scale), and Renal (Creatinine/Urine output).',
        'Apply Sepsis-3 definition: suspect sepsis when acute change in total SOFA score ≥ 2 points in setting of infection.',
        'Compute quick SOFA (qSOFA) at bedside: respiratory rate ≥ 22/min, altered mentation (GCS < 15), systolic BP ≤ 100 mmHg.',
        'Correlate total numerical scores with benchmarked ICU predicted in-hospital mortality rates and escalation triggers.',
      ],
      ruInstructions: [
        'Рассчитывайте шкалу SOFA по 6 органным системам: дыхание (PaO2/FiO2), коагуляция (тромбоциты), печень (билирубин), гемодинамика (АДср/вазопрессоры), ЦНС (ШКГ) и почки (креатинин/диурез).',
        'Применяйте критерии Сепсис-3: подозрение на сепсис при остром приросте баллов по SOFA ≥ 2 на фоне инфекционного процесса.',
        'Оценивайте скрининг qSOFA у постели больного: ЧДД ≥ 22/мин, нарушение сознания (ШКГ < 15), систолическое АД ≤ 100 мм рт. ст.',
        'Сопоставляйте сумму баллов с прогнозируемой госпитальной летальностью и триггерами перевода на ИВЛ или гемодиализ.',
      ],
      semanticType: 'process_directive',
      tags: ['medical', 'critical-care', 'icu', 'sofa', 'sepsis'],
    }),
  },

  'clinical-practice-guideline-appraisal': {
    id: 'clinical-practice-guideline-appraisal',
    name: 'ClinicalPracticeGuidelineAppraisalSkill',
    displayName: 'AGREE II Clinical Practice Guideline Appraisal',
    categoryId: 'medical',
    description: 'Critically evaluates clinical practice guidelines using the international 6-domain AGREE II methodological appraisal instrument.',
    tags: ['medical', 'agree-ii', 'evidence-based-medicine', 'guidelines', 'quality-appraisal'],
    transform: createStandardSkillTransform({
sectionName: 'AGREE II Guideline Quality Appraisal',
      ruSectionName: 'Методологическая оценка клинических рекомендаций по AGREE II',
      instructions: [
        'Appraise clinical practice guidelines across 6 validated AGREE II domains: Scope and Purpose, Stakeholder Involvement, Rigor of Development, Clarity of Presentation, Applicability, and Editorial Independence.',
        'Scrutinize systemic literature search methods, criteria for selecting evidence, and explicit links connecting evidence to recommendation strength.',
        'Evaluate practical implementation barriers, cost implications, monitoring audit criteria, and competing conflict-of-interest declarations.',
        'Deliver a categorical recommendation: "Recommend without modifications", "Recommend with modifications", or "Do not recommend".',
      ],
      ruInstructions: [
        'Оценивайте клинические руководства по 6 доменам международного инструмента AGREE II: цели и сфера, участие стейкхолдеров, методологическая строгость, ясность изложения, применимость и независимость авторов.',
        'Проверяйте полноту систематического поиска литературы, критерии отбора доказательств и прозрачность связи доказательной базы с силой рекомендаций.',
        'Анализируйте барьеры внедрения в практику, финансовые затраты, критерии аудита качества и декларации конфликтов интересов.',
        'Формулируйте итоговый вердикт: «Рекомендовано к применению», «Рекомендовано с оговорками» или «Не рекомендовано».',
      ],
      semanticType: 'process_directive',
      tags: ['medical', 'agree-ii', 'evidence-based-medicine', 'guidelines', 'quality-appraisal'],
    }),
  },

  'patient-adherence-brief-intervention': {
    id: 'patient-adherence-brief-intervention',
    name: 'PatientAdherenceBriefInterventionSkill',
    displayName: 'Motivational Interviewing for Medication Adherence',
    categoryId: 'medical',
    description: 'Deploys motivational interviewing (OARS) to resolve ambivalence, uncover adherence barriers, and co-create sustainable routines.',
    tags: ['medical', 'motivational-interviewing', 'adherence', 'communication', 'behavioral-health'],
    transform: createStandardSkillTransform({
sectionName: 'Motivational Interviewing & Adherence Protocol',
      ruSectionName: 'Мотивационное интервьюирование приверженности лечению (OARS)',
      instructions: [
        'Deploy the core OARS communication skills: Open-ended questions, Affirmations, Reflective listening, and Summaries.',
        'Explore patient perceived health beliefs, side effect fears, economic medication costs, and complex daily dosing friction.',
        'Avoid confrontational confrontation or authoritative lecturing; roll with patient resistance and elicit self-motivating "change talk".',
        'Co-create practical implementation intentions: habit-stacking medication intake with established daily rituals (e.g., brushing teeth).',
      ],
      ruInstructions: [
        'Применяйте технику OARS: открытые вопросы (Open questions), поддержка (Affirmations), эмпатическое отражение (Reflections) и обобщение (Summaries).',
        'Исследуйте персональные барьеры: страх побочных эффектов, финансовую доступность и забывчивость при сложном графике приема.',
        'Избегайте менторского тона и чтения нотаций; работайте с сопротивлением пациента и стимулируйте его личную внутреннюю мотивацию.',
        'Совместно вырабатывайте поведенческие триггеры: привязка приема таблеток к устойчивым повседневным ритуалам (утренний кофе, чистка зубов).',
      ],
      semanticType: 'behavior_directive',
      tags: ['medical', 'motivational-interviewing', 'adherence', 'communication', 'behavioral-health'],
    }),
  },

  'wound-care-push-tool-staging': {
    id: 'wound-care-push-tool-staging',
    name: 'WoundCarePushToolStagingSkill',
    displayName: 'Wound Healing Staging & PUSH Tool Assessment',
    categoryId: 'medical',
    description: 'Quantifies chronic wound healing using NPUAP/EPUAP pressure injury stages and the Pressure Ulcer Scale for Healing (PUSH).',
    tags: ['medical', 'wound-care', 'push-tool', 'dermatology', 'nursing'],
    transform: createStandardSkillTransform({
sectionName: 'Wound Care & PUSH Tool Healing Protocol',
      ruSectionName: 'Протокол оценки ран и динамики заживления (PUSH Tool)',
      instructions: [
        'Stage pressure injury using NPUAP guidelines: Stage 1 (Non-blanchable erythema), Stage 2 (Partial thickness), Stage 3 (Full thickness skin loss), Stage 4 (Full thickness tissue loss to bone/muscle), Unstageable, or Deep Tissue Injury.',
        'Score wound progression using the PUSH Tool v3.0: Length x Width surface area score, Exudate amount (None, Light, Moderate, Heavy), and Tissue type (Necrotic, Slough, Granulation, Epithelial).',
        'Track longitudinal PUSH score trajectory over time: declining score indicates positive clinical healing.',
        'Specify evidence-based dressing protocols aligned with exudate management and moisture balance (e.g., alginates, hydrocolloids, foams).',
      ],
      ruInstructions: [
        'Классифицируйте пролежень по шкале NPUAP: 1 стадия (небланшируемая эритема), 2 стадия (частичная утрата кожи), 3 стадия (полная утрата кожи), 4 стадия (некроз до кости/мышц) или недифференцируемая.',
        'Оценивайте динамику заживления по инструменту PUSH Tool v3.0: площадь раны (длина x ширина), объем экссудата и тип ткани на дне (некроз, фибрин, грануляции, эпителизация).',
        'Отслеживайте динамику баллов PUSH во времени: снижение суммы баллов объективно подтверждает заживление раны.',
        'Подбирайте раневые покрытия с учетом баланса влажности и экссудации (альгинаты, гидроколлоиды, гидрогели, полиуретановые губки).',
      ],
      semanticType: 'process_directive',
      tags: ['medical', 'wound-care', 'push-tool', 'dermatology', 'nursing'],
    }),
  },

  'rare-disease-phenotype-hpo-mapping': {
    id: 'rare-disease-phenotype-hpo-mapping',
    name: 'RareDiseasePhenotypeHpoMappingSkill',
    displayName: 'Human Phenotype Ontology (HPO) & Rare Disease Dysmorphology',
    categoryId: 'medical',
    description: 'Standardizes complex clinical dysmorphology features into Human Phenotype Ontology terms to query rare disease databases (Orphanet/OMIM).',
    tags: ['medical', 'genetics', 'rare-disease', 'hpo', 'omim'],
    transform: createStandardSkillTransform({
sectionName: 'HPO Rare Disease Phenotypic Mapping',
      ruSectionName: 'Фенотипическое картирование редких заболеваний по HPO (OMIM / Orphanet)',
      instructions: [
        'Map unstructured physical examination signs and dysmorphic features into standardized Human Phenotype Ontology (HPO) IDs and terminology.',
        'Structure findings by anatomical system: craniofacial, skeletal, neuromuscular, cardiovascular, and metabolic phenotypes.',
        'Query differential diagnostic entities across OMIM (Online Mendelian Inheritance in Man) and Orphanet orphan disease registries.',
        'Recommend prioritized next-generation sequencing tests: targeted gene panels, Whole Exome Sequencing (WES), or Whole Genome Sequencing (WGS).',
      ],
      ruInstructions: [
        'Преобразуйте описания дисморфологических признаков в стандартизированные термины и идентификаторы Human Phenotype Ontology (HPO).',
        'Структурируйте находки по анатомическим системам: черепно-лицевые аномалии, скелетные дисплазии, нервно-мышечные нарушения и кардиомиопатии.',
        'Формируйте дифференциальный диагностический ряд по базам данных орфанных заболеваний OMIM и Orphanet.',
        'Рекомендуйте целевые алгоритмы молекулярно-генетического подтверждения: таргетные панели, полноэкзомное (WES) или полногеномное секвенирование (WGS).',
      ],
      semanticType: 'structural_directive',
      tags: ['medical', 'genetics', 'rare-disease', 'hpo', 'omim'],
    }),
  },
  "sbar-clinical-handover-protocol": {
    id: "sbar-clinical-handover-protocol",
    name: "SbarClinicalHandoverProtocolSkill",
    displayName: "SBAR Clinical Communication (Situation, Background, Assessment, Recommendation)",
    categoryId: "medical",
    description: "Structures urgent inter-clinician and nurse-to-physician communication to eliminate misinterpretations during shift handoffs.",
    tags: ["medical","sbar","clinical-handover","patient-safety","communication"],
    transform: createStandardSkillTransform({
      sectionName: "SBAR Clinical Handover Protocol",
      ruSectionName: "Клинический протокол передачи смены SBAR",
      instructions: [
        "Situation: Identify patient, immediate problem, vital signs, and current concern.",
        "Background: Summarize admitting diagnosis, surgical dates, medications, and relevant clinical history.",
        "Assessment & Recommendation: State clinical assessment and specify clear required interventions with timeline."
],
      ruInstructions: [
        "Situation: Назовите пациента, острую проблему, текущие витальные показатели.",
        "Background: Опишите диагноз при поступлении, операции, текущие препараты и анамнез.",
        "Assessment / Recommendation: Изложите клиническую оценку и запросите конкретные назначения."
],
      semanticType: "process_directive",
      tags: ["medical","sbar","clinical-handover","patient-safety","communication"],
    }),
  },

  "evidence-based-grade-recommendation": {
    id: "evidence-based-grade-recommendation",
    name: "EvidenceBasedGradeRecommendationSkill",
    displayName: "GRADE Evidence Quality & Recommendation Strength",
    categoryId: "medical",
    description: "Evaluates medical literature and clinical trial rigor across High, Moderate, Low, and Very Low certainty of evidence.",
    tags: ["medical","grade-framework","evidence-based-medicine","systematic-review","guidelines"],
    transform: createStandardSkillTransform({
      sectionName: "GRADE Evidence Synthesis Protocol",
      ruSectionName: "Оценка качества доказательств по системе GRADE",
      instructions: [
        "Rate baseline study designs (RCTs vs observational cohorts).",
        "Downgrade for risk of bias, inconsistency, indirectness, imprecision, and publication bias.",
        "Issue definitive Strong or Conditional recommendations balancing benefits vs burdens."
],
      ruInstructions: [
        "Оцените базовый дизайн исследований (рандомизированные КИ vs когортные наблюдения).",
        "Снижайте уровень доказательности при риске систематической ошибки, неоднородности и неточности.",
        "Сформулируйте сильную или условную рекомендацию с учетом соотношения пользы и рисков."
],
      semanticType: 'protocol',
      tags: ["medical","grade-framework","evidence-based-medicine","systematic-review","guidelines"],
    }),
  },

  "sepsis-qsofa-early-warning-score": {
    id: "sepsis-qsofa-early-warning-score",
    name: "SepsisQsofaEarlyWarningScoreSkill",
    displayName: "qSOFA & NEWS2 Sepsis Early Warning Scoring",
    categoryId: "medical",
    description: "Calculates bedside quick SOFA and National Early Warning Scores to detect septic shock and clinical deterioration early.",
    tags: ["medical","sepsis","qsofa","news2","critical-care"],
    transform: createStandardSkillTransform({
      sectionName: "qSOFA / Sepsis Early Warning Protocol",
      ruSectionName: "Протокол раннего выявления сепсиса (qSOFA / NEWS2)",
      instructions: [
        "Evaluate 3 qSOFA criteria: Respiratory rate >= 22/min, Altered mentation (GCS < 15), Systolic BP <= 100 mmHg.",
        "Flag qSOFA score >= 2 for immediate lactate testing, blood cultures, and IV fluid resuscitation.",
        "Track NEWS2 aggregate trajectory for ICU escalation triggers."
],
      ruInstructions: [
        "Оцените 3 критерия qSOFA: ЧДД >= 22/мин, нарушение сознания (GCS < 15), САД <= 100 мм рт. ст.",
        "При балле >= 2 немедленно инициируйте забор лактата, гемокультуры и инфузионную терапию.",
        "Контролируйте шкалу NEWS2 для своевременного перевода в ОРИТ."
],
      semanticType: 'protocol',
      tags: ["medical","sepsis","qsofa","news2","critical-care"],
    }),
  },

  "drug-interaction-cytochrome-p450-audit": {
    id: "drug-interaction-cytochrome-p450-audit",
    name: "DrugInteractionCytochromeP450AuditSkill",
    displayName: "Pharmacokinetic CYP450 Drug Interaction Screen",
    categoryId: "medical",
    description: "Audits polypharmacy regimens for competitive CYP3A4, CYP2D6, and CYP2C19 substrate, inducer, and inhibitor collisions.",
    tags: ["medical","pharmacology","cyp450","drug-interactions","polypharmacy"],
    transform: createStandardSkillTransform({
      sectionName: "CYP450 Pharmacokinetic Interaction Screen",
      ruSectionName: "Фармакокинетический скрининг взаимодействий ферментов цитохрома P450",
      instructions: [
        "Map each medication to its primary metabolic enzymes and transporter proteins (e.g. P-gp).",
        "Identify potent inducers (lowering efficacy) and inhibitors (triggering toxicity).",
        "Recommend dose adjustments, therapeutic drug monitoring, or safer alternative agents."
],
      ruInstructions: [
        "Сопоставьте каждый препарат с путями метаболизма цитохрома P450 и транспортерами.",
        "Выявите сильные ингибиторы (риск токсичности) и индукторы (снижение эффективности).",
        "Предложите коррекцию дозировок, терапевтический мониторинг или безопасную замену."
],
      semanticType: 'protocol',
      tags: ["medical","pharmacology","cyp450","drug-interactions","polypharmacy"],
    }),
  },

  "pediatric-weight-based-dosing-calculator": {
    id: "pediatric-weight-based-dosing-calculator",
    name: "PediatricWeightBasedDosingCalculatorSkill",
    displayName: "Pediatric mg/kg Weight-Based Dosing & Safety Caps",
    categoryId: "medical",
    description: "Calculates pediatric drug dosages strictly by weight/body surface area while enforcing absolute adult maximum dose safety ceilings.",
    tags: ["medical","pediatrics","dosing","safety-caps","pharmacology"],
    transform: createStandardSkillTransform({
      sectionName: "Pediatric Dosing & Safety Verification",
      ruSectionName: "Педиатрический расчет дозировок по массе тела с контролем максимумов",
      instructions: [
        "Verify patient age, exact weight in kg, and renal/hepatic clearance considerations.",
        "Calculate dose: mg/kg/dose or mg/kg/day divided into standard administration intervals.",
        "Enforce strict rule: pediatric calculated dose MUST NEVER exceed the recommended adult single/daily maximum."
],
      ruInstructions: [
        "Уточните точный возраст, вес ребенка в кг и функцию почек/печени.",
        "Рассчитайте дозировку: мг/кг на прием или в сутки с распределением по интервалам.",
        "Примените жесткое правило: детская доза ни при каких условиях не должна превышать взрослый максимум."
],
      semanticType: "process_directive",
      tags: ["medical","pediatrics","dosing","safety-caps","pharmacology"],
    }),
  },

  "radiology-birads-tirads-reporting-standard": {
    id: "radiology-birads-tirads-reporting-standard",
    name: "RadiologyBiradsTiradsReportingStandardSkill",
    displayName: "Structured Radiology Lexicon (BI-RADS & TI-RADS)",
    categoryId: "medical",
    description: "Structures mammography and thyroid ultrasound reports using standard ACR lexicons and risk category classifications (1 through 6).",
    tags: ["medical","radiology","birads","tirads","imaging-reports"],
    transform: createStandardSkillTransform({
      sectionName: "Radiology Classification Protocol",
      ruSectionName: "Стандартизированный радиологический протокол (BI-RADS / TI-RADS)",
      instructions: [
        "Describe lesion morphology, margins, composition, and echogenicity using standardized ACR terms.",
        "Assign definitive Category (0: Incomplete, 1: Negative, 2: Benign, 3: Probably Benign, 4: Suspicious, 5: Highly Suggestive of Malignancy).",
        "Specify clear follow-up action (routine screening, 6-month interval US, or FNA biopsy)."
],
      ruInstructions: [
        "Опишите морфологию, контуры, структуру и эхогенность узла по терминологии ACR.",
        "Присвойте категорию BI-RADS / TI-RADS (от 1 до 5/6).",
        "Сформулируйте четкую тактику (рутинный скрининг, контроль через 6 мес. или ТАБ-биопсия)."
],
      semanticType: "process_directive",
      tags: ["medical","radiology","birads","tirads","imaging-reports"],
    }),
  },

  "ecg-12-lead-systematic-interpretation": {
    id: "ecg-12-lead-systematic-interpretation",
    name: "Ecg12LeadSystematicInterpretationSkill",
    displayName: "12-Lead ECG Systematic Interpretation Protocol",
    categoryId: "medical",
    description: "Executes a rigorous step-by-step ECG analysis: Rate, Rhythm, Axis, Intervals (PR, QRS, QTc), Hypertrophy, Ischemia/Infarction (ST-T waves).",
    tags: ["medical","cardiology","ecg","12-lead","arrhythmia"],
    transform: createStandardSkillTransform({
      sectionName: "12-Lead ECG Interpretation Protocol",
      ruSectionName: "Систематический протокол расшифровки 12-канальной ЭКГ",
      instructions: [
        "Calculate Heart Rate and evaluate Rhythm regularity (sinus vs nodal/ectopic).",
        "Determine QRS electrical axis and measure intervals (PR < 200ms, QRS < 120ms, QTc < 450/460ms).",
        "Check for STEMI regional distributions (Anterior V1-V4, Inferior II/III/aVF, Lateral I/aVL/V5-V6) and reciprocal depressions."
],
      ruInstructions: [
        "Рассчитайте ЧСС и определите регулярность ритма (синусовый / эктопический).",
        "Определите электрическую ось сердца и измерьте интервалы (PR, QRS, корригированный QT).",
        "Проверьте регионарные подъемы сегмента ST (передняя, нижняя, боковая стенки) и реципрокные изменения."
],
      semanticType: 'protocol',
      tags: ["medical","cardiology","ecg","12-lead","arrhythmia"],
    }),
  },

  "diabetic-ketoacidosis-dka-management-flow": {
    id: "diabetic-ketoacidosis-dka-management-flow",
    name: "DiabeticKetoacidosisDkaManagementFlowSkill",
    displayName: "Diabetic Ketoacidosis (DKA) Fluid & Insulin Protocol",
    categoryId: "medical",
    description: "Manages critical DKA resuscitation: isotonic fluid resuscitation, potassium replacement prior to insulin, and anion gap closure monitoring.",
    tags: ["medical","endocrinology","dka","emergency","intensive-care"],
    transform: createStandardSkillTransform({
      sectionName: "DKA Resuscitation & Management Protocol",
      ruSectionName: "Клинический протокол ведения диабетического кетоацидоза (ДКА)",
      instructions: [
        "Calculate Serum Anion Gap = Na - (Cl + HCO3) and effective serum osmolality.",
        "Rule: Never start IV insulin if serum potassium K+ is < 3.3 mEq/L; replenish potassium first.",
        "Transition from 0.9% Normal Saline to D5W + 0.45% NS once blood glucose drops below 200-250 mg/dL."
],
      ruInstructions: [
        "Рассчитайте анионный интервал: Na - (Cl + HCO3) и эффективную осмолярность плазмы.",
        "Правило: Не вводите инсулин, если уровень калия < 3.3 ммоль/л; сначала восполните калий.",
        "Перейдите на глюкозосодержащие растворы (D5W), как только гликемия опустится ниже 11-13 ммоль/л."
],
      semanticType: "process_directive",
      tags: ["medical","endocrinology","dka","emergency","intensive-care"],
    }),
  },

  "curb-65-pneumonia-severity-triage": {
    id: "curb-65-pneumonia-severity-triage",
    name: "Curb65PneumoniaSeverityTriageSkill",
    displayName: "CURB-65 Community-Acquired Pneumonia Triage",
    categoryId: "medical",
    description: "Scores pneumonia severity to direct patients to Outpatient, Inpatient Ward, or ICU care settings.",
    tags: ["medical","pulmonology","curb65","pneumonia","triage"],
    transform: createStandardSkillTransform({
      sectionName: "CURB-65 Pneumonia Triage Protocol",
      ruSectionName: "Оценка тяжести внебольничной пневмонии по шкале CURB-65",
      instructions: [
        "Score 1 point each for: Confusion, Urea > 7 mmol/L, Respiratory rate >= 30/min, Blood pressure (SBP < 90 or DBP <= 60), Age >= 65.",
        "Score 0-1: Low risk, outpatient treatment appropriate.",
        "Score 2: Moderate risk, short-stay inpatient admission; Score 3-5: High risk, immediate inpatient or ICU admission."
],
      ruInstructions: [
        "Начислите по 1 баллу за: спутанность сознания, мочевину > 7 ммоль/л, ЧДД >= 30, АД < 90/60, возраст >= 65.",
        "0-1 балл: амбулаторное лечение.",
        "2 балла: стационар; 3-5 баллов: тяжелое течение, госпитализация в стационар или ОРИТ."
],
      semanticType: 'protocol',
      tags: ["medical","pulmonology","curb65","pneumonia","triage"],
    }),
  },

  "antimicrobial-stewardship-empiric-deescalation": {
    id: "antimicrobial-stewardship-empiric-deescalation",
    name: "AntimicrobialStewardshipEmpiricDeescalationSkill",
    displayName: "Antimicrobial Stewardship & Empiric-to-Targeted De-escalation",
    categoryId: "medical",
    description: "Guides narrow-spectrum antimicrobial de-escalation based on culture sensitivities, reducing resistance and C. diff risks.",
    tags: ["medical","infectious-disease","antimicrobial-stewardship","antibiotics","deescalation"],
    transform: createStandardSkillTransform({
      sectionName: "Antimicrobial De-escalation Protocol",
      ruSectionName: "Протокол рациональной антибиотикотерапии и деэскалации",
      instructions: [
        "Review Gram stain, local antibiogram patterns, and initial empiric coverage.",
        "Re-evaluate at 48-72 hours with definitive microbiology culture and MIC sensitivities.",
        "De-escalate from broad-spectrum (e.g. Vancomycin + Cefepime) to targeted narrow-spectrum monotherapy."
],
      ruInstructions: [
        "Оцените окраску по Граму, локальный антибиотикорезистентный профиль и стартовую терапию.",
        "Проведите ревизию через 48-72 часа после получения результатов бакпосева и МПК.",
        "Сузьте спектр терапии с препаратов широкого спектра до таргетного монопрепарата."
],
      semanticType: "process_directive",
      tags: ["medical","infectious-disease","antimicrobial-stewardship","antibiotics","deescalation"],
    }),
  },

  "stroke-nihss-tpa-thrombectomy-window": {
    id: "stroke-nihss-tpa-thrombectomy-window",
    name: "StrokeNihssTpaThrombectomyWindowSkill",
    displayName: "Acute Ischemic Stroke NIHSS & Thrombolysis Window",
    categoryId: "medical",
    description: "Assesses acute stroke deficit severity (NIHSS) and validates IV thrombolysis (<4.5 hr) vs endovascular thrombectomy (<24 hr) windows.",
    tags: ["medical","neurology","stroke","nihss","tpa","thrombectomy"],
    transform: createStandardSkillTransform({
      sectionName: "Acute Stroke Thrombolysis Triage",
      ruSectionName: "Протокол триажа острого инсульта (шкала NIHSS и окна тромболизиса)",
      instructions: [
        "Calculate NIHSS total score (Level of Consciousness, Visual fields, Facial palsy, Motor arm/leg, Sensory, Ataxia, Language, Dysarthria, Extinction).",
        "Verify Last Known Normal (LKN) time against IV alteplase/tenecteplase 4.5-hour window and contraindications.",
        "Screen CTA/CTP for Large Vessel Occlusion (LVO) candidate for endovascular thrombectomy (EVT)."
],
      ruInstructions: [
        "Рассчитайте балл по шкале NIHSS (сознание, поля зрения, парезы конечностей, речь, чувствительность).",
        "Проверьте время \"последнего здорового состояния\" относительно терапевтического окна 4.5 часа для тромболизиса.",
        "Оцените КТ-ангиографию на предмет окклюзии крупной церебральной артерии для тромбэктомии."
],
      semanticType: "process_directive",
      tags: ["medical","neurology","stroke","nihss","tpa","thrombectomy"],
    }),
  },

  "mental-status-mmse-moca-cognitive-screen": {
    id: "mental-status-mmse-moca-cognitive-screen",
    name: "MentalStatusMmseMocaCognitiveScreenSkill",
    displayName: "Cognitive Impairment Screening (MoCA & MMSE)",
    categoryId: "medical",
    description: "Conducts standardized screening for Mild Cognitive Impairment (MCI) and dementia sub-domains.",
    tags: ["medical","geriatrics","neurology","moca","mmse","dementia"],
    transform: createStandardSkillTransform({
      sectionName: "MoCA / MMSE Cognitive Screening Protocol",
      ruSectionName: "Протокол скрининга когнитивных нарушений (MoCA / MMSE)",
      instructions: [
        "Score Visuospatial/Executive, Naming, Memory, Attention, Language, Abstraction, Delayed Recall, and Orientation.",
        "Apply educational adjustment (+1 point if <= 12 years of formal education).",
        "Interpret threshold: MoCA < 26/30 suggests possible MCI or dementia warranting comprehensive neuropsychological workup."
],
      ruInstructions: [
        "Оцените блоки: зрительно-пространственные функции, память, внимание, речь, абстракцию и ориентацию.",
        "Сделайте поправку на уровень образования (+1 балл при стаже учебы <= 12 лет).",
        "Интерпретируйте результат: MoCA < 26 указывает на возможные когнитивные нарушения."
],
      semanticType: 'protocol',
      tags: ["medical","geriatrics","neurology","moca","mmse","dementia"],
    }),
  },

  "burn-rule-of-nines-parkland-formula": {
    id: "burn-rule-of-nines-parkland-formula",
    name: "BurnRuleOfNinesParklandFormulaSkill",
    displayName: "Burn Resuscitation (Rule of Nines & Parkland Formula)",
    categoryId: "medical",
    description: "Calculates Total Body Surface Area (TBSA) burned and calculates 24-hour Lactated Ringer’s fluid resuscitation volumes.",
    tags: ["medical","burns","trauma","parkland-formula","resuscitation"],
    transform: createStandardSkillTransform({
      sectionName: "Burn TBSA & Parkland Resuscitation Protocol",
      ruSectionName: "Оценка площади ожогов (правило девяток) и формула Паркланда",
      instructions: [
        "Calculate % TBSA burned using Wallace Rule of Nines (Head 9%, Arms 9% each, Anterior Trunk 18%, Posterior Trunk 18%, Legs 18% each, Perineum 1%).",
        "Apply Parkland Formula: 4 mL * Weight (kg) * % TBSA (2nd and 3rd degree burns only).",
        "Administer 50% of total volume over the first 8 hours (from time of burn) and remaining 50% over the next 16 hours."
],
      ruInstructions: [
        "Рассчитайте % поражения по \"правилу девяток\" Уоллеса (голова 9%, руки по 9%, туловище спереди 18%, сзади 18%, ноги по 18%).",
        "Примените формулу Паркланда: 4 мл * Масса (кг) * % TBSA (только II и III степень).",
        "Введите первые 50% объема за первые 8 часов с момента травмы, остальные 50% — за следующие 16 часов."
],
      semanticType: "process_directive",
      tags: ["medical","burns","trauma","parkland-formula","resuscitation"],
    }),
  },

  "gcs-glasgow-coma-scale-neurological-triage": {
    id: "gcs-glasgow-coma-scale-neurological-triage",
    name: "GcsGlasgowComaScaleNeurologicalTriageSkill",
    displayName: "Glasgow Coma Scale (GCS) Assessment",
    categoryId: "medical",
    description: "Scores patient conscious state across Eye (1-4), Verbal (1-5), and Motor (1-6) responses.",
    tags: ["medical","neurology","gcs","trauma","coma-scale"],
    transform: createStandardSkillTransform({
      sectionName: "Glasgow Coma Scale (GCS) Scoring Protocol",
      ruSectionName: "Протокол оценки глубины комы по шкале Глазго (GCS)",
      instructions: [
        "Eye Opening (E 1-4): Spontaneous (4), To Sound (3), To Pressure (2), None (1).",
        "Verbal Response (V 1-5): Oriented (5), Confused (4), Inappropriate words (3), Incomprehensible sounds (2), None (1).",
        "Motor Response (M 1-6): Obeys commands (6), Localizing (5), Normal flexion/withdrawal (4), Abnormal flexion (3), Extension (2), None (1). GCS <= 8 mandates airway protection (intubation)."
],
      ruInstructions: [
        "Открывание глаз (E 1-4): Спонтанное (4), На голос (3), На боль (2), Отсутствует (1).",
        "Речевая реакция (V 1-5): Ориентирован (5), Спутанная речь (4), Неадекватные слова (3), Нечленораздельные звуки (2), Нет (1).",
        "Двигательная реакция (M 1-6): Выполняет команды (6), Локализует боль (5), Отдергивание (4), Сгибание (3), Разгибание (2), Нет (1). Балл <= 8 требует интубации."
],
      semanticType: 'protocol',
      tags: ["medical","neurology","gcs","trauma","coma-scale"],
    }),
  },

  "pre-op-surgical-clearance-cardiac-risk-rcri": {
    id: "pre-op-surgical-clearance-cardiac-risk-rcri",
    name: "PreOpSurgicalClearanceCardiacRiskRcriSkill",
    displayName: "Preoperative Cardiac Risk Stratification (Lee RCRI)",
    categoryId: "medical",
    description: "Assesses Revised Cardiac Risk Index (RCRI) score to quantify perioperative major adverse cardiac events (MACE) risk.",
    tags: ["medical","anesthesiology","cardiac-risk","rcri","pre-op-clearance"],
    transform: createStandardSkillTransform({
      sectionName: "Preoperative RCRI Cardiac Risk Stratification",
      ruSectionName: "Предоперационная стратификация кардиального риска (индекс Ли RCRI)",
      instructions: [
        "Audit 6 independent predictors: High-risk surgery, Ischemic heart disease history, Heart failure history, Cerebrovascular disease, Diabetes on insulin, Pre-op creatinine > 2.0 mg/dL.",
        "Calculate MACE event risk tier (0 points: 0.4%, 1 point: 1.0%, 2 points: 2.4%, >=3 points: 5.4%+).",
        "Determine necessity for pre-op stress echocardiography or cardiology consultation."
],
      ruInstructions: [
        "Проверьте 6 факторов: операция высокого риска, ИБС в анамнезе, СН, ОНМК, инсулинопотребный диабет, креатинин > 177 мкмоль/л.",
        "Рассчитайте риск осложнений (0 факторов — 0.4%, >=3 факторов — свыше 5.4%).",
        "Определите показания для дополнительного стресс-ЭхоКГ или консультации кардиолога."
],
      semanticType: 'protocol',
      tags: ["medical","anesthesiology","cardiac-risk","rcri","pre-op-clearance"],
    }),
  },

  "fluid-electrolyte-hyperkalemia-stabilization": {
    id: "fluid-electrolyte-hyperkalemia-stabilization",
    name: "FluidElectrolyteHyperkalemiaStabilizationSkill",
    displayName: "Severe Hyperkalemia Acute Membrane Stabilization",
    categoryId: "medical",
    description: "Executes emergency management of severe hyperkalemia (K+ > 6.5 mEq/L or ECG peaked T-waves): Calcium gluconate, Insulin + D50, Beta-agonists, and Dialysis.",
    tags: ["medical","nephrology","hyperkalemia","electrolytes","emergency-resuscitation"],
    transform: createStandardSkillTransform({
      sectionName: "Emergency Hyperkalemia Stabilization Protocol",
      ruSectionName: "Протокол экстренной помощи при тяжелой гиперкалиемии",
      instructions: [
        "Step 1 (Membrane Stabilization): IV Calcium Gluconate (or Calcium Chloride) to prevent ventricular arrhythmias.",
        "Step 2 (Intracellular Shift): 10 units Regular Insulin IV + 50 mL 50% Dextrose (D50) and inhaled Albuterol.",
        "Step 3 (Elimination): Loop diuretics (Furosemide), Sodium zirconium cyclosilicate (Lokelma), or emergent Hemodialysis."
],
      ruInstructions: [
        "Шаг 1 (Стабилизация мембран): В/в глюконат кальция для предотвращения фибрилляции желудочков.",
        "Шаг 2 (Смещение в клетку): 10 ЕД инсулина короткого действия + 50 мл 50% глюкозы и ингаляции сальбутамола.",
        "Шаг 3 (Выведение из организма): Петлевые диуретики, калий-байндеры или экстренный гемодиализ."
],
      semanticType: "process_directive",
      tags: ["medical","nephrology","hyperkalemia","electrolytes","emergency-resuscitation"],
    }),
  },

  "anaphylaxis-epinephrine-resuscitation-protocol": {
    id: "anaphylaxis-epinephrine-resuscitation-protocol",
    name: "AnaphylaxisEpinephrineResuscitationProtocolSkill",
    displayName: "Acute Anaphylaxis Intramuscular Epinephrine Protocol",
    categoryId: "medical",
    description: "Enforces immediate first-line Intramuscular (IM) Epinephrine administration for acute anaphylaxis with hemodynamic monitoring.",
    tags: ["medical","allergology","anaphylaxis","epinephrine","emergency"],
    transform: createStandardSkillTransform({
      sectionName: "Acute Anaphylaxis Emergency Protocol",
      ruSectionName: "Протокол экстренной помощи при анафилаксии (внутримышечный адреналин)",
      instructions: [
        "First-Line Mandate: Administer Epinephrine 1:1,000 (1 mg/mL) 0.3-0.5 mg IM into the anterolateral mid-thigh immediately.",
        "Position patient supine with legs elevated (unless airway compromised); administer high-flow oxygen and IV crystalloids.",
        "Repeat IM Epinephrine every 5-15 minutes if symptoms persist; secondary agents (antihistamines, corticosteroids) MUST NEVER delay epinephrine."
],
      ruInstructions: [
        "Первая линия: Немедленно введите адреналин 1:1000 0.3-0.5 мг в/м в переднелатеральную поверхность бедра.",
        "Положите пациента на спину с приподнятыми ногами; обеспечьте кислород и инфузию физраствора.",
        "Повторяйте инъекцию каждые 5-15 минут при необходимости; антигистаминные препараты не должны задерживать адреналин."
],
      semanticType: "process_directive",
      tags: ["medical","allergology","anaphylaxis","epinephrine","emergency"],
    }),
  },

  "chronic-kidney-disease-kdigo-staging": {
    id: "chronic-kidney-disease-kdigo-staging",
    name: "ChronicKidneyDiseaseKdigoStagingSkill",
    displayName: "KDIGO CKD Staging & Heatmap Progression Matrix",
    categoryId: "medical",
    description: "Stages Chronic Kidney Disease across eGFR (G1-G5) and Albuminuria (A1-A3) grids to guide nephrology referral and SGLT2i/RAASi dosing.",
    tags: ["medical","nephrology","ckd","kdigo","egfr","albuminuria"],
    transform: createStandardSkillTransform({
      sectionName: "KDIGO CKD Staging Protocol",
      ruSectionName: "Стадирование хронической болезни почек по матрице KDIGO",
      instructions: [
        "Classify eGFR: G1 (>90), G2 (60-89), G3a (45-59), G3b (30-44), G4 (15-29), G5 (<15 mL/min/1.73m2).",
        "Classify Albumin-to-Creatinine Ratio (ACR): A1 (<30), A2 (30-300), A3 (>300 mg/g).",
        "Recommend guideline-directed medical therapy (SGLT2 inhibitors, ACEi/ARB, Non-steroidal MRAs) based on progression risk."
],
      ruInstructions: [
        "Определите категорию СКФ: G1 (>90), G2 (60-89), G3a (45-59), G3b (30-44), G4 (15-29), G5 (<15 мл/мин).",
        "Оцените альбуминурию: A1 (<30), A2 (30-300), A3 (>300 мг/г).",
        "Назначьте органопротективную терапию (ингибиторы SGLT2, иАПФ/БРА) с учетом риска прогрессирования ХБП."
],
      semanticType: 'protocol',
      tags: ["medical","nephrology","ckd","kdigo","egfr","albuminuria"],
    }),
  },

  "post-op-pain-multimodal-analgesia-ladder": {
    id: "post-op-pain-multimodal-analgesia-ladder",
    name: "PostOpPainMultimodalAnalgesiaLadderSkill",
    displayName: "WHO Analgesic Ladder & Multimodal Post-Op Pain",
    categoryId: "medical",
    description: "Constructs opioid-sparing multimodal analgesia combining Acetaminophen, NSAIDs, Gabapentinoids, Local blocks, and rescue PCA opioids.",
    tags: ["medical","anesthesiology","pain-management","analgesia","opioid-sparing"],
    transform: createStandardSkillTransform({
      sectionName: "Multimodal Pain Management Protocol",
      ruSectionName: "Ступенчатая мультимодальная анальгезия и протоколы ERAS",
      instructions: [
        "Layer scheduled non-opioid baseline analgesics (Acetaminophen + NSAID/COX-2 inhibitor unless contraindicated).",
        "Incorporate regional nerve blocks or continuous wound infiltration.",
        "Reserve short-acting opioids strictly for breakthrough pain with sedation and respiratory rate monitoring."
],
      ruInstructions: [
        "Назначьте базисную неопиоидную терапию (парацетамол + НПВП/коксибы по часам).",
        "Используйте регионарные блокады нервов и инфильтрационную анестезию.",
        "Опиоиды оставьте только для купирования прорывной боли с мониторингом частоты дыхания."
],
      semanticType: 'protocol',
      tags: ["medical","anesthesiology","pain-management","analgesia","opioid-sparing"],
    }),
  },

  "palliative-care-espc-symptom-control": {
    id: "palliative-care-espc-symptom-control",
    name: "PalliativeCareEspcSymptomControlSkill",
    displayName: "Palliative Symptom Control & Goal-of-Care Alignment",
    categoryId: "medical",
    description: "Provides compassionate management of intractable dyspnea, nausea, pain crises, and terminal secretions aligned with patient advance directives.",
    tags: ["medical","palliative","hospice","symptom-control","end-of-life"],
    transform: createStandardSkillTransform({
      sectionName: "Palliative Care Symptom Management",
      ruSectionName: "Паллиативный контроль симптомов и согласование целей помощи",
      instructions: [
        "Align treatment goals directly with patient Advance Directives and surrogate decision makers.",
        "Manage refractory dyspnea with low-dose opioids (morphine) and fan therapy.",
        "Treat terminal respiratory secretions (death rattle) with antimuscarinics (Glycopyrrolate/Hyoscine)."
],
      ruInstructions: [
        "Согласуйте объем помощи с предварительными распоряжениями пациента и его доверенными лицами.",
        "Купируйте тягостную одышку микродозами морфина и направленным потоком воздуха.",
        "Примените холинолитики (гликопирролат) для устранения предсмертного клокочущего дыхания."
],
      semanticType: "process_directive",
      tags: ["medical","palliative","hospice","symptom-control","end-of-life"],
    }),
  },
  "medical-differential-diagnosis-soap-clinical-note": {
    id: "medical-differential-diagnosis-soap-clinical-note",
    name: "DifferentialDiagnosisSOAPClinicalNoteSkill",
    displayName: "Differential Diagnosis SOAP Clinical Note",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Differential Diagnosis SOAP Clinical Note.",
    tags: ["medical","differential","diagnosis","soap"],
    transform: createStandardSkillTransform({
      sectionName: "SOAP Clinical Note Architecture",
      ruSectionName: "Стандарты и практические требования: Differential Diagnosis SOAP Clinical Note",
      instructions: [
        "Apply core domain tenets and industry best practices for Differential Diagnosis SOAP Clinical Note.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Differential Diagnosis SOAP Clinical Note.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","differential","diagnosis","soap"],
    }),
  },

  "medical-evidence-based-medicine-grade-quality-scoring": {
    id: "medical-evidence-based-medicine-grade-quality-scoring",
    name: "EvidenceBasedMedicineGRADEQualityScoringSkill",
    displayName: "Evidence-Based Medicine GRADE Quality Scoring",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Evidence-Based Medicine GRADE Quality Scoring.",
    tags: ["medical","evidence","based","medicine"],
    transform: createStandardSkillTransform({
      sectionName: "GRADE Evidence Assessment Protocol",
      ruSectionName: "Стандарты и практические требования: Evidence-Based Medicine GRADE Quality Scoring",
      instructions: [
        "Apply core domain tenets and industry best practices for Evidence-Based Medicine GRADE Quality Scoring.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Evidence-Based Medicine GRADE Quality Scoring.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","evidence","based","medicine"],
    }),
  },

  "medical-clinical-pharmacokinetics-dosing-calculation": {
    id: "medical-clinical-pharmacokinetics-dosing-calculation",
    name: "ClinicalPharmacokineticsDosingCalculationSkill",
    displayName: "Clinical Pharmacokinetics Dosing Calculation",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Clinical Pharmacokinetics Dosing Calculation.",
    tags: ["medical","clinical","pharmacokinetics","dosing"],
    transform: createStandardSkillTransform({
      sectionName: "Pharmacokinetics Dosing Standards",
      ruSectionName: "Стандарты и практические требования: Clinical Pharmacokinetics Dosing Calculation",
      instructions: [
        "Apply core domain tenets and industry best practices for Clinical Pharmacokinetics Dosing Calculation.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Clinical Pharmacokinetics Dosing Calculation.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","clinical","pharmacokinetics","dosing"],
    }),
  },

  "medical-sepsis-qsofa-screening-early-warning-protocol": {
    id: "medical-sepsis-qsofa-screening-early-warning-protocol",
    name: "SepsisqSOFAScreeningEarlyWarningProtocolSkill",
    displayName: "Sepsis qSOFA Screening & Early Warning Protocol",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Sepsis qSOFA Screening & Early Warning Protocol.",
    tags: ["medical","sepsis","qsofa","screening"],
    transform: createStandardSkillTransform({
      sectionName: "qSOFA Sepsis Screening Protocol",
      ruSectionName: "Стандарты и практические требования: Sepsis qSOFA Screening & Early Warning Protocol",
      instructions: [
        "Apply core domain tenets and industry best practices for Sepsis qSOFA Screening & Early Warning Protocol.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Sepsis qSOFA Screening & Early Warning Protocol.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","sepsis","qsofa","screening"],
    }),
  },

  "medical-electrocardiogram-ecg-ekg-12-lead-systematic-interpretation": {
    id: "medical-electrocardiogram-ecg-ekg-12-lead-systematic-interpretation",
    name: "ElectrocardiogramECGEKG12LeadSystematicInterpretationSkill",
    displayName: "Electrocardiogram (ECG/EKG) 12-Lead Systematic Interpretation",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Electrocardiogram (ECG/EKG) 12-Lead Systematic Interpretation.",
    tags: ["medical","electrocardiogram","ecg","ekg"],
    transform: createStandardSkillTransform({
      sectionName: "12-Lead ECG Interpretation Blueprint",
      ruSectionName: "Стандарты и практические требования: Electrocardiogram (ECG/EKG) 12-Lead Systematic Interpretation",
      instructions: [
        "Apply core domain tenets and industry best practices for Electrocardiogram (ECG/EKG) 12-Lead Systematic Interpretation.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Electrocardiogram (ECG/EKG) 12-Lead Systematic Interpretation.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","electrocardiogram","ecg","ekg"],
    }),
  },

  "medical-palliative-care-serious-illness-conversation": {
    id: "medical-palliative-care-serious-illness-conversation",
    name: "PalliativeCareSeriousIllnessConversationSkill",
    displayName: "Palliative Care Serious Illness Conversation",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Palliative Care Serious Illness Conversation.",
    tags: ["medical","palliative","care","serious"],
    transform: createStandardSkillTransform({
      sectionName: "Serious Illness Communication Standards",
      ruSectionName: "Стандарты и практические требования: Palliative Care Serious Illness Conversation",
      instructions: [
        "Apply core domain tenets and industry best practices for Palliative Care Serious Illness Conversation.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Palliative Care Serious Illness Conversation.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","palliative","care","serious"],
    }),
  },

  "medical-antibiotic-stewardship-antibiogram-guidance": {
    id: "medical-antibiotic-stewardship-antibiogram-guidance",
    name: "AntibioticStewardshipAntibiogramGuidanceSkill",
    displayName: "Antibiotic Stewardship Antibiogram Guidance",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Antibiotic Stewardship Antibiogram Guidance.",
    tags: ["medical","antibiotic","stewardship","antibiogram"],
    transform: createStandardSkillTransform({
      sectionName: "Antibiotic Stewardship Protocol",
      ruSectionName: "Стандарты и практические требования: Antibiotic Stewardship Antibiogram Guidance",
      instructions: [
        "Apply core domain tenets and industry best practices for Antibiotic Stewardship Antibiogram Guidance.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Antibiotic Stewardship Antibiogram Guidance.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","antibiotic","stewardship","antibiogram"],
    }),
  },

  "medical-tnm-cancer-staging-oncology-multidisciplinary-tumor-board": {
    id: "medical-tnm-cancer-staging-oncology-multidisciplinary-tumor-board",
    name: "TNMCancerStagingOncologyMultidisciplinaryTumorBoardSkill",
    displayName: "TNM Cancer Staging & Oncology Multidisciplinary Tumor Board",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for TNM Cancer Staging & Oncology Multidisciplinary Tumor Board.",
    tags: ["medical","tnm","cancer","staging"],
    transform: createStandardSkillTransform({
      sectionName: "TNM Oncology Staging Standards",
      ruSectionName: "Стандарты и практические требования: TNM Cancer Staging & Oncology Multidisciplinary Tumor Board",
      instructions: [
        "Apply core domain tenets and industry best practices for TNM Cancer Staging & Oncology Multidisciplinary Tumor Board.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для TNM Cancer Staging & Oncology Multidisciplinary Tumor Board.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","tnm","cancer","staging"],
    }),
  },

  "medical-pediatric-weight-based-emergency-resuscitation-broselow": {
    id: "medical-pediatric-weight-based-emergency-resuscitation-broselow",
    name: "PediatricWeightBasedEmergencyResuscitationBroselowSkill",
    displayName: "Pediatric Weight-Based Emergency Resuscitation (Broselow)",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Pediatric Weight-Based Emergency Resuscitation (Broselow).",
    tags: ["medical","pediatric","weight","based"],
    transform: createStandardSkillTransform({
      sectionName: "Pediatric Resuscitation Guidelines",
      ruSectionName: "Стандарты и практические требования: Pediatric Weight-Based Emergency Resuscitation (Broselow)",
      instructions: [
        "Apply core domain tenets and industry best practices for Pediatric Weight-Based Emergency Resuscitation (Broselow).",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Pediatric Weight-Based Emergency Resuscitation (Broselow).",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","pediatric","weight","based"],
    }),
  },

  "medical-trauma-atls-primary-secondary-survey": {
    id: "medical-trauma-atls-primary-secondary-survey",
    name: "TraumaATLSPrimarySecondarySurveySkill",
    displayName: "Trauma ATLS Primary & Secondary Survey",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Trauma ATLS Primary & Secondary Survey.",
    tags: ["medical","trauma","atls","primary"],
    transform: createStandardSkillTransform({
      sectionName: "ATLS Trauma Survey Standards",
      ruSectionName: "Стандарты и практические требования: Trauma ATLS Primary & Secondary Survey",
      instructions: [
        "Apply core domain tenets and industry best practices for Trauma ATLS Primary & Secondary Survey.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Trauma ATLS Primary & Secondary Survey.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","trauma","atls","primary"],
    }),
  },

  "medical-hypertension-acc-aha-treatment-algorithm": {
    id: "medical-hypertension-acc-aha-treatment-algorithm",
    name: "HypertensionACCAHATreatmentAlgorithmSkill",
    displayName: "Hypertension ACC/AHA Treatment Algorithm",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Hypertension ACC/AHA Treatment Algorithm.",
    tags: ["medical","hypertension","acc","aha"],
    transform: createStandardSkillTransform({
      sectionName: "Hypertension Treatment Algorithm",
      ruSectionName: "Стандарты и практические требования: Hypertension ACC/AHA Treatment Algorithm",
      instructions: [
        "Apply core domain tenets and industry best practices for Hypertension ACC/AHA Treatment Algorithm.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Hypertension ACC/AHA Treatment Algorithm.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","hypertension","acc","aha"],
    }),
  },

  "medical-type-2-diabetes-ada-glycemic-control-sglt2-glp1": {
    id: "medical-type-2-diabetes-ada-glycemic-control-sglt2-glp1",
    name: "Type2DiabetesADAGlycemicControlSGLT2GLP1Skill",
    displayName: "Type 2 Diabetes ADA Glycemic Control & SGLT2/GLP1",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Type 2 Diabetes ADA Glycemic Control & SGLT2/GLP1.",
    tags: ["medical","type","2","diabetes"],
    transform: createStandardSkillTransform({
      sectionName: "ADA Diabetes Care Protocols",
      ruSectionName: "Стандарты и практические требования: Type 2 Diabetes ADA Glycemic Control & SGLT2/GLP1",
      instructions: [
        "Apply core domain tenets and industry best practices for Type 2 Diabetes ADA Glycemic Control & SGLT2/GLP1.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Type 2 Diabetes ADA Glycemic Control & SGLT2/GLP1.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","type","2","diabetes"],
    }),
  },

  "medical-mental-health-dsm-5-diagnostic-criteria-workup": {
    id: "medical-mental-health-dsm-5-diagnostic-criteria-workup",
    name: "MentalHealthDSM5DiagnosticCriteriaWorkupSkill",
    displayName: "Mental Health DSM-5 Diagnostic Criteria Workup",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Mental Health DSM-5 Diagnostic Criteria Workup.",
    tags: ["medical","mental","health","dsm"],
    transform: createStandardSkillTransform({
      sectionName: "DSM-5 Diagnostic Standards",
      ruSectionName: "Стандарты и практические требования: Mental Health DSM-5 Diagnostic Criteria Workup",
      instructions: [
        "Apply core domain tenets and industry best practices for Mental Health DSM-5 Diagnostic Criteria Workup.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Mental Health DSM-5 Diagnostic Criteria Workup.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","mental","health","dsm"],
    }),
  },

  "medical-radiology-chest-x-ray-abcde-systematic-reading": {
    id: "medical-radiology-chest-x-ray-abcde-systematic-reading",
    name: "RadiologyChestXRayABCDESystematicReadingSkill",
    displayName: "Radiology Chest X-Ray ABCDE Systematic Reading",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Radiology Chest X-Ray ABCDE Systematic Reading.",
    tags: ["medical","radiology","chest","x"],
    transform: createStandardSkillTransform({
      sectionName: "Chest X-Ray ABCDE Standards",
      ruSectionName: "Стандарты и практические требования: Radiology Chest X-Ray ABCDE Systematic Reading",
      instructions: [
        "Apply core domain tenets and industry best practices for Radiology Chest X-Ray ABCDE Systematic Reading.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Radiology Chest X-Ray ABCDE Systematic Reading.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","radiology","chest","x"],
    }),
  },

  "medical-preoperative-cardiac-risk-assessment-rcri-score": {
    id: "medical-preoperative-cardiac-risk-assessment-rcri-score",
    name: "PreoperativeCardiacRiskAssessmentRCRIScoreSkill",
    displayName: "Preoperative Cardiac Risk Assessment (RCRI Score)",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Preoperative Cardiac Risk Assessment (RCRI Score).",
    tags: ["medical","preoperative","cardiac","risk"],
    transform: createStandardSkillTransform({
      sectionName: "Preoperative Risk Protocol",
      ruSectionName: "Стандарты и практические требования: Preoperative Cardiac Risk Assessment (RCRI Score)",
      instructions: [
        "Apply core domain tenets and industry best practices for Preoperative Cardiac Risk Assessment (RCRI Score).",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Preoperative Cardiac Risk Assessment (RCRI Score).",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","preoperative","cardiac","risk"],
    }),
  },

  "medical-stroke-nihss-rapid-assessment-tpa-eligibility": {
    id: "medical-stroke-nihss-rapid-assessment-tpa-eligibility",
    name: "StrokeNIHSSRapidAssessmenttPAEligibilitySkill",
    displayName: "Stroke NIHSS Rapid Assessment & tPA Eligibility",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Stroke NIHSS Rapid Assessment & tPA Eligibility.",
    tags: ["medical","stroke","nihss","rapid"],
    transform: createStandardSkillTransform({
      sectionName: "NIHSS Stroke Assessment Protocol",
      ruSectionName: "Стандарты и практические требования: Stroke NIHSS Rapid Assessment & tPA Eligibility",
      instructions: [
        "Apply core domain tenets and industry best practices for Stroke NIHSS Rapid Assessment & tPA Eligibility.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Stroke NIHSS Rapid Assessment & tPA Eligibility.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","stroke","nihss","rapid"],
    }),
  },

  "medical-obstetric-emergency-postpartum-hemorrhage-protocol": {
    id: "medical-obstetric-emergency-postpartum-hemorrhage-protocol",
    name: "ObstetricEmergencyPostpartumHemorrhageProtocolSkill",
    displayName: "Obstetric Emergency Postpartum Hemorrhage Protocol",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Obstetric Emergency Postpartum Hemorrhage Protocol.",
    tags: ["medical","obstetric","emergency","postpartum"],
    transform: createStandardSkillTransform({
      sectionName: "Postpartum Hemorrhage Blueprint",
      ruSectionName: "Стандарты и практические требования: Obstetric Emergency Postpartum Hemorrhage Protocol",
      instructions: [
        "Apply core domain tenets and industry best practices for Obstetric Emergency Postpartum Hemorrhage Protocol.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Obstetric Emergency Postpartum Hemorrhage Protocol.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","obstetric","emergency","postpartum"],
    }),
  },

  "medical-infectious-disease-isolation-ppe-biohazard-protocols": {
    id: "medical-infectious-disease-isolation-ppe-biohazard-protocols",
    name: "InfectiousDiseaseIsolationPPEBiohazardProtocolsSkill",
    displayName: "Infectious Disease Isolation & PPE Biohazard Protocols",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Infectious Disease Isolation & PPE Biohazard Protocols.",
    tags: ["medical","infectious","disease","isolation"],
    transform: createStandardSkillTransform({
      sectionName: "Infection Control PPE Protocol",
      ruSectionName: "Стандарты и практические требования: Infectious Disease Isolation & PPE Biohazard Protocols",
      instructions: [
        "Apply core domain tenets and industry best practices for Infectious Disease Isolation & PPE Biohazard Protocols.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Infectious Disease Isolation & PPE Biohazard Protocols.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","infectious","disease","isolation"],
    }),
  },

  "medical-chronic-kidney-disease-kdigo-staging-renoprotection": {
    id: "medical-chronic-kidney-disease-kdigo-staging-renoprotection",
    name: "ChronicKidneyDiseaseKDIGOStagingRenoprotectionSkill",
    displayName: "Chronic Kidney Disease KDIGO Staging & Renoprotection",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Chronic Kidney Disease KDIGO Staging & Renoprotection.",
    tags: ["medical","chronic","kidney","disease"],
    transform: createStandardSkillTransform({
      sectionName: "KDIGO Renal Management Standards",
      ruSectionName: "Стандарты и практические требования: Chronic Kidney Disease KDIGO Staging & Renoprotection",
      instructions: [
        "Apply core domain tenets and industry best practices for Chronic Kidney Disease KDIGO Staging & Renoprotection.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Chronic Kidney Disease KDIGO Staging & Renoprotection.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","chronic","kidney","disease"],
    }),
  },

  "medical-asthma-gina-stepwise-management-inhaler-technique": {
    id: "medical-asthma-gina-stepwise-management-inhaler-technique",
    name: "AsthmaGINAStepwiseManagementInhalerTechniqueSkill",
    displayName: "Asthma GINA Stepwise Management & Inhaler Technique",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Asthma GINA Stepwise Management & Inhaler Technique.",
    tags: ["medical","asthma","gina","stepwise"],
    transform: createStandardSkillTransform({
      sectionName: "GINA Asthma Care Protocol",
      ruSectionName: "Стандарты и практические требования: Asthma GINA Stepwise Management & Inhaler Technique",
      instructions: [
        "Apply core domain tenets and industry best practices for Asthma GINA Stepwise Management & Inhaler Technique.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Asthma GINA Stepwise Management & Inhaler Technique.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","asthma","gina","stepwise"],
    }),
  },

  "medical-emergency-airway-intubation-rapid-sequence-induction-rsi": {
    id: "medical-emergency-airway-intubation-rapid-sequence-induction-rsi",
    name: "EmergencyAirwayIntubationRapidSequenceInductionRSISkill",
    displayName: "Emergency Airway Intubation Rapid Sequence Induction (RSI)",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Emergency Airway Intubation Rapid Sequence Induction (RSI).",
    tags: ["medical","emergency","airway","intubation"],
    transform: createStandardSkillTransform({
      sectionName: "Emergency RSI Airway Standards",
      ruSectionName: "Стандарты и практические требования: Emergency Airway Intubation Rapid Sequence Induction (RSI)",
      instructions: [
        "Apply core domain tenets and industry best practices for Emergency Airway Intubation Rapid Sequence Induction (RSI).",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Emergency Airway Intubation Rapid Sequence Induction (RSI).",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","emergency","airway","intubation"],
    }),
  },

  "medical-dermatology-abcde-melanoma-lesion-assessment": {
    id: "medical-dermatology-abcde-melanoma-lesion-assessment",
    name: "DermatologyABCDEMelanomaLesionAssessmentSkill",
    displayName: "Dermatology ABCDE Melanoma Lesion Assessment",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Dermatology ABCDE Melanoma Lesion Assessment.",
    tags: ["medical","dermatology","abcde","melanoma"],
    transform: createStandardSkillTransform({
      sectionName: "Melanoma ABCDE Assessment Protocol",
      ruSectionName: "Стандарты и практические требования: Dermatology ABCDE Melanoma Lesion Assessment",
      instructions: [
        "Apply core domain tenets and industry best practices for Dermatology ABCDE Melanoma Lesion Assessment.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Dermatology ABCDE Melanoma Lesion Assessment.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","dermatology","abcde","melanoma"],
    }),
  },

  "medical-post-op-surgical-wound-infection-surveillance": {
    id: "medical-post-op-surgical-wound-infection-surveillance",
    name: "PostOpSurgicalWoundInfectionSurveillanceSkill",
    displayName: "Post-Op Surgical Wound Infection Surveillance",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Post-Op Surgical Wound Infection Surveillance.",
    tags: ["medical","post","op","surgical"],
    transform: createStandardSkillTransform({
      sectionName: "Surgical Infection Surveillance",
      ruSectionName: "Стандарты и практические требования: Post-Op Surgical Wound Infection Surveillance",
      instructions: [
        "Apply core domain tenets and industry best practices for Post-Op Surgical Wound Infection Surveillance.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Post-Op Surgical Wound Infection Surveillance.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","post","op","surgical"],
    }),
  },

  "medical-cardiopulmonary-resuscitation-acls-megacode-algorithms": {
    id: "medical-cardiopulmonary-resuscitation-acls-megacode-algorithms",
    name: "CardiopulmonaryResuscitationACLSMegacodeAlgorithmsSkill",
    displayName: "Cardiopulmonary Resuscitation (ACLS) Megacode Algorithms",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Cardiopulmonary Resuscitation (ACLS) Megacode Algorithms.",
    tags: ["medical","cardiopulmonary","resuscitation","acls"],
    transform: createStandardSkillTransform({
      sectionName: "ACLS Megacode Protocol",
      ruSectionName: "Стандарты и практические требования: Cardiopulmonary Resuscitation (ACLS) Megacode Algorithms",
      instructions: [
        "Apply core domain tenets and industry best practices for Cardiopulmonary Resuscitation (ACLS) Megacode Algorithms.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Cardiopulmonary Resuscitation (ACLS) Megacode Algorithms.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","cardiopulmonary","resuscitation","acls"],
    }),
  },

  "medical-medical-ethics-four-principles-autonomy-beneficence-justice-non-maleficence": {
    id: "medical-medical-ethics-four-principles-autonomy-beneficence-justice-non-maleficence",
    name: "MedicalEthicsFourPrinciplesAutonomyBeneficenceJusticeNonMaleficenceSkill",
    displayName: "Medical Ethics Four Principles (Autonomy Beneficence Justice Non-Maleficence)",
    categoryId: "medical",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Medical Ethics Four Principles (Autonomy Beneficence Justice Non-Maleficence).",
    tags: ["medical","medical","ethics","four"],
    transform: createStandardSkillTransform({
      sectionName: "Medical Ethics Principles Standards",
      ruSectionName: "Стандарты и практические требования: Medical Ethics Four Principles (Autonomy Beneficence Justice Non-Maleficence)",
      instructions: [
        "Apply core domain tenets and industry best practices for Medical Ethics Four Principles (Autonomy Beneficence Justice Non-Maleficence).",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Medical Ethics Four Principles (Autonomy Beneficence Justice Non-Maleficence).",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["medical","medical","ethics","four"],
    }),
  },
  "medical-soap-note-clinical-documentation-standard": {
    id: "medical-soap-note-clinical-documentation-standard",
    name: "SOAPNoteClinicalDocumentationStandardSkill",
    displayName: "SOAP Note Clinical Documentation Standard",
    categoryId: "medical",
    description: "Structures medical encounters: Subjective, Objective, Assessment, and Plan.",
    tags: ["medical","medical","soap","note"],
    transform: createStandardSkillTransform({
      sectionName: "SOAP Note Clinical Documentation Standard Standards",
      ruSectionName: "Стандарты и регламенты: SOAP Note Clinical Documentation Standard",
      instructions: [
        "Apply core domain tenets for SOAP Note Clinical Documentation Standard.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SOAP Note Clinical Documentation Standard.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","soap","note"],
    }),
  },

  "medical-grade-evidence-based-quality-assessment": {
    id: "medical-grade-evidence-based-quality-assessment",
    name: "GRADEEvidenceBasedQualityAssessmentSkill",
    displayName: "GRADE Evidence-Based Quality Assessment",
    categoryId: "medical",
    description: "Scores clinical research evidence quality from High to Very Low.",
    tags: ["medical","medical","grade","evidence"],
    transform: createStandardSkillTransform({
      sectionName: "GRADE Evidence-Based Quality Assessment Standards",
      ruSectionName: "Стандарты и регламенты: GRADE Evidence-Based Quality Assessment",
      instructions: [
        "Apply core domain tenets for GRADE Evidence-Based Quality Assessment.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для GRADE Evidence-Based Quality Assessment.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","grade","evidence"],
    }),
  },

  "medical-qsofa-sepsis-early-warning-screening": {
    id: "medical-qsofa-sepsis-early-warning-screening",
    name: "qSOFASepsisEarlyWarningScreeningSkill",
    displayName: "qSOFA & Sepsis Early Warning Screening",
    categoryId: "medical",
    description: "Screens patients for sepsis using altered mental status, respiratory rate, and blood pressure.",
    tags: ["medical","medical","qsofa","sepsis"],
    transform: createStandardSkillTransform({
      sectionName: "qSOFA & Sepsis Early Warning Screening Standards",
      ruSectionName: "Стандарты и регламенты: qSOFA & Sepsis Early Warning Screening",
      instructions: [
        "Apply core domain tenets for qSOFA & Sepsis Early Warning Screening.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для qSOFA & Sepsis Early Warning Screening.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","qsofa","sepsis"],
    }),
  },

  "medical-12-lead-electrocardiogram-ecg-interpretation": {
    id: "medical-12-lead-electrocardiogram-ecg-interpretation",
    name: "12LeadElectrocardiogramECGInterpretationSkill",
    displayName: "12-Lead Electrocardiogram (ECG) Interpretation",
    categoryId: "medical",
    description: "Systematically reads ECGs: rate, rhythm, axis, intervals, ST elevation, ischemia.",
    tags: ["medical","medical","12","lead"],
    transform: createStandardSkillTransform({
      sectionName: "12-Lead Electrocardiogram (ECG) Interpretation Standards",
      ruSectionName: "Стандарты и регламенты: 12-Lead Electrocardiogram (ECG) Interpretation",
      instructions: [
        "Apply core domain tenets for 12-Lead Electrocardiogram (ECG) Interpretation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для 12-Lead Electrocardiogram (ECG) Interpretation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","12","lead"],
    }),
  },

  "medical-tnm-cancer-staging-multidisciplinary-tumor-board": {
    id: "medical-tnm-cancer-staging-multidisciplinary-tumor-board",
    name: "TNMCancerStagingMultidisciplinaryTumorBoardSkill",
    displayName: "TNM Cancer Staging & Multidisciplinary Tumor Board",
    categoryId: "medical",
    description: "Stages solid tumors by Tumor size, Nodal spread, and Metastasis.",
    tags: ["medical","medical","tnm","cancer"],
    transform: createStandardSkillTransform({
      sectionName: "TNM Cancer Staging & Multidisciplinary Tumor Board Standards",
      ruSectionName: "Стандарты и регламенты: TNM Cancer Staging & Multidisciplinary Tumor Board",
      instructions: [
        "Apply core domain tenets for TNM Cancer Staging & Multidisciplinary Tumor Board.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для TNM Cancer Staging & Multidisciplinary Tumor Board.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","tnm","cancer"],
    }),
  },

  "medical-pediatric-resuscitation-broselow-tape-dosing": {
    id: "medical-pediatric-resuscitation-broselow-tape-dosing",
    name: "PediatricResuscitationBroselowTapeDosingSkill",
    displayName: "Pediatric Resuscitation Broselow Tape Dosing",
    categoryId: "medical",
    description: "Calculates emergency pediatric drug doses and equipment sizes by length.",
    tags: ["medical","medical","pediatric","resuscitation"],
    transform: createStandardSkillTransform({
      sectionName: "Pediatric Resuscitation Broselow Tape Dosing Standards",
      ruSectionName: "Стандарты и регламенты: Pediatric Resuscitation Broselow Tape Dosing",
      instructions: [
        "Apply core domain tenets for Pediatric Resuscitation Broselow Tape Dosing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Pediatric Resuscitation Broselow Tape Dosing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","pediatric","resuscitation"],
    }),
  },

  "medical-atls-trauma-primary-secondary-survey": {
    id: "medical-atls-trauma-primary-secondary-survey",
    name: "ATLSTraumaPrimarySecondarySurveySkill",
    displayName: "ATLS Trauma Primary & Secondary Survey",
    categoryId: "medical",
    description: "Executes Advanced Trauma Life Support survey: Airway, Breathing, Circulation, Disability.",
    tags: ["medical","medical","atls","trauma"],
    transform: createStandardSkillTransform({
      sectionName: "ATLS Trauma Primary & Secondary Survey Standards",
      ruSectionName: "Стандарты и регламенты: ATLS Trauma Primary & Secondary Survey",
      instructions: [
        "Apply core domain tenets for ATLS Trauma Primary & Secondary Survey.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для ATLS Trauma Primary & Secondary Survey.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","atls","trauma"],
    }),
  },

  "medical-acc-aha-hypertension-treatment-algorithm": {
    id: "medical-acc-aha-hypertension-treatment-algorithm",
    name: "ACCAHAHypertensionTreatmentAlgorithmSkill",
    displayName: "ACC/AHA Hypertension Treatment Algorithm",
    categoryId: "medical",
    description: "Manages blood pressure using stepwise lifestyle, ACEi/ARB, CCB, and thiazides.",
    tags: ["medical","medical","acc","aha"],
    transform: createStandardSkillTransform({
      sectionName: "ACC/AHA Hypertension Treatment Algorithm Standards",
      ruSectionName: "Стандарты и регламенты: ACC/AHA Hypertension Treatment Algorithm",
      instructions: [
        "Apply core domain tenets for ACC/AHA Hypertension Treatment Algorithm.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для ACC/AHA Hypertension Treatment Algorithm.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","acc","aha"],
    }),
  },

  "medical-ada-type-2-diabetes-glycemic-management": {
    id: "medical-ada-type-2-diabetes-glycemic-management",
    name: "ADAType2DiabetesGlycemicManagementSkill",
    displayName: "ADA Type 2 Diabetes Glycemic Management",
    categoryId: "medical",
    description: "Manages HbA1c targets using metformin, SGLT2i, GLP-1 RA, and insulin.",
    tags: ["medical","medical","ada","type"],
    transform: createStandardSkillTransform({
      sectionName: "ADA Type 2 Diabetes Glycemic Management Standards",
      ruSectionName: "Стандарты и регламенты: ADA Type 2 Diabetes Glycemic Management",
      instructions: [
        "Apply core domain tenets for ADA Type 2 Diabetes Glycemic Management.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для ADA Type 2 Diabetes Glycemic Management.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","ada","type"],
    }),
  },

  "medical-dsm-5-diagnostic-criteria-mental-health-workup": {
    id: "medical-dsm-5-diagnostic-criteria-mental-health-workup",
    name: "DSM5DiagnosticCriteriaMentalHealthWorkupSkill",
    displayName: "DSM-5 Diagnostic Criteria Mental Health Workup",
    categoryId: "medical",
    description: "Evaluates psychiatric symptoms against DSM-5 criteria for Major Depression, Bipolar, Anxiety.",
    tags: ["medical","medical","dsm","5"],
    transform: createStandardSkillTransform({
      sectionName: "DSM-5 Diagnostic Criteria Mental Health Workup Standards",
      ruSectionName: "Стандарты и регламенты: DSM-5 Diagnostic Criteria Mental Health Workup",
      instructions: [
        "Apply core domain tenets for DSM-5 Diagnostic Criteria Mental Health Workup.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для DSM-5 Diagnostic Criteria Mental Health Workup.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","dsm","5"],
    }),
  },

  "medical-chest-x-ray-abcde-systematic-interpretation": {
    id: "medical-chest-x-ray-abcde-systematic-interpretation",
    name: "ChestXRayABCDESystematicInterpretationSkill",
    displayName: "Chest X-Ray ABCDE Systematic Interpretation",
    categoryId: "medical",
    description: "Reads CXRs systematically: Airway, Breathing, Cardiac, Diaphragm, Everything else.",
    tags: ["medical","medical","chest","x"],
    transform: createStandardSkillTransform({
      sectionName: "Chest X-Ray ABCDE Systematic Interpretation Standards",
      ruSectionName: "Стандарты и регламенты: Chest X-Ray ABCDE Systematic Interpretation",
      instructions: [
        "Apply core domain tenets for Chest X-Ray ABCDE Systematic Interpretation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Chest X-Ray ABCDE Systematic Interpretation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","chest","x"],
    }),
  },

  "medical-revised-cardiac-risk-index-rcri-preop-assessment": {
    id: "medical-revised-cardiac-risk-index-rcri-preop-assessment",
    name: "RevisedCardiacRiskIndexRCRIPreopAssessmentSkill",
    displayName: "Revised Cardiac Risk Index (RCRI) Preop Assessment",
    categoryId: "medical",
    description: "Evaluates perioperative cardiac risk before major non-cardiac surgery.",
    tags: ["medical","medical","revised","cardiac"],
    transform: createStandardSkillTransform({
      sectionName: "Revised Cardiac Risk Index (RCRI) Preop Assessment Standards",
      ruSectionName: "Стандарты и регламенты: Revised Cardiac Risk Index (RCRI) Preop Assessment",
      instructions: [
        "Apply core domain tenets for Revised Cardiac Risk Index (RCRI) Preop Assessment.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Revised Cardiac Risk Index (RCRI) Preop Assessment.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","revised","cardiac"],
    }),
  },

  "medical-nihss-rapid-stroke-assessment-tpa-eligibility": {
    id: "medical-nihss-rapid-stroke-assessment-tpa-eligibility",
    name: "NIHSSRapidStrokeAssessmenttPAEligibilitySkill",
    displayName: "NIHSS Rapid Stroke Assessment & tPA Eligibility",
    categoryId: "medical",
    description: "Evaluates acute ischemic stroke severity and contraindications for thrombolytics.",
    tags: ["medical","medical","nihss","rapid"],
    transform: createStandardSkillTransform({
      sectionName: "NIHSS Rapid Stroke Assessment & tPA Eligibility Standards",
      ruSectionName: "Стандарты и регламенты: NIHSS Rapid Stroke Assessment & tPA Eligibility",
      instructions: [
        "Apply core domain tenets for NIHSS Rapid Stroke Assessment & tPA Eligibility.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для NIHSS Rapid Stroke Assessment & tPA Eligibility.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","nihss","rapid"],
    }),
  },

  "medical-obstetric-postpartum-hemorrhage-emergency-protocol": {
    id: "medical-obstetric-postpartum-hemorrhage-emergency-protocol",
    name: "ObstetricPostpartumHemorrhageEmergencyProtocolSkill",
    displayName: "Obstetric Postpartum Hemorrhage Emergency Protocol",
    categoryId: "medical",
    description: "Manages 4 Ts of PPH (Tone, Trauma, Tissue, Thrombin) with uterotonics.",
    tags: ["medical","medical","obstetric","postpartum"],
    transform: createStandardSkillTransform({
      sectionName: "Obstetric Postpartum Hemorrhage Emergency Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Obstetric Postpartum Hemorrhage Emergency Protocol",
      instructions: [
        "Apply core domain tenets for Obstetric Postpartum Hemorrhage Emergency Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Obstetric Postpartum Hemorrhage Emergency Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","obstetric","postpartum"],
    }),
  },

  "medical-hospital-infection-control-ppe-biohazard-isolation": {
    id: "medical-hospital-infection-control-ppe-biohazard-isolation",
    name: "HospitalInfectionControlPPEBiohazardIsolationSkill",
    displayName: "Hospital Infection Control & PPE Biohazard Isolation",
    categoryId: "medical",
    description: "Enforces Contact, Droplet, and Airborne isolation precautions.",
    tags: ["medical","medical","hospital","infection"],
    transform: createStandardSkillTransform({
      sectionName: "Hospital Infection Control & PPE Biohazard Isolation Standards",
      ruSectionName: "Стандарты и регламенты: Hospital Infection Control & PPE Biohazard Isolation",
      instructions: [
        "Apply core domain tenets for Hospital Infection Control & PPE Biohazard Isolation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hospital Infection Control & PPE Biohazard Isolation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","hospital","infection"],
    }),
  },

  "medical-kdigo-chronic-kidney-disease-staging": {
    id: "medical-kdigo-chronic-kidney-disease-staging",
    name: "KDIGOChronicKidneyDiseaseStagingSkill",
    displayName: "KDIGO Chronic Kidney Disease Staging",
    categoryId: "medical",
    description: "Stages CKD by GFR and albuminuria categories, managing renoprotection.",
    tags: ["medical","medical","kdigo","chronic"],
    transform: createStandardSkillTransform({
      sectionName: "KDIGO Chronic Kidney Disease Staging Standards",
      ruSectionName: "Стандарты и регламенты: KDIGO Chronic Kidney Disease Staging",
      instructions: [
        "Apply core domain tenets for KDIGO Chronic Kidney Disease Staging.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для KDIGO Chronic Kidney Disease Staging.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","kdigo","chronic"],
    }),
  },

  "medical-gina-asthma-stepwise-escalation-management": {
    id: "medical-gina-asthma-stepwise-escalation-management",
    name: "GINAAsthmaStepwiseEscalationManagementSkill",
    displayName: "GINA Asthma Stepwise Escalation Management",
    categoryId: "medical",
    description: "Adjusts inhaler therapy based on symptom control and exacerbation history.",
    tags: ["medical","medical","gina","asthma"],
    transform: createStandardSkillTransform({
      sectionName: "GINA Asthma Stepwise Escalation Management Standards",
      ruSectionName: "Стандарты и регламенты: GINA Asthma Stepwise Escalation Management",
      instructions: [
        "Apply core domain tenets for GINA Asthma Stepwise Escalation Management.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для GINA Asthma Stepwise Escalation Management.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","gina","asthma"],
    }),
  },

  "medical-rapid-sequence-induction-rsi-emergency-airway": {
    id: "medical-rapid-sequence-induction-rsi-emergency-airway",
    name: "RapidSequenceInductionRSIEmergencyAirwaySkill",
    displayName: "Rapid Sequence Induction (RSI) Emergency Airway",
    categoryId: "medical",
    description: "Executes emergency endotracheal intubation with induction agents and paralytics.",
    tags: ["medical","medical","rapid","sequence"],
    transform: createStandardSkillTransform({
      sectionName: "Rapid Sequence Induction (RSI) Emergency Airway Standards",
      ruSectionName: "Стандарты и регламенты: Rapid Sequence Induction (RSI) Emergency Airway",
      instructions: [
        "Apply core domain tenets for Rapid Sequence Induction (RSI) Emergency Airway.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Rapid Sequence Induction (RSI) Emergency Airway.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","rapid","sequence"],
    }),
  },

  "medical-dermatology-abcde-melanoma-lesion-screening": {
    id: "medical-dermatology-abcde-melanoma-lesion-screening",
    name: "DermatologyABCDEMelanomaLesionScreeningSkill",
    displayName: "Dermatology ABCDE Melanoma Lesion Screening",
    categoryId: "medical",
    description: "Evaluates skin lesions for Asymmetry, Border, Color, Diameter, and Evolving.",
    tags: ["medical","medical","dermatology","abcde"],
    transform: createStandardSkillTransform({
      sectionName: "Dermatology ABCDE Melanoma Lesion Screening Standards",
      ruSectionName: "Стандарты и регламенты: Dermatology ABCDE Melanoma Lesion Screening",
      instructions: [
        "Apply core domain tenets for Dermatology ABCDE Melanoma Lesion Screening.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Dermatology ABCDE Melanoma Lesion Screening.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","dermatology","abcde"],
    }),
  },

  "medical-surgical-site-infection-ssi-prevention-surveillance": {
    id: "medical-surgical-site-infection-ssi-prevention-surveillance",
    name: "SurgicalSiteInfectionSSIPreventionSurveillanceSkill",
    displayName: "Surgical Site Infection (SSI) Prevention Surveillance",
    categoryId: "medical",
    description: "Implements pre-op chlorhexidine, prophylactic antibiotics, and sterile technique.",
    tags: ["medical","medical","surgical","site"],
    transform: createStandardSkillTransform({
      sectionName: "Surgical Site Infection (SSI) Prevention Surveillance Standards",
      ruSectionName: "Стандарты и регламенты: Surgical Site Infection (SSI) Prevention Surveillance",
      instructions: [
        "Apply core domain tenets for Surgical Site Infection (SSI) Prevention Surveillance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Surgical Site Infection (SSI) Prevention Surveillance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","surgical","site"],
    }),
  },

  "medical-acls-cardiac-arrest-megacode-algorithm": {
    id: "medical-acls-cardiac-arrest-megacode-algorithm",
    name: "ACLSCardiacArrestMegacodeAlgorithmSkill",
    displayName: "ACLS Cardiac Arrest Megacode Algorithm",
    categoryId: "medical",
    description: "Directs CPR, defibrillation for VF/pVT, epinephrine, and amiodarone.",
    tags: ["medical","medical","acls","cardiac"],
    transform: createStandardSkillTransform({
      sectionName: "ACLS Cardiac Arrest Megacode Algorithm Standards",
      ruSectionName: "Стандарты и регламенты: ACLS Cardiac Arrest Megacode Algorithm",
      instructions: [
        "Apply core domain tenets for ACLS Cardiac Arrest Megacode Algorithm.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для ACLS Cardiac Arrest Megacode Algorithm.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","acls","cardiac"],
    }),
  },

  "medical-medical-ethics-four-principles-framework": {
    id: "medical-medical-ethics-four-principles-framework",
    name: "MedicalEthicsFourPrinciplesFrameworkSkill",
    displayName: "Medical Ethics Four Principles Framework",
    categoryId: "medical",
    description: "Balances Autonomy, Beneficence, Non-Maleficence, and Justice in clinical cases.",
    tags: ["medical","medical","medical","ethics"],
    transform: createStandardSkillTransform({
      sectionName: "Medical Ethics Four Principles Framework Standards",
      ruSectionName: "Стандарты и регламенты: Medical Ethics Four Principles Framework",
      instructions: [
        "Apply core domain tenets for Medical Ethics Four Principles Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Medical Ethics Four Principles Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","medical","ethics"],
    }),
  },

  "medical-sbar-clinical-handoff-communication-standard": {
    id: "medical-sbar-clinical-handoff-communication-standard",
    name: "SBARClinicalHandoffCommunicationStandardSkill",
    displayName: "SBAR Clinical Handoff Communication Standard",
    categoryId: "medical",
    description: "Communicates patient handoffs: Situation, Background, Assessment, Recommendation.",
    tags: ["medical","medical","sbar","clinical"],
    transform: createStandardSkillTransform({
      sectionName: "SBAR Clinical Handoff Communication Standard Standards",
      ruSectionName: "Стандарты и регламенты: SBAR Clinical Handoff Communication Standard",
      instructions: [
        "Apply core domain tenets for SBAR Clinical Handoff Communication Standard.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SBAR Clinical Handoff Communication Standard.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","sbar","clinical"],
    }),
  },

  "medical-differential-diagnosis-bayesian-probability-synthesis": {
    id: "medical-differential-diagnosis-bayesian-probability-synthesis",
    name: "DifferentialDiagnosisBayesianProbabilitySynthesisSkill",
    displayName: "Differential Diagnosis Bayesian Probability Synthesis",
    categoryId: "medical",
    description: "Refines pre-test to post-test disease probabilities using likelihood ratios.",
    tags: ["medical","medical","differential","diagnosis"],
    transform: createStandardSkillTransform({
      sectionName: "Differential Diagnosis Bayesian Probability Synthesis Standards",
      ruSectionName: "Стандарты и регламенты: Differential Diagnosis Bayesian Probability Synthesis",
      instructions: [
        "Apply core domain tenets for Differential Diagnosis Bayesian Probability Synthesis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Differential Diagnosis Bayesian Probability Synthesis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","differential","diagnosis"],
    }),
  },

  "medical-opioid-risk-tool-safe-chronic-pain-management": {
    id: "medical-opioid-risk-tool-safe-chronic-pain-management",
    name: "OpioidRiskToolSafeChronicPainManagementSkill",
    displayName: "Opioid Risk Tool & Safe Chronic Pain Management",
    categoryId: "medical",
    description: "Screens patients for addiction risk and monitors multimodal non-opioid pain plans.",
    tags: ["medical","medical","opioid","risk"],
    transform: createStandardSkillTransform({
      sectionName: "Opioid Risk Tool & Safe Chronic Pain Management Standards",
      ruSectionName: "Стандарты и регламенты: Opioid Risk Tool & Safe Chronic Pain Management",
      instructions: [
        "Apply core domain tenets for Opioid Risk Tool & Safe Chronic Pain Management.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Opioid Risk Tool & Safe Chronic Pain Management.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","opioid","risk"],
    }),
  },

  "medical-anaphylaxis-emergency-treatment-epinephrine-dosing": {
    id: "medical-anaphylaxis-emergency-treatment-epinephrine-dosing",
    name: "AnaphylaxisEmergencyTreatmentEpinephrineDosingSkill",
    displayName: "Anaphylaxis Emergency Treatment & Epinephrine Dosing",
    categoryId: "medical",
    description: "Identifies systemic allergic reactions and administers immediate IM epinephrine.",
    tags: ["medical","medical","anaphylaxis","emergency"],
    transform: createStandardSkillTransform({
      sectionName: "Anaphylaxis Emergency Treatment & Epinephrine Dosing Standards",
      ruSectionName: "Стандарты и регламенты: Anaphylaxis Emergency Treatment & Epinephrine Dosing",
      instructions: [
        "Apply core domain tenets for Anaphylaxis Emergency Treatment & Epinephrine Dosing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Anaphylaxis Emergency Treatment & Epinephrine Dosing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","anaphylaxis","emergency"],
    }),
  },

  "medical-dka-hhs-diabetic-emergency-fluid-insulin-protocol": {
    id: "medical-dka-hhs-diabetic-emergency-fluid-insulin-protocol",
    name: "DKAHHSDiabeticEmergencyFluidInsulinProtocolSkill",
    displayName: "DKA / HHS Diabetic Emergency Fluid & Insulin Protocol",
    categoryId: "medical",
    description: "Manages diabetic ketoacidosis with aggressive fluids, IV insulin, and potassium monitoring.",
    tags: ["medical","medical","dka","hhs"],
    transform: createStandardSkillTransform({
      sectionName: "DKA / HHS Diabetic Emergency Fluid & Insulin Protocol Standards",
      ruSectionName: "Стандарты и регламенты: DKA / HHS Diabetic Emergency Fluid & Insulin Protocol",
      instructions: [
        "Apply core domain tenets for DKA / HHS Diabetic Emergency Fluid & Insulin Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для DKA / HHS Diabetic Emergency Fluid & Insulin Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","dka","hhs"],
    }),
  },

  "medical-heart-failure-hfref-quadruple-therapy-escalation": {
    id: "medical-heart-failure-hfref-quadruple-therapy-escalation",
    name: "HeartFailureHFrEFQuadrupleTherapyEscalationSkill",
    displayName: "Heart Failure HFrEF Quadruple Therapy Escalation",
    categoryId: "medical",
    description: "Optimizes ARNI/ACEi, beta-blockers, MRA, and SGLT2i for reduced ejection fraction.",
    tags: ["medical","medical","heart","failure"],
    transform: createStandardSkillTransform({
      sectionName: "Heart Failure HFrEF Quadruple Therapy Escalation Standards",
      ruSectionName: "Стандарты и регламенты: Heart Failure HFrEF Quadruple Therapy Escalation",
      instructions: [
        "Apply core domain tenets for Heart Failure HFrEF Quadruple Therapy Escalation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Heart Failure HFrEF Quadruple Therapy Escalation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","heart","failure"],
    }),
  },

  "medical-venous-thromboembolism-vte-prophylaxis-risk-score": {
    id: "medical-venous-thromboembolism-vte-prophylaxis-risk-score",
    name: "VenousThromboembolismVTEProphylaxisRiskScoreSkill",
    displayName: "Venous Thromboembolism (VTE) Prophylaxis Risk Score",
    categoryId: "medical",
    description: "Evaluates Padua/Caprini scores to prescribe chemical/mechanical DVT prevention.",
    tags: ["medical","medical","venous","thromboembolism"],
    transform: createStandardSkillTransform({
      sectionName: "Venous Thromboembolism (VTE) Prophylaxis Risk Score Standards",
      ruSectionName: "Стандарты и регламенты: Venous Thromboembolism (VTE) Prophylaxis Risk Score",
      instructions: [
        "Apply core domain tenets for Venous Thromboembolism (VTE) Prophylaxis Risk Score.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Venous Thromboembolism (VTE) Prophylaxis Risk Score.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","venous","thromboembolism"],
    }),
  },

  "medical-acute-coronary-syndrome-acs-initial-management": {
    id: "medical-acute-coronary-syndrome-acs-initial-management",
    name: "AcuteCoronarySyndromeACSInitialManagementSkill",
    displayName: "Acute Coronary Syndrome (ACS) Initial Management",
    categoryId: "medical",
    description: "Administers MONA (Morphine, Oxygen, Nitrates, Aspirin) and heparin for chest pain.",
    tags: ["medical","medical","acute","coronary"],
    transform: createStandardSkillTransform({
      sectionName: "Acute Coronary Syndrome (ACS) Initial Management Standards",
      ruSectionName: "Стандарты и регламенты: Acute Coronary Syndrome (ACS) Initial Management",
      instructions: [
        "Apply core domain tenets for Acute Coronary Syndrome (ACS) Initial Management.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Acute Coronary Syndrome (ACS) Initial Management.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","acute","coronary"],
    }),
  },

  "medical-inpatient-delirium-cam-screening-prevention": {
    id: "medical-inpatient-delirium-cam-screening-prevention",
    name: "InpatientDeliriumCAMScreeningPreventionSkill",
    displayName: "Inpatient Delirium CAM Screening & Prevention",
    categoryId: "medical",
    description: "Screens for acute confusion using Confusion Assessment Method and avoids sedatives.",
    tags: ["medical","medical","inpatient","delirium"],
    transform: createStandardSkillTransform({
      sectionName: "Inpatient Delirium CAM Screening & Prevention Standards",
      ruSectionName: "Стандарты и регламенты: Inpatient Delirium CAM Screening & Prevention",
      instructions: [
        "Apply core domain tenets for Inpatient Delirium CAM Screening & Prevention.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Inpatient Delirium CAM Screening & Prevention.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","inpatient","delirium"],
    }),
  },

  "medical-polytrauma-massive-transfusion-protocol-mtp": {
    id: "medical-polytrauma-massive-transfusion-protocol-mtp",
    name: "PolytraumaMassiveTransfusionProtocolMTPSkill",
    displayName: "Polytrauma Massive Transfusion Protocol (MTP)",
    categoryId: "medical",
    description: "Transfuses 1:1:1 ratios of packed RBCs, FFP, and platelets in hemorrhagic shock.",
    tags: ["medical","medical","polytrauma","massive"],
    transform: createStandardSkillTransform({
      sectionName: "Polytrauma Massive Transfusion Protocol (MTP) Standards",
      ruSectionName: "Стандарты и регламенты: Polytrauma Massive Transfusion Protocol (MTP)",
      instructions: [
        "Apply core domain tenets for Polytrauma Massive Transfusion Protocol (MTP).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Polytrauma Massive Transfusion Protocol (MTP).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","polytrauma","massive"],
    }),
  },

  "medical-pediatric-dehydration-oral-vs-iv-rehydration": {
    id: "medical-pediatric-dehydration-oral-vs-iv-rehydration",
    name: "PediatricDehydrationOralvsIVRehydrationSkill",
    displayName: "Pediatric Dehydration Oral vs IV Rehydration",
    categoryId: "medical",
    description: "Calculates fluid deficit and maintenance requirements in pediatric gastroenteritis.",
    tags: ["medical","medical","pediatric","dehydration"],
    transform: createStandardSkillTransform({
      sectionName: "Pediatric Dehydration Oral vs IV Rehydration Standards",
      ruSectionName: "Стандарты и регламенты: Pediatric Dehydration Oral vs IV Rehydration",
      instructions: [
        "Apply core domain tenets for Pediatric Dehydration Oral vs IV Rehydration.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Pediatric Dehydration Oral vs IV Rehydration.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","pediatric","dehydration"],
    }),
  },

  "medical-thyroid-storm-emergency-resuscitation-protocol": {
    id: "medical-thyroid-storm-emergency-resuscitation-protocol",
    name: "ThyroidStormEmergencyResuscitationProtocolSkill",
    displayName: "Thyroid Storm Emergency Resuscitation Protocol",
    categoryId: "medical",
    description: "Manages hyperthyroid crisis with propylthiouracil, iodine, beta-blockers, and steroids.",
    tags: ["medical","medical","thyroid","storm"],
    transform: createStandardSkillTransform({
      sectionName: "Thyroid Storm Emergency Resuscitation Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Thyroid Storm Emergency Resuscitation Protocol",
      instructions: [
        "Apply core domain tenets for Thyroid Storm Emergency Resuscitation Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Thyroid Storm Emergency Resuscitation Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","thyroid","storm"],
    }),
  },

  "medical-spinal-cord-injury-immobilization-neuro-check": {
    id: "medical-spinal-cord-injury-immobilization-neuro-check",
    name: "SpinalCordInjuryImmobilizationNeuroCheckSkill",
    displayName: "Spinal Cord Injury Immobilization & Neuro Check",
    categoryId: "medical",
    description: "Maintains C-spine stabilization and conducts ASIA neurological impairment scoring.",
    tags: ["medical","medical","spinal","cord"],
    transform: createStandardSkillTransform({
      sectionName: "Spinal Cord Injury Immobilization & Neuro Check Standards",
      ruSectionName: "Стандарты и регламенты: Spinal Cord Injury Immobilization & Neuro Check",
      instructions: [
        "Apply core domain tenets for Spinal Cord Injury Immobilization & Neuro Check.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Spinal Cord Injury Immobilization & Neuro Check.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","spinal","cord"],
    }),
  },

  "medical-hepatic-encephalopathy-lactulose-rifaximin-therapy": {
    id: "medical-hepatic-encephalopathy-lactulose-rifaximin-therapy",
    name: "HepaticEncephalopathyLactuloseRifaximinTherapySkill",
    displayName: "Hepatic Encephalopathy Lactulose & Rifaximin Therapy",
    categoryId: "medical",
    description: "Treats liver cirrhosis confusion with lactulose bowel cleanses and targeted antibiotics.",
    tags: ["medical","medical","hepatic","encephalopathy"],
    transform: createStandardSkillTransform({
      sectionName: "Hepatic Encephalopathy Lactulose & Rifaximin Therapy Standards",
      ruSectionName: "Стандарты и регламенты: Hepatic Encephalopathy Lactulose & Rifaximin Therapy",
      instructions: [
        "Apply core domain tenets for Hepatic Encephalopathy Lactulose & Rifaximin Therapy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hepatic Encephalopathy Lactulose & Rifaximin Therapy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","hepatic","encephalopathy"],
    }),
  },

  "medical-copd-acute-exacerbation-oxygen-steroid-protocol": {
    id: "medical-copd-acute-exacerbation-oxygen-steroid-protocol",
    name: "COPDAcuteExacerbationOxygenSteroidProtocolSkill",
    displayName: "COPD Acute Exacerbation Oxygen & Steroid Protocol",
    categoryId: "medical",
    description: "Manages COPD flares with controlled O2 targets (88-92%), bronchodilators, and steroids.",
    tags: ["medical","medical","copd","acute"],
    transform: createStandardSkillTransform({
      sectionName: "COPD Acute Exacerbation Oxygen & Steroid Protocol Standards",
      ruSectionName: "Стандарты и регламенты: COPD Acute Exacerbation Oxygen & Steroid Protocol",
      instructions: [
        "Apply core domain tenets for COPD Acute Exacerbation Oxygen & Steroid Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для COPD Acute Exacerbation Oxygen & Steroid Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","copd","acute"],
    }),
  },

  "medical-acute-pancreatitis-ranson-criteria-fluid-resuscitation": {
    id: "medical-acute-pancreatitis-ranson-criteria-fluid-resuscitation",
    name: "AcutePancreatitisRansonCriteriaFluidResuscitationSkill",
    displayName: "Acute Pancreatitis Ranson Criteria & Fluid Resuscitation",
    categoryId: "medical",
    description: "Predicts pancreatitis severity and administers targeted crystalloid fluids.",
    tags: ["medical","medical","acute","pancreatitis"],
    transform: createStandardSkillTransform({
      sectionName: "Acute Pancreatitis Ranson Criteria & Fluid Resuscitation Standards",
      ruSectionName: "Стандарты и регламенты: Acute Pancreatitis Ranson Criteria & Fluid Resuscitation",
      instructions: [
        "Apply core domain tenets for Acute Pancreatitis Ranson Criteria & Fluid Resuscitation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Acute Pancreatitis Ranson Criteria & Fluid Resuscitation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","acute","pancreatitis"],
    }),
  },

  "medical-hypertensive-emergency-target-organ-damage-escalation": {
    id: "medical-hypertensive-emergency-target-organ-damage-escalation",
    name: "HypertensiveEmergencyTargetOrganDamageEscalationSkill",
    displayName: "Hypertensive Emergency Target Organ Damage Escalation",
    categoryId: "medical",
    description: "Reduces blood pressure by max 25% in hour 1 using IV nicardipine or labetalol.",
    tags: ["medical","medical","hypertensive","emergency"],
    transform: createStandardSkillTransform({
      sectionName: "Hypertensive Emergency Target Organ Damage Escalation Standards",
      ruSectionName: "Стандарты и регламенты: Hypertensive Emergency Target Organ Damage Escalation",
      instructions: [
        "Apply core domain tenets for Hypertensive Emergency Target Organ Damage Escalation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hypertensive Emergency Target Organ Damage Escalation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","hypertensive","emergency"],
    }),
  },

  "medical-pediatric-febrile-seizure-parental-reassurance": {
    id: "medical-pediatric-febrile-seizure-parental-reassurance",
    name: "PediatricFebrileSeizureParentalReassuranceSkill",
    displayName: "Pediatric Febrile Seizure Parental Reassurance",
    categoryId: "medical",
    description: "Evaluates simple vs complex febrile seizures and counsels anxious parents.",
    tags: ["medical","medical","pediatric","febrile"],
    transform: createStandardSkillTransform({
      sectionName: "Pediatric Febrile Seizure Parental Reassurance Standards",
      ruSectionName: "Стандарты и регламенты: Pediatric Febrile Seizure Parental Reassurance",
      instructions: [
        "Apply core domain tenets for Pediatric Febrile Seizure Parental Reassurance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Pediatric Febrile Seizure Parental Reassurance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","pediatric","febrile"],
    }),
  },

  "medical-neutropenic-fever-empiric-antibiotic-escalation": {
    id: "medical-neutropenic-fever-empiric-antibiotic-escalation",
    name: "NeutropenicFeverEmpiricAntibioticEscalationSkill",
    displayName: "Neutropenic Fever Empiric Antibiotic Escalation",
    categoryId: "medical",
    description: "Initiates immediate antipseudomonal beta-lactam monotherapy for oncology fevers.",
    tags: ["medical","medical","neutropenic","fever"],
    transform: createStandardSkillTransform({
      sectionName: "Neutropenic Fever Empiric Antibiotic Escalation Standards",
      ruSectionName: "Стандарты и регламенты: Neutropenic Fever Empiric Antibiotic Escalation",
      instructions: [
        "Apply core domain tenets for Neutropenic Fever Empiric Antibiotic Escalation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Neutropenic Fever Empiric Antibiotic Escalation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","neutropenic","fever"],
    }),
  },

  "medical-psychiatric-suicide-risk-assessment-safe-t-protocol": {
    id: "medical-psychiatric-suicide-risk-assessment-safe-t-protocol",
    name: "PsychiatricSuicideRiskAssessmentSAFETProtocolSkill",
    displayName: "Psychiatric Suicide Risk Assessment (SAFE-T Protocol)",
    categoryId: "medical",
    description: "Evaluates ideation, intent, plan, and protective factors to determine level of care.",
    tags: ["medical","medical","psychiatric","suicide"],
    transform: createStandardSkillTransform({
      sectionName: "Psychiatric Suicide Risk Assessment (SAFE-T Protocol) Standards",
      ruSectionName: "Стандарты и регламенты: Psychiatric Suicide Risk Assessment (SAFE-T Protocol)",
      instructions: [
        "Apply core domain tenets for Psychiatric Suicide Risk Assessment (SAFE-T Protocol).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Psychiatric Suicide Risk Assessment (SAFE-T Protocol).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","psychiatric","suicide"],
    }),
  },

  "medical-geriatric-polypharmacy-beers-criteria-medication-audit": {
    id: "medical-geriatric-polypharmacy-beers-criteria-medication-audit",
    name: "GeriatricPolypharmacyBeersCriteriaMedicationAuditSkill",
    displayName: "Geriatric Polypharmacy & Beers Criteria Medication Audit",
    categoryId: "medical",
    description: "Identifies potentially inappropriate medications in elderly patients to prevent falls.",
    tags: ["medical","medical","geriatric","polypharmacy"],
    transform: createStandardSkillTransform({
      sectionName: "Geriatric Polypharmacy & Beers Criteria Medication Audit Standards",
      ruSectionName: "Стандарты и регламенты: Geriatric Polypharmacy & Beers Criteria Medication Audit",
      instructions: [
        "Apply core domain tenets for Geriatric Polypharmacy & Beers Criteria Medication Audit.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Geriatric Polypharmacy & Beers Criteria Medication Audit.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","geriatric","polypharmacy"],
    }),
  },

  "medical-burn-resuscitation-parkland-formula-fluid-calculation": {
    id: "medical-burn-resuscitation-parkland-formula-fluid-calculation",
    name: "BurnResuscitationParklandFormulaFluidCalculationSkill",
    displayName: "Burn Resuscitation Parkland Formula Fluid Calculation",
    categoryId: "medical",
    description: "Calculates 24-hour Lactated Ringer's fluid requirements based on % Total Body Surface Area.",
    tags: ["medical","medical","burn","resuscitation"],
    transform: createStandardSkillTransform({
      sectionName: "Burn Resuscitation Parkland Formula Fluid Calculation Standards",
      ruSectionName: "Стандарты и регламенты: Burn Resuscitation Parkland Formula Fluid Calculation",
      instructions: [
        "Apply core domain tenets for Burn Resuscitation Parkland Formula Fluid Calculation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Burn Resuscitation Parkland Formula Fluid Calculation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","burn","resuscitation"],
    }),
  },

  "medical-acute-glaucoma-intraocular-pressure-reduction-protocol": {
    id: "medical-acute-glaucoma-intraocular-pressure-reduction-protocol",
    name: "AcuteGlaucomaIntraocularPressureReductionProtocolSkill",
    displayName: "Acute Glaucoma Intraocular Pressure Reduction Protocol",
    categoryId: "medical",
    description: "Administers topical beta-blockers, alpha-agonists, and IV acetazolamide for eye pain.",
    tags: ["medical","medical","acute","glaucoma"],
    transform: createStandardSkillTransform({
      sectionName: "Acute Glaucoma Intraocular Pressure Reduction Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Acute Glaucoma Intraocular Pressure Reduction Protocol",
      instructions: [
        "Apply core domain tenets for Acute Glaucoma Intraocular Pressure Reduction Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Acute Glaucoma Intraocular Pressure Reduction Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","acute","glaucoma"],
    }),
  },

  "medical-rheumatoid-arthritis-disease-modifying-anti-rheumatic-therapy": {
    id: "medical-rheumatoid-arthritis-disease-modifying-anti-rheumatic-therapy",
    name: "RheumatoidArthritisDiseaseModifyingAntiRheumaticTherapySkill",
    displayName: "Rheumatoid Arthritis Disease-Modifying Anti-Rheumatic Therapy",
    categoryId: "medical",
    description: "Escalates methotrexate and biologic DMARDs to achieve clinical remission.",
    tags: ["medical","medical","rheumatoid","arthritis"],
    transform: createStandardSkillTransform({
      sectionName: "Rheumatoid Arthritis Disease-Modifying Anti-Rheumatic Therapy Standards",
      ruSectionName: "Стандарты и регламенты: Rheumatoid Arthritis Disease-Modifying Anti-Rheumatic Therapy",
      instructions: [
        "Apply core domain tenets for Rheumatoid Arthritis Disease-Modifying Anti-Rheumatic Therapy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Rheumatoid Arthritis Disease-Modifying Anti-Rheumatic Therapy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","rheumatoid","arthritis"],
    }),
  },

  "medical-inflammatory-bowel-disease-crohn-s-vs-ulcerative-colitis": {
    id: "medical-inflammatory-bowel-disease-crohn-s-vs-ulcerative-colitis",
    name: "InflammatoryBowelDiseaseCrohnsvsUlcerativeColitisSkill",
    displayName: "Inflammatory Bowel Disease Crohn's vs Ulcerative Colitis",
    categoryId: "medical",
    description: "Differentiates skip lesions vs continuous mucosal inflammation on colonoscopy.",
    tags: ["medical","medical","inflammatory","bowel"],
    transform: createStandardSkillTransform({
      sectionName: "Inflammatory Bowel Disease Crohn's vs Ulcerative Colitis Standards",
      ruSectionName: "Стандарты и регламенты: Inflammatory Bowel Disease Crohn's vs Ulcerative Colitis",
      instructions: [
        "Apply core domain tenets for Inflammatory Bowel Disease Crohn's vs Ulcerative Colitis.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Inflammatory Bowel Disease Crohn's vs Ulcerative Colitis.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","inflammatory","bowel"],
    }),
  },

  "medical-gout-acute-exacerbation-colchicine-nsaid-therapy": {
    id: "medical-gout-acute-exacerbation-colchicine-nsaid-therapy",
    name: "GoutAcuteExacerbationColchicineNSAIDTherapySkill",
    displayName: "Gout Acute Exacerbation Colchicine & NSAID Therapy",
    categoryId: "medical",
    description: "Treats acute uric acid crystal arthritis with colchicine and avoids starting allopurinol mid-flare.",
    tags: ["medical","medical","gout","acute"],
    transform: createStandardSkillTransform({
      sectionName: "Gout Acute Exacerbation Colchicine & NSAID Therapy Standards",
      ruSectionName: "Стандарты и регламенты: Gout Acute Exacerbation Colchicine & NSAID Therapy",
      instructions: [
        "Apply core domain tenets for Gout Acute Exacerbation Colchicine & NSAID Therapy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Gout Acute Exacerbation Colchicine & NSAID Therapy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","gout","acute"],
    }),
  },

  "medical-hyperkalemia-emergency-cardiac-membrane-stabilization": {
    id: "medical-hyperkalemia-emergency-cardiac-membrane-stabilization",
    name: "HyperkalemiaEmergencyCardiacMembraneStabilizationSkill",
    displayName: "Hyperkalemia Emergency Cardiac Membrane Stabilization",
    categoryId: "medical",
    description: "Administers IV calcium gluconate for ECG changes, followed by insulin/glucose.",
    tags: ["medical","medical","hyperkalemia","emergency"],
    transform: createStandardSkillTransform({
      sectionName: "Hyperkalemia Emergency Cardiac Membrane Stabilization Standards",
      ruSectionName: "Стандарты и регламенты: Hyperkalemia Emergency Cardiac Membrane Stabilization",
      instructions: [
        "Apply core domain tenets for Hyperkalemia Emergency Cardiac Membrane Stabilization.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hyperkalemia Emergency Cardiac Membrane Stabilization.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","hyperkalemia","emergency"],
    }),
  },

  "medical-hyponatremia-corrected-sodium-osmotic-demyelination": {
    id: "medical-hyponatremia-corrected-sodium-osmotic-demyelination",
    name: "HyponatremiaCorrectedSodiumOsmoticDemyelinationSkill",
    displayName: "Hyponatremia Corrected Sodium & Osmotic Demyelination",
    categoryId: "medical",
    description: "Limits sodium correction to max 8 mEq/L in 24 hours to prevent central pontine myelinolysis.",
    tags: ["medical","medical","hyponatremia","corrected"],
    transform: createStandardSkillTransform({
      sectionName: "Hyponatremia Corrected Sodium & Osmotic Demyelination Standards",
      ruSectionName: "Стандарты и регламенты: Hyponatremia Corrected Sodium & Osmotic Demyelination",
      instructions: [
        "Apply core domain tenets for Hyponatremia Corrected Sodium & Osmotic Demyelination.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hyponatremia Corrected Sodium & Osmotic Demyelination.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","hyponatremia","corrected"],
    }),
  },

  "medical-alcohol-withdrawal-ciwa-protocol-benzodiazepines": {
    id: "medical-alcohol-withdrawal-ciwa-protocol-benzodiazepines",
    name: "AlcoholWithdrawalCIWAProtocolBenzodiazepinesSkill",
    displayName: "Alcohol Withdrawal CIWA Protocol & Benzodiazepines",
    categoryId: "medical",
    description: "Monitors CIWA-Ar scores and administers symptom-triggered lorazepam.",
    tags: ["medical","medical","alcohol","withdrawal"],
    transform: createStandardSkillTransform({
      sectionName: "Alcohol Withdrawal CIWA Protocol & Benzodiazepines Standards",
      ruSectionName: "Стандарты и регламенты: Alcohol Withdrawal CIWA Protocol & Benzodiazepines",
      instructions: [
        "Apply core domain tenets for Alcohol Withdrawal CIWA Protocol & Benzodiazepines.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Alcohol Withdrawal CIWA Protocol & Benzodiazepines.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","alcohol","withdrawal"],
    }),
  },

  "medical-lyme-disease-erythema-migrans-doxycycline-protocol": {
    id: "medical-lyme-disease-erythema-migrans-doxycycline-protocol",
    name: "LymeDiseaseErythemaMigransDoxycyclineProtocolSkill",
    displayName: "Lyme Disease Erythema Migrans & Doxycycline Protocol",
    categoryId: "medical",
    description: "Diagnoses bullseye rash and prescribes 10-14 days of oral doxycycline.",
    tags: ["medical","medical","lyme","disease"],
    transform: createStandardSkillTransform({
      sectionName: "Lyme Disease Erythema Migrans & Doxycycline Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Lyme Disease Erythema Migrans & Doxycycline Protocol",
      instructions: [
        "Apply core domain tenets for Lyme Disease Erythema Migrans & Doxycycline Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Lyme Disease Erythema Migrans & Doxycycline Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","lyme","disease"],
    }),
  },

  "medical-community-acquired-pneumonia-curb-65-outpatient-vs-inpatient": {
    id: "medical-community-acquired-pneumonia-curb-65-outpatient-vs-inpatient",
    name: "CommunityAcquiredPneumoniaCURB65OutpatientvsInpatientSkill",
    displayName: "Community-Acquired Pneumonia CURB-65 Outpatient vs Inpatient",
    categoryId: "medical",
    description: "Scores Confusion, Urea, Respiratory rate, Blood pressure, Age 65 to decide admission.",
    tags: ["medical","medical","community","acquired"],
    transform: createStandardSkillTransform({
      sectionName: "Community-Acquired Pneumonia CURB-65 Outpatient vs Inpatient Standards",
      ruSectionName: "Стандарты и регламенты: Community-Acquired Pneumonia CURB-65 Outpatient vs Inpatient",
      instructions: [
        "Apply core domain tenets for Community-Acquired Pneumonia CURB-65 Outpatient vs Inpatient.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Community-Acquired Pneumonia CURB-65 Outpatient vs Inpatient.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","community","acquired"],
    }),
  },

  "medical-osteomyelitis-mri-diagnosis-long-term-antibiotics": {
    id: "medical-osteomyelitis-mri-diagnosis-long-term-antibiotics",
    name: "OsteomyelitisMRIDiagnosisLongTermAntibioticsSkill",
    displayName: "Osteomyelitis MRI Diagnosis & Long-Term Antibiotics",
    categoryId: "medical",
    description: "Confirms bone infection on MRI and manages 6-week targeted IV antibiotic courses.",
    tags: ["medical","medical","osteomyelitis","mri"],
    transform: createStandardSkillTransform({
      sectionName: "Osteomyelitis MRI Diagnosis & Long-Term Antibiotics Standards",
      ruSectionName: "Стандарты и регламенты: Osteomyelitis MRI Diagnosis & Long-Term Antibiotics",
      instructions: [
        "Apply core domain tenets for Osteomyelitis MRI Diagnosis & Long-Term Antibiotics.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Osteomyelitis MRI Diagnosis & Long-Term Antibiotics.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","osteomyelitis","mri"],
    }),
  },

  "medical-deep-vein-thrombosis-dvt-wells-score-doac-therapy": {
    id: "medical-deep-vein-thrombosis-dvt-wells-score-doac-therapy",
    name: "DeepVeinThrombosisDVTWellsScoreDOACTherapySkill",
    displayName: "Deep Vein Thrombosis (DVT) Wells Score & DOAC Therapy",
    categoryId: "medical",
    description: "Evaluates pre-test probability, orders D-dimer/ultrasound, and initiates apixaban.",
    tags: ["medical","medical","deep","vein"],
    transform: createStandardSkillTransform({
      sectionName: "Deep Vein Thrombosis (DVT) Wells Score & DOAC Therapy Standards",
      ruSectionName: "Стандарты и регламенты: Deep Vein Thrombosis (DVT) Wells Score & DOAC Therapy",
      instructions: [
        "Apply core domain tenets for Deep Vein Thrombosis (DVT) Wells Score & DOAC Therapy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Deep Vein Thrombosis (DVT) Wells Score & DOAC Therapy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","deep","vein"],
    }),
  },

  "medical-pulmonary-embolism-perc-rule-ct-pulmonary-angiogram": {
    id: "medical-pulmonary-embolism-perc-rule-ct-pulmonary-angiogram",
    name: "PulmonaryEmbolismPERCRuleCTPulmonaryAngiogramSkill",
    displayName: "Pulmonary Embolism PERC Rule & CT Pulmonary Angiogram",
    categoryId: "medical",
    description: "Rules out PE with PERC criteria or confirms with CTPA in high-risk patients.",
    tags: ["medical","medical","pulmonary","embolism"],
    transform: createStandardSkillTransform({
      sectionName: "Pulmonary Embolism PERC Rule & CT Pulmonary Angiogram Standards",
      ruSectionName: "Стандарты и регламенты: Pulmonary Embolism PERC Rule & CT Pulmonary Angiogram",
      instructions: [
        "Apply core domain tenets for Pulmonary Embolism PERC Rule & CT Pulmonary Angiogram.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Pulmonary Embolism PERC Rule & CT Pulmonary Angiogram.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","pulmonary","embolism"],
    }),
  },

  "medical-cervical-spine-clearance-nexus-criteria-canadian-rule": {
    id: "medical-cervical-spine-clearance-nexus-criteria-canadian-rule",
    name: "CervicalSpineClearanceNexusCriteriaCanadianRuleSkill",
    displayName: "Cervical Spine Clearance Nexus Criteria & Canadian Rule",
    categoryId: "medical",
    description: "Clears C-spine clinically without X-rays in low-risk trauma patients.",
    tags: ["medical","medical","cervical","spine"],
    transform: createStandardSkillTransform({
      sectionName: "Cervical Spine Clearance Nexus Criteria & Canadian Rule Standards",
      ruSectionName: "Стандарты и регламенты: Cervical Spine Clearance Nexus Criteria & Canadian Rule",
      instructions: [
        "Apply core domain tenets for Cervical Spine Clearance Nexus Criteria & Canadian Rule.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cervical Spine Clearance Nexus Criteria & Canadian Rule.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","cervical","spine"],
    }),
  },

  "medical-pericarditis-friction-rub-colchicine-anti-inflammatory": {
    id: "medical-pericarditis-friction-rub-colchicine-anti-inflammatory",
    name: "PericarditisFrictionRubColchicineAntiInflammatorySkill",
    displayName: "Pericarditis Friction Rub & Colchicine Anti-Inflammatory",
    categoryId: "medical",
    description: "Identifies PR depression / diffuse ST elevation on ECG and prescribes colchicine.",
    tags: ["medical","medical","pericarditis","friction"],
    transform: createStandardSkillTransform({
      sectionName: "Pericarditis Friction Rub & Colchicine Anti-Inflammatory Standards",
      ruSectionName: "Стандарты и регламенты: Pericarditis Friction Rub & Colchicine Anti-Inflammatory",
      instructions: [
        "Apply core domain tenets for Pericarditis Friction Rub & Colchicine Anti-Inflammatory.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Pericarditis Friction Rub & Colchicine Anti-Inflammatory.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","pericarditis","friction"],
    }),
  },

  "medical-infective-endocarditis-duke-criteria-blood-cultures": {
    id: "medical-infective-endocarditis-duke-criteria-blood-cultures",
    name: "InfectiveEndocarditisDukeCriteriaBloodCulturesSkill",
    displayName: "Infective Endocarditis Duke Criteria & Blood Cultures",
    categoryId: "medical",
    description: "Diagnoses heart valve infections using major bacteremia and echo criteria.",
    tags: ["medical","medical","infective","endocarditis"],
    transform: createStandardSkillTransform({
      sectionName: "Infective Endocarditis Duke Criteria & Blood Cultures Standards",
      ruSectionName: "Стандарты и регламенты: Infective Endocarditis Duke Criteria & Blood Cultures",
      instructions: [
        "Apply core domain tenets for Infective Endocarditis Duke Criteria & Blood Cultures.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Infective Endocarditis Duke Criteria & Blood Cultures.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","infective","endocarditis"],
    }),
  },

  "medical-multiple-sclerosis-mcdonald-diagnostic-criteria-mri": {
    id: "medical-multiple-sclerosis-mcdonald-diagnostic-criteria-mri",
    name: "MultipleSclerosisMcDonaldDiagnosticCriteriaMRISkill",
    displayName: "Multiple Sclerosis McDonald Diagnostic Criteria & MRI",
    categoryId: "medical",
    description: "Confirms demyelinating lesions separated in time and space on brain MRI.",
    tags: ["medical","medical","multiple","sclerosis"],
    transform: createStandardSkillTransform({
      sectionName: "Multiple Sclerosis McDonald Diagnostic Criteria & MRI Standards",
      ruSectionName: "Стандарты и регламенты: Multiple Sclerosis McDonald Diagnostic Criteria & MRI",
      instructions: [
        "Apply core domain tenets for Multiple Sclerosis McDonald Diagnostic Criteria & MRI.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Multiple Sclerosis McDonald Diagnostic Criteria & MRI.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","multiple","sclerosis"],
    }),
  },

  "medical-parkinson-s-disease-cardinal-symptoms-levodopa-therapy": {
    id: "medical-parkinson-s-disease-cardinal-symptoms-levodopa-therapy",
    name: "ParkinsonsDiseaseCardinalSymptomsLevodopaTherapySkill",
    displayName: "Parkinson's Disease Cardinal Symptoms & Levodopa Therapy",
    categoryId: "medical",
    description: "Identifies Bradykinesia, Resting Tremor, and Rigidity, titrating carbidopa-levodopa.",
    tags: ["medical","medical","parkinson","s"],
    transform: createStandardSkillTransform({
      sectionName: "Parkinson's Disease Cardinal Symptoms & Levodopa Therapy Standards",
      ruSectionName: "Стандарты и регламенты: Parkinson's Disease Cardinal Symptoms & Levodopa Therapy",
      instructions: [
        "Apply core domain tenets for Parkinson's Disease Cardinal Symptoms & Levodopa Therapy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Parkinson's Disease Cardinal Symptoms & Levodopa Therapy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","parkinson","s"],
    }),
  },

  "medical-myasthenia-gravis-pyridostigmine-crisis-surveillance": {
    id: "medical-myasthenia-gravis-pyridostigmine-crisis-surveillance",
    name: "MyastheniaGravisPyridostigmineCrisisSurveillanceSkill",
    displayName: "Myasthenia Gravis Pyridostigmine & Crisis Surveillance",
    categoryId: "medical",
    description: "Treats neuromuscular weakness with acetylcholinesterase inhibitors.",
    tags: ["medical","medical","myasthenia","gravis"],
    transform: createStandardSkillTransform({
      sectionName: "Myasthenia Gravis Pyridostigmine & Crisis Surveillance Standards",
      ruSectionName: "Стандарты и регламенты: Myasthenia Gravis Pyridostigmine & Crisis Surveillance",
      instructions: [
        "Apply core domain tenets for Myasthenia Gravis Pyridostigmine & Crisis Surveillance.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Myasthenia Gravis Pyridostigmine & Crisis Surveillance.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","myasthenia","gravis"],
    }),
  },

  "medical-aortic-dissection-stanford-type-a-vs-b-emergency": {
    id: "medical-aortic-dissection-stanford-type-a-vs-b-emergency",
    name: "AorticDissectionStanfordTypeAvsBEmergencySkill",
    displayName: "Aortic Dissection Stanford Type A vs B Emergency",
    categoryId: "medical",
    description: "Identifies tearing chest/back pain, managing Type A with immediate surgery.",
    tags: ["medical","medical","aortic","dissection"],
    transform: createStandardSkillTransform({
      sectionName: "Aortic Dissection Stanford Type A vs B Emergency Standards",
      ruSectionName: "Стандарты и регламенты: Aortic Dissection Stanford Type A vs B Emergency",
      instructions: [
        "Apply core domain tenets for Aortic Dissection Stanford Type A vs B Emergency.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Aortic Dissection Stanford Type A vs B Emergency.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","aortic","dissection"],
    }),
  },

  "medical-abdominal-aortic-aneurysm-aaa-screening-repair-threshold": {
    id: "medical-abdominal-aortic-aneurysm-aaa-screening-repair-threshold",
    name: "AbdominalAorticAneurysmAAAScreeningRepairThresholdSkill",
    displayName: "Abdominal Aortic Aneurysm (AAA) Screening & Repair Threshold",
    categoryId: "medical",
    description: "Monitors AAA diameter with ultrasound, referring for repair at >= 5.5 cm.",
    tags: ["medical","medical","abdominal","aortic"],
    transform: createStandardSkillTransform({
      sectionName: "Abdominal Aortic Aneurysm (AAA) Screening & Repair Threshold Standards",
      ruSectionName: "Стандарты и регламенты: Abdominal Aortic Aneurysm (AAA) Screening & Repair Threshold",
      instructions: [
        "Apply core domain tenets for Abdominal Aortic Aneurysm (AAA) Screening & Repair Threshold.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Abdominal Aortic Aneurysm (AAA) Screening & Repair Threshold.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","abdominal","aortic"],
    }),
  },

  "medical-peripheral-artery-disease-ankle-brachial-index-abi": {
    id: "medical-peripheral-artery-disease-ankle-brachial-index-abi",
    name: "PeripheralArteryDiseaseAnkleBrachialIndexABISkill",
    displayName: "Peripheral Artery Disease Ankle-Brachial Index (ABI)",
    categoryId: "medical",
    description: "Diagnoses leg claudication with ABI < 0.9 and prescribes cilostazol.",
    tags: ["medical","medical","peripheral","artery"],
    transform: createStandardSkillTransform({
      sectionName: "Peripheral Artery Disease Ankle-Brachial Index (ABI) Standards",
      ruSectionName: "Стандарты и регламенты: Peripheral Artery Disease Ankle-Brachial Index (ABI)",
      instructions: [
        "Apply core domain tenets for Peripheral Artery Disease Ankle-Brachial Index (ABI).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Peripheral Artery Disease Ankle-Brachial Index (ABI).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","peripheral","artery"],
    }),
  },

  "medical-idiopathic-pulmonary-fibrosis-high-resolution-ct": {
    id: "medical-idiopathic-pulmonary-fibrosis-high-resolution-ct",
    name: "IdiopathicPulmonaryFibrosisHighResolutionCTSkill",
    displayName: "Idiopathic Pulmonary Fibrosis High-Resolution CT",
    categoryId: "medical",
    description: "Identifies usual interstitial pneumonia (UIP) honeycombing on chest CT.",
    tags: ["medical","medical","idiopathic","pulmonary"],
    transform: createStandardSkillTransform({
      sectionName: "Idiopathic Pulmonary Fibrosis High-Resolution CT Standards",
      ruSectionName: "Стандарты и регламенты: Idiopathic Pulmonary Fibrosis High-Resolution CT",
      instructions: [
        "Apply core domain tenets for Idiopathic Pulmonary Fibrosis High-Resolution CT.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Idiopathic Pulmonary Fibrosis High-Resolution CT.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","idiopathic","pulmonary"],
    }),
  },

  "medical-obstructive-sleep-apnea-stop-bang-screening-cpap": {
    id: "medical-obstructive-sleep-apnea-stop-bang-screening-cpap",
    name: "ObstructiveSleepApneaStopBangScreeningCPAPSkill",
    displayName: "Obstructive Sleep Apnea Stop-Bang Screening & CPAP",
    categoryId: "medical",
    description: "Screens snoring and daytime somnolence, prescribing continuous positive airway pressure.",
    tags: ["medical","medical","obstructive","sleep"],
    transform: createStandardSkillTransform({
      sectionName: "Obstructive Sleep Apnea Stop-Bang Screening & CPAP Standards",
      ruSectionName: "Стандарты и регламенты: Obstructive Sleep Apnea Stop-Bang Screening & CPAP",
      instructions: [
        "Apply core domain tenets for Obstructive Sleep Apnea Stop-Bang Screening & CPAP.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Obstructive Sleep Apnea Stop-Bang Screening & CPAP.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","obstructive","sleep"],
    }),
  },

  "medical-gastroesophageal-reflux-disease-gerd-ppi-escalation": {
    id: "medical-gastroesophageal-reflux-disease-gerd-ppi-escalation",
    name: "GastroesophagealRefluxDiseaseGERDPPIEscalationSkill",
    displayName: "Gastroesophageal Reflux Disease (GERD) PPI Escalation",
    categoryId: "medical",
    description: "Manages heartburn with 8-week proton pump inhibitor trials and lifestyle changes.",
    tags: ["medical","medical","gastroesophageal","reflux"],
    transform: createStandardSkillTransform({
      sectionName: "Gastroesophageal Reflux Disease (GERD) PPI Escalation Standards",
      ruSectionName: "Стандарты и регламенты: Gastroesophageal Reflux Disease (GERD) PPI Escalation",
      instructions: [
        "Apply core domain tenets for Gastroesophageal Reflux Disease (GERD) PPI Escalation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Gastroesophageal Reflux Disease (GERD) PPI Escalation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","gastroesophageal","reflux"],
    }),
  },

  "medical-peptic-ulcer-disease-h-pylori-eradication-quadruple-therapy": {
    id: "medical-peptic-ulcer-disease-h-pylori-eradication-quadruple-therapy",
    name: "PepticUlcerDiseaseHpyloriEradicationQuadrupleTherapySkill",
    displayName: "Peptic Ulcer Disease H. pylori Eradication Quadruple Therapy",
    categoryId: "medical",
    description: "Treats stomach ulcers with bismuth, metronidazole, tetracycline, and PPI.",
    tags: ["medical","medical","peptic","ulcer"],
    transform: createStandardSkillTransform({
      sectionName: "Peptic Ulcer Disease H. pylori Eradication Quadruple Therapy Standards",
      ruSectionName: "Стандарты и регламенты: Peptic Ulcer Disease H. pylori Eradication Quadruple Therapy",
      instructions: [
        "Apply core domain tenets for Peptic Ulcer Disease H. pylori Eradication Quadruple Therapy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Peptic Ulcer Disease H. pylori Eradication Quadruple Therapy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","peptic","ulcer"],
    }),
  },

  "medical-c-difficile-colitis-vancomycin-oral-regimen": {
    id: "medical-c-difficile-colitis-vancomycin-oral-regimen",
    name: "CdifficileColitisVancomycinOralRegimenSkill",
    displayName: "C. difficile Colitis Vancomycin Oral Regimen",
    categoryId: "medical",
    description: "Treats severe watery diarrhea after antibiotic exposure with oral vancomycin.",
    tags: ["medical","medical","c","difficile"],
    transform: createStandardSkillTransform({
      sectionName: "C. difficile Colitis Vancomycin Oral Regimen Standards",
      ruSectionName: "Стандарты и регламенты: C. difficile Colitis Vancomycin Oral Regimen",
      instructions: [
        "Apply core domain tenets for C. difficile Colitis Vancomycin Oral Regimen.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для C. difficile Colitis Vancomycin Oral Regimen.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","c","difficile"],
    }),
  },

  "medical-nonalcoholic-fatty-liver-disease-nafld-fib-4-score": {
    id: "medical-nonalcoholic-fatty-liver-disease-nafld-fib-4-score",
    name: "NonalcoholicFattyLiverDiseaseNAFLDFIB4ScoreSkill",
    displayName: "Nonalcoholic Fatty Liver Disease (NAFLD) FIB-4 Score",
    categoryId: "medical",
    description: "Calculates non-invasive liver fibrosis risk scores to guide lifestyle interventions.",
    tags: ["medical","medical","nonalcoholic","fatty"],
    transform: createStandardSkillTransform({
      sectionName: "Nonalcoholic Fatty Liver Disease (NAFLD) FIB-4 Score Standards",
      ruSectionName: "Стандарты и регламенты: Nonalcoholic Fatty Liver Disease (NAFLD) FIB-4 Score",
      instructions: [
        "Apply core domain tenets for Nonalcoholic Fatty Liver Disease (NAFLD) FIB-4 Score.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Nonalcoholic Fatty Liver Disease (NAFLD) FIB-4 Score.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","nonalcoholic","fatty"],
    }),
  },

  "medical-polycystic-ovary-syndrome-pcos-rotterdam-criteria": {
    id: "medical-polycystic-ovary-syndrome-pcos-rotterdam-criteria",
    name: "PolycysticOvarySyndromePCOSRotterdamCriteriaSkill",
    displayName: "Polycystic Ovary Syndrome (PCOS) Rotterdam Criteria",
    categoryId: "medical",
    description: "Diagnoses PCOS based on oligo-ovulation, hyperandrogenism, and polycystic ovaries.",
    tags: ["medical","medical","polycystic","ovary"],
    transform: createStandardSkillTransform({
      sectionName: "Polycystic Ovary Syndrome (PCOS) Rotterdam Criteria Standards",
      ruSectionName: "Стандарты и регламенты: Polycystic Ovary Syndrome (PCOS) Rotterdam Criteria",
      instructions: [
        "Apply core domain tenets for Polycystic Ovary Syndrome (PCOS) Rotterdam Criteria.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Polycystic Ovary Syndrome (PCOS) Rotterdam Criteria.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","polycystic","ovary"],
    }),
  },

  "medical-endometriosis-dysmenorrhea-hormonal-suppression": {
    id: "medical-endometriosis-dysmenorrhea-hormonal-suppression",
    name: "EndometriosisDysmenorrheaHormonalSuppressionSkill",
    displayName: "Endometriosis Dysmenorrhea & Hormonal Suppression",
    categoryId: "medical",
    description: "Manages pelvic pain with NSAIDs, oral contraceptives, and GnRH agonists.",
    tags: ["medical","medical","endometriosis","dysmenorrhea"],
    transform: createStandardSkillTransform({
      sectionName: "Endometriosis Dysmenorrhea & Hormonal Suppression Standards",
      ruSectionName: "Стандарты и регламенты: Endometriosis Dysmenorrhea & Hormonal Suppression",
      instructions: [
        "Apply core domain tenets for Endometriosis Dysmenorrhea & Hormonal Suppression.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Endometriosis Dysmenorrhea & Hormonal Suppression.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","endometriosis","dysmenorrhea"],
    }),
  },

  "medical-benign-prostatic-hyperplasia-bph-aua-symptom-score": {
    id: "medical-benign-prostatic-hyperplasia-bph-aua-symptom-score",
    name: "BenignProstaticHyperplasiaBPHAUASymptomScoreSkill",
    displayName: "Benign Prostatic Hyperplasia (BPH) AUA Symptom Score",
    categoryId: "medical",
    description: "Treats urinary hesitancy with tamsulosin (alpha-blocker) and finasteride.",
    tags: ["medical","medical","benign","prostatic"],
    transform: createStandardSkillTransform({
      sectionName: "Benign Prostatic Hyperplasia (BPH) AUA Symptom Score Standards",
      ruSectionName: "Стандарты и регламенты: Benign Prostatic Hyperplasia (BPH) AUA Symptom Score",
      instructions: [
        "Apply core domain tenets for Benign Prostatic Hyperplasia (BPH) AUA Symptom Score.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Benign Prostatic Hyperplasia (BPH) AUA Symptom Score.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","benign","prostatic"],
    }),
  },

  "medical-nephrolithiasis-kidney-stone-ct-alpha-blocker-pass": {
    id: "medical-nephrolithiasis-kidney-stone-ct-alpha-blocker-pass",
    name: "NephrolithiasisKidneyStoneCTAlphaBlockerPassSkill",
    displayName: "Nephrolithiasis Kidney Stone CT & Alpha-Blocker Pass",
    categoryId: "medical",
    description: "Evaluates stone size on non-contrast CT, prescribing tamsulosin for stones < 10mm.",
    tags: ["medical","medical","nephrolithiasis","kidney"],
    transform: createStandardSkillTransform({
      sectionName: "Nephrolithiasis Kidney Stone CT & Alpha-Blocker Pass Standards",
      ruSectionName: "Стандарты и регламенты: Nephrolithiasis Kidney Stone CT & Alpha-Blocker Pass",
      instructions: [
        "Apply core domain tenets for Nephrolithiasis Kidney Stone CT & Alpha-Blocker Pass.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Nephrolithiasis Kidney Stone CT & Alpha-Blocker Pass.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","nephrolithiasis","kidney"],
    }),
  },

  "medical-urinary-tract-infection-uncomplicated-cystitis-nitrofurantoin": {
    id: "medical-urinary-tract-infection-uncomplicated-cystitis-nitrofurantoin",
    name: "UrinaryTractInfectionUncomplicatedCystitisNitrofurantoinSkill",
    displayName: "Urinary Tract Infection Uncomplicated Cystitis Nitrofurantoin",
    categoryId: "medical",
    description: "Treats female dysuria with 5 days of oral nitrofurantoin or single-dose fosfomycin.",
    tags: ["medical","medical","urinary","tract"],
    transform: createStandardSkillTransform({
      sectionName: "Urinary Tract Infection Uncomplicated Cystitis Nitrofurantoin Standards",
      ruSectionName: "Стандарты и регламенты: Urinary Tract Infection Uncomplicated Cystitis Nitrofurantoin",
      instructions: [
        "Apply core domain tenets for Urinary Tract Infection Uncomplicated Cystitis Nitrofurantoin.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Urinary Tract Infection Uncomplicated Cystitis Nitrofurantoin.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","urinary","tract"],
    }),
  },

  "medical-osteoporosis-dexa-scan-t-score-bisphosphonate": {
    id: "medical-osteoporosis-dexa-scan-t-score-bisphosphonate",
    name: "OsteoporosisDEXAScanTScoreBisphosphonateSkill",
    displayName: "Osteoporosis DEXA Scan T-Score & Bisphosphonate",
    categoryId: "medical",
    description: "Diagnoses osteoporosis at T-score <= -2.5, prescribing oral alendronate.",
    tags: ["medical","medical","osteoporosis","dexa"],
    transform: createStandardSkillTransform({
      sectionName: "Osteoporosis DEXA Scan T-Score & Bisphosphonate Standards",
      ruSectionName: "Стандарты и регламенты: Osteoporosis DEXA Scan T-Score & Bisphosphonate",
      instructions: [
        "Apply core domain tenets for Osteoporosis DEXA Scan T-Score & Bisphosphonate.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Osteoporosis DEXA Scan T-Score & Bisphosphonate.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","osteoporosis","dexa"],
    }),
  },

  "medical-fibromyalgia-widespread-pain-index-snri-therapy": {
    id: "medical-fibromyalgia-widespread-pain-index-snri-therapy",
    name: "FibromyalgiaWidespreadPainIndexSNRITherapySkill",
    displayName: "Fibromyalgia Widespread Pain Index & SNRI Therapy",
    categoryId: "medical",
    description: "Manages chronic musculoskeletal pain with duloxetine, pregabalin, and exercise.",
    tags: ["medical","medical","fibromyalgia","widespread"],
    transform: createStandardSkillTransform({
      sectionName: "Fibromyalgia Widespread Pain Index & SNRI Therapy Standards",
      ruSectionName: "Стандарты и регламенты: Fibromyalgia Widespread Pain Index & SNRI Therapy",
      instructions: [
        "Apply core domain tenets for Fibromyalgia Widespread Pain Index & SNRI Therapy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Fibromyalgia Widespread Pain Index & SNRI Therapy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","fibromyalgia","widespread"],
    }),
  },

  "medical-major-depressive-disorder-phq-9-ssri-selection": {
    id: "medical-major-depressive-disorder-phq-9-ssri-selection",
    name: "MajorDepressiveDisorderPHQ9SSRISelectionSkill",
    displayName: "Major Depressive Disorder PHQ-9 & SSRI Selection",
    categoryId: "medical",
    description: "Monitors depression severity with PHQ-9, selecting sertraline or escitalopram.",
    tags: ["medical","medical","major","depressive"],
    transform: createStandardSkillTransform({
      sectionName: "Major Depressive Disorder PHQ-9 & SSRI Selection Standards",
      ruSectionName: "Стандарты и регламенты: Major Depressive Disorder PHQ-9 & SSRI Selection",
      instructions: [
        "Apply core domain tenets for Major Depressive Disorder PHQ-9 & SSRI Selection.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Major Depressive Disorder PHQ-9 & SSRI Selection.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","major","depressive"],
    }),
  },

  "medical-generalized-anxiety-disorder-gad-7-cbt-therapy": {
    id: "medical-generalized-anxiety-disorder-gad-7-cbt-therapy",
    name: "GeneralizedAnxietyDisorderGAD7CBTTherapySkill",
    displayName: "Generalized Anxiety Disorder GAD-7 & CBT Therapy",
    categoryId: "medical",
    description: "Treats persistent worry with cognitive behavioral therapy and SSRIs.",
    tags: ["medical","medical","generalized","anxiety"],
    transform: createStandardSkillTransform({
      sectionName: "Generalized Anxiety Disorder GAD-7 & CBT Therapy Standards",
      ruSectionName: "Стандарты и регламенты: Generalized Anxiety Disorder GAD-7 & CBT Therapy",
      instructions: [
        "Apply core domain tenets for Generalized Anxiety Disorder GAD-7 & CBT Therapy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Generalized Anxiety Disorder GAD-7 & CBT Therapy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","generalized","anxiety"],
    }),
  },

  "medical-schizophrenia-positive-vs-negative-symptoms-antipsychotics": {
    id: "medical-schizophrenia-positive-vs-negative-symptoms-antipsychotics",
    name: "SchizophreniaPositivevsNegativeSymptomsAntipsychoticsSkill",
    displayName: "Schizophrenia Positive vs Negative Symptoms & Antipsychotics",
    categoryId: "medical",
    description: "Manages hallucinations with second-generation antipsychotics like risperidone.",
    tags: ["medical","medical","schizophrenia","positive"],
    transform: createStandardSkillTransform({
      sectionName: "Schizophrenia Positive vs Negative Symptoms & Antipsychotics Standards",
      ruSectionName: "Стандарты и регламенты: Schizophrenia Positive vs Negative Symptoms & Antipsychotics",
      instructions: [
        "Apply core domain tenets for Schizophrenia Positive vs Negative Symptoms & Antipsychotics.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Schizophrenia Positive vs Negative Symptoms & Antipsychotics.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","schizophrenia","positive"],
    }),
  },

  "medical-bipolar-i-disorder-acute-mania-lithium-valproate": {
    id: "medical-bipolar-i-disorder-acute-mania-lithium-valproate",
    name: "BipolarIDisorderAcuteManiaLithiumValproateSkill",
    displayName: "Bipolar I Disorder Acute Mania Lithium & Valproate",
    categoryId: "medical",
    description: "Stabilizes mood swings with lithium or divalproex, monitoring serum blood levels.",
    tags: ["medical","medical","bipolar","i"],
    transform: createStandardSkillTransform({
      sectionName: "Bipolar I Disorder Acute Mania Lithium & Valproate Standards",
      ruSectionName: "Стандарты и регламенты: Bipolar I Disorder Acute Mania Lithium & Valproate",
      instructions: [
        "Apply core domain tenets for Bipolar I Disorder Acute Mania Lithium & Valproate.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Bipolar I Disorder Acute Mania Lithium & Valproate.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","bipolar","i"],
    }),
  },

  "medical-attention-deficit-hyperactivity-disorder-adhd-stimulant-titration": {
    id: "medical-attention-deficit-hyperactivity-disorder-adhd-stimulant-titration",
    name: "AttentionDeficitHyperactivityDisorderADHDStimulantTitrationSkill",
    displayName: "Attention Deficit Hyperactivity Disorder (ADHD) Stimulant Titration",
    categoryId: "medical",
    description: "Treats inattention in children and adults with methylphenidate or amphetamines.",
    tags: ["medical","medical","attention","deficit"],
    transform: createStandardSkillTransform({
      sectionName: "Attention Deficit Hyperactivity Disorder (ADHD) Stimulant Titration Standards",
      ruSectionName: "Стандарты и регламенты: Attention Deficit Hyperactivity Disorder (ADHD) Stimulant Titration",
      instructions: [
        "Apply core domain tenets for Attention Deficit Hyperactivity Disorder (ADHD) Stimulant Titration.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Attention Deficit Hyperactivity Disorder (ADHD) Stimulant Titration.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","attention","deficit"],
    }),
  },

  "medical-post-traumatic-stress-disorder-ptsd-pcl-5-prolonged-exposure": {
    id: "medical-post-traumatic-stress-disorder-ptsd-pcl-5-prolonged-exposure",
    name: "PostTraumaticStressDisorderPTSDPCL5ProlongedExposureSkill",
    displayName: "Post-Traumatic Stress Disorder (PTSD) PCL-5 & Prolonged Exposure",
    categoryId: "medical",
    description: "Treats trauma flashbacks with trauma-focused CBT and prazosin for nightmares.",
    tags: ["medical","medical","post","traumatic"],
    transform: createStandardSkillTransform({
      sectionName: "Post-Traumatic Stress Disorder (PTSD) PCL-5 & Prolonged Exposure Standards",
      ruSectionName: "Стандарты и регламенты: Post-Traumatic Stress Disorder (PTSD) PCL-5 & Prolonged Exposure",
      instructions: [
        "Apply core domain tenets for Post-Traumatic Stress Disorder (PTSD) PCL-5 & Prolonged Exposure.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Post-Traumatic Stress Disorder (PTSD) PCL-5 & Prolonged Exposure.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","post","traumatic"],
    }),
  },

  "medical-anorexia-nervosa-refeeding-syndrome-prevention": {
    id: "medical-anorexia-nervosa-refeeding-syndrome-prevention",
    name: "AnorexiaNervosaRefeedingSyndromePreventionSkill",
    displayName: "Anorexia Nervosa Refeeding Syndrome Prevention",
    categoryId: "medical",
    description: "Monitors electrolyte drops (phosphate, potassium) during nutritional re-feeding.",
    tags: ["medical","medical","anorexia","nervosa"],
    transform: createStandardSkillTransform({
      sectionName: "Anorexia Nervosa Refeeding Syndrome Prevention Standards",
      ruSectionName: "Стандарты и регламенты: Anorexia Nervosa Refeeding Syndrome Prevention",
      instructions: [
        "Apply core domain tenets for Anorexia Nervosa Refeeding Syndrome Prevention.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Anorexia Nervosa Refeeding Syndrome Prevention.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","anorexia","nervosa"],
    }),
  },

  "medical-obesity-bariatric-surgery-qualification-criteria": {
    id: "medical-obesity-bariatric-surgery-qualification-criteria",
    name: "ObesityBariatricSurgeryQualificationCriteriaSkill",
    displayName: "Obesity Bariatric Surgery Qualification Criteria",
    categoryId: "medical",
    description: "Refers patients with BMI >= 40 or BMI >= 35 with comorbidities for bariatric evaluation.",
    tags: ["medical","medical","obesity","bariatric"],
    transform: createStandardSkillTransform({
      sectionName: "Obesity Bariatric Surgery Qualification Criteria Standards",
      ruSectionName: "Стандарты и регламенты: Obesity Bariatric Surgery Qualification Criteria",
      instructions: [
        "Apply core domain tenets for Obesity Bariatric Surgery Qualification Criteria.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Obesity Bariatric Surgery Qualification Criteria.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","obesity","bariatric"],
    }),
  },

  "medical-comprehensive-clinical-medicine-evidence-based-constitution": {
    id: "medical-comprehensive-clinical-medicine-evidence-based-constitution",
    name: "ComprehensiveClinicalMedicineEvidenceBasedConstitutionSkill",
    displayName: "Comprehensive Clinical Medicine & Evidence-Based Constitution",
    categoryId: "medical",
    description: "Enforces world-class medical evidence scoring, SOAP documentation, and patient safety.",
    tags: ["medical","medical","comprehensive","clinical"],
    transform: createStandardSkillTransform({
      sectionName: "Comprehensive Clinical Medicine & Evidence-Based Constitution Standards",
      ruSectionName: "Стандарты и регламенты: Comprehensive Clinical Medicine & Evidence-Based Constitution",
      instructions: [
        "Apply core domain tenets for Comprehensive Clinical Medicine & Evidence-Based Constitution.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Comprehensive Clinical Medicine & Evidence-Based Constitution.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical","comprehensive","clinical"],
    }),
  },
  "medical-final-clinical-pathway-evidence-based-patient-care-flowchart": {
    id: "medical-final-clinical-pathway-evidence-based-patient-care-flowchart",
    name: "ClinicalPathwayEvidenceBasedPatientCareFlowchartSkill",
    displayName: "Clinical Pathway Evidence-Based Patient Care Flowchart",
    categoryId: "medical",
    description: "Standardizes hospital treatment protocols according to evidence-based clinical guidelines.",
    tags: ["medical","medical-final","final","clinical"],
    transform: createStandardSkillTransform({
      sectionName: "Clinical Pathway Evidence-Based Patient Care Flowchart Standards",
      ruSectionName: "Стандарты и регламенты: Clinical Pathway Evidence-Based Patient Care Flowchart",
      instructions: [
        "Apply core domain tenets for Clinical Pathway Evidence-Based Patient Care Flowchart.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Clinical Pathway Evidence-Based Patient Care Flowchart.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical-final","final","clinical"],
    }),
  },

  "medical-final-pharmacovigilance-adverse-event-reporting-signal-detection": {
    id: "medical-final-pharmacovigilance-adverse-event-reporting-signal-detection",
    name: "PharmacovigilanceAdverseEventReportingSignalDetectionSkill",
    displayName: "Pharmacovigilance Adverse Event Reporting Signal Detection",
    categoryId: "medical",
    description: "Monitors drug safety databases for emerging adverse event signals and MedDRA coding.",
    tags: ["medical","medical-final","final","pharmacovigilance"],
    transform: createStandardSkillTransform({
      sectionName: "Pharmacovigilance Adverse Event Reporting Signal Detection Standards",
      ruSectionName: "Стандарты и регламенты: Pharmacovigilance Adverse Event Reporting Signal Detection",
      instructions: [
        "Apply core domain tenets for Pharmacovigilance Adverse Event Reporting Signal Detection.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Pharmacovigilance Adverse Event Reporting Signal Detection.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical-final","final","pharmacovigilance"],
    }),
  },

  "medical-final-telemedicine-remote-patient-monitoring-triaging-protocol": {
    id: "medical-final-telemedicine-remote-patient-monitoring-triaging-protocol",
    name: "TelemedicineRemotePatientMonitoringTriagingProtocolSkill",
    displayName: "Telemedicine Remote Patient Monitoring Triaging Protocol",
    categoryId: "medical",
    description: "Triages vital sign anomalies from wearable medical devices in chronic care patients.",
    tags: ["medical","medical-final","final","telemedicine"],
    transform: createStandardSkillTransform({
      sectionName: "Telemedicine Remote Patient Monitoring Triaging Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Telemedicine Remote Patient Monitoring Triaging Protocol",
      instructions: [
        "Apply core domain tenets for Telemedicine Remote Patient Monitoring Triaging Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Telemedicine Remote Patient Monitoring Triaging Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical-final","final","telemedicine"],
    }),
  },

  "medical-final-oncology-tumor-board-multidisciplinary-case-presentation": {
    id: "medical-final-oncology-tumor-board-multidisciplinary-case-presentation",
    name: "OncologyTumorBoardMultidisciplinaryCasePresentationSkill",
    displayName: "Oncology Tumor Board Multidisciplinary Case Presentation",
    categoryId: "medical",
    description: "Synthesizes pathology, radiology, and genetic markers for personalized cancer therapy.",
    tags: ["medical","medical-final","final","oncology"],
    transform: createStandardSkillTransform({
      sectionName: "Oncology Tumor Board Multidisciplinary Case Presentation Standards",
      ruSectionName: "Стандарты и регламенты: Oncology Tumor Board Multidisciplinary Case Presentation",
      instructions: [
        "Apply core domain tenets for Oncology Tumor Board Multidisciplinary Case Presentation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Oncology Tumor Board Multidisciplinary Case Presentation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical-final","final","oncology"],
    }),
  },

  "medical-final-master-clinical-medical-science-patient-care": {
    id: "medical-final-master-clinical-medical-science-patient-care",
    name: "MasterClinicalMedicalSciencePatientCareSkill",
    displayName: "Master Clinical Medical Science Patient Care",
    categoryId: "medical",
    description: "Enforces world-class clinical reasoning, evidence-based medicine, and healthcare standards.",
    tags: ["medical","medical-final","final","master"],
    transform: createStandardSkillTransform({
      sectionName: "Master Clinical Medical Science Patient Care Standards",
      ruSectionName: "Стандарты и регламенты: Master Clinical Medical Science Patient Care",
      instructions: [
        "Apply core domain tenets for Master Clinical Medical Science Patient Care.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Master Clinical Medical Science Patient Care.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["medical","medical-final","final","master"],
    }),
  },
  "medical-multi-multi-specialist-multidisciplinary-tumor-board-consultation": {
    id: "medical-multi-multi-specialist-multidisciplinary-tumor-board-consultation",
    name: "MultiSpecialistMultidisciplinaryTumorBoardConsultationSkill",
    displayName: "Multi Specialist Multidisciplinary Tumor Board Consultation",
    categoryId: "medical",
    description: "Synthesizes medical oncology, surgical oncology, radiation oncology, pathology, and radiology.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Specialist Multidisciplinary Tumor Board Consultation",
      ruSectionName: "Композитный Multi-Skill: Multi Specialist Multidisciplinary Tumor Board Consultation",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Specialist Multidisciplinary Tumor Board Consultation.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Specialist Multidisciplinary Tumor Board Consultation.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-system-differential-diagnosis-clinical-reasoning": {
    id: "medical-multi-multi-system-differential-diagnosis-clinical-reasoning",
    name: "MultiSystemDifferentialDiagnosisClinicalReasoningSkill",
    displayName: "Multi System Differential Diagnosis Clinical Reasoning",
    categoryId: "medical",
    description: "Evaluates patient symptoms across cardiovascular, respiratory, neurological, and endocrine systems.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi System Differential Diagnosis Clinical Reasoning",
      ruSectionName: "Композитный Multi-Skill: Multi System Differential Diagnosis Clinical Reasoning",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi System Differential Diagnosis Clinical Reasoning.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi System Differential Diagnosis Clinical Reasoning.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-critical-care-emergency-resuscitation-protocol": {
    id: "medical-multi-multi-stage-critical-care-emergency-resuscitation-protocol",
    name: "MultiStageCriticalCareEmergencyResuscitationProtocolSkill",
    displayName: "Multi Stage Critical Care Emergency Resuscitation Protocol",
    categoryId: "medical",
    description: "Guides ACLS/ATLS resuscitation steps for cardiac arrest, severe sepsis, and massive trauma.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Critical Care Emergency Resuscitation Protocol",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Critical Care Emergency Resuscitation Protocol",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Critical Care Emergency Resuscitation Protocol.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Critical Care Emergency Resuscitation Protocol.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-layer-pharmacotherapy-drug-interaction-countermeasure": {
    id: "medical-multi-multi-layer-pharmacotherapy-drug-interaction-countermeasure",
    name: "MultiLayerPharmacotherapyDrugInteractionCountermeasureSkill",
    displayName: "Multi Layer Pharmacotherapy Drug Interaction Countermeasure",
    categoryId: "medical",
    description: "Audits polypharmacy regimens identifying cytochrome P450 interactions, QT prolongation, and dosage adjustments.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Pharmacotherapy Drug Interaction Countermeasure",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Pharmacotherapy Drug Interaction Countermeasure",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Pharmacotherapy Drug Interaction Countermeasure.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Pharmacotherapy Drug Interaction Countermeasure.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-perspective-clinical-practice-guideline-synthesis": {
    id: "medical-multi-multi-perspective-clinical-practice-guideline-synthesis",
    name: "MultiPerspectiveClinicalPracticeGuidelineSynthesisSkill",
    displayName: "Multi Perspective Clinical Practice Guideline Synthesis",
    categoryId: "medical",
    description: "Synthesizes AHA, ACC, NCCN, and GOLD clinical guidelines into standardized patient care pathways.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Clinical Practice Guideline Synthesis",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Clinical Practice Guideline Synthesis",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Perspective Clinical Practice Guideline Synthesis.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Perspective Clinical Practice Guideline Synthesis.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-icu-patient-telemetry-anomaly-triaging": {
    id: "medical-multi-multi-parameter-icu-patient-telemetry-anomaly-triaging",
    name: "MultiParameterICUPatientTelemetryAnomalyTriagingSkill",
    displayName: "Multi Parameter ICU Patient Telemetry Anomaly Triaging",
    categoryId: "medical",
    description: "Analyzes invasive arterial line pressure, EKG leads, pulse oximetry, and capnography waveforms.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter ICU Patient Telemetry Anomaly Triaging",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter ICU Patient Telemetry Anomaly Triaging",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter ICU Patient Telemetry Anomaly Triaging.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter ICU Patient Telemetry Anomaly Triaging.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-pediatric-growth-developmental-milestones-screener": {
    id: "medical-multi-multi-stage-pediatric-growth-developmental-milestones-screener",
    name: "MultiStagePediatricGrowthDevelopmentalMilestonesScreenerSkill",
    displayName: "Multi Stage Pediatric Growth Developmental Milestones Screener",
    categoryId: "medical",
    description: "Evaluates infant/child growth percentiles, motor skills, speech development, and autism screeners.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Pediatric Growth Developmental Milestones Screener",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Pediatric Growth Developmental Milestones Screener",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Pediatric Growth Developmental Milestones Screener.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Pediatric Growth Developmental Milestones Screener.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-layer-hospital-infection-control-outbreak-protocol": {
    id: "medical-multi-multi-layer-hospital-infection-control-outbreak-protocol",
    name: "MultiLayerHospitalInfectionControlOutbreakProtocolSkill",
    displayName: "Multi Layer Hospital Infection Control Outbreak Protocol",
    categoryId: "medical",
    description: "Tracks nosocomial infection clusters (MRSA, C. difficile), contact isolation rules, and sterilization.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Hospital Infection Control Outbreak Protocol",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Hospital Infection Control Outbreak Protocol",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Hospital Infection Control Outbreak Protocol.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Hospital Infection Control Outbreak Protocol.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-surgical-pre-operative-anesthesia-risk-assessment": {
    id: "medical-multi-multi-stage-surgical-pre-operative-anesthesia-risk-assessment",
    name: "MultiStageSurgicalPreOperativeAnesthesiaRiskAssessmentSkill",
    displayName: "Multi Stage Surgical Pre Operative Anesthesia Risk Assessment",
    categoryId: "medical",
    description: "Evaluates ASA physical status, Mallampati airway score, cardiac risk index, and blood loss prep.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Surgical Pre Operative Anesthesia Risk Assessment",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Surgical Pre Operative Anesthesia Risk Assessment",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Surgical Pre Operative Anesthesia Risk Assessment.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Surgical Pre Operative Anesthesia Risk Assessment.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-obstetric-fetal-monitoring-distress-assessment": {
    id: "medical-multi-multi-parameter-obstetric-fetal-monitoring-distress-assessment",
    name: "MultiParameterObstetricFetalMonitoringDistressAssessmentSkill",
    displayName: "Multi Parameter Obstetric Fetal Monitoring Distress Assessment",
    categoryId: "medical",
    description: "Parses cardiotocography (CTG) fetal heart rate decelerations, variability, and contraction frequency.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter Obstetric Fetal Monitoring Distress Assessment",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter Obstetric Fetal Monitoring Distress Assessment",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter Obstetric Fetal Monitoring Distress Assessment.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter Obstetric Fetal Monitoring Distress Assessment.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-psychiatric-mental-status-exam-diagnostic": {
    id: "medical-multi-multi-stage-psychiatric-mental-status-exam-diagnostic",
    name: "MultiStagePsychiatricMentalStatusExamDiagnosticSkill",
    displayName: "Multi Stage Psychiatric Mental Status Exam Diagnostic",
    categoryId: "medical",
    description: "Conducts structured Mental Status Examination (MSE) assessing appearance, mood, thought content, and insight.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Psychiatric Mental Status Exam Diagnostic",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Psychiatric Mental Status Exam Diagnostic",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Psychiatric Mental Status Exam Diagnostic.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Psychiatric Mental Status Exam Diagnostic.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-layer-clinical-trial-protocol-adverse-event-reporting": {
    id: "medical-multi-multi-layer-clinical-trial-protocol-adverse-event-reporting",
    name: "MultiLayerClinicalTrialProtocolAdverseEventReportingSkill",
    displayName: "Multi Layer Clinical Trial Protocol Adverse Event Reporting",
    categoryId: "medical",
    description: "Monitors clinical trial patient safety, MedDRA coding, and Serious Adverse Event (SAE) FDA filings.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Clinical Trial Protocol Adverse Event Reporting",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Clinical Trial Protocol Adverse Event Reporting",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Layer Clinical Trial Protocol Adverse Event Reporting.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Layer Clinical Trial Protocol Adverse Event Reporting.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-chronic-kidney-disease-ckd-staging-management": {
    id: "medical-multi-multi-parameter-chronic-kidney-disease-ckd-staging-management",
    name: "MultiParameterChronicKidneyDiseaseCKDStagingManagementSkill",
    displayName: "Multi Parameter Chronic Kidney Disease CKD Staging Management",
    categoryId: "medical",
    description: "Tracks eGFR decline, urine albumin-to-creatinine ratio, electrolytes, and renal replacement timing.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter Chronic Kidney Disease CKD Staging Management",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter Chronic Kidney Disease CKD Staging Management",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter Chronic Kidney Disease CKD Staging Management.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter Chronic Kidney Disease CKD Staging Management.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-system-stroke-acute-ischemic-neuroprotection-protocol": {
    id: "medical-multi-multi-system-stroke-acute-ischemic-neuroprotection-protocol",
    name: "MultiSystemStrokeAcuteIschemicNeuroprotectionProtocolSkill",
    displayName: "Multi System Stroke Acute Ischemic Neuroprotection Protocol",
    categoryId: "medical",
    description: "Guides NIHSS stroke scoring, tPA thrombolytic eligibility windows, and endovascular thrombectomy.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi System Stroke Acute Ischemic Neuroprotection Protocol",
      ruSectionName: "Композитный Multi-Skill: Multi System Stroke Acute Ischemic Neuroprotection Protocol",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi System Stroke Acute Ischemic Neuroprotection Protocol.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi System Stroke Acute Ischemic Neuroprotection Protocol.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-diabetes-mellitus-glycemic-control-optimization": {
    id: "medical-multi-multi-stage-diabetes-mellitus-glycemic-control-optimization",
    name: "MultiStageDiabetesMellitusGlycemicControlOptimizationSkill",
    displayName: "Multi Stage Diabetes Mellitus Glycemic Control Optimization",
    categoryId: "medical",
    description: "Adjusts basal-bolus insulin regimens, SGLT2 inhibitors, GLP-1 agonists based on continuous glucose monitoring.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Diabetes Mellitus Glycemic Control Optimization",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Diabetes Mellitus Glycemic Control Optimization",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Diabetes Mellitus Glycemic Control Optimization.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Diabetes Mellitus Glycemic Control Optimization.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-factor-rheumatology-autoimmune-antibody-workup": {
    id: "medical-multi-multi-factor-rheumatology-autoimmune-antibody-workup",
    name: "MultiFactorRheumatologyAutoimmuneAntibodyWorkupSkill",
    displayName: "Multi Factor Rheumatology Autoimmune Antibody Workup",
    categoryId: "medical",
    description: "Parses ANA, anti-dsDNA, RF, anti-CCP, and complement levels for systemic lupus and rheumatoid arthritis.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Rheumatology Autoimmune Antibody Workup",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Rheumatology Autoimmune Antibody Workup",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Factor Rheumatology Autoimmune Antibody Workup.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Factor Rheumatology Autoimmune Antibody Workup.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-pulmonology-mechanical-ventilation-tuning": {
    id: "medical-multi-multi-parameter-pulmonology-mechanical-ventilation-tuning",
    name: "MultiParameterPulmonologyMechanicalVentilationTuningSkill",
    displayName: "Multi Parameter Pulmonology Mechanical Ventilation Tuning",
    categoryId: "medical",
    description: "Tunes ventilator PEEP, tidal volume (6 mL/kg PBW), FiO2, and peak airway pressure for ARDS.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter Pulmonology Mechanical Ventilation Tuning",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter Pulmonology Mechanical Ventilation Tuning",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter Pulmonology Mechanical Ventilation Tuning.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter Pulmonology Mechanical Ventilation Tuning.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-gastroenterology-ibd-biotic-therapy-escalation": {
    id: "medical-multi-multi-stage-gastroenterology-ibd-biotic-therapy-escalation",
    name: "MultiStageGastroenterologyIBDBioticTherapyEscalationSkill",
    displayName: "Multi Stage Gastroenterology IBD Biotic Therapy Escalation",
    categoryId: "medical",
    description: "Navigates Crohn's and Ulcerative Colitis disease severity, endoscopic scoring, and anti-TNF biologics.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Gastroenterology IBD Biotic Therapy Escalation",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Gastroenterology IBD Biotic Therapy Escalation",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Gastroenterology IBD Biotic Therapy Escalation.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Gastroenterology IBD Biotic Therapy Escalation.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-factor-cardiology-heart-failure-guideline-directed-medical-therapy-gdmt": {
    id: "medical-multi-multi-factor-cardiology-heart-failure-guideline-directed-medical-therapy-gdmt",
    name: "MultiFactorCardiologyHeartFailureGuidelineDirectedMedicalTherapyGDMTSkill",
    displayName: "Multi Factor Cardiology Heart Failure Guideline Directed Medical Therapy GDMT",
    categoryId: "medical",
    description: "Titrates quadruple GDMT therapy (ARNI, beta-blocker, MRA, SGLT2i) for HFrEF patients.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Cardiology Heart Failure Guideline Directed Medical Therapy GDMT",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Cardiology Heart Failure Guideline Directed Medical Therapy GDMT",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Factor Cardiology Heart Failure Guideline Directed Medical Therapy GDMT.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Factor Cardiology Heart Failure Guideline Directed Medical Therapy GDMT.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-dermatology-pigmented-lesion-melanoma-dermoscopy": {
    id: "medical-multi-multi-parameter-dermatology-pigmented-lesion-melanoma-dermoscopy",
    name: "MultiParameterDermatologyPigmentedLesionMelanomaDermoscopySkill",
    displayName: "Multi Parameter Dermatology Pigmented Lesion Melanoma Dermoscopy",
    categoryId: "medical",
    description: "Evaluates skin lesions using ABCDE criteria and dermoscopic structures for biopsy referral.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter Dermatology Pigmented Lesion Melanoma Dermoscopy",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter Dermatology Pigmented Lesion Melanoma Dermoscopy",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter Dermatology Pigmented Lesion Melanoma Dermoscopy.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter Dermatology Pigmented Lesion Melanoma Dermoscopy.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-hematology-acute-leukemia-flow-cytometry-workup": {
    id: "medical-multi-multi-stage-hematology-acute-leukemia-flow-cytometry-workup",
    name: "MultiStageHematologyAcuteLeukemiaFlowCytometryWorkupSkill",
    displayName: "Multi Stage Hematology Acute Leukemia Flow Cytometry Workup",
    categoryId: "medical",
    description: "Parses bone marrow biopsy flow cytometry markers (CD34, CD33, CD19) distinguishing AML vs ALL.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Hematology Acute Leukemia Flow Cytometry Workup",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Hematology Acute Leukemia Flow Cytometry Workup",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Hematology Acute Leukemia Flow Cytometry Workup.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Hematology Acute Leukemia Flow Cytometry Workup.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-system-geriatric-frailty-comprehensive-assessment": {
    id: "medical-multi-multi-system-geriatric-frailty-comprehensive-assessment",
    name: "MultiSystemGeriatricFrailtyComprehensiveAssessmentSkill",
    displayName: "Multi System Geriatric Frailty Comprehensive Assessment",
    categoryId: "medical",
    description: "Evaluates cognitive function (MoCA), polypharmacy, fall risk, activities of daily living (ADLs), and nutrition.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi System Geriatric Frailty Comprehensive Assessment",
      ruSectionName: "Композитный Multi-Skill: Multi System Geriatric Frailty Comprehensive Assessment",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi System Geriatric Frailty Comprehensive Assessment.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi System Geriatric Frailty Comprehensive Assessment.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-infectious-disease-sepsis-bundle-execution": {
    id: "medical-multi-multi-parameter-infectious-disease-sepsis-bundle-execution",
    name: "MultiParameterInfectiousDiseaseSepsisBundleExecutionSkill",
    displayName: "Multi Parameter Infectious Disease Sepsis Bundle Execution",
    categoryId: "medical",
    description: "Executes 1-hour sepsis bundle: serum lactate, blood cultures, broad-spectrum IV antibiotics, and fluid resuscitation.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter Infectious Disease Sepsis Bundle Execution",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter Infectious Disease Sepsis Bundle Execution",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter Infectious Disease Sepsis Bundle Execution.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter Infectious Disease Sepsis Bundle Execution.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-orthopedic-fracture-classification-surgical-planning": {
    id: "medical-multi-multi-stage-orthopedic-fracture-classification-surgical-planning",
    name: "MultiStageOrthopedicFractureClassificationSurgicalPlanningSkill",
    displayName: "Multi Stage Orthopedic Fracture Classification Surgical Planning",
    categoryId: "medical",
    description: "Classifies bone fractures (AO/OTA system), evaluates compartment syndrome risk, and plans fixation.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Orthopedic Fracture Classification Surgical Planning",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Orthopedic Fracture Classification Surgical Planning",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Orthopedic Fracture Classification Surgical Planning.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Orthopedic Fracture Classification Surgical Planning.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-factor-ophthalmology-glaucoma-intraocular-pressure-progression": {
    id: "medical-multi-multi-factor-ophthalmology-glaucoma-intraocular-pressure-progression",
    name: "MultiFactorOphthalmologyGlaucomaIntraocularPressureProgressionSkill",
    displayName: "Multi Factor Ophthalmology Glaucoma Intraocular Pressure Progression",
    categoryId: "medical",
    description: "Monitors visual field defect progression, OCT retinal nerve fiber layer thickness, and IOP drops.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Ophthalmology Glaucoma Intraocular Pressure Progression",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Ophthalmology Glaucoma Intraocular Pressure Progression",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Factor Ophthalmology Glaucoma Intraocular Pressure Progression.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Factor Ophthalmology Glaucoma Intraocular Pressure Progression.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-endocrinology-thyroid-nodule-ultrasound-tirads": {
    id: "medical-multi-multi-parameter-endocrinology-thyroid-nodule-ultrasound-tirads",
    name: "MultiParameterEndocrinologyThyroidNoduleUltrasoundTIRADSSkill",
    displayName: "Multi Parameter Endocrinology Thyroid Nodule Ultrasound TIRADS",
    categoryId: "medical",
    description: "Evaluates thyroid nodule echogenicity and microcalcifications assigning ACR TI-RADS score.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter Endocrinology Thyroid Nodule Ultrasound TIRADS",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter Endocrinology Thyroid Nodule Ultrasound TIRADS",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter Endocrinology Thyroid Nodule Ultrasound TIRADS.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter Endocrinology Thyroid Nodule Ultrasound TIRADS.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-allergy-anaphylaxis-emergency-treatment-protocol": {
    id: "medical-multi-multi-stage-allergy-anaphylaxis-emergency-treatment-protocol",
    name: "MultiStageAllergyAnaphylaxisEmergencyTreatmentProtocolSkill",
    displayName: "Multi Stage Allergy Anaphylaxis Emergency Treatment Protocol",
    categoryId: "medical",
    description: "Guides immediate intramuscular epinephrine, airway stabilization, IV fluids, and antihistamines.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Allergy Anaphylaxis Emergency Treatment Protocol",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Allergy Anaphylaxis Emergency Treatment Protocol",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Allergy Anaphylaxis Emergency Treatment Protocol.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Allergy Anaphylaxis Emergency Treatment Protocol.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-factor-nephrology-metabolic-acidosis-anion-gap-calculator": {
    id: "medical-multi-multi-factor-nephrology-metabolic-acidosis-anion-gap-calculator",
    name: "MultiFactorNephrologyMetabolicAcidosisAnionGapCalculatorSkill",
    displayName: "Multi Factor Nephrology Metabolic Acidosis Anion Gap Calculator",
    categoryId: "medical",
    description: "Calculates serum anion gap, delta ratio, and urine anion gap diagnosing MUDPILES etiologies.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Nephrology Metabolic Acidosis Anion Gap Calculator",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Nephrology Metabolic Acidosis Anion Gap Calculator",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Factor Nephrology Metabolic Acidosis Anion Gap Calculator.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Factor Nephrology Metabolic Acidosis Anion Gap Calculator.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-otolaryngology-sudden-sensorineural-hearing-loss": {
    id: "medical-multi-multi-parameter-otolaryngology-sudden-sensorineural-hearing-loss",
    name: "MultiParameterOtolaryngologySuddenSensorineuralHearingLossSkill",
    displayName: "Multi Parameter Otolaryngology Sudden Sensorineural Hearing Loss",
    categoryId: "medical",
    description: "Evaluates audiogram Weber/Rinne tuning fork tests, MRI internal auditory canal, and oral steroids.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter Otolaryngology Sudden Sensorineural Hearing Loss",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter Otolaryngology Sudden Sensorineural Hearing Loss",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter Otolaryngology Sudden Sensorineural Hearing Loss.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter Otolaryngology Sudden Sensorineural Hearing Loss.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-urology-prostate-cancer-risk-stratification-nccn": {
    id: "medical-multi-multi-stage-urology-prostate-cancer-risk-stratification-nccn",
    name: "MultiStageUrologyProstateCancerRiskStratificationNCCNSkill",
    displayName: "Multi Stage Urology Prostate Cancer Risk Stratification NCCN",
    categoryId: "medical",
    description: "Combines PSA level, Gleason biopsy score, and MRI PIRADS classification guiding treatment.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Urology Prostate Cancer Risk Stratification NCCN",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Urology Prostate Cancer Risk Stratification NCCN",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Urology Prostate Cancer Risk Stratification NCCN.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Urology Prostate Cancer Risk Stratification NCCN.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-toxicology-overdose-toxidrome-antidote-guide": {
    id: "medical-multi-multi-parameter-toxicology-overdose-toxidrome-antidote-guide",
    name: "MultiParameterToxicologyOverdoseToxidromeAntidoteGuideSkill",
    displayName: "Multi Parameter Toxicology Overdose Toxidrome Antidote Guide",
    categoryId: "medical",
    description: "Identifies anticholinergic, opioid, sympathomimetic toxidromes and administers targeted antidotes.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter Toxicology Overdose Toxidrome Antidote Guide",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter Toxicology Overdose Toxidrome Antidote Guide",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter Toxicology Overdose Toxidrome Antidote Guide.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter Toxicology Overdose Toxidrome Antidote Guide.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-system-burn-resuscitation-parkland-formula-fluid-calculator": {
    id: "medical-multi-multi-system-burn-resuscitation-parkland-formula-fluid-calculator",
    name: "MultiSystemBurnResuscitationParklandFormulaFluidCalculatorSkill",
    displayName: "Multi System Burn Resuscitation Parkland Formula Fluid Calculator",
    categoryId: "medical",
    description: "Calculates total body surface area (TBSA) burn percentage and 24-hour Lactated Ringer's fluid resuscitation.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi System Burn Resuscitation Parkland Formula Fluid Calculator",
      ruSectionName: "Композитный Multi-Skill: Multi System Burn Resuscitation Parkland Formula Fluid Calculator",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi System Burn Resuscitation Parkland Formula Fluid Calculator.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi System Burn Resuscitation Parkland Formula Fluid Calculator.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-palliative-care-pain-symptom-opioid-rotation": {
    id: "medical-multi-multi-stage-palliative-care-pain-symptom-opioid-rotation",
    name: "MultiStagePalliativeCarePainSymptomOpioidRotationSkill",
    displayName: "Multi Stage Palliative Care Pain Symptom Opioid Rotation",
    categoryId: "medical",
    description: "Calculates morphine milligram equivalents (MME) and rotates opioid prescriptions safely.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Palliative Care Pain Symptom Opioid Rotation",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Palliative Care Pain Symptom Opioid Rotation",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Palliative Care Pain Symptom Opioid Rotation.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Palliative Care Pain Symptom Opioid Rotation.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-factor-radiology-ct-mri-contrast-safety-pre-workup": {
    id: "medical-multi-multi-factor-radiology-ct-mri-contrast-safety-pre-workup",
    name: "MultiFactorRadiologyCTMRIContrastSafetyPreWorkupSkill",
    displayName: "Multi Factor Radiology CT MRI Contrast Safety Pre Workup",
    categoryId: "medical",
    description: "Evaluates eGFR for contrast-induced nephropathy risk and premedicates contrast allergy history.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Radiology CT MRI Contrast Safety Pre Workup",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Radiology CT MRI Contrast Safety Pre Workup",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Factor Radiology CT MRI Contrast Safety Pre Workup.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Factor Radiology CT MRI Contrast Safety Pre Workup.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-pulmonology-asthma-copd-exacerbation-management": {
    id: "medical-multi-multi-parameter-pulmonology-asthma-copd-exacerbation-management",
    name: "MultiParameterPulmonologyAsthmaCOPDExacerbationManagementSkill",
    displayName: "Multi Parameter Pulmonology Asthma COPD Exacerbation Management",
    categoryId: "medical",
    description: "Evaluates peak expiratory flow, arterial blood gas, nebulized bronchodilators, and systemic steroids.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter Pulmonology Asthma COPD Exacerbation Management",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter Pulmonology Asthma COPD Exacerbation Management",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter Pulmonology Asthma COPD Exacerbation Management.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter Pulmonology Asthma COPD Exacerbation Management.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-neonatal-resuscitation-program-nrp-algorithm": {
    id: "medical-multi-multi-stage-neonatal-resuscitation-program-nrp-algorithm",
    name: "MultiStageNeonatalResuscitationProgramNRPAlgorithmSkill",
    displayName: "Multi Stage Neonatal Resuscitation Program NRP Algorithm",
    categoryId: "medical",
    description: "Guides delivery room infant warming, tactile stimulation, positive pressure ventilation, and APGAR scoring.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Neonatal Resuscitation Program NRP Algorithm",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Neonatal Resuscitation Program NRP Algorithm",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Neonatal Resuscitation Program NRP Algorithm.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Neonatal Resuscitation Program NRP Algorithm.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-factor-vascular-surgery-abdominal-aortic-aneurysm-aaa-repair": {
    id: "medical-multi-multi-factor-vascular-surgery-abdominal-aortic-aneurysm-aaa-repair",
    name: "MultiFactorVascularSurgeryAbdominalAorticAneurysmAAARepairSkill",
    displayName: "Multi Factor Vascular Surgery Abdominal Aortic Aneurysm AAA Repair",
    categoryId: "medical",
    description: "Monitors AAA diameter expansion rate on ultrasound and evaluates EVAR endovascular repair criteria.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Vascular Surgery Abdominal Aortic Aneurysm AAA Repair",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Vascular Surgery Abdominal Aortic Aneurysm AAA Repair",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Factor Vascular Surgery Abdominal Aortic Aneurysm AAA Repair.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Factor Vascular Surgery Abdominal Aortic Aneurysm AAA Repair.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-hepatology-liver-cirrhosis-meld-child-pugh-score": {
    id: "medical-multi-multi-parameter-hepatology-liver-cirrhosis-meld-child-pugh-score",
    name: "MultiParameterHepatologyLiverCirrhosisMELDChildPughScoreSkill",
    displayName: "Multi Parameter Hepatology Liver Cirrhosis MELD Child Pugh Score",
    categoryId: "medical",
    description: "Calculates MELD-Na and Child-Pugh scores assessing mortality risk and liver transplant priority.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter Hepatology Liver Cirrhosis MELD Child Pugh Score",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter Hepatology Liver Cirrhosis MELD Child Pugh Score",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter Hepatology Liver Cirrhosis MELD Child Pugh Score.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter Hepatology Liver Cirrhosis MELD Child Pugh Score.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-neurosurgery-traumatic-brain-injury-tbi-protocol": {
    id: "medical-multi-multi-stage-neurosurgery-traumatic-brain-injury-tbi-protocol",
    name: "MultiStageNeurosurgeryTraumaticBrainInjuryTBIProtocolSkill",
    displayName: "Multi Stage Neurosurgery Traumatic Brain Injury TBI Protocol",
    categoryId: "medical",
    description: "Manages elevated intracranial pressure (ICP) with hypertonic saline, mannitol, and CPP targets.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Neurosurgery Traumatic Brain Injury TBI Protocol",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Neurosurgery Traumatic Brain Injury TBI Protocol",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Neurosurgery Traumatic Brain Injury TBI Protocol.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Neurosurgery Traumatic Brain Injury TBI Protocol.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-factor-cardiovascular-syncope-risk-stratification-san-francisco-rule": {
    id: "medical-multi-multi-factor-cardiovascular-syncope-risk-stratification-san-francisco-rule",
    name: "MultiFactorCardiovascularSyncopeRiskStratificationSanFranciscoRuleSkill",
    displayName: "Multi Factor Cardiovascular Syncope Risk Stratification San Francisco Rule",
    categoryId: "medical",
    description: "Evaluates EKG abnormalities, shortness of breath, hematocrit, and systolic BP predicting adverse outcomes.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Cardiovascular Syncope Risk Stratification San Francisco Rule",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Cardiovascular Syncope Risk Stratification San Francisco Rule",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Factor Cardiovascular Syncope Risk Stratification San Francisco Rule.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Factor Cardiovascular Syncope Risk Stratification San Francisco Rule.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-genetics-hereditary-cancer-screening-panel": {
    id: "medical-multi-multi-parameter-genetics-hereditary-cancer-screening-panel",
    name: "MultiParameterGeneticsHereditaryCancerScreeningPanelSkill",
    displayName: "Multi Parameter Genetics Hereditary Cancer Screening Panel",
    categoryId: "medical",
    description: "Evaluates BRCA1/2, Lynch Syndrome mismatch repair genes, and genetic counseling indications.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter Genetics Hereditary Cancer Screening Panel",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter Genetics Hereditary Cancer Screening Panel",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter Genetics Hereditary Cancer Screening Panel.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter Genetics Hereditary Cancer Screening Panel.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-anesthesiology-malignant-hyperthermia-emergency": {
    id: "medical-multi-multi-stage-anesthesiology-malignant-hyperthermia-emergency",
    name: "MultiStageAnesthesiologyMalignantHyperthermiaEmergencySkill",
    displayName: "Multi Stage Anesthesiology Malignant Hyperthermia Emergency",
    categoryId: "medical",
    description: "Executes immediate volatile agent cessation, hyperventilation, and IV Dantrolene administration.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Anesthesiology Malignant Hyperthermia Emergency",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Anesthesiology Malignant Hyperthermia Emergency",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Anesthesiology Malignant Hyperthermia Emergency.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Anesthesiology Malignant Hyperthermia Emergency.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-factor-physical-medicine-rehabilitation-spinal-cord-injury": {
    id: "medical-multi-multi-factor-physical-medicine-rehabilitation-spinal-cord-injury",
    name: "MultiFactorPhysicalMedicineRehabilitationSpinalCordInjurySkill",
    displayName: "Multi Factor Physical Medicine Rehabilitation Spinal Cord Injury",
    categoryId: "medical",
    description: "Evaluates ASIA impairment scale motor/sensory levels guiding neuro-rehabilitation goals.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Physical Medicine Rehabilitation Spinal Cord Injury",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Physical Medicine Rehabilitation Spinal Cord Injury",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Factor Physical Medicine Rehabilitation Spinal Cord Injury.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Factor Physical Medicine Rehabilitation Spinal Cord Injury.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-clinical-nutrition-parenteral-tpn-electrolyte-calculator": {
    id: "medical-multi-multi-parameter-clinical-nutrition-parenteral-tpn-electrolyte-calculator",
    name: "MultiParameterClinicalNutritionParenteralTPNElectrolyteCalculatorSkill",
    displayName: "Multi Parameter Clinical Nutrition Parenteral TPN Electrolyte Calculator",
    categoryId: "medical",
    description: "Calculates daily calorie requirements, amino acids, dextrose, lipid emulsions, and TPN electrolytes.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter Clinical Nutrition Parenteral TPN Electrolyte Calculator",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter Clinical Nutrition Parenteral TPN Electrolyte Calculator",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter Clinical Nutrition Parenteral TPN Electrolyte Calculator.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter Clinical Nutrition Parenteral TPN Electrolyte Calculator.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-oral-maxillofacial-facial-trauma-mandible-fixation": {
    id: "medical-multi-multi-stage-oral-maxillofacial-facial-trauma-mandible-fixation",
    name: "MultiStageOralMaxillofacialFacialTraumaMandibleFixationSkill",
    displayName: "Multi Stage Oral Maxillofacial Facial Trauma Mandible Fixation",
    categoryId: "medical",
    description: "Classifies Le Fort facial fractures and guides intermaxillary fixation surgical planning.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Oral Maxillofacial Facial Trauma Mandible Fixation",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Oral Maxillofacial Facial Trauma Mandible Fixation",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Oral Maxillofacial Facial Trauma Mandible Fixation.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Oral Maxillofacial Facial Trauma Mandible Fixation.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-factor-reproductive-endocrinology-ivf-ovarian-hyperstimulation": {
    id: "medical-multi-multi-factor-reproductive-endocrinology-ivf-ovarian-hyperstimulation",
    name: "MultiFactorReproductiveEndocrinologyIVFOvarianHyperstimulationSkill",
    displayName: "Multi Factor Reproductive Endocrinology IVF Ovarian Hyperstimulation",
    categoryId: "medical",
    description: "Monitors antral follicle count, estradiol levels, and OHSS prevention protocols.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Reproductive Endocrinology IVF Ovarian Hyperstimulation",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Reproductive Endocrinology IVF Ovarian Hyperstimulation",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Factor Reproductive Endocrinology IVF Ovarian Hyperstimulation.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Factor Reproductive Endocrinology IVF Ovarian Hyperstimulation.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-environmental-hypothermia-core-rewarming-protocol": {
    id: "medical-multi-multi-parameter-environmental-hypothermia-core-rewarming-protocol",
    name: "MultiParameterEnvironmentalHypothermiaCoreRewarmingProtocolSkill",
    displayName: "Multi Parameter Environmental Hypothermia Core Rewarming Protocol",
    categoryId: "medical",
    description: "Guides active internal core rewarming, warm IV fluids, and cardiac arrhythmia monitoring.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter Environmental Hypothermia Core Rewarming Protocol",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter Environmental Hypothermia Core Rewarming Protocol",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter Environmental Hypothermia Core Rewarming Protocol.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter Environmental Hypothermia Core Rewarming Protocol.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-podiatry-diabetic-foot-ulcer-osteomyelitis-workup": {
    id: "medical-multi-multi-stage-podiatry-diabetic-foot-ulcer-osteomyelitis-workup",
    name: "MultiStagePodiatryDiabeticFootUlcerOsteomyelitisWorkupSkill",
    displayName: "Multi Stage Podiatry Diabetic Foot Ulcer Osteomyelitis Workup",
    categoryId: "medical",
    description: "Classifies Wagner diabetic ulcer grade, evaluates probe-to-bone test, and plans debridement.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Podiatry Diabetic Foot Ulcer Osteomyelitis Workup",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Podiatry Diabetic Foot Ulcer Osteomyelitis Workup",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Podiatry Diabetic Foot Ulcer Osteomyelitis Workup.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Podiatry Diabetic Foot Ulcer Osteomyelitis Workup.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-factor-occupational-medicine-needle-stick-bloodborne-exposure": {
    id: "medical-multi-multi-factor-occupational-medicine-needle-stick-bloodborne-exposure",
    name: "MultiFactorOccupationalMedicineNeedleStickBloodborneExposureSkill",
    displayName: "Multi Factor Occupational Medicine Needle Stick Bloodborne Exposure",
    categoryId: "medical",
    description: "Executes HIV post-exposure prophylaxis (PEP) within 72-hour window and Hepatitis B titer checks.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Occupational Medicine Needle Stick Bloodborne Exposure",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Occupational Medicine Needle Stick Bloodborne Exposure",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Factor Occupational Medicine Needle Stick Bloodborne Exposure.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Factor Occupational Medicine Needle Stick Bloodborne Exposure.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-sports-medicine-concussion-return-to-play-protocol": {
    id: "medical-multi-multi-parameter-sports-medicine-concussion-return-to-play-protocol",
    name: "MultiParameterSportsMedicineConcussionReturnToPlayProtocolSkill",
    displayName: "Multi Parameter Sports Medicine Concussion Return To Play Protocol",
    categoryId: "medical",
    description: "Evaluates SCAT5 concussion score and guides 6-stage graduated return-to-play progression.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter Sports Medicine Concussion Return To Play Protocol",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter Sports Medicine Concussion Return To Play Protocol",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter Sports Medicine Concussion Return To Play Protocol.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter Sports Medicine Concussion Return To Play Protocol.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-radiation-oncology-intensity-modulated-radiotherapy-imrt": {
    id: "medical-multi-multi-stage-radiation-oncology-intensity-modulated-radiotherapy-imrt",
    name: "MultiStageRadiationOncologyIntensityModulatedRadiotherapyIMRTSkill",
    displayName: "Multi Stage Radiation Oncology Intensity Modulated Radiotherapy IMRT",
    categoryId: "medical",
    description: "Plans gross tumor volume (GTV), planning target volume (PTV), and organs at risk (OAR) dose constraints.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Radiation Oncology Intensity Modulated Radiotherapy IMRT",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Radiation Oncology Intensity Modulated Radiotherapy IMRT",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Radiation Oncology Intensity Modulated Radiotherapy IMRT.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Radiation Oncology Intensity Modulated Radiotherapy IMRT.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-factor-critical-care-central-line-associated-bloodstream-clabsi-bundle": {
    id: "medical-multi-multi-factor-critical-care-central-line-associated-bloodstream-clabsi-bundle",
    name: "MultiFactorCriticalCareCentralLineAssociatedBloodstreamCLABSIBundleSkill",
    displayName: "Multi Factor Critical Care Central Line Associated Bloodstream CLABSI Bundle",
    categoryId: "medical",
    description: "Enforces sterile barrier precautions, chlorhexidine skin prep, and daily line necessity checks.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Critical Care Central Line Associated Bloodstream CLABSI Bundle",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Critical Care Central Line Associated Bloodstream CLABSI Bundle",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Factor Critical Care Central Line Associated Bloodstream CLABSI Bundle.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Factor Critical Care Central Line Associated Bloodstream CLABSI Bundle.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-bariatric-surgery-post-op-dumping-syndrome-diet": {
    id: "medical-multi-multi-parameter-bariatric-surgery-post-op-dumping-syndrome-diet",
    name: "MultiParameterBariatricSurgeryPostOpDumpingSyndromeDietSkill",
    displayName: "Multi Parameter Bariatric Surgery Post Op Dumping Syndrome Diet",
    categoryId: "medical",
    description: "Guides gastric bypass dietary transition, vitamin supplementation, and dumping syndrome management.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter Bariatric Surgery Post Op Dumping Syndrome Diet",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter Bariatric Surgery Post Op Dumping Syndrome Diet",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter Bariatric Surgery Post Op Dumping Syndrome Diet.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter Bariatric Surgery Post Op Dumping Syndrome Diet.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-cardiovascular-infectuous-endocarditis-duke-criteria": {
    id: "medical-multi-multi-stage-cardiovascular-infectuous-endocarditis-duke-criteria",
    name: "MultiStageCardiovascularInfectuousEndocarditisDukeCriteriaSkill",
    displayName: "Multi Stage Cardiovascular Infectuous Endocarditis Duke Criteria",
    categoryId: "medical",
    description: "Evaluates major blood culture findings and echocardiographic vegetation for Duke diagnosis.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Cardiovascular Infectuous Endocarditis Duke Criteria",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Cardiovascular Infectuous Endocarditis Duke Criteria",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Cardiovascular Infectuous Endocarditis Duke Criteria.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Cardiovascular Infectuous Endocarditis Duke Criteria.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-factor-hematology-deep-vein-thrombosis-dvt-anticoagulation": {
    id: "medical-multi-multi-factor-hematology-deep-vein-thrombosis-dvt-anticoagulation",
    name: "MultiFactorHematologyDeepVeinThrombosisDVTAnticoagulationSkill",
    displayName: "Multi Factor Hematology Deep Vein Thrombosis DVT Anticoagulation",
    categoryId: "medical",
    description: "Calculates Wells DVT score, checks D-dimer, and manages DOAC vs Warfarin bridge therapy.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Hematology Deep Vein Thrombosis DVT Anticoagulation",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Hematology Deep Vein Thrombosis DVT Anticoagulation",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Factor Hematology Deep Vein Thrombosis DVT Anticoagulation.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Factor Hematology Deep Vein Thrombosis DVT Anticoagulation.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-pain-medicine-epidural-steroid-injection-workup": {
    id: "medical-multi-multi-parameter-pain-medicine-epidural-steroid-injection-workup",
    name: "MultiParameterPainMedicineEpiduralSteroidInjectionWorkupSkill",
    displayName: "Multi Parameter Pain Medicine Epidural Steroid Injection Workup",
    categoryId: "medical",
    description: "Evaluates lumbar spine MRI nerve root compression prior to fluoroscopic epidural injection.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter Pain Medicine Epidural Steroid Injection Workup",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter Pain Medicine Epidural Steroid Injection Workup",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter Pain Medicine Epidural Steroid Injection Workup.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter Pain Medicine Epidural Steroid Injection Workup.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-stage-sleep-medicine-obstructive-sleep-apnea-polysomnography": {
    id: "medical-multi-multi-stage-sleep-medicine-obstructive-sleep-apnea-polysomnography",
    name: "MultiStageSleepMedicineObstructiveSleepApneaPolysomnographySkill",
    displayName: "Multi Stage Sleep Medicine Obstructive Sleep Apnea Polysomnography",
    categoryId: "medical",
    description: "Parses Apnea-Hypopnea Index (AHI) and titrates continuous positive airway pressure (CPAP).",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Sleep Medicine Obstructive Sleep Apnea Polysomnography",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Sleep Medicine Obstructive Sleep Apnea Polysomnography",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Stage Sleep Medicine Obstructive Sleep Apnea Polysomnography.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Stage Sleep Medicine Obstructive Sleep Apnea Polysomnography.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-factor-clinical-pathology-blood-transfusion-reaction-protocol": {
    id: "medical-multi-multi-factor-clinical-pathology-blood-transfusion-reaction-protocol",
    name: "MultiFactorClinicalPathologyBloodTransfusionReactionProtocolSkill",
    displayName: "Multi Factor Clinical Pathology Blood Transfusion Reaction Protocol",
    categoryId: "medical",
    description: "Identifies acute hemolytic, TRALI, and TACO transfusion reactions and halts blood infusion.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Clinical Pathology Blood Transfusion Reaction Protocol",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Clinical Pathology Blood Transfusion Reaction Protocol",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Factor Clinical Pathology Blood Transfusion Reaction Protocol.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Factor Clinical Pathology Blood Transfusion Reaction Protocol.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-parameter-transplant-medicine-immunosuppression-trough-monitoring": {
    id: "medical-multi-multi-parameter-transplant-medicine-immunosuppression-trough-monitoring",
    name: "MultiParameterTransplantMedicineImmunosuppressionTroughMonitoringSkill",
    displayName: "Multi Parameter Transplant Medicine Immunosuppression Trough Monitoring",
    categoryId: "medical",
    description: "Monitors Tacrolimus and Cyclosporine trough levels preventing organ rejection and nephrotoxicity.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Parameter Transplant Medicine Immunosuppression Trough Monitoring",
      ruSectionName: "Композитный Multi-Skill: Multi Parameter Transplant Medicine Immunosuppression Trough Monitoring",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Parameter Transplant Medicine Immunosuppression Trough Monitoring.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Parameter Transplant Medicine Immunosuppression Trough Monitoring.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },

  "medical-multi-multi-horizon-master-medical-science-clinical-reasoning-engine": {
    id: "medical-multi-multi-horizon-master-medical-science-clinical-reasoning-engine",
    name: "MultiHorizonMasterMedicalScienceClinicalReasoningEngineSkill",
    displayName: "Multi Horizon Master Medical Science Clinical Reasoning Engine",
    categoryId: "medical",
    description: "Enforces master clinical diagnosis, evidence-based therapy, patient safety, and medical excellence.",
    tags: ["medical","multi-skill","medical-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Master Medical Science Clinical Reasoning Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Master Medical Science Clinical Reasoning Engine",
      instructions: [
        "Phase 1: Setup medical, structural, or logical baseline parameters for Multi Horizon Master Medical Science Clinical Reasoning Engine.",
        "Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.",
        "Phase 3: Synthesize verified structured output with explicit quality checks."
],
      ruInstructions: [
        "Этап 1: Настройка медицинских, структурных или логических параметров для Multi Horizon Master Medical Science Clinical Reasoning Engine.",
        "Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.",
        "Этап 3: Синтез верифицированного структурированного результата с контролем качества."
],
      semanticType: "process_directive",
      tags: ["medical","multi-skill","medical-multi"],
    }),
  },
};
