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
      `Phase 1: Setup frameworks, constraints, and initial inputs for ${title}.`,
      `Phase 2: Multi-perspective analysis, generation, or verification pipeline.`,
      `Phase 3: Synthesize output into structured format with validated criteria.`
    ],
    ruInstructions: item.ruInst || [
      `Этап 1: Инициализация фреймворков, ограничений и исходных данных для ${title}.`,
      `Этап 2: Многоаспектный анализ, генерация или конвейер проверки.`,
      `Этап 3: Синтез результата в структурированный формат с валидацией критериев.`
    ],
    semanticType: item.sem || 'process_directive'
  };
}

function processCategory(catFileName, categoryId, prefix, items) {
  const skills = items.map(item => makeSkill(catFileName, categoryId, prefix, item));
  return appendSkills(catFileName, skills);
}

// --------------------------------------------------------------------------
// 11. EDUCATION - 60 SKILLS
// --------------------------------------------------------------------------
const EDUCATION_ITEMS = [
  { title: "Multi Stage Differentiated Instructional Curriculum Design", desc: "Tailors lesson plans dynamically for advanced, grade-level, and struggling learners." },
  { title: "Multi Level Bloom Taxonomy Cognitive Scaffolding", desc: "Guides students systematically from Remember and Understand up to Evaluate and Create." },
  { title: "Multi Method Formative Diagnostic Assessment Suite", desc: "Combines diagnostic pre-tests, exit tickets, peer grading rubrics, and summative exams." },
  { title: "Multi Modal Interactive Learning Activity Design", desc: "Integrates visual diagrams, auditory discussions, kinesthetic experiments, and reading tasks." },
  { title: "Multi Stage Project Based Learning PBL Unit Blueprint", desc: "Structures real-world problem solving units with student inquiry, milestone checks, and public showcases." },
  { title: "Multi Level Universal Design for Learning UDL Scaffolding", desc: "Provides multiple means of engagement, representation, and action/expression." },
  { title: "Multi Perspective Socratic Seminar Discussion Guide", desc: "Facilitates student-led Socratic seminars with open-ended textual analysis questions." },
  { title: "Multi Stage Gamified Learning Progression Framework", desc: "Structures badges, quest milestones, XP points, and leaderboard mechanics into academic units." },
  { title: "Multi Level Dyslexia ADHD Accessibility Accommodations", desc: "Adapts curriculum materials with dyslexic-friendly fonts, chunked instructions, and extra time." },
  { title: "Multi Method Flipped Classroom Pre Work Architecture", desc: "Coordinates pre-class video lectures, comprehension quizzes, and in-class problem-solving labs." },

  { title: "Multi Stage STEM Engineering Design Challenge", desc: "Guides students through Ask, Imagine, Plan, Create, Test, and Improve engineering cycles." },
  { title: "Multi Level Language Immersion Scaffolding Framework", desc: "Scaffolds dual-language instruction using sentence frames, visual vocabulary, and code-switching." },
  { title: "Multi Method Social Emotional Learning SEL Curriculum", desc: "Integrates self-awareness, self-management, social awareness, and responsible decision-making." },
  { title: "Multi Stage Academic Essay Peer Review Protocol", desc: "Structures peer editing rounds focusing on thesis clarity, evidence strength, and citations." },
  { title: "Multi Level Montessori Hands On Discovery Environment", desc: "Designs self-directed, tactile learning station guides encouraging independent mastery." },
  { title: "Multi Method Math Concept Concrete Pictorial Abstract CPA", desc: "Teaches math concepts through physical manipulatives, visual diagrams, and symbolic equations." },
  { title: "Multi Stage Executive Function Study Skills Coaching", desc: "Teaches time blocking, note-taking (Cornell Method), prioritization, and exam prep strategy." },
  { title: "Multi Level Higher Education Syllabus Rubric Architecture", desc: "Drafts university course syllabi with explicit grading rubrics, weekly readings, and policies." },
  { title: "Multi Method Special Education IEP Goal Tracker", desc: "Drafts Individualized Education Program (IEP) measurable goals and progress monitoring metrics." },
  { title: "Multi Stage Medical Residency Case Based Clinical Teaching", desc: "Structures morning report case presentations teaching differential diagnosis and patient management." },

  { title: "Multi Level Coding Bootcamp Project Milestone Roadmap", desc: "Structures full-stack coding curriculum with daily labs, pair programming, and capstone reviews." },
  { title: "Multi Method Science Inquiry Lab Experiment Manual", desc: "Drafts chemistry/physics lab manuals with safety protocols, hypothesis formulation, and data graphing." },
  { title: "Multi Stage Corporate Employee Upskilling Pathway", desc: "Designs professional certification tracks with micro-learning modules and skill verification." },
  { title: "Multi Level Early Childhood Literacy Phonemic Awareness", desc: "Structures phonics, sight word recognition, guided reading, and story comprehension activities." },
  { title: "Multi Method High School Debate Argumentation Training", desc: "Teaches claim-warrant-impact structure, cross-examination skills, and rebuttal flow sheets." },
  { title: "Multi Stage Vocational Trade Apprenticeship Curriculum", desc: "Structures electrician/welding hands-on shop practice, safety codes, and master sign-offs." },
  { title: "Multi Level Music Theory Sight Reading Mastery Track", desc: "Scaffolds pitch identification, rhythm dictation, interval training, and sight singing." },
  { title: "Multi Method History Primary Source DBQ Document Analysis", desc: "Guides students analyzing historical primary sources for bias, context, and corroboration." },
  { title: "Multi Stage Kindergarten Transition Social Readiness", desc: "Prepares young children for classroom routines, sharing, emotion regulation, and motor skills." },
  { title: "Multi Level Art History Visual Analysis Criticism", desc: "Teaches formal visual analysis (color, composition, medium) and cultural art history context." },

  { title: "Multi Method Physical Education Fitness Health Unit", desc: "Combines cardiovascular motor skills, team sportsmanship, and nutrition education." },
  { title: "Multi Stage Philosophy Ethics Thought Experiment Lab", desc: "Engages high school/college students in ethical debate using structured moral dilemmas." },
  { title: "Multi Level Environmental Science Field Trip Guide", desc: "Structures outdoor ecology field work collecting water samples, identifying species, and logging data." },
  { title: "Multi Method Chess Tactical Opening Strategy Training", desc: "Scaffolds chess tactical vision, opening principles, endgame patterns, and puzzle solving." },
  { title: "Multi Stage Culinary Arts Kitchen Safety Knife Skills", desc: "Structures commercial culinary training in knife cuts, food sanitation, and station prep." },
  { title: "Multi Level Astronomy Stargazing Constellation Lab", desc: "Guides observational astronomy calculating celestial coordinates and planetary orbits." },
  { title: "Multi Method Financial Literacy Money Management Unit", desc: "Teaches high school students budgeting, compound interest, credit scores, and tax basics." },
  { title: "Multi Stage Foreign Language Oral Fluency Drill", desc: "Practices conversational speed drills, verb conjugation, and real-world dialog simulation." },
  { title: "Multi Level Architecture Design Drafting Studio", desc: "Guides architecture students from physical sketches and scale models to CAD rendering." },
  { title: "Multi Method Journalism News Reporting Ethics Unit", desc: "Teaches interviewing techniques, lead paragraph writing, fact-checking, and media ethics." },

  { title: "Multi Stage Psychology Behavioral Experiment Design", desc: "Guides undergraduate psychology students designing IRB-compliant human subject surveys." },
  { title: "Multi Level Aviation Flight School Ground Theory Track", desc: "Structures private pilot ground school in aerodynamics, weather METARs, navigation, and FAA rules." },
  { title: "Multi Method Creative Writing Workshop Critique Protocol", desc: "Structures fiction workshop feedback rules balancing encouraging praise and constructive edits." },
  { title: "Multi Stage Agricultural Farming Youth Club Project", desc: "Guides 4-H / FFA students raising livestock or crops with financial record keeping." },
  { title: "Multi Level Theatre Acting Improvisation Character Method", desc: "Structures drama exercises in vocal projection, Stanislavski character motivation, and improv." },
  { title: "Multi Method Oceanography Marine Biology Field Unit", desc: "Teaches ocean currents, intertidal zone ecology, and marine organism dissection labs." },
  { title: "Multi Stage Robotics First Lego League Team Coaching", desc: "Guides youth robotics teams building autonomous EV3/Spike robots and research presentations." },
  { title: "Multi Level Law School Case Brief Socratic Dialogue", desc: "Teaches first-year law students IRAC case briefing and surviving cold-call Socratic questioning." },
  { title: "Multi Method Entrepreneurship Pitch Deck Student Competition", desc: "Guides high school/college teams developing business MVPs and pitching to judges." },
  { title: "Multi Stage Public Speaking Toastmasters Speech Mastery", desc: "Scaffolds vocal variety, body language, eliminating filler words, and impromptu speaking." },

  { title: "Multi Level Graphic Design Typography Layout Studio", desc: "Teaches color theory, grid alignment, typography hierarchy, and Adobe Illustrator mastery." },
  { title: "Multi Method Archaeology Excavation Fieldwork Manual", desc: "Teaches stratigraphic grid trench digging, artifact cataloging, and carbon dating theory." },
  { title: "Multi Stage Dental School Pre Clinical Cavity Prep Lab", desc: "Guides dental students practicing drill ergonomics and tooth restoration on typodont models." },
  { title: "Multi Level Meteorology Weather Map Synoptic Analysis", desc: "Teaches reading isobar weather charts, satellite radar, and forecasting storm fronts." },
  { title: "Multi Method Veterinary Assistant Animal Handling Unit", desc: "Structures training in animal restraint, vitals monitoring, surgical prep, and pharmacy math." },
  { title: "Multi Stage Film Production Camera Lighting Crew Guide", desc: "Teaches 3-point lighting setup, camera focal length choice, boom mic audio, and slate protocol." },
  { title: "Multi Level Forestry Conservation Timber Cruise Lab", desc: "Teaches tree species identification, inclinometer height measurement, and forest management." },
  { title: "Multi Method Emergency Medical Technician EMT Basic Prep", desc: "Structures EMT training in CPR, trauma triage, splinting, and ambulance radio reports." },
  { title: "Multi Stage Cyber Defense High School Capture The Flag", desc: "Guides student cybersecurity teams solving password cracking and network packet analysis CTFs." },
  { title: "Multi Horizon Master Pedagogical Instructional Framework", desc: "Enforces master instructional design, learning taxonomy, differentiated scaffolding, and student outcome mastery." }
];

// --------------------------------------------------------------------------
// 12. FRAMEWORKS - 60 SKILLS
// --------------------------------------------------------------------------
const FRAMEWORKS_ITEMS = [
  { title: "Multi Framework Cynefin Decision Making Matrix", desc: "Navigates Clear, Complicated, Complex, Chaotic, and Confusion domains with tailored action steps." },
  { title: "Multi Stage Wardley Value Chain Mapping Architecture", desc: "Maps user value chains and component evolution across Genesis, Custom, Product, and Commodity." },
  { title: "Multi Perspective McKinsey 7S Organizational Audit", desc: "Audits Strategy, Structure, Systems, Shared Values, Style, Staff, and Skills alignment." },
  { title: "Multi Dimension TOGAF Enterprise Architecture TOGAF ADM", desc: "Applies Architecture Development Method across Business, Data, Application, and Tech architectures." },
  { title: "Multi Phase Design Thinking Double Diamond Framework", desc: "Guides Discover, Define, Develop, and Deliver innovation cycles." },
  { title: "Multi Layer SAFe Scaled Agile Framework Portfolio", desc: "Coordinates Agile Release Trains (ARTs), Program Increments (PIs), and Lean portfolio management." },
  { title: "Multi Perspective Porter Five Forces Industry Attractiveness", desc: "Evaluates Supplier Power, Buyer Power, Competitive Rivalry, Substitution, and New Entrants." },
  { title: "Multi Factor PESTLE Macro Environment Audit Framework", desc: "Audits Political, Economic, Social, Technological, Legal, and Environmental external factors." },
  { title: "Multi Layer Six Sigma DMAIC Process Quality Engine", desc: "Applies Define, Measure, Analyze, Improve, and Control statistical defect elimination." },
  { title: "Multi Level COBIT IT Governance Compliance Architecture", desc: "Aligns IT goals with business objectives across Evaluate, Direct, and Monitor governance domains." },

  { title: "Multi Perspective SWOT TOWS Strategic Matrix", desc: "Converts Strengths, Weaknesses, Opportunities, and Threats into actionable TOWS strategy pairs." },
  { title: "Multi Stage Lean Startup Build Measure Learn Feedback", desc: "Runs rapid experiment loops testing Hypotheses via Minimum Viable Products (MVPs)." },
  { title: "Multi Level ITIL 4 Service Value System Framework", desc: "Coordinates Service Value Chain, 34 Management Practices, and Continual Improvement." },
  { title: "Multi Factor Ansoff Growth Matrix Strategic Planning", desc: "Evaluates Market Penetration, Market Development, Product Development, and Diversification." },
  { title: "Multi Perspective BCG Growth Share Portfolio Matrix", desc: "Categorizes business units into Stars, Cash Cows, Question Marks, and Dogs." },
  { title: "Multi Layer Zachman Enterprise Architecture Framework", desc: "Fills 6x6 matrix of perspectives (Planner to Worker) against fundamental questions (What, How, Where, Who, When, Why)." },
  { title: "Multi Stage Blue Ocean Strategy Value Innovation", desc: "Applies Four Actions Framework (Eliminate, Reduce, Raise, Create) opening uncontested market space." },
  { title: "Multi Perspective Jobs To Be Done JTBD Outcome Driven", desc: "Uncovers functional, emotional, and social jobs-to-be-done with desired outcome expectations." },
  { title: "Multi Layer NIST Cybersecurity Framework CSF 2 0", desc: "Maps cybersecurity controls across Identify, Protect, Detect, Respond, Recover, and Govern." },
  { title: "Multi Stage OKR Strategic Cascading Objective Engine", desc: "Aligns ambitious company objectives with measurable key results and quarterly initiatives." },

  { title: "Multi Perspective Value Chain Analysis Primary Support", desc: "Audits Inbound Logistics, Operations, Outbound Logistics, Marketing, and Service value add." },
  { title: "Multi Stage APQC Process Classification Framework PCF", desc: "Standardizes operating processes using APQC cross-industry benchmark taxonomy." },
  { title: "Multi Level COSO Enterprise Risk Management ERM", desc: "Aligns governance, risk management, and internal controls using COSO 5-component framework." },
  { title: "Multi Perspective VRIO Competitive Capability Audit", desc: "Evaluates resources on Value, Rarity, Inimitability, and Organization for sustainable advantage." },
  { title: "Multi Stage Capability Maturity Model Integration CMMI", desc: "Assesses organizational maturity across Initial, Managed, Defined, Quantitatively Managed, and Optimizing." },
  { title: "Multi Perspective Crossing The Chasm Technology Adoption", desc: "Navigates tech adoption lifecycle from Innovators and Early Adopters across the chasm to Mainstream." },
  { title: "Multi Layer Balanced Scorecard Strategy Mapping", desc: "Maps cause-and-effect financial, customer, process, and learning objectives visually." },
  { title: "Multi Stage SCOR Supply Chain Operations Reference", desc: "Standardizes supply chain processes across Plan, Source, Make, Deliver, Return, and Enable." },
  { title: "Multi Perspective McKinsey Horizon Model Innovation", desc: "Allocates innovation budget across Horizon 1 core, Horizon 2 emerging, and Horizon 3 future bets." },
  { title: "Multi Layer ISO 9001 Quality Management System QMS", desc: "Establishes Plan-Do-Check-Act (PDCA) quality management controls and audit documentation." },

  { title: "Multi Perspective Kano Model Feature Satisfaction Matrix", desc: "Classifies features into Basic, Performance, Excitement, Indifferent, and Reverse expectations." },
  { title: "Multi Stage Lean Canvas One Page Startup Model", desc: "Formulates problem, solution, key metrics, unique value proposition, channels, and cost structure." },
  { title: "Multi Level PRINCE2 Project Governance Framework", desc: "Manages projects via stage gates, business case justification, and tolerance thresholds." },
  { title: "Multi Perspective Flywheel Effect Growth Engine", desc: "Designs self-reinforcing business flywheels where each component accelerates momentum." },
  { title: "Multi Layer Archimate Enterprise Modeling Standard", desc: "Drafts standardized Archimate diagrams across Business, Application, and Technology layers." },
  { title: "Multi Stage PMBOK 7th Edition Performance Domains", desc: "Aligns project delivery across Stakeholders, Team, Development Approach, Planning, and Value." },
  { title: "Multi Perspective Horizon Scanning Weak Signal Detection", desc: "Scans emerging technology and societal signals for early strategic disruption warning." },
  { title: "Multi Layer ISO 27001 Information Security Controls", desc: "Applies Annex A security controls establishing an Information Security Management System (ISMS)." },
  { title: "Multi Stage Kotter 8 Step Organizational Change", desc: "Executes urgency creation, guiding coalition, vision communication, quick wins, and cultural anchor." },
  { title: "Multi Perspective GE McKinsey 9 Box Matrix Investment", desc: "Evaluates business units based on Industry Attractiveness vs Competitive Business Unit Strength." },

  { title: "Multi Layer AWS Well Architected Framework Review", desc: "Evaluates cloud workloads across Operational Excellence, Security, Reliability, Performance, Cost, and Sustainability." },
  { title: "Multi Stage Waterfall Agile Hybrid Project Governance", desc: "Combines Stage-Gate fixed budgeting with iterative Scrum sprint execution." },
  { title: "Multi Perspective Customer Experience Journey Mapping", desc: "Maps customer touchpoints, emotional highs/lows, friction points, and improvement ideas." },
  { title: "Multi Layer Zero Trust Architecture ZTA Principles", desc: "Applies Never Trust, Always Verify, Least Privilege, and Assume Breach security frameworks." },
  { title: "Multi Stage Spotify Engineering Culture Model Squads", desc: "Coordinates autonomous Squads, Tribes, Chapters, and Guilds for agile delivery." },
  { title: "Multi Perspective Scenario Planning Shell Method", desc: "Constructs plausible future scenarios testing strategic resilience against high uncertainty." },
  { title: "Multi Layer ISO 31000 Risk Management Guidelines", desc: "Establishes risk assessment, risk treatment, risk reporting, and risk governance cycles." },
  { title: "Multi Stage 3C Model Ohmae Strategic Triangle", desc: "Aligns strategic positioning across Corporation, Customer, and Competitors." },
  { title: "Multi Perspective Value Proposition Design Strategyzer", desc: "Fits Customer Profile (pains, gains, jobs) with Value Map (products, pain relievers, gain creators)." },
  { title: "Multi Layer DAMA DMBOK Data Management Framework", desc: "Coordinates 11 data management knowledge areas from Architecture to Data Quality." },

  { title: "Multi Stage Lean Manufacturing 5S Housekeeping Kaizen", desc: "Implements Sort, Set in order, Shine, Standardize, and Sustain continuous improvement." },
  { title: "Multi Perspective Hook Model Behavioral Engagement", desc: "Structures user engagement loops via Trigger, Action, Variable Reward, and Investment." },
  { title: "Multi Layer CIS Critical Security Controls v8", desc: "Applies 18 prioritized cybersecurity safeguard controls for enterprise defense." },
  { title: "Multi Stage Scrum at Scale Scaled Architecture", desc: "Coordinates Scrum-of-Scrums and Executive Action Teams for enterprise scale." },
  { title: "Multi Perspective ADKAR Change Readiness Assessment", desc: "Measures organizational Awareness, Desire, Knowledge, Ability, and Reinforcement score." },
  { title: "Multi Layer C4 Architecture Software Diagramming", desc: "Renders architecture views across Context, Container, Component, and Code levels." },
  { title: "Multi Stage RACI Responsibility Assignment Matrix", desc: "Defines Responsible, Accountable, Consulted, and Informed roles across project deliverables." },
  { title: "Multi Perspective Hambrick Fredrickson Strategy Diamond", desc: "Aligns Arenas, Vehicles, Differentiators, Staging, and Economic Logic into a strategy diamond." },
  { title: "Multi Layer ISO 22301 Business Continuity Management", desc: "Establishes Business Impact Analysis (BIA), disaster recovery plans, and crisis drills." },
  { title: "Multi Horizon Master Strategic Framework Engine", desc: "Enforces master alignment across enterprise frameworks, competitive strategy, and execution methodologies." }
];

// --------------------------------------------------------------------------
// 13. GUARDRAILS & SAFETY - 60 SKILLS
// --------------------------------------------------------------------------
const GUARDRAILS_ITEMS = [
  { title: "Multi Layer Prompt Injection Input Sanitization Shield", desc: "Detects and neutralizes direct and indirect prompt injection attempts in user inputs." },
  { title: "Multi Factor PII Anonymization Masking Redaction", desc: "Scans texts for SSNs, credit cards, emails, and names, replacing them with anonymized tokens." },
  { title: "Multi Classifier Hate Speech Toxicity Filtering Guard", desc: "Filters hate speech, harassment, slurs, and toxic language across multiple severity tiers." },
  { title: "Multi Stage Output Hallucination Fact Checking Guard", desc: "Cross-checks LLM response claims against verified grounded knowledge bases before outputting." },
  { title: "Multi Layer System Prompt Leakage Defense Shield", desc: "Prevents adversaries from extracting internal system instructions or proprietary prompts." },
  { title: "Multi Threshold Rate Limiting DoS Prevention Valve", desc: "Prevents API abuse, automated scraping, and DoS attacks via token bucket throttling." },
  { title: "Multi Category Content Moderation Policy Safety Net", desc: "Screens content against self-harm, sexual content, violence, and illegal activity policies." },
  { title: "Multi Layer Role Based Data Access Authorization Shield", desc: "Enforces column-level and row-level access permissions on generated database queries." },
  { title: "Multi Stage Jailbreak Adversarial Attack Neutralizer", desc: "Detects DAN, prefix injection, character obfuscation, and base64 encoded jailbreak attempts." },
  { title: "Multi Factor Copyrighted IP Output Detection Guard", desc: "Scans LLM text and code outputs preventing verbatim reproduction of copyrighted materials." },

  { title: "Multi Layer Output Format Schema Validation Firewall", desc: "Validates JSON/XML outputs against strict schemas, auto-correcting malformed syntax." },
  { title: "Multi Stage Medical Advice Disclaimers Safety Guard", desc: "Injects mandatory medical disclaimers and flags dangerous self-treatment suggestions." },
  { title: "Multi Layer Legal Liability Caveat Insertion Shield", desc: "Ensures financial/legal generation includes necessary regulatory disclaimers and limitations." },
  { title: "Multi Factor Bias Discrimination Mitigation Audit", desc: "Audits outputs for racial, gender, age, or socio-economic stereotyping biases." },
  { title: "Multi Stage Out of Scope Topic Redirection Router", desc: "Gracefully redirects off-topic or out-of-scope user prompts back to supported domains." },
  { title: "Multi Layer Code Sandbox Vulnerability Analyzer", desc: "Scans AI-generated code for SQL injection, XSS, insecure deserialization, and hardcoded secrets." },
  { title: "Multi Factor Sentiment Distress Self Harm Escalation", desc: "Detects user crisis or self-harm intent and dispatches immediate helpline resources." },
  { title: "Multi Stage Automated Content Fact Verification Grounding", desc: "Verifies numerical stats, dates, and proper nouns against trusted web APIs." },
  { title: "Multi Layer PII Export Compliance Audit Trail", desc: "Logs all PII accesses and redactions to tamper-evident immutable audit logs." },
  { title: "Multi Factor Tone Neutrality Political Non Bias Guard", desc: "Maintains objective non-partisan stance on controversial political or religious topics." },

  { title: "Multi Layer Anti Spam Automated Bot Detection Engine", desc: "Identifies automated bot spam submissions via CAPTCHA and behavior heuristics." },
  { title: "Multi Stage Financial Advice Compliance Disclaimers", desc: "Injects SEC/FINRA investment disclaimers when discussing stock or crypto options." },
  { title: "Multi Factor Brand Reputation Protection Filter", desc: "Prevents AI from generating defamatory, offensive, or off-brand company statements." },
  { title: "Multi Layer Cryptography API Key Secret Sanitizer", desc: "Redacts случайно exposed AWS keys, JWT tokens, and passwords from logs and code outputs." },
  { title: "Multi Stage Child Safety Online Protection CSAM Guard", desc: "Enforces zero-tolerance immediate blocking and reporting on child exploitation content." },
  { title: "Multi Layer Cross Origin Resource Sharing CORS Guard", desc: "Enforces strict CORS origin validation preventing unauthorized cross-domain API calls." },
  { title: "Multi Factor Misinformation Fake News Detector", desc: "Identifies debunked conspiracy theories, fake news stories, and doctored claims." },
  { title: "Multi Stage Database Destructive Query Injection Guard", desc: "Blocks AI-generated SQL containing `DROP TABLE`, `DELETE WITHOUT WHERE`, or `TRUNCATE`." },
  { title: "Multi Layer User Input Length Bomb Overflow Shield", desc: "Truncates excessively long context input bombs designed to exhaust LLM token windows." },
  { title: "Multi Factor Algorithmic Fairness Demographic Parity Audit", desc: "Audits automated decision outputs for equitable treatment across demographic groups." },

  { title: "Multi Stage Deepfake Synthetic Media Misuse Guard", desc: "Detects attempts to generate unauthorized deepfake likenesses or voice clones of real people." },
  { title: "Multi Layer OAuth Scope Permission Boundary Guard", desc: "Restricts API call execution strictly within user authorized OAuth scopes." },
  { title: "Multi Factor Profanity Vulgarity Filtering Net", desc: "Redacts explicit profanity and vulgarity from customer-facing conversational channels." },
  { title: "Multi Stage Automated Code License Compliance Check", desc: "Scans generated code snippets preventing GPL copyleft license contamination in proprietary apps." },
  { title: "Multi Layer System Resource CPU Exhaustion Guard", desc: "Kills long-running AI code execution routines exceeding CPU time limits." },
  { title: "Multi Factor Customer Support Empathy Policy Guard", desc: "Ensures support bot replies maintain respectful tone avoiding defensive or snarky phrasing." },
  { title: "Multi Stage E-Commerce Maximum Discount Fraud Guard", desc: "Blocks promotional code generations exceeding maximum authorized margin thresholds." },
  { title: "Multi Layer Network Egress IP Whitelisting Shield", desc: "Restricts AI tool call outbound HTTP connections exclusively to approved domains." },
  { title: "Multi Factor Election Integrity Voting Misinformation Guard", desc: "Blocks false claims regarding polling locations, voting procedures, and candidate eligibility." },
  { title: "Multi Stage Automated Schema Anti Drift Guard", desc: "Flags breaking changes in generated JSON APIs before deploying to production clients." },

  { title: "Multi Layer Phishing Malware Generation Guard", desc: "Detects and blocks requests attempting to generate phishing email templates or malware scripts." },
  { title: "Multi Factor Accessibility WCAG Contrast Alt Text Guard", desc: "Enforces mandatory image alt text and WCAG AAA color contrast ratios in UI generation." },
  { title: "Multi Stage Pharmaceutical Off Label Drug Promotion Guard", desc: "Blocks unapproved off-label medical drug usage recommendations." },
  { title: "Multi Layer Session Hijacking CSRF Token Guard", desc: "Enforces anti-CSRF token verification on all state-changing API request payloads." },
  { title: "Multi Factor Military Weapons Proliferation Guard", desc: "Blocks instructions for manufacturing chemical, biological, radiological, or nuclear weapons." },
  { title: "Multi Stage GDPR Right To Be Forgotten Data Eraser", desc: "Executes cascading user personal data erasure across all databases and vector indices." },
  { title: "Multi Layer Autonomous Agent Action Approval Confirmation", desc: "Requires mandatory explicit human confirmation for high-stakes actions (money transfers, emails)." },
  { title: "Multi Factor Academic Dishonesty Plagiarism Guard", desc: "Flags generated academic essays failing originality checks or lacking proper citations." },
  { title: "Multi Stage Insurance Discrimination Underwriting Guard", desc: "Blocks prohibited demographic factors from insurance risk scoring algorithms." },
  { title: "Multi Layer Cloud Storage Public Bucket Prevention Shield", desc: "Scans S3 bucket policy outputs preventing accidental public read permissions." },

  { title: "Multi Factor Extremist Propaganda Recruitment Detector", desc: "Identifies and blocks radicalization or extremist organization propaganda." },
  { title: "Multi Stage Real Estate Fair Housing Act Compliance Guard", desc: "Scans property listings ensuring no discriminatory housing references." },
  { title: "Multi Layer Telemetry Analytics PII Redaction Pipeline", desc: "Strips IP addresses, device IDs, and location coordinates from telemetry events." },
  { title: "Multi Factor Gambling Addiction Responsible Gaming Guard", desc: "Detects compulsive gambling behavior and presents self-exclusion options." },
  { title: "Multi Stage Automated System Prompt Integrity Watchdog", desc: "Monitors memory for runtime system prompt corruption or drift." },
  { title: "Multi Layer Commercial Contract Price Slippage Guard", desc: "Flags pricing terms exceeding authorized contract variance thresholds." },
  { title: "Multi Factor Environmental Greenwashing Claim Checker", desc: "Verifies corporate eco-friendly claims against third-party sustainability certifications." },
  { title: "Multi Stage Autonomous Vehicle Critical Safety Interlock", desc: "Overrides autonomous driving commands if lidar/radar detects imminent collision." },
  { title: "Multi Layer Financial Trading Algorithmic Spoofing Guard", desc: "Blocks automated trading orders exhibiting market manipulation patterns." },
  { title: "Multi Horizon Master Guardrails Safety Architecture Engine", desc: "Enforces master AI safety, zero-trust input sanitization, output grounding, and ethical compliance." }
];

// --------------------------------------------------------------------------
// 14. IDEATION - 60 SKILLS
// --------------------------------------------------------------------------
const IDEATION_ITEMS = [
  { title: "Multi Perspective SCAMPER Innovation Matrix", desc: "Applies Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, and Reverse." },
  { title: "Multi Angle TRIZ Theory of Inventive Problem Solving", desc: "Solves technical contradictions using 40 TRIZ inventive principles and contradiction matrix." },
  { title: "Multi Horizon Disruptive Technology Ideation Factory", desc: "Brainstorms product concepts leveraging emerging tech convergences (AI, Biotech, Quantum, Energy)." },
  { title: "Multi Perspective Six Thinking Hats Edward de Bono", desc: "Iterates ideas across White (data), Red (feelings), Black (risk), Yellow (benefits), Green (creativity), Blue (process)." },
  { title: "Multi Stage Design Sprint Innovation Ideation", desc: "Guides 5-day Google Ventures design sprint ideation from map to sketch, decide, prototype, test." },
  { title: "Multi Category Cross Industry Biomimicry Innovation", desc: "Translates biological nature mechanisms (e.g. lotus leaf, kingfisher beak) into engineering solutions." },
  { title: "Multi Perspective Lateral Thinking Random Word Association", desc: "Breaks cognitive inertia using forced associations with random stimulus words and images." },
  { title: "Multi Horizon Blue Ocean Uncontested Market Canvas", desc: "Brainstorms radical market offerings eliminating industry standards and creating new demand." },
  { title: "Multi Persona Brainstorming Anti Pattern Inversion", desc: "Generates worst possible ideas first ('Reverse Brainstorming') to uncover hidden solutions." },
  { title: "Multi Layer Crazy Eights Rapid Prototyping Workshop", desc: "Generates 8 distinct visual or conceptual product ideas in 8 intense minutes." },

  { title: "Multi Angle Customer Pain Point First Principles Ideation", desc: "Deconstructs customer frustrations to fundamental truths, re-building innovative solutions." },
  { title: "Multi Horizon Future Back Trend Extrapolation Lab", desc: "Envisions 2035 future worlds and works backwards deriving necessary breakthrough products today." },
  { title: "Multi Category Cross Industry Analogy Transfer", desc: "Transfers successful business models from one industry (e.g. Uber/Airbnb) into unrelated sectors." },
  { title: "Multi Perspective Morphological Analysis Problem Grid", desc: "Combines parameters in a multi-dimensional matrix generating thousands of unique product permutations." },
  { title: "Multi Stage B2B Enterprise SaaS Micro Feature Innovation", desc: "Ideates workflow automation micro-features that eliminate 80% of repetitive enterprise tasks." },
  { title: "Multi Horizon Sustainability Circular Economy Ideation", desc: "Brainstorms cradle-to-cradle zero-waste product designs and closed-loop material recycling." },
  { title: "Multi Layer Brainwriting 6-3-5 Group Ideation", desc: "Runs silent 6-3-5 brainwriting rounds where 6 people write 3 ideas in 5 minutes, passing sheets." },
  { title: "Multi Perspective Trendjacking Cultural Meme Productization", desc: "Translates viral internet memes and cultural shifts into real-world consumer products." },
  { title: "Multi Angle Unmet Customer Jobs To Be Done Ideation", desc: "Ideates solutions for under-served customer jobs with high importance and low satisfaction." },
  { title: "Multi Horizon AI-Native Workflow Re-Imagination", desc: "Re-imagines traditional software workflows assuming zero-cost instant AI intelligence." },

  { title: "Multi Stage E-Commerce Viral Hook Product Ideation", desc: "Ideates visual, highly demonstrative physical products engineered for social media virality." },
  { title: "Multi Category Low-Code No-Code SaaS Micro App Ideation", desc: "Ideates niche, highly profitable micro-SaaS tools solvable with low-code automation." },
  { title: "Multi Perspective Frictionless UX Delight Feature Brainstorm", desc: "Ideates magical micro-interactions that surprise and delight users during mundane app tasks." },
  { title: "Multi Horizon Spatial Computing AR VR Experience Ideation", desc: "Brainstorms immersive 3D spatial user experiences for Apple Vision Pro and Meta Quest." },
  { title: "Multi Category Hardware Tech Accessory Innovation", desc: "Ideates ergonomic, modular, and multi-functional desk setup and mobile accessories." },
  { title: "Multi Perspective Gamification Mechanics Ideation", desc: "Ideates habit-forming game mechanics (streaks, mystery boxes, achievements) for non-game apps." },
  { title: "Multi Stage Content Creator Monetization Product Ideation", desc: "Ideates novel digital products, newsletters, communities, and courses for content creators." },
  { title: "Multi Layer Zero-To-One Radical Paradigm Shift Lab", desc: "Ideates radical 10x solutions that make existing industry incumbent products obsolete." },
  { title: "Multi Horizon Smart Home IoT Ecosystem Automation", desc: "Brainstorms contextual smart home automations linking sensors, energy, and comfort." },
  { title: "Multi Category Culinary Food Beverage Taste Flavor Fusion", desc: "Ideates unexpected flavor combinations, plant-based alternatives, and functional beverages." },

  { title: "Multi Stage FinTech Financial Inclusion Product Ideation", desc: "Ideates micro-loan, fractional investing, and mobile payment tools for underserved populations." },
  { title: "Multi Perspective Educational EdTech Engagement Ideation", desc: "Ideates interactive learning games and AI tutors making difficult topics fun." },
  { title: "Multi Horizon Commercial Space Economy Orbital Business", desc: "Brainstorms commercial business models in satellite servicing, space tourism, and microgravity manufacturing." },
  { title: "Multi Category Sustainable Fashion Textile Circularity", desc: "Ideates biodegradable fabrics, rental fashion subscription models, and upcycled garments." },
  { title: "Multi Perspective Urban Livability Mobility Innovation", desc: "Brainstorms micro-mobility solutions, pocket parks, and neighborhood community sharing hubs." },
  { title: "Multi Stage Healthcare Remote Patient Monitoring Ideation", desc: "Ideates wearable biometric sensor monitoring tools preventing chronic disease flare-ups." },
  { title: "Multi Layer Subconscious Mind Association Brainstorm", desc: "Uses dream logic, guided imagery, and subconscious prompts to unlock artistic breakthroughs." },
  { title: "Multi Horizon Clean Energy Storage Grid Decarbonization", desc: "Ideates long-duration grid battery storage, geothermal, and green hydrogen solutions." },
  { title: "Multi Category Hospitality Boutique Experience Innovation", desc: "Ideates unique thematic hotel stays, immersive dining pop-ups, and experiential travel." },
  { title: "Multi Perspective Community-Led Growth Social Features", desc: "Ideates peer-to-peer sharing, user-generated template hubs, and collaborative spaces." },

  { title: "Multi Stage Agritech Precision Farming Innovation", desc: "Ideates autonomous weeding robots, vertical farm hydroponics, and soil sensor networks." },
  { title: "Multi Layer Intellectual Property Patent Invention Mine", desc: "Scans core technology capabilities generating patentable novelty variations and claims." },
  { title: "Multi Horizon Autonomous Transport Logistics Fleet", desc: "Brainstorms autonomous drone delivery networks, self-driving freight, and micro-hubs." },
  { title: "Multi Category Pet Care Wellness Technology Innovation", desc: "Ideates smart pet feeders, health trackers, GPS collars, and interactive pet toys." },
  { title: "Multi Perspective Senior Living Elder Care Innovation", desc: "Ideates fall-detection sensors, memory stimulation games, and mobility assistance aids." },
  { title: "Multi Stage Maritime Freight Ocean Plastic Cleanup", desc: "Ideates autonomous ocean plastic skimming barriers and river interceptor vessels." },
  { title: "Multi Layer Deep Tech Synthetic Biology Material Innovation", desc: "Ideates lab-grown leather, spider silk materials, and engineered enzyme plastics." },
  { title: "Multi Horizon Quantum Computing Algorithm Breakthrough", desc: "Brainstorms quantum optimization applications in drug discovery, battery chem, and logistics." },
  { title: "Multi Category Music Sound Audio Tech Innovation", desc: "Ideates spatial audio headphones, AI melody generation plugins, and adaptive soundscapes." },
  { title: "Multi Perspective Non-Profit Social Impact Innovation", desc: "Ideates scalable non-profit models addressing homelessness, literacy, and clean water." },

  { title: "Multi Stage Construction Pre-Fab Modular Housing", desc: "Ideates 3D-printed homes, flat-pack modular building kits, and sustainable mass timber." },
  { title: "Multi Layer Micro-Mobility Electric Bike Cargo Innovation", desc: "Ideates heavy-payload electric cargo bikes replacing urban delivery vans." },
  { title: "Multi Horizon Artificial General Intelligence AGI Society", desc: "Envisions post-scarcity economic models, universal basic assets, and AI human symbiosis." },
  { title: "Multi Category Fitness Wellness Recovery Tech Innovation", desc: "Ideates cold plunge tubs, infrared sauna blankets, and percussion massage tools." },
  { title: "Multi Perspective E-Sports VR Gaming Arena Innovation", desc: "Ideates haptic feedback suits, omni-directional treadmills, and spectator VR modes." },
  { title: "Multi Stage Supply Chain Reusable Packaging System", desc: "Ideates durable, trackable tote shipping containers eliminating single-use cardboard." },
  { title: "Multi Layer Chemical Material Recycling Catalyst", desc: "Ideates chemical catalysts breaking down mixed polyester/cotton textiles into raw monomers." },
  { title: "Multi Horizon Autonomous Mining Drone Fleet Innovation", desc: "Brainstorms subterranean mapping drones and autonomous electric haul trucks." },
  { title: "Multi Category Artisan Craft Heritage Modernization", desc: "Ideates modern tech enhancements for traditional pottery, woodworking, and weaving." },
  { title: "Multi Horizon Master Ideation Innovation Blueprint Engine", desc: "Enforces master inventive problem solving, cross-domain breakthrough ideation, and disruptive vision." }
];

// --------------------------------------------------------------------------
// 15. LEGAL - 60 SKILLS
// --------------------------------------------------------------------------
const LEGAL_ITEMS = [
  { title: "Multi Jurisdictional Cross Border M A Due Diligence", desc: "Audits target company legal compliance across US, EU, UK, and Asian jurisdictions." },
  { title: "Multi Layer Commercial MSA Indemnification Negotiation", desc: "Drafts master service agreements balancing liability caps, mutual indemnities, and IP rights." },
  { title: "Multi Stage Patent Infringement Freedom to Operate FTO", desc: "Analyzes patent claim trees, prior art, and product specs evaluating infringement risks." },
  { title: "Multi Regulatory Data Privacy GDPR CCPA CPRA Audit", desc: "Audits data processing agreements, cross-border transfers, SCCs, and consent mechanisms." },
  { title: "Multi Tier Corporate Governance Board Resolution Drafter", desc: "Drafts corporate resolutions, board minutes, shareholder agreements, and voting trusts." },
  { title: "Multi Party Intellectual Property Assignment Agreement", desc: "Drafts IP assignment agreements securing founder, employee, and contractor inventions." },
  { title: "Multi Stage Employment Non Compete Severance Playbook", desc: "Drafts executive employment agreements with non-solicit, non-compete, and severance terms." },
  { title: "Multi Layer Software License Agreement SLA EULA Drafter", desc: "Drafts enterprise SaaS SLAs, end-user license agreements, and uptime credit terms." },
  { title: "Multi Forum International Arbitration Clause Drafter", desc: "Structures ICC/LCIA arbitration clauses specifying seat, language, governing law, and rules." },
  { title: "Multi Regulatory Antitrust Hart Scott Rodino Clearance", desc: "Prepares HSR premerger notifications evaluating market concentration and overlaps." },

  { title: "Multi Stage Commercial Real Estate Triple Net NNN Lease", desc: "Drafts NNN commercial lease agreements detailing CAM expenses, tenant improvements, and default." },
  { title: "Multi Layer HIPAA Business Associate Agreement BAA", desc: "Drafts healthcare BAAs establishing PHI data safeguards, breach reporting, and audits." },
  { title: "Multi Party Joint Venture Strategic Alliance Agreement", desc: "Structures JV governance, profit splits, capital calls, deadlock resolution, and buyouts." },
  { title: "Multi Stage Whistleblower Internal Investigation Protocol", desc: "Directs privileged corporate internal investigations into fraud or compliance violations." },
  { title: "Multi Tier Venture Capital SAFE Convertible Note Instrument", desc: "Drafts YC SAFE notes, valuation caps, discount rates, and pro-rata investor rights." },
  { title: "Multi Regulatory Export Control EAR ITAR Sanctions Audit", desc: "Audits dual-use technology exports against BIS Commerce Control Lists and OFAC sanctions." },
  { title: "Multi Layer Trademark Opposition TTAB Proceeding", desc: "Drafts TTAB trademark opposition notices, responses, likelihood of confusion briefs." },
  { title: "Multi Stage Securities Reg D Private Placement Memorandum", desc: "Drafts PPM disclosure documents, accredited investor questionnaires, and Form D filings." },
  { title: "Multi Party Construction EPC Engineering Procurement Contract", desc: "Drafts lump-sum EPC contracts with liquidated damages, performance guarantees, and delays." },
  { title: "Multi Layer Open Source Software Copyleft GPL Audit", desc: "Audits codebase for open source license compliance preventing viral copyleft triggers." },

  { title: "Multi Stage Civil Litigation Deposition Outline Strategy", desc: "Drafts witness deposition questioning outlines, document impeachment exhibits, and objections." },
  { title: "Multi Regulatory Consumer Financial CFPB UDAAP Compliance", desc: "Audits fintech lending flows for unfair, deceptive, or abusive acts or practices." },
  { title: "Multi Party Commercial Maritime Carriage of Goods COGSA", desc: "Drafts bills of lading, charter party agreements, and ocean carrier liability claims." },
  { title: "Multi Stage Product Liability Defect Defense Strategy", desc: "Defends manufacturing design defect claims under strict liability and negligence standards." },
  { title: "Multi Layer Sovereign Debt Restructuring Paris Club Rules", desc: "Navigates sovereign bond restructuring, comparability of treatment, and debt swaps." },
  { title: "Multi Party Telecommunications Cell Tower Lease Master", desc: "Drafts wireless tower ground leases, colocation rights, and fiber backhaul easements." },
  { title: "Multi Stage False Claims Act Qui Tam Whistleblower Defense", desc: "Defends healthcare/defense contractors against relator FCA suits and CID subpoenas." },
  { title: "Multi Regulatory Environmental Clean Air Act Permitting", desc: "Audits industrial plant Title V air operating permits and EPA emission compliance." },
  { title: "Multi Party Consumer Product Safety CPSC Recall Protocol", desc: "Executes CPSC fast-track product safety defect reporting and recall plan management." },
  { title: "Multi Stage FDA 510k Medical Device Clearance Pathway", desc: "Drafts 510(k) premarket notifications demonstrating substantial equivalence." },

  { title: "Multi Regulatory ERISA Pension Plan Fiduciary Audit", desc: "Ensures plan trustee compliance with prudent expert rule, fee disclosures, and investments." },
  { title: "Multi Forum ITC Section 337 Patent Import Exclusion", desc: "Litigates unfair import trade practices before International Trade Commission." },
  { title: "Multi Layer Corporate Officer D O Indemnification Deed", desc: "Structures advancement of legal fees, side-A D&O coverage, and tail policy terms." },
  { title: "Multi Stage Patent Prosecution CPC Claim Drafting", desc: "Drafts patent specifications and independent/dependent claims formatted for CPC." },
  { title: "Multi Regulatory Franchise Disclosure Document FDD Audit", desc: "Audits Item 19 Financial Performance Representations in FDD filings." },
  { title: "Multi Party Trademark Co-Existence Settlement Agreement", desc: "Drafts worldwide trademark co-existence agreements with geographic boundaries." },
  { title: "Multi Stage Municipal Bond Official Statement Disclosure", desc: "Drafts primary disclosure documents for tax-exempt municipal bond issuances." },
  { title: "Multi Regulatory FERC Interstate Natural Gas Pipeline Tariff", desc: "Navigates Federal Energy Regulatory Commission open-access transmission tariffs." },
  { title: "Multi Party Native American Tribal Gaming Compact", desc: "Drafts Class III Indian gaming compacts balancing state and tribal sovereignty." },
  { title: "Multi Stage Cyber Breach Privilege Incident Response", desc: "Directs cybersecurity breach investigations under attorney-client privilege." },

  { title: "Multi Regulatory Commercial Banking AML BSA Compliance", desc: "Audits Anti-Money Laundering and Bank Secrecy Act Know-Your-Customer (KYC) flows." },
  { title: "Multi Party Cross Border Asset Purchase Agreement APA", desc: "Drafts asset acquisition agreements, representation/warranties, and escrow terms." },
  { title: "Multi Stage Civil Rights ADA Title III Accessibility Defense", desc: "Defends commercial website and physical facility ADA accessibility lawsuits." },
  { title: "Multi Layer Force Majeure Commercial Frustration Defense", desc: "Evaluates force majeure contract triggers, impossibility, and impracticability defenses." },
  { title: "Multi Party Commercial Aircraft Equipment Trust Lease", desc: "Drafts airline aircraft leasing, Cape Town Convention filings, and engine maintenance reserves." },
  { title: "Multi Stage Class Action Waiver Consumer Arbitration", desc: "Drafts enforceable consumer arbitration clauses and class action waiver provisions." },
  { title: "Multi Regulatory Insurance Solvency NAIC Financial Audit", desc: "Audits insurance company statutory accounting principles and reserve adequacy." },
  { title: "Multi Party Cross Border Technology Transfer Licensing", desc: "Structures cross-border tech licensing agreements with withholding tax optimizations." },
  { title: "Multi Stage Labor Union Collective Bargaining Agreement", desc: "Drafts CBA terms covering wages, grievances, seniority rights, and strike clauses." },
  { title: "Multi Regulatory Biometric Data Privacy BIPA Audit", desc: "Audits employee and customer biometric data collection consent protocols under BIPA." },

  { title: "Multi Party Renewable Energy Solar Ground Lease Easement", desc: "Drafts long-term utility-scale solar ground leases, decommissioning bonds, and easements." },
  { title: "Multi Stage Criminal Defense White Collar Subpoena Response", desc: "Coordinates grand jury subpoena response, document holds, and employee interviews." },
  { title: "Multi Regulatory Pharmaceutical Drug Price Transparency", desc: "Navigates state drug price transparency filings and IRA inflation rebate rules." },
  { title: "Multi Party Entertainment Film Production Rights Clearance", desc: "Clears life story rights, synchronization music licenses, and location releases." },
  { title: "Multi Stage Chapter 11 Corporate Bankruptcy Reorganization", desc: "Drafts debtor-in-possession (DIP) financing motions, disclosure statements, and plans." },
  { title: "Multi Regulatory Federal Election Commission FEC Compliance", desc: "Audits PAC corporate contributions, lobbyist disclosure reports, and campaign finance." },
  { title: "Multi Party Commercial Franchising Territory Protection", desc: "Drafts exclusive franchisee territory boundaries, right of first refusal, and covenants." },
  { title: "Multi Stage Intellectual Property Trade Secret Audit", desc: "Establishes NDA protocols, reasonable secrecy measures, and DTSA enforcement." },
  { title: "Multi Regulatory Distilled Spirits TTB Labeling Compliance", desc: "Navigates TTB COLA alcoholic beverage label approvals and formula filings." },
  { title: "Multi Horizon Master Legal Jurisprudence Drafting Engine", desc: "Enforces master statutory analysis, contract drafting, regulatory compliance, and risk mitigation." }
];

// Execute Batch 3
console.log("--- Executing Batch 3 (Education, Frameworks, Guardrails, Ideation, Legal) ---");
processCategory('education', 'education', 'education-multi', EDUCATION_ITEMS);
processCategory('frameworks', 'frameworks', 'frameworks-multi', FRAMEWORKS_ITEMS);
processCategory('guardrails', 'guardrails', 'guardrails-multi', GUARDRAILS_ITEMS);
processCategory('ideation', 'ideation', 'ideation-multi', IDEATION_ITEMS);
processCategory('legal', 'legal', 'legal-multi', LEGAL_ITEMS);

console.log("Batch 3 Complete!");
