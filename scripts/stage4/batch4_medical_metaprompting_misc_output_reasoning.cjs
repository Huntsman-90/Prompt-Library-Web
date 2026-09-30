const { appendSkills } = require('../appendSkills.cjs');

function makeSkill(catFileName, categoryId, prefix, item) {
  const title = item.title;
  const cleanId = `${prefix}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
  const pascalName = title.replace(/[^a-zA-Z0-9]/g, '') + 'Skill';

  return {
    id: cleanId,
    name: pascalName,
    displayName: item.displayName || title,
    categoryId: categoryId,
    description: item.desc || `Applies composite ${title} Multi-Skill architecture.`,
    tags: [categoryId, 'multi-skill', prefix, ...(item.tags || [])],
    sectionName: item.sec || `Multi-Skill: ${title}`,
    ruSectionName: item.ruSec || `Композитный Multi-Skill: ${title}`,
    instructions: item.inst || [
      `Phase 1: Setup medical, structural, or logical baseline parameters for ${title}.`,
      `Phase 2: Multi-perspective analysis, reasoning pipeline, or multi-format execution.`,
      `Phase 3: Synthesize verified structured output with explicit quality checks.`
    ],
    ruInstructions: item.ruInst || [
      `Этап 1: Настройка медицинских, структурных или логических параметров для ${title}.`,
      `Этап 2: Многоаспектный анализ, конвейер рассуждений или многоформатное исполнение.`,
      `Этап 3: Синтез верифицированного структурированного результата с контролем качества.`
    ],
    semanticType: item.sem || 'process_directive'
  };
}

function processCategory(catFileName, categoryId, prefix, items) {
  const skills = items.map(item => makeSkill(catFileName, categoryId, prefix, item));
  return appendSkills(catFileName, skills);
}

// Topup Creative to 225 (+8 skills)
const CREATIVE_TOPUP = [
  { title: "Multi Layer Cyberpunk Neon Underworld Detective Narrative", desc: "Crafts gritty cyberpunk noir detective stories with implants, megacorps, and rain-soaked alleyways." },
  { title: "Multi Stage Fantasy Epic Siege Battle Strategy", desc: "Paces massive castle siege battles with trebuchets, magic defense barriers, and heroic duels." },
  { title: "Multi Perspective Time Travel Multiverse Timeline Repair", desc: "Navigates complex multiverse timeline paradoxes and temporal paradox agents." },
  { title: "Multi Character Cozy Mystery Village Bakery Whodunit", desc: "Engineers charming cozy mystery plots in small seaside villages with eccentric suspects." },
  { title: "Multi Layer Solar Punk Organic Architecture Worldbuilding", desc: "Designs hopeful solar-powered eco-cities integrated with living botanical structures." },
  { title: "Multi Stage Gothic Vampire Aristocracy Political Intrigue", desc: "Drafts political intrigue stories between immortal aristocratic vampire coven houses." },
  { title: "Multi Character Space Western Freight Hauler Crew", desc: "Structures ragtag space freighter crew dynamics completing dangerous smuggling jobs." },
  { title: "Multi Horizon Master Narrative Prose Stylist Engine", desc: "Enforces master literary prose, poetic cadence, and unforgettable story craft." }
];

// --------------------------------------------------------------------------
// 16. MEDICAL - 60 SKILLS
// --------------------------------------------------------------------------
const MEDICAL_ITEMS = [
  { title: "Multi Specialist Multidisciplinary Tumor Board Consultation", desc: "Synthesizes medical oncology, surgical oncology, radiation oncology, pathology, and radiology." },
  { title: "Multi System Differential Diagnosis Clinical Reasoning", desc: "Evaluates patient symptoms across cardiovascular, respiratory, neurological, and endocrine systems." },
  { title: "Multi Stage Critical Care Emergency Resuscitation Protocol", desc: "Guides ACLS/ATLS resuscitation steps for cardiac arrest, severe sepsis, and massive trauma." },
  { title: "Multi Layer Pharmacotherapy Drug Interaction Countermeasure", desc: "Audits polypharmacy regimens identifying cytochrome P450 interactions, QT prolongation, and dosage adjustments." },
  { title: "Multi Perspective Clinical Practice Guideline Synthesis", desc: "Synthesizes AHA, ACC, NCCN, and GOLD clinical guidelines into standardized patient care pathways." },
  { title: "Multi Parameter ICU Patient Telemetry Anomaly Triaging", desc: "Analyzes invasive arterial line pressure, EKG leads, pulse oximetry, and capnography waveforms." },
  { title: "Multi Stage Pediatric Growth Developmental Milestones Screener", desc: "Evaluates infant/child growth percentiles, motor skills, speech development, and autism screeners." },
  { title: "Multi Layer Hospital Infection Control Outbreak Protocol", desc: "Tracks nosocomial infection clusters (MRSA, C. difficile), contact isolation rules, and sterilization." },
  { title: "Multi Stage Surgical Pre Operative Anesthesia Risk Assessment", desc: "Evaluates ASA physical status, Mallampati airway score, cardiac risk index, and blood loss prep." },
  { title: "Multi Parameter Obstetric Fetal Monitoring Distress Assessment", desc: "Parses cardiotocography (CTG) fetal heart rate decelerations, variability, and contraction frequency." },

  { title: "Multi Stage Psychiatric Mental Status Exam Diagnostic", desc: "Conducts structured Mental Status Examination (MSE) assessing appearance, mood, thought content, and insight." },
  { title: "Multi Layer Clinical Trial Protocol Adverse Event Reporting", desc: "Monitors clinical trial patient safety, MedDRA coding, and Serious Adverse Event (SAE) FDA filings." },
  { title: "Multi Parameter Chronic Kidney Disease CKD Staging Management", desc: "Tracks eGFR decline, urine albumin-to-creatinine ratio, electrolytes, and renal replacement timing." },
  { title: "Multi System Stroke Acute Ischemic Neuroprotection Protocol", desc: "Guides NIHSS stroke scoring, tPA thrombolytic eligibility windows, and endovascular thrombectomy." },
  { title: "Multi Stage Diabetes Mellitus Glycemic Control Optimization", desc: "Adjusts basal-bolus insulin regimens, SGLT2 inhibitors, GLP-1 agonists based on continuous glucose monitoring." },
  { title: "Multi Factor Rheumatology Autoimmune Antibody Workup", desc: "Parses ANA, anti-dsDNA, RF, anti-CCP, and complement levels for systemic lupus and rheumatoid arthritis." },
  { title: "Multi Parameter Pulmonology Mechanical Ventilation Tuning", desc: "Tunes ventilator PEEP, tidal volume (6 mL/kg PBW), FiO2, and peak airway pressure for ARDS." },
  { title: "Multi Stage Gastroenterology IBD Biotic Therapy Escalation", desc: "Navigates Crohn's and Ulcerative Colitis disease severity, endoscopic scoring, and anti-TNF biologics." },
  { title: "Multi Factor Cardiology Heart Failure Guideline Directed Medical Therapy GDMT", desc: "Titrates quadruple GDMT therapy (ARNI, beta-blocker, MRA, SGLT2i) for HFrEF patients." },
  { title: "Multi Parameter Dermatology Pigmented Lesion Melanoma Dermoscopy", desc: "Evaluates skin lesions using ABCDE criteria and dermoscopic structures for biopsy referral." },

  { title: "Multi Stage Hematology Acute Leukemia Flow Cytometry Workup", desc: "Parses bone marrow biopsy flow cytometry markers (CD34, CD33, CD19) distinguishing AML vs ALL." },
  { title: "Multi System Geriatric Frailty Comprehensive Assessment", desc: "Evaluates cognitive function (MoCA), polypharmacy, fall risk, activities of daily living (ADLs), and nutrition." },
  { title: "Multi Parameter Infectious Disease Sepsis Bundle Execution", desc: "Executes 1-hour sepsis bundle: serum lactate, blood cultures, broad-spectrum IV antibiotics, and fluid resuscitation." },
  { title: "Multi Stage Orthopedic Fracture Classification Surgical Planning", desc: "Classifies bone fractures (AO/OTA system), evaluates compartment syndrome risk, and plans fixation." },
  { title: "Multi Factor Ophthalmology Glaucoma Intraocular Pressure Progression", desc: "Monitors visual field defect progression, OCT retinal nerve fiber layer thickness, and IOP drops." },
  { title: "Multi Parameter Endocrinology Thyroid Nodule Ultrasound TIRADS", desc: "Evaluates thyroid nodule echogenicity and microcalcifications assigning ACR TI-RADS score." },
  { title: "Multi Stage Allergy Anaphylaxis Emergency Treatment Protocol", desc: "Guides immediate intramuscular epinephrine, airway stabilization, IV fluids, and antihistamines." },
  { title: "Multi Factor Nephrology Metabolic Acidosis Anion Gap Calculator", desc: "Calculates serum anion gap, delta ratio, and urine anion gap diagnosing MUDPILES etiologies." },
  { title: "Multi Parameter Otolaryngology Sudden Sensorineural Hearing Loss", desc: "Evaluates audiogram Weber/Rinne tuning fork tests, MRI internal auditory canal, and oral steroids." },
  { title: "Multi Stage Urology Prostate Cancer Risk Stratification NCCN", desc: "Combines PSA level, Gleason biopsy score, and MRI PIRADS classification guiding treatment." },

  { title: "Multi Parameter Toxicology Overdose Toxidrome Antidote Guide", desc: "Identifies anticholinergic, opioid, sympathomimetic toxidromes and administers targeted antidotes." },
  { title: "Multi System Burn Resuscitation Parkland Formula Fluid Calculator", desc: "Calculates total body surface area (TBSA) burn percentage and 24-hour Lactated Ringer's fluid resuscitation." },
  { title: "Multi Stage Palliative Care Pain Symptom Opioid Rotation", desc: "Calculates morphine milligram equivalents (MME) and rotates opioid prescriptions safely." },
  { title: "Multi Factor Radiology CT MRI Contrast Safety Pre Workup", desc: "Evaluates eGFR for contrast-induced nephropathy risk and premedicates contrast allergy history." },
  { title: "Multi Parameter Pulmonology Asthma COPD Exacerbation Management", desc: "Evaluates peak expiratory flow, arterial blood gas, nebulized bronchodilators, and systemic steroids." },
  { title: "Multi Stage Neonatal Resuscitation Program NRP Algorithm", desc: "Guides delivery room infant warming, tactile stimulation, positive pressure ventilation, and APGAR scoring." },
  { title: "Multi Factor Vascular Surgery Abdominal Aortic Aneurysm AAA Repair", desc: "Monitors AAA diameter expansion rate on ultrasound and evaluates EVAR endovascular repair criteria." },
  { title: "Multi Parameter Hepatology Liver Cirrhosis MELD Child Pugh Score", desc: "Calculates MELD-Na and Child-Pugh scores assessing mortality risk and liver transplant priority." },
  { title: "Multi Stage Neurosurgery Traumatic Brain Injury TBI Protocol", desc: "Manages elevated intracranial pressure (ICP) with hypertonic saline, mannitol, and CPP targets." },
  { title: "Multi Factor Cardiovascular Syncope Risk Stratification San Francisco Rule", desc: "Evaluates EKG abnormalities, shortness of breath, hematocrit, and systolic BP predicting adverse outcomes." },

  { title: "Multi Parameter Genetics Hereditary Cancer Screening Panel", desc: "Evaluates BRCA1/2, Lynch Syndrome mismatch repair genes, and genetic counseling indications." },
  { title: "Multi Stage Anesthesiology Malignant Hyperthermia Emergency", desc: "Executes immediate volatile agent cessation, hyperventilation, and IV Dantrolene administration." },
  { title: "Multi Factor Physical Medicine Rehabilitation Spinal Cord Injury", desc: "Evaluates ASIA impairment scale motor/sensory levels guiding neuro-rehabilitation goals." },
  { title: "Multi Parameter Clinical Nutrition Parenteral TPN Electrolyte Calculator", desc: "Calculates daily calorie requirements, amino acids, dextrose, lipid emulsions, and TPN electrolytes." },
  { title: "Multi Stage Oral Maxillofacial Facial Trauma Mandible Fixation", desc: "Classifies Le Fort facial fractures and guides intermaxillary fixation surgical planning." },
  { title: "Multi Factor Reproductive Endocrinology IVF Ovarian Hyperstimulation", desc: "Monitors antral follicle count, estradiol levels, and OHSS prevention protocols." },
  { title: "Multi Parameter Environmental Hypothermia Core Rewarming Protocol", desc: "Guides active internal core rewarming, warm IV fluids, and cardiac arrhythmia monitoring." },
  { title: "Multi Stage Podiatry Diabetic Foot Ulcer Osteomyelitis Workup", desc: "Classifies Wagner diabetic ulcer grade, evaluates probe-to-bone test, and plans debridement." },
  { title: "Multi Factor Occupational Medicine Needle Stick Bloodborne Exposure", desc: "Executes HIV post-exposure prophylaxis (PEP) within 72-hour window and Hepatitis B titer checks." },
  { title: "Multi Parameter Sports Medicine Concussion Return To Play Protocol", desc: "Evaluates SCAT5 concussion score and guides 6-stage graduated return-to-play progression." },

  { title: "Multi Stage Radiation Oncology Intensity Modulated Radiotherapy IMRT", desc: "Plans gross tumor volume (GTV), planning target volume (PTV), and organs at risk (OAR) dose constraints." },
  { title: "Multi Factor Critical Care Central Line Associated Bloodstream CLABSI Bundle", desc: "Enforces sterile barrier precautions, chlorhexidine skin prep, and daily line necessity checks." },
  { title: "Multi Parameter Bariatric Surgery Post Op Dumping Syndrome Diet", desc: "Guides gastric bypass dietary transition, vitamin supplementation, and dumping syndrome management." },
  { title: "Multi Stage Cardiovascular Infectuous Endocarditis Duke Criteria", desc: "Evaluates major blood culture findings and echocardiographic vegetation for Duke diagnosis." },
  { title: "Multi Factor Hematology Deep Vein Thrombosis DVT Anticoagulation", desc: "Calculates Wells DVT score, checks D-dimer, and manages DOAC vs Warfarin bridge therapy." },
  { title: "Multi Parameter Pain Medicine Epidural Steroid Injection Workup", desc: "Evaluates lumbar spine MRI nerve root compression prior to fluoroscopic epidural injection." },
  { title: "Multi Stage Sleep Medicine Obstructive Sleep Apnea Polysomnography", desc: "Parses Apnea-Hypopnea Index (AHI) and titrates continuous positive airway pressure (CPAP)." },
  { title: "Multi Factor Clinical Pathology Blood Transfusion Reaction Protocol", desc: "Identifies acute hemolytic, TRALI, and TACO transfusion reactions and halts blood infusion." },
  { title: "Multi Parameter Transplant Medicine Immunosuppression Trough Monitoring", desc: "Monitors Tacrolimus and Cyclosporine trough levels preventing organ rejection and nephrotoxicity." },
  { title: "Multi Horizon Master Medical Science Clinical Reasoning Engine", desc: "Enforces master clinical diagnosis, evidence-based therapy, patient safety, and medical excellence." }
];

// --------------------------------------------------------------------------
// 17. METAPROMPTING - 60 SKILLS
// --------------------------------------------------------------------------
const METAPROMPTING_ITEMS = [
  { title: "Multi Layer Self Refinement Metaprompting Architecture", desc: "Generates candidate system prompts, evaluates output quality against rubrics, and iteratively rewrites prompts." },
  { title: "Multi Agent Metaprompt Optimization Generator", desc: "Employs an Optimizer Agent that analyzes failures in user prompts and generates calibrated system prompts." },
  { title: "Multi Stage Prompt Decomposition Synthesis Pipeline", desc: "Deconstructs complex user briefs into modular sub-prompts, executing each and synthesizing final result." },
  { title: "Multi Perspective Few Shot Example Selection Engine", desc: "Selects optimal dynamic few-shot prompt examples based on semantic similarity to current user input." },
  { title: "Multi Constraint System Prompt Boundary Calculator", desc: "Automatically calculates necessary negative constraints and boundary rules for a given domain." },
  { title: "Multi Target Model Specific Metaprompt Translator", desc: "Translates system prompts between GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and Llama 3 architectures." },
  { title: "Multi Level Variable Injection Prompt Template Compiler", desc: "Compiles raw prompt templates with variable validation, type-checking, and escaping rules." },
  { title: "Multi Layer Anti Hallucination Metaprompt Injector", desc: "Injects strict citation rules, confidence self-assessment steps, and unknown fallbacks into any prompt." },
  { title: "Multi Format Output Schema Metaprompt Enforcer", desc: "Embeds strict JSON Schema validation and markdown output structure rules into prompt templates." },
  { title: "Multi Perspective Persona System Metaprompt Architect", desc: "Generates hyper-detailed expert persona descriptions with behavioral guidelines, tone, and domain jargon." },

  { title: "Multi Stage Chain of Thought CoT Metaprompt Transformer", desc: "Transforms standard prompts into step-by-step explicitly reasoned CoT execution pipelines." },
  { title: "Multi Level Context Compression Summary Metaprompt", desc: "Compresses massive conversation histories into condensed context blocks optimized for LLM attention." },
  { title: "Multi Category Safety Guardrail Metaprompt Wrapper", desc: "Wraps raw user prompts in safety validation layers checking for toxicity, PII, and jailbreaks." },
  { title: "Multi Layer Socratic Questioning Metaprompt Generator", desc: "Transforms informational prompts into engaging Socratic guiding dialogue prompts." },
  { title: "Multi Stage Prompt A B Testing Evaluator Metaprompt", desc: "Runs parallel evaluation of two prompt variants against test suites, outputting win-rate metrics." },
  { title: "Multi Perspective Stakeholder Debate Metaprompt Generator", desc: "Generates multi-persona debate prompts setting up realistic conflicting expert perspectives." },
  { title: "Multi Level Domain Jargon Glossarizer Metaprompt", desc: "Appends specialized domain glossaries and terminology definitions to complex system prompts." },
  { title: "Multi Stage Error Correction Feedback Metaprompt", desc: "Captures model execution error logs and formats self-correction re-prompts for instant debugging." },
  { title: "Multi Format Structural Markdown Metaprompt Builder", desc: "Structures prompts forcing outputs into executive summary memos, tables, and bulleted action items." },
  { title: "Multi Horizon Long Context Document Metaprompting", desc: "Structures system prompts optimized for 1M+ token context windows avoiding middle-loss retrieval errors." },

  { title: "Multi Stage Tree of Thoughts ToT Metaprompt Generator", desc: "Structures prompts that explore multiple reasoning branches, scoring each path before committing." },
  { title: "Multi Layer Role Play Scenario Metaprompt Creator", desc: "Creates immersive interactive roleplay scenario prompts with branching choice triggers." },
  { title: "Multi Perspective Oxford Style Debate Metaprompt", desc: "Generates structured debate prompts for Proposition, Opposition, and Moderator personas." },
  { title: "Multi Level Tone Voice Adaptation Metaprompt", desc: "Generates system prompt modifiers adjusting output voice dynamically (e.g. empathetic, clinical, humorous)." },
  { title: "Multi Stage Code Generation Test Driven Metaprompt", desc: "Structures prompts forcing the model to write unit tests first before writing implementation code." },
  { title: "Multi Layer RAG Grounded Retrieval Metaprompt", desc: "Embeds strict 'Answer ONLY based on retrieved context blocks' instructions into system prompts." },
  { title: "Multi Perspective Board of Directors Metaprompt", desc: "Generates prompts simulating a board meeting with CEO, CFO, CTO, and Legal Counsel personas." },
  { title: "Multi Stage Problem Deconstruction Task Decomposition Metaprompt", desc: "Forces model to break complex goals into numbered sub-tasks with estimated completion steps." },
  { title: "Multi Level Readability Grade Level Metaprompt", desc: "Adjusts system prompts to enforce specific Flesch-Kincaid reading grade levels in generated text." },
  { title: "Multi Format Code Translation Syntax Metaprompt", desc: "Structures system prompts for converting code from one programming language to another cleanly." },

  { title: "Multi Layer Prompt Injection Adversarial Stress Tester", desc: "Generates adversarial attack prompts to test the robustness of candidate system guardrails." },
  { title: "Multi Stage Recursive Summarization Metaprompt", desc: "Structures prompts that summarize text iteratively chunk-by-chunk into unified meta-summaries." },
  { title: "Multi Perspective Red Team Blue Team Metaprompt", desc: "Creates cybersecurity simulation prompts pairing offensive hacker and defensive SecOps personas." },
  { title: "Multi Level Multi-Turn Conversation Memory Metaprompt", desc: "Structures context update prompts that maintain slot-filling state across long chat sessions." },
  { title: "Multi Stage Synthetic Data Generation Metaprompt", desc: "Generates high-quality synthetic training dataset prompts with controlled diversity and distributions." },
  { title: "Multi Layer Zero-Shot Reasoning Calibration Metaprompt", desc: "Injects 'Let's think step by step and double-check all assumptions' directives into prompts." },
  { title: "Multi Perspective Medical Tumor Board Metaprompt", desc: "Creates multi-specialty clinical case discussion prompts for oncology, radiology, and pathology." },
  { title: "Multi Stage E-Commerce Conversion Copywriting Metaprompt", desc: "Generates product description prompts applying AIDA (Attention, Interest, Desire, Action) frameworks." },
  { title: "Multi Level Negative Constraint List Metaprompt Builder", desc: "Generates exhaustive lists of forbidden buzzwords, clichés, and formatting artifacts." },
  { title: "Multi Format Diagramming Mermaid PlantUML Metaprompt", desc: "Forces models to generate valid Mermaid.js or PlantUML code blocks for visual architecture diagrams." },

  { title: "Multi Layer AI Agent Tool Calling Schema Metaprompt", desc: "Formats JSON function signatures and tool choice constraints inside system prompts." },
  { title: "Multi Stage Academic Peer Reviewer Metaprompt", desc: "Creates peer reviewer prompts evaluating methodology, novelty, statistical power, and clarity." },
  { title: "Multi Perspective Socratic Mentorship Metaprompt", desc: "Generates tutoring system prompts that ask guiding questions rather than revealing direct answers." },
  { title: "Multi Level Multilingual Translation Quality Metaprompt", desc: "Structures translation prompts preserving cultural nuances, idioms, and industry terminology." },
  { title: "Multi Stage Customer Support De-Escalation Metaprompt", desc: "Generates support bot prompts trained in empathetic listening and policy conflict resolution." },
  { title: "Multi Layer Legal Contract Audit Risk Metaprompt", desc: "Creates contract screening prompts highlighting indemnities, liability caps, and termination risks." },
  { title: "Multi Perspective Game Dungeon Master Metaprompt", desc: "Generates TTRPG Dungeon Master prompts managing world rules, NPC voices, and player choices." },
  { title: "Multi Stage Pitch Deck Storyboard Metaprompt", desc: "Creates startup pitch deck generation prompts following investor-approved 10-slide structures." },
  { title: "Multi Level Creative Writing Worldbuilding Metaprompt", desc: "Structures fiction prompt generators establishing magic rules, geography, and history." },
  { title: "Multi Format API Specification OpenAPI Metaprompt", desc: "Forces models to output valid OpenAPI 3.0 YAML or JSON specs with request/response schemas." },

  { title: "Multi Layer Reflection Self Critique Metaprompt", desc: "Structures prompts where the model generates output, critiques it, and returns the revised version." },
  { title: "Multi Stage Job Description ATS Keyword Metaprompt", desc: "Generates resume optimization prompts tailored to target job descriptions and ATS filters." },
  { title: "Multi Perspective Tripartite Negotiation Metaprompt", desc: "Creates 3-party negotiation simulation prompts setting distinct reservation prices and BATNAs." },
  { title: "Multi Level Executive Memo Summary Metaprompt", desc: "Structures executive briefing prompts outputting key takeaways, financial impact, and decisions." },
  { title: "Multi Stage Scientific Hypothesis Formulation Metaprompt", desc: "Creates research prompts formulating testable hypotheses, variables, and experiment controls." },
  { title: "Multi Layer Prompt Version Control Metadata Compiler", desc: "Injects author, version tag, creation timestamp, and evaluation hash metadata into prompts." },
  { title: "Multi Perspective Financial Earnings Call Parser Metaprompt", desc: "Creates financial analysis prompts extracting revenue guidance, margin trends, and risk factors." },
  { title: "Multi Stage Interactive Quiz Question Generator Metaprompt", desc: "Structures prompts that generate multiple-choice quiz items with distractor rationale explanations." },
  { title: "Multi Level Accessibility Alt Text Description Metaprompt", desc: "Generates accessibility prompts forcing detailed, screen-reader friendly image descriptions." },
  { title: "Multi Horizon Master Metaprompting Architecture Engine", desc: "Enforces master metaprompt compilation, prompt optimization, self-reflection, and LLM orchestration." }
];

// --------------------------------------------------------------------------
// 18. MISCELLANEOUS - 60 SKILLS
// --------------------------------------------------------------------------
const MISC_ITEMS = [
  { title: "Multi Layer Precision Horology Mechanical Watch Restoration", desc: "Restores mechanical watch movements, cleaning balance springs, oiling jewels, and regulating timing." },
  { title: "Multi Stage Custom Stained Glass Crafting Lead Came", desc: "Builds lead came stained glass windows with pattern cutting, soldering, and cementing." },
  { title: "Multi Layer Bespoke Footwear Goodyear Welt Leather Shoemaking", desc: "Constructs welted leather shoes with cork footbed fillers, hand lasting, and outsole stitching." },
  { title: "Multi Stage Artisan Craft Micro Distilling Mash Fermentation", desc: "Monitors grain mashing, sour mash fermentation, hydrometer proofing, and sensory spirit cuts." },
  { title: "Multi Layer Traditional Lime Plaster Heritage Restoration", desc: "Applies three-coat breathable lime plaster over wood lath on heritage building restorations." },
  { title: "Multi Stage Fine Antique Furniture French Polish Shellac", desc: "Builds high-gloss mirror finishes on antique timber using shellac and friction rubber pads." },
  { title: "Multi Layer Urban Aquaponics Nitrogen Cycle Balancing", desc: "Balances nitrifying bacteria, fish stocking density, and plant nutrient uptake in closed loops." },
  { title: "Multi Stage Traditional Bowyer Wooden Longbow Tillering", desc: "Tillers wooden self-bow staves to even limb curvature and precise draw weight." },
  { title: "Multi Layer Hot Glassblowing Furnace Gathering Pipe Shaping", desc: "Gathers molten glass at 2100°F, marvering, blowing, and shaping vessel forms." },
  { title: "Multi Stage Leathercraft Saddle Stitching Edge Burnishing", desc: "Hand stitches heavy leather goods using two needles, beeswaxed thread, and edge gum burnishing." },

  { title: "Multi Layer Bonsai Tree Branch Wiring Pruning Maintenance", desc: "Wires branch structures, prunes root balls, and manages soil drainage for specimen bonsai trees." },
  { title: "Multi Stage Kintsugi Japanese Gold Lacquer Ceramic Repair", desc: "Repairs broken ceramics using natural urushi lacquer and powdered 24k gold seams." },
  { title: "Multi Layer Wilderness Bushcraft Fire Making Tinder Selection", desc: "Prepares bow drill friction fire kits, char cloth tinder, and Dakota fire pit shelters." },
  { title: "Multi Stage Traditional Archery Form Instinctive Shooting", desc: "Teaches stance, anchor point consistency, back tension release, and instinctive aiming." },
  { title: "Multi Layer Amateur Ham Radio Antenna SWR Tuning", desc: "Tunes dipole/Yagi ham radio antennas, measures standing wave ratio (SWR), and operates HF bands." },
  { title: "Multi Stage Artisan Coffee Roasting Profile Cupping", desc: "Monitors charge temp, crack timings, airflow, and conducts sensory cupping evaluations." },
  { title: "Multi Layer Beekeeping Hive Inspection Honey Extraction", desc: "Inspects brood patterns, manages Varroa mites, supering hives, and uncapping honey frames." },
  { title: "Multi Stage Blacksmithing Hand Forging Anvil Technique", desc: "Forges steel tool bits, heat treats carbon steel, and performs hammer draws on the anvil." },
  { title: "Multi Layer Organic Permaculture Swale Garden Design", desc: "Designs contour swales, nitrogen-fixing guilds, and food forest layers for water harvesting." },
  { title: "Multi Stage Fine Bookbinding Leather Spine Coptic Stitching", desc: "Binds hardbound books using hand-sewn signatures, leather covers, and marbled endpapers." },

  { title: "Multi Layer Mushroom Cultivation Spore Syringe Inoculation", desc: "Sterilizes grain substrates, inoculates spore syringes, and manages fruiting humidity chambers." },
  { title: "Multi Stage Artisan Cheesemaking Rennet Curd Aging", desc: "Coagulates milk with rennet, cuts curds, presses wheels, and ages artisan cheeses in caves." },
  { title: "Multi Layer Stone Masonry Dry Stack Wall Construction", desc: "Builds load-bearing dry stack stone retaining walls without mortar using batter frames." },
  { title: "Multi Stage Sailboat Navigation Rigging Seamanship", desc: "Trims mainsails, calculates dead reckoning GPS coordinates, and ties marlinspike knots." },
  { title: "Multi Layer Taxidermy Specimen Preservation Mounting", desc: "Preserves animal hides, casts anatomical foam forms, and sets glass eyes for mounts." },
  { title: "Multi Stage Traditional Sourdough Bread Fermentation Baking", desc: "Maintains wild yeast sourdough starter, manages autolyse, stretch-and-fold, and Dutch oven baking." },
  { title: "Multi Layer Vintage Automobile Carburetor Rebuild Tuning", desc: "Disassembles, ultrasonic cleans, jet calibrates, and synchronizes multi-barrel carburetors." },
  { title: "Multi Stage Loom Hand Weaving Pattern Draft Creation", desc: "Sets up floor loom warp threads, drafts weaving patterns, and operates foot treadles." },
  { title: "Multi Layer Urban Beekeeping Swarm Trapping Management", desc: "Traps wild honeybee swarms, relocates hives safely, and prevents urban colony swarming." },
  { title: "Multi Stage Fine Woodworking Hand Dovetail Joint Cutting", desc: "Marks, saws, and chisels tight hand-cut dovetail joints for hardwood furniture drawers." },

  { title: "Multi Layer Bicycle Wheel Building Spoke Tensioning", desc: "Laces bicycle wheel rims, tensions spokes using tensiometer, and trues lateral/radial wobble." },
  { title: "Multi Stage Natural Plant Dyeing Mordant Fabric Extraction", desc: "Extracts natural dyes from madder root/indigo, prepares alum mordants, and dyes natural fibers." },
  { title: "Multi Layer Falconry Raptor Training Mew Management", desc: "Manages raptor weight, jess equipment, lure training, and field hunting protocols." },
  { title: "Multi Stage Ceramic Pottery Wheel Throwing Glazing", desc: "Centers clay on pottery wheel, pulls cylinder walls, trims foot rings, and applies cone 6 glazes." },
  { title: "Multi Layer Fly Fishing Stream Entomology Fly Tying", desc: "Ties realistic Mayfly/Caddis artificial flies matching seasonal stream insect hatches." },
  { title: "Multi Stage Home Charcuterie Salumi Curing Chamber", desc: "Cures salami, prosciutto, and pancetta with salt, culture, and temperature/humidity control." },
  { title: "Multi Layer Custom Audio Vacuum Tube Amplifier Wiring", desc: "Point-to-point hand wires audiophile vacuum tube amplifiers with high-voltage transformers." },
  { title: "Multi Stage Stained Glass Copper Foil Tiffany Method", desc: "Wraps cut glass pieces in copper foil, solders seams, and applies patina finishes." },
  { title: "Multi Layer Herbalism Tincture Extraction Formulation", desc: "Macerates medicinal herbs in alcohol menstruum, strains tinctures, and formulates blends." },
  { title: "Multi Stage Leather Shoe Resoling Stitching Repair", desc: "Removes worn outsoles, replaces cork footbeds, and hand stitches new leather soles." },

  { title: "Multi Layer Soapmaking Cold Process Lye Oils Saponification", desc: "Calculates lye calculator ratios, mixes plant oils, cures soap bars, and swirls natural clays." },
  { title: "Multi Stage Timber Frame Joinery Mortise Tenon Pegging", desc: "Lays out heavy timber frame bents, chisels mortise-and-tenon joints, and drives wooden pegs." },
  { title: "Multi Layer Pipe Organ Reed Tuning Voicing Maintenance", desc: "Tunes pipe organ ranks, adjusts reed tongue curvatures, and regulates wind chest pressures." },
  { title: "Multi Stage Hydroponic Nutrient Solution pH Balancing", desc: "Formulates NPK hydroponic fertilizer solutions, measures EC/PPM, and adjusts pH." },
  { title: "Multi Layer Lapidary Gemstone Cabochon Cutting Polishing", desc: "Saws raw mineral slabs, grinds gemstone cabochons on diamond wheels, and polishes." },
  { title: "Multi Stage Acoustic Guitar Luthier Voicing Bracing", desc: "Carves spruce soundboard bracing, voices acoustic guitar tops, and sets neck angles." },
  { title: "Multi Layer Metal Metalworking Lathe Turning Milling", desc: "Operates manual metal lathe and milling machine to precision thousandths of an inch." },
  { title: "Multi Stage Pyrotechnics Fireworks Aerial Shell Composition", desc: "Formulates pyrotechnic star compositions, rolls aerial firework display shells, and fuses." },
  { title: "Multi Layer Taxidermy Fish Mounting Airbrush Painting", desc: "Casts fiberglass fish molds, sets fins, and airbrushes realistic iridescent scale colors." },
  { title: "Multi Stage Paper Making Hand Mold Deckle Recycling", desc: "Pulps cotton rags, pulls handmade paper sheets using molds and deckles, and presses." },

  { title: "Multi Layer Model Steam Engine Miniature Boiler Machining", desc: "Machines brass cylinders, silver solders miniature copper steam boilers, and tests pressure." },
  { title: "Multi Stage Candle Making Soy Wax Essential Oil Scenting", desc: "Calculates fragrance load percentages, sets cotton wicks, and pours soy wax candles." },
  { title: "Multi Layer Traditional Stone Carving Relief Sculpting", desc: "Carves limestone or marble reliefs using pneumatic chisels, rasps, and rifflers." },
  { title: "Multi Stage Perfumery Essential Oil Note Pyramid Blending", desc: "Blends top, middle, and base essential oil fragrance notes into harmonious perfumes." },
  { title: "Multi Layer Vintage Sewing Machine Mechanical Overhaul", desc: "Cleans, times shuttle hooks, replaces motor belts, and tunes tension on vintage Singer machines." },
  { title: "Multi Stage Taxidermy Antler Velvet Preservation Mounting", desc: "Preserves velvet deer antlers, freeze-dries tissues, and mounts skull caps." },
  { title: "Multi Layer Stained Glass Fusing Kiln Slumping Glass", desc: "Programs glass kiln firing schedules for fusing, tacking, and slumping glass bowls." },
  { title: "Multi Stage Traditional Basketry Willow Cane Weaving", desc: "Soaks willow rods, weaves basket bases, side stakes, borders, and handles." },
  { title: "Multi Layer Metal Etching Acid Resist Design Transfer", desc: "Transfers designs to copper/brass plates, etches in ferric chloride, and polishes." },
  { title: "Multi Horizon Master Everyday Craft Artisan Mastery Engine", desc: "Enforces master physical craftsmanship, hand-tool precision, heritage restoration, and artisan skill." }
];

// --------------------------------------------------------------------------
// 19. OUTPUT STRUCTURING - 60 SKILLS
// --------------------------------------------------------------------------
const OUTPUT_ITEMS = [
  { title: "Multi Format Schema Enforcement JSON Markdown XML", desc: "Forces exact output formatting adhering to JSON Schema, Markdown tables, or XML tags." },
  { title: "Multi Level Executive Briefing Document Formatting", desc: "Renders outputs as TL;DR summary, Key Metrics table, Strategic Recommendations, and Next Steps." },
  { title: "Multi Column Comparison Matrix Generator", desc: "Structures complex multi-option comparisons into clear, aligned Markdown comparison tables." },
  { title: "Multi Layer Code Snippet Annotation Formatter", desc: "Formats code blocks with inline comments, line highlights, syntax language tags, and usage examples." },
  { title: "Multi Stage Technical Spec Requirement Document", desc: "Formats software technical specs with Architecture, API Contracts, Data Schemas, and Risks." },
  { title: "Multi Section Research Paper Digest Formatter", desc: "Formats academic papers into Abstract, Methodology, Findings, Limitations, and Citations." },
  { title: "Multi Tier Hierarchical Outlining Bullet Engine", desc: "Formats complex ideas into multi-level indented outlines with consistent numbering." },
  { title: "Multi Diagram Visual Architecture Notation Formatter", desc: "Generates valid Mermaid.js flowcharts, sequence diagrams, and ERD diagrams in outputs." },
  { title: "Multi Format API Contract OpenAPI Spec Formatter", desc: "Formats REST API endpoints into valid OpenAPI 3.0 YAML with request/response schemas." },
  { title: "Multi Section Legal Contract Clause Formatter", desc: "Formats legal agreements with numbered sections, defined terms, boilerplate, and signature blocks." },

  { title: "Multi Level Financial Statement Spreadsheet Formatter", desc: "Formats P&L income statements, balance sheets, and cash flow tables with aligned totals." },
  { title: "Multi Section Medical Patient Case Summary Formatter", desc: "Formats clinical cases using SOAP note structure (Subjective, Objective, Assessment, Plan)." },
  { title: "Multi Format E-Commerce Product Catalog Feed Formatter", desc: "Formats product catalogs into Google Shopping XML or Shopify CSV feed structures." },
  { title: "Multi Section Agile User Story Acceptance Criteria Formatter", desc: "Formats user stories with Given-When-Then BDD acceptance criteria bullet lists." },
  { title: "Multi Layer Presentation Pitch Deck Slide Storyboard", desc: "Formats 10-slide pitch deck content specifying Slide Title, Visual Asset, and Speaker Notes." },
  { title: "Multi Section Customer Support Ticket Response Formatter", desc: "Formats customer replies with empathetic greeting, step-by-step resolution, and helpful links." },
  { title: "Multi Format Data Dictionary Database Schema Formatter", desc: "Formats database data dictionaries listing Column Name, Type, Constraints, and Description." },
  { title: "Multi Section Meeting Minutes Action Item Formatter", desc: "Formats meeting transcripts into Attendees, Key Decisions, Action Items table, and Next Meeting." },
  { title: "Multi Layer Resume CV ATS Friendly Formatter", desc: "Formats resumes into ATS-optimized clean sections (Summary, Experience, Skills, Education)." },
  { title: "Multi Section Project Post Mortem Incident Report Formatter", desc: "Formats post-mortems into Incident Summary, Timeline, Root Cause, Action Items, and Prevention." },

  { title: "Multi Format CSV TSV Delimited Export Formatter", desc: "Renders clean CSV data exports with properly escaped quotes, commas, and header rows." },
  { title: "Multi Section Marketing Campaign Brief Formatter", desc: "Formats marketing briefs specifying Target Audience, Key Message, Channels, Budget, and KPIs." },
  { title: "Multi Level Instructional Lesson Plan Formatter", desc: "Formats lesson plans with Learning Objectives, Materials, Timed Activities, and Homework." },
  { title: "Multi Section Software Release Notes Changelog Formatter", desc: "Formats software changelogs categorizing Added, Changed, Deprecated, Removed, Fixed, Security." },
  { title: "Multi Format LaTeX Math Academic Equation Formatter", desc: "Renders complex mathematical derivations formatted in clean LaTeX code blocks." },
  { title: "Multi Section Grant Proposal Executive Summary Formatter", desc: "Formats grant requests into Need Statement, Project Goals, Budget Table, and Evaluation Plan." },
  { title: "Multi Layer Customer Persona Profile Card Formatter", desc: "Formats buyer personas into Demographics, Pain Points, Goals, Buying Objections, and Quote." },
  { title: "Multi Section Recipe Cooking Step Formatter", desc: "Formats culinary recipes with Prep Time, Ingredients List, Step-by-step Instructions, and Nutrition." },
  { title: "Multi Format RSS Atom XML Feed Formatter", desc: "Formats blog posts into valid RSS 2.0 or Atom XML feed structures." },
  { title: "Multi Section Bug Report Issue Template Formatter", desc: "Formats GitHub bug reports into Expected Behavior, Actual Behavior, Steps to Reproduce, Logs." },

  { title: "Multi Layer Real Estate Property Listing Formatter", desc: "Formats home listings into Property Highlights, Specs Table, Neighborhood, and Contact Info." },
  { title: "Multi Section Podcast Episode Show Notes Formatter", desc: "Formats podcast notes into Summary, Timestamped Chapters, Guest Bio, and Resource Links." },
  { title: "Multi Format GraphQL Schema Definition Formatter", desc: "Formats GraphQL APIs into valid SDL type definitions, queries, mutations, and inputs." },
  { title: "Multi Section Audit Compliance Checklist Formatter", desc: "Formats compliance audits into Item ID, Control Requirement, Pass/Fail Status, and Evidence." },
  { title: "Multi Layer Course Curriculum Syllabus Formatter", desc: "Formats online courses into Module Titles, Video Descriptions, Quizzes, and Assignments." },
  { title: "Multi Section Job Opening Description Formatter", desc: "Formats job posts into Role Overview, Key Responsibilities, Requirements, and Benefits." },
  { title: "Multi Format GeoJSON Feature Collection Formatter", desc: "Formats spatial point, line, and polygon data into valid GeoJSON FeatureCollection structures." },
  { title: "Multi Section Book Chapter Outline Formatter", desc: "Formats book chapters into Chapter Title, Scene Beats, Character POV, and Thematic Focus." },
  { title: "Multi Layer Fitness Workout Program Formatter", desc: "Formats gym workout routines into Exercise Name, Sets, Reps, Rest Interval, and Form Notes." },
  { title: "Multi Section Press Release Media Kit Formatter", desc: "Formats PR releases into FOR IMMEDIATE RELEASE, City, Dateline, Headline, Body, and Boilerplate." },

  { title: "Multi Format Docker Compose YAML Formatter", desc: "Formats multi-container container setups into valid Docker Compose YAML files." },
  { title: "Multi Section Product Feature PRD Specification Formatter", desc: "Formats PRDs into Problem Statement, User Stories, Out-of-Scope, Technical Architecture, Milestones." },
  { title: "Multi Layer Travel Itinerary Daily Guide Formatter", desc: "Formats travel trips into Morning, Afternoon, Evening activities, Transit advice, and Costs." },
  { title: "Multi Section RFP Vendor Proposal Formatter", desc: "Formats vendor RFP bids into Company Overview, Proposed Solution, Pricing Schedule, Case Studies." },
  { title: "Multi Format Kubernetes Manifest Deployment Formatter", desc: "Formats K8s workloads into valid Deployment, Service, and Ingress YAML manifests." },
  { title: "Multi Section Social Media Content Calendar Formatter", desc: "Formats monthly social media schedules into Date, Platform, Visual Asset, Copy, Hashtags." },
  { title: "Multi Layer Event Planning Schedule Formatter", desc: "Formats event schedules into Time Slot, Speaker/Session Title, Room Location, and Track." },
  { title: "Multi Section Whitepaper Executive Summary Formatter", desc: "Formats B2B whitepapers into Industry Problem, Market Shift, Technical Solution, and Case Study." },
  { title: "Multi Format SQL DDL Table Creation Script Formatter", desc: "Formats database DDL scripts into clean `CREATE TABLE` scripts with constraints and indexes." },
  { title: "Multi Section Policy Document Rulebook Formatter", desc: "Formats corporate policies into Purpose, Scope, Policy Guidelines, Enforcement, and Definitions." },

  { title: "Multi Layer Quiz Flashcard Q A Dataset Formatter", desc: "Formats educational study flashcards into Question, Answer, Explanation, and Difficulty Tag." },
  { title: "Multi Section Employee Performance Review Formatter", desc: "Formats manager reviews into Key Accomplishments, Areas for Growth, Competency Ratings, Goals." },
  { title: "Multi Format Protocol Buffers Protobuf Spec Formatter", desc: "Formats gRPC microservice APIs into valid proto3 definition syntax." },
  { title: "Multi Section Non-Profit Impact Report Formatter", desc: "Formats charity impact reports into Mission Statement, Key Impact Metrics, Beneficiary Stories, Financials." },
  { title: "Multi Layer Survey Questionnaire Formatter", desc: "Formats surveys into Question Text, Response Type (Likert, MCQ), and Logic Skip Rules." },
  { title: "Multi Section Video Production Shot List Formatter", desc: "Formats film shot lists into Shot Number, Framing Type, Movement, Subject, and Audio Note." },
  { title: "Multi Format Terraform HCL Infrastructure Formatter", desc: "Formats Infrastructure-as-Code modules into valid Terraform HCL syntax." },
  { title: "Multi Section Construction Cost Estimate Formatter", desc: "Formats construction bids into Materials, Labor, Equipment, Overhead, and Total Cost." },
  { title: "Multi Layer Software API Error Response Formatter", desc: "Formats standard API error payloads into error code, human message, and timestamp." },
  { title: "Multi Horizon Master Output Structuring Formatting Engine", desc: "Enforces master output formatting, flawless schema validation, visual typography, and structural precision." }
];

// --------------------------------------------------------------------------
// 20. REASONING - 60 SKILLS
// --------------------------------------------------------------------------
const REASONING_ITEMS = [
  { title: "Multi Step Deductive Syllogistic Logical Reasoning", desc: "Constructs valid deductive syllogisms verifying major premises, minor premises, and conclusions." },
  { title: "Multi Layer Inductive Pattern Generalization Reasoning", desc: "Evaluates sample size, representative bias, and probability when generalizing trends from observations." },
  { title: "Multi Stage Abductive Inference to Best Explanation", desc: "Evaluates competing hypotheses for observed anomalies selecting the most plausible cause." },
  { title: "Multi Perspective Dialectical Hegelian Triad Reasoning", desc: "Pits Thesis against Antithesis, resolving contradictions into a higher-level Synthesis." },
  { title: "Multi Factor First Principles Physical Deconstruction", desc: "Deconstructs complex problems to fundamental physical/economic axioms, re-reasoning up." },
  { title: "Multi Stage Counterfactual What If Horizon Reasoning", desc: "Simulates hypothetical timeline alterations evaluating cascading alternative outcomes." },
  { title: "Multi Layer Bayesian Probability Belief Updating Engine", desc: "Updates prior probability estimates based on new incoming empirical evidence." },
  { title: "Multi Perspective Analogical Mapping Knowledge Transfer", desc: "Maps structural relations between known source domains and novel target domains." },
  { title: "Multi Factor Causal Loop Systemic Feedback Reasoning", desc: "Maps reinforcing loops, balancing loops, and time delays in complex systemic relationships." },
  { title: "Multi Stage Fallacy Identification Debunking Engine", desc: "Detects logical fallacies (Ad Hominem, Strawman, False Dilemma) neutralizing flawed arguments." },

  { title: "Multi Layer Game Theoretic Nash Equilibrium Reasoning", desc: "Analyzes strategic interaction payoff matrices identifying dominant strategies and equilibria." },
  { title: "Multi Perspective Reductio Ad Absurdum Proof Method", desc: "Proves claims by demonstrating that assuming their negation leads to impossible contradictions." },
  { title: "Multi Factor Second Order Consequences Ripple Reasoning", desc: "Traces immediate first-order effects into secondary and tertiary indirect consequences." },
  { title: "Multi Stage Decision Tree Expected Utility Calculation", desc: "Calculates expected monetary value (EMV) across branching decision nodes and probabilities." },
  { title: "Multi Layer Occam Razor Simplicity Parsimony Reasoning", desc: "Selects the explanation requiring the fewest unproven assumptions among competing theories." },
  { title: "Multi Perspective Epistemic Certainty Confidence Scoring", desc: "Scores claim validity on explicit epistemic scale (Fact, Strong Evidence, Speculation, Debunked)." },
  { title: "Multi Factor Trade Off Pareto Frontier Optimization", desc: "Identifies Pareto-optimal solutions where improving one metric does not degrade another." },
  { title: "Multi Stage Root Cause Fault Tree Analysis FTA", desc: "Constructs logical AND/OR gate fault trees isolating exact component failure roots." },
  { title: "Multi Layer Deductive Mathematical Proof Step Builder", desc: "Drafts rigorous step-by-step mathematical proofs (Induction, Direct, Contradiction)." },
  { title: "Multi Perspective Cognitive Bias De-Biasing Engine", desc: "Audits reasoning against Confirmation Bias, Anchoring, Availability Heuristic, and Sunk Cost." },

  { title: "Multi Stage Hypothesis Testing Significance Evaluation", desc: "Formulates null/alternative hypotheses, calculates p-values, and evaluates Type I/II errors." },
  { title: "Multi Factor Marginal Utility Economics Cost Benefit", desc: "Evaluates diminishing marginal returns and opportunity costs in resource allocation." },
  { title: "Multi Layer Epistemological Justified True Belief Audit", desc: "Audits whether knowledge claims meet strict conditions of belief, truth, and justification." },
  { title: "Multi Perspective Socratic Questioning Logical Interrogation", desc: "Interrogates premises through structured Socratic questioning exposing hidden contradictions." },
  { title: "Multi Stage Pre Mortem Failure Mode Simulation", desc: "Assumes project failed catastrophically 1 year from now, reasoning backwards to catch vulnerabilities today." },
  { title: "Multi Factor Comparative Matrix Risk Benefit Evaluation", desc: "Weights pros and cons of competing strategies using normalized multi-criteria scoring." },
  { title: "Multi Layer System Dynamics Stock and Flow Modeling", desc: "Models accumulation stocks, inflow/outflow rates, and feedback delays in systems." },
  { title: "Multi Perspective Ethical Deontology vs Consequentialism", desc: "Evaluates moral dilemmas through Duty-based (Kant) vs Outcome-based (Utilitarian) lenses." },
  { title: "Multi Stage Evidential Triangulation Cross Verification", desc: "Validates claims by requiring corroboration from at least 3 independent data sources." },
  { title: "Multi Factor Black Swan Extreme Event Risk Reasoning", desc: "Models tail-risk events characterized by high unpredictability and massive impact." },

  { title: "Multi Layer Logical Implication Modal Necessity Reasoning", desc: "Evaluates claims across necessary truth, possible truth, and contingent truth states." },
  { title: "Multi Perspective Prisoner Dilemma Cooperation Analysis", desc: "Analyzes iterated prisoner's dilemma strategies (Tit-for-Tat, Win-Stay Lose-Shift)." },
  { title: "Multi Stage Inversion Problem Solving Reverse Reasoning", desc: "Solves problems by determining how to achieve the opposite bad outcome, then avoiding it." },
  { title: "Multi Factor Supply and Demand Market Equilibrium Reasoning", desc: "Predicts price shifts from supply shocks, demand elasticity, and price ceilings/floors." },
  { title: "Multi Layer Venn Diagram Set Theory Logic Deduction", desc: "Deduces subset relationships, intersections, and unions using formal set theory logic." },
  { title: "Multi Perspective Scientific Paradigm Shift Kuhn Analysis", desc: "Analyzes anomaly accumulations triggering scientific paradigm shifts in research fields." },
  { title: "Multi Stage Fermi Estimation Back of Envelope Calculation", desc: "Breaks impossible estimation questions into order-of-magnitude dimensional steps." },
  { title: "Multi Factor Survivorship Bias Selection Trap Audit", desc: "Audits data samples for survivorship bias ensuring failed/invisible data is accounted for." },
  { title: "Multi Layer Causation vs Correlation Disambiguation", desc: "Evaluates confounding variables, reverse causality, and spurious correlations." },
  { title: "Multi Perspective Tragedy of the Commons Resource Dilemma", desc: "Analyzes shared resource depletion, freerider problems, and governance solutions." },

  { title: "Multi Stage Deductive Code Logic Correctness Proof", desc: "Proves software loop invariants and pre/post conditions using Hoare logic." },
  { title: "Multi Factor Goodhart Law Metric Distortion Audit", desc: "Audits target metrics verifying that optimizing for the metric does not destroy value." },
  { title: "Multi Layer Semantic Ambiguity Disambiguation Engine", desc: "Disambiguates double meanings, polysemy, and vague terminology in statements." },
  { title: "Multi Perspective Chesterton Fence Policy Removal Rule", desc: "Requires understanding why a rule or fence was built before authorizing its removal." },
  { title: "Multi Stage Probabilistic Risk Assessment PRA Engine", desc: "Calculates probability distributions of component failures in complex engineering plants." },
  { title: "Multi Factor Diminishing Returns Threshold Calculation", desc: "Calculates the exact inflection point where additional resource input yields zero benefit." },
  { title: "Multi Layer Deductive Argument Validity Soundness Checker", desc: "Evaluates whether arguments possess both valid logical structure and true premises." },
  { title: "Multi Perspective Hanlon Razor Negligence Intent Audit", desc: "Evaluates whether bad outcomes stemmed from malice, incompetence, or systemic friction." },
  { title: "Multi Stage Regret Minimization Long Term Horizon", desc: "Evaluates major life/business decisions by projecting to age 80 and minimizing future regret." },
  { title: "Multi Factor Cobra Effect Perverse Incentive Audit", desc: "Audits incentive structures ensuring reward programs do not accidentally worsen the problem." },

  { title: "Multi Layer Logical Equivalence Contrapositive Deduction", desc: "Deduces logically equivalent statements using contrapositive conversions (P -> Q = ~Q -> ~P)." },
  { title: "Multi Perspective Streetlight Effect Measurement Bias", desc: "Audits data collection ensuring metrics are not chosen merely because they are easy to measure." },
  { title: "Multi Stage Counter-Argument Steelmanning Engine", desc: "Constructs the absolute strongest possible version of an opposing argument before responding." },
  { title: "Multi Factor Principal Agent Moral Hazard Alignment", desc: "Analyzes information asymmetry and conflicting incentives between principals and agents." },
  { title: "Multi Layer Truth Table Boolean Proposition Verifier", desc: "Evaluates complex Boolean expressions constructing exhaustive truth tables." },
  { title: "Multi Perspective Lindy Effect Technology Longevity", desc: "Predicts future technology lifespan based on current age according to the Lindy Effect." },
  { title: "Multi Stage Root Cause 5 Whys Chain Analysis", desc: "Asks 5 progressive 'Why' questions uncovering underlying cultural or process failures." },
  { title: "Multi Factor Opportunity Cost Trade Off Evaluation", desc: "Calculates lost value of foregone alternatives when choosing a specific capital investment." },
  { title: "Multi Layer Deductive Proof by Exhaustion Case Analysis", desc: "Proves claims by dividing problem space into finite cases and verifying each case individually." },
  { title: "Multi Horizon Master Logical Reasoning Deduction Engine", desc: "Enforces master logical validity, de-biasing, causal modeling, and sound first-principles reasoning." }
];

// Execute Batch 4
console.log("--- Executing Batch 4 (Creative Topup, Medical, Metaprompting, Misc, Output, Reasoning) ---");
processCategory('creative', 'creative', 'creative-multi-topup', CREATIVE_TOPUP);
processCategory('medical', 'medical', 'medical-multi', MEDICAL_ITEMS);
processCategory('metaprompting', 'metaprompting', 'metaprompting-multi', METAPROMPTING_ITEMS);
processCategory('miscellaneous', 'miscellaneous', 'misc-multi', MISC_ITEMS);
processCategory('output', 'output', 'output-multi', OUTPUT_ITEMS);
processCategory('reasoning', 'reasoning', 'reasoning-multi', REASONING_ITEMS);

console.log("Batch 4 Complete!");
