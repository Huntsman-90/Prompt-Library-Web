import type { ParsedSection } from '../utils/promptEngine';
import {
  parsePromptSections,
  deduplicateBullets,
  isRussianText,
  extractTaskFromGeneratedPrompt,
} from '../utils/promptEngine';
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
  const isRu = isRussianText(rawInput);
  const cleanedInput = purgeGenericBoilerplate(rawInput);
  const task = extractTaskFromGeneratedPrompt(cleanedInput) || (isRu ? 'Выполнить системную инженерную задачу' : 'Execute technical directive');

  // 1. Resolve skills and expand sub-skills for composites
  const resolvedSkillIds = new Set<string>();
  for (const id of skillIds) {
    const s = SKILLS_REGISTRY[id];
    if (s) {
      resolvedSkillIds.add(s.id);
      if (s.subSkills) {
        for (const sub of s.subSkills) {
          if (SKILLS_REGISTRY[sub]) resolvedSkillIds.add(sub);
        }
      }
    }
  }

  const activeSkillsList = Array.from(resolvedSkillIds)
    .map((id) => SKILLS_REGISTRY[id])
    .filter(Boolean) as SkillDefinition[];

  // 2. Derive Calibrated Narrow Role
  const roleSpec = derivePreciseRole(task, isRu, Array.from(resolvedSkillIds));
  const roleTitle = isRu ? roleSpec.roleTitleRu : roleSpec.roleTitleEn;
  const roleFocus = isRu ? roleSpec.focusRu : roleSpec.focusEn;
  const roleMandate = isRu ? roleSpec.mandateRu : roleSpec.mandateEn;

  // 3. Detect Domain Synergy Clusters
  const isIncidentCluster =
    resolvedSkillIds.has('blameless-principle') ||
    resolvedSkillIds.has('blameless-retrospective-framework') ||
    resolvedSkillIds.has('incident-postmortem') ||
    resolvedSkillIds.has('timeline-reconstruction') ||
    (resolvedSkillIds.has('root-cause-analysis') && /инцидент|сбой|авария|outage|postmortem|ретроспектив/i.test(task));

  const isCodeCluster =
    resolvedSkillIds.has('code-refactoring-suite') ||
    (resolvedSkillIds.has('code-audit-smells') && (resolvedSkillIds.has('type-safety-contracts') || resolvedSkillIds.has('regression-test-specs'))) ||
    (/рефакторинг|refactor|smell|чистый код/i.test(task) && (resolvedSkillIds.has('code-audit-smells') || resolvedSkillIds.has('type-safety-contracts')));

  const isGTMCluster =
    resolvedSkillIds.has('gtm-strategy-engine') ||
    (resolvedSkillIds.has('unit-economics-modeling') && (resolvedSkillIds.has('gtm-roadmap-phasing') || resolvedSkillIds.has('defensible-moats')));

  const isAgenticCluster =
    resolvedSkillIds.has('agentic-task-solver') ||
    (resolvedSkillIds.has('react-loop') && (resolvedSkillIds.has('task-decomposition') || resolvedSkillIds.has('tool-use-protocol') || resolvedSkillIds.has('memory-context-protocol')));

  const isLegalCluster =
    resolvedSkillIds.has('contract-risk-analysis') ||
    (resolvedSkillIds.has('regulatory-compliance') && resolvedSkillIds.has('ambiguity-mitigation'));

  const isMedicalCluster =
    resolvedSkillIds.has('clinical-trial-evaluation') ||
    (resolvedSkillIds.has('diagnostic-differential') && resolvedSkillIds.has('patient-communication'));

  const isPedagogyCluster =
    resolvedSkillIds.has('scaffolding-pedagogy') ||
    (resolvedSkillIds.has('feynman-technique') && resolvedSkillIds.has('knowledge-check-quiz'));

  // 4. Assemble Cohesive Structured Sections
  const rawSections: { title: string; lines: string[]; semanticType: ParsedSection['semanticType'] }[] = [];

  // TIER 1: Role & Professional Mandate
  rawSections.push({
    title: isRu ? 'Роль и Профессиональный Мандат' : 'Role & Professional Mandate',
    semanticType: 'role',
    lines: [
      isRu
        ? `Вы выступаете в роли: **${roleTitle}**.`
        : `You are acting as: **${roleTitle}**.`,
      isRu
        ? `- **Специализация и фокус**: ${roleFocus}.`
        : `- **Domain Focus**: ${roleFocus}.`,
      isRu
        ? `- **Главный мандат**: ${roleMandate}`
        : `- **Operational Mandate**: ${roleMandate}`,
      isRu
        ? '- **Требование к экспертизе**: Использовать каноническую отраслевую терминологию без упрощений. Каждое решение должно базироваться на реальных инженерных/бизнес-стандартах.'
        : '- **Domain Rigor**: Adhere strictly to canonical industry terminology. All recommendations must be grounded in battle-tested production standards.',
    ],
  });

  // TIER 2: Task Context & Scope Boundaries
  const userLines = cleanedInput
    .replace(/^###\s+.*$/gm, '')
    .trim()
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 5);

  rawSections.push({
    title: isRu ? 'Контекст Задачи и Границы Применения' : 'Context & Operational Boundaries',
    semanticType: 'context',
    lines: [
      isRu
        ? `**Целевая задача**: ${task}.`
        : `**Target Objective**: ${task}.`,
      ...(userLines.length > 0 && userLines[0] !== task
        ? [
            isRu ? '**Исходные вводные и специфика**:' : '**Input Specifications**:',
            ...userLines.map((l) => (l.startsWith('-') || l.startsWith('*') ? l : `- ${l}`)),
          ]
        : []),
      isRu
        ? '- **Границы применимости**: Решение разрабатывается строго для указанной системы и условий; избегать нерелевантных абстракций.'
        : '- **Operational Envelope**: Solution applies strictly to the specified runtime envelope; omit irrelevant domain tangentiality.',
      isRu
        ? '- **Явные допущения**: При нехватке конкретных данных четко фиксировать технические предпосылки перед переходом к реализации.'
        : '- **Explicit Assumptions**: In the event of ambiguous parameters, state underlying technical baseline assumptions clearly.',
    ],
  });

  // TIER 3 & 4: Cohesive Domain Blueprints
  if (isIncidentCluster) {
    // Blueprint A: Blameless Incident Retrospective Suite
    rawSections.push({
      title: isRu ? 'Хронология Инцидента (Timeline Reconstruction T0-T3)' : 'Incident Timeline Reconstruction (T0-T3)',
      semanticType: 'protocol',
      lines: [
        isRu
          ? 'Построить детерминированную хронологию развития событий по контрольным точкам:'
          : 'Reconstruct a deterministic sequence of events mapped to incident phases:',
        isRu ? '- **T0 (Триггер / Начало сбоя)**: Момент внесения изменения, аппаратного сбоя или появления деградации.' : '- **T0 (Trigger / Point of Origin)**: Initial defect injection, deployment, or hardware degradation timestamp.',
        isRu ? '- **T1 (Обнаружение / Alert)**: Срабатывание мониторинга, канал эскалации и зафиксированные метрики SLO/SLA.' : '- **T1 (Detection / Alert)**: Monitoring trigger, escalation vector, and breached SLI thresholds.',
        isRu ? '- **T2 (Локализация и Купирование)**: Временные меры (workaround), примененные для остановки разрастания радиуса поражения.' : '- **T2 (Mitigation / Triage)**: Containment actions applied to stop blast radius expansion.',
        isRu ? '- **T3 (Полное Восстановление)**: Время возвращения всех систем в штатный режим работы и подтверждение телеметрией.' : '- **T3 (Full Resolution)**: Permanent fix deployment and steady-state telemetry verification.',
      ],
    });

    rawSections.push({
      title: isRu ? 'Системный Анализ Первопричин (5 Whys / Blameless Root Cause)' : 'Systemic Root Cause Analysis (5 Whys)',
      semanticType: 'protocol',
      lines: [
        isRu
          ? '- **Цепочка «5 Почему»**: Спуститься от видимого симптома к фундаментальному изъяну архитектуры или процесса.'
          : '- **5-Whys Derivation**: Link surface telemetry symptoms to underlying architectural or procedural flaws.',
        isRu
          ? '- **Триггер vs Первопричина**: Разграничить триггер (непосредственный повод сбоя) и истинную первопричину (системный дефект).'
          : '- **Trigger vs Root Cause**: Differentiate immediate trigger (catalyst) from root systemic vulnerability.',
        isRu
          ? '- **Системные слепые зоны**: Выявить сопутствующие факторы: пробелы в тестах, нехватка опережающих алертов, отсутствие лимитов ресурсов или сбои автоматики.'
          : '- **Systemic Blindspots**: Identify contributing factors: telemetry blind spots, test harness gaps, missing circuit breakers, or timeout cascades.',
      ],
    });

    rawSections.push({
      title: isRu ? 'Матрица Превентивных Мер (Action Items Matrix)' : 'Preventative Action Items Matrix',
      semanticType: 'output_format',
      lines: [
        isRu
          ? 'Оформить план действий в виде строгой Markdown-таблицы с обязательными полями:'
          : 'Format preventative measures into an actionable Markdown matrix with mandatory columns:',
        isRu
          ? '| Приоритет | Превентивное Действие | Ответственная Роль | Срок (SLA) | Критерий Приемки / Тест |'
          : '| Priority | Preventative Work Item | Owner Role | Target SLA | Acceptance Criterion / Verification |',
        '|---|---|---|---|---|',
        isRu
          ? '| P0 (Блокирующий) | Устранение дефекта в коде/конфигурации | Staff Backend / DevOps | 24 часа | Автотест воспроизведения + canary |'
          : '| P0 (Blocker) | Hard architectural patch & automated regression test | Staff Backend / DevOps | 24h | Automated failure reproduction test passes |',
        isRu
          ? '| P1 (Системный) | Настройка опережающих алертов и лимитов | SRE Lead | 1 неделя | Проверка дашборда на синтетическом трафике |'
          : '| P1 (Structural) | Telemetry burn-rate alert & resource quotas | SRE Lead | 1 week | Synthetic alert validation in staging |',
        isRu
          ? '| P2 (Долгосрочный) | Архитектурный редизайн и изоляция отказов | Principal Architect | 1 месяц | Нагрузочное стресс-тестирование (Chaos test) |'
          : '| P2 (Long-term) | Subsystem failure isolation & circuit breaking | Principal Architect | 1 month | Chaos engineering stress-test verification |',
      ],
    });
  } else if (isCodeCluster) {
    // Blueprint B: Code Refactoring & Security Suite
    rawSections.push({
      title: isRu ? 'Протокол Анализа Дефектов и Архитектурный Аудит' : 'Architectural Smell & Vulnerability Audit',
      semanticType: 'protocol',
      lines: [
        isRu
          ? '- **Code Smells & Anti-patterns**: Идентифицировать нарушения SOLID, неявные мутации состояния, дублирование и цикломатическую сложность.'
          : '- **Code Smells & Anti-patterns**: Audit for SOLID violations, hidden state mutations, duplication, and cyclomatic complexity bloat.',
        isRu
          ? '- **Ресурсные утечки и Concurrency**: Проверить отсутствие утечек памяти, зависших таймеров, неперехваченных промисов и race conditions.'
          : '- **Resource & Concurrency Audit**: Check for dangling event listeners, unhandled promise rejections, race conditions, and memory leaks.',
        isRu
          ? '- **Security Bounds**: Валидация входных данных на границах модуля, предотвращение инъекций и соблюдение принципа безопасных дефолтов.'
          : '- **Security Hardening**: Validate input schema at all I/O boundaries, sanitize inputs, and guarantee safe defaults.',
      ],
    });

    rawSections.push({
      title: isRu ? 'Контракт Типобезопасности и Инварианты Системы' : 'Type Safety Contract & Invariants',
      semanticType: 'protocol',
      lines: [
        isRu
          ? '- **Strict Type Contracts**: Полный запрет на тип `any`. Использовать строгие интерфейсы, `unknown` с type guards и `readonly` свойства.'
          : '- **Strict Type Contracts**: Zero usage of `any`. Mandate strict discriminated unions, `unknown` with type guards, and `readonly` immutability.',
        isRu
          ? '- **Обработка ошибок**: Использовать типизированный паттерн `Result<T, E>` вместо неконтролируемых `throw`. Каждая ошибка должна быть типизирована.'
          : '- **Deterministic Error Model**: Prefer typed `Result<T, E>` unions over untyped throwing to ensure compiler-enforced handling.',
        isRu
          ? '- **Null-safety**: Полная защита от `undefined / null` в точках соприкосновения с внешними данными.'
          : '- **Null Safety**: Exhaustive non-nullable checks and explicit schema parsing at all I/O boundaries.',
      ],
    });

    rawSections.push({
      title: isRu ? 'Спецификация Регрессионных Тестов (Vitest / Jest)' : 'Regression Test Suite Specification',
      semanticType: 'protocol',
      lines: [
        isRu
          ? '- Написать исчерпывающие модульные тесты для каждого измененного компонента.'
          : '- Provide exhaustive unit test specifications covering standard operation, edge cases, and error recovery.',
        isRu
          ? '- Обязательно покрыть граничные условия: пустые коллекции, сбои сети, таймауты, экстремальные числовые значения.'
          : '- Mandatory boundary coverage: empty collections, network timeouts, invalid payloads, and high-frequency concurrency.',
        isRu
          ? '- Тесты должны служить исполняемой документацией к контрактам интерфейсов.'
          : '- Tests must serve as executable specifications validating architectural invariants.',
      ],
    });
  } else if (isAgenticCluster) {
    // Blueprint C: Autonomous Agent Systems Protocol
    rawSections.push({
      title: isRu ? 'Декомпозиция Задач и Граф Зависимостей (DAG)' : 'Task DAG Decomposition Protocol',
      semanticType: 'protocol',
      lines: [
        isRu
          ? '- Разбить задачу на направленный ациклический граф (DAG) атомарных независимых шагов.'
          : '- Deconstruct complex goal into an explicit Directed Acyclic Graph (DAG) of atomic execution nodes.',
        isRu
          ? '- Для каждого узла определить: входные параметры, вызываемый инструмент, предусловия и критерии готовности.'
          : '- For each node annotate: required input parameters, invoked tool schema, preconditions, and success criteria.',
        isRu
          ? '- Изолировать критический путь выполнения для параллельной обработки независимых подзадач.'
          : '- Isolate critical dependency paths to enable parallel execution of non-blocking sub-tasks.',
      ],
    });

    rawSections.push({
      title: isRu ? 'Протокол Исполнения ReAct (Thought -> Action -> Observation)' : 'Deterministic ReAct Execution Protocol',
      semanticType: 'protocol',
      lines: [
        isRu
          ? 'Каждый цикл выполнения агента обязан строго следовать трехфазному контракту:'
          : 'Every autonomous cycle must strictly adhere to the tripartite execution contract:',
        isRu ? '- **Thought**: Логический вывод о текущем состоянии и обоснование необходимости следующего действия.' : '- **Thought**: Explicit deduction regarding current state delta and operational necessity of next action.',
        isRu ? '- **Action**: Строго валидный JSON-вызов инструмента с проверенными аргументами.' : '- **Action**: Machine-readable JSON tool invocation contract matching registered schema.',
        isRu ? '- **Observation**: Анализ возвращенных средой данных и верификация прогресса к целевому результату.' : '- **Observation**: Grounded interpretation of tool response against target invariants before next step.',
      ],
    });

    rawSections.push({
      title: isRu ? 'Управление Памятью и Защита от Зацикливания' : 'Memory Scratchpad & Loop Prevention',
      semanticType: 'protocol',
      lines: [
        isRu
          ? '- Вести скользящий рабочий контекст (scratchpad); архивировать выполненные шаги.'
          : '- Maintain a sliding working scratchpad; summarize and prune completed turns.',
        isRu
          ? '- Контролировать лимит итераций: при обнаружении повторяющихся действий немедленно применить альтернативную стратегию или вернуть ошибку.'
          : '- Hard iteration budget: if duplicate state observations are detected, trigger deterministic fallback branching or fail-fast.',
      ],
    });
  } else if (isGTMCluster) {
    // Blueprint D: Strategic GTM & Commercialization Engine
    rawSections.push({
      title: isRu ? 'Модель Юнит-Экономики и Финансовые Драйверы' : 'Unit Economics & Financial Sensitivity Model',
      semanticType: 'protocol',
      lines: [
        isRu
          ? '- **Ключевые метрики**: Оцифровать CAC (стоимость привлечения), LTV (пожизненная ценность) и Payback Period (срок окупаемости клиента).'
          : '- **Core Drivers**: Quantify Customer Acquisition Cost (CAC), Lifetime Value (LTV), and CAC Payback timeline.',
        isRu
          ? '- **Чувствительность к Churn**: Оценить влияние оттока клиентов на валовую маржу и масштабируемость бизнеса.'
          : '- **Churn Sensitivity**: Model gross margin impact under variable cohort churn and retention curves.',
        isRu
          ? '- **Ценообразование**: Обосновать ценовую модель (value-based, tiered, usage-based) относительно альтернатив конкурентов.'
          : '- **Pricing Mechanics**: Justify value-based or usage-based pricing architecture relative to market substitutes.',
      ],
    });

    rawSections.push({
      title: isRu ? 'Фазированная Дорожная Карта Выхода на Рынок (GTM Roadmap)' : 'Phased GTM Horizon Roadmap',
      semanticType: 'protocol',
      lines: [
        isRu
          ? '- **Горизонт 1 (0-90 дней, Валидация)**: Достижение Product-Market Fit в узком сегменте (Beachhead ICP).'
          : '- **Horizon 1 (0-90 Days, Beachhead)**: Secure Product-Market Fit validation within a narrow, high-urgency ICP cohort.',
        isRu
          ? '- **Горизонт 2 (3-9 месяцев, Масштабирование)**: Построение повторяемых каналов дистрибуции и снижение CAC.'
          : '- **Horizon 2 (3-9 Months, Expansion)**: Scale repeatable customer acquisition pipelines and compress payback period.',
        isRu
          ? '- **Горизонт 3 (9+ месяцев, Доминирование)**: Формирование сетевых эффектов и экосистемного удержания.'
          : '- **Horizon 3 (9+ Months, Defense)**: Solidify platform network effects, enterprise contracts, and high switching costs.',
      ],
    });

    rawSections.push({
      title: isRu ? 'Архитектура Защитных Рвов (Defensible Moats)' : 'Defensible Moat & Moat Synthesis',
      semanticType: 'protocol',
      lines: [
        isRu
          ? '- Определить 2-3 ключевых барьера входа: сетевые эффекты, высокая стоимость переключения, уникальный массив данных или регуляторное преимущество.'
          : '- Engineer 2-3 structural moats: network effects, high switching costs, proprietary data compounding, or counter-positioning.',
      ],
    });
  } else if (isLegalCluster) {
    // Blueprint E: Regulatory & Legal Risk Suite
    rawSections.push({
      title: isRu ? 'Аудит Рисков и Юридическая Экспертиза Пунктов' : 'Clause-by-Clause Legal Risk Assessment',
      semanticType: 'protocol',
      lines: [
        isRu
          ? '- **Пределы Ответственности (Liability Caps)**: Проверить соразмерность лимитов ответственности, исключения из ограничений и штрафные санкции.'
          : '- **Liability & Indemnification**: Audit liability ceilings, uncapped exposure vectors, and indemnification triggers.',
        isRu
          ? '- **Устранение Двусмысленностей**: Заменить субъективные формулировки («разумные усилия») на объективные измеримые критерии.'
          : '- **Ambiguity Eradication**: Replace subjective phrases ("reasonable efforts") with strict empirical benchmarks.',
        isRu
          ? '- **Комплаенс-требования**: Проверить соответствие регуляторным нормам (GDPR, SOC2, конфиденциальность данных).'
          : '- **Statutory Compliance**: Verify adherence to GDPR, data residency, and mandatory audit provisions.',
      ],
    });
  } else if (isMedicalCluster) {
    // Blueprint F: Clinical Evidence & Medical Suite
    rawSections.push({
      title: isRu ? 'Клинический Анализ Доказательной Базы (EBM / GRADE)' : 'Evidence-Based Clinical Appraisal (GRADE)',
      semanticType: 'protocol',
      lines: [
        isRu
          ? '- **Иерархия Доказательств**: Оценить качество исследований (РКИ, мета-анализы) по методологии GRADE с указанием уровня достоверности.'
          : '- **GRADE Methodology**: Appraise study power, randomization rigor, and statistical confidence intervals (GRADE framework).',
        isRu
          ? '- **Дифференциальная Диагностика**: Построить иерархию дифференциальных диагнозов от наиболее вероятных к критически опасным.'
          : '- **Differential Stratification**: Rank differential diagnoses by probability and rule-out urgency.',
        isRu
          ? '- **Безопасность Пациента**: Явно выделить абсолютные и относительные противопоказания, лекарственные взаимодействия и сигналы тревоги (Red Flags).'
          : '- **Safety Red Flags**: Explicitly list absolute contraindications, adverse drug reactions, and urgent triage triggers.',
      ],
    });
  } else if (isPedagogyCluster) {
    // Blueprint G: Pedagogical Architecture
    rawSections.push({
      title: isRu ? 'Концептуальное Объяснение по Методу Фейнмана' : 'Feynman Conceptual Derivation',
      semanticType: 'protocol',
      lines: [
        isRu
          ? '- **Интуитивная База**: Объяснить базовый принцип простым языком через наглядную жизненную или физическую аналогию.'
          : '- **Intuitive Analogy**: Ground the foundational mechanism in a clean everyday physical analogy without initial jargon.',
        isRu
          ? '- **Поэтапное Усложнение (Scaffolding)**: Провести обучаемого от фундамента к тонкостям реализации через зону ближайшего развития.'
          : '- **Scaffolded Progression**: Guide learner across the Zone of Proximal Development from fundamentals to advanced edge cases.',
        isRu
          ? '- **Диагностический Квиз**: Сформулировать 2-3 проверочных вопроса с типичными заблуждениями для проверки глубокого понимания.'
          : '- **Formative Knowledge Checks**: Formulate diagnostic questions featuring common misconception traps.',
      ],
    });
  } else {
    // Universal Cohesive Multi-Skill Orchestrator
    // 1. Cognitive Reasoning Directives
    const reasoningDirectives: string[] = [];

    if (resolvedSkillIds.has('chain-of-thought')) {
      reasoningDirectives.push(
        isRu
          ? '- **Пошаговая дедукция (Chain-of-Thought)**: Разбить рассуждение на верифицируемые промежуточные шаги с явными причинно-следственными связями.'
          : '- **Step-by-Step Derivation (Chain-of-Thought)**: Deconstruct derivation into verifiable sequential stages with explicit causal links.'
      );
    }
    if (resolvedSkillIds.has('first-principles')) {
      reasoningDirectives.push(
        isRu
          ? '- **Первоосновы (First Principles)**: Очистить задачу от аналогий; свести проблему к фундаментальным аксиомам физики/математики/архитектуры.'
          : '- **First Principles Axioms**: Strip away superficial analogies; reduce problem strictly to fundamental foundational truths.'
      );
    }
    if (resolvedSkillIds.has('inversion-thinking')) {
      reasoningDirectives.push(
        isRu
          ? '- **Инверсивный анализ (Pre-Mortem)**: Смоделировать сценарий катастрофического провала решения и превентивно устранить его причины.'
          : '- **Inversion & Pre-Mortem**: Simulate total systemic failure upfront and pre-emptively eliminate conditions that enable it.'
      );
    }
    if (resolvedSkillIds.has('tree-of-thoughts')) {
      reasoningDirectives.push(
        isRu
          ? '- **Древо рассуждений (Tree-of-Thoughts)**: Исследовать 3 альтернативные ветви решения, оценить риски каждой и отсечь неоптимальные пути.'
          : '- **Tree-of-Thoughts Branching**: Explore 3 distinct architectural hypotheses, score trade-offs, and prune suboptimal branches.'
      );
    }
    if (resolvedSkillIds.has('gap-analysis')) {
      reasoningDirectives.push(
        isRu
          ? '- **Анализ разрывов (Gap Analysis)**: Сопоставить текущее состояние (As-Is) и целевое (To-Be) с четким описанием мостовых инициатив.'
          : '- **Gap Analysis (As-Is vs To-Be)**: Contrast current baseline against target state with explicit bridging initiatives.'
      );
    }
    if (resolvedSkillIds.has('swot-to-tows')) {
      reasoningDirectives.push(
        isRu
          ? '- **Матрица TOWS**: Преобразовать описательные SWOT-факторы в конкретные наступательные (SO) и защитные (WT) действия.'
          : '- **TOWS Matrix**: Convert descriptive SWOT factors into actionable offensive (SO) and defensive (WT) strategies.'
      );
    }

    if (reasoningDirectives.length === 0) {
      reasoningDirectives.push(
        isRu
          ? '- Провести пошаговый структурный анализ задачи с явной верификацией промежуточных выводов перед формированием рекомендаций.'
          : '- Execute systematic step-by-step reasoning, validating intermediate deductions prior to synthesizing final deliverables.'
      );
    }

    rawSections.push({
      title: isRu ? 'Методология Анализа и Когнитивная Стратегия' : 'Analytical Strategy & Reasoning Methodology',
      semanticType: 'protocol',
      lines: reasoningDirectives,
    });

    // 2. Domain Execution Directives
    const executionSkills = activeSkillsList.filter(
      (s) => !['core', 'guardrails', 'output', 'reasoning', 'analysis'].includes(s.categoryId)
    );

    const executionDirectives: string[] = [];
    for (const s of executionSkills) {
      executionDirectives.push(
        isRu
          ? `- **${s.displayName}**: ${s.description}`
          : `- **${s.displayName}**: ${s.description}`
      );
    }

    if (executionDirectives.length > 0) {
      rawSections.push({
        title: isRu ? 'Протокол Профильного Выполнения' : 'Domain Execution Directives',
        semanticType: 'protocol',
        lines: executionDirectives,
      });
    }
  }

  // TIER 5: Hard Guardrails & Negative Invariants
  const guardrailLines: string[] = [
    isRu
      ? '- **Категорический запрет на воду**: Никаких вежливых вступлений («Конечно, я помогу вам», «Как опытный инженер...») и бессодержательных рассуждений.'
      : '- **Zero Conversational Fluff**: Strictly ban introductory pleasantries ("Certainly, I can help...", "As an expert...") and generic filler.',
    isRu
      ? '- **Запрет на непроверенные допущения**: Не выдумывать несуществующие API, библиотеки или метрики. При отсутствии данных явно указывать границу знания.'
      : '- **Anti-Hallucination & Grounding**: Do not fabricate unverified APIs, metrics, or libraries. Explicitly demarcate knowledge boundaries.',
    isRu
      ? '- **Полнота и завершенность**: Предоставлять законченное, целостное решение; не обрывать код многоточиями `// TODO: implement later`.'
      : '- **Completeness Standard**: Provide production-ready, fully formed deliverables; never truncate critical logic with `// TODO: add here`.',
  ];

  if (resolvedSkillIds.has('blameless-principle') || isIncidentCluster) {
    guardrailLines.push(
      isRu
        ? '- **Принцип Безнаказанности (Blameless)**: Полный запрет на обвинение людей («ошибка инженера», «невнимательность»). Фокус только на процессах и автоматике.'
        : '- **Blameless Principle**: Strict prohibition of personal blame ("human error", "operator mistake"). Focus exclusively on automated systemic safeguards.'
    );
  }
  if (resolvedSkillIds.has('constraint-injection')) {
    guardrailLines.push(
      isRu
        ? '- **Негативные инварианты**: Стресс-тестировать финальное решение против граничных сценариев и векторов отказа.'
        : '- **Negative Invariants**: Stress-test final artifact against boundary failure vectors and reject non-compliant drafts.'
    );
  }
  if (resolvedSkillIds.has('refusal-pattern')) {
    guardrailLines.push(
      isRu
        ? '- **Протокол отказа**: При запросе небезопасных или архитектурно некорректных паттернов аргументированно отказать и предложить безопасную альтернативу.'
        : '- **Refusal Protocol**: When requested with unsafe or structurally flawed patterns, politely refuse and provide a safe hardened alternative.'
    );
  }

  rawSections.push({
    title: isRu ? 'Защитные Ограничения и Инварианты (Hard Guardrails)' : 'Non-Negotiable Guardrails & Constraints',
    semanticType: 'constraints',
    lines: guardrailLines,
  });

  // TIER 6: Output Specification & Verification Protocol
  const outputLines: string[] = [];

  if (resolvedSkillIds.has('json-schema-strict')) {
    outputLines.push(
      isRu
        ? '- Вывод строго в формате валидного JSON-объекта без окружающего текста и Markdown-оберток (raw JSON).'
        : '- Deliverable must be raw, strictly valid, schema-compliant JSON with zero surrounding conversational text or markdown fences.'
    );
  } else if (resolvedSkillIds.has('executive-markdown-table') && !isIncidentCluster) {
    outputLines.push(
      isRu
        ? '- Итоговые сравнительные данные и компромиссы оформить в виде выверенной Markdown-таблицы с числовыми оценками и ответственными.'
        : '- Format synthesized findings and decision trade-offs into an executive Markdown matrix with quantitative scoring and owners.',
      '| Dimension / Decision | Evaluation / Recommendation | Owner | SLA | Verification |',
      '|---|---|---|---|---|',
      '| Core Architecture | Recommended Path | Tech Lead | 48h | Automated Test |'
    );
  } else if (resolvedSkillIds.has('hierarchical-report')) {
    outputLines.push(
      isRu
        ? '- Отчет должен содержать 3 уровня: 1. Executive Summary (2 предложения), 2. Технический/стратегический разбор, 3. План реализации (Next Steps).'
        : '- Deliverable must follow a 3-tier hierarchy: 1. Executive Summary (2 sentences), 2. Deep Technical Breakdown, 3. Actionable Next Steps.'
    );
  } else {
    outputLines.push(
      isRu
        ? '- Структурировать ответ с использованием четкой иерархии Markdown (лаконичные заголовки, списки, типизированные блоки кода).'
        : '- Structure deliverable using clean Markdown hierarchy (concise headers, dense bulleting, typed code blocks).'
    );
  }

  if (resolvedSkillIds.has('self-critique')) {
    outputLines.push(
      isRu
        ? '- **Аудит перед выдачей (Self-Critique)**: Перед отправкой ответа перепроверить решение на соответствие 100% требований и ограничений.'
        : '- **Pre-Emission Self-Critique**: Audit the synthesized draft against all constraints before final emission; discard and fix flaws upfront.'
    );
  }

  rawSections.push({
    title: isRu ? 'Спецификация Результата и Формат Выдачи' : 'Deliverable Specification & Output Schema',
    semanticType: 'output_format',
    lines: outputLines,
  });

  // 5. Reconstruct pristine numbered Markdown prompt
  const finalPromptParts: string[] = [];

  rawSections.forEach((sec, idx) => {
    const sectionNumber = idx + 1;
    const header = `### ${sectionNumber}. ${sec.title}`;
    const cleanLines = deduplicateBullets(sec.lines)
      .map((l) => l.trimEnd())
      .filter((l, lIdx, arr) => !(l === '' && arr[lIdx - 1] === ''));

    const body = cleanLines.join('\n').trim();
    if (body.length > 0) {
      finalPromptParts.push(`${header}\n${body}`);
    } else {
      finalPromptParts.push(header);
    }
  });

  const finalPrompt = finalPromptParts.join('\n\n').trim();

  return {
    prompt: finalPrompt,
    appliedSkills: activeSkillsList,
  };
}
