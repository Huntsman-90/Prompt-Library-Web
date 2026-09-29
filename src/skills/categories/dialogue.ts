import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
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
};
