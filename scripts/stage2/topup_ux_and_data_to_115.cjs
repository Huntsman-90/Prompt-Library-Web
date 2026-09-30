const { appendSkills } = require('../appendSkills.cjs');

// 10 more UX Design skills -> 115
const UX_TOPUP_10 = [
  {
    id: "ux-design-undo-redo-stack-history-manager",
    name: "UxDesignUndoRedoStackHistoryManagerSkill",
    displayName: "Universal Undo/Redo Action Stack & Reversible State History",
    categoryId: "uxDesign",
    description: "Implements command pattern undo/redo history stacks with ⌘Z / ⇧⌘Z shortcuts, visual snapshot previews, and max stack limits.",
    tags: ["ux-design", "undo-redo", "history-manager", "shortcuts", "state-management"],
    sectionName: "Undo/Redo History Stack Standards",
    ruSectionName: "Универсальный стек отмены и возврата действий (Undo/Redo, ⌘Z / ⇧⌘Z)",
    instructions: [
      "Record state mutations as reversible Command objects (`execute()` and `undo()` pairs).",
      "Bind standard keyboard shortcuts (`Cmd+Z` for undo, `Cmd+Shift+Z` / `Cmd+Y` for redo).",
      "Cap history stack at 50 snapshots to prevent browser memory leaks."
    ],
    ruInstructions: [
      "Фиксируйте действия пользователя в виде обратимых команд с методами `execute()` и `undo()`.",
      "Привязывайте стандартные сочетания клавиш (`Cmd+Z` для отмены, `Cmd+Shift+Z` для повтора).",
      "Ограничивайте глубину стека истории 50 состояниями для защиты от утечек памяти."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-color-blindness-deuteranopia-protanopia",
    name: "UxDesignColorBlindnessDeuteranopiaProtanopiaSkill",
    displayName: "Color Vision Deficiency (CVD) Accessible Palettes & Dual Coding",
    categoryId: "uxDesign",
    description: "Designs interfaces accessible to red-green color-blind users (Deuteranopia/Protanopia) using dual encoding (color + shape/icon).",
    tags: ["ux-design", "color-blindness", "cvd", "accessibility", "visual-design"],
    sectionName: "Color Vision Deficiency Accessibility Standards",
    ruSectionName: "Доступность для пользователей с дальтонизмом (CVD: сочетание цвета, формы и иконок)",
    instructions: [
      "Never rely exclusively on color to convey status; always pair red/green states with icons (e.g. checkmark vs warning triangle).",
      "Test palettes using CVD simulation filters (Protanopia, Deuteranopia, Tritanopia, Monochromacy).",
      "Select color pairs with sufficient luminance contrast differences in grayscale."
    ],
    ruInstructions: [
      "Никогда не передавайте статус исключительно цветом; дублируйте статус формой и иконками (галочка / треугольник).",
      "Проверяйте палитры в симуляторах дальтонизма (протанопия, дейтеранопия, тританопия).",
      "Подбирайте цвета с выразительным контрастом по яркости даже в черно-белом режиме."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-micro-survey-in-app-nps-ces",
    name: "UxDesignMicroSurveyInAppNpsCesSkill",
    displayName: "In-App Micro-Surveys & Customer Effort Score (CES) Widgets",
    categoryId: "uxDesign",
    description: "Embeds 1-question lightweight micro-surveys triggered after key workflow completions to measure Customer Effort Score (CES).",
    tags: ["ux-design", "micro-survey", "ces", "feedback", "user-research"],
    sectionName: "In-App Micro-Survey Standards",
    ruSectionName: "Легкие микроопросы в интерфейсе (Customer Effort Score / CES после ключевых действий)",
    instructions: [
      "Trigger micro-surveys immediately after a user completes a major milestone (e.g. created first campaign).",
      "Keep questionnaire to exactly 1 single-click question: 'How easy was it to complete this task?' (1-5 scale).",
      "Allow effortless 1-click dismissal without interrupting user flow."
    ],
    ruInstructions: [
      "Показывайте микроопрос сразу после успешного завершения ключевого сценария (например, первая оплата).",
      "Ограничивайте опрос ровно 1 вопросом в 1 клик: «Насколько легко было выполнить это действие?» (шкала 1–5).",
      "Давайте возможность мгновенно закрыть виджет одним кликом без блокировки работы."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-drag-handle-reorderable-list",
    name: "UxDesignDragHandleReorderableListSkill",
    displayName: "Drag-Handle Grip Affordance & Accessible List Reordering",
    categoryId: "uxDesign",
    description: "Equips draggable list items with visible grip handles (six-dot icon), keyboard move controls (Alt+Up/Down), and live position announcements.",
    tags: ["ux-design", "drag-handle", "reorderable-list", "accessibility", "interactions"],
    sectionName: "Reorderable List Drag-Handle Standards",
    ruSectionName: "Эргономика перетаскивания списков (Иконка хэндла из 6 точек и сочетания Alt+Up/Down)",
    instructions: [
      "Display a visible six-dot grip handle (`cursor: grab;`) on draggable elements.",
      "Support accessible keyboard reordering using `Alt+Up` and `Alt+Down` arrow keys.",
      "Announce new item position to screen readers via aria-live upon movement."
    ],
    ruInstructions: [
      "Отображайте визуальную иконку ручки захвата (6 точек) с курсором `grab`.",
      "Поддерживайте доступное перемещение с клавиатуры с помощью сочетаний `Alt+Стрелка вверх/вниз`.",
      "Озвучивайте новую позицию элемента для экранных дикторов через `aria-live`."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-rich-text-floating-bubble-menu",
    name: "UxDesignRichTextFloatingBubbleMenuSkill",
    displayName: "Medium/Notion-Style Floating Rich Text Selection Bubble Menu",
    categoryId: "uxDesign",
    description: "Displays a floating formatting toolbar directly above user text selections (Bold, Italic, Link, Code, Heading) with instant positioning.",
    tags: ["ux-design", "rich-text", "floating-menu", "editor", "notion-style"],
    sectionName: "Floating Text Selection Menu Standards",
    ruSectionName: "Плавающая панель форматирования текста (Bubble Menu в стиле Notion / Medium)",
    instructions: [
      "Position floating bubble menu centered 8px above the user's active text selection bounding box.",
      "Provide 1-click toggles for Bold, Italic, Hyperlink, Inline Code, and Blockquote.",
      "Hide menu instantly upon clicking outside or deselecting text."
    ],
    ruInstructions: [
      "Позиционируйте всплывающую панель форматирования по центру на 8px выше выделенного текста.",
      "Предоставляйте быстрые кнопки форматирования: полужирный, курсив, ссылка, инлайн-код и цитата.",
      "Скрывайте панель мгновенно при снятии выделения или клике в другую область экрана."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-qr-code-handoff-desktop-to-mobile",
    name: "UxDesignQrCodeHandoffDesktopToMobileSkill",
    displayName: "Seamless Desktop-to-Mobile QR Code Session Handoff",
    categoryId: "uxDesign",
    description: "Facilitates frictionless device switching (e.g. ID photo verification) by generating instant pre-authenticated mobile QR codes.",
    tags: ["ux-design", "qr-code", "device-handoff", "mobile-onboarding", "cross-platform"],
    sectionName: "Cross-Device QR Code Handoff Standards",
    ruSectionName: "Бесшовный переход с десктопа на смартфон по QR-коду (Device Handoff)",
    instructions: [
      "Generate an encrypted single-use QR code linking to the exact active step on mobile web.",
      "Listen for real-time mobile completion events via WebSocket to advance the desktop screen automatically.",
      "Expire QR code tokens after 3 minutes for enterprise security."
    ],
    ruInstructions: [
      "Генерируйте одноразовый зашифрованный QR-код для мгновенного открытия нужного шага на смартфоне.",
      "Слушайте завершение действия на смартфоне через WebSocket для автоматического перехода на десктопе.",
      "Устанавливайте время жизни токена QR-кода не более 3 минут в целях безопасности."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-smart-default-pre-population",
    name: "UxDesignSmartDefaultPrePopulationSkill",
    displayName: "Smart Defaults & Context-Aware Form Pre-Population",
    categoryId: "uxDesign",
    description: "Pre-fills form fields intelligently based on user geolocation (country, currency, timezone, language) to minimize typing fatigue.",
    tags: ["ux-design", "smart-defaults", "forms", "conversion", "geolocation"],
    sectionName: "Smart Defaults Pre-Population Standards",
    ruSectionName: "Умные значения по умолчанию (Smart Defaults: автоподстановка валюты, языка и таймзоны)",
    instructions: [
      "Auto-detect user country, currency symbol, and timezone from browser headers and IP signals.",
      "Pre-select the most common recommended plan option with a clear 'Most Popular' badge.",
      "Allow users to easily override pre-populated values with a single click."
    ],
    ruInstructions: [
      "Автоматически определяйте страну, валюту и часовой пояс на основе настроек браузера.",
      "Выделяйте наиболее подходящий рекомендуемый тариф с бейджем «Самый популярный».",
      "Оставляйте пользователю возможность легко изменить предзаполненные значения в 1 клик."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-data-visualization-tooltip-crosshair",
    name: "UxDesignDataVisualizationTooltipCrosshairSkill",
    displayName: "Interactive Chart Tooltips & Synchronized Crosshair Tracking",
    categoryId: "uxDesign",
    description: "Enhances timeseries charts with synchronized vertical crosshair guide lines, interpolated data hover points, and multi-metric tooltip cards.",
    tags: ["ux-design", "data-visualization", "charts", "tooltips", "crosshair"],
    sectionName: "Interactive Chart Crosshair Standards",
    ruSectionName: "Интерактивные графики: синхронный визир (Crosshair) и информативные карточки значений",
    instructions: [
      "Render a vertical crosshair guide line snapping to the nearest X-axis time point.",
      "Display all series metrics formatted cleanly in a unified floating tooltip card.",
      "Synchronize crosshair position across multiple stacked charts on the same dashboard."
    ],
    ruInstructions: [
      "Отображайте вертикальную направляющую линию (Crosshair), привязывающуюся к ближайшей точке времени.",
      "Показывайте значения всех графиков в единой компактной всплывающей карточке.",
      "Синхронизируйте положение визира между несколькими графиками на дашборде одновременно."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-filter-chip-overflow-horizontal-scroll",
    name: "UxDesignFilterChipOverflowHorizontalScrollSkill",
    displayName: "Horizontal Scroll Filter Chips & Gradient Edge Fade Affordance",
    categoryId: "uxDesign",
    description: "Presents categories as a horizontal row of filter chips on mobile with subtle gradient edge masks indicating off-screen scrollability.",
    tags: ["ux-design", "chips", "mobile-filters", "horizontal-scroll", "affordance"],
    sectionName: "Horizontal Filter Chip Standards",
    ruSectionName: "Горизонтальная лента фильтров-чипсов (Filter Chips с градиентным намеком на скролл)",
    instructions: [
      "Apply semi-transparent gradient mask on right edge to visually signal additional scrollable chips.",
      "Scroll selected chip smoothly into central view when tapped.",
      "Support touch momentum scrolling and hide native ugly scrollbars via CSS."
    ],
    ruInstructions: [
      "Добавляйте мягкий полупрозрачный градиент справа, подсказывающий наличие скрытых чипсов за экраном.",
      "Плавно центрируйте выбранный чипс при тапе на него.",
      "Включайте плавный инерционный скролл и скрывайте стандартные полосы прокрутки через CSS."
    ],
    semanticType: "framework"
  },
  {
    id: "ux-design-in-app-keyboard-shortcut-cheat-sheet",
    name: "UxDesignInAppKeyboardShortcutCheatSheetSkill",
    displayName: "Interactive In-App Keyboard Shortcut Cheat Sheet Modal (?)",
    categoryId: "uxDesign",
    description: "Displays a beautifully organized keyboard shortcut cheat sheet dialog triggered by the universal Shift+? / ? hotkey.",
    tags: ["ux-design", "shortcuts", "cheat-sheet", "power-users", "keyboard-navigation"],
    sectionName: "Keyboard Shortcut Cheat Sheet Standards",
    ruSectionName: "Интерактивная шпаргалка горячих клавиш (Вызов по нажатию клавиши ? / Shift+?)",
    instructions: [
      "Bind Shift+? (`?`) to toggle the keyboard shortcuts modal from anywhere in the application.",
      "Categorize shortcuts into logical sections: Navigation, Editing, Actions, and Global Tools.",
      "Render keys as physical keyboard keycap badges (`<kbd>G</kbd> then <kbd>I</kbd>`)."
    ],
    ruInstructions: [
      "Привязывайте клавишу `?` (Shift+?) для вызова шпаргалки горячих клавиш из любого места приложения.",
      "Структурируйте сочетания по разделам: Навигация, Редактирование, Действия и Глобальные функции.",
      "Стилизуйте клавиши в виде физических кнопок клавиатуры (`<kbd>⌘</kbd> + <kbd>K</kbd>`)."
    ],
    semanticType: "framework"
  }
];

// 20 more Data & Knowledge skills -> 115
const DATA_TOPUP_20 = [
  {
    id: "data-knowledge-iceberg-schema-evolution-partition-spec",
    name: "DataKnowledgeIcebergSchemaEvolutionPartitionSpecSkill",
    displayName: "Apache Iceberg In-Place Schema Evolution & Hidden Partitioning",
    categoryId: "dataKnowledge",
    description: "Evolves data lake schemas (add/rename/drop columns) and updates partition specs with zero table rewrites via Iceberg metadata.",
    tags: ["data-knowledge", "iceberg", "schema-evolution", "hidden-partitioning", "data-lakehouse"],
    sectionName: "Apache Iceberg Schema Evolution Standards",
    ruSectionName: "Эволюция схем в Apache Iceberg (Переименование колонок и скрытое партиционирование)",
    instructions: [
      "Assign unique permanent integer IDs to columns, enabling column renames without data rewriting.",
      "Apply Hidden Partitioning transforms (e.g. `days(ts)`, `bucket(16, id)`) transparent to user SQL queries.",
      "Perform time-travel queries across historical snapshot IDs: `SELECT * FROM table VERSION AS OF 12345`."
    ],
    ruInstructions: [
      "Присваивайте колонкам постоянные уникальные ID для переименования полей без перезаписи данных.",
      "Используйте скрытое партиционирование (`days(ts)`), избавляя аналитиков от ручных фильтров по папкам.",
      "Выполняйте запросы Time-Travel к историческим снимкам данных: `VERSION AS OF <snapshot_id>`."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-reciprocal-rank-fusion-rrf-k60",
    name: "DataKnowledgeReciprocalRankFusionRrfK60Skill",
    displayName: "Reciprocal Rank Fusion (RRF k=60) Multi-Retriever Ensemble",
    categoryId: "dataKnowledge",
    description: "Ensembles search results from multiple disparate retrievers (dense, sparse, knowledge graph) using rank reciprocal scoring.",
    tags: ["data-knowledge", "rrf", "search-ensemble", "rag", "retrieval"],
    sectionName: "Reciprocal Rank Fusion Ensemble Protocol",
    ruSectionName: "Ансамбль поисковых систем Reciprocal Rank Fusion (RRF с константой k=60)",
    instructions: [
      "Extract integer rank positions ($r_i$) for each document across individual search engine result lists.",
      "Calculate score: $RRF(d) = \\sum_{m \\in models} \\frac{1}{60 + r_m(d)}$.",
      "Sort merged candidate pool descending by RRF score to select final top-K documents."
    ],
    ruInstructions: [
      "Определяйте порядковый номер ранга ($r_i$) для каждого документа в каждом поисковом источнике.",
      "Суммируйте скоры по формуле: $RRF(d) = \\sum \\frac{1}{60 + rank(d)}$.",
      "Сортируйте объединенный список по убыванию RRF для отбора финального топ-K контекста."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-semantic-chunking-embedding-distance",
    name: "DataKnowledgeSemanticChunkingEmbeddingDistanceSkill",
    displayName: "Semantic Distance Chunking & Embedding Split Points",
    categoryId: "dataKnowledge",
    description: "Splits documents at natural semantic boundary transitions where consecutive sentence embedding cosine distance exceeds threshold.",
    tags: ["data-knowledge", "semantic-chunking", "embeddings", "rag", "nlp"],
    sectionName: "Semantic Embedding Distance Chunking Standards",
    ruSectionName: "Семантический чанкинг по косинусному расстоянию соседних предложений",
    instructions: [
      "Compute embedding vectors for sliding consecutive sentence pairs across the document.",
      "Calculate cosine distance deltas; place chunk split points at local distance spike peaks exceeding percentile threshold (95th percentile).",
      "Keep semantically coherent paragraphs intact while separating distinct conceptual topic shifts."
    ],
    ruInstructions: [
      "Вычисляйте эмбеддинги для последовательных пар предложений по всему тексту документа.",
      "Находите локальные пики косинусного расстояния, сигнализирующие о смене темы повествования.",
      "Разделяйте текст в точках смысловых переходов, сохраняя логически связанные абзацы едиными."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-colbert-late-interaction-token-multivector",
    name: "DataKnowledgeColbertLateInteractionTokenMultivectorSkill",
    displayName: "ColBERTv2 Late Interaction Token-Level Multi-Vector Retrieval",
    categoryId: "dataKnowledge",
    description: "Performs fine-grained retrieval by computing all-pairs MaxSim similarity between individual query and document token embedding matrices.",
    tags: ["data-knowledge", "colbert", "late-interaction", "multivector", "information-retrieval"],
    sectionName: "ColBERT Late Interaction Standards",
    ruSectionName: "Поиск с поздним взаимодействием ColBERTv2 (Потокеновые мультивекторы и MaxSim)",
    instructions: [
      "Generate independent token vector matrices for queries ($Q$) and document passages ($D$).",
      "Calculate late interaction relevance via MaxSim operator: $\\sum_{q \\in Q} \\max_{d \\in D} (q \\cdot d)$.",
      "Compress token vectors using residual centroid quantization to achieve millisecond search speed."
    ],
    ruInstructions: [
      "Формируйте матрицы потокеновых векторов для запроса и каждого фрагмента документа.",
      "Рассчитывайте релевантность через оператор MaxSim: сумма максимальных скалярных произведений токенов.",
      "Сжимайте векторы токенов через остаточное квантование (Residual Quantization) для экономии RAM."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-zstandard-dictionary-compression-json",
    name: "DataKnowledgeZstandardDictionaryCompressionJsonSkill",
    displayName: "Zstandard (zstd) Pre-Trained Dictionary Compression for JSON Feeds",
    categoryId: "dataKnowledge",
    description: "Trains domain-specific 110KB ZSTD dictionaries over representative JSON payloads, achieving 5x higher compression ratios on small records.",
    tags: ["data-knowledge", "zstd", "compression", "json", "dictionary-training"],
    sectionName: "Zstandard Dictionary Compression Standards",
    ruSectionName: "Сжатие мелких JSON-записей через обученные словари Zstandard (ZSTD Dictionary)",
    instructions: [
      "Train a shared 110KB ZSTD dictionary over a sample corpus of 10,000 representative JSON payloads.",
      "Compress and decompress small records referencing the pre-shared dictionary ID.",
      "Achieve 80% size reduction on small 500-byte JSON records where standard gzip fails."
    ],
    ruInstructions: [
      "Обучайте общий словарь ZSTD размером 110 КБ на выборке из 10 000 типичных JSON-сообщений.",
      "Сжимайте и распаковывайте мелкие записи с указанием идентификатора обученного словаря.",
      "Достигайте 80% сжатия даже на коротких JSON-записях (до 500 байт), где gzip малоэффективен."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-sparql-knowledge-graph-ontology-w3c",
    name: "DataKnowledgeSparqlKnowledgeGraphOntologyW3cSkill",
    displayName: "W3C RDF/OWL Knowledge Graph Ontologies & SPARQL 1.1 Query Engine",
    categoryId: "dataKnowledge",
    description: "Models enterprise domains in W3C OWL ontologies, executing expressive SPARQL pattern queries and RDFS inferencing.",
    tags: ["data-knowledge", "sparql", "rdf", "owl", "ontology", "semantic-web"],
    sectionName: "W3C Semantic Graph Standards",
    ruSectionName: "Онтологии W3C RDF/OWL и графовые запросы SPARQL 1.1",
    instructions: [
      "Define formal Class hierarchies and Object/Datatype properties using W3C OWL2 vocabulary.",
      "Query relationship patterns using SPARQL 1.1 `SELECT`, `CONSTRUCT`, and `ASK` graph operators.",
      "Enable RDFS rule-based reasoning engines to materialize implicit domain relationships automatically."
    ],
    ruInstructions: [
      "Описывайте иерархии классов и свойства связей на формальном языке W3C OWL2.",
      "Составляйте графовые запросы на языке SPARQL 1.1 (`SELECT`, `CONSTRUCT`, `OPTIONAL`).",
      "Используйте движки логического вывода RDFS для автоматического раскрытия неявных связей."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-feature-store-feast-online-offline",
    name: "DataKnowledgeFeatureStoreFeastOnlineOfflineSkill",
    displayName: "Feast Feature Store: Low-Latency Redis Online & BigQuery Offline Sync",
    categoryId: "dataKnowledge",
    description: "Maintains ML feature parity across offline batch training datasets (BigQuery/Snowflake) and sub-10ms online inference caches (Redis).",
    tags: ["data-knowledge", "feature-store", "feast", "machine-learning", "redis"],
    sectionName: "ML Feature Store Architecture",
    ruSectionName: "Хранилище фичей для ML (Feast Feature Store: Redis Online и BigQuery Offline)",
    instructions: [
      "Define feature views and entity keys in declarative Feast Python / YAML specifications.",
      "Materialize scheduled batch features incrementally to Redis for sub-10ms real-time model inference.",
      "Generate point-in-time correct historical feature matrices for offline training to prevent data leakage."
    ],
    ruInstructions: [
      "Определяйте фичи и ключи сущностей в декларативных конфигурациях Feast.",
      "Инкрементально материализуйте фичи в Redis для доступа модели в реальном времени (<10 мс).",
      "Формируйте исторические обучающие выборки с учетом временных меток (Point-in-Time) для защиты от утечки данных."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-data-diff-automated-regression-testing",
    name: "DataKnowledgeDataDiffAutomatedRegressionTestingSkill",
    displayName: "Automated Data-Diff Regression Testing & SQL Schema Migration Auditing",
    categoryId: "dataKnowledge",
    description: "Compares billion-row source and target tables row-by-row and column-by-column (Datafold / data-diff) to catch silent data corruption in CI/CD.",
    tags: ["data-knowledge", "data-diff", "testing", "ci-cd", "regression", "dbt"],
    sectionName: "Data-Diff Regression Testing Standards",
    ruSectionName: "Автоматизированное сравнение датасетов (Data-Diff в CI/CD для выявления расхождений)",
    instructions: [
      "Hash row primary keys and column values into algorithmic checksum buckets to detect exact discrepancies.",
      "Run automated data-diff comparisons between production and staging tables during pull request CI runs.",
      "Block deployment if value discrepancies or unexplained row-count shifts exceed 0.00% tolerance."
    ],
    ruInstructions: [
      "Хэшируйте строки и значения полей в контрольные суммы для мгновенного поиска расхождений.",
      "Запускайте автоматическое сравнение таблиц продакшена и стейджинга при каждом пулл-реквесте в CI/CD.",
      "Блокируйте выкатку изменений при обнаружении несанкционированных искажений данных."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-anomalous-data-drift-ks-test",
    name: "DataKnowledgeAnomalousDataDriftKsTestSkill",
    displayName: "Statistical Data Drift Detection: Kolmogorov-Smirnov & Population Stability Index (PSI)",
    categoryId: "dataKnowledge",
    description: "Monitors numerical distribution shift and categorical concept drift between baseline training distributions and live production feeds.",
    tags: ["data-knowledge", "data-drift", "ks-test", "psi", "monitoring", "mlops"],
    sectionName: "Data Drift Detection Standards",
    ruSectionName: "Обнаружение дрейфа данных (Тест Колмогорова-Смирнова и индекс PSI)",
    instructions: [
      "Run two-sample Kolmogorov-Smirnov (KS) tests on continuous numerical features to detect statistical drift ($p < 0.05$).",
      "Calculate Population Stability Index (PSI) on binned features: alert when $PSI > 0.2$ indicates significant distribution change.",
      "Trigger automated retraining pipelines when feature drift crosses warning thresholds."
    ],
    ruInstructions: [
      "Применяйте двухвыборочный критерий Колмогорова-Смирнова для непрерывных числовых признаков ($p < 0.05$).",
      "Рассчитывайте индекс стабильности популяции (PSI): поднимайте тревогу при $PSI > 0.2$.",
      "Инициируйте автоматический пересчет статистик или переобучение моделей при фиксации дрейфа."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-geospatial-h3-hexagonal-indexing",
    name: "DataKnowledgeGeospatialH3HexagonalIndexingSkill",
    displayName: "Uber H3 Spatial Hexagonal Hierarchical Spatial Indexing",
    categoryId: "dataKnowledge",
    description: "Indexes geographic coordinates into hierarchical hexagonal grid cells (resolutions 0-15) for $O(1)$ spatial aggregations and k-ring lookups.",
    tags: ["data-knowledge", "h3", "geospatial", "hexagons", "spatial-indexing", "gis"],
    sectionName: "Uber H3 Spatial Indexing Standards",
    ruSectionName: "Геопространственная индексация Uber H3 (Иерархические шестиугольники и k-ring соседи)",
    instructions: [
      "Convert latitude/longitude coordinate pairs to 64-bit H3 integer cell indexes at resolution 8-9 (neighborhood level).",
      "Perform spatial radius searches using `H3.gridDisk(cell, k)` for constant $O(1)$ neighbor cell retrieval.",
      "Aggregate metrics across hexagonal hierarchies without boundary distortion common in square grids."
    ],
    ruInstructions: [
      "Преобразуйте координаты широты и долготы в 64-битные целочисленные индексы H3 (разрешение 8–9).",
      "Выполняйте поиск в радиусе через `gridDisk(cell, k)`, находя соседние соты за $O(1)$ без тригонометрии.",
      "Агрегируйте пространственные данные по гексагонам без искажений на границах, свойственных прямоугольным сеткам."
    ],
    semanticType: "framework"
  },
  {
    id: "data-knowledge-bloom-filter-probabilistic-indexing",
    name: "DataKnowledgeBloomFilterProbabilisticIndexingSkill",
    displayName: "Probabilistic LSM-Tree Bloom Filters & Key Non-Existence Checks",
    categoryId: "dataKnowledge",
    description: "Tunes Bloom filter bit arrays and hash functions in RocksDB/Cassandra LSM storage to avoid expensive disk lookups for missing keys.",
    tags: ["data-knowledge", "bloom-filter", "lsm-tree", "storage-engines", "database-tuning"],
    sectionName: "Probabilistic Storage Indexing Standards",
    ruSectionName: "Фильтры Блума в LSM-деревьях (RocksDB / Cassandra: исключение лишних чтений с диска)",
    instructions: [
      "Size Bloom filter bit allocation to target 1% false positive probability: $m = -\\frac{n \\ln p}{(\\ln 2)^2}$ (approx 10 bits/key).",
      "Compute optimal number of Murmur3 hash functions: $k = \\frac{m}{n} \\ln 2$ (approx 7 hashes).",
      "Eliminate 99% of unnecessary SSTable disk reads for non-existent key lookups."
    ],
    ruInstructions: [
      "Рассчитывайте размер битового массива фильтра Блума для 1% вероятности ложных срабатываний (~10 бит на ключ).",
      "Используйте оптимальное число хэш-функций Murmur3 ($k = 7$) для равномерного распределения бит.",
      "Исключайте 99% ненужных обращений к диску при поиске отсутствующих ключей в таблицах SSTable."
    ],
    semanticType: "framework"
  }
];

appendSkills('uxDesign', UX_TOPUP_10);
appendSkills('dataKnowledge', DATA_TOPUP_20);

console.log('Final top-up appended successfully!');
