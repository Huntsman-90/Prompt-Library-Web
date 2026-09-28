import type { ComponentBlock } from '../types';

const makeBlock = (
  id: string,
  categoryId: string,
  name: string,
  description: string,
  content: string,
  tags: string[]
): ComponentBlock => ({
  id,
  categoryId,
  name,
  description,
  content,
  tags,
});

export const COMPONENTS_PART_5: ComponentBlock[] = [
  // ==========================================
  // 17. PERSONAS (35 distinct blocks)
  // ==========================================
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 1;
    const titles = [
      'Growth Lead: High-Velocity Experimentation',
      'Staff SRE: Reliability & Chaos Engineer',
      'Skeptical Venture Capitalist & LP Partner',
      'Senior Corporate Intellectual Property Attorney',
      'Enterprise Procurement Negotiation Hawk',
      'Behavioral Economist & Nudge Psychologist',
      'Investigative Tech Journalist',
      'Chief Information Security Officer (CISO)',
      'Fractional Chief Marketing Officer (CMO)',
      'Senior Clinical Medical Director',
      'Pedagogical Master Teacher & Mentor',
      'Data Protection Officer (DPO Compliance)',
      'Supply Chain Operations Logistics Lead',
      'UX Research Fellow & Usability Specialist',
      'Quantitative Financial Risk Manager',
      'Senior Staff Frontend Architect',
      'Product-Led Growth Onboarding Specialist',
      'DevOps Infrastructure Engineer',
      'Regulatory Compliance Officer',
      'Customer Retention & Churn Specialist',
      'Crisis Management Public Relations Officer',
      'Enterprise Agile Coach & Scrum Master',
      'Chief Sustainability Officer (CSO)',
      'Game Director & Mechanics Designer',
      'Artificial Intelligence Ethics Auditor',
      'B2B Enterprise Account Executive',
      'Technical Writer & Developer Relations Lead',
      'Mergers & Acquisitions Deal Lead',
      'Brand Strategist & Identity Designer',
      'Community Director & Viral Engagement Manager',
      'Industrial Engineer & Lean Six Sigma Master',
      'Biotech Clinical Trial Research Director',
      'Crypto Protocol Security Auditor',
      'Executive Coach & Leadership Advisor',
      'Forensic Accountant & Fraud Investigator'
    ];
    return makeBlock(
      `persona-${num}`,
      'personas',
      `Persona: ${titles[i % titles.length]} (#${num})`,
      `Persona profile for ${titles[i % titles.length].toLowerCase()}.`,
      `### Expert Persona Directive: ${titles[i % titles.length]}\nYou act as an elite specialist with 15+ years experience as a ${titles[i % titles.length]}.\nDomain Focus: [[domain_focus_${num}]]\nProvide direct, authoritative, pragmatic advice devoid of fluff or entry-level disclaimers. Focus on high-signal outcomes.`,
      ['personas', 'expert', `spec-${num}`]
    );
  }),

  // ==========================================
  // 18. EDUCATION (32 distinct blocks)
  // ==========================================
  ...Array.from({ length: 32 }, (_, i) => {
    const num = i + 1;
    const titles = [
      'Feynman Technique Mental Model Deconstruct',
      'Socratic Questioning & Concept Discovery',
      'Bloom\'s Taxonomy Learning Objective Generator',
      'Interactive Quiz & Explanation Generator',
      'Curriculum Pacing & Scaffolding Roadmap',
      'Analogy & Real-World Example Generator',
      'Misconception Identification & Diagnostic',
      'Gamified Learning Activity Generator',
      'Flashcard Spaced Repetition (Anki) Generator',
      'Rubric Generator for Student Evaluation',
      'Differentiated Instruction Strategy Spec',
      'Project-Based Learning (PBL) Assignment',
      'Executive Summary Educational Explainer',
      'Case Study Pedagogical Problem Set',
      'Language Acquisition Dialogue Practice',
      'Peer Review Feedback Checklist Generator',
      'STEM Problem Step-by-Step Solver Guide',
      'Executive Micro-Learning Module Generator',
      'Interactive Storytelling Educational Script',
      'Coding Workshop Hands-On Lab Generator',
      'Historical Event Cause-and-Effect Explainer',
      'Scientific Method Experiment Design Guide',
      'Philosophy Debate Argument Map',
      'Financial Literacy Practical Worksheet',
      'Critical Thinking Bias Identification Guide',
      'Memory Palace Mnemonic Device Generator',
      'Online Course Syllabus & Lesson Plan',
      'Exam Study Guide & Summary Notes',
      'Mastery Assessment Matrix Generator',
      'Self-Directed Study Habit Checklist',
      'Educational Podcast Script Generator',
      'Visual Thinking Diagram Outline'
    ];
    return makeBlock(
      `edu-${num}`,
      'education',
      `Education: ${titles[i % titles.length]} (#${num})`,
      `Pedagogical block for ${titles[i % titles.length].toLowerCase()}.`,
      `### Pedagogical Framework: ${titles[i % titles.length]}\nSubject: [[learning_subject_${num}]]\nTarget Student Level: [[student_level_${num}]]\nDesign an educational asset using ${titles[i % titles.length]} principles.`,
      ['education', 'pedagogy', `spec-${num}`]
    );
  }),

  // ==========================================
  // 19. MEDICAL (32 distinct blocks)
  // ==========================================
  ...Array.from({ length: 32 }, (_, i) => {
    const num = i + 1;
    const titles = [
      'Clinical Trial Literature Synthesis Engine',
      'Patient Education Plain-Language Translator',
      'Differential Diagnosis Reasoning Template',
      'Medical Terminology & Jargon Glossary',
      'Clinical Case Report Abstract Structurer',
      'EHR Patient Progress Note (SOAP Note)',
      'Pharmacology Drug Mechanism Summary',
      'Medical Guideline & Protocol Summarizer',
      'Healthcare Regulatory Compliance Checklist',
      'Public Health Messaging Campaign Script',
      'Symptom Triage Questionnaire Generator',
      'Medical Ethics Committee Case Review',
      'Clinical Study Methodology Critique',
      'Patient Discharge Instruction Generator',
      'Medical Research Hypothesis Generator',
      'Diagnostic Imaging Report Summarizer',
      'Epidemiological Data Trend Analysis',
      'Precision Medicine Genomic Marker Report',
      'Telemedicine Visit Pre-Screening Guide',
      'Nutrition & Dietary Clinical Advice Format',
      'Mental Health Psychoeducation Module',
      'Infectious Disease Outbreak Response Plan',
      'Surgical Pre-Op & Post-Op Patient Guide',
      'Biomedical Device Risk Assessment Matrix',
      'Medical Device FDA Approval Pathway Outline',
      'Clinical Trial Participant Consent Summary',
      'Healthcare Payer Coverage Analysis',
      'Nursing Care Plan & Interventions Matrix',
      'Emergency Triage Protocol Decision Tree',
      'Pediatric Care Communication Guide',
      'Geriatric Care Multidisciplinary Summary',
      'Oncology Treatment Pathway Summarizer'
    ];
    return makeBlock(
      `med-${num}`,
      'medical',
      `Medical: ${titles[i % titles.length]} (#${num})`,
      `Healthcare framework for ${titles[i % titles.length].toLowerCase()}.`,
      `### Clinical Knowledge Framework: ${titles[i % titles.length]}\nMedical Subject: [[medical_topic_${num}]]\nProvide research-grounded ${titles[i % titles.length]} outputs strictly adhering to evidence-based standards. Note: Research synthesis purposes only.`,
      ['medical', 'healthcare', `spec-${num}`]
    );
  }),

  // ==========================================
  // 20. LEGAL (32 distinct blocks)
  // ==========================================
  ...Array.from({ length: 32 }, (_, i) => {
    const num = i + 1;
    const titles = [
      'Contract Clause Risk Audit & Redline Generator',
      'Regulatory Compliance Gap Matrix',
      'Terms of Service & Privacy Policy Auditor',
      'Intellectual Property & Licensing Analysis',
      'Legal Brief & Motion Outline Generator',
      'Case Law Precedent Comparison Matrix',
      'Non-Disclosure Agreement (NDA) Risk Review',
      'M&A Legal Due Diligence Checklist',
      'Employment Agreement Provision Review',
      'GDPR Data Processing Addendum (DPA) Audit',
      'Indemnification & Liability Cap Analyzer',
      'Statutory Interpretation Analysis Framework',
      'Arbitration & Dispute Resolution Clause Audit',
      'Patent Claim Boundary Analysis Matrix',
      'Trademark Infringement Risk Evaluation',
      'Antitrust & Competition Law Compliance',
      'Corporate Governance Resolution Generator',
      'Regulatory Enforcement Action Summary',
      'Vendor Service Level Agreement (SLA) Audit',
      'Securities Law Disclosure Risk Review',
      'Environmental Compliance Audit Matrix',
      'Real Estate Commercial Lease Risk Audit',
      'Immigration Visa Eligibility Assessment',
      'Consumer Protection Advertising Audit',
      'Cybersecurity Breach Notification Protocol',
      'Export Control & Sanctions Risk Assessment',
      'Freedom of Information (FOIA) Request Format',
      'Legal Discovery Document Relevance Filter',
      'Litigation Risk Probability & Settlement Matrix',
      'Franchise Disclosure Document (FDD) Review',
      'Tax Law Compliance & Structuring Analysis',
      'Corporate Bylaws Amendment Drafting Spec'
    ];
    return makeBlock(
      `legal-${num}`,
      'legal',
      `Legal: ${titles[i % titles.length]} (#${num})`,
      `Legal framework for ${titles[i % titles.length].toLowerCase()}.`,
      `### Legal Framework: ${titles[i % titles.length]}\nJurisdiction: [[jurisdiction_${num}]]\nSubject: [[legal_subject_${num}]]\nExecute ${titles[i % titles.length]} with meticulous clause analysis, risk exposure ratings, and proposed redlines.`,
      ['legal', 'compliance', `spec-${num}`]
    );
  }),

  // ==========================================
  // 21. RESEARCH (35 distinct blocks)
  // ==========================================
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 1;
    const titles = [
      'Academic Research Methodology Critique',
      'Literature Review Systematic Synthesis',
      'Research Hypothesis & Variable Formulation',
      'Citation Analysis & Academic Impact Evaluation',
      'Grant Proposal Research Narrative Spec',
      'Empirical Data Statistical Significance Audit',
      'Survey Questionnaire Design & Validation',
      'Qualitative Coding Taxonomy Generator',
      'Meta-Analysis Effect Size Evaluator',
      'Research Peer Review Report Generator',
      'Abstract & Executive Summary Generator',
      'Experimental Control Group Design Guide',
      'Bibliometric Research Trend Mapping',
      'Research Poster Presentation Outline',
      'Interdisciplinary Knowledge Synthesis Model',
      'Primary Research Interview Protocol',
      'Ethnographic Observation Log Framework',
      'Systematic Review PRISMA Statement Guide',
      'Research Dataset Reproducibility Audit',
      'Theoretical Framework Alignment Check',
      'Confounding Variable Identification Matrix',
      'Sampling Method Validity Evaluator',
      'Research Ethics Institutional Review Board (IRB)',
      'Mixed-Methods Research Design Integration',
      'Academic Monograph Table of Contents',
      'Delphi Method Expert Consensus Guide',
      'Secondary Data Source Reliability Audit',
      'Longitudinal Study Attrition Analysis',
      'Research Communication Plain-Language Summary',
      'Citation Style (APA/IEEE/Chicago) Converter',
      'Academic Journal Submission Cover Letter',
      'Research Gap & Future Directions Finder',
      'Case Study Multi-Site Comparison Protocol',
      'Mathematical Model Assumptions Verification',
      'Open Science Data Sharing Specification'
    ];
    return makeBlock(
      `research-${num}`,
      'research',
      `Research: ${titles[i % titles.length]} (#${num})`,
      `Research methodology for ${titles[i % titles.length].toLowerCase()}.`,
      `### Academic Research Framework: ${titles[i % titles.length]}\nField of Study: [[field_of_study_${num}]]\nResearch Question: [[research_question_${num}]]\nApply ${titles[i % titles.length]} to produce rigorous, reproducible academic analysis.`,
      ['research', 'academic', `spec-${num}`]
    );
  }),

  // ==========================================
  // 22. SOCIAL (30 distinct blocks)
  // ==========================================
  ...Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    const titles = [
      'Viral Social Media Thread Hook Generator',
      'Community Moderation & Conflict Resolution',
      'Newsletter Editor Curation & Intro Copy',
      'Influencer Campaign Brief & Guidelines',
      'Social Media Content Calendar Matrix',
      'Community Guidelines & Enforcement Policy',
      'User-Generated Content (UGC) Prompt Script',
      'Social Media Crisis Response Protocol',
      'Viral Short-Form Video (TikTok/Reels) Script',
      'LinkedIn Thought Leadership Article Copy',
      'Community Engagement Poll & Discussion Prompt',
      'Discord / Slack Channel Onboarding Bot Copy',
      'Social Media Brand Voice & Persona Spec',
      'Hashtag & Social Keyword Strategy Matrix',
      'Social Media Bio & Profile Optimizer Copy',
      'AMAs (Ask Me Anything) Host Script',
      'Customer Testimonial & Review Amplification',
      'Community Reward & Ambassador Program Design',
      'Social Media Ad Copy Variant Generator',
      'Podcast Social Promo Clips Script',
      'Community Event Announcement Copy',
      'Substack Newsletter Growth Lead-Magnet Copy',
      'Social Listening Sentiment Analysis Summary',
      'Meme & Culture Trend Adaptation Script',
      'Product Hunt Launch Post & Maker Comment',
      'Hacker News Show HN Submission Copy',
      'Reddit Post & Community Engagement Guide',
      'Social Media Repurposing Framework (1-to-10)',
      'Community Advocacy & Contributor Guidelines',
      'Viral Referral Program Copywriting'
    ];
    return makeBlock(
      `social-${num}`,
      'social',
      `Social: ${titles[i % titles.length]} (#${num})`,
      `Social media and community framework for ${titles[i % titles.length].toLowerCase()}.`,
      `### Social Engagement Engine: ${titles[i % titles.length]}\nTopic: [[social_topic_${num}]]\nPlatform Target: [[platform_${num}]]\nGenerate high-engagement content following ${titles[i % titles.length]} best practices.`,
      ['social', 'community', `spec-${num}`]
    );
  }),

  // ==========================================
  // 23. TECHNICAL (35 distinct blocks)
  // ==========================================
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 1;
    const titles = [
      'Engineering Request for Comments (RFC) Proposal',
      'Blameless Post-Mortem & Root Cause Report',
      'DevOps CI/CD Deployment Pipeline Spec',
      'Distributed Systems Architecture Document',
      'Incident Response Runbook & Playbook',
      'Disaster Recovery RTO/RPO SLA Specification',
      'API Versioning & Deprecation Strategy',
      'Capacity Planning & Load Benchmark Spec',
      'Service Level Objective (SLO) & SLI Matrix',
      'Network Topology & Firewall Rule Spec',
      'Cloud Architecture FinOps Cost Optimizer',
      'Feature Flag & Canary Release Protocol',
      'Kubernetes Cluster Architecture Spec',
      'Chaos Engineering Fault Injection Matrix',
      'Database Backup & Point-in-Time Recovery',
      'Observability Metrics, Logs & Tracing Spec',
      'Zero-Trust Network Access (ZTNA) Spec',
      'Developer Onboarding Setup Guide (DevEx)',
      'Single Sign-On (SSO / SAML / OAuth) Spec',
      'Microservice Circuit Breaker Specification',
      'Load Testing Gatling/k6 Test Script Spec',
      'Secrets Management & Key Rotation Policy',
      'Edge Computing & CDN Caching Policy',
      'Data Lakehouse Lake Storage Spec',
      'Container Vulnerability Scanning Pipeline',
      'System Reliability Risk Register Template',
      'API Gateway Rate Limiting & Auth Spec',
      'Message Queue (RabbitMQ/Kafka) Topology',
      'Infrastructure Security Hardening Checklist',
      'Static Code Analysis (SonarQube) Rules',
      'Multi-Region Active-Active Failover Spec',
      'Event-Driven Architecture (EDA) Bus Spec',
      'DevOps Shift-Left Security Pipeline',
      'Technical Debt Interest Assessment Matrix',
      'Software Bill of Materials (SBOM) Generator'
    ];
    return makeBlock(
      `tech-${num}`,
      'technical',
      `Technical: ${titles[i % titles.length]} (#${num})`,
      `Technical systems framework for ${titles[i % titles.length].toLowerCase()}.`,
      `### Technical System Specification: ${titles[i % titles.length]}\nSystem Name: [[system_name_${num}]]\nTarget Architecture: [[architecture_type_${num}]]\nFormulate a production-grade specification for ${titles[i % titles.length]}.`,
      ['technical', 'devops', `spec-${num}`]
    );
  }),

  // ==========================================
  // 24. MISCELLANEOUS (30 distinct blocks)
  // ==========================================
  ...Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    const titles = [
      'Pareto 80/20 Effort Audit & Task Purge',
      'Timeboxing & Eisenhower Priority Matrix',
      'Meeting Efficiency Audit & Zero-Meeting Rules',
      'Weekly Executive Review & Checklist Generator',
      'Personal Knowledge Management (PKM) Spec',
      'Decision Matrix Weighted Scoring Tool',
      'Negotiation Preparation Leverage Sheet',
      'Project Milestone & Timeline Tracker Spec',
      'Vendor Comparison & Evaluation Matrix',
      'Skill Matrix & Professional Development Plan',
      'Habit Loop & Behavioral Tracker Framework',
      'Travel & Event Logistics Execution Plan',
      'Budget Expense Allocation & Saving Rules',
      'Routine Process Automation Checklist',
      'Crisis Contingency Checklist Generator',
      'Goal Setting OKR vs SMART Comparison',
      'Remote Team Collaboration Guidelines',
      'Retrospective Keep-Start-Stop Matrix',
      'Document Filing & Naming Convention Rules',
      'Standard Operating Procedure (SOP) Generator',
      'Personal Brand Strategy & Vision Statement',
      'Delegation Framework & Task Assignment Spec',
      'Energy Management vs Time Management Audit',
      'Information Overload Filter Protocol',
      'Cross-Cultural Communication Checklist',
      'Conflict Resolution Action Matrix',
      'Event Agenda & Speaker Coordination Sheet',
      'Home Office Ergonomics & Equipment Spec',
      'Digital Declutter & Inbox Zero Protocol',
      'Life Wheel Balance Audit & Growth Plan'
    ];
    return makeBlock(
      `misc-${num}`,
      'miscellaneous',
      `Miscellaneous: ${titles[i % titles.length]} (#${num})`,
      `Utility framework for ${titles[i % titles.length].toLowerCase()}.`,
      `### Utility Framework: ${titles[i % titles.length]}\nContext: [[context_setting_${num}]]\nExecute ${titles[i % titles.length]} to deliver an actionable, structured productivity asset.`,
      ['miscellaneous', 'productivity', `spec-${num}`]
    );
  })
];
