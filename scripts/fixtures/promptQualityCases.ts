import type { DeliverableKind, PromptDomain, TaskIntent } from '../../src/utils/taskIntent';

export interface PromptQualityCase {
  id: string;
  uiDomain: string;
  expectedDomain: PromptDomain;
  expectedIntent: TaskIntent;
  expectedDeliverable: DeliverableKind;
  task: string;
  skills: string[];
}

/** Frozen task matrix used by the local regression suite and the 48-output quality benchmark. */
export const PROMPT_QUALITY_CASES: PromptQualityCase[] = [
  {
    id: 'coding-01-webhook', uiDomain: 'Coding', expectedDomain: 'coding', expectedIntent: 'design_technical_solution', expectedDeliverable: 'technical_design',
    task: 'Спроектируй исправление для Node.js обработчика платёжных вебхуков: при повторной доставке одного события иногда создаются двойные списания. Нужны идемпотентность, безопасный разбор повторов и тесты; не утверждай доставку exactly-once без подтверждённого контракта.',
    skills: ['code-audit-smells', 'type-safety-contracts', 'regression-test-specs'],
  },
  {
    id: 'coding-02-accessibility', uiDomain: 'Coding', expectedDomain: 'coding', expectedIntent: 'change_software', expectedDeliverable: 'code_change',
    task: 'Review a React modal for keyboard accessibility and focus management. Return a minimal patch and focused tests; do not refactor unrelated components or invent project conventions.',
    skills: ['code-audit-smells', 'type-safety-contracts', 'regression-test-specs'],
  },
  {
    id: 'business-01-pricing', uiDomain: 'Business', expectedDomain: 'business', expectedIntent: 'analyze_pricing', expectedDeliverable: 'pricing_analysis',
    task: 'Оцени варианты цены для B2B SaaS: есть 12 интервью и качественные отзывы, но нет надёжной количественной оценки willingness-to-pay. Сравни модели, предложи дешёвый эксперимент и явно отдели факты от гипотез; не выдумывай цифры.',
    skills: ['unit-economics-modeling', 'gtm-roadmap-phasing', 'defensible-moats'],
  },
  {
    id: 'business-02-gtm', uiDomain: 'Business', expectedDomain: 'business', expectedIntent: 'plan_market_entry', expectedDeliverable: 'gtm_plan',
    task: 'Develop a 90-day go-to-market plan for an early-stage invoicing product targeting small accounting firms. The team has two founders and a limited budget; prioritize testable channels and explicit stop/continue criteria.',
    skills: ['unit-economics-modeling', 'gtm-roadmap-phasing', 'defensible-moats'],
  },
  {
    id: 'copywriting-01-onboarding', uiDomain: 'Copywriting', expectedDomain: 'copywriting', expectedIntent: 'write_copy', expectedDeliverable: 'email',
    task: 'Напиши короткое onboarding-письмо для новых пользователей приложения учёта личных расходов: дружелюбный тон, один понятный CTA. Не выдумывай результаты клиентов, социальные доказательства или обещания экономии.',
    skills: ['copywriting-aida-attention-interest-desire', 'copywriting-pas-problem-agitate-solve', 'microcopy-ux-writing'],
  },
  {
    id: 'copywriting-02-headlines', uiDomain: 'Copywriting', expectedDomain: 'copywriting', expectedIntent: 'write_copy', expectedDeliverable: 'headline_set',
    task: 'Write five distinct landing-page headlines for project-management software used by small creative agencies. Keep them specific and credible; do not invent performance metrics, customer counts, or guarantees.',
    skills: ['copywriting-aida-attention-interest-desire', 'copywriting-pas-problem-agitate-solve', 'microcopy-ux-writing'],
  },
  {
    id: 'product-01-onboarding-dropoff', uiDomain: 'Product', expectedDomain: 'product', expectedIntent: 'improve_product_experience', expectedDeliverable: 'product_recommendations',
    task: 'По заметкам интервью «пользователи не понимают, зачем подключать банковский счёт; несколько прекращают настройку на экране разрешений» предложи приоритетные улучшения onboarding мобильного приложения. Раздели наблюдения и гипотезы и укажи способ проверки.',
    skills: ['customer-journey-empathy-friction-map', 'heuristic-evaluation-nielsen', 'microcopy-ux-writing'],
  },
  {
    id: 'product-02-filter-spec', uiDomain: 'Product', expectedDomain: 'product', expectedIntent: 'specify_product_behavior', expectedDeliverable: 'acceptance_criteria',
    task: 'Draft acceptance criteria for adding multi-select filters to a searchable product list. Cover keyboard interaction, applied-filter visibility, empty results, clearing filters, and mobile behavior without prescribing an unrequested technical stack.',
    skills: ['customer-journey-empathy-friction-map', 'heuristic-evaluation-nielsen', 'microcopy-ux-writing'],
  },
  {
    id: 'research-01-interviews', uiDomain: 'Research', expectedDomain: 'research', expectedIntent: 'synthesize_evidence', expectedDeliverable: 'interview_synthesis',
    task: 'Синтезируй результаты интервью о причинах отказа от приложения: 7 участников упомянули сложную настройку, 3 — отсутствие нужной функции, 2 положительно оценили поддержку. Выдели темы и противоречия, не обобщай на всех пользователей и не выдумывай цитаты.',
    skills: ['literature-review-synthesis', 'methodology-critique-peer-review', 'analysis-multi-multi-perspective-qualitative-research-analysis'],
  },
  {
    id: 'research-02-study-comparison', uiDomain: 'Research', expectedDomain: 'research', expectedIntent: 'synthesize_evidence', expectedDeliverable: 'study_comparison',
    task: 'Compare two supplied study abstracts on remote-work productivity. Summarize where their findings agree or differ, note design and sample limitations, and do not claim causality or add sources not included in the material.',
    skills: ['literature-review-synthesis', 'methodology-critique-peer-review', 'analysis-multi-multi-perspective-qualitative-research-analysis'],
  },
  {
    id: 'executive-01-budget', uiDomain: 'Executive', expectedDomain: 'executive', expectedIntent: 'make_executive_decision', expectedDeliverable: 'executive_memo',
    task: 'Подготовь записку для руководства: распределить бюджет $500,000 между удержанием клиентов и реферальным каналом. Данных о предельной отдаче пока нет. Сформулируй решение или варианты, допущения, риски и план получения данных; не изображай оценку как факт.',
    skills: ['core-summary-first-executive-structure-bluf', 'comparative-tradeoff-matrix', 'bulleted-executive-memo'],
  },
  {
    id: 'executive-02-launch-delay', uiDomain: 'Executive', expectedDomain: 'executive', expectedIntent: 'make_executive_decision', expectedDeliverable: 'executive_memo',
    task: 'Write a concise executive decision memo on whether to delay a product launch by two weeks to resolve three critical accessibility blockers. Include the decision, user and business trade-offs, owner-level next steps, and what evidence would change the recommendation.',
    skills: ['core-summary-first-executive-structure-bluf', 'comparative-tradeoff-matrix', 'bulleted-executive-memo'],
  },
  {
    id: 'retro-01-outage', uiDomain: 'Auto', expectedDomain: 'retro', expectedIntent: 'review_incident', expectedDeliverable: 'incident_review',
    task: 'Проведи blameless-разбор сбоя: в 09:10 выросли ошибки API; в 09:18 сработала тревога; в 09:31 откат конфигурации; в 09:44 ошибки вернулись к норме. Первопричина пока неизвестна. Не назначай виноватых и не выдавай гипотезу за установленную причину.',
    skills: ['root-cause-timeline-retro-postmortem', 'writing-post-mortem-blameless-incident-report'],
  },
  {
    id: 'retro-02-queue', uiDomain: 'Auto', expectedDomain: 'retro', expectedIntent: 'review_incident', expectedDeliverable: 'incident_review',
    task: 'Create a blameless retrospective for a queue backlog incident. The only confirmed facts are that backlog grew for 40 minutes, alerts were delayed, and service recovered after scaling workers. Distinguish timeline, hypotheses, unknowns, and follow-up actions; do not infer root cause as fact.',
    skills: ['root-cause-timeline-retro-postmortem', 'writing-post-mortem-blameless-incident-report'],
  },
  {
    id: 'general-01-archive', uiDomain: 'Auto', expectedDomain: 'general', expectedIntent: 'plan', expectedDeliverable: 'practical_plan',
    task: 'Составь практичный план оцифровки семейного фотоархива за три вечера, используя только локальный компьютер и телефон, без облачных сервисов. Нужны шаги, структура папок и простая проверка резервной копии.',
    skills: [],
  },
  {
    id: 'general-02-meeting', uiDomain: 'Auto', expectedDomain: 'general', expectedIntent: 'facilitate', expectedDeliverable: 'facilitation_guide',
    task: 'Create a practical 45-minute facilitation guide for a cross-team planning meeting with six people. The goal is to surface dependencies and end with named owners; avoid assuming access to special software or prior preparation.',
    skills: [],
  },
];
