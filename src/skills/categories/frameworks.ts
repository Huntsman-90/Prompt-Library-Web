import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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
};
