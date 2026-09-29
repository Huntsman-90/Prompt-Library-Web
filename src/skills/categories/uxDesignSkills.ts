import type { SkillDefinition } from '../skillHelper';
import {
  ensureSection,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  isRussianText,
} from '../skillHelper';

export const UX_DESIGN_SKILLS: Record<string, SkillDefinition> = {
  'user-persona-empathy': {
    id: 'user-persona-empathy',
    name: 'UserPersonaEmpathySkill',
    displayName: 'User Persona Empathy & JTBD Mapping',
    categoryId: 'ux_design',
    description: 'Profiles target user mental models, jobs-to-be-done (JTBD), and emotional pain points.',
    tags: ['ux_design', 'personas', 'jtbd', 'empathy', 'user-research'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Профиль Пользователя и JTBD (Jobs-To-Be-Done)',
        'User Persona & JTBD Empathy Mapping',
        [
          '- **Архетип пользователя**: Ключевая роль, техническая грамотность, рабочий контекст.',
          '- **Jobs-To-Be-Done**: «Когда я [ситуация], я хочу [действие], чтобы [результат]».',
          '- **Эмоциональные барьеры**: Страхи потери данных, раздражение от лишних кликов, когнитивная усталость.',
        ],
        [
          '- **Persona Archetype**: Primary role, digital literacy, and operational context.',
          '- **Jobs-To-Be-Done (JTBD)**: "When I [context], I want to [action], so that I can [desired outcome]".',
          '- **Emotional & Friction Vectors**: Anxiety over state loss, cognitive fatigue, and clicking resistance.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'usability-heuristic-audit': {
    id: 'usability-heuristic-audit',
    name: 'UsabilityHeuristicAuditSkill',
    displayName: 'Nielsen-Norman 10 Usability Heuristics Audit',
    categoryId: 'ux_design',
    description: 'Audits interfaces against the 10 classic Nielsen-Norman usability heuristics.',
    tags: ['ux_design', 'heuristics', 'nielsen', 'audit', 'usability'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Эвристический UX-Аудит (Nielsen Norman)',
        'Nielsen-Norman 10 Usability Heuristics Audit',
        [
          '1. **Видимость состояния системы**: Мгновенная индикация загрузки и успеха.',
          '2. **Совпадение с реальным миром**: Понятные термины и естественный порядок.',
          '3. **Свобода пользователя**: Очевидные кнопки отмены и шага назад (Undo/Redo).',
          '4. **Единообразие и стандарты**: Соответствие принятым дизайн-системам.',
          '5. **Предотвращение ошибок**: Подтверждение опасных действий до их совершения.',
        ],
        [
          '1. **Visibility of System Status**: Instant feedback on asynchronous operations and progress.',
          '2. **Match Between System and Real World**: Intuitive domain metaphors and language.',
          '3. **User Control and Freedom**: Clear exits and reversible states (Undo/Redo).',
          '4. **Consistency and Standards**: Strict adherence to platform design system conventions.',
          '5. **Error Prevention**: Proactive boundary checks before destructive state transitions.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'microcopy-ux-writing': {
    id: 'microcopy-ux-writing',
    name: 'MicrocopyUXWritingSkill',
    displayName: 'UX Microcopy & Action Affordances',
    categoryId: 'ux_design',
    description: 'Designs clear, reassuring microcopy, actionable button labels, and empathetic empty states.',
    tags: ['ux_design', 'microcopy', 'ux-writing', 'buttons', 'affordances'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Интерфейсный Микрокопирайтинг (UX Writing)',
        'UX Microcopy & Action Affordance Design',
        [
          '- Тексты кнопок должны начинаться с глагола действия («Сохранить изменения», «Создать проект»).',
          '- Сообщения об ошибках должны объяснять причину простым языком и давать кнопку мгновенного исправления.',
        ],
        [
          '- Button microcopy must open with an active verb ("Deploy Cluster", "Save Changes").',
          '- Error dialogs must explain the breakdown in plain language and provide a 1-click remediation path.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'accessibility-wcag-compliance': {
    id: 'accessibility-wcag-compliance',
    name: 'AccessibilityWCAGComplianceSkill',
    displayName: 'WCAG 2.1 AA Accessibility Compliance',
    categoryId: 'ux_design',
    description: 'Enforces contrast ratios, keyboard navigation traps, focus rings, and screen reader ARIA landmarks.',
    tags: ['ux_design', 'accessibility', 'wcag', 'a11y', 'contrast', 'aria'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Требования Доступности (WCAG 2.1 AA Compliance)',
        'WCAG 2.1 AA Accessibility Directives',
        [
          '- Контрастность текста не менее 4.5:1 для обычного текста и 3:1 для крупного.',
          '- Полная навигация с клавиатуры (Tab, Enter, Escape, стрелки) с видимым фокус-рингом.',
          '- Обязательные атрибуты `aria-label` для иконочных кнопок без текста.',
        ],
        [
          '- Minimum color contrast ratio >= 4.5:1 for body copy and 3:1 for large headers.',
          '- Full keyboard navigability (Tab, Enter, Space, Escape) with visible focus rings.',
          '- Mandatory `aria-label` and `aria-expanded` attributes on icon-only interactive elements.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'friction-point-identification': {
    id: 'friction-point-identification',
    name: 'FrictionPointIdentificationSkill',
    displayName: 'User Flow Friction Point Audit',
    categoryId: 'ux_design',
    description: 'Identifies cognitive drop-off points, redundant form fields, and clicking friction in user funnels.',
    tags: ['ux_design', 'friction', 'funnel', 'drop-off', 'optimization'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Аудит Точек Трения в Пользовательском Сценарии',
        'User Flow Friction & Drop-Off Audit',
        [
          '- Найти и устранить лишние промежуточные экраны и необязательные поля ввода.',
          '- Снизить число кликов до целевого действия (Time-to-Value < 60 секунд).',
        ],
        [
          '- Identify and eliminate redundant confirmation screens and optional form inputs.',
          '- Compress click-depth to primary value delivery (Time-to-Value < 60 seconds).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'progressive-disclosure-flow': {
    id: 'progressive-disclosure-flow',
    name: 'ProgressiveDisclosureFlowSkill',
    displayName: 'Progressive Disclosure UX Architecture',
    categoryId: 'ux_design',
    description: 'Presents simple defaults first while hiding advanced controls behind expandable power-user drawers.',
    tags: ['ux_design', 'progressive-disclosure', 'simplicity', 'power-user'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Прогрессивное Раскрытие Интерфейса (Progressive Disclosure)',
        'Progressive Disclosure UX Architecture',
        [
          '- По умолчанию показывать только 3-4 ключевых параметра.',
          '- Расширенные настройки выносить под спойлеры «Advanced Settings» или в боковые шторки.',
        ],
        [
          '- Display strictly 3-4 primary high-frequency parameters in the default view.',
          '- Defer advanced flags and fine-tuning knobs behind explicit "Advanced Configuration" drawers.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'empty-state-delight': {
    id: 'empty-state-delight',
    name: 'EmptyStateDelightSkill',
    displayName: 'Actionable Empty State Architecture',
    categoryId: 'ux_design',
    description: 'Transforms blank screens into delightful launchpads with 1-click starter templates and tutorials.',
    tags: ['ux_design', 'empty-state', 'onboarding', 'activation'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Проектирование Пустых Состояний (Empty States)',
        'Actionable Empty State Architecture',
        [
          '- Пустые экраны (0 проектов, 0 промптов) обязаны содержать понятную иллюстрацию, текст выгоды и кнопку «Создать первый...».',
        ],
        [
          '- Zero-data empty states must feature a contextual illustration, value proposition copy, and a primary "Create First Item" action.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'onboarding-walkthrough-architecture': {
    id: 'onboarding-walkthrough-architecture',
    name: 'OnboardingWalkthroughArchitectureSkill',
    displayName: 'Frictionless Product Onboarding Tour',
    categoryId: 'ux_design',
    description: 'Designs 3-step interactive onboarding tours that deliver an instant «Aha!» moment in under 2 minutes.',
    tags: ['ux_design', 'onboarding', 'tour', 'activation', 'aha-moment'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Архитектура Онбординга Пользователя',
        'Frictionless Product Onboarding Architecture',
        [
          '- Шаг 1: Выбор цели. Шаг 2: Интерактивное создание первого артефакта. Шаг 3: Момент озарения (Aha Moment) и результат.',
        ],
        [
          '- Step 1: Goal selection. Step 2: Interactive artifact creation. Step 3: Immediate Aha! moment with demonstrable output.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'error-prevention-recovery-messaging': {
    id: 'error-prevention-recovery-messaging',
    name: 'ErrorPreventionRecoveryMessagingSkill',
    displayName: 'Error Prevention & Self-Healing Messaging',
    categoryId: 'ux_design',
    description: 'Anticipates user slips with real-time inline validation and non-destructive recovery actions.',
    tags: ['ux_design', 'error-prevention', 'recovery', 'validation', 'feedback'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Предотвращение Ошибок и Восстановление (UX Resilience)',
        'Error Prevention & Inline Recovery Protocol',
        [
          '- Проверять корректность ввода на лету (inline validation); блокировать кнопку отправки только с поясняющим тултипом.',
          '- Предоставлять возможность отмены (Undo) в течение 10 секунд после действия через всплывающий тост.',
        ],
        [
          '- Execute real-time inline validation; provide contextual tooltips explaining missing constraints.',
          '- Offer a 10-second non-destructive Undo window via floating toast notification following state mutations.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'information-hierarchy-scaffold': {
    id: 'information-hierarchy-scaffold',
    name: 'InformationHierarchyScaffoldSkill',
    displayName: 'Visual Information Hierarchy & Typography',
    categoryId: 'ux_design',
    description: 'Establishes clear typographic scale, consistent spatial grids, and visual contrast weighting.',
    tags: ['ux_design', 'typography', 'grid', 'hierarchy', 'layout'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Типографическая и Пространственная Иерархия',
        'Visual Information Hierarchy & Spatial Grid',
        [
          '- Использовать модульную 8-пиксельную сетку отступов (p-2, p-4, p-6, p-8) и четкую шкалу шрифтов (text-xs -> text-2xl).',
        ],
        [
          '- Enforce strict 8px spatial rhythm (p-2, p-4, p-6, p-8) and hierarchical typography (xs -> sm -> base -> xl -> 2xl).',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'mobile-first-ergonomics': {
    id: 'mobile-first-ergonomics',
    name: 'MobileFirstErgonomicsSkill',
    displayName: 'Mobile-First Thumb-Zone Ergonomics',
    categoryId: 'ux_design',
    description: 'Optimizes touch targets (>= 44x44px), bottom sheets, and thumb-accessible navigation for mobile views.',
    tags: ['ux_design', 'mobile', 'touch-targets', 'ergonomics', 'responsive'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Эргономика Мобильных Интерфейсов (Touch Targets)',
        'Mobile Touch-Target & Ergonomic Directives',
        [
          '- Размер всех интерактивных элементов на мобильных экранах не менее 44x44px с отступом между кнопками >= 8px.',
        ],
        [
          '- Enforce minimum 44x44px touch targets across all mobile breakpoints with >= 8px interactive clearance.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'form-field-optimization': {
    id: 'form-field-optimization',
    name: 'FormFieldOptimizationSkill',
    displayName: 'High-Conversion Form Field Optimization',
    categoryId: 'ux_design',
    description: 'Minimizes form abandonment using smart defaults, auto-focus, masked inputs, and single-column layouts.',
    tags: ['ux_design', 'forms', 'conversion', 'inputs', 'optimization'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Оптимизация Форм Ввода (Form UX)',
        'Form Field & Conversion Optimization',
        [
          '- Одноколоночное расположение полей; умные автоподстановки и понятные плейсхолдеры с примерами.',
        ],
        [
          '- Single-column form architecture with intelligent autofocus, input masking, and concrete placeholder examples.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'user-journey-touchpoint-map': {
    id: 'user-journey-touchpoint-map',
    name: 'UserJourneyTouchpointMapSkill',
    displayName: 'End-to-End User Journey Touchpoint Map',
    categoryId: 'ux_design',
    description: 'Maps the emotional and functional customer journey across Discovery, Onboarding, Core Use, and Renewal.',
    tags: ['ux_design', 'journey-map', 'touchpoints', 'lifecycle'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'protocol',
        'Карта Пути Пользователя (Customer Journey Map)',
        'End-to-End Customer Journey Touchpoint Mapping',
        [
          '- Расписать путь: 1. Знакомство (Landing) -> 2. Активация (Sign-up) -> 3. Постоянное использование -> 4. Продление.',
        ],
        [
          '- Map lifecycle touchpoints: 1. Acquisition -> 2. First-Session Activation -> 3. Habitual Retention -> 4. Expansion.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'zero-pill-design-discipline': {
    id: 'zero-pill-design-discipline',
    name: 'ZeroPillDesignDisciplineSkill',
    displayName: 'Anti-AI-Slop Clean Design System',
    categoryId: 'ux_design',
    description: 'Eliminates rounded pill badges, purple neon glows, and generic AI aesthetic tropes.',
    tags: ['ux_design', 'clean-design', 'anti-slop', 'typography', 'professional'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);

      ensureSection(
        sections,
        'constraints',
        'Стандарты Чистого Дизайна (Anti-AI-Slop)',
        'Clean Professional Design System Discipline',
        [
          '- Запрещены аляповатые неоновые градиенты и круглые пилюли-бейджи; использовать выверенную типографику и чистые бордеры.',
        ],
        [
          '- Strictly ban gaudy neon purple glows and pill-badge clutter; enforce editorial typography and crisp hairline borders.',
        ],
        isRu
      );

      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },
};
