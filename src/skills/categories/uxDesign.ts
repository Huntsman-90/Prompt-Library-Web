import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
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

'affordance-signifier-clarity': {
    id: 'affordance-signifier-clarity',
    name: 'AffordanceSignifierClaritySkill',
    displayName: 'Affordance & Signifier Visual Hierarchy',
    categoryId: 'ux_design',
    description: 'Ensures interactive UI elements have intuitive physical affordances and unmistakable signifiers (hover, focus, depth).',
    tags: ['ux_design', 'affordance', 'signifiers', 'visual-hierarchy', 'interactions', 'ui'],
    transform: createStandardSkillTransform(
      'protocol',
      'Проектирование Аффордансов и Сигнификаторов Интерфейса',
      'Affordance & Signifier Visual Hierarchy Protocol',
      [
        '- **Кликабельность элементов**: Кнопки и ссылки должны выглядеть кликабельными (тени, контрастный фон, границы, курсор pointer).',
        '- **Состояния взаимодействия**: Для каждого интерактивного элемента описать 4 состояния: Default, Hover, Active, Focus-Visible.',
        '- **Устранение ложных аффордансов**: Статичный текст и баннеры не должны выглядеть как кнопки или поля ввода.',
      ],
      [
        '- **Clickability Cues**: Ensure interactive controls possess unmistakable physical cues (depth, contrast borders, cursor pointer).',
        '- **State Quad Specification**: Specify Default, Hover, Active, and Focus-Visible styling for all actionable controls.',
        '- **Zero False Affordances**: Ensure decorative containers and static badges never emulate interactive inputs or buttons.',
      ]
    ),
  },

  'fitts-hick-law-optimizer': {
    id: 'fitts-hick-law-optimizer',
    name: 'FittsHickLawOptimizerSkill',
    displayName: 'Fitts\'s & Hick\'s Law Interaction Optimizer',
    categoryId: 'ux_design',
    description: 'Applies Fitts\'s Law (target size & distance) and Hick\'s Law (choice reduction) to streamline user decision speed.',
    tags: ['ux_design', 'fitts-law', 'hicks-law', 'ergonomics', 'decision-time', 'ux-laws'],
    transform: createStandardSkillTransform(
      'protocol',
      'Оптимизация по Законам Фиттса и Хика (UX Ergonomics)',
      'Fitts\'s & Hick\'s Law Ergonomic Interaction Protocol',
      [
        '- **Закон Фиттса (Минимальный размер цели)**: Основные кнопки действий делать не менее 44x44px на мобильных и располагать в зоне легкой досягаемости пальца.',
        '- **Закон Хика (Сокращение вариантов)**: Не предлагать более 5–7 вариантов в одном меню; дробить сложные выборы на последовательные шаги.',
        '- **Выделение рекомендованного выбора**: Визуально акцентировать рекомендуемый вариант (Default Choice) для ускорения решения.',
      ],
      [
        '- **Fitts\'s Law Target Geometry**: Primary tap targets must exceed 44x44px minimum geometry positioned in natural thumb reach zones.',
        '- **Hick\'s Law Choice Pruning**: Cap parallel menu options at 5-7 items; decompose complex decision trees into phased progressive steps.',
        '- **Default Pathway Salience**: Visually elevate the optimal default path to slash user cognitive processing duration.',
      ]
    ),
  },

  'progressive-disclosure-stepper': {
    id: 'progressive-disclosure-stepper',
    name: 'ProgressiveDisclosureStepperSkill',
    displayName: 'Progressive Disclosure & Phased Complexity',
    categoryId: 'ux_design',
    description: 'Hides advanced settings behind expandable disclosure controls, keeping default interfaces clean and non-intimidating.',
    tags: ['ux_design', 'progressive-disclosure', 'simplicity', 'onboarding', 'complexity-management'],
    transform: createStandardSkillTransform(
      'protocol',
      'Прогрессивное Раскрытие Сложности (Progressive Disclosure)',
      'Progressive Disclosure & Complexity Phasing Protocol',
      [
        '- **Главный экран для 80% задач**: На первом экране показывать только те настройки, которые нужны 80% пользователей.',
        '- **Скрытые экспертные функции**: Продвинутые параметры прятать под аккуратный спойлер «Дополнительные параметры (Advanced)».',
        '- **Сохранение состояния**: Запоминать состояние раскрытия спойлеров для опытных пользователей.',
      ],
      [
        '- **80/20 Core Surface**: Reserve default viewport exclusively for the vital parameters required by 80% of routine workflows.',
        '- **Secondary Disclosure Panels**: Nest advanced parameters inside intuitive expandable accordions ("Advanced Options").',
        '- **State Persistence**: Preserve expansion preferences in local session cache to respect power-user velocity.',
      ]
    ),
  },

  'dark-pattern-ethical-scrubber': {
    id: 'dark-pattern-ethical-scrubber',
    name: 'DarkPatternEthicalScrubberSkill',
    displayName: 'Dark Pattern Audit & Ethical UX Defense',
    categoryId: 'ux_design',
    description: 'Audits and eliminates deceptive dark patterns (Roach motels, sneak into basket, disguised ads, confirmshaming).',
    tags: ['ux_design', 'dark-patterns', 'ethics', 'compliance', 'trust', 'user-advocacy'],
    transform: createStandardSkillTransform(
      'constraints',
      'Аудит и Устранение Dark Patterns (Этический UX)',
      'Dark Pattern Elimination & Ethical UX Defense Protocol',
      [
        '- **Запрет Confirmshaming**: Тексты отказа от подписки или скидки должны быть нейтральными («Нет, спасибо»), без манипуляций («Нет, я не люблю экономить»).',
        '- **Симметричность действий**: Отписка или удаление аккаунта должны требовать не больше кликов, чем подписка или регистрация.',
        '- **Прозрачность цен**: Никаких скрытых сборов и автоматических галочек страховок в корзине на этапе оплаты.',
      ],
      [
        '- **Confirmshaming Elimination**: Format decline buttons neutrally ("No, thank you") banning emotional manipulation copy.',
        '- **Symmetric Cancellation**: Ensure unsubscribing or account closure requires zero more friction or steps than initial sign-up.',
        '- **Transparent Checkout Fences**: Ban pre-checked add-on boxes, hidden recurring billing toggles, or surprise checkout fees.',
      ]
    ),
  },

  'responsive-fluid-breakpoint-spec': {
    id: 'responsive-fluid-breakpoint-spec',
    name: 'ResponsiveFluidBreakpointSpecSkill',
    displayName: 'Adaptive Responsive Breakpoint Matrix',
    categoryId: 'ux_design',
    description: 'Defines responsive behaviors across mobile (320px), tablet (768px), desktop (1024px), and wide (1440px+) layouts.',
    tags: ['ux_design', 'responsive', 'mobile-first', 'breakpoints', 'css', 'layout'],
    transform: createStandardSkillTransform(
      'output_format',
      'Матрица Адаптивных Брейкпоинтов Интерфейса',
      'Adaptive Responsive Breakpoint Specification Matrix',
      [
        '- **Mobile-First подход**: Спроектировать базовый лейаут для экранов 320–480px (одна колонка, нижняя навигация).',
        '- **Планшет (768–1023px)**: Двухколоночная сетка, сворачиваемый сайдбар, адаптивные таблицы со скроллом.',
        '- **Десктоп (1024px+)**: Полноценная многоколоночная панель, фиксированная боковая навигация, модальные окна.',
      ],
      [
        '- **Mobile-First Foundation**: Baseline architecture targets 320-480px viewports (single-column stack, sticky bottom tab navigation).',
        '- **Tablet Dynamics (768-1023px)**: Two-column grid reflow, collapsible drawer navigation, and horizontally scrolling responsive data tables.',
        '- **Desktop Ergonomics (1024px+)**: Multi-pane split views, fixed persistent sidebar navigation, and centered modal dialogues.',
      ]
    ),
  },

  'dashboard-widget-visual-hierarchy': {
    id: 'dashboard-widget-visual-hierarchy',
    name: 'DashboardWidgetVisualHierarchySkill',
    displayName: 'Executive Dashboard Widget Architecture',
    categoryId: 'ux_design',
    description: 'Arranges analytics dashboards with primary KPI scorecards up top, trend graphs in center, and granular data grids below.',
    tags: ['ux_design', 'dashboard', 'analytics', 'kpi', 'data-viz', 'layout'],
    transform: createStandardSkillTransform(
      'output_format',
      'Архитектура Визуальной Иерархии Аналитического Дашборда',
      'Executive Analytics Dashboard Visual Hierarchy Architecture',
      [
        '- **Верхняя полоса KPI**: 3–4 карточки ключевых метрик с дельтами изменений (+12% MoM) и спарклайнами.',
        '- **Центральная зона трендов**: Интерактивные графики динамики за период с тултипами при наведении.',
        '- **Нижняя табличная часть**: Детализированная таблица с фильтрами, сортировкой колонок и пагинацией.',
      ],
      [
        '- **Hero KPI Scorecard Strip**: 3-4 primary vital metric cards featuring comparative delta badges (+12% MoM) and inline sparklines.',
        '- **Mid-Tier Trend Canvas**: Interactive time-series charts equipped with crosshair hover tooltips and time-range selectors.',
        '- **Granular Data Bottom Grid**: Filterable, sortable tabular ledger equipped with cursor pagination and CSV export controls.',
      ]
    ),
  },

  'error-prevention-confirmation-dialog': {
    id: 'error-prevention-confirmation-dialog',
    name: 'ErrorPreventionConfirmationDialogSkill',
    displayName: 'Destructive Action & Error Prevention Safeguard',
    categoryId: 'ux_design',
    description: 'Implements two-step confirmation dialogs with explicit typing verification (e.g. type repo name) for irreversible destructive tasks.',
    tags: ['ux_design', 'error-prevention', 'confirmation', 'destructive', 'dialogs', 'safety'],
    transform: createStandardSkillTransform(
      'protocol',
      'Предотвращение Ошибок и Подтверждение Деструктивных Действий',
      'Destructive Action Error Prevention & Confirmation Safeguard',
      [
        '- **Ввод названия для подтверждения**: При удалении проекта или БД требовать ручного ввода точного имени сущности.',
        '- **Красный акцент опасности**: Кнопка окончательного удаления окрашивается в красный цвет (Destructive Red) и активна только после верного ввода.',
        '- **Таймер отмены (Undo Snackbar)**: Предоставлять 5-секундное окно для отмены действия через плавающее уведомление Undo.',
      ],
      [
        '- **Explicit Entity Name Typing**: For catastrophic actions (database drop, project purge), mandate typing the exact entity name.',
        '- **Destructive Red Intent**: Color final commit button in warning crimson, keeping it disabled until full verification string matches.',
        '- **Graceful Undo Window**: Accompany immediate soft-deletions with a persistent 5-second toast featuring a single-click Undo trigger.',
      ]
    ),
  },

  'onboarding-aha-moment-accelerator': {
    id: 'onboarding-aha-moment-accelerator',
    name: 'OnboardingAhaMomentAcceleratorSkill',
    displayName: 'First-Run Onboarding "Aha Moment" Accelerator',
    categoryId: 'ux_design',
    description: 'Designs first-run user experiences that guide new users to their first value milestone in under 60 seconds with pre-seeded templates.',
    tags: ['ux_design', 'onboarding', 'aha-moment', 'activation', 'retention', 'product-led-growth'],
    transform: createStandardSkillTransform(
      'protocol',
      'Ускорение Первого Инсайта (Aha Moment) в Онбординге',
      'First-Run Onboarding "Aha Moment" Activation Architecture',
      [
        '- **Меньше 60 секунд до ценности**: Устранить лишние опросы при регистрации; перенаправлять пользователя сразу к первому полезному действию.',
        '- **Предзаполненные шаблоны**: Показывать готовые данные и примеры в пустом проекте, чтобы интерфейс не пугал пустотой.',
        '- **Интерактивный туториал из 3 шагов**: Подсвечивать элементы интерфейса с поздравлением после создания первого артефакта.',
      ],
      [
        '- **Sub-60s Time-to-Value**: Strip non-essential onboarding surveys; route new signups directly into the core creation canvas.',
        '- **Pre-Seeded Interactive Templates**: Populate empty accounts with realistic sample datasets to eliminate the blank-canvas anxiety.',
        '- **3-Step Micro-Tour**: Anchor targeted pulse spotlights on critical controls, triggering confetti celebration upon first task completion.',
      ]
    ),
  },

  'gamification-progress-loop': {
    id: 'gamification-progress-loop',
    name: 'GamificationProgressLoopSkill',
    displayName: 'Gamification Progress Bar & Endowed Progress',
    categoryId: 'ux_design',
    description: 'Leverages the Endowed Progress Effect and visual progress rings to drive task completion without feeling manipulative.',
    tags: ['ux_design', 'gamification', 'progress-bar', 'motivation', 'completion', 'psychology'],
    transform: createStandardSkillTransform(
      'protocol',
      'Геймификация и Эффект Наделённого Прогресса (Progress Loops)',
      'Endowed Progress & Task Completion Gamification Protocol',
      [
        '- **Эффект наделенного прогресса**: При создании профиля показывать шкалу заполнения уже на 20% («Шаг 1: Аккаунт создан — выполнено!»).',
        '- **Дробление на микро-цели**: Разбить длинную анкету на 3 коротких шага с понятной визуальной шкалой прогресса.',
        '- **Мгновенная обратная связь**: Показывать анимацию галочки и ободряющий микрокопирайт при завершении каждого шага.',
      ],
      [
        '- **Endowed Progress Kickstart**: Initialize profile completion bars at 20% credit immediately upon signup ("Step 1: Account Created!").',
        '- **Micro-Milestone Segmentation**: Decompose long flows into 3 digestible stages illuminated by animated segmented progress indicators.',
        '- **Instant Delight Feedback**: Dispatch tactile checkmark micro-animations and positive progress feedback upon step completion.',
      ]
    ),
  },

  'heuristic-evaluation-severity-matrix': {
    id: 'heuristic-evaluation-severity-matrix',
    name: 'HeuristicEvaluationSeverityMatrixSkill',
    displayName: 'Usability Defect Severity Matrix & Triage',
    categoryId: 'ux_design',
    description: 'Categorizes discovered UX defects into Severity 0 to 4 with actionable redesign recommendations and engineering tickets.',
    tags: ['ux_design', 'usability', 'heuristics', 'triage', 'severity-matrix', 'qa'],
    transform: createStandardSkillTransform(
      'output_format',
      'Матрица Критичности Юзабилити-Дефектов (UX Severity Triage)',
      'Usability Defect Severity & Remediation Matrix',
      [
        '- **Шкала критичности 0-4**: 0 = Замечание, 1 = Косметический дефект, 2 = Минорный баг, 3 = Мажорный барьер, 4 = Критический блокер конверсии.',
        '- **Локация и скриншот**: Указать конкретный экран, селектор элемента и сценарий возникновения дефекта.',
        '- **Инженерная рекомендация**: Дать готовое решение для UI/CSS или логики фронтенда для быстрого устранения.',
      ],
      [
        '- **Severity Tiering (0-4)**: Triage usability bugs across Cosmetic (1), Minor (2), Major (3), and Catastrophic Conversion Blocker (4).',
        '- **Component Coordinate Pinpointing**: Document exact view route, DOM component selector, and offending interaction trajectory.',
        '- **Prescriptive Frontend Fix**: Accompany each logged defect with production-ready CSS, layout, or copy remediation recommendations.',
      ]
    ),
  },

  'design-system-design-tokens-v2': {
    id: 'design-system-design-tokens-v2',
    name: 'DesignSystemDesignTokensV2Skill',
    displayName: 'W3C Design Tokens Community Group (DTCG) Spec',
    categoryId: 'ux_design',
    description: 'Structures design system tokens conforming to DTCG standard JSON with $value, $type, semantic aliases, and dark mode modes.',
    tags: ['ux_design', 'design-tokens', 'dtcg', 'design-system', 'css-variables', 'theme'],
    transform: createStandardSkillTransform(
      'output_format',
      'Спецификация Дизайн-Токенов (W3C DTCG Standard)',
      'W3C Design Tokens Community Group (DTCG) Specification',
      [
        '- **Формат DTCG**: Структурировать токены с полями $value, $type (color, dimension, typography, duration) и $description.',
        '- **Трехуровневая архитектура**: 1) Глобальные примитивы (blue-500), 2) Семантические токены (color-primary), 3) Компонентные токены (btn-bg-primary).',
        '- **Поддержка темной темы**: Организовать семантические токены так, чтобы смена темы происходила через переопределение CSS-переменных на уровне :root.',
      ],
      [
        '- **DTCG JSON Architecture**: Format tokens with strict $value, $type (color, dimension, typography, duration), and $description properties.',
        '- **Three-Tier Token Hierarchy**: Global Primitives (e.g. blue.500) -> Semantic Tokens (action.primary.surface) -> Component Tokens.',
        '- **Theme Switch Invariants**: Structure semantic tokens to enable zero-runtime-cost dark mode swaps via cascading CSS custom properties.',
      ]
    ),
  },

  'zero-state-actionable-prompt': {
    id: 'zero-state-actionable-prompt',
    name: 'ZeroStateActionablePromptSkill',
    displayName: 'Actionable Empty State & First-Step Catalyst',
    categoryId: 'ux_design',
    description: 'Transforms dead-end blank pages into motivating empty states featuring thematic illustrations, value propositions, and primary CTAs.',
    tags: ['ux_design', 'empty-state', 'zero-state', 'cta', 'onboarding', 'conversion'],
    transform: createStandardSkillTransform(
      'protocol',
      'Проектирование Активных Пустых Состояний (Empty States)',
      'Actionable Zero-State & First-Step Catalyst Architecture',
      [
        '- **Понятная иллюстрация и заголовок**: Лаконичный заголовок, объясняющий назначение раздела («Здесь будут ваши проекты»).',
        '- **Ценностное предложение**: Одно предложение о том, какую пользу получит пользователь после добавления первой записи.',
        '- **Единственная яркая кнопка**: Контрастный первичный CTA («Создать первый проект»), запускающий модалку или мастер добавления.',
      ],
      [
        '- **Thematic Illustration & Header**: Concise benefit-driven headline explaining section purpose ("Your deployed APIs will live here").',
        '- **Value Proposition Microcopy**: Single crisp sentence clarifying the tangible operational upside of initiating the first record.',
        '- **Singular High-Contrast CTA**: Prominent primary button trigger ("Launch Your First API") immediately launching creation modal.',
      ]
    ),
  },

  'multi-step-form-wizard-pacing': {
    id: 'multi-step-form-wizard-pacing',
    name: 'MultiStepFormWizardPacingSkill',
    displayName: 'Multi-Step Form Wizard & Cognitive Pacing',
    categoryId: 'ux_design',
    description: 'Deconstructs massive input forms into manageable wizard steps with inline validation, progress indicators, and auto-save.',
    tags: ['ux_design', 'forms', 'wizard', 'multi-step', 'validation', 'auto-save'],
    transform: createStandardSkillTransform(
      'protocol',
      'Многошаговый Мастер Форм (Form Wizard Pacing)',
      'Multi-Step Form Wizard & Cognitive Pacing Protocol',
      [
        '- **Группировка по смыслу**: Разбить форму на 3–4 логических шага: Базовая информация -> Конфигурация -> Оплата -> Подтверждение.',
        '- **Инлайн-валидация при потере фокуса**: Показывать ошибки валидации только после ухода курсора из поля (onBlur), а не при наборе текста.',
        '- **Автосохранение черновика**: Сохранять введенные данные в localStorage, чтобы при случайной перезагрузке страницы пользователь не потерял прогресс.',
      ],
      [
        '- **Logical Step Clustering**: Segment inputs across 3-4 natural chapters: Profile -> Infrastructure Parameters -> Billing -> Verification.',
        '- **Polite onBlur Inline Validation**: Trigger error alerts strictly upon field blur (onBlur), avoiding distracting validation flashes mid-typing.',
        '- **Continuous Draft Auto-Save**: Persist uncommitted form state into client localStorage shielding users from accidental page refreshes.',
      ]
    ),
  },

  'mobile-sheet-bottom-drawer-ux': {
    id: 'mobile-sheet-bottom-drawer-ux',
    name: 'MobileSheetBottomDrawerUxSkill',
    displayName: 'Mobile Bottom Sheet & Gesture Drawer UX',
    categoryId: 'ux_design',
    description: 'Designs mobile bottom sheet drawers with drag-to-dismiss handles, snap points (50%, 90%), and backdrop scroll locks.',
    tags: ['ux_design', 'mobile', 'bottom-sheet', 'gestures', 'drawer', 'touch'],
    transform: createStandardSkillTransform(
      'protocol',
      'Проектирование Мобильных Нижних Шторок (Bottom Sheet UX)',
      'Mobile Bottom Sheet & Gesture Drawer Architecture',
      [
        '- **Жест смахивания вниз**: Поддерживать естественное закрытие шторки свайпом вниз с визуальной ручкой (Drag Handle).',
        '- **Точки фиксации (Snap Points)**: Предусмотреть фиксированные высоты раскрытия: 50% экрана для быстрого просмотра и 90% для полного экрана.',
        '- **Блокировка прокрутки фона**: При открытой шторке блокировать скролл страницы под ней (overflow: hidden).',
      ],
      [
        '- **Swipe-to-Dismiss Gesture**: Implement native velocity-based swipe-down dismiss mechanics paired with a prominent touch pill handle.',
        '- **Calibrated Snap Points**: Anchor predictable expansion heights: half-sheet (50vh preview) and full-expansion (90vh edit mode).',
        '- **Backdrop Scroll Locking**: Freeze document body scrolling (overflow: hidden) whenever the overlay drawer is mounted.',
      ]
    ),
  },

  'inline-search-autocomplete-trie': {
    id: 'inline-search-autocomplete-trie',
    name: 'InlineSearchAutocompleteTrieSkill',
    displayName: 'Inline Search & Typeahead Autocomplete UX',
    categoryId: 'ux_design',
    description: 'Designs keyboard-navigable autocomplete dropdowns with debounced inputs, bold match highlights, and recent searches.',
    tags: ['ux_design', 'search', 'autocomplete', 'typeahead', 'keyboard-navigation', 'aria'],
    transform: createStandardSkillTransform(
      'protocol',
      'Инлайн-Поиск с Автодополнением (Typeahead Autocomplete UX)',
      'Inline Search & Typeahead Autocomplete UX Protocol',
      [
        '- **Debounce ввода (300 мс)**: Задерживать отправку запроса на 300 мс после последнего нажатия клавиши для экономии серверных ресурсов.',
        '- **Подсветка совпадений**: Выделять введенные пользователем буквы в выпадающем списке жирным шрифтом (mark или font-bold).',
        '- **Полная навигация с клавиатуры**: Поддерживать перемещение стрелками Вверх/Вниз, выбор через Enter и закрытие по Escape.',
      ],
      [
        '- **Debounced Input Stream (300ms)**: Buffer keystroke dispatches via 300ms debounce to conserve search cluster computing resources.',
        '- **Substring Match Highlighting**: Wrap matching query substrings inside bold formatting tags in results list.',
        '- **Full Keyboard Traversal**: Support ArrowUp/ArrowDown highlight cycling, Enter selection, and Escape menu dismiss.',
      ]
    ),
  },

  'skeleton-shimmer-loading-state': {
    id: 'skeleton-shimmer-loading-state',
    name: 'SkeletonShimmerLoadingStateSkill',
    displayName: 'Skeleton Shimmer & Perceived Performance',
    categoryId: 'ux_design',
    description: 'Replaces jarring spinners with layout-accurate skeleton screens featuring gentle shimmer animations to boost perceived performance.',
    tags: ['ux_design', 'skeleton', 'shimmer', 'loading', 'perceived-performance', 'performance'],
    transform: createStandardSkillTransform(
      'protocol',
      'Скелетоны Загрузки с Анимацией Shimmer (Perceived Performance)',
      'Skeleton Shimmer Screen & Perceived Latency Protocol',
      [
        '- **Точное повторение формы контента**: Скелетон карточки должен в точности повторять геометрию аватара, заголовка и строк текста.',
        '- **Мягкая пульсация Shimmer**: Использовать плавный градиентный перелив (shimmer) вместо резких мигающих спиннеров.',
        '- **Бесшовный переход**: При загрузке данных заменять скелетон на реальный контент с мгновенным плавным появлением без дергания макета.',
      ],
      [
        '- **Geometry Parity**: Skeleton placeholders must mirror exact avatar dimensions, heading widths, and line-heights of incoming payloads.',
        '- **Gentle Shimmer Gradient**: Apply a subtle, continuous linear gradient sweep animation avoiding abrasive full-screen spinners.',
        '- **Zero Jitter Transition**: Swap skeleton nodes for verified payload elements seamlessly without inducing Cumulative Layout Shift.',
      ]
    ),
  },
  "fitts-law-target-acquisition-audit": {
    id: "fitts-law-target-acquisition-audit",
    name: "FittsLawTargetAcquisitionAuditSkill",
    displayName: "Fitts' Law Touch Target & Ergonomics Audit",
    categoryId: "ux_design",
    description: "Audits UI controls for motor ergonomics and Fitts' Law: minimum 48x48px touch targets, thumb-zone placement, and edge-pinned trigger buttons.",
    tags: ["ux_design","fitts-law","touch-targets","ergonomics","mobile-ux"],
    transform: createStandardSkillTransform({
      sectionName: "Fitts' Law Ergonomics Protocol",
      ruSectionName: "Протокол моторной эргономики и закона Фиттса (Touch Target Audit)",
      instructions: [
        "Enforce minimum physical touch target sizes of 48x48 CSS pixels for all interactive mobile controls.",
        "Position primary high-frequency action buttons within the natural thumb zone on mobile viewports.",
        "Leverage screen edges and corners for pinned actions to reduce targeting time to minimum.",
        "Provide ample spacing (minimum 8px) between adjacent interactive targets to eliminate mis-taps."
],
      ruInstructions: [
        "Обеспечивайте минимальный размер интерактивных элементов 48x48 пикселей на мобильных экранах.",
        "Размещайте часто используемые кнопки действий в естественной зоне досягаемости большого пальца.",
        "Используйте границы и углы экрана для закрепления кнопок для ускорения попадания по ним.",
        "Задавайте безопасные отступы (не менее 8px) между соседними кнопками для предотвращения случайных нажатий."
],
      semanticType: "process_directive",
      tags: ["ux_design","fitts-law","touch-targets","ergonomics","mobile-ux"],
    }),
  },

  "hicks-law-decision-latency-reducer": {
    id: "hicks-law-decision-latency-reducer",
    name: "HicksLawDecisionLatencyReducerSkill",
    displayName: "Hick's Law Cognitive Choice & Decision Latency Reducer",
    categoryId: "ux_design",
    description: "Applies Hick's Law (Decision Time = b * log2(n + 1)) to reduce cognitive overload by chunking complex menus and highlighting recommended defaults.",
    tags: ["ux_design","hicks-law","cognitive-load","choice-architecture","simplicity"],
    transform: createStandardSkillTransform({
      sectionName: "Hick's Law Cognitive Streamlining Protocol",
      ruSectionName: "Протокол снижения когнитивной нагрузки по закону Хика (Hick's Law)",
      instructions: [
        "Reduce the number of simultaneous choices presented to users on any single screen.",
        "Break complex configuration options into sequential progressive disclosure steps.",
        "Highlight a single \"Recommended\" or \"Most Popular\" option to provide a cognitive shortcut.",
        "Categorize long dropdown menus into distinct, logically grouped sub-headings."
],
      ruInstructions: [
        "Сокращайте число одновременно доступных вариантов выбора на одном экране.",
        "Разбивайте сложные формы настроек на последовательные пошаговые сценарии (Progressive Disclosure).",
        "Выделяйте визуально один рекомендуемый вариант по умолчанию как быструю подсказку для пользователя.",
        "Группируйте длинные списки по смысловым подразделам с понятными заголовками."
],
      semanticType: "process_directive",
      tags: ["ux_design","hicks-law","cognitive-load","choice-architecture","simplicity"],
    }),
  },

  "progressive-disclosure-complexity-gate": {
    id: "progressive-disclosure-complexity-gate",
    name: "ProgressiveDisclosureComplexityGateSkill",
    displayName: "Progressive Disclosure Information Hierarchy Gate",
    categoryId: "ux_design",
    description: "Structures complex interfaces using Progressive Disclosure: showing only essential primary controls initially while tucking advanced features behind contextual reveals.",
    tags: ["ux_design","progressive-disclosure","information-architecture","complexity-management"],
    transform: createStandardSkillTransform({
      sectionName: "Progressive Disclosure Protocol",
      ruSectionName: "Протокол прогрессивного раскрытия информации (Progressive Disclosure)",
      instructions: [
        "Display only the primary controls necessary for 80% of common user tasks by default.",
        "House advanced parameters behind clear secondary toggles (e.g. \"Advanced Settings\", \"More Options\").",
        "Preserve user mental model: ensure revealed options appear in natural contextual alignment.",
        "Prevent visual clutter while retaining 100% of advanced power-user capabilities."
],
      ruInstructions: [
        "Отображайте по умолчанию только те базовые элементы, которые нужны для 80% регулярных сценариев.",
        "Прячьте расширенные технические параметры за раскрывающимися блоками (\"Дополнительные настройки\").",
        "Обеспечивайте логичное появление скрытых параметров непосредственно в контексте связанных полей.",
        "Устраняйте визуальный шум экрана, сохраняя всю полноту возможностей для опытных пользователей."
],
      semanticType: "structural_directive",
      tags: ["ux_design","progressive-disclosure","information-architecture","complexity-management"],
    }),
  },

  "skeleton-screen-perceived-performance": {
    id: "skeleton-screen-perceived-performance",
    name: "SkeletonScreenPerceivedPerformanceSkill",
    displayName: "Skeleton Screen & Perceived Latency Architecture",
    categoryId: "ux_design",
    description: "Replaces disruptive full-screen spinners with content-shaped shimmering Skeleton Screens to dramatically improve perceived load times.",
    tags: ["ux_design","skeleton-screens","perceived-performance","loading-states","ui-polish"],
    transform: createStandardSkillTransform({
      sectionName: "Skeleton Screen Loading Architecture",
      ruSectionName: "Спецификация экранов загрузки Skeleton Screen (Perceived Performance)",
      instructions: [
        "Replace blank screens and blocking spinners with shimmering skeleton placeholders matching exact layout geometry.",
        "Animate skeleton screens with subtle left-to-right CSS pulse gradients.",
        "Progressively swap in rendered data elements as they arrive without cumulative layout shifts (CLS = 0).",
        "Create the perceptual illusion of near-instantaneous page responsiveness."
],
      ruInstructions: [
        "Заменяйте блокирующие спиннеры анимированными скелетонами (Skeleton Screens), повторяющими форму будущего контента.",
        "Используйте мягкую градиентную пульсацию для визуализации активного процесса загрузки.",
        "Плавного подставляйте реальные данные на место скелетонов без скачков разметки (CLS = 0).",
        "Создавайте субъективное ощущение мгновенной загрузки и отзывчивости приложения."
],
      semanticType: "structural_directive",
      tags: ["ux_design","skeleton-screens","perceived-performance","loading-states","ui-polish"],
    }),
  },

  "empty-state-activation-design": {
    id: "empty-state-activation-design",
    name: "EmptyStateActivationDesignSkill",
    displayName: "First-Time Empty State & Activation Onboarding",
    categoryId: "ux_design",
    description: "Designs high-converting zero-data Empty States featuring inviting illustrations, educational value copy, and clear primary creation action buttons.",
    tags: ["ux_design","empty-states","onboarding","activation","ux-copywriting"],
    transform: createStandardSkillTransform({
      sectionName: "Empty State Design Protocol",
      ruSectionName: "Протокол проектирования экранов нулевого состояния (Empty States)",
      instructions: [
        "Never present users with a barren blank table or generic \"No data found\" dead end.",
        "Incorporate a warm, contextually relevant illustration or icon.",
        "Explain the core value of populating the section in 2 encouraging sentences.",
        "Provide a prominent primary action button (e.g. \"+ Create Your First Project\") to trigger immediate activation."
],
      ruInstructions: [
        "Никогда не оставляйте пустые таблицы с сухой надписью \"Данные не найдены\".",
        "Используйте доброжелательную тематическую иллюстрацию или иконку.",
        "Кратко объясните пользу наполнения этого раздела в двух понятных предложениях.",
        "Размещайте яркую кнопку первого действия (например, \"+ Создать первый проект\") для быстрого старта."
],
      semanticType: "structural_directive",
      tags: ["ux_design","empty-states","onboarding","activation","ux-copywriting"],
    }),
  },

  "micro-interaction-feedback-delight": {
    id: "micro-interaction-feedback-delight",
    name: "MicroInteractionFeedbackDelightSkill",
    displayName: "Micro-Interaction Physics & Tactile Feedback Design",
    categoryId: "ux_design",
    description: "Designs subtle micro-interactions (button active depression, toggle spring physics, success checkmark drawing) that communicate state and delight users.",
    tags: ["ux_design","micro-interactions","animation","feedback","ui-delight"],
    transform: createStandardSkillTransform({
      sectionName: "Micro-Interaction Design Protocol",
      ruSectionName: "Протокол проектирования микроанимаций и тактильного отклика (Micro-Interactions)",
      instructions: [
        "Provide immediate physical feedback on click/tap: subtle button scale depression (0.98x) and background tint.",
        "Use natural spring physics (cubic-bezier easing) for modal entrances and drawer transitions.",
        "Animate state changes meaningful: morph submit buttons into loading spinners and then into green checkmarks.",
        "Respect user `prefers-reduced-motion` accessibility preferences unconditionally."
],
      ruInstructions: [
        "Давайте мгновенный визуальный отклик на нажатие: микросжатие кнопки (scale 0.98) и изменение тона.",
        "Используйте естественную физику упругости (Spring Physics / cubic-bezier) для выезда модальных окон и меню.",
        "Одушевляйте смену состояний: плавная трансформация кнопки отправки в спиннер и затем в зеленую галочку успеха.",
        "Строго соблюдайте системную настройку пользователя `prefers-reduced-motion` для отключения резких анимаций."
],
      semanticType: "process_directive",
      tags: ["ux_design","micro-interactions","animation","feedback","ui-delight"],
    }),
  },

  "form-validation-inline-feedback": {
    id: "form-validation-inline-feedback",
    name: "FormValidationInlineFeedbackSkill",
    displayName: "Real-Time Inline Form Validation & Error Architecture",
    categoryId: "ux_design",
    description: "Implements forgiving inline form validation: validate on blur rather than keystroke, green checkmark confirmations, and specific remediation error messages.",
    tags: ["ux_design","forms","validation","error-handling","usability"],
    transform: createStandardSkillTransform({
      sectionName: "Inline Form Validation Protocol",
      ruSectionName: "Протокол инлайн-валидации форм и сообщений об ошибках",
      instructions: [
        "Validate inputs on blur or delayed debounce, never shouting errors while the user is actively typing.",
        "Display clear positive validation confirmations (subtle green checkmarks) for complex requirements (e.g. passwords).",
        "Place specific, human error messages directly beneath the failing input field.",
        "Never clear user-entered valid input data when a form submission encounters a server-side error."
],
      ruInstructions: [
        "Проверяйте поля по событию потери фокуса (onBlur) или с задержкой (debounce), не выдавая ошибку в момент ввода.",
        "Показывайте понятные маркеры успешного заполнения (зеленая галочка) для сложных правил (пароли, email).",
        "Размещайте текст ошибки строго под проблемным полем ввода с понятным советом, как ее исправить.",
        "Никогда не сбрасывайте уже введенные корректные данные формы при ошибке отправки на сервере."
],
      semanticType: "process_directive",
      tags: ["ux_design","forms","validation","error-handling","usability"],
    }),
  },

  "dark-mode-color-tokens-contrast": {
    id: "dark-mode-color-tokens-contrast",
    name: "DarkModeColorTokensContrastSkill",
    displayName: "Semantic Dark Mode Theming & Elevation Hierarchy",
    categoryId: "ux_design",
    description: "Architects balanced dark mode interfaces using dark grays (#121212) rather than pure black, establishing visual elevation through surface lightening.",
    tags: ["ux_design","dark-mode","theming","color-palette","elevation","contrast"],
    transform: createStandardSkillTransform({
      sectionName: "Dark Mode Architecture Protocol",
      ruSectionName: "Протокол проектирования темной темы (Dark Mode & Elevation Tokens)",
      instructions: [
        "Avoid pure pitch black (#000000) for base backgrounds; use rich dark charcoal (#121212 or #0f172a) to prevent eye strain.",
        "Express depth and elevation by lightening surface layers progressively (Surface 0 -> Surface 1 -> Surface 2).",
        "Desaturate vibrant accent colors slightly in dark mode to prevent visual vibration and glare.",
        "Verify 100% WCAG AA contrast compliance across all text and icon tokens in both light and dark themes."
],
      ruInstructions: [
        "Избегайте глухого черного цвета (#000000) для основного фона; используйте мягкие темно-серые тона (#121212, #0f172a).",
        "Передавайте глубину и возвышение слоев постепенным осветлением фона карточек и модальных окон (Elevation).",
        "Снижайте насыщенность ярких акцентных цветов в темной теме для предотвращения ряби в глазах.",
        "Контролируйте контрастность текста и иконок по стандарту WCAG AA как в светлом, так и в темном режиме."
],
      semanticType: "structural_directive",
      tags: ["ux_design","dark-mode","theming","color-palette","elevation","contrast"],
    }),
  },

  "search-autocomplete-instant-results": {
    id: "search-autocomplete-instant-results",
    name: "SearchAutocompleteInstantResultsSkill",
    displayName: "Command Palette (Cmd+K) & Instant Search Autocomplete",
    categoryId: "ux_design",
    description: "Designs keyboard-driven global command palettes (Cmd+K) with categorized instant results, fuzzy matching, keyboard navigation, and recent search history.",
    tags: ["ux_design","command-palette","search","autocomplete","keyboard-navigation"],
    transform: createStandardSkillTransform({
      sectionName: "Command Palette (Cmd+K) Protocol",
      ruSectionName: "Спецификация командной строки и поиска Cmd+K (Command Palette)",
      instructions: [
        "Bind universal keyboard shortcut `Cmd+K` / `Ctrl+K` to launch a centralized search modal overlay.",
        "Categorize results dynamically: Recent Searches, Quick Actions, Navigation Links, Data Entities.",
        "Support full arrow-key keyboard navigation and `Enter` selection with highlighted active focus rings.",
        "Implement fuzzy matching that forgives minor typos and highlights matched character substrings."
],
      ruInstructions: [
        "Назначайте глобальное сочетание клавиш `Cmd+K` / `Ctrl+K` для открытия поискового оверлея.",
        "Группируйте результаты по категориям: Недавние поиски, Быстрые действия, Разделы меню, Записи данных.",
        "Обеспечивайте полную навигацию стрелками с клавиатуры и выбор клавишей `Enter` с визуальной подсветкой.",
        "Используйте нечеткий поиск (Fuzzy Match), прощающий опечатки и подсвечивающий совпавшие буквы."
],
      semanticType: "structural_directive",
      tags: ["ux_design","command-palette","search","autocomplete","keyboard-navigation"],
    }),
  },

  "mobile-navigation-bottom-sheet-drawer": {
    id: "mobile-navigation-bottom-sheet-drawer",
    name: "MobileNavigationBottomSheetDrawerSkill",
    displayName: "Mobile Swipeable Bottom Sheet & Navigation Drawer",
    categoryId: "ux_design",
    description: "Designs mobile interaction drawers and swipeable bottom sheets with touch gesture dragging, velocity snaps, and backdrop blur.",
    tags: ["ux_design","mobile","bottom-sheet","gestures","drawers","touch"],
    transform: createStandardSkillTransform({
      sectionName: "Mobile Bottom Sheet Protocol",
      ruSectionName: "Спецификация мобильной шторки и жестов (Swipeable Bottom Sheet)",
      instructions: [
        "Anchor contextual mobile menus as bottom sheets rising from the bottom edge within the thumb zone.",
        "Support touch dragging gestures with velocity-based snapping to half-expanded and fully-expanded states.",
        "Incorporate a subtle grab-handle visual affordance at the top of the sheet.",
        "Dismiss sheet smoothly on backdrop tap or downward swipe gestures."
],
      ruInstructions: [
        "Размещайте контекстные мобильные меню в виде шторок (Bottom Sheets), поднимающихся из нижней границы экрана.",
        "Поддерживайте управление жестом свайпа с прилипанием к промежуточным и полноэкранным состояниям.",
        "Добавляйте визуальный маркер захвата (Grab Handle) по центру верхней части шторки.",
        "Обеспечивайте плавное закрытие шторки при свайпе вниз или тапе по затемненному фону."
],
      semanticType: "structural_directive",
      tags: ["ux_design","mobile","bottom-sheet","gestures","drawers","touch"],
    }),
  },

  "data-table-sorting-filtering-pagination": {
    id: "data-table-sorting-filtering-pagination",
    name: "DataTableSortingFilteringPaginationSkill",
    displayName: "Enterprise Data Table Architecture (Sort / Filter / Pin)",
    categoryId: "ux_design",
    description: "Architects high-density enterprise data tables with column sorting, multi-attribute filtering chips, pinned sticky columns, and bulk batch actions.",
    tags: ["ux_design","data-tables","enterprise-ux","sorting","filtering","pagination"],
    transform: createStandardSkillTransform({
      sectionName: "Enterprise Data Table Protocol",
      ruSectionName: "Спецификация корпоративных таблиц данных (Data Table Architecture)",
      instructions: [
        "Pin the header row and critical identification columns (e.g. Name/ID) during horizontal/vertical scrolling.",
        "Provide clear three-state column sorting indicators (Ascending, Descending, Unsorted).",
        "Support filter chips showing active query parameters with 1-click removal tags.",
        "Reveal floating batch action toolbars automatically when multiple row checkboxes are selected."
],
      ruInstructions: [
        "Закрепляйте строку заголовков и ключевую колонку идентификатора при горизонтальном и вертикальном скролле.",
        "Оснащайте колонки понятной трехпозиционной сортировкой (По возрастанию, По убыванию, Без сортировки).",
        "Отображайте активные фильтры в виде компактных тегов (Chips) с возможностью быстрого удаления в один клик.",
        "Показывайте плавающую панель массовых действий при выборе нескольких чекбоксов строк."
],
      semanticType: "structural_directive",
      tags: ["ux_design","data-tables","enterprise-ux","sorting","filtering","pagination"],
    }),
  },

  "accessibility-focus-trap-modal-dialog": {
    id: "accessibility-focus-trap-modal-dialog",
    name: "AccessibilityFocusTrapModalDialogSkill",
    displayName: "Accessible Modal Dialog & Keyboard Focus Trap",
    categoryId: "ux_design",
    description: "Enforces WCAG-compliant modal dialog mechanics: trapping Tab focus within the modal, dismissing on Escape key, and restoring focus to trigger upon close.",
    tags: ["ux_design","accessibility","modal","focus-trap","wcag","keyboard-nav"],
    transform: createStandardSkillTransform({
      sectionName: "Accessible Modal Focus Protocol",
      ruSectionName: "Протокол доступности модальных окон и ловушки фокуса (Focus Trap)",
      instructions: [
        "Trap keyboard Tab navigation strictly inside active modal container while open.",
        "Focus the first interactive element or close button automatically upon modal mount.",
        "Dismiss modal unconditionally upon pressing the `Escape` key.",
        "Restore keyboard focus to the triggering element immediately upon modal close."
],
      ruInstructions: [
        "Удерживайте фокус навигации клавишей Tab строго внутри активного модального окна.",
        "Автоматически переводите фокус на первый элемент ввода или кнопку закрытия при открытии окна.",
        "Обеспечивайте закрытие модального окна по нажатию клавиши `Escape`.",
        "Возвращайте фокус на вызвавший элемент интерфейса сразу после закрытия диалога."
],
      semanticType: "process_directive",
      tags: ["ux_design","accessibility","modal","focus-trap","wcag","keyboard-nav"],
    }),
  },

  "wizard-stepper-progress-indicator": {
    id: "wizard-stepper-progress-indicator",
    name: "WizardStepperProgressIndicatorSkill",
    displayName: "Multi-Step Wizard Stepper & Progress Navigation",
    categoryId: "ux_design",
    description: "Structures multi-step setup workflows into visual steppers: Completed steps (green checkmark), Active step (numbered pulse), Upcoming steps (dimmed).",
    tags: ["ux_design","stepper","wizard","progress-indicator","multi-step-form"],
    transform: createStandardSkillTransform({
      sectionName: "Multi-Step Stepper Protocol",
      ruSectionName: "Спецификация пошагового визарда и индикатора прогресса (Stepper)",
      instructions: [
        "Display a clear linear progress stepper across the top of multi-screen wizards.",
        "Visually distinguish: Completed Steps (green checkmark), Active Step (prominent color), Upcoming Steps (muted).",
        "Allow users to click back to previously completed steps to review or edit answers.",
        "Auto-save step state so progress is never lost if the user accidentally navigates away."
],
      ruInstructions: [
        "Размещайте наглядный линейный индикатор шагов в верхней части многостраничных форм.",
        "Визуально разделяйте: Пройденные шаги (галочка), Текущий шаг (акцентный цвет), Будущие шаги (приглушенный тон).",
        "Позволяйте пользователю возвращаться к пройденным шагам для просмотра и редактирования ответов.",
        "Автоматически сохраняйте прогресс, чтобы данные не терялись при случайном закрытии страницы."
],
      semanticType: "structural_directive",
      tags: ["ux_design","stepper","wizard","progress-indicator","multi-step-form"],
    }),
  },

  "card-sorting-information-architecture": {
    id: "card-sorting-information-architecture",
    name: "CardSortingInformationArchitectureSkill",
    displayName: "Card Sorting & Navigational Taxonomy Architecture",
    categoryId: "ux_design",
    description: "Synthesizes open/closed card sorting research data to organize intuitive, user-validated website navigation trees and category hierarchies.",
    tags: ["ux_design","card-sorting","information-architecture","taxonomy","navigation"],
    transform: createStandardSkillTransform({
      sectionName: "Card Sorting Taxonomy Protocol",
      ruSectionName: "Протокол информационной архитектуры и карточной сортировки (Card Sorting)",
      instructions: [
        "Derive navigation categories from empirical user mental models rather than internal corporate org charts.",
        "Group related functions into cohesive, recognizable parent menus limited to 5-7 top-level items.",
        "Eliminate ambiguous, overlapping category labels (e.g. \"Tools\" vs \"Resources\").",
        "Verify that 90% of test users can locate key target pages within 3 logical clicks."
],
      ruInstructions: [
        "Формируйте структуру меню на основе ментальных моделей пользователей, а не структуры отделов компании.",
        "Группируйте функции в понятные родительские разделы, ограничивая главное меню 5-7 пунктами.",
        "Устраняйте двусмысленные и пересекающиеся названия категорий (\"Инструменты\" и \"Ресурсы\").",
        "Проверяйте, чтобы 90% пользователей находили целевую страницу не более чем за 3 клика."
],
      semanticType: "process_directive",
      tags: ["ux_design","card-sorting","information-architecture","taxonomy","navigation"],
    }),
  },

  "dashboard-widget-card-grid-layout": {
    id: "dashboard-widget-card-grid-layout",
    name: "DashboardWidgetCardGridLayoutSkill",
    displayName: "Modular Dashboard Widget Card Grid Architecture",
    categoryId: "ux_design",
    description: "Architects executive analytics dashboards using responsive CSS Grid card widgets: KPI Metric Cards, Trend Line Charts, Breakdown Donut Charts, and Activity Feeds.",
    tags: ["ux_design","dashboards","widgets","css-grid","analytics-ui"],
    transform: createStandardSkillTransform({
      sectionName: "Dashboard Widget Grid Protocol",
      ruSectionName: "Спецификация модульной сетки аналитического дашборда (Widget Grid)",
      instructions: [
        "Structure the dashboard using a 12-column responsive CSS Grid system with uniform 16px/24px gutters.",
        "Place top-line summary KPI metric cards across the top row with sparklines and period delta badges.",
        "Ensure cards maintain consistent visual hierarchy: Header, Primary Metric, Secondary Delta, Action Menu.",
        "Support responsive rearrangement on smaller viewports down to single-column card stacks."
],
      ruInstructions: [
        "Стройте дашборд на 12-колоночной сетке CSS Grid с равномерными отступами 16px/24px между виджетами.",
        "Размещайте ключевые сводные карточки KPI в верхнем ряду со спарклайнами и бейджами динамики.",
        "Выдерживайте единую иерархию внутри карточек: Заголовок, Главный показатель, Изменение, Меню.",
        "Обеспечивайте адаптивную перестройку сетки на мобильных устройствах в одну вертикальную колонку."
],
      semanticType: "structural_directive",
      tags: ["ux_design","dashboards","widgets","css-grid","analytics-ui"],
    }),
  },

  "user-journey-dropoff-funnel-optimizer": {
    id: "user-journey-dropoff-funnel-optimizer",
    name: "UserJourneyDropoffFunnelOptimizerSkill",
    displayName: "Conversion Funnel Friction & Drop-Off Optimizer",
    categoryId: "ux_design",
    description: "Audits multi-step conversion funnels to pinpoint friction points, unexpected form fields, and hidden anxieties causing user abandonment.",
    tags: ["ux_design","conversion-funnel","drop-off","cro","friction-reduction"],
    transform: createStandardSkillTransform({
      sectionName: "Conversion Funnel Optimization Protocol",
      ruSectionName: "Протокол аудита и оптимизации воронки конверсии (Funnel Friction Audit)",
      instructions: [
        "Map step-by-step conversion drop-off percentages from landing page to completed transaction.",
        "Identify and eliminate unnecessary form fields (e.g. phone number requirements during initial signup).",
        "Address user anxieties with contextual trust badges (security encryption, money-back guarantees).",
        "Streamline checkout to a single guest checkout flow to minimize abandonment."
],
      ruInstructions: [
        "Стройте карту конверсии с указанием процента отсева на каждом шаге от входа до покупки.",
        "Находите и удаляйте лишние поля форм (например, обязательный телефон при первой регистрации).",
        "Снимайте опасения клиентов контекстными элементами доверия (шифрование, гарантия возврата).",
        "Упрощайте оформление заказа до быстрого гостевого чекаута для минимизации брошенных корзин."
],
      semanticType: "process_directive",
      tags: ["ux_design","conversion-funnel","drop-off","cro","friction-reduction"],
    }),
  },

  "toast-notification-snack-bar-manager": {
    id: "toast-notification-snack-bar-manager",
    name: "ToastNotificationSnackBarManagerSkill",
    displayName: "Non-Intrusive Toast & Snack-bar Notification Manager",
    categoryId: "ux_design",
    description: "Designs non-blocking toast notifications with status icons (Success, Error, Info), automatic 4-second dismiss timers, and 1-click \"Undo\" action links.",
    tags: ["ux_design","toasts","notifications","snackbars","feedback"],
    transform: createStandardSkillTransform({
      sectionName: "Toast Notification Protocol",
      ruSectionName: "Спецификация всплывающих уведомлений (Toast & SnackBar Manager)",
      instructions: [
        "Position toasts in non-critical screen regions (e.g. bottom-right desktop, top-center mobile).",
        "Auto-dismiss informational and success toasts after 4 seconds; keep critical error toasts persistent until dismissed.",
        "Include an immediate \"Undo\" action link inside destructive notification toasts (e.g. \"Item Deleted • Undo\").",
        "Limit stacked toasts to maximum 3 simultaneous notifications to prevent viewport inundation."
],
      ruInstructions: [
        "Размещайте уведомления в безопасных зонах (правый нижний угол на десктопе, сверху по центру на мобильных).",
        "Автоматически скрывайте информационные уведомления через 4 секунды; ошибки оставляйте до ручного закрытия.",
        "Включайте кнопку быстрой отмены (\"Отменить\") в уведомления об удалении или перемещении объектов.",
        "Ограничивайте стек уведомлений максимум 3 сообщениями одновременно для защиты от загромождения экрана."
],
      semanticType: "structural_directive",
      tags: ["ux_design","toasts","notifications","snackbars","feedback"],
    }),
  },

  "tooltip-micro-guidance-explainer": {
    id: "tooltip-micro-guidance-explainer",
    name: "TooltipMicroGuidanceExplainerSkill",
    displayName: "Contextual Tooltip & Micro-Guidance Explainer",
    categoryId: "ux_design",
    description: "Designs non-intrusive contextual hover tooltips and info icons that clarify complex industry metrics without cluttering core UI layouts.",
    tags: ["ux_design","tooltips","micro-guidance","ui-hints","onboarding"],
    transform: createStandardSkillTransform({
      sectionName: "Contextual Tooltip Protocol",
      ruSectionName: "Спецификация контекстных подсказок (Tooltip Micro-Guidance)",
      instructions: [
        "Trigger tooltips with a deliberate 200ms delay on hover to prevent accidental flashing during casual cursor movement.",
        "Keep tooltip copy concise and punchy (under 25 words).",
        "Support keyboard focus triggers (`focus-visible`) and screen-reader `aria-describedby` associations.",
        "Ensure tooltips flip dynamically to remain fully within viewport boundaries."
],
      ruInstructions: [
        "Отображайте подсказки с задержкой в 200 мс при наведении курсора для предотвращения мелькания при движении мыши.",
        "Формулируйте текст подсказки емко и по делу (в пределах 25 слов).",
        "Обеспечивайте открытие подсказок при фокусе с клавиатуры и привязку через атрибут `aria-describedby`.",
        "Настраивайте автоматическое позиционирование (Flip), чтобы тултип не выходил за границы экрана."
],
      semanticType: "structural_directive",
      tags: ["ux_design","tooltips","micro-guidance","ui-hints","onboarding"],
    }),
  },

  "drag-and-drop-kanban-board-physics": {
    id: "drag-and-drop-kanban-board-physics",
    name: "DragAndDropKanbanBoardPhysicsSkill",
    displayName: "Drag-and-Drop Card Physics & Visual Placement Affordance",
    categoryId: "ux_design",
    description: "Designs intuitive drag-and-drop interactions (Kanban boards, list reordering) with drop-indicator placeholders, card lift shadows, and keyboard reordering.",
    tags: ["ux_design","drag-and-drop","kanban","interaction-design","affordances"],
    transform: createStandardSkillTransform({
      sectionName: "Drag-and-Drop Interaction Protocol",
      ruSectionName: "Протокол взаимодействия Drag-and-Drop (Kanban & Reordering Physics)",
      instructions: [
        "Elevate dragged cards with an enlarged drop-shadow and subtle tilt angle (2-4 degrees) to signify lift.",
        "Render a distinct placeholder slot showing exactly where the item will land before release.",
        "Provide keyboard reordering alternatives (`Space` to grab, `Arrows` to move, `Space` to drop) for full accessibility.",
        "Animate neighboring list items with smooth layout transitions when creating space for the dragged item."
],
      ruInstructions: [
        "Приподнимайте перетаскиваемую карточку увеличением тени и легким наклоном (2-4 градуса) для наглядности захвата.",
        "Отображайте пунктирную рамку-заглушку в месте будущего приземления карточки до отпускания мыши.",
        "Реализуйте клавиатурное перемещение (Пробел для захвата, Стрелки для сдвига, Пробел для фиксации).",
        "Плавно анимируйте сдвиг соседних элементов списка, освобождающих место под перемещаемый объект."
],
      semanticType: "process_directive",
      tags: ["ux_design","drag-and-drop","kanban","interaction-design","affordances"],
    }),
  },

  "user-persona-scenario-empathy-map": {
    id: "user-persona-scenario-empathy-map",
    name: "UserPersonaScenarioEmpathyMapSkill",
    displayName: "User Persona Empathy Map & Goal Scenario Matrix",
    categoryId: "ux_design",
    description: "Structures actionable user personas using Empathy Maps (Says, Thinks, Does, Feels) paired with real-world task scenarios, motivations, and blockers.",
    tags: ["ux_design","personas","empathy-map","user-research","scenarios"],
    transform: createStandardSkillTransform({
      sectionName: "User Persona & Empathy Map Protocol",
      ruSectionName: "Спецификация карты эмпатии и пользовательских персон (Empathy Mapping)",
      instructions: [
        "Anchor persona profiles in empirical qualitative data rather than fictional demographic stereotypes.",
        "Structure the Empathy Map across 4 quadrants: What the user Says, Thinks, Does, and Feels.",
        "Document primary functional goals, technical comfort level, and acute emotional anxieties.",
        "Formulate concrete day-in-the-life user task scenarios to guide feature prioritization."
],
      ruInstructions: [
        "Опирайтесь на реальные качественные данные исследований, а не на вымышленные стереотипы.",
        "Структурируйте карту эмпатии по 4 квадрантам: Что пользователь Говорит, Думает, Делает и Чувствует.",
        "Фиксируйте главные рабочие цели, уровень технической грамотности и ключевые страхи клиента.",
        "Описывайте жизненные сценарии решения задач для обоснования продуктовых решений."
],
      semanticType: "process_directive",
      tags: ["ux_design","personas","empathy-map","user-research","scenarios"],
    }),
  },
  "ux-design-fitts-law-hick-law-interactive-target-optimization": {
    id: "ux-design-fitts-law-hick-law-interactive-target-optimization",
    name: "FittsLawHickLawInteractiveTargetOptimizationSkill",
    displayName: "Fitts Law & Hick Law Interactive Target Optimization",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Fitts Law & Hick Law Interactive Target Optimization.",
    tags: ["uxDesign","design","fitts","law"],
    transform: createStandardSkillTransform({
      sectionName: "Fitts & Hicks Law Usability Standards",
      ruSectionName: "Стандарты и практические требования: Fitts Law & Hick Law Interactive Target Optimization",
      instructions: [
        "Apply core domain tenets and industry best practices for Fitts Law & Hick Law Interactive Target Optimization.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Fitts Law & Hick Law Interactive Target Optimization.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","fitts","law"],
    }),
  },

  "ux-design-wcag-2-2-aaa-accessible-color-contrast-screen-reader": {
    id: "ux-design-wcag-2-2-aaa-accessible-color-contrast-screen-reader",
    name: "WCAG22AAAAccessibleColorContrastScreenReaderSkill",
    displayName: "WCAG 2.2 AAA Accessible Color Contrast & Screen Reader",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for WCAG 2.2 AAA Accessible Color Contrast & Screen Reader.",
    tags: ["uxDesign","design","wcag","2"],
    transform: createStandardSkillTransform({
      sectionName: "WCAG AAA Accessibility Standards",
      ruSectionName: "Стандарты и практические требования: WCAG 2.2 AAA Accessible Color Contrast & Screen Reader",
      instructions: [
        "Apply core domain tenets and industry best practices for WCAG 2.2 AAA Accessible Color Contrast & Screen Reader.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для WCAG 2.2 AAA Accessible Color Contrast & Screen Reader.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","wcag","2"],
    }),
  },

  "ux-design-design-system-atomic-design-tokens-figma-to-code": {
    id: "ux-design-design-system-atomic-design-tokens-figma-to-code",
    name: "DesignSystemAtomicDesignTokensFigmatoCodeSkill",
    displayName: "Design System Atomic Design Tokens (Figma-to-Code)",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Design System Atomic Design Tokens (Figma-to-Code).",
    tags: ["uxDesign","design","design","system"],
    transform: createStandardSkillTransform({
      sectionName: "Atomic Design Tokens Architecture",
      ruSectionName: "Стандарты и практические требования: Design System Atomic Design Tokens (Figma-to-Code)",
      instructions: [
        "Apply core domain tenets and industry best practices for Design System Atomic Design Tokens (Figma-to-Code).",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Design System Atomic Design Tokens (Figma-to-Code).",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","design","system"],
    }),
  },

  "ux-design-mobile-touch-target-48px-minimum-hit-area": {
    id: "ux-design-mobile-touch-target-48px-minimum-hit-area",
    name: "MobileTouchTarget48pxMinimumHitAreaSkill",
    displayName: "Mobile Touch Target 48px Minimum Hit Area",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Mobile Touch Target 48px Minimum Hit Area.",
    tags: ["uxDesign","design","mobile","touch"],
    transform: createStandardSkillTransform({
      sectionName: "Mobile Touch Hit Area Standards",
      ruSectionName: "Стандарты и практические требования: Mobile Touch Target 48px Minimum Hit Area",
      instructions: [
        "Apply core domain tenets and industry best practices for Mobile Touch Target 48px Minimum Hit Area.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Mobile Touch Target 48px Minimum Hit Area.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","mobile","touch"],
    }),
  },

  "ux-design-card-sorting-information-architecture-sitemap": {
    id: "ux-design-card-sorting-information-architecture-sitemap",
    name: "CardSortingInformationArchitectureSitemapSkill",
    displayName: "Card Sorting Information Architecture Sitemap",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Card Sorting Information Architecture Sitemap.",
    tags: ["uxDesign","design","card","sorting"],
    transform: createStandardSkillTransform({
      sectionName: "Card Sorting Information Architecture",
      ruSectionName: "Стандарты и практические требования: Card Sorting Information Architecture Sitemap",
      instructions: [
        "Apply core domain tenets and industry best practices for Card Sorting Information Architecture Sitemap.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Card Sorting Information Architecture Sitemap.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","card","sorting"],
    }),
  },

  "ux-design-progressive-disclosure-multi-step-wizard-ux": {
    id: "ux-design-progressive-disclosure-multi-step-wizard-ux",
    name: "ProgressiveDisclosureMultiStepWizardUXSkill",
    displayName: "Progressive Disclosure Multi-Step Wizard UX",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Progressive Disclosure Multi-Step Wizard UX.",
    tags: ["uxDesign","design","progressive","disclosure"],
    transform: createStandardSkillTransform({
      sectionName: "Progressive Disclosure Wizard Standards",
      ruSectionName: "Стандарты и практические требования: Progressive Disclosure Multi-Step Wizard UX",
      instructions: [
        "Apply core domain tenets and industry best practices for Progressive Disclosure Multi-Step Wizard UX.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Progressive Disclosure Multi-Step Wizard UX.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","progressive","disclosure"],
    }),
  },

  "ux-design-dark-mode-visual-hierarchy-oled-contrast-rules": {
    id: "ux-design-dark-mode-visual-hierarchy-oled-contrast-rules",
    name: "DarkModeVisualHierarchyOledContrastRulesSkill",
    displayName: "Dark Mode Visual Hierarchy & Oled Contrast Rules",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Dark Mode Visual Hierarchy & Oled Contrast Rules.",
    tags: ["uxDesign","design","dark","mode"],
    transform: createStandardSkillTransform({
      sectionName: "Dark Mode Hierarchy & Contrast Rules",
      ruSectionName: "Стандарты и практические требования: Dark Mode Visual Hierarchy & Oled Contrast Rules",
      instructions: [
        "Apply core domain tenets and industry best practices for Dark Mode Visual Hierarchy & Oled Contrast Rules.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Dark Mode Visual Hierarchy & Oled Contrast Rules.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","dark","mode"],
    }),
  },

  "ux-design-skeleton-loader-ui-perceived-performance": {
    id: "ux-design-skeleton-loader-ui-perceived-performance",
    name: "SkeletonLoaderUIPerceivedPerformanceSkill",
    displayName: "Skeleton Loader UI Perceived Performance",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Skeleton Loader UI Perceived Performance.",
    tags: ["uxDesign","design","skeleton","loader"],
    transform: createStandardSkillTransform({
      sectionName: "Skeleton Loader UX Standards",
      ruSectionName: "Стандарты и практические требования: Skeleton Loader UI Perceived Performance",
      instructions: [
        "Apply core domain tenets and industry best practices for Skeleton Loader UI Perceived Performance.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Skeleton Loader UI Perceived Performance.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","skeleton","loader"],
    }),
  },

  "ux-design-responsive-typography-fluid-clamp-scale": {
    id: "ux-design-responsive-typography-fluid-clamp-scale",
    name: "ResponsiveTypographyFluidClampScaleSkill",
    displayName: "Responsive Typography Fluid Clamp() Scale",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Responsive Typography Fluid Clamp() Scale.",
    tags: ["uxDesign","design","responsive","typography"],
    transform: createStandardSkillTransform({
      sectionName: "Fluid Typography Clamp Standards",
      ruSectionName: "Стандарты и практические требования: Responsive Typography Fluid Clamp() Scale",
      instructions: [
        "Apply core domain tenets and industry best practices for Responsive Typography Fluid Clamp() Scale.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Responsive Typography Fluid Clamp() Scale.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","responsive","typography"],
    }),
  },

  "ux-design-interactive-micro-animations-200ms-spring-physics": {
    id: "ux-design-interactive-micro-animations-200ms-spring-physics",
    name: "InteractiveMicroAnimations200msSpringPhysicsSkill",
    displayName: "Interactive Micro-Animations 200ms Spring Physics",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Interactive Micro-Animations 200ms Spring Physics.",
    tags: ["uxDesign","design","interactive","micro"],
    transform: createStandardSkillTransform({
      sectionName: "Micro-Animation Physics Standards",
      ruSectionName: "Стандарты и практические требования: Interactive Micro-Animations 200ms Spring Physics",
      instructions: [
        "Apply core domain tenets and industry best practices for Interactive Micro-Animations 200ms Spring Physics.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Interactive Micro-Animations 200ms Spring Physics.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","interactive","micro"],
    }),
  },

  "ux-design-user-onboarding-checklist-progress-gamification": {
    id: "ux-design-user-onboarding-checklist-progress-gamification",
    name: "UserOnboardingChecklistProgressGamificationSkill",
    displayName: "User Onboarding Checklist Progress Gamification",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for User Onboarding Checklist Progress Gamification.",
    tags: ["uxDesign","design","user","onboarding"],
    transform: createStandardSkillTransform({
      sectionName: "Gamified Onboarding Checklist UX",
      ruSectionName: "Стандарты и практические требования: User Onboarding Checklist Progress Gamification",
      instructions: [
        "Apply core domain tenets and industry best practices for User Onboarding Checklist Progress Gamification.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для User Onboarding Checklist Progress Gamification.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","user","onboarding"],
    }),
  },

  "ux-design-zero-state-empty-state-cta-activation": {
    id: "ux-design-zero-state-empty-state-cta-activation",
    name: "ZeroStateEmptyStateCTAActivationSkill",
    displayName: "Zero-State Empty State CTA Activation",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Zero-State Empty State CTA Activation.",
    tags: ["uxDesign","design","zero","state"],
    transform: createStandardSkillTransform({
      sectionName: "Empty State CTA Standards",
      ruSectionName: "Стандарты и практические требования: Zero-State Empty State CTA Activation",
      instructions: [
        "Apply core domain tenets and industry best practices for Zero-State Empty State CTA Activation.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Zero-State Empty State CTA Activation.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","zero","state"],
    }),
  },

  "ux-design-form-validation-inline-instant-feedback-error-assist": {
    id: "ux-design-form-validation-inline-instant-feedback-error-assist",
    name: "FormValidationInlineInstantFeedbackErrorAssistSkill",
    displayName: "Form Validation Inline Instant Feedback & Error Assist",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Form Validation Inline Instant Feedback & Error Assist.",
    tags: ["uxDesign","design","form","validation"],
    transform: createStandardSkillTransform({
      sectionName: "Inline Form Validation Standards",
      ruSectionName: "Стандарты и практические требования: Form Validation Inline Instant Feedback & Error Assist",
      instructions: [
        "Apply core domain tenets and industry best practices for Form Validation Inline Instant Feedback & Error Assist.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Form Validation Inline Instant Feedback & Error Assist.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","form","validation"],
    }),
  },

  "ux-design-breadcrumb-navigation-nested-category-wayfinding": {
    id: "ux-design-breadcrumb-navigation-nested-category-wayfinding",
    name: "BreadcrumbNavigationNestedCategoryWayfindingSkill",
    displayName: "Breadcrumb Navigation & Nested Category Wayfinding",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Breadcrumb Navigation & Nested Category Wayfinding.",
    tags: ["uxDesign","design","breadcrumb","navigation"],
    transform: createStandardSkillTransform({
      sectionName: "Breadcrumb Wayfinding Standards",
      ruSectionName: "Стандарты и практические требования: Breadcrumb Navigation & Nested Category Wayfinding",
      instructions: [
        "Apply core domain tenets and industry best practices for Breadcrumb Navigation & Nested Category Wayfinding.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Breadcrumb Navigation & Nested Category Wayfinding.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","breadcrumb","navigation"],
    }),
  },

  "ux-design-infinite-scroll-vs-pagination-virtualized-list": {
    id: "ux-design-infinite-scroll-vs-pagination-virtualized-list",
    name: "InfiniteScrollvsPaginationVirtualizedListSkill",
    displayName: "Infinite Scroll vs Pagination Virtualized List",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Infinite Scroll vs Pagination Virtualized List.",
    tags: ["uxDesign","design","infinite","scroll"],
    transform: createStandardSkillTransform({
      sectionName: "Virtualized List UX Standards",
      ruSectionName: "Стандарты и практические требования: Infinite Scroll vs Pagination Virtualized List",
      instructions: [
        "Apply core domain tenets and industry best practices for Infinite Scroll vs Pagination Virtualized List.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Infinite Scroll vs Pagination Virtualized List.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","infinite","scroll"],
    }),
  },

  "ux-design-bottom-navigation-bar-thumb-zone-usability": {
    id: "ux-design-bottom-navigation-bar-thumb-zone-usability",
    name: "BottomNavigationBarThumbZoneUsabilitySkill",
    displayName: "Bottom Navigation Bar Thumb-Zone Usability",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Bottom Navigation Bar Thumb-Zone Usability.",
    tags: ["uxDesign","design","bottom","navigation"],
    transform: createStandardSkillTransform({
      sectionName: "Thumb-Zone Mobile Usability Standards",
      ruSectionName: "Стандарты и практические требования: Bottom Navigation Bar Thumb-Zone Usability",
      instructions: [
        "Apply core domain tenets and industry best practices for Bottom Navigation Bar Thumb-Zone Usability.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Bottom Navigation Bar Thumb-Zone Usability.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","bottom","navigation"],
    }),
  },

  "ux-design-drag-and-drop-kanban-board-reorder-affordance": {
    id: "ux-design-drag-and-drop-kanban-board-reorder-affordance",
    name: "DragandDropKanbanBoardReorderAffordanceSkill",
    displayName: "Drag-and-Drop Kanban Board Reorder Affordance",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Drag-and-Drop Kanban Board Reorder Affordance.",
    tags: ["uxDesign","design","drag","and"],
    transform: createStandardSkillTransform({
      sectionName: "Drag-and-Drop Affordance Standards",
      ruSectionName: "Стандарты и практические требования: Drag-and-Drop Kanban Board Reorder Affordance",
      instructions: [
        "Apply core domain tenets and industry best practices for Drag-and-Drop Kanban Board Reorder Affordance.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Drag-and-Drop Kanban Board Reorder Affordance.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","drag","and"],
    }),
  },

  "ux-design-modal-dialog-vs-drawer-vs-toast-placement-matrix": {
    id: "ux-design-modal-dialog-vs-drawer-vs-toast-placement-matrix",
    name: "ModalDialogvsDrawervsToastPlacementMatrixSkill",
    displayName: "Modal Dialog vs Drawer vs Toast Placement Matrix",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Modal Dialog vs Drawer vs Toast Placement Matrix.",
    tags: ["uxDesign","design","modal","dialog"],
    transform: createStandardSkillTransform({
      sectionName: "Overlay & Toast UX Matrix Standards",
      ruSectionName: "Стандарты и практические требования: Modal Dialog vs Drawer vs Toast Placement Matrix",
      instructions: [
        "Apply core domain tenets and industry best practices for Modal Dialog vs Drawer vs Toast Placement Matrix.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Modal Dialog vs Drawer vs Toast Placement Matrix.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","modal","dialog"],
    }),
  },

  "ux-design-search-auto-complete-fast-fuzzy-match-dropdown": {
    id: "ux-design-search-auto-complete-fast-fuzzy-match-dropdown",
    name: "SearchAutoCompleteFastFuzzyMatchDropdownSkill",
    displayName: "Search Auto-Complete Fast Fuzzy Match Dropdown",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Search Auto-Complete Fast Fuzzy Match Dropdown.",
    tags: ["uxDesign","design","search","auto"],
    transform: createStandardSkillTransform({
      sectionName: "Search Auto-Complete Dropdown Standards",
      ruSectionName: "Стандарты и практические требования: Search Auto-Complete Fast Fuzzy Match Dropdown",
      instructions: [
        "Apply core domain tenets and industry best practices for Search Auto-Complete Fast Fuzzy Match Dropdown.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Search Auto-Complete Fast Fuzzy Match Dropdown.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","search","auto"],
    }),
  },

  "ux-design-checkout-funnel-1-click-frictionless-payment-ux": {
    id: "ux-design-checkout-funnel-1-click-frictionless-payment-ux",
    name: "CheckoutFunnel1ClickFrictionlessPaymentUXSkill",
    displayName: "Checkout Funnel 1-Click Frictionless Payment UX",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Checkout Funnel 1-Click Frictionless Payment UX.",
    tags: ["uxDesign","design","checkout","funnel"],
    transform: createStandardSkillTransform({
      sectionName: "Frictionless Checkout UX Blueprint",
      ruSectionName: "Стандарты и практические требования: Checkout Funnel 1-Click Frictionless Payment UX",
      instructions: [
        "Apply core domain tenets and industry best practices for Checkout Funnel 1-Click Frictionless Payment UX.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Checkout Funnel 1-Click Frictionless Payment UX.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","checkout","funnel"],
    }),
  },

  "ux-design-user-persona-journey-empathy-mapping-canvas": {
    id: "ux-design-user-persona-journey-empathy-mapping-canvas",
    name: "UserPersonaJourneyEmpathyMappingCanvasSkill",
    displayName: "User Persona Journey Empathy Mapping Canvas",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for User Persona Journey Empathy Mapping Canvas.",
    tags: ["uxDesign","design","user","persona"],
    transform: createStandardSkillTransform({
      sectionName: "Journey Empathy Mapping Framework",
      ruSectionName: "Стандарты и практические требования: User Persona Journey Empathy Mapping Canvas",
      instructions: [
        "Apply core domain tenets and industry best practices for User Persona Journey Empathy Mapping Canvas.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для User Persona Journey Empathy Mapping Canvas.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","user","persona"],
    }),
  },

  "ux-design-usability-testing-rite-rapid-iterative-protocol": {
    id: "ux-design-usability-testing-rite-rapid-iterative-protocol",
    name: "UsabilityTestingRITERapidIterativeProtocolSkill",
    displayName: "Usability Testing RITE Rapid Iterative Protocol",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Usability Testing RITE Rapid Iterative Protocol.",
    tags: ["uxDesign","design","usability","testing"],
    transform: createStandardSkillTransform({
      sectionName: "RITE Usability Testing Protocol",
      ruSectionName: "Стандарты и практические требования: Usability Testing RITE Rapid Iterative Protocol",
      instructions: [
        "Apply core domain tenets and industry best practices for Usability Testing RITE Rapid Iterative Protocol.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Usability Testing RITE Rapid Iterative Protocol.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","usability","testing"],
    }),
  },

  "ux-design-heatmap-eye-tracking-f-shaped-reading-pattern": {
    id: "ux-design-heatmap-eye-tracking-f-shaped-reading-pattern",
    name: "HeatmapEyeTrackingFShapedReadingPatternSkill",
    displayName: "Heatmap & Eye-Tracking F-Shaped Reading Pattern",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Heatmap & Eye-Tracking F-Shaped Reading Pattern.",
    tags: ["uxDesign","design","heatmap","eye"],
    transform: createStandardSkillTransform({
      sectionName: "Heatmap F-Pattern Visual Hierarchy",
      ruSectionName: "Стандарты и практические требования: Heatmap & Eye-Tracking F-Shaped Reading Pattern",
      instructions: [
        "Apply core domain tenets and industry best practices for Heatmap & Eye-Tracking F-Shaped Reading Pattern.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Heatmap & Eye-Tracking F-Shaped Reading Pattern.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","heatmap","eye"],
    }),
  },

  "ux-design-heuristic-evaluation-nielsen-10-usability-principles": {
    id: "ux-design-heuristic-evaluation-nielsen-10-usability-principles",
    name: "HeuristicEvaluationNielsen10UsabilityPrinciplesSkill",
    displayName: "Heuristic Evaluation Nielsen 10 Usability Principles",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Heuristic Evaluation Nielsen 10 Usability Principles.",
    tags: ["uxDesign","design","heuristic","evaluation"],
    transform: createStandardSkillTransform({
      sectionName: "Nielsen 10 Heuristics Evaluation",
      ruSectionName: "Стандарты и практические требования: Heuristic Evaluation Nielsen 10 Usability Principles",
      instructions: [
        "Apply core domain tenets and industry best practices for Heuristic Evaluation Nielsen 10 Usability Principles.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Heuristic Evaluation Nielsen 10 Usability Principles.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","heuristic","evaluation"],
    }),
  },

  "ux-design-sticky-header-smooth-scrollspy-table-of-contents": {
    id: "ux-design-sticky-header-smooth-scrollspy-table-of-contents",
    name: "StickyHeaderSmoothScrollspyTableofContentsSkill",
    displayName: "Sticky Header Smooth Scrollspy Table of Contents",
    categoryId: "uxDesign",
    description: "Applies advanced industry standards, verified protocols, and domain best practices for Sticky Header Smooth Scrollspy Table of Contents.",
    tags: ["uxDesign","design","sticky","header"],
    transform: createStandardSkillTransform({
      sectionName: "Scrollspy Navigation UX Standards",
      ruSectionName: "Стандарты и практические требования: Sticky Header Smooth Scrollspy Table of Contents",
      instructions: [
        "Apply core domain tenets and industry best practices for Sticky Header Smooth Scrollspy Table of Contents.",
        "Structure workflows rigorously, minimizing friction and maximizing reliability.",
        "Validate outputs against standardized compliance and quality benchmarks."
],
      ruInstructions: [
        "Применяйте ключевые отраслевые стандарты и проверенные методы для Sticky Header Smooth Scrollspy Table of Contents.",
        "Структурируйте процесс с упором на надежность, измеримый результат и воспроизводимость.",
        "Проверяйте результаты на соответствие эталонным критериям качества."
],
      semanticType: "structural_directive",
      tags: ["uxDesign","design","sticky","header"],
    }),
  },
};
