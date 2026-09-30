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
};
