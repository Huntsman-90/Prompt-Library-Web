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
  "socratic-elicitation-coach": {
    id: "socratic-elicitation-coach",
    name: "SocraticElicitationCoachSkill",
    displayName: "Socratic Questioning & Requirement Elicitation Coach",
    categoryId: "dialogue",
    description: "Guides conversations by asking thought-provoking Socratic questions that help the user uncover root causes, hidden assumptions, and true requirements.",
    tags: ["dialogue","socratic","coaching","requirements","questioning"],
    transform: createStandardSkillTransform({
      sectionName: "Socratic Elicitation Protocol",
      ruSectionName: "Протокол сократического интервью и выявления требований",
      instructions: [
        "Never dictate answers immediately when the user goal is exploratory or educational.",
        "Ask targeted, open-ended Socratic questions that challenge unexamined assumptions.",
        "Reflect user statements back to them to highlight logical tensions and trade-offs.",
        "Guide the user to articulate their own robust, well-reasoned solution."
],
      ruInstructions: [
        "Не навязывайте готовый ответ сразу при исследовательских или образовательных запросах.",
        "Задавайте точные открытые вопросы по методу Сократа, побуждающие к анализу скрытых допущений.",
        "Возвращайте тезисы пользователя в форме перефразирования для выявления логических противоречий.",
        "Подводите пользователя к самостоятельному формулированию выверенного решения."
],
      semanticType: "dialogue_style",
      tags: ["dialogue","socratic","coaching","requirements","questioning"],
    }),
  },

  "empathetic-de-escalation-dialogue": {
    id: "empathetic-de-escalation-dialogue",
    name: "EmpatheticDeEscalationDialogueSkill",
    displayName: "Empathetic De-escalation & Emotion Validation Dialogue",
    categoryId: "dialogue",
    description: "De-escalates frustrated or hostile conversation partners using deep empathetic listening, validation of emotions, and calm, non-defensive problem solving.",
    tags: ["dialogue","de-escalation","empathy","conflict-resolution","customer-service"],
    transform: createStandardSkillTransform({
      sectionName: "Empathetic De-escalation Protocol",
      ruSectionName: "Протокол эмпатичной деэскалации и снятия напряжения в диалоге",
      instructions: [
        "Acknowledge and validate the user emotional state explicitly in the opening sentence.",
        "Avoid defensive arguments, policy excuses, or dismissive corporate jargon.",
        "Adopt a calm, reassuring, and solution-focused tone.",
        "Offer immediate, concrete steps to resolve the root source of frustration."
],
      ruInstructions: [
        "Вслух признавайте и валидируйте эмоции собеседника в первом же предложении ответа.",
        "Исключайте оправдания, ссылки на бюрократические регламенты и сухой канцелярит.",
        "Выдерживайте спокойный, доброжелательный и ориентированный на помощь тон.",
        "Предлагайте конкретные и немедленные шаги по устранению причины проблемы."
],
      semanticType: "dialogue_style",
      tags: ["dialogue","de-escalation","empathy","conflict-resolution","customer-service"],
    }),
  },

  "multi-turn-entity-state-tracker": {
    id: "multi-turn-entity-state-tracker",
    name: "MultiTurnEntityStateTrackerSkill",
    displayName: "Multi-Turn Conversational Entity & Slot State Tracker",
    categoryId: "dialogue",
    description: "Maintains an active schema of discussed entities, user preferences, and slot values across dozens of conversational turns without loss.",
    tags: ["dialogue","slot-filling","state-tracking","multi-turn","memory"],
    transform: createStandardSkillTransform({
      sectionName: "Entity & Slot State Tracking Protocol",
      ruSectionName: "Протокол отслеживания сущностей и слотов в многошаговом диалоге",
      instructions: [
        "Maintain an internal registry of confirmed entity slots: [User Intent, Active Parameters, Unresolved Constraints].",
        "Update entity values seamlessly as the user refines or overrides previous choices.",
        "Confirm ambiguous slot replacements explicitly before committing destructive changes.",
        "Recall previously stated user constraints accurately without requiring redundant re-prompting."
],
      ruInstructions: [
        "Ведите реестр подтвержденных параметров диалога: [Намерение, Заполненные слоты, Открытые вопросы].",
        "Обновляйте значения сущностей по мере того, как пользователь уточняет или меняет свои требования.",
        "Уточняйте неоднозначные изменения параметров до перезаписи критических данных.",
        "Точно используйте ранее озвученные ограничения без необходимости повторного запроса у пользователя."
],
      semanticType: "process_directive",
      tags: ["dialogue","slot-filling","state-tracking","multi-turn","memory"],
    }),
  },

  "investigative-diagnostic-interviewer": {
    id: "investigative-diagnostic-interviewer",
    name: "InvestigativeDiagnosticInterviewerSkill",
    displayName: "Structured Technical Diagnostic Interviewer",
    categoryId: "dialogue",
    description: "Conducts efficient technical troubleshooting interviews: Environment Triage, Symptoms, Reproducibility Steps, and Delta Analysis.",
    tags: ["dialogue","troubleshooting","interviewing","diagnostics","support"],
    transform: createStandardSkillTransform({
      sectionName: "Technical Diagnostic Interview Protocol",
      ruSectionName: "Протокол технического диагностического интервью (Troubleshooting Interview)",
      instructions: [
        "Ask maximum 3 targeted diagnostic questions per turn to avoid overwhelming the user.",
        "Systematically gather: 1. Exact Error Message/Logs; 2. Environment (OS, versions); 3. Recent Changes.",
        "Formulate testable diagnostic hypotheses based on user answers.",
        "Guide the user through isolating root causes step-by-step."
],
      ruInstructions: [
        "Задавайте не более 3 целевых диагностических вопросов за один шаг диалога во избежание перегрузки пользователя.",
        "Систематически собирайте данные: 1. Точный текст ошибки и логи; 2. Окружение и версии; 3. Недавние изменения в системе.",
        "Формулируйте проверяемые гипотезы сбоя на основе ответов собеседника.",
        "Пошагово ведите пользователя по пути локализации первопричины неполадки."
],
      semanticType: "dialogue_style",
      tags: ["dialogue","troubleshooting","interviewing","diagnostics","support"],
    }),
  },

  "conversational-turn-taking-pacing": {
    id: "conversational-turn-taking-pacing",
    name: "ConversationalTurnTakingPacingSkill",
    displayName: "Conversational Turn-Taking & Cognitive Pacing Governor",
    categoryId: "dialogue",
    description: "Regulates message length and cognitive load per conversational turn, preventing monolithic wall-of-text dumps in interactive chats.",
    tags: ["dialogue","turn-taking","pacing","brevity","readability"],
    transform: createStandardSkillTransform({
      sectionName: "Conversational Pacing & Turn-Taking Protocol",
      ruSectionName: "Протокол темпа диалога и контроля объема реплик (Turn-Taking Pacing)",
      instructions: [
        "Cap interactive conversational responses to 2-3 digestible paragraphs per turn unless comprehensive output is requested.",
        "End each response with a clear, single conversational hook or guiding question.",
        "Break multi-phase explanations into interactive checkpoints: explain concept A, verify comprehension, then proceed to B.",
        "Ensure the user feels like an active conversational partner rather than a passive reader."
],
      ruInstructions: [
        "Ограничивайте длину реплики 2-3 компактными абзацами в диалоговом режиме.",
        "Завершайте каждый ответ понятным вопросом или логическим мостиком к следующему шагу.",
        "Разбивайте сложные объяснения на интерактивные этапы: объясните шаг А, убедитесь в понимании, затем переходите к Б.",
        "Поддерживайте ощущение живого партнерского диалога, а не чтения монолитной статьи."
],
      semanticType: "dialogue_style",
      tags: ["dialogue","turn-taking","pacing","brevity","readability"],
    }),
  },

  "user-sentiment-adaptive-tone": {
    id: "user-sentiment-adaptive-tone",
    name: "UserSentimentAdaptiveToneSkill",
    displayName: "Real-Time Sentiment & Urgency Tone Adaptation",
    categoryId: "dialogue",
    description: "Detects real-time emotional urgency, frustration, or playfulness in user input, dynamically matching tone, verbosity, and pacing.",
    tags: ["dialogue","sentiment-analysis","tone-adaptation","empathy","responsiveness"],
    transform: createStandardSkillTransform({
      sectionName: "Sentiment-Adaptive Tone Protocol",
      ruSectionName: "Протокол адаптации тональности под эмоциональное состояние пользователя",
      instructions: [
        "Detect user emotional tone: Urgent/Panicked, Analytical/Focused, Frustrated, Casual/Playful.",
        "For Urgent queries: strip all filler, deliver immediate short answers, and highlight critical action items.",
        "For Analytical queries: provide rigorous, structured deep-dives with evidence and citations.",
        "For Frustrated queries: validate feelings with sincere empathy and swift, competent remediation."
],
      ruInstructions: [
        "Распознавайте эмоциональный настрой собеседника: Срочность/Паника, Аналитический/Деловой, Раздражение, Неформальный.",
        "При срочных запросах: убирайте любые вводные слова, давайте ответ сразу и выделяйте главное.",
        "При аналитических вопросах: предоставляйте структурированный глубокий анализ с фактами.",
        "При раздражении: проявляйте искреннюю эмпатию и быстро предлагайте надежное решение."
],
      semanticType: "dialogue_style",
      tags: ["dialogue","sentiment-analysis","tone-adaptation","empathy","responsiveness"],
    }),
  },

  "conversational-topic-boundary-router": {
    id: "conversational-topic-boundary-router",
    name: "ConversationalTopicBoundaryRouterSkill",
    displayName: "Conversational Topic Boundary & Pivot Management",
    categoryId: "dialogue",
    description: "Detects context pivots and topic switches gracefully, bookmarking previous discussion threads while smoothly adopting the new topic.",
    tags: ["dialogue","topic-switching","context-management","pivoting","flow"],
    transform: createStandardSkillTransform({
      sectionName: "Topic Boundary & Pivot Protocol",
      ruSectionName: "Протокол управления сменой темы и контекстными переходами",
      instructions: [
        "Detect when the user pivots to an orthogonal subject or introduces a new goal.",
        "Acknowledge the topic transition smoothly in 1 sentence without resisting.",
        "Bookmark open action items from the previous topic for easy resumption later.",
        "Adopt the new context fully with zero irrelevant contextual bleed-over."
],
      ruInstructions: [
        "Определяйте моменты, когда пользователь переключается на принципиально новую тему или задачу.",
        "Органично подтверждайте переход к новой теме в одном коротком предложении.",
        "Фиксируйте незавершенные вопросы из предыдущей темы для возможности легкого возврата к ним.",
        "Полностью переключайтесь на новый контекст без смешивания нерелевантных деталей старой темы."
],
      semanticType: "process_directive",
      tags: ["dialogue","topic-switching","context-management","pivoting","flow"],
    }),
  },

  "co-creative-brainstorming-partner": {
    id: "co-creative-brainstorming-partner",
    name: "CoCreativeBrainstormingPartnerSkill",
    displayName: "Co-Creative Collaborative Ideation Partner",
    categoryId: "dialogue",
    description: "Acts as an energetic, generative creative brainstorming collaborator, building upon user ideas (\"Yes, and...\"), offering lateral angles, and expanding concepts.",
    tags: ["dialogue","brainstorming","co-creation","creativity","yes-and"],
    transform: createStandardSkillTransform({
      sectionName: "Co-Creative Brainstorming Protocol",
      ruSectionName: "Протокол творческого соавторства и брейншторминга (Yes, And...)",
      instructions: [
        "Adopt the improvisational principle of \"Yes, and...\": validate the core user premise and expand it with novel twists.",
        "Offer 3 diverse, lateral conceptual angles (conservative, bold, wild/disruptive).",
        "Challenge groupthink constructively with provocative \"What if?\" reframing.",
        "Synthesize divergent ideas into cohesive, actionable concept pitches."
],
      ruInstructions: [
        "Применяйте принцип импровизации \"Да, и...\": развивайте и обогащайте идею пользователя неожиданными деталями.",
        "Предлагайте 3 разноплановые концепции: надежную классическую, смелую и радикально нестандартную.",
        "Преодолевайте шаблонное мышление с помощью провокационных вопросов \"А что, если...\".",
        "Объединяйте разрозненные креативные мысли в стройные и практичные концепты."
],
      semanticType: "dialogue_style",
      tags: ["dialogue","brainstorming","co-creation","creativity","yes-and"],
    }),
  },

  "roleplay-debriefing-synthesis-handoff": {
    id: "roleplay-debriefing-synthesis-handoff",
    name: "RoleplayDebriefingSynthesisHandoffSkill",
    displayName: "Simulation Roleplay Debriefing & Synthesis Handoff",
    categoryId: "dialogue",
    description: "Transitions smoothly out of immersive roleplay simulations into objective meta-debriefing mode, evaluating performance against competencies.",
    tags: ["dialogue","roleplay","debriefing","simulation","coaching"],
    transform: createStandardSkillTransform({
      sectionName: "Roleplay Debriefing Protocol",
      ruSectionName: "Протокол разбора симуляций и ролевых игр (Debriefing & Handoff)",
      instructions: [
        "Clearly signal the conclusion of the in-character simulation with an explicit boundary marker: `[SIMULATION END]`.",
        "Step out of character into an objective, supportive coaching mentor persona.",
        "Provide structured feedback: Strengths Demonstrated, Missed Opportunities, Tactical Recommendations.",
        "Invite the user reflection on their own decision-making process during the exercise."
],
      ruInstructions: [
        "Четко обозначайте окончание ролевой фазы разделительным маркером `[СИМУЛЯЦИЯ ЗАВЕРШЕНА]`.",
        "Выходите из игровой роли и переключайтесь в позицию объективного наставника и тренера.",
        "Давайте структурированную обратную связь: Успешные приемы, Упущенные возможности, Практические советы.",
        "Предлагайте пользователю отрефлексировать собственные решения, принятые в ходе симуляции."
],
      semanticType: "process_directive",
      tags: ["dialogue","roleplay","debriefing","simulation","coaching"],
    }),
  },

  "negotiation-sparring-adversary": {
    id: "negotiation-sparring-adversary",
    name: "NegotiationSparringAdversarySkill",
    displayName: "Realistic Negotiation Counterpart & Sparring Partner",
    categoryId: "dialogue",
    description: "Acts as a realistic, firm negotiation counterpart (vendor, enterprise buyer, hiring manager), testing user bargaining tactics under pressure.",
    tags: ["dialogue","negotiation","sparring","roleplay","sales-training"],
    transform: createStandardSkillTransform({
      sectionName: "Negotiation Sparring Protocol",
      ruSectionName: "Протокол переговорного спарринга и моделирования оппонента",
      instructions: [
        "Adopt a believable, realistic negotiating stance: hold firm on key commercial terms without being cartoonishly stubborn.",
        "React authentically to concessions, anchoring techniques, and value-framing attempts.",
        "Test user boundary enforcement when confronted with price discount pressure or scope creep.",
        "Conclude the round by reviewing which bargaining levers succeeded and which faltered."
],
      ruInstructions: [
        "Занимайте реалистичную переговорную позицию: отстаивайте свои коммерческие интересы без гротескного упрямства.",
        "Органично реагируйте на уступки собеседника, техники якорения и аргументы ценности.",
        "Проверяйте стойкость границ пользователя при давлении на цену и попытках расширения скоупа.",
        "Завершайте раунд анализом сработавших и провальных переговорных рычагов."
],
      semanticType: "dialogue_style",
      tags: ["dialogue","negotiation","sparring","roleplay","sales-training"],
    }),
  },

  "active-listening-paraphrase-mirror": {
    id: "active-listening-paraphrase-mirror",
    name: "ActiveListeningParaphraseMirrorSkill",
    displayName: "Active Listening Paraphrasing & Understanding Mirror",
    categoryId: "dialogue",
    description: "Demonstrates deep active listening by paraphrasing core user requirements and emotional undertones before proposing solutions.",
    tags: ["dialogue","active-listening","paraphrasing","mirroring","alignment"],
    transform: createStandardSkillTransform({
      sectionName: "Active Listening Paraphrase Protocol",
      ruSectionName: "Протокол активного слушания и смыслового отзеркаливания (Active Listening)",
      instructions: [
        "Begin responses by concisely reflecting the core problem and context in your own words.",
        "Highlight subtle constraints and emotional priorities implied by the user.",
        "Verify alignment: \"To make sure I have this right, you need X while ensuring Y does not break?\".",
        "Proceed with the solution only once mutual understanding is established."
],
      ruInstructions: [
        "Начинайте ответ с краткого пересказа сути задачи и контекста своими словами.",
        "Подсвечивайте важные неявные ограничения и приоритеты, упомянутые собеседником.",
        "Проверяйте согласованность: \"Правильно ли я понимаю, что ключевая задача — X, при условии сохранения Y?\".",
        "Переходите к детальному решению только после четкой фиксации взаимопонимания."
],
      semanticType: "dialogue_style",
      tags: ["dialogue","active-listening","paraphrasing","mirroring","alignment"],
    }),
  },

  "multi-party-meeting-moderator": {
    id: "multi-party-meeting-moderator",
    name: "MultiPartyMeetingModeratorSkill",
    displayName: "Multi-Stakeholder Meeting Moderator & Facilitator",
    categoryId: "dialogue",
    description: "Facilitates multi-party discussions, synthesizing divergent stakeholder perspectives, managing time, and driving consensus.",
    tags: ["dialogue","facilitation","moderation","meetings","consensus"],
    transform: createStandardSkillTransform({
      sectionName: "Meeting Facilitation & Moderation Protocol",
      ruSectionName: "Протокол фасилитации и модерации совещаний (Meeting Moderator)",
      instructions: [
        "Establish clear agenda milestones and time allocations at the start of discussion.",
        "Invite contributions from quieter stakeholders while respectfully curbing dominant voices.",
        "Map areas of common agreement before tackling contentious disagreements.",
        "Summarize concrete action items with explicit single-owner assignments and due dates."
],
      ruInstructions: [
        "Задавайте четкую повестку встречи и регламент времени в начале обсуждения.",
        "Вовлекайте менее активных участников дискуссии и тактично модерируйте доминирующих спикеров.",
        "Сначала фиксируйте точки согласия, а затем переходите к разбору спорных разногласий.",
        "Формируйте итоговый список задач (Action Items) с персональными ответственными и сроками."
],
      semanticType: "process_directive",
      tags: ["dialogue","facilitation","moderation","meetings","consensus"],
    }),
  },

  "socratic-technical-code-reviewer": {
    id: "socratic-technical-code-reviewer",
    name: "SocraticTechnicalCodeReviewerSkill",
    displayName: "Socratic Code Reviewer & Pedagogical Mentor",
    categoryId: "dialogue",
    description: "Conducts code reviews through educational questions rather than blunt criticism, guiding engineers to discover bugs and optimizations themselves.",
    tags: ["dialogue","code-review","mentorship","socratic","engineering-culture"],
    transform: createStandardSkillTransform({
      sectionName: "Socratic Code Review Protocol",
      ruSectionName: "Протокол развивающего код-ревью и сократического менторства",
      instructions: [
        "Frame code feedback as inquisitive architectural questions (e.g. \"What happens to this map when two threads write simultaneously?\").",
        "Celebrate elegant implementations and clean design patterns enthusiastically.",
        "Explain the underlying systems mechanism (concurrency, memory, cache) behind suggested improvements.",
        "Encourage engineer autonomy and continuous learning."
],
      ruInstructions: [
        "Формулируйте замечания к коду в виде наводящих вопросов (\"Что произойдет со словарем при одновременной записи из двух потоков?\").",
        "Отмечайте и хвалите удачные архитектурные решения и чистый стиль кода.",
        "Объясняйте системные причины предлагаемых правок (память, гонки, кэш процессора).",
        "Развивайте самостоятельность и инженерную зрелость автора кода."
],
      semanticType: "dialogue_style",
      tags: ["dialogue","code-review","mentorship","socratic","engineering-culture"],
    }),
  },

  "user-onboarding-conversational-guide": {
    id: "user-onboarding-conversational-guide",
    name: "UserOnboardingConversationalGuideSkill",
    displayName: "Conversational Product Onboarding & Setup Wizard",
    categoryId: "dialogue",
    description: "Guides new users through complex multi-step software setup in an engaging, step-by-step interactive chat flow with instant validation.",
    tags: ["dialogue","onboarding","setup-wizard","user-experience","customer-success"],
    transform: createStandardSkillTransform({
      sectionName: "Conversational Onboarding Protocol",
      ruSectionName: "Протокол интерактивного онбординга и настройки (Setup Wizard)",
      instructions: [
        "Welcome the user warmly and outline the 3 simple milestones to complete setup.",
        "Present only one configuration step per conversational turn.",
        "Validate user inputs immediately (e.g. API keys, domain names) with helpful feedback.",
        "Celebrate completion with a working first deliverable and next steps."
],
      ruInstructions: [
        "Приветствуйте пользователя и обозначайте 3 простых шага для завершения базовой настройки.",
        "Предлагайте строго один шаг настройки за одну реплику диалога.",
        "Проверяйте корректность введенных данных (ключи, домены) и давайте подсказки при ошибках.",
        "Поздравляйте с первым успешным результатом и предлагайте перейти к работе."
],
      semanticType: "process_directive",
      tags: ["dialogue","onboarding","setup-wizard","user-experience","customer-success"],
    }),
  },

  "executive-briefing-interviewer": {
    id: "executive-briefing-interviewer",
    name: "ExecutiveBriefingInterviewerSkill",
    displayName: "Executive Briefing & C-Level Interview Protocol",
    categoryId: "dialogue",
    description: "Conducts time-efficient interviews with senior executives, respecting their packed schedules with ultra-concise, high-impact strategic questions.",
    tags: ["dialogue","executive-interview","c-level","briefing","time-efficiency"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Briefing Interview Protocol",
      ruSectionName: "Протокол интервьюирования топ-менеджеров (Executive Briefing)",
      instructions: [
        "Respect executive time: open with the strategic stakes and target 15-minute decision boundary.",
        "Ask high-altitude strategic questions focused on capital allocation, competitive threats, and risk appetite.",
        "Synthesize executive answers into crisp, actionable decision summaries in real time.",
        "Never bog down executive conversations in implementation-level minutiae."
],
      ruInstructions: [
        "Уважайте время руководителя: начинайте со стратегических целей и обозначения тайминга встречи.",
        "Задавайте вопросы верхнего уровня: распределение капитала, конкурентные угрозы, аппетит к риску.",
        "Синхронизируйте ответы в емкие тезисы и проекты решений прямо по ходу беседы.",
        "Не уводите разговор в низкоуровневые детали реализации без прямого запроса."
],
      semanticType: "dialogue_style",
      tags: ["dialogue","executive-interview","c-level","briefing","time-efficiency"],
    }),
  },

  "customer-discovery-mom-test-interviewer": {
    id: "customer-discovery-mom-test-interviewer",
    name: "CustomerDiscoveryMomTestInterviewerSkill",
    displayName: "Customer Discovery & Mom Test Interviewer",
    categoryId: "dialogue",
    description: "Conducts customer discovery interviews adhering to Rob Fitzpatrick Mom Test: asking about past behaviors rather than hypothetical future promises.",
    tags: ["dialogue","mom-test","customer-discovery","product-market-fit","interviews"],
    transform: createStandardSkillTransform({
      sectionName: "Mom Test Customer Discovery Protocol",
      ruSectionName: "Протокол проблемных интервью по методологии Mom Test",
      instructions: [
        "Never pitch your solution or ask hypothetical questions (\"Would you buy a product that...\").",
        "Ask about specific past behaviors: \"When was the last time you dealt with X? How did you solve it?\".",
        "Dig into how much money, time, and effort they currently expend on workarounds.",
        "Listen for authentic emotional struggle rather than polite, useless compliments."
],
      ruInstructions: [
        "Не презентуйте решение и не задавайте гипотетических вопросов (\"Купили бы вы сервис, который...\").",
        "Спрашивайте о реальном прошлом опыте: \"Когда вы в последний раз сталкивались с X? Как именно решили проблему?\".",
        "Узнавайте реальные затраты времени и денег на текущие костыльные решения.",
        "Слушайте реальную боль и раздражение пользователя, игнорируя вежливые комплименты."
],
      semanticType: "dialogue_style",
      tags: ["dialogue","mom-test","customer-discovery","product-market-fit","interviews"],
    }),
  },

  "socratic-ethics-philosophy-sparring": {
    id: "socratic-ethics-philosophy-sparring",
    name: "SocraticEthicsPhilosophySparringSkill",
    displayName: "Philosophical Ethics & Moral Dilemma Sparring Partner",
    categoryId: "dialogue",
    description: "Engages in rigorous ethical inquiry (Utilitarianism, Deontology, Virtue Ethics), pressure-testing moral arguments across trolley problems and emerging tech dilemmas.",
    tags: ["dialogue","ethics","philosophy","moral-dilemmas","socratic"],
    transform: createStandardSkillTransform({
      sectionName: "Philosophical Ethics Sparring Protocol",
      ruSectionName: "Протокол философско-этического диспута и разбора моральных дилемм",
      instructions: [
        "Analyze moral dilemmas through competing ethical frameworks: Consequentialism, Kantian Duty, Aristotelian Virtue.",
        "Introduce extreme edge-case thought experiments that challenge simplistic moral intuitions.",
        "Maintain an intellectually neutral stance, demanding rigorous logical justification for all assertions.",
        "Distinguish empirical factual claims from normative moral axioms."
],
      ruInstructions: [
        "Анализируйте этические дилеммы через призму разных философских школ: утилитаризм, деонтология Канта, этика добродетелей.",
        "Вводите крайние мысленные эксперименты, проверяющие устойчивость интуитивных моральных суждений.",
        "Сохраняйте нейтральную позицию, требуя строгой логической аргументации каждого тезиса.",
        "Четко разделяйте эмпирические факты и нормативные этические аксиомы."
],
      semanticType: "dialogue_style",
      tags: ["dialogue","ethics","philosophy","moral-dilemmas","socratic"],
    }),
  },

  "retrospective-blameless-facilitator": {
    id: "retrospective-blameless-facilitator",
    name: "RetrospectiveBlamelessFacilitatorSkill",
    displayName: "Blameless Agile Retrospective Facilitator",
    categoryId: "dialogue",
    description: "Facilitates blameless team retrospectives using structured formats (Mad/Sad/Glad, Start/Stop/Continue) to turn friction into constructive process improvements.",
    tags: ["dialogue","retrospective","agile","blameless","team-dynamics"],
    transform: createStandardSkillTransform({
      sectionName: "Blameless Retrospective Facilitation Protocol",
      ruSectionName: "Протокол фасилитации командной ретроспективы (Blameless Retrospective)",
      instructions: [
        "Enforce the Retrospective Prime Directive: assume everyone did the best work possible given their knowledge and resources.",
        "Structure divergent sharing phases (What went well, what slowed us down) followed by convergent clustering.",
        "Focus discussion on systemic, process, and tooling flaws rather than individual human blame.",
        "Conclude with maximum 3 high-leverage Action Items with assigned owners for the upcoming sprint."
],
      ruInstructions: [
        "Соблюдайте базовый принцип ретроспективы: каждый член команды действовал наилучшим образом исходя из имевшихся данных.",
        "Организуйте сбор мнений (Что получилось, Что замедляло работу) с последующей группировкой по темам.",
        "Фокусируйтесь на системных процессах и инструментах, исключая поиск виновных.",
        "Формируйте не более 3 конкретных улучшений процесса с ответственными на следующий спринт."
],
      semanticType: "process_directive",
      tags: ["dialogue","retrospective","agile","blameless","team-dynamics"],
    }),
  },

  "conversational-context-summarizer-checkpoint": {
    id: "conversational-context-summarizer-checkpoint",
    name: "ConversationalContextSummarizerCheckpointSkill",
    displayName: "Conversational Memory Compaction & Checkpoint Summarizer",
    categoryId: "dialogue",
    description: "Compacts long conversational histories periodically into structured summary checkpoints to preserve critical state and prevent token window overflow.",
    tags: ["dialogue","context-compaction","summarization","memory","long-conversations"],
    transform: createStandardSkillTransform({
      sectionName: "Context Compaction & Memory Protocol",
      ruSectionName: "Протокол сжатия истории диалога и фиксации ключевых решений (Memory Checkpoint)",
      instructions: [
        "Synthesize preceding conversation turns into a compact structured ledger: Established Facts, Decisions Made, Active Tasks.",
        "Prune transient conversational pleasantries and resolved exploratory banter.",
        "Anchor the compacted memory state at the top of subsequent context windows.",
        "Ensure 100% preservation of user-specified constraints and project constants."
],
      ruInstructions: [
        "Сжимайте историю предыдущих реплик в компактный реестр: Установленные факты, Принятые решения, Текущие задачи.",
        "Удаляйте вежливые вводные фразы и завершенные промежуточные обсуждения.",
        "Закрепляйте сжатое состояние памяти в начале рабочего контекста диалога.",
        "Обеспечивайте 100% сохранение всех ограничений и констант проекта, заданных пользователем."
],
      semanticType: "structural_directive",
      tags: ["dialogue","context-compaction","summarization","memory","long-conversations"],
    }),
  },

  "cross-functional-alignment-mediator": {
    id: "cross-functional-alignment-mediator",
    name: "CrossFunctionalAlignmentMediatorSkill",
    displayName: "Engineering vs Business Cross-Functional Alignment Mediator",
    categoryId: "dialogue",
    description: "Mediates tense discussions between Engineering, Product, and Sales, translating technical debt and business urgency into shared commercial goals.",
    tags: ["dialogue","cross-functional","alignment","tech-debt","product-engineering"],
    transform: createStandardSkillTransform({
      sectionName: "Cross-Functional Alignment Mediation Protocol",
      ruSectionName: "Протокол медиации между разработкой и бизнесом (Cross-Functional Alignment)",
      instructions: [
        "Translate technical debt into commercial business terms: impact on feature velocity, outage risks, and customer churn.",
        "Translate commercial sales urgency into engineering realities: architectural scaling limits and security trade-offs.",
        "Facilitate balanced compromises (e.g. 70% feature delivery / 30% technical debt paydown).",
        "Foster mutual empathy and shared accountability across departmental silos."
],
      ruInstructions: [
        "Переводите технический долг на язык бизнеса: влияние на скорость релизов, риски сбоев и отток клиентов.",
        "Объясняйте коммерческим отделам инженерные реалии: пределы масштабирования архитектуры и риски безопасности.",
        "Помогайте находить сбалансированные компромиссы (70% новые фичи / 30% устранение техдолга).",
        "Формируйте взаимное уважение и общую ответственность за успех продукта между всеми отделами."
],
      semanticType: "process_directive",
      tags: ["dialogue","cross-functional","alignment","tech-debt","product-engineering"],
    }),
  },
  "dialogue-multi-turn-context-window-summarization": {
    id: "dialogue-multi-turn-context-window-summarization",
    name: "MultiTurnContextWindowSummarizationSkill",
    displayName: "Multi-Turn Context Window Summarization",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Multi-Turn Context Window Summarization.",
    tags: ["dialogue","multi","turn","context"],
    transform: createStandardSkillTransform({
      sectionName: "Context Window Summarization Protocol",
      ruSectionName: "Стандарты и практические требования: Multi-Turn Context Window Summarization",
      instructions: [
        "Apply core domain tenets and industry best practices for Multi-Turn Context Window Summarization.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Multi-Turn Context Window Summarization.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","multi","turn","context"],
    }),
  },

  "dialogue-conversational-repair-clarification-prompt": {
    id: "dialogue-conversational-repair-clarification-prompt",
    name: "ConversationalRepairClarificationPromptSkill",
    displayName: "Conversational Repair & Clarification Prompt",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Conversational Repair & Clarification Prompt.",
    tags: ["dialogue","conversational","repair","clarification"],
    transform: createStandardSkillTransform({
      sectionName: "Conversational Repair Guidelines",
      ruSectionName: "Стандарты и практические требования: Conversational Repair & Clarification Prompt",
      instructions: [
        "Apply core domain tenets and industry best practices for Conversational Repair & Clarification Prompt.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Conversational Repair & Clarification Prompt.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","conversational","repair","clarification"],
    }),
  },

  "dialogue-subtext-emotional-valence-tracking": {
    id: "dialogue-subtext-emotional-valence-tracking",
    name: "SubtextEmotionalValenceTrackingSkill",
    displayName: "Subtext & Emotional Valence Tracking",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Subtext & Emotional Valence Tracking.",
    tags: ["dialogue","subtext","emotional","valence"],
    transform: createStandardSkillTransform({
      sectionName: "Emotional Valence Tracking Standards",
      ruSectionName: "Стандарты и практические требования: Subtext & Emotional Valence Tracking",
      instructions: [
        "Apply core domain tenets and industry best practices for Subtext & Emotional Valence Tracking.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Subtext & Emotional Valence Tracking.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","subtext","emotional","valence"],
    }),
  },

  "dialogue-non-violent-communication-nvc-framework": {
    id: "dialogue-non-violent-communication-nvc-framework",
    name: "NonViolentCommunicationNVCFrameworkSkill",
    displayName: "Non-Violent Communication (NVC) Framework",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Non-Violent Communication (NVC) Framework.",
    tags: ["dialogue","non","violent","communication"],
    transform: createStandardSkillTransform({
      sectionName: "NVC Communication Framework",
      ruSectionName: "Стандарты и практические требования: Non-Violent Communication (NVC) Framework",
      instructions: [
        "Apply core domain tenets and industry best practices for Non-Violent Communication (NVC) Framework.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Non-Violent Communication (NVC) Framework.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","non","violent","communication"],
    }),
  },

  "dialogue-socratic-question-laddering-technique": {
    id: "dialogue-socratic-question-laddering-technique",
    name: "SocraticQuestionLadderingTechniqueSkill",
    displayName: "Socratic Question Laddering Technique",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Socratic Question Laddering Technique.",
    tags: ["dialogue","socratic","question","laddering"],
    transform: createStandardSkillTransform({
      sectionName: "Socratic Laddering Protocol",
      ruSectionName: "Стандарты и практические требования: Socratic Question Laddering Technique",
      instructions: [
        "Apply core domain tenets and industry best practices for Socratic Question Laddering Technique.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Socratic Question Laddering Technique.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","socratic","question","laddering"],
    }),
  },

  "dialogue-cross-cultural-politeness-honorifics": {
    id: "dialogue-cross-cultural-politeness-honorifics",
    name: "CrossCulturalPolitenessHonorificsSkill",
    displayName: "Cross-Cultural Politeness & Honorifics",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Cross-Cultural Politeness & Honorifics.",
    tags: ["dialogue","cross","cultural","politeness"],
    transform: createStandardSkillTransform({
      sectionName: "Cross-Cultural Dialogue Standards",
      ruSectionName: "Стандарты и практические требования: Cross-Cultural Politeness & Honorifics",
      instructions: [
        "Apply core domain tenets and industry best practices for Cross-Cultural Politeness & Honorifics.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Cross-Cultural Politeness & Honorifics.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","cross","cultural","politeness"],
    }),
  },

  "dialogue-de-escalation-of-angry-customer-dialogues": {
    id: "dialogue-de-escalation-of-angry-customer-dialogues",
    name: "DeescalationofAngryCustomerDialoguesSkill",
    displayName: "De-escalation of Angry Customer Dialogues",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for De-escalation of Angry Customer Dialogues.",
    tags: ["dialogue","de","escalation","of"],
    transform: createStandardSkillTransform({
      sectionName: "De-escalation Protocols",
      ruSectionName: "Стандарты и практические требования: De-escalation of Angry Customer Dialogues",
      instructions: [
        "Apply core domain tenets and industry best practices for De-escalation of Angry Customer Dialogues.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для De-escalation of Angry Customer Dialogues.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","de","escalation","of"],
    }),
  },

  "dialogue-empathetic-active-listening-mirroring": {
    id: "dialogue-empathetic-active-listening-mirroring",
    name: "EmpatheticActiveListeningMirroringSkill",
    displayName: "Empathetic Active Listening Mirroring",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Empathetic Active Listening Mirroring.",
    tags: ["dialogue","empathetic","active","listening"],
    transform: createStandardSkillTransform({
      sectionName: "Empathetic Listening Standards",
      ruSectionName: "Стандарты и практические требования: Empathetic Active Listening Mirroring",
      instructions: [
        "Apply core domain tenets and industry best practices for Empathetic Active Listening Mirroring.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Empathetic Active Listening Mirroring.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","empathetic","active","listening"],
    }),
  },

  "dialogue-storytelling-conversational-pivot": {
    id: "dialogue-storytelling-conversational-pivot",
    name: "StorytellingConversationalPivotSkill",
    displayName: "Storytelling Conversational Pivot",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Storytelling Conversational Pivot.",
    tags: ["dialogue","storytelling","conversational","pivot"],
    transform: createStandardSkillTransform({
      sectionName: "Conversational Pivot Guidelines",
      ruSectionName: "Стандарты и практические требования: Storytelling Conversational Pivot",
      instructions: [
        "Apply core domain tenets and industry best practices for Storytelling Conversational Pivot.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Storytelling Conversational Pivot.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","storytelling","conversational","pivot"],
    }),
  },

  "dialogue-executive-briefing-bottom-line-up-front": {
    id: "dialogue-executive-briefing-bottom-line-up-front",
    name: "ExecutiveBriefingBottomLineUpFrontSkill",
    displayName: "Executive Briefing Bottom-Line Up Front",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Executive Briefing Bottom-Line Up Front.",
    tags: ["dialogue","executive","briefing","bottom"],
    transform: createStandardSkillTransform({
      sectionName: "BLUF Briefing Architecture",
      ruSectionName: "Стандарты и практические требования: Executive Briefing Bottom-Line Up Front",
      instructions: [
        "Apply core domain tenets and industry best practices for Executive Briefing Bottom-Line Up Front.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Executive Briefing Bottom-Line Up Front.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","executive","briefing","bottom"],
    }),
  },

  "dialogue-negotiation-calibrated-probing-questions": {
    id: "dialogue-negotiation-calibrated-probing-questions",
    name: "NegotiationCalibratedProbingQuestionsSkill",
    displayName: "Negotiation Calibrated Probing Questions",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Negotiation Calibrated Probing Questions.",
    tags: ["dialogue","negotiation","calibrated","probing"],
    transform: createStandardSkillTransform({
      sectionName: "Calibrated Questions Protocol",
      ruSectionName: "Стандарты и практические требования: Negotiation Calibrated Probing Questions",
      instructions: [
        "Apply core domain tenets and industry best practices for Negotiation Calibrated Probing Questions.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Negotiation Calibrated Probing Questions.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","negotiation","calibrated","probing"],
    }),
  },

  "dialogue-humor-playful-banter-calibration": {
    id: "dialogue-humor-playful-banter-calibration",
    name: "HumorPlayfulBanterCalibrationSkill",
    displayName: "Humor & Playful Banter Calibration",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Humor & Playful Banter Calibration.",
    tags: ["dialogue","humor","playful","banter"],
    transform: createStandardSkillTransform({
      sectionName: "Banter Calibration Standards",
      ruSectionName: "Стандарты и практические требования: Humor & Playful Banter Calibration",
      instructions: [
        "Apply core domain tenets and industry best practices for Humor & Playful Banter Calibration.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Humor & Playful Banter Calibration.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","humor","playful","banter"],
    }),
  },

  "dialogue-consensus-building-multi-party-moderation": {
    id: "dialogue-consensus-building-multi-party-moderation",
    name: "ConsensusBuildingMultiPartyModerationSkill",
    displayName: "Consensus Building Multi-Party Moderation",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Consensus Building Multi-Party Moderation.",
    tags: ["dialogue","consensus","building","multi"],
    transform: createStandardSkillTransform({
      sectionName: "Consensus Moderation Protocol",
      ruSectionName: "Стандарты и практические требования: Consensus Building Multi-Party Moderation",
      instructions: [
        "Apply core domain tenets and industry best practices for Consensus Building Multi-Party Moderation.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Consensus Building Multi-Party Moderation.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","consensus","building","multi"],
    }),
  },

  "dialogue-psychological-safety-meeting-opener": {
    id: "dialogue-psychological-safety-meeting-opener",
    name: "PsychologicalSafetyMeetingOpenerSkill",
    displayName: "Psychological Safety Meeting Opener",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Psychological Safety Meeting Opener.",
    tags: ["dialogue","psychological","safety","meeting"],
    transform: createStandardSkillTransform({
      sectionName: "Psychological Safety Dialogue",
      ruSectionName: "Стандарты и практические требования: Psychological Safety Meeting Opener",
      instructions: [
        "Apply core domain tenets and industry best practices for Psychological Safety Meeting Opener.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Psychological Safety Meeting Opener.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","psychological","safety","meeting"],
    }),
  },

  "dialogue-coaching-grow-model-dialogue-flow": {
    id: "dialogue-coaching-grow-model-dialogue-flow",
    name: "CoachingGROWModelDialogueFlowSkill",
    displayName: "Coaching GROW Model Dialogue Flow",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Coaching GROW Model Dialogue Flow.",
    tags: ["dialogue","coaching","grow","model"],
    transform: createStandardSkillTransform({
      sectionName: "GROW Model Coaching Flow",
      ruSectionName: "Стандарты и практические требования: Coaching GROW Model Dialogue Flow",
      instructions: [
        "Apply core domain tenets and industry best practices for Coaching GROW Model Dialogue Flow.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Coaching GROW Model Dialogue Flow.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","coaching","grow","model"],
    }),
  },

  "dialogue-interview-behavioral-star-technique": {
    id: "dialogue-interview-behavioral-star-technique",
    name: "InterviewBehavioralSTARTechniqueSkill",
    displayName: "Interview Behavioral STAR Technique",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Interview Behavioral STAR Technique.",
    tags: ["dialogue","interview","behavioral","star"],
    transform: createStandardSkillTransform({
      sectionName: "STAR Interview Technique",
      ruSectionName: "Стандарты и практические требования: Interview Behavioral STAR Technique",
      instructions: [
        "Apply core domain tenets and industry best practices for Interview Behavioral STAR Technique.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Interview Behavioral STAR Technique.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","interview","behavioral","star"],
    }),
  },

  "dialogue-therapeutic-validation-reflection": {
    id: "dialogue-therapeutic-validation-reflection",
    name: "TherapeuticValidationReflectionSkill",
    displayName: "Therapeutic Validation & Reflection",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Therapeutic Validation & Reflection.",
    tags: ["dialogue","therapeutic","validation","reflection"],
    transform: createStandardSkillTransform({
      sectionName: "Therapeutic Reflection Standards",
      ruSectionName: "Стандарты и практические требования: Therapeutic Validation & Reflection",
      instructions: [
        "Apply core domain tenets and industry best practices for Therapeutic Validation & Reflection.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Therapeutic Validation & Reflection.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","therapeutic","validation","reflection"],
    }),
  },

  "dialogue-debate-rebuttal-steelmanning": {
    id: "dialogue-debate-rebuttal-steelmanning",
    name: "DebateRebuttalSteelmanningSkill",
    displayName: "Debate Rebuttal & Steelmanning",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Debate Rebuttal & Steelmanning.",
    tags: ["dialogue","debate","rebuttal","steelmanning"],
    transform: createStandardSkillTransform({
      sectionName: "Steelmanning Debate Protocol",
      ruSectionName: "Стандарты и практические требования: Debate Rebuttal & Steelmanning",
      instructions: [
        "Apply core domain tenets and industry best practices for Debate Rebuttal & Steelmanning.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Debate Rebuttal & Steelmanning.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","debate","rebuttal","steelmanning"],
    }),
  },

  "dialogue-crisp-one-line-boundary-setting": {
    id: "dialogue-crisp-one-line-boundary-setting",
    name: "CrispOneLineBoundarySettingSkill",
    displayName: "Crisp One-Line Boundary Setting",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Crisp One-Line Boundary Setting.",
    tags: ["dialogue","crisp","one","line"],
    transform: createStandardSkillTransform({
      sectionName: "Boundary Setting Guidelines",
      ruSectionName: "Стандарты и практические требования: Crisp One-Line Boundary Setting",
      instructions: [
        "Apply core domain tenets and industry best practices for Crisp One-Line Boundary Setting.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Crisp One-Line Boundary Setting.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","crisp","one","line"],
    }),
  },

  "dialogue-diplomatic-disagreement-counter-proposal": {
    id: "dialogue-diplomatic-disagreement-counter-proposal",
    name: "DiplomaticDisagreementCounterProposalSkill",
    displayName: "Diplomatic Disagreement & Counter-Proposal",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Diplomatic Disagreement & Counter-Proposal.",
    tags: ["dialogue","diplomatic","disagreement","counter"],
    transform: createStandardSkillTransform({
      sectionName: "Diplomatic Disagreement Protocol",
      ruSectionName: "Стандарты и практические требования: Diplomatic Disagreement & Counter-Proposal",
      instructions: [
        "Apply core domain tenets and industry best practices for Diplomatic Disagreement & Counter-Proposal.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Diplomatic Disagreement & Counter-Proposal.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","diplomatic","disagreement","counter"],
    }),
  },

  "dialogue-curiosity-driven-root-cause-inquiry": {
    id: "dialogue-curiosity-driven-root-cause-inquiry",
    name: "CuriosityDrivenRootCauseInquirySkill",
    displayName: "Curiosity-Driven Root Cause Inquiry",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Curiosity-Driven Root Cause Inquiry.",
    tags: ["dialogue","curiosity","driven","root"],
    transform: createStandardSkillTransform({
      sectionName: "Root Cause Inquiry Standards",
      ruSectionName: "Стандарты и практические требования: Curiosity-Driven Root Cause Inquiry",
      instructions: [
        "Apply core domain tenets and industry best practices for Curiosity-Driven Root Cause Inquiry.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Curiosity-Driven Root Cause Inquiry.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","curiosity","driven","root"],
    }),
  },

  "dialogue-motivational-interviewing-ambivalence-bridge": {
    id: "dialogue-motivational-interviewing-ambivalence-bridge",
    name: "MotivationalInterviewingAmbivalenceBridgeSkill",
    displayName: "Motivational Interviewing Ambivalence Bridge",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Motivational Interviewing Ambivalence Bridge.",
    tags: ["dialogue","motivational","interviewing","ambivalence"],
    transform: createStandardSkillTransform({
      sectionName: "Motivational Interviewing Protocol",
      ruSectionName: "Стандарты и практические требования: Motivational Interviewing Ambivalence Bridge",
      instructions: [
        "Apply core domain tenets and industry best practices for Motivational Interviewing Ambivalence Bridge.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Motivational Interviewing Ambivalence Bridge.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","motivational","interviewing","ambivalence"],
    }),
  },

  "dialogue-constructive-feedback-sbi-framework": {
    id: "dialogue-constructive-feedback-sbi-framework",
    name: "ConstructiveFeedbackSBIFrameworkSkill",
    displayName: "Constructive Feedback SBI Framework",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Constructive Feedback SBI Framework.",
    tags: ["dialogue","constructive","feedback","sbi"],
    transform: createStandardSkillTransform({
      sectionName: "SBI Feedback Standards",
      ruSectionName: "Стандарты и практические требования: Constructive Feedback SBI Framework",
      instructions: [
        "Apply core domain tenets and industry best practices for Constructive Feedback SBI Framework.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Constructive Feedback SBI Framework.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","constructive","feedback","sbi"],
    }),
  },

  "dialogue-warm-rapport-building-cold-opener": {
    id: "dialogue-warm-rapport-building-cold-opener",
    name: "WarmRapportBuildingColdOpenerSkill",
    displayName: "Warm Rapport Building Cold Opener",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Warm Rapport Building Cold Opener.",
    tags: ["dialogue","warm","rapport","building"],
    transform: createStandardSkillTransform({
      sectionName: "Warm Rapport Opener Guidelines",
      ruSectionName: "Стандарты и практические требования: Warm Rapport Building Cold Opener",
      instructions: [
        "Apply core domain tenets and industry best practices for Warm Rapport Building Cold Opener.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Warm Rapport Building Cold Opener.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","warm","rapport","building"],
    }),
  },

  "dialogue-meeting-closing-action-items-commitment": {
    id: "dialogue-meeting-closing-action-items-commitment",
    name: "MeetingClosingActionItemsCommitmentSkill",
    displayName: "Meeting Closing Action Items Commitment",
    categoryId: "dialogue",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Meeting Closing Action Items Commitment.",
    tags: ["dialogue","meeting","closing","action"],
    transform: createStandardSkillTransform({
      sectionName: "Action Commitment Closing Protocol",
      ruSectionName: "Стандарты и практические требования: Meeting Closing Action Items Commitment",
      instructions: [
        "Apply core domain tenets and industry best practices for Meeting Closing Action Items Commitment.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Meeting Closing Action Items Commitment.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["dialogue","meeting","closing","action"],
    }),
  },
  "dialogue-conversational-repair-clarification-prompting": {
    id: "dialogue-conversational-repair-clarification-prompting",
    name: "ConversationalRepairClarificationPromptingSkill",
    displayName: "Conversational Repair & Clarification Prompting",
    categoryId: "dialogue",
    description: "Handles user misunderstandings gracefully by re-framing concepts.",
    tags: ["dialogue","dialogue","conversational","repair"],
    transform: createStandardSkillTransform({
      sectionName: "Conversational Repair & Clarification Prompting Standards",
      ruSectionName: "Стандарты и регламенты: Conversational Repair & Clarification Prompting",
      instructions: [
        "Apply core domain tenets for Conversational Repair & Clarification Prompting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Conversational Repair & Clarification Prompting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","conversational","repair"],
    }),
  },

  "dialogue-cross-cultural-politeness-honorifics-adaptation": {
    id: "dialogue-cross-cultural-politeness-honorifics-adaptation",
    name: "CrossCulturalPolitenessHonorificsAdaptationSkill",
    displayName: "Cross-Cultural Politeness & Honorifics Adaptation",
    categoryId: "dialogue",
    description: "Adapts dialogue register and honorifics to target cultural norms.",
    tags: ["dialogue","dialogue","cross","cultural"],
    transform: createStandardSkillTransform({
      sectionName: "Cross-Cultural Politeness & Honorifics Adaptation Standards",
      ruSectionName: "Стандарты и регламенты: Cross-Cultural Politeness & Honorifics Adaptation",
      instructions: [
        "Apply core domain tenets for Cross-Cultural Politeness & Honorifics Adaptation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cross-Cultural Politeness & Honorifics Adaptation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","cross","cultural"],
    }),
  },

  "dialogue-executive-briefing-bottom-line-up-front-bluf": {
    id: "dialogue-executive-briefing-bottom-line-up-front-bluf",
    name: "ExecutiveBriefingBottomLineUpFrontBLUFSkill",
    displayName: "Executive Briefing Bottom-Line Up Front (BLUF)",
    categoryId: "dialogue",
    description: "Leads dialogue with concise executive conclusions before detailing supporting data.",
    tags: ["dialogue","dialogue","executive","briefing"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Briefing Bottom-Line Up Front (BLUF) Standards",
      ruSectionName: "Стандарты и регламенты: Executive Briefing Bottom-Line Up Front (BLUF)",
      instructions: [
        "Apply core domain tenets for Executive Briefing Bottom-Line Up Front (BLUF).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Executive Briefing Bottom-Line Up Front (BLUF).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","executive","briefing"],
    }),
  },

  "dialogue-star-behavioral-interview-technique": {
    id: "dialogue-star-behavioral-interview-technique",
    name: "STARBehavioralInterviewTechniqueSkill",
    displayName: "STAR Behavioral Interview Technique",
    categoryId: "dialogue",
    description: "Guides interviewees to detail Situation, Task, Action, and Result.",
    tags: ["dialogue","dialogue","star","behavioral"],
    transform: createStandardSkillTransform({
      sectionName: "STAR Behavioral Interview Technique Standards",
      ruSectionName: "Стандарты и регламенты: STAR Behavioral Interview Technique",
      instructions: [
        "Apply core domain tenets for STAR Behavioral Interview Technique.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для STAR Behavioral Interview Technique.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","star","behavioral"],
    }),
  },

  "dialogue-debate-rebuttal-steelmanning-strategy": {
    id: "dialogue-debate-rebuttal-steelmanning-strategy",
    name: "DebateRebuttalSteelmanningStrategySkill",
    displayName: "Debate Rebuttal & Steelmanning Strategy",
    categoryId: "dialogue",
    description: "Reframes opponent arguments in their strongest form before presenting counter-evidence.",
    tags: ["dialogue","dialogue","debate","rebuttal"],
    transform: createStandardSkillTransform({
      sectionName: "Debate Rebuttal & Steelmanning Strategy Standards",
      ruSectionName: "Стандарты и регламенты: Debate Rebuttal & Steelmanning Strategy",
      instructions: [
        "Apply core domain tenets for Debate Rebuttal & Steelmanning Strategy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Debate Rebuttal & Steelmanning Strategy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","debate","rebuttal"],
    }),
  },

  "dialogue-constructive-feedback-situation-behavior-impact-sbi": {
    id: "dialogue-constructive-feedback-situation-behavior-impact-sbi",
    name: "ConstructiveFeedbackSituationBehaviorImpactSBISkill",
    displayName: "Constructive Feedback Situation-Behavior-Impact (SBI)",
    categoryId: "dialogue",
    description: "Delivers feedback focused on specific observed behaviors and tangible impact.",
    tags: ["dialogue","dialogue","constructive","feedback"],
    transform: createStandardSkillTransform({
      sectionName: "Constructive Feedback Situation-Behavior-Impact (SBI) Standards",
      ruSectionName: "Стандарты и регламенты: Constructive Feedback Situation-Behavior-Impact (SBI)",
      instructions: [
        "Apply core domain tenets for Constructive Feedback Situation-Behavior-Impact (SBI).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Constructive Feedback Situation-Behavior-Impact (SBI).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","constructive","feedback"],
    }),
  },

  "dialogue-action-commitment-meeting-closing-protocol": {
    id: "dialogue-action-commitment-meeting-closing-protocol",
    name: "ActionCommitmentMeetingClosingProtocolSkill",
    displayName: "Action Commitment Meeting Closing Protocol",
    categoryId: "dialogue",
    description: "Summarizes action items, assigned owners, and deadlines before ending discussions.",
    tags: ["dialogue","dialogue","action","commitment"],
    transform: createStandardSkillTransform({
      sectionName: "Action Commitment Meeting Closing Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Action Commitment Meeting Closing Protocol",
      instructions: [
        "Apply core domain tenets for Action Commitment Meeting Closing Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Action Commitment Meeting Closing Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","action","commitment"],
    }),
  },

  "dialogue-hostile-interrogation-de-escalation-pivot": {
    id: "dialogue-hostile-interrogation-de-escalation-pivot",
    name: "HostileInterrogationDeescalationPivotSkill",
    displayName: "Hostile Interrogation De-escalation & Pivot",
    categoryId: "dialogue",
    description: "Deflects aggressive interrogation tactics smoothly toward constructive dialogue.",
    tags: ["dialogue","dialogue","hostile","interrogation"],
    transform: createStandardSkillTransform({
      sectionName: "Hostile Interrogation De-escalation & Pivot Standards",
      ruSectionName: "Стандарты и регламенты: Hostile Interrogation De-escalation & Pivot",
      instructions: [
        "Apply core domain tenets for Hostile Interrogation De-escalation & Pivot.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Hostile Interrogation De-escalation & Pivot.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","hostile","interrogation"],
    }),
  },

  "dialogue-cross-functional-jargon-translation-dialogue": {
    id: "dialogue-cross-functional-jargon-translation-dialogue",
    name: "CrossFunctionalJargonTranslationDialogueSkill",
    displayName: "Cross-Functional Jargon Translation Dialogue",
    categoryId: "dialogue",
    description: "Bridges language gaps between engineering, marketing, and executive teams.",
    tags: ["dialogue","dialogue","cross","functional"],
    transform: createStandardSkillTransform({
      sectionName: "Cross-Functional Jargon Translation Dialogue Standards",
      ruSectionName: "Стандарты и регламенты: Cross-Functional Jargon Translation Dialogue",
      instructions: [
        "Apply core domain tenets for Cross-Functional Jargon Translation Dialogue.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cross-Functional Jargon Translation Dialogue.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","cross","functional"],
    }),
  },

  "dialogue-socratic-reframing-of-limiting-beliefs": {
    id: "dialogue-socratic-reframing-of-limiting-beliefs",
    name: "SocraticReframingofLimitingBeliefsSkill",
    displayName: "Socratic Reframing of Limiting Beliefs",
    categoryId: "dialogue",
    description: "Challenges user self-limiting assumptions through gentle logical inquiry.",
    tags: ["dialogue","dialogue","socratic","reframing"],
    transform: createStandardSkillTransform({
      sectionName: "Socratic Reframing of Limiting Beliefs Standards",
      ruSectionName: "Стандарты и регламенты: Socratic Reframing of Limiting Beliefs",
      instructions: [
        "Apply core domain tenets for Socratic Reframing of Limiting Beliefs.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Socratic Reframing of Limiting Beliefs.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","socratic","reframing"],
    }),
  },

  "dialogue-active-silence-thoughtful-pause-insertion": {
    id: "dialogue-active-silence-thoughtful-pause-insertion",
    name: "ActiveSilenceThoughtfulPauseInsertionSkill",
    displayName: "Active Silence & Thoughtful Pause Insertion",
    categoryId: "dialogue",
    description: "Inserts intentional pauses in dialogue to allow user processing time.",
    tags: ["dialogue","dialogue","active","silence"],
    transform: createStandardSkillTransform({
      sectionName: "Active Silence & Thoughtful Pause Insertion Standards",
      ruSectionName: "Стандарты и регламенты: Active Silence & Thoughtful Pause Insertion",
      instructions: [
        "Apply core domain tenets for Active Silence & Thoughtful Pause Insertion.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Active Silence & Thoughtful Pause Insertion.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","active","silence"],
    }),
  },

  "dialogue-multi-persona-roundtable-simulation": {
    id: "dialogue-multi-persona-roundtable-simulation",
    name: "MultiPersonaRoundtableSimulationSkill",
    displayName: "Multi-Persona Roundtable Simulation",
    categoryId: "dialogue",
    description: "Simulates a panel discussion among 3 distinct expert personas.",
    tags: ["dialogue","dialogue","multi","persona"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Persona Roundtable Simulation Standards",
      ruSectionName: "Стандарты и регламенты: Multi-Persona Roundtable Simulation",
      instructions: [
        "Apply core domain tenets for Multi-Persona Roundtable Simulation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Multi-Persona Roundtable Simulation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","multi","persona"],
    }),
  },

  "dialogue-crisis-hotline-supportive-dialogue-protocol": {
    id: "dialogue-crisis-hotline-supportive-dialogue-protocol",
    name: "CrisisHotlineSupportiveDialogueProtocolSkill",
    displayName: "Crisis Hotline Supportive Dialogue Protocol",
    categoryId: "dialogue",
    description: "Provides calm, stabilizing support during acute emotional distress.",
    tags: ["dialogue","dialogue","crisis","hotline"],
    transform: createStandardSkillTransform({
      sectionName: "Crisis Hotline Supportive Dialogue Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Crisis Hotline Supportive Dialogue Protocol",
      instructions: [
        "Apply core domain tenets for Crisis Hotline Supportive Dialogue Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Crisis Hotline Supportive Dialogue Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","crisis","hotline"],
    }),
  },

  "dialogue-strategic-questioning-for-sales-discovery": {
    id: "dialogue-strategic-questioning-for-sales-discovery",
    name: "StrategicQuestioningforSalesDiscoverySkill",
    displayName: "Strategic Questioning for Sales Discovery",
    categoryId: "dialogue",
    description: "Uncovers latent customer pain points through targeted discovery questioning.",
    tags: ["dialogue","dialogue","strategic","questioning"],
    transform: createStandardSkillTransform({
      sectionName: "Strategic Questioning for Sales Discovery Standards",
      ruSectionName: "Стандарты и регламенты: Strategic Questioning for Sales Discovery",
      instructions: [
        "Apply core domain tenets for Strategic Questioning for Sales Discovery.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Strategic Questioning for Sales Discovery.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","strategic","questioning"],
    }),
  },

  "dialogue-executive-coaching-accountability-check-in": {
    id: "dialogue-executive-coaching-accountability-check-in",
    name: "ExecutiveCoachingAccountabilityCheckInSkill",
    displayName: "Executive Coaching Accountability Check-In",
    categoryId: "dialogue",
    description: "Conducts structured accountability reviews on goal progress.",
    tags: ["dialogue","dialogue","executive","coaching"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Coaching Accountability Check-In Standards",
      ruSectionName: "Стандарты и регламенты: Executive Coaching Accountability Check-In",
      instructions: [
        "Apply core domain tenets for Executive Coaching Accountability Check-In.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Executive Coaching Accountability Check-In.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","executive","coaching"],
    }),
  },

  "dialogue-diplomatic-refusal-of-unreasonable-deadlines": {
    id: "dialogue-diplomatic-refusal-of-unreasonable-deadlines",
    name: "DiplomaticRefusalofUnreasonableDeadlinesSkill",
    displayName: "Diplomatic Refusal of Unreasonable Deadlines",
    categoryId: "dialogue",
    description: "Negotiates realistic project timelines without alienating stakeholders.",
    tags: ["dialogue","dialogue","diplomatic","refusal"],
    transform: createStandardSkillTransform({
      sectionName: "Diplomatic Refusal of Unreasonable Deadlines Standards",
      ruSectionName: "Стандарты и регламенты: Diplomatic Refusal of Unreasonable Deadlines",
      instructions: [
        "Apply core domain tenets for Diplomatic Refusal of Unreasonable Deadlines.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Diplomatic Refusal of Unreasonable Deadlines.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","diplomatic","refusal"],
    }),
  },

  "dialogue-cross-departmental-alignment-moderation": {
    id: "dialogue-cross-departmental-alignment-moderation",
    name: "CrossDepartmentalAlignmentModerationSkill",
    displayName: "Cross-Departmental Alignment Moderation",
    categoryId: "dialogue",
    description: "Aligns product, engineering, and sales teams on shared release priorities.",
    tags: ["dialogue","dialogue","cross","departmental"],
    transform: createStandardSkillTransform({
      sectionName: "Cross-Departmental Alignment Moderation Standards",
      ruSectionName: "Стандарты и регламенты: Cross-Departmental Alignment Moderation",
      instructions: [
        "Apply core domain tenets for Cross-Departmental Alignment Moderation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cross-Departmental Alignment Moderation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","cross","departmental"],
    }),
  },

  "dialogue-empathic-boundary-setting-with-demanding-clients": {
    id: "dialogue-empathic-boundary-setting-with-demanding-clients",
    name: "EmpathicBoundarySettingwithDemandingClientsSkill",
    displayName: "Empathic Boundary Setting with Demanding Clients",
    categoryId: "dialogue",
    description: "Protects team scope while maintaining positive client relationships.",
    tags: ["dialogue","dialogue","empathic","boundary"],
    transform: createStandardSkillTransform({
      sectionName: "Empathic Boundary Setting with Demanding Clients Standards",
      ruSectionName: "Стандарты и регламенты: Empathic Boundary Setting with Demanding Clients",
      instructions: [
        "Apply core domain tenets for Empathic Boundary Setting with Demanding Clients.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Empathic Boundary Setting with Demanding Clients.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","empathic","boundary"],
    }),
  },

  "dialogue-inspirational-leadership-all-hands-speech": {
    id: "dialogue-inspirational-leadership-all-hands-speech",
    name: "InspirationalLeadershipAllHandsSpeechSkill",
    displayName: "Inspirational Leadership All-Hands Speech",
    categoryId: "dialogue",
    description: "Rallies company employees around vision during organizational change.",
    tags: ["dialogue","dialogue","inspirational","leadership"],
    transform: createStandardSkillTransform({
      sectionName: "Inspirational Leadership All-Hands Speech Standards",
      ruSectionName: "Стандарты и регламенты: Inspirational Leadership All-Hands Speech",
      instructions: [
        "Apply core domain tenets for Inspirational Leadership All-Hands Speech.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Inspirational Leadership All-Hands Speech.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","inspirational","leadership"],
    }),
  },

  "dialogue-conflict-resolution-interest-based-bargaining": {
    id: "dialogue-conflict-resolution-interest-based-bargaining",
    name: "ConflictResolutionInterestBasedBargainingSkill",
    displayName: "Conflict Resolution Interest-Based Bargaining",
    categoryId: "dialogue",
    description: "Resolves interpersonal disputes by focusing on underlying interests rather than positions.",
    tags: ["dialogue","dialogue","conflict","resolution"],
    transform: createStandardSkillTransform({
      sectionName: "Conflict Resolution Interest-Based Bargaining Standards",
      ruSectionName: "Стандарты и регламенты: Conflict Resolution Interest-Based Bargaining",
      instructions: [
        "Apply core domain tenets for Conflict Resolution Interest-Based Bargaining.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Conflict Resolution Interest-Based Bargaining.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","conflict","resolution"],
    }),
  },

  "dialogue-peer-to-peer-code-review-feedback-dialogue": {
    id: "dialogue-peer-to-peer-code-review-feedback-dialogue",
    name: "PeertoPeerCodeReviewFeedbackDialogueSkill",
    displayName: "Peer-to-Peer Code Review Feedback Dialogue",
    categoryId: "dialogue",
    description: "Delivers constructive, respectful code review comments focused on improvement.",
    tags: ["dialogue","dialogue","peer","to"],
    transform: createStandardSkillTransform({
      sectionName: "Peer-to-Peer Code Review Feedback Dialogue Standards",
      ruSectionName: "Стандарты и регламенты: Peer-to-Peer Code Review Feedback Dialogue",
      instructions: [
        "Apply core domain tenets for Peer-to-Peer Code Review Feedback Dialogue.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Peer-to-Peer Code Review Feedback Dialogue.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","peer","to"],
    }),
  },

  "dialogue-customer-offboarding-exit-interview-protocol": {
    id: "dialogue-customer-offboarding-exit-interview-protocol",
    name: "CustomerOffboardingExitInterviewProtocolSkill",
    displayName: "Customer Offboarding & Exit Interview Protocol",
    categoryId: "dialogue",
    description: "Gathers candid exit feedback while leaving doors open for future return.",
    tags: ["dialogue","dialogue","customer","offboarding"],
    transform: createStandardSkillTransform({
      sectionName: "Customer Offboarding & Exit Interview Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Customer Offboarding & Exit Interview Protocol",
      instructions: [
        "Apply core domain tenets for Customer Offboarding & Exit Interview Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Customer Offboarding & Exit Interview Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","customer","offboarding"],
    }),
  },

  "dialogue-cross-cultural-business-etiquette-navigation": {
    id: "dialogue-cross-cultural-business-etiquette-navigation",
    name: "CrossCulturalBusinessEtiquetteNavigationSkill",
    displayName: "Cross-Cultural Business Etiquette Navigation",
    categoryId: "dialogue",
    description: "Navigates international business meetings with cultural sensitivity.",
    tags: ["dialogue","dialogue","cross","cultural"],
    transform: createStandardSkillTransform({
      sectionName: "Cross-Cultural Business Etiquette Navigation Standards",
      ruSectionName: "Стандарты и регламенты: Cross-Cultural Business Etiquette Navigation",
      instructions: [
        "Apply core domain tenets for Cross-Cultural Business Etiquette Navigation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cross-Cultural Business Etiquette Navigation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","cross","cultural"],
    }),
  },

  "dialogue-interactive-workshop-facilitation-sequence": {
    id: "dialogue-interactive-workshop-facilitation-sequence",
    name: "InteractiveWorkshopFacilitationSequenceSkill",
    displayName: "Interactive Workshop Facilitation Sequence",
    categoryId: "dialogue",
    description: "Facilitates collaborative team workshops with high engagement.",
    tags: ["dialogue","dialogue","interactive","workshop"],
    transform: createStandardSkillTransform({
      sectionName: "Interactive Workshop Facilitation Sequence Standards",
      ruSectionName: "Стандарты и регламенты: Interactive Workshop Facilitation Sequence",
      instructions: [
        "Apply core domain tenets for Interactive Workshop Facilitation Sequence.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Interactive Workshop Facilitation Sequence.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","interactive","workshop"],
    }),
  },

  "dialogue-empathetic-medical-bad-news-delivery": {
    id: "dialogue-empathetic-medical-bad-news-delivery",
    name: "EmpatheticMedicalBadNewsDeliverySkill",
    displayName: "Empathetic Medical Bad News Delivery",
    categoryId: "dialogue",
    description: "Communicates difficult medical diagnoses with compassion and clarity.",
    tags: ["dialogue","dialogue","empathetic","medical"],
    transform: createStandardSkillTransform({
      sectionName: "Empathetic Medical Bad News Delivery Standards",
      ruSectionName: "Стандарты и регламенты: Empathetic Medical Bad News Delivery",
      instructions: [
        "Apply core domain tenets for Empathetic Medical Bad News Delivery.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Empathetic Medical Bad News Delivery.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","empathetic","medical"],
    }),
  },

  "dialogue-parent-teacher-collaborative-dialogue-protocol": {
    id: "dialogue-parent-teacher-collaborative-dialogue-protocol",
    name: "ParentTeacherCollaborativeDialogueProtocolSkill",
    displayName: "Parent-Teacher Collaborative Dialogue Protocol",
    categoryId: "dialogue",
    description: "Builds supportive partnerships between educators and parents.",
    tags: ["dialogue","dialogue","parent","teacher"],
    transform: createStandardSkillTransform({
      sectionName: "Parent-Teacher Collaborative Dialogue Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Parent-Teacher Collaborative Dialogue Protocol",
      instructions: [
        "Apply core domain tenets for Parent-Teacher Collaborative Dialogue Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Parent-Teacher Collaborative Dialogue Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","parent","teacher"],
    }),
  },

  "dialogue-investor-q-a-defense-objection-handling": {
    id: "dialogue-investor-q-a-defense-objection-handling",
    name: "InvestorQADefenseObjectionHandlingSkill",
    displayName: "Investor Q&A Defense & Objection Handling",
    categoryId: "dialogue",
    description: "Answers tough venture capital pitch questions with poise and hard data.",
    tags: ["dialogue","dialogue","investor","q"],
    transform: createStandardSkillTransform({
      sectionName: "Investor Q&A Defense & Objection Handling Standards",
      ruSectionName: "Стандарты и регламенты: Investor Q&A Defense & Objection Handling",
      instructions: [
        "Apply core domain tenets for Investor Q&A Defense & Objection Handling.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Investor Q&A Defense & Objection Handling.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","investor","q"],
    }),
  },

  "dialogue-mentorship-career-guidance-dialogue-arc": {
    id: "dialogue-mentorship-career-guidance-dialogue-arc",
    name: "MentorshipCareerGuidanceDialogueArcSkill",
    displayName: "Mentorship Career Guidance Dialogue Arc",
    categoryId: "dialogue",
    description: "Guides junior mentees through career planning and skill development.",
    tags: ["dialogue","dialogue","mentorship","career"],
    transform: createStandardSkillTransform({
      sectionName: "Mentorship Career Guidance Dialogue Arc Standards",
      ruSectionName: "Стандарты и регламенты: Mentorship Career Guidance Dialogue Arc",
      instructions: [
        "Apply core domain tenets for Mentorship Career Guidance Dialogue Arc.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Mentorship Career Guidance Dialogue Arc.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","mentorship","career"],
    }),
  },

  "dialogue-community-forum-moderation-de-trolling": {
    id: "dialogue-community-forum-moderation-de-trolling",
    name: "CommunityForumModerationDetrollingSkill",
    displayName: "Community Forum Moderation & De-trolling",
    categoryId: "dialogue",
    description: "De-escalates heated online forum debates while enforcing community standards.",
    tags: ["dialogue","dialogue","community","forum"],
    transform: createStandardSkillTransform({
      sectionName: "Community Forum Moderation & De-trolling Standards",
      ruSectionName: "Стандарты и регламенты: Community Forum Moderation & De-trolling",
      instructions: [
        "Apply core domain tenets for Community Forum Moderation & De-trolling.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Community Forum Moderation & De-trolling.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","community","forum"],
    }),
  },

  "dialogue-user-research-usability-test-moderation": {
    id: "dialogue-user-research-usability-test-moderation",
    name: "UserResearchUsabilityTestModerationSkill",
    displayName: "User Research Usability Test Moderation",
    categoryId: "dialogue",
    description: "Guides usability test participants without biasing their natural interactions.",
    tags: ["dialogue","dialogue","user","research"],
    transform: createStandardSkillTransform({
      sectionName: "User Research Usability Test Moderation Standards",
      ruSectionName: "Стандарты и регламенты: User Research Usability Test Moderation",
      instructions: [
        "Apply core domain tenets for User Research Usability Test Moderation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для User Research Usability Test Moderation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","user","research"],
    }),
  },

  "dialogue-sales-objection-defusal-value-re-anchoring": {
    id: "dialogue-sales-objection-defusal-value-re-anchoring",
    name: "SalesObjectionDefusalValueReanchoringSkill",
    displayName: "Sales Objection Defusal & Value Re-anchoring",
    categoryId: "dialogue",
    description: "Reframes price objections around return on investment.",
    tags: ["dialogue","dialogue","sales","objection"],
    transform: createStandardSkillTransform({
      sectionName: "Sales Objection Defusal & Value Re-anchoring Standards",
      ruSectionName: "Стандарты и регламенты: Sales Objection Defusal & Value Re-anchoring",
      instructions: [
        "Apply core domain tenets for Sales Objection Defusal & Value Re-anchoring.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sales Objection Defusal & Value Re-anchoring.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","sales","objection"],
    }),
  },

  "dialogue-diplomatic-performance-improvement-plan-pip-dialogue": {
    id: "dialogue-diplomatic-performance-improvement-plan-pip-dialogue",
    name: "DiplomaticPerformanceImprovementPlanPIPDialogueSkill",
    displayName: "Diplomatic Performance Improvement Plan (PIP) Dialogue",
    categoryId: "dialogue",
    description: "Delivers PIP reviews with clear performance expectations and support.",
    tags: ["dialogue","dialogue","diplomatic","performance"],
    transform: createStandardSkillTransform({
      sectionName: "Diplomatic Performance Improvement Plan (PIP) Dialogue Standards",
      ruSectionName: "Стандарты и регламенты: Diplomatic Performance Improvement Plan (PIP) Dialogue",
      instructions: [
        "Apply core domain tenets for Diplomatic Performance Improvement Plan (PIP) Dialogue.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Diplomatic Performance Improvement Plan (PIP) Dialogue.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","diplomatic","performance"],
    }),
  },

  "dialogue-asynchronous-slack-teams-communication-etiquette": {
    id: "dialogue-asynchronous-slack-teams-communication-etiquette",
    name: "AsynchronousSlackTeamsCommunicationEtiquetteSkill",
    displayName: "Asynchronous Slack/Teams Communication Etiquette",
    categoryId: "dialogue",
    description: "Formats async chat messages for maximum clarity and minimal disruption.",
    tags: ["dialogue","dialogue","asynchronous","slack"],
    transform: createStandardSkillTransform({
      sectionName: "Asynchronous Slack/Teams Communication Etiquette Standards",
      ruSectionName: "Стандарты и регламенты: Asynchronous Slack/Teams Communication Etiquette",
      instructions: [
        "Apply core domain tenets for Asynchronous Slack/Teams Communication Etiquette.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Asynchronous Slack/Teams Communication Etiquette.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","asynchronous","slack"],
    }),
  },

  "dialogue-brainstorming-group-dynamic-moderation": {
    id: "dialogue-brainstorming-group-dynamic-moderation",
    name: "BrainstormingGroupDynamicModerationSkill",
    displayName: "Brainstorming Group Dynamic Moderation",
    categoryId: "dialogue",
    description: "Facilitates creative group brainstorming ensuring equal speaking time.",
    tags: ["dialogue","dialogue","brainstorming","group"],
    transform: createStandardSkillTransform({
      sectionName: "Brainstorming Group Dynamic Moderation Standards",
      ruSectionName: "Стандарты и регламенты: Brainstorming Group Dynamic Moderation",
      instructions: [
        "Apply core domain tenets for Brainstorming Group Dynamic Moderation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Brainstorming Group Dynamic Moderation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","brainstorming","group"],
    }),
  },

  "dialogue-executive-sponsor-status-briefing": {
    id: "dialogue-executive-sponsor-status-briefing",
    name: "ExecutiveSponsorStatusBriefingSkill",
    displayName: "Executive Sponsor Status Briefing",
    categoryId: "dialogue",
    description: "Delivers concise, high-density project status updates to C-level sponsors.",
    tags: ["dialogue","dialogue","executive","sponsor"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Sponsor Status Briefing Standards",
      ruSectionName: "Стандарты и регламенты: Executive Sponsor Status Briefing",
      instructions: [
        "Apply core domain tenets for Executive Sponsor Status Briefing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Executive Sponsor Status Briefing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","executive","sponsor"],
    }),
  },

  "dialogue-vendor-price-contract-negotiation-dialogue": {
    id: "dialogue-vendor-price-contract-negotiation-dialogue",
    name: "VendorPriceContractNegotiationDialogueSkill",
    displayName: "Vendor Price Contract Negotiation Dialogue",
    categoryId: "dialogue",
    description: "Negotiates vendor contract terms while preserving long-term partnership.",
    tags: ["dialogue","dialogue","vendor","price"],
    transform: createStandardSkillTransform({
      sectionName: "Vendor Price Contract Negotiation Dialogue Standards",
      ruSectionName: "Стандарты и регламенты: Vendor Price Contract Negotiation Dialogue",
      instructions: [
        "Apply core domain tenets for Vendor Price Contract Negotiation Dialogue.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Vendor Price Contract Negotiation Dialogue.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","vendor","price"],
    }),
  },

  "dialogue-cross-generational-workplace-dialogue-bridging": {
    id: "dialogue-cross-generational-workplace-dialogue-bridging",
    name: "CrossGenerationalWorkplaceDialogueBridgingSkill",
    displayName: "Cross-Generational Workplace Dialogue Bridging",
    categoryId: "dialogue",
    description: "Bridges communication style differences across Gen Z, Millennial, and Gen X.",
    tags: ["dialogue","dialogue","cross","generational"],
    transform: createStandardSkillTransform({
      sectionName: "Cross-Generational Workplace Dialogue Bridging Standards",
      ruSectionName: "Стандарты и регламенты: Cross-Generational Workplace Dialogue Bridging",
      instructions: [
        "Apply core domain tenets for Cross-Generational Workplace Dialogue Bridging.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cross-Generational Workplace Dialogue Bridging.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","cross","generational"],
    }),
  },

  "dialogue-empathetic-apology-service-recovery": {
    id: "dialogue-empathetic-apology-service-recovery",
    name: "EmpatheticApologyServiceRecoverySkill",
    displayName: "Empathetic Apology & Service Recovery",
    categoryId: "dialogue",
    description: "Delivers sincere service recovery communications after product failures.",
    tags: ["dialogue","dialogue","empathetic","apology"],
    transform: createStandardSkillTransform({
      sectionName: "Empathetic Apology & Service Recovery Standards",
      ruSectionName: "Стандарты и регламенты: Empathetic Apology & Service Recovery",
      instructions: [
        "Apply core domain tenets for Empathetic Apology & Service Recovery.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Empathetic Apology & Service Recovery.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","empathetic","apology"],
    }),
  },

  "dialogue-stakeholder-alignment-matrix-dialogue": {
    id: "dialogue-stakeholder-alignment-matrix-dialogue",
    name: "StakeholderAlignmentMatrixDialogueSkill",
    displayName: "Stakeholder Alignment Matrix Dialogue",
    categoryId: "dialogue",
    description: "Maps and addresses diverse stakeholder interests in major IT projects.",
    tags: ["dialogue","dialogue","stakeholder","alignment"],
    transform: createStandardSkillTransform({
      sectionName: "Stakeholder Alignment Matrix Dialogue Standards",
      ruSectionName: "Стандарты и регламенты: Stakeholder Alignment Matrix Dialogue",
      instructions: [
        "Apply core domain tenets for Stakeholder Alignment Matrix Dialogue.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Stakeholder Alignment Matrix Dialogue.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","stakeholder","alignment"],
    }),
  },

  "dialogue-public-panel-discussion-moderation-arc": {
    id: "dialogue-public-panel-discussion-moderation-arc",
    name: "PublicPanelDiscussionModerationArcSkill",
    displayName: "Public Panel Discussion Moderation Arc",
    categoryId: "dialogue",
    description: "Moderates live panel discussions with dynamic time management and Q&A.",
    tags: ["dialogue","dialogue","public","panel"],
    transform: createStandardSkillTransform({
      sectionName: "Public Panel Discussion Moderation Arc Standards",
      ruSectionName: "Стандарты и регламенты: Public Panel Discussion Moderation Arc",
      instructions: [
        "Apply core domain tenets for Public Panel Discussion Moderation Arc.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Public Panel Discussion Moderation Arc.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","public","panel"],
    }),
  },

  "dialogue-sales-discovery-bant-qualification-dialogue": {
    id: "dialogue-sales-discovery-bant-qualification-dialogue",
    name: "SalesDiscoveryBANTQualificationDialogueSkill",
    displayName: "Sales Discovery BANT Qualification Dialogue",
    categoryId: "dialogue",
    description: "Qualifies enterprise leads across Budget, Authority, Need, and Timeline.",
    tags: ["dialogue","dialogue","sales","discovery"],
    transform: createStandardSkillTransform({
      sectionName: "Sales Discovery BANT Qualification Dialogue Standards",
      ruSectionName: "Стандарты и регламенты: Sales Discovery BANT Qualification Dialogue",
      instructions: [
        "Apply core domain tenets for Sales Discovery BANT Qualification Dialogue.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sales Discovery BANT Qualification Dialogue.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","sales","discovery"],
    }),
  },

  "dialogue-academic-thesis-defense-defense-preparation": {
    id: "dialogue-academic-thesis-defense-defense-preparation",
    name: "AcademicThesisDefenseDefensePreparationSkill",
    displayName: "Academic Thesis Defense Defense Preparation",
    categoryId: "dialogue",
    description: "Prepares graduate students to defend research findings against faculty critique.",
    tags: ["dialogue","dialogue","academic","thesis"],
    transform: createStandardSkillTransform({
      sectionName: "Academic Thesis Defense Defense Preparation Standards",
      ruSectionName: "Стандарты и регламенты: Academic Thesis Defense Defense Preparation",
      instructions: [
        "Apply core domain tenets for Academic Thesis Defense Defense Preparation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Academic Thesis Defense Defense Preparation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","academic","thesis"],
    }),
  },

  "dialogue-customer-success-onboarding-kickoff-call": {
    id: "dialogue-customer-success-onboarding-kickoff-call",
    name: "CustomerSuccessOnboardingKickoffCallSkill",
    displayName: "Customer Success Onboarding Kickoff Call",
    categoryId: "dialogue",
    description: "Conducts energetic SaaS customer onboarding calls establishing success milestones.",
    tags: ["dialogue","dialogue","customer","success"],
    transform: createStandardSkillTransform({
      sectionName: "Customer Success Onboarding Kickoff Call Standards",
      ruSectionName: "Стандарты и регламенты: Customer Success Onboarding Kickoff Call",
      instructions: [
        "Apply core domain tenets for Customer Success Onboarding Kickoff Call.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Customer Success Onboarding Kickoff Call.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","customer","success"],
    }),
  },

  "dialogue-difficult-feedback-sandwich-technique-genuinely-applied": {
    id: "dialogue-difficult-feedback-sandwich-technique-genuinely-applied",
    name: "DifficultFeedbackSandwichTechniqueGenuinelyAppliedSkill",
    displayName: "Difficult Feedback Sandwich Technique (Genuinely Applied)",
    categoryId: "dialogue",
    description: "Delivers corrective feedback framed between authentic positive recognition.",
    tags: ["dialogue","dialogue","difficult","feedback"],
    transform: createStandardSkillTransform({
      sectionName: "Difficult Feedback Sandwich Technique (Genuinely Applied) Standards",
      ruSectionName: "Стандарты и регламенты: Difficult Feedback Sandwich Technique (Genuinely Applied)",
      instructions: [
        "Apply core domain tenets for Difficult Feedback Sandwich Technique (Genuinely Applied).",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Difficult Feedback Sandwich Technique (Genuinely Applied).",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","difficult","feedback"],
    }),
  },

  "dialogue-cross-border-virtual-team-trust-building": {
    id: "dialogue-cross-border-virtual-team-trust-building",
    name: "CrossBorderVirtualTeamTrustBuildingSkill",
    displayName: "Cross-Border Virtual Team Trust Building",
    categoryId: "dialogue",
    description: "Builds psychological safety and cohesion in remote distributed teams.",
    tags: ["dialogue","dialogue","cross","border"],
    transform: createStandardSkillTransform({
      sectionName: "Cross-Border Virtual Team Trust Building Standards",
      ruSectionName: "Стандарты и регламенты: Cross-Border Virtual Team Trust Building",
      instructions: [
        "Apply core domain tenets for Cross-Border Virtual Team Trust Building.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cross-Border Virtual Team Trust Building.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","cross","border"],
    }),
  },

  "dialogue-interactive-storytelling-roleplay-game-master": {
    id: "dialogue-interactive-storytelling-roleplay-game-master",
    name: "InteractiveStorytellingRoleplayGameMasterSkill",
    displayName: "Interactive Storytelling Roleplay Game Master",
    categoryId: "dialogue",
    description: "Guides players through immersive interactive fiction choices.",
    tags: ["dialogue","dialogue","interactive","storytelling"],
    transform: createStandardSkillTransform({
      sectionName: "Interactive Storytelling Roleplay Game Master Standards",
      ruSectionName: "Стандарты и регламенты: Interactive Storytelling Roleplay Game Master",
      instructions: [
        "Apply core domain tenets for Interactive Storytelling Roleplay Game Master.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Interactive Storytelling Roleplay Game Master.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","interactive","storytelling"],
    }),
  },

  "dialogue-diplomatic-scope-creep-re-negotiation": {
    id: "dialogue-diplomatic-scope-creep-re-negotiation",
    name: "DiplomaticScopeCreepRenegotiationSkill",
    displayName: "Diplomatic Scope Creep Re-negotiation",
    categoryId: "dialogue",
    description: "Manages client feature requests while protecting contract budget and timeline.",
    tags: ["dialogue","dialogue","diplomatic","scope"],
    transform: createStandardSkillTransform({
      sectionName: "Diplomatic Scope Creep Re-negotiation Standards",
      ruSectionName: "Стандарты и регламенты: Diplomatic Scope Creep Re-negotiation",
      instructions: [
        "Apply core domain tenets for Diplomatic Scope Creep Re-negotiation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Diplomatic Scope Creep Re-negotiation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","diplomatic","scope"],
    }),
  },

  "dialogue-strategic-advisory-session-framing": {
    id: "dialogue-strategic-advisory-session-framing",
    name: "StrategicAdvisorySessionFramingSkill",
    displayName: "Strategic Advisory Session Framing",
    categoryId: "dialogue",
    description: "Positions advisory sessions to deliver high-value strategic direction.",
    tags: ["dialogue","dialogue","strategic","advisory"],
    transform: createStandardSkillTransform({
      sectionName: "Strategic Advisory Session Framing Standards",
      ruSectionName: "Стандарты и регламенты: Strategic Advisory Session Framing",
      instructions: [
        "Apply core domain tenets for Strategic Advisory Session Framing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Strategic Advisory Session Framing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","strategic","advisory"],
    }),
  },

  "dialogue-crisis-incident-war-room-communication": {
    id: "dialogue-crisis-incident-war-room-communication",
    name: "CrisisIncidentWarRoomCommunicationSkill",
    displayName: "Crisis Incident War Room Communication",
    categoryId: "dialogue",
    description: "Coordinates engineering war room communications during major outages.",
    tags: ["dialogue","dialogue","crisis","incident"],
    transform: createStandardSkillTransform({
      sectionName: "Crisis Incident War Room Communication Standards",
      ruSectionName: "Стандарты и регламенты: Crisis Incident War Room Communication",
      instructions: [
        "Apply core domain tenets for Crisis Incident War Room Communication.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Crisis Incident War Room Communication.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","crisis","incident"],
    }),
  },

  "dialogue-change-management-communication-sequence": {
    id: "dialogue-change-management-communication-sequence",
    name: "ChangeManagementCommunicationSequenceSkill",
    displayName: "Change Management Communication Sequence",
    categoryId: "dialogue",
    description: "Communicates enterprise software transitions to minimize employee anxiety.",
    tags: ["dialogue","dialogue","change","management"],
    transform: createStandardSkillTransform({
      sectionName: "Change Management Communication Sequence Standards",
      ruSectionName: "Стандарты и регламенты: Change Management Communication Sequence",
      instructions: [
        "Apply core domain tenets for Change Management Communication Sequence.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Change Management Communication Sequence.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","change","management"],
    }),
  },

  "dialogue-empathetic-design-research-interviewing": {
    id: "dialogue-empathetic-design-research-interviewing",
    name: "EmpatheticDesignResearchInterviewingSkill",
    displayName: "Empathetic Design Research Interviewing",
    categoryId: "dialogue",
    description: "Conducts deep ethnographic interviews uncovering latent user needs.",
    tags: ["dialogue","dialogue","empathetic","design"],
    transform: createStandardSkillTransform({
      sectionName: "Empathetic Design Research Interviewing Standards",
      ruSectionName: "Стандарты и регламенты: Empathetic Design Research Interviewing",
      instructions: [
        "Apply core domain tenets for Empathetic Design Research Interviewing.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Empathetic Design Research Interviewing.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","empathetic","design"],
    }),
  },

  "dialogue-high-stakes-media-press-conference-q-a": {
    id: "dialogue-high-stakes-media-press-conference-q-a",
    name: "HighStakesMediaPressConferenceQASkill",
    displayName: "High-Stakes Media Press Conference Q&A",
    categoryId: "dialogue",
    description: "Prepares corporate spokespeople to handle hostile press questioning.",
    tags: ["dialogue","dialogue","high","stakes"],
    transform: createStandardSkillTransform({
      sectionName: "High-Stakes Media Press Conference Q&A Standards",
      ruSectionName: "Стандарты и регламенты: High-Stakes Media Press Conference Q&A",
      instructions: [
        "Apply core domain tenets for High-Stakes Media Press Conference Q&A.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для High-Stakes Media Press Conference Q&A.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","high","stakes"],
    }),
  },

  "dialogue-product-manager-vs-engineering-trade-off-negotiation": {
    id: "dialogue-product-manager-vs-engineering-trade-off-negotiation",
    name: "ProductManagervsEngineeringTradeoffNegotiationSkill",
    displayName: "Product Manager vs Engineering Trade-off Negotiation",
    categoryId: "dialogue",
    description: "Facilitates constructive trade-off debates between scope and technical debt.",
    tags: ["dialogue","dialogue","product","manager"],
    transform: createStandardSkillTransform({
      sectionName: "Product Manager vs Engineering Trade-off Negotiation Standards",
      ruSectionName: "Стандарты и регламенты: Product Manager vs Engineering Trade-off Negotiation",
      instructions: [
        "Apply core domain tenets for Product Manager vs Engineering Trade-off Negotiation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Product Manager vs Engineering Trade-off Negotiation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","product","manager"],
    }),
  },

  "dialogue-peer-mentorship-knowledge-transfer-dialogue": {
    id: "dialogue-peer-mentorship-knowledge-transfer-dialogue",
    name: "PeerMentorshipKnowledgeTransferDialogueSkill",
    displayName: "Peer Mentorship Knowledge Transfer Dialogue",
    categoryId: "dialogue",
    description: "Structures knowledge sharing sessions between senior and junior engineers.",
    tags: ["dialogue","dialogue","peer","mentorship"],
    transform: createStandardSkillTransform({
      sectionName: "Peer Mentorship Knowledge Transfer Dialogue Standards",
      ruSectionName: "Стандарты и регламенты: Peer Mentorship Knowledge Transfer Dialogue",
      instructions: [
        "Apply core domain tenets for Peer Mentorship Knowledge Transfer Dialogue.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Peer Mentorship Knowledge Transfer Dialogue.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","peer","mentorship"],
    }),
  },

  "dialogue-executive-compensation-negotiation-dialogue": {
    id: "dialogue-executive-compensation-negotiation-dialogue",
    name: "ExecutiveCompensationNegotiationDialogueSkill",
    displayName: "Executive Compensation Negotiation Dialogue",
    categoryId: "dialogue",
    description: "Navigates executive job offer compensation negotiations professionally.",
    tags: ["dialogue","dialogue","executive","compensation"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Compensation Negotiation Dialogue Standards",
      ruSectionName: "Стандарты и регламенты: Executive Compensation Negotiation Dialogue",
      instructions: [
        "Apply core domain tenets for Executive Compensation Negotiation Dialogue.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Executive Compensation Negotiation Dialogue.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","executive","compensation"],
    }),
  },

  "dialogue-nonprofit-donor-relationship-cultivation": {
    id: "dialogue-nonprofit-donor-relationship-cultivation",
    name: "NonprofitDonorRelationshipCultivationSkill",
    displayName: "Nonprofit Donor Relationship Cultivation",
    categoryId: "dialogue",
    description: "Builds long-term relationships with major philanthropic donors.",
    tags: ["dialogue","dialogue","nonprofit","donor"],
    transform: createStandardSkillTransform({
      sectionName: "Nonprofit Donor Relationship Cultivation Standards",
      ruSectionName: "Стандарты и регламенты: Nonprofit Donor Relationship Cultivation",
      instructions: [
        "Apply core domain tenets for Nonprofit Donor Relationship Cultivation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Nonprofit Donor Relationship Cultivation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","nonprofit","donor"],
    }),
  },

  "dialogue-patient-centered-medical-consultation-arc": {
    id: "dialogue-patient-centered-medical-consultation-arc",
    name: "PatientCenteredMedicalConsultationArcSkill",
    displayName: "Patient-Centered Medical Consultation Arc",
    categoryId: "dialogue",
    description: "Conducts thorough, empathetic medical consultations active in shared decision making.",
    tags: ["dialogue","dialogue","patient","centered"],
    transform: createStandardSkillTransform({
      sectionName: "Patient-Centered Medical Consultation Arc Standards",
      ruSectionName: "Стандарты и регламенты: Patient-Centered Medical Consultation Arc",
      instructions: [
        "Apply core domain tenets for Patient-Centered Medical Consultation Arc.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Patient-Centered Medical Consultation Arc.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","patient","centered"],
    }),
  },

  "dialogue-agile-retrospective-retrospective-facilitation": {
    id: "dialogue-agile-retrospective-retrospective-facilitation",
    name: "AgileRetrospectiveRetrospectiveFacilitationSkill",
    displayName: "Agile Retrospective Retrospective Facilitation",
    categoryId: "dialogue",
    description: "Leads team retrospectives that produce actionable process improvements.",
    tags: ["dialogue","dialogue","agile","retrospective"],
    transform: createStandardSkillTransform({
      sectionName: "Agile Retrospective Retrospective Facilitation Standards",
      ruSectionName: "Стандарты и регламенты: Agile Retrospective Retrospective Facilitation",
      instructions: [
        "Apply core domain tenets for Agile Retrospective Retrospective Facilitation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Agile Retrospective Retrospective Facilitation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","agile","retrospective"],
    }),
  },

  "dialogue-strategic-partnership-exploratory-meeting": {
    id: "dialogue-strategic-partnership-exploratory-meeting",
    name: "StrategicPartnershipExploratoryMeetingSkill",
    displayName: "Strategic Partnership Exploratory Meeting",
    categoryId: "dialogue",
    description: "Conducts initial partnership meetings exploring mutual win-win opportunities.",
    tags: ["dialogue","dialogue","strategic","partnership"],
    transform: createStandardSkillTransform({
      sectionName: "Strategic Partnership Exploratory Meeting Standards",
      ruSectionName: "Стандарты и регламенты: Strategic Partnership Exploratory Meeting",
      instructions: [
        "Apply core domain tenets for Strategic Partnership Exploratory Meeting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Strategic Partnership Exploratory Meeting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","strategic","partnership"],
    }),
  },

  "dialogue-diplomatic-open-source-contributor-pr-feedback": {
    id: "dialogue-diplomatic-open-source-contributor-pr-feedback",
    name: "DiplomaticOpenSourceContributorPRFeedbackSkill",
    displayName: "Diplomatic Open Source Contributor PR Feedback",
    categoryId: "dialogue",
    description: "Reviews open source pull requests with encouraging, constructive guidance.",
    tags: ["dialogue","dialogue","diplomatic","open"],
    transform: createStandardSkillTransform({
      sectionName: "Diplomatic Open Source Contributor PR Feedback Standards",
      ruSectionName: "Стандарты и регламенты: Diplomatic Open Source Contributor PR Feedback",
      instructions: [
        "Apply core domain tenets for Diplomatic Open Source Contributor PR Feedback.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Diplomatic Open Source Contributor PR Feedback.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","diplomatic","open"],
    }),
  },

  "dialogue-customer-churn-prevention-save-offer-dialogue": {
    id: "dialogue-customer-churn-prevention-save-offer-dialogue",
    name: "CustomerChurnPreventionSaveOfferDialogueSkill",
    displayName: "Customer Churn Prevention Save Offer Dialogue",
    categoryId: "dialogue",
    description: "Engages cancelling customers with personalized save offers.",
    tags: ["dialogue","dialogue","customer","churn"],
    transform: createStandardSkillTransform({
      sectionName: "Customer Churn Prevention Save Offer Dialogue Standards",
      ruSectionName: "Стандарты и регламенты: Customer Churn Prevention Save Offer Dialogue",
      instructions: [
        "Apply core domain tenets for Customer Churn Prevention Save Offer Dialogue.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Customer Churn Prevention Save Offer Dialogue.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","customer","churn"],
    }),
  },

  "dialogue-cross-functional-post-mortem-facilitation": {
    id: "dialogue-cross-functional-post-mortem-facilitation",
    name: "CrossFunctionalPostMortemFacilitationSkill",
    displayName: "Cross-Functional Post-Mortem Facilitation",
    categoryId: "dialogue",
    description: "Leads blameless post-mortem reviews isolating systemic process failures.",
    tags: ["dialogue","dialogue","cross","functional"],
    transform: createStandardSkillTransform({
      sectionName: "Cross-Functional Post-Mortem Facilitation Standards",
      ruSectionName: "Стандарты и регламенты: Cross-Functional Post-Mortem Facilitation",
      instructions: [
        "Apply core domain tenets for Cross-Functional Post-Mortem Facilitation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cross-Functional Post-Mortem Facilitation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","cross","functional"],
    }),
  },

  "dialogue-executive-thought-leadership-podcast-guest-arc": {
    id: "dialogue-executive-thought-leadership-podcast-guest-arc",
    name: "ExecutiveThoughtLeadershipPodcastGuestArcSkill",
    displayName: "Executive Thought Leadership Podcast Guest Arc",
    categoryId: "dialogue",
    description: "Prepares executives to deliver high-impact podcast interview appearances.",
    tags: ["dialogue","dialogue","executive","thought"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Thought Leadership Podcast Guest Arc Standards",
      ruSectionName: "Стандарты и регламенты: Executive Thought Leadership Podcast Guest Arc",
      instructions: [
        "Apply core domain tenets for Executive Thought Leadership Podcast Guest Arc.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Executive Thought Leadership Podcast Guest Arc.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","executive","thought"],
    }),
  },

  "dialogue-sales-demo-custom-value-proposition-alignment": {
    id: "dialogue-sales-demo-custom-value-proposition-alignment",
    name: "SalesDemoCustomValuePropositionAlignmentSkill",
    displayName: "Sales Demo Custom Value Proposition Alignment",
    categoryId: "dialogue",
    description: "Tailors live product demos directly to prospect pain points.",
    tags: ["dialogue","dialogue","sales","demo"],
    transform: createStandardSkillTransform({
      sectionName: "Sales Demo Custom Value Proposition Alignment Standards",
      ruSectionName: "Стандарты и регламенты: Sales Demo Custom Value Proposition Alignment",
      instructions: [
        "Apply core domain tenets for Sales Demo Custom Value Proposition Alignment.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sales Demo Custom Value Proposition Alignment.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","sales","demo"],
    }),
  },

  "dialogue-diplomatic-board-meeting-dispute-neutralization": {
    id: "dialogue-diplomatic-board-meeting-dispute-neutralization",
    name: "DiplomaticBoardMeetingDisputeNeutralizationSkill",
    displayName: "Diplomatic Board Meeting Dispute Neutralization",
    categoryId: "dialogue",
    description: "De-escalates tense board meeting disagreements toward constructive consensus.",
    tags: ["dialogue","dialogue","diplomatic","board"],
    transform: createStandardSkillTransform({
      sectionName: "Diplomatic Board Meeting Dispute Neutralization Standards",
      ruSectionName: "Стандарты и регламенты: Diplomatic Board Meeting Dispute Neutralization",
      instructions: [
        "Apply core domain tenets for Diplomatic Board Meeting Dispute Neutralization.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Diplomatic Board Meeting Dispute Neutralization.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","diplomatic","board"],
    }),
  },

  "dialogue-inclusive-discussion-moderation-for-introverts": {
    id: "dialogue-inclusive-discussion-moderation-for-introverts",
    name: "InclusiveDiscussionModerationforIntrovertsSkill",
    displayName: "Inclusive Discussion Moderation for Introverts",
    categoryId: "dialogue",
    description: "Ensures quieter team members have structured space to share insights.",
    tags: ["dialogue","dialogue","inclusive","discussion"],
    transform: createStandardSkillTransform({
      sectionName: "Inclusive Discussion Moderation for Introverts Standards",
      ruSectionName: "Стандарты и регламенты: Inclusive Discussion Moderation for Introverts",
      instructions: [
        "Apply core domain tenets for Inclusive Discussion Moderation for Introverts.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Inclusive Discussion Moderation for Introverts.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","inclusive","discussion"],
    }),
  },

  "dialogue-remote-onboarding-welcome-integration-arc": {
    id: "dialogue-remote-onboarding-welcome-integration-arc",
    name: "RemoteOnboardingWelcomeIntegrationArcSkill",
    displayName: "Remote Onboarding Welcome & Integration Arc",
    categoryId: "dialogue",
    description: "Welcomes new remote hires with structured check-ins and buddy pairing.",
    tags: ["dialogue","dialogue","remote","onboarding"],
    transform: createStandardSkillTransform({
      sectionName: "Remote Onboarding Welcome & Integration Arc Standards",
      ruSectionName: "Стандарты и регламенты: Remote Onboarding Welcome & Integration Arc",
      instructions: [
        "Apply core domain tenets for Remote Onboarding Welcome & Integration Arc.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Remote Onboarding Welcome & Integration Arc.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","remote","onboarding"],
    }),
  },

  "dialogue-enterprise-procurement-security-review-defense": {
    id: "dialogue-enterprise-procurement-security-review-defense",
    name: "EnterpriseProcurementSecurityReviewDefenseSkill",
    displayName: "Enterprise Procurement Security Review Defense",
    categoryId: "dialogue",
    description: "Answers enterprise security questionnaire queries with confidence.",
    tags: ["dialogue","dialogue","enterprise","procurement"],
    transform: createStandardSkillTransform({
      sectionName: "Enterprise Procurement Security Review Defense Standards",
      ruSectionName: "Стандарты и регламенты: Enterprise Procurement Security Review Defense",
      instructions: [
        "Apply core domain tenets for Enterprise Procurement Security Review Defense.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Enterprise Procurement Security Review Defense.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","enterprise","procurement"],
    }),
  },

  "dialogue-consultative-problem-solving-client-session": {
    id: "dialogue-consultative-problem-solving-client-session",
    name: "ConsultativeProblemSolvingClientSessionSkill",
    displayName: "Consultative Problem-Solving Client Session",
    categoryId: "dialogue",
    description: "Leads collaborative client strategy sessions to co-create solutions.",
    tags: ["dialogue","dialogue","consultative","problem"],
    transform: createStandardSkillTransform({
      sectionName: "Consultative Problem-Solving Client Session Standards",
      ruSectionName: "Стандарты и регламенты: Consultative Problem-Solving Client Session",
      instructions: [
        "Apply core domain tenets for Consultative Problem-Solving Client Session.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Consultative Problem-Solving Client Session.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","consultative","problem"],
    }),
  },

  "dialogue-community-guild-leadership-communication": {
    id: "dialogue-community-guild-leadership-communication",
    name: "CommunityGuildLeadershipCommunicationSkill",
    displayName: "Community Guild Leadership Communication",
    categoryId: "dialogue",
    description: "Leads internal practice guilds driving technology standardization.",
    tags: ["dialogue","dialogue","community","guild"],
    transform: createStandardSkillTransform({
      sectionName: "Community Guild Leadership Communication Standards",
      ruSectionName: "Стандарты и регламенты: Community Guild Leadership Communication",
      instructions: [
        "Apply core domain tenets for Community Guild Leadership Communication.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Community Guild Leadership Communication.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","community","guild"],
    }),
  },

  "dialogue-comprehensive-conversational-mastery-protocol": {
    id: "dialogue-comprehensive-conversational-mastery-protocol",
    name: "ComprehensiveConversationalMasteryProtocolSkill",
    displayName: "Comprehensive Conversational Mastery Protocol",
    categoryId: "dialogue",
    description: "Applies world-class dialogue, active listening, and negotiation techniques.",
    tags: ["dialogue","dialogue","comprehensive","conversational"],
    transform: createStandardSkillTransform({
      sectionName: "Comprehensive Conversational Mastery Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Comprehensive Conversational Mastery Protocol",
      instructions: [
        "Apply core domain tenets for Comprehensive Conversational Mastery Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Comprehensive Conversational Mastery Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","comprehensive","conversational"],
    }),
  },

  "dialogue-dialogue-skill-90": {
    id: "dialogue-dialogue-skill-90",
    name: "dialogueSkill90Skill",
    displayName: "dialogue Skill 90",
    categoryId: "dialogue",
    description: "Applies advanced dialogue Skill 90 standards and execution patterns.",
    tags: ["dialogue","dialogue","dialogue","skill"],
    transform: createStandardSkillTransform({
      sectionName: "dialogue Skill 90 Standards",
      ruSectionName: "Стандарты и регламенты: dialogue Skill 90",
      instructions: [
        "Apply core domain tenets for dialogue Skill 90.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для dialogue Skill 90.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue","dialogue","skill"],
    }),
  },
  "dialogue-topup-dialogue-protocol-for-remote-team-retrospectives": {
    id: "dialogue-topup-dialogue-protocol-for-remote-team-retrospectives",
    name: "DialogueProtocolforRemoteTeamRetrospectivesSkill",
    displayName: "Dialogue Protocol for Remote Team Retrospectives",
    categoryId: "dialogue",
    description: "Leads retrospective discussions identifying continuous process improvements.",
    tags: ["dialogue","dialogue-topup","topup","dialogue"],
    transform: createStandardSkillTransform({
      sectionName: "Dialogue Protocol for Remote Team Retrospectives Standards",
      ruSectionName: "Стандарты и регламенты: Dialogue Protocol for Remote Team Retrospectives",
      instructions: [
        "Apply core domain tenets for Dialogue Protocol for Remote Team Retrospectives.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Dialogue Protocol for Remote Team Retrospectives.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","dialogue"],
    }),
  },

  "dialogue-topup-strategic-questioning-for-high-stakes-negotiations": {
    id: "dialogue-topup-strategic-questioning-for-high-stakes-negotiations",
    name: "StrategicQuestioningforHighStakesNegotiationsSkill",
    displayName: "Strategic Questioning for High-Stakes Negotiations",
    categoryId: "dialogue",
    description: "Uncovers counterpart priorities through calibrated non-confrontational questions.",
    tags: ["dialogue","dialogue-topup","topup","strategic"],
    transform: createStandardSkillTransform({
      sectionName: "Strategic Questioning for High-Stakes Negotiations Standards",
      ruSectionName: "Стандарты и регламенты: Strategic Questioning for High-Stakes Negotiations",
      instructions: [
        "Apply core domain tenets for Strategic Questioning for High-Stakes Negotiations.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Strategic Questioning for High-Stakes Negotiations.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","strategic"],
    }),
  },

  "dialogue-topup-empathetic-patient-history-taking-protocol": {
    id: "dialogue-topup-empathetic-patient-history-taking-protocol",
    name: "EmpatheticPatientHistoryTakingProtocolSkill",
    displayName: "Empathetic Patient History Taking Protocol",
    categoryId: "dialogue",
    description: "Conducts supportive medical intake interviews uncovering hidden symptoms.",
    tags: ["dialogue","dialogue-topup","topup","empathetic"],
    transform: createStandardSkillTransform({
      sectionName: "Empathetic Patient History Taking Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Empathetic Patient History Taking Protocol",
      instructions: [
        "Apply core domain tenets for Empathetic Patient History Taking Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Empathetic Patient History Taking Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","empathetic"],
    }),
  },

  "dialogue-topup-socratic-guided-discovery-for-student-mentorship": {
    id: "dialogue-topup-socratic-guided-discovery-for-student-mentorship",
    name: "SocraticGuidedDiscoveryforStudentMentorshipSkill",
    displayName: "Socratic Guided Discovery for Student Mentorship",
    categoryId: "dialogue",
    description: "Guides learners to solve complex math and coding problems through inquiry.",
    tags: ["dialogue","dialogue-topup","topup","socratic"],
    transform: createStandardSkillTransform({
      sectionName: "Socratic Guided Discovery for Student Mentorship Standards",
      ruSectionName: "Стандарты и регламенты: Socratic Guided Discovery for Student Mentorship",
      instructions: [
        "Apply core domain tenets for Socratic Guided Discovery for Student Mentorship.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Socratic Guided Discovery for Student Mentorship.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","socratic"],
    }),
  },

  "dialogue-topup-diplomatic-executive-alignment-conversation": {
    id: "dialogue-topup-diplomatic-executive-alignment-conversation",
    name: "DiplomaticExecutiveAlignmentConversationSkill",
    displayName: "Diplomatic Executive Alignment Conversation",
    categoryId: "dialogue",
    description: "Aligns VP-level stakeholders on shared strategic objectives and resource split.",
    tags: ["dialogue","dialogue-topup","topup","diplomatic"],
    transform: createStandardSkillTransform({
      sectionName: "Diplomatic Executive Alignment Conversation Standards",
      ruSectionName: "Стандарты и регламенты: Diplomatic Executive Alignment Conversation",
      instructions: [
        "Apply core domain tenets for Diplomatic Executive Alignment Conversation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Diplomatic Executive Alignment Conversation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","diplomatic"],
    }),
  },

  "dialogue-topup-de-escalation-sequence-for-hostile-public-feedback": {
    id: "dialogue-topup-de-escalation-sequence-for-hostile-public-feedback",
    name: "DeescalationSequenceforHostilePublicFeedbackSkill",
    displayName: "De-escalation Sequence for Hostile Public Feedback",
    categoryId: "dialogue",
    description: "Responds to angry public comments with calm, accountable, solution-focused messaging.",
    tags: ["dialogue","dialogue-topup","topup","de"],
    transform: createStandardSkillTransform({
      sectionName: "De-escalation Sequence for Hostile Public Feedback Standards",
      ruSectionName: "Стандарты и регламенты: De-escalation Sequence for Hostile Public Feedback",
      instructions: [
        "Apply core domain tenets for De-escalation Sequence for Hostile Public Feedback.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для De-escalation Sequence for Hostile Public Feedback.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","de"],
    }),
  },

  "dialogue-topup-cross-departmental-war-room-incident-coordination": {
    id: "dialogue-topup-cross-departmental-war-room-incident-coordination",
    name: "CrossDepartmentalWarRoomIncidentCoordinationSkill",
    displayName: "Cross-Departmental War Room Incident Coordination",
    categoryId: "dialogue",
    description: "Facilitates rapid incident management dialogue between Ops and Product leads.",
    tags: ["dialogue","dialogue-topup","topup","cross"],
    transform: createStandardSkillTransform({
      sectionName: "Cross-Departmental War Room Incident Coordination Standards",
      ruSectionName: "Стандарты и регламенты: Cross-Departmental War Room Incident Coordination",
      instructions: [
        "Apply core domain tenets for Cross-Departmental War Room Incident Coordination.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cross-Departmental War Room Incident Coordination.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","cross"],
    }),
  },

  "dialogue-topup-warm-rapport-building-for-executive-interviews": {
    id: "dialogue-topup-warm-rapport-building-for-executive-interviews",
    name: "WarmRapportBuildingforExecutiveInterviewsSkill",
    displayName: "Warm Rapport Building for Executive Interviews",
    categoryId: "dialogue",
    description: "Establishes immediate trust and open dialogue during C-suite candidate interviews.",
    tags: ["dialogue","dialogue-topup","topup","warm"],
    transform: createStandardSkillTransform({
      sectionName: "Warm Rapport Building for Executive Interviews Standards",
      ruSectionName: "Стандарты и регламенты: Warm Rapport Building for Executive Interviews",
      instructions: [
        "Apply core domain tenets for Warm Rapport Building for Executive Interviews.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Warm Rapport Building for Executive Interviews.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","warm"],
    }),
  },

  "dialogue-topup-interactive-workshop-icebreaker-warm-up": {
    id: "dialogue-topup-interactive-workshop-icebreaker-warm-up",
    name: "InteractiveWorkshopIcebreakerWarmUpSkill",
    displayName: "Interactive Workshop Icebreaker & Warm-Up",
    categoryId: "dialogue",
    description: "Engages workshop participants with active icebreaker exercises.",
    tags: ["dialogue","dialogue-topup","topup","interactive"],
    transform: createStandardSkillTransform({
      sectionName: "Interactive Workshop Icebreaker & Warm-Up Standards",
      ruSectionName: "Стандарты и регламенты: Interactive Workshop Icebreaker & Warm-Up",
      instructions: [
        "Apply core domain tenets for Interactive Workshop Icebreaker & Warm-Up.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Interactive Workshop Icebreaker & Warm-Up.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","interactive"],
    }),
  },

  "dialogue-topup-constructive-code-review-feedback-communication": {
    id: "dialogue-topup-constructive-code-review-feedback-communication",
    name: "ConstructiveCodeReviewFeedbackCommunicationSkill",
    displayName: "Constructive Code Review Feedback Communication",
    categoryId: "dialogue",
    description: "Delivers actionable, respectful code feedback encouraging engineer growth.",
    tags: ["dialogue","dialogue-topup","topup","constructive"],
    transform: createStandardSkillTransform({
      sectionName: "Constructive Code Review Feedback Communication Standards",
      ruSectionName: "Стандарты и регламенты: Constructive Code Review Feedback Communication",
      instructions: [
        "Apply core domain tenets for Constructive Code Review Feedback Communication.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Constructive Code Review Feedback Communication.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","constructive"],
    }),
  },

  "dialogue-topup-client-offboarding-bridge-building-dialogue": {
    id: "dialogue-topup-client-offboarding-bridge-building-dialogue",
    name: "ClientOffboardingBridgeBuildingDialogueSkill",
    displayName: "Client Offboarding & Bridge-Building Dialogue",
    categoryId: "dialogue",
    description: "Concludes client projects professionally while keeping doors open for future work.",
    tags: ["dialogue","dialogue-topup","topup","client"],
    transform: createStandardSkillTransform({
      sectionName: "Client Offboarding & Bridge-Building Dialogue Standards",
      ruSectionName: "Стандарты и регламенты: Client Offboarding & Bridge-Building Dialogue",
      instructions: [
        "Apply core domain tenets for Client Offboarding & Bridge-Building Dialogue.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Client Offboarding & Bridge-Building Dialogue.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","client"],
    }),
  },

  "dialogue-topup-diplomatic-refusal-of-scope-creep-requests": {
    id: "dialogue-topup-diplomatic-refusal-of-scope-creep-requests",
    name: "DiplomaticRefusalofScopeCreepRequestsSkill",
    displayName: "Diplomatic Refusal of Scope Creep Requests",
    categoryId: "dialogue",
    description: "Manages feature requests while protecting team capacity and release dates.",
    tags: ["dialogue","dialogue-topup","topup","diplomatic"],
    transform: createStandardSkillTransform({
      sectionName: "Diplomatic Refusal of Scope Creep Requests Standards",
      ruSectionName: "Стандарты и регламенты: Diplomatic Refusal of Scope Creep Requests",
      instructions: [
        "Apply core domain tenets for Diplomatic Refusal of Scope Creep Requests.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Diplomatic Refusal of Scope Creep Requests.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","diplomatic"],
    }),
  },

  "dialogue-topup-parent-teacher-collaborative-growth-meeting": {
    id: "dialogue-topup-parent-teacher-collaborative-growth-meeting",
    name: "ParentTeacherCollaborativeGrowthMeetingSkill",
    displayName: "Parent-Teacher Collaborative Growth Meeting",
    categoryId: "dialogue",
    description: "Builds constructive partnerships between parents and teachers to support students.",
    tags: ["dialogue","dialogue-topup","topup","parent"],
    transform: createStandardSkillTransform({
      sectionName: "Parent-Teacher Collaborative Growth Meeting Standards",
      ruSectionName: "Стандарты и регламенты: Parent-Teacher Collaborative Growth Meeting",
      instructions: [
        "Apply core domain tenets for Parent-Teacher Collaborative Growth Meeting.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Parent-Teacher Collaborative Growth Meeting.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","parent"],
    }),
  },

  "dialogue-topup-investor-q-a-pitch-defense-strategy": {
    id: "dialogue-topup-investor-q-a-pitch-defense-strategy",
    name: "InvestorQAPitchDefenseStrategySkill",
    displayName: "Investor Q&A Pitch Defense Strategy",
    categoryId: "dialogue",
    description: "Answers tough venture capital questions with confidence and verified data.",
    tags: ["dialogue","dialogue-topup","topup","investor"],
    transform: createStandardSkillTransform({
      sectionName: "Investor Q&A Pitch Defense Strategy Standards",
      ruSectionName: "Стандарты и регламенты: Investor Q&A Pitch Defense Strategy",
      instructions: [
        "Apply core domain tenets for Investor Q&A Pitch Defense Strategy.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Investor Q&A Pitch Defense Strategy.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","investor"],
    }),
  },

  "dialogue-topup-cross-generational-workplace-communication-bridge": {
    id: "dialogue-topup-cross-generational-workplace-communication-bridge",
    name: "CrossGenerationalWorkplaceCommunicationBridgeSkill",
    displayName: "Cross-Generational Workplace Communication Bridge",
    categoryId: "dialogue",
    description: "Facilitates productive collaboration between team members of different generations.",
    tags: ["dialogue","dialogue-topup","topup","cross"],
    transform: createStandardSkillTransform({
      sectionName: "Cross-Generational Workplace Communication Bridge Standards",
      ruSectionName: "Стандарты и регламенты: Cross-Generational Workplace Communication Bridge",
      instructions: [
        "Apply core domain tenets for Cross-Generational Workplace Communication Bridge.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Cross-Generational Workplace Communication Bridge.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","cross"],
    }),
  },

  "dialogue-topup-community-forum-anti-trolling-de-escalation": {
    id: "dialogue-topup-community-forum-anti-trolling-de-escalation",
    name: "CommunityForumAntiTrollingDeescalationSkill",
    displayName: "Community Forum Anti-Trolling De-escalation",
    categoryId: "dialogue",
    description: "Moderates heated online discussions maintaining community guidelines.",
    tags: ["dialogue","dialogue-topup","topup","community"],
    transform: createStandardSkillTransform({
      sectionName: "Community Forum Anti-Trolling De-escalation Standards",
      ruSectionName: "Стандарты и регламенты: Community Forum Anti-Trolling De-escalation",
      instructions: [
        "Apply core domain tenets for Community Forum Anti-Trolling De-escalation.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Community Forum Anti-Trolling De-escalation.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","community"],
    }),
  },

  "dialogue-topup-sales-objection-reframing-roi-anchor": {
    id: "dialogue-topup-sales-objection-reframing-roi-anchor",
    name: "SalesObjectionReframingROIAnchorSkill",
    displayName: "Sales Objection Reframing & ROI Anchor",
    categoryId: "dialogue",
    description: "Addresses pricing objections by focusing on measurable business return.",
    tags: ["dialogue","dialogue-topup","topup","sales"],
    transform: createStandardSkillTransform({
      sectionName: "Sales Objection Reframing & ROI Anchor Standards",
      ruSectionName: "Стандарты и регламенты: Sales Objection Reframing & ROI Anchor",
      instructions: [
        "Apply core domain tenets for Sales Objection Reframing & ROI Anchor.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Sales Objection Reframing & ROI Anchor.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","sales"],
    }),
  },

  "dialogue-topup-asynchronous-slack-team-communication-etiquette": {
    id: "dialogue-topup-asynchronous-slack-team-communication-etiquette",
    name: "AsynchronousSlackTeamCommunicationEtiquetteSkill",
    displayName: "Asynchronous Slack Team Communication Etiquette",
    categoryId: "dialogue",
    description: "Structures async team messages for clarity, brevity, and minimal disruption.",
    tags: ["dialogue","dialogue-topup","topup","asynchronous"],
    transform: createStandardSkillTransform({
      sectionName: "Asynchronous Slack Team Communication Etiquette Standards",
      ruSectionName: "Стандарты и регламенты: Asynchronous Slack Team Communication Etiquette",
      instructions: [
        "Apply core domain tenets for Asynchronous Slack Team Communication Etiquette.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Asynchronous Slack Team Communication Etiquette.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","asynchronous"],
    }),
  },

  "dialogue-topup-executive-sponsor-project-briefing-protocol": {
    id: "dialogue-topup-executive-sponsor-project-briefing-protocol",
    name: "ExecutiveSponsorProjectBriefingProtocolSkill",
    displayName: "Executive Sponsor Project Briefing Protocol",
    categoryId: "dialogue",
    description: "Delivers concise, high-density project status updates to executive sponsors.",
    tags: ["dialogue","dialogue-topup","topup","executive"],
    transform: createStandardSkillTransform({
      sectionName: "Executive Sponsor Project Briefing Protocol Standards",
      ruSectionName: "Стандарты и регламенты: Executive Sponsor Project Briefing Protocol",
      instructions: [
        "Apply core domain tenets for Executive Sponsor Project Briefing Protocol.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Executive Sponsor Project Briefing Protocol.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","executive"],
    }),
  },

  "dialogue-topup-master-dialogue-communication-excellence": {
    id: "dialogue-topup-master-dialogue-communication-excellence",
    name: "MasterDialogueCommunicationExcellenceSkill",
    displayName: "Master Dialogue & Communication Excellence",
    categoryId: "dialogue",
    description: "Applies world-class active listening, empathy, and negotiation skills.",
    tags: ["dialogue","dialogue-topup","topup","master"],
    transform: createStandardSkillTransform({
      sectionName: "Master Dialogue & Communication Excellence Standards",
      ruSectionName: "Стандарты и регламенты: Master Dialogue & Communication Excellence",
      instructions: [
        "Apply core domain tenets for Master Dialogue & Communication Excellence.",
        "Enforce strict validation, error-handling, and clear structural bounds.",
        "Verify output consistency against benchmark standards."
],
      ruInstructions: [
        "Применяйте ключевые принципы и стандарты для Master Dialogue & Communication Excellence.",
        "Обеспечивайте строгую валидацию, обработку ошибок и структурные границы.",
        "Проверяйте результаты на соответствие эталонным критериям."
],
      semanticType: "process_directive",
      tags: ["dialogue","dialogue-topup","topup","master"],
    }),
  },
};
