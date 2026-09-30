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
};

