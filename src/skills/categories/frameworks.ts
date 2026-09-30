import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const FRAMEWORKS_SKILLS: Record<string, SkillDefinition> = {
  'blameless-retrospective-framework': {
    id: 'blameless-retrospective-framework',
    name: 'BlamelessRetrospectiveFramework',
    displayName: 'Blameless Incident Retrospective Suite',
    categoryId: 'frameworks',
    description: 'Comprehensive incident retrospective: SRE Commander role, T0-T3 timeline, 5-Whys RCA, and preventative action matrix.',
    tags: ['frameworks', 'composite', 'incident', 'postmortem', 'sre', 'blameless', 'retrospective'],
    subSkills: ['role-calibration', 'root-cause-analysis', 'timeline-reconstruction', 'action-items-matrix', 'blameless-principle'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Комплексный Фреймворк Безнаказанного Постмортема (SRE Suite)',
        'Comprehensive Blameless Retrospective Suite (SRE Protocol)',
        [
          '- **1. Обзор инцидента**: Краткая сводка воздействия на пользователей (SLA, % затронутых запросов, финансовый ущерб).',
          '- **2. Хронология (T0-T3)**: Поминутная таблица событий с точными UTC-таймстемпами от возникновения триггера до полного восстановления.',
          '- **3. Анализ первопричин (5 Whys)**: Глубинная цепочка причин без поиска виновных людей, с фокусом на сбои мониторинга и валидации.',
          '- **4. Матрица превентивных мер**: Таблица с полями `[Действие | Тип (Fix/Mitigate/Detect) | Приоритет P0-P2 | Ответственный | Срок]` со строгим дедлайном.',
        ],
        [
          '- **1. Executive Incident Summary**: Blast radius, affected user percentage, SLA breach duration, and financial/business impact.',
          '- **2. Chronological Event Ledger (T0-T3)**: Granular UTC timeline mapping Trigger, Detection, Mitigation, and Full Recovery.',
          '- **3. 5-Whys Root Cause Analysis**: Systematic causality derivation isolating procedural and architectural vulnerabilities.',
          '- **4. Preventative Action Matrix**: Structured table `[Action Item | Category (Prevent/Detect/Mitigate) | Priority P0-P2 | Owner | Due Date]`.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'code-refactoring-suite': {
    id: 'code-refactoring-suite',
    name: 'CodeRefactoringSuite',
    displayName: 'Clean Code & Architecture Refactoring Suite',
    categoryId: 'frameworks',
    description: 'End-to-end refactoring suite: code smell detection, strict typing contracts, performance optimization, and regression test suites.',
    tags: ['frameworks', 'composite', 'code', 'refactor', 'typescript', 'testing', 'clean-code'],
    subSkills: ['role-calibration', 'code-audit-smells', 'type-safety-contracts', 'regression-test-specs', 'constraint-injection'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Комплексный Фреймворк Рефакторинга и Архитектурного Аудита',
        'Clean Code Refactoring & Architectural Hardening Suite',
        [
          '- **1. Аудит антипаттернов**: Выявление code smells, цикломатической сложности, race conditions и утечек памяти в исходном коде.',
          '- **2. Строгие контракты типов**: Перевод на безупречные типы (Discriminated Unions, generics, immutability, zero `any`).',
          '- **3. Отрефакторенный код**: Полная реализация чистого решения с соблюдением SOLID, DRY и защитного программирования.',
          '- **4. Регрессионные тесты**: Комплект unit/property-based тестов, покрывающих критические пути и краевые случаи (Boundary / Error cases).',
        ],
        [
          '- **1. Architectural & Code Smell Audit**: Diagnostic catalog of cyclomatic complexity, memory leaks, race conditions, and technical debt.',
          '- **2. Strict Type Safety Contracts**: Elimination of `any`; implementation of Discriminated Unions, strict generics, and readonly immutability.',
          '- **3. Production Refactored Implementation**: Complete, self-contained, typed implementation adhering strictly to SOLID and clean architecture.',
          '- **4. Regression & Boundary Test Suite**: Comprehensive test specs covering happy paths, network failures, null boundaries, and concurrent access.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'gtm-strategy-engine': {
    id: 'gtm-strategy-engine',
    name: 'GtmStrategyEngine',
    displayName: 'Go-To-Market (GTM) Strategy & Moat Engine',
    categoryId: 'frameworks',
    description: 'Comprehensive product commercialization: CAC/LTV unit economics, defensible moats, ICP targeting, and phased launch milestones.',
    tags: ['frameworks', 'composite', 'business', 'gtm', 'strategy', 'pricing', 'moats'],
    subSkills: ['role-calibration', 'unit-economics-modeling', 'gtm-roadmap-phasing', 'defensible-moats', 'hierarchical-report'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Комплексный Фреймворк Вывода Продукта на Рынок (GTM Engine)',
        'Comprehensive Go-To-Market (GTM) & Commercialization Engine',
        [
          '- **1. Профиль идеального клиента (ICP) и УТП**: Сегментация целевой аудитории и формулирование неотразимого ценностного предложения.',
          '- **2. Юнит-экономика и ценообразование**: Расчет CAC, LTV, Payback Period и модель ценовых тарифов (Tiered / Usage-based).',
          '- **3. Защитные технологические рвы (Moats)**: Сетевые эффекты, проприетарные данные и барьеры входа для конкурентов.',
          '- **4. Поэтапная дорожная карта GTM**: Фазы запуска (Private Alpha -> Beta -> Public Launch -> Scale) с конкретными KPI и дедлайнами.',
        ],
        [
          '- **1. ICP & Value Proposition**: Precision targeting of Ideal Customer Profile and non-commodity differentiation positioning.',
          '- **2. Unit Economics & Pricing Model**: Quantitative CAC, LTV, payback period modeling, and tiered monetization mechanics.',
          '- **3. Defensible Moats**: Network effects, proprietary telemetry datasets, switching costs, and high barrier-to-entry mechanics.',
          '- **4. Phased GTM Execution Roadmap**: Milestones across Private Alpha, Public Beta, Enterprise GA, and Scale with hard KPI gates.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'agentic-task-solver': {
    id: 'agentic-task-solver',
    name: 'AgenticTaskSolver',
    displayName: 'Autonomous Agentic Task Solver Engine',
    categoryId: 'frameworks',
    description: 'End-to-end autonomous agent workflow: DAG task decomposition, ReAct execution loops, JSON tool schemas, and scratchpad memory.',
    tags: ['frameworks', 'composite', 'agentic', 'react', 'tools', 'autonomous', 'workflow'],
    subSkills: ['task-decomposition', 'react-loop', 'tool-use-protocol', 'memory-context-protocol', 'constraint-injection'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Комплексный Фреймворк Автономного Агента (Agentic Solver Suite)',
        'Autonomous Agentic Task Solver Architecture (ReAct Suite)',
        [
          '- **1. DAG-Декомпозиция**: Построение графа зависимостей между атомарными шагами выполнения.',
          '- **2. Цикл ReAct**: Выполнение каждого шага по протоколу `[Thought] -> [Action: JSON Tool] -> [Observation] -> [Reflection]`.',
          '- **3. Управление памятью**: Фиксация промежуточных артефактов в изолированном блоке памяти (Scratchpad).',
          '- **4. Защитные инварианты**: Лимит на количество шагов, валидация входных данных инструментов и безопасные fallback-сценарии.',
        ],
        [
          '- **1. DAG Task Decomposition**: Directed acyclic graph mapping prerequisite workflows and parallel sub-threads.',
          '- **2. ReAct Execution Engine**: Strict adherence to `[Thought] -> [Action: Validated Tool Call] -> [Observation] -> [Reflection]`.',
          '- **3. Bounded Scratchpad Memory**: Epistemic state tracking, fact isolation, and payload compaction.',
          '- **4. Robust Safety Governors**: Max-step loop caps, schema validation gates, and self-healing exception fallbacks.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'rtf-framework': {
    id: 'rtf-framework',
    name: 'RtfFrameworkSkill',
    displayName: 'RTF Architecture (Role-Task-Format)',
    categoryId: 'frameworks',
    description: 'Foundational 3-pillar prompt architecture: Role calibration, Task directive, and strict Format schema.',
    tags: ['frameworks', 'rtf', 'role', 'task', 'format', 'foundational'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Архитектурный Фреймворк RTF (Role — Task — Format)',
        'RTF Prompt Architecture (Role — Task — Format)',
        [
          '- **[R] Role**: Вы выступаете в роли ведущего профильного эксперта с максимальным уровнем авторитета в предметной области.',
          '- **[T] Task**: Выполнить поставленную задачу системно, глубоко и исчерпывающе, закрыв все неявные краевые случаи.',
          '- **[F] Format**: Оформить результат в строгом структурированном виде (Markdown, списки, таблицы) без лишней воды.',
        ],
        [
          '- **[R] Role**: Act as the senior principal domain authority possessing deep technical and operational expertise.',
          '- **[T] Task**: Execute the directive with exhaustive analytical depth, resolving all implicit edge cases and dependencies.',
          '- **[F] Format**: Structure deliverable according to strict, clean Markdown hierarchy with typed code blocks and zero filler.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'create-framework': {
    id: 'create-framework',
    name: 'CreateFrameworkSkill',
    displayName: 'CREATE Architecture (Character-Request-Examples-Adjustments-Type-Extras)',
    categoryId: 'frameworks',
    description: 'Comprehensive 6-tier prompt engine for nuanced, high-fidelity enterprise deliverables.',
    tags: ['frameworks', 'create', 'character', 'request', 'examples', 'type'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Архитектурный Фреймворк CREATE',
        'CREATE Prompt Architecture (Character — Request — Examples — Adjustments — Type — Extras)',
        [
          '- **[C] Character**: Четкая ролевая позиция и профессиональный стандарт мышления.',
          '- **[R] Request**: Точная операционная формулировка целевой задачи.',
          '- **[E] Examples**: Опора на эталонные практические паттерны и архитектурные решения.',
          '- **[A] Adjustments**: Негативные ограничения, исключающие антипаттерны и воду.',
          '- **[T] Type of Output**: Спецификация формата вывода (код, отчет, таблица).',
          '- **[E] Extras**: Дополнительные проверочные критерии и чеклист валидации.',
        ],
        [
          '- **[C] Character**: Authoritative domain persona and cognitive stance.',
          '- **[R] Request**: Explicit, disambiguated target mission statement.',
          '- **[E] Examples**: Anchoring in production-grade reference patterns and standards.',
          '- **[A] Adjustments**: Hard negative invariants and anti-pattern constraints.',
          '- **[T] Type of Output**: Specific deliverable format (schema, code, executive report).',
          '- **[E] Extras**: Verification gates, sign-off checklists, and edge-case criteria.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'spar-framework': {
    id: 'spar-framework',
    name: 'SparFrameworkSkill',
    displayName: 'SPAR Deep Case Framework (Situation-Problem-Action-Result)',
    categoryId: 'frameworks',
    description: 'Structure for case studies, operational reviews, and business transformation initiatives.',
    tags: ['frameworks', 'spar', 'situation', 'problem', 'action', 'result', 'case-study'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Фреймворк Кейс-Анализа SPAR (Situation — Problem — Action — Result)',
        'SPAR Case Architecture (Situation — Problem — Action — Result)',
        [
          '- **[S] Situation**: Исходный контекст, масштабы системы и внешние условия.',
          '- **[P] Problem**: Критический дефект, конфликт требований или угроза срыву целей.',
          '- **[A] Action**: Детальный план инженерных и управленческих шагов по преодолению кризиса.',
          '- **[R] Result**: Количественно измеримый финальный результат, выученные уроки и метрики.',
        ],
        [
          '- **[S] Situation**: Baseline operational landscape, system topology, and environmental context.',
          '- **[P] Problem**: The critical architectural bottleneck, defect, or operational blocker.',
          '- **[A] Action**: Concrete, sequenced engineering and organizational actions taken.',
          '- **[R] Result**: Quantifiable outcomes, post-remediation telemetry metrics, and systemic learnings.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'trace-framework': {
    id: 'trace-framework',
    name: 'TraceFrameworkSkill',
    displayName: 'TRACE Prompt Architecture (Task-Request-Action-Context-Example)',
    categoryId: 'frameworks',
    description: 'High-precision operational prompt architecture for complex system engineering tasks.',
    tags: ['frameworks', 'trace', 'task', 'request', 'action', 'context', 'example'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Фреймворк TRACE (Task — Request — Action — Context — Example)',
        'TRACE Architecture (Task — Request — Action — Context — Example)',
        [
          '- **[T] Task**: Высокоуровневая инженерная задача и бизнес-контекст.',
          '- **[R] Request**: Конкретный запрос на генерацию артефакта.',
          '- **[A] Action**: Пошаговый протокол выполнения логики.',
          '- **[C] Context**: Ограничения стека, библиотеки и зависимости.',
          '- **[E] Example**: Пример целевой структуры ответа.',
        ],
        [
          '- **[T] Task**: Macro engineering mandate and system objective.',
          '- **[R] Request**: Concrete artifact generation directive.',
          '- **[A] Action**: Step-by-step procedural execution instructions.',
          '- **[C] Context**: Environmental constraints, dependencies, and tech stack.',
          '- **[E] Example**: Reference output schema and exemplar structure.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'crispe-framework': {
    id: 'crispe-framework',
    name: 'CrispeFrameworkSkill',
    displayName: 'CRISPE Framework (Capacity-Role-Insight-Statement-Personality-Experiment)',
    categoryId: 'frameworks',
    description: 'Advanced role-and-personality prompt engineering framework for creative & strategic synthesis.',
    tags: ['frameworks', 'crispe', 'capacity', 'role', 'insight', 'personality'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Архитектурный Фреймворк CRISPE',
        'CRISPE Framework (Capacity — Role — Insight — Statement — Personality — Experiment)',
        [
          '- **[CR] Capacity & Role**: Профессиональная экспертиза и роль высшего уровня.',
          '- **[I] Insight**: Глубокий контекст проблемы, скрытые нюансы и вводные данные.',
          '- **[S] Statement**: Главное целевое поручение и ожидаемый результат.',
          '- **[P] Personality**: Стиль, тональность и плотность подачи материала.',
          '- **[E] Experiment**: Генерация нескольких вариантов реализации для выбора лучшего.',
        ],
        [
          '- **[CR] Capacity & Role**: Professional authority, domain specialization, and cognitive caliber.',
          '- **[I] Insight**: Deep situational nuances, background context, and hidden variables.',
          '- **[S] Statement**: Core actionable mandate and explicit output requirements.',
          '- **[P] Personality**: Stylistic tone, analytical density, and communication posture.',
          '- **[E] Experiment**: Iterative variation synthesis exploring multiple candidate angles.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'co-star-framework': {
    id: 'co-star-framework',
    name: 'CoStarFrameworkSkill',
    displayName: 'CO-STAR Framework (Context-Objective-Style-Tone-Audience-Response)',
    categoryId: 'frameworks',
    description: 'Gold-standard communication & briefing architecture for executive memos, PRDs, and client briefs.',
    tags: ['frameworks', 'co-star', 'context', 'objective', 'style', 'tone', 'audience', 'response'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Фреймворк CO-STAR (Context — Objective — Style — Tone — Audience — Response)',
        'CO-STAR Architecture (Context — Objective — Style — Tone — Audience — Response)',
        [
          '- **[C] Context**: Фоновые данные, текущая ситуация и предпосылки.',
          '- **[O] Objective**: Ключевая цель, которую должен решить документ.',
          '- **[S] Style**: Стиль изложения (инженерный, консалтинговый, академический).',
          '- **[T] Tone**: Тональность (уверенная, прагматичная, доказательная).',
          '- **[A] Audience**: Целевая аудитория и ее уровень погружения.',
          '- **[R] Response**: Точный формат и структура итогового ответа.',
        ],
        [
          '- **[C] Context**: Background reality, industry dynamics, and prerequisites.',
          '- **[O] Objective**: Explicit business and technical mission to achieve.',
          '- **[S] Style**: Writing style (Principal Engineer, Strategy Consultant, Academic).',
          '- **[T] Tone**: Communicative tone (Authoritative, Pragmatic, Rigorous).',
          '- **[A] Audience**: Target stakeholder cognitive profile and technical fluency.',
          '- **[R] Response**: Exact deliverable structure, syntax, and schema bounds.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'ape-framework': {
    id: 'ape-framework',
    name: 'ApeFrameworkSkill',
    displayName: 'APE Rapid Framework (Action-Purpose-Expectation)',
    categoryId: 'frameworks',
    description: 'High-velocity 3-element directive framework: clear Action verb, unambiguous Purpose, exact Expectation bounds.',
    tags: ['frameworks', 'ape', 'action', 'purpose', 'expectation', 'rapid'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Фреймворк APE (Action — Purpose — Expectation)',
        'APE Framework (Action — Purpose — Expectation)',
        [
          '- **[A] Action**: Конкретное глагольное действие, которое необходимо выполнить.',
          '- **[P] Purpose**: Глубинная цель и польза, ради которой выполняется действие.',
          '- **[E] Expectation**: Жесткие ожидания по качеству, глубине и отсутствию ошибок.',
        ],
        [
          '- **[A] Action**: Precision operational action verb and execution scope.',
          '- **[P] Purpose**: Underlying business or technical objective driving the request.',
          '- **[E] Expectation**: Strict quality bars, accuracy thresholds, and zero-defect bounds.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'pedagogical-learning-suite': {
    id: 'pedagogical-learning-suite',
    name: 'PedagogicalLearningSuite',
    displayName: 'Pedagogical Mastery & Tutoring Suite',
    categoryId: 'frameworks',
    description: 'Socratic tutoring suite: concept deconstruction, isomorphic analogies, interactive scaffolding, and diagnostic quizzes.',
    tags: ['frameworks', 'composite', 'education', 'socratic', 'tutoring', 'pedagogy'],
    subSkills: ['role-calibration', 'socratic-questioning', 'concept-analogy-engine', 'diagnostic-quiz-generator', 'hierarchical-report'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Комплексный Педагогический Фреймворк Обучения',
        'Pedagogical Mastery & Conceptual Tutoring Architecture',
        [
          '- **1. Деконструкция концепта**: Простое и глубокое объяснение базовой сути явления без заумного академического жаргона.',
          '- **2. Наглядная аналогия**: Перенос сложной концепции на интуитивно понятную модель из реального мира.',
          '- **3. Пошаговый разбор (Scaffolding)**: Постепенное усложнение материала от фундаментальных основ к продвинутым нюансам.',
          '- **4. Диагностический квиз**: 3 контрольных вопроса с подвохом для проверки глубокого понимания принципов.',
        ],
        [
          '- **1. Core Concept Deconstruction**: Crystal-clear conceptual explanation stripping away obfuscated academic jargon.',
          '- **2. Real-World Isomorphic Analogy**: Grounding abstract principles in intuitive physical or mechanical analogies.',
          '- **3. Step-by-Step Scaffolding**: Structured cognitive progression from fundamentals to advanced edge cases.',
          '- **4. Diagnostic Mastery Quiz**: 3 challenging self-assessment questions probing deep conceptual comprehension.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'security-threat-model-suite': {
    id: 'security-threat-model-suite',
    name: 'SecurityThreatModelSuite',
    displayName: 'STRIDE Security & Threat Modeling Suite',
    categoryId: 'frameworks',
    description: 'Zero-trust security audit: STRIDE threat enumeration, attack vector modeling, CVSS scoring, and mitigation controls.',
    tags: ['frameworks', 'composite', 'security', 'stride', 'threat-model', 'zero-trust', 'audit'],
    subSkills: ['role-calibration', 'constraint-injection', 'fmea-risk-matrix', 'code-execution-sandbox-safety'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Комплексный Фреймворк Моделирования Угроз STRIDE',
        'STRIDE Threat Modeling & Zero-Trust Defense Suite',
        [
          '- **1. Декомпозиция системы и границы доверия**: Определение Data Flow Diagrams (DFD) и точек пересечения границ доверия.',
          '- **2. Анализ по модели STRIDE**: Оценка векторов (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege).',
          '- **3. Оценка уязвимостей (CVSS v3.1)**: Расчет критичности угроз и приоритизация векторов атак.',
          '- **4. Архитектурные меры защиты**: Разработка мер защиты по принципам Zero-Trust, mTLS, RBAC/ABAC и шифрования at-rest/in-transit.',
        ],
        [
          '- **1. Data Flow & Trust Boundaries**: DFD mapping identifying data flows across network trust boundaries.',
          '- **2. STRIDE Threat Vector Audit**: Systematic evaluation across Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation of Privilege.',
          '- **3. CVSS v3.1 Scoring & Prioritization**: Quantitative vulnerability scoring and exploitability ranking.',
          '- **4. Zero-Trust Defense Controls**: Engineering defensive countermeasures (mTLS, RBAC, least privilege, envelope encryption).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'system-design-rfc-suite': {
    id: 'system-design-rfc-suite',
    name: 'SystemDesignRfcSuite',
    displayName: 'System Design RFC & ADR Architecture',
    categoryId: 'frameworks',
    description: 'Production System Architecture RFC: Requirements, API design, data storage schemas, scaling bottlenecks, and ADR log.',
    tags: ['frameworks', 'composite', 'system-design', 'rfc', 'adr', 'architecture', 'scalability'],
    subSkills: ['role-calibration', 'tradeoff-hierarchy', 'structural-dependency-audit', 'hierarchical-report'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Фреймворк Архитектурного Проектирования (System Design RFC / ADR)',
        'Production System Design RFC & Architecture Decision Record (ADR)',
        [
          '- **1. Функциональные и нефункциональные требования**: QPS, задержки P99, доступность (99.99%), консистентность (CAP-теорема).',
          '- **2. Высокоуровневая архитектура и API**: Диаграмма компонентов, контракты REST/gRPC эндпоинтов, шина событий.',
          '- **3. Слой данных и схема хранения**: Выбор реляционных/NoSQL БД, партиционирование, шардинг и стратегия кэширования.',
          '- **4. ADR (Architectural Decision Records)**: Фиксация ключевых компромиссов с обоснованием отклоненных альтернатив.',
        ],
        [
          '- **1. Requirements & SLIs/SLOs**: Target QPS, P99 latency bounds, availability targets (99.99%), and CAP theorem trade-offs.',
          '- **2. High-Level Topology & API Contracts**: Microservice mesh, gRPC/REST endpoints, async event bus topology.',
          '- **3. Data Tier & Persistence Topology**: Relational/NoSQL selection, sharding strategy, write-through caching, replication.',
          '- **4. Architecture Decision Records (ADR)**: Explicit rationale for chosen paths vs. rejected alternative technologies.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'rfp-proposal-generator': {
    id: 'rfp-proposal-generator',
    name: 'RfpProposalGeneratorSkill',
    displayName: 'Enterprise RFP & Commercial Bid Architecture',
    categoryId: 'frameworks',
    description: 'Structured proposal engineering: Executive summary, technical solution, compliance matrix, SLA commitments, and pricing tiers.',
    tags: ['frameworks', 'composite', 'rfp', 'proposal', 'enterprise', 'sales', 'bidding'],
    subSkills: ['role-calibration', 'co-star-framework', 'hierarchical-report', 'executive-markdown-table'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Фреймворк Коммерческих Предложений и Тендеров (Enterprise RFP)',
        'Enterprise RFP Response & Commercial Bid Architecture',
        [
          '- **1. Executive Summary**: Убедительное резюме предложения с акцентом на бизнес-результат и возврат инвестиций (ROI).',
          '- **2. Техническое решение и архитектура**: Подробное описание внедрения с учетом требований заказчика.',
          '- **3. Матрица соответствия требованиям (Compliance Matrix)**: Попунктное подтверждение выполнения всех условий ТЗ (Compliant / Exceeds).',
          '- **4. График реализации и SLA**: Этапы внедрения, гарантийные обязательства и финансовая модель.',
        ],
        [
          '- **1. Executive Summary**: High-impact executive narrative emphasizing client ROI, risk mitigation, and strategic alignment.',
          '- **2. Technical Solution Architecture**: Exhaustive implementation breakdown addressing all technical specifications.',
          '- **3. Requirements Compliance Matrix**: Item-by-item verification ledger (Full Compliance / Exceeds Requirement).',
          '- **4. Phased Delivery & SLA Commitments**: Project governance, SLA tiering, milestone schedule, and transparent commercial pricing.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'red-team-exploit-audit': {
    id: 'red-team-exploit-audit',
    name: 'RedTeamExploitAuditSkill',
    displayName: 'Red Team Penetration & Adversarial Exploit Audit',
    categoryId: 'frameworks',
    description: 'Adversarial attack surface mapping: recon, exploit chain simulation, privilege escalation analysis, and defensive patching.',
    tags: ['frameworks', 'composite', 'security', 'red-team', 'exploit', 'penetration', 'audit'],
    subSkills: ['role-calibration', 'adversarial-red-teaming', 'code-execution-sandbox-safety', 'fmea-risk-matrix'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Фреймворк Аудита Безопасности Red Team (Adversarial Exploit)',
        'Red Team Penetration & Adversarial Exploit Audit Architecture',
        [
          '- **1. Картирование поверхности атаки (Attack Surface)**: Инвентаризация внешних эндпоинтов, портов, открытых API и зависимостей.',
          '- **2. Моделирование цепочки эксплуатации (Kill Chain)**: Описание сценария проникновения от начального вектора до компрометации ядра.',
          '- **3. Анализ эскалации привилегий**: Выявление возможностей горизонтального и вертикального повышения прав доступа.',
          '- **4. Инженерный план патчинга**: Конкретные конфигурации файрволов, патчи кода и правила WAF для блокировки эксплойта.',
        ],
        [
          '- **1. Attack Surface Reconnaissance**: Enumeration of public endpoints, open ports, exposed APIs, and supply chain dependencies.',
          '- **2. Cyber Kill Chain Simulation**: Modeling exploit progression from initial vector to root system compromise.',
          '- **3. Privilege Escalation Vector Analysis**: Isolation of horizontal and vertical permission bypass mechanics.',
          '- **4. Defensive Remediation Manifest**: Concrete code patches, firewall rules, and WAF signatures neutralizing the vulnerability.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'rtf-role-task-format': {
    id: 'rtf-role-task-format',
    name: 'RtfRoleTaskFormatFramework',
    displayName: 'RTF (Role, Task, Format) Execution Framework',
    categoryId: 'frameworks',
    description: 'Foundational prompt engineering architecture establishing precise persona calibration, operational task, and strict format envelope.',
    tags: ['frameworks', 'composite', 'rtf', 'role', 'task', 'format', 'standard'],
    subSkills: ['role-calibration', 'task-decomposition', 'json-schema-strict'],
    transform: createStandardSkillTransform(
      'protocol',
      'Фреймворк RTF (Role, Task, Format Architecture)',
      'RTF (Role, Task, Format) Execution Protocol',
      [
        '- **1. Роль (Role)**: Точная экспертная калибровка с указанием специализации, стажа и границ ответственности.',
        '- **2. Задача (Task)**: Детальное описание директивы с явным перечислением входных данных, бизнес-контекста и критериев готовности (DoD).',
        '- **3. Формат (Format)**: Жесткая спецификация структуры вывода (заголовки, поля JSON/Markdown, ограничения по объему).',
      ],
      [
        '- **1. Calibrated Role**: High-authority persona definition establishing domain seniority and mandate boundaries.',
        '- **2. Operational Task**: Precise directive statement detailing input parameters, operational context, and Definition of Done.',
        '- **3. Inviolable Format**: Strict output envelope governing Markdown headers, JSON schemas, and structural boundaries.',
      ]
    ),
  },

  'create-clarity-framework': {
    id: 'create-clarity-framework',
    name: 'CreateClarityFramework',
    displayName: 'CREATE Clarity & Nuance Architecture',
    categoryId: 'frameworks',
    description: 'Enterprise framework: Character, Request, Examples, Adjustments, Type, Extras for high-precision deliverables.',
    tags: ['frameworks', 'composite', 'create', 'prompt-design', 'enterprise', 'clarity'],
    subSkills: ['role-calibration', 'few-shot-generator', 'executive-brevity-craft'],
    transform: createStandardSkillTransform(
      'protocol',
      'Комплексный Фреймворк CREATE (Character, Request, Examples)',
      'CREATE Enterprise Clarity & Nuance Architecture',
      [
        '- **C - Character**: Профессиональная роль и мировоззрение эксперта.',
        '- **R - Request**: Конкретный запрос с декомпозицией шагов.',
        '- **E - Examples**: Эталонные примеры желаемого уровня качества.',
        '- **A - Adjustments**: Негативные ограничения и правила калибровки тона.',
        '- **T - Type**: Тип и синтаксис конечного артефакта.',
        '- **E - Extras**: Дополнительные сценарии расширения и граничные условия.',
      ],
      [
        '- **C - Character**: Elite domain persona calibration and operational tone.',
        '- **R - Request**: Explicit directive broken down into deterministic atomic actions.',
        '- **E - Examples**: Reference gold exemplars setting quality benchmarks.',
        '- **A - Adjustments**: Negative constraints, guardrails, and voice tuning.',
        '- **T - Type**: Artifact topology, encoding syntax, and validation schema.',
        '- **E - Extras**: Edge conditions, follow-up extensions, and contingency branches.',
      ]
    ),
  },

  'ape-action-purpose-expectation': {
    id: 'ape-action-purpose-expectation',
    name: 'ApeActionPurposeExpectationFramework',
    displayName: 'APE (Action, Purpose, Expectation) Framework',
    categoryId: 'frameworks',
    description: 'Outcome-driven framework: specific Action, strategic Purpose, and measurable Expectation metrics.',
    tags: ['frameworks', 'composite', 'ape', 'action', 'purpose', 'expectation', 'strategy'],
    subSkills: ['role-calibration', 'task-decomposition', 'clarity-ambiguity-scanner'],
    transform: createStandardSkillTransform(
      'protocol',
      'Фреймворк APE (Action, Purpose, Expectation)',
      'APE (Action, Purpose, Expectation) Outcome Framework',
      [
        '- **Action**: Какое именно действие должно быть выполнено без абстрактных формулировок.',
        '- **Purpose**: Стратегическая цель и бизнес-смысл: какую проблему мы решаем и для кого.',
        '- **Expectation**: Измеримые критерии приемки, формат артефакта и количественные KPI успеха.',
      ],
      [
        '- **Action**: Concrete operational intervention without hand-waving abstractions.',
        '- **Purpose**: Strategic intent, target user persona, and foundational problem statement.',
        '- **Expectation**: Quantifiable acceptance criteria, performance bounds, and output specification.',
      ]
    ),
  },

  'trace-task-request-action-context-example': {
    id: 'trace-task-request-action-context-example',
    name: 'TraceWorkflowFramework',
    displayName: 'TRACE Enterprise Operational Workflow Suite',
    categoryId: 'frameworks',
    description: 'Enterprise workflow standard: Task, Request, Action, Context, and Exemplars for deterministic team execution.',
    tags: ['frameworks', 'composite', 'trace', 'workflow', 'operations', 'enterprise'],
    subSkills: ['role-calibration', 'task-decomposition', 'few-shot-generator'],
    transform: createStandardSkillTransform(
      'protocol',
      'Фреймворк TRACE (Task, Request, Action, Context, Example)',
      'TRACE Enterprise Operational Workflow Protocol',
      [
        '- **1. Task**: Высокоуровневая производственная задача.',
        '- **2. Request**: Точные параметры запроса и целевые стейкхолдеры.',
        '- **3. Action**: Пошаговый алгоритм действий с точками контроля.',
        '- **4. Context**: Архитектурные ограничения, стек технологий и зависимости.',
        '- **5. Example**: Эталонный формат готового артефакта.',
      ],
      [
        '- **1. Task**: Overarching operational and technical mission.',
        '- **2. Request**: Stakeholder specifications and SLA turnaround requirements.',
        '- **3. Action**: Step-by-step procedural action plan with deterministic verification gates.',
        '- **4. Context**: Architectural environment, runtime constraints, and system dependencies.',
        '- **5. Example**: Reference gold deliverable validating artifact topology.',
      ]
    ),
  },

  'tag-task-action-goal': {
    id: 'tag-task-action-goal',
    name: 'TagTaskActionGoalFramework',
    displayName: 'TAG (Task, Action, Goal) High-Velocity Framework',
    categoryId: 'frameworks',
    description: 'High-velocity operational triad: atomic Task definition, decisive Action steps, and overarching Goal alignment.',
    tags: ['frameworks', 'composite', 'tag', 'velocity', 'agile', 'productivity'],
    subSkills: ['task-decomposition', 'executive-brevity-craft'],
    transform: createStandardSkillTransform(
      'protocol',
      'Фреймворк TAG (Task, Action, Goal Velocity Protocol)',
      'TAG (Task, Action, Goal) High-Velocity Framework',
      [
        '- **Task**: Четкое определение границ задачи.',
        '- **Action**: Список конкретных, незамедлительных шагов.',
        '- **Goal**: Финальное состояние системы и ценность для конечного пользователя.',
      ],
      [
        '- **Task**: Crisp boundary definition of the immediate operational scope.',
        '- **Action**: Concrete immediate execution steps stripped of procedural delay.',
        '- **Goal**: Verified end-state system condition and measurable user value.',
      ]
    ),
  },

  'zero-trust-security-review-framework': {
    id: 'zero-trust-security-review-framework',
    name: 'ZeroTrustSecurityReviewFramework',
    displayName: 'Zero-Trust Architecture & Threat Modeling Suite',
    categoryId: 'frameworks',
    description: 'End-to-end security architecture: STRIDE threat model, identity boundary verification, mTLS encryption, and audit logs.',
    tags: ['frameworks', 'composite', 'security', 'zero-trust', 'stride', 'threat-modeling', 'iam'],
    subSkills: ['role-calibration', 'adversarial-red-teaming', 'fmea-risk-matrix'],
    transform: createStandardSkillTransform(
      'protocol',
      'Комплексный Фреймворк Архитектуры Zero-Trust (STRIDE Suite)',
      'Zero-Trust Architecture & STRIDE Threat Modeling Suite',
      [
        '- **1. Моделирование угроз STRIDE**: Детальный разбор векторов: Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege.',
        '- **2. Границы доверия и IAM**: Строгая аутентификация каждого запроса (OAuth2 / mTLS / SPIFFE), принцип наименьших привилегий (PoLP).',
        '- **3. Защита данных**: Шифрование в покое (AES-256) и при передаче (TLS 1.3), изоляция арендаторов в multi-tenant средах.',
        '- **4. Аудиторский след (SIEM)**: Неизменяемые журналы доступа с корреляцией requestId и алертами на аномалии.',
      ],
      [
        '- **1. STRIDE Threat Matrix**: Systematic evaluation of Spoofing, Tampering, Repudiation, Info Disclosure, DoS, and Privilege Elevation.',
        '- **2. Trust Boundary & IAM**: Continuous cryptographic authentication per request (OAuth2/mTLS/SPIFFE), least-privilege RBAC/ABAC.',
        '- **3. Cryptographic Invariants**: AES-256 encryption at rest, mandatory TLS 1.3 in transit, and cryptographic tenant isolation.',
        '- **4. Telemetry & SIEM Audit**: Immutable audit logging pipelines featuring traceparent correlation and anomaly alerts.',
      ]
    ),
  },

  'gtm-launch-readiness-suite': {
    id: 'gtm-launch-readiness-suite',
    name: 'GtmLaunchReadinessSuite',
    displayName: 'Go-to-Market (GTM) Launch Readiness Suite',
    categoryId: 'frameworks',
    description: 'Comprehensive product commercialization: ICP profile, value messaging, pricing tiers, CAC/LTV unit economics, and launch checklist.',
    tags: ['frameworks', 'composite', 'business', 'gtm', 'product', 'marketing', 'launch'],
    subSkills: ['role-calibration', 'first-principles-reasoning', 'executive-markdown-table'],
    transform: createStandardSkillTransform(
      'protocol',
      'Комплексный Фреймворк Запуска Продукта на Рынок (GTM Suite)',
      'Go-to-Market (GTM) Commercialization & Launch Readiness Suite',
      [
        '- **1. Профиль идеального клиента (ICP)**: Размер компании, стек, боли, триггеры покупки и ЛПР (Buyer Persona).',
        '- **2. Карта ценностного предложения (Value Prop)**: Дифференциаторы, позиционирование против конкурентов и доказательства (Proof Points).',
        '- **3. Модель монетизации**: Тарифная сетка, упаковка фич, метрики юнит-экономики (CAC, LTV, Payback Period).',
        '- **4. Чек-лист готовности к запуску**: Матрица задач по каналам (Product, Sales, Marketing, Support, Legal) с датами T-30, T-0, T+30.',
      ],
      [
        '- **1. Ideal Customer Profile (ICP)**: Firmographics, technology stack, acute pain drivers, and decision-maker psychographics.',
        '- **2. Value Positioning Matrix**: Defensible differentiators against incumbents, category creation thesis, and empirical proof points.',
        '- **3. Monetization & Packaging**: Pricing tiers, packaging fences, and unit economic models (CAC, LTV, Payback horizon).',
        '- **4. Launch Readiness Playbook**: Cross-functional checklist across Product, Sales, Support, and Legal across T-30, T-0, and T+30 milestones.',
      ]
    ),
  },

  'dddd-domain-driven-design-framework': {
    id: 'dddd-domain-driven-design-framework',
    name: 'DdddDomainDrivenDesignFramework',
    displayName: 'Domain-Driven Design (DDD) Enterprise Blueprint',
    categoryId: 'frameworks',
    description: 'Strategic DDD framework: Ubiquitous Language glossary, Bounded Context map, Aggregate Roots, Domain Events, and Anti-Corruption Layer.',
    tags: ['frameworks', 'composite', 'ddd', 'architecture', 'domain-driven', 'microservices'],
    subSkills: ['role-calibration', 'type-safety-contracts', 'mermaid-diagram-suite'],
    transform: createStandardSkillTransform(
      'protocol',
      'Фреймворк Предметно-Ориентированного Проектирования (DDD Suite)',
      'Domain-Driven Design (DDD) Strategic Architecture Suite',
      [
        '- **1. Единый язык (Ubiquitous Language)**: Глоссарий терминов предметной области с запретом технических жаргонизмов базы данных.',
        '- **2. Карта ограниченных контекстов (Context Map)**: Разделение домена на поддомены (Core, Supporting, Generic) и типы связей (Upstream/Downstream, ACL).',
        '- **3. Агрегаты и сущности**: Выделение Aggregate Roots, Entity, Value Object с описанием бизнес-инвариантов.',
        '- **4. Доменные события (Domain Events)**: Список событий в прошедшем времени (`OrderPlaced`, `PaymentFailed`) и их полезная нагрузка.',
      ],
      [
        '- **1. Ubiquitous Language Glossary**: Strict enterprise domain dictionary bridging business domain experts and software engineers.',
        '- **2. Strategic Context Mapping**: Subdomain classification (Core, Supporting, Generic) and relationship topologies (Upstream, Downstream, ACL).',
        '- **3. Aggregates & Invariants**: Boundary definitions for Aggregate Roots, Entities, and immutable Value Objects enforcing transactional invariants.',
        '- **4. Domain Event Choreography**: Event catalog typed in past-tense notation (`OrderPlaced`, `InvoiceSettled`) with schema payloads.',
      ]
    ),
  },

  'data-contract-mesh-framework': {
    id: 'data-contract-mesh-framework',
    name: 'DataContractMeshFramework',
    displayName: 'Data Mesh Contract & Governance Suite',
    categoryId: 'frameworks',
    description: 'Enterprise Data Mesh standard: schema contracts, SLA freshness guarantees, data quality assertions, and lineage documentation.',
    tags: ['frameworks', 'composite', 'data-mesh', 'data-contract', 'governance', 'analytics'],
    subSkills: ['role-calibration', 'json-schema-strict', 'sql-ddl-dml-script'],
    transform: createStandardSkillTransform(
      'protocol',
      'Комплексный Фреймворк Дата-Контрактов (Data Mesh Suite)',
      'Data Mesh Data Contract & Product Governance Suite',
      [
        '- **1. Спецификация контракта**: Полномочия владельца доменного дата-продукта, версия схемы и протокол передачи.',
        '- **2. Гарантии SLA / SLO**: Максимальная задержка поступления данных (freshness), допустимый процент пропусков и uptime.',
        '- **3. Проверки качества данных (Data Quality)**: Тесты Great Expectations / dbt (null-check, unique, referential integrity, range tests).',
        '- **4. Политика изменения схемы**: Правила версионирования (SemVer), аудит обратной совместимости и уведомления потребителей за 30 дней.',
      ],
      [
        '- **1. Data Product Interface**: Domain owner governance, schema versioning, and transport protocol bindings.',
        '- **2. SLO/SLA Commitments**: Freshness latency ceilings, partition arrival schedules, and availability uptime thresholds.',
        '- **3. Quality Test Harness**: Executable assertions (nullity, uniqueness, distribution drift, referential integrity).',
        '- **4. Breaking Change Governance**: Semantic versioning rules, backwards-compatibility regression gates, and 30-day consumer notice policies.',
      ]
    ),
  },

  'api-design-first-governance-suite': {
    id: 'api-design-first-governance-suite',
    name: 'ApiDesignFirstGovernanceSuite',
    displayName: 'API Design-First & OpenAPI Governance Suite',
    categoryId: 'frameworks',
    description: 'Enterprise REST/gRPC API governance: resource hierarchy, status code matrix, idempotency headers, error envelopes, and OpenAPI 3.1 contract.',
    tags: ['frameworks', 'composite', 'api', 'openapi', 'rest', 'governance', 'contracts'],
    subSkills: ['role-calibration', 'openapi-yaml-spec', 'json-schema-strict'],
    transform: createStandardSkillTransform(
      'protocol',
      'Комплексный Фреймворк API Design-First (REST & OpenAPI Suite)',
      'API Design-First & OpenAPI Enterprise Governance Suite',
      [
        '- **1. Иерархия ресурсов и URI**: Существительные во множественном числе, вложенность ресурсов не глубже 2 уровней, пагинация (cursor-based).',
        '- **2. Матрица HTTP-статусов**: Четкое сопоставление исходов (200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500).',
        '- **3. Идемпотентность и безопасность**: Использование заголовка `Idempotency-Key` для мутирующих запросов, rate-limiting заголовки.',
        '- **4. Стандартизированный конверт ошибок**: RFC 7807 Problem Details (`type`, `title`, `status`, `detail`, `instance`, `invalid_params`).',
      ],
      [
        '- **1. Resource Taxonomy & URIs**: Pluralized nouns, maximum 2 nesting levels, and scalable cursor-based pagination.',
        '- **2. Deterministic Status Code Matrix**: Rigorous mapping across 200/201/204, client faults (400, 401, 403, 404, 409, 422, 429), and 500.',
        '- **3. Idempotency & Rate Limiting**: `Idempotency-Key` header enforcement for non-safe verbs and standard rate-limiting telemetry.',
        '- **4. RFC 7807 Problem Details**: Standardized machine-readable error payload (`type`, `title`, `status`, `detail`, `invalid_params`).',
      ]
    ),
  },

  'cost-finops-cloud-optimization-suite': {
    id: 'cost-finops-cloud-optimization-suite',
    name: 'CostFinopsCloudOptimizationSuite',
    displayName: 'Cloud FinOps & Infrastructure Cost Optimization Suite',
    categoryId: 'frameworks',
    description: 'Cloud cost governance: waste identification, rightsizing recommendations, reserved/spot instances, and unit cost allocation.',
    tags: ['frameworks', 'composite', 'finops', 'cloud', 'aws', 'cost-optimization', 'infrastructure'],
    subSkills: ['role-calibration', 'executive-markdown-table', 'fmea-risk-matrix'],
    transform: createStandardSkillTransform(
      'protocol',
      'Фреймворк FinOps и Оптимизации Облачных Затрат',
      'Cloud FinOps & Infrastructure Cost Optimization Suite',
      [
        '- **1. Аудит неэффективных ресурсов**: Выявление простаивающих инстансов, неиспользуемых EBS/дисков, забытых snapshot и NAT Gateway трафика.',
        '- **2. План сайзинга (Rightsizing)**: Конкретные рекомендации по смене семейств машин (напр. переход на Graviton / ARM) с расчетом экономии.',
        '- **3. Стратегия обязательств**: Моделирование Reserved Instances (RI) и Savings Plans для базовой нагрузки + Spot инстансы для batch-задач.',
        '- **4. Распределение затрат (Cost Allocation)**: Политика тегирования ресурсов (`Environment`, `CostCenter`, `Owner`) и KPI unit-экономики.',
      ],
      [
        '- **1. Cloud Waste Triage**: Inventory idle compute instances, unattached block storage, orphaned snapshots, and egress telemetry.',
        '- **2. Rightsizing Playbook**: Workload profiling guiding architecture transitions (e.g. x86 to Graviton ARM) with concrete ROI projections.',
        '- **3. Commitment Optimization**: Blended baseline commitments (Savings Plans / RIs) combined with opportunistic spot fleets for async compute.',
        '- **4. Granular Cost Allocation**: Mandatory tagging governance (`Environment`, `Service`, `CostCenter`) tracking unit cost per transaction.',
      ]
    ),
  },

  'accessibility-wcag-audit-suite': {
    id: 'accessibility-wcag-audit-suite',
    name: 'AccessibilityWcagAuditSuite',
    displayName: 'WCAG 2.2 AA Accessibility & Inclusive Design Suite',
    categoryId: 'frameworks',
    description: 'Comprehensive digital accessibility audit: perceivable contrast, operable keyboard navigation, understandable semantics, and ARIA patterns.',
    tags: ['frameworks', 'composite', 'a11y', 'accessibility', 'wcag', 'frontend', 'inclusive-design'],
    subSkills: ['role-calibration', 'executive-markdown-table', 'code-audit-smells'],
    transform: createStandardSkillTransform(
      'protocol',
      'Комплексный Фреймворк Доступности WCAG 2.2 AA (A11y Suite)',
      'WCAG 2.2 AA Accessibility & Inclusive Design Suite',
      [
        '- **1. Воспринимаемость (Perceivable)**: Контрастность текста ≥ 4.5:1 (для крупного 3:1), текстовые альтернативы `alt` для всех изображений, субтитры.',
        '- **2. Управляемость (Operable)**: 100% функционала доступно с клавиатуры (Tab, Enter, Escape, Arrow), видимый фокус, защита от захвата фокуса (focus trap).',
        '- **3. Понятность (Understandable)**: Язык страницы `lang`, предсказуемая навигация, валидация форм с человеческими ошибками и подсказками.',
        '- **4. Надежность (Robust / ARIA)**: Корректные роли `role`, состояния `aria-expanded`, `aria-live` для динамических обновлений без визуального спама.',
      ],
      [
        '- **1. Perceivable Standards**: Color contrast ratios ≥ 4.5:1 (3:1 for large text), descriptive `alt` attributes, and screen-reader transcriptions.',
        '- **2. Operable Keyboard Navigation**: Full tab index traversal, prominent focus rings, keyboard trap avoidance, and skip-to-content links.',
        '- **3. Understandable Semantics**: Explicit document language attributes, predictable input focus behavior, and inline accessible error recovery.',
        '- **4. Robust ARIA Integration**: Native HTML5 semantics over custom ARIA, verified `aria-expanded/controls` bindings, and polite `aria-live` regions.',
      ]
    ),
  },

  'rfc-consensus-architecture-suite': {
    id: 'rfc-consensus-architecture-suite',
    name: 'RfcConsensusArchitectureSuite',
    displayName: 'RFC Engineering Consensus & Architectural Suite',
    categoryId: 'frameworks',
    description: 'Standard engineering proposal framework: Summary, Motivation, Detailed Design, Trade-offs, Security, and Rollout/Rollback.',
    tags: ['frameworks', 'composite', 'rfc', 'architecture', 'consensus', 'engineering-standards'],
    subSkills: ['role-calibration', 'rfc-standard-document', 'first-principles-reasoning'],
    transform: createStandardSkillTransform(
      'protocol',
      'Комплексный Фреймворк Инженерного Консенсуса RFC (Architecture Suite)',
      'RFC Engineering Consensus & Architectural Proposal Suite',
      [
        '- **1. Мотивация и проблема**: Почему текущее решение не работает, количественные метрики проблемы и цели/не-цели (Non-Goals).',
        '- **2. Детальный дизайн архитектуры**: Схемы взаимодействия, контракты данных, изменения в БД и обработка сбоев.',
        '- **3. Рассмотренные альтернативы**: Минимум 2 отвергнутых альтернативных варианта с подробным объяснением, почему они хуже.',
        '- **4. План развертывания и отката (Canary / Rollback)**: Поэтапный ввод в эксплуатацию (1% -> 10% -> 100%) и триггеры экстренного отката.',
      ],
      [
        '- **1. Strategic Motivation & Non-Goals**: Root systemic bottleneck, quantitative pain metrics, and strict Non-Goals bounding scope.',
        '- **2. Detailed Technical Design**: Component interaction topology, database schema mutations, failure modes, and concurrency models.',
        '- **3. Rejected Alternatives Analysis**: Itemize ≥2 alternative architectures accompanied by technical trade-off justifications for rejection.',
        '- **4. Rollout & Rollback Strategy**: Phased canary deployment milestones (1% -> 10% -> 100%) with automated telemetry rollback tripwires.',
      ]
    ),
  },

  'heuristic-usability-evaluation-suite': {
    id: 'heuristic-usability-evaluation-suite',
    name: 'HeuristicUsabilityEvaluationSuite',
    displayName: 'Jakob Nielsen 10 Heuristics UX Evaluation Suite',
    categoryId: 'frameworks',
    description: 'Systematic UX audit against Nielsen\'s 10 usability heuristics with severity scoring (0-4), user journey maps, and wireframe fixes.',
    tags: ['frameworks', 'composite', 'ux', 'nielsen', 'heuristics', 'usability', 'audit'],
    subSkills: ['role-calibration', 'executive-markdown-table', 'first-principles-reasoning'],
    transform: createStandardSkillTransform(
      'protocol',
      'Комплексный Фреймворк Эвристической UX-Оценки Нильсена (10 Heuristics)',
      'Jakob Nielsen 10 Usability Heuristics Evaluation Suite',
      [
        '- **1. Аудит по 10 эвристикам**: Проверка статуса системы, соответствия реальному миру, свободы пользователя, консистентности, защиты от ошибок.',
        '- **2. Шкала критичности дефектов (Severity 0-4)**: 0 - не проблема, 1 - косметическая, 2 - минорная, 3 - мажорная, 4 - катастрофа юзабилити.',
        '- **3. Контекст пользовательского пути (Journey Step)**: В какой именно момент сценария пользователь сталкивается с барьером.',
        '- **4. Практические рекомендации**: Конкретные изменения UI/UX, копирайта и логики взаимодействия для устранения каждой проблемы.',
      ],
      [
        '- **1. 10 Heuristics Audit**: Systematic audit across visibility of status, match with real world, error prevention, recognition over recall, etc.',
        '- **2. Nielsen Severity Scale (0-4)**: Calibrated defect triage (0 = None, 1 = Cosmetic, 2 = Minor, 3 = Major usability roadblock, 4 = Catastrophic blocker).',
        '- **3. Journey Stage Pinpointing**: Mapping each identified UX friction point to its exact step in the core user flow.',
        '- **4. Tactical Redesign Remedies**: Concrete microcopy, layout, and interaction state modifications resolving each violation.',
      ]
    ),
  },
  "pace-framework": {
    id: "pace-framework",
    name: "PaceFrameworkSkill",
    displayName: "PACE Structural Execution Framework (Purpose / Audience / Context / Execution)",
    categoryId: "frameworks",
    description: "Deploys the PACE framework to structure end-to-end communication and technical deliverables with clarity and purpose.",
    tags: ["frameworks","pace","strategy","execution","communication"],
    transform: createStandardSkillTransform({
      sectionName: "PACE Strategic Execution Framework",
      ruSectionName: "Фреймворк стратегического исполнения PACE (Цель / Аудитория / Контекст / Исполнение)",
      instructions: [
        "Purpose: Define the exact primary mission, business value, and quantitative outcome required.",
        "Audience: Calibrate technical depth, business vocabulary, and expectations to the target decision-makers.",
        "Context: Document relevant environment state, legacy constraints, dependencies, and historical precedents.",
        "Execution: Detail phased milestones, concrete technical directives, and verifiable acceptance criteria."
],
      ruInstructions: [
        "Цель (Purpose): Задайте главную миссию, бизнес-ценность и измеримый результат выполнения задачи.",
        "Аудитория (Audience): Откалибруйте уровень технических деталей и язык под ключевых лиц, принимающих решения.",
        "Контекст (Context): Опишите текущую инфраструктуру, легаси-ограничения, зависимости и предысторию.",
        "Исполнение (Execution): Сформируйте пошаговый план, точные инженерные инструкции и критерии приемки."
],
      semanticType: "process_directive",
      tags: ["frameworks","pace","strategy","execution","communication"],
    }),
  },

  "star-behavioral-interview-framework": {
    id: "star-behavioral-interview-framework",
    name: "StarBehavioralInterviewFrameworkSkill",
    displayName: "STAR Deliverable Architecture (Situation / Task / Action / Result)",
    categoryId: "frameworks",
    description: "Structures case studies, post-mortems, and performance reviews using the rigorous STAR framework with quantified metrics.",
    tags: ["frameworks","star","case-study","post-mortem","storytelling"],
    transform: createStandardSkillTransform({
      sectionName: "STAR Deliverable Framework",
      ruSectionName: "Фреймворк структуры STAR (Ситуация / Задача / Действие / Результат)",
      instructions: [
        "Situation: Provide precise baseline conditions, organizational stakes, and operational friction points.",
        "Task: State the explicit objective, ownership mandate, and quantitative target constraints.",
        "Action: Detail the specific strategic choices, tools deployed, and hurdles overcome with technical precision.",
        "Result: Conclude with verifiable quantitative metrics (e.g. 40% latency reduction) and lasting institutional learnings."
],
      ruInstructions: [
        "Ситуация (Situation): Опишите исходные условия, ставки для бизнеса и возникшие сложности.",
        "Задача (Task): Сформулируйте точную цель, зону ответственности и заданные ограничения.",
        "Действие (Action): Детально раскройте предпринятые инженерные и организационные шаги.",
        "Результат (Result): Зафиксируйте измеримые числовые результаты (снижение задержки на 40%) и выводы."
],
      semanticType: "process_directive",
      tags: ["frameworks","star","case-study","post-mortem","storytelling"],
    }),
  },

  "soar-strategic-framework": {
    id: "soar-strategic-framework",
    name: "SoarStrategicFrameworkSkill",
    displayName: "SOAR Strategic Analysis Framework (Strengths / Opportunities / Aspirations / Results)",
    categoryId: "frameworks",
    description: "Deploys SOAR positive strategic inquiry to align organizational strengths and market opportunities toward ambitious measurable results.",
    tags: ["frameworks","soar","strategy","analysis","growth"],
    transform: createStandardSkillTransform({
      sectionName: "SOAR Strategic Framework",
      ruSectionName: "Фреймворк стратегического анализа SOAR (Силы / Возможности / Стремления / Результаты)",
      instructions: [
        "Strengths: Identify unique competitive advantages, proprietary assets, and core technical competencies.",
        "Opportunities: Map emerging market tailwinds, untapped niches, and partnership synergies.",
        "Aspirations: Articulate inspiring yet grounded long-term strategic vision and market leadership ambitions.",
        "Results: Establish concrete OKRs and KPI metrics that define unambiguous success."
],
      ruInstructions: [
        "Силы (Strengths): Выделите ключевые конкурентные преимущества и уникальные технологические компетенции.",
        "Возможности (Opportunities): Определите растущие рыночные тренды, свободные ниши и партнерские синергии.",
        "Стремления (Aspirations): Сформулируйте амбициозное долгосрочное видение и желаемую позицию на рынке.",
        "Результаты (Results): Установите четкие метрики успеха (KPI/OKR), подтверждающие реализацию стратегии."
],
      semanticType: "process_directive",
      tags: ["frameworks","soar","strategy","analysis","growth"],
    }),
  },

  "scamper-innovation-suite": {
    id: "scamper-innovation-suite",
    name: "ScamperInnovationSuiteSkill",
    displayName: "SCAMPER Creative Ideation & Product Evolution Suite",
    categoryId: "frameworks",
    description: "Executes systematic product transformation through SCAMPER: Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse.",
    tags: ["frameworks","scamper","ideation","product-design","innovation"],
    transform: createStandardSkillTransform({
      sectionName: "SCAMPER Product Evolution Framework",
      ruSectionName: "Фреймворк продуктовых инноваций SCAMPER (Замещение / Комбинация / Адаптация / Модификация)",
      instructions: [
        "Substitute: Identify components, materials, or algorithms that can be replaced with superior alternatives.",
        "Combine: Merge adjacent features, data streams, or user workflows into powerful compound capabilities.",
        "Adapt / Modify: Rescale, magnify, or adapt successful patterns from neighboring industries.",
        "Eliminate / Reverse: Remove non-essential friction, strip bloatware, and invert traditional operational sequences."
],
      ruInstructions: [
        "Замещение (Substitute): Определите компоненты и алгоритмы, которые можно заменить более эффективными.",
        "Комбинация (Combine): Объединяйте смежные функции и потоки данных в составные решения.",
        "Адаптация (Adapt/Modify): Масштабируйте и адаптируйте успешные решения из соседних отраслей.",
        "Устранение (Eliminate/Reverse): Избавляйтесь от лишних шагов интерфейса и инвертируйте привычные процессы."
],
      semanticType: "process_directive",
      tags: ["frameworks","scamper","ideation","product-design","innovation"],
    }),
  },

  "okr-cascading-architecture-suite": {
    id: "okr-cascading-architecture-suite",
    name: "OkrCascadingArchitectureSuiteSkill",
    displayName: "OKR Cascading Goal & Key Result Architecture Suite",
    categoryId: "frameworks",
    description: "Aligns corporate strategy into departmental and team OKRs with ambitious qualitative objectives and mathematically verifiable key results.",
    tags: ["frameworks","okr","management","kpi","alignment","strategy"],
    transform: createStandardSkillTransform({
      sectionName: "Cascading OKR Architecture Protocol",
      ruSectionName: "Фреймворк каскадирования целей и ключевых результатов (OKR)",
      instructions: [
        "Objective: Craft inspiring, qualitative, outcome-focused mission statements for the target horizon.",
        "Key Results: Define 3-5 quantitative, measurable metrics with baseline, target, and stretch thresholds.",
        "Vertical & Horizontal Alignment: Trace dependencies between executive goals and engineering team sub-deliverables.",
        "Initiatives: Detail concrete tactical projects and experiments planned to drive each key result."
],
      ruInstructions: [
        "Цель (Objective): Сформулируйте амбициозное, вдохновляющее и качественное целевое состояние.",
        "Ключевые результаты (Key Results): Задайте 3-5 строго измеримых числовых показателей с базовым и целевым значениями.",
        "Каскадирование и связи: Проследите зависимости между стратегическими целями компании и задачами инженерных команд.",
        "Инициативы (Initiatives): Перечислите конкретные проекты и гипотезы, необходимые для достижения результатов."
],
      semanticType: "process_directive",
      tags: ["frameworks","okr","management","kpi","alignment","strategy"],
    }),
  },

  "rice-prioritization-matrix-suite": {
    id: "rice-prioritization-matrix-suite",
    name: "RicePrioritizationMatrixSuiteSkill",
    displayName: "RICE Feature Scoring & Roadmap Prioritization Suite",
    categoryId: "frameworks",
    description: "Evaluates product features rigorously using Reach, Impact, Confidence, and Effort formula: (R * I * C) / E.",
    tags: ["frameworks","rice","prioritization","product-management","scoring"],
    transform: createStandardSkillTransform({
      sectionName: "RICE Feature Prioritization Framework",
      ruSectionName: "Фреймворк приоритизации инициатив RICE (Охват / Влияние / Уверенность / Трудозатраты)",
      instructions: [
        "Reach: Estimate the absolute number of users/customers impacted over a fixed time period.",
        "Impact: Score individual user value on a defined scale (0.25 minimal to 3.0 massive).",
        "Confidence: Quantify certainty in Reach and Impact estimates (50% low, 80% medium, 100% high empirical proof).",
        "Effort: Estimate engineering person-months; calculate RICE score = (R * I * C) / E to rank backlog items."
],
      ruInstructions: [
        "Охват (Reach): Оцените число пользователей или клиентов, затрагиваемых фичей за заданный период.",
        "Влияние (Impact): Оцените эффект для каждого пользователя по стандарту (от 0.25 минимальное до 3.0 колоссальное).",
        "Уверенность (Confidence): Задайте процент уверенности в оценках (50% гипотеза, 80% подтверждено, 100% метрики).",
        "Трудозатраты (Effort): Рассчитайте человеко-месяцы разработки и итоговый балл RICE = (R * I * C) / E."
],
      semanticType: "process_directive",
      tags: ["frameworks","rice","prioritization","product-management","scoring"],
    }),
  },

  "cynefin-complexity-decision-framework": {
    id: "cynefin-complexity-decision-framework",
    name: "CynefinComplexityDecisionFrameworkSkill",
    displayName: "Cynefin Complexity Sensemaking & Decision Framework",
    categoryId: "frameworks",
    description: "Classifies problems into Clear, Complicated, Complex, or Chaotic domains, dictating the appropriate sense-making response pattern.",
    tags: ["frameworks","cynefin","complexity","decision-making","sensemaking"],
    transform: createStandardSkillTransform({
      sectionName: "Cynefin Complexity Decision Protocol",
      ruSectionName: "Фреймворк осмысления сложности Cynefin (Простой / Сложный / Запутанный / Хаотичный)",
      instructions: [
        "Classify the operational context: Clear (Best Practice), Complicated (Good Practice/Expert Analysis), Complex (Emergent/Probe-Sense-Respond), Chaotic (Novel/Act-Sense-Respond).",
        "For Clear domains: Sense -> Categorize -> Respond with established standard operating procedures.",
        "For Complicated domains: Sense -> Analyze -> Respond with expert multi-option trade-off evaluations.",
        "For Complex domains: Probe -> Sense -> Respond through safe-to-fail experiments and feedback loops."
],
      ruInstructions: [
        "Классифицируйте домен ситуации: Простой (Best Practice), Сложный (Экспертный анализ), Запутанный (Эксперименты), Хаотичный (Кризис).",
        "Для простого домена: Определить -> Классифицировать -> Применить регламент и лучшую практику.",
        "Для сложного домена: Определить -> Проанализировать варианты -> Выбрать оптимальное инженерное решение.",
        "Для запутанного домена: Прощупать безопасным экспериментом -> Оценить реакцию -> Развить успех."
],
      semanticType: "process_directive",
      tags: ["frameworks","cynefin","complexity","decision-making","sensemaking"],
    }),
  },

  "minto-pyramid-principle-suite": {
    id: "minto-pyramid-principle-suite",
    name: "MintoPyramidPrincipleSuiteSkill",
    displayName: "Minto Pyramid Top-Down Executive Communication Suite",
    categoryId: "frameworks",
    description: "Structures executive memos, briefs, and recommendations using Barbara Minto Pyramid Principle: Core Conclusion first, supported by grouped MECE arguments.",
    tags: ["frameworks","minto-pyramid","executive-communication","mece","synthesis"],
    transform: createStandardSkillTransform({
      sectionName: "Minto Pyramid Executive Synthesis Framework",
      ruSectionName: "Фреймворк пирамиды Минто (Главный вывод -> MECE аргументы)",
      instructions: [
        "Lead with the single governing thought/answer directly in the opening paragraph.",
        "Group supporting arguments into Mutually Exclusive, Collectively Exhaustive (MECE) pillar themes.",
        "Structure each pillar deductively: Premise -> Conflict -> Evidence -> Consequence.",
        "Enable busy executive readers to grasp 100% of the strategic recommendation within 30 seconds."
],
      ruInstructions: [
        "Начинайте документ с главного вывода и ключевой рекомендации непосредственно в первом абзаце.",
        "Группируйте поддерживающие аргументы по принципу MECE (взаимно исключающие, совместно исчерпывающие).",
        "Выстраивайте каждый блок дедуктивно: Тезис -> Обоснование -> Доказательства -> Последствия.",
        "Обеспечивайте возможность для руководителя понять суть стратегии за первые 30 секунд чтения."
],
      semanticType: "process_directive",
      tags: ["frameworks","minto-pyramid","executive-communication","mece","synthesis"],
    }),
  },

  "wardley-mapping-strategic-suite": {
    id: "wardley-mapping-strategic-suite",
    name: "WardleyMappingStrategicSuiteSkill",
    displayName: "Wardley Value Chain Evolution & Inertia Mapping Suite",
    categoryId: "frameworks",
    description: "Maps organizational value chains against technological evolution stages (Genesis, Custom, Product, Commodity), identifying strategic plays and inertia.",
    tags: ["frameworks","wardley-mapping","strategy","value-chain","evolution"],
    transform: createStandardSkillTransform({
      sectionName: "Wardley Strategic Mapping Protocol",
      ruSectionName: "Фреймворк стратегических карт Вардли (Wardley Mapping: Эволюция и Инерция)",
      instructions: [
        "Value Chain: Anchor the map with user needs at top; trace dependent components downward to foundational infrastructure.",
        "Evolution Axis: Position each component along Genesis -> Custom-Built -> Product/Rental -> Commodity/Utility.",
        "Identify Organizational Inertia: Pinpoint legacy practices resisting migration toward commodity layers.",
        "Determine Strategic Moves: Recommend build vs buy vs outsource plays to optimize capital allocation."
],
      ruInstructions: [
        "Цепочка ценности: Начинайте карту с потребностей пользователя наверху и ведите зависимости вниз к инфраструктуре.",
        "Ось эволюции: Размещайте компоненты по стадиям: Генезис -> Кастомная разработка -> Продукт -> Товар/Утилита.",
        "Выявление инерции: Находите места сопротивления переходу кастомных решений на уровень готовых платформ.",
        "Стратегические маневры: Формируйте рекомендации Build vs Buy для эффективного распределения инженерных ресурсов."
],
      semanticType: "process_directive",
      tags: ["frameworks","wardley-mapping","strategy","value-chain","evolution"],
    }),
  },

  "triz-inventive-problem-solving": {
    id: "triz-inventive-problem-solving",
    name: "TrizInventiveProblemSolvingSkill",
    displayName: "TRIZ Inventive Problem Solving & Contradiction Resolution",
    categoryId: "frameworks",
    description: "Resolves stubborn engineering and business trade-offs using Genrich Altshuller TRIZ Contradiction Matrix and 40 Inventive Principles.",
    tags: ["frameworks","triz","inventive-problem-solving","contradictions","innovation"],
    transform: createStandardSkillTransform({
      sectionName: "TRIZ Contradiction Resolution Protocol",
      ruSectionName: "Фреймворк ТРИЗ (Теория решения изобретательских задач и устранение противоречий)",
      instructions: [
        "Formulate the Physical and Technical Contradictions: State why improving Parameter A degrades Parameter B.",
        "Map contradictions to standard TRIZ engineering parameters (e.g. Weight vs Strength, Speed vs Reliability).",
        "Apply matching inventive principles (e.g., Segmentation, Prior Action, Asymmetry, Inversion, Blessing in Disguise).",
        "Synthesize an ideal final result (IFR) where the trade-off is eliminated rather than compromised."
],
      ruInstructions: [
        "Сформулируйте техническое противоречие: почему улучшение параметра А приводит к недопустимому ухудшению параметра Б.",
        "Сопоставьте задачу с типовыми параметрами ТРИЗ (Скорость против надежности, точность против сложности).",
        "Примените изобретательские принципы (Дробление, Принцип наоборот, Асимметрия, Вынесение, Обращение вреда в пользу).",
        "Сформируйте Идеальный Конечный Результат (ИКР), в котором противоречие полностью устранено без компромиссов."
],
      semanticType: "process_directive",
      tags: ["frameworks","triz","inventive-problem-solving","contradictions","innovation"],
    }),
  },

  "pestle-macro-environmental-suite": {
    id: "pestle-macro-environmental-suite",
    name: "PestleMacroEnvironmentalSuiteSkill",
    displayName: "PESTLE Macro-Environmental Risk & Strategy Suite",
    categoryId: "frameworks",
    description: "Performs comprehensive external environment audits across Political, Economic, Social, Technological, Legal, and Environmental dimensions.",
    tags: ["frameworks","pestle","macro-environment","risk-audit","compliance"],
    transform: createStandardSkillTransform({
      sectionName: "PESTLE Strategic Audit Protocol",
      ruSectionName: "Фреймворк макроэкономического аудита PESTLE (Политика / Экономика / Общество / Технологии)",
      instructions: [
        "Political & Legal: Audit regulatory trends, geopolitical sanctions, IP laws, and data sovereignty mandates.",
        "Economic: Evaluate inflation pressure, foreign exchange exposure, capital availability, and supply chain pricing.",
        "Social & Environmental: Analyze demographic shifts, consumer expectations, ESG standards, and carbon footprints.",
        "Technological: Map disruptive innovations, API ecosystem dependencies, and cybersecurity threat vectors."
],
      ruInstructions: [
        "Политика и Право: Оцените регуляторные тренды, санкционные риски, закон о данных и интеллектуальную собственность.",
        "Экономика: Проанализируйте инфляционные ожидания, курсовые риски, стоимость капитала и цепочки поставок.",
        "Общество и Экология: Учтите демографические сдвиги, ожидания пользователей, требования ESG и углеродный след.",
        "Технологии: Выделите подрывные инновации, платформенные зависимости и векторы киберугроз."
],
      semanticType: "process_directive",
      tags: ["frameworks","pestle","macro-environment","risk-audit","compliance"],
    }),
  },

  "dmaic-six-sigma-process-suite": {
    id: "dmaic-six-sigma-process-suite",
    name: "DmaicSixSigmaProcessSuiteSkill",
    displayName: "DMAIC Six Sigma Operational Excellence Suite",
    categoryId: "frameworks",
    description: "Implements structured process improvement through Define, Measure, Analyze, Improve, and Control phases to eliminate defects and variance.",
    tags: ["frameworks","dmaic","six-sigma","process-improvement","quality"],
    transform: createStandardSkillTransform({
      sectionName: "DMAIC Process Optimization Framework",
      ruSectionName: "Фреймворк операционного совершенства DMAIC (Определение / Измерение / Анализ / Улучшение / Контроль)",
      instructions: [
        "Define: Document problem statement, customer CTQs (Critical to Quality), and project boundary charter.",
        "Measure: Establish baseline defect rates, cycle time metrics, and measurement system repeatability.",
        "Analyze: Conduct root cause analysis using Fishbone diagrams and 5-Whys to identify critical variance drivers.",
        "Improve & Control: Pilot targeted countermeasures and establish statistical process control (SPC) monitoring."
],
      ruInstructions: [
        "Определение (Define): Зафиксируйте суть проблемы, требования клиентов к качеству (CTQ) и границы процесса.",
        "Измерение (Measure): Соберите базовые данные по уровню дефектов, времени цикла и надежности метрик.",
        "Анализ (Analyze): Выявите коренные причины вариативности методом диаграммы Исикавы и 5 Почему.",
        "Улучшение и Контроль (Improve/Control): Протестируйте решения и настройте статистический контроль процессов (SPC)."
],
      semanticType: "process_directive",
      tags: ["frameworks","dmaic","six-sigma","process-improvement","quality"],
    }),
  },

  "jobs-to-be-done-jtbd-suite": {
    id: "jobs-to-be-done-jtbd-suite",
    name: "JobsToBeDoneJtbdSuiteSkill",
    displayName: "Jobs-to-be-Done (JTBD) Customer Motivation Suite",
    categoryId: "frameworks",
    description: "Uncovers core customer motivations using Clayton Christensen JTBD framework: Functional, Emotional, and Social jobs, struggle moments, and switch triggers.",
    tags: ["frameworks","jtbd","product-discovery","customer-research","user-interviews"],
    transform: createStandardSkillTransform({
      sectionName: "Jobs-to-be-Done (JTBD) Framework",
      ruSectionName: "Фреймворк анализа потребностей Jobs-to-be-Done (JTBD)",
      instructions: [
        "Core Job: Frame the functional progress the customer is striving to make in a specific situation.",
        "Emotional & Social Dimensions: Unpack how the user wants to feel and how they wish to be perceived by peers.",
        "Struggle Moments: Identify specific friction in the incumbent solution that triggers active shopping behavior.",
        "Forces of Progress: Map Push of Current Situation, Pull of New Solution, Habit Inertia, and Anxiety of Change."
],
      ruInstructions: [
        "Ключевая работа (Core Job): Определите, какой прогресс пытается совершить пользователь в конкретной ситуации.",
        "Эмоциональное и социальное измерение: Опишите, как клиент хочет себя чувствовать и кем казаться окружающим.",
        "Моменты борьбы (Struggle): Выделите точки болезненного трения в текущем решении, побуждающие к поиску альтернатив.",
        "Четыре силы прогресса: Проанализируйте выталкивание старого, притяжение нового, страх перемен и силу привычки."
],
      semanticType: "process_directive",
      tags: ["frameworks","jtbd","product-discovery","customer-research","user-interviews"],
    }),
  },

  "blue-ocean-four-actions-framework": {
    id: "blue-ocean-four-actions-framework",
    name: "BlueOceanStrategyCanvasSkill",
    displayName: "Blue Ocean Strategy & Four Actions Framework Suite",
    categoryId: "frameworks",
    description: "Breaks out of red ocean cutthroat competition using W. Chan Kim Four Actions Framework: Eliminate, Reduce, Raise, Create.",
    tags: ["frameworks","blue-ocean","strategy-canvas","value-innovation","market-creation"],
    transform: createStandardSkillTransform({
      sectionName: "Blue Ocean Strategy Framework",
      ruSectionName: "Фреймворк стратегии голубого океана (Исключить / Снизить / Повысить / Создать)",
      instructions: [
        "Plot Current Strategy Canvas: Map industry standard competing factors along the horizontal axis.",
        "Eliminate: Remove factors that the industry takes for granted but no longer provide competitive value.",
        "Reduce: Cut factors that have been over-designed in head-to-head competition far below standard.",
        "Raise & Create: Elevate critical underserved needs and unlock completely new non-customer value sources."
],
      ruInstructions: [
        "Текущая канва стратегии: Нанесите базовые факторы отраслевой конкуренции по горизонтальной оси.",
        "Исключить (Eliminate): Полностью уберите элементы, привычные рынку, но потерявшие реальную ценность.",
        "Снизить (Reduce): Сократите избыточно усложненные параметры ниже отраслевого стандарта для снижения издержек.",
        "Повысить и Создать (Raise/Create): Поднимите важные для клиента качества и создайте новые источники ценности."
],
      semanticType: "process_directive",
      tags: ["frameworks","blue-ocean","strategy-canvas","value-innovation","market-creation"],
    }),
  },

  "disaster-recovery-dr-bcp-suite": {
    id: "disaster-recovery-dr-bcp-suite",
    name: "DisasterRecoveryDrBcpSuiteSkill",
    displayName: "Business Continuity & Disaster Recovery (BCP/DR) Suite",
    categoryId: "frameworks",
    description: "Architects enterprise disaster recovery plans defining Recovery Point Objective (RPO), Recovery Time Objective (RTO), and multi-region failover protocols.",
    tags: ["frameworks","bcp","disaster-recovery","rpo","rto","resilience"],
    transform: createStandardSkillTransform({
      sectionName: "BCP/DR Disaster Recovery Architecture",
      ruSectionName: "Архитектурный фреймворк непрерывности бизнеса и восстановления при катастрофах (BCP/DR)",
      instructions: [
        "RPO & RTO Definition: Establish strict limits for maximum tolerable data loss (RPO) and system outage duration (RTO).",
        "Failover Strategy: Document automated DNS routing, database multi-region replication, and split-brain defenses.",
        "Backup Verification: Mandate immutable air-gapped snapshots with automated monthly test-restore drills.",
        "Runbook Protocols: Detail emergency communication hierarchy, role delegations, and post-recovery validation checklists."
],
      ruInstructions: [
        "Определение RPO и RTO: Задайте предельно допустимую потерю данных во времени (RPO) и время восстановления (RTO).",
        "Стратегия переключения: Опишите автоматическое переключение DNS, репликацию БД и защиту от Split-Brain.",
        "Проверка резервных копий: Обеспечьте неизменяемые изолированные снапшоты с регулярным тестовым развертыванием.",
        "Аварийные регламенты (Runbooks): Составьте план оповещения команды, распределение ролей и чеклист валидации."
],
      semanticType: "protocol",
      tags: ["frameworks","bcp","disaster-recovery","rpo","rto","resilience"],
    }),
  },

  "devsecops-pipeline-maturity-suite": {
    id: "devsecops-pipeline-maturity-suite",
    name: "DevsecopsPipelineMaturitySuiteSkill",
    displayName: "DevSecOps Shift-Left Security Pipeline Suite",
    categoryId: "frameworks",
    description: "Embeds comprehensive automated security gates into CI/CD pipelines across SAST, DAST, SCA dependency checking, secret scanning, and container signing.",
    tags: ["frameworks","devsecops","ci-cd","sast","dast","shift-left"],
    transform: createStandardSkillTransform({
      sectionName: "DevSecOps Pipeline Governance Framework",
      ruSectionName: "Фреймворк зрелости конвейера DevSecOps (SAST / DAST / SCA / Secrets / Signing)",
      instructions: [
        "Pre-commit & CI: Integrate git-secrets, static code analysis (SAST), and software composition analysis (SCA).",
        "Build Verification: Sign container images with Cosign/Notary; generate standardized CycloneDX/SPDX SBOMs.",
        "Deploy Gates: Enforce automated DAST dynamic vulnerability scans and admission controller policy validation.",
        "Feedback Loop: Route security scan findings directly into developer issue trackers with automated remediation PRs."
],
      ruInstructions: [
        "Pre-commit и CI: Внедрите поиск секретов, статический анализ кода (SAST) и аудит уязвимостей зависимостей (SCA).",
        "Проверка сборки: Подписывайте контейнеры с помощью Cosign/Notary и создавайте спецификации SBOM (CycloneDX).",
        "Гейты развертывания: Настройте динамическое сканирование (DAST) и политики admission controller в Kubernetes.",
        "Обратная связь: Автоматически направляйте тикеты с найденными уязвимостями и предложенными патчами в трекер задач."
],
      semanticType: "process_directive",
      tags: ["frameworks","devsecops","ci-cd","sast","dast","shift-left"],
    }),
  },

  "data-mesh-domain-governance-suite": {
    id: "data-mesh-domain-governance-suite",
    name: "DataMeshDomainGovernanceSuiteSkill",
    displayName: "Data Mesh Decentralized Governance & Data Products Suite",
    categoryId: "frameworks",
    description: "Implements Zhamak Dehghani Data Mesh paradigm: Domain-Oriented Data Ownership, Data as a Product, Self-Serve Data Platform, Federated Computational Governance.",
    tags: ["frameworks","data-mesh","data-governance","architecture","data-products"],
    transform: createStandardSkillTransform({
      sectionName: "Data Mesh Architecture & Governance Protocol",
      ruSectionName: "Архитектурный фреймворк децентрализованного Data Mesh (Данные как продукт)",
      instructions: [
        "Domain Ownership: Transition centralized data lakes to autonomous domain-driven data engineering teams.",
        "Data as a Product: Treat analytical datasets as first-class products with explicit SLAs, SLOs, and semantic contracts.",
        "Self-Serve Platform: Provide domain teams with automated infrastructure for provisioning storage, compute, and discovery.",
        "Federated Governance: Enforce global interoperability standards, access policies, and lineage tracking automatically."
],
      ruInstructions: [
        "Доменное владение: Передайте ответственность за аналитические данные от монолитной команды профильным доменам.",
        "Данные как продукт: Относитесь к датасетам как к продукту с четкими SLA, версионированием и семантическими контрактами.",
        "Платформа самообслуживания: Предоставьте доменным инженерам абстрактные инструменты для развертывания пайплайнов.",
        "Федеративное управление: Автоматизируйте соблюдение глобальных политик безопасности, аудита и каталогизации."
],
      semanticType: "structural_directive",
      tags: ["frameworks","data-mesh","data-governance","architecture","data-products"],
    }),
  },

  "chaos-engineering-game-day-suite": {
    id: "chaos-engineering-game-day-suite",
    name: "ChaosEngineeringGameDaySuiteSkill",
    displayName: "Chaos Engineering & GameDay Experimentation Suite",
    categoryId: "frameworks",
    description: "Designs disciplined resilience experiments using Chaos Engineering principles: Steady-State baseline, Fault Hypothesis, Blast Radius control, Rollback triggers.",
    tags: ["frameworks","chaos-engineering","resilience","gameday","fault-injection"],
    transform: createStandardSkillTransform({
      sectionName: "Chaos Engineering Experimentation Framework",
      ruSectionName: "Фреймворк проведения учений и инъекций сбоев (Chaos Engineering GameDay)",
      instructions: [
        "Steady State Hypothesis: Measure normal system behavior using customer-facing metrics (e.g. successful checkouts/min).",
        "Hypothesis Formulation: Assert that steady state will persist even when a specific critical dependency fails.",
        "Blast Radius Containment: Constrain simulated faults (network partition, node kill) to a minimal canary traffic slice.",
        "Automated Rollback: Configure immediate automated termination of the experiment if business SLOs are breached."
],
      ruInstructions: [
        "Гипотеза стабильного состояния: Зафиксируйте нормальное поведение системы по ключевым бизнес-метрикам.",
        "Формулировка гипотезы: Утверждайте, что стабильность сохранится даже при отказе конкретного критического сервиса.",
        "Ограничение радиуса поражения: Изолируйте сбой (падение узла, задержка сети) в минимальной канареечной зоне.",
        "Автоматический откат: Настройте мгновенную отмену эксперимента при угрозе деградации клиентских SLO."
],
      semanticType: "protocol",
      tags: ["frameworks","chaos-engineering","resilience","gameday","fault-injection"],
    }),
  },

  "regulatory-soc2-type2-audit-suite": {
    id: "regulatory-soc2-type2-audit-suite",
    name: "RegulatorySoc2Type2AuditSuiteSkill",
    displayName: "SOC 2 Type II Compliance & Trust Criteria Suite",
    categoryId: "frameworks",
    description: "Architects technical controls and continuous audit evidence collection across AICPA Trust Services Criteria: Security, Availability, Confidentiality.",
    tags: ["frameworks","soc2","compliance","security-audit","aicpa","controls"],
    transform: createStandardSkillTransform({
      sectionName: "SOC 2 Type II Controls & Evidence Protocol",
      ruSectionName: "Фреймворк соответствия стандарту безопасности SOC 2 Type II",
      instructions: [
        "Trust Services Criteria: Map system architecture across Security, Availability, Processing Integrity, Confidentiality, and Privacy.",
        "Control Design: Specify technical controls (e.g. mandatory MFA, immutable audit logs, encrypted backups).",
        "Continuous Evidence Collection: Automate periodic pulling of compliance evidence (e.g. git PR reviews, AWS CloudTrail audits).",
        "Vendor Risk Management: Formulate formal vendor assessment rubrics for all sub-processors."
],
      ruInstructions: [
        "Критерии доверия AICPA: Сопоставьте архитектуру с требованиями Безопасности, Доступности и Конфиденциальности.",
        "Проектирование контролей: Задайте технические контроли (MFA, неизменяемый аудит, шифрование в покое и при передаче).",
        "Непрерывный сбор доказательств: Автоматизируйте выгрузку логов проверок, код-ревью и настроек безопасности.",
        "Управление рисками вендоров: Сформируйте регламент оценки безопасности сторонних сервисов и субпроцессоров."
],
      semanticType: "compliance_directive",
      tags: ["frameworks","soc2","compliance","security-audit","aicpa","controls"],
    }),
  },

  "cloud-migration-6rs-framework": {
    id: "cloud-migration-6rs-framework",
    name: "CloudMigration6rsFrameworkSkill",
    displayName: "AWS 6Rs Enterprise Cloud Migration Framework",
    categoryId: "frameworks",
    description: "Evaluates and routes application portfolios for cloud migration using the 6Rs: Rehost, Replatform, Repurchase, Refactor, Retire, Retain.",
    tags: ["frameworks","cloud-migration","6rs","aws","infrastructure","portfolio-triage"],
    transform: createStandardSkillTransform({
      sectionName: "AWS 6Rs Cloud Migration Strategy Framework",
      ruSectionName: "Фреймворк миграции приложений в облако (AWS 6Rs: Rehost / Refactor / Replatform)",
      instructions: [
        "Portfolio Discovery: Catalog legacy applications with dependencies, performance SLAs, and business criticality.",
        "Strategy Triage: Assign each workload to Rehost (Lift-and-Shift), Replatform (Managed DBs), Refactor (Cloud-Native), Repurchase (SaaS), Retire, or Retain.",
        "Total Cost of Ownership (TCO): Calculate migration costs versus 3-year projected cloud operating expenditures.",
        "Cutover Runbook: Plan phased migration waves with minimum-downtime database replication and rollback contingency."
],
      ruInstructions: [
        "Инвентаризация портфеля: Составьте карту легаси-приложений с их зависимостями, SLA и критичностью для бизнеса.",
        "Маршрутизация 6Rs: Назначьте стратегию для каждой системы: Rehost, Replatform, Refactor, Repurchase, Retire или Retain.",
        "Оценка TCO: Рассчитайте совокупную стоимость миграции и сравните с прогнозом затрат на облако за 3 года.",
        "План переключения (Cutover): Сформируйте волны миграции с репликацией данных и планом быстрого отката."
],
      semanticType: "process_directive",
      tags: ["frameworks","cloud-migration","6rs","aws","infrastructure","portfolio-triage"],
    }),
  },

  "site-reliability-engineering-slo-suite": {
    id: "site-reliability-engineering-slo-suite",
    name: "SiteReliabilityEngineeringSloSuiteSkill",
    displayName: "SRE Service Level Objectives & Error Budget Suite",
    categoryId: "frameworks",
    description: "Defines quantitative SRE metrics: Service Level Indicators (SLIs), Service Level Objectives (SLOs), and automated Error Budget policy enforcement.",
    tags: ["frameworks","sre","sli","slo","error-budget","observability"],
    transform: createStandardSkillTransform({
      sectionName: "SRE SLO & Error Budget Management Framework",
      ruSectionName: "Фреймворк надежности SRE (SLI / SLO / Бюджет ошибок)",
      instructions: [
        "Define User-Centric SLIs: Formulate precise ratios of good events over valid events (e.g. HTTP responses < 200ms).",
        "Target SLOs: Set realistic reliability targets (e.g. 99.9% availability per rolling 30-day window).",
        "Error Budget Policy: Formalize automated rules when error budget is exhausted (freeze feature releases, prioritize stability).",
        "Alerting on Burn Rate: Trigger alerts based on rapid consumption of error budgets rather than noisy point-in-time spikes."
],
      ruInstructions: [
        "Определение SLI: Сформулируйте точные индикаторы качества клиентского опыта (доля успешных ответов быстрее 200 мс).",
        "Целевые SLO: Установите реалистичные цели надежности (например, 99.9% за скользящее 30-дневное окно).",
        "Политика бюджета ошибок: Зафиксируйте правила при исчерпании бюджета (заморозка релизов, фокус на стабильности).",
        "Оповещения по скорости сгорания (Burn Rate): Настройте алерты по темпу расхода бюджета вместо единичных всплесков."
],
      semanticType: "protocol",
      tags: ["frameworks","sre","sli","slo","error-budget","observability"],
    }),
  },

  "customer-journey-mapping-touchpoint-suite": {
    id: "customer-journey-mapping-touchpoint-suite",
    name: "CustomerJourneyMappingTouchpointSuiteSkill",
    displayName: "Omnichannel Customer Journey & Touchpoint Architecture",
    categoryId: "frameworks",
    description: "Maps the end-to-end customer lifecycle: Awareness, Consideration, Purchase, Onboarding, Retention, and Advocacy with emotional highs and pain points.",
    tags: ["frameworks","customer-journey","touchpoints","cx","ux","product-strategy"],
    transform: createStandardSkillTransform({
      sectionName: "Customer Journey Mapping Protocol",
      ruSectionName: "Фреймворк проектирования пути клиента (Customer Journey Mapping)",
      instructions: [
        "Stage Segmentation: Structure lifecycle phases across Awareness, Consideration, Conversion, Onboarding, Retention, and Advocacy.",
        "Touchpoint Audit: Document exact communication channels, devices, and UI screens encountered at each step.",
        "Pain Points & Friction: Highlight user anxieties, drop-off dropouts, and emotional valleys.",
        "High-Impact Interventions: Formulate concrete product and messaging improvements to smooth transitions."
],
      ruInstructions: [
        "Этапы жизненного цикла: Разделите путь на Осведомленность, Выбор, Покупку, Онбординг, Удержание и Лояльность.",
        "Аудит точек контакта: Зафиксируйте каналы коммуникации, экраны и устройства на каждом этапе взаимодействия.",
        "Болевые точки и трение: Выявите причины оттока, эмоциональные спады и места затруднений пользователей.",
        "Точки роста: Сформулируйте конкретные продуктовые и интерфейсные решения для устранения барьеров."
],
      semanticType: "process_directive",
      tags: ["frameworks","customer-journey","touchpoints","cx","ux","product-strategy"],
    }),
  },

  "incident-command-system-ics-framework": {
    id: "incident-command-system-ics-framework",
    name: "IncidentCommandSystemIcsFrameworkSkill",
    displayName: "Incident Command System (ICS) for Critical IT Outages",
    categoryId: "frameworks",
    description: "Adapts FEMA Incident Command System for enterprise SEV-1 software outages: Incident Commander, Operations, Communications, and Scribe roles.",
    tags: ["frameworks","ics","incident-response","outages","operations"],
    transform: createStandardSkillTransform({
      sectionName: "Incident Command System (ICS) Protocol",
      ruSectionName: "Фреймворк командного управления инцидентами (ICS Incident Command)",
      instructions: [
        "Role Specialization: Establish single Incident Commander (IC), Operations Lead (troubleshooting), Scribe (timeline log), and Communications Lead.",
        "Strict Triage Discipline: Shield engineering troubleshooters from executive interruptions by channeling status through the Comms Lead.",
        "Periodic Briefing Cadence: Mandate synchronized 15-minute operational updates summarizing hypotheses, actions, and current ETA.",
        "Post-Incident Handoff: Seamlessly transition operational logs into a blameless post-mortem retrospective."
],
      ruInstructions: [
        "Четкие роли: Назначьте Командующего инцидентом (IC), Лидера устранения (Operations), Летописца (Scribe) и Связного (Comms).",
        "Защита инженеров: Изолируйте технических специалистов от внешних вопросов, направляя все запросы через Связного.",
        "Ритм синхронизации: Проводите 15-минутные краткие летучки по статусу, проверяемым гипотезам и расчетному времени решения.",
        "Передача в ретроспективу: Передавайте зафиксированный таймлайн событий для проведения беспристрастного разбора (Post-mortem)."
],
      semanticType: "protocol",
      tags: ["frameworks","ics","incident-response","outages","operations"],
    }),
  },

  "monolith-to-microservices-strangler-suite": {
    id: "monolith-to-microservices-strangler-suite",
    name: "MonolithToMicroservicesStranglerSuiteSkill",
    displayName: "Strangler Fig Monolith Decomposition Suite",
    categoryId: "frameworks",
    description: "Migrates monolithic legacy applications to microservices safely using the Strangler Fig pattern: Seam Identification, API Interception, Dual-Run, Cutover.",
    tags: ["frameworks","strangler-fig","microservices","refactoring","legacy-migration"],
    transform: createStandardSkillTransform({
      sectionName: "Strangler Fig Decomposition Protocol",
      ruSectionName: "Фреймворк миграции монолита (Strangler Fig Pattern)",
      instructions: [
        "Seam Identification: Identify high-cohesion, low-coupling business capabilities suitable for initial extraction.",
        "API Gateway Interception: Route target traffic through a reverse proxy capable of dynamic traffic splitting.",
        "Dual-Run Verification: Shadow write production traffic to both monolith and new microservice, comparing result diffs asynchronously.",
        "Complete Cutover: Switch read traffic 100% to the microservice and deprecate the legacy monolithic code path."
],
      ruInstructions: [
        "Поиск швов (Seams): Выделите автономные бизнес-домены с низкой связностью для первоочередного выноса.",
        "Маршрутизация через API Gateway: Настройте обратный прокси для плавного перенаправления долей трафика.",
        "Теневой запуск (Shadow Run): Дублируйте запросы в монолит и микросервис, сверяя идентичность ответов в фоне.",
        "Окончательное переключение: Переведите 100% чтения на микросервис и безопасно удалите старый код из монолита."
],
      semanticType: "process_directive",
      tags: ["frameworks","strangler-fig","microservices","refactoring","legacy-migration"],
    }),
  },

  "data-lineage-openlineage-governance-suite": {
    id: "data-lineage-openlineage-governance-suite",
    name: "DataLineageOpenlineageGovernanceSuiteSkill",
    displayName: "Data Lineage & Metadata Governance Architecture",
    categoryId: "frameworks",
    description: "Standardizes end-to-end data lineage tracking using OpenLineage standards, detailing Dataset schemas, transformation Jobs, and downstream impact graphs.",
    tags: ["frameworks","data-lineage","openlineage","data-governance","metadata"],
    transform: createStandardSkillTransform({
      sectionName: "Data Lineage & Provenance Governance Framework",
      ruSectionName: "Фреймворк отслеживания происхождения данных (Data Lineage & OpenLineage)",
      instructions: [
        "Dataset Metadata: Record authoritative schema versions, classification tags, and primary ownership teams.",
        "Transformation Lineage: Instrument ETL/ELT pipelines to emit OpenLineage Run events with input/output dataset URIs.",
        "Impact Blast Radius: Trace downstream reporting dashboards and ML models vulnerable to upstream schema mutations.",
        "Automated Quality Checks: Validate data freshness and column nullability before passing data downstream."
],
      ruInstructions: [
        "Метаданные датасетов: Фиксируйте версии схем данных, уровни конфиденциальности и ответственные команды.",
        "Трассировка трансформаций: Инструментируйте ETL-пайплайны для отправки событий OpenLineage с привязкой входов и выходов.",
        "Анализ радиуса влияния: Автоматически стройте граф зависимостей для выявления дашбордов и моделей под угрозой при смене схемы.",
        "Контроль качества: Проверяйте свежесть и полноту данных до их передачи последующим потребителям."
],
      semanticType: "process_directive",
      tags: ["frameworks","data-lineage","openlineage","data-governance","metadata"],
    }),
  },

  "zero-downtime-database-migration-suite": {
    id: "zero-downtime-database-migration-suite",
    name: "ZeroDowntimeDatabaseMigrationSuiteSkill",
    displayName: "Zero-Downtime Expand / Contract Database Migration Suite",
    categoryId: "frameworks",
    description: "Executes non-blocking schema modifications in production relational databases using the Expand and Contract pattern across multiple releases.",
    tags: ["frameworks","database-migration","zero-downtime","expand-contract","postgresql"],
    transform: createStandardSkillTransform({
      sectionName: "Expand & Contract Zero-Downtime Migration Protocol",
      ruSectionName: "Фреймворк миграции БД без простоя (Expand & Contract Pattern)",
      instructions: [
        "Phase 1 (Expand): Add new column/table as nullable or with safe defaults without altering existing application code.",
        "Phase 2 (Dual-Write): Deploy application updates that write simultaneously to both legacy and new structures while reading legacy.",
        "Phase 3 (Backfill): Run asynchronous batched backfill scripts to synchronize historical records into the new schema.",
        "Phase 4 (Contract): Switch application reads to the new structure; deprecate and drop legacy columns safely."
],
      ruInstructions: [
        "Фаза 1 (Расширение): Добавьте новую колонку или таблицу как nullable без изменений в старом коде приложения.",
        "Фаза 2 (Двойная запись): Разверните код, который пишет в оба поля одновременно, но читает по-прежнему из старого.",
        "Фаза 3 (Миграция истории): Выполните фоновый порционный перенос исторических данных в новую структуру.",
        "Фаза 4 (Сужение): Переключите чтение на новую колонку, убедитесь в стабильности и удалите устаревшие поля."
],
      semanticType: "protocol",
      tags: ["frameworks","database-migration","zero-downtime","expand-contract","postgresql"],
    }),
  },

  "lean-canvas-business-model-suite": {
    id: "lean-canvas-business-model-suite",
    name: "LeanCanvasBusinessModelSuiteSkill",
    displayName: "Ash Maurya Lean Canvas Fast Business Modeling Suite",
    categoryId: "frameworks",
    description: "Deconstructs startup ventures onto Ash Maurya 1-page Lean Canvas: Problem, Customer Segments, Unique Value Prop, Solution, Unfair Advantage.",
    tags: ["frameworks","lean-canvas","startup","business-model","entrepreneurship"],
    transform: createStandardSkillTransform({
      sectionName: "Lean Canvas Business Validation Protocol",
      ruSectionName: "Фреймворк экспресс-моделирования бизнеса Lean Canvas",
      instructions: [
        "Problem & Existing Alternatives: Identify top 3 acute pain points and how customers currently cobble together solutions.",
        "Customer Segments & Early Adopters: Profile narrow, highly motivated beachhead early adopters.",
        "Unique Value Proposition: Craft a single clear, compelling message explaining why the product is distinct and worth buying.",
        "Unfair Advantage: Identify defensible moats (e.g. proprietary data, network effects, patents) that cannot be easily copied."
],
      ruInstructions: [
        "Проблема и альтернативы: Выделите 3 главные боли клиентов и существующие костыльные способы их решения.",
        "Сегменты и ранние последователи: Четко очертите узкую аудиторию первых пользователей, готовых платить сразу.",
        "Уникальное ценностное предложение (UVP): Сформулируйте краткий и неотразимый месседж отличия от конкурентов.",
        "Нечестное преимущество (Unfair Advantage): Определите защитный ров продукта, который невозможно скопировать за деньги."
],
      semanticType: "process_directive",
      tags: ["frameworks","lean-canvas","startup","business-model","entrepreneurship"],
    }),
  },

  "kanban-wip-flow-optimization-suite": {
    id: "kanban-wip-flow-optimization-suite",
    name: "KanbanWipFlowOptimizationSuiteSkill",
    displayName: "Kanban Flow & Work-in-Progress (WIP) Optimization Suite",
    categoryId: "frameworks",
    description: "Implements Kanban flow optimization by enforcing strict WIP limits, visualizing bottlenecks, and maximizing throughput velocity.",
    tags: ["frameworks","kanban","wip-limits","flow-metrics","agile"],
    transform: createStandardSkillTransform({
      sectionName: "Kanban WIP Flow Optimization Protocol",
      ruSectionName: "Фреймворк оптимизации потока Kanban и контроля незавершенного производства (WIP)",
      instructions: [
        "Visualize Workflow: Map discrete value-adding states from Backlog to In-Review to Production.",
        "Explicit WIP Limits: Enforce strict WIP limits per column to prevent multitasking and context-switching overhead.",
        "Manage Flow: Measure Cycle Time, Lead Time, and Throughput using Cumulative Flow Diagrams (CFD).",
        "Continuous Improvement: Swarm on blocked items immediately to eliminate systemic bottlenecks."
],
      ruInstructions: [
        "Визуализация потока: Отобразите все реальные этапы создания ценности от идеи до production.",
        "Лимиты незавершенной работы (WIP): Задайте строгие ограничения на число задач в колонке для борьбы с распылением внимания.",
        "Управление потоком: Отслеживайте Lead Time и Cycle Time с помощью кумулятивных диаграмм потока (CFD).",
        "Устранение заторов: Собирайте команду для быстрого решения зависших задач при первых признаках блокировок."
],
      semanticType: "process_directive",
      tags: ["frameworks","kanban","wip-limits","flow-metrics","agile"],
    }),
  },

  "value-stream-mapping-vsm-suite": {
    id: "value-stream-mapping-vsm-suite",
    name: "ValueStreamMappingVsmSuiteSkill",
    displayName: "Value Stream Mapping (VSM) Waste Elimination Suite",
    categoryId: "frameworks",
    description: "Maps entire software or business delivery value streams, identifying Process Time versus Lead Time to eliminate lean waste (Muda).",
    tags: ["frameworks","vsm","lean","value-stream","waste-elimination"],
    transform: createStandardSkillTransform({
      sectionName: "Value Stream Mapping (VSM) Protocol",
      ruSectionName: "Фреймворк картирования потока создания ценности (Value Stream Mapping)",
      instructions: [
        "Process Time (PT) vs Lead Time (LT): Measure active value-adding effort versus passive waiting/queue time.",
        "Identify 7 Wastes of Lean: Expose Unfinished Work, Extra Features, Hand-offs, Delays, Task Switching, and Defects.",
        "Calculate Flow Efficiency: Compute PT / LT ratio to pinpoint major organizational latency drivers.",
        "Future-State Design: Architect streamlined future workflows eliminating non-value-adding approval gates."
],
      ruInstructions: [
        "Время обработки vs Время цикла: Разделяйте активную полезную работу и время пассивного ожидания в очереди.",
        "Семь видов потерь: Выявляйте незавершенную работу, лишний функционал, долгие согласования, баги и переключения.",
        "Расчет эффективности потока: Рассчитывайте отношение полезного времени к общему времени прохождения задачи.",
        "Проектирование целевого состояния: Создавайте оптимизированный процесс без избыточных бюрократических барьеров."
],
      semanticType: "process_directive",
      tags: ["frameworks","vsm","lean","value-stream","waste-elimination"],
    }),
  },

  "feature-flag-progressive-rollout-suite": {
    id: "feature-flag-progressive-rollout-suite",
    name: "FeatureFlagProgressiveRolloutSuiteSkill",
    displayName: "Feature Flag Progressive Canary Delivery Suite",
    categoryId: "frameworks",
    description: "Architects safe continuous feature rollouts: Internal Dogfooding -> Canary 1% -> Ring 10% -> Full General Availability with automated kill-switches.",
    tags: ["frameworks","feature-flags","canary-rollout","progressive-delivery","deployment"],
    transform: createStandardSkillTransform({
      sectionName: "Feature Flag Progressive Rollout Protocol",
      ruSectionName: "Фреймворк прогрессивного развертывания с фиче-тоглами (Canary Rollout)",
      instructions: [
        "Flag Taxonomy: Classify flags into Release, Experimentation, Ops Kill-Switch, and Permission Toggles.",
        "Staged Rollout Rings: Advance deployments: Staff Dogfooding -> 1% Canary -> 10% Early Adopters -> 100% GA.",
        "Automated Health Watchdogs: Tie metric alarms (error rate, crash count) directly to instant automated flag rollback.",
        "Flag Lifecycle Retirement: Schedule technical debt tickets to delete flags and dead code within 30 days of 100% rollout."
],
      ruInstructions: [
        "Классификация флагов: Разделяйте релизные флаги, эксперименты, аварийные выключатели (Kill-Switch) и права доступа.",
        "Кольцевое развертывание: Продвигайте релиз по этапам: Внутренние сотрудники -> 1% канарейка -> 10% -> 100% доступность.",
        "Автоматический откат: Связывайте превышение порогов ошибок напрямую с немедленным выключением флага без деплоя.",
        "Удаление технического долга: Планируйте удаление отработавших флагов и старых веток кода в течение 30 дней после релиза."
],
      semanticType: "protocol",
      tags: ["frameworks","feature-flags","canary-rollout","progressive-delivery","deployment"],
    }),
  },

  "micro-frontend-federation-suite": {
    id: "micro-frontend-federation-suite",
    name: "MicroFrontendFederationSuiteSkill",
    displayName: "Micro-Frontend Module Federation Architecture Suite",
    categoryId: "frameworks",
    description: "Architects decentralized enterprise web applications using Webpack/Vite Module Federation: Host shell, Remote micro-apps, shared singletons.",
    tags: ["frameworks","micro-frontends","module-federation","frontend-architecture","web"],
    transform: createStandardSkillTransform({
      sectionName: "Micro-Frontend Federation Protocol",
      ruSectionName: "Архитектурный фреймворк микрофронтендов (Module Federation)",
      instructions: [
        "Host Shell Architecture: Establish lightweight root shell managing global auth state, routing, and design system tokens.",
        "Remote Micro-Apps: Decouple domain teams into independently deployable remote applications.",
        "Shared Dependency Singletons: Configure React/Vue, state libraries, and CSS runtimes as shared singleton instances to prevent bloat.",
        "Resilient Fallbacks: Implement error boundaries wrapping remote components to prevent a crashed micro-app from breaking the shell."
],
      ruInstructions: [
        "Архитектура Shell: Создайте легкую базовую оболочку, отвечающую за аутентификацию, маршрутизацию и токены дизайна.",
        "Удаленные микроприложения: Разделите продуктовые команды на независимые репозитории и релизные циклы.",
        "Общие синглтоны: Настройте единые разделяемые экземпляры React, стейт-менеджеров и стилей для исключения дублирования.",
        "Отказоустойчивость: Оборачивайте каждый микрофронтенд в Error Boundary, чтобы сбой одного блока не ронял все приложение."
],
      semanticType: "structural_directive",
      tags: ["frameworks","micro-frontends","module-federation","frontend-architecture","web"],
    }),
  },

  "event-driven-cqrs-event-sourcing-suite": {
    id: "event-driven-cqrs-event-sourcing-suite",
    name: "EventDrivenCqrsEventSourcingSuiteSkill",
    displayName: "CQRS & Event Sourcing Architecture Suite",
    categoryId: "frameworks",
    description: "Architects high-throughput event-driven systems separating Command models from Query read projections, recording immutable state transition events.",
    tags: ["frameworks","cqrs","event-sourcing","distributed-systems","event-driven"],
    transform: createStandardSkillTransform({
      sectionName: "CQRS & Event Sourcing Framework",
      ruSectionName: "Архитектурный фреймворк CQRS и Event Sourcing",
      instructions: [
        "Command Side: Validate business invariants through write-only Aggregates; emit immutable domain events upon mutation.",
        "Event Store: Record events in an append-only, cryptographically verifiable ledger as the single source of truth.",
        "Query Read Projections: Project denormalized view models asynchronously tailored to specific user queries.",
        "Eventual Consistency & Replay: Support instant reconstruction of system state by replaying historical events from genesis."
],
      ruInstructions: [
        "Сторона команд (Command): Валидируйте бизнес-правила через агрегаты записи и генерируйте неизменяемые доменные события.",
        "Хранилище событий (Event Store): Сохраняйте события в журнал только для добавления (append-only) как единственный источник правды.",
        "Проекции чтения (Query): Формируйте денормализованные представления данных, оптимизированные под конкретные выборки интерфейса.",
        "Восстановление состояния: Обеспечивайте возможность полной перестройки состояния системы путем воспроизведения истории событий."
],
      semanticType: "structural_directive",
      tags: ["frameworks","cqrs","event-sourcing","distributed-systems","event-driven"],
    }),
  },

  "graphql-schema-stitching-federation-suite": {
    id: "graphql-schema-stitching-federation-suite",
    name: "GraphqlSchemaStitchingFederationSuiteSkill",
    displayName: "Apollo Federation & Distributed GraphQL Supergraph Suite",
    categoryId: "frameworks",
    description: "Federates multiple GraphQL subgraphs into a unified supergraph gateway using Apollo Federation directives (@key, @shareable, @provides).",
    tags: ["frameworks","graphql","apollo-federation","supergraph","api-gateway"],
    transform: createStandardSkillTransform({
      sectionName: "Apollo Federation Distributed Architecture",
      ruSectionName: "Архитектурный фреймворк распределенного GraphQL (Apollo Federation Supergraph)",
      instructions: [
        "Subgraph Entities: Design entity types with explicit `@key(fields: \"id\")` directives for cross-subgraph extension.",
        "Supergraph Gateway: Compose subgraphs into a unified schema schema via Apollo Router / Gateway with query plan optimization.",
        "Contract Boundaries: Prevent tight coupling by sharing only domain identifiers rather than full internal models across services.",
        "Field Latency Monitoring: Instrument field-level tracing to detect slow subgraphs degrading overall supergraph query response times."
],
      ruInstructions: [
        "Сущности подграфов: Размечайте типы директивой `@key(fields: \"id\")` для возможности расширения в других сервисах.",
        "Шлюз суперграфа: Объединяйте подграфы в единую точку входа через Apollo Router с оптимизацией плана выполнения запросов.",
        "Границы контрактов: Исключайте жесткую связность: передавайте между сервисами только ID сущностей, а не внутренние модели.",
        "Мониторинг задержек: Отслеживайте время выборки на уровне отдельных полей для локализации медленных подграфов."
],
      semanticType: "structural_directive",
      tags: ["frameworks","graphql","apollo-federation","supergraph","api-gateway"],
    }),
  },

  "zero-trust-identity-pam-suite": {
    id: "zero-trust-identity-pam-suite",
    name: "ZeroTrustIdentityPamSuiteSkill",
    displayName: "Privileged Access Management (PAM) & Zero-Trust Identity Suite",
    categoryId: "frameworks",
    description: "Enforces Zero-Trust principles for infrastructure access: Just-in-Time (JIT) elevation, ephemeral certificates, and session audit recording.",
    tags: ["frameworks","pam","zero-trust","access-control","identity-security"],
    transform: createStandardSkillTransform({
      sectionName: "Privileged Access Management (PAM) Protocol",
      ruSectionName: "Фреймворк управления привилегированным доступом (PAM & Zero-Trust)",
      instructions: [
        "Just-in-Time (JIT) Elevation: Eliminate standing administrative privileges; grant time-bounded access strictly upon approved ticket.",
        "Short-Lived Ephemeral Certificates: Issue SSH/Kubeconfig credentials that expire automatically within 1 to 4 hours.",
        "Bastion & Proxy Interception: Funnel all production traffic through monitored jump hosts with full session keystroke recording.",
        "Automated Anomaly Revocation: Terminate sessions immediately if behavioral risk scores spike or anomalous commands are entered."
],
      ruInstructions: [
        "Доступ Just-in-Time (JIT): Исключите постоянные права суперпользователя; выдавайте доступ временно под конкретный тикет.",
        "Эфемерные сертификаты: Генерируйте временные ключи SSH и Kubeconfig со сроком действия от 1 до 4 часов.",
        "Контроль сессий: Пропускайте все подключения к production через бастион-серверы с записью сессий и введенных команд.",
        "Аварийный отзыв: Немедленно блокируйте доступ при выявлении подозрительных команд или резком росте скоринга риска."
],
      semanticType: "guardrail_directive",
      tags: ["frameworks","pam","zero-trust","access-control","identity-security"],
    }),
  },

  "product-led-growth-plg-flywheel-suite": {
    id: "product-led-growth-plg-flywheel-suite",
    name: "ProductLedGrowthPlgFlywheelSuiteSkill",
    displayName: "Product-Led Growth (PLG) User Flywheel Suite",
    categoryId: "frameworks",
    description: "Architects self-serve product onboarding and viral expansion loops: Time-to-Value (TTV) minimization, AHA moment triggers, and natural paywalls.",
    tags: ["frameworks","plg","product-led-growth","onboarding","growth-flywheel"],
    transform: createStandardSkillTransform({
      sectionName: "Product-Led Growth (PLG) Flywheel Framework",
      ruSectionName: "Фреймворк вирального продуктового роста (Product-Led Growth Flywheel)",
      instructions: [
        "Time-to-Value (TTV) Minimization: Eliminate upfront credit card requirements and multi-step setup wizards.",
        "AHA Moment Engineering: Guide user attention directly toward experiencing core product magic within the first 3 minutes.",
        "In-Product Viral Loops: Embed natural collaboration touchpoints (e.g. shareable links, team workspaces) into core workflows.",
        "Usage-Based Paywalls: Introduce monetization gates at natural inflection points when product value has been undeniably proven."
],
      ruInstructions: [
        "Минимизация Time-to-Value: Убирайте требование кредитной карты и длинные опросники при регистрации.",
        "Достижение AHA-момента: Направляйте внимание пользователя на получение первого ощутимого результата за первые 3 минуты.",
        "Виральные петли в продукте: Встраивайте естественные поводы для шеринга и приглашения коллег в базовые сценарии.",
        "Оплата по мере роста: Размещайте пейволлы в точках масштабирования, когда ценность продукта уже очевидна пользователю."
],
      semanticType: "process_directive",
      tags: ["frameworks","plg","product-led-growth","onboarding","growth-flywheel"],
    }),
  },

  "ai-governance-eu-ai-act-compliance-suite": {
    id: "ai-governance-eu-ai-act-compliance-suite",
    name: "AiGovernanceEuAiActComplianceSuiteSkill",
    displayName: "EU AI Act Regulatory Compliance & Governance Suite",
    categoryId: "frameworks",
    description: "Classifies AI systems into Unacceptable, High-Risk, or General Purpose AI (GPAI), designing mandatory technical documentation and human oversight controls.",
    tags: ["frameworks","eu-ai-act","ai-governance","regulatory-compliance","risk-management"],
    transform: createStandardSkillTransform({
      sectionName: "EU AI Act Compliance & Governance Protocol",
      ruSectionName: "Фреймворк соответствия европейскому регламенту об ИИ (EU AI Act Compliance)",
      instructions: [
        "Risk Classification: Categorize AI capabilities under Unacceptable (prohibited), High-Risk (critical infra/hiring), or GPAI with systemic risk.",
        "Technical Documentation: Maintain exhaustive records on training data provenance, bias audits, and model evaluation benchmarks.",
        "Human-in-the-Loop Oversight: Architect stop buttons and manual override mechanisms for high-stakes algorithmic decisions.",
        "Post-Market Monitoring: Establish continuous monitoring pipelines to detect emergent bias, hallucinations, and safety incidents."
],
      ruInstructions: [
        "Классификация рисков: Определите категорию системы по регламенту: Недопустимый риск, Высокий риск или GPAI общего назначения.",
        "Техническая документация: Ведите детальные отчеты о происхождении обучающих данных, тестах на предвзятость и метриках качества.",
        "Человеческий контроль: Проектируйте механизмы ручного вмешательства и аварийной остановки для критических решений.",
        "Пострелизный мониторинг: Настройте отслеживание безопасности, деградации моделей и инцидентов в процессе реальной эксплуатации."
],
      semanticType: "compliance_directive",
      tags: ["frameworks","eu-ai-act","ai-governance","regulatory-compliance","risk-management"],
    }),
  },

  "cloud-native-observability-golden-signals-suite": {
    id: "cloud-native-observability-golden-signals-suite",
    name: "CloudNativeObservabilityGoldenSignalsSuiteSkill",
    displayName: "Google SRE Four Golden Signals Observability Suite",
    categoryId: "frameworks",
    description: "Architects production monitoring dashboards and alert thresholds around the 4 Golden Signals: Latency, Traffic, Errors, and Saturation.",
    tags: ["frameworks","golden-signals","observability","monitoring","metrics","sre"],
    transform: createStandardSkillTransform({
      sectionName: "Four Golden Signals Observability Framework",
      ruSectionName: "Фреймворк четырех золотых сигналов мониторинга Google SRE (Golden Signals)",
      instructions: [
        "Latency: Track duration of requests, differentiating between latency of successful requests versus errors.",
        "Traffic: Measure real-time demand on the system (e.g. HTTP requests per second, I/O bandwidth).",
        "Errors: Monitor explicit failure rates (HTTP 5xx responses, protocol errors, uncaught exceptions).",
        "Saturation: Measure capacity utilization on constraining system resources (CPU, Memory, Connection Pools)."
],
      ruInstructions: [
        "Задержка (Latency): Отслеживайте время обработки запросов, разделяя скорость успешных операций и ответов с ошибками.",
        "Трафик (Traffic): Измеряйте текущий объем поступающих запросов (запросов в секунду, сетевой поток, транзакции).",
        "Ошибки (Errors): Мониторьте долю сбоев (коды 5xx, системные исключения, сбои бизнес-логики).",
        "Насыщение (Saturation): Контролируйте уровень утилизации узких мест инфраструктуры (память, CPU, пул соединений к БД)."
],
      semanticType: "protocol",
      tags: ["frameworks","golden-signals","observability","monitoring","metrics","sre"],
    }),
  },

  "enterprise-risk-management-coso-suite": {
    id: "enterprise-risk-management-coso-suite",
    name: "EnterpriseRiskManagementCosoSuiteSkill",
    displayName: "COSO Enterprise Risk Management (ERM) Governance Suite",
    categoryId: "frameworks",
    description: "Implements COSO ERM framework: Governance & Culture, Strategy & Objective-Setting, Performance, Review & Revision, and Information & Reporting.",
    tags: ["frameworks","coso","erm","risk-management","governance","enterprise"],
    transform: createStandardSkillTransform({
      sectionName: "COSO Enterprise Risk Management Protocol",
      ruSectionName: "Фреймворк корпоративного управления рисками COSO ERM",
      instructions: [
        "Governance & Culture: Establish board oversight, define risk appetite statements, and reinforce organizational integrity values.",
        "Strategy & Objective-Setting: Evaluate business strategy risks and articulate risk tolerance bands for strategic initiatives.",
        "Performance Assessment: Identify, prioritize, and score risks based on likelihood, velocity, and financial impact.",
        "Information & Reporting: Implement transparent dashboards communicating risk posture to leadership and external stakeholders."
],
      ruInstructions: [
        "Управление и культура: Зафиксируйте надзорные функции руководства, границы риск-аппетита и принципы корпоративной этики.",
        "Стратегия и цели: Оцените риски выбранной бизнес-стратегии и определите предельно допустимые отклонения показателей.",
        "Оценка эффективности: Выявляйте и ранжируйте риски по вероятности возникновения, скорости развития и финансовому ущербу.",
        "Отчетность и коммуникации: Внедрите прозрачные дашборды для информирования руководства и аудиторов о карте рисков."
],
      semanticType: "process_directive",
      tags: ["frameworks","coso","erm","risk-management","governance","enterprise"],
    }),
  },

  "systematic-literature-review-prisma-suite": {
    id: "systematic-literature-review-prisma-suite",
    name: "SystematicLiteratureReviewPrismaSuiteSkill",
    displayName: "PRISMA Systematic Review & Evidence Synthesis Suite",
    categoryId: "frameworks",
    description: "Structures academic and clinical systematic literature reviews following PRISMA guidelines: Identification, Screening, Eligibility, and Inclusion.",
    tags: ["frameworks","prisma","systematic-review","research","evidence-synthesis"],
    transform: createStandardSkillTransform({
      sectionName: "PRISMA Systematic Literature Review Protocol",
      ruSectionName: "Фреймворк систематического обзора литературы PRISMA",
      instructions: [
        "Identification: Document search strings, queried databases (PubMed, IEEE, arXiv), and initial record counts.",
        "Screening: Deduplicate records and filter titles/abstracts using predefined inclusion/exclusion criteria.",
        "Eligibility: Assess full-text articles for methodological validity, study size, and risk of bias.",
        "Inclusion: Synthesize qualitative findings and quantitative meta-analyses from verified included studies."
],
      ruInstructions: [
        "Идентификация: Зафиксируйте поисковые запросы, перечень баз данных (PubMed, IEEE, arXiv) и общее число найденных статей.",
        "Скрининг: Устраните дубликаты и проведите первичный отбор по заголовкам и аннотациям согласно критериям включения.",
        "Пригодность (Eligibility): Оцените полнотекстовые публикации на методологическую строгость и риск систематических ошибок.",
        "Включение: Проведите качественный синтез выводов и метаанализ отобранных валидных исследований."
],
      semanticType: "process_directive",
      tags: ["frameworks","prisma","systematic-review","research","evidence-synthesis"],
    }),
  },

  "design-thinking-double-diamond-suite": {
    id: "design-thinking-double-diamond-suite",
    name: "DesignThinkingDoubleDiamondSuiteSkill",
    displayName: "Design Thinking Double Diamond Innovation Suite",
    categoryId: "frameworks",
    description: "Drives human-centered product innovation across the British Design Council Double Diamond: Discover (Divergent), Define (Convergent), Develop (Divergent), Deliver (Convergent).",
    tags: ["frameworks","double-diamond","design-thinking","ux-research","innovation"],
    transform: createStandardSkillTransform({
      sectionName: "Double Diamond Innovation Framework",
      ruSectionName: "Фреймворк дизайн-мышления Double Diamond (Двойной алмаз)",
      instructions: [
        "Discover (Divergent): Conduct broad qualitative user research to explore underlying problem spaces without preconceptions.",
        "Define (Convergent): Synthesize user insights into a single actionable Problem Statement (\"How Might We...\").",
        "Develop (Divergent): Brainstorm diverse multi-disciplinary solutions, prototypes, and user flows.",
        "Deliver (Convergent): Test prototypes with target users, iterate on feedback, and engineer the finalized deliverable."
],
      ruInstructions: [
        "Исследование (Discover): Проводите широкие качественные интервью для глубинного понимания проблемы без готовых шаблонов.",
        "Фокусировка (Define): Синтезируйте данные в единую емкую формулировку задачи (\"Как мы можем помочь пользователю...\").",
        "Разработка (Develop): Генерируйте максимальное количество альтернативных концепций, прототипов и вариантов решений.",
        "Реализация (Deliver): Тестируйте прототипы на реальных пользователях, собирайте обратную связь и доводите продукт до релиза."
],
      semanticType: "process_directive",
      tags: ["frameworks","double-diamond","design-thinking","ux-research","innovation"],
    }),
  },
  "framework-cqrs-event-sourcing": {
    id: "framework-cqrs-event-sourcing",
    name: "FrameworkCqrsEventSourcingSkill",
    displayName: "CQRS & Event Sourcing Architecture Blueprint",
    categoryId: "frameworks",
    description: "End-to-end framework decoupling Command state mutations from Query read projections with immutable event streams.",
    tags: ["frameworks","cqrs","event-sourcing","architecture","distributed-systems"],
    transform: createStandardSkillTransform({
      sectionName: "CQRS & Event Sourcing Architectural Blueprint",
      ruSectionName: "Архитектурный фреймворк CQRS и Event Sourcing (Команды, События, Проекции)",
      instructions: [
        "Separate Command Model (handling write invariants) from Query Model (optimized read projections).",
        "Store domain state as an immutable append-only sequence of domain events.",
        "Replay events deterministically to rebuild read-side materializations and audit logs."
],
      ruInstructions: [
        "Разделите модель команд (запись и валидация) и модель запросов (денормализованные витрины чтения).",
        "Храните состояние как неизменяемую последовательность бизнес-событий (Append-Only Event Store).",
        "Используйте воспроизведение событий для построения материализованных представлений."
],
      semanticType: "protocol",
      tags: ["frameworks","cqrs","event-sourcing","architecture","distributed-systems"],
    }),
  },

  "framework-strangler-fig-migration": {
    id: "framework-strangler-fig-migration",
    name: "FrameworkStranglerFigMigrationSkill",
    displayName: "Martin Fowler Strangler Fig Legacy Migration Framework",
    categoryId: "frameworks",
    description: "Sequentially replaces legacy systems by routing micro-capabilities to modern microservices via facade routing.",
    tags: ["frameworks","strangler-fig","legacy-migration","refactoring","microservices"],
    transform: createStandardSkillTransform({
      sectionName: "Martin Fowler Strangler Fig Migration Framework",
      ruSectionName: "Фреймворк миграции устаревших систем Strangler Fig (Мартин Фаулер)",
      instructions: [
        "Deploy an API Gateway/Routing Facade in front of the monolithic legacy application.",
        "Intercept discrete bounded contexts and route traffic to new independent microservices.",
        "Gradually strangle the legacy codebase until the old system can be safely decommissioned."
],
      ruInstructions: [
        "Разверните маршрутизирующий фасад (API Gateway) перед монолитной устаревшей системой.",
        "Постепенно перенаправляйте трафик отдельных сценариев на новые современные микросервисы.",
        "Шаг за шагом выводите из эксплуатации старые компоненты без остановки бизнес-процессов."
],
      semanticType: "protocol",
      tags: ["frameworks","strangler-fig","legacy-migration","refactoring","microservices"],
    }),
  },

  "framework-honeycomb-distributed-observability": {
    id: "framework-honeycomb-distributed-observability",
    name: "FrameworkHoneycombDistributedObservabilitySkill",
    displayName: "High-Cardinality Structured Observability Framework",
    categoryId: "frameworks",
    description: "Implements high-cardinality, wide structured event telemetry (Honeycomb/Charity Majors model) for distributed systems.",
    tags: ["frameworks","observability","honeycomb","telemetry","distributed-systems"],
    transform: createStandardSkillTransform({
      sectionName: "High-Cardinality Wide Event Telemetry Blueprint",
      ruSectionName: "Фреймворк глубокой наблюдаемости и высококардинальных событий (Honeycomb)",
      instructions: [
        "Emit wide structured JSON events containing 50-100 contextual fields per request (User ID, Tenant, Version, Latency).",
        "Enable instant arbitrary-dimensional slicing and correlation analysis across billions of events.",
        "Replace coarse sampling with intelligent tail-sampling on error and latency spikes."
],
      ruInstructions: [
        "Формируйте широкие структурированные JSON-события с десятками контекстных полей (ID пользователя, тенант, версия).",
        "Обеспечьте возможность мгновенной аналитики и поиска аномалий по любым сочетаниям параметров.",
        "Используйте выборочное сэмплирование с сохранением 100% подозрительных и медленных запросов."
],
      semanticType: "protocol",
      tags: ["frameworks","observability","honeycomb","telemetry","distributed-systems"],
    }),
  },

  "framework-gitops-declarative-argocd": {
    id: "framework-gitops-declarative-argocd",
    name: "FrameworkGitopsDeclarativeArgocdSkill",
    displayName: "GitOps Declarative Continuous Delivery Framework (ArgoCD/Flux)",
    categoryId: "frameworks",
    description: "Implements Git as single source of truth with automated reconciliation loops detecting and repairing cluster drift.",
    tags: ["frameworks","gitops","argocd","kubernetes","ci-cd","devops"],
    transform: createStandardSkillTransform({
      sectionName: "GitOps Declarative Delivery & Reconciliation Framework",
      ruSectionName: "Декларативный GitOps-фреймворк непрерывной доставки (ArgoCD / Kubernetes)",
      instructions: [
        "Store 100% of infrastructure, environment configs, and Kubernetes manifests in declarative Git repositories.",
        "Run continuous reconciliation controllers that automatically sync cluster state with Git HEAD.",
        "Enforce immutable audit trails where every production change corresponds to an approved Git commit."
],
      ruInstructions: [
        "Храните все манифесты инфраструктуры и конфигурации в Git-репозиториях.",
        "Используйте контроллеры сверки (ArgoCD), автоматически устраняющие дрейф состояния кластера.",
        "Обеспечьте прозрачный аудит: любые изменения в продакшене происходят только через коммиты в Git."
],
      semanticType: "protocol",
      tags: ["frameworks","gitops","argocd","kubernetes","ci-cd","devops"],
    }),
  },

  "framework-chaos-engineering-netflix-simian": {
    id: "framework-chaos-engineering-netflix-simian",
    name: "FrameworkChaosEngineeringNetflixSimianSkill",
    displayName: "Netflix Chaos Engineering & Resiliency Fault Injection",
    categoryId: "frameworks",
    description: "Injects controlled network latency, node crashes, and packet loss in production to verify systemic resilience.",
    tags: ["frameworks","chaos-engineering","netflix","resilience","fault-injection","sre"],
    transform: createStandardSkillTransform({
      sectionName: "Chaos Engineering & Fault Injection Framework",
      ruSectionName: "Фреймворк хаос-инжиниринга и внедрения сбоев (Netflix Simian Army / SRE)",
      instructions: [
        "Define steady-state normal baseline metrics (e.g. successful transactions per second).",
        "Hypothesize that steady state will continue during controlled faults (e.g. killing 20% of database replicas).",
        "Inject automated chaos perturbations and automatically abort if steady-state metrics drop >5%."
],
      ruInstructions: [
        "Зафиксируйте базовые метрики нормального состояния системы (Steady State).",
        "Сформулируйте гипотезу устойчивости при искусственном отключении узлов или деградации сети.",
        "Внедрите контролируемые сбои с автоматической отменой эксперимента при падении ключевых метрик."
],
      semanticType: "protocol",
      tags: ["frameworks","chaos-engineering","netflix","resilience","fault-injection","sre"],
    }),
  },

  "framework-domain-storytelling-collaborative": {
    id: "framework-domain-storytelling-collaborative",
    name: "FrameworkDomainStorytellingCollaborativeSkill",
    displayName: "Domain Storytelling Visual Knowledge Extraction Framework",
    categoryId: "frameworks",
    description: "Transforms business workflows into visual pictographic stories showing Actors, Work Objects, and Activities.",
    tags: ["frameworks","domain-storytelling","ddd","requirements","modeling"],
    transform: createStandardSkillTransform({
      sectionName: "Domain Storytelling Visual Workflow Blueprint",
      ruSectionName: "Фреймворк Domain Storytelling: визуальное моделирование бизнес-процессов",
      instructions: [
        "Model domain processes with 3 core visual primitives: Actors (Who), Work Objects (What), and Activities (How).",
        "Number chronological interaction steps sequentially from left to right.",
        "Highlight bounded context handoffs and digital-to-manual interface boundaries."
],
      ruInstructions: [
        "Моделируйте процессы через 3 базовых элемента: Акторы (Кто), Объекты (Что), Действия (Как).",
        "Последовательно пронумеруйте хронологические шаги взаимодействия слева направо.",
        "Четко обозначьте границы систем и точки перехода между ручными и автоматическими операциями."
],
      semanticType: "process_directive",
      tags: ["frameworks","domain-storytelling","ddd","requirements","modeling"],
    }),
  },

  "framework-zero-trust-architecture-nist-800-207": {
    id: "framework-zero-trust-architecture-nist-800-207",
    name: "FrameworkZeroTrustArchitectureNist800207Skill",
    displayName: "NIST SP 800-207 Zero-Trust Architecture Framework",
    categoryId: "frameworks",
    description: "Enforces continuous verification across Policy Engine, Policy Administrator, and Policy Enforcement Points.",
    tags: ["frameworks","zero-trust","nist","security-architecture","compliance"],
    transform: createStandardSkillTransform({
      sectionName: "NIST SP 800-207 Zero-Trust Architecture Blueprint",
      ruSectionName: "Архитектурный фреймворк Zero-Trust по стандарту NIST SP 800-207",
      instructions: [
        "Implement Policy Enforcement Points (PEP) gating every discrete resource access.",
        "Evaluate dynamic context signals (device health, geolocation, user behavior) at the Policy Engine (PE).",
        "Grant short-lived, least-privilege cryptographic access tokens per transaction."
],
      ruInstructions: [
        "Разверните точки применения политик (PEP) перед каждым изолированным ресурсом.",
        "Оценивайте динамические сигналы контекста (состояние устройства, IP, поведение) в Policy Engine.",
        "Выдавайте временные токены с минимально необходимыми правами на каждую транзакцию."
],
      semanticType: "protocol",
      tags: ["frameworks","zero-trust","nist","security-architecture","compliance"],
    }),
  },

  "framework-data-mesh-domain-ownership": {
    id: "framework-data-mesh-domain-ownership",
    name: "FrameworkDataMeshDomainOwnershipSkill",
    displayName: "Zhamak Dehghani Data Mesh & Data-as-a-Product Framework",
    categoryId: "frameworks",
    description: "Decentralizes data analytics into autonomous domain teams treating data as a product with self-serve infrastructure.",
    tags: ["frameworks","data-mesh","data-as-a-product","analytics","architecture"],
    transform: createStandardSkillTransform({
      sectionName: "Zhamak Dehghani Data Mesh Architectural Blueprint",
      ruSectionName: "Архитектурный фреймворк Data Mesh: Данные как продукт и федеративное управление",
      instructions: [
        "Organize data around 4 core principles: Domain Ownership, Data as a Product, Self-Serve Platform, Federated Governance.",
        "Package data products with strict schema contracts, lineage metadata, and programmatic SLA guarantees.",
        "Enable federated cross-domain data discovery via decentralized semantic registries."
],
      ruInstructions: [
        "Внедрите 4 принципа: Доменное владение, Данные как продукт, Платформа самообслуживания, Федеративное управление.",
        "Упаковывайте наборы данных в продукты с четкими контрактами схем, метаданными и гарантиями качества.",
        "Обеспечьте удобный поиск и использование данных между командами через федеративный каталог."
],
      semanticType: "protocol",
      tags: ["frameworks","data-mesh","data-as-a-product","analytics","architecture"],
    }),
  },

  "framework-clean-architecture-uncle-bob": {
    id: "framework-clean-architecture-uncle-bob",
    name: "FrameworkCleanArchitectureUncleBobSkill",
    displayName: "Robert C. Martin (Uncle Bob) Clean Architecture Blueprint",
    categoryId: "frameworks",
    description: "Structures applications into concentric circles: Entities -> Use Cases -> Interface Adapters -> Frameworks.",
    tags: ["frameworks","clean-architecture","uncle-bob","solid","software-engineering"],
    transform: createStandardSkillTransform({
      sectionName: "Uncle Bob Clean Architecture & Dependency Rule",
      ruSectionName: "Чистая архитектура Роберта Мартина (Clean Architecture / Dependency Rule)",
      instructions: [
        "Enforce the Dependency Rule: source code dependencies must point strictly inward toward higher-level policies.",
        "Isolate Enterprise Business Rules (Entities) and Application Business Rules (Use Cases) from UI and Database drivers.",
        "Use Interface Adapters and DTOs to cross architectural boundary rings safely."
],
      ruInstructions: [
        "Соблюдайте правило зависимостей: зависимости в коде направлены строго внутрь к ядру бизнес-правил.",
        "Изолируйте сущности и сценарии использования (Use Cases) от деталей веб-фреймворков и баз данных.",
        "Используйте адаптеры интерфейсов и DTO для безопасного пересечения границ архитектурных слоев."
],
      semanticType: "protocol",
      tags: ["frameworks","clean-architecture","uncle-bob","solid","software-engineering"],
    }),
  },

  "framework-event-driven-architecture-eda": {
    id: "framework-event-driven-architecture-eda",
    name: "FrameworkEventDrivenArchitectureEdaSkill",
    displayName: "Asynchronous Event-Driven Architecture (EDA & Choreography)",
    categoryId: "frameworks",
    description: "Coordinates microservices asynchronously via Publish/Subscribe message brokers (Kafka/RabbitMQ) with dead-letter queues.",
    tags: ["frameworks","eda","event-driven","kafka","rabbitmq","async"],
    transform: createStandardSkillTransform({
      sectionName: "Asynchronous Event-Driven Architecture (EDA) Blueprint",
      ruSectionName: "Событийно-ориентированная архитектура (EDA, Pub/Sub, Kafka, DLQ)",
      instructions: [
        "Design loosely coupled event producers and consumers communicating via durable topic partitions.",
        "Implement the Transactional Outbox Pattern to guarantee atomic database write + message publish.",
        "Route unprocessable poison messages to Dead Letter Queues (DLQ) with automated alert triage."
],
      ruInstructions: [
        "Спроектируйте слабосвязанные сервисы, обменивающиеся событиями через отказоустойчивые топики сообщений.",
        "Внедрите паттерн Transactional Outbox для атомарной записи в БД и отправки события.",
        "Настройте очереди недоставленных сообщений (Dead Letter Queue) для изоляции сбойных пакетов."
],
      semanticType: "protocol",
      tags: ["frameworks","eda","event-driven","kafka","rabbitmq","async"],
    }),
  },
  "framework-twelve-factor-app-modern": {
    id: "framework-twelve-factor-app-modern",
    name: "FrameworkTwelveFactorAppModernSkill",
    displayName: "Modern 12-Factor Cloud-Native Architecture Blueprint",
    categoryId: "frameworks",
    description: "Implements the 12-Factor App methodology (Codebase, Config in env, Backing services, Stateless processes, Port binding).",
    tags: ["frameworks","12-factor","cloud-native","devops","microservices"],
    transform: createStandardSkillTransform({
      sectionName: "12-Factor Cloud-Native Architecture Blueprint",
      ruSectionName: "Архитектурный фреймворк 12-Factor App для облачных сервисов",
      instructions: [
        "Strictly separate config from code: store all environment variables in runtime injection environments.",
        "Execute app processes as stateless and share-nothing; persist state exclusively in stateful backing services.",
        "Maximize robustness with fast startup and graceful shutdown on SIGTERM signals."
],
      ruInstructions: [
        "Строго разделяйте конфигурацию и код: передавайте переменные через окружение.",
        "Проектируйте процессы как stateless (без сохранения состояния на диске).",
        "Обеспечьте быстрый запуск и корректное завершение работы по сигналу SIGTERM."
],
      semanticType: "protocol",
      tags: ["frameworks","12-factor","cloud-native","devops","microservices"],
    }),
  },

  "framework-hexagonal-ports-and-adapters": {
    id: "framework-hexagonal-ports-and-adapters",
    name: "FrameworkHexagonalPortsAndAdaptersSkill",
    displayName: "Alistair Cockburn Hexagonal (Ports & Adapters) Architecture",
    categoryId: "frameworks",
    description: "Isolates core business logic inside a hexagon, communicating with drivers and databases via Ports and Adapters.",
    tags: ["frameworks","hexagonal","ports-adapters","architecture","cockburn"],
    transform: createStandardSkillTransform({
      sectionName: "Hexagonal Ports & Adapters Architecture Blueprint",
      ruSectionName: "Гексагональная архитектура (Порты и Адаптеры по Алистеру Кокберну)",
      instructions: [
        "Place pure domain entities and business logic in the central Hexagon.",
        "Define Driver Ports (API, CLI, GUI) and Driven Ports (DB, Messaging, 3rd-party services) as abstract interfaces.",
        "Implement pluggable concrete Adapters outside the hexagon with zero domain leakage."
],
      ruInstructions: [
        "Поместите чистую бизнес-логику в центр гексагона.",
        "Определите входящие и исходящие порты в виде абстрактных интерфейсов.",
        "Реализуйте сменные адаптеры на внешнем периметре без влияния на доменное ядро."
],
      semanticType: "protocol",
      tags: ["frameworks","hexagonal","ports-adapters","architecture","cockburn"],
    }),
  },

  "framework-onion-architecture-jeffrey-palermo": {
    id: "framework-onion-architecture-jeffrey-palermo",
    name: "FrameworkOnionArchitectureJeffreyPalermoSkill",
    displayName: "Jeffrey Palermo Onion Architecture Framework",
    categoryId: "frameworks",
    description: "Structures applications into concentric layers around a domain core with inverted external infrastructure dependencies.",
    tags: ["frameworks","onion-architecture","domain-core","palermo","clean-code"],
    transform: createStandardSkillTransform({
      sectionName: "Jeffrey Palermo Onion Architecture Blueprint",
      ruSectionName: "Луковая архитектура Джеффри Палермо (Onion Architecture)",
      instructions: [
        "Core Layer: Domain Model Entities.",
        "Middle Layer: Domain Services & Repository Interfaces.",
        "Outer Layer: Infrastructure, UI, and Database Adapters.",
        "All code points inward; inner layers know nothing of outer layers."
],
      ruInstructions: [
        "Внутренний слой: Доменные сущности.",
        "Средний слой: Доменные сервисы и интерфейсы репозиториев.",
        "Внешний слой: Инфраструктура, UI и драйверы баз данных.",
        "Все зависимости направлены строго к центру."
],
      semanticType: "protocol",
      tags: ["frameworks","onion-architecture","domain-core","palermo","clean-code"],
    }),
  },

  "framework-serverless-event-pipeline-aws": {
    id: "framework-serverless-event-pipeline-aws",
    name: "FrameworkServerlessEventPipelineAwsSkill",
    displayName: "AWS Serverless Event-Driven Pipeline (Lambda, SQS, EventBridge)",
    categoryId: "frameworks",
    description: "Designs auto-scaling serverless workflows connecting EventBridge routers, SQS queues, and Lambda compute.",
    tags: ["frameworks","serverless","aws","lambda","eventbridge","cloud"],
    transform: createStandardSkillTransform({
      sectionName: "AWS Serverless Event Pipeline Architecture",
      ruSectionName: "Серверлесс-архитектура на базе AWS EventBridge, SQS и Lambda",
      instructions: [
        "Publish events to central EventBridge bus with schema discovery.",
        "Buffer asynchronous consumer workloads through Amazon SQS queues with Dead Letter Queues.",
        "Execute granular Lambda functions with sub-second scaling and minimal IAM permission policies."
],
      ruInstructions: [
        "Публикуйте события в шину AWS EventBridge с валидацией схем.",
        "Буферизуйте нагрузку через очереди SQS с обработкой ошибок в DLQ.",
        "Используйте изолированные Lambda-функции с гранулярными правами IAM."
],
      semanticType: "protocol",
      tags: ["frameworks","serverless","aws","lambda","eventbridge","cloud"],
    }),
  },

  "framework-outbox-pattern-debezium-cdc": {
    id: "framework-outbox-pattern-debezium-cdc",
    name: "FrameworkOutboxPatternDebeziumCdcSkill",
    displayName: "Transactional Outbox Pattern & Debezium CDC Streaming",
    categoryId: "frameworks",
    description: "Solves dual-write problems by writing outbox records to relational tables and streaming them via Debezium CDC.",
    tags: ["frameworks","outbox-pattern","cdc","debezium","kafka","distributed-systems"],
    transform: createStandardSkillTransform({
      sectionName: "Transactional Outbox & CDC Streaming Architecture",
      ruSectionName: "Паттерн Transactional Outbox и сбор изменений данных (Debezium CDC)",
      instructions: [
        "Write domain mutations and corresponding event payloads atomically into the same database transaction.",
        "Use Debezium Change Data Capture (CDC) to tail database transaction logs (WAL) in real-time.",
        "Stream outbox events to Apache Kafka with guaranteed at-least-once delivery."
],
      ruInstructions: [
        "Записывайте изменения бизнес-сущностей и события в таблицу Outbox в единой транзакции БД.",
        "Используйте Debezium для чтения журналов транзакций (WAL) в реальном времени.",
        "Отправляйте события в Apache Kafka с гарантией доставки At-Least-Once."
],
      semanticType: "protocol",
      tags: ["frameworks","outbox-pattern","cdc","debezium","kafka","distributed-systems"],
    }),
  },

  "framework-rag-retrieval-augmented-generation-deep": {
    id: "framework-rag-retrieval-augmented-generation-deep",
    name: "FrameworkRagRetrievalAugmentedGenerationDeepSkill",
    displayName: "Production RAG Architecture (Chunking, Hybrid Search, Reranking)",
    categoryId: "frameworks",
    description: "Designs production RAG pipelines with semantic chunking, BM25+Vector hybrid search, and cross-encoder reranking.",
    tags: ["frameworks","rag","vector-search","reranking","hybrid-search","llm-architecture"],
    transform: createStandardSkillTransform({
      sectionName: "Production RAG Hybrid Search & Reranking Blueprint",
      ruSectionName: "Производственный фреймворк RAG: гибридный поиск, чанкинг и реранкинг",
      instructions: [
        "Apply semantic chunking with overlapping sliding windows to preserve sentence context.",
        "Execute Hybrid Search combining sparse lexical BM25 and dense vector cosine similarity (Reciprocal Rank Fusion).",
        "Pass top-50 candidates through a cross-encoder Reranker to select the top-5 most relevant context chunks."
],
      ruInstructions: [
        "Используйте семантическое разбиение на чанки с перекрытием для сохранения контекста.",
        "Применяйте гибридный поиск: плотные векторные эмбеддинги + разреженный поиск BM25 (RRF).",
        "Выполняйте реранкинг кандидатов через Cross-Encoder перед передачей в промпт."
],
      semanticType: "protocol",
      tags: ["frameworks","rag","vector-search","reranking","hybrid-search","llm-architecture"],
    }),
  },

  "framework-feature-store-feast-mlops": {
    id: "framework-feature-store-feast-mlops",
    name: "FrameworkFeatureStoreFeastMlopsSkill",
    displayName: "MLOps Feature Store Architecture (Feast / Hopsworks)",
    categoryId: "frameworks",
    description: "Standardizes feature engineering with dual offline historical storage (Parquet/Snowflake) and online low-latency serving (Redis).",
    tags: ["frameworks","feature-store","mlops","feast","machine-learning"],
    transform: createStandardSkillTransform({
      sectionName: "MLOps Dual Feature Store Architectural Blueprint",
      ruSectionName: "Архитектура Feature Store для MLOps (Feast, онлайн/офлайн хранилища)",
      instructions: [
        "Define versioned feature definitions as code with standardized data transformations.",
        "Sync features to Offline Store (Parquet/Warehouse) for training and Online Store (Redis) for <10ms inference lookup.",
        "Eliminate train-serve data skew via automated point-in-time correctness joins."
],
      ruInstructions: [
        "Описывайте признаки (Features) как код с контролем версий.",
        "Синхронизируйте данные в офлайн-хранилище для обучения и Redis для онлайн-инференса (<10 мс).",
        "Исключите утечку данных из будущего через корректные временные срезы (Point-in-Time Joins)."
],
      semanticType: "protocol",
      tags: ["frameworks","feature-store","mlops","feast","machine-learning"],
    }),
  },

  "framework-zero-downtime-blue-green-deployment": {
    id: "framework-zero-downtime-blue-green-deployment",
    name: "FrameworkZeroDowntimeBlueGreenDeploymentSkill",
    displayName: "Zero-Downtime Blue/Green Deployment Architecture",
    categoryId: "frameworks",
    description: "Maintains two identical production environments (Blue and Green), switching load balancer traffic instantaneously.",
    tags: ["frameworks","blue-green","zero-downtime","deployment","devops"],
    transform: createStandardSkillTransform({
      sectionName: "Blue/Green Zero-Downtime Deployment Protocol",
      ruSectionName: "Фреймворк развертывания Blue/Green с нулевым временем простоя",
      instructions: [
        "Maintain active production environment (Blue) while deploying and testing new releases on idle environment (Green).",
        "Execute smoke and health tests on Green before initiating traffic cutover.",
        "Switch router/load balancer traffic instantly; keep Blue on standby for 1-hour instant rollback if needed."
],
      ruInstructions: [
        "Поддерживайте две идентичные среды: рабочую (Blue) и развертываемую (Green).",
        "Проводите полное тестирование среды Green до переключения трафика.",
        "Мгновенно переключайте балансировщик нагрузки с сохранением Blue для быстрого отката."
],
      semanticType: "protocol",
      tags: ["frameworks","blue-green","zero-downtime","deployment","devops"],
    }),
  },

  "framework-api-first-governance-stoplight": {
    id: "framework-api-first-governance-stoplight",
    name: "FrameworkApiFirstGovernanceStoplightSkill",
    displayName: "API-First Design & Spectral Linting Governance Framework",
    categoryId: "frameworks",
    description: "Mandates OpenAPI specification design, review, and automated Spectral linting before writing backend code.",
    tags: ["frameworks","api-first","governance","openapi","spectral","developer-experience"],
    transform: createStandardSkillTransform({
      sectionName: "API-First Governance & Spectral Linting Framework",
      ruSectionName: "Фреймворк управления разработкой API-First и автоматический линтинг (Spectral)",
      instructions: [
        "Design OpenAPI 3.1 YAML specifications collaboratively with frontend and consumer teams before backend coding.",
        "Enforce automated Spectral linter rules in CI: standard naming conventions, mandatory auth schemas, error formats.",
        "Generate typed client SDKs and mock servers automatically from validated contracts."
],
      ruInstructions: [
        "Проектируйте спецификацию OpenAPI до написания бэкенд-кода совместно с клиентами API.",
        "Запускайте автоматический линтинг Spectral в CI для проверки стандартов именования и безопасности.",
        "Генерируйте клиентские SDK и мок-серверы автоматически на основе контракта."
],
      semanticType: "protocol",
      tags: ["frameworks","api-first","governance","openapi","spectral","developer-experience"],
    }),
  },

  "framework-micro-frontends-module-federation": {
    id: "framework-micro-frontends-module-federation",
    name: "FrameworkMicroFrontendsModuleFederationSkill",
    displayName: "Webpack 5 Module Federation Micro-Frontend Architecture",
    categoryId: "frameworks",
    description: "Decomposes monolithic web apps into independent micro-apps sharing shared dependencies at runtime via Module Federation.",
    tags: ["frameworks","micro-frontends","module-federation","webpack","react","frontend"],
    transform: createStandardSkillTransform({
      sectionName: "Module Federation Micro-Frontend Architecture",
      ruSectionName: "Архитектура микрофронтендов на базе Webpack Module Federation",
      instructions: [
        "Configure Host shell and independent Remote micro-applications with dynamic container remotes.",
        "Share core runtime singleton libraries (React, React-DOM, UI-Kit) without duplicate bundling.",
        "Implement resilient error boundaries and fallbacks for failed remote micro-frontend loads."
],
      ruInstructions: [
        "Настройте хост-приложение (Shell) и независимые удаленные микрофронтенды (Remotes).",
        "Настройте совместное использование синглтонов (React, UI Kit) без дублирования в бандле.",
        "Используйте Error Boundaries для изоляции сбоев отдельных микрофронтендов."
],
      semanticType: "protocol",
      tags: ["frameworks","micro-frontends","module-federation","webpack","react","frontend"],
    }),
  },
  "framework-branch-by-abstraction-trunk": {
    id: "framework-branch-by-abstraction-trunk",
    name: "FrameworkBranchByAbstractionTrunkSkill",
    displayName: "Paul Hammant Branch by Abstraction Framework",
    categoryId: "frameworks",
    description: "Replaces large long-lived feature branches by introducing an abstraction layer in trunk, swapping implementations incrementally.",
    tags: ["frameworks","branch-by-abstraction","trunk-based-development","continuous-delivery"],
    transform: createStandardSkillTransform({
      sectionName: "Branch by Abstraction & Trunk-Based Delivery Protocol",
      ruSectionName: "Фреймворк Branch by Abstraction и Trunk-Based Development",
      instructions: [
        "Introduce an abstraction layer over the legacy subsystem directly in the main branch (Trunk).",
        "Develop the replacement subsystem behind the abstraction alongside the existing implementation.",
        "Flip the abstraction to call the new implementation, then delete the legacy implementation and abstraction."
],
      ruInstructions: [
        "Создайте слой абстракции над заменяемым модулем прямо в основной ветке (Trunk).",
        "Реализуйте новый модуль параллельно со старым за этим слоем абстракции.",
        "Переключите вызовы на новую реализацию, затем удалите старый код и временный слой абстракции."
],
      semanticType: "protocol",
      tags: ["frameworks","branch-by-abstraction","trunk-based-development","continuous-delivery"],
    }),
  },

  "framework-canary-analysis-kayenta": {
    id: "framework-canary-analysis-kayenta",
    name: "FrameworkCanaryAnalysisKayentaSkill",
    displayName: "Automated Canary Analysis & Statistical Judge (Kayenta / Spinnaker)",
    categoryId: "frameworks",
    description: "Compares baseline vs canary metric distributions (Mann-Whitney U-test) to automate release promotion/rollback.",
    tags: ["frameworks","canary-analysis","kayenta","sre","deployment","statistics"],
    transform: createStandardSkillTransform({
      sectionName: "Automated Canary Analysis (ACA) Protocol",
      ruSectionName: "Автоматический анализ канареечных релизов (Kayenta / Mann-Whitney U-test)",
      instructions: [
        "Deploy Baseline (current release) and Canary (new release) simultaneously under identical live traffic load.",
        "Perform automated statistical hypothesis testing (Mann-Whitney U-test) across latency, error rate, and memory usage.",
        "Calculate an overall Canary Score (0-100); automatically promote if Score >= 90 or roll back if Score < 75."
],
      ruInstructions: [
        "Разверните базовую (Baseline) и канареечную (Canary) версии под одинаковой рабочей нагрузкой.",
        "Проведите статистический тест Манна-Уитни по задержкам, ошибкам и потреблению памяти.",
        "Рассчитайте итоговый балл (Canary Score) и выполните автоматический промоушн или откат."
],
      semanticType: "protocol",
      tags: ["frameworks","canary-analysis","kayenta","sre","deployment","statistics"],
    }),
  },

  "framework-data-vault-enterprise-modeling": {
    id: "framework-data-vault-enterprise-modeling",
    name: "FrameworkDataVaultEnterpriseModelingSkill",
    displayName: "Dan Linstedt Data Vault 2.0 Enterprise Modeling Framework",
    categoryId: "frameworks",
    description: "Structures enterprise data warehouses into immutable Hubs (keys), Links (relationships), and Satellites (attributes).",
    tags: ["frameworks","data-vault","data-warehouse","etl","data-modeling"],
    transform: createStandardSkillTransform({
      sectionName: "Data Vault 2.0 Architecture & Entity Mapping",
      ruSectionName: "Архитектура корпоративного хранилища Data Vault 2.0 (Hubs, Links, Satellites)",
      instructions: [
        "Model core business keys as immutable Hub tables with cryptographic Hash Keys.",
        "Model many-to-many associations as Link tables.",
        "Capture temporal descriptive attributes and audit metadata in append-only Satellite tables."
],
      ruInstructions: [
        "Выделите бизнес-ключи в таблицы Hubs с суррогатными хэш-ключами.",
        "Опишите связи между сущностями в таблицах Links.",
        "Храните исторические атрибуты с контролем версий в таблицах Satellites."
],
      semanticType: "protocol",
      tags: ["frameworks","data-vault","data-warehouse","etl","data-modeling"],
    }),
  },

  "framework-saga-orchestration-temporal-io": {
    id: "framework-saga-orchestration-temporal-io",
    name: "FrameworkSagaOrchestrationTemporalIoSkill",
    displayName: "Temporal.io Durable Execution & Workflow Orchestration Framework",
    categoryId: "frameworks",
    description: "Implements resilient, fault-tolerant distributed workflows that survive server crashes and network partitions seamlessly.",
    tags: ["frameworks","temporal","durable-execution","workflows","distributed-systems"],
    transform: createStandardSkillTransform({
      sectionName: "Temporal.io Durable Execution Workflow Blueprint",
      ruSectionName: "Фреймворк отказоустойчивых рабочих процессов Temporal.io (Durable Workflows)",
      instructions: [
        "Structure workflows as deterministic, re-entrant functions.",
        "Delegate all non-deterministic side-effects (HTTP, DB queries, clock, random) to Temporal Activities.",
        "Configure automated Activity retries with exponential backoff and timeout envelopes."
],
      ruInstructions: [
        "Пишите функции рабочих процессов как детерминированные и идемпотентные.",
        "Выносите все недетерминированные вызовы (сеть, время, БД) в отдельные Activities.",
        "Настройте политики повторов и таймаутов для каждой активности."
],
      semanticType: "protocol",
      tags: ["frameworks","temporal","durable-execution","workflows","distributed-systems"],
    }),
  },

  "framework-service-mesh-istio-envoy": {
    id: "framework-service-mesh-istio-envoy",
    name: "FrameworkServiceMeshIstioEnvoySkill",
    displayName: "Istio & Envoy Cloud-Native Service Mesh Architecture",
    categoryId: "frameworks",
    description: "Manages inter-service communication with mutual TLS (mTLS), traffic shifting, distributed tracing, and rate limiting.",
    tags: ["frameworks","service-mesh","istio","envoy","kubernetes","mtls"],
    transform: createStandardSkillTransform({
      sectionName: "Istio Service Mesh & mTLS Invariants",
      ruSectionName: "Архитектура Service Mesh на базе Istio и Envoy (mTLS, трассировка, трафик)",
      instructions: [
        "Enforce strict mutual TLS (`STRICT` PeerAuthentication) across all pod-to-pod network transit.",
        "Define `VirtualService` and `DestinationRule` objects for weighted canary traffic routing.",
        "Inject Envoy sidecars to capture telemetry and propagate W3C distributed trace headers."
],
      ruInstructions: [
        "Включите обязательное взаимное шифрование mTLS между всеми сервисами кластера.",
        "Настройте объекты `VirtualService` для процентного разделения трафика между версиями.",
        "Используйте сайдкары Envoy для сбора метрик и сквозной передачи заголовков трассировки."
],
      semanticType: "protocol",
      tags: ["frameworks","service-mesh","istio","envoy","kubernetes","mtls"],
    }),
  },

  "framework-event-driven-cqrs-axon": {
    id: "framework-event-driven-cqrs-axon",
    name: "FrameworkEventDrivenCqrsAxonSkill",
    displayName: "Axon Framework Domain-Driven CQRS Architecture",
    categoryId: "frameworks",
    description: "Implements Aggregate roots, Command Handlers, Event Sourcing Handlers, and Query Projections.",
    tags: ["frameworks","axon","cqrs","event-sourcing","ddd","java"],
    transform: createStandardSkillTransform({
      sectionName: "Domain-Driven CQRS & Aggregate Root Blueprint",
      ruSectionName: "Доменно-ориентированный CQRS и агрегаты (Axon Pattern)",
      instructions: [
        "Define clean Aggregate Roots encapsulating business invariants and state mutation rules.",
        "Process commands in dedicated `@CommandHandler` methods, emitting domain events.",
        "Apply state mutations exclusively inside `@EventSourcingHandler` methods."
],
      ruInstructions: [
        "Создайте агрегаты (Aggregates), инкапсулирующие бизнес-инварианты и проверку правил.",
        "Обрабатывайте команды в обработчиках `@CommandHandler`, генерируя события.",
        "Мутируйте внутреннее состояние агрегата исключительно в обработчиках событий."
],
      semanticType: "protocol",
      tags: ["frameworks","axon","cqrs","event-sourcing","ddd","java"],
    }),
  },

  "framework-progressive-web-app-offline-first": {
    id: "framework-progressive-web-app-offline-first",
    name: "FrameworkProgressiveWebAppOfflineFirstSkill",
    displayName: "Offline-First Progressive Web App (PWA) Framework",
    categoryId: "frameworks",
    description: "Builds offline-first web apps with Service Workers (Workbox), CacheStorage, IndexedDB sync, and Web App Manifest.",
    tags: ["frameworks","pwa","service-worker","offline-first","indexeddb","workbox"],
    transform: createStandardSkillTransform({
      sectionName: "Offline-First PWA Architecture & Sync Blueprint",
      ruSectionName: "Архитектурный фреймворк Offline-First PWA (Service Workers, IndexedDB, Workbox)",
      instructions: [
        "Configure Service Worker runtime caching using Workbox: StaleWhileRevalidate for assets, NetworkFirst for APIs.",
        "Store local changes in client-side IndexedDB (Dexie) with background sync queueing.",
        "Deliver 100% full offline read and write capability with seamless background reconnection sync."
],
      ruInstructions: [
        "Настройте Service Worker (Workbox) со стратегиями кэширования StaleWhileRevalidate и NetworkFirst.",
        "Сохраняйте локальные изменения в IndexedDB с очередью фоновой синхронизации.",
        "Обеспечьте полноценную автономную работу приложения без доступа к интернету."
],
      semanticType: "protocol",
      tags: ["frameworks","pwa","service-worker","offline-first","indexeddb","workbox"],
    }),
  },

  "framework-graphql-federation-apollo-subgraphs": {
    id: "framework-graphql-federation-apollo-subgraphs",
    name: "FrameworkGraphqlFederationApolloSubgraphsSkill",
    displayName: "Apollo GraphQL Federation 2.0 Subgraph Architecture",
    categoryId: "frameworks",
    description: "Unifies distributed microservice schemas into a single federated supergraph with `@key` and `@shareable` directives.",
    tags: ["frameworks","graphql-federation","apollo","subgraphs","api-gateway"],
    transform: createStandardSkillTransform({
      sectionName: "Apollo GraphQL Federation 2.0 Supergraph Blueprint",
      ruSectionName: "Архитектура федеративных сабграфов Apollo GraphQL Federation 2.0",
      instructions: [
        "Define entity `@key(fields: \"id\")` directives to enable cross-subgraph entity extension.",
        "Compose multiple domain subgraphs into a unified Supergraph via Apollo Router / Rover CLI.",
        "Resolve entity fields across microservices in parallel query execution plans."
],
      ruInstructions: [
        "Задайте директивы `@key` для расширения сущностей между независимыми сервисами.",
        "Объедините схемы сабграфов в единый суперграф через Apollo Router.",
        "Обеспечьте параллельное разрешение полей сущностей из разных микросервисов."
],
      semanticType: "protocol",
      tags: ["frameworks","graphql-federation","apollo","subgraphs","api-gateway"],
    }),
  },

  "framework-event-driven-microservices-choreography-vs-orchestration": {
    id: "framework-event-driven-microservices-choreography-vs-orchestration",
    name: "FrameworkEventDrivenMicroservicesChoreographyVsOrchestrationSkill",
    displayName: "Event Choreography vs Orchestration Architecture Pattern",
    categoryId: "frameworks",
    description: "Evaluates trade-offs between decentralized event choreography and centralized workflow orchestrators.",
    tags: ["frameworks","choreography","orchestration","microservices","event-driven"],
    transform: createStandardSkillTransform({
      sectionName: "Event Choreography vs Orchestration Trade-Off Matrix",
      ruSectionName: "Матрица выбора: хореография событий vs централизованная оркестрация",
      instructions: [
        "Use Event Choreography for simple, high-throughput notification streams with loose coupling.",
        "Use Workflow Orchestration (Temporal / Camunda) for complex, multi-step business transactions with compensation logic.",
        "Document the chosen trade-off rationale explicitly."
],
      ruInstructions: [
        "Применяйте хореографию для простых слабосвязанных потоков оповещения.",
        "Используйте оркестрацию для сложных многошаговых транзакций с компенсирующими откатами.",
        "Обоснуйте выбор архитектурного стиля под конкретные требования надежности."
],
      semanticType: "protocol",
      tags: ["frameworks","choreography","orchestration","microservices","event-driven"],
    }),
  },

  "framework-continuous-verification-sre-sli-slo": {
    id: "framework-continuous-verification-sre-sli-slo",
    name: "FrameworkContinuousVerificationSreSliSloSkill",
    displayName: "SRE Error Budget & SLI / SLO Governance Framework",
    categoryId: "frameworks",
    description: "Defines Service Level Indicators (SLIs), Service Level Objectives (SLOs), and Error Budget burn-rate policies.",
    tags: ["frameworks","sre","slo","sli","error-budgets","reliability"],
    transform: createStandardSkillTransform({
      sectionName: "SRE SLI/SLO & Error Budget Governance Framework",
      ruSectionName: "Фреймворк управления надежностью SRE: SLI, SLO и бюджеты ошибок (Error Budgets)",
      instructions: [
        "Define quantitative SLIs: `Good Requests / Total Valid Requests` over 30-day rolling window.",
        "Establish target SLOs (e.g. 99.95% availability, p95 latency < 200ms).",
        "Enforce Error Budget burn-rate policies: halt non-critical deployments when 20% of budget is burned in 1 hour."
],
      ruInstructions: [
        "Определите метрики SLI (процент успешных запросов) на скользящем 30-дневном окне.",
        "Зафиксируйте целевые значения SLO (доступность 99.95%, задержка p95 < 200 мс).",
        "Внедрите правила расхода бюджета ошибок: блокировка релизов при резком выгорании бюджета."
],
      semanticType: "protocol",
      tags: ["frameworks","sre","slo","sli","error-budgets","reliability"],
    }),
  },

  "framework-threat-modeling-pasta-risk": {
    id: "framework-threat-modeling-pasta-risk",
    name: "FrameworkThreatModelingPastaRiskSkill",
    displayName: "PASTA (Process for Attack Structure and Simulation) Framework",
    categoryId: "frameworks",
    description: "7-step risk-centric threat modeling framework aligning technical vulnerability analysis with business asset impact.",
    tags: ["frameworks","pasta","threat-modeling","cybersecurity","risk-management"],
    transform: createStandardSkillTransform({
      sectionName: "PASTA Risk-Centric Threat Modeling Framework",
      ruSectionName: "Фреймворк риск-ориентированного моделирования угроз PASTA (7 шагов)",
      instructions: [
        "Stage 1-2: Define business objectives, technical scope, and asset criticality.",
        "Stage 3-5: Decompose application architecture, identify threat vectors, and map vulnerability trees.",
        "Stage 6-7: Simulate attack exploitability and formulate business-aligned countermeasures."
],
      ruInstructions: [
        "Этапы 1–2: Определите бизнес-цели, границы системы и ценность активов.",
        "Этапы 3–5: Декомпозируйте архитектуру, выделите векторы атак и постройте деревья уязвимостей.",
        "Этапы 6–7: Смоделируйте реализацию атак и сформируйте экономически обоснованные контрмеры."
],
      semanticType: "protocol",
      tags: ["frameworks","pasta","threat-modeling","cybersecurity","risk-management"],
    }),
  },

  "framework-observability-dora-metrics-engine": {
    id: "framework-observability-dora-metrics-engine",
    name: "FrameworkObservabilityDoraMetricsEngineSkill",
    displayName: "DORA Four Key Metrics Engineering Framework",
    categoryId: "frameworks",
    description: "Measures DevOps performance: Deployment Frequency, Lead Time for Changes, Change Failure Rate, Time to Restore.",
    tags: ["frameworks","dora-metrics","devops","engineering-management","continuous-delivery"],
    transform: createStandardSkillTransform({
      sectionName: "DORA 4 Key Metrics Engineering Framework",
      ruSectionName: "Фреймворк оценки инженерной эффективности DORA (4 ключевые метрики)",
      instructions: [
        "Track Deployment Frequency (daily vs weekly production deployments).",
        "Measure Lead Time for Changes (commit to production rollout).",
        "Monitor Change Failure Rate (% of releases requiring hotfixes/rollbacks) and Time to Restore Service (MTTR)."
],
      ruInstructions: [
        "Отслеживайте частоту развертываний в продакшен (Deployment Frequency).",
        "Измеряйте время доставки изменений от коммита до релиза (Lead Time for Changes).",
        "Контролируйте процент сбойных релизов (Change Failure Rate) и среднее время восстановления (MTTR)."
],
      semanticType: "protocol",
      tags: ["frameworks","dora-metrics","devops","engineering-management","continuous-delivery"],
    }),
  },

  "framework-secure-software-development-lifecycle-ssdlc": {
    id: "framework-secure-software-development-lifecycle-ssdlc",
    name: "FrameworkSecureSoftwareDevelopmentLifecycleSsdlcSkill",
    displayName: "NIST SSDF & OWASP OpenSAMM Secure SDLC Framework",
    categoryId: "frameworks",
    description: "Integrates automated security checkpoints across all phases of the software development lifecycle.",
    tags: ["frameworks","ssdlc","security","devsecops","opensamm","nist"],
    transform: createStandardSkillTransform({
      sectionName: "Secure SDLC (SSDLC) Governance & Guardrail Framework",
      ruSectionName: "Фреймворк безопасного жизненного цикла разработки ПО (SSDLC / DevSecOps)",
      instructions: [
        "Phase 1 (Design): Automated STRIDE threat modeling and security architecture review.",
        "Phase 2 (Code): Pre-commit SAST scanning, secret detection, and dependency SCA audits.",
        "Phase 3 (Deploy): Container image vulnerability signing (Cosign), DAST scans, and IAM validation."
],
      ruInstructions: [
        "Фаза проектирования: Моделирование угроз STRIDE и ревью архитектуры безопасности.",
        "Фаза разработки: Автоматический статический анализ (SAST), поиск секретов и аудит зависимостей (SCA).",
        "Фаза релиза: Проверка уязвимостей контейнеров, динамическое сканирование (DAST) и подпись образов."
],
      semanticType: "protocol",
      tags: ["frameworks","ssdlc","security","devsecops","opensamm","nist"],
    }),
  },

  "framework-continuous-integration-trunk-based-gates": {
    id: "framework-continuous-integration-trunk-based-gates",
    name: "FrameworkContinuousIntegrationTrunkBasedGatesSkill",
    displayName: "Trunk-Based CI Quality Gate & Fast-Feedback Pipeline",
    categoryId: "frameworks",
    description: "Maintains rapid trunk-based integration with sub-10-minute CI build, lint, and test validation gates.",
    tags: ["frameworks","ci","trunk-based","quality-gates","continuous-integration"],
    transform: createStandardSkillTransform({
      sectionName: "Trunk-Based CI Quality Gate & Fast Feedback Framework",
      ruSectionName: "Фреймворк быстрого CI и строгих гейтов качества (Trunk-Based Development)",
      instructions: [
        "Enforce maximum 10-minute automated CI pipeline execution budget.",
        "Require green status across Lint, TypeScript Compile, Unit Tests, and E2E Smoke Tests before merging PRs.",
        "Reject long-lived feature branches; encourage small daily commits directly into Trunk behind feature flags."
],
      ruInstructions: [
        "Установите жесткий лимит времени выполнения пайплайна CI: не более 10 минут.",
        "Требуйте успешного прохождения линтинга, компиляции типов и тестов до слияния пулл-реквеста.",
        "Используйте короткоживущие ветки и регулярную интеграцию в Trunk под прикрытием фича-флагов."
],
      semanticType: "protocol",
      tags: ["frameworks","ci","trunk-based","quality-gates","continuous-integration"],
    }),
  },

  "framework-enterprise-integration-patterns-camel": {
    id: "framework-enterprise-integration-patterns-camel",
    name: "FrameworkEnterpriseIntegrationPatternsCamelSkill",
    displayName: "Gregor Hohpe Enterprise Integration Patterns (EIP / Apache Camel)",
    categoryId: "frameworks",
    description: "Solves enterprise integration using standard EIP primitives: Content-Based Router, Splitter, Aggregator, Message Filter.",
    tags: ["frameworks","eip","enterprise-integration","camel","messaging"],
    transform: createStandardSkillTransform({
      sectionName: "Enterprise Integration Patterns (EIP) Blueprint",
      ruSectionName: "Шаблоны интеграции корпоративных приложений (EIP Грегора Хопа / Apache Camel)",
      instructions: [
        "Implement Content-Based Routing to dispatch messages based on payload header inspection.",
        "Use Splitter and Aggregator patterns to decompose batch payloads, process in parallel, and recombine results.",
        "Deploy Idempotent Receivers to eliminate duplicate message processing side-effects."
],
      ruInstructions: [
        "Внедрите контентно-зависимую маршрутизацию (Content-Based Router) по заголовкам сообщений.",
        "Используйте паттерны Splitter и Aggregator для параллельной обработки частей составных пакетов.",
        "Применяйте идемпотентные приемники (Idempotent Consumer) для защиты от дублирования сообщений."
],
      semanticType: "protocol",
      tags: ["frameworks","eip","enterprise-integration","camel","messaging"],
    }),
  },
  "framework-event-sourcing-snapshot-compression": {
    id: "framework-event-sourcing-snapshot-compression",
    name: "FrameworkEventSourcingSnapshotCompressionSkill",
    displayName: "Event Store Aggregate Snapshot & Compaction Strategy",
    categoryId: "frameworks",
    description: "Periodically serializes aggregate root snapshots every N events to accelerate rehydration latency.",
    tags: ["frameworks","event-sourcing","snapshots","compaction","performance"],
    transform: createStandardSkillTransform({
      sectionName: "Event Store Snapshot & Compaction Strategy",
      ruSectionName: "Стратегия снапшотов и сжатия истории событий (Event Sourcing)",
      instructions: [
        "Generate an atomic snapshot of the aggregate root state every 100 events.",
        "When loading an aggregate, fetch the latest snapshot and replay only events occurring after the snapshot version.",
        "Achieve sub-5ms aggregate rehydration regardless of total historical event volume."
],
      ruInstructions: [
        "Формируйте снимок состояния (Snapshot) агрегата каждые 100 событий.",
        "При загрузке агрегата читайте последний снимок и воспроизводите только последующие события.",
        "Обеспечьте восстановление состояния менее чем за 5 мс независимо от глубины истории."
],
      semanticType: "protocol",
      tags: ["frameworks","event-sourcing","snapshots","compaction","performance"],
    }),
  },

  "framework-graphql-persisted-queries-relay": {
    id: "framework-graphql-persisted-queries-relay",
    name: "FrameworkGraphqlPersistedQueriesRelaySkill",
    displayName: "Automated Persisted Queries (APQ) & CDN Caching Framework",
    categoryId: "frameworks",
    description: "Replaces large GraphQL POST bodies with SHA256 query hashes for Edge CDN caching and DDoS protection.",
    tags: ["frameworks","graphql","persisted-queries","cdn","caching"],
    transform: createStandardSkillTransform({
      sectionName: "Automated Persisted Queries (APQ) & Edge CDN Caching",
      ruSectionName: "Автоматические персистентные запросы GraphQL (APQ) и кэширование на CDN",
      instructions: [
        "Register client GraphQL query strings as SHA256 hashes during build compilation.",
        "Send lightweight GET requests containing only the query hash (`/graphql?hash=7f3...`).",
        "Cache query responses at the Cloudflare/CloudFront edge with fine-grained cache-control headers."
],
      ruInstructions: [
        "Регистрируйте запросы GraphQL в виде SHA256-хэшей на этапе сборки клиента.",
        "Отправляйте легковесные GET-запросы с хэшем вместо передачи длинного тела запроса.",
        "Кэшируйте ответы на узлах Edge CDN с точными заголовками инвалидации."
],
      semanticType: "protocol",
      tags: ["frameworks","graphql","persisted-queries","cdn","caching"],
    }),
  },

  "framework-database-sharding-vitess-citus": {
    id: "framework-database-sharding-vitess-citus",
    name: "FrameworkDatabaseShardingVitessCitusSkill",
    displayName: "Distributed Relational Database Sharding Framework (Vitess/Citus)",
    categoryId: "frameworks",
    description: "Horizontally partitions relational databases across tenant and entity shard keys with transparent SQL proxying.",
    tags: ["frameworks","sharding","vitess","citus","postgresql","scaling"],
    transform: createStandardSkillTransform({
      sectionName: "Distributed Relational Sharding Architecture",
      ruSectionName: "Фреймворк шардирования реляционных баз данных (Vitess / Citus / PostgreSQL)",
      instructions: [
        "Select high-cardinality, evenly distributed Shard Keys (e.g. `tenant_id` or `user_id`).",
        "Route single-shard queries directly to designated database nodes; minimize costly distributed multi-shard joins.",
        "Automate online, zero-downtime shard splitting as storage volume expands."
],
      ruInstructions: [
        "Выберите ключ шардирования (Shard Key) с равномерным распределением данных.",
        "Маршрутизируйте запросы напрямую к целевым шардам, минимизируя межшардовые объединения (Joins).",
        "Обеспечьте возможность онлайн-расщепления шардов без остановки сервиса."
],
      semanticType: "protocol",
      tags: ["frameworks","sharding","vitess","citus","postgresql","scaling"],
    }),
  },

  "framework-distributed-cache-redis-cluster": {
    id: "framework-distributed-cache-redis-cluster",
    name: "FrameworkDistributedCacheRedisClusterSkill",
    displayName: "Redis Cluster Multi-Slot Caching & Cache-Aside Architecture",
    categoryId: "frameworks",
    description: "Implements Cache-Aside, Write-Through, and Cache Stampede protection (XFetch probabilistic early expiration).",
    tags: ["frameworks","redis","caching","cache-stampede","distributed-systems"],
    transform: createStandardSkillTransform({
      sectionName: "Redis Cluster & Cache Stampede Defense Architecture",
      ruSectionName: "Архитектура кэширования Redis Cluster и защита от лавины запросов (Cache Stampede)",
      instructions: [
        "Implement Cache-Aside with probabilistic early expiration (XFetch algorithm) to prevent cache stampedes.",
        "Distribute keys evenly across 16,384 Redis Cluster hash slots using explicit `{hash_tag}` routing.",
        "Enforce maximum TTL on all keys to prevent unbounded memory leaks."
],
      ruInstructions: [
        "Внедрите алгоритм вероятностного раннего обновления (XFetch) для защиты от лавинообразных запросов.",
        "Используйте хэш-теги `{tag}` для группировки связанных ключей в один слот Redis.",
        "Устанавливайте обязательный TTL для всех кэшируемых сущностей."
],
      semanticType: "protocol",
      tags: ["frameworks","redis","caching","cache-stampede","distributed-systems"],
    }),
  },

  "framework-zero-trust-identity-aware-proxy": {
    id: "framework-zero-trust-identity-aware-proxy",
    name: "FrameworkZeroTrustIdentityAwareProxySkill",
    displayName: "Identity-Aware Proxy (IAP) & BeyondCorp Perimeter Framework",
    categoryId: "frameworks",
    description: "Replaces traditional corporate VPNs with context-aware HTTPS proxying and identity federation (BeyondCorp model).",
    tags: ["frameworks","iap","beyondcorp","zero-trust","google-cloud","security"],
    transform: createStandardSkillTransform({
      sectionName: "Google BeyondCorp & Identity-Aware Proxy (IAP) Blueprint",
      ruSectionName: "Фреймворк Identity-Aware Proxy (IAP) и концепция BeyondCorp",
      instructions: [
        "Expose internal applications exclusively behind an Identity-Aware Reverse Proxy (Google Cloud IAP / Cloudflare Access).",
        "Verify user identity, multi-factor authentication, and device posture on every individual request.",
        "Eliminate open VPN access to entire internal subnetworks."
],
      ruInstructions: [
        "Публикуйте внутренние сервисы только через прокси с проверкой личности (IAP).",
        "Проверяйте личность, второй фактор (MFA) и статус доверия устройства при каждом запросе.",
        "Откажитесь от сквозного доступа через классические корпоративные VPN."
],
      semanticType: "protocol",
      tags: ["frameworks","iap","beyondcorp","zero-trust","google-cloud","security"],
    }),
  },

  "framework-reactive-streams-backpressure-flow": {
    id: "framework-reactive-streams-backpressure-flow",
    name: "FrameworkReactiveStreamsBackpressureFlowSkill",
    displayName: "Reactive Streams (Project Reactor / RxJava) Flow Framework",
    categoryId: "frameworks",
    description: "Processes asynchronous data streams with non-blocking backpressure signals (Subscriber-driven flow control).",
    tags: ["frameworks","reactive-streams","rxjava","project-reactor","concurrency"],
    transform: createStandardSkillTransform({
      sectionName: "Reactive Streams & Non-Blocking Backpressure Architecture",
      ruSectionName: "Реактивные потоки (Reactive Streams) и неблокирующее противодавление",
      instructions: [
        "Enforce Reactive Streams specification: Publisher, Subscriber, Subscription, Processor.",
        "Signal downstream demand explicitly via `Subscription.request(n)` before producer emits items.",
        "Handle buffer overflow strategies: `DROP`, `LATEST`, or `BUFFER` with bounded capacities."
],
      ruInstructions: [
        "Соблюдайте спецификацию Reactive Streams (Publisher, Subscriber, Subscription).",
        "Передавайте сигнал готовности потребителя через `request(n)` до отправки порции данных.",
        "Настройте стратегии при переполнении буфера (Drop, Latest, Bounded Buffer)."
],
      semanticType: "protocol",
      tags: ["frameworks","reactive-streams","rxjava","project-reactor","concurrency"],
    }),
  },

  "framework-event-driven-saga-camunda-bpm": {
    id: "framework-event-driven-saga-camunda-bpm",
    name: "FrameworkEventDrivenSagaCamundaBpmSkill",
    displayName: "Camunda BPMN 2.0 & Orchestrated Saga Engine Framework",
    categoryId: "frameworks",
    description: "Executes visual ISO BPMN 2.0 executable workflow models with automated compensation boundary events.",
    tags: ["frameworks","camunda","bpmn","saga","orchestration","workflow-engine"],
    transform: createStandardSkillTransform({
      sectionName: "Camunda BPMN 2.0 Executable Saga Architecture",
      ruSectionName: "Исполняемые саги на базе стандарта BPMN 2.0 (Camunda / Zeebe)",
      instructions: [
        "Define business processes in standard executable BPMN 2.0 XML diagrams.",
        "Attach Compensation Boundary Events to all transactional service tasks.",
        "Automate distributed task worker dispatch via Zeebe gRPC job workers."
],
      ruInstructions: [
        "Описывайте рабочие процессы в виде исполняемых схем стандарта BPMN 2.0.",
        "Привязывайте компенсирующие события (Compensation Events) к каждой транзакционной задаче.",
        "Используйте распределенные воркеры Zeebe с опросом задач через gRPC."
],
      semanticType: "protocol",
      tags: ["frameworks","camunda","bpmn","saga","orchestration","workflow-engine"],
    }),
  },

  "framework-multi-region-active-active-cockroachdb": {
    id: "framework-multi-region-active-active-cockroachdb",
    name: "FrameworkMultiRegionActiveActiveCockroachdbSkill",
    displayName: "CockroachDB Multi-Region Distributed SQL Framework",
    categoryId: "frameworks",
    description: "Designs global multi-region databases with Regional by Row, Regional by Table, and Global Table data placement.",
    tags: ["frameworks","cockroachdb","distributed-sql","multi-region","active-active"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Region Distributed SQL Data Placement Framework",
      ruSectionName: "Распределенная многорегиональная СУБД (CockroachDB Multi-Region SQL)",
      instructions: [
        "Classify tables by geography: `REGIONAL BY ROW` (local latency), `GLOBAL` (fast reads everywhere).",
        "Keep transaction read and write latencies under 10ms by anchoring partition ranges near users.",
        "Survive total AWS/GCP region outages with zero manual failover intervention."
],
      ruInstructions: [
        "Разделяйте таблицы по гео-политике: `REGIONAL BY ROW` для локализации данных пользователей.",
        "Обеспечьте задержку чтения и записи менее 10 мс за счет приближения данных к клиенту.",
        "Гарантируйте работу системы при падении целого дата-центра или региона облака."
],
      semanticType: "protocol",
      tags: ["frameworks","cockroachdb","distributed-sql","multi-region","active-active"],
    }),
  },

  "framework-feature-management-launchdarkly-flags": {
    id: "framework-feature-management-launchdarkly-flags",
    name: "FrameworkFeatureManagementLaunchdarklyFlagsSkill",
    displayName: "Enterprise Feature Management & Targeted Rollouts (LaunchDarkly)",
    categoryId: "frameworks",
    description: "Implements multivariate feature flags, percentage-based user targeting, and automated kill-switches.",
    tags: ["frameworks","launchdarkly","feature-flags","experimentation","devops"],
    transform: createStandardSkillTransform({
      sectionName: "Enterprise Feature Management & Flag Governance",
      ruSectionName: "Управление функционалом и целевые релизы (LaunchDarkly Feature Management)",
      instructions: [
        "Implement multivariate flags targeting users by attributes (Beta group, Company, Region).",
        "Use percentage rollouts with deterministic hashing to ensure consistent user experience across sessions.",
        "Enforce flag lifecycle governance: archive and delete temporary migration flags after 60 days."
],
      ruInstructions: [
        "Настройте многовариантные флаги с таргетингом по атрибутам пользователя (бета-тестеры, тариф).",
        "Используйте процентные раскатки с детерминированным хэшированием для стабильного опыта пользователя.",
        "Проводите регулярный аудит и удаление временных флагов после завершения миграции."
],
      semanticType: "protocol",
      tags: ["frameworks","launchdarkly","feature-flags","experimentation","devops"],
    }),
  },

  "framework-infrastructure-cost-finops-cloud-governance": {
    id: "framework-infrastructure-cost-finops-cloud-governance",
    name: "FrameworkInfrastructureCostFinopsCloudGovernanceSkill",
    displayName: "FinOps Cloud Cost Optimization & Tagging Governance Framework",
    categoryId: "frameworks",
    description: "Implements FinOps principles (Inform, Optimize, Operate), mandatory resource cost allocation tags, and right-sizing.",
    tags: ["frameworks","finops","cloud-cost","aws","governance","optimization"],
    transform: createStandardSkillTransform({
      sectionName: "FinOps Cloud Governance & Cost Optimization Framework",
      ruSectionName: "Фреймворк оптимизации облачных затрат FinOps и аллокации расходов",
      instructions: [
        "Enforce mandatory cost allocation tags on all cloud resources: `Owner`, `Environment`, `Service`, `CostCenter`.",
        "Automate idle resource shutdown and compute right-sizing via automated policies.",
        "Track unit economics metrics (e.g. Cloud Cost per Active User) on weekly engineering dashboards."
],
      ruInstructions: [
        "Внедрите обязательные теги аллокации затрат на всех облачных ресурсах (Owner, Environment, Service).",
        "Автоматизируйте отключение неиспользуемых тестовых сред и оптимизацию размеров инстансов.",
        "Отслеживайте юнит-метрику затрат на одного активного пользователя на еженедельных дашбордах."
],
      semanticType: "protocol",
      tags: ["frameworks","finops","cloud-cost","aws","governance","optimization"],
    }),
  },
  "frameworks-rag-context-role-task-constraint-framework": {
    id: "frameworks-rag-context-role-task-constraint-framework",
    name: "RAGContextRoleTaskConstraintFrameworkSkill",
    displayName: "RAG Context-Role-Task-Constraint Framework",
    categoryId: "frameworks",
    description: "Structures RAG prompts: Context -> Role -> Task -> Constraints -> Format.",
    tags: ["frameworks","frameworks","rag","context"],
    transform: createStandardSkillTransform({
      sectionName: "RAG Context-Role-Task-Constraint Framework Standards",
      ruSectionName: "Стандарты и регламенты: RAG Context-Role-Task-Constraint Framework",
      instructions: [
        "Apply core domain tenets for RAG Context-Role-Task-Constraint Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для RAG Context-Role-Task-Constraint Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","rag","context"],
    }),
  },

  "frameworks-risen-system-prompt-framework-role-input-steps-expectations-narrowing": {
    id: "frameworks-risen-system-prompt-framework-role-input-steps-expectations-narrowing",
    name: "RISENSystemPromptFrameworkRoleInputStepsExpectationsNarrowingSkill",
    displayName: "RISEN System Prompt Framework (Role-Input-Steps-Expectations-Narrowing)",
    categoryId: "frameworks",
    description: "Applies RISEN framework for structured task execution instructions.",
    tags: ["frameworks","frameworks","risen","system"],
    transform: createStandardSkillTransform({
      sectionName: "RISEN System Prompt Framework (Role-Input-Steps-Expectations-Narrowing) Standards",
      ruSectionName: "Стандарты и регламенты: RISEN System Prompt Framework (Role-Input-Steps-Expectations-Narrowing)",
      instructions: [
        "Apply core domain tenets for RISEN System Prompt Framework (Role-Input-Steps-Expectations-Narrowing).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для RISEN System Prompt Framework (Role-Input-Steps-Expectations-Narrowing).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","risen","system"],
    }),
  },

  "frameworks-pastor-copywriting-framework-problem-amplify-story-transformation-offer-response": {
    id: "frameworks-pastor-copywriting-framework-problem-amplify-story-transformation-offer-response",
    name: "PASTORCopywritingFrameworkProblemAmplifyStoryTransformationOfferResponseSkill",
    displayName: "PASTOR Copywriting Framework (Problem-Amplify-Story-Transformation-Offer-Response)",
    categoryId: "frameworks",
    description: "Crafts persuasive sales copy using the PASTOR framework.",
    tags: ["frameworks","frameworks","pastor","copywriting"],
    transform: createStandardSkillTransform({
      sectionName: "PASTOR Copywriting Framework (Problem-Amplify-Story-Transformation-Offer-Response) Standards",
      ruSectionName: "Стандарты и регламенты: PASTOR Copywriting Framework (Problem-Amplify-Story-Transformation-Offer-Response)",
      instructions: [
        "Apply core domain tenets for PASTOR Copywriting Framework (Problem-Amplify-Story-Transformation-Offer-Response).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для PASTOR Copywriting Framework (Problem-Amplify-Story-Transformation-Offer-Response).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","pastor","copywriting"],
    }),
  },

  "frameworks-bab-copywriting-framework-before-after-bridge": {
    id: "frameworks-bab-copywriting-framework-before-after-bridge",
    name: "BABCopywritingFrameworkBeforeAfterBridgeSkill",
    displayName: "BAB Copywriting Framework (Before-After-Bridge)",
    categoryId: "frameworks",
    description: "Structures transformational marketing copy highlighting customer transformation.",
    tags: ["frameworks","frameworks","bab","copywriting"],
    transform: createStandardSkillTransform({
      sectionName: "BAB Copywriting Framework (Before-After-Bridge) Standards",
      ruSectionName: "Стандарты и регламенты: BAB Copywriting Framework (Before-After-Bridge)",
      instructions: [
        "Apply core domain tenets for BAB Copywriting Framework (Before-After-Bridge).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для BAB Copywriting Framework (Before-After-Bridge).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","bab","copywriting"],
    }),
  },

  "frameworks-aida-marketing-framework-attention-interest-desire-action": {
    id: "frameworks-aida-marketing-framework-attention-interest-desire-action",
    name: "AIDAMarketingFrameworkAttentionInterestDesireActionSkill",
    displayName: "AIDA Marketing Framework (Attention-Interest-Desire-Action)",
    categoryId: "frameworks",
    description: "Guides users through classic AIDA conversion funnel copywriting.",
    tags: ["frameworks","frameworks","aida","marketing"],
    transform: createStandardSkillTransform({
      sectionName: "AIDA Marketing Framework (Attention-Interest-Desire-Action) Standards",
      ruSectionName: "Стандарты и регламенты: AIDA Marketing Framework (Attention-Interest-Desire-Action)",
      instructions: [
        "Apply core domain tenets for AIDA Marketing Framework (Attention-Interest-Desire-Action).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для AIDA Marketing Framework (Attention-Interest-Desire-Action).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","aida","marketing"],
    }),
  },

  "frameworks-pas-marketing-framework-problem-agitate-solve": {
    id: "frameworks-pas-marketing-framework-problem-agitate-solve",
    name: "PASMarketingFrameworkProblemAgitateSolveSkill",
    displayName: "PAS Marketing Framework (Problem-Agitate-Solve)",
    categoryId: "frameworks",
    description: "Identifies customer pain points, agitates implications, and presents solution.",
    tags: ["frameworks","frameworks","pas","marketing"],
    transform: createStandardSkillTransform({
      sectionName: "PAS Marketing Framework (Problem-Agitate-Solve) Standards",
      ruSectionName: "Стандарты и регламенты: PAS Marketing Framework (Problem-Agitate-Solve)",
      instructions: [
        "Apply core domain tenets for PAS Marketing Framework (Problem-Agitate-Solve).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для PAS Marketing Framework (Problem-Agitate-Solve).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","pas","marketing"],
    }),
  },

  "frameworks-star-behavioral-interview-framework-situation-task-action-result": {
    id: "frameworks-star-behavioral-interview-framework-situation-task-action-result",
    name: "STARBehavioralInterviewFrameworkSituationTaskActionResultSkill",
    displayName: "STAR Behavioral Interview Framework (Situation-Task-Action-Result)",
    categoryId: "frameworks",
    description: "Structures compelling behavioral interview responses and case studies.",
    tags: ["frameworks","frameworks","star","behavioral"],
    transform: createStandardSkillTransform({
      sectionName: "STAR Behavioral Interview Framework (Situation-Task-Action-Result) Standards",
      ruSectionName: "Стандарты и регламенты: STAR Behavioral Interview Framework (Situation-Task-Action-Result)",
      instructions: [
        "Apply core domain tenets for STAR Behavioral Interview Framework (Situation-Task-Action-Result).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для STAR Behavioral Interview Framework (Situation-Task-Action-Result).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","star","behavioral"],
    }),
  },

  "frameworks-grow-coaching-framework-goal-reality-options-will": {
    id: "frameworks-grow-coaching-framework-goal-reality-options-will",
    name: "GROWCoachingFrameworkGoalRealityOptionsWillSkill",
    displayName: "GROW Coaching Framework (Goal-Reality-Options-Will)",
    categoryId: "frameworks",
    description: "Guides coaching conversations to discover goals, explore reality, and commit.",
    tags: ["frameworks","frameworks","grow","coaching"],
    transform: createStandardSkillTransform({
      sectionName: "GROW Coaching Framework (Goal-Reality-Options-Will) Standards",
      ruSectionName: "Стандарты и регламенты: GROW Coaching Framework (Goal-Reality-Options-Will)",
      instructions: [
        "Apply core domain tenets for GROW Coaching Framework (Goal-Reality-Options-Will).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для GROW Coaching Framework (Goal-Reality-Options-Will).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","grow","coaching"],
    }),
  },

  "frameworks-mckinsey-mece-framework-mutually-exclusive-collectively-exhaustive": {
    id: "frameworks-mckinsey-mece-framework-mutually-exclusive-collectively-exhaustive",
    name: "McKinseyMECEFrameworkMutuallyExclusiveCollectivelyExhaustiveSkill",
    displayName: "McKinsey MECE Framework (Mutually Exclusive, Collectively Exhaustive)",
    categoryId: "frameworks",
    description: "Structures problem decomposition without gaps or overlapping categories.",
    tags: ["frameworks","frameworks","mckinsey","mece"],
    transform: createStandardSkillTransform({
      sectionName: "McKinsey MECE Framework (Mutually Exclusive, Collectively Exhaustive) Standards",
      ruSectionName: "Стандарты и регламенты: McKinsey MECE Framework (Mutually Exclusive, Collectively Exhaustive)",
      instructions: [
        "Apply core domain tenets for McKinsey MECE Framework (Mutually Exclusive, Collectively Exhaustive).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для McKinsey MECE Framework (Mutually Exclusive, Collectively Exhaustive).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","mckinsey","mece"],
    }),
  },

  "frameworks-scamper-creative-framework-substitute-combine-adapt-modify-put-eliminate-reverse": {
    id: "frameworks-scamper-creative-framework-substitute-combine-adapt-modify-put-eliminate-reverse",
    name: "SCAMPERCreativeFrameworkSubstituteCombineAdaptModifyPutEliminateReverseSkill",
    displayName: "SCAMPER Creative Framework (Substitute-Combine-Adapt-Modify-Put-Eliminate-Reverse)",
    categoryId: "frameworks",
    description: "Applies SCAMPER operators to innovate existing products and workflows.",
    tags: ["frameworks","frameworks","scamper","creative"],
    transform: createStandardSkillTransform({
      sectionName: "SCAMPER Creative Framework (Substitute-Combine-Adapt-Modify-Put-Eliminate-Reverse) Standards",
      ruSectionName: "Стандарты и регламенты: SCAMPER Creative Framework (Substitute-Combine-Adapt-Modify-Put-Eliminate-Reverse)",
      instructions: [
        "Apply core domain tenets for SCAMPER Creative Framework (Substitute-Combine-Adapt-Modify-Put-Eliminate-Reverse).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SCAMPER Creative Framework (Substitute-Combine-Adapt-Modify-Put-Eliminate-Reverse).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","scamper","creative"],
    }),
  },

  "frameworks-clear-goal-setting-framework-collaborative-limited-emotional-appreciable-refinable": {
    id: "frameworks-clear-goal-setting-framework-collaborative-limited-emotional-appreciable-refinable",
    name: "CLEARGoalSettingFrameworkCollaborativeLimitedEmotionalAppreciableRefinableSkill",
    displayName: "CLEAR Goal-Setting Framework (Collaborative-Limited-Emotional-Appreciable-Refinable)",
    categoryId: "frameworks",
    description: "Sets agile team goals designed for rapid iterative execution.",
    tags: ["frameworks","frameworks","clear","goal"],
    transform: createStandardSkillTransform({
      sectionName: "CLEAR Goal-Setting Framework (Collaborative-Limited-Emotional-Appreciable-Refinable) Standards",
      ruSectionName: "Стандарты и регламенты: CLEAR Goal-Setting Framework (Collaborative-Limited-Emotional-Appreciable-Refinable)",
      instructions: [
        "Apply core domain tenets for CLEAR Goal-Setting Framework (Collaborative-Limited-Emotional-Appreciable-Refinable).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для CLEAR Goal-Setting Framework (Collaborative-Limited-Emotional-Appreciable-Refinable).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","clear","goal"],
    }),
  },

  "frameworks-okr-framework-objectives-key-results": {
    id: "frameworks-okr-framework-objectives-key-results",
    name: "OKRFrameworkObjectivesKeyResultsSkill",
    displayName: "OKR Framework (Objectives & Key Results)",
    categoryId: "frameworks",
    description: "Structures ambitious corporate objectives paired with measurable key result metrics.",
    tags: ["frameworks","frameworks","okr","framework"],
    transform: createStandardSkillTransform({
      sectionName: "OKR Framework (Objectives & Key Results) Standards",
      ruSectionName: "Стандарты и регламенты: OKR Framework (Objectives & Key Results)",
      instructions: [
        "Apply core domain tenets for OKR Framework (Objectives & Key Results).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для OKR Framework (Objectives & Key Results).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","okr","framework"],
    }),
  },

  "frameworks-smart-goal-framework-specific-measurable-achievable-relevant-timebound": {
    id: "frameworks-smart-goal-framework-specific-measurable-achievable-relevant-timebound",
    name: "SMARTGoalFrameworkSpecificMeasurableAchievableRelevantTimeboundSkill",
    displayName: "SMART Goal Framework (Specific-Measurable-Achievable-Relevant-Timebound)",
    categoryId: "frameworks",
    description: "Formulates unambiguous, trackable operational goals.",
    tags: ["frameworks","frameworks","smart","goal"],
    transform: createStandardSkillTransform({
      sectionName: "SMART Goal Framework (Specific-Measurable-Achievable-Relevant-Timebound) Standards",
      ruSectionName: "Стандарты и регламенты: SMART Goal Framework (Specific-Measurable-Achievable-Relevant-Timebound)",
      instructions: [
        "Apply core domain tenets for SMART Goal Framework (Specific-Measurable-Achievable-Relevant-Timebound).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SMART Goal Framework (Specific-Measurable-Achievable-Relevant-Timebound).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","smart","goal"],
    }),
  },

  "frameworks-swot-analysis-framework-strengths-weaknesses-opportunities-threats": {
    id: "frameworks-swot-analysis-framework-strengths-weaknesses-opportunities-threats",
    name: "SWOTAnalysisFrameworkStrengthsWeaknessesOpportunitiesThreatsSkill",
    displayName: "SWOT Analysis Framework (Strengths-Weaknesses-Opportunities-Threats)",
    categoryId: "frameworks",
    description: "Evaluates internal capabilities against external market realities.",
    tags: ["frameworks","frameworks","swot","analysis"],
    transform: createStandardSkillTransform({
      sectionName: "SWOT Analysis Framework (Strengths-Weaknesses-Opportunities-Threats) Standards",
      ruSectionName: "Стандарты и регламенты: SWOT Analysis Framework (Strengths-Weaknesses-Opportunities-Threats)",
      instructions: [
        "Apply core domain tenets for SWOT Analysis Framework (Strengths-Weaknesses-Opportunities-Threats).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SWOT Analysis Framework (Strengths-Weaknesses-Opportunities-Threats).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","swot","analysis"],
    }),
  },

  "frameworks-pestle-strategic-framework-political-economic-social-tech-legal-environmental": {
    id: "frameworks-pestle-strategic-framework-political-economic-social-tech-legal-environmental",
    name: "PESTLEStrategicFrameworkPoliticalEconomicSocialTechLegalEnvironmentalSkill",
    displayName: "PESTLE Strategic Framework (Political-Economic-Social-Tech-Legal-Environmental)",
    categoryId: "frameworks",
    description: "Audits macro environmental factors impacting corporate strategy.",
    tags: ["frameworks","frameworks","pestle","strategic"],
    transform: createStandardSkillTransform({
      sectionName: "PESTLE Strategic Framework (Political-Economic-Social-Tech-Legal-Environmental) Standards",
      ruSectionName: "Стандарты и регламенты: PESTLE Strategic Framework (Political-Economic-Social-Tech-Legal-Environmental)",
      instructions: [
        "Apply core domain tenets for PESTLE Strategic Framework (Political-Economic-Social-Tech-Legal-Environmental).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для PESTLE Strategic Framework (Political-Economic-Social-Tech-Legal-Environmental).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","pestle","strategic"],
    }),
  },

  "frameworks-porter-five-forces-competitive-framework": {
    id: "frameworks-porter-five-forces-competitive-framework",
    name: "PorterFiveForcesCompetitiveFrameworkSkill",
    displayName: "Porter Five Forces Competitive Framework",
    categoryId: "frameworks",
    description: "Analyzes industry structure and competitive intensity across 5 market forces.",
    tags: ["frameworks","frameworks","porter","five"],
    transform: createStandardSkillTransform({
      sectionName: "Porter Five Forces Competitive Framework Standards",
      ruSectionName: "Стандарты и регламенты: Porter Five Forces Competitive Framework",
      instructions: [
        "Apply core domain tenets for Porter Five Forces Competitive Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Porter Five Forces Competitive Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","porter","five"],
    }),
  },

  "frameworks-boston-consulting-group-bcg-portfolio-matrix-framework": {
    id: "frameworks-boston-consulting-group-bcg-portfolio-matrix-framework",
    name: "BostonConsultingGroupBCGPortfolioMatrixFrameworkSkill",
    displayName: "Boston Consulting Group (BCG) Portfolio Matrix Framework",
    categoryId: "frameworks",
    description: "Categorizes products into Stars, Cash Cows, Question Marks, and Dogs.",
    tags: ["frameworks","frameworks","boston","consulting"],
    transform: createStandardSkillTransform({
      sectionName: "Boston Consulting Group (BCG) Portfolio Matrix Framework Standards",
      ruSectionName: "Стандарты и регламенты: Boston Consulting Group (BCG) Portfolio Matrix Framework",
      instructions: [
        "Apply core domain tenets for Boston Consulting Group (BCG) Portfolio Matrix Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Boston Consulting Group (BCG) Portfolio Matrix Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","boston","consulting"],
    }),
  },

  "frameworks-ansoff-product-market-growth-matrix-framework": {
    id: "frameworks-ansoff-product-market-growth-matrix-framework",
    name: "AnsoffProductMarketGrowthMatrixFrameworkSkill",
    displayName: "Ansoff Product-Market Growth Matrix Framework",
    categoryId: "frameworks",
    description: "Selects growth vectors: Market Penetration, Product Dev, Market Dev, Diversification.",
    tags: ["frameworks","frameworks","ansoff","product"],
    transform: createStandardSkillTransform({
      sectionName: "Ansoff Product-Market Growth Matrix Framework Standards",
      ruSectionName: "Стандарты и регламенты: Ansoff Product-Market Growth Matrix Framework",
      instructions: [
        "Apply core domain tenets for Ansoff Product-Market Growth Matrix Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Ansoff Product-Market Growth Matrix Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","ansoff","product"],
    }),
  },

  "frameworks-blue-ocean-strategy-errc-framework-eliminate-reduce-raise-create": {
    id: "frameworks-blue-ocean-strategy-errc-framework-eliminate-reduce-raise-create",
    name: "BlueOceanStrategyERRCFrameworkEliminateReduceRaiseCreateSkill",
    displayName: "Blue Ocean Strategy ERRC Framework (Eliminate-Reduce-Raise-Create)",
    categoryId: "frameworks",
    description: "Reconfigures value curves to unlock uncontested market space.",
    tags: ["frameworks","frameworks","blue","ocean"],
    transform: createStandardSkillTransform({
      sectionName: "Blue Ocean Strategy ERRC Framework (Eliminate-Reduce-Raise-Create) Standards",
      ruSectionName: "Стандарты и регламенты: Blue Ocean Strategy ERRC Framework (Eliminate-Reduce-Raise-Create)",
      instructions: [
        "Apply core domain tenets for Blue Ocean Strategy ERRC Framework (Eliminate-Reduce-Raise-Create).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Blue Ocean Strategy ERRC Framework (Eliminate-Reduce-Raise-Create).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","blue","ocean"],
    }),
  },

  "frameworks-value-proposition-canvas-framework-pain-relievers-gain-creators": {
    id: "frameworks-value-proposition-canvas-framework-pain-relievers-gain-creators",
    name: "ValuePropositionCanvasFrameworkPainRelieversGainCreatorsSkill",
    displayName: "Value Proposition Canvas Framework (Pain Relievers & Gain Creators)",
    categoryId: "frameworks",
    description: "Maps customer jobs, pains, and gains to product feature capabilities.",
    tags: ["frameworks","frameworks","value","proposition"],
    transform: createStandardSkillTransform({
      sectionName: "Value Proposition Canvas Framework (Pain Relievers & Gain Creators) Standards",
      ruSectionName: "Стандарты и регламенты: Value Proposition Canvas Framework (Pain Relievers & Gain Creators)",
      instructions: [
        "Apply core domain tenets for Value Proposition Canvas Framework (Pain Relievers & Gain Creators).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Value Proposition Canvas Framework (Pain Relievers & Gain Creators).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","value","proposition"],
    }),
  },

  "frameworks-lean-canvas-one-page-business-model-framework": {
    id: "frameworks-lean-canvas-one-page-business-model-framework",
    name: "LeanCanvasOnePageBusinessModelFrameworkSkill",
    displayName: "Lean Canvas One-Page Business Model Framework",
    categoryId: "frameworks",
    description: "Distills business model hypotheses into a 9-box single-page blueprint.",
    tags: ["frameworks","frameworks","lean","canvas"],
    transform: createStandardSkillTransform({
      sectionName: "Lean Canvas One-Page Business Model Framework Standards",
      ruSectionName: "Стандарты и регламенты: Lean Canvas One-Page Business Model Framework",
      instructions: [
        "Apply core domain tenets for Lean Canvas One-Page Business Model Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Lean Canvas One-Page Business Model Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","lean","canvas"],
    }),
  },

  "frameworks-cynefin-decision-framework-simple-complicated-complex-chaotic": {
    id: "frameworks-cynefin-decision-framework-simple-complicated-complex-chaotic",
    name: "CynefinDecisionFrameworkSimpleComplicatedComplexChaoticSkill",
    displayName: "Cynefin Decision Framework (Simple-Complicated-Complex-Chaotic)",
    categoryId: "frameworks",
    description: "Categorizes operational contexts to select appropriate decision responses.",
    tags: ["frameworks","frameworks","cynefin","decision"],
    transform: createStandardSkillTransform({
      sectionName: "Cynefin Decision Framework (Simple-Complicated-Complex-Chaotic) Standards",
      ruSectionName: "Стандарты и регламенты: Cynefin Decision Framework (Simple-Complicated-Complex-Chaotic)",
      instructions: [
        "Apply core domain tenets for Cynefin Decision Framework (Simple-Complicated-Complex-Chaotic).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cynefin Decision Framework (Simple-Complicated-Complex-Chaotic).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","cynefin","decision"],
    }),
  },

  "frameworks-mckinsey-7s-organizational-alignment-framework": {
    id: "frameworks-mckinsey-7s-organizational-alignment-framework",
    name: "McKinsey7SOrganizationalAlignmentFrameworkSkill",
    displayName: "McKinsey 7S Organizational Alignment Framework",
    categoryId: "frameworks",
    description: "Aligns Strategy, Structure, Systems, Shared Values, Style, Staff, and Skills.",
    tags: ["frameworks","frameworks","mckinsey","7s"],
    transform: createStandardSkillTransform({
      sectionName: "McKinsey 7S Organizational Alignment Framework Standards",
      ruSectionName: "Стандарты и регламенты: McKinsey 7S Organizational Alignment Framework",
      instructions: [
        "Apply core domain tenets for McKinsey 7S Organizational Alignment Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для McKinsey 7S Organizational Alignment Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","mckinsey","7s"],
    }),
  },

  "frameworks-kano-customer-satisfaction-model-framework": {
    id: "frameworks-kano-customer-satisfaction-model-framework",
    name: "KanoCustomerSatisfactionModelFrameworkSkill",
    displayName: "Kano Customer Satisfaction Model Framework",
    categoryId: "frameworks",
    description: "Categorizes features into Basic, Performance, and Delighter capabilities.",
    tags: ["frameworks","frameworks","kano","customer"],
    transform: createStandardSkillTransform({
      sectionName: "Kano Customer Satisfaction Model Framework Standards",
      ruSectionName: "Стандарты и регламенты: Kano Customer Satisfaction Model Framework",
      instructions: [
        "Apply core domain tenets for Kano Customer Satisfaction Model Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Kano Customer Satisfaction Model Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","kano","customer"],
    }),
  },

  "frameworks-triz-40-inventive-principles-engineering-framework": {
    id: "frameworks-triz-40-inventive-principles-engineering-framework",
    name: "TRIZ40InventivePrinciplesEngineeringFrameworkSkill",
    displayName: "TRIZ 40 Inventive Principles Engineering Framework",
    categoryId: "frameworks",
    description: "Solves technical contradictions using Altshuller 40 inventive principles.",
    tags: ["frameworks","frameworks","triz","40"],
    transform: createStandardSkillTransform({
      sectionName: "TRIZ 40 Inventive Principles Engineering Framework Standards",
      ruSectionName: "Стандарты и регламенты: TRIZ 40 Inventive Principles Engineering Framework",
      instructions: [
        "Apply core domain tenets for TRIZ 40 Inventive Principles Engineering Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для TRIZ 40 Inventive Principles Engineering Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","triz","40"],
    }),
  },

  "frameworks-design-thinking-double-diamond-framework-discover-define-develop-deliver": {
    id: "frameworks-design-thinking-double-diamond-framework-discover-define-develop-deliver",
    name: "DesignThinkingDoubleDiamondFrameworkDiscoverDefineDevelopDeliverSkill",
    displayName: "Design Thinking Double Diamond Framework (Discover-Define-Develop-Deliver)",
    categoryId: "frameworks",
    description: "Guides user-centered innovation from problem exploration to solution delivery.",
    tags: ["frameworks","frameworks","design","thinking"],
    transform: createStandardSkillTransform({
      sectionName: "Design Thinking Double Diamond Framework (Discover-Define-Develop-Deliver) Standards",
      ruSectionName: "Стандарты и регламенты: Design Thinking Double Diamond Framework (Discover-Define-Develop-Deliver)",
      instructions: [
        "Apply core domain tenets for Design Thinking Double Diamond Framework (Discover-Define-Develop-Deliver).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Design Thinking Double Diamond Framework (Discover-Define-Develop-Deliver).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","design","thinking"],
    }),
  },

  "frameworks-jobs-to-be-done-jtbd-timeline-framework": {
    id: "frameworks-jobs-to-be-done-jtbd-timeline-framework",
    name: "JobstobeDoneJTBDTimelineFrameworkSkill",
    displayName: "Jobs-to-be-Done (JTBD) Timeline Framework",
    categoryId: "frameworks",
    description: "Maps customer progress journeys from first thought to habituated product use.",
    tags: ["frameworks","frameworks","jobs","to"],
    transform: createStandardSkillTransform({
      sectionName: "Jobs-to-be-Done (JTBD) Timeline Framework Standards",
      ruSectionName: "Стандарты и регламенты: Jobs-to-be-Done (JTBD) Timeline Framework",
      instructions: [
        "Apply core domain tenets for Jobs-to-be-Done (JTBD) Timeline Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Jobs-to-be-Done (JTBD) Timeline Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","jobs","to"],
    }),
  },

  "frameworks-rice-product-prioritization-framework-reach-impact-confidence-effort": {
    id: "frameworks-rice-product-prioritization-framework-reach-impact-confidence-effort",
    name: "RICEProductPrioritizationFrameworkReachImpactConfidenceEffortSkill",
    displayName: "RICE Product Prioritization Framework (Reach-Impact-Confidence-Effort)",
    categoryId: "frameworks",
    description: "Scores roadmap features objectively to maximize engineering ROI.",
    tags: ["frameworks","frameworks","rice","product"],
    transform: createStandardSkillTransform({
      sectionName: "RICE Product Prioritization Framework (Reach-Impact-Confidence-Effort) Standards",
      ruSectionName: "Стандарты и регламенты: RICE Product Prioritization Framework (Reach-Impact-Confidence-Effort)",
      instructions: [
        "Apply core domain tenets for RICE Product Prioritization Framework (Reach-Impact-Confidence-Effort).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для RICE Product Prioritization Framework (Reach-Impact-Confidence-Effort).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","rice","product"],
    }),
  },

  "frameworks-moscow-feature-categorization-framework-must-should-could-wont": {
    id: "frameworks-moscow-feature-categorization-framework-must-should-could-wont",
    name: "MoSCoWFeatureCategorizationFrameworkMustShouldCouldWontSkill",
    displayName: "MoSCoW Feature Categorization Framework (Must-Should-Could-Wont)",
    categoryId: "frameworks",
    description: "Prioritizes project scope for fixed-deadline agile release sprints.",
    tags: ["frameworks","frameworks","moscow","feature"],
    transform: createStandardSkillTransform({
      sectionName: "MoSCoW Feature Categorization Framework (Must-Should-Could-Wont) Standards",
      ruSectionName: "Стандарты и регламенты: MoSCoW Feature Categorization Framework (Must-Should-Could-Wont)",
      instructions: [
        "Apply core domain tenets for MoSCoW Feature Categorization Framework (Must-Should-Could-Wont).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для MoSCoW Feature Categorization Framework (Must-Should-Could-Wont).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","moscow","feature"],
    }),
  },

  "frameworks-eisenhower-decision-matrix-framework-urgent-vs-important": {
    id: "frameworks-eisenhower-decision-matrix-framework-urgent-vs-important",
    name: "EisenhowerDecisionMatrixFrameworkUrgentvsImportantSkill",
    displayName: "Eisenhower Decision Matrix Framework (Urgent vs Important)",
    categoryId: "frameworks",
    description: "Prioritizes tasks into Do, Schedule, Delegate, and Eliminate quadrants.",
    tags: ["frameworks","frameworks","eisenhower","decision"],
    transform: createStandardSkillTransform({
      sectionName: "Eisenhower Decision Matrix Framework (Urgent vs Important) Standards",
      ruSectionName: "Стандарты и регламенты: Eisenhower Decision Matrix Framework (Urgent vs Important)",
      instructions: [
        "Apply core domain tenets for Eisenhower Decision Matrix Framework (Urgent vs Important).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Eisenhower Decision Matrix Framework (Urgent vs Important).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","eisenhower","decision"],
    }),
  },

  "frameworks-5w2h-problem-definition-framework-who-what-where-when-why-how-howmuch": {
    id: "frameworks-5w2h-problem-definition-framework-who-what-where-when-why-how-howmuch",
    name: "5W2HProblemDefinitionFrameworkWhoWhatWhereWhenWhyHowHowMuchSkill",
    displayName: "5W2H Problem Definition Framework (Who-What-Where-When-Why-How-HowMuch)",
    categoryId: "frameworks",
    description: "Frames operational problems comprehensively across 7 core questions.",
    tags: ["frameworks","frameworks","5w2h","problem"],
    transform: createStandardSkillTransform({
      sectionName: "5W2H Problem Definition Framework (Who-What-Where-When-Why-How-HowMuch) Standards",
      ruSectionName: "Стандарты и регламенты: 5W2H Problem Definition Framework (Who-What-Where-When-Why-How-HowMuch)",
      instructions: [
        "Apply core domain tenets for 5W2H Problem Definition Framework (Who-What-Where-When-Why-How-HowMuch).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для 5W2H Problem Definition Framework (Who-What-Where-When-Why-How-HowMuch).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","5w2h","problem"],
    }),
  },

  "frameworks-kaizen-continuous-improvement-pdca-framework-plan-do-check-act": {
    id: "frameworks-kaizen-continuous-improvement-pdca-framework-plan-do-check-act",
    name: "KaizenContinuousImprovementPDCAFrameworkPlanDoCheckActSkill",
    displayName: "Kaizen Continuous Improvement PDCA Framework (Plan-Do-Check-Act)",
    categoryId: "frameworks",
    description: "Executes iterative quality improvement cycles across manufacturing/software.",
    tags: ["frameworks","frameworks","kaizen","continuous"],
    transform: createStandardSkillTransform({
      sectionName: "Kaizen Continuous Improvement PDCA Framework (Plan-Do-Check-Act) Standards",
      ruSectionName: "Стандарты и регламенты: Kaizen Continuous Improvement PDCA Framework (Plan-Do-Check-Act)",
      instructions: [
        "Apply core domain tenets for Kaizen Continuous Improvement PDCA Framework (Plan-Do-Check-Act).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Kaizen Continuous Improvement PDCA Framework (Plan-Do-Check-Act).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","kaizen","continuous"],
    }),
  },

  "frameworks-six-sigma-dmaic-improvement-framework-define-measure-analyze-improve-control": {
    id: "frameworks-six-sigma-dmaic-improvement-framework-define-measure-analyze-improve-control",
    name: "SixSigmaDMAICImprovementFrameworkDefineMeasureAnalyzeImproveControlSkill",
    displayName: "Six Sigma DMAIC Improvement Framework (Define-Measure-Analyze-Improve-Control)",
    categoryId: "frameworks",
    description: "Reduces process variance and defect rates to 3.4 defects per million.",
    tags: ["frameworks","frameworks","six","sigma"],
    transform: createStandardSkillTransform({
      sectionName: "Six Sigma DMAIC Improvement Framework (Define-Measure-Analyze-Improve-Control) Standards",
      ruSectionName: "Стандарты и регламенты: Six Sigma DMAIC Improvement Framework (Define-Measure-Analyze-Improve-Control)",
      instructions: [
        "Apply core domain tenets for Six Sigma DMAIC Improvement Framework (Define-Measure-Analyze-Improve-Control).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Six Sigma DMAIC Improvement Framework (Define-Measure-Analyze-Improve-Control).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","six","sigma"],
    }),
  },

  "frameworks-scrum-agile-sprint-execution-framework": {
    id: "frameworks-scrum-agile-sprint-execution-framework",
    name: "SCRUMAgileSprintExecutionFrameworkSkill",
    displayName: "SCRUM Agile Sprint Execution Framework",
    categoryId: "frameworks",
    description: "Orchestrates 2-week agile sprints with daily standups, reviews, and retrospectives.",
    tags: ["frameworks","frameworks","scrum","agile"],
    transform: createStandardSkillTransform({
      sectionName: "SCRUM Agile Sprint Execution Framework Standards",
      ruSectionName: "Стандарты и регламенты: SCRUM Agile Sprint Execution Framework",
      instructions: [
        "Apply core domain tenets for SCRUM Agile Sprint Execution Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SCRUM Agile Sprint Execution Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","scrum","agile"],
    }),
  },

  "frameworks-kanban-flow-optimization-wip-limit-framework": {
    id: "frameworks-kanban-flow-optimization-wip-limit-framework",
    name: "KanbanFlowOptimizationWIPLimitFrameworkSkill",
    displayName: "Kanban Flow Optimization & WIP Limit Framework",
    categoryId: "frameworks",
    description: "Optimizes value stream throughput by enforcing Work-In-Progress limits.",
    tags: ["frameworks","frameworks","kanban","flow"],
    transform: createStandardSkillTransform({
      sectionName: "Kanban Flow Optimization & WIP Limit Framework Standards",
      ruSectionName: "Стандарты и регламенты: Kanban Flow Optimization & WIP Limit Framework",
      instructions: [
        "Apply core domain tenets for Kanban Flow Optimization & WIP Limit Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Kanban Flow Optimization & WIP Limit Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","kanban","flow"],
    }),
  },

  "frameworks-safe-scaled-agile-framework-for-enterprise": {
    id: "frameworks-safe-scaled-agile-framework-for-enterprise",
    name: "SAFeScaledAgileFrameworkforEnterpriseSkill",
    displayName: "SAFe Scaled Agile Framework for Enterprise",
    categoryId: "frameworks",
    description: "Scales agile practices across large enterprise release trains.",
    tags: ["frameworks","frameworks","safe","scaled"],
    transform: createStandardSkillTransform({
      sectionName: "SAFe Scaled Agile Framework for Enterprise Standards",
      ruSectionName: "Стандарты и регламенты: SAFe Scaled Agile Framework for Enterprise",
      instructions: [
        "Apply core domain tenets for SAFe Scaled Agile Framework for Enterprise.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SAFe Scaled Agile Framework for Enterprise.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","safe","scaled"],
    }),
  },

  "frameworks-togaf-enterprise-architecture-framework-adm": {
    id: "frameworks-togaf-enterprise-architecture-framework-adm",
    name: "TOGAFEnterpriseArchitectureFrameworkADMSkill",
    displayName: "TOGAF Enterprise Architecture Framework (ADM)",
    categoryId: "frameworks",
    description: "Architects enterprise IT systems using the Architecture Development Method.",
    tags: ["frameworks","frameworks","togaf","enterprise"],
    transform: createStandardSkillTransform({
      sectionName: "TOGAF Enterprise Architecture Framework (ADM) Standards",
      ruSectionName: "Стандарты и регламенты: TOGAF Enterprise Architecture Framework (ADM)",
      instructions: [
        "Apply core domain tenets for TOGAF Enterprise Architecture Framework (ADM).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для TOGAF Enterprise Architecture Framework (ADM).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","togaf","enterprise"],
    }),
  },

  "frameworks-cobit-it-governance-management-framework": {
    id: "frameworks-cobit-it-governance-management-framework",
    name: "COBITITGovernanceManagementFrameworkSkill",
    displayName: "COBIT IT Governance & Management Framework",
    categoryId: "frameworks",
    description: "Aligns IT goals with corporate risk management and governance objectives.",
    tags: ["frameworks","frameworks","cobit","it"],
    transform: createStandardSkillTransform({
      sectionName: "COBIT IT Governance & Management Framework Standards",
      ruSectionName: "Стандарты и регламенты: COBIT IT Governance & Management Framework",
      instructions: [
        "Apply core domain tenets for COBIT IT Governance & Management Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для COBIT IT Governance & Management Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","cobit","it"],
    }),
  },

  "frameworks-nist-cybersecurity-framework-identify-protect-detect-respond-recover": {
    id: "frameworks-nist-cybersecurity-framework-identify-protect-detect-respond-recover",
    name: "NISTCybersecurityFrameworkIdentifyProtectDetectRespondRecoverSkill",
    displayName: "NIST Cybersecurity Framework (Identify-Protect-Detect-Respond-Recover)",
    categoryId: "frameworks",
    description: "Structures organizational cybersecurity posture across 5 core functions.",
    tags: ["frameworks","frameworks","nist","cybersecurity"],
    transform: createStandardSkillTransform({
      sectionName: "NIST Cybersecurity Framework (Identify-Protect-Detect-Respond-Recover) Standards",
      ruSectionName: "Стандарты и регламенты: NIST Cybersecurity Framework (Identify-Protect-Detect-Respond-Recover)",
      instructions: [
        "Apply core domain tenets for NIST Cybersecurity Framework (Identify-Protect-Detect-Respond-Recover).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для NIST Cybersecurity Framework (Identify-Protect-Detect-Respond-Recover).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","nist","cybersecurity"],
    }),
  },

  "frameworks-itil-4-service-value-system-framework": {
    id: "frameworks-itil-4-service-value-system-framework",
    name: "ITIL4ServiceValueSystemFrameworkSkill",
    displayName: "ITIL 4 Service Value System Framework",
    categoryId: "frameworks",
    description: "Manages IT service lifecycle from strategy and design to operation.",
    tags: ["frameworks","frameworks","itil","4"],
    transform: createStandardSkillTransform({
      sectionName: "ITIL 4 Service Value System Framework Standards",
      ruSectionName: "Стандарты и регламенты: ITIL 4 Service Value System Framework",
      instructions: [
        "Apply core domain tenets for ITIL 4 Service Value System Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для ITIL 4 Service Value System Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","itil","4"],
    }),
  },

  "frameworks-gdpr-data-protection-compliance-framework": {
    id: "frameworks-gdpr-data-protection-compliance-framework",
    name: "GDPRDataProtectionComplianceFrameworkSkill",
    displayName: "GDPR Data Protection Compliance Framework",
    categoryId: "frameworks",
    description: "Enforces privacy-by-design, data subject rights, and breach notification.",
    tags: ["frameworks","frameworks","gdpr","data"],
    transform: createStandardSkillTransform({
      sectionName: "GDPR Data Protection Compliance Framework Standards",
      ruSectionName: "Стандарты и регламенты: GDPR Data Protection Compliance Framework",
      instructions: [
        "Apply core domain tenets for GDPR Data Protection Compliance Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для GDPR Data Protection Compliance Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","gdpr","data"],
    }),
  },

  "frameworks-soc-2-trust-services-criteria-framework": {
    id: "frameworks-soc-2-trust-services-criteria-framework",
    name: "SOC2TrustServicesCriteriaFrameworkSkill",
    displayName: "SOC 2 Trust Services Criteria Framework",
    categoryId: "frameworks",
    description: "Audits security, availability, processing integrity, confidentiality, and privacy.",
    tags: ["frameworks","frameworks","soc","2"],
    transform: createStandardSkillTransform({
      sectionName: "SOC 2 Trust Services Criteria Framework Standards",
      ruSectionName: "Стандарты и регламенты: SOC 2 Trust Services Criteria Framework",
      instructions: [
        "Apply core domain tenets for SOC 2 Trust Services Criteria Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для SOC 2 Trust Services Criteria Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","soc","2"],
    }),
  },

  "frameworks-coso-enterprise-risk-management-framework": {
    id: "frameworks-coso-enterprise-risk-management-framework",
    name: "COSOEnterpriseRiskManagementFrameworkSkill",
    displayName: "COSO Enterprise Risk Management Framework",
    categoryId: "frameworks",
    description: "Integrates risk management with corporate strategy and performance goals.",
    tags: ["frameworks","frameworks","coso","enterprise"],
    transform: createStandardSkillTransform({
      sectionName: "COSO Enterprise Risk Management Framework Standards",
      ruSectionName: "Стандарты и регламенты: COSO Enterprise Risk Management Framework",
      instructions: [
        "Apply core domain tenets for COSO Enterprise Risk Management Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для COSO Enterprise Risk Management Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","coso","enterprise"],
    }),
  },

  "frameworks-balanced-scorecard-strategic-performance-framework": {
    id: "frameworks-balanced-scorecard-strategic-performance-framework",
    name: "BalancedScorecardStrategicPerformanceFrameworkSkill",
    displayName: "Balanced Scorecard Strategic Performance Framework",
    categoryId: "frameworks",
    description: "Tracks financial, customer, internal process, and learning growth metrics.",
    tags: ["frameworks","frameworks","balanced","scorecard"],
    transform: createStandardSkillTransform({
      sectionName: "Balanced Scorecard Strategic Performance Framework Standards",
      ruSectionName: "Стандарты и регламенты: Balanced Scorecard Strategic Performance Framework",
      instructions: [
        "Apply core domain tenets for Balanced Scorecard Strategic Performance Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Balanced Scorecard Strategic Performance Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","balanced","scorecard"],
    }),
  },

  "frameworks-vrio-competitive-resource-framework": {
    id: "frameworks-vrio-competitive-resource-framework",
    name: "VRIOCompetitiveResourceFrameworkSkill",
    displayName: "VRIO Competitive Resource Framework",
    categoryId: "frameworks",
    description: "Tests corporate assets for Value, Rarity, Inimitability, and Organization.",
    tags: ["frameworks","frameworks","vrio","competitive"],
    transform: createStandardSkillTransform({
      sectionName: "VRIO Competitive Resource Framework Standards",
      ruSectionName: "Стандарты и регламенты: VRIO Competitive Resource Framework",
      instructions: [
        "Apply core domain tenets for VRIO Competitive Resource Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для VRIO Competitive Resource Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","vrio","competitive"],
    }),
  },

  "frameworks-three-horizons-of-growth-framework-mckinsey": {
    id: "frameworks-three-horizons-of-growth-framework-mckinsey",
    name: "ThreeHorizonsofGrowthFrameworkMcKinseySkill",
    displayName: "Three Horizons of Growth Framework (McKinsey)",
    categoryId: "frameworks",
    description: "Allocates capital across Horizon 1 core, Horizon 2 scaling, and Horizon 3 bets.",
    tags: ["frameworks","frameworks","three","horizons"],
    transform: createStandardSkillTransform({
      sectionName: "Three Horizons of Growth Framework (McKinsey) Standards",
      ruSectionName: "Стандарты и регламенты: Three Horizons of Growth Framework (McKinsey)",
      instructions: [
        "Apply core domain tenets for Three Horizons of Growth Framework (McKinsey).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Three Horizons of Growth Framework (McKinsey).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","three","horizons"],
    }),
  },

  "frameworks-flywheel-effect-compounding-growth-framework": {
    id: "frameworks-flywheel-effect-compounding-growth-framework",
    name: "FlywheelEffectCompoundingGrowthFrameworkSkill",
    displayName: "Flywheel Effect Compounding Growth Framework",
    categoryId: "frameworks",
    description: "Maps interconnected business virtuous cycles where momentum compounds.",
    tags: ["frameworks","frameworks","flywheel","effect"],
    transform: createStandardSkillTransform({
      sectionName: "Flywheel Effect Compounding Growth Framework Standards",
      ruSectionName: "Стандарты и регламенты: Flywheel Effect Compounding Growth Framework",
      instructions: [
        "Apply core domain tenets for Flywheel Effect Compounding Growth Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Flywheel Effect Compounding Growth Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","flywheel","effect"],
    }),
  },

  "frameworks-hook-model-habit-forming-framework-trigger-action-variablereward-investment": {
    id: "frameworks-hook-model-habit-forming-framework-trigger-action-variablereward-investment",
    name: "HookModelHabitFormingFrameworkTriggerActionVariableRewardInvestmentSkill",
    displayName: "Hook Model Habit-Forming Framework (Trigger-Action-VariableReward-Investment)",
    categoryId: "frameworks",
    description: "Designs habit-forming product engagement loops based on Nir Eyal's model.",
    tags: ["frameworks","frameworks","hook","model"],
    transform: createStandardSkillTransform({
      sectionName: "Hook Model Habit-Forming Framework (Trigger-Action-VariableReward-Investment) Standards",
      ruSectionName: "Стандарты и регламенты: Hook Model Habit-Forming Framework (Trigger-Action-VariableReward-Investment)",
      instructions: [
        "Apply core domain tenets for Hook Model Habit-Forming Framework (Trigger-Action-VariableReward-Investment).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hook Model Habit-Forming Framework (Trigger-Action-VariableReward-Investment).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","hook","model"],
    }),
  },

  "frameworks-crossing-the-chasm-technology-adoption-framework": {
    id: "frameworks-crossing-the-chasm-technology-adoption-framework",
    name: "CrossingtheChasmTechnologyAdoptionFrameworkSkill",
    displayName: "Crossing the Chasm Technology Adoption Framework",
    categoryId: "frameworks",
    description: "Guides tech startups transitioning from Early Adopters to Pragmatists.",
    tags: ["frameworks","frameworks","crossing","the"],
    transform: createStandardSkillTransform({
      sectionName: "Crossing the Chasm Technology Adoption Framework Standards",
      ruSectionName: "Стандарты и регламенты: Crossing the Chasm Technology Adoption Framework",
      instructions: [
        "Apply core domain tenets for Crossing the Chasm Technology Adoption Framework.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Crossing the Chasm Technology Adoption Framework.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","crossing","the"],
    }),
  },

  "frameworks-master-framework-architecture-synthesizer": {
    id: "frameworks-master-framework-architecture-synthesizer",
    name: "MasterFrameworkArchitectureSynthesizerSkill",
    displayName: "Master Framework Architecture Synthesizer",
    categoryId: "frameworks",
    description: "Selects and combines optimal management frameworks for complex challenges.",
    tags: ["frameworks","frameworks","master","framework"],
    transform: createStandardSkillTransform({
      sectionName: "Master Framework Architecture Synthesizer Standards",
      ruSectionName: "Стандарты и регламенты: Master Framework Architecture Synthesizer",
      instructions: [
        "Apply core domain tenets for Master Framework Architecture Synthesizer.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Master Framework Architecture Synthesizer.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["frameworks","frameworks","master","framework"],
    }),
  },
  "frameworks-multi-multi-framework-cynefin-decision-making-matrix": {
    id: "frameworks-multi-multi-framework-cynefin-decision-making-matrix",
    name: "MultiFrameworkCynefinDecisionMakingMatrixSkill",
    displayName: "Multi Framework Cynefin Decision Making Matrix",
    categoryId: "frameworks",
    description: "Navigates Clear, Complicated, Complex, Chaotic, and Confusion domains with tailored action steps.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Framework Cynefin Decision Making Matrix",
      ruSectionName: "Композитный Multi-Skill: Multi Framework Cynefin Decision Making Matrix",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Framework Cynefin Decision Making Matrix.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Framework Cynefin Decision Making Matrix.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-stage-wardley-value-chain-mapping-architecture": {
    id: "frameworks-multi-multi-stage-wardley-value-chain-mapping-architecture",
    name: "MultiStageWardleyValueChainMappingArchitectureSkill",
    displayName: "Multi Stage Wardley Value Chain Mapping Architecture",
    categoryId: "frameworks",
    description: "Maps user value chains and component evolution across Genesis, Custom, Product, and Commodity.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Wardley Value Chain Mapping Architecture",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Wardley Value Chain Mapping Architecture",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Wardley Value Chain Mapping Architecture.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Wardley Value Chain Mapping Architecture.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-mckinsey-7s-organizational-audit": {
    id: "frameworks-multi-multi-perspective-mckinsey-7s-organizational-audit",
    name: "MultiPerspectiveMcKinsey7SOrganizationalAuditSkill",
    displayName: "Multi Perspective McKinsey 7S Organizational Audit",
    categoryId: "frameworks",
    description: "Audits Strategy, Structure, Systems, Shared Values, Style, Staff, and Skills alignment.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective McKinsey 7S Organizational Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective McKinsey 7S Organizational Audit",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective McKinsey 7S Organizational Audit.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective McKinsey 7S Organizational Audit.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-dimension-togaf-enterprise-architecture-togaf-adm": {
    id: "frameworks-multi-multi-dimension-togaf-enterprise-architecture-togaf-adm",
    name: "MultiDimensionTOGAFEnterpriseArchitectureTOGAFADMSkill",
    displayName: "Multi Dimension TOGAF Enterprise Architecture TOGAF ADM",
    categoryId: "frameworks",
    description: "Applies Architecture Development Method across Business, Data, Application, and Tech architectures.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Dimension TOGAF Enterprise Architecture TOGAF ADM",
      ruSectionName: "Композитный Multi-Skill: Multi Dimension TOGAF Enterprise Architecture TOGAF ADM",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Dimension TOGAF Enterprise Architecture TOGAF ADM.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Dimension TOGAF Enterprise Architecture TOGAF ADM.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-phase-design-thinking-double-diamond-framework": {
    id: "frameworks-multi-multi-phase-design-thinking-double-diamond-framework",
    name: "MultiPhaseDesignThinkingDoubleDiamondFrameworkSkill",
    displayName: "Multi Phase Design Thinking Double Diamond Framework",
    categoryId: "frameworks",
    description: "Guides Discover, Define, Develop, and Deliver innovation cycles.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Phase Design Thinking Double Diamond Framework",
      ruSectionName: "Композитный Multi-Skill: Multi Phase Design Thinking Double Diamond Framework",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Phase Design Thinking Double Diamond Framework.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Phase Design Thinking Double Diamond Framework.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-layer-safe-scaled-agile-framework-portfolio": {
    id: "frameworks-multi-multi-layer-safe-scaled-agile-framework-portfolio",
    name: "MultiLayerSAFeScaledAgileFrameworkPortfolioSkill",
    displayName: "Multi Layer SAFe Scaled Agile Framework Portfolio",
    categoryId: "frameworks",
    description: "Coordinates Agile Release Trains (ARTs), Program Increments (PIs), and Lean portfolio management.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer SAFe Scaled Agile Framework Portfolio",
      ruSectionName: "Композитный Multi-Skill: Multi Layer SAFe Scaled Agile Framework Portfolio",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer SAFe Scaled Agile Framework Portfolio.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer SAFe Scaled Agile Framework Portfolio.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-porter-five-forces-industry-attractiveness": {
    id: "frameworks-multi-multi-perspective-porter-five-forces-industry-attractiveness",
    name: "MultiPerspectivePorterFiveForcesIndustryAttractivenessSkill",
    displayName: "Multi Perspective Porter Five Forces Industry Attractiveness",
    categoryId: "frameworks",
    description: "Evaluates Supplier Power, Buyer Power, Competitive Rivalry, Substitution, and New Entrants.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Porter Five Forces Industry Attractiveness",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Porter Five Forces Industry Attractiveness",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Porter Five Forces Industry Attractiveness.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Porter Five Forces Industry Attractiveness.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-factor-pestle-macro-environment-audit-framework": {
    id: "frameworks-multi-multi-factor-pestle-macro-environment-audit-framework",
    name: "MultiFactorPESTLEMacroEnvironmentAuditFrameworkSkill",
    displayName: "Multi Factor PESTLE Macro Environment Audit Framework",
    categoryId: "frameworks",
    description: "Audits Political, Economic, Social, Technological, Legal, and Environmental external factors.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor PESTLE Macro Environment Audit Framework",
      ruSectionName: "Композитный Multi-Skill: Multi Factor PESTLE Macro Environment Audit Framework",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Factor PESTLE Macro Environment Audit Framework.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Factor PESTLE Macro Environment Audit Framework.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-layer-six-sigma-dmaic-process-quality-engine": {
    id: "frameworks-multi-multi-layer-six-sigma-dmaic-process-quality-engine",
    name: "MultiLayerSixSigmaDMAICProcessQualityEngineSkill",
    displayName: "Multi Layer Six Sigma DMAIC Process Quality Engine",
    categoryId: "frameworks",
    description: "Applies Define, Measure, Analyze, Improve, and Control statistical defect elimination.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Six Sigma DMAIC Process Quality Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Six Sigma DMAIC Process Quality Engine",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Six Sigma DMAIC Process Quality Engine.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Six Sigma DMAIC Process Quality Engine.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-level-cobit-it-governance-compliance-architecture": {
    id: "frameworks-multi-multi-level-cobit-it-governance-compliance-architecture",
    name: "MultiLevelCOBITITGovernanceComplianceArchitectureSkill",
    displayName: "Multi Level COBIT IT Governance Compliance Architecture",
    categoryId: "frameworks",
    description: "Aligns IT goals with business objectives across Evaluate, Direct, and Monitor governance domains.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level COBIT IT Governance Compliance Architecture",
      ruSectionName: "Композитный Multi-Skill: Multi Level COBIT IT Governance Compliance Architecture",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level COBIT IT Governance Compliance Architecture.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level COBIT IT Governance Compliance Architecture.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-swot-tows-strategic-matrix": {
    id: "frameworks-multi-multi-perspective-swot-tows-strategic-matrix",
    name: "MultiPerspectiveSWOTTOWSStrategicMatrixSkill",
    displayName: "Multi Perspective SWOT TOWS Strategic Matrix",
    categoryId: "frameworks",
    description: "Converts Strengths, Weaknesses, Opportunities, and Threats into actionable TOWS strategy pairs.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective SWOT TOWS Strategic Matrix",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective SWOT TOWS Strategic Matrix",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective SWOT TOWS Strategic Matrix.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective SWOT TOWS Strategic Matrix.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-stage-lean-startup-build-measure-learn-feedback": {
    id: "frameworks-multi-multi-stage-lean-startup-build-measure-learn-feedback",
    name: "MultiStageLeanStartupBuildMeasureLearnFeedbackSkill",
    displayName: "Multi Stage Lean Startup Build Measure Learn Feedback",
    categoryId: "frameworks",
    description: "Runs rapid experiment loops testing Hypotheses via Minimum Viable Products (MVPs).",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Lean Startup Build Measure Learn Feedback",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Lean Startup Build Measure Learn Feedback",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Lean Startup Build Measure Learn Feedback.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Lean Startup Build Measure Learn Feedback.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-level-itil-4-service-value-system-framework": {
    id: "frameworks-multi-multi-level-itil-4-service-value-system-framework",
    name: "MultiLevelITIL4ServiceValueSystemFrameworkSkill",
    displayName: "Multi Level ITIL 4 Service Value System Framework",
    categoryId: "frameworks",
    description: "Coordinates Service Value Chain, 34 Management Practices, and Continual Improvement.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level ITIL 4 Service Value System Framework",
      ruSectionName: "Композитный Multi-Skill: Multi Level ITIL 4 Service Value System Framework",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level ITIL 4 Service Value System Framework.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level ITIL 4 Service Value System Framework.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-factor-ansoff-growth-matrix-strategic-planning": {
    id: "frameworks-multi-multi-factor-ansoff-growth-matrix-strategic-planning",
    name: "MultiFactorAnsoffGrowthMatrixStrategicPlanningSkill",
    displayName: "Multi Factor Ansoff Growth Matrix Strategic Planning",
    categoryId: "frameworks",
    description: "Evaluates Market Penetration, Market Development, Product Development, and Diversification.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Factor Ansoff Growth Matrix Strategic Planning",
      ruSectionName: "Композитный Multi-Skill: Multi Factor Ansoff Growth Matrix Strategic Planning",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Factor Ansoff Growth Matrix Strategic Planning.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Factor Ansoff Growth Matrix Strategic Planning.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-bcg-growth-share-portfolio-matrix": {
    id: "frameworks-multi-multi-perspective-bcg-growth-share-portfolio-matrix",
    name: "MultiPerspectiveBCGGrowthSharePortfolioMatrixSkill",
    displayName: "Multi Perspective BCG Growth Share Portfolio Matrix",
    categoryId: "frameworks",
    description: "Categorizes business units into Stars, Cash Cows, Question Marks, and Dogs.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective BCG Growth Share Portfolio Matrix",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective BCG Growth Share Portfolio Matrix",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective BCG Growth Share Portfolio Matrix.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective BCG Growth Share Portfolio Matrix.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-layer-zachman-enterprise-architecture-framework": {
    id: "frameworks-multi-multi-layer-zachman-enterprise-architecture-framework",
    name: "MultiLayerZachmanEnterpriseArchitectureFrameworkSkill",
    displayName: "Multi Layer Zachman Enterprise Architecture Framework",
    categoryId: "frameworks",
    description: "Fills 6x6 matrix of perspectives (Planner to Worker) against fundamental questions (What, How, Where, Who, When, Why).",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Zachman Enterprise Architecture Framework",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Zachman Enterprise Architecture Framework",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Zachman Enterprise Architecture Framework.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Zachman Enterprise Architecture Framework.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-stage-blue-ocean-strategy-value-innovation": {
    id: "frameworks-multi-multi-stage-blue-ocean-strategy-value-innovation",
    name: "MultiStageBlueOceanStrategyValueInnovationSkill",
    displayName: "Multi Stage Blue Ocean Strategy Value Innovation",
    categoryId: "frameworks",
    description: "Applies Four Actions Framework (Eliminate, Reduce, Raise, Create) opening uncontested market space.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Blue Ocean Strategy Value Innovation",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Blue Ocean Strategy Value Innovation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Blue Ocean Strategy Value Innovation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Blue Ocean Strategy Value Innovation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-jobs-to-be-done-jtbd-outcome-driven": {
    id: "frameworks-multi-multi-perspective-jobs-to-be-done-jtbd-outcome-driven",
    name: "MultiPerspectiveJobsToBeDoneJTBDOutcomeDrivenSkill",
    displayName: "Multi Perspective Jobs To Be Done JTBD Outcome Driven",
    categoryId: "frameworks",
    description: "Uncovers functional, emotional, and social jobs-to-be-done with desired outcome expectations.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Jobs To Be Done JTBD Outcome Driven",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Jobs To Be Done JTBD Outcome Driven",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Jobs To Be Done JTBD Outcome Driven.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Jobs To Be Done JTBD Outcome Driven.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-layer-nist-cybersecurity-framework-csf-2-0": {
    id: "frameworks-multi-multi-layer-nist-cybersecurity-framework-csf-2-0",
    name: "MultiLayerNISTCybersecurityFrameworkCSF20Skill",
    displayName: "Multi Layer NIST Cybersecurity Framework CSF 2 0",
    categoryId: "frameworks",
    description: "Maps cybersecurity controls across Identify, Protect, Detect, Respond, Recover, and Govern.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer NIST Cybersecurity Framework CSF 2 0",
      ruSectionName: "Композитный Multi-Skill: Multi Layer NIST Cybersecurity Framework CSF 2 0",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer NIST Cybersecurity Framework CSF 2 0.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer NIST Cybersecurity Framework CSF 2 0.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-stage-okr-strategic-cascading-objective-engine": {
    id: "frameworks-multi-multi-stage-okr-strategic-cascading-objective-engine",
    name: "MultiStageOKRStrategicCascadingObjectiveEngineSkill",
    displayName: "Multi Stage OKR Strategic Cascading Objective Engine",
    categoryId: "frameworks",
    description: "Aligns ambitious company objectives with measurable key results and quarterly initiatives.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage OKR Strategic Cascading Objective Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Stage OKR Strategic Cascading Objective Engine",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage OKR Strategic Cascading Objective Engine.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage OKR Strategic Cascading Objective Engine.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-value-chain-analysis-primary-support": {
    id: "frameworks-multi-multi-perspective-value-chain-analysis-primary-support",
    name: "MultiPerspectiveValueChainAnalysisPrimarySupportSkill",
    displayName: "Multi Perspective Value Chain Analysis Primary Support",
    categoryId: "frameworks",
    description: "Audits Inbound Logistics, Operations, Outbound Logistics, Marketing, and Service value add.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Value Chain Analysis Primary Support",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Value Chain Analysis Primary Support",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Value Chain Analysis Primary Support.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Value Chain Analysis Primary Support.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-stage-apqc-process-classification-framework-pcf": {
    id: "frameworks-multi-multi-stage-apqc-process-classification-framework-pcf",
    name: "MultiStageAPQCProcessClassificationFrameworkPCFSkill",
    displayName: "Multi Stage APQC Process Classification Framework PCF",
    categoryId: "frameworks",
    description: "Standardizes operating processes using APQC cross-industry benchmark taxonomy.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage APQC Process Classification Framework PCF",
      ruSectionName: "Композитный Multi-Skill: Multi Stage APQC Process Classification Framework PCF",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage APQC Process Classification Framework PCF.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage APQC Process Classification Framework PCF.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-level-coso-enterprise-risk-management-erm": {
    id: "frameworks-multi-multi-level-coso-enterprise-risk-management-erm",
    name: "MultiLevelCOSOEnterpriseRiskManagementERMSkill",
    displayName: "Multi Level COSO Enterprise Risk Management ERM",
    categoryId: "frameworks",
    description: "Aligns governance, risk management, and internal controls using COSO 5-component framework.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level COSO Enterprise Risk Management ERM",
      ruSectionName: "Композитный Multi-Skill: Multi Level COSO Enterprise Risk Management ERM",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level COSO Enterprise Risk Management ERM.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level COSO Enterprise Risk Management ERM.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-vrio-competitive-capability-audit": {
    id: "frameworks-multi-multi-perspective-vrio-competitive-capability-audit",
    name: "MultiPerspectiveVRIOCompetitiveCapabilityAuditSkill",
    displayName: "Multi Perspective VRIO Competitive Capability Audit",
    categoryId: "frameworks",
    description: "Evaluates resources on Value, Rarity, Inimitability, and Organization for sustainable advantage.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective VRIO Competitive Capability Audit",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective VRIO Competitive Capability Audit",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective VRIO Competitive Capability Audit.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective VRIO Competitive Capability Audit.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-stage-capability-maturity-model-integration-cmmi": {
    id: "frameworks-multi-multi-stage-capability-maturity-model-integration-cmmi",
    name: "MultiStageCapabilityMaturityModelIntegrationCMMISkill",
    displayName: "Multi Stage Capability Maturity Model Integration CMMI",
    categoryId: "frameworks",
    description: "Assesses organizational maturity across Initial, Managed, Defined, Quantitatively Managed, and Optimizing.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Capability Maturity Model Integration CMMI",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Capability Maturity Model Integration CMMI",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Capability Maturity Model Integration CMMI.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Capability Maturity Model Integration CMMI.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-crossing-the-chasm-technology-adoption": {
    id: "frameworks-multi-multi-perspective-crossing-the-chasm-technology-adoption",
    name: "MultiPerspectiveCrossingTheChasmTechnologyAdoptionSkill",
    displayName: "Multi Perspective Crossing The Chasm Technology Adoption",
    categoryId: "frameworks",
    description: "Navigates tech adoption lifecycle from Innovators and Early Adopters across the chasm to Mainstream.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Crossing The Chasm Technology Adoption",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Crossing The Chasm Technology Adoption",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Crossing The Chasm Technology Adoption.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Crossing The Chasm Technology Adoption.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-layer-balanced-scorecard-strategy-mapping": {
    id: "frameworks-multi-multi-layer-balanced-scorecard-strategy-mapping",
    name: "MultiLayerBalancedScorecardStrategyMappingSkill",
    displayName: "Multi Layer Balanced Scorecard Strategy Mapping",
    categoryId: "frameworks",
    description: "Maps cause-and-effect financial, customer, process, and learning objectives visually.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Balanced Scorecard Strategy Mapping",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Balanced Scorecard Strategy Mapping",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Balanced Scorecard Strategy Mapping.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Balanced Scorecard Strategy Mapping.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-stage-scor-supply-chain-operations-reference": {
    id: "frameworks-multi-multi-stage-scor-supply-chain-operations-reference",
    name: "MultiStageSCORSupplyChainOperationsReferenceSkill",
    displayName: "Multi Stage SCOR Supply Chain Operations Reference",
    categoryId: "frameworks",
    description: "Standardizes supply chain processes across Plan, Source, Make, Deliver, Return, and Enable.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage SCOR Supply Chain Operations Reference",
      ruSectionName: "Композитный Multi-Skill: Multi Stage SCOR Supply Chain Operations Reference",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage SCOR Supply Chain Operations Reference.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage SCOR Supply Chain Operations Reference.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-mckinsey-horizon-model-innovation": {
    id: "frameworks-multi-multi-perspective-mckinsey-horizon-model-innovation",
    name: "MultiPerspectiveMcKinseyHorizonModelInnovationSkill",
    displayName: "Multi Perspective McKinsey Horizon Model Innovation",
    categoryId: "frameworks",
    description: "Allocates innovation budget across Horizon 1 core, Horizon 2 emerging, and Horizon 3 future bets.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective McKinsey Horizon Model Innovation",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective McKinsey Horizon Model Innovation",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective McKinsey Horizon Model Innovation.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective McKinsey Horizon Model Innovation.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-layer-iso-9001-quality-management-system-qms": {
    id: "frameworks-multi-multi-layer-iso-9001-quality-management-system-qms",
    name: "MultiLayerISO9001QualityManagementSystemQMSSkill",
    displayName: "Multi Layer ISO 9001 Quality Management System QMS",
    categoryId: "frameworks",
    description: "Establishes Plan-Do-Check-Act (PDCA) quality management controls and audit documentation.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer ISO 9001 Quality Management System QMS",
      ruSectionName: "Композитный Multi-Skill: Multi Layer ISO 9001 Quality Management System QMS",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer ISO 9001 Quality Management System QMS.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer ISO 9001 Quality Management System QMS.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-kano-model-feature-satisfaction-matrix": {
    id: "frameworks-multi-multi-perspective-kano-model-feature-satisfaction-matrix",
    name: "MultiPerspectiveKanoModelFeatureSatisfactionMatrixSkill",
    displayName: "Multi Perspective Kano Model Feature Satisfaction Matrix",
    categoryId: "frameworks",
    description: "Classifies features into Basic, Performance, Excitement, Indifferent, and Reverse expectations.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Kano Model Feature Satisfaction Matrix",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Kano Model Feature Satisfaction Matrix",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Kano Model Feature Satisfaction Matrix.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Kano Model Feature Satisfaction Matrix.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-stage-lean-canvas-one-page-startup-model": {
    id: "frameworks-multi-multi-stage-lean-canvas-one-page-startup-model",
    name: "MultiStageLeanCanvasOnePageStartupModelSkill",
    displayName: "Multi Stage Lean Canvas One Page Startup Model",
    categoryId: "frameworks",
    description: "Formulates problem, solution, key metrics, unique value proposition, channels, and cost structure.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Lean Canvas One Page Startup Model",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Lean Canvas One Page Startup Model",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Lean Canvas One Page Startup Model.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Lean Canvas One Page Startup Model.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-level-prince2-project-governance-framework": {
    id: "frameworks-multi-multi-level-prince2-project-governance-framework",
    name: "MultiLevelPRINCE2ProjectGovernanceFrameworkSkill",
    displayName: "Multi Level PRINCE2 Project Governance Framework",
    categoryId: "frameworks",
    description: "Manages projects via stage gates, business case justification, and tolerance thresholds.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Level PRINCE2 Project Governance Framework",
      ruSectionName: "Композитный Multi-Skill: Multi Level PRINCE2 Project Governance Framework",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Level PRINCE2 Project Governance Framework.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Level PRINCE2 Project Governance Framework.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-flywheel-effect-growth-engine": {
    id: "frameworks-multi-multi-perspective-flywheel-effect-growth-engine",
    name: "MultiPerspectiveFlywheelEffectGrowthEngineSkill",
    displayName: "Multi Perspective Flywheel Effect Growth Engine",
    categoryId: "frameworks",
    description: "Designs self-reinforcing business flywheels where each component accelerates momentum.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Flywheel Effect Growth Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Flywheel Effect Growth Engine",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Flywheel Effect Growth Engine.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Flywheel Effect Growth Engine.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-layer-archimate-enterprise-modeling-standard": {
    id: "frameworks-multi-multi-layer-archimate-enterprise-modeling-standard",
    name: "MultiLayerArchimateEnterpriseModelingStandardSkill",
    displayName: "Multi Layer Archimate Enterprise Modeling Standard",
    categoryId: "frameworks",
    description: "Drafts standardized Archimate diagrams across Business, Application, and Technology layers.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Archimate Enterprise Modeling Standard",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Archimate Enterprise Modeling Standard",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Archimate Enterprise Modeling Standard.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Archimate Enterprise Modeling Standard.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-stage-pmbok-7th-edition-performance-domains": {
    id: "frameworks-multi-multi-stage-pmbok-7th-edition-performance-domains",
    name: "MultiStagePMBOK7thEditionPerformanceDomainsSkill",
    displayName: "Multi Stage PMBOK 7th Edition Performance Domains",
    categoryId: "frameworks",
    description: "Aligns project delivery across Stakeholders, Team, Development Approach, Planning, and Value.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage PMBOK 7th Edition Performance Domains",
      ruSectionName: "Композитный Multi-Skill: Multi Stage PMBOK 7th Edition Performance Domains",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage PMBOK 7th Edition Performance Domains.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage PMBOK 7th Edition Performance Domains.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-horizon-scanning-weak-signal-detection": {
    id: "frameworks-multi-multi-perspective-horizon-scanning-weak-signal-detection",
    name: "MultiPerspectiveHorizonScanningWeakSignalDetectionSkill",
    displayName: "Multi Perspective Horizon Scanning Weak Signal Detection",
    categoryId: "frameworks",
    description: "Scans emerging technology and societal signals for early strategic disruption warning.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Horizon Scanning Weak Signal Detection",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Horizon Scanning Weak Signal Detection",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Horizon Scanning Weak Signal Detection.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Horizon Scanning Weak Signal Detection.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-layer-iso-27001-information-security-controls": {
    id: "frameworks-multi-multi-layer-iso-27001-information-security-controls",
    name: "MultiLayerISO27001InformationSecurityControlsSkill",
    displayName: "Multi Layer ISO 27001 Information Security Controls",
    categoryId: "frameworks",
    description: "Applies Annex A security controls establishing an Information Security Management System (ISMS).",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer ISO 27001 Information Security Controls",
      ruSectionName: "Композитный Multi-Skill: Multi Layer ISO 27001 Information Security Controls",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer ISO 27001 Information Security Controls.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer ISO 27001 Information Security Controls.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-stage-kotter-8-step-organizational-change": {
    id: "frameworks-multi-multi-stage-kotter-8-step-organizational-change",
    name: "MultiStageKotter8StepOrganizationalChangeSkill",
    displayName: "Multi Stage Kotter 8 Step Organizational Change",
    categoryId: "frameworks",
    description: "Executes urgency creation, guiding coalition, vision communication, quick wins, and cultural anchor.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Kotter 8 Step Organizational Change",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Kotter 8 Step Organizational Change",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Kotter 8 Step Organizational Change.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Kotter 8 Step Organizational Change.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-ge-mckinsey-9-box-matrix-investment": {
    id: "frameworks-multi-multi-perspective-ge-mckinsey-9-box-matrix-investment",
    name: "MultiPerspectiveGEMcKinsey9BoxMatrixInvestmentSkill",
    displayName: "Multi Perspective GE McKinsey 9 Box Matrix Investment",
    categoryId: "frameworks",
    description: "Evaluates business units based on Industry Attractiveness vs Competitive Business Unit Strength.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective GE McKinsey 9 Box Matrix Investment",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective GE McKinsey 9 Box Matrix Investment",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective GE McKinsey 9 Box Matrix Investment.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective GE McKinsey 9 Box Matrix Investment.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-layer-aws-well-architected-framework-review": {
    id: "frameworks-multi-multi-layer-aws-well-architected-framework-review",
    name: "MultiLayerAWSWellArchitectedFrameworkReviewSkill",
    displayName: "Multi Layer AWS Well Architected Framework Review",
    categoryId: "frameworks",
    description: "Evaluates cloud workloads across Operational Excellence, Security, Reliability, Performance, Cost, and Sustainability.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer AWS Well Architected Framework Review",
      ruSectionName: "Композитный Multi-Skill: Multi Layer AWS Well Architected Framework Review",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer AWS Well Architected Framework Review.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer AWS Well Architected Framework Review.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-stage-waterfall-agile-hybrid-project-governance": {
    id: "frameworks-multi-multi-stage-waterfall-agile-hybrid-project-governance",
    name: "MultiStageWaterfallAgileHybridProjectGovernanceSkill",
    displayName: "Multi Stage Waterfall Agile Hybrid Project Governance",
    categoryId: "frameworks",
    description: "Combines Stage-Gate fixed budgeting with iterative Scrum sprint execution.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Waterfall Agile Hybrid Project Governance",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Waterfall Agile Hybrid Project Governance",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Waterfall Agile Hybrid Project Governance.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Waterfall Agile Hybrid Project Governance.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-customer-experience-journey-mapping": {
    id: "frameworks-multi-multi-perspective-customer-experience-journey-mapping",
    name: "MultiPerspectiveCustomerExperienceJourneyMappingSkill",
    displayName: "Multi Perspective Customer Experience Journey Mapping",
    categoryId: "frameworks",
    description: "Maps customer touchpoints, emotional highs/lows, friction points, and improvement ideas.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Customer Experience Journey Mapping",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Customer Experience Journey Mapping",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Customer Experience Journey Mapping.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Customer Experience Journey Mapping.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-layer-zero-trust-architecture-zta-principles": {
    id: "frameworks-multi-multi-layer-zero-trust-architecture-zta-principles",
    name: "MultiLayerZeroTrustArchitectureZTAPrinciplesSkill",
    displayName: "Multi Layer Zero Trust Architecture ZTA Principles",
    categoryId: "frameworks",
    description: "Applies Never Trust, Always Verify, Least Privilege, and Assume Breach security frameworks.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer Zero Trust Architecture ZTA Principles",
      ruSectionName: "Композитный Multi-Skill: Multi Layer Zero Trust Architecture ZTA Principles",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer Zero Trust Architecture ZTA Principles.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer Zero Trust Architecture ZTA Principles.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-stage-spotify-engineering-culture-model-squads": {
    id: "frameworks-multi-multi-stage-spotify-engineering-culture-model-squads",
    name: "MultiStageSpotifyEngineeringCultureModelSquadsSkill",
    displayName: "Multi Stage Spotify Engineering Culture Model Squads",
    categoryId: "frameworks",
    description: "Coordinates autonomous Squads, Tribes, Chapters, and Guilds for agile delivery.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Spotify Engineering Culture Model Squads",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Spotify Engineering Culture Model Squads",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Spotify Engineering Culture Model Squads.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Spotify Engineering Culture Model Squads.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-scenario-planning-shell-method": {
    id: "frameworks-multi-multi-perspective-scenario-planning-shell-method",
    name: "MultiPerspectiveScenarioPlanningShellMethodSkill",
    displayName: "Multi Perspective Scenario Planning Shell Method",
    categoryId: "frameworks",
    description: "Constructs plausible future scenarios testing strategic resilience against high uncertainty.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Scenario Planning Shell Method",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Scenario Planning Shell Method",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Scenario Planning Shell Method.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Scenario Planning Shell Method.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-layer-iso-31000-risk-management-guidelines": {
    id: "frameworks-multi-multi-layer-iso-31000-risk-management-guidelines",
    name: "MultiLayerISO31000RiskManagementGuidelinesSkill",
    displayName: "Multi Layer ISO 31000 Risk Management Guidelines",
    categoryId: "frameworks",
    description: "Establishes risk assessment, risk treatment, risk reporting, and risk governance cycles.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer ISO 31000 Risk Management Guidelines",
      ruSectionName: "Композитный Multi-Skill: Multi Layer ISO 31000 Risk Management Guidelines",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer ISO 31000 Risk Management Guidelines.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer ISO 31000 Risk Management Guidelines.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-stage-3c-model-ohmae-strategic-triangle": {
    id: "frameworks-multi-multi-stage-3c-model-ohmae-strategic-triangle",
    name: "MultiStage3CModelOhmaeStrategicTriangleSkill",
    displayName: "Multi Stage 3C Model Ohmae Strategic Triangle",
    categoryId: "frameworks",
    description: "Aligns strategic positioning across Corporation, Customer, and Competitors.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage 3C Model Ohmae Strategic Triangle",
      ruSectionName: "Композитный Multi-Skill: Multi Stage 3C Model Ohmae Strategic Triangle",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage 3C Model Ohmae Strategic Triangle.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage 3C Model Ohmae Strategic Triangle.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-value-proposition-design-strategyzer": {
    id: "frameworks-multi-multi-perspective-value-proposition-design-strategyzer",
    name: "MultiPerspectiveValuePropositionDesignStrategyzerSkill",
    displayName: "Multi Perspective Value Proposition Design Strategyzer",
    categoryId: "frameworks",
    description: "Fits Customer Profile (pains, gains, jobs) with Value Map (products, pain relievers, gain creators).",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Value Proposition Design Strategyzer",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Value Proposition Design Strategyzer",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Value Proposition Design Strategyzer.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Value Proposition Design Strategyzer.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-layer-dama-dmbok-data-management-framework": {
    id: "frameworks-multi-multi-layer-dama-dmbok-data-management-framework",
    name: "MultiLayerDAMADMBOKDataManagementFrameworkSkill",
    displayName: "Multi Layer DAMA DMBOK Data Management Framework",
    categoryId: "frameworks",
    description: "Coordinates 11 data management knowledge areas from Architecture to Data Quality.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer DAMA DMBOK Data Management Framework",
      ruSectionName: "Композитный Multi-Skill: Multi Layer DAMA DMBOK Data Management Framework",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer DAMA DMBOK Data Management Framework.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer DAMA DMBOK Data Management Framework.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-stage-lean-manufacturing-5s-housekeeping-kaizen": {
    id: "frameworks-multi-multi-stage-lean-manufacturing-5s-housekeeping-kaizen",
    name: "MultiStageLeanManufacturing5SHousekeepingKaizenSkill",
    displayName: "Multi Stage Lean Manufacturing 5S Housekeeping Kaizen",
    categoryId: "frameworks",
    description: "Implements Sort, Set in order, Shine, Standardize, and Sustain continuous improvement.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Lean Manufacturing 5S Housekeeping Kaizen",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Lean Manufacturing 5S Housekeeping Kaizen",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Lean Manufacturing 5S Housekeeping Kaizen.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Lean Manufacturing 5S Housekeeping Kaizen.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-hook-model-behavioral-engagement": {
    id: "frameworks-multi-multi-perspective-hook-model-behavioral-engagement",
    name: "MultiPerspectiveHookModelBehavioralEngagementSkill",
    displayName: "Multi Perspective Hook Model Behavioral Engagement",
    categoryId: "frameworks",
    description: "Structures user engagement loops via Trigger, Action, Variable Reward, and Investment.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Hook Model Behavioral Engagement",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Hook Model Behavioral Engagement",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Hook Model Behavioral Engagement.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Hook Model Behavioral Engagement.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-layer-cis-critical-security-controls-v8": {
    id: "frameworks-multi-multi-layer-cis-critical-security-controls-v8",
    name: "MultiLayerCISCriticalSecurityControlsv8Skill",
    displayName: "Multi Layer CIS Critical Security Controls v8",
    categoryId: "frameworks",
    description: "Applies 18 prioritized cybersecurity safeguard controls for enterprise defense.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer CIS Critical Security Controls v8",
      ruSectionName: "Композитный Multi-Skill: Multi Layer CIS Critical Security Controls v8",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer CIS Critical Security Controls v8.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer CIS Critical Security Controls v8.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-stage-scrum-at-scale-scaled-architecture": {
    id: "frameworks-multi-multi-stage-scrum-at-scale-scaled-architecture",
    name: "MultiStageScrumatScaleScaledArchitectureSkill",
    displayName: "Multi Stage Scrum at Scale Scaled Architecture",
    categoryId: "frameworks",
    description: "Coordinates Scrum-of-Scrums and Executive Action Teams for enterprise scale.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage Scrum at Scale Scaled Architecture",
      ruSectionName: "Композитный Multi-Skill: Multi Stage Scrum at Scale Scaled Architecture",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage Scrum at Scale Scaled Architecture.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage Scrum at Scale Scaled Architecture.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-adkar-change-readiness-assessment": {
    id: "frameworks-multi-multi-perspective-adkar-change-readiness-assessment",
    name: "MultiPerspectiveADKARChangeReadinessAssessmentSkill",
    displayName: "Multi Perspective ADKAR Change Readiness Assessment",
    categoryId: "frameworks",
    description: "Measures organizational Awareness, Desire, Knowledge, Ability, and Reinforcement score.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective ADKAR Change Readiness Assessment",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective ADKAR Change Readiness Assessment",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective ADKAR Change Readiness Assessment.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective ADKAR Change Readiness Assessment.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-layer-c4-architecture-software-diagramming": {
    id: "frameworks-multi-multi-layer-c4-architecture-software-diagramming",
    name: "MultiLayerC4ArchitectureSoftwareDiagrammingSkill",
    displayName: "Multi Layer C4 Architecture Software Diagramming",
    categoryId: "frameworks",
    description: "Renders architecture views across Context, Container, Component, and Code levels.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer C4 Architecture Software Diagramming",
      ruSectionName: "Композитный Multi-Skill: Multi Layer C4 Architecture Software Diagramming",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer C4 Architecture Software Diagramming.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer C4 Architecture Software Diagramming.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-stage-raci-responsibility-assignment-matrix": {
    id: "frameworks-multi-multi-stage-raci-responsibility-assignment-matrix",
    name: "MultiStageRACIResponsibilityAssignmentMatrixSkill",
    displayName: "Multi Stage RACI Responsibility Assignment Matrix",
    categoryId: "frameworks",
    description: "Defines Responsible, Accountable, Consulted, and Informed roles across project deliverables.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Stage RACI Responsibility Assignment Matrix",
      ruSectionName: "Композитный Multi-Skill: Multi Stage RACI Responsibility Assignment Matrix",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Stage RACI Responsibility Assignment Matrix.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Stage RACI Responsibility Assignment Matrix.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-perspective-hambrick-fredrickson-strategy-diamond": {
    id: "frameworks-multi-multi-perspective-hambrick-fredrickson-strategy-diamond",
    name: "MultiPerspectiveHambrickFredricksonStrategyDiamondSkill",
    displayName: "Multi Perspective Hambrick Fredrickson Strategy Diamond",
    categoryId: "frameworks",
    description: "Aligns Arenas, Vehicles, Differentiators, Staging, and Economic Logic into a strategy diamond.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Perspective Hambrick Fredrickson Strategy Diamond",
      ruSectionName: "Композитный Multi-Skill: Multi Perspective Hambrick Fredrickson Strategy Diamond",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Perspective Hambrick Fredrickson Strategy Diamond.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Perspective Hambrick Fredrickson Strategy Diamond.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-layer-iso-22301-business-continuity-management": {
    id: "frameworks-multi-multi-layer-iso-22301-business-continuity-management",
    name: "MultiLayerISO22301BusinessContinuityManagementSkill",
    displayName: "Multi Layer ISO 22301 Business Continuity Management",
    categoryId: "frameworks",
    description: "Establishes Business Impact Analysis (BIA), disaster recovery plans, and crisis drills.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Layer ISO 22301 Business Continuity Management",
      ruSectionName: "Композитный Multi-Skill: Multi Layer ISO 22301 Business Continuity Management",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Layer ISO 22301 Business Continuity Management.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Layer ISO 22301 Business Continuity Management.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },

  "frameworks-multi-multi-horizon-master-strategic-framework-engine": {
    id: "frameworks-multi-multi-horizon-master-strategic-framework-engine",
    name: "MultiHorizonMasterStrategicFrameworkEngineSkill",
    displayName: "Multi Horizon Master Strategic Framework Engine",
    categoryId: "frameworks",
    description: "Enforces master alignment across enterprise frameworks, competitive strategy, and execution methodologies.",
    tags: ["frameworks","multi-skill","frameworks-multi"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Skill: Multi Horizon Master Strategic Framework Engine",
      ruSectionName: "Композитный Multi-Skill: Multi Horizon Master Strategic Framework Engine",
      instructions: [
        "Phase 1: Setup frameworks, constraints, and initial inputs for Multi Horizon Master Strategic Framework Engine.",
        "Phase 2: Multi-perspective analysis, generation, or verification pipeline.",
        "Phase 3: Synthesize output into structured format with validated criteria."
],
      ruInstructions: [
        "Этап 1: Инициализация фреймворков, ограничений и исходных данных для Multi Horizon Master Strategic Framework Engine.",
        "Этап 2: Многоаспектный анализ, генерация или конвейер проверки.",
        "Этап 3: Синтез результата в структурированный формат с валидацией критериев."
],
      semanticType: "process_directive",
      tags: ["frameworks","multi-skill","frameworks-multi"],
    }),
  },
};

