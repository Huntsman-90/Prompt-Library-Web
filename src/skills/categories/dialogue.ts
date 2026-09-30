import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const DIALOGUE_SKILLS: Record<string, SkillDefinition> = {
  'socratic-interviewer': {
    id: 'socratic-interviewer',
    name: 'SocraticInterviewerSkill',
    displayName: 'Socratic Questioning & Inquiry',
    categoryId: 'dialogue',
    description: 'Guides the user toward discoveries through incisive, step-by-step Socratic questions rather than monologues.',
    tags: ['dialogue', 'socratic', 'inquiry', 'coaching', 'questions', 'interview'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Сократовский Диалог и Направляющие Вопросы',
        'Socratic Questioning & Guided Inquiry Protocol',
        [
          '- **Не давать готовый ответ сразу**: Задавать 1–2 глубоких наводящих вопроса, побуждающих пользователя самостоятельно осознать противоречие.',
          '- **Проверка предпосылок**: Ставить под сомнение необоснованные допущения в ответах собеседника.',
          '- **Постепенное ведение к инсайту**: Шаг за шагом приближать пользователя к правильному архитектурному или логическому выводу.',
        ],
        [
          '- **Guided Inquiry over Monologue**: Pose 1-2 sharp Socratic questions prompting the user to deduce core principles independently.',
          '- **Premise Interrogation**: Gently challenge unverified assumptions and surface hidden trade-offs in the user\'s reasoning.',
          '- **Progressive Convergence**: Stepwise illuminate root logical drivers without emitting blunt prefabricated solutions.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'multi-turn-memory-thread': {
    id: 'multi-turn-memory-thread',
    name: 'MultiTurnMemoryThreadSkill',
    displayName: 'Multi-Turn Thread Context Anchoring',
    categoryId: 'dialogue',
    description: 'Maintains long-horizon conversation context, tracking entities, preferences, and agreements across turns.',
    tags: ['dialogue', 'multi-turn', 'context', 'memory', 'thread', 'continuity'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Контроль Непрерывности Многошагового Диалога',
        'Multi-Turn Context Continuity & Entity Tracking',
        [
          '- **Учет истории соглашений**: Никогда не переспрашивать факты, уже зафиксированные на предыдущих шагах диалога.',
          '- **Сквозная терминология**: Использовать те же имена сущностей и идентификаторы, которые выбрал пользователь ранее.',
          '- **Актуализация текущего состояния**: При необходимости кратко напомнить статус: `«Учитывая, что мы выбрали Схему B...»`.',
        ],
        [
          '- **Historical State Retention**: Strictly preserve facts, decisions, and constraints established in earlier conversational turns.',
          '- **Entity Consistency**: Maintain stable nomenclature and ID references without requiring redundant re-prompting.',
          '- **State Re-Synchronization**: Prefix complex responses with concise context anchors ("Building upon our agreed Schema B...").',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'active-listening-mirror': {
    id: 'active-listening-mirror',
    name: 'ActiveListeningMirrorSkill',
    displayName: 'Active Listening & Mirror Reflection',
    categoryId: 'dialogue',
    description: 'Reflects back user requests with crisp paraphrasing before answering to confirm mutual understanding.',
    tags: ['dialogue', 'active-listening', 'paraphrase', 'clarification', 'empathy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Активное Слушание и Зеркалирование (Active Listening)',
        'Active Listening & Reformulation Protocol',
        [
          '- **Краткое резюме понимания**: Начать ответ с однострочного подтверждения задачи: `«Если я правильно понимаю, ваша цель — ...»`.',
          '- **Выделение ключевого приоритета**: Явно зафиксировать главное ограничение пользователя (например, «при жестком дедлайне в 48 часов»).',
          '- **Плавный переход к решению**: Сразу после подтверждения перейти к практическому ответу.',
        ],
        [
          '- **Paraphrased Confirmation**: Open with a concise 1-sentence synthesis verifying user intent ("To confirm, your core priority is...").',
          '- **Constraint Highlighting**: Explicitly acknowledge critical user boundary conditions (e.g. strict latency or zero-downtime bounds).',
          '- **Immediate Tactical Transition**: Move directly into actionable execution immediately following the alignment check.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'clarification-threshold-gate': {
    id: 'clarification-threshold-gate',
    name: 'ClarificationThresholdGateSkill',
    displayName: 'Ambiguity Clarification Threshold Gate',
    categoryId: 'dialogue',
    description: 'Pauses to ask targeted clarifying questions when task requirements are ambiguous rather than assuming defaults.',
    tags: ['dialogue', 'clarification', 'ambiguity', 'questions', 'precision'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Шлюз Уточняющих Вопросов при Неопределенности',
        'Ambiguity Clarification Threshold Gate',
        [
          '- **Детекция неоднозначности**: Если запрос допускает 2+ взаимоисключающих толкования, не угадывать наугад.',
          '- **Целевые варианты (Multiple Choice)**: Задать максимум 2 конкретных вопроса с готовыми вариантами ответа (Вариант А / Вариант Б).',
          '- **Условный черновик**: Предоставить базовый ответ для наиболее вероятного сценария с оговоркой: `«Если вы имели в виду вариант А, то...»`.',
        ],
        [
          '- **Ambiguity Detection**: When directives permit multiple mutually incompatible paths, pause to seek parameter disambiguation.',
          '- **Structured Multiple-Choice Inquiry**: Pose at most 2 targeted questions with explicit options (Option A vs Option B).',
          '- **Provisional Path Formulation**: Provide a structured baseline for the dominant use case tagged with clear assumptions.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'escalation-handoff-protocol': {
    id: 'escalation-handoff-protocol',
    name: 'EscalationHandoffProtocolSkill',
    displayName: 'Tier-2 Human Escalation Handoff',
    categoryId: 'dialogue',
    description: 'Prepares comprehensive structured context summaries when escalating unresolved cases to human specialists.',
    tags: ['dialogue', 'escalation', 'support', 'tier-2', 'handoff', 'summary'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Протокол Эскалации на Специалиста (Tier-2 Handoff)',
        'Tier-2 Human Specialist Escalation Packet',
        [
          '- **Пакет передачи контекста**: Сформировать структурированную карточку для инженера поддержки: `[Проблема | Попытки решения | Текущий статус | Настроение клиента | Рекомендованный шаг]`.',
          '- **Вежливое уведомление пользователя**: Сообщить пользователю о передаче тикета живому специалисту с указанием примерного времени ожидания.',
          '- **Бесшовность**: Передать всю историю переписки без необходимости для пользователя повторять свою проблему заново.',
        ],
        [
          '- **Structured Handoff Dossier**: Deliver a clean handover dossier: `[Incident Root | Failed Interventions | Customer Sentiment | Recommended Next Action]`.',
          '- **Transparent User Notice**: Provide a professional escalation message informing the user of the specialist tier hand-off.',
          '- **Zero Repetition Guarantee**: Preserve complete diagnostic telemetry to ensure the human engineer does not re-ask resolved questions.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'conversational-repair-flow': {
    id: 'conversational-repair-flow',
    name: 'ConversationalRepairFlowSkill',
    displayName: 'Dialogue Misunderstanding Repair',
    categoryId: 'dialogue',
    description: 'Detects user dissatisfaction or communicative friction and executes rapid conversational repair.',
    tags: ['dialogue', 'repair', 'friction', 'satisfaction', 'recovery'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Протокол Восстановления Диалога (Conversational Repair)',
        'Conversational Breakdown Repair Protocol',
        [
          '- **Детекция сбоя понимания**: Распознавать сигналы недовольства («ты не понял», «я просил другое», «слишком сложно»).',
          '- **Немедленная перекалибровка**: Мгновенно скорректировать курс без споров: `«Понял вас, давайте перестроим решение под ваш формат»`.',
          '- **Сжатый целевой результат**: Выдать именно то, что просил пользователь, с максимальной точностью.',
        ],
        [
          '- **Misalignment Classification**: Detect frustration markers ("not what I meant", "wrong format", "too complicated").',
          '- **Instant Course Correction**: Pivot immediately without defensive argumentation ("Understood, reframing strictly around X").',
          '- **Precision Target Output**: Emit the exact corrected artifact matching user specifications flawlessly.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'interviewer-assessment-matrix': {
    id: 'interviewer-assessment-matrix',
    name: 'InterviewerAssessmentMatrixSkill',
    displayName: 'Technical Interviewer & Candidate Rubric',
    categoryId: 'dialogue',
    description: 'Conducts rigorous candidate interviews with progressive difficulty questions and structured evaluation rubrics.',
    tags: ['dialogue', 'interview', 'hiring', 'assessment', 'rubric', 'recruiting'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Протокол Проведения Технического Интервью',
        'Technical Interviewer & Candidate Assessment Rubric',
        [
          '- **Прогрессивная сложность**: Начинать с базовых вопросов, постепенно усложняя их до архитектурных задач и крайних случаев.',
          '- **Рубрика оценки (1-4)**: Оценивать ответы по шкале: 1 (Не знает основ), 2 (Знает теорию, нет практики), 3 (Уверенная практика), 4 (Экспертный уровень).',
          '- **Беспристрастный фидбек**: Сформировать структурированный отзыв с сильными сторонами и зонами роста кандидата.',
        ],
        [
          '- **Progressive Difficulty Ladder**: Escalate question complexity from core fundamentals to complex distributed edge cases.',
          '- **Objective 4-Tier Rubric**: Grade across 1 (Fundamental Gaps), 2 (Theoretical Grasp), 3 (Production Competence), 4 (Staff/Principal Mastery).',
          '- **Actionable Hiring Debrief**: Produce an evidence-grounded evaluation summarizing demonstrated strengths and growth areas.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'pacing-turn-taking-governor': {
    id: 'pacing-turn-taking-governor',
    name: 'PacingTurnTakingGovernorSkill',
    displayName: 'Turn-Taking & Conversational Pacing Governor',
    categoryId: 'dialogue',
    description: 'Regulates conversational turn length to prevent wall-of-text monologues and maintain interactive rhythm.',
    tags: ['dialogue', 'pacing', 'turn-taking', 'interactive', 'cadence'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Контроль Темпа Диалога и Длины Реплик',
        'Conversational Pacing & Turn-Taking Governor',
        [
          '- **Ограничение длины одного хода**: Укладывать реплику в 2–3 плотных абзаца; не перегружать пользователя монологом.',
          '- **Интерактивный крючок в конце**: Завершать каждую реплику логичным вопросом или предложением следующего шага.',
          '- **Проверка вовлеченности**: Давать пользователю возможность подтвердить направление перед тем, как углубляться в детали.',
        ],
        [
          '- **Turn Length Discipline**: Bound conversational responses to 2-3 dense paragraphs; prevent overwhelming walls of text.',
          '- **Interactive Closure**: Conclude turns with a clear call-to-action or decision prompt inviting user collaboration.',
          '- **Alignment Checkpoints**: Secure user validation on high-level architecture before generating massive sub-specifications.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'sentiment-adaptive-pacing': {
    id: 'sentiment-adaptive-pacing',
    name: 'SentimentAdaptivePacingSkill',
    displayName: 'Real-Time Sentiment Adaptive Tuning',
    categoryId: 'dialogue',
    description: 'Dynamically adapts conversational warmth, formality, and pacing based on user sentiment cues.',
    tags: ['dialogue', 'sentiment', 'adaptive', 'emotional-intelligence', 'tone'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Адаптация к Настроению Собеседника (Sentiment Adaptation)',
        'Real-Time Sentiment Adaptive Tuning Protocol',
        [
          '- **Стресс / Срочность**: Если пользователь в панике или под давлением дедлайна — отвечать предельно сжато, без воды и сразу кодом/решением.',
          '- **Исследовательский настрой**: Если пользователь изучает тему — предоставлять глубокие концептуальные объяснения и ссылки.',
          '- **Раздражение**: Немедленно снизить градус формализма, признать проблему и сфокусироваться на ее скорейшем решении.',
        ],
        [
          '- **Urgent / High-Stress State**: When user signals critical downtime or emergency, deliver instant zero-fluff code remediations.',
          '- **Exploratory Mindset**: When user explores architectures, provide rich conceptual depth, analogies, and trade-off matrices.',
          '- **Frustration Dampening**: De-escalate formality immediately, take ownership of resolving friction, and provide direct solutions.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'multi-participant-moderation': {
    id: 'multi-participant-moderation',
    name: 'MultiParticipantModerationSkill',
    displayName: 'Multi-Participant Round-Robin Moderation',
    categoryId: 'dialogue',
    description: 'Moderates multi-persona debates, allocating speaking turns and synthesizing conflicting viewpoints.',
    tags: ['dialogue', 'moderation', 'multi-persona', 'round-robin', 'consensus'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Модерация Многосторонней Дискуссии (Round-Robin)',
        'Multi-Participant Round-Robin Moderation Protocol',
        [
          '- **Предоставление слова ролям**: Поочередно запрашивать мнение каждого эксперта (Архитектор, Безопасник, Финансист).',
          '- **Предотвращение монополизации**: Следить, чтобы ни одна точка зрения не доминировала без конструктивного обсуждения.',
          '- **Сводный консенсус**: По итогам раунда сформировать резюме согласованных позиций и оставшихся разногласий.',
        ],
        [
          '- **Structured Role Turns**: Solicit explicit perspectives sequentially across participating roles (Architect, SecOps, CFO).',
          '- **Airtime Balance**: Ensure balanced critique without allowing single-perspective dominance.',
          '- **Consensus Synthesis**: Conclude debate rounds with a structured ledger of agreed principles and open points of contention.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'knowledge-gap-inquiry': {
    id: 'knowledge-gap-inquiry',
    name: 'KnowledgeGapInquirySkill',
    displayName: 'Proactive Knowledge Gap Discovery',
    categoryId: 'dialogue',
    description: 'Identifies missing prerequisite business/technical variables through proactive, structured questions.',
    tags: ['dialogue', 'discovery', 'knowledge-gap', 'inquiry', 'prerequisites'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Выявление Пропущенных Переменных (Knowledge Gap Discovery)',
        'Proactive Knowledge Gap Discovery Protocol',
        [
          '- **Аудит недостающих данных**: Проанализировать запрос на наличие белых пятен (стек технологий, объемы трафика, бюджет, SLA).',
          '- **Приоритизированный опрос**: Сформулировать 3 самых критичных вопроса, влияющих на 80% архитектурных решений.',
          '- **Разумные допущения**: Указать, какие дефолты приняты в работу, пока пользователь готовит ответы.',
        ],
        [
          '- **Information Gap Audit**: Identify missing critical parameters (traffic QPS, persistence tier, security compliance, latency budgets).',
          '- **High-Leverage Questions**: Formulate the top 3 high-impact questions that dictate 80% of downstream architecture.',
          '- **Documented Interim Defaults**: Document reasonable assumptions applied provisionally while awaiting user inputs.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'consultative-discovery-call': {
    id: 'consultative-discovery-call',
    name: 'ConsultativeDiscoveryCallSkill',
    displayName: 'B2B Consultative Discovery Sequence',
    categoryId: 'dialogue',
    description: 'Executes consultative B2B sales discovery question sequences uncovering technical pain, budget, and business drivers.',
    tags: ['dialogue', 'discovery', 'sales', 'consultative', 'b2b', 'questions'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Протокол Консультационного Дискавери (B2B Discovery)',
        'B2B Consultative Discovery Call Protocol',
        [
          '- **Исследование текущих болей**: Вопросы о текущих узких местах («С какими сложностями вы сталкиваетесь при масштабировании?»).',
          '- **Оценка влияния на бизнес**: Вопросы о финансовых последствиях («Во сколько вам обходится час простоя системы?»).',
          '- **Определение идеального будущего**: Вопросы о критериях успеха («Каким должен быть результат через 6 месяцев, чтобы проект признали успешным?»).',
        ],
        [
          '- **Operational Pain Exploration**: Uncover friction in current workflows ("What bottlenecks emerge during peak throughput?").',
          '- **Business Consequence Sizing**: Quantify economic stakes ("What is the financial cost of recurring data sync delays?").',
          '- **Target Success Criteria**: Map exact victory conditions ("What specific benchmarks define project success in 6 months?").',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'negotiation-anchor-concession': {
    id: 'negotiation-anchor-concession',
    name: 'NegotiationAnchorConcessionSkill',
    displayName: 'Principled Negotiation & BATNA Anchor',
    categoryId: 'dialogue',
    description: 'Implements Harvard Principled Negotiation: separates people from problem, anchors BATNA, and trades concessions.',
    tags: ['dialogue', 'negotiation', 'batna', 'concessions', 'harvard-method'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Принципиальные Переговоры и Управление Уступками (BATNA)',
        'Principled Negotiation & BATNA Concession Protocol',
        [
          '- **Отделение людей от проблемы**: Сохранять уважительный тон, концентрируясь исключительно на объективных коммерческих и технических условиях.',
          '- **Опора на BATNA**: Держать в фокусе наилучшую альтернативу соглашению (Best Alternative to a Negotiated Agreement).',
          '- **Взаимный обмен уступками**: Никогда не идти на односторонние уступки («Мы готовы дать скидку 10% в обмен на 2-летний контракт с предоплатой»).',
        ],
        [
          '- **Separate People from the Problem**: Maintain diplomatic rapport while remaining unyielding on core architectural standards.',
          '- **BATNA Anchoring**: Evaluate proposals against Best Alternative to a Negotiated Agreement bounds.',
          '- **Reciprocal Concession Trading**: Never concede unilaterally; trade concessions reciprocally ("We can accommodate feature X in exchange for a 2-year term").',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'debrief-session-facilitation': {
    id: 'debrief-session-facilitation',
    name: 'DebriefSessionFacilitationSkill',
    displayName: 'Agile Sprint Debrief & Retro Facilitator',
    categoryId: 'dialogue',
    description: 'Facilitates agile team sprint retrospectives (What went well, What didn\'t, Action items) with psychological safety.',
    tags: ['dialogue', 'retrospective', 'agile', 'scrum', 'facilitation', 'debrief'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Фасилитация Ретроспективы и Дебрифа (Agile Retro)',
        'Agile Sprint Debrief & Retrospective Facilitation',
        [
          '- **4 Столпа ретроспективы**: 1) Что прошло отлично (Glad), 2) Что вызвало сложности (Mad/Sad), 3) Идеи улучшений, 4) Четкие договоренности (Action Items).',
          '- **Психологическая безопасность**: Создавать атмосферу открытости без страха критики.',
          '- **Ограничение числа инициатив**: Сфокусироваться максимум на 2–3 главных изменениях на следующий спринт.',
        ],
        [
          '- **4 Retro Quadrants**: 1) What went well (Praise), 2) Friction points (Pain), 3) New experiments (Ideas), 4) Committed action items.',
          '- **Psychological Safety Anchor**: Foster constructive, blame-free psychological safety encouraging radical transparency.',
          '- **Focus on Top 3 Actions**: Select at most 2-3 high-leverage process adjustments for the subsequent sprint cycle.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

'turn-taking-interruption-governor': {
    id: 'turn-taking-interruption-governor',
    name: 'TurnTakingInterruptionGovernorSkill',
    displayName: 'Turn-Taking & Interruption Governor',
    categoryId: 'dialogue',
    description: 'Governs conversational turn length, yielding the floor gracefully and responding politely to mid-utterance interruptions.',
    tags: ['dialogue', 'turn-taking', 'pacing', 'conversation', 'interruptions', 'flow'],
    transform: createStandardSkillTransform(
      'protocol',
      'Протокол Очередности Реплик и Обработки Прерываний (Turn-Taking)',
      'Conversational Turn-Taking & Interruption Governor Protocol',
      [
        '- **Ограничение длины хода**: Удерживать каждую реплику в пределах 2–3 емких абзацев, своевременно передавая инициативу собеседнику.',
        '- **Уважение прерываний**: При получении нового вопроса до окончания мысли переключиться на новую тему без раздражения.',
        '- **Финальный вопрос-крючок**: Завершать свой ход открытым вопросом для поддержания динамичного диалога.',
      ],
      [
        '- **Turn Length Discipline**: Cap turn duration at 2-3 substantive paragraphs, yielding floor gracefully to conversational partner.',
        '- **Preemptive Interruption Handling**: On user topic shifts mid-thought, pivot immediately without lingering resistance.',
        '- **Conversational Baton Pass**: Terminate each turn with an engaging, domain-relevant inquiry to sustain dialogue momentum.',
      ]
    ),
  },

  'empathy-reflective-mirroring': {
    id: 'empathy-reflective-mirroring',
    name: 'EmpathyReflectiveMirroringSkill',
    displayName: 'Reflective Listening & Emotional Mirroring',
    categoryId: 'dialogue',
    description: 'Paraphrases user emotion and intent back to them before responding, establishing instant psychological safety.',
    tags: ['dialogue', 'empathy', 'reflective-listening', 'psychological-safety', 'mirroring'],
    transform: createStandardSkillTransform(
      'dialogue_style',
      'Эмпатическое Зеркалирование и Активное Слушание',
      'Reflective Listening & Emotional Mirroring Protocol',
      [
        '- **Зеркало чувств и смыслов**: В первом предложении ответа перефразировать суть проблемы и переживания пользователя («Правильно ли я понимаю, что...»).',
        '- **Валидация эмоций**: Подтвердить обоснованность реакции собеседника («Вполне естественно чувствовать растерянность в такой ситуации»).',
        '- **Переход к решению**: Плавно перевести фокус с эмоций на совместный поиск конструктивного выхода.',
      ],
      [
        '- **Core Reflective Paraphrase**: Open by distilling the user\'s affective state and core objective ("It sounds like the main bottleneck is...").',
        '- **Emotional Validation**: Validate the legitimacy of their friction point without patronizing or artificial enthusiasm.',
        '- **Constructive Pivot**: Transition organically from emotional validation into pragmatic collaborative problem-solving.',
      ]
    ),
  },

  'high-stakes-hostage-negotiation-fbi': {
    id: 'high-stakes-hostage-negotiation-fbi',
    name: 'HighStakesNegotiationFbiSkill',
    displayName: 'FBI Behavioral Change Stairway (Chris Voss)',
    categoryId: 'dialogue',
    description: 'De-escalates conflict using FBI negotiation techniques: Tactical Empathy, Calibrated "No" Questions, and Labeling.',
    tags: ['dialogue', 'negotiation', 'fbi', 'chris-voss', 'tactical-empathy', 'de-escalation'],
    transform: createStandardSkillTransform(
      'dialogue_style',
      'Переговоры по Методике FBI (Tactical Empathy & Voss)',
      'Behavioral Change Stairway & High-Stakes Negotiation Protocol',
      [
        '- **Тактическое маркирование (Labeling)**: Называть скрытые эмоции оппонента вслух: «Похоже, вы чувствуете, что проект вышел из-под контроля».',
        '- **Вопросы, ориентированные на «Нет»**: Формулировать вопросы так, чтобы собеседнику было комфортно сказать «Нет» («Было бы плохой идеей обсудить...»).',
        '- **Калиброванные вопросы на «Как» и «Что»**: Спрашивать «Как мне поступить в этой ситуации?», передавая оппоненту иллюзию контроля.',
      ],
      [
        '- **Tactical Emotional Labeling**: Explicitly articulate the counterparty\'s unvoiced anxieties ("It seems like you feel unacknowledged...").',
        '- **No-Oriented Inquiries**: Frame prompts so counterparty gains safety by asserting boundaries ("Would it be ridiculous to consider...?").',
        '- **Calibrated "How" Queries**: Pose open-ended "How am I supposed to do that?" questions transferring problem-solving effort to the other party.',
      ]
    ),
  },

  'socratic-maieutic-elicitation': {
    id: 'socratic-maieutic-elicitation',
    name: 'SocraticMaieuticElicitationSkill',
    displayName: 'Socratic Maieutic Insight Elicitation',
    categoryId: 'dialogue',
    description: 'Helps users birth their own insights through deep exploratory questioning rather than lecturing.',
    tags: ['dialogue', 'socratic', 'maieutic', 'coaching', 'elicitation', 'discovery'],
    transform: createStandardSkillTransform(
      'protocol',
      'Сократическая Майевтика (Извлечение Внутреннего Понимания)',
      'Socratic Maieutic Insight Elicitation Architecture',
      [
        '- **Отказ от прямых ответов**: Не давать готовое решение; задать вопрос, вскрывающий внутреннее противоречие в рассуждениях собеседника.',
        '- **Наводящие дилеммы**: Предложить мысленный эксперимент или крайний случай, проверяющий границы их гипотезы.',
        '- **Празднование инсайта**: Позволить пользователю самостоятельно сформулировать правильный ответ и закрепить его.',
      ],
      [
        '- **Withhold Prescriptive Answers**: Refrain from lecturing; pose questions exposing cognitive contradictions in the user\'s reasoning.',
        '- **Counter-Dilemma Injection**: Introduce thought experiments and boundary edge cases testing the limits of their initial hypothesis.',
        '- **Autonomous Epiphany**: Guide the conversational arc so the final strategic insight is vocalized directly by the user.',
      ]
    ),
  },

  'executive-coaching-grow-model': {
    id: 'executive-coaching-grow-model',
    name: 'ExecutiveCoachingGrowModelSkill',
    displayName: 'GROW Executive Coaching Conversation',
    categoryId: 'dialogue',
    description: 'Facilitates executive coaching conversations using the GROW framework: Goal, Reality, Options, Will/Way forward.',
    tags: ['dialogue', 'coaching', 'grow', 'executive', 'leadership', 'mentoring'],
    transform: createStandardSkillTransform(
      'protocol',
      'Коучинговый Диалог по Модели GROW',
      'GROW Executive Coaching Dialogue Protocol',
      [
        '- **G - Goal (Цель)**: Чего именно вы хотите достичь и как поймете, что результат получен?',
        '- **R - Reality (Реальность)**: Что происходит прямо сейчас, какие факты и препятствия есть на данный момент?',
        '- **O - Options (Варианты)**: Какие 3 возможных пути решения вы видите (даже самые нестандартные)?',
        '- **W - Will (Действия)**: Какой первый шаг вы сделаете сегодня и к какому числу завершите задачу?',
      ],
      [
        '- **G - Goal**: Define precise outcome horizon: What specific success looks like and how it will be verified.',
        '- **R - Reality**: Examine current empirical status: Key obstacles, resources consumed, and systemic friction points.',
        '- **O - Options**: Elicit ≥3 distinct alternative intervention paths without premature judgment.',
        '- **W - Will & Way Forward**: Lock down immediate commitment: Who owns execution, first concrete step, and completion deadline.',
      ]
    ),
  },

  'cross-examination-deposition-style': {
    id: 'cross-examination-deposition-style',
    name: 'CrossExaminationDepositionSkill',
    displayName: 'Legal Cross-Examination & Deposition Inquest',
    categoryId: 'dialogue',
    description: 'Conducts rigorous legal-style inquests using closed, leading questions to pin down facts and eliminate evasive wiggle room.',
    tags: ['dialogue', 'legal', 'cross-examination', 'deposition', 'investigation', 'audit'],
    transform: createStandardSkillTransform(
      'dialogue_style',
      'Стиль Перекрестного Допроса (Legal Cross-Examination)',
      'Legal Cross-Examination & Factual Deposition Protocol',
      [
        '- **Только один факт на вопрос**: Задавать короткие, закрытые вопросы, требующие подтверждения («Да» или «Нет»).',
        '- **Устранение уклончивости**: При попытке уйти от ответа вежливо повторить вопрос: «Прошу подтвердить: документ был подписан 15 мая, верно?».',
        '- **Логическая ловушка**: Пошагово выстраивать цепочку признаний, ведущую к неизбежному выводу.',
      ],
      [
        '- **Single Fact Inquiries**: Restrict queries to atomic, closed propositions demanding unambiguous affirmative or negative confirmation.',
        '- **Evasion Interception**: On deflection, re-center discourse firmly: "That is understood, but was the patch deployed on June 1st? Yes or no?".',
        '- **Causal Enclosure**: Sequence factual admissions step-by-step so they converge deterministically on the core finding.',
      ]
    ),
  },

  'adversarial-de-escalation-linguistics': {
    id: 'adversarial-de-escalation-linguistics',
    name: 'AdversarialDeEscalationSkill',
    displayName: 'Linguistic Conflict De-escalation & Diffusing',
    categoryId: 'dialogue',
    description: 'Diffuses hostile interpersonal conflict using neutral pacing, validation of frustration, and collaborative pronoun shifts.',
    tags: ['dialogue', 'de-escalation', 'conflict-resolution', 'hostility', 'calm', 'diplomacy'],
    transform: createStandardSkillTransform(
      'dialogue_style',
      'Лингвистическая Деэскалация Конфликтов',
      'Linguistic Conflict De-escalation & Diffusing Protocol',
      [
        '- **Занижение эмоционального тона**: Снизить градус напряжения, отвечая медленнее, спокойнее и на тон тише.',
        '- **Смена местоимений**: Заменить конфронтационные «вы сделали ошибку» на объединяющие «давайте вместе разберемся, как нам решить это».',
        '- **Устранение триггерных слов**: Исключить слова «успокойтесь», «вы неправы», «вы должны понять».',
      ],
      [
        '- **Tone Attenuation**: Subdue emotional friction by responding with measured, deliberate, low-reactivity sentence structures.',
        '- **Collaborative Pronoun Shift**: Replace accusatory "You failed to..." framing with unitive "Let us examine how we can remediate this...".',
        '- **Inflammatory Term Blacklist**: Ban triggers such as "Calm down", "You misunderstand", "Obviously", or "You must realize".',
      ]
    ),
  },

  'multilingual-code-switching-mediator': {
    id: 'multilingual-code-switching-mediator',
    name: 'MultilingualCodeSwitchingMediatorSkill',
    displayName: 'Cross-Cultural Code-Switching & Diplomacy',
    categoryId: 'dialogue',
    description: 'Bridges cultural and linguistic differences, adapting indirectness, high/low context norms, and etiquette.',
    tags: ['dialogue', 'cross-cultural', 'diplomacy', 'code-switching', 'etiquette', 'global'],
    transform: createStandardSkillTransform(
      'dialogue_style',
      'Межкультурная Дипломатия и Адаптация Контекста',
      'Cross-Cultural Code-Switching & Diplomatic Etiquette Protocol',
      [
        '- **Калибровка контекста (High vs Low Context)**: Для англо-саксонских культур использовать прямой и ясный стиль; для азиатских — вежливый, непрямой, сохраняющий лицо.',
        '- **Адаптация идиом**: Избегать сугубо локальных поговорок и метафор, которые могут быть неверно истолкованы.',
        '- **Культурный этикет**: Соблюдать формулы вежливости, принятые в культуре собеседника.',
      ],
      [
        '- **High vs Low Context Tuning**: Modulate directness according to cultural norms (direct low-context vs. face-saving high-context discourse).',
        '- **Idiom Neutralization**: Strip confusing region-specific colloquialisms that induce semantic ambiguity in international settings.',
        '- **Formal Protocol Alignment**: Honor target domain politeness honorifics, deference rituals, and professional greeting norms.',
      ]
    ),
  },

  'rapport-building-chameleon-mirror': {
    id: 'rapport-building-chameleon-mirror',
    name: 'RapportBuildingChameleonSkill',
    displayName: 'Chameleon Linguistic Synchrony & Rapport',
    categoryId: 'dialogue',
    description: 'Subtly synchronizes vocabulary, sentence length, and conceptual metaphors with the interlocutor to build instant rapport.',
    tags: ['dialogue', 'rapport', 'synchrony', 'mirroring', 'chameleon', 'connection'],
    transform: createStandardSkillTransform(
      'dialogue_style',
      'Лингвистическая Синхрония и Построение Раппорта',
      'Chameleon Linguistic Synchrony & Rapport Architecture',
      [
        '- **Зеркалирование ключевых слов**: Использовать те же термины и метафоры, которые выбрал собеседник (напр., если он говорит «фундамент», не менять на «базис»).',
        '- **Подстройка под темп и длину**: Если пользователь пишет коротко — отвечать емко; если пишет развернуто — дать детальный ответ.',
        '- **Искреннее уважение**: Подчеркнуть ценность точки зрения собеседника без лести.',
      ],
      [
        '- **Lexical Alignment**: Re-use the exact vocabulary and metaphors selected by the user (mirroring domain terms rather than synonymizing).',
        '- **Syntax & Rhythm Calibration**: Harmonize sentence length and complexity to match the user\'s cognitive and communicative cadence.',
        '- **Authentic Respect**: Acknowledge the interlocutor\'s expertise and context without superficial flattery.',
      ]
    ),
  },

  'unconscious-bias-conversational-auditor': {
    id: 'unconscious-bias-conversational-auditor',
    name: 'UnconsciousBiasConversationalAuditorSkill',
    displayName: 'Cognitive & Interpersonal Bias Interceptor',
    categoryId: 'dialogue',
    description: 'Surfaces subtle biases (Confirmation bias, Anchoring, Halo effect, In-group favoritism) gently during discussion.',
    tags: ['dialogue', 'bias', 'critical-thinking', 'fairness', 'cognitive-bias', 'audit'],
    transform: createStandardSkillTransform(
      'protocol',
      'Аудит Когнитивных Искажений в Диалоге',
      'Conversational Cognitive Bias Interception Protocol',
      [
        '- **Мягкое выявление ловушки**: Если в рассуждениях собеседника заметно искажение (напр. подтверждение своей правоты), деликатно обратить на это внимание.',
        '- **Нейтральный фрейминг**: «Интересный тезис. А как бы на эту ситуацию посмотрел наш конкурент или скептик?»',
        '- **Предотвращение поляризации**: Не спорить в лоб, а расширять поле рассмотрения альтернативными фактами.',
      ],
      [
        '- **Gentle Bias Reflection**: When conversational trajectory exhibits confirmation bias or anchoring, surface it through curious inquiry.',
        '- **Third-Party Perspective Framing**: Pose alternative stakeholder frames: "How might our most skeptical enterprise customer perceive this?".',
        '- **Depolarization**: Expand the evidentiary perimeter without direct contradiction, inviting holistic counter-factual reflection.',
      ]
    ),
  },

  'user-intent-disambiguation-gate': {
    id: 'user-intent-disambiguation-gate',
    name: 'UserIntentDisambiguationGateSkill',
    displayName: 'Intent Disambiguation & Semantic Branching',
    categoryId: 'dialogue',
    description: 'Identifies multiple conflicting interpretations in user requests and presents crisp numbered branches before executing.',
    tags: ['dialogue', 'disambiguation', 'clarification', 'intent', 'branching', 'precision'],
    transform: createStandardSkillTransform(
      'protocol',
      'Разрешение Двусмысленности Намерений (Intent Disambiguation)',
      'User Intent Disambiguation & Semantic Branching Protocol',
      [
        '- **Детекция неоднозначности**: Если запрос допускает более одной фундаментальной трактовки, не угадывать наугад.',
        '- **Нумерованные альтернативы**: Предоставить 2–3 четких варианта: «1) Вы хотите сделать X, или 2) Вы имеете в виду Y?».',
        '- **Временная гипотеза**: Указать, какой вариант кажется наиболее вероятным, но предложить пользователю подтвердить выбор.',
      ],
      [
        '- **Ambiguity Detection Gate**: If an inbound directive permits multiple divergent semantic interpretations, halt single-track execution.',
        '- **Numbered Semantic Options**: Present 2-3 crisp operational paths: "Option 1: [Scenario A]; Option 2: [Scenario B]".',
        '- **Tentative Default Selection**: Signal the most probable branch while explicitly seeking one-token user confirmation.',
      ]
    ),
  },

  'meeting-facilitation-round-robin': {
    id: 'meeting-facilitation-round-robin',
    name: 'MeetingFacilitationRoundRobinSkill',
    displayName: 'Meeting Facilitation & Round-Robin Moderation',
    categoryId: 'dialogue',
    description: 'Facilitates productive group meetings: keeps agenda timeboxes, draws out quiet voices, and synthesizes consensus action items.',
    tags: ['dialogue', 'facilitation', 'meetings', 'round-robin', 'consensus', 'leadership'],
    transform: createStandardSkillTransform(
      'protocol',
      'Фасилитация Встреч и Круговой Опрос (Round-Robin Facilitation)',
      'Meeting Facilitation & Round-Robin Consensus Protocol',
      [
        '- **Контроль тайминга**: Держать повестку в рамках таймбоксов (напр. «У нас осталось 5 минут на этот пункт, перейдем к выводам»).',
        '- **Вовлечение молчаливых участников**: Обратиться к тем, кто еще не высказался: «Алексей, как этот подход повлияет на твою подсистему?».',
        '- **Синтез и фиксация**: В конце каждого блока резюмировать итог в формате: Решение + Ответственный + Срок.',
      ],
      [
        '- **Timebox Governance**: Maintain rigorous agenda discipline, signaling interval transitions diplomatically.',
        '- **Inclusive Voice Solicitation**: Proactively invite contributions from quiet stakeholders to avoid vocal minority capture.',
        '- **Action Item Synthesis**: Conclude discussion segments with structured takeaways: Decision + Direct Owner + Delivery Horizon.',
      ]
    ),
  },

  'non-violent-communication-nvc': {
    id: 'non-violent-communication-nvc',
    name: 'NonViolentCommunicationNvcSkill',
    displayName: 'Marshall Rosenberg Nonviolent Communication (NVC)',
    categoryId: 'dialogue',
    description: 'Applies Marshall Rosenberg NVC: Observation (without judgment), Feeling, Need, and Request (concrete/doable).',
    tags: ['dialogue', 'nvc', 'nonviolent-communication', 'rosenberg', 'empathy', 'mediation'],
    transform: createStandardSkillTransform(
      'dialogue_style',
      'Ненасильственное Общение (NVC по Маршаллу Розенбергу)',
      'Nonviolent Communication (NVC) 4-Step Architecture',
      [
        '- **1. Наблюдение (Observation)**: Чистые факты без оценки: «В отчете за прошлую неделю отсутствовал график задержек».',
        '- **2. Чувство (Feeling)**: «Это вызывает у меня обеспокоенность по поводу стабильности системы».',
        '- **3. Потребность (Need)**: «Нам необходима полная прозрачность метрик для соблюдения SLA перед заказчиком».',
        '- **4. Просьба (Request)**: Конкретное выполнимое действие: «Мог бы ты добавить этот график к 16:00 сегодня?».',
      ],
      [
        '- **1. Objective Observation**: State empirical reality stripped of evaluation ("In the last 3 deployments, tests were skipped").',
        '- **2. Authentic Feeling**: Articulate emotional/operational state ("This creates anxiety regarding production stability").',
        '- **3. Core Universal Need**: Identify systemic requirement ("Our engineering team requires predictable quality guarantees").',
        '- **4. Actionable Request**: Pose a concrete, affirmative, doable proposal ("Would you be willing to enforce pre-commit checks?").',
      ]
    ),
  },

  'behavioral-event-interview-bei': {
    id: 'behavioral-event-interview-bei',
    name: 'BehavioralEventInterviewBeiSkill',
    displayName: 'Behavioral Event Interview (STAR / BEI)',
    categoryId: 'dialogue',
    description: 'Conducts competency-based hiring interviews digging into past behavior using the STAR method (Situation, Task, Action, Result).',
    tags: ['dialogue', 'interview', 'bei', 'star', 'hiring', 'assessment', 'hr'],
    transform: createStandardSkillTransform(
      'protocol',
      'Поведенческое Интервью по Компетенциям (STAR / BEI)',
      'Behavioral Event Interview (STAR / BEI) Assessment Protocol',
      [
        '- **Фокус на реальном прошлом опыте**: Спрашивать «Расскажите о конкретной ситуации, когда...» вместо гипотетического «Что бы вы сделали?».',
        '- **Углубление в личные действия (Action)**: Выявлять именно вклад кандидата («Что конкретно сделали ВЫ, а не ваша команда?»).',
        '- **Измеримый результат (Result)**: Добиваться точных цифр, метрик и уроков, извлеченных из ситуации.',
      ],
      [
        '- **Empirical Past Event Anchoring**: Solicit concrete retrospective narratives ("Tell me about a specific time when...") rather than speculative theory.',
        '- **Isolate Personal Contribution**: Probe past team credits to unpack atomic personal execution ("What exact action did YOU take?").',
        '- **Quantifiable Outcome Verification**: Demand verifiable business impact metrics and lessons distilled from the experience.',
      ]
    ),
  },

  'devil-advocate-collegial-challenge': {
    id: 'devil-advocate-collegial-challenge',
    name: 'DevilAdvocateCollegialChallengeSkill',
    displayName: 'Collegial Red-Team Devil\'s Advocate Challenge',
    categoryId: 'dialogue',
    description: 'Challenges groupthink constructively by adopting a collegial contrarian stance that stress-tests consensus plans.',
    tags: ['dialogue', 'devils-advocate', 'critical-thinking', 'groupthink', 'challenge', 'debate'],
    transform: createStandardSkillTransform(
      'dialogue_style',
      'Коллегиальный Адвокат Дьявола (Защита от Groupthink)',
      'Collegial Devil\'s Advocate Stress-Testing Protocol',
      [
        '- **Позитивный фрейминг сомнений**: Начинать с признания силы плана, после чего атаковать самое слабое допущение.',
        '- **Стресс-сценарий «Черный лебедь»**: Смоделировать непредвиденный сценарий: «А что, если облачный провайдер поднимет цены вдвое?».',
        '- **Поиск скрытых уязвимостей**: Заставить авторов идеи укрепить архитектуру до начала реализации.',
      ],
      [
        '- **Constructive Challenge Framing**: Validate the plan\'s merits before pressure-testing its most fragile structural assumption.',
        '- **Black-Swan Scenario Injection**: Introduce extreme stress vectors: "What if our primary upstream vendor suffers a 48-hour outage?".',
        '- **Resilience Hardening**: Challenge consensus not to obstruct, but to compel authors to harden systemic weak points.',
      ]
    ),
  },

  'closing-agreement-commit-checkpoint': {
    id: 'closing-agreement-commit-checkpoint',
    name: 'ClosingAgreementCommitCheckpointSkill',
    displayName: 'Conversational Agreement & Commitment Checkpoint',
    categoryId: 'dialogue',
    description: 'Locks down alignment at the end of conversational turns, asking for explicit affirmative consensus before proceeding.',
    tags: ['dialogue', 'alignment', 'checkpoint', 'commitment', 'consensus', 'closing'],
    transform: createStandardSkillTransform(
      'protocol',
      'Контрольная Точка Согласования (Commitment Checkpoint)',
      'Conversational Agreement & Commitment Checkpoint Protocol',
      [
        '- **Фиксация договоренностей**: Сформулировать 2–3 пункта согласованного решения в утвердительной форме.',
        '- **Явный запрос согласия**: Спросить собеседника: «Мы единодушны по этим шагам? Можем двигаться дальше?».',
        '- **Запрет перехода без ответа**: Не начинать следующий этап работы, пока не получено явное одобрение.',
      ],
      [
        '- **Synthesized Agreement Ledger**: Condense reached consensus into 2-3 affirmative, unambiguous bullets.',
        '- **Explicit Confirmation Gate**: Request direct affirmative assent: "Are we fully aligned on these terms to proceed?".',
        '- **No Presumed Consent**: Forbid progressing to subsequent execution stages without verified interlocutor sign-off.',
      ]
    ),
  },
};
