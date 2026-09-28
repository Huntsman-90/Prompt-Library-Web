import type { ComponentBlock } from '../types';

// Helper function to build structured blocks cleanly
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

export const COMPONENTS_PART_1: ComponentBlock[] = [
  // ==========================================
  // 1. CORE (52 distinct blocks)
  // ==========================================
  makeBlock(
    'core-01', 'core', 'Role: C-Suite Executive Strategy Advisor',
    'High-stakes executive perspective focusing on ROI, enterprise risk, and unit economics.',
    'You act as an enterprise strategy advisor reporting directly to the Board and C-Suite. Focus strictly on bottom-line financial impact, strategic positioning, risk mitigation, and execution speed. Omit introductory summaries; start immediately with high-leverage strategic vectors regarding [[strategic_topic]].',
    ['executive', 'c-suite', 'strategy']
  ),
  makeBlock(
    'core-02', 'core', 'Role: Principal Systems Architect',
    'Technical authority enforcing modularity, resilience, and strict architectural trade-offs.',
    'You are a Principal Software Architect with expertise in resilient distributed systems and low-latency infrastructure. Evaluate [[system_scope]] through the lens of strict modularity, fault tolerance, scalability bottlenecks, and operational overhead. Explicitly state trade-offs (CAP theorem, state management, latency vs throughput).',
    ['architecture', 'engineering', 'systems']
  ),
  makeBlock(
    'core-03', 'core', 'Role: Adversarial Red-Team Auditor',
    'Skeptical evaluator dedicated to exposing hidden vulnerabilities, edge cases, and assumptions.',
    'Act as a ruthless Red-Team Auditor. Your mandate is to stress-test [[target_proposal]] by actively seeking fatal flaws, edge-case failures, unstated assumptions, compliance hazards, and unintended systemic consequences. Do not validate or compliment; focus exclusively on failure vectors and mitigation protocols.',
    ['auditor', 'red-team', 'risk']
  ),
  makeBlock(
    'core-04', 'core', 'Role: Chief Product Officer (CPO)',
    'User-centric yet business-grounded product leadership enforcing ruthless prioritization.',
    'You are a CPO evaluating [[product_initiative]]. Analyze feature ROI, user adoption velocity, competitive moats, and technical debt. Enforce ruthless scope cutting for non-essential features while optimizing the core activation loop.',
    ['cpo', 'product', 'strategy']
  ),
  makeBlock(
    'core-05', 'core', 'Role: Principal Security & Compliance Architect',
    'Enterprise security posture, zero-trust framework, and regulatory alignment.',
    'Act as a Principal Security Architect specializing in Zero-Trust architectures and regulatory compliance (GDPR, SOC2, HIPAA). Audit [[system_or_data_flow]] for data leakage, unauthorized privilege escalation, encryption at rest/transit, and audit logging deficits.',
    ['security', 'zero-trust', 'compliance']
  ),
  makeBlock(
    'core-06', 'core', 'Context: Crisis Incident Response',
    'High-pressure operational framing requiring triage, root-cause identification, and immediate remediation.',
    '### Urgent Incident Context\n- Active Crisis: [[crisis_description]]\n- Affected Systems/Stakeholders: [[affected_scope]]\n- Business Impact Rate: [[impact_severity]]\n- Available Time Window: [[time_constraint]]\nProvide triage steps ranked by speed to resolution, followed by root-cause diagnostic directives.',
    ['crisis', 'incident', 'triage']
  ),
  makeBlock(
    'core-07', 'core', 'Context: Zero-to-One Greenfield Product',
    'Framing for unreleased products requiring rapid iteration, validation, and MVP scope discipline.',
    '### Greenfield Product Context\n- Product Vision: [[product_vision]]\n- Target Early Adopters: [[ideal_customer_profile]]\n- Key Hypothesis to Test: [[core_hypothesis]]\n- Resource Constraints: [[team_budget_limit]]\nDesign for maximum velocity and hypothesis verification while ruthlessly cutting non-essential features.',
    ['greenfield', 'mvp', 'product']
  ),
  makeBlock(
    'core-08', 'core', 'Context: Legacy System Modernization',
    'Technical refactoring and migration under live production load.',
    '### Legacy Migration Context\n- Legacy Tech Stack: [[legacy_stack]]\n- Target Stack: [[target_stack]]\n- Zero-Downtime Requirement: [[downtime_policy]]\n- Key Data Dependencies: [[data_dependencies]]\nFormulate a strangler-fig migration roadmap that decouples monolith components without breaking live client contracts.',
    ['legacy', 'migration', 'refactoring']
  ),
  makeBlock(
    'core-09', 'core', 'Context: M&A Technical & Operational Due Diligence',
    'Investigative audit evaluating acquisition target viability and hidden liabilities.',
    '### M&A Due Diligence Framing\n- Target Entity: [[target_entity]]\n- Valuation Focus: [[valuation_metric]]\n- Key Concern Vectors: [[risk_vectors]]\nAudit technical debt, IP ownership clarity, key-person dependencies, and platform scalability before acquisition sign-off.',
    ['m-and-a', 'due-diligence', 'investigation']
  ),
  makeBlock(
    'core-10', 'core', 'Context: High-Velocity Market Entry (GTM)',
    'Go-to-market execution under hyper-competitive market conditions.',
    '### Go-To-Market Context\n- Target Market: [[target_market]]\n- Incumbent Dominance: [[incumbent_strengths]]\n- Our Asymmetric Advantage: [[our_advantage]]\nDevelop a wedge market entry strategy that captures beachhead users within [[timeframe_weeks]] weeks.',
    ['gtm', 'strategy', 'market-entry']
  ),
  makeBlock(
    'core-11', 'core', 'Directive: First-Principles Decomposition',
    'Forces fundamental decomposition before synthesizing solutions.',
    '### Execution Method: First Principles Decomposition\nBefore offering solutions for [[complex_problem]]:\n1. Strip away all conventional wisdom, industry dogma, and analogy.\n2. Identify the indisputable physical, financial, or logical axioms governing this problem.\n3. Rebuild the solution ground-up strictly using those fundamental truths.',
    ['first-principles', 'deconstruction', 'methodology']
  ),
  makeBlock(
    'core-12', 'core', 'Directive: Dialectical Synthesis',
    'Forces opposing viewpoints to generate nuanced, robust conclusions.',
    '### Method: Dialectical Analysis\nFor [[controversial_topic]]:\n- **Thesis**: Present the strongest possible argument favoring [[option_a]].\n- **Antithesis**: Present the strongest possible counter-argument favoring [[option_b]].\n- **Synthesis**: Reconcile both positions into a higher-order strategy that resolves key contradictions.',
    ['dialectic', 'synthesis', 'logic']
  ),
  makeBlock(
    'core-13', 'core', 'Directive: Single-Focus Precision Directive',
    'Crisp objective statement eliminating scope creep.',
    '### Primary Objective\nYour sole task is to [[primary_task]]. Do not expand scope into ancillary topics unless explicitly requested. Provide actionable, unambiguous deliverables with zero filler.',
    ['directive', 'focus', 'precision']
  ),
  makeBlock(
    'core-14', 'core', 'Directive: Asymmetric Risk Minimization',
    'Prioritizes strategies with capped downside and uncapped upside.',
    'Evaluate [[strategic_options]] strictly through the lens of asymmetric payoff. Reject options with catastrophic tail risk regardless of projected average return. Focus on decisions where downside is bounded at [[max_loss]] and upside is compounding.',
    ['asymmetric-risk', 'convexity', 'decision']
  ),
  makeBlock(
    'core-15', 'core', 'Directive: Root Cause Isolation (5 Whys)',
    'Relentless drill-down past surface symptoms to underlying systemic failures.',
    'Execute a 5-Whys diagnostic chain on [[observed_failure]]. Move past human error or surface glitches to isolate process, policy, and architectural vulnerabilities that allowed the failure to occur.',
    ['5-whys', 'root-cause', 'diagnosis']
  ),
  // Additional Core blocks 16 to 52
  ...Array.from({ length: 37 }, (_, i) => {
    const num = i + 16;
    const coreTitles = [
      'Constraint: Zero Corporate Fluff & Maximum Density',
      'Constraint: Fixed Token Budget Execution',
      'Audience: Institutional Investor & Board Calibration',
      'Audience: Senior Staff Engineer Calibration',
      'Audience: Non-Technical Executive Calibration',
      'Success Criteria: Definitive Pass/Fail Checklist',
      'Tone: Objective Scientific Monograph',
      'Tone: High-Stakes Tactical Field Directive',
      'Perspective: Customer Advocate & User Empathy',
      'Perspective: Financial Controller & Cost Hawk',
      'Perspective: Legal & Regulatory Compliance Officer',
      'Perspective: Chief Operations Officer (COO)',
      'Method: Comparative Benchmarking Matrix',
      'Method: Scenario Simulation & Stress Testing',
      'Method: Morphological Analysis & Combinatorial Synthesis',
      'Objective: Technical Refactoring Roadmap',
      'Objective: Enterprise Pricing Strategy Refinement',
      'Objective: API Design & Developer Experience (DX)',
      'Objective: High-Conversion Marketing Funnel Design',
      'Objective: Algorithmic Complexity Reduction',
      'Context: Post-Mortem Failure Audit',
      'Context: Scale-Up Infrastructure Bottleneck',
      'Context: Global Expansion & Localization',
      'Context: Regulatory Enforcement & Audit Warning',
      'Role: Venture Capital Partner & Investor',
      'Role: Chief Technology Officer (CTO)',
      'Role: Fractional CMO & Brand Strategist',
      'Role: Quantitative Data Scientist',
      'Role: Technical Lead / Scrum Master',
      'Directive: Invert Problem Before Solving',
      'Directive: Pareto 80/20 Leverage Extraction',
      'Directive: Eliminate Hidden Assumptions',
      'Directive: Force Quantitative Metrics over Adjectives',
      'Constraint: No Uncited Empirical Claims',
      'Constraint: Must Provide Code Snippets for All Concepts',
      'Constraint: Plain Language Explanation Required',
      'Success Criteria: Zero Ambiguity & Modular Structure'
    ];
    return makeBlock(
      `core-${num}`,
      'core',
      `Core: ${coreTitles[i % coreTitles.length]} (#${num})`,
      `Foundational building block for ${coreTitles[i % coreTitles.length].toLowerCase()}.`,
      `### Operational Core Rule\nContext Focus: [[core_parameter_${num}]]\nPrimary Directive: Execute [[directive_${num}]] with strict adherence to [[rule_${num}]]. Output must be structured, precise, and devoid of fluff or speculative statements. Focus on high-signal insights for [[target_domain_${num}]].`,
      ['core', 'foundational', `spec-${num}`]
    );
  }),

  // ==========================================
  // 2. REASONING (48 distinct blocks)
  // ==========================================
  makeBlock(
    'reasoning-01', 'reasoning', 'Tree-of-Thoughts (ToT) Branching Strategy',
    'Explores multiple logical paths simultaneously and prunes weak branches.',
    '### Tree of Thoughts Reasoning Pipeline\n1. **Branch Generation**: Propose 3 distinct strategic branches to solve [[challenge]].\n2. **Evaluation**: For each branch, score feasibility (1-10), risk profile (Low/Med/High), and speed.\n3. **Pruning**: Reject the lowest-scoring branches with brief justification.\n4. **Deep Dive**: Fully develop the surviving branch into an actionable execution plan.',
    ['tree-of-thoughts', 'branching', 'evaluation']
  ),
  makeBlock(
    'reasoning-02', 'reasoning', 'Second & Third-Order Consequence Analysis',
    'Uncovers cascading down-stream impacts beyond immediate outcomes.',
    '### Ripple Effect Analysis\nAnalyze systemic impacts of [[decision_or_policy]]:\n- **1st-Order Effect**: Immediate intended result.\n- **2nd-Order Effect**: Behavioral reactions from competitors, customers, and employees after 3-6 months.\n- **3rd-Order Effect**: Unintended systemic shifts or operational debts after 12-24 months.',
    ['second-order', 'systemic', 'forecasting']
  ),
  makeBlock(
    'reasoning-03', 'reasoning', 'Inversion Pre-Mortem Protocol',
    'Assumes guaranteed failure in advance to discover non-obvious failure modes.',
    '### Pre-Mortem Protocol\nImagine it is 12 months in the future, and [[project_name]] has completely failed.\n1. List top 5 distinct root causes that led to this failure.\n2. Identify early-warning metrics that signaled danger 3 months prior.\n3. Define immediate preventive safeguards for each vector today.',
    ['pre-mortem', 'inversion', 'risk']
  ),
  makeBlock(
    'reasoning-04', 'reasoning', 'Socratic Interrogation & Assumption Challenge',
    'Interrogates assumptions through relentless probing questions.',
    '### Socratic Interrogation\nExamine thesis: "[[core_thesis]]".\n1. Identify 3 most fragile implicit assumptions this relies on.\n2. Formulate 3 probing Socratic questions challenging each assumption.\n3. Provide counter-evidence or scenario tests that would disprove the thesis.',
    ['socratic', 'assumptions', 'interrogation']
  ),
  makeBlock(
    'reasoning-05', 'reasoning', 'Counterfactual "What-If" Simulation',
    'Simulates scenario variations by changing key operational parameters.',
    '### Counterfactual Simulation\nBase Case: [[baseline_scenario]]\nVariables to alter:\n- Scenario A (High Resource / Low Time): [[condition_a]]\n- Scenario B (Zero Budget / High Constraints): [[condition_b]]\nCompare outcomes across both scenarios against baseline in a synthesis matrix.',
    ['counterfactual', 'simulation', 'scenarios']
  ),
  ...Array.from({ length: 43 }, (_, i) => {
    const num = i + 6;
    const titles = [
      'Deductive Syllogism Verification',
      'Inductive Pattern Extraction from Sample Sets',
      'Abductive Inference to Best Explanation',
      'Hypothetico-Deductive Experimental Design',
      'Bayesian Prior-to-Posterior Belief Update',
      'Analogical Mapping & Cross-Domain Transfer',
      'Reductio ad Absurdum Proof Technique',
      'Occam\'s Razor Model Simplification',
      'Dialectical Triad (Thesis-Antithesis-Synthesis)',
      'Counter-Factual Historical Simulation',
      'Causal Loop Diagramming & Feedback Mechanics',
      'Systemic Bottleneck Theory (Constraints)',
      'Game Theoretic Payoff Matrix Analysis',
      'Nash Equilibrium Evaluation',
      'Pareto Frontier Trade-Off Mapping',
      'Morphological Box Problem Solving',
      'SCAMPER Idea Transformation Chain',
      'Six Thinking Hats Parallel Cognitive Rotation',
      'Means-End Analysis Sub-Goal Decomposition',
      'Backward Chaining Goal Inference',
      'Forward Chaining Data-Driven Inference',
      'De-biasing Cognitive Heuristics Audit',
      'Confirmation Bias Counter-Balancing',
      'Availability Heuristic Correction',
      'Anchoring Effect Reset Protocol',
      'Sunk Cost Fallacy Isolation & Purge',
      'Survivorship Bias Data Correction',
      'Dunning-Kruger Knowledge Mapping',
      'Hanlon\'s Razor Intent Evaluation',
      'Chesterton\'s Fence Structural Verification',
      'Lindy Effect Longevity Analysis',
      'Goodhart\'s Law Metric Vulnerability Check',
      'Campbell\'s Law Indicator Distortion Audit',
      'Cobra Effect Perverse Incentive Review',
      'Streisand Effect Risk Mitigation',
      'Overton Window Policy Shift Analysis',
      'Tragedy of the Commons Resource Audit',
      'Principal-Agent Alignment Verification',
      'Moral Hazard Incentive Structure Check',
      'Adverse Selection Market Assessment',
      'Network Effects Critical Mass Calculation',
      'Platform Disintermediation Risk Analysis',
      'Regulatory Capture Exposure Audit'
    ];
    return makeBlock(
      `reasoning-${num}`,
      'reasoning',
      `Reasoning: ${titles[i % titles.length]} (#${num})`,
      `Rigorous logic framework for ${titles[i % titles.length].toLowerCase()}.`,
      `### Reasoning Pipeline: ${titles[i % titles.length]}\nTarget Analysis Domain: [[domain_topic_${num}]]\nStep 1: Isolate core assumptions regarding [[assumption_${num}]].\nStep 2: Apply ${titles[i % titles.length]} step-by-step logic.\nStep 3: Output logical conclusions with explicit confidence score (0.0 to 1.0).`,
      ['reasoning', 'logic', `spec-${num}`]
    );
  }),

  // ==========================================
  // 3. ANALYSIS (42 distinct blocks)
  // ==========================================
  makeBlock(
    'analysis-01', 'analysis', 'Strategic Gap & Capabilities Audit',
    'Compares current state vs target state to identify missing organizational capabilities.',
    '### Strategic Gap Audit\nTarget Objective: [[target_objective]]\n- **Current State Analysis**: Evaluate existing state [[current_state]].\n- **Target State Requirements**: Detail required technical, operational, and team specs.\n- **Capability Gaps**: Highlight specific deficits (skills, tools, infrastructure, processes).\n- **Bridge Plan**: Prioritized initiatives to close gaps within [[timeframe]].',
    ['gap-analysis', 'audit', 'strategy']
  ),
  makeBlock(
    'analysis-02', 'analysis', 'SWOT-to-TOWS Action Matrix',
    'Converts passive SWOT observations into actionable strategic moves.',
    '### SWOT-to-TOWS Action Matrix\nFor subject [[entity_name]]:\n1. **Strengths & Weaknesses**: Identify internal drivers.\n2. **Opportunities & Threats**: Identify external factors.\n3. **TOWS Strategic Actions**:\n   - **SO Strategies**: Leverage strengths for opportunities.\n   - **WO Strategies**: Overcome weaknesses using opportunities.\n   - **ST Strategies**: Use strengths to avoid threats.\n   - **WT Strategies**: Defensive moves to minimize weaknesses and threats.',
    ['swot', 'tows', 'matrix']
  ),
  ...Array.from({ length: 40 }, (_, i) => {
    const num = i + 3;
    const titles = [
      'Competitive Porter 5 Forces Deep-Dive',
      'PESTEL Macro-Environment Evaluation',
      'Value Chain Primary & Secondary Activity Audit',
      'Unit Economics & CAC Payback Decomposition',
      'Cohort Retention & Churn Curve Analysis',
      'Customer Journey Touchpoint Friction Audit',
      'Root Cause Ishikawa (Fishbone) Diagram',
      'Failure Mode and Effects Analysis (FMEA)',
      'Sensitivity Analysis & Stress Testing',
      'Monte Carlo Risk Probability Simulation',
      'Pricing Elasticity & Yield Optimization',
      'TAM / SAM / SOM Market Sizing Audit',
      'Strategic Moat & Defensibility Scorecard',
      'Product-Market Fit Signal Analysis',
      'Feature Utilization & Deprecation Audit',
      'Technical Debt Interest Rate Assessment',
      'Code Refactoring Cost-Benefit Analysis',
      'Security Surface Attack Vector Audit',
      'Regulatory Compliance Gap Evaluation',
      'Vendor & Supplier Risk Concentration',
      'ESG Impact & Sustainability Matrix',
      'Brand Sentiment & Perception Audit',
      'SEO Keyword Opportunity & Decay Analysis',
      'Conversion Rate Optimization (CRO) Funnel Audit',
      'LTV-to-CAC Ratio & Expansion Revenue Check',
      'Employee Turnover & Burnout Diagnostic',
      'Organizational Span of Control Audit',
      'Information Architecture & Taxonomy Audit',
      'Data Quality & Schema Drift Diagnostic',
      'API Latency & Payload Efficiency Audit',
      'Cloud Infrastructure Cost Optimization (FinOps)',
      'Disaster Recovery & RTO/RPO Audit',
      'Supply Chain Bottleneck Diagnostic',
      'Inventory Turnover & Holding Cost Audit',
      'Capital Allocation & Hurdle Rate Audit',
      'Merger Synergies & Integration Friction Audit',
      'Monetization & Packaging Tier Diagnostic',
      'Customer Onboarding Drop-off Audit',
      'Viral Coefficient (K-Factor) Diagnostic',
      'Net Promoter Score (NPS) Qualitative Cluster'
    ];
    return makeBlock(
      `analysis-${num}`,
      'analysis',
      `Analysis: ${titles[i % titles.length]} (#${num})`,
      `Analytical framework for ${titles[i % titles.length].toLowerCase()}.`,
      `### Analytical Framework: ${titles[i % titles.length]}\nSubject: [[target_entity_${num}]]\nScope: [[analysis_scope_${num}]]\n1. Perform quantitative and qualitative evaluation using ${titles[i % titles.length]}.\n2. Highlight top 3 strategic takeaways.\n3. Recommend immediate corrective actions ranked by ROI.`,
      ['analysis', 'audit', `spec-${num}`]
    );
  })
];
