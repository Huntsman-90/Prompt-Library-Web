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

export const COMPONENTS_PART_4: ComponentBlock[] = [
  // ==========================================
  // 11. UX DESIGN (32 distinct blocks)
  // ==========================================
  ...Array.from({ length: 32 }, (_, i) => {
    const num = i + 1;
    const titles = [
      'User Persona Archetype & Mental Model Spec',
      'Microcopy Error Message & Recovery State',
      'First-Time User Onboarding Activation Flow',
      'Usability Heuristic Audit (Nielsen 10 Rules)',
      'Empty State & Zero-Data Screen Copy',
      'Accessibility ARIA & Keyboard Navigation Spec',
      'Feature Discovery Modal & Coachmark Copy',
      'Checkout & Friction Elimination Audit',
      'Dark Pattern Elimination & Ethics Check',
      'Mobile Gesture & Touch Target Specification',
      'Information Architecture Navigation Tree',
      'Form Field Validation & Tooltip Copy',
      'In-App Notification Toast Copy Matrix',
      'User Journey Emotional Arc Mapping',
      'Design System Component Variant Token Spec',
      'Search & Filtering Experience Audit',
      'Settings & Preference Center Layout',
      'Permission Request & Location Prompt Copy',
      'Rating & Review Prompt UX Timing Spec',
      'Dashboard Widget Layout & Data Density Spec',
      'SaaS Plan Comparison Table UX Layout',
      'Responsive Mobile Breakpoint Layout Rules',
      'Micro-Interaction Motion & Feedback Guidelines',
      'Multi-Step Wizard Progress Bar UX',
      'User Session Replay Friction Analysis',
      'Cognitive Load Reduction UI Layout Audit',
      'Information Hierarchy Visual Weight Audit',
      'Content Design Voice & Tone Matrix',
      'UI Skeleton Loader & Deferred State Spec',
      'B2B Enterprise Admin Panel Navigation',
      'Custom Design System Button Token Spec',
      'Design Sprint User Testing Interview Script'
    ];
    return makeBlock(
      `ux-${num}`,
      'ux_design',
      `UX Design: ${titles[i % titles.length]} (#${num})`,
      `UX framework for ${titles[i % titles.length].toLowerCase()}.`,
      `### UX Specification: ${titles[i % titles.length]}\nTarget Product/Feature: [[ux_target_${num}]]\nUser Role: [[user_role_${num}]]\nProvide comprehensive ${titles[i % titles.length]} specifications with clear visual hierarchy, microcopy, and accessibility standards.`,
      ['ux_design', 'ui', `spec-${num}`]
    );
  }),

  // ==========================================
  // 12. CREATIVE (32 distinct blocks)
  // ==========================================
  ...Array.from({ length: 32 }, (_, i) => {
    const num = i + 1;
    const titles = [
      'Speculative Fiction Worldbuilding Framework',
      'Character Motivation & Flaw Matrix',
      'Cinematic Scene Beat & Dialogue Outline',
      'Metaphor & Sensory Imagery Generator',
      'Narrative Arc & Plot Twist Generator',
      'Dialogue Voice & Accent Calibration',
      'Poetic Meter & Rhyme Scheme Engine',
      'Alternative History Counterfactual Narrative',
      'Worldbuilding Magic/Technology Limits Spec',
      'Horror & Tension Escalation Blueprint',
      'Sci-Fi Cyberpunk Visual Aesthetic Spec',
      'Mythological Hero\'s Journey Mapping',
      'Screenplay Scene Heading & Action Lines',
      'Video Game Quest & Narrative Branching Tree',
      'Immersive Audio Drama Sound Design Script',
      'Interactive Fiction Choice Matrix',
      'Creative Prose Tone & Metaphor Shift',
      'Satirical Humor & Parody Framework',
      'Childhood Fairytale Modern Retelling',
      'Epistolary Novel Letter / Log Entries',
      'Unreliable Narrator Perspective Shift',
      'Ensemble Cast Interpersonal Conflict Arc',
      'Post-Apocalyptic Survival Lore Generator',
      'Space Opera Starship Environment Design',
      'Fantasy Kingdom Faction Politics',
      'Surrealist Dream Logic Narrative Engine',
      'Time-Travel Paradox Logic Framework',
      'Graphic Novel Page Panel Layout Spec',
      'Character Monologue & Internal Soliloquy',
      'Cultural Rituals & Folklore Design',
      'Fictional Language (Conlang) Phrasebook',
      'Creative Writing Prompt & Constraint Generator'
    ];
    return makeBlock(
      `creative-${num}`,
      'creative',
      `Creative: ${titles[i % titles.length]} (#${num})`,
      `Creative block for ${titles[i % titles.length].toLowerCase()}.`,
      `### Creative Engine: ${titles[i % titles.length]}\nPremise: [[creative_premise_${num}]]\nSetting: [[creative_setting_${num}]]\nDevelop rich narrative assets following ${titles[i % titles.length]} guidelines.`,
      ['creative', 'storytelling', `spec-${num}`]
    );
  }),

  // ==========================================
  // 13. IDEATION (32 distinct blocks)
  // ==========================================
  ...Array.from({ length: 32 }, (_, i) => {
    const num = i + 1;
    const titles = [
      'SCAMPER Product Innovation Operator',
      'Six Thinking Hats Lateral Ideation',
      'Reverse Brainstorming Failure Vector Map',
      'Morphological Analysis Idea Combinator',
      'Cross-Industry Business Model Transfer',
      'Crazy Eights Feature Sketch Prompts',
      'Blue Ocean Strategy Canvas Generator',
      'Trend Intersection Innovation Matrix',
      '10x Disruption vs 10% Sustaining Matrix',
      'Constraints-Driven Creative Ideation',
      'Random Word Association Stimulus',
      'Analogical Problem Domain Bridging',
      'Provocation & Movement (PO) Technique',
      'Unmet Needs & Friction Point Hunting',
      'Future Visioning 2035 Scenario Planning',
      'Worst Possible Idea Inversion Generator',
      'Biomimicry Nature-Inspired Product Design',
      'SCAMPER Service Design Operator',
      'Value Proposition Divergent Brainstorm',
      'SaaS Micro-Niche Idea Generator',
      'API-First Platform Unbundling Engine',
      'Crowdsourced Community Feature Ideas',
      'Zero-Capital Bootstrapped Business Ideas',
      'AI-Native Workflow Automation Ideation',
      'B2B Enterprise Efficiency Bottleneck Hunting',
      'Mobile-First Hyper-Local Service Ideas',
      'Gamification & Behavioral Nudge Ideas',
      'Circular Economy Waste Reduction Ideas',
      'Creator Economy Monetization Ideas',
      'EdTech Interactive Skill Learning Ideas',
      'HealthTech Friction Elimination Ideas',
      'FinTech Frictionless Payment Experience Ideas'
    ];
    return makeBlock(
      `ideation-${num}`,
      'ideation',
      `Ideation: ${titles[i % titles.length]} (#${num})`,
      `Brainstorming operator for ${titles[i % titles.length].toLowerCase()}.`,
      `### Ideation Engine: ${titles[i % titles.length]}\nDomain/Topic: [[ideation_topic_${num}]]\nTarget Goal: [[target_goal_${num}]]\nApply ${titles[i % titles.length]} to generate 10 distinct, non-obvious ideas ranked by novelty and feasibility.`,
      ['ideation', 'brainstorming', `spec-${num}`]
    );
  }),

  // ==========================================
  // 14. CODING (35 distinct blocks)
  // ==========================================
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 1;
    const titles = [
      'TypeScript Clean Code & Refactor Engine',
      'Comprehensive Vitest Unit Test Suite Generator',
      'Security Code Review & Vulnerability Audit',
      'Database Query Index & Performance Optimizer',
      'RESTful API Endpoint Architectural Review',
      'Design Pattern Implementation (Gang of Four)',
      'Async/Await Race Condition & Memory Leak Audit',
      'React Hook Performance & Re-Render Audit',
      'GraphQL Schema & Resolver Generator',
      'Docker Containerization & Multi-Stage Build',
      'Microservice Boundary & Event Schema Spec',
      'Algorithms Complexity (Big-O) Optimizer',
      'Data Structure Selection & Trade-Off Audit',
      'Tailwind CSS Responsive UI Component Refactor',
      'State Management Context/Zustand Audit',
      'System Architecture Diagram Code (Mermaid)',
      'Legacy Code Migration & Typing Converter',
      'Error Handling & Custom Exception Hierarchy',
      'Python Data Processing Script Refactor',
      'Go Concurrent Channel & Goroutine Auditor',
      'Rust Ownership & Memory Safety Inspector',
      'Infrastructure as Code (Terraform) Audit',
      'Kubernetes Deployment Manifest Generator',
      'CI/CD GitHub Actions Pipeline Generator',
      'WebSocket Real-Time Event Handler Refactor',
      'Distributed Transaction SAGA Pattern Generator',
      'WebAssembly (WASM) Rust Bridge Generator',
      'Next.js Server Actions & App Router Audit',
      'Type-Safe ORM (Drizzle/Prisma) Schema Refactor',
      'Regular Expression (RegEx) Generator & Explainer',
      'Web Worker Multithreaded Offload Engine',
      'PWA Service Worker Cache Strategy Refactor',
      'gRPC Protocol Buffer Schema Generator',
      'Code Refactoring Smell Identification Checklist',
      'Pull Request Code Review Critique & Suggestions'
    ];
    return makeBlock(
      `coding-${num}`,
      'coding',
      `Coding: ${titles[i % titles.length]} (#${num})`,
      `Software engineering pattern for ${titles[i % titles.length].toLowerCase()}.`,
      `### Engineering Specification: ${titles[i % titles.length]}\nLanguage/Framework: [[tech_stack_${num}]]\nTarget Code Snippet:\n\`\`\`\n[[source_code_${num}]]\n\`\`\`\nApply ${titles[i % titles.length]} to deliver refactored, type-safe, production-ready code.`,
      ['coding', 'engineering', `spec-${num}`]
    );
  }),

  // ==========================================
  // 15. BUSINESS (35 distinct blocks)
  // ==========================================
  ...Array.from({ length: 35 }, (_, i) => {
    const num = i + 1;
    const titles = [
      'SaaS Unit Economics & CAC Payback Diagnostic',
      'Go-To-Market (GTM) Beachhead Strategy',
      'B2B Enterprise Pricing Tier Architecture',
      'Investor Pitch Deck Narrative & Slide Outline',
      'Competitive Moat & Defensibility Scorecard',
      'Customer Acquisition Channel ROI Matrix',
      'Corporate Venture Capital Due Diligence',
      'Strategic Partnership & Distribution Agreement',
      'Product-Led Growth (PLG) Motion Design',
      'Freemium to Paid Conversion Funnel Audit',
      'Market Sizing TAM/SAM/SOM Bottom-Up Engine',
      'Financial Projection & Revenue Modeler',
      'Customer Churn Reduction Strategy',
      'International Market Expansion Playbook',
      'M&A Target Screening & Synergy Analysis',
      'Value Based Pricing & Packaging Strategy',
      'Executive Leadership Compensation Plan',
      'Board Meeting Deck Executive Summary',
      'Sales Enablement Battlecard vs Competitors',
      'Enterprise Procurement SLA Specification',
      'Corporate Restructuring & Downsizing Plan',
      'Turnaround Strategy for Stagnant Products',
      'Franchise / Licensing Model Expansion',
      'Supply Chain Cost Reduction Strategy',
      'B2B Contract Negotiation Leverage Tactics',
      'Key Performance Indicator (KPI) Dashboard Spec',
      'Capital Allocation & Share Buyback Strategy',
      'Joint Venture Governance & Profit Split',
      'Brand Equity & IP Valuation Framework',
      'Disruptive Innovation Threat Matrix',
      'Customer Success Health Score Matrix',
      'Annual Operating Plan (AOP) Budget Framework',
      'Corporate Spin-Off Execution Strategy',
      'Regulatory Strategy for Disruptive Tech',
      'Monetization Audit for Free Communities'
    ];
    return makeBlock(
      `business-${num}`,
      'business',
      `Business: ${titles[i % titles.length]} (#${num})`,
      `Business and strategy framework for ${titles[i % titles.length].toLowerCase()}.`,
      `### Business Strategy Framework: ${titles[i % titles.length]}\nEntity: [[company_name_${num}]]\nIndustry: [[industry_sector_${num}]]\nFormulate a rigorous strategic analysis using ${titles[i % titles.length]} principles.`,
      ['business', 'strategy', `spec-${num}`]
    );
  }),

  // ==========================================
  // 16. DATA & KNOWLEDGE (32 distinct blocks)
  // ==========================================
  ...Array.from({ length: 32 }, (_, i) => {
    const num = i + 1;
    const titles = [
      'PostgreSQL Query Execution Plan & Index Tuner',
      'Data Warehouse Schema Design (Star vs Snowflake)',
      'dbt Data Transformation Model & Documentation',
      'Data Quality Checks & Great Expectations Specs',
      'Taxonomy & Ontology Information Architecture',
      'JSON Unnesting & Semi-Structured Data Parsing',
      'Statistical Hypothesis Testing (A/B Test Eval)',
      'Feature Engineering Pipeline for ML Datasets',
      'Vector Database Indexing & HNSW Tuning Spec',
      'Entity Resolution & Deduplication Rules',
      'Data Lineage & Metadata Governance Catalog',
      'Customer Data Platform (CDP) Schema Spec',
      'Real-Time Streaming Pipeline (Kafka/Flink) Spec',
      'Time-Series Anomaly Detection Query',
      'Data Anonymization & Differential Privacy Rules',
      'SQL Window Function & Cohort Aggregation',
      'Graph Database (Cypher/Neo4j) Schema Design',
      'Data Cleaning & Outlier Removal Strategy',
      'Master Data Management (MDM) Governance',
      'Geospatial Data Processing (PostGIS) Query',
      'Apache Spark Distributed Data Transformation',
      'Data Mesh Domain-Driven Schema Specification',
      'Semantic Search Embedding Retrieval Model',
      'ETL Failure Alerting & Monitoring Metrics',
      'Data Catalog Searchability & Tagging Matrix',
      'Parquet Columnar Compression Strategy',
      'Clickhouse OLAP Real-Time Analytics Query',
      'Data Governance Role-Based Access Control',
      'Machine Learning Feature Store Schema',
      'SQL Migration Script & Rollback Generator',
      'Synthetic Data Generation Spec for Testing',
      'Data Ingestion Rate Throttling Strategy'
    ];
    return makeBlock(
      `data-${num}`,
      'data_knowledge',
      `Data & Knowledge: ${titles[i % titles.length]} (#${num})`,
      `Data engineering framework for ${titles[i % titles.length].toLowerCase()}.`,
      `### Data Engineering Framework: ${titles[i % titles.length]}\nDataset Context: [[dataset_context_${num}]]\nExecute ${titles[i % titles.length]} with optimal schema designs, queries, and data validation rules.`,
      ['data_knowledge', 'sql', `spec-${num}`]
    );
  })
];
