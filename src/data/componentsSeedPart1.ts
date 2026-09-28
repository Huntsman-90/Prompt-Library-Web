import type { ComponentBlock } from '../types';

export const COMPONENTS_PART_1: ComponentBlock[] = [
  // ==========================================
  // 1. CORE (45 blocks)
  // ==========================================
  {
    id: 'core-role-senior-advisor',
    categoryId: 'core',
    name: 'Role: Senior Strategic Advisor',
    description: 'Establishes high-level authoritative consulting persona.',
    content: `You are acting as an elite strategic advisor with 20+ years of cross-disciplinary expertise in [[domain]]. Your counsel is expected to be direct, pragmatically grounded, intellectually rigorous, and focused on high-leverage outcomes.`,
    tags: ['persona', 'authority', 'core'],
  },
  {
    id: 'core-context-situational',
    categoryId: 'core',
    name: 'Context: Situational Overview',
    description: 'Frames the operating environment and current friction.',
    content: `### Current Context
- Target Environment: [[environment]]
- Current Bottleneck: [[bottleneck]]
- Primary Stakeholders: [[stakeholders]]
- Target Deadline: [[deadline]]`,
    tags: ['context', 'framing', 'core'],
  },
  {
    id: 'core-task-directive',
    categoryId: 'core',
    name: 'Task: Single Focus Directive',
    description: 'Crisp objective statement eliminating ambiguity.',
    content: `### Primary Objective
Your sole task is to [[primary_task]]. Do not expand scope into ancillary topics unless explicitly requested. Provide actionable, unambiguous deliverables.`,
    tags: ['task', 'directive', 'core'],
  },
  {
    id: 'core-constraints-general',
    categoryId: 'core',
    name: 'Constraints: Universal Rules',
    description: 'Negative boundaries and quality checks.',
    content: `### Operational Constraints
1. Avoid generic platitudes, buzzwords, or introductory fluff.
2. Adhere strictly to the requested format and word budget of [[max_words]] words.
3. If information is ambiguous, state your underlying assumptions clearly before proceeding.`,
    tags: ['constraints', 'rules', 'core'],
  },
  {
    id: 'core-audience-adaptation',
    categoryId: 'core',
    name: 'Audience: Cognitive Calibration',
    description: 'Calibrates tone and technical depth to target audience.',
    content: `### Target Audience
The reader is a [[audience_role]] with [[expertise_level]] knowledge. Adjust technical vocabulary, conceptual density, and mental models accordingly.`,
    tags: ['audience', 'tone', 'core'],
  },
  {
    id: 'core-success-criteria',
    categoryId: 'core',
    name: 'Success Criteria: Definition of Done',
    description: 'Concrete verification checklist for the generated output.',
    content: `### Criteria for Excellence
The response is successful if and only if:
- [ ] Resolves [[core_problem]] completely.
- [ ] Directly cites or applies [[key_principle]].
- [ ] Contains zero speculative statements without caveats.`,
    tags: ['validation', 'success', 'core'],
  },
  {
    id: 'core-tone-matter-of-fact',
    categoryId: 'core',
    name: 'Tone: Matter-of-Fact & Objective',
    description: 'Strikes an analytical, calm, zero-hype tone.',
    content: `Maintain an objective, dispassionate, and analytical tone. Treat the topic with empirical seriousness; prioritize precision over rhetorical persuasion.`,
    tags: ['tone', 'style', 'core'],
  },
  {
    id: 'core-format-executive-brief',
    categoryId: 'core',
    name: 'Format: Executive Brief',
    description: 'Structuring for busy executives.',
    content: `Structure your deliverable as an Executive Brief:
1. Executive Summary (Max 3 sentences)
2. Strategic Implications
3. Core Findings & Data
4. Recommended Immediate Actions (Top 3)`,
    tags: ['format', 'executive', 'core'],
  },
  {
    id: 'core-variable-injection',
    categoryId: 'core',
    name: 'Variable: Key Assumptions Matrix',
    description: 'Explicit list of working assumptions.',
    content: `### Baseline Assumptions
- Budget Limit: [[budget]]
- Primary Constraint: [[hard_limit]]
- Acceptable Risk Tolerance: [[risk_level]]`,
    tags: ['variables', 'matrix', 'core'],
  },
  {
    id: 'core-scope-boundary',
    categoryId: 'core',
    name: 'Scope: In-Scope vs Out-of-Scope',
    description: 'Defines crisp operational perimeters.',
    content: `### Scope Perimeters
- **In-Scope**: [[included_topics]]
- **Out-of-Scope**: [[excluded_topics]]. Explicitly decline analyzing out-of-scope items.`,
    tags: ['scope', 'boundary', 'core'],
  },
  {
    id: 'core-few-shot-anchor',
    categoryId: 'core',
    name: 'Few-Shot: Pattern Anchor',
    description: 'Exemplar pair to guide structural consistency.',
    content: `### Exemplar Input/Output
**Input:** [[sample_input]]
**Output:** [[sample_output]]

Now process the current input following this exact depth and cadence:`,
    tags: ['few-shot', 'examples', 'core'],
  },
  {
    id: 'core-system-instruction',
    categoryId: 'core',
    name: 'System: Core Integrity Directive',
    description: 'Fundamental operating instruction for consistency.',
    content: `You must remain strictly grounded in verified facts, maintain consistency across logical assertions, and never contradict your established premises.`,
    tags: ['system', 'integrity', 'core'],
  },
  {
    id: 'core-urgency-framing',
    categoryId: 'core',
    name: 'Pacing: Crisis & Triage',
    description: 'Forces triage prioritizing high urgency items.',
    content: `Treat this situation as high-velocity triage. Sort all insights into:
- Tier 1: Actionable within 24 hours
- Tier 2: Mitigate within 7 days
- Tier 3: Strategic monitor`,
    tags: ['triage', 'urgency', 'core'],
  },
  {
    id: 'core-negative-prompting',
    categoryId: 'core',
    name: 'Negative Rules: Anti-Patterns',
    description: 'Prohibits specific unwanted expressions.',
    content: `### Do NOT Do The Following:
- Do NOT use filler words ("In conclusion", "It is important to remember", "Delve").
- Do NOT use passive voice where active voice is possible.
- Do NOT provide non-committal answers like "it depends" without mapping the branches.`,
    tags: ['negative', 'filters', 'core'],
  },
  {
    id: 'core-iteration-trigger',
    categoryId: 'core',
    name: 'Loop: Self-Correction Protocol',
    description: 'Commands internal review before final output.',
    content: `Before finalizing your answer, review your draft against [[standard]]. If any discrepancy exists, rewrite the section until compliant.`,
    tags: ['review', 'correction', 'core'],
  },
  // Extra core components (16-45)
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `core-component-${i + 16}`,
    categoryId: 'core',
    name: [
      'Role: Principal Systems Architect',
      'Role: Investigative Journalist',
      'Role: Quantitative Strategist',
      'Role: Behavioral Psychologist',
      'Directive: Zero-Jargon Clarity',
      'Directive: High-Density Brevity',
      'Directive: First-Principles Framing',
      'Context: Competitive Market Pressure',
      'Context: Resource Scarcity',
      'Context: Regulatory Pressure',
      'Constraint: Strict Anonymity',
      'Constraint: Single Paragraph Limit',
      'Constraint: Markdown Only',
      'Tone: Inspiring & Urgent',
      'Tone: Pragmatic Realist',
      'Tone: Calm Academic',
      'Validation: Peer Review Standard',
      'Validation: Executive Signoff Ready',
      'Deliverable: 30-60-90 Day Roadmap',
      'Deliverable: Decision Matrix Grid',
      'Deliverable: Trade-Off Ledger',
      'Perspective: Contrarian Challenger',
      'Perspective: Customer Advocate',
      'Perspective: Chief Risk Officer',
      'Structure: Bullet Hierarchy',
      'Structure: FAQ Architecture',
      'Structure: Chronological Pipeline',
      'Focus: High-Impact Levers Only',
      'Focus: Eliminating Technical Debt',
      'Protocol: Escalation Matrix',
    ][i] || `Core Utility Block #${i + 16}`,
    description: `Foundational core prompt utility for robust task structuring.`,
    content: `### Directive Specification
Context: Focus on [[domain_focus]] with emphasis on precision.
Requirement: Analyze [[input_subject]] and produce a rigorous synthesis. Follow established industry benchmarks and quantify outcomes wherever feasible.`,
    tags: ['core', 'directive', 'utility'],
  })),

  // ==========================================
  // 2. REASONING (40 blocks)
  // ==========================================
  {
    id: 'reasoning-cot-step-by-step',
    categoryId: 'reasoning',
    name: 'Chain-of-Thought: Step-by-Step Derivation',
    description: 'Enforces transparent intermediate logical deductions.',
    content: `Take a deep breath and think step-by-step.
1. Break down the core query into its atomic claims.
2. Evaluate each claim against first-principles logic.
3. Detail your deductive path before arriving at the conclusion.
4. Present the verified final answer clearly.`,
    tags: ['chain-of-thought', 'logic', 'reasoning'],
  },
  {
    id: 'reasoning-tree-of-thoughts',
    categoryId: 'reasoning',
    name: 'Tree of Thoughts: Multi-Branch Exploration',
    description: 'Explores three distinct reasoning paths with pruning.',
    content: `### Tree of Thoughts Reasoning
1. Generate 3 distinct conceptual paths to solve [[problem]].
2. For each path, evaluate feasibility, risks, and required effort (score 1-10).
3. Select the highest scoring path and detail its execution while explaining why the others were pruned.`,
    tags: ['tree-of-thought', 'exploration', 'reasoning'],
  },
  {
    id: 'reasoning-first-principles',
    categoryId: 'reasoning',
    name: 'First Principles Decomposition',
    description: 'Strips away analogies down to fundamental truths.',
    content: `Deconstruct [[problem]] down to fundamental, undeniable truths.
- Strip away industry conventions, historical habits, and analogies.
- What are the physical and mathematical limits?
- Reconstruct an optimal solution strictly upwards from these base axioms.`,
    tags: ['first-principles', 'physics', 'reasoning'],
  },
  {
    id: 'reasoning-contrarian-challenge',
    categoryId: 'reasoning',
    name: 'Red Team / Steelmanning The Counter-Argument',
    description: 'Actively tries to disprove own hypothesis.',
    content: `Steelman the strongest possible counter-argument against [[proposed_solution]].
- What is the most devastating flaw in this premise?
- Why might this plan fail in the real world?
- What countermeasures make the premise antifragile?`,
    tags: ['steelman', 'red-team', 'reasoning'],
  },
  {
    id: 'reasoning-fermi-estimation',
    categoryId: 'reasoning',
    name: 'Fermi Estimation & Order-of-Magnitude',
    description: 'Calculates rough quantitative boundaries under uncertainty.',
    content: `Estimate [[metric_to_estimate]] using a Fermi breakdown:
1. List necessary sub-variables.
2. State lower and upper bounds for each assumption.
3. Compute the geometric mean or order-of-magnitude estimate.
4. Highlight the most sensitive assumption in the equation.`,
    tags: ['fermi', 'math', 'estimation', 'reasoning'],
  },
  {
    id: 'reasoning-inversion-thinking',
    categoryId: 'reasoning',
    name: 'Inversion (Munger Protocol)',
    description: 'Focuses on preventing disaster rather than chasing success.',
    content: `Apply the Inversion Principle to [[goal]].
- How could we guarantee complete and catastrophic failure?
- List the 5 fastest ways to ruin this project.
- Invert those failure modes into proactive defensive guardrails.`,
    tags: ['inversion', 'munger', 'reasoning'],
  },
  // Extra reasoning blocks (7-40)
  ...Array.from({ length: 34 }, (_, i) => ({
    id: `reasoning-block-${i + 7}`,
    categoryId: 'reasoning',
    name: [
      'Second-Order Effects Analysis',
      'Socratic Questioning Loop',
      'Occam Razor Simplification',
      'Dialectical Synthesis (Thesis-Antithesis)',
      'Bayesian Belief Updating',
      'Root Cause Analysis (5 Whys)',
      'Cognitive Bias Audit',
      'Opportunity Cost Calculation',
      'Pareto 80/20 Leverage Hunt',
      'Pre-Mortem Failure Analysis',
      'Comparative Counterfactuals',
      'Game Theory Nash Equilibrium',
      'Signal vs Noise Extraction',
      'Sensitivity Analysis Ledger',
      'System Dynamics & Feedback Loops',
      'Toulmin Argument Mapping',
      'Causal Inference Verification',
      'Boundary Condition Stress Test',
      'Cynefin Framework Sorting',
      'Chesterton Fence Inquiry',
      'Goodhart Law Check',
      'Lindy Effect Evaluation',
      'Antifragility Stressor Mapping',
      'Comparative Advantage Breakdown',
      'Mental Model Cross-Pollination',
      'Triangulation of Evidence',
      'Probabilistic Forecasting Range',
      'Falsification Criteria Definition',
      'Heuristic vs Algorithm Audit',
      'Information Asymmetry Analysis',
      'Poka-Yoke Mistake Proofing',
      'Pareto Frontier Optimization',
      'Asymmetric Payoff Analysis',
      'Survivorship Bias Audit',
    ][i] || `Reasoning Technique #${i + 7}`,
    description: `Specialized analytical framework for rigorous thinking and deduction.`,
    content: `### Reasoning Protocol
Focus: Examine [[target_problem]] using systematic causal deduction.
1. Formulate testable assertions.
2. Stress-test boundary conditions and hidden assumptions.
3. Synthesize high-conviction conclusions backed by explicit premises.`,
    tags: ['reasoning', 'analytical', 'logic'],
  })),

  // ==========================================
  // 3. CONTROL FLOW (22 blocks)
  // ==========================================
  {
    id: 'flow-conditional-if-then',
    categoryId: 'control_flow',
    name: 'Conditional: If-Then Routing',
    description: 'Routes output style based on input parameters.',
    content: `### Routing Logic
Evaluate [[input_condition]]:
- IF user query is high-level / beginner: Respond with an intuitive conceptual analogy and 3 bullet points.
- IF user query is technical / advanced: Skip introductory text, provide immediate code / math, and discuss performance trade-offs.`,
    tags: ['flow', 'routing', 'conditional'],
  },
  {
    id: 'flow-fallback-graceful',
    categoryId: 'control_flow',
    name: 'Fallback: Insufficient Information',
    description: 'Graceful fallback when input lacks essential parameters.',
    content: `### Fallback Protocol
IF any of the following required variables are missing: [[required_fields]]
DO NOT hallucinate or guess. Instead:
1. Explain exactly what piece of information is required.
2. Provide a single targeted question to unlock the next step.`,
    tags: ['fallback', 'error-handling', 'control_flow'],
  },
  {
    id: 'flow-state-machine',
    categoryId: 'control_flow',
    name: 'State Machine: Multi-Stage Progression',
    description: 'Manages step-by-step state progression.',
    content: `### State Transition Engine
- STATE 1: Discovery (Interview user for constraints)
- STATE 2: Blueprint (Draft high-level architecture)
- STATE 3: Implementation (Produce final artifact)
Currently you are in [[current_state]]. Do NOT jump to the next state until the user approves the current deliverable.`,
    tags: ['state-machine', 'workflow', 'control_flow'],
  },
  ...Array.from({ length: 19 }, (_, i) => ({
    id: `flow-block-${i + 4}`,
    categoryId: 'control_flow',
    name: [
      'Guardrail Exit Early',
      'Confidence Threshold Gate',
      'Priority Queue Execution',
      'Recursive Refinement Loop',
      'Branching Dialogue Tree',
      'Multi-Path Consensus Gate',
      'Safety Circuit Breaker',
      'Validation Checkpoint Gate',
      'Token Budget Throttling',
      'Retry with Reduced Scope',
      'Escalation to Human Protocol',
      'Idempotent Command Execution',
      'Context Window Pruning Rule',
      'Deterministic Fallback Map',
      'Input Sanitization Pipeline',
      'Strict Stop Sequence Trigger',
      'Async Polling Emulation',
      'Batch Chunking Strategy',
      'Deadlock Prevention Rule',
    ][i] || `Control Flow Block #${i + 4}`,
    description: `Control flow logic pattern for state management and execution routing.`,
    content: `### Execution Rule
Condition: Monitor [[state_trigger]].
Action: If triggered, execute [[target_action]] immediately. Otherwise maintain current state [[default_action]].`,
    tags: ['control_flow', 'routing', 'logic'],
  })),

  // ==========================================
  // 4. OUTPUT (28 blocks)
  // ==========================================
  {
    id: 'output-json-strict',
    categoryId: 'output',
    name: 'Strict JSON Schema',
    description: 'Guarantees parseable, raw JSON without markdown wrappers.',
    content: `Output MUST be pure, valid JSON adhering to this schema:
\`\`\`json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "summary": { "type": "string" },
    "score": { "type": "number", "minimum": 0, "maximum": 100 },
    "key_takeaways": { "type": "array", "items": { "type": "string" } },
    "actionable_next_steps": { "type": "array", "items": { "type": "string" } }
  },
  "required": ["summary", "score", "key_takeaways", "actionable_next_steps"]
}
\`\`\`
Return ONLY raw JSON. No markdown code blocks, no backticks, no preamble.`,
    tags: ['json', 'schema', 'output'],
  },
  {
    id: 'output-markdown-table',
    categoryId: 'output',
    name: 'Comparative Markdown Table',
    description: 'Tabular format for multi-option comparison.',
    content: `Present the final analysis as a clean Markdown table with the following columns:
| Dimension / Option | Key Strengths | Critical Weaknesses | Cost / Complexity | Recommendation |
| --- | --- | --- | --- | --- |
Ensure every row is populated with concise, high-density facts.`,
    tags: ['table', 'markdown', 'output'],
  },
  {
    id: 'output-xml-structured',
    categoryId: 'output',
    name: 'Tagged XML Architecture',
    description: 'Encloses sections in parseable XML tags.',
    content: `Enclose all elements of your response in explicit XML tags:
<analysis>
  <thinking>Detailed intermediate rationale</thinking>
  <verdict>Decisive outcome</verdict>
  <recommendation>Prescribed action</recommendation>
</analysis>`,
    tags: ['xml', 'structured', 'output'],
  },
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `output-block-${i + 4}`,
    categoryId: 'output',
    name: [
      'YAML Config Deliverable',
      'Mermaid.js Flowchart Architecture',
      'One-Sentence Punchy Synthesis',
      'Numbered Action Plan (Cron order)',
      'FAQ Accordion Format',
      'Changelog / Diff Semantic Block',
      'Cheat-Sheet Quick Reference Card',
      'BibTeX & Citation Ledger',
      'Risk & Mitigation Heatmap Matrix',
      'LaTeX Mathematical Formulation',
      'CSV Raw Data Export',
      'Email Memo Format (Subject, TL;DR, Body)',
      'Slide Deck Outline (10-Slide Deck)',
      'RFC (Request for Comments) Structure',
      'Checklist with Checkboxes',
      'Pros / Cons / Verdict Grid',
      'Before / After Transformation Table',
      'API Endpoint OpenAPI Specification',
      'Regex Pattern with Test Cases',
      'SQL Query with Execution Plan Notes',
      'User Story & Acceptance Criteria (Gherkin)',
      'Release Notes with SemVer',
      'Key Metric Dashboard KPI Cards',
      'Interview Transcript Format',
      'Glossary & Terminology Index',
    ][i] || `Output Formatter #${i + 4}`,
    description: `Strict output styling and syntax specification.`,
    content: `### Format Specification
Format: Render the response strictly according to [[format_rules]].
Ensure clear typographical hierarchy, consistent delimiters, and zero superfluous commentary.`,
    tags: ['output', 'formatting', 'syntax'],
  })),

  // ==========================================
  // 5. WRITING & COMMS (42 blocks)
  // ==========================================
  {
    id: 'writing-active-voice',
    categoryId: 'writing',
    name: 'Active Voice & High Energy',
    description: 'Forces energetic, persuasive, punchy sentence construction.',
    content: `Write exclusively in the active voice. Eliminate sluggish helper verbs ("is making", "has been established"). Keep average sentence length under 18 words. Every sentence must move the narrative forward.`,
    tags: ['writing', 'voice', 'clarity'],
  },
  {
    id: 'writing-inverted-pyramid',
    categoryId: 'writing',
    name: 'Inverted Pyramid (Journalistic)',
    description: 'Leads with the most critical news first.',
    content: `Apply the Inverted Pyramid structure:
1. Lead: Who, what, when, where, why, and impact in the opening 2 sentences.
2. Crucial supporting evidence and direct quotes.
3. General context and background details.`,
    tags: ['journalism', 'news', 'writing'],
  },
  {
    id: 'writing-storybrand-framework',
    categoryId: 'writing',
    name: 'StoryBrand Hero Journey',
    description: 'Customer is the hero, business is the guide.',
    content: `Frame this narrative using the StoryBrand framework:
- Character: The customer with a specific goal
- Problem: External, internal, and philosophical conflict
- Guide: Your brand with empathy and authority
- Plan: A clear 3-step path
- Call to Action: Direct and unavoidable
- Stakes: What failure looks like vs what success looks like.`,
    tags: ['storytelling', 'marketing', 'writing'],
  },
  ...Array.from({ length: 39 }, (_, i) => ({
    id: `writing-block-${i + 4}`,
    categoryId: 'writing',
    name: [
      'Executive Cold Email (The 3-Sentence Hook)',
      'LinkedIn Thought-Leadership Post',
      'Apology & Crisis Communications Statement',
      'Product Launch Manifesto',
      'Technical Blog Post Narrative Hook',
      'Substack Newsletter Editorial Voice',
      'White Paper Abstract & Executive Summary',
      'Elevator Pitch (30-Second Cadence)',
      'Speechwriting: Rhetorical Repetition (Anaphora)',
      'Case Study: Problem-Action-Result',
      'FAQ Objection Handling Tone',
      'Microcopy & Empty States',
      'Press Release AP Style',
      'Internal Memo (Amazon 6-Pager Style)',
      'Investor Quarterly Update Letter',
      'Job Description High-Talent Attraction',
      'Podcast Interview Questions Script',
      'Keynote Opening Monologue',
      'Book Blurb & Back-Cover Hook',
      'Customer Onboarding Welcome Sequence',
      'Sales Battlecard vs Competitor',
      'Brand Voice Guidelines Matrix',
      'Humorous Self-Deprecating Copy',
      'Inspiring Vision Statement',
      'Plain English Contract Summary',
      'Re-Engagement Email Subject Lines',
      'Thoughtful Peer Review Feedback',
      'Product Hunt Launch Copy',
      'Technical Documentation Readme',
      'Performance Review Feedback (Radical Candor)',
      'Conference Abstract Submission',
      'Grant Proposal Value Justification',
      'Policy Change Internal Announcement',
      'Customer Testimonial Extraction',
      'Op-Ed Column Argumentation',
      'User Manual Step-by-Step Instructions',
      'Content Repurposing Multi-Format Blueprint',
      'Value Proposition Crafting Matrix',
      'Engaging Survey Question Phrasing',
    ][i] || `Writing Pattern #${i + 4}`,
    description: `High-impact prose and communication template.`,
    content: `### Editorial Guidelines
Tone: [[tone_preference]]
Objective: Deliver persuasive communication targeting [[target_reader]]. Ensure crisp flow, vivid verbs, and memorable phrasing.`,
    tags: ['writing', 'comms', 'copy'],
  })),

  // ==========================================
  // 6. ANALYSIS (26 blocks)
  // ==========================================
  {
    id: 'analysis-swot-matrix',
    categoryId: 'analysis',
    name: 'Actionable SWOT Matrix',
    description: 'Strengths, Weaknesses, Opportunities, Threats with strategic pairing.',
    content: `Conduct a SWOT analysis for [[subject]]:
1. Strengths (Internal competitive edges)
2. Weaknesses (Internal structural vulnerabilities)
3. Opportunities (External tailwinds)
4. Threats (External headwinds)
Conclude with: Cross-SWOT Strategy (How Strengths capture Opportunities; How Weaknesses are shielded from Threats).`,
    tags: ['swot', 'strategy', 'analysis'],
  },
  {
    id: 'analysis-porters-five-forces',
    categoryId: 'analysis',
    name: "Porter's 5 Forces Competitive Moat",
    description: 'Evaluates structural profitability of an industry.',
    content: `Evaluate [[industry_or_company]] using Porter's 5 Forces:
1. Threat of New Entrants (Barriers to entry)
2. Bargaining Power of Suppliers
3. Bargaining Power of Buyers
4. Threat of Substitute Products
5. Intensity of Competitive Rivalry
Rate each force as Low, Moderate, or High with evidence.`,
    tags: ['porters-five-forces', 'market', 'analysis'],
  },
  ...Array.from({ length: 24 }, (_, i) => ({
    id: `analysis-block-${i + 3}`,
    categoryId: 'analysis',
    name: [
      'PESTEL Macroeconomic Audit',
      'Value Chain Decomposition',
      'TAM / SAM / SOM Market Sizing',
      'Unit Economics & CAC/LTV Breakdown',
      'Cohort Retention Decay Curve Analysis',
      'McKinsey 7S Framework',
      'Competitive Feature Parity Grid',
      'Heuristic Usability Evaluation (Nielsen)',
      'Regulatory Exposure Audit',
      'Supply Chain Vulnerability Mapping',
      'Customer Churn Root Cause Audit',
      'Pricing Power Elasticity Review',
      'Technology Stack Debt Assessment',
      'Brand Sentiment & Perception Gap',
      'Talent Attrition Risk Audit',
      'Cybersecurity Threat Surface Audit',
      'SEO Content Gap & Keyword Moat',
      'Financial Runway Burn Sensitivity',
      'Capital Allocation Efficiency Review',
      'ESG Environmental & Social Audit',
      'Disruption Threat Assessment (Christensen)',
      'Cross-Elasticity of Demand Check',
      'Operating Leverage Breakeven Point',
      'Customer Lifetime Journey Friction Map',
    ][i] || `Analytical Framework #${i + 3}`,
    description: `Structured analytical model for deep organizational and market audits.`,
    content: `### Strategic Assessment Protocol
Subject: [[target_entity]]
Examine the subject through analytical lenses. Highlight key dependencies, asymmetric vulnerabilities, and actionable opportunities.`,
    tags: ['analysis', 'framework', 'audit'],
  })),

  // ==========================================
  // 7. METAPROMPTING (36 blocks)
  // ==========================================
  {
    id: 'meta-prompt-optimizer',
    categoryId: 'metaprompting',
    name: 'Prompt Self-Optimizer',
    description: 'Takes a crude prompt and refactors it into a master prompt.',
    content: `You are an elite prompt engineer. Analyze the following rough prompt:
\`\`\`
[[input_prompt]]
\`\`\`
1. Identify ambiguities, missing constraints, and weak instructions.
2. Rewrite it into a world-class prompt with Role, Context, Constraints, Step-by-step logic, and Output schema.
3. List 3 key variables the user should test.`,
    tags: ['metaprompt', 'prompt-engineering', 'optimizer'],
  },
  {
    id: 'meta-reverse-prompt',
    categoryId: 'metaprompting',
    name: 'Reverse Prompt Engineering',
    description: 'Deduces the optimal prompt that could have produced given text.',
    content: `Examine this sample output:
\`\`\`
[[sample_text]]
\`\`\`
Deconstruct the underlying prompt:
- What persona was simulated?
- What stylistic constraints were imposed?
- What was the likely negative prompt?
- Generate the exact prompt template that reproduces this style.`,
    tags: ['reverse-prompt', 'metaprompting'],
  },
  ...Array.from({ length: 34 }, (_, i) => ({
    id: `meta-block-${i + 3}`,
    categoryId: 'metaprompting',
    name: [
      'Self-Critique & Refinement Loop',
      'Prompt Variable Extractor',
      'Few-Shot Example Synthesizer',
      'Hallucination Stress-Tester Prompt',
      'Context Window Compression Prompt',
      'Instruction Hierarchy Conflict Resolver',
      'Multi-Model Cross-Adapter Prompt',
      'Evaluation Rubric Generator',
      'Adversarial Jailbreak Auditor',
      'Zero-Shot to Few-Shot Upgrader',
      'Role Calibration & Persona Tuner',
      'Prompt Token Budget Minimizer',
      'Deterministic Output Enforcer',
      'Model Drift Diagnostic Prompt',
      'Chain-of-Thought Verifier',
      'Semantic Similarity Benchmark Prompt',
      'Edge-Case Generator for Prompts',
      'System Prompt Hardener',
      'Prompt Translation Preserving Variables',
      'Context Pruning & Slicing Tool',
      'Synthetic Benchmark Dataset Builder',
      'A/B Testing Variant Generator',
      'Prompt Readability Index Evaluator',
      'Prompt De-Biasing Refactorer',
      'Recursive Self-Reflection Engine',
      'Multi-Turn Conversation Seed Maker',
      'Output Format Schema Validator',
      'Task Decomposition Planner',
      'Tool Calling Signature Builder',
      'Few-Shot Boundary Negative Builder',
      'Persona Divergence Checker',
      'Model Temperature Recommendation',
      'Automated Prompt Benchmark Grader',
      'Self-Consistency Sampler',
    ][i] || `Metaprompting Module #${i + 3}`,
    description: `Metaprompting tool for prompt generation, auditing, and self-evolution.`,
    content: `### Metaprompting Directive
Analyze the input target: [[target_subject]]
Generate a refined, parameterized prompt blueprint that maximizes reasoning fidelity and minimizes hallucination.`,
    tags: ['metaprompting', 'meta', 'tuning'],
  })),

  // ==========================================
  // 8. GUARDRAILS (32 blocks)
  // ==========================================
  {
    id: 'guardrail-anti-hallucination',
    categoryId: 'guardrails',
    name: 'Strict Anti-Hallucination Anchor',
    description: 'Restricts answers strictly to provided context facts.',
    content: `### Strict Context Grounding Rule
Answer the question based SOLELY on the provided context below.
- Do NOT extrapolate or assume unstated facts.
- If the answer cannot be directly deduced from the context, state exactly: "I cannot verify this based on the provided text."
- Do NOT bring in external knowledge.`,
    tags: ['anti-hallucination', 'grounding', 'guardrails'],
  },
  {
    id: 'guardrail-citation-verification',
    categoryId: 'guardrails',
    name: 'Mandatory Verifiable Citations',
    description: 'Requires direct quotes or source tags for every assertion.',
    content: `Every substantive claim or quantitative statistic MUST be accompanied by a bracketed citation pointing directly to the source document or paragraph. Any un-cited claim will be treated as invalid.`,
    tags: ['citations', 'verification', 'guardrails'],
  },
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `guardrail-block-${i + 3}`,
    categoryId: 'guardrails',
    name: [
      'PII Redaction & Privacy Shield',
      'Copyright & Fair-Use Safety Filter',
      'Medical Disclaimer & Non-Diagnosis Boundary',
      'Financial Advice Disclaimer & Risk Notice',
      'Legal Disclaimer & Non-Attorney Disclaimer',
      'Refusal Protocol with Polite Redirection',
      'Defamation & Slander Mitigation',
      'Prompt Injection Sanitization Barrier',
      'Secret Key & Credential Leakage Prevention',
      'Toxic / Harmful Content Zero-Tolerance Filter',
      'Fact vs Opinion Strict Delimitation',
      'Epistemic Modesty & Confidence Scoring',
      'Dual-Use Technology Safety Barrier',
      'Youth & Child Safety Guardrail',
      'Self-Harm & Emergency Referral Gate',
      'Cybersecurity Exploit Neutralizer',
      'Impersonation Boundary & AI Disclosure',
      'Neutral Political & Social Balance Rule',
      'Ambiguity Halting & Clarification Mandate',
      'Source Credibility Tiering Filter',
      'Sanctioned Entity & Geopolitical Filter',
      'Trade Secret & NDA Preservation Rule',
      'Unsubstantiated Health Claim Block',
      'Cryptocurrency Speculation Warning',
      'Academic Integrity & Plagiarism Shield',
      'Synthetic Persona Disclosure Mandate',
      'Defensive Prompt Boundary Check',
      'Content Expiration & Stale Data Warning',
      'Model Capability Self-Boundary Check',
      'Deterministic Output Non-Drift Guard',
    ][i] || `Guardrail Check #${i + 3}`,
    description: `Safety protocol, compliance constraint, and behavioral guardrail.`,
    content: `### Compliance & Safety Boundary
Parameter: [[guardrail_parameter]]
Constraint: Adhere strictly to verified facts and ethical boundaries. In case of boundary collision, refuse execution and provide a compliant alternative.`,
    tags: ['guardrails', 'safety', 'compliance'],
  })),
];
