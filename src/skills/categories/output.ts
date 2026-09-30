import type { SkillDefinition } from '../skillsRegistry';
import {
  ensureSection,
  isRussianText,
  parsePromptSections,
  reconstructPrompt,
  deduplicatePromptSections,
  createStandardSkillTransform,
} from '../skillHelpers';

export const OUTPUT_SKILLS: Record<string, SkillDefinition> = {
  'json-schema-strict': {
    id: 'json-schema-strict',
    name: 'JsonSchemaStrictSkill',
    displayName: 'Strict JSON Schema & Raw Payload',
    categoryId: 'output',
    description: 'Enforces pure, schema-validated JSON payload without conversational prose or markdown fences.',
    tags: ['output', 'json', 'schema', 'strict', 'payload', 'api'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Спецификация Вывода: Строгий JSON (Raw JSON)',
        'Output Specification: Strict Valid JSON (Raw Payload)',
        [
          '- **Чистый валидный JSON**: Ответ должен представлять собой строго валидный JSON-объект без пояснительного текста до или после него.',
          '- **Запрет Markdown-оберток**: При прямом API-вызове не использовать обрамление ```json ... ``` (только чистый raw JSON).',
          '- **Соответствие типам полей**: Строго соблюдать типы (числа как `number`, флаги как `boolean`, списки как `array`), без сериализации всего в строки.',
        ],
        [
          '- **Raw Valid JSON**: Emit strictly valid JSON payload with zero surrounding conversational text or markdown code fences.',
          '- **Strict Schema Conformance**: Strictly conform to defined field names and JSON Schema type signatures (numbers, booleans, arrays).',
          '- **Escape Special Characters**: Properly escape internal quotes and control characters to guarantee parser safety.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'executive-markdown-table': {
    id: 'executive-markdown-table',
    name: 'ExecutiveMarkdownTableSkill',
    displayName: 'Dense Executive Markdown Matrix',
    categoryId: 'output',
    description: 'Formats comparative evaluations, KPI benchmarks, and trade-offs into dense Markdown tables.',
    tags: ['output', 'markdown', 'table', 'matrix', 'comparison', 'executive'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Формат Выдачи: Сравнительная Markdown-Таблица',
        'Output Format: High-Density Executive Markdown Matrix',
        [
          '- **Табличный формат**: Оформить ключевые выводы и сравнения в виде аккуратной таблицы Markdown с выровненными заголовками.',
          '- **Количественные колонки**: Включить столбцы: `[Параметр / Решение | Оценка | Плюсы | Минусы | Затраты | Итоговый вердикт]`.',
          '- **Лаконичность ячеек**: Каждая ячейка должна содержать плотную, емкую информацию без растянутых абзацев.',
        ],
        [
          '- **Structured Markdown Matrix**: Deliver findings in a clean, high-density markdown table with explicit column headers.',
          '- **Quantitative Dimensions**: Structure table headers as: `[Dimension / Candidate | Score (1-5) | Core Advantages | Critical Risks | TCO Impact | Final Verdict]`.',
          '- **Cell Conciseness**: Keep cell text information-dense and concise; avoid multiline paragraph sprawl inside table cells.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'hierarchical-report': {
    id: 'hierarchical-report',
    name: 'HierarchicalReportSkill',
    displayName: '3-Tier Executive & Technical Report',
    categoryId: 'output',
    description: 'Enforces 3-tier report hierarchy: 1. Executive Summary, 2. Deep Technical Breakdown, 3. Actionable Next Steps.',
    tags: ['output', 'report', 'executive', 'hierarchy', 'structure', 'summary'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Трехуровневая Иерархия Отчета (3-Tier Report)',
        '3-Tier Executive & Technical Report Structure',
        [
          '- **Уровень 1: Executive Summary**: 2–3 концентрированных предложения для топ-менеджмента (главный вывод, риски, ROI).',
          '- **Уровень 2: Глубокий технический разбор**: Исчерпывающий архитектурный и инженерный анализ с графиками/кодом.',
          '- **Уровень 3: План внедрения (Next Steps)**: Конкретные шаги реализации с ответственными и сроками.',
        ],
        [
          '- **Tier 1: Executive Summary**: 2-3 high-impact sentences for C-suite leadership (core verdict, key risk, expected ROI).',
          '- **Tier 2: Deep Technical Breakdown**: Exhaustive architectural, systemic, and mathematical analysis.',
          '- **Tier 3: Implementation Roadmap (Next Steps)**: Concrete execution checklist with owners, milestones, and SLAs.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'action-items-matrix': {
    id: 'action-items-matrix',
    name: 'ActionItemsMatrixSkill',
    displayName: 'Preventative Action Items Matrix (P0-P2)',
    categoryId: 'output',
    description: 'Formats actionable remediations into a prioritized table with Priority (P0-P2), Owner, SLA, and Verification Gates.',
    tags: ['output', 'action-items', 'matrix', 'priorities', 'sla', 'verification'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Матрица Корректирующих Действий (Action Items Matrix)',
        'Preventative Action Items Matrix (P0-P2)',
        [
          '- **Формат таблицы мер**: Оформить задачи в виде таблицы: `| ID | Действие / Мера защиты | Категория (Fix/Detect/Prevent) | Приоритет (P0-P2) | Ответственный | Дедлайн | Способ проверки |`.',
          '- **Строгая шкала приоритетов**: P0 (Блокирует релиз / Срочно 24ч), P1 (Высокий / 1 неделя), P2 (Плановый / 1 месяц).',
          '- **Критерий верификации**: Каждая строка должна содержать конкретный способ автоматической или регламентной проверки выполнения.',
        ],
        [
          '- **Action Ledger Format**: Render table: `| ID | Action Item / Safeguard | Type (Fix/Detect/Prevent) | Priority (P0-P2) | Owner | Due Date | Verification Gate |`.',
          '- **Rigorous SLA Priority**: P0 (Production Blocker / 24h), P1 (High Impact / 1 Week), P2 (Hardening / 1 Month).',
          '- **Verification Criteria**: Every item must specify an automated test or signed review gate confirming completion.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'yaml-config-spec': {
    id: 'yaml-config-spec',
    name: 'YamlConfigSpecSkill',
    displayName: 'Clean YAML Configuration Spec',
    categoryId: 'output',
    description: 'Formats output as production-ready, linted YAML with descriptive inline schema comments.',
    tags: ['output', 'yaml', 'config', 'devops', 'kubernetes', 'schema'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Спецификация Вывода: Валидный YAML Конфиг',
        'Output Specification: Production-Ready YAML Config',
        [
          '- **Валидный YAML**: Сгенерировать синтаксически корректный YAML с отступами строго в 2 пробела.',
          '- **Инлайн-комментарии**: Снабдить ключевые директивы краткими поясняющими комментариями (`#`).',
          '- **Безопасные дефолты**: Включить готовые к использованию настройки безопасности и лимитов ресурсов.',
        ],
        [
          '- **Valid YAML Syntax**: Produce strictly valid YAML with consistent 2-space indentation and zero tab characters.',
          '- **Inline Explanatory Comments**: Document critical configuration keys and thresholds with clear `#` comments.',
          '- **Hardened Defaults**: Include secure baseline defaults for resource limits, timeouts, and security policies.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'mermaid-diagram-flow': {
    id: 'mermaid-diagram-flow',
    name: 'MermaidDiagramFlowSkill',
    displayName: 'Mermaid.js Architectural Diagram',
    categoryId: 'output',
    description: 'Generates valid Mermaid.js diagrams (flowchart TD/LR, sequenceDiagram, classDiagram, erDiagram).',
    tags: ['output', 'mermaid', 'diagram', 'flowchart', 'sequence', 'architecture', 'visual'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Визуализация Архитектуры в Mermaid.js',
        'Visual Architecture Flow in Mermaid.js Syntax',
        [
          '- **Синтаксис Mermaid**: Оформить диаграмму в блоке ```mermaid ... ``` (тип `flowchart TD` или `sequenceDiagram`).',
          '- **Читаемость узлов**: Использовать понятные идентификаторы узлов и явные подписи на стрелках взаимодействия.',
          '- **Сегментация подсистем (Subgraphs)**: Группировать связанные компоненты в подграфы (`subgraph Client`, `subgraph Backend`, `subgraph DB`).',
        ],
        [
          '- **Valid Mermaid Syntax**: Enclose diagram in a ```mermaid ... ``` codeblock (e.g. `flowchart TD` or `sequenceDiagram`).',
          '- **Descriptive Node Labels**: Use clean alphanumeric IDs with descriptive bracketed labels and labeled message arrows.',
          '- **Subgraph Isolation**: Group architectural tiers into logical subgraphs (`subgraph Frontend`, `subgraph Microservices`, `subgraph Persistence`).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'csv-tabular-stream': {
    id: 'csv-tabular-stream',
    name: 'CsvTabularStreamSkill',
    displayName: 'RFC-4180 Valid CSV Data Stream',
    categoryId: 'output',
    description: 'Outputs pure tabular CSV data adhering to RFC 4180 standards with quoted text fields and comma delimiters.',
    tags: ['output', 'csv', 'tabular', 'spreadsheet', 'data', 'rfc-4180'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Формат Вывода: Табличные Данные CSV (RFC 4180)',
        'Output Format: RFC-4180 Compliant Tabular CSV Stream',
        [
          '- **Стандарт RFC 4180**: Вывод строго в формате CSV с запятой в качестве разделителя.',
          '- **Строка заголовков**: Первая строка должна содержать канонические имена столбцов.',
          '- **Экранирование строк**: Оборачивать текстовые поля, содержащие запятые или переводы строк, в двойные кавычки (`"текст, с запятой"`).',
        ],
        [
          '- **RFC 4180 Compliance**: Emit pure comma-separated values adhering strictly to RFC 4180 standards.',
          '- **Header Row**: First line must define unambiguous canonical column header names.',
          '- **Quote Escaping**: Enclose fields containing commas, line breaks, or double quotes inside standard double quotes (`"escaped, field"`).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'bulleted-executive-memo': {
    id: 'bulleted-executive-memo',
    name: 'BulletedExecutiveMemoSkill',
    displayName: 'Bulleted C-Suite Executive Memo',
    categoryId: 'output',
    description: 'Formats briefings into dense, highly scannable bullet points optimized for C-suite decision-makers.',
    tags: ['output', 'memo', 'executive', 'c-suite', 'bullets', 'scannable'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Формат Вывода: Исполнительный Меморандум (Executive Memo)',
        'Output Format: High-Scannability Executive Memo',
        [
          '- **Плотный списочный стиль**: Излагать информацию короткими, емкими буллетами с выделением ключевого тезиса в начале каждого пункта жирным шрифтом.',
          '- **Максимум конкретики**: Заменять общие фразы на точные цифры, сроки и имена ответственных.',
          '- **Раздел решений (Decision Required)**: Завершить мемо блоком «Требуемые решения» с четкими вариантами выбора (Option A / Option B).',
        ],
        [
          '- **Bold-Prefixed Bullets**: Structure insights into dense, scannable bullet items with bold lead phrases.',
          '- **Extreme Metric Density**: Replace qualitative generalities with exact dollar amounts, dates, and quantitative KPIs.',
          '- **Decision Gate Section**: Conclude with a dedicated "Decisions Required" section detailing binary options (Option A vs Option B).',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'openapi-swagger-spec': {
    id: 'openapi-swagger-spec',
    name: 'OpenapiSwaggerSpecSkill',
    displayName: 'OpenAPI 3.1 REST API Specification',
    categoryId: 'output',
    description: 'Produces complete OpenAPI 3.1 YAML/JSON REST endpoint definitions with requestBody, parameters, and 2xx/4xx/5xx responses.',
    tags: ['output', 'openapi', 'swagger', 'api', 'rest', 'contract'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Спецификация REST API (OpenAPI 3.1 / Swagger)',
        'REST API Specification (OpenAPI 3.1 / Swagger YAML)',
        [
          '- **Стандарт OpenAPI 3.1**: Сгенерировать спецификацию API в формате YAML со всеми блоками (`paths`, `components/schemas`, `security`).',
          '- **Исчерпывающие ответы**: Описать схемы успешных ответов (`200 OK`, `201 Created`) и кодов ошибок (`400`, `401`, `404`, `429`, `500`).',
          '- **Примеры payloads**: Включить реалистичные `example` объекты для каждого тела запроса и ответа.',
        ],
        [
          '- **OpenAPI 3.1 Standard**: Deliver API specification in clean YAML covering `paths`, `parameters`, `requestBody`, and `components/schemas`.',
          '- **Comprehensive HTTP Codes**: Document exact schema models for success (`200`, `201`) and failure (`400`, `401`, `404`, `429`, `500`) states.',
          '- **Realistic Examples**: Include concrete `example` blocks for all request payloads and response bodies.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'changelog-keep-a-changelog': {
    id: 'changelog-keep-a-changelog',
    name: 'ChangelogKeepAChangelogSkill',
    displayName: 'Keep a Changelog & SemVer Spec',
    categoryId: 'output',
    description: 'Formats release notes strictly conforming to Keep a Changelog standards (Added, Changed, Deprecated, Removed, Fixed, Security).',
    tags: ['output', 'changelog', 'semver', 'release-notes', 'git', 'versioning'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Формат Чейнджлога (Keep a Changelog & SemVer)',
        'Keep a Changelog & Semantic Versioning Format',
        [
          '- **Категории изменений**: Группировать изменения строго по разделам: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`.',
          '- **Семантическое версионирование (SemVer)**: Присваивать версии в формате `[MAJOR.MINOR.PATCH] - YYYY-MM-DD`.',
          '- **Понятность для разработчиков**: Каждая запись должна объяснять, что именно изменилось и как это влияет на потребителей API.',
        ],
        [
          '- **Standard Change Categories**: Group updates strictly under: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`.',
          '- **Semantic Versioning Header**: Format version headings as `## [MAJOR.MINOR.PATCH] - YYYY-MM-DD`.',
          '- **Consumer Impact Clarity**: Clearly communicate breaking changes and migration pathways for API consumers.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'asciidoc-technical-manual': {
    id: 'asciidoc-technical-manual',
    name: 'AsciidocTechnicalManualSkill',
    displayName: 'AsciiDoc Technical Manual Format',
    categoryId: 'output',
    description: 'Formats technical documentation in structured AsciiDoc syntax with admonitions (NOTE, TIP, WARNING, IMPORTANT).',
    tags: ['output', 'asciidoc', 'documentation', 'manual', 'admonitions'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Формат Технической Документации AsciiDoc',
        'AsciiDoc Technical Documentation Format',
        [
          '- **Разметка AsciiDoc**: Использовать синтаксис AsciiDoc (`= Заголовок 1`, `== Заголовок 2`, `[source,typescript]`).',
          '- **Блоки предостережений**: Использовать стандартные блоки `NOTE:`, `TIP:`, `IMPORTANT:`, `WARNING:`, `CAUTION:`.',
          '- **Перекрестные ссылки**: Оформить перекрестные ссылки на разделы и таблицы через `<<section-id, Название>>`.',
        ],
        [
          '- **AsciiDoc Markup**: Structure content in standard AsciiDoc (`= Document Title`, `== Section`, `[source,typescript]`).',
          '- **Admonition Blocks**: Emphasize critical operational constraints using `NOTE:`, `TIP:`, `IMPORTANT:`, `WARNING:`, `CAUTION:`.',
          '- **Cross-References & Tables**: Structure dense data into AsciiDoc table syntax `|===` with anchor references `<<section-id>>`.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'latex-mathematical-proof': {
    id: 'latex-mathematical-proof',
    name: 'LatexMathematicalProofSkill',
    displayName: 'LaTeX Formal Mathematical Proof Schema',
    categoryId: 'output',
    description: 'Formats mathematical equations, formal proofs, and asymptotic complexity in valid LaTeX syntax ($$ ... $$).',
    tags: ['output', 'latex', 'math', 'proof', 'equations', 'algorithmic'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Формат Математических Доказательств LaTeX',
        'LaTeX Mathematical Proof & Formula Notation',
        [
          '- **Синтаксис LaTeX**: Оформлять выносные математические формулы в `$$ ... $$`, а инлайн-символы в `$ ... $`.',
          '- **Пошаговое доказательство**: Структурировать математические доказательства: Лемма -> Теорема -> Шаги преобразований -> Q.E.D. (■).',
          '- **Асимптотическая сложность**: Указывать временную и пространственную сложность в нотации Big-O: $\\mathcal{O}(N \\log N)$.',
        ],
        [
          '- **Valid LaTeX Formatting**: Format display equations inside `$$ ... $$` and inline variables inside `$ ... $`.',
          '- **Formal Proof Architecture**: Structure mathematical reasoning as: Lemma -> Theorem -> Proof Derivation -> Q.E.D. (■).',
          '- **Complexity Bounds**: State formal asymptotic bounds in standard Big-O / Omega notation: $\\mathcal{O}(N \\log N)$, $\\Omega(1)$.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'terminal-cli-manpage': {
    id: 'terminal-cli-manpage',
    name: 'TerminalCliManpageSkill',
    displayName: 'Unix CLI Manpage Specification',
    categoryId: 'output',
    description: 'Formats command-line tool documentation in standard Unix manpage style (NAME, SYNOPSIS, DESCRIPTION, OPTIONS, EXAMPLES, EXIT STATUS).',
    tags: ['output', 'cli', 'manpage', 'terminal', 'unix', 'commands'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Формат Справки CLI Manpage (Unix Standard)',
        'Unix CLI Manpage Documentation Specification',
        [
          '- **Стандартные разделы**: Оформить документ по секциям: `NAME`, `SYNOPSIS`, `DESCRIPTION`, `OPTIONS`, `EXAMPLES`, `EXIT STATUS`.',
          '- **Флаги и аргументы**: Для каждой опции описать короткий и длинный флаг (`-v, --verbose`), тип аргумента и дефолт.',
          '- **Примеры вызова**: Предоставить 3–4 готовых команды терминала для типичных сценариев использования.',
        ],
        [
          '- **Standard Manpage Sections**: Structure document with uppercase section headers: `NAME`, `SYNOPSIS`, `DESCRIPTION`, `OPTIONS`, `EXAMPLES`, `EXIT STATUS`.',
          '- **Option Flags Specification**: Detail short and long flags (`-c, --config <path>`), expected types, and environment variable fallbacks.',
          '- **Concrete Command Examples**: Include 3-4 copy-pasteable terminal commands illustrating common workflows.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'ndjson-event-stream': {
    id: 'ndjson-event-stream',
    name: 'NdjsonEventStreamSkill',
    displayName: 'Newline-Delimited JSON (NDJSON) Stream',
    categoryId: 'output',
    description: 'Formats high-throughput batch or streaming records as one valid JSON object per line (NDJSON/JSONL).',
    tags: ['output', 'ndjson', 'jsonl', 'streaming', 'batch', 'data-pipeline'],
    transform: (prompt: string) => {
      const isRu = isRussianText(prompt);
      const { preamble, sections } = parsePromptSections(prompt);
      ensureSection(
        sections,
        'output_format',
        'Формат Построчного JSON (NDJSON / JSON Lines)',
        'Newline-Delimited JSON (NDJSON / JSONL) Stream Format',
        [
          '- **Один объект на строку**: Каждая строка вывода должна представлять собой отдельный, полностью валидный JSON-объект без запятых в конце строк.',
          '- **Запрет общего массива**: Не оборачивать поток строк в квадратные скобки `[...]`.',
          '- **Временная метка и событие**: Каждый JSON-объект должен содержать поля `timestamp` (ISO-8601) и `event_type`.',
        ],
        [
          '- **One JSON Object Per Line**: Every single line must be an independent, strictly valid JSON object with zero trailing commas.',
          '- **No Outer Array Wrapping**: Do not wrap lines in an outer `[...]` array bracket.',
          '- **Standard Telemetry Keys**: Include ISO-8601 `timestamp` and `event_type` identifiers in every emitted JSON record.',
        ],
        isRu
      );
      return reconstructPrompt(preamble, deduplicatePromptSections(sections, isRu));
    },
  },

  'streaming-sse-event-stream': {
    id: 'streaming-sse-event-stream',
    name: 'StreamingSseEventStreamSkill',
    displayName: 'Server-Sent Events (SSE) Protocol Stream',
    categoryId: 'output',
    description: 'Emits standard SSE wire protocol (`id`, `event`, `data: {...}\n\n`) for real-time AI and telemetry pipelines.',
    tags: ['output', 'sse', 'streaming', 'realtime', 'protocol', 'events'],
    transform: createStandardSkillTransform(
      'output_format',
      'Формат Потока Server-Sent Events (SSE Wire Protocol)',
      'Server-Sent Events (SSE Wire Protocol) Specification',
      [
        '- **Спецификация SSE**: Вывод должен строго соответствовать стандарту W3C Server-Sent Events с разделителем двойного перевода строки `\\n\\n`.',
        '- **Формат кадров**: Каждый фрейм состоит из полей: `event: <имя_события>\\ndata: <json_payload>\\n\\n` (опционально `id: <seq>`).',
        '- **Кадр завершения**: По завершении потока передавать терминальный маркер `event: done\\ndata: [DONE]\\n\\n`.',
      ],
      [
        '- **W3C SSE Standard**: Format emitted data strictly conforming to Server-Sent Events wire format delimited by double newlines `\\n\\n`.',
        '- **Frame Structure**: Every chunk must follow `event: <name>\\ndata: <json_payload>\\n\\n` with optional monotonic `id: <int>` sequence.',
        '- **Stream Termination**: Emit an explicit terminal sentinel `event: done\\ndata: [DONE]\\n\\n` upon pipeline completion.',
      ]
    ),
  },

  'unified-diff-patch': {
    id: 'unified-diff-patch',
    name: 'UnifiedDiffPatchSkill',
    displayName: 'Strict Unified Diff (Git Patch Format)',
    categoryId: 'output',
    description: 'Formats code modifications strictly as standard unified diffs (`diff --git a/... b/...`, `@@ -l,s +l,s @@`) executable via `git apply`.',
    tags: ['output', 'diff', 'patch', 'git', 'code', 'vcs'],
    transform: createStandardSkillTransform(
      'output_format',
      'Формат Унифицированного Git Diff Патча',
      'Strict Unified Diff Patch (Git Apply Compatible)',
      [
        '- **Стандарт Git Diff**: Оформить изменения строго в формате unified diff, совместимом с утилитой `git apply` или `patch -p1`.',
        '- **Ханки и контекст**: Каждый блок изменений должен содержать точный заголовок `@@ -start,count +start,count @@` и 3 строки неизменного контекста.',
        '- **Запрет пояснений вокруг**: Выдавать только чистый блок патча без разговорного текста до и после кода.',
      ],
      [
        '- **Standard Git Unified Diff**: Output patch strictly compatible with `git apply` or `patch -p1` command-line tools.',
        '- **Accurate Hunk Headers**: Calculate precise line offsets and lengths in headers `@@ -start,count +start,count @@` with 3 lines of context.',
        '- **Zero Prose Framing**: Deliver pure diff syntax without conversational introduction or post-hoc commentary.',
      ]
    ),
  },

  'json-api-spec-v1': {
    id: 'json-api-spec-v1',
    name: 'JsonApiSpecV1Skill',
    displayName: 'JSON:API v1.1 Specification Contract',
    categoryId: 'output',
    description: 'Encapsulates data models according to strict jsonapi.org standards with `data`, `attributes`, `relationships`, and `included`.',
    tags: ['output', 'jsonapi', 'spec', 'rest', 'standards', 'api'],
    transform: createStandardSkillTransform(
      'output_format',
      'Спецификация JSON:API v1.1 (jsonapi.org)',
      'JSON:API v1.1 Standard Response Architecture',
      [
        '- **Структура верхнего уровня**: Использовать корневые ключи `data`, `errors`, `meta`, `jsonapi: { "version": "1.1" }`.',
        '- **Объекты ресурсов**: Каждый элемент в `data` обязан содержать строковые поля `id` и `type`, а полезную нагрузку группировать в `attributes`.',
        '- **Связи и включения**: Связи оформлять через ключ `relationships` с идентификаторами ресурсов, а детали связей — в массиве `included`.',
      ],
      [
        '- **Root Envelope**: Enforce strict top-level keys `data`, `errors`, `meta`, and `jsonapi: { "version": "1.1" }`.',
        '- **Resource Identity**: Every resource object must specify string `id` and `type` fields, encapsulating payload fields within `attributes`.',
        '- **Compound Documents**: Model foreign keys under `relationships` and resolve full entity representations inside the `included` array.',
      ]
    ),
  },

  'apache-avro-schema': {
    id: 'apache-avro-schema',
    name: 'ApacheAvroSchemaSkill',
    displayName: 'Apache Avro Binary Schema Definition',
    categoryId: 'output',
    description: 'Generates valid Apache Avro JSON schema specifications for Kafka pipelines with type compatibility and docstrings.',
    tags: ['output', 'avro', 'schema', 'kafka', 'streaming', 'data-engineering'],
    transform: createStandardSkillTransform(
      'output_format',
      'Спецификация Схемы Apache Avro (.avsc)',
      'Apache Avro Schema Definition (.avsc) Specification',
      [
        '- **Корневой контракт**: Формат схемы `type: "record"`, с указанием полного `namespace` и понятного `name`.',
        '- **Типизация полей**: Каждое поле в массиве `fields` должно иметь `name`, `type` (с поддержкой union для null), `doc` и значение по умолчанию `default`.',
        '- **Эволюция схем**: Проектировать поля так, чтобы гарантировать обратную совместимость (Backward Compatibility) в Kafka Schema Registry.',
      ],
      [
        '- **Avro Record Envelope**: Declare `type: "record"`, fully qualified `namespace`, and canonical record `name`.',
        '- **Field Signatures**: Each field in `fields` must feature explicit `name`, `type` (including `["null", type]` unions), `doc`, and safe `default`.',
        '- **Evolution Guarantees**: Design schema fields to guarantee strict Backward Compatibility in Schema Registries.',
      ]
    ),
  },

  'csv-tsv-tabular-rfc4180': {
    id: 'csv-tsv-tabular-rfc4180',
    name: 'CsvTsvTabularRfc4180Skill',
    displayName: 'RFC 4180 Compliant CSV / TSV Matrix',
    categoryId: 'output',
    description: 'Formats high-integrity tabular exports strictly conforming to RFC 4180 with proper quotation, escaping, and line breaks.',
    tags: ['output', 'csv', 'tsv', 'rfc4180', 'tabular', 'spreadsheet'],
    transform: createStandardSkillTransform(
      'output_format',
      'Формат Табличных Данных CSV по RFC 4180',
      'RFC 4180 Compliant Tabular CSV / TSV Format',
      [
        '- **Стандарт RFC 4180**: Первая строка — точные названия колонок. Разделитель полей — запятая `,` (или табуляция `\\t` для TSV).',
        '- **Правила экранирования**: Поля, содержащие запятые, переносы строк или кавычки, обязательно заключать в двойные кавычки `""`. Внутренние кавычки дублировать `""`.',
        '- **Одинаковое число столбцов**: Каждая строка обязана содержать ровно такое же количество колонок, как и заголовок.',
      ],
      [
        '- **RFC 4180 Compliance**: Header row mandatory with unambiguous column keys. Standard comma delimiter (or tab for TSV).',
        '- **Quotation & Escaping Rules**: Enclose fields containing delimiters, newlines, or double quotes in `""`. Escape inner quotes as `""`.',
        '- **Column Parity Invariant**: Every emitted data row must contain the exact column count established by the header.',
      ]
    ),
  },

  'postman-collection-v2': {
    id: 'postman-collection-v2',
    name: 'PostmanCollectionV2Skill',
    displayName: 'Postman Collection v2.1.0 Export',
    categoryId: 'output',
    description: 'Generates importable Postman Collection v2.1.0 JSON payloads with pre-request scripts, tests, headers, and body mocks.',
    tags: ['output', 'postman', 'api', 'testing', 'http', 'collection'],
    transform: createStandardSkillTransform(
      'output_format',
      'Спецификация Коллекции Postman v2.1.0',
      'Postman Collection v2.1.0 Specification',
      [
        '- **Схема v2.1.0**: Использовать `schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"` в объекте `info`.',
        '- **Структура запросов**: Группировать эндпоинты по папкам в `item`, задавать метод, заголовки, query-параметры и тело запроса `raw` (JSON).',
        '- **Тестовые скрипты**: Добавлять в `event` тесты `pm.test(...)` на статус 200/201, валидацию времени ответа и JSON-схемы.',
      ],
      [
        '- **Schema Declaration**: Anchor schema as `https://schema.getpostman.com/json/collection/v2.1.0/collection.json` in root `info`.',
        '- **Request Item Hierarchy**: Group endpoints logically inside `item` arrays with parameterized `url`, headers, and `raw` JSON bodies.',
        '- **Automated Assertions**: Embed `pm.test(...)` assertions in the `test` event array validating status codes and schema conformance.',
      ]
    ),
  },

  'cron-crontab-schedule': {
    id: 'cron-crontab-schedule',
    name: 'CronCrontabScheduleSkill',
    displayName: 'POSIX Crontab & Temporal Schedule Matrix',
    categoryId: 'output',
    description: 'Outputs strict 5-part POSIX crontab configurations with human-readable schedule explanations and environment directives.',
    tags: ['output', 'cron', 'crontab', 'devops', 'scheduling', 'automation'],
    transform: createStandardSkillTransform(
      'output_format',
      'Формат Конфигурации Расписания Crontab',
      'POSIX Crontab & Temporal Schedule Specification',
      [
        '- **Синтаксис Cron**: Формировать строки по 5 полям: `минута час день_месяца месяц день_недели /путь/к/команде >> /лог 2>&1`.',
        '- **Поясняющие комментарии**: Перед каждой задачей добавлять комментарий с расшифровкой на человеческом языке и таймзоной (UTC).',
        '- **Переменные окружения**: В начале файла явно задать `SHELL=/bin/bash`, `PATH` и `MAILTO`.',
      ],
      [
        '- **POSIX Cron Syntax**: Structure schedule lines: `minute hour day_of_month month day_of_week /binary >> /log 2>&1`.',
        '- **Human Schedule Annotation**: Precede every cron directive with a human-readable temporal explanation and UTC timezone declaration.',
        '- **Environment Header**: Initialize shell environment variables `SHELL=/bin/bash`, `PATH`, and error notifications at top.',
      ]
    ),
  },

  'docker-compose-v3-spec': {
    id: 'docker-compose-v3-spec',
    name: 'DockerComposeV3SpecSkill',
    displayName: 'Production Docker Compose v3 YAML',
    categoryId: 'output',
    description: 'Formats container infrastructure as production-grade compose YAML with healthchecks, resource limits, and named networks.',
    tags: ['output', 'docker', 'compose', 'containers', 'devops', 'yaml'],
    transform: createStandardSkillTransform(
      'output_format',
      'Спецификация Docker Compose (Production YAML)',
      'Production Docker Compose v3 YAML Specification',
      [
        '- **Стандарты сервисов**: Для каждого сервиса указать `image`, `restart: unless-stopped`, переменные окружения через `${ENV_VAR:-default}`.',
        '- **Healthcheck и зависимости**: Обязательно настраивать `healthcheck` (test, interval, timeout, retries) и `depends_on` с условием `condition: service_healthy`.',
        '- **Ограничения ресурсов**: Включать блок `deploy.resources.limits` (cpus, memory) и изолированные пользовательские сети `networks`.',
      ],
      [
        '- **Service Hardening**: Define explicit `image`, `restart: unless-stopped`, and environment declarations via `${ENV_VAR:-default}`.',
        '- **Healthchecks & Dependencies**: Mandate robust `healthcheck` suites with `depends_on: { service: { condition: service_healthy } }`.',
        '- **Resource Budgets**: Enforce `deploy.resources.limits` (cpus, memory caps) and isolate inter-service traffic via named `networks`.',
      ]
    ),
  },

  'github-actions-workflow': {
    id: 'github-actions-workflow',
    name: 'GithubActionsWorkflowSkill',
    displayName: 'GitHub Actions CI/CD Workflow YAML',
    categoryId: 'output',
    description: 'Formats automated pipelines into strict GitHub Actions workflows with concurrency groups, step caching, and least-privilege tokens.',
    tags: ['output', 'github-actions', 'ci-cd', 'devops', 'yaml', 'automation'],
    transform: createStandardSkillTransform(
      'output_format',
      'Спецификация GitHub Actions Workflow (.github/workflows/*.yml)',
      'GitHub Actions CI/CD Workflow Specification',
      [
        '- **Минимальные права доступа**: Явно объявить блок `permissions` на уровне workflow или job (least privilege principle).',
        '- **Управление конкурентностью**: Задавать `concurrency: group: ${{ github.workflow }}-${{ github.ref }}, cancel-in-progress: true`.',
        '- **Кэширование и шаги**: Использовать официальные экшены с фиксацией версий (напр. `@v4`), кэширование зависимостей и понятные `name` шагов.',
      ],
      [
        '- **Least Privilege Permissions**: Explicitly specify top-level `permissions` block adhering strictly to minimal token access scopes.',
        '- **Concurrency Cancellation**: Configure `concurrency` with `cancel-in-progress: true` to prevent redundant parallel pipeline runs.',
        '- **Version-Pinned Actions**: Pin third-party actions to stable major releases (e.g. `@v4`), configure caching, and label all step names.',
      ]
    ),
  },

  'k8s-manifest-bundle': {
    id: 'k8s-manifest-bundle',
    name: 'K8sManifestBundleSkill',
    displayName: 'Multi-Document Kubernetes Manifest Bundle',
    categoryId: 'output',
    description: 'Generates hardened Kubernetes YAML manifests (Deployment, Service, ConfigMap, PDB, Ingress) separated by `---`.',
    tags: ['output', 'kubernetes', 'k8s', 'manifests', 'devops', 'yaml'],
    transform: createStandardSkillTransform(
      'output_format',
      'Бандл Манифестов Kubernetes (Multi-Doc YAML)',
      'Multi-Document Kubernetes Production Manifest Bundle',
      [
        '- **Разделитель документов**: Разделять ресурсы манифеста тройным дефисом `---`.',
        '- **Безопасность PodSecurity**: Настраивать `securityContext` (`runAsNonRoot: true`, `readOnlyRootFilesystem: true`, `drop: ["ALL"]`).',
        '- **Пробы и ресурсы**: Обязательно указывать `resources.requests` и `resources.limits`, а также `livenessProbe` и `readinessProbe`.',
      ],
      [
        '- **Document Separation**: Delimit discrete Kubernetes manifests using standard `---` document markers.',
        '- **Pod Security Standards**: Enforce hardened `securityContext` (`runAsNonRoot: true`, `readOnlyRootFilesystem: true`, drop capabilities).',
        '- **Telemetry Probes & Quotas**: Require explicit `resources.limits/requests` and fine-tuned `livenessProbe` and `readinessProbe` blocks.',
      ]
    ),
  },

  'terraform-hcl-declarative': {
    id: 'terraform-hcl-declarative',
    name: 'TerraformHclDeclarativeSkill',
    displayName: 'Declarative Terraform / OpenTofu HCL',
    categoryId: 'output',
    description: 'Formats infrastructure code into declarative Terraform HCL with typed variables, validation rules, locals, and outputs.',
    tags: ['output', 'terraform', 'hcl', 'opentofu', 'infrastructure', 'iac'],
    transform: createStandardSkillTransform(
      'output_format',
      'Формат Кода Инфраструктуры Terraform HCL',
      'Declarative Terraform / OpenTofu HCL Specification',
      [
        '- **Модульная структура HCL**: Оформить блоки `terraform { required_version, required_providers }`, `locals`, `variable`, `resource` и `output`.',
        '- **Типизация и валидация**: Каждая переменная `variable` обязана иметь `type`, `description` и блок `validation { condition, error_message }`.',
        '- **Понятные Output**: Выходные значения снабжать `description` и пометкой `sensitive = true` при необходимости.',
      ],
      [
        '- **HCL Block Architecture**: Structure codebase across `terraform {}`, `locals {}`, typed `variable {}`, `resource {}`, and `output {}`.',
        '- **Variable Validation Contracts**: Enforce strict `type` definitions and defensive `validation` blocks with actionable error messages.',
        '- **Explicit Outputs**: Document all emitted attributes with detailed `description` and `sensitive = true` guards where appropriate.',
      ]
    ),
  },

  'plantuml-state-sequence': {
    id: 'plantuml-state-sequence',
    name: 'PlantumlStateSequenceSkill',
    displayName: 'PlantUML Sequence & State Diagram',
    categoryId: 'output',
    description: 'Formats system interactions and lifecycles into valid PlantUML diagrams wrapped in `@startuml` and `@enduml`.',
    tags: ['output', 'plantuml', 'diagram', 'sequence', 'architecture', 'uml'],
    transform: createStandardSkillTransform(
      'output_format',
      'Спецификация Диаграммы PlantUML (@startuml ... @enduml)',
      'PlantUML Sequence & Architecture Diagram Specification',
      [
        '- **Маркеры начала и конца**: Обязательно оборачивать диаграмму в `@startuml` и `@enduml`.',
        '- **Объявление участников**: Явно объявлять акторов и сущности через `actor`, `participant`, `database`, `queue` с краткими алиасами.',
        '- **Группы и ветвления**: Использовать конструкции `alt / else / end`, `loop`, `opt` и `autonumber` для наглядной нумерации шагов.',
      ],
      [
        '- **PlantUML Delimiters**: Enclose diagram definition strictly within `@startuml` and `@enduml` blocks.',
        '- **Explicit Entity Declarations**: Declare entities using semantic stereotyping (`actor`, `participant`, `database`, `queue`) with concise aliases.',
        '- **Interaction Logic**: Leverage `alt / else / end` conditional branches, `loop` wrappers, and `autonumber` for message sequences.',
      ]
    ),
  },

  'adr-architecture-record': {
    id: 'adr-architecture-record',
    name: 'AdrArchitectureRecordSkill',
    displayName: 'Architecture Decision Record (ADR Standard)',
    categoryId: 'output',
    description: 'Formats engineering decisions using Michael Nygard ADR format (Title, Status, Context, Decision, Consequences).',
    tags: ['output', 'adr', 'architecture', 'decision', 'documentation', 'governance'],
    transform: createStandardSkillTransform(
      'output_format',
      'Формат Architecture Decision Record (ADR)',
      'Architecture Decision Record (ADR Nygard Standard)',
      [
        '- **Стандартные разделы ADR**: Документ должен содержать секции: `1. Title`, `2. Status` (Proposed/Accepted/Deprecated), `3. Context`, `4. Decision`, `5. Consequences`.',
        '- **Взвешенные последствия**: В разделе Consequences подробно расписать как позитивные результаты, так и негативные компромиссы (trade-offs).',
        '- **Нейтральный технический тон**: Описывать факты, технические драйверы и архитектурные альтернативы без эмоций.',
      ],
      [
        '- **Nygard ADR Structure**: Organize decision log into: `1. Title`, `2. Status` (Proposed/Accepted/Superseded), `3. Context`, `4. Decision`, `5. Consequences`.',
        '- **Honest Trade-off Accounting**: Section 5 must explicitly itemize positive architectural wins alongside negative operational burdens.',
        '- **Objective Engineering Tone**: Ground decision rationale in concrete technical invariants, benchmarks, and architectural constraints.',
      ]
    ),
  },

  'junit-xml-test-report': {
    id: 'junit-xml-test-report',
    name: 'JunitXmlTestReportSkill',
    displayName: 'JUnit XML Test Result Schema',
    categoryId: 'output',
    description: 'Formats test execution suites into standard JUnit XML reports consumable by Jenkins, GitLab CI, and GitHub Actions.',
    tags: ['output', 'junit', 'xml', 'testing', 'ci-cd', 'reporting'],
    transform: createStandardSkillTransform(
      'output_format',
      'Формат Отчетов Тестирования JUnit XML',
      'JUnit XML Standard Test Execution Schema',
      [
        '- **Корневой элемент XML**: Использовать элемент `<testsuites>` с атрибутами `name`, `tests`, `failures`, `errors`, `time`.',
        '- **Тестовые кейсы**: Каждый тест представлять тегом `<testcase classname="..." name="..." time="...">`.',
        '- **Детали ошибок**: При сбое включать дочерний элемент `<failure message="..." type="...">текст стека</failure>`.',
      ],
      [
        '- **Root Testsuites Envelope**: Wrap output in `<testsuites>` with cumulative metrics: `tests`, `failures`, `errors`, and `time` attributes.',
        '- **Atomic Testcase Nodes**: Render individual test runs via `<testcase classname="..." name="..." time="...">`.',
        '- **Diagnostic Failure Traces**: For failing cases, embed nested `<failure message="..." type="...">stacktrace</failure>` nodes.',
      ]
    ),
  },

  'toml-configuration-spec': {
    id: 'toml-configuration-spec',
    name: 'TomlConfigurationSpecSkill',
    displayName: 'Strict TOML v1.0 Configuration File',
    categoryId: 'output',
    description: 'Formats systems and application settings into clean TOML v1.0 configuration with typed tables, inline arrays, and comments.',
    tags: ['output', 'toml', 'config', 'rust', 'python', 'settings'],
    transform: createStandardSkillTransform(
      'output_format',
      'Спецификация Файла Конфигурации TOML v1.0',
      'Strict TOML v1.0 Configuration Specification',
      [
        '- **Таблицы TOML**: Организовать настройки по таблицам `[table]` и массивам таблиц `[[table.array]]`.',
        '- **Строгая типизация**: Четко разделять строки в кавычках `"str"`, числа `42`, булевы флаги `true/false`, даты ISO `2026-09-30T00:00:00Z`.',
        '- **Понятные комментарии**: Каждую ключевую секцию сопровождать кратким поясняющим комментарием `# ...`.',
      ],
      [
        '- **TOML Table Scoping**: Group related configuration attributes inside explicit `[section]` tables and `[[array.of.tables]]`.',
        '- **Type Rigor**: Strictly format strings in quotes, integers/floats without suffixes, booleans as `true/false`, and ISO datetimes.',
        '- **Inline Explanations**: Annotate non-obvious operational variables with concise `#` inline configuration comments.',
      ]
    ),
  },

  'sarif-security-report': {
    id: 'sarif-security-report',
    name: 'SarifSecurityReportSkill',
    displayName: 'OASIS SARIF v2.1.0 Security Report',
    categoryId: 'output',
    description: 'Formats static analysis security findings into standard SARIF JSON v2.1.0 compatible with GitHub Advanced Security.',
    tags: ['output', 'sarif', 'security', 'vulnerabilities', 'oasis', 'json'],
    transform: createStandardSkillTransform(
      'output_format',
      'Формат Отчета Безопасности OASIS SARIF v2.1.0',
      'OASIS SARIF v2.1.0 Static Analysis Security Specification',
      [
        '- **Стандарт SARIF**: Формат должен валидироваться по схеме `https://docs.oasis-open.org/sarif/sarif/v2.1.0/cos02/schemas/sarif-schema-2.1.0.json`.',
        '- **Структура `runs`**: Включать объект `tool.driver` с описанием правил `rules` (id, name, shortDescription, defaultConfiguration.level).',
        '- **Локация дефектов**: Каждая находка в `results` обязана указывать `ruleId`, `message.text`, и точные физические координаты `locations[].physicalLocation`.',
      ],
      [
        '- **OASIS SARIF Conformance**: Validate schema against canonical OASIS SARIF v2.1.0 specification.',
        '- **Tool Driver Metadata**: Define rule catalog under `runs[].tool.driver.rules` with severity levels (error, warning, note).',
        '- **Exact Result Physical Location**: Detail all vulnerabilities inside `results` featuring precise `physicalLocation.artifactLocation` file offsets.',
      ]
    ),
  },
};

