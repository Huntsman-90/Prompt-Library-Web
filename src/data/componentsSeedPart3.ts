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

export const COMPONENTS_PART_3: ComponentBlock[] = [
  // ==========================================
  // 7. DIALOGUE (36 distinct blocks)
  // ==========================================
  makeBlock(
    'dialogue-01', 'dialogue', 'Socratic Interviewer & Needs Discovery',
    'Guides user through discovery by asking one focused question at a time.',
    '### Socratic Discovery Persona\nYour goal is to uncover requirements for [[project_type]].\n1. Ask ONLY ONE targeted, probing question per turn.\n2. Do not offer solutions or multi-paragraph explanations yet.\n3. Validate the user\'s previous answer briefly, then ask the next most important diagnostic question.\n4. Conclude interview when [[completion_condition]] is met.',
    ['socratic', 'discovery', 'dialogue']
  ),
  makeBlock(
    'dialogue-02', 'dialogue', 'Customer Friction & De-escalation',
    'Handles frustrated user input with active listening, validation, and swift resolution.',
    '### Customer Friction Resolution\nRespond to upset customer input regarding [[issue_description]]:\n- **Acknowledge & Validate**: Express genuine empathy without making false legal promises.\n- **Root Cause Isolation**: Restate issue succinctly to confirm understanding.\n- **Immediate Remedy**: Offer 2 concrete options to resolve friction immediately.\n- **Tone**: Calm, professional, highly helpful.',
    ['customer-service', 'empathy', 'deescalation']
  ),
  ...Array.from({ length: 34 }, (_, i) => {
    const num = i + 3;
    const titles = [
      'Active Listening & Restatement Mirroring',
      'Multi-Turn Context State Tracking',
      'Clarification & Disambiguation Probe',
      'Turn-Taking & Brevity Enforcement',
      'Roleplay Persona Consistency Anchor',
      'User Intent Switch & Topic Re-routing',
      'Interruption Recovery & Flow Resumption',
      'Empathetic Coaching & Feedback Cycle',
      'Executive Briefing Q&A Handling',
      'Technical Support Troubleshooting Flow',
      'Onboarding Conversation Facilitator',
      'Sales Discovery & Qualification Script',
      'Behavioral Interviewing STAR Prober',
      'Negotiation & Counter-Offer Facilitator',
      'Medical History & Symptom Collector',
      'Legal Intake & Fact Gathering Flow',
      'Educational Quiz & Response Evaluator',
      'Language Learning Conversation Partner',
      'Debate Opposition & Counter-Argument',
      'Product Review Feedback Collector',
      'Therapeutic Reflection & Non-Clinical Mirror',
      'Crisis Hotline Protocol Router',
      'Community Moderation Dialogue Flow',
      'Virtual Host & Event Moderator',
      'Survey & Polling Conversational Agent',
      'Interactive Storytelling Branching Choice',
      'Customer Retention Offboarding Interview',
      'Co-Pilot Pair Programming Companion',
      'Brainstorming Facilitator Dialogue',
      'Executive Performance Review One-on-One',
      'Conflict Mediation & Common Ground Finder',
      'Customer Onboarding Welcome Sequence',
      'Proactive Assistant Check-In Flow',
      'Feedback Refusal & Boundary Maintenance'
    ];
    return makeBlock(
      `dialogue-${num}`,
      'dialogue',
      `Dialogue: ${titles[i % titles.length]} (#${num})`,
      `Conversational pattern for ${titles[i % titles.length].toLowerCase()}.`,
      `### Conversational Protocol: ${titles[i % titles.length]}\nTarget Participant: [[user_persona_${num}]]\nGoal: [[dialogue_goal_${num}]]\n1. Maintain ${titles[i % titles.length]} conversational posture.\n2. Keep responses focused (< 150 words per turn).\n3. Ask maximum 1 question per turn to maintain conversational momentum.`,
      ['dialogue', 'conversation', `spec-${num}`]
    );
  }),

  // ==========================================
  // 8. CONTROL FLOW (32 distinct blocks)
  // ==========================================
  makeBlock(
    'cf-01', 'control_flow', 'Conditional Classification Router',
    'Routes incoming requests into specific execution paths based on criteria.',
    '### Decision Tree Router\nClassify [[input_data]] into categories:\n- **CATEGORY A**: [[condition_a_criteria]] -> Action: [[action_a]]\n- **CATEGORY B**: [[condition_b_criteria]] -> Action: [[action_b]]\n- **CATEGORY C**: [[condition_c_criteria]] -> Action: [[action_c]]\n- **FALLBACK**: If ambiguous or confidence < 0.85 -> Output Escalation JSON.',
    ['router', 'classification', 'branching']
  ),
  makeBlock(
    'cf-02', 'control_flow', 'Graceful Fallback & Circuit Breaker',
    'Prevents cascade failures when inputs are missing, invalid, or out of scope.',
    '### Circuit Breaker Logic\n1. Inspect [[user_payload]] for required parameters: [[required_fields]].\n2. IF any parameter missing or invalid:\n   - Halt primary execution.\n   - Output standard error payload: `{"status": "INVALID_INPUT", "missing": ["field_name"]}`.\n3. ELSE IF input contains prohibited topics ([[prohibited_keywords]]):\n   - Trigger Fallback Response [[fallback_template]].',
    ['fallback', 'circuit-breaker', 'validation']
  ),
  ...Array.from({ length: 30 }, (_, i) => {
    const num = i + 3;
    const titles = [
      'Iterative Self-Correction Quality Loop',
      'Multi-Way Switch Case Logic',
      'While-Loop Quality Gate Convergence',
      'Try-Catch Error Interception & Recovery',
      'Parallel Execution Merge & Join Node',
      'Sequential Pipeline Chain Dispatcher',
      'Rate-Limiting & Throttling Gate',
      'Confidence Score Threshold Evaluator',
      'Priority Queue Execution Ranker',
      'State Machine Transition Manager',
      'Timeout & Dead-Letter Queue Handler',
      'Idempotency Check & Deduplication Gate',
      'Human-in-the-Loop Approval Gate',
      'Dynamic Feature Flag Switch',
      'Cascade Failure Isolation Shield',
      'Batch Ingestion & Chunk Splitter',
      'Payload Transformation Mapper',
      'Event-Driven Pub-Sub Trigger Router',
      'Recursive Tree Search Evaluator',
      'Rollback & State Reversion Dispatcher',
      'Concurrency Mutex Lock Manager',
      'Polling Loop & Condition Waiter',
      'Load Balancing Round-Robin Dispatcher',
      'Input Validation Guard Rail Node',
      'Schema Migration Compatibility Mapper',
      'Dependency Graph Resolution Node',
      'A/B Testing Random Router Node',
      'Graceful Degradation Feature Switch',
      'Early Exit Condition Evaluator',
      'Context Window Sliding Buffer Node'
    ];
    return makeBlock(
      `cf-${num}`,
      'control_flow',
      `Control Flow: ${titles[i % titles.length]} (#${num})`,
      `Control flow node for ${titles[i % titles.length].toLowerCase()}.`,
      `### Control Flow Specification: ${titles[i % titles.length]}\nIncoming Payload: [[payload_${num}]]\n1. Evaluate condition: [[condition_${num}]].\n2. IF true: Dispatch to [[branch_true_${num}]].\n3. ELSE: Dispatch to [[branch_false_${num}]].`,
      ['control_flow', 'logic', `spec-${num}`]
    );
  }),

  // ==========================================
  // 9. OUTPUT (32 distinct blocks)
  // ==========================================
  makeBlock(
    'output-01', 'output', 'Strict JSON Schema Enforcement',
    'Guarantees parseable JSON with exact keys, data types, and zero markdown envelope.',
    '### Output Format: Pure JSON\nOutput ONLY raw, valid JSON conforming strictly to schema below.\nDo NOT enclose in markdown codeblocks. Do NOT add preambles or postscripts.\n\nSchema:\n{\n  "summary": "string",\n  "confidence_score": "number (0.0 to 1.0)",\n  "key_findings": ["array of strings"],\n  "action_items": [{"owner": "string", "task": "string", "priority": "P0 | P1 | P2"}]\n}',
    ['json', 'schema', 'strict-output']
  ),
  makeBlock(
    'output-02', 'output', 'Executive One-Pager Layout',
    'Scannable corporate layout optimized for rapid executive decision-making.',
    '### Output Format: Executive One-Pager\nStructure response using exact Markdown headers:\n# Executive Brief: [[topic_title]]\n**TL;DR**: [150-character takeaway]\n\n## 1. Core Problem & Impact\n[3 bullet points max]\n\n## 2. Proposed Architecture\n[Clean diagram or bulleted framework]\n\n## 3. Decision Matrix\n| Metric | Baseline | Target |\n|---|---|---|',
    ['executive', 'one-pager', 'layout']
  ),
  ...Array.from({ length: 30 }, (_, i) => {
    const num = i + 3;
    const titles = [
      'Strict YAML Configuration Schema',
      'Markdown Comparison Matrix Table',
      'OpenAPI 3.0 REST Specification Schema',
      'GraphQL Schema & Resolver Definition',
      'Mermaid.js Flowchart & Sequence Diagram',
      'SQL DDL Schema & Table Statements',
      'TypeScript Interface & Type Definitions',
      'CSV / Delimited Data Table Format',
      'RFC Standard Technical Document Layout',
      'LaTeX Academic Paper Abstract & Equations',
      'HTML/Tailwind CSS UI Component Layout',
      'JSON-LD Structured Data Schema',
      'Git Commit Message & PR Description',
      'Slack / Teams Webhook Block Payload',
      'Email Newsletter Markdown Layout',
      'Slide Deck Outline & Speaker Notes',
      'Executive Summary Bulleted Digest',
      'Jira Ticket & Acceptance Criteria Spec',
      'Release Notes & Changelog Template',
      'Code Diff & Unified Patch Format',
      'Data Dictionary & Schema Glossary',
      'User Story & INVEST Criteria Layout',
      'Bug Report & Steps-to-Reproduce Spec',
      'Product Requirements Document (PRD) Schema',
      'API Error Payload & Problem Details JSON',
      'Cron Schedule & Triggers Documentation',
      'Graphviz DOT Topology Specification',
      'Markdown Checklist & Task Board Matrix',
      'BibTeX Academic Citation List',
      'Plain Text Unformatted Telemetry Stream'
    ];
    return makeBlock(
      `output-${num}`,
      'output',
      `Output: ${titles[i % titles.length]} (#${num})`,
      `Output formatting template for ${titles[i % titles.length].toLowerCase()}.`,
      `### Strict Output Specification: ${titles[i % titles.length]}\nFormatting Target: [[target_format_${num}]]\nConstraint: Adhere strictly to layout structure below. Do not deviate or insert unformatted commentary.\n[Structure Template for ${titles[i % titles.length]}]`,
      ['output', 'formatting', `spec-${num}`]
    );
  }),

  // ==========================================
  // 10. WRITING & COMMS (42 distinct blocks)
  // ==========================================
  makeBlock(
    'writing-01', 'writing', 'Pyramid Principle Communication',
    'Structure starting with conclusion first, followed by key arguments and supporting data.',
    '### Structure: Minto Pyramid Principle\nCraft communication regarding [[topic]]:\n1. **Governing Thought (Conclusion First)**: State key recommendation or result upfront in sentence 1.\n2. **Key Arguments**: Present 3 mutually exclusive, collectively exhaustive (MECE) supporting points.\n3. **Data & Evidence**: Subordinate supporting evidence, numbers, or case studies beneath each argument.',
    ['pyramid-principle', 'minto', 'executive-comm']
  ),
  makeBlock(
    'writing-02', 'writing', 'High-Stakes Persuasive Pitch Narrative',
    'Hook, pain point amplification, resolution, and compelling call-to-action.',
    '### Narrative Arc: Persuasive Pitch\nWrite a pitch targeting [[target_prospect]]:\n- **Hook**: Provocative industry stat or visceral challenge regarding [[industry_pain]].\n- **Agitation**: Quantify cost of inaction.\n- **Breakthrough**: Introduce [[solution_name]] as logical inflection point.\n- **Proof**: Provide 2 tangible proof points.\n- **CTA**: Frictionless next step.',
    ['pitch', 'persuasive', 'narrative']
  ),
  ...Array.from({ length: 40 }, (_, i) => {
    const num = i + 3;
    const titles = [
      'AIDA High-Conversion Marketing Copy',
      'PAS (Problem-Agitate-Solve) Framework',
      'BAB (Before-After-Bridge) Storytelling',
      'FAB (Features-Advantages-Benefits) Translator',
      'Executive Memo & Board Update',
      'Investor Relations Quarterly Update Letter',
      'Crisis Public Relations & Press Release',
      'Customer Apology & Retention Letter',
      'Cold Email Outreach & Personalization',
      'LinkedIn Thought Leadership Post',
      'X / Twitter Viral Thread Script',
      'Technical Blog Post for Developers',
      'Case Study Narrative & Customer Story',
      'White Paper Abstract & Executive Summary',
      'Product Launch Announcement Email',
      'User Onboarding Email Drip Series',
      'Feature Deprecation Notice to Users',
      'Terms of Service Plain-Language Summary',
      'Internal All-Hands Keynote Speech',
      'Podcast Interview Script & Questions',
      'Video Sales Letter (VSL) Script',
      'Landing Page Hero Section Copy',
      'FAQ & Objection-Handling Copy',
      'Re-Engagement & Win-Back Campaign',
      'Event Invitation & RSVP Nudge Email',
      'Community Guidelines & Policy Update',
      'Employee Review & Promotion Nomination',
      'Vendor Price Negotiation Email',
      'Job Description & Culture Pitch',
      'Microcopy UI Button & Modal Copy',
      'Sponsorship Pitch Deck Narrative',
      'Crowdfunding Campaign Story Copy',
      'Annual Impact Report Executive Summary',
      'Policy Position Paper for Regulators',
      'Technical Documentation Intro & Guide',
      'Sales Battlecard & Competitor Counter-Pitch',
      'Customer Feedback Request & Incentive Copy',
      'Newsletter Editor Intro & Curation',
      'Internal Wiki Architecture Overview',
      'Speech & Keynote Opening Monologue'
    ];
    return makeBlock(
      `writing-${num}`,
      'writing',
      `Writing: ${titles[i % titles.length]} (#${num})`,
      `Writing and communication pattern for ${titles[i % titles.length].toLowerCase()}.`,
      `### Writing Specification: ${titles[i % titles.length]}\nTarget Audience: [[audience_${num}]]\nCore Message: [[core_message_${num}]]\nTone: [[desired_tone_${num}]]\nWrite a high-impact piece adhering strictly to ${titles[i % titles.length]} principles.`,
      ['writing', 'comms', `spec-${num}`]
    );
  })
];
