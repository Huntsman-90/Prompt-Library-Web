const { appendSkills } = require('../appendSkills.cjs');

function makeSkill(catFileName, categoryId, prefix, item) {
  const title = item.title;
  const cleanId = `${prefix}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
  const pascalName = title.replace(/[^a-zA-Z0-9]/g, '') + 'Skill';

  return {
    id: cleanId,
    name: pascalName,
    displayName: item.displayName || title,
    categoryId: categoryId,
    description: item.desc || `Applies composite ${title} Multi-Skill architecture.`,
    tags: [categoryId, 'multi-skill', prefix, ...(item.tags || [])],
    sectionName: item.sec || `Multi-Skill: ${title}`,
    ruSectionName: item.ruSec || `Композитный Multi-Skill: ${title}`,
    instructions: item.inst || [
      `Phase 1: Setup parameters and initial input routing for ${title}.`,
      `Phase 2: Multi-stage transformation, orchestration, and evaluation loop.`,
      `Phase 3: Synthesize output into structured format with comprehensive validations.`
    ],
    ruInstructions: item.ruInst || [
      `Этап 1: Инициализация параметров и маршрутизация входящих данных для ${title}.`,
      `Этап 2: Многоэтапная трансформация, оркестрация и цикл оценки.`,
      `Этап 3: Итоговый синтез в структурированный формат с полной валидацией.`
    ],
    semanticType: item.sem || 'process_directive'
  };
}

function processCategory(catFileName, categoryId, prefix, items) {
  const skills = items.map(item => makeSkill(catFileName, categoryId, prefix, item));
  return appendSkills(catFileName, skills);
}

// --------------------------------------------------------------------------
// 6. CONTROL FLOW - 60 SKILLS
// --------------------------------------------------------------------------
const CONTROLFLOW_ITEMS = [
  { title: "Multi Stage Dynamic Branching Decision Tree", desc: "Routes execution paths conditionally based on dynamic multi-variable evaluator nodes." },
  { title: "Multi Layer Exception Catch Fallback Chain", desc: "Structures multi-tiered exception handling with graceful degraded fallback responses." },
  { title: "Multi Pipeline Asynchronous Queue Fan Out Fan In", desc: "Fans out workloads to parallel queue workers and merges results in a fan-in aggregator." },
  { title: "Multi Step Human in the Loop Approval Gate", desc: "Pauses workflow execution at milestone gates requiring explicit human sign-off." },
  { title: "Multi Rate Token Bucket Traffic Shaping Valve", desc: "Controls request flow using dual token bucket rate limiting for burst and steady traffic." },
  { title: "Multi State Finite State Machine FSM Transitions", desc: "Enforces strict state transitions, entry/exit hooks, and valid trigger conditions." },
  { title: "Multi Phase Distributed Transaction Saga Pattern", desc: "Executes saga orchestration across distributed services with compensating rollback steps." },
  { title: "Multi Branch Priority Queue Job Scheduler", desc: "Dispatches jobs based on priority weight, deadline urgency, and worker capacity." },
  { title: "Multi Path Circuit Breaker Health Degrade Loop", desc: "Monitors upstream service errors, trips circuit breaker, and routes to cached mock data." },
  { title: "Multi Tier Batch Stream Hybrids Data Processing", desc: "Combines real-time event streaming with scheduled micro-batch aggregation pipelines." },

  { title: "Multi Gateway Dynamic Load Balancing Router", desc: "Distributes incoming traffic across healthy backend endpoints using weighted round-robin." },
  { title: "Multi Layer Retry Exponential Backoff Jitter", desc: "Retries transient network failures using randomized full-jitter exponential backoff." },
  { title: "Multi Step Document Conversion State Machine", desc: "Tracks document upload, malware scan, OCR parsing, indexing, and notify state flow." },
  { title: "Multi Channel Event Driven Webhook Broadcaster", desc: "Publishes state change events to multiple external consumer webhook subscriptions." },
  { title: "Multi Queue Dead Letter Replay Mechanism", desc: "Captures failed queue messages in DLQ, isolates poison pills, and replays valid payloads." },
  { title: "Multi Threshold Auto Scaling Trigger Engine", desc: "Monitors CPU, memory, and queue depth thresholds to trigger pod/VM scaling events." },
  { title: "Multi Step User Onboarding Verification Workflow", desc: "Orchestrates email confirmation, KYC identity check, initial setup, and welcome flow." },
  { title: "Multi Layer Task Dependency Graph DAG Orchestration", desc: "Executes directed acyclic graphs ensuring prerequisite parent tasks complete before children." },
  { title: "Multi Region High Availability Traffic Failover", desc: "Monitors DNS health checks and routes user traffic away from degraded regions." },
  { title: "Multi Level Cache Revalidation Stale While Revalidate", desc: "Serves stale cached assets immediately while asynchronously revalidating in background." },

  { title: "Multi Step Payment Processing Settlement Pipeline", desc: "Orchestrates payment authorization, fraud check, capture, payout split, and ledger entry." },
  { title: "Multi Stage ETL Data Pipeline Ingestion Workflow", desc: "Orchestrates data extract, schema validation, enrichment transform, and bulk database load." },
  { title: "Multi User Collaborative Locking Concurrency Control", desc: "Manages optimistic and pessimistic locking for concurrent document edit sessions." },
  { title: "Multi Step Email Campaign Sequence Drip Engine", desc: "Triggers drip emails based on delay timers, user engagement clicks, and unsubscribes." },
  { title: "Multi Level Permission Authorization Enforcer RBAC", desc: "Evaluates role-based and attribute-based access control rules before route execution." },
  { title: "Multi Phase Feature Flag Canary Deployment Router", desc: "Routes percentages of user traffic to canary release features with automatic rollback on error." },
  { title: "Multi Step Order Fulfillment Warehouse Routing", desc: "Routes e-commerce orders to nearest warehouse with stock, dispatches pick/pack, and tracks delivery." },
  { title: "Multi Tier Database Connection Pool Balancer", desc: "Manages connection checkout timeouts, max pool limits, and idle connection reaping." },
  { title: "Multi Step Video Transcoding HLS Playlist Workflow", desc: "Orchestrates raw video upload, multi-bitrate encoding, HLS chunking, and CDN distribution." },
  { title: "Multi Phase Cloud Resource Provisioning Pipeline", desc: "Executes Terraform plan, IAM creation, security group binding, and VM boot verification." },

  { title: "Multi Step Subscription Renewal Dunning Flow", desc: "Handles failed payment retries, customer email notifications, grace periods, and cancellation." },
  { title: "Multi Layer API Gateway Rate Limit Throttling", desc: "Enforces per-IP and per-API-key sliding window rate limits across public endpoints." },
  { title: "Multi Step Customer Support Ticket Escalation Router", desc: "Escalates unacknowledged P1 support tickets to manager level after SLA threshold expiry." },
  { title: "Multi Phase Software Build Artifact Release Pipeline", desc: "Runs unit tests, security scans, container build, image tag push, and deployment approval." },
  { title: "Multi Step Inventory Stock Allocation Locking Engine", desc: "Temporarily locks cart inventory during checkout prevention of double-selling stock." },
  { title: "Multi Tier Log Aggregation Filter Ingestion Pipeline", desc: "Filters debug logs, redacts PII data, enriches metadata, and routes to Elasticsearch." },
  { title: "Multi Step Password Reset Security Verification Flow", desc: "Generates short-lived magic links, 2FA OTP codes, and password hash update confirmation." },
  { title: "Multi Phase Medical Appointment Booking Scheduling", desc: "Verifies doctor availability, locks time slot, collects intake form, and dispatches SMS reminder." },
  { title: "Multi Step Loan Application Underwriting Workflow", desc: "Pulls credit score, checks employment, runs debt-to-income calculation, and outputs decision." },
  { title: "Multi Layer Web Crawler Politeness Rate Limit Valve", desc: "Throttles domain scraping speeds adhering to robots.txt crawl delays and IP concurrency." },

  { title: "Multi Step Insurance Claim Fraud Detection Router", desc: "Routes low-risk claims to automated instant payout, and high-risk claims to manual audit." },
  { title: "Multi Phase Data Anonymization PII Scrubber Workflow", desc: "Identifies, masks, hashes, or redacts sensitive PII before publishing data to dev environments." },
  { title: "Multi Step Hotel Room Reservation Cancellation Workflow", desc: "Calculates refund eligibility, releases room inventory, and dispatches cancellation email." },
  { title: "Multi Tier Microservice Distributed Tracing Context Router", desc: "Injects and propagates W3C traceparent headers across HTTP/gRPC service calls." },
  { title: "Multi Step E-Commerce Product Return Refund Flow", desc: "Generates shipping label, inspects returned item at warehouse, and issues refund credit." },
  { title: "Multi Phase Software License Key Activation Workflow", desc: "Validates license key, registers hardware fingerprint, and issues cryptographically signed JWT." },
  { title: "Multi Step B2B Vendor Onboarding Compliance Check", desc: "Collects W-9 form, runs sanctions background search, verifies insurance certificate, and approves vendor." },
  { title: "Multi Layer Edge CDN Cache Purge Invalidation Router", desc: "Distributes instant CDN cache purge requests globally across edge PoPs upon content edits." },
  { title: "Multi Step Employee Resignation Offboarding Workflow", desc: "Revokes SSO access, archives email box, requests laptop return, and dispatches final paycheck." },
  { title: "Multi Phase Real Time Sensor Anomaly Escalation Loop", desc: "Triggers acoustic alarm, dispatches SMS alert, and executes emergency shutdown if sensor spikes." },

  { title: "Multi Step University Course Registration Waiting List", desc: "Automatically enrolls top waiting list student when a registered student drops the class." },
  { title: "Multi Tier Automated Backup Snapshot Retention Workflow", desc: "Rotates daily, weekly, and monthly database snapshots deleting expired backups." },
  { title: "Multi Step Food Delivery Order Dispatch Fleet Router", desc: "Matches restaurant order ready event with closest available courier driver." },
  { title: "Multi Phase Flight Booking Seat Selection Check In", desc: "Processes passenger seat assignment, generates mobile boarding pass, and syncs baggage count." },
  { title: "Multi Step Customer Refund Dispute Arbitration Router", desc: "Gathers evidence from buyer and seller, submits to payment processor, and tracks dispute status." },
  { title: "Multi Tier Microgrid Battery Charging Energy Router", desc: "Routes surplus solar power to battery storage, grid export, or EV charging stations dynamically." },
  { title: "Multi Step Intellectual Property Takedown DMCA Notice Flow", desc: "Scans reported URL, verifies copyright ownership, removes infringing content, and notifies uploader." },
  { title: "Multi Phase Vehicle Fleet Preventative Maintenance Router", desc: "Tracks mileage/engine hours, schedules mechanic service appointment, and dispatches loaner vehicle." },
  { title: "Multi Step Crowdfunding Campaign All or Nothing Payout", desc: "Monitors target deadline; charges backer credit cards if funded, or cancels authorizations if missed." },
  { title: "Multi Horizon Master Workflow Execution Control Engine", desc: "Enforces master state machine, fault recovery, concurrency control, and deterministic execution." }
];

// --------------------------------------------------------------------------
// 7. CORE PROMPTING - 60 SKILLS
// --------------------------------------------------------------------------
const CORE_ITEMS = [
  { title: "Multi Perspective Persona System Prompt Framing", desc: "Structures system prompts establishing core identity, domain expertise, behavioral rules, and negative constraints." },
  { title: "Multi Stage Few Shot Example Anchor Calibration", desc: "Calibrates model output formatting and reasoning style using curated diverse few-shot prompt examples." },
  { title: "Multi Layer Prompt Variable Injection System", desc: "Template engine injecting dynamic context variables, user preferences, and metadata safely." },
  { title: "Multi Constraint Prompt Boundary Enforcement", desc: "Establishes strict boundaries preventing hallucination, topic drift, and out-of-scope responses." },
  { title: "Multi Format Output Schema Injection", desc: "Forces exact JSON Schema, XML, or Markdown table output through precise prompt structural directives." },
  { title: "Multi Step Chain of Thought CoT Guidance", desc: "Instructs step-by-step intermediate reasoning paths prior to producing the final answer." },
  { title: "Multi Angle Context Window Compression", desc: "Summarizes and compresses long conversation histories preserving key entities and decisions." },
  { title: "Multi Level Negative Prompting Anti Pattern Guard", desc: "Explicitly specifies forbidden phrases, buzzwords, tone pitfalls, and unwanted structural artifacts." },
  { title: "Multi Style Tone and Voice Register Adapter", desc: "Adapts response register seamlessly between academic, executive, casual, empathetic, or authoritative." },
  { title: "Multi Task Unified Zero Shot Prompt Architecture", desc: "Structures single prompts capable of categorizing, extracting, and summarizing content simultaneously." },

  { title: "Multi Step Self Correction Prompt Loop", desc: "Instructs model to review its draft response against criteria and output an improved revision." },
  { title: "Multi Layer Role Based System Context Injection", desc: "Combines domain expert role, audience persona profile, and task parameters in system prompt." },
  { title: "Multi Level Detail Expansion Slider Control", desc: "Controls output depth from 1-sentence executive summary to exhaustive multi-page breakdown." },
  { title: "Multi Option Alternative Solution Generator", desc: "Forces prompt to generate 3 distinct solution approaches (e.g. conservative, balanced, aggressive)." },
  { title: "Multi Language Translation Register Calibration", desc: "Translates text while preserving specialized industry terminology and local cultural idioms." },
  { title: "Multi Perspective Socratic Questioning Prompt", desc: "Guides user discovery through structured Socratic follow-up questions rather than direct answers." },
  { title: "Multi Stage Document Summarization Hierarchy", desc: "Produces TL;DR, key takeaways bullet points, and detailed chapter-by-chapter summaries." },
  { title: "Multi Constraint Creative Writing Sandbox Prompt", desc: "Enforces genre conventions, word count caps, character constraints, and narrative POV." },
  { title: "Multi Step Complex Problem Deconstruction Engine", desc: "Breaks intimidating user requests into clear sub-tasks, addressing each systematically." },
  { title: "Multi Persona Deliberation Synthesis Prompt", desc: "Combines perspectives from 3 distinct virtual advisors before delivering a unified recommendation." },

  { title: "Multi Layer Context Chunk RAG Prompt Alignment", desc: "Formats retrieved RAG context blocks with citation markers ensuring factual grounding." },
  { title: "Multi Level Explanation Feynman Technique Prompt", desc: "Explains complex concepts at 5-year-old, high school, undergraduate, and PhD levels." },
  { title: "Multi Stage Code Refactoring Explanation Prompt", desc: "Outputs refactored code alongside detailed explanations of performance and readability gains." },
  { title: "Multi Perspective Debating Argument Formulation", desc: "Generates strongest arguments for, strongest counterarguments against, and neutral synthesis." },
  { title: "Multi Criteria Content Proofreading Editing Prompt", desc: "Edits prose for grammar, clarity, conciseness, passive voice removal, and tone alignment." },
  { title: "Multi Format Structural Output Switcher Prompt", desc: "Renders same core information dynamically as bulleted list, Markdown table, JSON, or executive memo." },
  { title: "Multi Step Technical Spec Requirement Extraction", desc: "Extracts functional requirements, non-functional requirements, and constraints from raw notes." },
  { title: "Multi Horizon Goal Planning Action Step Generator", desc: "Breaks ambitious goals into immediate 7-day action steps, 30-day milestones, and 90-day targets." },
  { title: "Multi Angle User Intent Disambiguation Prompt", desc: "Detects ambiguous user queries and asks targeted clarifying questions before answering." },
  { title: "Multi Layer Metaphor and Analogy Generator", desc: "Explains abstract technical concepts using vivid everyday real-world analogies." },

  { title: "Multi Step Email Copywriting Response Drafter", desc: "Drafts professional email responses calibrated for cold outreach, negotiation, or conflict resolution." },
  { title: "Multi Criteria Resume and CV Optimization Prompt", desc: "Tailors user resume achievements to match specific target job description keywords and ATS filters." },
  { title: "Multi Perspective Interview Preparation Simulator", desc: "Simulates tough interviewer questions, evaluates user answers, and provides coaching feedback." },
  { title: "Multi Stage Research Paper Outline Architect", desc: "Structures academic paper outlines with thesis statement, literature review sections, and methodology." },
  { title: "Multi Angle Product Review Sentiment Summarizer", desc: "Synthesizes hundreds of customer reviews into pros, cons, bug reports, and feature requests." },
  { title: "Multi Step Recipe and Meal Plan Customizer", desc: "Generates weekly meal plans adhering to dietary restrictions, calorie targets, and grocery budgets." },
  { title: "Multi Layer Contract Risk Keyword Highlighter", desc: "Scans legal agreements highlighting indemnities, liability caps, and termination penalties." },
  { title: "Multi Stage Marketing Copy Headline Generator", desc: "Generates 10 high-converting ad headlines testing curiosity, urgency, benefit, and social proof hooks." },
  { title: "Multi Angle Meeting Transcript Action Item Extractor", desc: "Parses meeting transcripts extracting key decisions, assigned action items, and deadlines." },
  { title: "Multi Step Bug Report Reproduction Steps Generator", desc: "Formats user bug complaints into clean GitHub issue templates with steps to reproduce and logs." },

  { title: "Multi Perspective Historical Event Analysis Prompt", desc: "Analyzes historical events through economic, social, political, and military lenses." },
  { title: "Multi Level Vocabulary Complexity Adjuster", desc: "Rewrites text adjusting reading level from elementary school to GRE/post-graduate standard." },
  { title: "Multi Stage Creative Brainstorming Mind Map Prompt", desc: "Generates central topic mind map nodes, sub-branches, and unexpected creative connections." },
  { title: "Multi Perspective Public Speaking Keynote Outline", desc: "Structures keynote speeches with attention hook, 3 core pillars, audience stories, and call to action." },
  { title: "Multi Layer Customer Support Escalation Drafter", desc: "Drafts empathetic support replies handling irate customers while protecting company policies." },
  { title: "Multi Stage Podcast Episode Interview Questions", desc: "Drafts icebreaker, deep-dive background, controversial debate, and rapid-fire podcast questions." },
  { title: "Multi Perspective Financial Earnings Call Parser", desc: "Extracts guidance changes, management tone shifts, and analyst Q&A friction from earnings calls." },
  { title: "Multi Level Storytelling Arc Narrative Builder", desc: "Structures narrative story arcs following Hero's Journey, Three-Act Structure, or Dan Harmon Circle." },
  { title: "Multi Angle Fitness Training Workout Plan Generator", desc: "Designs gym workout splits tailored to user fitness level, equipment availability, and goals." },
  { title: "Multi Step Travel Itinerary Trip Planner", desc: "Builds day-by-day travel itineraries balancing sightseeing, dining, transit time, and rest." },

  { title: "Multi Perspective Philosophical Thought Experiment", desc: "Explores ethical and metaphysical implications of classic thought experiments (e.g. Trolley, Ship of Theseus)." },
  { title: "Multi Layer E-Commerce Product Description Copywriter", desc: "Writes SEO-optimized product descriptions highlighting specs, benefits, and emotional lifestyle appeal." },
  { title: "Multi Stage Math Problem Solver Step Generator", desc: "Solves complex math/statistics problems showing explicit step-by-step derivations and formulas." },
  { title: "Multi Angle Pitch Deck Slide Storyboard", desc: "Drafts 10-slide startup pitch deck content from Problem/Solution to Market Size and Financials." },
  { title: "Multi Perspective Grant Application Narrative Writer", desc: "Drafts grant narratives highlighting project impact, community need, methodology, and evaluation." },
  { title: "Multi Level Interactive Quiz and Flashcard Generator", desc: "Generates multiple-choice questions, explanations, and flashcards from study text." },
  { title: "Multi Angle User Story Acceptance Criteria Drafter", desc: "Writes Agile user stories with 'Given-When-Then' BDD acceptance criteria." },
  { title: "Multi Stage Real Estate Listing Copywriter", desc: "Writes evocative property descriptions highlighting home features, neighborhood amenities, and architectural style." },
  { title: "Multi Angle Crisis PR Statement Drafter", desc: "Drafts corporate crisis communications addressing public concerns, taking accountability, and outlining actions." },
  { title: "Multi Horizon Master System Prompt Design Engine", desc: "Enforces master prompt engineering principles, zero-hallucination guardrails, and optimal context use." }
];

// --------------------------------------------------------------------------
// 8. CREATIVE - 60 SKILLS
// --------------------------------------------------------------------------
const CREATIVE_ITEMS = [
  { title: "Multi Layer Worldbuilding Cosmology Magic System", desc: "Constructs rich fictional universes with coherent physical laws, magic limitations, and lore." },
  { title: "Multi Voice Polyphonic Novel Narrative Design", desc: "Weaves multiple distinct character perspective chapters into a cohesive overarching plot arc." },
  { title: "Multi Sensory Immersive Environment Scene Evocation", desc: "Evokes vivid auditory, olfactory, visual, tactile, and gustatory descriptions in literary fiction." },
  { title: "Multi Genre Fusion Fiction Story Concepting", desc: "Blends disparate genres (e.g. Cyberpunk Western, Historical Fantasy, Sci-Fi Horror) into original narratives." },
  { title: "Multi Stage Character Arc Psychological Transformation", desc: "Tracks protagonist internal flaws, catalytic inciting incidents, midpoints, and thematic redemption." },
  { title: "Multi Format Transmedia Storytelling Universe Blueprint", desc: "Expands story IP across novels, graphic novels, podcasts, video games, and film adaptations." },
  { title: "Multi Perspective Non Linear Storytelling Architecture", desc: "Structures stories using non-linear chronologies, memory flashbacks, and parallel timeline loops." },
  { title: "Multi Dynamic Interactive Choice Fiction Branching", desc: "Drafts choose-your-own-adventure story paths with meaningful consequences and multiple endings." },
  { title: "Multi Layer Allegorical Symbolism Metaphor Design", desc: "Embeds subtle philosophical allegories, recurring motifs, and thematic symbolism throughout fiction." },
  { title: "Multi Style Poetic Form Metrical Composition", desc: "Drafts poetry in Sonnet, Haiku, Villanelle, Free Verse, or Spoken Word styles with metrical precision." },

  { title: "Multi Character Dialogue Subtext Tension Crafting", desc: "Writes dramatic dialogue where characters' true motives, conflicts, and emotions lie beneath spoken words." },
  { title: "Multi Stage Screenplay Scene Pacing Beat Sheet", desc: "Structures movie scenes using Blake Snyder Save the Cat beats, sequence pacing, and dramatic tension." },
  { title: "Multi Horizon Science Fiction Speculative World Building", desc: "Extrapolates future technologies, societal shifts, bio-engineering, and space colonization concepts." },
  { title: "Multi Faction Geopolitical Fantasy Kingdom Conflicts", desc: "Designs competing noble houses, guilds, religious orders, and secret societies vying for power." },
  { title: "Multi Layer Mystery Crime Clue Red Herring Weaving", desc: "Engineers whodunit mystery plots with fair-play clues, subtle red herrings, and shocking reveals." },
  { title: "Multi Perspective Villain Motivation Antagonist Design", desc: "Crafts complex antagonists with sympathetic backstories, moral justifications, and tragic flaws." },
  { title: "Multi Style Lyric Songwriting Melody Meter", desc: "Drafts song lyrics with verse-chorus-bridge structures, rhyme schemes, and musical rhythm." },
  { title: "Multi Layer Historical Fiction Authenticity Weaving", desc: "Weaves historical facts, period dialogue, cultural norms, and real figures into fictional narratives." },
  { title: "Multi Character Ensemble Comedy Dynamics Design", desc: "Structures ensemble comedy character archetypes, banter dynamics, and escalating situational chaos." },
  { title: "Multi Stage Horror Tension Dread Atmosphere Building", desc: "Builds psychological horror through eerie pacing, sensory isolation, uncanny atmosphere, and climactic terror." },

  { title: "Multi Level Mythological Folklore Legend Crafting", desc: "Creates original mythologies, pantheons of deities, creation myths, and ancient hero legends." },
  { title: "Multi Medium Visual Storyboard Scene Description", desc: "Writes camera direction, shot framing (close-up, wide panning), lighting mood, and action descriptions." },
  { title: "Multi Character Romance Chemistry Slow Burn Arc", desc: "Paces romantic tension, emotional intimacy, miscommunications, and satisfying resolution." },
  { title: "Multi Layer Satire Parody Cultural Critique", desc: "Crafts sharp satirical fiction parodying corporate absurdities, social trends, or political systems." },
  { title: "Multi Horizon Post Apocalyptic Survival Environment", desc: "Designs post-collapse societies, resource scarcity dynamics, mutated ecosystems, and survivor enclaves." },
  { title: "Multi Character Speech Voice Dialect Idiolect Styling", desc: "Gives each character unique speech patterns, regional slang, vocabulary quirks, and catchphrases." },
  { title: "Multi Stage Graphic Novel Script Panel Layout", desc: "Formats comic book scripts specifying page grids, panel descriptions, captions, and speech bubbles." },
  { title: "Multi Layer Magical Realism Everyday Surrealism", desc: "Blends mundane real-world settings with extraordinary, dreamlike magical elements accepted as normal." },
  { title: "Multi Character Heist Plot Blueprint Execution", desc: "Engineers intricate heist plans with specialist team assembly, security obstacles, and unexpected twists." },
  { title: "Multi Horizon Cyberpunk High Tech Low Life Dystopia", desc: "Designs neon-lit megacities, mega-corporations, cybernetic enhancements, and underworld hackers." },

  { title: "Multi Perspective Epistolary Novel Document Assembly", desc: "Tells stories through diary entries, emails, police reports, interview transcripts, and letters." },
  { title: "Multi Stage Action Choreography Stunt Pacing", desc: "Writes visceral, spatial action combat scenes with clear cause-and-effect choreography." },
  { title: "Multi Layer Gothic Atmosphere Haunted Environment", desc: "Crafts creepy gothic horror featuring crumbling mansions, family curses, stormy weather, and madness." },
  { title: "Multi Character Time Travel Causality Loop Paradox", desc: "Engineers time travel narratives navigating grandfather paradoxes, butterfly effects, and fixed points." },
  { title: "Multi Stage Audio Drama Script Sound Effect Design", desc: "Formats radio/podcast drama scripts with rich sound effects (SFX), ambient noise, and voice cues." },
  { title: "Multi Layer Urban Fantasy Hidden World Concealment", desc: "Designs secret magical societies hiding in plain sight beneath modern metropolitan cities." },
  { title: "Multi Perspective Multiverse Parallel Reality Architecture", desc: "Structures stories exploring alternate history branches and parallel universe counterpart characters." },
  { title: "Multi Character Micro Fiction Flash Story Crafting", desc: "Writes impactful complete stories under 500 words with vivid punchlines and emotional resonance." },
  { title: "Multi Layer Space Opera Galactic Empire Civilizations", desc: "Designs sprawling space empires, alien species physiology, faster-than-light transit, and starship battles." },
  { title: "Multi Stage Childrens Picture Book Rhythm Rhyme", desc: "Drafts engaging picture book text with rhythmic repetition, visual page-turn hooks, and gentle morals." },

  { title: "Multi Character Young Adult Coming of Age Storyline", desc: "Explores teenage identity, friendship conflicts, first love, and standing up against authority." },
  { title: "Multi Layer Noir Detective Hardboiled Investigation", desc: "Crafts gritty detective noir with cynicism, femme fatales, rain-soaked streets, and systemic corruption." },
  { title: "Multi Stage Steampunk Victorian Industrial Technology", desc: "Designs brass clockwork mechanisms, steam-powered airships, Victorian etiquette, and mad scientists." },
  { title: "Multi Character Solarpunk Ecological Hopeful Future", desc: "Designs optimistic eco-cities, solar architecture, community resilience, and sustainable tech." },
  { title: "Multi Layer LitRPG Game Mechanics Progression Story", desc: "Integrates stats, level-ups, skill trees, and quest logs seamlessly into fiction narratives." },
  { title: "Multi Stage Kaiju Giant Monster Disaster Narrative", desc: "Paces giant monster attacks, military defense strategies, city destruction, and human survival." },
  { title: "Multi Character Superhero Origin Team Assembly", desc: "Crafts superhero origin stories, unique power sets, weakness limitations, and team chemistry." },
  { title: "Multi Layer Grimdark Dark Fantasy Moral Grey Ambiguity", desc: "Creates bleak fantasy worlds with morally grey anti-heroes, brutal realism, and pyrrhic victories." },
  { title: "Multi Stage Tabletop RPG Campaign Module Architect", desc: "Designs D&D/TTRPG campaign modules with quest hooks, dungeon maps, NPC stats, and encounter balance." },
  { title: "Multi Horizon Master Creative Direction Storytelling Engine", desc: "Enforces master artistic vision, narrative pacing, emotional resonance, and world-class prose." }
];

// --------------------------------------------------------------------------
// 9. DATA & KNOWLEDGE - 60 SKILLS
// --------------------------------------------------------------------------
const DATAKNOWLEDGE_ITEMS = [
  { title: "Multi Source Knowledge Graph Triplet Extraction Engine", desc: "Extracts subject-predicate-object triples from unstructured texts for GraphDB ingestion." },
  { title: "Multi Modal Vector Embedding Hybrid Search Engine", desc: "Combines dense vector embeddings with sparse BM25 keyword search for high-accuracy retrieval." },
  { title: "Multi Layer Enterprise Ontology Taxonomy Builder", desc: "Constructs hierarchical domain taxonomies and OWL ontologies for enterprise data unification." },
  { title: "Multi Stage Data Deduplication Record Linkage Engine", desc: "Identifies duplicate customer records using fuzzy string matching, blocking keys, and machine learning." },
  { title: "Multi Tenant Database Schema Row Level Security RLS", desc: "Configures PostgreSQL RLS policies ensuring strict tenant data isolation in shared databases." },
  { title: "Multi Provider Data Ingestion Pipeline ETL ELT Engine", desc: "Extracts data from REST APIs, Kafka, and SQL DBs into Snowflake/BigQuery data warehouses." },
  { title: "Multi Level Data Governance Lineage Compliance Audit", desc: "Tracks data origin, transformation lineage, and PII exposure across corporate pipelines." },
  { title: "Multi Format Document OCR Structured Extraction Engine", desc: "Extracts tabular data from scanned PDFs, receipts, and invoices into structured JSON." },
  { title: "Multi Layer Semantic Cache Vector Query Optimization", desc: "Caches LLM vector responses to dramatically reduce API costs and latency on similar queries." },
  { title: "Multi Source Master Data Management MDM Consensus", desc: "Resolves conflicting data fields across CRM, ERP, and billing systems into a single source of truth." },

  { title: "Multi Stage Time Series Anomaly Detection Pipeline", desc: "Identifies trend spikes, seasonal outliers, and sensor drops in IoT time-series streams." },
  { title: "Multi Layer Relational Data Normalization 3NF Audit", desc: "Audits SQL schemas ensuring 1NF, 2NF, and 3NF normalization eliminating redudancy." },
  { title: "Multi Provider Vector Database Benchmark Evaluation", desc: "Benchmarks Pinecone, Qdrant, Milvus, and Weaviate on latency, recall, and indexing throughput." },
  { title: "Multi Stage Automated Data Profiling Statistics Engine", desc: "Calculates null percentages, distributions, cardinality, and skewness across database columns." },
  { title: "Multi Source API Web Scraping Resilient Harvester", desc: "Scrapes web pages handling IP rotation, CAPTCHAs, headless browser rendering, and parsing." },
  { title: "Multi Layer Data Warehouse Dimensional Star Schema", desc: "Designs Kimball star schemas with fact tables and slowly changing dimensions (SCD Type 2)." },
  { title: "Multi Stage Document Chunking RAG Optimization", desc: "Optimizes document chunking strategies (semantic, sliding window, parent-child) for RAG." },
  { title: "Multi Layer Data Encryption at Rest In Transit Architecture", desc: "Configures AES-256 database encryption, TLS 1.3 transit encryption, and KMS key rotation." },
  { title: "Multi Method Missing Data Imputation Pipeline", desc: "Imputes missing dataset values using mean, median, k-NN, or MICE statistical methods." },
  { title: "Multi Provider Geospatial Spatial Query Engine", desc: "Performs PostGIS spatial joins, buffer calculations, and distance queries on GeoJSON data." },

  { title: "Multi Stage Data Pipeline Quality Validation Expectations", desc: "Validates data pipeline outputs against Great Expectations rules (non-null, value ranges)." },
  { title: "Multi Source Social Listening Aggregator Pipeline", desc: "Aggregates social posts, filters spam, extracts hashtags, and computes brand sentiment." },
  { title: "Multi Layer Database Indexing Query Tuning Blueprint", desc: "Tunes slow SQL queries adding B-Tree, GIN, GiST, and partial indexes for high IOPS." },
  { title: "Multi Format Log Parser Regex Structuring Engine", desc: "Parses unformatted syslog, Nginx, and application logs into structured JSON event logs." },
  { title: "Multi Stage Machine Learning Feature Store Architecture", desc: "Stores, versions, and serves online and offline ML features using Feast/Hopsworks." },
  { title: "Multi Provider Distributed Database Sharding Partitioning", desc: "Partitions high-volume database tables across database shards using hash keys." },
  { title: "Multi Stage Natural Language Entity Disambiguation Engine", desc: "Disambiguates named entities (e.g. 'Apple' company vs fruit) linking to Wikidata IDs." },
  { title: "Multi Layer Real Time Data Stream Processing Flink", desc: "Processes low-latency event streams using Apache Flink sliding time windows." },
  { title: "Multi Format Graph Database Query Cypher Gremlin Engine", desc: "Writes complex graph traversal queries in Cypher (Neo4j) and Gremlin (AWS Neptune)." },
  { title: "Multi Source Financial Market Data Feed Handler", desc: "Parses FIX protocol and WebSocket stock/crypto market depth orderbook feeds." },

  { title: "Multi Stage Automated Data Classification Tagging", desc: "Classifies dataset columns by sensitivity level (Public, Internal, Confidential, Restricted)." },
  { title: "Multi Layer Data Archival Cold Storage Lifecycle Rule", desc: "Configures S3 Glacier lifecycle policies auto-archiving inactive data to low-cost storage." },
  { title: "Multi Method Text Summarization Abstractive Extractive", desc: "Combines extractive key sentence scoring with abstractive transformer summarization." },
  { title: "Multi Source E-Commerce Product Catalog Standardization", desc: "Standardizes product titles, categories, and attributes across vendor supplier feeds." },
  { title: "Multi Stage Image Feature Vector Extraction Engine", desc: "Extracts image feature vectors using ResNet/CLIP for visual similarity search." },
  { title: "Multi Layer Database Connection Proxy Pooling PgBouncer", desc: "Configures PgBouncer transaction pooling reducing memory overhead on database servers." },
  { title: "Multi Stage Audio Transcript Diarization Speaker Labeling", desc: "Labels who spoke when in multi-speaker meeting audio transcripts using Whisper/PyAnnote." },
  { title: "Multi Source Customer Data Platform CDP Identity Resolution", desc: "Stitches anonymous web cookies, email leads, and mobile app IDs into unified user profiles." },
  { title: "Multi Layer Data Lakehouse Delta Lake Apache Iceberg", desc: "Configures Apache Iceberg/Delta Lake ACID transaction layers over object storage." },
  { title: "Multi Method Outlier Detection Statistical Pipeline", desc: "Identifies dataset anomalies using Z-score, Isolation Forests, and DBSCAN clustering." },

  { title: "Multi Source Real Estate MLS Property Feed Aggregator", desc: "Aggregates and normalizes RETS/RESO MLS property listings into unified search index." },
  { title: "Multi Layer Database Backup Point in Time Recovery PITR", desc: "Configures WAL streaming archiving enabling point-in-time database restoration to exact second." },
  { title: "Multi Stage Natural Language Keyword TF-IDF RAKE Extractor", desc: "Extracts domain keyphrases using TF-IDF, RAKE, and TextRank algorithms." },
  { title: "Multi Source Healthcare HL7 FHIR Interoperability Engine", desc: "Parses and transforms legacy HL7 v2 messages into modern FHIR JSON resources." },
  { title: "Multi Layer Columnar Database ClickHouse Query Optimization", desc: "Optimizes ClickHouse MergeTree primary keys, compression codecs, and materialized views." },
  { title: "Multi Stage Video Metadata Extraction Scene Segmentation", desc: "Segments video files into scenes extracting keyframes, OCR text, and speech transcripts." },
  { title: "Multi Source Supply Chain Shipment Tracking Aggregator", desc: "Aggregates container tracking APIs across carriers into unified ETA status pipeline." },
  { title: "Multi Layer Graph Retrieval Augmented Generation GraphRAG", desc: "Combines Knowledge Graph node traversal with vector RAG for complex multi-hop QA." },
  { title: "Multi Stage Survey Response Text Mining Topic Modeling", desc: "Extracts latent topics from open-ended survey comments using BERTopic/LDA." },
  { title: "Multi Source Patent Document Citation Graph Builder", desc: "Builds patent citation trees mapping technology lineages and competitor IP portfolios." },

  { title: "Multi Layer Web Application Firewall WAF Log Inspector", desc: "Parses WAF alert logs identifying SQL injection and XSS attack patterns." },
  { title: "Multi Stage Genetic Sequence FASTA VCF File Parser", desc: "Parses genomic variant call format (VCF) files extracting gene mutation annotations." },
  { title: "Multi Source News Article Event Extraction Pipeline", desc: "Extracts who, what, where, when event facts from worldwide news RSS feeds." },
  { title: "Multi Layer High Velocity Key Value Store Redis Cluster", desc: "Configures Redis cluster hash slot sharding and sentinel automatic failover." },
  { title: "Multi Stage PDF Form Field Interactive Coordinate Extractor", desc: "Extracts form field coordinates and checkbox states from fillable PDF forms." },
  { title: "Multi Source Cryptocurrency Blockchain Ledger Indexer", desc: "Indexes EVM transaction logs, ERC-20 token transfers, and smart contract events." },
  { title: "Multi Layer Open Data CKAN API Harvesting Engine", desc: "Harvests open government datasets from CKAN platforms into centralized portal." },
  { title: "Multi Stage Speech Recognition Phoneme Alignment Pipeline", desc: "Aligns spoken audio timestamps with word-level phonetic transcripts." },
  { title: "Multi Source Meteorological Weather Forecast Aggregator", desc: "Aggregates NOAA, ECMWF, and local weather station data into unified weather API." },
  { title: "Multi Horizon Master Data Engineering Knowledge Engine", desc: "Enforces master data modeling, pipeline scalability, vector storage, and analytics architecture." }
];

// --------------------------------------------------------------------------
// 10. DIALOGUE & INTERACTIVITY - 60 SKILLS
// --------------------------------------------------------------------------
const DIALOGUE_ITEMS = [
  { title: "Multi Turn Conversation State Memory Tracking", desc: "Maintains entity slots, user intent history, and dialogue state across multi-turn chats." },
  { title: "Multi Persona Conversational Roleplay Facilitator", desc: "Facilitates interactive roleplay scenarios seamlessly switching between multiple NPC characters." },
  { title: "Multi Modality Conversational Text Voice Visual Switcher", desc: "Adapts dialogue style seamlessly between text chat, spoken audio, and visual UI card prompts." },
  { title: "Multi Intent Ambiguity Disambiguation Dialogue", desc: "Detects overlapping user intents and asks targeted single-choice clarifying prompts." },
  { title: "Multi Stage Customer Support Escalation De Escalation", desc: "De-escalates frustrated users using empathetic reflective listening before proposing solutions." },
  { title: "Multi Agent Interactive Chat Room Moderator", desc: "Monitors multi-user group chat rooms enforcing ground rules and synthesizing conversation summaries." },
  { title: "Multi Perspective Socratic Mentorship Dialogue", desc: "Guides student problem solving through progressive Socratic hints rather than giving direct answers." },
  { title: "Multi Language Real Time Conversational Translation", desc: "Translates live dialogue turn-by-turn maintaining conversational naturalness and tone." },
  { title: "Multi Channel Messaging Bot Handler Pipeline", desc: "Powers unified chat interfaces working across WhatsApp, Slack, Telegram, and Web widget." },
  { title: "Multi Step Interactive Form Filing Assistant", desc: "Guides users step-by-step through complex multi-field form completion via natural chat." },

  { title: "Multi Tone Conversational Register Adaptive Engine", desc: "Adjusts conversation tone dynamically matching user formality, enthusiasm, or distress." },
  { title: "Multi Stage B2B Sales Qualification Discovery Chat", desc: "Conducts natural discovery conversations evaluating budget, authority, need, and timeline (BANT)." },
  { title: "Multi Option Conversational Choice Recommendation", desc: "Presents structured 3-option choices in chat guiding user decision-making effortlessly." },
  { title: "Multi Turn Code Troubleshooting Diagnostic Chat", desc: "Interactively diagnoses software bugs asking for error logs, code snippets, and expected behavior." },
  { title: "Multi Persona Advisory Board Conversation Facilitator", desc: "Coordinates a multi-advisor round-table discussion where user can ask questions to specific experts." },
  { title: "Multi Stage Medical Patient Intake Screener Chat", desc: "Gathers patient chief complaints, medical history, and symptoms via conversational intake flow." },
  { title: "Multi Horizon Interactive Storytelling Game DM", desc: "Acts as Dungeon Master dynamically responding to player choices and describing immersive outcomes." },
  { title: "Multi User Group Discussion Consensus Building Chat", desc: "Facilitates group decision making in team chat summarizing agreements and highlighting friction." },
  { title: "Multi Stage Job Interview Coaching Simulator Chat", desc: "Asks behavioral interview questions turn-by-turn providing immediate feedback on user responses." },
  { title: "Multi Layer Conversational Security Injection Shield", desc: "Filters prompt injection attacks and out-of-bounds user attempts in real-time chat turns." },

  { title: "Multi Step Language Learning Conversation Partner", desc: "Acts as foreign language tutor correcting grammar gently while keeping conversation flowing." },
  { title: "Multi Angle User Feedback Survey Conversational Bot", desc: "Collects customer feedback through engaging conversational questions rather than static forms." },
  { title: "Multi Stage Technical Onboarding Guidance Chat", desc: "Guides new developers through local dev environment setup step-by-step in chat." },
  { title: "Multi Persona Legal Consultation Assistant Chat", desc: "Gathers legal case details conversationally explaining relevant statutes in accessible terms." },
  { title: "Multi Step Financial Budgeting Planning Advisor", desc: "Asks user income and expense questions conversationally constructing personalized budget." },
  { title: "Multi Angle Product Recommendation Shopping Assistant", desc: "Recommends ideal e-commerce products through conversational preference discovery." },
  { title: "Multi Stage Troubleshooting Hardware Support Bot", desc: "Guides user through physical hardware reboot, cable check, and indicator light diagnostics." },
  { title: "Multi Persona Creative Brainstorming Partner Chat", desc: "Bounces creative ideas back and forth with user adding unexpected twists and builds." },
  { title: "Multi Step Travel Concierge Itinerary Planner Chat", desc: "Plans personalized travel trips conversationally adjusting based on user budget and tastes." },
  { title: "Multi Level Educational Quiz Flashcard Tutor Chat", desc: "Tests user knowledge conversationally adapting difficulty based on right/wrong answers." },

  { title: "Multi Stage HR Employee Benefits Q A Assistant", desc: "Answers employee health insurance and PTO policy questions conversationally." },
  { title: "Multi Persona Debating Opponent Simulation Chat", desc: "Engages in respectful debate against user positions challenging assumptions with evidence." },
  { title: "Multi Step Real Estate Property Search Assistant", desc: "Discovers user home preferences conversationally showing matched property listings." },
  { title: "Multi Angle Fitness Coaching Motivation Chat", desc: "Tracks user daily workout progress conversationally offering encouragement and tip adjustments." },
  { title: "Multi Stage Recipe Cooking Assistant Step Guide", desc: "Guides user through cooking recipes step-by-step responding to hands-free voice questions." },
  { title: "Multi Persona Philosophical Dialogue Companion", desc: "Explores existential and ethical topics in deep reflective conversation." },
  { title: "Multi Step Event Planning Checklist Facilitator", desc: "Helps user plan weddings/conferences step-by-step managing vendor and guest lists." },
  { title: "Multi Angle Automotive Car Maintenance Advisor Chat", desc: "Diagnoses weird car noises and warning lights conversationally advising urgency." },
  { title: "Multi Stage Mental Wellness Reflection Companion", desc: "Provides supportive, non-clinical reflective listening and mindfulness grounding prompts." },
  { title: "Multi Persona Historical Figure Chat Simulator", desc: "Simulates conversation with historical figures (e.g. Leonardo da Vinci, Marie Curie) in character." },

  { title: "Multi Step SaaS Product Feature Discovery Bot", desc: "Guides existing users to discover unused advanced features through targeted chat tips." },
  { title: "Multi Angle Insurance Claim Filing Assistant Chat", desc: "Guides policyholder through reporting accident details and uploading damage photos." },
  { title: "Multi Stage University Student Academic Advisor Bot", desc: "Answers course credit requirements and graduation track questions conversationally." },
  { title: "Multi Persona Fan Fiction Roleplay Companion", desc: "Engages in creative roleplay within established fiction fandom universes." },
  { title: "Multi Step E-Commerce Order Tracking Status Bot", desc: "Answers 'where is my order' questions conversationally providing live tracking links." },
  { title: "Multi Angle Commercial Loan Pre-Qualification Chat", desc: "Gathers business revenue numbers conversationally estimating loan eligibility." },
  { title: "Multi Stage Non-Profit Volunteer Onboarding Chat", desc: "Welcomes new volunteers, collects skill interests, and matches with open projects." },
  { title: "Multi Persona Gaming Strategy Coach Companion", desc: "Provides real-time strategic tips for video games based on user current match state." },
  { title: "Multi Step Home Repair DIY Maintenance Guide", desc: "Guides user through fixing leaky faucets or patching drywall conversationally." },
  { title: "Multi Angle Public Transit Commute Route Assistant", desc: "Provides live bus/train transit advice conversationally during service disruptions." },

  { title: "Multi Stage Restaurant Reservation Ordering Bot", desc: "Takes table reservations and food pre-orders conversationally." },
  { title: "Multi Persona Philosophy of Science Discussion Partner", desc: "Debates epistemology, scientific method, and paradigm shifts." },
  { title: "Multi Step Employee Expense Report Filing Chat", desc: "Gathers receipt details conversationally submitting expense reports for approval." },
  { title: "Multi Angle Pet Healthcare Symptom Checker Bot", desc: "Gathers dog/cat symptoms conversationally advising if emergency vet visit is required." },
  { title: "Multi Stage Apartment Maintenance Service Request Bot", desc: "Logs tenant repair requests, schedules technician visit times conversationally." },
  { title: "Multi Persona Music Appreciation Genre Coach", desc: "Explores music history, chord progressions, and album recommendations conversationally." },
  { title: "Multi Step Library Research Literature Finder Chat", desc: "Helps students find academic books and journal articles conversationally." },
  { title: "Multi Angle Car Dealership Test Drive Booking Bot", desc: "Schedules vehicle test drives and answers vehicle spec questions conversationally." },
  { title: "Multi Stage Community Garden Member Coordinator", desc: "Coordinates plot assignments and community workdays conversationally." },
  { title: "Multi Horizon Master Conversational Dialogue Engine", desc: "Enforces master multi-turn dialogue state tracking, empathy, clarity, and flawless interactivity." }
];

// Execute Batch 2
console.log("--- Executing Batch 2 (ControlFlow, Core, Creative, DataKnowledge, Dialogue) ---");
processCategory('controlFlow', 'controlFlow', 'controlflow-multi', CONTROLFLOW_ITEMS);
processCategory('core', 'core', 'core-multi', CORE_ITEMS);
processCategory('creative', 'creative', 'creative-multi', CREATIVE_ITEMS);
processCategory('dataKnowledge', 'dataKnowledge', 'dataknowledge-multi', DATAKNOWLEDGE_ITEMS);
processCategory('dialogue', 'dialogue', 'dialogue-multi', DIALOGUE_ITEMS);

console.log("Batch 2 Complete!");
