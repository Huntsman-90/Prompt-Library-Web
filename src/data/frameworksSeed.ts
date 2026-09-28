import type { FrameworkItem } from '../types';

export const FRAMEWORKS_SEED: FrameworkItem[] = [
  {
    id: 'framework-rtf',
    name: 'RTF (Role, Task, Format)',
    description: 'The golden classic: establishes authority, clear action, and precise delivery schema.',
    category: 'frameworks',
    structure: 'Role -> Task -> Format',
    content: `You are a [[role_description]].
Your task is to [[specific_task]].
Format your response as [[desired_format_and_constraints]].`,
    tags: ['classic', 'essential', 'beginner-friendly'],
    exampleInputs: {
      role_description: 'Principal UX Architect with 15 years in SaaS',
      specific_task: 'audit our mobile onboarding checkout flow',
      desired_format_and_constraints: 'a 5-point bulleted executive checklist with estimated drop-off risk percentages',
    },
  },
  {
    id: 'framework-create',
    name: 'CREATE (Character, Request, Examples, Adjustments, Type, Extras)',
    description: 'Comprehensive framework covering persona, sample exemplars, and fine-tuning knobs.',
    category: 'frameworks',
    structure: 'Character -> Request -> Examples -> Adjustments -> Type -> Extras',
    content: `**Character:** Embody [[character_persona]].
**Request:** [[core_request]].
**Examples:** Follow this baseline model:
\`\`\`
[[few_shot_example]]
\`\`\`
**Adjustments:** [[style_adjustments_or_constraints]].
**Type of Output:** [[output_type_schema]].
**Extras:** [[negative_rules_or_bonus_sections]].`,
    tags: ['advanced', 'comprehensive', 'prompt-engineering'],
  },
  {
    id: 'framework-care',
    name: 'CARE (Context, Action, Result, Example)',
    description: 'Anchors business problem, actions, expected outcome, and illustrative example.',
    category: 'frameworks',
    structure: 'Context -> Action -> Result -> Example',
    content: `### Context
[[background_context_and_constraints]]

### Action
Perform this specific action: [[action_steps]]

### Desired Result
The target milestone or outcome is: [[target_outcome]]

### Reference Example
Model your response closely on this benchmark:
[[reference_example]]`,
    tags: ['business', 'clarity', 'results-driven'],
  },
  {
    id: 'framework-clear',
    name: 'CLEAR (Concise, Logical, Explicit, Adaptive, Reflective)',
    description: 'High-density framework for analytical, multi-layered problem solving.',
    category: 'frameworks',
    structure: 'Concise Context -> Logical Plan -> Explicit Task -> Adaptive Tone -> Reflective Audit',
    content: `**Concise Background:** [[brief_context]]
**Logical Roadmap:** Break down the solution across [[logical_stages]].
**Explicit Requirements:** You must include [[explicit_deliverables]] and strictly avoid [[prohibited_items]].
**Adaptive Tone:** Match the cognitive style of a [[target_reader]].
**Reflective Audit:** Before finishing, review your work and state any residual risks or assumptions.`,
    tags: ['analytical', 'multi-stage', 'strategic'],
  },
  {
    id: 'framework-race',
    name: 'RACE (Role, Action, Context, Expectation)',
    description: 'Direct corporate framework aligning execution with business expectations.',
    category: 'frameworks',
    structure: 'Role -> Action -> Context -> Expectation',
    content: `**Role:** [[expert_title]]
**Action:** [[action_directive]]
**Context:** [[operating_environment]]
**Expectation:** Success will be judged by [[metric_or_quality_bar]].`,
    tags: ['corporate', 'management', 'kpi'],
  },
  {
    id: 'framework-tag',
    name: 'TAG (Task, Action, Goal)',
    description: 'Lightweight, rapid-fire framework for quick high-precision prompts.',
    category: 'frameworks',
    structure: 'Task -> Action -> Goal',
    content: `1. **Task:** [[main_assignment]]
2. **Action:** [[step_by_step_operations]]
3. **Goal:** [[ultimate_objective_and_business_impact]]`,
    tags: ['minimalist', 'fast', 'productivity'],
  },
  {
    id: 'framework-bab',
    name: 'BAB (Before, After, Bridge)',
    description: 'Copywriting and narrative framework transforming current pain into future triumph.',
    category: 'frameworks',
    structure: 'Before -> After -> Bridge',
    content: `**Before:** Describe the current frustrating status quo regarding [[current_pain_point]].
**After:** Paint the vivid picture of life once [[solution_state]] is achieved.
**Bridge:** Provide the actionable roadmap and exact steps that bridge the gap from Before to After.`,
    tags: ['copywriting', 'marketing', 'persuasion'],
  },
  {
    id: 'framework-pastor',
    name: 'PASTOR (Problem, Amplify, Story, Transformation, Offer, Response)',
    description: 'Master conversion storytelling structure for sales letters, pitches, and manifestos.',
    category: 'frameworks',
    structure: 'Problem -> Amplify -> Story -> Transformation -> Offer -> Response',
    content: `1. **Problem:** Identify the acute friction of [[target_customer_problem]].
2. **Amplify:** Illustrate the compounding cost of inaction.
3. **Story:** Share a relatable case narrative of someone trapped in this problem.
4. **Transformation:** Detail the pivotal shift in strategy that unlocked success.
5. **Offer:** Introduce [[product_or_solution]] as the proven mechanism.
6. **Response:** Conclude with an unmistakable call-to-action.`,
    tags: ['sales', 'storytelling', 'conversion'],
  },
  {
    id: 'framework-ape',
    name: 'APE (Action, Purpose, Expectation)',
    description: 'Crystal-clear task delegation framework for AI autonomy.',
    category: 'frameworks',
    structure: 'Action -> Purpose -> Expectation',
    content: `**Action:** [[exact_action_to_take]]
**Purpose:** We are doing this because [[strategic_rationale]].
**Expectation:** The final deliverable must satisfy:
- [[criterion_1]]
- [[criterion_2]]
- Format: [[schema_format]]`,
    tags: ['delegation', 'clarity', 'direction'],
  },
  {
    id: 'framework-prep',
    name: 'PREP (Point, Reason, Example, Point)',
    description: 'Rhetorical structure for airtight arguments, memos, and debate positions.',
    category: 'frameworks',
    structure: 'Point -> Reason -> Example -> Point',
    content: `**Main Point:** State the primary thesis on [[controversial_topic]].
**Reason:** Provide the core logical and empirical foundation.
**Example:** Deliver a concrete real-world case study or data point.
**Point Restated:** Conclude with the inescapable strategic implication.`,
    tags: ['argumentation', 'debate', 'rhetoric'],
  },
  {
    id: 'framework-spar',
    name: 'SPAR (Situation, Problem, Action, Result)',
    description: 'Case study and performance narrative framework.',
    category: 'frameworks',
    structure: 'Situation -> Problem -> Action -> Result',
    content: `### Scenario Breakdown
- **Situation:** [[baseline_conditions]]
- **Problem:** [[critical_obstacle]]
- **Action:** [[intervention_steps]]
- **Result:** [[quantified_outcomes_and_lessons]]`,
    tags: ['case-study', 'retrospective', 'analysis'],
  },
  {
    id: 'framework-grade',
    name: 'GRADE (Goal, Role, Audience, Deliverable, Evaluation)',
    description: 'Comprehensive assignment rubric for research, memos, and technical specs.',
    category: 'frameworks',
    structure: 'Goal -> Role -> Audience -> Deliverable -> Evaluation',
    content: `**Goal:** [[primary_mission]]
**Role:** Embody a [[domain_expert]]
**Audience:** Tailored for a [[target_reader]]
**Deliverable:** Structure as a [[document_format]]
**Evaluation Rubric:** Score the output on accuracy, depth, conciseness, and actionability.`,
    tags: ['rubric', 'academic', 'management'],
  },
  {
    id: 'framework-scqa',
    name: 'SCQA (Situation, Complication, Question, Answer)',
    description: 'The classic McKinsey pyramid principle communication structure.',
    category: 'frameworks',
    structure: 'Situation -> Complication -> Question -> Answer',
    content: `1. **Situation:** Set the uncontroversial baseline facts regarding [[context]].
2. **Complication:** Introduce the destabilizing event or conflict: [[complication]].
3. **Question:** Formulate the central strategic dilemma: "How do we [[key_question]]?"
4. **Answer:** Deliver your decisive, structured recommendation.`,
    tags: ['mckinsey', 'consulting', 'pyramid-principle'],
  },
  {
    id: 'framework-star',
    name: 'STAR (Situation, Task, Action, Result)',
    description: 'Standard behavioral interview and portfolio case structure.',
    category: 'frameworks',
    structure: 'Situation -> Task -> Action -> Result',
    content: `Craft a compelling STAR narrative around [[achievement_topic]]:
- **Situation:** Set the organizational stakes and constraints.
- **Task:** Detail your explicit individual responsibility.
- **Action:** Highlight proactive, high-leverage decisions you made.
- **Result:** Quantify the business impact, metrics moved, and long-term benefit.`,
    tags: ['interview', 'career', 'storytelling'],
  },
  {
    id: 'framework-coast',
    name: 'COAST (Context, Objective, Actions, Scenario, Task)',
    description: 'Scenario-based operational task planning framework.',
    category: 'frameworks',
    structure: 'Context -> Objective -> Actions -> Scenario -> Task',
    content: `**Context:** [[operating_background]]
**Objective:** [[end_state_goal]]
**Actions:** [[approved_tools_and_methods]]
**Scenario:** If [[risk_event]] occurs, adjust by [[mitigation_route]].
**Task:** Execute the primary phase [[phase_one_deliverable]].`,
    tags: ['operations', 'scenario-planning', 'tactical'],
  },
  {
    id: 'framework-era',
    name: 'ERA (Expectation, Role, Action)',
    description: 'Rapid executive delegation prompt.',
    category: 'frameworks',
    structure: 'Expectation -> Role -> Action',
    content: `My **Expectation** is a world-class [[deliverable_name]].
Take on the **Role** of a [[veteran_expert]].
Your immediate **Action** is to [[immediate_directive]].`,
    tags: ['minimalist', 'executive', 'fast'],
  },
  {
    id: 'framework-trace',
    name: 'TRACE (Task, Request, Action, Context, Example)',
    description: 'Iterative technical blueprint prompt structure.',
    category: 'frameworks',
    structure: 'Task -> Request -> Action -> Context -> Example',
    content: `**Task:** [[overall_job]]
**Request:** [[specific_file_or_code_request]]
**Action:** [[architectural_steps_to_take]]
**Context:** [[runtime_and_library_versions]]
**Example:** Follow the syntactic style shown here:
\`\`\`
[[code_syntax_reference]]
\`\`\``,
    tags: ['technical', 'coding', 'architecture'],
  },
  {
    id: 'framework-roses',
    name: 'ROSES (Role, Objective, Scenario, Expected Solution, Steps)',
    description: 'Rich problem-solving framework for complex real-world challenges.',
    category: 'frameworks',
    structure: 'Role -> Objective -> Scenario -> Expected Solution -> Steps',
    content: `**Role:** [[practitioner_role]]
**Objective:** [[target_mission]]
**Scenario:** [[crisis_or_challenge_setting]]
**Expected Solution:** A production-ready plan that resolves [[root_issue]].
**Steps:** Provide your solution as a phased step-by-step rollout.`,
    tags: ['problem-solving', 'strategy', 'rollout'],
  },
  {
    id: 'framework-cidi',
    name: 'CIDI (Context, Instructions, Details, Input)',
    description: 'Clean data transformation and processing structure.',
    category: 'frameworks',
    structure: 'Context -> Instructions -> Details -> Input',
    content: `### Context
[[domain_rules_and_environment]]

### Instructions
1. Parse the input below.
2. Apply [[transformation_rules]].
3. Return in [[target_format]].

### Details & Constraints
- Constraint: [[constraint_rules]]

### Input Data
\`\`\`
[[raw_input_data]]
\`\`\``,
    tags: ['data-processing', 'etl', 'structured'],
  },
  {
    id: 'framework-crispe',
    name: 'CRISPE (Capacity, Role, Insight, Statement, Personality, Experiment)',
    description: 'Advanced prompt-tuning framework incorporating personality and exploration runs.',
    category: 'frameworks',
    structure: 'Capacity -> Role -> Insight -> Statement -> Personality -> Experiment',
    content: `**Capacity & Role:** Act as [[elite_specialist]] with supreme competence in [[domain]].
**Insight:** Ground your worldview in this core insight: [[foundational_insight]].
**Statement of Work:** [[precise_statement_of_task]].
**Personality:** Radiate a [[stylistic_personality_traits]] tone.
**Experiment:** Provide 2 alternative divergent formulations for testing.`,
    tags: ['advanced', 'divergence', 'creative'],
  },
  {
    id: 'framework-aida',
    name: 'AIDA (Attention, Interest, Desire, Action)',
    description: 'The immortal advertising formula for converting attention into revenue.',
    category: 'frameworks',
    structure: 'Attention -> Interest -> Desire -> Action',
    content: `Create high-converting copy for [[offer_name]]:
1. **Attention:** Stop the reader in their tracks with a provocative hook.
2. **Interest:** Share an intriguing fact or fresh perspective on [[pain_point]].
3. **Desire:** Show how life shifts when [[product_benefit]] takes effect.
4. **Action:** Give an urgent, low-friction call-to-action.`,
    tags: ['marketing', 'advertising', 'copywriting'],
  },
  {
    id: 'framework-pas',
    name: 'PAS (Problem, Agitate, Solve)',
    description: 'The highest-converting direct response framework.',
    category: 'frameworks',
    structure: 'Problem -> Agitate -> Solve',
    content: `1. **Problem:** Clearly name the silent struggle of [[audience_pain]].
2. **Agitate:** Agitate the visceral consequences of ignoring this issue.
3. **Solve:** Introduce [[solution_protocol]] as the definitive cure.`,
    tags: ['direct-response', 'copywriting', 'conversion'],
  },
  {
    id: 'framework-fab',
    name: 'FAB (Features, Advantages, Benefits)',
    description: 'B2B product marketing structure translating technical specs into business value.',
    category: 'frameworks',
    structure: 'Feature -> Advantage -> Benefit',
    content: `Break down the value proposition of [[product_feature]]:
- **Feature (What it is):** Concrete technical spec or capability.
- **Advantage (What it does):** How it outperforms competing approaches.
- **Benefit (What it means for the buyer):** The bottom-line emotional or financial win.`,
    tags: ['product-marketing', 'b2b', 'sales'],
  },
  {
    id: 'framework-4c',
    name: '4C (Clear, Concise, Compelling, Credible)',
    description: 'Editorial review filter ensuring copy hits executive standards.',
    category: 'frameworks',
    structure: 'Clear -> Concise -> Compelling -> Credible',
    content: `Rewrite the draft text below according to the 4C Standard:
1. **Clear:** Remove all vague phrases and buzzwords.
2. **Concise:** Cut word count by 35% without losing information.
3. **Compelling:** Elevate the emotional stakes and urgency.
4. **Credible:** Back assertions with verifiable proof points.
Draft:
[[draft_text]]`,
    tags: ['editing', 'copywriting', 'polish'],
  },
  {
    id: 'framework-5w1h',
    name: '5W1H (Who, What, Where, When, Why, How)',
    description: 'Comprehensive journalistic discovery protocol.',
    category: 'frameworks',
    structure: 'Who -> What -> Where -> When -> Why -> How',
    content: `Analyze the release of [[topic_or_event]]:
- **Who:** Stakeholders, drivers, and beneficiaries
- **What:** The exact substance and scope
- **Where:** Ecosystem, geography, or architectural layer
- **When:** Chronology, milestones, and urgency
- **Why:** Underlying economic, political, or psychological drivers
- **How:** Technical mechanism of operation`,
    tags: ['investigative', 'journalism', 'discovery'],
  },
  {
    id: 'framework-six-hats',
    name: 'Six Thinking Hats (De Bono)',
    description: 'Holistic multi-dimensional perspective rotation.',
    category: 'frameworks',
    structure: 'White -> Red -> Black -> Yellow -> Green -> Blue',
    content: `Evaluate [[strategic_decision]] across all Six Thinking Hats:
- **White Hat (Data):** What objective facts and figures do we know?
- **Red Hat (Emotion):** What are the gut feelings, fears, and intuitions?
- **Black Hat (Caution):** What are the catastrophic failure points and legal risks?
- **Yellow Hat (Optimism):** What is the blue-sky upside if everything goes right?
- **Green Hat (Creativity):** What novel or crazy workarounds could we invent?
- **Blue Hat (Process):** What is our final synthesis and next action?`,
    tags: ['de-bono', 'decision-making', 'creativity'],
  },
  {
    id: 'framework-first-principles',
    name: 'First Principles Engineering',
    description: 'Deconstructs to immutable axioms and builds solutions upward.',
    category: 'frameworks',
    structure: 'Axioms -> Constraints -> Bottom-Up Synthesis',
    content: `Apply First-Principles Reasoning to [[intractable_problem]]:
1. Strip away all industry precedent, common practices, and analogies.
2. What are the immutable physical, mathematical, or economic truths?
3. What constraints are artificial self-imposed myths?
4. Synthesize a breakthrough solution built upwards from first axioms alone.`,
    tags: ['first-principles', 'physics', 'engineering'],
  },
  {
    id: 'framework-feynman',
    name: 'Feynman Teaching Framework',
    description: 'True mastery through radical simplification and testing.',
    category: 'frameworks',
    structure: 'Simple Explanation -> Metaphor -> Knowledge Gaps -> Self-Test',
    content: `Master the concept of [[complex_subject]]:
1. **Explain simply:** Write an explanation so intuitive a 10-year-old grasps it.
2. **Anchor with metaphor:** Connect it to an everyday sensory experience.
3. **Pinpoint gaps:** Where does simplification risk distortion?
4. **Comprehension check:** 3 questions to verify deep understanding.`,
    tags: ['feynman', 'pedagogy', 'mastery'],
  },
  {
    id: 'framework-react',
    name: 'ReAct (Reasoning and Acting)',
    description: 'Agentic thought-action-observation loop.',
    category: 'frameworks',
    structure: 'Thought -> Action -> Observation -> Final Answer',
    content: `Solve [[complex_multi_step_problem]] in a strict ReAct sequence:
- **Thought 1:** Analyze the current state.
- **Action 1:** Specify the targeted calculation or lookup.
- **Observation 1:** Detail the findings.
- **Repeat until resolved.**
- **Final Answer:** State the verified synthesis.`,
    tags: ['agentic', 'react', 'logic'],
  },
  {
    id: 'framework-chain-of-thought',
    name: 'Chain-of-Thought (CoT)',
    description: 'Linear deduction breaking multi-layered reasoning into verified steps.',
    category: 'frameworks',
    structure: 'Deconstruct -> Step-wise Deduction -> Verification -> Answer',
    content: `Approach this problem step by step:
1. State the known givens and target unknowns for [[problem_prompt]].
2. Show each intermediate mathematical or conceptual transformation.
3. Check for arithmetic or logical fallacies before proceeding.
4. Box the final answer clearly.`,
    tags: ['chain-of-thought', 'math', 'reasoning'],
  },
  {
    id: 'framework-tree-of-thoughts',
    name: 'Tree of Thoughts (ToT)',
    description: 'Branching exploration with explicit heuristic scoring and pruning.',
    category: 'frameworks',
    structure: 'Branching -> Heuristic Scoring -> Pruning -> Convergence',
    content: `To solve [[strategic_challenge]], construct a Tree of Thoughts:
- Generate 3 distinct initial strategies (Branches A, B, C).
- Score each branch on Feasibility (1-5), Impact (1-5), and Speed (1-5).
- Prune the 2 weaker branches with clear justification.
- Expand the winning branch into 3 sub-tactics and select the winner.`,
    tags: ['tree-of-thought', 'exploration', 'scoring'],
  },
  {
    id: 'framework-inversion',
    name: 'Inversion Thinking (Charlie Munger)',
    description: 'Solves problems by violently planning how to fail.',
    category: 'frameworks',
    structure: 'Catastrophic Failure -> Root Hazards -> Proactive Moats',
    content: `Apply Inversion to [[project_or_goal]]:
1. Imagine this project is 12 months in the future and has failed in absolute disgrace.
2. List the 5 exact blunders that triggered the collapse.
3. For each blunder, design an ironclad operational policy that guarantees it can never occur.`,
    tags: ['munger', 'inversion', 'risk-management'],
  },
  {
    id: 'framework-second-order',
    name: 'Second-Order Thinking',
    description: 'Evaluates ripple effects beyond immediate immediate outcomes.',
    category: 'frameworks',
    structure: '1st Order Impact -> 2nd Order Ripple -> 3rd Order Systemic Equilibrium',
    content: `Analyze the systemic fallout of [[proposed_policy]]:
- **1st Order Effect (Immediate & Obvious):** What happens right away?
- **2nd Order Effect (Behavioral Adaptations):** How will people react to the new incentive?
- **3rd Order Effect (Unintended Systemic Shifts):** What unforeseen equilibrium forms 3 years out?`,
    tags: ['systems-thinking', 'economics', 'strategy'],
  },
  {
    id: 'framework-pestel',
    name: 'PESTEL Environmental Scan',
    description: 'Macro-environmental framework for strategic risk assessment.',
    category: 'frameworks',
    structure: 'Political -> Economic -> Social -> Technological -> Environmental -> Legal',
    content: `Conduct a macro PESTEL audit for [[market_or_company]]:
- **Political:** Regulatory stability, trade tariffs, state interventions.
- **Economic:** Inflation, capital availability, consumer spending power.
- **Social:** Demographic shifts, cultural values, lifestyle trends.
- **Technological:** AI disruption, obsolescence, infrastructure upgrades.
- **Environmental:** Carbon mandates, climate resilience, resource constraints.
- **Legal:** Antitrust, employment law, IP rights.`,
    tags: ['pestel', 'macro', 'strategy'],
  },
  {
    id: 'framework-swot-matrix',
    name: 'SWOT + TOWS Strategic Cross-Matrix',
    description: 'Pairs internal strengths with external market forces.',
    category: 'frameworks',
    structure: 'SWOT Audit -> SO Strategies -> WO Strategies -> ST Strategies -> WT Defenses',
    content: `Evaluate [[organization_name]] with a TOWS matrix:
1. **Internal:** Strengths & Weaknesses.
2. **External:** Opportunities & Threats.
3. **SO Strategies:** How do Strengths maximize Opportunities?
4. **WO Strategies:** How do Opportunities cure Weaknesses?
5. **ST Strategies:** How do Strengths shield against Threats?
6. **WT Defenses:** How do we prevent Weaknesses from colliding with Threats?`,
    tags: ['swot', 'tows', 'strategic-planning'],
  },
  {
    id: 'framework-mckinsey-7s',
    name: 'McKinsey 7S Organizational Alignment',
    description: 'Diagnoses organizational friction across hard and soft dimensions.',
    category: 'frameworks',
    structure: 'Hard Elements (Strategy, Structure, Systems) -> Soft Elements (Shared Values, Style, Staff, Skills)',
    content: `Audit organizational readiness for [[strategic_pivot]] using McKinsey 7S:
- **Hard S:** Strategy, Organizational Structure, Core IT/Operational Systems.
- **Soft S:** Shared Core Values, Leadership Style, Staffing Capacity, Key Skills.
- Identify the single greatest misalignment threatening the transition.`,
    tags: ['mckinsey-7s', 'transformation', 'leadership'],
  },
  {
    id: 'framework-blue-ocean',
    name: 'Blue Ocean Strategy Canvas (ERRC)',
    description: 'Breaks out of red ocean competition by redefining value curves.',
    category: 'frameworks',
    structure: 'Eliminate -> Reduce -> Raise -> Create',
    content: `Apply the ERRC Grid to disrupt [[traditional_industry]]:
- **Eliminate:** Which factors that the industry takes for granted should be eliminated?
- **Reduce:** Which factors should be reduced well below industry standards?
- **Raise:** Which factors should be raised well above the industry standard?
- **Create:** What entirely new factor should be created that the industry has never offered?`,
    tags: ['blue-ocean', 'innovation', 'disruption'],
  },
  {
    id: 'framework-okr',
    name: 'OKR (Objectives & Key Results) Cascade',
    description: 'High-alignment quarterly goal setting architecture.',
    category: 'frameworks',
    structure: 'Objective -> Key Result 1 -> Key Result 2 -> Key Result 3 -> Key Initiatives',
    content: `Draft inspiring, metric-driven OKRs for [[department_or_team]]:
**Objective:** [[inspirational_qualitative_goal]]
- **KR 1 (Outcome metric):** Move from X to Y by Date.
- **KR 2 (Quality/efficiency metric):** Maintain standard Z while scaling.
- **KR 3 (Milestone metric):** Deliver core platform by Date.
**Top 3 Initiatives:** The high-leverage bets executed to hit these KRs.`,
    tags: ['okr', 'management', 'goals'],
  },
  {
    id: 'framework-jtbd',
    name: 'Jobs-To-Be-Done (JTBD)',
    description: 'Focuses on the customer progress struggle rather than product features.',
    category: 'frameworks',
    structure: 'When [Situation] -> I Want To [Motivation] -> So I Can [Desired Outcome]',
    content: `Deconstruct the JTBD for [[target_user]]:
"When [[trigger_situation]],
I want to [[functional_and_emotional_struggle]],
so I can [[ultimate_transformational_progress]]."
Analyze:
- What competing "job" are they currently firing to hire our solution?
- What anxieties hold them back from switching?`,
    tags: ['jtbd', 'product-discovery', 'ux'],
  },
  {
    id: 'framework-eisenhower',
    name: 'Eisenhower Priority Matrix',
    description: 'Decisive workload triage based on urgency vs importance.',
    category: 'frameworks',
    structure: 'Do (Q1) -> Schedule (Q2) -> Delegate (Q3) -> Delete (Q4)',
    content: `Triage the operational initiatives for [[executive_role]]:
- **Quadrant 1 (Urgent & Important):** Crises, deadlines, pressing bugs.
- **Quadrant 2 (Not Urgent but Strategic):** Deep work, architecture, skill growth.
- **Quadrant 3 (Urgent but Low Value):** Interruptions, shallow requests.
- **Quadrant 4 (Waste):** Bureaucracy and vanity metrics to eliminate today.`,
    tags: ['productivity', 'eisenhower', 'priorities'],
  },
  {
    id: 'framework-radical-candor',
    name: 'Radical Candor Feedback Matrix',
    description: 'Delivers tough, loving, career-altering direct feedback.',
    category: 'frameworks',
    structure: 'Care Personally -> Challenge Directly -> Actionable Path Forward',
    content: `Deliver constructive feedback to [[colleague_role]] regarding [[performance_issue]]:
1. **Care Personally:** Reaffirm genuine belief in their potential and long-term trajectory.
2. **Challenge Directly:** Name the specific observed behavior and its real business consequence without sugarcoating.
3. **Actionable Path:** Offer 2 concrete, observable behavioral adjustments they can make tomorrow.`,
    tags: ['feedback', 'management', 'communication'],
  },
  {
    id: 'framework-socratic-dialogue',
    name: 'Socratic Inquiry Engine',
    description: 'Guides the user to discover their own breakthrough through incisive questions.',
    category: 'frameworks',
    structure: 'Clarify -> Unpack Assumptions -> Explore Evidence -> Probe Implications',
    content: `Engage the user in a rigorous Socratic dialogue on [[belief_or_premise]]:
1. Ask for a crisp definition of the terms they are using.
2. Question the hidden unexamined premise behind their thesis.
3. Offer a thought experiment where the premise produces an absurd result.
4. Guide them to formulate a more resilient, nuanced understanding.`,
    tags: ['socratic', 'inquiry', 'critical-thinking'],
  },
];
