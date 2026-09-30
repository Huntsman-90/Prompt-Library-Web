const newMedicalSkills = [
  {
    id: 'sbar-clinical-handover-protocol',
    name: 'SbarClinicalHandoverProtocolSkill',
    displayName: 'SBAR Clinical Communication (Situation, Background, Assessment, Recommendation)',
    categoryId: 'medical',
    description: 'Structures urgent inter-clinician and nurse-to-physician communication to eliminate misinterpretations during shift handoffs.',
    tags: ['medical', 'sbar', 'clinical-handover', 'patient-safety', 'communication'],
    sectionName: 'SBAR Clinical Handover Protocol',
    ruSectionName: 'Клинический протокол передачи смены SBAR',
    semanticType: 'process_directive',
    instructions: [
      'Situation: Identify patient, immediate problem, vital signs, and current concern.',
      'Background: Summarize admitting diagnosis, surgical dates, medications, and relevant clinical history.',
      'Assessment & Recommendation: State clinical assessment and specify clear required interventions with timeline.'
    ],
    ruInstructions: [
      'Situation: Назовите пациента, острую проблему, текущие витальные показатели.',
      'Background: Опишите диагноз при поступлении, операции, текущие препараты и анамнез.',
      'Assessment / Recommendation: Изложите клиническую оценку и запросите конкретные назначения.'
    ]
  },
  {
    id: 'evidence-based-grade-recommendation',
    name: 'EvidenceBasedGradeRecommendationSkill',
    displayName: 'GRADE Evidence Quality & Recommendation Strength',
    categoryId: 'medical',
    description: 'Evaluates medical literature and clinical trial rigor across High, Moderate, Low, and Very Low certainty of evidence.',
    tags: ['medical', 'grade-framework', 'evidence-based-medicine', 'systematic-review', 'guidelines'],
    sectionName: 'GRADE Evidence Synthesis Protocol',
    ruSectionName: 'Оценка качества доказательств по системе GRADE',
    semanticType: 'analysis_protocol',
    instructions: [
      'Rate baseline study designs (RCTs vs observational cohorts).',
      'Downgrade for risk of bias, inconsistency, indirectness, imprecision, and publication bias.',
      'Issue definitive Strong or Conditional recommendations balancing benefits vs burdens.'
    ],
    ruInstructions: [
      'Оцените базовый дизайн исследований (рандомизированные КИ vs когортные наблюдения).',
      'Снижайте уровень доказательности при риске систематической ошибки, неоднородности и неточности.',
      'Сформулируйте сильную или условную рекомендацию с учетом соотношения пользы и рисков.'
    ]
  },
  {
    id: 'sepsis-qsofa-early-warning-score',
    name: 'SepsisQsofaEarlyWarningScoreSkill',
    displayName: 'qSOFA & NEWS2 Sepsis Early Warning Scoring',
    categoryId: 'medical',
    description: 'Calculates bedside quick SOFA and National Early Warning Scores to detect septic shock and clinical deterioration early.',
    tags: ['medical', 'sepsis', 'qsofa', 'news2', 'critical-care'],
    sectionName: 'qSOFA / Sepsis Early Warning Protocol',
    ruSectionName: 'Протокол раннего выявления сепсиса (qSOFA / NEWS2)',
    semanticType: 'analysis_protocol',
    instructions: [
      'Evaluate 3 qSOFA criteria: Respiratory rate >= 22/min, Altered mentation (GCS < 15), Systolic BP <= 100 mmHg.',
      'Flag qSOFA score >= 2 for immediate lactate testing, blood cultures, and IV fluid resuscitation.',
      'Track NEWS2 aggregate trajectory for ICU escalation triggers.'
    ],
    ruInstructions: [
      'Оцените 3 критерия qSOFA: ЧДД >= 22/мин, нарушение сознания (GCS < 15), САД <= 100 мм рт. ст.',
      'При балле >= 2 немедленно инициируйте забор лактата, гемокультуры и инфузионную терапию.',
      'Контролируйте шкалу NEWS2 для своевременного перевода в ОРИТ.'
    ]
  },
  {
    id: 'drug-interaction-cytochrome-p450-audit',
    name: 'DrugInteractionCytochromeP450AuditSkill',
    displayName: 'Pharmacokinetic CYP450 Drug Interaction Screen',
    categoryId: 'medical',
    description: 'Audits polypharmacy regimens for competitive CYP3A4, CYP2D6, and CYP2C19 substrate, inducer, and inhibitor collisions.',
    tags: ['medical', 'pharmacology', 'cyp450', 'drug-interactions', 'polypharmacy'],
    sectionName: 'CYP450 Pharmacokinetic Interaction Screen',
    ruSectionName: 'Фармакокинетический скрининг взаимодействий ферментов цитохрома P450',
    semanticType: 'analysis_protocol',
    instructions: [
      'Map each medication to its primary metabolic enzymes and transporter proteins (e.g. P-gp).',
      'Identify potent inducers (lowering efficacy) and inhibitors (triggering toxicity).',
      'Recommend dose adjustments, therapeutic drug monitoring, or safer alternative agents.'
    ],
    ruInstructions: [
      'Сопоставьте каждый препарат с путями метаболизма цитохрома P450 и транспортерами.',
      'Выявите сильные ингибиторы (риск токсичности) и индукторы (снижение эффективности).',
      'Предложите коррекцию дозировок, терапевтический мониторинг или безопасную замену.'
    ]
  },
  {
    id: 'pediatric-weight-based-dosing-calculator',
    name: 'PediatricWeightBasedDosingCalculatorSkill',
    displayName: 'Pediatric mg/kg Weight-Based Dosing & Safety Caps',
    categoryId: 'medical',
    description: 'Calculates pediatric drug dosages strictly by weight/body surface area while enforcing absolute adult maximum dose safety ceilings.',
    tags: ['medical', 'pediatrics', 'dosing', 'safety-caps', 'pharmacology'],
    sectionName: 'Pediatric Dosing & Safety Verification',
    ruSectionName: 'Педиатрический расчет дозировок по массе тела с контролем максимумов',
    semanticType: 'process_directive',
    instructions: [
      'Verify patient age, exact weight in kg, and renal/hepatic clearance considerations.',
      'Calculate dose: mg/kg/dose or mg/kg/day divided into standard administration intervals.',
      'Enforce strict rule: pediatric calculated dose MUST NEVER exceed the recommended adult single/daily maximum.'
    ],
    ruInstructions: [
      'Уточните точный возраст, вес ребенка в кг и функцию почек/печени.',
      'Рассчитайте дозировку: мг/кг на прием или в сутки с распределением по интервалам.',
      'Примените жесткое правило: детская доза ни при каких условиях не должна превышать взрослый максимум.'
    ]
  },
  {
    id: 'radiology-birads-tirads-reporting-standard',
    name: 'RadiologyBiradsTiradsReportingStandardSkill',
    displayName: 'Structured Radiology Lexicon (BI-RADS & TI-RADS)',
    categoryId: 'medical',
    description: 'Structures mammography and thyroid ultrasound reports using standard ACR lexicons and risk category classifications (1 through 6).',
    tags: ['medical', 'radiology', 'birads', 'tirads', 'imaging-reports'],
    sectionName: 'Radiology Classification Protocol',
    ruSectionName: 'Стандартизированный радиологический протокол (BI-RADS / TI-RADS)',
    semanticType: 'process_directive',
    instructions: [
      'Describe lesion morphology, margins, composition, and echogenicity using standardized ACR terms.',
      'Assign definitive Category (0: Incomplete, 1: Negative, 2: Benign, 3: Probably Benign, 4: Suspicious, 5: Highly Suggestive of Malignancy).',
      'Specify clear follow-up action (routine screening, 6-month interval US, or FNA biopsy).'
    ],
    ruInstructions: [
      'Опишите морфологию, контуры, структуру и эхогенность узла по терминологии ACR.',
      'Присвойте категорию BI-RADS / TI-RADS (от 1 до 5/6).',
      'Сформулируйте четкую тактику (рутинный скрининг, контроль через 6 мес. или ТАБ-биопсия).'
    ]
  },
  {
    id: 'ecg-12-lead-systematic-interpretation',
    name: 'Ecg12LeadSystematicInterpretationSkill',
    displayName: '12-Lead ECG Systematic Interpretation Protocol',
    categoryId: 'medical',
    description: 'Executes a rigorous step-by-step ECG analysis: Rate, Rhythm, Axis, Intervals (PR, QRS, QTc), Hypertrophy, Ischemia/Infarction (ST-T waves).',
    tags: ['medical', 'cardiology', 'ecg', '12-lead', 'arrhythmia'],
    sectionName: '12-Lead ECG Interpretation Protocol',
    ruSectionName: 'Систематический протокол расшифровки 12-канальной ЭКГ',
    semanticType: 'analysis_protocol',
    instructions: [
      'Calculate Heart Rate and evaluate Rhythm regularity (sinus vs nodal/ectopic).',
      'Determine QRS electrical axis and measure intervals (PR < 200ms, QRS < 120ms, QTc < 450/460ms).',
      'Check for STEMI regional distributions (Anterior V1-V4, Inferior II/III/aVF, Lateral I/aVL/V5-V6) and reciprocal depressions.'
    ],
    ruInstructions: [
      'Рассчитайте ЧСС и определите регулярность ритма (синусовый / эктопический).',
      'Определите электрическую ось сердца и измерьте интервалы (PR, QRS, корригированный QT).',
      'Проверьте регионарные подъемы сегмента ST (передняя, нижняя, боковая стенки) и реципрокные изменения.'
    ]
  },
  {
    id: 'diabetic-ketoacidosis-dka-management-flow',
    name: 'DiabeticKetoacidosisDkaManagementFlowSkill',
    displayName: 'Diabetic Ketoacidosis (DKA) Fluid & Insulin Protocol',
    categoryId: 'medical',
    description: 'Manages critical DKA resuscitation: isotonic fluid resuscitation, potassium replacement prior to insulin, and anion gap closure monitoring.',
    tags: ['medical', 'endocrinology', 'dka', 'emergency', 'intensive-care'],
    sectionName: 'DKA Resuscitation & Management Protocol',
    ruSectionName: 'Клинический протокол ведения диабетического кетоацидоза (ДКА)',
    semanticType: 'process_directive',
    instructions: [
      'Calculate Serum Anion Gap = Na - (Cl + HCO3) and effective serum osmolality.',
      'Rule: Never start IV insulin if serum potassium K+ is < 3.3 mEq/L; replenish potassium first.',
      'Transition from 0.9% Normal Saline to D5W + 0.45% NS once blood glucose drops below 200-250 mg/dL.'
    ],
    ruInstructions: [
      'Рассчитайте анионный интервал: Na - (Cl + HCO3) и эффективную осмолярность плазмы.',
      'Правило: Не вводите инсулин, если уровень калия < 3.3 ммоль/л; сначала восполните калий.',
      'Перейдите на глюкозосодержащие растворы (D5W), как только гликемия опустится ниже 11-13 ммоль/л.'
    ]
  },
  {
    id: 'curb-65-pneumonia-severity-triage',
    name: 'Curb65PneumoniaSeverityTriageSkill',
    displayName: 'CURB-65 Community-Acquired Pneumonia Triage',
    categoryId: 'medical',
    description: 'Scores pneumonia severity to direct patients to Outpatient, Inpatient Ward, or ICU care settings.',
    tags: ['medical', 'pulmonology', 'curb65', 'pneumonia', 'triage'],
    sectionName: 'CURB-65 Pneumonia Triage Protocol',
    ruSectionName: 'Оценка тяжести внебольничной пневмонии по шкале CURB-65',
    semanticType: 'analysis_protocol',
    instructions: [
      'Score 1 point each for: Confusion, Urea > 7 mmol/L, Respiratory rate >= 30/min, Blood pressure (SBP < 90 or DBP <= 60), Age >= 65.',
      'Score 0-1: Low risk, outpatient treatment appropriate.',
      'Score 2: Moderate risk, short-stay inpatient admission; Score 3-5: High risk, immediate inpatient or ICU admission.'
    ],
    ruInstructions: [
      'Начислите по 1 баллу за: спутанность сознания, мочевину > 7 ммоль/л, ЧДД >= 30, АД < 90/60, возраст >= 65.',
      '0-1 балл: амбулаторное лечение.',
      '2 балла: стационар; 3-5 баллов: тяжелое течение, госпитализация в стационар или ОРИТ.'
    ]
  },
  {
    id: 'antimicrobial-stewardship-empiric-deescalation',
    name: 'AntimicrobialStewardshipEmpiricDeescalationSkill',
    displayName: 'Antimicrobial Stewardship & Empiric-to-Targeted De-escalation',
    categoryId: 'medical',
    description: 'Guides narrow-spectrum antimicrobial de-escalation based on culture sensitivities, reducing resistance and C. diff risks.',
    tags: ['medical', 'infectious-disease', 'antimicrobial-stewardship', 'antibiotics', 'deescalation'],
    sectionName: 'Antimicrobial De-escalation Protocol',
    ruSectionName: 'Протокол рациональной антибиотикотерапии и деэскалации',
    semanticType: 'process_directive',
    instructions: [
      'Review Gram stain, local antibiogram patterns, and initial empiric coverage.',
      'Re-evaluate at 48-72 hours with definitive microbiology culture and MIC sensitivities.',
      'De-escalate from broad-spectrum (e.g. Vancomycin + Cefepime) to targeted narrow-spectrum monotherapy.'
    ],
    ruInstructions: [
      'Оцените окраску по Граму, локальный антибиотикорезистентный профиль и стартовую терапию.',
      'Проведите ревизию через 48-72 часа после получения результатов бакпосева и МПК.',
      'Сузьте спектр терапии с препаратов широкого спектра до таргетного монопрепарата.'
    ]
  },
  {
    id: 'stroke-nihss-tpa-thrombectomy-window',
    name: 'StrokeNihssTpaThrombectomyWindowSkill',
    displayName: 'Acute Ischemic Stroke NIHSS & Thrombolysis Window',
    categoryId: 'medical',
    description: 'Assesses acute stroke deficit severity (NIHSS) and validates IV thrombolysis (<4.5 hr) vs endovascular thrombectomy (<24 hr) windows.',
    tags: ['medical', 'neurology', 'stroke', 'nihss', 'tpa', 'thrombectomy'],
    sectionName: 'Acute Stroke Thrombolysis Triage',
    ruSectionName: 'Протокол триажа острого инсульта (шкала NIHSS и окна тромболизиса)',
    semanticType: 'process_directive',
    instructions: [
      'Calculate NIHSS total score (Level of Consciousness, Visual fields, Facial palsy, Motor arm/leg, Sensory, Ataxia, Language, Dysarthria, Extinction).',
      'Verify Last Known Normal (LKN) time against IV alteplase/tenecteplase 4.5-hour window and contraindications.',
      'Screen CTA/CTP for Large Vessel Occlusion (LVO) candidate for endovascular thrombectomy (EVT).'
    ],
    ruInstructions: [
      'Рассчитайте балл по шкале NIHSS (сознание, поля зрения, парезы конечностей, речь, чувствительность).',
      'Проверьте время "последнего здорового состояния" относительно терапевтического окна 4.5 часа для тромболизиса.',
      'Оцените КТ-ангиографию на предмет окклюзии крупной церебральной артерии для тромбэктомии.'
    ]
  },
  {
    id: 'mental-status-mmse-moca-cognitive-screen',
    name: 'MentalStatusMmseMocaCognitiveScreenSkill',
    displayName: 'Cognitive Impairment Screening (MoCA & MMSE)',
    categoryId: 'medical',
    description: 'Conducts standardized screening for Mild Cognitive Impairment (MCI) and dementia sub-domains.',
    tags: ['medical', 'geriatrics', 'neurology', 'moca', 'mmse', 'dementia'],
    sectionName: 'MoCA / MMSE Cognitive Screening Protocol',
    ruSectionName: 'Протокол скрининга когнитивных нарушений (MoCA / MMSE)',
    semanticType: 'analysis_protocol',
    instructions: [
      'Score Visuospatial/Executive, Naming, Memory, Attention, Language, Abstraction, Delayed Recall, and Orientation.',
      'Apply educational adjustment (+1 point if <= 12 years of formal education).',
      'Interpret threshold: MoCA < 26/30 suggests possible MCI or dementia warranting comprehensive neuropsychological workup.'
    ],
    ruInstructions: [
      'Оцените блоки: зрительно-пространственные функции, память, внимание, речь, абстракцию и ориентацию.',
      'Сделайте поправку на уровень образования (+1 балл при стаже учебы <= 12 лет).',
      'Интерпретируйте результат: MoCA < 26 указывает на возможные когнитивные нарушения.'
    ]
  },
  {
    id: 'burn-rule-of-nines-parkland-formula',
    name: 'BurnRuleOfNinesParklandFormulaSkill',
    displayName: 'Burn Resuscitation (Rule of Nines & Parkland Formula)',
    categoryId: 'medical',
    description: 'Calculates Total Body Surface Area (TBSA) burned and calculates 24-hour Lactated Ringer’s fluid resuscitation volumes.',
    tags: ['medical', 'burns', 'trauma', 'parkland-formula', 'resuscitation'],
    sectionName: 'Burn TBSA & Parkland Resuscitation Protocol',
    ruSectionName: 'Оценка площади ожогов (правило девяток) и формула Паркланда',
    semanticType: 'process_directive',
    instructions: [
      'Calculate % TBSA burned using Wallace Rule of Nines (Head 9%, Arms 9% each, Anterior Trunk 18%, Posterior Trunk 18%, Legs 18% each, Perineum 1%).',
      'Apply Parkland Formula: 4 mL * Weight (kg) * % TBSA (2nd and 3rd degree burns only).',
      'Administer 50% of total volume over the first 8 hours (from time of burn) and remaining 50% over the next 16 hours.'
    ],
    ruInstructions: [
      'Рассчитайте % поражения по "правилу девяток" Уоллеса (голова 9%, руки по 9%, туловище спереди 18%, сзади 18%, ноги по 18%).',
      'Примените формулу Паркланда: 4 мл * Масса (кг) * % TBSA (только II и III степень).',
      'Введите первые 50% объема за первые 8 часов с момента травмы, остальные 50% — за следующие 16 часов.'
    ]
  },
  {
    id: 'gcs-glasgow-coma-scale-neurological-triage',
    name: 'GcsGlasgowComaScaleNeurologicalTriageSkill',
    displayName: 'Glasgow Coma Scale (GCS) Assessment',
    categoryId: 'medical',
    description: 'Scores patient conscious state across Eye (1-4), Verbal (1-5), and Motor (1-6) responses.',
    tags: ['medical', 'neurology', 'gcs', 'trauma', 'coma-scale'],
    sectionName: 'Glasgow Coma Scale (GCS) Scoring Protocol',
    ruSectionName: 'Протокол оценки глубины комы по шкале Глазго (GCS)',
    semanticType: 'analysis_protocol',
    instructions: [
      'Eye Opening (E 1-4): Spontaneous (4), To Sound (3), To Pressure (2), None (1).',
      'Verbal Response (V 1-5): Oriented (5), Confused (4), Inappropriate words (3), Incomprehensible sounds (2), None (1).',
      'Motor Response (M 1-6): Obeys commands (6), Localizing (5), Normal flexion/withdrawal (4), Abnormal flexion (3), Extension (2), None (1). GCS <= 8 mandates airway protection (intubation).'
    ],
    ruInstructions: [
      'Открывание глаз (E 1-4): Спонтанное (4), На голос (3), На боль (2), Отсутствует (1).',
      'Речевая реакция (V 1-5): Ориентирован (5), Спутанная речь (4), Неадекватные слова (3), Нечленораздельные звуки (2), Нет (1).',
      'Двигательная реакция (M 1-6): Выполняет команды (6), Локализует боль (5), Отдергивание (4), Сгибание (3), Разгибание (2), Нет (1). Балл <= 8 требует интубации.'
    ]
  },
  {
    id: 'pre-op-surgical-clearance-cardiac-risk-rcri',
    name: 'PreOpSurgicalClearanceCardiacRiskRcriSkill',
    displayName: 'Preoperative Cardiac Risk Stratification (Lee RCRI)',
    categoryId: 'medical',
    description: 'Assesses Revised Cardiac Risk Index (RCRI) score to quantify perioperative major adverse cardiac events (MACE) risk.',
    tags: ['medical', 'anesthesiology', 'cardiac-risk', 'rcri', 'pre-op-clearance'],
    sectionName: 'Preoperative RCRI Cardiac Risk Stratification',
    ruSectionName: 'Предоперационная стратификация кардиального риска (индекс Ли RCRI)',
    semanticType: 'analysis_protocol',
    instructions: [
      'Audit 6 independent predictors: High-risk surgery, Ischemic heart disease history, Heart failure history, Cerebrovascular disease, Diabetes on insulin, Pre-op creatinine > 2.0 mg/dL.',
      'Calculate MACE event risk tier (0 points: 0.4%, 1 point: 1.0%, 2 points: 2.4%, >=3 points: 5.4%+).',
      'Determine necessity for pre-op stress echocardiography or cardiology consultation.'
    ],
    ruInstructions: [
      'Проверьте 6 факторов: операция высокого риска, ИБС в анамнезе, СН, ОНМК, инсулинопотребный диабет, креатинин > 177 мкмоль/л.',
      'Рассчитайте риск осложнений (0 факторов — 0.4%, >=3 факторов — свыше 5.4%).',
      'Определите показания для дополнительного стресс-ЭхоКГ или консультации кардиолога.'
    ]
  },
  {
    id: 'fluid-electrolyte-hyperkalemia-stabilization',
    name: 'FluidElectrolyteHyperkalemiaStabilizationSkill',
    displayName: 'Severe Hyperkalemia Acute Membrane Stabilization',
    categoryId: 'medical',
    description: 'Executes emergency management of severe hyperkalemia (K+ > 6.5 mEq/L or ECG peaked T-waves): Calcium gluconate, Insulin + D50, Beta-agonists, and Dialysis.',
    tags: ['medical', 'nephrology', 'hyperkalemia', 'electrolytes', 'emergency-resuscitation'],
    sectionName: 'Emergency Hyperkalemia Stabilization Protocol',
    ruSectionName: 'Протокол экстренной помощи при тяжелой гиперкалиемии',
    semanticType: 'process_directive',
    instructions: [
      'Step 1 (Membrane Stabilization): IV Calcium Gluconate (or Calcium Chloride) to prevent ventricular arrhythmias.',
      'Step 2 (Intracellular Shift): 10 units Regular Insulin IV + 50 mL 50% Dextrose (D50) and inhaled Albuterol.',
      'Step 3 (Elimination): Loop diuretics (Furosemide), Sodium zirconium cyclosilicate (Lokelma), or emergent Hemodialysis.'
    ],
    ruInstructions: [
      'Шаг 1 (Стабилизация мембран): В/в глюконат кальция для предотвращения фибрилляции желудочков.',
      'Шаг 2 (Смещение в клетку): 10 ЕД инсулина короткого действия + 50 мл 50% глюкозы и ингаляции сальбутамола.',
      'Шаг 3 (Выведение из организма): Петлевые диуретики, калий-байндеры или экстренный гемодиализ.'
    ]
  },
  {
    id: 'anaphylaxis-epinephrine-resuscitation-protocol',
    name: 'AnaphylaxisEpinephrineResuscitationProtocolSkill',
    displayName: 'Acute Anaphylaxis Intramuscular Epinephrine Protocol',
    categoryId: 'medical',
    description: 'Enforces immediate first-line Intramuscular (IM) Epinephrine administration for acute anaphylaxis with hemodynamic monitoring.',
    tags: ['medical', 'allergology', 'anaphylaxis', 'epinephrine', 'emergency'],
    sectionName: 'Acute Anaphylaxis Emergency Protocol',
    ruSectionName: 'Протокол экстренной помощи при анафилаксии (внутримышечный адреналин)',
    semanticType: 'process_directive',
    instructions: [
      'First-Line Mandate: Administer Epinephrine 1:1,000 (1 mg/mL) 0.3-0.5 mg IM into the anterolateral mid-thigh immediately.',
      'Position patient supine with legs elevated (unless airway compromised); administer high-flow oxygen and IV crystalloids.',
      'Repeat IM Epinephrine every 5-15 minutes if symptoms persist; secondary agents (antihistamines, corticosteroids) MUST NEVER delay epinephrine.'
    ],
    ruInstructions: [
      'Первая линия: Немедленно введите адреналин 1:1000 0.3-0.5 мг в/м в переднелатеральную поверхность бедра.',
      'Положите пациента на спину с приподнятыми ногами; обеспечьте кислород и инфузию физраствора.',
      'Повторяйте инъекцию каждые 5-15 минут при необходимости; антигистаминные препараты не должны задерживать адреналин.'
    ]
  },
  {
    id: 'chronic-kidney-disease-kdigo-staging',
    name: 'ChronicKidneyDiseaseKdigoStagingSkill',
    displayName: 'KDIGO CKD Staging & Heatmap Progression Matrix',
    categoryId: 'medical',
    description: 'Stages Chronic Kidney Disease across eGFR (G1-G5) and Albuminuria (A1-A3) grids to guide nephrology referral and SGLT2i/RAASi dosing.',
    tags: ['medical', 'nephrology', 'ckd', 'kdigo', 'egfr', 'albuminuria'],
    sectionName: 'KDIGO CKD Staging Protocol',
    ruSectionName: 'Стадирование хронической болезни почек по матрице KDIGO',
    semanticType: 'analysis_protocol',
    instructions: [
      'Classify eGFR: G1 (>90), G2 (60-89), G3a (45-59), G3b (30-44), G4 (15-29), G5 (<15 mL/min/1.73m2).',
      'Classify Albumin-to-Creatinine Ratio (ACR): A1 (<30), A2 (30-300), A3 (>300 mg/g).',
      'Recommend guideline-directed medical therapy (SGLT2 inhibitors, ACEi/ARB, Non-steroidal MRAs) based on progression risk.'
    ],
    ruInstructions: [
      'Определите категорию СКФ: G1 (>90), G2 (60-89), G3a (45-59), G3b (30-44), G4 (15-29), G5 (<15 мл/мин).',
      'Оцените альбуминурию: A1 (<30), A2 (30-300), A3 (>300 мг/г).',
      'Назначьте органопротективную терапию (ингибиторы SGLT2, иАПФ/БРА) с учетом риска прогрессирования ХБП.'
    ]
  },
  {
    id: 'post-op-pain-multimodal-analgesia-ladder',
    name: 'PostOpPainMultimodalAnalgesiaLadderSkill',
    displayName: 'WHO Analgesic Ladder & Multimodal Post-Op Pain',
    categoryId: 'medical',
    description: 'Constructs opioid-sparing multimodal analgesia combining Acetaminophen, NSAIDs, Gabapentinoids, Local blocks, and rescue PCA opioids.',
    tags: ['medical', 'anesthesiology', 'pain-management', 'analgesia', 'opioid-sparing'],
    sectionName: 'Multimodal Pain Management Protocol',
    ruSectionName: 'Ступенчатая мультимодальная анальгезия и протоколы ERAS',
    semanticType: 'strategy_framework',
    instructions: [
      'Layer scheduled non-opioid baseline analgesics (Acetaminophen + NSAID/COX-2 inhibitor unless contraindicated).',
      'Incorporate regional nerve blocks or continuous wound infiltration.',
      'Reserve short-acting opioids strictly for breakthrough pain with sedation and respiratory rate monitoring.'
    ],
    ruInstructions: [
      'Назначьте базисную неопиоидную терапию (парацетамол + НПВП/коксибы по часам).',
      'Используйте регионарные блокады нервов и инфильтрационную анестезию.',
      'Опиоиды оставьте только для купирования прорывной боли с мониторингом частоты дыхания.'
    ]
  },
  {
    id: 'palliative-care-espc-symptom-control',
    name: 'PalliativeCareEspcSymptomControlSkill',
    displayName: 'Palliative Symptom Control & Goal-of-Care Alignment',
    categoryId: 'medical',
    description: 'Provides compassionate management of intractable dyspnea, nausea, pain crises, and terminal secretions aligned with patient advance directives.',
    tags: ['medical', 'palliative', 'hospice', 'symptom-control', 'end-of-life'],
    sectionName: 'Palliative Care Symptom Management',
    ruSectionName: 'Паллиативный контроль симптомов и согласование целей помощи',
    semanticType: 'process_directive',
    instructions: [
      'Align treatment goals directly with patient Advance Directives and surrogate decision makers.',
      'Manage refractory dyspnea with low-dose opioids (morphine) and fan therapy.',
      'Treat terminal respiratory secretions (death rattle) with antimuscarinics (Glycopyrrolate/Hyoscine).'
    ],
    ruInstructions: [
      'Согласуйте объем помощи с предварительными распоряжениями пациента и его доверенными лицами.',
      'Купируйте тягостную одышку микродозами морфина и направленным потоком воздуха.',
      'Примените холинолитики (гликопирролат) для устранения предсмертного клокочущего дыхания.'
    ]
  }
];

module.exports = { newMedicalSkills };
