const { appendSkills } = require('../appendSkills.cjs');

function makeSkills(catFileName, categoryId, prefix, items) {
  const skills = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const title = item.title;
    const cleanId = `${prefix}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
    const pascalName = title.replace(/[^a-zA-Z0-9]/g, '') + 'Skill';

    skills.push({
      id: cleanId,
      name: pascalName,
      displayName: item.displayName || title,
      categoryId: categoryId,
      description: item.desc || `Applies advanced ${title} standards and execution patterns.`,
      tags: [categoryId, prefix, ...cleanId.split('-').slice(1, 3)],
      sectionName: item.sec || `${title} Standards`,
      ruSectionName: item.ruSec || `Стандарты и регламенты: ${title}`,
      instructions: item.inst || [
        `Apply core domain tenets for ${title}.`,
        `Enforce strict validation, error-handling, and clear structural bounds.`,
        `Verify output consistency against benchmark standards.`
      ],
      ruInstructions: item.ruInst || [
        `Применяйте ключевые принципы и стандарты для ${title}.`,
        `Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.`,
        `Проверяйте результаты на соответствие эталонным критериям.`
      ],
      semanticType: item.sem || 'process_directive'
    });
  }
  return { catFileName, skills };
}

// 1. LEGAL (+25 -> 165)
const LEGAL_TOPUP_25 = [
  { title: "Alternative Dispute Resolution Mediation Protocol", desc: "Guides pre-litigation commercial dispute resolution through structured mediation." },
  { title: "Maritime Carriage of Goods by Sea Act COGSA", desc: "Applies ocean carrier liability limits and bill of lading legal defenses." },
  { title: "Sovereign Debt Restructuring Paris Club Principles", desc: "Coordinates bilateral official sovereign debt rescheduling and comparability of treatment." },
  { title: "Space Launch Liability Insurance FAA Authorization", desc: "Navigates commercial space launch financial responsibility and FAA payload licenses." },
  { title: "Biometric Genetic Information Nondiscrimination GINA", desc: "Audits employment wellness programs for GINA and genetic data compliance." },
  { title: "Cross-Border Chapter 15 Ancillary Insolvency", desc: "Manages foreign main bankruptcy proceedings in US bankruptcy courts under Chapter 15." },
  { title: "Telecommunications Spectrum Lease Tower Colocation", desc: "Drafts wireless cell tower ground leases and DAS antenna colocation agreements." },
  { title: "False Claims Act Qui Tam Whistleblower Defense", desc: "Defends corporate healthcare and defense contractors against relator FCA suits." },
  { title: "Environmental Clean Air Act Title V Permitting", desc: "Audits industrial plant air emissions and major source operating permits." },
  { title: "Consumer Product Safety CPSC Recall Protocol", desc: "Executes CPSC Section 15(b) fast-track product safety defect reporting and recalls." },
  { title: "FDA 510k Medical Device Clearance Pathway", desc: "Drafts 510(k) premarket notifications demonstrating substantial equivalence." },
  { title: "ERISA Fiduciary Duty Pension Investment Policy", desc: "Ensures ERISA plan trustee compliance with the prudent expert rule and diversification." },
  { title: "ITC Section 337 Patent Import Exclusion Order", desc: "Litigates unfair import trade practices before the International Trade Commission." },
  { title: "Antitrust Hart-Scott-Rodino Premerger Filings", desc: "Prepares FTC/DOJ HSR notification forms for high-value corporate acquisitions." },
  { title: "Corporate Officer Indemnification Deed DO Insurance", desc: "Structures advancement of legal fees and D&O insurance policy coverage." },
  { title: "Patent Prosecution CPC Specification Drafting", desc: "Drafts patent specifications and claims formatted for CPC classification." },
  { title: "Franchise Disclosure Item 19 Performance Audit", desc: "Audits item 19 Financial Performance Representations in Franchise Disclosure Documents." },
  { title: "Intellectual Property Co-Existence Trademark Settlement", desc: "Drafts worldwide trademark co-existence agreements with geographic boundaries." },
  { title: "Municipal Bond Official Statement Disclosure Counsel", desc: "Drafts primary disclosure documents for tax-exempt municipal bond issuances." },
  { title: "FERC Interstate Natural Gas Pipeline Tariff", desc: "Navigates Federal Energy Regulatory Commission open-access transmission tariffs." },
  { title: "Native American Tribal Gaming Compact Sovereignty", desc: "Drafts Class III Indian gaming compacts balancing state and tribal authority." },
  { title: "Cyber Liability Incident Response Forensics Privilege", desc: "Directs cybersecurity breach investigations under attorney-client privilege." },
  { title: "CFPB Unfair Deceptive Abusive Practice UDAAP", desc: "Audits consumer fintech lending flows for CFPB UDAAP enforcement risks." },
  { title: "International Commercial Agency Treaty CISG", desc: "Structures cross-border distributor agreements under local agency protection laws." },
  { title: "Master Jurisprudence Constitutional Legal Systems", desc: "Enforces world-class legal analysis, statutory interpretation, and contract jurisprudence." }
];

// 2. RESEARCH (+20 -> 166)
const RESEARCH_TOPUP_20 = [
  { title: "Computational Linguistics Dependency Parsing Annotation", desc: "Annotates syntactic dependency trees and universal dependency relations in corpora." },
  { title: "Agent-Based Computational Economics Market Simulation", desc: "Simulates emergent macroeconomic phenomena from heterogeneous agent interactions." },
  { title: "Quantum Chemistry Density Functional Theory Calculation", desc: "Models molecular electronic structures and chemical reaction barriers using DFT." },
  { title: "Ecological Niche Modeling Species Distribution Algorithm", desc: "Predicts climate-driven biodiversity shifts using Maxent ecological niche modeling." },
  { title: "Single-Cell RNA Sequencing Trajectory Pseudotime", desc: "Infers cell differentiation trajectories and developmental pseudotime from scRNA-seq." },
  { title: "Historical Epigraphy Paleography Transcription", desc: "Transcribes and dates ancient manuscript inscriptions using paleographic standards." },
  { title: "Behavioral Economics Randomized Field Experiment", desc: "Designs natural field experiments testing behavioral nudges and incentive elasticity." },
  { title: "Spatial Econometrics Geographically Weighted Regression", desc: "Models spatial autocorrelation and spatial heterogeneity in regional economic datasets." },
  { title: "Climate Model Intercomparison CMIP Downscaling", desc: "Downscales global climate model outputs to regional hydrological impact models." },
  { title: "Neuroimaging fMRI Event-Related BOLD Analysis", desc: "Processes functional MRI BOLD signals using general linear models and spatial smoothing." },
  { title: "High-Energy Physics Particle Collider Monte Carlo", desc: "Simulates particle collision event generators and detector responses for LHC data." },
  { title: "Structural Equation Modeling Confirmatory Factor", desc: "Validates latent variable measurement models using covariance structure analysis." },
  { title: "Ethnographic Multi-Sited Fieldwork Shadowing", desc: "Conducts multi-sited ethnographic observation across global supply chain nodes." },
  { title: "Materials Science High-Throughput Crystal Screening", desc: "Screens novel inorganic crystal structures using automated density functional theory." },
  { title: "Urban Spatial Morphology Network Accessibility", desc: "Calculates spatial graph centrality and pedestrian catchment areas in urban layouts." },
  { title: "Demography Life Table Mortality Rate Projection", desc: "Models cohort mortality dynamics using Lee-Carter demographic forecasting." },
  { title: "Comparative Historical Sociology Process Tracing", desc: "Tests causal mechanisms in historical state-building using process tracing." },
  { title: "Genomics Wide Association Study Polygenic Risk", desc: "Calculates polygenic risk scores from population-scale GWAS summary statistics." },
  { title: "Cognitive Psychology Eye-Tracking Fixation Analysis", desc: "Analyzes visual fixation duration and saccade trajectories during cognitive tasks." },
  { title: "Master Advanced Research Methodology Discovery", desc: "Enforces world-class scientific inquiry, empirical validation, and interdisciplinary research." }
];

// 3. MISCELLANEOUS (+10 -> 167)
const MISC_TOPUP_10 = [
  { title: "Traditional Horology Mechanical Watch Regulation", desc: "Regulates mechanical watch balance spring beat error and rate timing across positions." },
  { title: "Custom Stained Glass Lead Came Window Construction", desc: "Builds lead came stained glass windows with waterproofing cement glazing." },
  { title: "Artisan Leather Shoes Goodyear Welt Stitching", desc: "Constructs welted leather dress shoes with cork footbed fillers and hand stitching." },
  { title: "Micro-Distillery Whiskey Mash Fermentation Spirit Cut", desc: "Monitors grain mashing, sour mash fermentation, and sensory spirit cuts on pot stills." },
  { title: "Traditional Stucco Lime Plaster Wall Application", desc: "Applies three-coat breathable lime plaster over wood lath on heritage buildings." },
  { title: "Antique Furniture French Polish Shellac Refinishing", desc: "Builds high-gloss mirror finishes on antique timber using shellac and rubber pads." },
  { title: "Urban Aquaponics Tilapia Leafy Green Nutrient Balance", desc: "Balances nitrifying bacteria, fish stocking density, and plant iron uptake in aquaponics." },
  { title: "Traditional Bowyer Wooden Longbow Tillering", desc: "Tiles wooden self-bow staves to even limb curvature and precise draw weight." },
  { title: "Artisan Glassblowing Furnace Gathering Pipe Shaping", desc: "Gathers molten glass at 2100°F, marvering and blowing vessel forms." },
  { title: "Master Everyday Crafts Applied Life Skills", desc: "Enforces world-class practical craftsmanship, DIY engineering, and artisan mastery." }
];

// 4. SOCIAL (+10 -> 167)
const SOCIAL_TOPUP_10 = [
  { title: "TikTok Live Shopping Broadcast Host Engagement", desc: "Drives real-time e-commerce sales during TikTok live streams with flash deals." },
  { title: "Substack Publication Paid Subscriber Conversion", desc: "Structures newsletter paywalls, lead magnets, and subscriber onboarding emails." },
  { title: "Discord Server Automated Roles Bot Architecture", desc: "Configures community Discord servers with automated onboarding and custom bots." },
  { title: "Twitch Stream Overlay Interactive Channel Points", desc: "Designs Twitch stream overlays and custom channel point gamification triggers." },
  { title: "YouTube Shorts Virality Retention Hook Engineering", desc: "Engineers first 3-second retention hooks and continuous looping audio for Shorts." },
  { title: "LinkedIn Thought Leadership Carousel Playbook", desc: "Formats PDF carousel slide decks optimized for LinkedIn feed engagement." },
  { title: "Reddit Organic Brand Advocacy Subreddit Engagement", desc: "Builds authentic brand presence on Reddit through value-first AMA and community posts." },
  { title: "Threads Real-Time Trending Topic Hijacking", desc: "Drafts witty, high-converting replies to trending news topics on Meta Threads." },
  { title: "WhatsApp Community Channel Broadcast Content Calendar", desc: "Manages direct broadcast channels for VIP customers with exclusive content drops." },
  { title: "Master Social Media Audience Growth Playbook", desc: "Enforces world-class social media strategy, content creation, and community viral growth." }
];

// 5. TECHNICAL (+8 -> 167)
const TECHNICAL_TOPUP_8 = [
  { title: "Kubernetes Custom Resource Definition Operator Pattern", desc: "Builds Kubernetes CRD controllers in Go using controller-runtime reconciliation." },
  { title: "eBPF Linux Kernel Network Packet Filtering Tracing", desc: "Writes C eBPF programs attached to XDP hooks for low-latency kernel packet inspection." },
  { title: "Ceph Distributed Block Object Storage Cluster Tuning", desc: "Tunes Ceph OSD storage pools, CRUSH maps, and Bluestore caching for high IOPS." },
  { title: "HashiCorp Nomad Orchestration Engine Job Specification", desc: "Deploys multi-region containerized workloads using Nomad declarative job specs." },
  { title: "ClickHouse Real-Time Analytics Columnar Database", desc: "Optimizes ClickHouse MergeTree engines, primary keys, and vectorization." },
  { title: "OpenTelemetry Distributed Tracing Collector Architecture", desc: "Configures OpenTelemetry Collectors for traces, metrics, and logs export." },
  { title: "Traefik Reverse Proxy Dynamic Routing ACME", desc: "Sets up Traefik ingress routers with Let's Encrypt automated TLS certificate renewal." },
  { title: "Master Cloud Native Infrastructure Systems Architecture", desc: "Enforces world-class cloud-native, distributed systems, and DevOps engineering." }
];

// 6. WRITING (+4 -> 167)
const WRITING_TOPUP_4 = [
  { title: "Worldbuilding Fictional Magic System Rule Creation", desc: "Establishes hard vs soft magic rules, costs, and limitations for fantasy fiction." },
  { title: "High-Stakes Speechwriting Rhetorical Metaphor", desc: "Crafts keynote speeches using tricolons, anaphora, and memorable metaphors." },
  { title: "Technical Whitepaper Executive Summary Framing", desc: "Condenses complex enterprise technology innovations into persuasive executive whitepapers." },
  { title: "Master Creative Professional Prose Crafting", desc: "Enforces world-class prose, storytelling, persuasive copy, and editorial excellence." }
];

// 7. AGENTIC (+3 -> 167)
const AGENTIC_TOPUP_3 = [
  { title: "Hierarchical Agentic Delegation Supervisor Worker Topology", desc: "Coordinates complex tasks via a supervisor agent that routes sub-tasks to specialized workers." },
  { title: "Self-Reflective Agent Plan Modification Re-Execution", desc: "Enables agents to critique their own intermediate outputs and dynamically revise plans." },
  { title: "Master Autonomous Agentic System Architecture", desc: "Enforces world-class autonomous agent design, multi-agent orchestration, and tool use." }
];

// 8. BUSINESS (+3 -> 167)
const BUSINESS_TOPUP_3 = [
  { title: "SaaS Net Revenue Retention NRR Expansion Playbook", desc: "Drives account expansion through tier upgrades, seat expansion, and usage add-ons." },
  { title: "Strategic Corporate MA Post-Merger Integration Plan", desc: "Executes 100-day post-merger integration for tech, culture, and sales synergy." },
  { title: "Master Enterprise Strategy Commercial Growth", desc: "Enforces world-class commercial execution, corporate strategy, and revenue growth." }
];

// 9. CONTROL FLOW (+3 -> 167)
const CONTROLFLOW_TOPUP_3 = [
  { title: "Distributed Saga Transaction Choreography Orchestration", desc: "Manages multi-service distributed transactions with forward execution and compensations." },
  { title: "Rate-Limiting Sliding Window Counter Algorithm", desc: "Implements high-accuracy sliding window rate limiters for API gateway protection." },
  { title: "Master Control Flow Architecture Execution Control", desc: "Enforces world-class workflow routing, state machines, and resilient execution control." }
];

// 10. CREATIVE (+3 -> 167)
const CREATIVE_TOPUP_3 = [
  { title: "Multi-Sensory Immersive World Scene Conception", desc: "Evokes vivid auditory, olfactory, tactile, and visual imagery in fictional settings." },
  { title: "Avant-Garde Experimental Narrative Structure Design", desc: "Structures non-linear, fragmented, or interactive multi-perspective narratives." },
  { title: "Master Artistic Expression Creative Direction", desc: "Enforces world-class creative concepting, artistic vision, and multimedia storytelling." }
];

// 11. MEDICAL (+5 -> 167)
const MEDICAL_TOPUP_5 = [
  { title: "Clinical Pathway Evidence-Based Patient Care Flowchart", desc: "Standardizes hospital treatment protocols according to evidence-based clinical guidelines." },
  { title: "Pharmacovigilance Adverse Event Reporting Signal Detection", desc: "Monitors drug safety databases for emerging adverse event signals and MedDRA coding." },
  { title: "Telemedicine Remote Patient Monitoring Triaging Protocol", desc: "Triages vital sign anomalies from wearable medical devices in chronic care patients." },
  { title: "Oncology Tumor Board Multidisciplinary Case Presentation", desc: "Synthesizes pathology, radiology, and genetic markers for personalized cancer therapy." },
  { title: "Master Clinical Medical Science Patient Care", desc: "Enforces world-class clinical reasoning, evidence-based medicine, and healthcare standards." }
];

const batchLegal = makeSkills('legal', 'legal', 'legal-final', LEGAL_TOPUP_25);
appendSkills(batchLegal.catFileName, batchLegal.skills);

const batchResearch = makeSkills('research', 'research', 'research-final', RESEARCH_TOPUP_20);
appendSkills(batchResearch.catFileName, batchResearch.skills);

const batchMisc = makeSkills('miscellaneous', 'miscellaneous', 'misc-final', MISC_TOPUP_10);
appendSkills(batchMisc.catFileName, batchMisc.skills);

const batchSocial = makeSkills('social', 'social', 'social-final', SOCIAL_TOPUP_10);
appendSkills(batchSocial.catFileName, batchSocial.skills);

const batchTech = makeSkills('technical', 'technical', 'tech-final', TECHNICAL_TOPUP_8);
appendSkills(batchTech.catFileName, batchTech.skills);

const batchWriting = makeSkills('writing', 'writing', 'writing-final', WRITING_TOPUP_4);
appendSkills(batchWriting.catFileName, batchWriting.skills);

const batchAgentic = makeSkills('agentic', 'agentic', 'agentic-final', AGENTIC_TOPUP_3);
appendSkills(batchAgentic.catFileName, batchAgentic.skills);

const batchBusiness = makeSkills('business', 'business', 'business-final', BUSINESS_TOPUP_3);
appendSkills(batchBusiness.catFileName, batchBusiness.skills);

const batchControlFlow = makeSkills('controlFlow', 'controlFlow', 'controlflow-final', CONTROLFLOW_TOPUP_3);
appendSkills(batchControlFlow.catFileName, batchControlFlow.skills);

const batchCreative = makeSkills('creative', 'creative', 'creative-final', CREATIVE_TOPUP_3);
appendSkills(batchCreative.catFileName, batchCreative.skills);

const batchMedical = makeSkills('medical', 'medical', 'medical-final', MEDICAL_TOPUP_5);
appendSkills(batchMedical.catFileName, batchMedical.skills);

console.log('Final top-up script executed successfully!');
