import { SKILLS_REGISTRY, type SkillDefinition } from './skillsRegistry';

/**
 * Purges obsolete XML tags, synthetic preambles, and generic prompt templates.
 */
export function purgeGenericBoilerplate(text: string): string {
  if (!text) return '';

  let cleaned = text;

  // Purge obsolete AI Build XML envelope tags and system instructions
  cleaned = cleaned
    .replace(/<system_role>[\s\S]*?<\/system_role>/gi, '')
    .replace(/<\/?(?:system_role|thinking_process|operational_constraints|deliverable_specification|operational_prompt|context_and_scope|user_task|prompt_architecture)>/gi, '')
    .replace(/\[SYSTEM DIRECTIVE\]|\[OPERATIONAL PROMPT\]|<\|start_header_id\|>|<\|end_header_id\|>|<\|eot_id\|>/gi, '');

  // Purge generic prompt preambles like "You are an elite principal engineer..."
  cleaned = cleaned.replace(/You are an elite principal engineer and strategist with deep specialized mastery[^\n]*\n*/gi, '');
  cleaned = cleaned.replace(/Вы являетесь ведущим экспертом и системным архитектором[^\n]*\n*/gi, '');

  // Clean empty XML remnants
  cleaned = cleaned.replace(/^\s*<[^>]+>\s*$/gm, '');

  // Clean double blank lines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();

  return cleaned;
}

export interface PreciseRoleSpec {
  roleTitleRu: string;
  roleTitleEn: string;
  focusRu: string;
  focusEn: string;
  mandateRu: string;
  mandateEn: string;
}

/**
 * Calibrates a narrow, precise, high-authority domain role based on task context and active skills.
 * Strictly BANS generic "elite principal engineer" placeholders.
 */
export function derivePreciseRole(task: string, isRu: boolean, activeSkillIds: string[] = []): PreciseRoleSpec {
  const t = (task || '').toLowerCase();
  const skillsSet = new Set(activeSkillIds);

  const isTabletopGameMasterTask =
    /(?:настольн\w*.{0,80}(?:нарративн\w*.{0,30})?ролев\w*.{0,20}игр|(?:нарративн\w*.{0,30})?ролев\w*.{0,30}игр.{0,80}настольн\w*|table\s*top|tabletop|ttrpg|role[-\s]?playing\s+games?)/i.test(t) &&
    /(?:мастер\w*.{0,30}(?:игр|настольн|ролев)|ведущ\w*.{0,30}(?:игр|настольн|ролев)|game\s*master|dungeon\s*master|\bGM\b|\bDM\b)/i.test(t);

  if (isTabletopGameMasterTask) {
    return {
      roleTitleRu: 'Ведущий настольной нарративной ролевой игры (Game Master)',
      roleTitleEn: 'Tabletop Narrative Role-Playing Game Master',
      focusRu: 'интерактивное повествование, последовательное управление миром и NPC, соблюдение выбранной группой системы правил и сохранение агентности игроков',
      focusEn: 'interactive storytelling, consistent world and NPC management, fidelity to the group\'s chosen rules, and preservation of player agency',
      mandateRu: 'Вести игровую сессию как мастер: описывать сцены и последствия действий, разрешать проверки по согласованным правилам и передавать решения игрокам — не выдавать общие рекомендации по теме.',
      mandateEn: 'Run the session as the GM: narrate scenes and consequences, adjudicate using the agreed rules, and return decisions to the players instead of giving generic advice about the topic.',
    };
  }

  // 1. Incident Retrospective, Postmortem, SRE (Prioritized when retro skills or retro task intent is detected)
  const isRetroIntent =
    skillsSet.has('blameless-principle') ||
    skillsSet.has('blameless-retrospective-framework') ||
    skillsSet.has('incident-postmortem') ||
    skillsSet.has('timeline-reconstruction') ||
    skillsSet.has('action-items-matrix') ||
    /инцидент|постмортем|ретроспектив|сбой|авария|outage|downtime|sre|поломк|падени/i.test(t);

  if (isRetroIntent) {
    let subDomainRu = 'инфраструктурных систем';
    let subDomainEn = 'Distributed Infrastructure & Core Services';

    if (/redis|кэш|кеш/i.test(t)) {
      subDomainRu = 'Redis & Cache-кластеров';
      subDomainEn = 'Redis Distributed Cache Systems';
    } else if (/платеж|billing|payment|checkout/i.test(t)) {
      subDomainRu = 'платежных шлюзов и финансовых транзакций';
      subDomainEn = 'Payment Gateway & Transaction Systems';
    } else if (/баз[аы]\s+данных|postgres|sql|db/i.test(t)) {
      subDomainRu = 'баз данных и слоя персистентности';
      subDomainEn = 'Database & Persistence Tier';
    } else if (/api|gateway|микросервис/i.test(t)) {
      subDomainRu = 'микросервисных API-контуров';
      subDomainEn = 'Microservices & API Gateway Mesh';
    }

    return {
      roleTitleRu: `Staff Site Reliability Engineer (SRE) & Incident Commander (${subDomainRu})`,
      roleTitleEn: `Staff Site Reliability Engineer (SRE) & Incident Commander (${subDomainEn})`,
      focusRu: `беспристрастное расследование системных сбоев, детерминированная реконструкция хронологии (T0-T3), выявление фундаментальных первопричин (5 Whys) и инженерная защита от повторения`,
      focusEn: `blameless incident investigation, deterministic event timeline reconstruction (T0-T3), systematic 5-Whys root cause discovery, and automated preventative safeguards`,
      mandateRu: 'Провести объективный, системный разбор инцидента, сфокусированный исключительно на архитектурных уязвимостях и процедурных сбоях без поиска виновных.',
      mandateEn: 'Execute an exhaustive, blameless post-mortem focused strictly on architectural failure modes, timeline fidelity, and automated preventative remediation.',
    };
  }

  // 2. Redis, Caching, In-Memory Distributed Systems (When not an incident)
  if (/redis|кэш|кеш|caching|memcached|cache invalidation|key-value/i.test(t)) {
    return {
      roleTitleRu: 'Senior Distributed Systems & Cache Architecture Engineer',
      roleTitleEn: 'Senior Distributed Systems & Cache Architecture Engineer',
      focusRu: 'архитектура Redis, превентивная инвалидация кэша, синхронизация распределенного состояния и предотвращение race conditions / cache stampede',
      focusEn: 'Redis cluster topology, atomic cache invalidation semantics, distributed locking, and cache stampede mitigation',
      mandateRu: 'Спроектировать высокопроизводительное, отказоустойчивое решение с субмиллисекундной задержкой и детерминированной консистентностью.',
      mandateEn: 'Synthesize a high-throughput, fault-tolerant caching architecture with sub-millisecond latency and guaranteed state consistency.',
    };
  }

  // 3. Autonomous Agents, Tool Use, Execution Protocols
  if (
    skillsSet.has('react-loop') ||
    skillsSet.has('task-decomposition') ||
    skillsSet.has('tool-use-protocol') ||
    skillsSet.has('agentic-task-solver') ||
    skillsSet.has('memory-context-protocol') ||
    /агент|agent|react|dag|tool use|инструмент|автономн/i.test(t)
  ) {
    return {
      roleTitleRu: 'Autonomous Agent Systems Architect & Protocol Engineer',
      roleTitleEn: 'Autonomous Agent Systems Architect & Protocol Engineer',
      focusRu: 'декомпозиция DAG-графов задач, детерминированные циклы ReAct (Thought/Action/Observation), строгие контракты вызова инструментов и изолированная память',
      focusEn: 'DAG task decomposition, deterministic ReAct cycles (Thought/Action/Observation), strict tool schema contracts, and bounded memory scratchpads',
      mandateRu: 'Сконструировать самовосстанавливающийся агентный конвейер с жестким контролем выполнения, защитой от зацикливания и проверкой каждого шага.',
      mandateEn: 'Architect a self-healing autonomous execution workflow with bounded memory scratchpads, schema-validated tool calls, and deterministic halt criteria.',
    };
  }

  // 4. React, Frontend, UI Performance, Next.js
  if (/react|frontend|фронтенд|компонент|ui|ux|next\.?js|vite|vue|tailwind/i.test(t)) {
    return {
      roleTitleRu: 'Staff Frontend & UI Performance Architect',
      roleTitleEn: 'Staff Frontend & UI Performance Architect',
      focusRu: 'архитектура React-компонентов, профилирование жизненного цикла рендеринга, статическая типобезопасность интерфейсов и соответствие стандарту WCAG AA',
      focusEn: 'React component architecture, render lifecycle profiling, strict TypeScript UI contracts, and WCAG AA accessibility',
      mandateRu: 'Сформировать модульную, переиспользуемую архитектуру интерфейса с нулевой терпимостью к визуальным сдвигам и утечкам памяти.',
      mandateEn: 'Engineer a modular, bulletproof frontend architecture with strict state isolation, optimal Core Web Vitals, and zero layout degradation.',
    };
  }

  // 5. Databases, PostgreSQL, SQL, Migrations
  if (/баз[аы]\s+данных|postgres|sql|миграци|индекс|dbre|database|schema/i.test(t)) {
    return {
      roleTitleRu: 'Principal Database Reliability Engineer (DBRE) & Data Architect',
      roleTitleEn: 'Principal Database Reliability Engineer (DBRE) & Data Architect',
      focusRu: 'реляционные схемы PostgreSQL, топология составных индексов, оптимизация планов выполнения (EXPLAIN ANALYZE) и безаварийные миграции',
      focusEn: 'PostgreSQL relational schemas, composite index topologies, query plan optimization, and zero-downtime transactional migrations',
      mandateRu: 'Спроектировать нормализованную, высоконагруженную схему данных с гарантией строгой транзакционной целостности (ACID).',
      mandateEn: 'Architect a hardened relational data tier guaranteeing strict ACID compliance and optimal query execution plans.',
    };
  }

  // 6. Code Refactoring, Architecture, Security, Clean Code
  if (
    skillsSet.has('code-audit-smells') ||
    skillsSet.has('code-refactoring-suite') ||
    skillsSet.has('type-safety-contracts') ||
    skillsSet.has('regression-test-specs') ||
    /рефакторинг|код|typescript|refactor|smell|архитектур|security|уязвимост|тест/i.test(t)
  ) {
    return {
      roleTitleRu: 'Principal Software Architect & Code Auditor',
      roleTitleEn: 'Principal Software Architect & Code Auditor',
      focusRu: 'устранение архитектурного долга, статическая типизация без `any`, обработка ошибок через `Result<T,E>`, изоляция побочных эффектов и регрессионные спецификации',
      focusEn: 'architectural debt eradication, strict static contract typing, algebraic error handling (`Result<T,E>`), and executable regression test specifications',
      mandateRu: 'Провести бескомпромиссный аудит кодовой базы, изолировать дефекты и предоставить чистый рефакторинг с гарантией типобезопасности.',
      mandateEn: 'Conduct a rigorous architectural audit, eliminate latent code smells, and deliver a mathematically sound, regression-resistant implementation.',
    };
  }

  // 7. Business, Strategy, GTM, Pricing, Unit Economics
  if (
    skillsSet.has('unit-economics-modeling') ||
    skillsSet.has('gtm-roadmap-phasing') ||
    skillsSet.has('gtm-strategy-engine') ||
    skillsSet.has('defensible-moats') ||
    /стратеги|бизнес|gtm|юнит|экономик|pricing|монетизаци|инвестор|рынок|swot/i.test(t)
  ) {
    return {
      roleTitleRu: 'Chief Strategy Officer (CSO) & Enterprise GTM Lead',
      roleTitleEn: 'Chief Strategy Officer (CSO) & Enterprise GTM Lead',
      focusRu: 'юнит-экономика (LTV/CAC/Payback), позиционирование ценности (Beachhead ICP), фазирование выхода на рынок и возведение структурных конкурентных рвов',
      focusEn: 'unit economics modeling (LTV/CAC, Payback), ICP positioning, phased go-to-market horizons, and structural competitive defensibility',
      mandateRu: 'Разработать экономически выверенную стратегию коммерциализации с прозрачной финансовой моделью и управляемыми рисками.',
      mandateEn: 'Deliver an economically rigorous commercialization strategy backed by empirical metrics and defensible competitive advantages.',
    };
  }

  // 8. Copywriting, Marketing, Conversion
  if (
    skillsSet.has('persuasive-copy-arc') ||
    skillsSet.has('executive-memo-style') ||
    skillsSet.has('inverted-pyramid-copy') ||
    /копирайт|текст|стать|пост|рассылк|продающ|конверси|лендинг|voice|меморандум/i.test(t)
  ) {
    return {
      roleTitleRu: 'Principal Narrative Architect & Senior Conversion Copywriter',
      roleTitleEn: 'Principal Narrative Architect & Senior Conversion Copywriter',
      focusRu: 'психологическая динамика убеждения (PAS/AIDA), структурирование внимания по перевернутой пирамиде, устранение воды и максимальная конверсия',
      focusEn: 'conversion copywriting arcs (PAS/AIDA), executive narrative framing, zero-filler prose rhythm, and compelling call-to-action hooks',
      mandateRu: 'Создать емкий, пробивающий баннерную слепоту материал, ориентированный на конкретный профиль читателя с четким целевым действием.',
      mandateEn: 'Craft a punchy, psychologically calibrated narrative that cuts through cognitive fatigue and drives definitive action.',
    };
  }

  // 9. Legal, Compliance, Regulatory
  if (
    skillsSet.has('contract-risk-analysis') ||
    skillsSet.has('regulatory-compliance') ||
    skillsSet.has('ambiguity-mitigation') ||
    /юрист|договор|комплаенс|gdpr|риск|регулятор|legal|contract|liability/i.test(t)
  ) {
    return {
      roleTitleRu: 'Senior Corporate Counsel & Regulatory Risk Strategist',
      roleTitleEn: 'Senior Corporate Counsel & Regulatory Risk Strategist',
      focusRu: 'ограничение ответственности, устранение правовых двусмысленностей, защита интеллектуальной собственности и комплаенс (GDPR/SOC2)',
      focusEn: 'contractual liability containment, indemnification exposure, IP protection, and statutory compliance (GDPR/SOC2)',
      mandateRu: 'Провести доскональный юридический аудит документации и исключить двусмысленные формулировки с финансовыми и регуляторными рисками.',
      mandateEn: 'Execute an exhaustive legal risk assessment, hardening contractual clauses and closing exposure loopholes.',
    };
  }

  // 10. Medical & Clinical
  if (
    skillsSet.has('clinical-trial-evaluation') ||
    skillsSet.has('diagnostic-differential') ||
    skillsSet.has('patient-communication') ||
    /медицин|клиническ|пациент|диагноз|лечени|medical|clinical|trial|patient/i.test(t)
  ) {
    return {
      roleTitleRu: 'Medical Research Director & Clinical Evidence Specialist',
      roleTitleEn: 'Medical Research Director & Clinical Evidence Specialist',
      focusRu: 'доказательная медицина (EBM/GRADE), иерархия клинических испытаний, безопасность терапии и дифференциальная диагностика',
      focusEn: 'evidence-based clinical methodology (EBM/GRADE), trial design rigor, therapeutic safety, and differential diagnosis',
      mandateRu: 'Сформировать доказательный клинический обзор с четкой оценкой статистической мощности и терапевтического эффекта.',
      mandateEn: 'Synthesize an authoritative, evidence-grounded clinical assessment with explicit bias audits and patient safety safeguards.',
    };
  }

  // 11. Pedagogy & Education
  if (
    skillsSet.has('scaffolding-pedagogy') ||
    skillsSet.has('feynman-technique') ||
    skillsSet.has('knowledge-check-quiz') ||
    /обучени|педагогик|урок|feynman|курс|education|pedagogy|tutor/i.test(t)
  ) {
    return {
      roleTitleRu: 'Principal Learning Architect & Cognitive Pedagogy Lead',
      roleTitleEn: 'Principal Learning Architect & Cognitive Pedagogy Lead',
      focusRu: 'декомпозиция сложных концепций по Фейнману, прогрессивные строительные леса (Scaffolding / ZPD) и диагностика скрытых заблуждений',
      focusEn: 'Feynman conceptual reduction, scaffolded progression (Zone of Proximal Development), and formative misconception diagnostics',
      mandateRu: 'Построить интуитивно понятный образовательный путь с активной практикой и проверкой понимания на каждом этапе.',
      mandateEn: 'Design an intuitive pedagogical path that dismantles complexity and establishes verifiable mental models.',
    };
  }

  // 12. UX & Product Design
  if (
    skillsSet.has('user-persona-empathy') ||
    skillsSet.has('usability-heuristic-audit') ||
    skillsSet.has('microcopy-ux-writing') ||
    /ux|usability|юзабилити|интерфейс|дизайн интерфейса|эвристик/i.test(t)
  ) {
    return {
      roleTitleRu: 'Staff UX Architect & Usability Systems Specialist',
      roleTitleEn: 'Staff UX Architect & Usability Systems Specialist',
      focusRu: 'эвристический аудит Нильсена-Нормана, снижение когнитивной нагрузки, микрокопирайтинг интерфейсов и типографическая иерархия',
      focusEn: 'Nielsen-Norman usability heuristics, cognitive load compression, interface microcopy architecture, and WCAG AA accessibility',
      mandateRu: 'Спроектировать интуитивный интерфейсный сценарий с превентивной защитой от ошибок пользователя.',
      mandateEn: 'Architect an intuitive interaction workflow with proactive error prevention and transparent affordances.',
    };
  }

  // 13. Dynamic Context-Driven Specific Role (Never "elite principal engineer" or "universal AI")
  let sanitizedTask = task
    .replace(/^(мне\s+нужен|напиши|создай|сделай|разработай|проанализируй|построй|подготовь|сгенерируй|i\s+need|create|write|build|generate|analyze|execute|выполнить)\s+/i, '')
    .replace(/^(?:directive|specialized task directive|target objective|задачу|директиву|специализированную задачу)\s*/i, '')
    .trim();

  const isGeneric = !sanitizedTask || sanitizedTask.length < 3;
  const titleCoreRu = isGeneric ? 'Профильная системная архитектура' : (sanitizedTask.slice(0, 42));
  const titleCoreEn = isGeneric ? 'Specialized Domain Architecture' : (sanitizedTask.slice(0, 42));

  return {
    roleTitleRu: `Ведущий эксперт и системный специалист по направлению «${titleCoreRu}»`,
    roleTitleEn: `Staff Domain Authority & Technical Lead in ${titleCoreEn}`,
    focusRu: isGeneric
      ? 'глубокое системное моделирование, строгая отраслевая терминология и бескомпромиссная надежность инженерных решений'
      : `глубокое системное моделирование, строгая отраслевая терминология и практическая реализация задачи: ${sanitizedTask}`,
    focusEn: isGeneric
      ? 'canonical industry taxonomy, structural completeness, and battle-tested production execution'
      : `canonical industry taxonomy, structural completeness, and battle-tested execution for: ${sanitizedTask}`,
    mandateRu: 'Предоставить бескомпромиссное, структурированное инженерное решение без общих фраз и поверхностных допущений.',
    mandateEn: 'Deliver an authoritative, structurally rigorous domain deliverable with zero generic hand-waving.',
  };
}

/**
 * The Master Skill Architect: synthesizes a cohesive, unified, production-grade prompt
 * out of active skills, understanding domain synergies and eliminating chaotic fragments.
 */
export function composeSkillsArchitecture(
  rawInput: string,
  skillIds: string[],
  context?: Record<string, any>
): {
  prompt: string;
  appliedSkills: SkillDefinition[];
} {
  const orderedSkills: SkillDefinition[] = [];
  const resolvedIds = new Set<string>();

  // Expand composite Skills depth-first, preserving the user's selection order.
  // The active path also prevents malformed custom composites from recursing forever.
  const addSkill = (id: string, activePath: Set<string> = new Set()): void => {
    if (activePath.has(id) || resolvedIds.has(id)) return;
    const skill = SKILLS_REGISTRY[id];
    if (!skill) return;

    resolvedIds.add(id);
    orderedSkills.push(skill);

    const nextPath = new Set(activePath);
    nextPath.add(id);
    for (const subSkillId of skill.subSkills || []) {
      addSkill(subSkillId, nextPath);
    }
  };

  for (const id of skillIds || []) addSkill(id);

  let prompt = rawInput || '';
  for (const skill of orderedSkills) {
    const transformed = skill.transform(prompt, context);
    if (typeof transformed !== 'string') {
      throw new TypeError(`Skill "${skill.id}" returned a non-string prompt.`);
    }
    prompt = transformed;
  }

  return { prompt, appliedSkills: orderedSkills };
}
