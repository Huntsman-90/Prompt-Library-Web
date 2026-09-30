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
      `Phase 1: Setup research, social, technical, or design baseline parameters for ${title}.`,
      `Phase 2: Multi-perspective analysis, design execution, or technical synthesis.`,
      `Phase 3: Produce verified structured output adhering to domain quality standards.`
    ],
    ruInstructions: item.ruInst || [
      `Этап 1: Инициализация исследовательской, социальной, технической или дизайнерской базы для ${title}.`,
      `Этап 2: Многоаспектный анализ, исполнение дизайна или технический синтез.`,
      `Этап 3: Формирование структурированного результата по стандартам качества.`
    ],
    semanticType: item.sem || 'process_directive'
  };
}

function processCategory(catFileName, categoryId, prefix, items) {
  const skills = items.map(item => makeSkill(catFileName, categoryId, prefix, item));
  return appendSkills(catFileName, skills);
}

// --------------------------------------------------------------------------
// 21. RESEARCH - 60 SKILLS
// --------------------------------------------------------------------------
const RESEARCH_ITEMS = [
  { title: "Multi Method Systematic Literature Review PRISMA Workflow", desc: "Executes systematic literature searching, PRISMA screening, bias risk scoring, and synthesis." },
  { title: "Multi Perspective Qualitative Grounded Theory Coding", desc: "Applies open, axial, and selective coding to qualitative interview transcripts." },
  { title: "Multi Factor Statistical Power Calculation G Power Sizing", desc: "Calculates statistical power, effect sizes (Cohen's d/f), and required sample sizes." },
  { title: "Multi Layer Meta Analysis Forest Plot Effect Size Estimation", desc: "Synthesizes effect sizes across study cohorts using random-effects meta-analysis models." },
  { title: "Multi Phase Institutional Review Board IRB Ethics Protocol", desc: "Drafts human subject IRB ethics applications, informed consent forms, and risk mitigations." },
  { title: "Multi Method Ethnographic Participant Observation Field Notes", desc: "Conducts multi-site ethnographic observation, thick description field logging, and triangulations." },
  { title: "Multi Layer Bayesian Meta Regression Model Synthesis", desc: "Runs Bayesian meta-regression modeling study heterogeneity and moderating variables." },
  { title: "Multi Factor Inter Rater Reliability Cohen Kappa Verification", desc: "Calculates Cohen's Kappa and Fleiss' Kappa measuring inter-coder reliability agreements." },
  { title: "Multi Source Historical Archival Primary Source Triangulation", desc: "Triangulates archival manuscripts, government records, and diary entries for historical research." },
  { title: "Multi Stage Econometric Instrumental Variables IV Regression", desc: "Addresses endogeneity using two-stage least squares (2SLS) instrumental variable regression." },

  { title: "Multi Horizon Longitudinal Cohort Follow Up Study Design", desc: "Designs prospective cohort studies tracking exposure variables and disease incidence over time." },
  { title: "Multi Perspective Focus Group Moderation Transcript Coding", desc: "Moderates group focus discussions, analyzing non-verbal cues and consensus dynamics." },
  { title: "Multi Factor Experimental Factorial ANOVA Interaction Design", desc: "Designs multi-factor experimental trials evaluating main effects and interaction terms." },
  { title: "Multi Stage Pre Registration OSF Open Science Protocol", desc: "Drafts pre-registered study protocols detailing hypotheses, power analyses, and statistical plans." },
  { title: "Multi Method Quantitative Content Analysis Frequency Mapping", desc: "Codes textual corpora measuring word frequencies, co-occurrences, and frame emphasis." },
  { title: "Multi Stage Quasi Experimental Difference in Differences DiD", desc: "Evaluates policy interventions using difference-in-differences parallel trend assumptions." },
  { title: "Multi Perspective Academic Peer Review Editorial Critique Memo", desc: "Drafts thorough peer review reports evaluating methodology, novelty, and statistical rigor." },
  { title: "Multi Stage Computational Linguistics Dependency Tree Parsing", desc: "Annotates syntactic dependency relationships and Universal Dependencies POS tags." },
  { title: "Multi Layer Quantum Chemistry Density Functional Theory DFT", desc: "Models molecular electronic structures, bond lengths, and reaction barriers using DFT." },
  { title: "Multi Stage Ecological Niche Modeling Species Distribution", desc: "Predicts climate-driven biodiversity distribution shifts using Maxent niche models." },

  { title: "Multi Layer Single Cell RNA Sequencing Trajectory Pseudotime", desc: "Infers cell differentiation lineages and developmental pseudotime from scRNA-seq counts." },
  { title: "Multi Source Historical Epigraphy Paleography Transcription", desc: "Transcribes, translates, and dates ancient epigraphic inscriptions on stone/manuscripts." },
  { title: "Multi Stage Behavioral Economics Randomized Field Experiment", desc: "Designs natural field experiments testing behavioral nudges and financial incentives." },
  { title: "Multi Layer Spatial Econometrics Geographically Weighted Regression", desc: "Models spatial autocorrelation and regional heterogeneity in economic spatial data." },
  { title: "Multi Stage Climate Model Intercomparison CMIP Downscaling", desc: "Downscales global CMIP6 climate model projections to local hydrological catchments." },
  { title: "Multi Layer Neuroimaging fMRI Event Related BOLD Analysis", desc: "Processes functional MRI BOLD signals using general linear models and spatial smoothing." },
  { title: "Multi Stage High Energy Physics Particle Collider Monte Carlo", desc: "Simulates particle collision events and detector responses for LHC experimental data." },
  { title: "Multi Layer Structural Equation Modeling SEM Confirmatory Factor", desc: "Validates latent variable measurement models using covariance structure analysis." },
  { title: "Multi Source Materials Science High Throughput Crystal Screening", desc: "Screens inorganic crystal structures for thermoelectric/superconducting properties." },
  { title: "Multi Layer Urban Spatial Morphology Network Accessibility", desc: "Calculates spatial graph centrality, walkability, and pedestrian movement catchments." },

  { title: "Multi Stage Demography Life Table Mortality Rate Projection", desc: "Models population cohort mortality dynamics using Lee-Carter demographic forecasting." },
  { title: "Multi Perspective Comparative Historical Sociology Process Tracing", desc: "Tests causal mechanisms in historical state-building using rigorous process tracing." },
  { title: "Multi Stage Genomics Wide Association Study GWAS Polygenic Risk", desc: "Calculates polygenic risk scores from population-scale GWAS summary statistics." },
  { title: "Multi Layer Cognitive Psychology Eye Tracking Fixation Analysis", desc: "Analyzes visual fixation duration, saccade trajectories, and pupillometry during tasks." },
  { title: "Multi Source Archaeological Radiometric Carbon Dating Calibration", desc: "Calibrates C14 isotope ratios against tree-ring dendrochronology calibration curves." },
  { title: "Multi Stage Nanotechnology Scanning Tunneling Microscopy Analysis", desc: "Processes STM/AFM atomic surface topography images measuring step heights." },
  { title: "Multi Layer Marine Benthic Ecosystem Biodiversity Sampling", desc: "Calculates Shannon-Wiener diversity indices and species richness in marine benthos." },
  { title: "Multi Source Paleoclimatology Ice Core Isotope Temperature Reconstruction", desc: "Reconstructs paleoclimate temperatures from oxygen-18 isotope ratios in ice cores." },
  { title: "Multi Stage Astrophysics Exoplanet Transit Lightcurve Photometry", desc: "Models exoplanet radius and orbital inclination from Kepler/TESS starlight dimming." },
  { title: "Multi Layer Behavioral Pharmacology Conditioned Place Preference", desc: "Evaluates drug reward properties and addiction susceptibility in animal model trials." },

  { title: "Multi Source Agricultural Crop Phenotyping Drone Hyperspectral", desc: "Extracts NDVI vegetation indices and canopy water stress from multispectral drone imagery." },
  { title: "Multi Stage Volcanology Seismic Tremor Eruption Forecasting", desc: "Analyzes volcanic harmonic tremors, gas emissions, and ground deformation." },
  { title: "Multi Layer Cognitive Neuroscience EEG Event Related Potential ERP", desc: "Extracts P300 and N400 ERP brainwave components during cognitive stimulus tasks." },
  { title: "Multi Source Cell Biology Immunofluorescence Microscopy Colocalization", desc: "Quantifies protein-protein colocalization using Manders and Pearson correlation coefficients." },
  { title: "Multi Stage Social Network Analysis Exponential Random Graph ERGM", desc: "Models social network tie formation using exponential random graph statistical models." },
  { title: "Multi Layer Organic Chemistry NMR Structure Elucidation", desc: "Elucidates complex organic molecule structures combining 1H, 13C, and 2D COSY NMR." },
  { title: "Multi Source Glaciology Glacier Ice Velocity Radar Interferometry", desc: "Measures Antarctic glacier flow velocity using Sentinel-1 synthetic aperture radar." },
  { title: "Multi Stage Toxicology Dose Response Benchmark Dose BMD", desc: "Calculates benchmark dose (BMD10) lower confidence limits for chemical risk assessment." },
  { title: "Multi Layer Evolutionary Biology Phylogenetic Tree Maximum Likelihood", desc: "Constructs phylogenetic species trees from DNA sequences using maximum likelihood." },
  { title: "Multi Source Urban Microclimate Heat Island Temperature Mapping", desc: "Maps urban heat islands correlating land surface temp with tree canopy cover." },

  { title: "Multi Stage Physical Oceanography CTD Salinity Density Profiling", desc: "Parses ocean CTD sensor profiles measuring thermocline and halocline water masses." },
  { title: "Multi Layer Geomorphology Landslide Susceptibility Hazard Mapping", desc: "Models landslide slope stability using digital elevation models and rainfall intensity." },
  { title: "Multi Source Soil Science Carbon Sequestration Humus Analysis", desc: "Measures soil organic carbon fractions and microbial biomass nitrogen under tillage." },
  { title: "Multi Stage Industrial Organization Empirical Market Power Estimation", desc: "Estimates price-cost margins and demand elasticity in concentrated oligopoly markets." },
  { title: "Multi Layer Particle Physics Neutrino Oscillation Detector Calibration", desc: "Calculates neutrino mass squared differences from underground detector flux." },
  { title: "Multi Source Atmospheric Chemistry Ozone Layer Photolysis Rate", desc: "Models stratospheric ozone depletion kinetics under ultraviolet solar irradiance." },
  { title: "Multi Stage Developmental Psychology Attachment Strange Situation", desc: "Codes infant attachment security classifications (Secure, Avoidant, Resistant)." },
  { title: "Multi Layer Structural Geology Fault Line Stress Tensor Calculation", desc: "Calculates tectonic stress tensors from earthquake focal mechanism fault plane solutions." },
  { title: "Multi Source Conservation Biology Population Viability Analysis PVA", desc: "Simulates endangered species extinction risks under habitat fragmentation." },
  { title: "Multi Horizon Master Scientific Research Methodology Engine", desc: "Enforces master empirical research design, statistical rigor, publication standards, and discovery." }
];

// --------------------------------------------------------------------------
// 22. SOCIAL MEDIA - 60 SKILLS
// --------------------------------------------------------------------------
const SOCIAL_ITEMS = [
  { title: "Multi Channel Social Media Viral Content Growth Strategy", desc: "Coordinates cross-platform content repurposing across TikTok, YouTube Shorts, Instagram Reels, and LinkedIn." },
  { title: "Multi Format TikTok Viral Short Form Video Scripting", desc: "Engineers first 3-second retention hooks, trending audio pairing, and looping call-to-actions." },
  { title: "Multi Tier Influencer Outreach Seed Gifting Campaign", desc: "Manages micro/macro-influencer outreach, PR gifting boxes, usage rights, and affiliate tracking." },
  { title: "Multi Platform Community Discord Server Moderation Architecture", desc: "Configures onboarding bots, role hierarchies, token-gated channels, and engagement events." },
  { title: "Multi Channel Substack Paid Subscriber Conversion Funnel", desc: "Optimizes newsletter paywalls, lead magnet free previews, and automated welcome sequences." },
  { title: "Multi Format LinkedIn Thought Leadership Carousel Playbook", desc: "Formats high-converting PDF visual carousel decks optimized for algorithm reach." },
  { title: "Multi Stage YouTube Channel CTR Thumbnail Title Engineering", desc: "A/B tests eye-catching thumbnail visual psychology, curiosity titles, and pinned comments." },
  { title: "Multi Platform Social Listening Sentiment Spike Crisis Monitor", desc: "Monitors brand sentiment spikes across X/Twitter, Reddit, and forums triggering response playbooks." },
  { title: "Multi Format X Twitter Viral Thread Storytelling Blueprint", desc: "Structures 10-tweet viral hook threads with strong opening hooks, value bullet points, and retweets." },
  { title: "Multi Stage Product Hunt Launch Day Community Mobilization", desc: "Coordinates hunter outreach, maker comment prep, community upvote push, and social PR." },

  { title: "Multi Channel Podcast Guest Pitching Booking Sequence", desc: "Crafts personalized guest pitches, media kits, and follow-ups securing top-tier podcast interviews." },
  { title: "Multi Platform Live Stream Shopping Broadcast Production", desc: "Hosts live e-commerce streams on TikTok/Instagram with flash discounts and real-time Q&A." },
  { title: "Multi Format Meta Facebook Ad Creative Copywriting Suite", desc: "Generates primary text, headline hooks, and UGC script variants for Meta ad campaigns." },
  { title: "Multi Community Reddit Organic Brand Advocacy Campaign", desc: "Builds authentic Reddit presence through value-first AMA hosting and helpful subreddit comments." },
  { title: "Multi Format Pinterest Visual Discovery Traffic Funnel", desc: "Creates SEO-optimized Pinterest idea pins driving organic traffic to e-commerce blogs." },
  { title: "Multi Channel VIP WhatsApp Community Broadcast Calendar", desc: "Manages exclusive VIP customer WhatsApp broadcast groups with secret drop announcements." },
  { title: "Multi Platform Brand Mascot Meme Persona Strategy", desc: "Crafts witty brand mascot social personas (e.g. Duolingo/Wendy's style) for viral banter." },
  { title: "Multi Format UGC User Generated Content Brief Creator", desc: "Drafts detailed creative briefs for UGC creators specifying hook, problem, product demo, and CTA." },
  { title: "Multi Channel YouTube Shorts Monetization Channel Growth", desc: "Paces daily Shorts publishing schedules, playlist grouping, and community post teasers." },
  { title: "Multi Platform Social Commerce Shop Integration Playbook", desc: "Configures TikTok Shop and Instagram Shopping product tagging, checkout, and affiliate commissions." },

  { title: "Multi Format Newsletter Cross Promotion Sponsorship Swap", desc: "Negotiates newsletter sponsorship swaps, co-written editions, and dedicated blast emails." },
  { title: "Multi Stage Viral Social Challenge Contest Execution", desc: "Designs branded user hashtag challenges, prize incentives, and winner selection rules." },
  { title: "Multi Channel Twitch Channel Point Engagement Gamification", desc: "Configures custom channel point rewards, overlay widgets, and interactive chat games." },
  { title: "Multi Platform Meta Threads Real Time Trend Hijacking", desc: "Crafts fast, witty replies to breaking news and trending threads on Meta Threads." },
  { title: "Multi Format B2B Founder Personal Brand Positioning", desc: "Ghostwrites daily founder posts on LinkedIn and X establishing industry thought leadership." },
  { title: "Multi Channel Social Media Content Calendar Automation", desc: "Automates multi-platform posting schedules using Buffer, Hootsuite, or Sprout Social APIs." },
  { title: "Multi Stage Influencer Co Branded Product Capsule Launch", desc: "Coordinates influencer co-designed product drops, limited edition packaging, and launch events." },
  { title: "Multi Platform Crowdfunding Community Backer Activation", desc: "Mobilizes Kickstarter/Indiegogo backer communities through updates, stretch goals, and PR." },
  { title: "Multi Format Audio Space Podcast Host Live Discussion", desc: "Hosts X Spaces and LinkedIn Audio Events engaging live audiences with guest speakers." },
  { title: "Multi Channel Micro Community Telegram Broadcast Channel", desc: "Grows crypto/fintech Telegram channels with daily market signals, pin posts, and polls." },

  { title: "Multi Stage E-Commerce Customer Review Video Amplification", desc: "Turns video customer reviews into paid social ad ads and website landing page widgets." },
  { title: "Multi Platform Brand Collaboration Giveaway Sweepstakes", desc: "Partners non-competing brands for joint social media giveaway contests boosting follower count." },
  { title: "Multi Format Short Film Documentary Social Teaser Cuts", desc: "Cuts trailer teasers optimized for 9:16 vertical video mobile screens." },
  { title: "Multi Channel Crisis Social Media Apology Communication", desc: "Drafts authentic, transparent brand apology posts mitigating public backlash." },
  { title: "Multi Platform Social Media Analytics Engagement Benchmark", desc: "Audits engagement rates, reach per post, follower growth velocity against industry benchmarks." },
  { title: "Multi Format E-Book Lead Magnet Social Download Funnel", desc: "Promotes free PDF guides on social media driving email subscriber sign-ups." },
  { title: "Multi Channel B2B Employer Branding Recruitment Social", desc: "Showcases company culture, team spotlights, and office perks attracting top talent." },
  { title: "Multi Stage TikTok Live Interactive Stream Gamification", desc: "Sets up gift-triggered screen animations and interactive games during TikTok live streams." },
  { title: "Multi Platform Local Business Geo Tagged Social Strategy", desc: "Optimizes local Instagram/Google Business posts with geo-tags, local hashtags, and store photos." },
  { title: "Multi Format Infographic Visual Data Carousel Creator", desc: "Transforms complex industry data reports into swipeable Instagram/LinkedIn infographics." },

  { title: "Multi Channel Non-Profit Fundraising Giving Tuesday Campaign", desc: "Executes social media fundraising blitzes with donor matching multipliers and live progress bars." },
  { title: "Multi Stage Music Artist Album Release Social Blitz", desc: "Paces pre-save campaigns, snippet teasers, TikTok audio trends, and release day listening parties." },
  { title: "Multi Platform Web3 Crypto Community NFT Discord Strategy", desc: "Manages Discord community white-lists, AMA stages, and NFT project lore drops." },
  { title: "Multi Format Interactive Instagram Story Poll Quiz Engine", desc: "Designs daily interactive Instagram Story sequences using stickers, polls, and countdowns." },
  { title: "Multi Channel Social Customer Service SLA Response Router", desc: "Monitors brand mentions and DMs responding within 15-minute support SLAs." },
  { title: "Multi Stage SaaS Product Feature Update Social Announcement", desc: "Creates screen recording GIFs, feature teardown threads, and product changelog posts." },
  { title: "Multi Platform Culinary Food Blogger Recipe Reel Funnel", desc: "Crafts mouth-watering 15-second recipe videos driving blog traffic and cookbook sales." },
  { title: "Multi Format Fitness Influencer Workout Challenge Series", desc: "Structures 30-day social media fitness challenge video series with downloadable PDF trackers." },
  { title: "Multi Channel Real Estate Home Tour Video Reel Series", desc: "Produces cinematic walkthrough tours of luxury homes for Instagram Reels and YouTube." },
  { title: "Multi Horizon Master Social Media Growth Audience Engine", desc: "Enforces master viral content creation, community engagement, brand positioning, and channel growth." }
];

// --------------------------------------------------------------------------
// 23. TECHNICAL - 60 SKILLS
// --------------------------------------------------------------------------
const TECHNICAL_ITEMS = [
  { title: "Multi Region Kubernetes Cluster Federation Deployment", desc: "Deploys multi-region K8s clusters using KubeFed with global load balancing and failover." },
  { title: "Multi Layer Linux Kernel eBPF Packet Filtering Engine", desc: "Writes C eBPF programs attached to XDP hooks for low-latency kernel packet processing." },
  { title: "Multi Node Ceph Distributed Object Storage Tuning", desc: "Configures Ceph OSD storage pools, CRUSH maps, and Bluestore caching for high IOPS." },
  { title: "Multi Service HashiCorp Nomad Workload Orchestration", desc: "Deploys containerized and non-containerized workloads using Nomad job specifications." },
  { title: "Multi Layer OpenTelemetry Distributed Tracing Collector", desc: "Configures OpenTelemetry Collectors for traces, metrics, and logs export to Jaeger/Prometheus." },
  { title: "Multi Gateway Traefik Reverse Proxy ACME TLS Router", desc: "Sets up Traefik ingress routers with Let's Encrypt automated TLS certificate renewal." },
  { title: "Multi Node ClickHouse Columnar Database Sharding", desc: "Configures ClickHouse cluster Distributed tables, Zookeeper synchronization, and queries." },
  { title: "Multi Layer WireGuard Zero Trust Mesh VPN Infrastructure", desc: "Configures mesh VPN networks using WireGuard for encrypted node-to-node communication." },
  { title: "Multi Stage CI CD GitHub Actions Matrix Build Caching", desc: "Builds GitHub Actions workflows with parallel OS matrix testing and dependency caching." },
  { title: "Multi Node PostgreSQL WAL Streaming Replication Failover", desc: "Sets up active-passive PostgreSQL streaming replication with Patroni auto-failover." },

  { title: "Multi Layer Envoy Service Mesh Sidecar Proxy Routing", desc: "Configures Envoy sidecars for mTLS encryption, rate limiting, and dynamic traffic splitting." },
  { title: "Multi Node Redis Sentinel High Availability Failover", desc: "Configures Redis Sentinel master-replica clusters with automatic leader election." },
  { title: "Multi Tier Elasticsearch Hot Warm Cold Tier Sharding", desc: "Manages Elasticsearch index lifecycle policies (ILM) migrating indices across storage tiers." },
  { title: "Multi Provider Cloud Security Posture Management CSPM", desc: "Scans AWS/GCP/Azure IAM policies, security groups, and S3 buckets for misconfigurations." },
  { title: "Multi Stage Infrastructure as Code Terraform OpenTofu", desc: "Writes modular Terraform state configurations with remote S3 backends and state locking." },
  { title: "Multi Layer BGP Anycast Routing Network Edge Balancer", desc: "Configures BGP Anycast routing announcing IP prefixes across distributed POP edge centers." },
  { title: "Multi Node Apache Kafka Distributed Event Log Cluster", desc: "Tunes Kafka broker JVM settings, partition replication factors, and log retention." },
  { title: "Multi Tier Cloudflare Edge Workers Serverless Routing", desc: "Deploys TypeScript functions to Cloudflare Workers edge runtime for low-latency header rewrites." },
  { title: "Multi Layer Hardened Linux OS CIS Benchmark Kernel", desc: "Hardens Linux server OS (Ubuntu/RHEL) adhering to CIS Level 2 security benchmarks." },
  { title: "Multi Provider AWS GCP Hybrid Cloud Network Interconnect", desc: "Sets up AWS Direct Connect and GCP Dedicated Interconnect with IPsec VPN backup." },

  { title: "Multi Node Cassandra Distributed NoSQL Replication", desc: "Configures Apache Cassandra multi-datacenter keyspaces, consistency levels, and repair." },
  { title: "Multi Layer Prometheus Alertmanager Monitoring Metrics", desc: "Writes Prometheus recording rules and Alertmanager routing trees for PagerDuty dispatches." },
  { title: "Multi Stage Container Image Minimal Distroless Security", desc: "Builds multi-stage Dockerfiles producing minimal Distroless images scanned with Trivy." },
  { title: "Multi Layer High Availability HAProxy Load Balancer", desc: "Configures HAProxy layer 4/7 load balancing with health checks and sticky sessions." },
  { title: "Multi Node GlusterFS Distributed Clustered Volume", desc: "Configures GlusterFS replicated storage volumes across distributed Linux nodes." },
  { title: "Multi Layer HashiCorp Vault Secrets Encryption Engine", desc: "Configures Vault transit secret engines, dynamic database credentials, and PKI certs." },
  { title: "Multi Stage Microservice Circuit Breaker Resilience", desc: "Configures Istio/Resilience4j circuit breakers, timeouts, and retry budgets." },
  { title: "Multi Provider DNS Cloudflare AWS Route53 Failover", desc: "Sets up dual-provider DNS routing with health checks preventing DNS provider outages." },
  { title: "Multi Node Apache Flink Stateful Stream Processing", desc: "Configures Flink job managers, RocksDB state backends, and checkpointing intervals." },
  { title: "Multi Layer Linux cgroups v2 Namespace Container Isolation", desc: "Tunes Linux kernel namespaces and cgroups limiting CPU/memory bounds for workloads." },

  { title: "Multi Node RabbitMQ Erlang Clustered Message Broker", desc: "Configures RabbitMQ mirrored queues, exchange bindings, and dead-letter routing." },
  { title: "Multi Tier Enterprise Storage SAN NAS Fibre Channel", desc: "Configures Fibre Channel SAN storage LUNs, multipath I/O (MPIO), and NFS mounts." },
  { title: "Multi Layer Linux Kernel Network Stack TCP Tuning", desc: "Tunes sysctl TCP window scaling, SYN backlog queues, and BBR congestion control." },
  { title: "Multi Stage System Performance eBPF Flamegraph Profiling", desc: "Generates CPU flamegraphs using BCC/bpftrace isolating kernel and userland bottlenecks." },
  { title: "Multi Provider Serverless AWS Lambda Google Cloud Functions", desc: "Deploys event-driven serverless functions with provisioned concurrency preventing cold starts." },
  { title: "Multi Node MinIO Distributed Object Storage Cluster", desc: "Configures MinIO erasure coding pools for high-availability S3-compatible storage." },
  { title: "Multi Layer Hardened SSH Key Bastion Host Architecture", desc: "Configures SSH bastion jump hosts with YubiKey hardware 2FA and session recording." },
  { title: "Multi Node CockroachDB Distributed SQL Replication", desc: "Configures CockroachDB multi-region Raft consensus clusters with geo-partitioning." },
  { title: "Multi Layer Nginx Web Server Performance Caching", desc: "Tunes Nginx worker processes, keepalive timeouts, open file cache, and gzip/brotli." },
  { title: "Multi Stage Automated Chaos Engineering Litmus ChaosMesh", desc: "Injects pod kills, network latency spikes, and disk fill stress tests using ChaosMesh." },

  { title: "Multi Provider Cloud FinOps Cost Allocation Tagging", desc: "Configures cloud tag policies, AWS Cost Explorer alerts, and Kubecost pod allocation." },
  { title: "Multi Node ScyllaDB C Plus Plus NoSQL Performance", desc: "Configures ScyllaDB auto-sharding C++ NoSQL clusters for ultra-low latency." },
  { title: "Multi Layer Ansible Configuration Management Playbook", desc: "Writes idempotent Ansible playbooks deploying infrastructure configurations across fleets." },
  { title: "Multi Stage Kubernetes Helm Chart Package Management", desc: "Creates modular Helm charts with templates, values validation, and release rollbacks." },
  { title: "Multi Layer Linux PAM System Authentication SSSD", desc: "Configures Linux PAM with SSSD joining Linux servers to Active Directory LDAP domains." },
  { title: "Multi Node Apache Spark Big Data Distributed Cluster", desc: "Configures Spark standalone/YARN clusters tuning executor memory and shuffle partitions." },
  { title: "Multi Layer Palo Alto Enterprise Firewall IPsec Tunnel", desc: "Configures Palo Alto Next-Gen Firewall BGP routing, threat prevention, and IPsec VPNs." },
  { title: "Multi Stage GitOps ArgoCD Kubernetes Deployment", desc: "Sets up ArgoCD GitOps pipelines auto-syncing Git repository state to K8s clusters." },
  { title: "Multi Node Elasticsearch Vector Search HNSW Indexing", desc: "Configures Elasticsearch k-NN vector search using HNSW graph indexing." },
  { title: "Multi Layer Linux LVM Logical Volume Snapshot Encryption", desc: "Configures LVM storage volumes with LUKS disk encryption and snapshot backups." },

  { title: "Multi Provider Hybrid Identity Azure AD Okta SAML SSO", desc: "Configures Azure AD and Okta identity federation with SAML 2.0 and SCIM user provisioning." },
  { title: "Multi Node Trino Presto Distributed Query Engine", desc: "Configures Trino query engine connecting Hive, PostgreSQL, and S3 data lakes." },
  { title: "Multi Layer Cisco Catalyst Enterprise Network VLAN Trunking", desc: "Configures Cisco switch 802.1Q VLAN trunking, Spanning Tree (RSTP), and LACP bonds." },
  { title: "Multi Stage Automated Vulnerability Scanning Dependency Check", desc: "Integrates Dependency-Check, Snyk, and Trivy into CI/CD build pipelines." },
  { title: "Multi Node GlusterFS Geo Replication Disaster Recovery", desc: "Configures GlusterFS asynchronous geo-replication across remote datacenters." },
  { title: "Multi Layer Linux RAID Array MDADM Storage Configuration", desc: "Configures software RAID 10 arrays using mdadm with hot-spare disk drives." },
  { title: "Multi Stage Infrastructure Monitoring Grafana Dashboard", desc: "Builds Grafana operational dashboards visualizing system metrics and SLO error budgets." },
  { title: "Multi Node Apache ZooKeeper Distributed Coordination", desc: "Configures ZooKeeper ensemble quorums managing distributed system leader elections." },
  { title: "Multi Layer Hardware Security Module HSM Key Storage", desc: "Configures Cloud HSM / PKCS#11 modules for cryptographic key generation and signing." },
  { title: "Multi Horizon Master Cloud Native Technical Infrastructure Engine", desc: "Enforces master DevOps, cloud-native architecture, system resilience, and infrastructure engineering." }
];

// --------------------------------------------------------------------------
// 24. UX DESIGN - 60 SKILLS
// --------------------------------------------------------------------------
const UXDESIGN_ITEMS = [
  { title: "Multi Screen Adaptive Responsive Layout Grid", desc: "Designs fluid responsive layouts adapting across mobile, tablet, desktop, and ultrawide displays." },
  { title: "Multi Layer Design System Token Component Architecture", desc: "Constructs Figma design tokens (color, typography, spacing) mapped to Tailwind CSS components." },
  { title: "Multi Method Usability Testing Task Success Protocol", desc: "Conducts moderated usability sessions measuring task completion time, SUS scores, and errors." },
  { title: "Multi Step User Onboarding Frictionless Flow Design", desc: "Designs progressive onboarding steps reducing cognitive load and driving early time-to-value." },
  { title: "Multi Level Accessibility WCAG 2 1 AAA Compliance", desc: "Ensures screen reader ARIA labels, focus state indicators, and AAA contrast ratios." },
  { title: "Multi State Micro Interaction UI Animation System", desc: "Designs hover, active, loading, success, and error UI micro-animations." },
  { title: "Multi Channel Omnichannel Design Touchpoint Consistency", desc: "Maintains visual identity and interaction consistency across web, iOS, Android, and kiosk." },
  { title: "Multi Persona Customer Journey Information Architecture", desc: "Constructs sitemaps and navigation trees optimized for distinct user intent pathways." },
  { title: "Multi Option E-Commerce Checkout Friction Reduction", desc: "Reduces checkout friction using guest checkout, express wallet payments, and inline validation." },
  { title: "Multi Level Dark Mode Color Palette System", desc: "Designs dark mode color palettes preventing eye strain and maintaining visual hierarchy." },

  { title: "Multi Step Complex Data Table Filtering Sorting UI", desc: "Designs enterprise data tables with column resizing, sticky headers, bulk actions, and filters." },
  { title: "Multi State Form Field Inline Validation UX", desc: "Designs real-time form validation showing helpful error messages and success checks." },
  { title: "Multi View Dashboard Analytics Data Visualization Design", desc: "Designs executive dashboards with clear chart choices (bar, line, donut) and drill-downs." },
  { title: "Multi Device Touch Gesture Navigation Interface", desc: "Designs intuitive touch gestures (swipe to dismiss, pinch zoom, pull to refresh) for mobile." },
  { title: "Multi Step Wizard Checkout Form Progress Indicator", desc: "Designs multi-step form wizards with clear step indicators and autosave state." },
  { title: "Multi Layer Search Bar Auto Complete Suggestion UX", desc: "Designs instant search inputs displaying recent searches, trending items, and category filters." },
  { title: "Multi State Empty State Zero Data Onboarding UI", desc: "Designs encouraging empty states with clear calls-to-action guiding users to create content." },
  { title: "Multi Level Typography Hierarchy Font Scale System", desc: "Establishes modular font scales ensuring readable line lengths, line heights, and hierarchy." },
  { title: "Multi Option Modal Dialog Sheet Drawer Pattern", desc: "Designs contextual slide-over drawers and modal dialogs with backdrop blur and escape keys." },
  { title: "Multi Layer Skeleton Loading Screen State UX", desc: "Designs skeleton screen shimmer loaders reducing perceived waiting time during API fetches." },

  { title: "Multi Step Passwordless Magic Link Login UX", desc: "Designs seamless authentication flows featuring biometric FaceID, magic links, and OTP codes." },
  { title: "Multi Layer Notification System Bell Toast Banner", desc: "Designs in-app notification centers, toast alerts, and banner badges with priority colors." },
  { title: "Multi Device Mobile Navigation Bottom Sheet Bar", desc: "Designs thumb-friendly mobile bottom navigation bars and expandable action sheets." },
  { title: "Multi Option Filter Drawer Faceted Search UX", desc: "Designs faceted search sidebar filters with checkbox counts and instant clear buttons." },
  { title: "Multi State Drag and Drop Kanban Board Interface", desc: "Designs interactive drag-and-drop board columns with visual drop zones and animations." },
  { title: "Multi View Media Gallery Carousel Lightbox UX", desc: "Designs full-screen image lightboxes with zoom, thumbnail strip, and keyboard controls." },
  { title: "Multi Layer Tooltip Contextual Help Onboarding UI", desc: "Designs subtle feature discovery tooltips and interactive product walkthrough tours." },
  { title: "Multi Step File Drag Drop Multi Upload Progress UX", desc: "Designs drag-and-drop file upload zones displaying file previews, progress bars, and cancel buttons." },
  { title: "Multi Option Multi Select Pill Tag Input Component", desc: "Designs intuitive multi-select dropdowns displaying removable tag pills inside inputs." },
  { title: "Multi State Button Micro Copy Feedback UX", desc: "Designs interactive button states (idle, hover, loading spinner, success checkmark, disabled)." },

  { title: "Multi Layer Card Container Layout Visual Spacing", desc: "Designs modular card UI containers using consistent 8pt grid padding and soft drop shadows." },
  { title: "Multi Step Subscription Plan Upgrade Pricing Table", desc: "Designs high-converting pricing tables with feature toggles and 'Most Popular' badges." },
  { title: "Multi View Calendar Scheduling Availability Interface", desc: "Designs intuitive event calendar views (day, week, month) with drag-to-schedule time slots." },
  { title: "Multi Layer Audio Video Player Media Control UI", desc: "Designs custom audio/video player controls featuring scrubber bars, playback speed, and volume." },
  { title: "Multi Step User Profile Settings Account Management", desc: "Designs clean tabbed profile settings for personal info, security, billing, and preferences." },
  { title: "Multi Option Multi Currency Language Region Selector", desc: "Designs global locale selector modals displaying country flags, languages, and currencies." },
  { title: "Multi State Toggle Switch Radio Segmented Control", desc: "Designs tactile segmented controls and toggle switches for instant setting adjustments." },
  { title: "Multi Layer Rich Text Editor WYSIWYG Formatting Toolbar", desc: "Designs floating WYSIWYG toolbars for bold, italic, heading levels, links, and code blocks." },
  { title: "Multi Step Shopping Cart Drawer Summary UX", desc: "Designs slide-out shopping cart drawers displaying item thumbnails, quantities, promo codes, and checkout." },
  { title: "Multi Option Rating Review Feedback Star Widget", desc: "Designs interactive star rating inputs with photo upload attachments and filter reviews." },

  { title: "Multi Layer Status Badge Tag Pill System Design", desc: "Establishes status badge color conventions (green=active, yellow=pending, red=failed, gray=draft)." },
  { title: "Multi Step Address Auto Complete Verification UX", desc: "Integrates Google Places address autocomplete with postal verification and unit number fields." },
  { title: "Multi View Timeline Event Activity Log Feed", desc: "Designs chronological activity feeds with user avatars, timestamped actions, and filter tabs." },
  { title: "Multi Option Multi Tab Navigation Interface Bar", desc: "Designs scrollable tab bars with active underline indicators and count badges." },
  { title: "Multi Layer Infinite Scroll Pagination Load More UX", desc: "Balances infinite scrolling with 'Load More' buttons preserving footer accessibility." },
  { title: "Multi Step Cookie Consent GDPR Preference Banner", desc: "Designs non-intrusive cookie banner modals with granular category toggles (analytics, ads)." },
  { title: "Multi State Error Boundary Fallback Screen UX", desc: "Designs friendly 404 and 500 error screens offering search inputs and home buttons." },
  { title: "Multi Option Color Picker Swatch Input Component", desc: "Designs intuitive color pickers with hex inputs, RGB sliders, and preset palette swatches." },
  { title: "Multi Layer Tree View Folder File Hierarchy Interface", desc: "Designs collapsible tree view file navigators with drag-and-drop reordering." },
  { title: "Multi Step Survey NPS Feedback Rating Widget", desc: "Designs 0-10 Net Promoter Score widgets with optional open-ended comment boxes." },

  { title: "Multi Option Accordion Collapsible FAQ Component", desc: "Designs accessible accordion components with smooth expand/collapse animations and aria-expanded." },
  { title: "Multi Layer Breadcrumb Navigation Path UX", desc: "Designs clean breadcrumb trails displaying hierarchical site location with click links." },
  { title: "Multi Step Order Tracking Delivery Map Interface", desc: "Designs real-time order tracking screens with live map driver location and ETA countdown." },
  { title: "Multi Option Split Screen Comparison Slider Component", desc: "Designs interactive before/after image slider handles comparing visual transformations." },
  { title: "Multi Layer Command Palette Kbar Search Shortcut", desc: "Designs Cmd+K command palettes enabling fast keyboard-driven app navigation." },
  { title: "Multi Step Coupon Promo Code Application UX", desc: "Designs discount code input fields with instant balance calculation and applied tag chips." },
  { title: "Multi Option Multi Column Footer Site Index Design", desc: "Designs comprehensive site footers featuring newsletter signups, social icons, and link columns." },
  { title: "Multi Layer Floating Action Button FAB Menu UX", desc: "Designs material design floating action buttons expanding into quick action speed dials." },
  { title: "Multi Step Identity Document Photo Verification UX", desc: "Guides users taking clear photos of driver's licenses with real-time frame alignment." },
  { title: "Multi Horizon Master User Experience Interface Design Engine", desc: "Enforces master UX design, accessibility, visual hierarchy, micro-interactions, and design systems." }
];

// --------------------------------------------------------------------------
// 25. WRITING & EDITING - 60 SKILLS
// --------------------------------------------------------------------------
const WRITING_ITEMS = [
  { title: "Multi Perspective Prose Polish Style Register Calibration", desc: "Calibrates prose register seamlessly between academic, executive, literary, and conversational styles." },
  { title: "Multi Stage Copy Editing Line Editing Structural Audit", desc: "Executes 3-pass editing: Structural flow, Line-by-line clarity, and Proofreading grammar polishing." },
  { title: "Multi Format SEO Copywriting Keyword Density Optimization", desc: "Crafts engaging copy optimizing primary/secondary keywords, header tags, and search intent." },
  { title: "Multi Layer Technical Whitepaper Executive Briefing", desc: "Condenses complex enterprise technology innovations into persuasive executive whitepapers." },
  { title: "Multi Hook High Converting Headline Copywriting Suite", desc: "Drafts 10 high-converting headlines testing curiosity, benefit, urgency, and social proof hooks." },
  { title: "Multi Stage Persuasive Copywriting AIDA Framework", desc: "Structures sales copy following Attention, Interest, Desire, and Action persuasion steps." },
  { title: "Multi Perspective High-Stakes Keynote Speechwriting", desc: "Crafts keynote speeches using tricolons, anaphora, vivid metaphors, and memorable calls-to-action." },
  { title: "Multi Layer Passive Voice Elimination Active Clarity", desc: "Identifies and rewrites passive voice sentences into punchy, active-voice prose." },
  { title: "Multi Format Brand Storytelling Origin Narrative Blueprint", desc: "Crafts compelling brand origin stories highlighting founder struggle, breakthrough, and mission." },
  { title: "Multi Stage Creative Non Fiction Essay Narrative Arc", desc: "Structures personal essays balancing reflective introspection with vivid scene descriptions." },

  { title: "Multi Perspective Rhetorical Metaphor Analogy Engineering", desc: "Crafts memorable metaphors and real-world analogies explaining abstract concepts." },
  { title: "Multi Format Cold Email Outreach Sequence Copywriting", desc: "Drafts 4-step cold email sequences with high open-rate subject lines and low-friction CTAs." },
  { title: "Multi Layer Jargon Simplification Plain Language Editing", desc: "Translates dense legal or medical jargon into clear, accessible plain language." },
  { title: "Multi Stage B2B Enterprise Case Study Storyboard", desc: "Structures customer case studies following Challenge, Solution, Implementation, and Results metrics." },
  { title: "Multi Perspective Editorial Opinion Op-Ed Column Writing", desc: "Crafts persuasive newspaper Op-Eds with strong hook, counterargument address, and sharp thesis." },
  { title: "Multi Format Newsletter Issue Editorial Layout", desc: "Formats engaging email newsletters with intro banter, core article, curated links, and sign-off." },
  { title: "Multi Stage Press Release Media Kit Copywriting", desc: "Drafts AP-style press releases with attention headline, dateline, executive quotes, and boilerplate." },
  { title: "Multi Layer Cliché Buzzword Redundancy Elimination", desc: "Prunes corporate buzzwords ('synergy', 'leverage') and tautologies from written copy." },
  { title: "Multi Perspective Debating Rebuttal Argument Drafting", desc: "Drafts sharp rebuttal responses anticipating and dismantling opposing arguments point-by-point." },
  { title: "Multi Format E-Commerce Product Description Copywriting", desc: "Writes SEO product descriptions balancing technical specs with emotional lifestyle benefits." },

  { title: "Multi Stage Book Proposal Manuscript Sample Drafting", desc: "Drafts non-fiction book proposals including target market analysis, chapter outlines, and sample chapter." },
  { title: "Multi Layer Readability Flesch Kincaid Grade Optimization", desc: "Rewrites text adjusting reading grade level for maximum audience comprehension." },
  { title: "Multi Format Social Media Micro-Copy Captions", desc: "Crafts platform-native social captions for Instagram, LinkedIn, X, and Facebook." },
  { title: "Multi Stage Speech Ghostwriting Executive Voice Matching", desc: "Ghostwrites speeches matching an executive's unique vocal cadence, humor, and vocabulary." },
  { title: "Multi Perspective Crisis PR Communication Statement", desc: "Drafts empathetic crisis PR statements taking accountability and detailing corrective actions." },
  { title: "Multi Layer Subheading Structural Rhythm Formatting", desc: "Formats long articles with engaging subheadings breaking text into digestible chunks." },
  { title: "Multi Format FAQ Knowledge Base Article Copywriting", desc: "Writes clear FAQ articles answering customer questions with step-by-step instructions." },
  { title: "Multi Stage High Concept Fiction Worldbuilding Lore", desc: "Drafts rich lore documents describing fictional religions, historical conflicts, and magic rules." },
  { title: "Multi Perspective Grant Proposal Narrative Copywriting", desc: "Drafts persuasive grant proposals aligning project goals with funder priorities." },
  { title: "Multi Layer Concise Copywriting Word Count Pruning", desc: "Trims verbose prose by 30% without losing core meaning or emotional impact." },

  { title: "Multi Format Video Script Voiceover Timing Copywriting", desc: "Writes video scripts with side-by-side visual scene cues and timed voiceover narration." },
  { title: "Multi Stage SaaS Product Announcement Landing Page Copy", desc: "Writes high-converting landing page copy highlighting hero headline, social proof, and pricing." },
  { title: "Multi Perspective Academic Abstract Executive Summary", desc: "Summarizes 30-page research papers into 250-word structured academic abstracts." },
  { title: "Multi Layer Microcopy UI Button Tooltip Copywriting", desc: "Drafts intuitive UI microcopy for buttons, empty states, error messages, and onboarding." },
  { title: "Multi Format Crowdfunding Video Pitch Scriptwriting", desc: "Writes emotional Kickstarter pitch scripts introducing product creators, problem, and backer rewards." },
  { title: "Multi Stage Annual Corporate Impact Report Copywriting", desc: "Writes corporate sustainability and annual report narratives showcasing ESG milestones." },
  { title: "Multi Perspective Socratic Dialogue Prose Composition", desc: "Drafts engaging Socratic dialogue essays exploring philosophical topics through two conversants." },
  { title: "Multi Layer Sentence Variety Cadence Rhythm Editing", desc: "Varies sentence lengths (short punchy vs long sweeping) creating engaging prose rhythm." },
  { title: "Multi Format Real Estate Luxury Property Copywriting", desc: "Drafts evocative property descriptions highlighting architectural style and luxury finishes." },
  { title: "Multi Stage Historical Fiction Period Authentic Prose", desc: "Writes historical fiction dialogue using period-authentic vocabulary and sentence structures." },

  { title: "Multi Perspective Anti-Plagiarism Originality Rewriting", desc: "Rewrites research notes in original voice guaranteeing 100% unique prose." },
  { title: "Multi Format Podcast Interview Intro Outro Scriptwriting", desc: "Writes punchy podcast episode intro hooks, sponsor reads, and guest introductions." },
  { title: "Multi Layer Inclusive Language Accessibility Editing", desc: "Edits copy ensuring gender-neutral, accessible, and non-discriminatory language." },
  { title: "Multi Stage E-Book Lead Magnet Chapter Copywriting", desc: "Drafts actionable 20-page lead magnet e-books establishing authority and driving lead gen." },
  { title: "Multi Perspective Satirical Humor Irony Copywriting", desc: "Drafts sharp satirical articles using deadpan irony and exaggerated cultural satire." },
  { title: "Multi Format Job Description Employer Value Proposition Copy", desc: "Writes attractive job postings showcasing company culture, mission, and benefits." },
  { title: "Multi Layer Transition Word Flow Cohesion Editing", desc: "Improves paragraph transitions using cohesive connecting words ('furthermore', 'conversely')." },
  { title: "Multi Stage Non-Profit Fundraising Appeal Letter Copywriting", desc: "Writes emotional donor appeal letters driving recurring monthly donations." },
  { title: "Multi Perspective Manifesto Visionary Statement Copywriting", desc: "Drafts inspiring company manifestos rallying employees and customers around a shared cause." },
  { title: "Multi Format Testimonial Customer Review Polish Copywriting", desc: "Edits raw customer feedback into punchy, high-impact marketing quotes." },

  { title: "Multi Stage Cookbook Recipe Story Intro Copywriting", desc: "Writes engaging personal narrative intros for cookbook recipes celebrating family traditions." },
  { title: "Multi Layer Punctuation Precision Grammar Editing", desc: "Edits punctuation misuse (em-dashes, semicolons, Oxford commas) for publication readiness." },
  { title: "Multi Format Event Keynote Program Speaker Bio Copywriting", desc: "Drafts 50-word, 100-word, and 250-word professional speaker biographies." },
  { title: "Multi Stage Travel Guide Cultural Etiquette Copywriting", desc: "Drafts evocative travel destination guides highlighting hidden gems and cultural tips." },
  { title: "Multi Perspective Moral Dilemma Story Scenario Copywriting", desc: "Drafts ethics training case scenarios highlighting complex moral choices." },
  { title: "Multi Format Kickstarter Reward Tier Description Copy", desc: "Writes enticing crowdfunding backer reward tier descriptions driving higher pledges." },
  { title: "Multi Layer Headline Subheadline Paragraph Harmony", desc: "Harmonizes headline promises with subheadline context and body paragraph payoff." },
  { title: "Multi Stage Technical Manual Troubleshooting Step Guide", desc: "Writes clear user manual guides with numbered steps, warnings, and troubleshooting tips." },
  { title: "Multi Format Museum Exhibition Wall Text Copywriting", desc: "Drafts engaging 150-word museum wall placard descriptions for artwork exhibits." },
  { title: "Multi Horizon Master Prose Copywriting Editing Engine", desc: "Enforces master literary style, persuasive copywriting, flawless grammar, and editorial mastery." }
];

// Execute Batch 5
console.log("--- Executing Batch 5 (Research, Social, Technical, UXDesign, Writing) ---");
processCategory('research', 'research', 'research-multi', RESEARCH_ITEMS);
processCategory('social', 'social', 'social-multi', SOCIAL_ITEMS);
processCategory('technical', 'technical', 'tech-multi', TECHNICAL_ITEMS);
processCategory('uxDesign', 'uxDesign', 'uxdesign-multi', UXDESIGN_ITEMS);
processCategory('writing', 'writing', 'writing-multi', WRITING_ITEMS);

console.log("Batch 5 Complete!");
