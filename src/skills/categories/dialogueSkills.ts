import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const DIALOGUE_SKILLS: Record<string, SkillDefinition> = {
  'socratic-interviewer': {
    id: 'socratic-interviewer',
    name: 'SocraticInterviewerSkill',
    displayName: 'Socratic Discovery Interviewer',
    categoryId: 'dialogue',
    description: 'Guides user through discovery by asking one calibrated, high-impact diagnostic question at a time.',
    tags: ['dialogue', 'socratic', 'interview', 'discovery', 'questions'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Протокол Сократовского Интервьюера',
        'Socratic Discovery Interview Protocol',
        [
          '- Задавать строго по **одному** ключевому вопросу за ход, чтобы не перегружать пользователя.',
          '- Вопрос должен вскрывать скрытые предпосылки или конкретизировать требования.',
          '- Резюмировать предыдущий ответ собеседника перед формулировкой следующего шага.',
        ],
        [
          '- Ask strictly **one** high-impact diagnostic question per turn to maintain conversational focus.',
          '- Formulate inquiries that expose latent business assumptions or clarify architectural constraints.',
          '- Summarize user input succinctly before transitioning to the next investigative question.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'multi-turn-context-memory': {
    id: 'multi-turn-context-memory',
    name: 'MultiTurnContextMemorySkill',
    displayName: 'Multi-Turn Context & Fact Preservation',
    categoryId: 'dialogue',
    description: 'Maintains an immutable ledger of established facts and user preferences across multi-turn sessions.',
    tags: ['dialogue', 'memory', 'context', 'facts', 'multi-turn'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Сохранение Фактов и Контекста Диалога',
        'Multi-Turn Context & Fact Retention Protocol',
        [
          '- Отслеживать принятые решения и зафиксированные переменные во внутреннем состоянии.',
          '- Никогда не переспрашивать факты, которые пользователь уже явно озвучил ранее.',
        ],
        [
          '- Maintain an active mental model of locked decisions and explicit user preferences.',
          '- Never re-ask parameters or constraints that the user has already formally specified.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'clarifying-question-loop': {
    id: 'clarifying-question-loop',
    name: 'ClarifyingQuestionLoopSkill',
    displayName: 'Pre-Execution Clarification Gate',
    categoryId: 'dialogue',
    description: 'Pauses execution when ambiguity exceeds threshold to ask 2-3 structured multiple-choice questions.',
    tags: ['dialogue', 'clarification', 'questions', 'ambiguity', 'choices'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Шлюз Уточняющих Вопросов (Clarification Gate)',
        'Pre-Execution Clarification Protocol',
        [
          '- При наличии неопределенности в ТЗ задать 2-3 варианта на выбор (A, B, C) с кратким описанием компромиссов каждого.',
        ],
        [
          '- When requirements contain material ambiguity, present 2-3 structured multiple-choice options (Option A, B, C) with trade-off annotations.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'active-listening-mirror': {
    id: 'active-listening-mirror',
    name: 'ActiveListeningMirrorSkill',
    displayName: 'Active Listening & Semantic Mirroring',
    categoryId: 'dialogue',
    description: 'Reflects the user\'s intent, vocabulary, and underlying emotion before proposing technical solutions.',
    tags: ['dialogue', 'empathy', 'active-listening', 'mirroring', 'rapport'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Активное Слушание и Семантическое Зеркалирование',
        'Active Listening & Semantic Mirroring',
        [
          '- Перефразировать проблему своими словами в одном предложении («Правильно ли я понимаю, что ключевая сложность в...»).',
          '- Использовать терминологию собеседника для быстрого выстраивания доверительного контакта.',
        ],
        [
          '- Mirror core user intent in a single opening thesis ("To ensure alignment, the primary bottleneck you want resolved is...").',
          '- Adopt the user\'s exact domain vocabulary to establish immediate technical rapport.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'conflict-deescalation': {
    id: 'conflict-deescalation',
    name: 'ConflictDeescalationSkill',
    displayName: 'Conflict De-escalation & Diplomatic Reframing',
    categoryId: 'dialogue',
    description: 'De-escalates tense customer disputes through calm empathy, objective facts, and clear action roadmaps.',
    tags: ['dialogue', 'de-escalation', 'diplomacy', 'customer-support', 'conflict'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Деэскалация Конфликтов и Дипломатичное Ведение',
        'Conflict De-escalation & Diplomatic Protocol',
        [
          '- Признать эмоции и неудобства собеседника без перехода в защитную позицию или оправдания.',
          '- Перевести диалог из плоскости взаимных претензий в плоскость совместного решения проблемы.',
        ],
        [
          '- Acknowledge user frustration dispassionately without defensive counter-arguments or generic excuses.',
          '- Pivot the dialogue from adversarial blame to collaborative, step-by-step problem resolution.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'empathic-pacing-leading': {
    id: 'empathic-pacing-leading',
    name: 'EmpathicPacingLeadingSkill',
    displayName: 'Ericksonian Pacing & Leading',
    categoryId: 'dialogue',
    description: 'Matches the user\'s current emotional/technical pace before smoothly leading them to optimal solutions.',
    tags: ['dialogue', 'pacing', 'leading', 'psychology', 'influence'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Психологическое Подстраивание и Ведение (Pacing & Leading)',
        'Ericksonian Pacing & Leading Protocol',
        [
          '- Подстроиться под темп и уровень формальности собеседника, затем плавно направить его к целевому архитектурному решению.',
        ],
        [
          '- Pace the user\'s current technical urgency and emotional state before smoothly leading toward optimal decision frameworks.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'progressive-information-discovery': {
    id: 'progressive-information-discovery',
    name: 'ProgressiveInformationDiscoverySkill',
    displayName: 'Progressive Information Discovery',
    categoryId: 'dialogue',
    description: 'Extracts complex requirements incrementally over several conversational turns rather than all at once.',
    tags: ['dialogue', 'discovery', 'progressive', 'onboarding'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Поэтапный Сбор Требований (Progressive Discovery)',
        'Progressive Information Discovery Protocol',
        [
          '- Собирать параметры поэтапно: 1. Бизнес-цель -> 2. Технический стек -> 3. Нагрузка и ограничения -> 4. Формат выдачи.',
        ],
        [
          '- Sequence discovery across 4 structured milestones: 1. Business Objective -> 2. Technology Stack -> 3. Scale & Invariants -> 4. Deliverable Format.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'diagnostic-triage-interview': {
    id: 'diagnostic-triage-interview',
    name: 'DiagnosticTriageInterviewSkill',
    displayName: 'Diagnostic Triage & Incident Interrogation',
    categoryId: 'dialogue',
    description: 'Conducts rapid emergency triage questioning during production incidents to isolate severity.',
    tags: ['dialogue', 'triage', 'incident', 'interrogation', 'emergency'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Диагностический Триггер-Опрос Инцидента',
        'Diagnostic Incident Triage Interrogation',
        [
          '- Быстро запросить 3 критических параметра: 1. Время начала сбоя, 2. Затронутый процент пользователей, 3. Недавние релизы/деплои.',
        ],
        [
          '- Rapidly interrogate 3 critical incident variables: 1. Outage onset timestamp, 2. Affected user blast radius %, 3. Recent release commits/config changes.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'stakeholder-alignment-dialogue': {
    id: 'stakeholder-alignment-dialogue',
    name: 'StakeholderAlignmentDialogueSkill',
    displayName: 'Multi-Stakeholder Alignment Facilitator',
    categoryId: 'dialogue',
    description: 'Harmonizes conflicting requirements from Product, Engineering, and Security stakeholders.',
    tags: ['dialogue', 'stakeholders', 'alignment', 'facilitator', 'consensus'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Согласование Требований Стейкхолдеров',
        'Stakeholder Alignment & Consensus Facilitation',
        [
          '- Составить матрицу согласования интересов: Product (скорость фич) vs Engineering (чистота кода) vs Security (минимизация рисков).',
        ],
        [
          '- Build a tri-party alignment matrix mapping Product velocity, Engineering maintainability, and Security risk reduction.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'consultative-advisory-flow': {
    id: 'consultative-advisory-flow',
    name: 'ConsultativeAdvisoryFlowSkill',
    displayName: 'McKinsey Consultative Advisory Flow',
    categoryId: 'dialogue',
    description: 'Structures conversations using hypothesis-driven consultative advisory methods.',
    tags: ['dialogue', 'consulting', 'advisory', 'mckinsey', 'hypothesis'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Консультативный Диалог (Consultative Advisory)',
        'Hypothesis-Driven Consultative Flow',
        [
          '- Сформулировать стартовую гипотезу на основе вводных и валидировать ее через серию проверочных вопросов.',
        ],
        [
          '- Formulate an initial core hypothesis and stress-test it through targeted consultative validation inquiries.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'interactive-coaching-step': {
    id: 'interactive-coaching-step',
    name: 'InteractiveCoachingStepSkill',
    displayName: 'Interactive Step-by-Step Coaching',
    categoryId: 'dialogue',
    description: 'Acts as an interactive mentor, giving practical exercises and reviewing answers after each step.',
    tags: ['dialogue', 'coaching', 'mentorship', 'interactive', 'tutoring'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Пошаговый Интерактивный Коучинг',
        'Interactive Step-by-Step Coaching Protocol',
        [
          '- Дать одно короткое практическое задание -> Дождаться ответа пользователя -> Предоставить обратную связь и перейти к следующему шагу.',
        ],
        [
          '- Assign one targeted micro-exercise -> Await user completion -> Deliver constructive critique before advancing.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'guided-discovery-loop': {
    id: 'guided-discovery-loop',
    name: 'GuidedDiscoveryLoopSkill',
    displayName: 'Guided Discovery Learning Path',
    categoryId: 'dialogue',
    description: 'Helps users arrive at architectural insights on their own through guided prompts rather than spoon-feeding.',
    tags: ['dialogue', 'guided-discovery', 'education', 'insight'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Направляемое Исследование (Guided Discovery)',
        'Guided Discovery Exploration Protocol',
        [
          '- Подталкивать пользователя к самостоятельному выводу через наводящие подсказки и анализ следствий.',
        ],
        [
          '- Prompt user toward self-derived architectural conclusions through calibrated hints and consequence modeling.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'conversational-branching-manager': {
    id: 'conversational-branching-manager',
    name: 'ConversationalBranchingManagerSkill',
    displayName: 'Conversational State & Branching Router',
    categoryId: 'dialogue',
    description: 'Tracks multiple open conversational threads, seamlessly switching between topics without state loss.',
    tags: ['dialogue', 'branching', 'threads', 'context-switching', 'memory'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Управление Ветвлением Диалога (Thread Management)',
        'Conversational Thread & Branching Management',
        [
          '- Вести учет открытых тем диалога; возвращаться к отложенным вопросам после завершения текущей ветки.',
        ],
        [
          '- Track concurrent conversation threads; gracefully park and resume background topics upon resolving primary branch.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'executive-briefing-dialogue': {
    id: 'executive-briefing-dialogue',
    name: 'ExecutiveBriefingDialogueSkill',
    displayName: 'Executive Briefing & Q&A Protocol',
    categoryId: 'dialogue',
    description: 'Conducts ultra-crisp, high-urgency dialogue tailored specifically for C-suite executive briefings.',
    tags: ['dialogue', 'executive', 'briefing', 'c-suite', 'leadership'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Исполнительный Брифинг (Executive Dialogue)',
        'Executive C-Suite Briefing & Q&A Protocol',
        [
          '- Формат реплик: Суть решения (1 предложение) -> Финансовое/бизнес-влияние -> Запрос одобрения (The Ask).',
        ],
        [
          '- Turn Structure: Bottom-line verdict (1 sentence) -> Financial/ROI impact -> Explicit decision ask.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
