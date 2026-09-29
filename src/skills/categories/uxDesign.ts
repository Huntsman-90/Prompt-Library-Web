import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
} from '../skillHelpers';

export const UX_DESIGN_SKILLS: Record<string, SkillDefinition> = {
  'user-persona-synthesis': {
    id: 'user-persona-synthesis',
    name: 'UserPersonaSynthesisSkill',
    displayName: 'User Persona & Empathy Mapping',
    categoryId: 'ux_design',
    description: 'Synthesizes realistic user personas with Jobs-to-be-Done (JTBD), technical literacy, and emotional friction.',
    tags: ['ux_design', 'persona', 'empathy', 'jtbd', 'user-research', 'ux'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Синтез Персоны Пользователя и Карта Эмпатии',
        'User Persona Synthesis & Empathy Mapping Protocol',
        [
          '- **Профиль персоны**: Демография, роль, уровень цифровой грамотности, используемые устройства и инструменты.',
          '- **Карта эмпатии (Empathy Map)**: Что персона видит, слышит, думает, чувствует, говорит и делает в контексте продукта.',
          '- **Главные боли (Pains) и выгоды (Gains)**: Ключевые препятствия и желаемые результаты взаимодействия.',
        ],
        [
          '- **Persona Archetype**: Role context, technical fluency level, primary tooling ecosystem, and accessibility requirements.',
          '- **Empathy Quadrants**: Map what the persona Thinks & Feels, Hears, Sees, and Says & Does during task execution.',
          '- **Pains vs. Gains Matrix**: Catalog acute daily friction blockers vs. high-value aspirational outcomes.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'jobs-to-be-done-jtbd': {
    id: 'jobs-to-be-done-jtbd',
    name: 'JobsToBeDoneJtbdSkill',
    displayName: 'Jobs-to-be-Done (JTBD) Framework',
    categoryId: 'ux_design',
    description: 'Formulates Christensen\'s JTBD statements: "When [Context], I want to [Action], so that [Outcome]".',
    tags: ['ux_design', 'jtbd', 'jobs-to-be-done', 'product', 'needs', 'outcomes'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Формулировки Jobs-to-be-Done (JTBD Matrix)',
        'Jobs-to-be-Done (JTBD) Statement Matrix',
        [
          '- **Канонический формат JTBD**: «Когда [Контекст/Триггер], я хочу [Функциональное действие], чтобы [Желаемый результат]».',
          '- **3 Измерения потребности**: Функциональная задача (что сделать), Эмоциональная задача (что почувствовать), Социальная задача (как выглядеть перед коллегами).',
          '- **Связь с фичами продукта**: Каждой JTBD-формулировке сопоставить конкретный элемент интерфейса.',
        ],
        [
          '- **Canonical JTBD Formula**: "When [Situational Trigger], I want to [Actionable Feature], so I can [Transformational Outcome]".',
          '- **Triad Dimensions**: Detail Functional Job (task execution), Emotional Job (anxiety reduction), and Social Job (status/peer perception).',
          '- **Feature Mapping**: Bind each job directly to an interface workflow resolving the core tension.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'wcag-accessibility-audit': {
    id: 'wcag-accessibility-audit',
    name: 'WcagAccessibilityAuditSkill',
    displayName: 'WCAG 2.1 AA/AAA Accessibility Audit',
    categoryId: 'ux_design',
    description: 'Enforces accessibility standards: contrast ratios (4.5:1), keyboard focus navigation, ARIA roles, and screen-reader labels.',
    tags: ['ux_design', 'a11y', 'wcag', 'accessibility', 'aria', 'contrast'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'constraints',
        'Стандарты Доступности (WCAG 2.1 AA Compliance)',
        'WCAG 2.1 AA/AAA Accessibility Standards & Constraints',
        [
          '- **Цветовой контраст**: Минимальный контраст текста к фону не менее 4.5:1 (для крупного текста 3:1).',
          '- **Управление с клавиатуры**: 100% элементов управления должны быть доступны через клавишу Tab с видимым outline фокусом.',
          '- **ARIA разметка**: Все иконки, кнопки и кастомные контролы должны иметь `aria-label`, `role` и семантические теги HTML5.',
        ],
        [
          '- **Color Contrast Ratios**: Enforce minimum 4.5:1 for standard body text and 3:1 for large display headers (WCAG Level AA).',
          '- **Full Keyboard Navigability**: Ensure 100% of interactive widgets are focusable via Tab with visible `:focus-visible` rings.',
          '- **ARIA & Semantic Markup**: Require descriptive `aria-label`, `aria-expanded`, and native semantic elements (`<nav>`, `<main>`, `<dialog>`).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'information-architecture-tree': {
    id: 'information-architecture-tree',
    name: 'InformationArchitectureTreeSkill',
    displayName: 'Information Architecture & Navigation Tree',
    categoryId: 'ux_design',
    description: 'Structures intuitive hierarchical navigation trees, taxonomies, breadcrumbs, and deep-linking schemas.',
    tags: ['ux_design', 'ia', 'navigation', 'sitemap', 'hierarchy', 'taxonomy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Информационная Архитектура и Дерево Навигации',
        'Information Architecture & Navigation Hierarchy Spec',
        [
          '- **Иерархическое дерево (Sitemap)**: Построить древовидную структуру разделов (Уровень 1 -> Уровень 2 -> Уровень 3).',
          '- **Хлебные крошки и URL**: Задать семантическую структуру URL-путей (`/dashboard/projects/:id/settings`).',
          '- **Правило 3 кликов**: Гарантировать, что любая критическая функция доступна не более чем за 3 клика от главной страницы.',
        ],
        [
          '- **Hierarchical Sitemap Tree**: Construct intuitive node tree (Root -> Tier 1 Nav -> Tier 2 Sub-views -> Action Modals).',
          '- **RESTful URL & Breadcrumb Schema**: Define canonical URL hierarchy reflecting organizational taxonomy (`/org/:id/clusters/:cid/logs`).',
          '- **3-Click Navigability Rule**: Ensure every primary business operation is reachable within a maximum of 3 interaction clicks.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'user-journey-flowchart': {
    id: 'user-journey-flowchart',
    name: 'UserJourneyFlowchartSkill',
    displayName: 'User Journey Map & Friction Analysis',
    categoryId: 'ux_design',
    description: 'Maps end-to-end user journeys across Touchpoints, Emotional Valence, Friction Points, and Optimization Opportunities.',
    tags: ['ux_design', 'user-journey', 'journey-map', 'touchpoints', 'ux', 'friction'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Картирование Пользовательского Пути (User Journey Map)',
        'User Journey Mapping & Friction Cliff Analysis',
        [
          '- **Поэтапный путь**: Разметить этапы: Осведомленность -> Регистрация -> Онбординг -> Первое ценное действие (Aha-moment) -> Регулярное использование.',
          '- **Эмоциональная кривая**: Оценить эмоциональное состояние пользователя (+ / =) на каждом шаге.',
          '- **Точки наибольшего трения**: Локализовать экраны с риском оттока и предложить решения по их сглаживанию.',
        ],
        [
          '- **Phased Journey Stages**: Map Discovery -> Registration -> First Core Interaction (Aha Moment) -> Habit Loop -> Expansion.',
          '- **Emotional Curve Scoring**: Grade cognitive sentiment valence (Delight / Neutral / Frustration) across touchpoints.',
          '- **Friction Cliff Isolation**: Isolate high-dropoff friction moments and engineer immediate UX smoothing interventions.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'empty-state-delight': {
    id: 'empty-state-delight',
    name: 'EmptyStateDelightSkill',
    displayName: 'Zero-Data Empty State Architecture',
    categoryId: 'ux_design',
    description: 'Designs engaging zero-data states with helpful illustrations, educational copy, and single-click primary CTAs.',
    tags: ['ux_design', 'empty-states', 'onboarding', 'cta', 'ui', 'microcopy'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Спецификация Empty States (Состояний без Данных)',
        'Zero-Data Empty State Architecture Specification',
        [
          '- **Понятное объяснение**: Объяснить, почему здесь пока пусто, без скучных системных фраз «Данные не найдены».',
          '- **Обучающий контекст**: Кратко рассказать о пользе раздела и как он будет выглядеть при заполнении.',
          '- **Главная кнопка действия (Primary CTA)**: Разместить крупную заметную кнопку для быстрого создания первой сущности.',
        ],
        [
          '- **Contextual Clarity**: Communicate why the view is currently unpopulated, eliminating dry "No records found" text.',
          '- **Value Preview**: Provide educational copy previewing the productivity benefits unlocked once data is ingested.',
          '- **Single-Click Primary CTA**: Anchor the view with a prominent action button triggering immediate first entity creation.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'onboarding-scaffolding-flow': {
    id: 'onboarding-scaffolding-flow',
    name: 'OnboardingScaffoldingFlowSkill',
    displayName: 'Progressive Disclosure & Onboarding Tour',
    categoryId: 'ux_design',
    description: 'Minimizes Time-to-Value (TTV) through progressive disclosure, interactive checklists, and interactive product tours.',
    tags: ['ux_design', 'onboarding', 'progressive-disclosure', 'ttv', 'activation', 'ux'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Сценарий Онбординга и Прогрессивного Раскрытия',
        'Progressive Disclosure & Onboarding Tour Protocol',
        [
          '- **Минимизация Time-to-Value (TTV)**: Довести пользователя до первого успешного результата менее чем за 90 секунд.',
          '- **Интерактивный чеклист прогресса**: Показать 3–4 простых шага с индикатором заполнения (например: «Выполнено 2 из 4 шагов»).',
          '- **Прогрессивное раскрытие сложности**: Скрывать продвинутые настройки до тех пор, пока пользователь не освоит базовый сценарий.',
        ],
        [
          '- **Sub-90-Second Time-to-Value (TTV)**: Guide user to their first meaningful Aha moment within 90 seconds of signup.',
          '- **Interactive Progress Checklist**: Display a persistent progress widget (e.g. "2 of 4 setup tasks completed").',
          '- **Progressive Disclosure**: Hide complex advanced configuration menus until core foundational workflows are completed.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'design-system-token-spec': {
    id: 'design-system-token-spec',
    name: 'DesignSystemTokenSpecSkill',
    displayName: 'Design System & Semantic Design Tokens',
    categoryId: 'ux_design',
    description: 'Specifies scalable design system tokens: 8pt grid, typographic scale (Major Third), semantic color tokens, and elevation.',
    tags: ['ux_design', 'design-system', 'tokens', 'tailwind', 'typography', 'spacing', 'ui'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Спецификация Дизайн-Токенов (Design Tokens Spec)',
        'Design System Token & Theming Specification',
        [
          '- **Сетка 8px (8pt Grid)**: Все отступы и размеры должны быть кратны 4px/8px (`4, 8, 12, 16, 24, 32, 48, 64px`).',
          '- **Типографическая шкала**: Задать размеры шрифтов и интерлиньяж по модульной шкале (12, 14, 16, 20, 24, 32, 48px).',
          '- **Семантические токены цветов**: Использовать имена `bg-surface`, `text-primary`, `border-muted`, `accent-action` вместо жестких HEX-кодов.',
        ],
        [
          '- **8pt Spatial Grid**: Align all margins, paddings, and component bounds strictly to 4px/8px increments (`4, 8, 16, 24, 32, 48, 64px`).',
          '- **Modular Typographic Scale**: Standardize font sizes and line heights (12/16, 14/20, 16/24, 20/28, 24/32, 32/40, 48/56).',
          '- **Semantic Token Mapping**: Enforce semantic color tokens (`surface-primary`, `text-subtle`, `interactive-active`, `status-danger`).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'mobile-responsive-breakpoint': {
    id: 'mobile-responsive-breakpoint',
    name: 'MobileResponsiveBreakpointSkill',
    displayName: 'Mobile-First Responsive Breakpoint Architecture',
    categoryId: 'ux_design',
    description: 'Enforces mobile-first responsive layouts: thumb zone reachability, touch targets >= 48px, adaptive breakpoints (sm, md, lg, xl).',
    tags: ['ux_design', 'mobile-first', 'responsive', 'touch-targets', 'breakpoints', 'ui'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'constraints',
        'Мобильная Адаптивность и Зоны Досягаемости Большого Пальца',
        'Mobile-First Responsive & Thumb-Zone Architecture',
        [
          '- **Минимальный размер тач-таргетов**: Все интерактивные элементы должны иметь размер не менее 48x48px с отступом между ними 8px.',
          '- **Зона досягаемости пальца (Thumb Zone)**: Размещать ключевые кнопки действий в нижней трети мобильного экрана.',
          '- **Адаптивные брейкпоинты**: Поддерживать плавную трансформацию интерфейса (Mobile: 375px -> Tablet: 768px -> Desktop: 1280px).',
        ],
        [
          '- **48px Minimum Touch Target**: Guarantee all clickable elements meet the 48x48px touch target area with 8px minimum separation.',
          '- **Natural Thumb-Zone Ergonomics**: Position primary bottom navigation and action sheets within comfortable natural thumb reach.',
          '- **Fluid Responsive Breakpoints**: Specify responsive behaviors across Mobile (375px), Tablet (768px), and Desktop (1280px+).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'fitts-law-interaction-design': {
    id: 'fitts-law-interaction-design',
    name: 'FittsLawInteractionDesignSkill',
    displayName: 'Fitts\'s Law & Ergonomic Interaction Design',
    categoryId: 'ux_design',
    description: 'Optimizes interaction velocity by minimizing movement distance and maximizing target size for critical actions.',
    tags: ['ux_design', 'fitts-law', 'ergonomics', 'interaction-design', 'speed', 'ux'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Закон Фиттса и Эргономика Интерфейса (Fitts\'s Law)',
        'Fitts\'s Law & Ergonomic Target Velocity Protocol',
        [
          '- **Размещение к краям и углам экрана**: Использовать края экрана («бесконечно большие цели») для закрепления меню и быстрых действий.',
          '- **Сокращение дистанции курсора**: Размещать контекстные меню и подтверждения рядом с точкой клика пользователя.',
          '- **Масштабирование часто используемых кнопок**: Делать наиболее популярные действия визуально крупнее второстепенных.',
        ],
        [
          '- **Edge Pinning Advantage**: Anchor persistent action rails to viewport edges to leverage Fitts\'s Law infinite target boundary.',
          '- **Cursor Travel Minimization**: Position contextual action menus adjacent to the originating click coordinate.',
          '- **Weighted Target Sizing**: Scale the clickable hit-area of high-frequency primary actions proportionally larger than destructive actions.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'cognitive-load-reducer': {
    id: 'cognitive-load-reducer',
    name: 'CognitiveLoadReducerSkill',
    displayName: 'Hick\'s Law & Cognitive Load Reducer',
    categoryId: 'ux_design',
    description: 'Reduces decision fatigue by limiting simultaneous choices (Hick\'s Law) and grouping complex data into digest chunks (Miller\'s 7±2).',
    tags: ['ux_design', 'cognitive-load', 'hicks-law', 'millers-law', 'simplicity', 'ux'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Снижение Когнитивной Нагрузки (Hick\'s & Miller\'s Laws)',
        'Cognitive Load Reduction & Information Chunking Protocol',
        [
          '- **Закон Хика (Hick\'s Law)**: Сократить количество одновременных вариантов выбора на одном экране (не более 4–5 опций).',
          '- **Чанкинг по Миллеру (7±2)**: Разбивать длинные формы и списки на логические смысловые блоки по 5–7 элементов.',
          '- **Умные дефолты (Smart Defaults)**: Заранее предвыбирать наиболее популярный и безопасный вариант настройки.',
        ],
        [
          '- **Hick\'s Law Option Pruning**: Restrict primary simultaneous choices per screen to at most 4-5 high-signal pathways.',
          '- **Miller\'s 7±2 Chunking**: Group lengthy data forms and configurations into digestible semantic clusters of 5-7 items.',
          '- **Intelligent Defaults**: Pre-select safe, industry-standard configurations to eliminate configuration decision fatigue.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'form-ux-friction-slasher': {
    id: 'form-ux-friction-slasher',
    name: 'FormUxFrictionSlasherSkill',
    displayName: 'High-Converting Form UX & Inline Validation',
    categoryId: 'ux_design',
    description: 'Maximizes form conversion rates: inline instant validation, floating labels, input masking, and multi-step progress.',
    tags: ['ux_design', 'forms', 'validation', 'conversion', 'inputs', 'ux'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'protocol',
        'Оптимизация Конверсии Форм (Form UX & Inline Validation)',
        'High-Converting Form UX & Real-Time Validation Protocol',
        [
          '- **Мгновенная валидация (Inline Validation)**: Показывать зеленую галочку успеха сразу после корректного заполнения поля (на `onBlur`).',
          '- **Маски ввода**: Использовать автоматическое форматирование для номеров телефонов, кредитных карт и дат.',
          '- **Сохранение введенных данных**: Автоматически сохранять введенные значения в LocalStorage при случайной перезагрузке страницы.',
        ],
        [
          '- **Inline Instant Validation**: Display affirmative validation feedback on `onBlur` rather than waiting for full form submit.',
          '- **Contextual Input Masking**: Enforce automated formatting masks for phone numbers, payment credentials, and currency amounts.',
          '- **Draft State Resilience**: Persist form inputs in local session storage to protect users against accidental page reloads.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'micro-interaction-choreography': {
    id: 'micro-interaction-choreography',
    name: 'MicroInteractionChoreographySkill',
    displayName: 'Micro-Interaction & Motion Choreography',
    categoryId: 'ux_design',
    description: 'Designs subtle physics-based UI micro-interactions, skeleton loaders, and tactile hover/active state feedback.',
    tags: ['ux_design', 'micro-interactions', 'motion', 'animation', 'feedback', 'ui'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Хореография Микро-Взаимодействий и Анимаций',
        'Micro-Interaction & Motion Choreography Specification',
        [
          '- **Скелетон-загрузчики (Skeleton Loaders)**: Использовать мерцающие серые блоки точной формы контента вместо крутящихся спиннеров.',
          '- **Физика переходов**: Длительность анимаций 150–250ms с кривой `cubic-bezier(0.4, 0, 0.2, 1)` для естественного отклика.',
          '- **Тактильная обратная связь**: Явные изменения состояний (`:hover`, `:active`, `:disabled`) для всех интерактивных контролов.',
        ],
        [
          '- **Content-Matched Skeleton Loaders**: Deploy layout-matched pulsing skeleton placeholders over blocking modal spinners.',
          '- **Subtle Physics Curves**: Standardize transition durations between 150-250ms using `cubic-bezier(0.4, 0, 0.2, 1)` easing.',
          '- **Symmetrical State States**: Provide unmistakable visual feedback for `:hover`, `:active`, `:focus-visible`, and `:disabled` states.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'usability-test-script-generator': {
    id: 'usability-test-script-generator',
    name: 'UsabilityTestScriptGeneratorSkill',
    displayName: 'Unbiased Usability Test & SUS Scoring Script',
    categoryId: 'ux_design',
    description: 'Generates think-aloud usability testing scripts, scenario tasks, and System Usability Scale (SUS) survey rubrics.',
    tags: ['ux_design', 'usability-testing', 'user-research', 'sus', 'think-aloud', 'ux'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Сценарий Юзабилити-Тестирования (Usability Test & SUS)',
        'Unbiased Usability Test Script & SUS Scoring Protocol',
        [
          '- **Нейтральные сценарии задач**: Формулировать задания без наводящих подсказок («Попробуйте экспортировать отчет за прошлый месяц»).',
          '- **Протокол «Думай вслух» (Think Aloud)**: Инструкции для модератора по фиксации заминок и эмоциональных реакций респондента.',
          '- **Опросник SUS (System Usability Scale)**: 10 стандартных вопросов с расчетом итогового балла юзабилити от 0 до 100.',
        ],
        [
          '- **Non-Leading Task Scenarios**: Frame realistic objective tasks without revealing UI path keywords ("Attempt to export last month\'s billing logs").',
          '- **Think-Aloud Protocol Prompts**: Moderator prompts capturing cognitive friction, hesitation moments, and verbalized confusion.',
          '- **System Usability Scale (SUS)**: Standardized 10-item Likert survey calculating normalized usability scores (target > 80).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
