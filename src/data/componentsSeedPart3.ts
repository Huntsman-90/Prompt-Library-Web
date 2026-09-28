import type { ComponentBlock } from '../types';

export const COMPONENTS_PART_3: ComponentBlock[] = [
  // ==========================================
  // 17. PERSONAS (32 blocks)
  // ==========================================
  {
    id: 'persona-skeptical-cfo',
    categoryId: 'personas',
    name: 'Persona: The Skeptical CFO',
    description: 'Drills down into payback period, ROI, and financial risk.',
    content: `You are a battle-hardened Chief Financial Officer. You care about cash flow, payback period, unit economics, and hidden liabilities. Challenge all optimistic assumptions, demand conservative scenarios, and quantify downside exposure.`,
    tags: ['persona', 'finance', 'cfo'],
  },
  {
    id: 'persona-staff-engineer',
    categoryId: 'personas',
    name: 'Persona: Principal Staff Systems Engineer',
    description: 'Focuses on maintainability, scalability, and resilience.',
    content: `You are a Principal Software Architect. You despise over-engineered hype and premature optimization. You value simplicity, observable systems, idempotent operations, and low operational overhead.`,
    tags: ['persona', 'engineering', 'architecture'],
  },
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `persona-block-${i + 3}`,
    categoryId: 'personas',
    name: [
      'Persona: Ruthless Editor & Proofreader',
      'Persona: Silicon Valley Venture Capitalist',
      'Persona: Elite Trial Attorney',
      'Persona: Stanford Medical Professor',
      'Persona: High-Stakes Hostage Negotiator',
      'Persona: Michelin-Starred Executive Chef',
      'Persona: Cybersecurity Threat Hunter',
      'Persona: Product Management Leader',
      'Persona: Behavioral Economist',
      'Persona: Zen Minimalist Designer',
      'Persona: Investigative Forensic Accountant',
      'Persona: Olympic Performance Coach',
      'Persona: Sarcastic Tech Critic',
      'Persona: Empathetic School Teacher',
      'Persona: Seasoned War Historian',
      'Persona: Supply Chain Logistics Master',
      'Persona: Crisis Public Relations Specialist',
      'Persona: Cryptography Researcher',
      'Persona: Patent Attorney Analyst',
      'Persona: Game Design Director',
      'Persona: Consumer Psychologist',
      'Persona: Science Fiction Futurist',
      'Persona: Environmental Sustainability Auditor',
      'Persona: Academic Journal Peer Reviewer',
      'Persona: Agile Scrum Transformation Coach',
      'Persona: Urban Planning Architect',
      'Persona: Sound Engineer & Music Producer',
      'Persona: Aerospace Reliability Engineer',
      'Persona: Diplomatic International Ambassador',
      'Persona: Veteran Startup Founder',
    ][i] || `Persona Character #${i + 3}`,
    description: `Specialized domain expert role with authentic voice and mental models.`,
    content: `### Persona Calibration
Embody: [[expert_role]]
Tone and perspective: Respond strictly through the mental models, vocabulary, and standards of this domain authority. Avoid generic neutrality.`,
    tags: ['personas', 'expert', 'role'],
  })),

  // ==========================================
  // 18. EDUCATION (31 blocks)
  // ==========================================
  {
    id: 'edu-feynman-technique',
    categoryId: 'education',
    name: 'Feynman Technique (Explain to a 10-Year-Old)',
    description: 'Demystifies complex concepts using relatable metaphors.',
    content: `Explain [[complex_concept]] using the Feynman Technique:
1. Explain it as if teaching a bright 10-year-old (zero jargon).
2. Use a vivid real-world analogy.
3. Identify where the simple analogy breaks down and provide the technical nuance.
4. Conclude with a quick 2-question quiz to check comprehension.`,
    tags: ['feynman', 'learning', 'education'],
  },
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `edu-block-${i + 2}`,
    categoryId: 'education',
    name: [
      'Socratic Guided Discovery Prompt',
      'Curriculum Syllabus & Lesson Pacing Guide',
      'Spaced Repetition Flashcard Generator',
      'Formative Assessment Quiz Builder',
      'Cognitive Load Scaffolding Blueprint',
      'Bloom Taxonomy Question Ladder',
      'Interactive Case Study Teaching Guide',
      'Misconception Buster & Error Analysis',
      'Peer Tutoring Dialogue Script',
      'Self-Paced Workshop Lab Exercise',
      'Gamified Learning Quest Generator',
      'Executive Summary & Cheat Sheet for Students',
      'Historical Simulation Roleplay Guide',
      'Language Vocabulary Context Builder',
      'Math Word Problem Real-World Solver',
      'Critical Thinking Debate Topic Prompter',
      'Academic Research Mentorship Protocol',
      'Student Feedback Rubric Generator',
      'Memory Palace Mnemonic Construction',
      'Coding Bootcamp Hands-On Drill',
      'Dual Coding (Visual + Text) Concept Map',
      'Project-Based Learning Capstone Spec',
      'Reading Comprehension Deep-Dive Questions',
      'Differentiated Instruction Tiering',
      'Science Lab Experiment Hypothesis Plan',
      'Reflective Learning Journal Prompt',
      'Micro-Learning 5-Minute Module',
      'Executive Education Case Method Discussion',
      'English as Second Language (ESL) Idiom Guide',
      'Thesis Statement Advisory & Defense Prep',
    ][i] || `Educational Framework #${i + 2}`,
    description: `Pedagogical scaffolding, conceptual explanation, and assessment engineering.`,
    content: `### Educational Directive
Subject: [[learning_subject]]
Target Learner Level: [[learner_level]]
Deliver an engaging instructional breakdown that builds intuition, dismantles common pitfalls, and reinforces key concepts.`,
    tags: ['education', 'learning', 'pedagogy'],
  })),

  // ==========================================
  // 19. MEDICAL (26 blocks)
  // ==========================================
  {
    id: 'med-clinical-trial-review',
    categoryId: 'medical',
    name: 'Clinical Trial Methodology & Evidence Audit',
    description: 'Evaluates trial design, statistical power, endpoints, and bias.',
    content: `Analyze the clinical study for [[compound_or_therapy]]:
1. Study Design (RCT, cohort, sample size, blinding)
2. Primary vs Secondary Endpoints
3. Statistical Significance vs Clinical Relevance
4. Limitations, Confounding Factors & Bias Risks
5. Practical Translational Implications for Practice`,
    tags: ['clinical', 'evidence', 'medical'],
  },
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `med-block-${i + 2}`,
    categoryId: 'medical',
    name: [
      'Patient Education Plain-Language Handout',
      'Differential Diagnosis Thinking Scaffolding',
      'Medical Terminology Translation Guide',
      'Pharmacokinetics & Drug Interaction Matrix',
      'SOAP Clinical Note Structuring Tool',
      'Health Equity & Determinants of Health Review',
      'Epidemiological Outbreak Model Audit',
      'Biomarker & Diagnostic Test Sensitivity Spec',
      'Surgical Protocol Step-by-Step Breakdown',
      'Radiology Report Anatomy & Findings Summary',
      'Immunology Pathway Mechanism Explanation',
      'Nutritional Biochemistry Metabolic Map',
      'Mental Health Triage & Support Resource Framing',
      'Medical Device FDA 510(k) Readiness Checklist',
      'Genomics Variant Classification Guide',
      'Palliative Care Compassionate Comms Guide',
      'Geriatric Polypharmacy Reduction Audit',
      'Pediatric Dosage Formulation Guide',
      'Clinical Practice Guideline Synthesis',
      'ICD-10 / CPT Coding Crosswalk Helper',
      'Infection Control Protocol Checklist',
      'Emergency Department Triage Scoring Guide',
      'Vaccine Efficacy & Safety Dossier Analysis',
      'Physical Therapy Rehabilitation Protocol',
      'Telehealth Remote Consultation Script',
    ][i] || `Medical Knowledge Module #${i + 2}`,
    description: `Healthcare analysis, clinical communication, and medical terminology framing.`,
    content: `### Medical Knowledge Protocol
Disclaimer: For informational and research synthesis purposes only. Not clinical medical advice.
Topic: [[medical_topic]]
Analyze the literature, synthesize physiological mechanisms, and highlight safety parameters.`,
    tags: ['medical', 'clinical', 'health'],
  })),

  // ==========================================
  // 20. LEGAL (26 blocks)
  // ==========================================
  {
    id: 'legal-contract-clause-dissection',
    categoryId: 'legal',
    name: 'Contract Clause Dissection & Risk Audit',
    description: 'Examines indemnity, liability caps, termination, and ambiguity.',
    content: `Analyze this contractual clause:
\`\`\`
[[contract_clause]]
\`\`\`
1. Plain-English interpretation of obligations.
2. Hidden risks, one-sided liabilities, and ambiguities.
3. Redline suggestion to balance commercial interests.`,
    tags: ['contract', 'risk', 'legal'],
  },
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `legal-block-${i + 2}`,
    categoryId: 'legal',
    name: [
      'Non-Disclosure Agreement (NDA) Review Checklist',
      'Intellectual Property Assignment Clause Polish',
      'Statutory Compliance & Regulatory Gap Analysis',
      'Terms of Service & Privacy Policy Synthesis',
      'Employment Agreement Restrictive Covenants',
      'Software License (MIT/GPL/Apache) Compatibility',
      'Litigation Case Brief & IRAC Methodology',
      'SaaS Master Services Agreement (MSA) Redline',
      'Due Diligence Corporate Governance Checklist',
      'Antitrust & Monopolistic Trade Practice Audit',
      'Arbitration & Dispute Resolution Protocol',
      'Product Liability & Warranty Disclaimers',
      'Export Control & International Trade Sanctions',
      'Whistleblower Policy & Compliance Framework',
      'Cross-Border Data Transfer Standard Clauses',
      'Real Estate Commercial Lease Key Terms',
      'Securities Regulation Reg D / Reg CF Summary',
      'Trademark Infringement Cease and Desist Draft',
      'Freedom of Information Act (FOIA) Request',
      'Severability & Force Majeure Interpretation',
      'Fiduciary Duty & Conflict of Interest Review',
      'Employee Handbook Legal Compliance Scan',
      'Subpoena Response & Evidence Preservation Hold',
      'Class Action Settlement Notice Summary',
      'Venture Capital NVCA Term Sheet Breakdown',
    ][i] || `Legal Analysis Module #${i + 2}`,
    description: `Legal research, regulatory compliance, contract analysis, and risk mitigation.`,
    content: `### Legal Analysis Directive
Disclaimer: For legal research and organizational workflow only. Does not constitute attorney-client advice.
Subject: [[legal_matter]]
Review legal precedents, statutory constraints, and liability exposures. Deliver structured findings.`,
    tags: ['legal', 'compliance', 'contracts'],
  })),

  // ==========================================
  // 21. RESEARCH (31 blocks)
  // ==========================================
  {
    id: 'research-literature-synthesis',
    categoryId: 'research',
    name: 'Systematic Literature Review Matrix',
    description: 'Synthesizes divergent academic viewpoints and methodological consensus.',
    content: `Conduct an academic synthesis on [[research_topic]]:
1. Current Scholarly Consensus
2. Major Competing Theoretical Paradigms
3. Methodological Divergences & Sample Biases
4. Critical Unanswered Questions / Research Gap
5. Promising Hypotheses for Future Empirical Testing`,
    tags: ['literature-review', 'academic', 'research'],
  },
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `research-block-${i + 2}`,
    categoryId: 'research',
    name: [
      'Hypothesis Formulation & Falsification Matrix',
      'Quantitative Methodology Stress Test',
      'Qualitative Grounded Theory Coding Frame',
      'Academic Paper Abstract & Title Generator',
      'Peer Review Referee Report (Critique of Paper)',
      'Meta-Analysis Effect Size Evaluation',
      'Research Grant Specific Aims Proposal',
      'Experimental Design Control Group Calibration',
      'Survey Instrument Bias & Leading Question Audit',
      'Citation Graph & Influential Paper Mapping',
      'Bibliometric Keyword Co-Occurrence Analysis',
      'Ethical Review Board (IRB) Protocol Checklist',
      'Data Availability Statement & Reproducibility Guide',
      'Mixed-Methods Research Design Integration',
      'Primary Source Historical Contextualization',
      'De-Anonymization Threat in Academic Datasets',
      'Longitudinal Study Attrition Rate Mitigation',
      'Qualitative Interview Coding Codebook',
      'Academic Conference Poster Presentation Script',
      'Dissertation Chapter Outline & Transition Plan',
      'Scientific Journal Selection Strategy',
      'Inter-Rater Reliability Cohen Kappa Protocol',
      'Statistical Power Calculation Narrative',
      'Open Science Framework Preregistration Form',
      'Ethnographic Field Notes Synthesis',
      'Archival Research Cataloging Scheme',
      'Philosophy of Science Epistemic Justification',
      'Policy White Paper Academic Foundation',
      'Replication Crisis Vulnerability Assessment',
      'Interdisciplinary Terminology Alignment',
    ][i] || `Research Methodology Tool #${i + 2}`,
    description: `Academic research, experimental methodology, and scientific synthesis.`,
    content: `### Academic Research Protocol
Domain: [[academic_discipline]]
Inquiry: [[research_question]]
Apply empirical rigor, acknowledge confounding variables, and synthesize findings with academic precision.`,
    tags: ['research', 'methodology', 'academic'],
  })),

  // ==========================================
  // 22. SOCIAL (16 blocks)
  // ==========================================
  {
    id: 'social-viral-hook-generator',
    categoryId: 'social',
    name: 'High-Retention Viral Hook Framework',
    description: 'Generates captivating opening lines for threads and videos.',
    content: `Generate 5 viral hooks for [[topic]]:
1. The Contrarian / Myth-Busting Hook
2. The High-Stakes Personal Confession Hook
3. The Step-by-Step "How I did X in Y time" Hook
4. The Inverted Warning / Caution Hook
5. The Curated Resource / Bookmarkable List Hook`,
    tags: ['viral', 'hooks', 'social'],
  },
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `social-block-${i + 2}`,
    categoryId: 'social',
    name: [
      'Community Moderation & Conflict De-escalation',
      'Twitter/X Educational Thread Architecture',
      'LinkedIn Carousel Slide-by-Slide Outline',
      'YouTube Video Title & Thumbnail Concept Pairs',
      'Discord Server Engagement Event Script',
      'TikTok/Reels 60-Second Video Script',
      'Reddit AMA (Ask Me Anything) Strategy & Prep',
      'User-Generated Content (UGC) Prompt Challenge',
      'Brand Hashtag Campaign Creative Brief',
      'Influencer Outreach Collaboration DM Pitch',
      'Weekly Newsletter Curated Digest Format',
      'Crisis Social Media Response Guidelines',
      'Community Guideline & Code of Conduct',
      'Live Stream Host Talking Points & Q&A Flow',
      'Podcast Social Media Audiogram Clip Plan',
    ][i] || `Social Engagement Block #${i + 2}`,
    description: `Social media strategy, audience engagement, and community building.`,
    content: `### Social Media Protocol
Audience: [[target_platform_audience]]
Deliver high-engagement copy that captures attention in the first 3 seconds, provides instant value, and prompts comments.`,
    tags: ['social', 'content', 'marketing'],
  })),

  // ==========================================
  // 23. TECHNICAL (31 blocks)
  // ==========================================
  {
    id: 'tech-incident-postmortem',
    categoryId: 'technical',
    name: 'Blameless Incident Post-Mortem',
    description: 'Root cause analysis, timeline, and corrective preventive actions.',
    content: `Draft a Blameless Post-Mortem for [[incident_name]]:
1. Incident Summary & User Impact (Duration, affected users, SLA)
2. Detailed Chronological Timeline of Events
3. Root Cause Analysis (Technical & Organizational)
4. What Went Well vs Where We Got Lucky
5. Action Items (Preventative, Detective, Corrective) with owners.`,
    tags: ['postmortem', 'devops', 'technical'],
  },
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `tech-block-${i + 2}`,
    categoryId: 'technical',
    name: [
      'Architecture Decision Record (ADR) Template',
      'Threat Modeling STRIDE Methodology',
      'Kubernetes Deployment & Helm Chart Spec',
      'Database Migration Zero-Downtime Strategy',
      'Load Testing & Chaos Engineering Plan',
      'Distributed Tracing & OpenTelemetry Setup',
      'API Rate Limiting & Token Bucket Spec',
      'Disaster Recovery (RTO/RPO) Runbook',
      'Single Sign-On (SAML/OIDC) Integration Plan',
      'CI/CD Pipeline Security Hardening',
      'Micro-Frontend Architecture Blueprint',
      'Event-Driven Pub/Sub Kafka Architecture',
      'Cache Invalidation Strategy (TTL vs LRU)',
      'Serverless Cold Start Optimization Guide',
      'Infrastructure as Code (Terraform) Blueprint',
      'Network Mesh & Istio Routing Config',
      'Secrets Management & Vault Rotation Policy',
      'Web Performance Core Web Vitals Optimization',
      'Linux Kernel Parameter Tuning for Web Servers',
      'High-Availability PostgreSQL Failover Guide',
      'Elasticsearch Cluster Sharding Strategy',
      'WebSocket Scalability Architecture',
      'SSL/TLS Certificate Lifecycle Automation',
      'Zero Trust Network Access (ZTNA) Architecture',
      'Data Loss Prevention (DLP) Technical Audit',
      'GraphQL Subscriptions Scalability Spec',
      'Edge Compute Cloudflare Workers Pattern',
      'Storage Tiering & Cold Archive Lifecycle',
      'System Capacity Planning & Forecasting',
      'Service Level Objective (SLO/SLI) Matrix',
    ][i] || `Technical Architecture Pattern #${i + 2}`,
    description: `Infrastructure, distributed systems, DevOps, and cloud reliability engineering.`,
    content: `### Systems Architecture Directive
System: [[system_name]]
Design a scalable, highly available, and resilient architecture addressing bottlenecks, latency, and fault tolerance.`,
    tags: ['technical', 'systems', 'infrastructure'],
  })),

  // ==========================================
  // 24. MISCELLANEOUS (16 blocks)
  // ==========================================
  {
    id: 'misc-eisenhower-matrix',
    categoryId: 'miscellaneous',
    name: 'Eisenhower Urgent/Important Decision Matrix',
    description: 'Categorizes tasks into Do, Decide, Delegate, and Delete.',
    content: `Sort the following task backlog into the Eisenhower Matrix:
- Quadrant 1: Urgent & Important (Do immediately)
- Quadrant 2: Not Urgent, but Important (Schedule deeply)
- Quadrant 3: Urgent, but Not Important (Delegate or automate)
- Quadrant 4: Neither Urgent nor Important (Delete ruthlessly)
Tasks:
[[tasks_list]]`,
    tags: ['productivity', 'matrix', 'miscellaneous'],
  },
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `misc-block-${i + 2}`,
    categoryId: 'miscellaneous',
    name: [
      'Comprehensive Meeting Minutes & Action Items',
      'Travel Itinerary Logistics Planner',
      'Book Recommendation & Key Takeaway Synthesizer',
      'Daily Habit Tracker & Momentum Builder',
      'Personal Budget & Spending Leaks Audit',
      'Checklist Manifesto Standard Operating Procedure',
      'Speed Reading Comprehension Booster',
      'Gift Giving Thoughtful Idea Generator',
      'Event Planning Countdown Schedule',
      'Home Organization KonMari Declutter Guide',
      'Fitness Workout Periodization Routine',
      'Mindfulness Breathing & Stress Relief Script',
      'Resume Bullet Point Impact Rewriter (STAR)',
      'Productivity Pomodoro Session Planner',
      'Language Vocabulary Memory Anchor',
    ][i] || `Utility Module #${i + 2}`,
    description: `Everyday productivity, habit systems, planning, and organizational aids.`,
    content: `### Utility Directive
Target: [[productivity_goal]]
Deliver a structured, friction-free plan optimized for quick execution and clarity.`,
    tags: ['miscellaneous', 'productivity', 'tools'],
  })),
];
