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
};

