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
};
