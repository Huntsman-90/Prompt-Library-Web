import type { ComponentBlock } from '../types';

export const COMPONENTS_PART_2: ComponentBlock[] = [
  // ==========================================
  // 9. AGENTIC (36 blocks)
  // ==========================================
  {
    id: 'agentic-react-framework',
    categoryId: 'agentic',
    name: 'ReAct: Reason + Act Loop',
    description: 'Interleaves Thought, Action, and Observation cycles.',
    content: `You operate in a ReAct loop:
1. Thought: Reason about the current sub-goal.
2. Action: Choose a tool call or action in format: \`action_name(arg="value")\`.
3. Wait for Observation: Do not simulate the observation.
4. Repeat until goal is met, then produce Final Answer.`,
    tags: ['react', 'agentic', 'tools'],
  },
  {
    id: 'agentic-plan-and-solve',
    categoryId: 'agentic',
    name: 'Plan-and-Solve Decomposition',
    description: 'First produces a global plan, then executes item by item.',
    content: `### Execution Pipeline
Step 1: Plan Generation. Deconstruct [[task]] into a numbered sequence of sub-tasks.
Step 2: Sub-task Execution. Solve each sub-task systematically while maintaining intermediate state.
Step 3: Verification. Review all sub-solutions against the master objective.`,
    tags: ['planning', 'agentic', 'decomposition'],
  },
  {
    id: 'agentic-tool-dispatcher',
    categoryId: 'agentic',
    name: 'Tool Calling Signature & Schema',
    description: 'Formats programmatic function calls with strict schemas.',
    content: `Available Tools:
- \`search(query: string)\`: Queries knowledge base
- \`calculate(expr: string)\`: Evaluates mathematical expressions
- \`file_read(path: string)\`: Reads file contents

When invoking a tool, emit JSON:
\`\`\`json
{ "tool": "tool_name", "parameters": { "arg": "value" } }
\`\`\``,
    tags: ['tools', 'schema', 'agentic'],
  },
  ...Array.from({ length: 33 }, (_, i) => ({
    id: `agentic-block-${i + 4}`,
    categoryId: 'agentic',
    name: [
      'Self-Correction Reflection Loop',
      'Long-Term Memory Vector Retrieval',
      'Multi-Agent Debating Committee',
      'Dynamic Task Reprioritization',
      'Environmental State Observer',
      'Hierarchical Sub-Agent Delegator',
      'Execution Log & Audit Trail',
      'Idempotent API Call Wrapper',
      'Agentic Hallucination Checkpoint',
      'Tool Execution Error Retry Handler',
      'Human-in-the-Loop Escalation Gate',
      'Short-Term Working Scratchpad',
      'Goal Drift Detector & Course Corrector',
      'Autonomous Unit Test Runner',
      'Context Pruning for Long Horizons',
      'Multi-Modal Asset Inspector',
      'Asynchronous Event Listener Simulation',
      'Deterministic Consensus Voter',
      'Agent Persona Switching Protocol',
      'Rate-Limit & Backoff Manager',
      'Exploration vs Exploitation Heuristic',
      'Workflow State Checkpoint Snapshot',
      'Sub-Goal Completion Verifier',
      'Task Dependency Directed Graph',
      'Agent Safety Override Interceptor',
      'Telemetry & Token Usage Auditor',
      'Context Window Sliding Buffer',
      'Agent Hand-off Protocol',
      'Blackboard Pattern Coordinator',
      'Tool Argument Sanitizer',
      'Semantic Action Cache',
      'Agent Timeout & Abort Controller',
      'Task Outcome Rubric Evaluator',
    ][i] || `Agentic Protocol #${i + 4}`,
    description: `Autonomous agent execution pattern, memory management, and tool-dispatching.`,
    content: `### Agentic Directive
Role: Autonomous Task Executor
Goal: Accomplish [[agent_goal]] with full self-monitoring.
Maintain internal scratchpad: Record observations, diagnose failures, and execute corrective sub-actions.`,
    tags: ['agentic', 'autonomous', 'workflow'],
  })),

  // ==========================================
  // 10. DIALOGUE (32 blocks)
  // ==========================================
  {
    id: 'dialogue-socratic-interviewer',
    categoryId: 'dialogue',
    name: 'Socratic Interviewer Mode',
    description: 'Interviews user one thoughtful question at a time.',
    content: `You are an expert interviewer. Do NOT generate long monologues.
1. Ask exactly ONE deep, clarifying question at a time.
2. Wait for the user's response.
3. Validate their answer briefly and ask the next logical question to drill deeper into [[topic]].`,
    tags: ['interview', 'socratic', 'dialogue'],
  },
  {
    id: 'dialogue-active-listening',
    categoryId: 'dialogue',
    name: 'Active Listening & Mirroring',
    description: 'Demonstrates deep comprehension before giving feedback.',
    content: `Before offering recommendations:
- Restate the user's emotional and practical core message in your own words ("What I am hearing is...").
- Confirm whether the summary is accurate.
- Then offer tailored, compassionate guidance.`,
    tags: ['empathy', 'active-listening', 'dialogue'],
  },
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `dialogue-block-${i + 3}`,
    categoryId: 'dialogue',
    name: [
      'Customer Support De-Escalation',
      'Consultative Sales Discovery',
      'Job Candidate Technical Interviewer',
      'Roleplay Character Consistency Shield',
      'Multi-Participant Meeting Moderator',
      'Therapeutic Reflection (Non-Clinical)',
      'Debate Sparring Partner',
      'Language Exchange Tutor Conversation',
      'Negotiation Counter-Party Simulation',
      'Mentorship Coaching Session Guide',
      'Context Drift Warning in Dialogue',
      'Turn-Taking & Brevity Enforcement',
      'Humorous Banter & Witticism Flow',
      'Executive Briefing Q&A Protocol',
      'Child-Friendly Conversational Companion',
      'User Onboarding Conversational Wizard',
      'Conflict Resolution Mediation Voice',
      'Feedback Reception & Inquiry Loop',
      'Storytelling Collaborative Co-Writer',
      'Interactive Murder Mystery Host',
      'Medical History Triage Interviewer',
      'Legal Deposition Questioning Cadence',
      'Journalistic Press Conference Scramble',
      'Brainstorming Facilitator Persona',
      'Casual Coffee Chat Persona',
      'Philosophical Dialogue sparring partner',
      'Classroom Professor Office Hours',
      'Bilingual Translation Interpreter',
      'Customer Retention Win-Back Agent',
      'Podcast Co-Host Banter Cadence',
    ][i] || `Dialogue Flow #${i + 3}`,
    description: `Conversational rhythm, turn management, and role interaction patterns.`,
    content: `### Dialogue Directive
Context: Multi-turn interaction regarding [[dialogue_topic]].
Rule: Maintain conversational presence, respect user pacing, and preserve character consistency across all turns.`,
    tags: ['dialogue', 'conversation', 'interactive'],
  })),

  // ==========================================
  // 11. UX DESIGN (26 blocks)
  // ==========================================
  {
    id: 'ux-design-microcopy-audit',
    categoryId: 'ux_design',
    name: 'UX Microcopy & Tone Audit',
    description: 'Crafts clear, human, error-free UI copy and button labels.',
    content: `Audit the following user interface copy for [[feature]]:
- Primary CTA (Clear, benefit-driven verb)
- Secondary CTA (Low friction)
- Error State (Actionable, blame-free)
- Empty State (Helpful, welcoming prompt)
- Tooltip description (Under 15 words)`,
    tags: ['microcopy', 'ui', 'ux_design'],
  },
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `ux-block-${i + 2}`,
    categoryId: 'ux_design',
    name: [
      'User Persona Archetype Blueprint',
      'Customer Journey Map & Emotion Curve',
      'Nielsen 10 Usability Heuristics Audit',
      'Mobile-First Touch Target & Navigation Review',
      'Information Architecture & Card Sorting',
      'Accessibility (WCAG 2.2 AA) Audit',
      'Onboarding Walkthrough Flow Specification',
      'Settings & Preferences Matrix Design',
      'Frictionless Checkout Flow Audit',
      'Dark Mode / Light Mode Contrast Check',
      'Zero-State & First-Run Experience',
      'Progressive Disclosure Interface Pattern',
      'Notification & Alert Taxonomy',
      'Search & Filter Facet Architecture',
      'Form Validation Inline Feedback Design',
      'Dashboard Widget Layout Grid',
      'Mobile Bottom Sheet Interaction Design',
      'Feature Flag & Beta Opt-In Experience',
      'Feedback & Rating Modal UX',
      'Account Deletion & Data Privacy UX',
      'SaaS Tier Comparison Table UX',
      'Multi-Step Wizard Progress Stepper',
      'Breadcrumb & Deep Navigation Flow',
      'Data Table Sorting & Pagination UX',
      'User Interview Protocol & Screener',
    ][i] || `UX Design Block #${i + 2}`,
    description: `User experience architecture, usability rubric, and product design specification.`,
    content: `### UX Architecture Directive
Target: [[user_flow]]
Optimize for user mental models, cognitive load reduction, and seamless progression. Detail affordances and feedback states.`,
    tags: ['ux_design', 'usability', 'product'],
  })),

  // ==========================================
  // 12. CREATIVE (26 blocks)
  // ==========================================
  {
    id: 'creative-worldbuilding-foundations',
    categoryId: 'creative',
    name: 'Immersive Worldbuilding Primer',
    description: 'Fleshes out fictional geography, magic/tech systems, and lore.',
    content: `Develop the foundational worldbuilding for [[setting_concept]]:
1. The Core Anomaly / Magic / Technology System (Rules, limits, and costs)
2. Geopolitical Powers & Social Hierarchy
3. Everyday Life of Commoners vs Elites
4. Sensory Atmosphere (Sounds, smells, visual aesthetics)
5. The Brewing Conflict / Historic Cataclysm`,
    tags: ['worldbuilding', 'fiction', 'creative'],
  },
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `creative-block-${i + 2}`,
    categoryId: 'creative',
    name: [
      'Character Motivation & Flaw Ledger',
      'Screenplay Dialogue Subtext Enricher',
      'Three-Act Narrative Structure Outline',
      'Metaphor & Poetic Imagery Generator',
      'Plot Twist & Foreshadowing Architect',
      'Villain Complex Psychology Profile',
      'Sensory-Rich Scene Setting Opener',
      'Magic System Hard vs Soft Rules Matrix',
      'Sci-Fi Speculative Tech Spec',
      'Comic Book Scene Breakdown Script',
      'Atmospheric Horror Dread Pacing',
      'Epistolary (Letters & Logs) Storytelling',
      'Hero Journey Monomyth Mapping',
      'Romantic Tension & Banter Script',
      'Flash Fiction Under 300 Words',
      'Audio Drama Podcast Script Format',
      'Folklore & Mythological Origin Legend',
      'Satirical Parody & Irony Inversion',
      'Cyberpunk Dystopian Slang Lexicon',
      'Steampunk Mechanical Device Blueprint',
      'Time-Travel Paradox Logic Check',
      'Alien Ecosystem Biological Flora/Fauna',
      'Historical Fiction Anachronism Polish',
      'Interactive Choice-Based Story Branch',
      'Dramatic Climax Pacing Escalator',
    ][i] || `Creative Block #${i + 2}`,
    description: `Imaginative writing, narrative craft, and worldbuilding framework.`,
    content: `### Creative Narrative Brief
Subject: [[story_element]]
Infuse sensory depth, psychological tension, distinctive voice, and resonance into the piece. Avoid narrative clichés.`,
    tags: ['creative', 'storytelling', 'art'],
  })),

  // ==========================================
  // 13. IDEATION (26 blocks)
  // ==========================================
  {
    id: 'ideation-scamper-matrix',
    categoryId: 'ideation',
    name: 'SCAMPER Creative Ideation',
    description: 'Systematic innovation framework for existing products.',
    content: `Apply the SCAMPER framework to [[product_or_concept]]:
- Substitute: What materials, components, or steps can be swapped?
- Combine: What unrelated service can be blended in?
- Adapt: What can be copied from nature or other industries?
- Modify/Magnify: What if we increased scale or power by 10x?
- Put to another use: Who else could benefit?
- Eliminate: What happens if we remove the core feature?
- Reverse/Rearrange: What if we reversed the sequence?`,
    tags: ['scamper', 'brainstorming', 'ideation'],
  },
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `ideation-block-${i + 2}`,
    categoryId: 'ideation',
    name: [
      'Crazy Eights Rapid Concept Sprint',
      'Cross-Domain Analogy Synthesis',
      'Six Thinking Hats Perspective Rotation',
      'Assumption Busting & What-If Scenarios',
      'Worst Possible Idea Inversion',
      'Trend Intersection Multiplier',
      'Blue Ocean Value Innovation Canvas',
      'Random Stimulus Word Association',
      '10x Moonshot vs 10% Optimization',
      'Customer Pain-to-Delight Inverter',
      'Extreme Persona User Testing',
      'Future-Backwards Scenario Planning',
      'Biomimicry Nature-Inspired Solutions',
      'Platformization of Single Utilities',
      'Gamification Mechanic Injector',
      'Micro-SaaS Unbundling Ideas',
      'Zero-Cost Marketing Stunt Brainstorm',
      'Viral Coefficient Mechanic Generator',
      'Disruptive Pricing Model Concepts',
      'Community-Driven Feature Ideas',
      'Ethical Tech Counter-Concepts',
      'Hardware to Software Transformation',
      'B2C to Enterprise Pivot Concepts',
      'Low-Tech Analog Alternatives',
      'Automated Workflow Opportunity Finder',
    ][i] || `Ideation Framework #${i + 2}`,
    description: `Brainstorming engine, lateral thinking catalyst, and concept generator.`,
    content: `### Lateral Ideation Protocol
Focus: [[innovation_target]]
Generate bold, unconstrained, yet structurally viable concepts. Prioritize asymmetric leverage and novel category creation.`,
    tags: ['ideation', 'brainstorming', 'lateral'],
  })),

  // ==========================================
  // 14. CODING (32 blocks)
  // ==========================================
  {
    id: 'coding-refactoring-clean-code',
    categoryId: 'coding',
    name: 'Clean Code & SOLID Refactoring',
    description: 'Refactors messy code with strict clean architecture and typing.',
    content: `Refactor this code:
\`\`\`[[language]]
[[code_snippet]]
\`\`\`
Requirements:
1. Apply Single Responsibility and clean abstractions.
2. Eliminate code duplication (DRY) and magic literals.
3. Enhance type safety and handle edge cases gracefully.
4. Provide the complete refactored code followed by a bulleted summary of improvements.`,
    tags: ['refactoring', 'clean-code', 'coding'],
  },
  {
    id: 'coding-unit-test-coverage',
    categoryId: 'coding',
    name: 'Robust Unit Test Suite (Edge Cases Included)',
    description: 'Generates comprehensive unit tests covering boundaries.',
    content: `Write a robust unit test suite for:
\`\`\`[[language]]
[[target_function]]
\`\`\`
Test Suite Must Cover:
- Happy path standard execution
- Boundary conditions (empty input, null, max size)
- Error throwing and invalid input validation
- Async rejection / timeout scenarios`,
    tags: ['testing', 'unit-tests', 'coding'],
  },
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `coding-block-${i + 3}`,
    categoryId: 'coding',
    name: [
      'Bug Triage & Root Cause Diagnosis',
      'TypeScript Strict Type Definition Generator',
      'SQL Query Optimization & Indexing Advisor',
      'Algorithm Time & Space Complexity Profiler',
      'Security Vulnerability & OWASP Audit',
      'API RESTful Endpoint Designer',
      'GraphQL Schema & Resolver Architect',
      'Docker Compose & Containerization Spec',
      'Regex Builder with Interactive Test Cases',
      'Git Commit Message & PR Description Generator',
      'Concurrency & Race Condition Analyzer',
      'CSS Tailwind Responsive Layout Builder',
      'React Hook Custom Abstraction Builder',
      'Memory Leak & Garbage Collection Diagnostic',
      'Data Migration Script with Rollback',
      'CI/CD GitHub Actions Workflow Config',
      'WebSocket Real-Time Protocol Spec',
      'Microservices Event-Driven Architecture Review',
      'Dependency Upgrade & Breaking Changes Audit',
      'CLI Tool Command Interface Generator',
      'State Management Architecture (Zustand/Redux)',
      'Web Worker Multithreading Offloader',
      'Bash Automation Script with Error Traps',
      'WebAssembly Module Interface Spec',
      'Code Documentation & JSDoc Annotator',
      'Protobuf & gRPC Service Contract',
      'Database Schema Normalization (3NF)',
      'Design Pattern Implementation (Factory/Observer)',
      'Legacy Code Modernization Roadmap',
      'Accessibility ARIA Keyboard Navigation Code',
    ][i] || `Coding Utility #${i + 3}`,
    description: `Software engineering, code review, debugging, and systems architecture.`,
    content: `### Software Engineering Directive
Stack: [[tech_stack]]
Task: Provide an engineering solution for [[programming_task]]. Deliver production-grade, typed, and well-commented code.`,
    tags: ['coding', 'engineering', 'typescript'],
  })),

  // ==========================================
  // 15. BUSINESS (26 blocks)
  // ==========================================
  {
    id: 'business-gtm-playbook',
    categoryId: 'business',
    name: 'Go-To-Market (GTM) Strategy Playbook',
    description: 'Complete commercial launch blueprint and channel strategy.',
    content: `Build an actionable GTM Playbook for [[product_name]]:
1. Target Customer Profile (ICP) & Buying Committee
2. Core Value Proposition & Positioning Hook
3. Primary Acquisition Channels (Organic, Paid, Outbound, Partnerships)
4. Pricing Model & Initial Packaging Tiers
5. First 90 Days Execution Milestones`,
    tags: ['gtm', 'strategy', 'business'],
  },
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `business-block-${i + 2}`,
    categoryId: 'business',
    name: [
      'SaaS Unit Economics & LTV/CAC Engine',
      'Pitch Deck 10-Slide Storyboard',
      'B2B Enterprise Pricing Strategy',
      'Strategic Moat & Defensibility Analysis',
      'Cold Outbound Cadence for B2B Sales',
      'Customer Success Retention & Onboarding Playbook',
      'Competitor Battlecard & Differentiation Matrix',
      'Mergers & Acquisitions Synergy Evaluation',
      'Product-Led Growth (PLG) Flywheel Design',
      'Franchise & Licensing Expansion Model',
      'Board of Directors Meeting Executive Memo',
      'OKR (Objectives & Key Results) Cascade',
      'Sales Commission & Compensation Structure',
      'Brand Architecture & House of Brands Strategy',
      'Supply Chain Vendor RFP Evaluation',
      'Cash Flow Runway & Burn Reduction Plan',
      'Customer Referral & Affiliate Program Spec',
      'Enterprise SLA Contract Term Recommendations',
      'Omnichannel Retail Distribution Plan',
      'Crisis Public Relations Statement & Action',
      'Market Entry International Localization Plan',
      'Venture Debt vs Equity Financing Analysis',
      'Key Employee Equity Incentive Pool Model',
      'Strategic Partnership Term Sheet Checklist',
      'Annual Operating Budget Allocation Matrix',
    ][i] || `Business Strategy Module #${i + 2}`,
    description: `Commercial strategy, unit economics, executive governance, and revenue optimization.`,
    content: `### Executive Commercial Brief
Enterprise: [[business_context]]
Analyze business model leverage, profit margins, and strategic defensibility. Deliver actionable commercial guidance.`,
    tags: ['business', 'strategy', 'finance'],
  })),

  // ==========================================
  // 16. DATA & KNOWLEDGE (26 blocks)
  // ==========================================
  {
    id: 'data-sql-query-architect',
    categoryId: 'data_knowledge',
    name: 'Enterprise SQL Analytics Query Builder',
    description: 'Generates complex window functions, CTEs, and aggregated queries.',
    content: `Write an optimized SQL query for [[database_dialect]]:
Business Question: [[analytics_question]]
Tables Available:
[[table_schemas]]
Requirements:
- Use clear Common Table Expressions (CTEs).
- Apply window functions for ranking/partitioning.
- Add explanatory comments for complex joins.`,
    tags: ['sql', 'analytics', 'data_knowledge'],
  },
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `data-block-${i + 2}`,
    categoryId: 'data_knowledge',
    name: [
      'Knowledge Graph Ontology & Taxonomy Design',
      'Data Warehouse Star Schema Modeling',
      'ETL / ELT Pipeline Architecture Spec',
      'Statistical Hypothesis Testing Plan (A/B Test)',
      'Vector Embedding Similarity Search Strategy',
      'Data Quality & Anomaly Detection Rules',
      'Customer Segmentation Clustering Analysis',
      'Time-Series Forecasting Model Selection',
      'GDPR & CCPA Data Governance Checklist',
      'Dashboard KPI Hierarchy Design',
      'Natural Language to SQL Translation Anchor',
      'Feature Engineering for Machine Learning',
      'Log Parsing & Regular Expression Extractor',
      'Entity Extraction & Disambiguation Rules',
      'Data Catalog & Metadata Dictionary',
      'Cohort Analysis Matrix Formula Builder',
      'Data Pipeline Backfill Strategy',
      'Streaming Data Kafka Topic Architecture',
      'Data Cleansing & Deduplication Heuristic',
      'Sentiment Analysis Lexicon & Scoring Model',
      'Correlation vs Causation Diagnostic',
      'Business Intelligence Semantic Layer Spec',
      'Data Lineage & Provenance Tracker',
      'Predictive Churn Risk Scoring Model',
      'Synthetic Data Generation Blueprint',
    ][i] || `Data Architecture Block #${i + 2}`,
    description: `Data engineering, analytical modeling, semantic taxonomies, and knowledge design.`,
    content: `### Data Intelligence Protocol
Dataset: [[dataset_description]]
Design a structured schema and analytical extraction routine to extract high-confidence business insights.`,
    tags: ['data_knowledge', 'analytics', 'database'],
  })),
];
