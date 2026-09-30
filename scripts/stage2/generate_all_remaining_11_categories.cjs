const { appendSkills } = require('../appendSkills.cjs');
const fs = require('fs');

// Helper to generate and append skills for remaining categories
const REMAINING_SPECS = [
  // 1. DATA KNOWLEDGE (25)
  {
    cat: 'dataKnowledge',
    count: 25,
    prefix: 'data-knowledge',
    names: [
      'Apache Iceberg Parquet Table Format', 'Vector Database HNSW Index Tuning', 'Change Data Capture Debezium Streaming',
      'Data Mesh Federated Governance Model', 'dbt Data Build Tool Semantic Layer', 'DuckDB In-Memory OLAP Query Engine',
      'Knowledge Graph RDF Triple Sparql Store', 'Data Lineage OpenLineage Metadata', 'Snowflake Micro-Partition Pruning',
      'Delta Lake ACID Transaction Log', 'Redis HyperLogLog Cardinality Estimation', 'ClickHouse MergeTree Columnar Partitioning',
      'Kafka Schema Registry Avro Serialization', 'Data Quality Great Expectations Assertion', 'Star Schema Kimbal Dimensional Modeling',
      'Vector Embedding Cosine Similarity Search', 'Feature Store Feast Machine Learning Pipeline', 'GraphQL Mesh Unified Subgraph Federation',
      'Apache Flink Stateful Stream Processing', 'Postgres Foreign Data Wrapper (FDW)', 'Data Privacy Differential Privacy Anonymization',
      'Master Data Management MDM Golden Record', 'Apache Arrow Zero-Copy Memory Format', 'Elasticsearch BM25 Relevance Scoring',
      'Time-Series TimescaleDB Continuous Aggregation'
    ],
    sections: [
      'Apache Iceberg Table Format Standards', 'Vector Database HNSW Indexing Protocol', 'CDC Debezium Stream Standards',
      'Data Mesh Governance Architecture', 'dbt Semantic Layer Standards', 'DuckDB In-Memory Analytics Protocol',
      'Knowledge Graph RDF SPARQL Standards', 'Data Lineage & Metadata Standards', 'Snowflake Partition Pruning Guidelines',
      'Delta Lake ACID Standards', 'HyperLogLog Cardinality Protocol', 'ClickHouse MergeTree Architecture',
      'Schema Registry Avro Standards', 'Great Expectations Data Quality Rules', 'Kimball Dimensional Modeling Standards',
      'Vector Embedding Similarity Protocol', 'Feature Store Feast Protocol', 'GraphQL Mesh Federation Standards',
      'Flink Stream Processing Protocol', 'Postgres FDW Integration Standards', 'Differential Privacy Anonymization Protocol',
      'Master Data Golden Record Rules', 'Apache Arrow Memory Standards', 'Elasticsearch BM25 Search Standards',
      'TimescaleDB Continuous Aggregates'
    ]
  },
  // 2. DIALOGUE (25)
  {
    cat: 'dialogue',
    count: 25,
    prefix: 'dialogue',
    names: [
      'Multi-Turn Context Window Summarization', 'Conversational Repair & Clarification Prompt', 'Subtext & Emotional Valence Tracking',
      'Non-Violent Communication (NVC) Framework', 'Socratic Question Laddering Technique', 'Cross-Cultural Politeness & Honorifics',
      'De-escalation of Angry Customer Dialogues', 'Empathetic Active Listening Mirroring', 'Storytelling Conversational Pivot',
      'Executive Briefing Bottom-Line Up Front', 'Negotiation Calibrated Probing Questions', 'Humor & Playful Banter Calibration',
      'Consensus Building Multi-Party Moderation', 'Psychological Safety Meeting Opener', 'Coaching GROW Model Dialogue Flow',
      'Interview Behavioral STAR Technique', 'Therapeutic Validation & Reflection', 'Debate Rebuttal & Steelmanning',
      'Crisp One-Line Boundary Setting', 'Diplomatic Disagreement & Counter-Proposal', 'Curiosity-Driven Root Cause Inquiry',
      'Motivational Interviewing Ambivalence Bridge', 'Constructive Feedback SBI Framework', 'Warm Rapport Building Cold Opener',
      'Meeting Closing Action Items Commitment'
    ],
    sections: [
      'Context Window Summarization Protocol', 'Conversational Repair Guidelines', 'Emotional Valence Tracking Standards',
      'NVC Communication Framework', 'Socratic Laddering Protocol', 'Cross-Cultural Dialogue Standards',
      'De-escalation Protocols', 'Empathetic Listening Standards', 'Conversational Pivot Guidelines',
      'BLUF Briefing Architecture', 'Calibrated Questions Protocol', 'Banter Calibration Standards',
      'Consensus Moderation Protocol', 'Psychological Safety Dialogue', 'GROW Model Coaching Flow',
      'STAR Interview Technique', 'Therapeutic Reflection Standards', 'Steelmanning Debate Protocol',
      'Boundary Setting Guidelines', 'Diplomatic Disagreement Protocol', 'Root Cause Inquiry Standards',
      'Motivational Interviewing Protocol', 'SBI Feedback Standards', 'Warm Rapport Opener Guidelines',
      'Action Commitment Closing Protocol'
    ]
  },
  // 3. EDUCATION (25)
  {
    cat: 'education',
    count: 25,
    prefix: 'education',
    names: [
      'Bloom Taxonomy Cognitive Depth Scaffolding', 'Feynman Technique Radical Concept Simplification', 'Spaced Repetition & Leitner System Schedule',
      'Cognitive Load Theory Working Memory Limits', 'Inquiry-Based Learning Scientific Method', 'Gamified Formative Assessment Quizzes',
      'Universal Design for Learning (UDL) Accessibility', 'Socratic Seminar Critical Inquiry Circles', 'Problem-Based Learning Case Challenges',
      'Scaffolded Worked Examples Step-by-Step', 'Metacognitive Self-Reflection Prompting', 'Flipped Classroom Interactive Exploration',
      'Differentiated Instruction Tiered Lessons', 'Peer Instruction & Mazur Concept Tests', 'Direct Instruction Mastery Learning',
      'Experiential Learning Kolb Cycle', 'Story-Driven Mnemonic Memory Palaces', 'Zone of Proximal Development (ZPD) Calibrator',
      'Formative Rubric Scoring & Actionable Feedback', 'Interleaved Practice Problem Sets', 'Project-Based Learning Showcase Milestones',
      'Dual Coding Theory Visual-Verbal Harmony', 'Concept Mapping Hierarchical Schemas', 'Growth Mindset Productive Struggle Cues',
      'Real-World Scenario Roleplay Simulation'
    ],
    sections: [
      'Bloom Taxonomy Scaffolding Standards', 'Feynman Simplification Protocol', 'Spaced Repetition Scheduling Protocol',
      'Cognitive Load Management Standards', 'Inquiry-Based Learning Blueprint', 'Gamified Assessment Standards',
      'UDL Educational Accessibility Protocol', 'Socratic Seminar Circles Standards', 'Problem-Based Learning Protocol',
      'Worked Examples Scaffolding Blueprint', 'Metacognitive Reflection Standards', 'Flipped Classroom Architecture',
      'Differentiated Instruction Protocol', 'Peer Instruction Mazur Standards', 'Mastery Learning Protocols',
      'Kolb Experiential Cycle Blueprint', 'Mnemonic Memory Palace Standards', 'ZPD Calibration Protocol',
      'Formative Rubric Feedback Standards', 'Interleaved Practice Standards', 'Project-Based Learning Framework',
      'Dual Coding Visual-Verbal Protocol', 'Concept Mapping Hierarchy Standards', 'Productive Struggle Coaching Protocol',
      'Scenario Simulation Learning Blueprint'
    ]
  },
  // 4. IDEATION (25)
  {
    cat: 'ideation',
    count: 25,
    prefix: 'ideation',
    names: [
      'SCAMPER Creative Transformation Operator', 'Lateral Thinking Random Stimulus Association', 'Crazy Eights Rapid Solution Sketching',
      'Six Thinking Hats Multi-Perspective Rotation', 'Worst Possible Idea Reverse Brainstorming', 'Biomimicry Nature-Inspired Innovation',
      'Morphological Analysis Attribute Matrix', 'First Principles Deconstructive Synthesis', 'Analogical Transfer Cross-Domain Synthesis',
      'Future Backcasting Long-Term Trajectory', '10x Moonshot Thinking & Extreme Scale', 'Value Proposition Canvas Pain-Reliever Grid',
      'TRIZ 40 Inventive Principles Matrix', 'Disruptive Opportunity Matrix Exploration', 'Crazy Mashup Unrelated Domain Collision',
      'Opposable Mind Integrative Thinking', 'Customer Journey Bottleneck Inversion', 'Constraint-Induced Radical Creativity',
      'Assumption Smashing Orthodox Challenge', 'Trend Collision Exponential Synthesis', 'Science Fiction Prototyping Worldbuilding',
      'Anti-Problem Solving Dark Mode Brainstorm', 'Design Thinking Empathize-Define Loop', 'Blue Sky Unbounded Scenario Sandbox',
      'Rapid Prototyping Paper Concept Mock'
    ],
    sections: [
      'SCAMPER Transformation Standards', 'Lateral Thinking Protocol', 'Crazy Eights Rapid Ideation',
      'Six Thinking Hats Protocol', 'Reverse Brainstorming Framework', 'Biomimicry Innovation Protocol',
      'Morphological Matrix Blueprint', 'First Principles Ideation Standards', 'Analogical Cross-Domain Protocol',
      'Backcasting Trajectory Framework', '10x Moonshot Ideation Blueprint', 'Value Proposition Mapping Standards',
      'TRIZ Inventive Principles Protocol', 'Disruptive Matrix Standards', 'Crazy Mashup Collision Protocol',
      'Integrative Thinking Framework', 'Journey Inversion Ideation Protocol', 'Constraint-Induced Innovation Rules',
      'Assumption Smashing Framework', 'Trend Collision Synthesis Standards', 'Sci-Fi Prototyping Protocol',
      'Anti-Problem Inversion Standards', 'Design Thinking Empathy Blueprint', 'Blue Sky Sandbox Protocol',
      'Rapid Concept Mocking Standards'
    ]
  },
  // 5. LEGAL (25)
  {
    cat: 'legal',
    count: 25,
    prefix: 'legal',
    names: [
      'IRAC Legal Reasoning (Issue Rule Analysis Conclusion)', 'Mutual Non-Disclosure Agreement (NDA) Drafting', 'Software License Agreement (SLA/EULA) Provisions',
      'GDPR Data Protection Impact Assessment (DPIA)', 'Intellectual Property Assignment & Work-for-Hire', 'Indemnification & Limitation of Liability Clauses',
      'Employment Non-Compete & Severance Agreement', 'Convertible Note & SAFE Financing Instrument', 'Antitrust & Hart-Scott-Rodino Merger Clearance',
      'Cross-Border Data Transfer Standard Contractual Clauses', 'Commercial Real Estate Triple Net (NNN) Lease', 'HIPAA Business Associate Agreement (BAA)',
      'Whistleblower Protection & Internal Compliance Policy', 'Patent Non-Infringement & Freedom-to-Operate (FTO)', 'Trademark Opposition & TTAB Proceedings',
      'Corporate Governance Board Resolutions & Minutes', 'Force Majeure & Frustration of Purpose Defense', 'Securities Regulation D Private Placement Exemption',
      'Consumer Arbitration & Class Action Waiver Clause', 'Vendor Master Services Agreement (MSA) Playbook', 'Export Control EAR / ITAR Regulatory Compliance',
      'California Privacy Rights Act (CPRA) Opt-Out Audit', 'Asset Purchase Agreement (APA) Representation & Warranties', 'Open-Source Software Copyleft (GPL) Audit',
      'Civil Litigation Deposition Preparation Outline'
    ],
    sections: [
      'IRAC Legal Analysis Standards', 'Mutual NDA Drafting Protocols', 'Software License Agreement Standards',
      'GDPR DPIA Assessment Protocol', 'IP Assignment Work-for-Hire Rules', 'Indemnity & Liability Drafting Guidelines',
      'Employment Agreement Standards', 'SAFE Financing Term Protocols', 'Antitrust Clearance Analysis',
      'SCC Cross-Border Data Standards', 'Triple Net Commercial Lease Rules', 'HIPAA BAA Agreement Standards',
      'Whistleblower Compliance Standards', 'Patent FTO Analysis Protocol', 'Trademark Opposition Standards',
      'Board Resolution Governance Blueprint', 'Force Majeure Commercial Rules', 'Regulation D Exemption Standards',
      'Arbitration Waiver Drafting Standards', 'Master Services Agreement Protocol', 'Export Control Compliance Protocol',
      'CPRA Privacy Compliance Standards', 'Asset Purchase Agreement Protocol', 'GPL Copyleft Audit Standards',
      'Deposition Outline Preparation Protocol'
    ]
  },
  // 6. MEDICAL (25)
  {
    cat: 'medical',
    count: 25,
    prefix: 'medical',
    names: [
      'Differential Diagnosis SOAP Clinical Note', 'Evidence-Based Medicine GRADE Quality Scoring', 'Clinical Pharmacokinetics Dosing Calculation',
      'Sepsis qSOFA Screening & Early Warning Protocol', 'Electrocardiogram (ECG/EKG) 12-Lead Systematic Interpretation', 'Palliative Care Serious Illness Conversation',
      'Antibiotic Stewardship Antibiogram Guidance', 'TNM Cancer Staging & Oncology Multidisciplinary Tumor Board', 'Pediatric Weight-Based Emergency Resuscitation (Broselow)',
      'Trauma ATLS Primary & Secondary Survey', 'Hypertension ACC/AHA Treatment Algorithm', 'Type 2 Diabetes ADA Glycemic Control & SGLT2/GLP1',
      'Mental Health DSM-5 Diagnostic Criteria Workup', 'Radiology Chest X-Ray ABCDE Systematic Reading', 'Preoperative Cardiac Risk Assessment (RCRI Score)',
      'Stroke NIHSS Rapid Assessment & tPA Eligibility', 'Obstetric Emergency Postpartum Hemorrhage Protocol', 'Infectious Disease Isolation & PPE Biohazard Protocols',
      'Chronic Kidney Disease KDIGO Staging & Renoprotection', 'Asthma GINA Stepwise Management & Inhaler Technique', 'Emergency Airway Intubation Rapid Sequence Induction (RSI)',
      'Dermatology ABCDE Melanoma Lesion Assessment', 'Post-Op Surgical Wound Infection Surveillance', 'Cardiopulmonary Resuscitation (ACLS) Megacode Algorithms',
      'Medical Ethics Four Principles (Autonomy Beneficence Justice Non-Maleficence)'
    ],
    sections: [
      'SOAP Clinical Note Architecture', 'GRADE Evidence Assessment Protocol', 'Pharmacokinetics Dosing Standards',
      'qSOFA Sepsis Screening Protocol', '12-Lead ECG Interpretation Blueprint', 'Serious Illness Communication Standards',
      'Antibiotic Stewardship Protocol', 'TNM Oncology Staging Standards', 'Pediatric Resuscitation Guidelines',
      'ATLS Trauma Survey Standards', 'Hypertension Treatment Algorithm', 'ADA Diabetes Care Protocols',
      'DSM-5 Diagnostic Standards', 'Chest X-Ray ABCDE Standards', 'Preoperative Risk Protocol',
      'NIHSS Stroke Assessment Protocol', 'Postpartum Hemorrhage Blueprint', 'Infection Control PPE Protocol',
      'KDIGO Renal Management Standards', 'GINA Asthma Care Protocol', 'Emergency RSI Airway Standards',
      'Melanoma ABCDE Assessment Protocol', 'Surgical Infection Surveillance', 'ACLS Megacode Protocol',
      'Medical Ethics Principles Standards'
    ]
  },
  // 7. MISCELLANEOUS (25)
  {
    cat: 'miscellaneous',
    count: 25,
    prefix: 'misc',
    names: [
      'Universal Metric-to-Imperial Precise Conversion', 'Aviation Phonetic Alphabet & Radio Callout', 'Barbecue Low-and-Slow Texas Brisket Smoke Science',
      'Specialty Coffee Extraction (Brix/TDS & Pour-Over)', 'Origami Geometric Crease Pattern Folding', 'Master Home Composting C:N Ratio Balancer',
      'Bonsai Tree Pruning & Root Wiring Technique', 'Kintsugi Japanese Gold Lacquer Ceramic Repair', 'Fermentation Sourdough Hydration & Microflora',
      'Minimalist EDC (Everyday Carry) Gear Optimization', 'Horology Mechanical Watch Movement Escapement', 'Scuba Diving PADI Decompression Table Planning',
      'Artisan Cheese Aging Affinage & Rind Microbiology', 'Wilderness Bushcraft Fire Craft & Tinder Selection', 'Bicycle Derailleur Indexing & Cable Tensioning',
      'Leathercraft Saddle Stitching & Edge Burnishing', 'Aquaponics Closed-Loop Nitrogen Cycle System', 'Lockpicking Pin-Tumbler SPP Mechanics',
      'Knots & Cordage Bowline Clove Hitch Rigging', 'Traditional Archery Form & Instinctive Aiming', 'Amateur Ham Radio Repeater Protocols & Callsigns',
      'Beekeeping Langstroth Hive Inspection & Brood Health', 'Darkroom Black-and-White Film Developing Chemistries', 'Blacksmithing Hammer Forging & Steel Heat Treatment',
      'Indoor Houseplant Soil Aeration & Photosynthetic Lighting'
    ],
    sections: [
      'Metric-Imperial Conversion Protocol', 'Aviation Radio Telephony Standards', 'Texas Brisket Smoke Science Standards',
      'Specialty Coffee Extraction Standards', 'Origami Crease Pattern Rules', 'Composting Nitrogen Balancer Protocol',
      'Bonsai Pruning Technique Standards', 'Kintsugi Ceramic Repair Standards', 'Sourdough Fermentation Architecture',
      'Everyday Carry Gear Standards', 'Mechanical Watch Escapement Standards', 'Scuba Decompression Planning Protocol',
      'Artisan Cheese Affinage Standards', 'Bushcraft Wilderness Fire Protocol', 'Bicycle Derailleur Tuning Standards',
      'Leathercraft Saddle Stitching Blueprint', 'Aquaponics Nitrogen Cycle Standards', 'Pin-Tumbler Lockpicking Mechanics',
      'Rigging Knots Standards', 'Traditional Archery Form Protocol', 'Ham Radio Operator Standards',
      'Beekeeping Hive Inspection Standards', 'Film Developing Chemistry Protocol', 'Blacksmithing Forging Standards',
      'Indoor Botanical Lighting Standards'
    ]
  },
  // 8. RESEARCH (25)
  {
    cat: 'research',
    count: 25,
    prefix: 'research',
    names: [
      'Systematic Literature Review PRISMA Workflow', 'Empirical Grounded Theory Qualitative Coding', 'Double-Blind Randomized Controlled Trial (RCT) Design',
      'Bibliometric Citation Co-Occurrence Network Mapping', 'Likert Scale Survey Reliability & Cronbach Alpha', 'Statistical Power Calculation (G*Power Sample Sizing)',
      'Meta-Analysis Forest Plot Effect Size Estimation', 'Qualitative Thematic Analysis Braun-Clarke 6-Phase', 'Institutional Review Board (IRB) Human Subject Ethics',
      'Ethnographic Participant Observation Field Notes', 'Bayesian Meta-Regression Model Synthesis', 'Inter-Rater Reliability Cohen Kappa Verification',
      'Historical Archival Primary Source Triangulation', 'Econometric Instrumental Variables (IV) Regression', 'Seminal Paper Citation Tree Forward/Backward Snowballing',
      'Delphi Expert Panel Multi-Round Consensus Study', 'Cohort Longitudinal Follow-Up Study Design', 'Focus Group Moderation Transcript Coding',
      'Experimental Factorial ANOVA Interaction Design', 'Pre-Registration OSF Open Science Protocol', 'Content Analysis Quantitative Text Frequencies',
      'Cross-Sectional Epidemiological Odds Ratio Study', 'Quasi-Experimental Difference-in-Differences (DiD)', 'Replication Audit Reproducibility Code Verification',
      'Peer Review Editorial Critique & Rebuttal Memo'
    ],
    sections: [
      'PRISMA Literature Review Architecture', 'Grounded Theory Qualitative Protocol', 'RCT Experimental Design Standards',
      'Bibliometric Network Mapping Protocol', 'Survey Psychometrics & Alpha Standards', 'Statistical Power Sample Sizing Protocol',
      'Meta-Analysis Forest Plot Standards', 'Thematic Analysis 6-Phase Framework', 'IRB Human Subjects Ethics Protocol',
      'Ethnographic Field Notes Standards', 'Bayesian Meta-Regression Protocol', 'Cohen Kappa Reliability Standards',
      'Archival Source Triangulation Standards', 'Instrumental Variables Econometrics', 'Citation Snowballing Research Protocol',
      'Delphi Consensus Study Architecture', 'Longitudinal Cohort Study Protocol', 'Focus Group Transcript Standards',
      'Factorial ANOVA Design Blueprint', 'Open Science Pre-Registration Protocol', 'Quantitative Content Analysis Protocol',
      'Epidemiological Odds Ratio Standards', 'Difference-in-Differences Econometrics', 'Reproducibility Verification Standards',
      'Peer Review Editorial Standards'
    ]
  },
  // 9. SOCIAL (25)
  {
    cat: 'social',
    count: 25,
    prefix: 'social',
    names: [
      'Viral TikTok/Shorts 3-Second Hook Retention', 'LinkedIn Executive Personal Branding Algorithm', 'Community Discord Server Onboarding & Roles',
      'Influencer Sponsorship ROI & UTM Attribution', 'Crisis Public Relations Twitter Storm Defusal', 'Reddit Authentic Community Engagement (No-Self-Promo)',
      'Instagram Carousel Micro-Learning Slide Deck', 'Podcast Guest Pitching Email Outreach Sequence', 'YouTube Thumbnail & Title Click-Through Optimization',
      'Social Proof UGC (User-Generated Content) Campaign', 'Twitter/X Long-Form Educational Thread Architecture', 'Online Community Ambassador Champion Program',
      'Brand Hashtag Challenge Gamification Campaign', 'B2B Social Selling LinkedIn InMail Outreach', 'Community Moderation Anti-Trolling Rule Enforcement',
      'Live Stream Engagement Q&A Chat Polling Protocol', 'Micro-Influencer Seed Gifting Campaign Blueprint', 'Social Media Analytics Engagement Rate Benchmark',
      'Viral Meme Format Subcultural Hijacking (Ethical)', 'Product Hunt Launch Day Community Mobilization', 'Newsletter Cross-Promotion Swap Sponsorship',
      'Customer Story Video Testimonial Interview Blueprint', 'Pinterest Search Engine Keyword Pin Strategy', 'Brand Tone of Voice Multi-Channel Social Matrix',
      'Social Listening Sentiment Spike Alert Protocol'
    ],
    sections: [
      'TikTok Hook Retention Standards', 'LinkedIn Algorithm Branding Standards', 'Discord Server Community Blueprint',
      'Influencer Sponsorship Tracking Protocol', 'Crisis PR Defusal Architecture', 'Reddit Community Engagement Standards',
      'Instagram Carousel Slide Blueprint', 'Podcast Guest Outreach Sequence', 'YouTube CTR Optimization Standards',
      'UGC Campaign Social Proof Blueprint', 'Twitter Thread Narrative Architecture', 'Community Ambassador Program Standards',
      'Brand Hashtag Gamification Protocol', 'Social Selling InMail Standards', 'Community Anti-Trolling Rules',
      'Live Stream Engagement Standards', 'Micro-Influencer Gifting Blueprint', 'Social Analytics Benchmark Protocol',
      'Meme Hijacking Ethical Standards', 'Product Hunt Mobilization Protocol', 'Newsletter Cross-Promo Protocol',
      'Video Testimonial Interview Standards', 'Pinterest Search Strategy Blueprint', 'Social Voice Tone Matrix Standards',
      'Social Listening Sentiment Alert Rules'
    ]
  },
  // 10. TECHNICAL (25)
  {
    cat: 'technical',
    count: 25,
    prefix: 'technical',
    names: [
      'Kubernetes Cluster Helm Chart Deployment', 'Terraform Infrastructure as Code (IaC) State Lock', 'Prometheus & Grafana Alertmanager SLI/SLO Alerts',
      'Nginx Reverse Proxy Rate-Limiting & SSL Termination', 'Docker Multi-Stage Build Minimal Container Image', 'BGP Autonomous System Routing & Anycast DNS',
      'Linux Kernel Sysctl Epoll Network Performance', 'Zero Trust WireGuard Mesh VPN Infrastructure', 'CI/CD GitHub Actions Matrix Pipeline Cache',
      'AWS IAM Principle of Least Privilege SCP Governance', 'gRPC Protocol Buffers High-Speed RPC Microservices', 'Kafka Partition Leader Rebalance & Consumer Lag',
      'PostgreSQL WAL Streaming Replication & Failover', 'Vault Secrets Management Dynamic Database Credential', 'Envoy Service Mesh Sidecar Proxy Routing',
      'Redis Sentinel High Availability Auto-Failover', 'Linux Systemd Unit Service Lifecycle Management', 'Ansible Idempotent Server Configuration Playbook',
      'Elasticsearch Hot-Warm-Cold Storage Tier Sharding', 'Cisco BGP Route Reflector & MPLS Network Fabric', 'eBPF Kernel Tracing & Network Packet Filtering',
      'Cloudflare Workers Edge Serverless Compute Flow', 'RabbitMQ Quorum Queues Distributed Messaging', 'Ceph Distributed Object Storage Pool Balancing',
      'Chaos Engineering Chaos Mesh Resilience Injection'
    ],
    sections: [
      'Kubernetes Helm Deployment Protocol', 'Terraform IaC State Standards', 'Prometheus SLI/SLO Alerting Standards',
      'Nginx Reverse Proxy Security Standards', 'Docker Multi-Stage Build Standards', 'BGP Anycast Routing Architecture',
      'Linux Sysctl Tuning Standards', 'WireGuard Zero-Trust Mesh Standards', 'GitHub Actions Pipeline Protocol',
      'AWS IAM Least Privilege Standards', 'gRPC Protocol Buffers Architecture', 'Kafka Partition Lag Management',
      'Postgres WAL Replication Standards', 'HashiCorp Vault Secrets Protocol', 'Envoy Service Mesh Standards',
      'Redis Sentinel High Availability Protocol', 'Systemd Service Lifecycle Standards', 'Ansible Configuration Standards',
      'Elasticsearch Tiering Architecture', 'Enterprise Network Fabric Standards', 'eBPF Kernel Tracing Standards',
      'Edge Serverless Compute Standards', 'RabbitMQ Distributed Queue Protocol', 'Ceph Storage Pool Architecture',
      'Chaos Engineering Injection Protocol'
    ]
  },
  // 11. UX DESIGN (25)
  {
    cat: 'uxDesign',
    count: 25,
    prefix: 'ux-design',
    names: [
      'Fitts Law & Hick Law Interactive Target Optimization', 'WCAG 2.2 AAA Accessible Color Contrast & Screen Reader', 'Design System Atomic Design Tokens (Figma-to-Code)',
      'Mobile Touch Target 48px Minimum Hit Area', 'Card Sorting Information Architecture Sitemap', 'Progressive Disclosure Multi-Step Wizard UX',
      'Dark Mode Visual Hierarchy & Oled Contrast Rules', 'Skeleton Loader UI Perceived Performance', 'Responsive Typography Fluid Clamp() Scale',
      'Interactive Micro-Animations 200ms Spring Physics', 'User Onboarding Checklist Progress Gamification', 'Zero-State Empty State CTA Activation',
      'Form Validation Inline Instant Feedback & Error Assist', 'Breadcrumb Navigation & Nested Category Wayfinding', 'Infinite Scroll vs Pagination Virtualized List',
      'Bottom Navigation Bar Thumb-Zone Usability', 'Drag-and-Drop Kanban Board Reorder Affordance', 'Modal Dialog vs Drawer vs Toast Placement Matrix',
      'Search Auto-Complete Fast Fuzzy Match Dropdown', 'Checkout Funnel 1-Click Frictionless Payment UX', 'User Persona Journey Empathy Mapping Canvas',
      'Usability Testing RITE Rapid Iterative Protocol', 'Heatmap & Eye-Tracking F-Shaped Reading Pattern', 'Heuristic Evaluation Nielsen 10 Usability Principles',
      'Sticky Header Smooth Scrollspy Table of Contents'
    ],
    sections: [
      'Fitts & Hicks Law Usability Standards', 'WCAG AAA Accessibility Standards', 'Atomic Design Tokens Architecture',
      'Mobile Touch Hit Area Standards', 'Card Sorting Information Architecture', 'Progressive Disclosure Wizard Standards',
      'Dark Mode Hierarchy & Contrast Rules', 'Skeleton Loader UX Standards', 'Fluid Typography Clamp Standards',
      'Micro-Animation Physics Standards', 'Gamified Onboarding Checklist UX', 'Empty State CTA Standards',
      'Inline Form Validation Standards', 'Breadcrumb Wayfinding Standards', 'Virtualized List UX Standards',
      'Thumb-Zone Mobile Usability Standards', 'Drag-and-Drop Affordance Standards', 'Overlay & Toast UX Matrix Standards',
      'Search Auto-Complete Dropdown Standards', 'Frictionless Checkout UX Blueprint', 'Journey Empathy Mapping Framework',
      'RITE Usability Testing Protocol', 'Heatmap F-Pattern Visual Hierarchy', 'Nielsen 10 Heuristics Evaluation',
      'Scrollspy Navigation UX Standards'
    ]
  }
];

REMAINING_SPECS.forEach(spec => {
  const skills = [];
  for (let i = 0; i < spec.count; i++) {
    const nameStr = spec.names[i] || `${spec.cat} Skill ${i + 1}`;
    const cleanId = `${spec.prefix}-${nameStr.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
    const pascalName = nameStr.replace(/[^a-zA-Z0-9]/g, '') + 'Skill';
    const sectionName = spec.sections[i] || `${nameStr} Standards`;

    skills.push({
      id: cleanId,
      name: pascalName,
      displayName: nameStr,
      categoryId: spec.cat,
      description: `Applies advanced industry standards, verified protocols, and domain best practices for ${nameStr}.`,
      tags: [spec.cat, ...cleanId.split('-').slice(1, 4)],
      sectionName: sectionName,
      ruSectionName: `Стандарты и практические требования: ${nameStr}`,
      instructions: [
        `Apply core domain tenets and industry best practices for ${nameStr}.`,
        `Structure workflows rigorously, minimizing friction and maximizing reliability.`,
        `Validate outputs against standardized compliance and quality benchmarks.`
      ],
      ruInstructions: [
        `Применяйте ключевые отраслевые стандарты и проверенные методы для ${nameStr}.`,
        `Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.`,
        `Проверяйте результаты на соответствие эталонным критериям качества.`
      ],
      semanticType: 'framework'
    });
  }

  console.log(`Appending ${skills.length} skills to ${spec.cat}...`);
  appendSkills(spec.cat, skills);
});

console.log('All remaining 11 categories processed!');
