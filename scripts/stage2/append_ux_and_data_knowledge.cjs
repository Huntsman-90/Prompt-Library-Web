const { appendSkills } = require('../appendSkills.cjs');

// ==========================================
// 2. UX DESIGN (40 Skills -> 115 Total)
// ==========================================
const UX_DESIGN_40 = [
  {
    id: "ux-design-command-palette-fuzzy-search-hotkey",
    name: "UxDesignCommandPaletteFuzzySearchHotkeySkill",
    displayName: "Global Command Palette (Cmd+K / Ctrl+K) & Fuzzy Search Action Center",
    categoryId: "uxDesign",
    description: "Designs keyboard-first navigation with global Cmd+K command palettes, fuzzy scoring, recent history, and grouped action categories.",
    tags: ["ux-design", "command-palette", "keyboard-navigation", "fuzzy-search", "accessibility"],
    sectionName: "Command Palette (Cmd+K) UX Architecture",
    ruSectionName: "Командная палитра быстрого доступа (Cmd+K / Ctrl+K) с нечетким поиском",
    instructions: [
      "Bind global `Cmd+K` / `Ctrl+K` hotkey listener with automatic input focus and backdrop blur overlay.",
      "Group results dynamically: Recent Actions, Navigation Pages, Settings, and Entity Quick Creation.",
      "Support full keyboard navigation (Up/Down arrows, Enter to execute, Escape to dismiss) without mouse dependency."
    ],
    ruInstructions: [
      "Привязывайте глобальное сочетание `Cmd+K` / `Ctrl+K` с мгновенным фокусом в поле поиска и размытием фона.",
      "Группируйте результаты по блокам: Недавние действия, Навигация, Настройки и Быстрое создание.",
      "Обеспечивайте полное управление с клавиатуры (стрелки, Enter для выбора, Esc для закрытия)."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-micro-interaction-spring-physics-haptics",
    name: "UxDesignMicroInteractionSpringPhysicsHapticsSkill",
    displayName: "Micro-Interactions with Spring Physics & Tactile Haptic Feedback",
    categoryId: "uxDesign",
    description: "Crafts tactile button clicks, pull-to-refresh snaps, and toggle switches using physical spring damping and subtle mobile haptics.",
    tags: ["ux-design", "micro-interactions", "spring-physics", "haptics", "animation"],
    sectionName: "Spring Physics Micro-Interactions Standards",
    ruSectionName: "Микроанимации на физике пружин (Spring Physics) и тактильный отклик (Haptics)",
    instructions: [
      "Use physically modeled spring curves (stiffness: 300, damping: 25) instead of linear CSS easing.",
      "Trigger subtle 10ms haptic pulses (`navigator.vibrate(10)`) on mobile toggle switches and state confirmations.",
      "Ensure all animations complete within 150-250ms to maintain crisp interface responsiveness."
    ],
    ruInstructions: [
      "Используйте физические пружинные анимации (Spring) вместо линейных CSS-переходов.",
      "Добавляйте легкий 10 мс виброотклик (`navigator.vibrate`) при переключении тумблеров на мобильных устройствах.",
      "Ограничивайте длительность микроанимаций в пределах 150–250 мс для ощущения мгновенной отзывчивости."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-accessible-focus-trap-modal-dialog",
    name: "UxDesignAccessibleFocusTrapModalDialogSkill",
    displayName: "WCAG 2.2 Accessible Focus-Trap & Keyboard Modal Navigation",
    categoryId: "uxDesign",
    description: "Implements accessible modal dialogs with strict DOM focus trapping, Escape key listener, and focus restoration to trigger element.",
    tags: ["ux-design", "accessibility", "focus-trap", "wcag", "keyboard"],
    sectionName: "Accessible Focus-Trap Standards",
    ruSectionName: "Доступные модальные окна (WCAG 2.2: захват фокуса и возврат на триггер)",
    instructions: [
      "Trap Tab / Shift+Tab keyboard focus strictly inside the modal container when open.",
      "Attach `aria-modal='true'`, `role='dialog'`, and `aria-labelledby` referencing modal header title.",
      "Restore focus automatically to the originating button trigger upon modal closing."
    ],
    ruInstructions: [
      "Удерживайте фокус клавиши Tab внутри модального окна, исключая переход к элементам подложки.",
      "Задавайте атрибуты `aria-modal='true'`, `role='dialog'` и связывайте заголовок через `aria-labelledby`.",
      "Возвращайте фокус на вызвавший модальное окно элемент интерфейса после его закрытия."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-frictionless-passwordless-magic-link",
    name: "UxDesignFrictionlessPasswordlessMagicLinkSkill",
    displayName: "Frictionless Passwordless Login (Magic Links & WebAuthn Passkeys)",
    categoryId: "uxDesign",
    description: "Eliminates password fatigue with single-tap Passkey biometric authentication (FaceID/TouchID) and 1-click email magic links.",
    tags: ["ux-design", "passkeys", "webauthn", "magic-link", "authentication", "onboarding"],
    sectionName: "Passwordless Authentication UX Standards",
    ruSectionName: "Беспарольная авторизация (Passkeys / FaceID, TouchID и Magic Links)",
    instructions: [
      "Prioritize native WebAuthn passkey biometric prompt as the primary 1-click login method.",
      "Provide fallback email magic links with clear 6-digit numeric verification code fallback.",
      "Remember user device trust status to eliminate unnecessary authentication friction on repeat visits."
    ],
    ruInstructions: [
      "Предлагайте биометрический вход по Passkeys (FaceID / TouchID) как основной сценарий в 1 клик.",
      "Предоставляйте альтернативный вход по Magic Link в письме с дублированием 6-значным числовым кодом.",
      "Запоминайте доверенные устройства пользователя для исключения повторных входов на персональных девайсах."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-empty-state-first-time-activation",
    name: "UxDesignEmptyStateFirstTimeActivationSkill",
    displayName: "Delightful Empty States & First-Time User Activation Funnels",
    categoryId: "uxDesign",
    description: "Transforms blank screens into engaging launchpads with illustration, clear value proposition, and prominent 1-click creation CTA.",
    tags: ["ux-design", "empty-state", "activation", "onboarding", "cta"],
    sectionName: "Empty State Activation Standards",
    ruSectionName: "Дизайн пустых состояний (Empty States) и быстрая активация новичков",
    instructions: [
      "Never present a completely blank screen; display a friendly thematic icon or minimal illustration.",
      "Explain the exact purpose of the screen in 1 concise sentence followed by the primary creation button.",
      "Offer 2-3 pre-built starter templates for instant 1-click exploration."
    ],
    ruInstructions: [
      "Никогда не оставляйте экран пустым; размещайте лаконичную тематическую иллюстрацию или иконку.",
      "Объясняйте назначение экрана в одном предложении и размещайте крупную кнопку создания первого объекта.",
      "Предлагайте 2–3 готовых шаблона для быстрого заполнения данных в один клик."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-destructive-action-safeguard-friction",
    name: "UxDesignDestructiveActionSafeguardFrictionSkill",
    displayName: "Destructive Action Safeguards & Intentional Friction Friction Gates",
    categoryId: "uxDesign",
    description: "Prevents accidental data loss by requiring explicit resource name typing, countdown delay timers, and undo snackbars.",
    tags: ["ux-design", "safety", "destructive-actions", "confirmation", "error-prevention"],
    sectionName: "Destructive Action Safety Standards",
    ruSectionName: "Защита от случайного удаления (Ввод имени ресурса, таймеры задержки и Undo)",
    instructions: [
      "For irreversible high-risk actions (delete database/project), mandate typing the exact resource name into an input field.",
      "Disable the confirmation button until the typed string matches 100%.",
      "Pair non-critical deletions with a 5-second 'Undo' snackbar notification before permanent purge."
    ],
    ruInstructions: [
      "Для необратимых действий (удаление проекта) требуйте точного ввода названия объекта в поле подтверждения.",
      "Блокируйте кнопку удаления до полного посимвольного совпадения введенного названия.",
      "Сопровождайте стандартные удаления всплывающим уведомлением с кнопкой «Отменить» (Undo) на 5–10 секунд."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-mobile-bottom-sheet-gesture-ergonomics",
    name: "UxDesignMobileBottomSheetGestureErgonomicsSkill",
    displayName: "Mobile Bottom Sheet Gesture Ergonomics & Thumb-Zone Reach",
    categoryId: "uxDesign",
    description: "Positions complex mobile forms and filters in swipeable bottom sheets with snap points (collapsed, half, expanded) in the thumb zone.",
    tags: ["ux-design", "mobile", "bottom-sheet", "gestures", "thumb-zone"],
    sectionName: "Mobile Bottom Sheet Gesture Standards",
    ruSectionName: "Мобильные шторки (Bottom Sheets) с поддержкой жестов в зоне досягаемости пальца",
    instructions: [
      "Anchor interactive sheets to the bottom of mobile viewports for effortless single-hand thumb reach.",
      "Implement fluid drag gestures with magnetic snap points at 25%, 50%, and 90% screen height.",
      "Dismiss sheet smoothly on downward velocity flick or backdrop tap."
    ],
    ruInstructions: [
      "Размещайте интерактивные панели в нижней части экрана для комфортного управления одной рукой.",
      "Поддерживайте плавное перетаскивание с магнитными точками фиксации на 25%, 50% и 90% высоты экрана.",
      "Закрывайте шторку быстрым свайпом вниз или тапом по затемненной подложке."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-infinite-scroll-virtualized-list-windowing",
    name: "UxDesignInfiniteScrollVirtualizedListWindowingSkill",
    displayName: "Virtualized List Windowing (react-window) & Infinite Scroll UX",
    categoryId: "uxDesign",
    description: "Renders 100,000+ item lists at 60fps by rendering only visible DOM nodes, preserving scroll positions across page navigations.",
    tags: ["ux-design", "virtualization", "infinite-scroll", "performance", "dom-windowing"],
    sectionName: "Virtualized Windowing List Standards",
    ruSectionName: "Виртуализация длинных списков (DOM Windowing) и бесконечный скролл без тормозов",
    instructions: [
      "Render only elements within the current viewport plus a 5-item overscan buffer using DOM virtualization.",
      "Maintain scroll position and restore exact pixel offset when users navigate back from detail pages.",
      "Display subtle bottom loading skeletons when fetching subsequent pagination batches."
    ],
    ruInstructions: [
      "Рендерите в DOM только видимые на экране элементы плюс небольшой буфер запаса (5 элементов).",
      "Сохраняйте и точно восстанавливайте позицию скролла при возврате со страницы детального просмотра.",
      "Показывайте ненавязчивые скелетоны загрузки внизу списка при подгрузке новых страниц."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-faceted-search-filter-instant-refinement",
    name: "UxDesignFacetedSearchFilterInstantRefinementSkill",
    displayName: "Faceted Search, Multi-Select Tag Filters & Live Count Badges",
    categoryId: "uxDesign",
    description: "Structures enterprise search with multi-select facet filters, live matching item count badges, and 1-click active tag clearing.",
    tags: ["ux-design", "faceted-search", "filters", "e-commerce", "search-ux"],
    sectionName: "Faceted Search & Filtering Standards",
    ruSectionName: "Фасетный поиск с динамическими счетчиками и быстрой очисткой фильтров",
    instructions: [
      "Display dynamic item count badges next to each checkbox filter reflecting remaining matching results.",
      "Show all actively applied filters as removable chips above the result grid for immediate visibility.",
      "Provide a global 'Clear All Filters' button and update URL search parameters for shareable query links."
    ],
    ruInstructions: [
      "Отображайте динамические бейджи с числом подходящих товаров рядом с каждым чекбоксом фильтра.",
      "Выносите все активные фильтры в виде закрываемых плашек (Chips) над результатами поиска.",
      "Добавляйте кнопку «Сбросить все» и синхронизируйте состояние фильтров с параметрами URL."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-dark-mode-apca-contrast-oled-black",
    name: "UxDesignDarkModeApcaContrastOledBlackSkill",
    displayName: "Accessible Dark Mode & APCA Perceptual Contrast Scale",
    categoryId: "uxDesign",
    description: "Tunes dark mode surfaces with elevated neutral grays (#121212 / #1E1E1E), muted accent tones, and zero eye-straining pure white text.",
    tags: ["ux-design", "dark-mode", "contrast", "apca", "color-theory"],
    sectionName: "Dark Mode Contrast Standards",
    ruSectionName: "Дизайн темной темы: шкала контраста APCA, нейтральные серые фоны и защита глаз",
    instructions: [
      "Avoid pure black (#000000) for large surfaces; use deep elevated grays (`#121212`, `#18181B`) for card depth.",
      "Tone down high-contrast pure white text (#FFFFFF) to soft neutral off-white (`#E4E4E7` / `#F4F4F5`) to prevent eye fatigue.",
      "Desaturate vibrant primary accent colors slightly in dark mode to preserve perceptual legibility."
    ],
    ruInstructions: [
      "Избегайте глухого черного (#000000) для поверхностей; используйте глубокие темно-серые тона для передачи слоев интерфейса.",
      "Смягчайте ярко-белый текст до мягких оттенков (`#E4E4E7`), предотвращая эффект ореола и усталость глаз.",
      "Снижайте насыщенность ярких акцентных цветов в темной теме для сохранения читаемости."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-multi-step-wizard-progress-gamification",
    name: "UxDesignMultiStepWizardProgressGamificationSkill",
    displayName: "Multi-Step Onboarding Wizard & Completion Progress Bar",
    categoryId: "uxDesign",
    description: "Guides users through complex setup flows with segmented progress bars, auto-saving drafts, and optional skip steps.",
    tags: ["ux-design", "onboarding", "wizard", "progress-bar", "form-ux"],
    sectionName: "Multi-Step Wizard Standards",
    ruSectionName: "Пошаговый мастер настройки (Multi-Step Wizard) с автосохранением и прогресс-баром",
    instructions: [
      "Display clear segmented progress steps: 'Step 2 of 4: Team Configuration'.",
      "Persist form state in localStorage automatically so users never lose progress on accidental tab closure.",
      "Allow skipping non-essential steps ('Skip for now') to reach the product core value faster."
    ],
    ruInstructions: [
      "Отображайте понятный пошаговый индикатор прогресса («Шаг 2 из 4: Настройка команды»).",
      "Автоматически сохраняйте черновик формы в локальное хранилище при переходе между шагами.",
      "Предоставляйте возможность пропустить второстепенные шаги для быстрого старта в продукте."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-contextual-inline-tooltips-hotkeys",
    name: "UxDesignContextualInlineTooltipsHotkeysSkill",
    displayName: "Contextual Inline Tooltips & Keyboard Hotkey Badges",
    categoryId: "uxDesign",
    description: "Enhances icon-only buttons with delayed contextual tooltips displaying action descriptions and keyboard shortcut badges (e.g. ⌘S).",
    tags: ["ux-design", "tooltips", "hotkeys", "microcopy", "ui-affordance"],
    sectionName: "Contextual Tooltips & Hotkey Standards",
    ruSectionName: "Контекстные всплывающие подсказки (Tooltips) с бейджами горячих клавиш (⌘S)",
    instructions: [
      "Add a 300ms hover delay before opening tooltips to avoid visual clutter during rapid mouse scanning.",
      "Include keyboard shortcut keys in a formatted badge `<kbd>⌘K</kbd>` next to the action label.",
      "Position tooltips automatically using Popper / Floating-UI with collision boundary flips."
    ],
    ruInstructions: [
      "Задавайте задержку появления подсказки в 300 мс для защиты от визуального шума при движении мыши.",
      "Отображайте сочетание горячих клавиш в стилизованном бейдже `<kbd>⌘S</kbd>` рядом с описанием.",
      "Автоматически корректируйте позицию подсказки при приближении к границам экрана (Floating UI)."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-fluid-typography-clamp-responsive-scale",
    name: "UxDesignFluidTypographyClampResponsiveScaleSkill",
    displayName: "Fluid Typography & CSS `clamp()` Viewport Scaling",
    categoryId: "uxDesign",
    description: "Calculates seamless fluid font sizes scaling proportionally from mobile (320px) to ultra-wide desktop (1920px) via CSS clamp().",
    tags: ["ux-design", "typography", "css-clamp", "responsive", "design-tokens"],
    sectionName: "Fluid Typography Standards",
    ruSectionName: "Плавная адаптивная типографика (CSS clamp() без дискретных медиа-запросов)",
    instructions: [
      "Use `clamp(minSize, preferredFormula, maxSize)` (e.g. `clamp(1rem, 0.8rem + 1vw, 1.75rem)`).",
      "Maintain a consistent modular scale ratio (1.25 Major Third or 1.333 Perfect Fourth).",
      "Ensure line-heights scale inversely with font size to preserve paragraph readability."
    ],
    ruInstructions: [
      "Применяйте функцию `clamp(min, formula, max)` для плавной адаптации заголовков под размер экрана.",
      "Соблюдайте гармоничные пропорции модульной шкалы шрифтов (например, 1.25 Major Third).",
      "Уменьшайте относительный интерлиньяж (line-height) для крупных заголовков для компактности."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-inline-form-validation-instant-assist",
    name: "UxDesignInlineFormValidationInstantAssistSkill",
    displayName: "Proactive Inline Form Validation & Smart Input Masking",
    categoryId: "uxDesign",
    description: "Validates inputs on blur with positive checkmark confirmations, contextual error remedies, and automatic credit card / phone masking.",
    tags: ["ux-design", "forms", "validation", "input-masking", "conversion"],
    sectionName: "Inline Form Validation Standards",
    ruSectionName: "Умная валидация форм (Inline Validation, маски ввода и позитивные чекмарки)",
    instructions: [
      "Validate on field blur (focus exit) rather than on every keystroke to avoid premature error scolding.",
      "Show a subtle green checkmark icon when input requirements are successfully satisfied.",
      "Format phone numbers and currency inputs dynamically with smart input masks as user types."
    ],
    ruInstructions: [
      "Проверяйте корректность поля при потере фокуса (onBlur), а не при первом же нажатии клавиши.",
      "Показывайте зеленую иконку подтверждения при успешном заполнении сложных полей.",
      "Применяйте автоматические маски для форматирования телефонов, дат и сумм по мере ввода."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-live-collaborative-presence-cursors",
    name: "UxDesignLiveCollaborativePresenceCursorsSkill",
    displayName: "Figma-Style Multiplayer Collaborative Cursors & Presence Avatars",
    categoryId: "uxDesign",
    description: "Renders real-time peer user cursors with smooth spring interpolation, colored name tags, and active selection bounding boxes.",
    tags: ["ux-design", "multiplayer", "presence", "collaboration", "realtime-ux"],
    sectionName: "Collaborative Presence UX Standards",
    ruSectionName: "Многопользовательские живые курсоры (Figma-Style Presence) и аватары участников",
    instructions: [
      "Interpolate cursor X/Y coordinates using linear interpolation (LERP) or spring physics to smooth network jitter.",
      "Assign each active participant a unique high-contrast color token and name pill badge.",
      "Fade out inactive peer cursors after 5 seconds of idle mouse stillness."
    ],
    ruInstructions: [
      "Интерполируйте координаты движения курсоров (LERP) для сглаживания сетевых задержек.",
      "Присваивайте каждому участнику уникальный цветовой бейдж с именем.",
      "Плавно скрывайте неактивные курсоры через 5 секунд отсутствия движения мыши."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-dual-axis-sticky-spreadsheet-table",
    name: "UxDesignDualAxisStickySpreadsheetTableSkill",
    displayName: "Dual-Axis Sticky Headers & High-Density Spreadsheet Tables",
    categoryId: "uxDesign",
    description: "Builds large analytical data grids with sticky column headers, frozen leading ID columns, and smooth horizontal scrolling.",
    tags: ["ux-design", "data-grid", "spreadsheet", "sticky-headers", "tables"],
    sectionName: "Dual-Axis Sticky Table Standards",
    ruSectionName: "Аналитические таблицы с фиксацией строк и колонок (Sticky Dual-Axis Tables)",
    instructions: [
      "Pin table headers (`thead th { position: sticky; top: 0; }`) with background fills and subtle bottom border shadow.",
      "Freeze first 1-2 identifier columns (`position: sticky; left: 0;`) with right shadow dividers during horizontal scroll.",
      "Provide column resizing drag handles and column show/hide toggle dropdowns."
    ],
    ruInstructions: [
      "Фиксируйте шапку таблицы сверху (`position: sticky; top: 0`) с непрозрачным фоном и тенью снизу.",
      "Закрепляйте первые колонки с ID и названием (`position: sticky; left: 0`) при горизонтальной прокрутке.",
      "Добавляйте возможность изменения ширины колонок и меню настройки видимости столбцов."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-drag-and-drop-kanban-board-affordance",
    name: "UxDesignDragAndDropKanbanBoardAffordanceSkill",
    displayName: "Drag-and-Drop Kanban Board Interaction & Drop Indicator Shadows",
    categoryId: "uxDesign",
    description: "Implements accessible drag-and-drop task boards with elevated card shadows during drag, placeholder drop zones, and keyboard reordering.",
    tags: ["ux-design", "drag-and-drop", "kanban", "board", "interactions"],
    sectionName: "Drag-and-Drop Interaction Standards",
    ruSectionName: "Интерактивные Kanban-доски (Drag-and-Drop с тенями и placeholder-зонами)",
    instructions: [
      "Elevate dragged card with increased z-index, slight rotation (2deg), and prominent drop shadow.",
      "Render an animated dashed placeholder box indicating exact landing insert position.",
      "Provide accessible keyboard shortcut controls (Space to pick up, Up/Down/Left/Right arrows, Space to drop)."
    ],
    ruInstructions: [
      "Приподнимайте перетаскиваемую карточку с легким наклоном (2°) и выразительной тенью.",
      "Отображайте пунктирную рамку-заполнитель в месте предполагаемого сброса карточки.",
      "Поддерживайте доступное управление с клавиатуры (Пробел для захвата, стрелки для перемещения)."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-toast-notification-stacking-priority",
    name: "UxDesignToastNotificationStackingPrioritySkill",
    displayName: "Toast Notification Stacking, Auto-Dismiss & Priority Queues",
    categoryId: "uxDesign",
    description: "Manages non-intrusive bottom-right toast alerts with countdown progress bars, swipe dismissal, and max 3-item stacking.",
    tags: ["ux-design", "toasts", "notifications", "alerts", "feedback"],
    sectionName: "Toast Notification Stack Standards",
    ruSectionName: "Стек всплывающих уведомлений (Toasts: автозакрытие, свайп и лимит очереди)",
    instructions: [
      "Limit concurrent visible toasts to maximum 3 stacked items; queue excess messages.",
      "Provide a visual progress bar indicating remaining duration before auto-dismissal (default 4 seconds).",
      "Pause countdown timer while user hovers mouse over the toast to prevent reading frustration."
    ],
    ruInstructions: [
      "Ограничивайте число одновременно отображаемых тостов до 3; ставьте остальные в очередь.",
      "Показывайте визуальную полосу обратного отсчета времени до автоматического закрытия (4 секунды).",
      "Приостанавливайте таймер автозакрытия при наведении курсора мыши на текст уведомления."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-progressive-disclosure-expandable-drawers",
    name: "UxDesignProgressiveDisclosureExpandableDrawersSkill",
    displayName: "Progressive Disclosure & Expandable Advanced Settings Drawers",
    categoryId: "uxDesign",
    description: "Keeps primary user interfaces clean by concealing advanced configurations inside accordion drawers and expandable disclosure panels.",
    tags: ["ux-design", "progressive-disclosure", "drawers", "clean-ui", "cognitive-load"],
    sectionName: "Progressive Disclosure UX Standards",
    ruSectionName: "Прогрессивное раскрытие (Progressive Disclosure) и скрытие сложных настроек",
    instructions: [
      "Present 80% most common use-cases directly on the primary viewport without nesting.",
      "Group power-user dials and edge-case settings under an 'Advanced Settings' expandable toggle.",
      "Animate disclosure height smoothly without causing jarring sudden layout shifts."
    ],
    ruInstructions: [
      "Выносите 80% типовых сценариев на главный экран без лишних вложенных меню.",
      "Прячьте расширенные параметры для профи в раскрывающийся блок «Дополнительные настройки».",
      "Анимируйте раскрытие плавно, исключая резкие скачки высоты контента."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-skeleton-loader-content-placeholders",
    name: "UxDesignSkeletonLoaderContentPlaceholdersSkill",
    displayName: "Perceived Performance: Shimmering Skeleton Content Placeholders",
    categoryId: "uxDesign",
    description: "Replaces jarring spinner wheels with shimmering gray wireframe placeholders matching exact typography and image aspect ratios.",
    tags: ["ux-design", "skeleton-loaders", "perceived-performance", "loading-ux", "shimmer"],
    sectionName: "Skeleton Loader Placeholder Standards",
    ruSectionName: "Скелетоны загрузки (Shimmering Skeleton Loaders) для восприятия мгновенной скорости",
    instructions: [
      "Match skeleton placeholder dimensions precisely to incoming avatar circles, headline bars, and card boxes.",
      "Apply a gentle linear gradient shimmer animation sweeping from left to right every 1.5 seconds.",
      "Cross-fade smoothly from skeleton to populated content to prevent visual blinking."
    ],
    ruInstructions: [
      "Формируйте скелетоны точно по геометрии будущих карточек, аватаров и текстовых блоков.",
      "Используйте мягкую анимацию градиентного перелива (Shimmer), движущуюся слева направо.",
      "Переключайте скелетон на готовый контент через плавный Cross-fade без мигания экрана."
    ],
    semanticType: "framework"
  }
];

// ==========================================
// 3. DATA & KNOWLEDGE (40 Skills -> 115 Total)
// ==========================================
const DATA_KNOWLEDGE_40 = [
  {
    id: "data-knowledge-hybrid-search-bm25-dense-fusion",
    name: "DataKnowledgeHybridSearchBm25DenseFusionSkill",
    displayName: "Hybrid Search Fusion: Sparse Lexical (BM25) + Dense Vector Embeddings",
    categoryId: "dataKnowledge",
    description: "Combines exact keyword keyword matching (BM25) and semantic vector similarity using Reciprocal Rank Fusion (RRF).",
    tags: ["data-knowledge", "hybrid-search", "bm25", "vector-search", "rrf", "rag"],
    sectionName: "Hybrid Search & Reciprocal Rank Fusion Protocol",
    ruSectionName: "Гибридный поиск: объединение лексического BM25 и векторных эмбеддингов (RRF)",
    instructions: [
      "Execute parallel searches across BM25 inverted keyword index and dense HNSW vector index.",
      "Normalize and merge rank positions via Reciprocal Rank Fusion: $RRFScore(d) = \\sum \\frac{1}{k + rank(d)}$.",
      "Return unified top-K documents balancing precise keyword exactness with semantic conceptual recall."
    ],
    ruInstructions: [
      "Выполняйте параллельный запрос по лексическому индексу BM25 и векторному индексу HNSW.",
      "Объединяйте результаты по формуле Reciprocal Rank Fusion (RRF) с константой сглаживания $k=60$.",
      "Возвращайте итоговый топ-K документов, сочетающий точные совпадения терминов и семантическую релевантность."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-graphrag-knowledge-graph-synthesis",
    name: "DataKnowledgeGraphragKnowledgeGraphSynthesisSkill",
    displayName: "GraphRAG: Knowledge Graph Entity Extraction & Community Summaries",
    categoryId: "dataKnowledge",
    description: "Extracts entity nodes, relationship edges, and hierarchical community clusters from unstructured text for deep global RAG reasoning.",
    tags: ["data-knowledge", "graphrag", "knowledge-graph", "rag", "entity-extraction"],
    sectionName: "GraphRAG Knowledge Graph Synthesis Architecture",
    ruSectionName: "GraphRAG: Извлечение графа сущностей и кластеризация сообществ для глубокого RAG",
    instructions: [
      "Extract structured Entity nodes and Relationship edges with supporting source text citations.",
      "Partition the entity graph into hierarchical communities using the Leiden community detection algorithm.",
      "Pre-generate comprehensive community summaries to answer high-level holistic dataset queries."
    ],
    ruInstructions: [
      "Извлекайте сущности (Entity) и типы связей (Relationships) с цитатами из исходного текста.",
      "Кластеризуйте граф знаний на сообщества с помощью алгоритма Лейдена (Leiden Detection).",
      "Генерируйте сводные описания сообществ для ответов на глобальные вопросы по всему корпусу документов."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-hierarchical-parent-child-chunking",
    name: "DataKnowledgeHierarchicalParentChildChunkingSkill",
    displayName: "Hierarchical Document Indexing: Small Chunk Search, Large Parent Retrieval",
    categoryId: "dataKnowledge",
    description: "Indexes granular 200-token child chunks for precision vector retrieval while passing rich 1500-token parent context to the LLM.",
    tags: ["data-knowledge", "chunking", "parent-document-retriever", "rag", "vector-search"],
    sectionName: "Hierarchical Parent-Child Chunking Standards",
    ruSectionName: "Иерархический чанкинг: поиск по мелким фрагментам, передача полного родительского контекста",
    instructions: [
      "Split source documents into 1500-token Parent Chunks and subdivide each into 200-token Child Chunks.",
      "Generate embeddings exclusively for the fine-grained child chunks to maximize semantic query similarity.",
      "Retrieve and pass the full parent document chunk to the LLM prompt to preserve complete surrounding context."
    ],
    ruInstructions: [
      "Разбивайте документы на крупные родительские блоки (1500 токенов) и вложенные дочерние чанки (200 токенов).",
      "Стройте векторные эмбеддинги по мелким чанкам для точного попадания поискового запроса.",
      "Передавайте в промпт модели полный родительский блок для сохранения целостного контекста."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-scd-slowly-changing-dimensions",
    name: "DataKnowledgeScdSlowlyChangingDimensionsSkill",
    displayName: "Slowly Changing Dimensions (SCD Type 1, 2, 4) Data Warehouse Modeling",
    categoryId: "dataKnowledge",
    description: "Tracks historical changes in dimensional tables using Type 1 (overwrite), Type 2 (validity date ranges), and Type 4 (history tables).",
    tags: ["data-knowledge", "scd", "data-warehouse", "kimball", "sql"],
    sectionName: "Slowly Changing Dimensions (SCD) Standards",
    ruSectionName: "Медленно меняющиеся измерения (SCD Type 1, Type 2, Type 4) в DWH",
    instructions: [
      "SCD Type 1: Overwrite existing row attributes for error corrections without preserving history.",
      "SCD Type 2: Insert new row version with `valid_from`, `valid_to`, and `is_current = TRUE` flags.",
      "SCD Type 4: Maintain clean current dimension table and log historical changes to a separate audit table."
    ],
    ruInstructions: [
      "SCD Type 1: Перезапись значений для исправления опечаток без сохранения истории изменений.",
      "SCD Type 2: Добавление новой строки с полями `valid_from`, `valid_to` и флагом текущей версии `is_current`.",
      "SCD Type 4: Хранение актуального среза в основной таблице и логирование изменений в отдельную историю."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-apache-arrow-zero-copy-ipc",
    name: "DataKnowledgeApacheArrowZeroCopyIpcSkill",
    displayName: "Apache Arrow Columnar In-Memory Format & Zero-Copy IPC Sharing",
    categoryId: "dataKnowledge",
    description: "Transfers multi-gigabyte data frames across Python, Rust, and Node.js processes with zero serialization overhead via Arrow IPC.",
    tags: ["data-knowledge", "apache-arrow", "zero-copy", "columnar", "performance"],
    sectionName: "Apache Arrow Zero-Copy Memory Standards",
    ruSectionName: "Колоночный формат Apache Arrow и передача данных в памяти без сериализации (Zero-Copy)",
    instructions: [
      "Align in-memory record batches strictly with Apache Arrow 64-byte aligned SIMD memory specifications.",
      "Share data across microservices via Arrow Flight RPC or memory-mapped files without JSON/Protobuf decoding.",
      "Execute vectorized analytical expressions directly on raw Arrow memory buffers."
    ],
    ruInstructions: [
      "Выравнивайте массивы данных по 64-байтной границе спецификации Apache Arrow для SIMD-векторизации.",
      "Передавайте данные между процессами через Arrow Flight RPC без накладных расходов на сериализацию.",
      "Выполняйте аналитические вычисления прямо по бинарным буферам памяти без распаковки в объекты."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-vector-quantization-hnsw-tuning",
    name: "DataKnowledgeVectorQuantizationHnswTuningSkill",
    displayName: "Vector Quantization (Product Quantization PQ / Scalar SQ) & HNSW Memory Optimization",
    categoryId: "dataKnowledge",
    description: "Reduces vector database RAM footprint by 75-95% using 8-bit Scalar Quantization (SQ8) and Product Quantization (PQ) centroids.",
    tags: ["data-knowledge", "vector-quantization", "hnsw", "product-quantization", "vector-db"],
    sectionName: "Vector Index Quantization Standards",
    ruSectionName: "Квантование векторов (Scalar SQ8, Product Quantization PQ) и оптимизация памяти HNSW",
    instructions: [
      "Apply Scalar Quantization (SQ8) to compress 32-bit float vectors to 8-bit integers with <1% recall degradation.",
      "Use Product Quantization (PQ) to decompose 1536-dimensional vectors into compact sub-vector byte codes.",
      "Tune HNSW index parameters: `M=16` (bi-directional links) and `efConstruction=200` for optimal build/search balance."
    ],
    ruInstructions: [
      "Применяйте скалярное квантование (SQ8) для сжатия 32-битных векторов до 8 бит с сохранением 99% точности.",
      "Используйте Product Quantization (PQ) для разбиения многомерных векторов на компактные байтовые коды.",
      "Калибруйте параметры графа HNSW (`M=16`, `efSearch=64`) для баланса скорости поиска и расхода памяти."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-dbt-semantic-layer-metrics",
    name: "DataKnowledgeDbtSemanticLayerMetricsSkill",
    displayName: "dbt Semantic Layer, MetricFlow & Centralized Metric Governance",
    categoryId: "dataKnowledge",
    description: "Defines single-source-of-truth business metrics (MRR, Churn, CAC) in YAML, querying dynamically across BI tools via MetricFlow.",
    tags: ["data-knowledge", "dbt", "semantic-layer", "metricflow", "analytics-engineering"],
    sectionName: "dbt Semantic Layer Metrics Standards",
    ruSectionName: "Семантический слой dbt (Semantic Layer & MetricFlow: единый источник бизнес-метрик)",
    instructions: [
      "Define dimensions, entities, and semantic metrics in modular dbt YAML configuration files.",
      "Enforce consistent calculation logic: preventing conflicting definitions of Revenue across sales vs finance dashboards.",
      "Expose semantic metrics via standard SQL / GraphQL APIs to downstream BI and AI querying agents."
    ],
    ruInstructions: [
      "Описывайте измерения, сущности и метрики в декларативных YAML-файлах проекта dbt.",
      "Обеспечивайте единый алгоритм расчета ключевых показателей (MRR, Churn) для всех отделов компании.",
      "Предоставляйте доступ к метрикам через единый интерфейс SQL/GraphQL для BI-систем и AI-агентов."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-parquet-compression-row-group-sizing",
    name: "DataKnowledgeParquetCompressionRowGroupSizingSkill",
    displayName: "Apache Parquet Row Group Sizing, Dictionary Encoding & ZSTD Compression",
    categoryId: "dataKnowledge",
    description: "Optimizes analytical data lake storage by tuning Parquet row group sizes (128MB-512MB), dictionary encoding, and ZSTD compression levels.",
    tags: ["data-knowledge", "parquet", "compression", "data-lake", "zstd"],
    sectionName: "Parquet Columnar Storage Optimization Standards",
    ruSectionName: "Оптимизация файлов Apache Parquet (Размер Row Group, Dictionary Encoding, ZSTD)",
    instructions: [
      "Size Parquet Row Groups between 128MB and 512MB to balance parallel reader threads with column chunk scanning.",
      "Enable Dictionary Encoding on low-cardinality string columns for 10x storage compression and instant filter pruning.",
      "Apply Zstandard (ZSTD level 3) compression for the optimal Pareto trade-off between write speed and compression ratio."
    ],
    ruInstructions: [
      "Устанавливайте размер Row Group от 128 МБ до 512 МБ для баланса параллельного чтения и пропускной способности.",
      "Включайте словарное сжатие (Dictionary Encoding) для строковых полей с низкой кардинальностью.",
      "Используйте алгоритм сжатия ZSTD (уровень 3) для достижения лучшего баланса скорости и размера файлов."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-master-data-management-record-linkage",
    name: "DataKnowledgeMasterDataManagementRecordLinkageSkill",
    displayName: "Master Data Management (MDM) & Probabilistic Record Linkage (Fellegi-Sunter)",
    categoryId: "dataKnowledge",
    description: "Merges duplicate customer records across disparate enterprise databases using Jaro-Winkler fuzzy matching and Fellegi-Sunter weights.",
    tags: ["data-knowledge", "mdm", "record-linkage", "fuzzy-matching", "data-quality"],
    sectionName: "Master Data Record Linkage Standards",
    ruSectionName: "Управление мастер-данными (MDM) и вероятностное объединение дубликатов (Fellegi-Sunter)",
    instructions: [
      "Calculate string similarity distance using Jaro-Winkler, Levenshtein, and Double Metaphone phonetic algorithms.",
      "Assign probabilistic match weights to field pairs (name, address, email, phone) to classify matches (Auto-Merge, Manual Review, Non-Match).",
      "Construct an immutable Golden Record maintaining explicit lineage pointers back to source database IDs."
    ],
    ruInstructions: [
      "Рассчитывайте сходство записей с помощью алгоритмов Яро-Винклера, Левенштейна и фонетического Double Metaphone.",
      "Применяйте вероятностные веса совпадения полей для автоматического объединения или ручной модерации.",
      "Формируйте эталонную запись (Golden Record) с сохранением ссылок на первичные идентификаторы источников."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-automated-pii-data-masking-compliance",
    name: "DataKnowledgeAutomatedPiiDataMaskingComplianceSkill",
    displayName: "Automated PII Entity Detection, Pseudonymization & Dynamic Data Masking",
    categoryId: "dataKnowledge",
    description: "Detects personally identifiable information (emails, SSNs, credit cards) via regex and NER models, applying irreversible SHA-256 salting or masking.",
    tags: ["data-knowledge", "pii", "data-masking", "compliance", "gdpr", "security"],
    sectionName: "PII Detection & Data Masking Standards",
    ruSectionName: "Автоматическое обнаружение и маскирование персональных данных (PII / GDPR)",
    instructions: [
      "Scan incoming data streams with high-precision Regex and Named Entity Recognition (NER) models for PII patterns.",
      "Replace sensitive identifiers with cryptographically salted HMAC hashes or format-preserving tokenized placeholders.",
      "Enforce dynamic role-based data masking (e.g. `****-****-****-1234`) on analytical SQL query results."
    ],
    ruInstructions: [
      "Сканируйте входящие данные с помощью регулярных выражений и моделей NER для поиска персональных данных.",
      "Заменяйте чувствительные поля на криптографические HMAC-хэши с солью или псевдонимы с сохранением формата.",
      "Внедряйте динамическое маскирование данных в зависимости от роли аналитика (например, `****-****-1234`)."
    ],
    semanticType: "framework"
  }
];

// Append remaining UX Design and Data & Knowledge
appendSkills('uxDesign', UX_DESIGN_40);
appendSkills('dataKnowledge', DATA_KNOWLEDGE_40);

console.log('Appended 20 UX Design and 20 Data & Knowledge skills.');
