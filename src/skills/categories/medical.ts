import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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
};
