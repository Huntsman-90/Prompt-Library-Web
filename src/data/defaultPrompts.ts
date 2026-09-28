import type { PromptItem, PromptBoard, FolderItem } from '../types';

export const DEFAULT_FOLDERS: FolderItem[] = [
  {
    id: 'folder-engineering',
    name: 'Engineering & Systems',
    color: '#6366f1',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'folder-strategy',
    name: 'Strategy & Growth',
    color: '#10b981',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'folder-product',
    name: 'Product & UX',
    color: '#06b6d4',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'folder-writing',
    name: 'Executive & Writing',
    color: '#ec4899',
    createdAt: new Date().toISOString(),
  },
];

export const DEFAULT_PROMPTS: PromptItem[] = [
  {
    id: 'prompt-systems-architect-review',
    title: 'Staff Systems Architect: Production Code Review',
    description: 'Deep architectural and vulnerability review covering performance, concurrency, and observability.',
    content: `You are a Principal Systems Architect. Review the following code snippet for production readiness:

\`\`\`[[language]]
[[code_to_review]]
\`\`\`

### Review Directives:
1. **Architectural Cohesion & Maintainability:** Assess SOLID principles, coupling, and abstraction boundaries.
2. **Performance & Concurrency:** Identify potential memory leaks, unindexed query bottlenecks, and race conditions.
3. **Observability & Error Handling:** Ensure all errors are classified and actionable log context is emitted.
4. **Concrete Redline:** Provide the refactored code block with concise commentary on trade-offs.`,
    category: 'coding',
    folderId: 'folder-engineering',
    tags: ['coding', 'architecture', 'code-review', 'production'],
    variables: ['language', 'code_to_review'],
    isFavorite: true,
    usageCount: 14,
    targetModel: 'Claude 3.7 Sonnet',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prompt-b2b-gtm-playbook',
    title: 'B2B Enterprise Go-To-Market Playbook',
    description: 'Generates a customer profile, value proposition, and 90-day execution milestones.',
    content: `You are a Chief Revenue Officer. Formulate a targeted Go-To-Market (GTM) playbook for [[product_name]]:

### Target Profile:
- Industry: [[industry]]
- Target Company Size: [[company_size]]
- Primary Economic Buyer: [[buyer_title]]

### Deliverables:
1. **The 1-Sentence High-Urgency Hook:** A value proposition that highlights the acute cost of inaction.
2. **Sales Motion Matrix:** Inbound vs Outbound cadence and key qualification criteria (BANT).
3. **90-Day Milestones:** Month 1 (Foundation), Month 2 (Pipeline Acceleration), Month 3 (First Closed Deals).`,
    category: 'business',
    folderId: 'folder-strategy',
    tags: ['business', 'gtm', 'b2b', 'strategy'],
    variables: ['product_name', 'industry', 'company_size', 'buyer_title'],
    isFavorite: true,
    usageCount: 22,
    targetModel: 'GPT-4o',
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prompt-feynman-concept-mastery',
    title: 'Feynman Technique: Deep Concept Demystification',
    description: 'Translates complex technical or scientific ideas into intuitive mental models with zero jargon.',
    content: `You are a master teacher using the Feynman Technique. Explain the concept of [[complex_concept]]:

1. **The Child Explanation:** Explain this to a bright 10-year-old using zero technical jargon and a vivid real-world metaphor.
2. **The Nuance Layer:** Explain where the simple metaphor breaks down and what physical/mathematical reality takes over.
3. **Knowledge Check:** Provide 3 progressive questions to test whether the reader has truly internalized the core mental model.`,
    category: 'education',
    folderId: 'folder-writing',
    tags: ['education', 'feynman', 'learning', 'mental-models'],
    variables: ['complex_concept'],
    isFavorite: false,
    usageCount: 9,
    targetModel: 'Gemini 2.5 Pro',
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prompt-ux-onboarding-audit',
    title: 'Mobile Onboarding & First-Run UX Audit',
    description: 'Evaluates cognitive friction, time-to-value, and drop-off risks for mobile apps.',
    content: `Act as a Principal Product Designer specializing in mobile retention. Audit this onboarding flow:

### App Specification:
- App Type: [[app_category]]
- Current Flow: [[onboarding_steps]]
- Key Value Metric: [[core_aha_moment]]

### Deliverable:
- **Cognitive Friction Score (1-10):** Identify unnecessary permissions or screens.
- **Progressive Disclosure Recommendations:** What can be deferred to after the "Aha!" moment?
- **Microcopy Polish:** Provide optimized copy for the primary permission/action CTA.`,
    category: 'ux_design',
    folderId: 'folder-product',
    tags: ['ux', 'mobile', 'onboarding', 'product'],
    variables: ['app_category', 'onboarding_steps', 'core_aha_moment'],
    isFavorite: true,
    usageCount: 18,
    targetModel: 'Claude 3.7 Sonnet',
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prompt-blameless-postmortem',
    title: 'Blameless Incident Post-Mortem & Timeline',
    description: 'Creates a structured incident postmortem emphasizing systemic resilience and preventive action.',
    content: `Draft a blameless post-mortem for the following outage incident:

### Incident Facts:
- Outage Title: [[incident_name]]
- Duration & SLA Impact: [[downtime_minutes]] minutes, [[affected_percentage]]% of users
- Root Cause Hypothesis: [[preliminary_cause]]

### Required Sections:
1. **Executive Summary:** Plain-English description for business stakeholders.
2. **Timeline:** Chronological breakdown of detection, escalation, mitigation, and recovery.
3. **Systemic Root Causes:** 5 Whys analysis without blaming individuals.
4. **Preventive Action Matrix:** Action items with priority (P0, P1, P2) and preventive safeguards.`,
    category: 'technical',
    folderId: 'folder-engineering',
    tags: ['devops', 'incident', 'postmortem', 'technical'],
    variables: ['incident_name', 'downtime_minutes', 'affected_percentage', 'preliminary_cause'],
    isFavorite: false,
    usageCount: 6,
    targetModel: 'Claude 3.7 Sonnet',
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prompt-executive-cold-email',
    title: '3-Sentence Executive Cold Email (High Response Rate)',
    description: 'Ultra-concise, non-salesy cold outreach focused on an observed specific problem.',
    content: `Write a high-converting 3-sentence cold email to a [[recipient_title]] at [[target_company]].

### Context:
- Specific Observation / Trigger: [[trigger_event_or_friction]]
- Our Leverage / Unique Insight: [[our_mechanism]]

### Rules:
- Sentence 1: Observation that proves we actually did research (no generic flattery).
- Sentence 2: The acute risk or metric gap that this causes.
- Sentence 3: A low-friction, curiosity-driven call to action (no "book 30 minutes on my calendar").
- Subject Line: Max 4 words, casual, lowercase.`,
    category: 'writing',
    folderId: 'folder-writing',
    tags: ['sales', 'email', 'copywriting', 'outreach'],
    variables: ['recipient_title', 'target_company', 'trigger_event_or_friction', 'our_mechanism'],
    isFavorite: true,
    usageCount: 31,
    targetModel: 'GPT-4o',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const DEFAULT_BOARDS: PromptBoard[] = [
  {
    id: 'board-tech-lead',
    title: 'Tech Lead Toolkit',
    description: 'High-leverage prompts for architecture, code review, and postmortems.',
    color: '#6366f1',
    promptIds: ['prompt-systems-architect-review', 'prompt-blameless-postmortem'],
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'board-gtm-suite',
    title: 'GTM & Conversion Suite',
    description: 'Commercial playbooks, outreach sequences, and value propositions.',
    color: '#10b981',
    promptIds: ['prompt-b2b-gtm-playbook', 'prompt-executive-cold-email', 'prompt-ux-onboarding-audit'],
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'board-deep-thinking',
    title: 'Deep Thinking & Pedagogy',
    description: 'Frameworks for first-principles reasoning and rapid conceptual mastery.',
    color: '#ec4899',
    promptIds: ['prompt-feynman-concept-mastery'],
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
